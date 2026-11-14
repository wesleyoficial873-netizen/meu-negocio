/* ============================================================
   CATEGORIA 01 — RESTAURANTES E GASTRONOMIA
   ============================================================ */
(function () {
  'use strict';

  S({
    id:'restaurante-sofisticado', cat:'gastronomia', layout:'menu', theme:'noir', v:1,
    name:'Restaurante sofisticado', brand:'Casa Almeida',
    kicker:'Cozinha autoral · Campo Grande, MS',
    head:'Uma experiência à mesa que começa antes do primeiro prato.',
    lede:'Ingredientes do Cerrado, técnica clássica e um salão pensado para noites que merecem ser lembradas.',
    hero:'l:gastronomia/restaurante-sofisticado-hero.jpg',
    imgs:['l:gastronomia/restaurante-sofisticado-a.jpg','l:gastronomia/restaurante-sofisticado-b.jpg','u:1504674900247-0877df9cc836'],
    nav:['Menu','Experiência','Galeria','Reservas'],
    stats:[['12','anos de casa'],['4','salas privativas'],['2','menus degustação']],
    groups:[
      ['Entradas','Para abrir a noite',[
        ['Bruschetta de tomate confit','Pão de fermentação natural, tomate confitado, burrata e manjericão','42'],
        ['Carpaccio de boi','Mignon maturado, alcaparras, parmesão e azeite de ervas','56'],
        ['Polvo na brasa','Purê de mandioquinha, limão siciliano e páprica defumada','78']
      ]],
      ['Principais','Do fogo e do mar',[
        ['Risoto de cogumelos do Cerrado','Arroz carnaroli, mix de cogumelos, manteiga de sálvia e parmesão','92'],
        ['Ancho na parrilla','Corte de 300g, manteiga de alho negro e batatas rústicas','128'],
        ['Peixe do dia','Pescado fresco, legumes na brasa e molho de ervas do quintal','112']
      ]],
      ['Sobremesas','Para terminar bem',[
        ['Petit gâteau de cacau','Coração quente, sorvete de baunilha e flor de sal','38'],
        ['Panna cotta de pequi','Creme de baunilha, calda de pequi e crocante de castanha','32']
      ]],
      ['Carta de vinhos','Seleção do sommelier',[
        ['Malbec reserva','Mendoza · Argentina · taça','48'],
        ['Branco mineral','Vale dos Vinhedos · Brasil · taça','42'],
        ['Espumante brut','Serra Gaúcha · taça','46']
      ]]
    ],
    info:{ addr:'Rua Bahia, 1240 — Jardim dos Estados', hours:'Ter a Sáb · 19h às 23h30', city:'Campo Grande, MS' },
    highlight:['Salão autoral com 48 lugares','Menu degustação em 7 tempos','Adega com 180 etiquetas'],
    aboutText:'A Casa Almeida nasceu da vontade de traduzir o Cerrado em pratos autorais, sem perder a leveza da cozinha clássica. Cada menu é desenhado semanalmente com o que chega de melhor dos produtores da região.',
    quote:'“Servimos o Cerrado com o cuidado de quem recebe em casa.” — Chef Almeida',
    tags:['Alta gastronomia','Jantar','Reservas'],
    domain:'casaalmeida.com.br', cta:'Reservar pelo WhatsApp', ctaShort:'Reservar'
  });

  S({
    id:'pizzaria-moderna', cat:'gastronomia', layout:'menu', theme:'warm', v:2,
    name:'Pizzaria moderna', brand:'Forno 1958',
    kicker:'Napolitana contemporânea · Delivery próprio',
    head:'Fermentação lenta, forno a lenha e a alma de Nápoles.',
    lede:'Massa de 48 horas, molho de tomate italiano e forno a 450°C. Pizza de verdade, do jeito que a cidade ainda não tinha.',
    hero:'l:gastronomia/pizzaria-moderna-hero.jpg',
    imgs:['l:gastronomia/pizzaria-moderna-a.jpg','l:gastronomia/pizzaria-moderna-b.jpg','u:1565299624946-b28f40a0ae38'],
    nav:['Cardápio','Forno','Delivery','Contato'],
    stats:[['48h','de fermentação'],['450°','forno a lenha'],['32','sabores autorais']],
    groups:[
      ['Clássicas','A base de tudo',[
        ['Margherita','San Marzano, mussarela de búfala, basílico e azeite','59'],
        ['Napolitana','Tomate, aliche, orégano e azeitonas pretas','64'],
        ['Calabresa artesanal','Calabresa defumada, cebola roxa e orégano','62']
      ]],
      ['Assinaturas','Criações da casa',[
        ['Forno 1958','Mussarela, pera caramelizada, gorgonzola e nozes','78'],
        ['Cerrado','Carne seca desfiada, catupiry e cebola crocante','82'],
        ['Vegetariana da horta','Abobrinha, berinjela, tomate confit e pesto','72']
      ]],
      ['Doces','Para fechar a noite',[
        ['Chocolate com morango','Chocolate ao leite, morangos frescos e creme','56'],
        ['Romeu e Julieta','Goiabada cremosa e queijo minas','48']
      ]],
      ['Bebidas','Geladas',[
        ['Limonada siciliana','Limão siciliano, hortelã e água com gás','18'],
        ['Refrigerante artesanal','Lata 350ml','12'],
        ['Cerveja artesanal','Weiss local 500ml','32']
      ]]
    ],
    info:{ addr:'Av. Afonso Pena, 3870 — Centro', hours:'Qua a Dom · 18h às 00h', city:'Campo Grande, MS' },
    highlight:['Delivery próprio em até 40 minutos','Massa aberta à mão todos os dias','Adega de cervejas artesanais'],
    aboutText:'O Forno 1958 é a pizzaria de bairro que decidiu fazer tudo do zero: a massa, o molho, a calabresa e até a farinha de trigo escolhida grão a grão. Aqui a pizza é levada a sério, mas o clima é de casa de amigos.',
    quote:'“Pizza boa não tem pressa. Tem tempo.”',
    tags:['Pizza artesanal','Delivery','Forno a lenha'],
    domain:'forno1958.com.br', cta:'Pedir pelo WhatsApp', ctaShort:'Pedir agora'
  });

  S({
    id:'hamburgueria-artesanal', cat:'gastronomia', layout:'menu', theme:'ruby', v:3,
    name:'Hamburgueria artesanal', brand:'Brasa Burger Co.',
    kicker:'Smash & artesanal · Ambiente industrial',
    head:'Blend próprio, pão brioche e brasa de verdade.',
    lede:'Carne moída na casa todos os dias, queijos selecionados e uma chapa que não descansa. Simples assim, do jeito certo.',
    hero:'u:1550547660-d9450f859349',
    imgs:['u:1568909344668-6f14a07b56a0','u:1571091718767-18b5b1457add','u:1594212699903-ec8a3eca50f5'],
    nav:['Cardápio','Combos','Ambiente','Pedidos'],
    stats:[['180g','blend bovino'],['12','assinaturas'],['4.9','avaliação média']],
    groups:[
      ['Assinaturas','Feitas na chapa',[
        ['Brasa Clássica','Blend 180g, cheddar inglês, alface, tomate e molho da casa','39'],
        ['Duplo Bacon','Dois blends, cheddar duplo, bacon crocante e cebola caramelizada','54'],
        ['Picante do Cerrado','Blend 180g, queijo pepper jack, geleia de pimenta e rúcula','46']
      ]],
      ['Combos','Com acompanhamento e bebida',[
        ['Combo Brasa','Brasa Clássica + fritas rústicas + refrigerante','59'],
        ['Combo Casal','Dois burgers + fritas grande + duas bebidas','109']
      ]],
      ['Acompanhamentos','Para dividir',[
        ['Fritas rústicas','Com páprica e maionese de alho','24'],
        ['Onion rings','Anéis de cebola empanados e molho barbecue','28'],
        ['Batata com cheddar e bacon','Porção individual','32']
      ]],
      ['Shakes','Espessos e cremosos',[
        ['Shake de doce de leite','Sorvete de baunilha, doce de leite e chantilly','26'],
        ['Shake de chocolate 70%','Chocolate amargo, cacau e flor de sal','28']
      ]]
    ],
    info:{ addr:'Rua Antônio Maria Coelho, 2100 — São Francisco', hours:'Todos os dias · 18h às 23h', city:'Campo Grande, MS' },
    highlight:['Blend moído na casa','Pão brioche de produção própria','Retirada e delivery no WhatsApp'],
    aboutText:'A Brasa nasceu de uma chapa emprestada, dois amigos e a teimosia de fazer o melhor burger do bairro. Hoje são três unidades, o mesmo blend e a mesma obsessão pelo ponto certo.',
    quote:'“Se não tiver sujeira no queixo, não foi bom o suficiente.”',
    tags:['Hamburguer artesanal','Delivery','Happy hour'],
    domain:'brasaburger.com.br', cta:'Pedir pelo WhatsApp', ctaShort:'Pedir agora'
  });

  S({
    id:'pastelaria', cat:'gastronomia', layout:'menu', theme:'sand', v:1,
    name:'Pastelaria', brand:'Pastelaria do Zé',
    kicker:'Pastel de feira · Massa fininha',
    head:'A massa fininha que faz fila desde 1994.',
    lede:'Recheios generosos, fritura na hora e aquele pastel que estala na primeira mordida. Tradição de feira, apresentada como merece.',
    hero:'u:1555939594-58d7cb561ad1',
    imgs:['u:1504674900247-0877df9cc836','u:1567620905732-2d1ec7ab7445','u:1476224203421-9ac39bcb3327'],
    nav:['Sabores','A casa','Combos','Contato'],
    stats:[['30','anos de feira'],['18','sabores'],['110g','de recheio']],
    groups:[
      ['Salgados','Fritos na hora',[
        ['Carne bovina','Carne moída temperada, azeitona e cheiro-verde','14'],
        ['Queijo com presunto','Mussarela derretida e presunto artesanal','14'],
        ['Frango com catupiry','Frango desfiado e catupiry original','16'],
        ['Pizza','Mussarela, presunto, tomate e orégano','15'],
        ['Palmito','Creme de palmito com ervas','17'],
        ['Calabresa acebolada','Calabresa artesanal e cebola','16']
      ]],
      ['Doces','Para depois',[
        ['Chocolate com morango','Chocolate ao leite e morangos','18'],
        ['Doce de leite com queijo','Doce de leite argentino e queijo minas','18'],
        ['Banana com canela','Banana, açúcar e canela','15']
      ]],
      ['Bebidas','Geladinhas',[
        ['Caldo de cana','300ml, na hora','12'],
        ['Limonada suíça','Copos 500ml','12'],
        ['Refrigerante','Lata 350ml','8']
      ]]
    ],
    info:{ addr:'Feira do Bairro — Rua das Palmeiras', hours:'Qua a Domingo · 16h às 22h', city:'Campo Grande, MS' },
    highlight:['Massa aberta todos os dias','Recheios de produção própria','Atendimento no balcão e no WhatsApp'],
    aboutText:'Seu Zé começou com uma banca de feira e uma receita de família. Trinta anos depois, a massa continua a mesma: fininha, crocante e aberta à mão todas as manhãs.',
    quote:'“Pastel bom a gente escuta antes de morder.”',
    tags:['Pastel','Feira','Tradição'],
    domain:'pasteldorze.com.br', cta:'Encomendar pelo WhatsApp', ctaShort:'Encomendar'
  });

  S({
    id:'sorveteria', cat:'gastronomia', layout:'menu', theme:'mint', v:2,
    name:'Sorveteria', brand:'Gelato Aurora',
    kicker:'Gelato artesanal · Produção diária',
    head:'Gelato feito de manhã para ser feliz à tarde.',
    lede:'Leite de produtores locais, frutas da estação e nenhum corante artificial. Uma vitrine que muda com o dia.',
    hero:'u:1551024506-0bccd828d307',
    imgs:['u:1567620905732-2d1ec7ab7445','u:1476224203421-9ac39bcb3327','u:1504674900247-0877df9cc836'],
    nav:['Sabores','Vitrine','Sundaes','Loja'],
    stats:[['24','sabores na vitrine'],['0','corantes artificiais'],['100%','fruta de verdade']],
    groups:[
      ['Sabores','Clássicos',[
        ['Baunilha de Madagascar','Fava de baunilha e leite integral','18'],
        ['Chocolate 70%','Cacau intenso e cremosidade equilibrada','20'],
        ['Morango da estação','Morangos frescos batidos na hora','20']
      ]],
      ['Da nossa terra','Insumos regionais',[
        ['Pequi com castanha','Pequi do Cerrado e crocante de castanha','22'],
        ['Manga palmer','Manga madura e raspas de limão','20'],
        ['Coco queimado','Coco fresco tostado na casa','22']
      ]],
      ['Sundaes','Montados na hora',[
        ['Aurora Clássica','Três bolas, calda de chocolate e castanhas','32'],
        ['Sundae de frutas','Duas bolas, frutas frescas e granola','28']
      ]],
      ['Bebidas','Da casa',[
        ['Milkshake de baunilha','500ml com sorvete artesanal','26'],
        ['Café espresso','Blend próprio','10'],
        ['Água com gás','500ml','8']
      ]]
    ],
    info:{ addr:'Rua Maracaju, 890 — Jardim dos Estados', hours:'Todos os dias · 12h às 22h', city:'Campo Grande, MS' },
    highlight:['Produção artesanal diária','Opções veganas e sem lactose','Casquinha artesanal'],
    aboutText:'A Aurora é uma gelateria de bairro com produção aberta: dá para ver o gelato sendo feito pela vitrine. A regra é simples — se não estiver bom na colher, não vai para a vitrine.',
    quote:'“Gelato bom derrete rápido porque não tem o que segurar.”',
    tags:['Gelato','Família','Artesanal'],
    domain:'gelatoaurora.com.br', cta:'Pedir pelo WhatsApp', ctaShort:'Pedir'
  });

  S({
    id:'acaiteria', cat:'gastronomia', layout:'menu', theme:'plum', v:3,
    name:'Açaiteria', brand:'Açaí do Norte',
    kicker:'Açaí fino · Complementos frescos',
    head:'Açaí de verdade, do Norte para a sua tigela.',
    lede:'Polpa batida na hora, textura cremosa e complementos cortados no dia. Sem xarope, sem atalho.',
    hero:'u:1476224203421-9ac39bcb3327',
    imgs:['u:1476224203421-9ac39bcb3327','u:1504674900247-0877df9cc836','u:1567620905732-2d1ec7ab7445'],
    nav:['Tigelas','Montar','Complementos','Delivery'],
    stats:[['300ml','tigela padrão'],['18','complementos'],['0','xarope de guaraná']],
    groups:[
      ['Tigelas','Prontas para pedir',[
        ['Tigela Tradicional','Açaí 300ml, banana, granola e leite condensado','24'],
        ['Tigela Tropical','Açaí, manga, kiwi, coco e mel','29'],
        ['Tigela Fitness','Açaí zero açúcar, banana, pasta de amendoim e chia','31'],
        ['Tigela Família','700ml com quatro complementos à escolha','52']
      ]],
      ['Monte a sua','Escolha o tamanho e os complementos',[
        ['300ml','Até 3 complementos','24'],
        ['500ml','Até 5 complementos','34'],
        ['700ml','Até 6 complementos','46']
      ]],
      ['Complementos','Cortados no dia',[
        ['Frutas frescas','Banana, morango, manga e kiwi','6'],
        ['Crocantes','Granola artesanal, castanhas e amendoim','6'],
        ['Cremes','Leite condensado, Nutella e creme de ninho','7']
      ]],
      ['Bebidas','Para acompanhar',[
        ['Suco natural','Laranja, abacaxi ou maracujá · 500ml','14'],
        ['Vitamina de açaí','300ml com banana','19']
      ]]
    ],
    info:{ addr:'Av. Gury Marques, 1450 — Universitário', hours:'Todos os dias · 11h às 23h', city:'Campo Grande, MS' },
    highlight:['Polpa de origem controlada','Complementos frescos do dia','Embalagem térmica para delivery'],
    aboutText:'O Açaí do Norte trabalha com polpa fina vinda direto de fornecedores do Pará. O resultado é um açaí mais encorpado, menos doce e sem aquele gosto artificial que a gente conhece demais.',
    quote:'“Açaí bom não precisa de disfarce.”',
    tags:['Açaí','Saudável','Delivery'],
    domain:'acaidonorte.com.br', cta:'Pedir pelo WhatsApp', ctaShort:'Pedir'
  });

  S({
    id:'churrascaria', cat:'gastronomia', layout:'menu', theme:'clay', v:1,
    name:'Churrascaria', brand:'Corte & Fogo',
    kicker:'Cortes nobres · Rodízio e à la carte',
    head:'O ponto certo entre o fogo e a mesa.',
    lede:'Cortes selecionados, sal grosso e fogo alto. Rodízio corrido, serviço de salão e uma carta de vinhos pensada para carne.',
    hero:'u:1567620905732-2d1ec7ab7445',
    imgs:['u:1504674900247-0877df9cc836','u:1546069901-ba9599a7e63c','u:1567620905732-2d1ec7ab7445'],
    nav:['Cortes','Rodízio','Salão','Reservas'],
    stats:[['14','cortes no rodízio'],['6h','de braseiro'],['120','lugares']],
    groups:[
      ['Cortes','Na brasa',[
        ['Picanha','Corte premium, sal grosso e farofa da casa','119'],
        ['Ancho','Bife alto, crosta caramelizada','129'],
        ['Costela de 8 horas','Assada lentamente, osso soltando','109'],
        ['Cordeiro','Paleta marinada em ervas','139']
      ]],
      ['Rodízio','Serviço corrido',[
        ['Rodízio completo','14 cortes, buffet de acompanhamentos e sobremesa','92'],
        ['Rodízio de almoço','Segunda a sexta, até 15h','68']
      ]],
      ['Acompanhamentos','Buffet do salão',[
        ['Farofa da casa','Bacon, cebola e castanha','—'],
        ['Vinagrete','Tomate, cebola e cheiro-verde','—'],
        ['Arroz carreteiro','Receita campeira','—']
      ]],
      ['Carta de vinhos','Selecionados',[
        ['Tinto argentino','Malbec · taça','48'],
        ['Tinto brasileiro','Cabernet · taça','44'],
        ['Caipirinha da casa','Cachaça envelhecida','32']
      ]]
    ],
    info:{ addr:'Rodovia BR-163, km 4 — Saída para Cuiabá', hours:'Qua a Dom · 11h30 às 15h e 18h às 23h', city:'Campo Grande, MS' },
    highlight:['Cortes selecionados diariamente','Salão para eventos e confraternizações','Estacionamento com manobrista'],
    aboutText:'No Corte & Fogo, a carne chega inteira e é desossada na casa. O braseiro acende às 6h e o rodízio só começa quando o primeiro corte está no ponto — nem antes, nem depois.',
    quote:'“Carne boa não se apressa, se respeita.”',
    tags:['Churrascaria','Rodízio','Eventos'],
    domain:'corteefogo.com.br', cta:'Reservar pelo WhatsApp', ctaShort:'Reservar'
  });

  S({
    id:'self-service', cat:'gastronomia', layout:'menu', theme:'sage', v:2,
    name:'Restaurante self-service', brand:'Sabor da Praça',
    kicker:'Comida caseira · Almoço executivo',
    head:'Comida de casa, servida no seu tempo.',
    lede:'Buffet fresco, grelhados na hora e aquele tempero de panela que resolve o almoço sem complicar o dia.',
    hero:'u:1504674900247-0877df9cc836',
    imgs:['u:1546069901-ba9599a7e63c','u:1567620905732-2d1ec7ab7445','u:1476224203421-9ac39bcb3327'],
    nav:['Almoço','Buffet','Marmitas','Endereço'],
    stats:[['28','itens no buffet'],['11h','abertura do almoço'],['5min','para retirar'],
    ],
    groups:[
      ['Buffet do dia','Servido até 15h',[
        ['Segunda','Arroz, feijão, bife acebolado, farofa e salada','24'],
        ['Terça','Feijoada completa com couve e laranja','28'],
        ['Quarta','Frango ao molho, purê e legumes','24'],
        ['Quinta','Costela com mandioca e arroz branco','29'],
        ['Sexta','Peixe na brasa com pirão e arroz','27']
      ]],
      ['Grelhados','Na hora, na chapa',[
        ['Filé de frango grelhado','Com dois acompanhamentos','27'],
        ['Picanha fatiada','Com arroz, farofa e vinagrete','39'],
        ['Filé de tilápia','Com legumes no vapor','32']
      ]],
      ['Marmitas','Para levar',[
        ['Marmita P','Arroz, feijão, uma proteína e duas guarnições','18'],
        ['Marmita G','Arroz, feijão, duas proteínas e três guarnições','24'],
        ['Marmita fitness','Arroz integral, frango grelhado e salada','26']
      ]],
      ['Sobremesas','Do dia',[
        ['Pudim de leite','Fatia generosa','8'],
        ['Doce de abóbora','Com queijo minas','8']
      ]]
    ],
    info:{ addr:'Rua 26 de Agosto, 640 — Centro', hours:'Seg a Sáb · 11h às 15h', city:'Campo Grande, MS' },
    highlight:['Buffet reposto durante todo o almoço','Marmitas com entrega no centro','Espaço climatizado'],
    aboutText:'O Sabor da Praça é o almoço de quem trabalha no centro: buffet farto, comida feita no dia e um cardápio que muda conforme o mercado. Simples, honesto e sempre quente.',
    quote:'“O melhor almoço é o que a gente come sem pressa.”',
    tags:['Comida caseira','Almoço','Marmitas'],
    domain:'sabordapraca.com.br', cta:'Encomendar pelo WhatsApp', ctaShort:'Encomendar'
  });

  S({
    id:'cafeteria', cat:'gastronomia', layout:'menu', theme:'ivory', v:3,
    name:'Cafeteria', brand:'Grão & Prosa',
    kicker:'Cafeteria de especialidade · Torra própria',
    head:'Café com origem, prosa sem pressa.',
    lede:'Grãos de pequenos produtores, torra semanal e métodos filtrados. Um lugar para trabalhar, encontrar e ficar mais um pouco.',
    hero:'u:1501339847302-ac426a4a7cbb',
    imgs:['u:1569529465841-dfecdab7503b','u:1476224203421-9ac39bcb3327','u:1504674900247-0877df9cc836'],
    nav:['Cafés','Métodos','Doces','A casa'],
    stats:[['6','origens de café'],['100%','torra própria'],['8h','abertura']],
    groups:[
      ['Cafés','Clássicos',[
        ['Espresso','Blend da casa · 30ml','9'],
        ['Cappuccino','Espresso, leite vaporizado e cacau','16'],
        ['Latte','Leite cremoso e arte no copo','17'],
        ['Coado na hora','Filtro melitta · 200ml','12']
      ]],
      ['Métodos','Para apreciar',[
        ['V60','Filtro pour over · grão da semana','18'],
        ['Prensa francesa','Corpo e aroma · 300ml','20'],
        ['Cold brew','Extraído a frio por 18 horas','19']
      ]],
      ['Doces','Da vitrine',[
        ['Croissant de manteiga','Fermentação de 24 horas','14'],
        ['Bolo de cenoura','Com cobertura de chocolate','12'],
        ['Cookie de chocolate','Com flor de sal','10']
      ]],
      ['Brunch','Até as 14h',[
        ['Ovos mexidos com brioche','Cebolete, manteiga e café ou suco','34'],
        ['Tapioca de queijo e tomate','Com orégano fresco','26']
      ]]
    ],
    info:{ addr:'Rua Pedro Celestino, 1550 — Amambaí', hours:'Seg a Sáb · 8h às 19h', city:'Campo Grande, MS' },
    highlight:['Torra própria semanalmente','Wi-Fi e tomadas nas mesas','Grãos à venda para levar'],
    aboutText:'A Grão & Prosa começou com uma torra caseira e uma mesa na calçada. Hoje é ponto de encontro de quem gosta de café bem feito e de conversa que rende.',
    quote:'“Café bom merece tempo. Conversa boa também.”',
    tags:['Cafeteria','Brunch','Trabalho remoto'],
    domain:'graoeprosa.com.br', cta:'Pedir pelo WhatsApp', ctaShort:'Pedir'
  });

  S({
    id:'delivery-comida', cat:'gastronomia', layout:'menu', theme:'warm', v:3,
    name:'Delivery de comida', brand:'Bistrô 67',
    kicker:'Cozinha rápida · Entrega própria',
    head:'Comida de bistrô entregue quente, em até 35 minutos.',
    lede:'Menu enxuto, produção por turno e entrega própria. Você acompanha o pedido do preparo até a porta.',
    hero:'u:1568909344668-6f14a07b56a0',
    imgs:['u:1571091718767-18b5b1457add','u:1594212699903-ec8a3eca50f5','u:1546069901-ba9599a7e63c'],
    nav:['Cardápio','Combos','Entrega','Pedidos'],
    stats:[['35','minutos em média'],['6','bairros atendidos'],['4.8','avaliação']],
    groups:[
      ['Mais pedidos','O que sai da cozinha toda hora',[
        ['Bowl do Bistrô','Arroz, frango grelhado, legumes e molho especial','32'],
        ['Burger da casa','Blend 160g, cheddar, cebola e batata rústica','38'],
        ['Massa ao pomodoro','Fettuccine, tomate fresco e parmesão','34']
      ]],
      ['Pratos','Do menu do dia',[
        ['Estrogonofe de frango','Com arroz e batata palha','29'],
        ['Salmão grelhado','Com arroz de brócolis e manteiga de limão','48'],
        ['Salada completa','Folhas, grão-de-bico, tomate e molho de mostarda','28']
      ]],
      ['Bebidas','Geladas',[
        ['Suco natural 500ml','Laranja, abacaxi ou maracujá','12'],
        ['Refrigerante 600ml','Garrafa','10'],
        ['Cerveja long neck','Puro malte','11']
      ]],
      ['Combos','Para o dia a dia',[
        ['Combo almoço','Prato + bebida + sobremesa do dia','39'],
        ['Combo casal','Dois pratos + duas bebidas','72']
      ]]
    ],
    info:{ addr:'Rua Aracaju, 420 — Santa Fé', hours:'Seg a Dom · 11h às 22h', city:'Campo Grande, MS' },
    highlight:['Entrega própria em 35 minutos','Rastreio do pedido pelo WhatsApp','Embalagem térmica'],
    aboutText:'O Bistrô 67 fez uma escolha: menu curto, produção ágil e entrega própria. Assim o prato sai do fogo e chega na sua porta ainda fumegando.',
    quote:'“Comida boa é a que chega quente.”',
    tags:['Delivery','Bistrô','Almoço'],
    domain:'bistro67.com.br', cta:'Pedir pelo WhatsApp', ctaShort:'Pedir agora'
  });
})();
