'use client';

import React from 'react';
import { PricingDetails } from '@/lib/pricing';
import { Tour } from '@/types';
import { Users, Info, ArrowRight, Wallet, CalendarDays, Ticket, Sparkles } from 'lucide-react';
import { useLocale } from 'next-intl';
import { getLocalizedText } from '@/utils/i18nHelper';

interface PriceCalculatorProps {
  tours: Tour[];
  pricing: PricingDetails;
  date: string | null;
  onContinue: () => void;
  canContinue: boolean;
  step: number;
  affiliateRef?: string | null;
}

export function PriceCalculator({
  tours,
  pricing,
  date,
  onContinue,
  canContinue,
  step,
  affiliateRef
}: PriceCalculatorProps) {
  const locale = useLocale();

  if (!tours || tours.length === 0) {
    return (
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm h-full flex flex-col justify-center items-center text-center space-y-4">
        <Wallet className="w-12 h-12 text-zinc-300 dark:text-zinc-700" />
        <div>
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Resumen de Reserva</h3>
          <p className="text-sm text-zinc-500 mt-2">Selecciona un tour para ver el desglose de precios.</p>
        </div>
      </div>
    );
  }

  // 10% affiliate discount calculation
  const hasAffiliateDiscount = !!affiliateRef;
  const affiliateDiscountAmount = hasAffiliateDiscount ? Math.round(pricing.total * 0.10) : 0;
  const finalPayableTotal = pricing.total - affiliateDiscountAmount;

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200/90 dark:border-zinc-800 shadow-xl sticky top-28">
      <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-white mb-6">
        Resumen de tu viaje
      </h3>

      <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
        {tours.map(t => (
          <div key={t.id} className="flex gap-4 items-start bg-zinc-50 dark:bg-zinc-800/30 p-2.5 rounded-2xl border border-zinc-100 dark:border-zinc-800">
            <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-zinc-100 dark:bg-zinc-800">
              <img src={t.imageUrl} alt={getLocalizedText(t.title, locale)} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-sm text-zinc-900 dark:text-white line-clamp-1">{getLocalizedText(t.title, locale)}</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 flex items-center justify-between">
                <span>{getLocalizedText(t.duration, locale)}</span>
                <span className="font-semibold text-zinc-900 dark:text-white">${t.price.toLocaleString('en-US')}</span>
              </p>
            </div>
          </div>
        ))}

        {date && (
          <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-950 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800">
            <CalendarDays className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="font-medium text-zinc-900 dark:text-zinc-200">
              {new Date(date).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
        )}
      </div>

      <div className="space-y-3 pt-6 border-t border-zinc-100 dark:border-zinc-800/80 mb-6" suppressHydrationWarning>
        {pricing.adultsCount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500 dark:text-zinc-400">Adultos ({pricing.adultsCount} x ${pricing.basePricePerAdult})</span>
            <span className="font-medium text-zinc-900 dark:text-white">${pricing.adultsTotal.toLocaleString('en-US')}</span>
          </div>
        )}
        
        {pricing.childrenCount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500 dark:text-zinc-400">Niños ({pricing.childrenCount} x ${pricing.basePricePerChild})</span>
            <span className="font-medium text-zinc-900 dark:text-white">${pricing.childrenTotal.toLocaleString('en-US')}</span>
          </div>
        )}

        <div className="flex justify-between text-sm pt-2">
          <span className="text-zinc-900 dark:text-white font-medium">Subtotal</span>
          <span className="font-medium text-zinc-900 dark:text-white">${pricing.subtotal.toLocaleString('en-US')}</span>
        </div>

        {pricing.groupDiscountAmount > 0 && (
          <div className="flex justify-between text-sm text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-950/30 p-2 rounded-lg mt-2">
            <span className="flex items-center gap-1.5">
              <Ticket className="w-3.5 h-3.5" /> 
              Descuento Grupo ({(pricing.groupDiscountPercentage * 100).toFixed(0)}%)
            </span>
            <span>-${pricing.groupDiscountAmount.toLocaleString('en-US')}</span>
          </div>
        )}

        {/* 10% Affiliate Referral Discount Display */}
        {hasAffiliateDiscount && (
          <div className="flex justify-between text-sm text-amber-700 dark:text-amber-300 font-bold bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-800/40 p-2.5 rounded-xl mt-2">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Descuento Embajador (@{affiliateRef}) 10% OFF
            </span>
            <span>-${affiliateDiscountAmount.toLocaleString('en-US')}</span>
          </div>
        )}
      </div>

      <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 flex items-end justify-between mb-8" suppressHydrationWarning>
        <div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium uppercase tracking-wider mb-1">Total a Pagar</p>
          <div className="flex items-center gap-1">
            <span className="text-sm font-semibold text-zinc-400">USD</span>
            <span className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
              ${finalPayableTotal.toLocaleString('en-US')}
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={onContinue}
        disabled={!canContinue}
        className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-600 hover:to-teal-500 text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-emerald-900/30 transition-all duration-300 hover:scale-[1.02] active:scale-95 group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer border-none"
      >
        <span>Proceder al Pago Seguro</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>

      <p className="text-[11px] text-zinc-400 text-center mt-4 flex items-center justify-center gap-1">
        <Info className="w-3 h-3" /> No se realizará ningún cargo aún.
      </p>
    </div>
  );
}
