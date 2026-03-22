// DIVOC Multi-language support
// Languages: Portuguese (default), English, French

export type Language = 'pt' | 'en' | 'fr';

export const languages: { code: Language; label: string; flag: string }[] = [
  { code: 'pt', label: 'Português', flag: '🇵🇹' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
];

export const translations = {
  pt: {
    // Navigation
    nav: {
      home: 'Início',
      products: 'Produtos',
      allProducts: 'Todos os Produtos',
      hoodies: 'Hoodies',
      tshirts: 'T-Shirts',
      about: 'Sobre Nós',
      contact: 'Contacto',
      faq: 'FAQ',
      cart: 'Carrinho',
      account: 'Conta',
      login: 'Entrar',
      register: 'Registar',
      myAccount: 'Minha Conta',
      wishlist: 'Lista de Desejos',
      lookbook: 'Lookbook',
      sizeGuide: 'Guia de Tamanhos',
    },
    // Hero Section
    hero: {
      headline: 'VESTE A TUA IDENTIDADE',
      subheadline: 'Streetwear com raízes. Poder em cada peça.',
      cta: 'Ver Coleção',
    },
    // Brand Story
    brand: {
      title: 'A VOZ DA UNIÃO AFRICANA',
      text: 'DIVOC representa a inversão. A desconstrução do colonialismo. Resistência, reconquista e renascimento. Existimos para promover a união de África e da sua diáspora através da moda, arte e cultura. O nosso luxo não é cópia. É memória.',
      values: {
        quality: 'Qualidade',
        identity: 'Identidade',
        culture: 'Cultura',
        street: 'Street',
      },
    },
    // Categories
    categories: {
      title: 'CATEGORIAS',
      hoodies: 'Hoodies',
      tshirts: 'T-Shirts',
      shopNow: 'Ver Agora',
    },
    // Products
    products: {
      featured: 'PRODUTOS EM DESTAQUE',
      addToCart: 'Adicionar',
      viewProduct: 'Ver Produto',
      outOfStock: 'Esgotado',
      noProducts: 'Nenhum produto encontrado',
    },
    // Footer
    footer: {
      newsletter: {
        title: 'JUNTA-TE AO MOVIMENTO',
        placeholder: 'O teu email',
        button: 'Subscrever',
      },
      legal: {
        privacy: 'Política de Privacidade',
        terms: 'Termos e Condições',
        shipping: 'Envios e Devoluções',
      },
      social: 'Segue-nos',
      copyright: '© 2024 DIVOC. Todos os direitos reservados.',
    },
    // Cart
    cart: {
      title: 'Carrinho',
      empty: 'O teu carrinho está vazio',
      total: 'Total',
      checkout: 'Finalizar Compra',
      remove: 'Remover',
      continueShopping: 'Continuar a Comprar',
      added: 'Adicionado ao carrinho',
    },
    // Product Detail
    product: {
      size: 'Tamanho',
      color: 'Cor',
      quantity: 'Quantidade',
      addToWishlist: 'Adicionar à Lista de Desejos',
      removeFromWishlist: 'Remover da Lista de Desejos',
      description: 'Descrição',
      details: 'Detalhes',
    },
    // About Page
    about: {
      title: 'SOBRE DIVOC',
      intro: 'DIVOC não é só moda. É um movimento.',
      subtitle: 'A Voz da União Africana',
      story: 'DIVOC representa a inversão. A desconstrução do colonialismo. Representa resistência, reconquista e renascimento. Nascemos para promover a união de África e da sua diáspora através da moda, arte, cultura e mensagens de impacto.',
      mission: 'Inspirar orgulho, despertar consciências e romper silêncios. O nosso luxo não é cópia. É memória. Unimos África pela arte. Vestimos herança.',
      logo: 'O logotipo é ouro sobre estrutura tribal: símbolo de poder ancestral e renascimento africano.',
      manifesto: '"PODER EM CADA PEÇA. RAÍZES EM CADA FIO."',
    },
    // Contact Page
    contact: {
      title: 'CONTACTO',
      subtitle: 'Fala connosco',
      name: 'Nome',
      email: 'Email',
      message: 'Mensagem',
      send: 'Enviar',
    },
    // FAQ Page
    faq: {
      title: 'PERGUNTAS FREQUENTES',
      shipping: {
        q: 'Quanto tempo demora a entrega?',
        a: 'As entregas em Portugal Continental demoram 2-3 dias úteis. Para as ilhas e resto da Europa, 5-7 dias úteis.',
      },
      returns: {
        q: 'Qual é a política de devoluções?',
        a: 'Aceitamos devoluções até 14 dias após a receção, desde que o produto esteja nas condições originais.',
      },
      sizing: {
        q: 'Como escolho o tamanho certo?',
        a: 'Consulta a nossa tabela de tamanhos em cada página de produto. Em caso de dúvida, escolhe um tamanho acima.',
      },
      payment: {
        q: 'Que métodos de pagamento aceitam?',
        a: 'Aceitamos cartões de crédito/débito, PayPal e MB Way.',
      },
    },
    // Engagement features
    announcement: {
      freeShipping: 'Envio grátis em encomendas acima de 50€',
      newDrops: 'Novos lançamentos todas as sextas',
      limitedEdition: 'Edição limitada — Stock reduzido',
    },
    instagram: {
      title: 'DIVOC NO MUNDO',
      subtitle: 'Streetwear com alma. Partilha o teu estilo #DIVOCLEGACY',
    },
    relatedProducts: {
      title: 'TAMBÉM PODES GOSTAR',
    },
    newBadge: 'NOVO',
  },
  en: {
    nav: {
      home: 'Home',
      products: 'Products',
      allProducts: 'All Products',
      hoodies: 'Hoodies',
      tshirts: 'T-Shirts',
      about: 'About Us',
      contact: 'Contact',
      faq: 'FAQ',
      cart: 'Cart',
      account: 'Account',
      login: 'Login',
      register: 'Register',
      myAccount: 'My Account',
      wishlist: 'Wishlist',
      lookbook: 'Lookbook',
      sizeGuide: 'Size Guide',
    },
    hero: {
      headline: 'WEAR YOUR IDENTITY',
      subheadline: 'Streetwear with roots. Power in every piece.',
      cta: 'Shop Collection',
    },
    brand: {
      title: 'THE VOICE OF AFRICAN UNION',
      text: 'DIVOC represents inversion. The deconstruction of colonialism. Resistance, reconquest, and rebirth. We exist to promote the union of Africa and its diaspora through fashion, art, and culture. Our luxury is not a copy. It is memory.',
      values: {
        quality: 'Quality',
        identity: 'Identity',
        culture: 'Culture',
        street: 'Street',
      },
    },
    categories: {
      title: 'CATEGORIES',
      hoodies: 'Hoodies',
      tshirts: 'T-Shirts',
      shopNow: 'Shop Now',
    },
    products: {
      featured: 'FEATURED PRODUCTS',
      addToCart: 'Add to Cart',
      viewProduct: 'View Product',
      outOfStock: 'Out of Stock',
      noProducts: 'No products found',
    },
    footer: {
      newsletter: {
        title: 'JOIN THE MOVEMENT',
        placeholder: 'Your email',
        button: 'Subscribe',
      },
      legal: {
        privacy: 'Privacy Policy',
        terms: 'Terms & Conditions',
        shipping: 'Shipping & Returns',
      },
      social: 'Follow Us',
      copyright: '© 2024 DIVOC. All rights reserved.',
    },
    cart: {
      title: 'Cart',
      empty: 'Your cart is empty',
      total: 'Total',
      checkout: 'Checkout',
      remove: 'Remove',
      continueShopping: 'Continue Shopping',
      added: 'Added to cart',
    },
    product: {
      size: 'Size',
      color: 'Color',
      quantity: 'Quantity',
      addToWishlist: 'Add to Wishlist',
      removeFromWishlist: 'Remove from Wishlist',
      description: 'Description',
      details: 'Details',
    },
    about: {
      title: 'ABOUT DIVOC',
      intro: 'DIVOC is not just fashion. It is a movement.',
      subtitle: 'The Voice of African Union',
      story: 'DIVOC represents inversion. The deconstruction of colonialism. It stands for resistance, reconquest, and rebirth. We exist to promote the union of Africa and its diaspora through fashion, art, culture, and impactful messages.',
      mission: 'To inspire pride, awaken consciousness, and break silences. Our luxury is not a copy. It is memory. We unite Africa through art. We wear heritage.',
      logo: 'The logo is gold over tribal structure: a symbol of ancestral power and African rebirth.',
      manifesto: '"POWER IN EVERY PIECE. ROOTS IN EVERY THREAD."',
    },
    contact: {
      title: 'CONTACT',
      subtitle: 'Get in touch',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      send: 'Send',
    },
    faq: {
      title: 'FREQUENTLY ASKED QUESTIONS',
      shipping: {
        q: 'How long does delivery take?',
        a: 'Deliveries in mainland Portugal take 2-3 business days. For islands and the rest of Europe, 5-7 business days.',
      },
      returns: {
        q: 'What is your return policy?',
        a: 'We accept returns up to 14 days after receipt, provided the product is in original condition.',
      },
      sizing: {
        q: 'How do I choose the right size?',
        a: 'Check our size guide on each product page. When in doubt, choose one size up.',
      },
      payment: {
        q: 'What payment methods do you accept?',
        a: 'We accept credit/debit cards, PayPal, and MB Way.',
      },
    },
    announcement: {
      freeShipping: 'Free shipping on orders over 50€',
      newDrops: 'New drops every Friday',
      limitedEdition: 'Limited edition — Low stock',
    },
    instagram: {
      title: 'DIVOC IN THE WILD',
      subtitle: 'Streetwear with soul. Share your style #DIVOCLEGACY',
    },
    relatedProducts: {
      title: 'YOU MAY ALSO LIKE',
    },
    newBadge: 'NEW',
  },
  fr: {
    nav: {
      home: 'Accueil',
      products: 'Produits',
      allProducts: 'Tous les Produits',
      hoodies: 'Hoodies',
      tshirts: 'T-Shirts',
      about: 'À Propos',
      contact: 'Contact',
      faq: 'FAQ',
      cart: 'Panier',
      account: 'Compte',
      login: 'Connexion',
      register: 'S\'inscrire',
      myAccount: 'Mon Compte',
      wishlist: 'Liste de Souhaits',
    },
    hero: {
      headline: 'PORTE TON IDENTITÉ',
      subheadline: 'Streetwear avec des racines. Du pouvoir dans chaque pièce.',
      cta: 'Voir la Collection',
    },
    brand: {
      title: 'LA VOIX DE L\'UNION AFRICAINE',
      text: 'DIVOC représente l\'inversion. La déconstruction du colonialisme. Résistance, reconquête et renaissance. Nous existons pour promouvoir l\'union de l\'Afrique et de sa diaspora à travers la mode, l\'art et la culture. Notre luxe n\'est pas une copie. C\'est une mémoire.',
      values: {
        quality: 'Qualité',
        identity: 'Identité',
        culture: 'Culture',
        street: 'Street',
      },
    },
    categories: {
      title: 'CATÉGORIES',
      hoodies: 'Hoodies',
      tshirts: 'T-Shirts',
      shopNow: 'Voir Maintenant',
    },
    products: {
      featured: 'PRODUITS EN VEDETTE',
      addToCart: 'Ajouter',
      viewProduct: 'Voir le Produit',
      outOfStock: 'Rupture de Stock',
      noProducts: 'Aucun produit trouvé',
    },
    footer: {
      newsletter: {
        title: 'REJOINS LE MOUVEMENT',
        placeholder: 'Ton email',
        button: 'S\'abonner',
      },
      legal: {
        privacy: 'Politique de Confidentialité',
        terms: 'Conditions Générales',
        shipping: 'Livraison et Retours',
      },
      social: 'Suis-nous',
      copyright: '© 2024 DIVOC. Tous droits réservés.',
    },
    cart: {
      title: 'Panier',
      empty: 'Ton panier est vide',
      total: 'Total',
      checkout: 'Passer à la Caisse',
      remove: 'Supprimer',
      continueShopping: 'Continuer les Achats',
      added: 'Ajouté au panier',
    },
    product: {
      size: 'Taille',
      color: 'Couleur',
      quantity: 'Quantité',
      addToWishlist: 'Ajouter aux Souhaits',
      removeFromWishlist: 'Retirer des Souhaits',
      description: 'Description',
      details: 'Détails',
    },
    about: {
      title: 'À PROPOS DE DIVOC',
      intro: 'DIVOC n\'est pas que de la mode. C\'est un mouvement.',
      subtitle: 'La Voix de l\'Union Africaine',
      story: 'DIVOC représente l\'inversion. La déconstruction du colonialisme. Elle incarne la résistance, la reconquête et la renaissance. Nous existons pour promouvoir l\'union de l\'Afrique et de sa diaspora à travers la mode, l\'art, la culture et des messages d\'impact.',
      mission: 'Inspirer la fierté, éveiller les consciences et briser les silences. Notre luxe n\'est pas une copie. C\'est une mémoire. Nous unissons l\'Afrique par l\'art. Nous portons l\'héritage.',
      logo: 'Le logo est de l\'or sur une structure tribale : symbole de pouvoir ancestral et de renaissance africaine.',
      manifesto: '"DU POUVOIR DANS CHAQUE PIÈCE. DES RACINES DANS CHAQUE FIL."',
    },
    contact: {
      title: 'CONTACT',
      subtitle: 'Contactez-nous',
      name: 'Nom',
      email: 'Email',
      message: 'Message',
      send: 'Envoyer',
    },
    faq: {
      title: 'QUESTIONS FRÉQUENTES',
      shipping: {
        q: 'Combien de temps prend la livraison?',
        a: 'Les livraisons au Portugal continental prennent 2-3 jours ouvrables. Pour les îles et le reste de l\'Europe, 5-7 jours ouvrables.',
      },
      returns: {
        q: 'Quelle est votre politique de retour?',
        a: 'Nous acceptons les retours jusqu\'à 14 jours après réception, à condition que le produit soit dans son état d\'origine.',
      },
      sizing: {
        q: 'Comment choisir la bonne taille?',
        a: 'Consultez notre guide des tailles sur chaque page produit. En cas de doute, choisissez une taille au-dessus.',
      },
      payment: {
        q: 'Quels modes de paiement acceptez-vous?',
        a: 'Nous acceptons les cartes de crédit/débit, PayPal et MB Way.',
      },
    },
    announcement: {
      freeShipping: 'Livraison gratuite dès 50€',
      newDrops: 'Nouveautés chaque vendredi',
      limitedEdition: 'Édition limitée — Stock réduit',
    },
    instagram: {
      title: 'DIVOC DANS LE MONDE',
      subtitle: 'Streetwear avec âme. Partage ton style #DIVOCLEGACY',
    },
    relatedProducts: {
      title: 'VOUS AIMEREZ AUSSI',
    },
    newBadge: 'NOUVEAU',
  },
} as const;

export type Translations = typeof translations.pt;
