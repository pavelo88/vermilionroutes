// MOCK: Prisma types for compiler. In a real environment, import { PrismaClient } from '@prisma/client'
const prisma = {
  order: { findUnique: async (args: any) => ({} as any) },
  user: { findUnique: async (args: any) => ({} as any) },
};

export interface CommissionPayout {
  order_id: string;
  beneficiary_id: string | null; // null if company root
  amount: number;
  type: 'DIRECT' | 'NETWORK_UPLINE' | 'GLOBAL_POOL';
  status: 'PENDING' | 'AVAILABLE' | 'CLAWBACK';
  percentage: number;
}

/**
 * Calculates commissions for an order using the 50-30-15 Dynamic Compression Rule.
 * 
 * Rules:
 * - Level 0 (Seller or first active): 50%
 * - Level 1 (Next Active Upline): 30%
 * - Level 2 (Next Active Upline): 15%
 * - Leftover / Company Root: 5% (Plus any unassigned percentages if chain ends early).
 * 
 * @param orderId The UUID of the Order
 * @param totalNetworkProfit The base amount (VT) to calculate commissions from
 * @returns Array of exact payouts to be inserted into the database
 */
export async function calculateCommissions(
  orderId: string,
  totalNetworkProfit: number
): Promise<CommissionPayout[]> {
  const payouts: CommissionPayout[] = [];
  
  // 1. Fetch the Order to get the initial seller_id and status
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    select: { seller_id: true, status: true }
  });

  if (!order) {
    throw new Error(`Order ${orderId} not found in database.`);
  }

  // If order is already completed, commissions are instantly available.
  const commissionStatus = order.status === 'COMPLETED' ? 'AVAILABLE' : 'PENDING';

  // 2. Define the commission tiers
  const TIER_RATES = [
    { type: 'DIRECT', rate: 0.50 },          // First active node (ideally Seller)
    { type: 'NETWORK_UPLINE', rate: 0.30 },  // Second active node (Upline 1)
    { type: 'NETWORK_UPLINE', rate: 0.15 }   // Third active node (Upline 2)
  ] as const;

  let currentUserId: string | null = order.seller_id;
  let currentTierIndex = 0;
  let totalDistributedRate = 0;

  // 3. Traverse the sponsor tree for dynamic compression
  while (currentUserId && currentTierIndex < TIER_RATES.length) {
    const user = await prisma.user.findUnique({
      where: { id: currentUserId },
      select: { active_status: true, sponsor_id: true }
    });

    if (!user) break;

    // DYNAMIC COMPRESSION RULE:
    // Only assign the current tier if the user is 'ACTIVE'
    if (user.active_status) {
      const tier = TIER_RATES[currentTierIndex];
      const payoutAmount = totalNetworkProfit * tier.rate;

      payouts.push({
        order_id: orderId,
        beneficiary_id: currentUserId,
        amount: payoutAmount,
        type: tier.type,
        status: commissionStatus,
        percentage: tier.rate
      });

      totalDistributedRate += tier.rate;
      currentTierIndex++; // Move to the next tier since this one was filled
    }

    // If INACTIVE, the tier does not increment (bypassing them),
    // and we simply move to the sponsor (roll-up).
    currentUserId = user.sponsor_id;
  }

  // 4. Calculate leftover for Company Root / Global Pool
  // The base leftover is always 5% (1.0 - 0.5 - 0.3 - 0.15 = 0.05).
  // However, if the sponsor tree ended before filling all tiers, 
  // those unpaid percentages also roll up to the company root.
  const leftoverRate = Number((1.0 - totalDistributedRate).toFixed(2));
  
  if (leftoverRate > 0) {
    payouts.push({
      order_id: orderId,
      beneficiary_id: null, // null represents the Company Root / Global Pool
      amount: totalNetworkProfit * leftoverRate,
      type: 'GLOBAL_POOL',
      status: commissionStatus,
      percentage: leftoverRate
    });
  }

  return payouts;
}
