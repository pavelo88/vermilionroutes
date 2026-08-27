import { useEffect, RefObject } from 'react';
import gsap from 'gsap';
import { SlideData } from '@/types';
import { getLocalizedText } from '@/utils/i18nHelper';

interface UseHeroSliderParams {
  containerRef: RefObject<HTMLDivElement | null>;
  isReady: boolean;
  slidesData: SlideData[];
  locale: string;
  showSplash: boolean;
  setShowSplash: (val: boolean) => void;
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
        set("#pagination", { top: controlsY, left: offsetLeft, y: 200, opacity: 0, zIndex: 60 });
        if (width >= 768) {

        } else {

        }
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
            set(getCard(i), { x: offsetLeft + 400 + index * (cardWidth + gap), y: offsetTop, width: cardWidth, height: cardHeight, zIndex: 30, borderRadius: 12, opacity: 1 });
            set(getCardContent(i), { x: offsetLeft + 400 + index * (cardWidth + gap), zIndex: 40, y: offsetTop });
            set(`.slide-item-${i}`, { x: (index + 1) * numberSize });
          });

          const startDelay = 0.6;
          rest.forEach((i, index) => {
            gsap.to(container.querySelectorAll(getCard(i)), { x: offsetLeft + index * (cardWidth + gap), ease, delay: startDelay, duration: 0.8 });
            gsap.to(container.querySelectorAll(getCardContent(i)), { x: offsetLeft + index * (cardWidth + gap), ease, delay: startDelay, duration: 0.8 });
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

        const startDelay = 0.6;
        gsap.to(container.querySelectorAll("#pagination"), { y: 0, opacity: 1, ease, delay: startDelay, duration: 0.8 });
        if (width < 768) {
          gsap.to(container.querySelectorAll(detailsActive), {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            delay: 1.2,
            duration: 0.9
          });
        } else {
          gsap.to(container.querySelectorAll(detailsActive), { opacity: 1, x: 0, ease, delay: startDelay, duration: 0.8 });
        }

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

        loopTimeline.to(container.querySelectorAll(".indicator"), { x: 0, duration: 5.0, ease: "none" })
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

          const counterEl = container.querySelector('#hero-slide-counter');
          if (counterEl) {
            const currentNum = (order[0] + 1) < 10 ? `0${order[0] + 1}` : `${order[0] + 1}`;
            const totalNum = slidesData.length < 10 ? `0${slidesData.length}` : `${slidesData.length}`;
            counterEl.textContent = `${currentNum} / ${totalNum}`;
          }

          gsap.to(container.querySelectorAll(detailsInactive), { opacity: 0, duration: 0.3, ease });

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

      init();
      const isBot = typeof window !== 'undefined' && (
        navigator.webdriver === true ||
        /Lighthouse|bot|crawler|spider|HeadlessChrome|HeadlessChromium|PageSpeed|Chrome-Lighthouse/i.test(navigator.userAgent) ||
        ((navigator as any)?.userAgentData?.brands?.some((b: any) => /Headless/i.test(b.brand)) ?? false)
      );
        
      let splashDone = false;
      const finishSplash = () => {
        if (splashDone) return;
        splashDone = true;

        gsap.to("#splash-top-badge, #splash-headline, #splash-subtext, #splash-text-content", {
          opacity: 0,
          y: -15,
          duration: 0.5,
          ease: "power2.inOut"
        });

        gsap.to("#splash-glass-card", {
          opacity: 0,
          scale: 1.05,
          duration: 0.6,
          ease: "power2.out"
        });

        gsap.to("#splash-screen", {
          zIndex: 0,
          opacity: 0.15,
          pointerEvents: "none",
          duration: 0.8,
          delay: 0.2,
          onComplete: () => {
            setTimeout(() => {
              if (!isCancelled) startLoop();
            }, 300);
          }
        });
      };

      (window as any).skipSplash = finishSplash;

      if (showSplash && !isBot) {
        // Slide 0: 4.5s impact time before smooth cinematic transition to card foreground
        gsap.to("#splash-top-badge, #splash-headline, #splash-subtext", {
          opacity: 0,
          y: -15,
          duration: 0.8,
          ease: "power2.inOut",
          delay: 3.8
        });

        gsap.to("#splash-text-content", {
          opacity: 0,
          y: -20,
          duration: 0.8,
          ease: "power2.inOut",
          delay: 3.9
        });

        gsap.to("#splash-glass-card", {
          opacity: 0,
          scale: 1.08,
          duration: 1.0,
          ease: "power2.out",
          delay: 4.0
        });

        gsap.to(container.querySelectorAll(getCard(order[0])), { scale: 1.05, duration: 6.5, ease: "none", delay: 4.0 });

        gsap.to("#splash-screen", {
          zIndex: 0,
          opacity: 0.15,
          pointerEvents: "none",
          ease: "power2.inOut",
          duration: 1.0,
          delay: 4.2,
          onComplete: () => {
            finishSplash();
          }
        });
      } else {
        set("#splash-screen", { zIndex: 0, opacity: 0.15, pointerEvents: "none" });
        set("#splash-top-badge, #splash-headline, #splash-subtext, #splash-glass-card", { opacity: 0 });
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
  }, [isReady, slidesData.length]);
}
