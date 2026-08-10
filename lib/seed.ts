import { db } from './firebase';
import { doc, setDoc } from 'firebase/firestore';
import { mockTours, mockDestinations, mockReviews } from '@/data/mock';
import parsedTours from '../data/parsed_tours.json';

export const defaultSettings = {
  contact: {
    phone: "+593 99 404 8458",
    email: "info@vermilionroutes.com",
    address: "Quito, Ecuador",
    whatsappUrl: "https://wa.me/593994048458",
    facebook: "https://facebook.com/vermilionroutes",
    instagram: "https://instagram.com/vermilionroutes",
    tripadvisor: "https://tripadvisor.com"
  },
  seo: {
    title: "Vermilion Routes | Tailor-Made Exclusive Travel in Galapagos, Ecuador & Peru",
    description: "Experience South America with bespoke travel itineraries, exclusive Galapagos island cruises, Amazon rainforest expeditions, and Andean volcano treks.",
    keywords: "Galapagos premium cruises, Ecuador travel agency, Machu Picchu private tours, South America curated expeditions, Tailor-made itineraries Galapagos, Bespoke travel Ecuador Peru, Vermilion Routes"
  },
  hero: {
    badge: "Boutique Travel Agency • Galapagos, Ecuador & Peru Specialists",
    title: "Tailor-Made Curated Expeditions",
    titleColored: "Crafted for Extraordinary Travel",
    subtitle: "Cruise the enchanted Galapagos Islands, trek the volcanic spine of the high Andes, explore the deep Amazon rainforest, and uncover the mysteries of Machu Picchu.",
    backgroundImage: "",
    backgroundImages: [] as string[],
    slides: [
      {
        place: 'Galapagos - Archipelago',
        title: 'SHARK',
        title2: 'ENCOUNTER',
        description: 'Dive into the pristine waters of the Galapagos Marine Reserve. Swim alongside hammerhead sharks, playful sea lions, and marine iguanas in one of the planet\'s most protected and spectacular underwater realms.',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=2752&q=80'
      },
      {
        place: 'Pichincha - Quito',
        title: 'HISTORIC',
        title2: 'CENTER',
        description: 'The first World Cultural Heritage site. Cobblestone streets, colonial monasteries, and baroque cathedrals perched at 2,800 meters under the monumental shadow of the high Andes.',
        image: 'https://media.istockphoto.com/id/692499466/photo/plaza-de-san-francisco-and-st-francis-church-quito-ecuador.jpg?s=1024x1024&w=is&k=20&c=IqO_UCVWPbOwteF3cY7fggiUZD2z391V3kufWNgEhkg='
      },
      {
        place: 'Azuay - Cuenca',
        title: 'COLONIAL',
        title2: 'CHARM',
        description: 'A deeply enchanting Andean city known for its stunning architecture, artisan traditions, and the picturesque Tomebamba river. Experience the soul of Ecuador in every cobblestone street.',
        image: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=2752&q=80'
      },
      {
        place: 'Cotopaxi - Andes',
        title: 'MAJESTIC',
        title2: 'VOLCANO',
        description: 'The perfect snow-capped cone rising proudly over the Ecuadorian Andes. Walk among mystical paramo highlands, witness the condor\'s flight, and behold the grandeur of the Avenue of the Volcanoes.',
        image: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=2752&q=80'
      },
      {
        place: 'Manabí - Pacific Coast',
        title: 'FRAILES',
        title2: 'BEACH',
        description: 'A hidden jewel of crystal-clear waters and white sands within the Machalilla National Park. Surrounded by rugged cliffs and dry forests, it remains one of South America\'s most pristine coastal retreats.',
        image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=2752&q=80'
      },
      {
        place: 'Guayas - Guayaquil',
        title: 'TROPICAL',
        title2: 'PORT',
        description: 'The economic heartbeat of Ecuador. Stroll the vibrant Malecón 2000, explore the colorful hillside neighborhood of Las Peñas, and feel the warm, energetic spirit of the Pacific coast.',
        image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=2752&q=80'
      },
      {
        place: 'Cusco - Peru',
        title: 'SACRED',
        title2: 'VALLEY',
        description: 'Journey into the heart of the Inca Empire. Traverse terraced hillsides, discover ancient citadels hidden in the mist, and connect with the timeless heritage of the Andean people.',
        image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=2752&q=80'
      }
    ]
  },
  about: {
    title: "Unrivaled Expertise, Uncompromised Excellence",
    subtitle: "OUR CREDENTIALS",
    paragraph1: "At Vermilion Routes, we don't just book tours. We curate deeply personal, once-in-a-lifetime expeditions across the spectacular landscapes of Ecuador, the Galapagos, and Peru. As direct local operators, we combine local wisdom with uncompromising exclusivity.",
    paragraph2: "Whether you are navigating the volcanic channels of the Galapagos on a private yacht charter, staying in remote, eco-friendly Amazon rainforest canopy suites, or walking the cobblestone paths of ancient Inca citadels, we handle every detail with absolute precision.",
    imageUrl: "https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=1200&q=80",
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
      answer: { en: "Cruises are ideal for visiting remote, uninhabited islands that are inaccessible in a day. Land-based tours are more flexible, perfect for multi-generational families, and less prone to seasickness.", es: "Los cruceros son ideales para visitar islas remotas. Los tours terrestres son más flexibles, perfectos para familias y menos propensos al mareo.", fr: "Les croisières sont idéales pour visiter des îles éloignées. Les circuits terrestres sont plus flexibles et parfaits pour les familles.", de: "Kreuzfahrten sind ideal für abgelegene Inseln. Landtouren sind flexibler und perfekt für Familien.", it: "Le crociere sono ideali per le isole remote. I tour via terra sono più flessibili e perfetti per le famiglie.", pt: "Cruzeiros são ideais para ilhas remotas. Os passeios terrestres são mais flexíveis e perfeitos para famílias.", ja: "クルーズは離島を訪れるのに最適です。陸上ツアーはより柔軟で家族向けです。", zh: "游轮非常适合游览偏远岛屿。陆地游更灵活，非常适合家庭。" }
    },
    {
      question: { en: "When is the best time to book a luxury Galapagos expedition?", es: "¿Cuándo es el mejor momento para reservar una expedición de lujo a Galápagos?", fr: "Quel est le meilleur moment pour réserver une expédition de luxe aux Galápagos?", de: "Wann ist die beste Zeit, um eine Galapagos-Luxusexpedition zu buchen?", it: "Qual è il momento migliore per prenotare una spedizione di lusso alle Galapagos?", pt: "Quando é a melhor época para reservar uma expedição de luxo para Galápagos?", ja: "ガラパゴスの豪華探検を予約するのに最適な時期はいつですか？", zh: "预订加拉帕戈斯群岛豪华探险的最佳时间是什么时候？" },
      answer: { en: "The Galapagos is a year-round destination. However, due to the limited capacity of luxury yachts (usually 12-16 passengers), we highly recommend booking at least 8 to 12 months in advance, especially for holiday seasons.", es: "Galápagos es un destino para todo el año. Sin embargo, recomendamos reservar con 8-12 meses de anticipación debido a la capacidad limitada.", fr: "Les Galápagos se visitent toute l'année. Nous recommandons de réserver 8 à 12 mois à l'avance.", de: "Galapagos ist ein ganzjähriges Reiseziel. Wir empfehlen eine Buchung 8-12 Monate im Voraus.", it: "Le Galapagos sono una destinazione per tutto l'anno. Consigliamo di prenotare 8-12 mesi in anticipo.", pt: "Galápagos é um destino para o ano todo. Recomendamos reservar com 8-12 meses de antecedência.", ja: "ガラパゴスは一年中楽しめますが、8〜12ヶ月前の予約をお勧めします。", zh: "加拉帕戈斯群岛是一个全年皆宜的目的地。我们建议提前 8-12 个月预订。" }
    },
    {
      question: { en: "What is included in a Vermilion Routes tailor-made journey?", es: "¿Qué está incluido en un viaje a medida de Vermilion Routes?", fr: "Qu'est-ce qui est inclus dans un voyage sur mesure Vermilion Routes?", de: "Was ist in einer maßgeschneiderten Reise von Vermilion Routes enthalten?", it: "Cosa è incluso in un viaggio su misura Vermilion Routes?", pt: "O que está incluído em uma viagem sob medida da Vermilion Routes?", ja: "Vermilion Routesのオーダーメイドの旅には何が含まれていますか？", zh: "Vermilion Routes 定制之旅包括什么？" },
      answer: { en: "Our bespoke journeys include all domestic flights, premium accommodations, expert private bilingual guides, private VIP ground transportation, most meals, and a dedicated 24/7 concierge specialist available via WhatsApp during your entire trip.", es: "Incluye vuelos domésticos, alojamiento premium, guías privados, transporte VIP, comidas y un concierge 24/7 por WhatsApp.", fr: "Comprend les vols intérieurs, l'hébergement premium, les guides privés, le transport VIP, les repas et un concierge 24/7.", de: "Beinhaltet Inlandsflüge, Premium-Unterkünfte, private Reiseleiter, VIP-Transport, Mahlzeiten und 24/7 Concierge.", it: "Include voli nazionali, alloggi premium, guide private, trasporto VIP, pasti e concierge 24/7.", pt: "Inclui voos domésticos, acomodação premium, guias privados, transporte VIP, refeições e concierge 24/7.", ja: "国内線、高級宿泊施設、プライベートガイド、VIP送迎、食事、24時間対応のコンシェルジュが含まれます。", zh: "包括国内航班、高级住宿、私人导游、VIP 交通、餐饮和全天候礼宾服务。" }
    }
  ],
  footer: {
    logoText: "VERMILION",
    logoSubtitle: "SOUTH AMERICAN ROUTES",
    description: "Premier boutique tour operator specializing in custom-crafted premium travel itineraries across South America's most iconic wonders.",
    copyright: "© 2026 Vermilion Routes. All Rights Reserved."
  }
};

export async function seedAllDataToFirestore(): Promise<void> {
  try {
    // 1. Seed settings
    const settingsRef = doc(db, 'settings', 'general');
    await setDoc(settingsRef, defaultSettings, { merge: true });
    console.log('Seeded settings.');

    // 2. Seed destinations
    for (const dest of mockDestinations) {
      const destRef = doc(db, 'destinations', dest.id);
      await setDoc(destRef, dest, { merge: true });
    }
    console.log('Seeded destinations.');

    // 3. Seed tours
    const toursToSeed = parsedTours && parsedTours.length > 0 ? parsedTours : mockTours;
    for (const tour of toursToSeed) {
      const tourRef = doc(db, 'tours', tour.id);
      await setDoc(tourRef, tour, { merge: true });
    }
    console.log(`Seeded ${toursToSeed.length} tours.`);

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
