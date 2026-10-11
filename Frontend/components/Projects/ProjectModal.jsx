import React, { useState } from 'react';
import { useRealEstate } from '../../Context/RealEstateContext.jsx';
import { X, MapPin, Maximize2, BedDouble, Calendar, CheckCircle2, Download, ShieldCheck, Compass, Sparkles } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  const { openInquiry, showToast } = useRealEstate();
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'floorPlans', 'amenities'

  if (!project) return null;

  const handleDownloadBrochure = () => {
    showToast(`Architectural specification brochure for "${project.title}" has been downloaded.`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-stone-200 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-stone-200 flex items-start justify-between bg-stone-50/50">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#B48C57] tracking-wider uppercase">
              <span>{project.kicker || project.category || 'Luxury Residence'}</span>
              <span aria-hidden="true">·</span>
              <span>{project.location}</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-stone-900">
              {project.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-200/50 transition-colors"
            aria-label="Close project modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation Controls (Interactive Filter/Segmented Buttons) */}
        <div className="px-6 pt-4 border-b border-stone-100 flex items-center gap-2 overflow-x-auto">
          {[
            { id: 'overview', label: 'Architecture & Overview' },
            { id: 'floorPlans', label: 'Floor Plans & Layouts' },
            { id: 'amenities', label: 'Signature Amenities' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 px-3 text-xs md:text-sm font-semibold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-[#B48C57] text-stone-900'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-1">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Architectural Narrative */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
                  Architectural Concept & Vision
                </h4>
                <p className="text-sm md:text-base text-stone-700 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Key Specifications Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-5 bg-stone-50 rounded-xl border border-stone-200/80">
                <div>
                  <div className="text-xs text-stone-500">Unit Dimensions</div>
                  <div className="text-sm font-semibold text-stone-900">{project.areaSqft || 'Custom Suite'}</div>
                </div>
                <div>
                  <div className="text-xs text-stone-500">Accommodation</div>
                  <div className="text-sm font-semibold text-stone-900">{project.bedrooms || 'Bespoke Layout'}</div>
                </div>
                <div>
                  <div className="text-xs text-stone-500">Total Levels</div>
                  <div className="text-sm font-semibold text-stone-900">{project.floors ? `${project.floors} Stories` : project.levels || 'Multi-Level'}</div>
                </div>
                <div>
                  <div className="text-xs text-stone-500">Handover Schedule</div>
                  <div className="text-sm font-semibold text-stone-900">{project.handoverDate || project.status || 'Inquire'}</div>
                </div>
                <div>
                  <div className="text-xs text-stone-500">RAJUK Approval Code</div>
                  <div className="text-sm font-semibold text-stone-900 font-mono text-xs">{project.rajukApproval || 'RAJUK Compliant'}</div>
                </div>
                <div>
                  <div className="text-xs text-stone-500">Investment Range</div>
                  <div className="text-sm font-semibold text-[#B48C57]">{project.priceRange || 'Price on Request'}</div>
                </div>
              </div>

              {/* Architectural Engineering Highlights */}
              {project.features && project.features.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-3">
                    Engineering & Structural Mastery
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs md:text-sm text-stone-700">
                    {project.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#B48C57] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {activeTab === 'floorPlans' && (
            <div className="space-y-6">
              <p className="text-xs md:text-sm text-stone-600">
                Every Navana residence offers expansive floor plates with zero dark corridors, maximizing cross-ventilation and natural daylight.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(project.floorPlans || []).length > 0 ? (
                  project.floorPlans.map((fp, idx) => (
                    <div key={idx} className="p-5 border border-stone-200 rounded-xl bg-stone-50/50 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-serif text-lg font-bold text-stone-900">{fp.title}</h4>
                        <span className="text-xs font-semibold text-[#B48C57] bg-white px-2.5 py-1 rounded border border-stone-200">
                          {fp.size}
                        </span>
                      </div>
                      {fp.beds && (
                        <div className="text-xs font-medium text-stone-600">{fp.beds}</div>
                      )}
                      <p className="text-xs md:text-sm text-stone-600 leading-relaxed">
                        {fp.specs}
                      </p>
                      {/* Architectural Floor Plan schematic diagram */}
                      <div className="w-full aspect-[16/9] bg-white border border-stone-200 rounded-lg flex items-center justify-center p-4">
                        <div className="text-center space-y-1">
                          <Compass className="w-6 h-6 text-[#B48C57] mx-auto opacity-70" />
                          <div className="text-[11px] font-mono text-stone-500 uppercase">CAD SCHEMATIC LAYOUT · LEVEL {idx + 3}</div>
                          <div className="text-xs text-stone-700 font-semibold">{fp.title}</div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 text-center py-8 text-stone-500 text-sm">
                    Detailed floor plan layouts and CAD schematics available upon scheduling a viewing.
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'amenities' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(project.amenities || []).length > 0 ? (
                project.amenities.map((am, idx) => (
                  <div key={idx} className="p-4 border border-stone-200/90 rounded-xl bg-stone-50 space-y-1">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#B48C57]" />
                      <h4 className="text-sm font-semibold text-stone-900">{am.name}</h4>
                    </div>
                    <p className="text-xs text-stone-600 pl-6 leading-relaxed">
                      {am.desc}
                    </p>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center py-8 text-stone-500 text-sm">
                  Comprehensive amenities catalog available upon inquiry.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Action Footer */}
        <div className="p-6 border-t border-stone-200 bg-stone-50 flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={handleDownloadBrochure}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-stone-300 hover:border-stone-400 text-stone-800 text-xs font-semibold tracking-wider uppercase rounded-lg transition-colors cursor-pointer shadow-xs"
          >
            <Download className="w-4 h-4 text-[#B48C57]" />
            <span>Download PDF Brochure</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold uppercase text-stone-600 hover:text-stone-900 cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                openInquiry(project.title);
              }}
              className="px-6 py-2.5 bg-stone-900 hover:bg-[#B48C57] text-white text-xs font-semibold tracking-wider uppercase rounded-lg transition-colors shadow-xs cursor-pointer"
            >
              Schedule VIP Private Viewing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
