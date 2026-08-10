const fs = require('fs');
const path = require('path');

const messagesDir = path.join(__dirname, '../messages');
const enPath = path.join(messagesDir, 'en.json');
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

function syncObjects(target, source) {
  let changed = false;
  for (const key in source) {
    if (typeof source[key] === 'object' && source[key] !== null) {
      if (!target[key] || typeof target[key] !== 'object') {
        target[key] = {};
        changed = true;
      }
      if (syncObjects(target[key], source[key])) {
        changed = true;
      }
    } else {
      if (target[key] === undefined) {
        // Here we could translate, but for now we just inject the English string with a marker,
        // or just the string itself since it's just a fallback.
        target[key] = source[key]; 
        changed = true;
      }
    }
  }
  return changed;
}

const locales = fs.readdirSync(messagesDir).filter(f => f.endsWith('.json') && f !== 'en.json');

let totalFixed = 0;

locales.forEach(file => {
  const filePath = path.join(messagesDir, file);
  const localeData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  if (syncObjects(localeData, enData)) {
    fs.writeFileSync(filePath, JSON.stringify(localeData, null, 2) + '\n', 'utf8');
    console.log(`✅ Synced missing keys for: ${file}`);
    totalFixed++;
  } else {
    console.log(`✅ No missing keys for: ${file}`);
  }
});

console.log(`\n🎉 i18n Healing Complete. Repaired ${totalFixed} files.`);
