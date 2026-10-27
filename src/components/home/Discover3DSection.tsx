import React from 'react';
import { Box, Sparkles, ArrowRight, ShieldCheck, Layers, Sun } from 'lucide-react';
import { VillaScene } from '../../three/VillaScene';
import { SAMPLE_PROPERTIES } from '../../data/properties';
import { formatINR } from '../../utils/formatters';
import { Property } from '../../types/property';

interface Discover3DSectionProps {
  onEnter3DWorld: () => void;
  onSelectProperty: (property: Property) => void;
}

export const Discover3DSection: React.FC<Discover3DSectionProps> = ({
  onEnter3DWorld,
  onSelectProperty,
}) => {
  const flagship = SAMPLE_PROPERTIES[0];

  return (
    <section id="experience-3d" className="py-20 lg:py-24 bg-[#F8F7F4] border-y border-[#E7E9ED] relative overflow-hidden">
      <div id="discover-3d" className="absolute -top-24 left-0" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 lg:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E9DCBC] text-[#967541] text-xs font-bold tracking-wider uppercase mb-3 shadow-soft-sm">
              <Box className="w-3.5 h-3.5 text-[#B79A68]" />
              IMMERSIVE 3D SHOWROOM
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#17191C] tracking-tight">
              Explore Architecture in Real-Time 3D
            </h2>
            <p className="text-[#777777] text-sm sm:text-base mt-2.5 max-w-2xl font-normal leading-relaxed">
              Step into high-fidelity architectural models. Rotate perspectives, inspect pool dimensions, and test spatial volumes before physical site visits.
            </p>
          </div>

          <button
            type="button"
            onClick={onEnter3DWorld}
            className="self-start md:self-auto btn btn-gold btn-lg shadow-gold-glow flex items-center gap-2"
          >
            <Box className="w-4 h-4" />
            <span>Enter Fullscreen 3D World</span>
          </button>
        </div>

        {/* ── RESPONSIVE 3D VIEWER + PROPERTY PANEL GRID (68% / 32% Desktop) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left Column: 3D Property Viewer (68% width on desktop, full height) */}
          <div className="lg:col-span-8 h-[520px] sm:h-[600px] lg:h-[640px] w-full rounded-3xl overflow-hidden shadow-soft-xl border border-[#E7E9ED] bg-[#dbe6f0] relative">
            <VillaScene property={flagship} showPropertyOverlay={false} />
          </div>

          {/* Right Column: Refined Property Information Panel (32% width on desktop) */}
          <div className="lg:col-span-4 h-full flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-white border border-[#E7E9ED] shadow-soft-xl">
            <div>
              {/* Top Tag & Status */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#B79A68] block">
                  FEATURED 3D VILLA
                </span>
                <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                  Interactive 3D Ready
                </span>
              </div>

              {/* Property Name & Location */}
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#17191C] leading-snug">
                {flagship.title}
              </h3>
              <p className="text-xs text-[#777777] mt-1 font-medium">
                {flagship.locality}, {flagship.city}
              </p>

              {/* Price & Primary Specs */}
              <div className="my-5 py-4 border-y border-[#E7E9ED] flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase text-[#9CA3AF] tracking-wider block">
                    Guide Price
                  </span>
                  <span className="font-serif text-2xl font-bold text-[#17191C]">
                    {formatINR(flagship.price)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold uppercase text-[#9CA3AF] tracking-wider block">
                    Living Area
                  </span>
                  <span className="text-sm font-bold text-[#17191C]">
                    {flagship.areaSqft.toLocaleString()} sq. ft.
                  </span>
                </div>
              </div>

              {/* Four Concise Architectural & Interactive Features */}
              <div className="space-y-3 mb-6">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#17191C] block mb-2">
                  Architectural Highlights
                </span>
                {[
                  {
                    title: '1:1 True Spatial Blueprints',
                    desc: 'Accurately modeled floor plans matched to certified civil CAD elevations.'
                  },
                  {
                    title: 'Dynamic Solar Orientation',
                    desc: 'Observe daylight exposure across the pool deck, living pavilion, and bedrooms.'
                  },
                  {
                    title: 'Material Texture Shaders',
                    desc: 'Physical water refraction, smoked oak grains, and textured travertine stone.'
                  },
                  {
                    title: 'Interactive Hotspot Inspection',
                    desc: 'Select in-scene markers to examine dimensions and room finish schedules.'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-lg bg-[#FAF6EE] text-[#B79A68] border border-[#E9DCBC] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                      0{idx + 1}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-[#17191C] leading-tight">{item.title}</h4>
                      <p className="text-[11px] text-[#777777] leading-relaxed mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Action CTAs */}
            <div className="pt-4 border-t border-[#E7E9ED] flex flex-col gap-2.5">
              <button
                type="button"
                onClick={onEnter3DWorld}
                className="w-full btn btn-primary justify-center shadow-soft hover:shadow-soft-xl"
              >
                <span>Enter Fullscreen 3D World</span>
                <ArrowRight className="w-4 h-4 text-[#B79A68]" />
              </button>

              <button
                type="button"
                onClick={() => onSelectProperty(flagship)}
                className="w-full btn btn-outline justify-center text-xs"
              >
                View Full Specifications
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
