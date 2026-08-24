'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getToursFromFirestore } from '@/lib/tours';
import { Tour } from '@/types';
import { Search, MapPin, Calendar, Compass, Sparkles, X, ArrowRight, Star, Clock } from 'lucide-react';
import { TourModal } from '@/components/tours/TourModal';
import { useLocale } from 'next-intl';
import { getLocalizedText } from '@/utils/i18nHelper';

interface SmartSearchProps {
  onSearchSelect?: (destination: string, duration: string) => void;
}

export function SmartSearch({ onSearchSelect }: SmartSearchProps) {
  const locale = useLocale();
  const [tours, setTours] = useState<Tour[]>([]);
  const [query, setQuery] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('all');
  const [selectedDuration, setSelectedDuration] = useState('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);

  useEffect(() => {
    getToursFromFirestore().then((data) => setTours(data));
  }, []);

  // Filter tours dynamically
  const filteredTours = useMemo(() => {
    return tours.filter((tour) => {
      const destText = getLocalizedText(tour.destination, locale).toLowerCase();
      const titleText = getLocalizedText(tour.title, locale).toLowerCase();
      const descText = getLocalizedText(tour.shortDescription || tour.description, locale).toLowerCase();

      // Destination filter
      if (
        selectedDestination !== 'all' &&
        !destText.includes(selectedDestination.toLowerCase())
      ) {
        return false;
      }

      // Duration filter
      const days = tour.durationDays || (typeof tour.duration === 'string' ? parseInt(tour.duration) : 5) || 5;
      if (selectedDuration === 'short' && days > 6) return false;
      if (selectedDuration === 'medium' && (days < 7 || days > 10)) return false;
      if (selectedDuration === 'long' && days < 11) return false;

      // Query search
      if (query.trim() !== '') {
        const q = query.toLowerCase();
        const matchesTitle = titleText.includes(q);
        const matchesDest = destText.includes(q);
        const matchesDesc = descText.includes(q);
        const matchesHighlights = tour.highlights
          ? tour.highlights.some((h) => getLocalizedText(h, locale).toLowerCase().includes(q))
          : false;
        return matchesTitle || matchesDest || matchesDesc || matchesHighlights;
      }

      return true;
    });
  }, [query, selectedDestination, selectedDuration]);

  const handleSearchClick = () => {
    if (onSearchSelect) {
      onSearchSelect(selectedDestination, selectedDuration);
    }
    const toursSection = document.getElementById('tours');
    if (toursSection) {
      toursSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto relative z-30">
      {/* Search Console Container */}
      <div className="bg-white/95 backdrop-blur-2xl p-4 sm:p-6 rounded-3xl border border-zinc-200/90 shadow-2xl shadow-emerald-950/10 text-left space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
          {/* Input 1: Free Text Search */}
          <div className="lg:col-span-4 flex items-center gap-3 px-4 py-3 rounded-2xl bg-zinc-50 border border-zinc-200/80 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all">
            <Search className="w-5 h-5 text-emerald-600 shrink-0" />
            <div className="w-full relative">
              <label htmlFor="smart-search-keyword" className="block text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
                Keyword or Experience
              </label>
              <input
                id="smart-search-keyword"
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setIsDropdownOpen(true);
                }}
                onFocus={() => setIsDropdownOpen(true)}
                placeholder="e.g. Galapagos cruise, Cotopaxi, Quilotoa..."
                className="w-full bg-transparent text-sm font-semibold text-zinc-800 focus:outline-none placeholder:text-zinc-400 placeholder:font-normal"
                suppressHydrationWarning
              />
              {query && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => setQuery('')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Input 2: Destination Select */}
          <div className="lg:col-span-3 flex items-center gap-3 px-4 py-3 rounded-2xl bg-zinc-50 border border-zinc-200/80 focus-within:border-emerald-500 transition-all">
            <MapPin className="w-5 h-5 text-emerald-600 shrink-0" />
            <div className="w-full">
              <label htmlFor="smart-search-destination" className="block text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
                Destination
              </label>
              <select
                id="smart-search-destination"
                aria-label="Select destination"
                value={selectedDestination}
                onChange={(e) => {
                  setSelectedDestination(e.target.value);
                  setIsDropdownOpen(true);
                }}
                className="w-full bg-transparent text-sm font-semibold text-zinc-800 focus:outline-none cursor-pointer"
                suppressHydrationWarning
              >
                <option value="all">All Destinations</option>
                <option value="galapagos">Galapagos Islands</option>
                <option value="ecuador">Mainland Ecuador</option>
                <option value="fullday">Full Day Excursions</option>
              </select>
            </div>
          </div>

          {/* Input 3: Duration Select */}
          <div className="lg:col-span-3 flex items-center gap-3 px-4 py-3 rounded-2xl bg-zinc-50 border border-zinc-200/80 focus-within:border-emerald-500 transition-all">
            <Calendar className="w-5 h-5 text-emerald-600 shrink-0" />
            <div className="w-full">
              <label htmlFor="smart-search-duration" className="block text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
                Duration
              </label>
              <select
                id="smart-search-duration"
                aria-label="Select duration"
                value={selectedDuration}
                onChange={(e) => {
                  setSelectedDuration(e.target.value);
                  setIsDropdownOpen(true);
                }}
                className="w-full bg-transparent text-sm font-semibold text-zinc-800 focus:outline-none cursor-pointer"
                suppressHydrationWarning
              >
                <option value="all">Any Duration</option>
                <option value="short">1 - 6 Days</option>
                <option value="medium">7 - 10 Days</option>
                <option value="long">11+ Days</option>
              </select>
            </div>
          </div>

          {/* Action Button */}
          <div className="lg:col-span-2">
            <button
              onClick={handleSearchClick}
              suppressHydrationWarning
              className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white rounded-2xl font-semibold text-sm shadow-md shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Search ({filteredTours.length})</span>
            </button>
          </div>
        </div>

        {/* Dynamic Quick Results Dropdown Modal */}
        {isDropdownOpen && (query || selectedDestination !== 'all' || selectedDuration !== 'all') && (
          <div className="absolute left-0 right-0 top-full mt-3 bg-white/95 backdrop-blur-2xl rounded-3xl border border-zinc-200/90 shadow-2xl p-4 sm:p-6 z-50 max-h-[420px] overflow-y-auto space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-emerald-600" />
                Matching Premium Expeditions ({filteredTours.length})
              </span>
              <button
                onClick={() => setIsDropdownOpen(false)}
                className="text-xs font-semibold text-zinc-400 hover:text-zinc-600 px-2 py-1 rounded-lg"
              >
                Close Search
              </button>
            </div>

            {filteredTours.length === 0 ? (
              <div className="text-center py-8 space-y-2">
                <p className="text-sm font-semibold text-zinc-800">No matching itineraries found</p>
                <p className="text-xs text-zinc-500">
                  Try adjusting your search criteria or contact our concierge for a bespoke trip.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredTours.slice(0, 6).map((tour) => (
                  <button
                    key={tour.id}
                    onClick={() => {
                      setIsDropdownOpen(false);
                      setSelectedTour(tour);
                    }}
                    className="flex items-center gap-3.5 p-3 rounded-2xl hover:bg-emerald-50/70 border border-transparent hover:border-emerald-200 transition-all group text-left cursor-pointer w-full outline-none"
                  >
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 shadow-sm">
                      <Image
                        src={tour.mainImage || tour.imageUrl}
                        alt={tour.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="space-y-0.5 min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] font-bold uppercase text-emerald-700 tracking-wider truncate">
                          {tour.destination}
                        </span>
                        <span className="text-xs font-serif font-bold text-zinc-900 shrink-0" suppressHydrationWarning>
                          ${(tour.priceFromUSD || tour.price).toLocaleString('en-US')} USD
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-zinc-900 group-hover:text-emerald-700 transition-colors truncate">
                        {tour.title}
                      </h4>
                      <div className="flex items-center gap-3 text-[11px] text-zinc-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-emerald-600" />
                          {tour.durationDays || tour.duration}
                        </span>
                        <span className="flex items-center gap-1 text-amber-500 font-semibold">
                          <Star className="w-3 h-3 fill-amber-400" />
                          {tour.rating}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {filteredTours.length > 6 && (
              <div className="text-center pt-2 border-t border-zinc-100">
                <button
                  onClick={handleSearchClick}
                  className="text-xs font-bold text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>View all {filteredTours.length} matching tours in catalog</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Global Tour Modal for Search Results */}
      <TourModal 
        tour={selectedTour} 
        isOpen={!!selectedTour} 
        onClose={() => setSelectedTour(null)} 
      />
    </div>
  );
}
