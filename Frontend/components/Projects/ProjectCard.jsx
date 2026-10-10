import React from 'react';
import { useRealEstate } from '../../Context/RealEstateContext.jsx';
import { MapPin, Maximize2, Calendar, ArrowUpRight, BedDouble, Check } from 'lucide-react';

export default function ProjectCard({ project }) {
  const { openProjectDetail, openInquiry } = useRealEstate();

  // Architectural visual background gradient and wireframe pattern representation
  const isCommercial = project.category === 'commercial';

  return (
    <article className="group bg-white border border-stone-200/90 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Architectural Visual Container */}
        <div 
          onClick={() => openProjectDetail(project)}
          className="relative aspect-[16/10] w-full bg-stone-100 overflow-hidden cursor-pointer"
        >
          {/* Architectural Drawing & Visual Mesh Canvas */}
          <div className="absolute inset-0 bg-gradient-to-br from-stone-100 via-stone-200/50 to-stone-100 transition-transform duration-500 group-hover:scale-105 flex items-center justify-center p-6">
            
            {/* Subtle Blueprint grid pattern */}
            <div 
              className="absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage: 'linear-gradient(#1C1917 1px, transparent 1px), linear-gradient(90deg, #1C1917 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            />

            {/* Stylized Architectural Perspective Facade SVG Graphic */}
            <svg viewBox="0 0 400 240" className="w-full h-full text-stone-700/80 drop-shadow-sm">
              {/* Ground & road */}
              <line x1="20" y1="210" x2="380" y2="210" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
              {/* Foundation outline */}
              <polygon points="60,200 200,215 340,195 200,180" fill="none" stroke="currentColor" strokeWidth="1" />
              
              {/* Main building volumetric mass */}
              <polygon points="90,195 200,210 200,50 90,40" fill={isCommercial ? '#E2E8F0' : '#F1EFEA'} stroke="currentColor" strokeWidth="1.5" />
              <polygon points="200,210 320,195 320,40 200,50" fill={isCommercial ? '#CBD5E1' : '#E6E1D6'} stroke="currentColor" strokeWidth="1.5" />
              
              {/* Floors and horizontal slabs */}
              {[1, 2, 3, 4, 5, 6].map((fl) => (
                <g key={fl}>
                  <line x1="90" y1={40 + fl * 24} x2="200" y2={50 + fl * 24} stroke="currentColor" strokeWidth="1" />
                  <line x1="200" y1={50 + fl * 24} x2="320" y2={40 + fl * 24} stroke="currentColor" strokeWidth="1" />
                  {/* Glass windows */}
                  <rect x="110" y={44 + (fl - 1) * 24} width="70" height="16" fill="rgba(96, 165, 250, 0.25)" stroke="currentColor" strokeWidth="0.5" />
                  <rect x="220" y={44 + (fl - 1) * 24} width="80" height="16" fill="rgba(96, 165, 250, 0.35)" stroke="currentColor" strokeWidth="0.5" />
                </g>
              ))}

              {/* Penthouse pergola & rooftop feature */}
              <polygon points="120,38 200,46 290,38 200,25" fill="#B48C57" fillOpacity="0.4" stroke="#B48C57" strokeWidth="1.5" />

              {/* Trees on sides */}
              <circle cx="50" cy="190" r="14" fill="#84CC16" fillOpacity="0.25" stroke="#65A30D" strokeWidth="1" />
              <line x1="50" y1="190" x2="50" y2="210" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="350" cy="185" r="16" fill="#84CC16" fillOpacity="0.25" stroke="#65A30D" strokeWidth="1" />
              <line x1="350" y1="185" x2="350" y2="210" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>

          {/* Clean Unboxed Stage Watermark */}
          <div className="absolute top-3.5 left-3.5 bg-white/90 backdrop-blur-md px-3 py-1 rounded-md text-[11px] font-semibold tracking-wider uppercase text-stone-800 border border-stone-200 shadow-xs">
            {project.status === 'ongoing' ? 'Under Construction' : (project.status === 'completed' ? 'Ready for Handover' : 'Upcoming Launch')}
          </div>

          {/* Quick Expand Button */}
          <button 
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openProjectDetail(project);
            }}
            className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-stone-700 hover:text-[#B48C57] hover:scale-110 transition-all border border-stone-200 shadow-xs"
            aria-label="View project specifications"
          >
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Content Details */}
        <div className="p-6 space-y-4">
          
          {/* Metadata Row: Clean Unboxed Text with Separators (Zero-Pill compliant) */}
          <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
            <span className="text-[#B48C57] font-semibold uppercase">{project.category}</span>
            <span aria-hidden="true">·</span>
            <span>{project.floors} Levels</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">Handover: {project.handoverDate}</span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => openProjectDetail(project)}
            className="font-serif text-xl md:text-2xl font-bold text-stone-900 group-hover:text-[#B48C57] transition-colors cursor-pointer line-clamp-1"
          >
            {project.title}
          </h3>

          {/* Location with Icon */}
          <div className="flex items-center gap-1.5 text-xs text-stone-600">
            <MapPin className="w-3.5 h-3.5 text-[#B48C57] shrink-0" />
            <span className="truncate">{project.address}</span>
          </div>

          {/* Short Narrative Description */}
          <p className="text-xs md:text-sm text-stone-600 line-clamp-2 leading-relaxed">
            {project.description}
          </p>

          {/* Key Specs Row */}
          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-stone-100 text-xs text-stone-700">
            <div className="flex items-center gap-1.5 truncate">
              <Maximize2 className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <span className="truncate">{project.areaSqft}</span>
            </div>
            <div className="flex items-center gap-1.5 truncate">
              <BedDouble className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <span className="truncate">{project.bedrooms}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="px-6 pb-6 pt-2 flex items-center gap-3">
        <button
          type="button"
          onClick={() => openProjectDetail(project)}
          className="flex-1 py-2.5 px-3 text-xs font-semibold tracking-wider uppercase text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors text-center cursor-pointer whitespace-nowrap"
        >
          View Details
        </button>
        <button
          type="button"
          onClick={() => openInquiry(project.title)}
          className="flex-1 py-2.5 px-3 text-xs font-semibold tracking-wider uppercase text-white bg-stone-900 hover:bg-[#B48C57] rounded-lg transition-colors text-center cursor-pointer whitespace-nowrap shadow-xs"
        >
          Schedule Tour
        </button>
      </div>
    </article>
  );
}
