export {};
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
// @ts-ignore
import firebaseConfigJson from '../firebase-applet-config.json' with { type: 'json' };

const firebaseConfig = {
  apiKey: firebaseConfigJson.apiKey,
  authDomain: firebaseConfigJson.authDomain,
  projectId: firebaseConfigJson.projectId,
  storageBucket: firebaseConfigJson.storageBucket,
  messagingSenderId: firebaseConfigJson.messagingSenderId,
  appId: firebaseConfigJson.appId,
};

const databaseId = firebaseConfigJson.firestoreDatabaseId || '(default)';

console.log('Initializing Firebase app for project:', firebaseConfig.projectId);
console.log('Targeting Database ID:', databaseId);

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app, databaseId);

const mockDestinations = [
  {
    id: 'galapagos',
    name: 'Galapagos Islands',
    subtitle: 'The Enchanted Archipelago',
    description: 'Exclusive luxury cruises and island hopping excursions to witness wildlife found nowhere else on Earth.',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    toursCount: 12,
    slug: 'galapagos',
  },
  {
    id: 'ecuador',
    name: 'Mainland Ecuador',
    subtitle: 'Andes, Volcanoes & Amazon Rainforest',
    description: 'Traverse the Avenue of Volcanoes, explore deep jungle lodges, and marvel at UNESCO colonial architecture.',
    imageUrl: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=1200&q=80',
    toursCount: 18,
    slug: 'ecuador',
  },
  {
    id: 'peru',
    name: 'Mystical Peru',
    subtitle: 'Cusco, Sacred Valley & Machu Picchu',
    description: 'Immerse yourself in Inca heritage, Andean highlands, and world-class gastronomy in South America.',
    imageUrl: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1200&q=80',
    toursCount: 15,
    slug: 'peru',
  },
];

const mockTours = [
  {
    id: 'andes-jungle-galapagos',
    title: 'Andes, Amazon Jungle & Enchanted Galapagos Expedition',
    destination: 'Ecuador & Galapagos',
    duration: '12 Days / 11 Nights',
    price: 2731,
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 48,
    category: 'Complete Grand Expedition',
    isPopular: true,
    description: 'The definitive luxury expedition across Ecuador: immerse yourself in colonial Quito, travel deep into the pristine Amazon Rainforest at a luxury eco-lodge, journey through towering Andean volcanoes, and cruise the enchanted Galapagos Archipelago observing iconic wildlife up close.',
    gallery: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    ],
    highlights: [
      'Inter-island navigation in the Galapagos',
      'Luxury Amazon eco-lodge with canopy walk',
      'Avenue of Volcanoes & emerald Quilotoa Lagoon',
      'Certified bilingual National Park naturalists',
    ],
    inclusions: [
      'Internal flights: Quito - Coca / Quito - Galapagos',
      'Boutique 4★ & 5★ luxury accommodation (double occupancy)',
      'All breakfasts, gourmet rainforest meals & cruise dining',
      'Private PNG-certified expert naturalist guides',
      'All National Park fees & private reserve entrance tickets',
      'Private air-conditioned luxury ground transfers throughout',
    ],
    exclusions: [
      'International arrival and departure flights',
      'Galapagos Transit Control Card ($20 USD)',
      'Galapagos National Park Entrance Fee ($200 USD)',
      'Discretionary gratuities for guides and yacht crew',
      'Comprehensive travel insurance (mandatory)',
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Quito & Historic Welcome', description: 'VIP airport reception at Quito Mariscal Sucre International Airport.', meals: 'Welcome Dinner' },
      { day: 2, title: 'Quito UNESCO Heritage & Equatorial Line', description: 'Private guided exploration of La Compañía de Jesús gilded church.', meals: 'Breakfast & Lunch' },
      { day: 3, title: 'Journey to the Amazon: Coca & Eco-Lodge Safari', description: 'Flight to Coca and motorized canoe ride into Yasuní National Park.', meals: 'Breakfast, Lunch & Dinner' },
      { day: 4, title: '36m Canopy Walkway & Parrot Clay Lick', description: 'Dawn climb to observation tower to spot toucans and macaws.', meals: 'Breakfast, Lunch & Dinner' },
      { day: 5, title: 'Avenue of the Volcanoes & Cotopaxi National Park', description: 'Return flight to Quito and scenic drive to Cotopaxi National Park.', meals: 'Breakfast & Lunch' },
      { day: 6, title: 'Quilotoa Crater Lagoon & Flight to Galapagos', description: 'Visit emerald volcanic crater lake of Quilotoa. Flight to Baltra.', meals: 'Breakfast' },
      { day: 7, title: 'Galapagos: Giant Tortoises & Tortuga Bay', description: 'Encounter giant tortoises roaming freely in Santa Cruz highlands.', meals: 'Breakfast & Lunch' },
      { day: 8, title: 'Luxury Yacht Day Cruise: Bartolomé / North Seymour', description: 'Yacht tour to Bartolomé. Snorkel with Galapagos penguins.', meals: 'Breakfast & Lunch' },
      { day: 9, title: 'Speedboat to Isabela Island & Lava Tunnels', description: 'Marine transfer to Isabela. Tour Los Túneles for world-class snorkeling.', meals: 'Breakfast & Lunch' },
      { day: 10, title: 'Sierra Negra Volcano Crater Trek', description: 'Hike to the rim of Sierra Negra, world second-largest active caldera.', meals: 'Breakfast' },
      { day: 11, title: 'Return to Santa Cruz & Scalesia Twin Craters', description: 'Return boat ride to Santa Cruz. Visit Los Gemelos volcanic sinkholes.', meals: 'Breakfast & Gala Dinner' },
      { day: 12, title: 'Baltra Airport Transfer & Homeward Journey', description: 'Private transfer to Baltra Airport with local coffee plantation stop.', meals: 'Breakfast' },
    ],
  },
  {
    id: 'enchanted-islands',
    title: 'Enchanted Islands: San Cristobal, Santa Cruz & Isabela',
    destination: 'Galapagos',
    duration: '7 Days / 6 Nights',
    price: 1799,
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    reviewsCount: 62,
    category: 'Luxury Island Hopping',
    isPopular: true,
    description: 'Explore the three most iconic inhabited Galapagos Islands on a seamless, comfortable Island Hopping tour.',
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    ],
    highlights: [
      'Snorkel with playful sea lions & sea turtles',
      'Hike dramatic volcanic craters & lava fields',
      'Oceanfront boutique luxury accommodation',
    ],
    inclusions: [
      '6 nights accommodation in premier boutique hotels',
      'Daily breakfasts & lunches on all day excursions',
      'Complete high-end snorkeling gear',
    ],
    exclusions: ['Galapagos National Park fee ($200 USD)', 'Transit Control Card ($20 USD)'],
    itinerary: [
      { day: 1, title: 'Arrival in San Cristobal', description: 'Greeting by private guide and check-in.' },
      { day: 2, title: 'Kicker Rock Snorkeling', description: 'Deep-water snorkel with sharks and rays.' },
      { day: 3, title: 'Santa Cruz Giant Tortoise Reserve', description: 'Speedboat to Santa Cruz and highlands tour.' },
    ],
  },
  {
    id: 'peru-el-cusco',
    title: 'Inca Wonders: Cusco, Sacred Valley & Machu Picchu',
    destination: 'Peru',
    duration: '9 Days / 8 Nights',
    price: 2300,
    imageUrl: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 39,
    category: 'Cultural & History',
    isPopular: false,
    description: 'The ultimate immersion into the Inca Empire. Explore imperial Cusco, the fertile Sacred Valley, and Machu Picchu.',
    gallery: [
      'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1200&q=80',
    ],
    highlights: [
      'Vistadome luxury panoramic train to Machu Picchu',
      'Private VIP guided tour of Sacsayhuaman',
      '5-course Peruvian gastronomic experience',
    ],
    inclusions: [
      '8 nights stay in 4★ & 5★ luxury historical hotels',
      'Roundtrip Vistadome panoramic train tickets',
      'Machu Picchu entrance tickets with private guide',
    ],
    exclusions: ['International & domestic flights', 'Travel insurance'],
    itinerary: [
      { day: 1, title: 'Arrival in Cusco', description: 'Private airport transfer to historic hotel.' },
      { day: 2, title: 'Imperial Cusco & Qorikancha', description: 'Guided tour of Sun Temple and Sacsayhuaman.' },
      { day: 3, title: 'Sacred Valley & Moray', description: 'Discover terraces of Moray and Maras salt mines.' },
    ],
  },
  {
    id: 'avenue-volcanoes',
    title: 'Ecuador Avenue of the Volcanoes & Colonial Haciendas',
    destination: 'Ecuador',
    duration: '11 Days / 10 Nights',
    price: 2526,
    imageUrl: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 27,
    category: 'Adventure & Nature',
    isPopular: false,
    description: 'Traverse the backbone of the Ecuadorian Andes named by Alexander von Humboldt: the Avenue of Volcanoes.',
    gallery: [
      'https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=1200&q=80',
    ],
    highlights: [
      'Andean Highland route & Cotopaxi snowcap',
      'Baños de Agua Santa & Waterfall Route',
      'Stays in historic 17th-century haciendas',
    ],
    inclusions: ['Accommodation in historic haciendas', 'Daily breakfasts'],
    exclusions: ['International airfare'],
    itinerary: [
      { day: 1, title: 'Arrival in Quito', description: 'Transfer to hotel.' },
      { day: 2, title: 'Cotopaxi Volcano', description: 'Hike around Limpiopungo lagoon.' },
    ],
  },
  {
    id: 'peru-essential',
    title: 'Peru Essential & Machu Picchu Express',
    destination: 'Peru',
    duration: '6 Days / 5 Nights',
    price: 1999,
    imageUrl: 'https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviewsCount: 31,
    category: 'Express Luxury Highlights',
    isPopular: false,
    description: 'The ideal compact luxury itinerary to experience the best of Cusco and Machu Picchu.',
    gallery: ['https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?auto=format&fit=crop&w=1200&q=80'],
    highlights: ['VIP guided tour of Machu Picchu Citadel'],
    inclusions: ['5 nights luxury boutique stays', 'Vistadome train tickets'],
    exclusions: ['International flights'],
    itinerary: [{ day: 1, title: 'Arrival in Cusco', description: 'Rest for acclimatization.' }],
  },
  {
    id: 'misterios-del-peru',
    title: 'Mysteries of Peru & Nazca Lines Overland',
    destination: 'Peru',
    duration: '11 Days / 10 Nights',
    price: 2150,
    imageUrl: 'https://images.unsplash.com/photo-1531968455001-5c5272a41129?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 19,
    category: 'Grand Archaeological Overland',
    isPopular: false,
    description: 'Fly over the enigmatic Nazca Lines, cruise Ballestas Islands, and marvel at Cusco and Machu Picchu.',
    gallery: ['https://images.unsplash.com/photo-1531968455001-5c5272a41129?auto=format&fit=crop&w=1200&q=80'],
    highlights: ['Flight over mysterious Nazca geoglyphs', 'Huacachina Desert Oasis'],
    inclusions: ['Scenic Nazca Lines aircraft flight', 'Machu Picchu train pass'],
    exclusions: ['Airport tax fee for Nazca flight'],
    itinerary: [{ day: 1, title: 'Arrival in Lima', description: 'Private welcome and coastal hotel check-in.' }],
  },
];

async function runSeed() {
  console.log('Starting seed execution...');
  
  // Seed Destinations
  for (const dest of mockDestinations) {
    const docRef = doc(db, 'destinations', dest.id);
    await setDoc(docRef, dest, { merge: true });
    console.log(`✓ Seeded destination: ${dest.id}`);
  }

  // Seed Tours
  for (const tour of mockTours) {
    const docRef = doc(db, 'tours', tour.id);
    await setDoc(docRef, tour, { merge: true });
    console.log(`✓ Seeded tour: ${tour.id}`);
  }

  console.log('🎉 Firestore Seeding Completed Successfully!');
  process.exit(0);
}

runSeed().catch((err) => {
  console.error('❌ Seed execution failed:', err);
  process.exit(1);
});

