/* ==========================================================================
   BLACK MAN COUTURE — DONNÉES DU SITE
   --------------------------------------------------------------------------
   C'est le SEUL fichier à modifier pour adapter le site à un client.
   Structure du projet (système Jëfya) :
     index.html  → squelette (titre, polices)
     styles.css  → design system (ne pas toucher, sauf évolution du modèle)
     app.js      → moteur de rendu (ne pas toucher)
     content.js  → CE FICHIER : textes, couleurs, coordonnées, produits
     images/     → toutes les photos

   Images : chaque visuel a un `src`. Laisser `src: null` affiche un
   emplacement "Visuel à venir" au bon format. Pour remplacer, déposer la
   photo dans images/ et renseigner son chemin, ex. src: 'images/hero.jpg'.

   `todo: true` = information NON confirmée. En mode prototype, un repère
   discret "À confirmer" s'affiche dessus. Passer `prototype: false` avant
   la mise en ligne.

   Informations confirmées à ce jour (source : le client) :
   - nom, logo, signature « Vente et confection d'habit sur mesure »
   - mode masculine, couture africaine moderne, boubous structurés,
     finitions haut de gamme
   - logo BM (enseigne de la boutique), compte TikTok @blackmancouture1
   - présence sur Facebook, Instagram, TikTok, Snapchat, WhatsApp (icônes du logo)
   Tout le reste est À CONFIRMER.
   ========================================================================== */

window.SITE = {
  prototype: true,

  // Écran d'entrée : logo affiché quelques secondes avant le site (durée en ms, 0 = désactivé)
  loader: { duration: 2800 },

  brand: {
    name: 'Black Man Couture',
    wordmark: 'BLACK MAN',             // mot géant du hero
    wordmarkSub: 'COUTURE',
    heroScript: 'Couture',             // mot manuscrit qui traverse le hero
    logoMark: 'images/logo-mark.png',  // monogramme BMC (masque, recoloré en CSS)
    logoRatio: '480 / 383',
    // Logo complet (écran d'entrée) : reconstitué d'après l'enseigne de la boutique.
    // À remplacer par le fichier original du client dès qu'il est fourni.
    logoFull: 'images/logo-bm.png',
    // Autre logo utilisé par la marque (photo de profil TikTok) : images/logo-rond.png
    // Signature présente sur le logo officiel du client
    tagline: "Vente et confection d'habit sur mesure",
    activity: 'Couture africaine moderne · Homme',
  },

  // Couleurs et polices : modifier ici, tout le site suit.
  theme: {
    paper: '#f1ebe1',   // fond principal (crème du logo, un ton plus chaud)
    paper2: '#faf6f0',  // fond secondaire (crème du logo)
    paper3: '#e3dacc',
    ink: '#0f0d0c',     // noir profond
    accent: '#c8182c',  // rouge du logo Black Man Couture (enseigne BM)
    button: '#8f1d19',  // rouge profond des boutons de commande
    buttonHi: '#a8241f',
    muted: '#6e665c',
    gold: '#c9a56a',
    fontHead: "'Playfair Display', 'Bodoni 72', Didot, Georgia, serif", // titres : serif classique comme le logo
  },

  contact: {
    // Numéro WhatsApp au format international, sans espaces ni +.
    // null = les boutons affichent un message "numéro à configurer".
    whatsapp: null,
    whatsappDisplay: null,
    whatsappMessage: 'Bonjour Black Man Couture, je souhaite avoir des informations sur vos tenues.',
    phones: [],
    email: null,
  },

  // Adresse non communiquée : laisser area à null masque la section Boutique.
  location: {
    area: null,
    city: null,
    landmark: null,
    mapsUrl: null,
    hours: [],
    photo: { src: null, alt: "L'atelier Black Man Couture", label: 'Atelier ou boutique · 4:3' },
  },

  // Réseaux visibles sur le logo ; liens à fournir.
  socials: [
    { label: 'Instagram', url: null, todo: true },
    { label: 'TikTok', url: 'https://www.tiktok.com/@blackmancouture1' },
    { label: 'Facebook', url: null, todo: true },
    { label: 'Snapchat', url: null, todo: true },
  ],

  // Services affichés dans le bandeau d'engagements.
  services: [
    { icon: 'needle', title: 'Sur mesure', text: 'Confection à vos mesures', show: true },
    { icon: 'hanger', title: 'Vente & confection', text: "Tenues prêtes ou sur commande", show: true },
    { icon: 'chat', title: 'Commande WhatsApp', text: 'Réponse directe de la maison', show: true },
    { icon: 'truck', title: 'Livraison', text: 'Modalités à préciser', show: true, todo: true },
  ],

  nav: [
    { label: 'Collection', href: '#collection' },
    { label: 'La maison', href: '#maison' },
    { label: 'Sur mesure', href: '#savoir-faire' },
    { label: 'Lookbook', href: '#lookbook' },
  ],

  hero: {
    kicker: ['Vente et confection', "d'habit", 'sur mesure'],
    // Idéal : photo détourée (PNG transparent) d'une tenue en pied, ~1400 px de haut.
    image: { src: null, alt: 'Tenue Black Man Couture', label: 'Tenue en pied · détourée' },
    ctaPrimary: { label: 'Voir la collection', href: '#collection' },
    ctaSecondary: { label: 'Trouver un modèle', href: '#collection' },
    corner: ['Couture africaine', 'moderne', 'Homme'],
  },

  intro: {
    image: { src: null, alt: "L'univers Black Man Couture", label: 'Ambiance de la maison · 4:5' },
    image2: { src: null, alt: 'Détail de finition', label: 'Détail · 9:13' },
    kicker: 'La maison',
    text: 'Black Man Couture est une marque de mode masculine spécialisée dans la couture africaine moderne, pour l’homme classe, confiant et distingué.',
    highlight: 'couture africaine moderne',
    todo: false,
  },

  // Catégories proposées d'après la description du client (à confirmer).
  collections: [
    { title: 'Boubous', text: 'Boubous structurés, finitions haut de gamme.', image: { src: null, label: 'Boubou · 4:5' }, todo: true },
    { title: 'Ensembles', text: 'Tenues raffinées, entre tradition et modernité.', image: { src: null, label: 'Ensemble · 4:5' }, todo: true },
  ],

  selection: {
    title: 'La sélection',
    home: ['0001', '0002', '0003', '0004', '0005', '0006', '0007', '0008'],
    moreLabel: 'Voir toute la collection',
    pageTitle: 'La collection',
    pageIntro: 'Boubous structurés et tenues raffinées. Choisissez un modèle, indiquez votre taille, et envoyez votre commande sur WhatsApp.',
    // ref   = numéro du modèle (celui affiché sur TikTok / Instagram)
    // price = prix indicatif en F CFA (PRIX D'EXEMPLE pour le prototype, à remplacer)
    items: [
      { ref: '0001', price: 60000, name: 'Boubou structuré', category: 'Boubous', image: { src: null, label: 'Modèle · 3:4' } },
      { ref: '0002', price: 45000, name: 'Ensemble brodé', category: 'Ensembles', image: { src: null, label: 'Modèle · 3:4' } },
      { ref: '0003', price: 65000, name: 'Boubou brodé', category: 'Boubous', image: { src: null, label: 'Modèle · 3:4' } },
      { ref: '0004', price: 40000, name: 'Ensemble col officier', category: 'Ensembles', image: { src: null, label: 'Modèle · 3:4' } },
      { ref: '0005', price: 70000, name: 'Grand boubou', category: 'Boubous', image: { src: null, label: 'Modèle · 3:4' } },
      { ref: '0006', price: 45000, name: 'Ensemble deux pièces', category: 'Ensembles', image: { src: null, label: 'Modèle · 3:4' } },
      { ref: '0007', price: 60000, name: 'Boubou cérémonie', category: 'Boubous', image: { src: null, label: 'Modèle · 3:4' } },
      { ref: '0008', price: 40000, name: 'Ensemble classique', category: 'Ensembles', image: { src: null, label: 'Modèle · 3:4' } },
    ],
  },

  // Tunnel de commande : fiche modèle → mini-formulaire → message WhatsApp prérempli
  order: {
    currency: 'F CFA',
    priceNote: "*Prix d'exemple pour le prototype",
    searchLabel: 'Vous cherchez un modèle précis ? Entrez son numéro.',
    searchPlaceholder: 'Ex : 0001…',
    sizes: ['Sur-mesure', 'S', 'M', 'L', 'XL', 'XXL'],
    delivery: [
      { id: 'atelier', label: "Retrait à l'atelier", detail: 'Adresse à confirmer' },
      { id: 'domicile', label: 'Livraison à domicile', detail: 'Tarif à confirmer' },
      { id: 'regions', label: 'Livraison dans les autres régions', detail: 'Tarif à confirmer' },
    ],
  },

  craft: {
    kicker: 'Savoir-faire',
    title: ['Sur mesure'],
    text: "Élégance, tradition et modernité : chaque tenue Black Man Couture est confectionnée avec des finitions haut de gamme, à vos mesures.",
    todo: true, // texte à valider avec le client (prise de mesures, délais)
    cta: { label: 'Demander une information', whatsapp: true },
    image: { src: null, alt: 'Atelier de couture', label: 'Atelier · portrait' },
    image2: { src: null, alt: 'Détail de finition', label: 'Finition · 1:1' },
  },

  lookbook: {
    kicker: 'Lookbook',
    title: "L'homme Black Man",
    looks: [
      { caption: 'Look 01', image: { src: null, label: 'Look · 2:3' } },
      { caption: 'Look 02', image: { src: null, label: 'Look · 3:2' }, wide: true },
      { caption: 'Look 03', image: { src: null, label: 'Look · 2:3' } },
      { caption: 'Look 04', image: { src: null, label: 'Look · 2:3' } },
      { caption: 'Look 05', image: { src: null, label: 'Look · 2:3' } },
    ],
  },

  whatsappBand: {
    image: { src: null, alt: 'Ambiance Black Man Couture', label: 'Ambiance · portrait' },
    kicker: 'Commande & informations',
    title: ['Une tenue', 'vous plaît ?'],
    text: 'Envoyez-nous le modèle qui vous intéresse, la maison vous répond directement sur WhatsApp.',
    cta: 'Écrire sur WhatsApp',
  },

  footer: {
    credit: 'Réalisé par Jëfya',
  },
};
