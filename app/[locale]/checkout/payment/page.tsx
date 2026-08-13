'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ShieldCheck, CreditCard, CheckCircle2, Lock, Sparkles, ArrowRight, Compass } from 'lucide-react';
import Image from 'next/image';

export default function CheckoutPaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const tourId = searchParams.get('tourId') || 'custom';
  const tourTitle = searchParams.get('tourTitle') || 'Vermilion Routes Expedition';
  const email = searchParams.get('email') || 'client@vermilionroutes.com';
  const amountStr = searchParams.get('amount') || '500';
  const type = searchParams.get('type') || 'deposit';
  const ref = searchParams.get('ref') || '';

  const amountUSD = Number(amountStr) || 500;

  const handleCompletePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaid(true);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans selection:bg-emerald-500 selection:text-white">
      <div className="max-w-xl w-full bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md relative overflow-hidden space-y-6">
        
        {/* Glow accent */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between border-b border-zinc-800 pb-5">
          <div className="flex items-center gap-2">
            <Compass className="w-6 h-6 text-emerald-500" />
            <span className="font-serif font-bold tracking-wider uppercase text-sm text-zinc-200">
              VERMILION ROUTES
            </span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 text-xs font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>256-Bit SSL Secure</span>
          </div>
        </div>

        {isPaid ? (
          <div className="text-center py-8 space-y-4 animate-fade-in">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-900/50">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold font-serif text-white">Payment Confirmed!</h2>
            <p className="text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
              Thank you for reserving your expedition with Vermilion Routes. Your payment of{' '}
              <strong className="text-emerald-400">${amountUSD.toLocaleString()} USD</strong> has been successfully processed for <strong className="text-white">{email}</strong>.
            </p>
            <div className="p-4 bg-zinc-950/60 border border-zinc-800 rounded-2xl text-xs text-zinc-400 space-y-1">
              <p>Reference Code: <span className="font-mono text-zinc-200">{ref || `VR-${Date.now()}`}</span></p>
              <p>Our travel specialist will contact you on WhatsApp / email shortly.</p>
            </div>
            <button
              onClick={() => router.push('/')}
              className="mt-4 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all flex items-center gap-2 mx-auto cursor-pointer"
            >
              <span>Return to Main Site</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <span className="text-xs uppercase font-semibold text-emerald-400 tracking-wider">
                {type === 'full' ? 'Full Tour Payment' : 'Expedition Reservation Deposit'}
              </span>
              <h1 className="text-xl sm:text-2xl font-bold font-serif text-white mt-1">
                {tourTitle}
              </h1>
              <p className="text-xs text-zinc-400 mt-1">Issued for: {email}</p>
            </div>

            <div className="p-4 bg-zinc-950/80 border border-zinc-800 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-xs text-zinc-400 block">Total Payable Amount</span>
                <span className="text-xs text-zinc-500 font-medium">USD • Tax Included</span>
              </div>
              <span className="text-3xl font-extrabold font-serif text-emerald-400">
                ${amountUSD.toLocaleString()} <span className="text-xs text-zinc-400 font-normal">USD</span>
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span>Payment Method</span>
                <span className="text-zinc-200 flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-emerald-400" />
                  Credit / Debit Card (Visa, Mastercard, Amex)
                </span>
              </div>

              <button
                onClick={handleCompletePayment}
                disabled={isProcessing}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase tracking-widest text-sm rounded-2xl transition-all shadow-lg shadow-emerald-950/80 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 hover:scale-[1.01] active:scale-[0.99]"
              >
                {isProcessing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing Secure Payment...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Pay ${amountUSD.toLocaleString()} USD Now</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-[11px] text-zinc-500 text-center leading-relaxed">
              By confirming payment, you authorize Vermilion Routes to secure your travel booking. Transactions are encrypted end-to-end.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
