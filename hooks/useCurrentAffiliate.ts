'use client';

import { useEffect, useState } from 'react';
import { AffiliateAccount, getAffiliateByEmail } from '@/lib/affiliates';
// Import useAuth when ready: import { getAuth, onAuthStateChanged } from 'firebase/auth';

export function useCurrentAffiliate() {
  const [affiliate, setAffiliate] = useState<AffiliateAccount | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Cuando el sistema de auth esté listo, reemplazar esto por:
    // const auth = getAuth();
    // const unsubscribe = onAuthStateChanged(auth, async (user) => { ... });
    
    // Por ahora, usamos el Root (Pablo) para visualizar el panel de Lujo
    const testEmail = 'pablofgarciaf@gmail.com';
    
    const fetchAffiliate = async () => {
      try {
        setLoading(true);
        const data = await getAffiliateByEmail(testEmail);
        if (data) {
          setAffiliate(data);
        } else {
          setError('No se encontró el afiliado en la base de datos.');
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAffiliate();
  }, []);

  return { affiliate, loading, error };
}
