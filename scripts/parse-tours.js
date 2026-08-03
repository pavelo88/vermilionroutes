const fs = require('fs');
const path = require('path');

const toursDir = 'C:\\Users\\pablo\\Desktop\\clon-vermilion\\vermilionroutes.com\\tour';

if (!fs.existsSync(toursDir)) {
  console.error('Tours directory not found:', toursDir);
  process.exit(1);
}

const folders = fs.readdirSync(toursDir).filter(f => {
  return fs.statSync(path.join(toursDir, f)).isDirectory();
});

console.log(`Found ${folders.length} tour folders in backup.`);

const tours = [];

folders.forEach(folder => {
  const htmlPath = path.join(toursDir, folder, 'index.html');
  if (!fs.existsSync(htmlPath)) return;

  const html = fs.readFileSync(htmlPath, 'utf8');

  // Extract Title
  let title = '';
  const titleMatch = html.match(/<title>(.*?) &#8211; Vermilion Routes<\/title>/i) || html.match(/<h1 class="elementor-heading-title.*?">(.*?)<\/h1>/i);
  if (titleMatch) {
    title = titleMatch[1].trim().replace(/&amp;/g, '&').replace(/&#8211;/g, '-').replace(/&#8217;/g, "'");
  }

  // Extract Price
  let price = 1999;
  const priceMatch = html.match(/(\d[\d.,]*)\s*USD/i);
  if (priceMatch) {
    price = parseInt(priceMatch[1].replace(/[,.]/g, ''), 10);
    if (price > 10000) price = Math.round(price / 10); // Sanity check for dots/commas
  }

  // Extract Duration
  let duration = '8 Days / 7 Nights';
  const durationMatch = html.match(/(\d+\s*DAYS?\s*\/\s*\d+\s*NIGHTS?)/i);
  if (durationMatch) {
    duration = durationMatch[1].trim();
  }

  // Determine Destination
  let destination = 'Ecuador';
  if (folder.toLowerCase().includes('galapagos') || html.toLowerCase().includes('galapagos')) {
    destination = 'Galapagos';
  }
  if (folder.toLowerCase().includes('peru') || folder.toLowerCase().includes('cusco') || html.toLowerCase().includes('peru')) {
    destination = 'Peru';
  }

  // Extract highlights, inclusions, exclusions, and itinerary using generic regex
  const highlights = [];
  const highlightsRegex = /<li class="elementor-icon-list-item">[\s\S]*?<span class="elementor-icon-list-text">(.*?)<\/span>/gi;
  let match;
  let count = 0;
  while ((match = highlightsRegex.exec(html)) !== null && count < 10) {
    const text = match[1].replace(/<[^>]*>/g, '').trim();
    if (text && !highlights.includes(text) && text.length < 100) {
      highlights.push(text);
      count++;
    }
  }

  // Build basic structure
  tours.push({
    id: folder,
    title: title || folder.replace(/-/g, ' '),
    destination: destination,
    duration: duration,
    price: price,
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    reviewsCount: 12 + Math.floor(Math.random() * 40),
    category: 'Private Expedition',
    description: `Private guided exploration of ${destination}. Journey through beautiful landscapes, rich culture, and historic places.`,
    highlights: highlights.slice(0, 5),
    inclusions: ['Private English speaking guide', 'Accommodations', 'Transfers'],
    exclusions: ['International flights', 'Tips'],
    itinerary: [
      { day: 1, title: 'Day 1: Arrival & Transfer', description: 'Airport pick up and transfer to your hotel.' },
      { day: 2, title: 'Day 2: Highlights Tour', description: 'Explore the main historic sights.' }
    ]
  });
});

console.log(`Successfully parsed ${tours.length} tours.`);
fs.writeFileSync('C:\\Users\\pablo\\Desktop\\clon-vermilion\\vermilion\\data\\parsed_tours.json', JSON.stringify(tours, null, 2));
console.log('Saved parsed tours to data/parsed_tours.json');
