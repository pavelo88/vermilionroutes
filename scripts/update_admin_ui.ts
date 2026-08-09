export {};
const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');

  // Replace backgrounds with glass panels
  content = content.replace(/bg-zinc-900\/90 backdrop-blur-2xl/g, 'glass-panel');
  content = content.replace(/bg-zinc-900\/90/g, 'glass-panel');
  content = content.replace(/bg-zinc-950\/80/g, 'glass-panel');
  content = content.replace(/bg-zinc-950 border border-zinc-800 text-white/g, 'glass-input');
  content = content.replace(/bg-zinc-950 border border-zinc-800 rounded-xl text-white/g, 'glass-input rounded-xl');
  content = content.replace(/bg-zinc-950 border border-zinc-800 rounded-2xl text-white/g, 'glass-input rounded-2xl');
  content = content.replace(/bg-zinc-950/g, 'glass-input');

  // Adjust text classes for dark mode support
  content = content.replace(/text-zinc-400/g, 'text-zinc-600 dark:text-zinc-400');
  content = content.replace(/text-zinc-300/g, 'text-zinc-700 dark:text-zinc-300');
  content = content.replace(/text-white/g, 'text-zinc-900 dark:text-white');

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`Updated ${path.basename(filePath)}`);
}

const files = [
  path.join(__dirname, '../components/admin/AdminTourModal.tsx'),
  path.join(__dirname, '../components/admin/AdminSettingsPanel.tsx'),
  path.join(__dirname, '../components/admin/AdminBookingsTable.tsx')
];

files.forEach(processFile);

