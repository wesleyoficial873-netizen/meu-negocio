# BLACK°CUTS AD BLOCKER

Bloqueador inteligente de anúncios e rastreadores em nível de dispositivo para Android (Android 8.0+), desenvolvido em Kotlin, Jetpack Compose (Material 3), Room, DataStore, WorkManager e `VpnService` local.

## Arquitetura

- **Motor DNS (`dns/`)**: Parser/Builder real de pacotes IPv4/UDP/DNS (`DnsPacketParser`), cache DNS em memória com TTL (`DnsCache`) e motor de decisão (`DomainFilterEngine`).
- **VPN Local (`vpn/`)**: `BlackCutsVpnService` cria uma interface TUN local (`10.111.222.1/32`) roteando apenas o tráfego DNS (`10.111.222.2/32`) para filtragem local, encaminhando consultas permitidas via `DatagramSocket` protegido (`VpnService.protect()`). O restante do tráfego TCP/UDP/HTTPS flui normalmente sem descriptografia ou certificados falsos.
- **Persistência (`data/`)**: Room Database (`filter_rules`, `dns_logs`, `whitelist`, `update_history`) + DataStore Preferences.
- **Atualizações (`worker/` & `updater/`)**: `BlocklistUpdateWorker` (WorkManager) com verificação de integridade e reversão automática em caso de erro; `AppUpdateChecker` para novas versões do aplicativo.
- **Interface AMOLED (`ui/`)**: Tema Preto AMOLED (`#000000`), Verde (`#00E676`) para proteção ativa e Vermelho (`#FF3B30`) para desativada.
