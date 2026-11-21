package com.blackcuts.adblocker.data.model

enum class ProtectionLevel(val label: String, val description: String) {
    BASIC("Proteção Básica", "Bloqueia apenas anúncios conhecidos e domínios maliciosos."),
    BALANCED("Proteção Equilibrada", "Bloqueia anúncios, rastreadores e domínios maliciosos."),
    STRICT("Proteção Rigorosa", "Bloqueia anúncios, rastreadores, telemetria e regras personalizadas."),
    CUSTOM("Proteção Personalizada", "Usa exatamente as categorias ativadas na Blacklist.")
}

enum class RuleCategory(val label: String) {
    ADS("Publicidade"),
    TRACKER("Rastreamento"),
    TELEMETRY("Telemetria"),
    MALWARE("Domínios Maliciosos"),
    CUSTOM("Personalizado")
}

enum class AppFilterMode(val label: String) {
    PROTECT_ALL("Proteger todos"),
    PROTECT_SELECTED("Proteger selecionados"),
    EXCLUDE_SELECTED("Excluir selecionados")
}

enum class StatsPeriod(val label: String, val days: Int) {
    DAILY("Diário", 1),
    WEEKLY("Semanal", 7),
    MONTHLY("Mensal", 30)
}

data class InstalledAppInfo(
    val packageName: String,
    val appName: String,
    val isSystemApp: Boolean,
    val isFiltered: Boolean
)
