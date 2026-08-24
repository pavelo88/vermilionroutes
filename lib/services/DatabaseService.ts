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
import { mockTours, mockDestinations } from '@/data/mock';

/**
 * ============================================================================
 * DATA ACCESS LAYER (DAL) — UNIFIED DATABASE SERVICE
 * ============================================================================
 * Consolidates all Firestore database operations into a single generic,
 * reusable repository pattern. Prevents leaking data-fetching logic into
 * UI components while providing resilience and automatic mock fallbacks.
 */
export class DatabaseService<T extends { id?: string } = any> {
  protected collectionName: string;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  /**
   * Fetch a single document by its ID
   */
  async getById(id: string): Promise<T | null> {
    if (!db) {
      return this.getFallbackById(id);
    }
    try {
      const docRef = doc(db, this.collectionName, id);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        return this.getFallbackById(id);
      }
      return this.sanitizeItem({ id: docSnap.id, ...docSnap.data() });
    } catch (error: any) {
      console.warn(`[DatabaseService:${this.collectionName}] Error fetching ID ${id}, using fallback:`, error);
      return this.getFallbackById(id);
    }
  }

  /**
   * Fetch all documents in collection matching optional constraints
   */
  async getAll(constraints: QueryConstraint[] = []): Promise<T[]> {
    if (!db) {
      return this.getFallbackAll();
    }
    try {
      const q = query(collection(db, this.collectionName), ...constraints);
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        return this.getFallbackAll();
      }
      return querySnapshot.docs.map((d) => this.sanitizeItem({ id: d.id, ...d.data() }));
    } catch (error: any) {
      console.warn(`[DatabaseService:${this.collectionName}] Error in getAll, using fallback:`, error);
      return this.getFallbackAll();
    }
  }

  /**
   * Create a new document with auto-generated ID
   */
  async create(data: Omit<T, 'id'>): Promise<string> {
    if (!db) throw new Error('Firebase DB is not initialized.');
    try {
      const colRef = collection(db, this.collectionName);
      const docRef = await addDoc(colRef, data);
      return docRef.id;
    } catch (error: any) {
      console.error(`[DatabaseService:${this.collectionName}] Error creating document:`, error);
      throw error;
    }
  }

  /**
   * Save or overwrite a document by specific ID (merge mode)
   */
  async save(id: string, data: Partial<T>): Promise<void> {
    if (!db) return;
    try {
      const docRef = doc(db, this.collectionName, id);
      await setDoc(docRef, data, { merge: true });
    } catch (error: any) {
      console.error(`[DatabaseService:${this.collectionName}] Error saving ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Upsert document by ID (alias for save for strict semantic clarity)
   */
  async upsert(id: string, data: Partial<T>): Promise<void> {
    return this.save(id, data);
  }

  /**
   * Update partial fields of an existing document
   */
  async update(id: string, partial: Partial<T>): Promise<void> {
    if (!db) return;
    try {
      const docRef = doc(db, this.collectionName, id);
      await updateDoc(docRef, partial as any);
    } catch (error: any) {
      console.error(`[DatabaseService:${this.collectionName}] Error updating ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Delete a document by ID
   */
  async delete(id: string): Promise<void> {
    if (!db) return;
    try {
      const docRef = doc(db, this.collectionName, id);
      await deleteDoc(docRef);
    } catch (error: any) {
      console.error(`[DatabaseService:${this.collectionName}] Error deleting ID ${id}:`, error);
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
    if (!db) {
      onData(this.getFallbackAll());
      if (onError) onError(new Error('Firebase DB is not initialized. Falling back to default data.'));
      return () => {};
    }

    try {
      const q = query(collection(db, this.collectionName), ...constraints);
      return onSnapshot(
        q,
        (snapshot) => {
          if (snapshot.empty) {
            onData(this.getFallbackAll());
          } else {
            const items = snapshot.docs.map((d) => this.sanitizeItem({ id: d.id, ...d.data() }));
            onData(items);
          }
        },
        (err) => {
          console.warn(`[DatabaseService:${this.collectionName}] Subscription error, falling back:`, err);
          onData(this.getFallbackAll());
          if (onError) onError(err);
        }
      );
    } catch (err: any) {
      console.warn(`[DatabaseService:${this.collectionName}] Failed to subscribe to Firestore:`, err);
      onData(this.getFallbackAll());
      if (onError) onError(err);
      return () => {};
    }
  }

  private sanitizeItem(item: any): T {
    if (!item) return item;
    if (this.collectionName === 'tours' && item.id) {
      const canonical = mockTours.find((t) => t.id === item.id);
      if (canonical) {
        return {
          ...item,
          imageUrl: canonical.imageUrl,
          desktopImage: canonical.desktopImage || canonical.imageUrl,
          mobileImage: canonical.mobileImage || canonical.imageUrl,
          gallery: canonical.gallery && canonical.gallery.length > 0 ? canonical.gallery : item.gallery,
        } as T;
      }
    }
    if (this.collectionName === 'destinations' && item.id) {
      const canonical = mockDestinations.find((d) => d.id === item.id || d.slug === item.id);
      if (canonical) {
        return {
          ...item,
          imageUrl: canonical.imageUrl,
        } as T;
      }
    }
    return item as T;
  }

  private getFallbackAll(): T[] {
    if (this.collectionName === 'tours') return mockTours as unknown as T[];
    if (this.collectionName === 'destinations') return mockDestinations as unknown as T[];
    return [];
  }

  private getFallbackById(id: string): T | null {
    if (this.collectionName === 'tours') {
      const item = mockTours.find((t) => t.id === id);
      return (item as unknown as T) || null;
    }
    if (this.collectionName === 'destinations') {
      const item = mockDestinations.find((d) => d.id === id || d.slug === id);
      return (item as unknown as T) || null;
    }
    return null;
  }

  // ── Static Helper Facade Methods ──

  static async fetchActiveEntities<T = any>(
    collectionName: 'tours' | 'destinations' | 'bookings' | 'settings' | string,
    locale?: string
  ): Promise<T[]> {
    const repo = DatabaseService.getRepository<T>(collectionName);
    return repo.getAll();
  }

  static async getById<T = any>(collectionName: string, id: string): Promise<T | null> {
    const repo = DatabaseService.getRepository<T>(collectionName);
    return repo.getById(id);
  }

  static async create<T = any>(collectionName: string, data: Omit<T, 'id'>): Promise<string> {
    const repo = DatabaseService.getRepository<T>(collectionName);
    return repo.create(data);
  }

  static async save<T = any>(collectionName: string, id: string, data: Partial<T>): Promise<void> {
    const repo = DatabaseService.getRepository<T>(collectionName);
    return repo.save(id, data);
  }

  static async upsert<T = any>(collectionName: string, id: string, data: Partial<T>): Promise<void> {
    const repo = DatabaseService.getRepository<T>(collectionName);
    return repo.upsert(id, data);
  }

  static async update<T = any>(collectionName: string, id: string, partial: Partial<T>): Promise<void> {
    const repo = DatabaseService.getRepository<T>(collectionName);
    return repo.update(id, partial);
  }

  static async delete(collectionName: string, id: string): Promise<void> {
    const repo = DatabaseService.getRepository(collectionName);
    return repo.delete(id);
  }

  static subscribe<T = any>(
    collectionName: string,
    onData: (data: T[]) => void,
    onError?: (err: Error) => void,
    constraints: QueryConstraint[] = []
  ): Unsubscribe {
    const repo = DatabaseService.getRepository<T>(collectionName);
    return repo.subscribe(onData, onError, constraints);
  }

  static getRepository<T = any>(collectionName: string): DatabaseService<T> {
    switch (collectionName) {
      case 'tours':
        return toursRepository as unknown as DatabaseService<T>;
      case 'bookings':
      case 'leads':
        return leadsRepository as unknown as DatabaseService<T>;
      case 'destinations':
        return destinationsRepository as unknown as DatabaseService<T>;
      case 'settings':
        return settingsRepository as unknown as DatabaseService<T>;
      default:
        return new DatabaseService<T>(collectionName);
    }
  }
}

// ── Typed Singleton Repositories ──
export const toursRepository = new DatabaseService<Tour>('tours');
export const TourRepository = toursRepository;

export const leadsRepository = new DatabaseService<BookingRequest>('bookings');
export const BookingRepository = leadsRepository;

export const destinationsRepository = new DatabaseService<DestinationInfo>('destinations');
export const DestinationRepository = destinationsRepository;

export const settingsRepository = new DatabaseService<SiteSettings>('settings');
export const SettingsRepository = settingsRepository;

// Backwards compatibility alias for any legacy imports
export { DatabaseService as FirebaseRepository };
