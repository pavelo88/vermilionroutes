import { Metadata } from 'next';
import { Suspense } from 'react';
import { BookingWizard } from '@/components/booking/BookingWizard';

export const metadata: Metadata = {
  title: 'Reservar Expedición | Vermilion Routes',
  description: 'Reserva tu expedición de lujo a Galápagos, Ecuador y Perú con Vermilion Routes.',
};

export default function BookingPage() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-24">
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Cargando reservas...</div>}>
        <BookingWizard />
      </Suspense>
    </main>
  );
}
