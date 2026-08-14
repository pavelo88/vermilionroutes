import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { sanitizeText, isValidEmail, isValidPhone } from '@/lib/validation';
import { BookingRequest } from '@/types';
import { z } from 'zod';

const LeadSchema = z.object({
  customerName: z.string().optional(),
  name: z.string().optional(),
  customerEmail: z.string().optional(),
  email: z.string().optional(),
  customerPhone: z.string().optional(),
  phone: z.string().optional(),
  tourId: z.string().optional(),
  tourTitle: z.union([z.string(), z.record(z.string(), z.any())]).optional(),
  destination: z.union([z.string(), z.record(z.string(), z.any())]).optional(),
  travelDates: z.string().optional(),
  date: z.string().optional(),
  guestsCount: z.string().optional(),
  travelers: z.string().optional(),
  message: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.json();
    const result = LeadSchema.safeParse(rawBody);
    
    if (!result.success) {
      return NextResponse.json({ success: false, error: 'Invalid payload data', details: result.error.format() }, { status: 400 });
    }
    
    const body = result.data;

    const customerName = sanitizeText(body.customerName || body.name || '');
    const customerEmail = sanitizeText(body.customerEmail || body.email || '');
    const customerPhone = sanitizeText(body.customerPhone || body.phone || '');
    const tourId = sanitizeText(body.tourId || 'general-inquiry');
    
    const rawTitle = body.tourTitle as any;
    const resolvedTitleStr = typeof rawTitle === 'string'
      ? rawTitle
      : (rawTitle && typeof rawTitle === 'object' && (rawTitle.en || rawTitle.es))
        ? String(rawTitle.en || rawTitle.es)
        : 'Custom Trip Inquiry';
    const tourTitle = sanitizeText(resolvedTitleStr);

    const rawDest = body.destination as any;
    const resolvedDestStr = typeof rawDest === 'string'
      ? rawDest
      : (rawDest && typeof rawDest === 'object' && (rawDest.en || rawDest.es))
        ? String(rawDest.en || rawDest.es)
        : 'Galapagos / Mainland Ecuador';
    const destination = sanitizeText(resolvedDestStr);

    const travelDates = sanitizeText(body.travelDates || body.date || 'Flexible');
    const guestsCount = sanitizeText(body.guestsCount || body.travelers || '2 Travelers');
    const message = sanitizeText(body.message || '');

    // Validation
    if (!customerName || customerName.length < 2) {
      return NextResponse.json(
        { success: false, error: 'Full name is required (minimum 2 characters).' },
        { status: 400 }
      );
    }

    if (!customerEmail || !isValidEmail(customerEmail)) {
      return NextResponse.json(
        { success: false, error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    if (customerPhone && !isValidPhone(customerPhone)) {
      return NextResponse.json(
        { success: false, error: 'Invalid phone number format.' },
        { status: 400 }
      );
    }

    const createdAt = new Date().toISOString();

    const bookingPayload: Omit<BookingRequest, 'id'> = {
      tourId,
      tourTitle,
      customerName,
      customerEmail,
      customerPhone,
      travelDates,
      guestsCount,
      destination,
      message,
      status: 'pending',
      createdAt,
    };

    // Save lead in Firestore `bookings` collection
    const bookingsRef = collection(db, 'bookings');
    const docRef = await addDoc(bookingsRef, bookingPayload);
    const bookingId = docRef.id;

    // Trigger n8n webhook if configured
    let webhookTriggered = false;
    let webhookError: string | null = null;
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;

    if (n8nWebhookUrl) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 sec timeout

        const webhookPayload = {
          event: 'lead.created',
          bookingId,
          createdAt,
          source: 'vermilion-routes-web',
          lead: {
            id: bookingId,
            ...bookingPayload,
          },
        };

        const webhookRes = await fetch(n8nWebhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'VermilionRoutes-API/1.0',
          },
          body: JSON.stringify(webhookPayload),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (webhookRes.ok) {
          webhookTriggered = true;
        } else {
          webhookError = `n8n webhook responded with status ${webhookRes.status}`;
          console.warn('[n8n Webhook Warning]', webhookError);
        }
      } catch (err: any) {
        webhookError = err.name === 'AbortError' ? 'n8n webhook timeout' : err.message;
        console.warn('[n8n Webhook Error]', webhookError);
      }
    }

    return NextResponse.json({
      success: true,
      bookingId,
      message: 'Lead captured successfully and stored in Firestore.',
      webhookTriggered,
      webhookError,
    });
  } catch (error: any) {
    console.error('API /api/leads Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Internal server error while processing lead.',
      },
      { status: 500 }
    );
  }
}
