import React, { useState } from 'react';
import { useRealEstate } from '../../Context/RealEstateContext.jsx';
import { Compass, Check, Eye, Sparkles, Image as ImageIcon, PenTool } from 'lucide-react';

export default function VirtualFloorPlan() {
  const { openInquiry } = useRealEstate();
  const [selectedHotspot, setSelectedHotspot] = useState('master');
  const [activePlan, setActivePlan] = useState('penthouse'); // 'penthouse', 'typical'

  // CUSTOM IMAGE SUPPORT:
  // If you prefer to use your own exported architectural floorplan image (PNG/JPG/SVG):
  // 1. Place your image in the `public/images/` folder (e.g., `public/images/my_floorplan.png`)
  // 2. Set customPlanImage below to '/images/my_floorplan.png'
  // When set to null, the component renders the crisp built-in CAD SVG blueprint.
  const [customPlanImage, setCustomPlanImage] = useState(null);

  const hotspots = {
    master: {
      id: 'master',
      title: "Master Suite",
      badge: "Bedroom 1",
      dimension: "24' × 18'",
      desc: "North-facing panoramic master sanctuary with floor-to-ceiling acoustic glass, private sunrise terrace, dual bespoke dressing closets, and integrated smart Lutron ambient scenes.",
      specs: ["Saint-Gobain acoustic double-glazing", "Smoked oak engineered herringbone parquet", "Automated motorized blackout & sheer drapes"],
      x: 18,
      y: 15,
    },
    master_bath: {
      id: 'master_bath',
      title: "Master Bath (Spa En-Suite)",
      badge: "Bath 1",
      dimension: "14' × 11'",
      desc: "Private 5-fixture wellness spa featuring a freestanding soaking tub, dual Calacatta marble vanity consoles, walk-in thermostatic rain shower, and heated towel warmers.",
      specs: ["Bookmatched Calacatta marble slab walls", "Grohe Grandera brushed bronze brassware", "Toto Neorest intelligent bidet suite"],
      x: 42,
      y: 15,
    },
    bed2: {
      id: 'bed2',
      title: "Bedroom 2 (Junior Suite)",
      badge: "Bedroom 2",
      dimension: "16' × 14'",
      desc: "Spacious junior suite featuring generous corner glazing with natural light, integrated millwork study desk, and private en-suite bathroom.",
      specs: ["Acoustic insulated wall assemblies", "Custom floor-to-ceiling matte lacquer wardrobes", "Concealed inverter HVAC climate control"],
      x: 14,
      y: 43,
    },
    bath2: {
      id: 'bath2',
      title: "Bath 2 (En-Suite)",
      badge: "Bath 2",
      dimension: "10' × 7'",
      desc: "Dedicated en-suite bathroom serving Bedroom 2, finished with seamless porcelain slabs, frameless glass shower enclosure, and Grohe mixer fittings.",
      specs: ["Italian porcelain anti-slip flooring", "Concealed cistern wall-hung water closet", "Integrated demister LED mirror vanity"],
      x: 29,
      y: 43,
    },
    bed3: {
      id: 'bed3',
      title: "Bedroom 3 (Garden View)",
      badge: "Bedroom 3",
      dimension: "15' × 13'",
      desc: "Tranquil family bedroom overlooking landscaped tree canopies, featuring sound-dampened flooring and private en-suite bathroom.",
      specs: ["Hardwood parquet flooring", "Pre-wired Cat-6 high-speed data & USB-C ports", "Concealed ambient cove lighting"],
      x: 28,
      y: 71,
    },
    bath3: {
      id: 'bath3',
      title: "Bath 3 (En-Suite)",
      badge: "Bath 3",
      dimension: "9' × 6'",
      desc: "Attached private bathroom for Bedroom 3 equipped with premium European sanitaryware, rain showerhead, and quartz vanity surfaces.",
      specs: ["Quartz composite vanity top", "Thermostatic pressure-balanced shower mixer", "Concealed moisture-extract ventilation"],
      x: 28,
      y: 91,
    },
    bed4: {
      id: 'bed4',
      title: "Bedroom 4 (Guest Suite)",
      badge: "Bedroom 4",
      dimension: "16' × 13'",
      desc: "Private guest sanctuary positioned with utmost acoustic separation, ideal for visiting dignitaries, multigenerational living, or executive guest hosting.",
      specs: ["Double-glazed acoustic windows", "Built-in vanity dressing alcove", "Smart keycard digital door lock access"],
      x: 44,
      y: 71,
    },
    bath4: {
      id: 'bath4',
      title: "Bath 4 (En-Suite)",
      badge: "Bath 4",
      dimension: "9' × 6'",
      desc: "Private en-suite bath dedicated to Bedroom 4 / Guest Suite, appointed with walk-in shower and high-end Spanish porcelain tile finishes.",
      specs: ["Spanish porcelain textured wall tiles", "Grohe concealed shower fixtures", "Floating quartz vanity with under-cabinet lighting"],
      x: 44,
      y: 91,
    },
    powder: {
      id: 'powder',
      title: "Powder Room (Guest Bath)",
      badge: "Bath 5",
      dimension: "8' × 6'",
      desc: "Architectural guest powder room adjacent to the Grand Living Pavilion and Lift Foyer, designed to make a striking impression with backlit onyx finishes.",
      specs: ["Backlit translucent onyx feature wall", "Freestanding stone monolith pedestal basin", "Brushed champagne gold brassware"],
      x: 58,
      y: 33,
    },
    living: {
      id: 'living',
      title: "Grand Living Pavilion",
      badge: "Formal Living & Dining",
      dimension: "32' × 22' · Double Height",
      desc: "Volumetric 6.4m clear height living pavilion with floor-to-ceiling glass curtain walls, seamlessly opening into the cantilevered sky pool terrace.",
      specs: ["Imported Italian Calacatta marble flooring", "Architectural concealed VRV zoned climate system", "Triple-height structural curtain wall facade"],
      x: 74,
      y: 58,
    },
    kitchen: {
      id: 'kitchen',
      title: "Italian Gourmet Kitchen",
      badge: "Show & Service Kitchen",
      dimension: "18' × 14'",
      desc: "German Poggenpohl cabinetry with Miele smart induction cooktops, quartz waterfall island, built-in dual wine coolers, and separate service utility entrance.",
      specs: ["Miele integrated smart induction & steam oven", "Antibacterial quartz countertop surfaces", "Dedicated staff utility & service corridor"],
      x: 12,
      y: 77,
    },
    pool: {
      id: 'pool',
      title: "Cantilevered Sky Pool & Deck",
      badge: "Private Pool",
      dimension: "28' × 12'",
      desc: "Private heated plunge pool cantilevered over the tree canopies of Gulshan diplomate zone, featuring teak wood sundeck and seamless glass balustrades.",
      specs: ["Automated heated filtration system", "Burmese marine-grade teak decking", "Ultra-clear laminated tempered glass balustrade"],
      x: 78,
      y: 16,
    },
    foyer: {
      id: 'foyer',
      title: "Private Lift Foyer",
      badge: "Access Core",
      dimension: "12' × 10'",
      desc: "Direct-to-home private elevator access vestibule with biometric security scanner, travertine clad walls, and direct circulation hallway leading to all rooms.",
      specs: ["Biometric & RFID touchless elevator call", "Bookmatched Italian travertine wall panels", "Concealed coat closet & shoe vestibule"],
      x: 44,
      y: 43,
    },
  };

  const current = hotspots[selectedHotspot] || hotspots.master;

  return (
    <section id="virtual-floor-plan" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FBFBF9] border-t border-stone-200/80">
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

          {/* Plan Selector Buttons & View Mode */}
          <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
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
        </div>

        {/* Blueprint Layout & Interactive Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: The Interactive CAD Floorplan Canvas Map */}
          <div className="lg:col-span-8 bg-white border border-stone-200 rounded-2xl p-4 sm:p-6 md:p-8 shadow-xs relative">
            
            {/* Blueprint Header Indicators */}
            <div className="flex items-center justify-between mb-4 text-xs font-mono text-stone-500">
              <span className="flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-[#B48C57]" />
                <span>ORIENTATION: NORTH-FACING SUNRISE</span>
              </span>
              <span>SCALE: 1:50 METRIC</span>
            </div>

            {/* Architectural Drawing Canvas Container */}
            <div className="relative w-full aspect-[1000/680] bg-[#FAF9F5] rounded-xl border border-stone-300/80 overflow-hidden flex items-center justify-center select-none">
              
              {/* CAD blueprint grid background */}
              <div 
                className="absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage: 'linear-gradient(#1C1917 1px, transparent 1px), linear-gradient(90deg, #1C1917 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
              />

              {/* RENDER MODE A: Custom Uploaded / Image File (if set) */}
              {customPlanImage ? (
                <img
                  src={customPlanImage}
                  alt="Architectural Floor Plan"
                  className="w-full h-full object-contain p-4"
                />
              ) : (
                /* RENDER MODE B: Built-in Precision Architectural CAD Vectors (1000 x 680) */
                <svg viewBox="0 0 1000 680" className="w-full h-full p-2 text-stone-900">
                  {/* Outer perimeter thick concrete structural walls */}
                  <rect x="40" y="40" width="920" height="600" fill="none" stroke="#1C1917" strokeWidth="6" />

                  {/* Sky Terrace & Balcony perimeter dashed */}
                  <path d="M 520 40 L 960 40 L 960 180 L 520 180" fill="#F4EFE6" stroke="#78716C" strokeWidth="2.5" strokeDasharray="6 4" />

                  {/* 1. SKY POOL */}
                  <rect x="620" y="55" width="320" height="110" fill="#BAE6FD" stroke="#0284C7" strokeWidth="2.5" rx="4" />
                  <text x="730" y="95" fontFamily="sans-serif" fontSize="13" fontWeight="bold" fill="#0369A1" textAnchor="middle" letterSpacing="2">SKY POOL & DECK</text>
                  <text x="730" y="140" fontFamily="monospace" fontSize="11" fill="#0284C7" textAnchor="middle">28' × 12' · CANTILEVERED</text>

                  {/* 2. GRAND LIVING PAVILION */}
                  <rect x="520" y="180" width="440" height="460" fill="rgba(255, 255, 255, 0.4)" stroke="#1C1917" strokeWidth="4" />
                  
                  {/* Living Room Area Labels (positioned with clean spacing) */}
                  <text x="740" y="350" fontFamily="serif" fontSize="21" fontWeight="bold" fill="#1C1917" textAnchor="middle" letterSpacing="1">GRAND LIVING PAVILION</text>
                  <text x="740" y="440" fontFamily="monospace" fontSize="13" fontWeight="600" fill="#78716C" textAnchor="middle">32' × 22' · DOUBLE HEIGHT</text>
                  <text x="740" y="465" fontFamily="sans-serif" fontSize="10" fill="#A8A29E" textAnchor="middle" letterSpacing="2">FORMAL SALON & DINING GALLERY</text>

                  {/* 3. POWDER ROOM (Bath 5) */}
                  <rect x="520" y="180" width="120" height="110" fill="#F5F5F4" stroke="#1C1917" strokeWidth="2.5" />
                  <text x="580" y="208" fontFamily="serif" fontSize="11" fontWeight="bold" fill="#1C1917" textAnchor="middle">POWDER ROOM</text>
                  <text x="580" y="270" fontFamily="monospace" fontSize="9" fill="#78716C" textAnchor="middle">BATH 5 · GUEST</text>

                  {/* 4. MASTER SUITE (Bedroom 1) */}
                  <rect x="40" y="40" width="280" height="180" fill="rgba(245, 243, 239, 0.5)" stroke="#1C1917" strokeWidth="3.5" />
                  <text x="170" y="80" fontFamily="serif" fontSize="15" fontWeight="bold" fill="#1C1917" textAnchor="middle">MASTER SUITE</text>
                  <text x="170" y="150" fontFamily="monospace" fontSize="11" fill="#78716C" textAnchor="middle">BEDROOM 1 · 24' × 18'</text>
                  <text x="170" y="170" fontFamily="sans-serif" fontSize="10" fill="#B48C57" textAnchor="middle">SUNRISE BALCONY</text>

                  {/* 5. MASTER BATH (Bath 1) */}
                  <rect x="320" y="40" width="200" height="180" fill="#F0EFEB" stroke="#1C1917" strokeWidth="3" />
                  <text x="420" y="80" fontFamily="serif" fontSize="13" fontWeight="bold" fill="#1C1917" textAnchor="middle">MASTER BATH</text>
                  <text x="420" y="150" fontFamily="monospace" fontSize="10" fill="#78716C" textAnchor="middle">BATH 1 · EN-SUITE SPA</text>
                  <text x="420" y="170" fontFamily="sans-serif" fontSize="9" fill="#78716C" textAnchor="middle">SOAKING TUB & DUAL VANITY</text>

                  {/* 6. BEDROOM 2 */}
                  <rect x="40" y="220" width="200" height="200" fill="none" stroke="#1C1917" strokeWidth="3" />
                  <text x="140" y="260" fontFamily="serif" fontSize="14" fontWeight="bold" fill="#1C1917" textAnchor="middle">BEDROOM 2</text>
                  <text x="140" y="340" fontFamily="monospace" fontSize="11" fill="#78716C" textAnchor="middle">16' × 14' · JUNIOR SUITE</text>

                  {/* 7. BATH 2 (En-Suite) */}
                  <rect x="240" y="220" width="120" height="200" fill="#F5F5F4" stroke="#1C1917" strokeWidth="2.5" />
                  <text x="300" y="260" fontFamily="serif" fontSize="12" fontWeight="bold" fill="#1C1917" textAnchor="middle">BATH 2</text>
                  <text x="300" y="340" fontFamily="monospace" fontSize="10" fill="#78716C" textAnchor="middle">EN-SUITE</text>

                  {/* 8. LIFT FOYER (Private Elevator Core) */}
                  <rect x="360" y="220" width="160" height="200" fill="#EAE7E1" stroke="#1C1917" strokeWidth="3.5" />
                  <text x="440" y="260" fontFamily="monospace" fontSize="13" fontWeight="bold" fill="#57534E" textAnchor="middle">LIFT FOYER</text>
                  <text x="440" y="340" fontFamily="sans-serif" fontSize="10" fill="#78716C" textAnchor="middle">PRIVATE ELEVATOR</text>

                  {/* ARCHITECTURAL CIRCULATION CORRIDOR / ROADWAY (Connecting all zones) */}
                  <rect x="210" y="380" width="310" height="50" fill="#FFFBEB" stroke="#B48C57" strokeWidth="1.5" strokeDasharray="4 2" />
                  <text x="365" y="410" fontFamily="monospace" fontSize="9" fontWeight="bold" fill="#B48C57" textAnchor="middle" letterSpacing="2">
                    MAIN CIRCULATION GALLERY · WALKWAY
                  </text>

                  {/* 9. ITALIAN KITCHEN & UTILITY */}
                  <rect x="40" y="430" width="170" height="210" fill="none" stroke="#1C1917" strokeWidth="3.5" />
                  <text x="125" y="470" fontFamily="serif" fontSize="13" fontWeight="bold" fill="#1C1917" textAnchor="middle">ITALIAN KITCHEN</text>
                  <text x="125" y="565" fontFamily="monospace" fontSize="11" fill="#78716C" textAnchor="middle">18' × 14'</text>
                  <text x="125" y="585" fontFamily="sans-serif" fontSize="9" fill="#78716C" textAnchor="middle">GOURMET & SERVICE</text>

                  {/* 10. BEDROOM 3 */}
                  <rect x="210" y="430" width="150" height="140" fill="none" stroke="#1C1917" strokeWidth="3" />
                  <text x="285" y="465" fontFamily="serif" fontSize="13" fontWeight="bold" fill="#1C1917" textAnchor="middle">BEDROOM 3</text>
                  <text x="285" y="540" fontFamily="monospace" fontSize="10" fill="#78716C" textAnchor="middle">15' × 13'</text>

                  {/* 11. BATH 3 (En-Suite) */}
                  <rect x="210" y="570" width="150" height="70" fill="#F5F5F4" stroke="#1C1917" strokeWidth="2.5" />
                  <text x="285" y="598" fontFamily="serif" fontSize="11" fontWeight="bold" fill="#1C1917" textAnchor="middle">BATH 3</text>
                  <text x="285" y="633" fontFamily="monospace" fontSize="9" fill="#78716C" textAnchor="middle">EN-SUITE</text>

                  {/* 12. BEDROOM 4 (Guest Suite) */}
                  <rect x="360" y="430" width="160" height="140" fill="none" stroke="#1C1917" strokeWidth="3" />
                  <text x="440" y="465" fontFamily="serif" fontSize="13" fontWeight="bold" fill="#1C1917" textAnchor="middle">BEDROOM 4</text>
                  <text x="440" y="540" fontFamily="monospace" fontSize="10" fill="#78716C" textAnchor="middle">16' × 13' · GUEST</text>

                  {/* 13. BATH 4 (En-Suite) */}
                  <rect x="360" y="570" width="160" height="70" fill="#F5F5F4" stroke="#1C1917" strokeWidth="2.5" />
                  <text x="440" y="598" fontFamily="serif" fontSize="11" fontWeight="bold" fill="#1C1917" textAnchor="middle">BATH 4</text>
                  <text x="440" y="633" fontFamily="monospace" fontSize="9" fill="#78716C" textAnchor="middle">EN-SUITE</text>

                  {/* Doorway openings and swing arcs (quarter circles for realistic circulation) */}
                  {/* Foyer into Living Portal */}
                  <path d="M 520 290 A 40 40 0 0 1 560 330" fill="none" stroke="#B48C57" strokeWidth="1.5" />
                  {/* Foyer into Master Hallway */}
                  <path d="M 400 220 A 30 30 0 0 1 430 190" fill="none" stroke="#B48C57" strokeWidth="1.5" />
                  {/* Bed 2 Door swing */}
                  <path d="M 210 260 A 30 30 0 0 1 180 230" fill="none" stroke="#B48C57" strokeWidth="1.5" />
                </svg>
              )}

              {/* Clickable Pulse Hotspots overlay buttons (mapped cleanly with zero text overlap) */}
              {Object.entries(hotspots).map(([key, spot]) => {
                const isSelected = selectedHotspot === key;

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedHotspot(key)}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-200 cursor-pointer group ${
                      isSelected
                        ? 'w-10 h-10 bg-[#B48C57] text-white ring-4 ring-[#B48C57]/30 scale-110 shadow-xl z-20'
                        : 'w-7 h-7 bg-white text-stone-800 border-2 border-stone-800 hover:bg-[#B48C57] hover:text-white hover:border-[#B48C57] hover:scale-105 z-10 shadow-sm'
                    } rounded-full`}
                    style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                    aria-label={`View ${spot.title}`}
                  >
                    {/* Pulsing beacon ring for active item */}
                    {isSelected && (
                      <span className="absolute inset-0 rounded-full bg-[#B48C57] animate-ping opacity-40" />
                    )}
                    <Eye className={`w-3.5 h-3.5 relative z-10 ${isSelected ? 'text-white' : 'text-stone-700 group-hover:text-white'}`} />
                  </button>
                );
              })}
            </div>

            {/* Bottom Legend Bar: 4 Bedrooms · 5 Baths */}
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-2">
              <span>Click on any pulse point to inspect room architecture & materials</span>
              <span className="font-semibold text-stone-900 tracking-wide bg-stone-100 px-3 py-1 rounded-md border border-stone-200">
                4 Bedrooms · 5 Baths
              </span>
            </div>
          </div>

          {/* Right: Selected Zone Inspector Card */}
          <div className="lg:col-span-4 bg-white border border-stone-200 rounded-2xl p-6 md:p-8 shadow-xs space-y-6">
            <div className="space-y-1 pb-4 border-b border-stone-100">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#B48C57] tracking-wider uppercase">
                  SELECTED ARCHITECTURAL ZONE
                </span>
                <span className="text-[11px] font-mono font-medium px-2 py-0.5 bg-stone-100 text-stone-700 rounded border border-stone-200">
                  {current.badge}
                </span>
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
              <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#B48C57]" />
                <span>Material Specifications:</span>
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
                onClick={() => openInquiry(`CAD Consultation: ${current.title} (${current.dimension})`)}
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
