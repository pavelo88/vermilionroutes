import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

// Parse service account
const serviceAccount = JSON.parse(readFileSync('./serviceAccountKey.json', 'utf8'));

// Initialize app
initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

async function fixImages() {
  const toursRef = db.collection('tours');
  const snapshot = await toursRef.get();
  
  for (const doc of snapshot.docs) {
    const data = doc.data();
    let updated = false;
    
    // helper to fix path
    const fixPath = (path) => {
       if (!path) return path;
       if (!path.startsWith('/images/tours/')) return path;
       
       const localPath = join(process.cwd(), 'public', path);
       if (!existsSync(localPath)) {
          // Try 16-9 version
          let alt = path.replace('/9-16/', '/16-9/').replace('-9-16.jpg', '-16-9.jpg');
          if (!alt.endsWith('.jpg')) alt = alt.replace(/\.\w+$/, '.jpg');
          if (path.endsWith('.jpg') && !alt.endsWith('.jpg')) alt = alt + '.jpg';
          
          let altLocal = join(process.cwd(), 'public', alt);
          if (existsSync(altLocal)) {
             return alt;
          } else {
             console.log(`Fallback not found for ${path}. Replacing with amazon-waterfall-9-16.jpg`);
             return '/images/tours/9-16/amazon-waterfall-9-16.jpg'; // default safe image
          }
       }
       return path;
    };
    
    const newMobile = fixPath(data.mobileImage);
    if (newMobile !== data.mobileImage) {
      console.log(`Update ${doc.id} mobileImage: ${data.mobileImage} -> ${newMobile}`);
      data.mobileImage = newMobile;
      updated = true;
    }
    
    const newDesktop = fixPath(data.desktopImage);
    if (newDesktop !== data.desktopImage) {
      console.log(`Update ${doc.id} desktopImage: ${data.desktopImage} -> ${newDesktop}`);
      data.desktopImage = newDesktop;
      updated = true;
    }

    const newImageUrl = fixPath(data.imageUrl);
    if (newImageUrl !== data.imageUrl) {
      console.log(`Update ${doc.id} imageUrl: ${data.imageUrl} -> ${newImageUrl}`);
      data.imageUrl = newImageUrl;
      updated = true;
    }
    
    if (data.gallery && Array.isArray(data.gallery)) {
       const newGallery = data.gallery.map(fixPath);
       if (JSON.stringify(newGallery) !== JSON.stringify(data.gallery)) {
          console.log(`Update ${doc.id} gallery.`);
          data.gallery = newGallery;
          updated = true;
       }
    }
    
    if (updated) {
       await doc.ref.update({
          mobileImage: data.mobileImage,
          desktopImage: data.desktopImage,
          imageUrl: data.imageUrl,
          gallery: data.gallery
       });
    }
  }
  console.log("Done fixing images");
}

fixImages().catch(console.error);
