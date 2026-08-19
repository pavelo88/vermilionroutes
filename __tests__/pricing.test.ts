import { describe, it, expect } from 'vitest';
import { mockTours } from '@/data/mock';

describe('Pricing & Tour Itinerary Consistency', () => {
  it('should have all 7 official daily tours with exact required prices', () => {
    const quito = mockTours.find((t) => t.id === 'quito-city-middle-of-the-world');
    const otavalo = mockTours.find((t) => t.id === 'otavalo-indigenous-market');
    const papallacta = mockTours.find((t) => t.id === 'papallacta-hot-springs');
    const mindo = mockTours.find((t) => t.id === 'mindo-cloud-forest');
    const antisana = mockTours.find((t) => t.id === 'antisana-national-park');
    const cotopaxi = mockTours.find((t) => t.id === 'cotopaxi-national-park');
    const quilotoa = mockTours.find((t) => t.id === 'quilotoa-crater-lake');

    expect(quito).toBeDefined();
    expect(quito?.price).toBe(89);

    expect(otavalo).toBeDefined();
    expect(otavalo?.price).toBe(92);

    expect(papallacta).toBeDefined();
    expect(papallacta?.price).toBe(108);

    expect(mindo).toBeDefined();
    expect(mindo?.price).toBe(117);

    expect(antisana).toBeDefined();
    expect(antisana?.price).toBe(96);

    expect(cotopaxi).toBeDefined();
    expect(cotopaxi?.price).toBe(96);

    expect(quilotoa).toBeDefined();
    expect(quilotoa?.price).toBe(97);
  });

  it('should have valid 1-day duration and itineraries for all daily tours', () => {
    const dailyTourIds = [
      'quito-city-middle-of-the-world',
      'otavalo-indigenous-market',
      'papallacta-hot-springs',
      'mindo-cloud-forest',
      'antisana-national-park',
      'cotopaxi-national-park',
      'quilotoa-crater-lake'
    ];

    dailyTourIds.forEach((id) => {
      const tour = mockTours.find((t) => t.id === id);
      expect(tour).toBeDefined();
      expect(tour?.durationDays).toBe(1);
      expect(tour?.itinerary?.length).toBe(1);
      expect(tour?.itinerary?.[0].title).toBeDefined();
      expect(tour?.itinerary?.[0].description).toBeDefined();
    });
  });
});
