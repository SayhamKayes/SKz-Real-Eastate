import React from 'react';
import { useRealEstate } from '../../Context/RealEstateContext.jsx';
import { ShieldCheck, Award, Leaf, Layers, Users } from 'lucide-react';

export default function AboutHeritage() {
  const { companyInfo, openInquiry } = useRealEstate();

  return (
    <section id="about-heritage" className="py-20 md:py-28 px-6 bg-[#FBFBF9] border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto">
        
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-[#B48C57] uppercase mb-3">
            <span>HERITAGE & PEDIGREE</span>
            <span aria-hidden="true">·</span>
            <span>SINCE 1996</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight leading-[1.15] mb-6">
            Pioneering Architectural Landmarks Across Dhaka for Nearly Three Decades
          </h2>
          <p className="text-base md:text-lg text-stone-600 leading-relaxed">
            Founded with the singular purpose of elevating Bangladesh’s urban skyline, Navana Real Estate Ltd. 
            unites international Scandinavian architectural restraint with unyielding structural integrity. 
            We do not simply build residences; we sculpt timeless landmarks that endure for generations.
          </p>
        </div>

        {/* 2-Column Bento Story Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          {/* Left Narrative Column */}
          <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-2xl border border-stone-200/90 shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h3 className="font-serif text-2xl font-bold text-stone-900">
                The Standard of Absolute Integrity
              </h3>
              <p className="text-sm md:text-base text-stone-600 leading-relaxed">
                In an industry where delays and compromises are too frequent, Navana Real Estate operates under 
                a solemn pledge: 100% on-time handover, unencumbered legal titles, and structural safety engineered 
                far beyond local regulatory mandates.
              </p>
              <p className="text-sm md:text-base text-stone-600 leading-relaxed">
                Each parcel of land is hand-selected in the capital's premier enclaves—Gulshan, Banani, Baridhara, 
                and Dhanmondi—ensuring that your property retains unmatched generational prestige and capital appreciation.
              </p>
            </div>

            <div className="pt-6 border-t border-stone-100 flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-800">
                <ShieldCheck className="w-4 h-4 text-[#B48C57]" />
                <span>RERA & REHAB Member</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-800">
                <Leaf className="w-4 h-4 text-[#B48C57]" />
                <span>LEED Certified Partner</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-800">
                <Award className="w-4 h-4 text-[#B48C57]" />
                <span>BNBC-2020 Compliant</span>
              </div>
            </div>
          </div>

          {/* Right Visual Architecture Card */}
          <div className="lg:col-span-5 bg-stone-900 text-white p-8 md:p-12 rounded-2xl flex flex-col justify-between shadow-xl relative overflow-hidden">
            {/* Ambient subtle light glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#B48C57]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative space-y-4">
              <div className="text-xs font-semibold text-[#B48C57] tracking-widest uppercase">
                THE NAVANA PROMISE
              </div>
              <h3 className="font-serif text-3xl font-bold tracking-tight">
                "We build with the assumption that nature is unpredictable, but our engineering is not."
              </h3>
            </div>

            <div className="relative pt-8 space-y-4">
              <div className="text-xs text-stone-400 font-mono">
                DHAKA HEADQUARTERS · GULSHAN TOWER
              </div>
              <button
                type="button"
                onClick={() => openInquiry('Corporate Portfolio Inquiry')}
                className="w-full py-3.5 px-4 bg-[#B48C57] hover:bg-[#A37B47] text-white text-xs font-semibold tracking-wider uppercase rounded-lg transition-colors text-center cursor-pointer shadow-md"
              >
                Request Corporate Portfolio
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
