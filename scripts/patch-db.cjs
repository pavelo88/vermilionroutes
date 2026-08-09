const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc, setDoc } = require('firebase/firestore');
const firebaseConfigJson = require('../firebase-applet-config.json');

const firebaseConfig = {
  apiKey: firebaseConfigJson.apiKey,
  authDomain: firebaseConfigJson.authDomain,
  projectId: firebaseConfigJson.projectId,
  storageBucket: firebaseConfigJson.storageBucket,
  messagingSenderId: firebaseConfigJson.messagingSenderId,
  appId: firebaseConfigJson.appId,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfigJson.firestoreDatabaseId || '(default)');

const TARGET_LANGS = ['es', 'fr', 'de', 'it', 'pt', 'ja', 'zh'];

async function patch() {
  // Destinations
  const destRef = collection(db, 'destinations');
  
  await setDoc(doc(destRef, 'ecuador-mainland'), {
    id: 'ecuador-mainland',
    name: { en: 'Mainland Ecuador', es: 'Ecuador Continental', fr: 'Équateur Continental', de: 'Festland Ecuador', it: 'Ecuador Continentale', pt: 'Equador Continental', ja: '本土エクアドル', zh: '厄瓜多尔大陆' },
    subtitle: { en: 'Andes, Volcanoes & Amazon Rainforest', es: 'Andes, Volcanes y Selva Amazónica', fr: 'Andes, Volcans et Forêt Amazonienne', de: 'Anden, Vulkane & Amazonas-Regenwald', it: 'Ande, Vulcani e Foresta Amazzonica', pt: 'Andes, Vulcões e Floresta Amazônica', ja: 'アンデス、火山、アマゾン熱带雨林', zh: '安第斯山脉、火山和亚马逊雨林' },
    description: { en: 'Traverse the Avenue of Volcanoes, explore deep jungle lodges, and marvel at UNESCO colonial architecture.', es: 'Atraviesa la Avenida de los Volcanes, explora lodges en la selva profunda y maravíllate con la arquitectura colonial.', fr: "Traversez l'Avenue des Volcans, explorez la jungle profonde...", de: 'Durchqueren Sie die Straße der Vulkane...', it: 'Attraversa il Viale dei Vulcani...', pt: 'Atravesse a Avenida dos Vulcões...', ja: '火山の通りを横断し...', zh: '穿越火山大道...' },
    imageUrl: 'https://images.unsplash.com/photo-1596422846543-74c6e614bc44?auto=format&fit=crop&w=800&q=80',
    toursCount: 18,
    status: 'published'
  });

  await setDoc(doc(destRef, 'galapagos'), {
    id: 'galapagos',
    name: { en: 'Galapagos Islands', es: 'Islas Galápagos', fr: 'Îles Galápagos', de: 'Galápagos-Inseln', it: 'Isole Galapagos', pt: 'Ilhas Galápagos', ja: 'ガラパゴス諸島', zh: '加拉帕戈斯群岛' },
    subtitle: { en: 'The Enchanted Archipelago', es: 'El Archipiélago Encantado', fr: "L'Archipel Enchanté", de: 'Das verzauberte Archipel', it: "L'Arcipelago Incantato", pt: 'O Arquipélago Encantado', ja: '魅惑の群島', zh: '迷人的群岛' },
    description: { en: 'Exclusive luxury cruises and island hopping excursions to witness wildlife found nowhere else on Earth.', es: 'Cruceros de lujo exclusivos y excursiones de isla en isla para ver vida silvestre única en la Tierra.', fr: 'Croisières de luxe exclusives...', de: 'Exklusive Luxuskreuzfahrten...', it: 'Esclusive crociere di lusso...', pt: 'Cruzeiros de luxo exclusivos...', ja: '排他的な豪華クルーズ...', zh: '专属豪华游轮...' },
    imageUrl: 'https://images.unsplash.com/photo-1526685419163-d1db7fcddc49?auto=format&fit=crop&w=800&q=80',
    toursCount: 12,
    status: 'published'
  });

  await setDoc(doc(destRef, 'peru'), {
    id: 'peru',
    name: { en: 'Mystical Peru', es: 'Perú Místico', fr: 'Pérou Mystique', de: 'Mystisches Peru', it: 'Perù Mistico', pt: 'Peru Místico', ja: '神秘的なペルー', zh: '神秘的秘鲁' },
    subtitle: { en: 'Cusco, Sacred Valley & Machu Picchu', es: 'Cusco, Valle Sagrado y Machu Picchu', fr: 'Cusco, Vallée Sacrée et Machu Picchu', de: 'Cusco, Heiliges Tal & Machu Picchu', it: 'Cusco, Valle Sacra e Machu Picchu', pt: 'Cusco, Vale Sagrado e Machu Picchu', ja: 'クスコ、聖なる谷、マチュピチュ', zh: '库斯科，神圣山谷和马丘比丘' },
    description: { en: 'Immerse yourself in Inca heritage, Andean highlands, and world-class gastronomy in South America.', es: 'Sumérgete en la herencia inca, las tierras altas andinas y la gastronomía de clase mundial.', fr: "Plongez dans l'héritage inca...", de: 'Tauchen Sie ein in das Erbe der Inka...', it: 'Immergiti nel patrimonio Inca...', pt: 'Mergulhe na herança inca...', ja: 'インカの遺産に浸る...', zh: '沉浸在印加遗产中...' },
    imageUrl: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=800&q=80',
    toursCount: 15,
    status: 'published'
  });

  console.log('Firebase Patched!');
}

patch();
