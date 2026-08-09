import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import translate from 'google-translate-api-x';
// @ts-ignore
import firebaseConfigJson from '../firebase-applet-config.json' assert { type: 'json' };
import { mockDestinations, mockTours } from '../data/mock.js';

const firebaseConfig = {
  apiKey: firebaseConfigJson.apiKey,
  authDomain: firebaseConfigJson.authDomain,
  projectId: firebaseConfigJson.projectId,
  storageBucket: firebaseConfigJson.storageBucket,
  messagingSenderId: firebaseConfigJson.messagingSenderId,
  appId: firebaseConfigJson.appId,
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfigJson.firestoreDatabaseId || '(default)');

const TARGET_LANGS = ['es', 'fr', 'de', 'it', 'pt', 'ja', 'zh-CN'];
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

async function translateString(text: string, to: string, retries = 3): Promise<string> {
  if (!text) return text;
  try {
    const res = await translate(text, { to, autoCorrect: true });
    return res.text;
  } catch (err: any) {
    if (retries > 0) {
      await delay(2000);
      return translateString(text, to, retries - 1);
    }
    console.error(`Failed to translate "${text.substring(0, 20)}..." to ${to}`);
    return text;
  }
}

async function translateField(text: string): Promise<Record<string, string>> {
  const result: Record<string, string> = { en: text };
  for (const lang of TARGET_LANGS) {
    const localeKey = lang === 'zh-CN' ? 'zh' : lang;
    result[localeKey] = await translateString(text, lang);
    await delay(300); // Prevent rate limiting
  }
  return result;
}

async function processDestinations() {
  console.log('Seeding Destinations...');
  for (const dest of mockDestinations) {
    const translatedDest = {
      ...dest,
      name: await translateField(dest.name),
      subtitle: await translateField(dest.subtitle),
      description: await translateField(dest.description),
    };
    await setDoc(doc(db, 'destinations', dest.id), translatedDest);
    console.log(`Saved Destination: ${dest.id}`);
  }
}

async function processTours() {
  console.log('Seeding Tours...');
  for (const tour of mockTours) {
    const translatedTour: any = { ...tour };
    
    translatedTour.title = await translateField(tour.title);
    translatedTour.duration = await translateField(tour.duration);
    if (tour.category) translatedTour.category = await translateField(tour.category);
    if (tour.description) translatedTour.description = await translateField(tour.description);
    if (tour.shortDescription) translatedTour.shortDescription = await translateField(tour.shortDescription);
    
    if (tour.highlights) {
      translatedTour.highlights = await Promise.all(tour.highlights.map((h: string) => translateField(h)));
    }
    if (tour.inclusions) {
      translatedTour.inclusions = await Promise.all(tour.inclusions.map((i: string) => translateField(i)));
    }
    if (tour.exclusions) {
      translatedTour.exclusions = await Promise.all(tour.exclusions.map((e: string) => translateField(e)));
    }
    
    if (tour.itinerary) {
      translatedTour.itinerary = [];
      for (const day of tour.itinerary) {
        const translatedDay: any = {
          day: day.day,
          title: await translateField(day.title),
          description: await translateField(day.description),
        };
        if (day.meals) translatedDay.meals = await translateField(day.meals);
        if (day.accommodation) translatedDay.accommodation = await translateField(day.accommodation);
        translatedTour.itinerary.push(translatedDay);
      }
    }
    
    await setDoc(doc(db, 'tours', tour.id), translatedTour);
    console.log(`Saved Tour: ${tour.id}`);
  }
}

const DEFAULT_HERO_SLIDES = [
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
  }
];

async function processSettings() {
  console.log('Seeding Settings (Hero Slides)...');
  const translatedSlides = [];
  for (const slide of DEFAULT_HERO_SLIDES) {
    translatedSlides.push({
      place: await translateField(slide.place),
      title: await translateField(slide.title),
      title2: await translateField(slide.title2),
      description: await translateField(slide.description),
      image: slide.image
    });
  }
  
  await setDoc(doc(db, 'settings', 'general'), { hero: { slides: translatedSlides } }, { merge: true });
  console.log('Saved Settings');
}

async function run() {
  try {
    await processDestinations();
    await processSettings();
    await processTours();
    console.log('All multi-language data seeded to Firebase successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  }
}

run();
