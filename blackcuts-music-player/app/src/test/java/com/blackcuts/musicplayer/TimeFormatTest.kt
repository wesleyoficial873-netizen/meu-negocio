package com.blackcuts.musicplayer

import com.blackcuts.musicplayer.ui.formatTime
import org.junit.Assert.assertEquals
import org.junit.Test

class TimeFormatTest {
    @Test fun zeroAndNegativeTime() {
        assertEquals("0:00", formatTime(0))
        assertEquals("0:00", formatTime(-1000))
    }
    @Test fun minutesAndHours() {
        assertEquals("1:05", formatTime(65_999))
        assertEquals("60:00", formatTime(3_600_000))
    }
}
