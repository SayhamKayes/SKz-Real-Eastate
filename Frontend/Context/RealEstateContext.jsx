import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/apiService.js';
import { PROJECTS_DATA, COMPANY_INFO } from '../services/propertyData.js';

const RealEstateContext = createContext();

export function RealEstateProvider({ children }) {
  const [currentRoute, setCurrentRoute] = useState('home');
  const [projects, setProjects] = useState(PROJECTS_DATA);
  const [selectedProject, setSelectedProject] = useState(null);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquiryPreselect, setInquiryPreselect] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    status: 'all',
    location: '',
  });
  const [toastMessage, setToastMessage] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Monitor scroll for nav styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const openInquiry = (projectName = '') => {
    setInquiryPreselect(projectName);
    setInquiryModalOpen(true);
  };

  const closeInquiry = () => {
    setInquiryModalOpen(false);
    setInquiryPreselect('');
  };

  const openProjectDetail = (project) => {
    setSelectedProject(project);
  };

  const closeProjectDetail = () => {
    setSelectedProject(null);
  };

  const navigateTo = (route, sectionId = null) => {
    setCurrentRoute(route);
    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <RealEstateContext.Provider
      value={{
        companyInfo: COMPANY_INFO,
        currentRoute,
        setCurrentRoute,
        navigateTo,
        projects,
        setProjects,
        selectedProject,
        openProjectDetail,
        closeProjectDetail,
        inquiryModalOpen,
        inquiryPreselect,
        openInquiry,
        closeInquiry,
        filters,
        setFilters,
        toastMessage,
        showToast,
        isScrolled,
      }}
    >
      {children}
    </RealEstateContext.Provider>
  );
}

export function useRealEstate() {
  const context = useContext(RealEstateContext);
  if (!context) {
    throw new Error('useRealEstate must be used within RealEstateProvider');
  }
  return context;
}
