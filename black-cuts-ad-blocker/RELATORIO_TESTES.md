# Relatório de Testes e Limitações Técnicas — BLACK°CUTS AD BLOCKER

## 1. Ambiente de Desenvolvimento
O código-fonte completo do projeto Android Studio foi desenvolvido e estruturado em `black-cuts-ad-blocker/`.
**Nota de ambiente**: Neste sandbox não há JDK/Android SDK/Gradle instalados nem acesso de saída a `dl.google.com` / `services.gradle.org`, portanto a compilação do APK (`assembleDebug` / `assembleRelease`) e a execução em emulador/dispositivo físico devem ser realizadas no Android Studio local conforme o `MANUAL_INSTALACAO.md`.

## 2. Matriz de Testes Planejada e Implementada
| # | Cenário | Implementação |
|---|---------|---------------|
| 1 | Ativação da proteção | `MainActivity` (`VpnService.prepare`) + `BlackCutsVpnService.ACTION_START` |
| 2 | Desativação | `BlackCutsVpnService.ACTION_STOP` + botão na notificação persistente |
| 3 | Filtragem DNS | `DnsPacketParser.parseIpv4UdpDns` + `DomainFilterEngine.evaluate` (teste unitário em `DnsPacketParserTest.kt`) |
| 4 | Domínios bloqueados | Resposta `NXDOMAIN` (`RCODE=3`) construída localmente e gravada na TUN |
| 5 | Domínios permitidos | Encaminhamento via `DatagramSocket` protegido (`VpnService.protect`) + `DnsCache` |
| 6 | Atualização das listas | `BlocklistUpdateWorker` com verificação de integridade e rollback |
| 7-9 | Wi-Fi, Dados Móveis e Reconexão | Roteamento apenas de `10.111.222.2/32` permite troca transparente de rede |
| 10 | Consumo de bateria | Sem proxy TCP/HTTPS; apenas pacotes UDP porta 53 são processados |
| 11 | Compatibilidade com outros apps | Seleção por app via `addAllowedApplication` / `addDisallowedApplication` |
| 12 | Recuperação após reinicialização | `BootReceiver` ouvindo `BOOT_COMPLETED` |

## 3. Limitações Técnicas Documentadas
1. **Anúncios integrados ao conteúdo (YouTube, Instagram, Facebook, TikTok)**: Quando o anúncio é servido pelo mesmo domínio do conteúdo principal (stream de vídeo/feed), a filtragem puramente DNS não consegue separá-lo sem descriptografia HTTPS (MITM), que é intencionalmente evitada por segurança e privacidade.
2. **Conflito com outras VPNs e DNS Privado (DoT/DoH)**: O Android permite apenas uma VPN ativa por vez. Se o "DNS Privado" do sistema (Android 9+) estiver configurado em modo estrito, consultas DoT (porta 853) podem contornar o DNS padrão (porta 53). Recomenda-se deixar o DNS Privado do sistema em "Automático" ou "Desativado" ao usar o BLACK°CUTS.
