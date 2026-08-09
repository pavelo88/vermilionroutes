export {};
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { mockTours, mockDestinations } from '../data/mock';

// Load .env variables to connect to the REAL project
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const databaseId = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_ID || '(default)';

console.log('Connecting to Firebase Project:', firebaseConfig.projectId);

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app, databaseId);
const storage = getStorage(app);

const BACKUP_DIR = 'C:\\Users\\pablo\\Desktop\\clon-vermilion\\vermilionroutes.com';

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

async function uploadToFirebaseStorage(localPath: string, tourId: string): Promise<string> {
  const ext = path.extname(localPath);
  const fileName = `tours/${tourId}-hero${ext}`;
  const storageRef = ref(storage, fileName);
  
  const fileBuffer = fs.readFileSync(localPath);
  let contentType = 'image/jpeg';
  if (ext.toLowerCase() === '.png') contentType = 'image/png';
  if (ext.toLowerCase() === '.webp') contentType = 'image/webp';

  console.log(`Uploading ${fileName} to Firebase Storage...`);
  
  await uploadBytes(storageRef, fileBuffer, { contentType });
  const publicUrl = await getDownloadURL(storageRef);
  return publicUrl;
}

async function main() {
  console.log('Starting upload to Firebase Storage and seeding Firestore...');
  
  const newMockTours = [];

  for (const tour of mockTours) {
    let slug = tour.id;
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
    if (tour.id === 'avenue-volcanoes') slug = 'ecuador-avenue-of-the-volcanoes-and-colonial-haciendas';

    const localImagePath = findTourImage(slug);
    
    let finalImageUrl = tour.imageUrl;
    let finalGallery = tour.gallery;
    
    if (localImagePath) {
      try {
        const publicUrl = await uploadToFirebaseStorage(localImagePath, tour.id);
        finalImageUrl = publicUrl;
        finalGallery = [publicUrl]; 
      } catch (err) {
        console.error(`Failed to upload ${tour.id}:`, err);
      }
    } else {
      console.log(`No local image found for ${tour.id}, keeping unsplash placeholder.`);
    }

    const updatedTour = {
      ...tour,
      imageUrl: finalImageUrl,
      gallery: finalGallery,
    };
    
    newMockTours.push(updatedTour);

    const tourRef = doc(db, 'tours', tour.id);
    await setDoc(tourRef, updatedTour, { merge: true });
    console.log(`✓ Seeded ${tour.id} with image: ${finalImageUrl.substring(0, 50)}...`);
  }
  
  for (const dest of mockDestinations) {
    const docRef = doc(db, 'destinations', dest.id);
    await setDoc(docRef, dest, { merge: true });
    console.log(`✓ Seeded destination: ${dest.id}`);
  }
  
  // Write the new URLs back to mock.ts so the fallback doesn't look broken
  const mockTsContent = fs.readFileSync(path.join(process.cwd(), 'data', 'mock.ts'), 'utf-8');
  const destinationsString = `export const mockDestinations: Destination[] = ${JSON.stringify(mockDestinations, null, 2)};`;
  const toursString = `export const mockTours: Tour[] = ${JSON.stringify(newMockTours, null, 2)};`;
  
  const updatedMockTsContent = mockTsContent
    .replace(/export const mockDestinations: Destination\[\] = \[[\s\S]*?\];/, destinationsString)
    .replace(/export const mockTours: Tour\[\] = \[[\s\S]*?\];/, toursString);
    
  fs.writeFileSync(path.join(process.cwd(), 'data', 'mock.ts'), updatedMockTsContent);
  console.log('✓ Updated data/mock.ts with Firebase Storage URLs for seamless fallback.');

  console.log('\nProcess finished! Firestore is updated and images are in Storage.');
  process.exit(0);
}

main().catch(console.error);

