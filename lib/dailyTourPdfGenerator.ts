import { Tour } from '@/types';
import { generateTourPDF } from './pdfGenerator';

/**
 * Unified delegation: Single-day tours use the master NatGeo luxury PDF generator.
 */
export async function generateDailyTourPDF(tour: Tour, locale: string = 'es'): Promise<void> {
  return generateTourPDF(tour, locale);
}
