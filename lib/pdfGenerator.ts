import { jsPDF } from 'jspdf';
import { Tour } from '@/types';
import { getLocalizedText } from '@/utils/i18nHelper';
import { mockTours } from '@/data/mock';
import { dailyTours } from '@/data/dailyToursData';

const PDF_TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    itineraryTitle: "Official Itinerary & Travel Guide 2026",
    duration: "Duration",
    destination: "Destination",
    category: "Category",
    pricing: "Pricing Options per Person",
    hotel3star: "3* Comfort Hotels",
    hotel4star: "4* Luxury / Premium Hotels",
    fixedPrice: "Official Rate per Person (Private Tour)",
    fixedPriceSub: "Includes Private Transportation & Bilingual Guide (Spanish / English)",
    dayByDay: "Day-by-Day Detailed Itinerary",
    highlights: "Key Tour Highlights",
    day: "Day",
    meals: "Meals",
    accommodation: "Accommodation",
    transport: "Transport",
    activity: "Activity",
    durationLabel: "Duration",
    inclusions: "Program Includes",
    exclusions: "Program Does Not Include",
    importantNotes: "Important Travel Notes",
    footerText: "Vermilion South American Routes • Certified Tour Operator • Quito, Ecuador",
    downloadBtnText: "Download Itinerary",
    generatingMsg: "Generating your magazine-style PDF...",
    galapagosChapterTitle: "CHAPTER II: GALAPAGOS ISLANDS — MARINE EXPEDITION",
    andesChapterTitle: "CHAPTER I: ANDES & AMAZON REGION",
    conciergeTitle: "24/7 WHATSAPP CONCIERGE & CUSTOM BOOKING",
    conciergeDesc: "Contact +593 994 048 458 to customize your dates, hotel upgrades, or private naturalist guides.",
    gallerySectionTitle: "VISUAL APPENDIX — FEATURED DESTINATIONS & LANDMARKS"
  },
  es: {
    itineraryTitle: "Itinerario Oficial y Guía de Viaje 2026",
    duration: "Duración",
    destination: "Destino",
    category: "Categoría",
    pricing: "Opciones de Tarifa por Persona",
    hotel3star: "Hoteles 3* Confort",
    hotel4star: "Hoteles 4* Lujo / Premium",
    fixedPrice: "Tarifa Oficial por Persona (Tour Privado)",
    fixedPriceSub: "Incluye Transporte Privado y Guía Bilingüe Certificado (Español / Inglés)",
    dayByDay: "Itinerario Detallado Día por Día",
    highlights: "Puntos Destacados del Tour",
    day: "Día",
    meals: "Comidas",
    accommodation: "Hospedaje",
    transport: "Transporte",
    activity: "Actividad",
    durationLabel: "Duración",
    inclusions: "El Programa Incluye",
    exclusions: "El Programa No Incluye",
    importantNotes: "Notas Importantes de Viaje",
    footerText: "Vermilion South American Routes • Operador Turístico Certificado • Quito, Ecuador",
    downloadBtnText: "Descargar Itinerario",
    generatingMsg: "Generando tu PDF de revista...",
    galapagosChapterTitle: "CAPÍTULO II: ISLAS GALÁPAGOS — EXPEDICIÓN MARINA",
    andesChapterTitle: "CAPÍTULO I: REGIÓN ANDINA Y AMAZONÍA",
    conciergeTitle: "CONCIERGE 24/7 WHATSAPP Y RESERVAS PERSONALIZADAS",
    conciergeDesc: "Escribe a +593 994 048 458 para personalizar fechas, mejorar hoteles o solicitar guías privados.",
    gallerySectionTitle: "ANEXO FOTOGRÁFICO — DESTINOS Y LUGARES DESTACADOS"
  },
  fr: {
    itineraryTitle: "Itinéraire Officiel & Guide de Voyage 2026",
    duration: "Durée",
    destination: "Destination",
    category: "Catégorie",
    pricing: "Tarifs par Personne",
    hotel3star: "Hôtels 3* Confort",
    hotel4star: "Hôtels 4* Luxe",
    fixedPrice: "Tarif par Personne (Tour Privé)",
    fixedPriceSub: "Comprend transport privé et guide bilingue certifié",
    dayByDay: "Itinéraire Détaillé Jour par Jour",
    highlights: "Points Forts du Circuit",
    day: "Jour",
    meals: "Repas",
    accommodation: "Hébergement",
    transport: "Transport",
    activity: "Activité",
    durationLabel: "Durée",
    inclusions: "Le Programme Comprend",
    exclusions: "Le Programme Ne Comprend Pas",
    importantNotes: "Remarques Importantes",
    footerText: "Vermilion South American Routes • Voyagiste Certifié • Quito, Équateur",
    downloadBtnText: "Télécharger Itinéraire",
    generatingMsg: "Génération de votre PDF...",
    galapagosChapterTitle: "CHAPITRE II: ÎLES GALAPAGOS — EXPÉDITION MARINE",
    andesChapterTitle: "CHAPITRE I: RÉGION DES ANDES ET AMAZONIE",
    conciergeTitle: "CONCIERGE 24/7 WHATSAPP & RÉSERVATIONS SUR MESURE",
    conciergeDesc: "Contactez le +593 994 048 458 pour personnaliser vos dates ou hébergements.",
    gallerySectionTitle: "ANNEXE VISUELLE — DESTINATIONS ET SITES EMBLÉMATIQUES"
  },
  de: {
    itineraryTitle: "Offizieller Reiseplan & Reiseführer 2026",
    duration: "Dauer",
    destination: "Reiseziel",
    category: "Kategorie",
    pricing: "Preise pro Person",
    hotel3star: "3* Komfort Hotels",
    hotel4star: "4* Luxus Hotels",
    fixedPrice: "Offizieller Preis pro Person (Private Tour)",
    fixedPriceSub: "Inklusive privatem Transport und zweisprachigem Reiseleiter",
    dayByDay: "Detaillierter Tagesablauf",
    highlights: "Höhepunkte der Tour",
    day: "Tag",
    meals: "Mahlzeiten",
    accommodation: "Unterkunft",
    transport: "Transport",
    activity: "Aktivität",
    durationLabel: "Dauer",
    inclusions: "Im Preis Enthalten",
    exclusions: "Nicht Enthalten",
    importantNotes: "Wichtige Hinweise",
    footerText: "Vermilion South American Routes • Zertifizierter Reiseveranstalter • Quito, Ecuador",
    downloadBtnText: "Reiseplan Herunterladen",
    generatingMsg: "PDF wird erstellt...",
    galapagosChapterTitle: "KAPITEL II: GALAPAGOS-INSELN — MEERESEXPEDITION",
    andesChapterTitle: "KAPITEL I: ANDEN & AMAZONAS-REGION",
    conciergeTitle: "24/7 WHATSAPP CONCIERGE & INDIVIDUELLE BUCHUNG",
    conciergeDesc: "Schreiben Sie an +593 994 048 458 für maßgeschneiderte Daten und Hotels.",
    gallerySectionTitle: "BILDANHANG — AUSGEWÄHLTE REISEZIELE & HÖHEPUNKTE"
  },
  it: {
    itineraryTitle: "Itinerario Ufficiale e Guida 2026",
    duration: "Durata",
    destination: "Destinazione",
    category: "Categoria",
    pricing: "Prezzi per Persona",
    hotel3star: "Hotel 3* Comfort",
    hotel4star: "Hotel 4* Lusso",
    fixedPrice: "Tariffa per Persona (Tour Privato)",
    fixedPriceSub: "Include trasporto privato e guida bilingue certificata",
    dayByDay: "Itinerario Dettagliato Giorno per Giorno",
    highlights: "Punti Salienti del Tour",
    day: "Giorno",
    meals: "Pasti",
    accommodation: "Alloggio",
    transport: "Trasporto",
    activity: "Attività",
    durationLabel: "Durata",
    inclusions: "Il Programma Include",
    exclusions: "Il Programma Non Include",
    importantNotes: "Note Importanti",
    footerText: "Vermilion South American Routes • Tour Operator Certificato • Quito, Ecuador",
    downloadBtnText: "Scarica Itinerario",
    generatingMsg: "Generazione del PDF...",
    galapagosChapterTitle: "CAPITOLO II: ISOLE GALAPAGOS — SPEDIZIONE MARINA",
    andesChapterTitle: "CAPITOLO I: REGIONE DELLE ANDE E AMMAZZONIA",
    conciergeTitle: "CONCIERGE 24/7 WHATSAPP E PRENOTAZIONI SU MISURA",
    conciergeDesc: "Contatta +593 994 048 458 per personalizzare date, hotel o guide private.",
    gallerySectionTitle: "APPENDICE VISIVA — DESTINAZIONI E LUOGHI DI RILIEVO"
  },
  pt: {
    itineraryTitle: "Itinerário Oficial e Guia de Viagem 2026",
    duration: "Duração",
    destination: "Destino",
    category: "Categoria",
    pricing: "Opções de Tarifa por Persona",
    hotel3star: "Hotéis 3* Conforto",
    hotel4star: "Hotéis 4* Luxo",
    fixedPrice: "Tarifa Oficial por Pessoa (Tour Privado)",
    fixedPriceSub: "Inclui transporte privado e guia bilíngue certificado",
    dayByDay: "Itinerário Detalhado Dia a Dia",
    highlights: "Destaques do Roteiro",
    day: "Dia",
    meals: "Refeições",
    accommodation: "Hospedagem",
    transport: "Transporte",
    activity: "Atividade",
    durationLabel: "Duração",
    inclusions: "O Programa Inclui",
    exclusions: "O Programa Não Inclui",
    importantNotes: "Notas Importantes",
    footerText: "Vermilion South American Routes • Operador Turístico Certificado • Quito, Equador",
    downloadBtnText: "Baixar Itinerário",
    generatingMsg: "Gerando seu PDF...",
    galapagosChapterTitle: "CAPÍTULO II: ILHAS GALÁPAGOS — EXPEDIÇÃO MARÍTIMA",
    andesChapterTitle: "CAPÍTULO I: REGIÃO DOS ANDES E AMAZÔNIA",
    conciergeTitle: "CONCIERGE 24/7 WHATSAPP E RESERVAS PERSONALIZADAS",
    conciergeDesc: "Fale com +593 994 048 458 para personalizar suas datas ou hotéis.",
    gallerySectionTitle: "ANEXO VISUAL — DESTINOS E LOCAIS EM DESTAQUE"
  },
  ja: {
    itineraryTitle: "公式旅程＆旅行ガイド 2026",
    duration: "期間",
    destination: "目的地",
    category: "カテゴリー",
    pricing: "1人あたりの料金オプション",
    hotel3star: "3*コンフォートホテル",
    hotel4star: "4*ラグジュアリーホテル",
    fixedPrice: "公式料金 (1名様あたり / プライベートツアー)",
    fixedPriceSub: "専用車送迎および公認バイリンガルガイド付き",
    dayByDay: "日別の詳細旅程",
    highlights: "ツアーのハイライト",
    day: "日目",
    meals: "食事",
    accommodation: "宿泊",
    transport: "送迎・移動",
    activity: "アクティビティ",
    durationLabel: "所要時間",
    inclusions: "ツアーに含まれるもの",
    exclusions: "ツアーに含まれないもの",
    importantNotes: "注意事項",
    footerText: "Vermilion South American Routes • 認定旅行会社 • エクアドル・キト",
    downloadBtnText: "旅程をダウンロード",
    generatingMsg: "PDFを作成中...",
    galapagosChapterTitle: "第2章: ガラパゴス諸島 — 海洋探検",
    andesChapterTitle: "第1章: アンデス＆アマゾン地域",
    conciergeTitle: "24時間対応WHATSAPPコンシェルジュ＆カスタム予約",
    conciergeDesc: "+593 994 048 458 まで日程や宿泊先のアップグレードをご相談ください。",
    gallerySectionTitle: "ビジュアル付録 — 注目の目的地＆名所ギャラリー"
  },
  zh: {
    itineraryTitle: "官方行程与旅行指南 2026",
    duration: "行程时长",
    destination: "目的地",
    category: "线路类别",
    pricing: "每人价格选项",
    hotel3star: "3* 舒适型酒店",
    hotel4star: "4* 豪华/尊享型酒店",
    fixedPrice: "官方标准价格 (私人定制团 / 每人)",
    fixedPriceSub: "包含全程豪华专车送迎及认证双语导游服务",
    dayByDay: "逐日详细行程",
    highlights: "行程核心亮点",
    day: "第",
    meals: "包含餐饮",
    accommodation: "住宿安排",
    transport: "交通方式",
    activity: "活动内容",
    durationLabel: "游览时长",
    inclusions: "费用包含",
    exclusions: "费用不含",
    importantNotes: "注意事项",
    footerText: "Vermilion South American Routes • 官方认证旅行社 • 厄瓜多尔基多",
    downloadBtnText: "下载行程单",
    generatingMsg: "正在为您生成杂志风格PDF...",
    galapagosChapterTitle: "第二章: 加拉帕戈斯群岛 — 海洋探险",
    andesChapterTitle: "第一章: 安第斯与亚马逊地区",
    conciergeTitle: "24/7 WHATSAPP 专属礼宾服务与私人定制",
    conciergeDesc: "请联系 +593 994 048 458 定制您的出行日期、酒店升级或专属私人导游。",
    gallerySectionTitle: "视觉附录 — 核心目的地与标志性景观画册"
  }
};

/**
 * Checks if a day is a functional/logistical day (strictly free day or pure flight departure)
 */
function isFunctionalDay(title: string, desc: string): boolean {
  const t = title.toLowerCase();
  if (/crater|cráter|gemelos|primicias|tortuga|tortoise|tintoreras|lobería|loberia|grietas|waterfall|cascada|pailón|pailon|volcan|volcán|cotopaxi|quilotoa|chimborazo|yanacocha|amazon|rainforest|equator|mitad del mundo|city tour|panecillo|otavalo|papallacta|mindo|antisana|cajas|ingapirca/i.test(t)) {
    return false;
  }
  return /libre|free day|vuelo de retorno|departure.*flight|salida internacional|international departure/i.test(t);
}

/**
 * Checks if a day triggers a regional chapter transition
 */
function isGalapagosRegion(title: string, desc: string): boolean {
  const combined = `${title} ${desc}`.toLowerCase();
  return /galápagos|galapagos|baltra|santa cruz|isabela|san cristóbal|san cristobal|tintoreras/i.test(combined);
}

/**
 * Loads an image from a URL and converts it to Base64 (preserves PNG transparency)
 */
async function loadImageAsBase64(url: string, forcePng: boolean = false): Promise<string | null> {
  if (typeof window === 'undefined' || !url) return null;
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    const cleanUrl = url.startsWith('/') ? `${window.location.origin}${url}` : url;
    img.src = cleanUrl;
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const isPng = forcePng || url.toLowerCase().includes('.png');
          const dataURL = isPng ? canvas.toDataURL('image/png') : canvas.toDataURL('image/jpeg', 0.88);
          resolve(dataURL);
        } else {
          resolve(null);
        }
      } catch {
        resolve(null);
      }
    };
    img.onerror = () => resolve(null);
  });
}

/**
 * Draws the luxury brand header repeated on every page
 */
function drawHeaderBand(doc: jsPDF, logoBase64: string | null, pageWidth: number, marginX: number) {
  const headerH = 28;

  // 1a. Forest-green top accent strip (#1B4332)
  doc.setFillColor(27, 67, 50);
  doc.rect(0, 0, pageWidth, 3.5, 'F');

  // 1b. Crisp white header background
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 3.5, pageWidth, headerH - 3.5, 'F');

  // 1c. Bottom divider
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.line(0, headerH, pageWidth, headerH);

  // 1d. Logo on the left (Refined size: 46mm x 15mm)
  if (logoBase64) {
    const logoW = 46;
    const logoH = 15;
    const logoY = 3.5 + ((headerH - 3.5 - logoH) / 2);
    doc.addImage(logoBase64, 'PNG', marginX, logoY, logoW, logoH);
  }

  // 1e. Contact info on the RIGHT with vector icons (vertically matches logo 8.4mm to 23.3mm, flush to 196mm right margin)
  const cX = 158;
  const cY1 = 11.2; // Phone text baseline
  const cY2 = 16.9; // Email text baseline
  const cY3 = 22.6; // Web text baseline

  // --- Phone Vector Icon ---
  doc.setFillColor(27, 67, 50); // Forest green #1B4332
  doc.roundedRect(cX, 8.4, 3.8, 3.8, 0.7, 0.7, 'F');
  doc.setFillColor(255, 255, 255);
  doc.rect(cX + 1.1, 9.1, 1.6, 2.0, 'F');
  doc.setFillColor(27, 67, 50);
  doc.circle(cX + 1.9, 10.7, 0.25, 'F');

  // Phone Text
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.6);
  doc.setTextColor(30, 41, 59);
  doc.text('+(593) 994-048-458', cX + 5.2, cY1);

  // --- Email Vector Icon ---
  doc.setFillColor(27, 67, 50);
  doc.roundedRect(cX, 14.2, 3.8, 3.0, 0.5, 0.5, 'F');
  doc.setDrawColor(255, 255, 255);
  doc.setLineWidth(0.28);
  doc.line(cX + 0.3, 14.4, cX + 1.9, 15.8);
  doc.line(cX + 3.5, 14.4, cX + 1.9, 15.8);

  // Email Text
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.6);
  doc.setTextColor(30, 41, 59);
  doc.text('info@vermilionroutes.com', cX + 5.2, cY2);

  // --- Website Vector Icon ---
  doc.setFillColor(27, 67, 50);
  doc.circle(cX + 1.9, 21.4, 1.9, 'F');
  doc.setDrawColor(255, 255, 255);
  doc.setLineWidth(0.22);
  doc.line(cX, 21.4, cX + 3.8, 21.4);
  doc.line(cX + 1.9, 19.5, cX + 1.9, 23.3);

  // Web Text
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.6);
  doc.setTextColor(30, 41, 59);
  doc.text('www.vermilionroutes.com', cX + 5.2, cY3);
}

/**
 * Unified Magazine-Style PDF Generator for All Expeditions and Day Tours
 */
export async function generateTourPDF(tour: Tour, locale: string = 'es'): Promise<void> {
  if (typeof window === 'undefined' || !tour) return;

  const t = PDF_TRANSLATIONS[locale] || PDF_TRANSLATIONS['es'];

  // Check if tour is a single-day tour
  const isDailyTour = tour.durationDays === 1 ||
    dailyTours.some(d => d.id === tour.id) ||
    tour.id.includes('quito-city') ||
    tour.id.includes('otavalo') ||
    tour.id.includes('papallacta') ||
    tour.id.includes('mindo') ||
    tour.id.includes('antisana') ||
    tour.id.includes('cotopaxi') ||
    tour.id.includes('quilotoa');

  // Multi-strategy target resolution
  let targetTour: Tour | undefined;
  if (isDailyTour) {
    targetTour = dailyTours.find(d => d.id === tour.id);
  } else {
    targetTour = mockTours.find(m => m.id === tour.id);
  }

  // Fallback matchers
  if (!targetTour) {
    const allCandidates = [...mockTours, ...dailyTours];
    targetTour = allCandidates.find(m => m.id === tour.id);
  }
  targetTour = targetTour ?? tour;

  const title = getLocalizedText(targetTour.title, locale);
  const destination = getLocalizedText(targetTour.destination, locale) || 'Ecuador';
  const duration = getLocalizedText(targetTour.duration, locale) || (isDailyTour ? '1 DAY (FULL DAY)' : '7 DAYS');
  const category = getLocalizedText(targetTour.category, locale) || (isDailyTour ? 'Day Excursion' : 'Private Expedition');
  const description = getLocalizedText(targetTour.description, locale);

  const price3Star = targetTour.price3Star ?? tour.price3Star ?? targetTour.price;
  const price4Star = targetTour.price4Star ?? tour.price4Star ?? Math.round((price3Star ?? 0) * 1.15);
  const singlePrice = targetTour.price || tour.price || 89;

  const itinerary = (targetTour.itinerary && targetTour.itinerary.length > 0)
    ? targetTour.itinerary
    : (tour.itinerary ?? []);
  const highlights = (targetTour.highlights && targetTour.highlights.length > 0)
    ? targetTour.highlights
    : (tour.highlights ?? []);
  const inclusions = (targetTour.inclusions && targetTour.inclusions.length > 0)
    ? targetTour.inclusions
    : (tour.inclusions ?? []);
  const exclusions = (targetTour.exclusions && targetTour.exclusions.length > 0)
    ? targetTour.exclusions
    : (tour.exclusions ?? []);
  const gallery = (targetTour.gallery && targetTour.gallery.length > 0)
    ? targetTour.gallery
    : (tour.gallery ?? []);

  // Initialize jsPDF (A4: 210mm x 297mm)
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const marginX = 14;       // 14mm left margin
  const marginRight = 14;   // 14mm right margin (content width = 182mm, safe boundary = 196mm)
  const contentWidth = pageWidth - marginX - marginRight; // 182mm
  let yPos = 0;

  // Pre-load assets
  const logoBase64 = await loadImageAsBase64('/logo_inicio.png', true);
  const coverImgPath = targetTour.desktopImage || targetTour.imageUrl || tour.desktopImage || tour.imageUrl;
  const coverBase64 = await loadImageAsBase64(coverImgPath);

  const dayImagesBase64: (string | null)[] = [];
  const usedImageUrls = new Set<string>();

  for (let i = 0; i < itinerary.length; i++) {
    const day = itinerary[i];
    let imgUrl = day.image;

    if (!imgUrl) {
      const unused = gallery.find((g) => g && !usedImageUrls.has(g));
      if (unused) {
        imgUrl = unused;
      } else {
        imgUrl = gallery[i % gallery.length] || coverImgPath;
      }
    }

    if (imgUrl) {
      usedImageUrls.add(imgUrl);
    }

    const b64 = await loadImageAsBase64(imgUrl);
    dayImagesBase64.push(b64);
  }

  // Pre-load full tour gallery images for the visual appendix
  const galleryImagesBase64: { url: string; b64: string | null }[] = [];
  for (const gUrl of gallery) {
    if (gUrl) {
      const b64 = await loadImageAsBase64(gUrl);
      if (b64) {
        galleryImagesBase64.push({ url: gUrl, b64 });
      }
    }
  }

  // Draw Page 1 warm ivory paper background
  doc.setFillColor(250, 249, 246);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Draw Header on Page 1
  drawHeaderBand(doc, logoBase64, pageWidth, marginX);
  yPos = 32;

  // Helper for adding new pages with replicated header
  const checkPageBreak = (neededHeight: number) => {
    if (yPos + neededHeight > pageHeight - 16) {
      doc.addPage();
      // Apply warm ivory background to new page
      doc.setFillColor(250, 249, 246);
      doc.rect(0, 0, pageWidth, pageHeight, 'F');

      // Re-draw the luxury header on every page
      drawHeaderBand(doc, logoBase64, pageWidth, marginX);
      yPos = 35; // Content starts cleanly below header
      return true;
    }
    return false;
  };

  // 1. HERO COVER BANNER (70mm height, full width edge-to-edge)
  if (coverBase64) {
    const coverHeight = 70;
    doc.addImage(coverBase64, 'JPEG', 0, yPos, pageWidth, coverHeight);

    // Dark gradient overlay at bottom of cover
    doc.setFillColor(0, 0, 0);
    doc.setGState(new (doc as any).GState({ opacity: 0.72 }));
    doc.rect(0, yPos + 44, pageWidth, 26, 'F');
    doc.setGState(new (doc as any).GState({ opacity: 1.0 }));

    // Overlay Main Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12.5);
    doc.setTextColor(255, 255, 255);
    doc.text(title.toUpperCase(), marginX, yPos + 53);

    // Frosted Badges
    const bY = yPos + 59;
    const badgeHeight = 6.8;
    const badgePaddingX = 4;

    const b1Text = `[ ${destination.toUpperCase()} ]`;
    const b2Text = `[ ${category.toUpperCase()} ]`;
    const b3Text = isDailyTour ? '[ 1 DAY (FULL DAY) ]' : `[ ${duration.toUpperCase()} ]`;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.2);

    let badgeX = marginX;
    const badges = [b1Text, b2Text, b3Text];

    badges.forEach((bText) => {
      const textW = doc.getTextWidth(bText);
      const bW = textW + (badgePaddingX * 2);

      // Frosted pill
      doc.setFillColor(30, 41, 59);
      doc.setGState(new (doc as any).GState({ opacity: 0.78 }));
      doc.roundedRect(badgeX, bY, bW, badgeHeight, 1.8, 1.8, 'F');
      doc.setGState(new (doc as any).GState({ opacity: 1.0 }));

      // Outline
      doc.setDrawColor(255, 255, 255);
      doc.setLineWidth(0.3);
      doc.roundedRect(badgeX, bY, bW, badgeHeight, 1.8, 1.8, 'D');

      doc.setTextColor(255, 255, 255);
      doc.text(bText, badgeX + badgePaddingX, bY + 4.6);
      badgeX += bW + 2.8;
    });

    yPos += coverHeight + 7;
  } else {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(15);
    doc.setTextColor(2, 44, 34);
    doc.text(title.toUpperCase(), marginX, yPos + 6);
    yPos += 14;
  }

  // 2. PRICING CARDS
  if (isDailyTour) {
    // Single Price Card for 1-Day Tours (182mm wide)
    doc.setFillColor(240, 253, 244); // #F0FDF4 emerald-50
    doc.setDrawColor(16, 185, 129); // #10B981 emerald-500
    doc.setLineWidth(0.8);
    doc.roundedRect(marginX, yPos, contentWidth, 16, 2, 2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(22, 101, 52);
    doc.text(t.fixedPrice.toUpperCase(), marginX + 6, yPos + 5.8);

    doc.setFontSize(12.5);
    doc.setTextColor(6, 95, 70);
    doc.text(`$${singlePrice} USD`, marginX + 6, yPos + 12.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.8);
    doc.setTextColor(71, 85, 105);
    doc.text(t.fixedPriceSub, pageWidth - marginRight - 6, yPos + 9.5, { align: 'right' });

    yPos += 22;
  } else {
    // 3★ & 4★ Hotel Tier Cards for Multi-Day Tours
    const cardWidth = (contentWidth - 6) / 2; // 88mm each
    const cardHeight = 17;

    // 3-Star Card
    doc.setFillColor(240, 253, 244);
    doc.setDrawColor(167, 243, 208);
    doc.roundedRect(marginX, yPos, cardWidth, cardHeight, 2, 2, 'FD');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(22, 101, 52);
    doc.text(t.hotel3star.toUpperCase(), marginX + 6, yPos + 5.5);
    doc.setFontSize(12);
    doc.setTextColor(4, 120, 87);
    doc.text(`$${price3Star} USD`, marginX + 6, yPos + 12.5);

    // 4-Star Card
    const card2X = marginX + cardWidth + 6;
    doc.setFillColor(250, 245, 255);
    doc.setDrawColor(233, 213, 255);
    doc.roundedRect(card2X, yPos, cardWidth, cardHeight, 2, 2, 'FD');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(126, 34, 206);
    doc.text(t.hotel4star.toUpperCase(), card2X + 6, yPos + 5.5);
    doc.setFontSize(12);
    doc.setTextColor(126, 34, 206);
    doc.text(`$${price4Star} USD`, card2X + 6, yPos + 12.5);

    yPos += cardHeight + 8;
  }

  // 3. OVERVIEW / DESCRIPTION BOX (FULL WIDTH 182mm, JUSTIFIED)
  if (description) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.0);
    const paddingX = 6;
    const descTextWidth = contentWidth - (paddingX * 2); // 170mm
    const splitDesc = doc.splitTextToSize(description, descTextWidth);
    const descBoxHeight = (splitDesc.length * 4.2) + 9;

    doc.setFillColor(255, 255, 255);
    doc.rect(marginX, yPos, contentWidth, descBoxHeight, 'F');

    // Left emerald accent bar (2.5mm)
    doc.setFillColor(16, 185, 129); // #10B981
    doc.rect(marginX, yPos, 2.5, descBoxHeight, 'F');

    // Border
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.rect(marginX, yPos, contentWidth, descBoxHeight, 'D');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.0);
    doc.setTextColor(51, 65, 85);
    doc.text(description, marginX + paddingX + 1, yPos + 5.8, { maxWidth: descTextWidth, align: 'justify' });

    yPos += descBoxHeight + 8;
  }

  // 4. HIGHLIGHTS (If present, e.g. on 1-day tours or multi-day tours)
  if (isDailyTour && highlights.length > 0) {
    checkPageBreak(25);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(6, 78, 59);
    doc.text(t.highlights.toUpperCase(), marginX, yPos);
    doc.setDrawColor(167, 243, 208);
    doc.setLineWidth(0.8);
    doc.line(marginX, yPos + 2, marginX + contentWidth, yPos + 2);
    yPos += 7;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.0);

    highlights.forEach((h) => {
      const hText = getLocalizedText(h, locale);
      const splitH = doc.splitTextToSize(hText, contentWidth - 12);
      const hHeight = (splitH.length * 4.2) + 2;
      checkPageBreak(hHeight);

      // Emerald bullet dot
      doc.setFillColor(16, 185, 129);
      doc.circle(marginX + 2.5, yPos + 2, 1.8, 'F');

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.0);
      doc.setTextColor(30, 41, 59);
      doc.text(splitH, marginX + 7, yPos + 3);
      yPos += hHeight;
    });
    yPos += 4;
  }

  // 5. ITINERARY PROGRAM
  if (itinerary.length > 0) {
    checkPageBreak(15);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(6, 78, 59);
    doc.text(t.dayByDay.toUpperCase(), marginX, yPos);
    doc.setDrawColor(167, 243, 208);
    doc.setLineWidth(0.8);
    doc.line(marginX, yPos + 2, marginX + contentWidth, yPos + 2);
    yPos += 9;

    let mainDayIndex = 0;
    let currentRegionIsGalapagos = false;

    // Check regional transition for multi-region combo tours
    const hasAndes = itinerary.some(d => {
      const tText = getLocalizedText(d.title, locale).toLowerCase();
      const dText = getLocalizedText(d.description, locale).toLowerCase();
      return /quito|baños|banos|amazon|tena|puyo|quilotoa|cotopaxi|cuenca|otavalo/i.test(`${tText} ${dText}`);
    });
    const hasGalapagos = itinerary.some(d => isGalapagosRegion(getLocalizedText(d.title, locale), getLocalizedText(d.description, locale)));
    const isMultiRegionCombo = hasAndes && hasGalapagos;

    for (let i = 0; i < itinerary.length; i++) {
      const dayItem = itinerary[i];
      const dayTitle = getLocalizedText(dayItem.title, locale);
      const rawDayDesc = getLocalizedText(dayItem.description, locale);
      const dayMeals = dayItem.meals ? getLocalizedText(dayItem.meals, locale) : '';
      const dayAcc = dayItem.accommodation ? getLocalizedText(dayItem.accommodation, locale) : '';
      const dayTrans = dayItem.transportation ? getLocalizedText(dayItem.transportation, locale) : '';
      const dayAct = dayItem.activity ? getLocalizedText(dayItem.activity, locale) : '';
      const dayImgBase64 = dayImagesBase64[i];

      const isFunctional = isFunctionalDay(dayTitle, rawDayDesc);
      const isGalapagos = isGalapagosRegion(dayTitle, rawDayDesc);

      // Regional chapter header
      if (isMultiRegionCombo && isGalapagos && !currentRegionIsGalapagos) {
        currentRegionIsGalapagos = true;
        checkPageBreak(22);
        yPos += 3;

        doc.setFillColor(236, 253, 245);
        doc.setDrawColor(167, 243, 208);
        doc.roundedRect(marginX, yPos, contentWidth, 16, 2, 2, 'FD');

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(6, 78, 59);
        doc.text(t.galapagosChapterTitle.toUpperCase(), marginX + 6, yPos + 10);

        yPos += 22;
      }

      if (isDailyTour || isFunctional) {
        // FULL-WIDTH FORMAT (182mm wide, flush margins)
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9.0);
        const splitDayDesc = doc.splitTextToSize(rawDayDesc, contentWidth - 14);
        const blockHeight = 16 + (splitDayDesc.length * 4.2) + (dayMeals ? 5 : 0);

        checkPageBreak(blockHeight + 4);

        doc.setFillColor(255, 255, 255);
        doc.setDrawColor(203, 213, 225);
        doc.roundedRect(marginX, yPos, contentWidth, blockHeight, 2, 2, 'FD');

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(71, 85, 105);
        doc.text(`${t.day.toUpperCase()} ${dayItem.day} • [ ${isDailyTour ? 'PROGRAMA DE EXCURSIÓN' : 'LOGÍSTICA / DÍA LIBRE'} ]`, marginX + 6, yPos + 6);

        doc.setFontSize(10);
        doc.setTextColor(15, 23, 42);
        doc.text(dayTitle, marginX + 6, yPos + 12);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9.0);
        doc.setTextColor(51, 65, 85);
        let descY = yPos + 17;
        doc.text(rawDayDesc, marginX + 6, descY, { maxWidth: contentWidth - 14, align: 'justify' });
        descY += (splitDayDesc.length * 4.2);

        if (dayMeals || dayTrans || dayAct) {
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(8.2);
          doc.setTextColor(71, 85, 105);
          const metaParts: string[] = [];
          if (dayTrans) metaParts.push(`TRANSPORT: ${dayTrans}`);
          if (dayMeals) metaParts.push(`MEALS: ${dayMeals}`);
          if (dayAct) metaParts.push(`DURATION: ${dayAct}`);
          doc.text(metaParts.join('  •  '), marginX + 6, descY + 2);
        }

        yPos += blockHeight + 6;
      } else {
        // MULTI-DAY ALTERNATING MAGAZINE LAYOUT (52mm image + 6mm gap + 124mm text flush to right margin)
        const isEven = (mainDayIndex % 2 === 0);
        mainDayIndex++;

        const imageWidth = 52;
        const gap = 6;
        const textWidth = contentWidth - imageWidth - gap; // 182 - 52 - 6 = 124mm

        const rawText = rawDayDesc.trim();
        const paragraphs = rawText.includes('\n')
          ? rawText.split(/\n\s*\n|\r\n\r\n|\n/).map(p => p.trim()).filter(Boolean)
          : [rawText];

        // CRITICAL: Set font family and size before splitTextToSize
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9.0);
        const wrappedParagraphs = paragraphs.map(p => doc.splitTextToSize(p, textWidth));
        const totalDescLines = wrappedParagraphs.reduce((acc, lines) => acc + lines.length, 0);

        let metadataHeight = 0;
        if (dayAcc) metadataHeight += 4.6;
        if (dayTrans) metadataHeight += 4.6;
        if (dayMeals) metadataHeight += 4.6;
        if (dayAct) metadataHeight += 4.6;

        const textBlockHeight = 18 + (totalDescLines * 4.2) + (paragraphs.length * 2.6) + metadataHeight;
        const blockHeight = Math.max(textBlockHeight, 52);

        checkPageBreak(blockHeight + 8);

        if (isEven) {
          // EVEN DAY: Image on LEFT (14mm to 66mm), Text on RIGHT (72mm to 196mm)
          const imgX = marginX; // 14mm
          const textX = marginX + imageWidth + gap; // 72mm

          if (dayImgBase64) {
            doc.addImage(dayImgBase64, 'JPEG', imgX, yPos, imageWidth, blockHeight);
            doc.setDrawColor(226, 232, 240);
            doc.setLineWidth(0.3);
            doc.roundedRect(imgX, yPos, imageWidth, blockHeight, 2, 2, 'D');
          }

          doc.setFont('helvetica', 'bold');
          doc.setFontSize(8.5);
          doc.setTextColor(6, 78, 59);
          doc.text(`${t.day.toUpperCase()} ${dayItem.day}`, textX, yPos + 5.5);

          doc.setFont('helvetica', 'bold');
          doc.setFontSize(10);
          doc.setTextColor(15, 23, 42);
          const splitTitle = doc.splitTextToSize(dayTitle, textWidth);
          doc.text(splitTitle, textX, yPos + 11);
          let descY = yPos + 11 + (splitTitle.length * 4.6);

          doc.setFont('helvetica', 'normal');
          doc.setFontSize(9.0);
          doc.setTextColor(51, 65, 85);
          for (let pIdx = 0; pIdx < paragraphs.length; pIdx++) {
            const paraStr = paragraphs[pIdx];
            const paraLines = wrappedParagraphs[pIdx];
            doc.text(paraStr, textX, descY, { maxWidth: textWidth, align: 'justify' });
            descY += (paraLines.length * 4.2) + 2.6;
          }

          // Metadata Badges (clean text without broken emojis)
          if (dayAcc) {
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(8.2);
            doc.setTextColor(15, 23, 42);
            doc.text(`${t.accommodation}: `, textX, descY);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(71, 85, 105);
            doc.text(dayAcc, textX + 18, descY);
            descY += 4.6;
          }
          if (dayTrans) {
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(8.2);
            doc.setTextColor(15, 23, 42);
            doc.text(`${t.transport}: `, textX, descY);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(71, 85, 105);
            const splitTrans = doc.splitTextToSize(dayTrans, textWidth - 18);
            doc.text(splitTrans, textX + 18, descY);
            descY += (splitTrans.length * 3.8);
          }
          if (dayMeals) {
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(8.2);
            doc.setTextColor(15, 23, 42);
            doc.text(`${t.meals}: `, textX, descY);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(71, 85, 105);
            doc.text(dayMeals, textX + 14, descY);
            descY += 4.6;
          }
          if (dayAct) {
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(8.2);
            doc.setTextColor(15, 23, 42);
            doc.text(`${t.activity}: `, textX, descY);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(71, 85, 105);
            const splitAct = doc.splitTextToSize(dayAct, textWidth - 16);
            doc.text(splitAct, textX + 16, descY);
            descY += (splitAct.length * 3.8);
          }
        } else {
          // ODD DAY: Text on LEFT (14mm to 138mm), Image on RIGHT (144mm to 196mm)
          const textX = marginX; // 14mm
          const imgX = marginX + textWidth + gap; // 144mm

          if (dayImgBase64) {
            doc.addImage(dayImgBase64, 'JPEG', imgX, yPos, imageWidth, blockHeight);
            doc.setDrawColor(226, 232, 240);
            doc.setLineWidth(0.3);
            doc.roundedRect(imgX, yPos, imageWidth, blockHeight, 2, 2, 'D');
          }

          doc.setFont('helvetica', 'bold');
          doc.setFontSize(8.5);
          doc.setTextColor(6, 78, 59);
          doc.text(`${t.day.toUpperCase()} ${dayItem.day}`, textX, yPos + 5.5);

          doc.setFont('helvetica', 'bold');
          doc.setFontSize(10);
          doc.setTextColor(15, 23, 42);
          const splitTitle = doc.splitTextToSize(dayTitle, textWidth);
          doc.text(splitTitle, textX, yPos + 11);
          let descY = yPos + 11 + (splitTitle.length * 4.6);

          doc.setFont('helvetica', 'normal');
          doc.setFontSize(9.0);
          doc.setTextColor(51, 65, 85);
          for (let pIdx = 0; pIdx < paragraphs.length; pIdx++) {
            const paraStr = paragraphs[pIdx];
            const paraLines = wrappedParagraphs[pIdx];
            doc.text(paraStr, textX, descY, { maxWidth: textWidth, align: 'justify' });
            descY += (paraLines.length * 4.2) + 2.6;
          }

          // Metadata Badges
          if (dayAcc) {
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(8.2);
            doc.setTextColor(15, 23, 42);
            doc.text(`${t.accommodation}: `, textX, descY);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(71, 85, 105);
            doc.text(dayAcc, textX + 18, descY);
            descY += 4.6;
          }
          if (dayTrans) {
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(8.2);
            doc.setTextColor(15, 23, 42);
            doc.text(`${t.transport}: `, textX, descY);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(71, 85, 105);
            const splitTrans = doc.splitTextToSize(dayTrans, textWidth - 18);
            doc.text(splitTrans, textX + 18, descY);
            descY += (splitTrans.length * 3.8);
          }
          if (dayMeals) {
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(8.2);
            doc.setTextColor(15, 23, 42);
            doc.text(`${t.meals}: `, textX, descY);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(71, 85, 105);
            doc.text(dayMeals, textX + 14, descY);
            descY += 4.6;
          }
          if (dayAct) {
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(8.2);
            doc.setTextColor(15, 23, 42);
            doc.text(`${t.activity}: `, textX, descY);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(71, 85, 105);
            const splitAct = doc.splitTextToSize(dayAct, textWidth - 16);
            doc.text(splitAct, textX + 16, descY);
            descY += (splitAct.length * 3.8);
          }
        }

        yPos += blockHeight + 8;
      }
    }
  }

  // 6. INCLUSIONS & EXCLUSIONS
  if (inclusions.length > 0 || exclusions.length > 0) {
    checkPageBreak(35);
    yPos += 3;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(6, 78, 59);
    doc.text(t.inclusions.toUpperCase(), marginX, yPos);
    doc.setDrawColor(167, 243, 208);
    doc.setLineWidth(0.8);
    doc.line(marginX, yPos + 2, marginX + contentWidth, yPos + 2);
    yPos += 7;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.0);

    inclusions.forEach((inc) => {
      const incText = getLocalizedText(inc, locale);
      const splitInc = doc.splitTextToSize(incText, contentWidth - 10);
      const itemHeight = (splitInc.length * 4.3) + 2.5;
      checkPageBreak(itemHeight);

      // Green Vector Check
      doc.setFillColor(16, 185, 129); // emerald-500
      doc.circle(marginX + 2.5, yPos + 2, 2.0, 'F');
      doc.setDrawColor(255, 255, 255);
      doc.setLineWidth(0.5);
      doc.line(marginX + 1.5, yPos + 2, marginX + 2.3, yPos + 2.8);
      doc.line(marginX + 2.3, yPos + 2.8, marginX + 3.5, yPos + 1.1);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.0);
      doc.setTextColor(30, 41, 59);
      doc.text(splitInc, marginX + 7, yPos + 3);
      yPos += itemHeight;
    });

    if (exclusions.length > 0) {
      yPos += 3;
      checkPageBreak(25);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10.5);
      doc.setTextColor(6, 78, 59);
      doc.text(t.exclusions.toUpperCase(), marginX, yPos);
      doc.setDrawColor(167, 243, 208);
      doc.setLineWidth(0.8);
      doc.line(marginX, yPos + 2, marginX + contentWidth, yPos + 2);
      yPos += 7;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.0);

      exclusions.forEach((exc) => {
        const excText = getLocalizedText(exc, locale);
        const splitExc = doc.splitTextToSize(excText, contentWidth - 10);
        const itemHeight = (splitExc.length * 4.3) + 2.5;
        checkPageBreak(itemHeight);

        // Red Vector Cross
        doc.setFillColor(225, 29, 72); // rose-600
        doc.circle(marginX + 2.5, yPos + 2, 2.0, 'F');
        doc.setDrawColor(255, 255, 255);
        doc.setLineWidth(0.5);
        doc.line(marginX + 1.6, yPos + 1.1, marginX + 3.4, yPos + 2.9);
        doc.line(marginX + 3.4, yPos + 1.1, marginX + 1.6, yPos + 2.9);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9.0);
        doc.setTextColor(100, 116, 139);
        doc.text(splitExc, marginX + 7, yPos + 3);
        yPos += itemHeight;
      });
    }
  }

  // 7. VISUAL APPENDIX / GALLERY OF FEATURED DESTINATIONS & LANDMARKS
  if (galleryImagesBase64.length > 0) {
    checkPageBreak(65);
    yPos += 5;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(6, 78, 59);
    doc.text((t.gallerySectionTitle || "ANEXO FOTOGRÁFICO — DESTINOS Y LUGARES DESTACADOS").toUpperCase(), marginX, yPos);
    doc.setDrawColor(167, 243, 208);
    doc.setLineWidth(0.8);
    doc.line(marginX, yPos + 2, marginX + contentWidth, yPos + 2);
    yPos += 8;

    const colWidth = (contentWidth - 6) / 2; // 88mm
    const colHeight = 50; // 50mm height

    for (let gIdx = 0; gIdx < galleryImagesBase64.length; gIdx += 2) {
      checkPageBreak(colHeight + 6);

      const img1 = galleryImagesBase64[gIdx];
      const img2 = galleryImagesBase64[gIdx + 1];

      if (img1 && img1.b64) {
        doc.setFillColor(241, 245, 249);
        doc.roundedRect(marginX, yPos, colWidth, colHeight, 1.5, 1.5, 'F');
        doc.addImage(img1.b64, 'JPEG', marginX, yPos, colWidth, colHeight);
        doc.setDrawColor(203, 213, 225);
        doc.setLineWidth(0.2);
        doc.roundedRect(marginX, yPos, colWidth, colHeight, 1.5, 1.5, 'D');
      }

      if (img2 && img2.b64) {
        const x2 = marginX + colWidth + 6;
        doc.setFillColor(241, 245, 249);
        doc.roundedRect(x2, yPos, colWidth, colHeight, 1.5, 1.5, 'F');
        doc.addImage(img2.b64, 'JPEG', x2, yPos, colWidth, colHeight);
        doc.setDrawColor(203, 213, 225);
        doc.setLineWidth(0.2);
        doc.roundedRect(x2, yPos, colWidth, colHeight, 1.5, 1.5, 'D');
      }

      yPos += colHeight + 5;
    }
  }

  // 8. CONCIERGE ASSISTANCE BADGE (NO RAW UNICODE EMOJIS)
  checkPageBreak(28);
  yPos += 5;
  doc.setFillColor(236, 253, 245);
  doc.setDrawColor(167, 243, 208);
  doc.roundedRect(marginX, yPos, contentWidth, 20, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(6, 78, 59);
  doc.text(t.conciergeTitle, marginX + 6, yPos + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  doc.text(t.conciergeDesc, marginX + 6, yPos + 13.5);

  // 8. WATERMARK & FOOTER ON ALL PAGES
  const totalPages = doc.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);

    // Brand Watermark
    if (logoBase64) {
      doc.setGState(new (doc as any).GState({ opacity: 0.05 }));
      const wmWidth = 100;
      const wmHeight = 40;
      doc.addImage(logoBase64, 'PNG', (pageWidth - wmWidth) / 2, (pageHeight - wmHeight) / 2, wmWidth, wmHeight);
      doc.setGState(new (doc as any).GState({ opacity: 1.0 }));
    }

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(148, 163, 184);
    doc.text(t.footerText, marginX, pageHeight - 7);
    doc.text(`${p} / ${totalPages}`, pageWidth - marginRight, pageHeight - 7, { align: 'right' });
  }

  // File Download
  const cleanFilename = title.replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-');
  const filename = `Vermilion-Routes-${cleanFilename}.pdf`;

  doc.save(filename);
}

// Re-export for backward compatibility
export const generateDailyTourPDF = generateTourPDF;
