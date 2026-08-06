'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Clock, Star, Check, ArrowRight, ShieldCheck, Ship, MessageCircle, ChevronLeft, ChevronRight, Download, Sparkles } from 'lucide-react';
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
  const [showBookingOptions, setShowBookingOptions] = useState(false);

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
    return imgs;
  }, [tour]);

  // Reset index and options when tour changes
  useEffect(() => {
    setCurrentImgIndex(0);
    setShowBookingOptions(false);
  }, [tour?.id]);

  // Auto carousel rotation (resets on manual click because currentImgIndex is a dependency)
  useEffect(() => {
    if (!isOpen || galleryImages.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % galleryImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isOpen, galleryImages.length, currentImgIndex]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
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
    const message = encodeURIComponent(`Hello Vermilion Routes, I am interested in booking the "${tour.title}" tour.`);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const handleAIBooking = () => {
    onClose();
    // Dispatch event to open ConciergeWidget and send message
    window.dispatchEvent(new CustomEvent('open-tour-chat', { detail: { tourTitle: tour.title } }));
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
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-0 sm:p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onPointerDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              className="glass-panel rounded-none sm:rounded-3xl shadow-2xl w-full h-full sm:h-auto max-w-5xl max-h-[100dvh] sm:max-h-[90vh] overflow-hidden flex flex-col md:flex-row relative pointer-events-auto border-0 sm:border border-zinc-200 dark:border-zinc-800"
            >
              {/* Close Button - positioned in right panel on desktop, over image on mobile */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 md:top-5 md:right-5 z-[60] p-2 rounded-full transition-all cursor-pointer bg-black/40 hover:bg-black/60 text-white backdrop-blur-md shadow-sm md:bg-zinc-100 md:text-zinc-500 md:hover:text-zinc-900 dark:md:text-zinc-400 dark:md:hover:text-white dark:md:bg-zinc-800"
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
                    <h2 className="font-serif text-xl md:text-2xl font-bold leading-tight mb-2">
                      {tour.title}
                    </h2>
                    <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-zinc-200">
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
              <div className="w-full md:w-3/5 flex flex-col h-full max-h-[calc(100vh-16rem)] md:max-h-[90vh] bg-white/50 dark:bg-zinc-900/50 overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <style dangerouslySetInnerHTML={{__html: `div::-webkit-scrollbar { display: none; }`}} />
                <div className="p-4 md:p-6 md:pt-16 space-y-5 md:space-y-6 flex-1 pb-8 sm:pb-6">
                  
                  {/* Price Banner */}
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap items-center justify-between gap-3 bg-emerald-50 rounded-2xl p-3 border border-emerald-100"
                  >
                    <div>
                      <span className="text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-400 tracking-wider">Starting from</span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-serif font-bold text-2xl text-zinc-900 dark:text-white">${tour.price.toLocaleString('en-US')}</span>
                        <span className="text-zinc-600 dark:text-zinc-400 text-xs">/ person</span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 mt-2 sm:mt-0 w-full sm:w-auto">
                      <Button 
                        variant="outline" 
                        className="gap-1.5 px-3 py-1.5 text-xs border-emerald-200 dark:border-emerald-900/50 text-emerald-700 dark:text-emerald-400 w-full sm:w-auto justify-center"
                        onClick={() => window.open(tour.pdfUrl || 'https://drive.google.com/drive/folders/1DfBnCx-TbKK9FuuKTy-7q6yaCeSzveM3', '_blank')}
                      >
                        <Download className="w-3.5 h-3.5" />
                        PDF Itinerary
                      </Button>
                      
                      {!showBookingOptions ? (
                        <Button 
                          variant="primary" 
                          className="gap-1.5 shadow-lg shadow-emerald-600/20 px-6 py-1.5 text-xs w-full sm:w-auto justify-center"
                          onClick={() => setShowBookingOptions(true)}
                        >
                          Reservar
                        </Button>
                      ) : (
                        <div className="flex items-center gap-2 animate-in fade-in zoom-in duration-200">
                          <Button 
                            variant="primary" 
                            className="gap-1.5 px-3 py-1.5 text-xs w-full sm:w-auto justify-center bg-zinc-900 hover:bg-zinc-800 text-white"
                            onClick={handleAIBooking}
                          >
                            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                            Con IA
                          </Button>
                          <Button 
                            variant="primary" 
                            className="gap-1.5 px-3 py-1.5 text-xs w-full sm:w-auto justify-center bg-[#25D366] hover:bg-[#20bd5a] text-white"
                            onClick={handleWhatsApp}
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            WhatsApp
                          </Button>
                        </div>
                      )}
                    </div>
                  </motion.div>

                  {/* Description */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-white mb-2">About this experience</h3>
                    <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-sm md:text-base">
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
                      <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
                        <Star className="w-4 h-4 text-amber-500" />
                        Highlights
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {tour.highlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-start gap-2 bg-white/60 dark:bg-zinc-800/60 p-2.5 rounded-xl border border-zinc-100 dark:border-zinc-700/50 shadow-sm">
                            <div className="mt-0.5 bg-emerald-100 dark:bg-emerald-900/50 rounded-full p-1 shrink-0">
                              <Check className="w-2.5 h-2.5 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <span className="text-xs text-zinc-700 dark:text-zinc-300 leading-snug">{highlight}</span>
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
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                  >
                    <div>
                      <h3 className="font-serif text-base font-bold text-zinc-900 dark:text-white mb-2 flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        Included
                      </h3>
                      <ul className="space-y-1.5">
                        {tour.inclusions?.map((inc, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-xs text-zinc-600 dark:text-zinc-400">
                            <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-serif text-base font-bold text-zinc-900 dark:text-white mb-2 flex items-center gap-2">
                        <X className="w-4 h-4 text-red-500" />
                        Not Included
                      </h3>
                      <ul className="space-y-1.5">
                        {tour.exclusions?.map((exc, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-xs text-zinc-600 dark:text-zinc-400">
                            <X className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
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
