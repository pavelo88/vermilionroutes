const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');
const firebaseConfigJson = require('../firebase-applet-config.json');

const app = initializeApp(firebaseConfigJson);
const db = getFirestore(app, firebaseConfigJson.firestoreDatabaseId || '(default)');

async function check() {
  const q = collection(db, 'tours');
  const snap = await getDocs(q);
  snap.forEach(d => {
    console.log(d.id, d.data().title.en || d.data().title);
  });
}
check();
