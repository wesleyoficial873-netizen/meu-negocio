package com.blackcuts.adblocker.ui.screens

import androidx.compose.foundation.BorderStroke
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
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Switch
import androidx.compose.material3.SwitchDefaults
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.blackcuts.adblocker.BuildConfig
import com.blackcuts.adblocker.ui.MainViewModel
import com.blackcuts.adblocker.ui.theme.ActiveGreen
import com.blackcuts.adblocker.ui.theme.AmoledBlack
import com.blackcuts.adblocker.ui.theme.BorderDark
import com.blackcuts.adblocker.ui.theme.CardDark
import com.blackcuts.adblocker.ui.theme.MutedWhite
import com.blackcuts.adblocker.ui.theme.PureWhite

@Composable
fun SettingsScreen(viewModel: MainViewModel) {
    val autoUpdate by viewModel.autoUpdateEnabled.collectAsState()
    val startOnBoot by viewModel.startOnBoot.collectAsState()
    val updateHistory by viewModel.updateHistory.collectAsState()
    val appUpdateState by viewModel.appUpdateState.collectAsState()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(AmoledBlack)
            .verticalScroll(rememberScrollState())
            .padding(20.dp)
    ) {
        Text(
            text = "Configurações & Privacidade",
            style = MaterialTheme.typography.headlineLarge
        )

        Spacer(modifier = Modifier.height(16.dp))

        Card(
            colors = CardDefaults.cardColors(containerColor = CardDark),
            border = BorderStroke(1.dp, BorderDark),
            shape = RoundedCornerShape(14.dp),
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column(modifier = Modifier.weight(1f)) {
                        Text("Atualização Automática de Listas", color = PureWhite)
                        Text("Atualiza listas confiáveis via WorkManager a cada 24h", style = MaterialTheme.typography.bodyMedium, fontSize = 12.sp)
                    }
                    Switch(
                        checked = autoUpdate,
                        onCheckedChange = { viewModel.setAutoUpdate(it) },
                        colors = SwitchDefaults.colors(checkedThumbColor = AmoledBlack, checkedTrackColor = ActiveGreen)
                    )
                }

                Spacer(modifier = Modifier.height(12.dp))

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column(modifier = Modifier.weight(1f)) {
                        Text("Iniciar após reinicialização", color = PureWhite)
                        Text("Reativa a VPN local automaticamente ao ligar o aparelho", style = MaterialTheme.typography.bodyMedium, fontSize = 12.sp)
                    }
                    Switch(
                        checked = startOnBoot,
                        onCheckedChange = { viewModel.setStartOnBoot(it) },
                        colors = SwitchDefaults.colors(checkedThumbColor = AmoledBlack, checkedTrackColor = ActiveGreen)
                    )
                }

                Spacer(modifier = Modifier.height(14.dp))

                Button(
                    onClick = { viewModel.triggerManualBlocklistUpdate() },
                    colors = ButtonDefaults.buttonColors(containerColor = ActiveGreen, contentColor = AmoledBlack),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Text("Atualizar Listas Agora")
                }
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Atualização do aplicativo
        Card(
            colors = CardDefaults.cardColors(containerColor = CardDark),
            border = BorderStroke(1.dp, BorderDark),
            shape = RoundedCornerShape(14.dp),
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text("Atualização do Aplicativo", style = MaterialTheme.typography.titleMedium)
                Spacer(modifier = Modifier.height(4.dp))
                Text("Versão atual: ${BuildConfig.VERSION_NAME}", style = MaterialTheme.typography.bodyMedium)
                Spacer(modifier = Modifier.height(10.dp))
                OutlinedButton(
                    onClick = { viewModel.checkForAppUpdates() },
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Text("Verificar Nova Versão")
                }
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Privacidade e funcionamento da VPN local
        Card(
            colors = CardDefaults.cardColors(containerColor = CardDark),
            border = BorderStroke(1.dp, BorderDark),
            shape = RoundedCornerShape(14.dp),
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text("Segurança e Privacidade", style = MaterialTheme.typography.titleMedium)
                Spacer(modifier = Modifier.height(6.dp))
                Text(
                    text = "• Todo o processamento DNS ocorre localmente no dispositivo.\n" +
                        "• Não descriptografamos tráfego HTTPS nem instalamos certificados.\n" +
                        "• Não coletamos dados pessoais, senhas ou histórico de navegação.\n" +
                        "• Apenas consultas DNS (porta 53) passam pela interface VPN local.",
                    style = MaterialTheme.typography.bodyMedium,
                    fontSize = 12.sp
                )
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Histórico de atualizações
        Card(
            colors = CardDefaults.cardColors(containerColor = CardDark),
            border = BorderStroke(1.dp, BorderDark),
            shape = RoundedCornerShape(14.dp),
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text("Histórico de Atualizações de Listas", style = MaterialTheme.typography.titleMedium)
                Spacer(modifier = Modifier.height(8.dp))
                if (updateHistory.isEmpty()) {
                    Text("Nenhuma atualização remota executada ainda.", style = MaterialTheme.typography.bodyMedium)
                } else {
                    updateHistory.forEach { entry ->
                        Column(modifier = Modifier.padding(vertical = 4.dp)) {
                            Text("${entry.sourceName} (${entry.status})", color = PureWhite, fontSize = 13.sp)
                            Text("${entry.rulesCount} regras • ${entry.message}", color = MutedWhite, fontSize = 11.sp)
                        }
                    }
                }
            }
        }
    }

    appUpdateState?.let { info ->
        AlertDialog(
            onDismissRequest = { viewModel.dismissUpdateDialog() },
            title = {
                Text(if (info.hasUpdate) "Nova versão disponível: ${info.latestVersion}" else "Aplicativo atualizado")
            },
            text = {
                if (info.hasUpdate) {
                    Text(
                        "Versão atual: ${info.currentVersion}\n" +
                            "Novos recursos: ${info.features.joinToString(", ")}\n" +
                            "Correções: ${info.fixes.joinToString(", ")}"
                    )
                } else {
                    Text("Você já está usando a versão mais recente (${info.currentVersion}).")
                }
            },
            confirmButton = {
                TextButton(onClick = { viewModel.dismissUpdateDialog() }) {
                    Text("OK")
                }
            }
        )
    }
}
