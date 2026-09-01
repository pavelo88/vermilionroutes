import React from 'react';
import Link from 'next/link';
import { verifyNewsletterToken } from '@/lib/email';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { CheckCircle, XCircle } from 'lucide-react';

export default async function VerifyNewsletterPage({
  searchParams,
  params
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{ locale: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const resolvedParams = await params;
  const token = typeof resolvedSearchParams.token === 'string' ? resolvedSearchParams.token : undefined;
  const locale = resolvedParams.locale;

  let isSuccess = false;
  let message = '';
  let emailVerified = '';

  if (!token) {
    message = locale === 'es' ? 'Token inválido o faltante.' : 'Invalid or missing token.';
  } else {
    const decoded = verifyNewsletterToken(token);
    
    if (!decoded || !decoded.email) {
      message = locale === 'es' ? 'El enlace de verificación ha expirado o es inválido.' : 'The verification link has expired or is invalid.';
    } else {
      emailVerified = decoded.email;
      
      try {
        if (db) {
          const leadsRef = collection(db, 'clientes_destacados');
          const q = query(leadsRef, where('email', '==', decoded.email));
          const querySnapshot = await getDocs(q);
          
          if (!querySnapshot.empty) {
            // Update all matching docs (usually just one)
            const promises = querySnapshot.docs.map(docSnap => 
              updateDoc(docSnap.ref, { status: 'verificado' })
            );
            await Promise.all(promises);
            isSuccess = true;
            message = locale === 'es' 
              ? '¡Tu correo ha sido verificado con éxito! Ya eres parte del Club.' 
              : 'Your email has been successfully verified! You are now part of the Club.';
          } else {
            // User not found in DB but token was valid
            message = locale === 'es' ? 'No se encontró tu registro en el sistema.' : 'Registration not found in the system.';
          }
        } else {
          // No DB, simulate success for dev
          isSuccess = true;
          message = locale === 'es' 
              ? '¡Tu correo ha sido verificado con éxito! (Simulado en Desarrollo)' 
              : 'Your email has been successfully verified! (Dev Simulated)';
        }
      } catch (error) {
        console.error('Error updating Firebase:', error);
        message = locale === 'es' ? 'Hubo un problema al actualizar tu estado. Intenta más tarde.' : 'There was an issue updating your status. Try again later.';
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#07130C] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-zinc-900 rounded-3xl shadow-xl p-8 sm:p-10 text-center space-y-6">
        <div className="flex justify-center">
          {isSuccess ? (
            <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
            </div>
          ) : (
            <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
              <XCircle className="w-10 h-10 text-red-600 dark:text-red-400" />
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-bold font-serif text-zinc-900 dark:text-white">
            {isSuccess 
              ? (locale === 'es' ? '¡Bienvenido al Club!' : 'Welcome to the Club!') 
              : (locale === 'es' ? 'Error de Verificación' : 'Verification Error')}
          </h1>
          <p className="text-zinc-600 dark:text-zinc-300 text-sm">
            {message}
          </p>
          {emailVerified && isSuccess && (
            <p className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm mt-2">
              {emailVerified}
            </p>
          )}
        </div>

        <div className="pt-4">
          <Link 
            href={`/${locale}`}
            className="inline-block w-full px-6 py-3 bg-zinc-900 dark:bg-emerald-600 hover:bg-zinc-800 dark:hover:bg-emerald-500 text-white font-bold text-sm uppercase tracking-wider rounded-xl transition-all shadow-md"
          >
            {locale === 'es' ? 'Volver al Inicio' : 'Return Home'}
          </Link>
        </div>
      </div>
    </div>
  );
}
