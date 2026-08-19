import { db } from './firebase';
import { doc, setDoc } from 'firebase/firestore';
import { mockTours, mockDestinations, mockReviews } from '@/data/mock';

export const defaultSettings = {
  contact: {
    phone: "+593 99 404 8458",
    email: "info@vermilionroutes.com",
    address: "Quito, Ecuador",
    whatsappUrl: "https://wa.me/593994048458",
    facebook: "https://facebook.com/vermilionroutes",
    instagram: "https://instagram.com/vermilionroutes",
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
        image: '/images/tours/16-9/galapagos-tortuga-gigante-16-9.jpg'
      },
      {
        place: 'Pichincha - Quito',
        title: 'HISTORIC CENTER',
        title2: 'OF QUITO',
        description: 'The first UNESCO World Cultural Heritage site in the world. Walk along preserved cobblestone streets and marvel at the golden altars of La Compañía Church.',
        image: '/images/tours/16-9/quito-iglesia-de-san-francisco-16-9.jpg'
      },
      {
        place: 'Tungurahua - Baños',
        title: 'PAILÓN',
        title2: 'DEL DIABLO',
        description: 'Feel the thunderous roar of Ecuador’s most famous waterfall. Experience suspension bridges, lush tropical cloud forest, and the scenic Route of the Waterfalls.',
        image: '/images/tours/16-9/pailon-del-diablo-16-9.jpg'
      },
      {
        place: 'Cotopaxi - Andes',
        title: 'MAJESTIC VOLCANO',
        title2: 'COTOPAXI',
        description: 'The iconic snow-capped volcano rising proudly over 5,897 meters across the Avenue of Volcanoes, surrounded by wild horses and high-altitude Andean páramo.',
        image: '/images/tours/16-9/cotopaxi-volcano-16-9.jpg'
      },
      {
        place: 'Cotopaxi - Quilotoa',
        title: 'CRATER LAGOON',
        title2: 'OF QUILOTOA',
        description: 'Marvel at the striking turquoise waters inside an ancient volcanic caldera located at 3,500 meters altitude with panoramic views of the western Andes range.',
        image: '/images/tours/16-9/quilotoa-16-9.jpg'
      },
      {
        place: 'Napo - Amazon Rainforest',
        title: 'DEEP RAINFOREST',
        title2: 'OF AMAZON',
        description: 'Navigate pristine Amazonian rivers by motorized canoe, encounter native wildlife at rescue sanctuaries, and connect with authentic Kichwa indigenous families.',
        image: '/images/tours/16-9/tena-amazon-jungle-16-9.jpg'
      },
      {
        place: 'Galapagos - Isabela Island',
        title: 'TINTORERAS ISLET',
        title2: '& FLAMINGOS',
        description: 'Snorkel in turquoise lava channels with white-tip reef sharks, marine iguanas, and sea turtles, and visit coastal lagoons filled with wild flamingos.',
        image: '/images/tours/16-9/isabela-island-16-9.jpg'
      },
      {
        place: 'Azuay - Cuenca & Cajas',
        title: 'COLONIAL CUENCA',
        title2: '& CAJAS',
        description: 'Discover the UNESCO-listed colonial elegance of Cuenca, handcrafted toquilla hats, and hike among the 200 glacial lakes of Cajas National Park.',
        image: '/images/tours/16-9/cajas-national-park-16-9.jpg'
      },
      {
        place: 'Chimborazo - Andes',
        title: 'HIGHEST SUMMIT',
        title2: 'OF CHIMBORAZO',
        description: 'The closest point on Earth to the Sun at 6,310 meters. Experience the majestic Andean reserve home to wild vicuñas and ancestral Inca mountain landscapes.',
        image: '/images/tours/16-9/chimborazo-volcano-16-9.jpg'
      },
      {
        place: 'Galapagos - Puerto Ayora',
        title: 'LAS GRIETAS',
        title2: '& LOBERÍA',
        description: 'Swim and snorkel in the crystal-clear volcanic crevice of Las Grietas and observe playful Galapagos sea lions resting on the white sand beaches of La Lobería.',
        image: '/images/tours/16-9/las-grietas-canyon-16-9.jpg'
      }
    ]
  },
  about: {
    title: "Unrivaled Expertise, Uncompromised Excellence",
    subtitle: "OUR CREDENTIALS",
    paragraph1: "At Vermilion Routes, we don't just book tours. We curate deeply personal, once-in-a-lifetime expeditions across the spectacular landscapes of Ecuador and the Galapagos. As direct local operators, we combine local wisdom with uncompromising exclusivity.",
    paragraph2: "Whether you are navigating the volcanic channels of the Galapagos on a private yacht charter, staying in remote, eco-friendly Amazon rainforest canopy suites, or walking the cobblestone paths of Quito historic center, we handle every detail with absolute precision.",
    imageUrl: "/images/tours/16-9/cajas-national-park-16-9.jpg",
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
      question: { en: "Is a cruise or land-based tour better for the Galapagos?", es: "¿Es mejor un crucero o un tour terrestre para Galápagos?", fr: "Est-il préférable de faire une croisière ou un circuit terrestre aux Galápagos?", de: "Ist eine Kreuzfahrt oder eine Landtour für Galapagos besser?", it: "È meglio una crociera o un tour via terra per le Galapagos?", pt: "Um cruzeiro ou um passeio terrestre é melhor para Galápagos?", ja: "ガラパゴスにはクルーズと陸上ツアーのどちらが良いですか？", zh: "加拉帕戈斯群岛是游轮还是陆地游更好？" },
      answer: { en: "Cruises are ideal for visiting remote, uninhabited islands that are inaccessible in a day. Land-based tours are more flexible, perfect for multi-generational families, and less prone to seasickness.", es: "Los cruceros son ideales para visitar islas remotas. Los tours terrestres son más flexibles, perfectos para familias y menos propensos al mareo.", fr: "Les croisières sont idéales pour visiter des îles éloignées. Les circuits terrestres sont plus flexibles et parfaits pour les familles.", de: "Kreuzfahrten sind ideal für abgelegene Inseln. Landtouren sind flexibler und perfekt für Familien.", it: "Le crociere sono ideali per le isole remote. I tour via terra sono più flessibili e perfetti per le familias.", pt: "Cruzeiros são ideais para ilhas remotas. Os passeios terrestres são mais flexíveis e perfeitos para famílias.", ja: "クルーズは離島を訪れるのに最適です。陸上ツアーはより柔軟で家族向けです。", zh: "游轮非常适合游览偏远岛屿。陆地游更灵活，非常适合家庭。" }
    },
    {
      question: { en: "When is the best time to book a luxury Galapagos expedition?", es: "¿Cuándo es el mejor momento para reservar una expedición de lujo a Galápagos?", fr: "Quel est le meilleur moment pour réserver une expédition de luxe aux Galápagos?", de: "Wann ist die beste Zeit, um eine Galapagos-Luxusexpedition zu buchen?", it: "Qual è il momento migliore per prenotare una spedizione di lusso alle Galapagos?", pt: "Quando é a melhor época para reservar uma expedição de luxo para Galápagos?", ja: "ガラパゴスの豪華探検を予約するのに最適な時期はいつですか？", zh: "预订加拉帕戈斯群岛豪华探险的最佳时间是什么时候？" },
      answer: { en: "The Galapagos is a year-round destination. However, due to the limited capacity of luxury yachts (usually 12-16 passengers), we highly recommend booking at least 8 to 12 months in advance, especially for holiday seasons.", es: "Galápagos es un destino para todo el año. Sin embargo, recomendamos reservar con 8-12 meses de anticipación debido a la capacidad limitada.", fr: "Les Galápagos se visitent toute l'année. Nous recommandons de réserver 8 à 12 mois à l'avance.", de: "Galapagos ist ein ganzjähriges Reiseziel. Wir empfehlen eine Buchung 8-12 Monate im Voraus.", it: "Le Galapagos sono una destinazione per tutto l'anno. Consigliamo di prenotare 8-12 mesi in anticipo.", pt: "Galápagos é um destino para o ano todo. Recomendamos reservar com 8-12 meses de antecedência.", ja: "ガラパゴスは一年中楽しめますが、8〜12ヶ月前の予約をお勧めします。", zh: "加拉帕戈斯群岛是一个全年皆宜的目的地。我们建议提前 8-12 个月预订。" }
    },
    {
      question: { en: "What is included in a Vermilion Routes tailor-made journey?", es: "¿Qué está incluido en un viaje a medida de Vermilion Routes?", fr: "Qu'est-ce qui est inclus dans un voyage sur mesure Vermilion Routes?", de: "Was ist in einer maßgeschneiderten Reise von Vermilion Routes enthalten?", it: "Cosa è incluido in un viaggio su misura Vermilion Routes?", pt: "O que está incluído em uma viagem sob medida da Vermilion Routes?", ja: "Vermilion Routesのオーダーメイドの旅には何が含まれていますか？", zh: "Vermilion Routes 定制之旅包括什么？" },
      answer: { en: "Our bespoke journeys include all domestic flights, premium accommodations, expert private bilingual guides, private VIP ground transportation, most meals, and a dedicated 24/7 concierge specialist available via WhatsApp during your entire trip.", es: "Incluye vuelos domésticos, alojamiento premium, guías privados, transporte VIP, comidas y un concierge 24/7 por WhatsApp.", fr: "Comprend les vols intérieurs, l'hébergement premium, les guides privés, le transport VIP, les repas et un concierge 24/7.", de: "Beinhaltet Inlandsflüge, Premium-Unterkünfte, private Reiseleiter, VIP-Transport, Mahlzeiten und 24/7 Concierge.", it: "Include voli nazionali, alloggi premium, guide private, trasporto VIP, pasti e concierge 24/7.", pt: "Inclui voos domésticos, acomodação premium, guias privados, transporte VIP, refeições e concierge 24/7.", ja: "国内線、高級宿泊施設、プライベートガイド、VIP送迎、食事、24時間対応のコンシェルジュが含まれます。", zh: "包括国内航班、高级住宿、私人导游、VIP 交通、餐饮和全天候礼宾服务。" }
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
