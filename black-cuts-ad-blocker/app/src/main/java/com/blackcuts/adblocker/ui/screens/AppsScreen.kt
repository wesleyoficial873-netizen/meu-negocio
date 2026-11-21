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
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Checkbox
import androidx.compose.material3.CheckboxDefaults
import androidx.compose.material3.FilterChip
import androidx.compose.material3.FilterChipDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.blackcuts.adblocker.data.model.AppFilterMode
import com.blackcuts.adblocker.ui.MainViewModel
import com.blackcuts.adblocker.ui.theme.ActiveGreen
import com.blackcuts.adblocker.ui.theme.AmoledBlack
import com.blackcuts.adblocker.ui.theme.BorderDark
import com.blackcuts.adblocker.ui.theme.CardDark
import com.blackcuts.adblocker.ui.theme.MutedWhite
import com.blackcuts.adblocker.ui.theme.PureWhite

@Composable
fun AppsScreen(viewModel: MainViewModel) {
    val apps by viewModel.installedApps.collectAsState()
    val mode by viewModel.appFilterMode.collectAsState()
    val selectedApps by viewModel.selectedApps.collectAsState()
    var searchQuery by remember { mutableStateOf("") }

    val filteredList = remember(apps, searchQuery) {
        if (searchQuery.isBlank()) apps
        else apps.filter {
            it.appName.contains(searchQuery, ignoreCase = true) ||
                it.packageName.contains(searchQuery, ignoreCase = true)
        }
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(AmoledBlack)
            .padding(20.dp)
    ) {
        Text(
            text = "APLICATIVOS PROTEGIDOS",
            style = MaterialTheme.typography.headlineLarge
        )
        Spacer(modifier = Modifier.height(6.dp))
        Text(
            text = "A filtragem ocorre via DNS local sem modificar apps ou descriptografar HTTPS. Anúncios integrados ao próprio conteúdo (ex: YouTube, Instagram, Facebook) podem não ser removidos por DNS.",
            style = MaterialTheme.typography.bodyMedium,
            fontSize = 12.sp
        )

        Spacer(modifier = Modifier.height(12.dp))

        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            AppFilterMode.entries.forEach { m ->
                FilterChip(
                    selected = mode == m,
                    onClick = { viewModel.setAppFilterMode(m) },
                    label = { Text(m.label, fontSize = 11.sp) },
                    colors = FilterChipDefaults.filterChipColors(
                        selectedContainerColor = ActiveGreen.copy(alpha = 0.2f),
                        selectedLabelColor = ActiveGreen
                    )
                )
            }
        }

        Spacer(modifier = Modifier.height(10.dp))

        OutlinedTextField(
            value = searchQuery,
            onValueChange = { searchQuery = it },
            placeholder = { Text("Buscar aplicativo instalado...") },
            singleLine = true,
            modifier = Modifier.fillMaxWidth()
        )

        Spacer(modifier = Modifier.height(12.dp))

        LazyColumn(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            items(filteredList, key = { it.packageName }) { app ->
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    colors = CardDefaults.cardColors(containerColor = CardDark),
                    border = BorderStroke(1.dp, BorderDark),
                    shape = RoundedCornerShape(12.dp)
                ) {
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(horizontal = 14.dp, vertical = 10.dp),
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Column(modifier = Modifier.weight(1f)) {
                            Text(text = app.appName, color = PureWhite, fontSize = 14.sp)
                            Text(text = app.packageName, color = MutedWhite, fontSize = 11.sp)
                            Text(
                                text = if (app.isFiltered) "Conexões DNS filtradas" else "Sem filtragem",
                                color = if (app.isFiltered) ActiveGreen else MutedWhite,
                                fontSize = 11.sp
                            )
                        }
                        if (mode != AppFilterMode.PROTECT_ALL) {
                            Checkbox(
                                checked = selectedApps.contains(app.packageName),
                                onCheckedChange = { viewModel.toggleAppSelection(app.packageName) },
                                colors = CheckboxDefaults.colors(checkedColor = ActiveGreen)
                            )
                        }
                    }
                }
            }
        }
    }
}
