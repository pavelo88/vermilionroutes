import fs from 'fs';

const html = fs.readFileSync('C:\\Users\\pablo\\Desktop\\clon-vermilion\\vermilionroutes.com\\ecuador\\index.html', 'utf-8');

const regex = /<img[^>]+src=["'][^"']*(nrew-\d+|galatoursopt-\d+|banner-\d+|16as-\d+)[^"']*["'][^>]*>[\s\S]{0,400}?<\/div>/gi;
let m;
while ((m = regex.exec(html)) !== null) {
  console.log('----------------------------------------------------');
  console.log(m[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
}
