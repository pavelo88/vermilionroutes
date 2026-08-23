"use client";

import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useTheme } from 'next-themes';

// ─── DARK MODE: Plasma reactivo al mouse ─────────────────────────────────────
const darkFragmentShader = `
  uniform float u_time;
  uniform vec2 u_mouse;
  uniform vec2 u_resolution;
  uniform vec3 u_color1;
  uniform vec3 u_color2;
  varying vec2 vUv;

  void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    float dist = distance(st, u_mouse);
    float wave = sin(dist * 12.0 - u_time * 2.0) * 0.5 + 0.5;
    vec3 mixColor = mix(u_color1, u_color2, st.x + wave * 0.5);
    float alpha = (1.0 - smoothstep(0.0, 0.55, dist)) * 0.18;
    gl_FragColor = vec4(mixColor, alpha);
  }
`;

// ─── LIGHT MODE: Orbs flotantes + Reactivo al mouse ──────────────────────────
const lightFragmentShader = `
  uniform float u_time;
  uniform vec2 u_mouse;
  uniform vec2 u_resolution;
  uniform vec3 u_color1; // brand-red
  uniform vec3 u_color2; // brand-cyan
  uniform vec3 u_color3; // warm amber
  varying vec2 vUv;

  float orb(vec2 st, vec2 center, float radius) {
    return 1.0 - smoothstep(0.0, radius, distance(st, center));
  }

  void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;

    // Tres orbs autónomos con trayectorias de Lissajous
    vec2 orb1 = vec2(
      0.5 + 0.3  * sin(u_time * 0.4),
      0.5 + 0.25 * cos(u_time * 0.3)
    );
    vec2 orb2 = vec2(
      0.5 + 0.28 * sin(u_time * 0.25 + 2.0),
      0.5 + 0.3  * cos(u_time * 0.35 + 1.0)
    );
    vec2 orb3 = vec2(
      0.5 + 0.22 * sin(u_time * 0.5 + 4.0),
      0.5 + 0.2  * cos(u_time * 0.2 + 3.0)
    );

    float a1 = orb(st, orb1, 0.45) * 0.20;
    float a2 = orb(st, orb2, 0.40) * 0.16;
    float a3 = orb(st, orb3, 0.35) * 0.12;

    // Glow reactivo al mouse (igual que dark mode pero más cálido)
    float distMouse = distance(st, u_mouse);
    float mouseWave = sin(distMouse * 11.0 - u_time * 2.0) * 0.5 + 0.5;
    float mouseGlow = (1.0 - smoothstep(0.0, 0.5, distMouse)) * 0.20;

    vec3 orbCol = u_color1 * a1 + u_color2 * a2 + u_color3 * a3;
    // Glow del mouse en modo claro: suave cyan/teal, no rojo
    vec3 mouseCol = mix(u_color2, u_color3, mouseWave * 0.5) * mouseGlow;

    vec3 col = orbCol + mouseCol;
    float alpha = min(a1 + a2 + a3 + mouseGlow, 0.30);

    gl_FragColor = vec4(col, alpha);
  }
`;

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

function DarkCanvas() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { size, viewport } = useThree();
  const mouse = useRef(new THREE.Vector2(0.5, 0.5));
  const redVec = new THREE.Vector3(0.83, 0.16, 0.15);
  const cyanVec = new THREE.Vector3(0.52, 0.82, 0.85);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.set(e.clientX / window.innerWidth, 1.0 - e.clientY / window.innerHeight);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame((state) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.u_time.value = state.clock.elapsedTime;
    // Lerp más rápido = respuesta casi inmediata
    materialRef.current.uniforms.u_mouse.value.lerp(mouse.current, 0.12);
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={darkFragmentShader}
        transparent
        uniforms={{
          u_time: { value: 0 },
          u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
          u_resolution: { value: new THREE.Vector2(size.width, size.height) },
          u_color1: { value: redVec },
          u_color2: { value: cyanVec },
        }}
      />
    </mesh>
  );
}

function LightCanvas() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { size, viewport } = useThree();
  const mouse = useRef(new THREE.Vector2(0.5, 0.5));
  const redVec = new THREE.Vector3(0.56, 0.06, 0.06);   // Tamarillo brand-red (#8F1010)
  const cyanVec = new THREE.Vector3(0.52, 0.82, 0.85);  // brand-cyan
  const amberVec = new THREE.Vector3(0.96, 0.65, 0.14); // warm amber

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.set(e.clientX / window.innerWidth, 1.0 - e.clientY / window.innerHeight);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame((state) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.u_time.value = state.clock.elapsedTime;
    materialRef.current.uniforms.u_mouse.value.lerp(mouse.current, 0.12);
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={lightFragmentShader}
        transparent
        uniforms={{
          u_time: { value: 0 },
          u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
          u_resolution: { value: new THREE.Vector2(size.width, size.height) },
          u_color1: { value: redVec },
          u_color2: { value: cyanVec },
          u_color3: { value: amberVec },
        }}
      />
    </mesh>
  );
}

export default function FluidBackgroundCursor() {
  const [mounted, setMounted] = React.useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailCanvasRef = useRef<HTMLCanvasElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const [isTouchDevice, setIsTouchDevice] = React.useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768);
    }
  }, []);

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

    // Trail point with timestamp
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
    const TRAIL_LIFETIME = 450; // Calibrated longer fairy flight trail (450ms)

    // Dark Mode: Elegant Silvery-Gray & Charcoal wings palette from the Vermilion bird icon (#71717A, #A1A1AA, #D4D4D8, #E4E4E7, #FFFFFF)
    // Light Mode: Vibrant Vermilion Red, Warm Amber & Coral (#DC2626, #EA580C, #F59E0B)
    const colors = isDark
      ? ['#E4E4E7', '#D4D4D8', '#A1A1AA', '#71717A', '#FFFFFF']
      : ['#DC2626', '#EA580C', '#F59E0B', '#EF4444', '#FECDD3'];

    const onMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      trail.push({ x: e.clientX, y: e.clientY, time: now });

      // Emit luminous fairy dust sparkles
      for (let i = 0; i < 2; i++) {
        particles.push({
          x: e.clientX + (Math.random() - 0.5) * 8,
          y: e.clientY + (Math.random() - 0.5) * 8,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8 - 0.25,
          size: Math.random() * 2.2 + 0.8,
          alpha: 0.95,
          color: colors[Math.floor(Math.random() * colors.length)],
          sparkle: Math.random() * Math.PI
        });
      }
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const now = performance.now();

      // Clean expired points
      while (trail.length > 0 && now - trail[0].time > TRAIL_LIFETIME) {
        trail.shift();
      }

      // 1. Draw perfectly rounded silky curve
      if (trail.length >= 3) {
        for (let i = 0; i < trail.length - 1; i++) {
          const p0 = trail[i];
          const p1 = trail[i + 1];
          const pNext = trail[i + 2] || p1;

          const xc = (p1.x + pNext.x) / 2;
          const yc = (p1.y + pNext.y) / 2;

          // Normalized age: 1 at most recent (bird), 0 at oldest (tail end)
          const ageRatio = Math.max(0, 1 - (now - p1.time) / TRAIL_LIFETIME);

          ctx.beginPath();
          ctx.moveTo((p0.x + p1.x) / 2, (p0.y + p1.y) / 2);
          ctx.quadraticCurveTo(p1.x, p1.y, xc, yc);

          const alpha = ageRatio * (isDark ? 0.85 : 0.65);
          ctx.strokeStyle = isDark
            ? `rgba(212, 212, 216, ${alpha})` // Pure icon wing silvery-gray in dark mode
            : `rgba(220, 38, 38, ${alpha})`;
          ctx.lineWidth = Math.max(0.3, ageRatio * 2.4);
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.stroke();
        }
      }

      // 2. Draw fairy dust sparkles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.022; // Slower fade for a longer floating fairy sparkle effect
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
  }, [mounted, isDark]);

  useGSAP(() => {
    if (!mounted || !cursorRef.current) return;

    const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.03, ease: "power4.out" });
    const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.03, ease: "power4.out" });

    const moveCursor = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };
    window.addEventListener("mousemove", moveCursor, { passive: true });
    return () => window.removeEventListener("mousemove", moveCursor);
  }, { scope: containerRef, dependencies: [mounted] });

  if (!mounted || isTouchDevice) return null;

  return (
    <div ref={containerRef} className="pointer-events-none">
      {/* Fairy Dust & Tapered Flight Trail Canvas */}
      <canvas
        ref={trailCanvasRef}
        className="fixed inset-0 z-[99] pointer-events-none"
      />

      {/* Tiny icon cursor without circle ring */}
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

      {/* WebGL Background — pointer-events-none tanto en el wrapper como en el canvas */}
      <div ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none">
        <Canvas
          dpr={[1, 1.2]}
          gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
          style={{ pointerEvents: 'none' }}
        >
          {isDark ? <DarkCanvas /> : <LightCanvas />}
        </Canvas>
      </div>
    </div>
  );
}
