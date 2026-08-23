import fs from 'fs';
import path from 'path';

function getCleanArticle(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  // Match content in Elementor sections
  const sections = content.match(/<div class="elementor-widget-container">([\s\S]*?)<\/div>/gi) || [];
  const valid = [];
  sections.forEach(s => {
    const text = s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    if (text.length > 60 && !text.includes('+(593)') && !text.includes('Rate us') && !text.includes('Tripadvisor') && !text.includes('SUBSCRIBE')) {
      valid.push(text);
    }
  });
  return valid;
}

['index.html@p=77499.html', 'index.html@p=77501.html', 'index.html@p=77497.html', 'index.html@p=880.html'].forEach(f => {
  console.log(`\n================== ${f} ==================`);
  const lines = getCleanArticle('C:\\Users\\pablo\\Desktop\\clon-vermilion\\vermilionroutes.com\\' + f);
  lines.forEach(l => console.log('- ' + l));
});
