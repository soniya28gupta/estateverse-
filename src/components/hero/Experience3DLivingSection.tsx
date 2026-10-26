import React, { useState } from 'react';
import { Box, Sparkles, Layers, Compass, ArrowRight, ShieldCheck, Sun, Maximize2, RotateCcw } from 'lucide-react';
import { VillaScene } from '../../three/VillaScene';
import { SAMPLE_PROPERTIES } from '../../data/properties';
import { Property, PropertyHotspot } from '../../types/property';
import { formatINR } from '../../utils/formatters';

interface Experience3DLivingSectionProps {
  onSelectProperty: (property: Property) => void;
}

export const Experience3DLivingSection: React.FC<Experience3DLivingSectionProps> = ({
  onSelectProperty
}) => {
  const flagshipProperty = SAMPLE_PROPERTIES[0];
  const [selectedHotspot, setSelectedHotspot] = useState<PropertyHotspot | null>(
    flagshipProperty.hotspots ? flagshipProperty.hotspots[0] : null
  );

  return (
    <section id="experience-3d" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF6EE] border border-[#E9DCBC] text-[#B89558] text-xs font-bold tracking-wider uppercase mb-3 shadow-soft-sm">
            <Box className="w-3.5 h-3.5 text-[#B89558]" />
            EXPERIENCE 3D LIVING SHOWROOM
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#17191C] tracking-tight">
            Spatial Reality Before Physical Visits
          </h2>
          <p className="text-[#6B7280] text-sm sm:text-base mt-3 max-w-2xl font-normal leading-relaxed">
            Orbit the architectural volume, inspect ceiling heights, test daylight orientation, and tap glowing hotspots to explore tailored room specifications.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onSelectProperty(flagshipProperty)}
          className="self-start md:self-auto flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#17191C] hover:bg-[#B89558] text-white text-xs sm:text-sm font-semibold transition-all shadow-soft"
        >
          <span>Explore Complete Specifications</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Main 3D Showroom Viewport Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Large 3D Viewport (8 cols) */}
        <div className="lg:col-span-8 h-[520px] sm:h-[600px] w-full rounded-3xl overflow-hidden shadow-soft-xl border border-[#E7E9ED]">
          <VillaScene property={flagshipProperty} showPropertyOverlay={false} />
        </div>

        {/* Property Specs & Hotspot Navigator Panel (4 cols) */}
        <div className="lg:col-span-4 flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-white border border-[#E7E9ED] shadow-soft-xl">
          <div>
            {/* Property Title & Location */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-[#B89558] uppercase tracking-wider">
                Flagship Model
              </span>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                Interactive 3D Ready
              </span>
            </div>

            <h3 className="font-serif text-2xl font-bold text-[#17191C] leading-snug">
              {flagshipProperty.title}
            </h3>
            <p className="text-xs text-[#6B7280] mt-1 font-medium">
              {flagshipProperty.locality}, {flagshipProperty.city}
            </p>

            {/* Price & Summary */}
            <div className="my-5 py-4 border-y border-[#E7E9ED] flex items-baseline justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-[#6B7280] block">Guide Price</span>
                <span className="font-serif text-2xl font-bold text-[#17191C]">
                  {formatINR(flagshipProperty.price)}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold uppercase text-[#6B7280] block">Living Area</span>
                <span className="text-sm font-bold text-[#17191C]">
                  {flagshipProperty.areaSqft.toLocaleString()} sq. ft.
                </span>
              </div>
            </div>

            {/* Room Hotspot Selector */}
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#17191C] block mb-2.5">
                Key Architectural Hotspots
              </span>
              <div className="flex flex-col gap-2">
                {flagshipProperty.hotspots?.map((hotspot) => {
                  const isSelected = selectedHotspot?.id === hotspot.id;
                  return (
                    <button
                      key={hotspot.id}
                      type="button"
                      onClick={() => setSelectedHotspot(hotspot)}
                      className={`w-full text-left p-3 rounded-2xl border transition duration-200 flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#FAF6EE] border-[#B89558] text-[#17191C] shadow-soft-sm'
                          : 'bg-[#F7F8FA] border-[#E7E9ED] text-[#6B7280] hover:text-[#17191C] hover:bg-neutral-100'
                      }`}
                    >
                      <div>
                        <p className="text-xs font-bold leading-tight text-[#17191C]">{hotspot.name}</p>
                        <p className="text-[11px] text-[#6B7280] mt-0.5">{hotspot.roomType}</p>
                      </div>
                      <span className="text-[11px] font-semibold text-[#B89558]">
                        {hotspot.dimensions}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Hotspot Detailed Specs Box */}
            {selectedHotspot && (
              <div className="p-4 rounded-2xl bg-[#F7F8FA] border border-[#E7E9ED] text-xs">
                <span className="text-[10px] uppercase font-bold text-[#B89558] block mb-1">
                  Selected Hotspot Highlights
                </span>
                <p className="text-[#6B7280] leading-relaxed mb-2.5">{selectedHotspot.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedHotspot.features.map((feat, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-lg bg-white text-[#17191C] border border-[#E7E9ED] text-[10px] font-medium"
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Action */}
          <div className="pt-6 mt-6 border-t border-[#E7E9ED]">
            <button
              type="button"
              onClick={() => onSelectProperty(flagshipProperty)}
              className="w-full py-3 px-4 rounded-2xl bg-[#17191C] hover:bg-[#B89558] text-white font-semibold text-xs transition duration-200 text-center shadow-soft"
            >
              Request Private 3D Walkthrough
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
