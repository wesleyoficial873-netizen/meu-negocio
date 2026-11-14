/* ============================================================
   Henrique — Sites & Catálogos Digitais
   Aplicação: showroom, navegação, transições e runtime das demos
   ============================================================ */
(function () {
  'use strict';

  var SEGMENTS = window.SEGMENTS || [];
  var CATEGORIES = window.CATEGORIES;
  var THEMES = window.THEMES;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  function mq(q) {
    try { return !!(window.matchMedia && window.matchMedia(q).matches); } catch (e) { return false; }
  }
  var reduced = mq('(prefers-reduced-motion: reduce)');

  function catOf(key) {
    for (var i = 0; i < CATEGORIES.length; i++) if (CATEGORIES[i].key === key) return CATEGORIES[i];
    return { name: key, short: key, n: '' };
  }
  function segById(id) {
    for (var i = 0; i < SEGMENTS.length; i++) if (SEGMENTS[i].id === id) return SEGMENTS[i];
    return null;
  }
  function cover(seg) { return seg.hero; }
  function syncTotals() {
    var els = document.querySelectorAll('[data-total]');
    for (var i = 0; i < els.length; i++) els[i].textContent = SEGMENTS.length;
  }

  function thumb(seg, w) {
    var src = seg.hero || '';
    if (src.indexOf('images.unsplash.com') > -1) {
      return src.replace(/w=\d+/, 'w=' + (w || 640)).replace('q=72', 'q=58');
    }
    return src;
  }
  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  /* ---------------------------------------------------------
     Temas das demonstrações (variáveis CSS)
     --------------------------------------------------------- */
  function injectThemes() {
    var css = '';
    Object.keys(THEMES).forEach(function (key) {
      var t = THEMES[key];
      var hex = (t.accent || '#d3b07c').replace('#', '');
      var r = parseInt(hex.substr(0, 2), 16), g = parseInt(hex.substr(2, 2), 16), b = parseInt(hex.substr(4, 2), 16);
      var lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
      var on = lum > 0.58 ? '#14100b' : '#ffffff';
      css += '.theme-' + key + '{--d-on-accent:' + on + ';' +
        '--d-bg:' + t.bg + ';--d-surface:' + t.surface + ';--d-ink:' + t.ink + ';--d-muted:' + t.muted +
        ';--d-accent:' + t.accent + ';--d-line:' + t.line + ';--d-radius:' + t.radius +
        ';--d-display:' + t.display + ';--d-body:' + t.body + ';--d-caps:' + t.caps + ';}';
    });
    var style = document.createElement('style');
    style.id = 'theme-vars';
    style.textContent = css;
    document.head.appendChild(style);
  }

  /* ---------------------------------------------------------
     Preloader
     --------------------------------------------------------- */
  function initPreloader() {
    var pre = $('#preloader'), fill = $('#preloaderFill'), pct = $('#preloaderPct');
    var start = Date.now(), target = 100;
    function tick() {
      var p = Math.min(target, Math.round(((Date.now() - start) / 950) * 100));
      fill.style.width = p + '%';
      pct.textContent = p;
      if (p < 100) requestAnimationFrame(tick);
      else {
        setTimeout(function () {
          pre.classList.add('is-done');
          document.body.classList.add('is-loaded');
          setTimeout(function () { pre.remove(); }, 900);
        }, 220);
      }
    }
    requestAnimationFrame(tick);
  }

  /* ---------------------------------------------------------
     Categorias
     --------------------------------------------------------- */
  function renderCategories() {
    var wrap = $('#categoryGrid');
    wrap.innerHTML = CATEGORIES.map(function (c) {
      var count = SEGMENTS.filter(function (s) { return s.cat === c.key; }).length;
      return '<button class="category-card reveal" data-reveal data-go-cat="' + c.key + '" aria-label="Ver modelos de ' + c.name + '">' +
        '<span class="cat-media">' + '<img src="' + window.photo(c.cover, 900) + '" alt="' + c.name + '" loading="lazy" decoding="async" onerror="this.onerror=null;this.src=window.DEMO_FALLBACK">' + '</span>' +
        '<span class="cat-veil"></span>' +
        '<span class="cat-top"><span class="cat-num">' + c.n + '</span>' +
          '<span class="cat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="' + c.icon + '"/></svg></span>' +
        '</span>' +
        '<span class="cat-body"><strong>' + c.name + '</strong><small>' + c.desc + '</small>' +
          '<span class="cat-count">' + count + ' modelos <i>→</i></span>' +
        '</span>' +
      '</button>';
    }).join('');
  }

  /* ---------------------------------------------------------
     Galeria
     --------------------------------------------------------- */
  var activeCat = 'all';
  var query = '';

  function renderGallery() {
    var wrap = $('#modelGrid');
    var list = SEGMENTS.filter(function (s) {
      var okCat = activeCat === 'all' || s.cat === activeCat;
      var q = query.trim().toLowerCase();
      var okQ = !q || (s.name + ' ' + s.brand + ' ' + s.kicker + ' ' + s.tags.join(' ') + ' ' + catOf(s.cat).name).toLowerCase().indexOf(q) > -1;
      return okCat && okQ;
    });

    wrap.innerHTML = list.map(function (s, i) {
      var c = catOf(s.cat);
      return '<article class="model-card" data-id="' + s.id + '" style="--i:' + (i % 9) + '">' +
        '<button class="model-card-btn" data-open="' + s.id + '" aria-label="Abrir demonstração ' + s.name + '">' +
          '<span class="model-media">' +
            '<img src="' + thumb(s, 640) + '" alt="Demonstração ' + s.name + ' — ' + s.brand + '" loading="lazy" decoding="async" onerror="this.onerror=null;this.src=window.DEMO_FALLBACK">' +
            '<span class="model-shine"></span>' +
            '<span class="model-chip">' + c.short + '</span>' +
            '<span class="model-open"><span>Visualizar demonstração</span><i>→</i></span>' +
          '</span>' +
          '<span class="model-body">' +
            '<span class="model-brand">' + s.brand + '</span>' +
            '<span class="model-name">' + s.name + '</span>' +
            '<span class="model-desc">' + s.head + '</span>' +
            '<span class="model-foot"><span class="model-tag">' + (s.tags[0] || 'Projeto') + '</span><span class="model-arrow">↗</span></span>' +
          '</span>' +
        '</button>' +
      '</article>';
    }).join('');

    $('#resultCount').textContent = list.length + (list.length === 1 ? ' modelo' : ' modelos');
    $('#emptyState').hidden = list.length > 0;
    observeReveal(wrap);
    initTilt(wrap);
  }

  function renderChips() {
    var wrap = $('#filterChips');
    var html = '<button class="chip is-active" data-cat="all" role="tab" aria-selected="true">Todos <em>' + SEGMENTS.length + '</em></button>';
    CATEGORIES.forEach(function (c) {
      var n = SEGMENTS.filter(function (s) { return s.cat === c.key; }).length;
      html += '<button class="chip" data-cat="' + c.key + '" role="tab" aria-selected="false">' + c.short + ' <em>' + n + '</em></button>';
    });
    wrap.innerHTML = html;
  }

  function setFilter(key) {
    activeCat = key;
    $$('#filterChips .chip').forEach(function (b) {
      var on = b.dataset.cat === key;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    renderGallery();
  }

  function renderFeatured() {
    var picks = ['restaurante-sofisticado', 'loja-roupas-femininas', 'imobiliaria', 'agropecuaria', 'hotel', 'salao-beleza', 'catalogo-luxuoso', 'revenda-veiculos', 'buffet'];
    var rail = $('#featuredRail');
    rail.innerHTML = SEGMENTS.filter(function (s) { return picks.indexOf(s.id) > -1; }).map(function (s, i) {
      var c = catOf(s.cat);
      return '<button class="rail-card" data-open="' + s.id + '" aria-label="Abrir ' + s.name + '">' +
        '<span class="rail-media"><img src="' + thumb(s, 760) + '" alt="' + s.name + '" loading="lazy" onerror="this.onerror=null;this.src=window.DEMO_FALLBACK">' +
        '<span class="rail-index">0' + (i + 1) + '</span></span>' +
        '<span class="rail-body"><span class="rail-cat">' + c.short + '</span><strong>' + s.brand + '</strong>' +
        '<span class="rail-name">' + s.name + '</span></span>' +
      '</button>';
    }).join('');
    initTilt(rail);
  }

  /* ---------------------------------------------------------
     Catálogos digitais, recursos e processo
     --------------------------------------------------------- */
  var FEATURES = [
    ['Design sob medida', 'Identidade visual construída para o seu segmento, com tipografia, cor e composição próprias.', 'M12 3l2.6 6.4L21 12l-6.4 2.6L12 21l-2.6-6.4L3 12l6.4-2.6L12 3Z'],
    ['Catálogo organizado', 'Produtos, categorias e fichas técnicas organizados para o cliente encontrar rápido.', 'M4 5h16v14H4zM4 10h16M9 10v9'],
    ['Pedido pelo WhatsApp', 'Carrinho e listas que geram mensagem pronta, sem taxas de aplicativo.', 'M21 12a9 9 0 1 1-4.2-7.6L21 4l-1 4.6A8.9 8.9 0 0 1 21 12Z'],
    ['Desempenho real', 'Código leve, imagens otimizadas e carregamento rápido em qualquer conexão.', 'M13 2 4 14h7l-1 8 9-12h-7l1-8Z'],
    ['Responsivo de verdade', 'Experiência pensada para celular, tablet e computador — sem versão de segunda classe.', 'M4 5h11v10H4zM17 9h3v10h-3zM8 19h6'],
    ['Estrutura para SEO', 'Títulos, descrições, dados estruturados e semântica correta para ser encontrado.', 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14Zm5 12 5 5']
  ];

  var PROCESS = [
    ['Conversa inicial', 'Entendemos o negócio, o público e o que precisa acontecer no site. Sem formulário longo — conversa direta pelo WhatsApp.'],
    ['Escolha e personalização', 'Você aponta os modelos de referência e nós adaptamos identidade, conteúdo e catálogo para a sua marca.'],
    ['Construção e revisão', 'Desenvolvimento com acompanhamento, ajustes de conteúdo e testes em todos os dispositivos.'],
    ['Publicação e suporte', 'Site no ar, com orientação de uso e suporte para as primeiras atualizações.']
  ];

  function renderFeatures() {
    $('#featureList').innerHTML = FEATURES.map(function (f, i) {
      return '<article class="feature reveal" data-reveal style="--d:' + (i * 60) + 'ms">' +
        '<span class="feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><path d="' + f[2] + '"/></svg></span>' +
        '<div><h3>' + f[0] + '</h3><p>' + f[1] + '</p></div></article>';
    }).join('');
    $('#processList').innerHTML = PROCESS.map(function (p, i) {
      return '<li class="process-step reveal" data-reveal style="--d:' + (i * 80) + 'ms">' +
        '<span class="process-num">' + pad(i + 1) + '</span>' +
        '<div><h3>' + p[0] + '</h3><p>' + p[1] + '</p></div></li>';
    }).join('');
  }

  function renderCatalogGrid() {
    var cats = SEGMENTS.filter(function (s) { return s.layout === 'catalog'; });
    $('#catalogGrid').innerHTML = cats.map(function (s, i) {
      return '<button class="catalog-card reveal" data-reveal data-open="' + s.id + '" aria-label="Abrir ' + s.name + '">' +
        '<span class="catalog-cover"><img src="' + thumb(s, 560) + '" alt="' + s.name + '" loading="lazy" onerror="this.onerror=null;this.src=window.DEMO_FALLBACK">' +
          '<span class="catalog-spine"></span>' +
          '<span class="catalog-brand">' + s.brand + '</span>' +
        '</span>' +
        '<span class="catalog-meta"><strong>' + s.name + '</strong><small>' + s.tags[0] + ' · ' + s.tags[1] + '</small>' +
          '<span class="catalog-open">Abrir catálogo →</span></span>' +
      '</button>';
    }).join('');
    var foot = $('#footerCategories');
    if (foot) {
      CATEGORIES.slice(0, 7).forEach(function (c) {
        var a = document.createElement('a');
        a.href = '#modelos';
        a.textContent = c.short;
        a.addEventListener('click', function () { setTimeout(function () { setFilter(c.key); }, 60); });
        foot.appendChild(a);
      });
    }
  }

  /* ---------------------------------------------------------
     Animações de entrada
     --------------------------------------------------------- */
  var revealObserver;
  function observeReveal(root) {
    if (!('IntersectionObserver' in window)) {
      $$('[data-reveal]', root || document).forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            var d = e.target.getAttribute('data-delay') || 0;
            e.target.style.transitionDelay = (d ? d * 90 : 0) + 'ms';
            e.target.classList.add('is-in');
            revealObserver.unobserve(e.target);
          }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    }
    $$('[data-reveal]', root || document).forEach(function (el) {
      if (!el.classList.contains('is-in')) revealObserver.observe(el);
    });
  }

  function initScrollFx() {
    var header = $('#siteHeader'), progress = $('#headerProgress');
    var heroMedia = $$('[data-parallax]');
    var ticking = false;
    function onScroll() {
      var y = window.scrollY || window.pageYOffset;
      header.classList.toggle('is-scrolled', y > 24);
      var h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = 'scaleX(' + (h > 0 ? Math.min(1, y / h) : 0) + ')';
      if (!reduced) {
        heroMedia.forEach(function (el) {
          el.style.setProperty('--p', (y * 0.08).toFixed(1) + 'px');
        });
      }
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
    }, { passive: true });
    onScroll();
  }

  function initCounters() {
    var els = $$('.count');
    if (!('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target, end = parseInt(el.dataset.count, 10), suffix = el.dataset.suffix || '';
        var t0 = performance.now();
        function step(t) {
          var p = Math.min(1, (t - t0) / 1200);
          var ease = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(end * ease) + suffix;
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        io.unobserve(el);
      });
    }, { threshold: 0.5 });
    els.forEach(function (el) { io.observe(el); });
  }

  function initParticles() {
    var canvas = $('#particles');
    if (!canvas || reduced) return;
    var ctx = canvas.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = 0, h = 0, dots = [], raf = null, visible = true;

    function size() {
      var r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var count = Math.min(46, Math.round(w / 30));
      dots = [];
      for (var i = 0; i < count; i++) {
        dots.push({
          x: Math.random() * w, y: Math.random() * h,
          r: Math.random() * 1.6 + 0.4,
          vx: (Math.random() - 0.5) * 0.16,
          vy: (Math.random() - 0.5) * 0.16,
          a: Math.random() * 0.4 + 0.12
        });
      }
    }
    function draw() {
      ctx.clearRect(0, 0, w, h);
      dots.forEach(function (d) {
        d.x += d.vx; d.y += d.vy;
        if (d.x < -10) d.x = w + 10; if (d.x > w + 10) d.x = -10;
        if (d.y < -10) d.y = h + 10; if (d.y > h + 10) d.y = -10;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(211,176,124,' + d.a + ')';
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    }
    size();
    draw();
    window.addEventListener('resize', function () { size(); });
    document.addEventListener('visibilitychange', function () {
      visible = !document.hidden;
      if (!visible && raf) { cancelAnimationFrame(raf); raf = null; }
      else if (visible && !raf) draw();
    });
  }

  function initTilt(root) {
    if (reduced || mq('(hover: none)')) return;
    $$('.model-card, .rail-card, .category-card', root || document).forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        card.style.setProperty('--rx', (-py * 4).toFixed(2) + 'deg');
        card.style.setProperty('--ry', (px * 6).toFixed(2) + 'deg');
        card.style.setProperty('--mx', ((px + 0.5) * 100).toFixed(1) + '%');
        card.style.setProperty('--my', ((py + 0.5) * 100).toFixed(1) + '%');
      });
      card.addEventListener('pointerleave', function () {
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
      });
    });
  }

  /* ---------------------------------------------------------
     Header, menu mobile e busca
     --------------------------------------------------------- */
  function initChrome() {
    var menu = $('#mobileMenu'), trigger = $('#menuTrigger');
    function toggleMenu(open) {
      menu.classList.toggle('is-open', open);
      menu.setAttribute('aria-hidden', open ? 'false' : 'true');
      trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.classList.toggle('menu-open', open);
    }
    trigger.addEventListener('click', function () { toggleMenu(!menu.classList.contains('is-open')); });
    $('#menuClose').addEventListener('click', function () { toggleMenu(false); });
    $$('#mobileMenu a').forEach(function (a) { a.addEventListener('click', function () { toggleMenu(false); }); });

    var overlay = $('#searchOverlay'), input = $('#searchInput'), results = $('#searchResults');
    function open() {
      overlay.classList.add('is-open');
      overlay.setAttribute('aria-hidden', 'false');
      setTimeout(function () { input.focus(); }, 220);
    }
    function close() {
      overlay.classList.remove('is-open');
      overlay.setAttribute('aria-hidden', 'true');
    }
    $('#searchTrigger').addEventListener('click', open);
    $('#searchClose').addEventListener('click', close);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { close(); closeDemo(); }
      if (e.key === '/' && !/input|textarea|select/i.test(document.activeElement.tagName)) { e.preventDefault(); open(); }
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) { e.preventDefault(); open(); }
    });

    var sug = $('#searchSuggest');
    sug.innerHTML = CATEGORIES.slice(0, 6).map(function (c) { return '<button data-sug="' + c.key + '">' + c.short + '</button>'; }).join('');
    sug.addEventListener('click', function (e) {
      var b = e.target.closest('[data-sug]');
      if (!b) return;
      close(); setFilter(b.dataset.sug);
      document.getElementById('modelos').scrollIntoView({ behavior: 'smooth' });
    });

    function search() {
      var q = input.value.trim().toLowerCase();
      if (!q) {
        results.innerHTML = '<p class="search-empty">Digite para encontrar entre ' + SEGMENTS.length + ' demonstrações.</p>';
        return;
      }
      var found = SEGMENTS.filter(function (s) {
        return (s.name + ' ' + s.brand + ' ' + s.kicker + ' ' + s.tags.join(' ') + ' ' + catOf(s.cat).name).toLowerCase().indexOf(q) > -1;
      }).slice(0, 9);
      results.innerHTML = found.length ? found.map(function (s) {
        return '<button class="search-item" data-open="' + s.id + '">' +
          '<img src="' + thumb(s, 200) + '" alt="" loading="lazy" onerror="this.onerror=null;this.src=window.DEMO_FALLBACK">' +
          '<span><strong>' + s.name + '</strong><small>' + s.brand + ' · ' + catOf(s.cat).short + '</small></span><i>→</i></button>';
      }).join('') : '<p class="search-empty">Nenhum modelo encontrado. Tente outro termo.</p>';
    }
    input.addEventListener('input', search);
    results.addEventListener('click', function (e) {
      var b = e.target.closest('[data-open]');
      if (b) { close(); openDemo(b.dataset.open, null); }
    });
  }

  /* ---------------------------------------------------------
     Toast
     --------------------------------------------------------- */
  var toastTimer;
  function toast(msg) {
    var t = $('#toast');
    t.textContent = msg;
    t.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('is-on'); }, 2600);
  }

  /* ---------------------------------------------------------
     Lightbox
     --------------------------------------------------------- */
  var lbIndex = 0, lbImages = [];
  function openLightbox(images, index) {
    lbImages = images;
    lbIndex = index || 0;
    var lb = $('#lightbox');
    lb.classList.add('is-open');
    lb.setAttribute('aria-hidden', 'false');
    updateLightbox();
  }
  function updateLightbox() {
    $('#lbImage').src = lbImages[lbIndex];
    $('#lbCaption').textContent = (lbIndex + 1) + ' / ' + lbImages.length;
  }
  function closeLightbox() {
    var lb = $('#lightbox');
    lb.classList.remove('is-open');
    lb.setAttribute('aria-hidden', 'true');
  }
  function initLightbox() {
    $('#lbClose').addEventListener('click', closeLightbox);
    $('#lbPrev').addEventListener('click', function () { lbIndex = (lbIndex - 1 + lbImages.length) % lbImages.length; updateLightbox(); });
    $('#lbNext').addEventListener('click', function () { lbIndex = (lbIndex + 1) % lbImages.length; updateLightbox(); });
    $('#lightbox').addEventListener('click', function (e) { if (e.target.id === 'lightbox') closeLightbox(); });
    document.addEventListener('keydown', function (e) {
      if (!$('#lightbox').classList.contains('is-open')) return;
      if (e.key === 'ArrowRight') { lbIndex = (lbIndex + 1) % lbImages.length; updateLightbox(); }
      if (e.key === 'ArrowLeft') { lbIndex = (lbIndex - 1 + lbImages.length) % lbImages.length; updateLightbox(); }
    });
  }

  /* ---------------------------------------------------------
     Demonstrações — abertura cinematográfica
     --------------------------------------------------------- */
  var currentDemo = null;
  var lastCardId = null;
  var demoScroll = 0;

  function setHash(h) {
    try {
      if (!history.replaceState) return;
      history.replaceState(null, '', h ? '#' + h.replace(/^#/, '') : location.pathname + location.search);
    } catch (err) { /* file:// e ambientes sem histórico */ }
  }

  function demoHTML(seg) {
    var fn = window.R[seg.layout];
    return fn ? fn(seg) : '<div class="dx-fallback">Demonstração indisponível.</div>';
  }

  function openDemo(id, cardEl) {
    var seg = segById(id);
    if (!seg) return;
    currentDemo = seg;
    lastCardId = id;
    demoScroll = window.scrollY;

    var overlay = $('#demoOverlay');
    var flip = $('#demoFlip');
    var viewport = $('#demoViewport');
    var loader = $('#demoLoader');
    var chrome = $('#demoChrome');

    $('#demoName').textContent = seg.name;
    $('#demoCat').textContent = catOf(seg.cat).name;
    $('#demoWhats').href = window.R.wa(window.R.demoMsg(seg));
    $('#demoWhats').textContent = 'Quero este modelo';

    var cardImg = cardEl ? cardEl.querySelector('img') : null;
    var rect = cardImg ? cardImg.getBoundingClientRect() : { top: window.innerHeight / 2, left: window.innerWidth / 2, width: 60, height: 60 };
    var src = cardImg ? cardImg.src : thumb(seg, 760);

    flip.innerHTML = '<img src="' + src + '" alt="">';
    flip.style.transition = 'none';
    flip.style.top = rect.top + 'px';
    flip.style.left = rect.left + 'px';
    flip.style.width = rect.width + 'px';
    flip.style.height = rect.height + 'px';
    flip.style.borderRadius = '18px';
    flip.classList.add('is-active');

    viewport.innerHTML = '';
    viewport.scrollTop = 0;
    loader.classList.remove('is-done');
    chrome.classList.remove('is-in');

    document.body.classList.add('demo-open');
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    overlay.scrollTop = 0;

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        flip.style.transition = 'top .78s cubic-bezier(.16,1,.3,1), left .78s cubic-bezier(.16,1,.3,1), width .78s cubic-bezier(.16,1,.3,1), height .78s cubic-bezier(.16,1,.3,1), border-radius .6s ease, opacity .4s ease';
        flip.style.top = '0px';
        flip.style.left = '0px';
        flip.style.width = '100%';
        flip.style.height = '100%';
        flip.style.borderRadius = '0px';
        overlay.classList.add('is-expanding');
      });
    });

    var paint = function () {
      viewport.innerHTML = demoHTML(seg);
      bindDemo(seg, viewport);
      loader.classList.add('is-done');
      requestAnimationFrame(function () {
        overlay.classList.add('is-ready');
        chrome.classList.add('is-in');
        setTimeout(function () { flip.classList.remove('is-active'); }, 460);
        viewport.focus({ preventScroll: true });
      });
      setHash('#modelo/' + seg.id);
    };

    if (reduced) { paint(); }
    else setTimeout(paint, 430);
  }

  function closeDemo() {
    var overlay = $('#demoOverlay');
    if (!overlay.classList.contains('is-open')) return;
    overlay.classList.remove('is-ready');
    overlay.classList.remove('is-expanding');
    $('#demoChrome').classList.remove('is-in');

    var flip = $('#demoFlip');
    var card = lastCardId ? document.querySelector('[data-open="' + lastCardId + '"]') : null;
    var img = card ? card.querySelector('img') : null;
    var rect = img ? img.getBoundingClientRect() : null;

    if (rect && !reduced) {
      flip.classList.add('is-active');
      flip.style.transition = 'top .6s cubic-bezier(.4,0,.2,1), left .6s cubic-bezier(.4,0,.2,1), width .6s cubic-bezier(.4,0,.2,1), height .6s cubic-bezier(.4,0,.2,1), border-radius .5s ease, opacity .5s ease .15s';
      flip.style.top = rect.top + 'px';
      flip.style.left = rect.left + 'px';
      flip.style.width = rect.width + 'px';
      flip.style.height = rect.height + 'px';
      flip.style.borderRadius = '18px';
      flip.style.opacity = '0.2';
    } else {
      flip.style.opacity = '0';
    }

    setTimeout(function () {
      overlay.classList.remove('is-open');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('demo-open');
      $('#demoViewport').innerHTML = '';
      flip.classList.remove('is-active');
      flip.style.opacity = '1';
      currentDemo = null;
      setHash('');
    }, reduced ? 60 : 480);
  }

  /* ---------------------------------------------------------
     Runtime das demonstrações
     --------------------------------------------------------- */
  function bindDemo(seg, viewport) {
    var cart = [];

    // navegação interna
    $$('[data-dx-scroll]', viewport).forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = a.getAttribute('href');
        if (id && id.charAt(0) === '#') {
          e.preventDefault();
          scrollDemoTo(viewport, id);
        }
      });
    });
    function scrollDemoTo(viewport, id) {
      var target = $(id, viewport);
      if (!target) return;
      viewport.scrollTo({ top: target.offsetTop - 64, behavior: reduced ? 'auto' : 'smooth' });
    }

    // filtros por categoria
    $$('[data-dx-chips]', viewport).forEach(function (chips) {
      chips.addEventListener('click', function (e) {
        var btn = e.target.closest('.dx-chip');
        if (!btn) return;
        var key = btn.dataset.dxFilter;
        $$('.dx-chip', chips).forEach(function (b) { b.classList.toggle('is-active', b === btn); });
        $$('[data-dx-group]', viewport).forEach(function (g) {
          var on = key === 'all' || g.dataset.dxGroup === key;
          g.classList.toggle('is-hidden', !on);
          if (on) { g.classList.remove('is-anim'); void g.offsetWidth; g.classList.add('is-anim'); }
        });
      });
    });

    // busca de produtos (mercados)
    var search = $('[data-dx-search]', viewport);
    if (search) {
      search.addEventListener('input', function () {
        var q = search.value.trim().toLowerCase();
        var any = false;
        $$('.dx-sku', viewport).forEach(function (sku) {
          var on = !q || sku.textContent.toLowerCase().indexOf(q) > -1;
          sku.style.display = on ? '' : 'none';
          if (on) any = true;
        });
        $$('[data-dx-group]', viewport).forEach(function (g) {
          var visible = $$('.dx-sku', g).some(function (s) { return s.style.display !== 'none'; });
          g.style.display = visible ? '' : 'none';
        });
        var empty = $('[data-dx-empty]', viewport);
        if (empty) empty.hidden = any;
      });
    }

    // lista / carrinho
    var cartBar = $('[data-dx-cart]', viewport);
    function paintCart() {
      if (!cartBar) return;
      cartBar.hidden = cart.length === 0;
      var c = $('[data-cart-count]', cartBar);
      if (c) c.textContent = cart.length;
    }
    $$('[data-add]', viewport).forEach(function (b) {
      b.addEventListener('click', function () {
        cart.push(b.dataset.add + (b.dataset.addPrice && b.dataset.addPrice !== '—' ? ' — R$ ' + b.dataset.addPrice : ''));
        paintCart();
        b.classList.add('is-added');
        setTimeout(function () { b.classList.remove('is-added'); }, 900);
        toast(b.dataset.add + ' adicionado à lista');
      });
    });
    if (cartBar) {
      $('[data-cart-send]', cartBar).addEventListener('click', function () {
        if (!cart.length) return;
        var msg = 'Olá! Vim pela demonstração ' + seg.brand + ' e gostaria de fazer este pedido:\n\n• ' + cart.join('\n• ') + '\n\nPode confirmar disponibilidade e valores?';
        window.open(window.R.wa(msg), '_blank', 'noopener');
      });
      $('[data-cart-clear]', cartBar).addEventListener('click', function () {
        cart = []; paintCart(); toast('Lista limpa');
      });
    }

    // botões de item individual
    $$('[data-wa-item]', viewport).forEach(function (b) {
      b.addEventListener('click', function () {
        var msg = 'Olá! Vim pela demonstração ' + seg.brand + ' e gostaria de saber mais sobre: ' + b.dataset.waItem + '.';
        window.open(window.R.wa(msg), '_blank', 'noopener');
      });
    });

    // favoritos (imóveis)
    $$('[data-fav]', viewport).forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.stopPropagation();
        b.classList.toggle('is-on');
        b.textContent = b.classList.contains('is-on') ? '♥' : '♡';
      });
    });

    // agendamentos
    $$('[data-dx-booking]', viewport).forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var data = form.querySelector('[name="data"]');
        var per = form.querySelector('[name="periodo"]');
        var serv = form.querySelector('[name="servico"]');
        var hosp = form.querySelector('[name="hospedes"]');
        var saida = form.querySelector('[name="saida"]');
        var parts = [];
        if (serv) parts.push('serviço: ' + serv.value);
        if (data && data.value) parts.push('data: ' + data.value.split('-').reverse().join('/'));
        if (saida && saida.value) parts.push('saída: ' + saida.value.split('-').reverse().join('/'));
        if (per) parts.push('período: ' + per.value);
        if (hosp) parts.push(hosp.value);
        var msg = 'Olá! Vim pela demonstração ' + seg.brand + ' e gostaria de verificar disponibilidade (' + parts.join(' · ') + ').';
        window.open(window.R.wa(msg), '_blank', 'noopener');
        toast('Abrindo o WhatsApp para confirmar');
      });
    });

    // catálogo paginado
    var cat = $('[data-dx-catalog]', viewport);
    if (cat) {
      var pages = $$('.dx-page', cat);
      var idx = 0;
      function go(n) {
        idx = Math.max(0, Math.min(pages.length - 1, n));
        pages.forEach(function (p, i) { p.classList.toggle('is-active', i === idx); });
        $$('.dx-cat-dots button', cat).forEach(function (d, i) { d.classList.toggle('is-active', i === idx); });
        var cur = $('[data-page-current]', cat);
        if (cur) cur.textContent = idx + 1;
        cat.classList.add('is-turning');
        setTimeout(function () { cat.classList.remove('is-turning'); }, 420);
      }
      $$('[data-page-next]', cat).forEach(function (b) { b.addEventListener('click', function () { go(idx + 1); }); });
      $$('[data-page-prev]', cat).forEach(function (b) { b.addEventListener('click', function () { go(idx - 1); }); });
      $$('[data-page-go]', cat).forEach(function (b) { b.addEventListener('click', function () { go(+b.dataset.pageGo); }); });
    }

    // galerias internas
    $$('[data-dx-photo]', viewport).forEach(function (b) {
      b.addEventListener('click', function () {
        var all = $$('[data-dx-photo]', viewport).map(function (x) { return x.dataset.dxPhoto; });
        openLightbox(all.length ? all : [b.dataset.dxPhoto], all.indexOf(b.dataset.dxPhoto));
      });
    });

    // menu mobile interno
    var burger = $('[data-dx-burger]', viewport);
    if (burger) burger.addEventListener('click', function () {
      $('.dx-nav', viewport).classList.toggle('is-open');
    });
  }

  /* ---------------------------------------------------------
     Delegação global de cliques
     --------------------------------------------------------- */
  function initDelegation() {
    document.addEventListener('click', function (e) {
      var openBtn = e.target.closest('[data-open]');
      if (openBtn) {
        e.preventDefault();
        var card = openBtn.closest('.model-card, .rail-card, .catalog-card') || openBtn;
        openDemo(openBtn.dataset.open, card);
        return;
      }
      var catBtn = e.target.closest('[data-go-cat]');
      if (catBtn) {
        setFilter(catBtn.dataset.goCat);
        document.getElementById('modelos').scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
        return;
      }
      var chip = e.target.closest('#filterChips .chip');
      if (chip) { setFilter(chip.dataset.cat); return; }
      if (e.target.closest('#demoBack')) { closeDemo(); return; }
      if (e.target.closest('#clearFilters')) { $('#gallerySearch').value = ''; query = ''; setFilter('all'); return; }
      if (e.target.closest('#toTop')) { window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' }); return; }
      if (e.target.closest('.magnetic')) {
        // efeito apenas visual
      }
    });

    var gs = $('#gallerySearch');
    gs.addEventListener('input', function () {
      query = gs.value;
      renderGallery();
    });

    var ft = $('#featuredRail');
    var isDown = false, startX = 0, startLeft = 0;
    ft.addEventListener('pointerdown', function (e) { isDown = true; startX = e.clientX; startLeft = ft.scrollLeft; });
    window.addEventListener('pointerup', function () { isDown = false; });
    ft.addEventListener('pointermove', function (e) {
      if (!isDown) return;
      ft.scrollLeft = startLeft - (e.clientX - startX);
    });
  }

  /* ---------------------------------------------------------
     Vitrine do hero
     --------------------------------------------------------- */
  function initStage() {
    var ids = ['restaurante-sofisticado', 'loja-roupas-femininas', 'imobiliaria', 'pizzaria-moderna', 'hotel'];
    var segs = ids.map(segById).filter(Boolean);
    if (!segs.length) return;
    var imgs = $$('[data-stage-img]');
    var i = 0;
    $('#stageUrl').textContent = (segs[0].domain || 'casaalmeida.com.br');
    $('#stageCat').textContent = catOf(segs[0].cat).short;
    $('#stageName').textContent = segs[0].name;
    if (segs[1]) imgs[1].src = cover(segs[1]);
    if (segs[4]) imgs[2].src = cover(segs[4]);
    setInterval(function () {
      if (document.hidden) return;
      i = (i + 1) % imgs.length;
      imgs.forEach(function (im, k) { im.classList.toggle('is-active', k === i); });
      var seg = segs[i % segs.length];
      $('#stageUrl').textContent = seg.domain || 'demonstracao.com.br';
      $('#stageCat').textContent = catOf(seg.cat).short;
      $('#stageName').textContent = seg.name;
    }, 4200);
  }

  /* ---------------------------------------------------------
     Inicialização
     --------------------------------------------------------- */
  function init() {
    syncTotals();
    injectThemes();
    renderCategories();
    renderChips();
    renderGallery();
    renderFeatured();
    renderFeatures();
    renderCatalogGrid();
    initChrome();
    initLightbox();
    initDelegation();
    initScrollFx();
    initCounters();
    initParticles();
    initStage();
    initPreloader();
    observeReveal();
    $('#year').textContent = new Date().getFullYear();

    // deep link
    var m = location.hash.match(/#modelo\/(.+)$/);
    if (m) setTimeout(function () { openDemo(m[1], null); }, 700);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
