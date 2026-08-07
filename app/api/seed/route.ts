import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, collection, writeBatch, serverTimestamp } from 'firebase/firestore';
import { mockTours, mockDestinations } from '@/data/mock';

export async function POST(request: Request) {
  // ✅ C-03 FIX: Autorización obligatoria en producción
  const authHeader = request.headers.get('authorization');
  const seedSecret = process.env.SEED_SECRET_KEY;

  if (!seedSecret) {
    return NextResponse.json(
      { error: 'Seed endpoint is disabled: SEED_SECRET_KEY is not configured.' },
      { status: 503 }
    );
  }

  if (authHeader !== `Bearer ${seedSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const batch = writeBatch(db);

    // Seed Destinations
    for (const dest of mockDestinations) {
      const destRef = doc(db, 'destinations', dest.id);
      batch.set(destRef, dest, { merge: true });
    }

    // Seed Tours and their Itineraries as subcollections
    for (const tour of mockTours) {
      const { itinerary, itineraryEs, ...tourData } = tour;
      const tourRef = doc(db, 'tours', tour.id);

      batch.set(tourRef, {
        ...tourData,
        updatedAt: serverTimestamp(),
      }, { merge: true });

      if (itinerary && itinerary.length > 0) {
        itinerary.forEach((item, index) => {
          const itineraryRef = doc(collection(tourRef, 'itineraries'), `day-${item.day || index + 1}`);
          batch.set(itineraryRef, item, { merge: true });
        });
      }
    }

    await batch.commit();
    return NextResponse.json({ success: true, message: 'Seeding completed successfully' });
  } catch (error: any) {
    // ✅ No exponemos el mensaje interno de error al cliente
    console.error('Seed error:', error);
    return NextResponse.json({ error: 'Seeding failed. Check server logs.' }, { status: 500 });
  }
}

// ✅ C-03 FIX: Eliminado el handler GET que delegaba en POST sin autenticación
// El endpoint seed solo acepta POST con Bearer token
