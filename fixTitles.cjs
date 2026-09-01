const fs = require('fs');

const capitalize = (s) => {
  return s.toLowerCase().replace(/(^|\s|-|:)\w/g, c => c.toUpperCase());
};

const files = ['data/mock.ts', 'data/dailyToursData.ts'];

files.forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  c = c.replace(/title:\s*\{\s*en:\s*'([^']+)',\s*es:\s*'([^']+)'/g, (m, en, es) => {
    return `title: { 
      en: '${capitalize(en)}', 
      es: '${capitalize(es)}'`;
  });
  
  // also fix simple string titles if any
  c = c.replace(/title:\s*'([^']+)'/g, (m, title) => {
    return `title: '${capitalize(title)}'`;
  });

  fs.writeFileSync(f, c);
});

console.log("Titles capitalized successfully!");
