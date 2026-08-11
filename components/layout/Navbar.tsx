'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
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

import { getLocalizedText } from '@/utils/i18nHelper';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [destinationsOpen, setDestinationsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { settings } = useSettings();
  const locale = useLocale();
  const t = useTranslations('contact');
  const pathname = usePathname();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [showGTranslate, setShowGTranslate] = useState(false);
  const { theme, setTheme } = useTheme();

  const LOCALES = [
    { code: 'en', label: 'English', flagUrl: 'https://flagcdn.com/us.svg' },
    { code: 'es', label: 'Español', flagUrl: 'https://flagcdn.com/es.svg' },
    { code: 'fr', label: 'Français', flagUrl: 'https://flagcdn.com/fr.svg' },
    { code: 'de', label: 'Deutsch', flagUrl: 'https://flagcdn.com/de.svg' },
    { code: 'zh', label: '中文', flagUrl: 'https://flagcdn.com/cn.svg' },
    { code: 'it', label: 'Italiano', flagUrl: 'https://flagcdn.com/it.svg' },
    { code: 'pt', label: 'Português', flagUrl: 'https://flagcdn.com/pt.svg' },
    { code: 'ja', label: '日本語', flagUrl: 'https://flagcdn.com/jp.svg' },
  ];

  const changeLanguage = (newLocale: string) => {
    setLangOpen(false);
    if (newLocale === 'other') {
      setShowGTranslate(true);
      return;
    }

    // Native next-intl navigation
    // Strip the current locale from pathname and append the new one
    const pathWithoutLocale = pathname.replace(new RegExp(`^/${locale}`), '') || '/';
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };



  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    // Removed legacy cookie check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tNav = useTranslations('nav');

  const navLinks = [
    { name: tNav('home'), href: `/${locale}` },
    {
      name: tNav('destinations'),
      href: `/${locale}#destinations`,
      hasDropdown: true,
      subItems: [
        { name: tNav('galapagos'), href: `/${locale}#galapagos`, desc: 'Premium Cruises & Island Hopping' },
        { name: tNav('ecuador'), href: `/${locale}#ecuador`, desc: 'Avenue of Volcanoes & Amazon' },
        { name: tNav('peru'), href: `/${locale}#peru`, desc: 'Cusco, Sacred Valley & Machu Picchu' },
      ],
    },
    { name: tNav('tours'), href: `/${locale}#tours` },
    { name: tNav('about'), href: `/${locale}#experience` },
    { name: tNav('contact'), href: `/${locale}#contact` },
  ];

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
    if (href.includes('#')) {
      const hash = href.split('#')[1];
      const el = document.getElementById(hash);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth' });
        setMobileMenuOpen(false);
        setDestinationsOpen(false);
        return;
      }
    }
    setMobileMenuOpen(false);
    setDestinationsOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex flex-col">
      {/* Top Banner (Desaparece al hacer scroll hacia abajo) */}
      <div
        className={`transition-all duration-500 overflow-hidden border-b bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-800 text-white border-emerald-800/80 ${
          isScrolled ? 'max-h-0 opacity-0 py-0 border-none' : 'max-h-24 sm:max-h-16 opacity-100 py-2.5 sm:py-2 px-4 sm:px-8 pb-3 sm:pb-2'
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-6">
            <a
              href={`tel:${getLocalizedText(settings?.contact?.phone, locale) || '+593994048458'}`}
              className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-300" />
              <span className="text-white">{getLocalizedText(settings?.contact?.phone, locale) || '+593 99 404 8458'}</span>
            </a>
            <a
              href={`mailto:${getLocalizedText(settings?.contact?.email, locale) || 'info@vermilionroutes.com'}`}
              className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors hidden md:flex"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-300" />
              <span className="text-white">{getLocalizedText(settings?.contact?.email, locale) || 'info@vermilionroutes.com'}</span>
            </a>
          </div>
          <div className="flex items-center gap-4 text-xs mb-1 sm:mb-0">
            <span className="text-emerald-100 hidden lg:inline">
              {tNav('banner.tagline')}
            </span>
            <div className="flex items-center gap-1 text-emerald-100 font-medium bg-emerald-950/50 px-2.5 py-1 rounded-full border border-emerald-700/60 shadow-sm">
              <Sparkles className="w-3 h-3 text-emerald-300" />
              <span>{tNav('banner.badge')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 
        Main Sticky Header 
        * CONTROLA LA ALTURA / PADDING VERTICAL DEL NAVBAR AQUÍ *
        py-1.5 = altura mínima. Para más altura, cambia 'py-1.5' a 'py-2.5', 'py-3' o 'py-4'.
      */}
      <header
        className={`transition-all duration-300 backdrop-blur-md border-b border-white/20 dark:border-zinc-800/30 ${
          isScrolled ? 'pt-2.5 pb-2 sm:py-1 shadow-sm bg-[#F9F6F0]/50 dark:bg-[#05140C]/75' : 'pt-3 pb-2.5 sm:py-1.5 bg-[#F9F6F0]/35 dark:bg-[#05140C]/55'
        }`}
      >
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-3 relative z-10 group notranslate">
            <div className="relative w-[165px] h-[40px] sm:w-[180px] sm:h-[45px] md:w-[220px] md:h-[55px] shrink-0">
              {/* Light Mode Logo */}
              <Image
                src="/logo_claro.png"
                alt="Vermilion Routes"
                fill
                sizes="(max-width: 640px) 180px, 200px"
                className="object-contain transition-transform group-hover:scale-105 block dark:hidden"
                priority
                unoptimized
              />
              {/* Dark Mode Logo */}
              <Image
                src="/logo_obscuro.png"
                alt="Vermilion Routes"
                fill
                sizes="(max-width: 640px) 180px, 200px"
                className="object-contain transition-transform group-hover:scale-105 hidden dark:block"
                priority
                unoptimized
              />
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
                      onClick={(e) => handleAnchorClick(e, link.href)}
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
                              onClick={(e) => handleAnchorClick(e, sub.href)}
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
                  onClick={(e) => handleAnchorClick(e, link.href)}
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
                <div className="relative">
                  <button
                    suppressHydrationWarning
                    onClick={() => { setLangOpen(!langOpen); if (langOpen) setShowGTranslate(false); }}
                    className="flex items-center gap-2 px-3 py-2 text-xs font-semibold bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700 rounded-xl cursor-pointer transition-colors"
                  >
                    <Globe className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="uppercase">{locale} / USD</span>
                  </button>
                  <div className={`absolute top-full right-0 pt-2 w-52 z-50 notranslate ${langOpen ? 'block' : 'hidden'}`}>
                    <div className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl rounded-2xl p-2 shadow-2xl border border-zinc-200/90 dark:border-zinc-800 max-h-[70vh] overflow-y-auto">
                      <div className="flex flex-col gap-1">
                        {LOCALES.map((l) => (
                          <button
                            key={l.code}
                            onClick={() => changeLanguage(l.code)}
                            className={`flex items-center gap-3 text-sm text-left px-3 py-2.5 rounded-lg font-medium transition-colors ${locale === l.code
                              ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                              : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                              }`}
                          >
                            <img src={l.flagUrl} alt={l.code} className="w-5 h-auto rounded-[2px] shadow-sm" />
                            <span>{l.label}</span>
                          </button>
                        ))}
                      </div>
                      <div className="pt-2 mt-2 border-t border-zinc-100 dark:border-zinc-800 flex flex-col gap-2">
                        <button
                          onClick={() => setShowGTranslate(true)}
                          className={`w-full text-xs text-center px-3 py-2 rounded-lg font-semibold text-zinc-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors ${showGTranslate ? 'hidden' : 'block'}`}
                        >
                          More Languages...
                        </button>

                        <div className={`p-1 animate-in fade-in duration-300 ${showGTranslate ? 'block' : 'hidden'}`}>
                          <span className="text-[10px] uppercase font-bold text-emerald-600 block mb-2 text-center">Powered by Google</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Backdrop to close menu when clicking outside */}
                {langOpen && (
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => { setLangOpen(false); setShowGTranslate(false); }}
                  />
                )}
              </>
            )}
            <Button
              variant="primary"
              size="sm"
              className="shadow-md shadow-emerald-600/15"
              onClick={(e) => handleAnchorClick(e, `/${locale}#contact`)}
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
                <div className="relative">
                  <button
                    onClick={() => { setLangOpen(!langOpen); if (langOpen) setShowGTranslate(false); }}
                    suppressHydrationWarning
                    className="flex items-center gap-1.5 p-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700 rounded-xl cursor-pointer transition-colors"
                  >
                    <Globe className="w-4 h-4 text-emerald-600" />
                    <span className="uppercase">{locale}</span>
                  </button>
                  <div className={`absolute top-full right-0 pt-2 w-52 z-50 notranslate ${langOpen ? 'block' : 'hidden'}`}>
                    <div className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl rounded-2xl p-2 shadow-2xl border border-zinc-200/90 dark:border-zinc-800 max-h-[70vh] overflow-y-auto">
                      <div className="flex flex-col gap-1">
                        {LOCALES.map((l) => (
                          <button
                            key={l.code}
                            onClick={() => changeLanguage(l.code)}
                            className={`flex items-center gap-3 text-sm text-left px-3 py-2.5 rounded-lg font-medium transition-colors ${locale === l.code
                              ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                              : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                              }`}
                          >
                            <img src={l.flagUrl} alt={l.code} className="w-5 h-auto rounded-[2px] shadow-sm" />
                            <span>{l.label}</span>
                          </button>
                        ))}
                      </div>
                      <div className="pt-2 mt-2 border-t border-zinc-100 dark:border-zinc-800 flex flex-col gap-2">
                        <button
                          onClick={() => setShowGTranslate(true)}
                          className={`w-full text-xs text-center px-3 py-2 rounded-lg font-semibold text-zinc-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors ${showGTranslate ? 'hidden' : 'block'}`}
                        >
                          More Languages...
                        </button>

                        <div className={`p-1 animate-in fade-in duration-300 ${showGTranslate ? 'block' : 'hidden'}`}>
                          <span className="text-[10px] uppercase font-bold text-emerald-600 block mb-2 text-center">Powered by Google</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
                    onClick={(e) => handleAnchorClick(e, link.href)}
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
                          onClick={(e) => handleAnchorClick(e, sub.href)}
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
                onClick={(e) => handleAnchorClick(e, `/${locale}#contact`)}
              >
                Request Custom Itinerary
              </Button>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
