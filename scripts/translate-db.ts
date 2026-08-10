import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, setDoc } from 'firebase/firestore';
import translate from 'google-translate-api-x';
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

const TARGET_LANGS = ['es', 'fr', 'de', 'it', 'pt', 'ja', 'zh-CN'];

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function translateToAll(text: string | any) {
  if (!text) return text;
  if (typeof text === 'object' && text.en) return text; // already translated
  if (typeof text !== 'string') return text;

  const result: any = { en: text };
  for (const lang of TARGET_LANGS) {
    try {
      await sleep(1000);
      const res = await translate(text, { to: lang });
      const localeKey = lang === 'zh-CN' ? 'zh' : lang;
      result[localeKey] = res.text;
    } catch (e) {
      console.error(`Failed to translate to ${lang}:`, e);
      result[lang === 'zh-CN' ? 'zh' : lang] = text;
    }
  }
  return result;
}

async function translateArray(arr: any[]) {
  if (!arr) return arr;
  const newArr = [];
  for (const item of arr) {
    if (typeof item === 'string') {
      newArr.push(await translateToAll(item));
    } else {
      newArr.push(item);
    }
  }
  return newArr;
}

async function run() {
  console.log('Fetching destinations...');
  const destSnap = await getDocs(collection(db, 'destinations'));
  for (const d of destSnap.docs) {
    const data = d.data();
    console.log(`Translating destination: ${data.id}...`);
    data.name = await translateToAll(data.name);
    data.subtitle = await translateToAll(data.subtitle);
    data.description = await translateToAll(data.description);
    
    await setDoc(doc(db, 'destinations', data.id), data, { merge: true });
    console.log(`Updated destination: ${data.id}`);
  }

  console.log('Fetching tours...');
  const toursSnap = await getDocs(collection(db, 'tours'));
  for (const t of toursSnap.docs) {
    const data = t.data();
    console.log(`Translating tour: ${data.id}...`);
    data.title = await translateToAll(data.title);
    data.destination = await translateToAll(data.destination);
    data.duration = await translateToAll(data.duration);
    data.category = await translateToAll(data.category);
    data.description = await translateToAll(data.description);
    
    if (data.highlights) data.highlights = await translateArray(data.highlights);
    if (data.inclusions) data.inclusions = await translateArray(data.inclusions);
    if (data.exclusions) data.exclusions = await translateArray(data.exclusions);
    
    if (data.itinerary) {
      for (const day of data.itinerary) {
        day.title = await translateToAll(day.title);
        day.description = await translateToAll(day.description);
        if (day.meals) day.meals = await translateToAll(day.meals);
      }
    }
    
    await setDoc(doc(db, 'tours', data.id), data, { merge: true });
    console.log(`Updated tour: ${data.id}`);
  }

  console.log('All database data translated successfully!');
  process.exit(0);
}

run().catch(console.error);
