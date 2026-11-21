package com.blackcuts.musicplayer.playback

import android.media.audiofx.Equalizer
import kotlinx.coroutines.flow.MutableStateFlow

/** Android effects are device-dependent. Expose only bands actually supported by the device. */
data class EqBand(val index: Short, val hz: Int, val level: Int)
data class EqState(val available: Boolean = false, val enabled: Boolean = false, val minimum: Int = 0, val maximum: Int = 0, val bands: List<EqBand> = emptyList(), val message: String = "Inicie uma música para ativar o equalizador.")
object DeviceEqualizer {
    val state = MutableStateFlow(EqState())
    private var effect: Equalizer? = null
    fun attach(sessionId: Int) {
        release()
        if (sessionId == 0) return
        try {
            effect = Equalizer(0, sessionId)
            update()
        } catch (_: Exception) { state.value = EqState(message = "Equalizador não disponível neste dispositivo.") }
    }
    fun enable(enabled: Boolean) { try { effect?.setEnabled(enabled); update() } catch (_: Exception) { state.value = EqState(message = "Não foi possível alterar o equalizador.") } }
    fun setBand(index: Short, level: Int) { try { effect?.setBandLevel(index, level.toShort()); update() } catch (_: Exception) { state.value = EqState(message = "Não foi possível alterar esta banda.") } }
    private fun update() {
        val eq = effect ?: return
        val range = eq.bandLevelRange
        state.value = EqState(true, eq.enabled, range[0].toInt(), range[1].toInt(), (0 until eq.numberOfBands.toInt()).map { i -> EqBand(i.toShort(), eq.getCenterFreq(i.toShort()) / 1000, eq.getBandLevel(i.toShort()).toInt()) }, "")
    }
    fun release() { effect?.release(); effect = null; state.value = EqState() }
}
