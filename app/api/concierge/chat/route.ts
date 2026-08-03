import { NextRequest, NextResponse } from 'next/server';
import { generateConciergeReply, ChatMessage } from '@/lib/ai-providers';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages: ChatMessage[] = body.messages || [];
    const provider: string | undefined = body.provider;

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Messages array is required.' },
        { status: 400 }
      );
    }

    // Generate AI Concierge reply using selected/configured AI provider
    const conciergeResponse = await generateConciergeReply(messages, provider);

    let leadSubmitted = false;
    let leadId: string | undefined = undefined;

    // Auto-persist lead if AI extracted user contact information during chat
    if (conciergeResponse.detectedLead) {
      const { name, email, phone, destination, travelers, travelDates } = conciergeResponse.detectedLead;
      if (name || email || phone) {
        try {
          const bookingPayload = {
            tourId: 'ai-concierge-lead',
            tourTitle: `AI Concierge Lead (${destination || 'South America'})`,
            customerName: name || 'Valued Guest',
            customerEmail: email || 'pending@guest.com',
            customerPhone: phone || '',
            travelDates: travelDates || 'Flexible',
            guestsCount: travelers || '2 Travelers',
            destination: destination || 'Galapagos / Ecuador / Peru',
            message: 'Lead automatically captured by AI Virtual Concierge chatbot',
            status: 'pending' as const,
            createdAt: new Date().toISOString(),
          };

          const docRef = await addDoc(collection(db, 'bookings'), bookingPayload);
          leadId = docRef.id;
          leadSubmitted = true;

          // Also attempt to notify n8n if configured
          if (process.env.N8N_WEBHOOK_URL) {
            fetch(process.env.N8N_WEBHOOK_URL, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                event: 'ai_concierge.lead_captured',
                bookingId: leadId,
                lead: bookingPayload,
              }),
            }).catch((err) => console.warn('n8n notification from AI concierge warning:', err));
          }
        } catch (err) {
          console.warn('Auto lead save from AI Concierge failed:', err);
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: conciergeResponse.message,
      providerUsed: conciergeResponse.providerUsed,
      leadSubmitted,
      leadId,
    });
  } catch (error: any) {
    console.error('API /api/concierge/chat Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Internal error in AI Concierge.',
      },
      { status: 500 }
    );
  }
}
