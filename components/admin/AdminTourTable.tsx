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
    <div className="bg-zinc-900/80 rounded-3xl border border-zinc-800 p-6 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-xl font-bold text-white flex items-center gap-2">
            <Database className="w-5 h-5 text-emerald-400" />
            <span>Tour Package Management</span>
          </h2>
          <p className="text-xs text-zinc-400">Create, edit, or remove itinerary packages stored in Firestore.</p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter tours..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500"
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
      <div className="overflow-x-auto rounded-2xl border border-zinc-800">
        <table className="w-full text-left text-xs text-zinc-300">
          <thead className="bg-zinc-950 text-zinc-400 uppercase tracking-wider font-semibold border-b border-zinc-800">
            <tr>
              <th className="p-4">Tour Title & Image</th>
              <th className="p-4">Destination</th>
              <th className="p-4">Duration</th>
              <th className="p-4">Price</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/80 bg-zinc-900/40">
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
                <tr key={tour.id} className="hover:bg-zinc-800/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-zinc-700 bg-zinc-800">
                        <Image
                          src={tour.imageUrl}
                          alt={tour.title}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <div className="space-y-0.5">
                        <p className="font-bold text-white text-sm line-clamp-1">{tour.title}</p>
                        <p className="text-[10px] text-zinc-400 font-mono">ID: {tour.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1 text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full font-medium">
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
                  <td className="p-4 font-bold text-amber-400">
                    ${tour.price.toLocaleString()} USD
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => onOpenEditModal(tour)}
                      className="p-2 rounded-xl bg-zinc-800 text-zinc-300 hover:text-white hover:bg-emerald-600 transition-colors cursor-pointer"
                      title="Edit Tour"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDeleteTour(tour.id, tour.title)}
                      className="p-2 rounded-xl bg-zinc-800 text-zinc-300 hover:text-rose-400 hover:bg-rose-950/80 transition-colors cursor-pointer"
                      title="Delete Tour"
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
