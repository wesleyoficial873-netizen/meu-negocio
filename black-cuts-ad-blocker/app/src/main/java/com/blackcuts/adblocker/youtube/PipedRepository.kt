package com.blackcuts.adblocker.youtube

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.json.JSONObject
import java.net.HttpURLConnection
import java.net.URL
import java.net.URLEncoder

data class YouTubeVideoItem(
    val videoId: String,
    val title: String,
    val uploader: String,
    val durationSeconds: Long
)

data class YouTubeStreamResult(
    val title: String,
    val streamUrl: String
)

/**
 * Cliente leve inspirado na arquitetura do LibreTube (GPL-3.0)
 * utilizando instâncias públicas da Piped API para reproduzir vídeos do YouTube sem anúncios.
 */
object PipedRepository {

    private val instances = listOf(
        "https://pipedapi.kavin.rocks",
        "https://api.piped.yt",
        "https://pipedapi.tokhmi.xyz"
    )

    suspend fun search(query: String): Result<List<YouTubeVideoItem>> = withContext(Dispatchers.IO) {
        val encoded = URLEncoder.encode(query, "UTF-8")
        for (base in instances) {
            try {
                val url = URL("$base/search?q=$encoded&filter=videos")
                val conn = (url.openConnection() as HttpURLConnection).apply {
                    connectTimeout = 8_000
                    readTimeout = 8_000
                }
                if (conn.responseCode == HttpURLConnection.HTTP_OK) {
                    val body = conn.inputStream.bufferedReader().readText()
                    val json = JSONObject(body)
                    val items = json.optJSONArray("items") ?: continue
                    val list = mutableListOf<YouTubeVideoItem>()
                    for (i in 0 until items.length()) {
                        val obj = items.getJSONObject(i)
                        val rawUrl = obj.optString("url", "")
                        val videoId = rawUrl.substringAfter("v=", "").ifEmpty { rawUrl.substringAfterLast("/") }
                        if (videoId.isNotEmpty()) {
                            list.add(
                                YouTubeVideoItem(
                                    videoId = videoId,
                                    title = obj.optString("title", "Sem título"),
                                    uploader = obj.optString("uploaderName", "Canal"),
                                    durationSeconds = obj.optLong("duration", 0L)
                                )
                            )
                        }
                    }
                    return@withContext Result.success(list)
                }
            } catch (_: Exception) {
                // Tenta próxima instância
            }
        }
        Result.failure(IllegalStateException("Nenhuma instância Piped disponível no momento."))
    }

    suspend fun getStreamUrl(videoId: String): Result<YouTubeStreamResult> = withContext(Dispatchers.IO) {
        for (base in instances) {
            try {
                val url = URL("$base/streams/$videoId")
                val conn = (url.openConnection() as HttpURLConnection).apply {
                    connectTimeout = 8_000
                    readTimeout = 8_000
                }
                if (conn.responseCode == HttpURLConnection.HTTP_OK) {
                    val body = conn.inputStream.bufferedReader().readText()
                    val json = JSONObject(body)
                    val title = json.optString("title", "Vídeo")
                    val hls = json.optString("hls", "")
                    if (hls.isNotEmpty()) {
                        return@withContext Result.success(YouTubeStreamResult(title, hls))
                    }
                    val videoStreams = json.optJSONArray("videoStreams")
                    if (videoStreams != null) {
                        for (i in 0 until videoStreams.length()) {
                            val vs = videoStreams.getJSONObject(i)
                            if (!vs.optBoolean("videoOnly", true)) {
                                val streamUrl = vs.optString("url", "")
                                if (streamUrl.isNotEmpty()) {
                                    return@withContext Result.success(YouTubeStreamResult(title, streamUrl))
                                }
                            }
                        }
                    }
                }
            } catch (_: Exception) {
                // Tenta próxima instância
            }
        }
        Result.failure(IllegalStateException("Não foi possível extrair o stream sem anúncios."))
    }
}
