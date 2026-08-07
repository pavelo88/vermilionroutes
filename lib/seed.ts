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
        title: 'ENCHANTED',
        title2: 'ISLANDS',
        description: 'A pristine natural sanctuary where sea lions, blue-footed boobies, and giant tortoises thrive in absolute harmony. Sail across volcanic landscapes and dive into an immersive, unforgettable experience.',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=2752&q=80'
      },
      {
        place: 'Cotopaxi - Andes',
        title: 'MAJESTIC',
        title2: 'VOLCANO',
        description: 'The perfect snow-capped cone rising proudly over the Ecuadorian Andes. Walk among mystical paramo highlands, witness the condor\'s flight, and behold the grandeur of the Avenue of the Volcanoes.',
        image: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=2752&q=80'
      },
      {
        place: 'Amazon - Orellana',
        title: 'YASUNÍ',
        title2: 'RAINFOREST',
        description: 'The most biodiverse spot on Earth. Navigate winding rivers surrounded by untouched jungle, spot pink dolphins, and let the mystical magic of the deep Amazon captivate your senses.',
        image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=2752&q=80'
      },
      {
        place: 'Manabí - Pacific Coast',
        title: 'LOS FRAILES',
        title2: 'BEACH',
        description: 'A hidden jewel of crystal-clear waters and white sands within the Machalilla National Park. Surrounded by rugged cliffs and dry forests, it remains one of South America\'s most pristine coastal retreats.',
        image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=2752&q=80'
      },
      {
        place: 'Pichincha - Quito',
        title: 'HISTORIC',
        title2: 'CENTER',
        description: 'The first World Cultural Heritage site. Cobblestone streets, colonial monasteries, and baroque cathedrals perched at 2,800 meters under the monumental shadow of the high Andes.',
        image: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=2752&q=80'
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
      question: "Is a cruise or land-based tour better for the Galapagos?",
      answer: "Cruises are ideal for visiting remote, uninhabited islands that are inaccessible in a day. Land-based tours are more flexible, perfect for multi-generational families, and less prone to seasickness."
    },
    {
      question: "When is the best time to book a curated Galapagos expedition?",
      answer: "We highly recommend booking 6 to 12 months in advance. Premium yachts (16-20 passengers maximum) have limited availability and book out very quickly for peak seasons (June-August, December-January)."
    },
    {
      question: "What is included in a Vermilion Routes tailor-made journey?",
      answer: "Our premium packages are fully inclusive of high-end boutique stays, private PNG-certified naturalist guides, inter-island flights/transfers, high-end snorkeling gear, private land transport, and curated gourmet meals."
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
