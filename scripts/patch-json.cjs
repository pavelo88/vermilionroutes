const fs = require('fs');
const path = require('path');

const locales = ['en', 'es', 'fr', 'de', 'it', 'pt', 'ja', 'zh'];

const translations = {
  en: 'Guest Stories & TripAdvisor Excellence',
  es: 'Historias de Huéspedes y Excelencia de TripAdvisor',
  fr: "Histoires d'invités et excellence TripAdvisor",
  de: 'Gästegeschichten & TripAdvisor-Exzellenz',
  it: 'Storie degli ospiti ed eccellenza TripAdvisor',
  pt: 'Histórias de hóspedes e excelência do TripAdvisor',
  ja: 'ゲストの体験とトリップアドバイザーの卓越性',
  zh: '客人故事和猫途鹰卓越'
};

const messagesDir = path.join(__dirname, '../messages');

for (const locale of locales) {
  const filePath = path.join(messagesDir, `${locale}.json`);
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    if (!data.experience) {
      data.experience = {};
    }
    
    data.experience.reviewsTitle = translations[locale];
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Updated ${locale}.json`);
  }
}
