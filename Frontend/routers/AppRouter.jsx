import React from 'react';
import { useRealEstate } from '../Context/RealEstateContext.jsx';
import HomePage from '../pages/HomePage.jsx';
import ProjectsPage from '../pages/ProjectsPage.jsx';
import AboutPage from '../pages/AboutPage.jsx';
import ContactPage from '../pages/ContactPage.jsx';

export default function AppRouter() {
  const { currentRoute } = useRealEstate();

  switch (currentRoute) {
    case 'portfolio':
    case 'projects':
      return <ProjectsPage />;
    case 'about':
      return <AboutPage />;
    case 'contact':
      return <ContactPage />;
    case 'home':
    default:
      return <HomePage />;
  }
}
