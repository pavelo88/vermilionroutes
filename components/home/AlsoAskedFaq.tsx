'use client';

import React, { useState } from 'react';
import { useSettings } from '@/hooks/useSettings';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

export function AlsoAskedFaq() {
  const { settings } = useSettings();
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const faqs = settings?.faq || [];

  if (faqs.length === 0) return null;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/50 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Common Traveler Searches - Also Asked</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight">
          Planning Your South America Journey
        </h2>
        <p className="text-sm text-zinc-500 max-w-xl mx-auto">
          We answer the most common questions searched by premium travelers planning expeditions to the Galapagos Islands, Ecuador, and Peru.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((item: any, idx: number) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="bg-white dark:bg-zinc-900/80 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                suppressHydrationWarning
                className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left font-semibold text-zinc-900 dark:text-white hover:text-emerald-700 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-3 text-sm sm:text-base">
                  <HelpCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>{item.question}</span>
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-emerald-600' : ''
                  }`}
                />
              </button>

              <div
                className={`transition-all duration-300 ease-in-out ${
                  isOpen ? 'max-h-[300px] border-t border-zinc-100 dark:border-zinc-800/50 opacity-100' : 'max-h-0 opacity-0'
                } overflow-hidden`}
              >
                <div className="p-6 text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed bg-zinc-50 dark:bg-zinc-900/50/50">
                  {item.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
