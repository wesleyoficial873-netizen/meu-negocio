# Manual de Instalação e Build — BLACK°CUTS AD BLOCKER

## 1. Requisitos para Compilação
- Android Studio Ladybug (2024.2+) ou superior
- JDK 17
- Android SDK 35 (compileSdk 35 / minSdk 26)

## 2. Gerar APK Debug
No Android Studio, abra a pasta `black-cuts-ad-blocker/`, aguarde o Gradle Sync e execute:
```bash
./gradlew assembleDebug
```
O APK será gerado em:
`app/build/outputs/apk/debug/app-debug.apk`

## 3. Gerar APK Release Assinado
1. Crie sua keystore:
```bash
keytool -genkey -v -keystore blackcuts-release.jks -keyalg RSA -keysize 2048 -validity 10000 -alias blackcuts
```
2. Configure as variáveis de ambiente:
```bash
export BLACKCUTS_KEYSTORE_PATH=/caminho/para/blackcuts-release.jks
export BLACKCUTS_KEYSTORE_PASS=sua_senha
export BLACKCUTS_KEY_ALIAS=blackcuts
export BLACKCUTS_KEY_PASS=sua_senha
```
3. Descomente `signingConfig = signingConfigs.getByName("release")` em `app/build.gradle.kts` e execute:
```bash
./gradlew assembleRelease
```

## 4. Instalação no Dispositivo Android
1. Transfira o APK para o aparelho ou instale via ADB:
```bash
adb install app-debug.apk
```
2. Abra o **BLACK°CUTS AD BLOCKER** e toque em **ATIVAR PROTEÇÃO**.
3. Aceite a solicitação de conexão VPN local do Android.
