package com.blackcuts.adblocker.ui

import android.app.Application
import android.content.Intent
import android.content.pm.ApplicationInfo
import android.content.pm.PackageManager
import android.os.Build
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import androidx.work.OneTimeWorkRequestBuilder
import androidx.work.WorkManager
import com.blackcuts.adblocker.data.local.AppDatabase
import com.blackcuts.adblocker.data.local.FilterRuleEntity
import com.blackcuts.adblocker.data.local.WhitelistEntity
import com.blackcuts.adblocker.data.model.AppFilterMode
import com.blackcuts.adblocker.data.model.InstalledAppInfo
import com.blackcuts.adblocker.data.model.ProtectionLevel
import com.blackcuts.adblocker.data.model.RuleCategory
import com.blackcuts.adblocker.data.model.StatsPeriod
import com.blackcuts.adblocker.data.preferences.PreferencesManager
import com.blackcuts.adblocker.updater.AppUpdateChecker
import com.blackcuts.adblocker.updater.AppUpdateInfo
import com.blackcuts.adblocker.vpn.BlackCutsVpnService
import com.blackcuts.adblocker.worker.BlocklistUpdateWorker
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.flatMapLatest
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch

@OptIn(ExperimentalCoroutinesApi::class)
class MainViewModel(application: Application) : AndroidViewModel(application) {

    private val db = AppDatabase.getInstance(application)
    val prefs = PreferencesManager(application)

    val isVpnEnabled: StateFlow<Boolean> = prefs.isVpnEnabled
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), false)

    val protectionLevel: StateFlow<ProtectionLevel> = prefs.protectionLevel
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), ProtectionLevel.BALANCED)

    val appFilterMode: StateFlow<AppFilterMode> = prefs.appFilterMode
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), AppFilterMode.PROTECT_ALL)

    val selectedApps: StateFlow<Set<String>> = prefs.selectedApps
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptySet())

    val enabledCategories: StateFlow<Set<String>> = prefs.enabledCategories
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptySet())

    val autoUpdateEnabled: StateFlow<Boolean> = prefs.autoUpdateEnabled
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), true)

    val startOnBoot: StateFlow<Boolean> = prefs.startOnBoot
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), false)

    val vpnStartedAt: StateFlow<Long> = prefs.vpnStartedAt
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), 0L)

    val activeRulesCount: StateFlow<Int> = db.filterRuleDao().observeActiveRulesCount()
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), 0)

    val whitelist = db.whitelistDao().observeAll()
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    val userBlacklist = db.filterRuleDao().observeUserRules()
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    val updateHistory = db.updateHistoryDao().observeHistory()
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    private val _statsPeriod = MutableStateFlow(StatsPeriod.DAILY)
    val statsPeriod: StateFlow<StatsPeriod> = _statsPeriod.asStateFlow()

    private val sinceFlow = _statsPeriod.flatMapLatest { period ->
        val since = System.currentTimeMillis() - period.days * 86_400_000L
        MutableStateFlow(since)
    }

    val totalQueries = sinceFlow.flatMapLatest { db.dnsLogDao().observeTotalQueries(it) }
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), 0)

    val blockedQueries = sinceFlow.flatMapLatest { db.dnsLogDao().observeBlockedQueries(it) }
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), 0)

    val adsBlocked = sinceFlow.flatMapLatest { db.dnsLogDao().observeAdsBlocked(it) }
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), 0)

    val trackersBlocked = sinceFlow.flatMapLatest { db.dnsLogDao().observeTrackersBlocked(it) }
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), 0)

    val bytesSaved = sinceFlow.flatMapLatest { db.dnsLogDao().observeBytesSaved(it) }
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), 0L)

    val topBlockedDomains = sinceFlow.flatMapLatest { db.dnsLogDao().observeTopBlockedDomains(it) }
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    val dailyStats = sinceFlow.flatMapLatest { db.dnsLogDao().observeDailyStats(it) }
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    private val _installedApps = MutableStateFlow<List<InstalledAppInfo>>(emptyList())
    val installedApps: StateFlow<List<InstalledAppInfo>> = combine(
        _installedApps,
        appFilterMode,
        selectedApps
    ) { apps, mode, selected ->
        apps.map { app ->
            val filtered = when (mode) {
                AppFilterMode.PROTECT_ALL -> true
                AppFilterMode.PROTECT_SELECTED -> selected.contains(app.packageName)
                AppFilterMode.EXCLUDE_SELECTED -> !selected.contains(app.packageName)
            }
            app.copy(isFiltered = filtered)
        }
    }.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    private val _appUpdateState = MutableStateFlow<AppUpdateInfo?>(null)
    val appUpdateState: StateFlow<AppUpdateInfo?> = _appUpdateState.asStateFlow()

    init {
        loadInstalledApps()
    }

    fun setStatsPeriod(period: StatsPeriod) {
        _statsPeriod.value = period
    }

    fun startVpnService() {
        val ctx = getApplication<Application>()
        val intent = Intent(ctx, BlackCutsVpnService::class.java).apply {
            action = BlackCutsVpnService.ACTION_START
        }
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            ctx.startForegroundService(intent)
        } else {
            ctx.startService(intent)
        }
    }

    fun stopVpnService() {
        val ctx = getApplication<Application>()
        val intent = Intent(ctx, BlackCutsVpnService::class.java).apply {
            action = BlackCutsVpnService.ACTION_STOP
        }
        ctx.startService(intent)
    }

    private fun notifyVpnReload() {
        if (BlackCutsVpnService.isRunning) {
            val ctx = getApplication<Application>()
            ctx.startService(
                Intent(ctx, BlackCutsVpnService::class.java).apply {
                    action = BlackCutsVpnService.ACTION_RELOAD_RULES
                }
            )
        }
    }

    fun setProtectionLevel(level: ProtectionLevel) {
        viewModelScope.launch {
            prefs.setProtectionLevel(level)
            notifyVpnReload()
        }
    }

    fun setAppFilterMode(mode: AppFilterMode) {
        viewModelScope.launch { prefs.setAppFilterMode(mode) }
    }

    fun toggleAppSelection(packageName: String) {
        viewModelScope.launch { prefs.toggleAppSelection(packageName) }
    }

    fun toggleCategory(category: RuleCategory) {
        viewModelScope.launch {
            prefs.toggleCategory(category)
            notifyVpnReload()
        }
    }

    fun addWhitelistDomain(domain: String) {
        val clean = domain.trim().lowercase().removePrefix("http://").removePrefix("https://").substringBefore("/")
        if (clean.isEmpty() || !clean.contains(".")) return
        viewModelScope.launch {
            db.whitelistDao().insert(WhitelistEntity(domain = clean))
            notifyVpnReload()
        }
    }

    fun removeWhitelistDomain(item: WhitelistEntity) {
        viewModelScope.launch {
            db.whitelistDao().delete(item)
            notifyVpnReload()
        }
    }

    fun importWhitelist(domainsText: String) {
        val items = domainsText.lines()
            .map { it.trim().lowercase() }
            .filter { it.isNotEmpty() && !it.startsWith("#") && it.contains(".") }
            .map { WhitelistEntity(domain = it) }
        if (items.isEmpty()) return
        viewModelScope.launch {
            db.whitelistDao().insertAll(items)
            notifyVpnReload()
        }
    }

    fun addBlacklistDomain(domain: String, category: RuleCategory) {
        val clean = domain.trim().lowercase().removePrefix("http://").removePrefix("https://").substringBefore("/")
        if (clean.isEmpty() || !clean.contains(".")) return
        viewModelScope.launch {
            db.filterRuleDao().insert(
                FilterRuleEntity(
                    domain = clean,
                    category = category.name,
                    source = "USER",
                    enabled = true
                )
            )
            notifyVpnReload()
        }
    }

    fun removeBlacklistDomain(rule: FilterRuleEntity) {
        viewModelScope.launch {
            db.filterRuleDao().delete(rule)
            notifyVpnReload()
        }
    }

    fun triggerManualBlocklistUpdate() {
        val request = OneTimeWorkRequestBuilder<BlocklistUpdateWorker>().build()
        WorkManager.getInstance(getApplication()).enqueue(request)
    }

    fun setAutoUpdate(enabled: Boolean) {
        viewModelScope.launch {
            prefs.setAutoUpdate(enabled)
            if (enabled) {
                BlocklistUpdateWorker.schedulePeriodic(getApplication())
            } else {
                BlocklistUpdateWorker.cancelPeriodic(getApplication())
            }
        }
    }

    fun setStartOnBoot(enabled: Boolean) {
        viewModelScope.launch { prefs.setStartOnBoot(enabled) }
    }

    fun checkForAppUpdates() {
        viewModelScope.launch {
            val result = AppUpdateChecker.checkForUpdates()
            result.onSuccess { _appUpdateState.value = it }
        }
    }

    fun dismissUpdateDialog() {
        _appUpdateState.value = null
    }

    private fun loadInstalledApps() {
        viewModelScope.launch(Dispatchers.IO) {
            val pm = getApplication<Application>().packageManager
            val ownPkg = getApplication<Application>().packageName
            val packages = pm.getInstalledApplications(PackageManager.GET_META_DATA)
            val list = packages
                .filter { it.packageName != ownPkg }
                .map { appInfo ->
                    val isSystem = (appInfo.flags and ApplicationInfo.FLAG_SYSTEM) != 0
                    val label = pm.getApplicationLabel(appInfo).toString()
                    InstalledAppInfo(
                        packageName = appInfo.packageName,
                        appName = label,
                        isSystemApp = isSystem,
                        isFiltered = true
                    )
                }
                .sortedWith(compareBy<InstalledAppInfo> { it.isSystemApp }.thenBy { it.appName.lowercase() })
            _installedApps.value = list
        }
    }
}
