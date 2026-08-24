'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Camera, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface TourGalleryProps {
  images: string[];
  title: string;
}

export function TourGallery({ images, title }: TourGalleryProps) {
  // De-duplicate any accidental duplicate URLs in images array
  const uniqueImages = React.useMemo(() => {
    const set = new Set<string>();
    return (images || []).filter((img) => {
      if (!img || set.has(img)) return false;
      set.add(img);
      return true;
    });
  }, [images]);

  const [selectedMainIndex, setSelectedMainIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  if (!uniqueImages || uniqueImages.length === 0) return null;

  // Main photo
  const mainImage = uniqueImages[selectedMainIndex] || uniqueImages[0];

  // Desktop side images (take up to 3 distinct photos different from main)
  const remainingImages = uniqueImages.filter((_, idx) => idx !== selectedMainIndex);
  const sideImages = remainingImages.slice(0, 3);
  // Mobile side images (take up to 4 distinct photos)
  const mobileSideImages = remainingImages.slice(0, 4);

  const handlePrevLightbox = () => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((activeImageIndex - 1 + uniqueImages.length) % uniqueImages.length);
  };

  const handleNextLightbox = () => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((activeImageIndex + 1) % uniqueImages.length);
  };

  return (
    <div className="space-y-2">
      {/* Bento Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 rounded-2xl overflow-hidden">
        {/* Main Big Photo (Left/Top) */}
        <div
          onClick={() => setActiveImageIndex(selectedMainIndex)}
          className="relative h-72 md:h-[420px] md:col-span-2 group cursor-pointer overflow-hidden rounded-2xl bg-zinc-900 shadow-md"
        >
          <Image
            key={`main-${mainImage}`}
            src={mainImage}
            alt={`${title} - Main Gallery Photo`}
            fill
            sizes="(max-width: 768px) 100vw, 66vw"
            className="object-cover group-hover:scale-105 transition-all duration-700 ease-out"
            priority
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 group-hover:opacity-80 transition-opacity" />

          <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-2 rounded-full text-white text-xs font-semibold border border-white/20 shadow-lg">
            <Camera className="w-3.5 h-3.5 text-emerald-400" />
            <span>View Gallery ({uniqueImages.length} photos)</span>
          </div>

          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-md p-2 rounded-full text-white border border-white/20">
            <Maximize2 className="w-4 h-4" />
          </div>
        </div>

        {/* Desktop Side Stacked Photos (3 images) */}
        <div className="hidden md:grid grid-cols-1 gap-2">
          {sideImages.map((img, idx) => {
            const originalIndex = uniqueImages.indexOf(img);
            return (
              <div
                key={`side-desktop-${idx}-${img}`}
                onClick={() => {
                  if (originalIndex !== -1) setSelectedMainIndex(originalIndex);
                }}
                className="relative h-[134px] group cursor-pointer overflow-hidden rounded-2xl bg-zinc-900 shadow-sm border border-zinc-200/20"
              >
                <Image
                  src={img}
                  alt={`${title} - Photo ${idx + 2}`}
                  fill
                  sizes="33vw"
                  className="object-cover group-hover:scale-110 transition-all duration-500 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />

                <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 p-1.5 rounded-full text-white border border-white/20">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile 2x2 Grid (4 small photos below main) */}
      <div className="grid md:hidden grid-cols-2 gap-2">
        {mobileSideImages.map((img, idx) => {
          const originalIndex = uniqueImages.indexOf(img);
          return (
            <div
              key={`side-mobile-${idx}-${img}`}
              onClick={() => {
                if (originalIndex !== -1) setSelectedMainIndex(originalIndex);
              }}
              className="relative h-32 group cursor-pointer overflow-hidden rounded-2xl bg-zinc-900 shadow-sm border border-zinc-200/20"
            >
              <Image
                src={img}
                alt={`${title} - Photo ${idx + 2}`}
                fill
                sizes="50vw"
                className="object-cover group-hover:scale-110 transition-all duration-500 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
            </div>
          );
        })}
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
          {uniqueImages.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); handlePrevLightbox(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-[99999] w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white cursor-pointer border border-white/20 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Next Arrow */}
          {uniqueImages.length > 1 && (
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
              src={uniqueImages[activeImageIndex]}
              alt={`${title} - Enlarged`}
              fill
              className="object-contain"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm font-medium border border-white/20">
            {activeImageIndex + 1} / {uniqueImages.length}
          </div>
        </div>
      )}
    </div>
  );
}
