import fs from 'fs';
import path from 'path';

function checkFileExists(relPath) {
  const clean = relPath.startsWith('/') ? relPath.slice(1) : relPath;
  const full = path.resolve('public', clean);
  return { exists: fs.existsSync(full), path: full, size: fs.existsSync(full) ? fs.statSync(full).size : 0 };
}

const filesToCheck = [
  'components/home/hero/heroData.ts',
  'data/mock.ts',
  'data/dailyToursData.ts',
  'data/blogData.ts',
  'scripts/generate-all-pdfs.ts'
];

let missingCount = 0;
let validCount = 0;

filesToCheck.forEach(file => {
  const content = fs.readFileSync(file, 'utf-8');
  console.log(`\n=================== AUDITING: ${file} ===================`);
  const matches = content.match(/\/images\/[^\s"'>,;)}\]]+\.(?:jpg|jpeg|png|webp)/gi) || [];
  const unique = [...new Set(matches)];

  unique.forEach(img => {
    const res = checkFileExists(img);
    if (!res.exists) {
      console.error(`❌ MISSING: ${img}`);
      missingCount++;
    } else {
      console.log(`✅ OK (${(res.size / 1024).toFixed(1)} KB): ${img}`);
      validCount++;
    }
  });
});

console.log(`\nAUDIT SUMMARY: ${validCount} valid images, ${missingCount} missing images.`);
