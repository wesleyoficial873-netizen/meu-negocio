package com.blackcuts.adblocker.data.local

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase

@Database(
    entities = [
        FilterRuleEntity::class,
        DnsLogEntity::class,
        WhitelistEntity::class,
        UpdateHistoryEntity::class
    ],
    version = 1,
    exportSchema = false
)
abstract class AppDatabase : RoomDatabase() {
    abstract fun filterRuleDao(): FilterRuleDao
    abstract fun dnsLogDao(): DnsLogDao
    abstract fun whitelistDao(): WhitelistDao
    abstract fun updateHistoryDao(): UpdateHistoryDao

    companion object {
        @Volatile
        private var INSTANCE: AppDatabase? = null

        fun getInstance(context: Context): AppDatabase {
            return INSTANCE ?: synchronized(this) {
                INSTANCE ?: Room.databaseBuilder(
                    context.applicationContext,
                    AppDatabase::class.java,
                    "blackcuts_adblocker.db"
                ).build().also { INSTANCE = it }
            }
        }
    }
}
