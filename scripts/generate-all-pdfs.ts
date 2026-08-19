import fs from 'fs';
import path from 'path';
import { jsPDF } from 'jspdf';
import { mockTours } from '../data/mock';
import { dailyTours } from '../data/dailyToursData';
import { Tour } from '../types';

const outputDir = path.resolve('C:/Users/pablo/Desktop/vermilion-pdfs');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function loadLocalImageAsBase64(relativeOrPublicPath: string): string | null {
  try {
    let cleanPath = relativeOrPublicPath;
    if (cleanPath.startsWith('/')) {
      cleanPath = path.join('public', cleanPath.slice(1));
    }
    const fullPath = path.resolve(cleanPath);
    if (fs.existsSync(fullPath)) {
      const buffer = fs.readFileSync(fullPath);
      const isPng = fullPath.toLowerCase().endsWith('.png');
      const mime = isPng ? 'image/png' : 'image/jpeg';
      return `data:${mime};base64,${buffer.toString('base64')}`;
    }
  } catch (err) {
    // ignore
  }
  return null;
}

function safeAddImage(doc: any, imgData: string | null, format: string, x: number, y: number, w: number, h: number) {
  if (!imgData || typeof imgData !== 'string' || !imgData.startsWith('data:')) return;
  try {
    doc.addImage(imgData, format, x, y, w, h);
  } catch (err) {
    // ignore image error in Node
  }
}

const PDF_TRANSLATIONS: Record<string, Record<string, string>> = {
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
    galapagosChapterTitle: "CAPÍTULO II: ISLAS GALÁPAGOS — EXPEDICIÓN MARINA",
    andesChapterTitle: "CAPÍTULO I: REGIÓN ANDINA Y AMAZONÍA",
    conciergeTitle: "CONCIERGE 24/7 WHATSAPP Y RESERVAS PERSONALIZADAS",
    conciergeDesc: "Escribe a +593 994 048 458 para personalizar fechas, mejorar hoteles o solicitar guías privados."
  }
};

function getLocalized(obj: any, locale: string = 'es'): string {
  if (!obj) return '';
  if (typeof obj === 'string') return obj;
  return obj[locale] || obj['es'] || obj['en'] || Object.values(obj)[0] || '';
}

function isFunctionalDay(title: string, desc: string): boolean {
  const t = title.toLowerCase();
  if (/crater|cráter|gemelos|primicias|tortuga|tortoise|tintoreras|lobería|loberia|grietas|waterfall|cascada|pailón|pailon|volcan|volcán|cotopaxi|quilotoa|chimborazo|yanacocha|amazon|rainforest|equator|mitad del mundo|city tour|panecillo|otavalo|papallacta|mindo|antisana|cajas|ingapirca/i.test(t)) {
    return false;
  }
  return /libre|free day|vuelo de retorno|departure.*flight|salida internacional|international departure/i.test(t);
}

function isGalapagosRegion(title: string, desc: string): boolean {
  const combined = `${title} ${desc}`.toLowerCase();
  return /galápagos|galapagos|baltra|santa cruz|isabela|san cristóbal|san cristobal|tintoreras/i.test(combined);
}

function drawHeaderBand(doc: any, logoBase64: string | null, pageWidth: number, marginX: number) {
  const headerH = 28;
  doc.setFillColor(27, 67, 50);
  doc.rect(0, 0, pageWidth, 3.5, 'F');
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 3.5, pageWidth, headerH - 3.5, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.line(0, headerH, pageWidth, headerH);

  if (logoBase64) {
    const logoW = 46;
    const logoH = 15;
    const logoY = 3.5 + ((headerH - 3.5 - logoH) / 2);
    safeAddImage(doc, logoBase64, 'PNG', marginX, logoY, logoW, logoH);
  }

  const cX = 142;
  const cY0 = 9.0;
  const cGap = 6.2;

  // Phone
  doc.setFillColor(27, 67, 50);
  doc.roundedRect(cX, cY0 - 3.0, 3.8, 3.8, 0.7, 0.7, 'F');
  doc.setFillColor(255, 255, 255);
  doc.rect(cX + 1.1, cY0 - 2.3, 1.6, 2.0, 'F');
  doc.setFillColor(27, 67, 50);
  doc.circle(cX + 1.9, cY0 - 0.7, 0.25, 'F');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.6);
  doc.setTextColor(30, 41, 59);
  doc.text('+(593) 994-048-458', cX + 5.5, cY0);

  // Email
  doc.setFillColor(27, 67, 50);
  doc.roundedRect(cX, cY0 + cGap - 3.0, 3.8, 3.0, 0.5, 0.5, 'F');
  doc.setDrawColor(255, 255, 255);
  doc.setLineWidth(0.28);
  doc.line(cX + 0.3, cY0 + cGap - 2.8, cX + 1.9, cY0 + cGap - 1.4);
  doc.line(cX + 3.5, cY0 + cGap - 2.8, cX + 1.9, cY0 + cGap - 1.4);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.6);
  doc.setTextColor(30, 41, 59);
  doc.text('info@vermilionroutes.com', cX + 5.5, cY0 + cGap);

  // Web
  doc.setFillColor(27, 67, 50);
  doc.circle(cX + 1.9, cY0 + (cGap * 2) - 1.4, 1.9, 'F');
  doc.setDrawColor(255, 255, 255);
  doc.setLineWidth(0.22);
  doc.line(cX, cY0 + (cGap * 2) - 1.4, cX + 3.8, cY0 + (cGap * 2) - 1.4);
  doc.line(cX + 1.9, cY0 + (cGap * 2) - 3.3, cX + 1.9, cY0 + (cGap * 2) + 0.5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.6);
  doc.setTextColor(30, 41, 59);
  doc.text('www.vermilionroutes.com', cX + 5.5, cY0 + (cGap * 2));
}

function buildPDFForTour(tour: Tour, locale: string = 'es'): Uint8Array {
  const t = PDF_TRANSLATIONS['es'];
  const isDailyTour = tour.durationDays === 1 || dailyTours.some(d => d.id === tour.id);

  const title = getLocalized(tour.title, locale);
  const destination = getLocalized(tour.destination, locale) || 'Ecuador';
  const duration = getLocalized(tour.duration, locale) || (isDailyTour ? '1 DÍA (FULL DAY)' : '7 DÍAS');
  const category = getLocalized(tour.category, locale) || (isDailyTour ? 'Excursión Full-Day' : 'Expedición Privada');
  const description = getLocalized(tour.description, locale);

  const price3Star = tour.price3Star ?? tour.price;
  const price4Star = tour.price4Star ?? Math.round((price3Star ?? 0) * 1.15);
  const singlePrice = tour.price || 89;

  const itinerary = tour.itinerary || [];
  const highlights = tour.highlights || [];
  const inclusions = tour.inclusions || [];
  const exclusions = tour.exclusions || [];
  const gallery = tour.gallery || [];

  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageWidth = 210;
  const pageHeight = 297;
  const marginX = 14;
  const marginRight = 14;
  const contentWidth = pageWidth - marginX - marginRight; // 182mm
  let yPos = 0;

  const logoBase64 = loadLocalImageAsBase64('/logo_inicio.png');
  const coverImgPath = tour.desktopImage || tour.imageUrl || '/images/tours/16-9/quito-iglesia-de-san-francisco-16-9.jpg';
  const coverBase64 = loadLocalImageAsBase64(coverImgPath);

  const dayImagesBase64: (string | null)[] = [];
  for (let i = 0; i < itinerary.length; i++) {
    const imgUrl = gallery[i] || gallery[i % gallery.length] || coverImgPath;
    dayImagesBase64.push(loadLocalImageAsBase64(imgUrl));
  }

  doc.setFillColor(250, 249, 246);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');
  drawHeaderBand(doc, logoBase64, pageWidth, marginX);
  yPos = 32;

  const checkPageBreak = (neededHeight: number) => {
    if (yPos + neededHeight > pageHeight - 16) {
      doc.addPage();
      doc.setFillColor(250, 249, 246);
      doc.rect(0, 0, pageWidth, pageHeight, 'F');
      drawHeaderBand(doc, logoBase64, pageWidth, marginX);
      yPos = 35;
      return true;
    }
    return false;
  };

  // Hero Cover
  if (coverBase64 && coverBase64.startsWith('data:')) {
    const coverHeight = 70;
    safeAddImage(doc, coverBase64, 'JPEG', 0, yPos, pageWidth, coverHeight);
    doc.setFillColor(0, 0, 0);
    doc.setGState(new (doc as any).GState({ opacity: 0.72 }));
    doc.rect(0, yPos + 44, pageWidth, 26, 'F');
    doc.setGState(new (doc as any).GState({ opacity: 1.0 }));

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12.5);
    doc.setTextColor(255, 255, 255);
    doc.text(title.toUpperCase(), marginX, yPos + 53);

    const bY = yPos + 59;
    const badgeHeight = 6.8;
    const badgePaddingX = 4;
    const b1Text = `[ ${destination.toUpperCase()} ]`;
    const b2Text = `[ ${category.toUpperCase()} ]`;
    const b3Text = isDailyTour ? '[ 1 DÍA (FULL DAY) ]' : `[ ${duration.toUpperCase()} ]`;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.2);
    let badgeX = marginX;
    [b1Text, b2Text, b3Text].forEach((bText) => {
      const textW = doc.getTextWidth(bText);
      const bW = textW + (badgePaddingX * 2);
      doc.setFillColor(30, 41, 59);
      doc.setGState(new (doc as any).GState({ opacity: 0.78 }));
      doc.roundedRect(badgeX, bY, bW, badgeHeight, 1.8, 1.8, 'F');
      doc.setGState(new (doc as any).GState({ opacity: 1.0 }));
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

  // Price
  if (isDailyTour) {
    doc.setFillColor(240, 253, 244);
    doc.setDrawColor(16, 185, 129);
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
    const cardWidth = (contentWidth - 6) / 2;
    const cardHeight = 17;
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

  // Description
  if (description) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.0);
    const paddingX = 6;
    const descTextWidth = contentWidth - (paddingX * 2);
    const splitDesc = doc.splitTextToSize(description, descTextWidth);
    const descBoxHeight = (splitDesc.length * 4.2) + 9;

    doc.setFillColor(255, 255, 255);
    doc.rect(marginX, yPos, contentWidth, descBoxHeight, 'F');
    doc.setFillColor(16, 185, 129);
    doc.rect(marginX, yPos, 2.5, descBoxHeight, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.rect(marginX, yPos, contentWidth, descBoxHeight, 'D');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.0);
    doc.setTextColor(51, 65, 85);
    doc.text(splitDesc, marginX + paddingX + 1, yPos + 5.8);
    yPos += descBoxHeight + 8;
  }

  // Highlights (1-day tours)
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
      const hText = getLocalized(h, locale);
      const splitH = doc.splitTextToSize(hText, contentWidth - 12);
      const hHeight = (splitH.length * 4.2) + 2;
      checkPageBreak(hHeight);
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

  // Itinerary
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

    const hasAndes = itinerary.some(d => {
      const tText = getLocalized(d.title, locale).toLowerCase();
      const dText = getLocalized(d.description, locale).toLowerCase();
      return /quito|baños|banos|amazon|tena|puyo|quilotoa|cotopaxi|cuenca|otavalo/i.test(`${tText} ${dText}`);
    });
    const hasGalapagos = itinerary.some(d => isGalapagosRegion(getLocalized(d.title, locale), getLocalized(d.description, locale)));
    const isMultiRegionCombo = hasAndes && hasGalapagos;

    for (let i = 0; i < itinerary.length; i++) {
      const dayItem = itinerary[i];
      const dayTitle = getLocalized(dayItem.title, locale);
      const rawDayDesc = getLocalized(dayItem.description, locale);
      const dayMeals = dayItem.meals ? getLocalized(dayItem.meals, locale) : '';
      const dayAcc = dayItem.accommodation ? getLocalized(dayItem.accommodation, locale) : '';
      const dayTrans = dayItem.transportation ? getLocalized(dayItem.transportation, locale) : '';
      const dayAct = dayItem.activity ? getLocalized(dayItem.activity, locale) : '';
      const dayImgBase64 = dayImagesBase64[i];

      const isFunctional = isFunctionalDay(dayTitle, rawDayDesc);
      const isGalapagos = isGalapagosRegion(dayTitle, rawDayDesc);

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
        doc.text(splitDayDesc, marginX + 6, descY);
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
        const isEven = (mainDayIndex % 2 === 0);
        mainDayIndex++;

        const imageWidth = 52;
        const gap = 6;
        const textWidth = contentWidth - imageWidth - gap; // 124mm

        const rawText = rawDayDesc.trim();
        const paragraphs = rawText.includes('\n')
          ? rawText.split(/\n\s*\n|\r\n\r\n|\n/).map(p => p.trim()).filter(Boolean)
          : [rawText];

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
          const imgX = marginX; // 14mm
          const textX = marginX + imageWidth + gap; // 72mm

          if (dayImgBase64 && dayImgBase64.startsWith('data:')) {
            safeAddImage(doc, dayImgBase64, 'JPEG', imgX, yPos, imageWidth, blockHeight);
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
          for (const paraLines of wrappedParagraphs) {
            doc.text(paraLines, textX, descY);
            descY += (paraLines.length * 4.2) + 2.6;
          }

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
          const textX = marginX; // 14mm
          const imgX = marginX + textWidth + gap; // 144mm

          if (dayImgBase64 && dayImgBase64.startsWith('data:')) {
            safeAddImage(doc, dayImgBase64, 'JPEG', imgX, yPos, imageWidth, blockHeight);
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
          for (const paraLines of wrappedParagraphs) {
            doc.text(paraLines, textX, descY);
            descY += (paraLines.length * 4.2) + 2.6;
          }

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

  // Inclusions & Exclusions
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
      const incText = getLocalized(inc, locale);
      const splitInc = doc.splitTextToSize(incText, contentWidth - 10);
      const itemHeight = (splitInc.length * 4.3) + 2.5;
      checkPageBreak(itemHeight);
      doc.setFillColor(16, 185, 129);
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
        const excText = getLocalized(exc, locale);
        const splitExc = doc.splitTextToSize(excText, contentWidth - 10);
        const itemHeight = (splitExc.length * 4.3) + 2.5;
        checkPageBreak(itemHeight);
        doc.setFillColor(225, 29, 72);
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

  // Concierge Badge
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

  // Footer & Watermark
  const totalPages = doc.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    if (logoBase64 && logoBase64.startsWith('data:')) {
      doc.setGState(new (doc as any).GState({ opacity: 0.05 }));
      const wmWidth = 100;
      const wmHeight = 40;
      safeAddImage(doc, logoBase64, 'PNG', (pageWidth - wmWidth) / 2, (pageHeight - wmHeight) / 2, wmWidth, wmHeight);
      doc.setGState(new (doc as any).GState({ opacity: 1.0 }));
    }
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(148, 163, 184);
    doc.text(t.footerText, marginX, pageHeight - 7);
    doc.text(`${p} / ${totalPages}`, pageWidth - marginRight, pageHeight - 7, { align: 'right' });
  }

  return Buffer.from(doc.output('arraybuffer'));
}

async function main() {
  const allTours = mockTours;
  console.log(`Generating ${allTours.length} official PDFs to ${outputDir}...`);

  for (const tour of allTours) {
    const title = getLocalized(tour.title, 'es');
    const cleanFilename = title.replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-');
    const filePath = path.join(outputDir, `Vermilion-Routes-${cleanFilename}.pdf`);

    const pdfBuffer = buildPDFForTour(tour, 'es');
    fs.writeFileSync(filePath, pdfBuffer);
    console.log(`✅ Generated: ${path.basename(filePath)} (${(pdfBuffer.length / 1024).toFixed(1)} KB)`);
  }

  console.log(`\n🎉 All ${allTours.length} PDFs generated successfully in ${outputDir}!`);
  process.exit(0);
}

main().catch(err => {
  console.error('Fatal error generating PDFs:', err);
  process.exit(1);
});
