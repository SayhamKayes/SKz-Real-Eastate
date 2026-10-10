import React, { useState } from 'react';
import { useRealEstate } from '../../Context/RealEstateContext.jsx';
import { apiService } from '../../services/apiService.js';
import { Calculator, CheckCircle2, Handshake, Building, ArrowRight, ShieldCheck } from 'lucide-react';

export default function LandownerPartnership() {
  const { showToast } = useRealEstate();
  
  // Calculator state
  const [katha, setKatha] = useState(12);
  const [roadWidth, setRoadWidth] = useState(40);
  const [location, setLocation] = useState('Gulshan');
  const [calcResult, setCalcResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Proposal modal state
  const [proposalForm, setProposalForm] = useState({
    ownerName: '',
    phone: '',
    email: '',
    plotLocation: 'Gulshan 2',
    kathaSize: 12,
    roadWidth: 40,
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCalculate = async (e) => {
    e?.preventDefault();
    setIsCalculating(true);
    const result = await apiService.calculateFeasibility({
      katha: Number(katha),
      roadWidth: Number(roadWidth),
      location,
    });
    setCalcResult(result);
    setIsCalculating(false);
  };

  const handleSubmitProposal = async (e) => {
    e.preventDefault();
    if (!proposalForm.ownerName || !proposalForm.phone) {
      alert('Please provide your name and contact phone number.');
      return;
    }
    setIsSubmitting(true);
    await apiService.submitLandProposal(proposalForm);
    setIsSubmitting(false);
    setSubmitted(true);
    showToast('Your land development proposal has been received. Our Chief Acquisition Director will contact you within 24 hours.');
  };

  return (
    <section id="landowners-section" className="py-20 md:py-28 px-6 bg-white border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-[#B48C57] uppercase mb-3">
            <span>LAND DEVELOPMENT PARTNERSHIP</span>
            <span aria-hidden="true">·</span>
            <span>JOINT VENTURE</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight leading-[1.15] mb-6">
            Transform Your Ancestral Property into an Enduring Landmark
          </h2>
          <p className="text-base md:text-lg text-stone-600 leading-relaxed">
            Partner with Bangladesh's most trusted luxury developer. We maximize your land's economic potential, 
            protect your family legacy with total legal transparency, and deliver landmark architectural value.
          </p>
        </div>

        {/* 2-Column: Feasibility Calculator & Partnership Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Left: Interactive Land Valuation & FAR Calculator */}
          <div className="lg:col-span-7 bg-[#FBFBF9] border border-stone-200/90 rounded-2xl p-6 md:p-10 shadow-xs space-y-6">
            <div className="flex items-center gap-2.5">
              <Calculator className="w-5 h-5 text-[#B48C57]" />
              <h3 className="font-serif text-2xl font-bold text-stone-900">
                Interactive Land Feasibility Calculator
              </h3>
            </div>
            <p className="text-xs md:text-sm text-stone-600">
              Calculate projected built-up square footage, potential residential units, and handover timeline based on Dhaka RAJUK BNBC-2020 building rules.
            </p>

            <form onSubmit={handleCalculate} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                {/* Katha Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase text-stone-700">Plot Size (Katha)</label>
                  <input
                    type="number"
                    min="3"
                    max="100"
                    step="0.5"
                    value={katha}
                    onChange={(e) => setKatha(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#B48C57]"
                  />
                </div>

                {/* Road Width */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase text-stone-700">Front Road (Feet)</label>
                  <select
                    value={roadWidth}
                    onChange={(e) => setRoadWidth(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#B48C57]"
                  >
                    <option value="20">20 Feet Access</option>
                    <option value="30">30 Feet Road</option>
                    <option value="40">40 Feet Road</option>
                    <option value="60">60 Feet Avenue</option>
                    <option value="80">80+ Feet Boulevard</option>
                  </select>
                </div>

                {/* Location */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase text-stone-700">Prime Location</label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#B48C57]"
                  >
                    <option value="Gulshan">Gulshan 1 & 2</option>
                    <option value="Banani">Banani R/A</option>
                    <option value="Baridhara">Baridhara Diplomatic</option>
                    <option value="Dhanmondi">Dhanmondi R/A</option>
                    <option value="Uttara">Uttara Model Town</option>
                    <option value="Bashundhara">Bashundhara R/A</option>
                    <option value="Chattogram">Nasirabad / Khulshi, Ctg</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isCalculating}
                className="w-full py-3 bg-stone-900 hover:bg-[#B48C57] text-white text-xs font-semibold tracking-wider uppercase rounded-lg transition-colors cursor-pointer shadow-xs"
              >
                {isCalculating ? 'Computing Structural FAR...' : 'Compute Potential Landmark Yield'}
              </button>
            </form>

            {/* Results Display */}
            {calcResult && (
              <div className="p-5 bg-white border border-stone-200 rounded-xl space-y-4 animate-in fade-in duration-200">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#B48C57]">
                  Estimated Development Feasibility Report
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                  <div className="p-3 bg-stone-50 rounded-lg">
                    <div className="text-xs text-stone-500">Estimated FAR</div>
                    <div className="text-xl font-bold font-serif text-stone-900 tabular-nums">
                      {calcResult.estimatedFar || calcResult.estimated_far}:1
                    </div>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-lg">
                    <div className="text-xs text-stone-500">Total Built-Up Area</div>
                    <div className="text-xl font-bold font-serif text-stone-900 tabular-nums">
                      {(calcResult.totalPotentialSqft || calcResult.total_potential_sqft)?.toLocaleString()} sqft
                    </div>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-lg">
                    <div className="text-xs text-stone-500">Estimated Floors</div>
                    <div className="text-xl font-bold font-serif text-stone-900 tabular-nums">
                      {calcResult.estimatedFloors || calcResult.estimated_floors} Levels
                    </div>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-lg">
                    <div className="text-xs text-stone-500">Handover Target</div>
                    <div className="text-xl font-bold font-serif text-[#B48C57] tabular-nums">
                      {calcResult.handoverTimelineMonths || calcResult.handover_timeline_months} Mos
                    </div>
                  </div>
                </div>

                <div className="text-xs text-stone-600 bg-stone-50 p-3 rounded-lg border border-stone-100 flex items-center justify-between">
                  <span>Partnership Model: <strong className="text-stone-900">{calcResult.partnershipStructure || calcResult.partnership_structure}</strong></span>
                  <span className="text-[#B48C57] font-semibold">100% Escrow Guaranteed</span>
                </div>
              </div>
            )}
          </div>

          {/* Right: Direct Landowner Inquiry Form */}
          <div className="lg:col-span-5 bg-white border border-stone-200 rounded-2xl p-6 md:p-8 shadow-xs space-y-5">
            <div className="space-y-1 pb-2 border-b border-stone-100">
              <div className="text-xs font-semibold text-[#B48C57] tracking-wider uppercase">
                DIRECT ACQUISITIONS DESK
              </div>
              <h3 className="font-serif text-2xl font-bold text-stone-900">
                Submit Your Land for Evaluation
              </h3>
              <p className="text-xs text-stone-500">
                Strict confidential review directly handled by Navana’s Board of Directors.
              </p>
            </div>

            {submitted ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#B48C57] mx-auto" />
                <h4 className="font-serif text-xl font-bold text-stone-900">
                  Proposal Submitted Successfully
                </h4>
                <p className="text-xs text-stone-600 max-w-sm mx-auto">
                  Thank you. Our Chief Land Acquisition Officer will reach out to you within 24 business hours to arrange a discrete initial discussion.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
                >
                  Submit Another Parcel
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitProposal} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold uppercase text-stone-700 mb-1">Owner / Representative Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Engr. Asaduzzaman Khan"
                    value={proposalForm.ownerName}
                    onChange={(e) => setProposalForm({ ...proposalForm, ownerName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs md:text-sm focus:outline-none focus:border-[#B48C57]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-stone-700 mb-1">Direct Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+880 1711..."
                      value={proposalForm.phone}
                      onChange={(e) => setProposalForm({ ...proposalForm, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs md:text-sm focus:outline-none focus:border-[#B48C57]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-stone-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="owner@domain.com"
                      value={proposalForm.email}
                      onChange={(e) => setProposalForm({ ...proposalForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs md:text-sm focus:outline-none focus:border-[#B48C57]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-stone-700 mb-1">Plot Location</label>
                    <input
                      type="text"
                      placeholder="e.g. Road 12, Banani"
                      value={proposalForm.plotLocation}
                      onChange={(e) => setProposalForm({ ...proposalForm, plotLocation: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs md:text-sm focus:outline-none focus:border-[#B48C57]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-stone-700 mb-1">Size (Katha)</label>
                    <input
                      type="number"
                      step="0.5"
                      placeholder="10"
                      value={proposalForm.kathaSize}
                      onChange={(e) => setProposalForm({ ...proposalForm, kathaSize: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs md:text-sm focus:outline-none focus:border-[#B48C57]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-stone-700 mb-1">Special Requirements or Remarks</label>
                  <textarea
                    rows={2}
                    placeholder="Provide road facing details, freehold status, etc."
                    value={proposalForm.notes}
                    onChange={(e) => setProposalForm({ ...proposalForm, notes: e.target.value })}
                    className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs md:text-sm focus:outline-none focus:border-[#B48C57]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[#B48C57] hover:bg-[#A37B47] text-white text-xs font-semibold tracking-wider uppercase rounded-lg transition-colors cursor-pointer shadow-xs text-center"
                >
                  {isSubmitting ? 'Transmitting Proposal...' : 'Submit Confidential Land Proposal'}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
