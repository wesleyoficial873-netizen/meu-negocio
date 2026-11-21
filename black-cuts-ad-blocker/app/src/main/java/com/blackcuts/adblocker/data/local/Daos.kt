package com.blackcuts.adblocker.data.local

import androidx.room.Dao
import androidx.room.Delete
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import kotlinx.coroutines.flow.Flow

data class DomainCount(
    val domain: String,
    val count: Int
)

data class DailyBucket(
    val dayIndex: Long,
    val blockedCount: Int,
    val allowedCount: Int
)

@Dao
interface FilterRuleDao {
    @Query("SELECT * FROM filter_rules WHERE enabled = 1")
    suspend fun getAllEnabledRules(): List<FilterRuleEntity>

    @Query("SELECT * FROM filter_rules WHERE source = 'USER' ORDER BY id DESC")
    fun observeUserRules(): Flow<List<FilterRuleEntity>>

    @Query("SELECT COUNT(*) FROM filter_rules WHERE enabled = 1")
    fun observeActiveRulesCount(): Flow<Int>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertAll(rules: List<FilterRuleEntity>)

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insert(rule: FilterRuleEntity)

    @Delete
    suspend fun delete(rule: FilterRuleEntity)

    @Query("DELETE FROM filter_rules WHERE source = :source")
    suspend fun deleteBySource(source: String)

    @Query("SELECT * FROM filter_rules WHERE source = :source")
    suspend fun getBySource(source: String): List<FilterRuleEntity>
}

@Dao
interface DnsLogDao {
    @Insert
    suspend fun insert(log: DnsLogEntity)

    @Query("SELECT COUNT(*) FROM dns_logs WHERE timestamp >= :since")
    fun observeTotalQueries(since: Long): Flow<Int>

    @Query("SELECT COUNT(*) FROM dns_logs WHERE blocked = 1 AND timestamp >= :since")
    fun observeBlockedQueries(since: Long): Flow<Int>

    @Query("SELECT COUNT(*) FROM dns_logs WHERE blocked = 1 AND category = 'ADS' AND timestamp >= :since")
    fun observeAdsBlocked(since: Long): Flow<Int>

    @Query("SELECT COUNT(*) FROM dns_logs WHERE blocked = 1 AND category = 'TRACKER' AND timestamp >= :since")
    fun observeTrackersBlocked(since: Long): Flow<Int>

    @Query("SELECT COALESCE(SUM(estimatedBytesSaved), 0) FROM dns_logs WHERE blocked = 1 AND timestamp >= :since")
    fun observeBytesSaved(since: Long): Flow<Long>

    @Query("SELECT domain, COUNT(*) as count FROM dns_logs WHERE blocked = 1 AND timestamp >= :since GROUP BY domain ORDER BY count DESC LIMIT 10")
    fun observeTopBlockedDomains(since: Long): Flow<List<DomainCount>>

    @Query("SELECT * FROM dns_logs ORDER BY timestamp DESC LIMIT 100")
    fun observeRecentLogs(): Flow<List<DnsLogEntity>>

    @Query("""
        SELECT (timestamp / 86400000) as dayIndex,
               SUM(CASE WHEN blocked = 1 THEN 1 ELSE 0 END) as blockedCount,
               SUM(CASE WHEN blocked = 0 THEN 1 ELSE 0 END) as allowedCount
        FROM dns_logs
        WHERE timestamp >= :since
        GROUP BY dayIndex
        ORDER BY dayIndex ASC
    """)
    fun observeDailyStats(since: Long): Flow<List<DailyBucket>>

    @Query("DELETE FROM dns_logs WHERE timestamp < :before")
    suspend fun purgeOldLogs(before: Long)
}

@Dao
interface WhitelistDao {
    @Query("SELECT * FROM whitelist ORDER BY domain ASC")
    fun observeAll(): Flow<List<WhitelistEntity>>

    @Query("SELECT domain FROM whitelist")
    suspend fun getAllDomains(): List<String>

    @Insert(onConflict = OnConflictStrategy.IGNORE)
    suspend fun insert(item: WhitelistEntity)

    @Insert(onConflict = OnConflictStrategy.IGNORE)
    suspend fun insertAll(items: List<WhitelistEntity>)

    @Delete
    suspend fun delete(item: WhitelistEntity)
}

@Dao
interface UpdateHistoryDao {
    @Query("SELECT * FROM update_history ORDER BY timestamp DESC LIMIT 20")
    fun observeHistory(): Flow<List<UpdateHistoryEntity>>

    @Insert
    suspend fun insert(entry: UpdateHistoryEntity)
}
