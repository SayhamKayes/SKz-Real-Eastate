import React from 'react';
import { useRealEstate } from '../../Context/RealEstateContext.jsx';

export default function WhatsAppWidget({ phoneNumber = '8801713040000', customMessage }) {
  const { companyInfo } = useRealEstate();

  // Clean phone number: remove non-digits
  const rawNumber = companyInfo?.directSales || companyInfo?.hotline || phoneNumber;
  const sanitizedNumber = rawNumber.replace(/[^0-9]/g, '');

  const defaultMsg = customMessage || `Hello ${companyInfo?.shortName || 'Navana Real Estate'}, I would like to inquire about your luxury residential and commercial projects.`;
  const whatsappUrl = `https://wa.me/${sanitizedNumber}?text=${encodeURIComponent(defaultMsg)}`;

  return (
    <div className="fixed right-6 bottom-22 z-40">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        title="Chat with Senior Advisor on WhatsApp"
        className="group relative flex items-center justify-center w-13 h-13 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
      >
        {/* Pulsing presence beacon (online status) */}
        <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white" />
        </span>

        {/* Official WhatsApp Vector Logo */}
        <svg
          viewBox="0 0 24 24"
          width="28"
          height="28"
          fill="currentColor"
          className="transition-transform duration-300 group-hover:scale-110"
        >
          <path d="M12.031 2C6.516 2 2.031 6.484 2.031 12C2.031 13.844 2.531 15.609 3.438 17.156L2 22.391L7.422 20.984C8.891 21.781 10.422 22.188 12.031 22.188C17.547 22.188 22.031 17.703 22.031 12.188C22.031 6.672 17.547 2 12.031 2ZM12.031 20.453C10.594 20.453 9.219 20.063 8.016 19.344L7.672 19.141L4.453 19.984L5.313 16.844L5.094 16.484C4.313 15.234 3.891 13.781 3.891 12.234C3.891 7.734 7.547 4.078 12.047 4.078C16.547 4.078 20.203 7.734 20.203 12.234C20.203 16.734 16.531 20.453 12.031 20.453ZM16.547 14.516C16.313 14.391 15.141 13.813 14.922 13.734C14.703 13.656 14.547 13.609 14.391 13.844C14.234 14.078 13.766 14.625 13.625 14.781C13.484 14.938 13.344 14.969 13.109 14.844C12.875 14.719 12.125 14.469 11.234 13.672C10.531 13.047 10.063 12.281 9.922 12.047C9.781 11.813 9.906 11.688 10.031 11.563C10.141 11.453 10.281 11.281 10.406 11.141C10.531 11 10.578 10.891 10.656 10.734C10.734 10.578 10.703 10.438 10.641 10.313C10.578 10.188 10.109 9.031 9.922 8.563C9.734 8.109 9.547 8.172 9.391 8.172C9.25 8.172 9.094 8.156 8.938 8.156C8.781 8.156 8.531 8.219 8.328 8.438C8.125 8.656 7.547 9.203 7.547 10.328C7.547 11.453 8.359 12.531 8.484 12.688C8.609 12.844 10.094 15.141 12.359 16.125C12.891 16.359 13.313 16.5 13.641 16.609C14.188 16.781 14.672 16.75 15.063 16.688C15.5 16.625 16.391 16.141 16.578 15.625C16.766 15.109 16.766 14.656 16.703 14.547C16.656 14.438 16.484 14.375 16.25 14.25L16.547 14.516Z" />
        </svg>

        {/* Hover Tooltip Card */}
        <span className="absolute right-full mr-3.5 px-3 py-1.5 rounded-lg bg-stone-900 text-white text-xs font-medium tracking-wide whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-xl border border-stone-700/80 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#25D366]" />
          <span>Chat on WhatsApp</span>
        </span>
      </a>
    </div>
  );
}
