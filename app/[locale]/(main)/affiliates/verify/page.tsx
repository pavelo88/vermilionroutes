'use client';

import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Shield, Key, Loader2, CheckCircle2, Lock, User } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';

type ProcessStep = 'verify' | 'setPassword' | 'loading' | 'success' | 'error';

function VerifyFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [step, setStep] = useState<ProcessStep>('verify');
  const [errorMsg, setErrorMsg] = useState('');
  
  // Form State
  const [email, setEmail] = useState('');
  const [cedula, setCedula] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Auto-verificar si es un enlace de Firebase Auth
  useEffect(() => {
    const { auth } = require('@/lib/firebase');
    const { isSignInWithEmailLink, signInWithEmailLink } = require('firebase/auth');
    
    if (isSignInWithEmailLink(auth, window.location.href)) {
      setStep('loading');
      
      let storedEmail = window.localStorage.getItem('emailForSignIn');
      if (!storedEmail) {
        // En un caso real podrías pedir el email aquí
        // Por simplicidad, si no está en localStorage lo pedimos al usuario usando un prompt nativo temporalmente
        storedEmail = window.prompt('Por favor, confirma tu correo electrónico para verificar el enlace:');
      }

      if (storedEmail) {
        signInWithEmailLink(auth, storedEmail, window.location.href)
          .then((result) => {
            window.localStorage.removeItem('emailForSignIn');
            setEmail(storedEmail);
            const cedulaParam = searchParams.get('cedula');
            if (cedulaParam) setCedula(cedulaParam);
            setStep('setPassword');
          })
          .catch((err) => {
            console.error(err);
            setErrorMsg('El enlace de verificación es inválido o ya fue usado.');
            setStep('error');
          });
      } else {
        setErrorMsg('Necesitamos tu correo para verificar el enlace.');
        setStep('error');
      }
    }
  }, [searchParams]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep('loading');
    setErrorMsg('');

    try {
      if (!db) throw new Error('Base de datos no disponible');

      // Buscar al afiliado por email y cédula
      const q = query(
        collection(db, 'affiliates'),
        where('email', '==', email.trim().toLowerCase()),
        where('cedula', '==', cedula.trim())
      );
      
      const snap = await getDocs(q);
      
      if (snap.empty) {
        throw new Error('No se encontraron registros con ese correo y cédula. Por favor verifica tus datos.');
      }

      // El afiliado existe, pasamos a definir la contraseña
      setStep('setPassword');
    } catch (error: any) {
      setErrorMsg(error.message);
      setStep('error');
    }
  };

  const handleSetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setErrorMsg('Las contraseñas no coinciden.');
      setStep('error');
      return;
    }
    
    if (password.length < 6) {
      setErrorMsg('La contraseña debe tener al menos 6 caracteres.');
      setStep('error');
      return;
    }

    setStep('loading');
    setErrorMsg('');

    try {
      const auth = getAuth();
      
      // 1. Crear el usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email.trim().toLowerCase(), password);
      
      // 2. Actualizar el documento en Firestore para marcarlo como verificado
      if (db) {
        const docRef = doc(db, 'affiliates', email.trim().toLowerCase());
        await updateDoc(docRef, {
          isEmailVerified: true
        });
      }

      setStep('success');
      
      // Redirigir al dashboard después de 3 segundos
      setTimeout(() => {
        router.push('/dashboard');
      }, 3000);
      
    } catch (error: any) {
      console.error(error);
      if (error.code === 'auth/email-already-in-use') {
        setErrorMsg('Esta cuenta ya ha sido verificada y tiene una contraseña asignada. Inicia sesión normalmente.');
      } else {
        setErrorMsg('Ocurrió un error al crear tus credenciales. Intenta nuevamente.');
      }
      setStep('error');
    }
  };

  return (
    <section className="min-h-screen relative flex items-center justify-center py-24 bg-stone-950 overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-md px-4">
        
        <div className="text-center mb-8">
          <Shield className="w-16 h-16 text-amber-500 mx-auto mb-4 opacity-80" />
          <h1 className="text-3xl font-light text-white mb-2">Verificación de Identidad</h1>
          <p className="text-white/60">Asegura tu cuenta de Embajador Vermilion</p>
        </div>

        <div className="p-1 rounded-3xl bg-gradient-to-b from-white/10 to-transparent">
          <div className="bg-black/60 backdrop-blur-xl border border-white/5 rounded-[22px] p-8 shadow-2xl">
            
            {step === 'error' && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                <p className="text-sm text-red-200">{errorMsg}</p>
                <button 
                  onClick={() => setStep('verify')}
                  className="mt-3 text-sm text-amber-500 hover:text-amber-400 underline"
                >
                  Volver a intentar
                </button>
              </div>
            )}

            {step === 'loading' && (
              <div className="py-12 flex flex-col items-center justify-center">
                <Loader2 className="w-10 h-10 text-amber-500 animate-spin mb-4" />
                <p className="text-white/60 text-sm animate-pulse">Procesando de forma segura...</p>
              </div>
            )}

            {step === 'success' && (
              <div className="py-8 text-center">
                <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-xl text-white mb-2">¡Cuenta Activada!</h3>
                <p className="text-white/60 text-sm mb-6">
                  Tus credenciales han sido guardadas. Preparando tu panel de embajador...
                </p>
              </div>
            )}

            {(step === 'verify' || (step === 'error' && errorMsg.includes('datos'))) && (
              <form onSubmit={handleVerify} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Correo Registrado</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-amber-500/50"
                      placeholder="tu@correo.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Documento de Identidad (Cédula)</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                    <input
                      required
                      value={cedula}
                      onChange={(e) => setCedula(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-amber-500/50"
                      placeholder="Ingresa tu cédula"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-medium transition-colors mt-4"
                >
                  Verificar Identidad
                </button>
              </form>
            )}

            {(step === 'setPassword' || (step === 'error' && !errorMsg.includes('datos'))) && (
              <form onSubmit={handleSetPassword} className="space-y-5">
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span className="text-emerald-400 font-medium">Identidad Confirmada</span>
                  </div>
                  <p className="text-white/60 text-sm">Crea una contraseña segura para tu portal.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Nueva Contraseña</label>
                  <div className="relative">
                    <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                    <input
                      required
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-amber-500/50"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Confirmar Contraseña</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                    <input
                      required
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-amber-500/50"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-white font-medium transition-all mt-4 shadow-lg shadow-amber-900/50"
                >
                  Activar y Entrar al Portal
                </button>
              </form>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}

export default function AffiliateVerifyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-stone-950 flex flex-col items-center justify-center p-4">
        <Loader2 className="w-12 h-12 text-amber-500 animate-spin" />
      </div>
    }>
      <VerifyFormContent />
    </Suspense>
  );
}
