import fs from 'fs';

const html = fs.readFileSync('C:\\Users\\pablo\\Desktop\\clon-vermilion\\vermilionroutes.com\\galapagos\\index.html', 'utf-8');

const regex = /(<h\d[^>]*>[\s\S]*?<\/h\d>[\s\S]*?<img[^>]+src=["'][^"']*(16as-\d+|gal\d|galatoursopt)[^"']*["'][^>]*>)/gi;
let m;
while ((m = regex.exec(html)) !== null) {
  console.log('----------------------------------------------------');
  console.log(m[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
}
