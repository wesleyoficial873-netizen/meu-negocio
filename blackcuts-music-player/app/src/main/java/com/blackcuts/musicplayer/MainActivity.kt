package com.blackcuts.musicplayer

import android.Manifest
import android.content.pm.PackageManager
import android.os.Build
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.result.contract.ActivityResultContracts
import androidx.activity.viewModels
import androidx.core.content.ContextCompat
import com.blackcuts.musicplayer.ui.BlackcutsApp

class MainActivity : ComponentActivity() {
    private val model: PlayerViewModel by viewModels()
    private val permission = registerForActivityResult(ActivityResultContracts.RequestPermission()) { granted -> if (granted) model.startLibrary() }
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent { BlackcutsApp(model, ::requestLibrary) }
        if (hasLibraryPermission()) model.startLibrary()
    }
    override fun onResume() {
        super.onResume()
        if (hasLibraryPermission()) model.startLibrary()
    }
    private fun hasLibraryPermission() = ContextCompat.checkSelfPermission(this, mediaPermission()) == PackageManager.PERMISSION_GRANTED
    private fun mediaPermission() = if (Build.VERSION.SDK_INT >= 33) Manifest.permission.READ_MEDIA_AUDIO else Manifest.permission.READ_EXTERNAL_STORAGE
    private fun requestLibrary() { if (hasLibraryPermission()) model.startLibrary() else permission.launch(mediaPermission()) }
}
