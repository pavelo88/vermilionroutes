export {};
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/parsed_tours.json');
const tours = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

const galapagosImgs = [
  "https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Ffull-galapagos-3-islands-hero.jpg?alt=media",
  "https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Fgalapagos-santa-cruz-isabela-premium-hero.jpg?alt=media",
  "https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Fsnow-waterfalls-galapagos-hero.jpg?alt=media"
];

const ecuadorImgs = [
  "https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Ffantastic-ecuador-hero.jpg?alt=media",
  "https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Fecuador-volcanoes-rivers-hero.jpg?alt=media",
  "https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Fandes-jungle-galapagos-hero.jpg?alt=media"
];

const peruImgs = [
  "https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Fcusco-inca-trail-hero.jpg?alt=media",
  "https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Fmisterios-del-peru-hero.jpg?alt=media",
  "https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Fperu-essential-hero.jpg?alt=media",
  "https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Fandean-world-hero.jpg?alt=media",
  "https://firebasestorage.googleapis.com/v0/b/studio-8636221254-47ba9.firebasestorage.app/o/tours%2Fquito-galapagos-cusco-machu-picchu-hero.jpg?alt=media"
];

tours.forEach(tour => {
  let dest = tour.destination.toLowerCase();
  let gallery = [tour.imageUrl];

  if (dest.includes('galapagos')) {
    gallery.push(...galapagosImgs.filter(img => img !== tour.imageUrl));
  }
  if (dest.includes('ecuador')) {
    gallery.push(...ecuadorImgs.filter(img => img !== tour.imageUrl && !gallery.includes(img)));
  }
  if (dest.includes('peru')) {
    gallery.push(...peruImgs.filter(img => img !== tour.imageUrl && !gallery.includes(img)));
  }

  const head = gallery[0];
  const tail = gallery.slice(1).sort(() => Math.random() - 0.5).slice(0, 4);
  
  tour.gallery = [head, ...tail];
});

fs.writeFileSync(dataPath, JSON.stringify(tours, null, 2));
console.log('Tours updated with full galleries successfully.');

