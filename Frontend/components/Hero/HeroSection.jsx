import React from 'react';
import { useHeroCanvasSequence } from '../../hooks/useHeroCanvasSequence.js';
import { useRealEstate } from '../../Context/RealEstateContext.jsx';
import { ArrowRight, Calendar, PhoneCall } from 'lucide-react';

export default function HeroSection() {
  const { openInquiry, navigateTo, companyInfo } = useRealEstate();

  // 60 FPS zero-lag canvas sequence:
  // - Starts from 0.5s (Frame 12)
  // - Ends at 10.0s (Frame 239)
  // - Holds at final completed state between 0.78 and 1.0 so user can view full interface before scrolling down
  const {
    containerRef,
    canvasRef,
    scrollProgress,
  } = useHeroCanvasSequence({
    startFrame: 20, // 0.5s at 24fps
    endFrame: 239,  // 10.0s at 24fps
    holdEndThreshold: 0.78, // Hold buffer at end
    smoothing: 0.18,
  });

  // Text floats in smoothly at ~8.0s of the video motion (progress >= 0.60)
  const isTextVisible = scrollProgress >= 0.60;

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[300vh] bg-black"
      id="hero-scroll-container"
    >
      {/* 100vh Sticky Viewport pinned while scrolling */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-start bg-black">

        {/* Fullscreen Canvas Frame Sequence (Zero Lag, Zero Stutter, Instant Reverse) */}
        <div className="absolute inset-0 select-none pointer-events-none overflow-hidden bg-black">
          <canvas
            ref={canvasRef}
            className="w-full h-full block"
            style={{
              willChange: 'transform',
              transform: 'translateZ(0)',
            }}
          />
        </div>

        {/* Floating Content: Hidden from 0.5s until ~8.0s, floats in smoothly and stays during hold */}
        <div
          className={`relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 transition-all duration-700 ease-out transform ${isTextVisible
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 translate-y-16 pointer-events-none'
            }`}
        >
          <div className="max-w-4xl">

            {/* Kicker badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-stone-900/80 backdrop-blur-md border border-stone-700/80 text-[11px] sm:text-xs font-semibold tracking-[0.22em] text-[#D4AF37] uppercase mb-5 shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              <span>ARCHITECTURAL MASTERY</span>
              <span aria-hidden="true" className="text-stone-500">·</span>
              <span>ESTABLISHED 1996</span>
              <span aria-hidden="true" className="text-stone-500">·</span>
              <span>DHAKA & CHATTOGRAM</span>
            </div>

            {/* Headline with gold italic highlight */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.08] mb-6 drop-shadow-xl">
              Crafting Tomorrow’s <span className="italic font-normal text-[#D4AF37]">Architectural</span> Landmarks
            </h1>

            {/* Subtext */}
            <p className="text-sm sm:text-base md:text-lg text-stone-200/95 max-w-2xl leading-relaxed mb-8 font-light drop-shadow-md">
              Where uncompromising seismic structural engineering meets Scandinavian-influenced
              sustainable luxury. Every residence is an enduring legacy.
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => navigateTo('projects', 'projects-grid')}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#B48C57] hover:bg-[#C5A059] text-white text-xs sm:text-sm font-semibold tracking-wider uppercase rounded-xl transition-all duration-300 shadow-xl hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Explore Signature Projects</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => openInquiry('General VIP Consultation')}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-stone-900/85 hover:bg-stone-800 backdrop-blur-md border border-stone-700 text-white text-xs sm:text-sm font-semibold tracking-wider uppercase rounded-xl transition-all duration-300 shadow-md cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#D4AF37]" />
                <span>Schedule Private Viewing</span>
              </button>

              <a
                href={`tel:${companyInfo.hotline.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-2 px-4 py-3.5 text-stone-300 hover:text-white text-xs sm:text-sm font-medium transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-[#D4AF37]" />
                <span>Hotline: {companyInfo.hotline}</span>
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
