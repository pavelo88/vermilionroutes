'use client';

import React, { useState } from 'react';
import { BookingRequest } from '@/types';
import { useBookingsData } from '@/hooks/useBookingsData';
import {
  Inbox,
  Search,
  MessageCircle,
  Mail,
  Phone,
  Calendar,
  Users,
  Trash2,
  CheckCircle,
  Clock,
  XCircle,
  Filter
} from 'lucide-react';

export function AdminBookingsTable() {
  const { bookings, loading, updateStatus, deleteBooking } = useBookingsData();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.tourTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.customerPhone.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete the booking request from ${name}?`)) {
      try {
        await deleteBooking(id);
      } catch (err) {
        alert('Failed to delete booking request.');
      }
    }
  };

  const handleStatusChange = async (id: string, newStatus: BookingRequest['status']) => {
    try {
      await updateStatus(id, newStatus);
    } catch (err) {
      alert('Failed to update booking status.');
    }
  };

  const getStatusBadge = (status: BookingRequest['status']) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 text-amber-400 bg-amber-950/60 border border-amber-800/60 px-2.5 py-0.5 rounded-full text-[11px] font-semibold">
            <Clock className="w-3 h-3" />
            Pending Review
          </span>
        );
      case 'contacted':
        return (
          <span className="inline-flex items-center gap-1 text-sky-400 bg-sky-950/60 border border-sky-800/60 px-2.5 py-0.5 rounded-full text-[11px] font-semibold">
            <Mail className="w-3 h-3" />
            Specialist Contacted
          </span>
        );
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1 text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-0.5 rounded-full text-[11px] font-semibold">
            <CheckCircle className="w-3 h-3" />
            Confirmed Booking
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 text-zinc-400 bg-zinc-900 border border-zinc-700 px-2.5 py-0.5 rounded-full text-[11px] font-semibold">
            <XCircle className="w-3 h-3" />
            Archived / Cancelled
          </span>
        );
    }
  };

  return (
    <div className="bg-zinc-900/80 rounded-3xl border border-zinc-800 p-6 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-xl font-bold text-white flex items-center gap-2">
            <Inbox className="w-5 h-5 text-emerald-400" />
            <span>Incoming Booking Inquiries</span>
            <span className="text-xs font-sans font-bold bg-emerald-950 text-emerald-400 border border-emerald-800 px-2.5 py-0.5 rounded-full">
              {bookings.length} Total Requests
            </span>
          </h2>
          <p className="text-xs text-zinc-400">
            Real-time traveler quote requests submitted via public website.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-60">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, email, tour..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center gap-1 bg-zinc-950 border border-zinc-800 rounded-xl px-2.5 py-1.5 text-xs text-zinc-400">
            <Filter className="w-3.5 h-3.5 text-zinc-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent text-white focus:outline-none cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="contacted">Contacted</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="overflow-x-auto rounded-2xl border border-zinc-800">
        <table className="w-full text-left text-xs text-zinc-300">
          <thead className="bg-zinc-950 text-zinc-400 uppercase tracking-wider font-semibold border-b border-zinc-800">
            <tr>
              <th className="p-4">Customer Details</th>
              <th className="p-4">Tour / Destination</th>
              <th className="p-4">Travel Specs</th>
              <th className="p-4">Status</th>
              <th className="p-4">Submitted At</th>
              <th className="p-4 text-right">Quick Contact & Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/80 bg-zinc-900/40">
            {loading ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-zinc-500">
                  <div className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                    <span>Syncing booking requests from Firestore...</span>
                  </div>
                </td>
              </tr>
            ) : filteredBookings.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-zinc-500">
                  No booking requests match your current filters.
                </td>
              </tr>
            ) : (
              filteredBookings.map((b) => (
                <tr key={b.id} className="hover:bg-zinc-800/50 transition-colors">
                  <td className="p-4 space-y-1">
                    <p className="font-bold text-white text-sm">{b.customerName}</p>
                    <div className="flex flex-col gap-0.5 text-[11px] text-zinc-400 font-mono">
                      <span className="flex items-center gap-1 text-zinc-300">
                        <Mail className="w-3 h-3 text-emerald-400 shrink-0" />
                        {b.customerEmail}
                      </span>
                      {b.customerPhone && (
                        <span className="flex items-center gap-1 text-zinc-300">
                          <Phone className="w-3 h-3 text-emerald-400 shrink-0" />
                          {b.customerPhone}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4 space-y-1">
                    <p className="font-semibold text-white line-clamp-1">{b.tourTitle}</p>
                    {b.destination && (
                      <span className="inline-block text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full">
                        {b.destination}
                      </span>
                    )}
                    {b.message && (
                      <p className="text-[11px] text-zinc-400 italic line-clamp-2 mt-1">
                        "{b.message}"
                      </p>
                    )}
                  </td>
                  <td className="p-4 space-y-1 text-zinc-300 font-medium">
                    {b.travelDates && (
                      <span className="flex items-center gap-1 text-[11px]">
                        <Calendar className="w-3 h-3 text-zinc-500" />
                        {b.travelDates}
                      </span>
                    )}
                    {b.guestsCount && (
                      <span className="flex items-center gap-1 text-[11px]">
                        <Users className="w-3 h-3 text-zinc-500" />
                        {b.guestsCount}
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      {getStatusBadge(b.status)}
                      <select
                        value={b.status}
                        onChange={(e) =>
                          handleStatusChange(b.id!, e.target.value as BookingRequest['status'])
                        }
                        className="block w-full mt-1 bg-zinc-950 border border-zinc-800 text-[10px] text-zinc-300 rounded-lg p-1 focus:outline-none focus:border-emerald-500 cursor-pointer"
                      >
                        <option value="pending">Mark Pending</option>
                        <option value="contacted">Mark Contacted</option>
                        <option value="confirmed">Mark Confirmed</option>
                        <option value="cancelled">Mark Cancelled</option>
                      </select>
                    </div>
                  </td>
                  <td className="p-4 text-[11px] text-zinc-400 font-mono">
                    {b.createdAt ? new Date(b.createdAt).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="p-4 text-right space-x-2">
                    {b.customerPhone && (
                      <a
                        href={`https://wa.me/${b.customerPhone.replace(/[^\d]/g, '')}?text=${encodeURIComponent(
                          `Hello ${b.customerName}! Thank you for your inquiry with Vermilion Routes regarding "${b.tourTitle}". I am your dedicated trip specialist.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 p-2 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-emerald-400 hover:bg-emerald-900 transition-colors"
                        title="Chat via WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                      </a>
                    )}
                    <a
                      href={`mailto:${b.customerEmail}?subject=${encodeURIComponent(
                        `Vermilion Routes Quote Inquiry - ${b.tourTitle}`
                      )}`}
                      className="inline-flex items-center gap-1 p-2 rounded-xl bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors"
                      title="Send Email"
                    >
                      <Mail className="w-3.5 h-3.5" />
                    </a>
                    <button
                      onClick={() => handleDelete(b.id!, b.customerName)}
                      className="p-2 rounded-xl bg-zinc-800 text-zinc-300 hover:text-rose-400 hover:bg-rose-950/80 transition-colors cursor-pointer"
                      title="Delete Request"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
