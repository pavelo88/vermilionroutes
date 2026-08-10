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
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app, databaseId);

const mockDestinations = [
  {
    id: 'galapagos',
    name: { en: 'Galapagos Islands', es: 'Islas Galápagos', fr: 'Îles Galápagos', zh: '加拉帕戈斯群岛' },
    subtitle: { en: 'The Enchanted Archipelago', es: 'El Archipiélago Encantado', fr: 'L\'archipel enchanté', zh: '迷人的群岛' },
    description: { en: 'Exclusive luxury cruises and island hopping excursions...', es: 'Cruceros exclusivos de lujo...', fr: 'Croisières de luxe exclusives...', zh: '独家豪华游轮...' },
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    toursCount: 12,
    slug: 'galapagos',
  }
];

const mockTours = [
  {
    id: 'andes-jungle-galapagos',
    title: { en: 'Andes, Amazon Jungle & Enchanted Galapagos Expedition', es: 'Expedición Andes, Amazonía y Galápagos', fr: 'Expédition Andes, Amazonie et Galápagos', zh: '安第斯山脉、亚马逊丛林和迷人的加拉帕戈斯探险' },
    destination: { en: 'Ecuador & Galapagos', es: 'Ecuador y Galápagos', fr: 'Équateur et Galápagos', zh: '厄瓜多尔和加拉帕戈斯' },
    duration: { en: '12 Days / 11 Nights', es: '12 Días / 11 Noches', fr: '12 Jours / 11 Nuits', zh: '12 天 / 11 晚' },
    price: 2731,
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 48,
    category: { en: 'Complete Grand Expedition', es: 'Gran Expedición Completa', fr: 'Grande Expédition Complète', zh: '完整的大型探险' },
    isPopular: true,
  },
  {
    id: 'enchanted-islands',
    title: { en: 'Enchanted Islands: San Cristobal, Santa Cruz & Isabela', es: 'Islas Encantadas: San Cristóbal, Santa Cruz e Isabela', fr: 'Îles Enchantées: San Cristobal, Santa Cruz & Isabela', zh: '迷人的岛屿：圣克里斯托瓦尔，圣克鲁斯和伊莎贝拉' },
    destination: { en: 'Galapagos', es: 'Galápagos', fr: 'Galápagos', zh: '加拉帕戈斯' },
    duration: { en: '7 Days / 6 Nights', es: '7 Días / 6 Noches', fr: '7 Jours / 6 Nuits', zh: '7 天 / 6 晚' },
    price: 1799,
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    reviewsCount: 62,
    category: { en: 'Luxury Island Hopping', es: 'Island Hopping de Lujo', fr: 'Island Hopping de Luxe', zh: '豪华跳岛游' },
    isPopular: true,
  }
];

async function runSeed() {
  console.log('Starting seed execution...');
  for (const dest of mockDestinations) {
    await setDoc(doc(db, 'destinations', dest.id), dest, { merge: true });
  }
  for (const tour of mockTours) {
    await setDoc(doc(db, 'tours', tour.id), tour, { merge: true });
  }
  console.log('🎉 Translated Firestore Seeding Completed Successfully!');
  process.exit(0);
}

runSeed().catch(console.error);
