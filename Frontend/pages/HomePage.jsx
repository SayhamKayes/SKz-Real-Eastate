import React from 'react';
import HeroSection from '../components/Hero/HeroSection.jsx';
import LatestLaunchesSlider from '../components/Projects/LatestLaunchesSlider.jsx';
import AboutHeritage from '../components/About/AboutHeritage.jsx';
import ArchitecturePillars from '../components/About/ArchitecturePillars.jsx';
import VirtualFloorPlan from '../components/Features/VirtualFloorPlan.jsx';
import LandownerPartnership from '../components/Landowners/LandownerPartnership.jsx';
import ClientReviews from '../components/Testimonials/ClientReviews.jsx';
import { useRealEstate } from '../Context/RealEstateContext.jsx';

export default function HomePage() {
  const { navigateTo } = useRealEstate();

  return (
    <div className="w-full">
      {/* 1. Hero Section with Scroll Motion Blueprint Transformation */}
      <HeroSection />

      {/* 2. Latest Launches Carousel Slider (Matching navanarealestate.com) */}
      <LatestLaunchesSlider />

      {/* 3. The Navana Heritage & Pedigree */}
      <AboutHeritage />

      {/* 4. Engineering Pillars & Seismic Standards */}
      <ArchitecturePillars />

      {/* 5. Interactive CAD Floorplan Explorer */}
      <VirtualFloorPlan />

      {/* 6. Landowner Joint Venture Calculator & Desk */}
      <LandownerPartnership />

      {/* 7. Homeowner & Landowner Testimonials */}
      <ClientReviews />
    </div>
  );
}
