# Integrações futuras e limites

Nenhuma das integrações abaixo está concluída nem foi testada. As telas não devem declarar que estão disponíveis antes da configuração e verificação do serviço.

## YouTube Data API

O cliente opcional consulta um proxy HTTPS configurado na compilação e abre resultados na página oficial do vídeo. Há um servidor de referência em `services/youtube-proxy/server.py`, que utiliza o endpoint `youtube/v3/search` da API oficial; ele não extrai áudio e a chave só existe no processo servidor. Está desativado por padrão e não foi testado com chave/serviço real.

1. Habilite a YouTube Data API em um projeto Google Cloud e configure cota e restrições da chave.
2. Execute o servidor de referência com `YOUTUBE_API_KEY` em variável de ambiente no servidor. Ele escuta apenas `127.0.0.1:8080`; instale um gateway HTTPS próprio com autenticação, controle de abuso, observabilidade sem registrar buscas/segredos e políticas de proteção de dados. O limitador local é ilustrativo e não substitui proteção de produção.
3. Configure a URL pública HTTPS do gateway terminando em `/api/search` no Gradle, por exemplo `./gradlew assembleDebug -PblackcutsYoutubeEndpoint=https://seu-dominio.example/api/search`. A URL não é segredo; nunca inclua a chave no Gradle ou aplicativo. Se o gateway exigir credenciais de usuário, é preciso implementar autenticação no cliente antes de usá-lo.
4. Teste com credenciais e quota reais, restrições e termos do YouTube, respostas de erro e vídeos indisponíveis. Os resultados sempre abrem o YouTube; não garantimos disponibilidade ou reprodução interna.

O backend é apenas ponto de partida e deve passar por revisão de segurança antes de receber tráfego público. Os testes locais de transformação usam respostas simuladas; não são um teste de integração com o YouTube.

## Identificação

É necessário contratar um provedor autorizado de fingerprint/reconhecimento e implementar seu protocolo e consentimento de microfone. A gravação deve ser efêmera, limitada no tempo, e não deve ser transmitida a terceiros sem informação clara. Atualmente o app não solicita nem usa o microfone.

## Downloads

Falta implementar um catálogo ou entrada de URL para fontes com autorização explícita, validação da origem e do conteúdo, fluxo em segundo plano e publicação em MediaStore. Não se deve afirmar qualidade superior à do arquivo original, nem contornar plataformas ou licenças. A tela atual não inicia downloads.

## Atualizações

Falta definir o domínio e contrato do servidor oficial, autenticação e integridade da versão, compatibilidade de dados, política de versão e UX de instalação Android com confirmação do usuário. Não implementar instalação silenciosa nem aceitar APK de origem arbitrária.
