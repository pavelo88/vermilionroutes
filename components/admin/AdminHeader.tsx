'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/Button';
import { LogOut, Database, Layers, Menu, X, Sun, Moon, ChevronDown } from 'lucide-react';
import { User } from 'firebase/auth';

const LOCALES = [
  { code: 'en', name: 'English', flagUrl: 'https://flagcdn.com/us.svg' },
  { code: 'es', name: 'Español', flagUrl: 'https://flagcdn.com/es.svg' },
  { code: 'de', name: 'Deutsch', flagUrl: 'https://flagcdn.com/de.svg' },
];

interface AdminHeaderProps {
  user: User;
  onSignOut: () => void;
  activeTab: 'tours' | 'bookings' | 'settings' | 'links' | 'leads';
  setActiveTab: (tab: 'tours' | 'bookings' | 'settings' | 'links' | 'leads') => void;
  toursCount: number;
  bookingsCount: number;
  pendingCount: number;
}

export function AdminHeader({ user, onSignOut, activeTab, setActiveTab, toursCount }: AdminHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Theme & Locale
  const { theme, setTheme } = useTheme();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeLanguage = (newLocale: string) => {
    setLangOpen(false);
    if (newLocale === locale) return;
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  const navItems = [
    { id: 'tours' as const, label: `TOUR PACKAGES (${toursCount})`, icon: Database },
    { id: 'settings' as const, label: 'SITE CMS SETTINGS', icon: Layers }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 backdrop-blur-md border-b border-white/20 dark:border-zinc-800/30 ${
          isScrolled ? 'pt-4 pb-4 shadow-sm bg-[#F9F6F0]/90 dark:bg-[#05140C]/90' : 'pt-5 pb-5 bg-[#F9F6F0]/95 dark:bg-[#05140C]/95'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <Link href="/" aria-label="Vermilion Routes Inicio" className="relative w-[160px] h-[40px] sm:w-[180px] sm:h-[45px] shrink-0">
              <Image
                src="/logo_inicio.png"
                alt="Vermilion Routes"
                fill
                sizes="180px"
                className="object-contain"
                priority
              />
            </Link>
          </div>

          {/* Desktop Tabs */}
          <nav className="hidden md:flex items-center gap-4 font-sans ml-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all cursor-pointer relative ${
                  activeTab === item.id
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    : 'text-zinc-800 dark:text-zinc-200 hover:text-emerald-600 hover:bg-zinc-100/70 dark:hover:bg-zinc-800/50'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden sm:flex items-center gap-3 ml-auto">
            
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              suppressHydrationWarning
              className="p-2.5 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700 rounded-xl cursor-pointer transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Locale Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                suppressHydrationWarning
                className="flex items-center gap-2 p-2.5 text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700 rounded-xl cursor-pointer transition-colors"
              >
                <img
                  src={LOCALES.find((l) => l.code === locale)?.flagUrl || 'https://flagcdn.com/es.svg'}
                  alt=""
                  aria-hidden="true"
                  className="w-5 h-auto rounded-xs shadow-xs"
                />
                <span className="uppercase">{locale}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 ${langOpen ? 'rotate-180 text-emerald-600' : ''}`} />
              </button>
              
              <div className={`absolute top-full right-0 pt-2 w-48 z-50 notranslate ${langOpen ? 'block' : 'hidden'}`}>
                <div className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl rounded-2xl p-2 shadow-2xl border border-zinc-200/90 dark:border-zinc-800">
                  <div className="flex flex-col gap-1">
                    {LOCALES.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => changeLanguage(l.code)}
                        className={`flex items-center gap-3 text-sm text-left px-3 py-2.5 rounded-lg font-medium transition-colors ${
                          locale === l.code
                            ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                            : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                        }`}
                      >
                        <img src={l.flagUrl} alt="" className="w-5 h-auto rounded-xs" />
                        {l.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <Button
              onClick={onSignOut}
              variant="outline"
              size="sm"
              className="h-10 px-4 text-xs font-bold gap-2 bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 hover:text-red-600 hover:bg-red-50 dark:text-zinc-300 dark:hover:bg-red-950/30 rounded-xl"
            >
              <LogOut className="w-4 h-4" />
              SALIR
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-[#F9F6F0] dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 shadow-xl p-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                  activeTab === item.id
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    : 'text-zinc-800 dark:text-zinc-200'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            ))}
            <div className="h-px bg-zinc-200 dark:bg-zinc-800 my-2" />
            <Button onClick={onSignOut} variant="ghost" className="justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30">
              <LogOut className="w-4 h-4 mr-2" /> Salir
            </Button>
          </div>
        )}
      </header>
      {/* Backdrop for lang menu */}
      {langOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
      )}
      {/* Spacer */}
      <div className="h-[90px] sm:h-[100px]" />
    </>
  );
}
