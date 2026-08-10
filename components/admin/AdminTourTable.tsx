'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Tour } from '@/types';
import { Button } from '@/components/ui/Button';
import { Database, Search, Plus, MapPin, Clock, Pencil, Trash2 } from 'lucide-react';
import { BaseTourCard } from '@/components/shared/ui/BaseTourCard';

interface AdminTourTableProps {
  tours: Tour[];
  isLoading: boolean;
  onOpenCreateModal: () => void;
  onOpenEditModal: (tour: Tour) => void;
  onDeleteTour: (id: string, title: string) => void;
}

export function AdminTourTable({
  tours,
  isLoading,
  onOpenCreateModal,
  onOpenEditModal,
  onDeleteTour
}: AdminTourTableProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTours = tours.filter(
    (t) =>
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="glass-panel rounded-3xl p-6 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <Database className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span>Tour Package Management</span>
          </h2>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">Create, edit, or remove itinerary packages stored in Firestore.</p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter tours..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 glass-input rounded-xl text-xs placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={onOpenCreateModal}
            className="gap-1.5 text-xs py-2 px-4 shrink-0 shadow-md shadow-emerald-900/40"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Tour</span>
          </Button>
        </div>
      </div>

      {/* Grid Container */}
      <div className="pt-4">
        {isLoading ? (
          <div className="flex items-center justify-center gap-2 p-8 text-zinc-500">
            <span className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            <span>Loading tours from Firestore...</span>
          </div>
        ) : filteredTours.length === 0 ? (
          <div className="p-8 text-center text-zinc-500">
            No tours found matching "{searchTerm}". Click "Add New Tour" or "Reseed Firestore Data".
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTours.map((tour) => (
              <BaseTourCard
                key={tour.id}
                title={tour.title}
                price={tour.price}
                isAdmin={true}
                imageNode={
                  tour.imageUrl ? (
                    <Image src={tour.imageUrl} alt={tour.title} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 text-xs text-zinc-400">
                      No Img
                    </div>
                  )
                }
                actionNode={
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex flex-col gap-1">
                      <span className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                        <MapPin className="w-3 h-3" />
                        {tour.destination}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-zinc-500">
                        <Clock className="w-3.5 h-3.5" />
                        {tour.duration}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onOpenEditModal(tour)}
                        className="w-8 h-8 p-0 bg-transparent hover:bg-emerald-50/50 text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 border-zinc-200/50 dark:border-zinc-800/50 transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDeleteTour(tour.id, tour.title)}
                        className="w-8 h-8 p-0 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-500/50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
