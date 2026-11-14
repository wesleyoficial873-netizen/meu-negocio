/* ============================================================
   CATEGORIA 06 — IMÓVEIS E CONSTRUÇÃO
   ============================================================ */
(function () {
  'use strict';

  S({
    id:'imobiliaria', cat:'imoveis', layout:'estate', theme:'ivory', v:1,
    name:'Imobiliária', brand:'Prime Imóveis',
    kicker:'Imobiliária · Compra, venda e locação',
    head:'O imóvel certo começa com a pergunta certa.',
    lede:'Portfólio com fotos amplas, ficha técnica completa e visita agendada em minutos. Do apartamento ao terreno, sem rodeios.',
    hero:'u:1600596542815-ffad4c1539a9',
    imgs:['u:1600585154340-be6161a56a0c','u:1600566753086-00f18fb6b3ea','u:1600607687939-ce8a6c25118c'],
    nav:['Imóveis','Locação','Anuncie','Contato'],
    stats:[['480','imóveis no portfólio'],['18','anos de mercado'],['72h','para publicar']],
    groups:[
      ['Alto padrão','Seleção da semana',[
        ['Casa em condomínio','4 suítes · 380m² · piscina e área gourmet','—','Destaque'],
        ['Apartamento Vista Parque','3 suítes · 148m² · 2 vagas','—'],
        ['Cobertura duplex','3 suítes · 220m² · terraço privativo','—']
      ]],
      ['Pronto para morar','Entrega imediata',[
        ['Apartamento 2 quartos','72m² · 1 vaga · lazer completo','—'],
        ['Casa térrea','3 quartos · 140m² · quintal amplo','—'],
        ['Studio compacto','32m² · mobiliado · centro','—']
      ]],
      ['Locação','Contratos ágeis',[
        ['Sala comercial','48m² · edifício com recepção','—'],
        ['Galpão logístico','900m² · acesso a rodovia','—']
      ]]
    ],
    info:{ addr:'Av. Afonso Pena, 4310 — Chácara Cachoeira', hours:'Seg a Sex · 8h30 às 18h · Sáb até 12h', city:'Campo Grande, MS' },
    highlight:['Tour virtual em todos os imóveis','Documentação verificada','Visitas agendadas pelo WhatsApp'],
    aboutText:'A Prime atua há 18 anos na cidade com um portfólio enxuto e documentação conferida. Preferimos mostrar menos imóveis e acertar em cada indicação.',
    quote:'“Imóvel bom não precisa de vendedor insistente.”',
    tags:['Imobiliária','Alto padrão','Locação'],
    domain:'primeimoveis.com.br', cta:'Agendar uma visita', ctaShort:'Agendar visita'
  });

  S({
    id:'corretor-imoveis', cat:'imoveis', layout:'estate', theme:'noir', v:2,
    name:'Corretor de imóveis', brand:'Marcos Vieira Imóveis',
    kicker:'Corretor autônomo · Atendimento pessoal',
    head:'Um corretor, um atendimento do começo ao fim.',
    lede:'Consultoria personalizada para compra, venda e investimento imobiliário, com atendimento direto — sem intermediários.',
    hero:'u:1600585154340-be6161a56a0c',
    imgs:['u:1600596542815-ffad4c1539a9','u:1582719478250-c89cae4dc85b','u:1600566753086-00f18fb6b3ea'],
    nav:['Imóveis','Investir','Vender','Contato'],
    stats:[['14','anos de CRECI'],['+260','negócios fechados'],['1','corretor responsável']],
    groups:[
      ['Para morar','Seleção pessoal',[
        ['Casa Jardim dos Estados','4 quartos · 320m² · piscina','—','Destaque'],
        ['Apartamento Centro','2 quartos · 68m² · reformado','—'],
        ['Casa em condomínio fechado','3 suítes · 210m²','—']
      ]],
      ['Investimento','Foco em rentabilidade',[
        ['Sala comercial locada','48m² · contrato vigente','—'],
        ['Terreno 600m²','Zona de expansão urbana','—'],
        ['Studio para locação','32m² · mobiliado','—']
      ]],
      ['Serviços','Consultoria',[
        ['Avaliação de imóvel','Laudo comparativo de mercado','—'],
        ['Venda assistida','Fotos, anúncio e visitas','—'],
        ['Consultoria de investimento','Análise de retorno','—']
      ]]
    ],
    info:{ addr:'Atendimento presencial e online — CRECI-MS', hours:'Seg a Sáb · 8h às 19h', city:'Campo Grande, MS' },
    highlight:['Avaliação de mercado sem custo','Fotos e anúncio profissional inclusos','Atendimento direto com o corretor'],
    aboutText:'Marcos trabalha com um número limitado de clientes por mês para acompanhar cada negócio de perto. Do primeiro contato à assinatura, é ele quem responde.',
    quote:'“Negócio bom é o que faz sentido para as duas partes.”',
    tags:['Corretor','Imóveis','Investimento'],
    domain:'marcosvieiraimoveis.com.br', cta:'Falar com o corretor', ctaShort:'Conversar'
  });

  S({
    id:'construtora', cat:'imoveis', layout:'estate', theme:'steel', v:3,
    name:'Construtora', brand:'Construtora Meridiano',
    kicker:'Construtora · Obras residenciais e comerciais',
    head:'Obra entregue no prazo é o nosso padrão.',
    lede:'Construção residencial e comercial com engenharia própria, cronograma transparente e acabamento de alto padrão.',
    hero:'u:1504307651254-35680f356dfd',
    imgs:['u:1600596542815-ffad4c1539a9','u:1600585154340-be6161a56a0c','u:1600607687939-ce8a6c25118c'],
    nav:['Empreendimentos','Obras','Processo','Contato'],
    stats:[['22','anos de operação'],['38','obras entregues'],['100%','no prazo contratual']],
    groups:[
      ['Empreendimentos','Residencial',[
        ['Residencial Alto da Serra','48 unidades · 3 quartos · lazer completo','—','Em obras'],
        ['Villas do Parque','12 casas em condomínio fechado','—'],
        ['Edifício Meridiano','Salas comerciais de 40 a 120m²','—']
      ]],
      ['Obras','Sob medida',[
        ['Casa de alto padrão','Projeto e execução integrados','—'],
        ['Reforma estrutural','Reforço e ampliação','—'],
        ['Galpão comercial','Estrutura metálica','—']
      ]],
      ['Processo','Como trabalhamos',[
        ['Planejamento','Cronograma físico-financeiro detalhado','—'],
        ['Execução','Equipe própria e diário de obra','—'],
        ['Entrega','Vistoria técnica com laudo','—']
      ]]
    ],
    info:{ addr:'Av. Siqueira Campos, 1200 — Vila Nova', hours:'Seg a Sex · 8h às 18h', city:'Campo Grande, MS' },
    highlight:['Diário de obra digital para o cliente','Equipe técnica própria','Garantia de 5 anos em estrutura'],
    aboutText:'A Meridiano constrói com engenharia própria e cronograma aberto ao cliente. Cada etapa é documentada em um diário de obra digital, acessível a qualquer momento.',
    quote:'“Obra boa é a que entrega o que prometeu.”',
    tags:['Construtora','Engenharia','Alto padrão'],
    domain:'construtorameridiano.com.br', cta:'Falar com engenheiro', ctaShort:'Contatar'
  });

  S({
    id:'arquitetura', cat:'imoveis', layout:'estate', theme:'sand', v:1,
    name:'Arquitetura', brand:'Estúdio Prana',
    kicker:'Arquitetura e interiores',
    head:'Espaços que respiram com quem vive neles.',
    lede:'Projeto arquitetônico e interiores com foco em luz natural, uso inteligente do espaço e materiais honestos.',
    hero:'u:1600607687939-ce8a6c25118c',
    imgs:['u:1600566753086-00f18fb6b3ea','u:1582719478250-c89cae4dc85b','u:1555041469-a586c61ea9bc'],
    nav:['Projetos','Processo','Interiores','Contato'],
    stats:[['64','projetos entregues'],['11','anos de estúdio'],['+','publicações']],
    groups:[
      ['Residencial','Casas e apartamentos',[
        ['Casa Pátio','Reforma com pátio central e iluminação zenital','—','Destaque'],
        ['Apartamento 120m²','Integração de ambientes e marcenaria autoral','—'],
        ['Casa de campo','Implantação respeitando o terreno natural','—']
      ]],
      ['Comercial','Espaços de marca',[
        ['Cafeteria','Layout e identidade espacial','—'],
        ['Escritório','Ergonomia e acústica','—']
      ]],
      ['Processo','Do briefing à entrega',[
        ['Estudo preliminar','Análise do terreno e do programa','—'],
        ['Projeto executivo','Detalhamento técnico completo','—'],
        ['Acompanhamento de obra','Visitas técnicas periódicas','—']
      ]]
    ],
    info:{ addr:'Rua José Antônio Pereira, 890 — Jardim dos Estados', hours:'Seg a Sex · 9h às 18h', city:'Campo Grande, MS' },
    highlight:['Renderização 3D em todos os projetos','Marcenaria detalhada em prancha','Acompanhamento de obra incluso'],
    aboutText:'O Prana é um estúdio pequeno por escolha: poucos projetos por ano, todos acompanhados de perto. A arquitetura aqui começa pela luz e pela rotina de quem vai morar.',
    quote:'“Projeto bom não se explica. Se habita.”',
    tags:['Arquitetura','Interiores','Projetos'],
    domain:'estudioprana.com.br', cta:'Marcar uma conversa', ctaShort:'Contatar'
  });

  S({
    id:'engenharia', cat:'imoveis', layout:'estate', theme:'tech', v:2,
    name:'Engenharia', brand:'Vértice Engenharia',
    kicker:'Engenharia civil · Projetos e laudos',
    head:'Precisão técnica em cada prancha.',
    lede:'Projetos estruturais, laudos, regularização e gerenciamento de obras com responsabilidade técnica assinada.',
    hero:'l:site/atelier.jpg',
    imgs:['u:1504307651254-35680f356dfd','u:1497366216548-37526070297c','u:1600596542815-ffad4c1539a9'],
    nav:['Serviços','Projetos','Laudos','Contato'],
    stats:[['18','anos de CREA'],['420','projetos'],['48h','para retorno técnico']],
    groups:[
      ['Projetos','Cálculo e detalhamento',[
        ['Estrutural em concreto','Cálculo e pranchas executivas','—','Destaque'],
        ['Estrutura metálica','Dimensionamento e detalhamento','—'],
        ['Instalações','Elétrica e hidrossanitária','—']
      ]],
      ['Laudos','Documentação técnica',[
        ['Laudo de vistoria','Avaliação de patologias','—'],
        ['Regularização de imóvel','Averbação e habite-se','—'],
        ['Laudo de acessibilidade','Adequação à norma','—']
      ]],
      ['Gerenciamento','Acompanhamento',[
        ['Gestão de obra','Cronograma e medições','—'],
        ['Orçamento executivo','Levantamento de quantitativos','—']
      ]]
    ],
    info:{ addr:'Rua 15 de Novembro, 780 — Centro', hours:'Seg a Sex · 8h às 18h', city:'Campo Grande, MS' },
    highlight:['ART emitida em todos os serviços','Pranchas digitais e impressas','Visita técnica inicial sem custo'],
    aboutText:'A Vértice resolve o que a obra precisa: projeto bem calculado, documentação em ordem e acompanhamento técnico. Sem improviso, sem retrabalho.',
    quote:'“Obra bem projetada não tem surpresa.”',
    tags:['Engenharia','Laudos','Projetos'],
    domain:'verticeengenharia.com.br', cta:'Solicitar proposta', ctaShort:'Solicitar'
  });

  S({
    id:'materiais-construcao', cat:'imoveis', layout:'estate', theme:'clay', v:3,
    name:'Materiais de construção', brand:'Depósito Aliança',
    kicker:'Materiais de construção · Entrega na obra',
    head:'Do alicerce ao acabamento, sem faltar nada.',
    lede:'Estoque completo, orçamento rápido pelo WhatsApp e entrega programada direto no canteiro.',
    hero:'u:1504307651254-35680f356dfd|rect=180,0,1300,1000',
    imgs:['u:1600566753086-00f18fb6b3ea','u:1600607687939-ce8a6c25118c','u:1600585154340-be6161a56a0c'],
    nav:['Materiais','Acabamentos','Entrega','Orçamento'],
    stats:[['6mil','itens em estoque'],['24h','entrega na obra'],['3','lojas']],
    groups:[
      ['Estrutura','Base da obra',[
        ['Cimento CP II','Saco 50kg · palete fechado','—','Oferta'],
        ['Bloco de concreto','Unidade · 14x19x39','—'],
        ['Areia e brita','Metro cúbico com entrega','—'],
        ['Aço CA-50','Barra 12m · diversas bitolas','—']
      ]],
      ['Acabamento','Para finalizar bem',[
        ['Porcelanato 80x80','Caixa 2,56m²','—'],
        ['Argamassa AC-III','Saco 20kg','—'],
        ['Tinta acrílica 18L','Premium fosca','—']
      ]],
      ['Hidráulica e elétrica','Instalações',[
        ['Tubos e conexões','Linha completa em PVC','—'],
        ['Fios e cabos','Rolos de 100m','—'],
        ['Caixa d\'água 1000L','Com tampa e boia','—']
      ]],
      ['Serviços','Apoio à obra',[
        ['Orçamento por lista','Envie e receba em até 2 horas','—'],
        ['Entrega na obra','Agendada com o mestre','—'],
        ['Locação de betoneira','Diária e semanal','—']
      ]]
    ],
    info:{ addr:'Av. dos Imigrantes, 2300 — Nova Lima', hours:'Seg a Sáb · 7h às 18h', city:'Campo Grande, MS' },
    highlight:['Orçamento por lista no WhatsApp','Entrega com frota própria','Desconto para volume'],
    aboutText:'O Aliança é o depósito de quem está construindo: estoque largo, atendimento direto e entrega que cumpre o combinado. Três lojas para atender a cidade inteira.',
    quote:'“Obra não para por falta de material.”',
    tags:['Construção','Materiais','Entrega'],
    domain:'depositoalianca.com.br', cta:'Pedir orçamento', ctaShort:'Orçar'
  });

  S({
    id:'moveis-planejados', cat:'imoveis', layout:'estate', theme:'sage', v:1,
    name:'Loja de móveis planejados', brand:'Espaço Forma',
    kicker:'Móveis planejados · Projeto 3D',
    head:'Cada centímetro do seu espaço, bem resolvido.',
    lede:'Projeto personalizado com render 3D, materiais selecionados e montagem por equipe própria.',
    hero:'u:1582719478250-c89cae4dc85b',
    imgs:['u:1555041469-a586c61ea9bc','u:1600566753086-00f18fb6b3ea','u:1600607687939-ce8a6c25118c'],
    nav:['Projetos','Ambientes','Materiais','Orçamento'],
    stats:[['+900','projetos entregues'],['12','anos de marcenaria'],['30','dias úteis']],
    groups:[
      ['Ambientes','Projeto completo',[
        ['Cozinha planejada','Layout funcional com torre e ilha','—','Destaque'],
        ['Quarto completo','Guarda-roupa, cabeceira e escrivaninha','—'],
        ['Sala integrada','Painel, rack e estante sob medida','—'],
        ['Closet','Organização com gavetas e maleiros','—']
      ]],
      ['Materiais','Acabamentos',[
        ['MDF premium','Padrões amadeirados e lisos','—'],
        ['Portas e gavetas','Corrediças e dobradiças com amortecimento','—'],
        ['Iluminação em LED','Perfis embutidos sob medida','—']
      ]],
      ['Serviços','Do projeto à montagem',[
        ['Projeto 3D','Visualização realista do ambiente','—'],
        ['Medição no local','Conferência de paredes e pontos','—'],
        ['Montagem própria','Equipe treinada e obra limpa','—']
      ]]
    ],
    info:{ addr:'Rua Eduardo Santos Pereira, 640 — Chácara Cachoeira', hours:'Seg a Sex · 9h às 18h · Sáb até 13h', city:'Campo Grande, MS' },
    highlight:['Render 3D antes de fechar','Prazo de 30 dias úteis','Garantia de 5 anos na ferragem'],
    aboutText:'O Espaço Forma projeta ambientes que funcionam no dia a dia: cada gaveta é posicionada depois de entender a rotina de quem vai usar. O render 3D é parte do projeto, não vitrine.',
    quote:'“Móvel planejado bom é o que resolve a rotina.”',
    tags:['Planejados','Interiores','Projeto 3D'],
    domain:'espacoforma.com.br', cta:'Solicitar projeto', ctaShort:'Projetar'
  });
})();
