package com.blackcuts.musicplayer

import android.Manifest
import android.app.Activity
import android.app.RecoverableSecurityException
import android.content.IntentSender
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.provider.MediaStore
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.result.IntentSenderRequest
import androidx.activity.result.contract.ActivityResultContracts
import androidx.activity.viewModels
import androidx.core.content.ContextCompat
import androidx.lifecycle.lifecycleScope
import com.blackcuts.musicplayer.data.Track
import com.blackcuts.musicplayer.ui.BlackcutsApp
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class MainActivity : ComponentActivity() {
    private val model: PlayerViewModel by viewModels()
    private var pendingDelete: Uri? = null
    private var retryAfterGrant = false
    private val permission = registerForActivityResult(ActivityResultContracts.RequestPermission()) { granted -> if (granted) model.startLibrary() }
    private val writePermission = registerForActivityResult(ActivityResultContracts.RequestPermission()) { granted ->
        val uri = pendingDelete
        if (granted && uri != null) deleteDirectly(uri) else { pendingDelete = null; model.reportMessage("A permissão para excluir o arquivo não foi concedida.") }
    }
    private val deleteConfirmation = registerForActivityResult(ActivityResultContracts.StartIntentSenderForResult()) { result ->
        val uri = pendingDelete
        val retry = retryAfterGrant
        retryAfterGrant = false
        if (result.resultCode == Activity.RESULT_OK && uri != null) {
            if (retry) deleteDirectly(uri) else verifyDeleted(uri)
        } else {
            pendingDelete = null
            model.reportMessage("Exclusão cancelada. O arquivo não foi alterado pelo aplicativo.")
        }
    }
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        pendingDelete = savedInstanceState?.getString("pendingDelete")?.let(Uri::parse)
        retryAfterGrant = savedInstanceState?.getBoolean("retryAfterGrant") ?: false
        setContent { BlackcutsApp(model, ::requestLibrary, ::requestDelete) }
        if (hasLibraryPermission()) model.startLibrary()
    }
    override fun onSaveInstanceState(outState: Bundle) {
        outState.putString("pendingDelete", pendingDelete?.toString())
        outState.putBoolean("retryAfterGrant", retryAfterGrant)
        super.onSaveInstanceState(outState)
    }
    override fun onResume() {
        super.onResume()
        if (hasLibraryPermission()) model.startLibrary()
    }
    private fun hasLibraryPermission() = ContextCompat.checkSelfPermission(this, mediaPermission()) == PackageManager.PERMISSION_GRANTED
    private fun mediaPermission() = if (Build.VERSION.SDK_INT >= 33) Manifest.permission.READ_MEDIA_AUDIO else Manifest.permission.READ_EXTERNAL_STORAGE
    private fun requestLibrary() { if (hasLibraryPermission()) model.startLibrary() else permission.launch(mediaPermission()) }

    /** Called only after the app's confirmation dialog. Android may show another confirmation. */
    private fun requestDelete(track: Track) {
        val uri = track.uri
        if (pendingDelete != null) { model.reportMessage("Já existe uma solicitação de exclusão em andamento."); return }
        if (uri.scheme != "content" || uri.authority != "media" || model.tracks.value.none { it.uri == uri }) {
            model.reportMessage("Esta música não está mais disponível na biblioteca."); return
        }
        pendingDelete = uri
        try {
            when {
                Build.VERSION.SDK_INT >= 30 -> {
                    retryAfterGrant = false
                    launchDeleteIntent(MediaStore.createDeleteRequest(contentResolver, listOf(uri)).intentSender)
                }
                Build.VERSION.SDK_INT <= 28 && ContextCompat.checkSelfPermission(this, Manifest.permission.WRITE_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED -> writePermission.launch(Manifest.permission.WRITE_EXTERNAL_STORAGE)
                else -> deleteDirectly(uri)
            }
        } catch (_: Exception) {
            pendingDelete = null
            model.reportMessage("Não foi possível solicitar a exclusão ao Android.")
        }
    }
    private fun launchDeleteIntent(sender: IntentSender) {
        deleteConfirmation.launch(IntentSenderRequest.Builder(sender).build())
    }
    private fun deleteDirectly(uri: Uri) {
        lifecycleScope.launch {
            try {
                val deleted = withContext(Dispatchers.IO) { contentResolver.delete(uri, null, null) }
                if (deleted > 0) verifyDeleted(uri) else { pendingDelete = null; model.reportMessage("Não foi possível excluir a música; o arquivo pode já ter sido removido."); model.refresh() }
            } catch (e: SecurityException) {
                if (Build.VERSION.SDK_INT == 29 && e is RecoverableSecurityException) {
                    try { retryAfterGrant = true; launchDeleteIntent(e.userAction.actionIntent.intentSender) }
                    catch (_: Exception) { pendingDelete = null; retryAfterGrant = false; model.reportMessage("Não foi possível solicitar a autorização do Android.") }
                } else { pendingDelete = null; model.reportMessage("O Android não permitiu excluir este arquivo.") }
            } catch (_: Exception) { pendingDelete = null; model.reportMessage("Não foi possível excluir esta música.") }
        }
    }
    private fun verifyDeleted(uri: Uri) {
        lifecycleScope.launch {
            try {
                val exists = withContext(Dispatchers.IO) {
                    val cursor = contentResolver.query(uri, arrayOf(MediaStore.Audio.Media._ID), null, null, null)
                        ?: error("Consulta indisponível")
                    cursor.use { it.moveToFirst() }
                }
                pendingDelete = null
                if (!exists) model.onTrackDeleted(uri) else { model.reportMessage("Não foi possível confirmar a exclusão. Verifique o arquivo e tente novamente."); model.refresh() }
            } catch (_: Exception) { pendingDelete = null; model.reportMessage("O Android não permitiu confirmar a exclusão. Atualize a biblioteca e verifique o arquivo."); model.refresh() }
        }
    }
}
