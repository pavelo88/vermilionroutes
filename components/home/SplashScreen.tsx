import React from 'react';
import Image from 'next/image';

export function SplashScreen() {
  return (
    <div id="splash-screen" className="fixed inset-0 z-[1000] w-full h-[100svh] bg-zinc-950 overflow-hidden flex items-center justify-center pointer-events-auto">
      <Image
        id="splash-bg-image"
        src="/splash-4-worlds.png"
        alt="Vermilion Routes Welcome"
        fill
        priority
        className="object-cover scale-[1.02] transition-transform duration-[4000ms] ease-out"
      />
      {/* Deep cinematic gradient */}
      <div id="splash-bg-gradient" className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />
      
      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        {/* "ALL YOU NEED IS" CSS Text Layout */}
        <div id="splash-text-content" className="flex flex-col items-center justify-center mb-6">
          <div className="flex gap-4 md:gap-6 font-oswald font-black text-4xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight drop-shadow-2xl">
            {/* ALL */}
            <div className="flex">
              <span style={{ color: '#FDB913' }}>A</span>
              <span style={{ color: '#F58220' }}>L</span>
              <span style={{ color: '#F05A28' }}>L</span>
            </div>
            {/* YOU */}
            <div className="flex">
              <span style={{ color: '#EF4136' }}>Y</span>
              <span style={{ color: '#ED1C24' }}>O</span>
              <span style={{ color: '#E6007E' }}>U</span>
            </div>
            {/* NEED */}
            <div className="flex">
              <span style={{ color: '#D21B7E' }}>N</span>
              <span style={{ color: '#B12285' }}>E</span>
              <span style={{ color: '#9C27B0' }}>E</span>
              <span style={{ color: '#673AB7' }}>D</span>
            </div>
            {/* IS */}
            <div className="flex">
              <span style={{ color: '#3F51B5' }}>I</span>
              <span style={{ color: '#2196F3' }}>S</span>
            </div>
          </div>
        </div>

        {/* Logo WITH glassmorphism restored */}
        <div id="splash-glass-card" className="relative w-[300px] h-[120px] md:w-[450px] md:h-[160px] lg:w-[550px] lg:h-[200px] mb-8 bg-gradient-to-r from-transparent via-cyan-300/15 to-cyan-300/35 backdrop-blur-md rounded-full p-4 md:p-6 border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.4)] flex items-center justify-center transition-all">
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src="/logo_inicio.png"
              alt="Vermilion Routes"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </div>

        <div id="splash-subtext" className="flex items-center gap-3 md:gap-4 text-white/90 font-medium tracking-[0.2em] uppercase text-[10px] md:text-sm drop-shadow-md">
          <span>Galápagos</span>
          <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
          <span>Andes</span>
          <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
          <span>Amazon</span>
          <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
          <span>Pacific</span>
        </div>
      </div>
    </div>
  );
}
