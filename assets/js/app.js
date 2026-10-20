let activeCategory = "Todos";
let searchTerm = "";
let sortBy = "featured";
let visibleCount = 9;
let selectedModelId = null;

const el = (id)=>document.getElementById(id);

function init(){
  // load from storage if admin changed
  const stored = localStorage.getItem('sitefolio_models');
  if(stored){
    try{ const arr = JSON.parse(stored); if(Array.isArray(arr) && arr.length) MODELS.splice(0, MODELS.length, ...arr); }catch(e){}
  }
  renderChips();
  renderModeloSelect();
  showSkeleton(true);
  setTimeout(()=>{
    showSkeleton(false);
    applyFilters();
    renderFeatured();
    renderPopular();
    rotateHero();
  }, 700);

  el('searchInput').addEventListener('input', debounce((e)=>{
    searchTerm = e.target.value.trim().toLowerCase();
    visibleCount = 9;
    applyFilters();
  }, 300));
  el('searchInput').addEventListener('keydown', (e)=>{ if(e.key==='Enter'){ e.preventDefault(); applyFilters(); }});
  el('sortSelect').addEventListener('change', (e)=>{ sortBy = e.target.value; applyFilters(); });

  // open modal if hash
  if(location.hash.includes('solicitar')) openModal();
}

function renderChips(){
  const wrap = el('filterChips');
  wrap.innerHTML = CATEGORIES.map(cat=>`
    <button class="chip ${activeCategory===cat?'active':''}" onclick="setCategory('${cat.replace(/'/g, "\\'")}')">${cat}</button>
  `).join('');
}

function setCategory(cat){
  activeCategory = cat;
  visibleCount = 9;
  renderChips();
  applyFilters();
  el('modelos').scrollIntoView({behavior:'smooth', block:'start'});
}

function renderModeloSelect(){
  const sel = el('modeloSelect');
  if(!sel) return;
  sel.innerHTML = MODELS.map(m=>`<option value="${m.id}">${m.name} — ${m.category}</option>`).join('') + `<option value="personalizado">Modelo personalizado (não listado)</option>`;
  if(selectedModelId) sel.value = selectedModelId;
}

function getFiltered(){
  let list = [...MODELS];
  if(activeCategory !== "Todos"){
    list = list.filter(m=> m.category === activeCategory);
  }
  if(searchTerm){
    list = list.filter(m=> 
      m.name.toLowerCase().includes(searchTerm) ||
      m.category.toLowerCase().includes(searchTerm) ||
      m.description.toLowerCase().includes(searchTerm) ||
      (m.features && m.features.join(' ').toLowerCase().includes(searchTerm))
    );
  }
  // sort
  if(sortBy==='featured'){
    list.sort((a,b)=> (b.featured?1:0) - (a.featured?1:0) || (b.popular?1:0) - (a.popular?1:0));
  } else if(sortBy==='popular'){
    list.sort((a,b)=> (b.popular?1:0) - (a.popular?1:0));
  } else if(sortBy==='new'){
    list.sort((a,b)=> (b.isNew?1:0) - (a.isNew?1:0));
  } else if(sortBy==='name'){
    list.sort((a,b)=> a.name.localeCompare(b.name));
  }
  return list;
}

function applyFilters(){
  const filtered = getFiltered();
  const grid = el('modelsGrid');
  const empty = el('emptyState');
  const loadMoreWrap = el('loadMoreWrap');
  const resultInfo = el('resultInfo');

  if(filtered.length===0){
    grid.innerHTML='';
    empty.style.display='block';
    loadMoreWrap.style.display='none';
    resultInfo.textContent='Nenhum resultado para este filtro.';
    return;
  }
  empty.style.display='none';
  const toShow = filtered.slice(0, visibleCount);
  grid.innerHTML = toShow.map(cardHTML).join('');
  resultInfo.textContent = `${filtered.length} modelo${filtered.length!==1?'s':''} encontrado${filtered.length!==1?'s':''}${activeCategory!=='Todos'?' em '+activeCategory:''} • Mostrando ${toShow.length}`;
  loadMoreWrap.style.display = filtered.length > visibleCount ? 'flex' : 'none';
  el('featuredCount').textContent = `${filtered.length} modelos`;
  lazyLoad();
}

function loadMore(){
  visibleCount += 6;
  applyFilters();
}
function clearFilters(){
  activeCategory='Todos'; searchTerm=''; el('searchInput').value=''; visibleCount=9; renderChips(); applyFilters();
}

function cardHTML(m){
  const badge = m.isNew ? 'Novo' : m.featured ? 'Destaque' : m.popular ? 'Popular' : '';
  return `
  <article class="card">
    <div class="card-media">
      <img src="${m.thumb}" alt="${m.name}" loading="lazy" onerror="this.src='${m.image}'">
      <div class="card-topbar">
        <span class="tag">${m.category}</span>
        ${badge ? `<span class="tag dark">${badge}</span>`:''}
      </div>
      <div class="card-overlay">
        <a href="${m.demo}" class="overlay-btn">Visualizar modelo</a>
      </div>
    </div>
    <div class="card-body">
      <div class="card-category">${m.category} • ${m.pages.slice(0,2).join(' • ')}</div>
      <h3 class="card-title">${m.name}</h3>
      <p class="card-desc">${m.description}</p>
      <div class="card-meta">
        <span class="price">${m.price}</span>
        <div class="card-actions">
          <a href="${m.demo}" class="btn-card">Visualizar</a>
          <button class="btn-card primary" onclick="openModal('${m.id}')">Quero este</button>
        </div>
      </div>
    </div>
  </article>
  `;
}

function renderFeatured(){
  const list = MODELS.filter(m=>m.featured).slice(0,6);
  el('featuredGrid').innerHTML = list.map(cardHTML).join('');
  el('featuredCount').textContent = `${list.length} destaques`;
  lazyLoad();
}
function renderPopular(){
  const list = MODELS.filter(m=>m.popular).slice(0,6);
  el('popularGrid').innerHTML = list.map(cardHTML).join('');
  lazyLoad();
}

function showSkeleton(show){
  const sk = el('skeletonGrid');
  const grid = el('modelsGrid');
  if(show){
    sk.style.display='grid';
    grid.style.display='none';
    sk.innerHTML = Array.from({length:6}).map(()=>`
      <div class="skeleton-card">
        <div class="skeleton skeleton-img"></div>
        <div style="padding:16px">
          <div class="skeleton skeleton-line tiny"></div>
          <div class="skeleton skeleton-line"></div>
          <div class="skeleton skeleton-line short"></div>
        </div>
      </div>
    `).join('');
  } else {
    sk.style.display='none';
    grid.style.display='grid';
  }
}

function openModal(modelId){
  if(modelId) selectedModelId = modelId;
  renderModeloSelect();
  if(selectedModelId) el('modeloSelect').value = selectedModelId;
  el('modal').classList.add('open');
  document.body.style.overflow='hidden';
}
function closeModal(){
  el('modal').classList.remove('open');
  document.body.style.overflow='';
}
el('modal').addEventListener('click', (e)=>{ if(e.target===e.currentTarget) closeModal(); });
document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closeModal(); });

function submitLead(e){
  e.preventDefault();
  const fd = new FormData(e.target);
  const data = Object.fromEntries(fd.entries());
  const modelName = MODELS.find(m=>m.id===data.modelo)?.name || data.modelo;
  const msg = encodeURIComponent(`Olá, gostaria de solicitar um site baseado no modelo ${modelName}.\n\nNome: ${data.nome}\nEmpresa: ${data.empresa || '-'}\nWhatsApp: ${data.whatsapp}\nCidade: ${data.cidade || '-'}\nMensagem: ${data.mensagem || '-'}\n\nVi no SITEFOLIO e quero contratar.`);
  // store lead locally
  const leads = JSON.parse(localStorage.getItem('sitefolio_leads')||'[]');
  leads.push({...data, modelName, date:new Date().toISOString()});
  localStorage.setItem('sitefolio_leads', JSON.stringify(leads));
  window.open(`https://wa.me/5567999016886?text=${msg}`, '_blank');
  closeModal();
  e.target.reset();
  renderModeloSelect();
}
function openWhatsappDirect(){
  const sel = el('modeloSelect');
  const modelId = sel.value;
  const modelName = MODELS.find(m=>m.id===modelId)?.name || modelId;
  const msg = encodeURIComponent(`Olá, gostaria de solicitar um site baseado no modelo ${modelName}.`);
  window.open(`https://wa.me/5567999016886?text=${msg}`, '_blank');
}

function toggleDrawer(){
  el('drawer').classList.toggle('open');
  document.body.style.overflow = el('drawer').classList.contains('open') ? 'hidden' : '';
}

function lazyLoad(){
  // simple intersection for future; now images already lazy
}

function debounce(fn, wait){
  let t; return (...args)=>{ clearTimeout(t); t=setTimeout(()=>fn(...args), wait); };
}

let heroIndex=0;
function rotateHero(){
  setInterval(()=>{
    heroIndex = (heroIndex+1)%MODELS.length;
    const m = MODELS[heroIndex];
    const img = el('heroPreviewImg');
    if(img){
      img.style.opacity=.5;
      setTimeout(()=>{ img.src=m.thumb; img.alt=m.name; el('heroPreviewTitle').textContent=m.name; el('heroPreviewCat').textContent=m.category + ' • ' + m.features[0]; img.style.opacity=1; },200);
    }
  }, 3500);
}

document.addEventListener('DOMContentLoaded', init);
