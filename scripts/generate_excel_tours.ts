import ExcelJS from 'exceljs';
import path from 'path';
import fs from 'fs';

interface TourRow {
  categoryHeader?: string;
  categoryName: string;
  code: string;
  name: string;
  description: string;
  itinerary: string;
  pricePremium?: number;
  priceLuxury?: number;
  priceEmpty: string;
  duration: string;
}

const toursData: TourRow[] = [
  // 1. GALÁPAGOS
  {
    categoryHeader: '1. GALÁPAGOS (1.1 - 1.3)',
    categoryName: 'Galápagos',
    code: '1.1',
    name: 'Encuentro Galápagos: 4 Días De Magia',
    description: 'Explora Santa Cruz y sus tortugas gigantes en Rancho Primicias, excursión en yate a Isla Isabela con snorkel en Tintoreras y relax en Las Grietas.',
    itinerary: 'Día 1: Llegada a Baltra | Cráteres Gemelos | Rancho Primicias (tortugas gigantes)\nDía 2: Excursión en yate a Isla Isabela | Tintoreras | Laguna de Flamingos\nDía 3: La Lobería | Punta Estrada | Caminata a Las Grietas\nDía 4: Traslado al Aeropuerto de Baltra | Vuelo de salida',
    pricePremium: 1590,
    priceLuxury: 1899,
    priceEmpty: '',
    duration: '4 Días / 3 Noches'
  },
  {
    categoryName: 'Galápagos',
    code: '1.2',
    name: 'Expedición Galápagos: El Viaje De 5 Días',
    description: 'Aventura de 5 días visitando Santa Cruz, noche en Isla Isabela con Islote Tintoreras y navegación de día completo en yate hacia Santa Fe o Pinzón.',
    itinerary: 'Día 1: Llegada a Baltra | Cráteres Gemelos | Rancho Primicias\nDía 2: Traslado Santa Cruz a Isabela | Laguna de Flamingos | Tintoreras\nDía 3: Isabela a Santa Cruz | La Lobería | Las Grietas\nDía 4: Navegación de día completo a Isla Santa Fe o Isla Pinzón\nDía 5: Traslado al Aeropuerto de Baltra | Vuelo de salida',
    pricePremium: 1850,
    priceLuxury: 2099,
    priceEmpty: '',
    duration: '5 Días / 4 Noches'
  },
  {
    categoryName: 'Galápagos',
    code: '1.3',
    name: 'Viaje Encantado A Galápagos',
    description: 'Expedición de 6 días explorando 3 islas: Santa Cruz, Isabela y San Cristóbal, con fauna endémica, snorkel en yate y paisajes volcánicos únicos.',
    itinerary: 'Día 1: Llegada a Baltra | Cráteres Gemelos | Rancho Primicias\nDía 2: Santa Cruz a Isla Isabela | Centro de Crianza | Tintoreras\nDía 3: Isabela a Santa Cruz | La Lobería | Las Grietas\nDía 4: Excursión full-day en yate a Isla Santa Fe o Islote Pinzón\nDía 5: Santa Cruz a San Cristóbal | Centro de Interpretación | Tijeretas | La Lobería\nDía 6: San Cristóbal | Traslado al aeropuerto | Vuelo de salida',
    pricePremium: 2199,
    priceLuxury: 2499,
    priceEmpty: '',
    duration: '6 Días / 5 Noches'
  },

  // 2. ECUADOR CONTINENTAL
  {
    categoryHeader: '2. ECUADOR CONTINENTAL (2.1 - 2.4)',
    categoryName: 'Ecuador Continental',
    code: '2.1',
    name: 'De Los Andes A La Amazonía: Volcanes Y Ríos',
    description: 'Travesía de 8 días que conecta el Quito colonial, aguas termales de Papallacta, selva amazónica de Tena, cascadas de Baños y el cráter Quilotoa.',
    itinerary: 'Día 1: Llegada a Quito y traslado al hotel\nDía 2: City Tour colonial en Quito y visita a la Mitad del Mundo\nDía 3: Quito | Termas de Papallacta | Entrada a la Selva Amazónica\nDía 4: Tena | Navegación en canoa por el río y expedición en la selva\nDía 5: Tena | Bioparque Yanacocha en Puyo | Llegada a Baños\nDía 6: Baños de Agua Santa | Día libre de aventura o descanso\nDía 7: Baños | Mirador del cráter Quilotoa | Retorno a Quito\nDía 8: Traslado al aeropuerto de Quito para vuelo de salida',
    pricePremium: 1380,
    priceLuxury: 1650,
    priceEmpty: '',
    duration: '8 Días / 7 Noches'
  },
  {
    categoryName: 'Ecuador Continental',
    code: '2.2',
    name: 'Andes Místicos Y Selva Amazónica',
    description: 'Inmersión de 7 días entre el patrimonio histórico de Quito, relajación en Papallacta, expedición en la selva de Tena y fauna de la Reserva Paikawe.',
    itinerary: 'Día 1: Llegada a Quito y traslado al hotel\nDía 2: City Tour en Centro Histórico de Quito y Mitad del Mundo\nDía 3: Quito | Paso por Termas de Papallacta | Llegada al lodge en Tena\nDía 4: Día completo en la selva amazónica de Tena y vivencia Kichwa\nDía 5: Puerto Misahuallí | Fauna en Reserva Paikawe | Retorno a Quito\nDía 6: Día libre para explorar Quito a su propio ritmo\nDía 7: Traslado al aeropuerto de Quito para vuelo de salida',
    pricePremium: 1250,
    priceLuxury: 1490,
    priceEmpty: '',
    duration: '7 Días / 6 Noches'
  },
  {
    categoryName: 'Ecuador Continental',
    code: '2.3',
    name: 'Expedición Avenida De Los Volcanes',
    description: 'Recorrido de 6 días por la Avenida de los Volcanes, Baños de Agua Santa, la cascada Pailón del Diablo, bioparque en Puyo y el cráter Quilotoa.',
    itinerary: 'Día 1: Llegada a Quito y traslado al hotel\nDía 2: Quito a Baños por la Avenida de los Volcanes\nDía 3: Baños | Cascada Pailón del Diablo y selva en Puyo\nDía 4: Baños | Visita a la Laguna del Quilotoa | Retorno a Quito\nDía 5: Día libre en Quito para actividades personales o compras\nDía 6: Traslado al aeropuerto de Quito y salida internacional',
    pricePremium: 1100,
    priceLuxury: 1350,
    priceEmpty: '',
    duration: '6 Días / 5 Noches'
  },
  {
    categoryName: 'Ecuador Continental',
    code: '2.4',
    name: 'Ecuador Fantástico: El Circuito Completo',
    description: 'El gran circuito ecuatoriano de 8 días: Quito colonial, mercado de Otavalo, cascadas de Baños, Chimborazo, Ingapirca, Cuenca colonial y Guayaquil.',
    itinerary: 'Día 1: Llegada a Quito y traslado al hotel\nDía 2: Mercado artesanal de Otavalo y Laguna de Cuicocha\nDía 3: Centro Histórico colonial de Quito y monumento Mitad del Mundo\nDía 4: Avenida de los Volcanes hacia Baños y Cascada Pailón del Diablo\nDía 5: Reserva Chimborazo | Complejo Arqueológico de Ingapirca | Cuenca\nDía 6: City Tour patrimonial en Cuenca y talleres de sombreros de toquilla\nDía 7: Cuenca | Lagunas del Parque Nacional Cajas | Llegada a Guayaquil\nDía 8: Traslado al aeropuerto de Guayaquil para vuelo de salida',
    pricePremium: 1512,
    priceLuxury: 1799,
    priceEmpty: '',
    duration: '8 Días / 7 Noches'
  },

  // 3. COMBINADOS
  {
    categoryHeader: '3. COMBINADOS (ECUADOR CONTINENTAL + GALÁPAGOS) (3.1 - 3.2)',
    categoryName: 'Combinado',
    code: '3.1',
    name: 'La Gran Odisea: Ecuador Continental Y Galápagos',
    description: 'Expedición insignia de 12 días: combina Quito colonial y Amazonía de Tena con 6 días de exploración insular, fauna y playas en Galápagos.',
    itinerary: 'Día 1: Llegada a Quito y traslado al hotel\nDía 2: City Tour en Quito y Museo Intiñan en la Mitad del Mundo\nDía 3: Quito | Termas de Papallacta | Traslado a lodge en Tena\nDía 4: Tena | Selva amazónica profunda, centro de rescate y comunidad Kichwa\nDía 5: Tena | Puerto Misahuallí | Reserva Paikawe | Retorno a Quito\nDía 6: Quito | Día libre\nDía 7: Vuelo a Galápagos (Baltra) | Cráteres Gemelos | Rancho Primicias\nDía 8: Santa Cruz a Isabela | Flamingos | Centro de crianza | Tintoreras\nDía 9: Isabela a Santa Cruz | La Lobería | Caminata a Las Grietas\nDía 10: Navegación de día completo en yate a Isla Santa Fe o Pinzón\nDía 11: Puerto Ayora | Traslado a Baltra y vuelo de retorno a Quito\nDía 12: Quito | Traslado al aeropuerto y vuelo internacional de salida',
    pricePremium: 2797,
    priceLuxury: 3190,
    priceEmpty: '',
    duration: '12 Días / 11 Noches'
  },
  {
    categoryName: 'Combinado',
    code: '3.2',
    name: 'Travesía Maestra: Del Ecuador Continental A Galápagos',
    description: 'Travesía de 11 días conectando los Andes, Baños, la Amazonía y Quilotoa con las maravillas volcánicas, tortugas gigantes y playas de Galápagos.',
    itinerary: 'Día 1: Llegada a Quito y traslado al hotel\nDía 2: Quito hacia Baños | Avenida de los Volcanes | Pailón del Diablo\nDía 3: Baños | Amazonía en Puyo | Bioparque Yanacocha | Cascada Hola Vida\nDía 4: Baños | Cráter del Quilotoa | Arte de Tigua | Retorno a Quito\nDía 5: Quito | Día libre\nDía 6: Vuelo a Galápagos (Baltra) | Cráteres Gemelos | Rancho Primicias\nDía 7: Excursión marítima a Isabela | Flamingos | Snorkel en Tintoreras\nDía 8: Santa Cruz | Bahía de La Lobería | Punta Estrada | Las Grietas\nDía 9: Santa Cruz | Día libre para playa Tortuga Bay o relax\nDía 10: Traslado a Baltra y vuelo de retorno a Quito\nDía 11: Quito | Traslado al aeropuerto y vuelo internacional de salida',
    pricePremium: 2437,
    priceLuxury: 2790,
    priceEmpty: '',
    duration: '11 Días / 10 Noches'
  },

  // 4. TOURS DIARIOS
  {
    categoryHeader: '4. TOURS DIARIOS (DAY TOURS) (4.1 - 4.7)',
    categoryName: 'Tours Diarios',
    code: '4.1',
    name: 'Quito City Tour Y Mitad Del Mundo',
    description: 'Recorrido por el centro colonial de Quito (Patrimonio UNESCO), cata de chocolate fino en Yumbos y visita a la línea ecuatorial con Museo Intiñan.',
    itinerary: 'Día 1: Centro Histórico de Quito (Plaza Grande, San Francisco, La Compañía), cata de chocolate y Mitad del Mundo (Museo Intiñan)',
    pricePremium: 89,
    priceLuxury: 89,
    priceEmpty: '',
    duration: '1 Día (Full Day) / 0 Noches'
  },
  {
    categoryName: 'Tours Diarios',
    code: '4.2',
    name: 'Plaza de Ponchos (Mercado Artesanal) De Otavalo Y Cotacachi',
    description: 'Excursión cultural al mercado artesanal más célebre de Sudamérica en Otavalo, música en Peguche y finas artesanías de cuero en Cotacachi.',
    itinerary: 'Día 1: Mercado indígena de la Plaza de Ponchos en Otavalo, cultura en Peguche y artesanías en cuero en Cotacachi',
    pricePremium: 92,
    priceLuxury: 92,
    priceEmpty: '',
    duration: '1 Día (Full Day) / 0 Noches'
  },
  {
    categoryName: 'Tours Diarios',
    code: '4.3',
    name: 'Termas De Papallacta Y Bosque Nublado Andino',
    description: 'Día de bienestar y relajación en piscinas de aguas termales volcánicas medicinales con senderos ecológicos y vista al volcán Antisana.',
    itinerary: 'Día 1: Cruce de la cordillera oriental (4.100 m), sendero ecológico andino y relajación en las Termas de Papallacta',
    pricePremium: 85,
    priceLuxury: 85,
    priceEmpty: '',
    duration: '1 Día (Full Day) / 0 Noches'
  },
  {
    categoryName: 'Tours Diarios',
    code: '4.4',
    name: 'Bosque Nuboso De Mindo, Cascadas Y Chocolate',
    description: 'Aventura ecológica en el bosque nublado de Mindo: observación de colibríes exóticos, caminata hacia cascadas naturales y tirolesas canopy.',
    itinerary: 'Día 1: Reserva de bosque nublado de Mindo, avistamiento de colibríes, caminata a cascadas y tirolesa canopy',
    pricePremium: 95,
    priceLuxury: 95,
    priceEmpty: '',
    duration: '1 Día (Full Day) / 0 Noches'
  },
  {
    categoryName: 'Tours Diarios',
    code: '4.5',
    name: 'Reserva Ecológica Antisana Y Santuario Del Cóndor',
    description: 'Expedición de alta montaña al páramo del Antisana para avistar cóndores en libertad, fauna silvestre andina y caminata en la Laguna La Mica.',
    itinerary: 'Día 1: Reserva Ecológica Antisana, santuario del cóndor andino, Laguna La Mica y vistas panorámicas del volcán',
    pricePremium: 90,
    priceLuxury: 90,
    priceEmpty: '',
    duration: '1 Día (Full Day) / 0 Noches'
  },
  {
    categoryName: 'Tours Diarios',
    code: '4.6',
    name: 'Parque Nacional Cotopaxi Y Laguna De Limpiopungo',
    description: 'Aventura en el Parque Nacional Cotopaxi explorando la Laguna de Limpiopungo y realizando el ascenso a pie al Refugio José Rivas a 4.800 m.',
    itinerary: 'Día 1: Parque Nacional Cotopaxi, Laguna de Limpiopungo y caminata de altura hacia el Refugio José Rivas (4.800 m)',
    pricePremium: 96,
    priceLuxury: 96,
    priceEmpty: '',
    duration: '1 Día (Full Day) / 0 Noches'
  },
  {
    categoryName: 'Tours Diarios',
    code: '4.7',
    name: 'Laguna Del Quilotoa Y Cañón Del Toachi',
    description: 'Visita a la impresionante laguna turquesa en el cráter del volcán Quilotoa, con paradas en el cañón del Toachi y pintores indígenas de Tigua.',
    itinerary: 'Día 1: Cañón del Toachi, comunidad de Tigua, mirador y descenso al lago esmeralda en el cráter del Volcán Quilotoa',
    pricePremium: 98,
    priceLuxury: 98,
    priceEmpty: '',
    duration: '1 Día (Full Day) / 0 Noches'
  }
];

async function generateExcel() {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Vermilion Routes';
  workbook.created = new Date();

  // -------------------------------------------------------------
  // PESTAÑA 1: Formato Limpio con Separadores de Sección
  // -------------------------------------------------------------
  const ws1 = workbook.addWorksheet('Tours (Organizado)', {
    views: [{ showGridLines: true }]
  });

  const columnsDef = [
    { header: 'Código', key: 'code', width: 12 },
    { header: 'Nombre del Tour', key: 'name', width: 38 },
    { header: 'Descripción', key: 'description', width: 48 },
    { header: 'Itinerario (Día por Día)', key: 'itinerary', width: 68 },
    { header: 'Costo Premium (USD)', key: 'pricePremium', width: 22 },
    { header: 'Costo Luxury (USD)', key: 'priceLuxury', width: 22 },
    { header: 'Costo (Sin Valores)', key: 'priceEmpty', width: 22 },
    { header: 'Días y Noches', key: 'duration', width: 25 },
  ];

  ws1.columns = columnsDef;

  const headerRow1 = ws1.getRow(1);
  headerRow1.height = 32;
  headerRow1.eachCell((cell) => {
    cell.font = { name: 'Calibri', size: 11, bold: true, color: { argb: 'FFFFFFFF' } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E293B' } }; // Dark slate
    cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    cell.border = {
      top: { style: 'thin', color: { argb: 'FF94A3B8' } },
      bottom: { style: 'medium', color: { argb: 'FF0F172A' } },
      left: { style: 'thin', color: { argb: 'FF94A3B8' } },
      right: { style: 'thin', color: { argb: 'FF94A3B8' } }
    };
  });

  toursData.forEach((tour) => {
    if (tour.categoryHeader) {
      const secRow = ws1.addRow([tour.categoryHeader, '', '', '', '', '', '', '']);
      secRow.height = 25;
      ws1.mergeCells(`A${secRow.number}:H${secRow.number}`);
      const c = ws1.getCell(`A${secRow.number}`);
      c.font = { name: 'Calibri', size: 11, bold: true, color: { argb: 'FF0F172A' } };
      c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE2E8F0' } };
      c.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 };
      c.border = {
        top: { style: 'thin', color: { argb: 'FFCBD5E1' } },
        bottom: { style: 'thin', color: { argb: 'FFCBD5E1' } },
        left: { style: 'thin', color: { argb: 'FFCBD5E1' } },
        right: { style: 'thin', color: { argb: 'FFCBD5E1' } }
      };
    }

    const row = ws1.addRow({
      code: tour.code,
      name: tour.name,
      description: tour.description,
      itinerary: tour.itinerary,
      pricePremium: tour.pricePremium,
      priceLuxury: tour.priceLuxury,
      priceEmpty: '',
      duration: tour.duration
    });

    const lines = tour.itinerary.split('\n').length;
    row.height = Math.max(38, lines * 16 + 10);

    row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
      cell.font = { name: 'Calibri', size: 10 };
      cell.border = {
        top: { style: 'thin', color: { argb: 'FFE2E8F0' } },
        bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } },
        left: { style: 'thin', color: { argb: 'FFE2E8F0' } },
        right: { style: 'thin', color: { argb: 'FFE2E8F0' } }
      };

      if (colNumber === 1) {
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
        cell.font = { name: 'Calibri', size: 10, bold: true, color: { argb: 'FF1E293B' } };
      } else if (colNumber === 2) {
        cell.alignment = { vertical: 'top', horizontal: 'left', wrapText: true };
        cell.font = { name: 'Calibri', size: 10, bold: true };
      } else if (colNumber === 3 || colNumber === 4) {
        cell.alignment = { vertical: 'top', horizontal: 'left', wrapText: true };
      } else if (colNumber === 5 || colNumber === 6) {
        cell.alignment = { vertical: 'middle', horizontal: 'right' };
        cell.numFmt = '"$"#,##0';
      } else if (colNumber === 7) {
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      } else if (colNumber === 8) {
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      }
    });
  });

  // -------------------------------------------------------------
  // PESTAÑA 2: Tabla Plana (Super Simple, sin celdas combinadas)
  // -------------------------------------------------------------
  const ws2 = workbook.addWorksheet('Tours (Tabla Plana)', {
    views: [{ showGridLines: true }]
  });

  ws2.columns = [
    { header: 'Código', key: 'code', width: 12 },
    { header: 'Nombre del Tour', key: 'name', width: 38 },
    { header: 'Descripción', key: 'description', width: 48 },
    { header: 'Itinerario (Día por Día)', key: 'itinerary', width: 68 },
    { header: 'Costo Premium (USD)', key: 'pricePremium', width: 22 },
    { header: 'Costo Luxury (USD)', key: 'priceLuxury', width: 22 },
    { header: 'Costo (Sin Valores)', key: 'priceEmpty', width: 22 },
    { header: 'Días y Noches', key: 'duration', width: 25 },
  ];

  const headerRow2 = ws2.getRow(1);
  headerRow2.height = 30;
  headerRow2.eachCell((cell) => {
    cell.font = { name: 'Calibri', size: 11, bold: true, color: { argb: 'FFFFFFFF' } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0F172A' } };
    cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    cell.border = {
      top: { style: 'thin', color: { argb: 'FF94A3B8' } },
      bottom: { style: 'medium', color: { argb: 'FF0F172A' } },
      left: { style: 'thin', color: { argb: 'FF94A3B8' } },
      right: { style: 'thin', color: { argb: 'FF94A3B8' } }
    };
  });

  toursData.forEach((tour) => {
    const row = ws2.addRow({
      code: tour.code,
      name: tour.name,
      description: tour.description,
      itinerary: tour.itinerary,
      pricePremium: tour.pricePremium,
      priceLuxury: tour.priceLuxury,
      priceEmpty: '',
      duration: tour.duration
    });

    const lines = tour.itinerary.split('\n').length;
    row.height = Math.max(38, lines * 16 + 10);

    row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
      cell.font = { name: 'Calibri', size: 10 };
      cell.border = {
        top: { style: 'thin', color: { argb: 'FFE2E8F0' } },
        bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } },
        left: { style: 'thin', color: { argb: 'FFE2E8F0' } },
        right: { style: 'thin', color: { argb: 'FFE2E8F0' } }
      };

      if (colNumber === 1) {
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
        cell.font = { name: 'Calibri', size: 10, bold: true, color: { argb: 'FF1E293B' } };
      } else if (colNumber === 2) {
        cell.alignment = { vertical: 'top', horizontal: 'left', wrapText: true };
        cell.font = { name: 'Calibri', size: 10, bold: true };
      } else if (colNumber === 3 || colNumber === 4) {
        cell.alignment = { vertical: 'top', horizontal: 'left', wrapText: true };
      } else if (colNumber === 5 || colNumber === 6) {
        cell.alignment = { vertical: 'middle', horizontal: 'right' };
        cell.numFmt = '"$"#,##0';
      } else if (colNumber === 7) {
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      } else if (colNumber === 8) {
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      }
    });
  });

  ws2.autoFilter = 'A1:H17';

  // Save to workspace root
  const outputPath = path.join(process.cwd(), 'Tours_Vermilion_Routes.xlsx');
  await workbook.xlsx.writeFile(outputPath);
  console.log(`Excel file created: ${outputPath}`);

  // Copy to public/downloads
  const publicDir = path.join(process.cwd(), 'public', 'downloads');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  const publicPath = path.join(publicDir, 'Tours_Vermilion_Routes.xlsx');
  await workbook.xlsx.writeFile(publicPath);
  console.log(`Excel file copied to public: ${publicPath}`);

  // Also create a clean CSV for quick viewing/importing
  let csvContent = '\uFEFF'; // UTF-8 BOM for Excel
  csvContent += 'Código,Nombre del Tour,Descripción,Itinerario,Costo Premium (USD),Costo Luxury (USD),Costo (Sin Valores),Días y Noches\n';
  toursData.forEach((t) => {
    const esc = (s: string | number | undefined) => `"${(s ?? '').toString().replace(/"/g, '""')}"`;
    csvContent += [
      esc(t.code),
      esc(t.name),
      esc(t.description),
      esc(t.itinerary),
      esc(t.pricePremium),
      esc(t.priceLuxury),
      esc(''),
      esc(t.duration)
    ].join(',') + '\n';
  });
  const csvPath = path.join(process.cwd(), 'Tours_Vermilion_Routes.csv');
  fs.writeFileSync(csvPath, csvContent, 'utf8');
  console.log(`CSV file created: ${csvPath}`);
}

generateExcel().catch((err) => {
  console.error('Error generating files:', err);
  process.exit(1);
});
