# Integrações futuras e limites

Nenhuma das integrações abaixo está concluída nem foi testada. As telas não devem declarar que estão disponíveis antes da configuração e verificação do serviço.

## YouTube Data API

A busca atual apenas abre o YouTube oficialmente. Para oferecer resultados dentro do app, é necessário um projeto Google Cloud com YouTube Data API habilitada, cota e credenciais restritas; um serviço próprio em HTTPS deve guardar a credencial e aplicar autenticação, limites de uso e proteção contra abuso. Um futuro cliente Android deverá enviar somente a consulta ao serviço, tratar cota/erros, exibir título/canal/miniatura reais e abrir o vídeo no mecanismo oficial. Não extrair áudio nem obter dados por raspagem. Não empacotar segredos em BuildConfig, recursos ou Git.

## Identificação

É necessário contratar um provedor autorizado de fingerprint/reconhecimento e implementar seu protocolo e consentimento de microfone. A gravação deve ser efêmera, limitada no tempo, e não deve ser transmitida a terceiros sem informação clara. Atualmente o app não solicita nem usa o microfone.

## Downloads

Falta implementar um catálogo ou entrada de URL para fontes com autorização explícita, validação da origem e do conteúdo, fluxo em segundo plano e publicação em MediaStore. Não se deve afirmar qualidade superior à do arquivo original, nem contornar plataformas ou licenças. A tela atual não inicia downloads.

## Atualizações

Falta definir o domínio e contrato do servidor oficial, autenticação e integridade da versão, compatibilidade de dados, política de versão e UX de instalação Android com confirmação do usuário. Não implementar instalação silenciosa nem aceitar APK de origem arbitrária.
