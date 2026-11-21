# BLACK°CUTS MUSIC PLAYER

Projeto Android nativo em desenvolvimento, isolado do site existente neste repositório. Identificador: `com.blackcuts.musicplayer`; Android 8.0+; versão configurada: 1.0.0. **Esta versão não está pronta para distribuição e não foi validada em um dispositivo.** A versão configurada não é uma certificação de conclusão.

## Estado real

A implementação contém código para leitura de áudio local por MediaStore (com observador e atualização manual), reprodução com ExoPlayer e MediaSessionService, fila formada pela lista selecionada, controles de reprodução, seek, aleatório, repetição, velocidade, temporizador em memória no serviço de áudio, compartilhamento de URI, favoritos e playlists no Room, temas no DataStore, backup por documento e modo carro básico. Playlists podem ser visualizadas, renomeadas e ter faixas removidas. O equalizador usa o efeito `android.media.audiofx.Equalizer` associado à sessão de áudio do ExoPlayer; só apresenta as bandas que o dispositivo realmente disponibiliza. Os efeitos não são garantidos em todos os dispositivos. A tela Descobrir abre busca no YouTube; há também um cliente opcional para um proxy HTTPS da YouTube Data API. A configuração de produção e o teste com chave real ainda são necessários. A central de downloads informa que a função não está disponível. O backup mescla favoritos e playlists e restaura o tema, sem copiar arquivos de áudio; as URIs podem não ser válidas em outro dispositivo.

O commit `7cb4ee718f5e68136d6f3dbaf82df241198ce432` foi compilado no GitHub Actions e passou nos testes unitários e testes básicos em emuladores Android 9, 10 e 13. **As funcionalidades ainda não foram validadas em aparelho físico**; consulte STATUS.md para os resultados e o commit testado. Em particular, notificações, áudio em segundo plano, permissões, integração com fones, efeitos, compartilhamento e persistência precisam ser validados em aparelhos físicos. Um APK debug foi gerado na nuvem para a revisão indicada em STATUS.md; não há APK release assinado de produção.

### Não implementado / pendente

- Downloads, pausa/retomada, extração de metadados/capas pela rede e fontes licenciadas.
- Pesquisa integrada YouTube Data API ainda exige proxy implantado, projeto Google, chave restrita, uso conforme os termos e teste real; listas de interesse e reconhecimento de música estão ausentes.
- Backup de histórico, exportação de biblioteca, busca global completa, edição de metadados/capas, duplicatas, letras, estatísticas, playlists automáticas, pastas ignoradas e organização por gênero/pasta.
- Fila editável, crossfade, retomada persistente da posição, normalização, balanceamento, virtualizador, presets e bandas fixas de 10 frequências. O equalizador de sistema pode ter um número diferente de bandas e depende do fabricante.
- Android Auto, controles de volume e playlists dentro do modo carro, atualizador, splash animado, personalização de cores e tamanhos e testes de desempenho/acessibilidade/dispositivos.
- WorkManager, Retrofit e arquitetura em módulos Clean Architecture completos. Não há integrações ou dados fictícios para substituir esses recursos.

## Compilar

Requisitos: Android Studio recente, JDK 17, Android SDK Platform 35, Build Tools compatíveis e acesso a Google Maven, Maven Central e Gradle. Abra esta pasta no Android Studio, aguarde a sincronização e execute no terminal:

```sh
./gradlew testDebugUnitTest assembleDebug
```

O APK de debug, se a compilação tiver sucesso, estará em `app/build/outputs/apk/debug/app-debug.apk`. Para instalar em aparelho autorizado: `adb install -r app/build/outputs/apk/debug/app-debug.apk`. Ao abrir a biblioteca, conceda acesso às músicas. Os arquivos devem estar indexados pelo MediaStore do Android. Na Biblioteca, abra os três pontos de uma faixa e escolha “Excluir do aparelho”; leia a confirmação antes de continuar. O Android pode solicitar autorização adicional. A exclusão afeta o arquivo original e pode ser irreversível.

Para gerar o binário **não assinado** de release: `./gradlew assembleRelease`. Ele não é um APK de distribuição instalável até ser assinado. O fluxo GitHub Actions em `.github/workflows/blackcuts-android.yml` tenta compilar e publicar artefatos. Para obter o APK, abra a aba **Actions** do repositório, selecione **BLACKCUTS Android**, escolha uma execução bem-sucedida da branch `arena/d5086f1b-meu-negocio`, vá até **Artifacts**, baixe `blackcuts-debug-apk`, extraia `app-debug.apk` e instale-o. A assinatura de debug e o SHA-256 são verificados no fluxo; consulte o relatório da execução. Se a execução falhar, nenhum APK de sucesso será publicado. O artefato `blackcuts-release-unsigned`, quando gerado, não é instalável até ser assinado.

### Assinatura de produção

Não fornecemos keystore ou senha: uma chave de distribuição precisa ser criada e controlada exclusivamente pelo proprietário, armazenada fora do repositório, com backup seguro. Utilize **Build > Generate Signed Bundle / APK** do Android Studio, crie ou selecione uma keystore de produção e informe suas credenciais localmente. Nunca faça commit da keystore, senhas ou chaves de API. Instale apenas APKs devidamente assinados e verifique o certificado antes de distribuir. A assinatura de debug é apenas para desenvolvimento e não deve ser usada para distribuição.

## Uso inicial

1. Conceda acesso às músicas e abra Biblioteca; use atualizar se o Android acabou de indexar arquivos.
2. Toque em uma faixa para iniciar a fila, ou marque o coração para favoritar. O mini player abre os controles completos.
3. Em Biblioteca > Playlists crie uma lista; no player use o botão de adicionar e escolha a lista. Toque no nome da playlist para visualizar e remover faixas; use o botão de reprodução para tocá-la. Excluí-la não exclui músicas.
4. Em Ajustes, selecione tema e cor do player (azul, violeta ou âmbar), equalizador disponível após iniciar uma música, ou modo carro. Configure tudo antes de dirigir.

## Arquitetura e privacidade

Compose/Material 3 apresenta o estado do `PlayerViewModel`. O MediaStore continua proprietário dos arquivos; Room guarda URIs de favoritos e membros de playlists; DataStore guarda aparência. Um `MediaSessionService` mantém o ExoPlayer separado da Activity e o Android gerencia foco e saída de áudio. O app não pede microfone e não possui telemetria. A permissão de Internet permite a pesquisa opcional e o carregamento de miniaturas quando o serviço for configurado. No Android 9 e 10, a escrita no armazenamento é solicitada apenas ao excluir uma faixa; no Android 10 o acesso legado é habilitado para essa compatibilidade. A busca externa abre outro aplicativo/site, que tem sua própria política de privacidade. O app só solicita a exclusão do arquivo de música quando o usuário escolhe a opção e confirma; compartilhar envia a URI selecionada ao aplicativo escolhido. O backup automático do Android está desativado. O backup manual usa um arquivo JSON escolhido pelo usuário e não contém áudio. A restauração mescla playlists e favoritos por URI e restaura o tema; URIs podem ser diferentes em outros aparelhos.

## Plano mínimo de validação antes da distribuição

- Sincronizar Gradle, executar testes unitários e lint, corrigir erros e gerar APK debug; testar instalação em Android 8, 13 e 15.
- Em cada versão testar permissão negada/concedida, arquivo novo/removido, biblioteca vazia e formatos suportados pelo aparelho.
- Testar início, pausa, seek, fim de fila, aleatório, repetição, controle externo, Bluetooth, chamada, retirada de fones, tela bloqueada e notificação; conferir áudio após fechar a Activity.
- Com efeito de áudio disponível, comparar sinal com bandas alteradas e testar dispositivos sem efeito. Verificar persistência de favoritos, playlists e temas após reinício e versões claras/escuras em telas pequenas.
- Implementar, testar e documentar as funcionalidades ausentes acima, acessibilidade, segurança, desempenho, assinatura e atualização antes de declarar a versão 1.0.0 completa.
