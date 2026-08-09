export {};
const fs = require('fs');

if (!fs.existsSync('public/images/tours')) {
  fs.mkdirSync('public/images/tours', { recursive: true });
}

const tours = JSON.parse(fs.readFileSync('data/parsed_tours.json', 'utf8'));
const files = fs.readdirSync('public/wp-content/uploads/2023/09').filter(f => f.endsWith('.jpg') && !f.includes('-300x') && !f.includes('-768x') && !f.includes('1024x') && !f.includes('manager'));

// Shuffle files for variety
const shuffledFiles = files.sort(() => 0.5 - Math.random());

let i = 0;
for (const tour of tours) {
  const img = shuffledFiles[i % shuffledFiles.length];
  fs.copyFileSync('public/wp-content/uploads/2023/09/' + img, 'public/images/tours/' + tour.id + '.jpg');
  tour.imageUrl = '/images/tours/' + tour.id + '.jpg';
  i++;
}

fs.writeFileSync('data/parsed_tours.json', JSON.stringify(tours, null, 2));
console.log('Images assigned successfully to parsed_tours.json!');

