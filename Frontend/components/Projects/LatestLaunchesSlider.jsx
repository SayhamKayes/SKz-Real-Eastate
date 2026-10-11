import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { ChevronLeft, ChevronRight, MapPin, X, Maximize2 } from 'lucide-react';
import { LATEST_LAUNCHES } from '../../data/latestLaunchesData.js';

export default function LatestLaunchesSlider() {
  const N = LATEST_LAUNCHES.length; // 5 items

  // Tripled slides array for seamless, continuous infinite loop:
  // indices 0..4 (clone-before), 5..9 (main items), 10..14 (clone-after)
  const extendedSlides = useMemo(() => [
    ...LATEST_LAUNCHES.map((item, idx) => ({ ...item, _loopId: `prev-${idx}` })),
    ...LATEST_LAUNCHES.map((item, idx) => ({ ...item, _loopId: `main-${idx}` })),
    ...LATEST_LAUNCHES.map((item, idx) => ({ ...item, _loopId: `next-${idx}` })),
  ], []);

  // Responsive visible slides count
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const updateVisible = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };
    updateVisible();
    window.addEventListener('resize', updateVisible);
    return () => window.removeEventListener('resize', updateVisible);
  }, []);

  // State: start at main set (index N = 5)
  const [currentIndex, setCurrentIndex] = useState(N);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(null);


  const [imageCenterY, setImageCenterY] = useState(null);

  const isTransitioningRef = useRef(false);
  const isDraggingRef = useRef(false);
  const hasDraggedRef = useRef(false);
  const dragStartXRef = useRef(0);
  const sliderRef = useRef(null);
  const imageContainerRef = useRef(null);
  const autoplayTimerRef = useRef(null);

  // Measure exact vertical center of the image container
  const updateImageCenter = useCallback(() => {
    if (imageContainerRef.current) {
      const height = imageContainerRef.current.offsetHeight;
      if (height > 0) {
        setImageCenterY(height / 2);
      }
    }
  }, []);

  useEffect(() => {
    updateImageCenter();
    window.addEventListener('resize', updateImageCenter);
    return () => window.removeEventListener('resize', updateImageCenter);
  }, [updateImageCenter, visibleCount]);

  // Handle transition end: silently normalize index to middle range [N, 2*N - 1]
  const handleTransitionEnd = useCallback(() => {
    setIsTransitioning(false);
    isTransitioningRef.current = false;

    setCurrentIndex((curr) => {
      if (curr >= 2 * N) {
        return curr - N;
      } else if (curr < N) {
        return curr + N;
      }
      return curr;
    });
  }, [N]);

  // Safety fallback if onTransitionEnd event doesn't fire
  useEffect(() => {
    if (!isTransitioning) return;
    const timer = setTimeout(() => {
      handleTransitionEnd();
    }, 700);
    return () => clearTimeout(timer);
  }, [isTransitioning, currentIndex, handleTransitionEnd]);

  // Next Slide (Infinite Loop)
  const nextSlide = useCallback(() => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  // Prev Slide (Infinite Loop)
  const prevSlide = useCallback(() => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  }, []);

  // Jump to specific slide via dot click
  const goToSlide = useCallback((targetDotIndex) => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setIsTransitioning(true);
    setCurrentIndex(N + targetDotIndex);
  }, [N]);

  // Autoplay loop
  useEffect(() => {
    if (isPaused || isDragging || activeImageIndex !== null) return;
    autoplayTimerRef.current = setInterval(() => {
      nextSlide();
    }, 4500);

    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [isPaused, isDragging, activeImageIndex, nextSlide]);

  // Global pointer listeners for smooth dragging without sticky pointer or accidental click
  const handlePointerDown = (e) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    if (isTransitioningRef.current) {
      isTransitioningRef.current = false;
      setIsTransitioning(false);
    }
    setIsDragging(true);
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    dragStartXRef.current = e.clientX;
    setDragOffset(0);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handlePointerMove = (e) => {
      const diff = e.clientX - dragStartXRef.current;
      if (Math.abs(diff) > 8) {
        hasDraggedRef.current = true;
      }
      setDragOffset(diff);
    };

    const handlePointerUp = (e) => {
      const diff = e.clientX - dragStartXRef.current;
      setIsDragging(false);
      isDraggingRef.current = false;
      const threshold = 50; // minimum drag distance

      if (diff < -threshold) {
        // Dragged left -> Next slide
        isTransitioningRef.current = true;
        setIsTransitioning(true);
        setCurrentIndex((prev) => prev + 1);
      } else if (diff > threshold) {
        // Dragged right -> Prev slide
        isTransitioningRef.current = true;
        setIsTransitioning(true);
        setCurrentIndex((prev) => prev - 1);
      } else {
        // Snap back
        if (Math.abs(diff) > 0) {
          isTransitioningRef.current = true;
          setIsTransitioning(true);
        }
      }
      setDragOffset(0);

      // Keep hasDraggedRef true briefly so the subsequent click event is safely ignored
      setTimeout(() => {
        hasDraggedRef.current = false;
      }, 150);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [isDragging]);

  // Card & Image click handler
  const handleCardClick = (e, index) => {
    if (hasDraggedRef.current) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    const originalIndex = index % N;
    setActiveImageIndex(originalIndex);
  };

  // Keyboard navigation & body scroll lock for image lightbox modal
  useEffect(() => {
    if (activeImageIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveImageIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setActiveImageIndex((prev) => (prev <= 0 ? N - 1 : prev - 1));
      } else if (e.key === 'ArrowRight') {
        setActiveImageIndex((prev) => (prev >= N - 1 ? 0 : prev + 1));
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeImageIndex, N]);

  // Current active dot index (0..4)
  const activeDotIndex = ((currentIndex % N) + N) % N;

  return (
    <section 
      id="latest-launches" 
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#F5F5F5] overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-[72px] font-normal tracking-[0.08em] text-[#28241E] uppercase leading-none">
            LATEST LAUNCHES
          </h2>
        </div>

        {/* Carousel Viewport Container */}
        <div className="relative">
          
          {/* Slider Track Container */}
          <div 
            ref={sliderRef}
            className="overflow-hidden cursor-grab active:cursor-grabbing pb-4 touch-pan-y"
            onPointerDown={handlePointerDown}
          >
            <div 
              onTransitionEnd={handleTransitionEnd}
              className="flex will-change-transform"
              style={{
                transform: `translateX(calc(-${currentIndex * (100 / visibleCount)}% + ${dragOffset}px))`,
                transition: isDragging || !isTransitioning ? 'none' : 'transform 600ms cubic-bezier(0.25, 1, 0.5, 1)',
              }}
            >
              {extendedSlides.map((project, index) => (
                <div 
                  key={project._loopId}
                  className="px-3 sm:px-4 shrink-0 transition-opacity"
                  style={{ width: `${100 / visibleCount}%` }}
                >
                  <article 
                    onClick={(e) => handleCardClick(e, index)}
                    className="group block cursor-pointer"
                  >
                    {/* Tall Portrait Media Container (aspect 3/4 or 4/5) */}
                    <div 
                      ref={index === 0 ? imageContainerRef : null}
                      className="relative w-full aspect-[3/4] sm:aspect-[4/5] overflow-hidden rounded-xs bg-stone-200"
                    >
                      {/* Property Image with hover zoom */}
                      <img 
                        src={project.image} 
                        alt={project.title}
                        onLoad={updateImageCenter}
                        className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
                        loading="lazy"
                        draggable={false}
                        onDragStart={(e) => e.preventDefault()}
                      />

                      {/* Subtle Ambient Vignette Overlay */}
                      <div className="absolute inset-0 bg-black/15 group-hover:bg-black/25 transition-colors duration-500" />

                      {/* Zoom Indicator on Hover */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <div className="bg-black/65 backdrop-blur-md text-white px-4 py-2 rounded-full border border-white/20 flex items-center gap-2 text-xs font-medium tracking-wider uppercase shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          <Maximize2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>View Image</span>
                        </div>
                      </div>

                      {/* Vertical Category Tag */}
                      <div className="absolute top-16 sm:top-24 -right-10 sm:-right-12 rotate-90 origin-center pointer-events-none">
                        <span className="font-sans text-xs sm:text-sm font-light tracking-[0.35em] text-white/95 uppercase drop-shadow-md">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Meta Details: Clean Title & Location Pin */}
                    <div className="pt-5 sm:pt-6">
                      <h3 className="font-sans text-sm sm:text-base md:text-[18px] font-medium tracking-[0.14em] text-[#333333] uppercase mb-1.5 sm:mb-2 group-hover:text-[#B48C57] transition-colors">
                        {project.title}
                      </h3>

                      <div className="flex items-center gap-1.5 text-[#888888]">
                        <MapPin className="w-4 h-4 text-[#888888] shrink-0" />
                        <span className="font-sans text-xs sm:text-sm font-light tracking-wider">
                          {project.location}
                        </span>
                      </div>
                    </div>

                  </article>
                </div>
              ))}
            </div>
          </div>

          {/* Left Arrow Button: Positioned vertically middle of image & overlapping slightly inside image */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous Slide"
            style={{
              top: imageCenterY ? `${imageCenterY}px` : '42%',
              transform: 'translateY(-50%)',
            }}
            className="absolute left-4 sm:left-6 lg:left-8 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/45 hover:bg-black/75 backdrop-blur-md border border-white/25 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-xl z-20 cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>

          {/* Right Arrow Button: Positioned vertically middle of image & overlapping slightly inside image */}
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next Slide"
            style={{
              top: imageCenterY ? `${imageCenterY}px` : '42%',
              transform: 'translateY(-50%)',
            }}
            className="absolute right-4 sm:right-6 lg:right-8 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/45 hover:bg-black/75 backdrop-blur-md border border-white/25 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-xl z-20 cursor-pointer"
          >
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>

        </div>

        {/* Pagination Dots with Active Pill (loops continuously across 5 projects) */}
        <div className="flex items-center justify-center gap-2 mt-8 sm:mt-12">
          {LATEST_LAUNCHES.map((_, idx) => {
            const isActive = idx === activeDotIndex;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => goToSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 h-1.5 rounded-full cursor-pointer ${
                  isActive 
                    ? 'w-9 bg-[#E95D80]' 
                    : 'w-1.5 bg-[#D3D3D3] hover:bg-stone-400'
                }`}
              />
            );
          })}
        </div>

      </div>

      {/* Full-Screen Image Lightbox Popup Modal */}
      {activeImageIndex !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setActiveImageIndex(null)}
        >
          {/* Close Button Top-Right */}
          <button
            type="button"
            onClick={() => setActiveImageIndex(null)}
            aria-label="Close image popup"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all duration-200 hover:scale-110 z-50 cursor-pointer shadow-lg"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation: Prev Image */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveImageIndex((prev) => (prev <= 0 ? N - 1 : prev - 1));
            }}
            aria-label="Previous image"
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all duration-200 hover:scale-110 z-50 cursor-pointer shadow-lg"
          >
            <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>

          {/* Navigation: Next Image */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveImageIndex((prev) => (prev >= N - 1 ? 0 : prev + 1));
            }}
            aria-label="Next image"
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all duration-200 hover:scale-110 z-50 cursor-pointer shadow-lg"
          >
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>

          {/* Image Content Wrapper */}
          <div 
            className="relative max-w-5xl w-full flex flex-col items-center justify-center animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Frame */}
            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-2xl bg-black/40 border border-white/10 max-h-[75vh] sm:max-h-[80vh] flex items-center justify-center">
              <img 
                src={LATEST_LAUNCHES[activeImageIndex].image} 
                alt={LATEST_LAUNCHES[activeImageIndex].title}
                className="max-h-[75vh] sm:max-h-[80vh] w-auto max-w-full object-contain select-none"
              />
              <div className="absolute top-4 left-4 bg-black/65 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 text-[11px] font-sans tracking-widest uppercase text-white/90">
                {activeImageIndex + 1} / {N}
              </div>
            </div>

            {/* Caption / Information Pill */}
            <div className="mt-4 sm:mt-5 text-center px-4 max-w-2xl">
              <div className="flex items-center justify-center gap-2 mb-1.5">
                <span className="text-[11px] tracking-[0.2em] uppercase text-[#D4AF37] font-semibold">
                  {LATEST_LAUNCHES[activeImageIndex].category}
                </span>
                <span className="text-white/40">·</span>
                <span className="text-[11px] tracking-wider uppercase text-white/80 font-light">
                  {LATEST_LAUNCHES[activeImageIndex].status}
                </span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-white font-medium tracking-wide">
                {LATEST_LAUNCHES[activeImageIndex].title}
              </h3>
              <div className="flex items-center justify-center gap-1.5 text-white/70 text-xs sm:text-sm mt-1">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <span>{LATEST_LAUNCHES[activeImageIndex].address}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
