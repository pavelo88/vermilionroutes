const fs = require('fs');

const files = ['data/mock.ts', 'data/dailyToursData.ts', 'data/blogData.ts'];

files.forEach(f => {
  if (fs.existsSync(f)) {
    let content = fs.readFileSync(f, 'utf8');
    
    // Replace terms in English
    content = content.replace(/Indigenous Market/gi, 'Artisan Market');
    content = content.replace(/Indigenous Handicraft Market/gi, 'Artisan Market');
    
    // Replace terms in Spanish
    content = content.replace(/Mercado Indígena/gi, 'Plaza de Ponchos (Mercado Artesanal)');
    content = content.replace(/Mercado Indigena/gi, 'Plaza de Ponchos (Mercado Artesanal)');
    content = content.replace(/mercado indígena/gi, 'Plaza de Ponchos');
    content = content.replace(/comunidad indígena/gi, 'comunidad Kichwa');
    content = content.replace(/Comunidad Indígena/gi, 'Comunidad Kichwa');
    content = content.replace(/Indigenous Community/gi, 'Kichwa Community');
    content = content.replace(/indigenous communities/gi, 'Kichwa communities');
    content = content.replace(/comunidades indígenas/gi, 'comunidades Kichwa');

    // Fix empty or missing images for Otavalo
    content = content.replace(/\/images\/tours\/16-9\/otavalo[^']*\.jpg/g, '/images/tours/16-9/otavalo-market-16-9.jpg');
    // Just in case it's completely empty
    content = content.replace(/image:\s*''/g, "image: '/images/tours/16-9/otavalo-market-16-9.jpg'");

    fs.writeFileSync(f, content);
  }
});

console.log("Renaming completed successfully.");
