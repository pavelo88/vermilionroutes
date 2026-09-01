'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Mail, User, Loader2, Download } from 'lucide-react';
import { Tour } from '@/types';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, doc, updateDoc, increment } from 'firebase/firestore';

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  tour: Tour;
  locale: string;
}

export function LeadCaptureModal({ isOpen, onClose, onSuccess, tour, locale }: LeadCaptureModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1. Guardar el lead en Firestore
      await addDoc(collection(db, 'leads'), {
        name,
        email,
        tourId: tour.id,
        tourName: tour.title[locale] || tour.title['en'] || tour.id,
        source: 'pdf_download',
        locale,
        createdAt: serverTimestamp(),
      });

      // 2. Incrementar contador de descargas del tour
      // Asumimos que los tours están en una colección 'tours' o similar.
      // Si el documento no existe fallará silenciosamente, lo cual es aceptable para contadores.
      try {
        const tourRef = doc(db, 'tours', tour.id);
        await updateDoc(tourRef, {
          downloadsCount: increment(1)
        });
      } catch (err) {
        console.warn('Could not increment downloads count, tour doc might not exist yet.');
      }

      onSuccess();
    } catch (err: any) {
      console.error('Error saving lead:', err);
      setError(locale === 'es' ? 'Hubo un error al procesar tu solicitud.' : 'There was an error processing your request.');
    } finally {
      setLoading(false);
    }
  };

  const texts = {
    es: {
      title: 'Descarga tu Itinerario PDF',
      subtitle: 'Ingresa tu nombre y correo para descargar el itinerario detallado de este tour.',
      namePlaceholder: 'Tu nombre completo',
      emailPlaceholder: 'Tu correo electrónico',
      button: 'Descargar PDF',
      loading: 'Procesando...',
    },
    en: {
      title: 'Download PDF Itinerary',
      subtitle: 'Enter your name and email to download the detailed itinerary for this tour.',
      namePlaceholder: 'Your full name',
      emailPlaceholder: 'Your email address',
      button: 'Download PDF',
      loading: 'Processing...',
    }
  };

  const t = texts[locale as keyof typeof texts] || texts.en;

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div 
        className="bg-white dark:bg-stone-900 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative animate-in fade-in zoom-in duration-300"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          disabled={loading}
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        <div className="p-8">
          <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/40 rounded-full flex items-center justify-center mb-6">
            <Download className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          
          <h3 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {t.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            {t.subtitle}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t.namePlaceholder} *</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-stone-800/50 border border-gray-200 dark:border-stone-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                placeholder="e.g. John Doe"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t.emailPlaceholder} *</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-stone-800/50 border border-gray-200 dark:border-stone-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                placeholder="name@example.com"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-600 text-xs rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>{t.loading}</span>
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  <span>{t.button}</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>,
    document.body
  );
}
