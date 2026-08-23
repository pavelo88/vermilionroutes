import fs from 'fs';
import path from 'path';

const wpDir = 'C:\\Users\\pablo\\Desktop\\clon-vermilion\\vermilionroutes.com';

function extractArticleBody(file) {
  const full = path.join(wpDir, file);
  const html = fs.readFileSync(full, 'utf-8');
  // Match content inside the main post wrapper
  const match = html.match(/<div class="entry-content[^"]*"[^>]*>([\s\S]*?)<\/div>/i) ||
                html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
  const content = match ? match[1] : html;
  return content
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<h[1-6][^>]*>/gi, '\n### ')
    .replace(/<\/h[1-6]>/gi, '\n')
    .replace(/<p[^>]*>/gi, '\n\n')
    .replace(/<\/p>/gi, '')
    .replace(/<li[^>]*>/gi, '\n* ')
    .replace(/<\/li>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#8211;/g, '-')
    .replace(/&#8217;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

console.log('=== ARTICLE 1: GALAPAGOS ===\n', extractArticleBody('index.html@p=77499.html'));
console.log('\n=== ARTICLE 2: QUITO ===\n', extractArticleBody('index.html@p=77501.html'));
console.log('\n=== ARTICLE 3: JUNGLE / AMAZON ===\n', extractArticleBody('index.html@p=77497.html'));
console.log('\n=== ARTICLE 4: VOLCANOES ===\n', extractArticleBody('index.html@p=880.html'));
