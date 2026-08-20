'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Tour } from '@/types';
import { mockTours } from '@/data/mock';
import { calculateTourPrice, PricingDetails } from '@/lib/pricing';
import { PriceCalculator } from './PriceCalculator';
import { TravelDatePicker } from './TravelDatePicker';
import { Map, CalendarDays, Users, CheckCircle2 } from 'lucide-react';
import { useLocale } from 'next-intl';
import { getLocalizedText } from '@/utils/i18nHelper';

export function BookingWizard() {
  const locale = useLocale();
  const searchParams = useSearchParams();
  const initialTourId = searchParams.get('tourId');
  
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  
  // Form State
  const [date, setDate] = useState<string>('');
  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculate prices dynamically
  const [pricing, setPricing] = useState<PricingDetails>({
    basePricePerAdult: 0,
    basePricePerChild: 0,
    adultsCount: 0,
    childrenCount: 0,
    adultsTotal: 0,
    childrenTotal: 0,
    subtotal: 0,
    groupDiscountPercentage: 0,
    groupDiscountAmount: 0,
    total: 0
  });

  useEffect(() => {
    if (initialTourId) {
      const tour = mockTours.find(t => t.id === initialTourId);
      if (tour) setSelectedTour(tour);
    }
  }, [initialTourId]);

  useEffect(() => {
    if (selectedTour) {
      const newPricing = calculateTourPrice(selectedTour.price, adults, children, date);
      setPricing(newPricing);
    }
  }, [selectedTour, adults, children, date]);

  const handleCheckout = async () => {
    if (!selectedTour) return;
    setIsProcessing(true);
    
    try {
      const tourTitleStr = typeof selectedTour.title === 'string' ? selectedTour.title : (selectedTour.title?.en || selectedTour.title?.es || 'Tour Expedition');
      const res = await fetch('/api/checkout/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tourId: selectedTour.id,
          tourTitle: tourTitleStr,
          clientEmail: contactInfo.email,
          amount: pricing.total,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Error conectando con la pasarela de pagos.');
      }
    } catch (error) {
      console.error(error);
      alert('Ocurrió un error inesperado.');
    } finally {
      setIsProcessing(false);
    }
  };

  const isFormComplete = () => {
    return selectedTour !== null && date !== '' && adults > 0 && contactInfo.name !== '' && contactInfo.email !== '';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div className="mb-8">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mb-2">
          Reserva tu Expedición
        </h1>
        <p className="text-sm text-zinc-500">Completa los datos a continuación para asegurar tu lugar de manera automática.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-8">
          
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-8">
            
            {/* Tour Selection */}
            <div>
              <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                <Map className="w-5 h-5 text-emerald-600" /> 1. Selecciona tu Tour
              </h3>
              
              {!selectedTour ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {mockTours.map((t) => (
                    <div 
                      key={t.id}
                      onClick={() => setSelectedTour(t)}
                      className="border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 cursor-pointer hover:border-emerald-500 hover:shadow-md transition-all flex gap-4 items-center group"
                    >
                      <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                        <img src={t.imageUrl} alt={getLocalizedText(t.title, locale)} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-zinc-900 dark:text-white line-clamp-1">{getLocalizedText(t.title, locale)}</h4>
                        <p className="text-xs text-zinc-500 mt-1">{getLocalizedText(t.duration, locale)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-between p-4 rounded-2xl border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20">
                  <div className="flex gap-4 items-center">
                    <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                      <img src={selectedTour.imageUrl} alt={getLocalizedText(selectedTour.title, locale)} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-zinc-900 dark:text-white">{getLocalizedText(selectedTour.title, locale)}</h4>
                      <p className="text-xs text-zinc-500 mt-1">Precio base: ${selectedTour.price.toLocaleString()} USD</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedTour(null)}
                    className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 underline"
                  >
                    Cambiar
                  </button>
                </div>
              )}
            </div>

            <hr className="border-zinc-100 dark:border-zinc-800" />

            {/* Dates & Passengers */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-7">
                <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                  <CalendarDays className="w-5 h-5 text-emerald-600" /> 2. ¿Cuándo viajas? (Selecciona en el Calendario)
                </h3>
                <TravelDatePicker
                  selectedDate={date}
                  onDateSelect={(d) => setDate(d)}
                  durationDays={selectedTour?.durationDays || 1}
                />
              </div>

              <div className="md:col-span-5">
                <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-emerald-600" /> 3. ¿Quiénes viajan?
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border border-zinc-200 dark:border-zinc-800 rounded-xl">
                    <div>
                      <h4 className="font-semibold text-sm text-zinc-900 dark:text-white">Adultos</h4>
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={() => setAdults(Math.max(1, adults - 1))} className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800">-</button>
                      <span className="w-4 text-center font-bold">{adults}</span>
                      <button onClick={() => setAdults(adults + 1)} className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800">+</button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-zinc-200 dark:border-zinc-800 rounded-xl">
                    <div>
                      <h4 className="font-semibold text-sm text-zinc-900 dark:text-white">Niños</h4>
                      <p className="text-[10px] text-zinc-500">2 - 11 años</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={() => setChildren(Math.max(0, children - 1))} className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800">-</button>
                      <span className="w-4 text-center font-bold">{children}</span>
                      <button onClick={() => setChildren(children + 1)} className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800">+</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-zinc-100 dark:border-zinc-800" />

            {/* Contact Details */}
            <div>
              <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" /> 4. Tus Datos
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-zinc-900 dark:text-white uppercase tracking-wider">Nombre Completo</label>
                  <input
                    type="text"
                    value={contactInfo.name}
                    onChange={(e) => setContactInfo({...contactInfo, name: e.target.value})}
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-zinc-900 dark:text-white uppercase tracking-wider">Email</label>
                  <input
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[11px] font-semibold text-zinc-900 dark:text-white uppercase tracking-wider">Peticiones Especiales (Opcional)</label>
                  <textarea
                    rows={2}
                    value={contactInfo.notes}
                    onChange={(e) => setContactInfo({...contactInfo, notes: e.target.value})}
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Calculator */}
        <div className="lg:col-span-4">
          <PriceCalculator 
            tour={selectedTour} 
            pricing={pricing} 
            date={date} 
            step={3} 
            onContinue={handleCheckout} 
            canContinue={isFormComplete() && !isProcessing}
          />
        </div>
      </div>
    </div>
  );
}
