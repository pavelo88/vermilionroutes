'use client';

import React, { useState } from 'react';
import {
  Clock,
  CheckCircle2,
  AlertTriangle,
  Award,
  TrendingUp,
  Wallet,
  Copy,
  Check,
  ArrowUpRight,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Users,
  Compass,
  DollarSign,
  Download,
  Filter,
  Calendar,
  Layers,
  HelpCircle
} from 'lucide-react';

interface Transaction {
  id: string;
  date: string;
  clientName: string;
  tourTitle: string;
  orderTotal: number;
  commissionAmount: number;
  type: 'DIRECT' | 'NETWORK_UPLINE' | 'GLOBAL_POOL';
  status: 'AVAILABLE' | 'PENDING' | 'CLAWBACK';
  executionDate: string;
}

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 'TX-8921',
    date: '28 Ago 2026',
    clientName: 'Alexander Wright (UK)',
    tourTitle: 'Galápagos Luxury Odyssey (8D/7N)',
    orderTotal: 12800,
    commissionAmount: 1024,
    type: 'DIRECT',
    status: 'AVAILABLE',
    executionDate: 'Completado el 25 Ago 2026'
  },
  {
    id: 'TX-8920',
    date: '27 Ago 2026',
    clientName: 'Dr. Evelyn Martinez (US)',
    tourTitle: 'Avenue of Volcanoes & Cotopaxi Trek',
    orderTotal: 6400,
    commissionAmount: 224,
    type: 'NETWORK_UPLINE',
    status: 'AVAILABLE',
    executionDate: 'Completado el 24 Ago 2026'
  },
  {
    id: 'TX-8919',
    date: '26 Ago 2026',
    clientName: 'Jean-Pierre Laurent (FR)',
    tourTitle: 'Amazon Luxury Rainforest Lodge (5D/4N)',
    orderTotal: 8900,
    commissionAmount: 712,
    type: 'DIRECT',
    status: 'PENDING',
    executionDate: 'Viaja el 15 Oct 2026'
  },
  {
    id: 'TX-8918',
    date: '25 Ago 2026',
    clientName: 'Sophia Lindqvist (SE)',
    tourTitle: 'Galápagos & Mainland Classic Grand Tour',
    orderTotal: 16500,
    commissionAmount: 1320,
    type: 'DIRECT',
    status: 'PENDING',
    executionDate: 'Viaja el 02 Nov 2026'
  },
  {
    id: 'TX-8917',
    date: '24 Ago 2026',
    clientName: 'Marco & Giulia Rossi (IT)',
    tourTitle: 'Cuenca Colonial & Cajas National Park',
    orderTotal: 4200,
    commissionAmount: 147,
    type: 'NETWORK_UPLINE',
    status: 'PENDING',
    executionDate: 'Viaja el 20 Sep 2026'
  },
  {
    id: 'TX-8916',
    date: '18 Ago 2026',
    clientName: 'Klaus Schmidt (DE)',
    tourTitle: 'Chimborazo Summit Expedition',
    orderTotal: 5100,
    commissionAmount: -408,
    type: 'DIRECT',
    status: 'CLAWBACK',
    executionDate: 'Cancelado por cliente (Deuda de volumen)'
  }
];

export default function AmbassadorDashboardPage() {
  const [copied, setCopied] = useState(false);
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'AVAILABLE' | 'PENDING' | 'CLAWBACK'>('ALL');

  const referralLink = 'https://www.vermilionroutes.com?ref=EMB-PABLO2026';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const filteredTransactions = MOCK_TRANSACTIONS.filter((tx) => {
    if (statusFilter === 'ALL') return true;
    return tx.status === statusFilter;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* 👑 Top Executive Welcome & Quick Actions */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-900 to-amber-950/40 border border-zinc-800/80 p-6 sm:p-8 shadow-2xl shadow-black/60">
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Embassy VIP Partner Program</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight">
              Bienvenido, <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent">Pablo & Red Embajadores</span>
            </h1>
            <p className="text-sm text-zinc-400 max-w-2xl">
              Monitorea el rendimiento de tus ventas directas, el crecimiento de tu red ascendente y tu calificación para el fondo global de comisiones.
            </p>
          </div>

          {/* Quick Actions / Share Link Card */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-2xl bg-zinc-950/80 border border-zinc-800 shadow-inner">
              <div className="flex flex-col">
                <span className="text-[10px] text-zinc-500 uppercase font-semibold tracking-wider">Tu Enlace de Embajador</span>
                <span className="text-xs font-mono text-amber-300 truncate max-w-[200px]">{referralLink}</span>
              </div>
              <button
                onClick={handleCopyLink}
                className="p-2 rounded-xl bg-zinc-800 hover:bg-amber-500 hover:text-zinc-950 text-zinc-300 transition-all duration-200 cursor-pointer shadow-md"
                title="Copiar enlace"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <button
              onClick={() => alert('Solicitud de retiro procesada. Un ejecutivo de Vermilion Embassy validará la transferencia.')}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-zinc-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-950/50 hover:shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <Wallet className="w-4 h-4" />
              <span>Solicitar Retiro</span>
            </button>
          </div>
        </div>
      </div>

      {/* 📊 4 PRIMARY KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* KPI 1: Comisiones Pendientes (Yellow/Amber Warning) */}
        <div className="relative group rounded-3xl p-6 bg-gradient-to-b from-amber-950/20 via-zinc-900/90 to-zinc-950 border border-amber-500/30 hover:border-amber-400/60 shadow-xl shadow-amber-950/20 transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-300 tracking-wider uppercase flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-400" />
              Comisiones Pendientes
            </span>
            <div className="w-9 h-9 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>

          <div className="mt-4">
            <div className="text-3xl font-serif font-bold text-white tracking-tight">
              $4,850<span className="text-lg text-amber-200/70 font-sans">.00</span>
            </div>
            <p className="text-xs text-amber-200/80 mt-1 font-medium flex items-center gap-1">
              <span>Retenido hasta la ejecución del tour</span>
            </p>
          </div>

          <div className="mt-5 pt-3 border-t border-amber-500/15 flex items-center justify-between text-[11px] text-zinc-400">
            <span>3 reservas programadas</span>
            <span className="text-amber-300 font-medium">Depósito Vitalicio Lock</span>
          </div>
        </div>

        {/* KPI 2: Saldo Disponible (Green/Success) */}
        <div className="relative group rounded-3xl p-6 bg-gradient-to-b from-emerald-950/25 via-zinc-900/90 to-zinc-950 border border-emerald-500/30 hover:border-emerald-400/60 shadow-xl shadow-emerald-950/20 transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-300 tracking-wider uppercase flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Saldo Disponible
            </span>
            <div className="w-9 h-9 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Wallet className="w-4 h-4" />
            </div>
          </div>

          <div className="mt-4">
            <div className="text-3xl font-serif font-bold text-white tracking-tight">
              $12,420<span className="text-lg text-emerald-200/70 font-sans">.00</span>
            </div>
            <p className="text-xs text-emerald-300 mt-1 font-medium flex items-center gap-1">
              <span>Listo para retiro inmediato</span>
            </p>
          </div>

          <div className="mt-5 pt-3 border-t border-emerald-500/15 flex items-center justify-between text-[11px] text-zinc-400">
            <span>Tours completados y validados</span>
            <span className="text-emerald-400 font-semibold cursor-pointer hover:underline flex items-center gap-0.5">
              Transferir <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* KPI 3: Rango Semanal */}
        <div className="relative group rounded-3xl p-6 bg-gradient-to-b from-purple-950/20 via-zinc-900/90 to-zinc-950 border border-purple-500/30 hover:border-purple-400/60 shadow-xl shadow-purple-950/20 transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-purple-300 tracking-wider uppercase flex items-center gap-1.5">
              <Award className="w-4 h-4 text-purple-400" />
              Rango Semanal
            </span>
            <div className="w-9 h-9 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Award className="w-4 h-4" />
            </div>
          </div>

          <div className="mt-4">
            <div className="text-2xl font-serif font-bold text-white tracking-tight flex items-center gap-2">
              <span>Premium</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-200 font-sans font-semibold">
                Nivel 4
              </span>
            </div>
            <p className="text-xs text-purple-300/80 mt-1 font-medium">
              Basado en volumen móvil de 30 días
            </p>
          </div>

          <div className="mt-5 pt-3 border-t border-purple-500/15 flex items-center justify-between text-[11px] text-zinc-400">
            <span>Próximo corte: 3 días</span>
            <span className="text-purple-300 font-medium">Comisión Máx: 8.0% + 3.5%</span>
          </div>
        </div>

        {/* KPI 4: Volumen Total (VT) */}
        <div className="relative group rounded-3xl p-6 bg-gradient-to-b from-cyan-950/20 via-zinc-900/90 to-zinc-950 border border-cyan-500/30 hover:border-cyan-400/60 shadow-xl shadow-cyan-950/20 transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-cyan-300 tracking-wider uppercase flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              Volumen Total (VT)
            </span>
            <div className="w-9 h-9 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>

          <div className="mt-4">
            <div className="text-3xl font-serif font-bold text-white tracking-tight">
              $85,600<span className="text-lg text-cyan-200/70 font-sans">.00</span>
            </div>
            <div className="flex items-center justify-between text-xs text-zinc-400 mt-1">
              <span>Personal: $38.4k</span>
              <span>Red: $47.2k</span>
            </div>
          </div>

          {/* Goal Progress bar for 5% Global Pool */}
          <div className="mt-4 space-y-1.5">
            <div className="flex justify-between text-[11px]">
              <span className="text-cyan-300 font-medium">Meta 5% Global Pool ($100k)</span>
              <span className="text-white font-bold">85.6%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full transition-all duration-1000"
                style={{ width: '85.6%' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 📋 RECENT TRANSACTIONS TABLE */}
      <div className="rounded-3xl bg-zinc-900/70 border border-zinc-800/80 overflow-hidden shadow-2xl">
        {/* Table Header & Filters */}
        <div className="p-6 border-b border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg sm:text-xl font-serif font-bold text-white flex items-center gap-2">
              <span>Transacciones Recientes</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-400 font-sans font-medium">
                {filteredTransactions.length} registros
              </span>
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Auditoría de liquidaciones directas, bonos de red ascendente y estados de viaje.
            </p>
          </div>

          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-zinc-950 border border-zinc-800 text-xs self-start sm:self-auto">
            <button
              onClick={() => setStatusFilter('ALL')}
              className={`px-3 py-1.5 rounded-xl font-medium transition-all cursor-pointer ${
                statusFilter === 'ALL'
                  ? 'bg-zinc-800 text-white shadow'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Todas
            </button>
            <button
              onClick={() => setStatusFilter('AVAILABLE')}
              className={`px-3 py-1.5 rounded-xl font-medium transition-all cursor-pointer ${
                statusFilter === 'AVAILABLE'
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40 shadow'
                  : 'text-zinc-400 hover:text-emerald-300'
              }`}
            >
              Disponibles
            </button>
            <button
              onClick={() => setStatusFilter('PENDING')}
              className={`px-3 py-1.5 rounded-xl font-medium transition-all cursor-pointer ${
                statusFilter === 'PENDING'
                  ? 'bg-amber-950 text-amber-300 border border-amber-500/40 shadow'
                  : 'text-zinc-400 hover:text-amber-300'
              }`}
            >
              Pendientes
            </button>
            <button
              onClick={() => setStatusFilter('CLAWBACK')}
              className={`px-3 py-1.5 rounded-xl font-medium transition-all cursor-pointer ${
                statusFilter === 'CLAWBACK'
                  ? 'bg-rose-950 text-rose-300 border border-rose-500/40 shadow'
                  : 'text-zinc-400 hover:text-rose-300'
              }`}
            >
              Clawback
            </button>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800/80 bg-zinc-950/40 text-[11px] uppercase tracking-wider text-zinc-400 font-semibold">
                <th className="py-3.5 px-6">Fecha & ID</th>
                <th className="py-3.5 px-6">Cliente & Expedición</th>
                <th className="py-3.5 px-6">Tipo</th>
                <th className="py-3.5 px-6 text-right">Monto Tour</th>
                <th className="py-3.5 px-6 text-right">Comisión</th>
                <th className="py-3.5 px-6 text-center">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 text-xs">
              {filteredTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-zinc-800/30 transition-colors group">
                  {/* Fecha & ID */}
                  <td className="py-4 px-6">
                    <div className="font-medium text-white">{tx.date}</div>
                    <div className="text-[11px] font-mono text-zinc-500">{tx.id}</div>
                  </td>

                  {/* Cliente & Tour */}
                  <td className="py-4 px-6">
                    <div className="font-semibold text-white group-hover:text-amber-200 transition-colors">
                      {tx.clientName}
                    </div>
                    <div className="text-[11px] text-zinc-400">{tx.tourTitle}</div>
                    <div className="text-[10px] text-zinc-500 mt-0.5">{tx.executionDate}</div>
                  </td>

                  {/* Tipo de Comisión */}
                  <td className="py-4 px-6">
                    {tx.type === 'DIRECT' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-amber-500/10 text-amber-300 border border-amber-500/30">
                        Venta Directa (8%)
                      </span>
                    )}
                    {tx.type === 'NETWORK_UPLINE' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-purple-500/10 text-purple-300 border border-purple-500/30">
                        Red Upline (3.5%)
                      </span>
                    )}
                    {tx.type === 'GLOBAL_POOL' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                        Global Pool (5%)
                      </span>
                    )}
                  </td>

                  {/* Monto Tour */}
                  <td className="py-4 px-6 text-right font-medium text-zinc-300">
                    ${tx.orderTotal.toLocaleString('en-US')}.00
                  </td>

                  {/* Comisión */}
                  <td className="py-4 px-6 text-right">
                    <span
                      className={`font-serif font-bold text-sm ${
                        tx.status === 'CLAWBACK'
                          ? 'text-rose-400'
                          : tx.status === 'AVAILABLE'
                          ? 'text-emerald-400'
                          : 'text-amber-300'
                      }`}
                    >
                      {tx.commissionAmount < 0 ? '-' : '+'}${Math.abs(tx.commissionAmount).toLocaleString('en-US')}.00
                    </span>
                  </td>

                  {/* Estado Badge */}
                  <td className="py-4 px-6 text-center">
                    {tx.status === 'AVAILABLE' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/40 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Disponible
                      </span>
                    )}

                    {tx.status === 'PENDING' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-950/80 text-amber-300 border border-amber-500/40 shadow-sm">
                        <Clock className="w-3 h-3 text-amber-400" />
                        Pendiente
                      </span>
                    )}

                    {tx.status === 'CLAWBACK' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-950/80 text-rose-300 border border-rose-500/40 shadow-sm" title="Tour cancelado tras liquidación previa. Genera deuda de volumen.">
                        <AlertTriangle className="w-3 h-3 text-rose-400" />
                        Clawback
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer Summary */}
        <div className="p-4 bg-zinc-950/60 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-2">
          <span>
            Mostrando {filteredTransactions.length} de {MOCK_TRANSACTIONS.length} transacciones registradas
          </span>
          <div className="flex items-center gap-2">
            <span className="text-zinc-500">Corte de Liquidación: Cada Lunes a las 00:00 UTC</span>
          </div>
        </div>
      </div>
    </div>
  );
}
