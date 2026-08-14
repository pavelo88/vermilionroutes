import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'Forbidden: Endpoint is strictly disabled in production.' },
      { status: 403 }
    );
  }

  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.SEED_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Lógica de seeding aislada y segura
    return NextResponse.json({ success: true, message: 'Seeding complete.' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Seeding failed' }, { status: 500 });
  }
}
