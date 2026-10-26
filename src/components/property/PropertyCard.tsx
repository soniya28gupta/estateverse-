import React, { useState } from 'react';
import { Heart, Box, Bed, Bath, Move, ArrowUpRight, Check } from 'lucide-react';
import { Property } from '../../types/property';
import { formatINR } from '../../utils/formatters';

interface PropertyCardProps {
  property: Property;
  isFavorite: boolean;
  onToggleFavorite: (propertyId: string) => void;
  onViewDetails: (property: Property) => void;
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
  isComparing = false,
  onToggleCompare,
  canCompare = true,
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <article className="property-card group" aria-label={property.title}>
      {/* Image */}
      <div className="property-card-image">
        <img
          src={imgError ? FALLBACK_IMAGE : (property.images[0] || FALLBACK_IMAGE)}
          alt={property.title}
          onError={() => setImgError(true)}
          loading="lazy"
        />

        {/* Gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent pointer-events-none" aria-hidden="true" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10">
          <span className="px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-white/95 backdrop-blur-sm text-[#17191C] border border-white/60 shadow-sm">
            {property.propertyType}
          </span>
          {property.has3DTour && (
            <span className="px-2 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 bg-white/95 backdrop-blur-sm text-[#B89558] border border-[#E9DCBC] shadow-sm">
              <Box className="w-3 h-3" aria-hidden="true" />
              3D Tour
            </span>
          )}
        </div>

        {/* Favorite button */}
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(property.id); }}
          className={`absolute top-3 right-3 z-10 p-2.5 rounded-xl backdrop-blur-sm transition-all duration-200 border ${
            isFavorite
              ? 'bg-rose-500 text-white border-rose-400 shadow-lg shadow-rose-500/30 scale-105'
              : 'bg-white/90 text-[#6B7280] hover:text-rose-500 hover:bg-white border-white/70'
          }`}
          aria-label={isFavorite ? 'Remove from saved properties' : 'Save property'}
          aria-pressed={isFavorite}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} aria-hidden="true" />
        </button>

        {/* Price overlay */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className="text-[9px] font-bold text-white/80 uppercase tracking-widest block">
            {property.listingStatus}
          </span>
          <span className="font-serif text-xl font-bold text-white tracking-tight drop-shadow-md">
            {formatINR(property.price)}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex-1">
          <h3 className="font-serif text-base font-bold text-[#17191C] group-hover:text-[#B89558] transition-colors line-clamp-1 mb-0.5">
            {property.title}
          </h3>
          <p className="text-xs text-[#9CA3AF] font-medium mb-2">
            {property.locality}, {property.city}
          </p>
          <p className="text-xs text-[#6B7280] line-clamp-2 leading-relaxed mb-4">
            {property.tagline}
          </p>

          {/* Specs row */}
          <div className="grid grid-cols-3 gap-1 py-3 border-y border-[#E7E9ED] text-center mb-4">
            <div className="flex flex-col items-center gap-0.5">
              <span className="flex items-center gap-1 text-xs font-semibold text-[#17191C]">
                <Bed className="w-3.5 h-3.5 text-[#B89558]" aria-hidden="true" />
                {property.bedrooms}
              </span>
              <span className="text-[10px] text-[#9CA3AF]">Beds</span>
            </div>
            <div className="flex flex-col items-center gap-0.5 border-x border-[#E7E9ED]">
              <span className="flex items-center gap-1 text-xs font-semibold text-[#17191C]">
                <Bath className="w-3.5 h-3.5 text-[#B89558]" aria-hidden="true" />
                {property.bathrooms}
              </span>
              <span className="text-[10px] text-[#9CA3AF]">Baths</span>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <span className="flex items-center gap-1 text-xs font-semibold text-[#17191C]">
                <Move className="w-3.5 h-3.5 text-[#B89558]" aria-hidden="true" />
                {property.areaSqft.toLocaleString()}
              </span>
              <span className="text-[10px] text-[#9CA3AF]">sq. ft.</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {onToggleCompare && (
            <button
              type="button"
              disabled={!isComparing && !canCompare}
              onClick={() => onToggleCompare(property)}
              className={`btn btn-sm shrink-0 ${
                isComparing
                  ? 'bg-[#FAF6EE] border-[#B89558] text-[#B89558]'
                  : 'btn-outline text-[#6B7280]'
              } ${!isComparing && !canCompare ? 'opacity-40 cursor-not-allowed' : ''}`}
              aria-pressed={isComparing}
              title={isComparing ? 'Remove from comparison' : 'Add to comparison (max 3)'}
            >
              {isComparing && <Check className="w-3 h-3" aria-hidden="true" />}
              {isComparing ? 'Added' : 'Compare'}
            </button>
          )}
          <button
            type="button"
            onClick={() => onViewDetails(property)}
            className="btn btn-primary btn-sm flex-1"
            aria-label={`View details for ${property.title}`}
          >
            <span>View Details</span>
            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
};
