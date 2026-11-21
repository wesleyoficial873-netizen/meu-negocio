package com.blackcuts.adblocker.ui.screens

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.FilterChip
import androidx.compose.material3.FilterChipDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.blackcuts.adblocker.data.model.StatsPeriod
import com.blackcuts.adblocker.ui.MainViewModel
import com.blackcuts.adblocker.ui.theme.ActiveGreen
import com.blackcuts.adblocker.ui.theme.AmoledBlack
import com.blackcuts.adblocker.ui.theme.BorderDark
import com.blackcuts.adblocker.ui.theme.CardDark
import com.blackcuts.adblocker.ui.theme.InactiveRed
import com.blackcuts.adblocker.ui.theme.MutedWhite
import com.blackcuts.adblocker.ui.theme.PureWhite

@Composable
fun StatsScreen(viewModel: MainViewModel) {
    val period by viewModel.statsPeriod.collectAsState()
    val totalQueries by viewModel.totalQueries.collectAsState()
    val blockedQueries by viewModel.blockedQueries.collectAsState()
    val adsBlocked by viewModel.adsBlocked.collectAsState()
    val trackersBlocked by viewModel.trackersBlocked.collectAsState()
    val bytesSaved by viewModel.bytesSaved.collectAsState()
    val topBlocked by viewModel.topBlockedDomains.collectAsState()
    val dailyStats by viewModel.dailyStats.collectAsState()

    val allowedQueries = (totalQueries - blockedQueries).coerceAtLeast(0)

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(AmoledBlack)
            .verticalScroll(rememberScrollState())
            .padding(20.dp)
    ) {
        Text(
            text = "Painel de Estatísticas",
            style = MaterialTheme.typography.headlineLarge
        )
        Text(
            text = "Dados reais registrados localmente no dispositivo",
            style = MaterialTheme.typography.bodyMedium
        )

        Spacer(modifier = Modifier.height(16.dp))

        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            StatsPeriod.entries.forEach { p ->
                FilterChip(
                    selected = period == p,
                    onClick = { viewModel.setStatsPeriod(p) },
                    label = { Text(p.label) },
                    colors = FilterChipDefaults.filterChipColors(
                        selectedContainerColor = ActiveGreen.copy(alpha = 0.2f),
                        selectedLabelColor = ActiveGreen
                    )
                )
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Grid de métricas
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            MetricBox("Anúncios bloqueados", adsBlocked.toString(), ActiveGreen, Modifier.weight(1f))
            MetricBox("Rastreadores", trackersBlocked.toString(), PureWhite, Modifier.weight(1f))
        }
        Spacer(modifier = Modifier.height(12.dp))
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            MetricBox("Domínios bloqueados", blockedQueries.toString(), InactiveRed, Modifier.weight(1f))
            MetricBox("Domínios permitidos", allowedQueries.toString(), MutedWhite, Modifier.weight(1f))
        }
        Spacer(modifier = Modifier.height(12.dp))
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            MetricBox("Consultas DNS", totalQueries.toString(), PureWhite, Modifier.weight(1f))
            MetricBox("Economia estimada", formatBytes(bytesSaved), ActiveGreen, Modifier.weight(1f))
        }

        Spacer(modifier = Modifier.height(20.dp))

        // Gráfico em tempo real (Canvas)
        Card(
            modifier = Modifier.fillMaxWidth(),
            colors = CardDefaults.cardColors(containerColor = CardDark),
            border = BorderStroke(1.dp, BorderDark),
            shape = RoundedCornerShape(16.dp)
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text("Atividade DNS (${period.label})", style = MaterialTheme.typography.titleMedium)
                Spacer(modifier = Modifier.height(12.dp))
                if (dailyStats.isEmpty()) {
                    Text(
                        text = "Nenhuma consulta registrada neste período ainda.",
                        style = MaterialTheme.typography.bodyMedium
                    )
                } else {
                    Canvas(
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(140.dp)
                    ) {
                        val maxVal = dailyStats.maxOf { (it.blockedCount + it.allowedCount).coerceAtLeast(1) }
                        val barWidth = (size.width / (dailyStats.size * 2f)).coerceAtLeast(8f)
                        dailyStats.forEachIndexed { idx, bucket ->
                            val x = idx * (size.width / dailyStats.size) + barWidth / 2f
                            val blockedH = (bucket.blockedCount.toFloat() / maxVal) * size.height
                            val allowedH = (bucket.allowedCount.toFloat() / maxVal) * size.height
                            drawRect(
                                color = ActiveGreen,
                                topLeft = Offset(x, size.height - blockedH),
                                size = Size(barWidth * 0.8f, blockedH)
                            )
                            drawRect(
                                color = PureWhite.copy(alpha = 0.25f),
                                topLeft = Offset(x + barWidth, size.height - allowedH),
                                size = Size(barWidth * 0.8f, allowedH)
                            )
                        }
                    }
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(
                        text = "Verde: Bloqueados • Branco: Permitidos",
                        style = MaterialTheme.typography.labelMedium
                    )
                }
            }
        }

        Spacer(modifier = Modifier.height(20.dp))

        // Top domínios bloqueados
        Card(
            modifier = Modifier.fillMaxWidth(),
            colors = CardDefaults.cardColors(containerColor = CardDark),
            border = BorderStroke(1.dp, BorderDark),
            shape = RoundedCornerShape(16.dp)
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text("Domínios mais bloqueados", style = MaterialTheme.typography.titleMedium)
                Spacer(modifier = Modifier.height(10.dp))
                if (topBlocked.isEmpty()) {
                    Text(
                        text = "Nenhum domínio bloqueado registrado ainda.",
                        style = MaterialTheme.typography.bodyMedium
                    )
                } else {
                    topBlocked.forEach { item ->
                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(vertical = 6.dp),
                            horizontalArrangement = Arrangement.SpaceBetween
                        ) {
                            Text(
                                text = item.domain,
                                color = PureWhite,
                                fontSize = 13.sp,
                                modifier = Modifier.weight(1f)
                            )
                            Text(
                                text = "${item.count}x",
                                color = ActiveGreen,
                                fontWeight = FontWeight.Bold,
                                fontSize = 13.sp
                            )
                        }
                    }
                }
            }
        }
    }
}

@Composable
private fun MetricBox(
    label: String,
    value: String,
    valueColor: androidx.compose.ui.graphics.Color,
    modifier: Modifier = Modifier
) {
    Card(
        modifier = modifier,
        colors = CardDefaults.cardColors(containerColor = CardDark),
        border = BorderStroke(1.dp, BorderDark),
        shape = RoundedCornerShape(14.dp)
    ) {
        Column(modifier = Modifier.padding(14.dp)) {
            Text(text = value, fontSize = 22.sp, fontWeight = FontWeight.Bold, color = valueColor)
            Spacer(modifier = Modifier.height(4.dp))
            Text(text = label, fontSize = 12.sp, color = MutedWhite)
        }
    }
}

private fun formatBytes(bytes: Long): String {
    if (bytes < 1024) return "$bytes B"
    val kb = bytes / 1024.0
    if (kb < 1024) return String.format("%.1f KB", kb)
    val mb = kb / 1024.0
    return String.format("%.2f MB", mb)
}
