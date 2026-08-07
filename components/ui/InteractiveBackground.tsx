'use client';

import React, { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseSize: number;
  size: number;
  color: string;
  canvasWidth: number;
  canvasHeight: number;
  phase: number;

  constructor(width: number, height: number, colors: string[]) {
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5 - 0.5; // slight upward drift
    this.baseSize = Math.random() * 2.5 + 0.5;
    this.size = this.baseSize;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.phase = Math.random() * Math.PI * 2;
  }

  update(mouseX: number, mouseY: number) {
    this.x += this.vx;
    this.y += this.vy;
    this.phase += 0.02;

    // Slight shimmering pulse
    this.size = this.baseSize + Math.sin(this.phase) * 1.5;
    if (this.size < 0.5) this.size = 0.5;

    // Lava lamp flow
    this.vy += Math.sin(this.phase * 0.5) * 0.01;

    // Interactive mouse attraction
    if (mouseX !== 0 && mouseY !== 0) {
      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 200;

      if (dist < maxDist) {
        const force = (maxDist - dist) / maxDist;
        this.vx += (dx / dist) * force * 0.02;
        this.vy += (dy / dist) * force * 0.02;
      }
    }

    // Friction
    this.vx *= 0.99;
    this.vy *= 0.99;

    // Boundary wrapping
    if (this.x < -10) this.x = this.canvasWidth + 10;
    if (this.x > this.canvasWidth + 10) this.x = -10;
    if (this.y < -10) this.y = this.canvasHeight + 10;
    if (this.y > this.canvasHeight + 10) this.y = -10;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    
    // Add a glowing trail/halo effect
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
    ctx.fillStyle = this.color.replace(')', ', 0.2)').replace('rgb', 'rgba');
    ctx.fill();
  }
}

export function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let mouse = { x: 0, y: 0 };
    
    const isDark = resolvedTheme === 'dark';
    
    // Dark mode: Scarlet, Crimson, Vermilion
    // Light mode: Silver, Platinum, Lead
    const colors = isDark 
      ? ['rgb(239, 68, 68)', 'rgb(220, 38, 38)', 'rgb(255, 69, 0)'] 
      : ['rgb(156, 163, 175)', 'rgb(209, 213, 219)', 'rgb(107, 114, 128)'];

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const particleCount = Math.floor((canvas.width * canvas.height) / 12000); // Responsive density
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas.width, canvas.height, colors));
      }
    };

    const handleResize = () => {
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    
    const handleMouseLeave = () => {
      mouse.x = 0;
      mouse.y = 0;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    init();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle) => {
        particle.update(mouse.x, mouse.y);
        particle.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [resolvedTheme]); // Re-initialize when theme changes to swap colors

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[0] transition-opacity duration-1000"
      style={{ opacity: 0.8 }}
    />
  );
}
