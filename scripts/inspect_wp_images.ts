import fs from 'fs';
import path from 'path';

const filesToInspect = [
  'gal1.jpg', 'gal2.jpg', 'gal3.jpg', 'gal4.jpg', 'gal5.jpg', 'gal6.jpg',
  'galatoursopt-01.jpg', 'galatoursopt-02.jpg', 'galatoursopt-03.jpg', 'galatoursopt-04.jpg',
  'galatoursopt-05.jpg', 'galatoursopt-06.jpg', 'galatoursopt-07.jpg', 'galatoursopt-08.jpg',
  '16as-03.jpg', '16as-04.jpg', '16as-05.jpg', '16as-06.jpg',
  '16as-07-1.jpg', '16as-08.jpg', '16as-09-1.jpg', '16as-10-1.jpg', '16as-11-1.jpg',
  'nrew-01.jpg', 'nrew-02.jpg', 'nrew-03.jpg', 'nrew-04.jpg', 'nrew-05.jpg', 'nrew-06.jpg',
  'nrew-07.jpg', 'nrew-08.jpg', 'nrew-09.jpg', 'nrew-10.jpg', 'nrew-11.jpg', 'nrew-12.jpg',
  'ecu1.jpg', 'ecu2.jpg', 'ecu3.jpg', 'ecu5.jpg', 'ecu6.jpg',
  'bloggala1.jpg', 'blogquito1.jpg', 'blogvolcan1.jpg', 'blogvermi1.jpg',
  'SAN-CRISTOBAL-GALAPAGOS-2.jpg', 'plaza-san-francisco-casco-antiguo-quito-ecuador-1-2.jpg',
  'cuyabeno.jpg', 'ponchos.jpg', 'nv.jpg', 'lgk.jpg', 'quito1.jpg', 'quito2.jpg'
];

console.log('=== FINDING EXACT TITLES & CAPTIONS FOR EACH IMAGE IN WP ===');

const wpDir = 'C:\\Users\\pablo\\Desktop\\clon-vermilion\\vermilionroutes.com';
const allHtml = fs.readdirSync(wpDir).filter(f => f.endsWith('.html'));

filesToInspect.forEach(imgName => {
  let foundCaptions = new Set();
  allHtml.forEach(htmlFile => {
    const content = fs.readFileSync(path.join(wpDir, htmlFile), 'utf-8');
    if (content.includes(imgName)) {
      // Find elementor widget or heading near image
      const regex = new RegExp(`([^<]*?${imgName}[^>]*?>[\\s\\S]{0,300})`, 'gi');
      let m;
      while ((m = regex.exec(content)) !== null) {
        const snippet = m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
        if (snippet.length > 5) foundCaptions.add(snippet.substring(0, 100));
      }
    }
  });
  console.log(`\n📷 ${imgName}:`);
  if (foundCaptions.size === 0) {
    console.log('   (No caption snippet found)');
  } else {
    foundCaptions.forEach(c => console.log(`   - "${c}"`));
  }
});
