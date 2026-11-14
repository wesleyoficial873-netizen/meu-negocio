/* ============================================================
   CATEGORIA 08 — SERVIÇOS PROFISSIONAIS
   ============================================================ */
(function () {
  'use strict';

  S({
    id:'contabilidade', cat:'servicos', layout:'pro', theme:'ivory', v:1,
    name:'Escritório de contabilidade', brand:'Contábil Prisma',
    kicker:'Contabilidade · Empresas e profissionais',
    head:'Contabilidade que explica, não só apura.',
    lede:'Abertura de empresa, folha, impostos e planejamento tributário com linguagem clara e atendimento próximo.',
    hero:'u:1450101499163-c8848c66ca85',
    imgs:['u:1454165804606-c3d57bc86b40','u:1497366216548-37526070297c','u:1434030216411-0b793f4b4173'],
    nav:['Serviços','Para quem','Equipe','Contato'],
    stats:[['22','anos de escritório'],['+340','empresas atendidas'],['4','contadores']],
    groups:[
      ['Abertura e rotina','Do CNPJ ao dia a dia',[
        ['Abertura de empresa','Enquadramento e registro completo','—','Mais buscado'],
        ['Escrituração mensal','Folha, impostos e obrigações','—'],
        ['Emissão de notas','Orientação e sistema integrado','—']
      ]],
      ['Planejamento','Menos imposto, com legalidade',[
        ['Planejamento tributário','Comparativo entre regimes','—'],
        ['Recuperação de créditos','Revisão dos últimos 5 anos','—'],
        ['Consultoria trabalhista','Contratos e rotina de pessoal','—']
      ]],
      ['Pessoas','Para quem é MEI ou autônomo',[
        ['MEI','Regularização e declaração anual','—'],
        ['IRPF','Declaração completa e retificações','—'],
        ['Pró-labore e folha','Cálculo e encargos','—']
      ]]
    ],
    info:{ addr:'Rua 13 de Maio, 2100 — Centro', hours:'Seg a Sex · 8h às 17h30', city:'Campo Grande, MS' },
    highlight:['Atendimento com contador responsável','Reuniões mensais de acompanhamento','Sistema online de documentos'],
    aboutText:'O Prisma existe para traduzir contabilidade em decisão. O cliente recebe relatórios claros, sabe quanto paga e por quê — e fala com o contador, não com um robô.',
    quote:'“Número sem explicação não ajuda ninguém.”',
    tags:['Contabilidade','Empresas','Tributário'],
    domain:'contabilprisma.com.br', cta:'Falar com a contabilidade', ctaShort:'Conversar'
  });

  S({
    id:'advocacia', cat:'servicos', layout:'pro', theme:'noir', v:2,
    name:'Advocacia', brand:'Vasconcelos & Lima',
    kicker:'Sociedade de advogados · OAB/MS',
    head:'Defesa técnica com comunicação clara.',
    lede:'Atuação em direito civil, trabalhista e empresarial com acompanhamento processual transparente.',
    hero:'u:1455390582262-044cdead277a',
    imgs:['u:1455390582262-044cdead277a','u:1450101499163-c8848c66ca85','u:1500648767791-00dcc994a43e'],
    nav:['Áreas','Escritório','Equipe','Contato'],
    stats:[['18','anos de atuação'],['+900','casos conduzidos'],['3','sócios']],
    groups:[
      ['Áreas','Atuação principal',[
        ['Direito trabalhista','Reclamações, acordos e consultoria preventiva','—'],
        ['Direito civil','Contratos, indenizações e família','—','Destaque'],
        ['Direito empresarial','Constituição, contratos e recuperação','—'],
        ['Direito imobiliário','Compra, venda e regularização','—']
      ]],
      ['Como atuamos','Transparência no processo',[
        ['Análise inicial','Reunião de 40 minutos com um sócio','—'],
        ['Estratégia','Plano de ação escrito','—'],
        ['Acompanhamento','Relatórios em cada movimentação','—']
      ]],
      ['Consultivo','Para evitar o litígio',[
        ['Revisão de contratos','Análise com parecer','—'],
        ['Compliance trabalhista','Auditoria de rotinas','—']
      ]]
    ],
    info:{ addr:'Av. Afonso Pena, 3980 — 12º andar', hours:'Seg a Sex · 8h30 às 18h', city:'Campo Grande, MS' },
    highlight:['Primeira reunião sem compromisso','Relatórios processuais periódicos','Atendimento por vídeo quando necessário'],
    aboutText:'O escritório atua com a convicção de que cliente informado decide melhor. Cada etapa do processo é explicada em linguagem comum, sem jargão desnecessário.',
    quote:'“Técnica sem clareza afasta o cliente do próprio caso.”',
    tags:['Advocacia','Jurídico','Consultivo'],
    domain:'vasconceloselima.com.br', cta:'Agendar uma reunião', ctaShort:'Agendar'
  });

  S({
    id:'consultoria-empresarial', cat:'servicos', layout:'pro', theme:'sand', v:3,
    name:'Consultoria empresarial', brand:'Eixo Consultoria',
    kicker:'Consultoria · Gestão e crescimento',
    head:'Diagnóstico honesto, plano executável.',
    lede:'Estruturação de processos, gestão financeira e estratégia comercial para empresas que querem crescer com base.',
    hero:'u:1454165804606-c3d57bc86b40',
    imgs:['u:1497366216548-37526070297c','u:1519085360753-af0119f99cbe','u:1497366811353-6870744d04b2'],
    nav:['Serviços','Método','Cases','Contato'],
    stats:[['+70','empresas atendidas'],['11','anos de consultoria'],['90','dias para resultados']],
    groups:[
      ['Gestão','Base do negócio',[
        ['Diagnóstico 360','Análise de finanças, processos e mercado','—','Destaque'],
        ['Gestão financeira','Fluxo de caixa e precificação','—'],
        ['Processos','Padronização e indicadores','—']
      ]],
      ['Comercial','Receita',[
        ['Estratégia comercial','Posicionamento e canais','—'],
        ['Estrutura de vendas','Funil, metas e comissionamento','—'],
        ['Treinamento de equipe','Rotina de atendimento','—']
      ]],
      ['Implantação','Não fica no relatório',[
        ['Plano de ação','Cronograma com responsáveis','—'],
        ['Acompanhamento mensal','Reuniões de resultado','—']
      ]]
    ],
    info:{ addr:'Rua Antônio Maria Coelho, 1500 — Jardim dos Estados', hours:'Seg a Sex · 9h às 18h', city:'Campo Grande, MS' },
    highlight:['Diagnóstico inicial sem custo','Plano de ação com prazos','Reuniões mensais de acompanhamento'],
    aboutText:'A Eixo não entrega relatório de gaveta. O trabalho começa pelo diagnóstico, passa pelo plano de ação e continua com acompanhamento até o indicador mexer.',
    quote:'“Consultoria boa muda o número, não o discurso.”',
    tags:['Consultoria','Gestão','Estratégia'],
    domain:'eixoconsultoria.com.br', cta:'Solicitar diagnóstico', ctaShort:'Conversar'
  });

  S({
    id:'marketing-digital', cat:'servicos', layout:'pro', theme:'tech', v:1,
    name:'Marketing digital', brand:'Pulso Digital',
    kicker:'Marketing digital · Performance e marca',
    head:'Presença digital com estratégia, não com sorte.',
    lede:'Gestão de redes, tráfego pago, conteúdo e sites integrados em um único plano de crescimento.',
    hero:'u:1519085360753-af0119f99cbe',
    imgs:['u:1454165804606-c3d57bc86b40','u:1497366811353-6870744d04b2','u:1434030216411-0b793f4b4173'],
    nav:['Serviços','Processo','Resultados','Contato'],
    stats:[['+120','projetos'],['6','especialistas'],['mensal','relatório de performance']],
    groups:[
      ['Aquisição','Trazer gente certa',[
        ['Tráfego pago','Campanhas em Google e Meta','—','Destaque'],
        ['SEO','Otimização para busca orgânica','—'],
        ['Landing pages','Páginas de conversão','—']
      ]],
      ['Marca','Construir autoridade',[
        ['Gestão de redes sociais','Calendário editorial e design','—'],
        ['Produção de conteúdo','Fotos, vídeos e copy','—'],
        ['Identidade visual','Marca aplicada com consistência','—']
      ]],
      ['Inteligência','Medir para decidir',[
        ['Relatórios mensais','Métricas e aprendizados','—'],
        ['Testes A/B','Otimização contínua','—']
      ]]
    ],
    info:{ addr:'Coworking Central — Av. Afonso Pena', hours:'Seg a Sex · 9h às 18h', city:'Campo Grande, MS' },
    highlight:['Plano mensal com metas claras','Relatório de performance transparente','Equipe multidisciplinar'],
    aboutText:'A Pulso trabalha com marcas que querem crescer sem perder identidade. Estratégia, conteúdo e mídia conversam entre si — e o resultado aparece no relatório, não na promessa.',
    quote:'“Marketing sem medição é opinião.”',
    tags:['Marketing','Tráfego','Conteúdo'],
    domain:'pulsodigital.com.br', cta:'Solicitar proposta', ctaShort:'Conversar'
  });

  S({
    id:'fotografia', cat:'servicos', layout:'pro', theme:'steel', v:2,
    name:'Fotografia', brand:'Lume Foto',
    kicker:'Fotografia · Ensaio e marca',
    head:'A luz certa faz a imagem falar.',
    lede:'Ensaios pessoais, fotografia de marca e produtos com direção criativa e entrega em galeria digital.',
    hero:'u:1500648767791-00dcc994a43e',
    imgs:['u:1531123897727-8f129e1688ce','u:1524504388940-b1c1722653e1','u:1500648767791-00dcc994a43e'],
    nav:['Portfólio','Serviços','Processo','Agenda'],
    stats:[['+600','ensaios'],['9','anos atrás da câmera'],['7 dias','para entrega']],
    groups:[
      ['Ensaios','Para pessoas',[
        ['Ensaio pessoal','Direção de pose e luz','—'],
        ['Ensaio casal','Externo ou estúdio','—','Destaque'],
        ['Ensaio gestante','Com produção de cabelo e make','—']
      ]],
      ['Marca','Para negócios',[
        ['Fotografia de produto','Fundo neutro e lifestyle','—'],
        ['Retrato corporativo','Equipe e liderança','—'],
        ['Cobertura de evento','Corporativo e social','—']
      ]],
      ['Entrega','Como funciona',[
        ['Galeria digital','Seleção tratada em alta resolução','—'],
        ['Tratamento','Cor e pele com padrão editorial','—'],
        ['Impressão fine art','Sob demanda','—']
      ]]
    ],
    info:{ addr:'Estúdio — Jardim dos Estados', hours:'Seg a Sáb · horários a combinar', city:'Campo Grande, MS' },
    highlight:['Direção de pose inclusa','Galeria online por 1 ano','Tratamento com padrão editorial'],
    aboutText:'A Lume Foto é um estúdio pequeno que cuida de cada imagem como peça única. Da escolha da locação ao último ajuste de cor, tudo passa pela mesma mão.',
    quote:'“Fotografia boa é a que a pessoa reconhece como ela mesma.”',
    tags:['Fotografia','Retrato','Marca'],
    domain:'lumefoto.com.br', cta:'Agendar ensaio', ctaShort:'Agendar'
  });

  S({
    id:'design-grafico', cat:'servicos', layout:'pro', theme:'plum', v:3,
    name:'Design gráfico', brand:'Oficina Tipográfica',
    kicker:'Design gráfico · Identidade visual',
    head:'Marcas com ideia, não só com logo.',
    lede:'Identidade visual, embalagem e materiais gráficos com pesquisa, sistema tipográfico e aplicação consistente.',
    hero:'u:1434030216411-0b793f4b4173',
    imgs:['u:1455390582262-044cdead277a','u:1498049794561-7780e7231661','u:1519085360753-af0119f99cbe'],
    nav:['Projetos','Serviços','Método','Contato'],
    stats:[['+80','marcas criadas'],['12','anos de oficina'],['+','premiações']],
    groups:[
      ['Identidade','Sistema completo',[
        ['Logo e marca','Pesquisa, desenho e versões','—','Destaque'],
        ['Manual de marca','Aplicações e tipografia','—'],
        ['Papelaria','Cartão, papel timbrado e assinatura','—']
      ]],
      ['Aplicação','Onde a marca aparece',[
        ['Embalagem','Rotulagem e mockup','—'],
        ['Social media kit','Templates editáveis','—'],
        ['Sinalização','Fachada e ambiente','—']
      ]],
      ['Método','Como criamos',[
        ['Briefing','Entrevista e pesquisa de mercado','—'],
        ['Conceito','Apresentação de caminhos','—'],
        ['Entrega','Arquivos e manual de uso','—']
      ]]
    ],
    info:{ addr:'Oficina — Centro', hours:'Seg a Sex · 9h às 18h', city:'Campo Grande, MS' },
    highlight:['Arquivos abertos e editáveis','Manual de marca incluso','Acompanhamento na aplicação'],
    aboutText:'A Oficina Tipográfica entende que marca é sistema, não desenho solto. Cada projeto começa pela pesquisa e termina com um manual que garante consistência em qualquer lugar.',
    quote:'“Design bom se sustenta fora do mockup.”',
    tags:['Design','Identidade','Marca'],
    domain:'oficinatipografica.com.br', cta:'Falar sobre meu projeto', ctaShort:'Conversar'
  });

  S({
    id:'assistencia-tecnica', cat:'servicos', layout:'pro', theme:'tech', v:1,
    name:'Assistência técnica', brand:'Fix Tech',
    kicker:'Assistência técnica · Celulares e notebooks',
    head:'Seu aparelho pronto no mesmo dia.',
    lede:'Diagnóstico gratuito, peças com garantia e reparo em até 4 horas para os serviços mais comuns.',
    hero:'u:1497366811353-6870744d04b2',
    imgs:['u:1497366811353-6870744d04b2','u:1450101499163-c8848c66ca85','u:1454165804606-c3d57bc86b40'],
    nav:['Serviços','Marcas','Garantia','Contato'],
    stats:[['4h','para reparos comuns'],['90','dias de garantia'],['+','marcas atendidas']],
    groups:[
      ['Celulares','Reparo rápido',[
        ['Troca de tela','Peças originais e paralelas','—','Mais buscado'],
        ['Troca de bateria','Com teste de carga','—'],
        ['Reparo de conector','Solda e substituição','—'],
        ['Recuperação de dados','Quando tecnicamente possível','—']
      ]],
      ['Notebooks','Manutenção completa',[
        ['Limpeza e troca de pasta térmica','Redução de temperatura','—'],
        ['Troca de teclado','Por modelo','—'],
        ['Upgrade de SSD','Migração de dados inclusa','—'],
        ['Reparo de placa','Diagnóstico avançado','—']
      ]],
      ['Garantia','Compromisso',[
        ['90 dias','Em todos os reparos','—'],
        ['Diagnóstico gratuito','Sem compromisso','—'],
        ['Orçamento por WhatsApp','Com foto e vídeo','—']
      ]]
    ],
    info:{ addr:'Rua 26 de Agosto, 410 — Centro', hours:'Seg a Sex · 8h30 às 18h · Sáb até 13h', city:'Campo Grande, MS' },
    highlight:['Diagnóstico sem custo','Peças com garantia de 90 dias','Atendimento com ordem de serviço'],
    aboutText:'A Fix Tech conserta com processo: diagnóstico, orçamento aprovado e ordem de serviço. Nada sai da bancada sem teste completo de funcionamento.',
    quote:'“Conserto bom é o que não volta.”',
    tags:['Assistência','Celular','Notebook'],
    domain:'fixtech.com.br', cta:'Pedir diagnóstico', ctaShort:'Diagnóstico'
  });

  S({
    id:'prestadores-servicos', cat:'servicos', layout:'pro', theme:'ocean', v:2,
    name:'Prestadores de serviços', brand:'Rede Serviços',
    kicker:'Serviços gerais · Elétrica, hidráulica e reformas',
    head:'Serviço bem feito, com garantia e recibo.',
    lede:'Equipe verificada para elétrica, hidráulica, montagem e pequenas reformas residenciais.',
    hero:'u:1497366216548-37526070297c',
    imgs:['u:1497366216548-37526070297c','u:1450101499163-c8848c66ca85','u:1600596542815-ffad4c1539a9'],
    nav:['Serviços','Profissionais','Garantia','Orçamento'],
    stats:[['+1200','serviços realizados'],['90','dias de garantia'],['4.9','avaliação']],
    groups:[
      ['Elétrica','Residencial e comercial',[
        ['Instalação de tomadas','Pontos novos e substituição','—'],
        ['Quadro de distribuição','Troca e organização','—'],
        ['Iluminação','Instalação de spots e lustres','—']
      ]],
      ['Hidráulica','Vazamentos e instalações',[
        ['Caça-vazamento','Detecção sem quebra','—','Destaque'],
        ['Troca de registros','Reparo e substituição','—'],
        ['Instalação de aquecedor','Com teste de pressão','—']
      ]],
      ['Reformas','Pequenas obras',[
        ['Pintura residencial','Preparação e acabamento','—'],
        ['Montagem de móveis','Com fixação segura','—'],
        ['Reparos gerais','Serviços do dia a dia','—']
      ]]
    ],
    info:{ addr:'Atendimento em toda a cidade', hours:'Seg a Sáb · 7h às 19h', city:'Campo Grande, MS' },
    highlight:['Profissionais verificados','Garantia de 90 dias no serviço','Orçamento antes de iniciar'],
    aboutText:'A Rede reúne profissionais autônomos verificados e organiza o atendimento do orçamento ao recibo. O cliente sabe quem vai na casa, quando e por quanto.',
    quote:'“Serviço bom a gente indica.”',
    tags:['Prestadores','Reformas','Manutenção'],
    domain:'redeservicos.com.br', cta:'Solicitar orçamento', ctaShort:'Orçar'
  });
})();
