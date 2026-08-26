'use client';

import React, { useState } from 'react';
import { useLocale } from 'next-intl';
import {
  Wallet,
  Globe,
  Headphones,
  Star,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Users,
  Copy,
  Check,
  Sparkles,
  ShieldCheck,
  Layers,
  ArrowUpRight,
  Percent,
  Lock
} from 'lucide-react';
import { registerAffiliateInFirestore, AffiliateAccount } from '@/lib/affiliates';

const UNILEVEL_DISPLAY = [
  { level: 'Nivel 1 (Tú / Venta Directa)', levelEn: 'Level 1 (Direct Seller)', rate: '8.0%', descEs: 'Tu comisión por cada venta directa generada con tu enlace.', descEn: 'Direct commission earned on every customer booking.' },
  { level: 'Nivel 2 (Tus Hijos / Afiliados Directos)', levelEn: 'Level 2 (Your Direct Recruits)', rate: '3.5%', descEs: 'Ganas de cada venta que hagan los afiliados que tú invitaste.', descEn: 'Earn on every sale made by your direct recruits.' },
  { level: 'Nivel 3 (Nietos)', levelEn: 'Level 3 (Grandchildren)', rate: '2.0%', descEs: 'Comisión pasiva por las ventas de la 3era generación.', descEn: 'Passive commission from 3rd-generation referrals.' },
  { level: 'Nivel 4 (Bisnietos)', levelEn: 'Level 4 (Great-Grandchildren)', rate: '1.0%', descEs: 'Crecimiento de red en profundidad garantizado.', descEn: 'Deep team volume compensation.' },
  { level: 'Nivel 5 (Tataranietos)', levelEn: 'Level 5 (5th Generation)', rate: '0.5%', descEs: 'Máxima profundidad estándar del plan univel.', descEn: 'Maximum standard unilevel base tier.' },
];

const LEADERSHIP_TIERS = [
  { rank: 'Plata (Silver)', override: '+1.0%', conditionEs: '5+ Ventas activas en tu equipo', conditionEn: '5+ Active team bookings' },
  { rank: 'Oro (Gold)', override: '+2.0%', conditionEs: '15+ Ventas de equipo o $20,000 en volumen', conditionEn: '15+ Team sales or $20k volume' },
  { rank: 'Diamante / Fundador', override: 'Hasta +5.0% Diferencial', conditionEs: 'Líderes que forman empresas de reclutamiento', conditionEn: 'Founding leaders building sales teams' }
];

export default function AffiliatesPage() {
  const locale = useLocale();
  const isEs = locale === 'es';

  // Form State
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    sponsorCode: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [registeredAffiliate, setRegisteredAffiliate] = useState<AffiliateAccount | null>(null);
  const [copied, setCopied] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;

    if (form.password.length < 8) {
      setErrorMsg(isEs ? 'La contraseña debe tener al menos 8 caracteres.' : 'Password must be at least 8 characters.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      const account = await registerAffiliateInFirestore({
        email: form.email,
        name: form.name,
        phone: form.phone,
        sponsorCode: form.sponsorCode || undefined
      });
      setRegisteredAffiliate(account);
      setStatus('success');
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || (isEs ? 'Error al registrarte. Intenta de nuevo.' : 'Registration error. Please try again.'));
      setStatus('error');
    }
  };

  const copyReferralLink = (code: string) => {
    const link = `https://vermilionroutes.com/${locale}?ref=${code}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] dark:bg-[#1A2421] text-[#1C1F1E] dark:text-[#EAECEB] pt-32 pb-24 font-sans selection:bg-[#C49B45] selection:text-white transition-colors duration-300">

      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center space-y-6 pb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C49B45]/15 border border-[#C49B45]/30 text-[#C49B45] dark:text-[#D1A852] text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isEs ? 'Comisiones Transparentes • 5 Niveles • Tope 20%' : 'Transparent Multilevel • 5 Tiers • 20% Strict Cap'}</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-white leading-tight">
          {isEs ? 'Programa de Afiliados & Red Multinivel Vermilion' : 'Vermilion Affiliate & Multilevel Network'}
        </h1>

        <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed">
          {isEs
            ? 'Monetiza tu red promoviendo las expediciones más extraordinarias de Ecuador y Galápagos. Tus clientes reciben automáticamente un 10% de descuento y tú construyes un equipo de hasta 5 niveles con comisiones protegidas.'
            : 'Monetize your network by promoting premier Galapagos & Ecuador expeditions. Your clients automatically receive a 10% discount, and you build a team up to 5 levels deep.'}
        </p>

        {/* 10% Discount Badge Banner */}
        <div className="inline-flex items-center gap-3 p-3.5 px-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm font-semibold shadow-sm">
          <Percent className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>
            {isEs
              ? 'Tus clientes obtienen automáticamente 10% OFF en cualquier tour al ingresar con tu enlace único.'
              : 'Your clients automatically receive 10% OFF any expedition when using your referral link.'}
          </span>
        </div>
      </section>

      {/* 5-Level Unilevel Plan Visualization */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pb-20">
        <div className="text-center space-y-2 mb-10">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
            {isEs ? 'Estructura de Comisiones Base (5 Niveles = 15%)' : 'Base 5-Level Payout (15% Subtotal)'}
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm">
            {isEs ? 'Ganas no solo por lo que vendes tú, sino por las ventas de todo tu equipo hacia abajo.' : 'Earn from your direct sales and from your downline team members.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {UNILEVEL_DISPLAY.map((tier, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-[#232D2A] p-5 rounded-2xl border border-zinc-200/80 dark:border-white/5 shadow-sm space-y-3 flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C49B45] dark:text-[#D1A852] block">
                  {isEs ? tier.level : tier.levelEn}
                </span>
                <p className="font-serif text-3xl font-bold text-zinc-900 dark:text-white mt-1">
                  {tier.rate}
                </p>
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {isEs ? tier.descEs : tier.descEn}
              </p>
            </div>
          ))}
        </div>

        {/* Leadership & Mathematical Cap Note */}
        <div className="mt-6 p-6 rounded-3xl bg-[#F1F3F2] dark:bg-[#181B1A] border border-zinc-200/80 dark:border-white/5 space-y-4">
          <div className="flex items-center gap-2 text-zinc-900 dark:text-white font-bold text-sm">
            <ShieldCheck className="w-5 h-5 text-[#C49B45] dark:text-[#D1A852]" />
            <span>{isEs ? 'Bono de Liderazgo Diferencial (5% Restante) & Garantía del Tope 20%' : 'Differential Leadership Bonus (Remaining 5%) & 20% Strict Cap'}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            {LEADERSHIP_TIERS.map((lead, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-white dark:bg-[#232D2A] border border-zinc-200/60 dark:border-white/5 space-y-1">
                <div className="flex justify-between font-bold text-zinc-900 dark:text-white">
                  <span>{lead.rank}</span>
                  <span className="text-[#C49B45] dark:text-[#D1A852]">{lead.override}</span>
                </div>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">{isEs ? lead.conditionEs : lead.conditionEn}</p>
              </div>
            ))}
          </div>

          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed border-t border-zinc-200/60 dark:border-white/5 pt-3">
            {isEs
              ? '⚖️ Garantía Financiera Inquebrantable: La suma del Plan Univel (15%) + el Fondo de Liderazgo Diferencial (5%) está bloqueada al 20.00% exacto del valor del tour. La empresa jamás pierde rentabilidad y los líderes siempre cobran justamente.'
              : '⚖️ Unbreakable Math Cap: Unilevel (15%) + Leadership Pool (5%) is strictly capped at 20.00% of the booking value. Total stability guaranteed.'}
          </p>
        </div>
      </section>

      {/* Registration & Affiliate Dashboard Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <div className="bg-white dark:bg-[#232D2A] rounded-3xl border border-zinc-200/80 dark:border-white/10 shadow-xl p-6 sm:p-10 space-y-6">
          
          {status === 'success' && registeredAffiliate ? (
            <div className="text-center space-y-6 animate-fade-in py-4">
              <div className="w-16 h-16 bg-[#C49B45]/15 text-[#C49B45] dark:text-[#D1A852] border border-[#C49B45]/30 rounded-full flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h3 className="font-serif text-2xl font-bold text-zinc-900 dark:text-white">
                  {isEs ? `¡Bienvenido a la Red, ${registeredAffiliate.name}!` : `Welcome to the Network, ${registeredAffiliate.name}!`}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {isEs
                    ? 'Tu cuenta de afiliado ha sido registrada exitosamente con tu correo electrónico.'
                    : 'Your affiliate account is now active with your email address as your unique ID.'}
                </p>
              </div>

              {/* Unique Code Box */}
              <div className="p-5 bg-[#FBFBFA] dark:bg-[#181B1A] border border-zinc-200 dark:border-white/5 rounded-2xl space-y-3 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                    {isEs ? 'Tu Código Único de Afiliado' : 'Your Unique Referral Code'}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                    10% Buyer Discount Active
                  </span>
                </div>

                <div className="flex items-center justify-between bg-white dark:bg-[#232D2A] p-3 rounded-xl border border-zinc-200/80 dark:border-white/10">
                  <span className="font-mono text-lg font-bold text-[#C49B45] dark:text-[#D1A852]">
                    {registeredAffiliate.referralCode}
                  </span>
                  <button
                    type="button"
                    onClick={() => copyReferralLink(registeredAffiliate.referralCode)}
                    className="px-3 py-1.5 bg-[#C49B45] hover:bg-[#B38A34] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? (isEs ? '¡Copiado!' : 'Copied!') : (isEs ? 'Copiar Enlace' : 'Copy Link')}</span>
                  </button>
                </div>

                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono break-all">
                  Link: https://vermilionroutes.com/{locale}?ref={registeredAffiliate.referralCode}
                </p>
              </div>

              {/* Stats Preview Card */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 bg-[#F1F3F2] dark:bg-[#181B1A] rounded-xl border border-zinc-200/60 dark:border-white/5">
                  <span className="text-[10px] uppercase font-bold text-zinc-400 block">{isEs ? 'Balance Ganado' : 'Total Earnings'}</span>
                  <p className="text-lg font-bold font-serif text-emerald-600 dark:text-emerald-400">$0.00</p>
                </div>
                <div className="p-3 bg-[#F1F3F2] dark:bg-[#181B1A] rounded-xl border border-zinc-200/60 dark:border-white/5">
                  <span className="text-[10px] uppercase font-bold text-zinc-400 block">{isEs ? 'Ventas de Red' : 'Team Sales'}</span>
                  <p className="text-lg font-bold font-serif text-zinc-900 dark:text-white">0</p>
                </div>
                <div className="p-3 bg-[#F1F3F2] dark:bg-[#181B1A] rounded-xl border border-zinc-200/60 dark:border-white/5">
                  <span className="text-[10px] uppercase font-bold text-zinc-400 block">{isEs ? 'Tu Rango' : 'Your Rank'}</span>
                  <p className="text-lg font-bold font-serif text-[#C49B45] dark:text-[#D1A852]">Standard</p>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center space-y-1.5">
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
                  {isEs ? 'Regístrate como Afiliado' : 'Register as an Affiliate Partner'}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {isEs
                    ? 'Tu correo será tu identificador único. Recibirás tu código personal inmediatamente.'
                    : 'Your email address is your unique partner ID. Instant referral code generation.'}
                </p>
              </div>

              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    {isEs ? 'Nombre Completo *' : 'Full Name *'}
                  </label>
                  <input
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder={isEs ? 'Tu Nombre Completo' : 'Your Full Name'}
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#C49B45]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                      {isEs ? 'Correo Electrónico (Tu ID Único) *' : 'Email Address (Your Unique ID) *'}
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="email@ejemplo.com"
                      className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#C49B45]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                      {isEs ? 'Contraseña Segura (Mínimo 8 caracteres) *' : 'Secure Password (Min 8 chars) *'}
                    </label>
                    <input
                      name="password"
                      type="password"
                      required
                      value={form.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#C49B45]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                      {isEs ? 'WhatsApp / Teléfono' : 'Phone / WhatsApp'}
                    </label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+593 99 000 0000"
                      className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#C49B45]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center justify-between">
                      <span>{isEs ? 'Código de Patrocinador (Opcional)' : 'Sponsor Code (Optional)'}</span>
                      <span className="text-[10px] text-zinc-400">{isEs ? 'Si alguien te invitó' : 'If invited'}</span>
                    </label>
                    <input
                      name="sponsorCode"
                      value={form.sponsorCode}
                      onChange={handleChange}
                      placeholder="e.g. PABLO2026"
                      className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#C49B45] uppercase"
                    />
                  </div>
                </div>

                {errorMsg && (
                  <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-400 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-4 bg-[#C49B45] hover:bg-[#B38A34] text-white font-bold uppercase tracking-widest text-xs rounded-2xl transition-all shadow-md shadow-amber-900/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {status === 'loading' ? (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>{isEs ? 'Crear Mi Cuenta y Generar Código' : 'Create Account & Generate Code'}</span>
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </section>

    </div>
  );
}