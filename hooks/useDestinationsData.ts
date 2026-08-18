'use client';

import { useState, useEffect } from 'react';
import { Destination } from '@/types';
import { mockDestinations } from '@/data/mock';
import { DestinationRepository } from '@/lib/services/DatabaseService';

export function useDestinationsData() {
  const [destinations, setDestinations] = useState<Destination[]>(mockDestinations);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validIds = new Set(['ecuador', 'galapagos', 'combined', 'full-day']);
    const order = ['ecuador', 'galapagos', 'combined', 'full-day'];

    const unsubscribe = DestinationRepository.subscribe(
      (data: any[]) => {
        if (data && data.length > 0) {
          const filtered = data
            .filter((d) => validIds.has(d.id?.toLowerCase()))
            .sort((a, b) => order.indexOf(a.id.toLowerCase()) - order.indexOf(b.id.toLowerCase()));

          if (filtered.length > 0) {
            setDestinations(filtered as Destination[]);
          } else {
            setDestinations(mockDestinations);
          }
        } else {
          setDestinations(mockDestinations);
        }
        setLoading(false);
      },
      (err) => {
        console.warn('Failed to fetch destinations from Firestore, using fallback:', err);
        setDestinations(mockDestinations);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { destinations, loading };
}
