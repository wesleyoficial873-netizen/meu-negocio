package com.blackcuts.musicplayer.data

import android.net.Uri
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.json.JSONObject
import java.net.HttpURLConnection
import java.net.URL

data class OnlineVideo(val id: String, val title: String, val channel: String, val thumbnail: String?)

/** The configured HTTPS backend calls the official YouTube Data API. No API key lives in the app. */
class YouTubeSearch(private val endpoint: String) {
    val configured: Boolean get() = endpoint.startsWith("https://")
    suspend fun search(query: String): List<OnlineVideo> = withContext(Dispatchers.IO) {
        require(configured) { "A pesquisa integrada não está configurada." }
        require(query.isNotBlank() && query.length <= 200) { "Informe uma pesquisa com até 200 caracteres." }
        val url = Uri.parse(endpoint).buildUpon().appendQueryParameter("q", query.trim()).build().toString()
        val connection = URL(url).openConnection() as HttpURLConnection
        try {
            connection.connectTimeout = 10_000; connection.readTimeout = 15_000
            connection.instanceFollowRedirects = false
            connection.setRequestProperty("Accept", "application/json")
            if (connection.responseCode != 200) error("Pesquisa indisponível (HTTP ${connection.responseCode}).")
            val bytes = connection.inputStream.use { input ->
                val out = java.io.ByteArrayOutputStream(); val buffer = ByteArray(8192)
                while (true) { val count = input.read(buffer); if (count < 0) break; require(out.size() + count <= 512 * 1024) { "Resposta grande demais." }; out.write(buffer, 0, count) }
                out.toByteArray()
            }
            val items = JSONObject(bytes.toString(Charsets.UTF_8)).getJSONArray("items")
            (0 until minOf(items.length(), 25)).mapNotNull { i ->
                val item = items.getJSONObject(i)
                val id = item.optString("id")
                if (!id.matches(Regex("[A-Za-z0-9_-]{11}"))) return@mapNotNull null
                val thumbnail = item.optString("thumbnail").takeIf { it.startsWith("https://") }
                OnlineVideo(id, item.optString("title"), item.optString("channel"), thumbnail)
            }
        } finally { connection.disconnect() }
    }
}
