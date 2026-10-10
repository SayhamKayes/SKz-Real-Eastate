import React from 'react';
import AboutHeritage from '../components/About/AboutHeritage.jsx';
import ArchitecturePillars from '../components/About/ArchitecturePillars.jsx';
import ClientReviews from '../components/Testimonials/ClientReviews.jsx';

export default function AboutPage() {
  return (
    <div className="pt-24">
      <AboutHeritage />
      <ArchitecturePillars />
      <ClientReviews />
    </div>
  );
}
