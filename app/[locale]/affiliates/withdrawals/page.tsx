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
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px w-8 bg-gradient-to-r from-[#C9A84C] to-transparent" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#C9A84C] font-medium">
            Portal de Embajadores
          </span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-light text-white tracking-tight">
          Retiros
        </h1>
        <p className="text-sm text-[#6B6B6B] mt-2 font-light">
          Solicita el pago de tus comisiones disponibles en dólares.
        </p>
      </div>

      {/* Balance card */}
      <div className="relative overflow-hidden rounded-[24px] border border-white/8 bg-white/[0.03] backdrop-blur-sm p-8 space-y-2 group">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#C9A84C]/5 to-transparent" />
        <div className="relative z-10">
          <p className="text-[10px] uppercase tracking-[0.15em] font-semibold text-[#A9A9A9]">Balance Disponible para Retiro</p>
          <p className="font-serif text-5xl font-light text-white my-3">${availableBalance.toFixed(2)} <span className="text-2xl text-[#6B6B6B]">USD</span></p>
          <p className="text-[11px] text-[#6B6B6B] italic">Las comisiones diferidas se acreditan al confirmarse el inicio del viaje.</p>
        </div>
      </div>

      {/* Info box */}
      <div className="flex gap-4 p-5 rounded-[20px] bg-white/[0.02] border border-[#C9A84C]/20 text-[#A9A9A9] text-xs">
        <Info className="w-5 h-5 shrink-0 text-[#C9A84C]" />
        <p className="leading-relaxed">
          Los retiros se procesan dentro de los primeros <strong>5 días hábiles</strong> de cada mes. 
          El monto mínimo de retiro es de <strong>$50 USD</strong>. <br />
          Aceptamos: <span className="text-white">Transferencia bancaria (Internacional/Ecuador), Zelle, Binance Pay (USDT)</span>.
        </p>
      </div>

      {/* Withdrawal form */}
      {submitted ? (
        <div className="flex items-center gap-4 p-5 rounded-[20px] bg-[#C9A84C]/10 border border-[#C9A84C]/30 text-[#C9A84C]">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <p className="text-sm font-medium">Solicitud de retiro enviada exitosamente. Se procesará en el próximo ciclo de pagos.</p>
        </div>
      ) : (
        <div className="bg-white/[0.03] border border-white/8 backdrop-blur-sm rounded-[24px] p-6 sm:p-8 space-y-6">
          <h2 className="text-sm font-semibold text-white uppercase tracking-widest">Formulario de Retiro</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-[0.1em]">Monto a retirar (USD) *</label>
                <input
                  type="number"
                  min="50"
                  step="0.01"
                  required
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  placeholder="Mínimo $50.00"
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/[0.02] text-sm text-white focus:outline-none focus:border-[#C9A84C]/50 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-[0.1em]">Método de Pago *</label>
                <select
                  required
                  value={method}
                  onChange={e => setMethod(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#0A0A0F] text-sm text-white focus:outline-none focus:border-[#C9A84C]/50 transition-colors cursor-pointer appearance-none"
                >
                  <option value="" disabled className="text-[#6B6B6B]">Selecciona un método</option>
                  <option value="bank_transfer">Transferencia Bancaria</option>
                  <option value="zelle">Zelle</option>
                  <option value="crypto_usdt">Binance Pay (USDT)</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-[0.1em]">Detalles de la Cuenta *</label>
              <textarea
                required
                value={detail}
                onChange={e => setDetail(e.target.value)}
                placeholder="Banco, Nro. de Cuenta, SWIFT, Correo Zelle, o Pay ID..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/[0.02] text-sm text-white focus:outline-none focus:border-[#C9A84C]/50 transition-colors resize-none"
              />
            </div>

            {errorMsg && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <p>{errorMsg}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-[#C9A84C] via-[#F5D78A] to-[#B8860B] hover:from-[#D4AF37] hover:to-[#9A6E0A] text-[#0A0A0F] text-xs font-bold uppercase tracking-widest rounded-xl transition-all cursor-pointer shadow-lg shadow-[#C9A84C]/20"
            >
              Confirmar Retiro
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
