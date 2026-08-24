'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  MessageCircle,
  Bot,
  Sparkles,
  Send,
  X,
  ChevronRight,
  Phone,
  ShieldCheck,
  UserCheck,
  Cpu,
  RefreshCw,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

import { useLocale } from 'next-intl';

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
  providerUsed?: string;
  id?: string;
  timestamp?: Date;
}

export function ConciergeWidget() {
  const locale = useLocale();
  const GREETINGS_BY_LOCALE: Record<string, string> = {
    es: '¡Hola! Soy **Pyro**, tu Concierge y asesor de viajes en Vermilion Routes.\n\nEstoy aquí para ayudarte a diseñar y personalizar tu viaje por **Ecuador Continental y las Islas Galápagos**.\n\n¿En qué destino o fechas te gustaría comenzar a planificar?',
    en: 'Hello! I am **Pyro**, Lead Concierge at Vermilion Routes.\n\nI am here to assist you in designing and customizing your journey across **Mainland Ecuador and the Galápagos Islands**.\n\nWhat destinations or travel dates do you have in mind to get started?',
    fr: 'Bonjour ! Je suis **Pyro**, votre Concierge et conseiller de voyage chez Vermilion Routes.\n\nJe suis là pour vous aider à concevoir votre voyage sur mesure en **Équateur Continental et aux Îles Galápagos**.\n\nQuelle destination ou quelles dates avez-vous en tête pour commencer ?',
    de: 'Guten Tag! Ich bin **Pyro**, Ihr persönlicher Reiseberater bei Vermilion Routes.\n\nIch helfe Ihnen gerne bei der Planung Ihrer maßgeschneiderten Traumreise durch **Festland-Ecuador und die Galapagos-Inseln**.\n\nWelche Reiseziele oder Reisedaten haben Sie im Sinn?',
    it: 'Buongiorno! Sono **Pyro**, il tuo Concierge e consulente di viaggio per Vermilion Routes.\n\nSono a tua disposizione per creare il tuo viaggio su misura tra l\'**Ecuador Continentale e le Isole Galapagos**.\n\nQuale destinazione o date hai in mente per iniziare?',
    pt: 'Olá! Sou **Pyro**, seu Concierge e consultor de viagens na Vermilion Routes.\n\nEstou aqui para ajudar você a planejar sua viagem personalizada pelo **Equador Continental e Ilhas Galápagos**.\n\nQuais destinos ou datas você tem em mente para começar?',
    ja: 'こんにちは！Vermilion Routesの専任コンシェルジュ、**Pyro（パイロ）**です。\n\n**エクアドル本土およびガラパゴス諸岛**へのオーダーメイドの贅沢な旅のプランニングをお手伝いいたします。\n\nご希望の目的地やご旅行の時期など、お気軽にお聞かせください。',
    zh: '您好！我是 Vermilion Routes 的专属旅行礼宾顾问 **Pyro**。\n\n我将竭诚为您定制**厄瓜多尔大陆与加拉帕戈斯群岛**的专属探索之旅。\n\n请问您心仪的目的地或预计出发日期是什么时候？',
  };

  const TOUR_INQUIRY_BY_LOCALE: Record<string, (title: string) => string> = {
    es: (title) => `¡Hola! Veo que te interesa la expedición **${title}**. Con gusto puedo asesorarte con itinerarios, mejores temporadas y cotizaciones personalizadas. ¿En qué fechas planeas viajar?`,
    en: (title) => `Hello! I see you are interested in the **${title}** expedition. I can assist you with availability, custom itineraries, and rates. When are you planning to travel?`,
    fr: (title) => `Bonjour ! Je vois que l'expédition **${title}** vous intéresse. Je serais ravie de vous renseigner sur les disponibilités et itinéraires sur mesure. Quelles sont vos dates ?`,
    de: (title) => `Hallo! Ich sehe, dass Sie sich für die Expedition **${title}** interessieren. Gerne helfe ich Ihnen mit Reisedaten und maßgeschneiderten Angeboten weiter. Wann möchten Sie reisen?`,
    it: (title) => `Ciao! Vedo che sei interessato alla spedizione **${title}**. Sarò felice di fornirti disponibilità e dettagli su misura. In quali date vorresti viaggiare?`,
    pt: (title) => `Olá! Vejo que tem interesse na expedição **${title}**. Terei todo o prazer em ajudar com disponibilidade e roteiros personalizados. Quais são as suas datas de viagem?`,
    ja: (title) => `こんにちは！**${title}**のツアーにご興味をお持ちいただきありがとうございます。日程やカスタマイズについてご案内いたします。ご旅行の予定時期をお知らせください。`,
    zh: (title) => `您好！看到您对**${title}**行程感兴趣。我很乐意为您提供具体的行程细节、排期及定制报价。请问您计划什么时候出行？`,
  };

  const defaultGreeting = GREETINGS_BY_LOCALE[locale] || GREETINGS_BY_LOCALE.en;

  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenChat, setIsOpenChat] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: defaultGreeting,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<string>('nvidia');
  const [leadCaptured, setLeadCaptured] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const phoneNumber = '593994048458';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpenChat) {
      scrollToBottom();
    }
  }, [messages, isOpenChat]);

  // Update default greeting if locale changes
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length <= 1) {
        return [
          {
            id: '1',
            role: 'assistant',
            content: defaultGreeting,
            timestamp: new Date(),
          },
        ];
      }
      return prev;
    });
  }, [defaultGreeting]);

  // Listen for open concierge events
  useEffect(() => {
    const handleOpenGeneral = () => {
      setIsOpenMenu(false);
      setIsOpenChat(true);
    };

    const handleOpenTour = (e: Event) => {
      const customEvent = e as CustomEvent<{ tourTitle?: string }>;
      setIsOpenMenu(false);
      setIsOpenChat(true);
      if (customEvent.detail?.tourTitle) {
        const title = customEvent.detail.tourTitle;
        const inquiryFn = TOUR_INQUIRY_BY_LOCALE[locale] || TOUR_INQUIRY_BY_LOCALE.en;
        const inquiryPrompt = inquiryFn(title);
        
        setMessages((prev) => {
          const alreadyHasTourMsg = prev.some((m) => m.content.includes(title));
          if (alreadyHasTourMsg) return prev;
          return [
            ...prev,
            {
              id: Date.now().toString(),
              role: 'assistant',
              content: inquiryPrompt,
              timestamp: new Date(),
            },
          ];
        });
      }
    };

    window.addEventListener('open-concierge-chat', handleOpenGeneral);
    window.addEventListener('open-tour-chat', handleOpenTour);
    return () => {
      window.removeEventListener('open-concierge-chat', handleOpenGeneral);
      window.removeEventListener('open-tour-chat', handleOpenTour);
    };
  }, [locale]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputMessage.trim();
    if (!query || isLoading) return;

    const newMessages: ChatMessage[] = [...messages, { role: 'user', content: query }];
    setMessages(newMessages);
    setInputMessage('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/concierge/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
          provider: selectedProvider,
          locale: locale || 'en',
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: data.message,
            providerUsed: data.providerUsed,
          },
        ]);
        if (data.leadSubmitted) {
          setLeadCaptured(true);
        }
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (err: any) {
      console.error('Concierge Chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'I apologize for the moment. Our concierge team is ready to assist you directly via WhatsApp or email. Would you like me to connect you with a live specialist?',
          providerUsed: 'Fallback System',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const getWhatsAppLink = (customText?: string) => {
    const defaultText = customText
      ? encodeURIComponent(customText)
      : encodeURIComponent(
          'Hello Vermilion Routes! I would like to speak with a human travel specialist about planning a itinerary in South America.'
        );
    return `https://wa.me/${phoneNumber}?text=${defaultText}`;
  };

  const transferChatToWhatsApp = () => {
    const lastUserMsgs = messages.filter((m) => m.role === 'user').map((m) => m.content).join(' | ');
    const summary = `Hello Vermilion Routes! I was chatting with Pyro AI on your website about: "${lastUserMsgs || 'Expeditions'}". Can a travel advisor assist me?`;
    window.open(getWhatsAppLink(summary), '_blank');
  };

  return (
    <>
      {/* FLOATING CONCIERGE BUTTON */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {/* POPOVER SELECTION MENU */}
        {isOpenMenu && !isOpenChat && (
          <div className="mb-4 w-80 sm:w-96 bg-zinc-900/95 backdrop-blur-xl border border-amber-500/30 rounded-2xl shadow-2xl p-4 text-white animate-in fade-in slide-in-from-bottom-4 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center border border-amber-500/40 text-amber-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-semibold text-amber-200">
                    Vermilion Concierge Center
                  </h4>
                  <p className="text-[11px] text-zinc-400">Choose your preferred assistance</p>
                </div>
              </div>
              <button
                suppressHydrationWarning
                onClick={() => setIsOpenMenu(false)}
                className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-3 space-y-2">
              {/* Option 1: AI Concierge */}
              <button
                suppressHydrationWarning
                onClick={() => {
                  setIsOpenMenu(false);
                  setIsOpenChat(true);
                }}
                className="w-full text-left p-3 rounded-xl bg-gradient-to-r from-amber-950/40 to-zinc-800/60 hover:from-amber-900/50 hover:to-zinc-800 border border-amber-500/30 hover:border-amber-400/60 transition-all duration-200 group flex items-start gap-3"
              >
                <div className="p-2.5 rounded-xl bg-amber-500 text-zinc-950 font-bold group-hover:scale-105 transition-transform shadow-lg shadow-amber-500/20 mt-0.5">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-xs text-amber-200 flex items-center gap-1.5">
                      AI Concierge <span className="text-[10px] bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded-md">24/7 Instant</span>
                    </span>
                    <ChevronRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-[11px] text-zinc-300 mt-0.5">
                    Instant quotes, day-by-day itineraries & customized recommendations.
                  </p>
                </div>
              </button>

              {/* Option 2: Human Specialist on WhatsApp */}
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpenMenu(false)}
                className="w-full text-left p-3 rounded-xl bg-zinc-800/50 hover:bg-emerald-950/40 border border-zinc-700/60 hover:border-emerald-500/40 transition-all duration-200 group flex items-start gap-3"
              >
                <div className="p-2.5 rounded-xl bg-emerald-500 text-white font-bold group-hover:scale-105 transition-transform shadow-lg shadow-emerald-500/20 mt-0.5">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-xs text-emerald-300 flex items-center gap-1.5">
                      Direct WhatsApp Advisor <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded-md">Quito HQ</span>
                    </span>
                    <ChevronRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-[11px] text-zinc-300 mt-0.5">
                    Chat with senior travel specialist Pablo & Team (+593 99 404 8458).
                  </p>
                </div>
              </a>
            </div>

            <div className="mt-3 pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[10px] text-zinc-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-amber-400" /> Authorized Operator
              </span>
              <span className="text-zinc-500">Response time: &lt; 1 min</span>
            </div>
          </div>
        )}

        {/* TRIGGER BUTTON */}
        {!isOpenChat && (
          <button
            suppressHydrationWarning
            onClick={() => setIsOpenMenu(!isOpenMenu)}
            className="relative flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-amber-600 to-emerald-600 hover:from-amber-500 hover:to-emerald-500 text-white rounded-full shadow-2xl shadow-amber-900/40 hover:scale-105 active:scale-95 transition-all duration-300 group border-2 border-white/20"
            aria-label="Open Concierge Assistant Menu"
          >
            {/* Pulsing Aura */}
            <span className="absolute inset-0 rounded-full bg-amber-500 animate-ping opacity-25 group-hover:opacity-40" />
            
            <div className="relative z-10 flex items-center justify-center">
              {isOpenMenu ? (
                <X className="w-6 h-6 stroke-[2.5]" />
              ) : (
                <Bot className="w-7 h-7 stroke-[2.2] animate-bounce-short" />
              )}
            </div>

            {/* Notification Badge */}
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-zinc-950 rounded-full" />
          </button>
        )}
      </div>

      {/* INTERACTIVE AI CONCIERGE CHAT DRAWER */}
      {isOpenChat && (
        <div className="fixed bottom-4 right-4 z-50 w-[92vw] sm:w-[420px] h-[600px] max-h-[85vh] bg-zinc-950 text-white rounded-2xl shadow-2xl border border-zinc-800 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-300">
          {/* CHAT HEADER */}
          <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-amber-950/60 p-3.5 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-emerald-500 p-0.5 shadow-md">
                  <div className="w-full h-full bg-zinc-900 rounded-full flex items-center justify-center text-amber-400">
                    <Bot className="w-5 h-5" />
                  </div>
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-zinc-900 rounded-full" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-serif font-semibold text-sm text-amber-100">Pyro</h3>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded font-sans">
                    AI Concierge
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 flex items-center gap-1">
                  <span>Vermilion Routes Expedition Specialist</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                suppressHydrationWarning
                onClick={() => setIsOpenChat(false)}
                className="text-zinc-400 hover:text-white p-1.5 rounded-lg hover:bg-zinc-800 transition-colors"
                aria-label="Close Chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* QUICK PROMPT PILLS */}
          <div className="bg-zinc-900/80 px-3 py-2 border-b border-zinc-800/60 overflow-x-auto flex items-center gap-2 no-scrollbar">
            <span className="text-[10px] text-zinc-400 shrink-0 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" /> Suggestions:
            </span>
            <button
              suppressHydrationWarning
              onClick={() => handleSendMessage('Recommend top Galapagos cruise itineraries and prices')}
              className="text-[11px] whitespace-nowrap bg-zinc-800 hover:bg-amber-950/50 hover:border-amber-500/40 border border-zinc-700/60 text-zinc-200 px-2.5 py-1 rounded-full transition-colors"
            >
              🏝️ Galapagos Cruises
            </button>
            <button
              suppressHydrationWarning
              onClick={() => handleSendMessage('How to combine Galapagos and Mainland Ecuador in one trip?')}
              className="text-[11px] whitespace-nowrap bg-zinc-800 hover:bg-amber-950/50 hover:border-amber-500/40 border border-zinc-700/60 text-zinc-200 px-2.5 py-1 rounded-full transition-colors"
            >
              🌋 Galapagos + Ecuador
            </button>
            <button
              suppressHydrationWarning
              onClick={() => handleSendMessage('I want to request a custom travel quote for 2 people')}
              className="text-[11px] whitespace-nowrap bg-zinc-800 hover:bg-amber-950/50 hover:border-amber-500/40 border border-zinc-700/60 text-zinc-200 px-2.5 py-1 rounded-full transition-colors"
            >
              💰 Get Custom Quote
            </button>
          </div>

          {/* CHAT MESSAGES STREAM */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs sm:text-sm bg-zinc-950/50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-2.5 ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-zinc-950 shrink-0 font-bold mt-1 shadow-sm">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-3 shadow-md text-xs sm:text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-amber-600 text-white rounded-br-xs'
                      : 'bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-bl-xs'
                  }`}
                >
                  <div className="whitespace-pre-line">{msg.content}</div>

                  {msg.providerUsed && (
                    <div className="mt-2 pt-1.5 border-t border-zinc-800/80 text-[10px] text-zinc-500 flex items-center justify-between">
                      <span>{msg.providerUsed}</span>
                      <span className="text-amber-400/80">Vermilion AI</span>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 justify-start items-center">
                <div className="w-7 h-7 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                  <Bot className="w-4 h-4 animate-spin" />
                </div>
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-3 text-xs text-zinc-400 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span>Pyro is crafting your itinerary...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* LEAD CONFIRMATION BANNER */}
          {leadCaptured && (
            <div className="bg-emerald-950/60 border-t border-emerald-500/30 p-2.5 px-4 flex items-center justify-between text-emerald-300 text-xs">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Lead details saved to system!
              </span>
              <span className="text-[10px] text-emerald-400/80">Our advisors will contact you</span>
            </div>
          )}

          {/* WHATSAPP TRANSFORMATION ACTION */}
          <div className="bg-zinc-900/90 px-3 py-2 border-t border-zinc-800 flex items-center justify-between">
            <span className="text-[11px] text-zinc-400">Prefer human response?</span>
            <button
              suppressHydrationWarning
              onClick={transferChatToWhatsApp}
              className="text-[11px] font-medium bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              Transfer Chat to WhatsApp
            </button>
          </div>

          {/* CHAT INPUT FORM */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-zinc-900 border-t border-zinc-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask Pyro about tours, dates, prices..."
              suppressHydrationWarning
              className="flex-1 bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 text-xs sm:text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-500 transition-colors"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !inputMessage.trim()}
              suppressHydrationWarning
              className="bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:hover:bg-amber-500 text-zinc-950 font-bold p-2.5 rounded-xl transition-transform active:scale-95 shadow-md flex items-center justify-center shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
