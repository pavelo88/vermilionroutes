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
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
              <img src="/favicon.ico" alt="Vermilion" className="w-6 h-6 object-contain" />
            </div>
            <div>
              <span className="font-serif text-base font-bold text-zinc-900 dark:text-white tracking-tight block">
                Vermilion <span className="text-amber-500 font-medium">Afiliados</span>
              </span>
              <span className="text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-widest block font-sans">
                Portal Embajadores
              </span>
            </div>
          </Link>

          {/* Real User Profile Card */}
          <div className="p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-white/5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-black font-bold text-lg shrink-0 shadow-md shadow-amber-500/20">
                {initial}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-xs text-zinc-900 dark:text-white truncate">{displayName}</p>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" title="Conectado" />
                </div>
                <p className="text-[11px] font-mono text-amber-600 dark:text-amber-400">@{displayUsername}</p>
              </div>
            </div>

            <div className="pt-2 border-t border-zinc-200/60 dark:border-white/5 flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">Rango</span>
              <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md">
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
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    active
                      ? 'bg-amber-500 text-black shadow-md shadow-amber-900/10 font-bold'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-black' : 'text-zinc-400 dark:text-zinc-500'}`} />
                  <span>{isEs ? item.labelEs : item.labelEn}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Language (With Flag), Theme, and Logout */}
        <div className="space-y-3 pt-6 border-t border-zinc-200 dark:border-white/10">
          
          {/* Language Selector Dropdown (Con Banderita Visible) */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangOpen(!langOpen)}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/80 dark:border-white/5 text-xs text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-lg leading-none">{currentLang.flag}</span>
                <span className="font-semibold uppercase">{locale}</span>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
            </button>

            {langOpen && (
              <div className="absolute bottom-full mb-2 left-0 right-0 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden py-1.5 z-50 animate-fade-in max-h-48 overflow-y-auto">
                {LOCALES.map((l) => (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => changeLanguage(l.code)}
                    className={`w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-left transition-colors ${
                      locale === l.code
                        ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 font-bold'
                        : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/5'
                    }`}
                  >
                    <span className="text-base leading-none">{l.flag}</span>
                    <span>{l.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle + Logout Button */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              type="button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/80 dark:border-white/5 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
              title={theme === 'dark' ? 'Modo Claro' : 'Modo Oscuro'}
              aria-label="Cambiar tema"
            >
              {mounted && theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-700" />}
            </button>

            {/* Logout Button */}
            <button
              type="button"
              onClick={handleLogout}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-rose-500/30 text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 text-xs font-bold transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
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
