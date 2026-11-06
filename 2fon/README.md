# 2FON

Player local para Android e Windows, feito com React, TypeScript, Capacitor e Electron. As músicas não são enviadas para servidores e a reprodução não exige internet.

## Android

Na tela inicial, toque em **Sincronizar celular** e permita o acesso aos arquivos de áudio. O 2FON consulta a biblioteca de mídia do Android ao abrir, ao voltar para o app e periodicamente enquanto está aberto. Apenas arquivos indexados pelo Android em formatos suportados são encontrados; se uma música não aparecer, use **Adicionar músicas** e selecione a pasta manualmente. A sincronização pode ser desligada em **Pastas**.

A importação copia as músicas para o espaço privado do aplicativo: precisa de espaço livre e não altera os originais. Não é um upload para a internet. Desinstalar o aplicativo remove essas cópias, playlists e letras salvas no aplicativo. A importação por pasta e a sincronização do celular podem gerar entradas duplicadas para o mesmo arquivo.

Toque em uma música para abrir o player. Em **Letra**, cole uma letra ou importe um arquivo `.lrc`/`.txt`. Um LRC com timestamps, como `[00:12.00]Primeira linha`, acompanha a reprodução; texto comum aparece sem sincronização automática. O app não baixa nem inventa letras. Algumas letras incorporadas podem ser lidas na importação pelo navegador/Electron; no Android, adicione a letra manualmente.

**Playback / Reduzir voz** é uma redução experimental por cancelamento de centro estéreo em tempo real, não uma separação por inteligência artificial. Os resultados dependem da mixagem: a voz pode permanecer, instrumentos podem desaparecer e faixas mono podem perder bastante volume. Não cria um arquivo instrumental separado.

A reprodução em segundo plano, codecs, permissões e desempenho variam conforme o dispositivo e ainda exigem testes em celulares reais. Se o Android não permitir selecionar a raiz do armazenamento, escolha uma subpasta de músicas. O APK de debug deve ser tratado como versão de testes. Builds de debug criados em máquinas diferentes podem usar assinaturas diferentes, exigindo a desinstalação da versão anterior (e, portanto, a perda dos dados locais). Guarde as músicas originais e dados importantes antes de desinstalar.

## Desenvolvimento

Requisitos: Node 20 ou superior. Para Android: Java 17 e Android SDK 34.

```sh
npm ci
npm run dev                       # navegador
npm run desktop                   # Electron
npm run dist:win                  # instalador Windows (recomendado executar no Windows)
npm run build && npx cap sync android
cd android && ./gradlew assembleDebug
```

O APK de teste fica em `android/app/build/outputs/apk/debug/app-debug.apk` após o build. O projeto inclui uma ação de CI para compilar e testar a instalação em um emulador Android 16.

Na versão web, arquivos selecionados são copiados no IndexedDB; a seleção automática de músicas do celular só está disponível no Android. No Electron, arquivos são lidos dos caminhos originais. A disponibilidade de codecs depende do sistema. Use arquivos `.lrc` ao lado da música no Electron/navegador para leitura automática, ou importe a letra pelo player.

Atalhos no desktop: espaço reproduz/pausa, setas esquerda/direita voltam/avançam 5 segundos, setas cima/baixo alteram volume, N/P passam para próxima/anterior e Ctrl/⌘+K abre a busca.

## Referências de interação

O player central e a apresentação de letra acompanham os padrões de telas de reprodução e letras de serviços como [Spotify](https://www.lifewire.com/show-lyrics-on-spotify-5212674) e [Apple Music Sing](https://support.apple.com/en-by/guide/ipad/ipad7dff42c1/ipados). O controle de voz deste projeto não usa a tecnologia de separação do Apple Music.
