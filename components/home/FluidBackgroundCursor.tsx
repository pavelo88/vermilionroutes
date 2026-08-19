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
  const redVec = new THREE.Vector3(0.83, 0.16, 0.15);   // brand-red
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
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  // Evitar bloqueo de hydration con ref en lugar de useState
  const canvasRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  useGSAP(() => {
    if (!cursorRef.current || !followerRef.current) return;

    const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.04, ease: "power4.out" });
    const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.04, ease: "power4.out" });
    const xFollow = gsap.quickTo(followerRef.current, "x", { duration: 0.45, ease: "expo.out" });
    const yFollow = gsap.quickTo(followerRef.current, "y", { duration: 0.45, ease: "expo.out" });

    const moveCursor = (e: MouseEvent) => {
      xTo(e.clientX); yTo(e.clientY);
      xFollow(e.clientX); yFollow(e.clientY);
    };
    window.addEventListener("mousemove", moveCursor, { passive: true });
    return () => window.removeEventListener("mousemove", moveCursor);
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="pointer-events-none">
      {/* Dot */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-[7px] h-[7px] rounded-full z-[100] pointer-events-none -translate-x-1/2 -translate-y-1/2 ${
          isDark ? 'bg-white' : 'bg-zinc-900'
        }`}
      />
      {/* Ring follower */}
      <div
        ref={followerRef}
        className={`fixed top-0 left-0 w-9 h-9 border rounded-full z-[99] pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-[border-color] duration-300 ${
          isDark ? 'border-white/60' : 'border-zinc-700/50'
        }`}
      />

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
