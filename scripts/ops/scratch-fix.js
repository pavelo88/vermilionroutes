const fs = require('fs');
const path = require('path');

const locales = ['es', 'en', 'fr', 'de', 'it', 'pt', 'ja', 'zh'];
const messagesDir = path.join(__dirname, 'messages');

const translations = {
  es: { premium: 'Premium', luxury: 'Luxury' },
  en: { premium: 'Premium', luxury: 'Luxury' },
  fr: { premium: 'Premium', luxury: 'Luxe' },
  de: { premium: 'Premium', luxury: 'Luxus' },
  it: { premium: 'Premium', luxury: 'Lusso' },
  pt: { premium: 'Premium', luxury: 'Luxo' },
  ja: { premium: 'プレミアム', luxury: 'ラグジュアリー' },
  zh: { premium: '尊享', luxury: '奢华' },
};

locales.forEach(locale => {
  const filePath = path.join(messagesDir, `${locale}.json`);
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    if (!data.tours) data.tours = {};
    data.tours.premium = translations[locale].premium;
    data.tours.luxury = translations[locale].luxury;
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Fixed translations for ${locale}`);
  }
});
