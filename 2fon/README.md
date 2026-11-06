# 2FON

Player de música local para Windows, com Electron, React e TypeScript. Não usa contas, servidores ou serviços de streaming. As músicas permanecem nos seus arquivos originais; playlists e preferências ficam no armazenamento local do aplicativo.

## Desenvolvimento

Requisitos: Node.js 20 ou superior e npm.

```sh
npm install
npm run dev          # versão de navegador para desenvolvimento
npm run desktop      # aplicativo Electron
npm run dist:win     # instalador Windows em dist/ (recomendado executar no Windows)
```

No desktop, selecione uma pasta para importar arquivos recursivamente e extrair metadados e capas incorporadas. Se os arquivos forem movidos ou removidos, importe a pasta novamente. O suporte real aos formatos depende dos codecs disponíveis no Chromium/Electron e do arquivo; alguns AAC/M4A podem não ser reproduzidos em determinadas distribuições.

A versão de navegador é uma alternativa de desenvolvimento: usa o seletor de pasta e salva cópias dos arquivos no IndexedDB, sujeito ao espaço e às permissões do navegador. A versão de navegador também tenta ler metadados e capas incorporadas; capas grandes podem ser omitidas. Para a experiência completa use o aplicativo Electron.

Atalhos: espaço reproduz/pausa; setas esquerda/direita avançam ou voltam 5 segundos; setas cima/baixo alteram volume; N e P passam para próxima/anterior. Evitados enquanto se digita.

## Android

Electron não gera APK. A interface React pode ser reaproveitada em um aplicativo Android com Capacitor, mas o acesso à biblioteca, permissões de mídia, reprodução em segundo plano e empacotamento precisam de implementação e testes específicos. Este projeto ainda não inclui APK nem suporte nativo Android.

## Android (APK de teste)

O projeto Android usa Capacitor e o seletor de pastas do sistema. A importação copia as músicas para o espaço privado do aplicativo, portanto precisa de espaço livre; os originais não são alterados. Desinstalar o aplicativo apaga as cópias e a biblioteca. Escolha uma subpasta de músicas se o Android não permitir selecionar a raiz do armazenamento. A reprodução em segundo plano e a compatibilidade com cada formato dependem do Android/WebView e ainda precisam ser testadas em dispositivos reais.

Com Java 17, Android SDK 34 e Node 20 instalados:

```sh
npm ci
npm run build
npx cap sync android
cd android
./gradlew assembleDebug
```

O APK de teste assinado com a chave de debug é criado em `android/app/build/outputs/apk/debug/app-debug.apk`. Não é uma versão assinada para publicação na Play Store.
