/* ============================================================
   Motor de renderização — componentes compartilhados
   ============================================================ */
(function () {
  'use strict';
  var R = window.R = {};

  R.esc = function (s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  };

  /* imagem com fallback elegante */
  window.DEMO_FALLBACK = 'data:image/svg+xml,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><defs>' +
    '<linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1a1a1d"/><stop offset="1" stop-color="#2a2622"/></linearGradient></defs>' +
    '<rect width="800" height="600" fill="url(#g)"/><circle cx="400" cy="260" r="120" fill="none" stroke="#ffffff" stroke-opacity=".12" stroke-width="1"/>' +
    '<circle cx="400" cy="260" r="66" fill="none" stroke="#ffffff" stroke-opacity=".08"/>' +
    '<text x="400" y="268" text-anchor="middle" fill="#ffffff" fill-opacity=".35" font-family="Georgia, serif" font-size="34">H</text></svg>'
  );

  R.pic = function (src, cls, alt, eager) {
    return '<img class="' + (cls || '') + '" src="' + R.esc(src) + '" alt="' + R.esc(alt || '') + '"' +
      (eager ? '' : ' loading="lazy"') + ' decoding="async" onerror="this.onerror=null;this.src=window.DEMO_FALLBACK">';
  };

  R.wa = function (msg) {
    return 'https://wa.me/' + window.WA_NUMBER + '?text=' + encodeURIComponent(msg || window.WA_DEFAULT);
  };

  R.demoMsg = function (seg, extra) {
    return 'Olá Henrique! Gostei da demonstração "' + seg.name + ' — ' + seg.brand + '" no seu portfólio' +
      (extra ? ' (' + extra + ')' : '') + ' e queria conversar sobre um projeto parecido.';
  };

  R.waBtn = function (seg, label, cls, extra, attrs) {
    return '<a class="dx-btn ' + (cls || 'dx-btn-primary') + '" href="' + R.wa(R.demoMsg(seg, extra)) +
      '" target="_blank" rel="noopener"' + (attrs || '') + '>' + R.esc(label) + '</a>';
  };

  R.stars = function (n) {
    var out = '';
    for (var i = 0; i < 5; i++) out += '<i class="' + (i < n ? '' : 'off') + '">★</i>';
    return '<span class="dx-stars">' + out + '</span>';
  };

  /* Navegação interna da demonstração */
  R.nav = function (seg, opts) {
    opts = opts || {};
    var links = seg.nav.slice(0, 4).map(function (n, i) {
      return '<a href="#' + (opts.anchorPrefix || 'dx-s') + i + '" data-dx-scroll>' + R.esc(n) + '</a>';
    }).join('');
    return '' +
      '<header class="dx-nav' + (opts.dark ? ' is-dark' : '') + '">' +
        '<span class="dx-brand">' + R.esc(seg.brand) + '</span>' +
        '<nav class="dx-links">' + links + '</nav>' +
        '<a class="dx-nav-cta" href="' + R.wa(R.demoMsg(seg)) + '" target="_blank" rel="noopener">' + R.esc(seg.ctaShort) + '</a>' +
        '<button class="dx-burger" aria-label="Abrir seções da demonstração" data-dx-burger><span></span><span></span></button>' +
      '</header>';
  };

  R.heroActions = function (seg, primaryLabel, secondaryLabel) {
    return '<div class="dx-actions">' +
      R.waBtn(seg, primaryLabel || seg.cta, 'dx-btn-primary') +
      (secondaryLabel ? '<a class="dx-btn dx-btn-ghost" href="#dx-s1" data-dx-scroll>' + R.esc(secondaryLabel) + '</a>' : '') +
      '</div>';
  };

  R.stats = function (seg) {
    if (!seg.stats || !seg.stats.length) return '';
    return '<div class="dx-stats">' + seg.stats.map(function (s) {
      return '<div><strong>' + R.esc(s[0]) + '</strong><span>' + R.esc(s[1]) + '</span></div>';
    }).join('') + '</div>';
  };

  R.gallery = function (seg, count) {
    var imgs = seg.gallery.slice(0, count || 3);
    if (!imgs.length) return '';
    return '<div class="dx-gallery">' + imgs.map(function (src, i) {
      return '<button class="dx-gal-item" data-dx-photo="' + R.esc(src) + '" aria-label="Ampliar imagem ' + (i + 1) + '">' +
        R.pic(src, '', seg.brand + ' — imagem ' + (i + 1)) +
        '<span class="dx-gal-zoom">Ampliar</span></button>';
    }).join('') + '</div>';
  };

  R.chips = function (seg, extraLabel) {
    var chips = '<button class="dx-chip is-active" data-dx-filter="all">' + R.esc(extraLabel || 'Todos') + '</button>';
    seg.groups.forEach(function (g, i) {
      chips += '<button class="dx-chip" data-dx-filter="' + i + '">' + R.esc(g.title) + '</button>';
    });
    return '<div class="dx-chips" data-dx-chips>' + chips + '</div>';
  };

  R.groupHead = function (g, i) {
    return '<div class="dx-group-head"><h3>' + R.esc(g.title) + '</h3>' +
      (g.note ? '<span>' + R.esc(g.note) + '</span>' : '') + '</div>';
  };

  R.price = function (p) {
    if (!p || p === '—') return '<span class="dx-price dx-price-ask">Sob consulta</span>';
    return '<span class="dx-price">R$ ' + R.esc(p) + '</span>';
  };

  R.infoBlock = function (seg) {
    var i = seg.info || {};
    return '<section class="dx-section dx-info" id="dx-s3">' +
      '<div class="dx-info-copy">' +
        '<span class="dx-eyebrow">Onde estamos</span>' +
        '<h2>' + R.esc(seg.brand) + '</h2>' +
        '<p>' + R.esc(seg.aboutText || seg.lede) + '</p>' +
        '<ul class="dx-info-list">' +
          (i.addr ? '<li><span>Endereço</span><strong>' + R.esc(i.addr) + '</strong></li>' : '') +
          (i.hours ? '<li><span>Horário</span><strong>' + R.esc(i.hours) + '</strong></li>' : '') +
          (i.city ? '<li><span>Cidade</span><strong>' + R.esc(i.city) + '</strong></li>' : '') +
        '</ul>' +
        R.waBtn(seg, seg.cta, 'dx-btn-primary') +
      '</div>' +
      '<div class="dx-info-map">' +
        '<div class="dx-map-art" aria-hidden="true"><span class="dx-map-pin"></span></div>' +
        '<div class="dx-map-label">' + R.esc(i.addr || i.city || 'Atendimento local') + '</div>' +
      '</div>' +
    '</section>';
  };

  R.footer = function (seg) {
    return '<footer class="dx-footer">' +
      '<div class="dx-footer-brand"><strong>' + R.esc(seg.brand) + '</strong><small>' + R.esc(seg.kicker) + '</small></div>' +
      '<div class="dx-footer-links">' + seg.nav.map(function (n) { return '<span>' + R.esc(n) + '</span>'; }).join('') + '</div>' +
      '<div class="dx-footer-cta">' + R.waBtn(seg, seg.cta, 'dx-btn-ghost') + '</div>' +
      '<p class="dx-footer-fine">Demonstração de modelo — conteúdo ilustrativo. Desenvolvido por Henrique — Sites &amp; Catálogos Digitais.</p>' +
    '</footer>';
  };

  R.highlightStrip = function (seg) {
    if (!seg.highlight || !seg.highlight.length) return '';
    return '<div class="dx-strip">' + seg.highlight.map(function (h) {
      return '<span><i></i>' + R.esc(h) + '</span>';
    }).join('') + '</div>';
  };

  /* Bloco de agendamento (beleza, hotelaria, serviços) */
  R.booking = function (seg, opts) {
    opts = opts || {};
    var label = opts.label || 'Agendar horário';
    return '<section class="dx-section dx-booking" id="dx-s3">' +
      '<div class="dx-booking-copy">' +
        '<span class="dx-eyebrow">' + R.esc(opts.kicker || 'Agendamento') + '</span>' +
        '<h2>' + R.esc(opts.title || 'Escolha o melhor dia para você') + '</h2>' +
        '<p>' + R.esc(opts.text || 'Selecione a data e o período. Confirmamos a disponibilidade pelo WhatsApp em poucos minutos.') + '</p>' +
        R.highlightStrip(seg) +
      '</div>' +
      '<form class="dx-booking-form" data-dx-booking>' +
        '<label><span>Data</span><input type="date" required name="data"></label>' +
        '<label><span>Período</span><select name="periodo"><option>Manhã</option><option>Tarde</option><option>Noite</option></select></label>' +
        '<label><span>Serviço</span><select name="servico">' +
          (seg.groups[0] ? seg.groups[0].items.map(function (it) { return '<option>' + R.esc(it.n) + '</option>'; }).join('') : '') +
        '</select></label>' +
        '<button type="submit" class="dx-btn dx-btn-primary">' + R.esc(label) + '</button>' +
        '<p class="dx-form-note">Atendimento confirmado pelo WhatsApp. Sem compromisso.</p>' +
      '</form>' +
    '</section>';
  };

  R.quote = function (seg) {
    if (!seg.quote) return '';
    return '<blockquote class="dx-quote"><p>' + R.esc(seg.quote) + '</p></blockquote>';
  };
})();
