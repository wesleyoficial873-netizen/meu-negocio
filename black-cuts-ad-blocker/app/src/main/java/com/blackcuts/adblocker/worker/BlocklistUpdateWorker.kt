package com.blackcuts.adblocker.worker

import android.content.Context
import android.content.Intent
import androidx.work.CoroutineWorker
import androidx.work.ExistingPeriodicWorkPolicy
import androidx.work.PeriodicWorkRequestBuilder
import androidx.work.WorkManager
import androidx.work.WorkerParameters
import com.blackcuts.adblocker.data.local.AppDatabase
import com.blackcuts.adblocker.data.local.FilterRuleEntity
import com.blackcuts.adblocker.data.local.UpdateHistoryEntity
import com.blackcuts.adblocker.data.model.RuleCategory
import com.blackcuts.adblocker.vpn.BlackCutsVpnService
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import java.net.HttpURLConnection
import java.net.URL
import java.util.concurrent.TimeUnit

class BlocklistUpdateWorker(
    appContext: Context,
    params: WorkerParameters
) : CoroutineWorker(appContext, params) {

    companion object {
        private const val WORK_NAME = "blackcuts_blocklist_update"
        private const val TRUSTED_SOURCE_NAME = "StevenBlack Unified Hosts"
        private const val TRUSTED_SOURCE_URL = "https://raw.githubusercontent.com/StevenBlack/hosts/master/hosts"
        private const val MIN_VALID_RULES = 100

        fun schedulePeriodic(context: Context) {
            val request = PeriodicWorkRequestBuilder<BlocklistUpdateWorker>(24, TimeUnit.HOURS)
                .build()
            WorkManager.getInstance(context).enqueueUniquePeriodicWork(
                WORK_NAME,
                ExistingPeriodicWorkPolicy.KEEP,
                request
            )
        }

        fun cancelPeriodic(context: Context) {
            WorkManager.getInstance(context).cancelUniqueWork(WORK_NAME)
        }
    }

    override suspend fun doWork(): Result = withContext(Dispatchers.IO) {
        val db = AppDatabase.getInstance(applicationContext)
        val ruleDao = db.filterRuleDao()
        val historyDao = db.updateHistoryDao()
        val previousRemoteRules = ruleDao.getBySource("REMOTE")

        return@withContext try {
            val url = URL(TRUSTED_SOURCE_URL)
            val connection = (url.openConnection() as HttpURLConnection).apply {
                connectTimeout = 10_000
                readTimeout = 15_000
                requestMethod = "GET"
            }

            if (connection.responseCode != HttpURLConnection.HTTP_OK) {
                throw IllegalStateException("HTTP ${connection.responseCode}")
            }

            val parsedRules = mutableListOf<FilterRuleEntity>()
            connection.inputStream.bufferedReader().useLines { lines ->
                lines.forEach { raw ->
                    val line = raw.trim()
                    if (line.startsWith("0.0.0.0 ") || line.startsWith("127.0.0.1 ")) {
                        val parts = line.split(Regex("\\s+"))
                        if (parts.size >= 2) {
                            val domain = parts[1].lowercase().trim()
                            if (domain.isNotEmpty() && domain != "localhost" && domain != "0.0.0.0" && domain.contains(".")) {
                                parsedRules.add(
                                    FilterRuleEntity(
                                        domain = domain,
                                        category = RuleCategory.ADS.name,
                                        source = "REMOTE",
                                        enabled = true
                                    )
                                )
                            }
                        }
                    }
                }
            }

            if (parsedRules.size < MIN_VALID_RULES) {
                throw IllegalStateException("Falha na verificação de integridade: apenas ${parsedRules.size} regras válidas.")
            }

            ruleDao.deleteBySource("REMOTE")
            ruleDao.insertAll(parsedRules.take(50_000)) // Limite seguro para memória/Room

            historyDao.insert(
                UpdateHistoryEntity(
                    timestamp = System.currentTimeMillis(),
                    sourceName = TRUSTED_SOURCE_NAME,
                    rulesCount = parsedRules.size.coerceAtMost(50_000),
                    status = "SUCCESS",
                    message = "Lista atualizada com sucesso."
                )
            )

            if (BlackCutsVpnService.isRunning) {
                applicationContext.startService(
                    Intent(applicationContext, BlackCutsVpnService::class.java).apply {
                        action = BlackCutsVpnService.ACTION_RELOAD_RULES
                    }
                )
            }

            Result.success()
        } catch (e: Exception) {
            // Reversão automática para a lista anterior em caso de erro
            if (previousRemoteRules.isNotEmpty()) {
                ruleDao.deleteBySource("REMOTE")
                ruleDao.insertAll(previousRemoteRules)
            }
            historyDao.insert(
                UpdateHistoryEntity(
                    timestamp = System.currentTimeMillis(),
                    sourceName = TRUSTED_SOURCE_NAME,
                    rulesCount = previousRemoteRules.size,
                    status = if (previousRemoteRules.isNotEmpty()) "ROLLED_BACK" else "ERROR",
                    message = "Erro na atualização: ${e.message ?: "desconhecido"}. Lista anterior mantida."
                )
            )
            Result.retry()
        }
    }
}
