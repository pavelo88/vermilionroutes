import fs from 'fs';
import path from 'path';

const uploadsDir = 'C:\\Users\\pablo\\Desktop\\clon-vermilion\\vermilionroutes.com\\wp-content\\uploads';
const publicTours169 = path.resolve('public/images/tours/16-9');
const publicTours916 = path.resolve('public/images/tours/9-16');

function getFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  fs.readdirSync(dir).forEach(file => {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) {
      results = results.concat(getFiles(full));
    } else if (/\.(jpg|jpeg|png)$/i.test(file) && !file.includes('-150x') && !file.includes('-300x') && !file.includes('-768x') && !file.includes('-1024x') && !file.includes('-1536x')) {
      results.push(full);
    }
  });
  return results;
}

const allUploads = getFiles(uploadsDir);
console.log(`Found ${allUploads.length} original full-size upload images.`);

let html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>All Authentic Photos Catalog</title>
  <style>
    body { font-family: sans-serif; background: #0f172a; color: white; padding: 20px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
    .card { background: #1e293b; border-radius: 8px; overflow: hidden; border: 1px solid #334155; }
    img { width: 100%; height: 180px; object-fit: cover; background: #000; }
    .name { padding: 10px; font-size: 12px; word-break: break-all; color: #38bdf8; font-weight: bold; }
    .size { padding: 0 10px 10px; font-size: 11px; color: #94a3b8; }
  </style>
</head>
<body>
  <h1>All Authentic Photos from WordPress & Public Directory</h1>
  <h2>WordPress Uploads:</h2>
  <div class="grid">
`;

// Copy uploads into a public temp folder so they can be viewed
const tempDir = path.resolve('public/temp_catalog');
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

allUploads.forEach(img => {
  const base = path.basename(img);
  fs.copyFileSync(img, path.join(tempDir, base));
  const stat = fs.statSync(img);
  html += `
    <div class="card">
      <img src="/temp_catalog/${base}" />
      <div class="name">${base}</div>
      <div class="size">${(stat.size / 1024).toFixed(1)} KB | Path: ${img.replace('C:\\Users\\pablo\\Desktop\\clon-vermilion\\', '')}</div>
    </div>
  `;
});

html += `
  </div>
</body>
</html>
`;

fs.writeFileSync('public/catalog.html', html);
console.log('Created public/catalog.html successfully!');
