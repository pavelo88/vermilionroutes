import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import { mockDestinations } from '@/data/mock';
import parsedTours from '@/data/parsed_tours.json';

export async function GET() {
  try {
    const seededTours: string[] = [];
    const seededDestinations: string[] = [];

    // Seed Tours
    for (const tour of parsedTours) {
      const tourRef = doc(db, 'tours', tour.id);
      await setDoc(tourRef, tour, { merge: true });
      seededTours.push(tour.id);
    }

    // Seed Destinations
    for (const dest of mockDestinations) {
      const destRef = doc(db, 'destinations', dest.id);
      await setDoc(destRef, dest, { merge: true });
      seededDestinations.push(dest.id);
    }

    return NextResponse.json({
      success: true,
      message: 'Firestore database successfully populated with initial data.',
      seededToursCount: seededTours.length,
      seededDestinationsCount: seededDestinations.length,
      tourIds: seededTours,
      destinationIds: seededDestinations,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('Error in /api/seed route:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to seed database'
      },
      { status: 500 }
    );
  }
}

export async function POST() {
  return GET();
}
