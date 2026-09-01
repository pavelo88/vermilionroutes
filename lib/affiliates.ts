import { db } from './firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
  addDoc,
  increment,
  serverTimestamp
} from 'firebase/firestore';

// ─────────────────────────────────────────────
// CONSTANTS & BUSINESS RULES
// ─────────────────────────────────────────────

export const AFFILIATES_COLLECTION = 'affiliates';
export const COMMISSIONS_COLLECTION = 'affiliate_commissions';

/** Root user handle — Founder & Overflow Beneficiary */
export const ROOT_USERNAME = 'pablo.g';

/** Compensation Plan Constants ("10-3-2 Limitada") */
export const RATES = {
  seller: 0.10,    // 10% Infinito a vendedor directo
  padre: 0.03,     // 3% Padre (hasta $10,000 de venta del hijo)
  abuelo: 0.02,    // 2% Abuelo ($1,000 incondicional + $4,000 si está Activo)
  maxCommission: 0.15, // 15% máximo repartible con compresión inversa
};

/** Límites en USD acumulados por hijo/nieto */
export const CAPS = {
  padreMaxSaleVolume: 10000,    // Padre cobra 3% hasta los primeros $10,000 del hijo ($300 max)
  abueloTier1Volume: 1000,      // Abuelo cobra 2% sobre el 1er $1,000 incondicional ($20 max)
  abueloTier2Volume: 5000,      // Abuelo cobra 2% hasta $5,000 si está activo ($100 max)
  activeMinPersonalVolume: 1000 // $1,000 VP para estar activo
};

/** Piscinas de Acciones del Fondo Global (6% total: 2% c/u) */
export const GLOBAL_POOLS = {
  pool1: { name: 'Piscina Negocio', target: 3000, percent: 0.02, estimatedShareValue: 60 },
  pool2: { name: 'Piscina Líder', target: 7000, percent: 0.02, estimatedShareValue: 140 },
  pool3: { name: 'Piscina Premium', target: 15000, percent: 0.02, estimatedShareValue: 450 },
};

// ─────────────────────────────────────────────
// INTERFACES
// ─────────────────────────────────────────────

export interface AffiliateAccount {
  id: string;             // Document ID === username (lowercase)
  username: string;       // Unique username, e.g. "pablo.g"
  email: string;          // For Auth login
  cedula: string;         // National ID / Passport
  name: string;           // Full name
  phone?: string;
  address?: string;
  referralCode: string;   // Public ref code === username
  parentId: string;       // Direct sponsor handle (padre)
  granId: string;         // Grandparent handle (abuelo)
  grandparentId?: string; // Alias for granId
  ramaId: number | string;// Branch identifier ("1", "1.2", etc.)
  rama?: string;          // Hierarchy string
  rank: 'Standard' | 'Ejecutivo' | 'Premium' | 'Empresario';
  
  // Balances
  totalEarnings: number;
  availableBalance: number;
  pendingBalance: number;
  
  // Volumes
  salesCount: number;
  monthlyVolume: number;       // Personal Volume (VP)
  networkVolume: number;       // Total Group Volume (VG)
  cumulativePersonalVolume: number;
  
  // Flags & Auth
  isActive: boolean;           // Active status for grandparent bonus
  forcePasswordChange: boolean;// First login password change trigger
  isEmailVerified: boolean;
  authUid?: string;
  createdAt: string;
  updatedAt?: any;
}

export interface CommissionPayout {
  affiliateUsername: string;
  affiliateName: string;
  level: number; // 0 = Seller, 1 = Padre, 2 = Abuelo, 99 = Compression to Seller / Overflow to Root
  percentage: number;
  amountUsd: number;
  role: string;
}

export interface CommissionDistributionResult {
  saleAmount: number;
  totalCommissionPaid: number;
  totalPercentage: number;
  payouts: CommissionPayout[];
  buyerDiscountAmount: number;
}

// ─────────────────────────────────────────────
// HELPERS & LOOKUPS
// ─────────────────────────────────────────────

export async function isUsernameAvailable(username: string): Promise<boolean> {
  if (!username || !db) return false;
  const clean = username.trim().toLowerCase();
  try {
    const snap = await getDoc(doc(db, AFFILIATES_COLLECTION, clean));
    return !snap.exists();
  } catch {
    return false;
  }
}

export async function getAffiliateByUsername(username: string): Promise<AffiliateAccount | null> {
  if (!username || !db) return null;
  const clean = username.trim().toLowerCase();
  try {
    const snap = await getDoc(doc(db, AFFILIATES_COLLECTION, clean));
    if (!snap.exists()) return null;
    return { id: snap.id, ...snap.data() } as AffiliateAccount;
  } catch (err) {
    console.warn('getAffiliateByUsername error:', err);
    return null;
  }
}

export async function getAffiliateByCode(code: string): Promise<AffiliateAccount | null> {
  return getAffiliateByUsername(code);
}

export async function getAffiliateByEmail(email: string): Promise<AffiliateAccount | null> {
  if (!email || !db) return null;
  const clean = email.trim().toLowerCase();
  try {
    const q = query(
      collection(db, AFFILIATES_COLLECTION),
      where('email', '==', clean)
    );
    const snap = await getDocs(q);
    if (snap.empty) return null;
    return { id: snap.docs[0].id, ...snap.docs[0].data() } as AffiliateAccount;
  } catch (err) {
    console.warn('getAffiliateByEmail error:', err);
    return null;
  }
}

// ─────────────────────────────────────────────
// REGISTRATION (Creates in Firestore with Genealogy)
// ─────────────────────────────────────────────

export async function registerAffiliateInFirestore(params: {
  username: string;
  email: string;
  cedula: string;
  name: string;
  phone?: string;
  address?: string;
  sponsorUsername?: string;
  authUid?: string;
}): Promise<AffiliateAccount> {
  if (!db) throw new Error('Database is not initialized');

  const cleanUsername = params.username.trim().toLowerCase();

  // Check username availability
  const taken = !(await isUsernameAvailable(cleanUsername));
  if (taken) throw new Error(`El usuario "${cleanUsername}" ya está en uso.`);

  let parentId = ROOT_USERNAME;
  let granId = ROOT_USERNAME;
  let rama = '1';
  let ramaId: number | string = 1;
  let rank: AffiliateAccount['rank'] = 'Standard';

  // 1. Root User Case ('pablo.g')
  if (cleanUsername === ROOT_USERNAME) {
    parentId = ROOT_USERNAME;
    granId = ROOT_USERNAME;
    rama = '1';
    ramaId = 1;
    rank = 'Empresario';
  } else {
    // 2. Normal Affiliate Case
    let sponsor: AffiliateAccount | null = null;
    const cleanSponsor = params.sponsorUsername?.trim().toLowerCase();

    if (cleanSponsor && cleanSponsor !== cleanUsername) {
      sponsor = await getAffiliateByUsername(cleanSponsor);
    }

    if (sponsor) {
      parentId = sponsor.username;
      granId = sponsor.parentId || sponsor.granId || ROOT_USERNAME;
      const sponsorRama = sponsor.rama || '1';

      try {
        const qChildren = query(
          collection(db, AFFILIATES_COLLECTION),
          where('parentId', '==', parentId)
        );
        const childrenSnap = await getDocs(qChildren);
        const nextIndex = childrenSnap.size + 1;
        rama = `${sponsorRama}.${nextIndex}`;
        ramaId = sponsor.ramaId || 1;
      } catch {
        rama = `${sponsorRama}.1`;
        ramaId = 1;
      }
    } else {
      // Direct registration without sponsor -> Assigned to root 'pablo.g'
      parentId = ROOT_USERNAME;
      granId = ROOT_USERNAME;
      try {
        const qChildren = query(
          collection(db, AFFILIATES_COLLECTION),
          where('parentId', '==', ROOT_USERNAME)
        );
        const childrenSnap = await getDocs(qChildren);
        const nextIndex = childrenSnap.size + 1;
        rama = `1.${nextIndex}`;
        ramaId = nextIndex;
      } catch {
        rama = '1.1';
        ramaId = 1;
      }
    }
  }

  const newAffiliate: AffiliateAccount = {
    id: cleanUsername,
    username: cleanUsername,
    email: params.email.trim().toLowerCase(),
    cedula: params.cedula.trim(),
    name: params.name.trim(),
    phone: params.phone?.trim() || '',
    address: params.address?.trim() || 'Ecuador',
    referralCode: cleanUsername,
    parentId,
    granId,
    grandparentId: granId,
    rama,
    ramaId,
    rank,
    totalEarnings: 0,
    availableBalance: 0,
    pendingBalance: 0,
    salesCount: 0,
    monthlyVolume: 0,
    networkVolume: 0,
    cumulativePersonalVolume: 0,
    isActive: true,
    forcePasswordChange: true, // Requires setting secure password on 1st login
    isEmailVerified: false,
    authUid: params.authUid,
    createdAt: new Date().toISOString(),
  };

  await setDoc(doc(db, AFFILIATES_COLLECTION, cleanUsername), newAffiliate);
  return newAffiliate;
}

// ─────────────────────────────────────────────
// COMMISSION ENGINE (10-3-2 CON COMPRESIÓN INVERSA)
// ─────────────────────────────────────────────

export async function calculateAndDistributeCommissions(params: {
  bookingId: string;
  saleAmount: number;
  affiliateCode: string;
}): Promise<CommissionDistributionResult> {
  const { bookingId, saleAmount, affiliateCode } = params;
  const sellerUsername = affiliateCode.trim().toLowerCase();

  const payouts: CommissionPayout[] = [];
  let totalCommissionPaid = 0;
  const buyerDiscountAmount = saleAmount * 0.10;

  if (!db) {
    return {
      saleAmount,
      totalCommissionPaid: 0,
      totalPercentage: 0,
      payouts: [],
      buyerDiscountAmount,
    };
  }

  const seller = await getAffiliateByUsername(sellerUsername);
  if (!seller) {
    console.warn(`Seller "${sellerUsername}" not found.`);
    return {
      saleAmount,
      totalCommissionPaid: 0,
      totalPercentage: 0,
      payouts: [],
      buyerDiscountAmount,
    };
  }

  // 1. DIRECT SELLER BASE (10% Infinito)
  let directSellerPercentage = RATES.seller; // 10%
  let compressionBonus = 0;                  // Absorbed percentage from uplines if orphaned

  // Check upline status for Padre (3%)
  let parentEarned = false;
  let padreUsername = seller.parentId;

  if (padreUsername && padreUsername !== seller.username) {
    const parent = await getAffiliateByUsername(padreUsername);
    // Padre earns 3% if seller's cumulative sales is <= $10,000 USD
    const sellerCumulative = (seller.cumulativePersonalVolume || 0);
    if (parent && sellerCumulative <= CAPS.padreMaxSaleVolume) {
      const parentCommission = saleAmount * RATES.padre;
      payouts.push({
        affiliateUsername: parent.username,
        affiliateName: parent.name,
        level: 1,
        percentage: RATES.padre,
        amountUsd: parentCommission,
        role: 'Bono Padre (3%)',
      });
      totalCommissionPaid += parentCommission;
      parentEarned = true;

      await updateDoc(doc(db, AFFILIATES_COLLECTION, parent.username), {
        pendingBalance: increment(parentCommission),
        totalEarnings: increment(parentCommission),
        networkVolume: increment(saleAmount),
      });
    }
  }

  // If parent did not earn (doesn't exist, inactive, or capped out), compress to seller!
  if (!parentEarned) {
    compressionBonus += RATES.padre; // +3% to seller
  }

  // Check upline status for Abuelo (2%)
  let grandparentEarned = false;
  let abueloUsername = seller.granId || seller.grandparentId;

  if (abueloUsername && abueloUsername !== seller.username) {
    const gp = await getAffiliateByUsername(abueloUsername);
    if (gp) {
      const sellerCumulative = (seller.cumulativePersonalVolume || 0);
      const isUnderTier1 = sellerCumulative <= CAPS.abueloTier1Volume; // $1,000 incondicional
      const isUnderTier2AndActive = sellerCumulative <= CAPS.abueloTier2Volume && (gp.isActive || (gp.monthlyVolume || 0) >= CAPS.activeMinPersonalVolume);

      if (isUnderTier1 || isUnderTier2AndActive) {
        const gpCommission = saleAmount * RATES.abuelo;
        payouts.push({
          affiliateUsername: gp.username,
          affiliateName: gp.name,
          level: 2,
          percentage: RATES.abuelo,
          amountUsd: gpCommission,
          role: 'Bono Abuelo (2%)',
        });
        totalCommissionPaid += gpCommission;
        grandparentEarned = true;

        await updateDoc(doc(db, AFFILIATES_COLLECTION, gp.username), {
          pendingBalance: increment(gpCommission),
          totalEarnings: increment(gpCommission),
          networkVolume: increment(saleAmount),
        });
      }
    }
  }

  // If grandparent did not earn, compress to seller!
  if (!grandparentEarned) {
    compressionBonus += RATES.abuelo; // +2% to seller
  }

  // Total percentage earned by seller (10% base + any compression bonus up to 15%)
  const totalSellerRate = directSellerPercentage + compressionBonus;
  const sellerCommission = saleAmount * totalSellerRate;

  payouts.unshift({
    affiliateUsername: seller.username,
    affiliateName: seller.name,
    level: compressionBonus > 0 ? 99 : 0,
    percentage: totalSellerRate,
    amountUsd: sellerCommission,
    role: compressionBonus > 0 
      ? `Venta Directa + Compresión Inversa (${(totalSellerRate * 100).toFixed(0)}%)` 
      : 'Venta Directa (10%)',
  });
  totalCommissionPaid += sellerCommission;

  // Update seller stats in Firestore
  await updateDoc(doc(db, AFFILIATES_COLLECTION, seller.username), {
    pendingBalance: increment(sellerCommission),
    totalEarnings: increment(sellerCommission),
    salesCount: increment(1),
    monthlyVolume: increment(saleAmount),
    networkVolume: increment(saleAmount),
    cumulativePersonalVolume: increment(saleAmount),
  });

  // Record commission payout transactions
  for (const payout of payouts) {
    await addDoc(collection(db, COMMISSIONS_COLLECTION), {
      bookingId,
      saleAmount,
      affiliateUsername: payout.affiliateUsername,
      affiliateName: payout.affiliateName,
      commissionAmount: payout.amountUsd,
      percentage: payout.percentage,
      level: payout.level,
      role: payout.role,
      status: 'pending', // Pending until tour departs (Deferred Commission)
      createdAt: new Date().toISOString(),
    });
  }

  return {
    saleAmount,
    totalCommissionPaid,
    totalPercentage: totalCommissionPaid / saleAmount,
    payouts,
    buyerDiscountAmount,
  };
}

// ─────────────────────────────────────────────
// FONDO GLOBAL (PROFIT-SHARING DE PISCINAS 6%)
// ─────────────────────────────────────────────

/**
 * Distribute Global Pools (6% total: 2% per pool) based on accumulated shares.
 * 
 * Rules & Exact Math:
 * - Pool 1 (2%): Every $3,000 USD of monthly volume = 1 Share.
 * - Pool 2 (2%): Every $7,000 USD of monthly volume = 1 Share.
 * - Pool 3 (2%): Every $15,000 USD of monthly volume = 1 Share.
 * 
 * Example:
 * Total company sales = $9,000. Pool 1 (2%) = $180.
 * Person A ($6,000) = 2 shares.
 * Person B ($3,000) = 1 share.
 * Total shares = 3. Share value = $180 / 3 = $60.
 * Person A gets: 2 * $60 = $120.
 * Person B gets: 1 * $60 = $60.
 * Total paid = $180 (exact to the cent, 0% budget deficit).
 * 
 * Safety Rule:
 * If in any pool NO ONE qualifies (0 shares), the full 2% of that pool
 * passes automatically to ROOT_USERNAME (pablo.g).
 */
export async function distributeMonthlyGlobalPools(totalCompanyMonthlySales: number) {
  if (!db || totalCompanyMonthlySales <= 0) return;

  const pool1Budget = totalCompanyMonthlySales * GLOBAL_POOLS.pool1.percent; // 2%
  const pool2Budget = totalCompanyMonthlySales * GLOBAL_POOLS.pool2.percent; // 2%
  const pool3Budget = totalCompanyMonthlySales * GLOBAL_POOLS.pool3.percent; // 2%

  const snap = await getDocs(collection(db, AFFILIATES_COLLECTION));
  const affiliates: AffiliateAccount[] = [];
  snap.forEach(d => affiliates.push({ id: d.id, ...d.data() } as AffiliateAccount));

  // Compute shares for each affiliate
  const qualifiedP1: { username: string; shares: number }[] = [];
  const qualifiedP2: { username: string; shares: number }[] = [];
  const qualifiedP3: { username: string; shares: number }[] = [];

  for (const aff of affiliates) {
    const vol = (aff.monthlyVolume || 0) + (aff.networkVolume || 0);
    const s1 = Math.floor(vol / GLOBAL_POOLS.pool1.target);
    const s2 = Math.floor(vol / GLOBAL_POOLS.pool2.target);
    const s3 = Math.floor(vol / GLOBAL_POOLS.pool3.target);

    if (s1 > 0) qualifiedP1.push({ username: aff.username, shares: s1 });
    if (s2 > 0) qualifiedP2.push({ username: aff.username, shares: s2 });
    if (s3 > 0) qualifiedP3.push({ username: aff.username, shares: s3 });
  }

  const totalS1 = qualifiedP1.reduce((sum, q) => sum + q.shares, 0);
  const totalS2 = qualifiedP2.reduce((sum, q) => sum + q.shares, 0);
  const totalS3 = qualifiedP3.reduce((sum, q) => sum + q.shares, 0);

  // Pool 1 Distribution
  if (totalS1 > 0) {
    const valuePerShare = pool1Budget / totalS1;
    for (const q of qualifiedP1) {
      const payout = q.shares * valuePerShare;
      await updateDoc(doc(db, AFFILIATES_COLLECTION, q.username), {
        availableBalance: increment(payout),
        totalEarnings: increment(payout),
      });
    }
  } else {
    // Overflow to Root User (pablo.g)
    await updateDoc(doc(db, AFFILIATES_COLLECTION, ROOT_USERNAME), {
      availableBalance: increment(pool1Budget),
      totalEarnings: increment(pool1Budget),
    });
  }

  // Pool 2 Distribution
  if (totalS2 > 0) {
    const valuePerShare = pool2Budget / totalS2;
    for (const q of qualifiedP2) {
      const payout = q.shares * valuePerShare;
      await updateDoc(doc(db, AFFILIATES_COLLECTION, q.username), {
        availableBalance: increment(payout),
        totalEarnings: increment(payout),
      });
    }
  } else {
    // Overflow to Root User (pablo.g)
    await updateDoc(doc(db, AFFILIATES_COLLECTION, ROOT_USERNAME), {
      availableBalance: increment(pool2Budget),
      totalEarnings: increment(pool2Budget),
    });
  }

  // Pool 3 Distribution
  if (totalS3 > 0) {
    const valuePerShare = pool3Budget / totalS3;
    for (const q of qualifiedP3) {
      const payout = q.shares * valuePerShare;
      await updateDoc(doc(db, AFFILIATES_COLLECTION, q.username), {
        availableBalance: increment(payout),
        totalEarnings: increment(payout),
      });
    }
  } else {
    // Overflow to Root User (pablo.g)
    await updateDoc(doc(db, AFFILIATES_COLLECTION, ROOT_USERNAME), {
      availableBalance: increment(pool3Budget),
      totalEarnings: increment(pool3Budget),
    });
  }
}
