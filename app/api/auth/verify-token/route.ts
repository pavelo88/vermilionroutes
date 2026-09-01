import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ error: 'Token es requerido' }, { status: 400 });
    }

    const decoded = verifyToken(token);
    
    if (!decoded) {
      return NextResponse.json({ error: 'Token inválido o expirado' }, { status: 401 });
    }

    return NextResponse.json({ success: true, email: decoded.email, cedula: decoded.cedula });
  } catch (error: any) {
    return NextResponse.json({ error: 'Error verificando el token' }, { status: 500 });
  }
}
