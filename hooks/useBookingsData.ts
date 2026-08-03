'use client';

import { useState, useEffect, useCallback } from 'react';
import { BookingRequest } from '@/types';
import {
  subscribeBookingsFromFirestore,
  updateBookingStatusInFirestore,
  deleteBookingFromFirestore
} from '@/lib/bookings';

export function useBookingsData() {
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isSubscribed = true;
    setLoading(true);

    const unsubscribe = subscribeBookingsFromFirestore(
      (data) => {
        if (!isSubscribed) return;
        setBookings(data);
        setLoading(false);
        setError(null);
      },
      (err) => {
        if (!isSubscribed) return;
        setError(err.message || 'Failed to load bookings');
        setLoading(false);
      }
    );

    return () => {
      isSubscribed = false;
      unsubscribe();
    };
  }, []);

  const updateStatus = useCallback(async (id: string, status: BookingRequest['status']) => {
    try {
      await updateBookingStatusInFirestore(id, status);
    } catch (err: any) {
      console.error('Failed to update booking status:', err);
      throw err;
    }
  }, []);

  const deleteBooking = useCallback(async (id: string) => {
    try {
      await deleteBookingFromFirestore(id);
    } catch (err: any) {
      console.error('Failed to delete booking:', err);
      throw err;
    }
  }, []);

  const pendingCount = bookings.filter((b) => b.status === 'pending').length;

  return {
    bookings,
    loading,
    error,
    pendingCount,
    updateStatus,
    deleteBooking
  };
}
