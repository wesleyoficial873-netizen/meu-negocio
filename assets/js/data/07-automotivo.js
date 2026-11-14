/* ============================================================
   CATEGORIA 07 — AUTOMOTIVO
   ============================================================ */
(function () {
  'use strict';

  S({
    id:'revenda-veiculos', cat:'automotivo', layout:'auto', theme:'steel', v:1,
    name:'Revenda de veículos', brand:'Autoponto Veículos',
    kicker:'Revenda · Seminovos com garantia',
    head:'Seminovo bom tem histórico e procedência.',
    lede:'Estoque selecionado, laudo cautelar em todos os veículos e troca avaliada na hora.',
    hero:'u:1487754180451-85fa2a8a68d5|rect=0,0,1400,900',
    imgs:['u:1487754180451-85fa2a8a68d5','u:1486262715619-67b85e0b08d3','u:1560806887-1e4cd0b6cbd6'],
    nav:['Estoque','Financiamento','Troca','Contato'],
    stats:[['86','veículos em estoque'],['100%','com laudo cautelar'],['3','meses de garantia']],
    groups:[
      ['SUV e picapes','Estoque em destaque',[
        ['SUV 2022 · 4x4','Automático · 42.000 km · completo','—','Destaque'],
        ['Picape 2021 · Diesel','4x4 · 78.000 km · cabine dupla','—'],
        ['SUV Compacto 2023','Automático · 18.000 km · garantia de fábrica','—']
      ]],
      ['Sedãs','Conforto e economia',[
        ['Sedã 2020 · 2.0','Automático · 61.000 km · único dono','—'],
        ['Sedã 2019 · 1.4','Manual · 74.000 km','—']
      ]],
      ['Hatch','Para a cidade',[
        ['Hatch 2022 · 1.0 Turbo','Automático · 33.000 km','—'],
        ['Hatch 2019 · 1.0','Manual · 89.000 km','—']
      ]],
      ['Serviços','Diferenciais da loja',[
        ['Laudo cautelar','Em todos os veículos do estoque','—'],
        ['Troca avaliada','Avaliação em até 30 minutos','—'],
        ['Financiamento','Simulação com bancos parceiros','—']
      ]]
    ],
    info:{ addr:'Av. do Aeroporto, 1800 — Vila Base Aérea', hours:'Seg a Sáb · 8h às 18h', city:'Campo Grande, MS' },
    highlight:['Laudo cautelar incluso','Garantia de 3 meses','Aceita troca com avaliação na hora'],
    aboutText:'A Autoponto vende o que compraria. Cada veículo passa por inspeção de 120 itens e tem o laudo cautelar disponível para consulta antes da visita.',
    quote:'“Confiança não se promete. Se comprova.”',
    tags:['Seminovos','Veículos','Troca'],
    domain:'autoponto.com.br', cta:'Consultar veículo', ctaShort:'Consultar'
  });

  S({
    id:'concessionaria', cat:'automotivo', layout:'auto', theme:'noir', v:2,
    name:'Concessionária', brand:'Nova Rota Motors',
    kicker:'Concessionária · Veículos novos',
    head:'O carro novo, do jeito que você imaginou.',
    lede:'Linha completa zero quilômetro, test drive agendado e entrega com revisão programada.',
    hero:'u:1492144534655-ae79c964c9d7',
    imgs:['u:1492144534655-ae79c964c9d7','u:1487754180451-85fa2a8a68d5','u:1560806887-1e4cd0b6cbd6'],
    nav:['Modelos','Test drive','Serviços','Contato'],
    stats:[['14','modelos na linha'],['0 km','todos os veículos'],['24h','para retirada']],
    groups:[
      ['Linha 2026','Lançamentos',[
        ['SUV Médio','Motor turbo · câmbio automático 8 marchas','—','Lançamento'],
        ['Sedã Executivo','Teto panorâmico e pacote de assistência','—'],
        ['Hatch Esportivo','Versão topo com bancos esportivos','—']
      ]],
      ['Comerciais','Para trabalho',[
        ['Furgão de carga','Volume de 6m³','—'],
        ['Picape de trabalho','Cabine simples · diesel','—']
      ]],
      ['Serviços','Pós-venda',[
        ['Test drive agendado','No showroom ou em casa','—'],
        ['Revisão programada','Com técnicos certificados','—'],
        ['Seminovos na troca','Avaliação imediata','—']
      ]]
    ],
    info:{ addr:'Av. Costa e Silva, 2400 — Nova Lima', hours:'Seg a Sáb · 8h30 às 19h', city:'Campo Grande, MS' },
    highlight:['Test drive sem compromisso','Showroom com entrega dedicada','Revisões com peças originais'],
    aboutText:'A Nova Rota é mais do que uma concessionária: é um ponto de encontro para quem gosta de carro. O atendimento continua depois da entrega, na revisão e no pós-venda.',
    quote:'“O melhor carro é o que combina com a sua rotina.”',
    tags:['Concessionária','0 km','Test drive'],
    domain:'novarota.com.br', cta:'Agendar test drive', ctaShort:'Agendar'
  });

  S({
    id:'oficina-mecanica', cat:'automotivo', layout:'auto', theme:'brutal', v:3,
    name:'Oficina mecânica', brand:'Garagem 42',
    kicker:'Oficina mecânica · Diagnóstico preciso',
    head:'Diagnóstico antes do orçamento. Sempre.',
    lede:'Mecânica geral, injeção eletrônica e revisão preventiva com laudo fotográfico e peças com garantia.',
    hero:'u:1486262715619-67b85e0b08d3',
    imgs:['u:1487754180451-85fa2a8a68d5','u:1492144534655-ae79c964c9d7','u:1560806887-1e4cd0b6cbd6'],
    nav:['Serviços','Diagnóstico','Preços','Agenda'],
    stats:[['18','anos de garagem'],['6','mecânicos'],['90','dias de garantia']],
    groups:[
      ['Mecânica','Serviços principais',[
        ['Revisão preventiva','Checklist de 32 itens com laudo','—','Mais pedido'],
        ['Troca de correia dentada','Com kit completo e garantia','—'],
        ['Suspensão','Diagnóstico e troca de componentes','—'],
        ['Freios','Pastilhas, discos e sangria','—']
      ]],
      ['Eletrônica','Diagnóstico computadorizado',[
        ['Injeção eletrônica','Scanner e análise de sensores','—'],
        ['Ar-condicionado','Recarga e higienização','—'],
        ['Alinhamento e balanceamento','Com equipamento digital','—']
      ]],
      ['Serviços','Conveniência',[
        ['Leva e traz','Na região central','—'],
        ['Carro reserva','Para serviços longos','—'],
        ['Laudo fotográfico','Enviado no WhatsApp','—']
      ]]
    ],
    info:{ addr:'Rua Marechal Rondon, 990 — Centro', hours:'Seg a Sex · 7h30 às 18h · Sáb até 12h', city:'Campo Grande, MS' },
    highlight:['Orçamento com laudo fotográfico','Peças com garantia de 90 dias','Aprovação de serviço pelo WhatsApp'],
    aboutText:'A Garagem 42 trabalha com transparência: primeiro o diagnóstico, depois o orçamento com fotos e vídeos do que realmente precisa ser feito. Sem surpresa na entrega.',
    quote:'“Serviço bem explicado não volta.”',
    tags:['Oficina','Mecânica','Diagnóstico'],
    domain:'garagem42.com.br', cta:'Agendar serviço', ctaShort:'Agendar'
  });

  S({
    id:'autopecas', cat:'automotivo', layout:'auto', theme:'tech', v:1,
    name:'Autopeças', brand:'Peça Certa',
    kicker:'Autopeças · Busca por modelo',
    head:'A peça certa, pelo modelo do seu carro.',
    lede:'Filtros, freios, suspensão e acessórios com busca por marca, modelo e ano. Envio para todo o estado.',
    hero:'u:1560806887-1e4cd0b6cbd6',
    imgs:['u:1560806887-1e4cd0b6cbd6','u:1486262715619-67b85e0b08d3','u:1492144534655-ae79c964c9d7'],
    nav:['Peças','Buscar','Marcas','Entrega'],
    stats:[['20mil','peças cadastradas'],['2h','para despacho'],['12','marcas']],
    groups:[
      ['Filtros','Manutenção básica',[
        ['Filtro de óleo','Diversos modelos','—','Pronta entrega'],
        ['Filtro de ar','Original e linha leve','—'],
        ['Filtro de combustível','Compatibilidade por ano','—']
      ]],
      ['Freios','Segurança',[
        ['Pastilhas','Cerâmicas e convencionais','—'],
        ['Discos','Par dianteiro ou traseiro','—'],
        ['Fluido de freio','DOT 4 · 500ml','—']
      ]],
      ['Suspensão','Conforto e estabilidade',[
        ['Amortecedores','Par dianteiro','—'],
        ['Buchas e coxins','Kit completo','—'],
        ['Pivôs e terminais','Por modelo','—']
      ]],
      ['Acessórios','Para o carro',[
        ['Tapetes','Borracha moldada','—'],
        ['Central multimídia','Com espelhamento','—'],
        ['Capas de banco','Couro sintético','—']
      ]]
    ],
    info:{ addr:'Av. Bandeirantes, 3010 — Moreninha', hours:'Seg a Sex · 8h às 18h · Sáb até 13h', city:'Campo Grande, MS' },
    highlight:['Busca por placa ou modelo','Peças originais e linha leve','Envio para todo o MS'],
    aboutText:'A Peça Certa resolve o que mais trava a manutenção: encontrar a peça exata. O sistema cruza marca, modelo, ano e motor para não errar na hora da compra.',
    quote:'“Peça errada é serviço dobrado.”',
    tags:['Autopeças','Reposição','Entrega'],
    domain:'pecacerta.com.br', cta:'Buscar minha peça', ctaShort:'Buscar'
  });

  S({
    id:'estetica-automotiva', cat:'automotivo', layout:'auto', theme:'plum', v:2,
    name:'Estética automotiva', brand:'Vitrine Detail',
    kicker:'Estética automotiva · Cuidado técnico',
    head:'Seu carro tratado como peça de coleção.',
    lede:'Polimento técnico, vitrificação e higienização interna com produtos profissionais e registro fotográfico.',
    hero:'u:1487754180451-85fa2a8a68d5',
    imgs:['u:1492144534655-ae79c964c9d7','u:1486262715619-67b85e0b08d3','u:1560806887-1e4cd0b6cbd6'],
    nav:['Serviços','Antes e depois','Kits','Agenda'],
    stats:[['+2400','carros atendidos'],['3','dias de vitrificação'],['1','ano de garantia']],
    groups:[
      ['Exterior','Pintura e proteção',[
        ['Polimento técnico','Correção de riscos e hologramas','—','Destaque'],
        ['Vitrificação','Proteção cerâmica com garantia','—'],
        ['Cristalização de vidros','Repelência de água','—']
      ]],
      ['Interior','Limpeza profunda',[
        ['Higienização interna','Bancos, teto e tapetes','—'],
        ['Hidratação de couro','Produtos específicos','—'],
        ['Limpeza de ar-condicionado','Ozônio e troca de filtro','—']
      ]],
      ['Kits','Combinações',[
        ['Kit Essencial','Lavagem detalhada e cera','—'],
        ['Kit Completo','Polimento e higienização interna','—'],
        ['Kit Blindado','Vitrificação e proteção de pintura','—']
      ]]
    ],
    info:{ addr:'Rua da Paz, 1200 — Jardim Itália', hours:'Seg a Sáb · 8h às 18h', city:'Campo Grande, MS' },
    highlight:['Registro fotográfico antes e depois','Produtos de linha profissional','Box climatizado'],
    aboutText:'A Vitrine Detail trata cada carro como um projeto: medição de pintura, correção em etapas e proteção adequada ao uso do veículo. O resultado aparece na luz do sol.',
    quote:'“Cuidado técnico se vê no reflexo.”',
    tags:['Estética automotiva','Polimento','Detailing'],
    domain:'vitrinedetail.com.br', cta:'Agendar avaliação', ctaShort:'Agendar'
  });

  S({
    id:'lava-jato', cat:'automotivo', layout:'auto', theme:'ocean', v:3,
    name:'Lava-jato', brand:'Lava Rápido Cristal',
    kicker:'Lava-jato · Lavagem ecológica',
    head:'Lavagem caprichada em 25 minutos.',
    lede:'Lavagem externa, interna e cera com uso consciente de água e equipe treinada para não riscar.',
    hero:'u:1487754180451-85fa2a8a68d5|rect=260,0,1300,900',
    imgs:['u:1492144534655-ae79c964c9d7','u:1487754180451-85fa2a8a68d5','u:1486262715619-67b85e0b08d3'],
    nav:['Serviços','Planos','Estrutura','Agenda'],
    stats:[['25min','lavagem completa'],['70%','menos água'],['6','boxes']],
    groups:[
      ['Lavagem','Serviços rápidos',[
        ['Lavagem externa','Espuma, secagem e pretos','—'],
        ['Lavagem completa','Externa + interna aspirada','—','Mais pedido'],
        ['Cera líquida','Proteção e brilho','—']
      ]],
      ['Interna','Cuidado detalhado',[
        ['Aspiração completa','Bancos, tapetes e porta-malas','—'],
        ['Higienização de bancos','Tecido ou couro','—'],
        ['Limpeza de painel','Com revitalizador','—']
      ]],
      ['Planos','Para frotas',[
        ['Plano mensal','4 lavagens completas','—'],
        ['Frota empresarial','Atendimento agendado','—']
      ]]
    ],
    info:{ addr:'Av. Gury Marques, 2200 — Universitário', hours:'Seg a Sáb · 7h30 às 18h30', city:'Campo Grande, MS' },
    highlight:['Lavagem com espuma de pH neutro','Sala de espera com café','Atendimento por ordem de chegada ou reserva'],
    aboutText:'O Cristal lava com método: dois baldes, luvas de microfibra e produtos neutros. Menos água, mais cuidado — e nenhum risco novo na pintura.',
    quote:'“Lavar bem é não deixar marca.”',
    tags:['Lava-jato','Lavagem','Frota'],
    domain:'lavacristal.com.br', cta:'Agendar lavagem', ctaShort:'Agendar'
  });

  S({
    id:'pneus-acessorios', cat:'automotivo', layout:'auto', theme:'brutal', v:1,
    name:'Pneus e acessórios', brand:'Pneu Forte',
    kicker:'Pneus e acessórios · Montagem na hora',
    head:'Pneu bom é o que segura o carro na chuva.',
    lede:'Marcas homologadas, alinhamento digital e montagem em até 40 minutos, com garantia de fábrica.',
    hero:'u:1492144534655-ae79c964c9d7|rect=120,0,1400,900',
    imgs:['u:1486262715619-67b85e0b08d3','u:1487754180451-85fa2a8a68d5','u:1560806887-1e4cd0b6cbd6'],
    nav:['Pneus','Acessórios','Serviços','Agenda'],
    stats:[['9','marcas homologadas'],['40min','montagem completa'],['5 anos','de garantia']],
    groups:[
      ['Pneus','Por medida',[
        ['Aro 13 a 15','Linha passeio com garantia','—'],
        ['Aro 16 a 18','SUV e picape','—'],
        ['Aro 19 a 22','Alta performance','—','Sob encomenda']
      ]],
      ['Serviços','Cuidado com a roda',[
        ['Montagem e balanceamento','Equipamento digital','—','Incluso'],
        ['Alinhamento 3D','Medição computadorizada','—'],
        ['Reparo de pneu','Vulcanização interna','—'],
        ['Rodízio','A cada 10.000 km','—']
      ]],
      ['Acessórios','Para completar',[
        ['Calibragem com nitrogênio','Pressão estável','—'],
        ['Bicos e válvulas','Troca no serviço','—'],
        ['Estepe e macaco','Kits completos','—']
      ]]
    ],
    info:{ addr:'Av. Costa e Silva, 5010 — Nova Lima', hours:'Seg a Sáb · 8h às 18h', city:'Campo Grande, MS' },
    highlight:['Montagem em até 40 minutos','Alinhamento 3D incluso na troca','Garantia de fábrica em todos os pneus'],
    aboutText:'A Pneu Forte trabalha com marcas homologadas e serviço completo em uma visita: montagem, balanceamento e alinhamento. Sai pronto para a estrada.',
    quote:'“O único contato com o chão é o pneu.”',
    tags:['Pneus','Alinhamento','Automotivo'],
    domain:'pneuforte.com.br', cta:'Consultar minha medida', ctaShort:'Consultar'
  });
})();
