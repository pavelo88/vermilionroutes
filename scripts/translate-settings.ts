import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, collection, getDocs } from 'firebase/firestore';
import { GoogleGenAI } from '@google/genai';
import * as dotenv from 'dotenv';
dotenv.config();

// @ts-ignore
import firebaseConfigJson from '../firebase-applet-config.json' with { type: 'json' };

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || firebaseConfigJson.apiKey,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || firebaseConfigJson.authDomain,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || firebaseConfigJson.projectId,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || firebaseConfigJson.storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || firebaseConfigJson.messagingSenderId,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || firebaseConfigJson.appId,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const TARGET_LANGS = ['es', 'fr', 'de', 'it', 'pt', 'ja', 'zh'];

async function translateDocument(docData: any, docName: string) {
  try {
    console.log(`Translating document: ${docName}...`);
    
    // We stringify the document to send it to Gemini
    const docJsonStr = JSON.stringify(docData, null, 2);
    
    const prompt = `You are an expert translator. I will provide a JSON object representing a database document.
Your task is to identify ALL text fields (like titles, names, descriptions, questions, answers, etc.) and translate them into the following languages: ${TARGET_LANGS.join(', ')}.
IMPORTANT: Leave URLs, IDs, booleans, and numbers unchanged.

For every text field you find, convert it from a simple string into an object containing the original english 'en' and all the translated languages.
Example:
"question": "What is the weather like?"
becomes:
"question": {
  "en": "What is the weather like?",
  "es": "¿Cómo es el clima?",
  "fr": "Quel temps fait-il ?",
  "de": "Wie ist das Wetter?",
  "it": "Com'è il tempo?",
  "pt": "Como está o tempo?",
  "ja": "天気はどうですか？",
  "zh": "天气怎么样？"
}

If a field is already an object with languages (e.g. {"en": "...", "es": "..."}), ensure it has all the TARGET_LANGS.

Return ONLY valid JSON. Do not include markdown blocks like \`\`\`json.
JSON:
${docJsonStr}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    let result = response.text || '{}';
    result = result.replace(/^```json/g, '').replace(/```$/g, '').trim();
    
    return JSON.parse(result);
  } catch (e) {
    console.error(`Failed to translate document ${docName}:`, e);
    return docData;
  }
}

async function run() {
  console.log('Fetching settings...');
  const settingsDocRef = doc(db, 'settings', 'general');
  const settingsSnap = await getDoc(settingsDocRef);
  
  if (settingsSnap.exists()) {
    const data = settingsSnap.data();
    const translated = await translateDocument(data, 'general');
    await setDoc(settingsDocRef, translated, { merge: true });
    console.log(`Updated settings: general`);
  }
  
  console.log('All settings translated using Gemini!');
}

run();
