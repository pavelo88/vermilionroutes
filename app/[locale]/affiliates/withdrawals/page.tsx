'use client';

import { useState, useEffect } from 'react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { Banknote, Clock, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { getAffiliateByEmail, AffiliateAccount } from '@/lib/affiliates';

export default function WithdrawalsPage() {
  const [affiliate, setAffiliate] = useState<AffiliateAccount | null>(null);
  const [loading, setLoading] = useState(true);

  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('');
  const [detail, setDetail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

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

  const availableBalance = affiliate?.availableBalance || 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const numAmount = parseFloat(amount);
    if (!numAmount || numAmount < 50) {
      setErrorMsg('El monto mínimo de retiro es de $50.00 USD.');
      return;
    }
    if (numAmount > availableBalance) {
      setErrorMsg('El monto solicitado supera tu balance disponible.');
      return;
    }

    if (!method || !detail) {
      setErrorMsg('Por favor completa todos los campos del método de pago.');
      return;
    }

    try {
      if (db && affiliate) {
        await addDoc(collection(db, 'affiliate_withdrawals'), {
          affiliateUsername: affiliate.username,
          affiliateName: affiliate.name,
          amountUsd: numAmount,
          method,
          accountDetails: detail,
          status: 'pending',
          createdAt: new Date().toISOString(),
        });
      }
      setSubmitted(true);
      setAmount('');
      setMethod('');
      setDetail('');
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error al enviar la solicitud.');
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-zinc-400">
        <span className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin inline-block mr-2" />
        <span>Cargando balance de retiros...</span>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 max-w-4xl mx-auto space-y-8">

      <div>
        <h1 className="font-serif text-3xl font-light text-zinc-900 dark:text-white">Retiros</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Solicita el pago de tus comisiones disponibles en dólares.</p>
      </div>

      {/* Balance card */}
      <div className="bg-gradient-to-br from-amber-500 to-amber-700 rounded-[24px] p-8 text-white space-y-2 shadow-xl shadow-amber-950/20">
        <p className="text-sm font-medium opacity-80">Balance Disponible para Retiro</p>
        <p className="font-serif text-5xl font-light">${availableBalance.toFixed(2)} USD</p>
        <p className="text-xs opacity-75">Las comisiones diferidas se acreditan al confirmarse el inicio del viaje.</p>
      </div>

      {/* Info box */}
      <div className="flex gap-3 p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-800/40 text-blue-700 dark:text-blue-300 text-xs">
        <Info className="w-5 h-5 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          Los retiros se procesan dentro de los primeros <strong>5 días hábiles</strong> de cada mes. 
          El monto mínimo de retiro es de <strong>$50 USD</strong>. 
          Aceptamos: Transferencia bancaria internacional / local (Ecuador), Zelle, Binance Pay (USDT).
        </p>
      </div>

      {/* Withdrawal form */}
      {submitted ? (
        <div className="flex items-center gap-3 p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <p className="text-sm font-medium">Solicitud de retiro enviada exitosamente. Se procesará en el próximo ciclo de pagos.</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-white/5 rounded-[20px] p-6 space-y-5">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-white">Solicitar Retiro</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Monto a retirar (USD) *</label>
              <input
                type="number"
                min="50"
                step="0.01"
                required
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder="Mínimo $50.00"
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-800/50 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-amber-500/50 transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Método de Pago *</label>
              <select
                required
                value={method}
                onChange={e => setMethod(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-800/50 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-amber-500/50 transition-colors"
              >
                <option value="">Selecciona un método</option>
                <option value="bank">Transferencia Bancaria (Ecuador / Internacional)</option>
                <option value="zelle">Zelle (EE.UU.)</option>
                <option value="binance">Binance Pay (USDT)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Detalles de la Cuenta (Banco, Nro. de Cuenta, Correo Zelle o Pay ID) *</label>
              <textarea
                required
                rows={3}
                value={detail}
                onChange={e => setDetail(e.target.value)}
                placeholder="Banco Pichincha, Cta. Ahorros Nro. ..., Titular: ..., CI: ..."
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-800/50 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-amber-500/50 transition-colors"
              />
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={availableBalance < 50}
              className="w-full py-3 bg-amber-500 hover:bg-amber-600 disabled:opacity-40 disabled:cursor-not-allowed text-black font-bold uppercase tracking-wider text-xs rounded-xl transition-all shadow-md cursor-pointer"
            >
              {availableBalance < 50 ? 'Balance insuficiente (Mín. $50 USD)' : 'Enviar Solicitud de Retiro'}
            </button>
          </form>
        </div>
      )}

    </div>
  );
}
