'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSettings } from '@/hooks/useSettings';
import { Bookmark, ChevronLeft, ChevronRight } from 'lucide-react';

const DEFAULT_DATA = [
  {
    place: 'Galapagos - Archipelago',
    title: 'ENCHANTED',
    title2: 'ISLANDS',
    description: 'A pristine natural sanctuary where sea lions, blue-footed boobies, and giant tortoises thrive in absolute harmony. Sail across volcanic landscapes and dive into an immersive, unforgettable experience.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=2752&q=80'
  },
  {
    place: 'Cotopaxi - Andes',
    title: 'MAJESTIC',
    title2: 'VOLCANO',
    description: 'The perfect snow-capped cone rising proudly over the Ecuadorian Andes. Walk among mystical paramo highlands, witness the condor\'s flight, and behold the grandeur of the Avenue of the Volcanoes.',
    image: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=2752&q=80'
  },
  {
    place: 'Amazon - Orellana',
    title: 'YASUNÍ',
    title2: 'RAINFOREST',
    description: 'The most biodiverse spot on Earth. Navigate winding rivers surrounded by untouched jungle, spot pink dolphins, and let the mystical magic of the deep Amazon captivate your senses.',
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=2752&q=80'
  },
  {
    place: 'Manabí - Pacific Coast',
    title: 'FRAILES',
    title2: 'BEACH',
    description: 'A hidden jewel of crystal-clear waters and white sands within the Machalilla National Park. Surrounded by rugged cliffs and dry forests, it remains one of South America\'s most pristine coastal retreats.',
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=2752&q=80'
  },
  {
    place: 'Pichincha - Quito',
    title: 'HISTORIC',
    title2: 'CENTER',
    description: 'The first World Cultural Heritage site. Cobblestone streets, colonial monasteries, and baroque cathedrals perched at 2,800 meters under the monumental shadow of the high Andes.',
    image: 'https://images.unsplash.com/photo-1616089308119-971c2ba244d2?auto=format&fit=crop&w=2752&q=80'
  },
  {
    place: 'Cusco - Peru',
    title: 'SACRED',
    title2: 'VALLEY',
    description: 'Journey into the heart of the Inca Empire. Traverse terraced hillsides, discover ancient citadels hidden in the mist, and connect with the timeless heritage of the Andean people.',
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=2752&q=80'
  },
  {
    place: 'Patagonia - Argentina',
    title: 'PERITO',
    title2: 'MORENO',
    description: 'A colossal river of blue ice advancing into Lake Argentino. Listen to the thunderous roar of calving ice blocks in one of the most breathtaking natural spectacles on the planet.',
    image: 'https://images.unsplash.com/photo-1549449179-8cb1f414e8c1?auto=format&fit=crop&w=2752&q=80'
  },
  {
    place: 'Potosí - Bolivia',
    title: 'UYUNI',
    title2: 'SALT FLATS',
    description: 'The world\'s largest salt flat, where the earth meets the sky in a mirror-like illusion. A surreal landscape of blinding white expanses, colorful lagoons, and dormant volcanoes.',
    image: 'https://images.unsplash.com/photo-1533083161350-9c2f6d0fba75?auto=format&fit=crop&w=2752&q=80'
  }
];

export function HeroSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { settings, loading } = useSettings();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!loading) setIsReady(true);
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

    const loadGSAP = () => {
      return new Promise<any>((resolve) => {
        if ((window as any).gsap) return resolve((window as any).gsap);
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
        script.onload = () => resolve((window as any).gsap);
        document.body.appendChild(script);
      });
    };
    
    loadGSAP().then((gsap) => {
      if (isCancelled || !containerRef.current) return;
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
        
        // Critical fix to prevent cards from overlaying text
        offsetTop = height - 380;
        offsetLeft = Math.max(width - 830, 650); 
        
        const [active, ...rest] = order;
        set(getCard(active), { x: 0, y: 0, width: "100vw", height: "100vh", borderRadius: 0, scale: 1 });
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
        offsetTop = height - 380;
        offsetLeft = Math.max(width - 830, 650);
        
        const [active, ...rest] = order;
        const detailsActive = detailsEven ? "#details-even" : "#details-odd";
        const detailsInactive = detailsEven ? "#details-odd" : "#details-even";

        set("#pagination", { top: offsetTop + cardHeight + 20, left: offsetLeft, y: 200, opacity: 0, zIndex: 60 });
        set(getCard(active), { x: 0, y: 0, width: "100vw", height: "100vh", zIndex: 20 });
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

      // Setup manual navigation hook
      (window as any).triggerNextSlide = () => {
        if (!transitioning) {
          gsap.killTweensOf(".indicator");
          set(".indicator", { x: -window.innerWidth });
          step().then(() => {
            if (!isCancelled) loop();
          });
        }
      };

      async function loop() {
        if (isCancelled) return;
        // User requested 4.5 seconds for the slide duration
        await animate(".indicator", 4.5, { x: 0 });
        if (isCancelled) return;
        await animate(".indicator", 0.8, { x: window.innerWidth, delay: 0.3 });
        if (isCancelled) return;
        set(".indicator", { x: -window.innerWidth });
        await step();
        if (!isCancelled) loop();
      }

      function step() {
        return new Promise<void>((resolve) => {
          if (isCancelled) { resolve(); return; }
          transitioning = true;
          order.push(order.shift() as number);
          detailsEven = !detailsEven;

          const detailsActive = detailsEven ? "#details-even" : "#details-odd";
          const detailsInactive = detailsEven ? "#details-odd" : "#details-even";

          // Use spans to prevent Google Translate hydration clashes
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
              height: "100vh",
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
                set(`${detailsInactive} .cta`, { y: 60 });

                transitioning = false;
                if (pendingRelayout) {
                  pendingRelayout = false;
                  relayout();
                }
                clicks -= 1;
                if (clicks > 0) step();
              }
            });
          }

          set(detailsActive, { zIndex: 22 });
          gsap.to(container.querySelectorAll(detailsActive), { opacity: 1, delay: 0.4, ease, duration: 0.4 });
          animate(`${detailsActive} .text`, 0.7, { y: 0, delay: 0.1, ease });
          animate(`${detailsActive} .title-1`, 0.7, { y: 0, delay: 0.15, ease });
          animate(`${detailsActive} .title-2`, 0.7, { y: 0, delay: 0.15, ease });
          animate(`${detailsActive} .desc`, 0.4, { y: 0, delay: 0.3, ease });
          animate(`${detailsActive} .cta`, 0.4, { y: 0, delay: 0.35, ease, onComplete: resolve });

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
        setTimeout(() => loop(), 500);
      }});

      return () => {
        window.removeEventListener("resize", onResize);
      };
    });

    return () => {
      isCancelled = true;
      clearTimeout(resizeTimer);
      if ((window as any).gsap) {
        (window as any).gsap.killTweensOf(".card");
        (window as any).gsap.killTweensOf(".card-content");
      }
    };
  }, [isReady, settings?.hero?.slides?.length]);

  if (!isReady) {
    return (
      <div className="w-full h-[85svh] min-h-[600px] bg-zinc-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  const slidesData = settings?.hero?.slides?.length ? settings.hero.slides : DEFAULT_DATA;
  const initialData = slidesData[0];

  return (
    <div ref={containerRef} className="relative w-full h-[85svh] min-h-[600px] overflow-hidden bg-zinc-950 text-white font-sans select-none z-0">
      
      {/* Indicator */}
      <div className="indicator fixed top-0 left-0 right-0 h-[3px] bg-white z-[60]" />

      {/* Details Panels */}
      {[0, 1].map((isOdd) => {
        const id = isOdd ? 'details-odd' : 'details-even';
        return (
          <div key={id} id={id} className="absolute left-[30px] lg:left-[60px] top-[180px] lg:top-[220px] z-[22]">
            <div className="h-[46px] overflow-hidden mb-2">
              <div className="text text-white/90 font-medium tracking-widest uppercase text-sm pt-4 relative">
                <div className="absolute top-0 left-0 w-8 h-[2px] bg-white rounded-full" />
                <span>{initialData.place}</span>
              </div>
            </div>
            
            <div className="h-[60px] md:h-[80px] lg:h-[90px] overflow-hidden mt-1">
              <div className="title-1 font-oswald font-extrabold text-5xl md:text-7xl lg:text-[80px] uppercase leading-[0.9] tracking-tight drop-shadow-lg">
                <span>{initialData.title}</span>
              </div>
            </div>
            <div className="h-[60px] md:h-[80px] lg:h-[90px] overflow-hidden">
              <div className="title-2 font-oswald font-extrabold text-5xl md:text-7xl lg:text-[80px] uppercase leading-[0.9] tracking-tight text-white drop-shadow-lg">
                <span>{initialData.title2}</span>
              </div>
            </div>
            
            <div className="mt-6 w-[90vw] max-w-[500px]">
              <div className="desc text-white/90 text-sm md:text-lg leading-relaxed drop-shadow-md">
                <span>{initialData.description}</span>
              </div>
            </div>
            
            <div className="cta w-[90vw] max-w-[500px] mt-8 flex items-center">
              <button className="w-[42px] h-[42px] border border-white/50 rounded-full text-white grid place-items-center hover:bg-white hover:text-black transition-colors">
                <Bookmark className="w-5 h-5" />
              </button>
              <button 
                onClick={() => document.getElementById('featured-tours')?.scrollIntoView({ behavior: 'smooth' })}
                className="h-[42px] rounded-full border border-white bg-transparent text-white px-[24px] py-[4px] text-[12px] font-bold ml-[16px] uppercase hover:bg-white hover:text-black transition-colors tracking-widest"
              >
                EXPLORE DESTINATIONS
              </button>
            </div>
          </div>
        );
      })}

      {/* Cards */}
      {slidesData.map((slide: any, idx: number) => (
        <div key={`card-${idx}`}>
          <div 
            className={`card card-${idx} absolute top-0 left-0 bg-cover bg-center shadow-2xl`} 
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </div>
          
          <div className={`card-content card-content-${idx} absolute left-0 top-0 text-white w-[180px] h-[260px] pointer-events-none`}>
            <div className="absolute bottom-5 left-5 right-5 text-left">
              <div className="w-4 h-[2px] bg-white mb-2" />
              <p className="text-[9px] uppercase font-bold text-white/80 tracking-widest mb-1 line-clamp-1">{slide.place}</p>
              <h4 className="text-white font-oswald text-xl uppercase leading-none tracking-wide">{slide.title}</h4>
            </div>
          </div>
        </div>
      ))}

      {/* Pagination HUD */}
      <div id="pagination" className="absolute left-0 top-0 flex items-center">
        {/* Navigation Arrows */}
        <div className="hidden md:flex gap-4 mr-6">
          <div onClick={() => (window as any).triggerNextSlide?.()} className="w-[42px] h-[42px] rounded-full border border-white/30 flex items-center justify-center cursor-pointer hover:bg-white hover:text-black transition-colors group">
            <ChevronLeft className="w-5 h-5 text-white/60 group-hover:text-black" />
          </div>
          <div onClick={() => (window as any).triggerNextSlide?.()} className="w-[42px] h-[42px] rounded-full border border-white/30 flex items-center justify-center cursor-pointer hover:bg-white hover:text-black transition-colors group">
            <ChevronRight className="w-5 h-5 text-white/60 group-hover:text-black" />
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-[300px] md:w-[400px] lg:w-[500px] h-[42px] flex items-center">
          <div className="w-full h-[3px] bg-white/20 relative rounded-full overflow-hidden">
            <div className="progress-sub-foreground absolute top-0 left-0 h-full bg-white rounded-full" />
          </div>
        </div>

        {/* Slide Numbers */}
        <div className="w-[50px] h-[50px] overflow-hidden relative ml-4 md:ml-6">
          {slidesData.map((_: any, index: number) => (
            <div key={`num-${index}`} className={`slide-item-${index} absolute top-0 left-0 w-[50px] h-[50px] grid place-items-center text-white font-oswald text-xl md:text-2xl font-bold tracking-widest`}>
              0{index + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Cover Intro */}
      <div className="cover absolute top-0 left-0 w-[100vw] h-[100vh] bg-zinc-950 z-[100]" />
    </div>
  );
}
