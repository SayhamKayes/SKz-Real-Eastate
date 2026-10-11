import React, { useState } from 'react';
import { useRealEstate } from '../../Context/RealEstateContext.jsx';
import { apiService } from '../../services/apiService.js';
import { X, Calendar, CheckCircle2, ShieldCheck, Clock, Phone } from 'lucide-react';

export default function ScheduleViewingForm({ isOpen, onClose, initialProject = '' }) {
  const { showToast, companyInfo } = useRealEstate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    project_interest: initialProject || 'SKz Platinum Square, Gulshan 2',
    location_preference: 'Gulshan 2',
    budget_range: 'BDT 10 Cr – 15 Cr',
    preferred_viewing_date: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please enter your full name and contact phone number.');
      return;
    }
    setSubmitting(true);
    await apiService.submitInquiry(formData);
    setSubmitting(false);
    setSuccess(true);
    showToast(`Private viewing request confirmed for ${formData.name}.`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div>
            <div className="text-xs font-semibold text-[#B48C57] tracking-wider uppercase">
              VIP PRIVATE VIEWING
            </div>
            <h3 className="font-serif text-2xl font-bold text-stone-900">
              Schedule Private Architectural Tour
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-200/50"
            aria-label="Close form"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          {success ? (
            <div className="py-8 text-center space-y-4">
              <CheckCircle2 className="w-16 h-16 text-[#B48C57] mx-auto" />
              <h4 className="font-serif text-2xl font-bold text-stone-900">
                Viewing Request Confirmed
              </h4>
              <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.name}</strong>. A Senior Portfolio Advisor from our Gulshan Headquarters 
                will call you shortly at <strong>{formData.phone}</strong> to confirm your discrete VIP itinerary.
              </p>
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-700 space-y-1 text-left max-w-sm mx-auto">
                <div><strong>Selected Landmark:</strong> {formData.project_interest}</div>
                <div><strong>Direct Concierge:</strong> {companyInfo.hotline}</div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="mt-4 px-6 py-2.5 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#B48C57] transition-colors"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase text-stone-700">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Barrister Zulfiqar Rahman"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-[#B48C57]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase text-stone-700">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+880 1711 000000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-[#B48C57]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase text-stone-700">Email Address</label>
                  <input
                    type="email"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-[#B48C57]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase text-stone-700">Project of Interest</label>
                <select
                  value={formData.project_interest}
                  onChange={(e) => setFormData({ ...formData, project_interest: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-[#B48C57]"
                >
                  <option value="SKz Platinum Square, Gulshan 2">SKz Platinum Square (Gulshan 2)</option>
                  <option value="SKz Imperium, Tejgaon">SKz Imperium (Tejgaon Commercial)</option>
                  <option value="SKz Pristine Heights, Banani">SKz Pristine Heights (Banani)</option>
                  <option value="SKz Green Terraces, Dhanmondi">SKz Green Terraces (Dhanmondi)</option>
                  <option value="SKz The Horizon, Baridhara">SKz The Horizon (Baridhara Diplomatic)</option>
                  <option value="SKz Vantage Tower, Gulshan Ave">SKz Vantage Tower (Gulshan Avenue)</option>
                  <option value="General Luxury Portfolio Consultation">General Luxury Portfolio Consultation</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase text-stone-700">Preferred Viewing Date</label>
                  <input
                    type="date"
                    value={formData.preferred_viewing_date}
                    onChange={(e) => setFormData({ ...formData, preferred_viewing_date: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-[#B48C57]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase text-stone-700">Target Investment Range</label>
                  <select
                    value={formData.budget_range}
                    onChange={(e) => setFormData({ ...formData, budget_range: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-[#B48C57]"
                  >
                    <option value="BDT 5 Cr – 8 Cr">BDT 5 Cr – 8 Cr</option>
                    <option value="BDT 8 Cr – 12 Cr">BDT 8 Cr – 12 Cr</option>
                    <option value="BDT 12 Cr – 18 Cr">BDT 12 Cr – 18 Cr</option>
                    <option value="BDT 18 Cr+ Penthouse">BDT 18 Cr+ Sky Penthouse</option>
                    <option value="Commercial Floorplate">Commercial Floorplate</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase text-stone-700">Special Notes or Questions</label>
                <textarea
                  rows={2}
                  placeholder="Specify particular floor preferences, private car park requirements, etc."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-[#B48C57]"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 bg-stone-900 hover:bg-[#B48C57] text-white text-xs font-semibold tracking-wider uppercase rounded-lg transition-colors cursor-pointer shadow-md text-center mt-2"
              >
                {submitting ? 'Confirming Itinerary...' : 'Confirm Private Viewing Appointment'}
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-stone-500 pt-1">
                <ShieldCheck className="w-4 h-4 text-[#B48C57]" />
                <span>Strict privacy guaranteed · No broker solicitation</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
