'use client';

import React from 'react';
import { Compass, Footprints, ThermometerSun, Mountain, Bird } from 'lucide-react';
import { useLocale } from 'next-intl';

interface ExpeditionFactsProps {
  tourId: string;
  destination: string;
  duration: string;
  className?: string;
}

export function ExpeditionFacts({ tourId, destination, duration, className = '' }: ExpeditionFactsProps) {
  const locale = useLocale();

  // Dynamic curated facts based on tour type
  const isGalapagos = /galapagos/i.test(tourId) || /galapagos/i.test(destination);
  const isAndesAmazon = /andes|amazon|volcanoes|snow|fantastic/i.test(tourId);
  const isCombo = isGalapagos && isAndesAmazon;

  const facts = React.useMemo(() => {
    if (isCombo) {
      return {
        activityLevel: { en: 'Moderate (Level 2/5)', es: 'Moderado (Nivel 2/5)', zh: '中等 (2/5级)' },
        activityDesc: { en: 'Walking trails, cloud forest hikes, dry & wet boat landings', es: 'Senderos, caminatas en bosque nublado y desembarques', zh: '徒步小径、云雾森林漫步与干湿式登陆' },
        climate: { en: '14°C - 28°C (Highlands & Marine)', es: '14°C - 28°C (Andes y Marino)', zh: '14°C - 28°C (高山与海洋气候)' },
        elevation: { en: '0m to 3,900m (Sea Level to Quilotoa/Cotopaxi)', es: '0m a 3,900m (Nivel del mar a Quilotoa/Cotopaxi)', zh: '0米至3,900米 (海平面至基洛托阿/科托帕希)' },
        wildlife: [
          { en: 'Giant Tortoises', es: 'Tortugas Gigantes', zh: '加拉帕戈斯巨龟' },
          { en: 'Galápagos Sea Lions', es: 'Lobos Marinos', zh: '加拉帕戈斯海狮' },
          { en: 'Blue-Footed Boobies', es: 'Piqueros Patas Azules', zh: '蓝脚鲣鸟' },
          { en: 'Marine Iguanas', es: 'Iguanas Marinas', zh: '海鬣蜥' },
          { en: 'Amazon River Caiman', es: 'Caimanes Amazónicos', zh: '亚马逊短吻鳄' },
          { en: 'Paiche Giant Fish', es: 'Peces Gigantes Paiche', zh: '巨骨舌鱼 (巨龙鱼)' }
        ]
      };
    }

    if (isGalapagos) {
      return {
        activityLevel: { en: 'Easy to Moderate (Level 2/5)', es: 'Fácil a Moderado (Nivel 2/5)', zh: '轻松至中等 (2/5级)' },
        activityDesc: { en: 'Nature walks, volcanic chasm hikes, beach snorkeling & boat journeys', es: 'Caminatas naturales, snorkel en bahías y navegación en lancha', zh: '自然漫步、火山峡谷探索、海滩浮潜与快艇航行' },
        climate: { en: '22°C - 29°C (Subtropical Marine)', es: '22°C - 29°C (Subtropical Marino)', zh: '22°C - 29°C (亚热带海洋气候)' },
        elevation: { en: '0m to 860m (Santa Cruz Highlands)', es: '0m a 860m (Tierras Altas de Santa Cruz)', zh: '0米至860米 (圣克鲁斯高地)' },
        wildlife: [
          { en: 'Giant Tortoises', es: 'Tortugas Gigantes', zh: '加拉帕戈斯巨龟' },
          { en: 'Playful Sea Lions', es: 'Lobos Marinos', zh: '加拉帕戈斯海狮' },
          { en: 'Marine Iguanas', es: 'Iguanas Marinas', zh: '海鬣蜥' },
          { en: 'Galápagos Penguins', es: 'Pingüinos de Galápagos', zh: '加拉帕戈斯企鹅' },
          { en: 'White-tip Reef Sharks', es: 'Tiburones Tintoreras', zh: '白顶礁鲨 (Tintoreras)' },
          { en: 'Flamingos', es: 'Flamingos Rosados', zh: '粉红火烈鸟' }
        ]
      };
    }

    // Mainland Andes & Amazon
    return {
      activityLevel: { en: 'Moderate (Level 2.5/5)', es: 'Moderado (Nivel 2.5/5)', zh: '中等 (2.5/5级)' },
      activityDesc: { en: 'Waterfall treks, equatorial experiments, rainforest canoe navigation', es: 'Caminatas a cascadas, experimentos en la línea ecuatorial y canoa', zh: '瀑布徒步、赤道科学实验与亚马逊独木舟航行' },
      climate: { en: '12°C - 26°C (Andean Spring & Tropical Amazon)', es: '12°C - 26°C (Andino y Tropical Amazónico)', zh: '12°C - 26°C (安第斯春季与热带雨林)' },
      elevation: { en: '500m to 4,100m (Amazon Basin to Papallacta Pass)', es: '500m a 4,100m (Cuenca Amazónica a Paso Papallacta)', zh: '500米至4,100米 (亚马逊盆地至帕帕亚克塔山口)' },
      wildlife: [
        { en: 'Andean Condor', es: 'Cóndor Andino', zh: '安第斯神鹰' },
        { en: 'Amazonian Caiman', es: 'Caimanes Amazónicos', zh: '亚马逊短吻鳄' },
        { en: 'Giant River Fish (Arapaima)', es: 'Peces Gigantes Paiche', zh: '巨骨舌鱼 (Arapaima)' },
        { en: 'Hummingbirds & Toucans', es: 'Colibríes y Tucanes', zh: '蜂鸟与巨嘴鸟' },
        { en: 'Squirrel Monkeys', es: 'Monos Ardilla', zh: '松鼠猴' }
      ]
    };
  }, [isGalapagos, isAndesAmazon, isCombo]);

  const getText = (obj: any) => {
    if (!obj) return '';
    return obj[locale] || obj.en || obj.es || '';
  };

  const labels = {
    title: { en: 'EXPEDITION AT A GLANCE', es: 'FICHA TÉCNICA DE EXPEDICIÓN', zh: '探险技术档案' },
    activity: { en: 'Physical Activity', es: 'Actividad Física', zh: '体力要求' },
    climate: { en: 'Average Climate', es: 'Clima Promedio', zh: '平均气候' },
    elevation: { en: 'Altitude Range', es: 'Rango de Altitud', zh: '海拔跨度' },
    wildlife: { en: 'Key Wildlife Species', es: 'Fauna Emblemática', zh: '重点代表物种' }
  };

  return (
    <div className={`bg-stone-50 dark:bg-stone-900/60 rounded-2xl p-5 border border-stone-200/80 dark:border-stone-800 shadow-sm ${className}`}>
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-stone-200 dark:border-stone-800">
        <Compass className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
        <h3 className="font-serif text-xs font-bold uppercase tracking-widest text-stone-800 dark:text-stone-200">
          {getText(labels.title)}
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        {/* Activity Level */}
        <div className="flex items-start gap-3 bg-white dark:bg-stone-800/80 p-3 rounded-xl border border-stone-200/50 dark:border-stone-700/50">
          <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 shrink-0">
            <Footprints className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 block">
              {getText(labels.activity)}
            </span>
            <span className="text-xs font-bold text-stone-900 dark:text-white block mt-0.5">
              {getText(facts.activityLevel)}
            </span>
            <span className="text-[10px] text-stone-600 dark:text-stone-400 block mt-0.5 leading-snug">
              {getText(facts.activityDesc)}
            </span>
          </div>
        </div>

        {/* Climate */}
        <div className="flex items-start gap-3 bg-white dark:bg-stone-800/80 p-3 rounded-xl border border-stone-200/50 dark:border-stone-700/50">
          <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 shrink-0">
            <ThermometerSun className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 block">
              {getText(labels.climate)}
            </span>
            <span className="text-xs font-bold text-stone-900 dark:text-white block mt-0.5">
              {getText(facts.climate)}
            </span>
            <span className="text-[10px] text-stone-600 dark:text-stone-400 block mt-0.5">
              Year-round departures
            </span>
          </div>
        </div>

        {/* Elevation */}
        <div className="flex items-start gap-3 bg-white dark:bg-stone-800/80 p-3 rounded-xl border border-stone-200/50 dark:border-stone-700/50">
          <div className="p-2 rounded-lg bg-teal-50 dark:bg-teal-950/50 text-teal-700 dark:text-teal-300 shrink-0">
            <Mountain className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 block">
              {getText(labels.elevation)}
            </span>
            <span className="text-xs font-bold text-stone-900 dark:text-white block mt-0.5">
              {getText(facts.elevation)}
            </span>
          </div>
        </div>
      </div>

      {/* Wildlife Highlights */}
      <div>
        <div className="flex items-center gap-1.5 mb-2">
          <Bird className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300">
            {getText(labels.wildlife)}
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {facts.wildlife.map((animal, i) => (
            <span 
              key={i} 
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 border border-emerald-200/60 dark:border-emerald-800/40"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              {getText(animal)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
