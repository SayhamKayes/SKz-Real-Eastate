import React from 'react';
import { useHeroCanvasSequence } from '../../hooks/useHeroCanvasSequence.js';
import { useRealEstate } from '../../Context/RealEstateContext.jsx';
import { ArrowRight, Calendar } from 'lucide-react';

export default function HeroSection() {
  const { openInquiry, navigateTo, companyInfo } = useRealEstate();

  // 60 FPS zero-lag canvas sequence:
  const {
    containerRef,
    canvasRef,
    scrollProgress,
  } = useHeroCanvasSequence({
    startFrame: 20, // 0.5s at 24fps
    endFrame: 239,  // 10.0s at 24fps
    holdEndThreshold: 0.82, // Hold buffer at end
    smoothing: 0.18,
  });


  // Text floats in smoothly at ~8.0s of the video motion (progress >= 0.60)
  const isTextVisible = scrollProgress >= 0.60;

  // Initial Welcome Text opacity & transform (pure text, centered, disappears as blueprint builds)
  const welcomeOpacity = Math.max(0, 1 - scrollProgress / 0.18);
  const welcomeTranslateY = scrollProgress * 70;

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[220vh] bg-black"
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

          {/* Cinematic Darkish Vignette & Ambient Gradient Overlays for High Text Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/60 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_rgba(0,0,0,0.75)_100%)] pointer-events-none" />
        </div>

        {/* Initial Centered Welcome Typography (Pure text, no boxes/frames, visible at start on wireframe) */}
        {welcomeOpacity > 0 && (
          <div
            className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 pointer-events-none select-none transition-all duration-200 ease-out"
            style={{
              opacity: welcomeOpacity,
              transform: `translateY(-${welcomeTranslateY}px)`,
            }}
          >
            <span className="font-sans text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-[0.35em] text-white/80 uppercase mb-2 sm:mb-3 drop-shadow-lg">
              Welcome to
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white drop-shadow-2xl">
              SKz <span className="font-bold italic text-[#D4AF37]">REAL ESTATE</span>
            </h2>
          </div>
        )}

        {/* Floating Content: Hidden from 0.5s until ~8.0s, floats in smoothly and stays during hold */}
        <div
          className={`relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 transition-all duration-700 ease-out transform ${isTextVisible
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-16 pointer-events-none'
            }`}
        >
          <div className="max-w-4xl">

            {/* Kicker badge */}
            {/* <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-stone-900/80 backdrop-blur-md border border-stone-700/80 text-[11px] sm:text-xs font-semibold tracking-[0.22em] text-[#D4AF37] uppercase mb-5 shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              <span>ARCHITECTURAL MASTERY</span>
              <span aria-hidden="true" className="text-stone-500">·</span>
              <span>ESTABLISHED 1996</span>
              <span aria-hidden="true" className="text-stone-500">·</span>
              <span>DHAKA & CHATTOGRAM</span>
            </div> */}

            {/* Headline with gold italic highlight */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.08] mb-6 drop-shadow-xl">
              Crafting Tomorrow’s <br /><span className="italic font-bold text-[#D4AF37]">Architectural</span> Landmarks
            </h1>

            {/* Subtext */}
            <p className="text-sm sm:text-base md:text-lg text-stone-200/95 max-w-2xl leading-relaxed mb-8 font-[#ffffff] drop-shadow-md">
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
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => openInquiry('General VIP Consultation')}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-stone-900/85 hover:bg-stone-800 backdrop-blur-md border border-stone-700 text-white text-xs sm:text-sm font-semibold tracking-wider uppercase rounded-xl transition-all duration-300 shadow-md cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#D4AF37]" />
                <span>Book Now</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
