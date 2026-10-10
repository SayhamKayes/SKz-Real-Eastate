import React from 'react';
import { PHILOSOPHY_PILLARS } from '../../services/propertyData.js';
import { ShieldCheck, Wind, Cpu, CheckCircle } from 'lucide-react';

export default function ArchitecturePillars() {
  const icons = [ShieldCheck, Wind, Cpu, CheckCircle];

  return (
    <section id="philosophy-section" className="py-20 px-6 bg-white border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-[#B48C57] uppercase mb-3">
            <span>OUR 4 PILLARS</span>
            <span aria-hidden="true">·</span>
            <span>ENGINEERING CONSTITUTION</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight leading-[1.15]">
            Uncompromising Standards in Every Facet of Construction
          </h2>
        </div>

        {/* 4 Pillars Grid with human editorial numbering */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PHILOSOPHY_PILLARS.map((pillar, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div 
                key={pillar.number}
                className="p-8 bg-stone-50/70 border border-stone-200/90 rounded-2xl flex flex-col justify-between hover:bg-white hover:border-[#B48C57]/60 hover:shadow-lg transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-3xl font-bold text-[#B48C57] tabular-nums">
                      {pillar.number}
                    </span>
                    <Icon className="w-5 h-5 text-stone-400" />
                  </div>
                  
                  <h3 className="font-serif text-xl font-bold text-stone-900">
                    {pillar.title}
                  </h3>

                  <p className="text-xs md:text-sm text-stone-600 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-stone-200/60 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#B48C57]">
                  <span>{pillar.stat}</span>
                  <span>→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
