'use client';

import { useState, useEffect } from 'react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Users, GitBranch, TrendingUp, Award, Sparkles, ShieldCheck } from 'lucide-react';
import { GLOBAL_POOLS, getAffiliateByEmail, AffiliateAccount } from '@/lib/affiliates';

interface NetworkNode {
  username: string;
  name: string;
  level: 1 | 2;
  salesCount: number;
  totalContribution: number;
  joinedAt: string;
}

function NodeCard({ node }: { node: NetworkNode }) {
  return (
    <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 
          ${node.level === 1 ? 'bg-amber-500' : 'bg-blue-500'}`}>
          {node.name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-semibold text-zinc-900 dark:text-white">@{node.username}</p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">{node.name} · {node.level === 1 ? 'Tu Red Directa (Hijo - 3%)' : 'Tu Red Extendida (Nieto - 2%)'}</p>
        </div>
      </div>
      <div className="text-right shrink-0">
        <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">${node.totalContribution.toFixed(2)}</p>
        <p className="text-xs text-zinc-400">{node.salesCount} ventas</p>
      </div>
    </div>
  );
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
    { rank: GLOBAL_POOLS.pool1.name, target: GLOBAL_POOLS.pool1.target, percent: '2%', estShare: GLOBAL_POOLS.pool1.estimatedShareValue },
    { rank: GLOBAL_POOLS.pool2.name, target: GLOBAL_POOLS.pool2.target, percent: '2%', estShare: GLOBAL_POOLS.pool2.estimatedShareValue },
    { rank: GLOBAL_POOLS.pool3.name, target: GLOBAL_POOLS.pool3.target, percent: '2%', estShare: GLOBAL_POOLS.pool3.estimatedShareValue },
  ];

  if (loading) {
    return (
      <div className="p-12 text-center text-zinc-400">
        <span className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin inline-block mr-2" />
        <span>Cargando tu red...</span>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 max-w-5xl mx-auto space-y-8">

      <div>
        <h1 className="font-serif text-3xl font-light text-zinc-900 dark:text-white">Mi Red</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Estructura de equipo, comisiones 10-3-2 y participaciones en el Fondo Global.</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Red Directa (Padre - 3%)', value: directTeam.length, icon: Users, color: 'bg-amber-500/10 text-amber-500' },
          { label: 'Red Extendida (Abuelo - 2%)', value: extendedTeam.length, icon: GitBranch, color: 'bg-blue-500/10 text-blue-500' },
          { label: 'Volumen Total de tu Red', value: `$${currentNetworkVolume.toFixed(2)}`, icon: TrendingUp, color: 'bg-emerald-500/10 text-emerald-500' },
        ].map((s, i) => (
          <div key={i} className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-white/5 rounded-[20px] p-5 flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${s.color}`}>
              <s.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-medium">{s.label}</p>
              <p className="text-xl font-serif text-zinc-900 dark:text-white mt-0.5">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Fondo Global Progress */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-white/5 rounded-[20px] p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" /> Fondo Global de Liderazgo (6% Profit-Sharing)
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Participaciones acumulables en las 3 piscinas financieras según tu volumen global (personal + red).
            </p>
          </div>
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
            Múltiplos exactos
          </span>
        </div>

        <div className="space-y-4">
          {POOLS_LIST.map((tier, i) => {
            const myVolume = (affiliate?.monthlyVolume || 0) + (affiliate?.networkVolume || 0);
            const shares = Math.floor(myVolume / tier.target);
            const pctToNextShare = Math.min(100, ((myVolume % tier.target) / tier.target) * 100);
            const requiredForNext = tier.target - (myVolume % tier.target);

            return (
              <div key={i} className="space-y-2 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-white/5">
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-zinc-900 dark:text-white">{tier.rank} ({tier.percent})</span>
                    <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-[10px]">
                      Cada ${tier.target.toLocaleString()} = 1 Acción
                    </span>
                  </div>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">Tienes: {shares} acciones</span>
                </div>
                
                <div className="h-2 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-1000"
                    style={{ width: `${pctToNextShare}%` }}
                  />
                </div>
                
                <div className="flex justify-between text-[10px] text-zinc-500 dark:text-zinc-400">
                  <span>Progreso para tu siguiente acción</span>
                  <span>Faltan ${requiredForNext.toLocaleString()} USD</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Network List */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-white/5 rounded-[20px] overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-200/60 dark:border-white/5 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-500" /> Miembros de tu Red
          </h2>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">{network.length} embajadores</span>
        </div>

        <div className="p-4 space-y-2 max-h-[500px] overflow-y-auto">
          {network.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-8 h-8 text-zinc-300 dark:text-zinc-600 mx-auto mb-3" />
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Tu red está vacía.</p>
              <p className="text-xs text-zinc-400 mt-1">Invita a otros a ser embajadores usando tu usuario como patrocinador.</p>
            </div>
          ) : (
            network.map((node, i) => <NodeCard key={i} node={node} />)
          )}
        </div>
      </div>

    </div>
  );
}
