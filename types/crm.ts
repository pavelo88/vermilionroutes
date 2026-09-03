export type UserRole = 'super' | 'admin' | 'operator' | 'editor' | 'affiliate';

export interface SystemUser {
  id: string; // Email as ID
  email: string;
  name: string;
  role: UserRole;
  roles?: UserRole[];
  authUid?: string;
  phone?: string;
  cedula?: string;
  address?: string;
  isActive: boolean;
  assignedLeadsCount?: number;
  assignedBookingsCount?: number;
  createdAt: string;
  updatedAt?: string;
}

export type LeadStatus = 'new' | 'contacted' | 'itinerary_sent' | 'negotiation' | 'won' | 'lost';

export interface CrmLead {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  country?: string;
  destination: string; // 'Galapagos' | 'Ecuador Andes' | 'Amazon' | 'Peru'
  passengersCount: number;
  estimatedBudget: number;
  travelDates?: string;
  status: LeadStatus;
  assignedOperatorId?: string; // email of operator
  assignedOperatorName?: string;
  notes?: string;
  source?: string; // 'landing_popup' | 'contact_form' | 'affiliate_referral'
  affiliateReferralCode?: string;
  createdAt: string;
  updatedAt: string;
}

export type BookingStatus = 'deposit_pending' | 'deposit_confirmed' | 'fully_paid' | 'in_operation' | 'completed' | 'cancelled';

export interface CrmBooking {
  id: string;
  bookingCode: string; // e.g. VR-2026-089
  tourTitle: string;
  destination: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  passengersCount: number;
  totalAmount: number;
  paidAmount: number;
  status: BookingStatus;
  travelStartDate: string;
  travelEndDate: string;
  assignedOperatorId?: string;
  assignedOperatorName?: string;
  // Commission info
  affiliateId?: string;
  affiliateCommissionAmount?: number;
  affiliateCommissionStatus?: 'pending' | 'ready_for_review' | 'paid';
  operatorCommissionAmount?: number;
  operatorCommissionStatus?: 'pending' | 'ready_for_review' | 'paid';
  paymentReference?: string;
  notes?: string;
  vipGiftAssigned?: string; // e.g. 'Pakari Grand Cru Experience'
  createdAt: string;
  updatedAt: string;
}

export interface CommissionPayoutRequest {
  id: string;
  bookingId: string;
  beneficiaryName: string;
  beneficiaryEmail: string;
  beneficiaryType: 'affiliate' | 'operator';
  amount: number;
  status: 'pending' | 'approved' | 'paid' | 'rejected';
  operatorSignaledBy?: string; // Operator who validated the trip took place
  paidAt?: string;
  paymentMethod?: string;
  transactionReference?: string;
  createdAt: string;
}
