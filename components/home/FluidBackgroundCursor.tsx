'use client';

import React, { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useTheme } from 'next-themes';

// Three.js Canvas is only loaded dynamically on desktop to keep mobile bundle lightweight
const WebGLCanvas = dynamic(() => import('./WebGLCanvas'), {
  ssr: false,
  loading: () => null,
});

export default function FluidBackgroundCursor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailCanvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const [loadWebGL, setLoadWebGL] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  useEffect(() => {
    const isTouch =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.innerWidth < 768;
    setIsTouchDevice(isTouch);
    setMounted(true);

    if (!isTouch) {
      if ('requestIdleCallback' in window) {
        const id = (window as any).requestIdleCallback(() => setLoadWebGL(true), { timeout: 2500 });
        return () => (window as any).cancelIdleCallback?.(id);
      } else {
        const timer = setTimeout(() => setLoadWebGL(true), 1500);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  // ── Fairy Dust Flight Trail ──
  useEffect(() => {
    if (!mounted || isTouchDevice) return;

    const trailCanvas = trailCanvasRef.current;
    if (!trailCanvas) return;

    const ctx = trailCanvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (trailCanvas.width = window.innerWidth);
    let height = (trailCanvas.height = window.innerHeight);

    const onResize = () => {
      width = trailCanvas.width = window.innerWidth;
      height = trailCanvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    interface TrailPoint {
      x: number;
      y: number;
      time: number;
    }
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      color: string;
      sparkle: number;
    }

    const trail: TrailPoint[] = [];
    const particles: Particle[] = [];
    const TRAIL_LIFETIME = 450;

    const colors = isDark
      ? ['#E4E4E7', '#D4D4D8', '#A1A1AA', '#71717A', '#FFFFFF']
      : ['#DC2626', '#EA580C', '#F59E0B', '#EF4444', '#FECDD3'];

    const onMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      trail.push({ x: e.clientX, y: e.clientY, time: now });

      for (let i = 0; i < 2; i++) {
        particles.push({
          x: e.clientX + (Math.random() - 0.5) * 8,
          y: e.clientY + (Math.random() - 0.5) * 8,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8 - 0.25,
          size: Math.random() * 2.2 + 0.8,
          alpha: 0.95,
          color: colors[Math.floor(Math.random() * colors.length)],
          sparkle: Math.random() * Math.PI,
        });
      }
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const now = performance.now();

      while (trail.length > 0 && now - trail[0].time > TRAIL_LIFETIME) {
        trail.shift();
      }

      if (trail.length >= 3) {
        for (let i = 0; i < trail.length - 1; i++) {
          const p0 = trail[i];
          const p1 = trail[i + 1];
          const pNext = trail[i + 2] || p1;

          const xc = (p1.x + pNext.x) / 2;
          const yc = (p1.y + pNext.y) / 2;

          const ageRatio = Math.max(0, 1 - (now - p1.time) / TRAIL_LIFETIME);

          ctx.beginPath();
          ctx.moveTo((p0.x + p1.x) / 2, (p0.y + p1.y) / 2);
          ctx.quadraticCurveTo(p1.x, p1.y, xc, yc);

          const alpha = ageRatio * (isDark ? 0.85 : 0.65);
          ctx.strokeStyle = isDark
            ? `rgba(212, 212, 216, ${alpha})`
            : `rgba(220, 38, 38, ${alpha})`;
          ctx.lineWidth = Math.max(0.3, ageRatio * 2.4);
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.stroke();
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.022;
        p.sparkle += 0.12;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        const pulse = 0.8 + Math.sin(p.sparkle) * 0.25;
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        if (isDark) {
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 6;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * pulse * p.alpha, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [mounted, isDark, isTouchDevice]);

  useGSAP(
    () => {
      if (!mounted || isTouchDevice || !cursorRef.current) return;

      const xTo = gsap.quickTo(cursorRef.current, 'x', {
        duration: 0.03,
        ease: 'power4.out',
      });
      const yTo = gsap.quickTo(cursorRef.current, 'y', {
        duration: 0.03,
        ease: 'power4.out',
      });

      const moveCursor = (e: MouseEvent) => {
        xTo(e.clientX);
        yTo(e.clientY);
      };
      window.addEventListener('mousemove', moveCursor, { passive: true });
      return () => window.removeEventListener('mousemove', moveCursor);
    },
    { scope: containerRef, dependencies: [mounted, isTouchDevice] }
  );

  if (!mounted || isTouchDevice) return null;

  return (
    <div ref={containerRef} className="pointer-events-none">
      {/* Fairy Dust Canvas */}
      <canvas
        ref={trailCanvasRef}
        className="fixed inset-0 z-[99] pointer-events-none"
      />

      {/* Tiny icon cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-4 h-4 z-[100] pointer-events-none -translate-x-1/2 -translate-y-1/2 drop-shadow-md select-none"
      >
        <img
          src="/cursor-icon.png"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-contain pointer-events-none"
          draggable={false}
        />
      </div>

      {/* WebGL Background — Lazy loaded on desktop idle */}
      {loadWebGL && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <WebGLCanvas isDark={isDark} />
        </div>
      )}
    </div>
  );
}
