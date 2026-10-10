import React from 'react';
import HeroSection from '../components/Hero/HeroSection.jsx';
import ProjectFilter from '../components/Projects/ProjectFilter.jsx';
import ProjectGrid from '../components/Projects/ProjectGrid.jsx';
import AboutHeritage from '../components/About/AboutHeritage.jsx';
import ArchitecturePillars from '../components/About/ArchitecturePillars.jsx';
import VirtualFloorPlan from '../components/Features/VirtualFloorPlan.jsx';
import LandownerPartnership from '../components/Landowners/LandownerPartnership.jsx';
import ClientReviews from '../components/Testimonials/ClientReviews.jsx';
import { useRealEstate } from '../Context/RealEstateContext.jsx';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  const { projects, filters, setFilters, navigateTo } = useRealEstate();

  // Filter projects for the showcase
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
    <div className="w-full">
      {/* 1. Hero Section with Scroll Motion Blueprint Transformation */}
      <HeroSection />

      {/* 2. Signature Projects Showcase Section */}
      <section id="projects-grid" className="py-20 md:py-28 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-[#B48C57] uppercase mb-3">
              <span>PORTFOLIO COLLECTION</span>
              <span aria-hidden="true">·</span>
              <span>SIGNATURE DEVELOPMENTS</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight leading-[1.15]">
              Curated Architectural Residences & Corporate Landmarks
            </h2>
          </div>

          <button
            type="button"
            onClick={() => navigateTo('projects')}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#B48C57] hover:text-stone-900 transition-colors"
          >
            <span>View Full Portfolio Directory</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Filters */}
        <ProjectFilter
          filters={filters}
          onFilterChange={setFilters}
        />

        {/* Grid */}
        <ProjectGrid
          projects={filteredProjects}
          onResetFilters={() => setFilters({ category: 'all', status: 'all', location: '' })}
        />
      </section>

      {/* 3. The Navana Heritage & Pedigree */}
      <AboutHeritage />

      {/* 4. Engineering Pillars & Seismic Standards */}
      <ArchitecturePillars />

      {/* 5. Interactive CAD Floorplan Explorer */}
      <VirtualFloorPlan />

      {/* 6. Landowner Joint Venture Calculator & Desk */}
      <LandownerPartnership />

      {/* 7. Homeowner & Landowner Testimonials */}
      <ClientReviews />
    </div>
  );
}
