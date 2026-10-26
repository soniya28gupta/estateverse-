import React from 'react';
import { Box, Compass, ShieldCheck, MapPin, Sparkles, Layers, Sliders, CheckCircle2 } from 'lucide-react';

export const EstateVerseExperience: React.FC = () => {
  const experiences = [
    {
      id: '3d-tours',
      icon: Box,
      title: '3D Architectural Tours',
      tagline: 'Orbit, walk, and inspect every angle before physical travel',
      description:
        'Step directly into realistic 3D scenes. Test solar angles across floor-to-ceiling glass, evaluate double-height ceiling volumes, and inspect internal Japanese courtyards from your device.',
      highlights: ['Interactive Room Hotspots', 'Sunlight & Shadow Angle Simulation', 'Realistic Contact Shadows & Materials']
    },
    {
      id: 'spatial-precision',
      icon: Layers,
      title: 'Detailed Property Information',
      tagline: 'Verified room dimensions, construction specs & structural integrity',
      description:
        'Every listed property undergoes spatial verification. We document exact room dimensions, acoustic glass specifications, Italian marble finishes, and mechanical HVAC provisions.',
      highlights: ['Room-by-Room Measurements', 'Acoustic & Thermal Ratings', 'Structural & Age Verification']
    },
    {
      id: 'transparent-finance',
      icon: ShieldCheck,
      title: 'Intelligent Discovery & Pricing',
      tagline: 'Genuine valuation, transparent EMIs, and zero hidden brokerage fees',
      description:
        'Calculate down payment requirements, loan tenures, monthly EMIs, and local registration fees upfront. Compare genuine historical appreciation curves over the past 5 years.',
      highlights: ['Real-Time EMI Calculator', '5-Year Price History Graphs', 'Transparent Stamp Duty Estimates']
    },
    {
      id: 'neighborhood-context',
      icon: MapPin,
      title: 'Neighborhood Exploration',
      tagline: 'Direct-distance mapping to metro stations, top schools & hospitals',
      description:
        'Understand daily life before making a commitment. We map precise distances to metro corridors, airport arterial links, international schools, and civic green lungs.',
      highlights: ['Commute Time Estimates', 'Top School & Hospital Proximity', 'Infrastructure Development Pipeline']
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF6EE] border border-[#E9DCBC] text-[#B89558] text-xs font-bold tracking-wider uppercase mb-3 shadow-soft-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#B89558]" />
          THE ESTATEVERSE STANDARD
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#17191C] tracking-tight">
          A New Dimension of Real Estate Exploration
        </h2>
        <p className="text-[#6B7280] text-sm sm:text-base mt-3 leading-relaxed font-normal">
          Designed to replace outdated 2D photographs and uncertain site visits with verified spatial truth, deep architectural data, and financial transparency.
        </p>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
        {experiences.map((exp, index) => {
          const Icon = exp.icon;
          return (
            <div
              key={exp.id}
              className="p-7 rounded-3xl bg-white border border-[#E7E9ED] shadow-soft hover:shadow-soft-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#FAF6EE] border border-[#E9DCBC] flex items-center justify-center text-[#B89558] mb-6 shadow-soft-sm">
                  <Icon className="w-6 h-6 stroke-[1.8]" />
                </div>

                <span className="text-[11px] font-bold text-[#B89558] uppercase tracking-wider block mb-1">
                  0{index + 1} • {exp.tagline}
                </span>

                <h3 className="font-serif text-xl font-bold text-[#17191C] mb-3">
                  {exp.title}
                </h3>

                <p className="text-xs text-[#6B7280] leading-relaxed mb-6 font-normal">
                  {exp.description}
                </p>
              </div>

              {/* Bullet highlights */}
              <div className="pt-4 border-t border-[#E7E9ED] space-y-2">
                {exp.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-[11px] font-medium text-[#17191C]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B89558] shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
