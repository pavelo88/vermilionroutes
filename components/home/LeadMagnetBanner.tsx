'use client';

import React, { useState } from 'react';
import { useLocale } from 'next-intl';
import { Mail, CheckCircle2, AlertCircle, Download } from 'lucide-react';

export function LeadMagnetBanner() {
  const locale = useLocale();
  const isEs = locale === 'es';
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/leads/magnet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), locale }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus('success');
      } else {
        setErrorMsg(data.error || (isEs ? 'Error al enviar. Intentalo de nuevo.' : 'Error sending. Please try again.'));
        setStatus('error');
      }
    } catch {
      setErrorMsg(isEs ? 'Error de conexion. Intentalo de nuevo.' : 'Connection error. Please try again.');
      setStatus('error');
    }
  };

  return (
    <div className="rounded-3xl bg-gradient-to-br from-emerald-950 to-emerald-800 p-8 sm:p-10 my-10 border border-emerald-700/40 shadow-xl relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_2px_2px,white_1px,transparent_0)] bg-[size:24px_24px]" />
      <div className="relative z-10">
        {status === 'success' ? (
          <div className="text-center space-y-3 py-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h3 className="font-serif text-2xl font-bold text-white">
              {isEs ? 'Revisa tu correo!' : 'Check your inbox!'}
            </h3>
            <p className="text-emerald-300 text-sm">
              {isEs ? 'Te hemos enviado la guia. Nos vemos pronto en Ecuador.' : "We have sent you the guide. See you soon in Ecuador."}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600/40 flex items-center justify-center shrink-0 border border-emerald-500/30">
                <Download className="w-6 h-6 text-emerald-300" />
              </div>
              <div className="space-y-1">
                <div className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
                  {isEs ? 'Descarga Gratuita' : 'Free Download'}
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white leading-tight">
                  {isEs
                    ? 'Guia Definitiva de Equipaje para Ecuador y Galapagos 2026'
                    : 'The Ultimate Ecuador & Galapagos Packing List 2026'}
                </h3>
                <p className="text-emerald-300/80 text-sm">
                  {isEs
                    ? 'Curada por nuestros guias naturalistas. Enviada directamente a tu correo.'
                    : 'Curated by our expert naturalist guides. Sent directly to your inbox.'}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (status === 'error') setStatus('idle'); }}
                  placeholder={isEs ? 'tu@correo.com' : 'your@email.com'}
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-sm transition-all hover:scale-105 shadow-lg shrink-0"
              >
                {status === 'loading' ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                {isEs ? 'Descargar Gratis' : 'Get Free Guide'}
              </button>
            </form>

            {status === 'error' && (
              <div className="flex items-center gap-2 text-rose-300 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <p className="text-emerald-400/60 text-xs">
              {isEs ? 'Sin spam. Puedes darte de baja cuando quieras.' : 'No spam. Unsubscribe anytime.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}