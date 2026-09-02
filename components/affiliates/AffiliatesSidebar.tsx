'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { auth } from '@/lib/firebase';
import { signOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import {
  LayoutDashboard,
  TrendingUp,
  Network,
  Banknote,
  UserCircle,
  BookOpen,
  Menu,
  X,
  Sun,
  Moon,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import { getAffiliateByEmail, AffiliateAccount } from '@/lib/affiliates';

const LOCALES = [
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', label: 'Português', flag: '🇵🇹' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
];

export default function AffiliatesSidebar() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const isEs = locale === 'es';

  const [mounted, setMounted] = useState(false);
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [affiliateData, setAffiliateData] = useState<AffiliateAccount | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user && user.email) {
        try {
          const aff = await getAffiliateByEmail(user.email);
          setAffiliateData(aff);
        } catch {
          setAffiliateData(null);
        }
      } else {
        setAffiliateData(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    if (auth) {
      try {
        await signOut(auth);
      } catch (e) {
        console.warn('Sign out error', e);
      }
    }
    setAffiliateData(null);
    setCurrentUser(null);
    router.push(`/${locale}/presentation?login=true`);
  };

  const changeLanguage = (newLocale: string) => {
    setLangOpen(false);
    const pathWithoutLocale = pathname.replace(new RegExp(`^/${locale}`), '') || '/';
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  const currentLang = LOCALES.find((l) => l.code === locale) || LOCALES[0];

  const NAV_ITEMS = [
    {
      labelEs: 'Mi Panel',
      labelEn: 'Dashboard',
      href: `/${locale}/affiliates/dashboard`,
      icon: LayoutDashboard,
    },
    {
      labelEs: 'Mis Ventas',
      labelEn: 'My Sales',
      href: `/${locale}/affiliates/earnings`,
      icon: TrendingUp,
    },
    {
      labelEs: 'Mi Red',
      labelEn: 'My Network',
      href: `/${locale}/affiliates/network`,
      icon: Network,
    },
    {
      labelEs: 'Retiros',
      labelEn: 'Withdrawals',
      href: `/${locale}/affiliates/withdrawals`,
      icon: Banknote,
    },
    {
      labelEs: 'Mi Perfil',
      labelEn: 'My Profile',
      href: `/${locale}/affiliates/profile`,
      icon: UserCircle,
    },
    {
      labelEs: 'Recursos de Venta',
      labelEn: 'Sales Resources',
      href: `/${locale}/affiliates/resources`,
      icon: BookOpen,
    },
  ];

  const isActive = (href: string) =>
    pathname === href || (href !== `/${locale}` && pathname.startsWith(href));

  // ── SIDEBAR CONTENT (SOLO PARA USUARIOS AUTENTICADOS) ─────────────────────
  const SidebarBody = () => {
    const displayName = affiliateData?.name || (currentUser?.email ? currentUser.email.split('@')[0] : 'Embajador');
    const displayUsername = affiliateData?.username || (currentUser?.email ? currentUser.email.split('@')[0] : 'embajador');
    const displayRank = affiliateData?.rank || 'Embajador';
    const initial = displayName.charAt(0).toUpperCase();

    return (
      <div className="flex flex-col h-full justify-between p-6">
        
        {/* Top Section: Brand + Real User Profile Card */}
        <div className="space-y-6">
          {/* Brand Logo */}
          <Link href={`/${locale}/affiliates/dashboard`} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center shrink-0">
              <img src="/favicon.ico" alt="Vermilion" className="w-6 h-6 object-contain" />
            </div>
            <div>
              <span className="font-serif text-base font-bold text-zinc-900 dark:text-white tracking-wide block">
                Vermilion <span className="font-normal text-[#C9A84C]">Afiliados</span>
              </span>
              <span className="text-[9px] text-[#A9A9A9] uppercase tracking-[0.2em] block font-sans mt-0.5">
                Portal Embajadores
              </span>
            </div>
          </Link>

          {/* Real User Profile Card */}
          <div className="p-4 rounded-[20px] bg-white/[0.03] dark:bg-white/[0.03] border border-white/10 backdrop-blur-sm space-y-3 relative overflow-hidden group">
            {/* Subtle glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#C9A84C]/5 to-transparent" />
            
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#C9A84C] to-[#8B6914] flex items-center justify-center text-[#0A0A0F] font-serif text-lg shrink-0 shadow-lg shadow-[#C9A84C]/10">
                {initial}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-xs text-zinc-900 dark:text-white truncate">{displayName}</p>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" title="Activo" />
                </div>
                <p className="text-[10px] text-[#A9A9A9] tracking-wider font-medium">@{displayUsername}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between relative z-10">
              <span className="text-[9px] uppercase tracking-[0.15em] text-[#6B6B6B] font-semibold">Rango</span>
              <span className="text-[9px] font-bold text-[#C9A84C] uppercase tracking-wider">
                {displayRank}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-[11px] uppercase tracking-wide font-semibold transition-all duration-300 ${
                    active
                      ? 'bg-white/5 dark:bg-white/10 border border-white/10 text-zinc-900 dark:text-white shadow-sm backdrop-blur-md'
                      : 'border border-transparent text-[#6B6B6B] hover:text-zinc-900 dark:hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-zinc-900 dark:text-white' : 'text-[#4A4A4A]'}`} />
                  <span>{isEs ? item.labelEs : item.labelEn}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="space-y-3 pt-6 border-t border-white/10">
          
          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangOpen(!langOpen)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-white/[0.02] border border-white/10 text-xs text-zinc-900 dark:text-white hover:bg-white/5 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <span className="text-base leading-none">{currentLang.flag}</span>
                <span className="font-semibold uppercase tracking-widest text-[11px]">{locale}</span>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-[#6B6B6B] transition-transform ${langOpen ? 'rotate-180' : ''}`} />
            </button>

            {langOpen && (
              <div className="absolute bottom-full mb-2 left-0 right-0 bg-[#0A0A0F] border border-white/10 rounded-[20px] shadow-2xl overflow-hidden py-2 z-50 animate-fade-in backdrop-blur-xl">
                {LOCALES.map((l) => (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => changeLanguage(l.code)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-[11px] text-left transition-colors font-semibold uppercase tracking-widest ${
                      locale === l.code
                        ? 'bg-white/10 text-white'
                        : 'text-[#6B6B6B] hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span className="text-base leading-none">{l.flag}</span>
                    <span>{l.code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle + Logout Button */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-3 rounded-2xl bg-white/[0.02] border border-white/10 text-[#6B6B6B] hover:text-white hover:bg-white/5 transition-all duration-300 flex-shrink-0"
              title="Alternar Tema"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            
            <button
              onClick={handleLogout}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl border border-white/5 bg-white/[0.01] text-[#6B6B6B] hover:text-white hover:bg-white/5 transition-all duration-300 text-[11px] uppercase tracking-wider font-semibold group"
            >
              <LogOut className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>{isEs ? 'Cerrar Sesión' : 'Sign Out'}</span>
            </button>
          </div>
        </div>

      </div>
    );
  };

  return (
    <>
      {/* ── DESKTOP FIXED SIDEBAR (lg and up) ─────────────────────────────── */}
      <aside className="hidden lg:flex fixed top-0 left-0 bottom-0 w-72 bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-white/10 z-40 flex-col overflow-y-auto">
        <SidebarBody />
      </aside>

      {/* ── MOBILE TOP BAR (Hidden on lg) ─────────────────────────────────── */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-200 dark:border-white/10 z-50 px-4 flex items-center justify-between">
        <Link href={`/${locale}/affiliates/dashboard`} className="flex items-center gap-2">
          <img src="/favicon.ico" alt="Vermilion" className="w-7 h-7 object-contain" />
          <span className="font-serif text-sm font-bold text-zinc-900 dark:text-white">
            Vermilion <span className="text-amber-500 font-medium">Afiliados</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg text-zinc-500 dark:text-zinc-400"
            aria-label="Toggle theme"
          >
            {mounted && theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 text-zinc-800 dark:text-white"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* ── MOBILE DRAWER ─────────────────────────────────────────────────── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden animate-fade-in">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute top-0 left-0 bottom-0 w-72 bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-white/10 shadow-2xl flex flex-col z-10">
            <div className="p-4 border-b border-zinc-200 dark:border-white/10 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Menú Embajador</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <SidebarBody />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
