'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { 
  Compass, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Send, 
  AlertCircle, 
  Phone, 
  Mail, 
  Gift, 
  Layers, 
  FileText,
  DollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useCrmData } from '@/hooks/useCrmData';

export function OperatorDashboard() {
  const locale = useLocale();
  const isEs = locale === 'es';

  const {
    leads,
    bookings,
    users,
    updateLeadStatus,
    updateBookingStatus,
    signalCommissionReady
  } = useCrmData();

  // Simulated operator identity (Carlos Mendoza or Sofia)
  const [activeOperatorEmail, setActiveOperatorEmail] = useState('carlos.guia@vermilionroutes.com');
  const [successNotice, setSuccessNotice] = useState('');

  const operatorLeads = leads.filter(l => l.assignedOperatorId === activeOperatorEmail);
  const operatorBookings = bookings.filter(b => b.assignedOperatorId === activeOperatorEmail);

  const handleRequestPayout = async (bookingId: string) => {
    await signalCommissionReady(bookingId, 'operator');
    setSuccessNotice('¡Solicitud de pago enviada al Super Admin con éxito!');
    setTimeout(() => setSuccessNotice(''), 4000);
  };

  return (
    <div className="min-h-screen bg-[#07130C] text-zinc-100 font-sans selection:bg-emerald-500 selection:text-black">
      
      {/* ── HEADER ──────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-[#0B1A12]/90 backdrop-blur-xl border-b border-[#183824] px-6 py-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 p-2 flex items-center justify-center">
              <Image src="/icon.png" alt="Vermilion" width={24} height={24} className="object-contain" />
            </div>
            <div>
              <span className="font-serif text-lg font-bold text-white block">
                Portal del Operador <span className="text-emerald-400 text-xs uppercase ml-1">Vermilion Routes</span>
              </span>
              <span className="text-[10px] text-zinc-400">Gestión de Expediciones & Pasajeros Asignados</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Operator Switcher for Demo */}
            <div className="flex items-center gap-2 text-xs bg-black/40 px-3 py-1.5 rounded-xl border border-zinc-700">
              <span className="text-zinc-500">Operador:</span>
              <select
                value={activeOperatorEmail}
                onChange={(e) => setActiveOperatorEmail(e.target.value)}
                className="bg-transparent text-emerald-300 font-bold focus:outline-none"
              >
                <option value="carlos.guia@vermilionroutes.com">Carlos Mendoza (Guía)</option>
                <option value="sofia.sales@vermilionroutes.com">Sofía Valdivieso (Travel Designer)</option>
                <option value="pablofgarciaf@gmail.com">Pablo García (Super Admin)</option>
              </select>
            </div>

            <Link
              href={`/${locale}/admin`}
              className="px-3.5 py-1.5 rounded-xl border border-zinc-700 hover:border-amber-500 text-xs text-amber-400 transition-colors"
            >
              ← Volver al Gran Admin
            </Link>
          </div>
        </div>
      </header>

      {/* ── MAIN WORKSPACE ──────────────────────────────────────────────── */}
      <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        
        {successNotice && (
          <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-600/80 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in shadow-lg">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{successNotice}</span>
          </div>
        )}

        {/* STATS OVERVIEW */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#0D2216] border border-[#1A422B] p-5 rounded-2xl space-y-1">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Leads Asignados</span>
            <p className="font-serif text-2xl font-bold text-white">{operatorLeads.length}</p>
            <span className="text-[10px] text-zinc-500">Prospectos pendientes de seguimiento</span>
          </div>

          <div className="bg-[#0D2216] border border-[#1A422B] p-5 rounded-2xl space-y-1">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Tours en Operación</span>
            <p className="font-serif text-2xl font-bold text-emerald-400">{operatorBookings.length}</p>
            <span className="text-[10px] text-zinc-500">Expediciones bajo tu coordinación</span>
          </div>

          <div className="bg-[#0D2216] border border-[#1A422B] p-5 rounded-2xl space-y-1">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Tus Bonos / Comisiones</span>
            <p className="font-serif text-2xl font-bold text-amber-400">
              ${operatorBookings.reduce((acc, b) => acc + (b.operatorCommissionAmount || 0), 0)} USD
            </p>
            <span className="text-[10px] text-zinc-500">Por tours completados con éxito</span>
          </div>
        </div>

        {/* SECTION 1: EXPEDITIONS & BOOKINGS */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-[#183824] pb-2">
            <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-400" />
              <span>Tours & Salidas Asignadas</span>
            </h3>
            <span className="text-xs text-zinc-400">{operatorBookings.length} expediciones</span>
          </div>

          <div className="space-y-4">
            {operatorBookings.map((book) => (
              <div key={book.id} className="bg-[#0C1E14] border border-[#173822] rounded-2xl p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#142E1C] pb-3">
                  <div>
                    <span className="font-mono text-emerald-400 font-bold text-xs">{book.bookingCode}</span>
                    <h4 className="font-bold text-white text-base">{book.tourTitle}</h4>
                    <p className="text-xs text-zinc-400">{book.destination} • {book.passengersCount} Pasajeros</p>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-[10px] text-zinc-400 uppercase block">Fechas del Viaje:</span>
                    <span className="font-mono text-xs font-bold text-amber-300">{book.travelStartDate} al {book.travelEndDate}</span>
                  </div>
                </div>

                {/* Traveler & Gift Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase">Contacto del Pasajero:</span>
                    <p className="font-bold text-white">{book.customerName}</p>
                    <p className="text-zinc-400 flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-emerald-400" /> {book.customerEmail}</p>
                    <p className="text-zinc-400 flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-emerald-400" /> {book.customerPhone}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase">Regalo de Bienvenida Asignado:</span>
                    <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-semibold flex items-center gap-2">
                      <Gift className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{book.vipGiftAssigned || 'Caja Degustación Pakari Fino de Aroma'}</span>
                    </div>
                  </div>
                </div>

                {/* Actions & Commission Signaler */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[#142E1C]">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-zinc-400">Estado del Tour:</span>
                    <select
                      value={book.status}
                      onChange={(e) => updateBookingStatus(book.id, e.target.value as any)}
                      className="bg-black/40 border border-zinc-700 rounded-lg text-xs text-white px-2.5 py-1 focus:outline-none focus:border-emerald-500"
                    >
                      <option value="deposit_confirmed">Depósito Confirmado</option>
                      <option value="fully_paid">Totalmente Pagado</option>
                      <option value="in_operation">En Operación (En Curso)</option>
                      <option value="completed">Completado con Éxito</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    {book.operatorCommissionStatus === 'paid' ? (
                      <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/30">
                        ✓ Bono de ${book.operatorCommissionAmount} USD Pagado
                      </span>
                    ) : book.operatorCommissionStatus === 'ready_for_review' ? (
                      <span className="text-xs text-amber-300 font-semibold bg-amber-500/10 px-3 py-1 rounded-xl border border-amber-500/30 animate-pulse">
                        Solicitud de Bono enviada a Super Admin
                      </span>
                    ) : (
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => handleRequestPayout(book.id)}
                        className="text-xs gap-1.5"
                      >
                        <DollarSign className="w-3.5 h-3.5" />
                        <span>Solicitar Pago de Bono (${book.operatorCommissionAmount} USD)</span>
                      </Button>
                    )}
                  </div>
                </div>

              </div>
            ))}

            {operatorBookings.length === 0 && (
              <div className="p-8 text-center bg-[#0C1E14] border border-[#173822] rounded-2xl text-zinc-500 text-xs">
                No tienes reservas asignadas actualmente. El Super Admin te asignará expediciones desde el CRM.
              </div>
            )}
          </div>
        </section>

        {/* SECTION 2: ASSIGNED LEADS */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-[#183824] pb-2">
            <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-emerald-400" />
              <span>Prospectos / Leads Asignados para Contacto</span>
            </h3>
            <span className="text-xs text-zinc-400">{operatorLeads.length} prospectos</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {operatorLeads.map((lead) => (
              <div key={lead.id} className="bg-[#0C1E14] border border-[#173822] rounded-2xl p-5 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-white text-sm">{lead.customerName}</h4>
                    <p className="text-xs text-zinc-400">{lead.country} • {lead.passengersCount} Pasajeros</p>
                  </div>
                  <span className="font-mono text-amber-400 font-bold text-sm">
                    ${lead.estimatedBudget.toLocaleString('en-US')} USD
                  </span>
                </div>

                <p className="text-xs text-zinc-300 bg-black/30 p-2.5 rounded-xl border border-zinc-800">
                  {lead.notes}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-[#142E1C]">
                  <span className="text-[11px] text-zinc-400">Etapa de la Propuesta:</span>
                  <select
                    value={lead.status}
                    onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                    className="bg-black/50 border border-emerald-700/80 rounded-lg text-xs text-emerald-300 px-2.5 py-1 focus:outline-none"
                  >
                    <option value="new">Nuevo</option>
                    <option value="contacted">Contactado (WhatsApp/Llamada)</option>
                    <option value="itinerary_sent">Itinerario y Cotización Enviada</option>
                    <option value="negotiation">En Negociación / Ajustes</option>
                    <option value="won">¡Ganado! (Listo para Reserva)</option>
                  </select>
                </div>
              </div>
            ))}

            {operatorLeads.length === 0 && (
              <div className="col-span-2 p-8 text-center bg-[#0C1E14] border border-[#173822] rounded-2xl text-zinc-500 text-xs">
                No tienes prospectos asignados para seguimiento en este momento.
              </div>
            )}
          </div>
        </section>

      </main>

    </div>
  );
}
