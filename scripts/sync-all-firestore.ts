import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, setDoc, deleteDoc, writeBatch } from 'firebase/firestore';
import { mockTours, mockDestinations, mockReviews } from '../data/mock';
import { dailyTours } from '../data/dailyToursData';
import fs from 'fs';
import path from 'path';

// Load .env
import dotenv from 'dotenv';
dotenv.config();

const configs = [];

// Config 1: From .env
if (process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
  configs.push({
    name: 'Env Config (' + process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID + ')',
    config: {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    },
    databaseId: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_ID || '(default)'
  });
}

// Config 2: From firebase-applet-config.json if exists
try {
  const appletPath = path.resolve('firebase-applet-config.json');
  if (fs.existsSync(appletPath)) {
    const json = JSON.parse(fs.readFileSync(appletPath, 'utf8'));
    configs.push({
      name: 'Applet Config (' + json.projectId + ')',
      config: {
        apiKey: json.apiKey,
        authDomain: json.authDomain,
        projectId: json.projectId,
        storageBucket: json.storageBucket,
        messagingSenderId: json.messagingSenderId,
        appId: json.appId,
      },
      databaseId: json.firestoreDatabaseId || '(default)'
    });
  }
} catch (e) {
  console.warn('Could not load firebase-applet-config.json', e.message);
}

const allTours = [...mockTours];

async function syncTarget(target) {
  console.log(`\n========================================`);
  console.log(`🎯 Syncing Target: ${target.name}`);
  console.log(`   Database ID: ${target.databaseId}`);
  console.log(`========================================`);

  const appName = 'app_' + Math.random().toString(36).substring(7);
  const app = initializeApp(target.config, appName);
  const db = getFirestore(app, target.databaseId);

  const toursRef = collection(db, 'tours');
  
  try {
    const existingSnap = await getDocs(toursRef);
    console.log(`Found ${existingSnap.size} existing tour docs in Firestore.`);
    
    // Valid IDs that belong to the new official tours
    const validIds = new Set(allTours.map(t => t.id));

    // Delete obsolete / dirty docs (e.g. Peru tours, old IDs)
    let deletedCount = 0;
    for (const docSnap of existingSnap.docs) {
      if (!validIds.has(docSnap.id)) {
        await deleteDoc(doc(db, 'tours', docSnap.id));
        console.log(`🗑️  Deleted legacy/obsolete doc: ${docSnap.id}`);
        deletedCount++;
      }
    }
    console.log(`Purged ${deletedCount} obsolete documents.`);

    // Write all official tours with complete texts
    let savedCount = 0;
    for (const tour of allTours) {
      await setDoc(doc(db, 'tours', tour.id), tour, { merge: false });
      console.log(`✅ Saved tour: ${tour.id} (${tour.durationDays}d - $${tour.price})`);
      savedCount++;
    }

    // Delete legacy Peru destination if present
    try {
      await deleteDoc(doc(db, 'destinations', 'peru'));
      await deleteDoc(doc(db, 'destinations', 'peru-místico'));
      await deleteDoc(doc(db, 'destinations', 'mystical-peru'));
      console.log('🗑️  Cleaned up Peru destination docs if any existed.');
    } catch {}

    // Update destinations
    for (const dest of mockDestinations) {
      await setDoc(doc(db, 'destinations', dest.id), dest, { merge: true });
      console.log(`📍 Saved destination: ${dest.id}`);
    }

    console.log(`✨ Successfully updated ${savedCount} tours in ${target.name}!`);
  } catch (err) {
    console.error(`❌ Error updating target ${target.name}:`, err.message);
  }
}

async function main() {
  console.log(`Starting Firestore sync for ${configs.length} targets with ${allTours.length} tours...`);
  for (const target of configs) {
    await syncTarget(target);
  }
  console.log('\n🎉 ALL TARGETS PROCESSED SUCCESSFULLY!\n');
  process.exit(0);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
