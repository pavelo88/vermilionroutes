'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ExternalLink, LogOut, ShieldCheck } from 'lucide-react';
import { User } from 'firebase/auth';

interface AdminHeaderProps {
  user: User;
  onSignOut: () => void;
}

export function AdminHeader({ user, onSignOut }: AdminHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
      <div className="flex items-center gap-3">
        <div 
          translate="no"
          className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold font-serif text-lg overflow-hidden shrink-0"
        >
          VR
        </div>
        <div>
          <h1 className="font-serif text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <span>Vermilion Routes CMS Admin</span>
            <span className="text-xs bg-emerald-950 text-emerald-400 border border-emerald-800 px-2.5 py-0.5 rounded-full font-sans font-medium">
              Live Firestore
            </span>
          </h1>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 font-mono">
            User: {user.email}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Link href="/" target="_blank">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 bg-emerald-50 dark:bg-gradient-to-r dark:from-emerald-950/80 dark:to-zinc-900/80 border-emerald-200 dark:border-emerald-900/50 hover:bg-emerald-100 dark:hover:from-emerald-900 dark:hover:to-zinc-800 text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 shadow-sm transition-all duration-300"
          >
            <ExternalLink className="w-4 h-4" />
            Ver sitio web
          </Button>
        </Link>
        <Button
          onClick={onSignOut}
          variant="outline"
          size="sm"
          className="gap-2 bg-zinc-100 dark:bg-zinc-950/40 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:bg-rose-50 dark:hover:bg-rose-950/60 hover:text-rose-600 dark:hover:text-rose-400 hover:border-rose-200 dark:hover:border-rose-900/50 transition-all duration-300 shadow-sm notranslate"
        >
          <LogOut className="w-4 h-4" />
          Cerrar sesión
        </Button>
      </div>
    </div>
  );
}
