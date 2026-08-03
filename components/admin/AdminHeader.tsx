'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { User } from 'firebase/auth';

interface AdminHeaderProps {
  user: User;
  onSignOut: () => void;
}

export function AdminHeader({ user, onSignOut }: AdminHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold font-serif text-lg">
          VR
        </div>
        <div>
          <h1 className="font-serif text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span>Vermilion Routes CMS Admin</span>
            <span className="text-xs bg-emerald-950 text-emerald-400 border border-emerald-800 px-2.5 py-0.5 rounded-full font-sans font-medium">
              Live Firestore
            </span>
          </h1>
          <p className="text-xs text-zinc-400 font-mono">
            User: {user.email}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Link href="/">
          <Button variant="outline" size="sm" className="bg-zinc-900 text-zinc-300 border-zinc-700 hover:text-white">
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            View Live Site
          </Button>
        </Link>

        <Button
          variant="outline"
          size="sm"
          onClick={onSignOut}
          className="bg-rose-950/40 text-rose-300 border border-rose-800/50 hover:bg-rose-900/60"
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
}
