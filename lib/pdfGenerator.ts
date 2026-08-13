import { Tour } from '@/types';
import { getLocalizedText } from '@/utils/i18nHelper';

const PDF_TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    itineraryTitle: "Official Itinerary & Travel Guide 2026",
    duration: "Duration",
    destination: "Destination",
    category: "Category",
    pricing: "Pricing Options per Person",
    hotel3star: "3★ Comfort Hotels",
    hotel4star: "4★ Luxury / Premium Hotels",
    dayByDay: "Day-by-Day Detailed Itinerary",
    day: "Day",
    meals: "Meals Included",
    accommodation: "Accommodation",
    inclusions: "Program Includes",
    exclusions: "Program Does Not Include",
    importantNotes: "Important Travel Notes",
    footerText: "Vermilion South American Routes • Certified Tour Operator Ecuador & Galapagos • 24/7 Specialist Support",
    downloadBtnText: "Download Itinerary",
    printNotice: "Your PDF is being generated..."
  },
  es: {
    itineraryTitle: "Itinerario Oficial y Guía de Viaje 2026",
    duration: "Duración",
    destination: "Destino",
    category: "Categoría",
    pricing: "Opciones de Tarifa por Persona",
    hotel3star: "Hoteles 3★ Confort",
    hotel4star: "Hoteles 4★ Lujo / Premium",
    dayByDay: "Itinerario Detallado Día por Día",
    day: "Día",
    meals: "Comidas Incluidas",
    accommodation: "Hospedaje",
    inclusions: "El Programa Incluye",
    exclusions: "El Programa No Incluye",
    importantNotes: "Notas Importantes de Viaje",
    footerText: "Vermilion South American Routes • Operador Turístico Certificado Ecuador y Galápagos • Soporte 24/7",
    downloadBtnText: "Descargar Itinerario",
    printNotice: "Generando tu PDF de lujo..."
  },
  fr: {
    itineraryTitle: "Itinéraire Officiel & Guide de Voyage 2026",
    duration: "Durée",
    destination: "Destination",
    category: "Catégorie",
    pricing: "Tarifs par Personne",
    hotel3star: "Hôtels 3★ Confort",
    hotel4star: "Hôtels 4★ Luxe",
    dayByDay: "Itinéraire Détaillé Jour par Jour",
    day: "Jour",
    meals: "Repas Inclus",
    accommodation: "Hébergement",
    inclusions: "Le Programme Comprend",
    exclusions: "Le Programme Ne Comprend Pas",
    importantNotes: "Remarques Importantes",
    footerText: "Vermilion South American Routes • Voyagiste Certifié Équateur & Galapagos",
    downloadBtnText: "Télécharger Itinéraire",
    printNotice: "Génération de votre PDF..."
  },
  de: {
    itineraryTitle: "Offizieller Reiseplan & Reiseführer 2026",
    duration: "Dauer",
    destination: "Reiseziel",
    category: "Kategorie",
    pricing: "Preise pro Person",
    hotel3star: "3★ Komfort Hotels",
    hotel4star: "4★ Luxus Hotels",
    dayByDay: "Detaillierter Tagesablauf",
    day: "Tag",
    meals: "Enthaltene Mahlzeiten",
    accommodation: "Unterkunft",
    inclusions: "Im Preis Enthalten",
    exclusions: "Nicht Enthalten",
    importantNotes: "Wichtige Hinweise",
    footerText: "Vermilion South American Routes • Zertifizierter Reiseveranstalter",
    downloadBtnText: "Reiseplan Herunterladen",
    printNotice: "PDF wird erstellt..."
  },
  it: {
    itineraryTitle: "Itinerario Ufficiale e Guida 2026",
    duration: "Durata",
    destination: "Destinazione",
    category: "Categoria",
    pricing: "Prezzi per Persona",
    hotel3star: "Hotel 3★ Comfort",
    hotel4star: "Hotel 4★ Lusso",
    dayByDay: "Itinerario Dettagliato Giorno per Giorno",
    day: "Giorno",
    meals: "Pasti Inclusi",
    accommodation: "Alloggio",
    inclusions: "Il Programma Include",
    exclusions: "Il Programma Non Include",
    importantNotes: "Note Importanti",
    footerText: "Vermilion South American Routes • Tour Operator Certificato",
    downloadBtnText: "Scarica Itinerario",
    printNotice: "Generazione del PDF..."
  },
  pt: {
    itineraryTitle: "Itinerário Oficial e Guia de Viagem 2026",
    duration: "Duração",
    destination: "Destino",
    category: "Categoria",
    pricing: "Opções de Tarifa por Pessoa",
    hotel3star: "Hotéis 3★ Conforto",
    hotel4star: "Hotéis 4★ Luxo",
    dayByDay: "Itinerário Detalhado Dia a Dia",
    day: "Dia",
    meals: "Refeições Incluídas",
    accommodation: "Hospedagem",
    inclusions: "O Programa Inclui",
    exclusions: "O Programa Não Inclui",
    importantNotes: "Notas Importantes",
    footerText: "Vermilion South American Routes • Operador Turístico Certificado",
    downloadBtnText: "Baixar Itinerário",
    printNotice: "Gerando seu PDF..."
  },
  ja: {
    itineraryTitle: "公式旅程＆旅行ガイド 2026",
    duration: "期間",
    destination: "目的地",
    category: "カテゴリー",
    pricing: "1人あたりの料金オプション",
    hotel3star: "3★コンフォートホテル",
    hotel4star: "4★ラグジュアリーホテル",
    dayByDay: "日別の詳細旅程",
    day: "日目",
    meals: "含まれる食事",
    accommodation: "宿泊施設",
    inclusions: "ツアーに含まれるもの",
    exclusions: "ツアーに含まれないもの",
    importantNotes: "重要な注意事項",
    footerText: "Vermilion South American Routes • 認定旅行会社",
    downloadBtnText: "旅程をダウンロード",
    printNotice: "PDFを作成中..."
  },
  zh: {
    itineraryTitle: "官方行程与旅行指南 2026",
    duration: "行程时长",
    destination: "目的地",
    category: "线路类别",
    pricing: "每人价格选项",
    hotel3star: "3★ 舒适型酒店",
    hotel4star: "4★ 豪华/尊享型酒店",
    dayByDay: "逐日详细行程",
    day: "第",
    meals: "包含餐饮",
    accommodation: "住宿安排",
    inclusions: "费用包含",
    exclusions: "费用不含",
    importantNotes: "重要注意事项",
    footerText: "Vermilion South American Routes • 官方认证旅行社",
    downloadBtnText: "下载行程单",
    printNotice: "正在为您生成PDF..."
  }
};

export function generateTourPDF(tour: Tour, locale: string = 'es') {
  if (typeof window === 'undefined') return;

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

  const origin = window.location.origin;
  const logoUrl = `${origin}/logo_inicio.png`;
  const bannerUrl = `${origin}/images/brand_assets/21_banner_branding.png`;
  const rawCover = tour.desktopImage || tour.imageUrl;
  const tourCoverUrl = rawCover.startsWith('http') ? rawCover : `${origin}${rawCover}`;

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="${locale}">
    <head>
      <meta charset="UTF-8">
      <title>${title} - ${t.itineraryTitle}</title>
      <style>
        @page {
          size: A4;
          margin: 10mm 12mm 12mm 12mm;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          color: #0f172a;
          margin: 0;
          padding: 15px;
          background: #ffffff;
          font-size: 13px;
          line-height: 1.5;
        }
        .header-letterhead {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 15px 20px;
          background: linear-gradient(135deg, #022c22 0%, #064e3b 100%);
          border-radius: 12px;
          color: #ffffff;
          margin-bottom: 20px;
          box-shadow: 0 4px 12px rgba(2, 44, 34, 0.15);
        }
        .logo-img {
          height: 48px;
          object-fit: contain;
        }
        .brand-meta {
          text-align: right;
          font-size: 11px;
          color: #a7f3d0;
        }
        .brand-title {
          font-size: 15px;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: 1px;
          text-transform: uppercase;
        }
        .tour-cover-box {
          position: relative;
          width: 100%;
          height: 220px;
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 20px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }
        .tour-cover-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .tour-cover-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(2, 44, 34, 0.85) 0%, transparent 60%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 20px;
          color: #ffffff;
        }
        .tour-title {
          font-size: 24px;
          font-weight: 900;
          color: #ffffff;
          margin: 0 0 6px 0;
          text-transform: uppercase;
          letter-spacing: -0.5px;
          text-shadow: 0 2px 4px rgba(0,0,0,0.5);
        }
        .tour-badge-row {
          display: flex;
          gap: 10px;
          font-size: 11px;
          font-weight: 700;
          flex-wrap: wrap;
        }
        .badge-item {
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(4px);
          color: #ffffff;
          padding: 4px 12px;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        .tour-desc-box {
          font-size: 13px;
          color: #334155;
          line-height: 1.6;
          margin-bottom: 20px;
          padding: 14px 18px;
          background: #f8fafc;
          border-left: 4px solid #059669;
          border-radius: 0 8px 8px 0;
        }
        .pricing-card-container {
          display: flex;
          gap: 15px;
          margin: 20px 0;
        }
        .price-box {
          flex: 1;
          background: #f0fdf4;
          padding: 14px;
          border-radius: 10px;
          border: 1px solid #a7f3d0;
        }
        .price-title {
          font-size: 11px;
          font-weight: 700;
          color: #166534;
          text-transform: uppercase;
          margin-bottom: 4px;
        }
        .price-val {
          font-size: 22px;
          font-weight: 900;
          color: #047857;
        }
        .section-heading {
          font-size: 15px;
          font-weight: 800;
          color: #064e3b;
          border-bottom: 2px solid #e2e8f0;
          padding-bottom: 6px;
          margin-top: 25px;
          margin-bottom: 15px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .day-block {
          margin-bottom: 16px;
          padding: 12px 14px;
          background: #ffffff;
          border-left: 4px solid #059669;
          border-radius: 0 8px 8px 0;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
          page-break-inside: avoid;
        }
        .day-num {
          font-size: 11px;
          font-weight: 800;
          color: #059669;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .day-title {
          font-size: 14px;
          font-weight: 700;
          color: #0f172a;
          margin: 2px 0 6px 0;
        }
        .day-desc {
          color: #334155;
          font-size: 12px;
          margin-bottom: 6px;
        }
        .day-meta {
          font-size: 11px;
          font-weight: 600;
          color: #475569;
          margin-top: 4px;
        }
        .inc-list {
          padding-left: 20px;
          margin: 0;
        }
        .inc-list li {
          margin-bottom: 6px;
          font-size: 12px;
          color: #1e293b;
        }
        .footer-note {
          margin-top: 35px;
          padding-top: 15px;
          border-top: 1px solid #e2e8f0;
          text-align: center;
          font-size: 11px;
          color: #64748b;
          font-weight: 600;
        }

        @media print {
          body {
            padding: 0;
          }
          .no-print {
            display: none !important;
          }
        }
      </style>
      <script>
        window.onload = function() {
          setTimeout(function() {
            window.print();
          }, 400);
        };
      </script>
    </head>
    <body>
      <!-- Header Banner -->
      <div class="header-letterhead">
        <img src="${logoUrl}" class="logo-img" alt="Vermilion Routes" />
        <div class="brand-meta">
          <div class="brand-title">VERMILION ROUTES</div>
          <div>Bespoke Travel • Ecuador & Galapagos</div>
        </div>
      </div>

      <!-- Tour Cover Image -->
      <div class="tour-cover-box">
        <img src="${tourCoverUrl}" class="tour-cover-img" alt="${title}" />
        <div class="tour-cover-overlay">
          <h1 class="tour-title">${title}</h1>
          <div class="tour-badge-row">
            <span class="badge-item">📍 ${destination}</span>
            <span class="badge-item">⏱️ ${duration}</span>
            <span class="badge-item">✨ ${category}</span>
          </div>
        </div>
      </div>

      <!-- Description -->
      <div class="tour-desc-box">
        ${description}
      </div>

      <!-- Pricing Options -->
      <div class="pricing-card-container">
        <div class="price-box">
          <div class="price-title">${t.hotel3star}</div>
          <div class="price-val">$${price3Star} USD <span style="font-size: 12px; font-weight: normal; color: #475569;">/ pers.</span></div>
        </div>
        <div class="price-box" style="background: #faf5ff; border-color: #e9d5ff;">
          <div class="price-title" style="color: #7e22ce;">${t.hotel4star}</div>
          <div class="price-val" style="color: #7e22ce;">$${price4Star} USD <span style="font-size: 12px; font-weight: normal; color: #475569;">/ pers.</span></div>
        </div>
      </div>

      <!-- Itinerary -->
      ${itinerary.length > 0 ? `
        <div class="section-heading">${t.dayByDay}</div>
        ${itinerary.map((dayItem) => `
          <div class="day-block">
            <div class="day-num">${t.day} ${dayItem.day}</div>
            <div class="day-title">${getLocalizedText(dayItem.title, locale)}</div>
            <div class="day-desc">${getLocalizedText(dayItem.description, locale)}</div>
            ${dayItem.meals ? `<div class="day-meta">🍽️ ${t.meals}: ${getLocalizedText(dayItem.meals, locale)}</div>` : ''}
            ${dayItem.accommodation ? `<div class="day-meta">🏨 ${t.accommodation}: ${getLocalizedText(dayItem.accommodation, locale)}</div>` : ''}
          </div>
        `).join('')}
      ` : ''}

      <!-- Inclusions -->
      ${inclusions.length > 0 ? `
        <div class="section-heading">${t.inclusions}</div>
        <ul class="inc-list">
          ${inclusions.map((inc) => `<li>✔️ ${getLocalizedText(inc, locale)}</li>`).join('')}
        </ul>
      ` : ''}

      <!-- Exclusions -->
      ${exclusions.length > 0 ? `
        <div class="section-heading">${t.exclusions}</div>
        <ul class="inc-list">
          ${exclusions.map((exc) => `<li style="color: #64748b;">❌ ${getLocalizedText(exc, locale)}</li>`).join('')}
        </ul>
      ` : ''}

      <div class="footer-note">
        ${t.footerText}
      </div>
    </body>
    </html>
  `;

  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  }
}
