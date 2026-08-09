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
      unsubscribe = onSnapshot(destQuery, (snapshot) => {
        if (!snapshot.empty) {
          const fetched = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as Destination[];
          setDestinations(fetched);
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
