package com.blackcuts.adblocker.updater

import com.blackcuts.adblocker.BuildConfig
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.json.JSONObject
import java.net.HttpURLConnection
import java.net.URL

data class AppUpdateInfo(
    val currentVersion: String,
    val latestVersion: String,
    val hasUpdate: Boolean,
    val fixes: List<String>,
    val features: List<String>,
    val downloadUrl: String
)

object AppUpdateChecker {

    // Endpoint de manifesto de versão (pode ser hospedado no GitHub Releases / Pages do projeto)
    private const val UPDATE_MANIFEST_URL =
        "https://raw.githubusercontent.com/blackcuts-adblocker/releases/main/version.json"

    suspend fun checkForUpdates(): Result<AppUpdateInfo> = withContext(Dispatchers.IO) {
        return@withContext try {
            val url = URL(UPDATE_MANIFEST_URL)
            val conn = (url.openConnection() as HttpURLConnection).apply {
                connectTimeout = 8_000
                readTimeout = 8_000
            }
            if (conn.responseCode != HttpURLConnection.HTTP_OK) {
                return@withContext Result.success(
                    AppUpdateInfo(
                        currentVersion = BuildConfig.VERSION_NAME,
                        latestVersion = BuildConfig.VERSION_NAME,
                        hasUpdate = false,
                        fixes = emptyList(),
                        features = emptyList(),
                        downloadUrl = ""
                    )
                )
            }
            val body = conn.inputStream.bufferedReader().readText()
            val json = JSONObject(body)
            val latest = json.optString("version", BuildConfig.VERSION_NAME)
            val fixesArr = json.optJSONArray("fixes")
            val featuresArr = json.optJSONArray("features")

            val fixes = List(fixesArr?.length() ?: 0) { fixesArr!!.getString(it) }
            val features = List(featuresArr?.length() ?: 0) { featuresArr!!.getString(it) }

            Result.success(
                AppUpdateInfo(
                    currentVersion = BuildConfig.VERSION_NAME,
                    latestVersion = latest,
                    hasUpdate = latest != BuildConfig.VERSION_NAME,
                    fixes = fixes,
                    features = features,
                    downloadUrl = json.optString("downloadUrl", "")
                )
            )
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
}
