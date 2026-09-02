'use client';

import { useState, useEffect } from 'react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Users, GitBranch, TrendingUp, Award } from 'lucide-react';
import { getAffiliateByEmail, AffiliateAccount, GLOBAL_POOLS } from '@/lib/affiliates';

interface NetworkNode {
  username: string;
  name: string;
  level: 1 | 2; // 1 = Direct (Hijo), 2 = Extended (Nieto)
  salesCount: number;
  totalContribution: number;
  joinedAt: string;
}

export default function NetworkPage() {
  const [affiliate, setAffiliate] = useState<AffiliateAccount | null>(null);
  const [network, setNetwork] = useState<NetworkNode[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && user.email) {
        try {
          const aff = await getAffiliateByEmail(user.email);
          setAffiliate(aff);

          if (aff && db) {
            // Load direct recruits (Hijos - Level 1)
            const qDirect = query(collection(db, 'affiliates'), where('parentId', '==', aff.username));
            const snapDirect = await getDocs(qDirect);
            const directNodes = snapDirect.docs.map(doc => {
              const d = doc.data();
              return {
                username: d.username,
                name: d.name,
                level: 1 as 1,
                salesCount: d.salesCount || 0,
                totalContribution: d.monthlyVolume || 0,
                joinedAt: d.createdAt,
              };
            });

            // Load extended recruits (Nietos - Level 2)
            const qExtended = query(collection(db, 'affiliates'), where('granId', '==', aff.username));
            const snapExtended = await getDocs(qExtended);
            const extendedNodes = snapExtended.docs
              .filter(doc => doc.data().parentId !== aff.username) // Ensure they aren't double counted
              .map(doc => {
                const d = doc.data();
                return {
                  username: d.username,
                  name: d.name,
                  level: 2 as 2,
                  salesCount: d.salesCount || 0,
                  totalContribution: d.monthlyVolume || 0,
                  joinedAt: d.createdAt,
                };
            });

            setNetwork([...directNodes, ...extendedNodes].sort((a, b) => b.totalContribution - a.totalContribution));
          }
        } catch {
          // ignore
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const directTeam = network.filter(n => n.level === 1);
  const extendedTeam = network.filter(n => n.level === 2);
  const currentNetworkVolume = affiliate?.networkVolume || 0;

  const POOLS_LIST = [
    { rank: GLOBAL_POOLS.pool1.name, target: GLOBAL_POOLS.pool1.target, percent: '2%' },
    { rank: GLOBAL_POOLS.pool2.name, target: GLOBAL_POOLS.pool2.target, percent: '2%' },
    { rank: GLOBAL_POOLS.pool3.name, target: GLOBAL_POOLS.pool3.target, percent: '2%' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <span className="w-8 h-8 rounded-full border-2 border-[#C9A84C] border-t-transparent animate-spin" />
          <span className="text-[10px] text-[#A9A9A9] tracking-widest uppercase">Cargando tu red...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px w-8 bg-gradient-to-r from-[#C9A84C] to-transparent" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#C9A84C] font-medium">
            Portal de Embajadores
          </span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-light text-white tracking-tight">
          Mi Red
        </h1>
        <p className="text-sm text-[#6B6B6B] mt-2 font-light">
          Estructura de equipo, comisiones 10-3-2 y participaciones en el Fondo Global.
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { label: 'Red Directa (Padre - 3%)', value: directTeam.length, icon: Users, color: 'from-[#C9A84C] to-[#8B6914]' },
          { label: 'Red Extendida (Abuelo - 2%)', value: extendedTeam.length, icon: GitBranch, color: 'from-[#D4D4D4] to-[#7A7A7A]' },
          { label: 'Volumen Total de tu Red', value: `$${currentNetworkVolume.toFixed(2)}`, icon: TrendingUp, color: 'from-[#D4D4D4] to-[#7A7A7A]' },
        ].map((s, i) => (
          <div key={i} className="relative overflow-hidden rounded-[20px] border border-white/8 bg-white/[0.03] backdrop-blur-sm p-5 flex items-start gap-4 group hover:border-[#C9A84C]/30 transition-all duration-300">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#C9A84C]/5 to-transparent rounded-[20px]" />
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br ${s.color} shadow-lg`}>
              <s.icon className="w-4.5 h-4.5 text-[#0A0A0F]" />
            </div>
            <div className="relative z-10">
              <p className="text-[10px] text-[#A9A9A9] uppercase tracking-[0.12em] font-medium">{s.label}</p>
              <p className="text-2xl font-serif font-light text-white mt-0.5">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Fondo Global Progress */}
      <div className="bg-white/[0.03] border border-white/8 rounded-[24px] overflow-hidden backdrop-blur-sm p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <h2 className="text-sm font-semibold text-white uppercase tracking-widest flex items-center gap-2">
              <Award className="w-4 h-4 text-[#C9A84C]" /> Fondo Global de Liderazgo (6%)
            </h2>
            <p className="text-[11px] text-[#6B6B6B] mt-1 italic">
              Participaciones acumulables en las 3 piscinas financieras según tu volumen global (personal + red).
            </p>
          </div>
          <span className="text-[9px] font-bold text-[#C9A84C] border border-[#C9A84C]/30 bg-[#C9A84C]/10 uppercase tracking-widest px-3 py-1 rounded-full hidden sm:block">
            Múltiplos exactos
          </span>
        </div>

        <div className="space-y-4">
          {POOLS_LIST.map((tier, i) => {
            const myVolume = (affiliate?.monthlyVolume || 0) + (affiliate?.networkVolume || 0);
            const shares = Math.floor(myVolume / tier.target);
            const remainder = myVolume % tier.target;
            const progress = (remainder / tier.target) * 100;
            const neededForNext = tier.target - remainder;

            return (
              <div key={i} className="bg-[#050508] border border-white/5 rounded-[16px] p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <p className="text-xs font-bold text-white uppercase tracking-widest">{tier.rank} <span className="text-[#A9A9A9]">({tier.percent})</span></p>
                    <span className="text-[10px] bg-[#C9A84C]/10 text-[#C9A84C] px-2 py-0.5 rounded-md font-mono border border-[#C9A84C]/20">
                      Cada ${(tier.target).toLocaleString()} = 1 Acción
                    </span>
                  </div>
                  <span className={`text-[11px] font-bold tracking-widest uppercase ${shares > 0 ? 'text-[#C9A84C]' : 'text-[#4A4A4A]'}`}>
                    Tienes: {shares} accion{shares !== 1 && 'es'}
                  </span>
                </div>
                
                {/* Progress bar */}
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#C9A84C] to-[#F5D78A] rounded-full transition-all duration-1000"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] font-medium text-[#6B6B6B] uppercase tracking-wider">
                  <span>Progreso para tu siguiente acción</span>
                  <span>Faltan ${(neededForNext).toLocaleString()} USD</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Network List */}
      <div className="bg-white/[0.03] border border-white/8 rounded-[24px] overflow-hidden backdrop-blur-sm">
        <div className="px-6 py-5 border-b border-white/10">
          <h2 className="text-sm font-semibold text-white uppercase tracking-widest">Miembros de tu Red ({network.length})</h2>
        </div>

        {network.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mx-auto mb-4">
              <Users className="w-5 h-5 text-[#4A4A4A]" />
            </div>
            <p className="text-sm text-[#6B6B6B]">Aún no tienes miembros en tu red.</p>
            <p className="text-xs text-[#4A4A4A] mt-1">Comparte tu enlace de afiliado y los referidos aparecerán aquí.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white/[0.02] text-xs uppercase tracking-wider text-[#A9A9A9]">
                  <th className="text-left px-6 py-3 font-semibold">Embajador</th>
                  <th className="text-left px-6 py-3 font-semibold">Nivel (Rama)</th>
                  <th className="text-left px-6 py-3 font-semibold">Ventas Directas</th>
                  <th className="text-left px-6 py-3 font-semibold">Volumen Aportado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {network.map((member) => (
                  <tr key={member.username} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-medium text-white">{member.name}</p>
                      <p className="text-[10px] font-mono text-[#6B6B6B] mt-0.5">@{member.username}</p>
                    </td>
                    <td className="px-6 py-4">
                      {member.level === 1 ? (
                        <span className="text-[10px] font-bold text-[#C9A84C] uppercase tracking-wider bg-[#C9A84C]/10 border border-[#C9A84C]/20 px-2 py-0.5 rounded-full">
                          Nivel 1 (Hijo)
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-[#A9A9A9] uppercase tracking-wider bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">
                          Nivel 2 (Nieto)
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-[#A9A9A9]">
                      {member.salesCount} reserva{member.salesCount !== 1 ? 's' : ''}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-white">${member.totalContribution.toFixed(2)}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
