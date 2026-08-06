'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/Button';
import {
  Menu,
  X,
  Phone,
  Mail,
  ChevronDown,
  Globe,
  Sparkles,
  ArrowRight,
  Sun,
  Moon
} from 'lucide-react';
import { useSettings } from '@/hooks/useSettings';
import Image from 'next/image';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [destinationsOpen, setDestinationsOpen] = useState(false);
  const { settings } = useSettings();
  const [lang, setLang] = useState('EN');
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleLanguage = () => {
    const nextLang = lang === 'EN' ? 'ES' : 'EN';
    setLang(nextLang);
    if (typeof (window as any).doGTranslate === 'function') {
      (window as any).doGTranslate(nextLang === 'EN' ? 'en|en' : 'en|es');
    }
  };

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    // Check initial language from cookie
    if (document.cookie.includes('googtrans=/en/es')) {
      setLang('ES');
    } else {
      setLang('EN');
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    {
      name: 'Destinations',
      href: '/#destinations',
      hasDropdown: true,
      subItems: [
        { name: 'Galapagos Islands', href: '/#galapagos', desc: 'Luxury Cruises & Island Hopping' },
        { name: 'Mainland Ecuador', href: '/#ecuador', desc: 'Avenue of Volcanoes & Amazon' },
        { name: 'Mystical Peru', href: '/#peru', desc: 'Cusco, Sacred Valley & Machu Picchu' },
      ],
    },
    { name: 'Featured Tours', href: '/#tours' },
    { name: 'About Us', href: '/#about-us' },
    { name: 'Contact', href: '/#contact' },
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
              Tailor-Made Expeditions & Private Small Groups
            </span>
            <div className="flex items-center gap-1 text-emerald-400 font-medium bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800/60">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span>Exclusive Luxury Journeys</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
          ? 'glass-panel shadow-md border-b border-zinc-200/80 dark:border-zinc-800/80 py-3'
          : 'bg-white/70 dark:bg-zinc-950/50 backdrop-blur-sm border-b border-zinc-200/50 dark:border-zinc-800/50 py-4'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 relative z-10 group notranslate">
            <div className="relative w-10 h-10 shrink-0">
              <Image
                src="/icon.png"
                alt="Vermilion"
                fill
                sizes="40px"
                className="object-contain transition-transform group-hover:scale-105 invert dark:invert-0"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-xl sm:text-2xl text-zinc-900 dark:text-white tracking-tight leading-none group-hover:text-emerald-600 transition-colors">
                {settings?.footer?.logoText || 'VERMILION'}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-600 leading-tight">
                {settings?.footer?.logoSubtitle || 'SOUTH AMERICAN ROUTES'}
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
                      className="flex items-center gap-1 px-3 py-2 text-[11px] uppercase tracking-widest font-bold text-zinc-800 dark:text-zinc-200 hover:text-emerald-600 rounded-xl hover:bg-zinc-100/70 dark:hover:bg-zinc-800/50 transition-colors"
                    >
                      {link.name}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${destinationsOpen ? 'rotate-180 text-emerald-600' : ''
                          }`}
                      />
                    </a>

                    {/* Dropdown Menu */}
                    {destinationsOpen && (
                      <div className="absolute top-full left-0 w-80 pt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl rounded-2xl p-2.5 shadow-2xl border border-zinc-200/90 dark:border-zinc-800 ring-1 ring-black/5">
                          {link.subItems?.map((sub) => (
                            <a
                              key={sub.name}
                              href={sub.href}
                              className="flex flex-col gap-0.5 p-3 rounded-xl hover:bg-emerald-50/80 dark:hover:bg-emerald-900/30 text-zinc-800 dark:text-zinc-200 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors group"
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
                  className="px-3 py-2 text-[11px] uppercase tracking-widest font-bold text-zinc-800 dark:text-zinc-200 hover:text-emerald-600 rounded-xl hover:bg-zinc-100/70 dark:hover:bg-zinc-800/50 transition-colors"
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            {mounted && (
              <>
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  suppressHydrationWarning
                  className="p-2 text-zinc-600 dark:text-zinc-300 hover:text-emerald-600 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700 rounded-xl cursor-pointer transition-colors"
                  aria-label="Toggle Theme"
                >
                  {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
                <button
                  onClick={toggleLanguage}
                  suppressHydrationWarning
                  className="flex items-center gap-2 px-3 py-2 text-xs font-semibold bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700 rounded-xl cursor-pointer transition-colors"
                >
                  <Globe className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{lang} / USD</span>
                </button>
              </>
            )}
            <Button
              variant="primary"
              size="sm"
              className="shadow-md shadow-emerald-600/15"
              onClick={() => window.location.href = '/#contact'}
            >
              Request a Quote
            </Button>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-2">
            {mounted && (
              <>
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  suppressHydrationWarning
                  className="p-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700 rounded-xl cursor-pointer transition-colors"
                  aria-label="Toggle Theme"
                >
                  {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                <button
                  onClick={toggleLanguage}
                  suppressHydrationWarning
                  className="flex items-center gap-1.5 p-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700 rounded-xl cursor-pointer transition-colors"
                >
                  <Globe className="w-4 h-4 text-emerald-600" />
                  <span>{lang}</span>
                </button>
              </>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700 cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl px-4 pt-3 pb-6 mt-2 space-y-3 shadow-xl">

            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <div key={link.name}>
                  <a
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2.5 rounded-xl text-base font-medium text-zinc-800 dark:text-zinc-200 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
                  >
                    {link.name}
                  </a>
                  {link.subItems && (
                    <div className="ml-4 pl-3 border-l-2 border-emerald-100 dark:border-emerald-900/50 space-y-1 my-1">
                      {link.subItems.map((sub) => (
                        <a
                          key={sub.name}
                          href={sub.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block px-3 py-1.5 rounded-lg text-sm text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400"
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
