package com.blackcuts.musicplayer.data

import android.content.Context
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import kotlinx.coroutines.flow.map

private val Context.store by preferencesDataStore("appearance")
class Preferences(private val context: Context) {
    private val themeKey = stringPreferencesKey("theme")
    val theme = context.store.data.map { it[themeKey] ?: "AMOLED" }
    suspend fun setTheme(value: String) { context.store.edit { it[themeKey] = value } }
}
