'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  ShieldCheck,
  CreditCard,
  Building2,
  CheckCircle2,
  Lock,
  Sparkles,
  ArrowRight,
  Compass,
  Upload,
  Copy,
  Check,
  Calendar,
  Tag,
  AlertCircle,
  FileText,
  Printer
} from 'lucide-react';
import Image from 'next/image';
import { TravelVoucherModal } from '@/components/booking/TravelVoucherModal';
import { mockTours } from '@/data/mock';
import { createBookingInFirestore } from '@/lib/bookings';
import { calculateAndDistributeCommissions, getAffiliateByCode } from '@/lib/affiliates';
import { getStoredAffiliateRef } from '@/components/affiliates/AffiliateTracker';

export default function CheckoutPaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const tourId = searchParams.get('tourId') || 'custom';
  const tourTitle = searchParams.get('tourTitle') || 'Vermilion Routes Expedition';
  const email = searchParams.get('email') || 'client@vermilionroutes.com';
  const amountStr = searchParams.get('amount') || '500';
  const type = searchParams.get('type') || 'deposit';
  const ref = searchParams.get('ref') || `VR-${Date.now().toString().slice(-6)}`;
  const travelDate = searchParams.get('date') || '';

  const initialAmount = Number(amountStr) || 500;

  // Tabs: 'card' | 'bank'
  const [activeTab, setActiveTab] = useState<'card' | 'bank'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [voucherOpen, setVoucherOpen] = useState(false);

  const matchedTour = mockTours.find((t) => t.id === tourId || t.title.en === tourTitle) || mockTours[0];

  // Discount code & Automatic 10% Referral Discount
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountError, setDiscountError] = useState('');

  // Auto-detect affiliate referral code from URL or Storage/Cookie (ignoring generated order IDs like VR-123456)
  useEffect(() => {
    const refParam = searchParams.get('affiliate') || searchParams.get('vid') || searchParams.get('code') || searchParams.get('ref');
    if (refParam && !/^vr-\d+$/i.test(refParam.trim()) && !discountApplied) {
      const cleanCode = refParam.trim().toLowerCase();
      setDiscountCode(cleanCode);
      setDiscountApplied(true);
    } else if (!discountApplied) {
      const stored = getStoredAffiliateRef();
      if (stored && !/^vr-\d+$/i.test(stored)) {
        setDiscountCode(stored);
        setDiscountApplied(true);
      }
    }
  }, [searchParams, discountApplied]);

  // Bank Transfer Form
  const [bankReceipt, setBankReceipt] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [transferRef, setTransferRef] = useState('');
  const [receiptSubmitted, setReceiptSubmitted] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const finalAmount = discountApplied ? Math.round(initialAmount * 0.9) : initialAmount;
  const discountSavings = discountApplied ? initialAmount - finalAmount : 0;

  const handleApplyDiscount = async () => {
    const code = discountCode.trim().toUpperCase();
    if (!code) return;

    if (code === 'VERMILION10' || code === 'CLUB10' || code === 'WELCOME10') {
      setDiscountApplied(true);
      setDiscountError('');
      return;
    }

    try {
      const affiliate = await getAffiliateByCode(code);
      if (affiliate) {
        setDiscountApplied(true);
        setDiscountError('');
      } else {
        setDiscountError('Código de embajador no válido o expirado.');
      }
    } catch {
      setDiscountError('Error validando el código.');
    }
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setBankReceipt(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleCompleteCardPayment = async () => {
    setIsProcessing(true);
    try {
      const res = await fetch('/api/checkout/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tourId,
          tourTitle,
          clientEmail: email,
          amount: finalAmount,
          paymentType: type,
          customLinkId: ref,
          affiliateCode: discountApplied ? discountCode : undefined,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Error connecting to Stripe.');
        setIsProcessing(false);
      }
    } catch (err) {
      console.error('Payment checkout error:', err);
      alert('An unexpected error occurred.');
      setIsProcessing(false);
    }
  };

  const handleSubmitReceipt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bankReceipt && !transferRef) {
      alert('Please upload a screenshot/photo of the receipt or enter the transaction reference.');
      return;
    }
    setIsProcessing(true);
    try {
      const destinationStr = matchedTour?.destination 
        ? (typeof matchedTour.destination === 'string' ? matchedTour.destination : (matchedTour.destination as any).en || 'Ecuador') 
        : 'Ecuador';

      await createBookingInFirestore({
        refCode: ref,
        tourId,
        tourTitle,
        customerName: email.split('@')[0],
        customerEmail: email,
        customerPhone: '',
        travelDates: travelDate || 'To be confirmed',
        guestsCount: '2 Travelers',
        destination: destinationStr,
        amountPaid: finalAmount,
        paymentMethod: 'bank_wire',
        paymentStatus: 'pending_verification',
        transferRef: transferRef || (bankReceipt ? `Receipt File: ${bankReceipt.name}` : 'Wire Transfer Verification'),
        affiliateCode: discountApplied ? discountCode : undefined,
        discountApplied,
        status: 'pending'
      });

      // Distribute affiliate commission if affiliate code was applied
      if (discountApplied && discountCode) {
        calculateAndDistributeCommissions({
          bookingId: ref,
          saleAmount: finalAmount,
          affiliateCode: discountCode
        }).catch((cErr) => console.warn('Commission credit notice:', cErr));
      }

      setReceiptSubmitted(true);
      setIsPaid(true);
    } catch (err) {
      console.warn('Receipt record fallback/notice:', err);
      setReceiptSubmitted(true);
      setIsPaid(true);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07130C] text-white flex items-center justify-center pt-8 sm:pt-14 pb-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-emerald-500 selection:text-white">
      {/* Background ambient glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-xl w-full bg-zinc-900/90 border border-emerald-500/20 rounded-3xl p-5 sm:p-8 shadow-2xl backdrop-blur-xl relative z-10 space-y-6">
        
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
              <Compass className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <span className="font-serif font-bold tracking-widest uppercase text-xs text-zinc-100 block">
                VERMILION ROUTES
              </span>
              <span className="text-[10px] text-emerald-400/80 uppercase tracking-wider block font-medium">
                Luxury Expeditions
              </span>
            </div>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-[11px] font-semibold">
            <Lock className="w-3 h-3 text-emerald-400" />
            <span>Pago Seguro SSL</span>
          </div>
        </div>

        {isPaid ? (
          <div className="text-center py-6 space-y-5 animate-fade-in">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-900/50">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold font-serif text-white">
              {receiptSubmitted ? '¡Comprobante Recibido!' : '¡Pago Confirmado!'}
            </h2>
            <p className="text-sm text-zinc-300 max-w-md mx-auto leading-relaxed" suppressHydrationWarning>
              {receiptSubmitted
                ? 'Hemos registrado tu comprobante de transferencia. Nuestro equipo de contabilidad verificará los fondos y te enviaremos la confirmación oficial.'
                : `Tu pago de $${finalAmount.toLocaleString('en-US')} USD ha sido procesado exitosamente para ${email}.`}
            </p>
            <div className="p-4 bg-zinc-950/80 border border-white/10 rounded-2xl text-xs text-zinc-400 space-y-2 text-left max-w-md mx-auto">
              <p className="flex justify-between"><span className="text-zinc-500">Expedición:</span> <strong className="text-white text-right line-clamp-1">{tourTitle}</strong></p>
              {travelDate && <p className="flex justify-between"><span className="text-zinc-500">Fecha de Viaje:</span> <strong className="text-emerald-400">{travelDate}</strong></p>}
              <p className="flex justify-between"><span className="text-zinc-500">Código de Reserva:</span> <span className="font-mono text-emerald-300 font-bold">{ref}</span></p>
              <p className="flex justify-between border-t border-white/10 pt-2"><span className="text-zinc-400 font-semibold">Total Pagado:</span> <span className="font-bold text-emerald-400 text-sm" suppressHydrationWarning>${finalAmount.toLocaleString('en-US')} USD</span></p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                type="button"
                onClick={() => setVoucherOpen(true)}
                className="px-5 py-3 bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-600 hover:to-teal-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 cursor-pointer hover:scale-[1.02] active:scale-95 group border-none"
              >
                <Printer className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                <span>Ver Voucher PDF</span>
              </button>
              <a
                href={`https://wa.me/593994048458?text=Hola%20Vermilion%20Routes,%20he%20completado%20el%20pago%20de%20mi%20reserva%20referencia%20${ref}`}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 shadow-md flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 group"
              >
                <span>Notificar por WhatsApp</span>
              </a>
              <button
                onClick={() => router.push('/')}
                className="px-5 py-3 bg-transparent border-2 border-emerald-500/30 hover:border-emerald-500/60 hover:bg-zinc-800 text-zinc-200 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-95 group"
              >
                <span>Volver al Inicio</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            
            {/* Tour & Client Summary Card */}
            <div className="bg-zinc-950/60 border border-white/10 rounded-2xl p-4 sm:p-5 space-y-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] uppercase font-bold tracking-wider">
                  {type === 'full' ? 'Pago Total de Expedición' : 'Depósito de Reserva'}
                </span>
                <span className="font-mono text-[11px] text-zinc-400">Ref: <strong className="text-zinc-200">{ref}</strong></span>
              </div>

              <h1 className="text-lg sm:text-xl font-bold font-serif text-white leading-snug">
                {tourTitle}
              </h1>

              <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-zinc-400 pt-1 border-t border-white/5">
                <span className="truncate max-w-[220px]">Cliente: <strong className="text-zinc-200">{email}</strong></span>
                {travelDate && (
                  <span className="flex items-center gap-1 text-emerald-400 font-medium">
                    <Calendar className="w-3.5 h-3.5" /> {travelDate}
                  </span>
                )}
              </div>
            </div>

            {/* Price Box with Clean Invoice Breakdown */}
            <div className="p-6 bg-zinc-950/80 border border-emerald-500/30 rounded-3xl space-y-5 shadow-2xl relative overflow-hidden">
              
              {/* Subtle background glow */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />

              {/* Row 1: Header */}
              <div className="text-center space-y-1 pb-4 border-b border-white/10">
                <h3 className="text-base font-bold text-white uppercase tracking-widest">
                  Total a Pagar
                </h3>
                <p className="text-xs text-zinc-400">
                  Impuestos y tasas incluidos
                </p>
              </div>

              {/* Row 2: Large Total Amount */}
              <div className="text-center py-2 relative z-10">
                <span className="text-5xl sm:text-6xl font-extrabold font-serif text-emerald-400 drop-shadow-md" suppressHydrationWarning>
                  ${finalAmount.toLocaleString('en-US')}
                </span>
                <span className="text-sm text-emerald-400/80 font-medium ml-2">USD</span>
              </div>

              {/* VIP Discount Row if active */}
              {discountApplied && (
                <div className="flex items-center justify-between text-amber-300 bg-amber-500/10 border border-amber-500/20 px-4 py-2.5 rounded-xl font-medium mx-auto max-w-sm">
                  <span className="flex items-center gap-2 text-xs">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Descuento VIP Aplicado:</span>
                  </span>
                  <span className="font-bold font-mono text-sm" suppressHydrationWarning>
                    -${discountSavings.toLocaleString('en-US')} USD
                  </span>
                </div>
              )}

              {/* Row 3: Subtotal / Tax Breakdown */}
              <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5 text-xs text-zinc-400 max-w-sm mx-auto">
                 <div className="flex justify-between items-center">
                    <span>Valor sin impuestos:</span>
                    <span className="text-zinc-300 font-mono" suppressHydrationWarning>
                      ${(finalAmount / 1.12).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
                    </span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span>Impuestos y tasas (12%):</span>
                    <span className="text-zinc-300 font-mono" suppressHydrationWarning>
                      ${(finalAmount - (finalAmount / 1.12)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
                    </span>
                 </div>
              </div>

              {/* Promo Code Input */}
              {!discountApplied ? (
                <div className="pt-4 border-t border-white/10 flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Código promocional..."
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 uppercase transition-colors"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleApplyDiscount}
                    className="px-5 py-2.5 bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-600 hover:to-teal-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-95 cursor-pointer border-none"
                  >
                    Aplicar
                  </button>
                </div>
              ) : null}
              {discountError && <p className="text-xs text-amber-400 text-center pt-1">{discountError}</p>}
            </div>

            {/* Payment Method Switcher Tabs */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2 p-1 bg-zinc-950 border border-white/10 rounded-2xl text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setActiveTab('card')}
                  className={`py-3 rounded-xl transition-all flex items-center justify-center gap-1 sm:gap-2 cursor-pointer ${
                    activeTab === 'card'
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/60'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <CreditCard className="w-4 h-4 shrink-0" />
                  <span className="whitespace-nowrap">Tarjeta<span className="hidden sm:inline"> / PayPal</span></span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('bank')}
                  className={`py-3 rounded-xl transition-all flex items-center justify-center gap-1 sm:gap-2 cursor-pointer ${
                    activeTab === 'bank'
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/60'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Building2 className="w-4 h-4 shrink-0" />
                  <span className="whitespace-nowrap">Transferencia<span className="hidden sm:inline"> / Zelle</span></span>
                </button>
              </div>

              {/* Tab 1: Credit Card / PayPal */}
              {activeTab === 'card' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="p-4 bg-zinc-950/70 border border-white/5 rounded-2xl space-y-2.5">
                    <div className="flex flex-wrap items-center justify-between text-xs text-zinc-300 gap-2">
                      <span className="text-zinc-400">Tarjetas Aceptadas:</span>
                      <div className="flex items-center gap-1.5 font-semibold text-white text-[11px]">
                        <span className="px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700">Visa</span>
                        <span className="px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700">MasterCard</span>
                        <span className="px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700">Amex</span>
                        <span className="px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700">PayPal</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                      Confirmación inmediata. Procesamiento con encriptación bancaria de extremo a extremo mediante Stripe.
                    </p>
                  </div>

                  <button
                    onClick={handleCompleteCardPayment}
                    disabled={isProcessing}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-600 hover:to-teal-500 text-white font-bold text-sm uppercase tracking-wider shadow-lg shadow-emerald-900/30 transition-all duration-300 hover:scale-[1.02] active:scale-95 group disabled:opacity-50 disabled:hover:scale-100 cursor-pointer border-none"
                  >
                    {isProcessing ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Conectando...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 shrink-0 group-hover:-translate-y-0.5 transition-transform" />
                        <span suppressHydrationWarning>Pagar ${finalAmount.toLocaleString('en-US')}</span>
                        <ArrowRight className="w-4 h-4 hidden sm:block shrink-0 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Tab 2: Bank Transfer & Zelle */}
              {activeTab === 'bank' && (
                <div className="space-y-4 animate-fade-in text-xs">
                  <p className="text-zinc-300 leading-relaxed">
                    Realiza tu transferencia o pago Zelle a cualquiera de nuestras cuentas oficiales y sube el comprobante:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* TD BANK Card */}
                    <div className="p-3.5 bg-zinc-950 border border-emerald-500/30 rounded-2xl space-y-2 relative">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                          USA (USD)
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-[9px] font-bold text-emerald-300">Zelle / Wire</span>
                      </div>
                      <p className="font-bold text-white text-xs">TD BANK (USA)</p>
                      <div className="space-y-1 font-mono text-[11px] text-zinc-300">
                        <p className="flex justify-between">
                          <span className="text-zinc-500">Checking:</span>
                          <button
                            type="button"
                            onClick={() => handleCopy('4441352252', 'td_acc')}
                            className="text-emerald-400 font-bold hover:underline flex items-center gap-1"
                          >
                            4441352252 {copiedKey === 'td_acc' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-zinc-500" />}
                          </button>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-zinc-500">Routing:</span>
                          <button
                            type="button"
                            onClick={() => handleCopy('054001725', 'td_rout')}
                            className="text-white hover:underline flex items-center gap-1"
                          >
                            054001725 {copiedKey === 'td_rout' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-zinc-500" />}
                          </button>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-zinc-500">Titular:</span>
                          <span className="text-white font-sans text-[11px]">Jhayro Ludena</span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-zinc-500">Zelle:</span>
                          <button
                            type="button"
                            onClick={() => handleCopy('jhayroludena@gmail.com', 'td_zelle')}
                            className="text-amber-300 font-bold hover:underline flex items-center gap-1 font-sans text-[11px]"
                          >
                            jhayroludena@gmail.com {copiedKey === 'td_zelle' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-zinc-500" />}
                          </button>
                        </p>
                      </div>
                    </div>

                    {/* PRODUBANCO Card */}
                    <div className="p-3.5 bg-zinc-950 border border-emerald-500/30 rounded-2xl space-y-2 relative">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                          Ecuador (USD)
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-[9px] font-bold text-emerald-300">Cta Corriente</span>
                      </div>
                      <p className="font-bold text-white text-xs">Banco Produbanco</p>
                      <div className="space-y-1 font-mono text-[11px] text-zinc-300">
                        <p className="flex justify-between">
                          <span className="text-zinc-500">Cuenta:</span>
                          <button
                            type="button"
                            onClick={() => handleCopy('27059152821', 'pro_acc')}
                            className="text-emerald-400 font-bold hover:underline flex items-center gap-1"
                          >
                            27059152821 {copiedKey === 'pro_acc' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-zinc-500" />}
                          </button>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-zinc-500">SWIFT:</span>
                          <button
                            type="button"
                            onClick={() => handleCopy('PRODECEQXXX', 'pro_swift')}
                            className="text-white hover:underline flex items-center gap-1"
                          >
                            PRODECEQXXX {copiedKey === 'pro_swift' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-zinc-500" />}
                          </button>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-zinc-500">Titular:</span>
                          <span className="text-white font-sans text-[11px]">VERMILION ROUTES</span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-zinc-500">RUC:</span>
                          <span className="text-zinc-200">1711992808001</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Receipt Upload Form */}
                  <form onSubmit={handleSubmitReceipt} className="space-y-3 pt-2 border-t border-white/10">
                    <h4 className="font-bold text-white text-xs flex items-center gap-1.5">
                      <Upload className="w-3.5 h-3.5 text-emerald-400" />
                      Adjuntar Comprobante de Transferencia / Captura
                    </h4>

                    <div className="border-2 border-dashed border-zinc-700 hover:border-emerald-500 rounded-2xl p-4 text-center transition-all bg-zinc-950/60 cursor-pointer relative">
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={handleFileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                      {previewUrl ? (
                        <div className="space-y-2">
                          <div className="relative w-28 h-20 mx-auto rounded-lg overflow-hidden border border-zinc-700">
                            <Image src={previewUrl} alt="Receipt Preview" fill className="object-cover" />
                          </div>
                          <p className="text-emerald-400 font-medium text-xs">
                            {bankReceipt?.name} ({Math.round((bankReceipt?.size || 0) / 1024)} KB)
                          </p>
                          <span className="text-[10px] text-zinc-500">Haz clic para cambiar archivo</span>
                        </div>
                      ) : (
                        <div className="space-y-1 py-2">
                          <Upload className="w-6 h-6 text-emerald-500 mx-auto" />
                          <p className="text-xs text-zinc-200 font-semibold">
                            Arrastra o haz clic para subir tu comprobante
                          </p>
                          <p className="text-[10px] text-zinc-500">Formatos JPG, PNG, PDF hasta 10MB</p>
                        </div>
                      )}
                    </div>

                    <div>
                      <input
                        type="text"
                        placeholder="Número de referencia o transacción (Opcional)"
                        value={transferRef}
                        onChange={(e) => setTransferRef(e.target.value)}
                        className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-600 hover:to-teal-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-900/30 transition-all duration-300 hover:scale-[1.02] active:scale-95 group disabled:opacity-50 disabled:hover:scale-100 cursor-pointer border-none"
                    >
                      {isProcessing ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Enviando...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4 shrink-0 group-hover:-translate-y-0.5 transition-transform" />
                          <span>Enviar Comprobante</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}
            </div>

            <p className="text-[10px] text-zinc-500 text-center leading-relaxed pt-2 border-t border-white/5">
              Al confirmar el pago, autorizas a Agencia de Viajes Vermilion a procesar tu reserva bajo nuestros{' '}
              <a href="/terms" target="_blank" className="text-emerald-400 underline">Términos</a> y{' '}
              <a href="/privacy-policy" target="_blank" className="text-emerald-400 underline">Políticas de Privacidad</a>.
            </p>
          </div>
        )}

      </div>

      <TravelVoucherModal
        isOpen={voucherOpen}
        onClose={() => setVoucherOpen(false)}
        tour={matchedTour}
        clientInfo={{
          name: email.split('@')[0],
          email: email,
          date: travelDate,
          adults: 2,
          children: 0,
          refCode: ref,
          hotelTier: 'Luxury 4-Star & Boutique',
          amountPaid: finalAmount,
          isConfirmed: isPaid
        }}
        locale="en"
      />
    </div>
  );
}
