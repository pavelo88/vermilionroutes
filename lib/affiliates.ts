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
  increment
} from 'firebase/firestore';

export interface AffiliateAccount {
  id: string; // Email as unique ID
  email: string;
  name: string;
  phone?: string;
  referralCode: string; // Short code e.g. "PABLO2026"
  sponsorCode?: string; // Referral code of the sponsor who enrolled them
  parentId?: string; // Email of the parent sponsor
  rank: 'Standard' | 'Silver' | 'Gold' | 'Diamond';
  totalEarnings: number;
  availableBalance: number;
  pendingBalance: number;
  salesCount: number;
  isEmailVerified: boolean;
  createdAt: string;
}

export interface CommissionPayout {
  affiliateEmail: string;
  affiliateName: string;
  level: number; // 1 to 5, or 99 for Leadership
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

const AFFILIATES_COLLECTION = 'affiliates';
const COMMISSIONS_COLLECTION = 'affiliate_commissions';

/**
 * Standard 5-level commission percentages (Total = 15%)
 */
export const UNILEVEL_RATES: Record<number, number> = {
  1: 0.08,  // 8.0% Direct Seller
  2: 0.035, // 3.5% Parent
  3: 0.02,  // 2.0% Grandparent
  4: 0.01,  // 1.0% Great-Grandparent
  5: 0.005  // 0.5% Level 5
};

/**
 * Leadership bonus rates (Differential override, max 5%)
 */
export const RANK_OVERRIDE_RATES: Record<string, number> = {
  Standard: 0.0,
  Silver: 0.01,   // +1%
  Gold: 0.02,     // +2%
  Diamond: 0.05   // +5% (Founder / Top tier)
};

/**
 * Helper to generate a unique short alphanumeric affiliate code
 */
export function generateAffiliateCode(name: string): string {
  const cleanName = name.replace(/[^a-zA-Z]/g, '').toUpperCase().slice(0, 5) || 'VR';
  const randomSuffix = Math.floor(100 + Math.random() * 900);
  return `${cleanName}${randomSuffix}`;
}

/**
 * Get an affiliate account by referral code
 */
export async function getAffiliateByCode(code: string): Promise<AffiliateAccount | null> {
  if (!code || !db) return null;
  const cleanCode = code.trim().toUpperCase();

  try {
    const q = query(
      collection(db, AFFILIATES_COLLECTION),
      where('referralCode', '==', cleanCode)
    );
    const snap = await getDocs(q);
    if (snap.empty) return null;
    const docData = snap.docs[0].data();
    return { id: snap.docs[0].id, ...docData } as AffiliateAccount;
  } catch (err) {
    console.warn('Error fetching affiliate by code:', err);
    return null;
  }
}

/**
 * Get an affiliate by email
 */
export async function getAffiliateByEmail(email: string): Promise<AffiliateAccount | null> {
  if (!email || !db) return null;
  const cleanEmail = email.trim().toLowerCase();

  try {
    const docRef = doc(db, AFFILIATES_COLLECTION, cleanEmail);
    const snap = await getDoc(docRef);
    if (!snap.exists()) return null;
    return { id: snap.id, ...snap.data() } as AffiliateAccount;
  } catch (err) {
    console.warn('Error fetching affiliate by email:', err);
    return null;
  }
}

/**
 * Register or update an affiliate in Firestore
 * Enforces email as ID and validates sponsor code
 */
export async function registerAffiliateInFirestore(params: {
  email: string;
  name: string;
  phone?: string;
  sponsorCode?: string;
}): Promise<AffiliateAccount> {
  if (!db) throw new Error('Database is not initialized');

  const cleanEmail = params.email.trim().toLowerCase();
  const existing = await getAffiliateByEmail(cleanEmail);
  if (existing) {
    return existing;
  }

  // Validate sponsor if provided
  let parentId: string | undefined = undefined;
  if (params.sponsorCode) {
    const sponsor = await getAffiliateByCode(params.sponsorCode);
    if (sponsor) {
      parentId = sponsor.email;
    }
  }

  const referralCode = generateAffiliateCode(params.name);

  const newAffiliate: AffiliateAccount = {
    id: cleanEmail,
    email: cleanEmail,
    name: params.name.trim(),
    phone: params.phone?.trim(),
    referralCode,
    sponsorCode: params.sponsorCode?.trim().toUpperCase(),
    parentId,
    rank: 'Standard',
    totalEarnings: 0,
    availableBalance: 0,
    pendingBalance: 0,
    salesCount: 0,
    isEmailVerified: false,
    createdAt: new Date().toISOString()
  };

  const docRef = doc(db, AFFILIATES_COLLECTION, cleanEmail);
  await setDoc(docRef, newAffiliate);

  return newAffiliate;
}

/**
 * Mathematical Commission Engine
 * 1. Traverses up to 5 levels of sponsors.
 * 2. Applies leadership differential bonus.
 * 3. STRICTLY guarantees that the sum of all payouts NEVER exceeds 20.00% of sale amount.
 */
export async function calculateAndDistributeCommissions(params: {
  bookingId: string;
  saleAmount: number;
  affiliateCode: string;
}): Promise<CommissionDistributionResult | null> {
  if (!db || !params.affiliateCode || params.saleAmount <= 0) return null;

  const directAffiliate = await getAffiliateByCode(params.affiliateCode);
  if (!directAffiliate) {
    console.log(`No affiliate matched code ${params.affiliateCode}`);
    return null;
  }

  const payouts: CommissionPayout[] = [];
  let currentAffiliate: AffiliateAccount | null = directAffiliate;
  let level = 1;
  let highestOverrideClaimed = 0;

  // 1. Traverse up to 5 levels
  while (currentAffiliate && level <= 5) {
    const rate = UNILEVEL_RATES[level] || 0;
    const amountUsd = Math.round(params.saleAmount * rate * 100) / 100;

    payouts.push({
      affiliateEmail: currentAffiliate.email,
      affiliateName: currentAffiliate.name,
      level,
      percentage: rate * 100,
      amountUsd,
      role: level === 1 ? 'Direct Seller' : `Level ${level} Uplink`
    });

    // Check leadership differential
    const rankRate = RANK_OVERRIDE_RATES[currentAffiliate.rank] || 0;
    if (rankRate > highestOverrideClaimed) {
      const differentialRate = rankRate - highestOverrideClaimed;
      const diffAmount = Math.round(params.saleAmount * differentialRate * 100) / 100;
      
      if (diffAmount > 0) {
        payouts.push({
          affiliateEmail: currentAffiliate.email,
          affiliateName: currentAffiliate.name,
          level: 99, // Special leadership level
          percentage: differentialRate * 100,
          amountUsd: diffAmount,
          role: `Leadership Bonus (${currentAffiliate.rank} Override)`
        });
        highestOverrideClaimed = rankRate;
      }
    }

    // Step up to parent
    if (currentAffiliate.parentId) {
      currentAffiliate = await getAffiliateByEmail(currentAffiliate.parentId);
      level++;
    } else {
      break;
    }
  }

  // 2. MATHEMATICAL 20% CAP ENFORCEMENT
  const MAX_ALLOWED_COMMISSION = params.saleAmount * 0.20;
  let totalCalculated = payouts.reduce((acc, p) => acc + p.amountUsd, 0);

  if (totalCalculated > MAX_ALLOWED_COMMISSION) {
    console.warn(`Commission sum ($${totalCalculated}) exceeded 20% cap ($${MAX_ALLOWED_COMMISSION}). Scaling proportionally.`);
    const scaleFactor = MAX_ALLOWED_COMMISSION / totalCalculated;
    payouts.forEach((p) => {
      p.amountUsd = Math.round(p.amountUsd * scaleFactor * 100) / 100;
    });
    totalCalculated = payouts.reduce((acc, p) => acc + p.amountUsd, 0);
  }

  // 3. Persist payouts and increment balances in Firestore
  try {
    for (const payout of payouts) {
      const affDoc = doc(db, AFFILIATES_COLLECTION, payout.affiliateEmail);
      await updateDoc(affDoc, {
        totalEarnings: increment(payout.amountUsd),
        availableBalance: increment(payout.amountUsd),
        salesCount: payout.level === 1 ? increment(1) : increment(0)
      });

      await addDoc(collection(db, COMMISSIONS_COLLECTION), {
        bookingId: params.bookingId,
        affiliateEmail: payout.affiliateEmail,
        affiliateName: payout.affiliateName,
        saleAmount: params.saleAmount,
        commissionAmount: payout.amountUsd,
        percentage: payout.percentage,
        level: payout.level,
        role: payout.role,
        status: 'credited',
        createdAt: new Date().toISOString()
      });
    }
  } catch (err) {
    console.error('Error recording affiliate commission transactions in Firestore:', err);
  }

  return {
    saleAmount: params.saleAmount,
    totalCommissionPaid: totalCalculated,
    totalPercentage: (totalCalculated / params.saleAmount) * 100,
    payouts,
    buyerDiscountAmount: Math.round(params.saleAmount * 0.10 * 100) / 100
  };
}
