import fs from 'fs';
import path from 'path';
import { mockTours } from '../data/mock';
import { dailyTours } from '../data/dailyToursData';

console.log('=== AUDITING ALL TOURS ===');

function checkTour(tour: any, type: string) {
  const issues: string[] = [];
  const mainImg = path.join(process.cwd(), 'public', (tour.imageUrl || '').replace(/^\//, ''));
  if (!tour.imageUrl) issues.push('Missing imageUrl');
  else if (!fs.existsSync(mainImg)) issues.push(`Missing file: ${tour.imageUrl}`);

  if (tour.gallery && tour.gallery.length > 0) {
    tour.gallery.forEach((g: string, i: number) => {
      const gPath = path.join(process.cwd(), 'public', (g || '').replace(/^\//, ''));
      if (!fs.existsSync(gPath)) issues.push(`Gallery[${i}] missing file: ${g}`);
    });
  } else {
    issues.push('Empty or missing gallery');
  }

  if (!tour.itinerary || tour.itinerary.length === 0) {
    issues.push('Empty or missing itinerary');
  }

  const title = typeof tour.title === 'object' ? tour.title.en || tour.title.es : tour.title;
  console.log(`\n[${type}] ${tour.id} - "${title}" | img: ${tour.imageUrl}`);
  if (issues.length > 0) {
    issues.forEach(iss => console.log(`   ❌ ${iss}`));
  } else {
    console.log(`   ✅ OK (gallery: ${tour.gallery?.length || 0} images, itinerary: ${tour.itinerary?.length || 0} days)`);
  }
}

console.log('\n--- All mockTours in mock.ts ---');
mockTours.forEach(t => checkTour(t, 'Tour'));

console.log('\n--- All dailyTours in dailyToursData.ts ---');
dailyTours.forEach(t => checkTour(t, 'DailyTour'));
