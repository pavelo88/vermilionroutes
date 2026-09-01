'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { TrendingUp, DollarSign, Users, Zap, Clock, Sparkles } from 'lucide-react';
import { getAffiliateByEmail, AffiliateAccount } from '@/lib/affiliates';
import { LinkGenerator } from '@/components/affiliates/LinkGenerator';

function StatCard({ label, value, sub, icon: Icon, color }: {
  label: string; value: string | number; sub?: string;
  icon: React.ComponentType<{ className?: string }>; color: string;
}) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-white/5 rounded-[20px] p-6 flex items-start gap-4">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-medium">{label}</p>
        <p className="text-2xl font-serif font-light text-zinc-900 dark:text-white mt-0.5">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </p>
        {sub && <p className="text-xs text-zinc-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const locale = useLocale();
  const isEs = locale === 'es';

  const [affiliate, setAffiliate] = useState<AffiliateAccount | null>(null);
  const [loading, setLoading] = useState(true);
  const [copiedLink1, setCopiedLink1] = useState(false);
  const [copiedLink2, setCopiedLink2] = useState(false);
  const [copiedLink3, setCopiedLink3] = useState(false);

  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && user.email) {
        try {
          const aff = await getAffiliateByEmail(user.email);
          setAffiliate(aff);
        } catch {
          // ignore
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const username = affiliate?.username || 'embajador';
  const bookingLink = `https://vermilionroutes.com/${locale}/booking?vid=${username}`;
  const toursLink = `https://vermilionroutes.com/${locale}/tours?vid=${username}`;
  const homeLink = `https://vermilionroutes.com/${locale}?vid=${username}`;

  const copyToClipboard = (text: string, setCopied: (v: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-zinc-400">
        <span className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin inline-block mr-2" />
        <span>Cargando tu panel de embajador...</span>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 max-w-6xl mx-auto space-y-8">

      {/* Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-light text-zinc-900 dark:text-white">
            Bienvenido, <span className="text-amber-500 font-medium">@{username}</span>
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Panel de control de Embajador Vermilion ({affiliate?.name || 'Embajador VIP'}).
          </p>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>10% Comisión Directa Activa</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Balance Disponible"
          value={`$${affiliate?.availableBalance?.toFixed(2) || '0.00'}`}
          icon={DollarSign}
          color="bg-emerald-500/10 text-emerald-500"
        />
        <StatCard
          label="Ganancias Totales"
          value={`$${affiliate?.totalEarnings?.toFixed(2) || '0.00'}`}
          icon={TrendingUp}
          color="bg-amber-500/10 text-amber-500"
        />
        <StatCard
          label="Personas en tu Red"
          value={0}
          icon={Users}
          color="bg-blue-500/10 text-blue-500"
        />
        <StatCard
          label="Ventas Este Mes"
          value={affiliate?.salesCount || 0}
          sub="Mínimo 3 para estar Activo"
          icon={Zap}
          color="bg-purple-500/10 text-purple-500"
        />
      </div>

      {/* Smart Link Generator */}
      <LinkGenerator username={username} />

      {/* Recent activity */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-white/5 rounded-[20px] p-6">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-4 h-4 text-zinc-400" />
          <p className="text-sm font-semibold text-zinc-900 dark:text-white">Actividad Reciente</p>
        </div>
        <div className="text-center py-10 text-zinc-400 dark:text-zinc-500">
          <p className="text-sm">Aún no hay ventas registradas.</p>
          <p className="text-xs mt-1">Comparte tus enlaces con tus contactos o en tus redes sociales para generar tu primera comisión.</p>
        </div>
      </div>

    </div>
  );
}
