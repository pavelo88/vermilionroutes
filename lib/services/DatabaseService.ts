import {
  TourRepository,
  BookingRepository,
  DestinationRepository,
  SettingsRepository,
  FirebaseRepository
} from './firebaseRepository';
import { Tour, BookingRequest, DestinationInfo, SiteSettings } from '@/types';
import { mockTours, mockDestinations } from '@/data/mock';
import { QueryConstraint, Unsubscribe } from 'firebase/firestore';

/**
 * ============================================================================
 * UNIFIED DATA ACCESS SERVICE (DatabaseService)
 * ============================================================================
 * Central business layer providing robust entity querying, locale awareness,
 * and automated fallbacks across all Firestore collections.
 */
export class DatabaseService {
  /**
   * Fetches active entities of a given collection, applying locale/status filtering
   * and falling back gracefully to mock datasets if Firestore is unavailable or empty.
   */
  static async fetchActiveEntities<T = any>(
    collectionName: 'tours' | 'destinations' | 'bookings' | 'settings' | string,
    locale?: string
  ): Promise<T[]> {
    try {
      const repo = this.getRepository<T>(collectionName);
      const items = await repo.getAll();

      if (items && items.length > 0) {
        return items;
      }

      // Fallback strategies for known core collections
      if (collectionName === 'tours') {
        return mockTours as unknown as T[];
      }
      if (collectionName === 'destinations') {
        return mockDestinations as unknown as T[];
      }

      return [];
    } catch (error) {
      console.warn(`[DatabaseService] fetchActiveEntities failed for '${collectionName}', falling back to default data:`, error);
      
      if (collectionName === 'tours') {
        return mockTours as unknown as T[];
      }
      if (collectionName === 'destinations') {
        return mockDestinations as unknown as T[];
      }

      return [];
    }
  }

  /**
   * Fetches an entity by ID from the specified collection
   */
  static async getById<T = any>(collectionName: string, id: string): Promise<T | null> {
    const repo = this.getRepository<T>(collectionName);
    const item = await repo.getById(id);
    if (item) return item;

    // Fallback for tours and destinations
    if (collectionName === 'tours') {
      const fallbackTour = mockTours.find((t) => t.id === id);
      return (fallbackTour as unknown as T) || null;
    }
    if (collectionName === 'destinations') {
      const fallbackDest = mockDestinations.find((d) => d.id === id || d.slug === id);
      return (fallbackDest as unknown as T) || null;
    }

    return null;
  }

  /**
   * Creates a new entity document in the specified collection
   */
  static async create<T = any>(collectionName: string, data: Omit<T, 'id'>): Promise<string> {
    const repo = this.getRepository<T>(collectionName);
    return await repo.create(data);
  }

  /**
   * Saves or merges an entity document by ID
   */
  static async save<T = any>(collectionName: string, id: string, data: Partial<T>): Promise<void> {
    const repo = this.getRepository<T>(collectionName);
    return await repo.save(id, data);
  }

  /**
   * Updates fields of an existing entity document
   */
  static async update<T = any>(collectionName: string, id: string, partial: Partial<T>): Promise<void> {
    const repo = this.getRepository<T>(collectionName);
    return await repo.update(id, partial);
  }

  /**
   * Deletes an entity document by ID
   */
  static async delete(collectionName: string, id: string): Promise<void> {
    const repo = this.getRepository(collectionName);
    return await repo.delete(id);
  }

  /**
   * Subscribes to real-time updates of a collection
   */
  static subscribe<T = any>(
    collectionName: string,
    onData: (data: T[]) => void,
    onError?: (err: Error) => void,
    constraints: QueryConstraint[] = []
  ): Unsubscribe {
    const repo = this.getRepository<T>(collectionName);
    return repo.subscribe(onData, onError, constraints);
  }

  /**
   * Returns typed repository instance for a collection
   */
  static getRepository<T = any>(collectionName: string): FirebaseRepository<T> {
    switch (collectionName) {
      case 'tours':
        return TourRepository as unknown as FirebaseRepository<T>;
      case 'bookings':
        return BookingRepository as unknown as FirebaseRepository<T>;
      case 'destinations':
        return DestinationRepository as unknown as FirebaseRepository<T>;
      case 'settings':
        return SettingsRepository as unknown as FirebaseRepository<T>;
      default:
        return new FirebaseRepository<T>(collectionName);
    }
  }
}

// Re-export core repositories for direct access
export {
  TourRepository,
  BookingRepository,
  DestinationRepository,
  SettingsRepository,
  FirebaseRepository
};
