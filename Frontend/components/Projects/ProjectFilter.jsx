import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

export default function ProjectFilter({ filters, onFilterChange }) {
  const categories = [
    { id: 'all', label: 'All Portfolios' },
    { id: 'residential', label: 'Residential Condominiums' },
    { id: 'commercial', label: 'Commercial Landmarks' },
  ];

  const statuses = [
    { id: 'all', label: 'All Stages' },
    { id: 'ongoing', label: 'Under Construction' },
    { id: 'completed', label: 'Ready for Handover' },
    { id: 'upcoming', label: 'Upcoming Launches' },
  ];

  return (
    <div className="w-full bg-white border border-stone-200/90 rounded-xl p-4 md:p-6 shadow-xs mb-10 space-y-5">
      {/* Search and Main Category Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Segmented Control Tabs */}
        <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => onFilterChange({ ...filters, category: cat.id })}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-md whitespace-nowrap transition-all cursor-pointer ${
                filters.category === cat.id
                  ? 'bg-white text-stone-900 shadow-xs font-bold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Location / Search Box */}
        <div className="relative min-w-[260px] md:min-w-[300px]">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by area (Gulshan, Banani, etc.)..."
            value={filters.location}
            onChange={(e) => onFilterChange({ ...filters, location: e.target.value })}
            className="w-full pl-9 pr-4 py-2 bg-stone-50 hover:bg-white focus:bg-white border border-stone-200 rounded-lg text-xs md:text-sm text-stone-900 focus:outline-none focus:border-[#B48C57] transition-colors"
          />
        </div>
      </div>

      {/* Secondary Status Segmented Row */}
      <div className="flex items-center gap-2 pt-2 border-t border-stone-100 overflow-x-auto">
        <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider flex items-center gap-1.5 shrink-0 pr-2">
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#B48C57]" />
          <span>Filter by Stage:</span>
        </span>
        <div className="flex items-center gap-1.5">
          {statuses.map((st) => (
            <button
              key={st.id}
              type="button"
              onClick={() => onFilterChange({ ...filters, status: st.id })}
              className={`px-3 py-1.5 text-xs rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                filters.status === st.id
                  ? 'bg-stone-900 text-white font-medium shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
