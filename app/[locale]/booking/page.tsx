import { Metadata } from 'next';
import { Suspense } from 'react';
import { BookingWizard } from '@/components/booking/BookingWizard';

export const metadata: Metadata = {
  title: 'Reservar Expedición | Vermilion Routes',
  description: 'Reserva tu expedición de lujo a Galápagos, Ecuador y Perú con Vermilion Routes.',
};

export default function BookingPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] dark:bg-[#07130C] relative -mt-20 sm:-mt-24 md:-mt-28 lg:-mt-[120px] pt-[100px] sm:pt-[120px] lg:pt-[150px] transition-colors duration-300">
      <div className="absolute top-0 left-0 w-full h-[70vh] bg-gradient-to-b from-emerald-900/15 via-emerald-900/5 to-transparent -z-10 pointer-events-none" />
      <div className="pb-16 relative z-10">
        <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh] text-emerald-700 font-semibold animate-pulse">Iniciando cotizador premium...</div>}>
          <BookingWizard />
        </Suspense>
      </div>
    </main>
  );
}
