'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import {
  Home,
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
} from 'lucide-react';

export default function AffiliatesNav() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const isEs = locale === 'es';
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    if (auth) {
      try {
        await signOut(auth);
      } catch (e) {
        console.warn('Sign out error', e);
      }
    }
    router.push(`/${locale}/affiliates`);
  };

  const NAV_ITEMS = [
    {
      labelEs: 'Inicio',
      labelEn: 'Home',
      href: `/${locale}`,
      icon: Home,
      external: true,
    },
    {
      labelEs: 'Mi Panel',
      labelEn: 'My Dashboard',
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
      labelEs: 'Recursos',
      labelEn: 'Resources',
      href: `/${locale}/affiliates/resources`,
      icon: BookOpen,
    },
  ];

  const isActive = (href: string) =>
    pathname === href || (href !== `/${locale}` && pathname.startsWith(href));

  return (
    <>
      {/* ── Desktop Navbar ──────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-200/80 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">

          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2 shrink-0">
            <img src="/favicon.ico" alt="Vermilion" className="w-8 h-8 rounded-md object-contain" />
            <span className="font-serif text-zinc-900 dark:text-white font-light tracking-tight hidden sm:block">
              Vermilion <span className="text-amber-500 font-medium">Afiliados</span>
            </span>
          </Link>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200
                    ${active
                      ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                      : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5'
                    }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{isEs ? item.labelEs : item.labelEn}</span>
                </Link>
              );
            })}
          </div>

          {/* Right controls: Ingresar + Theme toggle + Logout + Mobile burger */}
          <div className="flex items-center gap-1.5 shrink-0">
            <Link
              href={`/${locale}/affiliates#portal`}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-black transition-colors"
            >
              <span>{isEs ? 'Ingresar' : 'Login'}</span>
            </Link>

            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-xl text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors"
              aria-label="Toggle theme"
            >
              {mounted && theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 transition-colors"
              title={isEs ? 'Cerrar Sesión' : 'Sign Out'}
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isEs ? 'Salir' : 'Logout'}</span>
            </button>
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Drawer ───────────────────────────────────────────────── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          {/* Panel */}
          <div className="absolute top-0 left-0 bottom-0 w-72 bg-stone-950 border-r border-white/10 p-6 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <span className="font-serif text-white text-lg font-light">
                Vermilion <span className="text-amber-500 font-medium">Afiliados</span>
              </span>
              <button onClick={() => setMobileOpen(false)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col gap-1 flex-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                      ${active
                        ? 'bg-amber-500/15 text-amber-400 border border-amber-500/20'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                      }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{isEs ? item.labelEs : item.labelEn}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="border-t border-white/10 pt-4 mt-auto">
              <button
                onClick={() => {
                  setMobileOpen(false);
                  handleLogout();
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-rose-400 hover:bg-rose-500/10 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>{isEs ? 'Cerrar Sesión' : 'Sign Out'}</span>
              </button>
            </div>

            <p className="text-[10px] text-zinc-600 text-center mt-6">
              Vermilion Routes © {new Date().getFullYear()}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
