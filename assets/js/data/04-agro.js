/* ============================================================
   CATEGORIA 04 — AGRONEGÓCIO
   ============================================================ */
(function () {
  'use strict';

  S({
    id:'agropecuaria', cat:'agro', layout:'agro', theme:'forest', v:1,
    name:'Agropecuária', brand:'Campo Forte Agro',
    kicker:'Agropecuária · Insumos e atendimento técnico',
    head:'Solução completa para quem produz.',
    lede:'Sementes, defensivos, fertilizantes e ferragens com orientação agronômica e entrega programada na fazenda.',
    hero:'u:1500382017468-9049fed747ef',
    imgs:['u:1696441567908-6a04d49e1350','u:1589923188651-268a9765e432','u:1416879595882-3373a0480b5b'],
    nav:['Categorias','Insumos','Assistência','Cotação'],
    stats:[['18','anos no agro'],['7','agrônomos'],['48h','entrega regional']],
    groups:[
      ['Defensivos','Linha completa',[
        ['Herbicidas','Glyphosate, 2,4-D e seletivos para soja e milho','—','Cotação'],
        ['Fungicidas','Triazóis, estrobilurinas e carboxamidas','—'],
        ['Inseticidas','Controle de lagartas, percevejos e mosca-branca','—']
      ]],
      ['Fertilizantes','Nutrição de solo',[
        ['Fórmulas NPK','04-14-08, 05-25-15, 20-05-20 e customizadas','—'],
        ['Micronutrientes','Boro, zinco, manganês e molibdênio','—'],
        ['Corretivos','Calcário dolomítico e gesso agrícola','—']
      ]],
      ['Sementes','Cultivares de alta performance',[
        ['Soja','Ciclos precoces e médios, tolerância a nematoides','—'],
        ['Milho','Híbridos de alta produtividade e estabilidade','—'],
        ['Pastagem','Brachiaria e Panicum para integração','—']
      ]],
      ['Máquinas e peças','Para não parar',[
        ['Tratores','Linha 75 a 250 cv com assistência autorizada','—'],
        ['Pulverizadores','Montagem, revisão e componentes','—'],
        ['Peças de reposição','Estoque para as principais marcas','—']
      ]]
    ],
    info:{ addr:'Av. Agropecuária, 1200 — Distrito Industrial', hours:'Seg a Sex · 7h30 às 18h · Sáb até 12h', city:'Campo Grande, MS' },
    highlight:['Assistência agronômica em campo','Entrega programada na propriedade','Laboratório de análise de solo parceiro'],
    aboutText:'A Campo Forte nasceu dentro da fazenda, com o produtor. Hoje atende propriedades de toda a região com equipe técnica própria, estoque de insumos e entrega agendada por safra.',
    quote:'“Cada safra tem um plano. E o plano começa no solo.”',
    tags:['Agropecuária','Insumos','Assistência técnica'],
    domain:'campoforteagro.com.br', cta:'Solicitar cotação', ctaShort:'Cotar'
  });

  S({
    id:'defensivos-agricolas', cat:'agro', layout:'agro', theme:'tech', v:2,
    name:'Loja de defensivos agrícolas', brand:'Defesa Verde',
    kicker:'Defensivos · Receituário e orientação',
    head:'Proteção de lavoura com responsabilidade técnica.',
    lede:'Produtos registrados, estoque certificado e orientação de aplicação com receituário agronômico.',
    hero:'u:1416879595882-3373a0480b5b',
    imgs:['u:1416879595882-3373a0480b5b','u:1625246333195-78d9c38ad449','u:1500382017468-9049fed747ef'],
    nav:['Linhas','Bulas','Aplicação','Receituário'],
    stats:[['100%','produtos registrados'],['+40','moléculas'],['24h','suporte técnico']],
    groups:[
      ['Herbicidas','Manejo de plantas daninhas',[
        ['Pós-emergentes','Controle de folhas largas e gramíneas','—'],
        ['Pré-emergentes','Residual para o plantio','—'],
        ['Dessecantes','Manejo para plantio direto','—']
      ]],
      ['Inseticidas','Manejo integrado de pragas',[
        ['Lagartas','Ação por contato e ingestão','—'],
        ['Percevejos','Alta performance em soja','—'],
        ['Mosca-branca','Associação de modos de ação','—']
      ]],
      ['Fungicidas','Controle de doenças',[
        ['Ferrugem','Proteção para soja de alta produtividade','—'],
        ['Mancha-alvo','Programa de aplicação escalonada','—'],
        ['Oídio','Indicado para milho e hortaliças','—']
      ]],
      ['Serviços','Do técnico ao equipamento',[
        ['Receituário agronômico','Emissão com engenheiro responsável','—'],
        ['Calibração de pulverizador','Ajuste de pontas e vazão','—'],
        ['Descartáveis e EPI','Luvas, máscaras e bases','—']
      ]]
    ],
    info:{ addr:'Rodovia MS-040, km 12 — Zona Rural', hours:'Seg a Sex · 7h às 17h', city:'Campo Grande, MS' },
    highlight:['Engenheiro agrônomo na loja','Destino correto de embalagens vazias','Farmácia de defensivos com assinatura'],
    aboutText:'A Defesa Verde trabalha somente com produtos registrados e orientação técnica. Cada venda gera receituário e acompanhamento do manejo, do início ao fim do ciclo.',
    quote:'“Produto certo, dose certa, na hora certa.”',
    tags:['Defensivos','Técnico','Lavoura'],
    domain:'defesaverde.com.br', cta:'Falar com o agrônomo', ctaShort:'Cotar'
  });

  S({
    id:'fertilizantes', cat:'agro', layout:'agro', theme:'forest', v:3,
    name:'Loja de fertilizantes', brand:'NutriSolo',
    kicker:'Fertilizantes e nutrição vegetal',
    head:'A planta certa começa no solo certo.',
    lede:'Fórmulas sobre medida, análise de solo e recomendações técnicas para cada talhão.',
    hero:'u:1625246333195-78d9c38ad449',
    imgs:['u:1500382017468-9049fed747ef','u:1625246333195-78d9c38ad449','u:1571509107684-7e3034a90012'],
    nav:['Fórmulas','Análise','Margens','Cotação'],
    stats:[['42','fórmulas disponíveis'],['5 dias','para análise de solo'],['100%','origem rastreada']],
    groups:[
      ['Fórmulas','Grânulos e prontas',[
        ['NPK 04-14-08','Plantio de soja e milho','—'],
        ['NPK 20-05-20','Cobertura para alta produtividade','—'],
        ['Fórmula customizada','Mistura sob medida por talhão','—']
      ]],
      ['Micronutrientes','Foliar e solo',[
        ['Boro','Correção de deficiência em florescimento','—'],
        ['Zinco','Aplicação foliar em milho','—'],
        ['Mistura de micronutrientes','Programa completo','—']
      ]],
      ['Corretivos','Base do manejo químico',[
        ['Calcário dolomítico','Poder neutralizante alto','—'],
        ['Gesso agrícola','Melhoria do perfil do solo','—']
      ]],
      ['Serviços','Apoio técnico',[
        ['Análise de solo','Amostragem e laudo por talhão','—'],
        ['Recomendação de adubação','Laudo com engenheiro agrônomo','—'],
        ['Aplicação a lanço','Com distribuidor próprio','—']
      ]]
    ],
    info:{ addr:'Av. das Nações, 880 — Distrito Norte', hours:'Seg a Sex · 7h às 17h', city:'Campo Grande, MS' },
    highlight:['Mistura por talhão com controle de qualidade','Análise de solo em laboratório parceiro','Caminhões próprios para entrega'],
    aboutText:'A NutriSolo acredita em fertilidade construída: primeiro a análise, depois a fórmula. É esse cuidado que faz o produtor gastar menos e colher mais.',
    quote:'“Solo bem nutrido não precisa de milagre.”',
    tags:['Fertilizantes','Nutrição','Solo'],
    domain:'nutrisolo.com.br', cta:'Solicitar recomendação', ctaShort:'Cotar'
  });

  S({
    id:'maquinas-agricolas', cat:'agro', layout:'agro', theme:'steel', v:1,
    name:'Revenda de máquinas agrícolas', brand:'AgroMáquinas Central',
    kicker:'Máquinas agrícolas · Venda e assistência',
    head:'Máquina boa é a que não para na safra.',
    lede:'Tratores, colheitadeiras e implementos com assistência autorizada e estoque de peças para pronta entrega.',
    hero:'u:1571509107684-7e3034a90012',
    imgs:['u:1696441567908-6a04d49e1350','u:1685335686020-e0b487f7f426','u:1718470684824-3c53a74523bc'],
    nav:['Máquinas','Implementos','Peças','Assistência'],
    stats:[['24','modelos em linha'],['8','mecânicos'],['24h','atendimento em campo']],
    groups:[
      ['Tratores','De 75 a 250 cv',[
        ['Trator 75 cv','Cabinado, ideal para fruticultura','—','Estoque'],
        ['Trator 130 cv','Transmissão powershift','—'],
        ['Trator 250 cv','Alta performance para grandes áreas','—']
      ]],
      ['Colheitadeiras','Eficiência em grãos',[
        ['Plataforma 30 pés','Para soja e milho','—'],
        ['Colheitadeira de grãos','Classe 6 com monitoramento','—']
      ]],
      ['Implementos','Da preparação à colheita',[
        ['Pulverizador autopropelido','Barra de 36 metros','—'],
        ['Grade aradora','Preparo de solo em larga escala','—'],
        ['Plantadeira','Plantio com taxa variável','—']
      ]],
      ['Assistência','Para não parar',[
        ['Revisão programada','Pacotes para entressafra','—'],
        ['Peças originais','Estoque de giro rápido','—'],
        ['Mecânico em campo','Deslocamento em até 24 horas','—']
      ]]
    ],
    info:{ addr:'BR-163, km 8 — Saída Norte', hours:'Seg a Sex · 7h às 18h · Sáb até 12h', city:'Campo Grande, MS' },
    highlight:['Demonstração na propriedade','Financiamento por bancos parceiros','Assistência 24 horas em campo'],
    aboutText:'A AgroMáquinas Central vende máquina e acompanha o pós-venda. Oficina própria, estoque de peças e equipe de campo para atender antes que a safra sofra.',
    quote:'“Safra não espera peça chegar.”',
    tags:['Máquinas','Tratores','Assistência'],
    domain:'agromaquinascentral.com.br', cta:'Falar com especialista', ctaShort:'Consultar'
  });

  S({
    id:'catalogo-sementes', cat:'agro', layout:'agro', theme:'sage', v:2,
    name:'Catálogo de sementes', brand:'Sementes Cerrado',
    kicker:'Sementes · Cultivares certificadas',
    head:'Cada talhão pede a cultivar certa.',
    lede:'Catálogo técnico com ciclo, altura de planta, resistência e produtividade média por região.',
    hero:'u:1696441567908-6a04d49e1350',
    imgs:['u:1500382017468-9049fed747ef','u:1416879595882-3373a0480b5b','u:1696441567908-6a04d49e1350'],
    nav:['Cultivares','Soja','Milho','Reserva'],
    stats:[['32','cultivares'],['100%','certificadas'],['índice','técnico completo']],
    groups:[
      ['Soja','Ciclos e resistências',[
        ['Cultivar Precoce','Ciclo 105 dias · resistência a nematoides','—','Alta procura'],
        ['Cultivar Média','120 dias · ampla adaptação regional','—'],
        ['Cultivar IPRO','Tolerância a herbicidas e alto teto produtivo','—']
      ]],
      ['Milho','Híbridos de verão e safrinha',[
        ['Híbrido Verão','Alto potencial e grão pesado','—'],
        ['Híbrido Safrinha','Estabilidade em baixa altitude','—'],
        ['Milho Silagem','Alta digestibilidade','—']
      ]],
      ['Pastagem','Integração lavoura-pecuária',[
        ['Brachiaria Brizantha','Formação rápida e boa cobertura','—'],
        ['Panicum Maximum','Alta produtividade forrageira','—']
      ]],
      ['Serviços','Suporte à escolha',[
        ['Ensaio regional','Dados de produtividade por município','—'],
        ['Reserva de lote','Programa antecipado por safra','—'],
        ['Tratamento de sementes','Industrialização sob demanda','—']
      ]]
    ],
    info:{ addr:'Rua da Produção, 300 — Distrito Agroindustrial', hours:'Seg a Sex · 8h às 18h', city:'Campo Grande, MS' },
    highlight:['Ensaios regionais de produtividade','Reserva antecipada de lotes','Laudo de germinação por lote'],
    aboutText:'A Sementes Cerrado investe em ensaios regionais para indicar a cultivar certa para cada tipo de solo e altitude. O catálogo técnico está disponível completo na plataforma.',
    quote:'“Semente é o primeiro investimento da safra.”',
    tags:['Sementes','Cultivares','Agro'],
    domain:'sementescerrado.com.br', cta:'Consultar cultivares', ctaShort:'Consultar'
  });

  S({
    id:'pecas-agricolas', cat:'agro', layout:'agro', theme:'brutal', v:3,
    name:'Comércio de peças agrícolas', brand:'Peças & Campo',
    kicker:'Peças agrícolas · Pronta entrega',
    head:'A peça certa, na hora em que a máquina parou.',
    lede:'Estoque de reposição para tratores e implementos, com busca por código e envio para todo o estado.',
    hero:'u:1685335686020-e0b487f7f426',
    imgs:['u:1571509107684-7e3034a90012','u:1718470684824-3c53a74523bc','u:1696441567908-6a04d49e1350'],
    nav:['Peças','Códigos','Estoque','Envio'],
    stats:[['14mil','peças em estoque'],['2h','para despacho'],['100%','originais e paralelas']],
    groups:[
      ['Motor','Peças de reposição',[
        ['Filtros','Óleo, combustível e ar','—','Pronta entrega'],
        ['Turbinas','Compatíveis com as principais marcas','—'],
        ['Kits de vedação','Motor completo','—']
      ]],
      ['Transmissão','Força para o trabalho',[
        ['Discos de embreagem','Tratores 75 a 250 cv','—'],
        ['Engrenagens','Sob consulta por código','—'],
        ['Rolamentos','Linha completa','—']
      ]],
      ['Hidráulica','Comando e pressão',[
        ['Bombas hidráulicas','Reparo e troca','—'],
        ['Mangueiras e conexões','Montagem na hora','—'],
        ['Cilindros','Vedação e hastes','—']
      ]],
      ['Colheita','Para a safra não parar',[
        ['Facas e dedos','Plataforma de soja','—'],
        ['Correias','Medidas por fabricante','—'],
        ['Rolos','Reposição original','—']
      ]]
    ],
    info:{ addr:'Av. Industrial, 1450 — Distrito Industrial', hours:'Seg a Sex · 7h30 às 18h', city:'Campo Grande, MS' },
    highlight:['Busca de peça por código no WhatsApp','Despacho em até 2 horas','Envio para todo o Mato Grosso do Sul'],
    aboutText:'A Peças & Campo existe para reduzir o tempo de máquina parada. Estoques de giro rápido, atendimento por código e logística própria para todo o estado.',
    quote:'“Hora de máquina parada é hora de prejuízo.”',
    tags:['Peças','Reposição','Agro'],
    domain:'pecasecampo.com.br', cta:'Buscar minha peça', ctaShort:'Buscar peça'
  });

  S({
    id:'fazenda', cat:'agro', layout:'agro', theme:'royal', v:1,
    name:'Fazenda e apresentação institucional', brand:'Fazenda Santa Clara',
    kicker:'Fazenda · 4.200 hectares em produção',
    head:'Quatro gerações produzindo o que o país come.',
    lede:'Soja, milho e pecuária integrada com manejo conservacionista, rastreabilidade e portas abertas para visitas técnicas.',
    hero:'u:1683552515328-5a8d58755e9c',
    imgs:['u:1696441567908-6a04d49e1350','u:1416879595882-3373a0480b5b','u:1683552515328-5a8d58755e9c'],
    nav:['A fazenda','Produção','Sustentabilidade','Visitas'],
    stats:[['4.200','hectares produtivos'],['1918','início da história'],['100%','plantio direto']],
    groups:[
      ['Produção','Safra atual',[
        ['Soja','2.600 hectares · ciclo médio','—'],
        ['Milho safrinha','1.400 hectares · alta produtividade','—'],
        ['Pecuária','Integração lavoura-pecuária','—']
      ]],
      ['Manejo','Práticas adotadas',[
        ['Plantio direto','Palhada preservada e rotação de culturas','—'],
        ['Análise de solo','Amostragem por talhão a cada safra','—'],
        ['Controle biológico','Redução de defensivos químicos','—']
      ]],
      ['Estrutura','Eficiência de operação',[
        ['Armazenagem','9.000 toneladas em silos próprios','—'],
        ['Oficina','Manutenção preventiva da frota','—'],
        ['Secador','Secagem e classificação de grãos','—']
      ]],
      ['Visitas','Portas abertas',[
        ['Visita técnica','Agendamento com acompanhamento agronômico','—'],
        ['Dia de campo','Evento anual para produtores da região','—']
      ]]
    ],
    info:{ addr:'Rodovia MS-040, km 62 — Zona Rural', hours:'Visitas com agendamento', city:'Campo Grande, MS' },
    highlight:['Rastreabilidade completa da safra','Reserva legal preservada','Visitas técnicas agendadas'],
    aboutText:'A Santa Clara começou com 120 hectares e uma família teimosa. Hoje são 4.200 hectares com a mesma ideia de fundo: cuidar do solo é a única forma de continuar produzindo daqui a cem anos.',
    quote:'“O que a gente planta hoje, a próxima geração colhe.”',
    tags:['Fazenda','Institucional','Sustentabilidade'],
    domain:'fazendasantaclara.com.br', cta:'Agendar uma visita', ctaShort:'Agendar'
  });

  S({
    id:'consultoria-rural', cat:'agro', layout:'agro', theme:'sage', v:2,
    name:'Empresa de consultoria rural', brand:'AgroPlan Consultoria',
    kicker:'Consultoria rural · Gestão e produtividade',
    head:'Decisão técnica, resultado medido.',
    lede:'Diagnóstico de propriedade, planejamento de safra e acompanhamento de indicadores para produzir com margem previsível.',
    hero:'u:1718470684824-3c53a74523bc',
    imgs:['u:1500382017468-9049fed747ef','u:1571509107684-7e3034a90012','u:1718470667206-7f8618a1be50'],
    nav:['Serviços','Método','Resultados','Contato'],
    stats:[['12','anos de atuação'],['+180','propriedades'],['6','agrônomos']],
    groups:[
      ['Consultoria','Do solo ao caixa',[
        ['Diagnóstico de propriedade','Avaliação de solo, operação e gestão','—','Mais procurado'],
        ['Planejamento de safra','Orçamento e cronograma por talhão','—'],
        ['Gestão de custos','Indicadores de margem por cultura','—']
      ]],
      ['Agronomia','Acompanhamento em campo',[
        ['Monitoramento de lavoura','Visitas técnicas quinzenais','—'],
        ['Manejo de pragas','Monitoramento e recomendação','—'],
        ['Fertilidade do solo','Amostragem e plano de correção','—']
      ]],
      ['Gestão','Estrutura e pessoas',[
        ['Treinamento de equipe','Operação e segurança','—'],
        ['Auditoria de processos','Eficiência de máquinas e insumos','—']
      ]],
      ['Resultados','Cases',[
        ['Soja em área arenosa','Ganho de produtividade em 2 safras','—'],
        ['Pecuária intensiva','Aumento de taxa de desfrute','—']
      ]]
    ],
    info:{ addr:'Rua Treze de Maio, 410 — Centro', hours:'Seg a Sex · 8h às 18h', city:'Campo Grande, MS' },
    highlight:['Relatórios mensais de indicadores','Plataforma de acompanhamento','Equipe multidisciplinar'],
    aboutText:'A AgroPlan combina agronomia e gestão. O produtor recebe diagnóstico, plano de ação e indicadores mensais — para decidir com base em número, não em achismo.',
    quote:'“Produtividade sem margem é só volume.”',
    tags:['Consultoria','Gestão rural','Agro'],
    domain:'agroplan.com.br', cta:'Falar com consultor', ctaShort:'Contatar'
  });
})();
