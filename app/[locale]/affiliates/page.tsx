'use client';

import React, { useState } from 'react';
import { useLocale } from 'next-intl';
import { Wallet, Globe, Headphones, Star, CheckCircle2, AlertCircle, ChevronRight, Users } from 'lucide-react';
import { db } from '@/lib/firebase';
import { addDoc, collection } from 'firebase/firestore';

const TIERS = [
  { id: 'explorer', nameEn: 'Explorer', nameEs: 'Explorador', commission: '5%', descEn: 'Perfect for independent agents and new referral partners.', descEs: 'Ideal para agentes independientes y nuevos socios referidores.', perks: ['Up to 3 referrals/month', 'Dedicated partner portal', 'Marketing materials'], perksEs: ['Hasta 3 referencias/mes', 'Portal de socio dedicado', 'Materiales de marketing'], color: 'bg-zinc-100 dark:bg-zinc-800' },
  { id: 'pathfinder', nameEn: 'Pathfinder', nameEs: 'Explorador Pro', commission: '8%', descEn: 'For active curators generating consistent bookings.', descEs: 'Para curadores activos que generan reservas consistentes.', perks: ['4–10 referrals/month', 'Priority 24/7 support', 'Co-branded proposals', 'Monthly performance reports'], perksEs: ['4–10 referencias/mes', 'Soporte prioritario 24/7', 'Propuestas co-marcadas', 'Informes mensuales'], color: 'bg-emerald-950/10 dark:bg-emerald-950/40', featured: true },
  { id: 'expedition', nameEn: 'Expedition Partner', nameEs: 'Socio de Expedicion', commission: '12%', descEn: 'Our elite tier for agencies and high-volume curators.', descEs: 'Nivel elite para agencias y curadores de alto volumen.', perks: ['10+ referrals/month', 'Dedicated account manager', 'White-label itineraries', 'Fam trips invitation'], perksEs: ['10+ referencias/mes', 'Gestor de cuenta dedicado', 'Itinerarios marca blanca', 'Invitacion a viajes FAM'], color: 'bg-zinc-100 dark:bg-zinc-800' },
];

const BENEFITS = [
  { icon: Wallet, en: 'Competitive Commission Structure', es: 'Estructura de Comisiones Competitiva' },
  { icon: Globe, en: 'World-Class Destinations to Promote', es: 'Destinos de Talla Mundial que Promover' },
  { icon: Headphones, en: 'Dedicated Partner Support Team', es: 'Equipo de Soporte Dedicado al Socio' },
  { icon: Star, en: 'Exclusive FAM Trips for Top Partners', es: 'Viajes FAM Exclusivos para Top Socios' },
];

export default function AffiliatesPage() {
  const locale = useLocale();
  const isEs = locale === 'es';

  const [form, setForm] = useState({ name: '', email: '', phone: '', website: '', type: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.type) return;
    setStatus('loading');
    try {
      await addDoc(collection(db, 'affiliate_applications'), {
        ...form,
        locale,
        createdAt: new Date().toISOString(),
        status: 'pending',
      });
      setStatus('success');
    } catch (err) {
      console.error(err);
      setErrorMsg(isEs ? 'Error al enviar. Por favor intentalo de nuevo.' : 'Error submitting. Please try again.');
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#07130C] text-zinc-900 dark:text-zinc-100 pt-32 pb-20">

      {/* Hero */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center space-y-6 pb-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
          <Users className="w-3.5 h-3.5" />
          <span>{isEs ? 'Programa de Afiliados y B2B' : 'Affiliate & B2B Program'}</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-white leading-tight">
          {isEs ? 'Se un Curador de Experiencias Vermilion' : 'Become a Vermilion Routes Experience Curator'}
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          {isEs ? 'Unete a nuestra red exclusiva de agencias, creadores de contenido y agentes independientes que recomiendan las expediciones mas extraordinarias de Ecuador y Galapagos.' : "Join our exclusive network of agencies, content creators, and independent agents who recommend Ecuador and Galapagos' most extraordinary expeditions."}
        </p>
      </section>

      {/* Benefits */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pb-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {BENEFITS.map((b, i) => (
            <div key={i} className="bg-white dark:bg-zinc-900/80 rounded-2xl p-6 border border-zinc-200/60 dark:border-zinc-800/60 shadow-sm text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950/40 flex items-center justify-center mx-auto">
                <b.icon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">{isEs ? b.es : b.en}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Commission Tiers */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pb-20">
        <div className="text-center space-y-3 mb-10">
          <h2 className="font-serif text-3xl font-bold text-zinc-900 dark:text-white">{isEs ? 'Niveles de Comision' : 'Commission Tiers'}</h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">{isEs ? 'Elige el nivel que mejor se adapte a tu volumen de referidos.' : 'Choose the tier that best fits your referral volume.'}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TIERS.map((tier) => (
            <div key={tier.id} className={`rounded-3xl p-8 border ${tier.featured ? 'border-emerald-400/50 dark:border-emerald-600/50 ring-2 ring-emerald-500/30' : 'border-zinc-200/60 dark:border-zinc-800/60'} ${tier.color} space-y-5 relative`}>
              {tier.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold shadow">
                  <Star className="w-3 h-3" /> {isEs ? 'Mas Popular' : 'Most Popular'}
                </div>
              )}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">{isEs ? tier.nameEs : tier.nameEn}</p>
                <p className="font-serif text-4xl font-bold text-zinc-900 dark:text-white mt-1">{tier.commission} <span className="text-sm font-normal text-zinc-500">/ referral</span></p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">{isEs ? tier.descEs : tier.descEn}</p>
              </div>
              <ul className="space-y-2">
                {(isEs ? tier.perksEs : tier.perks).map((perk, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />{perk}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Application Form */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <div className="bg-white dark:bg-zinc-900/80 rounded-3xl border border-zinc-200/60 dark:border-zinc-800/60 shadow-lg p-8 sm:p-12">
          {status === 'success' ? (
            <div className="text-center space-y-4 py-8">
              <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
              <h3 className="font-serif text-2xl font-bold text-zinc-900 dark:text-white">{isEs ? 'Solicitud Recibida!' : 'Application Received!'}</h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">{isEs ? 'Nuestro equipo revisara tu solicitud y te contactara en 48 horas.' : 'Our team will review your application and contact you within 48 hours.'}</p>
            </div>
          ) : (
            <>
              <div className="text-center space-y-2 mb-8">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">{isEs ? 'Solicitar Acceso al Programa' : 'Apply to the Program'}</h2>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm">{isEs ? 'Completa el formulario y te contactaremos en 48 horas.' : 'Fill out the form and we will contact you within 48 hours.'}</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">{isEs ? 'Nombre Completo *' : 'Full Name *'}</label>
                    <input name="name" value={form.name} onChange={handleChange} required placeholder={isEs ? 'Tu nombre completo' : 'Your full name'} className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">{isEs ? 'Correo Electronico *' : 'Email Address *'}</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="email@ejemplo.com" className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">WhatsApp / {isEs ? 'Telefono' : 'Phone'}</label>
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="+1 555 000 0000" className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">Website / Instagram</label>
                    <input name="website" value={form.website} onChange={handleChange} placeholder="https://tuagencia.com" className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">{isEs ? 'Tipo de Socio *' : 'Partner Type *'}</label>
                  <select name="type" value={form.type} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
                    <option value="">{isEs ? 'Selecciona una opcion' : 'Select an option'}</option>
                    <option value="agency">{isEs ? 'Agencia de Viajes' : 'Travel Agency'}</option>
                    <option value="content_creator">{isEs ? 'Creador de Contenido / Influencer' : 'Content Creator / Influencer'}</option>
                    <option value="freelance">{isEs ? 'Agente Independiente' : 'Freelance Agent'}</option>
                    <option value="other">{isEs ? 'Otro' : 'Other'}</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">{isEs ? 'Cuentanos sobre ti' : 'Tell Us About Yourself'}</label>
                  <textarea name="message" value={form.message} onChange={handleChange} rows={4} placeholder={isEs ? 'Describe tu audiencia, mercado o forma de trabajo...' : 'Describe your audience, market, or how you work...'} className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none" />
                </div>
                {status === 'error' && (
                  <div className="flex items-center gap-2 text-rose-600 text-xs">
                    <AlertCircle className="w-4 h-4 shrink-0" /><span>{errorMsg}</span>
                  </div>
                )}
                <button type="submit" disabled={status === 'loading'} className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-sm transition-all hover:scale-[1.02] shadow-lg">
                  {status === 'loading' ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <ChevronRight className="w-4 h-4" />}
                  {isEs ? 'Enviar Solicitud' : 'Submit Application'}
                </button>
              </form>
            </>
          )}
        </div>
      </section>
    </div>
  );
}