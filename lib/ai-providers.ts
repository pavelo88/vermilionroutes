import { GoogleGenAI } from '@google/genai';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import { mockTours } from '@/data/mock';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ConciergeResponse {
  message: string;
  providerUsed: string;
  detectedLead?: {
    name?: string;
    email?: string;
    phone?: string;
    destination?: string;
    travelers?: string;
    travelDates?: string;
  };
  paymentIntent?: {
    tourId?: string;
    clientEmail?: string;
    customerName?: string;
  };
}

/** ✅ W-01 FIX: Caché de catálogo en memoria con TTL de 5 minutos.
 * Evita un getDocs() de Firestore en cada mensaje del concierge.
 */
interface CatalogCache {
  data: string;
  expiresAt: number;
}
let catalogCache: CatalogCache | null = null;
const CATALOG_CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutos

/**
 * Fetches real-time tour catalog from Firestore or fallback mock.
 * Result is cached in-memory for CATALOG_CACHE_TTL_MS to avoid per-request reads.
 */
async function getCatalogContext(): Promise<string> {
  // Servir desde caché si aún es válido
  if (catalogCache && Date.now() < catalogCache.expiresAt) {
    return catalogCache.data;
  }

  try {
    const querySnap = await getDocs(collection(db, 'tours'));
    if (!querySnap.empty) {
      const tours = querySnap.docs.map((d) => d.data());
      const data = tours
        .map(
          (t: any) =>
            `- ID: "${t.id}" | Title: "${t.title}" | Dest: "${t.destination}" | Duration: "${t.duration}" | Price: $${t.price} USD | Rating: ${t.rating}\u2605 | Category: "${t.category}" | Highlights: ${t.highlights?.join(', ') || 'N/A'}`
        )
        .join('\n');
      // Almacenar en caché
      catalogCache = { data, expiresAt: Date.now() + CATALOG_CACHE_TTL_MS };
      return data;
    }
  } catch (err) {
    console.warn('Catalog fetch for AI context fallback:', err);
  }

  // Fallback a mock (no cachear errores para reintentar en el próximo request)
  return mockTours
    .map(
      (t) =>
        `- ID: "${t.id}" | Title: "${t.title}" | Dest: "${t.destination}" | Duration: "${t.duration}" | Price: $${t.price} USD | Rating: ${t.rating}\u2605 | Category: "${t.category}" | Highlights: ${t.highlights?.join(', ')}`
    )
    .join('\n');
}

/**
 * Builds system prompt with sales loop engineering
 */
export async function buildSystemPrompt(): Promise<string> {
  const catalog = await getCatalogContext();

  return `You are "Valentina", the Senior AI Luxury Travel Concierge & Sales Advisor at Vermilion Routes (https://vermilionroutes.com).
Your mission is to welcome website visitors, qualify their luxury travel desires in Galapagos, Mainland Ecuador, and Peru, build bespoke itineraries, and convert their interest into custom quote requests.

### VERMILION ROUTES CORE CATALOG:
${catalog}

### KEY SELLING POINTS TO EMPHASIZE:
1. 24/7 Dedicated Destination Concierge Support.
2. Certified Bilingual PNG Naturalist Guides in Galapagos & Inca Heritage Historians in Peru.
3. Tailor-Made & Private Expeditions (No crowded cookie-cutter group tours).
4. Direct Call / WhatsApp Specialist Contact: +593 99 404 8458 | Email: info@vermilionroutes.com.

### BEHAVIORAL & CONVERSION RULES (LOOP ENGINEERING):
1. **Language Matching**: Always reply in the same language the customer uses (English or Spanish).
2. **Sales Qualification**: If the user is uncertain, ask 2 concise questions max: (a) Preferred travel dates or month? (b) Total number of travelers & preferred pace/budget?
3. **Bespoke Recommendations**: Recommend 1 or 2 specific packages from the catalog above with exact prices, durations, and highlights.
4. **Lead Capture Prompt**: When the user expresses interest in booking, getting a custom price, or requesting an itinerary, ask them warmly for:
   - Full Name
   - Email Address
   - WhatsApp / Phone
   - Approximate Travel Month / Dates
5. **Structured Lead Output**: IF the customer provides their contact info (name AND email or phone), include a JSON block at the very end of your response on a new line like this:
[[LEAD_DATA: {"customerName":"...", "customerEmail":"...", "customerPhone":"...", "destination":"...", "travelers":"...", "travelDates":"..."}]]
6. **Payment Link Generation**: IF the customer explicitly states they want to book, pay the deposit, or make a reservation right now, AND you have their email address, output this intent block at the end so the system can generate a Stripe link for them:
[[PAYMENT_INTENT: {"tourId":"tour-id-from-catalog", "clientEmail":"...", "customerName":"..."}]]
7. Keep responses elegant, structured with bullet points, warm, and highly professional. Avoid dry robotic text.
`;
}

/**
 * Multi-Provider AI Routing Engine
 * Supports: NVIDIA API, DeepSeek, GLM (Zhipu AI), Gemini, or Fallback.
 */
export async function generateConciergeReply(
  messages: ChatMessage[],
  preferredProvider?: string
): Promise<ConciergeResponse> {
  const systemPrompt = await buildSystemPrompt();

  const activeProvider = (
    preferredProvider ||
    process.env.AI_PROVIDER ||
    'nvidia'
  ).toLowerCase();

  const nvidiaKey = process.env.NVIDIA_API_KEY || process.env.NVAPI_KEY;
  const deepseekKey = process.env.DEEPSEEK_API_KEY;
  const glmKey = process.env.GLM_API_KEY || process.env.ZHIPU_API_KEY;
  const geminiKey = process.env.GEMINI_API_KEY;

  // 1. Try NVIDIA API (Meta Llama 3.1 70B Instruct / Mistral)
  if ((activeProvider === 'nvidia' || (!deepseekKey && !glmKey)) && nvidiaKey) {
    try {
      const response = await fetch(
        'https://integrate.api.nvidia.com/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${nvidiaKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'meta/llama-3.1-70b-instruct',
            messages: [
              { role: 'system', content: systemPrompt },
              ...messages.map((m) => ({ role: m.role, content: m.content })),
            ],
            temperature: 0.6,
            max_tokens: 1024,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const replyText =
          data.choices?.[0]?.message?.content || 'Thank you for reaching out!';
        return parseResponseText(replyText, 'NVIDIA (Meta Llama-3.1-70B)');
      } else {
        console.warn('NVIDIA API status error:', response.status);
      }
    } catch (err) {
      console.warn('NVIDIA API execution failed:', err);
    }
  }

  // 2. Try DeepSeek API
  if ((activeProvider === 'deepseek' || deepseekKey) && deepseekKey) {
    try {
      const response = await fetch(
        'https://api.deepseek.com/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${deepseekKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'deepseek-chat',
            messages: [
              { role: 'system', content: systemPrompt },
              ...messages.map((m) => ({ role: m.role, content: m.content })),
            ],
            temperature: 0.6,
            max_tokens: 1024,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const replyText = data.choices?.[0]?.message?.content || '';
        if (replyText) {
          return parseResponseText(replyText, 'DeepSeek V3');
        }
      }
    } catch (err) {
      console.warn('DeepSeek API execution failed:', err);
    }
  }

  // 3. Try GLM (Zhipu AI API)
  if ((activeProvider === 'glm' || glmKey) && glmKey) {
    try {
      const response = await fetch(
        'https://open.bigmodel.cn/api/paas/v4/chat/completions',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${glmKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'glm-4-flash',
            messages: [
              { role: 'system', content: systemPrompt },
              ...messages.map((m) => ({ role: m.role, content: m.content })),
            ],
            temperature: 0.6,
            max_tokens: 1024,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const replyText = data.choices?.[0]?.message?.content || '';
        if (replyText) {
          return parseResponseText(replyText, 'GLM-4 Flash');
        }
      }
    } catch (err) {
      console.warn('GLM API execution failed:', err);
    }
  }

  // 4. Try Google Gemini API
  if (geminiKey || activeProvider === 'gemini') {
    try {
      const ai = new GoogleGenAI({ apiKey: geminiKey || process.env.GEMINI_API_KEY });
      const formattedHistory = messages.map((m) => `${m.role.toUpperCase()}: ${m.content}`).join('\n');
      const fullPrompt = `${systemPrompt}\n\nCONVERSATION HISTORY:\n${formattedHistory}\n\nASSISTANT:`;

      const res = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: fullPrompt,
      });

      if (res.text) {
        return parseResponseText(res.text, 'Google Gemini 2.5 Flash');
      }
    } catch (err) {
      console.warn('Gemini API execution failed:', err);
    }
  }

  // 5. Intelligent Fallback Concierge Engine
  return generateFallbackConciergeReply(messages, systemPrompt);
}

/**
 * Extracts [[LEAD_DATA: {...}]] tags from AI generated text if present
 */
function parseResponseText(fullText: string, providerName: string): ConciergeResponse {
  let cleanMessage = fullText;
  let detectedLead: ConciergeResponse['detectedLead'] = undefined;
  let paymentIntent: ConciergeResponse['paymentIntent'] = undefined;

  const leadMatch = fullText.match(/\[\[LEAD_DATA:\s*(\{.*?\})\s*\]\]/s);
  if (leadMatch && leadMatch[1]) {
    try {
      detectedLead = JSON.parse(leadMatch[1]);
      cleanMessage = cleanMessage.replace(/\[\[LEAD_DATA:\s*\{.*?\}\s*\]\]/s, '').trim();
    } catch (e) {
      console.warn('Failed to parse lead JSON from AI output:', e);
    }
  }

  const paymentMatch = fullText.match(/\[\[PAYMENT_INTENT:\s*(\{.*?\})\s*\]\]/s);
  if (paymentMatch && paymentMatch[1]) {
    try {
      paymentIntent = JSON.parse(paymentMatch[1]);
      cleanMessage = cleanMessage.replace(/\[\[PAYMENT_INTENT:\s*\{.*?\}\s*\]\]/s, '').trim();
    } catch (e) {
      console.warn('Failed to parse payment intent from AI output:', e);
    }
  }

  return {
    message: cleanMessage,
    providerUsed: providerName,
    detectedLead,
    paymentIntent,
  };
}

/**
 * Smart rules-based fallback engine for uninterrupted guest service
 */
function generateFallbackConciergeReply(
  messages: ChatMessage[],
  catalogPrompt: string
): ConciergeResponse {
  const lastUserMsg = messages[messages.length - 1]?.content.toLowerCase() || '';

  let reply = '';
  if (lastUserMsg.includes('galapagos') || lastUserMsg.includes('island')) {
    reply = `Greetings! I would be delighted to assist you with our **Galapagos Islands Luxury Expeditions**.\n\nOur top-rated experiences include:\n- **Andes, Amazon Jungle & Enchanted Galapagos Expedition** (12 Days - $2,731 USD)\n- **Enchanted Islands Luxury Island Hopping** (7 Days - $1,799 USD)\n\nMay I ask your estimated travel dates and how many guests will be traveling? I can customize the itinerary for you immediately.`;
  } else if (lastUserMsg.includes('price') || lastUserMsg.includes('cost') || lastUserMsg.includes('quote')) {
    reply = `Our tailor-made expeditions range from $1,799 USD to $2,731 USD per guest, including boutique luxury stays, private expert naturalist guides, and seamless internal transfers.\n\nIf you provide your **Name**, **Email**, and **WhatsApp number**, I will instantly submit a custom quote request for our team to review.`;
  } else {
    reply = `Hello! I am **Valentina**, Lead Luxury Concierge at Vermilion Routes.\n\nWhether you dream of snorkeling with sea lions in the **Galapagos Islands**, exploring the **Ecuadorian Amazon**, or hiking the **Volcanoes Avenue**, I am here to design your perfect journey.\n\nHow may I assist you today?`;
  }

  return {
    message: reply,
    providerUsed: 'Vermilion Intelligent Rule Engine (Fallback)',
  };
}
