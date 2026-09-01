'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { Tour } from '@/types';
import { mockTours } from '@/data/mock';
import { calculateTourPrice, PricingDetails } from '@/lib/pricing';
import { PriceCalculator } from './PriceCalculator';
import { TravelDatePicker } from './TravelDatePicker';
import { Map, CalendarDays, Users, CheckCircle2, ChevronDown, ExternalLink, Lock, ArrowRight } from 'lucide-react';
import { useLocale } from 'next-intl';
import { getLocalizedText } from '@/utils/i18nHelper';
import { getStoredAffiliateRef } from '@/components/affiliates/AffiliateTracker';
import { Sparkles, Loader2 } from 'lucide-react';
import { getAffiliateByCode, AffiliateAccount } from '@/lib/affiliates';

const CATEGORIES = [
  { id: 'all', label: 'Todas las Expediciones' },
  { id: 'Ecuador', label: '🏔️ Ecuador Continental' },
  { id: 'Galapagos', label: '🐢 Islas Galápagos' },
  { id: 'Combined', label: '✨ Viajes Combinados' },
  { id: 'FullDay', label: '☀️ Excursiones Full Day' },
];

function filterTours(tours: Tour[], activeFilter: string): Tour[] {
  if (activeFilter === 'all') return tours;
  return tours.filter((tour) => {
    const dest = (typeof tour.destination === 'string' ? tour.destination : (tour.destination as any)?.en || (tour.destination as any)?.es || '').toLowerCase();
    const id = (tour.id || '').toLowerCase();
    const durationDays = tour.durationDays ?? 0;
    const isDaily = durationDays === 1 || id.includes('quito-city') || id.includes('otavalo') || id.includes('papallacta') || id.includes('mindo') || id.includes('antisana') || id.includes('cotopaxi') || id.includes('quilotoa') || dest.includes('full') || dest.includes('daily');
    if (activeFilter === 'FullDay') return isDaily;
    if (activeFilter === 'Ecuador') return !isDaily && (dest.includes('ecuador') || id.includes('volcanoes') || id.includes('andes') || id.includes('snow') || id.includes('fantastic')) && !dest.includes('galapagos') && !id.includes('galapagos');
    if (activeFilter === 'Galapagos') return !isDaily && (dest.includes('galapagos') || id.includes('galapagos')) && !id.includes('ecuador-galapagos');
    if (activeFilter === 'Combined') return !isDaily && (id.includes('ecuador-galapagos') || (dest.includes('galapagos') && dest.includes('ecuador')) || dest.includes('combined'));
    return false;
  });
}

export function BookingWizard() {
  const locale = useLocale();
  const searchParams = useSearchParams();
  const addTourId = searchParams.get('addTour') || searchParams.get('tourId');

  const [selectedTours, setSelectedTours] = useState<Tour[]>([]);
  const [affiliateRef, setAffiliateRef] = useState<string | null>(null);
  const [affiliateData, setAffiliateData] = useState<AffiliateAccount | null>(null);
  const [isValidatingAffiliate, setIsValidatingAffiliate] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dateRef = useRef<HTMLDivElement>(null);
  const passengersRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ref = searchParams.get('vid') || searchParams.get('ref') || searchParams.get('affiliate') || getStoredAffiliateRef();
    if (ref) {
      const trimmedRef = ref.toLowerCase().trim();
      setIsValidatingAffiliate(true);
      getAffiliateByCode(trimmedRef).then(data => {
        setAffiliateRef(data ? trimmedRef : null);
        setAffiliateData(data || null);
        setIsValidatingAffiliate(false);
      });
    }
  }, [searchParams]);

  const [date, setDate] = useState<string>('');
  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);
  const [contactInfo, setContactInfo] = useState({ name: '', email: '', phone: '', notes: '' });
  const [isProcessing, setIsProcessing] = useState(false);

  const [pricing, setPricing] = useState<PricingDetails>({
    basePricePerAdult: 0, basePricePerChild: 0, adultsCount: 0, childrenCount: 0,
    adultsTotal: 0, childrenTotal: 0, subtotal: 0, groupDiscountPercentage: 0,
    groupDiscountAmount: 0, total: 0
  });

  useEffect(() => {
    if (addTourId) {
      const tour = mockTours.find(t => t.id === addTourId);
      if (tour) {
        setSelectedTours(prev => prev.some(t => t.id === tour.id) ? prev : [...prev, tour]);
      }
    }
  }, [addTourId]);

  useEffect(() => {
    if (selectedTours.length > 0) {
      let tAB = 0, tCB = 0, tAA = 0, tCA = 0, tSub = 0, tDisc = 0, tFinal = 0;
      selectedTours.forEach(tour => {
        const p = calculateTourPrice(tour.price, adults, children, date);
        tAB += p.basePricePerAdult; tCB += p.basePricePerChild;
        tAA += p.adultsTotal; tCA += p.childrenTotal;
        tSub += p.subtotal; tDisc += p.groupDiscountAmount; tFinal += p.total;
      });
      setPricing({
        basePricePerAdult: tAB, basePricePerChild: tCB,
        adultsCount: adults, childrenCount: children,
        adultsTotal: tAA, childrenTotal: tCA, subtotal: tSub,
        groupDiscountPercentage: adults + children >= 6 ? 5 : (adults + children >= 4 ? 2 : 0),
        groupDiscountAmount: tDisc, total: tFinal
      });
    } else {
      setPricing({ basePricePerAdult: 0, basePricePerChild: 0, adultsCount: adults, childrenCount: children, adultsTotal: 0, childrenTotal: 0, subtotal: 0, groupDiscountPercentage: 0, groupDiscountAmount: 0, total: 0 });
    }
  }, [selectedTours, adults, children, date]);

  const toggleTour = (tour: Tour) => {
    setSelectedTours(prev => prev.some(t => t.id === tour.id) ? prev.filter(t => t.id !== tour.id) : [...prev, tour]);
  };

  const handleCheckout = () => {
    if (selectedTours.length === 0) return;
    const tourTitleStr = selectedTours.map(t => typeof t.title === 'string' ? t.title : (t.title?.es || t.title?.en || 'Tour')).join(' + ');
    const queryParams = new URLSearchParams({
      tourId: selectedTours.map(t => t.id).join(','),
      tourTitle: tourTitleStr,
      email: contactInfo.email,
      amount: String(pricing.total),
      type: 'full',
      ref: affiliateRef || `VR-${Date.now()}`,
      date: date
    });
    window.location.href = `/${locale}/checkout/payment?${queryParams.toString()}`;
  };

  const isFormComplete = () => selectedTours.length > 0 && date !== '' && adults > 0 && contactInfo.name !== '' && contactInfo.email !== '';

  type CTAState = { label: string; ref: React.RefObject<HTMLDivElement> | null; ready: boolean };
  const getMobileCTA = (): CTAState => {
    if (selectedTours.length === 0) return { label: 'Selecciona un tour arriba', ref: null, ready: false };
    if (!date) return { label: 'Falta elegir tu fecha de viaje', ref: dateRef, ready: false };
    if (!contactInfo.name || !contactInfo.email) return { label: 'Completa tus datos de contacto', ref: contactRef, ready: false };
    return { label: `Proceder al Pago - $${pricing.total.toLocaleString('en-US')} USD`, ref: null, ready: true };
  };
  const mobileCTA = getMobileCTA();
  const filteredTours = filterTours(mockTours, activeFilter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8 pb-28 lg:pb-8">
      <div className="mb-5">
        <h1 className="font-serif text-2xl sm:text-4xl font-bold text-zinc-900 dark:text-white mb-1">Reserva tu Expedicion</h1>
        <p className="text-sm text-zinc-500">Completa los datos a continuacion para asegurar tu lugar.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
        <div className="lg:col-span-8 space-y-5">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-5 sm:p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">

            {isValidatingAffiliate && (
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-zinc-50 border border-zinc-200 text-zinc-500 text-xs">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Validando codigo de embajador...</span>
              </div>
            )}
            {!isValidatingAffiliate && affiliateRef && affiliateData && (
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 text-amber-900 dark:text-amber-200 text-xs">
                <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                <div className="flex-1">
                  <p className="font-bold">Descuento VIP del 10% Aplicado</p>
                  <p className="text-xs text-amber-700 dark:text-amber-300/80">Embajador: <strong>{affiliateData.name} (@{affiliateRef})</strong></p>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold text-[10px] uppercase tracking-wider shrink-0">10% OFF</span>
              </div>
            )}

            <div>
              <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
                <Map className="w-5 h-5 text-emerald-600" /> 1. Selecciona tu Tour
              </h3>
              <div className="hidden md:flex flex-wrap items-center gap-2 mb-4">
                {CATEGORIES.map((cat) => (
                  <button key={cat.id} onClick={() => setActiveFilter(cat.id)} suppressHydrationWarning
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer border ${activeFilter === cat.id ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 scale-105 border-emerald-600' : 'bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 border-zinc-200 dark:border-zinc-700 hover:border-emerald-400'}`}>
                    {cat.label}
                  </button>
                ))}
              </div>
              <div className="md:hidden relative w-full mb-3">
                <button onClick={() => setDropdownOpen(!dropdownOpen)} className="w-full flex items-center justify-between bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 py-3 px-4 rounded-xl text-sm font-bold shadow-sm">
                  <span>{CATEGORIES.find(c => c.id === activeFilter)?.label || 'Todas las Expediciones'}</span>
                  <ChevronDown className={`w-4 h-4 text-emerald-600 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {dropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-xl z-50 overflow-hidden">
                    {CATEGORIES.map((cat) => (
                      <button key={cat.id} onClick={() => { setActiveFilter(cat.id); setDropdownOpen(false); }}
                        className={`w-full text-left px-4 py-3 text-sm transition-colors border-b border-zinc-100 dark:border-zinc-800 last:border-0 ${activeFilter === cat.id ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 font-bold' : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800'}`}>
                        {cat.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredTours.length === 0 && <div className="sm:col-span-2 text-center py-8 text-zinc-400 text-sm">No hay tours en esta categoría.</div>}
                {filteredTours.map((t) => {
                  const isSelected = selectedTours.some(st => st.id === t.id);
                  return (
                    <div
                      key={t.id}
                      className={`border rounded-2xl p-4 transition-all flex flex-col justify-between gap-3 group ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/30 shadow-md ring-1 ring-emerald-500'
                          : 'border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/40 bg-white dark:bg-zinc-900/60'
                      }`}
                    >
                      {/* Top Row: Image + Title + Price */}
                      <div className="flex items-start gap-3.5">
                        <div
                          className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-zinc-200 dark:border-zinc-800 cursor-pointer"
                          onClick={() => toggleTour(t)}
                        >
                          <img
                            src={t.imageUrl}
                            alt={getLocalizedText(t.title, locale)}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="flex-1 min-w-0 cursor-pointer" onClick={() => toggleTour(t)}>
                          <h4 className={`font-bold text-xs sm:text-sm line-clamp-2 leading-snug ${
                            isSelected ? 'text-emerald-900 dark:text-emerald-300' : 'text-zinc-900 dark:text-white'
                          }`}>
                            {getLocalizedText(t.title, locale)}
                          </h4>
                          <div className="flex flex-wrap items-center gap-2 mt-1">
                            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400" suppressHydrationWarning>
                              Desde ${t.price.toLocaleString('en-US')} USD
                            </span>
                            <span className="text-[10px] text-zinc-400">&bull;</span>
                            <span className="text-[11px] text-zinc-500 font-medium">
                              {getLocalizedText(t.duration, locale)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Action Row: Ver Detalles + Reservar / Seleccionar */}
                      <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between gap-2.5">
                        <a
                          href={`/${locale}/tours/${t.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2 px-3 rounded-xl border border-emerald-500/30 bg-transparent text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 font-bold text-xs text-center transition-all shadow-sm"
                        >
                          Ver Detalles
                        </a>

                        <button
                          type="button"
                          onClick={() => toggleTour(t)}
                          className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer ${
                            isSelected
                              ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-900/30 ring-2 ring-emerald-500 ring-offset-1 ring-offset-white dark:ring-offset-zinc-900'
                              : 'bg-zinc-800 hover:bg-zinc-700 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-zinc-900'
                          }`}
                        >
                          {isSelected ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                              <span>Seleccionado</span>
                            </>
                          ) : (
                            <span>Reservar</span>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <hr className="border-zinc-100 dark:border-zinc-800" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div ref={dateRef} className="md:col-span-7">
                <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
                  <CalendarDays className="w-5 h-5 text-emerald-600" /> 2. Cuando viajas?
                </h3>
                <TravelDatePicker selectedDate={date} onDateSelect={(d) => setDate(d)} durationDays={selectedTours.reduce((max, t) => Math.max(max, t.durationDays || 1), 1)} />
              </div>
              <div ref={passengersRef} className="md:col-span-5">
                <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5 text-emerald-600" /> 3. Quienes viajan?
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border border-zinc-200 dark:border-zinc-800 rounded-xl">
                    <h4 className="font-semibold text-sm text-zinc-900 dark:text-white">Adultos</h4>
                    <div className="flex items-center gap-3">
                      <button onClick={() => setAdults(Math.max(1, adults - 1))} className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-lg leading-none">-</button>
                      <span className="w-5 text-center font-bold text-sm">{adults}</span>
                      <button onClick={() => setAdults(adults + 1)} className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-lg leading-none">+</button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-zinc-200 dark:border-zinc-800 rounded-xl">
                    <div><h4 className="font-semibold text-sm text-zinc-900 dark:text-white">Ninos</h4><p className="text-[10px] text-zinc-500">2 - 11 anos</p></div>
                    <div className="flex items-center gap-3">
                      <button onClick={() => setChildren(Math.max(0, children - 1))} className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-lg leading-none">-</button>
                      <span className="w-5 text-center font-bold text-sm">{children}</span>
                      <button onClick={() => setChildren(children + 1)} className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-lg leading-none">+</button>
                    </div>
                  </div>
                </div>
                <hr className="border-zinc-100 dark:border-zinc-800 my-5" />
                <div ref={contactRef}>
                  <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" /> 4. Tus Datos
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Nombre Completo</label>
                      <input type="text" value={contactInfo.name} onChange={(e) => setContactInfo({...contactInfo, name: e.target.value})} placeholder="Tu nombre completo" className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Email</label>
                      <input type="email" value={contactInfo.email} onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})} placeholder="tu@email.com" className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Peticiones Especiales (Opcional)</label>
                      <textarea rows={2} value={contactInfo.notes} onChange={(e) => setContactInfo({...contactInfo, notes: e.target.value})} placeholder="Alergias, necesidades especiales..." className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 sticky top-24 self-start">
          <PriceCalculator tours={selectedTours} pricing={pricing} date={date} step={3} onContinue={handleCheckout} canContinue={isFormComplete() && !isProcessing} affiliateRef={affiliateRef} />
        </div>
      </div>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-t border-zinc-200 dark:border-zinc-800 shadow-2xl">
        {mobileCTA.ready ? (
          <button onClick={handleCheckout} disabled={isProcessing} className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-600 hover:to-teal-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-900/30 transition-all duration-300 hover:scale-[1.02] active:scale-95 group disabled:opacity-50 disabled:hover:scale-100 cursor-pointer border-none">
            <Lock className="w-4 h-4 shrink-0" />
            <span className="truncate">{mobileCTA.label}</span>
            <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
          </button>
        ) : (
          <button onClick={() => { if (mobileCTA.ref?.current) { mobileCTA.ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' }); } }} className="w-full flex items-center justify-center gap-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold py-4 rounded-2xl text-sm transition-all border border-zinc-200 dark:border-zinc-700">
            <span>{mobileCTA.label}</span>
            {mobileCTA.ref && <ArrowRight className="w-4 h-4 text-emerald-600" />}
          </button>
        )}
        {selectedTours.length > 0 && !mobileCTA.ready && (
          <p className="text-center text-[10px] text-zinc-400 mt-1.5">{selectedTours.length} tour{selectedTours.length > 1 ? 's' : ''} seleccionado{selectedTours.length > 1 ? 's' : ''}</p>
        )}
      </div>
    </div>
  );
}
