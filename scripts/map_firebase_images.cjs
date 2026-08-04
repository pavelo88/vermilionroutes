const fs = require('fs');
const tours = JSON.parse(fs.readFileSync('data/parsed_tours.json', 'utf8'));

const files = [
'tours/andean-world-hero.jpg',
'tours/andes-jungle-galapagos-hero.jpg',
'tours/cusco-inca-trail-hero.jpg',
'tours/ecuador-volcanoes-rivers-hero.jpg',
'tours/enchanted-islands-hero.jpg',
'tours/fantastic-ecuador-hero.jpg',
'tours/full-galapagos-3-islands-hero.jpg',
'tours/galapagos-economic-hero.jpg',
'tours/galapagos-santa-cruz-isabela-premium-hero.jpg',
'tours/galapagos-santa-cruz-premium-hero.jpg',
'tours/misterios-del-peru-hero.jpg',
'tours/peru-el-cusco-hero.jpg',
'tours/peru-essential-hero.jpg',
'tours/quito-galapagos-cusco-machu-picchu-hero.jpg',
'tours/snow-waterfalls-galapagos-hero.jpg'
];

const bucket = 'studio-8636221254-47ba9.firebasestorage.app';
const getUrl = (path) => `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(path)}?alt=media`;

for (const tour of tours) {
  const words = tour.id.split('-');
  let bestMatch = files[0];
  let maxScore = 0;
  for (const f of files) {
    let score = 0;
    for(const w of words) {
      if(w.length > 2 && f.includes(w)) score++;
    }
    if (score > maxScore) {
      maxScore = score;
      bestMatch = f;
    }
  }
  
  if (maxScore > 0) {
    tour.imageUrl = getUrl(bestMatch);
    console.log('Matched', tour.id, 'to', bestMatch);
  } else {
    tour.imageUrl = getUrl(files[0]); // fallback
  }
}

fs.writeFileSync('data/parsed_tours.json', JSON.stringify(tours, null, 2));

try {
  let mockTs = fs.readFileSync('lib/mock.ts', 'utf8');
  const newMockTs = `import { Tour } from '@/types/tour';

export const mockTours: Tour[] = ${JSON.stringify(tours, null, 2)};`;
  fs.writeFileSync('lib/mock.ts', newMockTs);
} catch (e) {
  console.log('No mock.ts found to update');
}

console.log('Updated parsed_tours.json and mock.ts');
