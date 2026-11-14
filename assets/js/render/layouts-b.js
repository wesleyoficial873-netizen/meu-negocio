/* ============================================================
   Layouts: beauty · estate · auto · pro
   ============================================================ */
(function () {
  'use strict';
  var R = window.R;

  /* ---------------------------------------------------------
     5. BEAUTY — salão, barbearia, estética, unhas, make
     --------------------------------------------------------- */
  R.beauty = function (seg) {
    var groups = seg.groups.map(function (g, gi) {
      return '<div class="dx-beauty-group" data-dx-group="' + gi + '">' +
        R.groupHead(g, gi) +
        '<ul class="dx-service-list">' +
          g.items.map(function (it) {
            return '<li>' +
              '<div class="dx-service-text"><h3>' + R.esc(it.n) + (it.tag ? '<em>' + R.esc(it.tag) + '</em>' : '') + '</h3>' +
                (it.d ? '<p>' + R.esc(it.d) + '</p>' : '') + '</div>' +
              '<span class="dx-service-price">' + (it.p && it.p !== '—' ? 'R$ ' + R.esc(it.p) : 'Sob consulta') + '</span>' +
              '<button class="dx-btn dx-btn-line" data-wa-item="' + R.esc(it.n) + '">Agendar</button>' +
            '</li>';
          }).join('') +
        '</ul>' +
      '</div>';
    }).join('');

    var team = seg.team && seg.team.length ?
      '<section class="dx-section dx-team"><div class="dx-section-head"><span class="dx-eyebrow">Equipe</span><h2>Quem cuida de você</h2></div>' +
        '<div class="dx-team-grid">' + seg.team.map(function (t) {
          return '<article class="dx-member"><div class="dx-member-photo">' + R.pic(window.photo(t[2], 600), '', t[0]) + '</div>' +
            '<h3>' + R.esc(t[0]) + '</h3><p>' + R.esc(t[1]) + '</p></article>';
        }).join('') + '</div></section>' : '';

    return '<div class="demo demo--beauty theme-' + seg.theme + ' v' + seg.v + '">' +
      R.nav(seg) +
      '<section class="dx-hero" id="dx-s0">' +
        '<div class="dx-hero-copy">' +
          '<span class="dx-eyebrow">' + R.esc(seg.kicker) + '</span>' +
          '<h1>' + R.esc(seg.brand) + '</h1>' +
          '<p class="dx-hero-head">' + R.esc(seg.head) + '</p>' +
          '<p class="dx-lede">' + R.esc(seg.lede) + '</p>' +
          R.heroActions(seg, 'Agendar pelo WhatsApp', 'Ver serviços') +
          R.stats(seg) +
        '</div>' +
        '<div class="dx-hero-media">' + R.pic(seg.hero, '', seg.brand, true) +
          '<span class="dx-hero-seal">' + R.esc(seg.tags[0] || 'Studio') + '</span>' +
        '</div>' +
      '</section>' +
      R.highlightStrip(seg) +
      '<section class="dx-section" id="dx-s1">' +
        '<div class="dx-section-head"><span class="dx-eyebrow">Serviços</span><h2>Nossos serviços</h2>' +
        '<p>' + R.esc(seg.aboutText) + '</p></div>' +
        R.chips(seg, 'Todos') + groups +
      '</section>' +
      team +
      R.booking(seg, { kicker: 'Agenda', title: 'Reserve seu horário', text: 'Escolha a data e o serviço. Retornamos pelo WhatsApp para confirmar o melhor horário.' }) +
      '<section class="dx-section dx-gallery-section" id="dx-s2">' +
        '<div class="dx-section-head"><span class="dx-eyebrow">Portfólio</span><h2>Trabalhos recentes</h2></div>' +
        R.gallery(seg, 3) + R.quote(seg) +
      '</section>' +
      R.footer(seg) +
    '</div>';
  };

  /* ---------------------------------------------------------
     6. ESTATE — imóveis, construtora, arquitetura, planejados
     --------------------------------------------------------- */
  R.estate = function (seg) {
    var groups = seg.groups.map(function (g, gi) {
      return '<div class="dx-estate-group" data-dx-group="' + gi + '">' +
        R.groupHead(g, gi) +
        '<div class="dx-estate-grid">' +
          g.items.map(function (it, ii) {
            var img = it.img || seg.imgs[ii % seg.imgs.length];
            var specs = it.specs || ['3 quartos', (120 + ii * 32) + 'm²', '2 vagas'];
            return '<article class="dx-estate-card">' +
              '<div class="dx-estate-media">' + R.pic(img, '', it.n) +
                (it.tag ? '<span class="dx-estate-tag">' + R.esc(it.tag) + '</span>' : '') +
                '<button class="dx-estate-fav" aria-label="Salvar imóvel" data-fav>♡</button>' +
              '</div>' +
              '<div class="dx-estate-body">' +
                '<h3>' + R.esc(it.n) + '</h3>' +
                '<p>' + R.esc(it.d) + '</p>' +
                '<ul class="dx-specs">' + specs.map(function (s) { return '<li>' + R.esc(s) + '</li>'; }).join('') + '</ul>' +
                '<div class="dx-estate-foot"><span>' + (it.p && it.p !== '—' ? 'R$ ' + R.esc(it.p) : 'Valor sob consulta') + '</span>' +
                  '<button class="dx-btn dx-btn-line" data-wa-item="' + R.esc(it.n) + '">Agendar visita</button></div>' +
              '</div>' +
            '</article>';
          }).join('') +
        '</div>' +
      '</div>';
    }).join('');

    return '<div class="demo demo--estate theme-' + seg.theme + ' v' + seg.v + '">' +
      R.nav(seg) +
      '<section class="dx-hero" id="dx-s0">' +
        '<div class="dx-hero-media">' + R.pic(seg.hero, '', seg.brand, true) +
          '<div class="dx-hero-tag">' + R.esc(seg.kicker) + '</div>' +
        '</div>' +
        '<div class="dx-hero-copy">' +
          '<span class="dx-eyebrow">' + R.esc(seg.kicker) + '</span>' +
          '<h1>' + R.esc(seg.head) + '</h1>' +
          '<p class="dx-lede">' + R.esc(seg.lede) + '</p>' +
          R.heroActions(seg, seg.cta, 'Ver imóveis') +
          R.stats(seg) +
        '</div>' +
      '</section>' +
      R.highlightStrip(seg) +
      '<section class="dx-section" id="dx-s1">' +
        '<div class="dx-section-head"><span class="dx-eyebrow">Portfólio</span><h2>Seleção de ' + R.esc(seg.brand) + '</h2>' +
        '<p>' + R.esc(seg.aboutText) + '</p></div>' +
        R.chips(seg, 'Todos') + groups +
      '</section>' +
      '<section class="dx-section dx-gallery-section" id="dx-s2">' +
        '<div class="dx-section-head"><span class="dx-eyebrow">Galeria</span><h2>Detalhes que fazem diferença</h2></div>' +
        R.gallery(seg, 3) + R.quote(seg) +
      '</section>' +
      R.infoBlock(seg) +
      R.footer(seg) +
    '</div>';
  };

  /* ---------------------------------------------------------
     7. AUTO — revenda, concessionária, oficina, peças, estética
     --------------------------------------------------------- */
  R.auto = function (seg) {
    var groups = seg.groups.map(function (g, gi) {
      return '<div class="dx-auto-group" data-dx-group="' + gi + '">' +
        R.groupHead(g, gi) +
        '<div class="dx-auto-grid">' +
          g.items.map(function (it, ii) {
            var img = it.img || seg.imgs[ii % seg.imgs.length];
            var specs = it.specs || ['Automático', (2020 + (ii % 5)) + ' · ' + (30 + ii * 14) + '.000 km', 'Único dono'];
            return '<article class="dx-car">' +
              '<div class="dx-car-media">' + R.pic(img, '', it.n) +
                (it.tag ? '<span class="dx-car-tag">' + R.esc(it.tag) + '</span>' : '') +
                '<button class="dx-car-photo" data-dx-photo="' + R.esc(img) + '">Ver fotos</button>' +
              '</div>' +
              '<div class="dx-car-body">' +
                '<h3>' + R.esc(it.n) + '</h3>' +
                '<p>' + R.esc(it.d) + '</p>' +
                '<ul class="dx-car-specs">' + specs.map(function (s) { return '<li><span>' + R.esc(s) + '</span></li>'; }).join('') + '</ul>' +
                '<div class="dx-car-foot"><span class="dx-car-price">' + (it.p && it.p !== '—' ? 'R$ ' + R.esc(it.p) : 'Sob consulta') + '</span>' +
                  '<button class="dx-btn dx-btn-primary dx-btn-sm" data-wa-item="' + R.esc(it.n) + '">Consultar</button></div>' +
              '</div>' +
            '</article>';
          }).join('') +
        '</div>' +
      '</div>';
    }).join('');

    return '<div class="demo demo--auto theme-' + seg.theme + ' v' + seg.v + '">' +
      R.nav(seg) +
      '<section class="dx-hero" id="dx-s0">' +
        '<div class="dx-hero-media">' + R.pic(seg.hero, '', seg.brand, true) + '</div>' +
        '<div class="dx-hero-copy">' +
          '<span class="dx-eyebrow">' + R.esc(seg.kicker) + '</span>' +
          '<h1>' + R.esc(seg.brand) + '</h1>' +
          '<p class="dx-hero-head">' + R.esc(seg.head) + '</p>' +
          '<p class="dx-lede">' + R.esc(seg.lede) + '</p>' +
          R.heroActions(seg, seg.cta, 'Ver estoque') +
          R.stats(seg) +
        '</div>' +
      '</section>' +
      R.highlightStrip(seg) +
      '<section class="dx-section" id="dx-s1">' +
        '<div class="dx-section-head"><span class="dx-eyebrow">Estoque</span><h2>Disponível agora</h2>' +
        '<p>' + R.esc(seg.aboutText) + '</p></div>' +
        R.chips(seg, 'Todos') + groups +
      '</section>' +
      '<section class="dx-section dx-gallery-section" id="dx-s2">' +
        '<div class="dx-section-head"><span class="dx-eyebrow">Galeria</span><h2>Na loja</h2></div>' +
        R.gallery(seg, 3) + R.quote(seg) +
      '</section>' +
      R.infoBlock(seg) +
      R.footer(seg) +
    '</div>';
  };

  /* ---------------------------------------------------------
     8. PRO — serviços profissionais, advocacia, consultoria
     --------------------------------------------------------- */
  R.pro = function (seg) {
    var groups = seg.groups.map(function (g, gi) {
      return '<div class="dx-pro-group" data-dx-group="' + gi + '">' +
        R.groupHead(g, gi) +
        '<div class="dx-pro-services">' +
          g.items.map(function (it, ii) {
            return '<article class="dx-service">' +
              '<span class="dx-service-num">' + (gi + 1 < 10 ? '0' : '') + (gi + 1) + '.' + (ii + 1) + '</span>' +
              '<div class="dx-service-body"><h3>' + R.esc(it.n) + '</h3><p>' + R.esc(it.d) + '</p></div>' +
              '<button class="dx-service-arrow" data-wa-item="' + R.esc(it.n) + '" aria-label="Falar sobre ' + R.esc(it.n) + '">→</button>' +
            '</article>';
          }).join('') +
        '</div>' +
      '</div>';
    }).join('');

    return '<div class="demo demo--pro theme-' + seg.theme + ' v' + seg.v + '">' +
      R.nav(seg) +
      '<section class="dx-hero" id="dx-s0">' +
        '<div class="dx-hero-copy">' +
          '<span class="dx-eyebrow">' + R.esc(seg.kicker) + '</span>' +
          '<h1>' + R.esc(seg.head) + '</h1>' +
          '<p class="dx-lede">' + R.esc(seg.lede) + '</p>' +
          R.heroActions(seg, seg.cta, 'Conhecer os serviços') +
          R.stats(seg) +
        '</div>' +
        '<div class="dx-hero-media">' + R.pic(seg.hero, '', seg.brand, true) + '</div>' +
      '</section>' +
      '<div class="dx-pro-band"><div class="dx-pro-band-track">' +
        seg.highlight.concat(seg.highlight).map(function (h) { return '<span>' + R.esc(h) + '</span><i></i>'; }).join('') +
      '</div></div>' +
      '<section class="dx-section" id="dx-s1">' +
        '<div class="dx-section-head"><span class="dx-eyebrow">Atuação</span><h2>Como podemos ajudar</h2>' +
        '<p>' + R.esc(seg.aboutText) + '</p></div>' +
        '<div class="dx-pro-tabs">' + R.chips(seg, 'Todos os serviços') + '</div>' +
        groups +
      '</section>' +
      '<section class="dx-section dx-gallery-section" id="dx-s2">' +
        '<div class="dx-section-head"><span class="dx-eyebrow">Escritório</span><h2>Nosso ambiente</h2></div>' +
        R.gallery(seg, 3) + R.quote(seg) +
      '</section>' +
      R.booking(seg, { kicker: 'Contato', title: 'Agende uma conversa', text: 'Escolha o melhor dia e horário. Retornamos para confirmar o encontro, presencial ou por vídeo.', label: 'Agendar conversa' }) +
      R.footer(seg) +
    '</div>';
  };
})();
