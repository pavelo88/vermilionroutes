import { useEffect, RefObject } from 'react';
import gsap from 'gsap';
import { SlideData } from '@/types';
import { getLocalizedText } from '@/utils/i18nHelper';
import { getStandardTemplateHTML } from './HeroDetails';

interface UseHeroSliderParams {
  containerRef: RefObject<HTMLDivElement | null>;
  isReady: boolean;
  slidesData: SlideData[];
  locale: string;
  showSplash?: boolean;
  setShowSplash?: (val: boolean) => void;
}

export function useHeroSliderAnimation({
  containerRef,
  isReady,
  slidesData,
  locale,
  showSplash,
  setShowSplash
}: UseHeroSliderParams) {
  useEffect(() => {
    if (!isReady) return;

    let order = slidesData.map((_, i) => i);
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
      const set = (target: string | Element | NodeList | null, props: any) => {
        if (!target) return;
        if (typeof target === 'string') {
          gsap.set(container.querySelectorAll(target), props);
        } else {
          gsap.set(target, props);
        }
      };
      const getCard = (index: number) => `.card-${index}`;
      const getCardContent = (index: number) => `.card-content-${index}`;

      function relayout() {
        if (transitioning) {
          pendingRelayout = true;
          return;
        }
        const height = container.clientHeight || window.innerHeight;
        const width = container.clientWidth || window.innerWidth;

        offsetTop = height - cardHeight - 65;
        offsetLeft = Math.max(width - 830, 650);

        const [active, ...rest] = order;
        set(getCard(active), { x: 0, y: 0, width: "100vw", height: "100%", borderRadius: 0, scale: 1.05, opacity: 1 });
        set(getCardContent(active), { opacity: 0 });

        rest.forEach((i, index) => {
          const x = offsetLeft + index * (cardWidth + gap);
          set(getCard(i), { x, y: offsetTop, width: cardWidth, height: cardHeight, borderRadius: 12, opacity: 1 });
          set(getCardContent(i), { x, y: offsetTop, opacity: 1 });
        });

        const controlsY = offsetTop + cardHeight + 14;
        set("#pagination", { top: controlsY, left: offsetLeft });
        if (width >= 768) {

        }
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

        offsetTop = height - cardHeight - 65;
        offsetLeft = Math.max(width - 830, 650);

        const [active, ...rest] = order;
        const detailsActive = detailsEven ? "#details-even" : "#details-odd";
        const detailsInactive = detailsEven ? "#details-odd" : "#details-even";

        const controlsY = offsetTop + cardHeight + 14;
        set("#pagination", { top: controlsY, left: offsetLeft, y: 15, opacity: 0, zIndex: 60 });
        gsap.to(container.querySelectorAll("#pagination"), {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.65,
          ease: "power2.out"
        });

        if (width < 768) {
          order.forEach((i, index) => {
            set(getCard(i), {
              x: 0,
              y: 0,
              width: "100vw",
              height: "100%",
              opacity: index === 0 ? 1 : 0,
              zIndex: index === 0 ? 20 : 10,
              borderRadius: 0
            });
            set(getCardContent(i), { opacity: 0 });
          });
          set(detailsActive, { opacity: 1, zIndex: 22, x: 0, y: 0 });
        } else {
          set(getCard(active), { x: 0, y: 0, width: "100vw", height: "100%", zIndex: 20, opacity: 1 });
          set(getCardContent(active), { opacity: 0 });
          set(detailsActive, { opacity: 1, zIndex: 22, x: 0, y: 0 });

          rest.forEach((i, index) => {
            const cardX = offsetLeft + index * (cardWidth + gap);
            set(getCard(i), {
              x: cardX,
              y: offsetTop + 35,
              width: cardWidth,
              height: cardHeight,
              zIndex: 30,
              borderRadius: 12,
              opacity: 0,
              scale: 0.94
            });
            set(getCardContent(i), { x: cardX, zIndex: 40, y: offsetTop + 35, opacity: 0 });
            set(`.slide-item-${i}`, { x: (index + 1) * numberSize });

            gsap.to(container.querySelectorAll(getCard(i)), {
              opacity: 1,
              y: offsetTop,
              scale: 1,
              duration: 0.85,
              delay: 0.35 + index * 0.15,
              ease: "power3.out"
            });
          });
        }

        set(detailsInactive, { opacity: 0, zIndex: 12 });
        set(`${detailsInactive} .text`, { y: 100 });
        set(`${detailsInactive} .title-1`, { y: 100 });
        set(`${detailsInactive} .title-2`, { y: 100 });
        set(`${detailsInactive} .desc`, { y: 50 });
        set(`${detailsInactive} .cta`, { y: 60 });

        set(".progress-sub-foreground", { width: 500 * (1 / order.length) * (active + 1) });
        set(".indicator", { x: -width });

        window.addEventListener("resize", onResize);
      }

      function animate(target: string, duration: number, properties: any) {
        return new Promise((resolve) => gsap.to(container.querySelectorAll(target), { ...properties, duration, onComplete: resolve }));
      }

      let isFirstSlide = true;

      function startLoop() {
        if (isCancelled) return;
        if (loopTimeline) loopTimeline.kill();
        set(".indicator", { x: -window.innerWidth });

        const duration = isFirstSlide ? 7.5 : 5.5;
        isFirstSlide = false;

        loopTimeline = gsap.timeline({
          onComplete: () => {
            if (isCancelled) return;
            step().then(() => {
              if (!isCancelled) startLoop();
            });
          }
        });

        loopTimeline.to(container.querySelectorAll(".indicator"), { x: 0, duration, ease: "none" })
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

      const TORTUGAS_ORIGINAL = {
        image: '/images/tours/16-9/galapagos-tortuga-gigante-16-9.jpg',
        desktopImage: '/images/tours/16-9/galapagos-tortuga-gigante-16-9.jpg',
        mobileImage: '/images/tours/9-16/galapagos-tortuga-gigante-9-16.jpg'
      };

      let splashDone = false;

      function restoreSlideZero() {
        // 1. Sobreescribe slidesData[0] devolviéndole las rutas de las fotos de fondo originales de Tortugas
        if (slidesData[0]) {
          slidesData[0].isWelcome = false;
          slidesData[0].image = TORTUGAS_ORIGINAL.image;
          slidesData[0].desktopImage = TORTUGAS_ORIGINAL.desktopImage;
          slidesData[0].mobileImage = TORTUGAS_ORIGINAL.mobileImage;
        }

        // 2. Modifica el DOM (img.src y img.srcset) de la Tarjeta 0 para inyectar esas imágenes de Tortugas
        const card0 = container.querySelector('.card-0');
        if (card0) {
          const imgs = card0.querySelectorAll('img');
          imgs.forEach((img) => {
            const isMobileImg = img.classList.contains('md:hidden') || img.getAttribute('sizes') === '30vw';
            const newSrc = isMobileImg ? TORTUGAS_ORIGINAL.mobileImage : TORTUGAS_ORIGINAL.desktopImage;
            img.src = newSrc;
            img.srcset = '';
            img.removeAttribute('srcset');
          });
        }

        // 3. Reemplaza el innerHTML del contenedor de texto de la Tarjeta 0, borrando el HTML de Bienvenida y pegándole la estructura HTML del molde estándar de los textos.
        const detailsEvenEl = container.querySelector('#details-even');
        if (detailsEvenEl) {
          detailsEvenEl.innerHTML = getStandardTemplateHTML(slidesData[0], locale);
        }
      }

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

          const counterEl = container.querySelector('#hero-slide-counter');
          if (counterEl) {
            const currentNum = (order[0] + 1) < 10 ? `0${order[0] + 1}` : `${order[0] + 1}`;
            const totalNum = slidesData.length < 10 ? `0${slidesData.length}` : `${slidesData.length}`;
            counterEl.textContent = `${currentNum} / ${totalNum}`;
          }

          gsap.to(container.querySelectorAll(detailsInactive), {
            opacity: 0,
            duration: 0.3,
            ease,
            onComplete: () => {
              if (!splashDone) {
                splashDone = true;
                restoreSlideZero();
              }
            }
          });

          const [active, ...rest] = order;
          const isMobile = (container.clientWidth || window.innerWidth) < 768;

          if (isMobile) {
            set(getCard(active), { x: 0, y: 0, width: "100vw", height: "100%", borderRadius: 0, opacity: 0, zIndex: 20 });
            gsap.to(container.querySelectorAll(getCard(active)), {
              opacity: 1,
              duration: 0.85,
              ease: "power2.out",
              onComplete: () => {
                transitioning = false;
                set(getCard(prevActive), { opacity: 0, zIndex: 10 });
              }
            });

            set(detailsActive, { zIndex: 22, opacity: 0, x: 0, y: 25 });
            gsap.to(container.querySelectorAll(detailsActive), {
              opacity: 1,
              y: 0,
              delay: 0.4,
              ease: "power2.out",
              duration: 0.65
            });
            animate(`${detailsActive} .text`, 0.5, { y: 0, delay: 0.2, ease });
            animate(`${detailsActive} .title-1`, 0.5, { y: 0, delay: 0.25, ease });
            animate(`${detailsActive} .title-2`, 0.5, { y: 0, delay: 0.25, ease });
            animate(`${detailsActive} .desc`, 0.4, { y: 0, delay: 0.35, ease }).then(() => resolve());

            order.forEach((itemIdx, idx) => {
              gsap.to(container.querySelectorAll(`.slide-item-${itemIdx}`), { x: idx * numberSize, ease, duration: 0.8 });
            });
            gsap.to(container.querySelectorAll(".progress-sub-foreground"), { width: 500 * (1 / order.length) * (active + 1), ease, duration: 0.8 });
            return;
          }

          // Desktop GSAP Carousel Animation
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
              scale: 1,
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
              scale: 1,
              ease,
              duration: 0.8,
              delay: 0.05 * (index + 1)
            });
            const cContent = container.querySelector(getCardContent(i));
            if (cContent) {
              set(cContent, { zIndex: 40, opacity: 1 });
              gsap.to(cContent, {
                x: offsetLeft + index * (cardWidth + gap),
                y: offsetTop,
                opacity: 1,
                zIndex: 40,
                ease,
                duration: 0.8,
                delay: 0.05 * (index + 1)
              });
            }
          });
        });
      }

      const isBot = typeof window !== 'undefined' && (
        navigator.webdriver === true ||
        /Lighthouse|bot|crawler|spider|HeadlessChrome|HeadlessChromium|PageSpeed|Chrome-Lighthouse/i.test(navigator.userAgent) ||
        ((navigator as any)?.userAgentData?.brands?.some((b: any) => /Headless|Lighthouse/i.test(b.brand)) ?? false) ||
        (window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false)
      );

      init();
      if (!isBot) {
        startLoop();
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
  }, [isReady, slidesData.length]);
}
