export interface PricingDetails {
  basePricePerAdult: number;
  basePricePerChild: number;
  adultsCount: number;
  childrenCount: number;
  
  // Totals before discount
  adultsTotal: number;
  childrenTotal: number;
  subtotal: number;

  // Discounts
  groupDiscountPercentage: number;
  groupDiscountAmount: number;
  
  // Final
  total: number;
}

export function calculateTourPrice(
  basePrice: number,
  adults: number,
  children: number,
  date: string | null
): PricingDetails {
  // A child is generally cheaper (e.g. 20% off base price)
  const basePricePerChild = basePrice * 0.8;

  const adultsTotal = adults * basePrice;
  const childrenTotal = children * basePricePerChild;
  const subtotal = adultsTotal + childrenTotal;

  // Group Discount Logic:
  // 4 or more people (adults + children) -> 5% off
  // 8 or more people -> 10% off
  const totalPeople = adults + children;
  let groupDiscountPercentage = 0;
  
  if (totalPeople >= 8) {
    groupDiscountPercentage = 0.10;
  } else if (totalPeople >= 4) {
    groupDiscountPercentage = 0.05;
  }

  const groupDiscountAmount = subtotal * groupDiscountPercentage;
  const total = subtotal - groupDiscountAmount;

  return {
    basePricePerAdult: basePrice,
    basePricePerChild,
    adultsCount: adults,
    childrenCount: children,
    adultsTotal,
    childrenTotal,
    subtotal,
    groupDiscountPercentage,
    groupDiscountAmount,
    total
  };
}
