package com.blackcuts.adblocker.data.local

import androidx.room.Entity
import androidx.room.Index
import androidx.room.PrimaryKey

@Entity(
    tableName = "filter_rules",
    indices = [Index(value = ["domain"], unique = true)]
)
data class FilterRuleEntity(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val domain: String,
    val category: String, // ADS, TRACKER, TELEMETRY, MALWARE, CUSTOM
    val source: String,   // EMBEDDED, REMOTE, USER
    val enabled: Boolean = true
)

@Entity(
    tableName = "dns_logs",
    indices = [Index(value = ["timestamp"]), Index(value = ["blocked"])]
)
data class DnsLogEntity(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val domain: String,
    val timestamp: Long,
    val blocked: Boolean,
    val category: String?,
    val estimatedBytesSaved: Long = 0L
)

@Entity(
    tableName = "whitelist",
    indices = [Index(value = ["domain"], unique = true)]
)
data class WhitelistEntity(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val domain: String,
    val addedAt: Long = System.currentTimeMillis()
)

@Entity(tableName = "update_history")
data class UpdateHistoryEntity(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val timestamp: Long,
    val sourceName: String,
    val rulesCount: Int,
    val status: String, // SUCCESS, ERROR, ROLLED_BACK
    val message: String
)
