import React from 'react';
import { Metadata } from 'next';
import { ShieldCheck, Mail, Phone, MapPin, Building, Lock, FileText, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | Vermilion Routes - Luxury & Bespoke Travel',
  description: 'Official Privacy Policy and Personal Data Protection terms of Agencia de Viajes Vermilion (RUC 1711992808001), Quito, Ecuador.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 pt-28 pb-20 px-4 sm:px-6 lg:px-8 font-sans selection:bg-emerald-500 selection:text-white">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="space-y-4 text-center sm:text-left border-b border-zinc-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Official Legal Document</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            This Privacy Policy explains how personal data is collected, processed, and protected within the framework of tourist services offered on{' '}
            <strong className="text-white">www.vermilionroutes.com</strong> (hereinafter &ldquo;Vermilion&rdquo;).
          </p>
        </div>

        {/* Company Card */}
        <div className="bg-zinc-900/80 border border-emerald-900/50 rounded-3xl p-6 sm:p-8 space-y-6 backdrop-blur-sm shadow-xl">
          <h2 className="text-xl font-bold font-serif text-emerald-400 flex items-center gap-2">
            <Building className="w-5 h-5 text-emerald-400" />
            Data of the Controller
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-zinc-300">
            <div className="space-y-2">
              <p><strong className="text-white">Company Name:</strong> Agencia de Viajes Vermilion</p>
              <p><strong className="text-white">Tax ID (RUC):</strong> 1711992808001</p>
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                <span>Alangasí Oe 1 – 210 Simón Bolívar and Juan León Mera, Quito – Ecuador</span>
              </p>
            </div>
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="mailto:info@vermilionroutes.com" className="text-emerald-400 hover:underline">
                  info@vermilionroutes.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="tel:+593994048458" className="text-zinc-200 hover:text-white">
                  +593-994-048-458
                </a>
              </p>
              <p className="text-xs text-zinc-400">
                Please note that customer service calls may be recorded for quality assurance and reservation management purposes.
              </p>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-8 text-zinc-300 text-sm sm:text-base leading-relaxed">
          
          {/* Section 1 */}
          <section className="space-y-3 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-400" />
              1. Age Requirement (Minors Policy)
            </h3>
            <p>
              In order to register as a User and browse Vermilion, you must be <strong>over 14 years of age</strong>. Vermilion may use personal information to verify age and ensure compliance with this restriction.
            </p>
            <p className="text-xs text-zinc-400">
              Parents or legal guardians of minors may contact Vermilion at any time to request the blocking or deletion of personal data via <span className="text-emerald-400">info@vermilionroutes.com</span>.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-400" />
              2. What Personal Data Do We Process?
            </h3>
            <ul className="space-y-2 list-disc list-inside text-zinc-300 pl-2">
              <li><strong>User Registration:</strong> Name and email address (or Facebook profile info if registering via social login).</li>
              <li><strong>Contracting & Expeditions:</strong> Full personal details including nationality, residential address, contact phone number, identity document or passport number.</li>
              <li><strong>Tour Bookings:</strong> Traveler names, nationalities, passport numbers, and emergency contact details.</li>
              <li><strong>Payments & Transactions:</strong> Credit/debit card details, expiration dates, CVV, or bank transfer confirmation receipts. Payments are processed through certified PCI-DSS compliant secure gateways with end-to-end encryption.</li>
              <li><strong>Invoicing:</strong> Tax identification and official billing addresses where requested.</li>
              <li><strong>Customer Support:</strong> Inquiries, preferences, and communication history.</li>
              <li><strong>Cookies & Analytics:</strong> Browsing preferences, page interactions, and statistical analytics as configured in your browser.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              3. Purposes of Data Processing
            </h3>
            <p>Vermilion, as Data Controller, processes personal data for:</p>
            <ul className="space-y-2 list-disc list-inside text-zinc-300 pl-2">
              <li>Managing user registration, private area access, and saved preferences.</li>
              <li>Executing mediation and organization of travel packages, cruises, hotels, and transport services.</li>
              <li>Providing active customer support, itinerary updates, and urgent travel alerts.</li>
              <li>Sending customized commercial communications and promotions (with prior user consent).</li>
              <li>Auditing security and fraud prevention.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white">4. Legal Basis (Legitimation)</h3>
            <p>
              Data collection and processing is legally based on:
            </p>
            <ul className="space-y-1.5 list-disc list-inside text-zinc-300 pl-2">
              <li>Execution of the contractual travel mediation agreement.</li>
              <li>Adoption of pre-contractual measures requested by the client.</li>
              <li>Compliance with legal, fiscal, and regulatory tourism obligations.</li>
              <li>Explicit user consent for marketing communications and cookies.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-3 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white">5. Data Retention & Recipients</h3>
            <p>
              Data will be maintained for the duration of the commercial relationship and statutory prescription periods established by applicable Ecuadorian and international law.
            </p>
            <p>
              Data may be communicated strictly when necessary to:
            </p>
            <ul className="space-y-1.5 list-disc list-inside text-zinc-300 pl-2">
              <li>Tourism providers (Galapagos cruise operators, airlines, hotels, local guides) for booking confirmation.</li>
              <li>Technology & payment infrastructure providers (Firebase, certified payment processors).</li>
              <li>Competent public and judicial authorities upon statutory legal request.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="space-y-3 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white">6. Exercise of Rights</h3>
            <p>
              At any time, you may exercise your rights of <strong>access, rectification, deletion, opposition, limitation of processing, or portability</strong> by contacting our Data Protection team at:
            </p>
            <div className="p-4 bg-zinc-950 border border-emerald-900/40 rounded-xl">
              <p className="font-mono text-emerald-400 text-sm">info@vermilionroutes.com</p>
              <p className="text-xs text-zinc-400 mt-1">
                We respond to all verified inquiries promptly within the statutory deadline.
              </p>
            </div>
          </section>

        </div>

        {/* Footer info */}
        <div className="text-center pt-8 border-t border-zinc-800 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} Agencia de Viajes Vermilion (RUC 1711992808001). All Rights Reserved.</p>
        </div>

      </div>
    </div>
  );
}
