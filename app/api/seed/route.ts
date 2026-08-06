import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, collection, writeBatch, serverTimestamp } from 'firebase/firestore';
import { mockTours, mockDestinations } from '@/data/mock';

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    const seedSecret = process.env.SEED_SECRET_KEY || 'vermilion2026';
    
    // Uncomment for production security:
    // if (authHeader !== `Bearer ${seedSecret}`) {
    //   return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
    // }

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
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  return POST(request);
}
