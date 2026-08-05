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
    "id": "andean-world",
    "title": "ANDEAN WORLD",
    "destination": "Peru",
    "duration": "10 DAYS / 9 NIGHTS",
    "price": 1999,
    "imageUrl": "https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Fandean-world-hero.jpg?alt=media",
    "rating": 5,
    "reviewsCount": 14,
    "category": "Private Expedition",
    "description": "Private guided exploration of Peru. Journey through beautiful landscapes, rich culture, and historic places.",
    "highlights": [
      "Lima",
      "Cusco",
      "Sacred Valley",
      "Macchu Picchu",
      "Pisac Ruins"
    ],
    "inclusions": [
      "Private English speaking guide",
      "Accommodations",
      "Transfers"
    ],
    "exclusions": [
      "International flights",
      "Tips"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival & Transfer",
        "description": "Airport pick up and transfer to your hotel."
      },
      {
        "day": 2,
        "title": "Day 2: Highlights Tour",
        "description": "Explore the main historic sights."
      }
    ]
  },
  {
    "id": "andes-amazon-jungle-galapagos",
    "title": "ANDES, AMAZON JUNGLE + GALAPAGOS",
    "destination": "Ecuador & Galapagos",
    "duration": "12 DAYS / 11 NIGHTS",
    "price": 2731,
    "imageUrl": "https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Fandes-jungle-galapagos-hero.jpg?alt=media",
    "rating": 5,
    "reviewsCount": 17,
    "category": "Private Expedition",
    "description": "A breathtaking journey combining the Andes highlands, the Amazon jungle, and the Galapagos Islands. Experience Ecuador's incredible biodiversity from volcanic peaks to tropical rainforests and enchanted archipelagos.",
    "highlights": [
      "Quito City Tour",
      "Mitad del Mundo",
      "Termas Papallacta",
      "Tena",
      "Animal Rescue Center"
    ],
    "inclusions": [
      "Private English speaking guide",
      "Accommodations",
      "Transfers"
    ],
    "exclusions": [
      "International flights",
      "Tips"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival & Transfer",
        "description": "Airport pick up and transfer to your hotel."
      },
      {
        "day": 2,
        "title": "Day 2: Highlights Tour",
        "description": "Explore the main historic sights."
      }
    ]
  },
  {
    "id": "cusco-inca-trail-machu-picchu",
    "title": "CUSCO INCA TRAIL MACHU PICCHU",
    "destination": "Peru",
    "duration": "14 DAYS/ 13 NIGHTS",
    "price": 2600,
    "imageUrl": "https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Fcusco-inca-trail-hero.jpg?alt=media",
    "rating": 5,
    "reviewsCount": 27,
    "category": "Private Expedition",
    "description": "Private guided exploration of Peru. Journey through beautiful landscapes, rich culture, and historic places.",
    "highlights": [
      "Cusco",
      "Urubamba Valley",
      "Chinchero",
      "Maras Salt Flats",
      "Pichingoto"
    ],
    "inclusions": [
      "Private English speaking guide",
      "Accommodations",
      "Transfers"
    ],
    "exclusions": [
      "International flights",
      "Tips"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival & Transfer",
        "description": "Airport pick up and transfer to your hotel."
      },
      {
        "day": 2,
        "title": "Day 2: Highlights Tour",
        "description": "Explore the main historic sights."
      }
    ]
  },
  {
    "id": "ecuador-andes-and-jungle-of-the-amazon",
    "title": "ECUADOR ANDES AND JUNGLE OF THE AMAZON",
    "destination": "Ecuador",
    "duration": "14 DAYS/ 13 NIGHTS",
    "price": 1307,
    "imageUrl": "https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Fandes-jungle-galapagos-hero.jpg?alt=media",
    "rating": 5,
    "reviewsCount": 44,
    "category": "Private Expedition",
    "description": "Discover the majestic Ecuadorian Andes and the lush Amazon jungle. Trek through cloud forests, explore indigenous communities, and encounter exotic wildlife in one unforgettable expedition.",
    "highlights": [
      "Quito",
      "Mitad del Mundo",
      "Papallacta",
      "Tena",
      "Misahualli"
    ],
    "inclusions": [
      "Private English speaking guide",
      "Accommodations",
      "Transfers"
    ],
    "exclusions": [
      "International flights",
      "Tips"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival & Transfer",
        "description": "Airport pick up and transfer to your hotel."
      },
      {
        "day": 2,
        "title": "Day 2: Highlights Tour",
        "description": "Explore the main historic sights."
      }
    ]
  },
  {
    "id": "ecuador-snow-and-waterfalls",
    "title": "ECUADOR SNOW AND WATERFALLS",
    "destination": "Ecuador",
    "duration": "14 DAYS/ 13 NIGHTS",
    "price": 1102,
    "imageUrl": "https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Fsnow-waterfalls-galapagos-hero.jpg?alt=media",
    "rating": 5,
    "reviewsCount": 51,
    "category": "Private Expedition",
    "description": "An adventure through Ecuador's most dramatic snowcapped volcanoes and thundering waterfalls. From the high paramo grasslands to the misty cascades of Baños and the Amazon basin.",
    "highlights": [
      "Quito",
      "Baños",
      "Puyo",
      "Amazonas Jungle",
      "Quilotoa"
    ],
    "inclusions": [
      "Private English speaking guide",
      "Accommodations",
      "Transfers"
    ],
    "exclusions": [
      "International flights",
      "Tips"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival & Transfer",
        "description": "Airport pick up and transfer to your hotel."
      },
      {
        "day": 2,
        "title": "Day 2: Highlights Tour",
        "description": "Explore the main historic sights."
      }
    ]
  },
  {
    "id": "ecuador-volcanoes-and-rivers",
    "title": "ECUADOR VOLCANOES AND RIVERS",
    "destination": "Ecuador",
    "duration": "8 DAYS / 7 NIGHTS",
    "price": 1543,
    "imageUrl": "https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Fecuador-volcanoes-rivers-hero.jpg?alt=media",
    "rating": 5,
    "reviewsCount": 33,
    "category": "Private Expedition",
    "description": "Explore Ecuador's dramatic Avenue of Volcanoes and pristine river valleys. Navigate rapids, visit indigenous markets, and discover hot springs nestled between towering Andean peaks.",
    "highlights": [
      "Quito",
      "Mitad del Mundo",
      "Papallacta",
      "Puyo",
      "Tena"
    ],
    "inclusions": [
      "Private English speaking guide",
      "Accommodations",
      "Transfers"
    ],
    "exclusions": [
      "International flights",
      "Tips"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival & Transfer",
        "description": "Airport pick up and transfer to your hotel."
      },
      {
        "day": 2,
        "title": "Day 2: Highlights Tour",
        "description": "Explore the main historic sights."
      }
    ]
  },
  {
    "id": "enchanted-islands-san-cristobal-santa-cruz-isabela",
    "title": "ENCHANTED ISLANDS SANTA FE / SANTA CRUZ",
    "destination": "Galapagos",
    "duration": "7 DAYS / 6 NIGHTS",
    "price": 1799,
    "imageUrl": "https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Fgalapagos-santa-cruz-isabela-premium-hero.jpg?alt=media",
    "rating": 5,
    "reviewsCount": 39,
    "category": "Private Expedition",
    "description": "Island-hop through the Galapagos Enchanted Islands. Snorkel with sea lions, walk among giant tortoises, and witness unique wildlife found nowhere else on Earth.",
    "highlights": [
      "La Lobería",
      "Scientific Station",
      "Grietas",
      "Estación Beach",
      "Tortuga Bay Beach"
    ],
    "inclusions": [
      "Private English speaking guide",
      "Accommodations",
      "Transfers"
    ],
    "exclusions": [
      "International flights",
      "Tips"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival & Transfer",
        "description": "Airport pick up and transfer to your hotel."
      },
      {
        "day": 2,
        "title": "Day 2: Highlights Tour",
        "description": "Explore the main historic sights."
      }
    ]
  },
  {
    "id": "fantastic-ecuador",
    "title": "FANTASTIC ECUADOR",
    "destination": "Ecuador",
    "duration": "14 DAYS/ 13 NIGHTS",
    "price": 1512,
    "imageUrl": "https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Ffantastic-ecuador-hero.jpg?alt=media",
    "rating": 5,
    "reviewsCount": 36,
    "category": "Private Expedition",
    "description": "The ultimate Ecuador experience. Journey from colonial Quito through indigenous markets, volcanic landscapes, cloud forests, and coastal wonders in this comprehensive expedition.",
    "highlights": [
      "Quito",
      "Otavalo",
      "Mitad del Mundo",
      "Baños",
      "Riobamba"
    ],
    "inclusions": [
      "Private English speaking guide",
      "Accommodations",
      "Transfers"
    ],
    "exclusions": [
      "International flights",
      "Tips"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival & Transfer",
        "description": "Airport pick up and transfer to your hotel."
      },
      {
        "day": 2,
        "title": "Day 2: Highlights Tour",
        "description": "Explore the main historic sights."
      }
    ]
  },
  {
    "id": "full-galapagos-san-cristobal-santa-cruz-isabela",
    "title": "FULL GALÁPAGOS SAN CRISTOBAL / SANTA CRUZ / ISABELA",
    "destination": "Galapagos",
    "duration": "9 DAYS/ 8 NIGHTS",
    "price": 2300,
    "imageUrl": "https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Fgalapagos-santa-cruz-isabela-premium-hero.jpg?alt=media",
    "rating": 5,
    "reviewsCount": 20,
    "category": "Private Expedition",
    "description": "The complete Galapagos experience across three iconic islands: San Cristobal, Santa Cruz, and Isabela. Encounter blue-footed boobies, marine iguanas, and Galapagos penguins in their natural habitat.",
    "highlights": [
      "Bahía Tour",
      "Tintoreras",
      "Galapaguera",
      "Tijeretas Hill",
      "Mann Beach"
    ],
    "inclusions": [
      "Private English speaking guide",
      "Accommodations",
      "Transfers"
    ],
    "exclusions": [
      "International flights",
      "Tips"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival & Transfer",
        "description": "Airport pick up and transfer to your hotel."
      },
      {
        "day": 2,
        "title": "Day 2: Highlights Tour",
        "description": "Explore the main historic sights."
      }
    ]
  },
  {
    "id": "galapagos-islands-economic-tour",
    "title": "GALAPAGOS ISLANDS ECONOMIC TOUR",
    "destination": "Galapagos",
    "duration": "7 DAYS / 6 NIGHTS",
    "price": 1399,
    "imageUrl": "https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Ffull-galapagos-3-islands-hero.jpg?alt=media",
    "rating": 5,
    "reviewsCount": 22,
    "category": "Private Expedition",
    "description": "An affordable yet unforgettable Galapagos adventure. Explore the Charles Darwin Research Station, walk pristine beaches, and snorkel in crystal-clear waters teeming with marine life.",
    "highlights": [
      "Twin Craters",
      "Charles Darwin Station",
      "Tortuga Bay Beach",
      "Lava Tunnels",
      "Primicias Ranch"
    ],
    "inclusions": [
      "Private English speaking guide",
      "Accommodations",
      "Transfers"
    ],
    "exclusions": [
      "International flights",
      "Tips"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival & Transfer",
        "description": "Airport pick up and transfer to your hotel."
      },
      {
        "day": 2,
        "title": "Day 2: Highlights Tour",
        "description": "Explore the main historic sights."
      }
    ]
  },
  {
    "id": "galapagos-islands-santa-cruz-premium-service",
    "title": "GALAPAGOS ISLANDS SANTA CRUZ PREMIUM SERVICE",
    "destination": "Galapagos",
    "duration": "14 DAYS/ 13 NIGHTS",
    "price": 2345,
    "imageUrl": "https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Fgalapagos-santa-cruz-isabela-premium-hero.jpg?alt=media",
    "rating": 5,
    "reviewsCount": 40,
    "category": "Private Expedition",
    "description": "Premium Galapagos service on Santa Cruz Island. Enjoy luxury accommodations, private naturalist guides, exclusive wildlife encounters, and curated gastronomic experiences.",
    "highlights": [
      "Bahía Tour",
      "Tintoreras",
      "Galapaguera",
      "Tijeretas Hill",
      "Mann Hill"
    ],
    "inclusions": [
      "Private English speaking guide",
      "Accommodations",
      "Transfers"
    ],
    "exclusions": [
      "International flights",
      "Tips"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival & Transfer",
        "description": "Airport pick up and transfer to your hotel."
      },
      {
        "day": 2,
        "title": "Day 2: Highlights Tour",
        "description": "Explore the main historic sights."
      }
    ]
  },
  {
    "id": "galapagos-santa-cruz-isabela-premium-service",
    "title": "GALÁPAGOS SANTA CRUZ / ISABELA PREMIUM SERVICE",
    "destination": "Galapagos",
    "duration": "9 DAYS / 8 NIGHTS",
    "price": 2747,
    "imageUrl": "https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Fgalapagos-santa-cruz-isabela-premium-hero.jpg?alt=media",
    "rating": 5,
    "reviewsCount": 41,
    "category": "Private Expedition",
    "description": "A premium two-island Galapagos expedition visiting Santa Cruz and Isabela. Dive with hammerhead sharks, kayak through mangroves, and witness volcanic landscapes sculpted over millennia.",
    "highlights": [
      "Bahía Tour",
      "Tintoreras",
      "Galapaguera",
      "Tijeretas Hill",
      "Mann Beach"
    ],
    "inclusions": [
      "Private English speaking guide",
      "Accommodations",
      "Transfers"
    ],
    "exclusions": [
      "International flights",
      "Tips"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival & Transfer",
        "description": "Airport pick up and transfer to your hotel."
      },
      {
        "day": 2,
        "title": "Day 2: Highlights Tour",
        "description": "Explore the main historic sights."
      }
    ]
  },
  {
    "id": "mysteries-of-peru",
    "title": "MYSTERIES OF PERU",
    "destination": "Peru",
    "duration": "11 DAYS / 10 NIGHTS",
    "price": 2399,
    "imageUrl": "https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Fmisterios-del-peru-hero.jpg?alt=media",
    "rating": 5,
    "reviewsCount": 24,
    "category": "Private Expedition",
    "description": "Private guided exploration of Peru. Journey through beautiful landscapes, rich culture, and historic places.",
    "highlights": [
      "Lima",
      "Paracas",
      "Ballestas Islands",
      "Cusco",
      "Sacred Valley"
    ],
    "inclusions": [
      "Private English speaking guide",
      "Accommodations",
      "Transfers"
    ],
    "exclusions": [
      "International flights",
      "Tips"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival & Transfer",
        "description": "Airport pick up and transfer to your hotel."
      },
      {
        "day": 2,
        "title": "Day 2: Highlights Tour",
        "description": "Explore the main historic sights."
      }
    ]
  },
  {
    "id": "peru-cusco-machu-picchu",
    "title": "PERÚ, CUSCO MACHU PICCHU",
    "destination": "Peru",
    "duration": "7 DAYS/6 NIGHTS",
    "price": 2400,
    "imageUrl": "https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Fquito-galapagos-cusco-machu-picchu-hero.jpg?alt=media",
    "rating": 5,
    "reviewsCount": 34,
    "category": "Private Expedition",
    "description": "Private guided exploration of Peru. Journey through beautiful landscapes, rich culture, and historic places.",
    "highlights": [
      "Cusco",
      "Urubamba Valley",
      "Chinchero",
      "Maras Salt Flats",
      "Pichingoto"
    ],
    "inclusions": [
      "Private English speaking guide",
      "Accommodations",
      "Transfers"
    ],
    "exclusions": [
      "International flights",
      "Tips"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival & Transfer",
        "description": "Airport pick up and transfer to your hotel."
      },
      {
        "day": 2,
        "title": "Day 2: Highlights Tour",
        "description": "Explore the main historic sights."
      }
    ]
  },
  {
    "id": "peru-essential",
    "title": "PERU ESSENTIAL",
    "destination": "Peru",
    "duration": "6 DAYS / 5 NIGHTS",
    "price": 1499,
    "imageUrl": "https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Fperu-essential-hero.jpg?alt=media",
    "rating": 5,
    "reviewsCount": 45,
    "category": "Private Expedition",
    "description": "Private guided exploration of Peru. Journey through beautiful landscapes, rich culture, and historic places.",
    "highlights": [
      "Lima",
      "Cusco",
      "Sacred Valley",
      "Macchu Picchu",
      "Pisac Ruins"
    ],
    "inclusions": [
      "Private English speaking guide",
      "Accommodations",
      "Transfers"
    ],
    "exclusions": [
      "International flights",
      "Tips"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival & Transfer",
        "description": "Airport pick up and transfer to your hotel."
      },
      {
        "day": 2,
        "title": "Day 2: Highlights Tour",
        "description": "Explore the main historic sights."
      }
    ]
  },
  {
    "id": "quito-galapagos-cusco-machu-picchu",
    "title": "QUITO, GALÁPAGOS, CUSCO, MACHU PICCHU",
    "destination": "Ecuador & Galapagos",
    "duration": "13 DAYS / 12 NIGHTS",
    "price": 3899,
    "imageUrl": "https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Fquito-galapagos-cusco-machu-picchu-hero.jpg?alt=media",
    "rating": 5,
    "reviewsCount": 38,
    "category": "Private Expedition",
    "description": "The ultimate South American grand tour combining Ecuador, the Galapagos Islands, and Peru. From Quito's colonial splendor to Galapagos wildlife and the ancient wonder of Machu Picchu.",
    "highlights": [
      "Quito",
      "Mitad del Mundo",
      "Santa Cruz Island",
      "Santa Fe Island",
      "Cusco"
    ],
    "inclusions": [
      "Private English speaking guide",
      "Accommodations",
      "Transfers"
    ],
    "exclusions": [
      "International flights",
      "Tips"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival & Transfer",
        "description": "Airport pick up and transfer to your hotel."
      },
      {
        "day": 2,
        "title": "Day 2: Highlights Tour",
        "description": "Explore the main historic sights."
      }
    ]
  },
  {
    "id": "snow-and-waterfalls-full-galapagos-islands",
    "title": "SNOW AND WATERFALLS + ENCHANTED ISLANDS",
    "destination": "Ecuador & Galapagos",
    "duration": "11 DAYS / 10 NIGHTS",
    "price": 2526,
    "imageUrl": "https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Ffull-galapagos-3-islands-hero.jpg?alt=media",
    "rating": 5,
    "reviewsCount": 33,
    "category": "Private Expedition",
    "description": "Combine Ecuador's dramatic snowcapped peaks and cascading waterfalls with the enchanted wildlife of the Galapagos Islands. A perfect blend of Andean adventure and oceanic wonder.",
    "highlights": [
      "Quito",
      "Baños",
      "Puyo",
      "Pailón del diablo",
      "“Hola vida” Waterfall"
    ],
    "inclusions": [
      "Private English speaking guide",
      "Accommodations",
      "Transfers"
    ],
    "exclusions": [
      "International flights",
      "Tips"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival & Transfer",
        "description": "Airport pick up and transfer to your hotel."
      },
      {
        "day": 2,
        "title": "Day 2: Highlights Tour",
        "description": "Explore the main historic sights."
      }
    ]
  }
];

export const mockReviews: Review[] = [
  {
    id: 'rev-1',
    author: 'Sarah Jenkins',
    location: 'London, United Kingdom',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: 'July 2026',
    tourTitle: 'Andes, Amazon Jungle & Galapagos Expedition',
    title: 'The trip of a lifetime - flawless luxury and execution',
    comment: 'Vermilion Routes curated an absolute dream expedition for my family. From our private naturalist guide in the Galapagos to the luxury lodge in Yasuni, every single detail was handled with precision and warmth.',
    verifiedTripAdvisor: true,
  },
  {
    id: 'rev-2',
    author: 'Dr. Michael Sterling',
    location: 'Boston, Massachusetts, USA',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: 'June 2026',
    tourTitle: 'Enchanted Galapagos Islands Hopping',
    title: 'World-class naturalists and unmatched concierge care',
    comment: 'I was blown away by the depth of knowledge of our PNG guide, Mateo. Snorkeling with penguins and sea lions with zero stress thanks to Vermilion’s 24/7 concierge team made this unforgettable.',
    verifiedTripAdvisor: true,
  },
  {
    id: 'rev-3',
    author: 'Elena & Lucas Vance',
    location: 'Sydney, Australia',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: 'May 2026',
    tourTitle: 'Inca Wonders: Cusco & Machu Picchu',
    title: 'Bespoke, authentic and deeply immersive',
    comment: 'The Vistadome train ride to Machu Picchu and our stay at Tambo del Inka were pure perfection. Thank you Vermilion Routes for giving us the most magical honeymoon in South America!',
    verifiedTripAdvisor: true,
  },
];
