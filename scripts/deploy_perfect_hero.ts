import fs from 'fs';
import path from 'path';

const brainDir = 'C:\\Users\\pablo\\.gemini\\antigravity\\brain\\69bf51f5-a3ae-4e4a-8f35-b7d0a1821fd4';
const dir169 = path.resolve('public/images/tours/16-9');
const dir916 = path.resolve('public/images/tours/9-16');

const map169 = [
  { src: 'hero_galapagos_tortoise_16_9_1787444174780.jpg', dst: 'galapagos-tortuga-gigante-16-9.jpg' },
  { src: 'hero_quito_san_francisco_16_9_1787444265434.jpg', dst: 'quito-iglesia-de-san-francisco-16-9.jpg' },
  { src: 'hero_banos_waterfall_16_9_1787444296467.jpg', dst: 'pailon-del-diablo-16-9.jpg' },
  { src: 'hero_cotopaxi_volcano_16_9_1787445625907.jpg', dst: 'cotopaxi-volcano-16-9.jpg' },
  { src: 'hero_quilotoa_crater_16_9_1787445686657.jpg', dst: 'quilotoa-16-9.jpg' },
  { src: 'hero_amazon_napo_16_9_1787445736890.jpg', dst: 'amazon-river-canoe-16-9.jpg' },
  { src: 'hero_isabela_tintoreras_16_9_1787445790400.jpg', dst: 'isabela-island-16-9.jpg' },
  { src: 'hero_cajas_cuenca_16_9_1787445847699.jpg', dst: 'cajas-national-park-16-9.jpg' },
  { src: 'hero_chimborazo_summit_16_9_1787445907327.jpg', dst: 'chimborazo-volcano-16-9.1.jpg' },
  { src: 'hero_las_grietas_galapagos_16_9_1787445963537.jpg', dst: 'las-grietas-canyon-16-9.jpg' }
];

const map916 = [
  { src: 'hero_galapagos_tortoise_9_16_1787444203138.jpg', dst: 'galapagos-tortuga-gigante-9-16.jpg' },
  { src: 'hero_quito_san_francisco_9_16_1787444275035.jpg', dst: 'quito-plaza-independencia-9-16.jpg' },
  { src: 'hero_banos_waterfall_9_16_1787444333941.jpg', dst: 'banos-cascada-9-16.jpg' },
  { src: 'hero_cotopaxi_volcano_9_16_1787446144133.jpg', dst: 'cotopaxi-volcano-9-16.jpg' },
  { src: 'hero_quilotoa_crater_16_9_1787445686657.jpg', dst: 'quilotoa-9-16.jpg' },
  { src: 'hero_amazon_napo_16_9_1787445736890.jpg', dst: 'amazon-river-canoe-9-16.jpg' },
  { src: 'hero_isabela_tintoreras_16_9_1787445790400.jpg', dst: 'isabela-island-9-16.jpg' },
  { src: 'hero_cajas_cuenca_16_9_1787445847699.jpg', dst: 'cajas-national-park-9-16.jpg' },
  { src: 'hero_chimborazo_summit_16_9_1787445907327.jpg', dst: 'chimborazo-volcano-9-16.jpg' },
  { src: 'hero_las_grietas_galapagos_16_9_1787445963537.jpg', dst: 'las-grietas-canyon-9-16.jpg' }
];

console.log('=== DEPLOYING PERFECT 16:9 IMAGES ===');
map169.forEach(m => {
  const src = path.join(brainDir, m.src);
  const dst = path.join(dir169, m.dst);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dst);
    console.log(`[16:9] Copied ${m.src} -> ${m.dst}`);
  } else {
    console.error(`[16:9 MISSING] ${src}`);
  }
});

console.log('=== DEPLOYING PERFECT 9:16 IMAGES ===');
map916.forEach(m => {
  const src = path.join(brainDir, m.src);
  const dst = path.join(dir916, m.dst);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dst);
    console.log(`[9:16] Copied ${m.src} -> ${m.dst}`);
  } else {
    console.error(`[9:16 MISSING] ${src}`);
  }
});
