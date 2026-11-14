/* ============================================================
   CATEGORIA 03 — MERCADOS E SUPERMERCADOS
   ============================================================ */
(function () {
  'use strict';

  S({
    id:'supermercado', cat:'mercados', layout:'market', theme:'sage', v:1,
    name:'Supermercado completo', brand:'Bom Dia Supermercados',
    kicker:'Supermercado · 5 lojas na cidade',
    head:'A compra da semana resolvida em uma visita.',
    lede:'Ofertas atualizadas, hortifruti abastecido todos os dias e pedido pronto para retirar ou receber em casa.',
    hero:'u:1584305574647-0cc949a2bb9f',
    imgs:['u:1560806887-1e4cd0b6cbd6','u:1582284540020-8acbe03f26cc','u:1584305574647-0cc949a2bb9f'],
    nav:['Ofertas','Corredores','Hortifruti','Delivery'],
    stats:[['12mil','itens na loja'],['5','lojas'],['6h','abertura']],
    groups:[
      ['Ofertas da semana','Preços válidos até domingo',[
        ['Arroz 5kg','Tipo 1 · grão longo','27,90','Oferta'],
        ['Feijão Carioca 1kg','Safra nova','8,49'],
        ['Óleo de Soja 900ml','Garrafa','7,29'],
        ['Leite Integral 1L','Caixa','4,99'],
        ['Café Torrado 500g','Tradicional','18,90']
      ]],
      ['Hortifruti','Chegou hoje',[
        ['Banana Prata','Kg','5,99'],
        ['Tomate Italiano','Kg','8,49'],
        ['Alface Crespa','Unidade','3,49'],
        ['Manga Palmer','Kg','6,99']
      ]],
      ['Açougue','Cortes do dia',[
        ['Picanha','Kg','89,90'],
        ['Frango Inteiro','Kg','14,90'],
        ['Costela Bovina','Kg','34,90']
      ]],
      ['Bebidas','Geladas',[
        ['Cerveja Lata 350ml','Pack 12','42,90'],
        ['Refrigerante 2L','Garrafa','9,49'],
        ['Água Mineral 5L','Galão','8,90']
      ]]
    ],
    info:{ addr:'Av. Mato Grosso, 4500 — Jardim Noroeste', hours:'Todos os dias · 6h às 23h', city:'Campo Grande, MS' },
    highlight:['Hortifruti reposto diariamente','Estacionamento gratuito','Pedido pelo WhatsApp com entrega no mesmo dia'],
    aboutText:'Há 22 anos no bairro, o Bom Dia cresceu sem perder o hábito de conhecer o cliente pelo nome. Cinco lojas, o mesmo cuidado com o abastecimento e o preço justo.',
    tags:['Supermercado','Ofertas','Delivery'],
    domain:'bomdiasuper.com.br', cta:'Enviar minha lista', ctaShort:'Enviar lista'
  });

  S({
    id:'mercado-bairro', cat:'mercados', layout:'market', theme:'clay', v:2,
    name:'Mercado de bairro', brand:'Mercado São Jorge',
    kicker:'Mercado de bairro · Desde 1988',
    head:'O mercado que conhece o seu nome.',
    lede:'Do pão quentinho ao gás de cozinha: tudo a poucos passos de casa, com atendimento de quem é da rua.',
    hero:'u:1582284540020-8acbe03f26cc',
    imgs:['u:1542838132-92c53300491e','u:1586528116311-ad8dd3c8310d','u:1560806887-1e4cd0b6cbd6'],
    nav:['Ofertas','Padaria','Bebidas','Entrega'],
    stats:[['36','anos de bairro'],['até 22h','todos os dias'],['15min','entrega local']],
    groups:[
      ['Padaria','Sai quentinho às 6h',[
        ['Pão Francês','Kg','14,90'],
        ['Pão de Queijo','6 unidades','12,90'],
        ['Bolo de Cenoura','Fatia generosa','7,50']
      ]],
      ['Ofertas do mês','Para o dia a dia',[
        ['Arroz 5kg','Tipo 1','26,90'],
        ['Café 500g','Torrado e moído','17,90'],
        ['Sabão em Pó 1,6kg','Rende mais','19,90'],
        ['Gás 13kg','Entrega no bairro','—']
      ]],
      ['Bebidas','Sempre geladas',[
        ['Cerveja 600ml','Garrafa','9,90'],
        ['Refrigerante 2L','Garrafa','8,49']
      ]]
    ],
    info:{ addr:'Rua José Antônio, 210 — Vila Nova', hours:'Todos os dias · 7h às 22h', city:'Campo Grande, MS' },
    highlight:['Entrega em até 15 minutos no bairro','Fiado do mês para clientes antigos','Padaria própria'],
    aboutText:'O São Jorge é daquelas mercearias que viraram ponto de encontro. O cliente chega pelo pão e fica pela conversa — e a entrega sai de bicicleta, como antigamente.',
    tags:['Mercado','Bairro','Padaria'],
    domain:'saaojorge.com.br', cta:'Pedir pelo WhatsApp', ctaShort:'Pedir'
  });

  S({
    id:'hortifruti', cat:'mercados', layout:'market', theme:'sage', v:3,
    name:'Hortifruti', brand:'Raiz & Folha',
    kicker:'Hortifruti · Direto do produtor',
    head:'Colhido ontem, na sua mesa hoje.',
    lede:'Frutas, verduras e legumes comprados direto de produtores da região, com rastreio de origem em cada caixa.',
    hero:'u:1546069901-ba9599a7e63c',
    imgs:['u:1504674900247-0877df9cc836','u:1582284540020-8acbe03f26cc','u:1560806887-1e4cd0b6cbd6'],
    nav:['Frutas','Verduras','Cestas','Origem'],
    stats:[['24','produtores parceiros'],['0','câmara de amadurecimento'],['6h','chegada diária']],
    groups:[
      ['Frutas','Da estação',[
        ['Manga Palmer','Kg · produtor de Bonito','8,90'],
        ['Abacaxi Pérola','Unidade grande','9,90','Doce'],
        ['Mamão Papaia','Kg','7,49'],
        ['Laranja Pera','Kg · suco','5,99']
      ]],
      ['Verduras','Folhas frescas',[
        ['Alface Americana','Unidade','4,49'],
        ['Rúcula','Maço','4,99'],
        ['Couve Manteiga','Maço','4,29'],
        ['Cheiro-verde','Maço','3,49']
      ]],
      ['Legumes','Para o almoço',[
        ['Tomate Saladete','Kg','9,90'],
        ['Cenoura','Kg','5,49'],
        ['Abobrinha','Kg','6,49']
      ]],
      ['Cestas','Montadas na hora',[
        ['Cesta Semanal','8 itens selecionados','89'],
        ['Cesta Família','14 itens selecionados','149']
      ]]
    ],
    info:{ addr:'Rua da Feira, 1050 — Jardim Paulista', hours:'Seg a Sáb · 7h às 19h', city:'Campo Grande, MS' },
    highlight:['Origem rastreada em cada caixa','Cestas montadas na hora','Entrega semanal por assinatura'],
    aboutText:'A Raiz & Folha compra de 24 produtores da região e paga melhor por produto bom. O resultado aparece na mesa: fruta doce, folha firme e a certeza de saber de onde veio.',
    tags:['Hortifruti','Orgânicos','Cestas'],
    domain:'raizefolha.com.br', cta:'Montar minha cesta', ctaShort:'Montar cesta'
  });

  S({
    id:'acougue', cat:'mercados', layout:'market', theme:'ruby', v:1,
    name:'Açougue', brand:'Casa do Corte',
    kicker:'Açougue e casa de carnes · Corte na hora',
    head:'Corte no ponto, na hora que você pedir.',
    lede:'Carne selecionada, desossa própria e açougueiro no balcão para cortar exatamente como a sua receita pede.',
    hero:'u:1594212699903-ec8a3eca50f5',
    imgs:['u:1567620905732-2d1ec7ab7445','u:1504674900247-0877df9cc836','u:1546069901-ba9599a7e63c'],
    nav:['Carnes','Cortes especiais','Churrasco','Encomendas'],
    stats:[['3','gerações de açougue'],['38','cortes disponíveis'],['-2°C','câmara própria']],
    groups:[
      ['Bovinos','Cortes do dia',[
        ['Picanha','Kg · peça inteira ou fatiada','89,90'],
        ['Alcatra','Kg · macia para grelhar','54,90'],
        ['Costela','Kg · para assar','34,90'],
        ['Coxão Mole','Kg · moer na hora','42,90']
      ]],
      ['Suínos e aves','Produção local',[
        ['Lombo Suíno','Kg','29,90'],
        ['Frango Inteiro','Kg','14,90'],
        ['Sobrecoxa','Kg','16,90']
      ]],
      ['Churrasco','Kit para 6 pessoas',[
        ['Kit Básico','Picanha, linguiça, frango e farofa','189'],
        ['Kit Premium','Ancho, costela, linguiça artesanal e pão de alho','289']
      ]],
      ['Temperos','Feitos na casa',[
        ['Sal de ervas','Pote 250g','14,90'],
        ['Molho chimichurri','Frasco 200ml','18,90']
      ]]
    ],
    info:{ addr:'Rua do Comércio, 780 — Centro', hours:'Seg a Sáb · 7h às 19h', city:'Campo Grande, MS' },
    highlight:['Desossa própria todos os dias','Corte sob medida sem custo','Encomenda de peças inteiras'],
    aboutText:'A Casa do Corte está na mesma esquina há três gerações. O balcão de mármore é o mesmo, o cuidado com a faca também — e o cliente sabe que o corte sai como pediu.',
    tags:['Açougue','Churrasco','Carnes'],
    domain:'casadocorte.com.br', cta:'Encomendar pelo WhatsApp', ctaShort:'Encomendar'
  });

  S({
    id:'distribuidora-bebidas', cat:'mercados', layout:'market', theme:'noir', v:2,
    name:'Distribuidora de bebidas', brand:'Gelo & Gala',
    kicker:'Distribuidora · Entrega em 40 minutos',
    head:'Bebida gelada, no preço de distribuidora.',
    lede:'Cervejas, destilados, vinhos e energéticos com entrega rápida para casa, evento ou empresa.',
    hero:'u:1519225421980-715cb0215aed|rect=0,150,1400,1000',
    imgs:['u:1502635385003-ee1e6a1a742d','u:1561593367-66c79c2294e6','u:1649615644622-6d83f48e69c5'],
    nav:['Cervejas','Destilados','Vinhos','Entrega'],
    stats:[['800','rótulos'],['40min','entrega média'],['-4°C','câmara gelada']],
    groups:[
      ['Cervejas','Por caixa ou unidade',[
        ['Lager 350ml','Caixa 24 unidades','89,90','Gelada'],
        ['Pilsen 600ml','Caixa 12 unidades','79,90'],
        ['IPA Artesanal','500ml · unidade','24,90']
      ]],
      ['Destilados','Para o brinde',[
        ['Vodka Premium','1L','69,90'],
        ['Whisky 8 anos','1L','139,90'],
        ['Gin London Dry','750ml','99,90']
      ]],
      ['Vinhos','Seleção',[
        ['Malbec Argentino','750ml','54,90'],
        ['Tinto Português','750ml','69,90'],
        ['Espumante Brut','750ml','79,90']
      ]],
      ['Gelo e energia','Para o evento',[
        ['Gelo em cubos 5kg','Sacola lacrada','19,90'],
        ['Energético 473ml','Lata','9,90']
      ]]
    ],
    info:{ addr:'Av. Duque de Caxias, 3200 — Industrial', hours:'Seg a Sáb · 8h às 22h · Dom até 18h', city:'Campo Grande, MS' },
    highlight:['Entrega em até 40 minutos','Preço de atacado a partir de 3 caixas','Locação de chopeira'],
    aboutText:'A Gelo & Gala começou atendendo bares e hoje entrega para quem faz festa em casa. Mesmo preço, mesma agilidade e a bebida sempre na temperatura certa.',
    tags:['Bebidas','Atacado','Entrega'],
    domain:'geloegala.com.br', cta:'Fazer meu pedido', ctaShort:'Pedir'
  });

  S({
    id:'conveniencia', cat:'mercados', layout:'market', theme:'tech', v:3,
    name:'Conveniência', brand:'Ponto 24',
    kicker:'Conveniência · 24 horas',
    head:'Aberto quando tudo o mais fechou.',
    lede:'Snacks, bebidas geladas, café fresco e itens de emergência. Aberto 24 horas, todos os dias do ano.',
    hero:'u:1586528116311-ad8dd3c8310d',
    imgs:['u:1542838132-92c53300491e','u:1582284540020-8acbe03f26cc','u:1560806887-1e4cd0b6cbd6'],
    nav:['Gelados','Snacks','Café','24h'],
    stats:[['24h','todos os dias'],['3min','para pagar'],['60','itens gelados']],
    groups:[
      ['Gelados','Sempre na temperatura',[
        ['Cerveja Lata 350ml','Unidade','4,49'],
        ['Refrigerante 350ml','Lata','4,99'],
        ['Energético 250ml','Lata','8,90'],
        ['Sorvete de Pote','500ml','16,90']
      ]],
      ['Snacks','Para a madrugada',[
        ['Salgadinho 90g','Diversos sabores','8,90'],
        ['Chocolate 90g','Barra','9,90'],
        ['Sanduíche Natural','Feito no dia','12,90']
      ]],
      ['Café','Torra da casa',[
        ['Café Expresso','Copo 200ml','6,90'],
        ['Cappuccino','Copo 300ml','9,90']
      ]],
      ['Emergência','Utilidades',[
        ['Carregador USB-C','Cabo 1m','34,90'],
        ['Fone com fio','P2','24,90'],
        ['Guarda-chuva','Dobrável','29,90']
      ]]
    ],
    info:{ addr:'Av. Afonso Pena, 5100 — Chácara Cachoeira', hours:'Aberto 24 horas', city:'Campo Grande, MS' },
    highlight:['Aberto 24 horas, inclusive feriados','Café fresco a qualquer hora','Pagamento por aproximação'],
    aboutText:'O Ponto 24 é a parada certa para quem sai tarde ou acorda cedo. Estoque enxuto, mas certeiro: o que as pessoas realmente procuram quando tudo está fechado.',
    tags:['Conveniência','24 horas','Snacks'],
    domain:'ponto24.com.br', cta:'Pedir pelo WhatsApp', ctaShort:'Pedir'
  });
})();
