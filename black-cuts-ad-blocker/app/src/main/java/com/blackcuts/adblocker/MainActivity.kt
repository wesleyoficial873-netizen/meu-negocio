package com.blackcuts.adblocker

import android.Manifest
import android.content.Intent
import android.content.pm.PackageManager
import android.net.VpnService
import android.os.Build
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.result.contract.ActivityResultContracts
import androidx.activity.viewModels
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Apps
import androidx.compose.material.icons.filled.BarChart
import androidx.compose.material.icons.filled.Rule
import androidx.compose.material.icons.filled.Settings
import androidx.compose.material.icons.filled.Shield
import androidx.compose.material3.Icon
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.NavigationBarItemDefaults
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.unit.sp
import androidx.core.content.ContextCompat
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import com.blackcuts.adblocker.ui.MainViewModel
import com.blackcuts.adblocker.ui.screens.AppsScreen
import com.blackcuts.adblocker.ui.screens.HomeScreen
import com.blackcuts.adblocker.ui.screens.RulesScreen
import com.blackcuts.adblocker.ui.screens.SettingsScreen
import com.blackcuts.adblocker.ui.screens.StatsScreen
import com.blackcuts.adblocker.ui.theme.ActiveGreen
import com.blackcuts.adblocker.ui.theme.AmoledBlack
import com.blackcuts.adblocker.ui.theme.BlackCutsTheme
import com.blackcuts.adblocker.ui.theme.MutedWhite
import com.blackcuts.adblocker.ui.theme.SurfaceDark

private enum class NavTab(val route: String, val label: String, val icon: ImageVector) {
    HOME("home", "Início", Icons.Default.Shield),
    STATS("stats", "Painel", Icons.Default.BarChart),
    APPS("apps", "Apps", Icons.Default.Apps),
    RULES("rules", "Regras", Icons.Default.Rule),
    SETTINGS("settings", "Ajustes", Icons.Default.Settings)
}

class MainActivity : ComponentActivity() {

    private val viewModel: MainViewModel by viewModels()

    private val vpnPermissionLauncher = registerForActivityResult(
        ActivityResultContracts.StartActivityForResult()
    ) { result ->
        if (result.resultCode == RESULT_OK) {
            viewModel.startVpnService()
        }
    }

    private val notificationPermissionLauncher = registerForActivityResult(
        ActivityResultContracts.RequestPermission()
    ) { _ -> }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            if (ContextCompat.checkSelfPermission(this, Manifest.permission.POST_NOTIFICATIONS)
                != PackageManager.PERMISSION_GRANTED
            ) {
                notificationPermissionLauncher.launch(Manifest.permission.POST_NOTIFICATIONS)
            }
        }

        setContent {
            BlackCutsTheme {
                val navController = rememberNavController()
                val backStackEntry by navController.currentBackStackEntryAsState()
                val currentRoute = backStackEntry?.destination?.route ?: NavTab.HOME.route

                Scaffold(
                    containerColor = AmoledBlack,
                    bottomBar = {
                        NavigationBar(containerColor = SurfaceDark) {
                            NavTab.entries.forEach { tab ->
                                val selected = currentRoute == tab.route
                                NavigationBarItem(
                                    selected = selected,
                                    onClick = {
                                        navController.navigate(tab.route) {
                                            popUpTo(NavTab.HOME.route) { saveState = true }
                                            launchSingleTop = true
                                            restoreState = true
                                        }
                                    },
                                    icon = { Icon(tab.icon, contentDescription = tab.label) },
                                    label = { Text(tab.label, fontSize = 10.sp) },
                                    colors = NavigationBarItemDefaults.colors(
                                        selectedIconColor = ActiveGreen,
                                        selectedTextColor = ActiveGreen,
                                        unselectedIconColor = MutedWhite,
                                        unselectedTextColor = MutedWhite,
                                        indicatorColor = ActiveGreen.copy(alpha = 0.12f)
                                    )
                                )
                            }
                        }
                    }
                ) { innerPadding ->
                    NavHost(
                        navController = navController,
                        startDestination = NavTab.HOME.route,
                        modifier = Modifier.padding(innerPadding)
                    ) {
                        composable(NavTab.HOME.route) {
                            HomeScreen(
                                viewModel = viewModel,
                                onToggleVpn = { enable -> handleVpnToggle(enable) }
                            )
                        }
                        composable(NavTab.STATS.route) { StatsScreen(viewModel) }
                        composable(NavTab.APPS.route) { AppsScreen(viewModel) }
                        composable(NavTab.RULES.route) { RulesScreen(viewModel) }
                        composable(NavTab.SETTINGS.route) { SettingsScreen(viewModel) }
                    }
                }
            }
        }
    }

    private fun handleVpnToggle(enable: Boolean) {
        if (!enable) {
            viewModel.stopVpnService()
            return
        }
        val prepareIntent: Intent? = VpnService.prepare(this)
        if (prepareIntent != null) {
            vpnPermissionLauncher.launch(prepareIntent)
        } else {
            viewModel.startVpnService()
        }
    }
}
