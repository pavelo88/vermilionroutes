'use client';

import React from 'react';
import { PricingDetails } from '@/lib/pricing';
import { Tour } from '@/types';
import { Users, Info, ArrowRight, Wallet, CalendarDays, Ticket } from 'lucide-react';

interface PriceCalculatorProps {
  tour: Tour | null;
  pricing: PricingDetails;
  date: string | null;
  onContinue: () => void;
  canContinue: boolean;
  step: number;
}

export function PriceCalculator({ tour, pricing, date, onContinue, canContinue, step }: PriceCalculatorProps) {
  if (!tour) {
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

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-xl sticky top-24">
      <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-white mb-6">
        Resumen de tu viaje
      </h3>

      <div className="space-y-4 mb-8">
        <div className="flex gap-4 items-start">
          <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-zinc-100">
            <img src={tour.imageUrl} alt={tour.title} className="w-full h-full object-cover" />
          </div>
          <div>
            <h4 className="font-semibold text-zinc-900 dark:text-white line-clamp-2">{tour.title}</h4>
            <p className="text-xs text-zinc-500 mt-1">{tour.duration} • {tour.destination}</p>
          </div>
        </div>

        {date && (
          <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-950 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800">
            <CalendarDays className="w-4 h-4 text-emerald-600" />
            <span className="font-medium text-zinc-900 dark:text-zinc-300">
              {new Date(date).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
        )}
      </div>

      <div className="space-y-3 pt-6 border-t border-zinc-100 dark:border-zinc-800/80 mb-6">
        {pricing.adultsCount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500">Adultos ({pricing.adultsCount} x ${pricing.basePricePerAdult})</span>
            <span className="font-medium text-zinc-900 dark:text-white">${pricing.adultsTotal.toLocaleString()}</span>
          </div>
        )}
        
        {pricing.childrenCount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500">Niños ({pricing.childrenCount} x ${pricing.basePricePerChild})</span>
            <span className="font-medium text-zinc-900 dark:text-white">${pricing.childrenTotal.toLocaleString()}</span>
          </div>
        )}

        <div className="flex justify-between text-sm pt-2">
          <span className="text-zinc-900 dark:text-white font-medium">Subtotal</span>
          <span className="font-medium text-zinc-900 dark:text-white">${pricing.subtotal.toLocaleString()}</span>
        </div>

        {pricing.groupDiscountAmount > 0 && (
          <div className="flex justify-between text-sm text-emerald-600 font-medium bg-emerald-50 dark:bg-emerald-950/30 p-2 rounded-lg mt-2">
            <span className="flex items-center gap-1.5">
              <Ticket className="w-3.5 h-3.5" /> 
              Descuento Grupo ({(pricing.groupDiscountPercentage * 100).toFixed(0)}%)
            </span>
            <span>-${pricing.groupDiscountAmount.toLocaleString()}</span>
          </div>
        )}
      </div>

      <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 flex items-end justify-between mb-8">
        <div>
          <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider mb-1">Total a Pagar</p>
          <div className="flex items-center gap-1">
            <span className="text-sm font-semibold text-zinc-400">USD</span>
            <span className="text-3xl font-bold text-emerald-600">${pricing.total.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <button
        onClick={onContinue}
        disabled={!canContinue}
        className="w-full bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 dark:text-zinc-900 text-white font-bold py-4 px-6 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
      >
        Proceder al Pago Seguro
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>

      <p className="text-[11px] text-zinc-400 text-center mt-4 flex items-center justify-center gap-1">
        <Info className="w-3 h-3" /> No se realizará ningún cargo aún.
      </p>
    </div>
  );
}
