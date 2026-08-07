import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_fake', {
  apiVersion: '2026-07-29.dahlia' as any,
});

export async function POST(request: Request) {
  try {
    const { tourId, tourTitle, clientEmail, customLinkId, amount } = await request.json();
    
    // In production NEXT_PUBLIC_BASE_URL should be set, fallback to localhost for dev
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    
    // If amount is provided, charge that, otherwise fallback to 500
    const finalAmount = amount ? Math.round(amount * 100) : 50000;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: tourTitle || 'Vermilion Routes - Itinerary Reservation',
              description: `Reservation for tour ID: ${tourId || 'Custom Trip'}`,
            },
            unit_amount: finalAmount, // Amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: clientEmail,
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/tours/${tourId}`,
      metadata: {
        tourId: tourId || 'custom-itinerary',
        customLinkId: customLinkId || 'direct-web',
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (err: any) {
    // ✅ I-04 FIX: No exponer mensajes internos de Stripe al cliente
    console.error('Stripe session creation error:', err);
    const isStripeError = err?.type?.startsWith('Stripe');
    return NextResponse.json(
      { error: isStripeError ? 'Payment session could not be created. Please try again.' : 'Internal server error.' },
      { status: 500 }
    );
  }
}
