'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { User } from 'firebase/auth';
import { Tour } from '@/types';
import { useToursData } from '@/hooks/useToursData';
import { useBookingsData } from '@/hooks/useBookingsData';
import { AdminHeader } from './AdminHeader';
import { AdminMetrics } from './AdminMetrics';
import { AdminPaymentLinks } from './AdminPaymentLinks';
import { CheckCircle2, X, Database, Inbox, Layers, Link as LinkIcon } from 'lucide-react';

// Lazy loading heavy components for performance & small bundle sizes
const AdminTourTable = dynamic(
  () => import('./AdminTourTable').then((mod) => mod.AdminTourTable),
  {
    loading: () => (
      <div className="bg-zinc-900/80 rounded-3xl border border-zinc-800 p-8 text-center text-zinc-400">
        <div className="flex items-center justify-center gap-3">
          <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <span>Loading Tour Management Interface...</span>
        </div>
      </div>
    ),
    ssr: false
  }
);

const AdminBookingsTable = dynamic(
  () => import('./AdminBookingsTable').then((mod) => mod.AdminBookingsTable),
  {
    loading: () => (
      <div className="bg-zinc-900/80 rounded-3xl border border-zinc-800 p-8 text-center text-zinc-400">
        <div className="flex items-center justify-center gap-3">
          <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <span>Loading Booking Management Interface...</span>
        </div>
      </div>
    ),
    ssr: false
  }
);

const AdminTourModal = dynamic(
  () => import('./AdminTourModal').then((mod) => mod.AdminTourModal),
  { ssr: false }
);

import { AdminSettingsPanel } from './AdminSettingsPanel';

interface AdminDashboardProps {
  user: User;
  onSignOut: () => void;
}

export function AdminDashboard({ user, onSignOut }: AdminDashboardProps) {
  const { tours, loading: toursLoading, saveTour, deleteTour, seedDatabase } = useToursData();
  const { pendingCount, bookings } = useBookingsData();

  const [activeTab, setActiveTab] = useState<'tours' | 'bookings' | 'settings' | 'links'>('tours');
  const [seedSuccessMsg, setSeedSuccessMsg] = useState('');
  const [isReseeding, setIsReseeding] = useState(false);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTour, setEditingTour] = useState<Partial<Tour> | null>(null);

  const handleOpenCreateModal = () => {
    setEditingTour({
      id: `tour-${Date.now()}`,
      title: '',
      destination: 'Galapagos',
      duration: '7 Days / 6 Nights',
      price: 1999,
      imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
      rating: 5.0,
      reviewsCount: 1,
      category: 'Luxury Expedition',
      description: '',
      highlights: ['Certified Naturalist Guide', 'Luxury Accommodation'],
      inclusions: ['Breakfast & Lunch', 'Private transfers'],
      exclusions: ['International flights'],
      itinerary: [
        { day: 1, title: 'Day 1: Welcome & Arrival', description: 'Private transfer to hotel and orientation.' }
      ]
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (tour: Tour) => {
    setEditingTour({ ...tour });
    setIsModalOpen(true);
  };

  const handleDeleteTour = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}" from Firestore?`)) {
      try {
        await deleteTour(id);
      } catch (err) {
        alert('Error deleting tour package');
        console.error(err);
      }
    }
  };

  const handleReseed = async () => {
    if (confirm('Reseed Firestore database with initial mock tours & settings?')) {
      setIsReseeding(true);
      try {
        await seedDatabase();
        setSeedSuccessMsg('Firestore database reseeded successfully!');
        setTimeout(() => setSeedSuccessMsg(''), 4000);
      } catch (err) {
        alert('Failed to reseed database');
      } finally {
        setIsReseeding(false);
      }
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-8 space-y-8 relative">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Header Bar */}
        <AdminHeader user={user} onSignOut={onSignOut} />

        {/* Banner Notice */}
        {seedSuccessMsg && (
          <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-700/80 text-emerald-200 text-sm flex items-center justify-between">
            <span className="flex items-center gap-2 font-semibold">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              {seedSuccessMsg}
            </span>
            <button onClick={() => setSeedSuccessMsg('')} className="text-emerald-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Overview Metrics */}
        <AdminMetrics
          toursCount={tours.length}
          onReseed={handleReseed}
          isReseeding={isReseeding}
        />

        {/* View Selection Tabs */}
        <div className="flex items-center gap-3 border-b border-zinc-800 pb-2">
          <button
            onClick={() => setActiveTab('tours')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-semibold text-xs transition-all cursor-pointer ${
              activeTab === 'tours'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40'
                : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Tour Packages ({tours.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('bookings')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-semibold text-xs transition-all cursor-pointer relative ${
              activeTab === 'bookings'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40'
                : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>Incoming Bookings ({bookings.length})</span>
            {pendingCount > 0 && (
              <span className="ml-1 text-[10px] bg-amber-500 text-zinc-950 px-2 py-0.5 rounded-full font-bold animate-pulse">
                {pendingCount} new
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-semibold text-xs transition-all cursor-pointer relative ${
              activeTab === 'settings'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40'
                : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Site CMS Settings</span>
          </button>

          <button
            onClick={() => setActiveTab('links')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-semibold text-xs transition-all cursor-pointer relative ${
              activeTab === 'links'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40'
                : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            <LinkIcon className="w-4 h-4" />
            <span>Payment Links</span>
          </button>
        </div>

        {/* Dynamic Table Section */}
        {activeTab === 'tours' ? (
          <AdminTourTable
            tours={tours}
            isLoading={toursLoading}
            onOpenCreateModal={handleOpenCreateModal}
            onOpenEditModal={handleOpenEditModal}
            onDeleteTour={handleDeleteTour}
          />
        ) : activeTab === 'bookings' ? (
          <AdminBookingsTable />
        ) : activeTab === 'links' ? (
          <AdminPaymentLinks tours={tours} />
        ) : (
          <AdminSettingsPanel />
        )}
      </div>

      {/* Dynamic Edit/Create Modal */}
      {isModalOpen && (
        <AdminTourModal
          isOpen={isModalOpen}
          editingTour={editingTour}
          onClose={() => {
            setIsModalOpen(false);
            setEditingTour(null);
          }}
          onSave={saveTour}
        />
      )}
    </div>
  );
}
