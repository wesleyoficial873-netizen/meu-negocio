# Auditoria técnica — BLACK°CUTS

## Escopo e método

Inspeção de todos os arquivos do projeto Android, Gradle, manifesto, workflow e teste unitário existente. A análise estática não comprova funcionamento em Android. As tentativas de build e testes estão em STATUS.md; nenhum resultado de aparelho físico pode ser presumido a partir delas.

## Inventário

| Área | Situação no código | Limitações / validação pendente |
|---|---|---|
| Player e biblioteca | MediaStore + observador; ExoPlayer, serviço Media3, controles e mini player | Sem paginação, histórico, persistência de posição e fila editável. Validar permissões, formatos, Bluetooth, foco e execução de fundo em aparelho. |
| Capa | URI de capa local do MediaStore via Coil e metadados da sessão | Sem busca ou edição em serviços externos; extração depende de indexação do Android. |
| Notificação/tela bloqueada | MediaSessionService e permissões de serviço de mídia | Media3 fornece integração de sistema; não validada em versões/aparelhos. |
| Playlists/favoritos | Room, criação, exclusão, adicionar e tocar | Visualização, remoção e renomeação foram adicionadas após a auditoria inicial; faltam reordenação e histórico; URIs variam entre instalações. |
| Equalizador | AudioEffect Equalizer vinculado à sessão ExoPlayer | Bandas e suporte variam por aparelho; sem dez bandas garantidas, presets, persistência ou comprovação de processamento em equipamento. |
| Aparência e carro | Compose, temas, modo carro básico | Não há Android Auto, volume ou playlists no modo carro; falta teste em telas distintas. |
| Backup/restauração | Documento JSON escolhido pelo usuário; favoritos, playlists e tema, mesclagem no Room | Não inclui músicas/histórico; URIs podem ser inválidas em outro aparelho, não resolve títulos entre aparelhos. Ainda não testado em dispositivo. |
| Pesquisa YouTube | Abre pesquisa no app/site oficial | Não integra YouTube Data API; resultados dentro do app dependem de configuração oficial. |
| Downloads, reconhecimento e atualizações | Não implementados | Dependem de política de fonte autorizada, provedor de reconhecimento e servidor oficial. |
| Metadados avançados, letra, estatísticas, sugestões | Não implementados | Exigem decisões de provedores, edição segura e testes. |

## Problemas identificados e correções

- A primeira tentativa no Actions falhou ao configurar o SDK; o executor já dispõe de SDK, então o workflow passou a verificá-lo diretamente.
- Cancelamento de escaneamento era engolido como erro de biblioteca; agora é propagado. Erros de áudio têm canal separado, e solicitações antes da conexão do MediaController são guardadas.
- O temporizador dependia do ciclo de vida da Activity; agora acompanha o serviço de reprodução, mas não sobrevive ao término do processo.
- Backup usa Storage Access Framework, limita tamanho, valida conteúdo antes de gravar e mescla playlists e favoritos por transação. A aparência é gravada separadamente no DataStore, portanto não há atomicidade entre Room e DataStore.
- O manifesto anunciava serviço de navegação legado sem MediaLibraryService. Essa declaração foi removida; Android Auto continua não implementado.
- Riscos restantes: o objeto global do equalizador e do temporizador acopla UI e serviço no mesmo processo; ViewModel reúne lógica de domínio, biblioteca, player e backup. Faltam camadas Clean Architecture, injeção de dependências, testes de integração, paginação e observação baseada em ciclo de vida. O scanner pode fazer trabalho repetido durante mudanças em massa. A sessão não foi auditada com controladores externos reais.

## Dependências e compilação

JDK 17, Android SDK 35, Gradle 8.9, Android Gradle Plugin 8.5.2, Kotlin 1.9.24, Compose/Material 3, Media3, Room/KAPT, DataStore, Coil, coroutines e JUnit. O Gradle obtém bibliotecas de Google Maven e Maven Central. Não há Retrofit/WorkManager nem segredo de serviço externo no projeto.

O pipeline foi executado em uma revisão anterior e compila, executa testes unitários e verifica assinatura de debug antes de disponibilizar artefatos. Release é **não assinado**; um APK de produção exige keystore privada do proprietário. Os comandos e passos de download estão no README. Builds locais, lint, testes instrumentados, emuladores e aparelhos são necessários antes de considerar o aplicativo pronto.
