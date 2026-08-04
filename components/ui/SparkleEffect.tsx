'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

export function SparkleEffect({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Generate 6 random sparkles
    const newSparkles: Sparkle[] = Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
      size: Math.random() * 14 + 10,
      delay: Math.random() * 1.2,
    }));
    setSparkles(newSparkles);
  }, []);

  return (
    <div 
      className={`relative overflow-hidden group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}

      {/* Cinematic Shimmer Sweep Line */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <motion.div
          initial={{ x: '-100%', y: '-100%' }}
          animate={isHovered ? { x: '200%', y: '200%' } : { x: '-100%', y: '-100%' }}
          transition={{ duration: 1.5, ease: 'easeInOut', repeat: Infinity, repeatDelay: 2 }}
          className="w-[200%] h-[30px] bg-gradient-to-r from-transparent via-amber-200/40 to-transparent rotate-45 blur-sm"
        />
      </div>

      {/* Sparkling Stars Overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {sparkles.map((sp) => (
          <motion.div
            key={sp.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.3, 0],
              rotate: [0, 90, 180],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: sp.delay,
              ease: 'easeInOut',
            }}
            style={{
              top: `${sp.y}%`,
              left: `${sp.x}%`,
              width: sp.size,
              height: sp.size,
            }}
            className="absolute flex items-center justify-center"
          >
            {/* 4-pointed Star SVG */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-full h-full text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.9)]"
            >
              <path
                d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"
                fill="currentColor"
              />
            </svg>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
