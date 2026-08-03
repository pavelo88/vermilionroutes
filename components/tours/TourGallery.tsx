'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Camera, Maximize2, X, Sparkles } from 'lucide-react';

interface TourGalleryProps {
  images: string[];
  title: string;
}

export function TourGallery({ images, title }: TourGalleryProps) {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  if (!images || images.length === 0) return null;

  const mainImage = images[0];
  const sideImages = images.slice(1, 4);

  return (
    <div className="space-y-4">
      {/* Bento Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 rounded-3xl overflow-hidden p-1.5 bg-zinc-100 border border-zinc-200/80 shadow-md">
        {/* Main Big Photo (Left/Top) */}
        <div
          onClick={() => setActiveImageIndex(0)}
          className="relative h-72 md:h-[420px] md:col-span-2 group cursor-pointer overflow-hidden rounded-2xl bg-zinc-900"
        >
          <Image
            src={mainImage}
            alt={`${title} - Main Gallery Photo`}
            fill
            sizes="(max-width: 768px) 100vw, 66vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            priority
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 group-hover:opacity-80 transition-opacity" />

          <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-2 rounded-full text-white text-xs font-semibold border border-white/20">
            <Camera className="w-3.5 h-3.5 text-emerald-400" />
            <span>View Full Photo Gallery ({images.length})</span>
          </div>
        </div>

        {/* Side Stacked Photos */}
        <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
          {sideImages.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setActiveImageIndex(idx + 1)}
              className="relative h-36 md:h-[128px] group cursor-pointer overflow-hidden rounded-2xl bg-zinc-900"
            >
              <Image
                src={img}
                alt={`${title} - Photo ${idx + 2}`}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />

              <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 p-1.5 rounded-full text-white border border-white/20">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImageIndex !== null && (
        <div
          onClick={() => setActiveImageIndex(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <button
            onClick={() => setActiveImageIndex(null)}
            className="absolute top-6 right-6 text-white/80 hover:text-white bg-white/10 p-2.5 rounded-full backdrop-blur-md cursor-pointer border border-white/20 transition-colors"
            aria-label="Close photo gallery"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl h-[75vh] rounded-3xl overflow-hidden shadow-2xl"
          >
            <Image
              src={images[activeImageIndex]}
              alt={`${title} - Enlarged`}
              fill
              className="object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      )}
    </div>
  );
}
