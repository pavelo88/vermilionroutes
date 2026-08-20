'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { Tour } from '@/types';
import { getLocalizedText } from '@/utils/i18nHelper';
import {
  X,
  Printer,
  Download,
  ShieldCheck,
  Compass,
  Calendar,
  Users,
  MapPin,
  CheckCircle2,
  Phone,
  Mail,
  QrCode,
  Sparkles
} from 'lucide-react';

interface TravelVoucherModalProps {
  isOpen: boolean;
  onClose: () => void;
  tour: Tour | null;
  clientInfo: {
    name: string;
    email: string;
    phone?: string;
    date: string;
    adults: number;
    children: number;
    refCode: string;
    hotelTier?: string;
    amountPaid?: number;
    isConfirmed?: boolean;
  };
  locale: string;
}

export function TravelVoucherModal({
  isOpen,
  onClose,
  tour,
  clientInfo,
  locale
}: TravelVoucherModalProps) {
  const printAreaRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !tour) return null;

  const handlePrint = () => {
    window.print();
  };

  const tourTitle = getLocalizedText(tour.title, locale);
  const duration = getLocalizedText(tour.duration, locale);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto font-sans">
      <div className="relative w-full max-w-3xl bg-zinc-900 border border-emerald-900/60 rounded-3xl shadow-2xl overflow-hidden my-8 text-white">
        
        {/* Top Actions Bar (Hidden during print) */}
        <div className="flex items-center justify-between px-6 py-4 bg-zinc-950 border-b border-zinc-800 print:hidden">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-200">
              Official Expedition Voucher &amp; Itinerary
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Voucher Body */}
        <div
          ref={printAreaRef}
          className="p-6 sm:p-10 space-y-8 bg-zinc-950 text-zinc-100 print:p-0 print:bg-white print:text-black print:space-y-6"
        >
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-emerald-900/50 pb-6 print:border-zinc-300">
            <div>
              <div className="flex items-center gap-2">
                <Compass className="w-6 h-6 text-emerald-500 print:text-emerald-700" />
                <span className="font-serif font-black tracking-widest uppercase text-base text-white print:text-black">
                  VERMILION ROUTES
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 print:text-zinc-600 mt-1">
                Agencia de Viajes Vermilion Cia. Ltda. • RUC: 1711992808001
              </p>
              <p className="text-[10px] text-zinc-500 print:text-zinc-500">
                Alangasí Oe 1 – 210 Simón Bolívar and Juan León Mera, Quito – Ecuador
              </p>
            </div>

            <div className="text-left sm:text-right bg-emerald-950/60 print:bg-emerald-50 p-3 rounded-2xl border border-emerald-800/60 print:border-emerald-200">
              <span className="text-[10px] uppercase font-bold text-emerald-400 print:text-emerald-700 block">
                Booking Reference Code
              </span>
              <span className="font-mono text-lg font-bold text-white print:text-black tracking-wider">
                {clientInfo.refCode || `VR-${Date.now().toString().slice(-6)}`}
              </span>
              <div className="flex items-center gap-1 text-[11px] text-emerald-300 print:text-emerald-800 mt-0.5 justify-start sm:justify-end">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Confirmed &amp; Guaranteed</span>
              </div>
            </div>
          </div>

          {/* Passenger & Trip Details Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-zinc-900/80 print:bg-zinc-100 p-5 rounded-2xl border border-zinc-800 print:border-zinc-300 text-xs">
            <div className="space-y-2">
              <p className="text-[11px] uppercase font-bold text-emerald-400 print:text-emerald-800">
                Lead Passenger
              </p>
              <p><strong className="text-white print:text-black">Full Name:</strong> {clientInfo.name || 'Valued Guest'}</p>
              <p><strong className="text-white print:text-black">Email:</strong> {clientInfo.email || 'client@vermilionroutes.com'}</p>
              <p><strong className="text-white print:text-black">Travelers:</strong> {clientInfo.adults} Adults {clientInfo.children > 0 ? `• ${clientInfo.children} Children` : ''}</p>
            </div>

            <div className="space-y-2">
              <p className="text-[11px] uppercase font-bold text-emerald-400 print:text-emerald-800">
                Expedition Dates &amp; Service Tier
              </p>
              <p><strong className="text-white print:text-black">Departure Date:</strong> {clientInfo.date || 'To be confirmed'}</p>
              <p><strong className="text-white print:text-black">Duration:</strong> {duration}</p>
              <p><strong className="text-white print:text-black">Service Level:</strong> {clientInfo.hotelTier || 'Luxury 4-Star & Boutique'}</p>
            </div>
          </div>

          {/* Tour Title & Highlights */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-white print:text-black">
              {tourTitle}
            </h2>
            <p className="text-xs text-zinc-300 print:text-zinc-700 leading-relaxed">
              {getLocalizedText(tour.description || tour.shortDescription, locale)}
            </p>
          </div>

          {/* Day-by-Day Summary */}
          {tour.itinerary && tour.itinerary.length > 0 && (
            <div className="space-y-3 pt-2">
              <h3 className="text-xs uppercase font-bold text-emerald-400 print:text-emerald-800 tracking-wider">
                Confirmed Itinerary Schedule
              </h3>
              <div className="space-y-2 text-xs">
                {tour.itinerary.map((day) => (
                  <div
                    key={day.day}
                    className="p-3 bg-zinc-900/40 print:bg-zinc-50 border border-zinc-800/60 print:border-zinc-200 rounded-xl space-y-1"
                  >
                    <div className="flex justify-between font-bold text-white print:text-black">
                      <span>Day {day.day}: {getLocalizedText(day.title, locale)}</span>
                      {day.meals && <span className="text-[11px] text-emerald-400 print:text-emerald-700">{getLocalizedText(day.meals, locale)}</span>}
                    </div>
                    <p className="text-zinc-400 print:text-zinc-600 text-[11px] leading-relaxed">
                      {getLocalizedText(day.description, locale)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Inclusions & Guarantees */}
          <div className="p-4 bg-emerald-950/40 print:bg-emerald-50 border border-emerald-900/50 print:border-emerald-200 rounded-2xl text-xs space-y-2">
            <p className="font-bold text-emerald-300 print:text-emerald-900">
              Included with your Vermilion Routes Expedition:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-zinc-300 print:text-zinc-700 text-[11px] list-disc list-inside">
              <li>Certified Bilingual Galapagos &amp; National Park Naturalist Guides</li>
              <li>All VIP private ground and maritime transfers</li>
              <li>Boutique luxury accommodations as specified</li>
              <li>Excursions, snorkeling gear &amp; private permits</li>
              <li>24/7 Dedicated Concierge Support en route</li>
            </ul>
          </div>

          {/* Footer & Emergency Concierge Hotline */}
          <div className="pt-4 border-t border-zinc-800 print:border-zinc-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs text-zinc-400 print:text-zinc-600">
            <div>
              <p className="font-semibold text-white print:text-black">24/7 Concierge &amp; WhatsApp Emergency Assistance:</p>
              <p className="text-emerald-400 print:text-emerald-700 font-mono">+593-994-048-458 &bull; info@vermilionroutes.com</p>
            </div>

            <div className="text-right text-[10px] text-zinc-500">
              <p>© {new Date().getFullYear()} Agencia de Viajes Vermilion Cia. Ltda.</p>
              <p>Issued under official Terms &amp; Conditions.</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
