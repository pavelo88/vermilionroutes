import { Destination, Tour, Review } from '@/types';

export const mockDestinations: Destination[] = [
  {
    "id": "galapagos",
    "name": "Galapagos Islands",
    "subtitle": "The Enchanted Archipelago",
    "description": "Exclusive luxury cruises and island hopping excursions to witness wildlife found nowhere else on Earth.",
    "imageUrl": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
    "toursCount": 12,
    "slug": "galapagos"
  },
  {
    "id": "ecuador",
    "name": "Mainland Ecuador",
    "subtitle": "Andes, Volcanoes & Amazon Rainforest",
    "description": "Traverse the Avenue of Volcanoes, explore deep jungle lodges, and marvel at UNESCO colonial architecture.",
    "imageUrl": "https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=1200&q=80",
    "toursCount": 18,
    "slug": "ecuador"
  },
  {
    "id": "peru",
    "name": "Mystical Peru",
    "subtitle": "Cusco, Sacred Valley & Machu Picchu",
    "description": "Immerse yourself in Inca heritage, Andean highlands, and world-class gastronomy in South America.",
    "imageUrl": "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1200&q=80",
    "toursCount": 15,
    "slug": "peru"
  }
];

export const mockTours: Tour[] = [
  {
    "id": "fantastic-ecuador",
    "title": "FANTASTIC ECUADOR",
    "titleEs": "ECUADOR FANTÁSTICO",
    "destination": "Ecuador",
    "duration": "8 DAYS / 7 NIGHTS",
    "durationEs": "8 DÍAS / 7 NOCHES",
    "price": 2500,
    "imageUrl": "https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Fandes-jungle-galapagos-hero.jpg?alt=media",
    "rating": 5,
    "reviewsCount": 22,
    "category": "Private Expedition",
    "categoryEs": "Expedición Privada",
    "description": "Quito, Cuenca, Guayaquil. Experience the best of the Ecuadorian Andes and coast in an 8-day immersive journey.",
    "descriptionEs": "Quito, Cuenca, Guayaquil. Experimente lo mejor de los Andes ecuatorianos y la costa en un viaje inmersivo de 8 días.",
    "highlights": [
      "Otavalo Market",
      "Middle of the World",
      "Cotopaxi Route of Volcanoes",
      "Ingapirca Ruins",
      "El Cajas National Park"
    ],
    "inclusions": [
      "Private English speaking guide",
      "Luxury Accommodations",
      "All Transfers and entrance fees"
    ],
    "inclusionsEs": [
      "Guía privado bilingüe",
      "Alojamiento de lujo",
      "Traslados y entradas incluidas"
    ],
    "exclusions": [
      "International flights",
      "Gratuities"
    ],
    "exclusionsEs": [
      "Vuelos internacionales",
      "Propinas"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival in Quito",
        "titleEs": "Llegada a Quito",
        "description": "Assistance at the airport, transfer to hotel in Quito.",
        "descriptionEs": "Asistencia en el aeropuerto, traslado al hotel en Quito.",
        "accommodation": "Luxury Hotel in Quito",
        "meals": "None"
      },
      {
        "day": 2,
        "title": "Otavalo Market",
        "titleEs": "Mercado de Otavalo",
        "description": "Visit the famous indigenous market of Otavalo and the Cuicocha crater lake.",
        "descriptionEs": "Visite el famoso mercado indígena de Otavalo y la laguna del cráter Cuicocha.",
        "accommodation": "Luxury Hotel in Quito",
        "meals": "Breakfast"
      }
    ]
  },
  {
    "id": "andes-amazon-jungle-galapagos",
    "title": "ECUADOR ANDES AND AMAZON JUNGLE",
    "titleEs": "ANDES Y SELVA AMAZÓNICA",
    "destination": "Ecuador",
    "duration": "7 DAYS / 6 NIGHTS",
    "durationEs": "7 DÍAS / 6 NOCHES",
    "price": 2731,
    "imageUrl": "https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Fandes-jungle-galapagos-hero.jpg?alt=media",
    "rating": 5,
    "reviewsCount": 17,
    "category": "Nature Safari",
    "categoryEs": "Safari de Naturaleza",
    "description": "A breathtaking journey combining the Andes highlands, the Amazon jungle, and Papallacta hot springs.",
    "descriptionEs": "Un viaje impresionante combinando las tierras altas de los Andes, la selva amazónica y las aguas termales de Papallacta.",
    "inclusions": [
      "Private guide",
      "TODO: Revisar Copy - Premium Amazon Lodge",
      "All meals in the Amazon"
    ],
    "inclusionsEs": [
      "Guía privado",
      "TODO: Revisar Copy - Lodge Amazónico Premium",
      "Comidas en la selva"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival & Transfer",
        "description": "Airport pick up and transfer to your hotel."
      }
    ]
  },
  {
    "id": "cusco-inca-trail-machu-picchu",
    "title": "MYSTICAL CUSCO & MACHU PICCHU",
    "titleEs": "CUSCO MÍSTICO Y MACHU PICCHU",
    "destination": "Peru",
    "duration": "14 DAYS/ 13 NIGHTS",
    "durationEs": "14 DÍAS/ 13 NOCHES",
    "price": 3600,
    "imageUrl": "https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Fcusco-inca-trail-hero.jpg?alt=media",
    "rating": 5,
    "reviewsCount": 27,
    "category": "Private Expedition",
    "categoryEs": "Expedición Privada",
    "isUpcoming": true,
    "description": "TODO: Revisar Copy - Exclusive private train to Machu Picchu and ultra-luxury stays in the Sacred Valley.",
    "descriptionEs": "TODO: Revisar Copy - Tren privado exclusivo a Machu Picchu y estancias de ultra lujo en el Valle Sagrado.",
    "inclusions": [
      "TODO: Revisar Copy - Hiram Bingham Train Tickets",
      "Private Concierge 24/7"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival in Lima",
        "description": "VIP Transfer to Belmond Miraflores."
      }
    ]
  },
  {
    "id": "fantastic-ecuador-2",
    "title": "FANTASTIC ECUADOR (Extended)",
    "titleEs": "ECUADOR FANTÁSTICO (Extendido)",
    "destination": "Ecuador",
    "duration": "10 DAYS / 9 NIGHTS",
    "durationEs": "10 DÍAS / 9 NOCHES",
    "price": 3100,
    "imageUrl": "https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Fandes-jungle-galapagos-hero.jpg?alt=media",
    "rating": 4.9,
    "reviewsCount": 15,
    "category": "Private Expedition",
    "categoryEs": "Expedición Privada",
    "description": "An extended version of the fantastic Ecuador tour.",
    "descriptionEs": "Una versión extendida del tour fantástico.",
    "itinerary": []
  },
  {
    "id": "andes-amazon-jungle-galapagos-2",
    "title": "GALAPAGOS ISLAND HOPPING",
    "titleEs": "ISLA A ISLA EN GALÁPAGOS",
    "destination": "Galapagos",
    "duration": "5 DAYS / 4 NIGHTS",
    "durationEs": "5 DÍAS / 4 NOCHES",
    "price": 1950,
    "imageUrl": "https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Fandes-jungle-galapagos-hero.jpg?alt=media",
    "rating": 5,
    "reviewsCount": 42,
    "category": "Nature Safari",
    "categoryEs": "Safari de Naturaleza",
    "description": "Quick escape to the enchanted islands.",
    "descriptionEs": "Escapada rápida a las islas encantadas.",
    "itinerary": []
  },
  {
    "id": "cusco-inca-trail-machu-picchu-2",
    "title": "SACRED VALLEY RETREAT",
    "titleEs": "RETIRO EN EL VALLE SAGRADO",
    "destination": "Peru",
    "duration": "6 DAYS/ 5 NIGHTS",
    "durationEs": "6 DÍAS/ 5 NOCHES",
    "price": 2200,
    "imageUrl": "https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Fcusco-inca-trail-hero.jpg?alt=media",
    "rating": 4.8,
    "reviewsCount": 11,
    "category": "Private Expedition",
    "categoryEs": "Expedición Privada",
    "description": "Relax and connect with nature in the Sacred Valley.",
    "descriptionEs": "Relájese y conecte con la naturaleza en el Valle Sagrado.",
    "itinerary": []
  }
];

export const mockReviews: Review[] = [
  {
    id: "r1",
    author: "James & Sarah T.",
    location: "New York, USA",
    avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    rating: 5,
    date: "August 2026",
    tourTitle: "FANTASTIC ECUADOR",
    title: "An unforgettable ultra-luxury experience",
    comment: "From the moment we arrived in Quito, the Vermilion team anticipated our every need. The private access to the Carondelet Palace and our bilingual guide in the Cloud Forest exceeded all expectations. Flawless execution.",
    verifiedTripAdvisor: true
  },
  {
    id: "r2",
    author: "Elena M.",
    location: "Madrid, Spain",
    avatarUrl: "https://i.pravatar.cc/150?u=b042581f4e29026704e",
    rating: 5,
    date: "July 2026",
    tourTitle: "ENCHANTED ISLANDS",
    title: "The Galapagos in absolute style",
    comment: "We were hesitant about a crowded cruise, but Vermilion arranged a private yacht hopping experience that was pristine. We snorkeled with penguins and returned to 5-star boutique hospitality every evening.",
    verifiedTripAdvisor: true
  },
  {
    id: "r3",
    author: "The Kensington Family",
    location: "London, UK",
    avatarUrl: "https://i.pravatar.cc/150?u=c042581f4e29026704f",
    rating: 5,
    date: "September 2026",
    tourTitle: "PERUVIAN HIGHLANDS",
    title: "White-glove service in Machu Picchu",
    comment: "Taking the Vistadome Observatory train was spectacular. Our historian guide, Carlos, made the Inca ruins come alive. Vermilion handled our luggage seamlessly from Cusco to the Sacred Valley.",
    verifiedTripAdvisor: true
  },
  {
    id: "r4",
    author: "Marcus W.",
    location: "Sydney, Australia",
    avatarUrl: "https://i.pravatar.cc/150?u=d042581f4e29026704a",
    rating: 5,
    date: "October 2026",
    tourTitle: "AMAZON EXPEDITION",
    title: "Immersive nature without sacrificing comfort",
    comment: "Deep in the Amazon rainforest, we still enjoyed gourmet dining and air-conditioned suites. A perfect balance of rugged adventure and premium relaxation. Highly recommended.",
    verifiedTripAdvisor: true
  },
  {
    id: "r5",
    author: "Claire & Henri",
    location: "Paris, France",
    avatarUrl: "https://i.pravatar.cc/150?u=e042581f4e29026704b",
    rating: 5,
    date: "November 2026",
    tourTitle: "GALAPAGOS ADVENTURE",
    title: "Seamless logistics and breathtaking wildlife",
    comment: "Vermilion Routes took care of absolutely everything, from the VIP lounge at the airport to the private snorkeling sessions. It felt like we had the islands entirely to ourselves.",
    verifiedTripAdvisor: true
  }
];
