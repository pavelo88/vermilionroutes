import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore, setLogLevel } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

if (typeof window !== 'undefined') {
  try {
    setLogLevel('silent');
  } catch {
    // Ignore log level errors
  }
}

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

let app: FirebaseApp | undefined;
let auth: Auth | any;
let db: Firestore | any;
let storage: FirebaseStorage | any;

try {
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  if (firebaseConfig.apiKey) {
    auth = getAuth(app);
    db = getFirestore(app, databaseId);
    storage = getStorage(app);
  } else {
    console.warn('Firebase API Key is missing. Firebase services will not be initialized.');
  }
} catch (error) {
  console.error('Error initializing Firebase:', error);
}

export { app, auth, db, storage, firebaseConfig };
