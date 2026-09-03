'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { useTheme } from 'next-themes';
import { 
  Users, 
  Compass, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  Send, 
  Plus, 
  Gift, 
  Filter, 
  Search, 
  ShieldCheck, 
  TrendingUp, 
  UserPlus, 
  ArrowUpRight, 
  ChevronRight, 
  AlertCircle, 
  Eye, 
  Phone, 
  Mail, 
  Award,
  Sparkles,
  Layers,
  FileCheck
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useCrmData } from '@/hooks/useCrmData';
import { SystemUser, CrmLead, CrmBooking, UserRole } from '@/types/crm';

export function AdminCrmDashboard() {
  const locale = useLocale();
  const isEs = locale === 'es';
  const { theme } = useTheme();

  const {
    users,
    leads,
    bookings,
    createUser,
    updateLeadStatus,
    updateBookingStatus,
    approveAndPayCommission,
    assignVipGift
  } = useCrmData();

  const [activeTab, setActiveTab] = useState<'pipeline' | 'bookings' | 'payouts' | 'users' | 'gifts'>('pipeline');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Modal States
  const [showNewUserModal, setShowNewUserModal] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<UserRole>('operator');
  const [newUserPhone, setNewUserPhone] = useState('');
  const [newUserCedula, setNewUserCedula] = useState('');

  // Payout Modal
  const [payoutTarget, setPayoutTarget] = useState<{ booking: CrmBooking; type: 'affiliate' | 'operator' } | null>(null);
  const [payoutReference, setPayoutReference] = useState('');

  // Total Metrics
  const totalVolume = bookings.reduce((acc, b) => acc + b.totalAmount, 0);
  const totalCollected = bookings.reduce((acc, b) => acc + b.paidAmount, 0);
  const pendingPayoutsCount = bookings.filter(
    b => b.affiliateCommissionStatus === 'ready_for_review' || b.operatorCommissionStatus === 'ready_for_review'
  ).length;

  const handleCreateUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserEmail || !newUserName) return;

    await createUser({
      id: newUserEmail.trim().toLowerCase(),
      email: newUserEmail.trim().toLowerCase(),
      name: newUserName.trim(),
      role: newUserRole,
      roles: newUserRole === 'super' ? ['super', 'admin', 'operator', 'editor'] : [newUserRole],
      phone: newUserPhone.trim(),
      cedula: newUserCedula.trim(),
      isActive: true,
      assignedLeadsCount: 0,
      assignedBookingsCount: 0,
    });

    setNewUserEmail('');
    setNewUserName('');
    setNewUserPhone('');
    setNewUserCedula('');
    setShowNewUserModal(false);
  };

  const handleConfirmPayout = async () => {
    if (!payoutTarget || !payoutReference) return;
    await approveAndPayCommission(payoutTarget.booking.id, payoutTarget.type, payoutReference.trim());
    setPayoutTarget(null);
    setPayoutReference('');
  };

  return (
    <div className="min-h-screen bg-[#060D09] text-zinc-100 font-sans selection:bg-amber-500 selection:text-black">
      
      {/* ── TOP LUXURY CRM NAVIGATION ───────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-[#0A160F]/90 backdrop-blur-xl border-b border-[#1A3324] px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div className="flex items-center gap-4">
            <Link href={`/${locale}`} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 shadow-lg shadow-amber-500/10">
                <div className="w-full h-full bg-[#07130C] rounded-[14px] flex items-center justify-center">
                  <Image src="/icon.png" alt="Vermilion" width={24} height={24} className="object-contain" />
                </div>
              </div>
              <div>
                <span className="font-serif text-lg font-bold tracking-tight text-white block">
                  VERMILION <span className="text-amber-400 font-sans text-xs font-semibold uppercase tracking-widest ml-1 px-2 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/30">CRM</span>
                </span>
                <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">
                  {isEs ? 'Centro de Mando & Operaciones' : 'Command & Operations Center'}
                </span>
              </div>
            </Link>

            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 text-xs font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Rol: <strong className="text-white uppercase">Super Admin</strong></span>
            </div>
          </div>

          {/* Quick Actions & Links */}
          <div className="flex items-center gap-3">
            <Link 
              href={`/${locale}/cpanel`} 
              className="px-3.5 py-2 rounded-xl border border-zinc-800 hover:border-emerald-600/60 text-xs text-zinc-300 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isEs ? 'Ir a cPanel (CMS)' : 'Go to cPanel'}</span>
            </Link>

            <Link 
              href={`/${locale}/operator`} 
              className="px-3.5 py-2 rounded-xl border border-zinc-800 hover:border-amber-500/60 text-xs text-zinc-300 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>{isEs ? 'Vista de Operador' : 'Operator View'}</span>
            </Link>

            <Button
              onClick={() => setShowNewUserModal(true)}
              variant="primary"
              size="sm"
              className="gap-2 text-xs font-semibold py-2 px-4 shadow-lg shadow-emerald-900/30"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>{isEs ? '+ Crear Operador' : '+ Create User'}</span>
            </Button>
          </div>
        </div>
      </header>

      {/* ── KPI METRICS TICKER ──────────────────────────────────────────── */}
      <section className="border-b border-[#14281C] bg-[#07130C]/60 py-6 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-[#0B1A12] border border-[#173822] p-4 rounded-2xl space-y-1">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
              {isEs ? 'Volumen Total Reservas' : 'Total Booked Volume'}
            </span>
            <p className="font-serif text-2xl font-bold text-white">${totalVolume.toLocaleString('en-US')} USD</p>
            <span className="text-[10px] text-emerald-400 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> Cobrado: ${totalCollected.toLocaleString('en-US')}
            </span>
          </div>

          <div className="bg-[#0B1A12] border border-[#173822] p-4 rounded-2xl space-y-1">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
              {isEs ? 'Reservas en Proceso' : 'Active Bookings'}
            </span>
            <p className="font-serif text-2xl font-bold text-amber-400">{bookings.length}</p>
            <span className="text-[10px] text-zinc-400">
              {bookings.filter(b => b.status === 'fully_paid').length} {isEs ? 'pagadas al 100%' : 'fully paid'}
            </span>
          </div>

          <div className="bg-[#0B1A12] border border-[#173822] p-4 rounded-2xl space-y-1">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
              {isEs ? 'Leads en Pipeline' : 'Pipeline Leads'}
            </span>
            <p className="font-serif text-2xl font-bold text-emerald-400">{leads.length}</p>
            <span className="text-[10px] text-zinc-400">
              {leads.filter(l => l.status === 'negotiation' || l.status === 'itinerary_sent').length} {isEs ? 'en cotización activa' : 'active proposals'}
            </span>
          </div>

          <div className="bg-[#0B1A12] border border-[#173822] p-4 rounded-2xl space-y-1">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
              {isEs ? 'Comisiones por Aprobar' : 'Pending Payouts'}
            </span>
            <p className="font-serif text-2xl font-bold text-amber-300 flex items-center gap-2">
              {pendingPayoutsCount}
              {pendingPayoutsCount > 0 && (
                <span className="text-[10px] bg-amber-400 text-black px-2 py-0.5 rounded-full font-sans font-extrabold animate-pulse">
                  {isEs ? 'Acción Requerida' : 'Action Required'}
                </span>
              )}
            </p>
            <span className="text-[10px] text-zinc-400">
              {isEs ? 'Verificadas por operador' : 'Signaled by operators'}
            </span>
          </div>

        </div>
      </section>

      {/* ── TABS NAVIGATION ─────────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        <div className="flex flex-wrap items-center gap-2 border-b border-[#1A3324] pb-3">
          
          <button
            onClick={() => setActiveTab('pipeline')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'pipeline'
                ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>{isEs ? 'Leads Pipeline (CRM)' : 'Leads Pipeline'}</span>
            <span className="ml-1 text-[10px] bg-zinc-800 px-1.5 py-0.5 rounded-full text-zinc-300">{leads.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'bookings'
                ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>{isEs ? 'Reservas & Salidas' : 'Bookings & Departures'}</span>
            <span className="ml-1 text-[10px] bg-zinc-800 px-1.5 py-0.5 rounded-full text-zinc-300">{bookings.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('payouts')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer relative ${
              activeTab === 'payouts'
                ? 'bg-amber-500/15 border border-amber-500/40 text-amber-300 shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>{isEs ? 'Aprobación de Pagos & Comisiones' : 'Commission Approvals'}</span>
            {pendingPayoutsCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping absolute -top-1 -right-1" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'users'
                ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>{isEs ? 'Usuarios & Operadores' : 'Users & Operators'}</span>
            <span className="ml-1 text-[10px] bg-zinc-800 px-1.5 py-0.5 rounded-full text-zinc-300">{users.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('gifts')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'gifts'
                ? 'bg-amber-500/15 border border-amber-500/40 text-amber-300 shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Gift className="w-4 h-4 text-amber-400" />
            <span>{isEs ? 'Regalos VIP Pakari' : 'Pakari VIP Gifts'}</span>
          </button>
        </div>

        {/* ── TAB 1: LEADS PIPELINE ──────────────────────────────────────── */}
        {activeTab === 'pipeline' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <h3 className="font-serif text-xl font-bold text-white">
                {isEs ? 'Pipeline de Viajeros VIP & Prospectos' : 'VIP Travelers Pipeline'}
              </h3>
              <p className="text-xs text-zinc-400">
                {isEs ? 'Asigna operadores para seguimiento en tiempo real.' : 'Assign operators for realtime customer follow-up.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {(['new', 'contacted', 'itinerary_sent', 'negotiation', 'won'] as const).map((stage) => {
                const stageLeads = leads.filter(l => l.status === stage);
                const stageLabels: Record<string, string> = {
                  new: isEs ? '1. Nuevo Lead' : '1. New Lead',
                  contacted: isEs ? '2. Contactado' : '2. Contacted',
                  itinerary_sent: isEs ? '3. Itinerario Enviado' : '3. Itinerary Sent',
                  negotiation: isEs ? '4. En Negociación' : '4. In Negotiation',
                  won: isEs ? '5. Reserva Confirmada' : '5. Won / Booked'
                };

                return (
                  <div key={stage} className="bg-[#09150E] border border-[#173322] rounded-2xl p-4 flex flex-col space-y-3">
                    <div className="flex items-center justify-between border-b border-[#142C1E] pb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                        {stageLabels[stage]}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/40 text-zinc-300">
                        {stageLeads.length}
                      </span>
                    </div>

                    <div className="space-y-3 flex-1 overflow-y-auto max-h-[600px]">
                      {stageLeads.map((lead) => (
                        <div key={lead.id} className="bg-[#0E2016] border border-[#1A402A] p-4 rounded-xl space-y-2 shadow-sm hover:border-amber-400/50 transition-all group">
                          <div className="flex items-start justify-between">
                            <p className="font-bold text-sm text-white">{lead.customerName}</p>
                            <span className="text-[10px] font-mono text-amber-400 font-semibold">${lead.estimatedBudget.toLocaleString('en-US')}</span>
                          </div>

                          <p className="text-xs text-zinc-400 flex items-center gap-1">
                            <Compass className="w-3.5 h-3.5 text-emerald-400" />
                            <span>{lead.destination} ({lead.passengersCount} pax)</span>
                          </p>

                          {lead.affiliateReferralCode && (
                            <span className="inline-block text-[9px] bg-amber-400/10 border border-amber-400/30 text-amber-300 px-2 py-0.5 rounded-md">
                              Ref: @{lead.affiliateReferralCode}
                            </span>
                          )}

                          <div className="pt-2 border-t border-[#173322] space-y-1.5">
                            <span className="text-[10px] text-zinc-500 uppercase tracking-wider block font-semibold">
                              {isEs ? 'Operador Asignado:' : 'Assigned Operator:'}
                            </span>
                            <select
                              value={lead.assignedOperatorId || ''}
                              onChange={(e) => {
                                const selectedUser = users.find(u => u.id === e.target.value);
                                if (selectedUser) {
                                  updateLeadStatus(lead.id, lead.status, { id: selectedUser.id, name: selectedUser.name });
                                }
                              }}
                              className="w-full bg-black/60 border border-zinc-700 rounded-lg text-xs text-zinc-300 px-2.5 py-1.5 focus:outline-none focus:border-emerald-500"
                            >
                              <option value="">{isEs ? '-- Sin asignar --' : '-- Unassigned --'}</option>
                              {users.map(u => (
                                <option key={u.id} value={u.id}>{u.name} ({u.role})</option>
                              ))}
                            </select>
                          </div>

                          {/* Stage Transition Selector */}
                          <div className="pt-1">
                            <select
                              value={lead.status}
                              onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                              className="w-full bg-[#142A1E] border border-emerald-800/80 rounded-lg text-[11px] text-emerald-200 px-2 py-1 focus:outline-none"
                            >
                              <option value="new">Mover: Nuevo</option>
                              <option value="contacted">Mover: Contactado</option>
                              <option value="itinerary_sent">Mover: Itinerario Enviado</option>
                              <option value="negotiation">Mover: Negociación</option>
                              <option value="won">Mover: Ganado (Reserva)</option>
                            </select>
                          </div>
                        </div>
                      ))}

                      {stageLeads.length === 0 && (
                        <p className="text-center text-[11px] text-zinc-600 py-6 italic">
                          {isEs ? 'Sin prospectos en esta etapa' : 'No leads in this stage'}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── TAB 2: BOOKINGS & CALENDAR ─────────────────────────────────── */}
        {activeTab === 'bookings' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-xl font-bold text-white">
                  {isEs ? 'Gestor de Reservas & Calendario de Expediciones' : 'Bookings & Expeditions Manager'}
                </h3>
                <p className="text-xs text-zinc-400">
                  {isEs ? 'Control de pagos totales, adelantos de $500 y logística de salida.' : 'Manage full payments, $500 deposits and logistics.'}
                </p>
              </div>
            </div>

            <div className="bg-[#09150E] border border-[#173322] rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#0E2216] border-b border-[#1A3D27] text-zinc-400 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4">Código / Tour</th>
                      <th className="py-3.5 px-4">Viajero</th>
                      <th className="py-3.5 px-4">Fechas</th>
                      <th className="py-3.5 px-4">Monto / Estado</th>
                      <th className="py-3.5 px-4">Operador</th>
                      <th className="py-3.5 px-4">Regalo VIP</th>
                      <th className="py-3.5 px-4 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#132B1D]">
                    {bookings.map((book) => (
                      <tr key={book.id} className="hover:bg-[#0C1E14] transition-colors">
                        <td className="py-4 px-4 space-y-1">
                          <span className="font-mono text-emerald-400 font-bold text-xs">{book.bookingCode}</span>
                          <p className="font-semibold text-white truncate max-w-xs">{book.tourTitle}</p>
                          <p className="text-[11px] text-zinc-500">{book.destination}</p>
                        </td>

                        <td className="py-4 px-4 space-y-1">
                          <p className="font-bold text-white">{book.customerName}</p>
                          <p className="text-zinc-400">{book.customerEmail}</p>
                          <p className="text-zinc-500">{book.customerPhone} ({book.passengersCount} pax)</p>
                        </td>

                        <td className="py-4 px-4 space-y-1 font-mono text-[11px] text-zinc-300">
                          <p className="text-emerald-400 font-semibold">{book.travelStartDate}</p>
                          <p className="text-zinc-500">hasta {book.travelEndDate}</p>
                        </td>

                        <td className="py-4 px-4 space-y-1.5">
                          <div className="font-mono">
                            <span className="text-white font-bold">${book.paidAmount.toLocaleString('en-US')}</span>
                            <span className="text-zinc-500"> / ${book.totalAmount.toLocaleString('en-US')}</span>
                          </div>

                          <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                            book.status === 'fully_paid'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                              : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          }`}>
                            {book.status === 'fully_paid' ? '100% Pagado' : 'Depósito $500'}
                          </span>
                        </td>

                        <td className="py-4 px-4">
                          <span className="text-zinc-300 font-medium">{book.assignedOperatorName || 'No asignado'}</span>
                          <p className="text-[10px] text-zinc-500">{book.assignedOperatorId}</p>
                        </td>

                        <td className="py-4 px-4">
                          {book.vipGiftAssigned ? (
                            <span className="text-[11px] text-amber-300 font-semibold flex items-center gap-1">
                              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                              {book.vipGiftAssigned}
                            </span>
                          ) : (
                            <button
                              onClick={() => assignVipGift(book.id, 'Caja Selección Especial Pakari')}
                              className="text-[10px] text-zinc-500 hover:text-amber-400 underline cursor-pointer"
                            >
                              + Asignar Pakari
                            </button>
                          )}
                        </td>

                        <td className="py-4 px-4 text-right">
                          <select
                            value={book.status}
                            onChange={(e) => updateBookingStatus(book.id, e.target.value as any)}
                            className="bg-[#112419] border border-zinc-700 text-[11px] text-zinc-200 px-2 py-1 rounded-lg focus:outline-none"
                          >
                            <option value="deposit_confirmed">Depósito $500</option>
                            <option value="fully_paid">Total Pagado</option>
                            <option value="in_operation">En Operación</option>
                            <option value="completed">Completado</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 3: COMMISSION PAYOUTS ──────────────────────────────────── */}
        {activeTab === 'payouts' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-xl font-bold text-white">
                  {isEs ? 'Aprobación de Comisiones de Embajadores & Operadores' : 'Commission Payouts & Approvals'}
                </h3>
                <p className="text-xs text-zinc-400">
                  {isEs 
                    ? 'Solo el Super Admin tiene autorización para procesar pagos y cargar comprobantes.' 
                    : 'Only Super Admin can approve and mark commissions as paid.'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Embajadores */}
              <div className="bg-[#09150E] border border-[#173322] rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-[#1A3826] pb-3">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-400" />
                    <h4 className="font-bold text-white text-sm">Comisiones Embajadores (10%)</h4>
                  </div>
                </div>

                <div className="space-y-3">
                  {bookings.filter(b => b.affiliateId).map((book) => (
                    <div key={book.id} className="bg-[#0E2016] border border-[#1A402A] p-4 rounded-xl space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-bold text-white text-xs">Embajador: @{book.affiliateId}</p>
                          <p className="text-[11px] text-zinc-400">Reserva: {book.bookingCode} - {book.customerName}</p>
                        </div>
                        <span className="font-mono text-lg font-extrabold text-amber-400">
                          ${book.affiliateCommissionAmount?.toLocaleString('en-US')} USD
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-[#173322]">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          book.affiliateCommissionStatus === 'paid'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                            : book.affiliateCommissionStatus === 'ready_for_review'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse'
                            : 'bg-zinc-800 text-zinc-400'
                        }`}>
                          {book.affiliateCommissionStatus === 'paid' ? '✓ Pagado' : book.affiliateCommissionStatus === 'ready_for_review' ? 'Listo para Pago' : 'Pendiente'}
                        </span>

                        {book.affiliateCommissionStatus !== 'paid' ? (
                          <Button
                            size="sm"
                            variant="primary"
                            onClick={() => setPayoutTarget({ booking: book, type: 'affiliate' })}
                            className="h-7 text-xs px-3 font-semibold gap-1"
                          >
                            <FileCheck className="w-3.5 h-3.5" />
                            <span>Aprobar y Pagar</span>
                          </Button>
                        ) : (
                          <span className="text-[10px] text-zinc-500 font-mono">Ref: {book.paymentReference || 'N/A'}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Operadores */}
              <div className="bg-[#09150E] border border-[#173322] rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-[#1A3826] pb-3">
                  <div className="flex items-center gap-2">
                    <Compass className="w-5 h-5 text-emerald-400" />
                    <h4 className="font-bold text-white text-sm">Bonos / Comisiones Operadores</h4>
                  </div>
                </div>

                <div className="space-y-3">
                  {bookings.filter(b => b.assignedOperatorId).map((book) => (
                    <div key={book.id} className="bg-[#0E2016] border border-[#1A402A] p-4 rounded-xl space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-bold text-white text-xs">Operador: {book.assignedOperatorName}</p>
                          <p className="text-[11px] text-zinc-400">Expedición: {book.bookingCode}</p>
                        </div>
                        <span className="font-mono text-lg font-extrabold text-emerald-400">
                          ${book.operatorCommissionAmount?.toLocaleString('en-US')} USD
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-[#173322]">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          book.operatorCommissionStatus === 'paid'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                            : book.operatorCommissionStatus === 'ready_for_review'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse'
                            : 'bg-zinc-800 text-zinc-400'
                        }`}>
                          {book.operatorCommissionStatus === 'paid' ? '✓ Pagado' : book.operatorCommissionStatus === 'ready_for_review' ? 'Solicitado por Operador' : 'En Curso'}
                        </span>

                        {book.operatorCommissionStatus !== 'paid' ? (
                          <Button
                            size="sm"
                            variant="primary"
                            onClick={() => setPayoutTarget({ booking: book, type: 'operator' })}
                            className="h-7 text-xs px-3 font-semibold gap-1"
                          >
                            <FileCheck className="w-3.5 h-3.5" />
                            <span>Procesar Pago</span>
                          </Button>
                        ) : (
                          <span className="text-[10px] text-zinc-500 font-mono">Ref: {book.paymentReference || 'N/A'}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ── TAB 4: USERS & OPERATORS ───────────────────────────────────── */}
        {activeTab === 'users' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-xl font-bold text-white">
                  {isEs ? 'Directorio de Usuarios del Sistema (Colección: usuarios)' : 'System Users & Roles'}
                </h3>
                <p className="text-xs text-zinc-400">
                  {isEs ? 'Cada usuario tiene su documento único por correo electrónico en Firestore.' : 'Each user has a document keyed by email in Firestore.'}
                </p>
              </div>

              <Button
                onClick={() => setShowNewUserModal(true)}
                variant="primary"
                size="sm"
                className="gap-2 text-xs font-semibold"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>{isEs ? '+ Registrar Nuevo Usuario' : '+ Add New User'}</span>
              </Button>
            </div>

            <div className="bg-[#09150E] border border-[#173322] rounded-2xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0E2216] border-b border-[#1A3D27] text-zinc-400 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4">Usuario / Email (Doc ID)</th>
                    <th className="py-3.5 px-4">Nombre Completo</th>
                    <th className="py-3.5 px-4">Rol Asignado</th>
                    <th className="py-3.5 px-4">Teléfono</th>
                    <th className="py-3.5 px-4">Carga Operativa</th>
                    <th className="py-3.5 px-4">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#132B1D]">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-[#0C1E14] transition-colors">
                      <td className="py-4 px-4 font-mono font-bold text-white">
                        {u.email}
                        {u.authUid && (
                          <span className="block text-[10px] text-zinc-500 font-normal">UID: {u.authUid.slice(0, 10)}...</span>
                        )}
                      </td>
                      <td className="py-4 px-4 font-semibold text-zinc-200">{u.name}</td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ${
                          u.role === 'super'
                            ? 'bg-amber-400/20 text-amber-300 border border-amber-400/50'
                            : u.role === 'admin'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-zinc-400">{u.phone || 'N/A'}</td>
                      <td className="py-4 px-4 text-zinc-400">
                        <span>{u.assignedLeadsCount || 0} leads / {u.assignedBookingsCount || 0} tours</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Activo
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── TAB 5: PAKARI VIP GIFTS ────────────────────────────────────── */}
        {activeTab === 'gifts' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                <Gift className="w-5 h-5 text-amber-400" />
                <span>{isEs ? 'Experiencias de Bienvenida Pakari & Regalos Ecuatorianos' : 'Pakari Luxury Welcome Gifts'}</span>
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                {isEs 
                  ? 'Fidelización boutique: Cada huésped de expedición recibe productos ecuatorianos galardonados internacionalmente.' 
                  : 'Delight each high-ticket passenger upon hotel or yacht check-in.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#09150E] border border-[#173322] rounded-3xl p-6 space-y-4 hover:border-amber-400/40 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Award className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-lg font-bold text-white">Pakari Organic Grand Cru</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Caja de degustación con barras de cacao fino de aroma premiadas en los International Chocolate Awards.
                </p>
                <span className="inline-block text-[10px] bg-amber-400/10 text-amber-300 font-bold px-2 py-1 rounded-lg">
                  Estándar en todos los tours &gt; $5,000 USD
                </span>
              </div>

              <div className="bg-[#09150E] border border-[#173322] rounded-3xl p-6 space-y-4 hover:border-amber-400/40 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Compass className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-lg font-bold text-white">Café de Altura Loja & Galápagos</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Micro-lote de café arábica cultivado en suelos volcánicos de Galápagos y valles andinos de Loja.
                </p>
                <span className="inline-block text-[10px] bg-emerald-400/10 text-emerald-300 font-bold px-2 py-1 rounded-lg">
                  Incluido en Suite de Yate & Haciendas
                </span>
              </div>

              <div className="bg-[#09150E] border border-[#173322] rounded-3xl p-6 space-y-4 hover:border-amber-400/40 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-lg font-bold text-white">Sombrero Montecristi Tradicional</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Genuino sombrero de paja toquilla tejido a mano por artesanos patrimoniales (UNESCO).
                </p>
                <span className="inline-block text-[10px] bg-amber-400/10 text-amber-300 font-bold px-2 py-1 rounded-lg">
                  Experiencia Ultra-Lujo VIP
                </span>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* ── MODAL: CREAR NUEVO USUARIO / OPERADOR ───────────────────────── */}
      {showNewUserModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[#09160F] border border-[#1B3C28] rounded-[28px] p-6 sm:p-8 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-[#163321] pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <UserPlus className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-lg font-bold text-white">
                  {isEs ? 'Crear Nuevo Usuario / Operador' : 'Create New System User'}
                </h3>
              </div>
              <button 
                onClick={() => setShowNewUserModal(false)}
                className="text-zinc-400 hover:text-white text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateUserSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-zinc-300 uppercase tracking-wider block">
                  {isEs ? 'Nombre Completo *' : 'Full Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="ej: Carlos Mendoza"
                  className="w-full px-3.5 py-2.5 bg-black/40 border border-zinc-700 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-zinc-300 uppercase tracking-wider block">
                  {isEs ? 'Correo Electrónico (ID del Documento) *' : 'Email Address (Document ID) *'}
                </label>
                <input
                  type="email"
                  required
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="operador@vermilionroutes.com"
                  className="w-full px-3.5 py-2.5 bg-black/40 border border-zinc-700 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-zinc-300 uppercase tracking-wider block">
                    {isEs ? 'Rol de Acceso *' : 'Access Role *'}
                  </label>
                  <select
                    value={newUserRole}
                    onChange={(e) => setNewUserRole(e.target.value as UserRole)}
                    className="w-full px-3 py-2.5 bg-black/40 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="operator">Operador (CRM)</option>
                    <option value="admin">Administrador</option>
                    <option value="editor">Editor (cPanel)</option>
                    <option value="super">Super Admin</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-zinc-300 uppercase tracking-wider block">
                    {isEs ? 'Cédula / DNI' : 'National ID'}
                  </label>
                  <input
                    type="text"
                    value={newUserCedula}
                    onChange={(e) => setNewUserCedula(e.target.value)}
                    placeholder="1721..."
                    className="w-full px-3 py-2.5 bg-black/40 border border-zinc-700 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-zinc-300 uppercase tracking-wider block">
                  {isEs ? 'Teléfono WhatsApp' : 'Phone Number'}
                </label>
                <input
                  type="text"
                  value={newUserPhone}
                  onChange={(e) => setNewUserPhone(e.target.value)}
                  placeholder="+593 99..."
                  className="w-full px-3.5 py-2.5 bg-black/40 border border-zinc-700 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowNewUserModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-zinc-700 text-zinc-400 hover:text-white"
                >
                  {isEs ? 'Cancelar' : 'Cancel'}
                </button>
                <Button type="submit" variant="primary" size="sm" className="font-bold">
                  {isEs ? 'Guardar en Colección usuarios' : 'Save User to Firestore'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL: APROBACIÓN DE PAGO CON REFERENCIA ─────────────────────── */}
      {payoutTarget && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-[#09160F] border border-[#1B3C28] rounded-[28px] p-6 space-y-4 shadow-2xl">
            <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-emerald-400" />
              <span>Confirmar Pago de Comisión</span>
            </h3>

            <p className="text-xs text-zinc-400">
              Estás a punto de liquidar la comisión por <strong>${payoutTarget.type === 'affiliate' ? payoutTarget.booking.affiliateCommissionAmount : payoutTarget.booking.operatorCommissionAmount} USD</strong> correspondiente a la reserva <strong>{payoutTarget.booking.bookingCode}</strong>.
            </p>

            <div className="space-y-1 text-xs">
              <label className="font-bold text-zinc-300 uppercase tracking-wider block">
                Comprobante / Referencia de Transferencia *
              </label>
              <input
                type="text"
                required
                value={payoutReference}
                onChange={(e) => setPayoutReference(e.target.value)}
                placeholder="ej: TRANSF_BANCO_PICHINCHA_9921"
                className="w-full px-3.5 py-2.5 bg-black/40 border border-zinc-700 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setPayoutTarget(null)}
                className="px-3.5 py-2 rounded-xl border border-zinc-700 text-xs text-zinc-400 hover:text-white"
              >
                Cancelar
              </button>

              <Button
                onClick={handleConfirmPayout}
                disabled={!payoutReference}
                variant="primary"
                size="sm"
                className="text-xs font-bold"
              >
                Marcar como Pagado
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
