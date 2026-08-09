require('dotenv').config();
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');

const serviceAccount = require('./serviceAccountKey.json');
const parsedTours = JSON.parse(fs.readFileSync('data/parsed_tours.json', 'utf8'));

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

async function seed() {
  const batch = db.batch();
  for (const tour of parsedTours) {
    const docRef = db.collection('tours').doc(tour.id);
    batch.set(docRef, tour, { merge: true });
    console.log(`Setting tour: ${tour.id} with destination ${tour.destination}`);
  }
  await batch.commit();
  console.log('Successfully updated all tours in Firestore with new images and destinations!');
  process.exit(0);
}

seed().catch(console.error);
