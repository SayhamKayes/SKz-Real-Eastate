import React from 'react';
import { TESTIMONIALS } from '../../services/propertyData.js';
import { Quote } from 'lucide-react';

export default function ClientReviews() {
  return (
    <section className="py-20 px-6 bg-[#FBFBF9] border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-[#B48C57] uppercase mb-3">
            <span>RESIDENTS & PARTNERS</span>
            <span aria-hidden="true">·</span>
            <span>PROVEN TRUST</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight leading-[1.15]">
            Homeowner & Landowner Voices Across Decades
          </h2>
        </div>

        {/* Testimonials 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div 
              key={t.id}
              className="p-8 bg-white border border-stone-200/90 rounded-2xl shadow-xs flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <Quote className="w-8 h-8 text-[#B48C57]/40" />
                <p className="text-sm md:text-base text-stone-700 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-6 border-t border-stone-100">
                <div className="font-serif text-lg font-bold text-stone-900">
                  {t.client}
                </div>
                <div className="text-xs text-stone-600 mt-0.5">
                  {t.role}
                </div>
                <div className="flex items-center justify-between text-xs text-[#B48C57] font-medium mt-2">
                  <span>{t.project}</span>
                  <span className="text-stone-400">·</span>
                  <span className="text-stone-500 font-mono text-[11px]">{t.handoverYear}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
