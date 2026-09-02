'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useTheme } from 'next-themes';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { TrendingUp, DollarSign, Users, Zap, Clock, Sun, Moon } from 'lucide-react';
import { getAffiliateByEmail, AffiliateAccount } from '@/lib/affiliates';
import { LinkGenerator } from '@/components/affiliates/LinkGenerator';

// ── METALLIC GOLD PALETTE ─────────────────────────────────────────────────────
// Gold gradient: #C9A84C → #F5D78A → #B8860B
// Silver text:  #D4D4D4 → #A9A9A9
// Ink:          #0A0A0F (near-black background)
// Cards:        rgba(255,255,255,0.04) with gold border @ 12% opacity

function StatCard({ label, value, sub, icon: Icon, accent }: {
  label: string;
  value: string | number;
  sub?: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: string; // tailwind gradient text class
}) {
  return (
    <div className="relative overflow-hidden rounded-[20px] border border-white/8 bg-white/[0.03] dark:bg-white/[0.03] backdrop-blur-sm p-5 flex items-start gap-4 group hover:border-[#C9A84C]/30 transition-all duration-300">
      {/* Subtle gold glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#C9A84C]/5 to-transparent rounded-[20px]" />
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br ${accent} shadow-lg`}>
        <Icon className="w-4.5 h-4.5 text-[#0A0A0F]" />
      </div>
      <div className="relative z-10">
        <p className="text-[10px] text-[#A9A9A9] uppercase tracking-[0.12em] font-medium">{label}</p>
        <p className="text-2xl font-serif font-light text-white mt-0.5">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </p>
        {sub && <p className="text-[10px] text-[#6B6B6B] mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const locale = useLocale();
  const isEs = locale === 'es';
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const [affiliate, setAffiliate] = useState<AffiliateAccount | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && user.email) {
        try {
          const aff = await getAffiliateByEmail(user.email);
          setAffiliate(aff);
        } catch { /* ignore */ }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const username = affiliate?.username || 'embajador';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <span className="w-8 h-8 rounded-full border-2 border-[#C9A84C] border-t-transparent animate-spin" />
          <span className="text-xs text-[#6B6B6B] tracking-widest uppercase">
            {isEs ? 'Cargando panel...' : 'Loading panel...'}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 sm:p-8 max-w-6xl mx-auto space-y-8">

      {/* ── HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          {/* Thin gold rule above title */}
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-gradient-to-r from-[#C9A84C] to-transparent" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#C9A84C] font-medium">
              {isEs ? 'Portal de Embajadores' : 'Ambassador Portal'}
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-light text-white tracking-tight">
            {isEs ? 'Bienvenido,' : 'Welcome,'}{' '}
            <span className="bg-gradient-to-r from-[#C9A84C] via-[#F5D78A] to-[#B8860B] bg-clip-text text-transparent font-medium">
              @{username}
            </span>
          </h1>
          <p className="text-sm text-[#6B6B6B] mt-2 font-light">
            {affiliate?.name || 'Embajador VIP'} · {affiliate?.rank || 'Embajador'}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2.5 rounded-xl border border-white/10 bg-white/5 hover:border-[#C9A84C]/40 text-[#A9A9A9] hover:text-white transition-all cursor-pointer"
              title={isEs ? 'Cambiar tema' : 'Toggle theme'}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          )}

          {/* Commission Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
            <span className="text-[11px] font-bold text-[#C9A84C] tracking-wider uppercase">
              {isEs ? '10% Comisión Activa' : '10% Active Commission'}
            </span>
          </div>
        </div>
      </div>

      {/* ── STATS ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard
          label={isEs ? 'Balance Disponible' : 'Available Balance'}
          value={`$${affiliate?.availableBalance?.toFixed(2) || '0.00'}`}
          icon={DollarSign}
          accent="from-[#C9A84C] to-[#8B6914]"
        />
        <StatCard
          label={isEs ? 'Ganancias Totales' : 'Total Earnings'}
          value={`$${affiliate?.totalEarnings?.toFixed(2) || '0.00'}`}
          icon={TrendingUp}
          accent="from-[#D4D4D4] to-[#7A7A7A]"
        />
        <StatCard
          label={isEs ? 'Personas en tu Red' : 'Network Members'}
          value={0}
          icon={Users}
          accent="from-[#C9A84C] to-[#8B6914]"
        />
        <StatCard
          label={isEs ? 'Ventas Este Mes' : 'Sales This Month'}
          value={affiliate?.salesCount || 0}
          sub={isEs ? 'Mínimo 3 para estar Activo' : 'Min 3 to stay Active'}
          icon={Zap}
          accent="from-[#D4D4D4] to-[#7A7A7A]"
        />
      </div>

      {/* ── LINK GENERATOR ── */}
      <LinkGenerator username={username} />

      {/* ── RECENT ACTIVITY ── */}
      <div className="rounded-[20px] border border-white/8 bg-white/[0.03] p-6">
        <div className="flex items-center gap-2 mb-5">
          <Clock className="w-3.5 h-3.5 text-[#C9A84C]" />
          <span className="text-xs font-semibold text-white uppercase tracking-widest">
            {isEs ? 'Actividad Reciente' : 'Recent Activity'}
          </span>
        </div>
        <div className="text-center py-10">
          <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-5 h-5 text-[#4A4A4A]" />
          </div>
          <p className="text-sm text-[#6B6B6B]">
            {isEs ? 'Aún no hay ventas registradas.' : 'No sales recorded yet.'}
          </p>
          <p className="text-xs text-[#4A4A4A] mt-1">
            {isEs
              ? 'Comparte tus enlaces para generar tu primera comisión.'
              : 'Share your links to generate your first commission.'}
          </p>
        </div>
      </div>

    </div>
  );
}
