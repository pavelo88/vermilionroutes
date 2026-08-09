const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'components', 'home', 'HeroSlider.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

const replacement = `const DEFAULT_DATA = [
  {
    place: { en: 'Galapagos - Archipelago', es: 'Galápagos - Archipiélago', fr: 'Galapagos - Archipel', de: 'Galapagos - Archipel', it: 'Galapagos - Arcipelago', pt: 'Galápagos - Arquipélago', ja: 'ガラパゴス諸島', zh: '加拉帕戈斯群岛' },
    title: { en: 'SHARK', es: 'ENCUENTRO CON', fr: 'RENCONTRE', de: 'HAI', it: 'INCONTRO CON', pt: 'ENCONTRO COM', ja: 'サメと', zh: '鲨鱼' },
    title2: { en: 'ENCOUNTER', es: 'TIBURONES', fr: 'AVEC REQUINS', de: 'BEGEGNUNG', it: 'SQUALI', pt: 'TUBARÕES', ja: 'の遭遇', zh: '奇遇' },
    description: { en: 'Dive into the pristine waters of the Galapagos Marine Reserve.', es: 'Sumérgete en las aguas cristalinas de la Reserva Marina de Galápagos.', fr: 'Plongez dans les eaux cristallines de la réserve marine des Galapagos.', de: 'Tauchen Sie ein in die unberührten Gewässer des Galapagos-Meeresschutzgebietes.', it: 'Tuffati nelle acque incontaminate della Riserva Marina delle Galapagos.', pt: 'Mergulhe nas águas cristalinas da Reserva Marinha de Galápagos.', ja: 'ガラパゴス海洋保護区の透き通った海に飛び込みましょう。', zh: '潜入加拉帕戈斯海洋保护区清澈的海水中。' },
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=2752&q=80'
  },
  {
    place: { en: 'Pichincha - Quito', es: 'Pichincha - Quito', fr: 'Pichincha - Quito', de: 'Pichincha - Quito', it: 'Pichincha - Quito', pt: 'Pichincha - Quito', ja: 'ピチンチャ - キト', zh: '皮钦查 - 基多' },
    title: { en: 'HISTORIC', es: 'CENTRO', fr: 'CENTRE', de: 'HISTORISCHES', it: 'CENTRO', pt: 'CENTRO', ja: '歴史的', zh: '历史' },
    title2: { en: 'CENTER', es: 'HISTÓRICO', fr: 'HISTORIQUE', de: 'ZENTRUM', it: 'STORICO', pt: 'HISTÓRICO', ja: 'センター', zh: '中心' },
    description: { en: 'The first World Cultural Heritage site.', es: 'El primer sitio de Patrimonio Cultural de la Humanidad.', fr: 'Le premier site du patrimoine culturel mondial.', de: 'Die erste Weltkulturerbestätte.', it: 'Il primo sito del Patrimonio Culturale Mondiale.', pt: 'O primeiro local do Patrimônio Cultural Mundial.', ja: '初の世界文化遺産。', zh: '第一个世界文化遗产。' },
    image: 'https://media.istockphoto.com/id/692499466/photo/plaza-de-san-francisco-and-st-francis-church-quito-ecuador.jpg?s=1024x1024&w=is&k=20&c=IqO_UCVWPbOwteF3cY7fggiUZD2z391V3kufWNgEhkg='
  },
  {
    place: { en: 'Azuay - Cuenca', es: 'Azuay - Cuenca', fr: 'Azuay - Cuenca', de: 'Azuay - Cuenca', it: 'Azuay - Cuenca', pt: 'Azuay - Cuenca', ja: 'アスアイ - クエンカ', zh: '阿苏艾 - 昆卡' },
    title: { en: 'COLONIAL', es: 'ENCANTO', fr: 'CHARME', de: 'KOLONIALER', it: 'FASCINO', pt: 'ENCANTO', ja: '植民地時代の', zh: '殖民' },
    title2: { en: 'CHARM', es: 'COLONIAL', fr: 'COLONIAL', de: 'CHARME', it: 'COLONIALE', pt: 'COLONIAL', ja: '魅力', zh: '魅力' },
    description: { en: 'A deeply enchanting Andean city known for its stunning architecture.', es: 'Una ciudad andina profundamente encantadora conocida por su impresionante arquitectura.', fr: 'Une ville andine profondément enchanteresse connue pour son architecture.', de: 'Eine tief bezaubernde Andenstadt, bekannt für ihre atemberaubende Architektur.', it: 'Una città andina profondamente incantevole nota per la sua straordinaria architettura.', pt: 'Uma cidade andina profundamente encantadora, conhecida pela sua arquitetura impressionante.', ja: '素晴らしい建築物で知られる魅力的なアンデスの街。', zh: '一座以其令人惊叹的建筑而闻名的迷人安第斯城市。' },
    image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=2752&q=80'
  },
  {
    place: { en: 'Cotopaxi - Andes', es: 'Cotopaxi - Andes', fr: 'Cotopaxi - Andes', de: 'Cotopaxi - Anden', it: 'Cotopaxi - Ande', pt: 'Cotopaxi - Andes', ja: 'コトパクシ - アンデス', zh: '科托帕希 - 安第斯山脉' },
    title: { en: 'MAJESTIC', es: 'VOLCÁN', fr: 'VOLCAN', de: 'MAJESTÄTISCHER', it: 'VULCANO', pt: 'VULCÃO', ja: '雄大な', zh: '雄伟的' },
    title2: { en: 'VOLCANO', es: 'MAJESTUOSO', fr: 'MAJESTUEUX', de: 'VULKAN', it: 'MAESTOSO', pt: 'MAJESTOSO', ja: '火山', zh: '火山' },
    description: { en: 'The perfect snow-capped cone rising proudly over the Ecuadorian Andes.', es: 'El cono nevado perfecto que se alza orgulloso sobre los Andes ecuatorianos.', fr: 'Le cône enneigé parfait s\'élevant fièrement au-dessus des Andes équatoriennes.', de: 'Der perfekte schneebedeckte Kegel, der stolz über den ecuadorianischen Anden thront.', it: 'Il perfetto cono innevato che si erge orgoglioso sulle Ande ecuadoriane.', pt: 'O cone nevado perfeito que se ergue orgulhosamente sobre os Andes equatorianos.', ja: 'エクアドルのアンデスに誇らしげにそびえ立つ完璧な雪を頂いた円錐。', zh: '完美的白雪皑皑的圆锥体骄傲地耸立在厄瓜多尔安第斯山脉之上。' },
    image: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=2752&q=80'
  },
  {
    place: { en: 'Manabí - Pacific Coast', es: 'Manabí - Costa', fr: 'Manabí - Côte Pacifique', de: 'Manabí - Pazifikküste', it: 'Manabí - Costa Pacifica', pt: 'Manabí - Costa do Pacífico', ja: 'マナビ - 太平洋岸', zh: '马纳比 - 太平洋海岸' },
    title: { en: 'FRAILES', es: 'PLAYA', fr: 'PLAGE', de: 'FRAILES', it: 'SPIAGGIA', pt: 'PRAIA', ja: 'フライレス', zh: '弗赖莱斯' },
    title2: { en: 'BEACH', es: 'LOS FRAILES', fr: 'LOS FRAILES', de: 'STRAND', it: 'LOS FRAILES', pt: 'DOS FRAILES', ja: 'ビーチ', zh: '海滩' },
    description: { en: 'A hidden jewel of crystal-clear waters and white sands within the Machalilla National Park.', es: 'Una joya escondida de aguas cristalinas y arenas blancas en el Parque Nacional Machalilla.', fr: 'Un joyau caché aux eaux cristallines et sables blancs dans le parc national de Machalilla.', de: 'Ein verborgenes Juwel mit kristallklarem Wasser und weißem Sand im Machalilla-Nationalpark.', it: 'Un gioiello nascosto di acque cristalline e sabbie bianche nel Parco Nazionale Machalilla.', pt: 'Uma joia escondida de águas cristalinas e areias brancas no Parque Nacional Machalilla.', ja: 'マチャリラ国立公園内の透き通った海と白い砂浜の隠れた宝石。', zh: '马查利亚国家公园内清澈海水和白色沙滩的隐藏宝石。' },
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=2752&q=80'
  },
  {
    place: { en: 'Guayas - Guayaquil', es: 'Guayas - Guayaquil', fr: 'Guayas - Guayaquil', de: 'Guayas - Guayaquil', it: 'Guayas - Guayaquil', pt: 'Guayas - Guayaquil', ja: 'グアヤス - グアヤキル', zh: '瓜亚斯 - 瓜亚基尔' },
    title: { en: 'TROPICAL', es: 'PUERTO', fr: 'PORT', de: 'TROPISCHER', it: 'PORTO', pt: 'PORTO', ja: '熱帯の', zh: '热带' },
    title2: { en: 'PORT', es: 'TROPICAL', fr: 'TROPICAL', de: 'HAFEN', it: 'TROPICALE', pt: 'TROPICAL', ja: '港', zh: '港口' },
    description: { en: 'The economic heartbeat of Ecuador.', es: 'El latido económico del Ecuador.', fr: 'Le cœur économique de l\'Équateur.', de: 'Der wirtschaftliche Herzschlag Ecuadors.', it: 'Il cuore economico dell\'Ecuador.', pt: 'O coração econômico do Equador.', ja: 'エクアドルの経済の中心地。', zh: '厄瓜多尔的经济命脉。' },
    image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=2752&q=80'
  },
  {
    place: { en: 'Cusco - Peru', es: 'Cusco - Perú', fr: 'Cusco - Pérou', de: 'Cusco - Peru', it: 'Cusco - Perù', pt: 'Cusco - Peru', ja: 'クスコ - ペルー', zh: '库斯科 - 秘鲁' },
    title: { en: 'SACRED', es: 'VALLE', fr: 'VALLÉE', de: 'HEILIGES', it: 'VALLE', pt: 'VALE', ja: '神聖な', zh: '神圣' },
    title2: { en: 'VALLEY', es: 'SAGRADO', fr: 'SACRÉE', de: 'TAL', it: 'SACRA', pt: 'SAGRADO', ja: '谷', zh: '山谷' },
    description: { en: 'Journey into the heart of the Inca Empire.', es: 'Viaje al corazón del Imperio Inca.', fr: 'Voyage au cœur de l\'Empire Inca.', de: 'Reise in das Herz des Inka-Reiches.', it: 'Viaggio nel cuore dell\'Impero Inca.', pt: 'Viagem ao coração do Império Inca.', ja: 'インカ帝国の中心への旅。', zh: '深入印加帝国的中心。' },
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=2752&q=80'
  }
];`;

content = content.replace(/const DEFAULT_DATA = \[[\s\S]*?\];/, replacement);
fs.writeFileSync(filePath, content);
console.log('HeroSlider patched with translations!');
