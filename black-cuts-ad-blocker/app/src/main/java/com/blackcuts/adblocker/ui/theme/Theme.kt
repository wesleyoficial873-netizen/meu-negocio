package com.blackcuts.adblocker.ui.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Typography
import androidx.compose.material3.darkColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.sp

val AmoledBlack = Color(0xFF000000)
val SurfaceDark = Color(0xFF0B0B0B)
val CardDark = Color(0xFF141414)
val BorderDark = Color(0xFF242424)
val PureWhite = Color(0xFFFFFFFF)
val MutedWhite = Color(0xFFA0A0A0)
val ActiveGreen = Color(0xFF00E676)
val InactiveRed = Color(0xFFFF3B30)
val WarningAmber = Color(0xFFFFB300)

private val BlackCutsColorScheme = darkColorScheme(
    primary = ActiveGreen,
    onPrimary = AmoledBlack,
    secondary = PureWhite,
    onSecondary = AmoledBlack,
    background = AmoledBlack,
    onBackground = PureWhite,
    surface = SurfaceDark,
    onSurface = PureWhite,
    surfaceVariant = CardDark,
    onSurfaceVariant = MutedWhite,
    error = InactiveRed,
    onError = PureWhite,
    outline = BorderDark
)

private val BlackCutsTypography = Typography(
    headlineLarge = TextStyle(
        fontSize = 26.sp,
        fontWeight = FontWeight.Bold,
        letterSpacing = 0.5.sp,
        color = PureWhite
    ),
    titleLarge = TextStyle(
        fontSize = 20.sp,
        fontWeight = FontWeight.SemiBold,
        color = PureWhite
    ),
    titleMedium = TextStyle(
        fontSize = 16.sp,
        fontWeight = FontWeight.SemiBold,
        color = PureWhite
    ),
    bodyMedium = TextStyle(
        fontSize = 14.sp,
        color = MutedWhite
    ),
    labelMedium = TextStyle(
        fontSize = 12.sp,
        fontWeight = FontWeight.Medium,
        color = MutedWhite
    )
)

@Composable
fun BlackCutsTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = BlackCutsColorScheme,
        typography = BlackCutsTypography,
        content = content
    )
}
