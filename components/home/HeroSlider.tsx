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
    description: { en: 'The perfect snow-capped cone rising proudly over the Ecuadorian Andes.', es: 'El cono nevado perfecto que se alza orgulloso sobre los Andes ecuatorianos.', fr: 'Le cône enneigé parfait s'élevant fièrement au-dessus des Andes équatoriennes.', de: 'Der perfekte schneebedeckte Kegel, der stolz über den ecuadorianischen Anden thront.', it: 'Il perfetto cono innevato che si erge orgoglioso sulle Ande ecuadoriane.', pt: 'O cone nevado perfeito que se ergue orgulhosamente sobre os Andes equatorianos.', ja: 'エクアドルのアンデスに誇らしげにそびえ立つ完璧な雪を頂いた円錐。', zh: '完美的白雪皑皑的圆锥体骄傲地耸立在厄瓜多尔安第斯山脉之上。' },
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
    description: { en: 'The economic heartbeat of Ecuador.', es: 'El latido económico del Ecuador.', fr: 'Le cœur économique de l'Équateur.', de: 'Der wirtschaftliche Herzschlag Ecuadors.', it: 'Il cuore economico dell'Ecuador.', pt: 'O coração econômico do Equador.', ja: 'エクアドルの経済の中心地。', zh: '厄瓜多尔的经济命脉。' },
    image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=2752&q=80'
  },
  {
    place: { en: 'Cusco - Peru', es: 'Cusco - Perú', fr: 'Cusco - Pérou', de: 'Cusco - Peru', it: 'Cusco - Perù', pt: 'Cusco - Peru', ja: 'クスコ - ペルー', zh: '库斯科 - 秘鲁' },
    title: { en: 'SACRED', es: 'VALLE', fr: 'VALLÉE', de: 'HEILIGES', it: 'VALLE', pt: 'VALE', ja: '神聖な', zh: '神圣' },
    title2: { en: 'VALLEY', es: 'SAGRADO', fr: 'SACRÉE', de: 'TAL', it: 'SACRA', pt: 'SAGRADO', ja: '谷', zh: '山谷' },
    description: { en: 'Journey into the heart of the Inca Empire.', es: 'Viaje al corazón del Imperio Inca.', fr: 'Voyage au cœur de l'Empire Inca.', de: 'Reise in das Herz des Inka-Reiches.', it: 'Viaggio nel cuore dell'Impero Inca.', pt: 'Viagem ao coração do Império Inca.', ja: 'インカ帝国の中心への旅。', zh: '深入印加帝国的中心。' },
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=2752&q=80'
  }
];

export function HeroSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { settings, loading } = useSettings();
  const [isReady, setIsReady] = useState(false);
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

    // ✅ C-05 FIX: gsap importado desde npm (ya instalado) — sin CDN, sin riesgo de supply-chain XSS
    gsap.config({ nullTargetWarn: false });
    if (!containerRef.current) return;
    const container = containerRef.current;
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

      offsetTop = height - cardHeight - 180;
      offsetLeft = Math.max(width - 830, 650);

      const [active, ...rest] = order;
      set(getCard(active), { x: 0, y: 0, width: "100vw", height: "75vh", borderRadius: 0, scale: 1.05 });
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

    function init() {
      const height = container.clientHeight || window.innerHeight;
      const width = container.clientWidth || window.innerWidth;
      offsetTop = height - cardHeight - 180; // MOVED UP FURTHER
      offsetLeft = Math.max(width - 830, 650);

      const [active, ...rest] = order;
      const detailsActive = detailsEven ? "#details-even" : "#details-odd";
      const detailsInactive = detailsEven ? "#details-odd" : "#details-even";

      set("#pagination", { top: offsetTop + cardHeight + 5, left: offsetLeft, y: 200, opacity: 0, zIndex: 60 });
      set(getCard(active), { x: 0, y: 0, width: "100vw", height: "75vh", zIndex: 20 });
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
        animate(`${detailsActive} .desc`, 0.4, { y: 0, delay: 0.3, ease, onComplete: resolve });

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
    gsap.to(container.querySelectorAll(".cover"), { x: window.innerWidth + 400, delay: 0.5, ease, duration: 1, onComplete: () => {
      setTimeout(() => {
        if (!isCancelled) startLoop();
      }, 500);
    }});

    return () => {
      isCancelled = true;
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      if (loopTimeline) loopTimeline.kill();
      gsap.killTweensOf(container.querySelectorAll('.card, .card-content'));
      delete (window as any).triggerNextSlide;
      delete (window as any).jumpToSlide;
    };
  }, [isReady, settings?.hero?.slides?.length]);

  if (!isReady) {
    return (
      <div className="w-full h-[130svh] md:h-[100svh] min-h-[900px] md:min-h-[550px] bg-zinc-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  const slidesData = settings?.hero?.slides?.length ? settings.hero.slides : DEFAULT_DATA;
  const initialData = slidesData[0];

  return (
    <div ref={containerRef} className="relative w-full h-[100svh] min-h-[600px] md:min-h-[550px] overflow-hidden bg-zinc-950 text-white font-sans select-none z-0">
      
      {/* Indicator */}
      <div className="indicator fixed top-0 left-0 right-0 h-[3px] bg-white z-[60]" />

      {/* Details Panels */}
      {[0, 1].map((isOdd) => {
        const id = isOdd ? 'details-odd' : 'details-even';
        return (
          <div key={id} id={id} className="absolute left-[30px] lg:left-[60px] top-[50px] lg:top-[70px] z-[22]">
            <div className="h-[46px] overflow-hidden mb-2">
              <div className="text text-white/90 font-medium tracking-widest uppercase text-sm pt-4 relative">
                <div className="absolute top-0 left-0 w-8 h-[2px] bg-white rounded-full" />
                <span className="notranslate">{getLocalizedText(initialData.place, locale)}</span>
              </div>
            </div>
            
            <div className="h-[45px] sm:h-[60px] md:h-[80px] lg:h-[90px] overflow-hidden mt-1">
              <div className="title-1 font-oswald font-extrabold text-4xl sm:text-5xl md:text-7xl lg:text-[80px] uppercase leading-[0.9] tracking-tight drop-shadow-lg">
                <span className="notranslate">{getLocalizedText(initialData.title, locale)}</span>
              </div>
            </div>
            <div className="h-[45px] sm:h-[60px] md:h-[80px] lg:h-[90px] overflow-hidden">
              <div className="title-2 font-oswald font-extrabold text-4xl sm:text-5xl md:text-7xl lg:text-[80px] uppercase leading-[0.9] tracking-tight text-white drop-shadow-lg">
                <span className="notranslate">{getLocalizedText(initialData.title2, locale)}</span>
              </div>
            </div>
            
            <div className="h-auto md:h-[80px] lg:h-[120px] overflow-hidden mt-4 md:mt-6">
              <div className="desc text-xs sm:text-sm md:text-lg text-white/90 max-w-xl leading-relaxed drop-shadow-md line-clamp-4 md:line-clamp-none">
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
              priority={idx < 2}
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
          <div onClick={() => (window as any).triggerNextSlide?.()} className="w-[38px] h-[38px] rounded-full border border-white/30 flex items-center justify-center cursor-pointer hover:bg-white hover:text-black transition-colors group">
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

      {/* Cover Intro */}
      <div className="cover absolute top-0 left-0 w-[100vw] h-[130svh] md:h-[100svh] bg-zinc-950 z-[100]" />
    </div>
  );
}
