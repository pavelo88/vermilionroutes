'use client';

import React, { useState } from 'react';
import { ItineraryDay } from '@/types';
import {
  Calendar,
  ChevronDown,
  Utensils,
  Hotel,
  Sparkles,
  Clock,
  Compass
} from 'lucide-react';

interface TourItineraryProps {
  itinerary: ItineraryDay[];
}

export function TourItinerary({ itinerary }: TourItineraryProps) {
  const [openDays, setOpenDays] = useState<number[]>([1]); // Day 1 open by default

  const toggleDay = (day: number) => {
    if (openDays.includes(day)) {
      setOpenDays(openDays.filter((d) => d !== day));
    } else {
      setOpenDays([...openDays, day]);
    }
  };

  const expandAll = () => {
    setOpenDays(itinerary.map((item) => item.day));
  };

  const collapseAll = () => {
    setOpenDays([]);
  };

  if (!itinerary || itinerary.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Header with quick actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-zinc-200">
        <div className="space-y-1">
          <h3 className="font-serif font-bold text-2xl text-zinc-900 flex items-center gap-2.5">
            <Calendar className="w-6 h-6 text-emerald-600" />
            <span>Day-by-Day Itinerary</span>
          </h3>
          <p className="text-xs text-zinc-500">
            Explore daily activities, luxury accommodations, and included dining experiences.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <button
            onClick={expandAll}
            className="text-emerald-700 hover:text-emerald-800 font-semibold underline underline-offset-4 cursor-pointer transition-colors"
          >
            Expand All
          </button>
          <span className="text-zinc-300">•</span>
          <button
            onClick={collapseAll}
            className="text-zinc-500 hover:text-zinc-700 font-medium cursor-pointer transition-colors"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Accordion Days List */}
      <div className="space-y-3.5">
        {itinerary.map((item) => {
          const isOpen = openDays.includes(item.day);

          return (
            <div
              key={item.day}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? 'border-emerald-500/40 bg-white shadow-md shadow-emerald-950/5'
                  : 'border-zinc-200/80 bg-zinc-50/50 hover:bg-white hover:border-zinc-300'
              }`}
            >
              {/* Accordion Trigger Header */}
              <button
                onClick={() => toggleDay(item.day)}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4 cursor-pointer focus:outline-none group"
              >
                <div className="flex items-center gap-3.5 sm:gap-4 flex-1">
                  {/* Day Badge */}
                  <span
                    className={`shrink-0 w-11 h-11 rounded-2xl font-serif font-bold text-sm flex items-center justify-center transition-all ${
                      isOpen
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 scale-105'
                        : 'bg-zinc-200/80 text-zinc-700 group-hover:bg-emerald-50 group-hover:text-emerald-700'
                    }`}
                  >
                    Day {item.day}
                  </span>

                  {/* Title */}
                  <div className="space-y-1">
                    <h4 className="font-semibold text-zinc-900 text-sm sm:text-base leading-snug group-hover:text-emerald-700 transition-colors">
                      {item.title}
                    </h4>
                    {item.meals && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                        <Utensils className="w-3 h-3 text-emerald-600" />
                        {item.meals}
                      </span>
                    )}
                  </div>
                </div>

                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-zinc-500 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 bg-emerald-50 text-emerald-600' : 'bg-zinc-100 group-hover:bg-zinc-200'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {/* Accordion Content Body */}
              {isOpen && (
                <div className="px-4 pb-5 sm:px-5 sm:pb-6 pt-2 text-sm text-zinc-600 border-t border-zinc-100 space-y-4 animate-in fade-in duration-200">
                  <p className="leading-relaxed text-zinc-700 font-normal">{item.description}</p>

                  {/* Highlights if available */}
                  {item.highlights && item.highlights.length > 0 && (
                    <div className="bg-emerald-50/70 p-3.5 rounded-2xl border border-emerald-100/80 space-y-2">
                      <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider block">
                        Day Highlights:
                      </span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-emerald-900 font-medium">
                        {item.highlights.map((hl, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{hl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Accommodation & Meals meta info */}
                  <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-zinc-600 pt-2 border-t border-zinc-100">
                    {item.meals && (
                      <div className="flex items-center gap-1.5 bg-zinc-100/80 px-3 py-1 rounded-full border border-zinc-200/60">
                        <Utensils className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Dining: {item.meals}</span>
                      </div>
                    )}

                    {item.accommodation && (
                      <div className="flex items-center gap-1.5 bg-zinc-100/80 px-3 py-1 rounded-full border border-zinc-200/60">
                        <Hotel className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Stay: {item.accommodation}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
