import { PROJECTS_DATA, COMPANY_INFO } from './propertyData.js';

const BACKEND_API_BASE = '/api';

export const apiService = {
  // Fetch projects list with filters
  async getProjects({ category = 'all', status = 'all', location = '' } = {}) {
    try {
      const params = new URLSearchParams();
      if (category !== 'all') params.append('category', category);
      if (status !== 'all') params.append('status', status);
      if (location) params.append('location', location);

      const response = await fetch(`${BACKEND_API_BASE}/projects/?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) return data;
        if (data.results && Array.isArray(data.results)) return data.results;
      }
    } catch {
      // Fallback to rich local dataset
    }

    // Filter in-memory
    let list = [...PROJECTS_DATA];
    if (category && category !== 'all') {
      list = list.filter(p => p.category === category);
    }
    if (status && status !== 'all') {
      list = list.filter(p => p.status === status);
    }
    if (location && location.trim()) {
      const q = location.toLowerCase();
      list = list.filter(p => p.location.toLowerCase().includes(q) || p.address.toLowerCase().includes(q));
    }
    return list;
  },

  // Get project by slug
  async getProjectBySlug(slug) {
    try {
      const response = await fetch(`${BACKEND_API_BASE}/projects/${slug}/`);
      if (response.ok) {
        return await response.json();
      }
    } catch {
      // Fallback
    }
    return PROJECTS_DATA.find(p => p.slug === slug) || null;
  },

  // Submit VIP Viewing or Brochure Inquiry
  async submitInquiry(inquiryData) {
    try {
      const response = await fetch(`${BACKEND_API_BASE}/inquiries/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiryData),
      });
      if (response.ok) {
        return await response.json();
      }
    } catch {
      // Fallback success for client preview
    }

    // Store in localStorage for persistence
    const existing = JSON.parse(localStorage.getItem('navana_inquiries') || '[]');
    const newRecord = {
      id: Date.now(),
      ...inquiryData,
      status: 'new',
      created_at: new Date().toISOString(),
    };
    existing.push(newRecord);
    localStorage.setItem('navana_inquiries', JSON.stringify(existing));
    return newRecord;
  },

  // Calculate Land Feasibility for Landowner Joint Venture
  async calculateFeasibility({ katha = 10, roadWidth = 40, location = 'Gulshan' }) {
    try {
      const response = await fetch(`${BACKEND_API_BASE}/feasibility-calculator/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ katha, road_width: roadWidth, location }),
      });
      if (response.ok) {
        return await response.json();
      }
    } catch {
      // Fallback calculation using standard RAJUK FAR calculation
    }

    const baseFar = roadWidth < 30 ? 3.5 : (roadWidth < 60 ? 4.25 : 5.0);
    const potentialBuiltUp = Math.round(katha * 720 * baseFar);
    const estimatedUnits = Math.max(6, Math.round(potentialBuiltUp / 3400));
    const estimatedFloors = Math.min(24, Math.round(potentialBuiltUp / (katha * 720 * 0.55)));

    return {
      katha,
      roadWidth,
      location,
      estimatedFar: baseFar,
      totalPotentialSqft: potentialBuiltUp,
      estimatedUnits,
      estimatedFloors,
      handoverTimelineMonths: katha <= 15 ? 36 : 48,
      partnershipStructure: '50/50 Joint Venture & Guaranteed Handover Escrow',
      status: 'success',
    };
  },

  // Submit Landowner Proposal
  async submitLandProposal(proposalData) {
    try {
      const response = await fetch(`${BACKEND_API_BASE}/landowner-proposals/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(proposalData),
      });
      if (response.ok) {
        return await response.json();
      }
    } catch {
      // Fallback
    }

    const existing = JSON.parse(localStorage.getItem('navana_land_proposals') || '[]');
    const newRecord = {
      id: Date.now(),
      ...proposalData,
      created_at: new Date().toISOString(),
    };
    existing.push(newRecord);
    localStorage.setItem('navana_land_proposals', JSON.stringify(existing));
    return newRecord;
  },
};
