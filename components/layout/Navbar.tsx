'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import {
  Compass,
  Menu,
  X,
  Phone,
  Mail,
  ChevronDown,
  Globe,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useSettings } from '@/hooks/useSettings';
import { useLanguage } from '@/context/LanguageContext';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [destinationsOpen, setDestinationsOpen] = useState(false);
  const { settings } = useSettings();
  const { lang, toggleLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.home'), href: '/' },
    {
      name: t('nav.destinations'),
      href: '/#destinations',
      hasDropdown: true,
      subItems: [
        { name: t('nav.galapagos'), href: '/#galapagos', desc: t('nav.galapagos.desc') },
        { name: t('nav.ecuador'), href: '/#ecuador', desc: t('nav.ecuador.desc') },
        { name: t('nav.peru'), href: '/#peru', desc: t('nav.peru.desc') },
      ],
    },
    { name: t('nav.tours'), href: '/#tours' },
    { name: t('nav.about'), href: '/#about-us' },
    { name: t('nav.contact'), href: '/#contact' },
  ];

  return (
    <>
      {/* Top Banner */}
      <div className="bg-zinc-950 text-zinc-300 text-xs py-2 px-4 sm:px-8 border-b border-zinc-800/80">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-6">
            <a
              href={`tel:${settings?.contact?.phone || '+593994048458'}`}
              className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-500" />
              <span>{settings?.contact?.phone || '+593 99 404 8458'}</span>
            </a>
            <a
              href={`mailto:${settings?.contact?.email || 'info@vermilionroutes.com'}`}
              className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors hidden md:flex"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-500" />
              <span>{settings?.contact?.email || 'info@vermilionroutes.com'}</span>
            </a>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="text-zinc-400 hidden lg:inline">
              {t('nav.banner.tagline')}
            </span>
            <div className="flex items-center gap-1 text-emerald-400 font-medium bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800/60">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span>{t('nav.banner.badge')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md shadow-md border-b border-zinc-200/80 py-3'
            : 'bg-white/80 backdrop-blur-sm border-b border-zinc-200/50 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-600/25 group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-xl sm:text-2xl text-zinc-900 tracking-tight leading-none group-hover:text-emerald-600 transition-colors">
                {settings?.footer?.logoText || 'VERMILION'}
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-widest text-emerald-600 leading-tight">
                {settings?.footer?.logoSubtitle || 'Routes & Experiences'}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 font-sans">
            {navLinks.map((link) => {
              if (link.hasDropdown) {
                return (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => setDestinationsOpen(true)}
                    onMouseLeave={() => setDestinationsOpen(false)}
                  >
                    <a
                      href={link.href}
                      className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-zinc-700 hover:text-emerald-600 rounded-xl hover:bg-zinc-100/70 transition-colors"
                    >
                      {link.name}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          destinationsOpen ? 'rotate-180 text-emerald-600' : ''
                        }`}
                      />
                    </a>

                    {/* Dropdown Menu */}
                    {destinationsOpen && (
                      <div className="absolute top-full left-0 w-80 pt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-2.5 shadow-2xl border border-zinc-200/90 ring-1 ring-black/5">
                          {link.subItems?.map((sub) => (
                            <a
                              key={sub.name}
                              href={sub.href}
                              className="flex flex-col gap-0.5 p-3 rounded-xl hover:bg-emerald-50/80 text-zinc-800 hover:text-emerald-700 transition-colors group"
                            >
                              <span className="text-sm font-semibold flex items-center justify-between">
                                {sub.name}
                                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-emerald-600" />
                              </span>
                              <span className="text-xs text-zinc-500 font-normal">
                                {sub.desc}
                              </span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-zinc-700 hover:text-emerald-600 rounded-xl hover:bg-zinc-100/70 transition-colors"
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleLang}
              className="flex items-center gap-2 px-3 py-2 text-xs font-semibold bg-white border border-zinc-200 hover:bg-zinc-50 rounded-xl cursor-pointer transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-600" />
              <span>{lang.toUpperCase()} / USD</span>
            </button>
            <Button 
              variant="primary" 
              size="sm" 
              className="shadow-md shadow-emerald-600/15"
              onClick={() => window.location.href = '/#contact'}
            >
              {t('nav.quote')}
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-2xl text-zinc-700 hover:bg-zinc-100 md:hidden border border-zinc-200/80 cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-zinc-200 bg-white/95 backdrop-blur-xl px-4 pt-3 pb-6 mt-2 space-y-3 shadow-xl">

            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <div key={link.name}>
                  <a
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2.5 rounded-xl text-base font-medium text-zinc-800 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                  >
                    {link.name}
                  </a>
                  {link.subItems && (
                    <div className="ml-4 pl-3 border-l-2 border-emerald-100 space-y-1 my-1">
                      {link.subItems.map((sub) => (
                        <a
                          key={sub.name}
                          href={sub.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block px-3 py-1.5 rounded-lg text-sm text-zinc-600 hover:text-emerald-600"
                        >
                          {sub.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="pt-3 border-t border-zinc-100 flex flex-col gap-2.5">
              <Button 
                variant="primary" 
                className="w-full"
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.location.href = '/#contact';
                }}
              >
                Request Custom Itinerary
              </Button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
