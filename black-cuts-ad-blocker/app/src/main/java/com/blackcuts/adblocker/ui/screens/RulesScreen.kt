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
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.FilterChip
import androidx.compose.material3.FilterChipDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Switch
import androidx.compose.material3.SwitchDefaults
import androidx.compose.material3.Tab
import androidx.compose.material3.TabRow
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalClipboardManager
import androidx.compose.ui.text.AnnotatedString
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.blackcuts.adblocker.data.model.RuleCategory
import com.blackcuts.adblocker.ui.MainViewModel
import com.blackcuts.adblocker.ui.theme.ActiveGreen
import com.blackcuts.adblocker.ui.theme.AmoledBlack
import com.blackcuts.adblocker.ui.theme.BorderDark
import com.blackcuts.adblocker.ui.theme.CardDark
import com.blackcuts.adblocker.ui.theme.InactiveRed
import com.blackcuts.adblocker.ui.theme.PureWhite

@Composable
fun RulesScreen(viewModel: MainViewModel) {
    var selectedTab by remember { mutableIntStateOf(0) }
    val tabs = listOf("WHITELIST", "BLACKLIST")

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(AmoledBlack)
            .padding(20.dp)
    ) {
        Text(
            text = "Regras de Filtragem",
            style = MaterialTheme.typography.headlineLarge
        )
        Spacer(modifier = Modifier.height(12.dp))

        TabRow(
            selectedTabIndex = selectedTab,
            containerColor = CardDark,
            contentColor = ActiveGreen
        ) {
            tabs.forEachIndexed { index, title ->
                Tab(
                    selected = selectedTab == index,
                    onClick = { selectedTab = index },
                    text = { Text(title) }
                )
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        if (selectedTab == 0) {
            WhitelistTab(viewModel)
        } else {
            BlacklistTab(viewModel)
        }
    }
}

@Composable
private fun WhitelistTab(viewModel: MainViewModel) {
    val whitelist by viewModel.whitelist.collectAsState()
    var domainInput by remember { mutableStateOf("") }
    var searchInput by remember { mutableStateOf("") }
    val clipboard = LocalClipboardManager.current

    val filtered = remember(whitelist, searchInput) {
        if (searchInput.isBlank()) whitelist
        else whitelist.filter { it.domain.contains(searchInput, ignoreCase = true) }
    }

    Column(modifier = Modifier.fillMaxSize()) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            OutlinedTextField(
                value = domainInput,
                onValueChange = { domainInput = it },
                placeholder = { Text("Ex: google.com") },
                singleLine = true,
                modifier = Modifier.weight(1f)
            )
            Button(
                onClick = {
                    viewModel.addWhitelistDomain(domainInput)
                    domainInput = ""
                },
                colors = ButtonDefaults.buttonColors(containerColor = ActiveGreen, contentColor = AmoledBlack)
            ) {
                Text("Adicionar")
            }
        }

        Spacer(modifier = Modifier.height(8.dp))

        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            OutlinedButton(
                onClick = {
                    val clip = clipboard.getText()?.text ?: ""
                    if (clip.isNotBlank()) viewModel.importWhitelist(clip)
                },
                modifier = Modifier.weight(1f)
            ) {
                Text("Importar Lista", fontSize = 12.sp)
            }
            OutlinedButton(
                onClick = {
                    val exported = whitelist.joinToString("\n") { it.domain }
                    clipboard.setText(AnnotatedString(exported))
                },
                modifier = Modifier.weight(1f)
            ) {
                Text("Exportar Lista", fontSize = 12.sp)
            }
        }

        Spacer(modifier = Modifier.height(8.dp))

        OutlinedTextField(
            value = searchInput,
            onValueChange = { searchInput = it },
            placeholder = { Text("Pesquisar na Whitelist...") },
            singleLine = true,
            modifier = Modifier.fillMaxWidth()
        )

        Spacer(modifier = Modifier.height(10.dp))

        LazyColumn(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            items(filtered, key = { it.id }) { item ->
                Card(
                    colors = CardDefaults.cardColors(containerColor = CardDark),
                    border = BorderStroke(1.dp, BorderDark),
                    shape = RoundedCornerShape(10.dp)
                ) {
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(horizontal = 14.dp, vertical = 8.dp),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(text = item.domain, color = PureWhite)
                        IconButton(onClick = { viewModel.removeWhitelistDomain(item) }) {
                            Icon(Icons.Default.Delete, contentDescription = "Remover", tint = InactiveRed)
                        }
                    }
                }
            }
        }
    }
}

@Composable
private fun BlacklistTab(viewModel: MainViewModel) {
    val userRules by viewModel.userBlacklist.collectAsState()
    val enabledCategories by viewModel.enabledCategories.collectAsState()
    var domainInput by remember { mutableStateOf("") }
    var selectedCategory by remember { mutableStateOf(RuleCategory.CUSTOM) }

    Column(modifier = Modifier.fillMaxSize()) {
        Text("Categorias de Bloqueio", style = MaterialTheme.typography.titleMedium)
        Spacer(modifier = Modifier.height(8.dp))

        RuleCategory.entries.forEach { cat ->
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 2.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(text = cat.label, color = PureWhite, fontSize = 14.sp)
                Switch(
                    checked = enabledCategories.contains(cat.name),
                    onCheckedChange = { viewModel.toggleCategory(cat) },
                    colors = SwitchDefaults.colors(checkedThumbColor = AmoledBlack, checkedTrackColor = ActiveGreen)
                )
            }
        }

        Spacer(modifier = Modifier.height(12.dp))

        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            OutlinedTextField(
                value = domainInput,
                onValueChange = { domainInput = it },
                placeholder = { Text("Bloquear domínio...") },
                singleLine = true,
                modifier = Modifier.weight(1f)
            )
            Button(
                onClick = {
                    viewModel.addBlacklistDomain(domainInput, selectedCategory)
                    domainInput = ""
                },
                colors = ButtonDefaults.buttonColors(containerColor = InactiveRed, contentColor = PureWhite)
            ) {
                Text("Bloquear")
            }
        }

        Spacer(modifier = Modifier.height(8.dp))

        Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
            listOf(RuleCategory.ADS, RuleCategory.TRACKER, RuleCategory.CUSTOM).forEach { cat ->
                FilterChip(
                    selected = selectedCategory == cat,
                    onClick = { selectedCategory = cat },
                    label = { Text(cat.label, fontSize = 11.sp) },
                    colors = FilterChipDefaults.filterChipColors(
                        selectedContainerColor = InactiveRed.copy(alpha = 0.25f),
                        selectedLabelColor = PureWhite
                    )
                )
            }
        }

        Spacer(modifier = Modifier.height(10.dp))

        LazyColumn(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            items(userRules, key = { it.id }) { rule ->
                Card(
                    colors = CardDefaults.cardColors(containerColor = CardDark),
                    border = BorderStroke(1.dp, BorderDark),
                    shape = RoundedCornerShape(10.dp)
                ) {
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(horizontal = 14.dp, vertical = 8.dp),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column {
                            Text(text = rule.domain, color = PureWhite)
                            Text(text = rule.category, color = InactiveRed, fontSize = 11.sp)
                        }
                        IconButton(onClick = { viewModel.removeBlacklistDomain(rule) }) {
                            Icon(Icons.Default.Delete, contentDescription = "Remover", tint = InactiveRed)
                        }
                    }
                }
            }
        }
    }
}
