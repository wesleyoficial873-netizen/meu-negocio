/* ============================================================
   Layouts: menu · retail · market · agro
   ============================================================ */
(function () {
  'use strict';
  var R = window.R;

  /* ---------------------------------------------------------
     1. MENU — restaurantes, pizzarias, cafeterias, delivery
     --------------------------------------------------------- */
  R.menu = function (seg) {
    var featured = [];
    seg.groups.forEach(function (g) { g.items.forEach(function (it) { if (it.img) featured.push(it); }); });
    if (featured.length < 3) {
      seg.imgs.forEach(function (src, i) {
        featured.push({ n: seg.groups[0].items[i] ? seg.groups[0].items[i].n : seg.name, d: '', img: src, p: '' });
      });
    }
    featured = featured.slice(0, 3);

    var menuSections = seg.groups.map(function (g, gi) {
      return '<div class="dx-menu-group" data-dx-group="' + gi + '">' +
        R.groupHead(g, gi) +
        '<ul class="dx-menu-list">' +
          g.items.map(function (it) {
            return '<li>' +
              (it.img ? '<span class="dx-menu-thumb">' + R.pic(it.img, '', it.n) + '</span>' : '') +
              '<div class="dx-menu-text"><h4>' + R.esc(it.n) + (it.tag ? '<em>' + R.esc(it.tag) + '</em>' : '') + '</h4>' +
                (it.d ? '<p>' + R.esc(it.d) + '</p>' : '') + '</div>' +
              '<span class="dx-menu-dots" aria-hidden="true"></span>' +
              R.price(it.p) +
            '</li>';
          }).join('') +
        '</ul>' +
      '</div>';
    }).join('');

    return '<div class="demo demo--menu theme-' + seg.theme + ' v' + seg.v + '">' +
      R.nav(seg) +
      '<section class="dx-hero" id="dx-s0">' +
        '<div class="dx-hero-media">' +
          R.pic(seg.hero, '', seg.brand, true) +
          '<div class="dx-hero-tag">' + R.esc(seg.kicker) + '</div>' +
        '</div>' +
        '<div class="dx-hero-copy">' +
          '<span class="dx-eyebrow">' + R.esc(seg.kicker) + '</span>' +
          '<h1>' + R.esc(seg.brand) + '</h1>' +
          '<p class="dx-hero-head">' + R.esc(seg.head) + '</p>' +
          '<p class="dx-lede">' + R.esc(seg.lede) + '</p>' +
          R.heroActions(seg, seg.cta, 'Ver o cardápio') +
          R.stats(seg) +
        '</div>' +
      '</section>' +
      '<div class="dx-marquee" aria-hidden="true"><div>' +
        seg.highlight.concat(seg.highlight).map(function (h) { return '<span>' + R.esc(h) + '</span><i></i>'; }).join('') +
      '</div></div>' +
      '<section class="dx-section dx-featured" id="dx-s1">' +
        '<div class="dx-section-head">' +
          '<span class="dx-eyebrow">Destaques da casa</span>' +
          '<h2>O que sai da cozinha primeiro</h2>' +
          '<p>' + R.esc(seg.lede) + '</p>' +
        '</div>' +
        '<div class="dx-featured-grid">' +
          featured.map(function (it) {
            return '<article class="dx-dish">' +
              '<div class="dx-dish-media">' + R.pic(it.img, '', it.n) + '</div>' +
              '<div class="dx-dish-body"><h3>' + R.esc(it.n) + '</h3>' +
              (it.d ? '<p>' + R.esc(it.d) + '</p>' : '') + R.price(it.p) + '</div>' +
            '</article>';
          }).join('') +
        '</div>' +
      '</section>' +
      '<section class="dx-section dx-menu">' +
        '<div class="dx-section-head">' +
          '<span class="dx-eyebrow">Cardápio</span>' +
          '<h2>Escolha por categoria</h2>' +
        '</div>' +
        R.chips(seg, 'Tudo') +
        '<div class="dx-menu-grid">' + menuSections + '</div>' +
      '</section>' +
      '<section class="dx-section dx-gallery-section" id="dx-s2">' +
        '<div class="dx-section-head"><span class="dx-eyebrow">Galeria</span><h2>Um pouco do ambiente</h2></div>' +
        R.gallery(seg, 3) +
        R.quote(seg) +
      '</section>' +
      R.infoBlock(seg) +
      R.footer(seg) +
    '</div>';
  };

  /* ---------------------------------------------------------
     2. RETAIL — lojas e comércio
     --------------------------------------------------------- */
  R.retail = function (seg) {
    var all = [];
    seg.groups.forEach(function (g, gi) { g.items.forEach(function (it, ii) { all.push({ it: it, gi: gi, ii: ii }); }); });

    var grid = seg.groups.map(function (g, gi) {
      return '<div class="dx-retail-group" data-dx-group="' + gi + '">' +
        R.groupHead(g, gi) +
        '<div class="dx-product-grid">' +
          g.items.map(function (it, ii) {
            var img = it.img || seg.imgs[(gi + ii) % seg.imgs.length];
            var alt = seg.imgs[(gi + ii + 1) % seg.imgs.length];
            return '<article class="dx-product">' +
              '<div class="dx-product-media">' +
                R.pic(img, 'dx-pimg-a', it.n) +
                (alt ? R.pic(alt, 'dx-pimg-b', '') : '') +
                (it.tag ? '<span class="dx-product-tag">' + R.esc(it.tag) + '</span>' : '') +
                '<button class="dx-product-quick" data-wa-item="' + R.esc(it.n) + '">Consultar disponibilidade</button>' +
              '</div>' +
              '<div class="dx-product-body">' +
                '<h3>' + R.esc(it.n) + '</h3>' +
                (it.d ? '<p>' + R.esc(it.d) + '</p>' : '') +
                '<div class="dx-product-foot">' + R.price(it.p) +
                  '<button class="dx-product-ask" data-wa-item="' + R.esc(it.n) + '">Consultar</button>' +
                '</div>' +
              '</div>' +
            '</article>';
          }).join('') +
        '</div>' +
      '</div>';
    }).join('');

    return '<div class="demo demo--retail theme-' + seg.theme + ' v' + seg.v + '">' +
      R.nav(seg) +
      '<section class="dx-hero" id="dx-s0">' +
        '<div class="dx-hero-copy">' +
          '<span class="dx-eyebrow">' + R.esc(seg.kicker) + '</span>' +
          '<h1>' + R.esc(seg.brand) + '</h1>' +
          '<p class="dx-hero-head">' + R.esc(seg.head) + '</p>' +
          '<p class="dx-lede">' + R.esc(seg.lede) + '</p>' +
          R.heroActions(seg, seg.cta, 'Ver a coleção') +
          R.stats(seg) +
        '</div>' +
        '<div class="dx-hero-media">' +
          R.pic(seg.hero, '', seg.brand, true) +
          '<span class="dx-vertical-tag">' + R.esc(seg.tags[0] || 'Coleção') + '</span>' +
        '</div>' +
      '</section>' +
      R.highlightStrip(seg) +
      '<section class="dx-section" id="dx-s1">' +
        '<div class="dx-section-head"><span class="dx-eyebrow">Coleção</span><h2>Peças selecionadas</h2></div>' +
        R.chips(seg, 'Tudo') +
        grid +
      '</section>' +
      '<section class="dx-section dx-lookbook">' +
        '<div class="dx-lookbook-media">' + R.pic(seg.imgs[0], '', seg.brand) + R.pic(seg.imgs[1] || seg.hero, '', seg.brand) + '</div>' +
        '<div class="dx-lookbook-copy">' +
          '<span class="dx-eyebrow">' + R.esc(seg.aboutTitle) + '</span>' +
          '<h2>' + R.esc(seg.head) + '</h2>' +
          '<p>' + R.esc(seg.aboutText || seg.lede) + '</p>' +
          '<ul class="dx-checks">' + seg.highlight.map(function (h) { return '<li>' + R.esc(h) + '</li>'; }).join('') + '</ul>' +
          R.waBtn(seg, seg.cta, 'dx-btn-primary') +
        '</div>' +
      '</section>' +
      '<section class="dx-section dx-gallery-section" id="dx-s2">' +
        '<div class="dx-section-head"><span class="dx-eyebrow">Galeria</span><h2>Vitrine da loja</h2></div>' +
        R.gallery(seg, 3) +
      '</section>' +
      R.infoBlock(seg) +
      R.footer(seg) +
    '</div>';
  };

  /* ---------------------------------------------------------
     3. MARKET — mercados, açougue, bebidas, conveniência
     --------------------------------------------------------- */
  R.market = function (seg) {
    var groups = seg.groups.map(function (g, gi) {
      return '<div class="dx-market-group" data-dx-group="' + gi + '">' +
        R.groupHead(g, gi) +
        '<div class="dx-market-grid">' +
          g.items.map(function (it) {
            return '<article class="dx-sku">' +
              '<div class="dx-sku-top">' +
                (it.tag ? '<span class="dx-sku-tag">' + R.esc(it.tag) + '</span>' : '') +
                '<span class="dx-sku-unit">' + R.esc(it.d) + '</span>' +
              '</div>' +
              '<h3>' + R.esc(it.n) + '</h3>' +
              '<div class="dx-sku-foot">' + R.price(it.p) +
                '<button class="dx-add" data-add="' + R.esc(it.n) + '" data-add-price="' + R.esc(it.p) + '" aria-label="Adicionar ' + R.esc(it.n) + ' à lista">+</button>' +
              '</div>' +
            '</article>';
          }).join('') +
        '</div>' +
      '</div>';
    }).join('');

    return '<div class="demo demo--market theme-' + seg.theme + ' v' + seg.v + '">' +
      '<div class="dx-topbar"><span>' + R.esc(seg.info.hours || 'Aberto hoje') + '</span><span class="dx-topbar-sep"></span><span>' + R.esc(seg.info.addr || seg.info.city || '') + '</span><a href="' + R.wa(R.demoMsg(seg)) + '" target="_blank" rel="noopener">Pedir pelo WhatsApp</a></div>' +
      R.nav(seg) +
      '<section class="dx-hero" id="dx-s0">' +
        '<div class="dx-hero-copy">' +
          '<span class="dx-eyebrow">' + R.esc(seg.kicker) + '</span>' +
          '<h1>' + R.esc(seg.brand) + '</h1>' +
          '<p class="dx-hero-head">' + R.esc(seg.head) + '</p>' +
          '<p class="dx-lede">' + R.esc(seg.lede) + '</p>' +
          '<div class="dx-actions">' + R.waBtn(seg, 'Enviar minha lista', 'dx-btn-primary') +
            '<a class="dx-btn dx-btn-ghost" href="#dx-s1" data-dx-scroll>Ver ofertas</a></div>' +
          R.stats(seg) +
        '</div>' +
        '<div class="dx-hero-media">' + R.pic(seg.hero, '', seg.brand, true) +
          '<div class="dx-offer-card"><span>Oferta da semana</span><strong>' + R.esc(seg.groups[0].items[0].n) + '</strong>' +
          R.price(seg.groups[0].items[0].p) + '</div>' +
        '</div>' +
      '</section>' +
      '<section class="dx-section" id="dx-s1">' +
        '<div class="dx-market-bar">' +
          '<div class="dx-market-search"><input type="search" placeholder="Buscar produto na loja..." data-dx-search aria-label="Buscar produto"></div>' +
          R.chips(seg, 'Tudo') +
        '</div>' +
        groups +
        '<p class="dx-market-empty" data-dx-empty hidden>Nenhum produto encontrado nessa busca.</p>' +
      '</section>' +
      '<section class="dx-section dx-gallery-section" id="dx-s2">' +
        '<div class="dx-section-head"><span class="dx-eyebrow">A loja</span><h2>Por dentro do mercado</h2></div>' +
        R.gallery(seg, 3) +
      '</section>' +
      R.infoBlock(seg) +
      '<div class="dx-cart" data-dx-cart hidden><span class="dx-cart-info"><strong data-cart-count>0</strong> itens na lista</span>' +
        '<button class="dx-btn dx-btn-primary" data-cart-send>Enviar pedido</button>' +
        '<button class="dx-cart-clear" data-cart-clear aria-label="Limpar lista">Limpar</button></div>' +
      R.footer(seg) +
    '</div>';
  };

  /* ---------------------------------------------------------
     4. AGRO — agropecuária, insumos, máquinas, fazenda
     --------------------------------------------------------- */
  R.agro = function (seg) {
    var groups = seg.groups.map(function (g, gi) {
      return '<div class="dx-agro-group" data-dx-group="' + gi + '">' +
        R.groupHead(g, gi) +
        '<div class="dx-agro-grid">' +
          g.items.map(function (it, ii) {
            var img = it.img || seg.imgs[ii % seg.imgs.length];
            return '<article class="dx-agro-card">' +
              '<div class="dx-agro-media">' + R.pic(img, '', it.n) + '<span class="dx-agro-index">' + (ii + 1 < 10 ? '0' : '') + (ii + 1) + '</span></div>' +
              '<div class="dx-agro-body">' +
                '<h3>' + R.esc(it.n) + '</h3>' +
                '<p>' + R.esc(it.d) + '</p>' +
                '<div class="dx-agro-foot">' +
                  '<span class="dx-agro-price">' + (it.p && it.p !== '—' ? 'R$ ' + R.esc(it.p) : 'Cotação sob consulta') + '</span>' +
                  '<button class="dx-btn dx-btn-line" data-add="' + R.esc(it.n) + '">Adicionar à cotação</button>' +
                '</div>' +
              '</div>' +
            '</article>';
          }).join('') +
        '</div>' +
      '</div>';
    }).join('');

    return '<div class="demo demo--agro theme-' + seg.theme + ' v' + seg.v + '">' +
      '<div class="dx-topbar"><span>' + R.esc(seg.info.hours || '') + '</span><span class="dx-topbar-sep"></span><span>Assistência técnica em campo</span><a href="' + R.wa(R.demoMsg(seg)) + '" target="_blank" rel="noopener">Falar com agrônomo</a></div>' +
      R.nav(seg) +
      '<section class="dx-hero" id="dx-s0">' +
        '<div class="dx-hero-media">' + R.pic(seg.hero, '', seg.brand, true) +
          '<div class="dx-hero-tag">' + R.esc(seg.kicker) + '</div>' +
        '</div>' +
        '<div class="dx-hero-copy">' +
          '<span class="dx-eyebrow">' + R.esc(seg.kicker) + '</span>' +
          '<h1>' + R.esc(seg.head) + '</h1>' +
          '<p class="dx-lede">' + R.esc(seg.lede) + '</p>' +
          R.heroActions(seg, 'Solicitar cotação', 'Ver categorias') +
          R.stats(seg) +
        '</div>' +
      '</section>' +
      R.highlightStrip(seg) +
      '<section class="dx-section" id="dx-s1">' +
        '<div class="dx-section-head"><span class="dx-eyebrow">Catálogo</span><h2>' + R.esc(seg.brand) + '</h2>' +
        '<p>' + R.esc(seg.aboutText) + '</p></div>' +
        '<div class="dx-agro-layout">' +
          '<aside class="dx-agro-side">' +
            '<span class="dx-eyebrow">Categorias</span>' +
            R.chips(seg, 'Tudo') +
            '<div class="dx-agro-support"><strong>Suporte técnico</strong><p>Engenheiro agrônomo disponível para orientar a aplicação e a dose correta.</p></div>' +
          '</aside>' +
          '<div class="dx-agro-content">' + groups + '</div>' +
        '</div>' +
      '</section>' +
      '<section class="dx-section dx-gallery-section" id="dx-s2">' +
        '<div class="dx-section-head"><span class="dx-eyebrow">Campo</span><h2>No dia a dia da produção</h2></div>' +
        R.gallery(seg, 3) + R.quote(seg) +
      '</section>' +
      R.infoBlock(seg) +
      '<div class="dx-cart" data-dx-cart hidden><span class="dx-cart-info"><strong data-cart-count>0</strong> itens na cotação</span>' +
        '<button class="dx-btn dx-btn-primary" data-cart-send>Enviar cotação</button>' +
        '<button class="dx-cart-clear" data-cart-clear aria-label="Limpar lista">Limpar</button></div>' +
      R.footer(seg) +
    '</div>';
  };
})();
