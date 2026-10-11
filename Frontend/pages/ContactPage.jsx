import React, { useState } from 'react';
import { useRealEstate } from '../Context/RealEstateContext.jsx';
import { apiService } from '../services/apiService.js';
import { MapPin, Phone, Mail, Clock, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function ContactPage() {
  const { companyInfo, showToast } = useRealEstate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    project_interest: 'General Sales & Land Consultation',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please provide your name and contact phone number.');
      return;
    }
    setLoading(true);
    await apiService.submitInquiry(formData);
    setLoading(false);
    setSubmitted(true);
    showToast('Your message has been received. Our sales desk will respond promptly.');
  };

  return (
    <div id="contact-section" className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="max-w-3xl mb-16">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-[#B48C57] uppercase mb-3">
          <span>CONNECT WITH US</span>
          <span aria-hidden="true">·</span>
          <span>HEADQUARTERS & SALES</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-stone-900 tracking-tight leading-[1.15] mb-4">
          Visit Our Corporate Headquarters in Gulshan
        </h1>
        <p className="text-sm md:text-base text-stone-600 leading-relaxed">
          Arrange an exclusive consultation at our private gallery lounge. Our senior property advisors are 
          at your service for bespoke investment and landowner partnership advisory.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Contact Info & Offices */}
        <div className="lg:col-span-5 space-y-8">
          <div className="p-8 bg-white border border-stone-200 rounded-2xl shadow-xs space-y-6">
            <h3 className="font-serif text-2xl font-bold text-stone-900">
              Corporate Headquarters
            </h3>

            <div className="space-y-4 text-xs md:text-sm text-stone-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#B48C57] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-stone-900">Gulshan Tower HQ</div>
                  <div className="text-stone-600 mt-0.5">{companyInfo.headquarters}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#B48C57] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-stone-900">Direct Sales & VIP Concierge</div>
                  <a href={`tel:${companyInfo.hotline.replace(/\s+/g, '')}`} className="text-stone-600 hover:text-[#B48C57] block mt-0.5">
                    Hotline: {companyInfo.hotline}
                  </a>
                  <a href={`tel:${companyInfo.directSales.replace(/\s+/g, '')}`} className="text-stone-600 hover:text-[#B48C57] block">
                    Sales Desk: {companyInfo.directSales}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#B48C57] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-stone-900">Electronic Mail</div>
                  <a href={`mailto:${companyInfo.email}`} className="text-stone-600 hover:text-[#B48C57] block mt-0.5">
                    {companyInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#B48C57] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-stone-900">Gallery Viewing Hours</div>
                  <div className="text-stone-600 mt-0.5">Saturday – Thursday: 9:30 AM – 7:00 PM</div>
                  <div className="text-stone-500 text-xs">Friday: By Private Appointment Only</div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-[#FBFBF9] border border-stone-200 rounded-xl space-y-2">
            <div className="text-xs font-semibold text-[#B48C57] uppercase tracking-wider">
              Chattogram Regional Office
            </div>
            <div className="text-sm font-bold text-stone-900">SKz Pine Wood</div>
            <div className="text-xs text-stone-600">{companyInfo.chittagongOffice}</div>
          </div>
        </div>

        {/* Right: Direct Consultation Form */}
        <div className="lg:col-span-7 bg-white border border-stone-200 rounded-2xl p-8 md:p-10 shadow-xs">
          <div className="space-y-1 pb-4 border-b border-stone-100 mb-6">
            <div className="text-xs font-semibold text-[#B48C57] tracking-wider uppercase">
              CONFIDENTIAL MESSAGE
            </div>
            <h3 className="font-serif text-2xl font-bold text-stone-900">
              Send an Inquiry to Our Senior Directors
            </h3>
          </div>

          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <CheckCircle2 className="w-16 h-16 text-[#B48C57] mx-auto" />
              <h4 className="font-serif text-2xl font-bold text-stone-900">
                Inquiry Successfully Logged
              </h4>
              <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                Thank you, {formData.name}. Your details have been dispatched to the Managing Director’s 
                client coordination team. Expect a discrete response within business hours.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#B48C57] transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase text-stone-700">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tariq Masud"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-[#B48C57]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase text-stone-700">Direct Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+880 1711..."
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-[#B48C57]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase text-stone-700">Email Address</label>
                  <input
                    type="email"
                    placeholder="tariq@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-[#B48C57]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase text-stone-700">Nature of Inquiry</label>
                <select
                  value={formData.project_interest}
                  onChange={(e) => setFormData({ ...formData, project_interest: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-[#B48C57]"
                >
                  <option value="Gulshan & Banani Luxury Penthouse">Gulshan & Banani Luxury Penthouse</option>
                  <option value="Commercial Headquarter Acquisition">Commercial Headquarter Acquisition</option>
                  <option value="Landowner Joint Venture Partnership">Landowner Joint Venture Partnership</option>
                  <option value="Corporate Investment Advisory">Corporate Investment Advisory</option>
                  <option value="General Press & Customer Care">General Press & Customer Care</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase text-stone-700">Your Message</label>
                <textarea
                  rows={4}
                  placeholder="Share details regarding your preferred square footage, budget, or land parcel location."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-[#B48C57]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-stone-900 hover:bg-[#B48C57] text-white text-xs font-semibold tracking-wider uppercase rounded-lg transition-colors cursor-pointer shadow-md text-center mt-2"
              >
                {loading ? 'Sending Message...' : 'Transmit Confidential Inquiry'}
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-stone-500 pt-1">
                <ShieldCheck className="w-4 h-4 text-[#B48C57]" />
                <span>Your contact details are encrypted and kept strictly confidential</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
