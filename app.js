/* ==========================================================================
   Black Man Couture — moteur du site (Jëfya)
   Lit window.SITE (content.js). Aucune donnée client ici.
   Vues : accueil · #collection(-categorie) · #modele-001
   Panier : tiroir latéral, enregistré dans le navigateur du visiteur.
   ========================================================================== */
(function () {
  const S = window.SITE;
  const root = document.getElementById('site');
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* stockage indisponible : le panier reste en mémoire */ } },
  };
  document.documentElement.style.setProperty('--mark', `url("${S.brand.mark}")`);
  if (S.brand.markRatio) document.documentElement.style.setProperty('--mark-ratio', S.brand.markRatio);

  /* ---------- Icônes ---------- */
  const I = {
    bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M5 8h14l-1 12H6L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m20 20-4.8-4.8"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M3 7h18M3 12h18M3 17h12"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
    arrow: '<svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M7 17 17 7M9 7h8v8"/></svg>',
    poly: '<svg class="poly" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1"><polygon points="50,2 84,16 98,50 84,84 50,98 16,84 2,50 16,16"/></svg>',
    chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.5 11.6a8.5 8.5 0 0 1-12.4 7.5L3.5 20.5l1.4-4.4A8.5 8.5 0 1 1 20.5 11.6Z"/><path d="M9 9.2c.3 1.9 1.9 3.9 4.2 4.8l1.2-1.1 1.9.9-.4 1.6c-3.6.2-7.9-3.3-8-7.3l1.6-.4.9 1.9Z"/></svg>',
    needle: '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><path d="M9 31 30 10"/><ellipse cx="31.6" cy="8.4" rx="1.5" ry="2.9" transform="rotate(45 31.6 8.4)"/><path d="M30.5 9.5c3.4 2.2 4.4 6.6 1.1 9.9-3.9 3.9-8.9-.5-12.8 3.4S16.7 32 12 33"/></svg>',
    globe: '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="20" cy="20" r="14"/><path d="M6 20h28M20 6c4 4 6 9 6 14s-2 10-6 14c-4-4-6-9-6-14s2-10 6-14Z"/></svg>',
  };

  /* ---------- Devises ---------- */
  const CUR = S.currencies;
  let cur = store.get('bmc-cur', CUR.default);
  if (!CUR.list.some((c) => c.code === cur)) cur = CUR.default;
  const curOf = (code) => CUR.list.find((c) => c.code === code);
  // Prix unitaire converti puis arrondi : les totaux sont la somme exacte des lignes affichées
  const unit = (xof, code = cur) => { const c = curOf(code); const f = 10 ** c.decimals; return Math.round((xof / c.perUnit) * f) / f; };
  const fmt = (v, code = cur) => {
    const c = curOf(code);
    const n = v.toLocaleString('fr-FR', { minimumFractionDigits: c.decimals, maximumFractionDigits: c.decimals }).replace(/[\u202f\u00a0]/g, ' ');
    return `${c.prefix || ''}${n}${c.suffix || ''}`;
  };
  const money = (xof, code = cur, qty = 1) => fmt(unit(xof, code) * qty, code);
  const priceEls = []; // éléments à remettre à jour quand la devise change

  /* ---------- Catalogue ---------- */
  const P = S.products;
  const byRef = (r) => P.find((p) => p.ref === r);
  const catOf = (id) => S.categories.find((c) => c.id === id);
  const todo = (on, label = 'À confirmer') => (on && S.prototype ? `<span class="todo">${esc(label)}</span>` : '');
  const wa = (text) => `https://wa.me/${S.contact.whatsapp}?text=${encodeURIComponent(text)}`;

  /* ---------- Gabarits ---------- */
  const brandHTML = (dark) => `<a class="brand" href="#top" aria-label="${esc(S.brand.name)} — accueil"><span class="mk" aria-hidden="true"></span><span><b>${esc(S.brand.word)}</b><small>${esc(S.brand.sub)}</small></span></a>`;
  const priceSpan = (xof, cls = '') => `<span class="${cls}" data-xof="${xof}">${money(xof)}</span>`;

  const topbar = `
  <div class="topbar"><div class="wrap">
    <span class="mono">${esc(S.brand.city)}</span>
    <span class="mono side">${esc(S.brand.tagline)}</span>
    <span class="side"><a class="mono" href="${wa('Bonjour Black Man Couture, j’ai une question.')}" target="_blank" rel="noopener">WhatsApp ${esc(S.contact.whatsappDisplay)}</a></span>
  </div></div>`;

  const curSwitch = `<div class="cur" role="group" aria-label="Devise">${CUR.list.map((c) => `<button type="button" data-cur="${c.code}" aria-pressed="${c.code === cur}">${esc(c.label)}</button>`).join('')}</div>`;
  const header = `
  <header class="header" id="header"><div class="wrap">
    <button class="icon-btn burger" id="burger" aria-label="Ouvrir le menu">${I.menu}</button>
    <nav class="nav" aria-label="Navigation principale">
      <a href="#collection">Collection</a>
      ${S.categories.map((c) => `<a href="#collection-${c.id}">${esc(c.label)}</a>`).join('')}
      <a href="#commander">Commander</a>
    </nav>
    ${brandHTML()}
    <div class="tools">
      ${curSwitch}
      <button class="icon-btn search-btn" data-search aria-label="Rechercher un modèle">${I.search}</button>
      <button class="icon-btn" id="cartBtn" aria-label="Ouvrir le panier">${I.bag}<span class="badge" id="badge">0</span></button>
    </div>
  </div></header>`;

  const menu = `
  <div class="menu" id="menu" aria-hidden="true">
    <div class="menu-top">${brandHTML(true)}<button class="icon-btn" id="menuClose" aria-label="Fermer le menu">${I.close}</button></div>
    <nav class="menu-links">
      <a href="#collection">Collection</a>
      ${S.categories.map((c) => `<a href="#collection-${c.id}">${esc(c.label)}</a>`).join('')}
      <a href="#commander">Commander</a>
    </nav>
    <div class="menu-foot">
      <button type="button" class="btn btn--light" data-search>${I.search}Rechercher un modèle</button>
      <p class="mono muted">${esc(S.brand.city)} · ${esc(S.contact.whatsappDisplay)}</p>
    </div>
  </div>`;

  // Hero (réf. MAFIA / EVORA)
  const wordHTML = [...S.brand.word].map((c, i) => (c === ' ' ? '<span class="sp"> </span>' : `<span class="ch" style="--i:${i}">${esc(c)}</span>`)).join('');
  const hero = `
  <section class="hero" id="top"><div class="wrap">
    <p class="hero-kicker">${S.hero.kicker.map((k) => `<span>${esc(k)}</span>`).join('')}</p>
    <h1 class="hero-word" aria-label="${esc(S.brand.name)}"><span class="w" id="heroWord">${wordHTML}</span></h1>
    <p class="hero-sub" aria-hidden="true">${esc(S.brand.sub)}</p>
    <div class="hero-fig"><img src="${esc(S.hero.image)}" alt="Ensemble Black Man Couture porté" fetchpriority="high"></div>
    <div class="hero-ctas">
      <a class="btn" href="#collection">Voir la collection ${I.arrow.replace('class="arrow"', '')}</a>
      <a class="link" href="#commander">Comment commander</a>
    </div>
    <p class="hero-corner">${S.hero.corner.map((k) => `<span>${esc(k)}</span>`).join('')}</p>
  </div></section>`;

  // Bandeau noir : catégories + engagements
  const catImg = (id) => (P.find((p) => p.cat === id) || {}).img;
  const band = `
  <section class="band on-ink" aria-label="Catégories"><div class="wrap">
    ${S.categories.map((c) => `
    <a class="band-item" href="#collection-${c.id}">
      <span class="band-thumb"><img src="${esc(catImg(c.id))}" alt="" loading="lazy"></span>
      <span><h3>${esc(c.label)}</h3><p>${esc(c.text)}</p><span class="go">Voir →</span></span>
    </a>`).join('')}
    <div class="band-item">
      <span class="band-thumb icon">${I.needle}</span>
      <span><h3>Sur mesure</h3><p>${esc(S.brand.tagline)}.</p><span class="go">Taille « Sur-mesure » à la commande</span></span>
    </div>
    <div class="band-item">
      <span class="band-thumb icon">${I.globe}</span>
      <span><h3>Sénégal & diaspora</h3><p>Commande depuis ${esc(S.brand.city.split(',')[0])} ou l’étranger, prix en F CFA, € ou $.</p>${todo(true, 'Livraison à confirmer')}</span>
    </div>
  </div></section>`;

  // Pièce vedette (réf. HRZN)
  const F = byRef(S.featured) || P[0];
  const feat = `
  <section class="feat" id="vedette" data-ghost="${esc(S.brand.sub)}"><div class="wrap">
    <div class="feat-info">
      <p class="tag">[ Pièce vedette ] &nbsp; [ Modèle <b id="fRef">${esc(F.ref)}</b> ]</p>
      <h2 class="h-disp" id="fName">${esc(F.name)}<sup>BM</sup></h2>
      <div class="opt-row"><span class="tag">Taille</span><div class="feat-sizes" id="fSizes">${S.sizes.map((z) => `<button type="button" data-size="${esc(z)}" aria-pressed="false">${esc(z)}</button>`).join('')}</div></div>
      <div class="opt-row"><span class="tag">Couleur</span><span class="swatch" id="fColor" style="--c:${F.hex}"><i></i>${esc(F.color)}</span></div>
      <div class="feat-buy">
        <button type="button" class="ring" id="fAdd" aria-label="Ajouter au panier">${I.poly}${I.arrow}</button>
        <div><span class="tag">Ajouter au panier</span><span class="price" id="fPrice" data-xof="${F.price}">${money(F.price)}</span></div>
      </div>
    </div>
    <div class="feat-media"><img id="fImg" src="${esc(F.img)}" alt="${esc(F.name)}" loading="lazy"></div>
    <div class="feat-thumbs">
      <div class="feat-strip" id="fStrip">${P.slice(0, 4).map((p) => `<button type="button" data-ref="${p.ref}" aria-pressed="${p.ref === F.ref}" aria-label="${esc(p.name)}"><img src="${esc(p.img)}" alt="" loading="lazy"></button>`).join('')}</div>
      <div class="feat-count mono"><span id="fIdx">01</span><i></i><span>${String(4).padStart(2, '0')}</span></div>
    </div>
  </div></section>`;

  // Cartes produit
  const card = (p) => `
    <article class="card rv" data-cat="${p.cat}" data-ref="${p.ref}">
      <a class="card-link" href="#modele-${p.ref}" aria-label="Modèle ${p.ref}, ${esc(p.name)}">
        <div class="card-media"><span class="card-ref">[ ${esc(p.ref)} ]</span><img src="${esc(p.img)}" alt="${esc(p.name)}" loading="lazy"></div>
        <div class="card-info">
          <h3 class="card-name">${esc(p.name)}</h3>
          <div class="card-row"><span class="swatch" style="--c:${p.hex}"><i></i>${esc(p.color)}</span>${priceSpan(p.price, 'card-price')}</div>
        </div>
      </a>
      <button type="button" class="card-add" data-quick="${p.ref}" aria-label="Choisir la taille de ${esc(p.name)}">${I.plus}</button>
    </article>`;
  const chips = (scope) => `<div class="chips" role="group" aria-label="Filtrer">${[{ id: 'all', label: 'Tout' }, ...S.categories].map((c, i) => `<button type="button" data-filter="${c.id}" data-scope="${scope}" aria-pressed="${i === 0}">${esc(c.label)}</button>`).join('')}</div>`;
  const searchBox = (id) => `<label class="search" for="${id}">${I.search}<input id="${id}" type="search" placeholder="Numéro du modèle, ex : 002" autocomplete="off" enterkeyhint="search"></label>`;
  const curNote = `<p class="price-note">${esc(CUR.note)} ${todo(true, 'Prix d’exemple')}</p>`;

  const collHome = `
  <section class="coll" id="selection"><div class="wrap">
    <div class="coll-head">
      <h2 class="h-disp">La collection</h2>
      <div class="coll-meta">
        <p class="tag">[ Ensembles ]<br>[ ${esc(S.categories.map((c) => c.label).join(' · '))} ]</p>
        <p class="tag">Coupe ajustée<br>Broderies & liserés<br>Sur mesure</p>
      </div>
    </div>
    <div class="coll-bar">${chips('home')}<a class="link" href="#collection">Toute la collection</a></div>
    <div class="grid" id="gridHome">${P.map(card).join('')}</div>
    ${curNote}
  </div></section>`;

  const M = S.brand.motto;
  const motto = `
  <section class="motto"><div class="wrap">
    <div class="motto-text">
      <p class="tag">[ ${esc(S.brand.name)} ]</p>
      <h2 class="h-disp">${M.map((m) => `<span>${esc(m)}</span>`).join('')}</h2>
      <p>Couture africaine moderne pour l’homme classe, confiant et distingué. ${esc(S.brand.tagline)}.</p>
      <a class="btn" href="#collection">Découvrir les modèles</a>
    </div>
    <div class="motto-fig"><img src="${esc((byRef('004') || P[1]).img)}" alt="" loading="lazy"></div>
  </div></section>`;

  const how = `
  <section class="how" id="commander"><div class="wrap">
    <div class="how-head"><h2 class="h-disp">Comment commander</h2><p class="tag">[ Panier → coordonnées → WhatsApp ]</p></div>
    <ol class="steps">${S.howTo.map((s) => `<li><h3>${esc(s.t)}</h3><p>${esc(s.d)}</p></li>`).join('')}</ol>
    <div class="deliv" id="livraison">${S.delivery.items.map((d) => `<div><h4>${esc(d.t)}</h4><p>${esc(d.d)}</p>${todo(d.todo)}</div>`).join('')}</div>
  </div></section>`;

  const footer = `
  <footer class="footer on-ink"><div class="wrap">
    <div class="foot-cols">
      <div><img class="foot-logo" src="${esc(S.brand.logo)}" alt="Logo ${esc(S.brand.name)}"><p>${esc(S.brand.tagline)}. Couture africaine moderne pour homme, ${esc(S.brand.city)}.</p></div>
      <div><h4>Boutique</h4><ul><li><a href="#collection">Collection</a></li>${S.categories.map((c) => `<li><a href="#collection-${c.id}">${esc(c.label)}</a></li>`).join('')}<li><a href="#commander">Comment commander</a></li></ul></div>
      <div><h4>Contact</h4><ul><li><a href="${wa('Bonjour Black Man Couture, j’ai une question.')}" target="_blank" rel="noopener">WhatsApp</a></li><li class="muted">${esc(S.contact.whatsappDisplay)}</li><li class="muted">${esc(S.brand.city)}</li></ul></div>
      <div><h4>Suivre</h4><ul>${S.socials.filter((s) => s.url || S.prototype).map((s) => (s.url ? `<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)} ↗</a></li>` : `<li class="muted">${esc(s.label)} ${todo(true, 'Lien à fournir')}</li>`)).join('')}</ul></div>
    </div>
    <p class="foot-word" aria-hidden="true"><span class="w" id="footWord">${esc(S.brand.word)} ${esc(S.brand.sub)}</span></p>
    <div class="foot-bottom mono"><span>© ${new Date().getFullYear()} ${esc(S.brand.name)}</span><span>${esc(S.footerCredit)}</span></div>
  </div></footer>`;

  // Page collection
  const collPage = `
  <main id="pColl" hidden>
    <section class="page-head"><div class="wrap"><nav class="crumbs tag" aria-label="Fil d'Ariane"><a href="#top">Accueil</a><span>/</span><span>Collection</span></nav></div></section>
    <section class="coll"><div class="wrap" style="padding-top:20px">
      <div class="coll-head"><h1 class="h-disp">La collection</h1><p class="tag" id="cCount"></p></div>
      <div class="coll-bar">${chips('page')}${searchBox('cSearch')}</div>
      <div class="grid" id="gridPage">${P.map(card).join('')}<p class="empty" id="cEmpty" hidden></p></div>
      ${curNote}
    </div></section>
  </main>`;

  // Fiche modèle
  const pdpPage = `
  <main id="pPdp" hidden>
    <section class="page-head"><div class="wrap"><nav class="crumbs tag" aria-label="Fil d'Ariane"><a href="#top">Accueil</a><span>/</span><a href="#collection">Collection</a><span>/</span><span id="dCrumb"></span></nav></div></section>
    <section class="pdp"><div class="wrap">
      <div class="pdp-media" id="dMedia"></div>
      <div class="pdp-info">
        <p class="tag" id="dCat"></p>
        <h1 class="h-disp" id="dName"></h1>
        <p class="pdp-detail" id="dDetail"></p>
        <div class="pdp-price"><span id="dPrice"></span><small>${esc(CUR.note)}</small></div>
        <fieldset class="fieldset" id="dSizesF">
          <legend><span class="tag">Taille</span><span class="err-msg" id="dSizeErr" hidden>Choisissez une taille</span></legend>
          <div class="sizes">${S.sizes.map((z, i) => `<label><input type="radio" name="dsize" value="${esc(z)}" id="dz${i}"><span>${esc(z)}</span></label>`).join('')}</div>
        </fieldset>
        <div class="pdp-actions">
          <div class="qty" aria-label="Quantité"><button type="button" data-q="-1" aria-label="Moins">−</button><output id="dQty">1</output><button type="button" data-q="1" aria-label="Plus">+</button></div>
          <button type="button" class="btn btn--red" id="dAdd">${I.bag}Ajouter au panier</button>
        </div>
        <ul class="pdp-more">
          <li>Taille « Sur-mesure » : la maison vous contacte pour vos mesures.</li>
          <li>Commande confirmée sur WhatsApp : disponibilité, livraison et paiement.</li>
          <li>Livraison au Sénégal et à l’étranger ${todo(true, 'Tarifs à confirmer')}</li>
        </ul>
      </div>
    </div></section>
  </main>`;

  // Panier
  const drawer = `
  <div class="drawer" id="drawer" hidden>
    <div class="drawer-bg" data-close></div>
    <aside class="drawer-panel" role="dialog" aria-modal="true" aria-labelledby="dwTitle">
      <div class="drawer-head">
        <div><h2 id="dwTitle">Panier</h2><div class="drawer-steps"><span id="st1" class="on">01 Panier</span><span id="st2">02 Coordonnées</span></div></div>
        <button type="button" class="x-btn" data-close aria-label="Fermer">${I.close}</button>
      </div>
      <div class="drawer-body" id="dwBody"></div>
      <div class="drawer-foot" id="dwFoot"></div>
    </aside>
  </div>`;

  const mbar = `<div class="mbar" id="mbar"><span class="p" id="mPrice"></span><button type="button" class="btn btn--red" id="mAdd">${I.bag}Ajouter au panier</button></div>`;
  const loader = !matchMedia('(prefers-reduced-motion: reduce)').matches ? `
  <div class="loader" id="loader"><div class="loader-in"><img src="${esc(S.brand.logo)}" alt="${esc(S.brand.name)}"><span class="loader-line"><i></i></span><p>${esc(S.brand.tagline)}</p></div></div>` : '';
  const proto = S.prototype ? '<button type="button" class="proto" id="proto" aria-pressed="true"><i></i>Repères prototype</button>' : '';

  root.innerHTML = loader + topbar + header + menu
    + '<main id="pHome">' + hero + band + feat + collHome + motto + how + '</main>'
    + collPage + pdpPage + footer + drawer + mbar + proto + '<div class="toast" id="toast" role="status"></div>';
  if (S.prototype) document.body.classList.add('show-todo');

  /* ---------- Écran d'entrée ---------- */
  const ld = $('#loader');
  if (ld) {
    document.body.classList.add('is-loading');
    let done = false;
    const finish = () => { if (done) return; done = true; ld.classList.add('out'); document.body.classList.remove('is-loading'); setTimeout(() => ld.remove(), 1100); };
    setTimeout(finish, 2300); ld.addEventListener('click', finish);
  }

  /* ---------- Mots géants ajustés à la largeur ---------- */
  const fit = (id, mode) => {
    const w = document.getElementById(id); if (!w) return;
    const el = w.parentElement; el.style.fontSize = '';
    const base = parseFloat(getComputedStyle(el).fontSize);
    let avail;
    if (mode === 'hero') { const wr = el.parentElement; const cs = getComputedStyle(wr); avail = innerWidth <= 720 ? innerWidth - 20 : (wr.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight)) * 0.98; }
    else avail = el.clientWidth;
    el.style.fontSize = Math.min(base * avail / w.offsetWidth, 520) + 'px';
  };
  const fitAll = () => { fit('heroWord', 'hero'); fit('footWord'); };
  fitAll(); if (document.fonts) document.fonts.ready.then(fitAll); addEventListener('resize', fitAll);

  /* ---------- Toast ---------- */
  const toast = $('#toast'); let tt;
  const say = (msg, action) => {
    toast.innerHTML = `<span>${msg}</span>${action ? `<button type="button" id="toastAct">${esc(action.label)}</button>` : ''}`;
    toast.classList.add('on'); clearTimeout(tt); tt = setTimeout(() => toast.classList.remove('on'), 4200);
    if (action) $('#toastAct').onclick = () => { toast.classList.remove('on'); action.run(); };
  };

  /* ---------- Devise ---------- */
  const refreshPrices = () => {
    $$('[data-xof]').forEach((el) => { el.textContent = money(+el.dataset.xof); });
    $$('[data-cur]').forEach((b) => b.setAttribute('aria-pressed', b.dataset.cur === cur));
    if (step === 2 && !$('#drawer').hidden) refreshStep2(); else renderCart();
    if (current) $('#mPrice').textContent = money(current.price);
  };
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-cur]'); if (!b) return;
    cur = b.dataset.cur; store.set('bmc-cur', cur); refreshPrices();
  });

  /* ---------- Menu mobile ---------- */
  const menuEl = $('#menu');
  const setMenu = (o) => { menuEl.classList.toggle('open', o); menuEl.setAttribute('aria-hidden', !o); document.body.style.overflow = o ? 'hidden' : ''; };
  $('#burger').onclick = () => setMenu(true);
  $('#menuClose').onclick = () => setMenu(false);
  $$('#menu a').forEach((a) => a.addEventListener('click', () => setMenu(false)));

  /* ---------- En-tête au défilement ---------- */
  const hd = $('#header'); const mb = $('#mbar'); let lastY = 0;
  addEventListener('scroll', () => {
    const y = scrollY;
    hd.classList.toggle('scrolled', y > 30);
    hd.classList.toggle('hide', y > 500 && y > lastY + 4); if (y < lastY - 4) hd.classList.remove('hide');
    lastY = y;
    mb.classList.toggle('on', !$('#pPdp').hidden && y > 380);
  }, { passive: true });

  /* ---------- Filtres + recherche ---------- */
  const norm = (v) => String(v).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();
  const applyFilter = (scope, id, q = '') => {
    $$(`[data-scope="${scope}"]`).forEach((b) => b.setAttribute('aria-pressed', b.dataset.filter === id));
    const grid = scope === 'home' ? $('#gridHome') : $('#gridPage');
    const d = (q.match(/\d+/) || [''])[0]; const n = norm(q.replace(/mod[eè]le|n°|#/gi, ''));
    let shown = 0;
    $$('.card', grid).forEach((c) => {
      const p = byRef(c.dataset.ref);
      const okCat = id === 'all' || p.cat === id;
      const okQ = !q.trim() || (d ? Number(p.ref) === Number(d) || p.ref.includes(d) : norm(p.name + ' ' + p.color).includes(n));
      c.hidden = !(okCat && okQ); if (!c.hidden) shown++;
    });
    if (scope === 'page') {
      $('#cCount').textContent = `[ ${shown} modèle${shown > 1 ? 's' : ''} ]`;
      const e = $('#cEmpty'); e.hidden = shown > 0;
      if (!shown) e.innerHTML = `Aucun modèle ne correspond à « ${esc(q)} ». <a href="${wa(`Bonjour, je cherche le modèle ${q} vu sur vos réseaux.`)}" target="_blank" rel="noopener">Envoyez-nous la capture sur WhatsApp</a>.`;
    }
  };
  let pageCat = 'all';
  $$('[data-filter]').forEach((b) => b.addEventListener('click', () => {
    if (b.dataset.scope === 'page') { pageCat = b.dataset.filter; applyFilter('page', pageCat, $('#cSearch').value); }
    else applyFilter('home', b.dataset.filter);
  }));
  const cs = $('#cSearch');
  cs.addEventListener('input', () => applyFilter('page', pageCat, cs.value));
  cs.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    const d = (cs.value.match(/\d+/) || [''])[0]; const p = d && P.find((x) => Number(x.ref) === Number(d));
    if (p) location.hash = `#modele-${p.ref}`;
  });
  $$('[data-search]').forEach((b) => b.addEventListener('click', () => {
    setMenu(false);
    if (location.hash !== '#collection') location.hash = '#collection';
    setTimeout(() => cs.focus({ preventScroll: true }), 160);
  }));

  /* ---------- Pièce vedette ---------- */
  let fRef = F.ref; let fSize = '';
  const setFeat = (ref) => {
    const p = byRef(ref); fRef = ref;
    $('#fRef').textContent = p.ref; $('#fName').innerHTML = `${esc(p.name)}<sup>BM</sup>`;
    $('#fColor').style.setProperty('--c', p.hex); $('#fColor').innerHTML = `<i></i>${esc(p.color)}`;
    const pr = $('#fPrice'); pr.dataset.xof = p.price; pr.textContent = money(p.price);
    const img = $('#fImg'); img.style.opacity = 0; setTimeout(() => { img.src = p.img; img.alt = p.name; img.style.opacity = 1; }, 180);
    $$('#fStrip button').forEach((b, i) => { const on = b.dataset.ref === ref; b.setAttribute('aria-pressed', on); if (on) $('#fIdx').textContent = String(i + 1).padStart(2, '0'); });
  };
  $$('#fStrip button').forEach((b) => b.addEventListener('click', () => setFeat(b.dataset.ref)));
  $$('#fSizes button').forEach((b) => b.addEventListener('click', () => { fSize = b.dataset.size; $$('#fSizes button').forEach((x) => x.setAttribute('aria-pressed', x === b)); }));
  $('#fAdd').addEventListener('click', () => {
    if (!fSize) { say('Choisissez d’abord une taille.'); $('#fSizes').animate([{ transform: 'translateX(-4px)' }, { transform: 'translateX(4px)' }, { transform: 'none' }], { duration: 300 }); return; }
    addToCart(fRef, fSize, 1);
  });

  /* ---------- Panier ---------- */
  let cart = store.get('bmc-cart', []).filter((l) => byRef(l.ref));
  const saveCart = () => store.set('bmc-cart', cart);
  const count = () => cart.reduce((n, l) => n + l.qty, 0);
  const totalIn = (code = cur) => cart.reduce((n, l) => n + l.qty * unit(byRef(l.ref).price, code), 0);
  const badge = $('#badge');
  const updBadge = (bump) => { const n = count(); badge.textContent = n; badge.classList.toggle('on', n > 0); if (bump) { badge.classList.remove('bump'); void badge.offsetWidth; badge.classList.add('bump'); } };
  function addToCart(ref, size, qty) {
    const ex = cart.find((l) => l.ref === ref && l.size === size);
    if (ex) ex.qty = Math.min(ex.qty + qty, 20); else cart.push({ ref, size, qty });
    saveCart(); updBadge(true); renderCart();
    const p = byRef(ref);
    say(`${esc(p.name)} · ${esc(size)} ajouté au panier`, { label: 'Voir le panier', run: openCart });
  }
  let step = 1;
  const altTotal = () => (cur === 'XOF' ? '' : `soit ${fmt(totalIn('XOF'), 'XOF')}`);
  const curMini = () => `<div class="total-row"><span class="tag">Devise</span><div class="cur" role="group" aria-label="Devise">${CUR.list.map((c) => `<button type="button" data-cur="${c.code}" aria-pressed="${c.code === cur}">${esc(c.label)}</button>`).join('')}</div></div>`;
  const recapHTML = () => cart.map((l) => { const p = byRef(l.ref); return `<div><span>${l.qty} × ${esc(p.name)} (${esc(l.size)})</span><span>${money(p.price, cur, l.qty)}</span></div>`; }).join('');
  const foot2 = () => `
        ${curMini()}
        <div class="total-row"><span class="tag">Total</span><div><b>${fmt(totalIn())}</b><div class="alt">${altTotal()}</div></div></div>
        <button type="button" class="btn btn--red" id="sendOrder">${I.chat}Envoyer ma commande sur WhatsApp</button>
        <p class="small-note">WhatsApp s’ouvre avec votre commande déjà rédigée : il ne reste qu’à l’envoyer.</p>`;
  const refreshStep2 = () => { const r = $('.recap'); if (r) r.innerHTML = recapHTML(); $('#dwFoot').innerHTML = foot2(); $('#sendOrder').onclick = sendOrder; };
  function renderCart() {
    const body = $('#dwBody'); const foot = $('#dwFoot');
    if (!body) return;
    $('#st1').classList.toggle('on', step === 1); $('#st2').classList.toggle('on', step === 2);
    $('#dwTitle').textContent = step === 1 ? 'Panier' : 'Vos coordonnées';
    if (step === 1) {
      if (!cart.length) {
        body.innerHTML = `<div class="cart-empty">${I.bag}<p>Votre panier est vide.</p><a class="btn" href="#collection" data-close-link>Voir la collection</a></div>`;
        foot.innerHTML = '';
        $$('[data-close-link]', body).forEach((a) => a.addEventListener('click', closeCart));
        return;
      }
      body.innerHTML = cart.map((l, i) => { const p = byRef(l.ref); return `
        <div class="line">
          <div class="line-img"><img src="${esc(p.img)}" alt=""></div>
          <div>
            <div class="line-top"><div><h3>${esc(p.name)}</h3><span class="tag">Modèle ${esc(p.ref)} · Taille ${esc(l.size)}</span></div><button type="button" class="rm" data-rm="${i}">Retirer</button></div>
            <div class="line-bot">
              <div class="qty sm"><button type="button" data-lq="${i}" data-d="-1" aria-label="Moins">−</button><output>${l.qty}</output><button type="button" data-lq="${i}" data-d="1" aria-label="Plus">+</button></div>
              <span class="line-price">${money(p.price, cur, l.qty)}</span>
            </div>
          </div>
        </div>`; }).join('');
      foot.innerHTML = `
        ${curMini()}
        <div class="total-row"><span class="tag">Total · ${count()} article${count() > 1 ? 's' : ''}</span><div><b>${fmt(totalIn())}</b><div class="alt">${altTotal()}</div></div></div>
        <p class="small-note">Hors frais de livraison, confirmés sur WhatsApp.</p>
        <button type="button" class="btn btn--red" id="goStep2">Commander</button>`;
      $$('[data-rm]', body).forEach((b) => b.onclick = () => { cart.splice(+b.dataset.rm, 1); saveCart(); updBadge(); renderCart(); });
      $$('[data-lq]', body).forEach((b) => b.onclick = () => { const l = cart[+b.dataset.lq]; l.qty = Math.max(1, Math.min(20, l.qty + +b.dataset.d)); saveCart(); updBadge(); renderCart(); });
      $('#goStep2').onclick = () => { step = 2; renderCart(); $('#dwBody').scrollTop = 0; setTimeout(() => $('#oName').focus({ preventScroll: true }), 300); };
    } else {
      const saved = store.get('bmc-client', {});
      body.innerHTML = `
        <form class="form" id="orderForm" novalidate>
          <button type="button" class="back" id="backStep1">← Retour au panier</button>
          <div class="field"><label for="oName">Prénom & Nom</label><input id="oName" autocomplete="name" value="${esc(saved.name || '')}" placeholder="Ex : Moussa Diop"><span class="f-err">Indiquez votre nom</span></div>
          <fieldset class="field"><legend>Où êtes-vous ?</legend>
            <div class="seg">
              <label><input type="radio" name="where" value="sn" ${saved.where !== 'abroad' ? 'checked' : ''}><span><b>Au Sénégal</b><small>Dakar et régions</small></span></label>
              <label><input type="radio" name="where" value="abroad" ${saved.where === 'abroad' ? 'checked' : ''}><span><b>À l’étranger</b><small>Diaspora</small></span></label>
            </div>
          </fieldset>
          <div id="fSn" class="form" style="padding:0">
            <div class="field"><label for="oRegion">Région</label><select id="oRegion"><option value="">Choisir la région</option>${S.regions.map((r) => `<option ${saved.region === r ? 'selected' : ''}>${esc(r)}</option>`).join('')}</select><span class="f-err">Choisissez votre région</span></div>
            <div class="field"><label for="oQuartier">Quartier / adresse</label><input id="oQuartier" autocomplete="street-address" value="${esc(saved.quartier || '')}" placeholder="Ex : Sacré-Cœur 3, villa 12"><span class="f-err">Indiquez votre quartier</span></div>
          </div>
          <div id="fAb" class="form" style="padding:0">
            <div class="two">
              <div class="field"><label for="oCountry">Pays</label><select id="oCountry"><option value="">Choisir le pays</option>${S.countries.map((c) => `<option ${saved.country === c ? 'selected' : ''}>${esc(c)}</option>`).join('')}</select><span class="f-err">Choisissez votre pays</span></div>
              <div class="field"><label for="oCity">Ville</label><input id="oCity" autocomplete="address-level2" value="${esc(saved.city || '')}" placeholder="Ex : Paris"><span class="f-err">Indiquez votre ville</span></div>
            </div>
            <div class="field"><label for="oAddr">Adresse <small>(facultatif)</small></label><input id="oAddr" autocomplete="street-address" value="${esc(saved.addr || '')}" placeholder="Rue, code postal"></div>
          </div>
          <div class="field"><label for="oNote">Note <small>(facultatif)</small></label><textarea id="oNote" rows="2" placeholder="Ex : mesures pour le sur-mesure, date souhaitée…"></textarea></div>
          <div class="recap">${recapHTML()}</div>
        </form>`;
      foot.innerHTML = foot2();
      const sync = () => { const ab = $('input[name="where"]:checked').value === 'abroad'; $('#fSn').hidden = ab; $('#fAb').hidden = !ab; };
      $$('input[name="where"]').forEach((r) => r.addEventListener('change', sync)); sync();
      $$('#orderForm input, #orderForm select').forEach((el) => el.addEventListener('input', () => el.closest('.field').classList.remove('err')));
      $('#backStep1').onclick = () => { step = 1; renderCart(); };
      $('#sendOrder').onclick = sendOrder;
    }
  }
  function sendOrder() {
    const v = (id) => $('#' + id).value.trim();
    const abroad = $('input[name="where"]:checked').value === 'abroad';
    const need = ['oName', ...(abroad ? ['oCountry', 'oCity'] : ['oRegion', 'oQuartier'])];
    let first = null;
    need.forEach((id) => { const bad = !v(id); $('#' + id).closest('.field').classList.toggle('err', bad); if (bad && !first) first = $('#' + id); });
    if (first) { first.focus(); return; }
    const client = { name: v('oName'), where: abroad ? 'abroad' : 'sn', region: v('oRegion'), quartier: v('oQuartier'), country: v('oCountry'), city: v('oCity'), addr: v('oAddr') };
    store.set('bmc-client', client);
    const lines = cart.map((l, i) => { const p = byRef(l.ref); return `${i + 1}. Modèle ${p.ref} — ${p.name} — Taille ${l.size} — Qté ${l.qty} — ${money(p.price, cur, l.qty)}`; });
    const tot = cur === 'XOF' ? fmt(totalIn()) : `${fmt(totalIn())} (soit ${fmt(totalIn('XOF'), 'XOF')})`;
    const where = abroad
      ? `Étranger — ${client.country}, ${client.city}${client.addr ? ', ' + client.addr : ''}`
      : `Sénégal — Région de ${client.region}, ${client.quartier}`;
    const msg = [
      `Bonjour ${S.brand.name} ! Je souhaite passer commande :`, '',
      ...lines, '',
      `Total : ${tot}`, '',
      'Mes informations :',
      `- Nom : ${client.name}`,
      `- Livraison : ${where}`,
      `- Note : ${v('oNote') || 'Aucune'}`, '',
      'Merci de me confirmer la disponibilité, les frais de livraison et les modalités de paiement.',
    ].join('\n');
    const a = document.createElement('a'); a.href = wa(msg); a.target = '_blank'; a.rel = 'noopener';
    document.body.appendChild(a); a.click(); a.remove();
    say('WhatsApp s’ouvre avec votre commande. Appuyez sur Envoyer pour la transmettre.');
  }
  const drawerEl = $('#drawer'); let lastFocus;
  function openCart() { step = 1; renderCart(); lastFocus = document.activeElement; drawerEl.hidden = false; requestAnimationFrame(() => drawerEl.classList.add('open')); document.body.style.overflow = 'hidden'; }
  function closeCart() { drawerEl.classList.remove('open'); document.body.style.overflow = ''; setTimeout(() => { drawerEl.hidden = true; }, 450); if (lastFocus) lastFocus.focus({ preventScroll: true }); }
  $('#cartBtn').onclick = openCart;
  $$('[data-close]', drawerEl).forEach((b) => b.addEventListener('click', closeCart));
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && !drawerEl.hidden) closeCart(); });

  // Bouton « + » des cartes : ouvre la fiche (la taille est obligatoire)
  $$('[data-quick]').forEach((b) => b.addEventListener('click', () => { location.hash = `#modele-${b.dataset.quick}`; setTimeout(() => $('#dSizesF').scrollIntoView({ block: 'center', behavior: 'smooth' }), 120); }));

  /* ---------- Fiche modèle ---------- */
  let current = null; let qty = 1;
  const showPdp = (p) => {
    current = p; qty = 1;
    $('#dMedia').innerHTML = `<span class="card-ref">[ Modèle ${esc(p.ref)} ]</span><img src="${esc(p.img)}" alt="${esc(p.name)}">`;
    $('#dCrumb').textContent = `Modèle ${p.ref}`;
    $('#dCat').innerHTML = `[ ${esc(catOf(p.cat).label)} ] &nbsp; <span class="swatch" style="--c:${p.hex}"><i></i>${esc(p.color)}</span>`;
    $('#dName').textContent = p.name;
    $('#dDetail').textContent = p.detail || '';
    const pr = $('#dPrice'); pr.dataset.xof = p.price; pr.textContent = money(p.price);
    $('#mPrice').textContent = money(p.price);
    $('#dQty').textContent = '1';
    $$('input[name="dsize"]').forEach((r) => { r.checked = false; });
    $('#dSizeErr').hidden = true; $('#dSizesF').classList.remove('err');
    document.title = `Modèle ${p.ref} — ${p.name} | ${S.brand.name}`;
  };
  $$('.pdp-actions [data-q]').forEach((b) => b.addEventListener('click', () => { qty = Math.max(1, Math.min(20, qty + +b.dataset.q)); $('#dQty').textContent = qty; }));
  $$('input[name="dsize"]').forEach((r) => r.addEventListener('change', () => { $('#dSizeErr').hidden = true; $('#dSizesF').classList.remove('err'); }));
  const pdpAdd = () => {
    const r = $('input[name="dsize"]:checked');
    if (!r) { $('#dSizeErr').hidden = false; const f = $('#dSizesF'); f.classList.remove('err'); void f.offsetWidth; f.classList.add('err'); f.scrollIntoView({ block: 'center', behavior: 'smooth' }); return; }
    addToCart(current.ref, r.value, qty);
  };
  $('#dAdd').onclick = pdpAdd; $('#mAdd').onclick = pdpAdd;

  /* ---------- Routage ---------- */
  const views = { home: $('#pHome'), coll: $('#pColl'), pdp: $('#pPdp') };
  const route = () => {
    const h = location.hash.slice(1);
    const model = h.startsWith('modele-') ? byRef(h.slice(7)) : null;
    const isColl = h === 'collection' || h.startsWith('collection-');
    const v = model ? 'pdp' : isColl ? 'coll' : 'home';
    const was = Object.keys(views).find((k) => !views[k].hidden);
    Object.entries(views).forEach(([k, el]) => { el.hidden = k !== v; });
    document.body.classList.toggle('on-pdp', v === 'pdp');
    mb.classList.remove('on');
    if (v !== 'pdp') { document.title = S.brand.name; current = null; }
    if (v === 'pdp') { showPdp(model); scrollTo({ top: 0, behavior: 'instant' }); }
    else if (v === 'coll') {
      const want = h.slice('collection-'.length);
      pageCat = S.categories.some((c) => c.id === want) ? want : 'all';
      cs.value = ''; applyFilter('page', pageCat); scrollTo({ top: 0, behavior: 'instant' });
    } else if (was !== 'home') {
      const t = h && document.getElementById(h);
      requestAnimationFrame(() => (t ? t.scrollIntoView() : scrollTo({ top: 0, behavior: 'instant' })));
      fitAll();
    }
  };
  addEventListener('hashchange', route);

  /* ---------- Repères prototype ---------- */
  const pr = $('#proto');
  if (pr) pr.onclick = () => { const on = document.body.classList.toggle('show-todo'); pr.setAttribute('aria-pressed', on); };

  updBadge(); refreshPrices(); route();
})();
