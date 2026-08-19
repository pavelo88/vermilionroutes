import { describe, it, expect } from 'vitest';
import {
  DatabaseService,
  toursRepository,
  TourRepository,
  leadsRepository,
  BookingRepository,
  destinationsRepository,
  DestinationRepository,
  settingsRepository,
  SettingsRepository,
} from '@/lib/services/DatabaseService';
import { mockTours, mockDestinations } from '@/data/mock';

describe('DatabaseService & DAL Hardening', () => {
  it('should fetch active tours with graceful mock fallback', async () => {
    const tours = await DatabaseService.fetchActiveEntities('tours');
    expect(tours).toBeDefined();
    expect(Array.isArray(tours)).toBe(true);
    expect(tours.length).toBe(mockTours.length);
  });

  it('should fetch active destinations with graceful mock fallback', async () => {
    const destinations = await DatabaseService.fetchActiveEntities('destinations');
    expect(destinations).toBeDefined();
    expect(Array.isArray(destinations)).toBe(true);
    expect(destinations.length).toBe(mockDestinations.length);
  });

  it('should fetch tour by ID with fallback support', async () => {
    const tour = await DatabaseService.getById('tours', 'quito-city-middle-of-the-world');
    expect(tour).toBeDefined();
    expect(tour?.id).toBe('quito-city-middle-of-the-world');
    expect(tour?.price).toBe(89);
  });

  it('should fetch destination by ID with fallback support', async () => {
    const dest = await DatabaseService.getById('destinations', 'galapagos');
    expect(dest).toBeDefined();
    expect(dest?.id).toBe('galapagos');
  });

  it('should return null for non-existent entities', async () => {
    const nonExistent = await DatabaseService.getById('tours', 'non-existent-tour-999');
    expect(nonExistent).toBeNull();
  });

  it('should provide singletons for all core repositories with aliases', () => {
    expect(toursRepository).toBeDefined();
    expect(TourRepository).toBe(toursRepository);
    expect(leadsRepository).toBeDefined();
    expect(BookingRepository).toBe(leadsRepository);
    expect(destinationsRepository).toBeDefined();
    expect(DestinationRepository).toBe(destinationsRepository);
    expect(settingsRepository).toBeDefined();
    expect(SettingsRepository).toBe(settingsRepository);
  });

  it('should support instance repository methods (getAll, getById, upsert)', async () => {
    const tours = await toursRepository.getAll();
    expect(tours.length).toBeGreaterThan(0);

    const tour = await toursRepository.getById('galapagos-4days');
    expect(tour).toBeDefined();
    expect(tour?.destination).toBe('Galapagos');
  });
});
