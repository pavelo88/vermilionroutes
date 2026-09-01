/**
 * FIREBASE SEED SCRIPT: Create root affiliate account "pablo.g"
 * 
 * Does:
 *  1. Creates/updates Firestore document affiliates/pablo.g
 *  2. Creates Firebase Auth user with pablofgarciaf@gmail.com (if not exists)
 *  3. Sends a password reset link to the email
 * 
 * Usage (run from the vermilion project root):
 *   node scripts/seed-root-affiliate.mjs
 * 
 * Requirements:
 *   - Firebase Admin SDK service account JSON at ./firebase-service-account.json
 *     (Download from Firebase Console → Project Settings → Service Accounts → Generate new private key)
 */

import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { readFileSync } from 'fs';

// ── Load credentials ──────────────────────────────────────────────────────────
const credPath = process.env.GOOGLE_APPLICATION_CREDENTIALS || './firebase-service-account.json';
let serviceAccount;
try {
  serviceAccount = JSON.parse(readFileSync(credPath, 'utf8'));
} catch {
  console.error(`\n❌ No se encontró el archivo de credenciales en: ${credPath}`);
  console.error('   Descárgalo desde Firebase Console → Project Settings → Service Accounts → Generate new private key\n');
  process.exit(1);
}

if (!getApps().length) {
  initializeApp({ credential: cert(serviceAccount) });
}

const db   = getFirestore();
const auth = getAuth();

// ── Root affiliate configuration ──────────────────────────────────────────────
const ROOT = {
  username:    'pablo.g',
  email:       'pablofgarciaf@gmail.com',
  cedula:      '1721790721',
  name:        'Pablo Garcia',
  address:     'Ecuador',
  phone:       '',
  rank:        'Empresario',
  rama:        '1',
};

async function seed() {
  console.log('\n🚀 Iniciando creación del afiliado raíz...\n');

  // ── 1. Firestore document ─────────────────────────────────────────────────
  const docRef = db.collection('affiliates').doc(ROOT.username);
  const snap = await docRef.get();

  if (snap.exists) {
    console.log(`⚠️  El documento "affiliates/${ROOT.username}" ya existe. Actualizando campos de seguridad...`);
    await docRef.update({
      // Ensure defaults are correct
      parentId:       ROOT.username,
      grandparentId:  ROOT.username,
      sponsorCode:    ROOT.username,
      rank:           ROOT.rank,
      monthlyVolume:  snap.data()?.monthlyVolume  ?? 0,
      networkVolume:  snap.data()?.networkVolume  ?? 0,
    });
    console.log('✅ Documento actualizado.');
  } else {
    const rootDoc = {
      id:              ROOT.username,
      username:        ROOT.username,
      email:           ROOT.email,
      cedula:          ROOT.cedula,
      name:            ROOT.name,
      phone:           ROOT.phone,
      address:         ROOT.address,
      referralCode:    ROOT.username,
      sponsorCode:     ROOT.username,
      parentId:        ROOT.username,
      grandparentId:   ROOT.username,
      rama:            ROOT.rama,
      rank:            ROOT.rank,
      totalEarnings:   0,
      availableBalance: 0,
      pendingBalance:  0,
      salesCount:      0,
      monthlyVolume:   0,
      networkVolume:   0,
      isEmailVerified: true,
      createdAt:       new Date().toISOString(),
    };

    await docRef.set(rootDoc);
    console.log(`✅ Documento "affiliates/${ROOT.username}" creado exitosamente.`);
    console.log(JSON.stringify(rootDoc, null, 2));
  }

  // ── 2. Firebase Auth user ─────────────────────────────────────────────────
  let uid;
  try {
    const existingUser = await auth.getUserByEmail(ROOT.email);
    uid = existingUser.uid;
    console.log(`\n✅ Usuario de Auth ya existe con UID: ${uid}`);
  } catch (e: any) {
    if (e.code === 'auth/user-not-found') {
      const newUser = await auth.createUser({
        email:         ROOT.email,
        emailVerified: true,
        displayName:   ROOT.name,
        // Initial password = cedula. User will reset via the email link.
        password:      ROOT.cedula,
      });
      uid = newUser.uid;
      console.log(`\n✅ Usuario de Auth creado con UID: ${uid}`);
    } else {
      throw e;
    }
  }

  // Link UID to Firestore document
  await docRef.update({ authUid: uid });
  console.log(`✅ UID "${uid}" guardado en Firestore.`);

  // ── 3. Generate password reset link ──────────────────────────────────────
  const resetLink = await auth.generatePasswordResetLink(ROOT.email, {
    url: 'https://vermilionroutes.com/es/affiliates/dashboard',
    handleCodeInApp: false,
  });

  console.log('\n📧 ENLACE DE CAMBIO DE CONTRASEÑA (envía esto al correo):');
  console.log('────────────────────────────────────────────────────────────');
  console.log(resetLink);
  console.log('────────────────────────────────────────────────────────────');
  console.log('\n💡 Abre ese enlace en tu navegador para establecer tu contraseña definitiva.');
  console.log('   Contraseña temporal actual: ' + ROOT.cedula);
  console.log('\n🎉 ¡Afiliado raíz "pablo.g" listo!\n');
}

seed().catch((err) => {
  console.error('\n❌ Error en el seed:', err);
  process.exit(1);
});
