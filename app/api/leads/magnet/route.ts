import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { sendLeadMagnetEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, locale } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    if (db) {
      try {
        await addDoc(collection(db, 'leads'), {
          email: email.trim().toLowerCase(),
          locale: locale || 'en',
          source: 'lead_magnet',
          createdAt: new Date().toISOString(),
          downloaded: false,
        });
      } catch (dbErr) {
        console.warn('Firestore lead save notice:', dbErr);
      }
    }

    // Send actual guide email via SMTP
    await sendLeadMagnetEmail(email.trim().toLowerCase(), locale || 'es');

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Lead magnet API error:', err);
    return NextResponse.json({ error: 'Failed to save lead. Please try again.' }, { status: 500 });
  }
}