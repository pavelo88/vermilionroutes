'use client';

import React, { useState, useEffect } from 'react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { AdminLoginForm } from '@/components/admin/AdminLoginForm';
import { AdminDashboard } from '@/components/admin/AdminDashboard';

export default function AdminPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const checkMasterSession = () => {
      const isMaster = localStorage.getItem('vermilion_admin_session') === 'true';
      if (isMaster) {
        return {
          email: process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@vermilionroutes.com',
          uid: 'master-admin-session',
          displayName: 'Master Administrator'
        } as User;
      }
      return null;
    };

    const masterUser = checkMasterSession();
    if (masterUser) {
      setCurrentUser(masterUser);
      setAuthLoading(false);
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && user.email) {
        const cleanEmail = user.email.toLowerCase().trim();
        let isAuthorized = false;

        // Validar contra colección usuarios
        if (db) {
          try {
            const uSnap = await getDoc(doc(db, 'usuarios', cleanEmail));
            if (uSnap.exists()) {
              const r = String(uSnap.data()?.role || '').toLowerCase().trim();
              if (r === 'super' || r === 'editor') {
                isAuthorized = true;
              }
            }
          } catch (err) {
            console.warn('[cPanel Auth Check]', err);
          }
        }

        // Fundadores y administradores maestros tienen pase directo garantizado
        const isMaster =
          cleanEmail === 'pablofgarciaf@gmail.com' ||
          cleanEmail === 'info@vermilionroutes.com' ||
          cleanEmail === (process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@vermilionroutes.com').toLowerCase().trim();

        if (isMaster) {
          console.log('🕵️‍♂️ [CHISMOSO CPANEL] Acceso de Super Admin concedido a:', cleanEmail);
          isAuthorized = true;
        }

        if (isAuthorized) {
          setCurrentUser(user);
        } else {
          console.warn(`[CHISMOSO CPANEL] Acceso no autorizado para: ${cleanEmail}`);
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(checkMasterSession());
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    localStorage.removeItem('vermilion_admin_session');
    try {
      await signOut(auth);
    } catch {}
    setCurrentUser(null);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-zinc-400">Verifying administrative credentials...</p>
        </div>
      </div>
    );
  }

  if (currentUser) {
    return <AdminDashboard user={currentUser} onSignOut={handleSignOut} />;
  }

  return <AdminLoginForm />;
}
