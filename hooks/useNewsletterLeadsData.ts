import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

export interface NewsletterLead {
  id: string;
  email: string;
  affiliateId: string | null;
  status: 'verificacion_pendiente' | 'verificado';
  createdAt: any;
  source: string;
}

export function useNewsletterLeadsData() {
  const [leads, setLeads] = useState<NewsletterLead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!db) {
      setLoading(false);
      return;
    }

    const leadsRef = collection(db, 'clientes_destacados');
    const q = query(leadsRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as NewsletterLead[];
      
      setLeads(data);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching newsletter leads:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { leads, loading };
}
