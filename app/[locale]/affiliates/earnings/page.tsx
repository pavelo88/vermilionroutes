'use client';

import { useState, useEffect } from 'react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { TrendingUp, DollarSign, CheckCircle2, Clock, ChevronRight } from 'lucide-react';
import { getAffiliateByEmail, AffiliateAccount } from '@/lib/affiliates';

interface CommissionTransaction {
  id: string;
  bookingId: string;
  saleAmount: number;
  commissionAmount: number;
  percentage: number;
  role: string;
  status: 'pending' | 'credited';
  createdAt: string;
}

function Badge({ status }: { status: 'credited' | 'pending' }) {
  return status === 'credited'
    ? <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"><CheckCircle2 className="w-3 h-3" />Disponible</span>
    : <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20"><Clock className="w-3 h-3" />Pendiente</span>;
}

export default function EarningsPage() {
  const [affiliate, setAffiliate] = useState<AffiliateAccount | null>(null);
  const [transactions, setTransactions] = useState<CommissionTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && user.email) {
        try {
          const aff = await getAffiliateByEmail(user.email);
          setAffiliate(aff);
          if (aff && db) {
            const q = query(
              collection(db, 'affiliate_commissions'),
              where('affiliateUsername', '==', aff.username),
            );
            const snap = await getDocs(q);
            const txs = snap.docs.map(d => ({ id: d.id, ...d.data() } as CommissionTransaction));
            // Sort client side because we might need a composite index for orderBy in Firestore
            txs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            setTransactions(txs);
          }
        } catch {
          // ignore
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const totalEarned = affiliate?.totalEarnings || 0;
  
  // A rough estimate separation for display purposes
  const directCommission = transactions.filter(t => t.role === 'direct').reduce((acc, t) => acc + t.commissionAmount, 0);
  const networkCommission = transactions.filter(t => t.role !== 'direct').reduce((acc, t) => acc + t.commissionAmount, 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <span className="w-8 h-8 rounded-full border-2 border-[#C9A84C] border-t-transparent animate-spin" />
          <span className="text-xs text-[#6B6B6B] tracking-widest uppercase">Cargando ventas...</span>
        </div>
      </div>
    );
  }

  function StatCard({ label, value, icon: Icon, accent }: { label: string; value: string | number; icon: any; accent: string }) {
    return (
      <div className="relative overflow-hidden rounded-[20px] border border-white/8 bg-white/[0.03] dark:bg-white/[0.03] backdrop-blur-sm p-5 flex items-start gap-4 group hover:border-[#C9A84C]/30 transition-all duration-300">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#C9A84C]/5 to-transparent rounded-[20px]" />
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br ${accent} shadow-lg`}>
          <Icon className="w-4.5 h-4.5 text-[#0A0A0F]" />
        </div>
        <div className="relative z-10">
          <p className="text-[10px] text-[#A9A9A9] uppercase tracking-[0.12em] font-medium">{label}</p>
          <p className="text-2xl font-serif font-light text-white mt-0.5">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px w-8 bg-gradient-to-r from-[#C9A84C] to-transparent" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#C9A84C] font-medium">
            Portal de Embajadores
          </span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-light text-white tracking-tight">
          Mis Ventas
        </h1>
        <p className="text-sm text-[#6B6B6B] mt-2 font-light">
          Registro de todas tus comisiones generadas.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatCard
          label="Total Ganado"
          value={`$${totalEarned.toFixed(2)}`}
          icon={DollarSign}
          accent="from-[#C9A84C] to-[#8B6914]"
        />
        <StatCard
          label="Comisión Directa"
          value={`$${directCommission.toFixed(2)}`}
          icon={TrendingUp}
          accent="from-[#D4D4D4] to-[#7A7A7A]"
        />
        <StatCard
          label="Comisión de Red / Global"
          value={`$${networkCommission.toFixed(2)}`}
          icon={TrendingUp}
          accent="from-[#D4D4D4] to-[#7A7A7A]"
        />
      </div>

      {/* History Table */}
      <div className="bg-white/[0.03] border border-white/8 rounded-[24px] overflow-hidden backdrop-blur-sm">
        <div className="px-6 py-5 border-b border-white/10">
          <h2 className="text-sm font-semibold text-white uppercase tracking-widest">Historial de Comisiones</h2>
        </div>
        
        {transactions.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-5 h-5 text-[#4A4A4A]" />
            </div>
            <p className="text-sm text-[#6B6B6B]">Aún no tienes ventas registradas.</p>
            <p className="text-xs text-[#4A4A4A] mt-1">Comparte tu enlace y genera tu primera comisión.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white/[0.02] text-xs uppercase tracking-wider text-[#A9A9A9]">
                  <th className="text-left px-6 py-3 font-semibold">Reserva / Rol</th>
                  <th className="text-left px-6 py-3 font-semibold">Fecha</th>
                  <th className="text-left px-6 py-3 font-semibold">Venta Base</th>
                  <th className="text-left px-6 py-3 font-semibold">Tu Comisión</th>
                  <th className="text-left px-6 py-3 font-semibold">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {transactions.map((t) => (
                  <tr key={t.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-medium text-white">{t.role}</p>
                      <p className="text-[10px] font-mono text-[#6B6B6B] mt-0.5">Ref: {t.bookingId}</p>
                    </td>
                    <td className="px-6 py-4 text-[#A9A9A9] text-xs">
                      {new Date(t.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-[#A9A9A9]">
                      ${t.saleAmount?.toFixed(2) || '0.00'}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-[#C9A84C]">${t.commissionAmount.toFixed(2)}</p>
                      <p className="text-[10px] font-bold text-[#6B6B6B]">{(t.percentage * 100).toFixed(0)}%</p>
                    </td>
                    <td className="px-6 py-4">
                      <Badge status={t.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
