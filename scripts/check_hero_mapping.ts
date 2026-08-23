import { HERO_SLIDES_DATA } from '../components/home/hero/heroData';

console.log('=== HERO SLIDES DATA MAPPING ===');
HERO_SLIDES_DATA.forEach((s, idx) => {
  console.log(`[Slide ${idx}]`);
  console.log(`  Place: ${s.place.en} / ${s.place.es}`);
  console.log(`  Title: ${s.title.en} ${s.title2?.en || ''}`);
  console.log(`  Desc:  ${s.description.en.substring(0, 70)}...`);
  console.log(`  Desktop Image: ${s.desktopImage || s.image}`);
  console.log(`  Mobile Image:  ${s.mobileImage}`);
});
