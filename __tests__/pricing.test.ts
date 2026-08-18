import { describe, it, expect } from 'vitest';
import { mockTours } from '@/data/mock';

describe('Pricing & Tour Itinerary Consistency', () => {
  it('should have correct official daily tour base price of $89', () => {
    const dailyTours = mockTours.find((t) => t.id === 'ecuador-daily-tours');
    expect(dailyTours).toBeDefined();
    expect(dailyTours?.price).toBe(89);
    expect(dailyTours?.price3Star).toBe(89);
    expect(dailyTours?.price4Star).toBe(117);
  });

  it('should have all 7 specific Day Tour pricing points in highlights', () => {
    const dailyTours = mockTours.find((t) => t.id === 'ecuador-daily-tours');
    expect(dailyTours).toBeDefined();

    const highlights = (dailyTours?.highlights || []).map((h: any) =>
      typeof h === 'string' ? h : h?.es || h?.en || ''
    );
    expect(highlights.length).toBeGreaterThanOrEqual(7);
    expect(highlights[0]).toContain('$89'); // City Tour
    expect(highlights[1]).toContain('$92'); // Otavalo
    expect(highlights[2]).toContain('$108'); // Papallacta
    expect(highlights[3]).toContain('$117'); // Mindo
    expect(highlights[4]).toContain('$96'); // Antisana
    expect(highlights[5]).toContain('$96'); // Cotopaxi
    expect(highlights[6]).toContain('$97'); // Quilotoa
  });

  it('should contain valid itinerary entries with day numbers for daily tours', () => {
    const dailyTours = mockTours.find((t) => t.id === 'ecuador-daily-tours');
    expect(dailyTours?.itinerary?.length).toBe(7);

    dailyTours?.itinerary?.forEach((item, index) => {
      expect(item.day).toBe(index + 1);
      expect(item.title).toBeDefined();
      expect(item.description).toBeDefined();
    });
  });
});
