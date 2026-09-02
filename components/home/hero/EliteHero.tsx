'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Compass } from 'lucide-react';
import gsap from 'gsap';

interface EliteHeroProps {
  locale?: string;
}

export function EliteHero({ locale = 'es' }: EliteHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isEs = locale === 'es';

  useEffect(() => {
    // ── 1. GSAP Typography & Element Reveals ──────────────────────────────────
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      tl.to('.elite-hero-line', {
        y: '0%',
        duration: 1.6,
        stagger: 0.12,
        ease: 'expo.out',
      }).to(
        '.elite-hero-fade',
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: 'power3.out',
        },
        '-=1.1'
      );
    }, heroRef);

    // ── 2. Lightweight Particle & Kinetic Grid Canvas ───────────────────────
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctxCanvas = canvas.getContext('2d');
    if (!ctxCanvas) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Particles setup
    const particleCount = Math.min(Math.floor(width / 20), 60);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.2,
    }));

    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    if (heroRef.current) observer.observe(heroRef.current);

    const render = () => {
      if (isVisible && ctxCanvas) {
        ctxCanvas.clearRect(0, 0, width, height);

        // Draw glowing gradient background
        const grad = ctxCanvas.createRadialGradient(
          width * 0.6,
          height * 0.4,
          50,
          width * 0.6,
          height * 0.4,
          width * 0.8
        );
        grad.addColorStop(0, 'rgba(0, 175, 225, 0.08)');
        grad.addColorStop(0.5, 'rgba(212, 175, 55, 0.04)');
        grad.addColorStop(1, 'rgba(17, 17, 18, 0)');
        ctxCanvas.fillStyle = grad;
        ctxCanvas.fillRect(0, 0, width, height);

        // Draw animated particles
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          ctxCanvas.beginPath();
          ctxCanvas.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctxCanvas.fillStyle = `rgba(0, 175, 225, ${p.alpha})`;
          ctxCanvas.shadowBlur = 10;
          ctxCanvas.shadowColor = '#00afe1';
          ctxCanvas.fill();
        }
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      ctx.revert();
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-[90vh] sm:min-h-screen bg-[#111112] text-[#EEEFEB] overflow-hidden grid grid-cols-12 gap-4 items-center px-[5vw] pt-24 sm:pt-28 -mt-24 sm:-mt-28 border-b border-[#EEEFEB]/10 select-none"
    >
      {/* Capa de Renderizado Off-Thread Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 mix-blend-screen opacity-90"
      />

      {/* Grid Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />

      {/* Contenedor Tipográfico en Tensión Asimétrica */}
      <div className="col-span-12 lg:col-start-2 lg:col-span-10 z-10 flex flex-col justify-center py-12">
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00afe1]/10 border border-[#00afe1]/30 text-[#00afe1] text-xs font-bold uppercase tracking-[0.25em] mb-6 w-max backdrop-blur-md opacity-0 elite-hero-fade">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isEs ? 'Site of the Year • Expediciones High-Ticket' : 'Site of the Year • High-Ticket Journeys'}</span>
        </div>

        <h1 className="text-[11vw] sm:text-[8vw] md:text-[6.5vw] lg:text-[5.5vw] leading-[0.88] font-serif font-light tracking-tighter uppercase will-change-transform drop-shadow-2xl">
          <span className="block overflow-hidden">
            <span className="block translate-y-[100%] elite-hero-line text-[#EEEFEB]">
              {isEs ? 'Expediciones' : 'Bespoke'}
            </span>
          </span>
          <span className="block overflow-hidden">
            <span className="block translate-y-[100%] elite-hero-line italic text-transparent bg-clip-text bg-gradient-to-r from-[#00afe1] via-[#60a5fa] to-[#D4AF37]">
              {isEs ? 'Sin Fricción.' : 'Unrivaled.'}
            </span>
          </span>
        </h1>

        <p className="mt-8 text-base sm:text-lg md:text-xl font-sans max-w-xl font-light tracking-wide text-zinc-300 leading-relaxed opacity-0 elite-hero-fade">
          {isEs
            ? 'Arquitectura de viajes de ultra lujo en Ecuador y Galápagos. Conectamos viajeros exigentes con experiencias privadas de impacto inolvidable.'
            : 'Ultra-luxury travel architecture in Ecuador & Galápagos. Connecting discerning travelers with private, unforgettable journeys.'}
        </p>

        {/* Action Buttons with Kinetic Bézier Fill */}
        <div className="mt-10 sm:mt-12 flex flex-wrap items-center gap-4 opacity-0 elite-hero-fade">
          <button
            onClick={() => {
              const el = document.getElementById('tours') || document.getElementById('destinations');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative px-8 py-4 font-sans text-xs sm:text-sm tracking-[0.2em] uppercase overflow-hidden rounded-2xl border border-[#EEEFEB]/30 hover:border-[#00afe1] transition-colors duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] cursor-pointer shadow-xl shadow-[#00afe1]/10 flex items-center gap-3"
          >
            <span className="relative z-10 group-hover:text-[#111112] transition-colors duration-500 font-extrabold flex items-center gap-2">
              <span>{isEs ? 'Explorar Expediciones' : 'Explore Journeys'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-[#00afe1] scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] z-0" />
          </button>

          <Link href={`/${locale}/presentation`}>
            <button className="group relative px-8 py-4 font-sans text-xs sm:text-sm tracking-[0.2em] uppercase overflow-hidden rounded-2xl border border-[#D4AF37]/40 hover:border-[#D4AF37] transition-colors duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] cursor-pointer text-[#F3E5AB] flex items-center gap-2 bg-black/40 backdrop-blur-md">
              <span className="relative z-10 group-hover:text-stone-950 transition-colors duration-500 font-bold flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#D4AF37]" />
                <span>{isEs ? 'Club de Embajadores' : 'Ambassador Club'}</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C5A059] scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] z-0" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
