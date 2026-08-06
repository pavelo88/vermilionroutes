import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_fake', {
  apiVersion: '2026-07-29.dahlia' as any,
});

export async function POST(request: Request) {
  try {
    const { tourId, clientEmail, customLinkId } = await request.json();
    
    // In production NEXT_PUBLIC_BASE_URL should be set, fallback to localhost for dev
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Vermilion Routes - Itinerary Reservation Deposit',
              description: `Guaranteed reservation deposit for tour ID: ${tourId || 'Custom Trip'}`,
            },
            unit_amount: 50000, // $500.00 USD in cents
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
        depositAmount: '500',
        customLinkId: customLinkId || 'direct-web',
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (err: any) {
    console.error('Stripe session creation error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
