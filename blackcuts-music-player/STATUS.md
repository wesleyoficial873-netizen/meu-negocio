# Relatório de execução e testes

## Estado

A versão configurada é 1.0.0, mas o produto completo ainda está em desenvolvimento. O app original não foi reiniciado. O site existente foi preservado. O código e os detalhes funcionais estão em [README.md](README.md); a auditoria em [AUDITORIA.md](AUDITORIA.md).

## Compilação na nuvem

- Primeira tentativa: [execução 44912286148](https://github.com/wesleyoficial873-netizen/meu-negocio/actions/runs/44912286148) falhou na preparação externa do SDK, antes de compilar.
- Após passar a utilizar o SDK já instalado no executor: [execução 44912400470](https://github.com/wesleyoficial873-netizen/meu-negocio/actions/runs/44912400470), commit `37930682437c5400421820dba15bc322093b0583`, terminou com sucesso em `testDebugUnitTest`, `assembleDebug`, `assembleRelease`, `apksigner verify` e `aapt dump badging`. O artefato `blackcuts-debug-apk` e o release **não assinado** foram publicados no GitHub Actions, junto do relatório de testes unitários. Esta execução não inclui as alterações posteriores de playlists e temporizador.
- [Execução 44913099715](https://github.com/wesleyoficial873-netizen/meu-negocio/actions/runs/44913099715), commit `69d884918546395d25e60299db3a27c4f1494c06`, incluiu as alterações de playlists, temporizador e cliente opcional YouTube. O build, os testes unitários Kotlin e Python, a verificação do APK debug e o smoke test no emulador API 29 concluíram com sucesso. Os artefatos `blackcuts-debug-apk`, `blackcuts-release-unsigned`, relatórios e diagnósticos estão disponíveis nessa execução.
- A execução mais recente pode ser consultada em [BLACKCUTS Android](https://github.com/wesleyoficial873-netizen/meu-negocio/actions/workflows/blackcuts-android.yml). Confira o commit e o resultado antes de baixar o artefato. Compilação não comprova a funcionalidade no celular.

## Como obter o APK

1. Abra a execução bem-sucedida na branch `arena/d5086f1b-meu-negocio` no GitHub Actions e vá a **Artifacts**.
2. Baixe `blackcuts-debug-apk`, extraia `app-debug.apk` e instale-o manualmente no Android. `SHA256SUMS.txt` acompanha o arquivo. Um APK debug serve para testes, não para distribuição comercial.
3. O artefato `blackcuts-release-unsigned` não está assinado e não deve ser tratado como um release instalável. Para distribuição, assine usando uma keystore de produção controlada pelo proprietário, conforme o README.

Neste ambiente local, não há JDK, SDK ou dispositivo, e a transferência de artefatos do armazenamento do Actions foi bloqueada pela rede. O artefato foi confirmado pela API do GitHub e é obtido pela página de Actions, não está no diretório local.

## Testes e lacunas

- No Actions, as duas verificações unitárias de formatação de tempo foram executadas no commit mencionado acima. Não são testes de reprodução.
- O smoke test em emulador API 29 passou no commit acima: instalou o APK, indexou WAV sintético, iniciou a reprodução e encontrou uma sessão de mídia em estado de reprodução após HOME. Não verifica a tela apagada nem prova saída de som física.
- Os dois testes locais Python do proxy passaram com respostas simuladas; não houve consulta à YouTube Data API real.
- **Não foram testados em aparelho físico** biblioteca, áudio em segundo plano com tela bloqueada, Bluetooth, interrupções, equalizador, backup, playlists ou compatibilidade entre versões. O efeito de áudio é dependente do dispositivo.
- Testes de desempenho, acessibilidade, segurança, Android Auto e publicação permanecem pendentes. Também faltam downloads autorizados, configuração e teste real da YouTube Data API, identificação, atualizador e diversas funções listadas no README. Não existe APK release assinado.
