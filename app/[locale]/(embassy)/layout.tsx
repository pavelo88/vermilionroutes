import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Sparkles, LogOut, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Vermilion Embassy | Ambassador Executive Portal',
  description: 'Exclusive affiliate and ambassador network dashboard for Vermilion Routes luxury expeditions.',
  robots: 'noindex, nofollow',
};

export default function EmbassyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-amber-500/30 selection:text-amber-200">
      <div className="min-h-screen flex flex-col">
        {/* Top Luxury Embassy Bar */}
        <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/dashboard" className="flex items-center gap-2.5 group">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-emerald-500 p-0.5 shadow-lg shadow-amber-500/20">
                  <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
                    <Shield className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-serif font-bold text-sm tracking-wider text-white flex items-center gap-1.5">
                    VERMILION <span className="text-amber-400 font-sans text-xs tracking-widest uppercase">EMBASSY</span>
                  </span>
                  <span className="text-[10px] text-zinc-400 tracking-wide">Ambassador Network Portal</span>
                </div>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-medium text-emerald-300">Embajador Activo</span>
              </div>

              <Link
                href="https://www.vermilionroutes.com"
                target="_blank"
                className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white px-3 py-1.5 rounded-lg hover:bg-zinc-900 transition-colors"
              >
                <span>Ver Sitio Turístico</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
