import { LocalizedString } from '@/utils/i18nHelper';

export interface BlogPost {
  id: string;
  slug: string;
  title: LocalizedString;
  subtitle: LocalizedString;
  excerpt: LocalizedString;
  category: LocalizedString;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: string;
  imageUrl: string;
  featured?: boolean;
  tags: string[];
  relatedTourId?: string;
  content: {
    en: string;
    es: string;
  };
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'best-time-to-visit-galapagos-islands',
    title: {
      en: 'Best Time to Visit Galapagos Islands: Month-by-Month Wildlife & Cruise Guide',
      es: 'Mejor Época para Visitar las Islas Galápagos: Guía Mes a Mes de Fauna y Cruceros'
    },
    subtitle: {
      en: 'Discover weather patterns, wildlife seasons, water temperatures, and insider tips for luxury cruises and island hopping.',
      es: 'Descubre el clima, temporadas de fauna marina, temperatura del agua y consejos de expertos para cruceros y tours terrestres.'
    },
    excerpt: {
      en: 'Planning an expedition to the Galapagos? Here is everything you need to know about the warm and dry seasons, wildlife breeding cycles, and optimal months for snorkeling.',
      es: '¿Planeando una expedición a Galápagos? Conoce todo sobre las temporadas cálida y seca, ciclos de reproducción animal y los mejores meses para snorkel.'
    },
    category: {
      en: 'Galapagos Expeditions',
      es: 'Expediciones Galápagos'
    },
    author: {
      name: 'Jhayro Ludeña',
      role: 'Founder & Head Expedition Leader',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    publishedAt: '2026-08-15',
    readTime: '8 min read',
    imageUrl: '/images/tours/16-9/galapagos-tortuga-gigante-16-9.jpg',
    featured: true,
    tags: ['Galapagos', 'Wildlife', 'Cruises', 'Snorkeling', 'Travel Guide'],
    relatedTourId: 'galapagos-8days',
    content: {
      en: `
## The Enchanted Archipelago Year-Round

Unlike destinations governed by four distinct meteorological seasons, the Galápagos Islands experience two primary climatic phases throughout the year: the **Warm & Wet Season (December to May)** and the **Cool & Dry Season (June to November)**. Because the islands sit directly on the Equator, wildlife observation is truly extraordinary 365 days a year.

### 1. The Warm Season (December to May)
* **Air Temperatures:** 27°C to 31°C (80°F to 88°F)
* **Water Temperatures:** 24°C to 27°C (75°F to 80°F)
* **Ocean Conditions:** Calmer seas, crystal-clear water visibility, tropical afternoon showers.

**Wildlife Highlights:**
* Giant tortoises nest and eggs hatch in the highlands of Santa Cruz.
* Marine iguanas adopt vibrant breeding colors (especially on Española and Floreana).
* Green sea turtles lay eggs on pristine white-sand beaches.
* Land birds (Galapagos finches, mockingbirds) are at their most active song and mating displays.

---

### 2. The Cool & Dry Season (June to November)
* **Air Temperatures:** 21°C to 26°C (70°F to 78°F)
* **Water Temperatures:** 18°C to 22°C (64°F to 72°F) - *Wetsuits recommended!*
* **Ocean Conditions:** Humboldt Current brings nutrient-rich upwelling, creating the richest marine feeding frenzy of the year.

**Wildlife Highlights:**
* Blue-footed boobies perform their iconic courtship sky-pointing dances.
* Humpback whales and dolphins migrate through the western waters of Isabela and Fernandina.
* Galapagos sea lion pups are born in August and September.
* Whale sharks are frequently spotted around Darwin and Wolf islands.

---

### Essential Packing Tips for Galapagos
1. **High-UV Rash Guard & Reef-Safe Sunscreen:** The equatorial sun is potent even on overcast days.
2. **Sturdy Hiking Sandals & Trail Shoes:** Volcanic lava flows (Pahoehoe and Aa) require traction.
3. **Underwater Camera or GoPro:** 60% of the Galapagos magic happens beneath the surface.
4. **Light Windbreaker:** Evening sea breezes on yacht decks can be pleasantly brisk.
      `,
      es: `
## El Archipiélago Encantado Todo el Año

A diferencia de otros destinos con cuatro estaciones marcadas, las Islas Galápagos tienen dos temporadas principales: la **Temporada Cálida y Húmeda (Diciembre a Mayo)** y la **Temporada Fresca y Seca (Junio a Noviembre)**. Al estar situadas sobre la línea ecuatorial, la observación de fauna es inigualable los 365 días del año.

### 1. Temporada Cálida (Diciembre a Mayo)
* **Temperatura del aire:** 27°C a 31°C
* **Temperatura del agua:** 24°C a 27°C (mar cálido y cristalino)
* **Condiciones del mar:** Oleaje suave y excelente visibilidad submarina.

**Fauna Destacada:**
* Nacimiento de tortugas gigantes en las tierras altas de Santa Cruz.
* Iguanas marinas con colores de apareamiento vivos y llamativos.
* Desove de tortugas marinas verdes en playas vírgenes.

---

### 2. Temporada Fresca (Junio a Noviembre)
* **Temperatura del aire:** 21°C a 26°C
* **Temperatura del agua:** 18°C a 22°C (la corriente de Humboldt enriquece los mares con nutrientes)

**Fauna Destacada:**
* Danzas de cortejo de los piqueros de patas azules.
* Avistamiento de ballenas jorobadas en el canal entre Isabela y Fernandina.
* Nacimiento de crías de lobos marinos (Agosto y Septiembre).
      `
    }
  },
  {
    id: 'post-2',
    slug: 'avenue-of-volcanoes-ecuador-ultimate-guide',
    title: {
      en: "The Ultimate Guide to Ecuador's Avenue of Volcanoes: Cotopaxi, Quilotoa & Chimborazo",
      es: "Guía Definitiva de la Avenida de los Volcanes en Ecuador: Cotopaxi, Quilotoa y Chimborazo"
    },
    subtitle: {
      en: 'Journey through dramatic Andean paramo, glacial peaks, turquoise caldera lagoons, and historic colonial haciendas.',
      es: 'Un recorrido por páramos andinos, cumbres glaciares, lagunas esmeralda y haciendas coloniales históricas.'
    },
    excerpt: {
      en: 'Coined by Alexander von Humboldt in 1802, the Avenue of Volcanoes spans over 300 km of the high Andes. Explore the top peaks and luxury hacienda retreats.',
      es: 'Bautizada por Alexander von Humboldt en 1802, la Avenida de los Volcanes abarca más de 300 km de imponentes montañas andinas.'
    },
    category: {
      en: 'Andean Adventures',
      es: 'Aventuras Andinas'
    },
    author: {
      name: 'Carlos V.',
      role: 'Senior Naturalist & Mountain Specialist',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    },
    publishedAt: '2026-08-10',
    readTime: '7 min read',
    imageUrl: '/images/tours/16-9/cotopaxi-volcano-16-9.jpg',
    featured: true,
    tags: ['Cotopaxi', 'Volcanoes', 'Andes', 'Quilotoa', 'Chimborazo'],
    relatedTourId: 'volcanoes-rivers-8days',
    content: {
      en: `
## Along Humboldt's Legendary Andean Route

When the Prussian explorer Alexander von Humboldt journeyed through the central valley of Ecuador in 1802, he was captivated by the dual parallel chains of active and dormant peaks, christening the corridor **"The Avenue of Volcanoes"**.

### Top Iconic Peaks & Destinations:

1. **Cotopaxi Volcano (5,897 m / 19,347 ft):**
   * The world's most photogenic active stratovolcano, surrounded by wild Andean horses, Limpiopungo lagoon, and Jose Rivas Refuge.
2. **Quilotoa Crater Lagoon (3,914 m / 12,841 ft):**
   * A breathtaking volcanic caldera filled with mineral-rich turquoise waters. Kayak along the crater floor or hike the rim trail.
3. **Chimborazo Volcano (6,268 m / 20,548 ft):**
   * The highest peak on Earth measured from the planet's center due to equatorial bulge — literally the closest point to the Sun!
      `,
      es: `
## La Legendaria Ruta de Alexander von Humboldt

En 1802, el naturalista Alexander von Humboldt bautizó el valle interandino de Ecuador como la **Avenida de los Volcanes** debido a las dos cordilleras paralelas con cimas nevadas de más de 5.000 metros.

### Puntos Emblemáticos:
1. **Volcán Cotopaxi (5.897 m):** El cono nevado perfecto rodeado de caballos salvajes y la laguna de Limpiopungo.
2. **Laguna del Quilotoa (3.914 m):** Una caldera volcánica esmeralda con senderos panorámicos.
3. **Volcán Chimborazo (6.268 m):** El punto más cercano de la Tierra al Sol y hogar de vicuñas protegidas.
      `
    }
  },
  {
    id: 'post-3',
    slug: 'galapagos-luxury-cruise-vs-land-based-tour',
    title: {
      en: 'Galapagos Cruise vs. Land-Based Island Hopping: Which Experience Fits You Best?',
      es: 'Crucero en Galápagos vs Tour Terrestre: ¿Cuál es la Mejor Opción para Ti?'
    },
    subtitle: {
      en: 'An honest luxury comparison of yacht itineraries, comfort, seasickness, wildlife access, and travel styles.',
      es: 'Una comparativa honesta sobre itinerarios en yate, confort, mareo, acceso a fauna y estilo de viaje.'
    },
    excerpt: {
      en: 'Choosing between a boutique yacht cruise and high-end island hopping? Discover the pros, cons, and recommendations from our expedition planners.',
      es: '¿Dudas entre un crucero de lujo y un tour terrestre exclusivo? Te explicamos las ventajas y diferencias clave.'
    },
    category: {
      en: 'Travel Planning',
      es: 'Planificación de Viajes'
    },
    author: {
      name: 'Vermilion Expedition Team',
      role: 'Luxury Travel Designers',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    publishedAt: '2026-08-05',
    readTime: '6 min read',
    imageUrl: '/images/tours/16-9/isabela-island-16-9.jpg',
    featured: false,
    tags: ['Galapagos', 'Cruises', 'Island Hopping', 'Comparison'],
    relatedTourId: 'galapagos-6days',
    content: {
      en: `
## Comparing the Two Ways to Experience Galapagos

Both cruise yachts and land-based boutique lodges offer world-class access to wildlife. Understanding your priorities ensures the perfect journey.

### 1. Luxury Cruise Expeditions
* **Best for:** Visiting remote outer islands (Genovesa, Fernandina, Española) that cannot be reached on day trips.
* **Advantage:** You navigate while sleeping and wake up each morning at a brand new pristine island.
* **Considerations:** Fixed departure schedules; passengers sensitive to motion should request lower-deck mid-ship suites.

### 2. Private Land-Based Island Hopping
* **Best for:** Multi-generational families, travelers prone to motion sickness, or those who love dining in seaside towns.
* **Advantage:** Ultimate flexibility, spacious oceanfront boutique hotels, and freedom to set daily pace.
      `,
      es: `
## Dos Formas Únicas de Conocer Galápagos

Tanto los cruceros en yates de lujo como los tours terrestres con base en hoteles boutique ofrecen encuentros cercanos con fauna única.

### 1. Cruceros de Lujo
* **Ideal para:** Llegar a islas lejanas e inhabitadas (Fernandina, Genovesa, Española).
* **Ventaja:** Navegas mientras descansas y despiertas cada día en una isla distinta.

### 2. Tours Terrestres (Island Hopping)
* **Ideal para:** Familias con niños, viajeros sensibles al mareo y quienes disfrutan de la gastronomía costera local.
* **Ventaja:** Mayor flexibilidad de horarios y hospedaje en tierra firme.
      `
    }
  },
  {
    id: 'post-4',
    slug: 'amazon-rainforest-ecuador-yasuni-cuyabeno-guide',
    title: {
      en: 'Ecuadorian Amazon Rainforest: Yasuní vs. Cuyabeno vs. Napo Wildlife Lodges',
      es: 'Amazonía Ecuatoriana: Guía de Yasuní, Cuyabeno y Eco-Lodges del Río Napo'
    },
    subtitle: {
      en: 'How to experience the most biodiverse ecosystem on Earth with luxury eco-lodges and indigenous cultural encounters.',
      es: 'Cómo explorar el ecosistema más biodiverso del planeta en lodges ecológicos de lujo y comunidades ancestrales.'
    },
    excerpt: {
      en: 'With over 600 bird species and ancestral Kichwa communities, the Ecuadorian Amazon offers intimate rainforest expeditions just 45 minutes flight from Quito.',
      es: 'Con más de 600 especies de aves y comunidades Kichwa, la Amazonía ecuatoriana ofrece expediciones inolvidables a solo 45 min de vuelo de Quito.'
    },
    category: {
      en: 'Amazon Rainforest',
      es: 'Selva Amazónica'
    },
    author: {
      name: 'Elena Morales',
      role: 'Conservation Biologist & Guide',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
    },
    publishedAt: '2026-07-28',
    readTime: '9 min read',
    imageUrl: '/images/tours/16-9/amazon-river-canoe-16-9.jpg',
    featured: false,
    tags: ['Amazon', 'Rainforest', 'Wildlife', 'Ecuador', 'Eco Lodges'],
    relatedTourId: 'andes-amazon-7days',
    content: {
      en: `
## The Biodiversity Capital of the World

Ecuador hosts one of the richest and most accessible segments of the Amazon Basin. Motorized dug-out canoes carry guests through tranquil flooded forests, parrot clay licks, and canopy observation towers.

### Key Highlights:
* **Canopy Towers:** Ascend 35-meter towers for bird-eye views of toucans, macaws, and howler monkeys.
* **Night River Safaris:** Spot black caimans, bioluminescent fungi, and tree frogs.
* **Indigenous Traditions:** Learn ancestral medicinal plant wisdom and chocolate making from Kichwa matriarchs.
      `,
      es: `
## La Capital de la Biodiversidad del Planeta

Ecuador alberga una de las zonas amazónicas más prístinas y accesibles del mundo. Navega en canoas por ríos vírgenes, saladeros de loros y torres de observación en el dosel de la selva.

### Experiencias Imperdibles:
* **Torres de Dosel:** Observa tucanes, guacamayos y monos aulladores a 35 metros de altura.
* **Safaris Nocturnos:** Encuentro con caimanes negros y ranas arbóreas.
* **Cultura Ancestral:** Elaboración artesanal de chocolate y medicina tradicional Kichwa.
      `
    }
  },
  {
    id: 'post-5',
    slug: 'quito-cuenca-unesco-colonial-heritage-guide',
    title: {
      en: "Quito & Cuenca: Discovering Ecuador's UNESCO World Heritage Cities",
      es: 'Quito y Cuenca: Descubriendo las Joyas Coloniales Patrimonio de la UNESCO'
    },
    subtitle: {
      en: 'Cobblestone streets, golden baroque churches, artisan workshops, and boutique luxury stays in the high Andes.',
      es: 'Calles empedradas, templos barrocos cubiertos de pan de oro, talleres artesanales y hoteles boutique en los Andes.'
    },
    excerpt: {
      en: 'Explore why Quito was chosen as the very first UNESCO World Heritage City and discover the artistic charm of colonial Cuenca.',
      es: 'Descubre por qué Quito fue el primer Patrimonio Cultural de la Humanidad por la UNESCO y déjate cautivar por Cuenca.'
    },
    category: {
      en: 'Cultural Heritage',
      es: 'Patrimonio Cultural'
    },
    author: {
      name: 'Jhayro Ludeña',
      role: 'Founder & Travel Designer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    publishedAt: '2026-07-15',
    readTime: '6 min read',
    imageUrl: '/images/tours/16-9/quito-iglesia-de-san-francisco-16-9.jpg',
    featured: false,
    tags: ['Quito', 'Cuenca', 'UNESCO', 'Culture', 'Architecture'],
    relatedTourId: 'snow-volcanoes-6days',
    content: {
      en: `
## Centuries of Andean Art and Colonial Architecture

Quito and Cuenca represent the pinnacle of South American historical preservation. 

### Quito: The Jewel of the Andes
* Home to the magnificent **Church of La Compañía de Jesús**, decorated with over seven tons of pure gold leaf.
* Panoramic vistas from **El Panecillo**, overlooking the entire historic center and surrounding volcanic peaks.

### Cuenca: The Cultural & Artisan Capital
* Renowned for cobblestone riverfront walks along the Tomebamba, French-inspired balconies, and the production of authentic handmade **Panama hats (Sombreros de Toquilla)**.
      `,
      es: `
## Siglos de Arte Andino y Arquitectura Colonial

Quito y Cuenca representan la cumbre de la preservación histórica en Sudamérica.

### Quito: La Joya de los Andes
* Alberga la impresionante **Iglesia de La Compañía de Jesús**, recubierta con más de siete toneladas de pan de oro.
* Vistas panorámicas desde el **Mirador de El Panecillo**.

### Cuenca: Capital Cultural y Artesanal
* Famosa por sus balcones floridos, el río Tomebamba y los talleres de los auténticos **Sombreros de Paja Toquilla**.
      `
    }
  }
];
