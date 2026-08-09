export {};
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';
import firebaseConfigJson from '../firebase-applet-config.json' with { type: 'json' };
import { mockTours, mockDestinations } from '../data/mock';

const firebaseConfig = {
  apiKey: firebaseConfigJson.apiKey,
  authDomain: firebaseConfigJson.authDomain,
  projectId: firebaseConfigJson.projectId,
  storageBucket: firebaseConfigJson.storageBucket,
  messagingSenderId: firebaseConfigJson.messagingSenderId,
  appId: firebaseConfigJson.appId,
};

const databaseId = firebaseConfigJson.firestoreDatabaseId || '(default)';
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app, databaseId);

const BACKUP_DIR = 'C:\\Users\\pablo\\Desktop\\clon-vermilion\\vermilionroutes.com';
const PUBLIC_TOURS_DIR = path.join(process.cwd(), 'public', 'images', 'tours');

function findTourImage(tourSlug: string): string | null {
  const tourDir = path.join(BACKUP_DIR, 'tour', tourSlug);
  if (!fs.existsSync(tourDir)) return null;

  const indexPath = path.join(tourDir, 'index.html');
  if (!fs.existsSync(indexPath)) return null;

  const htmlContent = fs.readFileSync(indexPath, 'utf-8');
  
  const ogImageMatch = htmlContent.match(/property="og:image"\s+content="([^"]+)"/i);
  if (ogImageMatch && ogImageMatch[1]) {
    const url = new URL(ogImageMatch[1]);
    const localPath = path.join(BACKUP_DIR, url.pathname.replace(/^\/+/, ''));
    if (fs.existsSync(localPath)) return localPath;
  }

  const imgMatch = htmlContent.match(/<img[^>]+src="([^"]+\/wp-content\/uploads\/[^"]+)"/i);
  if (imgMatch && imgMatch[1]) {
    let src = imgMatch[1];
    let pathname = src.startsWith('http') ? new URL(src).pathname : src;
    pathname = pathname.replace(/^(\.\.\/)+/, '').replace(/^\/+/, '').split('?')[0];
    const localPath = path.join(BACKUP_DIR, pathname);
    if (fs.existsSync(localPath)) return localPath;
  }

  return null;
}

async function copyImageLocally(localPath: string, tourId: string): Promise<string> {
  const ext = path.extname(localPath);
  const fileName = `${tourId}-hero${ext}`;
  const destPath = path.join(PUBLIC_TOURS_DIR, fileName);
  
  if (!fs.existsSync(PUBLIC_TOURS_DIR)) {
    fs.mkdirSync(PUBLIC_TOURS_DIR, { recursive: true });
  }
  
  console.log(`Copying to ${destPath}...`);
  fs.copyFileSync(localPath, destPath);
  
  return `/images/tours/${fileName}`;
}

async function main() {
  console.log('Starting seed process and image extraction for all 18 tours...');
  
  for (const tour of mockTours) {
    let slug = tour.id;
    // Map tour IDs to original URL slugs
    if (tour.id === 'galapagos-economic') slug = 'galapagos-islands-economic-tour';
    if (tour.id === 'galapagos-santa-cruz-premium') slug = 'galapagos-islands-santa-cruz-premium-service';
    if (tour.id === 'galapagos-santa-cruz-isabela-premium') slug = 'galapagos-santa-cruz-isabela-premium-service';
    if (tour.id === 'full-galapagos-3-islands') slug = 'full-galapagos-san-cristobal-santa-cruz-isabela';
    if (tour.id === 'ecuador-andes-jungle') slug = 'ecuador-andes-and-jungle-of-the-amazon';
    if (tour.id === 'ecuador-snow-waterfalls') slug = 'ecuador-snow-and-waterfalls';
    if (tour.id === 'ecuador-volcanoes-rivers') slug = 'ecuador-volcanoes-and-rivers';
    if (tour.id === 'snow-waterfalls-galapagos') slug = 'snow-and-waterfalls-full-galapagos-islands';
    if (tour.id === 'cusco-inca-trail') slug = 'cusco-inca-trail-machu-picchu';
    if (tour.id === 'misterios-del-peru') slug = 'mysteries-of-peru';
    if (tour.id === 'peru-el-cusco') slug = 'peru-cusco-machu-picchu';
    if (tour.id === 'peru-essential') slug = 'peru-essential';
    if (tour.id === 'fantastic-ecuador') slug = 'fantastic-ecuador';
    if (tour.id === 'andean-world') slug = 'andean-world';
    if (tour.id === 'andes-jungle-galapagos') slug = 'andes-amazon-jungle-galapagos';
    if (tour.id === 'enchanted-islands') slug = 'enchanted-islands-san-cristobal-santa-cruz-isabela';
    if (tour.id === 'avenue-volcanoes') slug = 'ecuador-avenue-of-the-volcanoes-and-colonial-haciendas'; // Guessing

    const localImagePath = findTourImage(slug);
    
    // Copy the image if found and update the tour object
    let finalImageUrl = tour.imageUrl;
    let finalGallery = tour.gallery;
    
    if (localImagePath) {
      try {
        const publicUrl = await copyImageLocally(localImagePath, tour.id);
        finalImageUrl = publicUrl;
        finalGallery = [publicUrl]; 
      } catch (err) {
        console.error(`Failed to copy ${tour.id}:`, err);
      }
    } else {
      console.log(`No local image found for ${tour.id}, keeping unsplash placeholder.`);
    }

    const updatedTour = {
      ...tour,
      imageUrl: finalImageUrl,
      gallery: finalGallery,
    };

    // Seed into Firestore
    const tourRef = doc(db, 'tours', tour.id);
    await setDoc(tourRef, updatedTour, { merge: true });
    console.log(`✓ Seeded ${tour.id} with image: ${finalImageUrl.substring(0, 30)}...`);
  }
  
  // Seed Destinations
  for (const dest of mockDestinations) {
    const docRef = doc(db, 'destinations', dest.id);
    await setDoc(docRef, dest, { merge: true });
    console.log(`✓ Seeded destination: ${dest.id}`);
  }
  
  console.log('\nProcess finished! Firestore is updated with 18 tours and local images.');
  process.exit(0);
}

main().catch(console.error);

