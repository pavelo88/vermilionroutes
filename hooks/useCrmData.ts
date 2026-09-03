'use client';

import { useState, useEffect, useCallback } from 'react';
import { db } from '@/lib/firebase';
import { collection, doc, getDocs, setDoc, updateDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { SystemUser, CrmLead, CrmBooking, CommissionPayoutRequest, UserRole } from '@/types/crm';

// Default initial data for instantaneous experience
const INITIAL_USERS: SystemUser[] = [
  {
    id: 'pablofgarciaf@gmail.com',
    email: 'pablofgarciaf@gmail.com',
    name: 'Pablo Fabricio García Flores',
    role: 'super',
    roles: ['super', 'admin', 'operator', 'editor'],
    authUid: 'DmwBje9JwvVJKbe5rr8ExCS823S2',
    phone: '+593983992549',
    cedula: '1721790721',
    address: 'Ecuador',
    isActive: true,
    assignedLeadsCount: 4,
    assignedBookingsCount: 3,
    createdAt: '2026-08-31T00:00:00.000Z',
  },
  {
    id: 'info@vermilionroutes.com',
    email: 'info@vermilionroutes.com',
    name: 'Vermilion Operations Lead',
    role: 'super',
    roles: ['super', 'admin', 'operator', 'editor'],
    phone: '+593994048458',
    isActive: true,
    assignedLeadsCount: 6,
    assignedBookingsCount: 5,
    createdAt: '2026-08-31T00:00:00.000Z',
  },
  {
    id: 'carlos.guia@vermilionroutes.com',
    email: 'carlos.guia@vermilionroutes.com',
    name: 'Carlos Mendoza (Senior Naturalist)',
    role: 'operator',
    roles: ['operator'],
    phone: '+593987654321',
    isActive: true,
    assignedLeadsCount: 3,
    assignedBookingsCount: 4,
    createdAt: '2026-09-01T00:00:00.000Z',
  },
  {
    id: 'sofia.sales@vermilionroutes.com',
    email: 'sofia.sales@vermilionroutes.com',
    name: 'Sofía Valdivieso (Travel Designer)',
    role: 'operator',
    roles: ['operator'],
    phone: '+593981122334',
    isActive: true,
    assignedLeadsCount: 5,
    assignedBookingsCount: 2,
    createdAt: '2026-09-01T00:00:00.000Z',
  }
];

const INITIAL_LEADS: CrmLead[] = [
  {
    id: 'lead-101',
    customerName: 'Alexander Wright',
    customerEmail: 'a.wright@luxvoyage.com',
    customerPhone: '+1 (415) 890-2341',
    country: 'United States',
    destination: 'Galapagos',
    passengersCount: 4,
    estimatedBudget: 14500,
    travelDates: '15 Oct - 22 Oct 2026',
    status: 'negotiation',
    assignedOperatorId: 'sofia.sales@vermilionroutes.com',
    assignedOperatorName: 'Sofía Valdivieso',
    notes: 'Interesados en Yate Privado y avistamiento de pingüinos. Requieren suite VIP.',
    source: 'affiliate_referral',
    affiliateReferralCode: 'pablo.g',
    createdAt: '2026-09-01T14:30:00.000Z',
    updatedAt: '2026-09-02T10:00:00.000Z',
  },
  {
    id: 'lead-102',
    customerName: 'Dr. Evelyn Dubois',
    customerEmail: 'e.dubois@sorbonne.fr',
    customerPhone: '+33 6 12 34 56 78',
    country: 'France',
    destination: 'Amazon & Andes',
    passengersCount: 2,
    estimatedBudget: 8200,
    travelDates: '05 Nov - 14 Nov 2026',
    status: 'itinerary_sent',
    assignedOperatorId: 'carlos.guia@vermilionroutes.com',
    assignedOperatorName: 'Carlos Mendoza',
    notes: 'Bióloga interesada en expedición de avistamiento de aves y flora endémica.',
    source: 'landing_popup',
    createdAt: '2026-09-02T08:15:00.000Z',
    updatedAt: '2026-09-02T12:00:00.000Z',
  },
  {
    id: 'lead-103',
    customerName: 'Marcus & Helena Lindqvist',
    customerEmail: 'm.lindqvist@nordicfunds.se',
    customerPhone: '+46 8 123 456',
    country: 'Sweden',
    destination: 'Galapagos & Cotopaxi',
    passengersCount: 2,
    estimatedBudget: 12000,
    travelDates: '20 Dic - 30 Dic 2026',
    status: 'new',
    assignedOperatorId: 'pablofgarciaf@gmail.com',
    assignedOperatorName: 'Pablo Fabricio García',
    notes: 'Viaje de luna de miel. Buscan lodges de lujo y regalo de bienvenida Pakari.',
    source: 'contact_form',
    createdAt: '2026-09-02T16:00:00.000Z',
    updatedAt: '2026-09-02T16:00:00.000Z',
  },
];

const INITIAL_BOOKINGS: CrmBooking[] = [
  {
    id: 'book-501',
    bookingCode: 'VR-2026-042',
    tourTitle: 'Galapagos Ultimate Expedition: 8 Days Luxury Safari',
    destination: 'Galapagos - Santa Cruz & Isabela',
    customerName: 'Robert Vance Jr.',
    customerEmail: 'rvance@vancerefrigeration.com',
    customerPhone: '+1 212 555 0192',
    passengersCount: 2,
    totalAmount: 11800,
    paidAmount: 500,
    status: 'deposit_confirmed',
    travelStartDate: '2026-10-10',
    travelEndDate: '2026-10-18',
    assignedOperatorId: 'sofia.sales@vermilionroutes.com',
    assignedOperatorName: 'Sofía Valdivieso',
    affiliateId: 'pablo.g',
    affiliateCommissionAmount: 1180, // 10%
    affiliateCommissionStatus: 'ready_for_review',
    operatorCommissionAmount: 250,
    operatorCommissionStatus: 'pending',
    paymentReference: 'STRIPE_DEP_9921',
    vipGiftAssigned: 'Pakari Imperial Edition & Café de Altura Loja',
    notes: 'Depósito de $500 confirmado vía Stripe. Saldo restante vence el 25 de septiembre.',
    createdAt: '2026-08-30T10:00:00.000Z',
    updatedAt: '2026-09-02T14:00:00.000Z',
  },
  {
    id: 'book-502',
    bookingCode: 'VR-2026-043',
    tourTitle: 'Ecuador Avenue of the Volcanoes & Colonial Haciendas',
    destination: 'Quito, Cotopaxi & Baños',
    customerName: 'Beatriz & Fernando Moreira',
    customerEmail: 'f.moreira@gruposantos.br',
    customerPhone: '+55 11 98765-4321',
    passengersCount: 4,
    totalAmount: 10104,
    paidAmount: 10104,
    status: 'fully_paid',
    travelStartDate: '2026-09-18',
    travelEndDate: '2026-09-28',
    assignedOperatorId: 'carlos.guia@vermilionroutes.com',
    assignedOperatorName: 'Carlos Mendoza',
    affiliateId: 'pablo.g',
    affiliateCommissionAmount: 1010,
    affiliateCommissionStatus: 'paid',
    operatorCommissionAmount: 300,
    operatorCommissionStatus: 'ready_for_review',
    paymentReference: 'WIRE_TRANS_PICHINCHA_8821',
    vipGiftAssigned: 'Caja Regalo Premium Pakari 100% Cacao Fino de Aroma',
    notes: 'Pago 100% verificado en Banco Pichincha. Operador Carlos asignado para recogida en Aeropuerto UIO.',
    createdAt: '2026-08-28T12:00:00.000Z',
    updatedAt: '2026-09-01T18:00:00.000Z',
  },
];

export function useCrmData() {
  const [users, setUsers] = useState<SystemUser[]>(INITIAL_USERS);
  const [leads, setLeads] = useState<CrmLead[]>(INITIAL_LEADS);
  const [bookings, setBookings] = useState<CrmBooking[]>(INITIAL_BOOKINGS);
  const [loading, setLoading] = useState(false);

  // Sync with Firestore if available
  useEffect(() => {
    let unsubscribeUsers: (() => void) | undefined;
    let unsubscribeLeads: (() => void) | undefined;
    let unsubscribeBookings: (() => void) | undefined;

    try {
      // 1. Listen to 'usuarios'
      const usersCol = collection(db, 'usuarios');
      unsubscribeUsers = onSnapshot(usersCol, (snap) => {
        if (!snap.empty) {
          const list: SystemUser[] = [];
          snap.forEach((d) => list.push({ ...(d.data() as SystemUser), id: d.id }));
          setUsers(list);
        }
      }, (err) => {
        console.warn('Firestore usuarios listener notice (using local mirror):', err.message);
      });

      // 2. Listen to 'crm_leads' or 'leads'
      const leadsCol = collection(db, 'leads');
      unsubscribeLeads = onSnapshot(leadsCol, (snap) => {
        if (!snap.empty) {
          const list: CrmLead[] = [];
          snap.forEach((d) => list.push({ ...(d.data() as CrmLead), id: d.id }));
          setLeads(list);
        }
      }, (err) => {
        console.warn('Firestore leads listener notice:', err.message);
      });

      // 3. Listen to 'bookings'
      const bookingsCol = collection(db, 'bookings');
      unsubscribeBookings = onSnapshot(bookingsCol, (snap) => {
        if (!snap.empty) {
          const list: CrmBooking[] = [];
          snap.forEach((d) => list.push({ ...(d.data() as CrmBooking), id: d.id }));
          setBookings(list);
        }
      }, (err) => {
        console.warn('Firestore bookings listener notice:', err.message);
      });

    } catch (e) {
      console.warn('Error setting up CRM listeners:', e);
    }

    return () => {
      unsubscribeUsers && unsubscribeUsers();
      unsubscribeLeads && unsubscribeLeads();
      unsubscribeBookings && unsubscribeBookings();
    };
  }, []);

  // Actions
  const createUser = useCallback(async (newUser: Omit<SystemUser, 'createdAt'>) => {
    const userDoc: SystemUser = {
      ...newUser,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      await setDoc(doc(db, 'usuarios', userDoc.id), userDoc, { merge: true });
    } catch (err) {
      console.warn('Could not write directly to Firestore (saving to local state):', err);
    }

    setUsers((prev) => {
      const idx = prev.findIndex((u) => u.id === userDoc.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = userDoc;
        return next;
      }
      return [userDoc, ...prev];
    });

    return userDoc;
  }, []);

  const updateLeadStatus = useCallback(async (leadId: string, status: CrmLead['status'], assignedOperator?: { id: string; name: string }) => {
    const updateData: Partial<CrmLead> = {
      status,
      updatedAt: new Date().toISOString(),
    };
    if (assignedOperator) {
      updateData.assignedOperatorId = assignedOperator.id;
      updateData.assignedOperatorName = assignedOperator.name;
    }

    try {
      await updateDoc(doc(db, 'leads', leadId), updateData);
    } catch (err) {
      console.warn('Firestore update notice:', err);
    }

    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, ...updateData } : l))
    );
  }, []);

  const updateBookingStatus = useCallback(async (bookingId: string, status: CrmBooking['status']) => {
    const updateData = {
      status,
      updatedAt: new Date().toISOString(),
    };

    try {
      await updateDoc(doc(db, 'bookings', bookingId), updateData);
    } catch (err) {
      console.warn('Firestore update notice:', err);
    }

    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, ...updateData } : b))
    );
  }, []);

  const approveAndPayCommission = useCallback(async (bookingId: string, type: 'affiliate' | 'operator', reference: string) => {
    const updateData: Partial<CrmBooking> = {
      updatedAt: new Date().toISOString(),
    };

    if (type === 'affiliate') {
      updateData.affiliateCommissionStatus = 'paid';
    } else {
      updateData.operatorCommissionStatus = 'paid';
    }
    updateData.paymentReference = reference;

    try {
      await updateDoc(doc(db, 'bookings', bookingId), updateData);
    } catch (err) {
      console.warn('Firestore update notice:', err);
    }

    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, ...updateData } : b))
    );
  }, []);

  const signalCommissionReady = useCallback(async (bookingId: string, type: 'operator' | 'affiliate') => {
    const updateData: Partial<CrmBooking> = {
      updatedAt: new Date().toISOString(),
    };
    if (type === 'operator') {
      updateData.operatorCommissionStatus = 'ready_for_review';
    } else {
      updateData.affiliateCommissionStatus = 'ready_for_review';
    }

    try {
      await updateDoc(doc(db, 'bookings', bookingId), updateData);
    } catch (err) {
      console.warn('Firestore update notice:', err);
    }

    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, ...updateData } : b))
    );
  }, []);

  const assignVipGift = useCallback(async (bookingId: string, giftName: string) => {
    const updateData = {
      vipGiftAssigned: giftName,
      updatedAt: new Date().toISOString(),
    };

    try {
      await updateDoc(doc(db, 'bookings', bookingId), updateData);
    } catch (err) {
      console.warn('Firestore update notice:', err);
    }

    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, ...updateData } : b))
    );
  }, []);

  return {
    users,
    leads,
    bookings,
    loading,
    createUser,
    updateLeadStatus,
    updateBookingStatus,
    approveAndPayCommission,
    signalCommissionReady,
    assignVipGift,
  };
}
