'use client';

import { useState, useEffect, useCallback } from 'react';
import { Tour } from '@/types';
import { mockTours } from '@/data/mock';
import { TourRepository } from '@/lib/services/firebaseRepository';
import { seedDatabaseToFirestore } from '@/lib/tours';

export function useToursData() {
  const [tours, setTours] = useState<Tour[]>(mockTours);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isUsingFallback, setIsUsingFallback] = useState<boolean>(false);

  useEffect(() => {
    let isSubscribed = true;
    setLoading(true);

    const unsubscribe = TourRepository.subscribe(
      (data) => {
        if (!isSubscribed) return;
        if (data && data.length > 0) {
          setTours(data);
          setIsUsingFallback(false);
        } else {
          setTours(mockTours);
          setIsUsingFallback(true);
        }
        setLoading(false);
        setError(null);
      },
      (err) => {
        if (!isSubscribed) return;
        console.warn('Hook received Firestore error:', err);
        setError(err.message || 'Failed to sync with Firestore');
        setTours(mockTours);
        setIsUsingFallback(true);
        setLoading(false);
      }
    );

    return () => {
      isSubscribed = false;
      unsubscribe();
    };
  }, []);

  const saveTour = useCallback(async (tour: Tour) => {
    try {
      if (!tour.id) throw new Error('Tour must have an ID to save.');
      await TourRepository.save(tour.id, tour);
    } catch (err: any) {
      console.error('Error saving tour:', err);
      throw err;
    }
  }, []);

  const deleteTour = useCallback(async (id: string) => {
    try {
      await TourRepository.delete(id);
    } catch (err: any) {
      console.error('Error deleting tour:', err);
      throw err;
    }
  }, []);

  const seedDatabase = useCallback(async () => {
    try {
      await seedDatabaseToFirestore();
    } catch (err: any) {
      console.error('Error seeding database:', err);
      throw err;
    }
  }, []);

  return {
    tours,
    loading,
    error,
    isUsingFallback,
    saveTour,
    deleteTour,
    seedDatabase,
    defaultData: mockTours
  };
}
