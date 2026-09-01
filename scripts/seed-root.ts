import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import * as dotenv from 'dotenv';
import { generateAffiliateCode } from '../lib/affiliates';

dotenv.config({ path: '.env' });

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

async function seedRootUser() {
  const rootEmail = 'pablofgarciaf@gmail.com';
  console.log(`[SEED] Creando usuario fundador (Root): ${rootEmail}`);

  try {
    const docRef = doc(db, 'affiliates', rootEmail);
    // Note: Re-implement logic for generateAffiliateCode since this runs outside next
    const cleanName = 'Pablo Garcia'.replace(/[^a-zA-Z]/g, '').toUpperCase().slice(0, 5) || 'VR';
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const referralCode = `${cleanName}${randomSuffix}`;

    const rootAffiliate = {
      id: rootEmail,
      email: rootEmail,
      cedula: '1721790721',
      name: 'Pablo Garcia',
      phone: '',
      address: 'Ecuador',
      referralCode,
      sponsorCode: null,
      parentId: null,
      grandparentId: null,
      rama: '1',
      rank: 'Diamond',
      totalEarnings: 0,
      availableBalance: 0,
      pendingBalance: 0,
      salesCount: 0,
      isEmailVerified: true,
      createdAt: new Date().toISOString()
    };

    await setDoc(docRef, rootAffiliate);
    console.log(`[SEED] ÉXITO: Usuario Fundador creado con Rama '1' y código ${referralCode}`);
    process.exit(0);
  } catch (err) {
    console.error(`[SEED] ERROR al crear el usuario fundador:`, err);
    process.exit(1);
  }
}

seedRootUser();
