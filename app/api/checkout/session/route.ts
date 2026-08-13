import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { z } from 'zod';

const CheckoutSchema = z.object({
  tourId: z.string().nullable().optional(),
  tourTitle: z.string().optional(),
  clientEmail: z.string().email('Valid email is required'),
  customLinkId: z.string().optional(),
  amount: z.number().optional(),
  paymentType: z.enum(['deposit', 'full', 'custom']).optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate payload with Zod
    const result = CheckoutSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: 'Invalid payload data', details: result.error.format() }, { status: 400 });
    }

    const { tourId, tourTitle, clientEmail, customLinkId, amount, paymentType } = result.data;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const finalAmountUSD = amount && amount > 0 ? amount : 500;
    const stripeKey = process.env.STRIPE_SECRET_KEY;

    // 1. If valid Stripe key is present, create Stripe Checkout Session
    if (stripeKey && !stripeKey.includes('fake') && (stripeKey.startsWith('sk_test_') || stripeKey.startsWith('sk_live_'))) {
      try {
        const stripe = new Stripe(stripeKey, { apiVersion: '2026-07-29.dahlia' as any });
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: [
            {
              price_data: {
                currency: 'usd',
                product_data: {
                  name: tourTitle || 'Vermilion Routes - Itinerary Payment',
                  description: `${paymentType === 'full' ? 'Full Tour Payment' : 'Deposit Reservation'} for ${clientEmail}`,
                },
                unit_amount: Math.round(finalAmountUSD * 100),
              },
              quantity: 1,
            },
          ],
          mode: 'payment',
          customer_email: clientEmail,
          success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${baseUrl}/tours/${tourId || ''}`,
          metadata: {
            tourId: tourId || 'custom-itinerary',
            customLinkId: customLinkId || 'direct-web',
            paymentType: paymentType || 'deposit',
          },
        });

        return NextResponse.json({ sessionId: session.id, url: session.url });
      } catch (stripeErr: any) {
        console.error('Stripe checkout creation failed:', stripeErr.message);
        return NextResponse.json(
          { error: 'Payment session could not be created' },
          { status: 500 }
        );
      }
    }

    // 2. Direct Payment Link fallback for instant processing & VIP reservation links
    const queryParams = new URLSearchParams({
      tourId: tourId || 'custom',
      tourTitle: tourTitle || 'Custom Itinerary',
      email: clientEmail,
      amount: String(finalAmountUSD),
      type: paymentType || 'deposit',
      ref: customLinkId || `ref-${Date.now()}`
    });

    const paymentUrl = `${baseUrl}/checkout/payment?${queryParams.toString()}`;

    return NextResponse.json({
      sessionId: `session_${Date.now()}`,
      url: paymentUrl
    });

  } catch (err: any) {
    console.error('Checkout API Error:', err);
    return NextResponse.json(
      { error: 'Could not create payment link. Please verify details and try again.' },
      { status: 500 }
    );
  }
}
