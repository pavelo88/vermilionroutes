import React from 'react';
import { Metadata } from 'next';
import { ShieldCheck, FileCheck, MapPin, Mail, Phone, Clock, AlertTriangle, Gift, CreditCard } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Vermilion Routes | Terms & Conditions of Bespoke Travel',
  description: 'Official Terms and Conditions, booking policies, cancellations, and referral program of Agencia de Viajes Vermilion (RUC 1711992808001), Quito, Ecuador.',
};

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 pt-28 pb-20 px-4 sm:px-6 lg:px-8 font-sans selection:bg-emerald-500 selection:text-white">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="space-y-4 text-center sm:text-left border-b border-zinc-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <FileCheck className="w-4 h-4" />
            <span>Official Legal Contract</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif text-white tracking-tight">
            Terms &amp; Conditions of Use
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            These terms and conditions are applicable to all services available at <strong className="text-white">www.vermilionroutes.com</strong>.
          </p>
        </div>

        {/* Company Identification Card */}
        <div className="bg-zinc-900/80 border border-emerald-900/50 rounded-3xl p-6 sm:p-8 space-y-4 backdrop-blur-sm shadow-xl">
          <h2 className="text-xl font-bold font-serif text-emerald-400">
            Agency Identification &amp; Contact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-zinc-300">
            <div className="space-y-1.5">
              <p><strong className="text-white">Entity:</strong> Agencia de Viajes Vermilion Cia. Ltda.</p>
              <p><strong className="text-white">Activity:</strong> Retail Travel Agency &amp; Tour Operator</p>
              <p><strong className="text-white">Tax ID (RUC):</strong> 1711992808001</p>
              <p className="flex items-start gap-1.5 text-xs text-zinc-400">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Alangasí Oe 1 – 210 Simón Bolívar and Juan León Mera, Quito – Ecuador</span>
              </p>
            </div>
            <div className="space-y-1.5">
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="mailto:info@vermilionroutes.com" className="text-emerald-400 hover:underline">
                  <span>info</span><span className="text-emerald-400">&#64;</span><span>vermilionroutes.com</span>
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="tel:+593994048458" className="text-zinc-200 hover:text-white">+593-994-048-458</a>
              </p>
              <p className="text-xs text-zinc-400">Validity: Terms apply to all reservations made from July 25, 2023 onward.</p>
            </div>
          </div>
        </div>

        {/* Legal Text Sections */}
        <div className="space-y-8 text-zinc-300 text-sm sm:text-base leading-relaxed">

          {/* Section 1 */}
          <section className="space-y-3 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white">1. Acceptance and Capacity to Contract</h3>
            <p>
              By accessing, browsing, registering on our website, or confirming a reservation, the User declares under oath:
            </p>
            <ul className="space-y-1.5 list-disc list-inside text-zinc-300 pl-2">
              <li>To be of legal age (at least 18 years old for commercial contracting, or over 14 years old with parental consent for browsing/registration) and legally competent to enter into binding agreements.</li>
              <li>To have read, understood, and unreservedly accepted these Terms and Conditions of Use and the Privacy Policy.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white">2. Scope of Service &amp; Intellectual Property</h3>
            <p>
              Vermilion operates as a bespoke luxury tour operator and mediation agency organizing combined tourist packages, cruises, private land journeys, hotel accommodations, and guided excursions in Ecuador and the Galápagos Islands.
            </p>
            <p>
              All website content, high-resolution tour imagery, route architectures, and software infrastructure are the exclusive intellectual property of Vermilion and protected under national and international copyright treaties. Services are strictly for private personal use.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-emerald-400" />
              3. Payments &amp; Purchase Process
            </h3>
            <p>
              To confirm and guarantee an expedition booking:
            </p>
            <ul className="space-y-2 list-disc list-inside text-zinc-300 pl-2">
              <li><strong>Reservation Deposit:</strong> A deposit is required at the time of reservation to block private berths, yachts, flight slots, and naturalist guides.</li>
              <li><strong>Final Balance:</strong> The remaining total agreed price must be settled in full no later than <strong>60 days prior</strong> to the expedition start date.</li>
              <li><strong>Last-Minute Bookings:</strong> Reservations made 60 days or less prior to departure require 100% full payment upon booking.</li>
              <li><strong>Accepted Payment Methods:</strong> Credit Card (Visa, Mastercard, American Express), PayPal, and Official Bank Transfers (TD Bank USA / Produbanco Ecuador / Zelle).</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              4. Cancellation Policy
            </h3>
            <div className="space-y-3 text-sm">
              <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl space-y-2">
                <h4 className="font-semibold text-white">4.1 Voluntary Cancellation by the Client</h4>
                <p>Cancellations must be submitted in writing via our official contact channels:</p>
                <ul className="space-y-1 list-disc list-inside text-zinc-400 pl-2">
                  <li><strong>60 days or more before departure:</strong> The deposit amount is retained as management/preparation penalty.</li>
                  <li><strong>59 days or less before departure:</strong> A <strong>75% penalty</strong> of the total expedition cost applies due to non-refundable supplier contracts (yachts, national park permits, flights).</li>
                  <li>Services added less than 60 days prior to departure entail a 100% cancellation penalty.</li>
                </ul>
              </div>

              <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl space-y-2">
                <h4 className="font-semibold text-white">4.2 Cancellation by Vermilion &amp; Travel Wallet</h4>
                <p>
                  In cases where cancellation occurs due to force majeure or minimum group thresholds, clients receive 100% of payments as non-expiring <strong>Vermilion Travel Credit (Wallet)</strong> to be applied toward any future expedition. Alternatively, clients opting for a cash refund are subject to the 75% standard cancellation policy.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section className="space-y-3 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white">5. Passports, Visas, and Health Regulations</h3>
            <p>
              It is the passenger’s sole responsibility to ensure that all personal documentation (Passports valid for at least 6 months past return date, Visas, Tourist Cards, and required health/vaccination records) is valid and up to date before departure.
            </p>
          </section>

          {/* Section 6 - Referral Program */}
          <section className="space-y-3 bg-zinc-900/40 border border-emerald-900/60 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
              <Gift className="w-5 h-5 text-emerald-400" />
              6. Vermilion Referral &amp; Travelers Club Program
            </h3>
            <ul className="space-y-2 list-disc list-inside text-zinc-300 pl-2 text-xs sm:text-sm">
              <li>Participants must be 18 years of age or older.</li>
              <li>Each referred friend who confirms their first trip deposit earns a <strong>100 USD credit</strong> for the referrer, valid for <strong>24 months</strong>.</li>
              <li>New members who register on our platform receive a <strong>10% Affiliation Discount</strong> on their first private tour booking.</li>
              <li>Referral credits are combinable with future expeditions and applied directly in the booking process.</li>
            </ul>
          </section>

        </div>

        {/* Footer info */}
        <div className="text-center pt-8 border-t border-zinc-800 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} Agencia de Viajes Vermilion Cia. Ltda. (RUC 1711992808001). All Rights Reserved.</p>
        </div>

      </div>
    </div>
  );
}
