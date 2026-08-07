'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Tour } from '@/types';
import { mockTours } from '@/data/mock';
import { calculateTourPrice, PricingDetails } from '@/lib/pricing';
import { PriceCalculator } from './PriceCalculator';
import { CalendarDays, Users, Mail, Map, ArrowLeft, CheckCircle2 } from 'lucide-react';

export function BookingWizard() {
  const searchParams = useSearchParams();
  const initialTourId = searchParams.get('tourId');
  
  const [step, setStep] = useState(1);
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  
  // Step 1: Dates
  const [date, setDate] = useState<string>('');
  
  // Step 2: Visitors
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  
  // Step 3: Contact Details
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });

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

  const handleContinue = () => {
    if (step < 3) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Finalize - Redirect to WhatsApp
      if (!selectedTour) return;
      const message = `¡Hola! Me gustaría confirmar una reserva para el tour "${selectedTour.title}".\n\nDetalles:\n- Fecha: ${date}\n- Adultos: ${adults}\n- Niños: ${children}\n- Total Estimado: $${pricing.total.toLocaleString()}\n\nMis datos:\n- Nombre: ${contactInfo.name}\n- Email: ${contactInfo.email}`;
      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/59390000000?text=${encodedMessage}`, '_blank');
    }
  };

  const stepIsComplete = () => {
    if (step === 1) return selectedTour !== null && date !== '';
    if (step === 2) return adults > 0;
    if (step === 3) return contactInfo.name !== '' && contactInfo.email !== '';
    return false;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
      {/* Stepper Header */}
      <div className="mb-12">
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-white mb-8 text-center">
          Reserva tu Expedición
        </h1>
        <div className="flex items-center justify-center gap-4 sm:gap-8 relative max-w-2xl mx-auto">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-zinc-200 dark:bg-zinc-800 -z-10 -translate-y-1/2">
            <div 
              className="h-full bg-emerald-500 transition-all duration-500"
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            />
          </div>
          
          {[
            { num: 1, label: 'Destino y Fecha', icon: Map },
            { num: 2, label: 'Pasajeros', icon: Users },
            { num: 3, label: 'Confirmación', icon: CheckCircle2 }
          ].map((s) => (
            <div key={s.num} className="flex flex-col items-center gap-2 bg-white dark:bg-zinc-950 px-2 sm:px-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors border-2 ${
                step >= s.num 
                  ? 'border-emerald-500 bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' 
                  : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-400'
              }`}>
                <s.icon className="w-5 h-5" />
              </div>
              <span className={`text-xs font-semibold uppercase tracking-wider ${
                step >= s.num ? 'text-zinc-900 dark:text-white' : 'text-zinc-400'
              }`}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Main Content Area */}
        <div className="lg:col-span-8">
          {step > 1 && (
            <button 
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Volver al paso anterior
            </button>
          )}

          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-10 border border-zinc-200 dark:border-zinc-800 shadow-sm">
            
            {/* STEP 1 */}
            {step === 1 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600">1</div>
                    Selecciona tu Tour
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
                            <img src={t.imageUrl} alt={t.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                          </div>
                          <div>
                            <h4 className="font-bold text-sm text-zinc-900 dark:text-white line-clamp-1">{t.title}</h4>
                            <p className="text-xs text-zinc-500 mt-1">{t.duration}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-4 rounded-2xl border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20">
                      <div className="flex gap-4 items-center">
                        <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                          <img src={selectedTour.imageUrl} alt={selectedTour.title} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-zinc-900 dark:text-white">{selectedTour.title}</h4>
                          <p className="text-xs text-zinc-500 mt-1">Precio base: ${selectedTour.price.toLocaleString()}</p>
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

                <div className="pt-8 border-t border-zinc-100 dark:border-zinc-800">
                  <h3 className="font-serif text-2xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600">2</div>
                    ¿Cuándo viajas?
                  </h3>
                  <div className="max-w-xs">
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h3 className="font-serif text-2xl font-bold text-zinc-900 dark:text-white mb-6">
                  ¿Quiénes viajan?
                </h3>
                
                <div className="space-y-6 max-w-lg">
                  <div className="flex items-center justify-between p-4 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
                    <div>
                      <h4 className="font-bold text-zinc-900 dark:text-white">Adultos</h4>
                      <p className="text-xs text-zinc-500">Edad 12+</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => setAdults(Math.max(1, adults - 1))}
                        className="w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                      >-</button>
                      <span className="w-4 text-center font-bold text-zinc-900 dark:text-white">{adults}</span>
                      <button 
                        onClick={() => setAdults(adults + 1)}
                        className="w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                      >+</button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
                    <div>
                      <h4 className="font-bold text-zinc-900 dark:text-white">Niños</h4>
                      <p className="text-xs text-zinc-500">Edades 2 - 11 (20% dcto)</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => setChildren(Math.max(0, children - 1))}
                        className="w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                      >-</button>
                      <span className="w-4 text-center font-bold text-zinc-900 dark:text-white">{children}</span>
                      <button 
                        onClick={() => setChildren(children + 1)}
                        className="w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                      >+</button>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-50 dark:bg-emerald-950/30 p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/50">
                  <p className="text-sm text-emerald-800 dark:text-emerald-200 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> 
                    ¡5% de descuento grupal para 4+ personas y 10% para 8+!
                  </p>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-zinc-900 dark:text-white mb-2">
                    Tus Datos
                  </h3>
                  <p className="text-sm text-zinc-500">Para enviar tu cotización final al equipo de ventas de Vermilion.</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-zinc-900 dark:text-white uppercase tracking-wider">Nombre Completo</label>
                    <input
                      type="text"
                      value={contactInfo.name}
                      onChange={(e) => setContactInfo({...contactInfo, name: e.target.value})}
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-zinc-900 dark:text-white uppercase tracking-wider">Email</label>
                    <input
                      type="email"
                      value={contactInfo.email}
                      onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-xs font-semibold text-zinc-900 dark:text-white uppercase tracking-wider">Peticiones Especiales (Opcional)</label>
                    <textarea
                      rows={3}
                      value={contactInfo.notes}
                      onChange={(e) => setContactInfo({...contactInfo, notes: e.target.value})}
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar: Calculator */}
        <div className="lg:col-span-4">
          <PriceCalculator 
            tour={selectedTour} 
            pricing={pricing} 
            date={date} 
            step={step}
            onContinue={handleContinue} 
            canContinue={stepIsComplete()}
          />
        </div>
      </div>
    </div>
  );
}
