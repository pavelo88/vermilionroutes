'use client';

import React, { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
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

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
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
