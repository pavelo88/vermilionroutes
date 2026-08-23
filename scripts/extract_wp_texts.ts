import fs from 'fs';
import path from 'path';

const wpDir = 'C:\\Users\\pablo\\Desktop\\clon-vermilion\\vermilionroutes.com';

function extractText(file) {
  const full = path.join(wpDir, file);
  if (!fs.existsSync(full)) return '';
  const html = fs.readFileSync(full, 'utf-8');
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#8211;/g, '-')
    .replace(/&#8217;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

console.log('=== EXTRACTING ORIGINAL WP BLOG & SITE CONTENT ===');
const posts = [
  'index.html@p=77497.html',
  'index.html@p=77499.html',
  'index.html@p=77501.html',
  'index.html@p=880.html',
  'index.html@p=77802.html',
  'index.html@p=78490.html',
  'index.html@p=78491.html',
  'index.html@p=78492.html',
  'index.html@p=78437.html',
  'index.html@p=78438.html',
  'index.html@p=78439.html',
  'about-us\\index.html',
  'ecuador\\index.html',
  'galapagos\\index.html'
];

posts.forEach(p => {
  const txt = extractText(p);
  console.log(`\n================ ${p} (${txt.length} chars) ================`);
  console.log(txt.substring(0, 400) + '...');
});
