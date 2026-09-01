'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { ExternalLink, LogOut, ShieldCheck, Database, Inbox, Layers, Link as LinkIcon, Menu, X, Mail } from 'lucide-react';
import { User } from 'firebase/auth';

interface AdminHeaderProps {
  user: User;
  onSignOut: () => void;
  activeTab: 'tours' | 'bookings' | 'settings' | 'links' | 'leads';
  setActiveTab: (tab: 'tours' | 'bookings' | 'settings' | 'links' | 'leads') => void;
  toursCount: number;
  bookingsCount: number;
  pendingCount: number;
}

export function AdminHeader({ user, onSignOut, activeTab, setActiveTab, toursCount, bookingsCount, pendingCount }: AdminHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'tours' as const, label: `Tour Packages (${toursCount})`, icon: Database },
    { id: 'bookings' as const, label: `Incoming Bookings (${bookingsCount})`, icon: Inbox, badge: pendingCount },
    { id: 'leads' as const, label: 'Club / Leads', icon: Mail },
    { id: 'settings' as const, label: 'Site CMS Settings', icon: Layers },
    { id: 'links' as const, label: 'Payment Links', icon: LinkIcon }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 backdrop-blur-md border-b border-white/20 dark:border-zinc-800/30 ${
          isScrolled ? 'pt-2.5 pb-2.5 shadow-sm bg-[#F9F6F0]/90 dark:bg-[#05140C]/90' : 'pt-3 pb-3 bg-[#F9F6F0]/95 dark:bg-[#05140C]/95'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <Link href="/" aria-label="Vermilion Routes Inicio" className="relative w-[140px] h-[35px] sm:w-[160px] sm:h-[40px] shrink-0">
              <Image
                src="/logo_inicio.png"
                alt="Vermilion Routes"
                fill
                sizes="160px"
                className="object-contain"
                priority
              />
            </Link>
            <span className="hidden lg:flex text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2.5 py-0.5 rounded-full font-sans font-medium items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Live Firestore
            </span>
          </div>

          {/* Desktop Tabs */}
          <nav className="hidden md:flex items-center gap-2 font-sans">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all cursor-pointer relative ${
                  activeTab === item.id
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    : 'text-zinc-800 dark:text-zinc-200 hover:text-emerald-600 hover:bg-zinc-100/70 dark:hover:bg-zinc-800/50'
                }`}
              >
                <item.icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
                {item.badge ? (
                  <span className="ml-1 text-[9px] bg-amber-500 text-zinc-950 px-1.5 py-0.5 rounded-full font-bold animate-pulse">
                    {item.badge}
                  </span>
                ) : null}
              </button>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <Link href="/" target="_blank">
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs gap-1.5 bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/50 hover:bg-emerald-100 text-emerald-700 dark:text-emerald-400"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Ver sitio
              </Button>
            </Link>
            <Button
              onClick={onSignOut}
              variant="outline"
              size="sm"
              className="h-8 text-xs gap-1.5 bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 hover:text-red-600 hover:bg-red-50 dark:text-zinc-300 dark:hover:bg-red-950/30"
            >
              <LogOut className="w-3.5 h-3.5" />
              Salir
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
              <LogOut className="w-4 h-4 mr-2" /> Cerrar sesión
            </Button>
          </div>
        )}
      </header>
      {/* Spacer to push content down below fixed header */}
      <div className="h-[70px] sm:h-[80px]" />
    </>
  );
}
