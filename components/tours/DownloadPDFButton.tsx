'use client';

import React, { useState } from 'react';
import { Tour } from '@/types';
import { Download, FileText, Loader2, Check } from 'lucide-react';
import { useLocale } from 'next-intl';

interface DownloadPDFButtonProps {
  tour: Tour;
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function DownloadPDFButton({
  tour,
  variant = 'outline',
  size = 'md',
  className = ''
}: DownloadPDFButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const locale = useLocale();

  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!tour || isGenerating) return;

    setIsGenerating(true);
    try {
      if (
        tour.durationDays === 1 ||
        tour.id.startsWith('daily-') ||
        tour.id.includes('city-middle') ||
        tour.id.includes('otavalo') ||
        tour.id.includes('papallacta') ||
        tour.id.includes('mindo') ||
        tour.id.includes('antisana') ||
        tour.id.includes('cotopaxi') ||
        tour.id.includes('quilotoa')
      ) {
        const { generateDailyTourPDF } = await import('@/lib/dailyTourPdfGenerator');
        await generateDailyTourPDF(tour, locale);
      } else {
        const { generateTourPDF } = await import('@/lib/pdfGenerator');
        await generateTourPDF(tour, locale);
      }
      setIsDownloaded(true);
      setTimeout(() => setIsDownloaded(false), 4000);
    } catch (err) {
      console.error('Error generating PDF brochure:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const labelMap: Record<string, string> = {
    es: 'Descargar Itinerario',
    en: 'Download Itinerary',
    fr: "Télécharger l'Itinéraire",
    de: 'Reiseplan herunterladen',
    it: 'Scarica Itinerario',
    pt: 'Baixar Itinerário',
    ja: '旅程をダウンロード',
    zh: '下载完整行程'
  };

  const label = labelMap[locale] || 'Download PDF Itinerary';

  const baseStyles = "inline-flex items-center justify-center gap-2 font-semibold transition-all rounded-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";
  
  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-xs sm:text-sm",
    lg: "px-6 py-3 text-sm sm:text-base font-bold shadow-lg"
  }[size];

  const variantStyles = {
    primary: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/30 hover:scale-[1.02]",
    outline: "bg-white/80 dark:bg-zinc-900/80 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-300/80 dark:border-emerald-800 shadow-sm hover:border-emerald-500",
    ghost: "text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-zinc-800"
  }[variant];

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={isGenerating}
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      aria-label="Download Tour PDF Brochure"
    >
      {isGenerating ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin text-emerald-600 dark:text-emerald-400" />
          <span>Generating PDF...</span>
        </>
      ) : isDownloaded ? (
        <>
          <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Downloaded!</span>
        </>
      ) : (
        <>
          <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>{label}</span>
          <Download className="w-3.5 h-3.5 opacity-70" />
        </>
      )}
    </button>
  );
}
