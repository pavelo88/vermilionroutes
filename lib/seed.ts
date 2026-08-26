import { db } from './firebase';
import { doc, setDoc } from 'firebase/firestore';
import { mockTours, mockDestinations, mockReviews } from '@/data/mock';

export const defaultSettings = {
  contact: {
    phone: "+593 99 404 8458",
    email: "info@vermilionroutes.com",
    address: "Alangasí Oe 1 – 210 Simón Bolívar and Juan León Mera, Quito, Ecuador",
    whatsappUrl: "https://wa.me/593994048458",
    facebook: "https://facebook.com/vermilionroutes",
    instagram: "https://instagram.com/vermilionroutes",
    tiktok: "https://www.tiktok.com/@vermilionsaroutes",
    tripadvisor: "https://www.tripadvisor.com/Attraction_Review-g294308-d26260308-Reviews-Vermilion_Routes-Quito_Pichincha_Province.html"
  },
  seo: {
    title: "Vermilion Routes | Tailor-Made Exclusive Travel in Galapagos & Ecuador",
    description: "Experience South America with bespoke travel itineraries, exclusive Galapagos island cruises, Amazon rainforest expeditions, and Andean volcano treks.",
    keywords: "Galapagos premium cruises, Ecuador travel agency, South America curated expeditions, Tailor-made itineraries Galapagos, Bespoke travel Ecuador, Vermilion Routes"
  },
  hero: {
    badge: "Boutique Travel Agency • Galapagos & Ecuador Specialists",
    title: "Tailor-Made Curated Expeditions",
    titleColored: "Crafted for Extraordinary Travel",
    subtitle: "Cruise the enchanted Galapagos Islands, trek the volcanic spine of the high Andes, explore the deep Amazon rainforest, and experience the magical equator line.",
    backgroundImage: "",
    slides: [
      {
        place: 'Galapagos - Santa Cruz',
        title: 'GIANT TORTOISES',
        title2: 'OF GALAPAGOS',
        description: 'Observe ancient giant tortoises roaming freely in their natural habitat at the highlands of Santa Cruz Island and explore majestic volcanic twin craters.',
        image: '/images/tours/16-9/galapagos-tortuga-gigante-16-9.jpg',
        desktopImage: '/images/tours/16-9/galapagos-tortuga-gigante-16-9.jpg',
        mobileImage: '/images/tours/9-16/galapagos-tortuga-gigante-9-16.jpg'
      },
      {
        place: 'Pichincha - Quito',
        title: 'HISTORIC CENTER',
        title2: 'OF QUITO',
        description: 'The first UNESCO World Cultural Heritage site in the world. Walk along preserved cobblestone streets and marvel at the golden altars of La Compañía Church.',
        image: '/images/tours/16-9/quito-iglesia-de-san-francisco-16-9.jpg',
        desktopImage: '/images/tours/16-9/quito-iglesia-de-san-francisco-16-9.jpg',
        mobileImage: '/images/tours/16-9/quito-colonial-16-9.jpg'
      },
      {
        place: 'Tungurahua - Baños',
        title: 'PAILÓN',
        title2: 'DEL DIABLO',
        description: 'Feel the thunderous roar of Ecuador’s most famous waterfall. Experience suspension bridges, lush tropical cloud forest, and the scenic Route of the Waterfalls.',
        image: '/images/tours/16-9/pailon-del-diablo-16-9.jpg',
        desktopImage: '/images/tours/16-9/pailon-del-diablo-16-9.jpg',
        mobileImage: '/images/tours/9-16/pailon-diablo-9-16.jpg'
      },
      {
        place: 'Cotopaxi - Andes',
        title: 'MAJESTIC VOLCANO',
        title2: 'COTOPAXI',
        description: 'The iconic snow-capped volcano rising proudly over 5,897 meters across the Avenue of Volcanoes, surrounded by wild horses and high-altitude Andean páramo.',
        image: '/images/tours/16-9/cotopaxi-volcano-16-9.jpg',
        desktopImage: '/images/tours/16-9/cotopaxi-volcano-16-9.jpg',
        mobileImage: '/images/tours/16-9/cotopaxi-volcano-16-9.jpg'
      },
      {
        place: 'Cotopaxi - Quilotoa',
        title: 'CRATER LAGOON',
        title2: 'OF QUILOTOA',
        description: 'Marvel at the striking turquoise waters inside an ancient volcanic caldera located at 3,500 meters altitude with panoramic views of the western Andes range.',
        image: '/images/tours/16-9/quilotoa-16-9.jpg',
        desktopImage: '/images/tours/16-9/quilotoa-16-9.jpg',
        mobileImage: '/images/tours/9-16/quilotoa-9-16.jpg'
      },
      {
        place: 'Napo - Amazon Rainforest',
        title: 'DEEP RAINFOREST',
        title2: 'OF AMAZON',
        description: 'Navigate pristine Amazonian rivers by motorized canoe, encounter native wildlife at rescue sanctuaries, and connect with authentic Kichwa indigenous families.',
        image: '/images/tours/16-9/amazon-river-16-9.jpg',
        desktopImage: '/images/tours/16-9/amazon-river-16-9.jpg',
        mobileImage: '/images/tours/9-16/amazon-waterfall-9-16.jpg'
      },
      {
        place: 'Galapagos - Isabela Island',
        title: 'TINTORERAS ISLET',
        title2: '& FLAMINGOS',
        description: 'Snorkel in turquoise lava channels with white-tip reef sharks, marine iguanas, and sea turtles, and visit coastal lagoons filled with wild flamingos.',
        image: '/images/tours/16-9/galapagos-isabela-island-16-9.jpg',
        desktopImage: '/images/tours/16-9/galapagos-isabela-island-16-9.jpg',
        mobileImage: '/images/tours/9-16/galapagos-flamingos-9-16.jpg'
      },
      {
        place: 'Azuay - Cuenca & Cajas',
        title: 'COLONIAL CUENCA',
        title2: '& CAJAS',
        description: 'Discover the UNESCO-listed colonial elegance of Cuenca, handcrafted toquilla hats, and hike among the 200 glacial lakes of Cajas National Park.',
        image: '/images/tours/16-9/cuenca-colonial-16-9.jpg',
        desktopImage: '/images/tours/16-9/cuenca-colonial-16-9.jpg',
        mobileImage: '/images/tours/9-16/cajas-national-park-9-16.jpg'
      },
      {
        place: 'Chimborazo - Andes',
        title: 'HIGHEST SUMMIT',
        title2: 'OF CHIMBORAZO',
        description: 'The closest point on Earth to the Sun at 6,310 meters. Experience the majestic Andean reserve home to wild vicuñas and ancestral Inca mountain landscapes.',
        image: '/images/tours/16-9/chimborazo-volcano-16-9.jpg',
        desktopImage: '/images/tours/16-9/chimborazo-volcano-16-9.jpg',
        mobileImage: '/images/tours/9-16/chimborazo-9-16.jpg'
      },
      {
        place: 'Galapagos - Puerto Ayora',
        title: 'LAS GRIETAS',
        title2: '& LOBERÍA',
        description: 'Swim and snorkel in the crystal-clear volcanic crevice of Las Grietas and observe playful Galapagos sea lions resting on the white sand beaches of La Lobería.',
        image: '/images/tours/16-9/galapagos-las-grietas-16-9.jpg',
        desktopImage: '/images/tours/16-9/galapagos-las-grietas-16-9.jpg',
        mobileImage: '/images/tours/9-16/galapagos-las-grietas-9-16.jpg'
      }
    ]
  },
  about: {
    title: "Unrivaled Expertise, Uncompromised Excellence",
    subtitle: "OUR CREDENTIALS",
    paragraph1: "At Vermilion Routes, we don't just book tours. We curate deeply personal, once-in-a-lifetime expeditions across the spectacular landscapes of Ecuador and the Galapagos. As direct local operators, we combine local wisdom with uncompromising exclusivity.",
    paragraph2: "Whether you are navigating the volcanic channels of the Galapagos on a private yacht charter, staying in remote, eco-friendly Amazon rainforest canopy suites, or walking the cobblestone paths of Quito historic center, we handle every detail with absolute precision.",
    imageUrl: "/images/tours/16-9/cuenca-colonial-16-9.jpg",
    metric1Val: "100%",
    metric1Lbl: "Bespoke & Tailor-Made",
    metric2Val: "+15 Yrs",
    metric2Lbl: "Field Travel Expertise",
    metric3Val: "4.9/5",
    metric3Lbl: "Guest Satisfaction",
    metric4Val: "24/7",
    metric4Lbl: "On-Trip Concierge Care"
  },
  faq: [
    {
      question: { 
        en: "What level of exclusivity and personalization can I expect?", 
        es: "¿Qué nivel de exclusividad y personalización puedo esperar?", 
        fr: "Quel niveau d'exclusivité et de personnalisation puis-je attendre?", 
        de: "Welches Maß an Exklusivität und Personalisierung kann ich erwarten?", 
        it: "Quale livello di esclusività e personalizzazione posso aspettarmi?", 
        pt: "Que nível de exclusividade e personalização posso esperar?" 
      },
      answer: { 
        en: "Every Vermilion Routes journey is entirely bespoke. We limit our guest intake to ensure our dedicated concierges can craft meticulously tailored itineraries. From private yacht charters in the Galapagos to hand-picked luxury eco-lodges, every detail is curated to your exact preferences.", 
        es: "Cada viaje con Vermilion Routes es completamente a medida. Limitamos nuestro volumen de huéspedes para garantizar un servicio de concierge dedicado. Desde yates privados en Galápagos hasta eco-lodges de lujo seleccionados a mano, cada detalle se ajusta a sus preferencias exactas.", 
        fr: "Chaque voyage avec Vermilion Routes est entièrement sur mesure. Nous limitons notre accueil pour garantir un service dédié. Des yachts privés aux Galápagos aux éco-lodges de luxe, chaque détail est adapté à vos préférences.", 
        de: "Jede Reise mit Vermilion Routes ist komplett maßgeschneidert. Wir begrenzen unsere Gästezahl, um einen engagierten Concierge-Service zu gewährleisten.", 
        it: "Ogni viaggio con Vermilion Routes è completamente su misura. Limitiamo il numero di ospiti per garantire un servizio concierge dedicato.", 
        pt: "Cada viagem com a Vermilion Routes é totalmente sob medida. Limitamos nosso volume de hóspedes para garantir um serviço de concierge dedicado." 
      }
    },
    {
      question: { 
        en: "Are your Galapagos expeditions guided by certified naturalists?", 
        es: "¿Sus expediciones en Galápagos están guiadas por naturalistas certificados?", 
        fr: "Vos expéditions aux Galápagos sont-elles guidées par des naturalistes certifiés?", 
        de: "Werden Ihre Galapagos-Expeditionen von zertifizierten Naturforschern geführt?", 
        it: "Le vostre spedizioni alle Galapagos sono guidate da naturalisti certificati?", 
        pt: "Suas expedições em Galápagos são guiadas por naturalistas certificados?" 
      },
      answer: { 
        en: "Absolutely. We exclusively partner with Level 3 Certified Naturalist Guides—the highest tier recognized by the Galapagos National Park. Their profound expertise in evolutionary biology and local ecosystems ensures a truly transformative and educational wildlife experience.", 
        es: "Absolutamente. Nos asociamos exclusivamente con Guías Naturalistas Certificados de Nivel 3, el rango más alto reconocido por el Parque Nacional Galápagos. Su profunda experiencia en biología evolutiva garantiza una inmersión transformadora en la vida silvestre.", 
        fr: "Absolument. Nous travaillons exclusivement avec des guides naturalistes certifiés de niveau 3, le plus haut niveau reconnu par le parc national des Galápagos.", 
        de: "Absolut. Wir arbeiten ausschließlich mit zertifizierten Naturführern der Stufe 3 zusammen, der höchsten vom Galapagos-Nationalpark anerkannten Stufe.", 
        it: "Assolutamente. Collaboriamo esclusivamente con Guide Naturalistiche Certificate di Livello 3, il livello più alto riconosciuto dal Parco Nazionale delle Galapagos.", 
        pt: "Absolutamente. Fazemos parceria exclusivamente com Guias Naturalistas Certificados de Nível 3, o nível mais alto reconhecido pelo Parque Nacional de Galápagos." 
      }
    },
    {
      question: { 
        en: "How do you handle internal logistics and transfers in Ecuador?", 
        es: "¿Cómo manejan la logística interna y los traslados en Ecuador?", 
        fr: "Comment gérez-vous la logistique interne et les transferts en Équateur?", 
        de: "Wie handhaben Sie die interne Logistik und Transfers in Ecuador?", 
        it: "Come gestite la logistica interna e i trasferimenti in Ecuador?", 
        pt: "Como vocês lidam com a logística interna e os traslados no Equador?" 
      },
      answer: { 
        en: "We provide end-to-end seamless logistics. From the moment you land in Quito or Guayaquil, our private VIP transport and bilingual hosts take over. All domestic flights, private transfers, and inter-island navigations are orchestrated meticulously so you simply relax and enjoy.", 
        es: "Proporcionamos logística integral sin fricciones. Desde su aterrizaje en Quito o Guayaquil, nuestro transporte VIP privado y anfitriones bilingües toman el control. Todos los vuelos nacionales, traslados y navegaciones se orquestan meticulosamente para que usted solo se relaje y disfrute.", 
        fr: "Nous fournissons une logistique fluide de bout en bout. Dès votre atterrissage, nos transports VIP privés et nos hôtes bilingues prennent le relais. Tous les vols et transferts sont méticuleusement orchestrés.", 
        de: "Wir bieten eine nahtlose End-to-End-Logistik. Ab Ihrer Landung übernehmen unsere privaten VIP-Transfers und zweisprachigen Gastgeber.", 
        it: "Forniamo una logistica senza interruzioni da un capo all'altro. Dal momento in cui atterri, i nostri trasporti VIP privati e i padroni di casa bilingui prendono il sopravvento.", 
        pt: "Fornecemos logística contínua de ponta a ponta. Desde o momento em que você pousa, nosso transporte VIP privado e anfitriões bilíngues assumem o controle." 
      }
    }
  ],
  footer: {
    logoText: "VERMILION",
    logoSubtitle: "SOUTH AMERICAN ROUTES",
    description: {
      en: "Premier boutique tour operator specializing in custom-crafted premium travel itineraries across Ecuador and Galapagos's most iconic wonders.",
      es: "Operador turístico boutique especializado en itinerarios de viaje premium a medida a través de las maravillas más icónicas de Ecuador y Galápagos.",
      fr: "Voyagiste boutique de premier ordre spécialisé dans les itinéraires de voyage haut de gamme sur mesure à travers l'Équateur et les Galapagos.",
      de: "Boutique-Reiseveranstalter, spezialisiert auf maßgeschneiderte Premium-Reiserouten zu den kultigsten Wunderwelten von Ecuador und Galapagos.",
      it: "Tour operator boutique di alto livello specializzato in itinerari di viaggio premium su misura attraverso le meraviglie di Ecuador e Galapagos.",
      pt: "Operador turístico boutique especializado em itinerários de viagem premium sob medida pelas maravilhas mais icônicas do Equador e Galápagos.",
      ja: "エクアドルとガラパゴスの象徴的な見どころを巡るオーダーメイドのプレミアム旅行を専門とするブティック旅行会社です。",
      zh: "精品旅行社，专注于在厄瓜多尔和加拉帕戈斯群岛打造定制的尊享精品旅行行程。"
    },
    copyright: "© 2026 Vermilion Routes. All Rights Reserved."
  }
};

export async function seedAllDataToFirestore(): Promise<void> {
  try {
    // 1. Seed settings
    const settingsRef = doc(db, 'settings', 'general');
    await setDoc(settingsRef, defaultSettings, { merge: true });
    console.log('Seeded settings.');

    // Delete any legacy peru destination if exists in Firestore
    try {
      const { deleteDoc } = await import('firebase/firestore');
      await deleteDoc(doc(db, 'destinations', 'peru'));
      await deleteDoc(doc(db, 'destinations', 'peru-místico'));
    } catch {}

    // 2. Seed destinations
    for (const dest of mockDestinations) {
      const destRef = doc(db, 'destinations', dest.id);
      await setDoc(destRef, dest, { merge: true });
    }
    console.log('Seeded destinations.');

    // 3. Seed tours (Purge legacy tours and seed 9 official 2026 tours)
    const toursToSeed = mockTours;
    for (const tour of toursToSeed) {
      const tourRef = doc(db, 'tours', tour.id);
      await setDoc(tourRef, tour, { merge: false });
    }
    console.log(`Seeded ${toursToSeed.length} official 2026 tours.`);

    // 4. Seed reviews
    for (const rev of mockReviews) {
      const revRef = doc(db, 'reviews', rev.id);
      await setDoc(revRef, rev, { merge: true });
    }
    console.log('Seeded reviews.');
  } catch (error) {
    console.error('Failed to seed all data to Firestore:', error);
    throw error;
  }
}
