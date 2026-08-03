'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  const phoneNumber = '593994048458';
  const defaultMessage = encodeURIComponent(
    'Hello Vermilion Routes! I am interested in planning a luxury travel itinerary in South America.'
  );

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${defaultMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-2xl shadow-emerald-600/50 hover:scale-110 active:scale-95 transition-all duration-300 group border-2 border-white/20"
      aria-label="Contact via WhatsApp"
    >
      {/* Pulse effect rings */}
      <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-30 group-hover:opacity-50" />
      
      <MessageCircle className="w-7 h-7 relative z-10 fill-white/20 stroke-[2.2]" />

      {/* Tooltip on hover */}
      <span className="absolute right-16 bg-zinc-900 text-white text-xs font-semibold px-3 py-1.5 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-xl border border-zinc-800">
        Chat with a Travel Specialist
      </span>
    </a>
  );
}
