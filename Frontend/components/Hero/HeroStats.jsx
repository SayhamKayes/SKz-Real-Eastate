import React from 'react';
import { useRealEstate } from '../../Context/RealEstateContext.jsx';
import { Award, ShieldCheck, Clock, MapPin } from 'lucide-react';

export default function HeroStats() {
  const { companyInfo } = useRealEstate();

  const stats = [
    {
      value: `${companyInfo.experienceYears}+`,
      unit: 'Years',
      label: 'Engineering Pedigree',
      sub: 'Founded in 1996 in Dhaka',
      icon: Award,
    },
    {
      value: `${companyInfo.completedProjects}`,
      unit: 'Landmarks',
      label: 'Delivered Across Bangladesh',
      sub: 'Gulshan, Banani, Dhanmondi, Ctg',
      icon: MapPin,
    },
    {
      value: companyInfo.totalDeliveredSqft,
      unit: 'Area',
      label: 'Delivered Living Space',
      sub: 'Bespoke residential & commercial',
      icon: ShieldCheck,
    },
    {
      value: '100%',
      unit: 'On-Time',
      label: 'Handover Track Record',
      sub: 'Unblemished delivery punctuality',
      icon: Clock,
    },
  ];

  return (
    <div className="w-full border-y border-stone-200/80 bg-white/70 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-stone-200/70">
          {stats.map((stat, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col space-y-1.5 ${idx !== 0 ? 'pt-6 md:pt-0 md:pl-8' : ''}`}
            >
              <div className="flex items-baseline gap-1.5 font-serif text-3xl md:text-4xl font-bold text-stone-900 tracking-tight">
                <span className="tabular-nums">{stat.value}</span>
                <span className="text-xs font-sans font-medium text-[#B48C57] tracking-wider uppercase">
                  {stat.unit}
                </span>
              </div>
              <div className="text-xs md:text-sm font-semibold text-stone-800">
                {stat.label}
              </div>
              <div className="text-xs text-stone-500">
                {stat.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
