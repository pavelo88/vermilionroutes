'use client';

import React, { useState } from 'react';
import { MapPin, Compass, Navigation, Info } from 'lucide-react';
import { useLocale } from 'next-intl';

interface ExpeditionRouteMapProps {
  tourId: string;
  destination: string;
  className?: string;
}

export function ExpeditionRouteMap({ tourId, destination, className = '' }: ExpeditionRouteMapProps) {
  const locale = useLocale();
  const [activePoint, setActivePoint] = useState<number | null>(null);

  const isGalapagos = /galapagos/i.test(tourId) || /galapagos/i.test(destination);
  const isCombo = /11days|12days/i.test(tourId);

  // Define route waypoints
  const waypoints = React.useMemo(() => {
    if (isCombo) {
      return [
        { name: 'Quito UNESCO Heritage', lat: 28, lng: 52, day: 'Day 1-2', type: 'Colonial Capital (2,850m)', desc: 'Plaza Grande, La Compañía & Equator Monument' },
        { name: 'Papallacta Hot Springs', lat: 31, lng: 60, day: 'Day 3', type: 'Andean Cloud Pass (3,300m)', desc: 'Volcanic thermal pools & Antisana views' },
        { name: 'Tena Amazon Rainforest', lat: 38, lng: 68, day: 'Day 3-5', type: 'Amazon Basin (500m)', desc: 'Jungle lodge, motorized canoes & Paikawe giant fish' },
        { name: 'Quito Return & Flight', lat: 28, lng: 52, day: 'Day 6', type: 'Highland Hub', desc: 'Rest & transition flight to Galápagos' },
        { name: 'Baltra & Santa Cruz Highlands', lat: 60, lng: 22, day: 'Day 7', type: 'Volcanic Reserve', desc: 'Twin Craters & giant tortoises in the wild' },
        { name: 'Isabela Island & Tintoreras', lat: 64, lng: 12, day: 'Day 8', type: 'Marine Sanctuary', desc: 'Flamingos lagoon & reef shark snorkeling' },
        { name: 'Santa Cruz & Las Grietas', lat: 60, lng: 22, day: 'Day 9', type: 'Volcanic Canyon', desc: 'Turquoise waters & La Lobería sea lions' },
        { name: 'Santa Fe / Pinzón Yacht Cruise', lat: 56, lng: 28, day: 'Day 10', type: 'Navigable Expedition', desc: 'Deep-sea snorkeling with endemic wildlife' }
      ];
    }

    if (isGalapagos) {
      return [
        { name: 'Baltra Seymour Airport', lat: 48, lng: 32, day: 'Day 1', type: 'Airport Gateway', desc: 'Arrival & Itabaca channel ferry crossing' },
        { name: 'Twin Craters & Scalesia Forest', lat: 52, lng: 28, day: 'Day 1', type: 'Highlands Reserve', desc: 'Volcanic sinkholes & endemic flora' },
        { name: 'Rancho Primicias Giant Tortoises', lat: 58, lng: 25, day: 'Day 1', type: 'Wildlife Sanctuary', desc: 'Wild tortoises roaming freely & lava tunnels' },
        { name: 'Puerto Ayora Harbor', lat: 65, lng: 30, day: 'Basecamp', type: 'Coastal Town', desc: 'Hotel basecamp & oceanfront boardwalk' },
        { name: 'Isabela Island & Tintoreras Islet', lat: 62, lng: 10, day: 'Day 2', type: 'Marine Islet', desc: 'Speedboat cruise, flamingos & reef shark channel' },
        { name: 'Las Grietas Volcanic Chasm', lat: 68, lng: 28, day: 'Day 3', type: 'Natural Pool', desc: 'Snorkeling between 15m volcanic canyon walls' },
        { name: 'Santa Fe / Pinzón Marine Cruise', lat: 50, lng: 38, day: 'Day 4', type: 'Navigable Yacht', desc: 'Pelagic snorkeling with manta rays and sea lions' }
      ];
    }

    // Mainland Andes & Amazon
    return [
      { name: 'Quito Colonial Historic Center', lat: 25, lng: 48, day: 'Day 1-2', type: 'UNESCO Heritage (2,850m)', desc: 'Gold leaf churches & Panecillo viewpoint' },
      { name: 'Middle of the World (Mitad del Mundo)', lat: 18, lng: 46, day: 'Day 2', type: 'Equatorial Line 0°0\'0"', desc: 'Intiñan Museum solar & gravity experiments' },
      { name: 'Papallacta Thermal Springs', lat: 28, lng: 60, day: 'Day 3', type: 'Highland Pass (3,300m)', desc: 'Volcanic thermal springs' },
      { name: 'Tena Amazon Jungle Lodge', lat: 38, lng: 70, day: 'Day 4', type: 'Amazon Rainforest (500m)', desc: 'Motorized canoe on Napo River & Kichwa culture' },
      { name: 'Puyo & Yanacocha Biopark', lat: 48, lng: 64, day: 'Day 5', type: 'Rainforest Sanctuary', desc: 'Wildlife rescue & botanical trails' },
      { name: 'Baños & Pailón del Diablo Waterfall', lat: 52, lng: 52, day: 'Day 5-6', type: 'Waterfall Route', desc: 'Pastaza canyon & 80m cascading falls' },
      { name: 'Quilotoa Emerald Crater Lake', lat: 46, lng: 38, day: 'Day 7', type: 'Volcanic Caldera (3,900m)', desc: 'Spectacular 3km wide turquoise crater lake' }
    ];
  }, [isCombo, isGalapagos]);

  const mapTitle = {
    en: 'ILLUSTRATED EXPEDITION ROUTE',
    es: 'MAPA ILUSTRADO DE EXPEDICIÓN',
    zh: '探险路线插画地图'
  };

  return (
    <div className={`bg-stone-900 text-white rounded-2xl p-5 border border-stone-800 shadow-xl overflow-hidden relative ${className}`}>
      {/* Background Topographic / Compass Watermark */}
      <div className="absolute top-2 right-2 opacity-10 pointer-events-none">
        <Compass className="w-32 h-32 text-emerald-400" />
      </div>

      <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-stone-800 relative z-10">
        <div className="flex items-center gap-2">
          <Navigation className="w-4 h-4 text-emerald-400" />
          <h4 className="font-serif text-xs font-bold uppercase tracking-widest text-emerald-400">
            {mapTitle[locale as keyof typeof mapTitle] || mapTitle.en}
          </h4>
        </div>
        <span className="text-[10px] font-mono uppercase bg-emerald-950/80 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-800/60">
          GPS Verified Track
        </span>
      </div>

      {/* Visual Interactive SVG Map Canvas */}
      <div className="relative w-full h-56 bg-stone-950 rounded-xl overflow-hidden border border-stone-800 mb-4 flex items-center justify-center">
        {/* Soft grid overlay */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Dynamic Route SVG */}
        <svg className="w-full h-full absolute inset-0 p-4" viewBox="0 0 100 80" preserveAspectRatio="none">
          {/* Connecting dashed route line */}
          <polyline
            fill="none"
            stroke="#10b981"
            strokeWidth="1.2"
            strokeDasharray="2,2"
            points={waypoints.map(w => `${w.lng},${w.lat}`).join(' ')}
            className="opacity-70 animate-pulse"
          />

          {/* Interactive Waypoint Pins */}
          {waypoints.map((wp, idx) => {
            const isHovered = activePoint === idx;
            return (
              <g 
                key={idx} 
                className="cursor-pointer transition-transform duration-200"
                onClick={() => setActivePoint(idx)}
                onMouseEnter={() => setActivePoint(idx)}
              >
                {/* Glow ring */}
                <circle
                  cx={wp.lng}
                  cy={wp.lat}
                  r={isHovered ? 4.5 : 2.5}
                  fill={isHovered ? '#34d399' : '#059669'}
                  className="transition-all duration-200"
                />
                <circle
                  cx={wp.lng}
                  cy={wp.lat}
                  r={isHovered ? 2 : 1.2}
                  fill="#ffffff"
                />
                {/* Micro Number */}
                <text
                  x={wp.lng + 3}
                  y={wp.lat - 2}
                  fill={isHovered ? '#ffffff' : '#9ca3af'}
                  fontSize="3.2"
                  fontFamily="sans-serif"
                  fontWeight={isHovered ? 'bold' : 'normal'}
                >
                  {idx + 1}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Legend / Overlay Note */}
        <div className="absolute bottom-2 left-2 text-[10px] text-stone-400 flex items-center gap-1 bg-stone-900/90 backdrop-blur-md px-2 py-1 rounded-md border border-stone-800">
          <Info className="w-3 h-3 text-emerald-400 shrink-0" />
          <span>Click any waypoint to inspect field details</span>
        </div>
      </div>

      {/* Selected Waypoint Detail Card */}
      <div className="bg-stone-950/80 p-3.5 rounded-xl border border-stone-800/80 transition-all">
        {activePoint !== null ? (
          <div>
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {waypoints[activePoint].name}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/50">
                {waypoints[activePoint].day}
              </span>
            </div>
            <span className="text-[10px] text-amber-300/90 font-medium block mb-1">
              {waypoints[activePoint].type}
            </span>
            <p className="text-xs text-stone-300 leading-relaxed">
              {waypoints[activePoint].desc}
            </p>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-stone-400 text-xs py-1">
            <Compass className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Select any point on the map or scroll the itinerary below to explore the track.</span>
          </div>
        )}
      </div>
    </div>
  );
}
