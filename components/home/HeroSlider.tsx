'use client';

import React, { useEffect, useRef } from 'react';

const DATA = [
  {
    place: 'Galápagos - Archipiélago',
    title: 'ISLAS',
    title2: 'GALÁPAGOS',
    description: 'Un santuario natural único en el planeta donde leones marinos, piqueros de patas azules y tortugas gigantes habitan en total armonía. Explora paisajes volcánicos prístinos y vive una experiencia inmersiva e inolvidable.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=2752&q=80'
  },
  {
    place: 'Cotopaxi - Andes',
    title: 'VOLCÁN',
    title2: 'COTOPAXI',
    description: 'El cono nevado perfecto levantándose soberbio sobre la cordillera de los Andes ecuatorianos. Camina entre páramos místicos, observa el vuelo del cóndor y contempla la imponencia de la Avenida de los Volcanes.',
    image: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=2752&q=80'
  },
  {
    place: 'Amazonía - Orellana',
    title: 'PARQUE',
    title2: 'YASUNÍ',
    description: 'El punto de mayor biodiversidad del planeta Tierra. Navega por ríos rodeados de selva virgen, avista guacamayos, delfines rosados y deléitate con la magia mística del Amazonas ecuatoriano.',
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=2752&q=80'
  },
  {
    place: 'Manabí - Costa del Pacífico',
    title: 'PLAYA LOS',
    title2: 'FRAILES',
    description: 'Una joya oculta de aguas cristalinas y arenas blancas dentro del Parque Nacional Machalilla. Rodeada de acantilados y bosques secos, es una de las playas más paradisíacas de Sudamérica.',
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=2752&q=80'
  },
  {
    place: 'Pichincha - Quito',
    title: 'CENTRO',
    title2: 'HISTÓRICO',
    description: 'El primer Patrimonio Cultural de la Humanidad. Calles de piedra, monasterios coloniales y catedrales barrocas encaramadas a 2.800 metros de altitud bajo la majestuosa sombra de los Andes.',
    image: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=2752&q=80'
  }
];

export function HeroSlider() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let order = [0, 1, 2, 3, 4];
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
      // Smooth scroll to the tours section
      const toursSection = document.getElementById('featured-tours');
      if (toursSection) {
        toursSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
      }
    };

    // Attach to window so GSAP buttons can use it
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
        return Promise.all(DATA.map(({ image }) => loadImage(image)));
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

          const currentData = DATA[order[0]];
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
          const prv = rest[rest.length - 1];

          set(getCard(prv), { zIndex: 10 });
          set(getCard(active), { zIndex: 20 });

          const activeCardEl = container.querySelector(getCard(prv));
          if (activeCardEl) gsap.to(activeCardEl, { scale: 1.5, ease });
          
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
              onComplete: () => {
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
          if (daEl) gsap.to(daEl, { opacity: 1, delay: 0.4, ease });

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
            if (si) gsap.to(si, { x: idx * numberSize, ease });
          });

          const psf = container.querySelector(".progress-sub-foreground");
          if (psf) gsap.to(psf, { width: 500 * (1 / order.length) * (active + 1), ease });

          rest.forEach((i, index) => {
            if (i === prv) return;
            set(getCard(i), { zIndex: 30 });
            const xTarget = offsetLeft + index * (cardWidth + gap);
            const ci = container.querySelector(getCard(i));
            if (ci) gsap.to(ci, { x: xTarget, y: offsetTop, width: cardWidth, height: cardHeight, ease, delay: 0.1 * (index + 1) });
            const cci = container.querySelector(getCardContent(i));
            if (cci) gsap.to(cci, { x: xTarget, y: offsetTop + cardHeight - 100, opacity: 1, zIndex: 40, ease, delay: 0.1 * (index + 1) });
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
        offsetTop = h - 430;
        offsetLeft = w - Math.min(w * 0.9, 830);

        const [active, ...rest] = order;

        set(getCard(active), { x: 0, y: 0, width: "100%", height: "100%", borderRadius: 0, scale: 1 });
        set(getCardContent(active), { x: 0, y: 0 });

        rest.forEach((i, index) => {
          const x = offsetLeft + index * (cardWidth + gap);
          set(getCard(i), { x, y: offsetTop, width: cardWidth, height: cardHeight, borderRadius: 10 });
          set(getCardContent(i), { x, y: offsetTop + cardHeight - 100 });
        });

        set(".pagination", { top: offsetTop + 330, left: offsetLeft });
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
        offsetTop = height - 430;
        offsetLeft = width - Math.min(width * 0.9, 830); // Responsive offset

        set(".pagination", { top: offsetTop + 330, left: offsetLeft, y: 200, opacity: 0, zIndex: 60 });
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
          if (ci) gsap.to(ci, { x: offsetLeft + index * (cardWidth + gap), ease, delay: startDelay });
          const cci = container.querySelector(getCardContent(i));
          if (cci) gsap.to(cci, { x: offsetLeft + index * (cardWidth + gap), ease, delay: startDelay });
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
            onComplete: () => {
              setTimeout(loop, 500);
            }
          });
        }
      }

      async function start() {
        try {
          await loadImages();
          if (!isCancelled) init();
        } catch (err) {
          console.error("One or more images failed to load", err);
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
        // We only want to kill tweens associated with this container if possible, 
        // but killing all is safer to prevent memory leaks in dev mode.
        (window as any).gsap.killTweensOf(".card");
      }
    };
  }, []);

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
        }

        .card-content {
          position: absolute;
          left: 0;
          top: 0;
          color: #FFFFFFDD;
          padding-left: 16px;
          pointer-events: none;
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
        {DATA.map((item, index) => (
          <div key={`card-${index}`} className={`card card-${index}`} style={{ backgroundImage: `url(${item.image})` }} />
        ))}
        {DATA.map((item, index) => (
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
        <div key={`panel-${panelIdx}`} className={`details-${panelIdx === 0 ? 'even' : 'odd'} absolute top-[20%] md:top-[240px] left-[5%] md:left-[60px] z-[22] w-[90%] md:w-[500px] opacity-0`}>
          <div className="place-box h-[46px] overflow-hidden relative">
            <div className="text text-dash pt-[16px] text-[16px] md:text-[20px] relative translate-y-[100px] text-emerald-400 font-bold tracking-wide uppercase drop-shadow-md">{DATA[0].place}</div>
          </div>
          <div className="title-box-1 mt-[2px] h-[80px] md:h-[100px] overflow-hidden">
            <div className="title-1 font-oswald text-[60px] md:text-[85px] leading-none translate-y-[100px] text-white drop-shadow-lg">{DATA[0].title}</div>
          </div>
          <div className="title-box-2 mt-[2px] h-[80px] md:h-[100px] overflow-hidden">
            <div className="title-2 font-oswald text-[60px] md:text-[85px] leading-none translate-y-[100px] text-white drop-shadow-lg">{DATA[0].title2}</div>
          </div>
          <div className="desc mt-[16px] w-full md:w-[500px] text-[13px] md:text-[15px] leading-[1.6] text-zinc-200 translate-y-[50px] drop-shadow-md bg-black/20 p-4 rounded-xl backdrop-blur-sm border border-white/10">
            {DATA[0].description}
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
              Explorar Rutas
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
          {DATA.map((_, index) => (
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
