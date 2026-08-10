import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';
import * as dotenv from 'dotenv';
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const TARGET_LANGS = ['it', 'pt', 'ja', 'de', 'fr', 'es', 'zh'];
const MESSAGES_DIR = path.join(process.cwd(), 'messages');

async function translateLocales() {
  const enJsonStr = fs.readFileSync(path.join(MESSAGES_DIR, 'en.json'), 'utf-8');
  
  for (const lang of TARGET_LANGS) {
    const targetFile = path.join(MESSAGES_DIR, `${lang}.json`);
    let needsTranslation = true;
    if (fs.existsSync(targetFile)) {
      console.log(`Skipping ${lang} because it already exists.`);
      needsTranslation = false;
    }
    
    if (needsTranslation) {
      console.log(`Translating locales to ${lang} using Gemini...`);
      const prompt = `You are an expert translator. Translate the following JSON file into the ${lang} language code. Maintain the exact JSON structure, keys, and formatting. Return ONLY valid JSON, no markdown blocks.

JSON:
${enJsonStr}
`;
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      let result = response.text || '{}';
      result = result.replace(/^```json/g, '').replace(/```$/g, '').trim();
      fs.writeFileSync(targetFile, result);
      console.log(`Successfully generated ${lang}.json`);
    }
  }
}

async function run() {
  try {
    await translateLocales();
    console.log('Locale translations complete!');
  } catch (error) {
    console.error(error);
  }
}

run();
