import React from 'react';
import ProjectFilter from '../components/Projects/ProjectFilter.jsx';
import ProjectGrid from '../components/Projects/ProjectGrid.jsx';
import { useRealEstate } from '../Context/RealEstateContext.jsx';
import { Building2 } from 'lucide-react';

export default function ProjectsPage() {
  const { projects, filters, setFilters } = useRealEstate();

  const filteredProjects = projects.filter((p) => {
    if (filters.category !== 'all' && p.category !== filters.category) return false;
    if (filters.status !== 'all' && p.status !== filters.status) return false;
    if (filters.location && filters.location.trim()) {
      const q = filters.location.toLowerCase();
      if (!p.location.toLowerCase().includes(q) && !p.address.toLowerCase().includes(q)) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="max-w-3xl mb-12">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-[#B48C57] uppercase mb-3">
          <span>PORTFOLIO DIRECTORY</span>
          <span aria-hidden="true">·</span>
          <span>ACTIVE DEVELOPMENTS</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-stone-900 tracking-tight leading-[1.15] mb-4">
          All Signature Projects Across Dhaka & Beyond
        </h1>
        <p className="text-sm md:text-base text-stone-600 leading-relaxed">
          Explore our complete architectural portfolio across Gulshan, Banani, Baridhara, Dhanmondi, and Tejgaon. 
          Each building is designed to stand as a multi-generational legacy.
        </p>
      </div>

      {/* Filter Component */}
      <ProjectFilter
        filters={filters}
        onFilterChange={setFilters}
      />

      {/* Grid */}
      <ProjectGrid
        projects={filteredProjects}
        onResetFilters={() => setFilters({ category: 'all', status: 'all', location: '' })}
      />
    </div>
  );
}
