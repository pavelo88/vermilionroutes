'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useSettings } from '@/hooks/useSettings';
import { ChevronLeft, ChevronRight, MessageCircle, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { getLocalizedText } from '@/utils/i18nHelper';
import { SplashScreen } from './SplashScreen';
import { SlideData } from '@/types';

// STRICT 2-LINE TITLES ACROSS ALL 8 LANGUAGES (Line 1 = Main Descriptor, Line 2 = Concise Landmark)
const DEFAULT_DATA: SlideData[] = [
  {
    place: { en: 'Galapagos - Santa Cruz', es: 'Galápagos - Santa Cruz', fr: 'Galapagos - Santa Cruz', de: 'Galapagos - Santa Cruz', it: 'Galapagos - Santa Cruz', pt: 'Galápagos - Santa Cruz', ja: 'ガラパゴス - サンタクルス', zh: '加拉帕戈斯 - 圣克鲁斯' },
    title: { en: 'GIANT TORTOISES', es: 'TORTUGAS GIGANTES', fr: 'TORTUES GÉANTES', de: 'RIESENSCHILD KRÖTEN', it: 'TARTARUGHE GIGANTI', pt: 'TARTARUGAS GIGANTES', ja: '古代の巨大', zh: '古老巨型' },
    title2: { en: 'OF GALAPAGOS', es: 'DE GALÁPAGOS', fr: 'DES GALAPAGOS', de: 'DER GALAPAGOS', it: 'DELLE GALAPAGOS', pt: 'DE GALÁPAGOS', ja: 'ガラパゴスゾウガメ', zh: '加拉帕戈斯陆龟' },
    description: {
      en: 'Observe ancient giant tortoises roaming freely in their natural habitat at the highlands of Santa Cruz Island and explore majestic volcanic twin craters surrounded by Scalesia forests.',
      es: 'Observa tortugas gigantes centenarias en su hábitat natural en las tierras altas de Santa Cruz y explora impresionantes cráteres volcánicos gemelos rodeados de bosques de Scalesia.',
      fr: 'Observez des tortues géantes centenaires en liberté dans les hauts plateaux de Santa Cruz et explorez de majestueux cratères jumeaux entourés de forêts de Scalesia.',
      de: 'Beobachten Sie uralte Riesenschildkröten in freier Wildbahn im Hochland von Santa Cruz und erkunden Sie majestätische Zwillingskrater inmitten dichter Scalesia-Wälder.',
      it: 'Osserva antiche tartarughe giganti in libertà negli altipiani di Santa Cruz ed esplora maestosi crateri gemelli circondati da foreste di Scalesia.',
      pt: 'Observe tartarugas gigantes centenárias em seu habitat natural nas terras altas de Santa Cruz e explore majestosas crateras vulcânicas gêmeas.',
      ja: 'サンタクルス島の高地で自由に歩き回る古代の巨大ゾウガメを観察し、スカレシアの森に囲まれた壮大な双子の火口を探索しましょう。',
      zh: '在圣克鲁斯岛高地观察在自然栖息地自由漫步的古老巨型陆龟，并探索被斯卡莱西亚森林环绕的壮观双子火山口。'
    },
    image: '/images/tours/16-9/galapagos-tortuga-gigante-16-9.jpg'
  },
  {
    place: { en: 'Pichincha - Quito', es: 'Pichincha - Quito', fr: 'Pichincha - Quito', de: 'Pichincha - Quito', it: 'Pichincha - Quito', pt: 'Pichincha - Quito', ja: 'ピチンチャ - キト', zh: '皮钦查 - 基多' },
    title: { en: 'HISTORIC CENTER', es: 'CENTRO HISTÓRICO', fr: 'CENTRE HISTORIQUE', de: 'HISTORISCHES ZENTRUM', it: 'CENTRO STORICO', pt: 'CENTRO HISTÓRICO', ja: '世界遺産の歴史的', zh: '世界文化遗产' },
    title2: { en: 'OF QUITO', es: 'DE QUITO', fr: 'DE QUITO', de: 'VON QUITO', it: 'DI QUITO', pt: 'DE QUITO', ja: 'キト旧市街', zh: '基多古城' },
    description: {
      en: 'The first UNESCO World Cultural Heritage site in the world. Walk along preserved cobblestone streets and marvel at the golden altars of La Compañía Church.',
      es: 'El primer sitio Patrimonio Cultural de la Humanidad por la UNESCO. Recorre calles coloniales empedradas y admira los templos dorados de La Compañía.',
      fr: 'Le premier site du patrimoine mondial de l\'UNESCO. Promenez-vous dans des rues pavées et admirez les retables dorés de l\'église de la Compañía.',
      de: 'Das erste UNESCO-Weltkulturerbe der Welt. Spazieren Sie durch koloniale Kopfsteinpflastergassen und bewundern Sie die vergoldeten Altäre der Kirche La Compañía.',
      it: 'Il primo sito patrimonio mondiale UNESCO al mondo. Cammina lungo strade acciottolate e admira gli altari dorati della Chiesa de La Compañía.',
      pt: 'O primeiro local do Patrimônio Mundial da UNESCO. Caminhe por ruas coloniais e admire os altares dourados da Igreja de La Compañía.',
      ja: '世界初の世界文化遺産。保存状態の良い石畳の街並みを歩き、黄金色に輝くラ・コンパニーア教会の祭壇に驚嘆してください。',
      zh: '全球首个联合国教科文组织世界文化遗产。漫步在鹅卵石古街，赞叹拉孔帕尼亚教堂富丽堂皇的金箔祭坛。'
    },
    image: '/images/tours/16-9/quito-iglesia-de-san-francisco-16-9.jpg'
  },
  {
    place: { en: 'Tungurahua - Baños', es: 'Tungurahua - Baños', fr: 'Tungurahua - Baños', de: 'Tungurahua - Baños', it: 'Tungurahua - Baños', pt: 'Tungurahua - Baños', ja: 'トゥングラワ - バニョス', zh: '通古拉瓦 - 巴尼奥斯' },
    title: { en: 'PAILÓN', es: 'CASCADA PAILÓN', fr: 'CASCADE PAILÓN', de: 'WASSERFALL PAILÓN', it: 'CASCATA PAILÓN', pt: 'CACHOEIRA PAILÓN', ja: '大迫力の悪魔の', zh: '雷霆万钧之' },
    title2: { en: 'DEL DIABLO', es: 'DEL DIABLO', fr: 'DU DIABLE', de: 'DEL DIABLO', it: 'DEL DIABLO', pt: 'DEL DIABLO', ja: '咽喉の滝', zh: '恶魔之咽瀑布' },
    description: {
      en: 'Feel the thunderous roar of Ecuador’s most famous waterfall. Experience suspension bridges, lush tropical cloud forest, and the scenic Route of the Waterfalls.',
      es: 'Siente la fuerza atronadora de la cascada más emblemática de los Andes ecuatorianos en un entorno de exuberante vegetación y puentes colgantes.',
      fr: 'Ressentez la puissance de la cascade la plus célèbre d\'Équateur, au cœur d\'une végétation luxuriante et de ponts suspendus.',
      de: 'Spüren Sie die gewaltige Kraft des berühmtesten Wasserfalls Ecuadors inmitten üppiger Tropenvegetation und Hängebrücken.',
      it: 'Senti la potenza fragorosa della cascata más famosa dell\'Ecuador tra una vegetazione lussureggiante e ponti sospesi.',
      pt: 'Sinta a force estrondosa da cachoeira mais famosa do Equador entre pontes suspensas e florestas tropicais.',
      ja: 'エクアドルで最も有名な滝の雷鳴のような轟音を感じ、豊かな熱帯雲霧林と吊り橋の絶景を体験してください。',
      zh: '感受厄瓜多尔最著名瀑布的雷霆万钧之力，漫步悬索桥与热带云雾森林。'
    },
    image: '/images/tours/16-9/pailon-del-diablo-16-9.jpg'
  },
  {
    place: { en: 'Cotopaxi - Andes', es: 'Cotopaxi - Andes', fr: 'Cotopaxi - Andes', de: 'Cotopaxi - Anden', it: 'Cotopaxi - Ande', pt: 'Cotopaxi - Andes', ja: 'コトパクシ - アンデス', zh: '科托帕希 - 安第斯' },
    title: { en: 'MAJESTIC VOLCANO', es: 'MAJESTUOSO VOLCÁN', fr: 'VOLCAN MAJESTUEUX', de: 'MAJESTÄTISCHER VULKAN', it: 'MAESTOSO VULCANO', pt: 'MAJESTOSO VULCÃO', ja: 'アンデス山脈の', zh: '火山大道的雄伟' },
    title2: { en: 'COTOPAXI', es: 'COTOPAXI', fr: 'COTOPAXI', de: 'COTOPAXI', it: 'COTOPAXI', pt: 'COTOPAXI', ja: 'コトパクシ火山', zh: '科托帕希火山' },
    description: {
      en: 'The iconic snow-capped volcano rising proudly over 5,897 meters across the Avenue of Volcanoes, surrounded by wild horses and high-altitude Andean páramo.',
      es: 'El cono nevado perfecto que se alza a 5.897 metros en la legendaria Avenida de los Volcanes, rodeado de caballos salvajes y páramo andino.',
      fr: 'Le cône parfait enneigé culminant à 5 897 mètres dans l\'Avenue des Volcans, entouré de chevaux sauvages et de paysages de landes andines.',
      de: 'Der schneebedeckte Vulkankegel, der 5.897 Meter über die Straße der Vulkane ragt, umgeben von Wildpferden und Páramo.',
      it: 'Il cono innevato perfetto che si erge a 5.897 metri sull\'Avenida dei Vulcani, circondato da cavalli selvaggi e páramo andino.',
      pt: 'O cone nevado perfeito que se ergue a 5.897 metros na Avenida dos Vulcões, cercado por cavalos selvagens e páramo.',
      ja: '野生の馬や高山植物に囲まれ、火山の街道に誇らしげにそびえる標高5,897メートルのコトパクシ火山。',
      zh: '海拔5897米白雪皑皑的完美火山锥，雄踞火山大道，周围环绕着高山草甸与野马。'
    },
    image: '/images/tours/16-9/cotopaxi-volcano-16-9.jpg'
  },
  {
    place: { en: 'Cotopaxi - Quilotoa', es: 'Cotopaxi - Quilotoa', fr: 'Cotopaxi - Quilotoa', de: 'Cotopaxi - Quilotoa', it: 'Cotopaxi - Quilotoa', pt: 'Cotopaxi - Quilotoa', ja: 'キロトア - アンデス', zh: '基洛托阿 - 火山湖' },
    title: { en: 'CRATER LAGOON', es: 'LAGUNA CRÁTER', fr: 'LAGUNE DE CRATÈRE', de: 'KRATERLAGUNE', it: 'LAGUNA CRATERE', pt: 'LAGUNA CRATERA', ja: 'エメラルド色の', zh: '绿松石翡翠色的' },
    title2: { en: 'OF QUILOTOA', es: 'DEL QUILOTOA', fr: 'DU QUILOTOA', de: 'VON QUILOTOA', it: 'DEL QUILOTOA', pt: 'DO QUILOTOA', ja: 'キロトア火口湖', zh: '基洛托阿火山湖' },
    description: {
      en: 'Marvel at the striking turquoise waters inside an ancient volcanic caldera located at 3,500 meters altitude with panoramic views of the western Andes range.',
      es: 'Maravíllate con las aguas color esmeralda dentro de la caldera volcánica a 3.500 metros de altura con vistas panorámicas de la cordillera andina.',
      fr: 'Admirez les eaux turquoise éblouissantes de cette caldeira volcanique située à 3 500 mètres d\'altitude face aux Andes.',
      de: 'Bestaunen Sie das türkisblaue Wasser in der vulkanischen Caldera auf 3.500 Metern Höhe mit Panoramablick auf die Anden.',
      it: 'Ammira le acque turchesi all\'interno dell\'antica caldera vulcanica a 3.500 metri di altitudine con vista panoramica sulle Ande.',
      pt: 'Maravilhe-se com as águas esmeralda dentro da caldeira vulcânica a 3.500 metros com vistas panorâmicas dos Andes.',
      ja: 'アンデス山脈のパノラマビューを望む標高3,500メートルの古代カルデラ内の見事なターコイズブルーの湖水。',
      zh: '惊叹于海拔3500米古代火山口内令人着迷的绿松石色湖水与壮丽安第斯全景。'
    },
    image: '/images/tours/16-9/quilotoa-16-9.jpg'
  },
  {
    place: { en: 'Napo - Amazon Rainforest', es: 'Napo - Selva Amazónica', fr: 'Napo - Forêt Amazonienne', de: 'Napo - Amazonas Regenwald', it: 'Napo - Foresta Amazzonica', pt: 'Napo - Selva Amazônica', ja: 'ナポ - アマゾン熱帯雨林', zh: '纳波 - 亚马逊雨林' },
    title: { en: 'DEEP RAINFOREST', es: 'SELVA PROFUNDA', fr: 'FORÊT PROFONDE', de: 'TIEFER REGENWALD', it: 'FORESTA PROFONDA', pt: 'SELVA PROFUNDA', ja: '手付かずの原生', zh: '原始神秘的' },
    title2: { en: 'OF AMAZON', es: 'DEL AMAZONAS', fr: 'DE L\'AMAZONIE', de: 'DES AMAZONAS', it: 'DELL\'AMAZZONIA', pt: 'DO AMAZONAS', ja: 'アマゾン熱帯雨林', zh: '亚马逊雨林' },
    description: {
      en: 'Navigate pristine Amazonian rivers by motorized canoe, encounter native wildlife at rescue sanctuaries, and connect with authentic Kichwa indigenous families.',
      es: 'Navega en canoas motorizadas por ríos amazónicos vírgenes, descubre fauna rescatada y comparte tradiciones con comunidades ancestrales Kichwa.',
      fr: 'Naviguez en pirogue à moteur sur des rivières amazoniennes préservées et découvrez la culture authentique des familles Kichwa.',
      de: 'Fahren Sie mit dem motorisierten Kanu auf unberührten Amazonasflüssen und lernen Sie die Traditionen der Kichwa-Gemeinschaften kennen.',
      it: 'Naviga fiumi amazzonici incontaminati in canoa a motore e scopri le tradizioni delle comunità indigene Kichwa.',
      pt: 'Navegue em canoas motorizadas por rios amazônicos intocados e compartilhe tradições com famílias Kichwa.',
      ja: '動力付きカヌーで手付かずのアマゾン川を航行し、固有の野生生物に出会い、先住民族キチュワの家族と交流しましょう。',
      zh: '乘坐机动独木舟穿行于原始亚马逊支流，探访野生动物保护区，融入传统奇瓦印第安社区。'
    },
    image: '/images/tours/16-9/tena-amazon-jungle-16-9.jpg'
  },
  {
    place: { en: 'Galapagos - Isabela Island', es: 'Galápagos - Isla Isabela', fr: 'Galapagos - Île Isabela', de: 'Galapagos - Insel Isabela', it: 'Galapagos - Isola Isabela', pt: 'Galápagos - Ilha Isabela', ja: 'ガラパゴス - イサベラ島', zh: '加拉帕戈斯 - 伊莎贝拉岛' },
    title: { en: 'TINTORERAS ISLET', es: 'ISLOTE TINTORERAS', fr: 'ÎLOT TINTORERAS', de: 'INSEL TINTORERAS', it: 'ISOLOTTO TINTORERAS', pt: 'ILHÉU TINTORERAS', ja: 'ティントレラス岩礁と', zh: '蒂恩托雷拉斯海礁与' },
    title2: { en: '& FLAMINGOS', es: 'Y FLAMENCOS', fr: 'ET FLAMANTS', de: '& FLAMINGOS', it: 'E FENICOTTERI', pt: 'E FLAMINGOS', ja: 'フラミンゴ', zh: '火烈鸟群' },
    description: {
      en: 'Snorkel in turquoise lava channels with white-tip reef sharks, marine iguanas, and sea turtles, and visit coastal lagoons filled with wild flamingos.',
      es: 'Nada en canales de lava turquesa con tiburones de arrecife, iguanas marinas y tortugas, y observa flamencos en lagunas costeras protegidas.',
      fr: 'Faites du snorkeling dans des canaux de lave avec des requins de récif et des tortues marines, et admirez les flamants roses.',
      de: 'Schnorcheln Sie in Lavakanälen mit Riffhaien und Meeresschildkröten und beobachten Sie Flamingos in Küstenlagunen.',
      it: 'Fai snorkeling in canali di lava turchese con squali di barriera e tartarughe e osserva i fenicotteri nelle lagune.',
      pt: 'Mergulhe em canais de lava com tubarões e tartarugas marinhas e observe flamingos em lagoas costeiras.',
      ja: 'ネムリブカやウミイグアナ、ウミガメと一緒に溶岩水路でシュノーケリングをし、フラミンゴのラグーンを訪れましょう。',
      zh: '在绿松石色火山熔岩水渠中与白顶礁鲨、海鬣蜥和海龟同游，探访火烈鸟泻湖。'
    },
    image: '/images/tours/16-9/isabela-island-16-9.jpg'
  },
  {
    place: { en: 'Azuay - Cuenca & Cajas', es: 'Azuay - Cuenca y Cajas', fr: 'Azuay - Cuenca & Cajas', de: 'Azuay - Cuenca & Cajas', it: 'Azuay - Cuenca e Cajas', pt: 'Azuay - Cuenca e Cajas', ja: 'クエンカ＆カハス国立公園', zh: '昆卡与卡哈斯国家公园' },
    title: { en: 'COLONIAL CUENCA', es: 'CUENCA COLONIAL', fr: 'CUENCA COLONIALE', de: 'KOLONIALES CUENCA', it: 'CUENCA COLONIALE', pt: 'CUENCA COLONIAL', ja: '世界遺産クエンカと', zh: '殖民名城昆卡与' },
    title2: { en: '& CAJAS', es: 'Y CAJAS', fr: 'ET CAJAS', de: '& CAJAS', it: 'E CAJAS', pt: 'E CAJAS', ja: 'カハス国立公園', zh: '卡哈斯公园' },
    description: {
      en: 'Discover the UNESCO-listed colonial elegance of Cuenca, handcrafted toquilla hats, and hike among the 200 glacial lakes of Cajas National Park.',
      es: 'Descubre la elegancia colonial de Cuenca (Patrimonio UNESCO), los talleres de sombreros de toquilla y los más de 200 lagos glaciares del Parque Nacional Cajas.',
      fr: 'Découvrez l\'élégance coloniale de Cuenca, les ateliers de chapeaux de toquilla et les 200 lacs glaciaires du parc Cajas.',
      de: 'Entdecken Sie das koloniale Cuenca, traditionelle Panamahut-Werkstätten und über 200 Gletscherseen im Nationalpark Cajas.',
      it: 'Scopri l\'eleganza coloniale di Cuenca, i cappelli di toquilla e gli oltre 200 laghi glaciali del Parco Nazionale Cajas.',
      pt: 'Descubra a elegância colonial de Cuenca, os chapéus de toquilla e mais de 200 lagos glaciares no Parque Nacional Cajas.',
      ja: '世界遺産の街クエンカのコロニアルな優雅さとパナマハット工房を発見し、カハス国立公園の200以上の氷河湖を巡りましょう。',
      zh: '探索世界遗产城市昆卡的殖民典雅、巴拿马草帽工坊，徒步于卡哈斯国家公园的200多个冰川湖泊。'
    },
    image: '/images/tours/16-9/cajas-national-park-16-9.jpg'
  },
  {
    place: { en: 'Chimborazo - Andes', es: 'Chimborazo - Andes', fr: 'Chimborazo - Andes', de: 'Chimborazo - Anden', it: 'Chimborazo - Ande', pt: 'Chimborazo - Andes', ja: 'チンボラソ - アンデス', zh: '钦博拉索 - 安第斯' },
    title: { en: 'HIGHEST SUMMIT', es: 'CUMBRE DEL VOLCÁN', fr: 'SOMMET DU VOLCAN', de: 'HÖCHSTER GIPFEL', it: 'VETTA DEL VULCANO', pt: 'CUME DO VULCÃO', ja: '太陽に最も近い最高峰', zh: '离太阳最近的最高峰' },
    title2: { en: 'OF CHIMBORAZO', es: 'CHIMBORAZO', fr: 'CHIMBORAZO', de: 'DES CHIMBORAZO', it: 'CHIMBORAZO', pt: 'CHIMBORAZO', ja: 'チンボラソ火山', zh: '钦博拉索火山' },
    description: {
      en: 'The closest point on Earth to the Sun at 6,310 meters. Experience the majestic Andean reserve home to wild vicuñas and ancestral Inca mountain landscapes.',
      es: 'El punto más cercano de la Tierra al Sol a 6.310 metros. Explora la reserva de fauna andina habitada por elegantes vicuñas y paisajes ancestrales.',
      fr: 'Le point le plus proche du Soleil sur Terre à 6 310 mètres. Explorez cette réserve andine peuplée de vigognes sauvages.',
      de: 'Der sonnennächste Punkt der Erde auf 6.310 Metern Höhe. Erkunden Sie das Andenreservat mit wilden Vikunjas.',
      it: 'Il punto più vicino al Sole sulla Terra a 6.310 metri. Esplora la riserva andina popolata da vigogne selvatiche.',
      pt: 'O ponto mais próximo do Sol na Terra a 6.310 metros. Explore a reserva andina com vicunhas selvagens.',
      ja: '地球上で太陽に最も近い標高6,310メートルのチンボラソ火山。野生のビクーニャが生息する雄大なアンデス自然保護区を体験。',
      zh: '海拔6310米，地球表面距离太阳最近的点。探索栖息着野生小羊驼与古老印加山地的宏伟安第斯保护区。'
    },
    image: '/images/tours/16-9/chimborazo-volcano-16-9.jpg'
  },
  {
    place: { en: 'Galapagos - Puerto Ayora', es: 'Galápagos - Puerto Ayora', fr: 'Galapagos - Puerto Ayora', de: 'Galapagos - Puerto Ayora', it: 'Galapagos - Puerto Ayora', pt: 'Galápagos - Puerto Ayora', ja: 'ガラパゴス - プエルト・アヨラ', zh: '加拉帕戈斯 - 阿约拉港' },
    title: { en: 'LAS GRIETAS', es: 'LAS GRIETAS', fr: 'LAS GRIETAS', de: 'LAS GRIETAS', it: 'LAS GRIETAS', pt: 'LAS GRIETAS', ja: 'ラス・グリエタス峡谷と', zh: '拉斯格里塔斯峡谷与' },
    title2: { en: '& LOBERÍA', es: 'Y LOBERÍA', fr: 'ET LOBERÍA', de: '& LOBERÍA', it: 'E LOBERÍA', pt: 'E LOBERÍA', ja: 'アシカ海岸', zh: '海狮海滩' },
    description: {
      en: 'Swim and snorkel in the crystal-clear volcanic crevice of Las Grietas and observe playful Galapagos sea lions resting on the white sand beaches of La Lobería.',
      es: 'Nada en la impresionante grieta volcánica de agua cristalina Las Grietas y observa colonias de juguetones lobos marinos en las playas de La Lobería.',
      fr: 'Baignez-vous dans la faille volcanique aux eaux cristallines de Las Grietas et observez les otaries sur les plages de La Lobería.',
      de: 'Schwimmen und schnorcheln Sie in der kristallklaren Vulkanspalte Las Grietas und beobachten Sie Seelöwen an den Stränden von La Lobería.',
      it: 'Nuota nella fessura vulcanica cristallina di Las Grietas e osserva i leoni marini sulle spiagge di La Lobería.',
      pt: 'Nade na fenda vulcânica de águas cristalinas de Las Grietas e observe leões-marinhos nas praias de La Lobería.',
      ja: 'ラス・グリエタスの透き通った溶岩の裂け目で泳ぎ、ラ・ロベリアの白砂のビーチで遊ぶアシカを観察しましょう。',
      zh: '在拉斯格里塔斯清澈见底的火山峡谷裂缝中游泳潜水，在拉洛贝里亚白沙滩观赏海狮群。'
    },
    image: '/images/tours/16-9/las-grietas-canyon-16-9.jpg'
  }
];

export function HeroSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { settings, loading } = useSettings();
  const [isReady, setIsReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [showSplash, setShowSplash] = useState(() => {
    if (typeof window !== 'undefined') {
      return !sessionStorage.getItem('vermilion_splash_shown');
    }
    return true;
  });
  const locale = useLocale();
  const t = useTranslations('hero');

  const getPlanLabel = () => {
    const fallbackMap: Record<string, string> = {
      es: 'Planifica Tu Viaje',
      en: 'Plan Your Trip',
      fr: 'Planifiez Votre Voyage',
      de: 'Planen Sie Ihre Reise',
      it: 'Pianifica Il Tuo Viaggio',
      pt: 'Planeje Sua Viagem',
      ja: '旅行を計画する',
      zh: '规划您的行程'
    };
    try {
      const val = t('cta.plan');
      return (!val || val.includes('hero.cta.plan')) ? (fallbackMap[locale] || 'Plan Your Trip') : val;
    } catch {
      return fallbackMap[locale] || 'Plan Your Trip';
    }
  };

  const getExploreLabel = () => {
    const fallbackMap: Record<string, string> = {
      es: 'Explorar Tours',
      en: 'Explore Tours',
      fr: 'Explorer les Circuits',
      de: 'Touren Entdecken',
      it: 'Esplora i Tour',
      pt: 'Explorar Passeios',
      ja: 'ツアーを見る',
      zh: '探索行程'
    };
    try {
      const val = t('cta.explore');
      return (!val || val.includes('hero.cta.explore') || val.toLowerCase().includes('todos') || val.toLowerCase().includes('all'))
        ? (fallbackMap[locale] || 'Explore Tours')
        : val;
    } catch {
      return fallbackMap[locale] || 'Explore Tours';
    }
  };

  useEffect(() => {
    if (!loading) {
      setIsReady(true);
      return;
    }
    const timer = setTimeout(() => setIsReady(true), 1500);
    return () => clearTimeout(timer);
  }, [loading]);

  useEffect(() => {
    if (!isReady) return;

    const slidesData = DEFAULT_DATA;
    let order = slidesData.map((_: any, i: number) => i);
    let detailsEven = true;
    let offsetTop = 200;
    let offsetLeft = 700;
    const cardWidth = 180;
    const cardHeight = 260;
    const gap = 20;
    const numberSize = 50;
    const ease = "sine.inOut";
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

        offsetTop = height - cardHeight - 150;
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

        offsetTop = height - cardHeight - 150;
        offsetLeft = Math.max(width - 830, 650);

        const [active, ...rest] = order;
        const detailsActive = detailsEven ? "#details-even" : "#details-odd";
        const detailsInactive = detailsEven ? "#details-odd" : "#details-even";

        set("#pagination", { top: offsetTop + cardHeight + 20, left: offsetLeft, y: 200, opacity: 0, zIndex: 60 });
        set(getCard(active), { x: 0, y: 0, width: "100vw", height: "100%", zIndex: 20 });
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
        startLoop();
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

      (window as any).triggerNextSlide = () => {
        if (!transitioning) {
          if (loopTimeline) loopTimeline.kill();
          step('next').then(() => {
            if (!isCancelled) startLoop();
          });
        }
      };

      (window as any).triggerPrevSlide = () => {
        if (!transitioning) {
          if (loopTimeline) loopTimeline.kill();
          step('prev').then(() => {
            if (!isCancelled) startLoop();
          });
        }
      };

      (window as any).jumpToSlide = (targetIdx: number) => {
        if (transitioning) return;
        if (order[0] === targetIdx) return;
        if (loopTimeline) loopTimeline.kill();

        const currentPos = order.indexOf(targetIdx);
        if (currentPos > 0) {
          order = [...order.slice(currentPos), ...order.slice(0, currentPos)];
          step('jump').then(() => {
            if (!isCancelled) startLoop();
          });
        }
      };

      function step(dir: 'next' | 'prev' | 'jump' = 'next') {
        return new Promise<void>((resolve) => {
          if (isCancelled) { resolve(); return; }
          transitioning = true;
          
          const prevActive = order[0];

          if (dir === 'prev') {
            order.unshift(order.pop() as number);
          } else if (dir === 'next') {
            order.push(order.shift() as number);
          }

          detailsEven = !detailsEven;

          const detailsActive = detailsEven ? "#details-even" : "#details-odd";
          const detailsInactive = detailsEven ? "#details-odd" : "#details-even";

          const currentData = slidesData[order[0]];
          const detailsActiveEl = container.querySelector(detailsActive);
          if (detailsActiveEl) {
            const textEl = detailsActiveEl.querySelector('.text span');
            const title1El = detailsActiveEl.querySelector('.title-1 span');
            const title2El = detailsActiveEl.querySelector('.title-2 span');
            const descEl = detailsActiveEl.querySelector('.hero-desc-text');
            if (textEl) textEl.textContent = getLocalizedText(currentData.place, locale);
            if (title1El) title1El.textContent = getLocalizedText(currentData.title, locale);
            if (title2El) title2El.textContent = getLocalizedText(currentData.title2, locale);
            if (descEl) descEl.textContent = getLocalizedText(currentData.description, locale);
          }

          gsap.to(container.querySelectorAll(detailsInactive), { opacity: 0, duration: 0.3, ease });

          const [active, ...rest] = order;

          set(getCard(prevActive), { zIndex: 10 });
          set(getCard(active), { zIndex: 20 });
          set(`${getCard(active)} .card-overlay`, { opacity: 0 });

          const activeContentEl = container.querySelector(getCardContent(active));
          if (activeContentEl) gsap.to(activeContentEl, { opacity: 0, duration: 0.2, ease });

          const cActive = container.querySelector(getCard(active));
          if (cActive) {
            gsap.to(cActive, {
              x: 0,
              y: 0,
              width: "100vw",
              height: "100%",
              borderRadius: 0,
              ease,
              duration: 1.1,
              onComplete: () => {
                transitioning = false;
                if (dir === 'next') {
                  const lastIdx = rest.length - 1;
                  set(getCard(prevActive), {
                    x: offsetLeft + lastIdx * (cardWidth + gap),
                    y: offsetTop,
                    width: cardWidth,
                    height: cardHeight,
                    borderRadius: 12,
                    zIndex: 30
                  });
                  set(`${getCard(prevActive)} .card-overlay`, { opacity: 1 });
                  set(getCardContent(prevActive), {
                    x: offsetLeft + lastIdx * (cardWidth + gap),
                    y: offsetTop,
                    opacity: 1,
                    zIndex: 40
                  });
                }
                if (pendingRelayout) {
                  pendingRelayout = false;
                  relayout();
                }
              }
            });
            gsap.to(cActive, { scale: 1.04, duration: 6.0, ease: "none" });
          }

          set(detailsActive, { zIndex: 22 });
          gsap.to(container.querySelectorAll(detailsActive), { opacity: 1, delay: 0.35, ease, duration: 0.4 });
          animate(`${detailsActive} .text`, 0.6, { y: 0, delay: 0.1, ease });
          animate(`${detailsActive} .title-1`, 0.6, { y: 0, delay: 0.15, ease });
          animate(`${detailsActive} .title-2`, 0.6, { y: 0, delay: 0.15, ease });
          animate(`${detailsActive} .desc`, 0.4, { y: 0, delay: 0.25, ease }).then(() => resolve());

          order.forEach((itemIdx, idx) => {
            gsap.to(container.querySelectorAll(`.slide-item-${itemIdx}`), { x: idx * numberSize, ease, duration: 0.8 });
          });

          gsap.to(container.querySelectorAll(".progress-sub-foreground"), { width: 500 * (1 / order.length) * (active + 1), ease, duration: 0.8 });

          rest.forEach((i, index) => {
            if (i === prevActive && dir === 'next') return;
            set(getCard(i), { zIndex: 30 });
            set(`${getCard(i)} .card-overlay`, { opacity: 1 });
            gsap.to(container.querySelectorAll(getCard(i)), {
              x: offsetLeft + index * (cardWidth + gap),
              y: offsetTop,
              width: cardWidth,
              height: cardHeight,
              borderRadius: 12,
              ease,
              duration: 0.7,
              delay: 0.05 * (index + 1)
            });
            gsap.to(container.querySelectorAll(getCardContent(i)), {
              x: offsetLeft + index * (cardWidth + gap),
              y: offsetTop,
              opacity: 1,
              zIndex: 40,
              ease,
              duration: 0.7,
              delay: 0.05 * (index + 1)
            });
          });
        });
      }

      init();
      if (showSplash) {
        // Splash Screen duration: 3.8s calibrated for high-impact viewing
        gsap.to("#splash-top-badge, #splash-headline, #splash-subtext", {
          opacity: 0,
          y: -15,
          duration: 0.8,
          ease: "power2.inOut",
          delay: 3.2
        });

        gsap.to("#splash-text-content", {
          opacity: 0,
          y: -20,
          duration: 0.8,
          ease: "power2.inOut",
          delay: 3.3
        });

        gsap.to("#splash-glass-card", {
          opacity: 0,
          scale: 1.08,
          filter: "blur(10px)",
          duration: 1.2,
          ease: "power2.out",
          delay: 3.4
        });

        gsap.to(container.querySelectorAll(getCard(order[0])), { scale: 1.05, duration: 6.5, ease: "none", delay: 3.5 });

        gsap.to("#splash-screen", {
          opacity: 0,
          ease: "power2.inOut",
          duration: 1.2,
          delay: 3.6,
          onComplete: () => {
            setShowSplash(false);
            if (typeof window !== 'undefined') {
              sessionStorage.setItem('vermilion_splash_shown', 'true');
            }
            setTimeout(() => {
              if (!isCancelled) startLoop();
            }, 200);
          }
        });
      } else {
        gsap.to(container.querySelectorAll(getCard(order[0])), { scale: 1.05, duration: 6.5, ease: "none" });
        if (!isCancelled) startLoop();
      }

    });

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
    return <SplashScreen />;
  }

  const slidesData = DEFAULT_DATA;
  const initialData = slidesData[0];

  return (
    <>
      {showSplash && <SplashScreen />}

      <div ref={containerRef} className="relative w-full h-[100svh] lg:h-[94svh] min-h-[580px] sm:min-h-[620px] md:min-h-[650px] overflow-hidden bg-zinc-950 text-white font-sans select-none z-0">

        {/* Top Indicator */}
        <div className="indicator fixed top-0 left-0 right-0 h-[3px] bg-white z-[60]" />

        {/* Details Panels - UNRESTRICTED TOP LINE + CLEAN 2-LINE TYPOGRAPHY */}
        {[0, 1].map((isOdd) => {
          const id = isOdd ? 'details-odd' : 'details-even';
          return (
            <div key={id} id={id} className="absolute left-0 w-full px-4 md:px-0 md:w-auto md:left-[30px] lg:left-[60px] top-[195px] sm:top-[190px] md:top-[145px] lg:top-[160px] pt-4 sm:pt-6 md:pt-0 z-[22] flex flex-col items-center md:items-start text-center md:text-left">
              <div className="h-auto mb-2">
                <div className="text text-white font-medium tracking-widest uppercase text-base md:text-sm pt-4 relative flex flex-col items-center md:items-start drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                  <div className="absolute top-0 w-8 h-[2px] bg-white rounded-full" />
                  <span className="notranslate mt-2 md:mt-0">{getLocalizedText(initialData.place, locale)}</span>
                </div>
              </div>

              {/* Line 1 (title): calibrated proportional size, unclipped */}
              <div className="h-auto md:min-h-[46px] lg:min-h-[54px] mt-1 flex flex-col items-center md:items-start">
                <div className="title-1 font-oswald font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[54px] uppercase leading-[0.95] tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)] whitespace-normal md:whitespace-nowrap">
                  <span className="notranslate">{getLocalizedText(initialData.title, locale)}</span>
                </div>
              </div>

              {/* Line 2 (title2): calibrated proportional size */}
              <div className="h-auto md:min-h-[46px] lg:min-h-[54px] mt-1 flex flex-col items-center md:items-start">
                <div className="title-2 font-oswald font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[54px] uppercase leading-[0.95] tracking-tight text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)] whitespace-normal md:whitespace-nowrap">
                  <span className="notranslate">{getLocalizedText(initialData.title2, locale)}</span>
                </div>
              </div>

              <div className="h-auto mt-3 md:mt-4 flex flex-col items-center md:items-start w-full max-w-lg">
                <div className="desc flex flex-col items-center md:items-start w-full">
                  <p className="hero-desc-text text-sm sm:text-base text-white/95 leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] font-medium">
                    {getLocalizedText(initialData.description, locale)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        {/* Action Buttons */}
        <div className="flex absolute left-0 md:left-[30px] lg:left-[60px] w-full md:w-auto bottom-[300px] sm:bottom-[280px] md:bottom-10 z-30 items-center justify-center md:justify-start gap-3 sm:gap-4 flex-wrap px-4 md:px-0">
          <button
            className="px-6 sm:px-7 py-2.5 sm:py-3 bg-emerald-600 text-white font-bold uppercase tracking-widest text-xs md:text-sm rounded-full transition-all flex items-center gap-2 shadow-lg shadow-emerald-900/50 active:scale-95 cursor-pointer"
            onClick={() => {
              const el = document.getElementById('tours');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span>{getExploreLabel()}</span>
            <ArrowRight className="w-4 h-4 transition-transform" />
          </button>
          <button
            className="px-5 sm:px-6 py-2.5 sm:py-3 bg-white/10 text-white font-bold uppercase tracking-widest text-xs md:text-sm rounded-full transition-all flex items-center gap-2 border border-white/30 active:scale-95 cursor-pointer backdrop-blur-sm"
            onClick={() => {
              window.dispatchEvent(new CustomEvent('open-concierge-chat'));
            }}
          >
            <MessageCircle className="w-4 h-4" />
            <span>{getPlanLabel()}</span>
          </button>
        </div>

        {/* Thumbnail Cards */}
        {slidesData.map((slide: any, idx: number) => (
          <div key={`card-${idx}`}>
            <div
              className={`card card-${idx} absolute top-0 left-0 shadow-2xl overflow-hidden w-[180px] h-[260px]`}
            >
              <Image
                src={isMobile && slide.mobileImage ? slide.mobileImage : (slide.image || slide.imageUrl || '/images/tours/16-9/galapagos-tortuga-gigante-16-9.jpg')}
                alt={getLocalizedText(slide.place, locale) || 'Vermilion Routes'}
                fill
                priority={idx === 0}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 180px"
              />
              <div className="card-overlay absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none transition-opacity duration-300" />

              <div
                className="absolute inset-0 cursor-pointer z-10"
                onClick={() => (window as any).jumpToSlide?.(idx)}
              />
            </div>

            <div className={`card-content card-content-${idx} absolute left-0 top-0 text-white w-[180px] h-[260px] pointer-events-none`}>
              <div className="absolute bottom-4 left-4 right-4 text-left">
                <h4 className="text-xs font-oswald font-semibold tracking-wider uppercase leading-tight drop-shadow-md notranslate text-white">
                  {getLocalizedText(slide.title, locale)}
                </h4>
                {slide.title2 && (
                  <p className="text-sm font-oswald font-bold tracking-wide uppercase text-emerald-300 drop-shadow notranslate mt-0.5">
                    {getLocalizedText(slide.title2, locale)}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Pagination HUD */}
        <div id="pagination" className="absolute left-0 top-0 z-40 flex items-center pointer-events-auto">
          <div className="flex gap-3 mr-5">
            <div onClick={() => (window as any).triggerPrevSlide?.()} className="w-[38px] h-[38px] rounded-full border border-white/30 bg-black/20 backdrop-blur-sm flex items-center justify-center cursor-pointer transition-all active:scale-95">
              <ChevronLeft className="w-4 h-4 text-white" />
            </div>
            <div onClick={() => (window as any).triggerNextSlide?.()} className="w-[38px] h-[38px] rounded-full border border-white/30 bg-black/20 backdrop-blur-sm flex items-center justify-center cursor-pointer transition-all active:scale-95">
              <ChevronRight className="w-4 h-4 text-white" />
            </div>
          </div>

          <div className="w-[300px] md:w-[400px] lg:w-[500px] h-[42px] flex items-center">
            <div className="w-full h-[3px] bg-white/20 relative rounded-full overflow-hidden">
              <div className="progress-sub-foreground absolute top-0 left-0 h-full bg-white rounded-full" />
            </div>
          </div>

          <div className="absolute right-0 top-1/2 -translate-y-1/2 overflow-hidden h-[50px] w-12 hidden md:block">
            <div className="indicator absolute right-0 top-0 h-full bg-white/20" style={{ width: '100vw' }} />
            <div className="relative z-10 flex items-center justify-end h-full pr-2 text-xs font-mono font-bold text-white/80">
              01 / 10
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
