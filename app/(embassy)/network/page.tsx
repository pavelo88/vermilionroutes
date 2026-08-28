'use client';

import React, { useState } from 'react';
import {
  Users,
  Copy,
  Check,
  ChevronDown,
  ChevronRight,
  ShieldAlert,
  Info,
  Award,
  Link as LinkIcon,
  Crown
} from 'lucide-react';

interface NetworkNode {
  id: string;
  name: string;
  email: string;
  rank: string;
  status: 'ACTIVE' | 'INACTIVE';
  joinDate: string;
  personalVolume: number;
  level: number;
  children?: NetworkNode[];
}

const MOCK_NETWORK: NetworkNode[] = [
  {
    id: 'USR-001',
    name: 'Sarah Connor',
    email: 'sarah.c@example.com',
    rank: 'Leader',
    status: 'ACTIVE',
    joinDate: '12 Ago 2026',
    personalVolume: 12500,
    level: 1,
    children: [
      {
        id: 'USR-001-1',
        name: 'John Smith',
        email: 'john.smith@example.com',
        rank: 'Business',
        status: 'ACTIVE',
        joinDate: '15 Ago 2026',
        personalVolume: 4200,
        level: 2,
        children: [
          {
            id: 'USR-001-1-1',
            name: 'Alice Johnson',
            email: 'alice.j@example.com',
            rank: 'None',
            status: 'INACTIVE',
            joinDate: '20 Ago 2026',
            personalVolume: 0,
            level: 3,
          }
        ]
      },
      {
        id: 'USR-001-2',
        name: 'Maria Garcia',
        email: 'maria.g@example.com',
        rank: 'None',
        status: 'INACTIVE',
        joinDate: '18 Ago 2026',
        personalVolume: 0,
        level: 2,
        children: []
      }
    ]
  },
  {
    id: 'USR-002',
    name: 'David Chen',
    email: 'david.chen@example.com',
    rank: 'Premium',
    status: 'ACTIVE',
    joinDate: '05 Ago 2026',
    personalVolume: 28400,
    level: 1,
    children: [
      {
        id: 'USR-002-1',
        name: 'Emma Wilson',
        email: 'emma.w@example.com',
        rank: 'Leader',
        status: 'ACTIVE',
        joinDate: '10 Ago 2026',
        personalVolume: 15600,
        level: 2,
        children: [
          {
            id: 'USR-002-1-1',
            name: 'Lucas Silva',
            email: 'lucas.s@example.com',
            rank: 'Business',
            status: 'ACTIVE',
            joinDate: '14 Ago 2026',
            personalVolume: 8900,
            level: 3,
          }
        ]
      }
    ]
  }
];

export default function MyNetworkPage() {
  const [copied, setCopied] = useState(false);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['USR-001', 'USR-002', 'USR-001-1']));

  const referralLink = 'https://www.vermilionroutes.com?ref=EMB-PABLO2026';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const toggleNode = (id: string) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const renderRankBadge = (rank: string) => {
    switch (rank.toLowerCase()) {
      case 'premium':
        return <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold text-amber-300 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-full"><Crown className="w-3 h-3" /> Premium</span>;
      case 'leader':
        return <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold text-purple-300 bg-purple-500/10 border border-purple-500/30 px-2 py-0.5 rounded-full"><Award className="w-3 h-3" /> Leader</span>;
      case 'business':
        return <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold text-blue-300 bg-blue-500/10 border border-blue-500/30 px-2 py-0.5 rounded-full"><Award className="w-3 h-3" /> Business</span>;
      default:
        return <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold text-zinc-400 bg-zinc-800 border border-zinc-700 px-2 py-0.5 rounded-full">Afiliado</span>;
    }
  };

  const renderNetworkTree = (nodes: NetworkNode[]) => {
    return (
      <div className="space-y-3 relative before:absolute before:inset-y-0 before:left-[21px] before:w-[2px] before:bg-zinc-800">
        {nodes.map((node) => {
          const isExpanded = expandedNodes.has(node.id);
          const hasChildren = node.children && node.children.length > 0;

          return (
            <div key={node.id} className="relative">
              {/* Connector line for the current node */}
              <div className="absolute left-[21px] top-7 w-6 h-[2px] bg-zinc-800" />
              
              <div className="ml-10 relative">
                <div 
                  className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border transition-all duration-200 ${
                    node.status === 'ACTIVE' 
                      ? 'bg-zinc-900/80 border-zinc-700/50 hover:border-zinc-500/50' 
                      : 'bg-zinc-950/50 border-zinc-800/50 opacity-80'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => hasChildren && toggleNode(node.id)}
                      disabled={!hasChildren}
                      className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
                        hasChildren 
                          ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 cursor-pointer' 
                          : 'bg-transparent text-transparent cursor-default'
                      }`}
                    >
                      {hasChildren && (
                        isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                    
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className={`font-semibold ${node.status === 'ACTIVE' ? 'text-white' : 'text-zinc-400'}`}>
                          {node.name}
                        </h3>
                        {renderRankBadge(node.rank)}
                      </div>
                      <div className="text-xs text-zinc-500 mt-1 flex items-center gap-3">
                        <span>Livel {node.level}</span>
                        <span>•</span>
                        <span>{node.email}</span>
                        <span>•</span>
                        <span>Unido: {node.joinDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 mt-4 sm:mt-0 ml-12 sm:ml-0">
                    <div className="text-right">
                      <div className="text-xs text-zinc-500">Volumen Personal</div>
                      <div className={`font-mono text-sm font-semibold ${node.status === 'ACTIVE' ? 'text-zinc-300' : 'text-zinc-500'}`}>
                        ${node.personalVolume.toLocaleString()}
                      </div>
                    </div>

                    <div className="relative group flex items-center">
                      {node.status === 'ACTIVE' ? (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                          ACTIVE
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-400 text-xs font-bold cursor-help">
                          <div className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                          INACTIVE
                          <Info className="w-3.5 h-3.5 text-zinc-500 ml-1" />
                        </div>
                      )}
                      
                      {/* Tooltip for INACTIVE status */}
                      {node.status === 'INACTIVE' && (
                        <div className="absolute right-0 bottom-full mb-2 w-64 p-3 bg-zinc-800 border border-zinc-700 rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                          <div className="flex items-start gap-2">
                            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                            <p className="text-xs text-zinc-300 leading-relaxed">
                              <span className="font-semibold text-amber-400">Dynamic Compression Rule (50-30-15):</span><br/>
                              Este nodo está inactivo. Las comisiones de su red descenderán automáticamente saltando este nivel (bypass) y se acumularán (roll up) al próximo líder activo en la línea ascendente para garantizar el pago.
                            </p>
                          </div>
                          {/* Arrow pointing down */}
                          <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-zinc-800 border-b border-r border-zinc-700 transform rotate-45" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Render children if expanded */}
                {isExpanded && hasChildren && (
                  <div className="mt-3">
                    {renderNetworkTree(node.children!)}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* 👑 Header & Link Generation */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-900 to-emerald-950/20 border border-zinc-800/80 p-6 sm:p-8 shadow-2xl shadow-black/60">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold tracking-wide">
              <Users className="w-3.5 h-3.5" />
              <span>Red de Afiliados Unilevel</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              Mi Red & Downline
            </h1>
            <p className="text-sm text-zinc-400 max-w-2xl">
              Visualiza tu estructura de afiliados hasta el nivel 3. Recluta nuevos embajadores compartiendo tu enlace único y monitorea el volumen de tu red.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-zinc-950/50 p-2 rounded-2xl border border-zinc-800/80">
            <div className="flex flex-col px-3 py-1">
              <span className="text-[10px] text-zinc-500 uppercase font-semibold tracking-wider flex items-center gap-1">
                <LinkIcon className="w-3 h-3" /> Enlace de Reclutamiento
              </span>
              <span className="text-xs font-mono text-emerald-300 truncate max-w-[200px] mt-0.5">{referralLink}</span>
            </div>
            <button
              onClick={handleCopyLink}
              className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg cursor-pointer ${
                copied 
                  ? 'bg-emerald-500 text-zinc-950 shadow-emerald-500/20' 
                  : 'bg-zinc-800 hover:bg-zinc-700 text-white'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copiado
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copiar Link
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 🌳 Network Tree / Expandable Table */}
      <div className="rounded-3xl bg-zinc-900/40 border border-zinc-800/80 p-6 shadow-xl">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-800">
          <h2 className="text-lg font-serif font-semibold text-white flex items-center gap-2">
            Estructura de Red
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-400 font-sans font-medium">
              Niveles 1-3
            </span>
          </h2>
          
          <div className="flex items-center gap-3 text-xs text-zinc-400">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Activo</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-zinc-500" />
              <span>Inactivo (Compresión Dinámica)</span>
            </div>
          </div>
        </div>

        <div className="pl-2">
          {renderNetworkTree(MOCK_NETWORK)}
        </div>
      </div>
    </div>
  );
}
