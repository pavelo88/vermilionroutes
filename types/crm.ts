export type UserRole =
  | 'super'
  | 'admin'
  | 'operator'
  | 'sales'
  | 'financial'
  | 'concierge'
  | 'editor'
  | 'affiliate';

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

export interface PassengerProfile {
  fullName: string;
  passportNumber?: string;
  nationality?: string;
  birthDate?: string;
  dietaryRestrictions?: string; // 'vegano' | 'vegetariano' | 'celiaco' | 'ninguna'
  medicalNotes?: string;
  fitnessLevel?: 'relax' | 'moderado' | 'activo' | 'extremo';
  hatSize?: string; // para sombrero Montecristi
  shirtSize?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relation: string;
  };
}

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
  passengerDetails?: PassengerProfile;
  createdAt: string;
  updatedAt: string;
}

export type BookingStatus =
  | 'deposit_pending'
  | 'deposit_confirmed'
  | 'fully_paid'
  | 'in_operation'
  | 'completed'
  | 'cancelled';

export interface RunSheetDay {
  dayNumber: number;
  date: string;
  title: string;
  pickupTime?: string;
  driverName?: string;
  driverPhone?: string;
  vehiclePlate?: string;
  hotelName?: string;
  hotelConfirmation?: string;
  guideName?: string;
  guidePhone?: string;
  activitiesSummary: string;
  status: 'pending' | 'in_progress' | 'completed';
  notes?: string;
}

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
  directCosts?: number; // Costos de hoteles, yates, entradas
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
  vipGiftAssigned?: string; // e.g. 'Pakari Grand Cru & Sombrero Montecristi'
  vipGiftDelivered?: boolean;
  vipGiftDeliveredAt?: string;
  runSheet?: RunSheetDay[];
  passengersList?: PassengerProfile[];
  createdAt: string;
  updatedAt: string;
}

export interface CommissionPayoutRequest {
  id: string;
  bookingId: string;
  bookingCode?: string;
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

export interface PakariAmenityItem {
  id: string;
  bookingId: string;
  bookingCode: string;
  customerName: string;
  kitType: 'Oro' | 'Platino' | 'Galapagos Luxury';
  itemsDescription: string;
  assignedOperatorName: string;
  status: 'prepared' | 'dispatched' | 'delivered';
  deliveredAt?: string;
  notes?: string;
}

export interface WhatsAppTemplate {
  id: string;
  lang: 'es' | 'en' | 'de';
  category: 'welcome' | 'quote' | 'followup' | 'pre_trip' | 'emergency';
  title: string;
  body: string;
}

export interface GenealogyNode {
  username: string;
  name: string;
  email: string;
  level: number;
  rank: string;
  totalSales: number;
  recruitsCount: number;
  status: 'active' | 'inactive';
  children?: GenealogyNode[];
}
