const { initializeApp } = require('firebase/app');
const { getFirestore, doc, getDoc, updateDoc } = require('firebase/firestore');
const firebaseConfigJson = require('../firebase-applet-config.json');

const app = initializeApp(firebaseConfigJson);
const db = getFirestore(app, firebaseConfigJson.firestoreDatabaseId || '(default)');

const faq = [
  {
    question: { en: "Is a cruise or land-based tour better for the Galapagos?", es: "¿Es mejor un crucero o un tour terrestre para Galápagos?", fr: "Est-il préférable de faire une croisière ou un circuit terrestre aux Galápagos?", de: "Ist eine Kreuzfahrt oder eine Landtour für Galapagos besser?", it: "È meglio una crociera o un tour via terra per le Galapagos?", pt: "Um cruzeiro ou um passeio terrestre é melhor para Galápagos?", ja: "ガラパゴスにはクルーズと陸上ツアーのどちらが良いですか？", zh: "加拉帕戈斯群岛是游轮还是陆地游更好？" },
    answer: { en: "Cruises are ideal for visiting remote, uninhabited islands that are inaccessible in a day. Land-based tours are more flexible, perfect for multi-generational families, and less prone to seasickness.", es: "Los cruceros son ideales para visitar islas remotas. Los tours terrestres son más flexibles, perfectos para familias y menos propensos al mareo.", fr: "Les croisières sont idéales pour visiter des îles éloignées. Les circuits terrestres sont plus flexibles et parfaits pour les familles.", de: "Kreuzfahrten sind ideal für abgelegene Inseln. Landtouren sind flexibler und perfekt für Familien.", it: "Le crociere sono ideali per le isole remote. I tour via terra sono più flessibili e perfetti per le famiglie.", pt: "Cruzeiros são ideais para ilhas remotas. Os passeios terrestres são mais flexíveis e perfeitos para famílias.", ja: "クルーズは離島を訪れるのに最適です。陸上ツアーはより柔軟で家族向けです。", zh: "游轮非常适合游览偏远岛屿。陆地游更灵活，非常适合家庭。" }
  },
  {
    question: { en: "When is the best time to book a luxury Galapagos expedition?", es: "¿Cuándo es el mejor momento para reservar una expedición de lujo a Galápagos?", fr: "Quel est le meilleur moment pour réserver une expédition de luxe aux Galápagos?", de: "Wann ist die beste Zeit, um eine Galapagos-Luxusexpedition zu buchen?", it: "Qual è il momento migliore per prenotare una spedizione di lusso alle Galapagos?", pt: "Quando é a melhor época para reservar uma expedição de luxo para Galápagos?", ja: "ガラパゴスの豪華探検を予約するのに最適な時期はいつですか？", zh: "预订加拉帕戈斯群岛豪华探险的最佳时间是什么时候？" },
    answer: { en: "The Galapagos is a year-round destination. However, due to the limited capacity of luxury yachts (usually 12-16 passengers), we highly recommend booking at least 8 to 12 months in advance, especially for holiday seasons.", es: "Galápagos es un destino para todo el año. Sin embargo, recomendamos reservar con 8-12 meses de anticipación debido a la capacidad limitada.", fr: "Les Galápagos se visitent toute l'année. Nous recommandons de réserver 8 à 12 mois à l'avance.", de: "Galapagos ist ein ganzjähriges Reiseziel. Wir empfehlen eine Buchung 8-12 Monate im Voraus.", it: "Le Galapagos sono una destinazione per tutto l'anno. Consigliamo di prenotare 8-12 mesi in anticipo.", pt: "Galápagos é um destino para o ano todo. Recomendamos reservar com 8-12 meses de antecedência.", ja: "ガラパゴスは一年中楽しめますが、8〜12ヶ月前の予約をお勧めします。", zh: "加拉帕戈斯群岛是一个全年皆宜的目的地。我们建议提前 8-12 个月预订。" }
  },
  {
    question: { en: "What is included in a Vermilion Routes tailor-made journey?", es: "¿Qué está incluido en un viaje a medida de Vermilion Routes?", fr: "Qu'est-ce qui est inclus dans un voyage sur mesure Vermilion Routes?", de: "Was ist in einer maßgeschneiderten Reise von Vermilion Routes enthalten?", it: "Cosa è incluso in un viaggio su misura Vermilion Routes?", pt: "O que está incluído em uma viagem sob medida da Vermilion Routes?", ja: "Vermilion Routesのオーダーメイドの旅には何が含まれていますか？", zh: "Vermilion Routes 定制之旅包括什么？" },
    answer: { en: "Our bespoke journeys include all domestic flights, premium accommodations, expert private bilingual guides, private VIP ground transportation, most meals, and a dedicated 24/7 concierge specialist available via WhatsApp during your entire trip.", es: "Incluye vuelos domésticos, alojamiento premium, guías privados, transporte VIP, comidas y un concierge 24/7 por WhatsApp.", fr: "Comprend les vols intérieurs, l'hébergement premium, les guides privés, le transport VIP, les repas et un concierge 24/7.", de: "Beinhaltet Inlandsflüge, Premium-Unterkünfte, private Reiseleiter, VIP-Transport, Mahlzeiten und 24/7 Concierge.", it: "Include voli nazionali, alloggi premium, guide private, trasporto VIP, pasti e concierge 24/7.", pt: "Inclui voos domésticos, acomodação premium, guias privados, transporte VIP, refeições e concierge 24/7.", ja: "国内線、高級宿泊施設、プライベートガイド、VIP送迎、食事、24時間対応のコンシェルジュが含まれます。", zh: "包括国内航班、高级住宿、私人导游、VIP 交通、餐饮和全天候礼宾服务。" }
  }
];

async function patchSettings() {
  const settingsDocRef = doc(db, 'settings', 'general');
  const docSnap = await getDoc(settingsDocRef);
  if (docSnap.exists()) {
    await updateDoc(settingsDocRef, { faq });
    console.log('Successfully updated settings/general faq in Firebase.');
  } else {
    console.log('settings/general does not exist. App will use defaultSettings from seed.ts.');
  }
}
patchSettings().catch(console.error);
