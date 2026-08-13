import { Destination, Tour, Review } from '@/types';

export const mockDestinations: Destination[] = [
  {
    "id": "galapagos",
    "name": { en: "Galapagos Islands", es: "Islas Galápagos", fr: "Îles Galapagos", de: "Galapagos-Inseln", it: "Isole Galapagos", pt: "Ilhas Galápagos", ja: "ガラパゴス諸島", zh: "加拉帕戈斯群岛" },
    "subtitle": { en: "The Enchanted Archipelago", es: "El Archipiélago Encantado", fr: "L'Archipel Enchanté", de: "Das Verzauberte Archipel", it: "L'Arcipelago Incantato", pt: "O Arquipélago Encantado", ja: "魅惑の群島", zh: "迷人的群岛" },
    "description": { en: "Curated private cruises and island hopping excursions to witness wildlife found nowhere else on Earth.", es: "Cruceros privados curados y excursiones de isla en isla para presenciar vida silvestre que no se encuentra en ningún otro lugar.", fr: "Croisières privées et excursions d'île en île pour observer une faune unique au monde.", de: "Erleben Sie die einzigartige Tierwelt der Galapagos-Inseln auf privaten Kreuzfahrten.", it: "Crocere private ed escursioni tra le isole per avvistare una fauna selvatica unica al mondo.", pt: "Cruzeiros privados e excursões pelas ilhas para testemunhar a vida selvagem única.", ja: "地球上の他のどこにもいない野生動物を間近で観察できるプライベートクルーズ。", zh: "精选私人游轮与跳岛游，亲眼目睹全球独一无二的野生动物。" },
    "imageUrl": "/images/tours/16-9/galapagos-tortuga-gigante-16-9.jpg",
    "toursCount": 5,
    "slug": "galapagos"
  },
  {
    "id": "ecuador",
    "name": { en: "Mainland Ecuador", es: "Ecuador Continental", fr: "Équateur Continental", de: "Ecuador Festland", it: "Ecuador Continentale", pt: "Equador Continental", ja: "エクアドル本土", zh: "厄瓜多尔大陆" },
    "subtitle": { en: "Andes, Volcanoes & Amazon Rainforest", es: "Andes, Volcanes y Selva Amazónica", fr: "Andes, Volcans et Forêt Amazonienne", de: "Anden, Vulkane & Amazonas-Regenwald", it: "Ande, Vulcani e Foresta Amazzonica", pt: "Andes, Vulcões e Floresta Amazônica", ja: "アンデス、火山、アマゾンの熱帯雨林", zh: "安第斯山脉、火山与亚马逊雨林" },
    "description": { en: "Traverse the Avenue of Volcanoes, explore deep jungle lodges, and marvel at UNESCO colonial architecture.", es: "Atraviesa la Avenida de los Volcanes, explora lodges en la selva profunda y maravíllate con la arquitectura colonial.", fr: "Traversez l'Avenue des Volcans, explorez la jungle et admirez l'architecture coloniale.", de: "Reisen Sie durch die Straße der Vulkane und erkunden Sie den Regenwald.", it: "Attraversa l'Viale dei Vulcani ed esplora la foresta amazzonica.", pt: "Percorra a Avenida dos Vulcões e explore a selva amazônica.", ja: "火山の街道を通り、アマゾンのジャングルと世界遗産のコロニアル建築を体感。", zh: "穿梭于火山大道，探索雨林精品木屋，赞叹世界遗产殖民建筑。" },
    "imageUrl": "/images/tours/16-9/quito-iglesia-de-san-francisco-16-9.jpg",
    "toursCount": 4,
    "slug": "ecuador"
  },
  {
    "id": "full-day",
    "name": { en: "Full Day Excursions", es: "Excursiones Full Day", fr: "Excursions d'une Journée", de: "Tagesausflüge", it: "Escursioni Giornaliere", pt: "Excursões Full Day", ja: "日帰りオプショナルツアー", zh: "一日游精选路线" },
    "subtitle": { en: "Day Trips in Galapagos & Mainland", es: "Tours de 1 Día en Galápagos y Continente", fr: "Excursions d'un jour", de: "Tagesausflüge in Galapagos & Ecuador", it: "Escursioni di un giorno", pt: "Passeios de 1 dia", ja: "ガラパゴスと本土の日帰り体験", zh: "加拉帕戈斯与大陆一日游精选" },
    "description": { en: "Curated 1-day immersive adventures to volcanic craters, snorkeling reefs, and indigenous highland markets.", es: "Aventuras inmersivas de 1 día a cráteres volcánicos, arrecifes de snorkel y mercados indígenas.", fr: "Aventures d'une journée aux cratères, récifs et marchés traditionnels.", de: "Tagesausflüge zu Vulkankrater, Schnorchelrevieren und traditionellen Märkten.", it: "Avventure di un giorno verso crateri vulcanici e barriere coralline.", pt: "Aventuras de 1 dia para crateras vulcânicas e arrecifes de mergulho.", ja: "火口、シュノーケリングスポット、先住民市場を巡る1日ツアー。", zh: "一日精选探索火山口、潜水珊瑚礁与印第安传统集市。" },
    "imageUrl": "/images/tours/16-9/quilotoa-16-9.jpg",
    "toursCount": 6,
    "slug": "full-day"
  }
];

export const mockTours: Tour[] = [
  // Tour 1: GALÁPAGOS 4 DÍAS
  {
    id: 'galapagos-4days',
    title: { en: 'GALÁPAGOS ISLANDS 4 DAYS', es: 'ISLAS GALÁPAGOS 4 DÍAS', fr: 'ÎLES GALAPAGOS 4 JOURS', de: 'GALAPAGOS INSELN 4 TAGE', it: 'ISOLE GALAPAGOS 4 GIORNI', pt: 'ILHAS GALÁPAGOS 4 DIAS', ja: 'ガラパゴス諸島 4日間', zh: '加拉帕戈斯群岛 4日游' },
    destination: 'Galapagos',
    duration: { en: '4 DAYS / 3 NIGHTS', es: '4 DÍAS / 3 NOCHES', fr: '4 JOURS / 3 NUITS', de: '4 TAGE / 3 NÄCHTE', it: '4 GIORNI / 3 NOTTI', pt: '4 DIAS / 3 NOITES', ja: '4日間 / 3泊', zh: '4天 / 3晚' },
    durationDays: 4,
    price: 1590,
    price3Star: 1590,
    price4Star: 1899,
    imageUrl: '/images/tours/9-16/galapagos-tortuga-gigante-9-16.jpg',
    mobileImage: '/images/tours/9-16/galapagos-tortuga-gigante-9-16.jpg',
    desktopImage: '/images/tours/16-9/galapagos-tortuga-gigante-16-9.jpg',
    gallery: ['/images/tours/9-16/santa-cruz-tierras-altas-9-16.jpg', '/images/tours/9-16/galapagos-flamingos-9-16.jpg', '/images/tours/9-16/las-grietas-canyon-9-16.jpg', '/images/tours/9-16/baltra-canal-itabaca-9-16.jpg'],
    rating: 5,
    reviewsCount: 18,
    category: { en: 'Island Hopping Expedition', es: 'Expedición Island Hopping', fr: 'Expédition Éco-Luxe', de: 'Insel-Hopping-Expedition', it: 'Spedizione tra le Isole', pt: 'Expedição Pelas Ilhas', ja: 'アイランドホッピングツアー', zh: '跳岛精品游' },
    description: {
      en: 'Express 4-day Galapagos adventure visiting Seymour Airport, Twin Craters, Primicias giant tortoises ranch, Isabela Island speedboat excursion, Flamingo Lagoon, Tintoreras islet snorkeling, La Loberia sea lions, and Las Grietas volcanic canyon.',
      es: 'Aventura exprés de 4 días en Galápagos visitando Baltra, Cráteres Gemelos, Rancho Primicias (tortugas gigantes), excursión en lancha a Isla Isabela, Laguna de Flamingos, islote Tintoreras, La Lobería y Cañón Las Grietas.',
      zh: '加拉帕戈斯4日精选探险，游览巴尔特拉岛、双子坑、普里米西亚巨龟保护区、伊莎贝拉岛快艇游览、火烈鸟泻湖、蒂恩托雷拉斯石礁潜水、拉洛贝里亚海狮滩与拉斯格里塔斯火山峡谷。'
    },
    highlights: [
      { en: 'Baltra Arrival & Twin Craters', es: 'Llegada a Baltra y Cráteres Gemelos', zh: '到达巴尔特拉岛与双子坑' },
      { en: 'Primicias Giant Tortoise Reserve', es: 'Rancho Primicias (Tortugas Gigantes)', zh: '普里米西亚巨龟保护区' },
      { en: 'Isabela Island & Flamingo Lagoon', es: 'Isla Isabela y Laguna de Flamingos', zh: '伊莎贝拉岛与火烈鸟泻湖' },
      { en: 'Tintoreras Islet Marine Snorkeling', es: 'Islote Tintoreras y Snorkeling', zh: '蒂恩托雷拉斯石礁与海洋潜水' },
      { en: 'La Lobería & Las Grietas Volcanic Canyon', es: 'La Lobería y Cañón Las Grietas', zh: '拉洛贝里亚海狮滩与拉斯格里塔斯峡谷' }
    ],
    inclusions: [
      { en: 'Accommodation in 3★ or 4★ hotels in Santa Cruz & Isabela', es: 'Hospedaje en hoteles 3★ o 4★ en Santa Cruz e Isabela' },
      { en: 'Daily Buffet/Continental Breakfast & Set Menu Lunches', es: 'Desayunos diarios y almuerzos menú especificados' },
      { en: 'Level III Certified Naturalist Guides (Bilingual)', es: 'Guías Naturalistas Certificados Nivel III (Bilingüe)' },
      { en: 'Land & Speedboat Marine Transport', es: 'Transporte terrestre y lanchas interislas' },
      { en: 'Snorkeling Equipment (Mask & Snorkel)', es: 'Equipo de snorkel (máscara y tubo)' },
      { en: 'Lobito Airport Bus Shuttle & Isabela Dock Fee', es: 'Bus de enlace Lobito y Tasa de muelle de Isabela' }
    ],
    exclusions: [
      { en: 'Galapagos National Park Entrance Fee ($200 USD foreign / $6 USD national)', es: 'Entrada Parque Nacional Galápagos ($200 USD extr. / $6 USD nac.)' },
      { en: 'Transit Control Card TCT ($20 USD)', es: 'Tarjeta de Control de Tránsito TCT ($20 USD)' },
      { en: 'Dinners & Personal Expenses', es: 'Cenas y gastos personales' }
    ],
    itinerary: [
      { day: 1, title: { en: 'Baltra Arrival | Twin Craters | Primicias Ranch', es: 'Llegada a Baltra | Cráteres Gemelos | Rancho Primicias' }, description: { en: 'Welcome at Seymour Airport, crossing Itabaca Channel to highlands to visit Twin Craters and observe giant tortoises free at Primicias Ranch. Transfer to Puerto Ayora hotel.', es: 'Bienvenida en el aeropuerto de Baltra, cruce del canal Itabaca a las tierras altas para visitar los Cráteres Gemelos y observar tortugas gigantes en libertad en Rancho Primicias.' }, meals: { en: 'Hotel plan', es: 'Según plan hotel' }, accommodation: { en: 'Puerto Ayora', es: 'Puerto Ayora' } },
      { day: 2, title: { en: 'Isabela Island | Breeding Center | Flamingos | Tintoreras', es: 'Isla Isabela | Centro de Crianza | Flamingos | Tintoreras' }, description: { en: 'Speedboat to Isabela (2-2.5h), visit Giant Tortoise Breeding Center, Flamingo Lagoon, and boat excursion to Tintoreras islet for snorkeling with sea lions, turtles, and rays.', es: 'Lancha a Isla Isabela, visita al Centro de Crianza, Laguna de Flamingos y navegación a islote Tintoreras para snorkel con leones marinos, tortugas y iguanas.' }, meals: { en: 'Breakfast & Lunch', es: 'Desayuno y Almuerzo' }, accommodation: { en: 'Puerto Ayora', es: 'Puerto Ayora' } },
      { day: 3, title: { en: 'La Lobería | Punta Estrada | Las Grietas Canyon', es: 'La Lobería | Punta Estrada | Cañón Las Grietas' }, description: { en: 'Visit La Lobería sea lion colony, Punta Estrada, and swim in turquoise waters of Las Grietas volcanic canyon.', es: 'Observación de leones marinos en La Lobería, Punta Estrada y nado en las aguas turquesas del cañón volcánico Las Grietas.' }, meals: { en: 'Breakfast', es: 'Desayuno' }, accommodation: { en: 'Puerto Ayora', es: 'Puerto Ayora' } },
      { day: 4, title: { en: 'Transfer to Baltra Airport & Departure', es: 'Traslado al Aeropuerto de Baltra y Vuelo' }, description: { en: 'Check out and transfer across Santa Cruz to Baltra Airport for departure flight.', es: 'Traslado desde Puerto Ayora hacia el Aeropuerto de Baltra para su vuelo de retorno.' }, meals: { en: 'Breakfast', es: 'Desayuno' } }
    ]
  },

  // Tour 2: GALÁPAGOS 5 DÍAS
  {
    id: 'galapagos-5days',
    title: { en: 'GALÁPAGOS ISLANDS 5 DAYS', es: 'ISLAS GALÁPAGOS 5 DÍAS', fr: 'ÎLES GALAPAGOS 5 JOURS', de: 'GALAPAGOS INSELN 5 TAGE', it: 'ISOLE GALAPAGOS 5 GIORNI', pt: 'ILHAS GALÁPAGOS 5 DIAS', ja: 'ガラパゴス諸島 5日間', zh: '加拉帕戈斯群岛 5日游' },
    destination: 'Galapagos',
    duration: { en: '5 DAYS / 4 NIGHTS', es: '5 DÍAS / 4 NOCHES', fr: '5 JOURS / 4 NUITS', de: '5 TAGE / 4 NÄCHTE', it: '5 GIORNI / 4 NOTTI', pt: '5 DIAS / 4 NOITES', ja: '5日間 / 4泊', zh: '5天 / 4晚' },
    durationDays: 5,
    price: 1850,
    price3Star: 1850,
    price4Star: 2099,
    imageUrl: '/images/tours/9-16/galapagos-focas-9-16.jpg',
    mobileImage: '/images/tours/9-16/galapagos-focas-9-16.jpg',
    desktopImage: '/images/tours/16-9/galapagos-focas-16-9.jpg',
    gallery: ['/images/tours/9-16/santa-cruz-tierras-altas-9-16.jpg', '/images/tours/9-16/galapagos-flamingos-9-16.jpg', '/images/tours/9-16/las-grietas-canyon-9-16.jpg', '/images/tours/9-16/santa-fe-island-9-16.jpg', '/images/tours/9-16/baltra-canal-itabaca-9-16.jpg'],
    rating: 5,
    reviewsCount: 24,
    isPopular: true,
    category: { en: 'Island Hopping Expedition', es: 'Expedición Island Hopping', fr: 'Expédition Éco-Luxe', de: 'Insel-Hopping-Expedition', it: 'Spedizione tra le Isole', pt: 'Expedição Pelas Ilhas', ja: 'アイランドホッピングツアー', zh: '跳岛精品游' },
    description: {
      en: 'Comprehensive 5-day Galapagos journey featuring Santa Cruz highlands, Isabela Island overnight, Tintoreras islet snorkeling, Las Grietas, and a full-day navigable cruise to Santa Fe or Pinzon Island.',
      es: 'Viaje integral de 5 días en Galápagos con tierras altas de Santa Cruz, pernoctaciones en Isabela y Santa Cruz, Tintoreras, Las Grietas y navegación full day en yate a Isla Santa Fe o Pinzón.',
      zh: '加拉帕戈斯5日全面行程，包含圣克鲁斯高地、伊莎贝拉岛过夜、蒂恩托雷拉斯石礁潜水、拉斯格里塔斯峡谷，以及前往圣菲岛或平松岛的日间游艇巡航。'
    },
    highlights: [
      { en: 'Twin Craters & Primicias Tortoise Reserve', es: 'Cráteres Gemelos y Reserva Primicias', zh: '双子坑与普里米西亚巨龟保护区' },
      { en: 'Isabela Island & Flamingo Lagoon', es: 'Isla Isabela y Laguna de Flamingos', zh: '伊莎贝拉岛与火烈鸟泻湖' },
      { en: 'Tintoreras Islet Snorkeling', es: 'Islote Tintoreras y Snorkeling', zh: '蒂恩托雷拉斯石礁潜水' },
      { en: 'Las Grietas Volcanic Canyon', es: 'Cañón Volcánico Las Grietas', zh: '拉斯格里塔斯火山峡谷' },
      { en: 'Full-Day Navigable Cruise to Santa Fe or Pinzon Island', es: 'Navegación Full-Day a Isla Santa Fe o Pinzón', zh: '圣菲岛或平松岛全天游艇巡航' }
    ],
    inclusions: [
      { en: 'Accommodation 3★ or 4★ in Santa Cruz & Isabela', es: 'Hospedaje 3★ o 4★ en Santa Cruz e Isabela' },
      { en: 'Daily Breakfasts & Lunches specified on boat tour', es: 'Desayunos diarios y almuerzos incluidos en tours' },
      { en: 'Certified Naturalist Guides Level III', es: 'Guías Naturalistas Certificados Nivel III' },
      { en: 'Snorkeling gear (mask, snorkel, fins)', es: 'Equipo de snorkel completo' }
    ],
    exclusions: [
      { en: 'National Park Fee ($200 USD foreign / $6 USD national)', es: 'Entrada Parque Nacional Galápagos ($200 USD extr.)' },
      { en: 'TCT Transit Control Card ($20 USD)', es: 'Tarjeta de Control TCT ($20 USD)' }
    ],
    itinerary: [
      { day: 1, title: { en: 'Baltra Arrival | Twin Craters | Primicias Ranch', es: 'Llegada a Baltra | Cráteres Gemelos | Rancho Primicias' }, description: { en: 'Arrival at Baltra, cross Itabaca Channel, highland Scalesia forest and giant tortoises at Primicias Ranch. Transfer to Puerto Ayora.', es: 'Llegada a Baltra, cruce de canal Itabaca, visita a Cráteres Gemelos y tortugas gigantes en libertad.' }, meals: { en: 'Hotel plan', es: 'Plan hotel' } },
      { day: 2, title: { en: 'Santa Cruz to Isabela | Flamingos | Breeding Center | Tintoreras', es: 'Santa Cruz a Isabela | Flamingos | Centro de Crianza | Tintoreras' }, description: { en: 'Speedboat to Isabela, visit Flamingo Lagoon, Giant Tortoise Breeding Center, and Tintoreras islet for snorkeling.', es: 'Lancha a Isabela, visita a Laguna de Flamingos, Centro de Crianza e islote Tintoreras para nado con fauna.' }, meals: { en: 'Breakfast', es: 'Desayuno' } },
      { day: 3, title: { en: 'Isabela to Santa Cruz | La Loberia | Las Grietas', es: 'Isabela a Santa Cruz | La Lobería | Las Grietas' }, description: { en: 'Speedboat back to Santa Cruz. Visit La Loberia sea lion colony and swim in Las Grietas turquoise canyon.', es: 'Lancha de retorno a Santa Cruz, observación de leones marinos en La Lobería y nado en Las Grietas.' }, meals: { en: 'Breakfast', es: 'Desayuno' } },
      { day: 4, title: { en: 'Full-Day Navigable Cruise to Santa Fe or Pinzon Island', es: 'Navegación Full-Day a Isla Santa Fe o Pinzón' }, description: { en: 'Yacht cruise to Santa Fe or Pinzon Island for marine wildlife snorkeling with sea turtles, penguins, and rays. Lunch on board.', es: 'Navegación en yate a Santa Fe o Pinzón para snorkel de clase mundial con tortugas marinas, iguanas y lobos. Almuerzo a bordo.' }, meals: { en: 'Breakfast & Lunch', es: 'Desayuno y Almuerzo' } },
      { day: 5, title: { en: 'Transfer to Baltra Airport & Departure', es: 'Traslado al Aeropuerto de Baltra y Vuelo' }, description: { en: 'Hotel check-out and transfer across Santa Cruz to Baltra Airport for departure flight.', es: 'Traslado al aeropuerto de Baltra para su vuelo de retorno.' }, meals: { en: 'Breakfast', es: 'Desayuno' } }
    ]
  },

  // Tour 3: GALÁPAGOS 6 DÍAS
  {
    id: 'galapagos-6days',
    title: { en: 'GALÁPAGOS ISLANDS 6 DAYS', es: 'ISLAS GALÁPAGOS 6 DÍAS', fr: 'ÎLES GALAPAGOS 6 JOURS', de: 'GALAPAGOS INSELN 6 TAGE', it: 'ISOLE GALAPAGOS 6 GIORNI', pt: 'ILHAS GALÁPAGOS 6 DIAS', ja: 'ガラパゴス諸島 6日間', zh: '加拉帕戈斯群岛 6日游' },
    destination: 'Galapagos',
    duration: { en: '6 DAYS / 5 NIGHTS', es: '6 DÍAS / 5 NOCHES', fr: '6 JOURS / 5 NUITS', de: '6 TAGE / 5 NÄCHTE', it: '6 GIORNI / 5 NOTTI', pt: '6 DIAS / 5 NOITES', ja: '6日間 / 5泊', zh: '6天 / 5晚' },
    durationDays: 6,
    price: 1999,
    price3Star: 1999,
    price4Star: 2300,
    imageUrl: '/images/tours/9-16/galapagos-piquero-patas-azules-9-16.jpg',
    mobileImage: '/images/tours/9-16/galapagos-piquero-patas-azules-9-16.jpg',
    desktopImage: '/images/tours/16-9/galapagos-piquero-patas-azules-16-9.jpg',
    gallery: ['/images/tours/9-16/santa-cruz-tierras-altas-9-16.jpg', '/images/tours/9-16/tintoreras-islet-9-16.jpg', '/images/tours/9-16/las-grietas-canyon-9-16.jpg', '/images/tours/9-16/santa-fe-island-9-16.jpg', '/images/tours/9-16/san-cristobal-island-9-16.jpg', '/images/tours/9-16/tijeretas-hill-9-16.jpg'],
    rating: 5,
    reviewsCount: 15,
    category: { en: 'Grand Island Hopping', es: 'Gran Island Hopping', fr: 'Grand Tour des Îles', de: 'Grosse Insel-Hopping-Reise', it: 'Grande Tour delle Isole', pt: 'Grande Expedição Pelas Ilhas', ja: 'ガラパゴス大周遊ツアー', zh: '全景跳岛大周游' },
    description: {
      en: 'Ultimate 6-day Galapagos tour covering Santa Cruz highlands, Isabela Island, Tintoreras, Las Grietas, navigable yacht cruise to Santa Fe/Pinzon, and San Cristóbal Island (Interpretation Center, Tijeretas Hill & Lobería).',
      es: 'El tour más completo de 6 días en Galápagos abarcando Santa Cruz, Isabela, navegación a Santa Fe/Pinzón e Isla San Cristóbal (Centro de Interpretación, Cerro Tijeretas y La Lobería).',
      zh: '加拉帕戈斯6日大周游，涵盖圣克鲁斯高地、伊莎贝拉岛、蒂恩托雷拉斯、拉斯格里塔斯、圣菲/平松游艇巡航，以及圣克里斯托巴尔岛（解读中心、军舰鸟丘与拉洛贝里亚）。'
    },
    highlights: [
      { en: 'Santa Cruz Highlands & Twin Craters', es: 'Tierras Altas de Santa Cruz y Cráteres Gemelos', zh: '圣克鲁斯高地与双子坑' },
      { en: 'Isabela Island, Flamingos & Tintoreras', es: 'Isla Isabela, Flamingos y Tintoreras', zh: '伊莎贝拉岛、火烈鸟与蒂恩托雷拉斯' },
      { en: 'Las Grietas Volcanic Canyon', es: 'Cañón Volcánico Las Grietas', zh: '拉斯格里塔斯火山峡谷' },
      { en: 'Santa Fe or Pinzon Navigable Day Cruise', es: 'Navegación en Yate a Santa Fe o Pinzón', zh: '圣菲岛或平松岛游艇巡航' },
      { en: 'San Cristobal Island, Tijeretas & Interpretation Center', es: 'Isla San Cristóbal, Tijeretas y Centro de Interpretación', zh: '圣克里斯托巴尔岛与解读中心' }
    ],
    inclusions: [
      { en: 'Hotels 3★/4★ in Santa Cruz, Isabela & San Cristobal', es: 'Hoteles 3★/4★ en Santa Cruz, Isabela y San Cristóbal' },
      { en: 'All Land & Sea Speedboat Transfers', es: 'Todos los traslados terrestres y lanchas interislas' },
      { en: 'Certified Naturalist Guides Level III', es: 'Guías Naturalistas Certificados Nivel III' }
    ],
    exclusions: [
      { en: 'Galapagos Park Entrance ($200 USD foreign)', es: 'Entrada Parque Nacional Galápagos ($200 USD extr.)' },
      { en: 'TCT Transit Control Card ($20 USD)', es: 'Tarjeta TCT ($20 USD)' }
    ],
    itinerary: [
      { day: 1, title: { en: 'Baltra Arrival | Twin Craters | Primicias Ranch', es: 'Llegada a Baltra | Cráteres Gemelos | Rancho Primicias' }, description: { en: 'Arrival at Baltra, visit Twin Craters and giant tortoises at Primicias Ranch.', es: 'Llegada a Baltra, visita a los Cráteres Gemelos y tortugas gigantes en Primicias.' } },
      { day: 2, title: { en: 'Isabela Excursion | Flamingos | Tintoreras Islet', es: 'Excursión Isabela | Flamingos | Islote Tintoreras' }, description: { en: 'Speedboat to Isabela, breeding center, flamingo lagoon, and Tintoreras snorkeling.', es: 'Lancha a Isabela, centro de crianza, laguna de flamingos y snorkel en Tintoreras.' } },
      { day: 3, title: { en: 'Isabela to Santa Cruz | La Loberia | Las Grietas', es: 'Isabela a Santa Cruz | La Lobería | Las Grietas' }, description: { en: 'Return to Santa Cruz, coastal sea lions at La Loberia, and swim in Las Grietas canyon.', es: 'Retorno a Santa Cruz, leones marinos en La Lobería y nado en Las Grietas.' } },
      { day: 4, title: { en: 'Navigable Cruise to Santa Fe or Pinzon Island', es: 'Navegación a Santa Fe o Pinzón' }, description: { en: 'Full-day marine wildlife snorkeling cruise with lunch on board.', es: 'Navegación en yate para snorkel marino con almuerzo incluido.' } },
      { day: 5, title: { en: 'San Cristobal Island | Interpretation Center | Tijeretas | Loberia', es: 'Isla San Cristóbal | Centro Interpretación | Tijeretas | Lobería' }, description: { en: 'Speedboat to San Cristobal, museum, Tijeretas Hill viewpoint, and Loberia beach.', es: 'Lancha a San Cristóbal, centro de interpretación, mirador Tijeretas y La Lobería.' } },
      { day: 6, title: { en: 'San Cristobal Airport Transfer & Departure', es: 'Traslado al Aeropuerto San Cristóbal y Vuelo' }, description: { en: 'Free morning and transfer to San Cristobal Airport for departure flight.', es: 'Traslado al aeropuerto de San Cristóbal para vuelo de retorno.' } }
    ]
  },

  // Tour 4: ECUADOR MAINLAND: DAILY TOURS
  {
    id: 'ecuador-daily-tours',
    title: { en: 'ECUADOR MAINLAND: DAILY EXCURSIONS', es: 'ECUADOR CONTINENTAL: TOURS DIARIOS', fr: 'ÉQUATEUR: EXCURSIONS D\'UNE JOURNÉE', de: 'ECUADOR: TAGESAUSFLÜGE', it: 'ECUADOR: ESCURSIONI GIORNALIERE', pt: 'EQUADOR: PASSEIOS DIÁRIOS', ja: 'エクアドル日帰りオプショナルツアー', zh: '厄瓜多尔一日游精选' },
    destination: 'Ecuador',
    duration: { en: '1 DAY EXCURSIONS', es: 'EXCURSIONES DE 1 DÍA', fr: 'EXCURSIONS 1 JOUR', de: 'TAGESAUSFLÜGE', it: 'TOURS DI 1 GIORNO', pt: 'TOURS DE 1 DIA', ja: '日帰りツアー', zh: '一日游路线' },
    durationDays: 1,
    price: 80,
    price3Star: 80,
    price4Star: 100,
    imageUrl: '/images/tours/9-16/galapagos-isla-hermosa-9-16.jpg',
    mobileImage: '/images/tours/9-16/galapagos-isla-hermosa-9-16.jpg',
    desktopImage: '/images/tours/16-9/quito-iglesia-de-san-francisco-16-9.jpg',
    gallery: ['/images/tours/9-16/quito-la-compania-9-16.jpg', '/images/tours/9-16/otavalo-market-9-16.jpg', '/images/tours/9-16/papallacta-hot-springs-9-16.jpg', '/images/tours/9-16/mindo-cloud-forest-9-16.jpg', '/images/tours/9-16/cotopaxi-volcano-9-16.jpg', '/images/tours/9-16/avenue-of-volcanoes-9-16.jpg'],
    rating: 5,
    reviewsCount: 42,
    category: { en: 'Day Excursions', es: 'Excursiones Diarias', fr: 'Excursions d\'un jour', de: 'Tagesausflüge', it: 'Escursioni di un giorno', pt: 'Excursões Diárias', ja: '日帰りツアー', zh: '一日游精选' },
    description: {
      en: 'Select from 7 curated 1-day immersive excursions across mainland Ecuador: Quito & Equator Line ($80), Otavalo Indigenous Market ($90), Papallacta Thermal Baths ($90), Mindo Cloud Forest ($90), Antisana National Park ($90), Cotopaxi Volcano ($90), and Quilotoa Crater Lake ($100).',
      es: 'Elige entre 7 excursiones de 1 día curadas en Ecuador continental: Quito y Mitad del Mundo ($80), Mercado Indígena de Otavalo ($90), Termas de Papallacta ($90), Bosque Nublado de Mindo ($90), Parque Nacional Antisana ($90), Volcán Cotopaxi ($90) y Laguna de Quilotoa ($100).',
      zh: '精选7条厄瓜多尔大陆1日沉浸式游览路线：基多与赤道纪念碑（$80）、奥塔瓦洛印第安集市（$90）、帕帕亚克塔高山温泉（$90）、明多云雾森林（$90）、安蒂萨纳国家公园（$90）、科托帕希火山（$90）与基洛托阿火山湖（$100）。'
    },
    highlights: [
      { en: '1.1 Quito City Tour & Mitad del Mundo ($80)', es: '1.1 City Tour Quito y Mitad del Mundo ($80)', zh: '1.1 基多城市游与赤道纪念碑 ($80)' },
      { en: '1.2 Otavalo Indigenous Market & Cuicocha ($90)', es: '1.2 Mercado Indígena de Otavalo y Cuicocha ($90)', zh: '1.2 奥塔瓦洛集市与库伊科查火山湖 ($90)' },
      { en: '1.3 Papallacta High-Andean Hot Springs ($90)', es: '1.3 Termas de Papallacta ($90)', zh: '1.3 帕帕亚克塔高山温泉 ($90)' },
      { en: '1.4 Mindo Cloud Forest & Waterfalls ($90)', es: '1.4 Bosque Nublado de Mindo y Cascadas ($90)', zh: '1.4 明多云雾森林与瀑布群 ($90)' },
      { en: '1.5 Antisana National Park & Condor Watching ($90)', es: '1.5 Parque Nacional Antisana y Cóndores ($90)', zh: '1.5 安蒂萨纳国家公园与安第斯神鹰观赏 ($90)' },
      { en: '1.6 Cotopaxi Volcano National Park ($90)', es: '1.6 Parque Nacional Volcán Cotopaxi ($90)', zh: '1.6 科托帕希火山国家公园 ($90)' },
      { en: '1.7 Quilotoa Turquoise Crater Lake ($100)', es: '1.7 Laguna Cráter de Quilotoa ($100)', zh: '1.7 基洛托阿翡翠火山湖 ($100)' }
    ],
    inclusions: [
      { en: 'Private Transportation with professional driver', es: 'Transporte Privado con conductor profesional' },
      { en: 'Bilingual Certified Tour Guide', es: 'Guía Turístico Certificado Bilingüe' },
      { en: 'All entrance fees according to selected excursion', es: 'Entradas según la excursión seleccionada' }
    ],
    exclusions: [
      { en: 'Meals and personal expenses', es: 'Comidas y gastos personales' }
    ],
    itinerary: [
      { day: 1, title: { en: 'Quito City Tour & Mitad del Mundo (USD 80 | 5-6h)', es: 'Quito City Tour y Mitad del Mundo (USD 80 | 5-6h)' }, description: { en: 'Explore UNESCO historic center (Cathedral, Presidential Palace, La Compañia golden church, San Francisco plaza), Panecillo viewpoint, and Intiñan Equator Museum.', es: 'Explora el centro histórico UNESCO (Catedral, Palacio Presidencial, iglesia La Compañía, Plaza San Francisco), mirador El Panecillo y Museo Intiñan en la Línea Ecuatorial.' } },
      { day: 2, title: { en: 'Otavalo Indigenous Market & Cuicocha Lake (USD 90)', es: 'Mercado Indígena de Otavalo y Laguna Cuicocha (USD 90)' }, description: { en: 'Scenic drive north to Plaza de los Ponchos market, Cotacachi leather craft town, and Cuicocha volcanic crater lake.', es: 'Viaje al famoso mercado Plaza de los Ponchos, pueblo artesanal de Cotacachi y laguna cráter de Cuicocha.' } },
      { day: 3, title: { en: 'Papallacta Hot Springs (USD 90)', es: 'Termas de Papallacta (USD 90)' }, description: { en: 'Cross Andes at 4,100m, relax in natural volcanic thermal pools surrounded by Antisana mountain scenery.', es: 'Cruce andino a 4.100m y relajación en piscinas termales naturales con vista al volcán Antisana.' } },
      { day: 4, title: { en: 'Mindo Cloud Forest & Waterfalls (USD 90)', es: 'Bosque Nublado de Mindo y Cascadas (USD 90)' }, description: { en: 'Descend to biodiverse cloud forest, visit butterfly garden, orchid farm, hike to Nambillo waterfalls.', es: 'Descenso al bosque nublado, mariposario, orquideario y caminata a las cascadas de Nambillo.' } },
      { day: 5, title: { en: 'Antisana National Park (USD 90)', es: 'Parque Nacional Antisana (USD 90)' }, description: { en: 'Volcanic lava fields, spot wild Andean condors, hike around La Mica Lagoon with Antisana glacier views.', es: 'Observación del cóndor andino, flujos de lava volcánica y caminata en la Laguna La Mica.' } },
      { day: 6, title: { en: 'Cotopaxi National Park (USD 90)', es: 'Parque Nacional Volcán Cotopaxi (USD 90)' }, description: { en: 'Explore high paramo, Limpiopungo lagoon, and hike from 4,500m parking to Jose Rivas Refuge at 4,800m.', es: 'Exploración de la laguna de Limpiopungo y caminata hacia el refugio José Rivas a 4.800m de altitud.' } },
      { day: 7, title: { en: 'Quilotoa Crater Lake (USD 100)', es: 'Laguna Cráter de Quilotoa (USD 100)' }, description: { en: 'Travel through Ilinizas reserve to emerald-turquoise Quilotoa crater lake, Tigua paintings gallery.', es: 'Viaje a la impresionante laguna de agua turquesa en el cráter del Quilotoa y taller de pintura en Tigua.' } }
    ]
  },

  // Tour 5: ECUADOR: VOLCANOES & RIVERS (8 DAYS / 7 NIGHTS)
  {
    id: 'volcanoes-rivers-8days',
    title: { en: 'ECUADOR: VOLCANOES & RIVERS', es: 'ECUADOR: VOLCANES Y RÍOS', fr: 'ÉQUATEUR: VOLCANS ET RIVIÈRES', de: 'ECUADOR: VULKANE & FLÜSSE', it: 'ECUADOR: VULCANI E FIUMI', pt: 'EQUADOR: VULCÕES E RIOS', ja: '火山と川の大自然 8日間', zh: '火山与河流大自然 8日游' },
    destination: 'Ecuador',
    duration: { en: '8 DAYS / 7 NIGHTS', es: '8 DÍAS / 7 NOCHES', fr: '8 JOURS / 7 NUITS', de: '8 TAGE / 7 NÄCHTE', it: '8 GIORNI / 7 NOTTI', pt: '8 DIAS / 7 NOITES', ja: '8日間 / 7泊', zh: '8天 / 7晚' },
    durationDays: 8,
    price: 1543,
    price3Star: 1543,
    price4Star: 1800,
    imageUrl: '/images/tours/9-16/galapagos-lobos-de-mar-9-16.jpg',
    mobileImage: '/images/tours/9-16/galapagos-lobos-de-mar-9-16.jpg',
    desktopImage: '/images/tours/16-9/quilotoa-16-9.jpg',
    gallery: ['/images/tours/9-16/quito-la-compania-9-16.jpg', '/images/tours/9-16/mitad-del-mundo-9-16.jpg', '/images/tours/9-16/papallacta-hot-springs-9-16.jpg', '/images/tours/9-16/tena-amazon-jungle-9-16.jpg', '/images/tours/9-16/pailon-del-diablo-9-16.jpg', '/images/tours/9-16/banos-de-agua-santa-9-16.jpg'],
    rating: 5,
    reviewsCount: 19,
    category: { en: 'Volcanoes & Amazon Waterways', es: 'Ruta de Volcanes y Ríos', fr: 'Route des Volcans & Rivières', de: 'Vulkane- & Fluss-Route', it: 'Risoluzione dei Vulcani e Fiumi', pt: 'Rota de Vulcões e Rios', ja: '火山＆清流アドベンチャーツアー', zh: '火山与大江河流探险' },
    description: {
      en: 'Comprehensive 8-day private tour covering Quito historic center, Mitad del Mundo, Papallacta thermal springs, Tena Amazon rainforest lodge, motorized canoe, Puyo Yanacocha biopark, Banos Pailon del Diablo waterfall, and Quilotoa crater lake.',
      es: 'Circuito privado de 8 días abarcando Quito, Mitad del Mundo, Termas de Papallacta, lodge en la selva de Tena, canoa a motor, bioparque Yanacocha en Puyo, cascada Pailón del Diablo en Baños y Laguna de Quilotoa.',
      zh: '8日私人全景之旅，涵盖基多历史中心、赤道纪念碑、帕帕亚克塔温泉、特纳亚马逊雨林精品木屋、动力木舟、普约亚纳科查生物公园、巴尼奥斯恶魔之咽瀑布与基洛托阿火山湖。'
    },
    highlights: [
      { en: 'UNESCO Historic Quito & Equator Line', es: 'Quito Histórico UNESCO y Mitad del Mundo', zh: '基多历史中心与赤道纪念碑' },
      { en: 'Papallacta Hot Springs in the Andes', es: 'Termas de Papallacta en los Andes', zh: '帕帕亚克塔高山温泉' },
      { en: 'Tena Amazon Lodge & Motorized Canoe', es: 'Lodge en Tena y Canoa a Motor', zh: '特纳亚马逊雨林木屋与动力木舟' },
      { en: 'Puyo Yanacocha Biopark & Banos Waterfalls', es: 'Bioparque Yanacocha en Puyo y Cascadas de Baños', zh: '普约生物公园与巴尼奥斯瀑布群' },
      { en: 'Pailon del Diablo & Quilotoa Turquoise Lake', es: 'Pailón del Diablo y Laguna de Quilotoa', zh: '恶魔之咽瀑布与基洛托阿翡翠火山湖' }
    ],
    inclusions: [
      { en: 'Private Transportation throughout (Quito to Baños & Return)', es: 'Transporte Privado durante todo el programa' },
      { en: 'Hotels 3★ or 4★ with Daily Breakfasts', es: 'Hoteles 3★ o 4★ con desayunos diarios' },
      { en: 'Lunches & Dinners specified in Tena Amazon Lodge', es: 'Comidas especificadas en Lodge en la Selva' }
    ],
    exclusions: [
      { en: 'International flights', es: 'Vuelos internacionales' },
      { en: 'Personal expenses and optional activities in Banos', es: 'Gastos personales y actividades opcionales en Baños' }
    ],
    itinerary: [
      { day: 1, title: { en: 'Arrival in Quito', es: 'Llegada a Quito' }, description: { en: 'Private transfer from airport to hotel.', es: 'Bienvenida en el aeropuerto y traslado privado al hotel.' } },
      { day: 2, title: { en: 'Quito City Tour & Equator Line', es: 'City Tour Quito y Línea Ecuatorial' }, description: { en: 'Historic center, La Compañia, Plaza Grande, and Intiñan museum at Equator line.', es: 'Centro histórico, iglesia La Compañía, Plaza Grande y museo Intiñan en la Línea Ecuatorial.' }, meals: { en: 'Breakfast', es: 'Desayuno' } },
      { day: 3, title: { en: 'Quito to Papallacta Hot Springs to Tena Amazon', es: 'Quito a Papallacta hacia Tena Amazonía' }, description: { en: 'Cross Andes at 4,100m, relax at Papallacta thermal pools, descend to Tena Amazon lodge.', es: 'Cruce andino a 4.100m, baño termal en Papallacta y descenso a la selva en Tena.' }, meals: { en: 'Breakfast', es: 'Desayuno' } },
      { day: 4, title: { en: 'Tena & Amazon Rainforest Experience', es: 'Tena y Experiencia en la Selva Amazónica' }, description: { en: 'Motorized canoe, wildlife rescue center, primary jungle hike, Kichwa family visit, and caiman lagoon.', es: 'Canoa a motor, centro de rescate animal, caminata en la selva, comunidad Kichwa y laguna de caimanes.' }, meals: { en: 'Breakfast, Lunch, Dinner', es: 'Desayuno, Almuerzo, Cena' } },
      { day: 5, title: { en: 'Tena to Puyo to Banos | Route of Waterfalls', es: 'Tena a Puyo hacia Baños | Ruta de las Cascadas' }, description: { en: 'Visit Yanacocha biopark in Puyo, drive along Pastaza canyon to Banos, hike to Pailon del Diablo waterfall.', es: 'Bioparque Yanacocha en Puyo, recorrido por el cañón del río Pastaza y caminata a la cascada Pailón del Diablo en Baños.' }, meals: { en: 'Breakfast', es: 'Desayuno' } },
      { day: 6, title: { en: 'Free Day in Banos Adventure Town', es: 'Día Libre en Baños de Agua Santa' }, description: { en: 'Free day for optional activities (canyoning, rafting, swings, cable car).', es: 'Día libre para actividades opcionales (tarabita, rafting, columpio del fin del mundo).' }, meals: { en: 'Breakfast', es: 'Desayuno' } },
      { day: 7, title: { en: 'Banos to Quilotoa Crater Lake to Quito', es: 'Baños a Laguna de Quilotoa hacia Quito' }, description: { en: 'Drive to Quilotoa emerald crater lake, optional hike down, Tigua village, return to Quito.', es: 'Visita a la laguna de agua turquesa en el cráter de Quilotoa, taller de Tigua y retorno a Quito.' }, meals: { en: 'Breakfast', es: 'Desayuno' } },
      { day: 8, title: { en: 'Private Airport Transfer & Departure', es: 'Traslado Privado al Aeropuerto' }, description: { en: 'Private transfer to Quito airport for departure flight.', es: 'Traslado privado al aeropuerto para su vuelo de salida.' } }
    ]
  },

  // Tour 6: ECUADOR: ANDES & AMAZON RAINFOREST (7 DAYS / 6 NIGHTS)
  {
    id: 'andes-amazon-7days',
    title: { en: 'ECUADOR: ANDES & AMAZON RAINFOREST', es: 'ECUADOR: ANDES Y SELVA AMAZÓNICA', fr: 'ÉQUATEUR: ANDES ET AMAZONIE', de: 'ECUADOR: ANDEN & AMAZONAS', it: 'ECUADOR: ANDE E AMAZZONIA', pt: 'EQUADOR: ANDES E FLORESTA AMAZÔNICA', ja: 'アンデスとアマゾン熱帯雨林 7日間', zh: '安第斯与亚马逊雨林 7日游' },
    destination: 'Ecuador',
    duration: { en: '7 DAYS / 6 NIGHTS', es: '7 DÍAS / 6 NOCHES', fr: '7 JOURS / 6 NUITS', de: '7 TAGE / 6 NÄCHTE', it: '6 GIORNI / 6 NOTTI', pt: '7 DIAS / 6 NOITES', ja: '7日間 / 6泊', zh: '7天 / 6晚' },
    durationDays: 7,
    price: 1307,
    price3Star: 1307,
    price4Star: 1600,
    imageUrl: '/images/tours/9-16/galapagos-garzas-9-16.jpg',
    mobileImage: '/images/tours/9-16/galapagos-garzas-9-16.jpg',
    desktopImage: '/images/tours/16-9/quilotoa-16-9.jpg',
    gallery: ['/images/tours/9-16/quito-la-compania-9-16.jpg', '/images/tours/9-16/papallacta-hot-springs-9-16.jpg', '/images/tours/9-16/tena-amazon-jungle-9-16.jpg', '/images/tours/9-16/amazon-river-canoe-9-16.jpg', '/images/tours/9-16/kichwa-community-9-16.jpg'],
    rating: 5,
    reviewsCount: 20,
    category: { en: 'Andes & Amazon Jungle Expedition', es: 'Expedición Andes y Selva', fr: 'Expédition Andes & Amazonie', de: 'Anden- & Amazonas-Expedition', it: 'Spedizione Ande e Amazzonia', pt: 'Expedição Andes e Amazônia', ja: 'アンデス＆アマゾン探検ツアー', zh: '安第斯与亚马逊探索雨林专线' },
    description: {
      en: 'Immersive 7-day expedition combining Quito colonial heritage, Equator line, Papallacta thermal baths, Tena jungle lodge, motorized canoe, wildlife rescue, Kichwa culture, Paikawe Amazon reserve giant fish, and free day in Quito.',
      es: 'Expedición inmersiva de 7 días combinando Quito, Mitad del Mundo, Termas de Papallacta, lodge en la selva de Tena, canoa a motor, cultura Kichwa, Reserva Paikawe con peces gigantes y día libre en Quito.',
      zh: '7日沉浸式探险，结合基多殖民文化遗产、赤道线、帕帕亚克塔温泉、特纳雨林木屋、动力木舟、奇瓦文化体验、派卡韦亚马逊保护区巨型鱼类观赏。'
    },
    highlights: [
      { en: 'Quito UNESCO Historic Center & Mitad del Mundo', es: 'Centro Histórico de Quito y Mitad del Mundo', zh: '基多历史中心与赤道纪念碑' },
      { en: 'Papallacta High-Andean Hot Springs', es: 'Termas de Papallacta en los Andes', zh: '帕帕亚克塔高山温泉' },
      { en: 'Tena Jungle Lodge & Motorized Canoe', es: 'Lodge en Tena y Canoa a Motor', zh: '特纳雨林木屋与动力木舟' },
      { en: 'Kichwa Family Visit & Caiman Lagoon', es: 'Familia Kichwa y Laguna de Caimanes', zh: '奇瓦印第安体验与鳄鱼湖' },
      { en: 'Misahualli & Paikawe Giant Amazon Fish Reserve', es: 'Misahuallí y Reserva Paikawe de Peces Gigantes', zh: '米萨瓦利与派卡韦巨鱼保护区' }
    ],
    inclusions: [
      { en: 'Private Transportation & Motorized Canoe', es: 'Transporte Privado y Canoa a Motor' },
      { en: 'Hotels 3★/4★ in Quito & Tena Amazon Lodge', es: 'Hoteles 3★/4★ en Quito y Lodge en Tena' },
      { en: 'Meals in Amazon Lodge (Breakfast, Lunch, Dinner)', es: 'Comidas en el Lodge (Desayuno, Almuerzo, Cena)' }
    ],
    exclusions: [
      { en: 'International flights', es: 'Vuelos internacionales' }
    ],
    itinerary: [
      { day: 1, title: { en: 'Arrival in Quito', es: 'Llegada a Quito' }, description: { en: 'Private transfer from airport to hotel.', es: 'Traslado privado desde el aeropuerto.' } },
      { day: 2, title: { en: 'Quito Historic Center & Equator Line', es: 'Centro Histórico de Quito y Mitad del Mundo' }, description: { en: 'Plaza Grande, La Compañia golden church, San Francisco square, and Intiñan Equator museum.', es: 'Plaza Grande, iglesia La Compañía, Plaza San Francisco y museo Intiñan.' }, meals: { en: 'Breakfast', es: 'Desayuno' } },
      { day: 3, title: { en: 'Quito to Papallacta Thermal Baths to Tena Lodge', es: 'Quito a Termas de Papallacta hacia Tena' }, description: { en: 'Pass Guapulo church, cross Andes at 4,100m, relax at Papallacta hot springs, descend to Amazon lodge.', es: 'Cruce andino a 4.100m, baño termal en Papallacta y descenso a la selva.' }, meals: { en: 'Breakfast', es: 'Desayuno' } },
      { day: 4, title: { en: 'Tena Amazon Jungle | Canoe | Rescue Center | Kichwa', es: 'Selva en Tena | Canoa | Centro Rescate | Kichwa' }, description: { en: 'Motorized canoe down Amazon river, wildlife rescue center, rainforest hike, Kichwa traditions, caiman lagoon.', es: 'Canoa a motor, centro de rescate animal, caminata en la selva, cultura Kichwa y laguna de caimanes.' }, meals: { en: 'Breakfast, Lunch, Dinner', es: 'Desayuno, Almuerzo, Cena' } },
      { day: 5, title: { en: 'Misahualli & Paikawe Reserve to Quito', es: 'Misahuallí y Reserva Paikawe a Quito' }, description: { en: 'Hike primary jungle at Paikawe, canoe in lagoon to observe giant Amazon fish, return journey to Quito.', es: 'Navegación en la laguna Paikawe para ver peces gigantes del Amazonas y retorno a Quito.' }, meals: { en: 'Breakfast', es: 'Desayuno' } },
      { day: 6, title: { en: 'Free Day in Historic Quito', es: 'Día Libre en Quito' }, description: { en: 'Free day to explore Quito museums, craft markets, or rest before flights.', es: 'Día libre en Quito para actividades independientes.' }, meals: { en: 'Breakfast', es: 'Desayuno' } },
      { day: 7, title: { en: 'Airport Transfer & Departure', es: 'Traslado al Aeropuerto' }, description: { en: 'Private transfer to Quito airport for flight connections.', es: 'Traslado al aeropuerto de Quito.' } }
    ]
  },

  // Tour 7: SNOW-CAPPED VOLCANOES & WATERFALLS (6 DAYS / 5 NIGHTS)
  {
    id: 'snow-volcanoes-6days',
    title: { en: 'SNOW-CAPPED VOLCANOES & WATERFALLS', es: 'VOLCANES NEVADOS Y CASCADAS', fr: 'VOLCANS ENNEIGÉS ET CASCADES', de: 'SCHNEE BEDECKTE VULKANE & WASSERFÄLLE', it: 'VULCANI INNEVATI E CASCATE', pt: 'VULCÕES DE NEVE E CACHOEIRAS', ja: '雪山と滝の街道 6日間', zh: '雪山与瀑布之旅 6日游' },
    destination: 'Ecuador',
    duration: { en: '6 DAYS / 5 NIGHTS', es: '6 DÍAS / 5 NOCHES', fr: '6 JOURS / 5 NUITS', de: '6 TAGE / 5 NÄCHTE', it: '6 GIORNI / 5 NOTTI', pt: '6 DIAS / 5 NOITES', ja: '6日間 / 5泊', zh: '6天 / 5晚' },
    durationDays: 6,
    price: 1102,
    price3Star: 1102,
    price4Star: 1300,
    imageUrl: '/images/tours/9-16/galapagos-isla-hermosa-9-16.jpg',
    mobileImage: '/images/tours/9-16/galapagos-isla-hermosa-9-16.jpg',
    desktopImage: '/images/tours/16-9/quilotoa-16-9.jpg',
    gallery: ['/images/tours/9-16/avenue-of-volcanoes-9-16.jpg', '/images/tours/9-16/pailon-del-diablo-9-16.jpg', '/images/tours/9-16/puyo-yanacocha-9-16.jpg', '/images/tours/9-16/pastaza-canyon-9-16.jpg'],
    rating: 5,
    reviewsCount: 16,
    category: { en: 'Andean & Waterfalls Route', es: 'Ruta Andina y Cascadas', fr: 'Route des Cascades', de: 'Anden- & Wasserfall-Route', it: 'Risoluzione delle Cascate', pt: 'Rota Andina e Cachoeiras', ja: 'アンデスと滝の探訪ルート', zh: '安第斯山与瀑布探索专线' },
    description: {
      en: 'Scenic 6-day overland journey along the Avenue of Volcanoes, Banos adventure town, Pailon del Diablo waterfall, Pastaza canyon, Puyo Yanacocha biopark, Hola Vida waterfall, and Quilotoa turquoise crater lake.',
      es: 'Recorrido escénico de 6 días por la Avenida de los Volcanes, Baños de Agua Santa, Cascada Pailón del Diablo, cañón del Pastaza, Puyo (bioparque Yanacocha y cascada Hola Vida) y Laguna de Quilotoa.',
      zh: '6日陆地景观之旅，沿着火山大道前进，游览冒险小镇巴尼奥斯、恶魔之咽瀑布、帕斯塔萨峡谷、普约雨林公园与基洛托阿翡翠火山湖。'
    },
    highlights: [
      { en: 'Avenue of Volcanoes & Banos Town', es: 'Avenida de los Volcanes y Baños de Agua Santa', zh: '火山大道与巴尼奥斯小镇' },
      { en: 'Pailon del Diablo Waterfall Hike', es: 'Senderismo en Cascada Pailón del Diablo', zh: '恶魔之咽瀑布徒步' },
      { en: 'Puyo Amazon Rainforest & Yanacocha Biopark', es: 'Amazonía Puyo y Bioparque Yanacocha', zh: '普约雨林与亚纳科查生物公园' },
      { en: 'Hola Vida Waterfall & Kichwa Family', es: 'Cascada Hola Vida y Familia Kichwa', zh: '奥拉维达瀑布与奇瓦文化' },
      { en: 'Quilotoa Turquoise Crater Lake', es: 'Laguna Cráter de Quilotoa', zh: '基洛托阿翡翠火山湖' }
    ],
    inclusions: [
      { en: 'Private Transportation throughout', es: 'Transporte Privado durante todo el programa' },
      { en: 'Hotels 3★ or 4★ with Daily Breakfasts', es: 'Hoteles 3★ o 4★ con desayunos diarios' },
      { en: 'Lunch specified in Amazon Puyo excursion', es: 'Almuerzo en la excursión a Puyo' }
    ],
    exclusions: [
      { en: 'International flights', es: 'Vuelos internacionales' }
    ],
    itinerary: [
      { day: 1, title: { en: 'Arrival in Quito', es: 'Llegada a Quito' }, description: { en: 'Private airport transfer.', es: 'Traslado privado desde el aeropuerto.' } },
      { day: 2, title: { en: 'Quito to Banos | Avenue of Volcanoes | Pailon del Diablo', es: 'Quito a Baños | Avenida de los Volcanes | Pailón del Diablo' }, description: { en: 'Drive south along Pan-American Highway to Banos and hike Pailon del Diablo waterfall.', es: 'Viaje por la Avenida de los Volcanes hacia Baños y caminata a la cascada Pailón del Diablo.' }, meals: { en: 'Breakfast', es: 'Desayuno' } },
      { day: 3, title: { en: 'Banos to Puyo Amazon Rainforest | Yanacocha | Hola Vida', es: 'Baños a Puyo Amazonía | Yanacocha | Hola Vida' }, description: { en: 'Pastaza canyon, Yanacocha wildlife biopark, rainforest hike to Hola Vida waterfall, Kichwa family visit.', es: 'Cañón del Pastaza, bioparque Yanacocha, caminata a la cascada Hola Vida y cultura Kichwa.' }, meals: { en: 'Breakfast, Lunch', es: 'Desayuno, Almuerzo' } },
      { day: 4, title: { en: 'Banos to Quilotoa Crater Lake to Quito', es: 'Baños a Laguna de Quilotoa hacia Quito' }, description: { en: 'Drive to turquoise Quilotoa crater lake, hike bottom of crater, Tigua art gallery, return to Quito.', es: 'Visita a la laguna turquesa de Quilotoa, caminata al cráter, taller de Tigua y retorno a Quito.' }, meals: { en: 'Breakfast', es: 'Desayuno' } },
      { day: 5, title: { en: 'Free Day in Historic Quito', es: 'Día Libre en Quito' }, description: { en: 'Free day to explore Quito at leisure.', es: 'Día libre para explorar Quito.' }, meals: { en: 'Breakfast', es: 'Desayuno' } },
      { day: 6, title: { en: 'Airport Transfer & Departure Flight', es: 'Traslado al Aeropuerto y Vuelo' }, description: { en: 'Private transfer to airport for onward connections.', es: 'Traslado privado al aeropuerto de Quito.' } }
    ]
  },

  // Tour 8: ECUADOR FANTASTIC (8 DAYS / 7 NIGHTS)
  {
    id: 'ecuador-fantastic-8days',
    title: { en: 'ECUADOR FANTASTIC 8 DAYS', es: 'ECUADOR FANTASTIC 8 DÍAS', fr: 'ÉQUATEUR FANTASTIQUE 8 JOURS', de: 'ECUADOR FANTASTISCH 8 TAGE', it: 'ECUADOR FANTASTICO 8 GIORNI', pt: 'EQUADOR FANTÁSTICO 8 DIAS', ja: 'エキサイティング・エクアドル 8日間', zh: '梦幻厄瓜多尔全景 8日游' },
    destination: 'Ecuador',
    duration: { en: '8 DAYS / 7 NIGHTS', es: '8 DÍAS / 7 NOCHES', fr: '8 JOURS / 7 NUITS', de: '8 TAGE / 7 NÄCHTE', it: '8 GIORNI / 7 NOTTI', pt: '8 DIAS / 7 NOITES', ja: '8日間 / 7泊', zh: '8天 / 7晚' },
    durationDays: 8,
    price: 1512,
    price3Star: 1512,
    price4Star: 1799,
    imageUrl: '/images/tours/9-16/galapagos-isla-hermosa-9-16.jpg',
    mobileImage: '/images/tours/9-16/galapagos-isla-hermosa-9-16.jpg',
    desktopImage: '/images/tours/16-9/quito-iglesia-de-san-francisco-16-9.jpg',
    gallery: ['/images/tours/9-16/otavalo-market-9-16.jpg', '/images/tours/9-16/cuicocha-lake-9-16.jpg', '/images/tours/9-16/pailon-del-diablo-9-16.jpg', '/images/tours/9-16/chimborazo-volcano-9-16.jpg', '/images/tours/9-16/ingapirca-ruins-9-16.jpg', '/images/tours/9-16/cuenca-colonial-9-16.jpg', '/images/tours/9-16/cajas-national-park-9-16.jpg', '/images/tours/9-16/guayaquil-city-9-16.jpg'],
    rating: 5,
    reviewsCount: 22,
    isPopular: true,
    category: { en: 'Grand Overland Andes & Coast', es: 'Gran Tour Andino y Costa', fr: 'Grand Tour Andes et Côte', de: 'Grosse Anden- & Küsten-Reise', it: 'Grande Tour Ande e Costa', pt: 'Grande Rota Andina e Costa', ja: 'アンデス＆太平洋沿岸横断大周遊', zh: '安第斯山与沿海大横贯' },
    description: {
      en: 'The definitive 8-day Ecuador overland expedition connecting Quito, Otavalo indigenous market, Cuicocha lake, Banos Pailon del Diablo, Chimborazo volcano (6,310m), Ingapirca Inca ruins, Cuenca UNESCO city, Cajas national park, and Guayaquil port city.',
      es: 'La expedición terrestre definitiva de 8 días conectando Quito, Otavalo, Cuicocha, Baños, Pailón del Diablo, volcán Chimborazo (6.310m), ruinas de Ingapirca, Cuenca, Parque Cajas y Guayaquil.',
      zh: '8日厄瓜多尔陆地旗舰探险，连接基多、奥塔瓦洛印第安集市、库伊科查湖、巴尼奥斯恶魔之咽、钦博拉索火山（6310米）、因加皮尔卡印加遗址、昆卡世界遗产城、卡哈斯国家公园与瓜亚基尔港。'
    },
    highlights: [
      { en: 'Otavalo Indigenous Market & Cuicocha Crater Lake', es: 'Mercado Indígena de Otavalo y Laguna Cuicocha', zh: '奥塔瓦洛集市与库伊科查火山湖' },
      { en: 'Quito UNESCO Historic Center & Mitad del Mundo', es: 'Quito Histórico y Mitad del Mundo', zh: '基多历史中心与赤道纪念碑' },
      { en: 'Banos & Pailon del Diablo Waterfall', es: 'Baños y Cascada Pailón del Diablo', zh: '巴尼奥斯与恶魔之咽瀑布' },
      { en: 'Chimborazo Volcano Reserve (6,310m altitude)', es: 'Reserva Volcán Chimborazo (6.310m de altitud)', zh: '钦博拉索火山保护区（6310米）' },
      { en: 'Ingapirca Inca Ruins & Colonial Cuenca City', es: 'Ruinas de Ingapirca y Ciudad de Cuenca', zh: '因加皮尔卡印加遗址与昆卡古城' },
      { en: 'Cajas National Park & Guayaquil Coastal Port', es: 'Parque Nacional Cajas y Guayaquil', zh: '卡哈斯国家公园与瓜亚基尔港' }
    ],
    inclusions: [
      { en: 'Private Overland Transportation from Quito to Guayaquil', es: 'Transporte Privado Terrestre de Quito a Guayaquil' },
      { en: 'Hotels 3★/4★ in Quito, Banos, Cuenca & Guayaquil', es: 'Hoteles 3★/4★ en Quito, Baños, Cuenca y Guayaquil' },
      { en: 'All Entrances: Ingapirca, Cajas, Chimborazo, Intiñan', es: 'Todas las entradas incluidas' }
    ],
    exclusions: [
      { en: 'International flights', es: 'Vuelos internacionales' }
    ],
    itinerary: [
      { day: 1, title: { en: 'Quito Arrival', es: 'Llegada a Quito' }, description: { en: 'Private airport transfer.', es: 'Traslado privado al hotel en Quito.' } },
      { day: 2, title: { en: 'Otavalo Market | Cotacachi | Cuicocha Lake', es: 'Mercado Otavalo | Cotacachi | Laguna Cuicocha' }, description: { en: 'Plaza de los Ponchos market, Cotacachi leather goods, and Cuicocha crater lake.', es: 'Mercado Plaza de los Ponchos, artículos en cuero de Cotacachi y laguna de Cuicocha.' }, meals: { en: 'Breakfast', es: 'Desayuno' } },
      { day: 3, title: { en: 'Quito Historic Center & Mitad del Mundo', es: 'Quito Histórico y Mitad del Mundo' }, description: { en: 'La Compañia church, Plaza Grande, San Francisco square, and Intiñan Equator museum.', es: 'Iglesia La Compañía, Plaza Grande, Plaza San Francisco y museo Intiñan.' }, meals: { en: 'Breakfast', es: 'Desayuno' } },
      { day: 4, title: { en: 'Quito to Banos | Avenue of Volcanoes | Pailon del Diablo', es: 'Quito a Baños | Avenida de los Volcanes | Pailón del Diablo' }, description: { en: 'Avenue of Volcanoes, Banos adventure town, and Pailon del Diablo waterfall hike.', es: 'Recorrido por la Avenida de los Volcanes y caminata a Pailón del Diablo en Baños.' }, meals: { en: 'Breakfast', es: 'Desayuno' } },
      { day: 5, title: { en: 'Chimborazo Reserve | Ingapirca Inca Ruins | Cuenca', es: 'Reserva Chimborazo | Ruinas Ingapirca | Cuenca' }, description: { en: 'Ecuador highest mountain Chimborazo (6,310m), Ingapirca Inca complex, arrival in Cuenca.', es: 'Volcán Chimborazo (6.310m), complejo arqueológico Inca de Ingapirca y llegada a Cuenca.' }, meals: { en: 'Breakfast', es: 'Desayuno' } },
      { day: 6, title: { en: 'Cuenca UNESCO City Tour & Panama Hat Workshop', es: 'City Tour Cuenca y Taller de Sombreros' }, description: { en: 'Colonial cathedral, Plaza de las Flores, Panama hat workshop, El Barranco, and Turi viewpoint.', es: 'Catedral colonial, Plaza de las Flores, taller de sombreros de paja toquilla y mirador El Turi.' }, meals: { en: 'Breakfast', es: 'Desayuno' } },
      { day: 7, title: { en: 'Cuenca | Cajas National Park | Guayaquil Arrival', es: 'Cuenca | Parque Nacional Cajas | Llegada a Guayaquil' }, description: { en: 'Hike Laguna Toreadora in Cajas national park, descend to coastal port city of Guayaquil.', es: 'Caminata en la Laguna Toreadora del Parque Cajas y descenso a la ciudad puerto de Guayaquil.' }, meals: { en: 'Breakfast', es: 'Desayuno' } },
      { day: 8, title: { en: 'Guayaquil Airport Departure', es: 'Traslado al Aeropuerto de Guayaquil' }, description: { en: 'Private transfer to Guayaquil international airport for departure flight.', es: 'Traslado privado al aeropuerto de Guayaquil para vuelo de retorno.' }, meals: { en: 'Breakfast', es: 'Desayuno' } }
    ]
  },

  // Tour 9: ECUADOR & GALÁPAGOS ISLANDS (12 DAYS / 11 NIGHTS)
  {
    id: 'ecuador-galapagos-12days',
    title: { en: 'ECUADOR & GALÁPAGOS COMBINADO 12 DAYS', es: 'ECUADOR Y GALÁPAGOS COMBINADO 12 DÍAS', fr: 'ÉQUATEUR ET GALAPAGOS COMBINÉ 12 JOURS', de: 'ECUADOR & GALAPAGOS KOMBINIERT 12 TAGE', it: 'ECUADOR E GALAPAGOS COMBINATO 12 GIORNI', pt: 'EQUADOR E GALÁPAGOS COMBINADO 12 DIAS', ja: 'エクアドル＆ガラパゴス最高峰大周遊 12日間', zh: '厄瓜多尔与加拉帕戈斯顶级全景 12日游' },
    destination: 'Galapagos',
    duration: { en: '12 DAYS / 11 NIGHTS', es: '12 DÍAS / 11 NOCHES', fr: '12 JOURS / 11 NUITS', de: '12 TAGE / 11 NÄCHTE', it: '12 GIORNI / 11 NOTTI', pt: '12 DIAS / 11 NOITES', ja: '12日間 / 11泊', zh: '12天 / 11晚' },
    durationDays: 12,
    price: 2797,
    price3Star: 2797,
    price4Star: 2950,
    imageUrl: '/images/tours/9-16/galapagos-focas-9-16.jpg',
    mobileImage: '/images/tours/9-16/galapagos-focas-9-16.jpg',
    desktopImage: '/images/tours/16-9/galapagos-focas-16-9.jpg',
    gallery: ['/images/tours/9-16/quito-la-compania-9-16.jpg', '/images/tours/9-16/mitad-del-mundo-9-16.jpg', '/images/tours/9-16/papallacta-hot-springs-9-16.jpg', '/images/tours/9-16/amazon-river-canoe-9-16.jpg', '/images/tours/9-16/tena-amazon-jungle-9-16.jpg', '/images/tours/9-16/santa-cruz-tierras-altas-9-16.jpg', '/images/tours/9-16/tintoreras-islet-9-16.jpg', '/images/tours/9-16/las-grietas-canyon-9-16.jpg', '/images/tours/9-16/santa-fe-island-9-16.jpg'],
    rating: 5,
    reviewsCount: 35,
    isPopular: true,
    category: { en: 'Grand Combined Expedition', es: 'Gran Expedición Combinada', fr: 'Grand Tour Combiné', de: 'Grosse Kombinierte Expedition', it: 'Grande Spedizione Combinata', pt: 'Grande Expedição Combinada', ja: 'エクアドル＆ガラパゴス豪華複合ツアー', zh: '大陆与群岛旗舰联运专线' },
    description: {
      en: 'The flagship 12-day luxury combined expedition covering Quito historic city, Mitad del Mundo, Papallacta thermal springs, Tena Amazon lodge, Paikawe reserve giant fish, Galapagos Santa Cruz, Isabela Island, Tintoreras islet, Las Grietas, and full-day navigable cruise to Santa Fe or Pinzon Island.',
      es: 'La expedición combinada insignia de 12 días cubriendo Quito, Mitad del Mundo, Termas de Papallacta, lodge en Tena, Reserva Paikawe, Galápagos Santa Cruz, Isabela, Tintoreras, Las Grietas y yate full day a Santa Fe o Pinzón.',
      zh: '12日顶级奢华联合探险，涵盖基多历史名城、赤道线、帕帕亚克塔温泉、特纳亚马逊木屋、派卡韦保护区巨鱼、加拉帕戈斯圣克鲁斯、伊莎贝拉岛、蒂恩托雷拉斯石礁、拉斯格里塔斯及圣菲岛/平松岛全天游艇巡航。'
    },
    highlights: [
      { en: 'Quito UNESCO Historic Center & Mitad del Mundo', es: 'Quito Histórico y Mitad del Mundo', zh: '基多历史中心与赤道纪念碑' },
      { en: 'Papallacta High Andean Thermal Baths', es: 'Termas de Papallacta en los Andes', zh: '帕帕亚克塔高山温泉' },
      { en: 'Tena Amazon Rainforest Lodge & Canoe', es: 'Lodge en la Selva de Tena y Canoa', zh: '特纳亚马逊雨林木屋与木舟' },
      { en: 'Paikawe Amazon Reserve & Giant Fish Lagoon', es: 'Reserva Paikawe y Peces Gigantes del Amazonas', zh: '派卡韦保护区与巨型鱼类泻湖' },
      { en: 'Santa Cruz Highlands & Primicias Giant Tortoises', es: 'Tierras Altas de Santa Cruz y Tortugas Gigantes', zh: '圣克鲁斯高地与巨龟保护区' },
      { en: 'Isabela Island & Tintoreras Islet', es: 'Isla Isabela e Islote Tintoreras', zh: '伊莎贝拉岛与蒂恩托雷拉斯石礁' },
      { en: 'Full-Day Navigable Cruise to Santa Fe or Pinzon Island', es: 'Navegación Full-Day a Isla Santa Fe o Pinzón', zh: '圣菲岛或平松岛全天游艇巡航' }
    ],
    inclusions: [
      { en: 'Private Land Transportation & Amazon Canoe Ride', es: 'Transporte Terrestre Privado y Canoa en la Selva' },
      { en: 'Hotels 3★/4★ in Quito, Tena Lodge, Santa Cruz & Isabela', es: 'Hoteles 3★/4★ en Quito, Lodge en Tena, Santa Cruz e Isabela' },
      { en: 'Full-Day Navigable Yacht Cruise with Lunch Included', es: 'Navegación en Yate Full-Day con Almuerzo Incluido' }
    ],
    exclusions: [
      { en: 'Galapagos National Park Fee ($200 USD foreign / $6 USD national)', es: 'Entrada Parque Galápagos ($200 USD extr. / $6 USD nac.)' },
      { en: 'Transit Control Card TCT ($20 USD)', es: 'Tarjeta TCT ($20 USD)' }
    ],
    itinerary: [
      { day: 1, title: { en: 'Quito Arrival', es: 'Llegada a Quito' }, description: { en: 'Welcome at Quito airport and private transfer to hotel.', es: 'Traslado privado al hotel en Quito.' } },
      { day: 2, title: { en: 'Quito Colonial Tour & Mitad del Mundo', es: 'City Tour Quito y Mitad del Mundo' }, description: { en: 'Plaza Grande, La Compañia golden church, San Francisco square, and Intiñan equator museum.', es: 'Plaza Grande, iglesia La Compañía, Plaza San Francisco y museo Intiñan.' }, meals: { en: 'Breakfast', es: 'Desayuno' } },
      { day: 3, title: { en: 'Quito to Papallacta Thermal Springs to Tena Lodge', es: 'Quito a Termas de Papallacta hacia Lodge en Tena' }, description: { en: 'Cross Andes at 4,100m, Papallacta hot springs, descend to Amazon lodge.', es: 'Cruce andino a 4.100m, baño termal en Papallacta y descenso a la selva.' }, meals: { en: 'Breakfast', es: 'Desayuno' } },
      { day: 4, title: { en: 'Amazon Rainforest Canoe & Wildlife Rescue', es: 'Canoa en la Selva y Rescate de Vida Silvestre' }, description: { en: 'Motorized canoe, jungle hike, Kichwa family visit, caiman lagoon.', es: 'Canoa a motor, caminata en la selva, cultura Kichwa y laguna de caimanes.' }, meals: { en: 'Breakfast, Lunch, Dinner', es: 'Desayuno, Almuerzo, Cena' } },
      { day: 5, title: { en: 'Paikawe Amazon Reserve to Quito', es: 'Reserva Paikawe a Quito' }, description: { en: 'Paikawe reserve, observe giant Amazon fish, return to Quito.', es: 'Reserva Paikawe, observación de peces gigantes y retorno a Quito.' }, meals: { en: 'Breakfast', es: 'Desayuno' } },
      { day: 6, title: { en: 'Free Day in Historic Quito', es: 'Día Libre en Quito' }, description: { en: 'Free day to rest before flight to Galapagos.', es: 'Día libre en Quito.' }, meals: { en: 'Breakfast', es: 'Desayuno' } },
      { day: 7, title: { en: 'Flight to Baltra | Twin Craters | Primicias Ranch', es: 'Vuelo a Baltra | Cráteres Gemelos | Rancho Primicias' }, description: { en: 'Flight to Galapagos, highlands volcanic craters and giant tortoises roaming free.', es: 'Vuelo a Galápagos, cráteres volcánicos y tortugas gigantes en libertad.' }, meals: { en: 'Breakfast', es: 'Desayuno' } },
      { day: 8, title: { en: 'Isabela Island | Breeding Center | Tintoreras', es: 'Isla Isabela | Centro Crianza | Tintoreras' }, description: { en: 'Speedboat to Isabela, breeding center, flamingo lagoon, Tintoreras snorkeling.', es: 'Lancha a Isabela, centro de crianza y snorkel en Tintoreras.' }, meals: { en: 'Breakfast', es: 'Desayuno' } },
      { day: 9, title: { en: 'Santa Cruz | La Loberia | Las Grietas', es: 'Santa Cruz | La Lobería | Las Grietas' }, description: { en: 'Sea lions at La Loberia and swim in Las Grietas canyon.', es: 'Leones marinos y nado en cañón Las Grietas.' }, meals: { en: 'Breakfast', es: 'Desayuno' } },
      { day: 10, title: { en: 'Full-Day Yacht Cruise to Santa Fe or Pinzon Island', es: 'Navegación Full-Day en Yate a Santa Fe o Pinzón' }, description: { en: 'Full-day boat excursion for marine wildlife snorkeling with lunch included.', es: 'Excursión en yate para snorkel con fauna marina.' }, meals: { en: 'Breakfast, Lunch', es: 'Desayuno, Almuerzo' } },
      { day: 11, title: { en: 'Baltra Transfer & Flight to Quito', es: 'Traslado a Baltra y Vuelo a Quito' }, description: { en: 'Transfer to Baltra airport and return flight to Quito.', es: 'Traslado al aeropuerto de Baltra y vuelo a Quito.' }, meals: { en: 'Breakfast', es: 'Desayuno' } },
      { day: 12, title: { en: 'Quito International Departure', es: 'Vuelo Internacional de Salida' }, description: { en: 'Private transfer to Quito airport for international flight.', es: 'Traslado al aeropuerto de Quito para su vuelo internacional.' }, meals: { en: 'Breakfast', es: 'Desayuno' } }
    ]
  },

  // Tour 10: ECUADOR & GALÁPAGOS ISLANDS (11 DAYS / 10 NIGHTS)
  {
    id: 'ecuador-galapagos-11days',
    title: { en: 'ECUADOR & GALÁPAGOS COMBINADO 11 DAYS', es: 'ECUADOR Y GALÁPAGOS COMBINADO 11 DÍAS', fr: 'ÉQUATEUR ET GALAPAGOS COMBINÉ 11 JOURS', de: 'ECUADOR & GALAPAGOS KOMBINIERT 11 TAGE', it: 'ECUADOR E GALAPAGOS COMBINATO 11 GIORNI', pt: 'EQUADOR E GALÁPAGOS COMBINADO 11 DIAS', ja: 'エクアドル＆ガラパゴス大周遊 11日間', zh: '厄瓜多尔与加拉帕戈斯联合大周游 11日游' },
    destination: 'Galapagos',
    duration: { en: '11 DAYS / 10 NIGHTS', es: '11 DÍAS / 10 NOCHES', fr: '11 JOURS / 10 NUITS', de: '11 TAGE / 10 NÄCHTE', it: '11 GIORNI / 10 NOTTI', pt: '11 DIAS / 10 NOITES', ja: '11日間 / 10泊', zh: '11天 / 10晚' },
    durationDays: 11,
    price: 2437,
    price3Star: 2437,
    price4Star: 2599,
    imageUrl: '/images/tours/9-16/galapagos-tortuga-gigante-9-16-2.jpg',
    mobileImage: '/images/tours/9-16/galapagos-tortuga-gigante-9-16-2.jpg',
    desktopImage: '/images/tours/16-9/galapagos-tortuga-gigante-16-9.jpg',
    gallery: ['/images/tours/9-16/avenue-of-volcanoes-9-16.jpg', '/images/tours/9-16/pailon-del-diablo-9-16.jpg', '/images/tours/9-16/puyo-yanacocha-9-16.jpg', '/images/tours/9-16/pastaza-canyon-9-16.jpg', '/images/tours/9-16/santa-cruz-tierras-altas-9-16.jpg', '/images/tours/9-16/galapagos-flamingos-9-16.jpg', '/images/tours/9-16/las-grietas-canyon-9-16.jpg', '/images/tours/9-16/puerto-ayora-9-16.jpg'],
    rating: 5,
    reviewsCount: 31,
    isPopular: true,
    category: { en: 'Grand Combined Expedition', es: 'Gran Expedición Combinada', fr: 'Grand Tour Combiné', de: 'Grosse Kombinierte Expedition', it: 'Grande Spedizione Combinata', pt: 'Grande Expedição Combinada', ja: 'エクアドル＆ガラパゴス豪華複合ツアー', zh: '大陆与群岛旗舰联运专线' },
    description: {
      en: 'The master 11-day combined itinerary uniting mainland Ecuador (Quito, Banos Pailon del Diablo, Amazon Puyo, Yanacocha, Hola Vida, Quilotoa) with the Galapagos Islands (Santa Cruz, Isabela, Tintoreras, Las Grietas).',
      es: 'El máster itinerario combinado de 11 días uniendo Ecuador continental (Quito, Baños Pailón del Diablo, Puyo, Yanacocha, Hola Vida, Quilotoa) con las Islas Galápagos (Santa Cruz, Isabela, Tintoreras, Las Grietas).',
      zh: '11日经典联合行程，将厄瓜多尔大陆（基多、巴尼奥斯恶魔之咽、普约亚马逊、基洛托阿）与加拉帕戈斯群岛（圣克鲁斯、伊莎贝拉、蒂恩托雷拉斯、拉斯格里塔斯）完美融合。'
    },
    highlights: [
      { en: 'Avenue of Volcanoes & Banos Pailon del Diablo', es: 'Avenida de los Volcanes y Pailón del Diablo', zh: '火山大道与巴尼奥斯恶魔之咽' },
      { en: 'Amazon Rainforest Puyo & Kichwa Community', es: 'Amazonía Puyo y Comunidad Kichwa', zh: '普约亚马逊雨林与奇瓦社区' },
      { en: 'Quilotoa Turquoise Crater Lake', es: 'Laguna Cráter de Quilotoa', zh: '基洛托阿翡翠火山湖' },
      { en: 'Santa Cruz Highlands & Primicias Giant Tortoises', es: 'Tierras Altas de Santa Cruz y Tortugas Gigantes', zh: '圣克鲁斯高地与巨龟 protection' },
      { en: 'Isabela Island, Flamingo Lagoon & Tintoreras', es: 'Isla Isabela, Laguna Flamingos y Tintoreras', zh: '伊莎贝拉岛、火烈鸟与蒂恩托雷拉斯' },
      { en: 'Las Grietas Volcanic Canyon Snorkeling', es: 'Snorkel en Cañón Volcánico Las Grietas', zh: '拉斯格里塔斯火山峡谷潜水' }
    ],
    inclusions: [
      { en: 'Private Mainland Transportation & Galapagos Speedboats', es: 'Transporte Privado Continental y Lanchas en Galápagos' },
      { en: 'Hotels 3★ or 4★ in Quito, Banos, Santa Cruz & Isabela', es: 'Hoteles 3★ o 4★ en Quito, Baños, Santa Cruz e Isabela' },
      { en: 'Daily Breakfasts & Set Menu Lunches specified', es: 'Desayunos diarios y almuerzos menú especificados' }
    ],
    exclusions: [
      { en: 'Galapagos Park Entrance ($200 USD foreign / $6 USD national)', es: 'Entrada Parque Galápagos ($200 USD extr.)' },
      { en: 'Transit Control Card TCT ($20 USD)', es: 'Tarjeta TCT ($20 USD)' }
    ],
    itinerary: [
      { day: 1, title: { en: 'Arrival in Quito', es: 'Llegada a Quito' }, description: { en: 'Private airport transfer to hotel.', es: 'Traslado privado al hotel.' } },
      { day: 2, title: { en: 'Quito to Banos | Avenue of Volcanoes | Pailon del Diablo', es: 'Quito a Baños | Avenida de los Volcanes | Pailón del Diablo' }, description: { en: 'Drive south to Banos and visit Pailon del Diablo waterfall.', es: 'Viaje a Baños y cascada Pailón del Diablo.' }, meals: { en: 'Breakfast', es: 'Desayuno' } },
      { day: 3, title: { en: 'Banos to Amazon Rainforest | Yanacocha | Hola Vida', es: 'Baños a Selva Amazónica | Yanacocha | Hola Vida' }, description: { en: 'Pastaza canyon, Yanacocha biopark, Hola Vida hike, and Kichwa family visit.', es: 'Bioparque Yanacocha, caminata en la selva y cultura Kichwa.' }, meals: { en: 'Breakfast, Lunch', es: 'Desayuno, Almuerzo' } },
      { day: 4, title: { en: 'Banos to Quilotoa Crater Lake to Quito', es: 'Baños a Laguna de Quilotoa a Quito' }, description: { en: 'Quilotoa turquoise lake hike, Tigua art gallery, return to Quito.', es: 'Laguna de Quilotoa, arte de Tigua y retorno a Quito.' }, meals: { en: 'Breakfast', es: 'Desayuno' } },
      { day: 5, title: { en: 'Free Day in Historic Quito', es: 'Día Libre en Quito' }, description: { en: 'Rest before flight to Galapagos.', es: 'Día libre para descansar antes del vuelo a Galápagos.' }, meals: { en: 'Breakfast', es: 'Desayuno' } },
      { day: 6, title: { en: 'Quito Flight to Baltra | Twin Craters | Primicias', es: 'Vuelo a Baltra | Cráteres Gemelos | Primicias' }, description: { en: 'Flight to Galapagos, highlands craters and giant tortoises roaming free.', es: 'Vuelo a Galápagos, cráteres volcánicos y tortugas gigantes.' }, meals: { en: 'Breakfast', es: 'Desayuno' } },
      { day: 7, title: { en: 'Isabela Island | Breeding Center | Flamingos | Tintoreras', es: 'Isla Isabela | Centro Crianza | Flamingos | Tintoreras' }, description: { en: 'Speedboat to Isabela, breeding center, flamingo lagoon, and Tintoreras snorkeling.', es: 'Lancha a Isabela, centro de crianza y snorkel en Tintoreras.' }, meals: { en: 'Breakfast, Lunch', es: 'Desayuno, Almuerzo' } },
      { day: 8, title: { en: 'La Loberia | Punta Estrada | Las Grietas', es: 'La Lobería | Punta Estrada | Las Grietas' }, description: { en: 'Sea lion watching at La Loberia and swim in Las Grietas canyon.', es: 'Leones marinos en La Lobería y nado en Las Grietas.' }, meals: { en: 'Breakfast', es: 'Desayuno' } },
      { day: 9, title: { en: 'Free Day in Santa Cruz Island', es: 'Día Libre en Isla Santa Cruz' }, description: { en: 'Free day in Puerto Ayora.', es: 'Día libre en Puerto Ayora.' }, meals: { en: 'Breakfast', es: 'Desayuno' } },
      { day: 10, title: { en: 'Baltra Transfer to Quito Flight', es: 'Traslado a Baltra y Vuelo a Quito' }, description: { en: 'Transfer to Baltra airport and flight back to Quito.', es: 'Traslado al aeropuerto de Baltra y vuelo a Quito.' }, meals: { en: 'Breakfast', es: 'Desayuno' } },
      { day: 11, title: { en: 'Quito International Departure', es: 'Vuelo Internacional de Salida' }, description: { en: 'Private transfer to Quito airport for departure flight.', es: 'Traslado privado al aeropuerto de Quito.' }, meals: { en: 'Breakfast', es: 'Desayuno' } }
    ]
  }
];

export const mockReviews: Review[] = [
  {
    id: 'rev-1',
    author: 'Eleanor Vance',
    location: 'London, UK',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    date: 'February 2026',
    tourTitle: 'ECUADOR & GALÁPAGOS COMBINADO 12 DAYS',
    title: 'An Unforgettable South American Journey',
    comment: 'The 12-day combined tour was flawless. Swimming with hammerhead sharks in Galapagos and exploring the Amazon rainforest in Tena was a dream come true. Exceptional guides and 4-star hotel accommodations!',
    verifiedTripAdvisor: true
  },
  {
    id: 'rev-2',
    author: 'Markus Weber',
    location: 'Zurich, Switzerland',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    date: 'January 2026',
    tourTitle: 'GALÁPAGOS ISLANDS 5 DAYS',
    title: 'Top Tier Service and Unmatched Wildlife',
    comment: 'The 5-day island hopping tour surpassed all expectations. Giant tortoises roaming free at Primicias Ranch and the full-day cruise to Santa Fe Island were unforgettable highlights.',
    verifiedTripAdvisor: true
  }
];
