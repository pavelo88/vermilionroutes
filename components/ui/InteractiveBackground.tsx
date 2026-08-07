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
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3 - 0.2; // float upwards slowly
    this.baseSize = Math.random() * 1.5 + 0.5; // tiny stardust size
    this.size = this.baseSize;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.phase = Math.random() * Math.PI * 2;
  }

  update(mouseX: number, mouseY: number) {
    this.x += this.vx;
    this.y += this.vy;
    this.phase += 0.02;

    // Stardust twinkling pulse (opacity variation, we use size for simplicity here, or just draw differently)
    this.size = this.baseSize + Math.sin(this.phase) * 0.5;
    if (this.size < 0.2) this.size = 0.2;

    // Gentle sway
    this.vy += Math.sin(this.phase * 0.5) * 0.005;
    this.vx += Math.cos(this.phase * 0.3) * 0.005;

    // Interactive mouse attraction/swirl
    if (mouseX !== 0 && mouseY !== 0) {
      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 150;

      if (dist < maxDist) {
        // Create a gentle swirl effect instead of strong gravity
        const force = (maxDist - dist) / maxDist;
        this.vx += (dx / dist) * force * 0.01 + (dy / dist) * force * 0.02;
        this.vy += (dy / dist) * force * 0.01 - (dx / dist) * force * 0.02;
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
    // Draw stardust as a tiny 4-pointed star/diamond shape
    ctx.save();
    ctx.translate(this.x, this.y);
    
    // Rotate slowly based on phase
    ctx.rotate(this.phase * 0.5);
    
    ctx.beginPath();
    const s = this.size * 1.5;
    ctx.moveTo(0, -s);
    ctx.quadraticCurveTo(0, 0, s, 0);
    ctx.quadraticCurveTo(0, 0, 0, s);
    ctx.quadraticCurveTo(0, 0, -s, 0);
    ctx.quadraticCurveTo(0, 0, 0, -s);
    
    // Twinkle opacity
    const alpha = (Math.sin(this.phase) + 1) / 2 * 0.6 + 0.2; // 0.2 to 0.8
    ctx.fillStyle = this.color.replace('rgb', 'rgba').replace(')', `, ${alpha})`);
    ctx.fill();
    
    // Inner bright core
    ctx.beginPath();
    ctx.arc(0, 0, this.size * 0.5, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    
    ctx.restore();
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
    
    // Dark mode: Stardust (Gold, Amber, Bright White)
    // Light mode: Champagne Gold, Soft Silver
    const colors = isDark 
      ? ['rgb(252, 211, 77)', 'rgb(251, 191, 36)', 'rgb(255, 255, 255)'] 
      : ['rgb(212, 175, 55)', 'rgb(253, 224, 71)', 'rgb(156, 163, 175)'];

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const particleCount = Math.floor((canvas.width * canvas.height) / 8000); // denser stardust
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
