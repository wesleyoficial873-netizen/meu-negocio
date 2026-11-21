package com.blackcuts.adblocker.dns

import android.content.Context
import com.blackcuts.adblocker.data.local.AppDatabase
import com.blackcuts.adblocker.data.local.FilterRuleEntity
import com.blackcuts.adblocker.data.model.ProtectionLevel
import com.blackcuts.adblocker.data.model.RuleCategory
import java.util.concurrent.ConcurrentHashMap

data class FilterDecision(
    val blocked: Boolean,
    val category: String? = null
)

class DomainFilterEngine(private val context: Context) {

    private val database = AppDatabase.getInstance(context)

    // Mapa domínio -> categoria (ex: "doubleclick.net" -> "ADS")
    private val blockedDomains = ConcurrentHashMap<String, String>()
    private val whitelistedDomains = ConcurrentHashMap.newKeySet<String>()

    @Volatile
    var protectionLevel: ProtectionLevel = ProtectionLevel.BALANCED

    @Volatile
    var enabledCategories: Set<String> = setOf(
        RuleCategory.ADS.name,
        RuleCategory.TRACKER.name,
        RuleCategory.MALWARE.name,
        RuleCategory.CUSTOM.name
    )

    // Domínios essenciais do sistema que nunca devem ser bloqueados para evitar falhas de conectividade
    private val essentialDomains = setOf(
        "connectivitycheck.gstatic.com",
        "clients3.google.com",
        "play.googleapis.com",
        "android.clients.google.com",
        "time.android.com",
        "dns.google",
        "cloudflare-dns.com"
    )

    suspend fun reloadRules() {
        val existingRules = database.filterRuleDao().getAllEnabledRules()
        if (existingRules.isEmpty()) {
            seedEmbeddedBlocklist()
        }

        val allRules = database.filterRuleDao().getAllEnabledRules()
        val newBlocked = ConcurrentHashMap<String, String>(allRules.size)
        for (rule in allRules) {
            newBlocked[rule.domain.lowercase().trim()] = rule.category
        }
        blockedDomains.clear()
        blockedDomains.putAll(newBlocked)

        val whitelist = database.whitelistDao().getAllDomains()
        whitelistedDomains.clear()
        whitelistedDomains.addAll(whitelist.map { it.lowercase().trim() })
    }

    private suspend fun seedEmbeddedBlocklist() {
        val rules = mutableListOf<FilterRuleEntity>()
        context.assets.open("default_blocklist.txt").bufferedReader().useLines { lines ->
            lines.forEach { raw ->
                val line = raw.trim()
                if (line.isNotEmpty() && !line.startsWith("#") && line.contains("|")) {
                    val parts = line.split("|", limit = 2)
                    if (parts.size == 2) {
                        val category = parts[0].trim()
                        val domain = parts[1].trim().lowercase()
                        if (domain.isNotEmpty()) {
                            rules.add(
                                FilterRuleEntity(
                                    domain = domain,
                                    category = category,
                                    source = "EMBEDDED",
                                    enabled = true
                                )
                            )
                        }
                    }
                }
            }
        }
        if (rules.isNotEmpty()) {
            database.filterRuleDao().insertAll(rules)
        }
    }

    fun evaluate(domain: String): FilterDecision {
        val normalized = domain.lowercase().trimEnd('.')
        if (normalized.isEmpty()) return FilterDecision(false)

        // 1. Domínios essenciais do Android
        if (matchesDomainOrParent(normalized, essentialDomains)) {
            return FilterDecision(false)
        }

        // 2. Whitelist do usuário
        if (matchesDomainOrParent(normalized, whitelistedDomains)) {
            return FilterDecision(false)
        }

        // 3. Busca na lista de bloqueio (domínio exato ou subdomínio de domínio bloqueado)
        val matchedCategory = findBlockedCategory(normalized) ?: return FilterDecision(false)

        // 4. Aplica nível de proteção
        val shouldBlock = when (protectionLevel) {
            ProtectionLevel.BASIC -> matchedCategory == RuleCategory.ADS.name || matchedCategory == RuleCategory.MALWARE.name
            ProtectionLevel.BALANCED -> matchedCategory in setOf(
                RuleCategory.ADS.name,
                RuleCategory.TRACKER.name,
                RuleCategory.MALWARE.name
            )
            ProtectionLevel.STRICT -> true
            ProtectionLevel.CUSTOM -> matchedCategory in enabledCategories
        }

        return FilterDecision(blocked = shouldBlock, category = if (shouldBlock) matchedCategory else null)
    }

    private fun findBlockedCategory(domain: String): String? {
        var current = domain
        while (true) {
            blockedDomains[current]?.let { return it }
            val dotIndex = current.indexOf('.')
            if (dotIndex == -1 || dotIndex == current.length - 1) break
            current = current.substring(dotIndex + 1)
        }
        return null
    }

    private fun matchesDomainOrParent(domain: String, set: Set<String>): Boolean {
        var current = domain
        while (true) {
            if (set.contains(current)) return true
            val dotIndex = current.indexOf('.')
            if (dotIndex == -1 || dotIndex == current.length - 1) break
            current = current.substring(dotIndex + 1)
        }
        return false
    }
}
