'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { ArrowRight, Percent, Sparkles, Award } from 'lucide-react';

export default function AffiliateRegistration() {
  const locale = useLocale();

  return (
    <section className="relative py-16 md:py-20 overflow-hidden bg-stone-950 border-t border-white/5">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-light text-white mb-4 tracking-tight">
              Embajadores <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">Vermilion</span>
            </h2>
            <p className="text-base text-zinc-400 max-w-2xl mx-auto">
              El programa de comisiones y participaciones globales más justo de Sudamérica.
            </p>
          </div>

          {/* 3-Column Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            
            {/* Beneficio 1 */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 text-center hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 mb-4">
                <Percent className="w-6 h-6 text-emerald-400" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">10% OFF a Clientes</h4>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Tus referidos obtienen automáticamente un 10% de descuento en todos los tours con tu código.
              </p>
            </div>

            {/* Beneficio 2 */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 text-center hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 mb-4">
                <Sparkles className="w-6 h-6 text-amber-400" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">10% de Comisión</h4>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Ganas el 10% en efectivo por cada venta directa. Sin topes, en dólares.
              </p>
            </div>

            {/* Beneficio 3 */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 text-center hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 mb-4">
                <Award className="w-6 h-6 text-blue-400" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Fondo Global (6%)</h4>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Recibe acciones acumulables de las ventas globales de la empresa ($3k, $7k y $15k).
              </p>
            </div>

          </div>

          {/* CTA Button -> Redirige a la nueva presentación & simulador */}
          <div className="flex justify-center">
            <Link href={`/${locale}/presentation`} className="block w-full sm:w-auto">
              <button className="w-full sm:w-auto relative group overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500 to-amber-700 p-[1px] shadow-2xl shadow-amber-900/30 cursor-pointer">
                <div className="relative bg-zinc-950 hover:bg-black/0 transition-colors duration-500 py-4 px-10 rounded-[15px] flex items-center justify-center gap-3">
                  <span className="text-white font-bold tracking-wide uppercase text-sm">Descubre el Plan de Pagos</span>
                  <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
