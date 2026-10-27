import React, { useState } from 'react';
import { Heart, Box, Bed, Bath, Move, ArrowUpRight, Check, Sparkles } from 'lucide-react';
import { Property } from '../../types/property';
import { formatINR } from '../../utils/formatters';

interface PropertyCardProps {
  property: Property;
  isFavorite: boolean;
  onToggleFavorite: (propertyId: string) => void;
  onViewDetails: (property: Property) => void;
  onExplore3D?: (property: Property) => void;
  isComparing?: boolean;
  onToggleCompare?: (property: Property) => void;
  canCompare?: boolean;
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=75';

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  isFavorite,
  onToggleFavorite,
  onViewDetails,
  onExplore3D,
  isComparing = false,
  onToggleCompare,
  canCompare = true,
}) => {
  const [imgError, setImgError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const primaryImage = imgError ? FALLBACK_IMAGE : (property.images[0] || FALLBACK_IMAGE);
  const secondaryImage = property.images[1] || null;

  return (
    <article
      className="group relative flex flex-col rounded-3xl overflow-hidden bg-white border border-[#E7E9ED] shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5"
      aria-label={property.title}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-cursor="View Property"
    >
      {/* Image Frame with Dual-Image Smooth Hover Cross-Fade */}
      <div
        className="relative w-full aspect-[16/11] overflow-hidden bg-stone-100 cursor-pointer"
        onClick={() => onViewDetails(property)}
      >
        {/* Primary Image */}
        <img
          src={primaryImage}
          alt={property.title}
          onError={() => setImgError(true)}
          loading="lazy"
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 ${
            isHovered && secondaryImage ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {/* Secondary Architectural Angle Reveal */}
        {secondaryImage && (
          <img
            src={secondaryImage}
            alt={`${property.title} - Interior / Exterior View`}
            loading="lazy"
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Gradient scrim */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 flex flex-wrap items-center gap-1.5 z-10">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-white/95 backdrop-blur-md text-[#17191C] border border-white/60 shadow-xs">
            {property.propertyType}
          </span>
          {property.has3DTour && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (onExplore3D) onExplore3D(property);
                else onViewDetails(property);
              }}
              className="px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 bg-[#17191C]/90 hover:bg-[#B79A68] backdrop-blur-md text-white border border-white/20 transition-colors shadow-xs"
              title="Launch 3D Spatial Walkthrough"
              data-cursor="Enter 3D"
            >
              <Box className="w-3 h-3 text-[#B79A68]" aria-hidden="true" />
              <span>3D Tour</span>
            </button>
          )}
        </div>

        {/* Favorite button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(property.id);
          }}
          className={`absolute top-3.5 right-3.5 z-10 p-2.5 rounded-xl backdrop-blur-md transition-all duration-200 border ${
            isFavorite
              ? 'bg-rose-500 text-white border-rose-400 shadow-lg shadow-rose-500/30 scale-105'
              : 'bg-white/90 text-[#6B7280] hover:text-rose-500 hover:bg-white border-white/70 shadow-xs'
          }`}
          aria-label={isFavorite ? 'Remove from saved properties' : 'Save property'}
          aria-pressed={isFavorite}
          data-cursor="Save"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} aria-hidden="true" />
        </button>

        {/* Price overlay */}
        <div className="absolute bottom-3.5 left-3.5 z-10">
          <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest block drop-shadow-xs">
            {property.listingStatus}
          </span>
          <span className="font-serif text-2xl font-bold text-white tracking-tight drop-shadow-md">
            {formatINR(property.price)}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 bg-white">
        <div className="flex-1">
          <h3
            onClick={() => onViewDetails(property)}
            className="font-serif text-lg font-bold text-[#17191C] group-hover:text-[#B79A68] transition-colors line-clamp-1 mb-1 cursor-pointer"
          >
            {property.title}
          </h3>
          <p className="text-xs text-[#9CA3AF] font-medium mb-2.5">
            {property.locality}, {property.city}
          </p>
          <p className="text-xs text-[#6B7280] line-clamp-2 leading-relaxed mb-4 font-normal">
            {property.tagline}
          </p>

          {/* Specs row */}
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#E7E9ED] text-center mb-5 bg-[#FAF9F6] rounded-xl px-2">
            <div className="flex flex-col items-center gap-0.5">
              <span className="flex items-center gap-1 text-xs font-semibold text-[#17191C]">
                <Bed className="w-3.5 h-3.5 text-[#B79A68]" aria-hidden="true" />
                {property.bedrooms}
              </span>
              <span className="text-[10px] text-[#9CA3AF]">Beds</span>
            </div>
            <div className="flex flex-col items-center gap-0.5 border-x border-[#E7E9ED]">
              <span className="flex items-center gap-1 text-xs font-semibold text-[#17191C]">
                <Bath className="w-3.5 h-3.5 text-[#B79A68]" aria-hidden="true" />
                {property.bathrooms}
              </span>
              <span className="text-[10px] text-[#9CA3AF]">Baths</span>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <span className="flex items-center gap-1 text-xs font-semibold text-[#17191C]">
                <Move className="w-3.5 h-3.5 text-[#B79A68]" aria-hidden="true" />
                {property.areaSqft.toLocaleString()}
              </span>
              <span className="text-[10px] text-[#9CA3AF]">sq. ft.</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-1">
          {property.has3DTour && onExplore3D ? (
            <button
              type="button"
              onClick={() => onExplore3D(property)}
              className="h-10 px-3 rounded-xl bg-[#FAF6EE] hover:bg-[#EAE4D2] text-[#8C734B] text-xs font-semibold uppercase tracking-wider flex-1 flex items-center justify-center gap-1.5 border border-[#E9DCBC] transition-colors"
              aria-label={`Explore ${property.title} in 3D`}
              data-cursor="Enter 3D"
            >
              <Box className="w-3.5 h-3.5 text-[#B79A68]" />
              <span>Explore 3D</span>
            </button>
          ) : (
            onToggleCompare && (
              <button
                type="button"
                disabled={!isComparing && !canCompare}
                onClick={() => onToggleCompare(property)}
                className={`h-10 px-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all shrink-0 border ${
                  isComparing
                    ? 'bg-[#FAF6EE] border-[#B79A68] text-[#B79A68]'
                    : 'bg-white border-[#E7E9ED] text-[#6B7280] hover:text-[#171717] hover:border-[#171717]'
                } ${!isComparing && !canCompare ? 'opacity-40 cursor-not-allowed' : ''}`}
                aria-pressed={isComparing}
                title={isComparing ? 'Remove from comparison' : 'Add to comparison (max 3)'}
              >
                {isComparing && <Check className="w-3 h-3 inline mr-1" aria-hidden="true" />}
                {isComparing ? 'Added' : 'Compare'}
              </button>
            )
          )}

          <button
            type="button"
            onClick={() => onViewDetails(property)}
            className="h-10 px-4 rounded-xl bg-[#171717] hover:bg-[#B79A68] text-white text-xs font-semibold uppercase tracking-wider flex-1 flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            aria-label={`View details for ${property.title}`}
          >
            <span>View Details</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-white" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
};
