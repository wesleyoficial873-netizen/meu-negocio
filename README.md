# Henrique — Sites & Catálogos Digitais

Showroom digital que apresenta **84 demonstrações completas** — sites para 10 segmentos de negócio e 8 estilos de catálogo digital. Cada demonstração é uma página funcional com identidade visual própria, aberta dentro da própria vitrine por uma transição cinematográfica.

## Como abrir

Não precisa de build nem de instalação.

**Opção 1 — servidor local (recomendado)**

```bash
python3 -m http.server 8080
# abra http://localhost:8080
```

**Opção 2 — abrir direto**

Dê um duplo clique em `index.html`. Tudo funciona, inclusive filtros, busca, demonstrações e lightbox — apenas a URL profunda (`#modelo/<id>`) é ignorada em `file://`.

## Estrutura

```
index.html                  vitrine completa (pt-BR, SEO, JSON-LD, favicon SVG)
assets/css/core.css         chrome da vitrine: header, hero, filtros, grid, overlay, lightbox
assets/css/demo.css         estilos das demonstrações (11 layouts) + chrome do overlay
assets/js/data/             00-categorias.js → 11-catalogos.js (dados + helpers)
assets/js/render/           base.js, layouts-a.js, layouts-b.js, layouts-c.js
assets/js/app.js            roteamento do showroom, filtros, busca, overlay, animações
assets/img/                 imagens locais e placeholder SVG
```

### Camada de dados

Cada arquivo em `assets/js/data/` registra demonstrações com o helper global `S({...})`, que empilha em `window.SEGMENTS`. A ordem de carregamento importa: `00-categorias.js` define `WA_NUMBER`, `WA_DEFAULT`, `photo()`, `THEMES`, `CATEGORIES` e `S()`.

```js
S({
  id: 'pizzaria-moderna',
  cat: 'gastronomia',
  layout: 'menu',            // esc, pic, wa, demoMsg… definem o layout
  theme: 'warm',             // tema de cor (ver THEMES)
  v: 1,                      // variação do layout
  name: 'Pizzaria Moderna',
  brand: 'Forno Nero',
  hero: 'l:gastronomia/pizzaria-moderna-hero.jpg',
  imgs: ['u:1513104890138-7c749659a591', 'l:gastronomia/pizzaria-moderna-a.jpg'],
  nav: ['Início', 'Menu', 'Sobre', 'Contato'],
  groups: [
    ['Menu', 'Assadas em forno a lenha', [
      ['Margherita', 'Molho artesanal…', 'R$ 58', 'Clássica', 'u:1574071318508-1cdbab80d002', ['Forno a lenha']]
    ]]
  ],
  info: { addr: 'Rua das Oliveiras, 120', hours: 'Ter–Dom · 18h às 23h30', city: 'Campo Grande, MS' },
  domain: 'fornonero.com.br'
})
```

### Imagens

Duas formas em qualquer campo de imagem:

| Referência | Resultado |
| --- | --- |
| `u:<id-do-unsplash>` | `https://images.unsplash.com/photo-<id>?auto=format&fit=crop&w=…&q=72` |
| `l:<caminho>` | `assets/img/<caminho>` (arquivo local) |

Parâmetros extras com `|`: `'u:1500382017468-9049fed747ef|rect=200,0,1300,900'` gera um recorte diferente da mesma foto — usado para manter cada vitrine com imagem de capa única.

As fotos do Unsplash são **hotlinks** (nenhum download, nenhuma API paga). O script `photo()` já aplica `w=` e `q=72` para carregar leve; `thumb(seg, w)` em `app.js` reduz ainda mais as miniaturas dos cards. Toda `<img>` tem `onerror` apontando para `window.DEMO_FALLBACK`, então nenhuma imagem quebrada aparece.

Se quiser hospedar tudo localmente, coloque os arquivos em `assets/img/` e troque `u:` por `l:`.

## Como adicionar uma nova demonstração

1. Abra o arquivo de dados do segmento (ex.: `assets/js/data/01-gastronomia.js`).
2. Copie um bloco `S({...})` existente e ajuste `id` (único), `name`, `brand`, `kicker`, `head`, `lede`, textos, `groups`, `stats`, `info`, `cta`, `domain`, `tags`.
3. Escolha `layout` (`pro`, `menu`, `retail`, `market`, `agro`, `beauty`, `estate`, `auto`, `events`, `stay`, `catalog`) e `theme` (`noir`, `ivory`, `warm`, `ruby`, `sage`, `royal`, `forest`, `tech`, `rose`, `sand`, `brutal`, `ocean`, `plum`, `steel`, `clay`, `mint`).
4. Dê a ela uma imagem de capa exclusiva (`hero`).
5. Atualize os contadores em `index.html` (hero, `data-count`, "84 modelos") se o total mudar.

A vitrine, os filtros, a busca, o rail de destaques e o rodapé se atualizam sozinhos a partir de `window.SEGMENTS`.

## Interações implementadas

- Preloader com progresso real, header com barra de progresso de scroll, menu mobile, busca global (`⌘/Ctrl + K`), filtros por categoria, busca na vitrine, contador de resultados, estado vazio com "limpar filtros".
- Cards com revelação progressiva (IntersectionObserver), tilt/zoom no hover, varredura de luz, partículas no hero, contadores animados, rotação automática da "tela" do hero a cada 4,2 s.
- Demonstração em overlay com animação FLIP (o card se expande em tela cheia), loader elegante, botão "voltar à galeria", deep link `#modelo/<id>`, `ESC` para sair.
- Dentro das demos: navegação por âncoras, filtros de grupo, busca interna, carrinho/pedido por WhatsApp, agendamento, galeria com lightbox, paginação de catálogo, favoritos.
- Acessibilidade: `aria-*`, foco visível, `prefers-reduced-motion`, alvos de toque grandes e bloco `@media (hover:none)`.

## Contato

WhatsApp **67 99901-6886** — todos os botões de conversão usam `https://wa.me/5567999016886` com a mensagem já preenchida. Nenhum valor, plano ou tabela de preço é exibido no site.
