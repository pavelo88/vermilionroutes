'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Clock, Star, Check, ArrowRight, ShieldCheck, Ship, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Tour } from '@/types';
import { Button } from '@/components/ui/Button';
import { useSettings } from '@/hooks/useSettings';

interface TourModalProps {
  tour: Tour | null;
  isOpen: boolean;
  onClose: () => void;
}

export function TourModal({ tour, isOpen, onClose }: TourModalProps) {
  const { settings } = useSettings();
  const [mounted, setMounted] = useState(false);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Construct image gallery list
  const galleryImages = React.useMemo(() => {
    if (!tour) return [];
    const imgs = [tour.imageUrl];
    if (tour.gallery && tour.gallery.length > 0) {
      tour.gallery.forEach(img => {
        if (img && !imgs.includes(img)) imgs.push(img);
      });
    }
    // Add destination fallback gallery images if only 1 image is present
    if (imgs.length === 1) {
      if (tour.destination.toLowerCase().includes('galapagos')) {
        imgs.push(
          'https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Ffull-galapagos-3-islands-hero.jpg?alt=media',
          'https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Fgalapagos-santa-cruz-isabela-premium-hero.jpg?alt=media'
        );
      } else if (tour.destination.toLowerCase().includes('peru')) {
        imgs.push(
          'https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Fmisterios-del-peru-hero.jpg?alt=media',
          'https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Fcusco-inca-trail-hero.jpg?alt=media'
        );
      } else {
        imgs.push(
          'https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Ffantastic-ecuador-hero.jpg?alt=media',
          'https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Fsnow-waterfalls-galapagos-hero.jpg?alt=media'
        );
      }
    }
    return imgs;
  }, [tour]);

  // Reset index when tour changes
  useEffect(() => {
    setCurrentImgIndex(0);
  }, [tour?.id]);

  // Auto carousel rotation
  useEffect(() => {
    if (!isOpen || galleryImages.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % galleryImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isOpen, galleryImages.length]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!tour) return null;

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const handleWhatsApp = () => {
    const rawNumber = settings?.contact?.whatsappUrl || settings?.contact?.phone || '593994048458';
    const phoneNumber = rawNumber.replace(/[^0-9]/g, '') || '593994048458';
    const message = encodeURIComponent(`Hello Vermilion Routes, I am interested in the "${tour.title}" tour and would like to request more information.`);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-md"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onPointerDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[85vh] sm:max-h-[90vh] overflow-hidden flex flex-col md:flex-row relative pointer-events-auto border border-white/20"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 z-50 p-2 sm:p-2.5 rounded-full backdrop-blur-md transition-all cursor-pointer shadow-md md:bg-zinc-100 md:hover:bg-zinc-200 md:text-zinc-600 md:border-none bg-black/30 hover:bg-black/50 text-white border border-white/20 hover:scale-110"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Side - Image Carousel (Magazine Style) */}
              <div className="w-full md:w-2/5 h-64 md:h-auto relative bg-zinc-900 shrink-0 group overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImgIndex}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={galleryImages[currentImgIndex] || tour.imageUrl}
                      alt={`${tour.title} - Image ${currentImgIndex + 1}`}
                      fill
                      className="object-cover opacity-90"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Carousel Nav Arrows */}
                {galleryImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md transition-all opacity-80 hover:opacity-100"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md transition-all opacity-80 hover:opacity-100"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Carousel Pagination Dots */}
                {galleryImages.length > 1 && (
                  <div className="absolute top-4 left-4 z-20 flex gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/10">
                    {galleryImages.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImgIndex(idx);
                        }}
                        className={`h-1.5 rounded-full transition-all ${
                          idx === currentImgIndex ? 'w-5 bg-emerald-400' : 'w-1.5 bg-white/50 hover:bg-white'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
                
                <div className="absolute bottom-6 left-6 right-6 text-white z-10 pointer-events-none">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-white border border-white/30 mb-3">
                      <MapPin className="w-3.5 h-3.5" />
                      {tour.destination}
                    </span>
                    <h2 className="font-serif text-2xl md:text-3xl font-bold leading-tight mb-2">
                      {tour.title}
                    </h2>
                    <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-zinc-200">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-emerald-400" />
                        {tour.duration}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        {tour.rating}
                      </span>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Right Side - Content & Actions */}
              <div className="w-full md:w-3/5 flex flex-col h-full max-h-[calc(100vh-16rem)] md:max-h-[90vh] bg-[#FAFAFA] overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <style dangerouslySetInnerHTML={{__html: `div::-webkit-scrollbar { display: none; }`}} />
                <div className="p-6 md:p-8 space-y-6 md:space-y-8 flex-1 pb-24 sm:pb-8">
                  
                  {/* Price Banner */}
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap items-center justify-between gap-4 bg-emerald-50 rounded-2xl p-4 border border-emerald-100"
                  >
                    <div>
                      <span className="text-xs uppercase font-bold text-emerald-700 tracking-wider">Starting from</span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-serif font-bold text-3xl text-zinc-900">${tour.price.toLocaleString('en-US')}</span>
                        <span className="text-zinc-600 text-sm">/ person</span>
                      </div>
                    </div>
                    <Button 
                      variant="primary" 
                      className="gap-2 shadow-lg shadow-emerald-600/20 px-6 py-2.5"
                      onClick={handleWhatsApp}
                    >
                      <MessageCircle className="w-4 h-4" />
                      Book via WhatsApp
                    </Button>
                  </motion.div>

                  {/* Description */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h3 className="font-serif text-xl font-bold text-zinc-900 mb-3">About this experience</h3>
                    <p className="text-zinc-600 leading-relaxed text-sm md:text-base">
                      {tour.description}
                    </p>
                  </motion.div>

                  {/* Highlights Grid */}
                  {tour.highlights && tour.highlights.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <h3 className="font-serif text-xl font-bold text-zinc-900 mb-4 flex items-center gap-2">
                        <Star className="w-5 h-5 text-amber-500" />
                        Highlights
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {tour.highlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 bg-white p-3 rounded-xl border border-zinc-100 shadow-sm">
                            <div className="mt-0.5 bg-emerald-100 rounded-full p-1 shrink-0">
                              <Check className="w-3 h-3 text-emerald-600" />
                            </div>
                            <span className="text-sm text-zinc-700 leading-snug">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Inclusions & Exclusions */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                  >
                    <div>
                      <h3 className="font-serif text-lg font-bold text-zinc-900 mb-3 flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-emerald-600" />
                        Included
                      </h3>
                      <ul className="space-y-2">
                        {tour.inclusions?.map((inc, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-zinc-600">
                            <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-bold text-zinc-900 mb-3 flex items-center gap-2">
                        <X className="w-5 h-5 text-red-500" />
                        Not Included
                      </h3>
                      <ul className="space-y-2">
                        {tour.exclusions?.map((exc, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-zinc-600">
                            <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                            <span>{exc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>

                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );

  if (!mounted) return null;
  
  return createPortal(modalContent, document.body);
}
