import fs from 'fs';

const html = fs.readFileSync('C:\\Users\\pablo\\Desktop\\clon-vermilion\\vermilionroutes.com\\galapagos\\index.html', 'utf-8');

const regex = /<img[^>]+src=["']([^"']+)["'][^>]*>([\s\S]{0,300})/gi;
let m;
while ((m = regex.exec(html)) !== null) {
  const src = m[1];
  const snippet = m[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  if (src.includes('wp-content/uploads') && !src.includes('logo') && !src.includes('bank')) {
    console.log(`SRC: ${src} => Text: "${snippet.substring(0, 100)}"`);
  }
}
