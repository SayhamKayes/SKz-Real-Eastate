import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, RotateCcw, Compass, Layers, Sparkles, Building2, ChevronDown, CheckCircle2 } from 'lucide-react';

export default function ScrollMotionPlayer({ progress, onStageClick }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isPlayingAuto, setIsPlayingAuto] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [renderMode, setRenderMode] = useState('hybrid'); // 'hybrid', 'video', 'canvas'
  const autoPlayTimerRef = useRef(null);

  // Sync video time smoothly with scroll progress
  useEffect(() => {
    if (isPlayingAuto) return;
    const video = videoRef.current;
    if (!video || !video.duration || isNaN(video.duration)) return;

    const targetTime = Math.max(0, Math.min(video.duration, progress * video.duration));
    // Fast seek without stutter
    if (Math.abs(video.currentTime - targetTime) > 0.03) {
      video.currentTime = targetTime;
    }
  }, [progress, isPlayingAuto]);

  // Handle video metadata loaded
  const handleLoadedMetadata = () => {
    setVideoLoaded(true);
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, Math.min(videoRef.current.duration, progress * videoRef.current.duration));
    }
  };

  // Draw real-time Canvas architectural blueprint & realistic building sync
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    const renderCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
      }
      ctx.save();
      ctx.scale(dpr, dpr);

      // Clear
      ctx.clearRect(0, 0, w, h);

      // Blueprint vs Realistic Background transition
      const p = progress;
      const bgT = Math.max(0, Math.min(1, (p - 0.45) / 0.45));

      // Light theme canvas styling:
      // When p < 0.45: Warm cream architectural grid background (#F5F4F0) with graphite/slate blueprint grid lines (#B48C57 and #78716C)
      // When p > 0.45: Pristine sunlit luxury background with soft sky gradient (#EBF4FF to #FBFBF9)
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      if (bgT < 0.05) {
        grad.addColorStop(0, '#F5F3EF');
        grad.addColorStop(1, '#EAE7E1');
      } else {
        grad.addColorStop(0, `rgb(${Math.round(245 - bgT * 20)}, ${Math.round(243 + bgT * 5)}, ${Math.round(239 + bgT * 15)})`);
        grad.addColorStop(1, '#FBFBF9');
      }
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Building Geometry calculation
      const cx = w * 0.50;
      const cy = h * 0.68;
      const floorH = Math.min(52, h * 0.10);
      const numFloors = 4;
      const bWidth = Math.min(320, w * 0.38);

      // 1. Grid Lines & Axis (early blueprint phase)
      const lineAlpha = p < 0.65 ? 1.0 : Math.max(0, (1.0 - p) / 0.35);
      if (lineAlpha > 0.02) {
        ctx.strokeStyle = `rgba(180, 140, 87, ${0.28 * lineAlpha})`;
        ctx.lineWidth = 1;

        // Ground perspective grid lines
        const gridSpread = Math.min(1, p * 3.5);
        for (let i = -5; i <= 5; i++) {
          ctx.beginPath();
          ctx.moveTo(cx + i * 45 * gridSpread, cy + 90);
          ctx.lineTo(cx + i * 85 * gridSpread, cy - 80);
          ctx.stroke();
        }

        // Horizontal dimension guides
        ctx.strokeStyle = `rgba(120, 113, 108, ${0.22 * lineAlpha})`;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(cx - bWidth * 1.3, cy + 30);
        ctx.lineTo(cx + bWidth * 1.3, cy + 30);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // 2. Realistic Building Facade Rendering (emerges at p > 0.40)
      const facadeT = Math.max(0, Math.min(1, (p - 0.40) / 0.50));
      if (facadeT > 0.02) {
        ctx.globalAlpha = facadeT;

        // Front driveway & landscaped paved apron
        ctx.fillStyle = '#E3DFD7';
        ctx.beginPath();
        ctx.moveTo(cx - bWidth * 1.15, cy + 60);
        ctx.lineTo(cx + bWidth * 1.15, cy + 55);
        ctx.lineTo(cx + bWidth * 1.35, cy + 115);
        ctx.lineTo(cx - bWidth * 1.35, cy + 115);
        ctx.closePath();
        ctx.fill();

        // Fountain basin in front
        ctx.fillStyle = '#7BB8D9';
        ctx.beginPath();
        ctx.ellipse(cx, cy + 70, bWidth * 0.28, 14, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#D1CBC1';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Fountain water jet animation
        const jetWave = Math.sin(Date.now() * 0.005) * 4;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy + 70);
        ctx.lineTo(cx - 6, cy + 42 + jetWave);
        ctx.moveTo(cx, cy + 70);
        ctx.lineTo(cx + 6, cy + 42 - jetWave);
        ctx.stroke();

        // Landscaped perimeter garden lawns
        ctx.fillStyle = '#6E9859';
        ctx.beginPath();
        ctx.moveTo(cx - bWidth * 1.3, cy - 30);
        ctx.lineTo(cx - bWidth * 0.88, cy - 8);
        ctx.lineTo(cx - bWidth * 1.05, cy + 35);
        ctx.lineTo(cx - bWidth * 1.45, cy + 5);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(cx + bWidth * 0.88, cy - 8);
        ctx.lineTo(cx + bWidth * 1.3, cy - 30);
        ctx.lineTo(cx + bWidth * 1.45, cy + 5);
        ctx.lineTo(cx + bWidth * 1.05, cy + 35);
        ctx.closePath();
        ctx.fill();

        // 4 Floors of Travertine & Glass Architecture
        for (let f = 0; f < numFloors; f++) {
          const yB = cy - f * floorH;
          const yT = yB - floorH;

          // Left stone facade wall
          ctx.fillStyle = f % 2 === 0 ? '#EBE6DC' : '#E5E0D5';
          ctx.beginPath();
          ctx.moveTo(cx, yB);
          ctx.lineTo(cx - bWidth, yB - 50);
          ctx.lineTo(cx - bWidth, yT - 50);
          ctx.lineTo(cx, yT);
          ctx.closePath();
          ctx.fill();

          // Right stone facade wall (sunlit)
          ctx.fillStyle = f % 2 === 0 ? '#FAF7F0' : '#F4F0E6';
          ctx.beginPath();
          ctx.moveTo(cx, yB);
          ctx.lineTo(cx + bWidth, yB - 45);
          ctx.lineTo(cx + bWidth, yT - 45);
          ctx.lineTo(cx, yT);
          ctx.closePath();
          ctx.fill();

          // Left floor glass balcony
          ctx.fillStyle = 'rgba(74, 126, 168, 0.75)';
          ctx.beginPath();
          ctx.moveTo(cx - 15, yB - 8);
          ctx.lineTo(cx - bWidth * 0.88, yB - 46);
          ctx.lineTo(cx - bWidth * 0.88, yT - 38);
          ctx.lineTo(cx - 15, yT - 6);
          ctx.closePath();
          ctx.fill();

          // Right floor glass balcony (sky reflection)
          ctx.fillStyle = 'rgba(100, 162, 214, 0.82)';
          ctx.beginPath();
          ctx.moveTo(cx + 15, yB - 6);
          ctx.lineTo(cx + bWidth * 0.88, yB - 42);
          ctx.lineTo(cx + bWidth * 0.88, yT - 34);
          ctx.lineTo(cx + 15, yT - 6);
          ctx.closePath();
          ctx.fill();

          // Teak wood architectural vertical divider louvers
          ctx.fillStyle = '#B48C57';
          ctx.fillRect(cx - 6, yT + 2, 12, floorH - 4);
        }

        // Penthouse rooftop terrace & pergolas
        const pTopY = cy - numFloors * floorH;
        ctx.fillStyle = '#D6D0C4';
        ctx.beginPath();
        ctx.moveTo(cx, pTopY);
        ctx.lineTo(cx - bWidth, pTopY - 50);
        ctx.lineTo(cx, pTopY - 95);
        ctx.lineTo(cx + bWidth, pTopY - 45);
        ctx.closePath();
        ctx.fill();

        ctx.globalAlpha = 1.0;
      }

      // 3. Blueprint Wireframe CAD Overlay Lines
      if (lineAlpha > 0.05) {
        ctx.strokeStyle = `rgba(180, 140, 87, ${0.9 * lineAlpha})`;
        ctx.lineWidth = 1.5;

        // Foundation and vertical corner columns
        const colProg = Math.min(1, Math.max(0, (p - 0.06) * 3.4));
        if (colProg > 0) {
          const maxH = numFloors * floorH * colProg;
          // Center axis
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx, cy - maxH);
          ctx.stroke();

          // Left corner
          ctx.beginPath();
          ctx.moveTo(cx - bWidth, cy - 50);
          ctx.lineTo(cx - bWidth, cy - 50 - maxH);
          ctx.stroke();

          // Right corner
          ctx.beginPath();
          ctx.moveTo(cx + bWidth, cy - 45);
          ctx.lineTo(cx + bWidth, cy - 45 - maxH);
          ctx.stroke();
        }

        // Floor slabs
        const slabProg = Math.min(1, Math.max(0, (p - 0.12) * 3.0));
        for (let f = 0; f <= numFloors; f++) {
          if (slabProg >= f / numFloors) {
            const yC = cy - f * floorH;
            ctx.beginPath();
            ctx.moveTo(cx, yC);
            ctx.lineTo(cx - bWidth, yC - 50);
            ctx.moveTo(cx, yC);
            ctx.lineTo(cx + bWidth, yC - 45);
            ctx.stroke();
          }
        }

        // Penthouse frame
        const roofProg = Math.min(1, Math.max(0, (p - 0.28) * 3.0));
        if (roofProg > 0) {
          const pTopY = cy - numFloors * floorH;
          ctx.beginPath();
          ctx.moveTo(cx, pTopY);
          ctx.lineTo(cx, pTopY - 35 * roofProg);
          ctx.moveTo(cx - bWidth, pTopY - 50);
          ctx.lineTo(cx, pTopY - 95 * roofProg);
          ctx.moveTo(cx + bWidth, pTopY - 45);
          ctx.lineTo(cx, pTopY - 95 * roofProg);
          ctx.stroke();
        }
      }

      // 4. Glowing energy scanline wave sweep (between 30% and 75%)
      if (p >= 0.28 && p <= 0.78) {
        const scanT = (p - 0.28) / 0.50; // 0 -> 1 bottom to top
        const scanY = cy + 40 - scanT * (numFloors * floorH + 110);

        ctx.save();
        ctx.shadowColor = '#B48C57';
        ctx.shadowBlur = 18;
        ctx.strokeStyle = 'rgba(255, 235, 190, 0.95)';
        ctx.lineWidth = 3;

        ctx.beginPath();
        ctx.moveTo(cx - bWidth * 1.15, scanY - 14);
        ctx.lineTo(cx, scanY + 10);
        ctx.lineTo(cx + bWidth * 1.15, scanY - 10);
        ctx.stroke();

        ctx.restore();
      }

      ctx.restore();
    };

    renderCanvas();
    const handleResize = () => renderCanvas();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [progress]);

  // Auto-play preview toggle
  const toggleAutoPlay = () => {
    if (isPlayingAuto) {
      setIsPlayingAuto(false);
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    } else {
      setIsPlayingAuto(true);
      let localProg = progress;
      autoPlayTimerRef.current = setInterval(() => {
        localProg += 0.015;
        if (localProg > 1) localProg = 0;
        if (videoRef.current && videoRef.current.duration) {
          videoRef.current.currentTime = localProg * videoRef.current.duration;
        }
      }, 50);
    }
  };

  useEffect(() => {
    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, []);

  // Determine active phase based on progress
  const getPhaseInfo = () => {
    if (progress < 0.32) {
      return {
        step: '01 / 03',
        tag: 'ARCHITECTURAL SCHEMATICS',
        title: 'Precision CAD Wireframe & Seismic Grid',
        desc: 'Every milestone starts with meticulous structural engineering calculated to withstand magnitude 7.5+ seismic events.',
        icon: Compass,
      };
    }
    if (progress < 0.70) {
      return {
        step: '02 / 03',
        tag: 'STRUCTURAL SYNTHESIS',
        title: 'Volumetric Form & Biophilic Daylight Energy',
        desc: 'Post-tensioned slabs, triple-height cantilever balconies, and acoustic double-glazing envelope the building core.',
        icon: Sparkles,
      };
    }
    return {
      step: '03 / 03',
      tag: 'COMPLETED ARCHITECTURAL LANDMARK',
      title: 'Timeless Scandinavian Luxury Realized',
      desc: 'Finished travertine limestone, imported teak louvers, private sky pools, and manicured lush botanical courtyards.',
      icon: Building2,
    };
  };

  const phase = getPhaseInfo();

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden bg-[#FBFBF9]">
      {/* Background Architectural Ambient Texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: 'radial-gradient(#1C1917 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Main Video & Canvas Layer Container */}
      <div className="relative w-full max-w-6xl aspect-[16/9] mx-auto rounded-2xl overflow-hidden border border-stone-200/80 shadow-2xl bg-stone-50">
        
        {/* Native Video Layer with instant All-Intra H.264 scrub */}
        <video
          ref={videoRef}
          src="/assets/hero_motion.mp4"
          muted
          playsInline
          preload="auto"
          onLoadedMetadata={handleLoadedMetadata}
          onError={() => setVideoError(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            renderMode === 'canvas' ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        />

        {/* Dynamic Hardware-Accelerated Interactive Canvas Overlay */}
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-300 ${
            renderMode === 'video' ? 'opacity-0' : (renderMode === 'canvas' ? 'opacity-100' : 'opacity-40 mix-blend-multiply')
          }`}
        />

        {/* Ambient Corner Technical Coordinates / Vignette */}
        <div className="absolute top-4 left-5 flex items-center gap-2 text-[11px] font-mono tracking-wider text-stone-500 uppercase pointer-events-none bg-white/70 backdrop-blur-md px-3 py-1.5 rounded-md border border-stone-200/60 shadow-sm">
          <div className="w-2 h-2 rounded-full bg-[#B48C57] animate-pulse" />
          <span>MOTION SCRUB · {(progress * 100).toFixed(0)}% SYNCHRONIZED</span>
        </div>

        {/* Right Corner Coordinates */}
        <div className="absolute top-4 right-5 hidden md:flex items-center gap-3 text-[11px] font-mono text-stone-500 pointer-events-none bg-white/70 backdrop-blur-md px-3 py-1.5 rounded-md border border-stone-200/60">
          <span>LAT 23.7925° N</span>
          <span>·</span>
          <span>LONG 90.4078° E</span>
          <span>·</span>
          <span className="text-[#B48C57] font-semibold">GULSHAN 2</span>
        </div>

        {/* Bottom Floating Architectural Milestone Card */}
        <div className="absolute bottom-5 inset-x-5 md:inset-x-8 bg-white/90 backdrop-blur-md border border-stone-200/90 rounded-xl p-4 md:p-5 shadow-lg transition-all duration-300">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#B48C57] uppercase">
                <phase.icon className="w-3.5 h-3.5" />
                <span>{phase.step} · {phase.tag}</span>
              </div>
              <h3 className="text-base md:text-lg font-serif font-bold text-stone-900 tracking-tight">
                {phase.title}
              </h3>
              <p className="text-xs md:text-sm text-stone-600 line-clamp-1 max-w-2xl">
                {phase.desc}
              </p>
            </div>

            {/* Scrub Progress Bar & Interactive Jump Milestones */}
            <div className="flex flex-col gap-2 min-w-[260px] md:min-w-[320px]">
              <div className="flex items-center justify-between text-xs text-stone-500 font-mono">
                <span>CONSTRUCTION PROGRESS</span>
                <span className="font-bold text-[#B48C57]">{(progress * 100).toFixed(0)}%</span>
              </div>
              
              {/* Interactive Scrub Track */}
              <div className="relative h-2 w-full bg-stone-200 rounded-full overflow-hidden">
                <div 
                  className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#C5A880] to-[#B48C57] rounded-full transition-all duration-75"
                  style={{ width: `${Math.max(4, progress * 100)}%` }}
                />
              </div>

              {/* Milestone Quick Jump Buttons */}
              <div className="flex items-center justify-between text-[11px] text-stone-500 font-sans pt-1">
                <button
                  type="button"
                  onClick={() => onStageClick && onStageClick(0.1)}
                  className={`hover:text-[#B48C57] transition-colors ${progress < 0.33 ? 'font-bold text-[#B48C57]' : ''}`}
                >
                  01. Blueprint
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={() => onStageClick && onStageClick(0.5)}
                  className={`hover:text-[#B48C57] transition-colors ${progress >= 0.33 && progress < 0.7 ? 'font-bold text-[#B48C57]' : ''}`}
                >
                  02. Structural Grid
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={() => onStageClick && onStageClick(0.95)}
                  className={`hover:text-[#B48C57] transition-colors ${progress >= 0.7 ? 'font-bold text-[#B48C57]' : ''}`}
                >
                  03. Landmark Finish
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Interactive Dock / Control Bar */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-xs">
        {/* Scroll status hint */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 bg-stone-100/90 border border-stone-200 rounded-lg text-stone-700">
          <ChevronDown className="w-3.5 h-3.5 text-[#B48C57] animate-bounce" />
          <span>Scroll down to construct landmark · Scroll up to reverse</span>
        </div>

        {/* Auto Preview Toggle Button */}
        <button
          type="button"
          onClick={toggleAutoPlay}
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white border border-stone-200 hover:border-[#B48C57] rounded-lg text-stone-800 transition-colors shadow-sm"
        >
          {isPlayingAuto ? (
            <>
              <Pause className="w-3.5 h-3.5 text-[#B48C57]" />
              <span>Pause Auto Orbit</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 text-[#B48C57]" />
              <span>Auto Preview Loop</span>
            </>
          )}
        </button>

        {/* View Mode Selector */}
        <div className="flex items-center p-0.5 bg-stone-100 border border-stone-200 rounded-lg">
          <button
            type="button"
            onClick={() => setRenderMode('hybrid')}
            className={`px-2.5 py-1 text-[11px] rounded-md transition-colors ${
              renderMode === 'hybrid' ? 'bg-white text-stone-900 font-semibold shadow-xs' : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Hybrid CAD+Render
          </button>
          <button
            type="button"
            onClick={() => setRenderMode('video')}
            className={`px-2.5 py-1 text-[11px] rounded-md transition-colors ${
              renderMode === 'video' ? 'bg-white text-stone-900 font-semibold shadow-xs' : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Pure Video Motion
          </button>
          <button
            type="button"
            onClick={() => setRenderMode('canvas')}
            className={`px-2.5 py-1 text-[11px] rounded-md transition-colors ${
              renderMode === 'canvas' ? 'bg-white text-stone-900 font-semibold shadow-xs' : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Architectural Canvas
          </button>
        </div>
      </div>
    </div>
  );
}
