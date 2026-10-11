import React, { useState } from 'react';
import { useRealEstate } from '../../Context/RealEstateContext.jsx';
import { Phone, Mail, MapPin, ArrowRight, ShieldCheck, Check } from 'lucide-react';

export default function Footer() {
  const { companyInfo, navigateTo, showToast } = useRealEstate();
  const [newsEmail, setNewsEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsEmail) return;
    setSubscribed(true);
    showToast('You are now subscribed to SKz Real Estate’s private architectural releases.');
    setNewsEmail('');
  };

  return (
    <footer className="bg-white border-t border-stone-200 text-stone-700">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">

        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-stone-100">

          {/* Brand & Mission Column */}
          <div className="lg:col-span-4 space-y-5">
            <div className="font-serif text-2xl font-bold tracking-wider text-stone-900">
              SKz <span className="font-light tracking-widest text-[#B48C57]">REAL ESTATE</span>
            </div>
            <p className="text-xs md:text-sm text-stone-600 leading-relaxed max-w-sm">
              Setting the pinnacle of luxury residential condominiums and commercial landmarks across Bangladesh for over 28 continuous years.
            </p>
            <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
              <ShieldCheck className="w-4 h-4 text-[#B48C57]" />
              <span>REHAB Member No. 042 · RAJUK Enlisted Developer</span>
            </div>
          </div>

          {/* Nav Links Column */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-semibold tracking-wider uppercase text-stone-900">
              Portfolio
            </div>
            <ul className="space-y-2 text-xs md:text-sm text-stone-600">
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('projects', 'projects-grid')}
                  className="hover:text-[#B48C57] transition-colors cursor-pointer text-left"
                >
                  Gulshan Diplomatic
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('projects', 'projects-grid')}
                  className="hover:text-[#B48C57] transition-colors cursor-pointer text-left"
                >
                  Banani Boutique
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('projects', 'projects-grid')}
                  className="hover:text-[#B48C57] transition-colors cursor-pointer text-left"
                >
                  Dhanmondi Residences
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('projects', 'projects-grid')}
                  className="hover:text-[#B48C57] transition-colors cursor-pointer text-left"
                >
                  Commercial Towers
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('projects', 'projects-grid')}
                  className="hover:text-[#B48C57] transition-colors cursor-pointer text-left"
                >
                  Ready for Handover
                </button>
              </li>
            </ul>
          </div>

          {/* Corporate Offices Column */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-semibold tracking-wider uppercase text-stone-900">
              Headquarters
            </div>
            <div className="space-y-2 text-xs md:text-sm text-stone-600">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#B48C57] shrink-0 mt-0.5" />
                <span>{companyInfo.headquarters}</span>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Phone className="w-4 h-4 text-[#B48C57] shrink-0" />
                <a href={`tel:${companyInfo.hotline.replace(/\s+/g, '')}`} className="hover:text-[#B48C57]">
                  Hotline: {companyInfo.hotline}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#B48C57] shrink-0" />
                <a href={`mailto:${companyInfo.email}`} className="hover:text-[#B48C57]">
                  {companyInfo.email}
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-semibold tracking-wider uppercase text-stone-900">
              Private Releases
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Receive confidential invitations to pre-launch penthouse suites and prime land partnership briefs.
            </p>
            {subscribed ? (
              <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-800 flex items-center gap-2">
                <Check className="w-4 h-4 text-[#B48C57]" />
                <span>Subscribed to Private Briefs</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="email"
                    required
                    placeholder="Enter email address"
                    value={newsEmail}
                    onChange={(e) => setNewsEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-l-lg text-xs focus:outline-none focus:border-[#B48C57]"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-stone-900 hover:bg-[#B48C57] text-white rounded-r-lg text-xs font-semibold uppercase transition-colors shrink-0"
                  >
                    Join
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} <span className="font-bold text-[#B48C57]">{companyInfo.name}</span> All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Design & Developed by <a href="https://www.theskzlab.com" target="_blank" rel="noopener noreferrer"><span className="font-bold text-[#B48C57]">SKzLAB</span></a></span>
          </div>
        </div>

      </div>
    </footer>
  );
}
