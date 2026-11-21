package com.blackcuts.musicplayer.playback

import android.os.Handler
import android.os.Looper
import androidx.media3.common.Player

/** Lives with the playback service, not the Activity, so closing the UI does not cancel the timer. */
object SleepTimer {
    private val handler = Handler(Looper.getMainLooper())
    private var scheduled: Runnable? = null
    private var player: Player? = null
    fun attach(player: Player) { this.player = player }
    fun schedule(minutes: Int) {
        scheduled?.let(handler::removeCallbacks)
        scheduled = null
        if (minutes > 0) {
            val task = Runnable { player?.pause(); scheduled = null }
            scheduled = task
            handler.postDelayed(task, minutes * 60_000L)
        }
    }
    fun release() { scheduled?.let(handler::removeCallbacks); scheduled = null; player = null }
}
