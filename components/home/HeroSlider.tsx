'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSettings } from '@/hooks/useSettings';

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
    title: 'LOS FRAILES',
    title2: 'BEACH',
    description: 'A hidden jewel of crystal-clear waters and white sands within the Machalilla National Park. Surrounded by rugged cliffs and dry forests, it remains one of South America\'s most pristine coastal retreats.',
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=2752&q=80'
  },
  {
    place: 'Pichincha - Quito',
    title: 'HISTORIC',
    title2: 'CENTER',
    description: 'The first World Cultural Heritage site. Cobblestone streets, colonial monasteries, and baroque cathedrals perched at 2,800 meters under the monumental shadow of the high Andes.',
    image: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=2752&q=80'
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
    // If loading completes or a timeout of 1s passes, set ready
    if (!loading) {
      setIsReady(true);
    }
    const timer = setTimeout(() => setIsReady(true), 1500);
    return () => clearTimeout(timer);
  }, [loading]);

  useEffect(() => {
    if (!isReady) return;
    
    const slidesData = settings?.hero?.slides?.length ? settings.hero.slides : DEFAULT_DATA;
    let order = slidesData.map((_, i) => i);
    let detailsEven = true;
    let offsetTop = 200;
    let offsetLeft = 700;
    const cardWidth = 200;
    const cardHeight = 300;
    const gap = 40;
    const numberSize = 50;
    const ease = "sine.inOut";
    let clicks = 0;
    let transitioning = false;
    let pendingRelayout = false;
    let resizeTimer: any = null;
    let isCancelled = false;

    const loadGSAP = () => {
      return new Promise<any>((resolve) => {
        if ((window as any).gsap) {
          resolve((window as any).gsap);
          return;
        }
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
        script.onload = () => resolve((window as any).gsap);
        document.body.appendChild(script);
      });
    };

    const handleExploreClick = () => {
      const toursSection = document.getElementById('featured-tours');
      if (toursSection) {
        toursSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
      }
    };

    (window as any).handleExploreClick = handleExploreClick;

    loadGSAP().then((gsap) => {
      if (isCancelled || !containerRef.current) return;

      const container = containerRef.current;
      const set = (target: string, props: any) => {
        const els = container.querySelectorAll(target);
        gsap.set(els, props);
      };

      const getCard = (index: number) => `.card-${index}`;
      const getCardContent = (index: number) => `.card-content-${index}`;

      function loadImage(src: string) {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = src;
        });
      }

      function loadImages() {
        return Promise.all(slidesData.map(({ image }) => loadImage(image)));
      }

      function animate(target: string, duration: number, properties: any) {
        const els = container.querySelectorAll(target);
        return new Promise((resolve) => gsap.to(els, { ...properties, duration, onComplete: resolve }));
      }

      async function loop() {
        if (isCancelled) return;
        await animate(".indicator", 2, { x: 0 });
        if (isCancelled) return;
        const w = container.clientWidth || window.innerWidth;
        await animate(".indicator", 0.8, { x: w, delay: 0.3 });
        if (isCancelled) return;
        set(".indicator", { x: -w });
        await step();
        if (!isCancelled) loop();
      }

      function step() {
        return new Promise<void>((resolve) => {
          if (isCancelled) {
            resolve();
            return;
          }
          transitioning = true;
          order.push(order.shift() as number);
          detailsEven = !detailsEven;

          const detailsActive = detailsEven ? ".details-even" : ".details-odd";
          const detailsInactive = detailsEven ? ".details-odd" : ".details-even";

          const currentData = slidesData[order[0]];
          const detailsActiveEl = container.querySelector(detailsActive);
          if (detailsActiveEl) {
            const textEl = detailsActiveEl.querySelector('.text');
            const title1El = detailsActiveEl.querySelector('.title-1');
            const title2El = detailsActiveEl.querySelector('.title-2');
            const descEl = detailsActiveEl.querySelector('.desc');

            if (textEl) textEl.textContent = currentData.place;
            if (title1El) title1El.textContent = currentData.title;
            if (title2El) title2El.textContent = currentData.title2;
            if (descEl) descEl.textContent = currentData.description;
          }

          const [active, ...rest] = order;
          const prv = rest[rest.length - 1]; // The one that is zooming in

          // Proper z-index layering to prevent overlap bugs during transition
          set(getCard(prv), { zIndex: 10 });
          set(getCard(active), { zIndex: 20 });

          const activeCardEl = container.querySelector(getCard(prv));
          if (activeCardEl) gsap.to(activeCardEl, { scale: 1.5, ease, duration: 0.8 });
          
          const activeContentEl = container.querySelector(getCardContent(active));
          if (activeContentEl) gsap.to(activeContentEl, { y: offsetTop + cardHeight - 10, opacity: 0, duration: 0.3, ease });

          const cActive = container.querySelector(getCard(active));
          if (cActive) {
            gsap.to(cActive, {
              x: 0,
              y: 0,
              width: "100%",
              height: "100%",
              borderRadius: 0,
              ease,
              duration: 0.8,
              onComplete: () => {
                // Reset the previous fullscreen card to the back of the line
                const xNew = offsetLeft + (rest.length - 1) * (cardWidth + gap);
                set(getCard(prv), { x: xNew, y: offsetTop, width: cardWidth, height: cardHeight, zIndex: 30, borderRadius: 10, scale: 1 });
                set(getCardContent(prv), { x: xNew, y: offsetTop + cardHeight - 100, opacity: 1, zIndex: 40 });
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
          const daEl = container.querySelector(detailsActive);
          if (daEl) gsap.to(daEl, { opacity: 1, delay: 0.4, ease, duration: 0.4 });

          animate(`${detailsActive} .text`, 0.7, { y: 0, delay: 0.1, ease });
          animate(`${detailsActive} .title-1`, 0.7, { y: 0, delay: 0.15, ease });
          animate(`${detailsActive} .title-2`, 0.7, { y: 0, delay: 0.15, ease });
          animate(`${detailsActive} .desc`, 0.4, { y: 0, delay: 0.3, ease });
          animate(`${detailsActive} .cta`, 0.4, {
            y: 0,
            delay: 0.35,
            ease,
            onComplete: resolve
          });

          order.forEach((itemIdx, idx) => {
            const si = container.querySelector(`.slide-item-${itemIdx}`);
            if (si) gsap.to(si, { x: idx * numberSize, ease, duration: 0.6 });
          });

          const psf = container.querySelector(".progress-sub-foreground");
          if (psf) gsap.to(psf, { width: 500 * (1 / order.length) * (active + 1), ease, duration: 0.6 });

          rest.forEach((i, index) => {
            if (i === prv) return;
            set(getCard(i), { zIndex: 30 });
            const xTarget = offsetLeft + index * (cardWidth + gap);
            const ci = container.querySelector(getCard(i));
            if (ci) gsap.to(ci, { x: xTarget, y: offsetTop, width: cardWidth, height: cardHeight, ease, delay: 0.05 * (index + 1), duration: 0.6 });
            const cci = container.querySelector(getCardContent(i));
            if (cci) gsap.to(cci, { x: xTarget, y: offsetTop + cardHeight - 100, opacity: 1, zIndex: 40, ease, delay: 0.05 * (index + 1), duration: 0.6 });
          });
        });
      }

      function relayout() {
        if (transitioning) {
          pendingRelayout = true;
          return;
        }
        const h = container.clientHeight || window.innerHeight;
        const w = container.clientWidth || window.innerWidth;
        offsetTop = h - Math.min(430, h * 0.4);
        
        // Ensure cards do NOT overlap the text box. Text box is ~560px wide from left.
        if (w < 768) {
          offsetLeft = w - 100; // Push mostly offscreen on mobile
        } else {
          offsetLeft = Math.max(w * 0.55, 600); 
        }

        const [active, ...rest] = order;

        set(getCard(active), { x: 0, y: 0, width: "100%", height: "100%", borderRadius: 0, scale: 1 });
        set(getCardContent(active), { x: 0, y: 0 });

        rest.forEach((i, index) => {
          const x = offsetLeft + index * (cardWidth + gap);
          set(getCard(i), { x, y: offsetTop, width: cardWidth, height: cardHeight, borderRadius: 10 });
          set(getCardContent(i), { x, y: offsetTop + cardHeight - 100 });
        });

        set(".pagination", { top: offsetTop + Math.min(330, h * 0.3), left: offsetLeft });
        set(".cover-curtain", { x: w + 400 });
      }

      function onResize() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(relayout, 150);
      }

      function init() {
        const [active, ...rest] = order;
        const detailsActive = detailsEven ? ".details-even" : ".details-odd";
        const detailsInactive = detailsEven ? ".details-odd" : ".details-even";

        const height = container.clientHeight || window.innerHeight;
        const width = container.clientWidth || window.innerWidth;
        
        offsetTop = height - Math.min(430, height * 0.4);
        if (width < 768) {
          offsetLeft = width - 100;
        } else {
          offsetLeft = Math.max(width * 0.55, 600);
        }

        set(".pagination", { top: offsetTop + Math.min(330, height * 0.3), left: offsetLeft, y: 200, opacity: 0, zIndex: 60 });
        set(getCard(active), { x: 0, y: 0, width: "100%", height: "100%" });
        set(getCardContent(active), { x: 0, y: 0, opacity: 0 });
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
          set(getCard(i), {
            x: offsetLeft + 400 + index * (cardWidth + gap),
            y: offsetTop,
            width: cardWidth,
            height: cardHeight,
            zIndex: 30,
            borderRadius: 10
          });
          set(getCardContent(i), {
            x: offsetLeft + 400 + index * (cardWidth + gap),
            y: offsetTop + cardHeight - 100,
            zIndex: 40,
            opacity: 1
          });
          set(`.slide-item-${i}`, { x: (index + 1) * numberSize });
        });

        const startDelay = 0.6;
        rest.forEach((i, index) => {
          const ci = container.querySelector(getCard(i));
          if (ci) gsap.to(ci, { x: offsetLeft + index * (cardWidth + gap), ease, delay: startDelay, duration: 0.8 });
          const cci = container.querySelector(getCardContent(i));
          if (cci) gsap.to(cci, { x: offsetLeft + index * (cardWidth + gap), ease, delay: startDelay, duration: 0.8 });
        });

        const pag = container.querySelector(".pagination");
        if (pag) gsap.to(pag, { y: 0, opacity: 1, ease, delay: startDelay });
        const daEl = container.querySelector(detailsActive);
        if (daEl) gsap.to(daEl, { opacity: 1, x: 0, ease, delay: startDelay });

        animate(`${detailsActive} .text`, 0.7, { y: 0, delay: startDelay + 0.1, ease });
        animate(`${detailsActive} .title-1`, 0.7, { y: 0, delay: startDelay + 0.15, ease });
        animate(`${detailsActive} .title-2`, 0.7, { y: 0, delay: startDelay + 0.15, ease });
        animate(`${detailsActive} .desc`, 0.4, { y: 0, delay: startDelay + 0.3, ease });
        animate(`${detailsActive} .cta`, 0.4, { y: 0, delay: startDelay + 0.35, ease });

        const cover = container.querySelector(".cover-curtain");
        if (cover) {
          gsap.to(cover, {
            x: width + 400,
            delay: 0.5,
            ease,
            duration: 1,
            onComplete: () => {
              setTimeout(loop, 500);
            }
          });
        }
      }

      async function start() {
        try {
          await loadImages();
        } catch (err) {
          console.error("One or more images failed to load", err);
        } finally {
          if (!isCancelled) init();
        }
      }

      start();
      window.addEventListener("resize", onResize);
    });

    return () => {
      isCancelled = true;
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", () => {});
      if ((window as any).gsap) {
        (window as any).gsap.killTweensOf(".card");
      }
    };
  }, []);

  if (!isReady) {
    return <div className="w-full h-[100svh] bg-zinc-950 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
    </div>;
  }

  const slidesData = settings?.hero?.slides?.length ? settings.hero.slides : DEFAULT_DATA;

  return (
    <div ref={containerRef} className="relative w-full h-[100svh] overflow-hidden bg-zinc-950 text-[#FFFFFFDD] font-sans select-none z-0">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Oswald:wght@500&display=swap');

        .font-oswald {
          font-family: 'Oswald', sans-serif;
          font-weight: 600;
        }

        .card {
          position: absolute;
          left: 0;
          top: 0;
          background-position: center;
          background-size: cover;
          box-shadow: 6px 6px 10px 2px rgba(0, 0, 0, 0.6);
          will-change: transform, left, top, width, height;
        }

        .card-content {
          position: absolute;
          left: 0;
          top: 0;
          color: #FFFFFFDD;
          padding-left: 16px;
          pointer-events: none;
          will-change: transform, opacity;
        }

        .text-dash::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 30px;
          height: 4px;
          border-radius: 99px;
          background-color: white;
        }
      `}</style>

      {/* Indicator Bar */}
      <div className="indicator absolute left-0 right-0 top-0 h-[4px] z-[60] bg-emerald-500" />

      {/* Card Stack */}
      <div className="demo">
        {slidesData.map((item, index) => (
          <div key={`card-${index}`} className={`card card-${index}`} style={{ backgroundImage: `url(${item.image})` }} />
        ))}
        {slidesData.map((item, index) => (
          <div key={`card-content-${index}`} className={`card-content card-content-${index}`}>
            <div className="w-[30px] h-[5px] rounded-full bg-emerald-500" />
            <div className="mt-[6px] text-[13px] font-medium tracking-wide uppercase">{item.place}</div>
            <div className="font-oswald text-[18px] md:text-[24px] tracking-widest drop-shadow-md">{item.title}</div>
            <div className="font-oswald text-[18px] md:text-[24px] tracking-widest drop-shadow-md">{item.title2}</div>
          </div>
        ))}
      </div>

      {/* Details Panels */}
      {[0, 1].map((panelIdx) => (
        <div key={`panel-${panelIdx}`} className={`details-${panelIdx === 0 ? 'even' : 'odd'} absolute top-[15%] md:top-[240px] left-[5%] md:left-[60px] z-[22] w-[90%] md:w-[500px] opacity-0`}>
          <div className="place-box h-[46px] overflow-hidden relative">
            <div className="text text-dash pt-[16px] text-[16px] md:text-[20px] relative translate-y-[100px] text-emerald-400 font-bold tracking-wide uppercase drop-shadow-md">{slidesData[0].place}</div>
          </div>
          <div className="title-box-1 mt-[2px] h-[70px] md:h-[100px] overflow-hidden">
            <div className="title-1 font-oswald text-[55px] md:text-[85px] leading-none translate-y-[100px] text-white drop-shadow-lg">{slidesData[0].title}</div>
          </div>
          <div className="title-box-2 mt-[2px] h-[70px] md:h-[100px] overflow-hidden">
            <div className="title-2 font-oswald text-[55px] md:text-[85px] leading-none translate-y-[100px] text-white drop-shadow-lg">{slidesData[0].title2}</div>
          </div>
          <div className="desc mt-[16px] w-full md:w-[500px] text-[13px] md:text-[15px] leading-[1.6] text-zinc-200 translate-y-[50px] drop-shadow-md bg-black/20 p-4 rounded-xl backdrop-blur-sm border border-white/10">
            {slidesData[0].description}
          </div>
          <div className="cta w-full md:w-[500px] mt-[24px] flex items-center translate-y-[60px]">
            <button 
              onClick={() => (window as any).handleExploreClick?.()}
              className="w-[42px] h-[42px] border-none rounded-full bg-emerald-500 text-white grid place-items-center cursor-pointer hover:scale-105 transition-transform shadow-lg shadow-emerald-500/30"
            >
              <svg className="w-[20px] h-[20px]" viewBox="0 0 24 24" fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                <path d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" />
              </svg>
            </button>
            <button 
              onClick={() => (window as any).handleExploreClick?.()}
              className="border-2 border-white bg-white/10 backdrop-blur-md h-[42px] rounded-full text-white px-[24px] py-[4px] text-[13px] font-bold ml-[16px] uppercase cursor-pointer hover:bg-white hover:text-black transition-colors"
            >
              Explore Journeys
            </button>
          </div>
        </div>
      ))}

      {/* Pagination HUD */}
      <div className="pagination absolute inline-flex z-[60] hidden md:flex">
        <div className="progress-sub-container ml-[24px] w-[500px] h-[50px] flex items-center">
          <div className="progress-sub-background w-[500px] h-[3px] bg-white/20 relative overflow-hidden rounded-full">
            <div className="progress-sub-foreground absolute left-0 top-0 h-[3px] bg-emerald-500 w-0 rounded-full" />
          </div>
        </div>
        <div className="slide-numbers w-[50px] h-[50px] overflow-hidden relative ml-6">
          {slidesData.map((_, index) => (
            <div key={`slide-item-${index}`} className={`item absolute top-0 left-0 w-[50px] h-[50px] grid place-items-center text-white text-[32px] font-bold slide-item-${index}`}>
              {index + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Cover Curtain for Entrance Animation */}
      <div className="cover-curtain absolute left-0 top-0 w-full h-full bg-zinc-950 z-[100]" />
    </div>
  );
}
