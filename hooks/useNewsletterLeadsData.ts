import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

export interface NewsletterLead {
  id: string;
  name?: string;
  email: string;
  affiliateId?: string | null;
  status?: string;
  createdAt: any;
  source?: string;
  tourName?: string;
  tourId?: string;
}

export function useNewsletterLeadsData() {
  const [leads, setLeads] = useState<NewsletterLead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!db) {
      setLoading(false);
      return;
    }

    // Combine leads from 'leads' collection and 'clientes_destacados'
    const leadsRef = collection(db, 'leads');
    const qLeads = query(leadsRef, orderBy('createdAt', 'desc'));

    const unsubscribeLeads = onSnapshot(qLeads, (snapshotLeads) => {
      const mainLeads = snapshotLeads.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as NewsletterLead[];

      // Also listen to legacy 'clientes_destacados'
      const legacyRef = collection(db, 'clientes_destacados');
      const qLegacy = query(legacyRef, orderBy('createdAt', 'desc'));

      onSnapshot(qLegacy, (snapshotLegacy) => {
        const legacyLeads = snapshotLegacy.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as NewsletterLead[];

        // Combine and deduplicate by email or id
        const map = new Map<string, NewsletterLead>();
        mainLeads.forEach(l => map.set(l.email || l.id, l));
        legacyLeads.forEach(l => {
          if (l.email && !map.has(l.email)) map.set(l.email, l);
        });

        const combined = Array.from(map.values()).sort((a, b) => {
          const timeA = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : (typeof a.createdAt === 'string' ? new Date(a.createdAt).getTime() : 0);
          const timeB = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : (typeof b.createdAt === 'string' ? new Date(b.createdAt).getTime() : 0);
          return timeB - timeA;
        });

        setLeads(combined);
        setLoading(false);
      }, (error) => {
        console.warn('Clientes destacados fetch notice:', error);
        setLeads(mainLeads);
        setLoading(false);
      });
    }, (error) => {
      console.error('Error fetching leads:', error);
      setLoading(false);
    });

    return () => unsubscribeLeads();
  }, []);

  return { leads, loading };
}
