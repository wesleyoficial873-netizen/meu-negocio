package com.blackcuts.musicplayer.data

import android.content.ContentUris
import android.content.Context
import android.database.ContentObserver
import android.net.Uri
import android.os.Handler
import android.os.Looper
import android.provider.MediaStore
import androidx.media3.common.MediaItem
import androidx.media3.common.MediaMetadata
import androidx.room.*
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.withContext

/** MediaStore owns the files; this model never deletes or modifies them. */
data class Track(val id: Long, val uri: Uri, val title: String, val artist: String, val album: String, val albumId: Long, val duration: Long) {
    val artwork: Uri get() = ContentUris.withAppendedId(Uri.parse("content://media/external/audio/albumart"), albumId)
    fun mediaItem(): MediaItem = MediaItem.Builder().setMediaId(uri.toString()).setUri(uri)
        .setMediaMetadata(MediaMetadata.Builder().setTitle(title).setArtist(artist).setAlbumTitle(album).setArtworkUri(artwork).build()).build()
}

class MediaLibrary(private val context: Context) {
    suspend fun scan(): List<Track> = withContext(Dispatchers.IO) {
        val collection = MediaStore.Audio.Media.EXTERNAL_CONTENT_URI
        val columns = arrayOf(MediaStore.Audio.Media._ID, MediaStore.Audio.Media.TITLE, MediaStore.Audio.Media.ARTIST,
            MediaStore.Audio.Media.ALBUM, MediaStore.Audio.Media.ALBUM_ID, MediaStore.Audio.Media.DURATION)
        val tracks = mutableListOf<Track>()
        context.contentResolver.query(collection, columns, "${MediaStore.Audio.Media.IS_MUSIC} != 0", null,
            "${MediaStore.Audio.Media.TITLE} COLLATE NOCASE ASC")?.use { cursor ->
            val id = cursor.getColumnIndexOrThrow(columns[0]); val title = cursor.getColumnIndexOrThrow(columns[1])
            val artist = cursor.getColumnIndexOrThrow(columns[2]); val album = cursor.getColumnIndexOrThrow(columns[3])
            val albumId = cursor.getColumnIndexOrThrow(columns[4]); val duration = cursor.getColumnIndexOrThrow(columns[5])
            while (cursor.moveToNext()) {
                val trackId = cursor.getLong(id)
                tracks += Track(trackId, ContentUris.withAppendedId(collection, trackId),
                    cursor.getString(title).orEmpty().ifBlank { "Sem título" },
                    cursor.getString(artist).orEmpty().takeUnless { it.isBlank() || it == "<unknown>" } ?: "Artista desconhecido",
                    cursor.getString(album).orEmpty().takeUnless { it.isBlank() || it == "<unknown>" } ?: "Álbum desconhecido",
                    cursor.getLong(albumId), cursor.getLong(duration).coerceAtLeast(0))
            }
        }
        tracks
    }
    fun observe(onChange: () -> Unit): ContentObserver = object : ContentObserver(Handler(Looper.getMainLooper())) {
        override fun onChange(selfChange: Boolean) = onChange()
    }.also { context.contentResolver.registerContentObserver(MediaStore.Audio.Media.EXTERNAL_CONTENT_URI, true, it) }
    fun stopObserving(observer: ContentObserver) = context.contentResolver.unregisterContentObserver(observer)
}

@Entity(tableName = "favorites") data class Favorite(@PrimaryKey val uri: String)
@Entity(tableName = "playlists", indices = [Index(value = ["name"], unique = true)]) data class Playlist(@PrimaryKey(autoGenerate = true) val id: Long = 0, val name: String)
@Entity(tableName = "playlist_tracks", primaryKeys = ["playlistId", "uri"], foreignKeys = [ForeignKey(entity = Playlist::class, parentColumns = ["id"], childColumns = ["playlistId"], onDelete = ForeignKey.CASCADE)], indices = [Index(value = ["playlistId"])])
data class PlaylistTrack(val playlistId: Long, val uri: String, val addedAt: Long = System.currentTimeMillis())

@Dao interface LibraryDao {
    @Query("SELECT uri FROM favorites") fun favorites(): Flow<List<String>>
    @Query("SELECT uri FROM favorites") suspend fun favoriteSnapshot(): List<String>
    @Query("SELECT * FROM playlists ORDER BY id") suspend fun playlistSnapshot(): List<Playlist>
    @Query("SELECT * FROM playlists WHERE name = :name LIMIT 1") suspend fun playlistByName(name: String): Playlist?
    @Insert(onConflict = OnConflictStrategy.IGNORE) suspend fun addFavorite(favorite: Favorite)
    @Query("DELETE FROM favorites WHERE uri = :uri") suspend fun removeFavorite(uri: String)
    @Query("SELECT * FROM playlists ORDER BY name COLLATE NOCASE") fun playlists(): Flow<List<Playlist>>
    @Insert(onConflict = OnConflictStrategy.IGNORE) suspend fun createPlaylist(playlist: Playlist)
    @Delete suspend fun deletePlaylist(playlist: Playlist)
    @Insert(onConflict = OnConflictStrategy.IGNORE) suspend fun addToPlaylist(item: PlaylistTrack)
    @Query("UPDATE playlists SET name = :name WHERE id = :id") suspend fun renamePlaylist(id: Long, name: String)
    @Query("DELETE FROM playlist_tracks WHERE playlistId = :playlistId AND uri = :uri") suspend fun removeFromPlaylist(playlistId: Long, uri: String)
    @Query("SELECT uri FROM playlist_tracks WHERE playlistId = :playlistId ORDER BY addedAt") fun observePlaylistUris(playlistId: Long): Flow<List<String>>
    @Query("SELECT uri FROM playlist_tracks WHERE playlistId = :playlistId ORDER BY addedAt") suspend fun playlistUris(playlistId: Long): List<String>
}
@Database(entities = [Favorite::class, Playlist::class, PlaylistTrack::class], version = 1, exportSchema = false)
abstract class LibraryDatabase : RoomDatabase() {
    abstract fun libraryDao(): LibraryDao
    companion object {
        @Volatile private var instance: LibraryDatabase? = null
        fun get(context: Context): LibraryDatabase = instance ?: synchronized(this) {
            instance ?: Room.databaseBuilder(context.applicationContext, LibraryDatabase::class.java, "blackcuts.db").build().also { instance = it }
        }
    }
}
