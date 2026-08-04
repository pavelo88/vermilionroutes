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
    "id": "andes-jungle-galapagos",
    "title": "Andes, Amazon Jungle & Enchanted Galapagos Expedition",
    "destination": "Ecuador & Galapagos",
    "duration": "12 Days / 11 Nights",
    "price": 2731,
    "groupPrice": 2599,
    "pdfUrl": "/wp-content/uploads/2023/12/andes_amazon_jungle_galapagos.pdf",
    "availabilityInfo": "Group Excursions available and individual fit travel.",
    "imageUrl": "https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Fandes-jungle-galapagos-hero.jpg?alt=media&token=9fe050c5-05b2-45b1-bde2-61386d3a0817",
    "rating": 4.9,
    "reviewsCount": 48,
    "category": "Complete Grand Expedition",
    "isPopular": true,
    "description": "The definitive luxury expedition across Ecuador: immerse yourself in colonial Quito, travel through the Amazon basin (Tena/Misahualli), journey through hot thermal springs of Papallacta, and cruise the enchanted Galapagos Archipelago observing iconic wildlife up close.",
    "gallery": [
      "https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Fandes-jungle-galapagos-hero.jpg?alt=media&token=9fe050c5-05b2-45b1-bde2-61386d3a0817"
    ],
    "highlights": [
      "PAIKAWE Lagoon Reserve and Amazonian Rescue Center",
      "Descent from Andes (4000 masl) to Amazon Basin (500 masl)",
      "Volcanic Thermal Springs of Papallacta",
      "Galapagos: Snorkel Santa Fe Island & Las Grietas volcanic fissures",
      "Certified bilingual National Park naturalists"
    ],
    "inclusions": [
      "Internal flights: Quito - Galapagos - Quito",
      "Boutique accommodations & cozy Amazon Rainforest eco-lodge",
      "All breakfasts, specified Amazon meals & Galapagos lunch boxes",
      "Private PNG-certified expert naturalist guides",
      "Private air-conditioned ground transfers throughout",
      "Complete snorkeling gear (wetsuit, mask, fins)"
    ],
    "exclusions": [
      "International arrival and departure flights",
      "Galapagos Transit Control Card ($20 USD)",
      "Galapagos National Park Entrance Fee ($200 USD)",
      "Discretionary gratuities for guides and drivers",
      "Optional day trips and extra meals"
    ],
    "optionalTours": [
      {
        "title": "City Tour + Mitad del Mundo",
        "price": 80,
        "description": "Guided tour of Quito UNESCO Historic Town (Plaza Grande, Presidential Palace, gilded La Compañía church, Panecillo viewpoint) and Equatorial line monument at Intiñan Museum."
      }
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival in Quito & Airport Transfer",
        "description": "VIP airport reception at Quito airport and private transfer to your boutique hotel in the city. Accommodation: Quito.",
        "meals": "None",
        "accommodation": "Boutique Hotel Quito 4★"
      },
      {
        "day": 2,
        "title": "Quito UNESCO Heritage & Equatorial Line",
        "description": "Private guided exploration of La Compañía de Jesús gilded church, Plaza Grande, and Panecillo viewpoint. In the afternoon, visit the Equator Monument at Intiñan Museum to test unique gravitational phenomena.",
        "meals": "Breakfast",
        "accommodation": "Boutique Hotel Quito 4★"
      },
      {
        "day": 3,
        "title": "Quito - Papallacta Hot Springs - Tena Lodge",
        "description": "Traverse down the Andes from 4,000m to 500m. Hike Papallacta trails and enjoy natural volcanic thermal pools before arriving at your cozy jungle lodge in Tena.",
        "meals": "Breakfast & Dinner",
        "accommodation": "Tena Eco-Lodge 4★"
      },
      {
        "day": 4,
        "title": "Tena jungle Safari: Canoe & Rescue Center",
        "description": "Ride a motorized canoe along the Napo River. Visit the local animal rescue center, learn about indigenous Quichua traditions, and spot caimans in the alligator lagoon.",
        "meals": "Breakfast, Lunch & Dinner",
        "accommodation": "Tena Eco-Lodge 4★"
      },
      {
        "day": 5,
        "title": "Misahualli Paikawe Reserve - Return to Quito",
        "description": "Morning guided walk inside the pristine Paikawe Lagoon Reserve to observe hoatzin birds, monkeys, and rich tropical vegetation. Afternoon private transfer back to Quito.",
        "meals": "Breakfast",
        "accommodation": "Boutique Hotel Quito 4★"
      },
      {
        "day": 6,
        "title": "Free Day in Quito (Optional City & Equator Tour)",
        "description": "Relax at your hotel or take an optional guided day tour to the Middle of the World and historic Quito ($80 USD per person).",
        "meals": "Breakfast",
        "accommodation": "Boutique Hotel Quito 4★"
      },
      {
        "day": 7,
        "title": "Flight to Galapagos: San Cristobal & La Loberia",
        "description": "Fly from Quito to San Cristobal Island. Reception by local guide and transfer to your oceanfront hotel. Hike to La Loberia beach to watch sea lions.",
        "meals": "Breakfast, Lunch & Dinner",
        "accommodation": "San Cristobal Oceanfront Hotel 4★"
      },
      {
        "day": 8,
        "title": "Galapagos: Santa Cruz Highlands & Las Grietas Fissures",
        "description": "Take a speed boat to Santa Cruz Island. Visit the Scalesia giant tortoise reserve in the highlands. Afternoon snorkel in the crystal-clear volcanic crevice of Las Grietas.",
        "meals": "Breakfast, Lunch & Dinner",
        "accommodation": "Santa Cruz Boutique Hotel 4★"
      },
      {
        "day": 9,
        "title": "Galapagos: Tortuga Bay Beach & Las Ninfas Lagoon",
        "description": "Walk through giant cacti forest to Tortuga Bay, a paradise of white sand and marine iguanas. Visit the quiet mangrove-shaded Las Ninfas Lagoon.",
        "meals": "Breakfast, Lunch & Dinner",
        "accommodation": "Santa Cruz Boutique Hotel 4★"
      },
      {
        "day": 10,
        "title": "Galapagos: Santa Fe Island Snorkeling Day Cruise",
        "description": "Sail by speedboat to Santa Fe Island. Snorkel in turquoise waters with sea lions, marine iguanas, colorful fish, and harmless reef sharks.",
        "meals": "Breakfast, Lunch & Dinner",
        "accommodation": "Santa Cruz Boutique Hotel 4★"
      },
      {
        "day": 11,
        "title": "Twin Craters & Flight back to Quito",
        "description": "Visit Los Gemelos volcanic craters in the highlands. Transfer to Baltra Airport for your flight back to Quito.",
        "meals": "Breakfast",
        "accommodation": "Boutique Hotel Quito 4★"
      },
      {
        "day": 12,
        "title": "Transfer Quito Airport & Departure",
        "description": "Private transfer from your hotel to Quito airport for your international flight home.",
        "meals": "Breakfast"
      }
    ]
  },
  {
    "id": "enchanted-islands",
    "title": "Enchanted Islands: San Cristobal, Santa Cruz & Isabela",
    "destination": "Galapagos",
    "duration": "7 Days / 6 Nights",
    "price": 1799,
    "imageUrl": "https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Fenchanted-islands-hero.jpg?alt=media&token=8b788734-2fbe-4830-9c75-98d3fe1c0a65",
    "rating": 5,
    "reviewsCount": 62,
    "category": "Luxury Island Hopping",
    "isPopular": true,
    "description": "Explore the three most iconic inhabited Galapagos Islands on a seamless, comfortable Island Hopping tour. Stay in oceanfront boutique hotels, enjoy daily marine wildlife snorkeling safaris, and relax without staying overnight on a boat.",
    "gallery": [
      "https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Fenchanted-islands-hero.jpg?alt=media&token=8b788734-2fbe-4830-9c75-98d3fe1c0a65"
    ],
    "highlights": [
      "Snorkel with playful sea lions & sea turtles",
      "Hike dramatic volcanic craters & lava fields",
      "Oceanfront boutique luxury accommodation",
      "Yacht excursion to Kicker Rock (León Dormido)"
    ],
    "inclusions": [
      "6 nights accommodation in premier boutique hotels",
      "Daily breakfasts & lunches on all day excursions",
      "Complete high-end snorkeling gear (mask, fins, 3mm wetsuit)",
      "Inter-island speedboats & private water taxi transfers",
      "Private certified bilingual naturalist guides"
    ],
    "exclusions": [
      "Galapagos National Park entrance fee ($200 USD)",
      "Transit Control Card ($20 USD)",
      "Alcoholic beverages & personal expenditures",
      "Optional guide and driver gratuities"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival in San Cristobal & La Loberia Beach",
        "description": "Touchdown at San Cristobal Airport, greeting by your private guide, and check-in to your oceanfront hotel. Sunset stroll along La Loberia beach surrounded by sea lion pups.",
        "meals": "Welcome Seafood Lunch",
        "accommodation": "Casa Opuntia Hotel 4★"
      },
      {
        "day": 2,
        "title": "Kicker Rock (León Dormido) Snorkeling Expedition",
        "description": "Set sail for Kicker Rock, a dramatic volcanic obelisk jutting out of the Pacific. Deep-water snorkel with Galapagos sharks, eagle rays, and sea turtles.",
        "meals": "Breakfast & Onboard Lunch",
        "accommodation": "Casa Opuntia Hotel 4★"
      },
      {
        "day": 3,
        "title": "Santa Cruz Island & Giant Tortoise Reserve",
        "description": "Morning speedboat across the ocean to Puerto Ayora. Head into the Santa Cruz lush highlands to observe giant tortoises in their natural habitat.",
        "meals": "Breakfast & Highlands Lunch",
        "accommodation": "Solymar Oceanfront Hotel 4★"
      },
      {
        "day": 4,
        "title": "Las Ninfas Lagoon & Tortuga Bay Kayaking",
        "description": "Morning walk through mangroves at Las Ninfas and afternoon ocean kayaking at Tortuga Bay alongside marine iguanas.",
        "meals": "Breakfast",
        "accommodation": "Solymar Oceanfront Hotel 4★"
      },
      {
        "day": 5,
        "title": "Isabela Island & Tintoreras Islet",
        "description": "Speedboat transfer to Isabela. Boat tour around Tintoreras to spot Galapagos penguins, blue-footed boobies, and resting reef sharks.",
        "meals": "Breakfast & Local Lunch",
        "accommodation": "Albemarle Hotel Isabela 4★"
      },
      {
        "day": 6,
        "title": "Sierra Negra Active Volcano Hike",
        "description": "Trek along the massive volcanic rim of Sierra Negra for panoramic views of Elizabeth Bay and Fernandina Island.",
        "meals": "Breakfast & Trail Box Lunch",
        "accommodation": "Albemarle Hotel Isabela 4★"
      },
      {
        "day": 7,
        "title": "Baltra Airport Transfer & Outbound Flight",
        "description": "Morning boat back to Santa Cruz and private airport transfer to Baltra for your return flight.",
        "meals": "Breakfast"
      }
    ]
  },
  {
    "id": "peru-el-cusco",
    "title": "Inca Wonders: Cusco, Sacred Valley & Machu Picchu",
    "destination": "Peru",
    "duration": "9 Days / 8 Nights",
    "price": 2300,
    "imageUrl": "https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Fperu-el-cusco-hero.jpg?alt=media&token=f8a57785-09fb-446d-8fa6-da200521302e",
    "rating": 4.8,
    "reviewsCount": 39,
    "category": "Cultural & History",
    "isPopular": false,
    "description": "The ultimate immersion into the Inca Empire. Explore imperial Cusco, the fertile Sacred Valley, the iconic citadel of Machu Picchu aboard the Vistadome panoramic train, and the vibrant Rainbow Mountain.",
    "gallery": [
      "https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Fperu-el-cusco-hero.jpg?alt=media&token=f8a57785-09fb-446d-8fa6-da200521302e"
    ],
    "highlights": [
      "Vistadome luxury panoramic train to Machu Picchu",
      "Private VIP guided tour of Sacsayhuaman & Ollantaytambo",
      "5-course Peruvian gastronomic experience in Cusco",
      "Day trip to Rainbow Mountain (Vinicunca)"
    ],
    "inclusions": [
      "8 nights stay in 4★ & 5★ luxury historical hotels",
      "Roundtrip Vistadome panoramic train tickets",
      "Official Machu Picchu entrance tickets with private guide",
      "Full Cusco Tourist Ticket (BTG)",
      "All private transfers between airport, hotels & stations",
      "Daily breakfasts & gourmet Sacred Valley lunch buffet"
    ],
    "exclusions": [
      "International & domestic flights (Lima - Cusco)",
      "Comprehensive travel insurance",
      "Personal expenses & unlisted beverages",
      "Driver and guide gratuities"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival in Cusco & Altitude Acclimatization",
        "description": "Private airport greeting at Alejandro Velasco Astete Airport in Cusco and transfer to your historic hotel. Enjoy complimentary hot coca tea for smooth altitude acclimatization.",
        "meals": "Welcome Coca Tea & Refreshments",
        "accommodation": "Palacio del Inka Luxury Collection 5★"
      },
      {
        "day": 2,
        "title": "Imperial Cusco & Qorikancha Temple of the Sun",
        "description": "Guided tour of the Sun Temple (Qorikancha), Cusco Cathedral, and the impressive megalithic fortress of Sacsayhuamán.",
        "meals": "Breakfast",
        "accommodation": "Palacio del Inka Luxury Collection 5★"
      },
      {
        "day": 3,
        "title": "Sacred Valley: Pisac Market & Maras Salt Mines",
        "description": "Journey into the Sacred Valley. Discover the agricultural terraces of Moray and the ancient pink salt pans of Maras followed by an Andean buffet lunch.",
        "meals": "Breakfast & Gourmet Andean Buffet",
        "accommodation": "Tambo del Inka Resort & Spa 5★"
      },
      {
        "day": 4,
        "title": "Ollantaytambo Fortress & Vistadome Train Ride",
        "description": "Explore the living Inca town of Ollantaytambo. Board the glass-roof Vistadome train with live Andean dance performance en route to Aguas Calientes.",
        "meals": "Breakfast",
        "accommodation": "Inkaterra Machu Picchu Pueblo Hotel 5★"
      },
      {
        "day": 5,
        "title": "Machu Picchu: Lost City of the Incas",
        "description": "Early morning eco-bus climb to Machu Picchu. Private VIP tour of the citadel terraces, Sun Gate views, and Temple of the Three Windows.",
        "meals": "Breakfast & Sanctuary Lodge Lunch",
        "accommodation": "Palacio del Inka Cusco 5★"
      },
      {
        "day": 6,
        "title": "Rainbow Mountain (Vinicunca) Trek",
        "description": "Scenic early morning drive into the high Andes to reach Vinicunca (5,020m). Witness striking natural mineral stripes and grazing alpacas.",
        "meals": "Breakfast & High-Altitude Box Lunch",
        "accommodation": "Palacio del Inka Cusco 5★"
      },
      {
        "day": 7,
        "title": "Humantay Turquoise Alpine Lake",
        "description": "Optional excursion trek to the majestic turquoise waters of Humantay Lake sitting beneath Salkantay snowpeak.",
        "meals": "Breakfast & Countryside Lunch",
        "accommodation": "Palacio del Inka Cusco 5★"
      },
      {
        "day": 8,
        "title": "Cusco Gastronomic Day & Textile Workshops",
        "description": "Leisurely day exploring San Pedro artisan market, alpaca textile weavers, and celebrating with a 5-course farewell dinner.",
        "meals": "Breakfast & 5-Course Farewell Dinner",
        "accommodation": "Palacio del Inka Cusco 5★"
      },
      {
        "day": 9,
        "title": "Airport Transfer & Departure Flight",
        "description": "Private transfer to Cusco airport for your connection to Lima and international flights home.",
        "meals": "Breakfast"
      }
    ]
  },
  {
    "id": "avenue-volcanoes",
    "title": "Ecuador Avenue of the Volcanoes & Colonial Haciendas",
    "destination": "Ecuador",
    "duration": "11 Days / 10 Nights",
    "price": 2526,
    "imageUrl": "https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=800&q=80",
    "rating": 4.9,
    "reviewsCount": 27,
    "category": "Adventure & Nature",
    "isPopular": false,
    "description": "Traverse the backbone of the Ecuadorian Andes named by Alexander von Humboldt: the Avenue of Volcanoes. Thunderous waterfalls, centuries-old colonial haciendas, and the snowcaps of Cotopaxi and Chimborazo.",
    "gallery": [
      "https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80"
    ],
    "highlights": [
      "Andean Highland route & Cotopaxi snowcap",
      "Baños de Agua Santa & Waterfall Route",
      "Quito UNESCO Old Town private tour",
      "Stays in historic 17th-century haciendas"
    ],
    "inclusions": [
      "Accommodation in historic haciendas & boutique 4★ hotels",
      "Daily breakfasts & 5 regional gourmet lunches",
      "Private transport with professional bilingual guide",
      "All national park entry fees and listed excursions"
    ],
    "exclusions": [
      "International airfare",
      "Unlisted dinners",
      "Driver & guide tips"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival in Quito",
        "description": "Private transfer to hotel and orientation."
      },
      {
        "day": 2,
        "title": "Colonial Quito & Cable Car",
        "description": "Old town tour and cable car ride up to 4,000m."
      },
      {
        "day": 3,
        "title": "Cotopaxi Volcano & Hacienda Stay",
        "description": "Hike near Limpiopungo lagoon and overnight in historic hacienda."
      },
      {
        "day": 4,
        "title": "Quilotoa Emerald Crater Loop",
        "description": "Viewpoint hike around the volcanic crater lake."
      },
      {
        "day": 5,
        "title": "Baños & Devil’s Cauldron Waterfall",
        "description": "Waterfall highway hike and edge-of-the-world swing."
      }
    ]
  },
  {
    "id": "peru-essential",
    "title": "Peru Essential & Machu Picchu Express",
    "destination": "Peru",
    "duration": "6 Days / 5 Nights",
    "price": 1999,
    "imageUrl": "https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Fperu-essential-hero.jpg?alt=media&token=193ead76-ea69-49a8-9c60-e878f4ca5f17",
    "rating": 4.7,
    "reviewsCount": 31,
    "category": "Express Luxury Highlights",
    "isPopular": false,
    "description": "The ideal compact luxury itinerary to experience the best of Cusco and Machu Picchu in less than a week with maximum comfort.",
    "gallery": [
      "https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Fperu-essential-hero.jpg?alt=media&token=193ead76-ea69-49a8-9c60-e878f4ca5f17"
    ],
    "highlights": [
      "VIP guided tour of Machu Picchu Citadel",
      "Traditional Pisac Artisan Market",
      "Expert bilingual private guides throughout"
    ],
    "inclusions": [
      "5 nights luxury boutique stays",
      "Vistadome panoramic train tickets",
      "Official Machu Picchu entrance tickets"
    ],
    "exclusions": [
      "International flights",
      "Gratuities"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival in Cusco",
        "description": "Airport welcome and rest for acclimatization."
      },
      {
        "day": 2,
        "title": "Sacred Valley Highlights",
        "description": "Explore Pisac market and Ollantaytambo ruins."
      },
      {
        "day": 3,
        "title": "Machu Picchu Citadel",
        "description": "Private guided tour and postcard photos."
      }
    ]
  },
  {
    "id": "misterios-del-peru",
    "title": "Mysteries of Peru & Nazca Lines Overland",
    "destination": "Peru",
    "duration": "11 Days / 10 Nights",
    "price": 2150,
    "imageUrl": "https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Fmisterios-del-peru-hero.jpg?alt=media&token=26d4f367-9807-44bc-99c6-677c3c7adcda",
    "rating": 4.9,
    "reviewsCount": 19,
    "category": "Grand Archaeological Overland",
    "isPopular": false,
    "description": "Uncover the ancient mysteries of Peru’s coast and Andes: fly over the enigmatic Nazca Lines, cruise Ballestas Islands, and marvel at Cusco and Machu Picchu.",
    "gallery": [
      "https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Fmisterios-del-peru-hero.jpg?alt=media&token=26d4f367-9807-44bc-99c6-677c3c7adcda"
    ],
    "highlights": [
      "Flight over mysterious Nazca geoglyphs",
      "Huacachina Desert Oasis & dune buggies",
      "Imperial Cusco & Machu Picchu"
    ],
    "inclusions": [
      "Scenic Nazca Lines aircraft flight",
      "Dune buggy and sandboarding safari",
      "Machu Picchu train and entrance passes"
    ],
    "exclusions": [
      "Airport tax fee for Nazca flight",
      "International flights"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival in Lima",
        "description": "Private welcome and coastal hotel check-in."
      },
      {
        "day": 2,
        "title": "Paracas & Ballestas Islands",
        "description": "Marine boat tour to spot penguins and sea lions."
      },
      {
        "day": 3,
        "title": "Ica & Nazca Lines Flight",
        "description": "Flight over ancient desert geoglyphs."
      }
    ]
  },
  {
    "id": "galapagos-economic",
    "title": "Galapagos Islands Economic Tour — Best Value 7-Day Adventure",
    "destination": "Galapagos",
    "duration": "7 Days / 6 Nights",
    "price": 1399,
    "imageUrl": "https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Fgalapagos-economic-hero.jpg?alt=media&token=a194361f-b923-46c2-b1e3-bb95e74ead75",
    "rating": 4.7,
    "reviewsCount": 38,
    "category": "Best Value Galapagos",
    "isPopular": false,
    "description": "Discover the magic of the Galapagos on a budget-friendly 7-day itinerary without compromising the wildlife experience. Visit Santa Cruz and San Cristobal Islands with an expert naturalist guide.",
    "gallery": [
      "https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Fgalapagos-economic-hero.jpg?alt=media&token=a194361f-b923-46c2-b1e3-bb95e74ead75"
    ],
    "highlights": [
      "Giant tortoise reserve at Santa Cruz highlands",
      "Snorkeling at La Loberia & Kicker Rock",
      "Marine iguanas & blue-footed boobies",
      "Certified bilingual naturalist guide"
    ],
    "inclusions": [
      "6 nights accommodation in comfortable hotels",
      "Daily breakfasts & lunches on excursion days",
      "Snorkeling gear & wetsuits",
      "Inter-island speedboat transfers",
      "Private certified bilingual guide"
    ],
    "exclusions": [
      "International & domestic flights",
      "Galapagos National Park fee ($200 USD)",
      "Transit Control Card ($20 USD)",
      "Personal expenses & gratuities"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival in San Cristobal",
        "description": "Airport welcome & hotel check-in. Evening at La Loberia beach with sea lion pups.",
        "meals": "Welcome Lunch",
        "accommodation": "San Cristobal Hotel 3★"
      },
      {
        "day": 2,
        "title": "Kicker Rock Snorkel",
        "description": "Full day yacht excursion to León Dormido snorkeling with sharks & rays.",
        "meals": "Breakfast & Onboard Lunch",
        "accommodation": "San Cristobal Hotel 3★"
      },
      {
        "day": 3,
        "title": "Santa Cruz Transfer & Highlands",
        "description": "Speedboat to Santa Cruz. Giant tortoise reserve in the misty highlands.",
        "meals": "Breakfast & Lunch",
        "accommodation": "Puerto Ayora Hotel 3★"
      },
      {
        "day": 4,
        "title": "Tortuga Bay & Las Ninfas",
        "description": "Morning hike to Tortuga Bay. Afternoon at mangrove-lined Las Ninfas lagoon.",
        "meals": "Breakfast",
        "accommodation": "Puerto Ayora Hotel 3★"
      },
      {
        "day": 5,
        "title": "Black Turtle Cove Kayaking",
        "description": "Kayak tour through quiet mangroves spotting sea turtles and reef sharks.",
        "meals": "Breakfast & Lunch",
        "accommodation": "Puerto Ayora Hotel 3★"
      },
      {
        "day": 6,
        "title": "Santa Cruz Fish Market & Pelicans",
        "description": "Morning visit to the fish market where pelicans & sea lions compete for scraps.",
        "meals": "Breakfast",
        "accommodation": "Puerto Ayora Hotel 3★"
      },
      {
        "day": 7,
        "title": "Baltra Airport & Departure",
        "description": "Transfer to Baltra airport for return flight.",
        "meals": "Breakfast"
      }
    ]
  },
  {
    "id": "galapagos-santa-cruz-premium",
    "title": "Galapagos Santa Cruz Premium Service — All-Inclusive Luxury",
    "destination": "Galapagos",
    "duration": "6 Days / 5 Nights",
    "price": 2345,
    "imageUrl": "https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Fgalapagos-santa-cruz-premium-hero.jpg?alt=media&token=1045ac34-675b-4891-9c32-2371e1a3b428",
    "rating": 5,
    "reviewsCount": 44,
    "category": "Luxury Galapagos Premium",
    "isPopular": true,
    "description": "The ultimate Santa Cruz Island premium experience: private yacht excursions, boutique hotel, all-inclusive gourmet dining, and daily guided wildlife adventures with a dedicated certified naturalist.",
    "gallery": [
      "https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Fgalapagos-santa-cruz-premium-hero.jpg?alt=media&token=1045ac34-675b-4891-9c32-2371e1a3b428"
    ],
    "highlights": [
      "All-inclusive gourmet meals & premium accommodation",
      "Private naturalist-led yacht day excursions",
      "Snorkel with sea turtles at Bahia Tortuga",
      "Giant tortoise highland reserve & Charles Darwin Station"
    ],
    "inclusions": [
      "5 nights at top-rated oceanfront boutique hotel",
      "All breakfasts, lunches & dinners",
      "Premium snorkeling gear, kayak & paddleboard",
      "Full-day private yacht excursions",
      "PNG-certified bilingual naturalist guide",
      "All land & water transfers"
    ],
    "exclusions": [
      "Flights to/from Galapagos",
      "National Park fee ($200 USD)",
      "Transit card ($20 USD)"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival & Welcome Dinner",
        "description": "Private transfer to your boutique hotel. Welcome orientation dinner by your guide.",
        "meals": "Gourmet Welcome Dinner",
        "accommodation": "Royal Palm Galapagos 5★"
      },
      {
        "day": 2,
        "title": "Charles Darwin Station & Giant Tortoises",
        "description": "Visit the famous research station then highlands tortoise reserve.",
        "meals": "Breakfast, Lunch & Dinner",
        "accommodation": "Royal Palm Galapagos 5★"
      },
      {
        "day": 3,
        "title": "Yacht to Santa Fe & Las Grietas",
        "description": "Full day yacht excursion: snorkel Santa Fe Island, swim at volcanic Las Grietas crevice.",
        "meals": "Breakfast, Onboard Lunch & Dinner",
        "accommodation": "Royal Palm Galapagos 5★"
      },
      {
        "day": 4,
        "title": "Tortuga Bay & Ocean Kayaking",
        "description": "Hike through cactus forest to pristine Tortuga Bay. Afternoon sea kayaking.",
        "meals": "Breakfast, Lunch & Dinner",
        "accommodation": "Royal Palm Galapagos 5★"
      },
      {
        "day": 5,
        "title": "Scuba or Snorkel at Seymour Norte",
        "description": "Private boat to North Seymour to watch nesting frigatebirds and blue-footed boobies.",
        "meals": "Breakfast, Packed Lunch & Farewell Dinner",
        "accommodation": "Royal Palm Galapagos 5★"
      },
      {
        "day": 6,
        "title": "Baltra Airport Departure",
        "description": "Transfer to Baltra airport for your outbound flight.",
        "meals": "Breakfast"
      }
    ]
  },
  {
    "id": "galapagos-santa-cruz-isabela-premium",
    "title": "Galapagos Santa Cruz & Isabela Premium Service",
    "destination": "Galapagos",
    "duration": "9 Days / 8 Nights",
    "price": 2747,
    "imageUrl": "https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Fgalapagos-santa-cruz-isabela-premium-hero.jpg?alt=media&token=6dc151b4-9082-4270-a304-22fc2530ae59",
    "rating": 4.9,
    "reviewsCount": 33,
    "category": "Premium Island Hopping",
    "isPopular": true,
    "description": "The most complete premium island-hopping experience. Explore Santa Cruz and Isabela Island with premium accommodations, all-inclusive gourmet meals, and exclusive excursions unavailable on group tours.",
    "gallery": [
      "https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Fgalapagos-santa-cruz-isabela-premium-hero.jpg?alt=media&token=6dc151b4-9082-4270-a304-22fc2530ae59"
    ],
    "highlights": [
      "Premium all-inclusive two-island hopping experience",
      "Sierra Negra volcano hike on Isabela Island",
      "Galapagos penguin spotting at Tintoreras Islet",
      "Snorkel Isabela's blue-water marine corridor"
    ],
    "inclusions": [
      "8 nights top-rated boutique hotels (4★-5★)",
      "All gourmet meals & premium soft drinks",
      "Private yacht excursions on both islands",
      "Inter-island speedboat & all transfers",
      "Certified bilingual private naturalist"
    ],
    "exclusions": [
      "Flights to/from Galapagos",
      "National Park fee ($200 USD)",
      "Transit card ($20 USD)",
      "Gratuities"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival Santa Cruz & Darwin Station",
        "description": "Arrival in Baltra, transfer to hotel in Puerto Ayora and guided tour of Charles Darwin Station.",
        "meals": "Lunch & Dinner",
        "accommodation": "Finch Bay Eco Hotel 4★"
      },
      {
        "day": 2,
        "title": "Giant Tortoise Reserve & Highlands",
        "description": "Morning highlands tour observing giant tortoises in the wild.",
        "meals": "Breakfast, Lunch & Dinner",
        "accommodation": "Finch Bay Eco Hotel 4★"
      },
      {
        "day": 3,
        "title": "Yacht to Santa Fe Snorkeling",
        "description": "Full-day private yacht excursion to snorkel the pristine waters of Santa Fe Island.",
        "meals": "Breakfast, Onboard Lunch & Dinner",
        "accommodation": "Finch Bay Eco Hotel 4★"
      },
      {
        "day": 4,
        "title": "Las Grietas & Tortuga Bay",
        "description": "Swim in Las Grietas volcanic crevice, hike to stunning Tortuga Bay.",
        "meals": "Breakfast, Lunch & Dinner",
        "accommodation": "Finch Bay Eco Hotel 4★"
      },
      {
        "day": 5,
        "title": "Isabela Island Transfer & Tintoreras",
        "description": "Speedboat to Isabela. Evening tour around Tintoreras islet spotting Galapagos penguins.",
        "meals": "Breakfast, Lunch & Dinner",
        "accommodation": "Albemarle Isabela Hotel 4★"
      },
      {
        "day": 6,
        "title": "Sierra Negra Volcano Hike",
        "description": "Trek the rim of the world's second-largest volcanic caldera with sweeping ocean views.",
        "meals": "Breakfast, Trail Lunch & Dinner",
        "accommodation": "Albemarle Isabela Hotel 4★"
      },
      {
        "day": 7,
        "title": "Isabela Marine Reserve Snorkel",
        "description": "Dive into Isabela's pristine marine reserve, spot hammerhead sharks & manta rays.",
        "meals": "Breakfast, Onboard Lunch & Dinner",
        "accommodation": "Albemarle Isabela Hotel 4★"
      },
      {
        "day": 8,
        "title": "Flamingo & Seahorse Lagoons",
        "description": "Visit the flamingo breeding lagoons and swimming seahorse alcove.",
        "meals": "Breakfast, Lunch & Farewell Dinner",
        "accommodation": "Albemarle Isabela Hotel 4★"
      },
      {
        "day": 9,
        "title": "Transfer to Baltra & Departure",
        "description": "Boat to Santa Cruz, bus to Baltra airport for outbound flight.",
        "meals": "Breakfast"
      }
    ]
  },
  {
    "id": "full-galapagos-3-islands",
    "title": "Full Galapagos: San Cristobal, Santa Cruz & Isabela",
    "destination": "Galapagos",
    "duration": "9 Days / 8 Nights",
    "price": 2300,
    "imageUrl": "https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Ffull-galapagos-3-islands-hero.jpg?alt=media&token=027a53ff-89fe-4eb1-8ef2-2a888a47f097",
    "rating": 4.8,
    "reviewsCount": 55,
    "category": "Complete Galapagos Island Hopping",
    "isPopular": true,
    "description": "The most comprehensive Galapagos island-hopping adventure. Explore all three inhabited islands — San Cristobal, Santa Cruz, and Isabela — staying in comfortable boutique hotels with expert naturalist guides.",
    "gallery": [
      "https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Ffull-galapagos-3-islands-hero.jpg?alt=media&token=027a53ff-89fe-4eb1-8ef2-2a888a47f097"
    ],
    "highlights": [
      "Three-island complete Galapagos experience",
      "Kicker Rock snorkel & open-ocean diving",
      "Sierra Negra volcano hike on Isabela",
      "Santa Cruz giant tortoise highland reserve"
    ],
    "inclusions": [
      "8 nights boutique hotels across 3 islands",
      "Daily breakfasts & lunches on excursion days",
      "Inter-island speedboat transfers",
      "Certified bilingual naturalist guide",
      "Snorkeling gear"
    ],
    "exclusions": [
      "International flights",
      "National Park fee ($200 USD)",
      "Transit card ($20 USD)",
      "Gratuities & personal expenses"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival San Cristobal & La Loberia",
        "description": "Airport arrival, hotel check-in, La Loberia sunset beach walk with sea lions.",
        "meals": "Lunch",
        "accommodation": "Casa Blanca San Cristobal 3★"
      },
      {
        "day": 2,
        "title": "Kicker Rock Snorkel Expedition",
        "description": "Full-day boat tour to León Dormido: Galapagos sharks, eagle rays, sea turtles.",
        "meals": "Breakfast & Onboard Lunch",
        "accommodation": "Casa Blanca San Cristobal 3★"
      },
      {
        "day": 3,
        "title": "Santa Cruz Transfer & Highlands",
        "description": "Speedboat to Santa Cruz, afternoon giant tortoise reserve tour.",
        "meals": "Breakfast & Lunch",
        "accommodation": "Solymar Oceanfront 3★"
      },
      {
        "day": 4,
        "title": "Tortuga Bay Kayaking & Las Ninfas",
        "description": "Hike to Tortuga Bay and kayak through mangrove-lined Las Ninfas.",
        "meals": "Breakfast & Lunch",
        "accommodation": "Solymar Oceanfront 3★"
      },
      {
        "day": 5,
        "title": "Santa Fe Island Snorkel Cruise",
        "description": "Boat excursion to Santa Fe to snorkel with sea lions and colorful fish.",
        "meals": "Breakfast & Onboard Lunch",
        "accommodation": "Solymar Oceanfront 3★"
      },
      {
        "day": 6,
        "title": "Isabela Transfer & Tintoreras",
        "description": "Speedboat to Isabela, afternoon Tintoreras penguin and iguana tour.",
        "meals": "Breakfast & Lunch",
        "accommodation": "Albemarle Hotel Isabela 3★"
      },
      {
        "day": 7,
        "title": "Sierra Negra Volcano Hike",
        "description": "Trek the spectacular crater rim of Sierra Negra active volcano.",
        "meals": "Breakfast & Trail Lunch",
        "accommodation": "Albemarle Hotel Isabela 3★"
      },
      {
        "day": 8,
        "title": "Flamingo Lagoons & Snorkel Concha de Perla",
        "description": "Morning flamingo lagoon, afternoon snorkel the famous Concha de Perla marine reserve.",
        "meals": "Breakfast & Lunch",
        "accommodation": "Albemarle Hotel Isabela 3★"
      },
      {
        "day": 9,
        "title": "Return to Baltra & Departure",
        "description": "Transfer via speedboat and bus to Baltra airport.",
        "meals": "Breakfast"
      }
    ]
  },
  {
    "id": "ecuador-andes-jungle",
    "title": "Ecuador Andes & Jungle of the Amazon",
    "destination": "Ecuador",
    "duration": "7 Days / 6 Nights",
    "price": 1307,
    "imageUrl": "https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=800&q=80",
    "rating": 4.7,
    "reviewsCount": 21,
    "category": "Andes & Amazon",
    "isPopular": false,
    "description": "Explore the incredible contrast of Ecuador: traverse the Avenue of Volcanoes in the highlands and then descend into the lush Amazon basin for an authentic jungle adventure at a private eco-lodge.",
    "gallery": [
      "https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=1200&q=80"
    ],
    "highlights": [
      "Cotopaxi Volcano Lagoon hike at 3,800m",
      "Amazon eco-lodge with nightly wildlife walks",
      "Quito UNESCO colonial heritage tour",
      "Canopy zip-line over Amazonian treetops"
    ],
    "inclusions": [
      "6 nights (boutique hotel + Amazon eco-lodge)",
      "Daily breakfasts & Amazon jungle meals",
      "Private guide & transport throughout",
      "All listed jungle activities"
    ],
    "exclusions": [
      "International flights",
      "Gratuities",
      "Personal expenses"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival Quito",
        "description": "Private airport pickup and hotel check-in.",
        "meals": "None",
        "accommodation": "Hotel Boutique Quito 4★"
      },
      {
        "day": 2,
        "title": "Colonial Quito & Equatorial Line",
        "description": "Walk the UNESCO Old Town, visit Mitad del Mundo monument.",
        "meals": "Breakfast",
        "accommodation": "Hotel Boutique Quito 4★"
      },
      {
        "day": 3,
        "title": "Cotopaxi Volcano Highlands",
        "description": "Drive to Cotopaxi National Park. Hike near Limpiopungo lagoon and approach the glacier.",
        "meals": "Breakfast & Picnic Lunch",
        "accommodation": "Hotel Boutique Quito 4★"
      },
      {
        "day": 4,
        "title": "Transfer to Tena Amazon Lodge",
        "description": "Descend the Andes into the Amazon. Afternoon arrival at eco-lodge.",
        "meals": "Breakfast & Dinner",
        "accommodation": "Tena Eco-Lodge 3★"
      },
      {
        "day": 5,
        "title": "Jungle Safari: Canoe & Wildlife",
        "description": "Motorized canoe safari, wildlife spotting, and Quichua community visit.",
        "meals": "Breakfast, Lunch & Dinner",
        "accommodation": "Tena Eco-Lodge 3★"
      },
      {
        "day": 6,
        "title": "Canopy & Return to Quito",
        "description": "Morning zip-line canopy experience, afternoon transfer back to Quito.",
        "meals": "Breakfast",
        "accommodation": "Hotel Boutique Quito 4★"
      },
      {
        "day": 7,
        "title": "Departure Transfer",
        "description": "Private transfer to Quito airport.",
        "meals": "Breakfast"
      }
    ]
  },
  {
    "id": "ecuador-snow-waterfalls",
    "title": "Ecuador Snow & Waterfalls — Volcanic Highland Adventure",
    "destination": "Ecuador",
    "duration": "6 Days / 5 Nights",
    "price": 919,
    "imageUrl": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
    "rating": 4.6,
    "reviewsCount": 17,
    "category": "Highlands Adventure",
    "isPopular": false,
    "description": "A compact and thrilling highland adventure through Ecuador's most spectacular volcanic scenery: active Tungurahua snowcap, the thundering Pailon del Diablo waterfall, and the Avenue of Volcanoes.",
    "gallery": [
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80"
    ],
    "highlights": [
      "Pailon del Diablo, the \"Devil's Cauldron\" waterfall",
      "Adventure swing at the \"End of the World\"",
      "Active Tungurahua volcano overlook",
      "Quilotoa volcanic crater lake"
    ],
    "inclusions": [
      "5 nights boutique hotels & highland lodges",
      "Daily breakfasts & 3 lunches",
      "Private transport & bilingual guide",
      "All activity entrance fees"
    ],
    "exclusions": [
      "International flights",
      "Dinners not listed",
      "Gratuities"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival Quito & Old Town",
        "description": "Airport pickup, colonial Quito orientation walk.",
        "meals": "None",
        "accommodation": "Hotel Quito 3★"
      },
      {
        "day": 2,
        "title": "Quilotoa Crater Lake Hike",
        "description": "Hike around the stunning turquoise volcanic crater lake.",
        "meals": "Breakfast & Lunch",
        "accommodation": "Quilotoa Lodge"
      },
      {
        "day": 3,
        "title": "Riobamba & Chimborazo Glacier",
        "description": "Drive through the Avenue of Volcanoes. Visit Chimborazo, the world's closest point to the sun.",
        "meals": "Breakfast & Lunch",
        "accommodation": "Hotel Riobamba 3★"
      },
      {
        "day": 4,
        "title": "Baños & Pailon del Diablo",
        "description": "Visit the thermal waterfall town of Baños and the powerful Pailon del Diablo cascade.",
        "meals": "Breakfast",
        "accommodation": "Hotel Sangay Baños 3★"
      },
      {
        "day": 5,
        "title": "Ruta de las Cascadas & Edge Swing",
        "description": "Bike the waterfall route, ride the famous edge-of-the-world swing.",
        "meals": "Breakfast & Lunch",
        "accommodation": "Hotel Sangay Baños 3★"
      },
      {
        "day": 6,
        "title": "Return Quito & Departure",
        "description": "Transfer to Quito airport.",
        "meals": "Breakfast"
      }
    ]
  },
  {
    "id": "ecuador-volcanoes-rivers",
    "title": "Ecuador Volcanoes & Rivers — Whitewater & Volcanic Peaks",
    "destination": "Ecuador",
    "duration": "8 Days / 7 Nights",
    "price": 1543,
    "imageUrl": "https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Fecuador-volcanoes-rivers-hero.jpg?alt=media&token=4f1659dc-e0f0-41bf-9c9a-f8c4bb06f4fe",
    "rating": 4.8,
    "reviewsCount": 14,
    "category": "Adventure & Nature",
    "isPopular": false,
    "description": "The ultimate Ecuadorian adventure combining active volcano hikes, thrilling Class III–IV whitewater rafting on the Toachi and Blanco rivers, and a visit to the pristine Quilotoa crater lake.",
    "gallery": [
      "https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Fecuador-volcanoes-rivers-hero.jpg?alt=media&token=4f1659dc-e0f0-41bf-9c9a-f8c4bb06f4fe"
    ],
    "highlights": [
      "Class III-IV whitewater rafting on Toachi River",
      "Cotopaxi National Park overnight hike",
      "Quilotoa emerald crater lake",
      "Horseback riding through volcanic highland páramo"
    ],
    "inclusions": [
      "7 nights accommodation (lodges & boutique hotels)",
      "All rafting & adventure equipment",
      "Daily breakfasts & 5 lunches",
      "Bilingual adventure guide"
    ],
    "exclusions": [
      "International flights",
      "Travel insurance",
      "Gratuities"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Quito Arrival",
        "description": "Welcome meeting and gear briefing.",
        "meals": "None",
        "accommodation": "Hotel Boutique Quito 3★"
      },
      {
        "day": 2,
        "title": "Colonial Quito City Tour",
        "description": "Full guided day of Quito's UNESCO historic centre.",
        "meals": "Breakfast",
        "accommodation": "Hotel Boutique Quito 3★"
      },
      {
        "day": 3,
        "title": "Cotopaxi Hike & Limpiopungo",
        "description": "Hike near the Cotopaxi Lagoon with snowcapped views.",
        "meals": "Breakfast & Picnic Lunch",
        "accommodation": "Hacienda Cotopaxi"
      },
      {
        "day": 4,
        "title": "Horseback Riding Páramo",
        "description": "Equestrian tour through the volcanic páramo ecosystem.",
        "meals": "Breakfast & Lunch",
        "accommodation": "Hacienda Cotopaxi"
      },
      {
        "day": 5,
        "title": "Quilotoa Crater Lake",
        "description": "Hike down into the crater and kayak on the emerald lagoon.",
        "meals": "Breakfast & Lunch",
        "accommodation": "Quilotoa Lodge"
      },
      {
        "day": 6,
        "title": "Toachi River Whitewater Rafting",
        "description": "Class III-IV full-day rafting on the Toachi River through lush canyon.",
        "meals": "Breakfast & Riverside Lunch",
        "accommodation": "Hotel Baños 3★"
      },
      {
        "day": 7,
        "title": "Blanco River Rafting & Pailon del Diablo",
        "description": "Morning rafting on Class III Blanco River, afternoon at Devil's Cauldron falls.",
        "meals": "Breakfast & Lunch",
        "accommodation": "Hotel Baños 3★"
      },
      {
        "day": 8,
        "title": "Return Quito & Departure",
        "description": "Transfer to Quito airport.",
        "meals": "Breakfast"
      }
    ]
  },
  {
    "id": "andean-world",
    "title": "Andean World — Quito, Otavalo & Volcanic Lakes",
    "destination": "Ecuador",
    "duration": "10 Days / 9 Nights",
    "price": 1999,
    "imageUrl": "https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Fandean-world-hero.jpg?alt=media&token=ae1e2646-4b82-41f2-9ac1-a10bfd22824d",
    "rating": 4.8,
    "reviewsCount": 23,
    "category": "Cultural & Nature",
    "isPopular": false,
    "description": "A rich cultural immersion through northern Ecuador: indigenous Otavalo market, volcanic lakes of Cuicocha and Quilotoa, colonial Cuenca, and the biodiversity of the cloud forest.",
    "gallery": [
      "https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Fandean-world-hero.jpg?alt=media&token=ae1e2646-4b82-41f2-9ac1-a10bfd22824d"
    ],
    "highlights": [
      "Otavalo Saturday craft market (largest in South America)",
      "Cuicocha volcanic crater lake boat tour",
      "Cuenca UNESCO colonial city walk",
      "Cloud forest birdwatching near Mindo"
    ],
    "inclusions": [
      "9 nights boutique hotels & lodges",
      "Daily breakfasts & 6 lunches",
      "Private transport & bilingual guide",
      "All entrance fees & activities"
    ],
    "exclusions": [
      "International flights",
      "Personal expenses",
      "Gratuities"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Quito Arrival",
        "description": "Airport pickup, hotel check-in.",
        "meals": "None",
        "accommodation": "Boutique Hotel Quito 4★"
      },
      {
        "day": 2,
        "title": "Colonial Quito & Cable Car",
        "description": "Old Town tour + cable car ride up to 4,100m for volcano panoramas.",
        "meals": "Breakfast",
        "accommodation": "Boutique Hotel Quito 4★"
      },
      {
        "day": 3,
        "title": "Mindo Cloud Forest",
        "description": "Birdwatching, butterfly garden, and canopy zip-line in the cloud forest.",
        "meals": "Breakfast & Lunch",
        "accommodation": "Mindo Garden Lodge 3★"
      },
      {
        "day": 4,
        "title": "Otavalo Saturday Market",
        "description": "Shop the famous indigenous craft market and visit local artisan workshops.",
        "meals": "Breakfast & Lunch",
        "accommodation": "Hacienda Cusin 4★"
      },
      {
        "day": 5,
        "title": "Cuicocha Volcanic Lake",
        "description": "Boat tour on the stunning twin-island crater lake of Cuicocha.",
        "meals": "Breakfast & Lunch",
        "accommodation": "Hacienda Cusin 4★"
      },
      {
        "day": 6,
        "title": "Quilotoa Crater Trek",
        "description": "Hike the magnificent Quilotoa loop crater.",
        "meals": "Breakfast & Lunch",
        "accommodation": "Quilotoa Lodge"
      },
      {
        "day": 7,
        "title": "Riobamba & Chimborazo",
        "description": "Visit the ice harvester community at Chimborazo volcano (6,263m).",
        "meals": "Breakfast & Lunch",
        "accommodation": "Hotel Riobamba 4★"
      },
      {
        "day": 8,
        "title": "Cuenca Colonial City",
        "description": "Walking tour of UNESCO Cuenca: cathedral, panama hat workshops.",
        "meals": "Breakfast & Lunch",
        "accommodation": "Hotel Santa Lucia Cuenca 4★"
      },
      {
        "day": 9,
        "title": "El Cajas National Park",
        "description": "Hike through Andean wetland páramo with trout lakes and birds.",
        "meals": "Breakfast & Lunch",
        "accommodation": "Hotel Santa Lucia Cuenca 4★"
      },
      {
        "day": 10,
        "title": "Flight Return to Quito & Departure",
        "description": "Domestic flight Cuenca-Quito, connection to international airport.",
        "meals": "Breakfast"
      }
    ]
  },
  {
    "id": "fantastic-ecuador",
    "title": "Fantastic Ecuador — Quito, Amazon & Cloud Forest",
    "destination": "Ecuador",
    "duration": "8 Days / 7 Nights",
    "price": 1195,
    "imageUrl": "https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Ffantastic-ecuador-hero.jpg?alt=media&token=225ccce4-e023-4bfb-acd9-61fd45564953",
    "rating": 4.7,
    "reviewsCount": 28,
    "category": "Essential Ecuador",
    "isPopular": false,
    "description": "The perfect introduction to Ecuador's three iconic worlds: colonial Quito, the mystical cloud forest of Mindo, and a 3-day Amazon eco-lodge adventure in the pristine Tena rainforest.",
    "gallery": [
      "https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Ffantastic-ecuador-hero.jpg?alt=media&token=225ccce4-e023-4bfb-acd9-61fd45564953"
    ],
    "highlights": [
      "Mindo cloud forest & glass butterfly farm",
      "Amazon eco-lodge night wildlife walks",
      "Quito cable car panorama",
      "Motorized canoe safaris on Amazon rivers"
    ],
    "inclusions": [
      "7 nights (hotel + cloud forest lodge + eco-lodge)",
      "Daily breakfasts & Amazon meals",
      "Private guide & transport",
      "All cloud forest & jungle activities"
    ],
    "exclusions": [
      "International flights",
      "Gratuities",
      "Personal expenses"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Quito Arrival",
        "description": "Airport pickup and colonial city orientation.",
        "meals": "None",
        "accommodation": "Hotel Boutique Quito 3★"
      },
      {
        "day": 2,
        "title": "Quito Old Town & Equator",
        "description": "Historic centre + Mitad del Mundo monument.",
        "meals": "Breakfast",
        "accommodation": "Hotel Boutique Quito 3★"
      },
      {
        "day": 3,
        "title": "Mindo Cloud Forest",
        "description": "Bird-watching, zip-line, butterfly garden, chocolate farm tour.",
        "meals": "Breakfast & Lunch",
        "accommodation": "Mindo Garden Lodge 3★"
      },
      {
        "day": 4,
        "title": "Transfer to Amazon Tena Lodge",
        "description": "Drive from Quito through the Andes down to Tena lodge.",
        "meals": "Breakfast & Dinner",
        "accommodation": "Tena Eco-Lodge 3★"
      },
      {
        "day": 5,
        "title": "Jungle Safari & Rescue Center",
        "description": "Canoe safari, visit animal rescue center and Quichua community.",
        "meals": "Breakfast, Lunch & Dinner",
        "accommodation": "Tena Eco-Lodge 3★"
      },
      {
        "day": 6,
        "title": "Paikawe Lagoon Reserve",
        "description": "Guided walk inside the pristine jungle reserve spotting wildlife.",
        "meals": "Breakfast, Lunch & Dinner",
        "accommodation": "Tena Eco-Lodge 3★"
      },
      {
        "day": 7,
        "title": "Return to Quito",
        "description": "Transfer back to Quito. Rest of day free.",
        "meals": "Breakfast",
        "accommodation": "Hotel Boutique Quito 3★"
      },
      {
        "day": 8,
        "title": "Departure Transfer",
        "description": "Private transfer to Quito international airport.",
        "meals": "Breakfast"
      }
    ]
  },
  {
    "id": "quito-galapagos-cusco-machu-picchu",
    "title": "Grand South America: Quito, Galapagos, Cusco & Machu Picchu",
    "destination": "Ecuador & Peru",
    "duration": "13 Days / 12 Nights",
    "price": 4910,
    "imageUrl": "https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Fquito-galapagos-cusco-machu-picchu-hero.jpg?alt=media&token=aa6a24d3-6a0d-4652-b5c7-f95e47f22b6e",
    "rating": 5,
    "reviewsCount": 16,
    "category": "Grand South America Expedition",
    "isPopular": true,
    "description": "The ultimate South America luxury expedition: colonial Quito, the Galapagos Archipelago, imperial Cusco, and the breathtaking citadel of Machu Picchu — the grandest journey in the Americas.",
    "gallery": [
      "https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Fquito-galapagos-cusco-machu-picchu-hero.jpg?alt=media&token=aa6a24d3-6a0d-4652-b5c7-f95e47f22b6e"
    ],
    "highlights": [
      "Galapagos wildlife snorkeling & island hopping",
      "Machu Picchu private VIP guided tour",
      "Cusco 5★ luxury historical hotels",
      "Quito UNESCO heritage private tour"
    ],
    "inclusions": [
      "12 nights luxury 4★ & 5★ hotels",
      "All internal flights (Quito-Galapagos-Quito-Cusco)",
      "Daily breakfasts & specified meals",
      "All private guides, transfers & listed excursions",
      "Machu Picchu entrance & Vistadome train tickets"
    ],
    "exclusions": [
      "International arrival & departure flights",
      "Galapagos National Park fee ($200 USD)",
      "Travel insurance",
      "Gratuities"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival Quito",
        "description": "Private airport transfer to luxury boutique hotel.",
        "meals": "None",
        "accommodation": "Casa Gangotena Quito 5★"
      },
      {
        "day": 2,
        "title": "Colonial Quito & Equator",
        "description": "Private guided colonial tour + Mitad del Mundo monument.",
        "meals": "Breakfast",
        "accommodation": "Casa Gangotena Quito 5★"
      },
      {
        "day": 3,
        "title": "Fly to Galapagos: San Cristobal",
        "description": "Flight to San Cristobal, La Loberia sea lion beach.",
        "meals": "Breakfast, Lunch & Dinner",
        "accommodation": "Casa Opuntia Galapagos 4★"
      },
      {
        "day": 4,
        "title": "Kicker Rock Snorkel Expedition",
        "description": "Full-day yacht to Kicker Rock: Galapagos sharks & eagle rays.",
        "meals": "Breakfast & Onboard Lunch",
        "accommodation": "Casa Opuntia Galapagos 4★"
      },
      {
        "day": 5,
        "title": "Santa Cruz: Tortoises & Las Grietas",
        "description": "Speedboat to Santa Cruz, highland tortoises, Las Grietas snorkel.",
        "meals": "Breakfast, Lunch & Dinner",
        "accommodation": "Finch Bay Eco Hotel 4★"
      },
      {
        "day": 6,
        "title": "Galapagos: Santa Fe Island",
        "description": "Boat excursion to pristine Santa Fe Island snorkeling.",
        "meals": "Breakfast, Onboard Lunch & Dinner",
        "accommodation": "Finch Bay Eco Hotel 4★"
      },
      {
        "day": 7,
        "title": "Tortuga Bay & Fly Back Quito",
        "description": "Morning at Tortuga Bay, afternoon flight to Quito.",
        "meals": "Breakfast",
        "accommodation": "Casa Gangotena Quito 5★"
      },
      {
        "day": 8,
        "title": "Fly Quito to Cusco",
        "description": "Morning flight. Afternoon check-in to luxury Cusco hotel with coca tea welcome.",
        "meals": "Breakfast & Welcome Tea",
        "accommodation": "Palacio del Inka 5★"
      },
      {
        "day": 9,
        "title": "Imperial Cusco: Qorikancha & Sacsayhuaman",
        "description": "Private guided tour of Cusco's Inca and colonial treasures.",
        "meals": "Breakfast",
        "accommodation": "Palacio del Inka 5★"
      },
      {
        "day": 10,
        "title": "Sacred Valley & Ollantaytambo",
        "description": "Visit Pisac market, Maras salt pans, and Ollantaytambo fortress.",
        "meals": "Breakfast & Andean Buffet",
        "accommodation": "Tambo del Inka Resort 5★"
      },
      {
        "day": 11,
        "title": "Vistadome Train & Machu Picchu",
        "description": "Panoramic train to Aguas Calientes. Afternoon VIP tour of Machu Picchu citadel.",
        "meals": "Breakfast & Lunch at Sanctuary Lodge",
        "accommodation": "Inkaterra Pueblo Hotel 5★"
      },
      {
        "day": 12,
        "title": "Rainbow Mountain Trek",
        "description": "Spectacular high-altitude hike to Vinicunca Rainbow Mountain (5,020m).",
        "meals": "Breakfast & Box Lunch",
        "accommodation": "Palacio del Inka Cusco 5★"
      },
      {
        "day": 13,
        "title": "Cusco Airport & Departure",
        "description": "Transfer to Alejandro Velasco Airport. Fly Lima connections.",
        "meals": "Breakfast"
      }
    ]
  },
  {
    "id": "snow-waterfalls-galapagos",
    "title": "Snow & Waterfalls + Full Galapagos Islands",
    "destination": "Ecuador & Galapagos",
    "duration": "11 Days / 10 Nights",
    "price": 2526,
    "imageUrl": "https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Fsnow-waterfalls-galapagos-hero.jpg?alt=media&token=681bc54b-415e-427d-a9ad-d8647a933ecd",
    "rating": 4.9,
    "reviewsCount": 22,
    "category": "Ecuador & Galapagos Combined",
    "isPopular": true,
    "description": "The perfect combination tour: discover Ecuador's highland volcanic wonders with waterfalls and snowcapped Chimborazo, then fly to the Galapagos for 5 days of world-class wildlife adventures.",
    "gallery": [
      "https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Fsnow-waterfalls-galapagos-hero.jpg?alt=media&token=681bc54b-415e-427d-a9ad-d8647a933ecd"
    ],
    "highlights": [
      "Chimborazo glacier visit (highest point in Ecuador)",
      "Pailon del Diablo waterfall & swing",
      "Galapagos snorkeling at Kicker Rock",
      "Giant tortoise highland reserve"
    ],
    "inclusions": [
      "10 nights (highland lodges + Galapagos boutique hotels)",
      "Flight Quito–Galapagos–Quito",
      "Daily breakfasts & lunches",
      "Private guide & transport throughout"
    ],
    "exclusions": [
      "International flights",
      "National Park fee ($200 USD)",
      "Transit card ($20 USD)",
      "Gratuities"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Quito Arrival & Old Town",
        "description": "Airport pickup. Evening colonial city walk.",
        "meals": "None",
        "accommodation": "Hotel Quito 3★"
      },
      {
        "day": 2,
        "title": "Quilotoa Crater Lake",
        "description": "Scenic drive and hike around the stunning emerald crater.",
        "meals": "Breakfast & Lunch",
        "accommodation": "Quilotoa Lodge"
      },
      {
        "day": 3,
        "title": "Riobamba & Chimborazo",
        "description": "Explore the world's highest dormant volcano at Chimborazo.",
        "meals": "Breakfast & Lunch",
        "accommodation": "Hotel Riobamba 3★"
      },
      {
        "day": 4,
        "title": "Baños & Pailon del Diablo",
        "description": "Full waterfall route day in Baños culminating at Devil's Cauldron.",
        "meals": "Breakfast",
        "accommodation": "Hotel Sangay Baños 3★"
      },
      {
        "day": 5,
        "title": "Return Quito & Fly to Galapagos",
        "description": "Morning transfer and afternoon flight to San Cristobal Galapagos.",
        "meals": "Breakfast, Lunch & Dinner",
        "accommodation": "San Cristobal Hotel 3★"
      },
      {
        "day": 6,
        "title": "Kicker Rock Snorkel Expedition",
        "description": "Open ocean boat excursion to León Dormido — sharks, rays, sea turtles.",
        "meals": "Breakfast & Onboard Lunch",
        "accommodation": "San Cristobal Hotel 3★"
      },
      {
        "day": 7,
        "title": "Santa Cruz: Tortoises & Las Grietas",
        "description": "Speedboat to Santa Cruz. Highlands tortoises & volcanic Las Grietas crevice snorkel.",
        "meals": "Breakfast, Lunch & Dinner",
        "accommodation": "Solymar Hotel 3★"
      },
      {
        "day": 8,
        "title": "Tortuga Bay & Las Ninfas",
        "description": "Hike to Tortuga Bay beach, afternoon Las Ninfas mangrove lagoon.",
        "meals": "Breakfast & Lunch",
        "accommodation": "Solymar Hotel 3★"
      },
      {
        "day": 9,
        "title": "Isabela Island & Tintoreras",
        "description": "Speedboat to Isabela. Tintoreras penguin and iguana tour.",
        "meals": "Breakfast, Lunch & Dinner",
        "accommodation": "Albemarle Hotel 3★"
      },
      {
        "day": 10,
        "title": "Sierra Negra Volcano Hike",
        "description": "Guided trek on the massive volcanic crater rim of Sierra Negra.",
        "meals": "Breakfast & Trail Lunch",
        "accommodation": "Albemarle Hotel 3★"
      },
      {
        "day": 11,
        "title": "Transfer & Departure",
        "description": "Boat to Santa Cruz, bus to Baltra airport for outbound flight.",
        "meals": "Breakfast"
      }
    ]
  },
  {
    "id": "cusco-inca-trail",
    "title": "Cusco, Inca Trail & Machu Picchu — Classic Trek",
    "destination": "Peru",
    "duration": "9 Days / 8 Nights",
    "price": 2600,
    "imageUrl": "https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Fcusco-inca-trail-hero.jpg?alt=media&token=4c6eb5d4-800d-406c-ad7a-330cd37995f2",
    "rating": 5,
    "reviewsCount": 47,
    "category": "Classic Inca Trek",
    "isPopular": true,
    "description": "Experience the legendary 4-day Inca Trail trek to Machu Picchu — the world's most iconic trek. Walk in the footsteps of the Incas through cloud forest, Andean passes, and ancient ruins to arrive at the Sun Gate at sunrise.",
    "gallery": [
      "https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Fcusco-inca-trail-hero.jpg?alt=media&token=4c6eb5d4-800d-406c-ad7a-330cd37995f2"
    ],
    "highlights": [
      "4-day Inca Trail: 42km through cloud forest & Andean passes",
      "Sun Gate (Inti Punku) sunrise arrival at Machu Picchu",
      "Qorikancha Sun Temple & Sacsayhuaman fortress",
      "Private 5★ accommodation in Cusco & Aguas Calientes"
    ],
    "inclusions": [
      "8 nights (5★ Cusco hotel + luxury camping + Machu Picchu Pueblo Hotel)",
      "All Inca Trail permits (booked 6+ months in advance)",
      "Dedicated private trek chef & porters",
      "Official licensed Inca Trail guide",
      "Daily breakfasts & all trek meals",
      "Return Vistadome train from Aguas Calientes"
    ],
    "exclusions": [
      "International flights",
      "Lima-Cusco domestic flight",
      "Travel insurance (mandatory)",
      "Personal equipment & trekking poles",
      "Gratuities for porters & chef"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Cusco Arrival & Acclimatization",
        "description": "Luxury airport welcome and transfer. Afternoon rest with coca tea for altitude.",
        "meals": "Welcome Refreshments",
        "accommodation": "Palacio del Inka 5★"
      },
      {
        "day": 2,
        "title": "Imperial Cusco City Tour",
        "description": "Private guided tour: Qorikancha Sun Temple, Sacsayhuaman fortress, Cusco Cathedral.",
        "meals": "Breakfast",
        "accommodation": "Palacio del Inka 5★"
      },
      {
        "day": 3,
        "title": "Sacred Valley: Pisac & Ollantaytambo",
        "description": "Full-day Sacred Valley tour with highland market and Inca fortress.",
        "meals": "Breakfast & Andean Buffet Lunch",
        "accommodation": "Tambo del Inka Urubamba 5★"
      },
      {
        "day": 4,
        "title": "Inca Trail Day 1: Km 82 to Wayllabamba",
        "description": "Trek start! Follow the Urubamba River through open plains and first Andean ruins.",
        "meals": "Breakfast, Lunch & Gourmet Dinner",
        "accommodation": "Luxury Trek Camp"
      },
      {
        "day": 5,
        "title": "Inca Trail Day 2: Dead Woman's Pass (4,215m)",
        "description": "Hardest day — climb to Warmiwañusca, the highest pass on the trail, with panoramic views.",
        "meals": "Breakfast, Lunch & Dinner",
        "accommodation": "Luxury Trek Camp"
      },
      {
        "day": 6,
        "title": "Inca Trail Day 3: Cloud Forest & Ruins",
        "description": "Trek through cloud forest, passing Phuyupatamarka ruins and Wiñaywayna terraces.",
        "meals": "Breakfast, Lunch & Farewell Camp Dinner",
        "accommodation": "Luxury Trek Camp"
      },
      {
        "day": 7,
        "title": "Inca Trail Day 4: Sun Gate & Machu Picchu",
        "description": "Pre-dawn hike to the Sun Gate (Inti Punku) for sunrise at Machu Picchu. Private VIP citadel tour.",
        "meals": "Breakfast & Lunch at Machu Picchu",
        "accommodation": "Inkaterra Machu Picchu Pueblo Hotel 5★"
      },
      {
        "day": 8,
        "title": "Machu Picchu Exploration Day",
        "description": "Optional: Hike Sun Mountain (Huayna Picchu) or return to citadel with free time. Afternoon Vistadome train to Cusco.",
        "meals": "Breakfast",
        "accommodation": "Palacio del Inka Cusco 5★"
      },
      {
        "day": 9,
        "title": "Cusco Departure",
        "description": "Private transfer to Alejandro Velasco Airport for Lima connection.",
        "meals": "Breakfast"
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
