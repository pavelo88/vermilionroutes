import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, setDoc } from 'firebase/firestore';
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

async function fixToursImages() {
  const toursRef = collection(db, 'tours');
  const snap = await getDocs(toursRef);
  let count = 0;

  for (const tourDoc of snap.docs) {
    const data = tourDoc.data();
    let modified = false;

    // Check main image
    if (typeof data.imageUrl === 'string' && data.imageUrl.includes('firebasestorage')) {
      data.imageUrl = 'https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=2752&q=80';
      modified = true;
    }

    // Check gallery
    if (Array.isArray(data.gallery)) {
      data.gallery = data.gallery.map((url: string) => {
        if (url.includes('firebasestorage')) {
          modified = true;
          return 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1600&q=80'; // fallback
        }
        return url;
      });
    }

    if (modified) {
      await setDoc(tourDoc.ref, data, { merge: true });
      console.log(`Fixed images for tour: ${tourDoc.id}`);
      count++;
    }
  }

  console.log(`Completed. Fixed ${count} tours.`);
}

fixToursImages().catch(console.error);
