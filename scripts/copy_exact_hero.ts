import fs from 'fs';
import path from 'path';

const brainDir = 'C:\\Users\\pablo\\.gemini\\antigravity\\brain\\69bf51f5-a3ae-4e4a-8f35-b7d0a1821fd4';
const dir169 = path.resolve('public/images/tours/16-9');
const dir916 = path.resolve('public/images/tours/9-16');

const exact169 = [
  { src: 'hero_galapagos_tortoise_16_9_1787444179783.jpg', dst: 'galapagos-tortuga-gigante-16-9.jpg' },
  { src: 'hero_quito_san_francisco_16_9_1787444232545.jpg', dst: 'quito-iglesia-de-san-francisco-16-9.jpg' },
  { src: 'hero_banos_waterfall_16_9_1787444296468.jpg', dst: 'pailon-del-diablo-16-9.jpg' },
  { src: 'hero_cotopaxi_volcano_16_9_1787445625947.jpg', dst: 'cotopaxi-volcano-16-9.jpg' },
  { src: 'hero_quilotoa_crater_16_9_1787445686658.jpg', dst: 'quilotoa-16-9.jpg' },
  { src: 'hero_amazon_napo_16_9_1787445736890.jpg', dst: 'amazon-river-canoe-16-9.jpg' },
  { src: 'hero_isabela_tintoreras_16_9_1787445791316.jpg', dst: 'isabela-island-16-9.jpg' },
  { src: 'hero_cajas_cuenca_16_9_1787445847699.jpg', dst: 'cajas-national-park-16-9.jpg' },
  { src: 'hero_chimborazo_summit_16_9_1787445907327.jpg', dst: 'chimborazo-volcano-16-9.1.jpg' },
  { src: 'hero_las_grietas_galapagos_16_9_1787445963537.jpg', dst: 'las-grietas-canyon-16-9.jpg' }
];

const exact916 = [
  { src: 'hero_galapagos_tortoise_9_16_1787444204631.jpg', dst: 'galapagos-tortuga-gigante-9-16.jpg' },
  { src: 'hero_quito_san_francisco_9_16_1787444262229.jpg', dst: 'quito-plaza-independencia-9-16.jpg' },
  { src: 'hero_banos_waterfall_9_16_1787444333940.jpg', dst: 'banos-cascada-9-16.jpg' },
  { src: 'hero_cotopaxi_volcano_9_16_1787446144133.jpg', dst: 'cotopaxi-volcano-9-16.jpg' },
  { src: 'hero_quilotoa_crater_16_9_1787445686658.jpg', dst: 'quilotoa-9-16.jpg' },
  { src: 'hero_amazon_napo_16_9_1787445736890.jpg', dst: 'amazon-river-canoe-9-16.jpg' },
  { src: 'hero_isabela_tintoreras_16_9_1787445791316.jpg', dst: 'isabela-island-9-16.jpg' },
  { src: 'hero_cajas_cuenca_16_9_1787445847699.jpg', dst: 'cajas-national-park-9-16.jpg' },
  { src: 'hero_chimborazo_summit_16_9_1787445907327.jpg', dst: 'chimborazo-volcano-9-16.jpg' },
  { src: 'hero_las_grietas_galapagos_16_9_1787445963537.jpg', dst: 'las-grietas-canyon-9-16.jpg' }
];

console.log('=== DEPLOYING ALL 10 16:9 IMAGES ===');
exact169.forEach(m => {
  const src = path.join(brainDir, m.src);
  const dst = path.join(dir169, m.dst);
  fs.copyFileSync(src, dst);
  console.log(`[16:9 SUCCESS] ${m.dst} <= ${m.src}`);
});

console.log('=== DEPLOYING ALL 10 9:16 IMAGES ===');
exact916.forEach(m => {
  const src = path.join(brainDir, m.src);
  const dst = path.join(dir916, m.dst);
  fs.copyFileSync(src, dst);
  console.log(`[9:16 SUCCESS] ${m.dst} <= ${m.src}`);
});
