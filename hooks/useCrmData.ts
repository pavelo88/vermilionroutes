'use client';

import { useState, useEffect, useCallback } from 'react';
import { db } from '@/lib/firebase';
import { collection, doc, getDocs, setDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import {
  SystemUser,
  CrmLead,
  CrmBooking,
  RunSheetDay,
  PassengerProfile,
  UserRole,
  PakariAmenityItem,
  WhatsAppTemplate,
  GenealogyNode,
} from '@/types/crm';

// Default initial corporate users
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
    role: 'sales',
    roles: ['sales'],
    phone: '+593981122334',
    isActive: true,
    assignedLeadsCount: 5,
    assignedBookingsCount: 2,
    createdAt: '2026-09-01T00:00:00.000Z',
  },
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
    passengerDetails: {
      fullName: 'Alexander Wright',
      passportNumber: 'US-98234102',
      nationality: 'American',
      dietaryRestrictions: 'Sin mariscos (alergia severa)',
      fitnessLevel: 'moderado',
      hatSize: '58 (M)',
    },
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
    passengerDetails: {
      fullName: 'Dr. Evelyn Dubois',
      nationality: 'French',
      dietaryRestrictions: 'Vegetariana',
      fitnessLevel: 'activo',
      hatSize: '56 (S)',
    },
    createdAt: '2026-09-02T08:15:00.000Z',
    updatedAt: '2026-09-02T12:00:00.000Z',
  },
  {
    id: 'lead-103',
    customerName: 'Marcus von Berg',
    customerEmail: 'm.berg@munich-wealth.de',
    customerPhone: '+49 89 2314 990',
    country: 'Germany',
    destination: 'Galapagos & Choco Andino',
    passengersCount: 2,
    estimatedBudget: 19800,
    travelDates: '12 Dec - 23 Dec 2026',
    status: 'new',
    assignedOperatorId: 'sofia.sales@vermilionroutes.com',
    assignedOperatorName: 'Sofía Valdivieso',
    notes: 'Solicitó cotización con chárter aéreo privado entre Quito y Baltra.',
    source: 'affiliate_referral',
    affiliateReferralCode: 'pablo.g',
    createdAt: '2026-09-03T09:00:00.000Z',
    updatedAt: '2026-09-03T09:00:00.000Z',
  },
];

const INITIAL_BOOKINGS: CrmBooking[] = [
  {
    id: 'book-501',
    bookingCode: 'VR-2026-089',
    tourTitle: 'Galapagos Luxury Island Hopping & Private Yacht',
    destination: 'Galapagos Islands',
    customerName: 'Lord & Lady Harrington',
    customerEmail: 'harrington@monor-holdings.co.uk',
    customerPhone: '+44 20 7946 0912',
    passengersCount: 2,
    totalAmount: 11800,
    paidAmount: 5000,
    directCosts: 6800, // Margen $5,000 bruto
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
    vipGiftAssigned: 'Pakari Imperial Edition & Sombrero Montecristi',
    vipGiftDelivered: false,
    notes: 'Depósito confirmado vía Stripe. Saldo restante vence el 25 de septiembre.',
    passengersList: [
      {
        fullName: 'Arthur Harrington',
        passportNumber: 'GB-77123984',
        nationality: 'British',
        dietaryRestrictions: 'Ninguna',
        fitnessLevel: 'moderado',
        hatSize: '59 (L)',
      },
      {
        fullName: 'Eleanor Harrington',
        passportNumber: 'GB-77123985',
        nationality: 'British',
        dietaryRestrictions: 'Celiaco (Gluten Free estricto)',
        fitnessLevel: 'relax',
        hatSize: '56 (S)',
      },
    ],
    runSheet: [
      {
        dayNumber: 1,
        date: '2026-10-10',
        title: 'Arribo a Baltra & Transfer VIP a Santa Cruz',
        pickupTime: '11:45 AM (Vuelo AV-1632)',
        driverName: 'Joffre Tenelema',
        driverPhone: '+593 99 123 4567',
        vehiclePlate: 'GAL-1022',
        hotelName: 'Finch Bay Galapagos Hotel',
        hotelConfirmation: 'FB-9923-VIP',
        guideName: 'Carlos Mendoza',
        guidePhone: '+593 98 765 4321',
        activitiesSummary: 'Recepción VIP en sala Baltra, cruce de canal de Itabaca y almuerzo gourmet en Los Gemelos.',
        status: 'pending',
      },
      {
        dayNumber: 2,
        date: '2026-10-11',
        title: 'Navegación Exclusiva a Isla Bartolomé',
        pickupTime: '06:00 AM',
        guideName: 'Carlos Mendoza',
        activitiesSummary: 'Pinnacle Rock, snorkel con pingüinos de Galápagos y tiburones de arrecife.',
        status: 'pending',
      },
    ],
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
    directCosts: 5900,
    status: 'in_operation',
    travelStartDate: '2026-09-01',
    travelEndDate: '2026-09-10',
    assignedOperatorId: 'carlos.guia@vermilionroutes.com',
    assignedOperatorName: 'Carlos Mendoza',
    affiliateId: 'pablo.g',
    affiliateCommissionAmount: 1010,
    affiliateCommissionStatus: 'paid',
    operatorCommissionAmount: 300,
    operatorCommissionStatus: 'ready_for_review',
    paymentReference: 'WIRE_TRANS_PICHINCHA_8821',
    vipGiftAssigned: 'Caja Regalo Premium Pakari 100% Cacao Fino de Aroma',
    vipGiftDelivered: true,
    vipGiftDeliveredAt: '2026-09-01T15:30:00Z',
    notes: 'Pago 100% verificado en Banco Pichincha. En curso por Cotopaxi.',
    passengersList: [
      {
        fullName: 'Fernando Moreira',
        nationality: 'Brazilian',
        dietaryRestrictions: 'Ninguna',
        fitnessLevel: 'activo',
        hatSize: '58 (M)',
      },
    ],
    runSheet: [
      {
        dayNumber: 1,
        date: '2026-09-01',
        title: 'Pick-up en Aeropuerto Mariscal Sucre (UIO)',
        pickupTime: '14:20 PM',
        driverName: 'Fausto Guaygua',
        driverPhone: '+593 99 888 7777',
        vehiclePlate: 'PBY-4432',
        hotelName: 'Casa Gangotena Relais & Châteaux',
        hotelConfirmation: 'CG-8812',
        guideName: 'Carlos Mendoza',
        activitiesSummary: 'Pick-up VIP y entrega de Kit Pakari de bienvenida. Cena maridaje en Centro Histórico.',
        status: 'completed',
      },
      {
        dayNumber: 2,
        date: '2026-09-02',
        title: 'Ascenso a Volcán Cotopaxi & Hacienda San Agustín',
        pickupTime: '08:00 AM',
        driverName: 'Fausto Guaygua',
        hotelName: 'Hacienda San Agustín de Callo',
        guideName: 'Carlos Mendoza',
        activitiesSummary: 'Caminata a Refugio José Rivas 4,864m y almuerzo andino entre muros incásicos.',
        status: 'in_progress',
      },
    ],
    createdAt: '2026-08-28T12:00:00.000Z',
    updatedAt: '2026-09-01T18:00:00.000Z',
  },
];

const INITIAL_WHATSAPP_TEMPLATES: WhatsAppTemplate[] = [
  {
    id: 'wa-1',
    lang: 'es',
    category: 'welcome',
    title: 'Bienvenida & Primer Contacto',
    body: '¡Hola {nombre}! ✨ Soy {concierge} de Vermilion Routes Ecuador. Hemos recibido tu solicitud para explorar {destino}. Estamos diseñando una propuesta exclusiva y a tu medida. ¿Tienes 5 minutos para una breve llamada o prefieres que te enviemos el itinerario en PDF por aquí?',
  },
  {
    id: 'wa-2',
    lang: 'es',
    category: 'quote',
    title: 'Envío de Cotización VIP',
    body: 'Estimado/a {nombre}, es un placer compartir contigo el diseño preliminar de tu expedición privada "{tour}". Incluye alojamientos boutique seleccionados, chofer privado y concierge en ruta. Puedes ver los detalles aquí: {link}. Quedo muy atento a cualquier ajuste.',
  },
  {
    id: 'wa-3',
    lang: 'en',
    category: 'welcome',
    title: 'Welcome & Initial Touch',
    body: 'Hello {nombre}! ✨ This is {concierge} with Vermilion Routes Ecuador. We received your private inquiry for {destino}. We are currently curating your bespoke itinerary. Would you prefer to review the proposal via PDF here or schedule a 10-minute discovery call?',
  },
  {
    id: 'wa-4',
    lang: 'de',
    category: 'welcome',
    title: 'Willkommen & Erstkontakt',
    body: 'Guten Tag {nombre}! ✨ Mein Name ist {concierge} von Vermilion Routes Ecuador. Wir haben Ihre Anfrage für {destino} erhalten und bereiten Ihre maßgeschneiderte Luxusexpedition vor. Wir freuen uns sehr darauf, Ihre Traumreise zu gestalten.',
  },
];

const INITIAL_GENEALOGY: GenealogyNode = {
  username: 'pablo.g',
  name: 'Pablo Fabricio García (Founder)',
  email: 'pablofgarciaf@gmail.com',
  level: 0,
  rank: 'Founder & Root',
  totalSales: 32000,
  recruitsCount: 4,
  status: 'active',
  children: [
    {
      username: 'maria.luxury',
      name: 'María Alejandra Gómez',
      email: 'maria.lux@travelpartners.com',
      level: 1,
      rank: 'Empresario',
      totalSales: 18400,
      recruitsCount: 2,
      status: 'active',
      children: [
        {
          username: 'juan.tours',
          name: 'Juan Carlos Rivas',
          email: 'jc.rivas@expeditions.ec',
          level: 2,
          rank: 'Ejecutivo',
          totalSales: 9200,
          recruitsCount: 0,
          status: 'active',
        },
      ],
    },
    {
      username: 'andres.advisor',
      name: 'Andrés Villacís',
      email: 'andres@andesroutes.com',
      level: 1,
      rank: 'Líder',
      totalSales: 7500,
      recruitsCount: 1,
      status: 'active',
    },
  ],
};

export function useCrmData() {
  const [users, setUsers] = useState<SystemUser[]>(INITIAL_USERS);
  const [leads, setLeads] = useState<CrmLead[]>(INITIAL_LEADS);
  const [bookings, setBookings] = useState<CrmBooking[]>(INITIAL_BOOKINGS);
  const [waTemplates] = useState<WhatsAppTemplate[]>(INITIAL_WHATSAPP_TEMPLATES);
  const [genealogy] = useState<GenealogyNode>(INITIAL_GENEALOGY);
  const [loading, setLoading] = useState(false);

  // Firestore Synchronization
  useEffect(() => {
    let unsubscribeUsers: (() => void) | undefined;
    let unsubscribeLeads: (() => void) | undefined;
    let unsubscribeBookings: (() => void) | undefined;

    try {
      if (db) {
        const usersCol = collection(db, 'usuarios');
        unsubscribeUsers = onSnapshot(usersCol, (snap) => {
          if (!snap.empty) {
            const list: SystemUser[] = [];
            snap.forEach((d) => list.push({ ...(d.data() as SystemUser), id: d.id }));
            setUsers(list);
          }
        }, (err) => console.warn('[useCrmData] usuarios notice:', err.message));

        const leadsCol = collection(db, 'leads');
        unsubscribeLeads = onSnapshot(leadsCol, (snap) => {
          if (!snap.empty) {
            const list: CrmLead[] = [];
            snap.forEach((d) => list.push({ ...(d.data() as CrmLead), id: d.id }));
            setLeads(list);
          }
        }, (err) => console.warn('[useCrmData] leads notice:', err.message));

        const bookingsCol = collection(db, 'bookings');
        unsubscribeBookings = onSnapshot(bookingsCol, (snap) => {
          if (!snap.empty) {
            const list: CrmBooking[] = [];
            snap.forEach((d) => list.push({ ...(d.data() as CrmBooking), id: d.id }));
            setBookings(list);
          }
        }, (err) => console.warn('[useCrmData] bookings notice:', err.message));
      }
    } catch (e) {
      console.warn('[useCrmData] Firestore init notice:', e);
    }

    return () => {
      if (unsubscribeUsers) unsubscribeUsers();
      if (unsubscribeLeads) unsubscribeLeads();
      if (unsubscribeBookings) unsubscribeBookings();
    };
  }, []);

  // Update Lead Status
  const updateLeadStatus = useCallback(async (leadId: string, newStatus: CrmLead['status']) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: newStatus, updatedAt: new Date().toISOString() } : l))
    );
    if (db) {
      try {
        await updateDoc(doc(db, 'leads', leadId), { status: newStatus, updatedAt: new Date().toISOString() });
      } catch (err) {
        console.warn('Could not sync lead status to firestore:', err);
      }
    }
  }, []);

  // Assign Operator to Booking
  const assignOperatorToBooking = useCallback(async (bookingId: string, operatorEmail: string, operatorName: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, assignedOperatorId: operatorEmail, assignedOperatorName: operatorName, updatedAt: new Date().toISOString() } : b))
    );
    if (db) {
      try {
        await updateDoc(doc(db, 'bookings', bookingId), {
          assignedOperatorId: operatorEmail,
          assignedOperatorName: operatorName,
          updatedAt: new Date().toISOString(),
        });
      } catch (err) {
        console.warn('Could not sync operator assignment to firestore:', err);
      }
    }
  }, []);

  // Operator Signals Trip Completed
  const signalTripCompleted = useCallback(async (bookingId: string, operatorName: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? {
        ...b,
        status: 'completed',
        operatorCommissionStatus: 'ready_for_review',
        affiliateCommissionStatus: b.affiliateCommissionStatus === 'paid' ? 'paid' : 'ready_for_review',
        updatedAt: new Date().toISOString(),
      } : b))
    );
    if (db) {
      try {
        await updateDoc(doc(db, 'bookings', bookingId), {
          status: 'completed',
          operatorCommissionStatus: 'ready_for_review',
          updatedAt: new Date().toISOString(),
        });
      } catch (err) {
        console.warn('Could not sync trip completion to firestore:', err);
      }
    }
  }, []);

  // Admin approves & marks commission as paid with bank reference
  const approveAndPayCommission = useCallback(async (
    bookingId: string,
    beneficiaryType: 'affiliate' | 'operator',
    paymentRef: string
  ) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId) return b;
        return {
          ...b,
          affiliateCommissionStatus: beneficiaryType === 'affiliate' ? 'paid' : b.affiliateCommissionStatus,
          operatorCommissionStatus: beneficiaryType === 'operator' ? 'paid' : b.operatorCommissionStatus,
          paymentReference: paymentRef,
          updatedAt: new Date().toISOString(),
        };
      })
    );
    if (db) {
      try {
        const updatePayload: any = {
          paymentReference: paymentRef,
          updatedAt: new Date().toISOString(),
        };
        if (beneficiaryType === 'affiliate') updatePayload.affiliateCommissionStatus = 'paid';
        if (beneficiaryType === 'operator') updatePayload.operatorCommissionStatus = 'paid';
        await updateDoc(doc(db, 'bookings', bookingId), updatePayload);
      } catch (err) {
        console.warn('Could not sync commission payment to firestore:', err);
      }
    }
  }, []);

  // Mark Pakari Amenity Delivered
  const markPakariDelivered = useCallback(async (bookingId: string, operatorName: string) => {
    const now = new Date().toISOString();
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId ? { ...b, vipGiftDelivered: true, vipGiftDeliveredAt: now, updatedAt: now } : b
      )
    );
    if (db) {
      try {
        await updateDoc(doc(db, 'bookings', bookingId), {
          vipGiftDelivered: true,
          vipGiftDeliveredAt: now,
          updatedAt: now,
        });
      } catch (err) {
        console.warn('Could not sync amenity delivery to firestore:', err);
      }
    }
  }, []);

  // Update RunSheet Day Status
  const updateRunSheetDayStatus = useCallback(async (
    bookingId: string,
    dayNumber: number,
    newStatus: RunSheetDay['status'],
    notes?: string
  ) => {
    const now = new Date().toISOString();
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId || !b.runSheet) return b;
        const updatedRunSheet = b.runSheet.map((d) =>
          d.dayNumber === dayNumber ? { ...d, status: newStatus, notes: notes || d.notes } : d
        );
        return { ...b, runSheet: updatedRunSheet, updatedAt: now };
      })
    );
  }, []);

  // Create new user in 'usuarios'
  const createSystemUser = useCallback(async (newUser: Omit<SystemUser, 'createdAt'>) => {
    const userDoc: SystemUser = {
      ...newUser,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setUsers((prev) => [...prev.filter((u) => u.email !== userDoc.email), userDoc]);
    if (db) {
      try {
        await setDoc(doc(db, 'usuarios', userDoc.email.toLowerCase().trim()), userDoc);
      } catch (err) {
        console.error('Error creating user in firestore:', err);
        throw err;
      }
    }
    return userDoc;
  }, []);

  // Update Booking Status
  const updateBookingStatus = useCallback(async (bookingId: string, newStatus: CrmBooking['status']) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus, updatedAt: new Date().toISOString() } : b))
    );
    if (db) {
      try {
        await updateDoc(doc(db, 'bookings', bookingId), { status: newStatus, updatedAt: new Date().toISOString() });
      } catch (err) {
        console.warn('Could not sync booking status to firestore:', err);
      }
    }
  }, []);

  return {
    users,
    leads,
    bookings,
    waTemplates,
    genealogy,
    loading,
    updateLeadStatus,
    updateBookingStatus,
    assignOperatorToBooking,
    signalTripCompleted,
    approveAndPayCommission,
    markPakariDelivered,
    updateRunSheetDayStatus,
    createSystemUser,
  };
}
