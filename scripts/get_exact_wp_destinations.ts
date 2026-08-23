import fs from 'fs';

const html = fs.readFileSync('C:\\Users\\pablo\\Desktop\\clon-vermilion\\vermilionroutes.com\\ecuador\\index.html', 'utf-8');

// Match each widget-container with image and text
const matches = html.match(/<div class="elementor-widget-container">[\s\S]*?<\/div>/gi) || [];

matches.forEach(m => {
  if (m.includes('wp-content/uploads') && (m.includes('QUITO') || m.includes('COTOPAXI') || m.includes('QUILOTOA') || m.includes('BAÑOS') || m.includes('CHIMBORAZO') || m.includes('CUENCA') || m.includes('MINDO') || m.includes('OTAVALO') || m.includes('YASUNI') || m.includes('CUYABENO') || m.includes('GALÁPAGOS') || m.includes('GUAYAQUIL'))) {
    const img = m.match(/src=["']([^"']+\.jpg)["']/)?.[1] || '';
    const text = m.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    console.log(`DESTINATION: "${text}" => IMAGE: ${img}`);
  }
});
