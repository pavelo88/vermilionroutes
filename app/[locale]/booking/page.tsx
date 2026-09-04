import { Metadata } from 'next';
import { Suspense } from 'react';
import { BookingWizard } from '@/components/booking/BookingWizard';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === 'es';
  return {
    title: isEs
      ? 'Vermilion Routes | Reserva tu Expedición de Lujo a Medida'
      : 'Vermilion Routes | Book Your Bespoke Luxury Vacation',
    description: isEs
      ? 'Reserve su expedición de lujo a medida en Galápagos y Ecuador con Vermilion Routes. Asesoría de viaje personalizada 24/7 y cotizaciones exclusivas.'
      : 'Book your bespoke luxury expedition to the Galapagos Islands & Ecuador with Vermilion Routes. Dedicated 24/7 travel designers & custom quotes.',
    alternates: {
      canonical: `https://www.vermilionroutes.com/${locale}/booking`,
    },
  };
}

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
