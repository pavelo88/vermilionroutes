import fs from 'fs';
import path from 'path';
import { translate } from '@vitalets/google-translate-api';

const locales = ['zh', 'it', 'pt', 'ja', 'fr', 'de'];
const enPath = path.join(process.cwd(), 'messages', 'en.json');
const enData = JSON.parse(fs.readFileSync(enPath, 'utf-8'));

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function translateString(text: string, targetLang: string, retries = 3): Promise<string> {
  const to = targetLang === 'zh' ? 'zh-CN' : targetLang;
  try {
    const res = await translate(text, { to });
    return res.text;
  } catch (err: any) {
    if (retries > 0) {
      console.log(`Rate limited on "${text.substring(0, 10)}...". Waiting 5s and retrying...`);
      await delay(5000);
      return translateString(text, targetLang, retries - 1);
    }
    console.error(`Failed to translate "${text}" to ${targetLang}`, err.message);
    return text;
  }
}

async function translateObject(obj: any, targetLang: string): Promise<any> {
  const result: any = {};
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      result[key] = await translateObject(obj[key], targetLang);
    } else if (typeof obj[key] === 'string') {
      result[key] = await translateString(obj[key], targetLang);
      await delay(1500); // 1.5s delay to avoid rate limits
    } else {
      result[key] = obj[key];
    }
  }
  return result;
}

async function main() {
  for (const locale of locales) {
    console.log(`Translating to ${locale}...`);
    const translated = await translateObject(enData, locale);
    const outPath = path.join(process.cwd(), 'messages', `${locale}.json`);
    fs.writeFileSync(outPath, JSON.stringify(translated, null, 2));
    console.log(`Finished ${locale}`);
    await delay(3000);
  }
}

main().catch(console.error);
