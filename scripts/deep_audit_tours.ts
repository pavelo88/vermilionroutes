import { mockTours } from '../data/mock';
import { dailyTours } from '../data/dailyToursData';
import fs from 'fs';
import path from 'path';

console.log('=== TOURS ITINERARY & GALLERY AUDIT ===');
const allTours = [...mockTours, ...dailyTours];
const seen = new Set();

allTours.forEach(tour => {
  if (seen.has(tour.id)) return;
  seen.add(tour.id);

  console.log(`\n-------------------------------------------`);
  console.log(`Tour ID: ${tour.id}`);
  console.log(`Title ES: ${typeof tour.title === 'object' ? tour.title.es : tour.title}`);
  console.log(`Title EN: ${typeof tour.title === 'object' ? tour.title.en : tour.title}`);
  console.log(`Main Image: ${tour.imageUrl}`);
  console.log(`Gallery (${tour.gallery?.length || 0} items):`, tour.gallery);
  console.log(`Itinerary (${tour.itinerary?.length || 0} days):`);
  tour.itinerary?.forEach(day => {
    const dayTitle = typeof day.title === 'object' ? day.title.es : day.title;
    console.log(`   Day ${day.day}: ${dayTitle}`);
  });
});
