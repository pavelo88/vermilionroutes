'use client';

import React, { useState } from 'react';
import { Tour } from '@/types';
import { Copy, CheckCircle2, Link as LinkIcon, RefreshCw } from 'lucide-react';

interface AdminPaymentLinksProps {
  tours: Tour[];
}

export function AdminPaymentLinks({ tours }: AdminPaymentLinksProps) {
  const [selectedTour, setSelectedTour] = useState<string>('custom');
  const [clientEmail, setClientEmail] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientEmail) return;

    setIsGenerating(true);
    setGeneratedUrl('');
    setCopied(false);

    try {
      const res = await fetch('/api/checkout/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tourId: selectedTour === 'custom' ? null : selectedTour,
          clientEmail,
          customLinkId: `admin-gen-${Date.now()}`
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
    <div className="bg-zinc-900/80 rounded-3xl border border-zinc-800 p-6 sm:p-8 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <LinkIcon className="w-5 h-5 text-emerald-500" />
          Generate Payment Links
        </h2>
        <p className="text-sm text-zinc-400 mt-1">
          Create secure $500 USD deposit payment links to send directly to your VIP clients.
        </p>
      </div>

      <form onSubmit={handleGenerate} className="max-w-xl space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-300">Select Tour Package</label>
          <select
            value={selectedTour}
            onChange={(e) => setSelectedTour(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-300 focus:border-emerald-500 focus:outline-none"
          >
            <option value="custom">-- Custom / Tailor-Made Itinerary --</option>
            {tours.map(t => (
              <option key={t.id} value={t.id}>{t.title} ({t.duration})</option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-300">Client Email</label>
          <input
            type="email"
            required
            placeholder="client@example.com"
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-300 focus:border-emerald-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={isGenerating}
          className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <LinkIcon className="w-4 h-4" />}
          {isGenerating ? 'Generating...' : 'Generate $500 Deposit Link'}
        </button>
      </form>

      {generatedUrl && (
        <div className="mt-8 p-5 bg-emerald-950/40 border border-emerald-900/50 rounded-2xl space-y-3">
          <h3 className="text-sm font-bold text-emerald-400">Payment Link Ready</h3>
          <p className="text-xs text-zinc-400">Copy and send this secure Stripe checkout link to your client.</p>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={generatedUrl}
              className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-300"
            />
            <button
              onClick={copyToClipboard}
              className="bg-zinc-800 hover:bg-zinc-700 text-white p-2 rounded-xl transition-colors shrink-0"
            >
              {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
