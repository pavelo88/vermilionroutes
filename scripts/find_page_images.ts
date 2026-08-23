import fs from 'fs';
import path from 'path';

const wpDir = 'C:\\Users\\pablo\\Desktop\\clon-vermilion\\vermilionroutes.com';

const tourPages = [
  { name: '78490 (Snow and Waterfalls)', file: 'index.html@p=78490.html' },
  { name: '78491 (Andes and Jungle)', file: 'index.html@p=78491.html' },
  { name: '78492 (Volcanoes and Rivers)', file: 'index.html@p=78492.html' },
  { name: '77802 (Fantastic Ecuador)', file: 'index.html@p=77802.html' },
  { name: '78437 (Galapagos Economic)', file: 'index.html@p=78437.html' },
  { name: '78438 (Full Galapagos)', file: 'index.html@p=78438.html' },
  { name: '78439 (Enchanted Islands)', file: 'index.html@p=78439.html' },
  { name: '77497 (Blog Jungle)', file: 'index.html@p=77497.html' },
  { name: '77499 (Blog Galapagos)', file: 'index.html@p=77499.html' },
  { name: '77501 (Blog Quito)', file: 'index.html@p=77501.html' },
  { name: '880 (Blog Volcanoes)', file: 'index.html@p=880.html' },
  { name: 'Ecuador Home', file: 'ecuador\\index.html' },
  { name: 'Galapagos Home', file: 'galapagos\\index.html' }
];

tourPages.forEach(p => {
  const full = path.join(wpDir, p.file);
  if (fs.existsSync(full)) {
    const html = fs.readFileSync(full, 'utf-8');
    console.log(`\n================== ${p.name} ==================`);
    const imgs = html.match(/wp-content\/uploads\/[^\s"'>]+\.(?:jpg|jpeg|png)/gi) || [];
    const unique = [...new Set(imgs.map(i => path.basename(i)))].filter(i => !i.includes('-150x') && !i.includes('-300x') && !i.includes('-768x') && !i.includes('-1024x') && !i.includes('logo') && !i.includes('bank') && !i.includes('redbird'));
    console.log('Images used:', unique);
  }
});
