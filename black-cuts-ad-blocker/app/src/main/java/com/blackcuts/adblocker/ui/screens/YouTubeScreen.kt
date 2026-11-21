package com.blackcuts.adblocker.ui.screens

import android.net.Uri
import android.widget.MediaController
import android.widget.VideoView
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.viewinterop.AndroidView
import com.blackcuts.adblocker.ui.theme.ActiveGreen
import com.blackcuts.adblocker.ui.theme.AmoledBlack
import com.blackcuts.adblocker.ui.theme.BorderDark
import com.blackcuts.adblocker.ui.theme.CardDark
import com.blackcuts.adblocker.ui.theme.InactiveRed
import com.blackcuts.adblocker.ui.theme.MutedWhite
import com.blackcuts.adblocker.ui.theme.PureWhite
import com.blackcuts.adblocker.youtube.PipedRepository
import com.blackcuts.adblocker.youtube.YouTubeVideoItem
import kotlinx.coroutines.launch

@Composable
fun YouTubeScreen() {
    val scope = rememberCoroutineScope()
    var query by remember { mutableStateOf("") }
    var results by remember { mutableStateOf<List<YouTubeVideoItem>>(emptyList()) }
    var activeStreamUrl by remember { mutableStateOf<String?>(null) }
    var activeTitle by remember { mutableStateOf<String?>(null) }
    var isLoading by remember { mutableStateOf(false) }
    var errorMessage by remember { mutableStateOf<String?>(null) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(AmoledBlack)
            .padding(20.dp)
    ) {
        Text(
            text = "YouTube Sem Anúncios",
            style = MaterialTheme.typography.headlineLarge
        )
        Text(
            text = "Player integrado via Piped API (baseado em LibreTube • GPL-3.0)",
            style = MaterialTheme.typography.bodyMedium,
            fontSize = 12.sp
        )

        Spacer(modifier = Modifier.height(12.dp))

        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            OutlinedTextField(
                value = query,
                onValueChange = { query = it },
                placeholder = { Text("Buscar vídeo no YouTube...") },
                singleLine = true,
                modifier = Modifier.weight(1f)
            )
            Button(
                onClick = {
                    if (query.isNotBlank()) {
                        isLoading = true
                        errorMessage = null
                        scope.launch {
                            PipedRepository.search(query.trim())
                                .onSuccess { results = it }
                                .onFailure { errorMessage = it.message }
                            isLoading = false
                        }
                    }
                },
                colors = ButtonDefaults.buttonColors(containerColor = ActiveGreen, contentColor = AmoledBlack)
            ) {
                Text("Buscar")
            }
        }

        Spacer(modifier = Modifier.height(12.dp))

        if (isLoading) {
            CircularProgressIndicator(color = ActiveGreen, modifier = Modifier.align(Alignment.CenterHorizontally))
            Spacer(modifier = Modifier.height(12.dp))
        }

        errorMessage?.let {
            Text(text = it, color = InactiveRed, fontSize = 12.sp)
            Spacer(modifier = Modifier.height(8.dp))
        }

        activeStreamUrl?.let { streamUrl ->
            Text(
                text = activeTitle ?: "Reproduzindo sem anúncios",
                color = ActiveGreen,
                fontSize = 14.sp
            )
            Spacer(modifier = Modifier.height(6.dp))
            AndroidView(
                factory = { ctx ->
                    VideoView(ctx).apply {
                        val controller = MediaController(ctx)
                        controller.setAnchorView(this)
                        setMediaController(controller)
                        setVideoURI(Uri.parse(streamUrl))
                        start()
                    }
                },
                update = { view ->
                    view.setVideoURI(Uri.parse(streamUrl))
                    view.start()
                },
                modifier = Modifier
                    .fillMaxWidth()
                    .height(210.dp)
            )
            Spacer(modifier = Modifier.height(12.dp))
        }

        LazyColumn(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            items(results, key = { it.videoId }) { item ->
                Card(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clickable {
                            isLoading = true
                            errorMessage = null
                            scope.launch {
                                PipedRepository.getStreamUrl(item.videoId)
                                    .onSuccess { stream ->
                                        activeTitle = stream.title
                                        activeStreamUrl = stream.streamUrl
                                    }
                                    .onFailure { errorMessage = it.message }
                                isLoading = false
                            }
                        },
                    colors = CardDefaults.cardColors(containerColor = CardDark),
                    border = BorderStroke(1.dp, BorderDark),
                    shape = RoundedCornerShape(12.dp)
                ) {
                    Column(modifier = Modifier.padding(14.dp)) {
                        Text(text = item.title, color = PureWhite, fontSize = 14.sp)
                        Spacer(modifier = Modifier.height(4.dp))
                        Text(text = item.uploader, color = MutedWhite, fontSize = 12.sp)
                    }
                }
            }
        }
    }
}
