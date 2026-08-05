'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Tour } from '@/types';
import { Button } from '@/components/ui/Button';
import { Database, Search, Plus, MapPin, Clock, Pencil, Trash2 } from 'lucide-react';

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

      {/* Table Container */}
      <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800">
        <table className="w-full text-left text-xs text-zinc-700 dark:text-zinc-300">
          <thead className="text-zinc-500 dark:text-zinc-400 uppercase tracking-widest font-bold border-b border-zinc-200/50 dark:border-zinc-800/50">
            <tr>
              <th className="p-4">Tour Title & Image</th>
              <th className="p-4">Destination</th>
              <th className="p-4">Duration</th>
              <th className="p-4">Price</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200/50 dark:divide-zinc-800/50 bg-transparent">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-zinc-500">
                  <div className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                    <span>Loading tours from Firestore...</span>
                  </div>
                </td>
              </tr>
            ) : filteredTours.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-zinc-500">
                  No tours found matching "{searchTerm}". Click "Add New Tour" or "Reseed Firestore Data".
                </td>
              </tr>
            ) : (
              filteredTours.map((tour) => (
                <tr key={tour.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800">
                        {tour.imageUrl ? (
                          <Image src={tour.imageUrl} alt={tour.title} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[10px] text-zinc-400">
                            No Img
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-widest line-clamp-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                          {tour.title}
                        </div>
                        <div className="text-[10px] text-zinc-500 font-mono mt-0.5">ID: {tour.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full font-medium">
                      <MapPin className="w-3 h-3" />
                      {tour.destination}
                    </span>
                  </td>
                  <td className="p-4 font-medium text-zinc-300">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-zinc-500" />
                      {tour.duration}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-zinc-900 dark:text-white text-sm">
                    ${tour.price.toLocaleString()}
                  </td>
                  <td className="p-4 text-right space-x-2">
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
                      className="w-8 h-8 p-0 glass-input hover:text-rose-600 hover:bg-rose-50 hover:border-rose-500/50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
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
