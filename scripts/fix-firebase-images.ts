import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
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

async function fixImages() {
  const ref = doc(db, 'settings', 'general');
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    console.log("Settings document does not exist.");
    return;
  }
  
  const data = snap.data();
  let modified = false;

  if (data.hero && Array.isArray(data.hero.slides)) {
    data.hero.slides = data.hero.slides.map((slide: any) => {
      if (typeof slide.image === 'string' && slide.image.includes('firebasestorage')) {
        console.log("Replacing broken image:", slide.image);
        slide.image = 'https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=2752&q=80';
        modified = true;
      }
      return slide;
    });
  }

  if (modified) {
    await setDoc(ref, data, { merge: true });
    console.log("Successfully fixed broken images in Firestore settings/general!");
  } else {
    console.log("No broken images found in settings/general.");
  }
}

fixImages().catch(console.error);
