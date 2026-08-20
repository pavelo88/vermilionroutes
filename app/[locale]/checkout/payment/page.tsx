'use client';

import React, { useState } from 'react';
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

  // Discount code
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountError, setDiscountError] = useState('');

  // Bank Transfer Form
  const [bankReceipt, setBankReceipt] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [transferRef, setTransferRef] = useState('');
  const [receiptSubmitted, setReceiptSubmitted] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const finalAmount = discountApplied ? Math.round(initialAmount * 0.9) : initialAmount;

  const handleApplyDiscount = () => {
    const code = discountCode.trim().toUpperCase();
    if (code === 'VERMILION10' || code === 'CLUB10' || code === 'WELCOME10') {
      setDiscountApplied(true);
      setDiscountError('');
    } else {
      setDiscountError('Invalid code. Use VERMILION10 for 10% Member Discount.');
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

  const handleCompleteCardPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaid(true);
    }, 1800);
  };

  const handleSubmitReceipt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bankReceipt && !transferRef) {
      alert('Please upload a screenshot/photo of the receipt or enter the transaction reference.');
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setReceiptSubmitted(true);
      setIsPaid(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans selection:bg-emerald-500 selection:text-white">
      <div className="max-w-2xl w-full bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md relative overflow-hidden space-y-6">
        
        {/* Glow accent */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-5">
          <div className="flex items-center gap-2">
            <Compass className="w-6 h-6 text-emerald-500" />
            <span className="font-serif font-bold tracking-wider uppercase text-sm text-zinc-200">
              VERMILION ROUTES
            </span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 text-xs font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>256-Bit SSL Secure Gateway</span>
          </div>
        </div>

        {isPaid ? (
          <div className="text-center py-8 space-y-5 animate-fade-in">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-900/50">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold font-serif text-white">
              {receiptSubmitted ? 'Transfer Receipt Received!' : 'Payment Confirmed!'}
            </h2>
            <p className="text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
              {receiptSubmitted
                ? 'Thank you! Your bank transfer receipt has been registered. Our accounting team will verify the funds and email your official confirmation.'
                : `Thank you! Your payment of $${finalAmount.toLocaleString()} USD has been successfully processed for ${email}.`}
            </p>
            <div className="p-4 bg-zinc-950/80 border border-zinc-800 rounded-2xl text-xs text-zinc-400 space-y-1.5 text-left max-w-md mx-auto">
              <p className="flex justify-between"><span className="text-zinc-500">Expedition:</span> <strong className="text-white">{tourTitle}</strong></p>
              {travelDate && <p className="flex justify-between"><span className="text-zinc-500">Selected Date:</span> <strong className="text-emerald-400">{travelDate}</strong></p>}
              <p className="flex justify-between"><span className="text-zinc-500">Reference Code:</span> <span className="font-mono text-emerald-300">{ref}</span></p>
              <p className="flex justify-between"><span className="text-zinc-500">Total USD:</span> <span className="font-bold text-white">${finalAmount.toLocaleString()} USD</span></p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                type="button"
                onClick={() => setVoucherOpen(true)}
                className="px-5 py-3 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save Voucher PDF</span>
              </button>
              <a
                href={`https://wa.me/593994048458?text=Hello%20Vermilion%20Routes,%20I%20have%20completed%20the%20payment/transfer%20for%20reference%20${ref}`}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Notify WhatsApp</span>
              </a>
              <button
                onClick={() => router.push('/')}
                className="px-5 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Return to Home</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* Tour & Client Summary */}
            <div className="space-y-1">
              <span className="text-xs uppercase font-semibold text-emerald-400 tracking-wider">
                {type === 'full' ? 'Full Expedition Payment' : 'Expedition Reservation Deposit'}
              </span>
              <h1 className="text-xl sm:text-2xl font-bold font-serif text-white">
                {tourTitle}
              </h1>
              <div className="flex flex-wrap gap-4 text-xs text-zinc-400 pt-1">
                <span>Client: <strong className="text-zinc-200">{email}</strong></span>
                {travelDate && (
                  <span className="flex items-center gap-1 text-emerald-400">
                    <Calendar className="w-3.5 h-3.5" /> Date: {travelDate}
                  </span>
                )}
                <span>Ref: <strong className="text-zinc-300 font-mono">{ref}</strong></span>
              </div>
            </div>

            {/* Price Box with 10% Discount option */}
            <div className="p-4 bg-zinc-950/80 border border-zinc-800 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-zinc-400 block">Payable Amount</span>
                  <span className="text-xs text-zinc-500 font-medium">USD • All Taxes Included</span>
                </div>
                <div className="text-right">
                  {discountApplied && (
                    <span className="text-sm line-through text-zinc-500 mr-2">
                      ${initialAmount.toLocaleString()}
                    </span>
                  )}
                  <span className="text-3xl font-extrabold font-serif text-emerald-400">
                    ${finalAmount.toLocaleString()} <span className="text-xs text-zinc-400 font-normal">USD</span>
                  </span>
                </div>
              </div>

              {/* Discount Input */}
              {!discountApplied ? (
                <div className="pt-2 border-t border-zinc-800/80 flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Promo code (e.g. VERMILION10)"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 uppercase"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleApplyDiscount}
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold cursor-pointer transition-all"
                  >
                    Apply
                  </button>
                </div>
              ) : (
                <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-xs text-emerald-400 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> 10% Member Club Discount Applied!
                  </span>
                  <span>-10%</span>
                </div>
              )}
              {discountError && <p className="text-xs text-amber-400">{discountError}</p>}
            </div>

            {/* Payment Method Switcher Tabs */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2 p-1 bg-zinc-950 border border-zinc-800 rounded-2xl text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setActiveTab('card')}
                  className={`py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    activeTab === 'card'
                      ? 'bg-emerald-600 text-white shadow-lg'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Credit Card / PayPal</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('bank')}
                  className={`py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    activeTab === 'bank'
                      ? 'bg-emerald-600 text-white shadow-lg'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  <span>Bank Wire &amp; Zelle</span>
                </button>
              </div>

              {/* Tab 1: Credit Card / PayPal */}
              {activeTab === 'card' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="p-4 bg-zinc-950/60 border border-zinc-800 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between text-xs text-zinc-300">
                      <span>Accepted Cards:</span>
                      <span className="font-semibold text-white">Visa, MasterCard, Amex, PayPal</span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Instant confirmation. Encrypted through PCI-DSS Level 1 compliant secure tokenization.
                    </p>
                  </div>

                  <button
                    onClick={handleCompleteCardPayment}
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
                        <span>Pay ${finalAmount.toLocaleString()} USD with Card</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Tab 2: Bank Transfer & Zelle */}
              {activeTab === 'bank' && (
                <div className="space-y-5 animate-fade-in text-xs">
                  <p className="text-zinc-300 leading-relaxed">
                    Make your payment to one of our verified corporate bank accounts and upload your receipt screenshot below:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* TD BANK Card */}
                    <div className="p-4 bg-zinc-950 border border-emerald-900/60 rounded-2xl space-y-2 relative">
                      <span className="text-[10px] uppercase font-bold text-emerald-400 block tracking-wider">
                        USA &amp; International (USD)
                      </span>
                      <p className="font-bold text-white text-sm">TD BANK • Wire &amp; Zelle</p>
                      <div className="space-y-1 font-mono text-[11px] text-zinc-300">
                        <p className="flex justify-between">
                          <span>Checking #:</span>
                          <button
                            type="button"
                            onClick={() => handleCopy('4441352252', 'td_acc')}
                            className="text-emerald-400 font-bold hover:underline flex items-center gap-1"
                          >
                            4441352252 {copiedKey === 'td_acc' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-zinc-500" />}
                          </button>
                        </p>
                        <p className="flex justify-between">
                          <span>Routing #:</span>
                          <button
                            type="button"
                            onClick={() => handleCopy('054001725', 'td_rout')}
                            className="text-white hover:underline flex items-center gap-1"
                          >
                            0540-01725 {copiedKey === 'td_rout' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-zinc-500" />}
                          </button>
                        </p>
                        <p className="flex justify-between">
                          <span>Holder:</span>
                          <span className="text-white">Jhayro Ludena</span>
                        </p>
                        <p className="flex justify-between">
                          <span>Zelle:</span>
                          <button
                            type="button"
                            onClick={() => handleCopy('jhayroludena@gmail.com', 'td_zelle')}
                            className="text-amber-400 hover:underline flex items-center gap-1"
                          >
                            jhayroludena@gmail.com {copiedKey === 'td_zelle' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-zinc-500" />}
                          </button>
                        </p>
                        <p className="text-[10px] text-zinc-500">Maryland, USA</p>
                      </div>
                    </div>

                    {/* PRODUBANCO Card */}
                    <div className="p-4 bg-zinc-950 border border-emerald-900/60 rounded-2xl space-y-2 relative">
                      <span className="text-[10px] uppercase font-bold text-emerald-400 block tracking-wider">
                        Ecuador (USD)
                      </span>
                      <p className="font-bold text-white text-sm">Banco Produbanco</p>
                      <div className="space-y-1 font-mono text-[11px] text-zinc-300">
                        <p className="flex justify-between">
                          <span>Cta Corriente:</span>
                          <button
                            type="button"
                            onClick={() => handleCopy('27059152821', 'pro_acc')}
                            className="text-emerald-400 font-bold hover:underline flex items-center gap-1"
                          >
                            27059152821 {copiedKey === 'pro_acc' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-zinc-500" />}
                          </button>
                        </p>
                        <p className="flex justify-between">
                          <span>SWIFT:</span>
                          <button
                            type="button"
                            onClick={() => handleCopy('PRODECEQXXX', 'pro_swift')}
                            className="text-white hover:underline flex items-center gap-1"
                          >
                            PRODECEQXXX {copiedKey === 'pro_swift' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-zinc-500" />}
                          </button>
                        </p>
                        <p className="flex justify-between">
                          <span>Holder:</span>
                          <span className="text-white">VERMILION ROUTES</span>
                        </p>
                        <p className="flex justify-between">
                          <span>RUC:</span>
                          <span className="text-zinc-300">1711992808001</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Receipt Upload Form */}
                  <form onSubmit={handleSubmitReceipt} className="space-y-4 pt-2 border-t border-zinc-800">
                    <h4 className="font-bold text-white text-sm flex items-center gap-1.5">
                      <Upload className="w-4 h-4 text-emerald-400" />
                      Attach Transfer Screenshot / Receipt Photo
                    </h4>

                    <div className="border-2 border-dashed border-zinc-700 hover:border-emerald-500/80 rounded-2xl p-4 text-center transition-all bg-zinc-950/60 cursor-pointer relative">
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={handleFileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                      {previewUrl ? (
                        <div className="space-y-2">
                          <div className="relative w-32 h-20 mx-auto rounded-lg overflow-hidden border border-zinc-700">
                            <Image src={previewUrl} alt="Receipt Preview" fill className="object-cover" />
                          </div>
                          <p className="text-emerald-400 font-medium text-xs">
                            {bankReceipt?.name} ({Math.round((bankReceipt?.size || 0) / 1024)} KB)
                          </p>
                          <span className="text-[11px] text-zinc-500">Click to change file</span>
                        </div>
                      ) : (
                        <div className="space-y-1.5 py-3">
                          <Upload className="w-8 h-8 text-emerald-500 mx-auto" />
                          <p className="text-xs text-zinc-200 font-semibold">
                            Drag &amp; drop or click to upload receipt
                          </p>
                          <p className="text-[10px] text-zinc-500">Supports JPG, PNG, PDF up to 10MB</p>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="text-[11px] text-zinc-400 block mb-1">
                        Bank Transaction / Reference Number (Optional):
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Zelle Ref #12948 or Produbanco Sec #8483"
                        value={transferRef}
                        onChange={(e) => setTransferRef(e.target.value)}
                        className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase tracking-widest text-sm rounded-2xl transition-all shadow-lg shadow-emerald-950/80 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isProcessing ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Uploading &amp; Verifying Receipt...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Submit Transfer Receipt</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}
            </div>

            <p className="text-[11px] text-zinc-500 text-center leading-relaxed">
              By confirming payment, you authorize Agencia de Viajes Vermilion to secure your travel booking under our{' '}
              <a href="/terms" target="_blank" className="text-emerald-400 underline">Terms</a> and{' '}
              <a href="/privacy-policy" target="_blank" className="text-emerald-400 underline">Privacy Policy</a>.
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
