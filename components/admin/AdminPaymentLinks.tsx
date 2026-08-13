'use client';

import React, { useState } from 'react';
import { Tour } from '@/types';
import { Copy, CheckCircle2, Link as LinkIcon, RefreshCw, ExternalLink, DollarSign, ShieldCheck } from 'lucide-react';

interface AdminPaymentLinksProps {
  tours: Tour[];
}

function getSafeText(val: any): string {
  if (!val) return '';
  if (typeof val === 'string') return val;
  if (typeof val === 'object') return val.es || val.en || Object.values(val)[0] || '';
  return String(val);
}

export function AdminPaymentLinks({ tours }: AdminPaymentLinksProps) {
  const [selectedTourId, setSelectedTourId] = useState<string>('custom');
  const [paymentOption, setPaymentOption] = useState<'deposit' | 'full-3star' | 'full-4star' | 'custom'>('deposit');
  const [customAmount, setCustomAmount] = useState<string>('500');
  const [clientEmail, setClientEmail] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const selectedTour = tours.find(t => t.id === selectedTourId);

  // Compute total amount based on selection
  const getComputedAmount = (): number => {
    if (paymentOption === 'deposit') return 500;
    if (paymentOption === 'custom') return Number(customAmount) || 500;
    if (selectedTour) {
      if (paymentOption === 'full-3star') return selectedTour.price3Star || selectedTour.price || 1500;
      if (paymentOption === 'full-4star') return selectedTour.price4Star || selectedTour.price || 1800;
    }
    return 500;
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientEmail) return;

    setIsGenerating(true);
    setGeneratedUrl('');
    setCopied(false);

    const amountUSD = getComputedAmount();
    const isFullPayment = paymentOption !== 'deposit';
    const tourTitleStr = selectedTour ? getSafeText(selectedTour.title) : 'Custom Tailor-Made Expeditions';

    try {
      const res = await fetch('/api/checkout/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tourId: selectedTourId === 'custom' ? null : selectedTourId,
          tourTitle: tourTitleStr,
          clientEmail,
          amount: amountUSD,
          paymentType: isFullPayment ? 'full' : 'deposit',
          customLinkId: `admin-vip-${Date.now()}`
        })
      });

      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || 'Failed to generate link');
      
      if (data.url) {
        setGeneratedUrl(data.url);
      }
    } catch (err: any) {
      alert('Error generating payment link: ' + err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-zinc-900/90 rounded-3xl border border-zinc-800 p-6 sm:p-8 space-y-6 shadow-xl">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <LinkIcon className="w-5 h-5 text-emerald-500" />
          <span>VIP Payment Link Generator</span>
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          Generate custom reservation deposit links ($500 USD) or full itinerary payment links for your clients.
        </p>
      </div>

      <form onSubmit={handleGenerate} className="max-w-xl space-y-5">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300">Select Tour Package</label>
          <select
            value={selectedTourId}
            onChange={(e) => setSelectedTourId(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-200 focus:border-emerald-500 focus:outline-none"
          >
            <option value="custom">-- Custom / Tailor-Made Itinerary --</option>
            {tours.map(t => (
              <option key={t.id} value={t.id}>
                {getSafeText(t.title)} ({getSafeText(t.duration)}) - ${t.price3Star || t.price} USD
              </option>
            ))}
          </select>
        </div>

        {/* Payment Amount Type */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300">Payment Option</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setPaymentOption('deposit')}
              className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                paymentOption === 'deposit'
                  ? 'bg-emerald-950/60 border-emerald-500 text-white font-semibold'
                  : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              <div className="font-bold text-emerald-400">$500 USD Deposit</div>
              <div className="text-[11px] text-zinc-400 mt-0.5">Minimum reservation deposit</div>
            </button>

            {selectedTour && (
              <>
                <button
                  type="button"
                  onClick={() => setPaymentOption('full-3star')}
                  className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                    paymentOption === 'full-3star'
                      ? 'bg-emerald-950/60 border-emerald-500 text-white font-semibold'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  <div className="font-bold text-emerald-400">
                    ${(selectedTour.price3Star || selectedTour.price || 0).toLocaleString()} USD (100% Full Payment)
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-0.5">3★ Hotel Category Full Price</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentOption('full-4star')}
                  className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                    paymentOption === 'full-4star'
                      ? 'bg-emerald-950/60 border-emerald-500 text-white font-semibold'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  <div className="font-bold text-emerald-400">
                    ${(selectedTour.price4Star || selectedTour.price || 0).toLocaleString()} USD (100% Full Payment)
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-0.5">4★ Hotel Category Full Price</div>
                </button>
              </>
            )}

            <button
              type="button"
              onClick={() => setPaymentOption('custom')}
              className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                paymentOption === 'custom'
                  ? 'bg-emerald-950/60 border-emerald-500 text-white font-semibold'
                  : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              <div className="font-bold text-emerald-400">Custom Amount</div>
              <div className="text-[11px] text-zinc-400 mt-0.5">Specify custom $ USD amount</div>
            </button>
          </div>
        </div>

        {paymentOption === 'custom' && (
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300">Custom Amount ($ USD)</label>
            <div className="relative">
              <DollarSign className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="number"
                required
                min="10"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-4 py-3 text-sm text-zinc-200 font-bold focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>
        )}

        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300">Client Email *</label>
          <input
            type="email"
            required
            placeholder="client@example.com"
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-200 focus:border-emerald-500 focus:outline-none"
          />
        </div>

        <div className="p-4 bg-zinc-950/70 border border-zinc-800 rounded-2xl flex items-center justify-between text-xs text-zinc-300">
          <span>Generated Payable Amount:</span>
          <span className="text-lg font-bold text-emerald-400 font-serif">
            ${getComputedAmount().toLocaleString()} USD
          </span>
        </div>

        <button
          type="submit"
          disabled={isGenerating}
          className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer shadow-lg shadow-emerald-950/60"
        >
          {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <LinkIcon className="w-4 h-4" />}
          {isGenerating ? 'Generating Link...' : `Generate $${getComputedAmount().toLocaleString()} USD Payment Link`}
        </button>
      </form>

      {generatedUrl && (
        <div className="mt-8 p-5 bg-emerald-950/40 border border-emerald-900/60 rounded-2xl space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>Payment Link Ready</span>
            </div>
            <span className="text-xs text-emerald-300 font-mono">${getComputedAmount().toLocaleString()} USD</span>
          </div>

          <p className="text-xs text-zinc-400">
            Copy and send this link directly to your client via WhatsApp or email.
          </p>

          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={generatedUrl}
              className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-zinc-200 font-mono"
            />
            <button
              onClick={copyToClipboard}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-xl transition-colors shrink-0 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <CheckCircle2 className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
            <a
              href={generatedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-zinc-800 hover:bg-zinc-700 text-white p-2.5 rounded-xl transition-colors shrink-0"
              title="Test Payment Page"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
