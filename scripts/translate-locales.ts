import fs from 'fs';
import path from 'path';
import translate from 'google-translate-api-x';

const TARGET_LANGS = ['es', 'fr', 'de', 'it', 'pt', 'ja', 'zh-CN'];
const MESSAGES_DIR = path.join(process.cwd(), 'messages');

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function translateObj(obj: any, lang: string): Promise<any> {
  if (typeof obj === 'string') {
    try {
      await sleep(1000);
      const res = await translate(obj, { to: lang });
      return res.text;
    } catch (e) {
      console.error(`Failed translating "${obj}" to ${lang}`, e);
      return obj; // fallback to english
    }
  } else if (typeof obj === 'object' && obj !== null) {
    const result: any = Array.isArray(obj) ? [] : {};
    for (const key of Object.keys(obj)) {
      result[key] = await translateObj(obj[key], lang);
    }
    return result;
  }
  return obj;
}

async function run() {
  const enJson = JSON.parse(fs.readFileSync(path.join(MESSAGES_DIR, 'en.json'), 'utf-8'));
  
  for (const lang of TARGET_LANGS) {
    const localeKey = lang === 'zh-CN' ? 'zh' : lang;
    console.log(`Translating locales to ${localeKey}...`);
    
    // Check if the file already exists and differs from en.json
    // If it's the exact same size as en.json, or it's missing, we translate it
    // Actually, let's just translate everything for fr, de, it, pt, ja. 
    // We can skip 'es' and 'zh' if they are already translated, but to be safe we'll translate all missing or identical files.
    const targetFile = path.join(MESSAGES_DIR, `${localeKey}.json`);
    
    let needsTranslation = true;
    if (fs.existsSync(targetFile)) {
      try {
        const existing = JSON.parse(fs.readFileSync(targetFile, 'utf-8'));
        if (existing.nav && existing.nav.home !== 'Home') {
          console.log(`Skipping ${localeKey} because it looks already translated.`);
          needsTranslation = false;
        }
      } catch (e) {
        // if parse fails, translate it
      }
    }
    
    if (needsTranslation) {
      const translated = await translateObj(enJson, lang);
      fs.writeFileSync(targetFile, JSON.stringify(translated, null, 2));
      console.log(`Successfully generated ${localeKey}.json`);
    }
  }
  
  console.log('All locales translated!');
}

run().catch(console.error);
