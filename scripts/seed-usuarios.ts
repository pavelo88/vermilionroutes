import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import * as dotenv from 'dotenv';

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

async function seedUsuarios() {
  console.log('🚀 Iniciando creación de la colección "usuarios"...');

  const users = [
    {
      id: 'pablofgarciaf@gmail.com',
      email: 'pablofgarciaf@gmail.com',
      name: 'Pablo Fabricio García Flores',
      role: 'super',
      roles: ['super', 'admin', 'operator', 'editor'],
      authUid: 'DmwBje9JwvVJKbe5rr8ExCS823S2',
      phone: '+593983992549',
      address: 'Ecuador',
      cedula: '1721790721',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'info@vermilionroutes.com',
      email: 'info@vermilionroutes.com',
      name: 'Vermilion Routes Super Admin',
      role: 'super',
      roles: ['super', 'admin', 'operator', 'editor'],
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  for (const u of users) {
    try {
      const docRef = doc(db, 'usuarios', u.id);
      await setDoc(docRef, u, { merge: true });
      console.log(`✅ Usuario creado/actualizado con éxito: ${u.id} [rol: ${u.role}]`);
    } catch (err) {
      console.error(`❌ Error al crear usuario ${u.id}:`, err);
    }
  }

  console.log('🏁 Proceso finalizado.');
}

seedUsuarios().catch(console.error);
