/* ============================================================
   CATEGORIA 10 — HOTELARIA E TURISMO
   ============================================================ */
(function () {
  'use strict';

  S({
    id:'hotel', cat:'hotelaria', layout:'stay', theme:'noir', v:1,
    name:'Hotel', brand:'Hotel Mirante',
    kicker:'Hotel · Centro de Campo Grande',
    head:'Chegar e sentir que já era esperado.',
    lede:'Acomodações amplas, café da manhã regional e localização a poucos passos do centro e do aeroporto.',
    hero:'u:1566073771259-6a8506099945',
    imgs:['u:1618773928121-c32242e63f39','u:1782890790046-2aefb0b503cb','u:1629140727571-9b5c6f6267b4'],
    nav:['Acomodações','Estrutura','Localização','Reservas'],
    stats:[['84','apartamentos'],['4','suítes executivas'],['12','anos de hotel']],
    groups:[
      ['Acomodações','Do executivo à suíte',[
        ['Apartamento Standard','Cama queen, 24m², ar-condicionado','—'],
        ['Apartamento Superior','Cama king, 32m², vista cidade','—','Mais procurado'],
        ['Suíte Executiva','Sala separada, 48m², banheira','—']
      ]],
      ['Estrutura','Para o hóspede',[
        ['Café da manhã regional','Servido das 6h às 10h','—'],
        ['Estacionamento','Com manobrista 24h','—'],
        ['Academia','Aberta 24 horas','—'],
        ['Salas de reunião','Para até 60 pessoas','—']
      ]],
      ['Localização','Perto de tudo',[
        ['Centro','A 900 metros a pé','—'],
        ['Aeroporto','A 15 minutos de carro','—'],
        ['Shopping','A 5 minutos','—']
      ]]
    ],
    info:{ addr:'Av. Afonso Pena, 3200 — Centro', hours:'Recepção 24 horas', city:'Campo Grande, MS' },
    highlight:['Check-in digital','Café da manhã regional incluso','Cancelamento flexível'],
    aboutText:'O Mirante é um hotel urbano para quem viaja a trabalho e quer chegar sem surpresa: quarto impecável, café forte, internet que funciona e recepção que resolve.',
    quote:'“Hotel bom é o que não dá trabalho.”',
    tags:['Hotel','Urbano','Corporativo'],
    domain:'hotelmirante.com.br', cta:'Consultar disponibilidade', ctaShort:'Reservar'
  });

  S({
    id:'pousada', cat:'hotelaria', layout:'stay', theme:'sage', v:2,
    name:'Pousada', brand:'Pousada Águas Claras',
    kicker:'Pousada · Bonito, MS',
    head:'Aqui o dia começa com passarinho, não com despertador.',
    lede:'Chalés em meio ao jardim, piscina natural e café da manhã com bolo quente saindo do forno.',
    hero:'u:1611892440504-42a792e24d32',
    imgs:['u:1781572725438-ac8c41476752','u:1551882547-ff40c63fe5fa','u:1618773928121-c32242e63f39'],
    nav:['A pousada','Acomodações','Experiências','Reservas'],
    stats:[['14','chalés'],['25','mil m² de jardim'],['nota 9,6','dos hóspedes']],
    groups:[
      ['Acomodações','Chalés e quartos',[
        ['Chalé Jardim','Cama king, varanda e rede','—','Favorito'],
        ['Chalé Família','Dois quartos e banheira','—'],
        ['Quarto Casal','Vista para o jardim','—']
      ]],
      ['Experiências','Para fazer por aqui',[
        ['Flutuação','Saída com guia credenciado','—'],
        ['Trilha do pôr do sol','Caminhada guiada','—'],
        ['Observação de aves','Com binóculos inclusos','—'],
        ['Noite de fogueira','Com violão e vinho quente','—']
      ]],
      ['Serviços','Inclusos',[
        ['Café da manhã','Bolo, pão caseiro e frutas','—'],
        ['Piscina natural','Com deck e espreguiçadeiras','—'],
        ['Estacionamento','Dentro da pousada','—'],
        ['Transfer','Do centro de Bonito','—']
      ]]
    ],
    info:{ addr:'Rodovia Bonito-Guia Lopes, km 6', hours:'Recepção · 7h às 22h', city:'Bonito, MS' },
    highlight:['Café da manhã com bolo quente','Piscina natural','Guias credenciados parceiros'],
    aboutText:'A Águas Claras é uma pousada de jardim: os chalés ficam espalhados entre árvores nativas, longe da estrada. O ritmo aqui é outro — e é isso que os hóspedes vêm buscar.',
    quote:'“Bonito é lindo. Aqui, a gente desacelera.”',
    tags:['Pousada','Bonito','Natureza'],
    domain:'pousadaaguasclaras.com.br', cta:'Ver disponibilidade', ctaShort:'Reservar'
  });

  S({
    id:'chales', cat:'hotelaria', layout:'stay', theme:'forest', v:3,
    name:'Chalés', brand:'Chalés Vale Verde',
    kicker:'Chalés · Serra e cachoeira',
    head:'Uma cabana no fim da estrada certa.',
    lede:'Chalés independentes com lareira, hidromassagem e varanda para a mata. Café da manhã entregue no chalé.',
    hero:'u:1781572725438-ac8c41476752',
    imgs:['u:1611892440504-42a792e24d32','u:1629140727571-9b5c6f6267b4','u:1551882547-ff40c63fe5fa'],
    nav:['Chalés','Arredores','Café','Reservas'],
    stats:[['9','chalés privativos'],['1,2km','até a cachoeira'],['100%','privacidade']],
    groups:[
      ['Chalés','Todos com hidromassagem',[
        ['Chalé Lareira','Dois ambientes e banheira','—','Destaque'],
        ['Chalé Panorâmico','Varanda com vista para o vale','—'],
        ['Chalé Família','Dois quartos e cozinha compacta','—']
      ]],
      ['Arredores','Para explorar',[
        ['Cachoeira','Trilha de 1,2 km dentro da propriedade','—'],
        ['Mirante do vale','A 900 metros','—'],
        ['Restaurantes','Parceiros a 10 minutos','—']
      ]],
      ['Café','Servido no chalé',[
        ['Cesta matinal','Pão caseiro, queijos e bolo','—'],
        ['Café da tarde','Biscoitos e chá','—'],
        ['Kit fondue','Sob encomenda à noite','—']
      ]]
    ],
    info:{ addr:'Estrada do Vale, km 14 — Zona Rural', hours:'Check-in 14h · Check-out 12h', city:'Bonito, MS' },
    highlight:['Café da manhã no chalé','Hidromassagem em todas as unidades','Trilha privativa para cachoeira'],
    aboutText:'Os Chalés Vale Verde são para quem quer silêncio. Nove unidades espalhadas por 40 mil m², sem TV nos quartos e com a mata por todos os lados. Wi-Fi só se pedir.',
    quote:'“Silêncio também é um serviço.”',
    tags:['Chalés','Natureza','Romântico'],
    domain:'chalesvaleverde.com.br', cta:'Consultar datas', ctaShort:'Reservar'
  });

  S({
    id:'agencia-viagens', cat:'hotelaria', layout:'stay', theme:'ocean', v:1,
    name:'Agência de viagens', brand:'Rota Sul Viagens',
    kicker:'Agência de viagens · Consultoria personalizada',
    head:'A viagem começa com a conversa certa.',
    lede:'Roteiros nacionais e internacionais montados por consultores que entendem do seu jeito de viajar.',
    hero:'u:1488646953014-85cb44e25828',
    imgs:['u:1551882547-ff40c63fe5fa','u:1438032005730-c779502df39b','u:1566073771259-6a8506099945'],
    nav:['Destinos','Pacotes','Consultoria','Contato'],
    stats:[['+4000','viagens montadas'],['17','anos de agência'],['atendimento','humano']],
    groups:[
      ['Destinos','Seleção consultiva',[
        ['Bonito, MS','Flutuação, grutas e pousadas','—','Brasil'],
        ['Chapada dos Guimarães','Trilhas e cachoeiras','—'],
        ['Argentina','Buenos Aires e Mendoza','—','Internacional'],
        ['Europa rápida','Portugal e Espanha em 12 dias','—']
      ]],
      ['Estilos','Para cada viajante',[
        ['Descanso','Pousadas e praias tranquilas','—'],
        ['Aventura','Trilhas e turismo de natureza','—'],
        ['Gastronômico','Rotas com experiências','—'],
        ['A dois','Lua de mel e aniversários','—']
      ]],
      ['Serviços','Antes e depois',[
        ['Roteiro personalizado','Dia a dia com mapa','—'],
        ['Reservas','Hotéis, voos e transfers','—'],
        ['Suporte','Durante toda a viagem','—']
      ]]
    ],
    info:{ addr:'Rua 14 de Julho, 1800 — Centro', hours:'Seg a Sex · 9h às 18h · Sáb até 12h', city:'Campo Grande, MS' },
    highlight:['Roteiro personalizado com mapa','Suporte no WhatsApp durante a viagem','Seguro viagem integrado'],
    aboutText:'A Rota Sul monta roteiros como quem escreve à mão: cada dia pensado para aquele viajante. Nada de pacote engessado — e se algo mudar no meio da viagem, tem alguém atendendo.',
    quote:'“Viagem boa é a que sobra vontade de voltar.”',
    tags:['Viagens','Roteiros','Turismo'],
    domain:'rotasulviagens.com.br', cta:'Planejar minha viagem', ctaShort:'Planejar'
  });

  S({
    id:'turismo-rural', cat:'hotelaria', layout:'stay', theme:'forest', v:2,
    name:'Turismo rural', brand:'Fazenda Boa Vista',
    kicker:'Turismo rural · Experiência no campo',
    head:'Um dia de fazenda que vira uma memória longa.',
    lede:'Cavalos, ordenha, trilhas e comida de fogão a lenha em uma propriedade que recebe visitantes há 20 anos.',
    hero:'u:1500382017468-9049fed747ef|rect=200,0,1300,900',
    imgs:['u:1696441567908-6a04d49e1350','u:1683552515328-5a8d58755e9c','u:1504674900247-0877df9cc836'],
    nav:['Experiências','A fazenda','Refeições','Agenda'],
    stats:[['20','anos recebendo'],['120','visitantes por dia'],['800','hectares']],
    groups:[
      ['Experiências','Para toda a família',[
        ['Cavalgada guiada','Trilha de 2 horas pela propriedade','—','Destaque'],
        ['Ordenha','Participação no manejo da manhã','—'],
        ['Trilha da mata','Com guia local e observação de aves','—'],
        ['Tarde no pomar','Colheita de frutas da estação','—']
      ]],
      ['Refeições','Fogão a lenha',[
        ['Almoço caipira','Arroz, feijão, frango e legumes da horta','—'],
        ['Café colonial','Bolos, pães e geleias da casa','—'],
        ['Costela de chão','Servida no almoço de sábado','—']
      ]],
      ['A fazenda','Estrutura',[
        ['Estacionamento','Para ônibus e vans','—'],
        ['Redário','Área de descanso','—'],
        ['Loja','Queijos, doces e café da propriedade','—']
      ]]
    ],
    info:{ addr:'Rodovia MS-040, km 45 — Zona Rural', hours:'Visitas: Qua a Dom · 9h às 17h', city:'Campo Grande, MS' },
    highlight:['Guias locais e monitores','Almoço incluso nos pacotes de dia','Loja com produtos da propriedade'],
    aboutText:'A Boa Vista é uma fazenda de trabalho que abre as porteiras para visitação. Aqui o turista participa do manejo, come o que é produzido e vai embora sabendo de onde vem o alimento.',
    quote:'“Quem visita, volta. Quem volta, traz a família.”',
    tags:['Turismo rural','Família','Campo'],
    domain:'fazendaboavista.com.br', cta:'Agendar visita', ctaShort:'Agendar'
  });

  S({
    id:'aluguel-temporada', cat:'hotelaria', layout:'stay', theme:'mint', v:3,
    name:'Aluguel de temporada', brand:'Casa Maré',
    kicker:'Aluguel de temporada · Casas e flats',
    head:'Uma casa pronta para a sua temporada.',
    lede:'Casas e flats mobiliados com enxoval completo, limpeza profissional e check-in por fechadura digital.',
    hero:'u:1551882547-ff40c63fe5fa',
    imgs:['u:1618773928121-c32242e63f39','u:1582719478250-c89cae4dc85b','u:1600607687939-ce8a6c25118c'],
    nav:['Imóveis','Comodidades','Localização','Reservas'],
    stats:[['22','imóveis administrados'],['4.9','nota média'],['check-in','digital 24h']],
    groups:[
      ['Imóveis','Para diferentes grupos',[
        ['Casa com piscina','4 quartos · 10 pessoas · churrasqueira','—','Destaque'],
        ['Flat central','1 quarto · casal · coworking','—'],
        ['Apartamento família','3 quartos · 6 pessoas · garagem','—']
      ]],
      ['Comodidades','Inclusas na estadia',[
        ['Enxoval completo','Roupa de cama e banho','—'],
        ['Cozinha equipada','Utensílios e eletrodomésticos','—'],
        ['Wi-Fi','Fibra 500MB','—'],
        ['Limpeza','Antes e depois da estadia','—']
      ]],
      ['Localização','Bairros atendidos',[
        ['Centro','A poucos minutos da Av. Afonso Pena','—'],
        ['Jardim dos Estados','Bairro residencial arborizado','—']
      ]]
    ],
    info:{ addr:'Imóveis no Centro e Jardim dos Estados', hours:'Check-in 15h · Check-out 11h', city:'Campo Grande, MS' },
    highlight:['Check-in digital sem recepção','Enxoval e limpeza inclusos','Reserva com contrato digital'],
    aboutText:'A Casa Maré administra casas e flats com padrão de hotel: enxoval impecável, limpeza profissional e check-in que não depende de ninguém entregar chave.',
    quote:'“Temporada boa é a que parece casa.”',
    tags:['Temporada','Casas','Flats'],
    domain:'casamare.com.br', cta:'Ver disponibilidade', ctaShort:'Reservar'
  });
})();
