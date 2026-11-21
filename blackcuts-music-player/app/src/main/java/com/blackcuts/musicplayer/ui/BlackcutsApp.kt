package com.blackcuts.musicplayer.ui

import android.content.Context
import android.content.Intent
import android.media.AudioManager
import android.net.Uri
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.animation.core.*
import androidx.compose.foundation.*
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.*
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.*
import androidx.compose.ui.draw.*
import androidx.compose.ui.graphics.*
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.*
import androidx.compose.ui.window.Dialog
import androidx.compose.ui.window.DialogProperties
import androidx.media3.common.Player
import coil.compose.AsyncImage
import com.blackcuts.musicplayer.PlayerViewModel
import com.blackcuts.musicplayer.data.Playlist
import com.blackcuts.musicplayer.data.Track
import com.blackcuts.musicplayer.playback.DeviceEqualizer

private val Violet = Color(0xFF9B7AFF)
private val Cyan = Color(0xFF84D6FF)
private val Muted = Color(0xFF9694A3)
private val DarkScheme = darkColorScheme(primary = Violet, secondary = Cyan, background = Color.Black, surface = Color(0xFF111019), surfaceVariant = Color(0xFF211E2B))
private val DimScheme = darkColorScheme(primary = Violet, secondary = Cyan, background = Color(0xFF14131A), surface = Color(0xFF211F29), surfaceVariant = Color(0xFF302D3A))
private val LightScheme = lightColorScheme(primary = Color(0xFF6644C7), secondary = Color(0xFF285A83), background = Color(0xFFF7F5FA), surface = Color.White, surfaceVariant = Color(0xFFE9E5F0))

@Composable fun BlackcutsApp(model: PlayerViewModel, requestLibrary: () -> Unit) {
    val theme by model.theme.collectAsState()
    MaterialTheme(colorScheme = when (theme) { "Claro" -> LightScheme; "Escuro" -> DimScheme; else -> DarkScheme }) {
        val tracks by model.tracks.collectAsState()
        val currentUri by model.currentUri.collectAsState()
        val playing by model.playing.collectAsState()
        val favorites by model.favorites.collectAsState()
        val playlists by model.playlists.collectAsState()
        val error by model.scanError.collectAsState()
        val message by model.message.collectAsState()
        val playbackError by model.playbackError.collectAsState()
        var tab by remember { mutableIntStateOf(0) }
        var expanded by remember { mutableStateOf(false) }
        var car by remember { mutableStateOf(false) }
        var equalizer by remember { mutableStateOf(false) }
        val current = tracks.firstOrNull { it.uri.toString() == currentUri }
        val labels = listOf("Início", "Biblioteca", "Descobrir", "Downloads", "Ajustes")
        val icons = listOf(Icons.Default.Home, Icons.Default.LibraryMusic, Icons.Default.Search, Icons.Default.Download, Icons.Default.Settings)
        Scaffold(containerColor = MaterialTheme.colorScheme.background, bottomBar = {
            Column {
                if (current != null) MiniPlayer(current, playing, { expanded = true }, model::togglePlay, model::next)
                NavigationBar(containerColor = MaterialTheme.colorScheme.surface, tonalElevation = 0.dp) {
                    labels.forEachIndexed { i, name -> NavigationBarItem(selected = tab == i, onClick = { tab = i }, icon = { Icon(icons[i], name) }, label = { Text(name, fontSize = 10.sp, maxLines = 1) }, colors = NavigationBarItemDefaults.colors(indicatorColor = MaterialTheme.colorScheme.primary.copy(alpha = .15f))) }
                }
            }
        }) { padding ->
            Column(Modifier.fillMaxSize().padding(padding).statusBarsPadding()) {
                when (tab) {
                    0 -> Home(tracks, current, playing, favorites, error, requestLibrary, { tab = 1 }, model)
                    1 -> Library(tracks, favorites, playlists, error, requestLibrary, model)
                    2 -> Discover()
                    3 -> InfoScreen("DOWNLOADS", "Sua central de downloads", "Downloads de fontes autorizadas ainda não estão disponíveis nesta versão. Seus arquivos locais continuam acessíveis na biblioteca.", Icons.Default.Download)
                    4 -> Settings(theme, model, { car = true }, { equalizer = true })
                }
            }
        }
        if (expanded && current != null) FullPlayer(current, model, favorites.contains(current.uri.toString()), playlists, { expanded = false })
        if (car) CarMode(current, playing, model, { car = false })
        if (equalizer) EqualizerDialog { equalizer = false }
        if (message != null) AlertDialog(onDismissRequest = model::clearMessage, title = { Text("BLACK°CUTS") }, text = { Text(message.orEmpty()) }, confirmButton = { TextButton(onClick = model::clearMessage) { Text("OK") } })
        if (playbackError != null) AlertDialog(onDismissRequest = model::clearPlaybackError, title = { Text("Reprodução") }, text = { Text(playbackError.orEmpty()) }, confirmButton = { TextButton(onClick = model::clearPlaybackError) { Text("OK") } })
    }
}

@Composable private fun Header(kicker: String, title: String, subtitle: String = "") {
    Column(Modifier.fillMaxWidth().padding(horizontal = 22.dp, vertical = 20.dp)) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            Text("BLACK", fontWeight = FontWeight.Black, letterSpacing = 2.sp, fontSize = 14.sp)
            Text("°", color = MaterialTheme.colorScheme.primary, fontWeight = FontWeight.Black, fontSize = 19.sp)
            Text("CUTS", fontWeight = FontWeight.Black, letterSpacing = 2.sp, fontSize = 14.sp)
            Spacer(Modifier.weight(1f))
            Text(kicker.uppercase(), color = MaterialTheme.colorScheme.primary, letterSpacing = 2.sp, fontSize = 9.sp, fontWeight = FontWeight.Bold)
        }
        Spacer(Modifier.height(28.dp))
        Text(title, style = MaterialTheme.typography.headlineMedium, fontWeight = FontWeight.Bold, letterSpacing = (-1).sp)
        if (subtitle.isNotBlank()) Text(subtitle, color = Muted, style = MaterialTheme.typography.bodyMedium, modifier = Modifier.padding(top = 6.dp))
    }
}
@Composable private fun Home(tracks: List<Track>, current: Track?, playing: Boolean, favorites: List<String>, error: String?, request: () -> Unit, library: () -> Unit, model: PlayerViewModel) {
    LazyColumn(contentPadding = PaddingValues(bottom = 24.dp)) {
        item { Header("sua música, seu universo", "Entre no som.", "Uma experiência feita para ouvir mais.") }
        item {
            Column(Modifier.padding(horizontal = 22.dp).fillMaxWidth().clip(RoundedCornerShape(28.dp)).background(Brush.linearGradient(listOf(Color(0xFF292053), Color(0xFF101126), Color(0xFF09090F)))).border(1.dp, Violet.copy(alpha = .35f), RoundedCornerShape(28.dp)).padding(24.dp)) {
                Text("SUA BIBLIOTECA", color = Cyan, letterSpacing = 2.sp, fontSize = 10.sp, fontWeight = FontWeight.Bold)
                Spacer(Modifier.height(18.dp))
                Icon(Icons.Default.GraphicEq, null, tint = Color.White, modifier = Modifier.size(50.dp))
                Spacer(Modifier.height(20.dp))
                Text(if (current == null) "O som começa aqui." else current.title, style = MaterialTheme.typography.headlineSmall, color = Color.White, fontWeight = FontWeight.Bold, maxLines = 1, overflow = TextOverflow.Ellipsis)
                Text(if (current == null) "Suas músicas. Do seu jeito." else current.artist, color = Color(0xFFBAB3CC), modifier = Modifier.padding(top = 5.dp))
                Spacer(Modifier.height(20.dp))
                Button(onClick = { if (current != null) model.togglePlay() else if (tracks.isNotEmpty()) model.play(tracks) else request() }, colors = ButtonDefaults.buttonColors(containerColor = Color.White, contentColor = Color.Black)) {
                    Icon(if (playing) Icons.Default.Pause else Icons.Default.PlayArrow, null); Spacer(Modifier.width(6.dp)); Text(if (playing) "Pausar" else if (tracks.isEmpty()) "Acessar músicas" else "Ouvir agora")
                }
            }
        }
        item {
            Row(Modifier.padding(horizontal = 22.dp, vertical = 24.dp), horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                StatCard("MÚSICAS", tracks.size.toString(), Modifier.weight(1f))
                StatCard("FAVORITAS", favorites.size.toString(), Modifier.weight(1f))
            }
        }
        item { Row(Modifier.fillMaxWidth().padding(horizontal = 22.dp), verticalAlignment = Alignment.CenterVertically) { Text("Sua coleção", fontWeight = FontWeight.Bold, style = MaterialTheme.typography.titleLarge, modifier = Modifier.weight(1f)); TextButton(onClick = library) { Text("VER TUDO") } } }
        if (error != null) item { Text(error, color = MaterialTheme.colorScheme.error, modifier = Modifier.padding(22.dp)) }
        if (tracks.isEmpty()) item { Text("Permita o acesso para encontrar as músicas do seu aparelho.", color = Muted, modifier = Modifier.padding(22.dp)) }
        itemsIndexed(tracks.take(5), key = { _, t -> t.id }) { i, track -> TrackRow(track, track.uri.toString() in favorites, { model.play(tracks, i) }, { model.toggleFavorite(track.uri.toString()) }) }
    }
}
@Composable private fun StatCard(label: String, value: String, modifier: Modifier) {
    Column(modifier.clip(RoundedCornerShape(18.dp)).background(MaterialTheme.colorScheme.surface).padding(18.dp)) {
        Text(value, style = MaterialTheme.typography.headlineSmall, fontWeight = FontWeight.Bold)
        Text(label, color = Muted, fontSize = 10.sp, letterSpacing = 1.sp)
    }
}
@Composable private fun Artwork(track: Track?, modifier: Modifier = Modifier) {
    Box(modifier.clip(RoundedCornerShape(16.dp)).background(Brush.linearGradient(listOf(Color(0xFF292051), Color(0xFF111323)))), contentAlignment = Alignment.Center) {
        Icon(Icons.Default.MusicNote, null, tint = Violet.copy(alpha = .6f), modifier = Modifier.fillMaxSize(.36f))
        if (track != null) AsyncImage(model = track.artwork, contentDescription = "Capa de ${track.album}", contentScale = androidx.compose.ui.layout.ContentScale.Crop, modifier = Modifier.fillMaxSize())
    }
}
@Composable private fun TrackRow(track: Track, favorite: Boolean, onClick: () -> Unit, onFavorite: () -> Unit) {
    Row(Modifier.fillMaxWidth().clickable(onClick = onClick).padding(horizontal = 22.dp, vertical = 7.dp), verticalAlignment = Alignment.CenterVertically) {
        Artwork(track, Modifier.size(54.dp)); Spacer(Modifier.width(14.dp))
        Column(Modifier.weight(1f)) { Text(track.title, fontWeight = FontWeight.SemiBold, maxLines = 1, overflow = TextOverflow.Ellipsis); Text(track.artist, color = Muted, style = MaterialTheme.typography.bodySmall, maxLines = 1, overflow = TextOverflow.Ellipsis) }
        IconButton(onClick = onFavorite) { Icon(if (favorite) Icons.Default.Favorite else Icons.Default.FavoriteBorder, "Favoritar", tint = if (favorite) Violet else Muted) }
    }
}
@Composable private fun MiniPlayer(track: Track, playing: Boolean, open: () -> Unit, toggle: () -> Unit, next: () -> Unit) {
    Row(Modifier.fillMaxWidth().padding(horizontal = 10.dp, vertical = 5.dp).clip(RoundedCornerShape(16.dp)).background(MaterialTheme.colorScheme.surfaceVariant).clickable(onClick = open).padding(8.dp), verticalAlignment = Alignment.CenterVertically) {
        Artwork(track, Modifier.size(46.dp)); Spacer(Modifier.width(10.dp))
        Column(Modifier.weight(1f)) { Text(track.title, maxLines = 1, overflow = TextOverflow.Ellipsis, fontWeight = FontWeight.Bold, style = MaterialTheme.typography.bodyMedium); Text(track.artist, color = Muted, maxLines = 1, style = MaterialTheme.typography.bodySmall) }
        IconButton(onClick = toggle) { Icon(if (playing) Icons.Default.Pause else Icons.Default.PlayArrow, if (playing) "Pausar" else "Reproduzir") }
        IconButton(onClick = next) { Icon(Icons.Default.SkipNext, "Próxima") }
    }
}

@Composable private fun Library(tracks: List<Track>, favorites: List<String>, playlists: List<Playlist>, error: String?, request: () -> Unit, model: PlayerViewModel) {
    var query by remember { mutableStateOf("") }
    var section by remember { mutableIntStateOf(0) }
    var creating by remember { mutableStateOf(false) }
    var newName by remember { mutableStateOf("") }
    var selectedPlaylist by remember { mutableStateOf<Playlist?>(null) }
    var deleting by remember { mutableStateOf<Playlist?>(null) }
    var renaming by remember { mutableStateOf<Playlist?>(null) }
    val filtered = tracks.filter { (section != 1 || it.uri.toString() in favorites) && (it.title.contains(query, true) || it.artist.contains(query, true) || it.album.contains(query, true)) }
    Column(Modifier.fillMaxSize()) {
        Header("coleção pessoal", "Biblioteca", "Tudo o que você gosta, em um só lugar.")
        OutlinedTextField(value = query, onValueChange = { query = it }, modifier = Modifier.fillMaxWidth().padding(horizontal = 22.dp), singleLine = true, leadingIcon = { Icon(Icons.Default.Search, null) }, placeholder = { Text("Buscar músicas, artistas, álbuns") }, shape = RoundedCornerShape(16.dp))
        Row(Modifier.horizontalScroll(rememberScrollState()).padding(horizontal = 22.dp, vertical = 12.dp), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            listOf("Músicas", "Favoritas", "Playlists").forEachIndexed { i, label -> FilterChip(selected = section == i, onClick = { section = i }, label = { Text(label) }) }
            IconButton(onClick = { model.refresh() }) { Icon(Icons.Default.Refresh, "Atualizar biblioteca") }
        }
        if (section == 2) {
            val selected = selectedPlaylist?.let { item -> playlists.firstOrNull { it.id == item.id } ?: item }
            Row(Modifier.fillMaxWidth().padding(horizontal = 22.dp), verticalAlignment = Alignment.CenterVertically) {
                if (selected != null) IconButton(onClick = { selectedPlaylist = null }) { Icon(Icons.Default.ArrowBack, "Voltar para playlists") }
                Text(selected?.name ?: "Suas playlists", Modifier.weight(1f), fontWeight = FontWeight.Bold, maxLines = 1)
                if (selected == null) TextButton(onClick = { creating = true }) { Text("CRIAR") }
                else IconButton(onClick = { renaming = selected; newName = selected.name }) { Icon(Icons.Default.Edit, "Renomear playlist") }
            }
            if (selected != null) {
                val uriFlow = remember(selected.id) { model.playlistTracks(selected.id) }
                val uris by uriFlow.collectAsState(initial = emptyList())
                val byUri = remember(tracks) { tracks.associateBy { it.uri.toString() } }
                val available = uris.mapNotNull { byUri[it] }
                if (available.isEmpty()) Text("Nenhuma música disponível. Adicione faixas pelo player.", color = Muted, modifier = Modifier.padding(22.dp))
                if (available.size < uris.size) Text("Algumas faixas não estão disponíveis neste aparelho.", color = Muted, modifier = Modifier.padding(horizontal = 22.dp))
                LazyColumn { itemsIndexed(available, key = { _, t -> t.id }) { i, t ->
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Column(Modifier.weight(1f)) { TrackRow(t, t.uri.toString() in favorites, { model.play(available, i) }, { model.toggleFavorite(t.uri.toString()) }) }
                        IconButton(onClick = { model.removeFromPlaylist(selected, t.uri.toString()) }) { Icon(Icons.Default.RemoveCircleOutline, "Remover da playlist") }
                    }
                } }
            } else {
            if (playlists.isEmpty()) Text("Crie uma playlist e adicione músicas pelo player.", color = Muted, modifier = Modifier.padding(22.dp))
            LazyColumn { itemsIndexed(playlists.filter { it.name.contains(query, true) }, key = { _, p -> p.id }) { _, playlist ->
                Row(Modifier.fillMaxWidth().clickable { selectedPlaylist = playlist }.padding(horizontal = 22.dp, vertical = 8.dp), verticalAlignment = Alignment.CenterVertically) {
                    Icon(Icons.Default.QueueMusic, null, tint = Violet, modifier = Modifier.size(42.dp)); Spacer(Modifier.width(14.dp)); Text(playlist.name, Modifier.weight(1f), fontWeight = FontWeight.SemiBold)
                    IconButton(onClick = { deleting = playlist }) { Icon(Icons.Default.DeleteOutline, "Excluir playlist") }
                    IconButton(onClick = { model.playPlaylist(playlist) }) { Icon(Icons.Default.PlayArrow, "Reproduzir playlist") }
                }
            } }
            }
        } else {
            if (error != null) Text(error, color = MaterialTheme.colorScheme.error, modifier = Modifier.padding(horizontal = 22.dp))
            if (tracks.isEmpty()) TextButton(onClick = request, modifier = Modifier.padding(horizontal = 14.dp)) { Text("PERMITIR ACESSO ÀS MÚSICAS") }
            if (filtered.isEmpty() && tracks.isNotEmpty()) Text("Nenhuma música encontrada.", color = Muted, modifier = Modifier.padding(22.dp))
            LazyColumn(contentPadding = PaddingValues(bottom = 16.dp)) { itemsIndexed(filtered, key = { _, t -> t.id }) { i, t -> TrackRow(t, t.uri.toString() in favorites, { model.play(filtered, i) }, { model.toggleFavorite(t.uri.toString()) }) } }
        }
    }
    deleting?.let { playlist -> AlertDialog(onDismissRequest = { deleting = null }, title = { Text("Excluir playlist?") }, text = { Text("A playlist ${playlist.name} será excluída. Os arquivos de música não serão apagados.") }, confirmButton = { TextButton(onClick = { model.deletePlaylist(playlist); deleting = null }) { Text("EXCLUIR") } }, dismissButton = { TextButton(onClick = { deleting = null }) { Text("CANCELAR") } }) }
    renaming?.let { playlist -> AlertDialog(onDismissRequest = { renaming = null }, title = { Text("Renomear playlist") }, text = { OutlinedTextField(value = newName, onValueChange = { newName = it }, label = { Text("Nome") }, singleLine = true) }, confirmButton = { TextButton(onClick = { model.renamePlaylist(playlist, newName); renaming = null; newName = "" }) { Text("SALVAR") } }, dismissButton = { TextButton(onClick = { renaming = null; newName = "" }) { Text("CANCELAR") } }) }
    if (creating) AlertDialog(onDismissRequest = { creating = false }, title = { Text("Nova playlist") }, text = { OutlinedTextField(value = newName, onValueChange = { newName = it }, label = { Text("Nome") }, singleLine = true) }, confirmButton = { TextButton(onClick = { model.createPlaylist(newName); newName = ""; creating = false }) { Text("CRIAR") } }, dismissButton = { TextButton(onClick = { creating = false }) { Text("CANCELAR") } })
}
@Composable private fun Discover() {
    val context = LocalContext.current
    var query by remember { mutableStateOf("") }
    Column(Modifier.fillMaxSize()) {
        Header("além da biblioteca", "Descobrir", "Encontre novas músicas nas fontes oficiais.")
        OutlinedTextField(value = query, onValueChange = { query = it }, modifier = Modifier.fillMaxWidth().padding(horizontal = 22.dp), singleLine = true, leadingIcon = { Icon(Icons.Default.Search, null) }, placeholder = { Text("Título, artista, álbum ou gênero") }, shape = RoundedCornerShape(16.dp))
        Spacer(Modifier.height(16.dp))
        Button(onClick = {
            val uri = Uri.parse("https://www.youtube.com/results").buildUpon().appendQueryParameter("search_query", query).build()
            runCatching { context.startActivity(Intent(Intent.ACTION_VIEW, uri)) }
        }, enabled = query.isNotBlank(), modifier = Modifier.padding(horizontal = 22.dp)) { Icon(Icons.Default.OpenInNew, null); Spacer(Modifier.width(8.dp)); Text("PESQUISAR NO YOUTUBE") }
        Text("A pesquisa abre o YouTube ou o navegador. A API de resultados integrada ainda não está configurada.", color = Muted, style = MaterialTheme.typography.bodyMedium, modifier = Modifier.padding(22.dp))
    }
}
@Composable private fun InfoScreen(kicker: String, title: String, message: String, icon: ImageVector) {
    Column { Header(kicker, title); Icon(icon, null, tint = Violet, modifier = Modifier.padding(start = 22.dp, top = 20.dp).size(48.dp)); Text(message, color = Muted, modifier = Modifier.padding(22.dp)) }
}
@Composable private fun Settings(theme: String, model: PlayerViewModel, openCar: () -> Unit, openEqualizer: () -> Unit) {
    val saveBackup = rememberLauncherForActivityResult(ActivityResultContracts.CreateDocument("application/json")) { uri -> uri?.let(model::exportBackup) }
    val loadBackup = rememberLauncherForActivityResult(ActivityResultContracts.OpenDocument()) { uri -> uri?.let(model::importBackup) }
    var confirmRestore by remember { mutableStateOf(false) }
    Column(Modifier.verticalScroll(rememberScrollState())) {
        Header("personalize", "Ajustes", "Faça o BLACK°CUTS ser seu.")
        Text("APARÊNCIA", color = Violet, letterSpacing = 1.5.sp, fontSize = 11.sp, fontWeight = FontWeight.Bold, modifier = Modifier.padding(horizontal = 22.dp, vertical = 12.dp))
        Row(Modifier.padding(horizontal = 22.dp), horizontalArrangement = Arrangement.spacedBy(8.dp)) { listOf("AMOLED", "Escuro", "Claro").forEach { FilterChip(selected = it == theme, onClick = { model.setTheme(it) }, label = { Text(it) }) } }
        HorizontalDivider(Modifier.padding(22.dp), color = MaterialTheme.colorScheme.surfaceVariant)
        ListItem(headlineContent = { Text("Equalizador do dispositivo") }, supportingContent = { Text("Bandas de áudio disponíveis no aparelho") }, leadingContent = { Icon(Icons.Default.Equalizer, null, tint = Violet) }, modifier = Modifier.clickable(onClick = openEqualizer), colors = ListItemDefaults.colors(containerColor = Color.Transparent))
        ListItem(headlineContent = { Text("Modo carro") }, supportingContent = { Text("Controles ampliados. Configure antes de dirigir.") }, leadingContent = { Icon(Icons.Default.DirectionsCar, null, tint = Violet) }, modifier = Modifier.clickable(onClick = openCar), colors = ListItemDefaults.colors(containerColor = Color.Transparent))
        ListItem(headlineContent = { Text("Atualizar biblioteca") }, supportingContent = { Text("Buscar novamente músicas no aparelho") }, leadingContent = { Icon(Icons.Default.Refresh, null, tint = Violet) }, modifier = Modifier.clickable { model.refresh() }, colors = ListItemDefaults.colors(containerColor = Color.Transparent))
        ListItem(headlineContent = { Text("Salvar backup") }, supportingContent = { Text("Favoritos, playlists e aparência; não copia músicas") }, leadingContent = { Icon(Icons.Default.Backup, null, tint = Violet) }, modifier = Modifier.clickable { saveBackup.launch("blackcuts-backup.json") }, colors = ListItemDefaults.colors(containerColor = Color.Transparent))
        ListItem(headlineContent = { Text("Restaurar backup") }, supportingContent = { Text("Mescla com os dados existentes") }, leadingContent = { Icon(Icons.Default.Restore, null, tint = Violet) }, modifier = Modifier.clickable { confirmRestore = true }, colors = ListItemDefaults.colors(containerColor = Color.Transparent))
        ListItem(headlineContent = { Text("Sobre esta versão") }, supportingContent = { Text("BLACK°CUTS MUSIC PLAYER · 1.0.0\nProjeto em desenvolvimento. Consulte a documentação para conhecer limitações e privacidade.") }, leadingContent = { Icon(Icons.Default.Info, null, tint = Violet) }, colors = ListItemDefaults.colors(containerColor = Color.Transparent))
    }
    if (confirmRestore) AlertDialog(onDismissRequest = { confirmRestore = false }, title = { Text("Restaurar backup") }, text = { Text("Os favoritos e playlists serão mesclados. As músicas não estão incluídas e as URIs podem não funcionar em outro aparelho.") }, confirmButton = { TextButton(onClick = { confirmRestore = false; loadBackup.launch(arrayOf("application/json", "text/plain")) }) { Text("ESCOLHER ARQUIVO") } }, dismissButton = { TextButton(onClick = { confirmRestore = false }) { Text("CANCELAR") } })
}

@Composable private fun FullPlayer(track: Track, model: PlayerViewModel, favorite: Boolean, playlists: List<Playlist>, close: () -> Unit) {
    val playing by model.playing.collectAsState()
    val pos by model.position.collectAsState()
    val duration by model.duration.collectAsState()
    val shuffled by model.shuffle.collectAsState()
    val repeat by model.repeat.collectAsState()
    val speed by model.speed.collectAsState()
    var showPlaylists by remember { mutableStateOf(false) }
    var showTimer by remember { mutableStateOf(false) }
    val transition = rememberInfiniteTransition(label = "glow")
    val glow by transition.animateFloat(initialValue = .22f, targetValue = if (playing) .62f else .22f, animationSpec = infiniteRepeatable(tween(1800, easing = FastOutSlowInEasing), RepeatMode.Reverse), label = "pulse")
    val context = LocalContext.current
    val audio = remember { context.getSystemService(Context.AUDIO_SERVICE) as AudioManager }
    var volume by remember { mutableFloatStateOf(audio.getStreamVolume(AudioManager.STREAM_MUSIC).toFloat()) }
    Dialog(onDismissRequest = close, properties = DialogProperties(usePlatformDefaultWidth = false)) {
        Column(Modifier.fillMaxSize().background(Brush.verticalGradient(listOf(Color(0xFF100B25), Color.Black, Color(0xFF09091B)))).statusBarsPadding().navigationBarsPadding().verticalScroll(rememberScrollState()).padding(horizontal = 24.dp), horizontalAlignment = Alignment.CenterHorizontally) {
            Row(Modifier.fillMaxWidth().padding(vertical = 12.dp), verticalAlignment = Alignment.CenterVertically) {
                IconButton(onClick = close) { Icon(Icons.Default.KeyboardArrowDown, "Fechar player", tint = Color.White) }
                Spacer(Modifier.weight(1f)); Text("TOCANDO AGORA", color = Color(0xFFBFB7D9), fontSize = 10.sp, letterSpacing = 2.sp); Spacer(Modifier.weight(1f))
                IconButton(onClick = { showPlaylists = true }) { Icon(Icons.Default.PlaylistAdd, "Adicionar à playlist", tint = Color.White) }
            }
            Spacer(Modifier.height(24.dp))
            Box(Modifier.fillMaxWidth(.87f).aspectRatio(1f).shadow(30.dp, RoundedCornerShape(26.dp), ambientColor = Violet.copy(alpha = glow), spotColor = Cyan.copy(alpha = glow)).border(1.dp, Violet.copy(alpha = glow), RoundedCornerShape(26.dp)), contentAlignment = Alignment.Center) { Artwork(track, Modifier.fillMaxSize()) }
            Spacer(Modifier.height(28.dp))
            Row(Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
                Column(Modifier.weight(1f)) { Text(track.title, color = Color.White, fontWeight = FontWeight.Bold, fontSize = 24.sp, maxLines = 1, overflow = TextOverflow.Ellipsis); Text(track.artist, color = Color(0xFFAAA5BB), fontSize = 15.sp, maxLines = 1) }
                IconButton(onClick = { model.toggleFavorite(track.uri.toString()) }) { Icon(if (favorite) Icons.Default.Favorite else Icons.Default.FavoriteBorder, "Favoritar", tint = if (favorite) Violet else Color.White) }
            }
            Spacer(Modifier.height(18.dp))
            Slider(value = pos.coerceAtMost(duration).toFloat(), onValueChange = { model.seek(it.toLong()) }, valueRange = 0f..duration.coerceAtLeast(1).toFloat(), colors = SliderDefaults.colors(thumbColor = Color.White, activeTrackColor = Color.White, inactiveTrackColor = Color(0xFF494455)))
            Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) { Text(formatTime(pos), color = Muted, fontSize = 12.sp); Text(formatTime(duration), color = Muted, fontSize = 12.sp) }
            Row(Modifier.fillMaxWidth().padding(vertical = 14.dp), verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.SpaceBetween) {
                IconButton(onClick = model::toggleShuffle) { Icon(Icons.Default.Shuffle, "Aleatório", tint = if (shuffled) Violet else Color.LightGray) }
                IconButton(onClick = model::previous) { Icon(Icons.Default.SkipPrevious, "Anterior", tint = Color.White, modifier = Modifier.size(34.dp)) }
                FilledIconButton(onClick = model::togglePlay, modifier = Modifier.size(70.dp), colors = IconButtonDefaults.filledIconButtonColors(containerColor = Color.White, contentColor = Color.Black)) { Icon(if (playing) Icons.Default.Pause else Icons.Default.PlayArrow, if (playing) "Pausar" else "Reproduzir", modifier = Modifier.size(36.dp)) }
                IconButton(onClick = model::next) { Icon(Icons.Default.SkipNext, "Próxima", tint = Color.White, modifier = Modifier.size(34.dp)) }
                IconButton(onClick = model::cycleRepeat) { Icon(if (repeat == Player.REPEAT_MODE_ONE) Icons.Default.RepeatOne else Icons.Default.Repeat, "Repetir", tint = if (repeat != Player.REPEAT_MODE_OFF) Violet else Color.LightGray) }
            }
            Row(verticalAlignment = Alignment.CenterVertically) {
                TextButton(onClick = { model.skip(-10_000) }) { Text("−10s", color = Color.White) }
                TextButton(onClick = { model.skip(10_000) }) { Text("+10s", color = Color.White) }
                TextButton(onClick = { model.setSpeed(if (speed >= 2f) .5f else speed + .25f) }) { Text("${speed}x", color = Color.White) }
                IconButton(onClick = { showTimer = true }) { Icon(Icons.Default.Timer, "Temporizador", tint = Color.White) }
                IconButton(onClick = { val intent = Intent(Intent.ACTION_SEND).setType("audio/*").putExtra(Intent.EXTRA_STREAM, track.uri).addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION); runCatching { context.startActivity(Intent.createChooser(intent, "Compartilhar música")) } }) { Icon(Icons.Default.Share, "Compartilhar", tint = Color.White) }
            }
            Row(Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) { Icon(Icons.Default.VolumeDown, null, tint = Muted); Slider(value = volume, onValueChange = { volume = it; audio.setStreamVolume(AudioManager.STREAM_MUSIC, it.toInt(), 0) }, valueRange = 0f..audio.getStreamMaxVolume(AudioManager.STREAM_MUSIC).coerceAtLeast(1).toFloat(), modifier = Modifier.weight(1f)); Icon(Icons.Default.VolumeUp, null, tint = Muted) }
            Spacer(Modifier.height(16.dp))
        }
    }
    if (showPlaylists) AlertDialog(onDismissRequest = { showPlaylists = false }, title = { Text("Adicionar à playlist") }, text = { Column { if (playlists.isEmpty()) Text("Crie uma playlist na Biblioteca primeiro.") else playlists.forEach { p -> TextButton(onClick = { model.addToPlaylist(p, track.uri.toString()); showPlaylists = false }) { Text(p.name) } } } }, confirmButton = { TextButton(onClick = { showPlaylists = false }) { Text("FECHAR") } })
    if (showTimer) AlertDialog(onDismissRequest = { showTimer = false }, title = { Text("Temporizador") }, text = { Column { listOf(0, 15, 30, 60).forEach { minutes -> TextButton(onClick = { model.sleep(minutes); showTimer = false }) { Text(if (minutes == 0) "Desativar" else "$minutes minutos") } } } }, confirmButton = { TextButton(onClick = { showTimer = false }) { Text("FECHAR") } })
}
@Composable private fun CarMode(track: Track?, playing: Boolean, model: PlayerViewModel, close: () -> Unit) {
    Dialog(onDismissRequest = close, properties = DialogProperties(usePlatformDefaultWidth = false)) {
        Column(Modifier.fillMaxSize().background(Color.Black).statusBarsPadding().navigationBarsPadding().padding(24.dp), horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.Center) {
            Text("CAR MODE", color = Violet, letterSpacing = 3.sp, fontWeight = FontWeight.Bold)
            Spacer(Modifier.height(30.dp)); Text(track?.title ?: "Nenhuma música selecionada", color = Color.White, style = MaterialTheme.typography.headlineMedium, maxLines = 2)
            Text(track?.artist ?: "Selecione uma música antes de dirigir", color = Color.LightGray, modifier = Modifier.padding(12.dp))
            Spacer(Modifier.height(24.dp)); Row(verticalAlignment = Alignment.CenterVertically) {
                IconButton(onClick = model::previous, modifier = Modifier.size(76.dp)) { Icon(Icons.Default.SkipPrevious, "Anterior", tint = Color.White, modifier = Modifier.size(48.dp)) }
                FilledIconButton(onClick = model::togglePlay, modifier = Modifier.size(90.dp), colors = IconButtonDefaults.filledIconButtonColors(containerColor = Color.White, contentColor = Color.Black)) { Icon(if (playing) Icons.Default.Pause else Icons.Default.PlayArrow, "Reproduzir ou pausar", modifier = Modifier.size(50.dp)) }
                IconButton(onClick = model::next, modifier = Modifier.size(76.dp)) { Icon(Icons.Default.SkipNext, "Próxima", tint = Color.White, modifier = Modifier.size(48.dp)) }
            }
            Spacer(Modifier.height(35.dp)); Text("Evite interagir com a tela enquanto dirige.", color = Color.LightGray); TextButton(onClick = close) { Text("SAIR DO MODO CARRO") }
        }
    }
}

@Composable private fun EqualizerDialog(close: () -> Unit) {
    val state by DeviceEqualizer.state.collectAsState()
    Dialog(onDismissRequest = close, properties = DialogProperties(usePlatformDefaultWidth = false)) {
        Column(Modifier.fillMaxSize().background(MaterialTheme.colorScheme.background).statusBarsPadding().navigationBarsPadding().verticalScroll(rememberScrollState()).padding(22.dp)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                IconButton(onClick = close) { Icon(Icons.Default.ArrowBack, "Voltar") }
                Text("Equalizador", style = MaterialTheme.typography.headlineSmall, fontWeight = FontWeight.Bold, modifier = Modifier.weight(1f))
                Switch(checked = state.enabled, onCheckedChange = DeviceEqualizer::enable, enabled = state.available)
            }
            Text("O processamento usa o efeito de áudio do Android. As bandas e a qualidade dependem do aparelho.", color = Muted, modifier = Modifier.padding(vertical = 16.dp))
            if (!state.available) Text(state.message, color = Muted)
            state.bands.forEach { band ->
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Text(if (band.hz >= 1000) "${band.hz / 1000f} kHz" else "${band.hz} Hz", modifier = Modifier.width(75.dp))
                    Slider(value = band.level.toFloat(), onValueChange = { DeviceEqualizer.setBand(band.index, it.toInt()) }, valueRange = state.minimum.toFloat()..state.maximum.toFloat().coerceAtLeast(state.minimum + 1f), enabled = state.enabled, modifier = Modifier.weight(1f))
                    Text("${band.level / 100f} dB", modifier = Modifier.width(65.dp), fontSize = 12.sp)
                }
            }
        }
    }
}
