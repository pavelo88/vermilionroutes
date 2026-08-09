const { initializeApp } = require('firebase/app');
const { getFirestore, doc, updateDoc, collection, getDocs, query, where } = require('firebase/firestore');
const firebaseConfigJson = require('../firebase-applet-config.json');

const app = initializeApp(firebaseConfigJson);
const db = getFirestore(app, firebaseConfigJson.firestoreDatabaseId || '(default)');

const popularTours = {
  'enchanted-islands': { // Or whatever the ID is for Enchanted Islands
    title: { 
      en: 'ENCHANTED ISLANDS SANTA FE / SANTA CRUZ',
      es: 'ISLAS ENCANTADAS SANTA FE / SANTA CRUZ',
      fr: 'ÎLES ENCHANTÉES SANTA FE / SANTA CRUZ',
      de: 'BEZAUBERNDE INSELN SANTA FE / SANTA CRUZ',
      it: 'ISOLE INCANTATE SANTA FE / SANTA CRUZ',
      pt: 'ILHAS ENCANTADAS SANTA FE / SANTA CRUZ',
      ja: '魔法の島々 サンタフェ / サンタクルス',
      zh: '迷人岛屿 圣菲 / 圣克鲁斯'
    },
    duration: { en: '7 DAYS / 6 NIGHTS', es: '7 DÍAS / 6 NOCHES', fr: '7 JOURS / 6 NUITS', de: '7 TAGE / 6 NÄCHTE', it: '7 GIORNI / 6 NOTTI', pt: '7 DIAS / 6 NOITES', ja: '7日間 / 6泊', zh: '7天 / 6晚' },
    category: { en: 'PRIVATE EXPEDITION', es: 'EXPEDICIÓN PRIVADA', fr: 'EXPÉDITION PRIVÉE', de: 'PRIVATE EXPEDITION', it: 'SPEDIZIONE PRIVATA', pt: 'EXPEDIÇÃO PRIVADA', ja: 'プライベート探検', zh: '私人探险' },
    highlights: [
      { en: 'La Loberia', es: 'La Lobería', fr: 'La Loberia', de: 'La Loberia', it: 'La Loberia', pt: 'La Loberia', ja: 'ラ・ロベリア', zh: '拉罗贝里亚' },
      { en: 'Scientific Station', es: 'Estación Científica', fr: 'Station Scientifique', de: 'Wissenschaftsstation', it: 'Stazione Scientifica', pt: 'Estação Científica', ja: '科学ステーション', zh: '科学站' },
      { en: 'Grietas', es: 'Las Grietas', fr: 'Las Grietas', de: 'Las Grietas', it: 'Las Grietas', pt: 'Las Grietas', ja: 'ラス・グリエタス', zh: '裂缝' }
    ]
  },
  'fantastic-ecuador': {
    title: { 
      en: 'FANTASTIC ECUADOR',
      es: 'ECUADOR FANTÁSTICO',
      fr: 'ÉQUATEUR FANTASTIQUE',
      de: 'FANTASTISCHES ECUADOR',
      it: 'ECUADOR FANTASTICO',
      pt: 'EQUADOR FANTÁSTICO',
      ja: '素晴らしいエクアドル',
      zh: '美妙的厄瓜多尔'
    },
    duration: { en: '8 DAYS / 7 NIGHTS', es: '8 DÍAS / 7 NOCHES', fr: '8 JOURS / 7 NUITS', de: '8 TAGE / 7 NÄCHTE', it: '8 GIORNI / 7 NOTTI', pt: '8 DIAS / 7 NOITES', ja: '8日間 / 7泊', zh: '8天 / 7晚' },
    category: { en: 'PRIVATE EXPEDITION', es: 'EXPEDICIÓN PRIVADA', fr: 'EXPÉDITION PRIVÉE', de: 'PRIVATE EXPEDITION', it: 'SPEDIZIONE PRIVATA', pt: 'EXPEDIÇÃO PRIVADA', ja: 'プライベート探検', zh: '私人探险' },
    highlights: [
      { en: 'Otavalo Market', es: 'Mercado de Otavalo', fr: "Marché d'Otavalo", de: 'Otavalo Markt', it: 'Mercato di Otavalo', pt: 'Mercado de Otavalo', ja: 'オタバロ市場', zh: '奥塔瓦洛市场' },
      { en: 'Middle of the World', es: 'Mitad del Mundo', fr: 'Milieu du Monde', de: 'Mitte der Welt', it: 'Metà del Mondo', pt: 'Metade do Mundo', ja: '赤道記念碑', zh: '世界之半' },
      { en: 'Cotopaxi Route of Volcanoes', es: 'Ruta de los Volcanes Cotopaxi', fr: 'Route des Volcans Cotopaxi', de: 'Cotopaxi Vulkanroute', it: 'Via dei Vulcani Cotopaxi', pt: 'Rota dos Vulcões Cotopaxi', ja: 'コトパクシ火山ルート', zh: '科托帕希火山路线' }
    ]
  },
  'full-galapagos-3-islands': {
    title: { 
      en: 'FULL GALÁPAGOS SAN CRISTOBAL / SANTA CRUZ',
      es: 'GALÁPAGOS COMPLETO SAN CRISTOBAL / SANTA CRUZ',
      fr: 'GALÁPAGOS COMPLET SAN CRISTOBAL / SANTA CRUZ',
      de: 'VOLLES GALÁPAGOS SAN CRISTOBAL / SANTA CRUZ',
      it: 'GALÁPAGOS COMPLETO SAN CRISTOBAL / SANTA CRUZ',
      pt: 'GALÁPAGOS COMPLETO SAN CRISTOBAL / SANTA CRUZ',
      ja: 'フルガラパゴス サンクリストバル / サンタクルス',
      zh: '全加拉帕戈斯 圣克里斯托瓦尔 / 圣克鲁斯'
    },
    duration: { en: '9 DAYS/ 8 NIGHTS', es: '9 DÍAS / 8 NOCHES', fr: '9 JOURS / 8 NUITS', de: '9 TAGE / 8 NÄCHTE', it: '9 GIORNI / 8 NOTTI', pt: '9 DIAS / 8 NOITES', ja: '9日間 / 8泊', zh: '9天 / 8晚' },
    category: { en: 'PRIVATE EXPEDITION', es: 'EXPEDICIÓN PRIVADA', fr: 'EXPÉDITION PRIVÉE', de: 'PRIVATE EXPEDITION', it: 'SPEDIZIONE PRIVATA', pt: 'EXPEDIÇÃO PRIVADA', ja: 'プライベート探検', zh: '私人探险' },
    highlights: [
      { en: 'Bahia Tour', es: 'Tour de Bahía', fr: 'Tour de la Baie', de: 'Bucht-Tour', it: 'Tour della Baia', pt: 'Tour da Baía', ja: 'ベイツアー', zh: '海湾游' },
      { en: 'Tintoreras', es: 'Tintoreras', fr: 'Tintoreras', de: 'Tintoreras', it: 'Tintoreras', pt: 'Tintoreras', ja: 'ティントレラス', zh: '白鳍鲨礁' },
      { en: 'Galapaguera', es: 'Galapaguera', fr: 'Galapaguera', de: 'Galapaguera', it: 'Galapaguera', pt: 'Galapaguera', ja: 'ガラパゲラ', zh: '巨龟保护区' }
    ]
  }
};

async function patchTours() {
  const toursRef = collection(db, 'tours');
  const q = query(toursRef, where('isPopular', '==', true));
  const snap = await getDocs(q);
  
  for (const tourDoc of snap.docs) {
    console.log(`Checking popular tour: ${tourDoc.id}`);
    
    // Check if we have hardcoded translations for this ID
    let updates = popularTours[tourDoc.id];
    
    // If ID doesn't match perfectly but we know it's Enchanted Islands
    if (!updates && tourDoc.data().title.includes('ENCHANTED ISLANDS')) {
      updates = popularTours['enchanted-islands'];
    } else if (!updates && tourDoc.data().title.includes('FULL GALÁPAGOS')) {
      updates = popularTours['full-galapagos-3-islands'];
    }
    
    if (updates) {
      console.log(`Updating ${tourDoc.id} with translations...`);
      await updateDoc(doc(db, 'tours', tourDoc.id), updates);
    }
  }
  console.log('Finished updating popular tours.');
}
patchTours().catch(console.error);
