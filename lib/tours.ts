import { db } from './firebase';
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
  query,
  orderBy,
  onSnapshot
} from 'firebase/firestore';
import { Tour } from '@/types';
import { mockTours } from '@/data/mock';

const TOURS_COLLECTION = 'tours';

function withTimeout<T>(promise: Promise<T>, ms: number = 3500): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`Firestore request timed out after ${ms}ms`)), ms)
    ),
  ]);
}

/**
 * Seed initial mock data to Firestore if collection is empty
 */
import { seedAllDataToFirestore } from './seed';

export async function seedDatabaseToFirestore(): Promise<void> {
  try {
    await seedAllDataToFirestore();
    console.log('Successfully seeded database with all mock settings, destinations, reviews, and tours');
  } catch (err) {
    console.error('Error seeding Firestore database:', err);
    throw err;
  }
}

/**
 * Subscribe to real-time updates from Firestore.
 * Fallback to mockTours if empty or on error.
 */
export function subscribeToursFromFirestore(
  onUpdate: (tours: Tour[]) => void,
  onError?: (err: Error) => void
): () => void {
  if (typeof window === 'undefined') {
    onUpdate(mockTours);
    return () => {};
  }

  try {
    const toursRef = collection(db, TOURS_COLLECTION);
    const unsubscribe = onSnapshot(
      toursRef,
      (snapshot) => {
        if (snapshot.empty) {
          console.log('Firestore tours collection is empty. Auto-seeding database...');
          onUpdate(mockTours);
          seedDatabaseToFirestore().catch((seedErr) => {
            console.warn('Auto-seed attempt failed or timed out:', seedErr);
          });
        } else {
          const tours: Tour[] = [];
          snapshot.forEach((docSnap) => {
            tours.push({ id: docSnap.id, ...docSnap.data() } as Tour);
          });
          onUpdate(tours);
        }
      },
      (err) => {
        console.warn('Firestore subscription error, falling back to mock data:', err);
        if (onError) onError(err);
        onUpdate(mockTours);
      }
    );
    return unsubscribe;
  } catch (err: any) {
    console.warn('Failed to subscribe to Firestore tours:', err);
    onUpdate(mockTours);
    return () => {};
  }
}

/**
 * Fetch all tours from Firestore. If running on server or collection is empty, return mock data.
 */
export async function getToursFromFirestore(): Promise<Tour[]> {
  if (typeof window === 'undefined') {
    return mockTours;
  }
  try {
    const toursRef = collection(db, TOURS_COLLECTION);
    const snapshot = await withTimeout(getDocs(toursRef), 3500);

    if (snapshot.empty) {
      console.log('No tours found in Firestore. Seeding database automatically...');
      try {
        await seedDatabaseToFirestore();
      } catch (seedErr) {
        console.warn('Auto-seed failed during initial fetch:', seedErr);
      }
      return mockTours;
    }

    const tours: Tour[] = [];
    snapshot.forEach((docSnap) => {
      tours.push({ id: docSnap.id, ...docSnap.data() } as Tour);
    });

    return tours;
  } catch (err) {
    console.warn('Error fetching tours from Firestore, falling back to mock data:', err);
    return mockTours;
  }
}

/**
 * Fetch a single tour by ID from Firestore.
 */
export async function getTourByIdFromFirestore(id: string): Promise<Tour | null> {
  if (typeof window === 'undefined') {
    const fallback = mockTours.find((t) => t.id === id);
    return fallback || null;
  }
  try {
    const docRef = doc(db, TOURS_COLLECTION, id);
    const docSnap = await withTimeout(getDoc(docRef), 3500);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Tour;
    }

    // Fallback to local mock
    const fallback = mockTours.find((t) => t.id === id);
    return fallback || null;
  } catch (err) {
    console.warn(`Error fetching tour ${id} from Firestore, falling back:`, err);
    const fallback = mockTours.find((t) => t.id === id);
    return fallback || null;
  }
}

/**
 * Save (create or update) a tour in Firestore
 */
export async function saveTourToFirestore(tour: Tour): Promise<void> {
  if (!tour.id) {
    throw new Error('Tour ID is required');
  }
  const docRef = doc(db, TOURS_COLLECTION, tour.id);
  await setDoc(docRef, tour, { merge: true });
}

/**
 * Delete a tour from Firestore
 */
export async function deleteTourFromFirestore(id: string): Promise<void> {
  const docRef = doc(db, TOURS_COLLECTION, id);
  await deleteDoc(docRef);
}
