'use client';

import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

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
  uniform vec3 u_color1;
  uniform vec3 u_color2;
  uniform vec3 u_color3;
  varying vec2 vUv;

  float orb(vec2 st, vec2 center, float radius) {
    return 1.0 - smoothstep(0.0, radius, distance(st, center));
  }

  void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;

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

    float distMouse = distance(st, u_mouse);
    float mouseWave = sin(distMouse * 11.0 - u_time * 2.0) * 0.5 + 0.5;
    float mouseGlow = (1.0 - smoothstep(0.0, 0.5, distMouse)) * 0.20;

    vec3 orbCol = u_color1 * a1 + u_color2 * a2 + u_color3 * a3;
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

  const uniforms = useRef({
    u_time: { value: 0 },
    u_mouse: { value: mouse.current },
    u_resolution: { value: new THREE.Vector2(size.width, size.height) },
    u_color1: { value: redVec },
    u_color2: { value: cyanVec },
  });

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_resolution.value.set(size.width, size.height);
    }
  }, [size]);

  useFrame((_, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value += delta * 0.7;
      materialRef.current.uniforms.u_mouse.value.lerp(mouse.current, 0.05);
    }
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={darkFragmentShader}
        uniforms={uniforms.current}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

function LightCanvas() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { size, viewport } = useThree();
  const mouse = useRef(new THREE.Vector2(0.5, 0.5));
  const color1 = new THREE.Vector3(0.86, 0.15, 0.15);
  const color2 = new THREE.Vector3(0.08, 0.65, 0.65);
  const color3 = new THREE.Vector3(0.95, 0.60, 0.10);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.set(e.clientX / window.innerWidth, 1.0 - e.clientY / window.innerHeight);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const uniforms = useRef({
    u_time: { value: 0 },
    u_mouse: { value: mouse.current },
    u_resolution: { value: new THREE.Vector2(size.width, size.height) },
    u_color1: { value: color1 },
    u_color2: { value: color2 },
    u_color3: { value: color3 },
  });

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_resolution.value.set(size.width, size.height);
    }
  }, [size]);

  useFrame((_, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value += delta * 0.6;
      materialRef.current.uniforms.u_mouse.value.lerp(mouse.current, 0.05);
    }
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={lightFragmentShader}
        uniforms={uniforms.current}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

export default function WebGLCanvas({ isDark }: { isDark: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.2]}
      gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
      style={{ pointerEvents: 'none' }}
    >
      {isDark ? <DarkCanvas /> : <LightCanvas />}
    </Canvas>
  );
}
