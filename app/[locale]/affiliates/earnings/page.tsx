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
  const directCommission = transactions
    .filter(t => t.role.includes('Venta Directa'))
    .reduce((sum, t) => sum + t.commissionAmount, 0);
    
  const networkCommission = totalEarned - directCommission;

  if (loading) {
    return (
      <div className="p-12 text-center text-zinc-400">
        <span className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin inline-block mr-2" />
        <span>Cargando tus ventas...</span>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 max-w-5xl mx-auto space-y-8">

      <div>
        <h1 className="font-serif text-3xl font-light text-zinc-900 dark:text-white">Mis Ventas</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Registro de todas tus comisiones generadas.</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Ganado', value: `$${totalEarned.toFixed(2)}`, icon: DollarSign, color: 'bg-amber-500/10 text-amber-500' },
          { label: 'Comisión Directa', value: `$${directCommission.toFixed(2)}`, icon: TrendingUp, color: 'bg-emerald-500/10 text-emerald-500' },
          { label: 'Comisión de Red / Global', value: `$${networkCommission.toFixed(2)}`, icon: TrendingUp, color: 'bg-blue-500/10 text-blue-500' },
        ].map((card, i) => (
          <div key={i} className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-white/5 rounded-[20px] p-5 flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${card.color}`}>
              <card.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">{card.label}</p>
              <p className="text-xl font-serif text-zinc-900 dark:text-white">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Transactions table */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-white/5 rounded-[20px] overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-200/60 dark:border-white/5">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-white">Historial de Comisiones</h2>
        </div>

        {transactions.length === 0 ? (
          <div className="text-center py-16">
            <DollarSign className="w-10 h-10 text-zinc-300 dark:text-zinc-600 mx-auto mb-3" />
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Aún no tienes ventas registradas.</p>
            <p className="text-xs text-zinc-400 mt-1">Comparte tu enlace y genera tu primera comisión.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-50 dark:bg-zinc-800/50 text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  <th className="text-left px-6 py-3 font-semibold">Reserva / Rol</th>
                  <th className="text-left px-6 py-3 font-semibold">Fecha</th>
                  <th className="text-left px-6 py-3 font-semibold">Venta Base</th>
                  <th className="text-left px-6 py-3 font-semibold">Tu Comisión</th>
                  <th className="text-left px-6 py-3 font-semibold">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200/60 dark:divide-white/5">
                {transactions.map((t) => (
                  <tr key={t.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-medium text-zinc-900 dark:text-white">{t.role}</p>
                      <p className="text-[10px] font-mono text-zinc-500 mt-0.5">Ref: {t.bookingId}</p>
                    </td>
                    <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400 text-xs">
                      {new Date(t.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">
                      ${t.saleAmount?.toFixed(2) || '0.00'}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-emerald-600 dark:text-emerald-400">${t.commissionAmount.toFixed(2)}</p>
                      <p className="text-[10px] font-bold text-zinc-400">{(t.percentage * 100).toFixed(0)}%</p>
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
