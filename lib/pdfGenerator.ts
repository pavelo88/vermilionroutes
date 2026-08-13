import { jsPDF } from 'jspdf';
import { Tour } from '@/types';
import { getLocalizedText } from '@/utils/i18nHelper';

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
 * Checks if a day is a functional/logistical day (free day, flight, transfer, departure)
 */
function isFunctionalDay(title: string, desc: string): boolean {
  const combined = `${title} ${desc}`.toLowerCase();
  return /libre|free|vuelo|flight|traslado|transfer|salida|departure|airport|aeropuerto/i.test(combined);
}

/**
 * Checks if a day triggers a regional chapter transition (e.g. Continental Ecuador -> Galapagos)
 */
function isGalapagosRegion(title: string, desc: string): boolean {
  const combined = `${title} ${desc}`.toLowerCase();
  return /galápagos|galapagos|baltra|santa cruz|isabela|san cristóbal|san cristobal|tintoreras/i.test(combined);
}

/**
 * Loads an image from a URL and converts it to Base64 JPEG data
 */
async function loadImageAsBase64(url: string): Promise<string | null> {
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
          const dataURL = canvas.toDataURL('image/jpeg', 0.85);
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

  const title = getLocalizedText(tour.title, locale);
  const destination = getLocalizedText(tour.destination, locale);
  const duration = getLocalizedText(tour.duration, locale);
  const category = getLocalizedText(tour.category, locale);
  const description = getLocalizedText(tour.description, locale);

  const price3Star = tour.price3Star || tour.price;
  const price4Star = tour.price4Star || Math.round(tour.price * 1.15);

  const itinerary = tour.itinerary || [];
  const inclusions = tour.inclusions || [];
  const exclusions = tour.exclusions || [];
  const gallery = tour.gallery || [];

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

  // Pre-load logo, cover & gallery images
  const logoBase64 = await loadImageAsBase64('/logo_inicio.png');
  const coverImgPath = tour.desktopImage || tour.imageUrl;
  const coverBase64 = await loadImageAsBase64(coverImgPath);

  const dayImagesBase64: (string | null)[] = [];
  for (let i = 0; i < itinerary.length; i++) {
    const imgUrl = gallery[i] || gallery[i % gallery.length] || coverImgPath;
    const b64 = await loadImageAsBase64(imgUrl);
    dayImagesBase64.push(b64);
  }

  // 1. BRAND HEADER (Strictly Left-Aligned Logo & Branding)
  doc.setFillColor(2, 44, 34); // #022c22 (Dark Emerald)
  doc.rect(0, 0, pageWidth, 26, 'F');

  // LOGO STRICTLY ON THE LEFT
  if (logoBase64) {
    doc.addImage(logoBase64, 'PNG', marginX, 3.5, 48, 19);
  } else {
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('VERMILION ROUTES', marginX, 12);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(167, 243, 208); // #a7f3d0
    doc.text('SOUTH AMERICAN ROUTES • BESPOKE TRAVEL', marginX, 19);
  }

  // Document title aligned right
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(255, 255, 255);
  doc.text(t.itineraryTitle, pageWidth - marginX, 15, { align: 'right' });

  yPos = 32;

  // 2. HERO COVER BANNER (FULL-BLEED LUXURY BANNER)
  if (coverBase64) {
    const coverHeight = 60;
    doc.addImage(coverBase64, 'JPEG', 0, yPos, pageWidth, coverHeight);
    
    // Dark gradient overlay at bottom of cover
    doc.setFillColor(0, 0, 0);
    doc.setGState(new (doc as any).GState({ opacity: 0.5 }));
    doc.rect(0, yPos + 38, pageWidth, 22, 'F');
    doc.setGState(new (doc as any).GState({ opacity: 1.0 }));

    // Overlay Title & Badges
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(255, 255, 255);
    doc.text(title.toUpperCase(), marginX, yPos + 48);

    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text(`[ ${destination} ]   •   [ ${duration} ]   •   [ ${category} ]`, marginX, yPos + 54);

    yPos += coverHeight + 10;
  } else {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(2, 44, 34);
    doc.text(title.toUpperCase(), marginX, yPos + 6);
    yPos += 16;
  }

  // 3. OVERVIEW / DESCRIPTION BOX (FULL UNTRUNCATED TEXT)
  if (description) {
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(5, 150, 105);
    doc.setLineWidth(1);

    const splitDesc = doc.splitTextToSize(description, contentWidth - 10);
    const descBoxHeight = (splitDesc.length * 4.5) + 8;

    doc.rect(marginX, yPos, contentWidth, descBoxHeight, 'F');
    doc.line(marginX, yPos, marginX, yPos + descBoxHeight); // Left accent border

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(51, 65, 85);
    doc.text(splitDesc, marginX + 5, yPos + 6);

    yPos += descBoxHeight + 8;
  }

  // 4. PRICING CARDS
  const cardWidth = (contentWidth - 6) / 2; // 88mm each
  const cardHeight = 20;

  // 3-Star Card
  doc.setFillColor(240, 253, 244);
  doc.setDrawColor(167, 243, 208);
  doc.roundedRect(marginX, yPos, cardWidth, cardHeight, 2, 2, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(22, 101, 52);
  doc.text(t.hotel3star.toUpperCase(), marginX + 6, yPos + 7);
  doc.setFontSize(13);
  doc.setTextColor(4, 120, 87);
  doc.text(`$${price3Star} USD`, marginX + 6, yPos + 15);

  // 4-Star Card
  const card2X = marginX + cardWidth + 6;
  doc.setFillColor(250, 245, 255);
  doc.setDrawColor(233, 213, 255);
  doc.roundedRect(card2X, yPos, cardWidth, cardHeight, 2, 2, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(126, 34, 206);
  doc.text(t.hotel4star.toUpperCase(), card2X + 6, yPos + 7);
  doc.setFontSize(13);
  doc.setTextColor(126, 34, 206);
  doc.text(`$${price4Star} USD`, card2X + 6, yPos + 15);

  yPos += cardHeight + 12;

  // Helper for adding new pages cleanly
  const checkPageBreak = (neededHeight: number) => {
    if (yPos + neededHeight > pageHeight - 22) {
      doc.addPage();
      yPos = 16;
      // Mini top accent line on new page
      doc.setFillColor(2, 44, 34);
      doc.rect(0, 0, pageWidth, 5, 'F');
      return true;
    }
    return false;
  };

  // Track regional chapter transitions
  let currentRegionIsGalapagos = false;
  let mainDayIndex = 0; // Index counter for zig-zag layout alternation

  // 5. MAGAZINE-STYLE DAY-BY-DAY ITINERARY WITH CONDITIONAL ZIG-ZAG & FULL-BLEED IMAGES
  if (itinerary.length > 0) {
    checkPageBreak(15);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(6, 78, 59);
    doc.text(t.dayByDay.toUpperCase(), marginX, yPos);
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.5);
    doc.line(marginX, yPos + 2, marginX + contentWidth, yPos + 2);
    yPos += 10;

    for (let i = 0; i < itinerary.length; i++) {
      const dayItem = itinerary[i];
      const dayTitle = getLocalizedText(dayItem.title, locale);
      const dayDesc = getLocalizedText(dayItem.description, locale);
      const dayMeals = dayItem.meals ? getLocalizedText(dayItem.meals, locale) : '';
      const dayAcc = dayItem.accommodation ? getLocalizedText(dayItem.accommodation, locale) : '';
      const dayImgBase64 = dayImagesBase64[i];

      const isFunctional = isFunctionalDay(dayTitle, dayDesc);
      const isGalapagos = isGalapagosRegion(dayTitle, dayDesc);

      // REGIONAL CHAPTER DIVIDER DISCOVERY
      if (isGalapagos && !currentRegionIsGalapagos) {
        currentRegionIsGalapagos = true;
        checkPageBreak(24);
        yPos += 4;

        // Full-Bleed Chapter Banner Block (0 to 210mm width)
        doc.setFillColor(2, 44, 34);
        doc.rect(0, yPos, pageWidth, 22, 'F');
        
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.setTextColor(234, 179, 8); // Gold accent #eab308
        doc.text(t.galapagosChapterTitle.toUpperCase(), marginX, yPos + 13);
        
        yPos += 28;
      }

      if (isFunctional) {
        // FUNCTIONAL DAY: COMPACT STRIP FORMAT (No large 50% bleed image)
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        const splitDayDesc = doc.splitTextToSize(dayDesc, contentWidth - 12);
        const blockHeight = 12 + (splitDayDesc.length * 4) + (dayMeals ? 4 : 0);

        checkPageBreak(blockHeight + 4);

        doc.setFillColor(248, 250, 252); // Soft gray strip
        doc.setDrawColor(203, 213, 225);
        doc.roundedRect(marginX, yPos, contentWidth, blockHeight, 2, 2, 'FD');

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(71, 85, 105);
        doc.text(`${t.day.toUpperCase()} ${dayItem.day} • [ LOGÍSTICA / DÍA LIBRE ]`, marginX + 5, yPos + 6);

        doc.setFontSize(9.5);
        doc.setTextColor(15, 23, 42);
        doc.text(dayTitle, marginX + 5, yPos + 11);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(51, 65, 85);
        let descY = yPos + 16;
        doc.text(splitDayDesc, marginX + 5, descY);
        descY += (splitDayDesc.length * 4);

        if (dayMeals) {
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(7.5);
          doc.setTextColor(71, 85, 105);
          doc.text(`MEALS: ${dayMeals}`, marginX + 5, descY + 2);
        }

        yPos += blockHeight + 6;
      } else {
        // MAIN DAY: DYNAMIC ZIG-ZAG LAYOUT WITH 50% BLEED IMAGE (105mm width)
        const isEven = (mainDayIndex % 2 === 0);
        mainDayIndex++;

        const halfWidth = 105; // 50% A4 width = 105mm
        const imageBlockHeight = 48; // 48mm height for bleed image
        const textWidth = 84; // Width for text column

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        const splitDayDesc = doc.splitTextToSize(dayDesc, textWidth);
        const textBlockHeight = 14 + (splitDayDesc.length * 4) + (dayMeals ? 5 : 0) + (dayAcc ? 5 : 0);
        const blockHeight = Math.max(textBlockHeight, imageBlockHeight);

        checkPageBreak(blockHeight + 8);

        if (isEven) {
          // EVEN DAY: Image on LEFT (Bleed 0 to 105mm), Text on RIGHT (112mm to 196mm)
          if (dayImgBase64) {
            doc.addImage(dayImgBase64, 'JPEG', 0, yPos, halfWidth, imageBlockHeight);
          }

          const textX = 112;
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(8);
          doc.setTextColor(5, 150, 105);
          doc.text(`${t.day.toUpperCase()} ${dayItem.day}`, textX, yPos + 6);

          doc.setFontSize(10);
          doc.setTextColor(15, 23, 42);
          doc.text(dayTitle, textX, yPos + 11);

          doc.setFont('helvetica', 'normal');
          doc.setFontSize(8.5);
          doc.setTextColor(51, 65, 85);
          let descY = yPos + 16;
          doc.text(splitDayDesc, textX, descY);
          descY += (splitDayDesc.length * 4) + 1;

          if (dayMeals) {
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(7.5);
            doc.setTextColor(71, 85, 105);
            doc.text(`MEALS: ${dayMeals}`, textX, descY);
            descY += 4;
          }

          if (dayAcc) {
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(7.5);
            doc.setTextColor(71, 85, 105);
            doc.text(`HOTEL: ${dayAcc}`, textX, descY);
          }
        } else {
          // ODD DAY: Text on LEFT (14mm to 98mm), Image on RIGHT (Bleed 105mm to 210mm)
          if (dayImgBase64) {
            doc.addImage(dayImgBase64, 'JPEG', 105, yPos, halfWidth, imageBlockHeight);
          }

          const textX = marginX;
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(8);
          doc.setTextColor(5, 150, 105);
          doc.text(`${t.day.toUpperCase()} ${dayItem.day}`, textX, yPos + 6);

          doc.setFontSize(10);
          doc.setTextColor(15, 23, 42);
          doc.text(dayTitle, textX, yPos + 11);

          doc.setFont('helvetica', 'normal');
          doc.setFontSize(8.5);
          doc.setTextColor(51, 65, 85);
          let descY = yPos + 16;
          doc.text(splitDayDesc, textX, descY);
          descY += (splitDayDesc.length * 4) + 1;

          if (dayMeals) {
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(7.5);
            doc.setTextColor(71, 85, 105);
            doc.text(`MEALS: ${dayMeals}`, textX, descY);
            descY += 4;
          }

          if (dayAcc) {
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(7.5);
            doc.setTextColor(71, 85, 105);
            doc.text(`HOTEL: ${dayAcc}`, textX, descY);
          }
        }

        yPos += blockHeight + 8;
      }
    }
  }

  // 6. INCLUSIONS & EXCLUSIONS (FULL UNTRUNCATED COMPILATION)
  if (inclusions.length > 0 || exclusions.length > 0) {
    checkPageBreak(35);
    yPos += 4;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(6, 78, 59);
    doc.text(t.inclusions.toUpperCase(), marginX, yPos);
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.5);
    doc.line(marginX, yPos + 2, marginX + contentWidth, yPos + 2);
    yPos += 8;

    inclusions.forEach((inc) => {
      const incText = getLocalizedText(inc, locale);
      checkPageBreak(6);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(5, 150, 105);
      doc.text('[✓]', marginX, yPos);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(30, 41, 59);
      doc.text(incText, marginX + 8, yPos);
      yPos += 5;
    });

    if (exclusions.length > 0) {
      yPos += 4;
      checkPageBreak(25);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(6, 78, 59);
      doc.text(t.exclusions.toUpperCase(), marginX, yPos);
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.5);
      doc.line(marginX, yPos + 2, marginX + contentWidth, yPos + 2);
      yPos += 8;

      exclusions.forEach((exc) => {
        const excText = getLocalizedText(exc, locale);
        checkPageBreak(6);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(225, 29, 72);
        doc.text('[X]', marginX, yPos);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(100, 116, 139);
        doc.text(excText, marginX + 8, yPos);
        yPos += 5;
      });
    }
  }

  // 7. WATERMARK & FOOTER ON ALL PAGES
  const totalPages = doc.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);

    // Subtle Brand Watermark Centered on Every Page
    if (logoBase64) {
      doc.setGState(new (doc as any).GState({ opacity: 0.06 }));
      const wmWidth = 110;
      const wmHeight = 44;
      doc.addImage(logoBase64, 'PNG', (pageWidth - wmWidth) / 2, (pageHeight - wmHeight) / 2, wmWidth, wmHeight);
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
