'use client';

import React, { useState } from 'react';
import { Tour } from '@/types';
import { Button } from '@/components/ui/Button';
import { createBookingInFirestore } from '@/lib/bookings';
import { filterPhoneInput, isValidEmail, isValidPhone, sanitizeText } from '@/lib/validation';
import { useLocale } from 'next-intl';
import { getLocalizedText } from '@/utils/i18nHelper';
import {
  Star,
  Clock,
  Calendar,
  Users,
  ShieldCheck,
  Send,
  MessageCircle,
  CheckCircle2,
  Sparkles,
  Zap,
  User,
  Mail,
  Phone,
  AlertCircle
} from 'lucide-react';

interface BookingSidebarProps {
  tour: Tour;
}

export function BookingSidebar({ tour }: BookingSidebarProps) {
  const locale = useLocale();
  const tourTitle = getLocalizedText(tour.title, locale);
  const tourDuration = getLocalizedText(tour.duration, locale);
  const tourDestination = getLocalizedText(tour.destination, locale);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    travelers: '2 Travelers'
  });

  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string; submit?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filtered = filterPhoneInput(e.target.value);
    setFormData((prev) => ({ ...prev, phone: filtered }));
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { name?: string; email?: string; phone?: string } = {};

    const cleanName = sanitizeText(formData.name);
    if (!cleanName || cleanName.length < 2) {
      newErrors.name = 'Please enter your full name (at least 2 characters).';
    }

    if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address (e.g. name@domain.com).';
    }

    if (formData.phone && !isValidPhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number with 7-15 digits (e.g. +1 555 0192).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRequestQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tourId: tour.id,
          tourTitle: tour.title,
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          travelDates: formData.date || 'Flexible',
          guestsCount: formData.travelers,
          destination: tour.destination
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit quote request.');
      }

      setSubmitted(true);
    } catch (err: any) {
      console.warn('API /api/leads submission failed, falling back to direct Firestore:', err);
      try {
        await createBookingInFirestore({
          tourId: tour.id,
          tourTitle: tour.title,
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          travelDates: formData.date || 'Flexible',
          guestsCount: formData.travelers,
          destination: tour.destination
        });
        setSubmitted(true);
      } catch (fallbackErr: any) {
        console.error('Booking submission error:', fallbackErr);
        setErrors({ submit: fallbackErr.message || 'Failed to submit quote request. Please try again.' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({});

    const tourTitleStr = typeof tour.title === 'string' ? tour.title : (tour.title?.en || tour.title?.es || 'Expedition');

    try {
      const res = await fetch('/api/checkout/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tourId: tour.id,
          tourTitle: tourTitleStr,
          clientEmail: formData.email,
          customerName: formData.name,
          customerPhone: formData.phone,
          travelDates: formData.date || 'Flexible',
          guestsCount: formData.travelers,
          amount: tour.price || 500,
          customLinkId: 'direct-web'
        })
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || 'Failed to initialize checkout session.');
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err: any) {
      console.error('Checkout error:', err);
      setErrors({ submit: err.message || 'Failed to proceed to checkout. Please try again.' });
      setIsSubmitting(false);
    }
  };

  const tourTitleStr = tourTitle;
  const tourDurationStr = tourDuration;
  const whatsappMessage = encodeURIComponent(
    `Hello Vermilion Routes! I am interested in the tour "${tourTitleStr}" (${tourDurationStr}) for ${formData.travelers}. Could you please send me a custom quote and departure availability?`
  );

  return (
    <div className="bg-white/95 backdrop-blur-xl rounded-3xl border border-zinc-200/90 shadow-2xl p-6 sm:p-7 space-y-6 sticky top-28">
      {/* Top Price Header */}
      <div className="space-y-2 pb-5 border-b border-zinc-100">
        <div className="flex items-center justify-between">
          <span className="text-[11px] uppercase font-bold tracking-wider text-zinc-400">
            Starting Price
          </span>
          <div className="flex items-center gap-1 bg-amber-50 text-amber-900 border border-amber-200/60 px-2.5 py-0.5 rounded-full text-xs font-semibold">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{tour.rating}</span>
            {tour.reviewsCount && <span className="text-zinc-500">({tour.reviewsCount})</span>}
          </div>
        </div>

        <div className="flex items-baseline gap-1.5">
          <span className="font-serif font-bold text-3xl sm:text-4xl text-zinc-900">
            ${tour.price.toLocaleString()}
          </span>
          <span className="text-xs text-zinc-500 font-normal">USD / per person</span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold pt-1">
          <Clock className="w-3.5 h-3.5" />
          <span>Duration: {tourDuration}</span>
        </div>
      </div>

      {submitted ? (
        <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3 animate-in fade-in duration-200">
          <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
          <h4 className="font-serif font-bold text-zinc-900 text-lg">
            Quote Request Submitted!
          </h4>
          <p className="text-xs text-zinc-600 leading-relaxed">
            Thank you, <span className="font-semibold text-zinc-900">{formData.name}</span>. A travel specialist for {tourDestination} will prepare your customized itinerary and contact you shortly.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({ name: '', email: '', phone: '', date: '', travelers: '2 Travelers' });
            }}
            className="text-xs text-emerald-700 underline font-semibold cursor-pointer pt-1 hover:text-emerald-800"
          >
            Submit another request
          </button>
        </div>
      ) : (
        <form onSubmit={tour.isUpcoming ? handleRequestQuote : handleCheckout} className="space-y-4">
          {errors.submit && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
              <span>{errors.submit}</span>
            </div>
          )}

          {/* Name Input */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-zinc-700 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-emerald-600" />
              <span>Your Full Name *</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Lord Byron"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
              }}
              className={`w-full bg-zinc-50 border rounded-xl px-3.5 py-2.5 text-xs text-zinc-900 focus:outline-none transition-colors ${
                errors.name
                  ? 'border-rose-400 bg-rose-50/40 focus:border-rose-500'
                  : 'border-zinc-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
              }`}
            />
            {errors.name && <p className="text-[11px] text-rose-600 font-medium">{errors.name}</p>}
          </div>

          {/* Email Input */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-zinc-700 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-emerald-600" />
              <span>Email Address *</span>
            </label>
            <input
              type="email"
              required
              placeholder="byron@example.com"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
              }}
              className={`w-full bg-zinc-50 border rounded-xl px-3.5 py-2.5 text-xs text-zinc-900 focus:outline-none transition-colors ${
                errors.email
                  ? 'border-rose-400 bg-rose-50/40 focus:border-rose-500'
                  : 'border-zinc-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
              }`}
            />
            {errors.email && <p className="text-[11px] text-rose-600 font-medium">{errors.email}</p>}
          </div>

          {/* Phone Input */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-zinc-700 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>Phone / WhatsApp</span>
            </label>
            <input
              type="tel"
              placeholder="+1 (555) 019-2831"
              value={formData.phone}
              onChange={handlePhoneChange}
              className={`w-full bg-zinc-50 border rounded-xl px-3.5 py-2.5 text-xs text-zinc-900 focus:outline-none transition-colors ${
                errors.phone
                  ? 'border-rose-400 bg-rose-50/40 focus:border-rose-500'
                  : 'border-zinc-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
              }`}
            />
            {errors.phone && <p className="text-[11px] text-rose-600 font-medium">{errors.phone}</p>}
          </div>

          {/* Travel Date */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-zinc-700 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-600" />
              <span>Estimated Travel Date</span>
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-xs text-zinc-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 cursor-pointer"
            />
          </div>

          {/* Travelers */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-zinc-700 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-emerald-600" />
              <span>Number of Travelers</span>
            </label>
            <select
              value={formData.travelers}
              onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-xs text-zinc-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 cursor-pointer"
            >
              <option value="1 Traveler">1 Traveler (Solo Journey)</option>
              <option value="2 Travelers">2 Travelers (Couple / Duo)</option>
              <option value="3-5 Travelers">3 - 5 Travelers (Family / Friends)</option>
              <option value="6+ Travelers">6+ Travelers (Private Group)</option>
            </select>
          </div>

          <Button
            variant="primary"
            size="md"
            disabled={isSubmitting}
            className="w-full gap-2 shadow-lg shadow-emerald-600/20 py-3 text-sm cursor-pointer"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Processing...</span>
              </span>
            ) : tour.isUpcoming ? (
              <>
                <Send className="w-4 h-4" />
                <span>Join Waitlist / Request Info</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Secure Reservation ($500 Deposit)</span>
              </>
            )}
          </Button>

          {/* Quick WhatsApp Inquiry */}
          <a
            href={`https://wa.me/593994048458?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors text-xs font-bold"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>Instant WhatsApp Inquiry</span>
          </a>
        </form>
      )}

      {/* Trust Badges */}
      <div className="pt-4 border-t border-zinc-100 space-y-2.5 text-xs text-zinc-600">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>100% Flexible booking & no hidden fees</span>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Guaranteed specialist response under 2 hours</span>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>24/7 Concierge support throughout your trip</span>
        </div>
      </div>
    </div>
  );
}
