const fs = require('fs');
const tours = JSON.parse(fs.readFileSync('data/parsed_tours.json', 'utf8'));

// Fix destinations based on tour content
for (const tour of tours) {
  const title = tour.title.toLowerCase();
  const highlights = (tour.highlights || []).join(' ').toLowerCase();
  const combined = title + ' ' + highlights;
  
  // Galapagos tours
  if (combined.includes('galapagos') || combined.includes('galápagos') || combined.includes('enchanted islands') || combined.includes('santa cruz') || combined.includes('isabela') || combined.includes('san cristobal')) {
    if (combined.includes('cusco') || combined.includes('machu picchu') || combined.includes('quito')) {
      tour.destination = 'Ecuador & Galapagos';
    } else {
      tour.destination = 'Galapagos';
    }
  }
  // Ecuador tours
  else if (combined.includes('ecuador') || combined.includes('quito') || combined.includes('baños') || combined.includes('otavalo') || combined.includes('riobamba') || combined.includes('tena') || combined.includes('papallacta')) {
    tour.destination = 'Ecuador';
  }
  // Peru tours
  else if (combined.includes('peru') || combined.includes('perú') || combined.includes('cusco') || combined.includes('lima') || combined.includes('machu picchu') || combined.includes('paracas')) {
    tour.destination = 'Peru';
  }
  
  // Special multi-country tours
  if (title.includes('quito') && title.includes('cusco')) {
    tour.destination = 'Ecuador & Galapagos';
  }
  if (title.includes('andes') && title.includes('jungle') && title.includes('galapagos')) {
    tour.destination = 'Ecuador & Galapagos';
  }
  if (title.includes('snow') && title.includes('waterfalls') && title.includes('enchanted')) {
    tour.destination = 'Ecuador & Galapagos';
  }

  console.log(`${tour.id}: ${tour.destination}`);
}

fs.writeFileSync('data/parsed_tours.json', JSON.stringify(tours, null, 2));
console.log('\nDestinations fixed!');
