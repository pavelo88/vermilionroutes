import { db } from './firebase';
import {
  collection,
  doc,
  addDoc,
  setDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  updateDoc
} from 'firebase/firestore';
import { BookingRequest } from '@/types';
import { sanitizeText, isValidEmail, isValidPhone } from './validation';

const BOOKINGS_COLLECTION = 'bookings';

/**
 * Creates a new booking in Firestore after sanitizing fields.
 */
export async function createBookingInFirestore(
  bookingData: Omit<BookingRequest, 'id' | 'status' | 'createdAt'> & { status?: BookingRequest['status'] }
): Promise<string> {
  const sanitizedName = sanitizeText(bookingData.customerName);
  const sanitizedEmail = sanitizeText(bookingData.customerEmail);
  const sanitizedPhone = sanitizeText(bookingData.customerPhone);
  const sanitizedMessage = sanitizeText(bookingData.message || '');
  const sanitizedTourTitle = sanitizeText(bookingData.tourTitle);
  const sanitizedTourId = sanitizeText(bookingData.tourId);
  const sanitizedDestination = sanitizeText(bookingData.destination || '');
  const sanitizedTravelDates = sanitizeText(bookingData.travelDates || '');
  const sanitizedGuestsCount = sanitizeText(bookingData.guestsCount || '');

  if (!sanitizedName || sanitizedName.length < 2) {
    throw new Error('Customer name is required and must be at least 2 characters.');
  }

  if (!isValidEmail(sanitizedEmail)) {
    throw new Error('Please enter a valid email address.');
  }

  if (sanitizedPhone && !isValidPhone(sanitizedPhone)) {
    throw new Error('Please enter a valid phone number (e.g. +1 555 000 0000).');
  }

  const payload: BookingRequest = {
    refCode: bookingData.refCode || `VR-${Date.now().toString().slice(-6)}`,
    tourId: sanitizedTourId,
    tourTitle: sanitizedTourTitle,
    customerName: sanitizedName,
    customerEmail: sanitizedEmail,
    customerPhone: sanitizedPhone,
    travelDates: sanitizedTravelDates,
    guestsCount: sanitizedGuestsCount,
    destination: sanitizedDestination,
    message: sanitizedMessage,
    amountPaid: bookingData.amountPaid,
    paymentMethod: bookingData.paymentMethod,
    paymentStatus: bookingData.paymentStatus || 'pending_verification',
    transferRef: bookingData.transferRef,
    affiliateCode: bookingData.affiliateCode,
    discountApplied: bookingData.discountApplied,
    receiptUrl: bookingData.receiptUrl,
    status: bookingData.status || (bookingData.paymentStatus === 'confirmed' ? 'confirmed' : 'pending'),
    createdAt: new Date().toISOString()
  };

  const bookingsRef = collection(db, BOOKINGS_COLLECTION);
  const docRef = await addDoc(bookingsRef, payload);
  return docRef.id;
}

/**
 * Subscribes to real-time updates for the `bookings` collection in Firestore (Admin access).
 */
export function subscribeBookingsFromFirestore(
  onUpdate: (bookings: BookingRequest[]) => void,
  onError?: (err: Error) => void
): () => void {
  if (typeof window === 'undefined' || !db) {
    onUpdate([]);
    return () => {};
  }

  try {
    const bookingsRef = collection(db, BOOKINGS_COLLECTION);
    const q = query(bookingsRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const bookings: BookingRequest[] = [];
        snapshot.forEach((docSnap) => {
          bookings.push({ id: docSnap.id, ...docSnap.data() } as BookingRequest);
        });
        onUpdate(bookings);
      },
      (err) => {
        console.warn('Firestore bookings subscription error:', err);
        if (onError) onError(err);
      }
    );
    return unsubscribe;
  } catch (err: any) {
    console.warn('Failed to subscribe to Firestore bookings:', err);
    if (onError) onError(err);
    return () => {};
  }
}

/**
 * Updates status of a booking request (e.g., 'contacted', 'confirmed', 'cancelled').
 */
export async function updateBookingStatusInFirestore(
  id: string,
  status: BookingRequest['status']
): Promise<void> {
  const docRef = doc(db, BOOKINGS_COLLECTION, id);
  await updateDoc(docRef, { status });
}

/**
 * Deletes a booking document from Firestore.
 */
export async function deleteBookingFromFirestore(id: string): Promise<void> {
  const docRef = doc(db, BOOKINGS_COLLECTION, id);
  await deleteDoc(docRef);
}
