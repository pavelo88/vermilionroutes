import { jsPDF } from 'jspdf';
import { Tour } from '@/types';
import { getLocalizedText } from '@/utils/i18nHelper';
import { mockTours } from '@/data/mock';

const PDF_TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    itineraryTitle: "Official Itinerary & Travel Guide 2026",
    duration: "Duration",
    destination: "Destination",
    category: "Category",
    pricing: "Pricing Options per Person",
    hotel3star: "3* Comfort Hotels",
    hotel4star: "4* Luxury / Premium Hotels",
    dayByDay: "Day-by-Day Detailed Itinerary",
    day: "Day",
    meals: "Meals",
    accommodation: "Accommodation",
    inclusions: "Program Includes",
    exclusions: "Program Does Not Include",
    importantNotes: "Important Travel Notes",
    footerText: "Vermilion South American Routes • Certified Tour Operator • 24/7 Support",
    downloadBtnText: "Download Itinerary",
    generatingMsg: "Generating your magazine-style PDF...",
    galapagosChapterTitle: "CHAPTER II: GALAPAGOS ISLANDS — MARINE EXPEDITION",
    andesChapterTitle: "CHAPTER I: ANDES & AMAZON REGION"
  },
  es: {
    itineraryTitle: "Itinerario Oficial y Guía de Viaje 2026",
    duration: "Duración",
    destination: "Destino",
    category: "Categoría",
    pricing: "Opciones de Tarifa por Persona",
    hotel3star: "Hoteles 3* Confort",
    hotel4star: "Hoteles 4* Lujo / Premium",
    dayByDay: "Itinerario Detallado Día por Día",
    day: "Día",
    meals: "Comidas",
    accommodation: "Hospedaje",
    inclusions: "El Programa Incluye",
    exclusions: "El Programa No Incluye",
    importantNotes: "Notas Importantes de Viaje",
    footerText: "Vermilion South American Routes • Operador Turístico Certificado • Soporte 24/7",
    downloadBtnText: "Descargar Itinerario",
    generatingMsg: "Generando tu PDF de revista...",
    galapagosChapterTitle: "CAPÍTULO II: ISLAS GALÁPAGOS — EXPEDICIÓN MARINA",
    andesChapterTitle: "CAPÍTULO I: REGIÓN ANDINA Y AMAZONÍA"
  },
  fr: {
    itineraryTitle: "Itinéraire Officiel & Guide de Voyage 2026",
    duration: "Durée",
    destination: "Destination",
    category: "Catégorie",
    pricing: "Tarifs par Personne",
    hotel3star: "Hôtels 3* Confort",
    hotel4star: "Hôtels 4* Luxe",
    dayByDay: "Itinéraire Détaillé Jour par Jour",
    day: "Jour",
    meals: "Repas",
    accommodation: "Hébergement",
    inclusions: "Le Programme Comprend",
    exclusions: "Le Programme Ne Comprend Pas",
    importantNotes: "Remarques Importantes",
    footerText: "Vermilion South American Routes • Voyagiste Certifié",
    downloadBtnText: "Télécharger Itinéraire",
    generatingMsg: "Génération de votre PDF...",
    galapagosChapterTitle: "CHAPITRE II: ÎLES GALAPAGOS — EXPÉDITION MARINE",
    andesChapterTitle: "CHAPITRE I: RÉGION DES ANDES ET AMAZONIE"
  },
  de: {
    itineraryTitle: "Offizieller Reiseplan & Reiseführer 2026",
    duration: "Dauer",
    destination: "Reiseziel",
    category: "Kategorie",
    pricing: "Preise pro Person",
    hotel3star: "3* Komfort Hotels",
    hotel4star: "4* Luxus Hotels",
    dayByDay: "Detaillierter Tagesablauf",
    day: "Tag",
    meals: "Mahlzeiten",
    accommodation: "Unterkunft",
    inclusions: "Im Preis Enthalten",
    exclusions: "Nicht Enthalten",
    importantNotes: "Wichtige Hinweise",
    footerText: "Vermilion South American Routes • Zertifizierter Reiseveranstalter",
    downloadBtnText: "Reiseplan Herunterladen",
    generatingMsg: "PDF wird erstellt...",
    galapagosChapterTitle: "KAPITEL II: GALAPAGOS-INSELN — MEERESEXPEDITION",
    andesChapterTitle: "KAPITEL I: ANDEN & AMAZONAS-REGION"
  },
  it: {
    itineraryTitle: "Itinerario Ufficiale e Guida 2026",
    duration: "Durata",
    destination: "Destinazione",
    category: "Categoria",
    pricing: "Prezzi per Persona",
    hotel3star: "Hotel 3* Comfort",
    hotel4star: "Hotel 4* Lusso",
    dayByDay: "Itinerario Dettagliato Giorno per Giorno",
    day: "Giorno",
    meals: "Pasti",
    accommodation: "Alloggio",
    inclusions: "Il Programma Include",
    exclusions: "Il Programma Non Include",
    importantNotes: "Note Importanti",
    footerText: "Vermilion South American Routes • Tour Operator Certificato",
    downloadBtnText: "Scarica Itinerario",
    generatingMsg: "Generazione del PDF...",
    galapagosChapterTitle: "CAPITOLO II: ISOLE GALAPAGOS — SPEDIZIONE MARINA",
    andesChapterTitle: "CAPITOLO I: REGIONE DELLE ANDE E AMMAZZONIA"
  },
  pt: {
    itineraryTitle: "Itinerário Oficial e Guia de Viagem 2026",
    duration: "Duração",
    destination: "Destino",
    category: "Categoria",
    pricing: "Opções de Tarifa por Pessoa",
    hotel3star: "Hotéis 3* Conforto",
    hotel4star: "Hotéis 4* Luxo",
    dayByDay: "Itinerário Detalhado Dia a Dia",
    day: "Dia",
    meals: "Refeições",
    accommodation: "Hospedagem",
    inclusions: "O Programa Inclui",
    exclusions: "O Programa Não Inclui",
    importantNotes: "Notas Importantes",
    footerText: "Vermilion South American Routes • Operador Turístico Certificado",
    downloadBtnText: "Baixar Itinerário",
    generatingMsg: "Gerando seu PDF...",
    galapagosChapterTitle: "CAPÍTULO II: ILHAS GALÁPAGOS — EXPEDIÇÃO MARÍTIMA",
    andesChapterTitle: "CAPÍTULO I: REGIÃO DOS ANDES E AMAZÔNIA"
  },
  ja: {
    itineraryTitle: "公式旅程＆旅行ガイド 2026",
    duration: "期間",
    destination: "目的地",
    category: "カテゴリー",
    pricing: "1人あたりの料金オプション",
    hotel3star: "3*コンフォートホテル",
    hotel4star: "4*ラグジュアリーホテル",
    dayByDay: "日別の詳細旅程",
    day: "日目",
    meals: "食事",
    accommodation: "宿泊",
    inclusions: "ツアーに含まれるもの",
    exclusions: "ツアーに含まれないもの",
    importantNotes: "注意事項",
    footerText: "Vermilion South American Routes • 認定旅行会社",
    downloadBtnText: "旅程をダウンロード",
    generatingMsg: "PDFを作成中...",
    galapagosChapterTitle: "第2章: ガラパゴス諸島 — 海洋探検",
    andesChapterTitle: "第1章: アンデス＆アマゾン地域"
  },
  zh: {
    itineraryTitle: "官方行程与旅行指南 2026",
    duration: "行程时长",
    destination: "目的地",
    category: "线路类别",
    pricing: "每人价格选项",
    hotel3star: "3* 舒适型酒店",
    hotel4star: "4* 豪华/尊享型酒店",
    dayByDay: "逐日详细行程",
    day: "第",
    meals: "包含餐饮",
    accommodation: "住宿安排",
    inclusions: "费用包含",
    exclusions: "费用不含",
    importantNotes: "注意事项",
    footerText: "Vermilion South American Routes • 官方认证旅行社",
    downloadBtnText: "下载行程单",
    generatingMsg: "正在为您生成杂志风格PDF...",
    galapagosChapterTitle: "第二章: 加拉帕戈斯群岛 — 海洋探险",
    andesChapterTitle: "第一章: 安第斯与亚马逊地区"
  }
};

/**
 * Checks if a day is a functional/logistical day (strictly free day or pure flight departure)
 */
function isFunctionalDay(title: string, desc: string): boolean {
  const t = title.toLowerCase();
  // If the title contains specific excursions, it's a main tour day
  if (/crater|cráter|gemelos|primicias|tortuga|tortoise|tintoreras|lobería|loberia|grietas|waterfall|cascada|pailón|pailon|volcan|volcán|cotopaxi|quilotoa|chimborazo|yanacocha|amazon|rainforest|equator|mitad del mundo|city tour|panecillo|otavalo|papallacta|mindo|antisana|cajas|ingapirca/i.test(t)) {
    return false;
  }
  return /libre|free day|vuelo de retorno|departure.*flight|salida internacional|international departure/i.test(t);
}

/**
 * Checks if a day triggers a regional chapter transition (e.g. Continental Ecuador -> Galapagos)
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
 * Generates and directly downloads a magazine-style premium vector PDF for a tour itinerary
 */
export async function generateTourPDF(tour: Tour, locale: string = 'es'): Promise<void> {
  if (typeof window === 'undefined' || !tour) return;

  const t = PDF_TRANSLATIONS[locale] || PDF_TRANSLATIONS['es'];

  // Always resolve complete verbatim tour data from mockTours
  const targetTour = mockTours.find(m => m.id === tour.id) || tour;

  const title = getLocalizedText(targetTour.title, locale);
  const destination = getLocalizedText(targetTour.destination, locale);
  const duration = getLocalizedText(targetTour.duration, locale);
  const category = getLocalizedText(targetTour.category, locale);
  const description = getLocalizedText(targetTour.description, locale);

  const price3Star = targetTour.price3Star || targetTour.price;
  const price4Star = targetTour.price4Star || Math.round(targetTour.price * 1.15);

  const itinerary = targetTour.itinerary || tour.itinerary || [];
  const inclusions = targetTour.inclusions || tour.inclusions || [];
  const exclusions = targetTour.exclusions || tour.exclusions || [];
  const gallery = targetTour.gallery || tour.gallery || [];

  // Create jsPDF instance (A4 format: 210mm x 297mm)
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const marginX = 14;
  const contentWidth = pageWidth - (marginX * 2); // 182mm
  let yPos = 14;

  // Pre-load header banner, watermark logo, cover & gallery images
  const headerBase64 = await loadImageAsBase64('/logo_inicio.png');
  const logoWatermarkBase64 = await loadImageAsBase64('/logo_inicio.png');
  const coverImgPath = tour.desktopImage || tour.imageUrl;
  const coverBase64 = await loadImageAsBase64(coverImgPath);

  const dayImagesBase64: (string | null)[] = [];
  for (let i = 0; i < itinerary.length; i++) {
    const imgUrl = gallery[i] || gallery[i % gallery.length] || coverImgPath;
    const b64 = await loadImageAsBase64(imgUrl);
    dayImagesBase64.push(b64);
  }

  // 1. BRAND HEADER (Cyan gradient from light cyan on left to deeper cyan on right)
  const headerHeight = 25;
  const startR = 207, startG = 250, startB = 254; // #CFFAFE (Light crisp ice cyan on left)
  const endR = 8, endG = 145, endB = 178;         // #0891B2 (Rich deep cyan on right)
  const slices = 210;
  const sliceWidth = pageWidth / slices;

  for (let i = 0; i < slices; i++) {
    const tRatio = i / slices;
    const r = Math.round(startR + (endR - startR) * tRatio);
    const g = Math.round(startG + (endG - startG) * tRatio);
    const b = Math.round(startB + (endB - startB) * tRatio);
    doc.setFillColor(r, g, b);
    doc.rect(i * sliceWidth, 0, sliceWidth + 0.3, headerHeight, 'F');
  }

  // Micro-divider line under header
  doc.setDrawColor(6, 182, 212);
  doc.setLineWidth(0.4);
  doc.line(0, headerHeight, pageWidth, headerHeight);

  // Logo on the left (on top of light cyan)
  if (headerBase64) {
    doc.addImage(headerBase64, 'PNG', marginX, 3.5, 42, 18);
  } else {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(15, 23, 42);
    doc.text('VERMILION ROUTES', marginX, 12);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(8, 145, 178);
    doc.text('SOUTH AMERICAN ROUTES', marginX, 17);
  }

  // 3 Contact Badges on the right (on top of deeper cyan with high contrast white text)
  const contactRightX = pageWidth - marginX;
  const iconRadius = 2.0;

  // Badge 1: Phone
  doc.setFillColor(225, 29, 72); // Crimson red circle
  doc.circle(contactRightX - 44, 7.0, iconRadius, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(255, 255, 255);
  doc.text('T', contactRightX - 44.8, 7.7);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255); // Crisp white text
  doc.text('+(593) 994-048-458', contactRightX - 40, 7.8);

  // Badge 2: Email
  doc.setFillColor(225, 29, 72);
  doc.circle(contactRightX - 44, 12.5, iconRadius, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(255, 255, 255);
  doc.text('@', contactRightX - 45.0, 13.2);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);
  doc.text('info@vermilionroutes.com', contactRightX - 40, 13.3);

  // Badge 3: Website
  doc.setFillColor(225, 29, 72);
  doc.circle(contactRightX - 44, 18.0, iconRadius, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(255, 255, 255);
  doc.text('W', contactRightX - 45.0, 18.7);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);
  doc.text('www.vermilionroutes.com', contactRightX - 40, 18.8);

  yPos = headerHeight + 3; // yPos = 28mm

  // 2. HERO COVER BANNER (FULL-BLEED LUXURY BANNER)
  if (coverBase64) {
    const coverHeight = 58;
    doc.addImage(coverBase64, 'JPEG', 0, yPos, pageWidth, coverHeight);

    // Dark gradient overlay at bottom of cover
    doc.setFillColor(0, 0, 0);
    doc.setGState(new (doc as any).GState({ opacity: 0.65 }));
    doc.rect(0, yPos + 36, pageWidth, 22, 'F');
    doc.setGState(new (doc as any).GState({ opacity: 1.0 }));

    // Overlay Title & Badges
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(255, 255, 255);
    doc.text(`${title.toUpperCase()} — OFFICIAL ITINERARY & TRAVEL GUIDE`, marginX, yPos + 46);

    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(254, 240, 138); // Soft gold
    doc.text(`[ ${destination} ]   •   [ ${duration} ]   •   [ ${category} ]`, marginX, yPos + 52);

    yPos += coverHeight + 8;
  } else {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(2, 44, 34);
    doc.text(title.toUpperCase(), marginX, yPos + 6);
    yPos += 14;
  }

  // 3. OVERVIEW / DESCRIPTION BOX
  if (description) {
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(6, 182, 212); // Soft cyan border
    doc.setLineWidth(1);

    const splitDesc = doc.splitTextToSize(description, contentWidth - 10);
    const descBoxHeight = (splitDesc.length * 4.2) + 6;

    doc.rect(marginX, yPos, contentWidth, descBoxHeight, 'F');
    doc.line(marginX, yPos, marginX, yPos + descBoxHeight); // Left accent border

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(51, 65, 85);
    doc.text(splitDesc, marginX + 5, yPos + 5);

    yPos += descBoxHeight + 7;
  }

  // 4. PRICING CARDS
  const cardWidth = (contentWidth - 6) / 2; // 88mm each
  const cardHeight = 18;

  // 3-Star Card
  doc.setFillColor(240, 253, 244);
  doc.setDrawColor(167, 243, 208);
  doc.roundedRect(marginX, yPos, cardWidth, cardHeight, 2, 2, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(22, 101, 52);
  doc.text(t.hotel3star.toUpperCase(), marginX + 6, yPos + 6);
  doc.setFontSize(12);
  doc.setTextColor(4, 120, 87);
  doc.text(`$${price3Star} USD`, marginX + 6, yPos + 13.5);

  // 4-Star Card
  const card2X = marginX + cardWidth + 6;
  doc.setFillColor(250, 245, 255);
  doc.setDrawColor(233, 213, 255);
  doc.roundedRect(card2X, yPos, cardWidth, cardHeight, 2, 2, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(126, 34, 206);
  doc.text(t.hotel4star.toUpperCase(), card2X + 6, yPos + 6);
  doc.setFontSize(12);
  doc.setTextColor(126, 34, 206);
  doc.text(`$${price4Star} USD`, card2X + 6, yPos + 13.5);

  yPos += cardHeight + 10;

  // Helper for adding new pages cleanly
  const checkPageBreak = (neededHeight: number) => {
    if (yPos + neededHeight > pageHeight - 22) {
      doc.addPage();
      yPos = 16;
      // Top cyan accent bar on new page
      doc.setFillColor(6, 182, 212);
      doc.rect(0, 0, pageWidth, 3.5, 'F');
      return true;
    }
    return false;
  };

  // Determine if tour is a multi-region combination (Andes + Galapagos)
  const hasAndes = itinerary.some(d => {
    const tText = getLocalizedText(d.title, locale).toLowerCase();
    const dText = getLocalizedText(d.description, locale).toLowerCase();
    return /quito|baños|banos|amazon|tena|puyo|quilotoa|cotopaxi|cuenca|otavalo/i.test(`${tText} ${dText}`);
  });
  const hasGalapagos = itinerary.some(d => isGalapagosRegion(getLocalizedText(d.title, locale), getLocalizedText(d.description, locale)));
  const isMultiRegionCombo = hasAndes && hasGalapagos;

  let currentRegionIsGalapagos = false;
  let mainDayIndex = 0;

  // 5. MAGAZINE-STYLE DAY-BY-DAY ITINERARY WITH ZIG-ZAG & FULL-BLEED IMAGES
  if (itinerary.length > 0) {
    checkPageBreak(15);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(8, 145, 178); // Elegant cyan-teal #0891B2
    doc.text(t.dayByDay.toUpperCase(), marginX, yPos);
    doc.setDrawColor(207, 250, 254);
    doc.setLineWidth(0.8);
    doc.line(marginX, yPos + 2, marginX + contentWidth, yPos + 2);
    yPos += 10;

    for (let i = 0; i < itinerary.length; i++) {
      const dayItem = itinerary[i];
      const dayTitle = getLocalizedText(dayItem.title, locale);
      const rawDayDesc = getLocalizedText(dayItem.description, locale);
      const dayMeals = dayItem.meals ? getLocalizedText(dayItem.meals, locale) : '';
      const dayAcc = dayItem.accommodation ? getLocalizedText(dayItem.accommodation, locale) : '';
      const dayTrans = dayItem.transportation ? getLocalizedText(dayItem.transportation, locale) : '';
      const dayAct = dayItem.activity ? getLocalizedText(dayItem.activity, locale) : '';
      const dayInc = dayItem.includedVisits ? getLocalizedText(dayItem.includedVisits, locale) : '';
      const dayAlt = dayItem.altitude ? getLocalizedText(dayItem.altitude, locale) : '';
      const dayImgBase64 = dayImagesBase64[i];

      const isFunctional = isFunctionalDay(dayTitle, rawDayDesc);
      const isGalapagos = isGalapagosRegion(dayTitle, rawDayDesc);

      // REGIONAL CHAPTER DIVIDER ONLY ON MULTI-REGION COMBO TOURS (Render with soft cyan background)
      if (isMultiRegionCombo && isGalapagos && !currentRegionIsGalapagos) {
        currentRegionIsGalapagos = true;
        checkPageBreak(22);
        yPos += 4;

        // Soft light cyan chapter banner
        doc.setFillColor(236, 254, 255); // #ECFEFF (light cyan)
        doc.setDrawColor(165, 243, 252); // #A5F3FC (cyan border)
        doc.roundedRect(marginX, yPos, contentWidth, 18, 2, 2, 'FD');

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10.5);
        doc.setTextColor(14, 116, 144); // Deep cyan #0E7490
        doc.text(t.galapagosChapterTitle.toUpperCase(), marginX + 6, yPos + 11);

        yPos += 24;
      }

      if (isFunctional) {
        // FUNCTIONAL DAY: COMPACT STRIP FORMAT
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9.5); // Increased from 8.5
        const splitDayDesc = doc.splitTextToSize(rawDayDesc, contentWidth - 12);
        const blockHeight = 14 + (splitDayDesc.length * 4.4) + (dayMeals ? 5 : 0);

        checkPageBreak(blockHeight + 4);

        doc.setFillColor(248, 250, 252);
        doc.setDrawColor(203, 213, 225);
        doc.roundedRect(marginX, yPos, contentWidth, blockHeight, 2, 2, 'FD');

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9); // Increased from 8
        doc.setTextColor(71, 85, 105);
        doc.text(`${t.day.toUpperCase()} ${dayItem.day} • [ LOGÍSTICA / DÍA LIBRE ]`, marginX + 5, yPos + 6);

        doc.setFontSize(10.5); // Increased from 9.5
        doc.setTextColor(15, 23, 42);
        doc.text(dayTitle, marginX + 5, yPos + 12);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9.5); // Increased from 8.5
        doc.setTextColor(51, 65, 85);
        let descY = yPos + 17;
        doc.text(splitDayDesc, marginX + 5, descY);
        descY += (splitDayDesc.length * 4.4);

        if (dayMeals) {
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(8.5); // Increased from 7.5
          doc.setTextColor(71, 85, 105);
          doc.text(`MEALS: ${dayMeals}`, marginX + 5, descY + 2);
        }

        yPos += blockHeight + 6;
      } else {
        // MAIN DAY: DYNAMIC ZIG-ZAG LAYOUT WITH 50% BLEED IMAGE (105mm width)
        const isEven = (mainDayIndex % 2 === 0);
        mainDayIndex++;

        const halfWidth = 105; // 105mm width
        const textWidth = 86; // Text column width

        // Process all paragraphs cleanly without truncating
        const rawText = rawDayDesc.trim();
        const paragraphs = rawText.includes('\n') 
          ? rawText.split(/\n\s*\n|\r\n\r\n|\n/).map(p => p.trim()).filter(Boolean)
          : [rawText];

        const wrappedParagraphs = paragraphs.map(p => doc.splitTextToSize(p, textWidth));
        const totalDescLines = wrappedParagraphs.reduce((acc, lines) => acc + lines.length, 0);

        // Estimate metadata lines
        let metadataHeight = 0;
        if (dayAcc) metadataHeight += 5;
        if (dayTrans) metadataHeight += 5;
        if (dayMeals) metadataHeight += 5;
        if (dayAct) metadataHeight += 5;
        if (dayInc) metadataHeight += 5;
        if (dayAlt) metadataHeight += 5;

        const textBlockHeight = 18 + (totalDescLines * 4.1) + (paragraphs.length * 2.8) + metadataHeight;
        const blockHeight = Math.max(textBlockHeight, 52);

        checkPageBreak(blockHeight + 8);

        if (isEven) {
          // EVEN DAY: Image on LEFT (Bleed 0 to 105mm), Text on RIGHT (112mm to 198mm)
          if (dayImgBase64) {
            doc.addImage(dayImgBase64, 'JPEG', 0, yPos, halfWidth, blockHeight);
          }

          const textX = 112;
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(9); // Increased from 8
          doc.setTextColor(8, 145, 178); // Cyan accent
          doc.text(`${t.day.toUpperCase()} ${dayItem.day}`, textX, yPos + 6);

          doc.setFontSize(10.5); // Increased from 9.5
          doc.setTextColor(15, 23, 42);
          const splitTitle = doc.splitTextToSize(dayTitle, textWidth);
          doc.text(splitTitle, textX, yPos + 11.5);
          let descY = yPos + 11.5 + (splitTitle.length * 4.8);

          // Render all full paragraphs
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(9); // Increased from 8
          doc.setTextColor(51, 65, 85);
          for (const paraLines of wrappedParagraphs) {
            doc.text(paraLines, textX, descY);
            descY += (paraLines.length * 4.1) + 2.8;
          }

          // Render metadata badges
          if (dayAcc) {
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(8.5); // Increased from 7.5
            doc.setTextColor(15, 23, 42);
            doc.text('Overnight: ', textX, descY);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(71, 85, 105);
            doc.text(dayAcc, textX + 18, descY);
            descY += 5;
          }
          if (dayTrans) {
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(8.5); // Increased from 7.5
            doc.setTextColor(15, 23, 42);
            doc.text('Transport: ', textX, descY);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(71, 85, 105);
            const splitTrans = doc.splitTextToSize(dayTrans, textWidth - 18);
            doc.text(splitTrans, textX + 18, descY);
            descY += (splitTrans.length * 4.0);
          }
          if (dayMeals) {
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(8.5); // Increased from 7.5
            doc.setTextColor(15, 23, 42);
            doc.text('Meals: ', textX, descY);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(71, 85, 105);
            doc.text(dayMeals, textX + 14, descY);
            descY += 5;
          }
          if (dayAct) {
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(8.5); // Increased from 7.5
            doc.setTextColor(15, 23, 42);
            doc.text('Activity: ', textX, descY);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(71, 85, 105);
            const splitAct = doc.splitTextToSize(dayAct, textWidth - 16);
            doc.text(splitAct, textX + 16, descY);
            descY += (splitAct.length * 4.0);
          }
        } else {
          // ODD DAY: Text on LEFT (14mm to 100mm), Image on RIGHT (Bleed 105mm to 210mm)
          if (dayImgBase64) {
            doc.addImage(dayImgBase64, 'JPEG', 105, yPos, halfWidth, blockHeight);
          }

          const textX = marginX;
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(9); // Increased from 8
          doc.setTextColor(8, 145, 178); // Cyan accent
          doc.text(`${t.day.toUpperCase()} ${dayItem.day}`, textX, yPos + 6);

          doc.setFontSize(10.5); // Increased from 9.5
          doc.setTextColor(15, 23, 42);
          const splitTitle = doc.splitTextToSize(dayTitle, textWidth);
          doc.text(splitTitle, textX, yPos + 11.5);
          let descY = yPos + 11.5 + (splitTitle.length * 4.8);

          // Render all full paragraphs
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(9); // Increased from 8
          doc.setTextColor(51, 65, 85);
          for (const paraLines of wrappedParagraphs) {
            doc.text(paraLines, textX, descY);
            descY += (paraLines.length * 4.1) + 2.8;
          }

          // Render metadata badges
          if (dayAcc) {
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(8.5); // Increased from 7.5
            doc.setTextColor(15, 23, 42);
            doc.text('Overnight: ', textX, descY);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(71, 85, 105);
            doc.text(dayAcc, textX + 18, descY);
            descY += 5;
          }
          if (dayTrans) {
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(8.5); // Increased from 7.5
            doc.setTextColor(15, 23, 42);
            doc.text('Transport: ', textX, descY);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(71, 85, 105);
            const splitTrans = doc.splitTextToSize(dayTrans, textWidth - 18);
            doc.text(splitTrans, textX + 18, descY);
            descY += (splitTrans.length * 4.0);
          }
          if (dayMeals) {
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(8.5); // Increased from 7.5
            doc.setTextColor(15, 23, 42);
            doc.text('Meals: ', textX, descY);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(71, 85, 105);
            doc.text(dayMeals, textX + 14, descY);
            descY += 5;
          }
          if (dayAct) {
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(8.5); // Increased from 7.5
            doc.setTextColor(15, 23, 42);
            doc.text('Activity: ', textX, descY);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(71, 85, 105);
            const splitAct = doc.splitTextToSize(dayAct, textWidth - 16);
            doc.text(splitAct, textX + 16, descY);
            descY += (splitAct.length * 4.0);
          }
        }

        yPos += blockHeight + 8;
      }
    }
  }

  // 6. INCLUSIONS & EXCLUSIONS (FULL UNTRUNCATED COMPILATION WITH VECTOR CHECKMARKS)
  if (inclusions.length > 0 || exclusions.length > 0) {
    checkPageBreak(35);
    yPos += 4;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(8, 145, 178); // Cyan header
    doc.text(t.inclusions.toUpperCase(), marginX, yPos);
    doc.setDrawColor(207, 250, 254);
    doc.setLineWidth(0.8);
    doc.line(marginX, yPos + 2, marginX + contentWidth, yPos + 2);
    yPos += 8;

    inclusions.forEach((inc) => {
      const incText = getLocalizedText(inc, locale);
      const splitInc = doc.splitTextToSize(incText, contentWidth - 10);
      const itemHeight = (splitInc.length * 4.5) + 2;
      checkPageBreak(itemHeight);

      // Vector Green Checkmark
      doc.setFillColor(16, 185, 129); // emerald-500
      doc.circle(marginX + 2.5, yPos + 2, 2.0, 'F');
      doc.setDrawColor(255, 255, 255);
      doc.setLineWidth(0.5);
      doc.line(marginX + 1.5, yPos + 2, marginX + 2.3, yPos + 2.8);
      doc.line(marginX + 2.3, yPos + 2.8, marginX + 3.5, yPos + 1.1);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5); // Increased from 8.5
      doc.setTextColor(30, 41, 59);
      doc.text(splitInc, marginX + 7, yPos + 3);
      yPos += itemHeight;
    });

    if (exclusions.length > 0) {
      yPos += 4;
      checkPageBreak(25);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(8, 145, 178);
      doc.text(t.exclusions.toUpperCase(), marginX, yPos);
      doc.setDrawColor(207, 250, 254);
      doc.setLineWidth(0.8);
      doc.line(marginX, yPos + 2, marginX + contentWidth, yPos + 2);
      yPos += 8;

      exclusions.forEach((exc) => {
        const excText = getLocalizedText(exc, locale);
        const splitExc = doc.splitTextToSize(excText, contentWidth - 10);
        const itemHeight = (splitExc.length * 4.5) + 2;
        checkPageBreak(itemHeight);

        // Vector Red Cross
        doc.setFillColor(225, 29, 72); // rose-600
        doc.circle(marginX + 2.5, yPos + 2, 2.0, 'F');
        doc.setDrawColor(255, 255, 255);
        doc.setLineWidth(0.5);
        doc.line(marginX + 1.6, yPos + 1.1, marginX + 3.4, yPos + 2.9);
        doc.line(marginX + 3.4, yPos + 1.1, marginX + 1.6, yPos + 2.9);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9.5); // Increased from 8.5
        doc.setTextColor(100, 116, 139);
        doc.text(splitExc, marginX + 7, yPos + 3);
        yPos += itemHeight;
      });
    }
  }

  // 7. WATERMARK & FOOTER ON ALL PAGES
  const totalPages = doc.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);

    // Subtle Brand Watermark Centered on Every Page
    if (logoWatermarkBase64) {
      doc.setGState(new (doc as any).GState({ opacity: 0.05 }));
      const wmWidth = 110;
      const wmHeight = 44;
      doc.addImage(logoWatermarkBase64, 'PNG', (pageWidth - wmWidth) / 2, (pageHeight - wmHeight) / 2, wmWidth, wmHeight);
      doc.setGState(new (doc as any).GState({ opacity: 1.0 }));
    }

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(148, 163, 184);
    doc.text(t.footerText, marginX, pageHeight - 8);
    doc.text(`Page ${p} of ${totalPages}`, pageWidth - marginX, pageHeight - 8, { align: 'right' });
  }

  // Sanitize filename
  const cleanFilename = title.replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-');
  const filename = `Vermilion-Routes-Itinerario-${cleanFilename}.pdf`;

  // DIRECT FILE DOWNLOAD IN BROWSER
  doc.save(filename);
}
