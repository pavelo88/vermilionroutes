'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { HERO_SLIDES_DATA } from '@/components/home/hero/heroData';

export function ToursBackgroundSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES_DATA.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-zinc-950">
      {HERO_SLIDES_DATA.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            idx === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={slide.desktopImage || slide.image}
            alt="Background"
            fill
            className="object-cover"
            priority={idx === 0}
            quality={60}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-black/40 backdrop-brightness-90" />
    </div>
  );
}
