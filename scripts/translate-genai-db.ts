import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { GoogleGenAI } from '@google/genai';
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

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const TARGET_LANGS = ['es', 'fr', 'de', 'it', 'pt', 'ja', 'zh'];

async function translateDocument(docData: any, docName: string): Promise<any> {
  console.log(`Translating document: ${docName}...`);
  const prompt = `You are a professional travel translator. I have a JSON document representing a travel tour or destination.
Right now, the text fields might be strings in English, OR objects with {en, es, zh}.
Your task is to convert EVERY translatable text field (like title, description, name, subtitle, highlights, inclusions, itinerary titles/descriptions/meals) into a localized object containing ALL 8 languages:
{ "en": "...", "es": "...", "fr": "...", "de": "...", "it": "...", "pt": "...", "ja": "...", "zh": "..." }

Do NOT translate IDs, image URLs, slugs, or numeric values. Only translate descriptive text.
Return ONLY valid JSON. No markdown blocks. No explanations.

Original Document:
${JSON.stringify(docData, null, 2)}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    let result = response.text || '{}';
    result = result.replace(/^```json/g, '').replace(/```$/g, '').trim();
    const translatedDoc = JSON.parse(result);
    return translatedDoc;
  } catch (e) {
    console.error(`Failed to translate document ${docName}:`, e);
    return docData; // return original if fail
  }
}

async function run() {
  console.log('Fetching destinations...');
  const destSnap = await getDocs(collection(db, 'destinations'));
  for (const d of destSnap.docs) {
    const data = d.data();
    // If it's already translated to 'it', skip it
    if (data.name && typeof data.name === 'object' && data.name.it) {
      console.log(`Skipping destination ${data.id}, already translated.`);
      continue;
    }
    const translated = await translateDocument(data, data.id);
    await setDoc(doc(db, 'destinations', data.id), translated, { merge: true });
    console.log(`Updated destination: ${data.id}`);
  }

  console.log('Fetching tours...');
  const toursSnap = await getDocs(collection(db, 'tours'));
  for (const t of toursSnap.docs) {
    const data = t.data();
    if (data.title && typeof data.title === 'object' && data.title.it) {
      console.log(`Skipping tour ${data.id}, already translated.`);
      continue;
    }
    const translated = await translateDocument(data, data.id);
    await setDoc(doc(db, 'tours', data.id), translated, { merge: true });
    console.log(`Updated tour: ${data.id}`);
  }

  console.log('All database data translated using Gemini!');
}

run().catch(console.error);
