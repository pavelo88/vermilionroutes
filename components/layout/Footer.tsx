'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import {
  Compass,
  Mail,
  Phone,
  MapPin,
  Send,
  Instagram,
  Facebook,
  Youtube,
  ShieldCheck,
  Award,
  Sparkles
} from 'lucide-react';
import { useSettings } from '@/hooks/useSettings';
import { useLocale } from 'next-intl';
import { getLocalizedText } from '@/utils/i18nHelper';

const TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    topDestinations: "Top Destinations", galapagos: "Galapagos Islands", ecuador: "Mainland Ecuador", fullDay: "Full Day Excursions", amazon: "Ecuadorian Amazon", volcanoes: "Avenue of Volcanoes",
    company: "Company", about: "About Us", packages: "Tour Packages", contact: "Contact Specialist",
    updates: "Get Travel Updates", subscribeText: "Subscribe to receive seasonal Galapagos premium cruise promotions and curated travel guides.", emailPlaceholder: "Your email address", subscribeBtn: "Subscribe",
    licensed: "Fully Licensed & Certified Tour Operator in Ecuador & Galapagos", support: "24/7 Dedicated Trip Specialist Support En Route", secure: "Secure Bookings & 100% Satisfaction Guarantee",
    privacy: "Privacy Policy", terms: "Terms of Service",
    footerDescription: "Premier boutique tour operator specializing in custom-crafted premium travel itineraries across Ecuador and Galapagos's most iconic wonders."
  },
  es: {
    topDestinations: "Destinos Principales", galapagos: "Islas Galápagos", ecuador: "Ecuador Continental", fullDay: "Excursiones Full Day", amazon: "Amazonía Ecuatoriana", volcanoes: "Avenida de los Volcanes",
    company: "Empresa", about: "Sobre Nosotros", packages: "Paquetes Turísticos", contact: "Contactar Especialista",
    updates: "Recibe Novedades", subscribeText: "Suscríbete para recibir promociones de cruceros y guías de viaje seleccionadas.", emailPlaceholder: "Tu correo", subscribeBtn: "Suscribirse",
    licensed: "Operador Turístico Certificado en Ecuador y Galápagos", support: "Soporte Especializado 24/7 Durante el Viaje", secure: "Reservas Seguras y Satisfacción Garantizada al 100%",
    privacy: "Política de Privacidad", terms: "Términos de Servicio",
    footerDescription: "Operador turístico boutique especializado en itinerarios de viaje premium a medida a través de las maravillas más icónicas de Ecuador y Galápagos."
  },
  fr: {
    topDestinations: "Meilleures Destinations", galapagos: "Îles Galapagos", ecuador: "Équateur Continental", fullDay: "Excursions Full Day", amazon: "Amazonie Équatorienne", volcanoes: "Avenue des Volcans",
    company: "Entreprise", about: "À Propos", packages: "Forfaits", contact: "Contacter un Spécialiste",
    updates: "Actualités", subscribeText: "Abonnez-vous pour recevoir des promotions de croisières et des guides de voyage.", emailPlaceholder: "Votre e-mail", subscribeBtn: "S'abonner",
    licensed: "Voyagiste Certifié en Équateur et aux Galapagos", support: "Assistance Spécialisée 24/7", secure: "Réservations Sécurisées et Satisfaction Garantie",
    privacy: "Confidentialité", terms: "Conditions",
    footerDescription: "Voyagiste boutique de premier ordre spécialisé dans les itinéraires de voyage haut de gamme sur mesure à travers l'Équateur et les Galapagos."
  },
  de: {
    topDestinations: "Top-Reiseziele", galapagos: "Galapagos-Inseln", ecuador: "Ecuador Festland", fullDay: "Tagesausflüge (Full Day)", amazon: "Ecuadorianischer Amazonas", volcanoes: "Straße der Vulkane",
    company: "Unternehmen", about: "Über Uns", packages: "Reisepakete", contact: "Kontaktieren",
    updates: "Reise-Updates", subscribeText: "Abonnieren Sie, um Kreuzfahrt-Angebote und Reiseführer zu erhalten.", emailPlaceholder: "Ihre E-Mail", subscribeBtn: "Abonnieren",
    licensed: "Zertifizierter Reiseveranstalter in Ecuador & Galapagos", support: "24/7 Spezialisten-Support auf der Reise", secure: "Sichere Buchungen & 100% Zufriedenheitsgarantie",
    privacy: "Datenschutzerklärung", terms: "Nutzungsbedingungen",
    footerDescription: "Boutique-Reiseveranstalter, spezialisiert auf maßgeschneiderte Premium-Reiserouten zu den kultigsten Wunderwelten von Ecuador und Galapagos."
  },
  it: {
    topDestinations: "Destinazioni Top", galapagos: "Isole Galapagos", ecuador: "Ecuador Continentale", fullDay: "Escursioni Full Day", amazon: "Amazzonia Ecuadoriana", volcanoes: "Viale dei Vulcani",
    company: "Azienda", about: "Chi Siamo", packages: "Pacchetti", contact: "Contatta",
    updates: "Aggiornamenti", subscribeText: "Iscriviti per ricevere promozioni per crociere e guide di viaggio.", emailPlaceholder: "La tua email", subscribeBtn: "Iscriviti",
    licensed: "Tour Operator Certificato in Ecuador e Galapagos", support: "Assistenza Specializzata 24/7", secure: "Prenotazioni Sicure e Soddisfazione Garantita",
    privacy: "Privacy", terms: "Termini",
    footerDescription: "Tour operator boutique di alto livello specializzato in itinerari di viaggio premium su misura attraverso le meraviglie di Ecuador e Galapagos."
  },
  pt: {
    topDestinations: "Principais Destinos", galapagos: "Ilhas Galápagos", ecuador: "Equador Continental", fullDay: "Excursões Full Day", amazon: "Amazônia Equatoriana", volcanoes: "Avenida dos Vulcões",
    company: "Empresa", about: "Sobre Nós", packages: "Pacotes", contact: "Contatar",
    updates: "Atualizaciones", subscribeText: "Inscreva-se para receber promoções de cruzeiros e guias de viagem.", emailPlaceholder: "Seu e-mail", subscribeBtn: "Inscrever-se",
    licensed: "Operador Turístico Certificado no Equador e Galápagos", support: "Suporte Especializado 24/7", secure: "Reservas Seguras e 100% de Satisfação Garantida",
    privacy: "Privacidade", terms: "Termos",
    footerDescription: "Operador turístico boutique especializado em itinerários de viagem premium sob medida pelas maravilhas mais icônicas do Equador e Galápagos."
  },
  ja: {
    topDestinations: "人気の目的地", galapagos: "ガラパゴス諸島", ecuador: "エクアドル本土", fullDay: "日帰りツアー（Full Day）", amazon: "エクアドル・アマゾン", volcanoes: "火山の道",
    company: "会社概要", about: "私たちについて", packages: "ツアープラン", contact: "連絡する",
    updates: "最新情報", subscribeText: "クルーズのプロモーションや旅行ガイドを受け取るために購読してください。", emailPlaceholder: "メールアドレス", subscribeBtn: "購読する",
    licensed: "エクアドルとガラパゴスの認定旅行会社", support: "24時間365日の専門家サポート", secure: "安全な予約と100%の満足保証",
    privacy: "プライバシーポリシー", terms: "利用規約",
    footerDescription: "エクアドルとガラパゴスの象徴的な見どころを巡るオーダーメイドのプレミアム旅行を専門とするブティック旅行会社です。"
  },
  zh: {
    topDestinations: "热门目的地", galapagos: "加拉帕戈斯群岛", ecuador: "厄瓜多尔大陆", fullDay: "全天一日游", amazon: "厄瓜多尔亚马逊", volcanoes: "火山大道",
    company: "公司信息", about: "关于我们", packages: "旅游套餐", contact: "联系专家",
    updates: "获取旅游更新", subscribeText: "订阅以接收游轮促销活动和精选旅游指南。", emailPlaceholder: "您的电子邮箱", subscribeBtn: "订阅",
    licensed: "厄瓜多尔和加拉帕戈斯的认证旅行社", support: "24/7 专业旅行支持", secure: "安全预订和100%满意保证",
    privacy: "隐私政策", terms: "服务条款",
    footerDescription: "精品旅行社，专注于在厄瓜多尔和加拉帕戈斯群岛打造定制的尊享精品旅行行程。"
  }
};

export function Footer() {
  const { settings } = useSettings();
  const locale = useLocale();
  const t = TRANSLATIONS[locale] || TRANSLATIONS['en'];

  return (
    <footer className="bg-gradient-to-b from-emerald-950 via-[#032118] to-[#021812] text-emerald-100/90 pt-16 pb-8 border-t border-emerald-900/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-emerald-900/60">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-5">
            <a href="#" className="flex items-center gap-3">
              <div className="relative w-[160px] h-[40px] md:w-[220px] md:h-[55px] shrink-0">
                <Image
                  src="/logo_inicio.png"
                  alt="Vermilion Routes"
                  fill
                  sizes="220px"
                  className="object-contain drop-shadow-md"
                  unoptimized
                />
              </div>
            </a>

            <p className="text-emerald-200/80 text-sm leading-relaxed max-w-sm">
              {(() => {
                const custom: any = settings?.footer?.description;
                if (custom && typeof custom === 'object') {
                  return getLocalizedText(custom, locale) || t.footerDescription;
                }
                if (typeof custom === 'string') {
                  const str = custom as string;
                  if (str.includes('Premier boutique') || str.includes('South America specialists') || str.includes('tour operator')) {
                    return t.footerDescription;
                  }
                  if (str.trim().length > 0) {
                    return str;
                  }
                }
                return t.footerDescription;
              })()}
            </p>

            <div className="flex items-center gap-3 pt-2">
              {settings?.contact?.facebook && (
                <a
                  href={settings.contact.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-xl bg-emerald-900/50 hover:bg-emerald-600 hover:text-white border border-emerald-800/60 flex items-center justify-center text-emerald-300 transition-all hover:scale-105"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {settings?.contact?.instagram && (
                <a
                  href={settings.contact.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-xl bg-emerald-900/50 hover:bg-emerald-600 hover:text-white border border-emerald-800/60 flex items-center justify-center text-emerald-300 transition-all hover:scale-105"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {settings?.contact?.tripadvisor && (
                <a
                  href={settings.contact.tripadvisor}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-xl bg-emerald-900/50 hover:bg-emerald-600 hover:text-white border border-emerald-800/60 flex items-center justify-center text-emerald-300 transition-all hover:scale-105"
                  aria-label="TripAdvisor"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                </a>
              )}
            </div>
          </div>

          {/* Destinations */}
          <div className="space-y-4">
            <h4 className="font-serif font-semibold text-lg text-white tracking-wide">
              {t.topDestinations}
            </h4>
            <ul className="space-y-2.5 text-sm text-emerald-200/80">
              <li>
                <a href={`/${locale}#tours`} className="hover:text-emerald-400 transition-colors">
                  {t.galapagos}
                </a>
              </li>
              <li>
                <a href={`/${locale}#tours`} className="hover:text-emerald-400 transition-colors">
                  {t.ecuador}
                </a>
              </li>
              <li>
                <a href={`/${locale}#tours`} className="hover:text-emerald-400 transition-colors">
                  {t.fullDay}
                </a>
              </li>
              <li>
                <a href={`/${locale}#tours`} className="hover:text-emerald-400 transition-colors">
                  {t.amazon}
                </a>
              </li>
              <li>
                <a href={`/${locale}#tours`} className="hover:text-emerald-400 transition-colors">
                  {t.volcanoes}
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-serif font-semibold text-lg text-white tracking-wide">
              {t.company}
            </h4>
            <ul className="space-y-2.5 text-sm text-emerald-200/80">
              <li>
                <a href={`/${locale}#experience`} className="hover:text-emerald-400 transition-colors">
                  {t.about}
                </a>
              </li>
              <li>
                <a href={`/${locale}#tours`} className="hover:text-emerald-400 transition-colors">
                  {t.packages}
                </a>
              </li>
              <li>
                <a href={`/${locale}#contact`} className="hover:text-emerald-400 transition-colors">
                  {t.contact}
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter / Quick Contact */}
          <div className="space-y-4">
            <h4 className="font-serif font-semibold text-lg text-white tracking-wide">
              {t.updates}
            </h4>
            <p className="text-xs text-emerald-200/70 leading-relaxed">
              {t.subscribeText}
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder={t.emailPlaceholder}
                  suppressHydrationWarning
                  className="w-full bg-emerald-950/80 border border-emerald-800/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-emerald-400/60 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                />
              </div>
              <Button variant="primary" size="sm" className="w-full text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-bold tracking-wider" suppressHydrationWarning>
                <Send className="w-3.5 h-3.5 mr-1" /> {t.subscribeBtn}
              </Button>
            </form>

            <div className="pt-2 space-y-2 text-xs text-emerald-200/80">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" /> {getLocalizedText(settings?.contact?.phone, locale) || '+593 99 404 8458'}
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400" /> {getLocalizedText(settings?.contact?.email, locale) || 'info@vermilionroutes.com'}
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" /> {getLocalizedText(settings?.contact?.address, locale) || 'Quito, Ecuador • South America'}
              </p>
            </div>
          </div>
        </div>

        {/* Guarantees & Badges */}
        <div className="py-8 flex flex-wrap justify-between items-center gap-6 border-b border-emerald-900/60 text-xs text-emerald-200/80">
          <div className="flex items-center gap-2 bg-emerald-900/40 border border-emerald-800/60 px-4 py-2 rounded-2xl">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>{t.licensed}</span>
          </div>
          <div className="flex items-center gap-2 bg-emerald-900/40 border border-emerald-800/60 px-4 py-2 rounded-2xl">
            <Award className="w-5 h-5 text-emerald-400" />
            <span>{t.support}</span>
          </div>
          <div className="flex items-center gap-2 bg-emerald-900/40 border border-emerald-800/60 px-4 py-2 rounded-2xl">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <span>{t.secure}</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-emerald-400/70">
          <p>{getLocalizedText(settings?.footer?.copyright, locale) || `© ${new Date().getFullYear()} Vermilion Routes. All Rights Reserved.`}</p>
          <div className="flex gap-6">
            <a href="#privacy" className="hover:text-emerald-200 transition-colors">
              {t.privacy}
            </a>
            <a href="#terms" className="hover:text-emerald-200 transition-colors">
              {t.terms}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
