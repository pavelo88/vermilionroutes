import fs from 'fs';
import path from 'path';

const dir169 = path.resolve('public/images/tours/16-9');
const dir916 = path.resolve('public/images/tours/9-16');

function safeCopy(srcDir, srcFile, dstDir, dstFile) {
  const src = path.join(srcDir, srcFile);
  const dst = path.join(dstDir, dstFile);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dst);
    console.log(`Synced: ${srcFile} -> ${path.basename(dstDir)}/${dstFile}`);
  } else {
    console.error(`Missing source: ${src}`);
  }
}

// 1. Ensure 16-9 standardized files
safeCopy(dir169, 'cuenca-16-9.jpg', dir169, 'cajas-national-park-16-9.jpg');
safeCopy(dir169, 'puerto-ayora-16-9.jpg', dir169, 'las-grietas-canyon-16-9.jpg');
safeCopy(dir169, 'quilotoa-16-9.1.jpg', dir169, 'quilotoa-16-9.jpg');
safeCopy(dir169, 'chimborazo-volcano-16-9.1.jpg', dir169, 'chimborazo-volcano-16-9.jpg');
safeCopy(dir169, 'amazon-river-canoe-16-9.jpg', dir169, 'amazon-cuyabeno-16-9.jpg');
safeCopy(dir169, 'amazon-river-16-9.jpg', dir169, 'puyo-yanacocha-16-9.jpg');

// 2. Ensure 9-16 standardized files
safeCopy(dir916, 'galapagos-tortuga-gigante-9-16.1.jpg', dir916, 'galapagos-tortuga-gigante-9-16.jpg');
safeCopy(dir916, 'quito-iglesia-de-san-francisco-16-9.jpg', dir916, 'quito-plaza-independencia-9-16.jpg');
safeCopy(dir916, 'amazon-waterfall-9-16.jpg', dir916, 'banos-cascada-9-16.jpg');
safeCopy(dir916, 'cotopaxi-volcano-16-9.jpg', dir916, 'cotopaxi-volcano-9-16.jpg');
safeCopy(dir916, 'amazon-river-canoe-16-9.jpg', dir916, 'amazon-river-canoe-9-16.jpg');
safeCopy(dir916, 'cajas-national-park-9-16.1.jpg', dir916, 'cajas-national-park-9-16.jpg');
safeCopy(dir916, 'ruinas-de-ingapirca-16-9.jpg', dir916, 'ruinas-de-ingapirca-9-16.jpg');
safeCopy(dir916, 'amazon-loro-9-16.jpg', dir916, 'amazon-cocodrilo-9-16.jpg');
safeCopy(dir169, 'chimborazo-volcano-16-9.1.jpg', dir916, 'chimborazo-volcano-9-16.jpg');
safeCopy(dir916, 'quilotoa-9-16 (2).jpg', dir916, 'quilotoa-9-16.jpg');
safeCopy(dir169, 'otavalo-market-16-9.1.jpg', dir916, 'otavalo-market-9-16.jpg');
safeCopy(dir169, 'mindo-waterfall-16-9.jpg', dir916, 'mindo-waterfall-9-16.jpg');

console.log('\nStandardized image aliases synced successfully!');
