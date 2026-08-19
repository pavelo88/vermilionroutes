/**
 * updateToursFirebase.mjs
 * 
 * Actualiza todos los tours en Firestore con los textos completos correctos.
 * Ejecutar con: node scripts/updateToursFirebase.mjs
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, writeBatch } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAFy6_7G1Ygo8b1TCj_1BPDc1OfXeI0eLc',
  authDomain: 'studio-8636221254-47ba9.firebaseapp.com',
  projectId: 'studio-8636221254-47ba9',
  storageBucket: 'studio-8636221254-47ba9.firebasestorage.app',
  messagingSenderId: '605159890976',
  appId: '1:605159890976:web:50b22937ed00be1c489c45',
};

const ADMIN_EMAIL = 'admin@vermilionroutes.com';
const ADMIN_PASSWORD = 'Vermilion2026*';

function ml(en, es) {
  return { en, es: es || en, fr: en, de: en, it: en, pt: en, ja: en, zh: en };
}

const TOURS = [
  {
    id: 'galapagos-4days',
    title: ml('GALÁPAGOS ISLANDS – 4-DAY ITINERARY','ISLAS GALÁPAGOS – ITINERARIO DE 4 DÍAS'),
    destination: ml('Galápagos Islands','Islas Galápagos'),
    duration: ml('4 DAYS / 3 NIGHTS','4 DÍAS / 3 NOCHES'),
    durationDays: 4,
    price: 1590, price3Star: 1590, price4Star: 1899,
    category: ml('Island Hopping & Snorkeling','Salto de Islas y Snorkel'),
    description: ml(
      'Experience the wonders of the Galápagos on this 4-day itinerary featuring Santa Cruz highlands, giant tortoises at Primicias Ranch, full-day boat excursion to Isabela Island with Tintoreras snorkeling, flamingo lagoon, and coastal exploration at La Lobería, Punta Estrada and Las Grietas.',
      'Experimenta las maravillas de Galápagos en 4 días: tierras altas de Santa Cruz, tortugas gigantes en Rancho Primicias, excursión full-day a Isabela con snorkel en Tintoreras, laguna de flamingos y visitas a La Lobería, Punta Estrada y Las Grietas.',
    ),
    highlights: [
      ml('Twin Craters & Primicias Giant Tortoise Ranch','Cráteres Gemelos y Rancho Primicias'),
      ml('Full-Day Isabela Excursion & Tintoreras Snorkeling','Excursión Full-Day Isabela y Snorkel en Tintoreras'),
      ml('Flamingo Lagoon & Giant Tortoise Breeding Center','Laguna de Flamingos y Centro de Crianza'),
      ml('La Lobería Sea Lion Colony & Punta Estrada','Colonia de Lobos Marinos en La Lobería y Punta Estrada'),
      ml('Las Grietas Crystal-Clear Volcanic Canyon','Cañón Volcánico Las Grietas'),
    ],
    inclusions: [
      ml('Accommodation at the hotel of your choice in Santa Cruz','Alojamiento en el hotel seleccionado en Santa Cruz'),
      ml('Buffet breakfast at 4-star hotels / Continental breakfast at 3-star hotels','Desayuno buffet en hoteles 4★ / Desayuno continental en hoteles 3★'),
      ml('Lunches with a set menu','Almuerzos menú incluidos'),
      ml('Plane Ticket (Quito/Guayaquil – Baltra – Quito/Guayaquil)','Boleto aéreo (Quito/Guayaquil – Baltra – Quito/Guayaquil)'),
      ml('Visits to the islands according to the itinerary','Visitas a las islas según itinerario'),
      ml('Airport reception and departure assistance at Galápagos Airport','Recepción y asistencia en aeropuertos de Galápagos'),
      ml('Land and sea transportation','Transporte terrestre y marítimo'),
      ml('Level III Naturalist Guides (Spanish / English)','Guías Naturalistas Nivel III (Español / Inglés)'),
      ml('Snorkeling equipment for boat excursions (mask and snorkel)','Equipo de snorkel para excursiones en barco'),
      ml('Safety lockers available at hotel reception','Casilleros de seguridad en recepción'),
      ml('Lobito Airport Shuttle Bus: Airport – Itabaca Channel – Airport','Bus de aeropuerto Lobito: Aeropuerto – Canal de Itabaca – Aeropuerto'),
      ml('Isabela Dock Fee: USD 5.00 for Ecuadorian nationals; USD 10.00 for foreign visitors','Tasa de muelle de Isabela: USD 5.00 nacionales / USD 10.00 extranjeros'),
    ],
    exclusions: [
      ml('Galápagos National Park entrance fee: USD 6.00 for Ecuadorian nationals; USD 200.00 for foreign visitors','Entrada al Parque Nacional Galápagos: USD 6.00 nacionales / USD 200.00 extranjeros'),
      ml('Dinners','Cenas'),
      ml('Transit Control Card (TCT): USD 20.00','Tarjeta de Control de Tránsito (TCT): USD 20.00'),
      ml('Services not specified in the program','Servicios no especificados en el programa'),
    ],
    itinerary: [
      {
        day: 1,
        title: ml('DAY 1 – ARRIVAL IN BALTRA | TWIN CRATERS | PRIMICIAS RANCH','DÍA 1 – LLEGADA A BALTRA | CRÁTERES GEMELOS | RANCHO PRIMICIAS'),
        description: ml(
          'Upon arrival at Seymour Airport on Baltra Island, you will be welcomed by our representative and begin your journey through the Galápagos Islands.\n\nAfter crossing the Itabaca Channel to Santa Cruz Island, we will travel to the highlands to visit the famous Twin Craters (Los Gemelos). These impressive volcanic formations are surrounded by the lush Scalesia forest and offer an excellent introduction to the unique geological landscape of Santa Cruz Island.\n\nWe will then continue to Primicias Ranch, a private reserve where giant Galápagos tortoises can be observed roaming freely in their natural environment. During the visit, you will learn about these iconic animals and their importance to the Galápagos ecosystem.\n\nAfter the excursion, we will continue to Puerto Ayora for hotel check-in and the remainder of the day at leisure.',
          'Llegada al Aeropuerto Seymour en Baltra, recepción por nuestro representante e inicio del viaje en Galápagos.\n\nTras cruzar el Canal de Itabaca hacia Santa Cruz, visitamos los Cráteres Gemelos rodeados del bosque de Scalesia en las tierras altas.\n\nContinuamos al Rancho Primicias para observar tortugas gigantes en libertad y explorar túneles de lava.\n\nTraslado a Puerto Ayora para check-in y tarde libre.',
        ),
        accommodation: ml('Santa Cruz Island – Puerto Ayora','Isla Santa Cruz – Puerto Ayora'),
        meals: ml('According to the selected hotel plan','Según plan hotelero seleccionado'),
        transportation: ml('Private land transportation & airport shuttle','Transporte privado terrestre y shuttle de aeropuerto'),
      },
      {
        day: 2,
        title: ml('DAY 2 – FULL-DAY EXCURSION TO ISABELA ISLAND | TORTOISE BREEDING CENTER | FLAMINGO LAGOON | TINTORERAS','DÍA 2 – EXCURSIÓN FULL-DAY A ISLA ISABELA | CENTRO DE CRIANZA | LAGUNA DE FLAMINGOS | TINTORERAS'),
        description: ml(
          'After breakfast, transfer to the pier to board a speedboat to Isabela Island. The navigation takes approximately 2 to 2.5 hours, depending on sea conditions.\n\nUpon arrival in Puerto Villamil, we will visit the Giant Tortoise Breeding Center, where you will learn about the conservation and breeding programs established to protect Isabela\'s giant tortoise populations.\n\nWe will then visit the Flamingo Lagoon, one of the island\'s most important wetlands. Depending on natural conditions, you may observe Galápagos flamingos and other species of birds in their natural habitat.\n\nThe excursion will continue with a boat trip to Tintoreras Islet, a small volcanic islet located just off the coast of Isabela. Its clear waters and rich marine environment make it an excellent snorkeling destination. During the activity, you may have the opportunity to observe sea lions, sea turtles, rays, penguins and colorful tropical fish, depending on wildlife activity and sea conditions.\n\nAfter the excursion, return by speedboat to Santa Cruz Island and Puerto Ayora.',
          'Traslado al muelle para tomar la lancha rápida hacia Isla Isabela (2 a 2.5 horas de navegación).\n\nEn Puerto Villamil visitamos el Centro de Crianza de Tortugas Gigantes y la Laguna de Flamingos para observar flamingos y aves marinas.\n\nPor la tarde, navegación al Islote Tintoreras para snorkeling con lobos marinos, tortugas marinas, rayas, pingüinos de Galápagos y peces tropicales.\n\nRetorno en lancha rápida a Santa Cruz y Puerto Ayora.',
        ),
        accommodation: ml('Santa Cruz Island – Puerto Ayora','Isla Santa Cruz – Puerto Ayora'),
        meals: ml('Breakfast and lunch','Desayuno y almuerzo'),
        transportation: ml('Shared speedboat and private land transportation','Lancha rápida compartida y transporte terrestre privado'),
        activity: ml('Full-day guided excursion and snorkeling','Excursión guiada full-day y snorkeling'),
      },
      {
        day: 3,
        title: ml('DAY 3 – LA LOBERÍA | PUNTA ESTRADA | LAS GRIETAS','DÍA 3 – LA LOBERÍA | PUNTA ESTRADA | LAS GRIETAS'),
        description: ml(
          'After breakfast, we will begin the day\'s activities with a visit to La Lobería, a coastal area famous for its resident population of Galápagos sea lions. Here, you will have the opportunity to observe these playful animals in their natural environment.\n\nWe will then continue to Punta Estrada, a beautiful coastal area surrounded by rocky formations and clear waters. The area offers excellent opportunities for nature observation and marine activities.\n\nThe excursion will continue to Las Grietas, a spectacular natural formation consisting of a narrow volcanic canyon filled with crystal-clear turquoise water. This is one of the most popular snorkeling and swimming sites near Puerto Ayora.\n\nDuring the snorkeling activity, you can explore the underwater environment and observe a variety of colorful fish and marine life.\n\nAfter the visit, return to Puerto Ayora and enjoy the remainder of the day at leisure.',
          'Visita matutina a La Lobería para observar la colonia residente de lobos marinos.\n\nContinuamos a Punta Estrada, bahía costera de formaciones rocosas y aguas calmas.\n\nCaminata a Las Grietas, cañón volcánico con aguas cristalinas turquesas para nadar y hacer snorkel.\n\nRetorno a Puerto Ayora y tarde libre.',
        ),
        accommodation: ml('Santa Cruz Island – Puerto Ayora','Isla Santa Cruz – Puerto Ayora'),
        meals: ml('Breakfast','Desayuno'),
        activity: ml('Guided excursion and snorkeling','Excursión guiada y snorkeling'),
      },
      {
        day: 4,
        title: ml('DAY 4 – TRANSFER TO BALTRA AIRPORT | DEPARTURE','DÍA 4 – TRASLADO AL AEROPUERTO DE BALTRA | SALIDA'),
        description: ml(
          'After breakfast, check out from the hotel and begin the transfer from Puerto Ayora to Baltra Airport.\n\nThe journey includes transportation across Santa Cruz Island and the crossing of the Itabaca Channel, followed by the airport shuttle to Seymour Airport.\n\nUpon arrival at the airport, assistance will be provided for your departure flight, marking the end of your Galápagos Islands experience.',
          'Desayuno, check-out del hotel y traslado terrestre a través de Santa Cruz hacia el Canal de Itabaca.\n\nCruce en ferry y traslado en shuttle hacia el Aeropuerto Seymour de Baltra con asistencia para abordar el vuelo de retorno al continente.',
        ),
        meals: ml('Breakfast','Desayuno'),
        transportation: ml('Private land transportation and airport shuttle','Transporte terrestre privado y shuttle de aeropuerto'),
      },
    ],
  },

  {
    id: 'galapagos-5days',
    title: ml('GALÁPAGOS ISLANDS – 5-DAY ITINERARY','ISLAS GALÁPAGOS – ITINERARIO DE 5 DÍAS'),
    destination: ml('Galápagos Islands','Islas Galápagos'),
    duration: ml('5 DAYS / 4 NIGHTS','5 DÍAS / 4 NOCHES'),
    durationDays: 5,
    price: 1850, price3Star: 1850, price4Star: 2099,
    category: ml('Grand Island Hopping & Snorkeling Cruise','Gran Salto de Islas y Crucero'),
    description: ml(
      'Comprehensive 5-day Galápagos journey: Santa Cruz highlands, overnight on Isabela Island with Flamingo Lagoon & Tintoreras snorkeling, La Lobería sea lions, Las Grietas canyon, and full-day yacht cruise to Santa Fe or Pinzón Island.',
      'Itinerario integral de 5 días: tierras altas de Santa Cruz, noche en Isla Isabela con flamingos y Tintoreras, La Lobería, cañón Las Grietas y navegación a Santa Fe o Isla Pinzón.',
    ),
    highlights: [
      ml('Twin Craters & Primicias Giant Tortoise Ranch','Cráteres Gemelos y Rancho Primicias'),
      ml('Overnight in Isabela & Flamingo Lagoon','Noche en Isabela y Laguna de Flamingos'),
      ml('Tintoreras Islet Snorkeling','Snorkel en Tintoreras'),
      ml('La Lobería & Las Grietas Volcanic Canyon','La Lobería y Cañón de Las Grietas'),
      ml('Full-Day Cruise to Santa Fe or Pinzón Island','Navegación Full-Day a Santa Fe o Pinzón'),
    ],
    inclusions: [
      ml('Accommodation at the hotel of your choice in Santa Cruz','Alojamiento en el hotel seleccionado en Santa Cruz'),
      ml('Accommodation at Tintorera Guesthouse in Isabela','Alojamiento en Hostal Tintorera en Isabela'),
      ml('Buffet breakfast at 4-star / Continental breakfast at 3-star hotels','Desayuno buffet 4★ / Continental 3★'),
      ml('Lunches with a set menu','Almuerzos menú incluidos'),
      ml('Plane Ticket (Quito – Baltra – Quito)','Boleto aéreo Quito – Baltra – Quito'),
      ml('Visits to the islands according to the itinerary','Visitas a las islas según itinerario'),
      ml('Airport reception and departure assistance','Recepción y asistencia en aeropuertos'),
      ml('Land and sea transportation','Transporte terrestre y marítimo'),
      ml('Level III Naturalist Guides (Spanish / English)','Guías Naturalistas Nivel III (Español / Inglés)'),
      ml('Snorkeling equipment (mask and snorkel)','Equipo de snorkel (máscara y tubo)'),
      ml('Safety lockers at hotel reception','Casilleros de seguridad en recepción'),
      ml('Lobito Airport Shuttle Bus','Bus de aeropuerto Lobito'),
      ml('Isabela Dock Fee: USD 5.00 / USD 10.00 for foreign visitors','Tasa de muelle de Isabela: USD 5.00 nacionales / USD 10.00 extranjeros'),
    ],
    exclusions: [
      ml('Galápagos National Park entrance fee: USD 200.00 for foreign visitors','Entrada Parque Nacional: USD 200.00 extranjeros'),
      ml('Dinners','Cenas'),
      ml('Transit Control Card (TCT): USD 20.00','TCT: USD 20.00'),
      ml('Services not specified in the program','Servicios no especificados'),
    ],
    itinerary: [
      {
        day: 1,
        title: ml('DAY 1 – ARRIVAL IN BALTRA | TWIN CRATERS | PRIMICIAS RANCH','DÍA 1 – LLEGADA A BALTRA | CRÁTERES GEMELOS | RANCHO PRIMICIAS'),
        description: ml(
          'Upon arrival at Seymour Airport on Baltra Island, you will be welcomed by our representative and begin your journey through the Galápagos Islands.\n\nAfter crossing the Itabaca Channel to Santa Cruz Island, we will continue towards the highlands. Along the way, we will visit the famous Twin Craters (Los Gemelos), two impressive volcanic formations surrounded by the lush vegetation of the Santa Cruz highlands. Here, you will learn about the geological origins of the island and observe the unique Scalesia forest.\n\nWe will then continue to Primicias Ranch, a private reserve where you can observe giant Galápagos tortoises roaming freely in their natural environment. This is an excellent opportunity to photograph these iconic animals and learn about their importance to the Galápagos ecosystem.\n\nAfter the visit, we will continue to your hotel in Puerto Ayora for check-in and the remainder of the day at leisure.',
          'Llegada al Aeropuerto Seymour en Baltra y cruce del Canal de Itabaca hacia Santa Cruz.\n\nVisita a los Cráteres Gemelos y bosque de Scalesia. Continuamos al Rancho Primicias para fotografiar tortugas gigantes en libertad.\n\nCheck-in en Puerto Ayora y tarde libre.',
        ),
        accommodation: ml('Santa Cruz Island – Puerto Ayora','Isla Santa Cruz – Puerto Ayora'),
        meals: ml('Not included / according to hotel plan','No incluidas / según plan hotelero'),
      },
      {
        day: 2,
        title: ml('DAY 2 – SANTA CRUZ TO ISABELA | FLAMINGO LAGOON | TORTOISE BREEDING CENTER | TINTORERAS','DÍA 2 – SANTA CRUZ A ISABELA | LAGUNA DE FLAMINGOS | CENTRO DE CRIANZA | TINTORERAS'),
        description: ml(
          'After breakfast, we will transfer to the pier for a speedboat journey from Santa Cruz to Isabela Island. The crossing takes approximately 2 to 2.5 hours, depending on sea conditions.\n\nUpon arrival in Puerto Villamil, we will begin our exploration of Isabela. Our first stop will be the Flamingo Lagoon, one of the most important wetland areas on the island. Here, you may observe American flamingos feeding and resting in the shallow waters, together with other species of coastal and migratory birds.\n\nWe will then visit the Giant Tortoise Breeding Center, where you will learn about the conservation and reproduction programs designed to protect Isabela\'s giant tortoise populations.\n\nIn the afternoon, we will take a boat excursion to Tintoreras Islet, a small volcanic islet located just off the coast of Isabela. The area is famous for its crystal-clear waters and rich marine life. During the snorkeling activity, you may encounter sea lions, sea turtles, rays, colorful fish and penguins, depending on the conditions and wildlife activity.\n\nAfter the excursion, return to Puerto Villamil and enjoy the evening at leisure.',
          'Lancha rápida a Isla Isabela (2 a 2.5 h). Visita a la Laguna de Flamingos y el Centro de Crianza de Tortugas Gigantes.\n\nPor la tarde, navegación al Islote Tintoreras para snorkel con lobos marinos, tortugas, rayas y pingüinos.\n\nNoche en Isabela.',
        ),
        accommodation: ml('Isabela Island – Puerto Villamil','Isla Isabela – Puerto Villamil (Hostal Tintorera)'),
        meals: ml('Breakfast','Desayuno'),
      },
      {
        day: 3,
        title: ml('DAY 3 – ISABELA TO SANTA CRUZ | LA LOBERÍA | LAS GRIETAS','DÍA 3 – ISABELA A SANTA CRUZ | LA LOBERÍA | LAS GRIETAS'),
        description: ml(
          'After breakfast, we will return to the pier for the boat transfer back to Santa Cruz Island.\n\nUpon arrival in Puerto Ayora, we will continue with a visit to La Lobería, a small coastal area known for its population of Galápagos sea lions. This is a wonderful place to observe these playful animals both on the beach and in the water.\n\nWe will then visit Las Grietas, a spectacular natural formation created by volcanic activity. This narrow canyon is filled with clear, turquoise water and is one of the most popular swimming and snorkeling sites near Puerto Ayora.\n\nDuring the snorkeling activity, you will have the opportunity to explore the underwater environment and observe colorful tropical fish and other marine species.\n\nAfter the visit, return to Puerto Ayora and check in at your hotel. The remainder of the afternoon and evening will be free to relax or explore the town independently.',
          'Lancha rápida de regreso a Santa Cruz. Visita a La Lobería para observar lobos marinos.\n\nLuego, Las Grietas: cañón volcánico de aguas cristalinas para nadar y hacer snorkel. Tarde libre en Puerto Ayora.',
        ),
        accommodation: ml('Santa Cruz Island – Puerto Ayora','Isla Santa Cruz – Puerto Ayora'),
        meals: ml('Breakfast','Desayuno'),
      },
      {
        day: 4,
        title: ml('DAY 4 – FULL-DAY EXCURSION TO SANTA FE OR PINZÓN ISLAND','DÍA 4 – EXCURSIÓN FULL-DAY A ISLA SANTA FE O ISLA PINZÓN'),
        description: ml(
          'Today, enjoy a full-day boat excursion to one of the Galápagos\' outstanding snorkeling destinations: Santa Fe Island or Pinzón Island, depending on availability, sea conditions and the selected tour.\n\nSanta Fe Island is known for its beautiful turquoise waters, white sandy beaches and endemic wildlife. During the excursion, you may encounter sea lions, sea turtles, rays, marine iguanas and a variety of tropical fish. The island is also home to the endemic Santa Fe land iguana.\n\nAlternatively, the excursion may take you to Pinzón Island, a spectacular location surrounded by clear waters and abundant marine life. The snorkeling sites around Pinzón are particularly well known for encounters with sea turtles, sea lions, rays, colorful fish and, with some luck, Galápagos penguins.\n\nThe day will include navigation, snorkeling and opportunities to observe wildlife both above and below the water. Lunch will generally be provided during the excursion.\n\nReturn to Puerto Ayora in the afternoon and enjoy your final evening in the Galápagos.',
          'Excursión de día completo en yate hacia Isla Santa Fe o Isla Pinzón.\n\nSanta Fe: aguas turquesas, iguanas terrestres endémicas y vida marina. Pinzón: tortugas gigantes, tiburones, rayas y peces tropicales.\n\nAlmuerzo a bordo. Retorno a Puerto Ayora.',
        ),
        accommodation: ml('Santa Cruz Island – Puerto Ayora','Isla Santa Cruz – Puerto Ayora'),
        meals: ml('Breakfast and lunch','Desayuno y almuerzo'),
        activity: ml('Full-day boat excursion and snorkeling','Excursión en barco de día completo y snorkel'),
      },
      {
        day: 5,
        title: ml('DAY 5 – TRANSFER TO BALTRA AIRPORT | DEPARTURE','DÍA 5 – TRASLADO AL AEROPUERTO DE BALTRA | SALIDA'),
        description: ml(
          'After breakfast, check out from the hotel and transfer from Puerto Ayora towards Baltra Island.\n\nThe journey includes transportation across Santa Cruz Island and the Itabaca Channel, followed by the transfer to Seymour Airport (Baltra).\n\nUpon arrival at the airport, assistance will be provided for your departure flight, marking the end of your Galápagos Islands adventure.',
          'Desayuno, check-out y traslado terrestre a través de Santa Cruz hacia el Aeropuerto Seymour de Baltra para tomar el vuelo de retorno.',
        ),
        meals: ml('Breakfast','Desayuno'),
      },
    ],
  },

  {
    id: 'galapagos-6days',
    title: ml('6-DAY GALÁPAGOS ISLANDS TOUR ITINERARY','ISLAS GALÁPAGOS – ITINERARIO DE 6 DÍAS'),
    destination: ml('Galápagos Islands','Islas Galápagos'),
    duration: ml('6 DAYS / 5 NIGHTS','6 DÍAS / 5 NOCHES'),
    durationDays: 6,
    price: 1999, price3Star: 1999, price4Star: 2300,
    category: ml('Triple Island Discovery','Descubrimiento Triple Isla'),
    description: ml(
      'Ultimate 6-day Galápagos expedition: Santa Cruz highlands & giant tortoises, Isabela Island with Tintoreras & flamingos, Las Grietas canyon, full-day yacht cruise to Santa Fe or Pinzón Island, and San Cristóbal with Interpretation Center & Tijeretas Hill.',
      'Expedición definitiva de 6 días en 3 islas: Santa Cruz con tortugas, Isabela con flamingos y Tintoreras, cañón Las Grietas, navegación a Santa Fe/Pinzón, y San Cristóbal con Centro de Interpretación y Tijeretas.',
    ),
    highlights: [
      ml('Twin Craters & Primicias Giant Tortoise Reserve','Cráteres Gemelos y Rancho Primicias'),
      ml('Isabela Island, Flamingo Lagoon & Tintoreras','Isla Isabela, Laguna de Flamingos y Tintoreras'),
      ml('Las Grietas Volcanic Rock Canyon','Cañón de Las Grietas'),
      ml('Full-Day Yacht Cruise to Santa Fe or Pinzón','Navegación Full-Day a Santa Fe o Pinzón'),
      ml('San Cristóbal Interpretation Center & Tijeretas Hill','Centro de Interpretación y Cerro Tijeretas en San Cristóbal'),
    ],
    inclusions: [
      ml('Accommodation at the hotel of your choice in Santa Cruz','Alojamiento en Santa Cruz'),
      ml('Accommodation at Hostal Tintorera in Isabela','Alojamiento en Hostal Tintorera en Isabela'),
      ml('Accommodation at Hotel Algarrobos in San Cristóbal','Alojamiento en Hotel Algarrobos en San Cristóbal'),
      ml('Buffet breakfast at 4-star / Continental breakfast at 3-star','Desayuno buffet 4★ / Continental 3★'),
      ml('Plane ticket (Quito – Baltra / San Cristóbal – Quito)','Boleto aéreo Quito – Baltra / San Cristóbal – Quito'),
      ml('Set-menu lunches','Almuerzos menú'),
      ml('Visits to the islands according to the itinerary','Visitas a las islas según itinerario'),
      ml('Airport reception and departure assistance','Recepción y asistencia en aeropuertos'),
      ml('Maritime and land transportation','Transporte marítimo y terrestre'),
      ml('Naturalist Guide Class III (Spanish/English)','Guía Naturalista Nivel III (Español/Inglés)'),
      ml('Snorkeling equipment (mask and snorkel)','Equipo de snorkel'),
      ml('Safety lockers at hotel reception','Casilleros de seguridad'),
      ml('Lobito Airport Bus','Bus de aeropuerto Lobito'),
      ml('Isabela Dock Fee: USD 5.00 / USD 10.00 foreign visitors','Tasa de muelle Isabela: USD 5.00 nacionales / USD 10.00 extranjeros'),
    ],
    exclusions: [
      ml('Galápagos National Park entrance fee: USD 200.00 for foreign visitors','Entrada Parque Nacional: USD 200.00 extranjeros'),
      ml('Dinners in Santa Cruz','Cenas en Santa Cruz'),
      ml('Transit Control Card (TCT): USD 20.00','TCT: USD 20.00'),
      ml('Services not specified in the program','Servicios no especificados'),
    ],
    itinerary: [
      { day: 1, title: ml('DAY 1 – ARRIVAL IN BALTRA | TWIN CRATERS | PRIMICIAS RANCH','DÍA 1 – LLEGADA A BALTRA | CRÁTERES GEMELOS | RANCHO PRIMICIAS'), description: ml('Upon arrival at Baltra Airport, you will be welcomed by our representative and begin your Galápagos adventure.\n\nYour first visit will be to the Twin Craters (Los Gemelos), two impressive volcanic formations located in the highlands of Santa Cruz Island. These large craters were created by ancient volcanic activity and are surrounded by lush vegetation, including the characteristic scalesia forest. During the visit, you will have the opportunity to learn about the island\'s geological history and observe some of the native bird species of the highlands.\n\nAfterward, continue to Primicias Ranch, a private ecological reserve where you can observe giant Galápagos tortoises roaming freely in their natural environment. You will also have the chance to walk through lava tunnels and learn more about the conservation efforts dedicated to protecting these iconic animals.\n\nAt the end of the excursion, transfer to your accommodation in Santa Cruz Island and enjoy the rest of the day at leisure.','Llegada al Aeropuerto de Baltra. Visita a los Cráteres Gemelos y bosque de Scalesia. Rancho Primicias: tortugas gigantes en libertad y túneles de lava. Check-in en Santa Cruz.'), accommodation: ml('Santa Cruz Island','Isla Santa Cruz') },
      { day: 2, title: ml('DAY 2 – SANTA CRUZ – ISABELA | FLAMINGO LAGOON | TORTOISE BREEDING CENTER | TINTORERAS','DÍA 2 – SANTA CRUZ – ISABELA | FLAMINGOS | CENTRO CRIANZA | TINTORERAS'), description: ml('After breakfast, transfer to the pier for a speedboat ride to Isabela Island, the largest island in the Galápagos archipelago.\n\nUpon arrival in Puerto Villamil, begin your exploration of Isabela with a visit to a flamingo lagoon, where you may observe the beautiful Galápagos flamingos feeding and resting in the shallow waters.\n\nContinue to the Tortoise Breeding Center, a conservation facility dedicated to the reproduction and protection of Isabela\'s giant tortoise populations.\n\nIn the afternoon, take a boat excursion to Tintoreras Islet. During the visit, you will have the opportunity to snorkel with sea turtles, sea lions, tropical fish, rays, and marine iguanas. On land, you may also see penguins and blue-footed boobies.\n\nReturn to Puerto Villamil and enjoy the evening at leisure.','Lancha a Isla Isabela. Laguna de Flamingos y Centro de Crianza de Tortugas. Tarde: snorkel en Islote Tintoreras. Noche en Isabela.'), accommodation: ml('Isabela Island (Hostal Tintorera)','Isla Isabela (Hostal Tintorera)') },
      { day: 3, title: ml('DAY 3 – ISABELA TO SANTA CRUZ | LA LOBERÍA | LAS GRIETAS','DÍA 3 – ISABELA A SANTA CRUZ | LA LOBERÍA | LAS GRIETAS'), description: ml('After breakfast, transfer to the pier for your return journey to Santa Cruz Island.\n\nUpon arrival, continue with a visit to La Lobería, a coastal area known for its colony of playful Galápagos sea lions. Enjoy a short walk along the coast and take the opportunity to observe these animals in their natural habitat.\n\nLater, visit Las Grietas, one of Santa Cruz\'s most popular natural swimming and snorkeling sites. This spectacular geological formation consists of a narrow water-filled crevice surrounded by high volcanic rock walls.\n\nReturn to your hotel and enjoy the remainder of the afternoon and evening at leisure.','Lancha de regreso a Santa Cruz. La Lobería: lobos marinos. Las Grietas: cañón volcánico cristalino para nadar y snorkelear. Tarde libre.'), accommodation: ml('Santa Cruz Island','Isla Santa Cruz') },
      { day: 4, title: ml('DAY 4 – FULL-DAY EXCURSION TO SANTA FE OR PINZÓN ISLAND','DÍA 4 – EXCURSIÓN FULL-DAY A SANTA FE O PINZÓN'), description: ml('Today, enjoy a full-day boat excursion to Santa Fe Island or Pinzón Islet, depending on availability, weather, and sea conditions.\n\nSanta Fe is famous for its turquoise waters, white-sand beaches, sea lions, marine iguanas, turtles, rays, and endemic Santa Fe land iguana.\n\nPinzón is a spectacular snorkeling destination with sea turtles, sea lions, rays, sharks, and schools of tropical fish.\n\nAfter the activities, enjoy lunch on board and continue exploring the surrounding waters before returning to Santa Cruz.','Navegación full-day a Isla Santa Fe o Islote Pinzón con snorkel de alta biodiversidad. Almuerzo a bordo incluido.'), accommodation: ml('Santa Cruz Island','Isla Santa Cruz') },
      { day: 5, title: ml('DAY 5 – SANTA CRUZ – SAN CRISTÓBAL | INTERPRETATION CENTER | TIJERETAS | LA LOBERÍA','DÍA 5 – SANTA CRUZ – SAN CRISTÓBAL | CENTRO INTERPRETACIÓN | TIJERETAS | LA LOBERÍA'), description: ml('After breakfast, transfer to the pier for a speedboat journey to San Cristóbal Island.\n\nUpon arrival in Puerto Baquerizo Moreno, begin your tour with a visit to the San Cristóbal Interpretation Center, an excellent introduction to the natural and human history of the Galápagos Islands.\n\nContinue to Tijeretas Hill, a scenic viewpoint with panoramic views of the coastline and frigatebirds flying above the cliffs.\n\nFinally, visit La Lobería to observe sea lions on the beach.\n\nReturn to Puerto Baquerizo Moreno and enjoy your final evening in the Galápagos.','Lancha a San Cristóbal. Centro de Interpretación, Cerro Tijeretas con fragatas y La Lobería con lobos marinos. Última noche en las Galápagos.'), accommodation: ml('San Cristóbal Island (Hotel Algarrobos)','Isla San Cristóbal (Hotel Algarrobos)') },
      { day: 6, title: ml('DAY 6 – SAN CRISTÓBAL – DEPARTURE','DÍA 6 – SAN CRISTÓBAL – SALIDA'), description: ml('After breakfast, enjoy some free time depending on your flight schedule.\n\nAt the appropriate time, transfer to San Cristóbal Airport for your departure flight.\n\nYour unforgettable Galápagos adventure comes to an end as you board your flight back to the mainland.','Desayuno y tiempo libre hasta el traslado al Aeropuerto de San Cristóbal y vuelo de retorno al continente.') },
    ],
  },

  {
    id: 'ecuador-galapagos-11days',
    title: ml('ECUADOR & GALÁPAGOS ISLANDS – 11 DAYS / 10 NIGHTS','ECUADOR E ISLAS GALÁPAGOS – 11 DÍAS / 10 NOCHES'),
    destination: ml('Ecuador & Galápagos Islands','Ecuador e Islas Galápagos'),
    duration: ml('11 DAYS / 10 NIGHTS','11 DÍAS / 10 NOCHES'),
    durationDays: 11,
    price: 2437, price3Star: 2437, price4Star: 2599,
    category: ml('Best of Ecuador & Galápagos','Lo Mejor de Ecuador y Galápagos'),
    description: ml(
      'The ultimate 11-day journey combining the best of Ecuador and the Galápagos: Quito, Avenue of the Volcanoes, Baños & Pailón del Diablo, Amazon Rainforest & Kichwa culture, Quilotoa Crater Lake, and 5 nights exploring Santa Cruz, Isabela Island, and Galápagos marine wildlife.',
      'El viaje definitivo de 11 días: Quito, Avenida de los Volcanes, Baños y Pailón del Diablo, Selva Amazónica y cultura Kichwa, Laguna del Quilotoa y 5 noches en Santa Cruz e Isla Isabela.',
    ),
    highlights: [
      ml('Quito & Avenue of the Volcanoes','Quito y Avenida de los Volcanes'),
      ml('Baños de Agua Santa & Pailón del Diablo Waterfall','Baños y Cascada Pailón del Diablo'),
      ml('Yanacocha Biopark & Amazon Rainforest (Puyo)','Bioparque Yanacocha y Selva Amazónica (Puyo)'),
      ml('Quilotoa Emerald Crater Lake','Laguna del Cráter de Quilotoa'),
      ml('Santa Cruz & Galápagos Giant Tortoises','Santa Cruz y Tortugas Gigantes'),
      ml('Isabela Island, Flamingo Lagoon & Tintoreras','Isla Isabela, Laguna de Flamingos y Tintoreras'),
      ml('La Lobería, Punta Estrada & Las Grietas','La Lobería, Punta Estrada y Las Grietas'),
    ],
    inclusions: [
      ml('Airport assistance and private transfers','Asistencia en aeropuerto y traslados privados'),
      ml('Private transportation throughout the continental itinerary','Transporte privado durante todo el itinerario continental'),
      ml('Professional English-speaking guide','Guía profesional bilingüe'),
      ml('10 nights of accommodation (3* or 4* hotels)','10 noches de alojamiento (hoteles 3★ o 4★)'),
      ml('Daily breakfast; lunches and dinner in Amazon as specified','Desayunos diarios; almuerzos y cena en Amazonía según itinerario'),
      ml('Plane ticket (Quito – Baltra – Quito)','Boleto aéreo (Quito – Baltra – Quito)'),
      ml('Land and sea transportation in Galápagos','Transporte terrestre y marítimo en Galápagos'),
      ml('Level III Naturalist Guides in Galápagos','Guías Naturalistas Nivel III en Galápagos'),
      ml('Snorkeling equipment for Galápagos excursions','Equipo de snorkel en Galápagos'),
      ml('Isabela Dock Fee included','Tasa de muelle de Isabela incluida'),
    ],
    exclusions: [
      ml('Galápagos National Park entrance fee: USD 200.00 for foreign visitors','Entrada Parque Nacional: USD 200.00 extranjeros'),
      ml('Transit Control Card (TCT): USD 20.00','TCT: USD 20.00'),
      ml('Dinners in Galápagos','Cenas en Galápagos'),
      ml('Personal expenses and optional activities','Gastos personales y actividades opcionales'),
    ],
    itinerary: [
      { day: 1, title: ml('DAY 1 – ARRIVAL IN QUITO | AIRPORT ASSISTANCE & HOTEL TRANSFER','DÍA 1 – LLEGADA A QUITO | ASISTENCIA AEROPORTUARIA'), description: ml('Upon arrival at Mariscal Sucre International Airport in Quito, you will be welcomed by our representative and assisted with your private transfer to the hotel.\n\nThis program can begin on any day of the week, depending on your travel arrangements.\n\nThe remainder of the day will be free to rest and acclimatize to the altitude of Quito.','Llegada al Aeropuerto Internacional Mariscal Sucre de Quito, recepción y traslado al hotel. Día libre para descansar y aclimatarse.'), accommodation: ml('Quito','Quito'), transportation: ml('Private transportation (4x4 vehicles or tourist buses)','Transporte privado'), meals: ml('Not included','No incluidas') },
      { day: 2, title: ml('DAY 2 – QUITO – BAÑOS | AVENUE OF THE VOLCANOES | PAILÓN DEL DIABLO','DÍA 2 – QUITO – BAÑOS | AVENIDA DE LOS VOLCANES | PAILÓN DEL DIABLO'), description: ml('After breakfast, we will travel south along the Pan-American Highway, following the famous Avenue of the Volcanoes, one of the most spectacular landscapes in the Ecuadorian Andes.\n\nThe route takes us through a region surrounded by numerous volcanic peaks before continuing towards Baños de Agua Santa, a charming tourist town located at the foothills of the active Tungurahua Volcano.\n\nBaños is surrounded by dramatic mountain scenery, waterfalls and lush vegetation, offering a wide variety of adventure activities such as cycling, rafting, hiking, tarabita cable-car rides and horseback riding.\n\nDuring today\'s excursion, we will visit the spectacular Pailón del Diablo Waterfall, one of Ecuador\'s most impressive waterfalls.\n\nAfter the visit, we will continue to the hotel in Baños.','Viaje al sur por la Avenida de los Volcanes hasta Baños de Agua Santa. Visita a la espectacular cascada Pailón del Diablo.'), accommodation: ml('Baños','Baños'), activity: ml('8-hour guided tour','Tour guiado de 8 horas'), transportation: ml('Private transportation (4x4 vehicles or tourist buses)','Transporte privado'), meals: ml('Breakfast','Desayuno') },
      { day: 3, title: ml('DAY 3 – BAÑOS – AMAZON RAINFOREST | PUYO | YANACOCHA BIOPARK | HOLA VIDA WATERFALL | KICHWA COMMUNITY','DÍA 3 – BAÑOS – AMAZONÍA | PUYO | BIOPARQUE YANACOCHA | CASCADA HOLA VIDA | COMUNIDAD KICHWA'), description: ml('After breakfast, we will head east towards the Amazon Rainforest, traveling through the spectacular Pastaza River Canyon on our way to the city of Puyo.\n\nOur first stop will be Yanacocha Biopark, where you will learn about native animal species rescued from illegal wildlife trafficking.\n\nWe will then continue into the Amazon rainforest for a guided hike to Hola Vida Waterfall. The approximately two-hour hike offers an opportunity to experience the extraordinary biodiversity of the rainforest.\n\nLater, we will visit a local Kichwa family, where you will learn about their traditions, customs and way of life.\n\nWe will then begin our return journey to Baños.','Viaje por el Cañón del Pastaza hacia Puyo. Bioparque Yanacocha, caminata a la Cascada Hola Vida y visita a familia Kichwa. Retorno a Baños.'), accommodation: ml('Baños','Baños'), activity: ml('6-hour guided tour + 2-hour rainforest hike','Tour de 6h + caminata en selva de 2h'), transportation: ml('Private transportation (4x4 vehicles or tourist buses)','Transporte privado'), meals: ml('Breakfast and lunch','Desayuno y almuerzo') },
      { day: 4, title: ml('DAY 4 – BAÑOS – QUILOTOA – QUITO | QUILOTOA CRATER LAKE | TIGUA','DÍA 4 – BAÑOS – QUILOTOA – QUITO | LAGUNA DEL QUILOTOA | TIGUA'), description: ml('After breakfast, we will begin our journey towards Quito, traveling through some of the most spectacular landscapes of the Ecuadorian Andes.\n\nOur main stop will be Quilotoa Crater Lake, one of Ecuador\'s most iconic natural attractions. The lake lies inside the crater of an ancient volcano and is famous for its striking turquoise-green waters.\n\nDuring the visit, you will have the opportunity to enjoy a two-hour hike towards the bottom of the crater. The descent provides spectacular views of the lake and surrounding mountains.\n\nAlong the way, we may also stop at the traditional village of Tigua, famous for its colorful paintings depicting Andean culture, and visit a traditional guinea pig farm.\n\nWe will then continue to Quito.','Viaje hacia Quito con parada en la Laguna del Cráter de Quilotoa. Caminata al interior de la caldera volcánica. Parada en Tigua (pinturas andinas) y granja de cuyes.'), accommodation: ml('Quito','Quito'), activity: ml('6-hour guided tour + 2-hour hike. Altitude: approximately 3,500 m / 11,500 ft','Tour de 6h + caminata de 2h. Altitud: 3,500 m'), transportation: ml('Private transportation (4x4 vehicles or tourist buses)','Transporte privado'), meals: ml('Breakfast','Desayuno') },
      { day: 5, title: ml('DAY 5 – QUITO | FREE DAY','DÍA 5 – QUITO | DÍA LIBRE'), description: ml('Today is free to enjoy Quito at your own pace.\n\nYou may choose to explore the city\'s historic center, visit museums and cultural attractions, discover local cuisine, or simply relax at the hotel.\n\nThis free day also provides an opportunity to rest before continuing your journey to the Galápagos Islands the following day.\n\nOptional excursions and activities can be arranged upon request.','Día libre en Quito. Oportunidad para descansar antes del vuelo a Galápagos.'), accommodation: ml('Quito','Quito'), meals: ml('Breakfast','Desayuno') },
      { day: 6, title: ml('DAY 6 – QUITO – BALTRA | TWIN CRATERS | PRIMICIAS RANCH | PUERTO AYORA','DÍA 6 – QUITO – BALTRA | CRÁTERES GEMELOS | RANCHO PRIMICIAS | PUERTO AYORA'), description: ml('After breakfast, transfer to Mariscal Sucre International Airport for your flight to the Galápagos Islands.\n\nUpon arrival at Seymour Airport on Baltra Island, you will be welcomed by our representative and begin your Galápagos adventure.\n\nAfter crossing the Itabaca Channel to Santa Cruz Island, we will travel to the highlands to visit the famous Twin Craters (Los Gemelos). These impressive volcanic formations are surrounded by lush Scalesia forest.\n\nWe will then continue to Primicias Ranch, a private reserve where giant Galápagos tortoises can be observed roaming freely in their natural environment.\n\nAfter the excursion, we will continue to Puerto Ayora for hotel check-in and the remainder of the day at leisure.','Vuelo a Galápagos. Llegada a Baltra, cruce del Canal de Itabaca. Cráteres Gemelos y Rancho Primicias (tortugas gigantes). Check-in en Puerto Ayora.'), accommodation: ml('Santa Cruz Island – Puerto Ayora','Isla Santa Cruz – Puerto Ayora'), meals: ml('Breakfast','Desayuno'), transportation: ml('Private land transportation and airport shuttle','Transporte terrestre privado y shuttle') },
      { day: 7, title: ml('DAY 7 – FULL-DAY EXCURSION TO ISABELA ISLAND | TORTOISE BREEDING CENTER | FLAMINGO LAGOON | TINTORERAS','DÍA 7 – EXCURSIÓN FULL-DAY A ISABELA | CENTRO CRIANZA | FLAMINGOS | TINTORERAS'), description: ml('After breakfast, transfer to the pier to board a speedboat to Isabela Island. The navigation takes approximately 2 to 2.5 hours, depending on sea conditions.\n\nUpon arrival in Puerto Villamil, we will visit the Giant Tortoise Breeding Center and the Flamingo Lagoon.\n\nThe excursion will continue with a boat trip to Tintoreras Islet. During the snorkeling activity, you may have the opportunity to observe sea lions, sea turtles, rays, penguins and colorful tropical fish.\n\nAfter the excursion, we will return by speedboat to Santa Cruz Island and Puerto Ayora.','Lancha a Isabela (2-2.5h). Centro de Crianza de Tortugas y Laguna de Flamingos. Tarde: snorkel en Tintoreras. Retorno a Puerto Ayora.'), accommodation: ml('Santa Cruz Island – Puerto Ayora','Isla Santa Cruz – Puerto Ayora'), meals: ml('Breakfast and lunch','Desayuno y almuerzo'), activity: ml('Full-day guided excursion and snorkeling','Excursión guiada full-day y snorkeling'), transportation: ml('Shared speedboat and private land transportation','Lancha rápida compartida y transporte terrestre') },
      { day: 8, title: ml('DAY 8 – LA LOBERÍA | PUNTA ESTRADA | LAS GRIETAS','DÍA 8 – LA LOBERÍA | PUNTA ESTRADA | LAS GRIETAS'), description: ml('After breakfast, we will begin the day\'s activities with a visit to La Lobería, a coastal area famous for its resident population of Galápagos sea lions.\n\nWe will then continue to Punta Estrada, a beautiful coastal area surrounded by rocky formations and clear waters.\n\nThe excursion will continue to Las Grietas, a spectacular natural formation consisting of a narrow volcanic canyon filled with crystal-clear turquoise water. This is one of the most popular snorkeling and swimming sites near Puerto Ayora.\n\nAfter the visit, return to Puerto Ayora and enjoy the remainder of the day at leisure.','Visita a La Lobería (lobos marinos), Punta Estrada y Las Grietas (cañón volcánico para snorkel). Tarde libre en Puerto Ayora.'), accommodation: ml('Santa Cruz Island – Puerto Ayora','Isla Santa Cruz – Puerto Ayora'), meals: ml('Breakfast','Desayuno'), activity: ml('Guided excursion and snorkeling','Excursión guiada y snorkeling') },
      { day: 9, title: ml('DAY 9 – SANTA CRUZ | FREE DAY','DÍA 9 – SANTA CRUZ | DÍA LIBRE'), description: ml('After breakfast, enjoy a free day in Santa Cruz Island.\n\nThis day can be used to relax at the hotel, explore Puerto Ayora independently, visit local shops and restaurants, or simply enjoy the island at your own pace.\n\nOptional excursions and activities can be arranged upon request, depending on availability and local conditions.','Día libre en Santa Cruz para explorar Puerto Ayora, comprar recuerdos o simplemente descansar.'), accommodation: ml('Santa Cruz Island – Puerto Ayora','Isla Santa Cruz – Puerto Ayora'), meals: ml('Breakfast','Desayuno') },
      { day: 10, title: ml('DAY 10 – BALTRA AIRPORT | DEPARTURE | QUITO','DÍA 10 – AEROPUERTO BALTRA | SALIDA | QUITO'), description: ml('After breakfast, check out from the hotel and begin the transfer from Puerto Ayora to Baltra Airport.\n\nThe journey includes transportation across Santa Cruz Island and the crossing of the Itabaca Channel, followed by the airport shuttle to Seymour Airport.\n\nUpon arrival at the airport, assistance will be provided for your departure flight back to the mainland.','Desayuno, check-out y traslado a través de Santa Cruz hasta el Aeropuerto Seymour de Baltra. Vuelo de retorno a Quito.'), meals: ml('Breakfast','Desayuno'), transportation: ml('Private land transportation and airport shuttle','Transporte terrestre y shuttle') },
      { day: 11, title: ml('DAY 11 – QUITO | INTERNATIONAL DEPARTURE','DÍA 11 – QUITO | SALIDA INTERNACIONAL'), description: ml('After breakfast, check out from the hotel and meet your private driver for your transfer to Mariscal Sucre International Airport.\n\nAssistance will be provided for your departure flight and international connections.\n\nThis marks the end of your Ecuador and Galápagos Islands experience.','Desayuno, check-out y traslado privado al Aeropuerto Internacional de Quito para su vuelo de salida.'), meals: ml('Breakfast','Desayuno'), transportation: ml('Private airport transfer','Traslado privado al aeropuerto') },
    ],
  },

  {
    id: 'ecuador-galapagos-12days',
    title: ml('ECUADOR & GALÁPAGOS ISLANDS – 12 DAYS / 11 NIGHTS','ECUADOR E ISLAS GALÁPAGOS – 12 DÍAS / 11 NOCHES'),
    destination: ml('Ecuador & Galápagos Islands','Ecuador e Islas Galápagos'),
    duration: ml('12 DAYS / 11 NIGHTS','12 DÍAS / 11 NOCHES'),
    durationDays: 12,
    price: 2797, price3Star: 2797, price4Star: 2950,
    category: ml('Grand Amazon & Galápagos Adventure','Gran Amazonía y Aventura Galápagos'),
    description: ml(
      'The ultimate 12-day Ecuador & Galápagos adventure: Quito, Papallacta hot springs, Tena Amazon lodge with motorized canoe & Kichwa culture, Paikawe giant fish reserve, and 6 nights in the Galápagos exploring Santa Cruz, Isabela Island, Las Grietas, and Santa Fe or Pinzón Island.',
      'La aventura definitiva de 12 días: Quito, Termas de Papallacta, lodge amazónico en Tena con canoa y cultura Kichwa, Reserva Paikawe y 6 noches en Galápagos explorando Santa Cruz, Isabela, Las Grietas e Isla Santa Fe o Pinzón.',
    ),
    highlights: [
      ml('Quito Historic Center & Mitad del Mundo','Centro Histórico de Quito y Mitad del Mundo'),
      ml('Papallacta Hot Springs in the Andes','Termas de Papallacta en los Andes'),
      ml('Tena Amazon Lodge & Motorized Canoe','Lodge Amazónico en Tena y Canoa Motorizada'),
      ml('Wildlife Rescue Center & Kichwa Culture','Centro de Rescate y Cultura Kichwa'),
      ml('Paikawe Reserve & Giant Amazon Fish','Reserva Paikawe y Peces Gigantes del Amazonas'),
      ml('Santa Cruz Highlands & Giant Galápagos Tortoises','Tierras Altas de Santa Cruz y Tortugas Gigantes'),
      ml('Isabela Island, Flamingo Lagoon & Tintoreras','Isla Isabela, Laguna de Flamingos y Tintoreras'),
      ml('La Lobería, Las Grietas & Santa Fe / Pinzón Island','La Lobería, Las Grietas e Isla Santa Fe / Pinzón'),
    ],
    inclusions: [
      ml('Airport assistance and private transfers','Asistencia en aeropuerto y traslados privados'),
      ml('Private transportation throughout the continental itinerary','Transporte privado durante todo el itinerario continental'),
      ml('Professional English-speaking guide','Guía profesional bilingüe'),
      ml('11 nights of accommodation (3* or 4* hotels / Amazon lodge)','11 noches de alojamiento (hoteles 3★ o 4★ / Lodge amazónico)'),
      ml('Daily breakfast; lunch and dinner at Amazon lodge as specified','Desayunos diarios; almuerzo y cena en lodge amazónico según itinerario'),
      ml('Plane ticket (Quito – Baltra – Quito)','Boleto aéreo (Quito – Baltra – Quito)'),
      ml('Land and sea transportation in Galápagos','Transporte terrestre y marítimo en Galápagos'),
      ml('Level III Naturalist Guides in Galápagos','Guías Naturalistas Nivel III en Galápagos'),
      ml('Snorkeling equipment for Galápagos excursions','Equipo de snorkel en Galápagos'),
      ml('Isabela Dock Fee included','Tasa de muelle de Isabela incluida'),
    ],
    exclusions: [
      ml('Galápagos National Park entrance fee: USD 200.00 for foreign visitors','Entrada Parque Nacional: USD 200.00 extranjeros'),
      ml('Transit Control Card (TCT): USD 20.00','TCT: USD 20.00'),
      ml('Dinners in Galápagos','Cenas en Galápagos'),
      ml('Personal expenses and optional activities','Gastos personales y actividades opcionales'),
    ],
    itinerary: [
      { day: 1, title: ml('DAY 1 – ARRIVAL IN QUITO | AIRPORT ASSISTANCE & HOTEL TRANSFER','DÍA 1 – LLEGADA A QUITO'), description: ml('Upon arrival at Mariscal Sucre International Airport in Quito, you will be welcomed by our representative and assisted with your private transfer to the hotel.\n\nThe remainder of the day will be free to rest and acclimatize to the altitude of Quito.','Llegada al Aeropuerto de Quito, recepción y traslado al hotel. Día libre para descansar.'), accommodation: ml('Quito','Quito'), transportation: ml('Private transfer','Traslado privado'), meals: ml('Not included','No incluidas') },
      { day: 2, title: ml('DAY 2 – QUITO CITY TOUR & MITAD DEL MUNDO','DÍA 2 – CITY TOUR EN QUITO Y MITAD DEL MUNDO'), description: ml('After breakfast, we will explore Quito, declared a UNESCO World Heritage Site in 1978.\n\nOur city tour will include the historic center: Plaza Grande, Metropolitan Cathedral, Archbishop\'s Palace, Presidential Palace, Church of La Compañía de Jesús (famous for its gold-leaf interior), and San Francisco Square and Church.\n\nWe will then continue towards the Equator Monument and Mitad del Mundo. At the Intiñan Museum, you can learn about indigenous cultures and participate in fascinating experiments related to the Equator.','City tour por Quito colonial: Plaza Grande, Catedral, La Compañía de Jesús y San Francisco. Traslado a la Mitad del Mundo y Museo Intiñan.'), accommodation: ml('Quito','Quito'), activity: ml('5-hour guided tour','Tour guiado de 5 horas'), transportation: ml('Private transportation (4x4 vehicles or tourist buses)','Transporte privado'), meals: ml('Breakfast','Desayuno') },
      { day: 3, title: ml('DAY 3 – QUITO – PAPALLACTA – TENA | ANDEAN HIGHLANDS & THERMAL SPRINGS','DÍA 3 – QUITO – PAPALLACTA – TENA | TERMAS Y PÁRAMO ANDINO'), description: ml('After breakfast, we will travel east from Quito towards Papallacta, following a historic route once used by Spanish explorers in the 16th century in their search for gold and cinnamon.\n\nAlong the way, we will pass by Guápulo Church and continue through the spectacular Andean mountains, reaching elevations of approximately 4,100 meters / 13,450 feet above sea level.\n\nWe will stop at the famous Papallacta Hot Springs, where you can enjoy the thermal pools at different temperatures while admiring views of Antisana Volcano (5,704 meters / 18,714 feet). You may also choose to relax at the spa or take a short walk along the surrounding trails.\n\nAfter the visit, we will continue our descent towards the Amazon region and the town of Tena.','Cruce de los Andes a 4,100 m, pasando por Guápulo. Parada en las Termas de Papallacta con vistas al Antisana. Descenso a la Amazonía hasta Tena.'), accommodation: ml('Tena – Lodge','Tena – Lodge'), activity: ml('6-hour guided tour + approximately 1-hour nature walk. Elevation: from 4,100 m to 500 m','Tour de 6h + caminata de 1h'), transportation: ml('Private transportation (4x4 vehicles or tourist buses)','Transporte privado'), meals: ml('Breakfast','Desayuno') },
      { day: 4, title: ml('DAY 4 – TENA | AMAZON RAINFOREST | WILDLIFE RESCUE CENTER | KICHWA COMMUNITY','DÍA 4 – TENA | SELVA AMAZÓNICA | CENTRO DE RESCATE | COMUNIDAD KICHWA'), description: ml('After breakfast, we will begin our Amazon adventure with a motorized canoe ride along the river.\n\nOur first visit will be to a wildlife rescue and rehabilitation center, where you will learn about native Amazonian species and conservation efforts.\n\nWe will then continue into the primary rainforest, accompanied by a local native guide, for a hike through the jungle. The walk offers an opportunity to discover the incredible biodiversity of the Amazon.\n\nWe will also visit a local Kichwa family, where you will have the opportunity to learn about their traditions, customs and culture.\n\nOur final visit will be to a caiman lagoon, where we will learn about these fascinating reptiles.\n\nAfter the excursion, we will return to the lodge.','Canoa motorizada por el río amazónico. Centro de rescate de fauna. Caminata por la selva primaria con guía nativo. Visita cultural a familia Kichwa. Laguna de caimanes. Retorno al lodge.'), accommodation: ml('Tena – Lodge','Tena – Lodge'), activity: ml('6-hour guided tour + approximately 1-hour motorized canoe ride','Tour de 6h + canoa motorizada de 1h'), transportation: ml('Private transportation and motorized canoe','Transporte privado y canoa motorizada'), meals: ml('Breakfast, lunch and dinner','Desayuno, almuerzo y cena') },
      { day: 5, title: ml('DAY 5 – TENA – MISAHUALLÍ | PAIKAWE RESERVE | AMAZON LAGOON | QUITO','DÍA 5 – TENA – MISAHUALLÍ | RESERVA PAIKAWE | LAGUNA AMAZÓNICA | QUITO'), description: ml('After breakfast, we will visit Paikawe Reserve, a beautiful Amazonian natural area.\n\nWe will take a walk through primary rainforest, accompanied by a local guide, and learn about the biodiversity of the region.\n\nWe will then navigate the lagoon by canoe, where you may have the opportunity to observe some of the giant fish species found in the Amazon.\n\nAfter the visit, we will begin our return journey to Quito.','Visita a la Reserva Paikawe con caminata en selva primaria y navegación en canoa para observar peces gigantes del Amazonas. Retorno a Quito.'), accommodation: ml('Quito','Quito'), activity: ml('6-hour guided tour + approximately 1-hour rainforest hike','Tour de 6h + caminata de 1h'), transportation: ml('Private transportation (4x4 vehicles or tourist buses)','Transporte privado'), meals: ml('Breakfast','Desayuno') },
      { day: 6, title: ml('DAY 6 – QUITO | FREE DAY','DÍA 6 – QUITO | DÍA LIBRE'), description: ml('Today is free to enjoy Quito at your own pace.\n\nYou may choose to explore the city independently, visit additional museums, enjoy local cuisine, or simply relax at the hotel.\n\nThis free day also provides an opportunity to rest before continuing your journey to the Galápagos Islands the following day.','Día libre en Quito para explorar o descansar antes del vuelo a Galápagos.'), accommodation: ml('Quito','Quito'), meals: ml('Breakfast','Desayuno') },
      { day: 7, title: ml('DAY 7 – QUITO – BALTRA | TWIN CRATERS | PRIMICIAS RANCH | PUERTO AYORA','DÍA 7 – QUITO – BALTRA | CRÁTERES GEMELOS | RANCHO PRIMICIAS | PUERTO AYORA'), description: ml('After breakfast, transfer to Mariscal Sucre International Airport for your flight to the Galápagos Islands.\n\nUpon arrival at Seymour Airport on Baltra Island, you will be welcomed by our representative.\n\nAfter crossing the Itabaca Channel to Santa Cruz Island, we will continue towards the highlands to visit the famous Twin Craters (Los Gemelos) and the Scalesia forest.\n\nWe will then continue to Primicias Ranch, where giant Galápagos tortoises roam freely.\n\nAfter the excursion, we will continue to Puerto Ayora for hotel check-in and the remainder of the day at leisure.','Vuelo a Galápagos. Llegada a Baltra, cruce del Canal de Itabaca. Cráteres Gemelos y Rancho Primicias (tortugas gigantes). Check-in en Puerto Ayora.'), accommodation: ml('Santa Cruz Island – Puerto Ayora','Isla Santa Cruz – Puerto Ayora'), meals: ml('Breakfast','Desayuno'), transportation: ml('Private land transportation and airport shuttle','Transporte terrestre y shuttle') },
      { day: 8, title: ml('DAY 8 – SANTA CRUZ TO ISABELA | FLAMINGO LAGOON | TORTOISE BREEDING CENTER | TINTORERAS','DÍA 8 – SANTA CRUZ A ISABELA | FLAMINGOS | CENTRO CRIANZA | TINTORERAS'), description: ml('After breakfast, we will transfer to the pier to board a speedboat to Isabela Island. The crossing takes approximately 2 to 2.5 hours.\n\nUpon arrival in Puerto Villamil, we will begin our exploration of Isabela: the Flamingo Lagoon and the Giant Tortoise Breeding Center.\n\nIn the afternoon, we will take a boat excursion to Tintoreras Islet for snorkeling with sea lions, sea turtles, rays, colorful tropical fish and Galápagos penguins.\n\nAfter the excursion, return to Puerto Villamil and enjoy the evening at leisure.','Lancha a Isabela (2-2.5h). Laguna de Flamingos y Centro de Crianza. Tarde: snorkel en Tintoreras. Noche en Puerto Villamil.'), accommodation: ml('Isabela Island – Puerto Villamil','Isla Isabela – Puerto Villamil'), meals: ml('Breakfast','Desayuno'), activity: ml('Full-day guided excursion and snorkeling','Excursión guiada full-day y snorkeling'), transportation: ml('Shared speedboat and local land transportation','Lancha rápida y transporte local') },
      { day: 9, title: ml('DAY 9 – ISABELA TO SANTA CRUZ | LA LOBERÍA | LAS GRIETAS','DÍA 9 – ISABELA A SANTA CRUZ | LA LOBERÍA | LAS GRIETAS'), description: ml('After breakfast, we will return to the pier for the speedboat transfer back to Santa Cruz Island.\n\nUpon arrival in Puerto Ayora, we will visit La Lobería, a small coastal area known for its Galápagos sea lions.\n\nWe will then visit Las Grietas, a spectacular volcanic canyon filled with clear, turquoise water and one of the most popular swimming and snorkeling sites near Puerto Ayora.\n\nAfter the excursion, return to Puerto Ayora. The afternoon and evening will be free to relax or explore the town.','Lancha de regreso a Santa Cruz. La Lobería: lobos marinos. Las Grietas: cañón volcánico cristalino para nadar y snorkelear. Tarde libre en Puerto Ayora.'), accommodation: ml('Santa Cruz Island – Puerto Ayora','Isla Santa Cruz – Puerto Ayora'), meals: ml('Breakfast','Desayuno'), activity: ml('Guided excursion and snorkeling','Excursión guiada y snorkeling'), transportation: ml('Speedboat and private/local land transportation','Lancha rápida y transporte terrestre') },
      { day: 10, title: ml('DAY 10 – FULL-DAY EXCURSION TO SANTA FE OR PINZÓN ISLAND','DÍA 10 – EXCURSIÓN FULL-DAY A SANTA FE O ISLA PINZÓN'), description: ml('Today, enjoy a full-day boat excursion to Santa Fe Island or Pinzón Island, depending on availability, sea conditions and the selected tour.\n\nSanta Fe Island is known for its turquoise waters, white sandy beaches and endemic wildlife including the Santa Fe land iguana.\n\nPinzón Island is a spectacular snorkeling destination with sea turtles, sea lions, rays, sharks, and schools of tropical fish.\n\nThe day will include navigation, snorkeling and opportunities to observe wildlife both above and below the water.\n\nReturn to Puerto Ayora in the afternoon.','Excursión full-day a Isla Santa Fe o Isla Pinzón para snorkeling de alta biodiversidad. Almuerzo a bordo. Retorno a Puerto Ayora.'), accommodation: ml('Santa Cruz Island – Puerto Ayora','Isla Santa Cruz – Puerto Ayora'), meals: ml('Breakfast and lunch','Desayuno y almuerzo'), activity: ml('Full-day boat excursion and snorkeling','Excursión en barco de día completo y snorkel') },
      { day: 11, title: ml('DAY 11 – SANTA CRUZ – BALTRA AIRPORT | DEPARTURE','DÍA 11 – SANTA CRUZ – AEROPUERTO BALTRA | SALIDA'), description: ml('After breakfast, check out from the hotel and begin the transfer from Puerto Ayora to Baltra Airport.\n\nThe journey includes transportation across Santa Cruz Island and the crossing of the Itabaca Channel, followed by the airport shuttle to Seymour Airport (Baltra).\n\nAssistance will be provided for your departure flight.','Desayuno, check-out y traslado a través de Santa Cruz hasta el Aeropuerto Seymour de Baltra.'), meals: ml('Breakfast','Desayuno'), transportation: ml('Private land transportation and airport shuttle','Transporte terrestre y shuttle') },
      { day: 12, title: ml('DAY 12 – QUITO | INTERNATIONAL DEPARTURE','DÍA 12 – QUITO | SALIDA INTERNACIONAL'), description: ml('After breakfast, check out from the hotel and meet your private driver for your transfer to Mariscal Sucre International Airport.\n\nAssistance will be provided for your departure flight and international connections.\n\nThis marks the end of your Ecuador and Galápagos Islands experience.','Desayuno, check-out y traslado privado al Aeropuerto Internacional de Quito. Fin de los servicios.'), meals: ml('Breakfast','Desayuno'), transportation: ml('Private airport transfer','Traslado privado') },
    ],
  },

  {
    id: 'ecuador-fantastic-8days',
    title: ml('ECUADOR FANTASTIC – 8 DAYS / 7 NIGHTS','ECUADOR FANTÁSTICO – 8 DÍAS / 7 NOCHES'),
    destination: ml('Ecuador','Ecuador'),
    duration: ml('8 DAYS / 7 NIGHTS','8 DÍAS / 7 NOCHES'),
    durationDays: 8,
    price: 1512, price3Star: 1512, price4Star: 1799,
    category: ml('Grand Mainland Expedition','Gran Expedición Continental'),
    description: ml(
      'Discover the Best of Ecuador in 8 Days: Quito, Otavalo market, Cuicocha lake, Mitad del Mundo, Baños & Pailón del Diablo, Chimborazo Volcano (6,310m), Ingapirca Inca ruins, colonial Cuenca, Cajas National Park, and finishing in Guayaquil.',
      'Lo mejor de Ecuador en 8 días: Quito, mercado de Otavalo, laguna de Cuicocha, Mitad del Mundo, Baños y Pailón del Diablo, Volcán Chimborazo (6,310m), ruinas de Ingapirca, Cuenca colonial, Parque Nacional Cajas y Guayaquil.',
    ),
    highlights: [
      ml('Otavalo Indigenous Market & Cuicocha Crater Lake','Mercado de Otavalo y Laguna de Cuicocha'),
      ml('Quito UNESCO Historic Center & Equator Monument','Centro Histórico de Quito y Mitad del Mundo'),
      ml('Baños de Agua Santa & Pailón del Diablo Waterfall','Baños y Cascada Pailón del Diablo'),
      ml('Chimborazo National Reserve (6,310m)','Reserva Nacional Chimborazo (6,310 m)'),
      ml('Ingapirca Inca Archaeological Complex','Complejo Arqueológico Inca de Ingapirca'),
      ml('Colonial Cuenca & Cajas National Park','Cuenca Colonial y Parque Nacional Cajas'),
    ],
    inclusions: [
      ml('Airport assistance and private transfers','Asistencia en aeropuerto y traslados privados'),
      ml('Private transportation throughout the itinerary','Transporte privado durante todo el itinerario'),
      ml('Professional English-speaking guide','Guía profesional bilingüe'),
      ml('7 nights of accommodation at 3* or 4* hotels','7 noches de alojamiento en hoteles 3★ o 4★'),
      ml('Daily breakfast','Desayunos diarios'),
      ml('Entrance fees: Cuicocha, La Compañía, Intiñan, Pailón del Diablo, Chimborazo, Ingapirca, Cajas','Entradas: Cuicocha, La Compañía, Intiñan, Pailón del Diablo, Chimborazo, Ingapirca, Cajas'),
    ],
    exclusions: [
      ml('Meals not specified in the itinerary','Comidas no especificadas'),
      ml('Personal expenses and optional activities','Gastos personales y actividades opcionales'),
    ],
    itinerary: [
      { day: 1, title: ml('DAY 1 – ARRIVAL IN QUITO','DÍA 1 – LLEGADA A QUITO'), description: ml('Airport assistance and private transfer to your hotel.\n\nImportant: Ecuador uses the US dollar (USD) as its official currency.','Asistencia en aeropuerto y traslado privado al hotel en Quito.'), accommodation: ml('Quito','Quito') },
      { day: 2, title: ml('DAY 2 – OTAVALO INDIGENOUS MARKET & CUICOCHA CRATER LAKE','DÍA 2 – MERCADO INDÍGENA DE OTAVALO Y LAGUNA DE CUICOCHA'), description: ml('Travel north from Quito for approximately two hours through beautiful Andean landscapes until reaching Otavalo, home to one of the most famous indigenous markets in South America, renowned for its traditional handicrafts, textiles and local products.\n\nIn the afternoon, continue to Cotacachi, a town famous for its high-quality leather goods.\n\nWe will then visit Cuicocha Crater Lake, one of Ecuador\'s most spectacular volcanic lakes.\n\nReturn to Quito in the afternoon.\n\nMarket information: The largest Otavalo market takes place on Saturdays, although a smaller market operates daily.','Viaje a Otavalo y mercado artesanal de la Plaza de los Ponchos. Cotacachi (artesanías de cuero) y Laguna volcánica de Cuicocha. Retorno a Quito.'), accommodation: ml('Quito','Quito'), activity: ml('8-hour guided tour','Tour guiado de 8 horas'), transportation: ml('Private vehicle (4x4 or tourist bus)','Vehículo privado'), meals: ml('Breakfast','Desayuno') },
      { day: 3, title: ml('DAY 3 – QUITO HISTORIC CENTER & MITAD DEL MUNDO','DÍA 3 – CENTRO HISTÓRICO DE QUITO Y MITAD DEL MUNDO'), description: ml('Discover Quito, declared a UNESCO World Heritage Site and one of the most beautiful historic cities in the Americas.\n\nExplore both the modern and colonial areas of the city: Quito Cathedral, Archbishop\'s Palace, Presidential Palace, Plaza Grande, La Compañía de Jesús Church (with its richly decorated golden interior), and San Francisco Plaza and Church.\n\nWe will then travel to Mitad del Mundo, where you can experience standing on the Equator. Visit the Intiñan Museum with its interactive demonstrations related to Ecuadorian culture and the Equator.','Centro Histórico de Quito (Patrimonio UNESCO): Catedral, Palacio Presidencial, La Compañía de Jesús y San Francisco. Mitad del Mundo y Museo Intiñan.'), accommodation: ml('Quito','Quito'), activity: ml('6-hour guided tour','Tour guiado de 6 horas'), transportation: ml('Private vehicle (4x4 or tourist bus)','Vehículo privado'), meals: ml('Breakfast','Desayuno') },
      { day: 4, title: ml('DAY 4 – QUITO – BAÑOS: THE AVENUE OF VOLCANOES','DÍA 4 – QUITO – BAÑOS: LA AVENIDA DE LOS VOLCANES'), description: ml('Travel south from Quito along the famous Avenue of the Volcanoes.\n\nContinue to Baños de Agua Santa, a picturesque adventure town at the foot of the active Tungurahua Volcano. Baños offers cycling, rafting, hiking, cable-car rides, and horseback riding.\n\nVisit the famous Pailón del Diablo Waterfall before settling into your hotel.','Viaje al sur por la Avenida de los Volcanes hasta Baños. Visita a la cascada Pailón del Diablo. Tarde libre en Baños.'), accommodation: ml('Baños','Baños'), activity: ml('8-hour guided tour','Tour guiado de 8 horas'), transportation: ml('Private vehicle (4x4 or tourist bus)','Vehículo privado'), meals: ml('Breakfast','Desayuno') },
      { day: 5, title: ml('DAY 5 – CHIMBORAZO NATIONAL RESERVE, INGAPIRCA & CUENCA','DÍA 5 – RESERVA CHIMBORAZO, INGAPIRCA Y CUENCA'), description: ml('Start early with a visit to the Chimborazo Reserve, home to Chimborazo Volcano, Ecuador\'s highest mountain at approximately 6,310 meters (20,700 ft) above sea level.\n\nEnjoy the opportunity to observe the unique flora and fauna of the high Andean páramo and hike toward the mountain refuge at approximately 5,000 meters, weather permitting.\n\nContinue toward Cuenca, with a fascinating stop at Ingapirca, Ecuador\'s most important Inca archaeological complex.','Visita temprana a la Reserva Chimborazo con caminata hacia el refugio (6,310m). Parada en Ingapirca (complejo arqueológico Inca). Llegada a Cuenca.'), accommodation: ml('Cuenca','Cuenca'), activity: ml('8-hour guided tour','Tour guiado de 8 horas'), transportation: ml('Private vehicle (4x4 or tourist bus)','Vehículo privado'), meals: ml('Breakfast','Desayuno') },
      { day: 6, title: ml('DAY 6 – CUENCA CITY TOUR','DÍA 6 – CITY TOUR EN CUENCA'), description: ml('Discover Cuenca, another UNESCO World Heritage Site and one of Ecuador\'s most beautiful cities.\n\nVisit: Cuenca Cathedral, Plaza de las Flores, a traditional toquilla straw hat workshop (commonly known as "Panama hats"), El Barranco along the Tomebamba River, and modern Cuenca.\n\nFinish the tour at El Turi Viewpoint with panoramic views over the city.\n\nThe remainder of the afternoon is free to explore Cuenca at your own pace.','Descubrimiento de Cuenca (Patrimonio UNESCO): Catedral, Plaza de las Flores, taller de sombreros de toquilla, El Barranco y mirador El Turi. Tarde libre.'), accommodation: ml('Cuenca','Cuenca'), activity: ml('3-hour guided tour','Tour guiado de 3 horas'), transportation: ml('Private vehicle (4x4 or tourist bus)','Vehículo privado'), meals: ml('Breakfast','Desayuno') },
      { day: 7, title: ml('DAY 7 – CUENCA – CAJAS NATIONAL PARK – GUAYAQUIL','DÍA 7 – CUENCA – PARQUE NACIONAL CAJAS – GUAYAQUIL'), description: ml('Depart Cuenca and travel west through the spectacular Cajas National Park, famous for its rugged Andean landscapes and approximately 200 natural lakes and lagoons.\n\nDepending on weather and trail conditions, enjoy a hike around Laguna Toreadora, observing the distinctive flora and fauna of Ecuador\'s high-altitude páramo ecosystem.\n\nFrom the high Andes, the road descends dramatically toward sea level, arriving in Guayaquil, Ecuador\'s largest port city.','Salida hacia el Parque Nacional Cajas con caminata por la Laguna Toreadora (200 lagunas y páramo andino). Descenso espectacular hasta Guayaquil.'), accommodation: ml('Guayaquil','Guayaquil'), activity: ml('6-hour guided tour, including approximately 2 hours of hiking','Tour de 6h con 2h de caminata'), transportation: ml('Private vehicle (4x4 or tourist bus)','Vehículo privado'), meals: ml('Breakfast','Desayuno') },
      { day: 8, title: ml('DAY 8 – DEPARTURE FROM GUAYAQUIL','DÍA 8 – SALIDA DESDE GUAYAQUIL'), description: ml('Private transfer to José Joaquín de Olmedo International Airport in Guayaquil for your onward flight or connection to the Galápagos Islands.\n\nEnd of the Ecuador Fantastic journey.','Traslado privado al Aeropuerto Internacional de Guayaquil para vuelo de salida o conexión a Galápagos.') },
    ],
  },

  {
    id: 'snow-volcanoes-6days',
    title: ml('SNOW-CAPPED VOLCANOES & WATERFALLS','VOLCANES NEVADOS Y CASCADAS'),
    destination: ml('Ecuador','Ecuador'),
    duration: ml('6 DAYS / 5 NIGHTS','6 DÍAS / 5 NOCHES'),
    durationDays: 6,
    price: 1102, price3Star: 1102, price4Star: 1300,
    category: ml('Andean Highlights & Waterfalls','Aventura Andina y Cascadas'),
    description: ml(
      '6-day overland journey traversing the Avenue of the Volcanoes, adventure town of Baños, Pailón del Diablo waterfall, Pastaza canyon, Puyo rainforest biopark with Yanacocha & Hola Vida waterfall, and Quilotoa turquoise crater lake.',
      'Recorrido de 6 días por la Avenida de los Volcanes, Baños, Pailón del Diablo, cañón del Pastaza, Bioparque Yanacocha y Cascada Hola Vida en Puyo, y Laguna del Quilotoa.',
    ),
    highlights: [
      ml('Avenue of the Volcanoes & Baños de Agua Santa','Avenida de los Volcanes y Baños de Agua Santa'),
      ml('Pailón del Diablo Mega Waterfall','Cascada Pailón del Diablo'),
      ml('Puyo Amazon Rainforest & Yanacocha Biopark','Selva de Puyo y Bioparque Yanacocha'),
      ml('Hola Vida Waterfall & Indigenous Community','Cascada Hola Vida y Comunidad Indígena'),
      ml('Quilotoa Emerald Crater Lake','Laguna de Quilotoa'),
    ],
    inclusions: [
      ml('Airport assistance and private transfers','Asistencia en aeropuerto y traslados privados'),
      ml('Private transportation (4x4 vehicles or tourist buses)','Transporte privado'),
      ml('Professional English-speaking guide','Guía profesional bilingüe'),
      ml('5 nights of accommodation (3* or 4* hotels)','5 noches de alojamiento (hoteles 3★ o 4★)'),
      ml('Daily breakfast and lunch in Puyo','Desayunos diarios y almuerzo en Puyo'),
      ml('Entrances: Pailón del Diablo, Yanacocha, Hola Vida, Quilotoa','Entradas: Pailón del Diablo, Yanacocha, Hola Vida, Quilotoa'),
    ],
    exclusions: [
      ml('Personal expenses and optional activities in Baños','Gastos personales y actividades opcionales en Baños'),
    ],
    itinerary: [
      { day: 1, title: ml('DAY 1 – ARRIVAL IN QUITO','DÍA 1 – LLEGADA A QUITO'), description: ml('Airport assistance and private transfer to your hotel.\n\nDeparture: The tour can begin on any day of the week.','Asistencia en aeropuerto y traslado privado al hotel en Quito.'), accommodation: ml('Quito','Quito'), transportation: ml('Private transportation (4x4 vehicles or tourist buses)','Transporte privado') },
      { day: 2, title: ml('DAY 2 – QUITO – BAÑOS','DÍA 2 – QUITO – BAÑOS'), description: ml('Today, we travel south along the Pan-American Highway and through Ecuador\'s famous "Avenue of the Volcanoes," home to approximately 62 volcanoes.\n\nWe continue toward Baños, a charming tourist town located at the foothills of the active Tungurahua Volcano. Baños offers cycling, rafting, horseback riding, cable-car rides, hiking, and visits to beautiful waterfalls.\n\nWe will visit the spectacular Pailón del Diablo Waterfall, one of the region\'s most impressive natural attractions.','Viaje por la Avenida de los Volcanes hacia Baños de Agua Santa. Visita y caminata a la majestuosa cascada Pailón del Diablo.'), accommodation: ml('Baños','Baños'), activity: ml('8-hour guided tour','Tour guiado de 8 horas'), transportation: ml('Private transportation (4x4 vehicles or tourist buses)','Transporte privado'), meals: ml('Breakfast','Desayuno') },
      { day: 3, title: ml('DAY 3 – BAÑOS – AMAZON RAINFOREST – PUYO','DÍA 3 – BAÑOS – SELVA AMAZÓNICA – PUYO'), description: ml('In the morning, we head into the Amazon rainforest, traveling through the spectacular Pastaza River Canyon toward the city of Puyo.\n\nOur first stop is Yanacocha Biopark, where you will have the opportunity to observe and learn about local animal species that have been rescued from illegal wildlife trafficking.\n\nWe then continue with a hike through the Amazon rainforest to Hola Vida Waterfall, surrounded by lush vegetation and tropical scenery.\n\nFinally, we visit a local Indigenous family, where we will learn about their traditions, culture, and way of life.\n\nAfter the visit, we return to Baños.','Viaje por el Cañón del Pastaza hacia Puyo. Bioparque Yanacocha, caminata a la Cascada Hola Vida y visita a familia indígena Kichwa. Retorno a Baños.'), accommodation: ml('Baños','Baños'), activity: ml('6-hour guided tour + 2-hour rainforest hike','Tour de 6h + caminata de 2h'), transportation: ml('Private transportation (4x4 vehicles or tourist buses)','Transporte privado'), meals: ml('Breakfast and lunch','Desayuno y almuerzo') },
      { day: 4, title: ml('DAY 4 – BAÑOS – QUILOTOA – QUITO','DÍA 4 – BAÑOS – QUILOTOA – QUITO'), description: ml('In the morning, we begin our journey back to Quito. Along the way, we visit the spectacular Quilotoa Crater Lake, one of Ecuador\'s most iconic natural attractions.\n\nYou will have the opportunity to hike approximately two hours toward the bottom of the crater. Along the way, we may also stop at the traditional village of Tigua, famous for its colorful paintings and Andean artistic traditions, as well as local guinea pig farms.\n\nWe then continue to Quito.','Viaje al cráter volcánico de Quilotoa con caminata. Parada en el pueblo de pintores de Tigua y retorno a Quito.'), accommodation: ml('Quito','Quito'), activity: ml('6-hour guided tour + 2-hour hike. Altitude: approximately 3,500 m / 11,483 ft','Tour de 6h + caminata de 2h'), transportation: ml('Private transportation (4x4 vehicles or tourist buses)','Transporte privado'), meals: ml('Breakfast','Desayuno') },
      { day: 5, title: ml('DAY 5 – FREE DAY IN QUITO','DÍA 5 – DÍA LIBRE EN QUITO'), description: ml('Enjoy a free day to explore Quito at your own pace, relax, or discover more of the city\'s attractions and cultural highlights.','Día libre en Quito.'), accommodation: ml('Quito','Quito'), meals: ml('Breakfast','Desayuno') },
      { day: 6, title: ml('DAY 6 – TRANSFER TO THE AIRPORT','DÍA 6 – TRASLADO AL AEROPUERTO'), description: ml('Private transfer to the airport for your onward flight connections, including connections to the Galápagos Islands.\n\nEnd of the tour.','Traslado privado al aeropuerto para vuelo de conexión o salida.'), transportation: ml('Private transportation (4x4 vehicles or tourist buses)','Transporte privado') },
    ],
  },

  {
    id: 'volcanoes-rivers-8days',
    title: ml('ECUADOR: VOLCANOES & RIVERS','ECUADOR: VOLCANES Y RÍOS'),
    destination: ml('Ecuador','Ecuador'),
    duration: ml('8 DAYS / 7 NIGHTS','8 DÍAS / 7 NOCHES'),
    durationDays: 8,
    price: 1543, price3Star: 1543, price4Star: 1800,
    category: ml('Andes & Amazon Overland','Andes y Amazonía Overland'),
    description: ml(
      '8-day overland connecting Quito, Equator Line, Papallacta thermal springs, Tena Amazon lodge with motorized canoe, Yanacocha biopark in Puyo, Baños & Pailón del Diablo waterfall, and Quilotoa crater lake.',
      'Travesía de 8 días: Quito, Mitad del Mundo, Termas de Papallacta, lodge amazónico en Tena con canoa, Bioparque Yanacocha en Puyo, Pailón del Diablo en Baños y laguna del Quilotoa.',
    ),
    highlights: [
      ml('Quito UNESCO Historic Center & Equator Line','Centro Histórico de Quito y Mitad del Mundo'),
      ml('Papallacta Thermal Hot Springs & Antisana Views','Termas de Papallacta y Vistas del Antisana'),
      ml('Tena Amazon Lodge, Canoe & Caiman Lagoon','Lodge en Tena, Canoa y Laguna de Caimanes'),
      ml('Yanacocha Biopark & Pailón del Diablo Waterfall','Bioparque Yanacocha y Pailón del Diablo'),
      ml('Quilotoa Emerald Crater Lake','Laguna de Quilotoa'),
    ],
    inclusions: [
      ml('Airport assistance and private transfers','Asistencia en aeropuerto y traslados privados'),
      ml('Private transportation (4x4 vehicles or tourist buses)','Transporte privado'),
      ml('Professional English-speaking guide','Guía profesional bilingüe'),
      ml('7 nights of accommodation (3* or 4* hotels / Amazon lodge)','7 noches de alojamiento'),
      ml('Daily breakfast, plus lunches and dinner at Amazon lodge','Desayunos diarios, almuerzo y cena en lodge amazónico'),
      ml('Entrances: La Compañía, Intiñan, Papallacta, Yanacocha, Pailón del Diablo, Quilotoa','Entradas: La Compañía, Intiñan, Papallacta, Yanacocha, Pailón del Diablo, Quilotoa'),
    ],
    exclusions: [
      ml('Personal expenses and optional activities in Baños','Gastos personales y actividades opcionales en Baños'),
      ml('Meals not specified in the itinerary','Comidas no especificadas'),
    ],
    itinerary: [
      { day: 1, title: ml('DAY 1 – ARRIVAL IN QUITO','DÍA 1 – LLEGADA A QUITO'), description: ml('Airport Transfer (IN): Welcome at Quito International Airport and private transfer to your hotel.','Recepción en el Aeropuerto Internacional de Quito y traslado privado al hotel.'), accommodation: ml('Quito','Quito'), transportation: ml('Private transportation (4x4 vehicles or tourist buses)','Transporte privado') },
      { day: 2, title: ml('DAY 2 – QUITO CITY TOUR & EQUATOR LINE','DÍA 2 – CITY TOUR EN QUITO Y LÍNEA ECUATORIAL'), description: ml('Quito was declared a UNESCO World Cultural Heritage Site in 1978 and is considered one of the most beautiful cities in the Americas.\n\nWe explore both the modern and historic areas of Quito, visiting the Cathedral, the Archbishop\'s Palace, the Presidential Palace, La Compañía de Jesús (decorated with gold leaf), and San Francisco Square and Church.\n\nWe then continue to the Middle of the World (Mitad del Mundo), where we visit the Intiñan Museum for fascinating Equator experiments.','Visita guiada al centro histórico de Quito (Patrimonio UNESCO). Mitad del Mundo y Museo Intiñan.'), accommodation: ml('Quito','Quito'), activity: ml('5-hour guided tour','Tour guiado de 5 horas'), transportation: ml('Private transportation (4x4 vehicles or tourist buses)','Transporte privado'), meals: ml('Breakfast','Desayuno') },
      { day: 3, title: ml('DAY 3 – QUITO – PAPALLACTA – AMAZON RAINFOREST','DÍA 3 – QUITO – PAPALLACTA – SELVA AMAZÓNICA'), description: ml('We travel approximately two hours east of Quito along a historic route used by Spanish explorers in the 16th century. Along the way, we pass by Guápulo Church and cross the Andes at approximately 4,100 meters above sea level.\n\nWe stop at the famous Papallacta Hot Springs, where you can relax in thermal pools with different temperatures while enjoying spectacular views of Antisana Volcano (5,704 m), visit the spa, or explore walking trails.\n\nWe then continue our descent toward the Amazon rainforest and the lodge in Tena.','Cruce de los Andes a 4,100 m. Parada en las Termas de Papallacta con vistas al Antisana. Descenso a la Amazonía hasta el lodge en Tena.'), accommodation: ml('Tena Lodge','Tena Lodge'), activity: ml('6-hour guided tour; 1-hour hike at Papallacta','Tour de 6 horas; caminata de 1h en Papallacta'), transportation: ml('Private transportation (4x4 vehicles or tourist buses)','Transporte privado'), meals: ml('Breakfast','Desayuno') },
      { day: 4, title: ml('DAY 4 – TENA & AMAZON RAINFOREST','DÍA 4 – TENA Y SELVA AMAZÓNICA'), description: ml('In the morning, we board a motorized canoe and travel downstream to visit an Amazon rainforest wildlife rescue center, where we learn about local wildlife and conservation efforts.\n\nWe then explore primary rainforest on foot, accompanied by a local guide, discovering the incredible biodiversity of the Amazon.\n\nWe also visit a local Kichwa family and learn about their traditions, culture, and way of life.\n\nFinally, we visit a caiman lagoon to observe these fascinating Amazonian reptiles.\n\nWe then return to the lodge.','Canoa motorizada, centro de rescate de fauna, caminata en selva primaria, visita a familia Kichwa y laguna de caimanes.'), accommodation: ml('Tena Lodge','Tena Lodge'), activity: ml('6-hour guided tour + 1-hour motorized canoe ride','Tour de 6h + canoa de 1h'), transportation: ml('Private transportation (4x4 vehicles or tourist buses)','Transporte privado'), meals: ml('Breakfast, lunch, and dinner','Desayuno, almuerzo y cena') },
      { day: 5, title: ml('DAY 5 – TENA – PUYO – BAÑOS','DÍA 5 – TENA – PUYO – BAÑOS'), description: ml('In the morning, we travel south toward the city of Puyo. Along the way, we visit Yanacocha Biopark, where we learn about Amazonian wildlife rescued from illegal trafficking.\n\nWe then continue toward Baños along the spectacular Route of the Waterfalls. We will have the opportunity to hike to Pailón del Diablo, one of the most impressive waterfalls in Ecuador.\n\nWe continue to Baños for our overnight stay.','Viaje hacia Puyo y Bioparque Yanacocha. Ruta de las Cascadas y caminata al Pailón del Diablo. Llegada a Baños.'), accommodation: ml('Baños','Baños'), activity: ml('6-hour guided tour','Tour guiado de 6 horas'), transportation: ml('Private transportation (4x4 vehicles or tourist buses)','Transporte privado'), meals: ml('Breakfast','Desayuno') },
      { day: 6, title: ml('DAY 6 – BAÑOS – FREE DAY','DÍA 6 – BAÑOS – DÍA LIBRE'), description: ml('Enjoy a free day in Baños. You can enjoy optional activities at your own expense, including: cycling, white-water rafting, waterfall hikes, cable-car rides (tarabita), and horseback riding.','Día libre en Baños para actividades de aventura opcionales: ciclismo, rafting, tarabitas, termas o cabalgatas.'), accommodation: ml('Baños','Baños'), meals: ml('Breakfast','Desayuno') },
      { day: 7, title: ml('DAY 7 – BAÑOS – QUILOTOA – QUITO','DÍA 7 – BAÑOS – QUILOTOA – QUITO'), description: ml('In the morning, we begin our journey toward Quito. Along the way, we visit the spectacular Quilotoa Crater Lake, famous for its breathtaking scenery and turquoise waters.\n\nYou will have the opportunity to hike approximately two hours toward the bottom of the crater.\n\nWe may also make a stop in the traditional village of Tigua, famous for its colorful Andean paintings and local guinea pig farms.\n\nWe then continue to Quito.','Visita a la Laguna del Cráter de Quilotoa con caminata. Parada en Tigua. Retorno a Quito.'), accommodation: ml('Quito','Quito'), activity: ml('6-hour guided tour + 2-hour hike. Altitude: approximately 3,500 m','Tour de 6h + caminata de 2h'), transportation: ml('Private transportation (4x4 vehicles or tourist buses)','Transporte privado'), meals: ml('Breakfast','Desayuno') },
      { day: 8, title: ml('DAY 8 – TRANSFER TO THE AIRPORT','DÍA 8 – TRASLADO AL AEROPUERTO'), description: ml('Private transfer to the airport for your onward flight connections to the Galápagos Islands.\n\nEnd of the tour.','Traslado privado al aeropuerto para vuelo de conexión o salida.'), transportation: ml('Private transportation (4x4 vehicles or tourist buses)','Transporte privado') },
    ],
  },

  {
    id: 'andes-amazon-7days',
    title: ml('ECUADOR: ANDES & AMAZON RAINFOREST','ECUADOR: ANDES Y SELVA AMAZÓNICA'),
    destination: ml('Ecuador','Ecuador'),
    duration: ml('7 DAYS / 6 NIGHTS','7 DÍAS / 6 NOCHES'),
    durationDays: 7,
    price: 1307, price3Star: 1307, price4Star: 1600,
    category: ml('Andes & Amazon Expedition','Expedición Andes y Amazonía'),
    description: ml(
      '7-day immersive journey: Quito colonial heritage, Equator line, Papallacta thermal springs, Tena jungle lodge, motorized canoe expeditions, Kichwa cultural encounter, and Paikawe Amazon reserve giant fish lagoon.',
      'Inmersión de 7 días: Quito colonial, Mitad del Mundo, Termas de Papallacta, lodge en la selva de Tena, canoa motorizada, vivencia cultural Kichwa y Reserva Paikawe.',
    ),
    highlights: [
      ml('Quito UNESCO Historic Center & Mitad del Mundo','Centro Histórico de Quito y Mitad del Mundo'),
      ml('Papallacta Thermal Hot Springs in the Andes','Termas de Papallacta en los Andes'),
      ml('Tena Amazon Lodge & Motorized River Canoe','Lodge en Tena y Canoa Motorizada'),
      ml('Amazon Wildlife Rescue Center & Kichwa Culture','Centro de Rescate y Cultura Kichwa'),
      ml('Paikawe Reserve Giant Fish Lagoon','Laguna de Peces Gigantes de Paikawe'),
    ],
    inclusions: [
      ml('Airport reception and private transfers','Recepción en aeropuerto y traslados privados'),
      ml('Private transportation (4x4 vehicles or tourist buses)','Transporte privado'),
      ml('Professional English-speaking guide','Guía profesional bilingüe'),
      ml('6 nights of accommodation (3* or 4* hotels / Amazon lodge)','6 noches de alojamiento'),
      ml('Daily breakfast, plus lunch and dinner at Amazon lodge','Desayunos diarios, almuerzo y cena en lodge amazónico'),
      ml('Entrances: La Compañía, Intiñan, Papallacta, Rescue Center, Paikawe','Entradas: La Compañía, Intiñan, Papallacta, Centro de Rescate, Paikawe'),
    ],
    exclusions: [
      ml('Personal expenses and services not specified','Gastos personales y servicios no especificados'),
    ],
    itinerary: [
      { day: 1, title: ml('DAY 1 – ARRIVAL IN QUITO','DÍA 1 – LLEGADA A QUITO'), description: ml('Airport Transfer (IN): Welcome at Quito International Airport and private transfer to your hotel.','Recepción en el Aeropuerto Internacional de Quito y traslado privado al hotel.'), accommodation: ml('Quito','Quito') },
      { day: 2, title: ml('DAY 2 – QUITO CITY TOUR & EQUATOR LINE','DÍA 2 – CITY TOUR EN QUITO Y LÍNEA ECUATORIAL'), description: ml('Quito was declared a UNESCO World Cultural Heritage Site in 1978 and is considered one of the most beautiful cities in the Americas.\n\nWe explore both the modern and historic areas of Quito. We will visit the Cathedral, the Archbishop\'s Palace, the Presidential Palace, La Compañía de Jesús (with its richly decorated gold-leaf interior), and San Francisco Square and Church.\n\nWe then continue to the Middle of the World (Mitad del Mundo), where we visit the Intiñan Museum for fascinating Equator experiments.','City tour por Quito (Patrimonio UNESCO). Mitad del Mundo y Museo Intiñan.'), accommodation: ml('Quito','Quito'), activity: ml('5-hour guided tour','Tour guiado de 5 horas'), transportation: ml('Private transportation (4x4 vehicles or tourist buses)','Transporte privado'), meals: ml('Breakfast','Desayuno') },
      { day: 3, title: ml('DAY 3 – QUITO – PAPALLACTA – AMAZON RAINFOREST','DÍA 3 – QUITO – PAPALLACTA – SELVA AMAZÓNICA'), description: ml('We travel approximately two hours east of Quito along a historic route. Along the way, we pass by Guápulo Church and cross the Andes at approximately 4,100 meters above sea level.\n\nWe stop at the famous Papallacta Hot Springs, where you can choose from several activities: relax in thermal pools while enjoying views of Antisana Volcano (5,704 m), enjoy the spa, or explore the walking trails.\n\nWe then continue our descent toward the Amazon rainforest.','Cruce de los Andes a 4,100 m y relax en las Termas de Papallacta con vista al Antisana. Descenso a la Amazonía hasta el lodge en Tena.'), accommodation: ml('Tena Lodge','Tena Lodge'), activity: ml('6-hour guided tour; descent from 4,000 m to 500 m; 1-hour hike','Tour de 6 horas y caminata de 1 hora'), transportation: ml('Private transportation (4x4 vehicles or tourist buses)','Transporte privado'), meals: ml('Breakfast','Desayuno') },
      { day: 4, title: ml('DAY 4 – TENA & AMAZON RAINFOREST','DÍA 4 – TENA Y SELVA AMAZÓNICA'), description: ml('In the morning, we board a motorized canoe and travel downstream to visit an Amazon rainforest wildlife rescue center.\n\nWe then explore primary rainforest on foot, accompanied by a knowledgeable local guide, discovering the incredible biodiversity of the Amazon.\n\nWe will also visit a local Kichwa family and learn about their traditions, culture, and daily way of life.\n\nFinally, we visit a caiman lagoon to observe these fascinating Amazonian reptiles.\n\nReturn to the lodge and overnight stay.','Canoa motorizada, centro de rescate de fauna, caminata en selva primaria, visita a familia Kichwa y laguna de caimanes.'), accommodation: ml('Tena Lodge','Tena Lodge'), activity: ml('6-hour guided tour + 1-hour motorized canoe ride','Tour de 6h + canoa motorizada de 1h'), transportation: ml('Private transportation (4x4 vehicles or tourist buses)','Transporte privado'), meals: ml('Breakfast, lunch, and dinner','Desayuno, almuerzo y cena') },
      { day: 5, title: ml('DAY 5 – MISAHUALLÍ – PAIKAWE RESERVE – QUITO','DÍA 5 – MISAHUALLÍ – RESERVA PAIKAWE – QUITO'), description: ml('In the morning, we visit Paikawe Reserve, where we have the opportunity to hike through primary rainforest and explore the lagoon by boat.\n\nDuring the visit, we can observe the impressive giant fish of the Amazon and discover the extraordinary biodiversity of this tropical environment.\n\nAfter the visit, we begin our return journey to Quito.','Visita a la Reserva Paikawe con caminata en selva y navegación en canoa para observar los peces gigantes del Amazonas. Retorno a Quito.'), accommodation: ml('Quito','Quito'), activity: ml('6-hour guided tour + 1-hour rainforest hike','Tour de 6 horas y caminata de 1h'), transportation: ml('Private transportation (4x4 vehicles or tourist buses)','Transporte privado'), meals: ml('Breakfast','Desayuno') },
      { day: 6, title: ml('DAY 6 – FREE DAY IN QUITO','DÍA 6 – DÍA LIBRE EN QUITO'), description: ml('Enjoy a free day to relax, explore Quito independently, or discover more of the city\'s cultural and historical attractions.','Día libre en Quito para explorar o descansar.'), accommodation: ml('Quito','Quito'), meals: ml('Breakfast','Desayuno') },
      { day: 7, title: ml('DAY 7 – TRANSFER TO THE AIRPORT','DÍA 7 – TRASLADO AL AEROPUERTO'), description: ml('Private transfer to the airport for your onward flight connections to the Galápagos Islands.\n\nEnd of the tour.','Traslado privado al aeropuerto para vuelo de conexión o salida.'), transportation: ml('Private transportation (4x4 vehicles or tourist buses)','Transporte privado') },
    ],
  },
];

// ─── Main ───────────────────────────────────────────────────────────────────
async function main() {
  console.log('🔥 Initializing Firebase...');
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);

  console.log('🔑 Authenticating as admin...');
  await signInWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASSWORD);
  console.log('✅ Authenticated successfully\n');

  // Find collection
  let toursCollection = 'tours';
  for (const col of ['tours', 'Tours', 'multiDayTours']) {
    try {
      const snap = await getDocs(collection(db, col));
      if (!snap.empty) {
        console.log(`📋 Found ${snap.size} documents in collection: "${col}"`);
        snap.docs.forEach(d => console.log(`   - ${d.id}`));
        toursCollection = col;
        break;
      }
    } catch (e) { /* ignore */ }
  }

  console.log(`\n🚀 Updating ${TOURS.length} tours in "${toursCollection}"...\n`);

  const batch = writeBatch(db);
  for (const tour of TOURS) {
    const docRef = doc(db, toursCollection, tour.id);
    batch.set(docRef, tour, { merge: true });
    console.log(`  ✍️  Queuing: ${tour.id}`);
  }

  await batch.commit();

  console.log('\n═══════════════════════════════════════════════════════');
  console.log(`✅ SUCCESS! ${TOURS.length} tours updated in Firebase.`);
  console.log('═══════════════════════════════════════════════════════');
  process.exit(0);
}

main().catch(err => {
  console.error('❌ Error:', err.message || err);
  process.exit(1);
});
