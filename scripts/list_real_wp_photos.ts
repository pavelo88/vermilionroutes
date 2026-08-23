import fs from 'fs';
import path from 'path';

const tempDir = path.resolve('public/temp_catalog');
const files = fs.readdirSync(tempDir);

console.log(`Auditing ${files.length} real WordPress photos:`);

files.forEach(f => {
  const stat = fs.statSync(path.join(tempDir, f));
  if (stat.size > 50000) { // filter out tiny icons
    console.log(`- ${f} (${(stat.size / 1024).toFixed(1)} KB)`);
  }
});
