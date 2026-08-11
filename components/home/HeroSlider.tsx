'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useSettings } from '@/hooks/useSettings';
import { Bookmark, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { StatsSection } from './StatsSection';
import { useTranslations, useLocale } from 'next-intl';
import { getLocalizedText } from '@/utils/i18nHelper';

const DEFAULT_DATA = [
  {
    place: { en: 'Galapagos - Archipelago', es: 'Galápagos - Archipiélago', fr: 'Galapagos - Archipel', de: 'Galapagos - Archipel', it: 'Galapagos - Arcipelago', pt: 'Galápagos - Arquipélago', ja: 'ガラパゴス諸島', zh: '加拉帕戈斯群岛' },
    title: { en: 'SHARK', es: 'ENCUENTRO CON', fr: 'RENCONTRE', de: 'HAI', it: 'INCONTRO CON', pt: 'ENCONTRO COM', ja: 'サメと', zh: '鲨鱼' },
    title2: { en: 'ENCOUNTER', es: 'TIBURONES', fr: 'AVEC REQUINS', de: 'BEGEGNUNG', it: 'SQUALI', pt: 'TUBARÕES', ja: 'の遭遇', zh: '奇遇' },
    description: {
      en: 'Dive into the pristine waters of the Galapagos Marine Reserve. Experience the ultimate thrill of swimming alongside graceful hammerhead sharks, playful sea lions, and ancient marine turtles in one of the most biodiverse oceanic environments on the planet. A true paradise for underwater explorers seeking unparalleled adventure.',
      es: 'Sumérgete en las aguas cristalinas de la Reserva Marina de Galápagos. Experimenta la máxima emoción de nadar junto a elegantes tiburones martillo, juguetones leones marinos y tortugas centenarias en uno de los entornos oceánicos más biodiversos del planeta. Un verdadero paraíso para exploradores submarinos en busca de aventuras inigualables.',
      fr: 'Plongez dans les eaux cristallines de la réserve marine des Galapagos. Vivez le frisson ultime de nager aux côtés d\'élégants requins-marteaux, d\'otaries espiègles et de tortues marines centenaires dans l\'un des environnements océaniques les plus riches en biodiversité au monde. Un véritable paradis pour les explorateurs.',
      de: 'Tauchen Sie ein in die unberührten Gewässer des Galapagos-Meeresschutzgebietes. Erleben Sie den ultimativen Nervenkitzel, neben anmutigen Hammerhaien, verspielten Seelöwen und uralten Meeresschildkröten in einer der artenreichsten Meeresumgebungen der Welt zu schwimmen. Ein wahres Paradies für Unterwasserentdecker.',
      it: 'Tuffati nelle acque incontaminate della Riserva Marina delle Galapagos. Prova l\'emozione di nuotare accanto a graziosi squali martello, giocosi leoni marini e antiche tartarughe marine in uno degli ambienti oceanici più ricchi di biodiversità del pianeta. Un vero paradiso per gli esploratori subacquei in cerca di avventure senza pari.',
      pt: 'Mergulhe nas águas cristalinas da Reserva Marinha de Galápagos. Experimente a emoção suprema de nadar ao lado de graciosos tubarões-martelo, leões-marinhos brincalhões e antigas tartarugas em um dos ambientes oceânicos mais biodiversos do planeta. Um verdadeiro paraíso para exploradores subaquáticos.',
      ja: 'ガラパゴス海洋保護区の透き通った海に飛び込みましょう。優雅なシュモクザメ、遊び心のあるアシカ、そして古代のウミガメと一緒に泳ぐ究極のスリルを、地球上で最も生物多様性の高い海洋環境の1つで体験してください。比類のない冒険を求める水中探検家にとっての真の楽園です。',
      zh: '潜入加拉帕戈斯海洋保护区清澈的海水中。在地球上生物多样性最丰富的海洋环境之一，体验与优雅的双髻鲨、顽皮的海狮和古老的海龟一起游泳的终极快感。对于寻求无与伦比的冒险的水下探险家来说，这是一个真正的天堂。'
    },
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=2752&q=80'
  },
  {
    place: { en: 'Pichincha - Quito', es: 'Pichincha - Quito', fr: 'Pichincha - Quito', de: 'Pichincha - Quito', it: 'Pichincha - Quito', pt: 'Pichincha - Quito', ja: 'ピチンチャ - キト', zh: '皮钦查 - 基多' },
    title: { en: 'HISTORIC', es: 'CENTRO', fr: 'CENTRE', de: 'HISTORISCHES', it: 'CENTRO', pt: 'CENTRO', ja: '歴史的', zh: '历史' },
    title2: { en: 'CENTER', es: 'HISTÓRICO', fr: 'HISTORIQUE', de: 'ZENTRUM', it: 'STORICO', pt: 'HISTÓRICO', ja: 'センター', zh: '中心' },
    description: {
      en: 'The first World Cultural Heritage site. Walk through time along beautifully preserved cobblestone streets, marvel at magnificent golden altars inside colonial churches, and soak in the vibrant atmosphere of a city completely surrounded by towering Andean volcanoes.',
      es: 'El primer sitio de Patrimonio Cultural de la Humanidad. Camina a través del tiempo por calles empedradas bellamente conservadas, maravíllate con los magníficos altares dorados dentro de iglesias coloniales y sumérgete en la vibrante atmósfera de una ciudad rodeada por imponentes volcanes andinos.',
      fr: 'Le premier site du patrimoine culturel mondial. Promenez-vous dans le temps le long de rues pavées magnifiquement préservées, émerveillez-vous devant les magnifiques autels dorés des églises coloniales et imprégnez-vous de l\'atmosphère vibrante d\'une ville entourée de volcans.',
      de: 'Die erste Weltkulturerbestätte. Gehen Sie durch die Zeit auf wunderschön erhaltenen Kopfsteinpflasterstraßen, bestaunen Sie die prächtigen goldenen Altäre in kolonialen Kirchen und genießen Sie die lebhafte Atmosphäre einer Stadt, die vollständig von hoch aufragenden Vulkanen umgeben ist.',
      it: 'Il primo sito del Patrimonio Culturale Mondiale. Cammina nel tempo lungo strade acciottolate splendidamente conservate, ammira magnifici altari dorati all\'interno delle chiese coloniali e immergiti nell\'atmosfera vibrante di una città completamente circondata da imponenti vulcani andini.',
      pt: 'O primeiro local do Patrimônio Cultural Mundial. Caminhe no tempo por ruas de paralelepípedos lindamente preservadas, maravilhe-se com os magníficos altares dourados nas igrejas coloniais e mergulhe na atmosfera vibrante de uma cidade totalmente cercada por imponentes vulcões.',
      ja: '初の世界文化遺産。美しく保存された石畳の通りを歩き、植民地時代の教会内の壮大な黄金の祭壇に驚嘆し、そびえ立つアンデスの火山に完全に囲まれた街の活気に満ちた雰囲気に浸ってください。',
      zh: '第一个世界文化遗产。沿着保存完好的鹅卵石街道穿越时空，惊叹于殖民时期教堂内宏伟的金色祭坛，沉浸在被高耸的安第斯火山完全包围的城市的充满活力的氛围中。'
    },
    image: 'https://media.istockphoto.com/id/692499466/photo/plaza-de-san-francisco-and-st-francis-church-quito-ecuador.jpg?s=1024x1024&w=is&k=20&c=IqO_UCVWPbOwteF3cY7fggiUZD2z391V3kufWNgEhkg='
  },
  {
    place: { en: 'Azuay - Cuenca', es: 'Azuay - Cuenca', fr: 'Azuay - Cuenca', de: 'Azuay - Cuenca', it: 'Azuay - Cuenca', pt: 'Azuay - Cuenca', ja: 'アスアイ - クエンカ', zh: '阿苏艾 - 昆卡' },
    title: { en: 'COLONIAL', es: 'ENCANTO', fr: 'CHARME', de: 'KOLONIALER', it: 'FASCINO', pt: 'ENCANTO', ja: '植民地時代の', zh: '殖民' },
    title2: { en: 'CHARM', es: 'COLONIAL', fr: 'COLONIAL', de: 'CHARME', it: 'COLONIALE', pt: 'COLONIAL', ja: '魅力', zh: '魅力' },
    description: {
      en: 'A deeply enchanting Andean city known for its stunning architecture, four crossing rivers, and the iconic Panama hat. Discover a peaceful haven where rich cultural heritage meets bohemian art scenes, offering an unforgettable and deeply authentic South American experience.',
      es: 'Una ciudad andina profundamente encantadora conocida por su impresionante arquitectura, sus cuatro ríos cruzados y el icónico sombrero de paja toquilla. Descubre un remanso de paz donde la rica herencia cultural se encuentra con escenas artísticas bohemias, ofreciendo una experiencia sudamericana inolvidable.',
      fr: 'Une ville andine profondément enchanteresse connue pour sa superbe architecture, ses quatre rivières et le célèbre chapeau Panama. Découvrez un havre de paix où le riche héritage culturel rencontre des scènes artistiques bohèmes, offrant une expérience sud-américaine profondément authentique.',
      de: 'Eine zutiefst bezaubernde Andenstadt, bekannt für ihre atemberaubende Architektur, vier Flüsse und den berühmten Panamahut. Entdecken Sie eine friedliche Oase, in der reiches kulturelles Erbe auf unvergessliche und authentische südamerikanische Erlebnisse trifft.',
      it: 'Una città andina profondamente incantevole, nota per la sua splendida architettura, i quattro fiumi che la attraversano e l\'iconico cappello Panama. Scopri un\'oasi di pace dove la ricca eredità culturale incontra scene artistiche bohémien, offrendo un\'esperienza indimenticabile e profondamente autentica.',
      pt: 'Uma cidade andina profundamente encantadora, conhecida por sua arquitetura deslumbrante, quatro rios e o icônico chapéu Panamá. Descubra um refúgio tranquilo onde a rica herança cultural se encontra com cenas artísticas boêmias, oferecendo uma experiência autêntica e inesquecível.',
      ja: '見事な建築、4つの交差する川、象徴的なパナマハットで知られる、深く魅力的なアンデスの街。豊かな文化遺産とボヘミアンなアートシーンが融合する平和な安息の地を発見し、忘れられない本物の南米体験を提供します。',
      zh: '一座迷人的安第斯城市，以其令人惊叹的建筑、四条纵横交错的河流和标志性的巴拿马草帽而闻名。探索一个和平的避风港，丰富的文化遗产与波西米亚艺术场景交汇，提供难忘而真实的南美体验。'
    },
    image: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=2752&q=80'
  },
  {
    place: { en: 'Cotopaxi - Andes', es: 'Cotopaxi - Andes', fr: 'Cotopaxi - Andes', de: 'Cotopaxi - Anden', it: 'Cotopaxi - Ande', pt: 'Cotopaxi - Andes', ja: 'コトパクシ - アンデス', zh: '科托帕希 - 安第斯山脉' },
    title: { en: 'MAJESTIC', es: 'VOLCÁN', fr: 'VOLCAN', de: 'MAJESTÄTISCHER', it: 'VULCANO', pt: 'VULCÃO', ja: '雄大な', zh: '雄伟的' },
    title2: { en: 'VOLCANO', es: 'MAJESTUOSO', fr: 'MAJESTUEUX', de: 'VULKAN', it: 'MAESTOSO', pt: 'MAJESTOSO', ja: '火山', zh: '火山' },
    description: {
      en: 'The perfect snow-capped cone rising proudly over the Ecuadorian Andes. An absolute paradise for trekkers and nature lovers offering breathtaking paramo landscapes, high-altitude wild horses, and the raw power of one of the highest active volcanoes on Earth.',
      es: 'El cono nevado perfecto que se alza orgulloso sobre los Andes ecuatorianos. Un paraíso absoluto para excursionistas y amantes de la naturaleza que ofrece impresionantes paisajes de páramo, caballos salvajes de gran altitud y el poder puro de uno de los volcanes activos más altos de la Tierra.',
      fr: 'Le cône enneigé parfait s\'élevant fièrement au-dessus des Andes équatoriennes. Un paradis absolu pour les randonneurs et les amoureux de la nature offrant des paysages de paramo à couper le souffle, des chevaux sauvages de haute altitude et la puissance brute de l\'un des volcans actifs les plus hauts.',
      de: 'Der perfekte schneebedeckte Kegel, der stolz über den ecuadorianischen Anden thront. Ein absolutes Paradies für Wanderer und Naturliebhaber, das atemberaubende Paramo-Landschaften, wilde Höhenpferde und die rohe Kraft eines der höchsten aktiven Vulkane der Erde bietet.',
      it: 'Il perfetto cono innevato che si erge orgoglioso sulle Ande ecuadoriane. Un paradiso assoluto per gli escursionisti e gli amanti della natura, che offre paesaggi mozzafiato, cavalli selvaggi d\'alta quota e la potenza pura di uno dei vulcani attivi più alti della Terra.',
      pt: 'O cone nevado perfeito que se ergue orgulhosamente sobre os Andes equatorianos. Um paraíso absoluto para os amantes da natureza, oferecendo paisagens de tirar o fôlego, cavalos selvagens de alta altitude e a força bruta de um dos vulcões ativos mais altos da Terra.',
      ja: 'エクアドルのアンデスに誇らしげにそびえ立つ完璧な雪を頂いた円錐。息をのむようなパラモの風景、高地の野生の馬、そして地球上で最も高い活火山の1つの生の力を提供する、トレッカーや自然愛好家にとっての絶対的なパラダイスです。',
      zh: '完美的白雪皑皑的圆锥体骄傲地耸立在厄瓜多尔安第斯山脉之上。这是徒步旅行者和自然爱好者的绝对天堂，提供令人惊叹的高山草甸景观、高海拔野马以及地球上最高活火山之一的原始力量。'
    },
    image: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=2752&q=80'
  },
  {
    place: { en: 'Manabí - Pacific Coast', es: 'Manabí - Costa', fr: 'Manabí - Côte Pacifique', de: 'Manabí - Pazifikküste', it: 'Manabí - Costa Pacifica', pt: 'Manabí - Costa do Pacífico', ja: 'マナビ - 太平洋岸', zh: '马纳比 - 太平洋海岸' },
    title: { en: 'FRAILES', es: 'PLAYA', fr: 'PLAGE', de: 'FRAILES', it: 'SPIAGGIA', pt: 'PRAIA', ja: 'フライレス', zh: '弗赖莱斯' },
    title2: { en: 'BEACH', es: 'LOS FRAILES', fr: 'LOS FRAILES', de: 'STRAND', it: 'LOS FRAILES', pt: 'DOS FRAILES', ja: 'ビーチ', zh: '海滩' },
    description: {
      en: 'A hidden jewel of crystal-clear waters and pristine white sands nestled safely within the Machalilla National Park. Relax in unspoiled natural beauty surrounded by lush dry forests, exotic coastal birds, and the gentle sound of the Pacific Ocean waves.',
      es: 'Una joya escondida de aguas cristalinas y prístinas arenas blancas, anidada de forma segura dentro del Parque Nacional Machalilla. Relájate en la belleza natural virgen rodeado de exuberantes bosques secos, exóticas aves costeras y el suave sonido de las olas del Océano Pacífico.',
      fr: 'Un joyau caché aux eaux cristallines et sables blancs immaculés, niché en toute sécurité dans le parc national de Machalilla. Détendez-vous dans une beauté naturelle préservée, entourée de forêts sèches, d\'oiseaux côtiers exotiques et du doux bruit des vagues du Pacifique.',
      de: 'Ein verborgenes Juwel mit kristallklarem Wasser und unberührtem weißen Sand, sicher eingebettet im Machalilla-Nationalpark. Entspannen Sie in unberührter natürlicher Schönheit umgeben von Trockenwäldern, exotischen Küstenvögeln und dem sanften Rauschen der Pazifikwellen.',
      it: 'Un gioiello nascosto di acque cristalline e sabbie bianche incontaminate, incastonato in modo sicuro all\'interno del Parco Nazionale Machalilla. Rilassati nella bellezza naturale incontaminata, circondato da lussureggianti foreste secche, uccelli costieri esotici e il dolce suono delle onde del Pacifico.',
      pt: 'Uma joia escondida de águas cristalinas e areias brancas intocadas, aninhada com segurança no Parque Nacional Machalilla. Relaxe na beleza natural intocada, cercada por florestas secas, pássaros costeiros exóticos e o som suave das ondas do Oceano Pacífico.',
      ja: 'マチャリラ国立公園内に安全に佇む、透き通った海と手付かずの白い砂浜の隠れた宝石。緑豊かな乾燥林、エキゾチックな沿岸の鳥、そして太平洋の波の穏やかな音に囲まれた、手付かずの自然の美しさの中でリラックスしてください。',
      zh: '马查利亚国家公园内隐藏着一颗拥有清澈海水和原始白色沙滩的宝石。在未受破坏的自然美景中放松身心，周围环绕着茂密的干燥森林、充满异国情调的沿海鸟类，以及太平洋海浪柔和的声音。'
    },
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=2752&q=80'
  },
  {
    place: { en: 'Guayas - Guayaquil', es: 'Guayas - Guayaquil', fr: 'Guayas - Guayaquil', de: 'Guayas - Guayaquil', it: 'Guayas - Guayaquil', pt: 'Guayas - Guayaquil', ja: 'グアヤス - グアヤキル', zh: '瓜亚斯 - 瓜亚基尔' },
    title: { en: 'TROPICAL', es: 'PUERTO', fr: 'PORT', de: 'TROPISCHER', it: 'PORTO', pt: 'PORTO', ja: '熱帯の', zh: '热带' },
    title2: { en: 'PORT', es: 'TROPICAL', fr: 'TROPICAL', de: 'HAFEN', it: 'TROPICALE', pt: 'TROPICAL', ja: '港', zh: '港口' },
    description: {
      en: 'The pulsating economic heartbeat of Ecuador. A dynamic and vibrant tropical port city where modern skyline meets historic cobblestone neighborhoods, serving as the perfect gateway connecting the lush coastal plains to the magical Galapagos Islands.',
      es: 'El palpitante latido económico del Ecuador. Una dinámica y vibrante ciudad portuaria tropical donde el horizonte moderno se encuentra con barrios históricos de piedra, sirviendo como la puerta de entrada perfecta que conecta las exuberantes llanuras costeras con las mágicas Islas Galápagos.',
      fr: 'Le cœur économique palpitant de l\'Équateur. Une ville portuaire tropicale dynamique où l\'horizon moderne rencontre des quartiers historiques, servant de porte d\'entrée parfaite reliant les plaines côtières luxuriantes aux îles magiques des Galapagos.',
      de: 'Der pulsierende wirtschaftliche Herzschlag Ecuadors. Eine dynamische und lebendige tropische Hafenstadt, in der moderne Skylines auf historische Viertel treffen, und die als perfektes Tor dient, um die üppigen Küstenebenen mit den magischen Galapagos-Inseln zu verbinden.',
      it: 'Il cuore economico pulsante dell\'Ecuador. Una città portuale tropicale dinamica e vibrante dove lo skyline moderno incontra quartieri storici acciottolati, fungendo da porta di accesso perfetta che collega le lussureggianti pianure costiere alle magiche Isole Galapagos.',
      pt: 'O coração econômico pulsante do Equador. Uma cidade portuária tropical vibrante e dinâmica, onde o horizonte moderno encontra bairros históricos de paralelepípedos, servindo como a porta de entrada perfeita que conecta as planícies costeiras às mágicas Ilhas Galápagos.',
      ja: 'エクアドルの力強い経済の鼓動。近代的なスカイラインと歴史的な石畳の地区が融合するダイナミックで活気のある熱帯の港町で、緑豊かな沿岸平野と魔法のようなガラパゴス諸島を結ぶ完璧な玄関口として機能します。',
      zh: '厄瓜多尔跳动的经济脉搏。一座充满活力的热带港口城市，现代天际线与历史悠久的鹅卵石街区在这里交汇，是连接郁郁葱葱的沿海平原和神奇的加拉帕戈斯群岛的完美门户。'
    },
    image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=2752&q=80'
  },
  {
    place: { en: 'Cusco - Peru', es: 'Cusco - Perú', fr: 'Cusco - Pérou', de: 'Cusco - Peru', it: 'Cusco - Perù', pt: 'Cusco - Peru', ja: 'クスコ - ペルー', zh: '库斯科 - 秘鲁' },
    title: { en: 'SACRED', es: 'VALLE', fr: 'VALLÉE', de: 'HEILIGES', it: 'VALLE', pt: 'VALE', ja: '神聖な', zh: '神圣' },
    title2: { en: 'VALLEY', es: 'SAGRADO', fr: 'SACRÉE', de: 'TAL', it: 'SACRA', pt: 'SAGRADO', ja: '谷', zh: '山谷' },
    description: {
      en: 'Journey into the mystical heart of the ancient Inca Empire. Explore monumental archaeological ruins suspended in the clouds, hike ancestral trails through breathtaking Andean valleys, and stand in awe before the ultimate wonder of the world: Machu Picchu.',
      es: 'Viaje al corazón místico del antiguo Imperio Inca. Explora ruinas arqueológicas monumentales suspendidas en las nubes, camina por senderos ancestrales a través de impresionantes valles andinos y maravíllate ante la máxima maravilla del mundo: Machu Picchu.',
      fr: 'Voyage dans le cœur mystique de l\'ancien Empire Inca. Explorez des ruines archéologiques monumentales suspendues dans les nuages, parcourez des sentiers ancestraux et émerveillez-vous devant l\'ultime merveille du monde : le Machu Picchu.',
      de: 'Reise in das mystische Herz des alten Inka-Reiches. Erkunden Sie monumentale archäologische Ruinen, die in den Wolken schweben, wandern Sie auf alten Pfaden durch atemberaubende Andentäler und staunen Sie über das ultimative Weltwunder: Machu Picchu.',
      it: 'Viaggio nel cuore mistico dell\'antico Impero Inca. Esplora monumentali rovine archeologiche sospese tra le nuvole, fai escursioni su sentieri ancestrali attraverso valli andine mozzafiato e rimani a bocca aperta davanti alla meraviglia assoluta del mondo: Machu Picchu.',
      pt: 'Viaje para o coração místico do antigo Império Inca. Explore ruínas arqueológicas monumentais suspensas nas nuvens, caminhe por trilhas ancestrais através de vales andinos deslumbrantes e maravilhe-se com a maravilha suprema do mundo: Machu Picchu.',
      ja: '古代インカ帝国の神秘的な中心への旅。雲間に浮かぶ記念碑的な考古学的遺跡を探索し、息をのむようなアンデスの谷を通る祖先の小道をハイキングし、世界最高の驚異であるマチュピチュの前に畏敬の念を抱いてください。',
      zh: '踏上前往古老印加帝国神秘中心的旅程。探索悬浮在云端的纪念性考古遗址，徒步穿越令人惊叹的安第斯山谷的祖先小径，并在世界终极奇迹马丘比丘面前惊叹不已。'
    },
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=2752&q=80'
  }
];

export function HeroSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { settings, loading } = useSettings();
  const [isReady, setIsReady] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const locale = useLocale();
  const t = useTranslations('hero');

  useEffect(() => {
    // ✅ W-03 FIX: Si loading ya terminó, setIsReady inmediatamente sin timer
    if (!loading) {
      setIsReady(true);
      return;
    }
    // Fallback: forzar isReady tras 1500ms si loading no resuelve
    const timer = setTimeout(() => setIsReady(true), 1500);
    return () => clearTimeout(timer);
  }, [loading]);

  useEffect(() => {
    if (!isReady) return;

    const slidesData = settings?.hero?.slides?.length ? settings.hero.slides : DEFAULT_DATA;
    let order = slidesData.map((_: any, i: number) => i);
    let detailsEven = true;
    let offsetTop = 200;
    let offsetLeft = 700;
    const cardWidth = 180;
    const cardHeight = 260;
    const gap = 20;
    const numberSize = 50;
    const ease = "sine.inOut";
    let clicks = 0;
    let transitioning = false;
    let pendingRelayout = false;
    let resizeTimer: any = null;
    let isCancelled = false;
    let loopTimeline: any = null;
    let onResizeHandler: any = null;

    gsap.config({ nullTargetWarn: false });
    if (!containerRef.current) return;
    const container = containerRef.current;

    const ctx = gsap.context(() => {
      const set = (target: string, props: any) => gsap.set(container.querySelectorAll(target), props);
      const getCard = (index: number) => `.card-${index}`;
      const getCardContent = (index: number) => `.card-content-${index}`;

      function relayout() {
        if (transitioning) {
          pendingRelayout = true;
          return;
        }
        const height = container.clientHeight || window.innerHeight;
        const width = container.clientWidth || window.innerWidth;

        // AQUÍ SE AJUSTA LA ALTURA DE LAS TARJETAS (números más pequeños = tarjetas más abajo)
        offsetTop = height - cardHeight - 80;
        offsetLeft = Math.max(width - 830, 650);

        const [active, ...rest] = order;
        set(getCard(active), { x: 0, y: 0, width: "100vw", height: "100%", borderRadius: 0, scale: 1.05 });
        set(getCardContent(active), { opacity: 0 });

        rest.forEach((i, index) => {
          const x = offsetLeft + index * (cardWidth + gap);
          set(getCard(i), { x, y: offsetTop, width: cardWidth, height: cardHeight, borderRadius: 12 });
          set(getCardContent(i), { x, y: offsetTop, opacity: 1 });
        });

        set("#pagination", { top: offsetTop + cardHeight + 20, left: offsetLeft });
        set(".cover", { x: width + 400 });
      }

      function onResize() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(relayout, 150);
      }
      onResizeHandler = onResize;

      function init() {
        const height = container.clientHeight || window.innerHeight;
        const width = container.clientWidth || window.innerWidth;

        // AQUÍ SE AJUSTA LA ALTURA DE LAS TARJETAS (números más pequeños = tarjetas más abajo)
        offsetTop = height - cardHeight - 80;
        offsetLeft = Math.max(width - 830, 650);

        const [active, ...rest] = order;
        const detailsActive = detailsEven ? "#details-even" : "#details-odd";
        const detailsInactive = detailsEven ? "#details-odd" : "#details-even";

        set("#pagination", { top: offsetTop + cardHeight + 5, left: offsetLeft, y: 200, opacity: 0, zIndex: 60 });
        set(getCard(active), { x: 0, y: 0, width: "100vw", height: "100%", zIndex: 20 });
        gsap.to(container.querySelectorAll(getCard(active)), { scale: 1.05, duration: 5.7, ease: "none" });
        set(getCardContent(active), { opacity: 0 });

        set(detailsActive, { opacity: 0, zIndex: 22, x: -200 });
        set(detailsInactive, { opacity: 0, zIndex: 12 });
        set(`${detailsInactive} .text`, { y: 100 });
        set(`${detailsInactive} .title-1`, { y: 100 });
        set(`${detailsInactive} .title-2`, { y: 100 });
        set(`${detailsInactive} .desc`, { y: 50 });
        set(`${detailsInactive} .cta`, { y: 60 });

        set(".progress-sub-foreground", { width: 500 * (1 / order.length) * (active + 1) });
        set(".indicator", { x: -width });

        rest.forEach((i, index) => {
          set(getCard(i), { x: offsetLeft + 400 + index * (cardWidth + gap), y: offsetTop, width: cardWidth, height: cardHeight, zIndex: 30, borderRadius: 12 });
          set(getCardContent(i), { x: offsetLeft + 400 + index * (cardWidth + gap), zIndex: 40, y: offsetTop });
          set(`.slide-item-${i}`, { x: (index + 1) * numberSize });
        });

        const startDelay = 0.6;
        rest.forEach((i, index) => {
          gsap.to(container.querySelectorAll(getCard(i)), { x: offsetLeft + index * (cardWidth + gap), ease, delay: startDelay, duration: 0.8 });
          gsap.to(container.querySelectorAll(getCardContent(i)), { x: offsetLeft + index * (cardWidth + gap), ease, delay: startDelay, duration: 0.8 });
        });

        gsap.to(container.querySelectorAll("#pagination"), { y: 0, opacity: 1, ease, delay: startDelay, duration: 0.8 });
        gsap.to(container.querySelectorAll(detailsActive), { opacity: 1, x: 0, ease, delay: startDelay, duration: 0.8 });

        window.addEventListener("resize", onResize);
        startLoop(); // AUTOSTART CAROUSEL
      }

      function animate(target: string, duration: number, properties: any) {
        return new Promise((resolve) => gsap.to(container.querySelectorAll(target), { ...properties, duration, onComplete: resolve }));
      }

      function startLoop() {
        if (isCancelled) return;
        if (loopTimeline) loopTimeline.kill();
        set(".indicator", { x: -window.innerWidth });

        loopTimeline = gsap.timeline({
          onComplete: () => {
            if (isCancelled) return;
            step().then(() => {
              if (!isCancelled) startLoop();
            });
          }
        });

        loopTimeline.to(container.querySelectorAll(".indicator"), { x: 0, duration: 4.5, ease: "none" })
          .to(container.querySelectorAll(".indicator"), { x: window.innerWidth, duration: 0.5, ease: "none" });
      }

      // Setup manual navigation hook
      (window as any).triggerNextSlide = () => {
        if (!transitioning) {
          if (loopTimeline) loopTimeline.kill();
          clicks = 1;
          step().then(() => {
            if (!isCancelled) startLoop();
          });
        }
      };

      (window as any).triggerPrevSlide = () => {
        if (!transitioning) {
          if (loopTimeline) loopTimeline.kill();
          clicks = order.length - 1; // Avanza rápidamente para dar la vuelta
          step().then(() => {
            if (!isCancelled) startLoop();
          });
        }
      };

      (window as any).jumpToSlide = (targetIdx: number) => {
        if (transitioning) return;
        if (order[0] === targetIdx) return;

        const currentPos = order.indexOf(targetIdx);
        if (currentPos > 0) {
          if (loopTimeline) loopTimeline.kill();
          clicks = currentPos;
          step().then(() => {
            if (!isCancelled) startLoop();
          });
        }
      };

      function step() {
        return new Promise<void>((resolve) => {
          if (isCancelled) { resolve(); return; }
          transitioning = true;
          order.push(order.shift() as number);
          detailsEven = !detailsEven;

          const detailsActive = detailsEven ? "#details-even" : "#details-odd";
          const detailsInactive = detailsEven ? "#details-odd" : "#details-even";

          const currentData = slidesData[order[0]];
          const detailsActiveEl = container.querySelector(detailsActive);
          if (detailsActiveEl) {
            const textEl = detailsActiveEl.querySelector('.text span');
            const title1El = detailsActiveEl.querySelector('.title-1 span');
            const title2El = detailsActiveEl.querySelector('.title-2 span');
            const descEl = detailsActiveEl.querySelector('.desc span');
            if (textEl) textEl.textContent = getLocalizedText(currentData.place, locale);
            if (title1El) title1El.textContent = getLocalizedText(currentData.title, locale);
            if (title2El) title2El.textContent = getLocalizedText(currentData.title2, locale);
            if (descEl) descEl.textContent = getLocalizedText(currentData.description, locale);
          }

          gsap.to(container.querySelectorAll(detailsInactive), { opacity: 0, duration: 0.3, ease });

          const [active, ...rest] = order;
          const prv = rest[rest.length - 1];

          set(getCard(prv), { zIndex: 10 });
          set(getCard(active), { zIndex: 20 });

          const activeCardEl = container.querySelector(getCard(prv));
          if (activeCardEl) gsap.to(activeCardEl, { scale: 1.5, ease, duration: 1.2 });

          const activeContentEl = container.querySelector(getCardContent(active));
          if (activeContentEl) gsap.to(activeContentEl, { opacity: 0, duration: 0.3, ease });

          const cActive = container.querySelector(getCard(active));
          if (cActive) {
            gsap.to(cActive, {
              x: 0,
              y: 0,
              width: "100vw",
              height: "100%",
              borderRadius: 0,
              ease,
              duration: 1.2,
              onComplete: () => {
                const xNew = offsetLeft + (rest.length - 1) * (cardWidth + gap);
                set(getCard(prv), { x: xNew, y: offsetTop, width: cardWidth, height: cardHeight, zIndex: 30, borderRadius: 12, scale: 1 });
                set(getCardContent(prv), { x: xNew, y: offsetTop, opacity: 1, zIndex: 40 });
                set(`.slide-item-${prv}`, { x: rest.length * numberSize });

                set(detailsInactive, { opacity: 0, zIndex: 12 });
                set(`${detailsInactive} .text`, { y: 100 });
                set(`${detailsInactive} .title-1`, { y: 100 });
                set(`${detailsInactive} .title-2`, { y: 100 });
                set(`${detailsInactive} .desc`, { y: 50 });

                transitioning = false;
                if (pendingRelayout) {
                  pendingRelayout = false;
                  relayout();
                }

                if (clicks > 1) {
                  clicks -= 1;
                  step();
                } else {
                  clicks = 0;
                }
              }
            });
            gsap.to(cActive, { scale: 1.05, duration: 5.7, ease: "none" });
          }

          set(detailsActive, { zIndex: 22 });
          gsap.to(container.querySelectorAll(detailsActive), { opacity: 1, delay: 0.4, ease, duration: 0.4 });
          animate(`${detailsActive} .text`, 0.7, { y: 0, delay: 0.1, ease });
          animate(`${detailsActive} .title-1`, 0.7, { y: 0, delay: 0.15, ease });
          animate(`${detailsActive} .title-2`, 0.7, { y: 0, delay: 0.15, ease });
          animate(`${detailsActive} .desc`, 0.4, { y: 0, delay: 0.3, ease }).then(() => resolve());

          order.forEach((itemIdx, idx) => {
            gsap.to(container.querySelectorAll(`.slide-item-${itemIdx}`), { x: idx * numberSize, ease, duration: 0.8 });
          });

          gsap.to(container.querySelectorAll(".progress-sub-foreground"), { width: 500 * (1 / order.length) * (active + 1), ease, duration: 0.8 });

          rest.forEach((i, index) => {
            if (i === prv) return;
            set(getCard(i), { zIndex: 30 });
            gsap.to(container.querySelectorAll(getCard(i)), {
              x: offsetLeft + index * (cardWidth + gap),
              y: offsetTop,
              width: cardWidth,
              height: cardHeight,
              ease,
              duration: 0.8,
              delay: 0.1 * (index + 1)
            });
            gsap.to(container.querySelectorAll(getCardContent(i)), {
              x: offsetLeft + index * (cardWidth + gap),
              y: offsetTop,
              opacity: 1,
              zIndex: 40,
              ease,
              duration: 0.8,
              delay: 0.1 * (index + 1)
            });
          });
        });
      }

      init();
      gsap.to(container.querySelectorAll(".splash-screen"), {
        opacity: 0, delay: 1, ease: "power2.inOut", duration: 1.5, onComplete: () => {
          setShowSplash(false);
          setTimeout(() => {
            if (!isCancelled) startLoop();
          }, 200);
        }
      });

    }); // end of gsap.context()

    return () => {
      isCancelled = true;
      clearTimeout(resizeTimer);
      if (onResizeHandler) window.removeEventListener("resize", onResizeHandler);
      if (loopTimeline) loopTimeline.kill();
      ctx.revert();
      delete (window as any).triggerNextSlide;
      delete (window as any).jumpToSlide;
    };
  }, [isReady, settings?.hero?.slides?.length]);

  if (!isReady) {
    return (
      <div className="fixed inset-0 z-[1000] w-full h-[100svh] bg-zinc-950 overflow-hidden flex items-center justify-center">
        <Image
          src="/splash-4-worlds.png"
          alt="Vermilion Routes Welcome"
          fill
          priority
          className="object-cover scale-[1.02] transition-transform duration-[3000ms] ease-out"
        />
        {/* Deep cinematic gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />
        
        {/* Overlay Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
          <div className="relative w-[240px] h-[55px] md:w-[320px] md:h-[70px] mb-8">
            <Image
              src="/logo_claro.png"
              alt="Vermilion Routes"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>
          <h2 className="font-oswald text-3xl md:text-5xl lg:text-6xl font-bold tracking-widest uppercase text-white/95 drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] mb-3">
            All You Need Is Ecuador
          </h2>
          <div className="flex items-center gap-3 md:gap-4 text-white/90 font-medium tracking-[0.2em] uppercase text-[10px] md:text-sm drop-shadow-md">
            <span>Galápagos</span>
            <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
            <span>Andes</span>
            <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
            <span>Amazon</span>
            <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
            <span>Pacific</span>
          </div>
        </div>
      </div>
    );
  }

  const slidesData = settings?.hero?.slides?.length ? settings.hero.slides : DEFAULT_DATA;
  const initialData = slidesData[0];

  return (
    <div ref={containerRef} className="relative w-full h-[100svh] lg:h-[88svh] min-h-[900px] md:min-h-[550px] overflow-hidden bg-zinc-950 text-white font-sans select-none z-0">

      {/* Indicator */}
      <div className="indicator fixed top-0 left-0 right-0 h-[3px] bg-white z-[60]" />

      {/* Details Panels */}
      {[0, 1].map((isOdd) => {
        const id = isOdd ? 'details-odd' : 'details-even';
        return (
          <div key={id} id={id} className="absolute left-0 w-full px-4 md:px-0 md:w-auto md:left-[30px] lg:left-[60px] top-[100px] md:top-[50px] lg:top-[70px] z-[22] flex flex-col items-center md:items-start text-center md:text-left">
            <div className="h-auto overflow-hidden mb-2">
              <div className="text text-white/90 font-medium tracking-widest uppercase text-base md:text-sm pt-4 relative flex flex-col items-center md:items-start">
                <div className="absolute top-0 w-8 h-[2px] bg-white rounded-full" />
                <span className="notranslate mt-2 md:mt-0">{getLocalizedText(initialData.place, locale)}</span>
              </div>
            </div>

            <div className="h-auto md:h-[80px] lg:h-[90px] overflow-hidden mt-1 flex flex-col items-center md:items-start w-full">
              <div className="title-1 font-oswald font-extrabold text-4xl sm:text-5xl md:text-7xl lg:text-[80px] uppercase leading-[0.9] tracking-tight drop-shadow-lg">
                <span className="notranslate">{getLocalizedText(initialData.title, locale)}</span>
              </div>
            </div>
            <div className="h-auto md:h-[80px] lg:h-[90px] overflow-hidden mt-1 flex flex-col items-center md:items-start w-full">
              <div className="title-2 font-oswald font-extrabold text-4xl sm:text-5xl md:text-7xl lg:text-[80px] uppercase leading-[0.9] tracking-tight text-white drop-shadow-lg">
                <span className="notranslate">{getLocalizedText(initialData.title2, locale)}</span>
              </div>
            </div>

            <div className="h-auto md:h-[80px] lg:h-[120px] overflow-hidden mt-4 md:mt-6 flex flex-col items-center md:items-start w-full">
              <div className="desc text-sm sm:text-base md:text-lg text-white/90 max-w-xl leading-relaxed drop-shadow-md">
                <span>{getLocalizedText(initialData.description, locale)}</span>
              </div>
            </div>
          </div>
        );
      })}

      {/* Cards */}
      {slidesData.map((slide: any, idx: number) => (
        <div key={`card-${idx}`}>
          <div
            className={`card card-${idx} absolute top-0 left-0 shadow-2xl overflow-hidden w-[180px] h-[260px]`}
          >
            <Image
              src={slide.image}
              alt={slide.place}
              fill
              priority={idx === 0} // [RENDIMIENTO] Fuerza carga prioritaria del LCP
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 180px"
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Clickable Overlay for Thumbnail */}
            <div
              className="absolute inset-0 cursor-pointer z-10 hover:bg-white/10 transition-colors"
              onClick={() => (window as any).jumpToSlide?.(idx)}
              title="View destination"
            />
          </div>

          <div className={`card-content card-content-${idx} absolute left-0 top-0 text-white w-[180px] h-[260px] pointer-events-none`}>
            <div className="absolute bottom-5 left-5 right-5 text-left">
              <div className="w-4 h-[2px] bg-white mb-2" />
              <p className="text-[9px] uppercase font-bold text-white/80 tracking-widest mb-1 line-clamp-1 notranslate">{getLocalizedText(slide.place, locale)}</p>
              <h4 className="text-xl font-oswald font-bold uppercase leading-tight line-clamp-2 drop-shadow-md notranslate">{getLocalizedText(slide.title, locale)}</h4>
            </div>
          </div>
        </div>
      ))}

      {/* Pagination HUD */}
      <div id="pagination" className="absolute left-0 top-0 flex items-center">
        {/* Navigation Arrows */}
        <div className="hidden md:flex gap-4 mr-6">
          <div onClick={() => (window as any).triggerPrevSlide?.()} className="w-[38px] h-[38px] rounded-full border border-white/30 flex items-center justify-center cursor-pointer hover:bg-white hover:text-black transition-colors group">
            <ChevronLeft className="w-4 h-4 text-white/60 group-hover:text-black" />
          </div>
          <div onClick={() => (window as any).triggerNextSlide?.()} className="w-[38px] h-[38px] rounded-full border border-white/30 flex items-center justify-center cursor-pointer hover:bg-white hover:text-black transition-colors group">
            <ChevronRight className="w-4 h-4 text-white/60 group-hover:text-black" />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-[300px] md:w-[400px] lg:w-[500px] h-[42px] flex items-center">
          <div className="w-full h-[3px] bg-white/20 relative rounded-full overflow-hidden">
            <div className="progress-sub-foreground absolute top-0 left-0 h-full bg-white rounded-full" />
          </div>
        </div>

        {/* Slide Numbers */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 overflow-hidden h-[50px] w-12 hidden md:block">
          <div className="indicator absolute right-0 top-0 h-full bg-white/20" style={{ width: '100vw' }} />
          {slidesData.map((_: any, index: number) => (
            <div key={`num-${index}`} className={`slide-item-${index} absolute top-1/2 -translate-y-1/2 left-0 w-[50px] h-[50px] grid place-items-center text-white font-oswald text-xl md:text-2xl font-bold tracking-widest`}>
              0{index + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Stats Section injected into Hero */}
      <div className="absolute bottom-4 left-0 w-full z-50 block md:hidden">
        <StatsSection />
      </div>

      {/* Splash Screen Overlay for smooth fade out */}
      {showSplash && (
        <div className="splash-screen absolute inset-0 z-[1000] w-full h-[130svh] md:h-[100svh] bg-zinc-950 overflow-hidden flex items-center justify-center">
          <Image
            src="/splash-4-worlds.png"
            alt="Vermilion Routes Welcome"
            fill
            priority
            className="object-cover scale-[1.05] transition-transform duration-[4000ms] ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />
          
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
            <div className="relative w-[240px] h-[55px] md:w-[320px] md:h-[70px] mb-8">
              <Image
                src="/logo_claro.png"
                alt="Vermilion Routes"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
            <h2 className="font-oswald text-3xl md:text-5xl lg:text-6xl font-bold tracking-widest uppercase text-white/95 drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] mb-3">
              All You Need Is Ecuador
            </h2>
            <div className="flex items-center gap-3 md:gap-4 text-white/90 font-medium tracking-[0.2em] uppercase text-[10px] md:text-sm drop-shadow-md">
              <span>Galápagos</span>
              <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
              <span>Andes</span>
              <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
              <span>Amazon</span>
              <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
              <span>Pacific</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
