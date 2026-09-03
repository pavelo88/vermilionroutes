'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { useSearchParams, useRouter } from 'next/navigation';
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
  FileCheck,
  MessageSquare,
  Network,
  Briefcase,
  Car,
  Hotel,
  CheckSquare,
  LogOut,
  MapPin,
  ExternalLink,
  ChevronDown,
  Building,
  CreditCard,
  Percent,
  Sliders,
  Share2
} from 'lucide-react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useCrmData } from '@/hooks/useCrmData';
import { 
  SystemUser, 
  CrmLead, 
  CrmBooking, 
  UserRole, 
  RunSheetDay, 
  PassengerProfile,
  GenealogyNode,
  WhatsAppTemplate 
} from '@/types/crm';

export function AdminCrmDashboard() {
  const locale = useLocale();
  const isEs = locale === 'es';
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');

  const {
    users,
    leads,
    bookings,
    waTemplates,
    genealogy,
    updateLeadStatus,
    assignOperatorToBooking,
    signalTripCompleted,
    approveAndPayCommission,
    markPakariDelivered,
    updateRunSheetDayStatus,
    createSystemUser,
  } = useCrmData();

  // Current session & role
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<UserRole>('super');
  const [activeRoleView, setActiveRoleView] = useState<UserRole>('super'); // Para simulación de vista
  const [authLoading, setAuthLoading] = useState(true);

  // Active Tab
  type CrmTab = 'overview' | 'sales' | 'operations' | 'amenities' | 'finance' | 'genealogy' | 'concierge' | 'team';
  const [activeTab, setActiveTab] = useState<CrmTab>(
    tabParam === 'operations' ? 'operations' :
    tabParam === 'sales' ? 'sales' :
    tabParam === 'finance' ? 'finance' :
    tabParam === 'amenities' ? 'amenities' : 'overview'
  );

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [destinationFilter, setDestinationFilter] = useState('all');

  // Modals state
  const [selectedLeadForProfile, setSelectedLeadForProfile] = useState<CrmLead | null>(null);
  const [selectedBookingForRunSheet, setSelectedBookingForRunSheet] = useState<CrmBooking | null>(null);
  const [showQuoterModal, setShowQuoterModal] = useState(false);
  const [showNewUserModal, setShowNewUserModal] = useState(false);
  const [payoutModalTarget, setPayoutModalTarget] = useState<{ booking: CrmBooking; type: 'affiliate' | 'operator' } | null>(null);
  const [payoutReference, setPayoutReference] = useState('');
  const [payoutMethod, setPayoutMethod] = useState('Banco Pichincha');

  // New User Form State
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<UserRole>('operator');
  const [newUserPhone, setNewUserPhone] = useState('');
  const [newUserCedula, setNewUserCedula] = useState('');

  // Quotation Generator State
  const [quoteTour, setQuoteTour] = useState('Galapagos Luxury Island Hopping');
  const [quotePax, setQuotePax] = useState(2);
  const [quoteTier, setQuoteTier] = useState<'comfort' | 'premium' | 'luxury'>('premium');
  const [quotePrivateFlight, setQuotePrivateFlight] = useState(false);
  const [quoteDiscount, setQuoteDiscount] = useState(10); // 10% embajador

  // Base Prices for Quoter
  const quoteBasePrice = quoteTier === 'comfort' ? 3800 : quoteTier === 'premium' ? 5900 : 8900;
  const flightAddon = quotePrivateFlight ? 1200 * quotePax : 0;
  const quoteSubtotal = (quoteBasePrice * quotePax) + flightAddon;
  const quoteDiscountAmount = (quoteSubtotal * quoteDiscount) / 100;
  const quoteTotal = quoteSubtotal - quoteDiscountAmount;
  const quoteAffiliateCommission = (quoteTotal * 0.10);
  const quoteOperatorFee = 350 * quotePax;
  const quoteDirectCost = (quoteBasePrice * 0.55 * quotePax) + (quotePrivateFlight ? 900 * quotePax : 0);
  const quoteNetProfit = quoteTotal - quoteDirectCost - quoteAffiliateCommission - quoteOperatorFee;
  const quoteMarginPercent = Math.round((quoteNetProfit / quoteTotal) * 100);

  // Authentication & Role fetching
  useEffect(() => {
    if (!auth) {
      setAuthLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser && firebaseUser.email) {
        setCurrentUser(firebaseUser);
        const cleanEmail = firebaseUser.email.toLowerCase().trim();
        if (db) {
          try {
            const snap = await getDoc(doc(db, 'usuarios', cleanEmail));
            if (snap.exists()) {
              const r = snap.data()?.role as UserRole;
              if (r) {
                setUserRole(r);
                setActiveRoleView(r);
              }
            }
          } catch (e) {
            console.warn('[Admin Dashboard] Role check notice:', e);
          }
        }
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    if (auth) await signOut(auth).catch(() => {});
    router.replace(`/${locale}`);
  };

  // RBAC Permission Logic for Sidebar Items
  const canAccess = (tab: CrmTab): boolean => {
    const role = activeRoleView;
    if (role === 'super' || role === 'admin') return true;
    if (role === 'sales') return tab === 'sales' || tab === 'concierge';
    if (role === 'operator') return tab === 'operations' || tab === 'amenities';
    if (role === 'financial') return tab === 'finance';
    if (role === 'concierge') return tab === 'amenities' || tab === 'concierge';
    return false;
  };

  // Submit New User
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserEmail || !newUserName) return;
    try {
      await createSystemUser({
        id: newUserEmail.toLowerCase().trim(),
        email: newUserEmail.toLowerCase().trim(),
        name: newUserName,
        role: newUserRole,
        roles: newUserRole === 'super' ? ['super', 'admin', 'operator', 'editor'] : [newUserRole],
        phone: newUserPhone,
        cedula: newUserCedula,
        isActive: true,
      });
      setShowNewUserModal(false);
      setNewUserName('');
      setNewUserEmail('');
      setNewUserPhone('');
      setNewUserCedula('');
    } catch (err) {
      console.error(err);
    }
  };

  // Submit Payout
  const handleProcessPayout = async () => {
    if (!payoutModalTarget || !payoutReference) return;
    await approveAndPayCommission(payoutModalTarget.booking.id, payoutModalTarget.type, payoutReference);
    setPayoutModalTarget(null);
    setPayoutReference('');
  };

  // Financial Summary Aggregations
  const totalGMV = bookings.reduce((acc, b) => acc + b.totalAmount, 0);
  const totalCollected = bookings.reduce((acc, b) => acc + b.paidAmount, 0);
  const totalCosts = bookings.reduce((acc, b) => acc + (b.directCosts || b.totalAmount * 0.58), 0);
  const totalAffiliateCommissions = bookings.reduce((acc, b) => acc + (b.affiliateCommissionAmount || 0), 0);
  const totalOperatorCommissions = bookings.reduce((acc, b) => acc + (b.operatorCommissionAmount || 0), 0);
  const netOperatingProfit = totalGMV - totalCosts - totalAffiliateCommissions - totalOperatorCommissions;
  const avgMargin = Math.round((netOperatingProfit / (totalGMV || 1)) * 100);

  return (
    <div className="min-h-screen bg-[#07110B] text-zinc-100 flex flex-col md:flex-row">
      
      {/* ── 1. SIDEBAR DE NAVEGACIÓN DINÁMICO RBAC ──────────────────────────── */}
      <aside className="w-full md:w-72 bg-[#060D08] border-r border-emerald-950/60 p-5 flex flex-col justify-between shrink-0 shadow-2xl z-20">
        <div className="space-y-6">
          
          {/* Brand Header */}
          <div className="flex items-center gap-3 pb-5 border-b border-emerald-950/80">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 shadow-lg shadow-amber-500/10">
              <div className="w-full h-full bg-[#07130C] rounded-[14px] flex items-center justify-center">
                <Image src="/icon.png" alt="Vermilion" width={26} height={26} className="object-contain" />
              </div>
            </div>
            <div>
              <span className="font-serif text-sm font-bold tracking-tight text-white block">
                VERMILION <span className="text-[#C9A84C] font-normal">ENTERPRISE</span>
              </span>
              <span className="text-[9px] text-zinc-400 uppercase tracking-widest block font-mono">
                Master Command CRM
              </span>
            </div>
          </div>

          {/* User Profile & Role Indicator */}
          <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-900/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider">Tu Rol Autorizado</span>
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider ${
                userRole === 'super' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                userRole === 'admin' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                userRole === 'operator' ? 'bg-teal-500/20 text-teal-400 border border-teal-500/30' :
                'bg-blue-500/20 text-blue-400 border border-blue-500/30'
              }`}>
                {userRole}
              </span>
            </div>
            <p className="text-xs font-semibold text-white truncate">
              {currentUser?.email || 'pablofgarciaf@gmail.com'}
            </p>

            {/* Simulador de Rol (Exclusivo para Super Admin) */}
            {userRole === 'super' && (
              <div className="pt-2 border-t border-emerald-950/60">
                <label className="text-[9px] text-zinc-500 uppercase tracking-widest block mb-1">
                  👁️ Simular Vista de Rol:
                </label>
                <select
                  value={activeRoleView}
                  onChange={(e) => setActiveRoleView(e.target.value as UserRole)}
                  className="w-full bg-[#0B1A12] border border-emerald-800/50 rounded-lg text-[10px] text-zinc-300 py-1 px-2 focus:outline-none focus:border-amber-500"
                >
                  <option value="super">Super Admin (Todas las 8 Áreas)</option>
                  <option value="admin">Admin Operativo (Gestión Total)</option>
                  <option value="operator">Operador / Guía (Run-Sheet & Amenities)</option>
                  <option value="sales">Comercial / Ventas (Pipeline & Cotizador)</option>
                  <option value="financial">Finanzas (P&L & Dispersión de Pagos)</option>
                  <option value="concierge">Concierge (Pakari & WhatsApp)</option>
                </select>
              </div>
            )}
          </div>

          {/* Navigation Links (Filtered by RBAC) */}
          <nav className="space-y-1">
            <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500 px-3 block mb-2">
              Módulos Departamentales
            </span>

            {canAccess('overview') && (
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'overview'
                    ? 'bg-amber-500 text-black shadow-lg font-bold'
                    : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <TrendingUp className="w-4 h-4" />
                  <span>Tablero Ejecutivo (BI)</span>
                </div>
                <span className="text-[10px] font-mono opacity-80">${Math.round(totalGMV / 1000)}k</span>
              </button>
            )}

            {canAccess('sales') && (
              <button
                onClick={() => setActiveTab('sales')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'sales'
                    ? 'bg-amber-500 text-black shadow-lg font-bold'
                    : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Briefcase className="w-4 h-4" />
                  <span>Ventas & Pipeline</span>
                </div>
                <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                  {leads.length}
                </span>
              </button>
            )}

            {canAccess('operations') && (
              <button
                onClick={() => setActiveTab('operations')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'operations'
                    ? 'bg-amber-500 text-black shadow-lg font-bold'
                    : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Compass className="w-4 h-4" />
                  <span>Operaciones & Run-Sheet</span>
                </div>
                <span className="px-1.5 py-0.5 rounded-full bg-teal-500/20 text-teal-400 text-[10px] font-bold">
                  {bookings.filter(b => b.status === 'in_operation').length} en ruta
                </span>
              </button>
            )}

            {canAccess('amenities') && (
              <button
                onClick={() => setActiveTab('amenities')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'amenities'
                    ? 'bg-amber-500 text-black shadow-lg font-bold'
                    : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Gift className="w-4 h-4" />
                  <span>Amenities VIP Pakari</span>
                </div>
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              </button>
            )}

            {canAccess('finance') && (
              <button
                onClick={() => setActiveTab('finance')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'finance'
                    ? 'bg-amber-500 text-black shadow-lg font-bold'
                    : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <DollarSign className="w-4 h-4" />
                  <span>Finanzas & Liquidaciones</span>
                </div>
                {bookings.some(b => b.affiliateCommissionStatus === 'ready_for_review') && (
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                )}
              </button>
            )}

            {canAccess('genealogy') && (
              <button
                onClick={() => setActiveTab('genealogy')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'genealogy'
                    ? 'bg-amber-500 text-black shadow-lg font-bold'
                    : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Network className="w-4 h-4" />
                  <span>Red MLM & Piscinas</span>
                </div>
                <span className="text-[10px] text-zinc-500 font-mono">10-3-2</span>
              </button>
            )}

            {canAccess('concierge') && (
              <button
                onClick={() => setActiveTab('concierge')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'concierge'
                    ? 'bg-amber-500 text-black shadow-lg font-bold'
                    : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Concierge</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-bold font-mono">1-Clic</span>
              </button>
            )}

            {canAccess('team') && (
              <button
                onClick={() => setActiveTab('team')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'team'
                    ? 'bg-amber-500 text-black shadow-lg font-bold'
                    : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4" />
                  <span>Equipo & Roles</span>
                </div>
                <span className="text-[10px] text-zinc-500 font-mono">{users.length}</span>
              </button>
            )}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-4 border-t border-emerald-950/80 space-y-2">
          <Link
            href={`/${locale}`}
            className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-zinc-400 hover:text-white transition-colors flex items-center justify-between"
          >
            <span>Ver Sitio Web</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={handleLogout}
            className="w-full py-2 px-3 rounded-xl bg-rose-950/30 hover:bg-rose-900/40 text-xs text-rose-400 flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* ── 2. ÁREA DE TRABAJO PRINCIPAL (MAIN VIEWPORT) ───────────────────── */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto max-h-screen space-y-6">

        {/* Top Navbar in Viewport */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-emerald-950/60">
          <div>
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              {activeTab === 'overview' && 'Tablero Ejecutivo & Inteligencia de Negocio'}
              {activeTab === 'sales' && 'Pipeline Comercial & Fichas de Pasajeros'}
              {activeTab === 'operations' && 'Control Operativo en Ruta & Run-Sheets'}
              {activeTab === 'amenities' && 'Pakari Experience & Amenidades de Lujo'}
              {activeTab === 'finance' && 'Tesorería, P&L & Dispersión de Comisiones'}
              {activeTab === 'genealogy' && 'Supervisión de Red de Embajadores'}
              {activeTab === 'concierge' && 'Concierge Omnicanal & WhatsApp VIP'}
              {activeTab === 'team' && 'Directorio de Personal & Gestión de Roles'}
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              Vermilion Routes Luxury Expeditions · Ecosistema Empresarial Unificado
            </p>
          </div>

          <div className="flex items-center gap-3">
            {activeTab === 'sales' && (
              <button
                onClick={() => setShowQuoterModal(true)}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-black font-extrabold uppercase tracking-wider text-xs flex items-center gap-2 shadow-lg shadow-amber-950/50 hover:scale-105 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Cotizador Rápido VIP</span>
              </button>
            )}

            {activeTab === 'team' && (
              <button
                onClick={() => setShowNewUserModal(true)}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold uppercase tracking-wider text-xs flex items-center gap-2 shadow-lg hover:scale-105 transition-all cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                <span>Nuevo Colaborador</span>
              </button>
            )}
          </div>
        </header>

        {/* ── TAB 1: TABLERO EJECUTIVO (BI) ─────────────────────────────────── */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-3xl bg-[#0B1A12]/80 border border-emerald-900/40 shadow-xl space-y-2">
                <span className="text-zinc-400 text-xs font-mono uppercase tracking-wider block">Volumen Bruto (GMV)</span>
                <h3 className="font-serif text-3xl font-extrabold text-white tracking-tight">
                  ${totalGMV.toLocaleString('en-US')} <span className="text-xs font-normal text-emerald-400">USD</span>
                </h3>
                <p className="text-[11px] text-zinc-400">Total expediciones confirmadas en el periodo</p>
              </div>

              <div className="p-5 rounded-3xl bg-[#0B1A12]/80 border border-emerald-900/40 shadow-xl space-y-2">
                <span className="text-zinc-400 text-xs font-mono uppercase tracking-wider block">Cobrado en Cuenta</span>
                <h3 className="font-serif text-3xl font-extrabold text-emerald-400 tracking-tight">
                  ${totalCollected.toLocaleString('en-US')} <span className="text-xs font-normal text-zinc-400">USD</span>
                </h3>
                <p className="text-[11px] text-zinc-400">{Math.round((totalCollected / (totalGMV || 1)) * 100)}% de recaudación efectiva</p>
              </div>

              <div className="p-5 rounded-3xl bg-[#0B1A12]/80 border border-amber-900/40 shadow-xl space-y-2">
                <span className="text-amber-300 text-xs font-mono uppercase tracking-wider block">Utilidad Neta P&L</span>
                <h3 className="font-serif text-3xl font-extrabold text-[#D4AF37] tracking-tight">
                  ${netOperatingProfit.toLocaleString('en-US')} <span className="text-xs font-normal text-amber-200">USD</span>
                </h3>
                <p className="text-[11px] text-amber-400/80">Margen neto corporativo promedio: <strong>{avgMargin}%</strong></p>
              </div>

              <div className="p-5 rounded-3xl bg-[#0B1A12]/80 border border-teal-900/40 shadow-xl space-y-2">
                <span className="text-teal-300 text-xs font-mono uppercase tracking-wider block">Tours en Operación</span>
                <h3 className="font-serif text-3xl font-extrabold text-teal-400 tracking-tight">
                  {bookings.filter(b => b.status === 'in_operation').length} <span className="text-xs font-normal text-zinc-400">viajes</span>
                </h3>
                <p className="text-[11px] text-teal-300/80">Pasajeros atendidos en campo en este momento</p>
              </div>
            </div>

            {/* Próximas Salidas & Alertas Operativas */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 p-6 rounded-3xl bg-[#0B1A12]/60 border border-emerald-950/80 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-400" />
                    <span>Próximas Expediciones Confirmadas</span>
                  </h3>
                  <button onClick={() => setActiveTab('operations')} className="text-xs text-amber-400 hover:underline">
                    Ver Run-Sheets →
                  </button>
                </div>

                <div className="space-y-3">
                  {bookings.map((b) => (
                    <div key={b.id} className="p-4 rounded-2xl bg-black/40 border border-emerald-900/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold">
                            {b.bookingCode}
                          </span>
                          <span className="text-xs text-zinc-400 font-mono">{b.travelStartDate} al {b.travelEndDate}</span>
                        </div>
                        <h4 className="text-sm font-bold text-white mt-1">{b.tourTitle}</h4>
                        <p className="text-xs text-zinc-400">
                          Pasajeros: <strong className="text-white">{b.customerName}</strong> ({b.passengersCount} pax) · Guía: <strong className="text-teal-400">{b.assignedOperatorName || 'Por asignar'}</strong>
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-sm font-extrabold text-white block">${b.totalAmount.toLocaleString('en-US')} USD</span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full inline-block mt-1 ${
                          b.status === 'in_operation' ? 'bg-teal-500/20 text-teal-300' : 'bg-amber-500/20 text-amber-300'
                        }`}>
                          {b.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Embajadores Widget */}
              <div className="p-6 rounded-3xl bg-[#0B1A12]/60 border border-emerald-950/80 space-y-4">
                <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Top Embajadores del Mes</span>
                </h3>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-2xl bg-black/40 border border-amber-500/20 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-white block">@pablo.g (Founder)</span>
                      <span className="text-[10px] text-zinc-400">6 reservas generadas</span>
                    </div>
                    <span className="text-sm font-mono font-extrabold text-[#D4AF37]">$21,904 USD</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-black/40 border border-emerald-900/20 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-white block">@maria.luxury</span>
                      <span className="text-[10px] text-zinc-400">4 reservas generadas</span>
                    </div>
                    <span className="text-sm font-mono font-bold text-white">$14,500 USD</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-black/40 border border-emerald-900/20 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-white block">@andres.advisor</span>
                      <span className="text-[10px] text-zinc-400">2 reservas generadas</span>
                    </div>
                    <span className="text-sm font-mono font-bold text-white">$8,200 USD</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-300 leading-snug">
                  ✨ Las 3 Piscinas Globales de utilidades acumulan <strong>$1,314 USD</strong> listos para ser distribuidos este mes.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 2: VENTAS & PIPELINE ─────────────────────────────────────── */}
        {activeTab === 'sales' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-400 font-mono">Filtrar destino:</span>
                <select
                  value={destinationFilter}
                  onChange={(e) => setDestinationFilter(e.target.value)}
                  className="bg-[#0B1A12] border border-emerald-900/50 rounded-xl px-3 py-1.5 text-xs text-white"
                >
                  <option value="all">Todos los Destinos</option>
                  <option value="Galapagos">Galápagos</option>
                  <option value="Amazon">Amazonía</option>
                  <option value="Andes">Andes</option>
                </select>
              </div>

              <div className="relative">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar prospecto o correo..."
                  className="pl-9 pr-4 py-1.5 bg-[#0B1A12] border border-emerald-900/50 rounded-xl text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Kanban Columns Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Column 1: Nuevos */}
              <div className="p-4 rounded-3xl bg-[#060D08] border border-emerald-950/80 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-emerald-950">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">1. Nuevos Leads</span>
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] flex items-center justify-center font-bold">
                    {leads.filter(l => l.status === 'new').length}
                  </span>
                </div>

                <div className="space-y-3">
                  {leads.filter(l => l.status === 'new').map((l) => (
                    <div key={l.id} className="p-4 rounded-2xl bg-[#0B1A12] border border-emerald-900/30 space-y-2 hover:border-amber-500/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-zinc-400">{l.destination}</span>
                        <span className="text-[10px] text-amber-400 font-bold">${l.estimatedBudget.toLocaleString('en-US')}</span>
                      </div>
                      <h4 className="text-xs font-bold text-white">{l.customerName}</h4>
                      <p className="text-[11px] text-zinc-400 line-clamp-2">{l.notes}</p>
                      
                      <div className="pt-2 border-t border-emerald-950 flex items-center justify-between">
                        <button
                          onClick={() => setSelectedLeadForProfile(l)}
                          className="text-[10px] text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <Eye className="w-3 h-3" /> Ficha 360°
                        </button>
                        <button
                          onClick={() => updateLeadStatus(l.id, 'contacted')}
                          className="px-2 py-1 rounded bg-amber-500 text-black text-[10px] font-bold cursor-pointer hover:bg-amber-400"
                        >
                          Contactar →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 2: Contactados */}
              <div className="p-4 rounded-3xl bg-[#060D08] border border-emerald-950/80 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-emerald-950">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">2. Contactados</span>
                  <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 text-[10px] flex items-center justify-center font-bold">
                    {leads.filter(l => l.status === 'contacted').length}
                  </span>
                </div>

                <div className="space-y-3">
                  {leads.filter(l => l.status === 'contacted').map((l) => (
                    <div key={l.id} className="p-4 rounded-2xl bg-[#0B1A12] border border-emerald-900/30 space-y-2">
                      <span className="text-[10px] font-mono text-zinc-400">{l.destination}</span>
                      <h4 className="text-xs font-bold text-white">{l.customerName}</h4>
                      <p className="text-[11px] text-zinc-400">{l.customerEmail}</p>
                      <button
                        onClick={() => updateLeadStatus(l.id, 'itinerary_sent')}
                        className="w-full py-1.5 rounded bg-blue-600 text-white text-[10px] font-bold mt-2 cursor-pointer"
                      >
                        Enviar Cotización →
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 3: Cotización Enviada */}
              <div className="p-4 rounded-3xl bg-[#060D08] border border-emerald-950/80 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-emerald-950">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400">3. Cotización Enviada</span>
                  <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 text-[10px] flex items-center justify-center font-bold">
                    {leads.filter(l => l.status === 'itinerary_sent' || l.status === 'negotiation').length}
                  </span>
                </div>

                <div className="space-y-3">
                  {leads.filter(l => l.status === 'itinerary_sent' || l.status === 'negotiation').map((l) => (
                    <div key={l.id} className="p-4 rounded-2xl bg-[#0B1A12] border border-purple-900/30 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-purple-300">En Negociación</span>
                        <span className="text-[10px] text-white font-bold">${l.estimatedBudget.toLocaleString('en-US')}</span>
                      </div>
                      <h4 className="text-xs font-bold text-white">{l.customerName}</h4>
                      <button
                        onClick={() => setSelectedLeadForProfile(l)}
                        className="text-[10px] text-zinc-400 hover:underline flex items-center gap-1"
                      >
                        <Eye className="w-3 h-3" /> Ver Requerimientos VIP
                      </button>
                      <button
                        onClick={() => updateLeadStatus(l.id, 'won')}
                        className="w-full py-1.5 rounded bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-[10px] font-bold mt-2 cursor-pointer"
                      >
                        ✓ Cerrar Venta Ganada
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 4: Ventas Ganadas */}
              <div className="p-4 rounded-3xl bg-[#060D08] border border-emerald-950/80 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-emerald-950">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">4. Ganadas (Bookings)</span>
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] flex items-center justify-center font-bold">
                    {leads.filter(l => l.status === 'won').length}
                  </span>
                </div>

                <div className="space-y-3">
                  {leads.filter(l => l.status === 'won').map((l) => (
                    <div key={l.id} className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                      <span className="text-[10px] font-mono text-emerald-400">Listo para Run-Sheet</span>
                      <h4 className="text-xs font-bold text-white">{l.customerName}</h4>
                      <p className="text-[10px] text-zinc-400">${l.estimatedBudget.toLocaleString('en-US')} USD</p>
                      <button
                        onClick={() => setActiveTab('operations')}
                        className="text-[10px] text-[#D4AF37] hover:underline block pt-1 font-bold"
                      >
                        Ver en Operaciones →
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 3: OPERACIONES & RUN-SHEET ───────────────────────────────── */}
        {activeTab === 'operations' && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-teal-950/30 border border-teal-800/40 text-xs text-teal-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-teal-400 shrink-0" />
                <span>
                  <strong>Portal de Campo:</strong> Control del Run-Sheet día por día, asignación de choferes, hoteles de lujo y emisión de señal de liquidación.
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {bookings.map((booking) => (
                <div key={booking.id} className="p-6 rounded-3xl bg-[#0B1A12]/80 border border-emerald-900/40 shadow-xl space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-emerald-950">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-lg bg-teal-500/20 text-teal-300 font-mono text-xs font-bold border border-teal-500/30">
                          {booking.bookingCode}
                        </span>
                        <span className="text-xs text-zinc-400 font-mono">
                          {booking.travelStartDate} — {booking.travelEndDate}
                        </span>
                      </div>
                      <h3 className="font-serif text-lg font-bold text-white mt-1">{booking.tourTitle}</h3>
                      <p className="text-xs text-zinc-400">
                        Pasajero Titular: <strong className="text-white">{booking.customerName}</strong> ({booking.passengersCount} pax) · Tel: {booking.customerPhone}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => setSelectedBookingForRunSheet(booking)}
                        className="px-3 py-2 rounded-xl bg-teal-500/20 text-teal-300 hover:bg-teal-500/30 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <Car className="w-4 h-4" />
                        <span>Ver Hoja de Ruta (Run-Sheet)</span>
                      </button>

                      {booking.status !== 'completed' ? (
                        <button
                          onClick={() => signalTripCompleted(booking.id, booking.assignedOperatorName || 'Operador')}
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
                        >
                          ✓ Señalar Viaje Realizado
                        </button>
                      ) : (
                        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold border border-emerald-500/30">
                          Expedición Culminada
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quick Run-Sheet Summary Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {booking.runSheet?.map((day) => (
                      <div key={day.dayNumber} className="p-3.5 rounded-2xl bg-black/40 border border-emerald-900/30 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-[#D4AF37] font-bold">Día {day.dayNumber} · {day.date}</span>
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                            day.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' :
                            day.status === 'in_progress' ? 'bg-amber-500/20 text-amber-400' :
                            'bg-zinc-800 text-zinc-400'
                          }`}>
                            {day.status}
                          </span>
                        </div>
                        <h5 className="text-xs font-bold text-white">{day.title}</h5>
                        <p className="text-[11px] text-zinc-400 leading-snug">{day.activitiesSummary}</p>
                        
                        <div className="pt-2 border-t border-emerald-950/60 flex items-center justify-between text-[10px] text-zinc-400">
                          <span>Chofer: <strong className="text-white">{day.driverName || 'N/A'}</strong> ({day.vehiclePlate || 'S/P'})</span>
                          <span>Pick-up: <strong className="text-teal-400">{day.pickupTime || 'Por coordinar'}</strong></span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB 4: AMENITIES VIP PAKARI ───────────────────────────────────── */}
        {activeTab === 'amenities' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-gradient-to-r from-stone-900 via-[#0B1A12] to-stone-950 border border-amber-500/30 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] font-bold block mb-1">
                  Experiencia Gastronómica & Regalos de Autor
                </span>
                <h3 className="font-serif text-2xl font-bold text-white">Pakari Organic Chocolate & Sombreros Montecristi</h3>
                <p className="text-xs text-zinc-400 mt-1 max-w-xl">
                  Cada expedición privada incluye un kit de bienvenida con los mejores productos de Ecuador: chocolate Pakari premiado internacionalmente y sombreros de paja toquilla hechos a mano.
                </p>
              </div>
              <div className="shrink-0 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center">
                <span className="text-[10px] text-zinc-400 font-mono block">Kits Entregados</span>
                <span className="font-serif text-3xl font-extrabold text-[#D4AF37]">
                  {bookings.filter(b => b.vipGiftDelivered).length} / {bookings.length}
                </span>
              </div>
            </div>

            {/* Amenities Orders Table */}
            <div className="p-6 rounded-3xl bg-[#0B1A12]/80 border border-emerald-900/40 shadow-xl space-y-4">
              <h4 className="font-serif text-base font-bold text-white">Órdenes de Amenidad por Despachar</h4>

              <div className="space-y-3">
                {bookings.map((booking) => (
                  <div key={booking.id} className="p-4 rounded-2xl bg-black/40 border border-emerald-900/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-mono text-amber-400">{booking.bookingCode} · {booking.destination}</span>
                      <h4 className="text-sm font-bold text-white mt-0.5">{booking.customerName}</h4>
                      <p className="text-xs text-zinc-400">
                        Kit Asignado: <strong className="text-white">{booking.vipGiftAssigned || 'Pakari Imperial Edition'}</strong>
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      {booking.vipGiftDelivered ? (
                        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold flex items-center gap-1.5 border border-emerald-500/30">
                          <CheckCircle2 className="w-4 h-4" /> Entregado a Bordo
                        </span>
                      ) : (
                        <button
                          onClick={() => markPakariDelivered(booking.id, booking.assignedOperatorName || 'Operador')}
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md"
                        >
                          Confirmar Entrega en Transfer
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 5: FINANZAS & P&L ─────────────────────────────────────────── */}
        {activeTab === 'finance' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-[#0B1A12]/80 border border-emerald-900/40 shadow-xl space-y-4">
              <h4 className="font-serif text-lg font-bold text-white">Matriz de Rentabilidad (P&L) por Expedición</h4>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-zinc-300">
                  <thead className="border-b border-emerald-950 text-zinc-500 font-mono uppercase text-[10px]">
                    <tr>
                      <th className="p-3">Código</th>
                      <th className="p-3">Pasajero</th>
                      <th className="p-3 text-right">Venta Bruta</th>
                      <th className="p-3 text-right">Costos Directos</th>
                      <th className="p-3 text-right">Comisión Embajador</th>
                      <th className="p-3 text-right">Comisión Guía</th>
                      <th className="p-3 text-right">Utilidad Neta</th>
                      <th className="p-3 text-center">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-emerald-950/60 font-mono">
                    {bookings.map((b) => {
                      const cost = b.directCosts || (b.totalAmount * 0.58);
                      const affCom = b.affiliateCommissionAmount || 0;
                      const opCom = b.operatorCommissionAmount || 0;
                      const net = b.totalAmount - cost - affCom - opCom;
                      const margin = Math.round((net / b.totalAmount) * 100);

                      return (
                        <tr key={b.id} className="hover:bg-white/5">
                          <td className="p-3 font-bold text-amber-400">{b.bookingCode}</td>
                          <td className="p-3 text-white font-sans">{b.customerName}</td>
                          <td className="p-3 text-right text-white font-bold">${b.totalAmount.toLocaleString('en-US')}</td>
                          <td className="p-3 text-right text-rose-400">-${cost.toLocaleString('en-US')}</td>
                          <td className="p-3 text-right text-amber-400">
                            -${affCom.toLocaleString('en-US')}
                            <span className="text-[9px] block text-zinc-500">({b.affiliateCommissionStatus})</span>
                          </td>
                          <td className="p-3 text-right text-teal-400">
                            -${opCom.toLocaleString('en-US')}
                            <span className="text-[9px] block text-zinc-500">({b.operatorCommissionStatus})</span>
                          </td>
                          <td className="p-3 text-right font-extrabold text-emerald-400">
                            +${net.toLocaleString('en-US')} <span className="text-[10px] font-normal">({margin}%)</span>
                          </td>
                          <td className="p-3 text-center">
                            {b.affiliateCommissionStatus === 'ready_for_review' && (
                              <button
                                onClick={() => setPayoutModalTarget({ booking: b, type: 'affiliate' })}
                                className="px-2.5 py-1 rounded bg-amber-500 hover:bg-amber-400 text-black text-[10px] font-bold cursor-pointer font-sans"
                              >
                                Dispersar Pago
                              </button>
                            )}
                            {b.affiliateCommissionStatus === 'paid' && (
                              <span className="text-[10px] text-emerald-400 font-sans">✓ Liquidado</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 6: RED MLM & GENEALOGÍA ───────────────────────────────────── */}
        {activeTab === 'genealogy' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-[#0B1A12]/80 border border-emerald-900/40 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-lg font-bold text-white">Árbol Genealógico & Supervisión Unilevel</h4>
                  <p className="text-xs text-zinc-400">Estructura de patrocinios 10-3-2 y comisiones de red.</p>
                </div>
                <div className="text-xs font-mono px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Plan de Compensación Activo
                </div>
              </div>

              {/* Interactive Tree Root */}
              <div className="p-5 rounded-2xl bg-black/60 border border-amber-500/30 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center text-black font-extrabold text-sm">
                      👑
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">@{genealogy.username} ({genealogy.name})</h4>
                      <span className="text-xs text-amber-400 font-mono">{genealogy.rank} · Nivel 0</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-zinc-400 font-mono block">Ventas de Red:</span>
                    <span className="font-mono font-extrabold text-lg text-white">${genealogy.totalSales.toLocaleString('en-US')} USD</span>
                  </div>
                </div>

                {/* Level 1 Children */}
                <div className="pl-6 border-l-2 border-amber-500/30 space-y-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block">Nivel 1 (Hijos Directos — 3% Comisión Padre)</span>
                  
                  {genealogy.children?.map((child) => (
                    <div key={child.username} className="p-3.5 rounded-xl bg-[#0B1A12] border border-emerald-900/40 space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="text-xs font-bold text-white">@{child.username} ({child.name})</h5>
                          <span className="text-[10px] text-zinc-400 font-mono">{child.rank} · {child.email}</span>
                        </div>
                        <span className="text-xs font-mono font-bold text-emerald-400">${child.totalSales.toLocaleString('en-US')} USD</span>
                      </div>

                      {/* Level 2 Grandchildren */}
                      {child.children && child.children.length > 0 && (
                        <div className="pl-4 border-l border-emerald-800/40 space-y-1.5 pt-2">
                          <span className="text-[9px] font-mono text-zinc-500 block">Nivel 2 (Nietos — 2% Comisión Abuelo)</span>
                          {child.children.map((grand) => (
                            <div key={grand.username} className="p-2 rounded-lg bg-black/40 flex items-center justify-between text-xs">
                              <span className="text-zinc-300">@{grand.username} ({grand.name})</span>
                              <span className="text-teal-400 font-mono font-bold">${grand.totalSales.toLocaleString('en-US')} USD</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 7: CONCIERGE WHATSAPP ────────────────────────────────────── */}
        {activeTab === 'concierge' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-[#0B1A12]/80 border border-emerald-900/40 shadow-xl space-y-4">
              <h4 className="font-serif text-lg font-bold text-white">Plantillas de Concierge Rápido para WhatsApp</h4>
              <p className="text-xs text-zinc-400">Atención personalizada inmediata con un solo clic.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {waTemplates.map((template) => (
                  <div key={template.id} className="p-4 rounded-2xl bg-black/40 border border-emerald-900/30 space-y-3 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase font-bold text-amber-400">
                          {template.category} · {template.lang.toUpperCase()}
                        </span>
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                      </div>
                      <h5 className="text-xs font-bold text-white mt-1">{template.title}</h5>
                      <p className="text-[11px] text-zinc-400 mt-2 bg-[#0B1A12] p-3 rounded-xl font-mono leading-relaxed border border-emerald-950">
                        {template.body}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        const encoded = encodeURIComponent(template.body.replace('{nombre}', 'Estimado Pasajero').replace('{concierge}', 'Carlos').replace('{destino}', 'Galápagos'));
                        window.open(`https://wa.me/?text=${encoded}`, '_blank');
                      }}
                      className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Abrir en WhatsApp Web</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 8: EQUIPO & ROLES ─────────────────────────────────────────── */}
        {activeTab === 'team' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-[#0B1A12]/80 border border-emerald-900/40 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-lg font-bold text-white">Directorio de Personal Corporativo</h4>
                  <p className="text-xs text-zinc-400">Cuentas y roles sincronizados en la colección `usuarios` de Firestore.</p>
                </div>
              </div>

              <div className="space-y-3">
                {users.map((u) => (
                  <div key={u.id} className="p-4 rounded-2xl bg-black/40 border border-emerald-900/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider ${
                          u.role === 'super' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                          u.role === 'operator' ? 'bg-teal-500/20 text-teal-400 border border-teal-500/30' :
                          'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        }`}>
                          {u.role}
                        </span>
                        <h4 className="text-xs font-bold text-white">{u.name}</h4>
                      </div>
                      <p className="text-xs text-zinc-400 font-mono mt-0.5">{u.email} · Tel: {u.phone || 'N/A'}</p>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-zinc-500 font-mono block">Cédula / ID: {u.cedula || 'N/A'}</span>
                      <span className="text-[10px] text-emerald-400 font-bold">● Activo en Sistema</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* ── MODAL: COTIZADOR RÁPIDO VIP DE TOURS ─────────────────────────────── */}
      {showQuoterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-[#0B1A12] border border-[#D4AF37]/50 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-950">
              <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>Cotizador Rápido de Expediciones VIP</span>
              </h3>
              <button onClick={() => setShowQuoterModal(false)} className="text-zinc-400 hover:text-white text-xs">
                ✕ Cerrar
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="text-zinc-400 block mb-1">Expedición Base:</label>
                <select
                  value={quoteTour}
                  onChange={(e) => setQuoteTour(e.target.value)}
                  className="w-full bg-black/60 border border-emerald-900/50 rounded-xl p-2.5 text-white"
                >
                  <option value="Galapagos Luxury Island Hopping">Galapagos Luxury Island Hopping (8D/7N)</option>
                  <option value="Ecuador Avenue of the Volcanoes">Ecuador Avenue of the Volcanoes & Haciendas (10D/9N)</option>
                  <option value="Amazon & Choco Andino Private">Amazon & Chocó Andino Private Expedition (6D/5N)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-zinc-400 block mb-1">Pasajeros (Pax):</label>
                  <input
                    type="number"
                    min="1"
                    max="16"
                    value={quotePax}
                    onChange={(e) => setQuotePax(Number(e.target.value) || 1)}
                    className="w-full bg-black/60 border border-emerald-900/50 rounded-xl p-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-zinc-400 block mb-1">Categoría Hotelera:</label>
                  <select
                    value={quoteTier}
                    onChange={(e) => setQuoteTier(e.target.value as any)}
                    className="w-full bg-black/60 border border-emerald-900/50 rounded-xl p-2 text-white"
                  >
                    <option value="comfort">Comfort Boutique (3*)</option>
                    <option value="premium">Premium Relais & Châteaux (4*)</option>
                    <option value="luxury">Luxury Grand Cruise (5*)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="flight"
                  checked={quotePrivateFlight}
                  onChange={(e) => setQuotePrivateFlight(e.target.checked)}
                  className="rounded text-amber-500"
                />
                <label htmlFor="flight" className="text-zinc-300">Incluir Chárter Aéreo Privado VIP (+ $1,200/pax)</label>
              </div>

              {/* Live Quotation Summary */}
              <div className="p-4 rounded-2xl bg-black/60 border border-amber-500/30 space-y-2 font-mono text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal Tarifa Bruta:</span>
                  <span>${quoteSubtotal.toLocaleString('en-US')} USD</span>
                </div>
                <div className="flex justify-between text-emerald-400">
                  <span>Descuento Código Embajador (10%):</span>
                  <span>-${quoteDiscountAmount.toLocaleString('en-US')} USD</span>
                </div>
                <div className="flex justify-between text-white font-extrabold text-sm pt-1 border-t border-emerald-950">
                  <span>PRECIO FINAL PASAJERO:</span>
                  <span className="text-[#D4AF37]">${quoteTotal.toLocaleString('en-US')} USD</span>
                </div>
                <div className="flex justify-between text-amber-300 pt-1 text-[11px]">
                  <span>Comisión Directa Embajador (10%):</span>
                  <span>${quoteAffiliateCommission.toLocaleString('en-US')} USD</span>
                </div>
                <div className="flex justify-between text-teal-300 text-[11px]">
                  <span>Honorario Estimado Guía/Operador:</span>
                  <span>${quoteOperatorFee.toLocaleString('en-US')} USD</span>
                </div>
                <div className="flex justify-between text-emerald-400 text-xs font-bold pt-1 border-t border-emerald-950">
                  <span>Margen Neto para Vermilion Routes:</span>
                  <span>+${quoteNetProfit.toLocaleString('en-US')} USD ({quoteMarginPercent}%)</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                const msg = `Propuesta Exclusiva Vermilion Routes:\nTour: ${quoteTour}\nPasajeros: ${quotePax}\nCategoría: ${quoteTier.toUpperCase()}\nTotal Final: $${quoteTotal.toLocaleString('en-US')} USD\nIncluye: Concierge, Chofer Privado y Amenities Pakari.`;
                window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-extrabold uppercase tracking-wider text-xs shadow-lg cursor-pointer"
            >
              Enviar Cotización por WhatsApp
            </button>
          </div>
        </div>
      )}

      {/* ── MODAL: FICHA 360° DEL PASAJERO ─────────────────────────────────── */}
      {selectedLeadForProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-[#0B1A12] border border-emerald-800/60 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-950">
              <div>
                <span className="text-[10px] font-mono text-amber-400 uppercase">Ficha 360° Pasajero</span>
                <h3 className="font-serif text-lg font-bold text-white">{selectedLeadForProfile.customerName}</h3>
              </div>
              <button onClick={() => setSelectedLeadForProfile(null)} className="text-zinc-400 hover:text-white text-xs">
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-black/40 border border-emerald-950 space-y-1">
                <span className="text-zinc-500 text-[10px] font-mono block">RESTRICCIONES ALIMENTICIAS & ALERGIAS:</span>
                <p className="text-amber-300 font-bold">
                  {selectedLeadForProfile.passengerDetails?.dietaryRestrictions || 'Ninguna registrada'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 rounded-xl bg-black/40 border border-emerald-950">
                  <span className="text-zinc-500 text-[10px] font-mono block">NACIONALIDAD / PASAPORTE:</span>
                  <p className="text-white font-bold">{selectedLeadForProfile.passengerDetails?.nationality || selectedLeadForProfile.country || 'USA'}</p>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-emerald-950">
                  <span className="text-zinc-500 text-[10px] font-mono block">TALLA SOMBRERO MONTECRISTI:</span>
                  <p className="text-emerald-400 font-bold">{selectedLeadForProfile.passengerDetails?.hatSize || '58 (M)'}</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-emerald-950">
                <span className="text-zinc-500 text-[10px] font-mono block">NIVEL DE CONDICIÓN FÍSICA:</span>
                <p className="text-white font-bold uppercase">{selectedLeadForProfile.passengerDetails?.fitnessLevel || 'Moderado'}</p>
              </div>
            </div>

            <button
              onClick={() => setSelectedLeadForProfile(null)}
              className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs"
            >
              Cerrar Ficha
            </button>
          </div>
        </div>
      )}

      {/* ── MODAL: RUN-SHEET COMPLETO ───────────────────────────────────────── */}
      {selectedBookingForRunSheet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-2xl bg-[#0B1A12] border border-teal-800/60 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-950">
              <div>
                <span className="text-[10px] font-mono text-teal-400 uppercase">Run-Sheet Operativo</span>
                <h3 className="font-serif text-lg font-bold text-white">{selectedBookingForRunSheet.tourTitle}</h3>
              </div>
              <button onClick={() => setSelectedBookingForRunSheet(null)} className="text-zinc-400 hover:text-white text-xs">
                ✕
              </button>
            </div>

            <div className="space-y-3">
              {selectedBookingForRunSheet.runSheet?.map((day) => (
                <div key={day.dayNumber} className="p-4 rounded-2xl bg-black/50 border border-teal-900/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white">Día {day.dayNumber}: {day.title}</h4>
                    <span className="text-[10px] font-mono text-teal-400">{day.date}</span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">{day.activitiesSummary}</p>
                  
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-emerald-950/60 text-[11px] text-zinc-400">
                    <div>Chofer: <strong className="text-white">{day.driverName}</strong> ({day.driverPhone})</div>
                    <div>Vehículo: <strong className="text-white">{day.vehiclePlate}</strong></div>
                    <div>Hotel: <strong className="text-white">{day.hotelName}</strong></div>
                    <div>Confirmación: <strong className="text-amber-400">{day.hotelConfirmation}</strong></div>
                  </div>

                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => updateRunSheetDayStatus(selectedBookingForRunSheet.id, day.dayNumber, 'completed')}
                      className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold cursor-pointer"
                    >
                      ✓ Check-in Completado
                    </button>
                    <button
                      onClick={() => updateRunSheetDayStatus(selectedBookingForRunSheet.id, day.dayNumber, 'in_progress')}
                      className="px-3 py-1 rounded-lg bg-amber-500/20 text-amber-300 text-[10px] font-bold cursor-pointer"
                    >
                      En Curso
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL: DISPERSAR PAGO DE COMISIÓN ───────────────────────────────── */}
      {payoutModalTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-[#0B1A12] border border-amber-500/50 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-950">
              <h3 className="font-serif text-lg font-bold text-white">Dispersión de Pago Bancario</h3>
              <button onClick={() => setPayoutModalTarget(null)} className="text-zinc-400 hover:text-white text-xs">
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-black/50 border border-emerald-950 space-y-1">
                <span className="text-zinc-400 text-[10px] font-mono block">BENEFICIARIO:</span>
                <p className="text-white font-bold">{payoutModalTarget.booking.customerName} (Ref: {payoutModalTarget.booking.bookingCode})</p>
                <p className="text-amber-400 font-mono font-extrabold text-base">
                  ${payoutModalTarget.type === 'affiliate' ? payoutModalTarget.booking.affiliateCommissionAmount : payoutModalTarget.booking.operatorCommissionAmount} USD
                </p>
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Método de Transferencia:</label>
                <select
                  value={payoutMethod}
                  onChange={(e) => setPayoutMethod(e.target.value)}
                  className="w-full bg-black/60 border border-emerald-900/50 rounded-xl p-2 text-white"
                >
                  <option value="Banco Pichincha">Banco Pichincha (Transferencia Directa)</option>
                  <option value="Produbanco">Produbanco / Grupo Promerica</option>
                  <option value="Zelle">Zelle (USD)</option>
                  <option value="Wire Transfer">Transferencia Internacional SWIFT</option>
                  <option value="PayPal">PayPal Business</option>
                </select>
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Número de Comprobante / Referencia:</label>
                <input
                  type="text"
                  required
                  placeholder="ej. TR-99824102-BP"
                  value={payoutReference}
                  onChange={(e) => setPayoutReference(e.target.value)}
                  className="w-full bg-black/60 border border-emerald-900/50 rounded-xl p-2.5 text-white font-mono"
                />
              </div>
            </div>

            <button
              onClick={handleProcessPayout}
              disabled={!payoutReference}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 text-white font-extrabold uppercase tracking-wider text-xs shadow-lg cursor-pointer"
            >
              Confirmar & Registrar Desembolso
            </button>
          </div>
        </div>
      )}

      {/* ── MODAL: NUEVO COLABORADOR / USUARIO ──────────────────────────────── */}
      {showNewUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-[#0B1A12] border border-emerald-800/60 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-950">
              <h3 className="font-serif text-lg font-bold text-white">Alta de Personal Corporativo</h3>
              <button onClick={() => setShowNewUserModal(false)} className="text-zinc-400 hover:text-white text-xs">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-3 text-xs">
              <div>
                <label className="text-zinc-400 block mb-1">Nombre Completo *</label>
                <input
                  type="text"
                  required
                  placeholder="ej. Diana Santillán"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  className="w-full bg-black/60 border border-emerald-900/50 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Correo Corporativo *</label>
                <input
                  type="email"
                  required
                  placeholder="diana.concierge@vermilionroutes.com"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  className="w-full bg-black/60 border border-emerald-900/50 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Rol Departamental *</label>
                <select
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value as UserRole)}
                  className="w-full bg-black/60 border border-emerald-900/50 rounded-xl p-2.5 text-white"
                >
                  <option value="operator">Operador Logístico / Guía</option>
                  <option value="sales">Ventas / Travel Designer</option>
                  <option value="financial">Finanzas & Pagos</option>
                  <option value="concierge">Concierge & Huéspedes</option>
                  <option value="admin">Administrador Operativo</option>
                  <option value="editor">Editor de Contenidos (cPanel)</option>
                  <option value="super">Super Administrador</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-zinc-400 block mb-1">Cédula / Pasaporte</label>
                  <input
                    type="text"
                    placeholder="172819201"
                    value={newUserCedula}
                    onChange={(e) => setNewUserCedula(e.target.value)}
                    className="w-full bg-black/60 border border-emerald-900/50 rounded-xl p-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-zinc-400 block mb-1">WhatsApp</label>
                  <input
                    type="text"
                    placeholder="+593 99..."
                    value={newUserPhone}
                    onChange={(e) => setNewUserPhone(e.target.value)}
                    className="w-full bg-black/60 border border-emerald-900/50 rounded-xl p-2 text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold uppercase tracking-wider text-xs shadow-lg mt-2 cursor-pointer"
              >
                Crear Cuenta en Firestore
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
