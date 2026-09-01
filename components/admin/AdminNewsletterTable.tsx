'use client';

import React from 'react';
import { useNewsletterLeadsData } from '@/hooks/useNewsletterLeadsData';
import { CheckCircle2, Clock, Mail, Calendar } from 'lucide-react';

export function AdminNewsletterTable() {
  const { leads, loading } = useNewsletterLeadsData();

  if (loading) {
    return <div className="text-zinc-400 p-8 text-center animate-pulse">Cargando suscriptores...</div>;
  }

  if (leads.length === 0) {
    return <div className="text-zinc-500 p-8 text-center bg-zinc-900/50 rounded-2xl border border-zinc-800">No hay clientes destacados registrados aún.</div>;
  }

  return (
    <div className="bg-zinc-900/80 rounded-3xl border border-zinc-800 overflow-hidden shadow-2xl">
      <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Mail className="w-5 h-5 text-emerald-500" />
            Clientes Destacados (Newsletter)
          </h2>
          <p className="text-sm text-zinc-400 mt-1">Suscriptores del Club Exclusivo de Viajes</p>
        </div>
        <div className="bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-xl text-sm font-bold border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
          {leads.length} Suscriptores
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-950/50 text-zinc-400 text-xs uppercase tracking-wider">
              <th className="p-4 font-semibold">Correo Electrónico</th>
              <th className="p-4 font-semibold">Estado</th>
              <th className="p-4 font-semibold">Embajador (Ref)</th>
              <th className="p-4 font-semibold">Fecha</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-zinc-800/30 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 border border-zinc-700">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="font-medium text-zinc-200">{lead.email}</div>
                  </div>
                </td>
                <td className="p-4">
                  {lead.status === 'verificado' ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Verificado
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-medium border border-amber-500/20">
                      <Clock className="w-3.5 h-3.5" />
                      Pendiente
                    </span>
                  )}
                </td>
                <td className="p-3 text-xs text-zinc-400">
                  {lead.affiliateId ? (
                    <span className="bg-amber-500/10 text-amber-400 px-2 py-1 rounded-md border border-amber-500/20 font-mono">
                      {lead.affiliateId}
                    </span>
                  ) : (
                    <span className="text-zinc-600 italic">Orgánico</span>
                  )}
                </td>
                <td className="p-4 text-zinc-400 text-sm flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                  {lead.createdAt?.toDate ? lead.createdAt.toDate().toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Reciente'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
