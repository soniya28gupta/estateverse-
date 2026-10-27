import React from 'react';
import { Box, Sparkles, ArrowRight, Eye, Layers, Compass, Play } from 'lucide-react';
import { SAMPLE_PROPERTIES } from '../../data/properties';
import { Property } from '../../types/property';
import { formatINR } from '../../utils/formatters';

interface VirtualPropertyToursProps {
  onOpen3DWorld: (property: Property) => void;
  onViewDetails: (property: Property) => void;
}

export const VirtualPropertyTours: React.FC<VirtualPropertyToursProps> = ({
  onOpen3DWorld,
  onViewDetails,
}) => {
  // Filter properties with verified 3D tours
  const tourProperties = SAMPLE_PROPERTIES.filter((p) => p.has3DTour);

  return (
    <section id="virtual-tours" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF6EE] border border-[#E9DCBC] text-[#967541] text-xs font-bold tracking-wider uppercase mb-3 shadow-soft-sm">
            <Box className="w-3.5 h-3.5 text-[#B79A68]" />
            SPATIAL 3D ARCHIVES
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#17191C] tracking-tight">
            Virtual Property Tours
          </h2>
          <p className="text-[#777777] text-sm sm:text-base mt-3 max-w-xl font-normal leading-relaxed">
            Directly enter interactive spatial models. Explore room dimensions, interior finishes, and sun exposure from anywhere in the world.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-[#B79A68] bg-[#FAF6EE] px-4 py-2 rounded-2xl border border-[#E9DCBC]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{tourProperties.length} Verified Real-Time 3D Tours Available</span>
        </div>
      </div>

      {/* Grid of 3D Tour Showcase Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {tourProperties.map((prop) => (
          <div
            key={prop.id}
            className="group rounded-3xl bg-white border border-[#E7E9ED] overflow-hidden shadow-soft hover:shadow-soft-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
          >
            {/* Top Frame with 3D Tour Badge */}
            <div className="relative aspect-[16/10] overflow-hidden bg-[#0c0d10]">
              <img
                src={prop.images[0]}
                alt={prop.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Top Tags */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-[#FAF6EE] border border-white/20">
                  {prop.propertyType}
                </span>
                <span className="px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5 bg-[#B79A68] text-white shadow-md">
                  <Box className="w-3 h-3" />
                  3D Spatial Ready
                </span>
              </div>

              {/* Center Play Button for 3D */}
              <button
                type="button"
                onClick={() => onOpen3DWorld(prop)}
                className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-white/90 backdrop-blur-md text-[#17191C] group-hover:bg-[#B79A68] group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-2xl scale-95 group-hover:scale-110"
                aria-label={`Launch 3D tour for ${prop.title}`}
              >
                <Box className="w-6 h-6 stroke-[1.8]" />
              </button>

              {/* Bottom Price & Info */}
              <div className="absolute bottom-4 left-4 right-4 z-10 flex items-baseline justify-between text-white">
                <div>
                  <span className="text-[10px] text-white/70 uppercase tracking-widest block font-medium">
                    Guide Price
                  </span>
                  <span className="font-serif text-xl font-bold">{formatINR(prop.price)}</span>
                </div>
                <span className="text-xs text-white/80 font-medium">
                  {prop.bedrooms} Beds · {prop.areaSqft.toLocaleString()} sq. ft.
                </span>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#17191C] group-hover:text-[#B79A68] transition-colors line-clamp-1">
                  {prop.title}
                </h3>
                <p className="text-xs text-[#9CA3AF] font-medium mt-1 mb-3">
                  {prop.locality}, {prop.city}
                </p>
                <p className="text-xs text-[#777777] line-clamp-2 leading-relaxed font-normal">
                  {prop.tagline}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-[#E7E9ED] flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onOpen3DWorld(prop)}
                  className="btn btn-primary btn-sm flex-1 gap-1.5 shadow-sm hover:shadow-md"
                >
                  <Box className="w-3.5 h-3.5 text-[#B79A68]" />
                  <span>Launch 3D Tour</span>
                </button>
                <button
                  type="button"
                  onClick={() => onViewDetails(prop)}
                  className="btn btn-outline btn-sm px-3 text-xs"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
