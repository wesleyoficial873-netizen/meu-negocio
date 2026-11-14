/* ============================================================
   Henrique — Sites & Catálogos Digitais
   Núcleo de dados: categorias, temas, biblioteca de imagens
   ============================================================ */
(function () {
  'use strict';

  window.WA_NUMBER = '5567999016886';
  window.WA_DEFAULT = 'Olá Henrique! Conheci seu portfólio e gostaria de conversar sobre um site ou catálogo digital.';

  /* Converte a referência curta em URL final.
     u:ID  -> fotografia Unsplash
     l:path -> fotografia local                                                        */
  function photo(ref, w) {
    if (!ref) return '';
    w = w || 1200;
    var extra = '';
    if (ref.indexOf('|') > -1) {
      var parts = ref.split('|');
      ref = parts[0];
      extra = '&' + parts.slice(1).join('&');
    }
    if (ref.indexOf('l:') === 0) return 'assets/img/' + ref.slice(2);
    if (ref.indexOf('u:') === 0) {
      return 'https://images.unsplash.com/photo-' + ref.slice(2) +
        '?auto=format&fit=crop&w=' + w + '&q=72' + extra;
    }
    if (ref.charAt(0) === '#' || ref.indexOf('assets/') === 0 || ref.indexOf('http') === 0) return ref;
    return ref;
  }
  window.photo = photo;

  /* ---------- Temas visuais das demonstrações ---------- */
  window.THEMES = {
    noir:    { bg:'#0a0a0b', surface:'#121214', ink:'#f6f1e9', muted:'#a49d93', accent:'#c9a86a', line:'rgba(255,255,255,.12)', radius:'2px',   display:"'Cormorant Garamond', Georgia, serif", body:"'Inter', sans-serif", caps:'.24em' },
    ivory:   { bg:'#f7f3ec', surface:'#fffdf9', ink:'#1b1712', muted:'#6f675c', accent:'#9a7b4f', line:'rgba(27,23,18,.14)',  radius:'4px',   display:"'Playfair Display', Georgia, serif",  body:"'Inter', sans-serif", caps:'.2em' },
    warm:    { bg:'#120c09', surface:'#1c1310', ink:'#f9ece2', muted:'#c0a898', accent:'#e2622f', line:'rgba(255,255,255,.12)', radius:'14px',  display:"'Bebas Neue', Impact, sans-serif",     body:"'Manrope', sans-serif", caps:'.12em' },
    ruby:    { bg:'#100708', surface:'#1b0d0f', ink:'#fdeff1', muted:'#c8a2a8', accent:'#e63946', line:'rgba(255,255,255,.12)', radius:'20px',  display:"'Outfit', sans-serif",                body:"'Manrope', sans-serif", caps:'.14em' },
    sage:    { bg:'#f1f4ee', surface:'#ffffff', ink:'#182115', muted:'#5f6b57', accent:'#496b34', line:'rgba(24,33,21,.13)',  radius:'8px',   display:"'Instrument Serif', Georgia, serif",  body:"'Manrope', sans-serif", caps:'.18em' },
    royal:   { bg:'#08130f', surface:'#0f1f18', ink:'#eef4ef', muted:'#9db2a5', accent:'#c8a96b', line:'rgba(255,255,255,.12)', radius:'6px',   display:"'Playfair Display', Georgia, serif",  body:"'Inter', sans-serif", caps:'.22em' },
    forest:  { bg:'#0b1410', surface:'#12211a', ink:'#eef5ee', muted:'#9db0a4', accent:'#8fc26a', line:'rgba(255,255,255,.12)', radius:'12px',  display:"'Space Grotesk', sans-serif",         body:"'Inter', sans-serif", caps:'.1em' },
    tech:    { bg:'#06080e', surface:'#0c1220', ink:'#eaf0fa', muted:'#8fa0b8', accent:'#5b8cff', line:'rgba(255,255,255,.12)', radius:'16px',  display:"'Space Grotesk', sans-serif",         body:"'Inter', sans-serif", caps:'.1em' },
    rose:    { bg:'#fbf4f3', surface:'#ffffff', ink:'#241a1c', muted:'#7f6b6e', accent:'#b4677a', line:'rgba(36,26,28,.12)',  radius:'22px',  display:"'Cormorant Garamond', Georgia, serif", body:"'Manrope', sans-serif", caps:'.22em' },
    sand:    { bg:'#efe9df', surface:'#faf7f1', ink:'#211c17', muted:'#6f6459', accent:'#8a6a3b', line:'rgba(33,28,23,.13)',  radius:'3px',   display:"'Instrument Serif', Georgia, serif",  body:"'Inter', sans-serif", caps:'.2em' },
    brutal:  { bg:'#0b0b0b', surface:'#141414', ink:'#f4f4f0', muted:'#a0a0a0', accent:'#d8ff45', line:'rgba(255,255,255,.14)', radius:'0px',   display:"'Space Grotesk', sans-serif",         body:"'Inter', sans-serif", caps:'.06em' },
    ocean:   { bg:'#060f16', surface:'#0b1924', ink:'#e9f3f8', muted:'#8ba7b6', accent:'#3fb8c9', line:'rgba(255,255,255,.12)', radius:'18px',  display:"'Outfit', sans-serif",                body:"'Manrope', sans-serif", caps:'.16em' },
    plum:    { bg:'#0c0912', surface:'#151022', ink:'#f2ecf8', muted:'#a79ab5', accent:'#a97bff', line:'rgba(255,255,255,.12)', radius:'24px',  display:"'Outfit', sans-serif",                body:"'Inter', sans-serif", caps:'.14em' },
    steel:   { bg:'#0d0f11', surface:'#15181b', ink:'#eef1f3', muted:'#97a1a8', accent:'#d8dee3', line:'rgba(255,255,255,.12)', radius:'4px',   display:"'Bebas Neue', Impact, sans-serif",     body:"'Inter', sans-serif", caps:'.14em' },
    clay:    { bg:'#1a100c', surface:'#251711', ink:'#fbeee4', muted:'#c3a695', accent:'#d98b4a', line:'rgba(255,255,255,.12)', radius:'10px',  display:"'Outfit', sans-serif",                body:"'Manrope', sans-serif", caps:'.14em' },
    mint:    { bg:'#f2f8f6', surface:'#ffffff', ink:'#132621', muted:'#5f7a72', accent:'#0f8f78', line:'rgba(19,38,33,.12)',  radius:'18px',  display:"'Manrope', sans-serif",               body:"'Inter', sans-serif", caps:'.16em' }
  };

  /* ---------- Categorias ---------- */
  window.CATEGORIES = [
    { key:'gastronomia', n:'01', name:'Restaurantes e Gastronomia', short:'Gastronomia',
      desc:'Cardápios digitais, vitrines de pratos, galerias e pedidos diretos pelo WhatsApp.',
      cover:'l:gastronomia/restaurante-sofisticado-hero.jpg',
      icon:'M6 3v8a3 3 0 0 0 6 0V3M9 11v10M20 3c-2 1-3 3-3 6v3h3v9' },
    { key:'lojas', n:'02', name:'Lojas e Comércio', short:'Lojas',
      desc:'Vitrines editoriais, coleções organizadas e catálogos com consulta de disponibilidade.',
      cover:'u:1483985988355-763728e1935b',
      icon:'M4 8h16l-1 12H5L4 8Zm4 0V6a4 4 0 0 1 8 0v2' },
    { key:'mercados', n:'03', name:'Mercados e Supermercados', short:'Mercados',
      desc:'Ofertas, corredores, produtos e listas de compra com envio do pedido pronto.',
      cover:'u:1542838132-92c53300491e',
      icon:'M3 5h2l2.4 10.4A2 2 0 0 0 9.4 17H18m-8 3h.01M18 20h.01M6 8h14l-1.5 6H7.5' },
    { key:'agro', n:'04', name:'Agronegócio', short:'Agronegócio',
      desc:'Catálogos técnicos, linhas de produtos, máquinas, insumos e solicitação de cotação.',
      cover:'u:1500382017468-9049fed747ef',
      icon:'M12 21V9m0 0c0-3 2-5 5-5 0 3-2 5-5 5Zm0 4c0-3-2-5-5-5 0 3 2 5 5 5Zm0 4c0-3 2-5 5-5 0 3-2 5-5 5Z' },
    { key:'beleza', n:'05', name:'Beleza e Estética', short:'Beleza',
      desc:'Serviços, profissionais, portfólio de trabalhos e agendamento pelo WhatsApp.',
      cover:'u:1560066984-138dadb4c035',
      icon:'M12 3l2.2 5.3 5.8.5-4.4 3.8 1.3 5.6L12 15.4 7.1 18.2l1.3-5.6L4 8.8l5.8-.5L12 3Z' },
    { key:'imoveis', n:'06', name:'Imóveis e Construção', short:'Imóveis',
      desc:'Galerias amplas, fichas de imóveis, características, localização e contato direto.',
      cover:'u:1600596542815-ffad4c1539a9',
      icon:'M4 11l8-7 8 7v9a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9Z' },
    { key:'automotivo', n:'07', name:'Automotivo', short:'Automotivo',
      desc:'Estoque de veículos, especificações, galerias e apresentação profissional.',
      cover:'u:1492144534655-ae79c964c9d7',
      icon:'M4 15h16M6 15V9l2-4h8l2 4v6M4 15v3h16v-3M7.5 18v2M16.5 18v2' },
    { key:'servicos', n:'08', name:'Serviços Profissionais', short:'Serviços',
      desc:'Autoridade, áreas de atuação, cases, equipe e captação de novos clientes.',
      cover:'u:1497366216548-37526070297c',
      icon:'M9 7V5h6v2m-9 0h12a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1Zm3 5h6' },
    { key:'eventos', n:'09', name:'Eventos e Entretenimento', short:'Eventos',
      desc:'Portfólio imersivo, ambientes, pacotes de serviço e orçamento pelo WhatsApp.',
      cover:'u:1519225421980-715cb0215aed',
      icon:'M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8L12 3Zm6 11l1 2.2 2.2 1-2.2 1-1 2.2-1-2.2-2.2-1 2.2-1 1-2.2Z' },
    { key:'hotelaria', n:'10', name:'Hotelaria e Turismo', short:'Hotelaria',
      desc:'Acomodações, experiências, estrutura e reservas com atendimento imediato.',
      cover:'u:1566073771259-6a8506099945',
      icon:'M3 18V8m0 5h18v5M3 18h18M7 13V9a1 1 0 0 1 1-1h5a2 2 0 0 1 2 2v3' }
  ];

  /* ---------- Normalizador de demonstrações ---------- */
  window.SEGMENTS = window.SEGMENTS || [];

  window.S = function (s) {
    var items = [];
    (s.groups || []).forEach(function (g) {
      var norm = { title: g[0], note: g[1] || '', items: [] };
      var list = g[2] || [];
      list.forEach(function (it) {
        if (typeof it === 'string') it = [it];
        norm.items.push({
          n: it[0] || '',
          d: it[1] || '',
          p: it[2] || '',
          tag: it[3] || '',
          img: it[4] ? photo(it[4]) : '',
          specs: it[5] || null
        });
      });
      items.push(norm);
    });

    var seg = {
      id: s.id,
      cat: s.cat,
      layout: s.layout,
      theme: s.theme || 'noir',
      v: s.v || 1,
      name: s.name,
      brand: s.brand,
      kicker: s.kicker || '',
      head: s.head || '',
      lede: s.lede || '',
      hero: photo(s.hero, 1600),
      heroRaw: s.hero,
      imgs: (s.imgs || []).map(function (i) { return photo(i, 900); }),
      nav: s.nav || ['Início', 'Catálogo', 'Sobre', 'Contato'],
      stats: s.stats || [],
      groups: items,
      cta: s.cta || 'Falar no WhatsApp',
      ctaShort: s.ctaShort || 'Solicitar',
      info: s.info || {},
      gallery: (s.gallery || s.imgs || []).map(function (i) { return photo(i, 1200); }),
      highlight: s.highlight || [],
      team: s.team || [],
      quote: s.quote || '',
      badge: s.badge || '',
      domain: s.domain || '',
      tags: s.tags || [],
      galleryTitle: s.galleryTitle || 'Galeria',
      aboutTitle: s.aboutTitle || 'Sobre',
      aboutText: s.aboutText || '',
      featureTitle: s.featureTitle || '',
      orderLabel: s.orderLabel || 'Pedido'
    };

    window.SEGMENTS.push(seg);
    return seg;
  };
})();
