package com.blackcuts.adblocker.ui.screens

import androidx.compose.animation.animateColorAsState
import androidx.compose.animation.core.FastOutSlowInEasing
import androidx.compose.animation.core.RepeatMode
import androidx.compose.animation.core.animateFloat
import androidx.compose.animation.core.infiniteRepeatable
import androidx.compose.animation.core.rememberInfiniteTransition
import androidx.compose.animation.core.tween
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.PowerSettingsNew
import androidx.compose.material.icons.filled.Shield
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.FilterChip
import androidx.compose.material3.FilterChipDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableLongStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.scale
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.blackcuts.adblocker.data.model.ProtectionLevel
import com.blackcuts.adblocker.ui.MainViewModel
import com.blackcuts.adblocker.ui.theme.ActiveGreen
import com.blackcuts.adblocker.ui.theme.AmoledBlack
import com.blackcuts.adblocker.ui.theme.BorderDark
import com.blackcuts.adblocker.ui.theme.CardDark
import com.blackcuts.adblocker.ui.theme.InactiveRed
import com.blackcuts.adblocker.ui.theme.MutedWhite
import com.blackcuts.adblocker.ui.theme.PureWhite
import kotlinx.coroutines.delay

@Composable
fun HomeScreen(
    viewModel: MainViewModel,
    onToggleVpn: (Boolean) -> Unit
) {
    val isVpnEnabled by viewModel.isVpnEnabled.collectAsState()
    val protectionLevel by viewModel.protectionLevel.collectAsState()
    val adsBlocked by viewModel.adsBlocked.collectAsState()
    val trackersBlocked by viewModel.trackersBlocked.collectAsState()
    val totalQueries by viewModel.totalQueries.collectAsState()
    val activeRulesCount by viewModel.activeRulesCount.collectAsState()
    val vpnStartedAt by viewModel.vpnStartedAt.collectAsState()

    var elapsedSeconds by remember { mutableLongStateOf(0L) }
    LaunchedEffect(isVpnEnabled, vpnStartedAt) {
        while (isVpnEnabled && vpnStartedAt > 0L) {
            elapsedSeconds = ((System.currentTimeMillis() - vpnStartedAt) / 1000L).coerceAtLeast(0L)
            delay(1000L)
        }
        if (!isVpnEnabled) elapsedSeconds = 0L
    }

    val statusColor by animateColorAsState(
        targetValue = if (isVpnEnabled) ActiveGreen else InactiveRed,
        label = "statusColor"
    )

    val infiniteTransition = rememberInfiniteTransition(label = "pulse")
    val pulseScale by infiniteTransition.animateFloat(
        initialValue = 1f,
        targetValue = if (isVpnEnabled) 1.08f else 1f,
        animationSpec = infiniteRepeatable(
            animation = tween(1400, easing = FastOutSlowInEasing),
            repeatMode = RepeatMode.Reverse
        ),
        label = "pulseScale"
    )

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(AmoledBlack)
            .verticalScroll(rememberScrollState())
            .padding(20.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        // Cabeçalho
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column {
                Text(
                    text = "BLACK°CUTS",
                    style = MaterialTheme.typography.headlineLarge,
                    letterSpacing = 2.sp
                )
                Text(
                    text = "AD BLOCKER • VPN DNS LOCAL",
                    style = MaterialTheme.typography.labelMedium,
                    color = statusColor
                )
            }
            Icon(
                imageVector = Icons.Default.Shield,
                contentDescription = null,
                tint = statusColor,
                modifier = Modifier.size(30.dp)
            )
        }

        Spacer(modifier = Modifier.height(32.dp))

        // Botão Central
        Box(
            contentAlignment = Alignment.Center,
            modifier = Modifier.size(220.dp)
        ) {
            Box(
                modifier = Modifier
                    .size(210.dp)
                    .scale(pulseScale)
                    .clip(CircleShape)
                    .border(2.dp, statusColor.copy(alpha = 0.35f), CircleShape)
            )
            Box(
                contentAlignment = Alignment.Center,
                modifier = Modifier
                    .size(176.dp)
                    .clip(CircleShape)
                    .background(CardDark)
                    .border(3.dp, statusColor, CircleShape)
                    .clickable { onToggleVpn(!isVpnEnabled) }
            ) {
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Icon(
                        imageVector = Icons.Default.PowerSettingsNew,
                        contentDescription = "Ativar ou desativar proteção",
                        tint = statusColor,
                        modifier = Modifier.size(48.dp)
                    )
                    Spacer(modifier = Modifier.height(10.dp))
                    Text(
                        text = if (isVpnEnabled) "PROTEÇÃO ATIVA" else "ATIVAR PROTEÇÃO",
                        color = PureWhite,
                        fontWeight = FontWeight.Bold,
                        fontSize = 13.sp,
                        letterSpacing = 1.sp
                    )
                }
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        Text(
            text = if (isVpnEnabled) {
                "Tempo ativo: ${formatDuration(elapsedSeconds)} • $activeRulesCount regras"
            } else {
                "Proteção desativada • Toque para iniciar"
            },
            style = MaterialTheme.typography.bodyMedium,
            color = if (isVpnEnabled) ActiveGreen else MutedWhite
        )

        Spacer(modifier = Modifier.height(24.dp))

        // Métricas reais em tempo real
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            StatMiniCard(
                title = "Anúncios Bloq.",
                value = adsBlocked.toString(),
                accent = ActiveGreen,
                modifier = Modifier.weight(1f)
            )
            StatMiniCard(
                title = "Rastreadores",
                value = trackersBlocked.toString(),
                accent = PureWhite,
                modifier = Modifier.weight(1f)
            )
            StatMiniCard(
                title = "Consultas DNS",
                value = totalQueries.toString(),
                accent = MutedWhite,
                modifier = Modifier.weight(1f)
            )
        }

        Spacer(modifier = Modifier.height(24.dp))

        // Nível de proteção rápido
        Card(
            modifier = Modifier.fillMaxWidth(),
            colors = CardDefaults.cardColors(containerColor = CardDark),
            border = BorderStroke(1.dp, BorderDark),
            shape = RoundedCornerShape(16.dp)
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text(
                    text = "Nível de Proteção",
                    style = MaterialTheme.typography.titleMedium
                )
                Spacer(modifier = Modifier.height(6.dp))
                Text(
                    text = protectionLevel.description,
                    style = MaterialTheme.typography.bodyMedium
                )
                Spacer(modifier = Modifier.height(12.dp))
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    ProtectionLevel.entries.forEach { level ->
                        val selected = protectionLevel == level
                        FilterChip(
                            selected = selected,
                            onClick = { viewModel.setProtectionLevel(level) },
                            label = {
                                Text(
                                    text = level.label.removePrefix("Proteção "),
                                    fontSize = 11.sp
                                )
                            },
                            colors = FilterChipDefaults.filterChipColors(
                                selectedContainerColor = ActiveGreen.copy(alpha = 0.2f),
                                selectedLabelColor = ActiveGreen
                            )
                        )
                    }
                }
            }
        }
    }
}

@Composable
private fun StatMiniCard(
    title: String,
    value: String,
    accent: androidx.compose.ui.graphics.Color,
    modifier: Modifier = Modifier
) {
    Card(
        modifier = modifier,
        colors = CardDefaults.cardColors(containerColor = CardDark),
        border = BorderStroke(1.dp, BorderDark),
        shape = RoundedCornerShape(14.dp)
    ) {
        Column(
            modifier = Modifier.padding(12.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(
                text = value,
                fontSize = 20.sp,
                fontWeight = FontWeight.Bold,
                color = accent
            )
            Spacer(modifier = Modifier.height(4.dp))
            Text(
                text = title,
                fontSize = 11.sp,
                color = MutedWhite
            )
        }
    }
}

private fun formatDuration(totalSeconds: Long): String {
    val h = totalSeconds / 3600
    val m = (totalSeconds % 3600) / 60
    val s = totalSeconds % 60
    return String.format("%02d:%02d:%02d", h, m, s)
}
