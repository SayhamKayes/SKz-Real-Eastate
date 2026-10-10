import React from 'react';
import Navbar from '../components/Navbar/Navbar.jsx';
import Footer from '../components/Footer/Footer.jsx';
import ProjectModal from '../components/Projects/ProjectModal.jsx';
import ScheduleViewingForm from '../components/Inquiry/ScheduleViewingForm.jsx';
import { useRealEstate } from '../Context/RealEstateContext.jsx';
import { CheckCircle2 } from 'lucide-react';

export default function MainLayout({ children }) {
  const {
    selectedProject,
    closeProjectDetail,
    inquiryModalOpen,
    inquiryPreselect,
    closeInquiry,
    toastMessage,
  } = useRealEstate();

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBF9] text-stone-900 selection:bg-[#B48C57] selection:text-white">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Page Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Project Details Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={closeProjectDetail}
        />
      )}

      {/* Global VIP Inquiry & Viewing Modal */}
      <ScheduleViewingForm
        isOpen={inquiryModalOpen}
        onClose={closeInquiry}
        initialProject={inquiryPreselect}
      />

      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-5 py-3.5 rounded-xl shadow-2xl border border-stone-700/60 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-5 h-5 text-[#B48C57] shrink-0" />
          <span className="text-xs md:text-sm font-medium">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
