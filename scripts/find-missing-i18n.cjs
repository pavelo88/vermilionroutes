const fs = require('fs');
const path = require('path');

const messagesDir = path.join(__dirname, '../messages');
const enPath = path.join(messagesDir, 'en.json');

const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

const getKeys = (obj, prefix = '') => {
  let keys = [];
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      keys = keys.concat(getKeys(obj[key], `${prefix}${key}.`));
    } else {
      keys.push(`${prefix}${key}`);
    }
  }
  return keys;
};

const enKeys = getKeys(enData);
const locales = fs.readdirSync(messagesDir).filter(f => f.endsWith('.json') && f !== 'en.json');

console.log(`Found ${enKeys.length} keys in en.json`);

const missing = {};

locales.forEach(file => {
  const filePath = path.join(messagesDir, file);
  const localeData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const localeKeys = getKeys(localeData);
  
  const localeMissing = enKeys.filter(k => !localeKeys.includes(k));
  if (localeMissing.length > 0) {
    missing[file] = localeMissing;
  }
});

console.log(JSON.stringify(missing, null, 2));
