'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Camera, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface TourGalleryProps {
  images: string[];
  title: string;
}

export function TourGallery({ images, title }: TourGalleryProps) {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  if (!images || images.length === 0) return null;

  const mainImage = images[0];
  const sideImages = images.slice(1, 4);

  const handlePrevLightbox = () => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((activeImageIndex - 1 + images.length) % images.length);
  };

  const handleNextLightbox = () => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((activeImageIndex + 1) % images.length);
  };

  return (
    <div className="space-y-4">
      {/* Bento Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 rounded-2xl overflow-hidden">
        {/* Main Big Photo (Left/Top) */}
        <div
          onClick={() => setActiveImageIndex(0)}
          className="relative h-72 md:h-[420px] md:col-span-2 group cursor-pointer overflow-hidden rounded-2xl bg-zinc-800"
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

          <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/50 backdrop-blur-md px-3.5 py-2 rounded-full text-white text-xs font-semibold border border-white/20">
            <Camera className="w-3.5 h-3.5 text-emerald-400" />
            <span>View Gallery ({images.length} photos)</span>
          </div>

          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 backdrop-blur-md p-2 rounded-full text-white border border-white/20">
            <Maximize2 className="w-4 h-4" />
          </div>
        </div>

        {/* Side Stacked Photos */}
        <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
          {sideImages.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setActiveImageIndex(idx + 1)}
              className="relative h-36 md:h-[134px] group cursor-pointer overflow-hidden rounded-2xl bg-zinc-800"
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

              <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 p-1.5 rounded-full text-white border border-white/20">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImageIndex !== null && (
        <div
          className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setActiveImageIndex(null)}
        >
          {/* Close Button */}
          <button
            onClick={(e) => { e.stopPropagation(); setActiveImageIndex(null); }}
            className="absolute top-5 right-5 z-[99999] text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full backdrop-blur-md cursor-pointer border border-white/20 transition-colors"
            aria-label="Close photo gallery"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous Arrow */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); handlePrevLightbox(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-[99999] w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white cursor-pointer border border-white/20 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Next Arrow */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); handleNextLightbox(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-[99999] w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white cursor-pointer border border-white/20 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Image */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl h-[80vh] rounded-2xl overflow-hidden"
          >
            <Image
              src={images[activeImageIndex]}
              alt={`${title} - Enlarged`}
              fill
              className="object-contain"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm font-medium border border-white/20">
            {activeImageIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  );
}
