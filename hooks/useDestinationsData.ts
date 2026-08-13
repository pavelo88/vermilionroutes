'use client';

import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, getFirestore } from 'firebase/firestore';
import { getApp } from 'firebase/app';
import { Destination } from '@/types';
import { mockDestinations } from '@/data/mock';

export function useDestinationsData() {
  const [destinations, setDestinations] = useState<Destination[]>(mockDestinations);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe: () => void = () => {};
    try {
      const db = getFirestore(getApp());
      const destQuery = query(collection(db, 'destinations'));
      const validIds = new Set(['galapagos', 'ecuador', 'full-day']);
      unsubscribe = onSnapshot(destQuery, (snapshot) => {
        if (!snapshot.empty) {
          const fetched = snapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() } as Destination))
            .filter(d => validIds.has(d.id.toLowerCase()));

          if (fetched.length > 0) {
            fetched.sort((a, b) => {
              const order = ['galapagos', 'ecuador', 'full-day'];
              return order.indexOf(a.id.toLowerCase()) - order.indexOf(b.id.toLowerCase());
            });
            setDestinations(fetched);
          } else {
            setDestinations(mockDestinations);
          }
        }
        setLoading(false);
      }, (err) => {
        console.error('Failed to fetch destinations:', err);
        setLoading(false);
      });
    } catch (e) {
      console.warn('Firebase not initialized or error fetching destinations:', e);
      setLoading(false);
    }
    return () => unsubscribe();
  }, []);

  return { destinations, loading };
}
