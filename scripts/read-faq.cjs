const { initializeApp } = require('firebase/app');
const { getFirestore, doc, getDoc } = require('firebase/firestore');
const firebaseConfigJson = require('../firebase-applet-config.json');

const app = initializeApp(firebaseConfigJson);
const db = getFirestore(app, firebaseConfigJson.firestoreDatabaseId || '(default)');

async function check() {
  const settingsDoc = await getDoc(doc(db, 'settings', 'site-config'));
  const data = settingsDoc.data();
  console.log(JSON.stringify(data.faq, null, 2));
}
check();
