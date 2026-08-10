import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import * as dotenv from 'dotenv';

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const slides = [
  {
    place: { en: 'Guayas - Guayaquil', es: 'Guayas - Guayaquil', zh: '瓜亚斯 - 瓜亚基尔' },
    title: { en: 'TROPICAL', es: 'PUERTO', zh: '热带' },
    title2: { en: 'PORT', es: 'TROPICAL', zh: '港口' },
    description: { 
      en: 'The economic heartbeat of Ecuador. Stroll the vibrant Malecón 2000, explore the colorful hillside neighborhood of Las Peñas, and feel the warm, energetic spirit of the Pacific coast.', 
      es: 'El corazón económico de Ecuador. Pasea por el vibrante Malecón 2000, explora el colorido barrio en la ladera de Las Peñas y siente el cálido y enérgico espíritu de la costa del Pacífico.', 
      zh: '厄瓜多尔的经济命脉。漫步在充满活力的2000年海滨大道，探索色彩斑斓的拉斯佩尼亚斯山腰社区，感受太平洋海岸温暖而充满活力的精神。' 
    },
    image: 'https://images.unsplash.com/photo-1596423735880-5c6be368a1d2?auto=format&fit=crop&w=2752&q=80'
  },
  {
    place: { en: 'Cusco - Peru', es: 'Cusco - Perú', zh: '库斯科 - 秘鲁' },
    title: { en: 'SACRED', es: 'VALLE', zh: '神圣' },
    title2: { en: 'VALLEY', es: 'SAGRADO', zh: '山谷' },
    description: { 
      en: 'The heart of the Inca Empire. Discover ancient agricultural terraces, majestic ruins, and vibrant indigenous markets set against the stunning backdrop of the Andes mountains.', 
      es: 'El corazón del Imperio Inca. Descubre antiguas terrazas agrícolas, ruinas majestuosas y vibrantes mercados indígenas con el impresionante telón de fondo de la cordillera de los Andes.', 
      zh: '印加帝国的心脏。在雄伟的安第斯山脉背景下，探索古老的农业梯田、宏伟的废墟和充满活力的原住民市场。' 
    },
    image: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=2752&q=80'
  },
  {
    place: { en: 'Galapagos - Archipelago', es: 'Galápagos - Archipiélago', zh: '加拉帕戈斯 - 群岛' },
    title: { en: 'SHARK', es: 'ENCUENTRO', zh: '鲨鱼' },
    title2: { en: 'ENCOUNTER', es: 'CON TIBURONES', zh: '邂逅' },
    description: { 
      en: 'Dive into the pristine waters of the Galapagos Marine Reserve. Swim alongside hammerhead sharks, playful sea lions, and marine iguanas in one of the planet\'s most protected and spectacular underwater realms.', 
      es: 'Sumérgete en las aguas prístinas de la Reserva Marina de Galápagos. Nada junto a tiburones martillo, juguetones leones marinos e iguanas marinas en uno de los reinos submarinos más protegidos y espectaculares del planeta.', 
      zh: '潜入加拉帕戈斯海洋保护区清澈的海水中。在地球上受保护最严密、最壮观的水下世界之一，与双髻鲨、调皮的海狮和海鬣蜥一起游泳。' 
    },
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=2752&q=80'
  },
  {
    place: { en: 'Pichincha - Quito', es: 'Pichincha - Quito', zh: '皮钦查 - 基多' },
    title: { en: 'HISTORIC', es: 'CENTRO', zh: '历史' },
    title2: { en: 'CENTER', es: 'HISTÓRICO', zh: '中心' },
    description: { 
      en: 'The first World Cultural Heritage site. Cobblestone streets, colonial monasteries, and baroque cathedrals perched at 2,800 meters under the monumental shadow of the high Andes.', 
      es: 'El primer sitio de Patrimonio Cultural de la Humanidad. Calles empedradas, monasterios coloniales y catedrales barrocas situadas a 2.800 metros bajo la sombra monumental de los altos Andes.', 
      zh: '首个世界文化遗产地。海拔2800米，在雄伟的安第斯山脉的巨大阴影下，鹅卵石街道、殖民时期的修道院和巴洛克式大教堂错落有致。' 
    },
    image: 'https://media.istockphoto.com/id/692499466/photo/plaza-de-san-francisco-and-st-francis-church-quito-ecuador.jpg?s=1024x1024&w=is&k=20&c=IqO_UCVWPbOwteF3cY7fggiUZD2z391V3kufWNgEhkg='
  }
];

async function updateSettings() {
  await setDoc(doc(db, 'settings', 'general'), { hero: { slides } }, { merge: true });
  console.log('Successfully updated settings/general with localized hero slides!');
}

updateSettings().catch(console.error);
