import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { TESTIMONIALS } from '../../services/propertyData.js';
import { Quote, ChevronLeft, ChevronRight, Star, ShieldCheck } from 'lucide-react';

export default function ClientReviews() {
  const N = TESTIMONIALS.length; // 6 testimonials

  // Tripled slides array for seamless, continuous infinite loop:
  // indices 0..N-1 (clone-before), N..2N-1 (main items), 2N..3N-1 (clone-after)
  const extendedSlides = useMemo(() => [
    ...TESTIMONIALS.map((item, idx) => ({ ...item, _loopId: `prev-${idx}` })),
    ...TESTIMONIALS.map((item, idx) => ({ ...item, _loopId: `main-${idx}` })),
    ...TESTIMONIALS.map((item, idx) => ({ ...item, _loopId: `next-${idx}` })),
  ], [N]);

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

  // State: start at main set (index N = 6)
  const [currentIndex, setCurrentIndex] = useState(N);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const isTransitioningRef = useRef(false);
  const isDraggingRef = useRef(false);
  const hasDraggedRef = useRef(false);
  const startXRef = useRef(0);
  const dragOffsetRef = useRef(0);
  const sliderRef = useRef(null);

  // Transition End: Teleport without animation when leaving the main range [N, 2N - 1]
  const handleTransitionEnd = useCallback(() => {
    isTransitioningRef.current = false;
    setIsTransitioning(false);

    setCurrentIndex((prev) => {
      if (prev >= 2 * N) {
        return prev - N;
      }
      if (prev < N) {
        return prev + N;
      }
      return prev;
    });
  }, [N]);

  // Safety fallback if transition end event misses
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

  // Autoplay loop (5s interval, pauses when hovering or dragging)
  useEffect(() => {
    if (isPaused || isDragging) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused, isDragging, nextSlide]);

  // Drag & Swipe Pointer Event Handlers
  const handlePointerDown = (e) => {
    if (isTransitioningRef.current) return;
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = e.clientX;
    dragOffsetRef.current = 0;
    setIsDragging(true);
  };

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - startXRef.current;
      if (Math.abs(deltaX) > 6) {
        hasDraggedRef.current = true;
      }
      dragOffsetRef.current = deltaX;
      setDragOffset(deltaX);
    };

    const handlePointerUp = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      setIsDragging(false);

      const offset = dragOffsetRef.current;
      const threshold = 50;

      if (Math.abs(offset) > threshold) {
        if (offset < 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
      setDragOffset(0);

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
  }, [isDragging, nextSlide, prevSlide]);

  return (
    <section 
      id="proven-trust-section" 
      className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#FBFBF9] border-t border-stone-200/80 overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header with Left/Right Nav Arrows */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-[#B48C57] uppercase mb-3">
              <span>RESIDENTS & PARTNERS</span>
              <span aria-hidden="true">·</span>
              <span>PROVEN TRUST</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight leading-[1.15]">
              Homeowner & Landowner Voices Across Decades
            </h2>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous testimonial"
              className="w-12 h-12 rounded-full border border-stone-300 bg-white hover:bg-stone-900 hover:text-white hover:border-stone-900 text-stone-700 flex items-center justify-center transition-all duration-300 shadow-xs cursor-pointer active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next testimonial"
              className="w-12 h-12 rounded-full border border-stone-300 bg-white hover:bg-stone-900 hover:text-white hover:border-stone-900 text-stone-700 flex items-center justify-center transition-all duration-300 shadow-xs cursor-pointer active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
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
              {extendedSlides.map((t, idx) => (
                <div 
                  key={`${t.id}-${t._loopId}-${idx}`}
                  style={{ width: `${100 / visibleCount}%` }}
                  className="shrink-0 px-3 md:px-4"
                >
                  <div className="h-full p-8 bg-white border border-stone-200/90 rounded-2xl shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-6">
                    
                    {/* Upper: Stars & Quote */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-[#D4AF37]">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-[#D4AF37]" />
                          ))}
                        </div>
                        <Quote className="w-7 h-7 text-[#B48C57]/30" />
                      </div>

                      <p className="text-sm md:text-base text-stone-700 leading-relaxed italic">
                        "{t.quote}"
                      </p>
                    </div>

                    {/* Lower: Author Info & Credential */}
                    <div className="pt-6 border-t border-stone-100">
                      <div className="flex items-center justify-between">
                        <div className="font-serif text-lg font-bold text-stone-900">
                          {t.client}
                        </div>
                        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-stone-100 text-[10px] font-semibold text-stone-600">
                          <ShieldCheck className="w-3 h-3 text-[#B48C57]" />
                          <span>Verified</span>
                        </div>
                      </div>

                      <div className="text-xs text-stone-600 mt-1">
                        {t.role}
                      </div>

                      <div className="flex items-center justify-between text-xs text-[#B48C57] font-medium mt-3 pt-3 border-t border-stone-50">
                        <span className="truncate pr-2 font-semibold">{t.project}</span>
                        <span className="text-stone-400 font-mono text-[11px] shrink-0">{t.handoverYear}</span>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator for Current Slide Position */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {TESTIMONIALS.map((_, i) => {
              const activeIndex = currentIndex % N;
              const isActive = activeIndex === i;

              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    if (isTransitioningRef.current) return;
                    isTransitioningRef.current = true;
                    setIsTransitioning(true);
                    setCurrentIndex(N + i);
                  }}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    isActive ? 'w-8 bg-[#B48C57]' : 'w-2 bg-stone-300 hover:bg-stone-400'
                  }`}
                />
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
