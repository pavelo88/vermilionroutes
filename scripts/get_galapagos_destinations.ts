import fs from 'fs';

const html = fs.readFileSync('C:\\Users\\pablo\\Desktop\\clon-vermilion\\vermilionroutes.com\\galapagos\\index.html', 'utf-8');

const matches = html.match(/<div class="elementor-widget-container">[\s\S]*?<\/div>/gi) || [];

matches.forEach(m => {
  if (m.includes('wp-content/uploads')) {
    const img = m.match(/src=["']([^"']+\.jpg)["']/)?.[1] || '';
    const text = m.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    if (img && text.length > 2 && text.length < 80) {
      console.log(`GALAPAGOS ITEM: "${text}" => IMAGE: ${img}`);
    }
  }
});
