/* ==========================================================================
   BLACK MAN COUTURE — DONNÉES DU SITE
   --------------------------------------------------------------------------
   Seul fichier à modifier pour faire vivre le site :
   catalogue, prix, devises, textes, coordonnées, livraison.

   Prix : saisis en F CFA. L'euro est calculé (parité fixe), le dollar
   utilise le taux indiqué dans `currencies` (à mettre à jour).

   `todo: true` = information NON confirmée par le client. En mode
   prototype, un repère « À confirmer » s'affiche. Passer
   `prototype: false` avant la mise en ligne.

   Confirmé à ce jour : nom, logo BM (enseigne), ville (Dakar),
   WhatsApp +221 77 179 31 57 (filigrane des photos), TikTok
   @blackmancouture1, signature « Vente et confection d'habit sur mesure »,
   clientèle diaspora, photos des tenues (publications du client).
   ========================================================================== */

window.SITE = {
  // À augmenter après chaque changement d'images (force le rechargement chez les visiteurs)
  assetVersion: 18,
  prototype: true,

  brand: {
    name: 'Black Man Couture',
    word: 'BLACK MAN',                 // mot géant du hero
    sub: 'COUTURE',
    tagline: "Vente et confection d'habit sur mesure",
    // Phrase publiée par la marque sur TikTok
    motto: ['L’élégance.', 'La modernité.', 'La distinction.'],
    logo: 'images/logo-bm.png',        // logo complet (reconstitué d'après l'enseigne — à remplacer par l'original)
    mark: 'images/logo-mark.png',      // monogramme BMC (masque recoloré)
    markRatio: '480 / 383',
    city: 'Dakar, Sénégal',
  },

  contact: {
    whatsapp: '221771793157',
    whatsappDisplay: '+221 77 179 31 57',
  },

  socials: [
    { label: 'TikTok', url: 'https://www.tiktok.com/@blackmancouture1' },
    { label: 'Instagram', url: null, todo: true },
    { label: 'Facebook', url: null, todo: true },
    { label: 'Snapchat', url: null, todo: true },
  ],

  // Devises : le client choisit en haut du site. Base = F CFA.
  currencies: {
    default: 'XOF',
    list: [
      { code: 'XOF', label: 'F CFA', perUnit: 1, decimals: 0, suffix: ' F CFA' },
      { code: 'EUR', label: '€', perUnit: 655.957, decimals: 0, suffix: ' €' },      // parité fixe
      { code: 'USD', label: '$', perUnit: 600, decimals: 0, prefix: '$', todo: true }, // taux indicatif à mettre à jour
    ],
    note: 'Prix en € et $ donnés à titre indicatif, convertis depuis le F CFA.',
  },

  sizes: ['S', 'M', 'L', 'XL', 'XXL', 'Sur-mesure'],

  // Deux familles : les ensembles (manches longues et courtes) et les vestes.
  categories: [
    { id: 'ensembles', label: 'Ensembles', text: 'Manches longues ou courtes, broderies, liserés et surpiqûres.', cover: '003' },
    { id: 'vestes', label: 'Vestes & costumes', text: 'Col mao, sahariennes, gilets et jacquards.', cover: '020' },
  ],

  // Catalogue. ref = numéro du modèle (à reprendre dans les légendes TikTok/Instagram).
  // price = F CFA (PRIX D'EXEMPLE, à remplacer). Noms descriptifs, à valider avec le client.
  products: [
    { ref: '001', name: 'Ensemble Marine Surpiqué', cat: 'ensembles', price: 40000, color: 'Bleu marine', hex: '#27324a', img: 'images/tenues/ensemble-marine-manches-courtes.webp', full: true },
    { ref: '002', name: 'Ensemble Noir Galon', cat: 'ensembles', price: 50000, color: 'Noir', hex: '#121212', img: 'images/tenues/ensemble-noir-galon-rouge.webp', detail: 'Galon brodé rouge et blanc' },
    { ref: '003', name: 'Ensemble Liseré Moka', cat: 'ensembles', price: 55000, color: 'Moka', hex: '#7a6455', img: 'images/tenues/ensemble-marron-liseres.webp', detail: 'Col chemise, liserés blancs' },
    { ref: '004', name: 'Ensemble Marine Floral', cat: 'ensembles', price: 50000, color: 'Bleu marine', hex: '#1d2436', img: 'images/tenues/ensemble-marine-brode.webp', detail: 'Broderie florale bleue' },
    { ref: '005', name: 'Ensemble Grège Brodé', cat: 'ensembles', price: 50000, color: 'Grège', hex: '#b9b3aa', img: 'images/tenues/ensemble-beige-col-chemise.webp', detail: 'Col chemise, bande brodée' },
    { ref: '006', name: 'Ensemble Bordeaux Surpiqué', cat: 'ensembles', price: 40000, color: 'Bordeaux', hex: '#4a2522', img: 'images/tenues/ensemble-bordeaux-manches-courtes.webp', detail: 'Surpiqûres blanches' },
    { ref: '007', name: 'Ensemble Kaki', cat: 'ensembles', price: 45000, color: 'Kaki', hex: '#4b5236', img: 'images/tenues/ensemble-kaki.webp', detail: 'Poche matelassée' },
    { ref: '008', name: 'Ensemble Marine Col Beige', cat: 'ensembles', price: 50000, color: 'Bleu marine', hex: '#1e2a44', img: 'images/tenues/ensemble-marine-col-beige.webp', detail: 'Col et poche contrastés' },
    { ref: '009', name: 'Ensemble Gilet Marine', cat: 'vestes', price: 65000, color: 'Marine & gris perle', hex: '#1f2f5c', img: 'images/tenues/ensemble-gilet-marine.webp', detail: 'Gilet col châle, chemise à nervures, poignets contrastés' },
    { ref: '010', name: 'Ensemble Camel Manches Blanches', cat: 'vestes', price: 50000, color: 'Camel & blanc', hex: '#a07850', img: 'images/tenues/ensemble-camel-manches-blanches.webp', detail: 'Plastron camel, manches blanches, col officier' },
    { ref: '011', name: 'Saharienne Sable', cat: 'vestes', price: 70000, color: 'Sable', hex: '#cdb38c', img: 'images/tenues/saharienne-sable.webp', detail: 'Veste à quatre poches, boutons contrastés' },
    { ref: '012', name: 'Costume Col Mao Marine', cat: 'vestes', price: 75000, color: 'Bleu marine', hex: '#1b2238', img: 'images/tenues/costume-col-mao-marine.webp', detail: 'Col mao, poches à rabat, pochette' },
    { ref: '013', name: 'Veste Jacquard Fleurie', cat: 'vestes', price: 70000, color: 'Marine & or', hex: '#2b3554', img: 'images/tenues/veste-jacquard-fleurie.webp', detail: 'Jacquard à fleurs, col mao, boutons métal' },
    { ref: '019', name: 'Veste Marine Matelassée', cat: 'vestes', price: 55000, color: 'Bleu marine', hex: '#1e2a4a', img: 'images/tenues/ensemble-marine-matelasse.webp', detail: 'Empiècement matelassé, col officier, patte cachée' },
    { ref: '020', name: 'Veste Verte Rayée', cat: 'vestes', price: 75000, color: 'Vert pétrole', hex: '#1d4a48', img: 'images/tenues/veste-verte-rayee.webp', detail: 'Fines rayures dorées, boutons dorés, pochette camel' },
    { ref: '021', name: 'Veste Brandebourgs', cat: 'vestes', price: 70000, color: 'Gris ardoise', hex: '#3a4150', img: 'images/tenues/veste-brandebourgs.webp', detail: 'Col mao, fermeture à brandebourgs' },
    { ref: '023', name: 'Ensemble Bleu Roi Liseré', cat: 'ensembles', price: 50000, color: 'Bleu roi', hex: '#1f3a8a', img: 'images/tenues/ensemble-bleu-roi.webp', detail: 'Lin texturé, liserés noirs en arabesque, col rond' },
    { ref: '024', name: 'Veste Brodée Arabesques', cat: 'vestes', price: 85000, color: 'Anthracite', hex: '#3d3a37', img: 'images/tenues/veste-brodee-arabesques.webp', detail: 'Broderie perlée en arabesques, col officier, poche à rabat' },
    { ref: '025', name: 'Ensemble Zippé Chocolat', cat: 'ensembles', price: 55000, color: 'Chocolat & sable', hex: '#4a2c22', img: 'images/tenues/ensemble-zippe-chocolat.webp', detail: 'Fermeture zippée dorée, manches sable, poches liserées' },
    { ref: '026', name: 'Ensemble Kaki Liseré', cat: 'ensembles', price: 50000, color: 'Kaki', hex: '#5b5f3e', img: 'images/tenues/ensemble-kaki-lisere.webp', detail: 'Tissu texturé, liserés noirs en arabesque' },
    { ref: '027', name: 'Ensemble Mauve Empiècement', cat: 'ensembles', price: 50000, color: 'Mauve & prune', hex: '#9a7f99', img: 'images/tenues/ensemble-mauve.webp', detail: 'Empiècement prune, poches arrondies, liseré crème' },
    { ref: '028', name: 'Gilet Carreaux Chocolat', cat: 'vestes', price: 70000, color: 'Chocolat', hex: '#4a2a20', img: 'images/tenues/gilet-carreaux-chocolat.webp', detail: 'Gilet col mao à carreaux, boutons dorés, pochette, chemise blanche' },
    { ref: '029', name: 'Veste Longue Chocolat', cat: 'vestes', price: 65000, color: 'Chocolat & sable', hex: '#5a3a2c', img: 'images/tenues/veste-longue-chocolat.webp', detail: 'Veste longue sans manches sur tunique sable à nervures' },
    // Sorties d'atelier : photo de la tenue pliée (img) + photo d'atelier complète (photo)
    { ref: '014', name: 'Ensemble Noir Losanges', cat: 'ensembles', price: 50000, color: 'Noir', hex: '#14161c', img: 'images/atelier/noir-losanges-plie.jpg', photo: 'images/atelier/noir-losanges.jpg', flat: true, detail: 'Plastron brodé à motif losanges, boutons dorés' },
    { ref: '015', name: 'Ensemble Carreaux Gris', cat: 'ensembles', price: 55000, color: 'Gris taupe', hex: '#6f6a64', img: 'images/atelier/carreaux-gris-plie.jpg', photo: 'images/atelier/carreaux-gris.jpg', flat: true, detail: 'Tissu à carreaux, poche brodée, col doublé imprimé' },
    { ref: '016', name: 'Ensemble Bleu Ciel Brodé', cat: 'ensembles', price: 50000, color: 'Bleu ciel', hex: '#9fb6d9', img: 'images/atelier/bleu-ciel-brode-plie.jpg', photo: 'images/atelier/bleu-ciel-brode.jpg', flat: true, detail: 'Col officier, broderie centrale chocolat et blanc' },
    { ref: '017', name: 'Ensemble Marine Grecque Or', cat: 'ensembles', price: 55000, color: 'Marine & or', hex: '#1a2440', img: 'images/atelier/marine-grecque-or-plie.jpg', photo: 'images/atelier/marine-grecque-or.jpg', flat: true, detail: 'Bande grecque dorée, poche brodée, col liseré' },
    { ref: '018', name: 'Ensemble Noir Rayé Brodé', cat: 'ensembles', price: 50000, color: 'Noir rayé', hex: '#1b1b1d', img: 'images/atelier/noir-raye-brode-plie.jpg', photo: 'images/atelier/noir-raye-brode.jpg', flat: true, detail: 'Fines rayures, broderie géométrique blanche' },
    { ref: '022', name: 'Ensemble Noir Points Or', cat: 'ensembles', price: 50000, color: 'Noir & or', hex: '#111111', img: 'images/atelier/noir-points-or.jpg', photo: null, flat: true, detail: 'Piqûres dorées, col doublé imprimé' },
  ],
  featured: '024', // tenue mise en avant (bloc « pièce vedette »)
  featuredStrip: ['024', '013', '020', '025'], // miniatures du bloc vedette
  // Tenues affichées sur l'accueil (photos studio) ; la page Collection les affiche toutes
  home: ['023', '024', '028', '027', '025', '026', '029', '020', '013', '012', '009', '002'],

  // Bandeau défilant sous l'accueil
  marquee: ['L’élégance', 'La modernité', 'La distinction', 'Fait à Dakar', 'Sur mesure', 'Livraison Sénégal & diaspora'],

  // Galerie « L'atelier » : photos prises à l'atelier, chaque photo ouvre la fiche du modèle
  atelier: {
    kicker: 'Sorties d’atelier · Dakar',
    title: ['Coupé.', 'Cousu.', 'Brodé.'],
    text: 'Elles sortent de notre atelier, étiquette BMC cousue au col. Chaque pièce de la galerie se commande comme les autres.',
    refs: ['017', '014', '022', '018', '015', '016'],
  },

  hero: {
    image: 'images/hero.webp',
    kicker: ['Couture africaine', 'moderne', 'pour homme.'],
    corner: ['Dakar', 'Sénégal & diaspora'],
  },

  howTo: [
    { t: 'Choisissez', d: 'Vos tenues, la taille et la quantité. Ajoutez au panier.' },
    { t: 'Validez', d: 'Vos coordonnées : au Sénégal ou à l’étranger.' },
    { t: 'Confirmez', d: 'Votre commande part sur WhatsApp. La maison confirme disponibilité, livraison et paiement.' },
  ],

  // Livraison et paiement : informations à confirmer avec le client.
  delivery: {
    title: 'Livraison & paiement',
    items: [
      { t: 'Dakar', d: 'Tarif et délai confirmés sur WhatsApp.', todo: true },
      { t: 'Régions du Sénégal', d: 'Tarif et délai confirmés sur WhatsApp.', todo: true },
      { t: 'International', d: 'Envoi vers la diaspora : tarif et délai confirmés sur WhatsApp.', todo: true },
      { t: 'Paiement', d: 'Modes de paiement communiqués à la confirmation.', todo: true },
    ],
  },

  regions: ['Dakar', 'Diourbel', 'Fatick', 'Kaffrine', 'Kaolack', 'Kédougou', 'Kolda', 'Louga', 'Matam', 'Saint-Louis', 'Sédhiou', 'Tambacounda', 'Thiès', 'Ziguinchor'],
  countries: ['France', 'Italie', 'Espagne', 'Belgique', 'Allemagne', 'Royaume-Uni', 'Suisse', 'États-Unis', 'Canada', 'Côte d’Ivoire', 'Mali', 'Gambie', 'Mauritanie', 'Maroc', 'Autre pays'],

  footerCredit: 'Réalisé par Jëfya',
};
