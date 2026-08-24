'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Camera, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface TourGalleryProps {
  images: string[];
  title: string;
}

export function TourGallery({ images, title }: TourGalleryProps) {
  // De-duplicate and filter out 9-16 vertical images in the tour page gallery
  const uniqueImages = React.useMemo(() => {
    const set = new Set<string>();
    return (images || [])
      .filter((img) => {
        if (!img || set.has(img)) return false;
        // Exclude 9:16 vertical images from the tour page gallery to avoid pixelation/stretching
        if (img.includes('/9-16/') || img.includes('-9-16.jpg')) return false;
        set.add(img);
        return true;
      });
  }, [images]);

  const [selectedMainIndex, setSelectedMainIndex] = useState(0);
  const [prevMainIndex, setPrevMainIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Smooth Auto-Play Slideshow every 3.8s when not in lightbox
  useEffect(() => {
    if (activeImageIndex !== null || uniqueImages.length <= 1) return;

    const timer = setInterval(() => {
      setSelectedMainIndex((current) => {
        const next = (current + 1) % uniqueImages.length;
        setPrevMainIndex(current);
        setIsTransitioning(true);
        setTimeout(() => setIsTransitioning(false), 800);
        return next;
      });
    }, 3800);

    return () => clearInterval(timer);
  }, [activeImageIndex, uniqueImages.length]);

  if (!uniqueImages || uniqueImages.length === 0) return null;

  const currentImage = uniqueImages[selectedMainIndex] || uniqueImages[0];
  const previousImage = uniqueImages[prevMainIndex] || currentImage;

  // Desktop side images: the next 3 images following selectedMainIndex
  const sideImages = React.useMemo(() => {
    const list: string[] = [];
    if (uniqueImages.length <= 1) return list;
    const count = Math.min(3, uniqueImages.length - 1);
    for (let i = 1; i <= count; i++) {
      const targetIndex = (selectedMainIndex + i) % uniqueImages.length;
      list.push(uniqueImages[targetIndex]);
    }
    return list;
  }, [selectedMainIndex, uniqueImages]);

  // Mobile side images: the next 4 images following selectedMainIndex
  const mobileSideImages = React.useMemo(() => {
    const list: string[] = [];
    if (uniqueImages.length <= 1) return list;
    const count = Math.min(4, uniqueImages.length - 1);
    for (let i = 1; i <= count; i++) {
      const targetIndex = (selectedMainIndex + i) % uniqueImages.length;
      list.push(uniqueImages[targetIndex]);
    }
    return list;
  }, [selectedMainIndex, uniqueImages]);

  const handleSelectThumbnail = (targetIndex: number) => {
    if (targetIndex === selectedMainIndex) return;
    setPrevMainIndex(selectedMainIndex);
    setSelectedMainIndex(targetIndex);
    setIsTransitioning(true);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  const handlePrevLightbox = () => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((activeImageIndex - 1 + uniqueImages.length) % uniqueImages.length);
  };

  const handleNextLightbox = () => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((activeImageIndex + 1) % uniqueImages.length);
  };

  return (
    <div 
      className="space-y-2"
    >
      {/* Bento Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 rounded-2xl overflow-hidden">
        {/* Main Big Photo (Left/Top) with Layered Crossfade */}
        <div
          onClick={() => setActiveImageIndex(selectedMainIndex)}
          className="relative h-72 md:h-[420px] md:col-span-2 group cursor-pointer overflow-hidden rounded-2xl bg-zinc-950 shadow-md"
        >
          {/* Base Previous Layer (during crossfade) */}
          {previousImage && previousImage !== currentImage && (
            <Image
              src={previousImage}
              alt={`${title} - Previous Photo`}
              fill
              quality={95}
              sizes="(max-width: 768px) 100vw, 66vw"
              className="object-cover"
              priority
              referrerPolicy="no-referrer"
            />
          )}

          {/* Active Front Layer with Smooth Fade In */}
          <div
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              isTransitioning ? 'opacity-0 animate-fade-in' : 'opacity-100'
            }`}
          >
            <Image
              key={`main-${currentImage}`}
              src={currentImage}
              alt={`${title} - Main Gallery Photo`}
              fill
              quality={95}
              sizes="(max-width: 768px) 100vw, 66vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              priority
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 group-hover:opacity-80 transition-opacity" />

          {/* Progress Indicators for slideshow */}
          {uniqueImages.length > 1 && (
            <div className="absolute top-4 left-4 flex items-center gap-1.5 z-10 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
              {uniqueImages.map((_, dotIdx) => (
                <button
                  key={`dot-${dotIdx}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectThumbnail(dotIdx);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    dotIdx === selectedMainIndex
                      ? 'w-5 bg-emerald-400 shadow-xs'
                      : 'w-1.5 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Go to photo ${dotIdx + 1}`}
                />
              ))}
            </div>
          )}

          {/* View Gallery Badge */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-2 rounded-full text-white text-xs font-semibold border border-white/20 shadow-lg z-10">
            <Camera className="w-3.5 h-3.5 text-emerald-400" />
            <span>View Gallery ({uniqueImages.length} photos)</span>
          </div>

          {/* Maximize Icon */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-md p-2 rounded-full text-white border border-white/20 z-10">
            <Maximize2 className="w-4 h-4" />
          </div>
        </div>

        {/* Desktop Side Stacked Photos (3 images) */}
        <div className="hidden md:grid grid-cols-1 gap-2">
          {sideImages.map((img, idx) => {
            const originalIndex = uniqueImages.indexOf(img);
            const isSelected = originalIndex === selectedMainIndex;

            return (
              <div
                key={`side-desktop-${idx}-${img}`}
                onClick={() => {
                  if (originalIndex !== -1) handleSelectThumbnail(originalIndex);
                }}
                className={`relative h-[134px] group cursor-pointer overflow-hidden rounded-2xl bg-zinc-900 shadow-sm border transition-all duration-300 ${
                  isSelected 
                    ? 'ring-2 ring-emerald-500 border-transparent shadow-emerald-950/30' 
                    : 'border-zinc-200/20 hover:border-emerald-500/50'
                }`}
              >
                <Image
                  src={img}
                  alt={`${title} - Photo ${idx + 2}`}
                  fill
                  quality={95}
                  sizes="33vw"
                  className="object-cover group-hover:scale-110 transition-all duration-500 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className={`absolute inset-0 transition-colors ${
                  isSelected ? 'bg-emerald-900/10' : 'bg-black/25 group-hover:bg-black/0'
                }`} />

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
          const isSelected = originalIndex === selectedMainIndex;

          return (
            <div
              key={`side-mobile-${idx}-${img}`}
              onClick={() => {
                if (originalIndex !== -1) handleSelectThumbnail(originalIndex);
              }}
              className={`relative h-32 group cursor-pointer overflow-hidden rounded-2xl bg-zinc-900 shadow-sm border transition-all duration-300 ${
                isSelected 
                  ? 'ring-2 ring-emerald-500 border-transparent' 
                  : 'border-zinc-200/20'
              }`}
            >
              <Image
                src={img}
                alt={`${title} - Photo ${idx + 2}`}
                fill
                quality={95}
                sizes="50vw"
                className="object-cover group-hover:scale-110 transition-all duration-500 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className={`absolute inset-0 transition-colors ${
                isSelected ? 'bg-emerald-900/10' : 'bg-black/25 group-hover:bg-black/0'
              }`} />
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
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Next Arrow */}
          {uniqueImages.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); handleNextLightbox(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-[99999] w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white cursor-pointer border border-white/20 transition-colors"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Main Large Lightbox Image */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl h-[80vh] rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src={uniqueImages[activeImageIndex]}
              alt={`${title} - Enlarged View`}
              fill
              quality={95}
              className="object-contain"
              priority
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Counter Badge */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm font-medium border border-white/20">
            {activeImageIndex + 1} / {uniqueImages.length}
          </div>
        </div>
      )}
    </div>
  );
}
