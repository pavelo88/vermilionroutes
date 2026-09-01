import { NextResponse } from 'next/server';
import { sendVerificationEmail, generateVerificationToken } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const { email, name, cedula } = await request.json();

    if (!email || !name || !cedula) {
      return NextResponse.json({ error: 'Faltan datos requeridos' }, { status: 400 });
    }

    const token = generateVerificationToken(email, cedula);
    
    await sendVerificationEmail(email, name, token);

    return NextResponse.json({ success: true, message: 'Correo enviado' });
  } catch (error: any) {
    console.error('Error in send-verification route:', error);
    return NextResponse.json({ error: 'Error enviando el correo de verificación' }, { status: 500 });
  }
}
