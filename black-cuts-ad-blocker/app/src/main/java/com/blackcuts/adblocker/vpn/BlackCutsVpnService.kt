package com.blackcuts.adblocker.vpn

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Intent
import android.net.VpnService
import android.os.Build
import android.os.ParcelFileDescriptor
import androidx.core.app.NotificationCompat
import com.blackcuts.adblocker.MainActivity
import com.blackcuts.adblocker.R
import com.blackcuts.adblocker.data.local.AppDatabase
import com.blackcuts.adblocker.data.local.DnsLogEntity
import com.blackcuts.adblocker.data.model.AppFilterMode
import com.blackcuts.adblocker.data.preferences.PreferencesManager
import com.blackcuts.adblocker.dns.DnsCache
import com.blackcuts.adblocker.dns.DnsPacketParser
import com.blackcuts.adblocker.dns.DomainFilterEngine
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.cancel
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.isActive
import kotlinx.coroutines.launch
import java.io.FileInputStream
import java.io.FileOutputStream
import java.net.DatagramPacket
import java.net.DatagramSocket
import java.net.InetAddress

class BlackCutsVpnService : VpnService() {

    companion object {
        const val ACTION_START = "com.blackcuts.adblocker.ACTION_START"
        const val ACTION_STOP = "com.blackcuts.adblocker.ACTION_STOP"
        const val ACTION_RELOAD_RULES = "com.blackcuts.adblocker.ACTION_RELOAD_RULES"
        private const val NOTIFICATION_ID = 1001
        private const val ESTIMATED_BYTES_PER_BLOCKED_AD = 48_000L
        private const val ESTIMATED_BYTES_PER_BLOCKED_TRACKER = 12_000L

        @Volatile
        var isRunning: Boolean = false
            private set
    }

    private val serviceScope = CoroutineScope(SupervisorJob() + Dispatchers.IO)
    private var vpnInterface: ParcelFileDescriptor? = null
    private var packetLoopJob: Job? = null

    private lateinit var preferencesManager: PreferencesManager
    private lateinit var database: AppDatabase
    private lateinit var filterEngine: DomainFilterEngine
    private val dnsCache = DnsCache()

    override fun onCreate() {
        super.onCreate()
        preferencesManager = PreferencesManager(applicationContext)
        database = AppDatabase.getInstance(applicationContext)
        filterEngine = DomainFilterEngine(applicationContext)
        createNotificationChannel()
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        when (intent?.action) {
            ACTION_STOP -> {
                stopVpn()
                return START_NOT_STICKY
            }
            ACTION_RELOAD_RULES -> {
                serviceScope.launch {
                    filterEngine.protectionLevel = preferencesManager.protectionLevel.first()
                    filterEngine.enabledCategories = preferencesManager.enabledCategories.first()
                    filterEngine.reloadRules()
                    dnsCache.clear()
                }
                return START_STICKY
            }
            else -> {
                startForeground(NOTIFICATION_ID, buildNotification())
                startVpn()
                return START_STICKY
            }
        }
    }

    private fun startVpn() {
        if (isRunning) return
        serviceScope.launch {
            try {
                filterEngine.protectionLevel = preferencesManager.protectionLevel.first()
                filterEngine.enabledCategories = preferencesManager.enabledCategories.first()
                filterEngine.reloadRules()

                val appMode = preferencesManager.appFilterMode.first()
                val selectedApps = preferencesManager.selectedApps.first()
                val upstreamDns = preferencesManager.upstreamDns.first()

                val builder = Builder()
                    .setSession("BLACK°CUTS AD BLOCKER")
                    .setMtu(1500)
                    .addAddress("10.111.222.1", 32)
                    .addDnsServer("10.111.222.2")
                    .addRoute("10.111.222.2", 32)

                // Nunca rotear o próprio app para evitar loop nas consultas upstream
                runCatching { builder.addDisallowedApplication(packageName) }

                when (appMode) {
                    AppFilterMode.PROTECT_ALL -> {
                        // Todos os outros apps usam o DNS local da VPN
                    }
                    AppFilterMode.PROTECT_SELECTED -> {
                        selectedApps.forEach { pkg ->
                            if (pkg != packageName) {
                                runCatching { builder.addAllowedApplication(pkg) }
                            }
                        }
                    }
                    AppFilterMode.EXCLUDE_SELECTED -> {
                        selectedApps.forEach { pkg ->
                            runCatching { builder.addDisallowedApplication(pkg) }
                        }
                    }
                }

                vpnInterface?.close()
                vpnInterface = builder.establish()

                val fd = vpnInterface ?: run {
                    stopVpn()
                    return@launch
                }

                isRunning = true
                preferencesManager.setVpnEnabled(true)

                packetLoopJob?.cancel()
                packetLoopJob = serviceScope.launch {
                    runPacketLoop(fd, upstreamDns)
                }
            } catch (e: Exception) {
                stopVpn()
            }
        }
    }

    private suspend fun runPacketLoop(fd: ParcelFileDescriptor, upstreamDns: String) {
        val inputStream = FileInputStream(fd.fileDescriptor)
        val outputStream = FileOutputStream(fd.fileDescriptor)
        val buffer = ByteArray(32767)
        val upstreamAddress = InetAddress.getByName(upstreamDns)

        while (serviceScope.isActive && isRunning) {
            val length = try {
                inputStream.read(buffer)
            } catch (e: Exception) {
                break
            }

            if (length <= 0) continue

            val packetCopy = buffer.copyOf(length)
            val parsed = DnsPacketParser.parseIpv4UdpDns(packetCopy, length) ?: continue

            serviceScope.launch {
                val decision = filterEngine.evaluate(parsed.domain)
                val dnsResponsePayload: ByteArray? = if (decision.blocked) {
                    DnsPacketParser.buildBlockedDnsResponse(parsed.dnsPayload)
                } else {
                    val cached = dnsCache.get(parsed.domain, parsed.qType)
                    if (cached != null) {
                        // Atualiza Transaction ID para corresponder à requisição atual
                        cached[0] = ((parsed.transactionId ushr 8) and 0xFF).toByte()
                        cached[1] = (parsed.transactionId and 0xFF).toByte()
                        cached
                    } else {
                        val upstreamResp = forwardDnsQuery(parsed.dnsPayload, upstreamAddress)
                        if (upstreamResp != null) {
                            dnsCache.put(parsed.domain, parsed.qType, upstreamResp)
                        }
                        upstreamResp
                    }
                }

                if (dnsResponsePayload != null) {
                    val responsePacket = DnsPacketParser.buildIpv4UdpResponsePacket(parsed, dnsResponsePayload)
                    synchronized(outputStream) {
                        runCatching { outputStream.write(responsePacket) }
                    }
                }

                val savedBytes = when {
                    !decision.blocked -> 0L
                    decision.category == "ADS" -> ESTIMATED_BYTES_PER_BLOCKED_AD
                    else -> ESTIMATED_BYTES_PER_BLOCKED_TRACKER
                }

                runCatching {
                    database.dnsLogDao().insert(
                        DnsLogEntity(
                            domain = parsed.domain,
                            timestamp = System.currentTimeMillis(),
                            blocked = decision.blocked,
                            category = decision.category,
                            estimatedBytesSaved = savedBytes
                        )
                    )
                }
            }
        }
    }

    private fun forwardDnsQuery(dnsPayload: ByteArray, upstreamAddress: InetAddress): ByteArray? {
        var socket: DatagramSocket? = null
        return try {
            socket = DatagramSocket()
            protect(socket)
            socket.soTimeout = 3000
            val requestPacket = DatagramPacket(dnsPayload, dnsPayload.size, upstreamAddress, 53)
            socket.send(requestPacket)

            val responseBuffer = ByteArray(4096)
            val responsePacket = DatagramPacket(responseBuffer, responseBuffer.size)
            socket.receive(responsePacket)
            responseBuffer.copyOf(responsePacket.length)
        } catch (e: Exception) {
            null
        } finally {
            socket?.close()
        }
    }

    private fun stopVpn() {
        isRunning = false
        packetLoopJob?.cancel()
        runCatching { vpnInterface?.close() }
        vpnInterface = null
        serviceScope.launch {
            preferencesManager.setVpnEnabled(false)
        }
        stopForeground(STOP_FOREGROUND_REMOVE)
        stopSelf()
    }

    override fun onRevoke() {
        stopVpn()
        super.onRevoke()
    }

    override fun onDestroy() {
        stopVpn()
        serviceScope.cancel()
        super.onDestroy()
    }

    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                getString(R.string.vpn_notification_channel_id),
                getString(R.string.vpn_notification_channel_name),
                NotificationManager.IMPORTANCE_LOW
            ).apply {
                setShowBadge(false)
            }
            val manager = getSystemService(NotificationManager::class.java)
            manager.createNotificationChannel(channel)
        }
    }

    private fun buildNotification(): Notification {
        val openIntent = PendingIntent.getActivity(
            this,
            0,
            Intent(this, MainActivity::class.java),
            PendingIntent.FLAG_IMMUTABLE or PendingIntent.FLAG_UPDATE_CURRENT
        )

        val stopIntent = PendingIntent.getService(
            this,
            1,
            Intent(this, BlackCutsVpnService::class.java).apply { action = ACTION_STOP },
            PendingIntent.FLAG_IMMUTABLE or PendingIntent.FLAG_UPDATE_CURRENT
        )

        return NotificationCompat.Builder(this, getString(R.string.vpn_notification_channel_id))
            .setSmallIcon(R.drawable.ic_logo_blackcuts)
            .setContentTitle(getString(R.string.vpn_notification_title))
            .setContentText(getString(R.string.vpn_notification_text))
            .setContentIntent(openIntent)
            .addAction(0, "Desativar", stopIntent)
            .setOngoing(true)
            .setSilent(true)
            .build()
    }
}
