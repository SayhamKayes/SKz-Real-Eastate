import React, { useEffect, useRef, useState } from 'react';

const ROOM_SEQUENCES = [
  {
    id: 'bedroom',
    name: 'BEDROOM',
    spec: 'Saint-Gobain acoustic acoustic glazing & bespoke walk-in boudoir',
    startProgress: 0.25,
    endProgress: 0.48,
  },
  {
    id: 'kitchen',
    name: 'KITCHEN',
    spec: 'Italian quartz surfaces & integrated European concealed ventilation',
    startProgress: 0.49,
    endProgress: 0.70,
  },
  {
    id: 'dining',
    name: 'DINING',
    spec: 'Expansive open-concept layout tailored for intimate evening hosting',
    startProgress: 0.71,
    endProgress: 0.85,
  },
  {
    id: 'washroom',
    name: 'WASHROOM',
    spec: 'Bespoke marble vanities & thermostatic ambient rainfall suite',
    startProgress: 0.86,
    endProgress: 0.99,
  },
];

export default function InteriorShowcase() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  const [scrollProgress, setScrollProgress] = useState(0);

  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    // Ensure video is paused and ready for scrubbing
    video.pause();

    const handleLoadedMetadata = () => {
      video.currentTime = 0;
    };
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    // Calculate normalized scroll progress relative to this section
    const onScroll = () => {
      const rect = container.getBoundingClientRect();
      const scrollableDistance = container.offsetHeight - window.innerHeight;
      if (scrollableDistance <= 0) return;
      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / scrollableDistance));
      targetProgressRef.current = progress;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();

    // 60FPS Animation loop with LERP smoothing for video scrubbing
    let rafId;
    const updateLoop = () => {
      // Smooth interpolation (LERP factor 0.16)
      currentProgressRef.current += (targetProgressRef.current - currentProgressRef.current) * 0.16;
      const currentP = currentProgressRef.current;
      setScrollProgress(currentP);

      // Scrub video currentTime
      if (video.duration && !video.seeking) {
        const targetTime = Math.max(0, Math.min(video.duration - 0.04, currentP * video.duration));
        if (Math.abs(video.currentTime - targetTime) > 0.03) {
          if ('fastSeek' in video) {
            video.fastSeek(targetTime);
          } else {
            video.currentTime = targetTime;
          }
        }
      }

      rafId = requestAnimationFrame(updateLoop);
    };

    rafId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="interior-showcase"
      className="relative w-full h-[280vh] bg-black select-none z-10"
    >
      {/* 100vh Sticky Viewport pinned while scrolling */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-black">

        {/* Fullscreen Video Background */}
        <div className="absolute inset-0 select-none pointer-events-none overflow-hidden bg-black">
          <video
            ref={videoRef}
            src="/videos/Interior_video.mp4"
            preload="auto"
            muted
            playsInline
            className="w-full h-full object-cover select-none pointer-events-none brightness-[0.95] contrast-[1.05]"
          />

          {/* Cinematic Vignette Overlays for Clean Text Legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/60 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(0,0,0,0.65)_100%)] pointer-events-none" />
        </div>

        {/* Bottom-Right 60px Floating Typography (Synced directly with video scenes) */}
        <div className="absolute bottom-10 right-6 sm:bottom-16 sm:right-14 lg:bottom-20 lg:right-20 z-30 text-right pointer-events-none max-w-xl">
          {ROOM_SEQUENCES.map((room) => {
            const isVisible = scrollProgress >= room.startProgress && scrollProgress <= room.endProgress;

            return (
              <div
                key={room.id}
                className={`transition-all duration-700 ease-out transform ${
                  isVisible
                    ? 'opacity-100 translate-x-0 block'
                    : 'opacity-0 -translate-x-14 hidden'
                }`}
              >
                {/* Main 60px Room Headline (Exact 60px requested by user) */}
                <h3 className="font-serif text-5xl sm:text-6xl md:text-[60px] lg:text-[64px] font-bold text-white tracking-[0.08em] uppercase leading-none drop-shadow-2xl">
                  {room.name}
                </h3>

                {/* Architectural Specifications Subtext */}
                <p className="text-xs sm:text-sm md:text-base text-stone-200/90 font-light mt-3 leading-relaxed drop-shadow-md max-w-md ml-auto">
                  {room.spec}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
