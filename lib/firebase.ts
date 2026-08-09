import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

/**
 * Firebase Web SDK configuration.
 * All values are read from environment variables (defined in .env).
 * NEXT_PUBLIC_ prefix makes them available in the browser — this is intentional
 * and correct for Firebase Web SDK (these are not secret server keys).
 */
const firebaseConfig = {
  apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY            ?? '',
  authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN        ?? '',
  projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID         ?? '',
  storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET     ?? '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? '',
  appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID              ?? '',
};

const databaseId =
  process.env.NEXT_PUBLIC_FIREBASE_DATABASE_ID ?? '(default)';

const app: FirebaseApp   = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth: Auth         = getAuth(app);
const db: Firestore      = getFirestore(app, databaseId);
const storage: FirebaseStorage = getStorage(app);

export { app, auth, db, storage, firebaseConfig };
