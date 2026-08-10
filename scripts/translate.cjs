const fs = require('fs');
const path = require('path');
const translate = require('google-translate-api-x');

const messagesDir = path.join(__dirname, '../messages');
const enPath = path.join(messagesDir, 'en.json');
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

async function translateObject(obj, targetLang) {
  const newObj = {};
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      newObj[key] = await translateObject(obj[key], targetLang);
    } else {
      try {
        const res = await translate(obj[key], { to: targetLang });
        newObj[key] = res.text;
        console.log(`Translated: ${obj[key]} -> ${res.text}`);
      } catch (e) {
        console.error(`Error translating: ${obj[key]}`, e);
        newObj[key] = obj[key];
      }
    }
  }
  return newObj;
}

async function run() {
  console.log('Translating zh.json...');
  const zhData = await translateObject(enData, 'zh-CN');
  fs.writeFileSync(path.join(messagesDir, 'zh.json'), JSON.stringify(zhData, null, 2));
  console.log('Done zh.json');
  
  // Also fix the experience.reviewsTitle in other files
  const fixes = {
    'fr.json': { lang: 'fr', text: 'Guest Stories & TripAdvisor Excellence' },
    'es.json': { lang: 'es', text: 'Guest Stories & TripAdvisor Excellence' },
    'de.json': { lang: 'de', text: 'Guest Stories & TripAdvisor Excellence' },
    'pt.json': { lang: 'pt', text: 'Guest Stories & TripAdvisor Excellence' },
    'ja.json': { lang: 'ja', text: 'Guest Stories & TripAdvisor Excellence' },
  };

  for (const file in fixes) {
    try {
      const p = path.join(messagesDir, file);
      const data = JSON.parse(fs.readFileSync(p, 'utf8'));
      if (data.experience && data.experience.reviewsTitle === 'Guest Stories & TripAdvisor Excellence') {
        const res = await translate(fixes[file].text, { to: fixes[file].lang });
        data.experience.reviewsTitle = res.text;
        fs.writeFileSync(p, JSON.stringify(data, null, 2));
        console.log(`Fixed ${file}: ${res.text}`);
      }
    } catch (e) {
      console.log(`Skipped ${file}`);
    }
  }
}

run();
