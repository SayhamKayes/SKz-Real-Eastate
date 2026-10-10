import React, { useState } from 'react';
import { useRealEstate } from '../../Context/RealEstateContext.jsx';
import { Menu, X, Phone, Calendar, Building, ChevronRight } from 'lucide-react';

export default function Navbar() {
  const { currentRoute, navigateTo, openInquiry, companyInfo } = useRealEstate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  React.useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isDarkHero = currentRoute === 'home' && scrollY < (typeof window !== 'undefined' ? window.innerHeight * 2.1 : 1600);
  const isCompact = scrollY > 40;

  const navLinks = [
    { label: 'Home', route: 'home', sectionId: null },
    { label: 'Signature Projects', route: 'projects', sectionId: 'projects-grid' },
    { label: 'Philosophy', route: 'about', sectionId: 'philosophy-section' },
    { label: 'Landowners', route: 'home', sectionId: 'landowners-section' },
    { label: 'Floor Plans', route: 'home', sectionId: 'virtual-floor-plan' },
    { label: 'Contact', route: 'contact', sectionId: 'contact-section' },
  ];

  const handleNavClick = (link) => {
    navigateTo(link.route, link.sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isDarkHero
          ? isCompact
            ? 'bg-stone-950/80 backdrop-blur-md border-b border-white/10 py-3.5 shadow-xl text-white'
            : 'bg-stone-950/40 backdrop-blur-xs border-b border-white/10 py-5 text-white'
          : isCompact 
            ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-stone-200/90 py-3.5 text-stone-900' 
            : 'bg-white/80 backdrop-blur-xs border-b border-stone-200/50 py-5 text-stone-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Zone 1: Brand Wordmark */}
        <button
          type="button"
          onClick={() => navigateTo('home')}
          className="text-left group cursor-pointer focus:outline-none"
        >
          <div className={`font-serif text-xl sm:text-2xl font-bold tracking-wider transition-colors ${
            isDarkHero 
              ? 'text-white group-hover:text-[#D4AF37]' 
              : 'text-stone-900 group-hover:text-[#B48C57]'
          }`}>
            NAVANA <span className={`font-light tracking-widest ${isDarkHero ? 'text-[#D4AF37]' : 'text-[#B48C57]'}`}>REAL ESTATE</span>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className={`hidden lg:flex items-center gap-7 text-xs font-semibold uppercase tracking-wider ${
          isDarkHero ? 'text-stone-300' : 'text-stone-600'
        }`}>
          {navLinks.map((link) => (
            <button
              key={link.label}
              type="button"
              onClick={() => handleNavClick(link)}
              className={`hover:text-[#D4AF37] transition-colors relative py-1 cursor-pointer ${
                currentRoute === link.route 
                  ? isDarkHero ? 'text-white font-bold' : 'text-stone-900 font-bold' 
                  : ''
              }`}
            >
              <span>{link.label}</span>
              {currentRoute === link.route && (
                <span className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${
                  isDarkHero ? 'bg-[#D4AF37]' : 'bg-[#B48C57]'
                }`} />
              )}
            </button>
          ))}
        </nav>

        {/* Zone 3: Actions */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href={`tel:${companyInfo.hotline.replace(/\s+/g, '')}`}
            className={`hidden xl:flex items-center gap-1.5 text-xs font-medium transition-colors ${
              isDarkHero ? 'text-stone-300 hover:text-white' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Phone className={`w-3.5 h-3.5 ${isDarkHero ? 'text-[#D4AF37]' : 'text-[#B48C57]'}`} />
            <span>{companyInfo.hotline}</span>
          </a>

          <button
            type="button"
            onClick={() => openInquiry('General VIP Consultation')}
            className={`px-5 py-2.5 text-xs font-semibold tracking-wider uppercase rounded-xl transition-all shadow-md whitespace-nowrap cursor-pointer ${
              isDarkHero
                ? 'bg-[#B48C57] hover:bg-[#C5A059] text-white hover:shadow-[#B48C57]/40'
                : 'bg-stone-900 hover:bg-[#B48C57] text-white'
            }`}
          >
            Schedule Viewing
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => openInquiry('Mobile Quick Inquiry')}
            className="px-3 py-1.5 text-xs font-semibold text-white bg-stone-900 rounded-md"
          >
            Inquire
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 focus:outline-none cursor-pointer ${isDarkHero ? 'text-white hover:text-[#D4AF37]' : 'text-stone-700 hover:text-stone-900'}`}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 px-6 py-6 shadow-xl space-y-4 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.label}
                type="button"
                onClick={() => handleNavClick(link)}
                className="flex items-center justify-between py-2 text-sm font-medium text-stone-800 hover:text-[#B48C57] text-left border-b border-stone-100"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </button>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => {
                openInquiry('Mobile Menu VIP Consultation');
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 bg-stone-900 hover:bg-[#B48C57] text-white text-xs font-semibold tracking-wider uppercase rounded-lg text-center"
            >
              Schedule Private Viewing
            </button>
            <div className="text-center text-xs text-stone-500">
              Hotline: <a href={`tel:${companyInfo.hotline.replace(/\s+/g, '')}`} className="font-semibold text-stone-800">{companyInfo.hotline}</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
