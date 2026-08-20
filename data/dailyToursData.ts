import { Tour } from '@/types';

export const dailyTours: Tour[] = [
  // 1.1 Quito City Tour & Middle of the World ($89 USD)
  {
    id: 'quito-city-middle-of-the-world',
    title: {
      en: 'QUITO CITY TOUR & MIDDLE OF THE WORLD',
      es: 'QUITO CITY TOUR Y MITAD DEL MUNDO',
      fr: 'VISITE DE QUITO ET MILIEU DU MONDE',
      de: 'QUITO CITY TOUR & MITTE DER WELT',
      it: 'CITY TOUR DI QUITO E METÀ DEL MONDO',
      pt: 'CITY TOUR EM QUITO E METADE DO MUNDO',
      ja: 'キト市内観光＆赤道記念碑 (世界の中心)',
      zh: '基多古城文化全景与赤道纪念碑一日游'
    },
    destination: 'Mainland Ecuador',
    duration: {
      en: '1 DAY (FULL DAY)',
      es: '1 DÍA (FULL DAY)',
      fr: '1 JOUR (JOURNÉE COMPLÈTE)',
      de: '1 TAG (GANZTAGESAUSFLUG)',
      it: '1 GIORNO (FULL DAY)',
      pt: '1 DIA (FULL DAY)',
      ja: '1日 (終日ツアー)',
      zh: '1天 (全日游)'
    },
    durationDays: 1,
    price: 89,
    price3Star: 89,
    price4Star: 89,
    imageUrl: '/images/tours/9-16/quito-plaza-independencia-9-16.jpg',
    mobileImage: '/images/tours/9-16/quito-plaza-independencia-9-16.jpg',
    desktopImage: '/images/tours/16-9/quito-iglesia-de-san-francisco-16-9.jpg',
    gallery: [
      '/images/tours/16-9/mitad-del-mundo-16-9.jpg',
      '/images/tours/9-16/quito-plaza-independencia-9-16.jpg',
      '/images/tours/16-9/quito-iglesia-de-san-francisco-16-9.jpg'
    ],
    rating: 5,
    reviewsCount: 42,
    isPopular: true,
    category: {
      en: 'Cultural & Heritage Day Tour',
      es: 'Tour Cultural y Patrimonial',
      fr: 'Excursion Culturelle et Patrimoniale',
      de: 'Kultur- & Welterbe-Tagestour',
      it: 'Tour Culturale e del Patrimonio',
      pt: 'Tour Cultural e Patrimonial',
      ja: '世界遺産・文化探訪 1日ツアー',
      zh: '文化与世界遗产一日游'
    },
    description: {
      en: 'Discover the history, culture, architecture, and flavors of Quito on a fascinating tour through the city’s historic center and the famous Middle of the World. Our tour begins at Plaza Grande, the heart of Quito’s historic center, exploring surrounding colonial architecture, Convent of La Concepción, Church of El Sagrario, the Archbishop’s Palace, and La Compañía de Jesús with its gold leaf Baroque interior. Enjoy a special Yumbos chocolate tasting before visiting the iconic Plaza and Church of San Francisco. In the afternoon, journey to the Middle of the World to explore the equatorial monument and interactive Intiñan Museum.',
      es: 'Descubre la historia, cultura, arquitectura y sabores de Quito en un fascinante recorrido por su centro histórico (Patrimonio UNESCO) y la famosa Mitad del Mundo. Visita Plaza Grande, Convento de La Concepción, Iglesia de El Sagrario, Palacio Arzobispal y los imponentes retablos dorados de La Compañía de Jesús. Disfruta de una cata de chocolate ecuatoriano fino en Yumbos y visita el complejo de San Francisco. Por la tarde, explora el monumento ecuatorial y los experimentos ancestrales del Museo Intiñan.',
      fr: 'Découvrez l’histoire, la culture et l’architecture de Quito dans son centre historique classé par l’UNESCO et au Milieu du Monde. Visitez la Plaza Grande, La Compañía de Jesús recouverte d’or, dégustez du chocolat chez Yumbos, visitez San Francisco et explorez le musée interactif Intiñan.',
      de: 'Entdecken Sie das UNESCO-Welterbe der Altstadt von Quito und die berühmte Mitte der Welt. Besuchen Sie die Plaza Grande, die goldverzierte Kirche La Compañía, genießen Sie eine Schokoladenverkostung bei Yumbos und erkunden Sie das interaktive Intiñan-Museum.',
      it: 'Scopri la storia e l’architettura coloniale di Quito e la famosa Metà del Mondo. Visita Plaza Grande, la Chiesa dorata de La Compañía, degusta il cioccolato Yumbos, visita San Francisco e l’interattivo Museo Intiñan.',
      pt: 'Descubra a história e arquitetura do centro histórico de Quito e a Metade do Mundo. Visite a Plaza Grande, a dourada Igreja de La Compañía, deguste chocolates em Yumbos e explore o Museu Intiñan.',
      ja: '世界遺産キト旧市街の歴史と建築美、そして赤道直下の「世界の中心」を巡る1日ツアー。黄金のラ・コンパニーア教会、高級チョコレート試食、サン・フランシスコ教会、インティニャン博物館を体験。',
      zh: '探索联合国世界文化遗产基多古城与世界著名的赤道纪念碑。游览独立广场、黄金打造的耶稣会教堂，品尝厄瓜多尔顶级手工黑巧克力，并体验因蒂纽安互动博物馆的神奇赤道实验。'
    },
    highlights: [
      { en: 'Plaza Grande & Historic Colonial Churches', es: 'Plaza Grande y Templos Coloniales', zh: '独立广场与殖民历史建筑群' },
      { en: 'La Compañía de Jesús Gold Leaf Baroque Altar', es: 'Retablos de Pan de Oro en La Compañía', zh: '拉孔帕尼亚教堂金箔巴洛克祭坛' },
      { en: 'Artisanal Ecuadorian Chocolate Tasting at Yumbos', es: 'Cata de Chocolate Ecuatoriano Fino en Yumbos', zh: '云博斯顶级厄瓜多尔纯黑巧品鉴' },
      { en: 'Middle of the World Monument & Intiñan Interactive Museum', es: 'Monumento Mitad del Mundo y Museo Intiñan', zh: '赤道纪念碑与因蒂纽安互动科学博物馆' }
    ],
    inclusions: [
      { en: 'Private transportation throughout the tour', es: 'Transporte privado durante todo el tour' },
      { en: 'Professional bilingual tour guide (English/Spanish)', es: 'Guía profesional bilingüe (Inglés/Español)' },
      { en: 'Snack during the excursion', es: 'Refrigerio ligero durante el recorrido' },
      { en: 'Entrance ticket to La Compañía de Jesús Church', es: 'Boleto de ingreso a la Iglesia de La Compañía' },
      { en: 'Yumbos chocolate tasting experience', es: 'Experiencia y cata de chocolate en Yumbos' },
      { en: 'Entrance ticket to Intiñan Museum', es: 'Boleto de ingreso al Museo Intiñan' }
    ],
    exclusions: [
      { en: 'Optional activities not specified', es: 'Actividades opcionales no especificadas' },
      { en: 'Personal expenses & gratuities', es: 'Gastos personales y propinas' },
      { en: 'Meals not explicitly listed as included', es: 'Comidas no detalladas explícitamente' }
    ],
    itinerary: [
      {
        day: 1,
        title: { en: 'FULL DAY – HISTORIC QUITO & EQUATORIAL LINE AT INTIÑAN', es: 'DÍA COMPLETO – QUITO HISTÓRICO Y LÍNEA ECUATORIAL EN INTIÑAN' },
        description: {
          en: 'Our tour begins at Plaza Grande, the heart of Quito’s historic center and an important place in Ecuador’s history. From here, we explore the surrounding colonial architecture and learn about the city’s rich cultural heritage.\n\nDuring our walk through the historic center, we will observe several beautiful churches, convents, and historic buildings, including the Convent of La Concepción, which was considered the largest convent in America during its time, and the Church of El Sagrario, an outstanding example of colonial religious architecture.\n\nWe continue to the Archbishop’s Palace, located beside Plaza Grande, and then visit La Compañía de Jesús, one of Quito’s most spectacular churches, famous for its richly decorated interior covered in gold leaf and its impressive Baroque architecture.\n\nNext, we enjoy a special Yumbos chocolate experience, where we learn about Ecuadorian cacao and have the opportunity to taste delicious Ecuadorian chocolate.\n\nWe then continue our visit to Plaza and Church of San Francisco, one of the most iconic places in Quito’s historic center. The church and convent form one of the most important architectural and cultural complexes in the city.\n\nAfter discovering Quito’s historic center, we continue our journey toward the Middle of the World. Along the way, we can enjoy views of Quito and its surrounding landscapes.\n\nAt the Middle of the World, we visit the famous equatorial monument and then enter the Intiñan Museum, an interactive cultural museum where visitors can learn about Ecuador’s indigenous cultures, ancestral traditions, and fascinating experiences related to the Equator.',
          es: 'Iniciamos en la Plaza Grande en el corazón del centro colonial de Quito. Recorremos calles empedradas admirando el Convento de La Concepción y la Iglesia de El Sagrario.\n\nContinuamos hacia el Palacio Arzobispal y visitamos la deslumbrante Iglesia de La Compañía de Jesús, famosa por su decoración en pan de oro y arquitectura barroca.\n\nDisfrutamos de una cata guiada de chocolate ecuatoriano en Yumbos Chocolate, aprendiendo sobre el grano de cacao de aroma.\n\nVisitamos la histórica Plaza e Iglesia de San Francisco antes de trasladarnos hacia el norte hacia la Mitad del Mundo.\n\nEn la línea ecuatorial, visitamos el monumento y el Museo Interactivo Intiñan con experimentos solares y tradiciones ancestrales antes de retornar a su hotel en Quito.'
        },
        meals: { en: 'Snack & chocolate tasting included', es: 'Snack y cata de chocolate incluidos' },
        transportation: { en: 'Private comfortable tourist transport', es: 'Transporte privado turístico' },
        activity: { en: 'Guided walking tour & museum visits (7-8 hours)', es: 'Recorrido guiado a pie y museos (7-8 horas)' }
      }
    ]
  },

  // 1.2 Otavalo Indigenous Market, Peguche & Cotacachi ($92 USD)
  {
    id: 'otavalo-indigenous-market',
    title: {
      en: 'OTAVALO INDIGENOUS MARKET & COTACACHI',
      es: 'MERCADO INDÍGENA DE OTAVALO Y COTACACHI',
      fr: 'MARCHÉ INDIGÈNE D’OTAVALO ET COTACACHI',
      de: 'INDIGENER MARKT VON OTAVALO & COTACACHI',
      it: 'MERCATO INDIGENO DI OTAVALO E COTACACHI',
      pt: 'MERCADO INDÍGENA DE OTAVALO E COTACACHI',
      ja: 'オタバロ先住民族市場・ペグチェ＆コタカチ',
      zh: '奥塔瓦洛原住民传统集市与佩古切文化一日游'
    },
    destination: 'Mainland Ecuador',
    duration: {
      en: '1 DAY (FULL DAY)',
      es: '1 DÍA (FULL DAY)',
      fr: '1 JOUR (JOURNÉE COMPLÈTE)',
      de: '1 TAG (GANZTAGESAUSFLUG)',
      it: '1 GIORNO (FULL DAY)',
      pt: '1 DIA (FULL DAY)',
      ja: '1日 (終日ツアー)',
      zh: '1天 (全日游)'
    },
    durationDays: 1,
    price: 92,
    price3Star: 92,
    price4Star: 92,
    imageUrl: '/images/tours/16-9/otavalo-market-16-9.jpg',
    mobileImage: '/images/tours/16-9/otavalo-market-16-9.jpg',
    desktopImage: '/images/tours/16-9/otavalo-market-16-9.jpg',
    gallery: [
      '/images/tours/16-9/otavalo-peguche-16-9.jpg',
      '/images/tours/16-9/imbabura-16-9.jpg',
      '/images/tours/16-9/otavalo-market-16-9.1.jpg',
      '/images/tours/16-9/otavalo-market-16-9.2.jpg',
      '/images/tours/16-9/taita-imbabura-16-9.jpg'
    ],
    rating: 5,
    reviewsCount: 38,
    isPopular: true,
    category: {
      en: 'Indigenous Culture & Crafts Day Tour',
      es: 'Cultura Indígena y Artesanías',
      fr: 'Culture Indigène et Artisanat',
      de: 'Indigene Kultur- & Handwerkstour',
      it: 'Cultura Indigena e Artigianato',
      pt: 'Cultura Indígena e Artesanatos',
      ja: '先住民族の伝統文化と民芸品ツアー',
      zh: '安第斯原住民手工艺与文化全景游'
    },
    description: {
      en: 'Discover the vibrant indigenous culture, traditions, music, handicrafts, and landscapes of northern Ecuador on a memorable journey from Quito to Otavalo, Peguche, and Cotacachi. Explore Plaza de los Ponchos—the famous South American artisan market with colorful textiles and handmade crafts. In the indigenous community of Peguche, enjoy a traditional lunch, participate in a special Mindalae cultural experience, and visit a master workshop where traditional Andean instruments like panpipes and flutes are handcrafted. Finally, explore Cotacachi, the renowned leather capital of Ecuador.',
      es: 'Descubre la vibrante cultura indígena, música, artesanías y paisajes del norte andino de Ecuador viajando de Quito a Otavalo, Peguche y Cotacachi. Visita la Plaza de los Ponchos, el mercado artesanal más célebre de Sudamérica. En Peguche disfruta de un almuerzo tradicional, participa en la actividad cultural Mindalae y conoce un taller de instrumentos musicales andinos autóctonos. Culmina explorando Cotacachi, la capital ecuatoriana del cuero artesanal.',
      fr: 'Découvrez la culture indigène et l’artisanat d’Otavalo, le village de Peguche avec musique traditionnelle et la ville du cuir de Cotacachi.',
      de: 'Erleben Sie den farbenfrohen Kunsthandwerksmarkt in Otavalo, traditionelle Andenmusik in Peguche und hochwertige Lederwaren in Cotacachi.',
      it: 'Esplora il famoso mercato di Otavalo a Plaza de los Ponchos, la cultura di Peguche con musica andina e la capitale del cuoio a Cotacachi.',
      pt: 'Conheça o famoso mercado indígena de Otavalo, as tradições musicais em Peguche e os artigos de couro em Cotacachi.',
      ja: '南米屈指の民芸品市場オタバロのポンチョ広場、ペグチェ村での伝統音楽楽器工房見学とランチ、革製品で有名なコタカチを巡る1日。',
      zh: '探访南美著名的奥塔瓦洛蓬乔广场原住民集市、佩古切社区传统安第斯乐器工坊与地道午餐，并在厄瓜多尔皮革之都科塔卡奇感受手工艺魅力。'
    },
    highlights: [
      { en: 'Plaza de los Ponchos Indigenous Handicraft Market', es: 'Mercado Artesanal Plaza de los Ponchos', zh: '蓬乔广场原住民手工艺纺织品大集市' },
      { en: 'Peguche Traditional Andean Culture & Mindalae Experience', es: 'Comunidad de Peguche y Experiencia Mindalae', zh: '佩古切社区与明达拉文化体验' },
      { en: 'Handcrafted Andean Musical Instruments Workshop', es: 'Taller de Instrumentos Musicales Andinos', zh: '安第斯传统排箫与乐器制作工坊' },
      { en: 'Cotacachi Leather Capital of Ecuador', es: 'Cotacachi Capital del Cuero', zh: '厄瓜多尔皮革之都科塔卡奇' }
    ],
    inclusions: [
      { en: 'Private round-trip transportation from Quito', es: 'Transporte privado ida y vuelta desde Quito' },
      { en: 'Professional bilingual tour guide (English/Spanish)', es: 'Guía profesional bilingüe (Inglés/Español)' },
      { en: 'Traditional Ecuadorian lunch included', es: 'Almuerzo tradicional ecuatoriano' },
      { en: 'Mindalae cultural activity in Peguche', es: 'Actividad cultural Mindalae en Peguche' },
      { en: 'Visit to handcrafted Andean musical instrument workshop', es: 'Visita guiada a taller de instrumentos andinos' }
    ],
    exclusions: [
      { en: 'Personal shopping expenses & souvenirs', es: 'Compras personales y recuerdos' },
      { en: 'Optional activities not specified in program', es: 'Actividades opcionales no especificadas' },
      { en: 'Gratuities for driver and guide', es: 'Propinas para chofer y guía' }
    ],
    itinerary: [
      {
        day: 1,
        title: { en: 'FULL DAY – OTAVALO TEXTILES, PEGUCHE CULTURE & COTACACHI LEATHER', es: 'DÍA COMPLETO – TEXTILES DE OTAVALO, CULTURA EN PEGUCHE Y CUERO EN COTACACHI' },
        description: {
          en: 'Our adventure begins in Quito, traveling north through spectacular Andean landscapes. During the approximately two-hour journey, enjoy mountain valleys and panoramic viewpoints toward Imbabura province.\n\nOur first stop is Otavalo at Plaza de los Ponchos, discovering colorful textiles, traditional clothing, handmade crafts, and jewelry created by local artisans.\n\nWe continue to Peguche for a traditional lunch and the special Mindalae cultural experience, followed by a visit to a master workshop crafting Andean panpipes, flutes, and drums.\n\nOur final stop is Cotacachi, renowned for its high-quality leather jackets, bags, and shoes before returning to Quito in the afternoon.',
          es: 'Salida desde Quito hacia el norte atravesando valles andinos hacia la provincia de Imbabura.\n\nPrimera parada en Otavalo y su Plaza de los Ponchos, repleta de textiles, ponchos, tapices y artesanías.\n\nContinuación a Peguche para degustar un almuerzo típico y participar en la vivencia cultural Mindalae, visitando un taller de luthería andina.\n\nVisita a las tiendas de cuero en Cotacachi antes del viaje de retorno a Quito.'
        },
        meals: { en: 'Traditional lunch included', es: 'Almuerzo tradicional incluido' },
        transportation: { en: 'Private comfortable tourist transport', es: 'Transporte privado turístico' },
        activity: { en: 'Full-day cultural & scenic exploration', es: 'Exploración cultural y paisajística' }
      }
    ]
  },

  // 1.3 Papallacta Hot Springs ($108 USD)
  {
    id: 'papallacta-hot-springs',
    title: {
      en: 'PAPALLACTA THERMAL HOT SPRINGS',
      es: 'TERMAS DE PAPALLACTA Y ANDES ORIENTALES',
      fr: 'SOURCES CHAUDES DE PAPALLACTA',
      de: 'THERMALQUELLEN VON PAPALLACTA',
      it: 'SORGENTI TERMICHE DI PAPALLACTA',
      pt: 'TERMAS DE PAPALLACTA',
      ja: 'パパジャクタ天然温泉＆アンデス絶景',
      zh: '帕帕亚克塔高山火山地热温泉与安第斯生态一日游'
    },
    destination: 'Mainland Ecuador',
    duration: {
      en: '1 DAY (FULL DAY)',
      es: '1 DÍA (FULL DAY)',
      fr: '1 JOUR (JOURNÉE COMPLÈTE)',
      de: '1 TAG (GANZTAGESAUSFLUG)',
      it: '1 GIORNO (FULL DAY)',
      pt: '1 DIA (FULL DAY)',
      ja: '1日 (終日ツアー)',
      zh: '1天 (全日游)'
    },
    durationDays: 1,
    price: 108,
    price3Star: 108,
    price4Star: 108,
    imageUrl: '/images/tours/9-16/banos-cascada-9-16.jpg',
    mobileImage: '/images/tours/9-16/banos-cascada-9-16.jpg',
    desktopImage: '/images/tours/16-9/avenue-of-volcanoes-16-9.jpg',
    gallery: [
      '/images/tours/9-16/chimborazo-volcano-9-16.jpg',
      '/images/tours/9-16/cotopaxi-volcano-9-16.jpg',
      '/images/tours/16-9/avenue-of-volcanoes-16-9.jpg'
    ],
    rating: 5,
    reviewsCount: 29,
    isPopular: false,
    category: {
      en: 'Wellness & Nature Day Tour',
      es: 'Bienestar y Termalismo',
      fr: 'Bien-être et Nature',
      de: 'Wellness & Natur-Tagestour',
      it: 'Benessere e Natura',
      pt: 'Bem-Estar e Termalismo',
      ja: '癒しの温泉と大自然ツアー',
      zh: '水疗养生与安第斯自然一日游'
    },
    description: {
      en: 'Journey approximately two hours east of Quito along the historic cinnamon route to Papallacta Hot Springs. Cross the high Eastern Andes pass at 4,100 meters (13,451 ft) before descending into the dramatic transition zone between the Andes and the Amazon rainforest. Relax in volcanic naturally heated thermal pools with different temperatures while enjoying views of Antisana Volcano (5,704 m / 18,714 ft). Enjoy an optional scenic nature hike along mountain river trails and take time for wellness and rejuvenation.',
      es: 'Viaja hacia el este de Quito por la histórica ruta de la canela hacia las Termas de Papallacta. Cruza el paso de la cordillera oriental a 4.100 metros de altitud antes de descender al mágico ecotono entre los Andes y la Amazonía. Relájate en piscinas de aguas termales volcánicas de distintas temperaturas con vistas panorámicas al Volcán Antisana (5.704 m). Disfruta de un almuerzo incluido y caminatas escénicas en senderos ecológicos.',
      fr: 'Détendez-vous dans les sources thermales de Papallacta au pied du volcan Antisana, après avoir franchi un col andin à 4 100 mètres.',
      de: 'Entspannen Sie in den natürlichen Thermalbädern von Papallacta mit Blick auf den schneebedeckten Vulkan Antisana.',
      it: 'Rigenerati nelle acque termali vulcaniche di Papallacta con vista sull’imponente Vulcano Antisana.',
      pt: 'Relaxe nas piscinas termais de Papallacta cercadas pela exuberante paisagem andina e vistas do Vulcão Antisana.',
      ja: '標高4,100mの峠を越え、アンティサナ火山を望むパパジャクタの天然ミネラル温泉へ。温かい露天風呂と自然散策でリフレッシュ。',
      zh: '翻越海拔4100米的安第斯东部山口，前往帕帕亚克塔高山火山天然地热温泉。在眺望安蒂萨纳雪山的无敌景致中享受矿物水疗与高原自然徒步。'
    },
    highlights: [
      { en: 'Volcanic Mineral Thermal Pools with Mountain Views', es: 'Piscinas Termales Minerales Volcánicas', zh: '雪山环抱中的天然火山矿物地热温泉' },
      { en: 'Panoramic Views of Snow-Capped Antisana Volcano', es: 'Vistas al Volcán Nevado Antisana (5.704 m)', zh: '安蒂萨纳雪山（海拔5704米）壮丽全景' },
      { en: 'High-Altitude Andes to Amazon Transition Zone Hike', es: 'Senderismo en Zona de Transición Andes-Amazonía', zh: '安第斯高山至亚马逊过渡森林步道徒步' },
      { en: 'Spa & Hydrotherapy Relaxation Experience', es: 'Relajación y Bienestar en Entorno de Montaña', zh: '高山水疗与身心深度放松' }
    ],
    inclusions: [
      { en: 'Round-trip private transportation from Quito', es: 'Transporte privado ida y vuelta desde Quito' },
      { en: 'Professional bilingual guide (English/Spanish)', es: 'Guía profesional bilingüe (Inglés/Español)' },
      { en: 'Lunch included', es: 'Almuerzo incluido' },
      { en: 'Entrance ticket to the thermal pools at Papallacta', es: 'Boleto de entrada a las piscinas termales' },
      { en: 'Scenic mountain river hike (weather permitting)', es: 'Caminata por senderos ecológicos' }
    ],
    exclusions: [
      { en: 'Spa treatments (massages, mud baths, private hydromassage)', es: 'Tratamientos de spa adicionales (masajes, baños de lodo)' },
      { en: 'Personal towels or locker rentals', es: 'Alquiler de toallas o casilleros privados' },
      { en: 'Gratuities and personal expenses', es: 'Propinas y gastos personales' }
    ],
    itinerary: [
      {
        day: 1,
        title: { en: 'FULL DAY – ANDES PASS & PAPALLACTA THERMAL SPRINGS', es: 'DÍA COMPLETO – PASO ANDINO Y TERMAS DE PAPALLACTA' },
        description: {
          en: 'Depart Quito crossing the Eastern Andes at 4,100 m with panoramic views of the páramo.\n\nArrive at Papallacta Hot Springs and immerse in therapeutic thermal pools surrounded by pristine mountain air and lush vegetation.\n\nEnjoy an included lunch and a guided scenic walk along river trails before returning to Quito in the afternoon.',
          es: 'Salida desde Quito cruzando la cordillera a 4.100 m con vistas al páramo andino.\n\nLlegada a las Termas de Papallacta para disfrutar de sus piscinas calientes de agua mineral volcánica.\n\nAlmuerzo y caminata ecológica a orillas del río antes del regreso a Quito.'
        },
        meals: { en: 'Lunch included', es: 'Almuerzo incluido' },
        transportation: { en: 'Private comfortable tourist transport', es: 'Transporte privado turístico' },
        activity: { en: 'Thermal bathing & nature walk', es: 'Baño termal y caminata de naturaleza' }
      }
    ]
  },

  // 1.4 Mindo Cloud Forest & Canopy Adventure ($117 USD)
  {
    id: 'mindo-cloud-forest',
    title: {
      en: 'MINDO CLOUD FOREST & ADVENTURE',
      es: 'BOSQUE NUBLADO DE MINDO Y AVENTURA',
      fr: 'FORÊT DE NUAGES DE MINDO ET AVENTURE',
      de: 'NEBELWALD VON MINDO & ABENTEUER',
      it: 'FORESTA NEBBIOA DI MINDO E AVVENTURA',
      pt: 'FLORESTA NUBLADA DE MINDO E AVENTURA',
      ja: 'ミンド雲霧林・ハチドリの楽園＆ジップライン',
      zh: '明多热带云雾森林、蜂鸟圣地与高空索道探险一日游'
    },
    destination: 'Mainland Ecuador',
    duration: {
      en: '1 DAY (FULL DAY)',
      es: '1 DÍA (FULL DAY)',
      fr: '1 JOUR (JOURNÉE COMPLÈTE)',
      de: '1 TAG (GANZTAGESAUSFLUG)',
      it: '1 GIORNO (FULL DAY)',
      pt: '1 DIA (FULL DAY)',
      ja: '1日 (終日ツアー)',
      zh: '1天 (全日游)'
    },
    durationDays: 1,
    price: 117,
    price3Star: 117,
    price4Star: 117,
    imageUrl: '/images/tours/9-16/amazon-waterfall-9-16.jpg',
    mobileImage: '/images/tours/9-16/amazon-waterfall-9-16.jpg',
    desktopImage: '/images/tours/16-9/mindo-waterfall-16-9.jpg',
    gallery: [
      '/images/tours/16-9/mindo-waterfall-16-9.jpg',
      '/images/tours/9-16/amazon-waterfall-9-16.jpg',
      '/images/tours/9-16/amazon-loro-9-16.jpg'
    ],
    rating: 5,
    reviewsCount: 45,
    isPopular: true,
    category: {
      en: 'Biodiversity & Eco-Adventure Day Tour',
      es: 'Biodiversidad y Ecoturismo de Aventura',
      fr: 'Biodiversité et Éco-Aventure',
      de: 'Biodiversität & Öko-Abenteuertour',
      it: 'Biodiversità ed Ecoturismo',
      pt: 'Biodiversidade e Aventura Ecológica',
      ja: '生物多様性とアドベンチャー 1日ツアー',
      zh: '生物多样性与生态户外探险一日游'
    },
    description: {
      en: 'Escape the city and discover the breathtaking natural beauty of Mindo, in the heart of Ecuador’s lush cloud forest approximately two hours northwest of Quito. Visit a world-famous hummingbird sanctuary observing dozens of iridescent hummingbird species up close. Hike through the Mindo-Nambillo Ecological Reserve to discover beautiful waterfalls, and get your adrenaline flowing on an exciting 3-line canopy zip-line adventure soaring above the cloud forest canopy.',
      es: 'Escápate al corazón del exuberante bosque nuboso de Mindo, uno de los ecosistemas con mayor biodiversidad del planeta. Visita un santuario de colibríes donde observarás decenas de especies multicolores de cerca. Realiza una caminata por la Reserva Ecológica Mindo-Nambillo hasta hermosas cascadas y siente la adrenalina con un circuito de 3 líneas de canopy (tirolesa) volando sobre las copas de los árboles.',
      fr: 'Explorez la forêt tropicale de Mindo: sanctuaire de colibris, cascade Mindo-Nambillo et descente en tyrolienne (canopy 3 lignes) au-dessus de la canopée.',
      de: 'Erleben Sie die Artenvielfalt von Mindo: Kolibri-Schutzgebiet, Wasserfallwanderung und aufregendes Canopy-Ziplining über den Baumkronen.',
      it: 'Scopri la lussureggiante foresta di Mindo: santuario dei colibrì, cascata Mindo-Nambillo e un’emozionante esperienza di zipline canopy a 3 linee.',
      pt: 'Visite a mágica floresta de Mindo: santuário de beija-flores, cachoeira Mindo-Nambillo e tirolesa (canopy) sobre as copas das árvores.',
      ja: '世界屈指の野鳥の楽園ミンド雲霧林へ。数多くのハチドリが舞うサンクチュアリ、熱帯の滝ハイキング、木々の頭上を飛ぶ3本のジップラインを体験。',
      zh: '深入全球生物多样性热点明多云雾森林。近距离观赏数十种蜂鸟争相飞舞，徒步纳姆比略生态保护区瀑布，并在森林树冠之上体验刺激的三线高空滑索飞跃。'
    },
    highlights: [
      { en: 'Hummingbird Sanctuary & Exotic Bird Watching', es: 'Santuario de Colibríes y Observación de Aves', zh: '蜂鸟保护区与珍稀热带鸟类观察' },
      { en: 'Mindo-Nambillo Ecological Reserve Waterfall Hike', es: 'Caminata a Cascadas en Reserva Mindo-Nambillo', zh: '明多纳姆比略生态保护区瀑布步道徒步' },
      { en: 'Canopy Zip-line Adventure (3 Flying Lines)', es: 'Circuito de Canopy / Tirolesa (3 Líneas)', zh: '云雾森林树冠三线高空飞索滑降探险' },
      { en: 'Lush Cloud Forest Flora, Orchids & Biodiversity', es: 'Orquídeas y Vegetación Exuberante de Selva Alta', zh: '高山云雾森林兰花与原始植被探索' }
    ],
    inclusions: [
      { en: 'Round-trip private transportation from Quito', es: 'Transporte privado ida y vuelta desde Quito' },
      { en: 'Professional bilingual guide (English/Spanish)', es: 'Guía profesional bilingüe (Inglés/Español)' },
      { en: 'Lunch included', es: 'Almuerzo incluido' },
      { en: 'Entrance ticket to Hummingbird Sanctuary', es: 'Entrada al Santuario de Colibríes' },
      { en: 'Visit to Mindo-Nambillo Waterfall', es: 'Visita a la Cascada Mindo-Nambillo' },
      { en: '3-line canopy / zip-line adventure experience', es: 'Experiencia de canopy / tirolesa de 3 líneas' }
    ],
    exclusions: [
      { en: 'Butterfly garden (Mariposario) entrance (optional)', es: 'Entrada opcional al Mariposario' },
      { en: 'Chocolate factory tour (optional)', es: 'Tour opcional de fábrica de chocolate' },
      { en: 'Gratuities for guide and instructors', es: 'Propinas para guías e instructores' }
    ],
    itinerary: [
      {
        day: 1,
        title: { en: 'FULL DAY – MINDO CLOUD FOREST, HUMMINGBIRDS & ZIP-LINE', es: 'DÍA COMPLETO – BOSQUE NUBLADO DE MINDO, COLIBRÍES Y CANOPY' },
        description: {
          en: 'Travel from Quito to the northwestern slope of the Andes into the Mindo Cloud Forest.\n\nFirst, visit the Hummingbird Sanctuary to marvel at their incredible agility and colorful plumage.\n\nNext, hike through the Mindo-Nambillo reserve to discover a secluded forest waterfall.\n\nAfter an included lunch, gear up for an exhilarating 3-line zip-line canopy flight across the treetops before returning to Quito.',
          es: 'Viaje desde Quito hacia el bosque nublado de Mindo.\n\nVisita al Santuario de Colibríes para contemplar su increíble velocidad y colores brillantes.\n\nCaminata en la Reserva Mindo-Nambillo hasta una hermosa cascada natural.\n\nAlmuerzo y emocionante circuito de tirolesa (canopy 3 líneas) sobre las copas del bosque antes de retornar a Quito.'
        },
        meals: { en: 'Lunch included', es: 'Almuerzo incluido' },
        transportation: { en: 'Private comfortable tourist transport', es: 'Transporte privado turístico' },
        activity: { en: 'Nature hike, birdwatching & canopy zip-line', es: 'Caminata, aviturismo y tirolesa' }
      }
    ]
  },

  // 1.5 Antisana National Park & La Mica Lagoon ($96 USD)
  {
    id: 'antisana-national-park',
    title: {
      en: 'ANTISANA NATIONAL PARK & LA MICA LAGOON',
      es: 'PARQUE NACIONAL ANTISANA Y LAGUNA LA MICA',
      fr: 'PARC NATIONAL ANTISANA ET LAGUNE LA MICA',
      de: 'ANTISANA-NATIONALPARK & LA MICA LAGUNE',
      it: 'PARCO NAZIONALE ANTISANA E LAGUNA LA MICA',
      pt: 'PARQUE NACIONAL ANTISANA E LAGUNA LA MICA',
      ja: 'アンティサナ国立公園・コンドル観察＆ラ・ミカ湖',
      zh: '安蒂萨纳国家公园、安第斯神鹰与米卡高山湖一日游'
    },
    destination: 'Mainland Ecuador',
    duration: {
      en: '1 DAY (FULL DAY)',
      es: '1 DÍA (FULL DAY)',
      fr: '1 JOUR (JOURNÉE COMPLÈTE)',
      de: '1 TAG (GANZTAGESAUSFLUG)',
      it: '1 GIORNO (FULL DAY)',
      pt: '1 DIA (FULL DAY)',
      ja: '1日 (終日ツアー)',
      zh: '1天 (全日游)'
    },
    durationDays: 1,
    price: 96,
    price3Star: 96,
    price4Star: 96,
    imageUrl: '/images/tours/9-16/chimborazo-volcano-9-16.jpg',
    mobileImage: '/images/tours/9-16/chimborazo-volcano-9-16.jpg',
    desktopImage: '/images/tours/16-9/chimborazo-volcano-16-9.jpg',
    gallery: [
      '/images/tours/9-16/cotopaxi-volcano-9-16.jpg',
      '/images/tours/9-16/cajas-national-park-9-16.jpg',
      '/images/tours/16-9/avenue-of-volcanoes-16-9.jpg'
    ],
    rating: 5,
    reviewsCount: 26,
    isPopular: false,
    category: {
      en: 'High Andes & Wildlife Sanctuary',
      es: 'Altos Andes y Santuario de Fauna',
      fr: 'Haute Montagne et Faune Sauvage',
      de: 'Hochanden & Tierbeobachtungstour',
      it: 'Alte Ande e Santuario della Fauna',
      pt: 'Altos Andes e Santuário de Fauna',
      ja: '高地アンデスと野生動物サンクチュアリ',
      zh: '安第斯高原秘境与野生动物探秘一日游'
    },
    description: {
      en: 'Located southeast of Quito, Antisana National Park is one of Ecuador’s most pristine protected areas and premier destinations for high-altitude wildlife observation. Travel through Valle de los Chillos and Pintag ascending into the wild páramo ecosystem. Admire the colossal Antisana Volcano (5,758 m / 18,885 ft) with its glacier-covered peaks and ancient lava flows. Antisana is Ecuador’s prime sanctuary to spot the majestic wild Andean condor with its 3-meter wingspan, along with wild llamas, deer, and foxes. Enjoy a scenic hike around La Mica Lagoon with panoramic mountain vistas.',
      es: 'Ubicado al sureste de Quito, el Parque Nacional Antisana es una de las áreas naturales protegidas más vírgenes y espectaculares de Ecuador. Atraviesa el Valle de los Chillos y Pintag ascendiendo al páramo andino. Admira el imponente Volcán Antisana (5.758 m) con sus glaciares y extensos flujos de lava petrificada. Antisana es el principal refugio del cóndor andino, con posibilidades de avistar cóndores en libertad, venados, lobos de páramo y aves de altura. Realiza una caminata escénica en la Laguna La Mica.',
      fr: 'Explorez le parc national Antisana: sanctuaire du condor des Andes, paysages volcaniques glaciaires et randonnée à la lagune La Mica.',
      de: 'Besuchen Sie den Antisana-Nationalpark, den besten Ort Ecuadors zur Beobachtung des Andenkondors, mit Wanderung an der Mica-Lagune.',
      it: 'Ammira il Vulcano Antisana e osserva il maestoso condor andino nel suo habitat naturale durante un trekking alla Laguna La Mica.',
      pt: 'Descubra os vulcões e páramos do Parque Nacional Antisana, santuário do condor andino, com caminhada na Laguna La Mica.',
      ja: '標高5,758mのアンティサナ火山を望む大自然。翼幅3mの野生アンデスコンドルの観察スポットとラ・ミカ湖のトレッキング。',
      zh: '东南前往安蒂萨纳国家公园。仰望海拔5758米的壮丽冰川火山锥，在野生高山草甸寻找翼展达3米的安第斯神鹰、野生羊驼与高山鹿，漫步美丽的米卡高山火山口湖。'
    },
    highlights: [
      { en: 'Wild Andean Condor Observation Sanctuary', es: 'Santuario de Observación del Cóndor Andino', zh: '野生安第斯神鹰自然栖息保护区' },
      { en: 'Glacier-Covered Antisana Volcano (5,758 m / 18,885 ft)', es: 'Volcán Glaciar Antisana (5.758 m)', zh: '海拔5758米安蒂萨纳巨型冰川火山' },
      { en: 'Scenic Páramo Hike at La Mica Lagoon', es: 'Caminata Escénica en Laguna La Mica', zh: '米卡高山湖泊与安第斯草甸徒步' },
      { en: 'Ancient Volcanic Lava Flows & High Andes Ecology', es: 'Flujos de Lava Volcánica y Ecosistema de Páramo', zh: '古火山熔岩遗迹与高原水源生态讲解' }
    ],
    inclusions: [
      { en: 'Round-trip private transportation from Quito', es: 'Transporte privado ida y vuelta desde Quito' },
      { en: 'Professional bilingual guide (English/Spanish)', es: 'Guía profesional bilingüe (Inglés/Español)' },
      { en: 'Lunch included', es: 'Almuerzo incluido' },
      { en: 'La Mica Lagoon guided hiking activity', es: 'Caminata guiada en Laguna La Mica' },
      { en: 'National Park entry permit & coordination', es: 'Permisos de ingreso y asistencia' }
    ],
    exclusions: [
      { en: 'Personal mountain gear & binoculars', es: 'Equipo personal de montaña y binoculares' },
      { en: 'Personal expenses & tips', es: 'Gastos personales y propinas' }
    ],
    itinerary: [
      {
        day: 1,
        title: { en: 'FULL DAY – ANTISANA CONDOR SANCTUARY & LA MICA LAGOON', es: 'DÍA COMPLETO – SANTUARIO DEL CÓNDOR EN ANTISANA Y LAGUNA LA MICA' },
        description: {
          en: 'Depart Quito through Valle de los Chillos toward Pintag, entering Antisana National Park.\n\nAscend to prime viewpoints to search for wild Andean condors, wild llamas, and deer.\n\nArrive at La Mica Lagoon for a scenic high-altitude hike exploring the páramo ecosystem and stunning volcano glaciers.\n\nEnjoy an included lunch before beginning the return journey to Quito in the afternoon.',
          es: 'Salida de Quito por el Valle de los Chillos hacia Pintag ingresando al Parque Nacional Antisana.\n\nParadas estratégicas en miradores de páramo para avistamiento del cóndor andino y fauna silvestre.\n\nLlegada a la Laguna La Mica para realizar una caminata panorámica frente a los glaciares del volcán.\n\nAlmuerzo y retorno a Quito por la tarde.'
        },
        meals: { en: 'Lunch included', es: 'Almuerzo incluido' },
        transportation: { en: 'Private comfortable tourist transport', es: 'Transporte privado turístico' },
        activity: { en: 'Páramo hiking & wildlife watching (4,000 m)', es: 'Caminata de páramo y avistamiento (4.000 m)' }
      }
    ]
  },

  // 1.6 Cotopaxi National Park & Volcano Hike ($96 USD)
  {
    id: 'cotopaxi-national-park',
    title: {
      en: 'COTOPAXI NATIONAL PARK & VOLCANO',
      es: 'PARQUE NACIONAL COTOPAXI Y VOLCÁN',
      fr: 'PARC NATIONAL COTOPAXI ET VOLCAN',
      de: 'COTOPAXI-NATIONALPARK & VULKAN',
      it: 'PARCO NAZIONALE COTOPAXI E VULCANO',
      pt: 'PARQUE NACIONAL COTOPAXI E VULCÃO',
      ja: 'コトパクシ国立公園・活火山ハイキング＆避難小屋',
      zh: '科托帕希国家公园活火山探险与避难所徒步一日游'
    },
    destination: 'Mainland Ecuador',
    duration: {
      en: '1 DAY (FULL DAY)',
      es: '1 DÍA (FULL DAY)',
      fr: '1 JOUR (JOURNÉE COMPLÈTE)',
      de: '1 TAG (GANZTAGESAUSFLUG)',
      it: '1 GIORNO (FULL DAY)',
      pt: '1 DIA (FULL DAY)',
      ja: '1日 (終日ツアー)',
      zh: '1天 (全日游)'
    },
    durationDays: 1,
    price: 96,
    price3Star: 96,
    price4Star: 96,
    imageUrl: '/images/tours/9-16/cotopaxi-volcano-9-16.jpg',
    mobileImage: '/images/tours/9-16/cotopaxi-volcano-9-16.jpg',
    desktopImage: '/images/tours/16-9/cotopaxi-volcano-16-9.jpg',
    gallery: [
      '/images/tours/16-9/avenue-of-volcanoes-16-9.jpg',
      '/images/tours/9-16/chimborazo-volcano-9-16.jpg',
      '/images/tours/16-9/chimborazo-volcano-16-9.1.jpg'
    ],
    rating: 5,
    reviewsCount: 52,
    isPopular: true,
    category: {
      en: 'Volcano Hiking & High Andes Adventure',
      es: 'Senderismo de Volcanes y Alta Montaña',
      fr: 'Randonnée Volcanique et Haute Montagne',
      de: 'Vulkan-Wandern & Hochgebirgsabenteuer',
      it: 'Trekking Vulcanico e Alta Montagna',
      pt: 'Trekking em Vulcões e Alta Montanha',
      ja: '火山トレッキングとアンデス大自然',
      zh: '火山徒步与安第斯高峰探险一日游'
    },
    description: {
      en: 'Discover Cotopaxi Volcano (5,897 m / 19,347 ft), one of the world’s highest active volcanoes and Ecuador’s most iconic natural landmark. Travel south from Quito along the scenic Avenue of the Volcanoes into Cotopaxi National Park. Explore the Interpretation Center, observe wild horses and páramo flora, and undertake the exciting hike from the parking area at 4,500 m (14,764 ft) up to the José Rivas Mountain Refuge at 4,800 m (15,748 ft), with optional extension toward the glacier viewpoint depending on weather and group physical condition.',
      es: 'Descubre el imponente Volcán Cotopaxi (5.897 m), uno de los volcanes activos más altos del mundo y símbolo natural de Ecuador. Viaja hacia el sur por la legendaria Avenida de los Volcanes hasta el Parque Nacional Cotopaxi. Visita el Centro de Interpretación y la Laguna de Limpiopungo, observa caballos salvajes y realiza la emblemática caminata desde el parqueadero (4.500 m) hasta el Refugio José Rivas a 4.800 metros de altitud.',
      fr: 'Randonnez sur les pentes du volcan Cotopaxi (5 897 m): ascension vers le refuge José Rivas à 4 800 mètres et lagune de Limpiopungo.',
      de: 'Besteigen Sie die Hänge des aktiven Vulkans Cotopaxi (5.897 m) bis zur José-Rivas-Schutzhütte auf 4.800 Metern Höhe.',
      it: 'Vivi l’emozione di salire sul Vulcano Cotopaxi fino al Rifugio José Rivas a 4.800 metri di quota lungo la Via dei Vulcani.',
      pt: 'Caminhe no imponente Vulcão Cotopaxi (5.897 m) até o Refúgio José Rivas a 4.800 metros de altitude.',
      ja: '標高5,897mの世界最高峰の活火山コトパクシへ。4,500m地点から4,800mのホセ・リバス避難小屋への感動のトレッキング。',
      zh: '探访世界最高活火山之一科托帕希火山（海拔5897米）。沿火山大道南下，探访林皮奥蓬戈高山泻湖与野马群，并挑战从海拔4500米攀登至4800米何塞·里瓦斯高山避难所。'
    },
    highlights: [
      { en: 'World-Famous Active Stratovolcano Cotopaxi (5,897 m)', es: 'Volcán Activo Emblemático Cotopaxi (5.897 m)', zh: '世界著名对称雪山科托帕希活火山（5897米）' },
      { en: 'Hike to José Rivas Mountain Refuge (4,800 m / 15,748 ft)', es: 'Ascenso al Refugio José Rivas (4.800 m)', zh: '攀登至海拔4800米何塞·里瓦斯高山避难所' },
      { en: 'Limpiopungo Glacial Lagoon & Wild Horses Observation', es: 'Laguna de Limpiopungo y Caballos Salvajes', zh: '林皮奥蓬戈冰川泻湖与野生高山马群' },
      { en: 'National Park Volcanic Interpretation Center', es: 'Centro de Interpretación Geológica y Parque', zh: '国家公园火山地质演化科普中心' }
    ],
    inclusions: [
      { en: 'Round-trip private transportation from Quito', es: 'Transporte privado ida y vuelta desde Quito' },
      { en: 'Professional bilingual guide (English/Spanish)', es: 'Guía profesional bilingüe (Inglés/Español)' },
      { en: 'Lunch included', es: 'Almuerzo incluido' },
      { en: 'Guided visit to Cotopaxi National Park & Limpiopungo', es: 'Visita guiada al Parque Nacional y Limpiopungo' },
      { en: 'High-altitude hike to José Rivas Refuge (weather permitting)', es: 'Caminata guiada al Refugio José Rivas' }
    ],
    exclusions: [
      { en: 'Glacier mountaineering equipment (crampons/ice axe)', es: 'Equipo de alta montaña para cumbre' },
      { en: 'Personal warm trekking clothing & gloves', es: 'Ropa térmica y guantes de uso personal' },
      { en: 'Gratuities and personal expenses', es: 'Propinas y gastos personales' }
    ],
    itinerary: [
      {
        day: 1,
        title: { en: 'FULL DAY – AVENUE OF THE VOLCANOES & COTOPAXI REFUGE HIKE', es: 'DÍA COMPLETO – AVENIDA DE LOS VOLCANES Y ASCENSO AL REFUGIO COTOPAXI' },
        description: {
          en: 'Depart early from Quito traveling south on the Pan-American Highway through the Avenue of Volcanoes.\n\nEnter Cotopaxi National Park, visiting the Interpretation Center and panoramic páramo grasslands.\n\nDrive up to the parking lot at 4,500 m and begin the memorable hike up volcanic ash scree to José Rivas Refuge at 4,800 m.\n\nAfter taking in breathtaking views and warming up at the refuge, descend and visit Limpiopungo Lagoon before enjoying an included lunch and returning to Quito.',
          es: 'Salida temprana desde Quito hacia el sur por la Avenida de los Volcanes.\n\nIngreso al Parque Nacional Cotopaxi, visita al Centro de Interpretación y ascenso vehicular al parqueadero (4.500 m).\n\nCaminata guiada por la ladera de arena volcánica hasta el Refugio José Rivas (4.800 m).\n\nDescenso, visita panorámica a la Laguna de Limpiopungo, almuerzo incluido y retorno a Quito por la tarde.'
        },
        meals: { en: 'Lunch included', es: 'Almuerzo incluido' },
        transportation: { en: 'Private comfortable tourist transport', es: 'Transporte privado turístico' },
        activity: { en: 'High-altitude mountain hike (4,500 m to 4,800 m)', es: 'Caminata de alta montaña (4.500 m a 4.800 m)' }
      }
    ]
  },

  // 1.7 Quilotoa Crater Lake, Tigua & Guinea Pig Farm ($97 USD)
  {
    id: 'quilotoa-crater-lake',
    title: {
      en: 'QUILOTOA CRATER LAKE, TIGUA & CUY FARM',
      es: 'LAGUNA CRÁTER DEL QUILOTOA, TIGUA Y GRANJA DE CUYES',
      fr: 'CRATÈRE DU QUILOTOA, TIGUA ET FERME DE CUY',
      de: 'QUILOTOA KRATERSEE, TIGUA & MEERSCHWEINCHENFARM',
      it: 'LAGUNA DEL QUILOTOA, TIGUA E FATTORIA DEI CUY',
      pt: 'LAGUNA CRATERA DO QUILOTOA, TIGUA E FAZENDA DE CUYES',
      ja: 'キロトア火山湖・ティグア絵画村＆クイ農場',
      zh: '基洛托阿翡翠火山湖、蒂瓜纳伊夫艺术村与传统豚鼠农庄一日游'
    },
    destination: 'Mainland Ecuador',
    duration: {
      en: '1 DAY (FULL DAY)',
      es: '1 DÍA (FULL DAY)',
      fr: '1 JOUR (JOURNÉE COMPLÈTE)',
      de: '1 TAG (GANZTAGESAUSFLUG)',
      it: '1 GIORNO (FULL DAY)',
      pt: '1 DIA (FULL DAY)',
      ja: '1日 (終日ツアー)',
      zh: '1天 (全日游)'
    },
    durationDays: 1,
    price: 97,
    price3Star: 97,
    price4Star: 97,
    imageUrl: '/images/tours/16-9/quilotoa-16-9.jpg',
    mobileImage: '/images/tours/16-9/quilotoa-16-9.jpg',
    desktopImage: '/images/tours/16-9/quilotoa-16-9.jpg',
    gallery: [
      '/images/tours/16-9/quilotoa-16-9.1.jpg',
      '/images/tours/16-9/quilotoa-16-9.2.jpg',
      '/images/tours/16-9/quilotoa-16-9.3.jpg'
    ],
    rating: 5,
    reviewsCount: 48,
    isPopular: true,
    category: {
      en: 'Volcanic Crater & Rural Culture Day Tour',
      es: 'Cráter Volcánico y Tradiciones Rurales',
      fr: 'Cratère Volcanique et Culture Rurale',
      de: 'Vulkankrater & Anden-Kulturtour',
      it: 'Cratere Vulcanico e Tradizioni Andine',
      pt: 'Cratera Vulcânica e Cultura Rural',
      ja: '火口湖絶景とアンデス伝統文化ツアー',
      zh: '火山湖全景与安第斯乡村传统一日游'
    },
    description: {
      en: 'Depart early from Quito traveling southwest through breathtaking Andean landscapes to Quilotoa Crater Lake, inside the Ilinizas Ecological Reserve. Marvel at the dramatic 3-km wide volcanic caldera and its sparkling turquoise-green lake at 3,900 m (12,800 ft). Hikers can descend to the lake shore or enjoy the panoramic cliff-edge viewpoints. Along the scenic route, stop in Tigua to meet indigenous artists famed for their vibrant sheepskin paintings, and visit an authentic traditional guinea pig (cuy) farm learning about centuries-old Andean agrarian customs.',
      es: 'Salida desde Quito hacia el suroeste a través de sobrecogedores paisajes andinos hasta la Laguna del Cráter de Quilotoa en la Reserva Ilinizas. Admira el mirador panorámico con vistas a la caldera volcánica y su agua verde esmeralda turquesa a 3.900 metros de altitud. Opción de caminata hacia la orilla del lago. En el camino, parada en la comunidad de Tigua para conocer a los pintores de arte andino en cuero de oveja y visita a una granja tradicional de cuyes.',
      fr: 'Visitez la caldeira émeraude du lac Quilotoa (3 900 m), rencontrez les peintres naïfs de Tigua et visitez un élevage traditionnel de cochons d’Inde (cuy).',
      de: 'Bestaunen Sie den smaragdgrünen Quilotoa-Kratersee auf 3.900 m, traditionelle Tigua-Malereien und eine lokale Meerschweinchenzucht.',
      it: 'Ammira le splendide acque turchesi del cratere di Quilotoa, l’arte di Tigua e una tradizionale fattoria di porcellini d’India (cuy).',
      pt: 'Deslumbre-se com a cratera vulcânica de Quilotoa a 3.900 metros, a arte tradicional de Tigua e uma fazenda de criação de cuyes.',
      ja: '標高3,900mの息をのむエメラルドグリーンのキロトア火口湖へ。色鮮やかなティグア民族画工房と伝統的なクイ（モルモット）飼育農場を訪問。',
      zh: '探访伊利尼萨斯生态保护区内令人惊叹的海拔3900米基洛托阿翡翠绿火山湖。沿途探访以羊皮画闻名的蒂瓜原住民艺术村，并参观传统豚鼠农庄，体验数百年安第斯乡村生活方式。'
    },
    highlights: [
      { en: 'Quilotoa Emerald-Turquoise Volcanic Crater Lake (3,900 m)', es: 'Laguna Cráter Verde Esmeralda de Quilotoa (3.900 m)', zh: '海拔3900米基洛托阿绿松石翡翠色火山湖' },
      { en: 'Tigua Indigenous Naïve Art Workshop & Gallery', es: 'Galería y Taller de Arte Indígena de Tigua', zh: '蒂瓜原住民羊皮传统油画工坊与画廊' },
      { en: 'Traditional Andean Guinea Pig (Cuy) Farm Visit', es: 'Visita a Granja Tradicional de Crianza de Cuyes', zh: '安第斯传统豚鼠（Cuy）繁育生态农庄探访' },
      { en: 'Optional Hike Down to the Crater Lake Shore', es: 'Caminata Opcional hacia la Orilla de la Laguna', zh: '火山口沿线峭壁全景与下探湖畔步道' }
    ],
    inclusions: [
      { en: 'Round-trip private transportation from Quito', es: 'Transporte privado ida y vuelta desde Quito' },
      { en: 'Professional bilingual guide (English/Spanish)', es: 'Guía profesional bilingüe (Inglés/Español)' },
      { en: 'Lunch included', es: 'Almuerzo incluido' },
      { en: 'Park entrance fee & required local permits', es: 'Tasa de ingreso y permisos locales' },
      { en: 'Stop in Tigua artisan community', es: 'Parada cultural en la comunidad de Tigua' },
      { en: 'Visit to local guinea pig (cuy) farm', es: 'Visita guiada a la granja de cuyes' },
      { en: 'Guided visit to Quilotoa Crater Lake Viewpoint', es: 'Visita guiada al mirador del Cráter del Quilotoa' }
    ],
    exclusions: [
      { en: 'Mule / horseback rental for uphill return from lake', es: 'Alquiler opcional de mula/caballo para ascenso' },
      { en: 'Kayak rental at bottom of crater', es: 'Alquiler de kayak en la laguna' },
      { en: 'Personal purchases & gratuities', es: 'Compras personales y propinas' }
    ],
    itinerary: [
      {
        day: 1,
        title: { en: 'FULL DAY – TIGUA ART, CUY FARM & QUILOTOA VOLCANIC CALDERA', es: 'DÍA COMPLETO – ARTE DE TIGUA, GRANJA DE CUYES Y CRÁTER DE QUILOTOA' },
        description: {
          en: 'Depart early morning from Quito traveling southwest through rural Andean farming valleys.\n\nMake a cultural stop in Tigua discovering colorful local paintings depicting mountain life, followed by a visit to a traditional guinea pig (cuy) farm.\n\nArrive at Quilotoa and take in the awe-inspiring turquoise waters from the rim viewpoint.\n\nOptional hike down into the crater to touch the mineral-rich waters. Enjoy an included lunch before the return drive to Quito in the afternoon.',
          es: 'Salida temprano desde Quito hacia el suroeste a través de valles agrícolas andinos.\n\nParada cultural en Tigua descubriendo pinturas autóctonas en cuero de oveja y visita a una granja tradicional de cuyes.\n\nLlegada al mirador del Quilotoa contemplando el majestuoso cráter volcánico de agua color turquesa.\n\nCaminata opcional hacia el fondo de la caldera, almuerzo incluido y retorno a Quito por la tarde.'
        },
        meals: { en: 'Lunch included', es: 'Almuerzo incluido' },
        transportation: { en: 'Private comfortable tourist transport', es: 'Transporte privado turístico' },
        activity: { en: 'Scenic viewpoint, cultural farm & crater hike (3,900 m)', es: 'Mirador escénico, granja cultural y caminata (3.900 m)' }
      }
    ]
  }
];
