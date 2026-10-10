import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRealEstate } from '../../Context/RealEstateContext.jsx';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

export const LATEST_LAUNCHES = [
  {
    id: "belamour-by-navana",
    title: "BELAMOUR BY NAVANA",
    category: "Residential",
    location: "Banani",
    address: "Road 11, Block F, Banani, Dhaka",
    image: "/images/projects/belamour.jpg",
    status: "Under Construction",
    levels: "16 Levels",
    description: "Cascading cantilever sky terraces and bespoke vertical biophilic gardens overlooking Banani.",
    slug: "belamour-by-navana",
  },
  {
    id: "lunaris-by-navana",
    title: "LUNARIS BY NAVANA",
    category: "Residential",
    location: "Uttara",
    address: "Sector 4, Uttara Model Town, Dhaka",
    image: "/images/projects/lunaris.jpg",
    status: "Under Construction",
    levels: "14 Levels",
    description: "Symmetrical minimalist elegance with expansive panoramic glass facade and grand arrival concourse.",
    slug: "lunaris-by-navana",
  },
  {
    id: "eminence-by-navana",
    title: "EMINENCE BY NAVANA",
    category: "Residential",
    location: "Niketan",
    address: "Block E, Niketan, Gulshan, Dhaka",
    image: "/images/projects/eminence.jpg",
    status: "Ready for Handover",
    levels: "15 Levels",
    description: "Bespoke dusk illuminated luxury suites featuring floor-to-ceiling Saint-Gobain acoustic glazing.",
    slug: "eminence-by-navana",
  },
  {
    id: "n4-by-navana",
    title: "N4 BY NAVANA",
    category: "Residential",
    location: "Jolshiri",
    address: "Sector 16, Jolshiri Smart City, Dhaka",
    image: "/images/projects/n4.jpg",
    status: "Upcoming Launch",
    levels: "18 Levels",
    description: "Next-generation avant-garde geometric architecture with rooftop sky oasis in Jolshiri Smart City.",
    slug: "n4-by-navana",
  },
  {
    id: "navana-platinum-square",
    title: "PLATINUM SQUARE BY NAVANA",
    category: "Residential",
    location: "Gulshan 2",
    address: "Road 71, Gulshan 2 (Diplomatic Zone Enclave)",
    image: "/images/projects/platinum.jpg",
    status: "Under Construction",
    levels: "20 Levels",
    description: "The epitome of ultra-luxury penthouse living with private cantilevered sky pool in Gulshan 2.",
    slug: "navana-platinum-square",
  },
];

export default function LatestLaunchesSlider() {
  const { openProjectDetail } = useRealEstate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const dragStartXRef = useRef(0);
  const sliderRef = useRef(null);
  const autoplayTimerRef = useRef(null);

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

  const maxIndex = Math.max(0, LATEST_LAUNCHES.length - visibleCount);

  // Next Slide
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  // Prev Slide
  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Autoplay loop
  useEffect(() => {
    if (isPaused || isDragging) return;
    autoplayTimerRef.current = setInterval(() => {
      nextSlide();
    }, 4500);

    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [isPaused, isDragging, nextSlide]);

  // Drag and drop event handlers
  const handlePointerDown = (e) => {
    setIsDragging(true);
    dragStartXRef.current = e.clientX;
    setDragOffset(0);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const diff = e.clientX - dragStartXRef.current;
    setDragOffset(diff);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const threshold = 60; // minimum drag distance
    if (dragOffset < -threshold) {
      nextSlide();
    } else if (dragOffset > threshold) {
      prevSlide();
    }
    setDragOffset(0);
  };

  return (
    <section 
      id="latest-launches" 
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#F5F5F5] overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        if (isDragging) handlePointerUp();
      }}
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading: EXACT from Reference site */}
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
            className="overflow-hidden cursor-grab active:cursor-grabbing pb-4"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            <div 
              className="flex transition-transform ease-out will-change-transform"
              style={{
                transform: `translateX(calc(-${currentIndex * (100 / visibleCount)}% + ${dragOffset}px))`,
                transitionDuration: isDragging ? '0ms' : '600ms',
              }}
            >
              {LATEST_LAUNCHES.map((project) => (
                <div 
                  key={project.id}
                  className="px-3 sm:px-4 shrink-0 transition-opacity"
                  style={{ width: `${100 / visibleCount}%` }}
                >
                  <article 
                    onClick={() => {
                      if (Math.abs(dragOffset) < 5) {
                        openProjectDetail(project);
                      }
                    }}
                    className="group block cursor-pointer"
                  >
                    {/* Tall Portrait Media Container (aspect 3/4 or 4/5) */}
                    <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] overflow-hidden rounded-xs bg-stone-200">
                      
                      {/* Property Image with hover zoom */}
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
                        loading="lazy"
                        draggable={false}
                      />

                      {/* Subtle Ambient Vignette Overlay */}
                      <div className="absolute inset-0 bg-black/15 group-hover:bg-black/25 transition-colors duration-500" />

                      {/* Vertical Category Tag (Exact from navanarealestate.com reference) */}
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

          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="absolute -left-2 sm:-left-5 top-1/3 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/35 hover:bg-black/65 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg z-20 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next Slide"
            className="absolute -right-2 sm:-right-5 top-1/3 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/35 hover:bg-black/65 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg z-20 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

        </div>

        {/* Pagination Dots with Active Pill (Exact from navanarealestate.com reference) */}
        <div className="flex items-center justify-center gap-2 mt-8 sm:mt-12">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
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
    </section>
  );
}
