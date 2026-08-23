import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const dir169 = path.resolve('public/images/tours/16-9');
const dir916 = path.resolve('public/images/tours/9-16');

async function optimizeDirectory(dir, isVertical = false) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (/\.(jpg|jpeg|png)$/i.test(file)) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.size > 400 * 1024) { // larger than 400KB
        console.log(`Optimizing large image: ${file} (${(stat.size / 1024).toFixed(1)} KB)...`);
        const buffer = fs.readFileSync(filePath);
        const image = sharp(buffer);
        const metadata = await image.metadata();

        let pipeline = sharp(buffer);
        if (isVertical && metadata.width && metadata.width > 1080) {
          pipeline = pipeline.resize({ width: 1080, withoutEnlargement: true });
        } else if (!isVertical && metadata.width && metadata.width > 1920) {
          pipeline = pipeline.resize({ width: 1920, withoutEnlargement: true });
        }

        const optimizedBuffer = await pipeline
          .jpeg({ quality: 84, mozjpeg: true })
          .toBuffer();

        fs.writeFileSync(filePath, optimizedBuffer);
        const newStat = fs.statSync(filePath);
        console.log(`  -> Reduced to ${(newStat.size / 1024).toFixed(1)} KB (${Math.round((1 - newStat.size / stat.size) * 100)}% savings)`);
      }
    }
  }
}

async function run() {
  console.log('=== OPTIMIZING 16:9 IMAGES ===');
  await optimizeDirectory(dir169, false);

  console.log('\n=== OPTIMIZING 9:16 IMAGES ===');
  await optimizeDirectory(dir916, true);

  console.log('\nAll oversized images optimized successfully!');
}

run();
