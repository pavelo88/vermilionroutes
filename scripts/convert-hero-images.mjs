/**
 * convert-hero-images.mjs
 * 
 * Converts the two large PNG hero images to WebP format using sharp.
 * WebP provides ~30-40% smaller file sizes at equivalent visual quality.
 * 
 * Usage: node scripts/convert-hero-images.mjs
 */

import sharp from 'sharp';
import { existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(__dirname, '../public/images/hero');

const IMAGES = [
  { input: 'hero_galapagos.png', output: 'hero_galapagos.webp' },
  { input: 'hero_machu_picchu.png', output: 'hero_machu_picchu.webp' },
];

async function convertImages() {
  let totalSaved = 0;

  for (const { input, output } of IMAGES) {
    const inputPath = resolve(publicDir, input);
    const outputPath = resolve(publicDir, output);

    if (!existsSync(inputPath)) {
      console.warn(`⚠ Skipping ${input} — file not found at ${inputPath}`);
      continue;
    }

    const inputMeta = await sharp(inputPath).metadata();
    const inputStats = (await import('fs')).statSync(inputPath);

    await sharp(inputPath)
      .webp({ quality: 82, effort: 5 }) // quality 82 = excellent visual parity at ~40% less size
      .toFile(outputPath);

    const outputStats = (await import('fs')).statSync(outputPath);
    const savedKB = Math.round((inputStats.size - outputStats.size) / 1024);
    totalSaved += inputStats.size - outputStats.size;

    console.log(
      `✅ ${input} → ${output} | ${Math.round(inputStats.size / 1024)} KB → ${Math.round(outputStats.size / 1024)} KB | saved ${savedKB} KB (${inputMeta.width}×${inputMeta.height})`
    );
  }

  console.log(`\n🎉 Total savings: ${Math.round(totalSaved / 1024)} KB`);
}

convertImages().catch((err) => {
  console.error('❌ Conversion failed:', err);
  process.exit(1);
});
