package com.blackcuts.musicplayer

import android.app.Application
import android.content.ComponentName
import android.database.ContentObserver
import android.net.Uri
import com.blackcuts.musicplayer.data.BackupRepository
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import androidx.media3.common.Player
import androidx.media3.session.MediaController
import androidx.media3.session.SessionToken
import com.blackcuts.musicplayer.data.*
import com.blackcuts.musicplayer.playback.PlaybackService
import com.google.common.util.concurrent.ListenableFuture
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

class PlayerViewModel(app: Application) : AndroidViewModel(app) {
    private val library = MediaLibrary(app)
    private val dao = LibraryDatabase.get(app).libraryDao()
    private val prefs = Preferences(app)
    private val backups = BackupRepository(app, LibraryDatabase.get(app), prefs)
    val message = MutableStateFlow<String?>(null)
    val playbackError = MutableStateFlow<String?>(null)
    private var pendingPlay: Pair<List<Track>, Int>? = null
    val tracks = MutableStateFlow<List<Track>>(emptyList())
    val scanError = MutableStateFlow<String?>(null)
    val favorites = dao.favorites().stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())
    val playlists = dao.playlists().stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())
    val theme = prefs.theme.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), "AMOLED")
    val currentUri = MutableStateFlow<String?>(null)
    val playing = MutableStateFlow(false)
    val position = MutableStateFlow(0L)
    val duration = MutableStateFlow(0L)
    val shuffle = MutableStateFlow(false)
    val repeat = MutableStateFlow(Player.REPEAT_MODE_OFF)
    val speed = MutableStateFlow(1f)
    private var observer: ContentObserver? = null
    private var scanJob: Job? = null
    private var sleepJob: Job? = null
    private val controllerFuture: ListenableFuture<MediaController> = MediaController.Builder(app, SessionToken(app, ComponentName(app, PlaybackService::class.java))).buildAsync()
    private var controller: MediaController? = null
    private val listener = object : Player.Listener {
        override fun onEvents(player: Player, events: Player.Events) { sync(player) }
        override fun onPlayerError(error: androidx.media3.common.PlaybackException) { playbackError.value = "Não foi possível reproduzir este arquivo: ${error.errorCodeName}." }
    }
    init {
        controllerFuture.addListener({
            try { controller = controllerFuture.get().also { it.addListener(listener); sync(it) }; pendingPlay?.let { (items, index) -> pendingPlay = null; play(items, index) } }
            catch (_: Exception) { playbackError.value = "Não foi possível conectar ao serviço de áudio." }
        }, androidx.core.content.ContextCompat.getMainExecutor(app))
        viewModelScope.launch { while (isActive) { controller?.let { sync(it) }; delay(500) } }
    }
    private fun sync(player: Player) {
        currentUri.value = player.currentMediaItem?.mediaId
        playing.value = player.isPlaying
        position.value = player.currentPosition.coerceAtLeast(0)
        duration.value = player.duration.coerceAtLeast(0)
        shuffle.value = player.shuffleModeEnabled
        repeat.value = player.repeatMode
        speed.value = player.playbackParameters.speed
    }
    fun startLibrary() {
        if (observer == null) observer = library.observe { refresh() }
        refresh()
    }
    fun refresh() {
        scanJob?.cancel()
        scanJob = viewModelScope.launch {
            try { tracks.value = library.scan(); scanError.value = null }
            catch (cancelled: CancellationException) { throw cancelled }
            catch (_: SecurityException) { scanError.value = "Permita acesso às músicas para carregar a biblioteca." }
            catch (_: Exception) { scanError.value = "Não foi possível ler a biblioteca. Tente atualizar." }
        }
    }
    fun play(items: List<Track>, index: Int = 0) {
        if (items.isEmpty() || index !in items.indices) return
        val player = controller
        if (player == null) { pendingPlay = items to index; return }
        playbackError.value = null
        player.apply { setMediaItems(items.map { it.mediaItem() }, index, 0); prepare(); play() }
    }
    fun togglePlay() { controller?.let { if (it.isPlaying) it.pause() else it.play() } }
    fun next() { controller?.seekToNextMediaItem() }
    fun previous() { controller?.let { if (it.currentPosition > 3000) it.seekTo(0) else it.seekToPreviousMediaItem() } }
    fun seek(ms: Long) { controller?.seekTo(ms.coerceAtLeast(0)) }
    fun skip(ms: Long) { controller?.let { it.seekTo((it.currentPosition + ms).coerceAtLeast(0)) } }
    fun toggleShuffle() { controller?.let { it.shuffleModeEnabled = !it.shuffleModeEnabled } }
    fun cycleRepeat() { controller?.let { it.repeatMode = when (it.repeatMode) { Player.REPEAT_MODE_OFF -> Player.REPEAT_MODE_ALL; Player.REPEAT_MODE_ALL -> Player.REPEAT_MODE_ONE; else -> Player.REPEAT_MODE_OFF } } }
    fun setSpeed(value: Float) { controller?.setPlaybackSpeed(value) }
    fun sleep(minutes: Int) { sleepJob?.cancel(); if (minutes > 0) sleepJob = viewModelScope.launch { delay(minutes * 60_000L); controller?.pause() } }
    fun toggleFavorite(uri: String) = viewModelScope.launch { if (uri in favorites.value) dao.removeFavorite(uri) else dao.addFavorite(Favorite(uri)) }
    fun createPlaylist(name: String) = viewModelScope.launch { name.trim().takeIf { it.isNotEmpty() }?.let { dao.createPlaylist(Playlist(name = it)) } }
    fun deletePlaylist(playlist: Playlist) = viewModelScope.launch { dao.deletePlaylist(playlist) }
    fun addToPlaylist(playlist: Playlist, uri: String) = viewModelScope.launch { dao.addToPlaylist(PlaylistTrack(playlist.id, uri)) }
    fun playPlaylist(playlist: Playlist) = viewModelScope.launch { val map = tracks.value.associateBy { it.uri.toString() }; play(dao.playlistUris(playlist.id).mapNotNull { map[it] }) }
    fun exportBackup(uri: Uri) = viewModelScope.launch {
        message.value = try { backups.exportTo(uri); "Backup salvo. Os arquivos de música não foram copiados." } catch (e: CancellationException) { throw e } catch (e: Exception) { "Não foi possível salvar o backup: ${e.message ?: "erro desconhecido"}" }
    }
    fun importBackup(uri: Uri) = viewModelScope.launch {
        message.value = try { backups.importFrom(uri); "Backup restaurado. As músicas precisam estar disponíveis nas URIs originais." } catch (e: CancellationException) { throw e } catch (e: Exception) { "Não foi possível restaurar o backup: ${e.message ?: "arquivo inválido"}" }
    }
    fun clearMessage() { message.value = null }
    fun clearPlaybackError() { playbackError.value = null }
    fun setTheme(value: String) = viewModelScope.launch { prefs.setTheme(value) }
    override fun onCleared() {
        observer?.let(library::stopObserving)
        controller?.removeListener(listener)
        MediaController.releaseFuture(controllerFuture)
        super.onCleared()
    }
}
