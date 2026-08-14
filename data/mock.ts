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
    "description": { en: "Traverse the Avenue of Volcanoes, explore deep jungle lodges, and marvel at UNESCO colonial architecture.", es: "Atraviesa la Avenida de los Volcanes, explora lodges en la selva profunda y maravíllate con la arquitectura colonial.", fr: "Traversez l'Avenue des Volcans, explorez la jungle et admirez l'architecture coloniale.", de: "Reisen Sie durch die Straße der Vulkane und erkunden Sie den Regenwald.", it: "Attraversa l'Viale dei Vulcani ed esplora la foresta amazzonica.", pt: "Percorra a Avenida dos Vulcões e explore a selva amazônica.", ja: "火山の街道を通り、アマゾンのジャングルと世界遺産のコロニアル建築を体感。", zh: "穿梭于火山大道，探索雨林精品木屋，赞叹世界遗产殖民建筑。" },
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
  // Tour 1: GALÁPAGOS ISLANDS – 4-DAY ITINERARY
  {
    id: 'galapagos-4days',
    title: { en: 'GALÁPAGOS ISLANDS – 4-DAY ITINERARY', es: 'ISLAS GALÁPAGOS – ITINERARIO 4 DÍAS', fr: 'ÎLES GALAPAGOS – ITINÉRAIRE 4 JOURS', de: 'GALAPAGOS-INSELN – 4-TAGE-REISEPLAN', it: 'ISOLE GALAPAGOS – ITINERARIO 4 GIORNI', pt: 'ILHAS GALÁPAGOS – ROTEIRO DE 4 DIAS', ja: 'ガラパゴス諸島 – 4日間の旅程', zh: '加拉帕戈斯群岛 – 4日精品行程' },
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
      en: 'Experience the magic of the Galapagos in 4 days: Seymour Airport reception, Twin Craters, Primicias giant tortoises ranch, full-day Isabela Island speedboat excursion, Flamingo Lagoon, Tintoreras islet snorkeling, La Loberia sea lions, and Las Grietas volcanic canyon.',
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
      { en: 'Accommodation at the hotel of your choice in Santa Cruz', es: 'Hospedaje en el hotel de su elección en Santa Cruz' },
      { en: 'Buffet breakfast at 4-star hotels / Continental breakfast at 3-star hotels', es: 'Desayuno buffet en hoteles 4★ / Desayuno continental en hoteles 3★' },
      { en: 'Lunches with a set menu', es: 'Almuerzos con menú establecido' },
      { en: 'Domestic Plane ticket', es: 'Boleto aéreo' },
      { en: 'Visits to the islands according to the itinerary', es: 'Visitas a las islas según el itinerario' },
      { en: 'Airport reception and departure assistance at the Galápagos Airport', es: 'Recepción en aeropuerto y asistencia de salida' },
      { en: 'Land and sea transportation', es: 'Transporte terrestre y marítimo' },
      { en: 'Level III Naturalist Guides (Spanish / English)', es: 'Guías Naturalistas Nivel III (Español / Inglés)' },
      { en: 'Snorkeling equipment for boat excursions (mask and snorkel)', es: 'Equipo de snorkel para excursiones en lancha (máscara y tubo)' },
      { en: 'Safety lockers available at the hotel reception', es: 'Cajas de seguridad disponibles en recepción' },
      { en: 'Lobito Airport Shuttle Bus – Airport / Itabaca Channel / Airport', es: 'Bus de enlace Lobito – Aeropuerto / Canal Itabaca / Aeropuerto' },
      { en: 'Isabela Dock Fee: USD 5.00 for Ecuadorian nationals; USD 10.00 for foreign visitors', es: 'Tasa de muelle de Isabela: USD 5.00 nacionales / USD 10.00 extranjeros' }
    ],
    exclusions: [
      { en: 'Galápagos National Park entrance fee: USD 6.00 for Ecuadorian nationals; USD 100.00 / 200.00 for foreign visitors', es: 'Entrada al Parque Nacional Galápagos: USD 6.00 nacionales / USD 200.00 extranjeros' },
      { en: 'Dinners', es: 'Cenas' },
      { en: 'Transit Control Card (TCT): USD 20.00', es: 'Tarjeta de Control de Tránsito (TCT): USD 20.00' },
      { en: 'Services not specified in the program', es: 'Servicios no especificados en el programa' }
    ],
    itinerary: [
      {
        day: 1,
        title: { en: 'DAY 1 – ARRIVAL IN BALTRA | TWIN CRATERS | PRIMICIAS RANCH', es: 'DÍA 1 – LLEGADA A BALTRA | CRÁTERES GEMELOS | RANCHO PRIMICIAS' },
        description: {
          en: 'Upon arrival at Seymour Airport on Baltra Island, you will be welcomed by our representative and begin your journey through the Galápagos Islands. After crossing the Itabaca Channel to Santa Cruz Island, we will travel to the highlands to visit the famous Twin Craters (Los Gemelos). These impressive volcanic formations are surrounded by the lush Scalesia forest and offer an excellent introduction to the unique geological landscape of Santa Cruz Island. We will then continue to Primicias Ranch, a private reserve where giant Galápagos tortoises can be observed roaming freely in their natural environment. During the visit, you will learn about these iconic animals and their importance to the Galápagos ecosystem. After the excursion, we will continue to Puerto Ayora for hotel check-in and the remainder of the day at leisure.',
          es: 'A la llegada al Aeropuerto Seymour en Isla Baltra, será recibido por nuestro representante para iniciar su viaje por Galápagos. Tras cruzar el Canal de Itabaca hacia Santa Cruz, nos trasladamos a las tierras altas para visitar los famosos Cráteres Gemelos (Los Gemelos), rodeados por el exuberante bosque de Scalesia. Continuamos hacia el Rancho Primicias, una reserva privada donde las tortugas gigantes de Galápagos deambulan libremente en su hábitat natural. Tras la excursión, traslado al hotel en Puerto Ayora y resto de la tarde libre.'
        },
        meals: { en: 'According to the selected hotel plan', es: 'Según el plan hotelero seleccionado' },
        accommodation: { en: 'Santa Cruz Island – Puerto Ayora', es: 'Isla Santa Cruz – Puerto Ayora' }
      },
      {
        day: 2,
        title: { en: 'DAY 2 – FULL-DAY EXCURSION TO ISABELA ISLAND | TORTOISE BREEDING CENTER | FLAMINGO LAGOON | TINTORERAS', es: 'DÍA 2 – EXCURSIÓN FULL-DAY A ISLA ISABELA | CENTRO DE CRIANZA | LAGUNA DE FLAMINGOS | TINTORERAS' },
        description: {
          en: 'After breakfast, transfer to the pier to board a speedboat to Isabela Island. The navigation takes approximately 2 to 2.5 hours, depending on sea conditions. Upon arrival in Puerto Villamil, we will visit the Giant Tortoise Breeding Center, where you will learn about the conservation and breeding programs established to protect Isabela\'s giant tortoise populations. We will then visit the Flamingo Lagoon, one of the island\'s most important wetlands. Depending on natural conditions, you may observe Galápagos flamingos and other species of birds in their natural habitat. The excursion will continue with a boat trip to Tintoreras Islet, a small volcanic islet located just off the coast of Isabela. Its clear waters and rich marine environment make it an excellent snorkeling destination. During the activity, you may have the opportunity to observe sea lions, sea turtles, rays, penguins and colorful tropical fish, depending on wildlife activity and sea conditions. After the excursion, return by speedboat to Santa Cruz Island and Puerto Ayora.',
          es: 'Tras el desayuno, traslado al muelle para abordar la lancha rápida hacia Isla Isabela (2 a 2.5 horas). En Puerto Villamil visitamos el Centro de Crianza de Tortugas Gigantes, conociendo los programas de conservación de las poblaciones de Isabela. Luego visitamos la Laguna de Flamingos para observar estas elegantes aves. Continuamos con un recorrido en bote al Islote Tintoreras, famoso por sus aguas cristalinas y canales de lava donde realizaremos snorkel con leones marinos, tortugas, rayas, pingüinos y peces de colores. Retorno en lancha a Puerto Ayora.'
        },
        meals: { en: 'Breakfast and lunch', es: 'Desayuno y almuerzo' },
        accommodation: { en: 'Santa Cruz Island – Puerto Ayora', es: 'Isla Santa Cruz – Puerto Ayora' }
      },
      {
        day: 3,
        title: { en: 'DAY 3 – LA LOBERÍA | PUNTA ESTRADA | LAS GRIETAS', es: 'DÍA 3 – LA LOBERÍA | PUNTA ESTRADA | LAS GRIETAS' },
        description: {
          en: 'After breakfast, we will begin the day\'s activities with a visit to La Lobería, a coastal area famous for its resident population of Galápagos sea lions. Here, you will have the opportunity to observe these playful animals in their natural environment. We will then continue to Punta Estrada, a beautiful coastal area surrounded by rocky formations and clear waters. The area offers excellent opportunities for nature observation and marine activities. The excursion will continue to Las Grietas, a spectacular natural formation consisting of a narrow volcanic canyon filled with crystal-clear turquoise water. This is one of the most popular snorkeling and swimming sites near Puerto Ayora. During the snorkeling activity, you can explore the underwater environment and observe a variety of colorful fish and marine life. After the visit, return to Puerto Ayora and enjoy the remainder of the day at leisure.',
          es: 'Iniciamos con una visita a La Lobería, famosa por su colonia de lobos marinos. Continuamos hacia Punta Estrada, una hermosa zona costera rodeada de formaciones rocosas y aguas transparentes. La excursión continúa hacia Las Grietas, un espectacular cañón volcánico angosto lleno de agua turquesa cristalina ideal para natación y snorkel entre peces de colores. Retorno a Puerto Ayora y tiempo libre.'
        },
        meals: { en: 'Breakfast', es: 'Desayuno' },
        accommodation: { en: 'Santa Cruz Island – Puerto Ayora', es: 'Isla Santa Cruz – Puerto Ayora' }
      },
      {
        day: 4,
        title: { en: 'DAY 4 – TRANSFER TO BALTRA AIRPORT | DEPARTURE', es: 'DÍA 4 – TRASLADO AL AEROPUERTO DE BALTRA | SALIDA' },
        description: {
          en: 'After breakfast, check out from the hotel and begin the transfer from Puerto Ayora to Baltra Airport. The journey includes transportation across Santa Cruz Island and the crossing of the Itabaca Channel, followed by the airport shuttle to Seymour Airport. Upon arrival at the airport, assistance will be provided for your departure flight, marking the end of your Galápagos Islands experience.',
          es: 'Tras el desayuno, check out del hotel e inicio del traslado desde Puerto Ayora hacia el Aeropuerto de Baltra, cruzando la Isla Santa Cruz y el Canal de Itabaca hasta el Aeropuerto Seymour para su vuelo de retorno.'
        },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      }
    ]
  },

  // Tour 2: GALÁPAGOS ISLANDS – 5-DAY ITINERARY
  {
    id: 'galapagos-5days',
    title: { en: 'GALÁPAGOS ISLANDS – 5-DAY ITINERARY', es: 'ISLAS GALÁPAGOS – ITINERARIO 5 DÍAS', fr: 'ÎLES GALAPAGOS – ITINÉRAIRE 5 JOURS', de: 'GALAPAGOS-INSELN – 5-TAGE-REISEPLAN', it: 'ISOLE GALAPAGOS – ITINERARIO 5 GIORNI', pt: 'ILHAS GALÁPAGOS – ROTEIRO DE 5 DIAS', ja: 'ガラパゴス諸島 – 5日間の旅程', zh: '加拉帕戈斯群岛 – 5日全景行程' },
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
      en: 'Comprehensive 5-day Galapagos journey featuring Santa Cruz highlands, Isabela Island overnight, Tintoreras islet snorkeling, Las Grietas, and a full-day navigable yacht cruise to Santa Fe or Pinzon Island.',
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
      { en: 'Accommodation at the hotel of your choice in Santa Cruz', es: 'Hospedaje en hotel seleccionado en Santa Cruz' },
      { en: 'Accommodation at Tintorera Guesthouse in Isabela', es: 'Hospedaje en Hostal Tintorera en Isabela' },
      { en: 'Buffet breakfast at 4-star hotels / Continental breakfast at 3-star hotels', es: 'Desayuno buffet en hoteles 4★ / Continental en 3★' },
      { en: 'Lunches with a set menu', es: 'Almuerzos con menú establecido' },
      { en: 'Plane Ticket Quito - Baltra - Quito', es: 'Boleto aéreo Quito - Baltra - Quito' },
      { en: 'Visits to the islands according to the itinerary', es: 'Visitas según itinerario' },
      { en: 'Airport reception and departure assistance at Galápagos Airport', es: 'Recepción y asistencia en aeropuertos de Galápagos' },
      { en: 'Land and sea transportation', es: 'Transporte terrestre y marítimo' },
      { en: 'Naturalist Guides – Level III (Spanish / English)', es: 'Guías Naturalistas Nivel III' },
      { en: 'Snorkeling equipment for navigable excursions (mask and snorkel)', es: 'Equipo de snorkel para navegaciones' },
      { en: 'Safety lockers available at hotel reception', es: 'Cajas de seguridad en recepción' },
      { en: 'Lobito Airport Shuttle Bus – Baltra Airport / Itabaca Channel / Baltra Airport', es: 'Bus de enlace Lobito Aeropuerto – Canal Itabaca – Aeropuerto' },
      { en: 'Isabela Dock Fee: USD 5.00 for Ecuadorian nationals; USD 10.00 for foreign visitors', es: 'Tasa de muelle de Isabela: USD 5.00 nacionales / USD 10.00 extranjeros' }
    ],
    exclusions: [
      { en: 'Galápagos National Park entrance fee: USD 6.00 for Ecuadorian nationals; USD 200.00 for foreign visitors', es: 'Entrada al Parque Nacional Galápagos: USD 6.00 nacionales / USD 200.00 extranjeros' },
      { en: 'Dinners', es: 'Cenas' },
      { en: 'Transit Control Card (TCT): USD 20.00', es: 'Tarjeta de Control de Tránsito (TCT): USD 20.00' },
      { en: 'Services not specified in the program', es: 'Servicios no especificados' }
    ],
    itinerary: [
      {
        day: 1,
        title: { en: 'DAY 1 – ARRIVAL IN BALTRA | TWIN CRATERS | PRIMICIAS RANCH', es: 'DÍA 1 – LLEGADA A BALTRA | CRÁTERES GEMELOS | RANCHO PRIMICIAS' },
        description: {
          en: 'Upon arrival at Seymour Airport on Baltra Island, you will be welcomed by our representative and begin your journey through the Galápagos Islands. After crossing the Itabaca Channel to Santa Cruz Island, we will continue towards the highlands. Along the way, we will visit the famous Twin Craters (Los Gemelos), two impressive volcanic formations surrounded by the lush vegetation of the Santa Cruz highlands. Here, you will learn about the geological origins of the island and observe the unique Scalesia forest. We will then continue to Primicias Ranch, a private reserve where you can observe giant Galápagos tortoises roaming freely in their natural environment. This is an excellent opportunity to photograph these iconic animals and learn about their importance to the Galápagos ecosystem. After the visit, we will continue to your hotel in Puerto Ayora for check-in and the remainder of the day at leisure.',
          es: 'Llegada al Aeropuerto Seymour en Baltra, bienvenida y cruce del Canal de Itabaca. En las tierras altas de Santa Cruz visitamos los Cráteres Gemelos rodeados del bosque de Scalesia. En el Rancho Primicias observamos tortugas gigantes de Galápagos deambulando libremente en su hábitat y caminamos por túneles de lava. Alojamiento en Puerto Ayora y tiempo libre.'
        },
        meals: { en: 'Not included / according to hotel plan', es: 'Según plan hotelero' },
        accommodation: { en: 'Santa Cruz Island – Puerto Ayora', es: 'Isla Santa Cruz – Puerto Ayora' }
      },
      {
        day: 2,
        title: { en: 'DAY 2 – SANTA CRUZ TO ISABELA | FLAMINGO LAGOON | TORTOISE BREEDING CENTER | TINTORERAS', es: 'DÍA 2 – SANTA CRUZ A ISABELA | LAGUNA DE FLAMINGOS | CENTRO DE CRIANZA | TINTORERAS' },
        description: {
          en: 'After breakfast, we will transfer to the pier for a speedboat journey from Santa Cruz to Isabela Island. The crossing takes approximately 2 to 2.5 hours, depending on sea conditions. Upon arrival in Puerto Villamil, we will begin our exploration of Isabela. Our first stop will be the Flamingo Lagoon, one of the most important wetland areas on the island. Here, you may observe American flamingos feeding and resting in the shallow waters, together with other species of coastal and migratory birds. We will then visit the Giant Tortoise Breeding Center, where you will learn about the conservation and reproduction programs designed to protect Isabela\'s giant tortoise populations. The visit provides an insight into the efforts being made to preserve these emblematic species. In the afternoon, we will take a boat excursion to Tintoreras Islet, a small volcanic islet located just off the coast of Isabela. The area is famous for its crystal-clear waters and rich marine life. During the snorkeling activity, you may encounter sea lions, sea turtles, rays, colorful fish and penguins, depending on the conditions and wildlife activity. After the excursion, return to Puerto Villamil and enjoy the evening at leisure.',
          es: 'Lancha rápida a Isla Isabela (2-2.5h). Visita a la Laguna de Flamingos y al Centro de Crianza de Tortugas Gigantes de Isabela. Por la tarde, excursión náutica a los canales de lava de Tintoreras para snorkel con tiburones de arrecife, tortugas marinas, iguanas y leones marinos. Pernoctación en Puerto Villamil, Isabela.'
        },
        meals: { en: 'Breakfast', es: 'Desayuno' },
        accommodation: { en: 'Isabela Island – Puerto Villamil', es: 'Isla Isabela – Puerto Villamil' }
      },
      {
        day: 3,
        title: { en: 'DAY 3 – ISABELA TO SANTA CRUZ | LA LOBERÍA | LAS GRIETAS', es: 'DÍA 3 – ISABELA A SANTA CRUZ | LA LOBERÍA | LAS GRIETAS' },
        description: {
          en: 'After breakfast, we will return to the pier for the boat transfer back to Santa Cruz Island. Upon arrival in Puerto Ayora, we will continue with a visit to La Lobería, a small coastal area known for its population of Galápagos sea lions. This is a wonderful place to observe these playful animals both on the beach and in the water. We will then visit Las Grietas, a spectacular natural formation created by volcanic activity. This narrow canyon is filled with clear, turquoise water and is one of the most popular swimming and snorkeling sites near Puerto Ayora. During the snorkeling activity, you will have the opportunity to explore the underwater environment and observe colorful tropical fish and other marine species. After the visit, return to Puerto Ayora and check in at your hotel. The remainder of the afternoon and evening will be free to relax or explore the town independently.',
          es: 'Lancha de regreso a Santa Cruz. Visita a La Lobería para observar lobos marinos. Luego caminata hacia Las Grietas, cañón de agua turquesa cristalina para nadar y hacer snorkel entre peces tropicales. Tarde libre en Puerto Ayora.'
        },
        meals: { en: 'Breakfast', es: 'Desayuno' },
        accommodation: { en: 'Santa Cruz Island – Puerto Ayora', es: 'Isla Santa Cruz – Puerto Ayora' }
      },
      {
        day: 4,
        title: { en: 'DAY 4 – FULL-DAY EXCURSION TO SANTA FE OR PINZÓN ISLAND', es: 'DÍA 4 – EXCURSIÓN FULL-DAY A ISLA SANTA FE O PINZÓN' },
        description: {
          en: 'Today, enjoy a full-day boat excursion to one of the Galápagos\' outstanding snorkeling destinations: Santa Fe Island or Pinzón Island, depending on availability, sea conditions and the selected tour. Santa Fe Island is known for its beautiful turquoise waters, white sandy beaches and endemic wildlife. During the excursion, you may encounter sea lions, sea turtles, rays, marine iguanas and a variety of tropical fish. The island is also home to the endemic Santa Fe land iguana. Alternatively, the excursion may take you to Pinzón Island, a spectacular location surrounded by clear waters and abundant marine life. The snorkeling sites around Pinzón are particularly well known for encounters with sea turtles, sea lions, rays, colorful fish and, with some luck, Galápagos penguins. The day will include navigation, snorkeling and opportunities to observe wildlife both above and below the water. Lunch will generally be provided during the excursion, depending on the selected tour. Return to Puerto Ayora in the afternoon and enjoy your final evening in the Galápagos.',
          es: 'Excursión navegable de día completo en yate a Isla Santa Fe o Isla Pinzón. Práctica de snorkel en arrecifes prístinos con tortugas marinas, rayas, tiburones y lobos marinos. Almuerzo a bordo incluido y retorno a Puerto Ayora.'
        },
        meals: { en: 'Breakfast and lunch', es: 'Desayuno y almuerzo' },
        accommodation: { en: 'Santa Cruz Island – Puerto Ayora', es: 'Isla Santa Cruz – Puerto Ayora' }
      },
      {
        day: 5,
        title: { en: 'DAY 5 – TRANSFER TO BALTRA AIRPORT | DEPARTURE', es: 'DÍA 5 – TRASLADO AL AEROPUERTO DE BALTRA | SALIDA' },
        description: {
          en: 'After breakfast, check out from the hotel and transfer from Puerto Ayora towards Baltra Island. The journey includes transportation across Santa Cruz Island and the Itabaca Channel, followed by the transfer to Seymour Airport (Baltra). Upon arrival at the airport, assistance will be provided for your departure flight, marking the end of your Galápagos Islands adventure.',
          es: 'Desayuno, check-out y traslado al Aeropuerto Seymour de Baltra para tomar su vuelo de retorno al continente ecuatoriano.'
        },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      }
    ]
  },

  // Tour 3: 6-DAY GALÁPAGOS ISLANDS TOUR ITINERARY
  {
    id: 'galapagos-6days',
    title: { en: '6-DAY GALÁPAGOS ISLANDS TOUR ITINERARY', es: 'ITINERARIO DE 6 DÍAS EN ISLAS GALÁPAGOS', fr: 'ITINÉRAIRE 6 JOURS AUX ÎLES GALAPAGOS', de: '6-TAGE GALAPAGOS-INSELN REISEPLAN', it: 'ITINERARIO DI 6 GIORNI NELLE ISOLE GALAPAGOS', pt: 'ROTEIRO DE 6 DIAS NAS ILHAS GALÁPAGOS', ja: 'ガラパゴス諸島 6日間の旅程', zh: '加拉帕戈斯群岛 6日大周游行程' },
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
      { en: 'Accommodation at the hotel of your choice in Santa Cruz', es: 'Hospedaje en hotel seleccionado en Santa Cruz' },
      { en: 'Accommodation at Hostal Tintorera in Isabela', es: 'Hospedaje en Hostal Tintorera en Isabela' },
      { en: 'Accommodation at Hotel Algarrobos in San Cristóbal', es: 'Hospedaje en Hotel Algarrobos en San Cristóbal' },
      { en: 'Buffet breakfast at 4-star hotels / Continental breakfast at 3-star hotels', es: 'Desayuno buffet en hoteles 4★ / Continental en 3★' },
      { en: 'Plane ticket Quito-Baltra, San Cristobal-Quito', es: 'Boleto aéreo Quito-Baltra, San Cristóbal-Quito' },
      { en: 'Set-menu lunches', es: 'Almuerzos menú incluidos' },
      { en: 'Visits to the islands according to the itinerary', es: 'Visitas según itinerario' },
      { en: 'Airport reception and departure assistance at Galápagos airports', es: 'Recepción y asistencia en aeropuertos' },
      { en: 'Maritime and land transportation', es: 'Transporte marítimo y terrestre' },
      { en: 'Naturalist Guide Class III (Spanish/English)', es: 'Guía Naturalista Nivel III' },
      { en: 'Snorkeling equipment for boat excursions (mask and snorkel)', es: 'Equipo de snorkel completo' },
      { en: 'Lobito Airport Bus: Airport – Itabaca Channel – Airport', es: 'Bus de aeropuerto Lobito' },
      { en: 'Isabela Dock Fee: USD 5.00 for Ecuadorian nationals; USD 10.00 for foreign visitors', es: 'Tasa de muelle de Isabela' }
    ],
    exclusions: [
      { en: 'Galápagos National Park entrance fee: USD 6.00 for Ecuadorian nationals; USD 200.00 for foreign visitors', es: 'Entrada al Parque Nacional Galápagos: USD 200.00 extranjeros' },
      { en: 'Dinners in Santa Cruz', es: 'Cenas en Santa Cruz' },
      { en: 'Transit Control Card (TCT): USD 20.00', es: 'Tarjeta de Control de Tránsito (TCT): USD 20.00' },
      { en: 'Services not specified in the program', es: 'Servicios no especificados' }
    ],
    itinerary: [
      {
        day: 1,
        title: { en: 'Day 1: Arrival in Baltra – Twin Craters – Primicias Ranch', es: 'Día 1: Llegada a Baltra – Cráteres Gemelos – Rancho Primicias' },
        description: {
          en: 'Upon arrival at Baltra Airport, you will be welcomed by our representative and begin your Galápagos adventure. Your first visit will be to the Twin Craters (Los Gemelos), two impressive volcanic formations located in the highlands of Santa Cruz Island. These large craters were created by ancient volcanic activity and are surrounded by lush vegetation, including the characteristic scalesia forest. Afterward, continue to Primicias Ranch, a private ecological reserve where you can observe giant Galápagos tortoises roaming freely in their natural environment. You will also have the chance to walk through lava tunnels and learn more about conservation efforts. At the end of the excursion, transfer to your accommodation in Santa Cruz Island and enjoy the rest of the day at leisure.',
          es: 'Llegada al Aeropuerto de Baltra, recepción y traslado a las tierras altas de Santa Cruz para visitar los Cráteres Gemelos rodeados del bosque de Scalesia. Luego visitamos el Rancho Primicias para observar tortugas gigantes en libertad y cruzar túneles de lava. Alojamiento en Santa Cruz y tiempo libre.'
        },
        accommodation: { en: 'Santa Cruz Island', es: 'Isla Santa Cruz' }
      },
      {
        day: 2,
        title: { en: 'Day 2: Santa Cruz – Isabela Island – Flamingo Lagoon – Tortoise Breeding Center – Tintoreras Islet', es: 'Día 2: Santa Cruz – Isla Isabela – Laguna de Flamingos – Centro de Crianza – Islote Tintoreras' },
        description: {
          en: 'After breakfast, transfer to the pier for a speedboat ride to Isabela Island, the largest island in the archipelago. Upon arrival in Puerto Villamil, begin your exploration of Isabela with a visit to a flamingo lagoon to observe Galápagos flamingos. Continue to the Tortoise Breeding Center, dedicated to the reproduction and protection of Isabela\'s giant tortoises. In the afternoon, take a boat excursion to Tintoreras Islet for snorkeling with sea turtles, sea lions, tropical fish, rays, and marine iguanas. On land, you may see penguins and blue-footed boobies. Return to Puerto Villamil for an evening at leisure.',
          es: 'Lancha rápida a Isla Isabela. Visita a la laguna de flamingos y al Centro de Crianza de Tortugas Gigantes de Isabela. Por la tarde, excursión náutica al Islote Tintoreras para snorkel con leones marinos, tortugas, peces tropicales, iguanas marinas y pingüinos de Galápagos. Noche en Isabela.'
        },
        accommodation: { en: 'Isabela Island', es: 'Isla Isabela' }
      },
      {
        day: 3,
        title: { en: 'Day 3: Isabela – Santa Cruz – La Lobería – Las Grietas', es: 'Día 3: Isabela – Santa Cruz – La Lobería – Las Grietas' },
        description: {
          en: 'After breakfast, transfer to the pier for your return journey to Santa Cruz Island. Upon arrival, visit La Lobería, a coastal area known for its colony of playful Galápagos sea lions. Later, visit Las Grietas, a narrow water-filled crevice surrounded by high volcanic rock walls offering clear waters for observing colorful fish and marine species. Return to your hotel and enjoy the remainder of the afternoon at leisure.',
          es: 'Lancha de regreso a Santa Cruz. Visita costera a La Lobería para observar lobos marinos. Luego caminata a Las Grietas, espectacular formación volcánica de aguas cristalinas para natación y snorkel. Tarde libre en Puerto Ayora.'
        },
        accommodation: { en: 'Santa Cruz Island', es: 'Isla Santa Cruz' }
      },
      {
        day: 4,
        title: { en: 'Day 4: Full-Day Excursion – Santa Fe Island or Pinzón Islet', es: 'Día 4: Excursión Full-Day – Isla Santa Fe o Islote Pinzón' },
        description: {
          en: 'Today, enjoy a full-day boat excursion to Santa Fe Island or Pinzón Islet. Santa Fe is famous for turquoise waters, white-sand beaches, and endemic land iguanas. Pinzón is surrounded by nutrient-rich waters for swimming alongside sea turtles, sea lions, rays, and tropical fish. Enjoy lunch on board and return to Puerto Ayora in the afternoon.',
          es: 'Navegación de día completo en yate hacia Isla Santa Fe o Islote Pinzón con sesiones de snorkel de alta biodiversidad marina (tortugas, leones marinos, rayas y peces de colores). Almuerzo a bordo incluido.'
        },
        accommodation: { en: 'Santa Cruz Island', es: 'Isla Santa Cruz' }
      },
      {
        day: 5,
        title: { en: 'Day 5: Santa Cruz – San Cristóbal – Interpretation Center – Tijeretas – La Lobería', es: 'Día 5: Santa Cruz – San Cristóbal – Centro de Interpretación – Tijeretas – La Lobería' },
        description: {
          en: 'After breakfast, transfer to the pier for a speedboat journey to San Cristóbal Island. Upon arrival in Puerto Baquerizo Moreno, visit the San Cristóbal Interpretation Center to learn about the islands\' volcanic origins and history. Continue to Tijeretas Hill for panoramic coastal views and frigatebird watching. Finally, visit La Lobería beach to observe sea lions resting and playing. Return to Puerto Baquerizo Moreno for your final evening in Galápagos.',
          es: 'Lancha a Isla San Cristóbal. Visita al Centro de Interpretación de San Cristóbal, caminata al mirador de Cerro Tijeretas con avistamiento de fragatas y relax en la playa La Lobería con lobos marinos. Noche en San Cristóbal.'
        },
        accommodation: { en: 'San Cristóbal Island', es: 'Isla San Cristóbal' }
      },
      {
        day: 6,
        title: { en: 'Day 6: San Cristóbal – Airport Transfer and Departure', es: 'Día 6: San Cristóbal – Traslado al Aeropuerto y Salida' },
        description: {
          en: 'After breakfast, enjoy some free time depending on your flight schedule. At the appropriate time, transfer to San Cristóbal Airport for your departure flight back to the mainland.',
          es: 'Desayuno y tiempo libre hasta el traslado al Aeropuerto de San Cristóbal para abordar su vuelo de retorno al continente.'
        }
      }
    ]
  },

  // Tour 4: DAILY TOURS
  {
    id: 'ecuador-daily-tours',
    title: { en: 'ECUADOR MAINLAND: DAILY TOURS', es: 'ECUADOR CONTINENTAL: TOURS DIARIOS', fr: 'ÉQUATEUR: EXCURSIONS D\'UNE JOURNÉE', de: 'ECUADOR: TAGESAUSFLÜGE', it: 'ECUADOR: ESCURSIONI GIORNALIERE', pt: 'EQUADOR: PASSEIOS DIÁRIOS', ja: 'エクアドル日帰りオプショナルツアー', zh: '厄瓜多尔一日游精选' },
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
      en: 'Select from 7 curated 1-day immersive excursions across mainland Ecuador: 1.1 Quito City Tour & Mitad del Mundo ($80), 1.2 Otavalo Indigenous Market ($90), 1.3 Papallacta Hot Springs ($90), 1.4 Mindo Cloud Forest ($90), 1.5 Antisana National Park ($90), 1.6 Cotopaxi National Park ($90), and 1.7 Quilotoa Crater Lake ($100).',
      es: 'Elige entre 7 excursiones de 1 día curadas en Ecuador continental: 1.1 Quito y Mitad del Mundo ($80), 1.2 Mercado Indígena de Otavalo ($90), 1.3 Termas de Papallacta ($90), 1.4 Bosque Nublado de Mindo ($90), 1.5 Parque Nacional Antisana ($90), 1.6 Volcán Cotopaxi ($90) y 1.7 Laguna de Quilotoa ($100).',
      zh: '精选7条厄瓜多尔大陆1日沉浸式游览路线：基多与赤道纪念碑（$80）、奥塔瓦洛印第安集市（$90）、帕帕亚克塔高山温泉（$90）、明多云雾森林（$90）、安蒂萨纳国家公园（$90）、科托帕希火山（$90）与基洛托阿火山湖（$100）。'
    },
    highlights: [
      { en: '1.1 Quito City Tour & Mitad del Mundo ($80)', es: '1.1 City Tour Quito y Mitad del Mundo ($80)', zh: '1.1 基多城市游与赤道纪念碑 ($80)' },
      { en: '1.2 Otavalo Indigenous Market & Cuicocha ($90)', es: '1.2 Mercado Indígena de Otavalo y Cuicocha ($90)', zh: '1.2 奥塔瓦洛集市与库伊科查火山湖 ($90)' },
      { en: '1.3 Papallacta Hot Springs ($90)', es: '1.3 Termas de Papallacta ($90)', zh: '1.3 帕帕亚克塔高山温泉 ($90)' },
      { en: '1.4 Mindo Cloud Forest & Waterfalls ($90)', es: '1.4 Bosque Nublado de Mindo y Cascadas ($90)', zh: '1.4 明多云雾森林与瀑布群 ($90)' },
      { en: '1.5 Antisana National Park & Condor Watching ($90)', es: '1.5 Parque Nacional Antisana y Cóndores ($90)', zh: '1.5 安蒂萨纳国家公园与安第斯神鹰观赏 ($90)' },
      { en: '1.6 Cotopaxi Volcano National Park ($90)', es: '1.6 Parque Nacional Volcán Cotopaxi ($90)', zh: '1.6 科托帕希火山国家公园 ($90)' },
      { en: '1.7 Quilotoa Turquoise Crater Lake ($100)', es: '1.7 Laguna Cráter de Quilotoa ($100)', zh: '1.7 基洛托阿翡翠火山湖 ($100)' }
    ],
    inclusions: [
      { en: 'Private transportation with professional driver', es: 'Transporte privado con conductor' },
      { en: 'Bilingual guide (English/Spanish)', es: 'Guía bilingüe (Inglés/Español)' }
    ],
    exclusions: [
      { en: 'Entrance fees, meals, optional activities, personal expenses', es: 'Entradas, comidas, actividades opcionales y gastos personales' }
    ],
    itinerary: [
      {
        day: 1,
        title: { en: '1.1 – QUITO CITY TOUR & MITAD DEL MUNDO (USD 80 | 5–6h)', es: '1.1 – CITY TOUR QUITO Y MITAD DEL MUNDO ($80 | 5–6h)' },
        description: {
          en: 'Quito was declared a UNESCO World Cultural Heritage Site in 1978. Explore modern and historic Quito: Quito Cathedral, Archbishop\'s Palace, Presidential Palace (Carondelet), La Compañía de Jesús with its gold leaf interior, San Francisco Square, El Panecillo viewpoint with 360-degree panoramic views, and Mitad del Mundo Intiñan Museum experiments at Latitude 0° 0\' 0".',
          es: 'Recorrido colonial por Quito (Patrimonio UNESCO): Plaza Grande, Catedral, Palacio de Carondelet, Iglesia de La Compañía con sus interiores de pan de oro, Plaza San Francisco, Mirador de El Panecillo y Museo Intiñan en la Mitad del Mundo.'
        }
      },
      {
        day: 2,
        title: { en: '1.2 – OTAVALO INDIGENOUS MARKET (USD 90 | Full-Day)', es: '1.2 – MERCADO INDÍGENA DE OTAVALO ($90 | Full-Day)' },
        description: {
          en: 'Travel north from Quito through Andean landscapes to Otavalo, visiting the famous Plaza de los Ponchos market with textiles and handicrafts. Continue to Cotacachi for leather goods and visit Cuicocha Crater Lake before returning to Quito.',
          es: 'Viaje a Otavalo para visitar el mercado de artesanías y textiles de la Plaza de los Ponchos. Visita a la ciudad artesanal de cuero de Cotacachi y caminata panorámica junto a la Laguna de Cuicocha.'
        }
      },
      {
        day: 3,
        title: { en: '1.3 – PAPALLACTA HOT SPRINGS (USD 90 | Full-Day)', es: '1.3 – TERMAS DE PAPALLACTA ($90 | Full-Day)' },
        description: {
          en: 'Cross the Andes at 4,100 meters elevation towards the Amazon transition zone. Relax in thermal volcanic pools at different temperatures with Antisana Volcano views, spa wellness options, and highland nature trails.',
          es: 'Cruce de la cordillera andina a 4.100 metros hacia los baños termales volcánicos de Papallacta con vista al Volcán Antisana, senderismo ecológico y relajación en piscinas minerales.'
        }
      },
      {
        day: 4,
        title: { en: '1.4 – MINDO CLOUD FOREST (USD 90 | Full-Day)', es: '1.4 – BOSQUE NUBLADO DE MINDO ($90 | Full-Day)' },
        description: {
          en: 'Descend from 2,800m to 1,600m into the biodiversity-rich Mindo cloud forest. Visit butterfly and orchid sanctuaries, optional tarabita cable-car/canopy zipline, and hike to the Mindo-Nambillo Waterfalls in a world-renowned birdwatching haven.',
          es: 'Descenso al exuberante bosque nublado de Mindo: mariposario, orquideario, tarabita sobre el dosel vegetal, caminata a las cascadas de Nambillo y avistamiento de aves exóticas.'
        }
      },
      {
        day: 5,
        title: { en: '1.5 – ANTISANA NATIONAL PARK (USD 90 | Full-Day)', es: '1.5 – PARQUE NACIONAL ANTISANA ($90 | Full-Day)' },
        description: {
          en: 'Explore Antisana National Park, famous for 20km lava flows and Andean condor watching. Hike around La Mica Lagoon with views of the glacier-covered Antisana Volcano (5,704m).',
          es: 'Expedición al Parque Nacional Antisana: observación del majestuoso Cóndor Andino en libertad, flujos de lava fósil y caminata por la Laguna La Mica frente al glaciar del Volcán Antisana.'
        }
      },
      {
        day: 6,
        title: { en: '1.6 – COTOPAXI NATIONAL PARK (USD 90 | Full-Day)', es: '1.6 – PARQUE NACIONAL VOLCÁN COTOPAXI ($90 | Full-Day)' },
        description: {
          en: 'Discover active Cotopaxi Volcano (5,897m). Hike from the parking area at 4,500m to the José Rivas Mountain Refuge at 4,800m and towards the glaciers, with Interpretation Center and Limpiopungo Lagoon nature walks.',
          es: 'Visita al Volcán Cotopaxi (5.897m): caminata desde los 4.500m hasta el Refugio José Rivas (4.800m), visita a la Laguna de Limpiopungo y Centro de Interpretación del páramo andino.'
        }
      },
      {
        day: 7,
        title: { en: '1.7 – QUILOTOA CRATER LAKE (USD 100 | Full-Day)', es: '1.7 – LAGUNA CRÁTER DE QUILOTOA ($100 | Full-Day)' },
        description: {
          en: 'Journey along the western Andes to Quilotoa Crater Lake inside the Ilinizas Reserve. Hike down into the volcanic caldera to the emerald waters with optional horseback ascent, plus stops at Tigua art galleries and a traditional guinea pig farm.',
          es: 'Excursión a la impresionante Laguna de Quilotoa dentro del cráter volcánico esmeralda a 3.500m, con descenso a la orilla del lago, visita al pueblo de pintores de Tigua y crianza andina tradicional.'
        }
      }
    ]
  },

  // Tour 5: ECUADOR: VOLCANOES & RIVERS – 8 DAYS / 7 NIGHTS
  {
    id: 'volcanoes-rivers-8days',
    title: { en: 'ECUADOR: VOLCANOES & RIVERS 8 DAYS', es: 'ECUADOR: VOLCANES Y RÍOS 8 DÍAS', fr: 'ÉQUATEUR: VOLCANS ET RIVIÈRES 8 JOURS', de: 'ECUADOR: VULKANE & FLÜSSE 8 TAGE', it: 'ECUADOR: VULCANI E FIUMI 8 GIORNI', pt: 'EQUADOR: VULCÕES E RIOS 8 DIAS', ja: 'エクアドル：火山と川の旅 8日間', zh: '厄瓜多尔：火山与河流全景8日游' },
    destination: 'Ecuador',
    duration: { en: '8 DAYS / 7 NIGHTS', es: '8 DÍAS / 7 NOCHES', fr: '8 JOURS / 7 NUITS', de: '8 TAGE / 7 NÄCHTE', it: '8 GIORNI / 7 NOTTI', pt: '8 DIAS / 7 NOITES', ja: '8日間 / 7泊', zh: '8天 / 7晚' },
    durationDays: 8,
    price: 1543,
    price3Star: 1543,
    price4Star: 1800,
    imageUrl: '/images/tours/9-16/avenue-of-volcanoes-9-16.jpg',
    mobileImage: '/images/tours/9-16/avenue-of-volcanoes-9-16.jpg',
    desktopImage: '/images/tours/16-9/cotopaxi-16-9.jpg',
    gallery: ['/images/tours/9-16/quito-la-compania-9-16.jpg', '/images/tours/9-16/mitad-del-mundo-9-16.jpg', '/images/tours/9-16/papallacta-hot-springs-9-16.jpg', '/images/tours/9-16/tena-amazon-jungle-9-16.jpg', '/images/tours/9-16/pailon-del-diablo-9-16.jpg', '/images/tours/9-16/banos-de-agua-santa-9-16.jpg'],
    rating: 5,
    reviewsCount: 31,
    isPopular: true,
    category: { en: 'Andes & Amazon Overland', es: 'Andes y Amazonía Overland', fr: 'Aventure Andes & Amazonie', de: 'Anden- & Amazonas-Reise', it: 'Overland Ande e Amazzonia', pt: 'Expedição Andes e Amazônia', ja: 'アンデス＆アマゾン周遊', zh: '安第斯与亚马逊经典穿越' },
    description: {
      en: '8-day overland journey connecting Quito colonial historic center, Equator Line, Papallacta thermal springs, Tena Amazon lodge with motorized canoe, Yanacocha rescue biopark, Baños waterfalls & Pailón del Diablo, and Quilotoa crater lake.',
      es: 'Travesía de 8 días conectando Quito colonial, Mitad del Mundo, Termas de Papallacta, lodge en la selva amazónica de Tena en canoa motorizada, bioparque Yanacocha en Puyo, cascada Pailón del Diablo en Baños y cráter de Quilotoa.',
      zh: '8日私人全景之旅，涵盖基多历史中心、赤道纪念碑、帕帕亚克塔温泉、特纳亚马逊雨林精品木屋、动力木舟、普约亚纳科查生物公园、巴尼奥斯恶魔之咽瀑布与基洛托阿火山湖。'
    },
    highlights: [
      { en: 'Quito Colonial Center & Equator Line', es: 'Centro Histórico de Quito y Mitad del Mundo', zh: '基多历史中心与赤道纪念碑' },
      { en: 'Papallacta High-Andean Thermal Baths', es: 'Termas de Papallacta en los Altos Andes', zh: '帕帕亚克塔高山温泉' },
      { en: 'Tena Amazon Lodge, Canoe & Kichwa Culture', es: 'Lodge en Tena, Canoa y Cultura Kichwa', zh: '特纳亚马逊雨林木屋与动力木舟' },
      { en: 'Yanacocha Wildlife Rescue & Pailón del Diablo', es: 'Bioparque Yanacocha y Pailón del Diablo', zh: '普约生物公园与巴尼奥斯瀑布群' },
      { en: 'Quilotoa Emerald Crater Lake & Tigua Art', es: 'Laguna de Quilotoa y Arte de Tigua', zh: '恶魔之咽瀑布与基洛托阿翡翠火山湖' }
    ],
    inclusions: [
      { en: 'Airport assistance and private transfers', es: 'Asistencia en aeropuerto y traslados privados' },
      { en: 'Private transportation throughout (4x4 or tourist bus)', es: 'Transporte privado en todo el recorrido' },
      { en: '7 nights accommodation in 3★ or 4★ hotels and Amazon lodge', es: '7 noches de hospedaje en hoteles 3★ o 4★ y lodge amazónico' },
      { en: 'Daily breakfast, lunch on Day 4, dinner on Day 4', es: 'Desayunos diarios, almuerzo y cena en el lodge' },
      { en: 'Entrances: La Compañía, Intiñan, Papallacta, Yanacocha, Pailón del Diablo, Ilinizas Quilotoa', es: 'Todas las entradas especificadas en el itinerario' },
      { en: 'Motorized canoe and Kichwa family experience', es: 'Canoa a motor y visita comunitaria Kichwa' }
    ],
    exclusions: [
      { en: 'Personal expenses and optional adventure activities in Baños', es: 'Gastos personales y actividades opcionales en Baños' },
      { en: 'Meals not specified in the itinerary', es: 'Comidas no especificadas' }
    ],
    itinerary: [
      {
        day: 1,
        title: { en: 'DAY 1 – ARRIVAL IN QUITO', es: 'DÍA 1 – LLEGADA A QUITO' },
        description: {
          en: 'Airport Transfer (IN): Welcome at Quito International Airport and private transfer to your hotel. The remainder of the day is free to rest and acclimatize.',
          es: 'Recepción en el Aeropuerto Internacional de Quito y traslado privado a su hotel. Tiempo libre para descansar y aclimatarse.'
        },
        accommodation: { en: 'Quito', es: 'Quito' }
      },
      {
        day: 2,
        title: { en: 'DAY 2 – QUITO CITY TOUR & EQUATOR LINE', es: 'DÍA 2 – CITY TOUR QUITO Y MITAD DEL MUNDO' },
        description: {
          en: 'Quito was declared a UNESCO World Cultural Heritage Site in 1978. Explore historic Quito: Cathedral, Archbishop\'s Palace, Carondelet Palace, Plaza Grande, and the gold-leaf decorated church of La Compañía de Jesús and San Francisco. Afterward, visit Mitad del Mundo Intiñan Museum to experience standing in both hemispheres simultaneously.',
          es: 'Recorrido por el centro histórico colonial de Quito: Plaza Grande, Catedral, Palacio de Carondelet, Iglesia de La Compañía y San Francisco. Luego viaje a la Mitad del Mundo con experimentos científicos en el Museo Intiñan.'
        },
        meals: { en: 'Breakfast', es: 'Desayuno' },
        accommodation: { en: 'Quito', es: 'Quito' }
      },
      {
        day: 3,
        title: { en: 'DAY 3 – QUITO – PAPALLACTA – AMAZON RAINFOREST', es: 'DÍA 3 – QUITO – PAPALLACTA – SELVA AMAZÓNICA' },
        description: {
          en: 'Travel east from Quito across the Andes at 4,100 meters elevation. Stop at Papallacta Hot Springs for relaxing in thermal volcanic pools with Antisana Volcano views. Continue descending towards the Amazon rainforest and the town of Tena for overnight at the lodge.',
          es: 'Travesía andina a 4.100 metros con parada en las Termas de Papallacta con vista al Volcán Antisana. Descenso a la Amazonía ecuatoriana hacia Tena para alojamiento en lodge de selva.'
        },
        meals: { en: 'Breakfast', es: 'Desayuno' },
        accommodation: { en: 'Tena Lodge', es: 'Lodge en Tena' }
      },
      {
        day: 4,
        title: { en: 'DAY 4 – TENA & AMAZON RAINFOREST', es: 'DÍA 4 – TENA Y SELVA AMAZÓNICA' },
        description: {
          en: 'Board a motorized canoe downstream to visit a wildlife rescue center. Take a guided hike through primary rainforest discovering Amazon biodiversity, visit a local Kichwa family to learn ancestral traditions, and visit a caiman lagoon before returning to the lodge.',
          es: 'Navegación en canoa a motor por el río, visita al centro de rescate de fauna silvestre amazónica, caminata por selva primaria con guía nativo, convivencia con familia Kichwa y observación en laguna de caimanes.'
        },
        meals: { en: 'Breakfast, lunch, and dinner', es: 'Desayuno, almuerzo y cena' },
        accommodation: { en: 'Tena Lodge', es: 'Lodge en Tena' }
      },
      {
        day: 5,
        title: { en: 'DAY 5 – TENA – PUYO – BAÑOS', es: 'DÍA 5 – TENA – PUYO – BAÑOS' },
        description: {
          en: 'Travel south towards Puyo to visit Yanacocha Biopark for rescued wildlife. Continue along the scenic Route of the Waterfalls to Baños, hiking to the thunderous Pailón del Diablo Waterfall.',
          es: 'Viaje hacia Puyo con visita al Bioparque Yanacocha de fauna rescatada. Continuación por la Ruta de las Cascadas hacia Baños de Agua Santa con caminata a la Cascada Pailón del Diablo.'
        },
        meals: { en: 'Breakfast', es: 'Desayuno' },
        accommodation: { en: 'Baños', es: 'Baños de Agua Santa' }
      },
      {
        day: 6,
        title: { en: 'DAY 6 – BAÑOS – FREE DAY', es: 'DÍA 6 – BAÑOS – DÍA LIBRE' },
        description: {
          en: 'Enjoy a free day in Baños at the foothills of Tungurahua Volcano with optional activities: cycling, rafting, waterfalls, cable-car tarabita rides, and horseback riding.',
          es: 'Día libre en Baños para actividades opcionales: ciclismo de montaña, rafting, tarabitas, senderismo o descanso en las aguas termales de la ciudad.'
        },
        meals: { en: 'Breakfast', es: 'Desayuno' },
        accommodation: { en: 'Baños', es: 'Baños de Agua Santa' }
      },
      {
        day: 7,
        title: { en: 'DAY 7 – BAÑOS – QUILOTOA – QUITO', es: 'DÍA 7 – BAÑOS – QUILOTOA – QUITO' },
        description: {
          en: 'Journey to Quilotoa Crater Lake for a 2-hour hike into the turquoise volcanic caldera, with a stop at Tigua village for colorful Andean paintings and traditional farms before returning to Quito.',
          es: 'Viaje a la Laguna de Quilotoa con caminata al cráter volcánico de agua color turquesa, parada en Tigua para admirar su arte pictórico indígena y arribo a Quito.'
        },
        meals: { en: 'Breakfast', es: 'Desayuno' },
        accommodation: { en: 'Quito', es: 'Quito' }
      },
      {
        day: 8,
        title: { en: 'DAY 8 – TRANSFER TO THE AIRPORT', es: 'DÍA 8 – TRASLADO AL AEROPUERTO' },
        description: {
          en: 'Private transfer to Quito International Airport for onward flight connections to the Galápagos Islands or international departures.',
          es: 'Traslado privado al Aeropuerto Internacional de Quito para su vuelo de conexión a Galápagos o retorno internacional.'
        }
      }
    ]
  },

  // Tour 6: ECUADOR: ANDES & AMAZON RAINFOREST – 7 DAYS / 6 NIGHTS
  {
    id: 'andes-amazon-7days',
    title: { en: 'ECUADOR: ANDES & AMAZON RAINFOREST 7 DAYS', es: 'ECUADOR: ANDES Y SELVA AMAZÓNICA 7 DÍAS', fr: 'ÉQUATEUR: ANDES ET FORÊT AMAZONIENNE 7 JOURS', de: 'ECUADOR: ANDEN & AMAZONAS REGENWALD 7 TAGE', it: 'ECUADOR: ANDE E FORESTA AMAZZONICA 7 GIORNI', pt: 'EQUADOR: ANDES E FLORESTA AMAZÔNICA 7 DIAS', ja: 'エクアドル：アンデス＆アマゾン 7日間', zh: '厄瓜多尔：安第斯与亚马逊雨林探险7日游' },
    destination: 'Ecuador',
    duration: { en: '7 DAYS / 6 NIGHTS', es: '7 DÍAS / 6 NOCHES', fr: '7 JOURS / 6 NUITS', de: '7 TAGE / 6 NÄCHTE', it: '7 GIORNI / 6 NOTTI', pt: '7 DIAS / 6 NOITES', ja: '7日間 / 6泊', zh: '7天 / 6晚' },
    durationDays: 7,
    price: 1307,
    price3Star: 1307,
    price4Star: 1600,
    imageUrl: '/images/tours/9-16/amazon-river-canoe-9-16.jpg',
    mobileImage: '/images/tours/9-16/amazon-river-canoe-9-16.jpg',
    desktopImage: '/images/tours/16-9/amazon-jungle-16-9.jpg',
    gallery: ['/images/tours/9-16/quito-la-compania-9-16.jpg', '/images/tours/9-16/papallacta-hot-springs-9-16.jpg', '/images/tours/9-16/tena-amazon-jungle-9-16.jpg', '/images/tours/9-16/amazon-river-canoe-9-16.jpg', '/images/tours/9-16/kichwa-community-9-16.jpg'],
    rating: 5,
    reviewsCount: 26,
    category: { en: 'Andes & Amazon Expedition', es: 'Expedición Andes y Amazonía', fr: 'Expédition Andes & Amazonie', de: 'Anden- & Amazonas-Expedition', it: 'Spedizione Ande e Amazzonia', pt: 'Expedição Andes e Amazônia', ja: 'アンデス＆アマゾン探検', zh: '雨林木屋沉浸探险' },
    description: {
      en: '7-day immersion combining Quito UNESCO colonial heritage, Equator line, Papallacta thermal springs, Tena jungle lodge, motorized river canoe, Kichwa indigenous encounter, and Paikawe Amazon reserve giant fish lagoon.',
      es: '7 días de inmersión combinando el centro histórico de Quito, Mitad del Mundo, Termas de Papallacta, lodge en la selva de Tena, canoa a motor, cultura Kichwa y la Reserva Paikawe de peces gigantes en Misahuallí.',
      zh: '7日沉浸式探险，结合基多殖民文化遗产、赤道线、帕帕亚克塔温泉、特纳雨林木屋、动力木舟、奇瓦文化体验、派卡韦亚马逊保护区巨型鱼类观赏。'
    },
    highlights: [
      { en: 'Quito Colonial Center & Equator Monument', es: 'Centro Colonial de Quito y Mitad del Mundo', zh: '基多历史中心与赤道纪念碑' },
      { en: 'Papallacta High-Andean Hot Springs', es: 'Termas de Papallacta', zh: '帕帕亚克塔高山温泉' },
      { en: 'Tena Amazon Rainforest Lodge & Canoe', es: 'Lodge en Tena y Canoa Motorizada', zh: '特纳雨林木屋与动力木舟' },
      { en: 'Kichwa Cultural Experience & Caiman Lagoon', es: 'Encuentro Kichwa y Laguna de Caimanes', zh: '奇瓦印第安体验与鳄鱼湖' },
      { en: 'Misahuallí & Paikawe Giant Fish Reserve', es: 'Misahuallí y Reserva de Peces Gigantes Paikawe', zh: '米萨瓦利与派卡韦巨鱼保护区' }
    ],
    inclusions: [
      { en: 'Airport welcome and private transportation', es: 'Asistencia en aeropuerto y transporte privado' },
      { en: '6 nights accommodation in selected 3★ or 4★ hotels and Amazon lodge', es: '6 noches de hospedaje en hoteles 3★ o 4★ y lodge amazónico' },
      { en: 'Daily breakfast, lunch and dinner at Amazon lodge', es: 'Desayunos diarios, almuerzo y cena en lodge' },
      { en: 'Entrances: La Compañía, Intiñan, Papallacta, Paikawe Reserve', es: 'Entradas según itinerario' }
    ],
    exclusions: [
      { en: 'Personal expenses and services not specified', es: 'Gastos personales y no especificados' }
    ],
    itinerary: [
      {
        day: 1,
        title: { en: 'DAY 1 – ARRIVAL IN QUITO', es: 'DÍA 1 – LLEGADA A QUITO' },
        description: {
          en: 'Airport Transfer (IN): Welcome at Quito International Airport and private transfer to your hotel. Free time to rest.',
          es: 'Bienvenida en el Aeropuerto de Quito y traslado privado al hotel.'
        },
        accommodation: { en: 'Quito', es: 'Quito' }
      },
      {
        day: 2,
        title: { en: 'DAY 2 – QUITO CITY TOUR & EQUATOR LINE', es: 'DÍA 2 – CITY TOUR QUITO Y MITAD DEL MUNDO' },
        description: {
          en: 'Explore historic Quito (Plaza Grande, Cathedral, Carondelet Palace, La Compañía Church, San Francisco) and visit Mitad del Mundo Intiñan Museum.',
          es: 'Recorrido por las joyas coloniales de Quito y experimentos en la línea ecuatorial en el Museo Intiñan.'
        },
        meals: { en: 'Breakfast', es: 'Desayuno' },
        accommodation: { en: 'Quito', es: 'Quito' }
      },
      {
        day: 3,
        title: { en: 'DAY 3 – QUITO – PAPALLACTA – AMAZON RAINFOREST', es: 'DÍA 3 – QUITO – PAPALLACTA – SELVA AMAZÓNICA' },
        description: {
          en: 'Scenic drive across the Andes at 4,100 meters to Papallacta Hot Springs. Relax in thermal volcanic pools before continuing down to Tena for lodge check-in.',
          es: 'Cruce andino hacia las aguas termales de Papallacta con vistas al Antisana y descenso a la Amazonía en Tena.'
        },
        meals: { en: 'Breakfast', es: 'Desayuno' },
        accommodation: { en: 'Tena Lodge', es: 'Lodge en Tena' }
      },
      {
        day: 4,
        title: { en: 'DAY 4 – TENA & AMAZON RAINFOREST', es: 'DÍA 4 – TENA Y SELVA AMAZÓNICA' },
        description: {
          en: 'Motorized canoe trip along the river to a wildlife rescue center. Guided rainforest hike, Kichwa family cultural visit, and caiman lagoon.',
          es: 'Canoa a motor por el río, centro de rescate de fauna, caminata guiada por la selva, visita comunitaria Kichwa y laguna de caimanes.'
        },
        meals: { en: 'Breakfast, lunch, and dinner', es: 'Desayuno, almuerzo y cena' },
        accommodation: { en: 'Tena Lodge', es: 'Lodge en Tena' }
      },
      {
        day: 5,
        title: { en: 'DAY 5 – MISAHUALLÍ – PAIKAWE RESERVE – QUITO', es: 'DÍA 5 – MISAHUALLÍ – RESERVA PAIKAWE – QUITO' },
        description: {
          en: 'Visit Paikawe Reserve in Misahuallí to hike primary rainforest and navigate the lagoon by boat to observe Amazon giant fish before returning to Quito.',
          es: 'Excursión a la Reserva Paikawe para observar los peces gigantes amazónicos en canoa y retorno a la ciudad de Quito.'
        },
        meals: { en: 'Breakfast', es: 'Desayuno' },
        accommodation: { en: 'Quito', es: 'Quito' }
      },
      {
        day: 6,
        title: { en: 'DAY 6 – FREE DAY IN QUITO', es: 'DÍA 6 – DÍA LIBRE EN QUITO' },
        description: {
          en: 'Enjoy a free day to relax, explore Quito independently, or discover more cultural highlights before your onward travels.',
          es: 'Día libre en Quito para compras de artesanías, museos o gastronomía local.'
        },
        meals: { en: 'Breakfast', es: 'Desayuno' },
        accommodation: { en: 'Quito', es: 'Quito' }
      },
      {
        day: 7,
        title: { en: 'DAY 7 – TRANSFER TO THE AIRPORT', es: 'DÍA 7 – TRASLADO AL AEROPUERTO' },
        description: {
          en: 'Private transfer to the airport for onward flight connections to the Galápagos Islands or international departures.',
          es: 'Traslado privado al aeropuerto para su vuelo a Galápagos o retorno internacional.'
        }
      }
    ]
  },

  // Tour 7: SNOW-CAPPED VOLCANOES & WATERFALLS – 6 DAYS / 5 NIGHTS
  {
    id: 'snow-volcanoes-6days',
    title: { en: 'SNOW-CAPPED VOLCANOES & WATERFALLS 6 DAYS', es: 'VOLCANES NEVADOS Y CASCADAS 6 DÍAS', fr: 'VOLCANS ENNEIGÉS ET CASCADES 6 JOURS', de: 'SCHNEEGEKRÖNTE VULKANE & WASSERFÄLLE 6 TAGE', it: 'VULCANI INNEVATI E CASCATE 6 GIORNI', pt: 'VULCÕES NEVADOS E CACHOEIRAS 6 DIAS', ja: '雪を頂いた火山と滝 6日間', zh: '雪山火山与壮美瀑布6日游' },
    destination: 'Ecuador',
    duration: { en: '6 DAYS / 5 NIGHTS', es: '6 DÍAS / 5 NOCHES', fr: '6 JOURS / 5 NUITS', de: '6 TAGE / 5 NÄCHTE', it: '6 GIORNI / 5 NOTTI', pt: '6 DIAS / 5 NOITES', ja: '6日間 / 5泊', zh: '6天 / 5晚' },
    durationDays: 6,
    price: 1102,
    price3Star: 1102,
    price4Star: 1300,
    imageUrl: '/images/tours/9-16/pastaza-canyon-9-16.jpg',
    mobileImage: '/images/tours/9-16/pastaza-canyon-9-16.jpg',
    desktopImage: '/images/tours/16-9/pailon-del-diablo-16-9.jpg',
    gallery: ['/images/tours/9-16/avenue-of-volcanoes-9-16.jpg', '/images/tours/9-16/pailon-del-diablo-9-16.jpg', '/images/tours/9-16/puyo-yanacocha-9-16.jpg', '/images/tours/9-16/pastaza-canyon-9-16.jpg'],
    rating: 5,
    reviewsCount: 19,
    category: { en: 'Volcanoes & Adventure', es: 'Volcanes y Aventura', fr: 'Volcans et Aventure', de: 'Vulkane & Abenteuer', it: 'Vulcani e Avventura', pt: 'Vulcões e Aventura', ja: '火山とアドベンチャー', zh: '火山与探险之路' },
    description: {
      en: '6-day overland journey through the Avenue of Volcanoes, Baños adventure town, Pailón del Diablo waterfall, Pastaza Canyon, Puyo Yanacocha biopark, Hola Vida waterfall, and Quilotoa crater lake.',
      es: 'Travesía de 6 días a lo largo de la Avenida de los Volcanes, Baños, Cascada Pailón del Diablo, Cañón del Pastaza, Bioparque Yanacocha en Puyo, Cascada Hola Vida y Laguna de Quilotoa.',
      zh: '6日陆地景观之旅，沿着火山大道前进，游览冒险小镇巴尼奥斯、恶魔之咽瀑布、帕斯塔萨峡谷、普约雨林公园与基洛托阿翡翠火山湖。'
    },
    highlights: [
      { en: 'Avenue of the Volcanoes & Baños', es: 'Avenida de los Volcanes y Baños', zh: '火山大道与巴尼奥斯小镇' },
      { en: 'Pailón del Diablo Waterfall Hike', es: 'Caminata a la Cascada Pailón del Diablo', zh: '恶魔之咽瀑布徒步' },
      { en: 'Puyo Rainforest & Yanacocha Biopark', es: 'Selva de Puyo y Bioparque Yanacocha', zh: '普约雨林与亚纳科查生物公园' },
      { en: 'Hola Vida Waterfall & Indigenous Culture', es: 'Cascada Hola Vida y Familia Indígena', zh: '奥拉维达瀑布与奇瓦文化' },
      { en: 'Quilotoa Emerald Crater Lake', es: 'Laguna Cráter de Quilotoa', zh: '基洛托阿翡翠火山湖' }
    ],
    inclusions: [
      { en: 'Private transportation throughout (4x4 or tourist bus)', es: 'Transporte privado en todo el itinerario' },
      { en: '5 nights accommodation in selected 3★ or 4★ hotels', es: '5 noches de hospedaje en hoteles seleccionados' },
      { en: 'Daily breakfast and lunch on Day 3', es: 'Desayunos diarios y almuerzo en Día 3' },
      { en: 'Entrances: Pailón del Diablo, Yanacocha, Hola Vida, Quilotoa', es: 'Todas las entradas especificadas' }
    ],
    exclusions: [
      { en: 'Meals and services not specified in the program', es: 'Servicios y comidas no especificados' }
    ],
    itinerary: [
      {
        day: 1,
        title: { en: 'DAY 1 – ARRIVAL IN QUITO', es: 'DÍA 1 – LLEGADA A QUITO' },
        description: {
          en: 'Airport assistance and private transfer to your hotel in Quito. Free time to rest.',
          es: 'Asistencia en aeropuerto y traslado privado al hotel en Quito.'
        },
        accommodation: { en: 'Quito', es: 'Quito' }
      },
      {
        day: 2,
        title: { en: 'DAY 2 – QUITO – BAÑOS', es: 'DÍA 2 – QUITO – BAÑOS' },
        description: {
          en: 'Travel south along the Pan-American Highway through the Avenue of the Volcanoes to Baños at the foothills of Tungurahua Volcano. Visit the spectacular Pailón del Diablo Waterfall.',
          es: 'Viaje por la Avenida de los Volcanes hacia Baños de Agua Santa. Visita a la impresionante Cascada Pailón del Diablo.'
        },
        meals: { en: 'Breakfast', es: 'Desayuno' },
        accommodation: { en: 'Baños', es: 'Baños de Agua Santa' }
      },
      {
        day: 3,
        title: { en: 'DAY 3 – BAÑOS – AMAZON RAINFOREST – PUYO', es: 'DÍA 3 – BAÑOS – SELVA AMAZÓNICA – PUYO' },
        description: {
          en: 'Head into the Amazon through Pastaza River Canyon to Puyo. Visit Yanacocha Biopark for rescued wildlife, hike to Hola Vida Waterfall, and visit a local indigenous family before returning to Baños.',
          es: 'Excursión por el Cañón del Río Pastaza hacia Puyo: Bioparque Yanacocha, caminata a la Cascada Hola Vida y visita a familia Kichwa.'
        },
        meals: { en: 'Breakfast and lunch', es: 'Desayuno y almuerzo' },
        accommodation: { en: 'Baños', es: 'Baños de Agua Santa' }
      },
      {
        day: 4,
        title: { en: 'DAY 4 – BAÑOS – QUILOTOA – QUITO', es: 'DÍA 4 – BAÑOS – QUILOTOA – QUITO' },
        description: {
          en: 'Journey to Quilotoa Crater Lake for a 2-hour hike inside the volcanic caldera at 3,500m elevation. Stop at Tigua for colorful paintings before continuing to Quito.',
          es: 'Viaje hacia la Laguna de Quilotoa con caminata al fondo del cráter turquesa y parada artística en Tigua antes de llegar a Quito.'
        },
        meals: { en: 'Breakfast', es: 'Desayuno' },
        accommodation: { en: 'Quito', es: 'Quito' }
      },
      {
        day: 5,
        title: { en: 'DAY 5 – FREE DAY IN QUITO', es: 'DÍA 5 – DÍA LIBRE EN QUITO' },
        description: {
          en: 'Enjoy a free day to explore Quito at your own pace, relax, or discover more cultural attractions.',
          es: 'Día libre en Quito para explorar la ciudad colonial o relajarse.'
        },
        meals: { en: 'Breakfast', es: 'Desayuno' },
        accommodation: { en: 'Quito', es: 'Quito' }
      },
      {
        day: 6,
        title: { en: 'DAY 6 – TRANSFER TO THE AIRPORT', es: 'DÍA 6 – TRASLADO AL AEROPUERTO' },
        description: {
          en: 'Private transfer to the airport for onward flight connections, including connections to the Galápagos Islands.',
          es: 'Traslado privado al aeropuerto para su vuelo a Galápagos o retorno internacional.'
        }
      }
    ]
  },

  // Tour 8: ECUADOR FANTASTIC – 8 DAYS / 7 NIGHTS
  {
    id: 'ecuador-fantastic-8days',
    title: { en: 'ECUADOR FANTASTIC – 8 DAYS / 7 NIGHTS', es: 'ECUADOR FANTÁSTICO – 8 DÍAS / 7 NOCHES', fr: 'ÉQUATEUR FANTASTIQUE – 8 JOURS / 7 NUITS', de: 'FASZINIERENDES ECUADOR – 8 TAGE / 7 NÄCHTE', it: 'ECUADOR FANTASTICO – 8 GIORNI / 7 NOTTI', pt: 'EQUADOR FANTÁSTICO – 8 DIAS / 7 NOITES', ja: 'ファンタスティック・エクアドル 8日間', zh: '厄瓜多尔全景旗舰探险8日游' },
    destination: 'Ecuador',
    duration: { en: '8 DAYS / 7 NIGHTS', es: '8 DÍAS / 7 NOCHES', fr: '8 JOURS / 7 NUITS', de: '8 TAGE / 7 NÄCHTE', it: '8 GIORNI / 7 NOTTI', pt: '8 DIAS / 7 NOITES', ja: '8日間 / 7泊', zh: '8天 / 7晚' },
    durationDays: 8,
    price: 1512,
    price3Star: 1512,
    price4Star: 1799,
    imageUrl: '/images/tours/9-16/chimborazo-volcano-9-16.jpg',
    mobileImage: '/images/tours/9-16/chimborazo-volcano-9-16.jpg',
    desktopImage: '/images/tours/16-9/cajas-national-park-16-9.jpg',
    gallery: ['/images/tours/9-16/otavalo-market-9-16.jpg', '/images/tours/9-16/cuicocha-lake-9-16.jpg', '/images/tours/9-16/pailon-del-diablo-9-16.jpg', '/images/tours/9-16/chimborazo-volcano-9-16.jpg', '/images/tours/9-16/ingapirca-ruins-9-16.jpg', '/images/tours/9-16/cuenca-colonial-9-16.jpg', '/images/tours/9-16/cajas-national-park-9-16.jpg', '/images/tours/9-16/guayaquil-city-9-16.jpg'],
    rating: 5,
    reviewsCount: 35,
    isPopular: true,
    category: { en: 'Grand Mainland Circuit', es: 'Gran Circuito Continental', fr: 'Grand Circuit Continental', de: 'Grosse Rundreise Festland', it: 'Gran Circuito Continentale', pt: 'Grande Circuito Continental', ja: 'エクアドル大陸大縦断ツアー', zh: '大陆全景旗舰大纵贯' },
    description: {
      en: 'The definitive 8-day overland circuit from Quito to Guayaquil: Otavalo indigenous market, Cuicocha lake, Mitad del Mundo, Baños waterfalls, Chimborazo Volcano (6,310m), Ingapirca Inca ruins, Cuenca UNESCO city, and Cajas National Park.',
      es: 'El gran circuito terrestre de 8 días de Quito a Guayaquil: Mercado de Otavalo, Laguna de Cuicocha, Quito colonial, Mitad del Mundo, Baños Pailón del Diablo, Volcán Chimborazo (6.310m), ruinas incas de Ingapirca, Cuenca colonial, Parque Nacional Cajas y Guayaquil.',
      zh: '8日厄瓜多尔陆地旗舰探险，连接基多、奥塔瓦洛印第安集市、库伊科查湖、巴尼奥斯恶魔之咽、钦博拉索火山（6310米）、因加皮尔卡印加遗址、昆卡世界遗产城、卡哈斯国家公园与瓜亚基尔港。'
    },
    highlights: [
      { en: 'Otavalo Market & Cuicocha Crater Lake', es: 'Mercado de Otavalo y Laguna de Cuicocha', zh: '奥塔瓦洛集市与库伊科查火山湖' },
      { en: 'Quito Historic Center & Mitad del Mundo', es: 'Centro Histórico de Quito y Mitad del Mundo', zh: '基多历史中心与赤道纪念碑' },
      { en: 'Baños Adventure & Pailón del Diablo', es: 'Baños y Cascada Pailón del Diablo', zh: '巴尼奥斯与恶魔之咽瀑布' },
      { en: 'Chimborazo Wildlife Reserve (6,310m)', es: 'Reserva Volcán Chimborazo (6.310m)', zh: '钦博拉索火山保护区（6310米）' },
      { en: 'Ingapirca Inca Archaeological Complex & Cuenca', es: 'Ruinas de Ingapirca y Cuenca Colonial', zh: '因加皮尔卡印加遗址与昆卡古城' },
      { en: 'Cajas National Park & Guayaquil Port', es: 'Parque Nacional Cajas y Puerto de Guayaquil', zh: '卡哈斯国家公园与瓜亚基尔港' }
    ],
    inclusions: [
      { en: 'Airport assistance and private transfers', es: 'Asistencia en aeropuerto y traslados privados' },
      { en: 'Private transportation throughout the itinerary', es: 'Transporte privado en todo el itinerario' },
      { en: 'Professional English-speaking guide', es: 'Guía profesional bilingüe' },
      { en: '7 nights of accommodation in 3★ or 4★ hotels', es: '7 noches de hospedaje en hoteles 3★ o 4★' },
      { en: 'Daily breakfast', es: 'Desayunos diarios' },
      { en: 'Entrance fees: Cuicocha, La Compañía, Intiñan, Pailón del Diablo, Chimborazo, Ingapirca, Cajas', es: 'Todas las entradas especificadas' }
    ],
    exclusions: [
      { en: 'Meals and services not specified', es: 'Comidas y servicios no especificados' }
    ],
    itinerary: [
      {
        day: 1,
        title: { en: 'DAY 1 – ARRIVAL IN QUITO', es: 'DÍA 1 – LLEGADA A QUITO' },
        description: {
          en: 'Airport assistance and private transfer to your hotel in Quito. Free time to rest.',
          es: 'Recepción en el aeropuerto y traslado privado a su hotel en Quito.'
        },
        accommodation: { en: 'Quito', es: 'Quito' }
      },
      {
        day: 2,
        title: { en: 'DAY 2 – OTAVALO INDIGENOUS MARKET & CUICOCHA CRATER LAKE', es: 'DÍA 2 – MERCADO INDÍGENA DE OTAVALO Y LAGUNA DE CUICOCHA' },
        description: {
          en: 'Travel north to Otavalo, home to South America\'s most famous indigenous handicrafts market at Plaza de los Ponchos. Visit Cotacachi leather workshops and Cuicocha Crater Lake before returning to Quito.',
          es: 'Viaje a Otavalo para recorrer el famoso mercado indígena de la Plaza de los Ponchos, talleres de cuero en Cotacachi y vistas de la Laguna de Cuicocha.'
        },
        meals: { en: 'Breakfast', es: 'Desayuno' },
        accommodation: { en: 'Quito', es: 'Quito' }
      },
      {
        day: 3,
        title: { en: 'DAY 3 – QUITO HISTORIC CENTER & MITAD DEL MUNDO', es: 'DÍA 3 – CENTRO HISTÓRICO DE QUITO Y MITAD DEL MUNDO' },
        description: {
          en: 'Discover UNESCO-listed historic Quito: Cathedral, Archbishop\'s Palace, Carondelet, Plaza Grande, La Compañía golden church, and San Francisco. Visit Mitad del Mundo and the interactive Intiñan Museum.',
          es: 'Recorrido por las iglesias y plazas coloniales de Quito y visita a la línea ecuatorial en el Museo Intiñan en Mitad del Mundo.'
        },
        meals: { en: 'Breakfast', es: 'Desayuno' },
        accommodation: { en: 'Quito', es: 'Quito' }
      },
      {
        day: 4,
        title: { en: 'DAY 4 – QUITO – BAÑOS: THE AVENUE OF VOLCANOES', es: 'DÍA 4 – QUITO – BAÑOS: AVENIDA DE LOS VOLCANES' },
        description: {
          en: 'Travel south along the Avenue of the Volcanoes to Baños at the foothills of Tungurahua Volcano. Visit the famous Pailón del Diablo Waterfall before settling into your hotel.',
          es: 'Viaje por la Avenida de los Volcanes hacia Baños de Agua Santa con visita a la Cascada Pailón del Diablo.'
        },
        meals: { en: 'Breakfast', es: 'Desayuno' },
        accommodation: { en: 'Baños', es: 'Baños de Agua Santa' }
      },
      {
        day: 5,
        title: { en: 'DAY 5 – CHIMBORAZO NATIONAL RESERVE, INGAPIRCA & CUENCA', es: 'DÍA 5 – RESERVA CHIMBORAZO, INGAPIRCA Y CUENCA' },
        description: {
          en: 'Start early with Chimborazo Reserve, home to Ecuador\'s highest mountain (6,310m), observing high-Andean vicuñas with hike towards the 5,000m refuge. Continue to Ingapirca Inca ruins and arrive in Cuenca.',
          es: 'Visita a la Reserva del Volcán Chimborazo (6.310m) con vicuñas silvestres y ascenso al refugio. Continuación al complejo arqueológico inca de Ingapirca y llegada a Cuenca.'
        },
        meals: { en: 'Breakfast', es: 'Desayuno' },
        accommodation: { en: 'Cuenca', es: 'Cuenca' }
      },
      {
        day: 6,
        title: { en: 'DAY 6 – CUENCA CITY TOUR', es: 'DÍA 6 – CITY TOUR CUENCA' },
        description: {
          en: 'Discover UNESCO-listed Cuenca: Cathedral, Plaza de las Flores, traditional toquilla straw hat workshop ("Panama hats"), El Barranco along Tomebamba River, and El Turi Viewpoint.',
          es: 'Recorrido por la hermosa ciudad colonial de Cuenca: Catedral, Plaza de las Flores, fábrica tradicional de sombreros de toquilla, El Barranco y Mirador de Turi.'
        },
        meals: { en: 'Breakfast', es: 'Desayuno' },
        accommodation: { en: 'Cuenca', es: 'Cuenca' }
      },
      {
        day: 7,
        title: { en: 'DAY 7 – CUENCA – CAJAS NATIONAL PARK – GUAYAQUIL', es: 'DÍA 7 – CUENCA – PARQUE NACIONAL CAJAS – GUAYAQUIL' },
        description: {
          en: 'Travel west through spectacular Cajas National Park with 200 glacial lakes, hiking around Laguna Toreadora at 3,500m before descending dramatically to sea level in Guayaquil.',
          es: 'Caminata en el Parque Nacional Cajas junto a la Laguna Toreadora a 3.500m y descenso a la costa tropical hacia la ciudad portuaria de Guayaquil.'
        },
        meals: { en: 'Breakfast', es: 'Desayuno' },
        accommodation: { en: 'Guayaquil', es: 'Guayaquil' }
      },
      {
        day: 8,
        title: { en: 'DAY 8 – DEPARTURE FROM GUAYAQUIL', es: 'DÍA 8 – SALIDA DE GUAYAQUIL' },
        description: {
          en: 'Private transfer to José Joaquín de Olmedo International Airport in Guayaquil for your onward flight or connection to the Galápagos Islands.',
          es: 'Traslado privado al Aeropuerto Internacional de Guayaquil para su vuelo internacional o conexión a Galápagos.'
        }
      }
    ]
  },

  // Tour 9: ECUADOR & GALÁPAGOS ISLANDS 12 DAYS / 11 NIGHTS
  {
    id: 'ecuador-galapagos-12days',
    title: { en: 'ECUADOR & GALÁPAGOS ISLANDS 12 DAYS', es: 'ECUADOR Y GALÁPAGOS 12 DÍAS', fr: 'ÉQUATEUR ET GALAPAGOS 12 JOURS', de: 'ECUADOR & GALAPAGOS 12 TAGE', it: 'ECUADOR E GALAPAGOS 12 GIORNI', pt: 'EQUADOR E GALÁPAGOS 12 DIAS', ja: 'エクアドル＆ガラパゴス 12日間', zh: '厄瓜多尔与加拉帕戈斯顶级全览12日游' },
    destination: 'Galapagos',
    duration: { en: '12 DAYS / 11 NIGHTS', es: '12 DÍAS / 11 NOCHES', fr: '12 JOURS / 11 NUITS', de: '12 TAGE / 11 NÄCHTE', it: '12 GIORNI / 11 NOTTI', pt: '12 DIAS / 11 NOITES', ja: '12日間 / 11泊', zh: '12天 / 11晚' },
    durationDays: 12,
    price: 2797,
    price3Star: 2797,
    price4Star: 2950,
    imageUrl: '/images/tours/9-16/galapagos-isla-hermosa-9-16.jpg',
    mobileImage: '/images/tours/9-16/galapagos-isla-hermosa-9-16.jpg',
    desktopImage: '/images/tours/16-9/galapagos-tortuga-gigante-16-9.jpg',
    gallery: ['/images/tours/9-16/quito-la-compania-9-16.jpg', '/images/tours/9-16/mitad-del-mundo-9-16.jpg', '/images/tours/9-16/papallacta-hot-springs-9-16.jpg', '/images/tours/9-16/amazon-river-canoe-9-16.jpg', '/images/tours/9-16/tena-amazon-jungle-9-16.jpg', '/images/tours/9-16/santa-cruz-tierras-altas-9-16.jpg', '/images/tours/9-16/tintoreras-islet-9-16.jpg', '/images/tours/9-16/las-grietas-canyon-9-16.jpg', '/images/tours/9-16/santa-fe-island-9-16.jpg'],
    rating: 5,
    reviewsCount: 38,
    isPopular: true,
    category: { en: 'Ultimate Ecuador & Galapagos', es: 'Ecuador y Galápagos Definitivo', fr: 'Équateur et Galapagos Ultime', de: 'Ultimative Ecuador & Galapagos Reise', it: 'Il Meglio di Ecuador e Galapagos', pt: 'O Melhor do Equador e Galápagos', ja: 'エクアドル＆ガラパゴス究極の旅', zh: '顶级海陆奢华全景游' },
    description: {
      en: 'The ultimate 12-day luxury expedition: Quito UNESCO colonial center, Equator Line, Papallacta thermal pools, Tena Amazon lodge with motorized canoe, Paikawe giant fish reserve, Galapagos Santa Cruz highlands, giant tortoises, Isabela Island, Tintoreras snorkeling, Las Grietas, and full-day Santa Fe/Pinzon yacht cruise.',
      es: 'La expedición definitiva de 12 días: Quito colonial, Mitad del Mundo, Termas de Papallacta, lodge en la selva de Tena en canoa motorizada, Reserva Paikawe, Galápagos Santa Cruz, Rancho Primicias (tortugas gigantes), Isla Isabela, Tintoreras, Las Grietas y navegación a Santa Fe/Pinzón.',
      zh: '12日顶级奢华联合探险，涵盖基多历史名城、赤道线、帕帕亚克塔温泉、特纳亚马逊木屋、派卡韦保护区巨鱼、加拉帕戈斯圣克鲁斯、伊莎贝拉岛、蒂恩托雷拉斯石礁、拉斯格里塔斯及圣菲岛/平松岛全天游艇巡航。'
    },
    highlights: [
      { en: 'Quito Historic Center & Equator Monument', es: 'Centro Histórico de Quito y Mitad del Mundo', zh: '基多历史中心与赤道纪念碑' },
      { en: 'Papallacta High-Andean Hot Springs', es: 'Termas de Papallacta en los Andes', zh: '帕帕亚克塔高山温泉' },
      { en: 'Tena Amazon Rainforest Lodge & Canoe', es: 'Lodge en Tena y Canoa Amazónica', zh: '特纳亚马逊雨林木屋与木舟' },
      { en: 'Paikawe Reserve Giant Amazon Fish', es: 'Reserva Paikawe de Peces Gigantes', zh: '派卡韦保护区与巨型鱼类泻湖' },
      { en: 'Santa Cruz Highlands & Giant Tortoises', es: 'Tierras Altas de Santa Cruz y Tortugas Gigantes', zh: '圣克鲁斯高地与巨龟保护区' },
      { en: 'Isabela Island & Tintoreras Marine Snorkeling', es: 'Isla Isabela y Snorkeling en Tintoreras', zh: '伊莎贝拉岛与蒂恩托雷拉斯石礁' },
      { en: 'Full-Day Navigable Yacht Cruise Santa Fe or Pinzon', es: 'Navegación en Yate a Isla Santa Fe o Pinzón', zh: '圣菲岛或平松岛全天游艇巡航' }
    ],
    inclusions: [
      { en: 'Airport reception and all private ground/marine transfers', es: 'Recepción y todos los traslados privados' },
      { en: '11 nights accommodation in selected 3★ or 4★ hotels and Amazon lodge', es: '11 noches de hospedaje en hoteles 3★ o 4★ y lodge amazónico' },
      { en: 'Daily breakfast, lunches and dinners specified', es: 'Desayunos diarios y comidas especificadas' },
      { en: 'Certified Level III bilingual naturalist guides', es: 'Guías naturalistas certificados Nivel III' },
      { en: 'Snorkeling equipment and yacht navigation excursions', es: 'Equipo de snorkel completo y navegaciones en yate' }
    ],
    exclusions: [
      { en: 'Galapagos National Park Fee ($200 USD foreign)', es: 'Entrada Parque Nacional Galápagos ($200 USD extr.)' },
      { en: 'TCT Transit Control Card ($20 USD)', es: 'Tarjeta TCT ($20 USD)' }
    ],
    itinerary: [
      {
        day: 1,
        title: { en: 'DAY 1 – ARRIVAL IN QUITO | AIRPORT ASSISTANCE & HOTEL TRANSFER', es: 'DÍA 1 – LLEGADA A QUITO | ASISTENCIA Y TRASLADO' },
        description: {
          en: 'Welcome at Mariscal Sucre International Airport in Quito and private transfer to the hotel. Free time to rest and acclimatize.',
          es: 'Recepción en el Aeropuerto Internacional de Quito y traslado privado al hotel.'
        },
        accommodation: { en: 'Quito', es: 'Quito' }
      },
      {
        day: 2,
        title: { en: 'DAY 2 – QUITO CITY TOUR & MITAD DEL MUNDO', es: 'DÍA 2 – CITY TOUR QUITO Y MITAD DEL MUNDO' },
        description: {
          en: 'Explore historic Quito (Plaza Grande, Cathedral, Archbishop\'s Palace, Carondelet, La Compañía gold church, San Francisco) and visit Mitad del Mundo Intiñan Museum.',
          es: 'Recorrido colonial por Quito y experimentos en la línea ecuatorial en el Museo Intiñan.'
        },
        meals: { en: 'Breakfast', es: 'Desayuno' },
        accommodation: { en: 'Quito', es: 'Quito' }
      },
      {
        day: 3,
        title: { en: 'DAY 3 – QUITO – PAPALLACTA – TENA | ANDEAN HIGHLANDS & THERMAL SPRINGS', es: 'DÍA 3 – QUITO – PAPALLACTA – TENA | TERMAS ANDINAS' },
        description: {
          en: 'Travel east across the Andes at 4,100 meters to Papallacta Hot Springs. Relax in thermal volcanic pools with Antisana Volcano views before descending to Tena Amazon lodge.',
          es: 'Cruce andino hacia las aguas termales de Papallacta y descenso hacia el lodge amazónico en Tena.'
        },
        meals: { en: 'Breakfast', es: 'Desayuno' },
        accommodation: { en: 'Tena – Lodge', es: 'Tena – Lodge' }
      },
      {
        day: 4,
        title: { en: 'DAY 4 – TENA | AMAZON RAINFOREST EXPERIENCE | WILDLIFE RESCUE CENTER | KICHWA COMMUNITY', es: 'DÍA 4 – TENA | EXPERIENCIA AMAZÓNICA | CENTRO DE RESCATE | COMUNIDAD KICHWA' },
        description: {
          en: 'Motorized canoe along the river, wildlife rescue center, guided primary jungle hike with native guide, Kichwa family cultural encounter, and caiman lagoon.',
          es: 'Canoa a motor por el río, centro de rescate de fauna, caminata por la selva primaria, convivencia Kichwa y laguna de caimanes.'
        },
        meals: { en: 'Breakfast, lunch and dinner', es: 'Desayuno, almuerzo y cena' },
        accommodation: { en: 'Tena – Lodge', es: 'Tena – Lodge' }
      },
      {
        day: 5,
        title: { en: 'DAY 5 – TENA – MISAHUALLÍ | PAIKAWE RESERVE | AMAZON LAGOON | QUITO', es: 'DÍA 5 – TENA – MISAHUALLÍ | RESERVA PAIKAWE | QUITO' },
        description: {
          en: 'Visit Paikawe Reserve in Misahuallí to observe giant Amazonian fish in the lagoon by canoe before returning to Quito.',
          es: 'Visita a la Reserva Paikawe para observar los peces gigantes de la Amazonía y retorno a Quito.'
        },
        meals: { en: 'Breakfast', es: 'Desayuno' },
        accommodation: { en: 'Quito', es: 'Quito' }
      },
      {
        day: 6,
        title: { en: 'DAY 6 – QUITO | FREE DAY', es: 'DÍA 6 – QUITO | DÍA LIBRE' },
        description: {
          en: 'Free day in Quito to explore museums, cuisine, or rest before your flight to the Galápagos Islands.',
          es: 'Día libre en Quito para relajarse antes del vuelo a Galápagos.'
        },
        meals: { en: 'Breakfast', es: 'Desayuno' },
        accommodation: { en: 'Quito', es: 'Quito' }
      },
      {
        day: 7,
        title: { en: 'DAY 7 – QUITO – BALTRA | TWIN CRATERS | PRIMICIAS RANCH | PUERTO AYORA', es: 'DÍA 7 – VUELO A BALTRA | CRÁTERES GEMELOS | RANCHO PRIMICIAS' },
        description: {
          en: 'Flight to Baltra Airport. Cross Itabaca Channel to Santa Cruz highlands to visit Twin Craters and Primicias Ranch for giant tortoises in the wild. Check in Puerto Ayora.',
          es: 'Vuelo a Baltra, cruce de canal Itabaca, visita a los Cráteres Gemelos y tortugas gigantes en libertad en Rancho Primicias.'
        },
        meals: { en: 'Breakfast', es: 'Desayuno' },
        accommodation: { en: 'Santa Cruz Island – Puerto Ayora', es: 'Isla Santa Cruz – Puerto Ayora' }
      },
      {
        day: 8,
        title: { en: 'DAY 8 – SANTA CRUZ TO ISABELA | FLAMINGO LAGOON | TORTOISE BREEDING CENTER | TINTORERAS', es: 'DÍA 8 – SANTA CRUZ A ISABELA | FLAMINGOS | CENTRO DE CRIANZA | TINTORERAS' },
        description: {
          en: 'Speedboat to Isabela (2-2.5h). Visit Flamingo Lagoon, Giant Tortoise Breeding Center, and Tintoreras islet for snorkeling with sea lions, turtles, rays, and penguins.',
          es: 'Lancha a Isla Isabela, Laguna de Flamingos, Centro de Crianza y navegación a Tintoreras para snorkel con fauna marina.'
        },
        meals: { en: 'Breakfast', es: 'Desayuno' },
        accommodation: { en: 'Isabela Island – Puerto Villamil', es: 'Isla Isabela – Puerto Villamil' }
      },
      {
        day: 9,
        title: { en: 'DAY 9 – ISABELA TO SANTA CRUZ | LA LOBERÍA | LAS GRIETAS', es: 'DÍA 9 – ISABELA A SANTA CRUZ | LA LOBERÍA | LAS GRIETAS' },
        description: {
          en: 'Speedboat back to Santa Cruz. Visit La Lobería sea lions and swim/snorkel in the crystal-clear waters of Las Grietas volcanic canyon.',
          es: 'Lancha a Santa Cruz, observación de lobos marinos en La Lobería y nado en el cañón de Las Grietas.'
        },
        meals: { en: 'Breakfast', es: 'Desayuno' },
        accommodation: { en: 'Santa Cruz Island – Puerto Ayora', es: 'Isla Santa Cruz – Puerto Ayora' }
      },
      {
        day: 10,
        title: { en: 'DAY 10 – FULL-DAY EXCURSION TO SANTA FE OR PINZÓN ISLAND', es: 'DÍA 10 – EXCURSIÓN FULL-DAY A ISLA SANTA FE O PINZÓN' },
        description: {
          en: 'Full-day yacht cruise to Santa Fe or Pinzón Island for world-class marine wildlife snorkeling (sea turtles, sea lions, rays, penguins) with lunch on board.',
          es: 'Navegación de día completo en yate a Santa Fe o Pinzón con snorkel de clase mundial y almuerzo a bordo.'
        },
        meals: { en: 'Breakfast and lunch', es: 'Desayuno y almuerzo' },
        accommodation: { en: 'Santa Cruz Island – Puerto Ayora', es: 'Isla Santa Cruz – Puerto Ayora' }
      },
      {
        day: 11,
        title: { en: 'DAY 11 – SANTA CRUZ – BALTRA AIRPORT | DEPARTURE', es: 'DÍA 11 – TRASLADO AL AEROPUERTO DE BALTRA | SALIDA' },
        description: {
          en: 'Transfer from Puerto Ayora across Santa Cruz and Itabaca Channel to Baltra Airport for your flight back to Quito.',
          es: 'Traslado al Aeropuerto de Baltra para su vuelo de retorno a Quito.'
        },
        meals: { en: 'Breakfast', es: 'Desayuno' },
        accommodation: { en: 'Quito', es: 'Quito' }
      },
      {
        day: 12,
        title: { en: 'DAY 12 – QUITO | INTERNATIONAL DEPARTURE', es: 'DÍA 12 – QUITO | SALIDA INTERNACIONAL' },
        description: {
          en: 'Private transfer to Mariscal Sucre International Airport for your international departure flight, marking the end of your journey.',
          es: 'Traslado privado al aeropuerto de Quito para su vuelo internacional.'
        },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      }
    ]
  },

  // Tour 10: ECUADOR & GALÁPAGOS ISLANDS 11 DAYS / 10 NIGHTS
  {
    id: 'ecuador-galapagos-11days',
    title: { en: 'ECUADOR & GALÁPAGOS ISLANDS 11 DAYS', es: 'ECUADOR Y GALÁPAGOS 11 DÍAS', fr: 'ÉQUATEUR ET GALAPAGOS 11 JOURS', de: 'ECUADOR & GALAPAGOS 11 TAGE', it: 'ECUADOR E GALAPAGOS 11 GIORNI', pt: 'EQUADOR E GALÁPAGOS 11 DIAS', ja: 'エクアドル＆ガラパゴス 11日間', zh: '厄瓜多尔与加拉帕戈斯经典11日游' },
    destination: 'Galapagos',
    duration: { en: '11 DAYS / 10 NIGHTS', es: '11 DÍAS / 10 NOCHES', fr: '11 JOURS / 10 NUITS', de: '11 TAGE / 10 NÄCHTE', it: '11 GIORNI / 10 NOTTI', pt: '11 DIAS / 10 NOITES', ja: '11日間 / 10泊', zh: '11天 / 10晚' },
    durationDays: 11,
    price: 2437,
    price3Star: 2437,
    price4Star: 2599,
    imageUrl: '/images/tours/9-16/galapagos-lobos-de-mar-9-16.jpg',
    mobileImage: '/images/tours/9-16/galapagos-lobos-de-mar-9-16.jpg',
    desktopImage: '/images/tours/16-9/galapagos-lobos-de-mar-16-9.jpg',
    gallery: ['/images/tours/9-16/avenue-of-volcanoes-9-16.jpg', '/images/tours/9-16/pailon-del-diablo-9-16.jpg', '/images/tours/9-16/puyo-yanacocha-9-16.jpg', '/images/tours/9-16/pastaza-canyon-9-16.jpg', '/images/tours/9-16/santa-cruz-tierras-altas-9-16.jpg', '/images/tours/9-16/galapagos-flamingos-9-16.jpg', '/images/tours/9-16/las-grietas-canyon-9-16.jpg', '/images/tours/9-16/puerto-ayora-9-16.jpg'],
    rating: 5,
    reviewsCount: 32,
    isPopular: true,
    category: { en: 'Classic Mainland & Galapagos', es: 'Clásico Continente y Galápagos', fr: 'Classique Équateur et Galapagos', de: 'Klassisches Ecuador & Galapagos', it: 'Classico Ecuador e Galapagos', pt: 'Clássico Equador e Galápagos', ja: 'エクアドル＆ガラパゴス周遊', zh: '海陆经典联合全景游' },
    description: {
      en: '11-day master combination of mainland Ecuador (Quito, Baños, Pailón del Diablo, Puyo Amazon, Yanacocha, Quilotoa) and the Galapagos Islands (Santa Cruz, Isabela, Tintoreras, Las Grietas, La Lobería).',
      es: 'El programa maestro de 11 días uniendo Ecuador continental (Quito, Baños, Cascada Pailón del Diablo, Amazonía de Puyo, Bioparque Yanacocha, Laguna de Quilotoa) y las Islas Galápagos (Santa Cruz, Isabela, Tintoreras y Las Grietas).',
      zh: '11日经典联合行程，将厄瓜多尔大陆（基多、巴尼奥斯恶魔之咽、普约亚马逊、基洛托阿）与加拉帕戈斯群岛（圣克鲁斯、伊莎贝拉、蒂恩托雷拉斯、拉斯格里塔斯）完美融合。'
    },
    highlights: [
      { en: 'Avenue of Volcanoes & Baños Pailón del Diablo', es: 'Avenida de los Volcanes y Cascada Pailón del Diablo', zh: '火山大道与巴尼奥斯恶魔之咽' },
      { en: 'Puyo Amazon Rainforest & Kichwa Community', es: 'Selva de Puyo y Comunidad Kichwa', zh: '普约亚马逊雨林与奇瓦社区' },
      { en: 'Quilotoa Emerald Crater Lake', es: 'Laguna Cráter de Quilotoa', zh: '基洛托阿翡翠火山湖' },
      { en: 'Santa Cruz Highlands & Giant Tortoises', es: 'Tierras Altas de Santa Cruz y Tortugas Gigantes', zh: '圣克鲁斯高地与巨龟保护区' },
      { en: 'Isabela Island, Flamingos & Tintoreras', es: 'Isla Isabela, Flamingos y Tintoreras', zh: '伊莎贝拉岛、火烈鸟与蒂恩托雷拉斯' },
      { en: 'Las Grietas Volcanic Canyon Snorkeling', es: 'Snorkeling en el Cañón Las Grietas', zh: '拉斯格里塔斯火山峡谷潜水' }
    ],
    inclusions: [
      { en: 'Private transportation throughout mainland Ecuador and Galapagos', es: 'Transporte privado en continente y Galápagos' },
      { en: '10 nights accommodation in selected 3★ or 4★ hotels', es: '10 noches de hospedaje en hoteles 3★ o 4★' },
      { en: 'Daily breakfast and lunches specified', es: 'Desayunos diarios y almuerzos según itinerario' },
      { en: 'Certified Level III bilingual naturalist guides', es: 'Guías naturalistas certificados Nivel III' },
      { en: 'All excursions and entrance fees in mainland and Galapagos', es: 'Todas las excursiones y entradas especificadas' }
    ],
    exclusions: [
      { en: 'Galapagos National Park Fee ($200 USD foreign)', es: 'Entrada Parque Nacional Galápagos ($200 USD extr.)' },
      { en: 'TCT Transit Control Card ($20 USD)', es: 'Tarjeta TCT ($20 USD)' }
    ],
    itinerary: [
      {
        day: 1,
        title: { en: 'DAY 1 – ARRIVAL IN QUITO | AIRPORT ASSISTANCE & HOTEL TRANSFER', es: 'DÍA 1 – LLEGADA A QUITO | ASISTENCIA Y TRASLADO' },
        description: {
          en: 'Upon arrival at Mariscal Sucre International Airport in Quito, you will be welcomed by our representative and assisted with your private transfer to the hotel. Free time to rest and acclimatize.',
          es: 'Recepción en el Aeropuerto de Quito y traslado privado al hotel. Tiempo libre para aclimatarse.'
        },
        meals: { en: 'Not included', es: 'No incluidas' },
        accommodation: { en: 'Quito', es: 'Quito' }
      },
      {
        day: 2,
        title: { en: 'DAY 2 – QUITO – BAÑOS | AVENUE OF THE VOLCANOES | PAILÓN DEL DIABLO WATERFALL', es: 'DÍA 2 – QUITO – BAÑOS | AVENIDA DE LOS VOLCANES | CASCADA PAILÓN DEL DIABLO' },
        description: {
          en: 'Travel south along the Pan-American Highway through the Avenue of the Volcanoes to Baños de Agua Santa. Visit the spectacular Pailón del Diablo Waterfall along lush trails.',
          es: 'Viaje por la Avenida de los Volcanes hacia Baños de Agua Santa y caminata a la impresionante Cascada Pailón del Diablo.'
        },
        meals: { en: 'Breakfast', es: 'Desayuno' },
        accommodation: { en: 'Baños', es: 'Baños de Agua Santa' }
      },
      {
        day: 3,
        title: { en: 'DAY 3 – BAÑOS – AMAZON RAINFOREST | PUYO | YANACOCHA BIOPARK | HOLA VIDA WATERFALL | KICHWA COMMUNITY', es: 'DÍA 3 – BAÑOS – SELVA AMAZÓNICA | PUYO | BIOPARQUE YANACOCHA | CASCADA HOLA VIDA | COMUNIDAD KICHWA' },
        description: {
          en: 'Travel through Pastaza River Canyon to Puyo. Visit Yanacocha Biopark for rescued wildlife, hike to Hola Vida Waterfall, and connect with a local Kichwa family before returning to Baños.',
          es: 'Excursión por el Cañón del Río Pastaza hacia Puyo: Bioparque Yanacocha, caminata a la Cascada Hola Vida y visita comunitaria Kichwa.'
        },
        meals: { en: 'Breakfast and lunch', es: 'Desayuno y almuerzo' },
        accommodation: { en: 'Baños', es: 'Baños de Agua Santa' }
      },
      {
        day: 4,
        title: { en: 'DAY 4 – BAÑOS – QUILOTOA – QUITO | QUILOTOA CRATER LAKE | TIGUA', es: 'DÍA 4 – BAÑOS – QUILOTOA – QUITO | LAGUNA DE QUILOTOA | TIGUA' },
        description: {
          en: 'Journey to Quilotoa Crater Lake for a 2-hour hike into the turquoise volcanic caldera. Stop at Tigua for colorful paintings and traditional farms before continuing to Quito.',
          es: 'Viaje a la Laguna de Quilotoa con caminata al cráter volcánico esmeralda y parada artística en Tigua antes de llegar a Quito.'
        },
        meals: { en: 'Breakfast', es: 'Desayuno' },
        accommodation: { en: 'Quito', es: 'Quito' }
      },
      {
        day: 5,
        title: { en: 'DAY 5 – QUITO | FREE DAY', es: 'DÍA 5 – QUITO | DÍA LIBRE' },
        description: {
          en: 'Free day in Quito to explore the historic center, museums, or relax before your flight to the Galápagos Islands.',
          es: 'Día libre en Quito para explorar la ciudad colonial o descansar.'
        },
        meals: { en: 'Breakfast', es: 'Desayuno' },
        accommodation: { en: 'Quito', es: 'Quito' }
      },
      {
        day: 6,
        title: { en: 'DAY 6 – QUITO – BALTRA | TWIN CRATERS | PRIMICIAS RANCH | PUERTO AYORA', es: 'DÍA 6 – VUELO A BALTRA | CRÁTERES GEMELOS | RANCHO PRIMICIAS' },
        description: {
          en: 'Transfer to Quito airport for your flight to Baltra. Cross Itabaca Channel to Santa Cruz highlands to visit Twin Craters and Primicias Ranch for giant tortoises in the wild. Check in Puerto Ayora.',
          es: 'Vuelo a Baltra, cruce de canal Itabaca, visita a los Cráteres Gemelos y tortugas gigantes en libertad en Rancho Primicias.'
        },
        meals: { en: 'Breakfast', es: 'Desayuno' },
        accommodation: { en: 'Santa Cruz Island – Puerto Ayora', es: 'Isla Santa Cruz – Puerto Ayora' }
      },
      {
        day: 7,
        title: { en: 'DAY 7 – FULL-DAY EXCURSION TO ISABELA ISLAND | TORTOISE BREEDING CENTER | FLAMINGO LAGOON | TINTORERAS', es: 'DÍA 7 – EXCURSIÓN A ISLA ISABELA | CENTRO DE CRIANZA | FLAMINGOS | TINTORERAS' },
        description: {
          en: 'Speedboat to Isabela. Visit Giant Tortoise Breeding Center, Flamingo Lagoon, and Tintoreras islet for snorkeling with sea lions, turtles, rays, and penguins.',
          es: 'Lancha a Isla Isabela, visita a la Laguna de Flamingos, Centro de Crianza y navegación a Tintoreras para snorkel con fauna marina.'
        },
        meals: { en: 'Breakfast and lunch', es: 'Desayuno y almuerzo' },
        accommodation: { en: 'Santa Cruz Island – Puerto Ayora', es: 'Isla Santa Cruz – Puerto Ayora' }
      },
      {
        day: 8,
        title: { en: 'DAY 8 – LA LOBERÍA | PUNTA ESTRADA | LAS GRIETAS', es: 'DÍA 8 – LA LOBERÍA | PUNTA ESTRADA | LAS GRIETAS' },
        description: {
          en: 'Visit La Lobería sea lions, Punta Estrada, and swim/snorkel in the crystal-clear waters of Las Grietas volcanic canyon.',
          es: 'Observación de leones marinos en La Lobería, formaciones de Punta Estrada y snorkel en el cañón volcánico Las Grietas.'
        },
        meals: { en: 'Breakfast', es: 'Desayuno' },
        accommodation: { en: 'Santa Cruz Island – Puerto Ayora', es: 'Isla Santa Cruz – Puerto Ayora' }
      },
      {
        day: 9,
        title: { en: 'DAY 9 – SANTA CRUZ | FREE DAY', es: 'DÍA 9 – SANTA CRUZ | DÍA LIBRE' },
        description: {
          en: 'Enjoy a free day in Santa Cruz Island to explore Puerto Ayora, shop, or relax at your own pace.',
          es: 'Día libre en Santa Cruz para disfrutar de Puerto Ayora o actividades opcionales.'
        },
        meals: { en: 'Breakfast', es: 'Desayuno' },
        accommodation: { en: 'Santa Cruz Island – Puerto Ayora', es: 'Isla Santa Cruz – Puerto Ayora' }
      },
      {
        day: 10,
        title: { en: 'DAY 10 – BALTRA AIRPORT | DEPARTURE', es: 'DÍA 10 – TRASLADO AL AEROPUERTO DE BALTRA | VUELO A QUITO' },
        description: {
          en: 'Transfer across Santa Cruz Island and Itabaca Channel to Baltra Airport for your flight back to Quito.',
          es: 'Traslado desde Puerto Ayora hacia el Aeropuerto de Baltra para su vuelo de retorno a Quito.'
        },
        meals: { en: 'Breakfast', es: 'Desayuno' },
        accommodation: { en: 'Quito', es: 'Quito' }
      },
      {
        day: 11,
        title: { en: 'DAY 11 – QUITO | INTERNATIONAL DEPARTURE', es: 'DÍA 11 – QUITO | SALIDA INTERNACIONAL' },
        description: {
          en: 'Private transfer to Mariscal Sucre International Airport for your international departure flight, marking the end of your Ecuador and Galápagos Islands experience.',
          es: 'Traslado privado al aeropuerto de Quito para su vuelo internacional de retorno.'
        },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      }
    ]
  }
];

export const mockReviews: Review[] = [
  { id: '1', author: 'Elena Rostova', rating: 5, date: '2026-02-10', comment: 'An absolute masterpiece of a trip. The Galapagos yacht was exceptional.', tourId: 'galapagos-5days' },
  { id: '2', author: 'Marcus Sterling', rating: 5, date: '2026-01-28', comment: 'Flawless service from arrival in Quito to Baltra departure. 10/10.', tourId: 'ecuador-galapagos-11days' }
];
