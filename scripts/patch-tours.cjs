const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc, updateDoc } = require('firebase/firestore');
const firebaseConfigJson = require('../firebase-applet-config.json');

const app = initializeApp(firebaseConfigJson);
const db = getFirestore(app, firebaseConfigJson.firestoreDatabaseId || '(default)');

async function patch() {
  const toursRef = collection(db, 'tours');
  
  const updates = [
    {
      id: 'andes-amazon-jungle-galapagos',
      title: { en: 'FULL GALAPAGOS', es: 'GALÁPAGOS COMPLETO', fr: 'GALAPAGOS COMPLET', de: 'KOMPLETTES GALAPAGOS', it: 'GALAPAGOS COMPLETO', pt: 'GALÁPAGOS COMPLETO', ja: 'ガラパゴス全域', zh: '全加拉帕戈斯' },
      category: { en: 'Private Expedition', es: 'Expedición Privada', fr: 'Expédition Privée', de: 'Private Expedition', it: 'Spedizione Privata', pt: 'Expedição Privada', ja: 'プライベート探検', zh: '私人探险' }
    },
    {
      id: 'fantastic-ecuador',
      title: { en: 'FANTASTIC ECUADOR', es: 'ECUADOR FANTÁSTICO', fr: 'ÉQUATEUR FANTASTIQUE', de: 'FANTASTISCHES ECUADOR', it: 'ECUADOR FANTASTICO', pt: 'EQUADOR FANTÁSTICO', ja: '素晴らしいエクアドル', zh: '奇妙的厄瓜多尔' },
      category: { en: 'Private Expedition', es: 'Expedición Privada', fr: 'Expédition Privée', de: 'Private Expedition', it: 'Spedizione Privata', pt: 'Expedição Privada', ja: 'プライベート探検', zh: '私人探险' }
    },
    {
      id: 'galapagos-island-hopping',
      title: { en: 'ENCHANTED ISLANDS', es: 'ISLAS ENCANTADAS', fr: 'ÎLES ENCHANTÉES', de: 'VERZAUBERTE INSELN', it: 'ISOLE INCANTATE', pt: 'ILHAS ENCANTADAS', ja: '魅惑の島々', zh: '迷人岛屿' },
      category: { en: 'Private Expedition', es: 'Expedición Privada', fr: 'Expédition Privée', de: 'Private Expedition', it: 'Spedizione Privata', pt: 'Expedição Privada', ja: 'プライベート探検', zh: '私人探险' }
    },
    {
      id: 'cusco-inca-trail-machu-picchu',
      title: { en: 'MYSTICAL CUSCO', es: 'CUSCO MÍSTICO', fr: 'CUSCO MYSTIQUE', de: 'MYSTISCHES CUSCO', it: 'CUSCO MISTICO', pt: 'CUSCO MÍSTICO', ja: '神秘的なクスコ', zh: '神秘的库斯科' },
      category: { en: 'Private Expedition', es: 'Expedición Privada', fr: 'Expédition Privée', de: 'Private Expedition', it: 'Spedizione Privata', pt: 'Expedição Privada', ja: 'プライベート探検', zh: '私人探险' }
    }
  ];

  for (const t of updates) {
    try {
      await updateDoc(doc(toursRef, t.id), {
        title: t.title,
        category: t.category
      });
      console.log('Updated ' + t.id);
    } catch(e) {
      console.log('Skipped ' + t.id);
    }
  }
}
patch();
