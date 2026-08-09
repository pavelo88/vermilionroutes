'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useSettings } from '@/hooks/useSettings';
import { Bookmark, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { StatsSection } from './StatsSection';

const DEFAULT_DATA = [
  {
    place: 'Galapagos - Archipelago',
    title: 'SHARK',
    title2: 'ENCOUNTER',
    description: 'Dive into the pristine waters of the Galapagos Marine Reserve. Swim alongside hammerhead sharks, playful sea lions, and marine iguanas in one of the planet\'s most protected and spectacular underwater realms.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=2752&q=80'
  },
  {
    place: 'Pichincha - Quito',
    title: 'HISTORIC',
    title2: 'CENTER',
    description: 'The first World Cultural Heritage site. Cobblestone streets, colonial monasteries, and baroque cathedrals perched at 2,800 meters under the monumental shadow of the high Andes.',
    image: 'https://media.istockphoto.com/id/692499466/photo/plaza-de-san-francisco-and-st-francis-church-quito-ecuador.jpg?s=1024x1024&w=is&k=20&c=IqO_UCVWPbOwteF3cY7fggiUZD2z391V3kufWNgEhkg='
  },
  {
    place: 'Azuay - Cuenca',
    title: 'COLONIAL',
    title2: 'CHARM',
    description: 'A deeply enchanting Andean city known for its stunning architecture, artisan traditions, and the picturesque Tomebamba river. Experience the soul of Ecuador in every cobblestone street.',
    image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=2752&q=80'
  },
  {
    place: 'Cotopaxi - Andes',
    title: 'MAJESTIC',
    title2: 'VOLCANO',
    description: 'The perfect snow-capped cone rising proudly over the Ecuadorian Andes. Walk among mystical paramo highlands, witness the condor\'s flight, and behold the grandeur of the Avenue of the Volcanoes.',
    image: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=2752&q=80'
  },
  {
    place: 'Manabí - Pacific Coast',
    title: 'FRAILES',
    title2: 'BEACH',
    description: 'A hidden jewel of crystal-clear waters and white sands within the Machalilla National Park. Surrounded by rugged cliffs and dry forests, it remains one of South America\'s most pristine coastal retreats.',
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=2752&q=80'
  },
  {
    place: 'Guayas - Guayaquil',
    title: 'TROPICAL',
    title2: 'PORT',
    description: 'The economic heartbeat of Ecuador. Stroll the vibrant Malecón 2000, explore the colorful hillside neighborhood of Las Peñas, and feel the warm, energetic spirit of the Pacific coast.',
    image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=2752&q=80'
  },
  {
    place: 'Cusco - Peru',
    title: 'SACRED',
    title2: 'VALLEY',
    description: 'Journey into the heart of the Inca Empire. Traverse terraced hillsides, discover ancient citadels hidden in the mist, and connect with the timeless heritage of the Andean people.',
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=2752&q=80'
  }
];

export function HeroSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { settings, loading } = useSettings();
  const [isReady, setIsReady] = useState(false);

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

      offsetTop = height - cardHeight - 60;
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
      offsetTop = height - cardHeight - 60;
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
          if (textEl) textEl.textContent = currentData.place;
          if (title1El) title1El.textContent = currentData.title;
          if (title2El) title2El.textContent = currentData.title2;
          if (descEl) descEl.textContent = currentData.description;
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
    <div ref={containerRef} className="relative w-full h-[130svh] md:h-[100svh] min-h-[900px] md:min-h-[550px] overflow-hidden bg-zinc-950 text-white font-sans select-none z-0">
      
      {/* Indicator */}
      <div className="indicator fixed top-0 left-0 right-0 h-[3px] bg-white z-[60]" />

      {/* Details Panels */}
      {[0, 1].map((isOdd) => {
        const id = isOdd ? 'details-odd' : 'details-even';
        return (
          <div key={id} id={id} className="absolute left-[30px] lg:left-[60px] top-[100px] lg:top-[140px] z-[22]">
            <div className="h-[46px] overflow-hidden mb-2">
              <div className="text text-white/90 font-medium tracking-widest uppercase text-sm pt-4 relative">
                <div className="absolute top-0 left-0 w-8 h-[2px] bg-white rounded-full" />
                <span className="notranslate">{initialData.place}</span>
              </div>
            </div>
            
            <div className="h-[45px] sm:h-[60px] md:h-[80px] lg:h-[90px] overflow-hidden mt-1">
              <div className="title-1 font-oswald font-extrabold text-4xl sm:text-5xl md:text-7xl lg:text-[80px] uppercase leading-[0.9] tracking-tight drop-shadow-lg">
                <span className="notranslate">{initialData.title}</span>
              </div>
            </div>
            <div className="h-[45px] sm:h-[60px] md:h-[80px] lg:h-[90px] overflow-hidden">
              <div className="title-2 font-oswald font-extrabold text-4xl sm:text-5xl md:text-7xl lg:text-[80px] uppercase leading-[0.9] tracking-tight text-white drop-shadow-lg">
                <span className="notranslate">{initialData.title2}</span>
              </div>
            </div>
            
            <div className="h-auto md:h-[80px] lg:h-[120px] overflow-hidden mt-4 md:mt-6">
              <div className="desc text-xs sm:text-sm md:text-lg text-white/90 max-w-xl leading-relaxed drop-shadow-md line-clamp-4 md:line-clamp-none">
                <span>{initialData.description}</span>
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
              <p className="text-[9px] uppercase font-bold text-white/80 tracking-widest mb-1 line-clamp-1 notranslate">{slide.place}</p>
              <h4 className="text-white font-oswald text-xl uppercase leading-none tracking-wide notranslate">{slide.title}</h4>
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
