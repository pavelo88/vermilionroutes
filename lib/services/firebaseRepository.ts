import { db } from '@/lib/firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  onSnapshot,
  query,
  QueryConstraint,
  Unsubscribe
} from 'firebase/firestore';
import { Tour, BookingRequest, DestinationInfo, SiteSettings } from '@/types';

/**
 * ============================================================================
 * DATA ACCESS LAYER (DAL) — GENERIC FIREBASE REPOSITORY
 * ============================================================================
 * Encapsulates all direct Firestore SDK interactions into a unified,
 * reusable repository pattern. Prevents leaking data-fetching logic into UI components.
 */
export class FirebaseRepository<T extends { id?: string }> {
  protected collectionName: string;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  /**
   * Fetch a single document by its ID
   */
  async getById(id: string): Promise<T | null> {
    try {
      const docRef = doc(db, this.collectionName, id);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) return null;
      return { id: docSnap.id, ...docSnap.data() } as T;
    } catch (error: any) {
      console.error(`[FirebaseRepository:${this.collectionName}] Error fetching ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Fetch all documents in collection matching optional constraints
   */
  async getAll(constraints: QueryConstraint[] = []): Promise<T[]> {
    try {
      const q = query(collection(db, this.collectionName), ...constraints);
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as T);
    } catch (error: any) {
      console.error(`[FirebaseRepository:${this.collectionName}] Error in getAll:`, error);
      throw error;
    }
  }

  /**
   * Create a new document with auto-generated ID
   */
  async create(data: Omit<T, 'id'>): Promise<string> {
    try {
      const colRef = collection(db, this.collectionName);
      const docRef = await addDoc(colRef, data);
      return docRef.id;
    } catch (error: any) {
      console.error(`[FirebaseRepository:${this.collectionName}] Error creating document:`, error);
      throw error;
    }
  }

  /**
   * Save or overwrite a document by specific ID
   */
  async save(id: string, data: Partial<T>): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, id);
      await setDoc(docRef, data, { merge: true });
    } catch (error: any) {
      console.error(`[FirebaseRepository:${this.collectionName}] Error saving ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Update partial fields of an existing document
   */
  async update(id: string, partial: Partial<T>): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, id);
      await updateDoc(docRef, partial as any);
    } catch (error: any) {
      console.error(`[FirebaseRepository:${this.collectionName}] Error updating ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Delete a document by ID
   */
  async delete(id: string): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, id);
      await deleteDoc(docRef);
    } catch (error: any) {
      console.error(`[FirebaseRepository:${this.collectionName}] Error deleting ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Realtime reactive subscription to collection
   */
  subscribe(
    onData: (data: T[]) => void,
    onError?: (error: Error) => void,
    constraints: QueryConstraint[] = []
  ): Unsubscribe {
    const q = query(collection(db, this.collectionName), ...constraints);
    return onSnapshot(
      q,
      (snapshot) => {
        const items = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as T);
        onData(items);
      },
      (err) => {
        console.warn(`[FirebaseRepository:${this.collectionName}] Subscription error:`, err);
        if (onError) onError(err);
      }
    );
  }
}

// ── Service Singletons ──
export const TourRepository = new FirebaseRepository<Tour>('tours');
export const BookingRepository = new FirebaseRepository<BookingRequest>('bookings');
export const DestinationRepository = new FirebaseRepository<DestinationInfo>('destinations');
export const SettingsRepository = new FirebaseRepository<SiteSettings>('settings');
