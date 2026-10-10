import React from 'react';
import ProjectCard from './ProjectCard.jsx';
import { Building2 } from 'lucide-react';

export default function ProjectGrid({ projects, onResetFilters }) {
  if (projects.length === 0) {
    return (
      <div className="w-full text-center py-20 px-6 bg-stone-50 border border-stone-200/80 rounded-2xl">
        <Building2 className="w-12 h-12 text-stone-400 mx-auto mb-4" />
        <h3 className="font-serif text-2xl font-bold text-stone-900 mb-2">
          No Matching Architectural Projects Found
        </h3>
        <p className="text-sm text-stone-600 max-w-md mx-auto mb-6">
          We could not find any active developments matching your selected criteria. Try adjusting the filter or search parameters.
        </p>
        <button
          type="button"
          onClick={onResetFilters}
          className="px-5 py-2.5 bg-stone-900 hover:bg-[#B48C57] text-white text-xs font-semibold tracking-wider uppercase rounded-lg transition-colors cursor-pointer"
        >
          Reset All Filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
