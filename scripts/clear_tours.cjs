const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, deleteDoc, doc } = require('firebase/firestore');
require('dotenv').config({ path: '.env' });

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function clearTours() {
  console.log('Connecting to project:', firebaseConfig.projectId);
  const toursRef = collection(db, 'tours');
  const snapshot = await getDocs(toursRef);
  console.log(`Found ${snapshot.size} tours to delete...`);
  
  let deleted = 0;
  for (const document of snapshot.docs) {
    await deleteDoc(doc(db, 'tours', document.id));
    deleted++;
    console.log(`Deleted: ${document.id}`);
  }
  
  console.log(`Successfully deleted ${deleted} old tours.`);
  console.log('You can now click "Reseed Database" in the Admin Dashboard to reload the fresh ones!');
  process.exit(0);
}

clearTours().catch(console.error);
