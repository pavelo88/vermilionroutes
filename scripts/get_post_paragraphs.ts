import fs from 'fs';
import path from 'path';

const html = fs.readFileSync('C:\\Users\\pablo\\Desktop\\clon-vermilion\\vermilionroutes.com\\index.html@p=77499.html', 'utf-8');
const pTags = html.match(/<p[^>]*>([\s\S]*?)<\/p>/gi) || [];
console.log('=== All Paragraphs in Galapagos Post ===');
pTags.forEach(p => {
  const clean = p.replace(/<[^>]+>/g, '').trim();
  if (clean.length > 30) console.log('\n- ' + clean);
});
