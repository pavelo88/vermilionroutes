/**
 * SCRIPT DE MIGRACIÓN FIRESTORE: Email-ID → Username-ID
 * 
 * Qué hace:
 *  1. Lee el documento antiguo con ID = email (pablofgarciaf@gmail.com)
 *  2. Crea un documento nuevo con ID = username (pablo.g) y todos los datos corregidos
 *  3. Elimina el documento antiguo
 * 
 * Uso:
 *   node scripts/migrate-affiliate-id.mjs
 */

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';

// Lee el service account desde la variable de entorno o un archivo local
// Descarga el JSON desde Firebase Console > Project Settings > Service Accounts
const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS || './firebase-service-account.json';

let serviceAccount;
try {
  serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));
} catch {
  console.error('❌ No se encontró el archivo de credenciales de Firebase Admin.');
  console.error(`   Ruta buscada: ${serviceAccountPath}`);
  console.error('   Descárgalo desde Firebase Console > Project Settings > Service Accounts > Generate new private key');
  process.exit(1);
}

initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

// ── CONFIGURACIÓN DE MIGRACIÓN ────────────────────────────────────────────────
const OLD_DOC_ID  = 'pablofgarciaf@gmail.com';
const NEW_DOC_ID  = 'pablo.g';
const COLLECTION  = 'affiliates';
const ROOT_USERNAME = 'pablo.g';
// ─────────────────────────────────────────────────────────────────────────────

async function migrate() {
  console.log('\n🚀 Iniciando migración de documento de afiliado...\n');

  const oldRef = db.collection(COLLECTION).doc(OLD_DOC_ID);
  const oldSnap = await oldRef.get();

  if (!oldSnap.exists) {
    console.log(`⚠️  El documento "${OLD_DOC_ID}" no existe. Puede que ya hayas migrado.`);
    process.exit(0);
  }

  const data = oldSnap.data();
  console.log('📄 Documento antiguo encontrado:');
  console.log(JSON.stringify(data, null, 2));

  // Check if new document already exists
  const newRef = db.collection(COLLECTION).doc(NEW_DOC_ID);
  const newSnap = await newRef.get();
  if (newSnap.exists) {
    console.log(`\n⚠️  El documento "${NEW_DOC_ID}" ya existe. No se sobreescribirá.`);
    console.log('   Si quieres forzar la migración, elimina el documento nuevo primero.');
    process.exit(0);
  }

  // Build corrected document
  const migratedData = {
    ...data,
    id:              NEW_DOC_ID,
    username:        NEW_DOC_ID,
    referralCode:    NEW_DOC_ID,
    sponsorCode:     ROOT_USERNAME,
    parentId:        ROOT_USERNAME,
    grandparentId:   ROOT_USERNAME,
    rank:            'Empresario',
    monthlyVolume:   data.monthlyVolume   ?? 0,
    networkVolume:   data.networkVolume   ?? 0,
    salesCount:      data.salesCount      ?? 0,
    availableBalance: data.availableBalance ?? 0,
    pendingBalance:  data.pendingBalance   ?? 0,
    totalEarnings:   data.totalEarnings    ?? 0,
  };

  // Remove old email-specific fields we no longer use as ID
  delete migratedData.sponsorEmail;

  console.log('\n📝 Documento migrado que se creará:');
  console.log(JSON.stringify(migratedData, null, 2));

  console.log('\n⏳ Creando nuevo documento con ID "pablo.g"...');
  await newRef.set(migratedData);
  console.log('✅ Documento nuevo creado exitosamente.');

  console.log('\n⏳ Eliminando documento antiguo...');
  await oldRef.delete();
  console.log('✅ Documento antiguo eliminado.');

  console.log('\n🎉 ¡Migración completada! Tu documento de afiliado ahora tiene ID: pablo.g');
  console.log('   Verifica en Firebase Console > affiliates > pablo.g\n');
}

migrate().catch((err) => {
  console.error('\n❌ Error durante la migración:', err);
  process.exit(1);
});
