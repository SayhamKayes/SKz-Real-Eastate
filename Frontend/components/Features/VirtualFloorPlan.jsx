import React, { useState } from 'react';
import { useRealEstate } from '../../Context/RealEstateContext.jsx';
import { Compass, Info, Check, Eye } from 'lucide-react';

export default function VirtualFloorPlan() {
  const { openInquiry } = useRealEstate();
  const [selectedHotspot, setSelectedHotspot] = useState('master');
  const [activePlan, setActivePlan] = useState('penthouse'); // 'penthouse', 'typical'

  const hotspots = {
    master: {
      title: "Presidential Master Sanctuary",
      dimension: "24' × 18'",
      desc: "North-facing panoramic glass terrace, Italian dual walk-in dressing wardrobe, spa ensuite with freestanding soaking tub.",
      specs: ["Acoustic double-glazing", "Lutron motorized shades", "Timber parquet flooring"],
      x: 35,
      y: 30,
    },
    living: {
      title: "Double-Height Living Pavilion",
      dimension: "32' × 22'",
      desc: "Volumetric 6.4m clear height living room seamlessly connecting to the private cantilevered sky garden terrace.",
      specs: ["Imported Calacatta marble", "Concealed VRV HVAC", "Architectural cove lighting"],
      x: 65,
      y: 45,
    },
    kitchen: {
      title: "Show & Wet Kitchen Suite",
      dimension: "18' × 14'",
      desc: "German Poggenpohl cabinetry with Miele smart induction, quartz countertop island, and separate service utility pantry.",
      specs: ["Integrated dishwasher", "Exhaust chimney system", "Dedicated staff corridor"],
      x: 30,
      y: 70,
    },
    pool: {
      title: "Cantilevered Sky Pool & Deck",
      dimension: "28' × 12'",
      desc: "Infinity edge private plunge pool hanging over the tree canopies of Gulshan 2 diplomatic zone.",
      specs: ["Heated filtration system", "Teak timber decking", "Tempered glass balustrade"],
      x: 75,
      y: 20,
    },
  };

  const current = hotspots[selectedHotspot];

  return (
    <section id="virtual-floor-plan" className="py-20 px-6 bg-[#FBFBF9] border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-[#B48C57] uppercase mb-3">
              <span>INTERACTIVE ARCHITECTURAL CAD</span>
              <span aria-hidden="true">·</span>
              <span>FLOOR EXPLORER</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight leading-[1.15]">
              Explore the Anatomical Layout of Living Space
            </h2>
          </div>

          {/* Plan Selector Buttons */}
          <div className="flex items-center p-1 bg-stone-200/70 rounded-xl">
            <button
              type="button"
              onClick={() => setActivePlan('penthouse')}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer ${
                activePlan === 'penthouse' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Duplex Sky Penthouse (7,800 sq ft)
            </button>
            <button
              type="button"
              onClick={() => setActivePlan('typical')}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer ${
                activePlan === 'typical' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Typical Suite (4,650 sq ft)
            </button>
          </div>
        </div>

        {/* Blueprint Layout & Interactive Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: The Interactive CAD Floorplan Canvas Map */}
          <div className="lg:col-span-8 bg-white border border-stone-200 rounded-2xl p-6 md:p-8 shadow-xs relative">
            <div className="flex items-center justify-between mb-4 text-xs font-mono text-stone-500">
              <span className="flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-[#B48C57]" />
                <span>ORIENTATION: NORTH-FACING SUNRISE</span>
              </span>
              <span>SCALE: 1:50 METRIC</span>
            </div>

            {/* Architectural Drawing SVG Canvas */}
            <div className="relative w-full aspect-[4/3] bg-stone-50 rounded-xl border border-stone-200/80 overflow-hidden flex items-center justify-center">
              
              {/* CAD blueprint grid background */}
              <div 
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage: 'linear-gradient(#1C1917 1px, transparent 1px), linear-gradient(90deg, #1C1917 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />

              {/* Floorplan architectural vectors */}
              <svg viewBox="0 0 800 600" className="w-full h-full p-6 text-stone-800">
                {/* Outer perimeter thick concrete walls */}
                <rect x="80" y="60" width="640" height="480" fill="none" stroke="currentColor" strokeWidth="6" />
                
                {/* Cantilever balcony terrace */}
                <path d="M 460 60 L 720 60 L 720 180 L 460 180" fill="#F5F3EF" stroke="currentColor" strokeWidth="3" strokeDasharray="6 4" />
                
                {/* Interior structural partitions */}
                {/* Master bedroom zone */}
                <rect x="80" y="60" width="320" height="240" fill="rgba(245, 243, 239, 0.4)" stroke="currentColor" strokeWidth="3" />
                {/* Walk-in closet */}
                <rect x="80" y="180" width="140" height="120" fill="none" stroke="currentColor" strokeWidth="2" />
                {/* Master bath */}
                <rect x="220" y="180" width="180" height="120" fill="none" stroke="currentColor" strokeWidth="2" />
                
                {/* Central Foyer & Elevator Core */}
                <rect x="80" y="300" width="180" height="140" fill="#EAE7E1" stroke="currentColor" strokeWidth="4" />
                <text x="120" y="380" fontFamily="monospace" fontSize="14" fill="#78716C">LIFT FOYER</text>

                {/* Show Kitchen & Dining */}
                <rect x="80" y="440" width="300" height="100" fill="none" stroke="currentColor" strokeWidth="3" />
                
                {/* Great Living Pavilion */}
                <rect x="400" y="180" width="320" height="360" fill="rgba(250, 247, 240, 0.6)" stroke="currentColor" strokeWidth="3" />

                {/* Sky Plunge Pool */}
                <rect x="520" y="70" width="180" height="90" fill="#BAE6FD" stroke="#0284C7" strokeWidth="2" />
                <text x="555" y="120" fontFamily="sans-serif" fontSize="13" fontWeight="bold" fill="#0369A1">SKY POOL</text>

                {/* Room Dimension Text Labels */}
                <text x="140" y="130" fontFamily="serif" fontSize="16" fontWeight="bold" fill="#1C1917">MASTER SUITE</text>
                <text x="140" y="150" fontFamily="monospace" fontSize="12" fill="#78716C">24' × 18'</text>

                <text x="480" y="340" fontFamily="serif" fontSize="20" fontWeight="bold" fill="#1C1917">GRAND LIVING PAVILION</text>
                <text x="540" y="370" fontFamily="monospace" fontSize="13" fill="#78716C">32' × 22' · DOUBLE HEIGHT</text>

                <text x="140" y="500" fontFamily="serif" fontSize="15" fontWeight="bold" fill="#1C1917">ITALIAN KITCHEN</text>
              </svg>

              {/* Clickable Hotspots overlay buttons */}
              {Object.entries(hotspots).map(([key, spot]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedHotspot(key)}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all cursor-pointer ${
                    selectedHotspot === key
                      ? 'w-10 h-10 bg-[#B48C57] text-white ring-4 ring-[#B48C57]/20 scale-110 shadow-lg'
                      : 'w-7 h-7 bg-white text-stone-800 border-2 border-stone-800 hover:bg-[#B48C57] hover:text-white hover:border-[#B48C57]'
                  } rounded-full`}
                  style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                  aria-label={`View ${spot.title}`}
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-stone-500">
              <span>Click on any pulse point to inspect room architecture & materials</span>
              <span className="font-semibold text-stone-800">4 En-Suite Bedrooms · 5 Baths</span>
            </div>
          </div>

          {/* Right: Selected Zone Inspector Card */}
          <div className="lg:col-span-4 bg-white border border-stone-200 rounded-2xl p-6 md:p-8 shadow-xs space-y-6">
            <div className="space-y-1 pb-4 border-b border-stone-100">
              <div className="text-xs font-semibold text-[#B48C57] tracking-wider uppercase">
                SELECTED ARCHITECTURAL ZONE
              </div>
              <h3 className="font-serif text-2xl font-bold text-stone-900">
                {current.title}
              </h3>
              <div className="text-xs font-mono text-stone-500">
                Clear Spatial Footprint: <span className="text-stone-900 font-semibold">{current.dimension}</span>
              </div>
            </div>

            <p className="text-sm text-stone-600 leading-relaxed">
              {current.desc}
            </p>

            <div className="space-y-2.5">
              <div className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                Material Specifications:
              </div>
              <ul className="space-y-2 text-xs text-stone-700">
                {current.specs.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#B48C57] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-stone-100 space-y-3">
              <button
                type="button"
                onClick={() => openInquiry(`Private Consultation: ${current.title}`)}
                className="w-full py-3 bg-stone-900 hover:bg-[#B48C57] text-white text-xs font-semibold tracking-wider uppercase rounded-lg transition-colors cursor-pointer shadow-xs text-center"
              >
                Inquire on this Layout
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
