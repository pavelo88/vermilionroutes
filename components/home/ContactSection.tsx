'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { createBookingInFirestore } from '@/lib/bookings';
import { filterPhoneInput, isValidEmail, isValidPhone, sanitizeText } from '@/lib/validation';
import { useTranslations } from 'next-intl';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2, AlertCircle } from 'lucide-react';

export function ContactSection() {
  const t = useTranslations('contact');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: 'Galapagos Islands',
    travelers: '2 Travelers',
    message: '',
  });

  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string; submit?: string }>({});

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filtered = filterPhoneInput(e.target.value);
    setFormData((prev) => ({ ...prev, phone: filtered }));
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
  };

  const validateForm = (): boolean => {
    const newErrors: { name?: string; email?: string; phone?: string } = {};

    const cleanName = sanitizeText(formData.name);
    if (!cleanName || cleanName.length < 2) {
      newErrors.name = 'Please enter your name (minimum 2 characters).';
    }

    if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (formData.phone && !isValidPhone(formData.phone)) {
      newErrors.phone = 'Valid phone format: numbers, spaces, parentheses & leading + only.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tourId: 'general-inquiry',
          tourTitle: `Custom Trip to ${formData.destination}`,
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          destination: formData.destination,
          guestsCount: formData.travelers,
          message: formData.message,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit request.');
      }

      setSubmitted(true);
    } catch (err: any) {
      console.warn('API /api/leads contact submission failed, falling back to direct Firestore:', err);
      try {
        await createBookingInFirestore({
          tourId: 'general-inquiry',
          tourTitle: `Custom Trip to ${formData.destination}`,
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          destination: formData.destination,
          guestsCount: formData.travelers,
          message: formData.message,
        });
        setSubmitted(true);
      } catch (fallbackErr: any) {
        console.error('Contact form submission error:', fallbackErr);
        setErrors({ submit: fallbackErr.message || 'Failed to submit request. Please try again.' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-10 md:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-200 dark:border-zinc-800/60">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Col Info */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-3">
            <span className="text-emerald-600 text-xs font-bold uppercase tracking-wider block">
              {t('badge')}
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight">
              {t('title')}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
              {t('subtitle')}
            </p>
          </div>

          <div className="space-y-4">
            <a
              href="tel:+593994048458"
              className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm hover:border-emerald-500/50 hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-zinc-400 font-medium block">{t('directCall')}</span>
                <span className="font-semibold text-zinc-900 dark:text-white text-sm group-hover:text-emerald-600 transition-colors">
                  +593 99 404 8458
                </span>
              </div>
            </a>

            <a
              href="mailto:info@vermilionroutes.com"
              className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm hover:border-emerald-500/50 hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-zinc-400 font-medium block">{t('emailAddress')}</span>
                <span className="font-semibold text-zinc-900 dark:text-white text-sm group-hover:text-emerald-600 transition-colors">
                  info@vermilionroutes.com
                </span>
              </div>
            </a>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-zinc-400 font-medium block">{t('headquarters')}</span>
                <span className="font-semibold text-zinc-900 dark:text-white text-sm">
                  {t('address')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col Form */}
        <div className="lg:col-span-7 bg-white dark:bg-zinc-900/80 p-8 sm:p-10 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xl">
          {submitted ? (
            <div className="text-center py-12 space-y-4 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-zinc-900 dark:text-white">
                {t('success')}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm max-w-md mx-auto">
                {formData.name}
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    destination: 'Galapagos Islands',
                    travelers: '2 Travelers',
                    message: ''
                  });
                }}
              >
                Submit another request
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800/50">
                <h3 className="font-serif font-bold text-xl text-zinc-900 dark:text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-emerald-600" />
                  <span>{t('title')}</span>
                </h3>
                <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full">
                  {t('noCommitment')}
                </span>
              </div>

              {errors.submit && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>{errors.submit}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">{t('name')} *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Eleanor Vance"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    suppressHydrationWarning
                    className={`w-full bg-zinc-50 dark:bg-zinc-900/50 border rounded-xl px-4 py-3 text-sm text-zinc-900 dark:text-white focus:outline-none transition-colors ${
                      errors.name
                        ? 'border-rose-400 bg-rose-50/40 focus:border-rose-500'
                        : 'border-zinc-200 dark:border-zinc-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
                    }`}
                  />
                  {errors.name && <p className="text-[11px] text-rose-600 font-medium">{errors.name}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">{t('email')} *</label>
                  <input
                    type="email"
                    required
                    placeholder="eleanor@example.com"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    suppressHydrationWarning
                    className={`w-full bg-zinc-50 dark:bg-zinc-900/50 border rounded-xl px-4 py-3 text-sm text-zinc-900 dark:text-white focus:outline-none transition-colors ${
                      errors.email
                        ? 'border-rose-400 bg-rose-50/40 focus:border-rose-500'
                        : 'border-zinc-200 dark:border-zinc-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
                    }`}
                  />
                  {errors.email && <p className="text-[11px] text-rose-600 font-medium">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">{t('phone')}</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    suppressHydrationWarning
                    className={`w-full bg-zinc-50 dark:bg-zinc-900/50 border rounded-xl px-4 py-3 text-sm text-zinc-900 dark:text-white focus:outline-none transition-colors ${
                      errors.phone
                        ? 'border-rose-400 bg-rose-50/40 focus:border-rose-500'
                        : 'border-zinc-200 dark:border-zinc-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
                    }`}
                  />
                  {errors.phone && <p className="text-[11px] text-rose-600 font-medium">{errors.phone}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">{t('destination')}</label>
                  <select
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    suppressHydrationWarning
                    className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                  >
                    <option value="Galapagos Islands">{t('optGalapagos')}</option>
                    <option value="Mainland Ecuador">{t('optMainland')}</option>
                    <option value="Galapagos & Ecuador Combo">{t('optCombo')}</option>
                    <option value="Full Day Excursions">{t('optFullDay')}</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">{t('travelers')}</label>
                  <select
                    value={formData.travelers}
                    onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                    suppressHydrationWarning
                    className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                  >
                    <option value="1 Traveler">{t('opt1')}</option>
                    <option value="2 Travelers">{t('opt2')}</option>
                    <option value="3-5 Travelers">{t('opt35')}</option>
                    <option value="6+ Travelers">{t('opt6plus')}</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  {t('message')}
                </label>
                <textarea
                  rows={4}
                  placeholder="e.g. Planning to travel in October for 10 days, interested in a 5-day Galapagos premium cruise and visiting Machu Picchu aboard the Vistadome train..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <Button
                variant="primary"
                size="lg"
                disabled={isSubmitting}
                className="w-full gap-2 shadow-md cursor-pointer"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{t('sending')}</span>
                  </span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{t('send')}</span>
                  </>
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
