package com.blackcuts.adblocker.data.preferences

import android.content.Context
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.core.booleanPreferencesKey
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.longPreferencesKey
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.core.stringSetPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import com.blackcuts.adblocker.data.model.AppFilterMode
import com.blackcuts.adblocker.data.model.ProtectionLevel
import com.blackcuts.adblocker.data.model.RuleCategory
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map

private val Context.dataStore: DataStore<Preferences> by preferencesDataStore(name = "blackcuts_prefs")

class PreferencesManager(private val context: Context) {

    companion object {
        private val KEY_VPN_ENABLED = booleanPreferencesKey("vpn_enabled")
        private val KEY_PROTECTION_LEVEL = stringPreferencesKey("protection_level")
        private val KEY_APP_FILTER_MODE = stringPreferencesKey("app_filter_mode")
        private val KEY_SELECTED_APPS = stringSetPreferencesKey("selected_apps")
        private val KEY_ENABLED_CATEGORIES = stringSetPreferencesKey("enabled_categories")
        private val KEY_AUTO_UPDATE = booleanPreferencesKey("auto_update")
        private val KEY_START_ON_BOOT = booleanPreferencesKey("start_on_boot")
        private val KEY_UPSTREAM_DNS = stringPreferencesKey("upstream_dns")
        private val KEY_VPN_STARTED_AT = longPreferencesKey("vpn_started_at")
    }

    val isVpnEnabled: Flow<Boolean> = context.dataStore.data.map { it[KEY_VPN_ENABLED] ?: false }

    val protectionLevel: Flow<ProtectionLevel> = context.dataStore.data.map { prefs ->
        val name = prefs[KEY_PROTECTION_LEVEL] ?: ProtectionLevel.BALANCED.name
        runCatching { ProtectionLevel.valueOf(name) }.getOrDefault(ProtectionLevel.BALANCED)
    }

    val appFilterMode: Flow<AppFilterMode> = context.dataStore.data.map { prefs ->
        val name = prefs[KEY_APP_FILTER_MODE] ?: AppFilterMode.PROTECT_ALL.name
        runCatching { AppFilterMode.valueOf(name) }.getOrDefault(AppFilterMode.PROTECT_ALL)
    }

    val selectedApps: Flow<Set<String>> = context.dataStore.data.map {
        it[KEY_SELECTED_APPS] ?: emptySet()
    }

    val enabledCategories: Flow<Set<String>> = context.dataStore.data.map {
        it[KEY_ENABLED_CATEGORIES] ?: setOf(
            RuleCategory.ADS.name,
            RuleCategory.TRACKER.name,
            RuleCategory.MALWARE.name,
            RuleCategory.CUSTOM.name
        )
    }

    val autoUpdateEnabled: Flow<Boolean> = context.dataStore.data.map { it[KEY_AUTO_UPDATE] ?: true }
    val startOnBoot: Flow<Boolean> = context.dataStore.data.map { it[KEY_START_ON_BOOT] ?: false }
    val upstreamDns: Flow<String> = context.dataStore.data.map { it[KEY_UPSTREAM_DNS] ?: "1.1.1.1" }
    val vpnStartedAt: Flow<Long> = context.dataStore.data.map { it[KEY_VPN_STARTED_AT] ?: 0L }

    suspend fun setVpnEnabled(enabled: Boolean) {
        context.dataStore.edit {
            it[KEY_VPN_ENABLED] = enabled
            it[KEY_VPN_STARTED_AT] = if (enabled) System.currentTimeMillis() else 0L
        }
    }

    suspend fun setProtectionLevel(level: ProtectionLevel) {
        context.dataStore.edit { it[KEY_PROTECTION_LEVEL] = level.name }
    }

    suspend fun setAppFilterMode(mode: AppFilterMode) {
        context.dataStore.edit { it[KEY_APP_FILTER_MODE] = mode.name }
    }

    suspend fun toggleAppSelection(packageName: String) {
        context.dataStore.edit { prefs ->
            val current = prefs[KEY_SELECTED_APPS]?.toMutableSet() ?: mutableSetOf()
            if (!current.add(packageName)) current.remove(packageName)
            prefs[KEY_SELECTED_APPS] = current
        }
    }

    suspend fun toggleCategory(category: RuleCategory) {
        context.dataStore.edit { prefs ->
            val current = (prefs[KEY_ENABLED_CATEGORIES] ?: setOf(
                RuleCategory.ADS.name,
                RuleCategory.TRACKER.name,
                RuleCategory.MALWARE.name,
                RuleCategory.CUSTOM.name
            )).toMutableSet()
            if (!current.add(category.name)) current.remove(category.name)
            prefs[KEY_ENABLED_CATEGORIES] = current
        }
    }

    suspend fun setAutoUpdate(enabled: Boolean) {
        context.dataStore.edit { it[KEY_AUTO_UPDATE] = enabled }
    }

    suspend fun setStartOnBoot(enabled: Boolean) {
        context.dataStore.edit { it[KEY_START_ON_BOOT] = enabled }
    }

    suspend fun setUpstreamDns(dns: String) {
        context.dataStore.edit { it[KEY_UPSTREAM_DNS] = dns }
    }
}
