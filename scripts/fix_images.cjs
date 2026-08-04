const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('site/index.html', 'utf8');
const $ = cheerio.load(html);
const tours = JSON.parse(fs.readFileSync('data/parsed_tours.json', 'utf8'));

$('.tours-box').each((i, el) => {
  const title = $(el).find('h3 a').text().trim().toUpperCase();
  // Find background image in the style attribute of .tours-image
  const imgDiv = $(el).find('.tours-image');
  let bgImg = '';
  if (imgDiv.length > 0) {
    const style = imgDiv.attr('style') || '';
    const match = style.match(/url\(['"]?(.*?)['"]?\)/);
    if (match) bgImg = match[1];
  }
  
  if (bgImg) {
    const tour = tours.find(t => t.title.includes(title) || title.includes(t.title));
    if (tour) {
      tour.imageUrl = bgImg.startsWith('/') ? bgImg : '/' + bgImg;
      console.log('Matched', title, '->', tour.imageUrl);
    }
  }
});

fs.writeFileSync('data/parsed_tours.json', JSON.stringify(tours, null, 2));
