/* ============================================================
   CATEGORIA 05 — BELEZA E ESTÉTICA
   ============================================================ */
(function () {
  'use strict';

  S({
    id:'salao-beleza', cat:'beleza', layout:'beauty', theme:'rose', v:1,
    name:'Salão de beleza', brand:'Studio Aurora',
    kicker:'Salão de beleza · Cabelo e make',
    head:'Seu cabelo tratado como assinatura.',
    lede:'Colorimetria, cortes autorais e tratamentos com produtos profissionais. Agende seu horário direto pelo WhatsApp.',
    hero:'u:1560066984-138dadb4c035',
    imgs:['u:1494790108377-be9c29b29330','u:1531123897727-8f129e1688ce','u:1524504388940-b1c1722653e1'],
    nav:['Serviços','Profissionais','Portfólio','Agenda'],
    stats:[['8','anos de estúdio'],['6','profissionais'],['+1200','clientes atendidas']],
    groups:[
      ['Cabelo','Do corte ao tratamento',[
        ['Corte autoral','Com consultoria de visagismo','—'],
        ['Coloração','Colorimetria e iluminação','—'],
        ['Mechas e loiros','Técnica de descoloração protegida','—'],
        ['Cronograma capilar','Protocolo em 3 sessões','—']
      ]],
      ['Make','Para cada ocasião',[
        ['Maquiagem social','Pele, olhos e iluminação','—'],
        ['Make noiva','Com teste prévio','—']
      ]],
      ['Combo','Experiência completa',[
        ['Dia da noiva','Cabelo, make e acompanhamento','—'],
        ['Combo semana','Escova, hidratação e finalização','—']
      ]]
    ],
    team:[
      ['Aline Prado','Cabeleireira · colorista','u:1494790108377-be9c29b29330'],
      ['Rafa Lima','Cortes e visagismo','u:1531123897727-8f129e1688ce'],
      ['Bianca Souza','Maquiagem e noivas','u:1524504388940-b1c1722653e1']
    ],
    info:{ addr:'Rua Paraíba, 320 — Jardim dos Estados', hours:'Ter a Sáb · 9h às 19h', city:'Campo Grande, MS' },
    highlight:['Consultoria de visagismo inclusa','Produtos profissionais','Agendamento pelo WhatsApp em menos de 1 minuto'],
    aboutText:'O Studio Aurora é um salão de bairro com padrão de estúdio: cada cliente passa por uma consultoria antes da tesoura encostar no cabelo. Aqui o resultado é construído junto.',
    quote:'“Cabelo bom é o que combina com a pessoa, não com a tendência.”',
    tags:['Salão','Cabelo','Make'],
    domain:'studioaurora.com.br', cta:'Agendar pelo WhatsApp', ctaShort:'Agendar'
  });

  S({
    id:'barbearia-premium', cat:'beleza', layout:'beauty', theme:'noir', v:2,
    name:'Barbearia premium', brand:'Navalha & Cia',
    kicker:'Barbearia premium · Desde 2014',
    head:'Tradição de barbearia, padrão de clube.',
    lede:'Corte na tesoura, barba com toalha quente e um ambiente feito para você desacelerar. Cerveja gelada por conta da casa.',
    hero:'u:1503951914875-452162b0f3f1',
    imgs:['u:1500648767791-00dcc994a43e','u:1506794778202-cad84cf45f1d','u:1519085360753-af0119f99cbe'],
    nav:['Serviços','Barbeiros','Ambiente','Agenda'],
    stats:[['10','anos de navalha'],['5','barbeiros'],['45min','por atendimento']],
    groups:[
      ['Serviços','Clássicos da casa',[
        ['Corte na tesoura','Consultoria de estilo inclusa','—'],
        ['Barba com toalha quente','Navalha e óleo essencial','—'],
        ['Combo corte + barba','O ritual completo','—','Mais pedido'],
        ['Pigmentação de barba','Acabamento discreto','—']
      ]],
      ['Cuidados','Extras',[
        ['Limpeza de pele','Para o público masculino','—'],
        ['Hidratação capilar','Com massagem','—'],
        ['Selagem de barba','Alinhamento dos fios','—']
      ]],
      ['Experiência','Diferencias',[
        ['Cerveja artesanal','Cortesia da casa','—'],
        ['Reserva de horário','Atendimento sem espera','—']
      ]]
    ],
    team:[
      ['Diego Reis','Barbeiro master','u:1500648767791-00dcc994a43e'],
      ['Lucas Andrade','Cortes clássicos','u:1506794778202-cad84cf45f1d'],
      ['Pedro Nunes','Barba e navalha','u:1519085360753-af0119f99cbe']
    ],
    info:{ addr:'Rua Cláudio Barbosa, 580 — Centro', hours:'Seg a Sáb · 9h às 20h', city:'Campo Grande, MS' },
    highlight:['Atendimento por reserva de horário','Ambiente climatizado com bar próprio','Produtos à venda na loja'],
    aboutText:'A Navalha & Cia nasceu da ideia de que barbearia é lugar de cuidado, não de pressa. Reserva de horário, ritual completo e conversa boa no balcão.',
    quote:'“Aqui o tempo passa mais devagar.”',
    tags:['Barbearia','Masculino','Premium'],
    domain:'navalhaecia.com.br', cta:'Reservar meu horário', ctaShort:'Reservar'
  });

  S({
    id:'clinica-estetica', cat:'beleza', layout:'beauty', theme:'ivory', v:3,
    name:'Clínica de estética', brand:'Clínica Vitalis',
    kicker:'Estética avançada · Protocolos personalizados',
    head:'Resultado com segurança e acompanhamento.',
    lede:'Protocolos faciais e corporais conduzidos por esteticistas certificadas, com avaliação individual e plano por etapas.',
    hero:'u:1589923188651-268a9765e432',
    imgs:['u:1494790108377-be9c29b29330','u:1524504388940-b1c1722653e1','u:1531123897727-8f129e1688ce'],
    nav:['Tratamentos','Protocolos','Estrutura','Avaliação'],
    stats:[['+3000','protocolos realizados'],['12','equipamentos'],['1','avaliação gratuita']],
    groups:[
      ['Facial','Cuidado com a pele',[
        ['Limpeza de pele profunda','Extração e hidratação calmante','—'],
        ['Skinbooster','Hidratação profunda com microinjeções','—'],
        ['Peeling químico','Protocolo conforme avaliação','—','Destaque'],
        ['Radiofrequência facial','Flacidez e textura','—']
      ]],
      ['Corporal','Contorno e firmeza',[
        ['Criolipólise','Redução de gordura localizada','—'],
        ['Drenagem linfática','Sessão de 60 minutos','—'],
        ['Massagem modeladora','Protocolo redutor','—']
      ]],
      ['Protocolos','Planos acompanhados',[
        ['Pele jovem','4 sessões com reavaliação','—'],
        ['Contorno corporal','8 sessões com acompanhamento','—']
      ]]
    ],
    info:{ addr:'Av. dos Ipês, 990 — Jardim Paulista', hours:'Seg a Sex · 8h às 19h · Sáb até 13h', city:'Campo Grande, MS' },
    highlight:['Avaliação inicial sem custo','Esteticistas com certificação','Protocolos registrados e documentados'],
    aboutText:'A Vitalis acredita em estética responsável: nenhum protocolo começa sem avaliação e todos são documentados com registro fotográfico. Resultado bem feito é resultado seguro.',
    quote:'“Beleza é consequência de cuidado, não de pressa.”',
    tags:['Estética','Saúde','Protocolos'],
    domain:'clinicavitalis.com.br', cta:'Agendar avaliação', ctaShort:'Agendar'
  });

  S({
    id:'manicure-pedicure', cat:'beleza', layout:'beauty', theme:'mint', v:1,
    name:'Manicure e pedicure', brand:'Nail Bar 21',
    kicker:'Nail bar · Alongamento e esmaltação',
    head:'Unhas impecáveis, com material esterilizado.',
    lede:'Esmaltação em gel, alongamento em fibra e cuidado completo com cutículas. Esterilização em autoclave a cada cliente.',
    hero:'u:1632345031435-8727f6897d53',
    imgs:['u:1531123897727-8f129e1688ce','u:1494790108377-be9c29b29330','u:1560066984-138dadb4c035'],
    nav:['Serviços','Alongamentos','Cuidados','Agenda'],
    stats:[['autoclave','a cada cliente'],['+40','cores em gel'],['7','dias de garantia']],
    groups:[
      ['Mãos','Serviços essenciais',[
        ['Esmaltação tradicional','Com cutícula e hidratação','—'],
        ['Esmaltação em gel','Dura até 21 dias','—','Mais pedido'],
        ['Blindagem','Proteção da unha natural','—']
      ]],
      ['Alongamentos','Fibra e acrigel',[
        ['Alongamento em fibra','Modelagem personalizada','—'],
        ['Manutenção de alongamento','A cada 21 dias','—'],
        ['Acrigel','Resistente e natural','—']
      ]],
      ['Pés','Cuidado completo',[
        ['Pedicure','Com esfoliação e hidratação','—'],
        ['Spa dos pés','Sessão relaxante de 40 minutos','—']
      ]]
    ],
    info:{ addr:'Rua Dom Aquino, 770 — Centro', hours:'Seg a Sáb · 9h às 19h', city:'Campo Grande, MS' },
    highlight:['Materiais individuais e esterilizados','Nail designers especializadas','Reserva de horário pelo WhatsApp'],
    aboutText:'O Nail Bar 21 é um espaço de unhas com protocolo de biossegurança rigoroso: instrumentais esterilizados em autoclave, lixas individuais e produtos de marcas profissionais.',
    quote:'“Detalhe bem feito é o que se nota primeiro.”',
    tags:['Manicure','Nail bar','Autocuidado'],
    domain:'nailbar21.com.br', cta:'Agendar pelo WhatsApp', ctaShort:'Agendar'
  });

  S({
    id:'maquiadora', cat:'beleza', layout:'beauty', theme:'plum', v:2,
    name:'Maquiadora', brand:'Lume Make',
    kicker:'Maquiagem profissional · Social e noivas',
    head:'Uma maquiagem feita para durar a noite inteira.',
    lede:'Make social, noiva e editorial com produtos de alta performance, testados em estúdio e em eventos reais.',
    hero:'u:1531123897727-8f129e1688ce',
    imgs:['u:1494790108377-be9c29b29330','u:1524504388940-b1c1722653e1','u:1560066984-138dadb4c035'],
    nav:['Serviços','Portfólio','Noivas','Agenda'],
    stats:[['+400','noivas maquiadas'],['12h','de durabilidade'],['+','atendimento a domicílio']],
    groups:[
      ['Serviços','Cada ocasião pede um olhar',[
        ['Make social','Pele, olhos e finalização com cílios','—'],
        ['Make noiva','Com teste prévio incluso','—','Destaque'],
        ['Make editorial','Para ensaio fotográfico','—'],
        ['Aula de automaquiagem','2 horas com kit de apoio','—']
      ]],
      ['Extras','Para completar',[
        ['Aplicação de cílios','Unidade a unidade','—'],
        ['Penteado','Parceria com cabeleireira','—'],
        ['Atendimento a domicílio','Para noivas e eventos','—']
      ]]
    ],
    info:{ addr:'Atendimento em estúdio e a domicílio', hours:'Seg a Sáb · horários a combinar', city:'Campo Grande, MS' },
    highlight:['Teste de make incluso para noivas','Produtos profissionais de alta fixação','Kit de retoque entregue à cliente'],
    aboutText:'A Lume Make trabalha com maquiagem de longa duração e pele real. Cada rosto é preparado antes da cor — porque make boa começa na preparação da pele.',
    quote:'“Make boa a gente esquece que está usando.”',
    tags:['Maquiagem','Noivas','Beleza'],
    domain:'lumemake.com.br', cta:'Agendar pelo WhatsApp', ctaShort:'Agendar'
  });

  S({
    id:'designer-sobrancelhas', cat:'beleza', layout:'beauty', theme:'sand', v:3,
    name:'Designer de sobrancelhas', brand:'Design & Olhar',
    kicker:'Design de sobrancelhas · Técnica e precisão',
    head:'O traço certo muda a expressão do rosto.',
    lede:'Mapeamento facial, henna, laminação e micropigmentação com técnica e olhar personalizado.',
    hero:'u:1494790108377-be9c29b29330',
    imgs:['u:1531123897727-8f129e1688ce','u:1589923188651-268a9765e432','u:1524504388940-b1c1722653e1'],
    nav:['Serviços','Técnicas','Antes e depois','Agenda'],
    stats:[['8','anos de estúdio'],['+2000','atendimentos'],['1','ano de retoque incluso']],
    groups:[
      ['Serviços','Precisão no traço',[
        ['Design com mapeamento','Visagismo e pinça','—','Mais pedido'],
        ['Design com henna','Cor e definição temporária','—'],
        ['Laminação','Fios alinhados e volumosos','—'],
        ['Micropigmentação','Técnica fio a fio','—']
      ]],
      ['Manutenção','Para manter o desenho',[
        ['Retoque de henna','A cada 21 dias','—'],
        ['Manutenção de micropigmentação','Retoque anual','—']
      ]]
    ],
    info:{ addr:'Studio próprio — Jardim dos Estados', hours:'Ter a Sáb · 9h às 18h', city:'Campo Grande, MS' },
    highlight:['Mapeamento facial incluso','Registro fotográfico antes e depois','Materiais descartáveis'],
    aboutText:'O Design & Olhar trabalha com mapeamento facial individual: nenhuma sobrancelha sai igual à outra, porque nenhum rosto é igual a outro.',
    quote:'“Sobrancelha boa não aparece. Aparece o rosto.”',
    tags:['Sobrancelhas','Design','Beleza'],
    domain:'designolhar.com.br', cta:'Agendar pelo WhatsApp', ctaShort:'Agendar'
  });

  S({
    id:'clinica-beleza', cat:'beleza', layout:'beauty', theme:'royal', v:1,
    name:'Clínica de beleza', brand:'Maison Esthétique',
    kicker:'Clínica de beleza · Estética e bem-estar',
    head:'Um ritual completo de cuidado, em um só lugar.',
    lede:'Cabelo, pele, unhas e massagens integrados em um espaço pensado para o seu tempo.',
    hero:'u:1606811971618-4486d14f3f99',
    imgs:['u:1560066984-138dadb4c035','u:1494790108377-be9c29b29330','u:1589923188651-268a9765e432'],
    nav:['Rituais','Day Spa','Equipe','Reservas'],
    stats:[['14','serviços integrados'],['1','dia inteiro de spa'],['VIP','atendimento privativo']],
    groups:[
      ['Rituais','Experiências completas',[
        ['Ritual Dia de Noiva','Cabelo, make, pele e massagem','—','Assinatura'],
        ['Ritual Relax','Massagem, escalda-pés e chá','—'],
        ['Ritual Pele','Limpeza, hidratação e revitalização','—']
      ]],
      ['Beleza','Serviços do salão',[
        ['Cabelo','Corte, cor e tratamento','—'],
        ['Unhas','Mãos e pés completos','—'],
        ['Maquiagem','Social e noiva','—']
      ]],
      ['Bem-estar','Para desacelerar',[
        ['Massagem relaxante','60 minutos','—'],
        ['Drenagem linfática','60 minutos','—'],
        ['Day spa','5 horas com almoço leve','—']
      ]]
    ],
    info:{ addr:'Rua Antônio Emílio de Figueiredo, 210 — Chácara Cachoeira', hours:'Ter a Sáb · 9h às 20h', city:'Campo Grande, MS' },
    highlight:['Atendimento privativo com hora marcada','Equipe multidisciplinar','Estacionamento com manobrista'],
    aboutText:'A Maison Esthétique reúne em um só endereço o que normalmente exige quatro: salão, estética, unhas e spa. A proposta é simples — uma visita, o cuidado completo.',
    quote:'“Cuidar de si não é luxo, é rotina bem feita.”',
    tags:['Clínica de beleza','Spa','Bem-estar'],
    domain:'maisonesthetique.com.br', cta:'Reservar meu ritual', ctaShort:'Reservar'
  });
})();
