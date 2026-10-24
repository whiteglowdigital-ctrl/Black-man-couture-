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

  categories: [
    { id: 'manches-longues', label: 'Manches longues', text: 'Ensembles col rond ou col chemise, broderies et liserés.' },
    { id: 'manches-courtes', label: 'Manches courtes', text: 'Coupe ajustée, surpiqûres contrastées.' },
    { id: 'vestes', label: 'Vestes & costumes', text: 'Gilets, sahariennes et vestes col mao.' },
  ],

  // Catalogue. ref = numéro du modèle (à reprendre dans les légendes TikTok/Instagram).
  // price = F CFA (PRIX D'EXEMPLE, à remplacer). Noms descriptifs, à valider avec le client.
  products: [
    { ref: '001', name: 'Ensemble Marine Surpiqué', cat: 'manches-courtes', price: 40000, color: 'Bleu marine', hex: '#27324a', img: 'images/tenues/ensemble-marine-manches-courtes.webp', full: true },
    { ref: '002', name: 'Ensemble Noir Galon', cat: 'manches-longues', price: 50000, color: 'Noir', hex: '#121212', img: 'images/tenues/ensemble-noir-galon-rouge.webp', detail: 'Galon brodé rouge et blanc' },
    { ref: '003', name: 'Ensemble Liseré Moka', cat: 'manches-longues', price: 55000, color: 'Moka', hex: '#7a6455', img: 'images/tenues/ensemble-marron-liseres.webp', detail: 'Col chemise, liserés blancs' },
    { ref: '004', name: 'Ensemble Marine Floral', cat: 'manches-longues', price: 50000, color: 'Bleu marine', hex: '#1d2436', img: 'images/tenues/ensemble-marine-brode.webp', detail: 'Broderie florale bleue' },
    { ref: '005', name: 'Ensemble Grège Brodé', cat: 'manches-longues', price: 50000, color: 'Grège', hex: '#b9b3aa', img: 'images/tenues/ensemble-beige-col-chemise.webp', detail: 'Col chemise, bande brodée' },
    { ref: '006', name: 'Ensemble Bordeaux Surpiqué', cat: 'manches-courtes', price: 40000, color: 'Bordeaux', hex: '#4a2522', img: 'images/tenues/ensemble-bordeaux-manches-courtes.webp', detail: 'Surpiqûres blanches' },
    { ref: '007', name: 'Ensemble Kaki', cat: 'manches-longues', price: 45000, color: 'Kaki', hex: '#4b5236', img: 'images/tenues/ensemble-kaki.webp', detail: 'Poche matelassée' },
    { ref: '008', name: 'Ensemble Marine Col Beige', cat: 'manches-longues', price: 50000, color: 'Bleu marine', hex: '#1e2a44', img: 'images/tenues/ensemble-marine-col-beige.webp', detail: 'Col et poche contrastés' },
    { ref: '009', name: 'Ensemble Gilet Marine', cat: 'vestes', price: 65000, color: 'Marine & gris perle', hex: '#1f2f5c', img: 'images/tenues/ensemble-gilet-marine.webp', detail: 'Gilet col châle, chemise à nervures, poignets contrastés' },
    { ref: '010', name: 'Ensemble Camel Manches Blanches', cat: 'manches-longues', price: 50000, color: 'Camel & blanc', hex: '#a07850', img: 'images/tenues/ensemble-camel-manches-blanches.webp', detail: 'Plastron camel, manches blanches, col officier' },
    { ref: '011', name: 'Saharienne Sable', cat: 'vestes', price: 70000, color: 'Sable', hex: '#cdb38c', img: 'images/tenues/saharienne-sable.webp', detail: 'Veste à quatre poches, boutons contrastés' },
    { ref: '012', name: 'Costume Col Mao Marine', cat: 'vestes', price: 75000, color: 'Bleu marine', hex: '#1b2238', img: 'images/tenues/costume-col-mao-marine.webp', detail: 'Col mao, poches à rabat, pochette' },
    { ref: '013', name: 'Veste Jacquard Fleurie', cat: 'vestes', price: 70000, color: 'Marine & or', hex: '#2b3554', img: 'images/tenues/veste-jacquard-fleurie.webp', detail: 'Jacquard à fleurs, col mao, boutons métal' },
  ],
  featured: '013', // tenue mise en avant (bloc « pièce vedette »)
  featuredStrip: ['013', '009', '012', '002'], // miniatures du bloc vedette
  homeCount: 12,   // nombre de tenues sur l'accueil (toutes sur la page Collection)

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
