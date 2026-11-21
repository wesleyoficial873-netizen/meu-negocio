package com.blackcuts.adblocker

import android.app.Application
import com.blackcuts.adblocker.data.preferences.PreferencesManager
import com.blackcuts.adblocker.worker.BlocklistUpdateWorker
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.launch

class BlackCutsApp : Application() {
    override fun onCreate() {
        super.onCreate()
        CoroutineScope(Dispatchers.IO).launch {
            val prefs = PreferencesManager(applicationContext)
            if (prefs.autoUpdateEnabled.first()) {
                BlocklistUpdateWorker.schedulePeriodic(applicationContext)
            }
        }
    }
}
