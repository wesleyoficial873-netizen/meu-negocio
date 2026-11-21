package com.blackcuts.musicplayer.data

import android.content.Context
import android.net.Uri
import androidx.room.withTransaction
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.withContext
import org.json.JSONArray
import org.json.JSONObject

/** Portable manifest only: content URIs are device-specific and music files are never included. */
class BackupRepository(private val context: Context, private val db: LibraryDatabase, private val prefs: Preferences) {
    private val maxBytes = 4 * 1024 * 1024
    suspend fun exportTo(destination: Uri) = withContext(Dispatchers.IO) {
        val dao = db.libraryDao()
        val root = db.withTransaction {
            val playlists = JSONArray()
            dao.playlistSnapshot().forEach { list ->
                val songs = JSONArray()
                dao.playlistUris(list.id).forEach { songs.put(it) }
                playlists.put(JSONObject().put("name", list.name).put("tracks", songs))
            }
            val favorites = JSONArray()
            dao.favoriteSnapshot().forEach { favorites.put(it) }
            JSONObject().put("format", "blackcuts-backup").put("version", 1)
                .put("favorites", favorites).put("playlists", playlists)
        }
        root.put("theme", prefs.theme.first())
        root.put("accent", prefs.accent.first())
        val bytes = root.toString(2).toByteArray(Charsets.UTF_8)
        require(bytes.size <= maxBytes) { "backup excede o limite de 4 MB" }
        val stream = context.contentResolver.openOutputStream(destination, "wt") ?: error("destino indisponível")
        stream.use { it.write(bytes) }
    }
    suspend fun importFrom(source: Uri) = withContext(Dispatchers.IO) {
        val bytes = (context.contentResolver.openInputStream(source) ?: error("arquivo indisponível")).use { it.readBytesLimited(maxBytes) }
        val root = JSONObject(bytes.toString(Charsets.UTF_8))
        require(root.getString("format") == "blackcuts-backup" && root.getInt("version") == 1) { "formato ou versão não suportados" }
        val favorites = root.getJSONArray("favorites").strings()
        val playlistData = root.getJSONArray("playlists")
        require(playlistData.length() <= 1000) { "playlists demais" }
        val lists = (0 until playlistData.length()).map { i ->
            val item = playlistData.getJSONObject(i)
            val name = item.getString("name").trim()
            require(name.isNotEmpty() && name.length <= 200) { "nome de playlist inválido" }
            name to item.getJSONArray("tracks").strings()
        }
        val theme = root.getString("theme")
        require(theme in listOf("AMOLED", "Escuro", "Claro")) { "tema inválido" }
        val accent = root.optString("accent", "")
        require(accent.isEmpty() || accent in listOf("Azul", "Violeta", "Âmbar")) { "cor inválida" }
        val dao = db.libraryDao()
        db.withTransaction {
            favorites.forEach { dao.addFavorite(Favorite(it)) }
            lists.forEach { (name, tracks) ->
                dao.createPlaylist(Playlist(name = name))
                val playlist = dao.playlistByName(name) ?: error("não foi possível criar playlist")
                tracks.forEachIndexed { i, track -> dao.addToPlaylist(PlaylistTrack(playlist.id, track, i.toLong())) }
            }
        }
        prefs.setTheme(theme)
        if (accent.isNotEmpty()) prefs.setAccent(accent)
    }
    private fun JSONArray.strings(): List<String> {
        require(length() <= 50_000) { "itens demais" }
        return (0 until length()).map { i ->
            val value = getString(i)
            val uri = Uri.parse(value)
            require(value.length <= 2048 && uri.scheme == "content" && uri.authority == "media") { "URI de música inválida" }
            value
        }
    }
    private fun java.io.InputStream.readBytesLimited(limit: Int): ByteArray {
        val out = java.io.ByteArrayOutputStream()
        val buffer = ByteArray(8192)
        while (true) {
            val count = read(buffer)
            if (count < 0) break
            require(out.size() + count <= limit) { "arquivo excede o limite de 4 MB" }
            out.write(buffer, 0, count)
        }
        return out.toByteArray()
    }
}
