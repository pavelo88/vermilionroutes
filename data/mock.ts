import { Tour, Destination, Review } from '@/types';
import { dailyTours } from './dailyToursData';

const multiDayTours: Tour[] = [
  // Tour 1: Galapagos 4 Days
  {
    id: 'galapagos-4days',
    title: { 
      en: 'GALÁPAGOS ISLANDS – 4-DAY ITINERARY', 
      es: 'ISLAS GALÁPAGOS – ITINERARIO DE 4 DÍAS', 
      fr: 'ÎLES GALAPAGOS – ITINÉRAIRE DE 4 JOURS', 
      de: 'GALAPAGOS-INSELN – 4-TAGE-REISEPLAN', 
      it: 'ISOLE GALAPAGOS – ITINERARIO DI 4 GIORNI', 
      pt: 'ILHAS GALÁPAGOS – ITINERÁRIO DE 4 DIAS', 
      ja: 'ガラパゴス諸島 4日間の旅程', 
      zh: '加拉帕戈斯群岛4日精选探险' 
    },
    destination: 'Galapagos',
    duration: { 
      en: '4 DAYS / 3 NIGHTS', 
      es: '4 DÍAS / 3 NOCHES', 
      fr: '4 JOURS / 3 NUITS', 
      de: '4 TAGE / 3 NÄCHTE', 
      it: '4 GIORNI / 3 NOTTI', 
      pt: '4 DIAS / 3 NOITES', 
      ja: '4日間 / 3泊', 
      zh: '4天 / 3晚' 
    },
    durationDays: 4,
    price: 1590,
    price3Star: 1590,
    price4Star: 1899,
    imageUrl: '/images/tours/16-9/galapagos-tortuga-gigante-16-9.jpg',
    mobileImage: '/images/tours/9-16/galapagos-tortuga-gigante-9-16.jpg',
    desktopImage: '/images/tours/16-9/galapagos-tortuga-gigante-16-9.jpg',
    gallery: [
      '/images/tours/9-16/galapagos-iguana-9-16.jpg',
      '/images/tours/9-16/galapagos-loberia-9-16.jpg',
      '/images/tours/9-16/las-grietas-canyon-9-16.jpg',
      '/images/tours/9-16/galapagos-tortuga-gigante-9-16.1.jpg',
      '/images/tours/9-16/galapagos-snorkeling-9-16.jpg'
    ],
    rating: 5,
    reviewsCount: 28,
    isPopular: true,
    category: { 
      en: 'Island Hopping Expedition', 
      es: 'Expedición Island Hopping', 
      fr: "Expédition d'île en île", 
      de: 'Insel-Hopping-Expedition', 
      it: 'Spedizione Island Hopping', 
      pt: 'Expedição Entre Ilhas', 
      ja: 'アイランドホッピング探検', 
      zh: '跳岛精华探险' 
    },
    description: {
      en: 'Experience the wonders of the Galápagos on this 4-day itinerary featuring Santa Cruz highlands, giant tortoises at Primicias Ranch, full-day boat excursion to Isabela Island with Tintoreras snorkeling and flamingo lagoon, and coastal exploration at La Lobería, Punta Estrada and Las Grietas.',
      es: 'Experimenta las maravillas de Galápagos en este itinerario de 4 días explorando las tierras altas de Santa Cruz, tortugas gigantes en Rancho Primicias, excursión de día completo a Isla Isabela con snorkel en Tintoreras y laguna de flamingos, y visitas costeras a La Lobería, Punta Estrada y Las Grietas.',
      zh: '加拉帕戈斯4日精选探险，游览巴尔特拉岛、双子坑、普里米西亚巨龟保护区、伊莎贝拉岛快艇游览、火烈鸟泻湖、蒂恩托雷拉斯石礁潜水、拉洛贝里亚海狮滩与拉斯格里塔斯火山峡谷。'
    },
    highlights: [
      { en: 'Twin Craters & Primicias Giant Tortoise Ranch', es: 'Cráteres Gemelos y Rancho de Tortugas Primicias', zh: '双子坑与普里米西亚巨龟保护区' },
      { en: 'Full-Day Isabela Excursion & Tintoreras Snorkeling', es: 'Excursión Full-Day Isabela y Snorkel en Tintoreras', zh: '伊莎贝拉全日游与蒂恩托雷拉斯潜水' },
      { en: 'Flamingo Lagoon & Giant Tortoise Breeding Center', es: 'Laguna de Flamingos y Centro de Crianza', zh: '火烈鸟泻湖与巨龟繁殖中心' },
      { en: 'La Lobería Sea Lion Colony & Punta Estrada', es: 'Colonia de Lobos Marinos en La Lobería y Punta Estrada', zh: '拉洛贝里亚海狮滩与埃斯特拉达角' },
      { en: 'Las Grietas Crystal-Clear Volcanic Canyon', es: 'Cañón Volcánico Las Grietas', zh: '拉斯格里塔斯火山峡谷' }
    ],
    inclusions: [
      { en: 'Accommodation at the hotel of your choice in Santa Cruz', es: 'Alojamiento en el hotel seleccionado en Santa Cruz' },
      { en: 'Buffet breakfast at 4-star hotels / Continental breakfast at 3-star hotels', es: 'Desayuno buffet en hoteles 4★ / Desayuno continental en hoteles 3★' },
      { en: 'Lunches with a set menu', es: 'Almuerzos menú incluidos' },
      { en: 'Plane Ticket (Quito/Guayaquil – Baltra – Quito/Guayaquil)', es: 'Boleto aéreo (Quito/Guayaquil – Baltra – Quito/Guayaquil)' },
      { en: 'Visits to the islands according to the itinerary', es: 'Visitas a las islas según itinerario' },
      { en: 'Airport reception and departure assistance at Galápagos Airport', es: 'Recepción y asistencia en aeropuertos de Galápagos' },
      { en: 'Land and sea transportation', es: 'Transporte terrestre y marítimo' },
      { en: 'Level III Naturalist Guides (Spanish / English)', es: 'Guías Naturalistas Nivel III (Español / Inglés)' },
      { en: 'Snorkeling equipment for boat excursions (mask and snorkel)', es: 'Equipo de snorkel para excursiones en barco (máscara y tubo)' },
      { en: 'Safety lockers available at hotel reception', es: 'Casilleros de seguridad en recepción' },
      { en: 'Lobito Airport Shuttle Bus: Airport – Itabaca Channel – Airport', es: 'Bus de aeropuerto Lobito: Aeropuerto – Canal de Itabaca – Aeropuerto' },
      { en: 'Isabela Dock Fee: USD 5.00 for Ecuadorian nationals; USD 10.00 for foreign visitors', es: 'Tasa de muelle de Isabela: USD 5.00 nacionales / USD 10.00 extranjeros' }
    ],
    exclusions: [
      { en: 'Galápagos National Park entrance fee: USD 6.00 for Ecuadorian nationals; USD 200.00 for foreign visitors', es: 'Entrada al Parque Nacional Galápagos: USD 6.00 nacionales / USD 200.00 extranjeros' },
      { en: 'Dinners', es: 'Cenas' },
      { en: 'Transit Control Card (TCT): USD 20.00', es: 'Tarjeta de Control de Tránsito (TCT): USD 20.00' },
      { en: 'Services not specified in the program', es: 'Servicios no especificados en el programa' }
    ],
    itinerary: [
      {
        day: 1,
        title: { en: 'DAY 1 – ARRIVAL IN BALTRA | TWIN CRATERS | PRIMICIAS RANCH', es: 'DÍA 1 – LLEGADA A BALTRA | CRÁTERES GEMELOS | RANCHO PRIMICIAS' },
        description: {
          en: 'Upon arrival at Seymour Airport on Baltra Island, you will be welcomed by our representative and begin your journey through the Galápagos Islands.\n\nAfter crossing the Itabaca Channel to Santa Cruz Island, we will travel to the highlands to visit the famous Twin Craters (Los Gemelos). These impressive volcanic formations are surrounded by the lush Scalesia forest and offer an excellent introduction to the unique geological landscape of Santa Cruz Island.\n\nWe will then continue to Primicias Ranch, a private reserve where giant Galápagos tortoises can be observed roaming freely in their natural environment. During the visit, you will learn about these iconic animals and their importance to the Galápagos ecosystem.\n\nAfter the excursion, we will continue to Puerto Ayora for hotel check-in and the remainder of the day at leisure.',
          es: 'Llegada al Aeropuerto Seymour en Isla Baltra, recepción por nuestro representante e inicio del viaje en Galápagos.\n\nTras cruzar el Canal de Itabaca hacia Isla Santa Cruz, nos trasladamos a las tierras altas para visitar los famosos Cráteres Gemelos (Los Gemelos), impresionantes formaciones volcánicas rodeadas por el bosque de Scalesia.\n\nContinuamos hacia el Rancho Primicias, reserva privada donde las tortugas gigantes de Galápagos viven libremente en su hábitat natural, aprendiendo sobre su conservación y explorando túneles de lava.\n\nTraslado a Puerto Ayora para check-in en el hotel y resto de la tarde libre.'
        },
        accommodation: { en: 'Santa Cruz Island – Puerto Ayora', es: 'Isla Santa Cruz – Puerto Ayora' },
        meals: { en: 'According to selected hotel plan', es: 'Según plan hotelero' },
        transportation: { en: 'Private land transportation & airport shuttle', es: 'Transporte privado terrestre y shuttle de aeropuerto' }
      },
      {
        day: 2,
        title: { en: 'DAY 2 – FULL-DAY EXCURSION TO ISABELA ISLAND | TORTOISE BREEDING CENTER | FLAMINGO LAGOON | TINTORERAS', es: 'DÍA 2 – EXCURSIÓN FULL-DAY A ISLA ISABELA | CENTRO DE CRIANZA | LAGUNA DE FLAMINGOS | TINTORERAS' },
        description: {
          en: 'After breakfast, transfer to the pier to board a speedboat to Isabela Island. The navigation takes approximately 2 to 2.5 hours, depending on sea conditions.\n\nUpon arrival in Puerto Villamil, we will visit the Giant Tortoise Breeding Center, where you will learn about the conservation and breeding programs established to protect Isabela\'s giant tortoise populations.\n\nWe will then visit the Flamingo Lagoon, one of the island\'s most important wetlands. Depending on natural conditions, you may observe Galápagos flamingos and other species of birds in their natural habitat.\n\nThe excursion will continue with a boat trip to Tintoreras Islet, a small volcanic islet located just off the coast of Isabela. Its clear waters and rich marine environment make it an excellent snorkeling destination. During the activity, you may have the opportunity to observe sea lions, sea turtles, rays, penguins and colorful tropical fish, depending on wildlife activity and sea conditions.\n\nAfter the excursion, return by speedboat to Santa Cruz Island and Puerto Ayora.',
          es: 'Traslado al muelle para tomar la lancha rápida hacia Isla Isabela (2 a 2.5 horas de navegación).\n\nEn Puerto Villamil visitamos el Centro de Crianza de Tortugas Gigantes para conocer los programas de reproducción y conservación.\n\nLuego visitamos la Laguna de Flamingos para observar flamingos y aves marinas en los humedales costeros.\n\nPor la tarde, navegación al Islote Tintoreras, formación volcánica de aguas cristalinas ideal para snorkeling con lobos marinos, tortugas marinas, rayas, pingüinos de Galápagos y peces tropicales.\n\nRetorno en lancha rápida a Santa Cruz y Puerto Ayora.'
        },
        accommodation: { en: 'Santa Cruz Island – Puerto Ayora', es: 'Isla Santa Cruz – Puerto Ayora' },
        meals: { en: 'Breakfast and lunch', es: 'Desayuno y almuerzo' },
        transportation: { en: 'Shared speedboat and private land transportation', es: 'Lancha rápida compartida y transporte terrestre privado' },
        activity: { en: 'Full-day guided excursion and snorkeling', es: 'Excursión guiada full-day y snorkeling' }
      },
      {
        day: 3,
        title: { en: 'DAY 3 – LA LOBERÍA | PUNTA ESTRADA | LAS GRIETAS', es: 'DÍA 3 – LA LOBERÍA | PUNTA ESTRADA | LAS GRIETAS' },
        description: {
          en: 'After breakfast, we will begin the day\'s activities with a visit to La Lobería, a coastal area famous for its resident population of Galápagos sea lions. Here, you will have the opportunity to observe these playful animals in their natural environment.\n\nWe will then continue to Punta Estrada, a beautiful coastal area surrounded by rocky formations and clear waters. The area offers excellent opportunities for nature observation and marine activities.\n\nThe excursion will continue to Las Grietas, a spectacular natural formation consisting of a narrow volcanic canyon filled with crystal-clear turquoise water. This is one of the most popular snorkeling and swimming sites near Puerto Ayora.\n\nDuring the snorkeling activity, you can explore the underwater environment and observe a variety of colorful fish and marine life.\n\nAfter the visit, return to Puerto Ayora and enjoy the remainder of the day at leisure.',
          es: 'Visita matutina a La Lobería para observar la colonia residente de lobos marinos de Galápagos en la playa y en el agua.\n\nContinuamos a Punta Estrada, bahía costera de formaciones rocosas y aguas calmas para observación de aves e iguanas marinas.\n\nCaminata hacia Las Grietas, cañón volcánico con aguas cristalinas turquesas donde nadar y hacer snorkel entre paredes de roca de 15 metros.\n\nRetorno a Puerto Ayora y resto de la tarde libre para recorrer el pueblo o descansar.'
        },
        accommodation: { en: 'Santa Cruz Island – Puerto Ayora', es: 'Isla Santa Cruz – Puerto Ayora' },
        meals: { en: 'Breakfast', es: 'Desayuno' },
        activity: { en: 'Guided excursion and snorkeling', es: 'Excursión guiada y snorkeling' }
      },
      {
        day: 4,
        title: { en: 'DAY 4 – TRANSFER TO BALTRA AIRPORT | DEPARTURE', es: 'DÍA 4 – TRASLADO AL AEROPUERTO DE BALTRA | SALIDA' },
        description: {
          en: 'After breakfast, check out from the hotel and begin the transfer from Puerto Ayora to Baltra Airport.\n\nThe journey includes transportation across Santa Cruz Island and the crossing of the Itabaca Channel, followed by the airport shuttle to Seymour Airport.\n\nUpon arrival at the airport, assistance will be provided for your departure flight, marking the end of your Galápagos Islands experience.',
          es: 'Desayuno, check-out del hotel y traslado terrestre a través de Santa Cruz hacia el Canal de Itabaca.\n\nCruce en ferry y traslado en shuttle hacia el Aeropuerto Seymour de Baltra con asistencia para abordar el vuelo de retorno al continente.'
        },
        meals: { en: 'Breakfast', es: 'Desayuno' },
        transportation: { en: 'Private land transportation and airport shuttle', es: 'Transporte terrestre privado y shuttle de aeropuerto' }
      }
    ]
  },

  // Tour 2: Galapagos 5 Days
  {
    id: 'galapagos-5days',
    title: { 
      en: 'GALÁPAGOS ISLANDS – 5-DAY ITINERARY', 
      es: 'ISLAS GALÁPAGOS – ITINERARIO DE 5 DÍAS', 
      fr: 'ÎLES GALAPAGOS – ITINÉRAIRE DE 5 JOURS', 
      de: 'GALAPAGOS-INSELN – 5-TAGE-REISEPLAN', 
      it: 'ISOLE GALAPAGOS – ITINERARIO DI 5 GIORNI', 
      pt: 'ILHAS GALÁPAGOS – ITINERÁRIO DE 5 DIAS', 
      ja: 'ガラパゴス諸島 5日間の旅程', 
      zh: '加拉帕戈斯群岛5日全景探险' 
    },
    destination: 'Galapagos',
    duration: { 
      en: '5 DAYS / 4 NIGHTS', 
      es: '5 DÍAS / 4 NOCHES', 
      fr: '5 JOURS / 4 NUITS', 
      de: '5 TAGE / 4 NÄCHTE', 
      it: '5 GIORNI / 4 NOTTI', 
      pt: '5 DIAS / 4 NOITES', 
      ja: '5日間 / 4泊', 
      zh: '5天 / 4晚' 
    },
    durationDays: 5,
    price: 1850,
    price3Star: 1850,
    price4Star: 2099,
    imageUrl: '/images/tours/16-9/galapagos-lobo-marino-16-9.jpg',
    mobileImage: '/images/tours/16-9/isabela-island-9-16.jpg',
    desktopImage: '/images/tours/16-9/isabela-island-16-9.jpg',
    gallery: [
      '/images/tours/9-16/galapagos-iguana-9-16.jpg',
      '/images/tours/9-16/galapagos-loberia-9-16.jpg',
      '/images/tours/9-16/santa-fe-island-9-16.jpg',
      '/images/tours/9-16/galapagos-flamingos-9-16.jpg',
      '/images/tours/9-16/galapagos-snorkeling-9-16.jpg'
    ],
    rating: 5,
    reviewsCount: 35,
    isPopular: true,
    category: { 
      en: 'Grand Island Hopping & Cruise', 
      es: 'Gran Salto de Islas y Crucero', 
      fr: 'Grande croisière et îles', 
      de: 'Große Insel-Hopping-Reise', 
      it: 'Grande Spedizione Isole e Crociera', 
      pt: 'Grande Expedição entre Ilhas', 
      ja: 'アイランドホッピング＆クルーズ', 
      zh: '大跳岛与游艇巡航' 
    },
    description: {
      en: 'Comprehensive 5-day Galápagos journey connecting Santa Cruz highlands, overnight stay on Isabela Island with Tintoreras Islet and flamingo lagoon, Las Grietas volcanic canyon, and a full-day navigable yacht excursion to Santa Fe or Pinzón Island.',
      es: 'Itinerario integral de 5 días conectando las tierras altas de Santa Cruz, noche en Isla Isabela con Islote Tintoreras y flamingos, cañón Las Grietas y navegación de día completo en yate hacia Isla Santa Fe o Isla Pinzón.',
      zh: '加拉帕戈斯5日全面行程，包含圣克鲁斯高地、伊莎贝拉岛过夜、蒂恩托雷拉斯石礁潜水、拉斯格里塔斯峡谷，以及前往圣菲岛或平松岛的日间游艇巡航。'
    },
    highlights: [
      { en: 'Twin Craters & Primicias Giant Tortoise Ranch', es: 'Cráteres Gemelos y Rancho Primicias', zh: '双子坑与普里米西亚巨龟保护区' },
      { en: 'Overnight in Isabela Island & Flamingo Lagoon', es: 'Noche en Isla Isabela y Laguna de Flamingos', zh: '伊莎贝拉岛住宿与火烈鸟泻湖' },
      { en: 'Tintoreras Islet Snorkeling & Marine Iguanas', es: 'Snorkel en Tintoreras e Iguanas Marinas', zh: '蒂恩托雷拉斯潜水与海鬣蜥' },
      { en: 'La Lobería & Las Grietas Volcanic Chasm', es: 'La Lobería y Cañón de Las Grietas', zh: '拉洛贝里亚与拉斯格里塔斯峡谷' },
      { en: 'Full-Day Yacht Cruise to Santa Fe or Pinzón Island', es: 'Navegación Full-Day a Santa Fe o Pinzón', zh: '圣菲岛或平松岛全天游艇巡航' }
    ],
    inclusions: [
      { en: 'Accommodation at the hotel of your choice in Santa Cruz', es: 'Alojamiento en el hotel seleccionado en Santa Cruz' },
      { en: 'Accommodation at Tintorera Guesthouse in Isabela', es: 'Alojamiento en Hostal Tintorera en Isabela' },
      { en: 'Buffet breakfast at 4-star hotels / Continental breakfast at 3-star hotels', es: 'Desayuno buffet en hoteles 4★ / Desayuno continental en hoteles 3★' },
      { en: 'Lunches with a set menu', es: 'Almuerzos menú incluidos' },
      { en: 'Plane Ticket (Quito – Baltra – Quito)', es: 'Boleto aéreo Quito – Baltra – Quito' },
      { en: 'Visits to the islands according to the itinerary', es: 'Visitas a las islas según itinerario' },
      { en: 'Airport reception and departure assistance at Galápagos Airport', es: 'Recepción y asistencia en aeropuertos de Galápagos' },
      { en: 'Land and sea transportation', es: 'Transporte terrestre y marítimo' },
      { en: 'Level III Naturalist Guides (Spanish / English)', es: 'Guías Naturalistas Nivel III (Español / Inglés)' },
      { en: 'Snorkeling equipment for navigable excursions (mask and snorkel)', es: 'Equipo de snorkel para excursiones navegables' },
      { en: 'Safety lockers available at hotel reception', es: 'Casilleros de seguridad en recepción' },
      { en: 'Lobito Airport Shuttle Bus: Airport – Itabaca Channel – Airport', es: 'Bus de aeropuerto Lobito: Aeropuerto – Canal de Itabaca – Aeropuerto' },
      { en: 'Isabela Dock Fee: USD 5.00 for Ecuadorian nationals; USD 10.00 for foreign visitors', es: 'Tasa de muelle de Isabela: USD 5.00 nacionales / USD 10.00 extranjeros' }
    ],
    exclusions: [
      { en: 'Galápagos National Park entrance fee: USD 6.00 for Ecuadorian nationals; USD 200.00 for foreign visitors', es: 'Entrada al Parque Nacional Galápagos: USD 6.00 nacionales / USD 200.00 extranjeros' },
      { en: 'Dinners', es: 'Cenas' },
      { en: 'Transit Control Card (TCT): USD 20.00', es: 'Tarjeta de Control de Tránsito (TCT): USD 20.00' },
      { en: 'Services not specified in the program', es: 'Servicios no especificados en el programa' }
    ],
    itinerary: [
      {
        day: 1,
        title: { en: 'DAY 1 – ARRIVAL IN BALTRA | TWIN CRATERS | PRIMICIAS RANCH', es: 'DÍA 1 – LLEGADA A BALTRA | CRÁTERES GEMELOS | RANCHO PRIMICIAS' },
        description: {
          en: 'Upon arrival at Seymour Airport on Baltra Island, you will be welcomed by our representative and begin your journey through the Galápagos Islands.\n\nAfter crossing the Itabaca Channel to Santa Cruz Island, we will continue towards the highlands. Along the way, we will visit the famous Twin Craters (Los Gemelos), two impressive volcanic formations surrounded by the lush vegetation of the Santa Cruz highlands. Here, you will learn about the geological origins of the island and observe the unique Scalesia forest.\n\nWe will then continue to Primicias Ranch, a private reserve where you can observe giant Galápagos tortoises roaming freely in their natural environment. This is an excellent opportunity to photograph these iconic animals and learn about their importance to the Galápagos ecosystem.\n\nAfter the visit, we will continue to your hotel in Puerto Ayora for check-in and the remainder of the day at leisure.',
          es: 'Llegada al Aeropuerto Seymour en Baltra, recepción y cruce del Canal de Itabaca hacia Santa Cruz.\n\nVisita a los Cráteres Gemelos rodeados del bosque de Scalesia en las tierras altas.\n\nContinuamos al Rancho Primicias para observar tortugas gigantes en libertad y cruzar túneles de lava.\n\nCheck-in en el hotel de Puerto Ayora y tiempo libre.'
        },
        accommodation: { en: 'Santa Cruz Island – Puerto Ayora', es: 'Isla Santa Cruz – Puerto Ayora' },
        meals: { en: 'Not included / according to hotel plan', es: 'No incluidas / según plan hotelero' }
      },
      {
        day: 2,
        title: { en: 'DAY 2 – SANTA CRUZ TO ISABELA | FLAMINGO LAGOON | TORTOISE BREEDING CENTER | TINTORERAS', es: 'DÍA 2 – SANTA CRUZ A ISABELA | LAGUNA DE FLAMINGOS | CENTRO DE CRIANZA | TINTORERAS' },
        description: {
          en: 'After breakfast, we will transfer to the pier for a speedboat journey from Santa Cruz to Isabela Island. The crossing takes approximately 2 to 2.5 hours, depending on sea conditions.\n\nUpon arrival in Puerto Villamil, we will begin our exploration of Isabela. Our first stop will be the Flamingo Lagoon, one of the most important wetland areas on the island. Here, you may observe American flamingos feeding and resting in the shallow waters, together with other species of coastal and migratory birds.\n\nWe will then visit the Giant Tortoise Breeding Center, where you will learn about the conservation and reproduction programs designed to protect Isabela\'s giant tortoise populations. The visit provides an insight into the efforts being made to preserve these emblematic species.\n\nIn the afternoon, we will take a boat excursion to Tintoreras Islet, a small volcanic islet located just off the coast of Isabela. The area is famous for its crystal-clear waters and rich marine life. During the snorkeling activity, you may encounter sea lions, sea turtles, rays, colorful fish and penguins, depending on the conditions and wildlife activity.\n\nAfter the excursion, return to Puerto Villamil and enjoy the evening at leisure.',
          es: 'Lancha rápida a Isla Isabela (2 a 2.5 h). En Puerto Villamil visitamos la Laguna de Flamingos y el Centro de Crianza de Tortugas Gigantes.\n\nPor la tarde, navegación al Islote Tintoreras para snorkel con lobos marinos, tortugas marinas, rayas, pingüinos y peces tropicales.\n\nNoche y descanso en Puerto Villamil.'
        },
        accommodation: { en: 'Isabela Island – Puerto Villamil (Hostal Tintorera)', es: 'Isla Isabela – Puerto Villamil (Hostal Tintorera)' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 3,
        title: { en: 'DAY 3 – ISABELA TO SANTA CRUZ | LA LOBERÍA | LAS GRIETAS', es: 'DÍA 3 – ISABELA A SANTA CRUZ | LA LOBERÍA | LAS GRIETAS' },
        description: {
          en: 'After breakfast, we will return to the pier for the boat transfer back to Santa Cruz Island.\n\nUpon arrival in Puerto Ayora, we will continue with a visit to La Lobería, a small coastal area known for its population of Galápagos sea lions. This is a wonderful place to observe these playful animals both on the beach and in the water.\n\nWe will then visit Las Grietas, a spectacular natural formation created by volcanic activity. This narrow canyon is filled with clear, turquoise water and is one of the most popular swimming and snorkeling sites near Puerto Ayora.\n\nDuring the snorkeling activity, you will have the opportunity to explore the underwater environment and observe colorful tropical fish and other marine species.\n\nAfter the visit, return to Puerto Ayora and check in at your hotel. The remainder of the afternoon and evening will be free to relax or explore the town independently.',
          es: 'Lancha rápida de retorno a Santa Cruz. Visita a La Lobería para observar lobos marinos y aves costeras.\n\nCaminata a Las Grietas para nadar y hacer snorkel en el cañón volcánico.\n\nTarde libre en Puerto Ayora.'
        },
        accommodation: { en: 'Santa Cruz Island – Puerto Ayora', es: 'Isla Santa Cruz – Puerto Ayora' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 4,
        title: { en: 'DAY 4 – FULL-DAY EXCURSION TO SANTA FE OR PINZÓN ISLAND', es: 'DÍA 4 – EXCURSIÓN FULL-DAY A ISLA SANTA FE O ISLA PINZÓN' },
        description: {
          en: 'Today, enjoy a full-day boat excursion to one of the Galápagos\' outstanding snorkeling destinations: Santa Fe Island or Pinzón Island, depending on availability, sea conditions and the selected tour.\n\nSanta Fe Island is known for its beautiful turquoise waters, white sandy beaches and endemic wildlife. During the excursion, you may encounter sea lions, sea turtles, rays, marine iguanas and a variety of tropical fish. The island is also home to the endemic Santa Fe land iguana.\n\nAlternatively, the excursion may take you to Pinzón Island, a spectacular location surrounded by clear waters and abundant marine life. The snorkeling sites around Pinzón are particularly well known for encounters with sea turtles, sea lions, rays, colorful fish and, with some luck, Galápagos penguins.\n\nThe day will include navigation, snorkeling and opportunities to observe wildlife both above and below the water. Lunch will generally be provided during the excursion, depending on the selected tour.\n\nReturn to Puerto Ayora in the afternoon and enjoy your final evening in the Galápagos.',
          es: 'Navegación de día completo en yate hacia Isla Santa Fe o Isla Pinzón.\n\nEn Santa Fe disfrutará de bahías turquesas, iguanas terrestres endémicas y abundante vida marina. En Pinzón, aguas profundas ricas en nutrientes con tortugas marinas gigantes, rayas, tiburones y peces multicolores.\n\nAlmuerzo a bordo incluido y retorno por la tarde a Puerto Ayora.'
        },
        accommodation: { en: 'Santa Cruz Island – Puerto Ayora', es: 'Isla Santa Cruz – Puerto Ayora' },
        meals: { en: 'Breakfast and lunch', es: 'Desayuno y almuerzo' },
        activity: { en: 'Full-day boat excursion and snorkeling', es: 'Excursión en barco de día completo y snorkel' }
      },
      {
        day: 5,
        title: { en: 'DAY 5 – TRANSFER TO BALTRA AIRPORT | DEPARTURE', es: 'DÍA 5 – TRASLADO AL AEROPUERTO DE BALTRA | SALIDA' },
        description: {
          en: 'After breakfast, check out from the hotel and transfer from Puerto Ayora towards Baltra Island.\n\nThe journey includes transportation across Santa Cruz Island and the Itabaca Channel, followed by the transfer to Seymour Airport (Baltra).\n\nUpon arrival at the airport, assistance will be provided for your departure flight, marking the end of your Galápagos Islands adventure.',
          es: 'Desayuno, check-out del hotel y traslado terrestre a través de Santa Cruz hacia el Canal de Itabaca y Aeropuerto Seymour de Baltra para tomar el vuelo de retorno.'
        },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      }
    ]
  },

  // Tour 3: Galapagos 6 Days
  {
    id: 'galapagos-6days',
    title: { 
      en: '6-DAY GALÁPAGOS ISLANDS TOUR ITINERARY', 
      es: 'ISLAS GALÁPAGOS – ITINERARIO DE 6 DÍAS', 
      fr: 'ÎLES GALAPAGOS – ITINÉRAIRE DE 6 JOURS', 
      de: 'GALAPAGOS-INSELN – 6-TAGE-REISEPLAN', 
      it: 'ISOLE GALAPAGOS – ITINERARIO DI 6 GIORNI', 
      pt: 'ILHAS GALÁPAGOS – ITINERÁRIO DE 6 DIAS', 
      ja: 'ガラパゴス諸島 6日間の旅程', 
      zh: '加拉帕戈斯群岛6日大周游' 
    },
    destination: 'Galapagos',
    duration: { 
      en: '6 DAYS / 5 NIGHTS', 
      es: '6 DÍAS / 5 NOCHES', 
      fr: '6 JOURS / 5 NUITS', 
      de: '6 TAGE / 5 NÄCHTE', 
      it: '6 GIORNI / 5 NOTTI', 
      pt: '6 DIAS / 5 NOITES', 
      ja: '6日間 / 5泊', 
      zh: '6天 / 5晚' 
    },
    durationDays: 6,
    price: 1999,
    price3Star: 1999,
    price4Star: 2300,
    imageUrl: '/images/tours/16-9/galapagos-baltra-island-16-9.jpg',
    mobileImage: '/images/tours/9-16/galapagos-piquero-patas-azules-9-16.jpg',
    desktopImage: '/images/tours/16-9/galapagos-piquero-patas-azules-16-9.jpg',
    gallery: [
      '/images/tours/9-16/galapagos-san-cristobal-9-16.jpg',
      '/images/tours/9-16/galapagos-lake-el-junco-9-16.jpg',
      '/images/tours/9-16/galapagos-loberia-9-16.jpg',
      '/images/tours/9-16/galapagos-iguana-9-16.jpg',
      '/images/tours/9-16/tijeretas-hill-9-16.jpg',
      '/images/tours/9-16/galapagos-lobos-de-mar-9-16.jpg'
    ],
    rating: 5,
    reviewsCount: 39,
    isPopular: true,
    category: { 
      en: 'Triple Island Discovery & Cruise', 
      es: 'Descubrimiento Triple Isla y Crucero', 
      fr: "Découverte de trois îles", 
      de: 'Drei-Inseln-Entdeckung & Kreuzfahrt', 
      it: 'Scoperta di Tre Isole e Crociera', 
      pt: 'Descoberta de Três Ilhas', 
      ja: '3島巡礼＆クルーズ', 
      zh: '三岛深度探索与游艇巡航' 
    },
    description: {
      en: 'Ultimate 6-day Galápagos expedition exploring 3 major islands: Santa Cruz highlands & giant tortoises, Isabela Island with Tintoreras & flamingos, Las Grietas volcanic canyon, navigable yacht cruise to Santa Fe or Pinzón Island, and San Cristóbal Island with Interpretation Center, Tijeretas Hill and La Lobería.',
      es: 'Expedición definitiva de 6 días en Galápagos explorando 3 islas principales: tierras altas y tortugas en Santa Cruz, Isabela con Tintoreras y flamingos, cañón Las Grietas, navegación a Santa Fe o Pinzón, y San Cristóbal con Centro de Interpretación, Cerro Tijeretas y La Lobería.',
      zh: '加拉帕戈斯6日大周游，涵盖圣克鲁斯高地、伊莎贝拉岛、蒂恩托雷拉斯、拉斯格里塔斯、圣菲/平松游艇巡航，以及圣克里斯托巴尔岛（解读中心、军舰鸟丘与拉洛贝里亚）。'
    },
    highlights: [
      { en: 'Twin Craters & Primicias Giant Tortoise Reserve', es: 'Cráteres Gemelos y Rancho Primicias', zh: '双子坑与普里米西亚巨龟保护区' },
      { en: 'Isabela Island, Flamingo Lagoon & Tintoreras', es: 'Isla Isabela, Laguna de Flamingos y Tintoreras', zh: '伊莎贝拉岛、火烈鸟与蒂恩托雷拉斯' },
      { en: 'Las Grietas Volcanic Rock Canyon', es: 'Cañón de Las Grietas', zh: '拉斯格里塔斯火山峡谷' },
      { en: 'Full-Day Yacht Cruise to Santa Fe or Pinzón Island', es: 'Navegación Full-Day a Santa Fe o Pinzón', zh: '圣菲岛或平松岛全天游艇巡航' },
      { en: 'San Cristóbal Interpretation Center & Tijeretas Hill', es: 'Centro de Interpretación y Cerro Tijeretas en San Cristóbal', zh: '圣克里斯托巴尔岛解读中心与军舰鸟丘' }
    ],
    inclusions: [
      { en: 'Accommodation at the hotel of your choice in Santa Cruz', es: 'Alojamiento en el hotel seleccionado en Santa Cruz' },
      { en: 'Accommodation at Hostal Tintorera in Isabela', es: 'Alojamiento en Hostal Tintorera en Isabela' },
      { en: 'Accommodation at Hotel Algarrobos in San Cristóbal', es: 'Alojamiento en Hotel Algarrobos en San Cristóbal' },
      { en: 'Buffet breakfast at 4-star hotels / Continental breakfast at 3-star hotels', es: 'Desayuno buffet en hoteles 4★ / Desayuno continental en hoteles 3★' },
      { en: 'Plane ticket (Quito – Baltra / San Cristóbal – Quito)', es: 'Boleto aéreo Quito – Baltra / San Cristóbal – Quito' },
      { en: 'Set-menu lunches', es: 'Almuerzos menú incluidos' },
      { en: 'Visits to the islands according to the itinerary', es: 'Visitas a las islas según itinerario' },
      { en: 'Airport reception and departure assistance at Galápagos airports', es: 'Recepción y asistencia en aeropuertos de Galápagos' },
      { en: 'Maritime and land transportation', es: 'Transporte marítimo y terrestre' },
      { en: 'Naturalist Guide Class III (Spanish/English)', es: 'Guía Naturalista Nivel III (Español/Inglés)' },
      { en: 'Snorkeling equipment for boat excursions (mask and snorkel)', es: 'Equipo de snorkel para excursiones en barco (máscara y tubo)' },
      { en: 'Safety lockers available at hotel reception', es: 'Casilleros de seguridad en recepción' },
      { en: 'Lobito Airport Bus: Airport – Itabaca Channel – Airport', es: 'Bus de aeropuerto Lobito: Aeropuerto – Canal de Itabaca – Aeropuerto' },
      { en: 'Isabela Dock Fee: USD 5.00 for Ecuadorian nationals; USD 10.00 for foreign visitors', es: 'Tasa de muelle de Isabela: USD 5.00 nacionales / USD 10.00 extranjeros' }
    ],
    exclusions: [
      { en: 'Galápagos National Park entrance fee: USD 6.00 for Ecuadorian nationals; USD 200.00 for foreign visitors', es: 'Entrada al Parque Nacional Galápagos: USD 6.00 nacionales / USD 200.00 extranjeros' },
      { en: 'Dinners in Santa Cruz', es: 'Cenas en Santa Cruz' },
      { en: 'Transit Control Card (TCT): USD 20.00', es: 'Tarjeta de Control de Tránsito (TCT): USD 20.00' },
      { en: 'Services not specified in the program', es: 'Servicios no especificados en el programa' }
    ],
    itinerary: [
      {
        day: 1,
        title: { en: 'Day 1: Arrival in Baltra – Twin Craters – Primicias Ranch', es: 'Día 1: Llegada a Baltra – Cráteres Gemelos – Rancho Primicias' },
        description: {
          en: 'Upon arrival at Baltra Airport, you will be welcomed by our representative and begin your Galápagos adventure.\n\nYour first visit will be to the Twin Craters (Los Gemelos), two impressive volcanic formations located in the highlands of Santa Cruz Island. These large craters were created by ancient volcanic activity and are surrounded by lush vegetation, including the characteristic scalesia forest. During the visit, you will have the opportunity to learn about the island’s geological history and observe some of the native bird species of the highlands.\n\nAfterward, continue to Primicias Ranch, a private ecological reserve where you can observe giant Galápagos tortoises roaming freely in their natural environment. You will also have the chance to walk through lava tunnels and learn more about the conservation efforts dedicated to protecting these iconic animals.\n\nAt the end of the excursion, transfer to your accommodation in Santa Cruz Island and enjoy the rest of the day at leisure.',
          es: 'Llegada al Aeropuerto de Baltra, recepción y traslado a las tierras altas de Santa Cruz para visitar los Cráteres Gemelos rodeados del bosque de Scalesia.\n\nLuego visitamos el Rancho Primicias para observar tortugas gigantes en libertad y cruzar túneles de lava volcánica.\n\nTraslado al hotel en Santa Cruz y tiempo libre.'
        },
        accommodation: { en: 'Santa Cruz Island', es: 'Isla Santa Cruz' }
      },
      {
        day: 2,
        title: { en: 'Day 2: Santa Cruz – Isabela Island – Flamingo Lagoon – Tortoise Breeding Center – Tintoreras Islet', es: 'Día 2: Santa Cruz – Isla Isabela – Laguna de Flamingos – Centro de Crianza – Islote Tintoreras' },
        description: {
          en: 'After breakfast, transfer to the pier for a speedboat ride to Isabela Island, the largest island in the Galápagos archipelago. The journey offers the possibility of seeing marine wildlife along the way, depending on sea conditions.\n\nUpon arrival in Puerto Villamil, begin your exploration of Isabela with a visit to a flamingo lagoon, where you may observe the beautiful Galápagos flamingos feeding and resting in the shallow waters.\n\nContinue to the Tortoise Breeding Center, a conservation facility dedicated to the reproduction and protection of Isabela’s giant tortoise populations. Here, you will learn about the conservation programs and the efforts being made to preserve these endangered species.\n\nIn the afternoon, take a boat excursion to Tintoreras Islet, a small group of volcanic islets located near Puerto Villamil. The area is famous for its clear waters and abundant marine life. During the visit, you will have the opportunity to snorkel with sea turtles, sea lions, tropical fish, rays, and marine iguanas. On land, you may also see penguins, blue-footed boobies, and other coastal birds.\n\nReturn to Puerto Villamil and enjoy the evening at leisure.',
          es: 'Lancha rápida a Isla Isabela. Visita a la laguna de flamingos y al Centro de Crianza de Tortugas Gigantes de Isabela.\n\nPor la tarde, navegación al Islote Tintoreras para snorkel con leones marinos, tortugas, peces tropicales, iguanas marinas y pingüinos de Galápagos.\n\nNoche en Isabela (Hostal Tintorera).'
        },
        accommodation: { en: 'Isabela Island (Hostal Tintorera)', es: 'Isla Isabela (Hostal Tintorera)' }
      },
      {
        day: 3,
        title: { en: 'Day 3: Isabela – Santa Cruz – La Lobería – Las Grietas', es: 'Día 3: Isabela – Santa Cruz – La Lobería – Las Grietas' },
        description: {
          en: 'After breakfast, transfer to the pier for your return journey to Santa Cruz Island.\n\nUpon arrival, continue with a visit to La Lobería, a coastal area known for its colony of playful Galápagos sea lions. Enjoy a short walk along the coast and take the opportunity to observe these animals in their natural habitat. Depending on conditions, you may also see marine iguanas, shorebirds, and other native wildlife.\n\nLater, visit Las Grietas, one of Santa Cruz’s most popular natural swimming and snorkeling sites. This spectacular geological formation consists of a narrow water-filled crevice surrounded by high volcanic rock walls. Its clear waters provide excellent conditions for observing colorful fish and other marine species.\n\nReturn to your hotel and enjoy the remainder of the afternoon and evening at leisure.',
          es: 'Lancha de regreso a Santa Cruz. Visita costera a La Lobería para observar lobos marinos. Luego caminata a Las Grietas, espectacular cañón volcánico de aguas cristalinas para natación y snorkel. Tarde libre en Puerto Ayora.'
        },
        accommodation: { en: 'Santa Cruz Island', es: 'Isla Santa Cruz' }
      },
      {
        day: 4,
        title: { en: 'Day 4: Full-Day Excursion – Santa Fe Island or Pinzón Islet', es: 'Día 4: Excursión Full-Day – Isla Santa Fe o Islote Pinzón' },
        description: {
          en: 'Today, enjoy a full-day boat excursion to Santa Fe Island or Pinzón Islet, depending on availability, weather, and sea conditions.\n\nOption 1: Santa Fe Island\nSanta Fe is famous for its beautiful turquoise waters, white-sand beaches, and abundant wildlife. During the excursion, you may observe sea lions, marine iguanas, sea turtles, rays, and a variety of tropical fish. The snorkeling experience offers an excellent opportunity to explore the rich marine ecosystem surrounding the island. You may also enjoy a short hike to explore the island’s arid landscape and endemic vegetation.\n\nOption 2: Pinzón Islet\nPinzón is a spectacular snorkeling destination surrounded by nutrient-rich waters and abundant marine life. During the excursion, you may have the opportunity to swim alongside sea turtles, sea lions, rays, sharks, and schools of tropical fish.\n\nAfter the activities, enjoy lunch on board and continue exploring the surrounding waters before returning to Santa Cruz.\n\nArrive in Puerto Ayora in the afternoon and enjoy the evening at leisure.',
          es: 'Navegación de día completo en yate hacia Isla Santa Fe o Islote Pinzón con sesiones de snorkel de alta biodiversidad marina (tortugas, leones marinos, rayas y peces de colores). Almuerzo a bordo incluido.'
        },
        accommodation: { en: 'Santa Cruz Island', es: 'Isla Santa Cruz' }
      },
      {
        day: 5,
        title: { en: 'Day 5: Santa Cruz – San Cristóbal – Interpretation Center – Tijeretas – La Lobería', es: 'Día 5: Santa Cruz – San Cristóbal – Centro de Interpretación – Tijeretas – La Lobería' },
        description: {
          en: 'After breakfast, transfer to the pier for a speedboat journey to San Cristóbal Island, one of the easternmost islands in the Galápagos.\n\nUpon arrival in Puerto Baquerizo Moreno, begin your tour with a visit to the San Cristóbal Interpretation Center, an excellent introduction to the natural and human history of the Galápagos Islands. Through informative exhibits, you will learn about the islands’ volcanic origins, ecosystems, endemic species, human settlement, and conservation challenges.\n\nContinue to Tijeretas Hill, a scenic viewpoint offering beautiful panoramic views of the coastline and surrounding ocean. The area is also associated with frigatebirds, which can frequently be observed flying above the cliffs.\n\nFinally, visit La Lobería, a beautiful coastal site where you can observe sea lions resting on the beach and playing in the water. The area also offers opportunities to see marine iguanas and coastal birds.\n\nReturn to Puerto Baquerizo Moreno and enjoy your final evening in the Galápagos.',
          es: 'Lancha a Isla San Cristóbal. Visita al Centro de Interpretación de San Cristóbal, caminata al mirador de Cerro Tijeretas con avistamiento de fragatas y relax en la playa La Lobería con lobos marinos. Noche en San Cristóbal (Hotel Algarrobos).'
        },
        accommodation: { en: 'San Cristóbal Island (Hotel Algarrobos)', es: 'Isla San Cristóbal (Hotel Algarrobos)' }
      },
      {
        day: 6,
        title: { en: 'Day 6: San Cristóbal – Airport Transfer and Departure', es: 'Día 6: San Cristóbal – Traslado al Aeropuerto y Salida' },
        description: {
          en: 'After breakfast, enjoy some free time depending on your flight schedule.\n\nAt the appropriate time, transfer to San Cristóbal Airport for your departure flight.\n\nYour unforgettable Galápagos adventure comes to an end as you board your flight back to the mainland.',
          es: 'Desayuno y tiempo libre hasta el traslado al Aeropuerto de San Cristóbal para abordar su vuelo de retorno al continente.'
        }
      }
    ]
  },

  // Tour 5: Volcanoes & Rivers (8 Days)
  {
    id: 'volcanoes-rivers-8days',
    title: { 
      en: 'ECUADOR: VOLCANOES & RIVERS', 
      es: 'ECUADOR: VOLCANES Y RÍOS', 
      fr: 'ÉQUATEUR: VOLCANS ET RIVIÈRES', 
      de: 'ECUADOR: VULKANE & FLÜSSE', 
      it: 'ECUADOR: VULCANI E FIUMI', 
      pt: 'EQUADOR: VULCÕES E RIOS', 
      ja: 'エクアドル：火山とアマゾン川の旅', 
      zh: '火山大道与亚马逊雨林8日游' 
    },
    destination: 'Ecuador',
    duration: { 
      en: '8 DAYS / 7 NIGHTS', 
      es: '8 DÍAS / 7 NOCHES', 
      fr: '8 JOURS / 7 NUITS', 
      de: '8 TAGE / 7 NÄCHTE', 
      it: '8 GIORNI / 7 NOTTI', 
      pt: '8 DIAS / 7 NOITES', 
      ja: '8日間 / 7泊', 
      zh: '8天 / 7晚' 
    },
    durationDays: 8,
    price: 1543,
    price3Star: 1543,
    price4Star: 1800,
    imageUrl: '/images/tours/16-9/cotopaxi-volcano-16-9.jpg',
    mobileImage: '/images/tours/16-9/cotopaxi-volcano-16-9.jpg',
    desktopImage: '/images/tours/16-9/cotopaxi-volcano-16-9.jpg',
    gallery: [
      '/images/tours/16-9/quito-colonial-16-9.jpg',
      '/images/tours/16-9/amazon-river-16-9.jpg',
      '/images/tours/9-16/amazon-loro-9-16.jpg',
      '/images/tours/16-9/chimborazo-volcano-16-9.jpg',
      '/images/tours/16-9/pailon-del-diablo-16-9.jpg',
      '/images/tours/16-9/quilotoa-16-9.jpg'
    ],
    rating: 5,
    reviewsCount: 31,
    isPopular: true,
    category: { 
      en: 'Andes & Amazon Overland', 
      es: 'Andes y Amazonía Overland', 
      fr: 'Aventure Andes & Amazonie', 
      de: 'Anden- & Amazonas-Reise', 
      it: 'Overland Ande e Amazzonia', 
      pt: 'Expedição Andes e Amazônia', 
      ja: 'アンデス＆アマゾン周遊', 
      zh: '安第斯与亚马逊经典穿越' 
    },
    description: {
      en: '8-day overland journey connecting Quito colonial historic center, Equator Line, Papallacta thermal springs, Tena Amazon lodge with motorized canoe, Yanacocha rescue biopark, Baños waterfalls & Pailón del Diablo, and Quilotoa crater lake.',
      es: 'Travesía de 8 días conectando Quito colonial, Mitad del Mundo, Termas de Papallacta, lodge en la selva amazónica de Tena en canoa motorizada, bioparque Yanacocha en Puyo, cascada Pailón del Diablo en Baños y cráter de Quilotoa.',
      zh: '8日私人全景之旅，涵盖基多历史中心、赤道纪念碑、帕帕亚克塔温泉、特纳亚马逊雨林精品木屋、动力木舟、普约亚纳科查生物公园、巴尼奥斯恶魔之咽瀑布与基洛托阿火山湖。'
    },
    highlights: [
      { en: 'Quito UNESCO Historic Center & Equator Line', es: 'Centro Histórico de Quito y Mitad del Mundo', zh: '基多历史中心与赤道纪念碑' },
      { en: 'Papallacta Thermal Hot Springs & Antisana Views', es: 'Termas de Papallacta y Vistas del Antisana', zh: '帕帕亚克塔高山温泉' },
      { en: 'Tena Amazon Lodge, Canoe & Caiman Lagoon', es: 'Lodge en Tena, Canoa y Laguna de Caimanes', zh: '特纳雨林木屋、木舟与鳄鱼湖' },
      { en: 'Yanacocha Biopark & Pailón del Diablo Waterfall', es: 'Bioparque Yanacocha y Pailón del Diablo', zh: '亚纳科查生物公园与恶魔之咽瀑布' },
      { en: 'Quilotoa Emerald Crater Lake & Tigua Art', es: 'Laguna de Quilotoa y Arte de Tigua', zh: '基洛托阿翡翠火山湖与蒂瓜艺术' }
    ],
    inclusions: [
      { en: 'Airport assistance and private transfers', es: 'Asistencia en aeropuerto y traslados privados' },
      { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado (vehículos 4x4 o buses turísticos)' },
      { en: 'Professional English-speaking guide', es: 'Guía profesional bilingüe' },
      { en: 'Accommodation at 3* or 4* hotels according to selection', es: 'Alojamiento en hoteles 3★ o 4★ según plan' },
      { en: 'Daily breakfast, plus lunches and dinners in Amazon as specified', es: 'Desayunos diarios, y comidas en Amazonía según itinerario' },
      { en: 'Entrances: La Compañía, Intiñan, Papallacta, Yanacocha, Pailón del Diablo, Ilinizas (Quilotoa)', es: 'Entradas: La Compañía, Intiñan, Papallacta, Yanacocha, Pailón del Diablo, Quilotoa' }
    ],
    exclusions: [
      { en: 'Personal expenses and optional activities in Baños', es: 'Gastos personales y actividades opcionales en Baños' },
      { en: 'Meals not specified in the itinerary', es: 'Comidas no especificadas' }
    ],
    itinerary: [
      {
        day: 1,
        title: { en: 'DAY 1 – ARRIVAL IN QUITO', es: 'DÍA 1 – LLEGADA A QUITO' },
        description: {
          en: 'Airport Transfer (IN): Welcome at Quito International Airport and private transfer to your hotel.',
          es: 'Recepción en el Aeropuerto Internacional Mariscal Sucre de Quito y traslado privado al hotel.'
        },
        accommodation: { en: 'Quito', es: 'Quito' },
        transportation: { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado' }
      },
      {
        day: 2,
        title: { en: 'DAY 2 – QUITO CITY TOUR & EQUATOR LINE', es: 'DÍA 2 – CITY TOUR EN QUITO Y LÍNEA ECUATORIAL' },
        description: {
          en: 'Quito was declared a UNESCO World Cultural Heritage Site in 1978 and is considered one of the most beautiful cities in the Americas.\n\nToday, we explore both the modern and historic areas of Quito. The historic center is renowned for its impressive churches, colonial architecture, and beautiful plazas.\n\nWe will visit the Cathedral, the Archbishop’s Palace, and the Presidential Palace, all located around the main square, known as Plaza Grande. We will also visit La Compañía de Jesús, one of Quito’s most spectacular churches, famous for its interior richly decorated with gold leaf, as well as San Francisco Square and Church.\n\nAfterward, we continue to the Middle of the World (Mitad del Mundo), where we visit the Intiñan Museum, famous for its demonstrations and experiments related to the Equator. Here, you can experience the unique sensation of standing in the Northern and Southern Hemispheres at the same time.',
          es: 'Visita guiada al centro histórico de Quito: Plaza Grande, Catedral, Palacio Arzobispal, Palacio Presidencial, Iglesia de La Compañía de Jesús cubierta de pan de oro y Plaza San Francisco.\n\nContinuamos a la Mitad del Mundo y Museo Intiñan con experimentos sobre la línea ecuatorial.'
        },
        accommodation: { en: 'Quito', es: 'Quito' },
        activity: { en: '5-hour guided tour', es: 'Tour guiado de 5 horas' },
        transportation: { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 3,
        title: { en: 'DAY 3 – QUITO – PAPALLACTA – AMAZON RAINFOREST', es: 'DÍA 3 – QUITO – PAPALLACTA – SELVA AMAZÓNICA' },
        description: {
          en: 'We travel approximately two hours east of Quito along a historic route used by Spanish explorers in the 16th century in their search for gold and cinnamon. This expedition eventually led to the discovery of the Amazon River.\n\nAlong the way, we pass by the historic Guápulo Church and cross the Andes at approximately 4,100 meters (13,451 ft) above sea level. The route passes between two ecological reserves before descending toward the transition zone between the Andes and the Ecuadorian Amazon.\n\nWe stop at the famous Papallacta Hot Springs, where you can enjoy several activities: relax in thermal pools with different temperatures while enjoying spectacular views of Antisana Volcano (5,704 m / 18,714 ft), enjoy some relaxing time at the spa, or explore the walking trails around the area.\n\nWe then continue our descent toward the Amazon rainforest.',
          es: 'Viaje al este cruzando la cordillera a 4,100 m de altitud con vistas de páramo y paso por Guápulo. Parada en las Termas de Papallacta para disfrutar de las piscinas termales medicinales y senderos ecológicos. Descenso hacia la selva amazónica de Tena.'
        },
        accommodation: { en: 'Tena Lodge', es: 'Tena Lodge' },
        activity: { en: '6-hour guided tour; descent from 4,000m to 500m; 1-hour hike', es: 'Tour de 6 horas, descenso de 4,000m a 500m y caminata de 1h' },
        transportation: { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 4,
        title: { en: 'DAY 4 – TENA & AMAZON RAINFOREST', es: 'DÍA 4 – TENA Y SELVA AMAZÓNICA' },
        description: {
          en: 'In the morning, we board a motorized canoe and travel downstream to visit an Amazon rainforest wildlife rescue center, where we will learn about local wildlife and conservation efforts.\n\nWe then have the opportunity to explore primary rainforest on foot, accompanied by a knowledgeable local guide. During the hike, we will discover the incredible biodiversity of the Amazon and learn about the rainforest ecosystem.\n\nWe will also visit a local Kichwa family and learn about their traditions, culture, and way of life.\n\nFinally, we visit a caiman lagoon, where we can observe these fascinating Amazonian reptiles in their natural environment.\n\nWe then return to the lodge.',
          es: 'Paseo en canoa motorizada por el río hacia un centro de rescate de fauna amazónica. Caminata guiada por la selva primaria con guía nativo, visita a una familia Kichwa y observación de caimanes en la laguna.'
        },
        accommodation: { en: 'Tena Lodge', es: 'Tena Lodge' },
        activity: { en: '6-hour guided tour + 1-hour motorized canoe ride', es: 'Tour de 6h + paseo en canoa motorizada de 1h' },
        transportation: { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado' },
        meals: { en: 'Breakfast, lunch, and dinner', es: 'Desayuno, almuerzo y cena' }
      },
      {
        day: 5,
        title: { en: 'DAY 5 – TENA – PUYO – BAÑOS', es: 'DÍA 5 – TENA – PUYO – BAÑOS' },
        description: {
          en: 'In the morning, we travel south toward the city of Puyo. Along the way, we visit Yanacocha Biopark, where we will learn about Amazonian wildlife species that have been rescued from illegal wildlife trafficking.\n\nWe then continue toward Baños along the spectacular Route of the Waterfalls, one of Ecuador’s most scenic routes.\n\nWe will have the opportunity to hike to Pailón del Diablo, one of the most impressive waterfalls in Ecuador, surrounded by lush vegetation and dramatic mountain scenery.\n\nWe continue to Baños for our overnight stay.',
          es: 'Viaje hacia Puyo y visita al Bioparque Yanacocha de rescate de fauna silvestre. Continuación por el cañón del río Pastaza y la Ruta de las Cascadas hacia Baños, con caminata a la gran cascada Pailón del Diablo.'
        },
        accommodation: { en: 'Baños', es: 'Baños' },
        activity: { en: '6-hour guided tour', es: 'Tour guiado de 6 horas' },
        transportation: { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 6,
        title: { en: 'DAY 6 – BAÑOS – FREE DAY', es: 'DÍA 6 – BAÑOS – DÍA LIBRE' },
        description: {
          en: 'Enjoy a free day in Baños, a charming tourist town located at the foothills of the active Tungurahua Volcano.\n\nYou can enjoy a variety of optional activities at your own expense, including: cycling, white-water rafting, waterfall hikes, cable-car rides (tarabita), and horseback riding.',
          es: 'Día libre en Baños de Agua Santa para disfrutar de actividades de aventura opcionales: ciclismo de montaña, rafting, tarabitas sobre cañones, termas o cabalgatas.'
        },
        accommodation: { en: 'Baños', es: 'Baños' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 7,
        title: { en: 'DAY 7 – BAÑOS – QUILOTOA – QUITO', es: 'DÍA 7 – BAÑOS – QUILOTOA – QUITO' },
        description: {
          en: 'In the morning, we begin our journey toward Quito. Along the way, we visit the spectacular Quilotoa Crater Lake, famous for its breathtaking scenery and turquoise waters.\n\nYou will have the opportunity to hike approximately two hours toward the bottom of the crater.\n\nWe may also make a stop in the traditional village of Tigua, famous for its colorful Andean paintings, as well as local guinea pig farms.\n\nWe then continue to Quito.',
          es: 'Viaje hacia la Laguna del Cráter de Quilotoa con caminata al interior de la caldera volcánica. Parada en el pueblo de pintores de Tigua y continuación hacia Quito.'
        },
        accommodation: { en: 'Quito', es: 'Quito' },
        activity: { en: '6-hour guided tour + 2-hour hike (3,500 m / 11,483 ft)', es: 'Tour de 6h + caminata de 2h (3,500 m)' },
        transportation: { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 8,
        title: { en: 'DAY 8 – TRANSFER TO THE AIRPORT', es: 'DÍA 8 – TRASLADO AL AEROPUERTO' },
        description: {
          en: 'Private transfer to the airport for your onward flight connections to the Galápagos Islands or Mainland Ecuador.\n\nEnd of the tour.',
          es: 'Traslado privado al Aeropuerto Internacional de Quito para su vuelo internacional o conexión a Galápagos o Ecuador Continental. Fin de los servicios.'
        },
        transportation: { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado' }
      }
    ]
  },

  // Tour 6: Andes & Amazon Rainforest (7 Days)
  {
    id: 'andes-amazon-7days',
    title: { 
      en: 'ECUADOR: ANDES & AMAZON RAINFOREST', 
      es: 'ECUADOR: ANDES Y SELVA AMAZÓNICA', 
      fr: 'ÉQUATEUR: ANDES ET FORÊT AMAZONIENNE', 
      de: 'ECUADOR: ANDEN & AMAZONAS-REGENWALD', 
      it: 'ECUADOR: ANDE E FORESTA AMAZZONICA', 
      pt: 'EQUADOR: ANDES E FLORESTA AMAZÔNICA', 
      ja: 'エクアドル：アンデスとアマゾンの熱帯雨林', 
      zh: '安第斯高原与亚马逊雨林7日游' 
    },
    destination: 'Ecuador',
    duration: { 
      en: '7 DAYS / 6 NIGHTS', 
      es: '7 DÍAS / 6 NOCHES', 
      fr: '7 JOURS / 6 NUITS', 
      de: '7 TAGE / 6 NÄCHTE', 
      it: '7 GIORNI / 6 NOTTI', 
      pt: '7 DIAS / 6 NOITES', 
      ja: '7日間 / 6泊', 
      zh: '7天 / 6晚' 
    },
    durationDays: 7,
    price: 1307,
    price3Star: 1307,
    price4Star: 1600,
    imageUrl: '/images/tours/16-9/amazon-cuyabeno-16-9.jpg',
    mobileImage: '/images/tours/16-9/amazon-river-16-9.jpg',
    desktopImage: '/images/tours/16-9/amazon-river-16-9.jpg',
    gallery: [
      '/images/tours/16-9/quito-colonial-16-9.jpg',
      '/images/tours/9-16/amazon-loro-9-16.jpg',
      '/images/tours/9-16/amazon-loro-9-16.jpg',
      '/images/tours/9-16/amazon-waterfall-9-16.jpg',
      '/images/tours/16-9/amazon-cuyabeno-16-9.jpg',
      '/images/tours/16-9/amazon-river-16-9.jpg'
    ],
    rating: 5,
    reviewsCount: 26,
    category: { 
      en: 'Andes & Amazon Expedition', 
      es: 'Expedición Andes y Amazonía', 
      fr: 'Expédition Andes & Amazonie', 
      de: 'Anden- & Amazonas-Expedition', 
      it: 'Spedizione Ande e Amazzonia', 
      pt: 'Expedição Andes e Amazônia', 
      ja: 'アンデス＆アマゾン探検', 
      zh: '雨林木屋沉浸探险' 
    },
    description: {
      en: '7-day immersive journey uniting Quito colonial heritage, Equator line, Papallacta thermal springs, Tena jungle lodge, motorized canoe expeditions, Kichwa cultural encounter, and Paikawe Amazon reserve giant fish lagoon.',
      es: 'Inmersión de 7 días combinando el patrimonio colonial de Quito, la Mitad del Mundo, Termas de Papallacta, lodge en la selva de Tena, expedición en canoa, vivencia cultural Kichwa y los peces gigantes de la Reserva Paikawe.',
      zh: '7日沉浸式探险，结合基多殖民文化遗产、赤道线、帕帕亚克塔温泉、特纳雨林木屋、动力木舟、奇瓦文化体验、派卡韦亚马逊保护区巨型鱼类观赏。'
    },
    highlights: [
      { en: 'Quito UNESCO Historic Center & Mitad del Mundo', es: 'Centro Histórico de Quito y Mitad del Mundo', zh: '基多历史中心与赤道纪念碑' },
      { en: 'Papallacta Thermal Hot Springs in the Andes', es: 'Termas de Papallacta en los Andes', zh: '帕帕亚克塔高山温泉' },
      { en: 'Tena Amazon Lodge & Motorized River Canoe', es: 'Lodge en Tena y Canoa Motorizada en el Río', zh: '特纳雨林木屋与动力木舟' },
      { en: 'Amazon Wildlife Rescue Center & Kichwa Culture', es: 'Centro de Rescate y Cultura Kichwa', zh: '野生动物保护中心与奇瓦文化' },
      { en: 'Misahuallí & Paikawe Giant Fish Reserve Lagoon', es: 'Misahuallí y Laguna de Peces Gigantes de Paikawe', zh: '米萨瓦利与派卡韦巨鱼保护区' }
    ],
    inclusions: [
      { en: 'Airport reception and private transfers', es: 'Recepción en aeropuerto y traslados privados' },
      { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado' },
      { en: 'Professional English-speaking guide', es: 'Guía profesional bilingüe' },
      { en: 'Accommodation (6 nights in 3* or 4* hotels / Amazon lodge)', es: 'Alojamiento (6 noches en hoteles 3★ o 4★ / Lodge amazónico)' },
      { en: 'Meals: Daily breakfast, plus lunch and dinner at Amazon lodge', es: 'Comidas: Desayunos diarios, almuerzo y cena en lodge' },
      { en: 'Entrances: La Compañía, Intiñan, Papallacta, Rescue Center, Paikawe', es: 'Entradas: La Compañía, Intiñan, Papallacta, Centro de Rescate, Paikawe' }
    ],
    exclusions: [
      { en: 'Personal expenses and services not specified in the program', es: 'Gastos personales y servicios no especificados' }
    ],
    itinerary: [
      {
        day: 1,
        title: { en: 'DAY 1 – ARRIVAL IN QUITO', es: 'DÍA 1 – LLEGADA A QUITO' },
        description: {
          en: 'Airport Transfer (IN): Welcome at Quito International Airport and private transfer to your hotel.',
          es: 'Recepción en el Aeropuerto Internacional de Quito y traslado privado al hotel.'
        },
        accommodation: { en: 'Quito', es: 'Quito' }
      },
      {
        day: 2,
        title: { en: 'DAY 2 – QUITO CITY TOUR & EQUATOR LINE', es: 'DÍA 2 – CITY TOUR EN QUITO Y LÍNEA ECUATORIAL' },
        description: {
          en: 'Quito was declared a UNESCO World Cultural Heritage Site in 1978 and is considered one of the most beautiful cities in the Americas.\n\nToday, we explore both the modern and historic areas of Quito. The historic center is renowned for its impressive churches, colonial architecture, and beautiful plazas.\n\nWe will visit the Cathedral, the Archbishop’s Palace, and the Presidential Palace, all located around the main square, known as Plaza Grande. We will also visit La Compañía de Jesús, one of Quito’s most spectacular churches, famous for its richly decorated interior covered in gold leaf, as well as San Francisco Square and Church.\n\nWe then continue to the Middle of the World (Mitad del Mundo), where we visit the Intiñan Museum, famous for its demonstrations and experiments related to the Equator. Here, you can experience the unique sensation of standing in the Northern and Southern Hemispheres at the same time.',
          es: 'Recorrido por las joyas coloniales de Quito: Catedral, Palacio de Carondelet, Iglesia de la Compañía de Jesús y Plaza San Francisco.\n\nVisita al Museo Intiñan en la Mitad del Mundo para experimentar los fenómenos físicos de la línea ecuatorial.'
        },
        accommodation: { en: 'Quito', es: 'Quito' },
        activity: { en: '5-hour guided tour', es: 'Tour guiado de 5 horas' },
        transportation: { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 3,
        title: { en: 'DAY 3 – QUITO – PAPALLACTA – AMAZON RAINFOREST', es: 'DÍA 3 – QUITO – PAPALLACTA – SELVA AMAZÓNICA' },
        description: {
          en: 'We travel approximately two hours east of Quito along a historic route used by Spanish explorers in the 16th century in their search for gold and cinnamon. This expedition eventually led to the discovery of the Amazon River.\n\nAlong the way, we pass by the historic Guápulo Church and cross the Andes at approximately 4,100 meters (13,451 ft) above sea level. The route passes between two ecological reserves before descending toward the transition zone between the Andes and the Ecuadorian Amazon.\n\nWe stop at the famous Papallacta Hot Springs, where you can choose from several activities: relax in thermal pools with different temperatures while enjoying spectacular views of Antisana Volcano (5,704 m / 18,714 ft), enjoy some relaxing time at the spa, or explore the walking trails around the area.\n\nWe then continue our descent toward the Amazon rainforest.',
          es: 'Cruce de los Andes a 4,100 m y relax en las Termas de Papallacta con vista al Antisana. Descenso a la Amazonía hasta llegar a nuestro lodge en Tena.'
        },
        accommodation: { en: 'Tena Lodge', es: 'Tena Lodge' },
        activity: { en: '6-hour guided tour; descent from 4,000m to 500m; 1-hour hike', es: 'Tour de 6 horas y caminata de 1 hora' },
        transportation: { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 4,
        title: { en: 'DAY 4 – TENA & AMAZON RAINFOREST', es: 'DÍA 4 – TENA Y SELVA AMAZÓNICA' },
        description: {
          en: 'In the morning, we board a motorized canoe and travel downstream to visit an Amazon rainforest wildlife rescue center, where we will learn about local wildlife and conservation efforts.\n\nWe then have the opportunity to explore primary rainforest on foot, accompanied by a knowledgeable local guide. During the hike, we will discover the incredible biodiversity of the Amazon and learn about the rainforest ecosystem.\n\nWe will also visit a local Kichwa family and learn about their traditions, culture, and daily way of life.\n\nFinally, we visit a caiman lagoon, where we can observe these fascinating Amazonian reptiles in their natural environment.\n\nReturn to the lodge and overnight stay.',
          es: 'Canoa por el río amazónico, visita al centro de rescate de fauna, caminata por la selva primaria, encuentro cultural con una familia Kichwa y laguna de caimanes.'
        },
        accommodation: { en: 'Tena Lodge', es: 'Tena Lodge' },
        activity: { en: '6-hour guided tour + 1-hour motorized canoe ride', es: 'Tour de 6h + canoa de 1h' },
        transportation: { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado' },
        meals: { en: 'Breakfast, lunch, and dinner', es: 'Desayuno, almuerzo y cena' }
      },
      {
        day: 5,
        title: { en: 'DAY 5 – MISAHUALLÍ – PAIKAWE RESERVE – QUITO', es: 'DÍA 5 – MISAHUALLÍ – RESERVA PAIKAWE – QUITO' },
        description: {
          en: 'In the morning, we visit Paikawe Reserve, where we have the opportunity to hike through primary rainforest and explore the lagoon by boat.\n\nDuring the visit, we can observe the impressive giant fish of the Amazon and discover the extraordinary biodiversity of this tropical environment.\n\nAfter the visit, we begin our return journey to Quito.',
          es: 'Visita a la Reserva Paikawe con caminata en selva y navegación en canoa para observar los peces gigantes del Amazonas (Paiche/Arapaima). Retorno a Quito.'
        },
        accommodation: { en: 'Quito', es: 'Quito' },
        activity: { en: '6-hour guided tour + 1-hour rainforest hike (500m alt.)', es: 'Tour de 6 horas y caminata de 1h' },
        transportation: { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 6,
        title: { en: 'DAY 6 – FREE DAY IN QUITO', es: 'DÍA 6 – DÍA LIBRE EN QUITO' },
        description: {
          en: 'Enjoy a free day to relax, explore Quito independently, or discover more of the city’s cultural and historical attractions.',
          es: 'Día libre en Quito para recorrer sus museos, gastronomía o descansar.'
        },
        accommodation: { en: 'Quito', es: 'Quito' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 7,
        title: { en: 'DAY 7 – TRANSFER TO THE AIRPORT', es: 'DÍA 7 – TRASLADO AL AEROPUERTO' },
        description: {
          en: 'Private transfer to the airport for your onward flight connections to the Galápagos Islands.\n\nEnd of the tour.',
          es: 'Traslado privado al aeropuerto para su vuelo de conexión o retorno internacional.'
        },
        transportation: { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado' }
      }
    ]
  },

  // Tour 7: Snow-Capped Volcanoes & Waterfalls (6 Days)
  {
    id: 'snow-volcanoes-6days',
    title: { 
      en: 'SNOW-CAPPED VOLCANOES & WATERFALLS', 
      es: 'VOLCANES NEVADOS Y CASCADAS', 
      fr: 'VOLCANS ENNEIGÉS ET CASCADES', 
      de: 'SCHNEEBEDECKTE VULKANE & WASSERFÄLLE', 
      it: 'VULCANI INNEVATI E CASCATE', 
      pt: 'VULCÕES NEVADOS E CACHOEIRAS', 
      ja: '雪冠火山と名瀑を巡る旅', 
      zh: '雪山火山与瀑布6日游' 
    },
    destination: 'Ecuador',
    duration: { 
      en: '6 DAYS / 5 NIGHTS', 
      es: '6 DÍAS / 5 NOCHES', 
      fr: '6 JOURS / 5 NUITS', 
      de: '6 TAGE / 5 NÄCHTE', 
      it: '6 GIORNI / 5 NOTTI', 
      pt: '6 DIAS / 5 NOITES', 
      ja: '6日間 / 5泊', 
      zh: '6天 / 5晚' 
    },
    durationDays: 6,
    price: 1102,
    price3Star: 1102,
    price4Star: 1300,
    imageUrl: '/images/tours/16-9/chimborazo-volcano-16-9.jpg',
    mobileImage: '/images/tours/9-16/amazon-waterfall-9-16.jpg',
    desktopImage: '/images/tours/16-9/pailon-del-diablo-16-9.jpg',
    gallery: [
      '/images/tours/16-9/cotopaxi-volcano-16-9.jpg',
      '/images/tours/16-9/cotopaxi-volcano-16-9.jpg',
      '/images/tours/16-9/chimborazo-volcano-16-9.jpg',
      '/images/tours/16-9/puyo-yanacocha-16-9.jpg'
    ],
    rating: 5,
    reviewsCount: 19,
    category: { 
      en: 'Andean Highlights & Waterfalls', 
      es: 'Aventura Andina y Cascadas', 
      fr: 'Points forts des Andes et cascades', 
      de: 'Anden-Highlights & Wasserfälle', 
      it: 'Meraviglie Andine e Cascate', 
      pt: 'Destaques Andinos e Cachoeiras', 
      ja: 'アンデス絶景と滝巡り', 
      zh: '安第斯山脉与瀑布速览' 
    },
    description: {
      en: '6-day overland journey traversing the Avenue of the Volcanoes, adventure town of Baños, Pailón del Diablo waterfall, Pastaza canyon, Puyo rainforest biopark, and Quilotoa turquoise crater lake.',
      es: 'Recorrido de 6 días por la Avenida de los Volcanes, Baños de Agua Santa, la cascada Pailón del Diablo, el cañón del Pastaza, el bioparque de selva en Puyo y el lago de cráter Quilotoa.',
      zh: '6日陆地景观之旅，沿着火山大道前进，游览冒险小镇巴尼奥斯、恶魔之咽瀑布、帕斯塔萨峡谷、普约雨林公园与基洛托阿翡翠火山湖。'
    },
    highlights: [
      { en: 'Avenue of the Volcanoes & Baños de Agua Santa', es: 'Avenida de los Volcanes y Baños de Agua Santa', zh: '火山大道与巴尼奥斯小镇' },
      { en: 'Pailón del Diablo Mega Waterfall Hike', es: 'Caminata a la Cascada Pailón del Diablo', zh: '恶魔之咽瀑布徒步' },
      { en: 'Puyo Amazon Rainforest & Yanacocha Biopark', es: 'Selva de Puyo y Bioparque Yanacocha', zh: '普约雨林与亚纳科查生物公园' },
      { en: 'Hola Vida Waterfall & Indigenous Community', es: 'Cascada Hola Vida y Comunidad Indígena', zh: '奥拉维达瀑布与奇瓦文化' },
      { en: 'Quilotoa Emerald Crater Lake & Tigua Art', es: 'Laguna de Quilotoa y Pinturas de Tigua', zh: '基洛托阿翡翠火山湖' }
    ],
    inclusions: [
      { en: 'Airport assistance and private transfers', es: 'Asistencia en aeropuerto y traslados privados' },
      { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado' },
      { en: 'Professional English-speaking guide', es: 'Guía profesional bilingüe' },
      { en: 'Accommodation (5 nights in 3* or 4* hotels)', es: 'Alojamiento (5 noches en hoteles 3★ o 4★)' },
      { en: 'Daily breakfast and specified lunch in Puyo', es: 'Desayunos diarios y almuerzo incluido en Puyo' },
      { en: 'Entrances: Pailón del Diablo, Yanacocha, Hola Vida, Quilotoa', es: 'Entradas: Pailón del Diablo, Yanacocha, Hola Vida, Quilotoa' }
    ],
    exclusions: [
      { en: 'Personal expenses and optional activities in Baños', es: 'Gastos personales y actividades opcionales en Baños' }
    ],
    itinerary: [
      {
        day: 1,
        title: { en: 'DAY 1 – ARRIVAL IN QUITO', es: 'DÍA 1 – LLEGADA A QUITO' },
        description: {
          en: 'Airport assistance and private transfer to your hotel.\n\nDeparture: The tour can begin on any day of the week.',
          es: 'Asistencia en aeropuerto y traslado privado al hotel en Quito.'
        },
        accommodation: { en: 'Quito', es: 'Quito' },
        transportation: { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado' }
      },
      {
        day: 2,
        title: { en: 'DAY 2 – QUITO – BAÑOS', es: 'DÍA 2 – QUITO – BAÑOS' },
        description: {
          en: 'Today, we travel south along the Pan-American Highway and through Ecuador’s famous “Avenue of the Volcanoes,” home to approximately 62 volcanoes.\n\nWe continue toward Baños, a charming tourist town located at the foothills of the active Tungurahua Volcano. Surrounded by spectacular landscapes between the Amazon rainforest and the Andes Mountains, Baños offers a wide variety of optional activities, including cycling, rafting, horseback riding, cable-car rides, hiking, and visits to beautiful waterfalls.\n\nWe will visit the spectacular Pailón del Diablo Waterfall, one of the region’s most impressive natural attractions.',
          es: 'Viaje hacia el sur por la Avenida de los Volcanes hacia Baños de Agua Santa, al pie del volcán Tungurahua. Visita y caminata a la majestuosa cascada Pailón del Diablo.'
        },
        accommodation: { en: 'Baños', es: 'Baños' },
        activity: { en: '8-hour guided tour', es: 'Tour guiado de 8 horas' },
        transportation: { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 3,
        title: { en: 'DAY 3 – BAÑOS – AMAZON RAINFOREST – PUYO', es: 'DÍA 3 – BAÑOS – SELVA AMAZÓNICA – PUYO' },
        description: {
          en: 'In the morning, we head into the Amazon rainforest, traveling through the spectacular Pastaza River Canyon toward the city of Puyo.\n\nOur first stop is Yanacocha Biopark, where you will have the opportunity to observe and learn about local animal species that have been rescued from illegal wildlife trafficking.\n\nWe then continue with a hike through the Amazon rainforest to Hola Vida Waterfall, surrounded by lush vegetation and tropical scenery.\n\nFinally, we visit a local Indigenous family, where we will have the opportunity to learn about their traditions, culture, and way of life.\n\nAfter the visit, we return to Baños.',
          es: 'Viaje por el Cañón del Pastaza hacia Puyo. Visita al Bioparque Yanacocha de rescate de fauna, caminata por la selva a la Cascada Hola Vida y visita a una familia indígena Kichwa.'
        },
        accommodation: { en: 'Baños', es: 'Baños' },
        activity: { en: '6-hour guided tour + 2-hour rainforest hike', es: 'Tour de 6h + caminata en selva de 2h' },
        transportation: { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado' },
        meals: { en: 'Breakfast and lunch', es: 'Desayuno y almuerzo' }
      },
      {
        day: 4,
        title: { en: 'DAY 4 – BAÑOS – QUILOTOA – QUITO', es: 'DÍA 4 – BAÑOS – QUILOTOA – QUITO' },
        description: {
          en: 'In the morning, we begin our journey back to Quito. Along the way, we visit the spectacular Quilotoa Crater Lake, one of Ecuador’s most iconic natural attractions, famous for its striking turquoise waters and breathtaking Andean scenery.\n\nYou will have the opportunity to hike approximately two hours toward the bottom of the crater. Along the way, we may also stop at the traditional village of Tigua, famous for its colorful paintings and Andean artistic traditions, as well as local guinea pig farms.\n\nWe then continue to Quito.',
          es: 'Viaje al cráter volcánico de Quilotoa con caminata hacia la laguna turquesa. Parada en los talleres de pintura de Tigua y retorno a Quito.'
        },
        accommodation: { en: 'Quito', es: 'Quito' },
        activity: { en: '6-hour guided tour + 2-hour hike (3,500 m / 11,483 ft)', es: 'Tour de 6h + caminata de 2h' },
        transportation: { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 5,
        title: { en: 'DAY 5 – FREE DAY IN QUITO', es: 'DÍA 5 – DÍA LIBRE EN QUITO' },
        description: {
          en: 'Enjoy a free day to explore Quito at your own pace, relax, or discover more of the city’s attractions and cultural highlights.',
          es: 'Día libre en Quito para recorrer a su propio ritmo.'
        },
        accommodation: { en: 'Quito', es: 'Quito' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 6,
        title: { en: 'DAY 6 – TRANSFER TO THE AIRPORT', es: 'DÍA 6 – TRASLADO AL AEROPUERTO' },
        description: {
          en: 'Private transfer to the airport for your onward flight connections, including connections to the Galápagos Islands.\n\nEnd of the tour.',
          es: 'Traslado privado al aeropuerto para su vuelo de conexión o salida.'
        },
        transportation: { en: 'Private transportation' }
      }
    ]
  },

  // Tour 8: Ecuador Fantastic (8 Days)
  {
    id: 'ecuador-fantastic-8days',
    title: { 
      en: 'ECUADOR FANTASTIC – 8 DAYS / 7 NIGHTS', 
      es: 'ECUADOR FANTÁSTICO – 8 DÍAS / 7 NOCHES', 
      fr: 'ÉQUATEUR FANTASTIQUE – 8 JOURS / 7 NUITS', 
      de: 'FANTASTISCHES ECUADOR – 8 TAGE / 7 NÄCHTE', 
      it: 'ECUADOR FANTASTICO – 8 GIORNI / 7 NOTTI', 
      pt: 'EQUADOR FANTÁSTICO – 8 DIAS / 7 NOITES', 
      ja: 'ファンタスティック・エクアドル 8日間の旅', 
      zh: '厄瓜多尔全景经典8日游' 
    },
    destination: 'Ecuador',
    duration: { 
      en: '8 DAYS / 7 NIGHTS', 
      es: '8 DÍAS / 7 NOCHES', 
      fr: '8 JOURS / 7 NUITS', 
      de: '8 TAGE / 7 NÄCHTE', 
      it: '8 GIORNI / 7 NOTTI', 
      pt: '8 DIAS / 7 NOITES', 
      ja: '8日間 / 7泊', 
      zh: '8天 / 7晚' 
    },
    durationDays: 8,
    price: 1512,
    price3Star: 1512,
    price4Star: 1799,
    imageUrl: '/images/tours/16-9/quito-iglesia-de-san-francisco-16-9.jpg',
    mobileImage: '/images/tours/16-9/chimborazo-volcano-16-9.jpg',
    desktopImage: '/images/tours/16-9/cuenca-colonial-16-9.jpg',
    gallery: [
      '/images/tours/16-9/otavalo-peguche-16-9.jpg',
      '/images/tours/16-9/quito-colonial-16-9.jpg',
      '/images/tours/16-9/pailon-del-diablo-16-9.jpg',
      '/images/tours/16-9/chimborazo-volcano-16-9.jpg',
      '/images/tours/16-9/ruinas-de-ingapirca-16-9.jpg',
      '/images/tours/9-16/cajas-national-park-9-16.jpg',
      '/images/tours/9-16/guayaquil-9-16.jpg',
      '/images/tours/16-9/guayaquil-16-9.jpg'
    ],
    rating: 5,
    reviewsCount: 45,
    isPopular: true,
    category: { 
      en: 'Grand Mainland Expedition', 
      es: 'Gran Expedición Continental', 
      fr: "Grande expédition équatorienne", 
      de: 'Große Festland-Expedition', 
      it: 'Grande Spedizione Continentale', 
      pt: 'Grande Expedição Continental', 
      ja: 'エクアドル縦断グランドツアー', 
      zh: '厄瓜多尔陆地旗舰纵贯线' 
    },
    description: {
      en: 'Discover the Best of Ecuador in 8 Days: Quito colonial center, Otavalo market, Cuicocha lake, Mitad del Mundo, Baños waterfalls & Pailón del Diablo, Chimborazo Volcano (6,310m), Ingapirca Inca ruins, colonial Cuenca, Cajas National Park lakes, and finishing in coastal Guayaquil.',
      es: 'Descubre lo mejor de Ecuador en 8 días: Quito colonial, mercado de Otavalo, laguna de Cuicocha, Mitad del Mundo, cascadas de Baños y Pailón del Diablo, Volcán Chimborazo (6,310 m), ruinas incas de Ingapirca, Cuenca colonial, Parque Nacional Cajas y final en Guayaquil.',
      zh: '8日厄瓜多尔陆地旗舰探险，连接基多、奥塔瓦洛印第安集市、库伊科查湖、巴尼奥斯恶魔之咽、钦博拉索火山（6310米）、因加皮尔卡印加遗址、昆卡世界遗产城、卡哈斯国家公园与瓜亚基尔港。'
    },
    highlights: [
      { en: 'Otavalo Indigenous Market & Cuicocha Crater Lake', es: 'Mercado de Otavalo y Laguna de Cuicocha', zh: '奥塔瓦洛集市与库伊科查火山湖' },
      { en: 'Quito UNESCO Historic Center & Equator Monument', es: 'Centro Histórico de Quito y Mitad del Mundo', zh: '基多历史中心与赤道纪念碑' },
      { en: 'Baños de Agua Santa & Pailón del Diablo Waterfall', es: 'Baños y Cascada Pailón del Diablo', zh: '巴尼奥斯与恶魔之咽瀑布' },
      { en: 'Chimborazo National Reserve (6,310m)', es: 'Reserva Nacional Chimborazo (6,310 m)', zh: '钦博拉索火山保护区（6310米）' },
      { en: 'Ingapirca Inca Archaeological Complex & Cuenca City', es: 'Complejo Arqueológico Ingapirca y Ciudad de Cuenca', zh: '因加皮尔卡印加遗址与昆卡古城' },
      { en: 'Cajas National Park Lakes & Guayaquil Port', es: 'Parque Nacional Cajas y Puerto de Guayaquil', zh: '卡哈斯国家公园与瓜亚基尔港' }
    ],
    inclusions: [
      { en: 'Airport assistance and private transfers', es: 'Asistencia en aeropuerto y traslados privados' },
      { en: 'Private transportation throughout the itinerary', es: 'Transporte privado durante todo el itinerario' },
      { en: 'Professional English-speaking guide', es: 'Guía profesional bilingüe' },
      { en: '7 nights of accommodation (3* or 4* hotels)', es: '7 noches de alojamiento (hoteles 3★ o 4★)' },
      { en: 'Daily breakfast', es: 'Desayunos diarios' },
      { en: 'Entrance fees: Cuicocha, La Compañía, Intiñan, Pailón del Diablo, Chimborazo, Ingapirca, Cajas', es: 'Entradas: Cuicocha, La Compañía, Intiñan, Pailón del Diablo, Chimborazo, Ingapirca, Cajas' }
    ],
    exclusions: [
      { en: 'Meals not specified', es: 'Comidas no especificadas' },
      { en: 'Personal expenses and optional activities', es: 'Gastos personales y actividades opcionales' }
    ],
    itinerary: [
      {
        day: 1,
        title: { en: 'DAY 1 – ARRIVAL IN QUITO', es: 'DÍA 1 – LLEGADA A QUITO' },
        description: {
          en: 'Airport assistance and private transfer to your hotel.\n\nImportant: Ecuador uses the US dollar (USD) as its official currency. We recommend carrying small-denomination bills, as larger notes may not always be accepted.',
          es: 'Recepción en el Aeropuerto de Quito y traslado privado a su hotel.'
        },
        accommodation: { en: 'Quito', es: 'Quito' }
      },
      {
        day: 2,
        title: { en: 'DAY 2 – OTAVALO INDIGENOUS MARKET & CUICOCHA CRATER LAKE', es: 'DÍA 2 – MERCADO INDÍGENA DE OTAVALO Y LAGUNA DE CUICOCHA' },
        description: {
          en: 'Travel north from Quito for approximately two hours through beautiful Andean landscapes and scenic viewpoints until reaching Otavalo, home to one of the most famous indigenous markets in South America, renowned for its traditional handicrafts, textiles and local products.\n\nIn the afternoon, continue to Cotacachi, a town famous for its high-quality leather goods and traditional craftsmanship.\n\nWe will then visit Cuicocha Crater Lake, one of Ecuador’s most spectacular volcanic lakes, located inside a breathtaking Andean landscape.\n\nReturn to Quito in the afternoon.\n\nMarket information: The largest and most vibrant Otavalo market takes place on Saturdays, although a smaller market operates daily.',
          es: 'Viaje hacia Otavalo y su mundialmente famoso mercado artesanal en la Plaza de los Ponchos. Parada en Cotacachi para artesanías de cuero y visita a la impresionante Laguna volcánica de Cuicocha. Retorno a Quito.'
        },
        accommodation: { en: 'Quito', es: 'Quito' },
        activity: { en: '8-hour guided tour', es: 'Tour guiado de 8 horas' },
        transportation: { en: 'Private vehicle (4x4 or tourist bus)', es: 'Vehículo privado' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 3,
        title: { en: 'DAY 3 – QUITO HISTORIC CENTER & MITAD DEL MUNDO', es: 'DÍA 3 – CENTRO HISTÓRICO DE QUITO Y MITAD DEL MUNDO' },
        description: {
          en: 'Discover Quito, declared a UNESCO World Heritage Site and considered one of the most beautiful historic cities in the Americas.\n\nExplore both the modern and colonial areas of the city, including its magnificent churches, plazas and historic buildings: Quito Cathedral, Archbishop’s Palace, Presidential Palace, Plaza Grande, La Compañía de Jesús Church (famous for its richly decorated golden interior), and San Francisco Plaza and Church.\n\nWe will then travel to Mitad del Mundo (Middle of the World), where you can experience standing on the Equator between the Northern and Southern Hemispheres. Visit the Intiñan Museum, known for its interactive demonstrations and fascinating exhibits related to Ecuadorian culture and the Equator.',
          es: 'Recorrido por el Centro Histórico de Quito (Patrimonio UNESCO): Catedral, Palacio Presidencial, Plaza Grande, La Compañía de Jesús y San Francisco. Traslado a la Mitad del Mundo y Museo Intiñan.'
        },
        accommodation: { en: 'Quito', es: 'Quito' },
        activity: { en: '6-hour guided tour', es: 'Tour guiado de 6 horas' },
        transportation: { en: 'Private vehicle (4x4 or tourist bus)', es: 'Vehículo privado' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 4,
        title: { en: 'DAY 4 – QUITO – BAÑOS: THE AVENUE OF VOLCANOES', es: 'DÍA 4 – QUITO – BAÑOS: LA AVENIDA DE LOS VOLCANES' },
        description: {
          en: 'Travel south from Quito along the famous Avenue of the Volcanoes, a spectacular Andean route surrounded by Ecuador’s impressive volcanic landscapes.\n\nContinue to Baños de Agua Santa, a picturesque adventure town located at the foot of the active Tungurahua Volcano. Baños offers a wide range of optional activities, including cycling, rafting, hiking to waterfalls, cable-car rides, and horseback riding.\n\nLocated between the Andes and the Amazon basin, Baños is surrounded by lush vegetation, dramatic mountains and spectacular waterfalls. Visit the famous Pailón del Diablo Waterfall before settling into your hotel.',
          es: 'Viaje por la Avenida de los Volcanes hacia Baños de Agua Santa, al pie del volcán Tungurahua. Visita a la imponente cascada Pailón del Diablo y noche en Baños.'
        },
        accommodation: { en: 'Baños', es: 'Baños' },
        activity: { en: '8-hour guided tour', es: 'Tour guiado de 8 horas' },
        transportation: { en: 'Private vehicle (4x4 or tourist bus)', es: 'Vehículo privado' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 5,
        title: { en: 'DAY 5 – CHIMBORAZO NATIONAL RESERVE, INGAPIRCA & CUENCA', es: 'DÍA 5 – RESERVA CHIMBORAZO, INGAPIRCA Y CUENCA' },
        description: {
          en: 'Start early with a visit to the Chimborazo Reserve, home to Chimborazo Volcano, Ecuador’s highest mountain at approximately 6,310 meters (20,700 ft) above sea level.\n\nEnjoy the opportunity to observe the unique flora and fauna of the high Andean páramo and hike toward the mountain refuge at approximately 5,000 meters (16,400 ft), weather and conditions permitting.\n\nContinue toward Cuenca, with a fascinating stop at Ingapirca, Ecuador’s most important Inca archaeological complex.',
          es: 'Ascenso a la Reserva Chimborazo (6,310 m), la montaña más alta del Ecuador y el punto más cercano al Sol. Caminata hacia el refugio a 5,000 m. Continuación a Ingapirca, el complejo arqueológico inca más importante del país, y llegada a Cuenca.'
        },
        accommodation: { en: 'Cuenca', es: 'Cuenca' },
        activity: { en: '8-hour guided tour', es: 'Tour guiado de 8 horas' },
        transportation: { en: 'Private vehicle (4x4 or tourist bus)', es: 'Vehículo privado' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 6,
        title: { en: 'DAY 6 – CUENCA CITY TOUR', es: 'DÍA 6 – CITY TOUR EN CUENCA' },
        description: {
          en: 'Discover Cuenca, another UNESCO World Heritage Site and one of Ecuador’s most beautiful cities, famous for its charming streets, historic buildings, plazas and churches.\n\nVisit: Cuenca Cathedral, Plaza de las Flores, a traditional toquilla straw hat workshop (Panama hats), El Barranco along the Tomebamba River, and modern Cuenca. Finish the tour at El Turi Viewpoint, offering panoramic views over the city.\n\nThe remainder of the afternoon is free for you to explore Cuenca at your own pace.',
          es: 'City tour en Cuenca (Patrimonio UNESCO): Catedral Nueva, Plaza de las Flores, fábrica de sombreros de paja toquilla, El Barranco del Río Tomebamba y Mirador de Turi. Tarde libre.'
        },
        accommodation: { en: 'Cuenca', es: 'Cuenca' },
        activity: { en: '3-hour guided tour', es: 'Tour guiado de 3 horas' },
        transportation: { en: 'Private vehicle (4x4 or tourist bus)', es: 'Vehículo privado' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 7,
        title: { en: 'DAY 7 – CUENCA – CAJAS NATIONAL PARK – GUAYAQUIL', es: 'DÍA 7 – CUENCA – PARQUE NACIONAL CAJAS – GUAYAQUIL' },
        description: {
          en: 'Depart Cuenca and travel west through the spectacular Cajas National Park, famous for its rugged Andean landscapes and approximately 200 natural lakes and lagoons.\n\nDepending on weather and trail conditions, enjoy a hike around Laguna Toreadora, while observing the distinctive flora and fauna of Ecuador’s high-altitude páramo ecosystem.\n\nFrom the high Andes, the road then descends dramatically toward sea level, arriving in Guayaquil, Ecuador’s largest port city and economic capital.',
          es: 'Cruce del Parque Nacional Cajas con más de 200 lagunas glaciares. Caminata alrededor de la Laguna Toreadora y descenso panorámico desde los Andes hasta la ciudad costera de Guayaquil.'
        },
        accommodation: { en: 'Guayaquil', es: 'Guayaquil' },
        activity: { en: '6-hour guided tour, including 2h hike (up to 3,500m)', es: 'Tour guiado de 6h con caminata de 2h' },
        transportation: { en: 'Private vehicle (4x4 or tourist bus)', es: 'Vehículo privado' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 8,
        title: { en: 'DAY 8 – DEPARTURE FROM GUAYAQUIL', es: 'DÍA 8 – SALIDA DESDE GUAYAQUIL' },
        description: {
          en: 'Private transfer to José Joaquín de Olmedo International Airport in Guayaquil for your onward flight or connection to the Galápagos Islands.\n\nEnd of the Ecuador Fantastic journey.',
          es: 'Traslado privado al Aeropuerto Internacional José Joaquín de Olmedo en Guayaquil para su vuelo internacional o conexión a Galápagos. Fin del viaje.'
        },
        transportation: { en: 'Private airport transfer', es: 'Traslado privado al aeropuerto' }
      }
    ]
  },

  // Tour 9: Ecuador & Galapagos 12 Days
  {
    id: 'ecuador-galapagos-12days',
    title: { 
      en: 'ECUADOR & GALÁPAGOS ISLANDS – 12 DAYS / 11 NIGHTS', 
      es: 'ECUADOR E ISLAS GALÁPAGOS – 12 DÍAS / 11 NOCHES', 
      fr: 'ÉQUATEUR ET ÎLES GALAPAGOS – 12 JOURS / 11 NUITS', 
      de: 'ECUADOR & GALAPAGOS-INSELN – 12 TAGE / 11 NÄCHTE', 
      it: 'ECUADOR E ISOLE GALAPAGOS – 12 GIORNI / 11 NOTTI', 
      pt: 'EQUADOR E ILHAS GALÁPAGOS – 12 DIAS / 11 NOITES', 
      ja: 'エクアドル＆ガラパゴス諸島 12日間の旅', 
      zh: '厄瓜多尔与加拉帕戈斯顶级奢华12日游' 
    },
    destination: 'Ecuador & Galapagos',
    duration: { 
      en: '12 DAYS / 11 NIGHTS', 
      es: '12 DÍAS / 11 NOCHES', 
      fr: '12 JOURS / 11 NUITS', 
      de: '12 TAGE / 11 NÄCHTE', 
      it: '12 GIORNI / 11 NOTTI', 
      pt: '12 DIAS / 11 NOITES', 
      ja: '12日間 / 11泊', 
      zh: '12天 / 11晚' 
    },
    durationDays: 12,
    price: 2797,
    price3Star: 2797,
    price4Star: 2950,
    imageUrl: '/images/tours/16-9/quito-colonial-16-9.jpg',
    mobileImage: '/images/tours/9-16/galapagos-tortuga-gigante-9-16.jpg',
    desktopImage: '/images/tours/16-9/galapagos-tortuga-gigante-16-9.jpg',
    gallery: [
      '/images/tours/16-9/quito-colonial-16-9.jpg',
      '/images/tours/16-9/cotopaxi-volcano-16-9.jpg',
      '/images/tours/16-9/amazon-river-16-9.jpg',
      '/images/tours/9-16/galapagos-piquero-patas-azules-9-16.jpg',
      '/images/tours/9-16/galapagos-iguana-9-16.jpg',
      '/images/tours/16-9/isabela-island-9-16.jpg',
      '/images/tours/9-16/las-grietas-canyon-9-16.jpg',
      '/images/tours/9-16/santa-fe-island-9-16.jpg'
    ],
    rating: 5,
    reviewsCount: 52,
    isPopular: true,
    category: { 
      en: 'Ultimate Mainland & Galapagos', 
      es: 'Expedición Suprema Continente y Galápagos', 
      fr: "Ultime combiné Équateur et Galapagos", 
      de: 'Ultimative Ecuador & Galapagos Expedition', 
      it: 'Spedizione Suprema Continente e Galapagos', 
      pt: 'Expedição Suprema Equador e Galápagos', 
      ja: 'エクアドル＆ガラパゴス至高の旅', 
      zh: '大陆雨林与海岛巅峰12日游' 
    },
    description: {
      en: '12-day flagship expedition: Quito colonial city & Equator, Papallacta thermal springs, Tena Amazon lodge with motorized canoe & caiman lagoon, Paikawe giant fish reserve, Santa Cruz highlands & giant tortoises, Isabela Island flamingo lagoon & Tintoreras snorkeling, Las Grietas, and full-day yacht cruise to Santa Fe or Pinzón Island.',
      es: 'Expedición insignia de 12 días: Quito colonial y Mitad del Mundo, Termas de Papallacta, lodge en la Amazonía de Tena con canoa motorizada y caimanes, Reserva Paikawe, tierras altas de Santa Cruz, Isla Isabela con flamingos y snorkel en Tintoreras, Las Grietas y crucero en yate a Santa Fe o Pinzón.',
      zh: '12日顶级奢华联合探险，涵盖基多历史名城、赤道线、帕帕亚克塔温泉、特纳亚马逊木屋、派卡韦保护区巨鱼、加拉帕戈斯圣克鲁斯、伊莎贝拉岛、蒂恩托雷拉斯石礁、拉斯格里塔斯及圣菲岛/平松岛全天游艇巡航。'
    },
    highlights: [
      { en: 'Quito UNESCO Historic Center & Equator Line', es: 'Centro Histórico de Quito y Mitad del Mundo', zh: '基多历史中心与赤道纪念碑' },
      { en: 'Papallacta Thermal Hot Springs & Antisana Views', es: 'Termas de Papallacta y Vistas del Antisana', zh: '帕帕亚克塔高山温泉' },
      { en: 'Tena Amazon Lodge, Canoe & Caiman Lagoon', es: 'Lodge en Tena, Canoa y Laguna de Caimanes', zh: '特纳亚马逊雨林木屋与木舟' },
      { en: 'Paikawe Amazon Reserve & Giant Fish Lagoon', es: 'Reserva Paikawe y Peces Gigantes del Amazonas', zh: '派卡韦保护区与巨型鱼类泻湖' },
      { en: 'Santa Cruz Highlands & Giant Tortoises', es: 'Tierras Altas de Santa Cruz y Tortugas Gigantes', zh: '圣克鲁斯高地与巨龟保护区' },
      { en: 'Isabela Island, Flamingo Lagoon & Tintoreras', es: 'Isla Isabela, Laguna de Flamingos y Tintoreras', zh: '伊莎贝拉岛与蒂恩托雷拉斯石礁' },
      { en: 'Full-Day Yacht Cruise to Santa Fe or Pinzón Island', es: 'Navegación en Yate a Isla Santa Fe o Pinzón', zh: '圣菲岛或平松岛全天游艇巡航' }
    ],
    inclusions: [
      { en: 'Airport assistance and all private transfers', es: 'Asistencia en aeropuertos y traslados privados' },
      { en: 'Private transportation on mainland and Galápagos transfers', es: 'Transporte privado en continente y traslados en Galápagos' },
      { en: 'Plane Ticket (Quito – Baltra – Quito)', es: 'Boleto aéreo Quito – Baltra – Quito' },
      { en: 'Professional English-speaking guides and Level III Naturalists', es: 'Guías profesionales y Naturalistas Nivel III' },
      { en: '11 nights accommodation (hotels 3* or 4* / Amazon lodge / Galápagos hotels)', es: '11 noches de alojamiento (hoteles 3★ o 4★ / Lodge amazónico / Hoteles Galápagos)' },
      { en: 'Daily breakfast, lunches and dinners as specified', es: 'Desayunos diarios, almuerzos y cenas según itinerario' },
      { en: 'Snorkeling equipment for organized boat excursions', es: 'Equipo de snorkel para excursiones en barco' },
      { en: 'All entrance fees: La Compañía, Intiñan, Papallacta, Paikawe, Galápagos sites', es: 'Todas las entradas según programa' }
    ],
    exclusions: [
      { en: 'Galápagos National Park entrance fee: USD 200.00 foreign / USD 6.00 national', es: 'Entrada al Parque Nacional Galápagos: USD 200.00 extranjeros / USD 6.00 nacionales' },
      { en: 'Transit Control Card (TCT): USD 20.00', es: 'Tarjeta de Control de Tránsito (TCT): USD 20.00' },
      { en: 'Dinners in Galápagos', es: 'Cenas en Galápagos' }
    ],
    itinerary: [
      {
        day: 1,
        title: { en: 'DAY 1 – ARRIVAL IN QUITO | AIRPORT ASSISTANCE & HOTEL TRANSFER', es: 'DÍA 1 – LLEGADA A QUITO | ASISTENCIA EN AEROPUERTO Y TRASLADO' },
        description: {
          en: 'Upon arrival at Mariscal Sucre International Airport in Quito, you will be welcomed by our representative and assisted with your private transfer to the hotel.\n\nThe remainder of the day will be free to rest and acclimatize to the altitude of Quito.',
          es: 'Llegada al Aeropuerto de Quito, bienvenida por nuestro representante y traslado privado al hotel. Tiempo libre para descansar y aclimatarse.'
        },
        accommodation: { en: 'Quito', es: 'Quito' },
        transportation: { en: 'Private transfer', es: 'Traslado privado' },
        meals: { en: 'Not included', es: 'No incluidas' }
      },
      {
        day: 2,
        title: { en: 'DAY 2 – QUITO CITY TOUR & MITAD DEL MUNDO', es: 'DÍA 2 – CITY TOUR EN QUITO Y MITAD DEL MUNDO' },
        description: {
          en: 'After breakfast, we will explore Quito, the capital of Ecuador and one of the country\'s most important cultural destinations. The city was declared a UNESCO World Heritage Site in 1978 and is renowned for its beautifully preserved historic center, colonial architecture and spectacular Andean setting.\n\nOur city tour will include both the modern and historic areas of Quito. In the historic center, we will visit some of the city\'s most important landmarks, including Plaza Grande, where we will see the Metropolitan Cathedral, the Archbishop\'s Palace and the Presidential Palace.\n\nWe will continue to the impressive Church of La Compañía de Jesús, famous for its richly decorated interior covered with gold leaf. We will also visit San Francisco Square and Church, one of the most iconic architectural complexes in Quito.\n\nAfter exploring the historic center, we will continue towards the Equator Monument and Mitad del Mundo. Here, we will visit the Intiñan Museum, where you can learn about indigenous cultures and participate in a variety of fascinating experiments related to the Equator.\n\nYou will have the opportunity to experience the unique sensation of standing at the Equator, where the Northern and Southern Hemispheres meet.',
          es: 'City tour completo por Quito colonial: Plaza Grande, Catedral, Palacio de Carondelet, Iglesia de la Compañía de Jesús y San Francisco. Traslado a la Mitad del Mundo y Museo Intiñan.'
        },
        accommodation: { en: 'Quito', es: 'Quito' },
        activity: { en: '5-hour guided tour', es: 'Tour guiado de 5 horas' },
        transportation: { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 3,
        title: { en: 'DAY 3 – QUITO – PAPALLACTA – TENA | ANDEAN HIGHLANDS & THERMAL SPRINGS', es: 'DÍA 3 – QUITO – PAPALLACTA – TENA | TERMAS Y PÁRAMO ANDINO' },
        description: {
          en: 'After breakfast, we will travel east from Quito towards Papallacta, following a historic route once used by Spanish explorers in the 16th century in their search for gold and cinnamon, eventually leading towards the discovery and exploration of the Amazon region.\n\nAlong the way, we will pass by Guápulo Church and continue through the spectacular Andean mountains, reaching elevations of approximately 4,100 meters / 13,450 feet above sea level.\n\nThe route passes through protected natural areas and offers impressive views of the Andean landscape before descending gradually towards the transition zone between the Andes and the Amazon Basin.\n\nWe will stop at the famous Papallacta Hot Springs, where you can enjoy the thermal pools at different temperatures while admiring the surrounding mountain scenery and, weather permitting, views of Antisana Volcano (5,704 meters / 18,714 feet).\n\nYou may also choose to relax at the spa, enjoy a massage or hydrotherapy treatment, or take a short walk along the surrounding trails.\n\nAfter the visit, we will continue our descent towards the Amazon region and the town of Tena.',
          es: 'Viaje hacia la Amazonía cruzando los Andes a 4,100 m. Parada en las Termas de Papallacta para disfrutar de sus aguas termales frente al Antisana. Descenso al lodge en Tena.'
        },
        accommodation: { en: 'Tena – Lodge', es: 'Tena – Lodge' },
        activity: { en: '6-hour guided tour + 1h nature walk', es: 'Tour guiado de 6h + caminata de 1h' },
        transportation: { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 4,
        title: { en: 'DAY 4 – TENA | AMAZON RAINFOREST EXPERIENCE | WILDLIFE RESCUE CENTER | KICHWA COMMUNITY', es: 'DÍA 4 – TENA | EXPERIENCIA EN SELVA AMAZÓNICA | CENTRO DE RESCATE | COMUNIDAD KICHWA' },
        description: {
          en: 'After breakfast, we will begin our Amazon adventure with a motorized canoe ride along the river, traveling downstream through the lush rainforest.\n\nOur first visit will be to a wildlife rescue and rehabilitation center, where you will learn about native Amazonian species and conservation efforts to protect animals affected by illegal wildlife trafficking and other threats.\n\nWe will then continue into the primary rainforest, where, accompanied by a local native guide, we will take a hike through the jungle. The walk offers an opportunity to discover the incredible biodiversity of the Amazon and learn about the traditional uses of plants and the relationship between local communities and the forest.\n\nWe will also visit a local Kichwa family, where you will have the opportunity to learn about their traditions, customs and culture and gain a deeper understanding of their connection with the Amazon environment.\n\nOur final visit will be to a caiman lagoon, where we will learn about these fascinating reptiles and the aquatic ecosystems of the rainforest.\n\nAfter the excursion, we will return to the lodge.',
          es: 'Canoa motorizada por el río, visita a centro de rescate de animales silvestres, caminata botánica en selva primaria con guía nativo, encuentro cultural con familia Kichwa y laguna de caimanes.'
        },
        accommodation: { en: 'Tena – Lodge', es: 'Tena – Lodge' },
        activity: { en: '6-hour guided tour + 1h motorized canoe ride', es: 'Tour de 6h + canoa motorizada de 1h' },
        transportation: { en: 'Private transportation and motorized canoe', es: 'Transporte privado y canoa motorizada' },
        meals: { en: 'Breakfast, lunch and dinner', es: 'Desayuno, almuerzo y cena' }
      },
      {
        day: 5,
        title: { en: 'DAY 5 – TENA – MISAHUALLÍ | PAIKAWE RESERVE | AMAZON LAGOON | QUITO', es: 'DÍA 5 – TENA – MISAHUALLÍ | RESERVA PAIKAWE | LAGUNA AMAZÓNICA | QUITO' },
        description: {
          en: 'After breakfast, we will visit Paikawe Reserve, a beautiful Amazonian natural area where you will have the opportunity to experience the rainforest from both land and water.\n\nWe will take a walk through primary rainforest, accompanied by a local guide, and learn about the biodiversity and natural environment of the region.\n\nWe will then navigate the lagoon by canoe, where you may have the opportunity to observe some of the giant fish species found in the Amazon, depending on natural conditions and wildlife activity.\n\nAfter the visit, we will begin our return journey to Quito.',
          es: 'Caminata en la selva de la Reserva Paikawe y canoa por la laguna para observar los peces gigantes del Amazonas. Retorno a Quito.'
        },
        accommodation: { en: 'Quito', es: 'Quito' },
        activity: { en: '6-hour guided tour + 1h rainforest hike', es: 'Tour de 6h + caminata de 1h' },
        transportation: { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 6,
        title: { en: 'DAY 6 – QUITO | FREE DAY', es: 'DÍA 6 – QUITO | DÍA LIBRE' },
        description: {
          en: 'Today is free to enjoy Quito at your own pace.\n\nYou may choose to explore the city independently, visit additional museums and cultural attractions, enjoy local cuisine, or simply relax at the hotel.\n\nThis free day also provides an opportunity to rest before continuing your journey to the Galápagos Islands the following day.\n\nOptional excursions and activities can be arranged upon request.',
          es: 'Día libre en Quito para recorrer la ciudad a su ritmo y descansar antes del viaje a Galápagos.'
        },
        accommodation: { en: 'Quito', es: 'Quito' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 7,
        title: { en: 'DAY 7 – QUITO – BALTRA | TWIN CRATERS | PRIMICIAS RANCH | PUERTO AYORA', es: 'DÍA 7 – QUITO – BALTRA | CRÁTERES GEMELOS | RANCHO PRIMICIAS | PUERTO AYORA' },
        description: {
          en: 'After breakfast, transfer to Mariscal Sucre International Airport for your flight to the Galápagos Islands.\n\nUpon arrival at Seymour Airport on Baltra Island, you will be welcomed by our representative and begin your Galápagos adventure.\n\nAfter crossing the Itabaca Channel to Santa Cruz Island, we will continue towards the highlands to visit the famous Twin Craters (Los Gemelos), two impressive volcanic formations surrounded by the lush vegetation of the Santa Cruz highlands.\n\nHere, you will learn about the geological origins of the island and discover the unique Scalesia forest, one of the characteristic ecosystems of the Santa Cruz highlands.\n\nWe will then continue to Primicias Ranch, a private reserve where giant Galápagos tortoises can be observed roaming freely in their natural environment. This is an excellent opportunity to photograph these iconic animals and learn about their importance to the Galápagos ecosystem.\n\nAfter the excursion, we will continue to Puerto Ayora for hotel check-in and the remainder of the day at leisure.',
          es: 'Vuelo a Galápagos (Baltra), bienvenida y cruce del Canal de Itabaca hacia Santa Cruz. Visita a los Cráteres Gemelos en el bosque de Scalesia y Rancho Primicias con tortugas gigantes en libertad. Check-in en Puerto Ayora.'
        },
        accommodation: { en: 'Santa Cruz Island – Puerto Ayora', es: 'Isla Santa Cruz – Puerto Ayora' },
        meals: { en: 'Breakfast', es: 'Desayuno' },
        transportation: { en: 'Private land transportation and airport shuttle', es: 'Transporte privado terrestre y shuttle de aeropuerto' }
      },
      {
        day: 8,
        title: { en: 'DAY 8 – SANTA CRUZ TO ISABELA | FLAMINGO LAGOON | TORTOISE BREEDING CENTER | TINTORERAS', es: 'DÍA 8 – SANTA CRUZ A ISABELA | LAGUNA DE FLAMINGOS | CENTRO DE CRIANZA | TINTORERAS' },
        description: {
          en: 'After breakfast, we will transfer to the pier to board a speedboat to Isabela Island. The crossing takes approximately 2 to 2.5 hours, depending on sea conditions.\n\nUpon arrival in Puerto Villamil, we will begin our exploration of Isabela.\n\nOur first stop will be the Flamingo Lagoon, one of the island\'s most important wetland areas. Here, you may observe Galápagos flamingos feeding and resting in the shallow waters, together with other species of coastal and migratory birds.\n\nWe will then visit the Giant Tortoise Breeding Center, where you will learn about the conservation and breeding programs established to protect Isabela\'s giant tortoise populations.\n\nIn the afternoon, we will take a boat excursion to Tintoreras Islet, a small volcanic islet located just off the coast of Isabela. The area is famous for its crystal-clear waters and rich marine life.\n\nDuring the snorkeling activity, you may have the opportunity to encounter sea lions, sea turtles, rays, colorful tropical fish and Galápagos penguins, depending on sea conditions and wildlife activity.\n\nAfter the excursion, return to Puerto Villamil and enjoy the evening at leisure.',
          es: 'Lancha rápida a Isla Isabela. Visita a la Laguna de Flamingos y al Centro de Crianza de Tortugas Gigantes. Por la tarde, excursión náutica a Tintoreras para snorkel con lobos marinos, tortugas, pingüinos y rayas. Noche en Isabela.'
        },
        accommodation: { en: 'Isabela Island – Puerto Villamil', es: 'Isla Isabela – Puerto Villamil' },
        meals: { en: 'Breakfast', es: 'Desayuno' },
        activity: { en: 'Full-day guided excursion and snorkeling', es: 'Excursión guiada full-day y snorkeling' },
        transportation: { en: 'Shared speedboat and local land transportation', es: 'Lancha rápida compartida y transporte terrestre' }
      },
      {
        day: 9,
        title: { en: 'DAY 9 – ISABELA TO SANTA CRUZ | LA LOBERÍA | LAS GRIETAS', es: 'DÍA 9 – ISABELA A SANTA CRUZ | LA LOBERÍA | LAS GRIETAS' },
        description: {
          en: 'After breakfast, we will return to the pier for the speedboat transfer back to Santa Cruz Island.\n\nUpon arrival in Puerto Ayora, we will continue with a visit to La Lobería, a small coastal area known for its population of Galápagos sea lions. This is an excellent place to observe these playful animals both on the beach and in the water.\n\nWe will then visit Las Grietas, a spectacular natural formation created by volcanic activity. This narrow canyon is filled with clear, turquoise water and is one of the most popular swimming and snorkeling sites near Puerto Ayora.\n\nDuring the snorkeling activity, you will have the opportunity to explore the underwater environment and observe colorful tropical fish and other marine species.\n\nAfter the excursion, return to Puerto Ayora and check in at your hotel. The remainder of the afternoon and evening will be free to relax or explore the town independently.',
          es: 'Lancha de regreso a Santa Cruz. Visita a La Lobería para observar lobos marinos e iguanas, seguida de caminata y natación en las aguas cristalinas de Las Grietas. Tarde libre en Puerto Ayora.'
        },
        accommodation: { en: 'Santa Cruz Island – Puerto Ayora', es: 'Isla Santa Cruz – Puerto Ayora' },
        meals: { en: 'Breakfast', es: 'Desayuno' },
        activity: { en: 'Guided excursion and snorkeling', es: 'Excursión guiada y snorkeling' },
        transportation: { en: 'Speedboat and private/local land transportation', es: 'Lancha rápida y transporte terrestre' }
      },
      {
        day: 10,
        title: { en: 'DAY 10 – FULL-DAY EXCURSION TO SANTA FE OR PINZÓN ISLAND', es: 'DÍA 10 – EXCURSIÓN FULL-DAY A ISLA SANTA FE O ISLA PINZÓN' },
        description: {
          en: 'Today, enjoy a full-day boat excursion to one of the Galápagos\' outstanding snorkeling destinations: Santa Fe Island or Pinzón Island, depending on availability, sea conditions and the selected tour.\n\nSanta Fe Island is known for its beautiful turquoise waters, white sandy beaches and endemic wildlife. During the excursion, you may encounter sea lions, sea turtles, rays, marine iguanas and a variety of tropical fish. The island is also home to the endemic Santa Fe land iguana.\n\nAlternatively, the excursion may take you to Pinzón Island, a spectacular location surrounded by clear waters and abundant marine life. The snorkeling sites around Pinzón are particularly well known for encounters with sea turtles, sea lions, rays, colorful fish and, with some luck, Galápagos penguins.\n\nThe day will include navigation, snorkeling and opportunities to observe wildlife both above and below the water. Lunch will generally be provided during the excursion, depending on the selected tour.\n\nReturn to Puerto Ayora in the afternoon and enjoy your final evening in the Galápagos.',
          es: 'Navegación de día completo en yate hacia Santa Fe o Pinzón con sesiones de snorkel de alta biodiversidad. Almuerzo a bordo incluido. Retorno por la tarde a Puerto Ayora.'
        },
        accommodation: { en: 'Santa Cruz Island – Puerto Ayora', es: 'Isla Santa Cruz – Puerto Ayora' },
        meals: { en: 'Breakfast and lunch', es: 'Desayuno y almuerzo' },
        activity: { en: 'Full-day boat excursion and snorkeling', es: 'Excursión en barco full-day y snorkel' }
      },
      {
        day: 11,
        title: { en: 'DAY 11 – SANTA CRUZ – BALTRA AIRPORT | DEPARTURE', es: 'DÍA 11 – SANTA CRUZ – AEROPUERTO DE BALTRA | SALIDA' },
        description: {
          en: 'After breakfast, check out from the hotel and begin the transfer from Puerto Ayora to Baltra Airport.\n\nThe journey includes transportation across Santa Cruz Island and the crossing of the Itabaca Channel, followed by the airport shuttle to Seymour Airport (Baltra).\n\nUpon arrival at the airport, assistance will be provided for your departure flight, marking the end of your Ecuador and Galápagos Islands experience.',
          es: 'Traslado al Aeropuerto de Baltra y vuelo de retorno a Quito. Recepción y traslado al hotel en Quito.'
        },
        accommodation: { en: 'Quito', es: 'Quito' },
        meals: { en: 'Breakfast', es: 'Desayuno' },
        transportation: { en: 'Private land transportation and airport shuttle', es: 'Transporte privado y shuttle de aeropuerto' }
      },
      {
        day: 12,
        title: { en: 'DAY 12 – QUITO | INTERNATIONAL DEPARTURE', es: 'DÍA 12 – QUITO | SALIDA INTERNACIONAL' },
        description: {
          en: 'After breakfast, check out from the hotel and meet your private driver for your transfer to Mariscal Sucre International Airport.\n\nAssistance will be provided for your departure flight and international connections.\n\nThis marks the end of your Ecuador and Galápagos Islands experience.',
          es: 'Desayuno y traslado privado al Aeropuerto Mariscal Sucre de Quito para abordar su vuelo internacional. Fin de los servicios.'
        },
        meals: { en: 'Breakfast', es: 'Desayuno' },
        transportation: { en: 'Private airport transfer', es: 'Traslado privado al aeropuerto' }
      }
    ]
  },

  // Tour 10: Ecuador & Galapagos 11 Days
  {
    id: 'ecuador-galapagos-11days',
    title: { 
      en: 'ECUADOR & GALÁPAGOS ISLANDS – 11 DAYS / 10 NIGHTS', 
      es: 'ECUADOR E ISLAS GALÁPAGOS – 11 DÍAS / 10 NOCHES', 
      fr: 'ÉQUATEUR ET ÎLES GALAPAGOS – 11 JOURS / 10 NUITS', 
      de: 'ECUADOR & GALAPAGOS-INSELN – 11 TAGE / 10 NÄCHTE', 
      it: 'ECUADOR E ISOLE GALAPAGOS – 11 GIORNI / 10 NOTTI', 
      pt: 'EQUADOR E ILHAS GALÁPAGOS – 11 DIAS / 10 NOITES', 
      ja: 'エクアドル＆ガラパゴス諸島 11日間の旅', 
      zh: '厄瓜多尔与加拉帕戈斯经典全景11日游' 
    },
    destination: 'Ecuador & Galapagos',
    duration: { 
      en: '11 DAYS / 10 NIGHTS', 
      es: '11 DÍAS / 10 NOCHES', 
      fr: '11 JOURS / 10 NUITS', 
      de: '11 TAGE / 10 NÄCHTE', 
      it: '11 GIORNI / 10 NOTTI', 
      pt: '11 DIAS / 10 NOITES', 
      ja: '11日間 / 10泊', 
      zh: '11天 / 10晚' 
    },
    durationDays: 11,
    price: 2437,
    price3Star: 2437,
    price4Star: 2599,
    imageUrl: '/images/tours/16-9/mitad-del-mundo-16-9.jpg',
    mobileImage: '/images/tours/9-16/galapagos-flamingos-9-16.jpg',
    desktopImage: '/images/tours/16-9/galapagos-flamingos-16-9.jpg',
    gallery: [
      '/images/tours/16-9/quito-colonial-16-9.jpg',
      '/images/tours/16-9/cotopaxi-volcano-16-9.jpg',
      '/images/tours/16-9/pailon-del-diablo-16-9.jpg',
      '/images/tours/16-9/amazon-river-16-9.jpg',
      '/images/tours/9-16/galapagos-lobos-de-mar-9-16.jpg',
      '/images/tours/9-16/galapagos-flamingos-9-16.jpg',
      '/images/tours/9-16/las-grietas-canyon-9-16.jpg',
      '/images/tours/9-16/tijeretas-hill-9-16.jpg'
    ],
    rating: 5,
    reviewsCount: 32,
    isPopular: true,
    category: { 
      en: 'Classic Mainland & Galapagos', 
      es: 'Clásico Continente y Galápagos', 
      fr: 'Classique Équateur et Galapagos', 
      de: 'Klassisches Ecuador & Galapagos', 
      it: 'Classico Ecuador e Galapagos', 
      pt: 'Clássico Equador e Galápagos', 
      ja: 'エクアドル＆ガラパゴス周遊', 
      zh: '海陆经典联合全景游' 
    },
    description: {
      en: '11-day master journey connecting mainland Ecuador (Quito, Avenue of Volcanoes, Baños Pailón del Diablo, Puyo Amazon rainforest, Quilotoa crater lake) with Galápagos Islands (Santa Cruz highlands, giant tortoises, Isabela full-day with Tintoreras & flamingos, La Lobería and Las Grietas canyon).',
      es: 'Travesía maestra de 11 días uniendo Ecuador continental (Quito, Avenida de los Volcanes, Baños Pailón del Diablo, selva amazónica de Puyo, cráter de Quilotoa) con las Islas Galápagos (tierras altas de Santa Cruz, tortugas gigantes, Isabela con Tintoreras y flamingos, La Lobería y Las Grietas).',
      zh: '11日经典联合行程，将厄瓜多尔大陆（基多、巴尼奥斯恶魔之咽、普约亚马逊、基洛托阿）与加拉帕戈斯群岛（圣克鲁斯、伊莎贝拉、蒂恩托雷拉斯、拉斯格里塔斯）完美融合。'
    },
    highlights: [
      { en: 'Avenue of the Volcanoes & Baños Pailón del Diablo', es: 'Avenida de los Volcanes y Baños Pailón del Diablo', zh: '火山大道与巴尼奥斯恶魔之咽' },
      { en: 'Puyo Amazon Rainforest & Kichwa Community', es: 'Selva Amazónica de Puyo y Comunidad Kichwa', zh: '普约亚马逊雨林与奇瓦社区' },
      { en: 'Quilotoa Emerald Volcanic Crater Lake', es: 'Laguna del Cráter de Quilotoa', zh: '基洛托阿翡翠火山湖' },
      { en: 'Santa Cruz Highlands & Giant Tortoises', es: 'Tierras Altas de Santa Cruz y Tortugas Gigantes', zh: '圣克鲁斯高地与巨龟保护区' },
      { en: 'Isabela Island, Flamingo Lagoon & Tintoreras', es: 'Isla Isabela, Laguna de Flamingos y Tintoreras', zh: '伊莎贝拉岛、火烈鸟与蒂恩托雷拉斯' },
      { en: 'Las Grietas Crystal-Clear Volcanic Chasm', es: 'Cañón Volcánico de Las Grietas', zh: '拉斯格里塔斯火山峡谷潜水' }
    ],
    inclusions: [
      { en: 'Airport assistance and private transfers', es: 'Asistencia en aeropuerto y traslados privados' },
      { en: 'Private transportation throughout mainland Ecuador', es: 'Transporte privado en Ecuador continental' },
      { en: 'Plane Ticket (Quito – Baltra – Quito)', es: 'Boleto aéreo Quito – Baltra – Quito' },
      { en: 'Professional English-speaking guides and Level III Naturalists', es: 'Guías profesionales bilingües y Naturalistas Nivel III' },
      { en: '10 nights accommodation (3* or 4* hotels in mainland & Galápagos)', es: '10 noches de alojamiento (hoteles 3★ o 4★ en continente y Galápagos)' },
      { en: 'Daily breakfast, plus specified lunches in Puyo and Isabela', es: 'Desayunos diarios, y almuerzos incluidos en Puyo e Isabela' },
      { en: 'Entrances: Pailón del Diablo, Yanacocha, Hola Vida, Quilotoa, Galápagos sites', es: 'Todas las entradas según itinerario' }
    ],
    exclusions: [
      { en: 'Galápagos National Park entrance fee: USD 200.00 foreign / USD 6.00 national', es: 'Entrada al Parque Nacional Galápagos: USD 200.00 extranjeros / USD 6.00 nacionales' },
      { en: 'Transit Control Card (TCT): USD 20.00', es: 'Tarjeta de Control de Tránsito (TCT): USD 20.00' },
      { en: 'Dinners in Galápagos and mainland (unless specified)', es: 'Cenas' }
    ],
    itinerary: [
      {
        day: 1,
        title: { en: 'DAY 1 – ARRIVAL IN QUITO | AIRPORT ASSISTANCE & HOTEL TRANSFER', es: 'DÍA 1 – LLEGADA A QUITO | ASISTENCIA EN AEROPUERTO Y TRASLADO' },
        description: {
          en: 'Upon arrival at Mariscal Sucre International Airport in Quito, you will be welcomed by our representative and assisted with your private transfer to the hotel.\n\nThis program can begin on any day of the week, depending on your travel arrangements.\n\nThe remainder of the day will be free to rest and acclimatize to the altitude of Quito.',
          es: 'Llegada al Aeropuerto Mariscal Sucre de Quito, recepción y traslado privado al hotel. Tiempo libre para descansar y aclimatarse.'
        },
        accommodation: { en: 'Quito', es: 'Quito' },
        transportation: { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado (vehículos 4x4 o buses turísticos)' },
        meals: { en: 'Not included', es: 'No incluidas' }
      },
      {
        day: 2,
        title: { en: 'DAY 2 – QUITO – BAÑOS | AVENUE OF THE VOLCANOES | PAILÓN DEL DIABLO WATERFALL', es: 'DÍA 2 – QUITO – BAÑOS | AVENIDA DE LOS VOLCANES | CASCADA PAILÓN DEL DIABLO' },
        description: {
          en: 'After breakfast, we will travel south along the Pan-American Highway, following the famous Avenue of the Volcanoes, one of the most spectacular landscapes in the Ecuadorian Andes.\n\nThe route takes us through a region surrounded by numerous volcanic peaks before continuing towards Baños de Agua Santa, a charming tourist town located at the foothills of the active Tungurahua Volcano.\n\nBaños is surrounded by dramatic mountain scenery, waterfalls and lush vegetation, offering a wide variety of adventure activities such as cycling, rafting, hiking, tarabita cable-car rides and horseback riding.\n\nDuring today\'s excursion, we will visit the spectacular Pailón del Diablo Waterfall, one of Ecuador\'s most impressive waterfalls. We will follow the trails through the lush vegetation and enjoy different viewpoints of the waterfall.\n\nBaños is located in a unique geographical setting between the Andes and the Amazon region, creating an extraordinary combination of ecosystems and landscapes.\n\nAfter the visit, we will continue to the hotel in Baños.',
          es: 'Viaje hacia el sur por la Panamericana a través de la Avenida de los Volcanes hacia Baños de Agua Santa, al pie del volcán Tungurahua. Excursión y caminata a la cascada Pailón del Diablo. Noche en Baños.'
        },
        accommodation: { en: 'Baños', es: 'Baños' },
        activity: { en: '8-hour guided tour', es: 'Tour guiado de 8 horas' },
        transportation: { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 3,
        title: { en: 'DAY 3 – BAÑOS – AMAZON RAINFOREST | PUYO | YANACOCHA BIOPARK | HOLA VIDA WATERFALL | KICHWA COMMUNITY', es: 'DÍA 3 – BAÑOS – SELVA AMAZÓNICA | PUYO | BIOPARQUE YANACOCHA | CASCADA HOLA VIDA | COMUNIDAD KICHWA' },
        description: {
          en: 'After breakfast, we will head east towards the Amazon Rainforest, traveling through the spectacular Pastaza River Canyon on our way to the city of Puyo, one of the gateways to Ecuador\'s Amazon region.\n\nOur first stop will be Yanacocha Biopark, where you will learn about and observe native animal species that have been rescued from illegal wildlife trafficking. The biopark is dedicated to wildlife conservation and environmental education.\n\nWe will then continue into the Amazon rainforest for a guided hike through the lush vegetation to Hola Vida Waterfall. The approximately two-hour hike offers an opportunity to experience the extraordinary biodiversity of the rainforest and enjoy its natural surroundings.\n\nLater, we will visit a local Kichwa family, where you will have the opportunity to learn about their traditions, customs and way of life. This cultural encounter provides an authentic insight into the relationship between the local community and the Amazon rainforest.\n\nWe will then begin our return journey to Baños.',
          es: 'Viaje por el cañón del Pastaza hacia la selva de Puyo. Visita al Bioparque Yanacocha, caminata de 2h a la cascada Hola Vida y encuentro cultural con una familia Kichwa. Retorno a Baños.'
        },
        accommodation: { en: 'Baños', es: 'Baños' },
        activity: { en: '6-hour guided tour + 2-hour rainforest hike', es: 'Tour de 6h + caminata en selva de 2h' },
        transportation: { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado' },
        meals: { en: 'Breakfast and lunch', es: 'Desayuno y almuerzo' }
      },
      {
        day: 4,
        title: { en: 'DAY 4 – BAÑOS – QUILOTOA – QUITO | QUILOTOA CRATER LAKE | TIGUA', es: 'DÍA 4 – BAÑOS – QUILOTOA – QUITO | LAGUNA DE QUILOTOA | TIGUA' },
        description: {
          en: 'After breakfast, we will begin our journey towards Quito, traveling through some of the most spectacular landscapes of the Ecuadorian Andes.\n\nOur main stop will be Quilotoa Crater Lake, one of Ecuador\'s most iconic natural attractions. The lake lies inside the crater of an ancient volcano and is famous for its striking turquoise-green waters surrounded by dramatic Andean landscapes.\n\nDuring the visit, you will have the opportunity to enjoy a two-hour hike towards the bottom of the crater. The descent provides spectacular views of the lake and surrounding mountains. Please note that the return hike is more demanding due to the steep terrain and altitude.\n\nAlong the way, we may also stop at the traditional village of Tigua, famous for its colorful paintings depicting Andean culture and everyday life. Depending on local availability, we may also visit a traditional guinea pig farm and learn about this important element of Andean rural life.\n\nWe will then continue to Quito.',
          es: 'Viaje al Cráter Volcánico de Quilotoa con caminata de 2h hacia la laguna verde esmeralda. Parada en el pueblo de pintores de Tigua y continuación hacia Quito.'
        },
        accommodation: { en: 'Quito', es: 'Quito' },
        activity: { en: '6-hour guided tour + 2-hour hike (3,500 m / 11,500 ft)', es: 'Tour de 6h + caminata de 2h (3,500 m)' },
        transportation: { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 5,
        title: { en: 'DAY 5 – QUITO | FREE DAY', es: 'DÍA 5 – QUITO | DÍA LIBRE' },
        description: {
          en: 'Today is free to enjoy Quito at your own pace.\n\nYou may choose to explore the city\'s historic center, visit museums and cultural attractions, discover local cuisine, or simply relax at the hotel.\n\nOptional excursions and activities can be arranged upon request.\n\nThis free day also provides an opportunity to rest before continuing your journey to the Galápagos Islands the following day.',
          es: 'Día libre en Quito para explorar sus tesoros históricos, gastronomía o descansar antes del vuelo a Galápagos.'
        },
        accommodation: { en: 'Quito', es: 'Quito' },
        meals: { en: 'Breakfast', es: 'Desayuno' },
        transportation: { en: 'Not included unless specified', es: 'No incluido' }
      },
      {
        day: 6,
        title: { en: 'DAY 6 – QUITO – BALTRA | TWIN CRATERS | PRIMICIAS RANCH | PUERTO AYORA', es: 'DÍA 6 – QUITO – BALTRA | CRÁTERES GEMELOS | RANCHO PRIMICIAS | PUERTO AYORA' },
        description: {
          en: 'After breakfast, transfer to Mariscal Sucre International Airport for your flight to the Galápagos Islands.\n\nUpon arrival at Seymour Airport on Baltra Island, you will be welcomed by our representative and begin your Galápagos adventure.\n\nAfter crossing the Itabaca Channel to Santa Cruz Island, we will travel to the highlands to visit the famous Twin Craters (Los Gemelos). These impressive volcanic formations are surrounded by lush Scalesia forest and offer an excellent introduction to the unique geological landscape of Santa Cruz Island.\n\nWe will then continue to Primicias Ranch, a private reserve where giant Galápagos tortoises can be observed roaming freely in their natural environment. During the visit, you will learn about these iconic animals and their importance to the Galápagos ecosystem.\n\nAfter the excursion, we will continue to Puerto Ayora for hotel check-in and the remainder of the day at leisure.',
          es: 'Vuelo a Baltra, bienvenida y cruce a Santa Cruz. Visita a los Cráteres Gemelos en el bosque de Scalesia y Rancho Primicias con tortugas gigantes en libertad. Check-in en Puerto Ayora.'
        },
        accommodation: { en: 'Santa Cruz Island – Puerto Ayora', es: 'Isla Santa Cruz – Puerto Ayora' },
        meals: { en: 'Breakfast', es: 'Desayuno' },
        transportation: { en: 'Private land transportation and airport shuttle', es: 'Transporte privado terrestre y shuttle de aeropuerto' }
      },
      {
        day: 7,
        title: { en: 'DAY 7 – FULL-DAY EXCURSION TO ISABELA ISLAND | TORTOISE BREEDING CENTER | FLAMINGO LAGOON | TINTORERAS', es: 'DÍA 7 – EXCURSIÓN FULL-DAY A ISLA ISABELA | CENTRO DE CRIANZA | LAGUNA DE FLAMINGOS | TINTORERAS' },
        description: {
          en: 'After breakfast, transfer to the pier to board a speedboat to Isabela Island. The navigation takes approximately 2 to 2.5 hours, depending on sea conditions.\n\nUpon arrival in Puerto Villamil, we will visit the Giant Tortoise Breeding Center, where you will learn about the conservation and breeding programs established to protect Isabela\'s giant tortoise populations.\n\nWe will then visit the Flamingo Lagoon, one of the island\'s most important wetlands. Depending on natural conditions, you may observe Galápagos flamingos and other bird species in their natural habitat.\n\nThe excursion will continue with a boat trip to Tintoreras Islet, a small volcanic islet located just off the coast of Isabela. Its clear waters and rich marine environment make it an excellent snorkeling destination.\n\nDuring the snorkeling activity, you may have the opportunity to observe sea lions, sea turtles, rays, penguins and colorful tropical fish, depending on wildlife activity and sea conditions.\n\nAfter the excursion, we will return by speedboat to Santa Cruz Island and Puerto Ayora.',
          es: 'Lancha rápida a Isabela. Visita al Centro de Crianza y Laguna de Flamingos. Excursión náutica al Islote Tintoreras con snorkeling (lobos marinos, tortugas, pingüinos, rayas y peces). Retorno a Santa Cruz.'
        },
        accommodation: { en: 'Santa Cruz Island – Puerto Ayora', es: 'Isla Santa Cruz – Puerto Ayora' },
        meals: { en: 'Breakfast and lunch', es: 'Desayuno y almuerzo' },
        activity: { en: 'Full-day guided excursion and snorkeling', es: 'Excursión guiada full-day y snorkeling' },
        transportation: { en: 'Shared speedboat and private land transportation', es: 'Lancha rápida y transporte privado' }
      },
      {
        day: 8,
        title: { en: 'DAY 8 – LA LOBERÍA | PUNTA ESTRADA | LAS GRIETAS', es: 'DÍA 8 – LA LOBERÍA | PUNTA ESTRADA | LAS GRIETAS' },
        description: {
          en: 'After breakfast, we will begin the day\'s activities with a visit to La Lobería, a coastal area famous for its resident population of Galápagos sea lions. Here, you will have the opportunity to observe these playful animals in their natural environment.\n\nWe will then continue to Punta Estrada, a beautiful coastal area surrounded by rocky formations and clear waters. The area offers excellent opportunities for nature observation and marine activities.\n\nThe excursion will continue to Las Grietas, a spectacular natural formation consisting of a narrow volcanic canyon filled with crystal-clear turquoise water. This is one of the most popular snorkeling and swimming sites near Puerto Ayora.\n\nDuring the snorkeling activity, you can explore the underwater environment and observe a variety of colorful fish and marine life.\n\nAfter the visit, return to Puerto Ayora and enjoy the remainder of the day at leisure.',
          es: 'Visita a La Lobería con lobos marinos, Punta Estrada y natación/snorkel en el cañón volcánico de Las Grietas. Tarde libre en Puerto Ayora.'
        },
        accommodation: { en: 'Santa Cruz Island – Puerto Ayora', es: 'Isla Santa Cruz – Puerto Ayora' },
        meals: { en: 'Breakfast', es: 'Desayuno' },
        activity: { en: 'Guided excursion and snorkeling', es: 'Excursión guiada y snorkel' }
      },
      {
        day: 9,
        title: { en: 'DAY 9 – SANTA CRUZ | FREE DAY', es: 'DÍA 9 – SANTA CRUZ | DÍA LIBRE' },
        description: {
          en: 'After breakfast, enjoy a free day in Santa Cruz Island.\n\nThis day can be used to relax at the hotel, explore Puerto Ayora independently, visit local shops and restaurants, or simply enjoy the island at your own pace.\n\nOptional excursions and activities can be arranged upon request, depending on availability and local conditions.',
          es: 'Día libre en Santa Cruz para disfrutar de Puerto Ayora, Playa Tortuga Bay o tours opcionales.'
        },
        accommodation: { en: 'Santa Cruz Island – Puerto Ayora', es: 'Isla Santa Cruz – Puerto Ayora' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 10,
        title: { en: 'DAY 10 – BALTRA AIRPORT | DEPARTURE', es: 'DÍA 10 – TRASLADO AL AEROPUERTO DE BALTRA | VUELO A QUITO' },
        description: {
          en: 'After breakfast, check out from the hotel and begin the transfer from Puerto Ayora to Baltra Airport.\n\nThe journey includes transportation across Santa Cruz Island and the crossing of the Itabaca Channel, followed by the airport shuttle to Seymour Airport.\n\nUpon arrival at the airport, assistance will be provided for your departure flight, marking the end of your Ecuador and Galápagos Islands experience.',
          es: 'Traslado al Aeropuerto Seymour de Baltra y vuelo de retorno a Quito. Recepción y traslado al hotel.'
        },
        accommodation: { en: 'Quito', es: 'Quito' },
        meals: { en: 'Breakfast', es: 'Desayuno' },
        transportation: { en: 'Private land transportation and airport shuttle', es: 'Transporte privado y shuttle de aeropuerto' }
      },
      {
        day: 11,
        title: { en: 'DAY 11 – QUITO | INTERNATIONAL DEPARTURE', es: 'DÍA 11 – QUITO | SALIDA INTERNACIONAL' },
        description: {
          en: 'After breakfast, check out from the hotel and meet your private driver for your transfer to Mariscal Sucre International Airport.\n\nAssistance will be provided for your departure flight and international connections.\n\nThis marks the end of your Ecuador and Galápagos Islands experience.',
          es: 'Desayuno y traslado privado al Aeropuerto Mariscal Sucre de Quito para abordar su vuelo internacional de retorno. Fin de los servicios.'
        },
        meals: { en: 'Breakfast', es: 'Desayuno' },
        transportation: { en: 'Private airport transfer', es: 'Traslado privado al aeropuerto' }
      }
    ]
  }
];

export const mockTours: Tour[] = [...multiDayTours, ...dailyTours];

export const mockDestinations: Destination[] = [
  {
    id: 'ecuador',
    name: { en: 'Mainland Ecuador', es: 'Ecuador Continental', fr: 'Équateur Continental', de: 'Festland Ecuador', it: 'Ecuador Continentale', pt: 'Equador Continental', ja: 'エクアドル本土', zh: '厄瓜多尔大陆' },
    subtitle: { en: 'Andes, Volcanoes & Amazon Rainforest', es: 'Andes, Volcanes y Selva Amazónica', fr: 'Andes, volcans et jungle amazonienne', de: 'Anden, Vulkane & Amazonas-Regenwald', it: 'Ande, Vulcani e Foresta Amazzonica', pt: 'Andes, Vulcões e Floresta Amazônica', ja: 'アンデス、火山、アマゾン熱帯雨林', zh: '安第斯高原、壮丽火山与亚马逊雨林' },
    description: {
      en: 'Explore the Avenue of the Volcanoes, historic Quito, Baños waterfalls, Amazon jungle lodges and ancient Inca heritage.',
      es: 'Atraviesa la Avenida de los Volcanes, explora lodges en la selva profunda y maravíllate con la arquitectura colonial.',
      zh: '探索火山大道、基多古城、巴尼奥斯瀑布、亚马逊丛林木屋与印加遗址。'
    },
    imageUrl: '/images/tours/16-9/cuenca-colonial-16-9.jpg',
    toursCount: 5,
    slug: 'ecuador'
  },
  {
    id: 'galapagos',
    name: { en: 'Galápagos Islands', es: 'Islas Galápagos', fr: 'Îles Galápagos', de: 'Galapagos-Inseln', it: 'Isole Galapagos', pt: 'Ilhas Galápagos', ja: 'ガラパゴス諸島', zh: '加拉帕戈斯群岛' },
    subtitle: { en: 'The Enchanted Archipelago & Cruises', es: 'El Archipiélago Encantado', fr: 'L\'archipel enchanté et croisières', de: 'Das verzauberte Archipel & Kreuzfahrten', it: 'L\'Arcipelago Incantato e Crociere', pt: 'O Arquipélago Encantado e Cruzeiros', ja: '魅惑の諸島とネイチャークルーズ', zh: '魔幻群岛与尊享生态巡游' },
    description: {
      en: 'Cruises and island-hopping tours to witness wildlife and pristine waters found nowhere else on Earth.',
      es: 'Cruceros privados curados y excursiones de isla en isla para presenciar vida silvestre que no se encuentra en ningún otro lugar.',
      zh: '邂逅地球上独一无二的野生动物，与海狮、海鬣蜥、巨龟和企鹅一同浮潜。'
    },
    imageUrl: '/images/tours/16-9/galapagos-tortuga-gigante-16-9.jpg',
    toursCount: 3,
    slug: 'galapagos'
  },
  /* PERU_DISABLED: Combined Journeys destination temporarily disabled.
     Re-enable by removing these comment delimiters when Peru tours are ready.
  {
    id: 'combined',
    name: { en: 'Combined Journeys', es: 'Viajes Combinados', fr: 'Voyages Combinés', de: 'Kombinierte Reisen', it: 'Viaggi Combinati', pt: 'Viagens Combinadas', ja: 'コンビネーションツアー', zh: '全景组合探索' },
    subtitle: { en: 'Mainland Ecuador + Galápagos Islands', es: 'Ecuador Continental + Islas Galápagos', fr: 'Équateur Continental + Îles Galápagos', de: 'Festland Ecuador + Galapagos-Inseln', it: 'Ecuador Continentale + Isole Galapagos', pt: 'Equador Continental + Ilhas Galápagos', ja: 'エクアドル本土 ＋ ガラパゴス諸島', zh: '厄瓜多尔大陆 ＋ 加拉帕戈斯群岛' },
    description: {
      en: 'The ultimate South American master journeys linking volcanic Andean trails, Amazon wonders and the pristine Galápagos islands.',
      es: 'Grandes travesías integrales que unen lo mejor de los Andes, la Amazonía y los cruceros en las Islas Galápagos en un solo viaje.',
      zh: '精选全景路线，将安第斯山脉、亚马逊雨林与加拉帕戈斯群岛的奇迹完美融为一体。'
    },
    imageUrl: '/images/tours/16-9/cotopaxi-volcano-16-9.jpg',
    toursCount: 2,
    slug: 'combined'
  },
  */
  {
    id: 'full-day',
    name: { en: 'Day Excursions', es: 'Excursiones Full Day', fr: 'Excursions Full Day', de: 'Full-Day Tagesausflüge', it: 'Escursioni Full Day', pt: 'Passeios Full Day', ja: '日帰りツアー (Full Day)', zh: '单日全景游 (Full Day)' },
    subtitle: { en: '1-Day Tours in Galapagos & Mainland', es: 'Tours de 1 Día en Galápagos y Continente', fr: 'Tours d\'une journée aux Galápagos et Continent', de: '1-Tages-Touren in Galapagos und Festland', it: 'Tour di 1 Giorno a Galapagos e Continente', pt: 'Tours de 1 Dia em Galápagos e Continente', ja: 'ガラパゴス＆本土 1日ツアー', zh: '加拉帕戈斯与大陆 1日精选游' },
    description: {
      en: 'Immersive 1-day adventures: volcanic craters, snorkel reefs, cloud forests, thermal springs and indigenous markets.',
      es: 'Aventuras inmersivas de 1 día a cráteres volcánicos, arrecifes de snorkel, bosque nuboso, termas y mercados indígenas.',
      zh: '全日游精选：赤道线、奥塔瓦洛集市、帕帕亚克塔温泉、明多云雾森林、科托帕希与基洛托阿。'
    },
    imageUrl: '/images/tours/16-9/quito-iglesia-de-san-francisco-16-9.jpg',
    toursCount: 7,
    slug: 'full-day'
  }
];

export const mockReviews: Review[] = [
  {
    id: 'rev-1',
    author: 'Dylan A',
    location: 'United States',
    rating: 5,
    date: '2026-04-10',
    tourTitle: 'The Avenue of the Volcanoes & Galapagos',
    title: 'A trip of a lifetime',
    comment: 'Truly a magical trip that I will never forget. From hiking in The Avenue of the Volcanos to snorkeling with sea lions and turtles in the Galapagos you truly will never have a dull moment on this trip. Our tour guide Jhayro was truly the best guide. Went above and beyond to make sure everyone was taken care of and provided many additional activities for us on the tour.',
    verifiedTripAdvisor: true
  },
  {
    id: 'rev-2',
    author: 'Guadalupe L',
    location: 'United States',
    rating: 5,
    date: '2026-04-08',
    tourTitle: 'Ecuador & Galapagos Master Tour',
    title: 'Book it!',
    comment: 'This tour was amazing. Very detailed, organized and so fun. I can’t recommend it enough. Jhayro was an incredible and knowledgeable guide.',
    verifiedTripAdvisor: true
  },
  {
    id: 'rev-3',
    author: 'Alana F',
    location: 'United States',
    rating: 5,
    date: '2026-04-08',
    tourTitle: 'Ecuador and the Galapagos',
    title: 'The best trip!',
    comment: 'This was the best trip! Our tour guide, Vermilion Jhayro was extremely knowledgeable and showed us the best of Ecuador. His kind, caring, and friendly personality made the trip unforgettable. I highly recommend taking this trip with him as your guide!',
    verifiedTripAdvisor: true
  },
  {
    id: 'rev-4',
    author: 'Nicole H',
    location: 'United States',
    rating: 5,
    date: '2026-04-04',
    tourTitle: '11-Day Ecuador Flagship Expedition',
    title: 'Hola vida!',
    comment: 'My time with Jhayro was truly excellent, I couldn’t have asked for a better tour director for our 11 days in Ecuador. From start to finish, he went above and beyond to make the experience unforgettable. Visiting an indigenous community in the Amazon, sharing an authentic meal, exploring an animal refuge, and hiking to a beautiful waterfall were experiences I never would have been able to organize on my own.',
    verifiedTripAdvisor: true
  },
  {
    id: 'rev-5',
    author: 'Katie V',
    location: 'United States',
    rating: 5,
    date: '2026-04-04',
    tourTitle: 'Ecuador & Galapagos with Jhayro',
    title: 'Unforgettable memories!',
    comment: 'Jhayro was an incredible guide who made our time in Ecuador and the Galapagos so enjoyable and stress free! Not only was he very knowledgeable about the history of Ecuador, he made sure to plan excursions for us to experience the culture with indigenous communities and traditional food.',
    verifiedTripAdvisor: true
  },
  {
    id: 'rev-6',
    author: 'Mackenzie L',
    location: 'United States',
    rating: 5,
    date: '2026-04-03',
    tourTitle: 'Ecuador Cultural & Natural Wonders',
    title: 'An unforgettable experience in Ecuador',
    comment: 'We had an amazing time in Ecuador thanks to Jhayro! He was incredibly informative and so passionate about his country and everything it has to offer. You could really feel how much he cares about sharing Ecuador’s beauty and culture. Always punctual, organized, and attentive.',
    verifiedTripAdvisor: true
  },
  {
    id: 'rev-7',
    author: 'Sarah F',
    location: 'United States',
    rating: 5,
    date: '2026-04-03',
    tourTitle: 'Bespoke Galapagos Expedition',
    title: 'Incredible trip!',
    comment: 'This trip was amazing!! Jhayro was an excellent tour guide and made sure we got to see as much as possible. He planned extra stops for us and made special accommodations for people when needed. Would highly recommend booking a tour with him!',
    verifiedTripAdvisor: true
  },
  {
    id: 'rev-8',
    author: 'Taylor K',
    location: 'United States',
    rating: 5,
    date: '2026-04-03',
    tourTitle: 'Andes, Amazon & Galapagos',
    title: 'Most knowledgeable guide and most fun itinerary',
    comment: 'We were always moving and going onto the next activity. It was so fun, there were so many surprises and cool things outside of the itinerary that we got to do and see. Our guide was not just organized, but he took care of every thing we needed, all while being so funny and fun to be around.',
    verifiedTripAdvisor: true
  },
  {
    id: 'rev-9',
    author: 'Navera H',
    location: 'United States',
    rating: 5,
    date: '2026-04-01',
    tourTitle: 'Ecuador Tailor-Made Private Tour',
    title: 'Best Tour Guide Ever!',
    comment: 'We had the absolute best experience with our tour guide in Ecuador! From start to finish, he went above and beyond to make sure everything was smooth, enjoyable, and unforgettable. His knowledge of the history, culture, and local spots was incredible. He brought places to life with stories and insights you wouldn’t get anywhere else.',
    verifiedTripAdvisor: true
  },
  {
    id: 'rev-10',
    author: 'Julio M',
    location: 'United States',
    rating: 5,
    date: '2026-04-01',
    tourTitle: 'Ecuador tour (Andes, Baños, and Galapagos)',
    title: 'Attentive, professional and fluent English',
    comment: 'Jhayro was very attentive. Very fluent English made everything so much easier and comfortable throughout the journey. Highly recommended tour company in Ecuador!',
    verifiedTripAdvisor: true
  }
];

