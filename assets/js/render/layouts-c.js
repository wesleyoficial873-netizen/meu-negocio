/* ============================================================
   Layouts: events · stay · catalog
   ============================================================ */
(function () {
  'use strict';
  var R = window.R;

  /* ---------------------------------------------------------
     9. EVENTS — buffet, decoração, espaço, fotografia, DJ
     --------------------------------------------------------- */
  R.events = function (seg) {
    var formats = seg.groups.map(function (g, gi) {
      return '<div class="dx-events-group" data-dx-group="' + gi + '">' +
        R.groupHead(g, gi) +
        '<div class="dx-event-grid">' +
          g.items.map(function (it, ii) {
            return '<article class="dx-event-card">' +
              '<h3>' + R.esc(it.n) + '</h3>' +
              (it.d ? '<p>' + R.esc(it.d) + '</p>' : '') +
              '<div class="dx-event-foot">' +
                '<span>' + (it.p && it.p !== '—' ? 'R$ ' + R.esc(it.p) : 'Sob consulta') + '</span>' +
                '<button class="dx-btn dx-btn-line" data-wa-item="' + R.esc(it.n) + '">Solicitar</button>' +
              '</div>' +
            '</article>';
          }).join('') +
        '</div>' +
      '</div>';
    }).join('');

    return '<div class="demo demo--events theme-' + seg.theme + ' v' + seg.v + '">' +
      R.nav(seg) +
      '<section class="dx-hero" id="dx-s0">' +
        '<div class="dx-hero-media">' + R.pic(seg.hero, '', seg.brand, true) + '<span class="dx-hero-veil"></span></div>' +
        '<div class="dx-hero-copy">' +
          '<span class="dx-eyebrow">' + R.esc(seg.kicker) + '</span>' +
          '<h1>' + R.esc(seg.brand) + '</h1>' +
          '<p class="dx-hero-head">' + R.esc(seg.head) + '</p>' +
          '<p class="dx-lede">' + R.esc(seg.lede) + '</p>' +
          R.heroActions(seg, seg.cta, 'Ver projetos') +
        '</div>' +
        R.stats(seg) +
      '</section>' +
      '<section class="dx-section dx-gallery-section" id="dx-s1">' +
        '<div class="dx-section-head"><span class="dx-eyebrow">Portfólio</span><h2>Projetos que já aconteceram</h2></div>' +
        R.gallery(seg, 3) +
      '</section>' +
      '<section class="dx-section" id="dx-s2">' +
        '<div class="dx-section-head"><span class="dx-eyebrow">Formatos</span><h2>Do conceito à montagem</h2>' +
        '<p>' + R.esc(seg.aboutText) + '</p></div>' +
        R.chips(seg, 'Todos') + formats +
        R.quote(seg) +
      '</section>' +
      R.infoBlock(seg) +
      R.footer(seg) +
    '</div>';
  };

  /* ---------------------------------------------------------
     10. STAY — hotel, pousada, chalés, temporada
     --------------------------------------------------------- */
  R.stay = function (seg) {
    var rooms = seg.groups.map(function (g, gi) {
      return '<div class="dx-stay-group" data-dx-group="' + gi + '">' +
        R.groupHead(g, gi) +
        '<div class="dx-room-grid">' +
          g.items.map(function (it, ii) {
            var img = it.img || seg.imgs[ii % seg.imgs.length];
            return '<article class="dx-room">' +
              '<div class="dx-room-media">' + R.pic(img, '', it.n) +
                (it.tag ? '<span class="dx-room-tag">' + R.esc(it.tag) + '</span>' : '') + '</div>' +
              '<div class="dx-room-body">' +
                '<h3>' + R.esc(it.n) + '</h3>' +
                '<p>' + R.esc(it.d) + '</p>' +
                '<div class="dx-room-foot"><span>' + (it.p && it.p !== '—' ? 'R$ ' + R.esc(it.p) + ' / diária' : 'Diária sob consulta') + '</span>' +
                  '<button class="dx-btn dx-btn-line" data-wa-item="' + R.esc(it.n) + '">Reservar</button></div>' +
              '</div>' +
            '</article>';
          }).join('') +
        '</div>' +
      '</div>';
    }).join('');

    return '<div class="demo demo--stay theme-' + seg.theme + ' v' + seg.v + '">' +
      R.nav(seg) +
      '<section class="dx-hero" id="dx-s0">' +
        '<div class="dx-hero-media">' + R.pic(seg.hero, '', seg.brand, true) + '<span class="dx-hero-veil"></span></div>' +
        '<div class="dx-hero-copy">' +
          '<span class="dx-eyebrow">' + R.esc(seg.kicker) + '</span>' +
          '<h1>' + R.esc(seg.brand) + '</h1>' +
          '<p class="dx-hero-head">' + R.esc(seg.head) + '</p>' +
          '<p class="dx-lede">' + R.esc(seg.lede) + '</p>' +
          R.heroActions(seg, seg.cta, 'Ver acomodações') +
        '</div>' +
        '<form class="dx-bookbar" data-dx-booking>' +
          '<label><span>Entrada</span><input type="date" name="data" required></label>' +
          '<label><span>Saída</span><input type="date" name="saida"></label>' +
          '<label><span>Hóspedes</span><select name="hospedes"><option>1 hóspede</option><option>2 hóspedes</option><option>3 hóspedes</option><option>4 hóspedes</option></select></label>' +
          '<button type="submit" class="dx-btn dx-btn-primary">Consultar disponibilidade</button>' +
        '</form>' +
      '</section>' +
      R.highlightStrip(seg) +
      '<section class="dx-section" id="dx-s1">' +
        '<div class="dx-section-head"><span class="dx-eyebrow">Acomodações</span><h2>Onde você vai dormir</h2>' +
        '<p>' + R.esc(seg.aboutText) + '</p></div>' +
        R.chips(seg, 'Todas') + rooms +
      '</section>' +
      '<section class="dx-section dx-amenities">' +
        '<div class="dx-section-head"><span class="dx-eyebrow">Estrutura</span><h2>Tudo incluído na estadia</h2></div>' +
        '<div class="dx-amenity-grid">' + seg.highlight.concat(seg.stats.map(function (s) { return s[0] + ' ' + s[1]; })).map(function (h) {
          return '<div class="dx-amenity"><span class="dx-amenity-icon">✦</span><p>' + R.esc(h) + '</p></div>';
        }).join('') + '</div>' +
      '</section>' +
      '<section class="dx-section dx-gallery-section" id="dx-s2">' +
        '<div class="dx-section-head"><span class="dx-eyebrow">Galeria</span><h2>Por aqui</h2></div>' +
        R.gallery(seg, 3) + R.quote(seg) +
      '</section>' +
      R.infoBlock(seg) +
      R.footer(seg) +
    '</div>';
  };

  /* ---------------------------------------------------------
     11. CATALOG — catálogos digitais (páginas)
     --------------------------------------------------------- */
  R.catalog = function (seg) {
    var pages = [];

    pages.push('<div class="dx-page dx-page-cover is-active" data-page="0">' +
      '<div class="dx-page-media">' + R.pic(seg.hero, '', seg.brand, true) + '</div>' +
      '<div class="dx-page-copy">' +
        '<span class="dx-page-kicker">' + R.esc(seg.kicker) + '</span>' +
        '<h1>' + R.esc(seg.brand) + '</h1>' +
        '<p class="dx-page-head">' + R.esc(seg.head) + '</p>' +
        '<p class="dx-page-lede">' + R.esc(seg.lede) + '</p>' +
        '<div class="dx-page-meta"><span>Catálogo digital</span><span>' + R.esc(seg.tags.join(' · ')) + '</span></div>' +
        '<button class="dx-btn dx-btn-primary" data-page-next>Abrir catálogo</button>' +
      '</div>' +
    '</div>');

    seg.groups.forEach(function (g, gi) {
      pages.push('<div class="dx-page" data-page="' + (gi + 1) + '">' +
        '<div class="dx-page-head-row"><span class="dx-page-num">' + (gi + 2 < 10 ? '0' : '') + (gi + 2) + '</span>' +
          '<h2>' + R.esc(g.title) + '</h2>' +
          (g.note ? '<span class="dx-page-note">' + R.esc(g.note) + '</span>' : '') + '</div>' +
        '<div class="dx-page-grid">' +
          g.items.map(function (it, ii) {
            var img = it.img || seg.imgs[(gi + ii) % seg.imgs.length];
            return '<article class="dx-page-item">' +
              '<div class="dx-page-item-media">' + R.pic(img, '', it.n) + '</div>' +
              '<div class="dx-page-item-body"><h3>' + R.esc(it.n) + '</h3>' +
                (it.d ? '<p>' + R.esc(it.d) + '</p>' : '') +
                '<div class="dx-page-item-foot"><span>' + (it.p && it.p !== '—' ? 'R$ ' + R.esc(it.p) : 'Sob consulta') + '</span>' +
                '<button data-wa-item="' + R.esc(it.n) + '">Consultar</button></div>' +
              '</div>' +
            '</article>';
          }).join('') +
        '</div>' +
      '</div>');
    });

    pages.push('<div class="dx-page dx-page-end" data-page="' + (seg.groups.length + 1) + '">' +
      '<div class="dx-page-end-inner">' +
        '<span class="dx-page-kicker">Encerramento</span>' +
        '<h2>Vamos conversar sobre a sua próxima coleção?</h2>' +
        '<p>' + R.esc(seg.aboutText) + '</p>' +
        '<div class="dx-actions">' + R.waBtn(seg, 'Falar com ' + seg.brand, 'dx-btn-primary') +
          '<a class="dx-btn dx-btn-ghost" data-page-prev>Voltar páginas</a></div>' +
        '<div class="dx-page-contacts"><span>' + R.esc(seg.info.addr) + '</span><span>' + R.esc(seg.info.hours) + '</span></div>' +
      '</div>' +
    '</div>');

    return '<div class="demo demo--catalog theme-' + seg.theme + ' v' + seg.v + '">' +
      R.nav(seg) +
      '<div class="dx-catalog" data-dx-catalog>' +
        '<div class="dx-catalog-pages">' + pages.join('') + '</div>' +
        '<div class="dx-catalog-nav">' +
          '<button class="dx-cat-prev" data-page-prev aria-label="Página anterior">‹</button>' +
          '<div class="dx-cat-dots">' + pages.map(function (p, i) {
            return '<button data-page-go="' + i + '" class="' + (i === 0 ? 'is-active' : '') + '" aria-label="Ir para página ' + (i + 1) + '"></button>';
          }).join('') + '</div>' +
          '<span class="dx-cat-count"><b data-page-current>1</b> / ' + pages.length + '</span>' +
          '<button class="dx-cat-next" data-page-next aria-label="Próxima página">›</button>' +
        '</div>' +
      '</div>' +
      '<section class="dx-section dx-catalog-info">' +
        '<div><span class="dx-eyebrow">Sobre este catálogo</span><h2>' + R.esc(seg.brand) + '</h2>' +
        '<p>' + R.esc(seg.aboutText) + '</p></div>' +
        '<ul class="dx-checks">' + seg.highlight.map(function (h) { return '<li>' + R.esc(h) + '</li>'; }).join('') + '</ul>' +
      '</section>' +
      R.footer(seg) +
    '</div>';
  };
})();
