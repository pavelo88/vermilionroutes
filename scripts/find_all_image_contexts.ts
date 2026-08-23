import fs from 'fs';
import path from 'path';

const uploadDir = 'C:\\Users\\pablo\\Desktop\\clon-vermilion\\vermilionroutes.com\\wp-content\\uploads';

// Let's search all HTML files in vermilionroutes.com to see which text accompanied which image
const files = [];
function walk(dir) {
  fs.readdirSync(dir).forEach(f => {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) walk(full);
    else if (f.endsWith('.html')) files.push(full);
  });
}
walk('C:\\Users\\pablo\\Desktop\\clon-vermilion\\vermilionroutes.com');

console.log(`Found ${files.length} HTML files.`);

const imageMap = {};

files.forEach(htmlPath => {
  const content = fs.readFileSync(htmlPath, 'utf-8');
  const imgRegex = /<img[^>]+src=["']([^"']+\.(?:jpg|jpeg|png))["'][^>]*>/gi;
  let match;
  while ((match = imgRegex.exec(content)) !== null) {
    const imgName = path.basename(match[1].split('?')[0]);
    if (!imageMap[imgName]) imageMap[imgName] = new Set();
    // Get text before and after img
    const start = Math.max(0, match.index - 250);
    const end = Math.min(content.length, match.index + 250);
    const surrounding = content.substring(start, end).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    if (surrounding.length > 20) {
      imageMap[imgName].add(surrounding.substring(0, 140));
    }
  }
});

console.log('\n=== REAL WP IMAGES AND THEIR USAGE CONTEXT ===');
Object.keys(imageMap).sort().forEach(img => {
  if (!img.includes('logo') && !img.includes('bank') && !img.includes('redbird') && !img.includes('svg')) {
    console.log(`\n📷 ${img}:`);
    [...imageMap[img]].slice(0, 3).forEach(c => console.log(`   - "${c}"`));
  }
});
