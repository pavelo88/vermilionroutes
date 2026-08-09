const fs = require('fs');
const path = require('path');

function unflatten(data) {
  const result = {};
  for (const key in data) {
    const keys = key.split('.');
    keys.reduce((acc, part, index) => {
      if (index === keys.length - 1) {
        acc[part] = data[key];
      } else {
        acc[part] = acc[part] || {};
      }
      return acc[part];
    }, result);
  }
  return result;
}

const dir = path.join(__dirname, '../messages');
const files = fs.readdirSync(dir);

files.forEach(file => {
  if (file.endsWith('.json')) {
    const p = path.join(dir, file);
    const data = JSON.parse(fs.readFileSync(p, 'utf8'));
    const nested = unflatten(data);
    fs.writeFileSync(p, JSON.stringify(nested, null, 2));
    console.log(`Unflattened ${file}`);
  }
});
