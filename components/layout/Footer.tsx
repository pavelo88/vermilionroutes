'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import {
  Compass,
  Mail,
  Phone,
  MapPin,
  Send,
  Instagram,
  Facebook,
  Youtube,
  ShieldCheck,
  Award,
  Sparkles
} from 'lucide-react';
import { useSettings } from '@/hooks/useSettings';

export function Footer() {
  const { settings } = useSettings();

  return (
    <footer className="bg-zinc-950 text-zinc-300 pt-16 pb-8 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-zinc-800/80">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-5">
            <a href="#" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-600/30">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <span className="font-serif font-bold text-2xl text-white tracking-tight leading-none block">
                  {settings?.footer?.logoText || 'VERMILION'}
                </span>
                <span className="text-[10px] uppercase font-semibold tracking-widest text-emerald-400">
                  {settings?.footer?.logoSubtitle || 'SOUTH AMERICAN ROUTES'}
                </span>
              </div>
            </a>

            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
              {settings?.footer?.description || 'South America specialists crafting tailor-made private journeys, Galapagos luxury cruises, Amazon rainforest expeditions, and Andean cultural discoveries.'}
            </p>

            <div className="flex items-center gap-3 pt-2">
              {settings?.contact?.facebook && (
                <a
                  href={settings.contact.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-xl bg-zinc-900 hover:bg-emerald-600/20 hover:text-emerald-400 border border-zinc-800 flex items-center justify-center text-zinc-400 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {settings?.contact?.instagram && (
                <a
                  href={settings.contact.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-xl bg-zinc-900 hover:bg-emerald-600/20 hover:text-emerald-400 border border-zinc-800 flex items-center justify-center text-zinc-400 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {settings?.contact?.tripadvisor && (
                <a
                  href={settings.contact.tripadvisor}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-xl bg-zinc-900 hover:bg-emerald-600/20 hover:text-emerald-400 border border-zinc-800 flex items-center justify-center text-zinc-400 transition-colors"
                  aria-label="TripAdvisor"
                >
                  <Sparkles className="w-4 h-4 text-amber-500" />
                </a>
              )}
            </div>
          </div>

          {/* Destinations */}
          <div className="space-y-4">
            <h4 className="font-serif font-semibold text-lg text-white tracking-wide">
              Top Destinations
            </h4>
            <ul className="space-y-2.5 text-sm text-zinc-400">
              <li>
                <a href="/#galapagos" className="hover:text-emerald-400 transition-colors">
                  Galapagos Islands
                </a>
              </li>
              <li>
                <a href="/#ecuador" className="hover:text-emerald-400 transition-colors">
                  Mainland Ecuador
                </a>
              </li>
              <li>
                <a href="/#peru" className="hover:text-emerald-400 transition-colors">
                  Cusco & Machu Picchu
                </a>
              </li>
              <li>
                <a href="/#tours" className="hover:text-emerald-400 transition-colors">
                  Ecuadorian Amazon
                </a>
              </li>
              <li>
                <a href="/#tours" className="hover:text-emerald-400 transition-colors">
                  Avenue of Volcanoes
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-serif font-semibold text-lg text-white tracking-wide">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm text-zinc-400">
              <li>
                <a href="/#about-us" className="hover:text-emerald-400 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/#tours" className="hover:text-emerald-400 transition-colors">
                  Tour Packages
                </a>
              </li>
              <li>
                <a href="/#contact" className="hover:text-emerald-400 transition-colors">
                  Contact Specialist
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter / Quick Contact */}
          <div className="space-y-4">
            <h4 className="font-serif font-semibold text-lg text-white tracking-wide">
              Get Travel Updates
            </h4>
            <p className="text-xs text-zinc-400">
              Subscribe to receive seasonal Galapagos luxury cruise promotions and curated travel guides.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  suppressHydrationWarning
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <Button variant="primary" size="sm" className="w-full text-xs" suppressHydrationWarning>
                <Send className="w-3.5 h-3.5 mr-1" /> Subscribe
              </Button>
            </form>

            <div className="pt-2 space-y-2 text-xs text-zinc-400">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" /> {settings?.contact?.phone || '+593 99 404 8458'}
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400" /> {settings?.contact?.email || 'info@vermilionroutes.com'}
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" /> {settings?.contact?.address || 'Quito, Ecuador • South America'}
              </p>
            </div>
          </div>
        </div>

        {/* Guarantees & Badges */}
        <div className="py-8 flex flex-wrap justify-between items-center gap-6 border-b border-zinc-800/80 text-xs text-zinc-400">
          <div className="flex items-center gap-2 bg-zinc-900/60 border border-zinc-800/80 px-4 py-2 rounded-2xl">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>Fully Licensed & Certified Tour Operator in Ecuador & Peru</span>
          </div>
          <div className="flex items-center gap-2 bg-zinc-900/60 border border-zinc-800/80 px-4 py-2 rounded-2xl">
            <Award className="w-5 h-5 text-emerald-400" />
            <span>24/7 Dedicated Trip Specialist Support En Route</span>
          </div>
          <div className="flex items-center gap-2 bg-zinc-900/60 border border-zinc-800/80 px-4 py-2 rounded-2xl">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <span>Secure Bookings & 100% Satisfaction Guarantee</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500">
          <p>{settings?.footer?.copyright || `© ${new Date().getFullYear()} Vermilion Routes. All Rights Reserved.`}</p>
          <div className="flex gap-6">
            <a href="#privacy" className="hover:text-zinc-300 transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-zinc-300 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
