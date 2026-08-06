import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const sourceDir = path.join(process.cwd(), 'public/wp-content/uploads');
const destDir = path.join(process.cwd(), 'public/images/tours');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Allowed extensions
const allowedExts = ['.jpg', '.jpeg', '.png'];

async function processDirectory(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (allowedExts.includes(ext)) {
        const destPath = path.join(destDir, entry.name.replace(ext, '.webp'));
        
        // Skip if already exists to avoid redundant processing
        if (!fs.existsSync(destPath)) {
          try {
            await sharp(fullPath)
              .webp({ quality: 80 })
              .resize({ width: 1200, withoutEnlargement: true })
              .toFile(destPath);
            console.log(`Optimized: ${entry.name} -> ${path.basename(destPath)}`);
          } catch (err) {
            console.error(`Error processing ${fullPath}:`, err.message);
          }
        }
      }
    }
  }
}

async function run() {
  console.log('Starting image optimization...');
  await processDirectory(sourceDir);
  console.log('Finished image optimization.');
}

run();
