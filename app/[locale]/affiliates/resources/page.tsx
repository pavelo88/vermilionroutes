'use client';

import { Copy, Check, Image as ImageIcon, MessageSquare, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getAffiliateByEmail, AffiliateAccount } from '@/lib/affiliates';

const COPY_TEXTS = {
  es: (username: string) => [
    {
      id: 'copy-1',
      title: 'Guión para Instagram Stories',
      desc: 'Texto listo para copiar y pegar en tus historias. Incluye emojis y llamados a la acción.',
      content: `🌿 ¿Sueñas con Galápagos? Yo encontré una agencia boutique que hace itinerarios a medida y tienen un precio increíble. 🐢✨ Usa mi enlace para obtener 10% de descuento automático en tu reserva. 👉 vermilionroutes.com?vid=${username}`,
    },
    {
      id: 'copy-2',
      title: 'Descripción para bio de Instagram / TikTok',
      desc: 'Una línea persuasiva para tu perfil con tu enlace de embajador.',
      content: `🌎 Expediciones High-Ticket a Galápagos | 10% OFF con mi enlace 👇 vermilionroutes.com?vid=${username}`,
    },
    {
      id: 'copy-3',
      title: 'Mensaje para WhatsApp / Telegram',
      desc: 'Mensaje directo para enviar a tus contactos y grupos.',
      content: `Hola! 👋 Te comparto un secreto para quien quiera visitar Ecuador o Galápagos a nivel VIP. Vermilion Routes es una agencia boutique de lujo — hacen expediciones privadas increíbles. Si usas mi enlace tienes un 10% de descuento automático: vermilionroutes.com?vid=${username} ¡Espero les sirva! 😊`,
    },
  ],
  en: (username: string) => [
    {
      id: 'copy-1',
      title: 'Instagram Stories Script',
      desc: 'Ready-to-paste text for your stories. Includes emojis and calls to action.',
      content: `🌿 Dreaming of the Galápagos? I found a boutique agency that crafts bespoke itineraries at incredible prices. 🐢✨ Use my link to get an automatic 10% discount on your booking. 👉 vermilionroutes.com?vid=${username}`,
    },
    {
      id: 'copy-2',
      title: 'Instagram / TikTok Bio',
      desc: 'A persuasive one-liner for your profile with your ambassador link.',
      content: `🌎 Luxury Galápagos Expeditions | 10% OFF with my link 👇 vermilionroutes.com?vid=${username}`,
    },
    {
      id: 'copy-3',
      title: 'WhatsApp / Telegram Message',
      desc: 'Direct message to send to your contacts and groups.',
      content: `Hey! 👋 Let me share a gem for anyone dreaming of visiting Ecuador or the Galápagos VIP-style. Vermilion Routes is a luxury boutique agency — they craft incredible private expeditions. Use my link for an automatic 10% discount: vermilionroutes.com?vid=${username} Hope it helps! 😊`,
    },
  ],
  de: (username: string) => [
    {
      id: 'copy-1',
      title: 'Instagram Stories Skript',
      desc: 'Fertig zum Einfügen in deine Stories. Mit Emojis und Handlungsaufforderungen.',
      content: `🌿 Träumst du von den Galápagos? Ich habe eine Boutique-Agentur gefunden, die maßgeschneiderte Reiserouten zu unglaublichen Preisen anbietet. 🐢✨ Nutze meinen Link für 10% automatischen Rabatt auf deine Buchung. 👉 vermilionroutes.com?vid=${username}`,
    },
    {
      id: 'copy-2',
      title: 'Instagram / TikTok Bio',
      desc: 'Eine überzeugende Zeile für dein Profil mit deinem Ambassador-Link.',
      content: `🌎 Luxus Galápagos Expeditionen | 10% Rabatt mit meinem Link 👇 vermilionroutes.com?vid=${username}`,
    },
    {
      id: 'copy-3',
      title: 'WhatsApp / Telegram Nachricht',
      desc: 'Direkte Nachricht an deine Kontakte und Gruppen.',
      content: `Hey! 👋 Ich teile einen Geheimtipp für alle, die Ecuador oder die Galápagos auf VIP-Niveau besuchen möchten. Vermilion Routes ist eine Luxus-Boutique-Agentur — sie gestalten unglaubliche private Expeditionen. Nutze meinen Link für 10% automatischen Rabatt: vermilionroutes.com?vid=${username} Viel Spaß! 😊`,
    },
  ],
  fr: (username: string) => [
    {
      id: 'copy-1',
      title: 'Script Instagram Stories',
      desc: 'Texte prêt à coller dans vos stories. Inclut des emojis et des appels à l\'action.',
      content: `🌿 Tu rêves des Galápagos ? J'ai trouvé une agence boutique qui crée des itinéraires sur mesure à des prix incroyables. 🐢✨ Utilise mon lien pour obtenir 10% de réduction automatique sur ta réservation. 👉 vermilionroutes.com?vid=${username}`,
    },
    {
      id: 'copy-2',
      title: 'Bio Instagram / TikTok',
      desc: 'Une phrase percutante pour ton profil avec ton lien ambassadeur.',
      content: `🌎 Expéditions de luxe aux Galápagos | 10% de réduction avec mon lien 👇 vermilionroutes.com?vid=${username}`,
    },
    {
      id: 'copy-3',
      title: 'Message WhatsApp / Telegram',
      desc: 'Message direct à envoyer à tes contacts et groupes.',
      content: `Salut ! 👋 Je partage une pépite pour tous ceux qui rêvent de visiter l'Équateur ou les Galápagos en mode VIP. Vermilion Routes est une agence boutique de luxe — ils créent des expéditions privées incroyables. Utilise mon lien pour 10% de réduction automatique : vermilionroutes.com?vid=${username} Profite bien ! 😊`,
    },
  ],
  it: (username: string) => [
    {
      id: 'copy-1',
      title: 'Script per Instagram Stories',
      desc: 'Testo pronto da incollare nelle tue stories. Include emoji e call to action.',
      content: `🌿 Sogni le Galápagos? Ho trovato un'agenzia boutique che crea itinerari su misura a prezzi incredibili. 🐢✨ Usa il mio link per ottenere il 10% di sconto automatico sulla tua prenotazione. 👉 vermilionroutes.com?vid=${username}`,
    },
    {
      id: 'copy-2',
      title: 'Bio Instagram / TikTok',
      desc: 'Una frase persuasiva per il tuo profilo con il tuo link ambassador.',
      content: `🌎 Spedizioni di lusso alle Galápagos | 10% di sconto con il mio link 👇 vermilionroutes.com?vid=${username}`,
    },
    {
      id: 'copy-3',
      title: 'Messaggio WhatsApp / Telegram',
      desc: 'Messaggio diretto da inviare ai tuoi contatti e gruppi.',
      content: `Ciao! 👋 Condivido un segreto per chi vuole visitare l'Ecuador o le Galápagos a livello VIP. Vermilion Routes è un'agenzia boutique di lusso — creano spedizioni private incredibili. Usa il mio link per il 10% di sconto automatico: vermilionroutes.com?vid=${username} Buon viaggio! 😊`,
    },
  ],
  pt: (username: string) => [
    {
      id: 'copy-1',
      title: 'Script para Instagram Stories',
      desc: 'Texto pronto para colar nas suas stories. Inclui emojis e chamadas à ação.',
      content: `🌿 Sonhando com as Galápagos? Encontrei uma agência boutique que cria roteiros personalizados a preços incríveis. 🐢✨ Use meu link para obter 10% de desconto automático na sua reserva. 👉 vermilionroutes.com?vid=${username}`,
    },
    {
      id: 'copy-2',
      title: 'Bio do Instagram / TikTok',
      desc: 'Uma frase persuasiva para o seu perfil com o seu link de embaixador.',
      content: `🌎 Expedições de Luxo nas Galápagos | 10% OFF com meu link 👇 vermilionroutes.com?vid=${username}`,
    },
    {
      id: 'copy-3',
      title: 'Mensagem para WhatsApp / Telegram',
      desc: 'Mensagem direta para enviar aos seus contatos e grupos.',
      content: `Oi! 👋 Vou compartilhar uma dica incrível para quem quer visitar o Equador ou as Galápagos no estilo VIP. A Vermilion Routes é uma agência boutique de luxo — eles criam expedições privadas incríveis. Use meu link para 10% de desconto automático: vermilionroutes.com?vid=${username} Aproveitem! 😊`,
    },
  ],
};

type LocaleKey = keyof typeof COPY_TEXTS;

export default function ResourcesPage() {
  const [affiliate, setAffiliate] = useState<AffiliateAccount | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const locale = useLocale();

  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && user.email) {
        try {
          const aff = await getAffiliateByEmail(user.email);
          setAffiliate(aff);
        } catch {
          // ignore
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const username = affiliate?.username || 'embajador';
  const isEs = locale === 'es';

  // Resolve locale key, fallback to English if not translated
  const localeKey: LocaleKey = (Object.keys(COPY_TEXTS).includes(locale) ? locale : 'en') as LocaleKey;
  const texts = COPY_TEXTS[localeKey](username);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const VISUAL_ITEMS = [
    {
      id: 'img-1',
      title: isEs ? 'Kit de Imágenes de Expediciones (Próximamente)' : 'Expedition Image Kit (Coming Soon)',
      desc: isEs
        ? 'Fotos y videos en alta resolución (4K/HD) de nuestros tours, listos para descargar y publicar.'
        : 'High-resolution photos and videos (4K/HD) from our tours, ready to download and post.',
      icon: ImageIcon,
      action: 'soon',
    },
    {
      id: 'img-2',
      title: isEs ? 'Banners Digitales (Próximamente)' : 'Digital Banners (Coming Soon)',
      desc: isEs
        ? 'Diseños optimizados para stories, posts y estados de WhatsApp.'
        : 'Optimized designs for stories, posts, and WhatsApp statuses.',
      icon: ImageIcon,
      action: 'soon',
    },
  ];

  return (
    <div className="p-6 sm:p-8 max-w-5xl mx-auto space-y-8">

      <div>
        <h1 className="font-serif text-3xl font-light text-zinc-900 dark:text-white">
          {isEs ? 'Recursos de Venta' : 'Sales Resources'}
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          {isEs
            ? 'Material y herramientas para ayudarte a generar más comisiones.'
            : 'Materials and tools to help you generate more commissions.'}
        </p>
      </div>

      <div className="space-y-8">

        {/* ── TEXTOS ────────────────────────────────────────────── */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
            {isEs ? 'Textos & Guiones' : 'Scripts & Copy'}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {texts.map((item) => (
              <div key={item.id} className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-white/5 rounded-[20px] p-5 flex flex-col justify-between group">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-1">{item.title}</h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>

                <div className="mt-auto space-y-3">
                  <div className="p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200/60 dark:border-white/5 text-xs text-zinc-600 dark:text-zinc-300 font-mono leading-relaxed">
                    {item.content}
                  </div>
                  <button
                    onClick={() => handleCopy(item.content, item.id)}
                    className="w-full py-2.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-amber-500 hover:text-black text-zinc-900 dark:text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    {copiedId === item.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedId === item.id ? (isEs ? '¡Copiado!' : 'Copied!') : (isEs ? 'Copiar Texto' : 'Copy Text')}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── IMÁGENES ──────────────────────────────────────────── */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
            {isEs ? 'Imágenes & Material Visual' : 'Images & Visual Assets'}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {VISUAL_ITEMS.map((item) => (
              <div key={item.id} className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-white/5 rounded-[20px] p-5 flex flex-col justify-between group">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-1">{item.title}</h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
                <div className="mt-auto pt-4 border-t border-zinc-200/60 dark:border-white/5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-xs font-bold text-zinc-500 dark:text-zinc-400">
                    <Clock className="w-3.5 h-3.5" /> {isEs ? 'Estará disponible pronto' : 'Coming soon'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
