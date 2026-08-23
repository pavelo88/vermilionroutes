import fs from 'fs';
import path from 'path';

const tempDir = path.resolve('public/temp_catalog');
const photos = [
  'banner-01.jpg', 'banner-02.jpg', 'banner-03.jpg', 'banner-04.jpg', 'banner-05.jpg',
  'banner-06.jpg', 'banner-08.jpg', 'banner-09.jpg', 'banner-10.jpg', 'banner_aboutus-2.jpg',
  'imgbanner-01.jpg', 'imgbanner-02.jpg', 'imgbanner-03.jpg', 'imgbanner-04.jpg',
  'imgbanner-05.jpg', 'imgbanner-06.jpg', 'imgbanner-07.jpg', 'imgbanner-08.jpg',
  'nrew-01.jpg', 'nrew-02.jpg', 'nrew-03.jpg', 'nrew-04.jpg', 'nrew-05.jpg', 'nrew-06.jpg',
  'nrew-07.jpg', 'nrew-08.jpg', 'nrew-09.jpg', 'nrew-10.jpg', 'nrew-11.jpg', 'nrew-12.jpg',
  'gal1.jpg', 'gal2.jpg', 'gal3.jpg', 'gal4.jpg', 'gal5.jpg', 'gal6.jpg', 'gal7.jpg', 'gal8.jpg',
  'galatoursopt-01.jpg', 'galatoursopt-03.jpg', 'galatoursopt-05.jpg', 'galatoursopt-07.jpg',
  '16as-01-2.jpg', '16as-02.jpg', '16as-03.jpg', '16as-04.jpg', '16as-05.jpg', '16as-06.jpg',
  '16as-07-1.jpg', '16as-08.jpg', '16as-09-1.jpg', '16as-10-1.jpg', '16as-11-1.jpg',
  'bloggala1.jpg', 'blogquito1.jpg', 'blogvermi1.jpg', 'blogvolcan1.jpg',
  'plaza-san-francisco-casco-antiguo-quito-ecuador-1-2.jpg', 'SAN-CRISTOBAL-GALAPAGOS-2.jpg',
  'piquero-1.jpg', '20170406_104637-2.jpg', '20170406_104916-2.jpg'
];

let html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Real WP Images Visual Inspector</title>
  <style>
    body { font-family: sans-serif; background: #0f172a; color: white; padding: 20px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
    .card { background: #1e293b; border-radius: 8px; overflow: hidden; border: 1px solid #334155; }
    img { width: 100%; height: 200px; object-fit: cover; display: block; }
    .name { padding: 10px; font-size: 13px; font-weight: bold; color: #38bdf8; word-break: break-all; }
  </style>
</head>
<body>
  <h1>All Real Company Photos from WordPress</h1>
  <div class="grid">
`;

photos.forEach(p => {
  if (fs.existsSync(path.join(tempDir, p))) {
    html += `
      <div class="card">
        <img src="/temp_catalog/${p}" />
        <div class="name">${p}</div>
      </div>
    `;
  }
});

html += `
  </div>
</body>
</html>
`;

fs.writeFileSync('public/wp_inspector.html', html);
console.log('Created public/wp_inspector.html');
