'use client';

import React from 'react';
import { ShieldCheck, RefreshCw } from 'lucide-react';

interface AdminMetricsProps {
  toursCount: number;
  onReseed: () => void;
  isReseeding?: boolean;
}

export function AdminMetrics({ toursCount, onReseed, isReseeding }: AdminMetricsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="glass-panel p-5 rounded-3xl space-y-1">
        <span className="text-xs text-zinc-600 dark:text-zinc-400 font-medium">Active Tours in Firestore</span>
        <p className="font-serif text-3xl font-bold text-emerald-600 dark:text-emerald-400">{toursCount} Packages</p>
        <p className="text-[11px] text-zinc-500">Live synced collection</p>
      </div>

      <div className="glass-panel p-5 rounded-3xl space-y-1">
        <span className="text-xs text-zinc-600 dark:text-zinc-400 font-medium">Destinations Covered</span>
        <p className="font-serif text-3xl font-bold text-amber-500 dark:text-amber-400">3 Regions</p>
        <p className="text-[11px] text-zinc-500">Galapagos, Ecuador Continental</p>
      </div>

      <div className="glass-panel p-5 rounded-3xl space-y-1">
        <span className="text-xs text-zinc-600 dark:text-zinc-400 font-medium">Firebase Security Status</span>
        <p className="font-serif text-2xl font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
          <ShieldCheck className="w-5 h-5" />
          <span>Authenticated</span>
        </p>
        <p className="text-[11px] text-zinc-500">Firestore Rules Deployed</p>
      </div>

      <div className="glass-panel p-5 rounded-3xl space-y-1">
        <span className="text-xs text-zinc-600 dark:text-zinc-400 font-medium">Database Management</span>
        <button
          onClick={onReseed}
          disabled={isReseeding}
          className="w-full mt-1 text-xs py-2 px-3 rounded-xl glass-input hover:bg-emerald-600 hover:text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer font-medium disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isReseeding ? 'animate-spin' : ''}`} />
          <span>{isReseeding ? 'Reseeding...' : 'Reseed Firestore Data'}</span>
        </button>
      </div>
    </div>
  );
}
