import React, { useState } from 'react';
import { Heart, Box, Bed, Bath, Move, ArrowUpRight, Check, Eye } from 'lucide-react';
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

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  isFavorite,
  onToggleFavorite,
  onViewDetails,
  isComparing = false,
  onToggleCompare,
  canCompare = true
}) => {
  const [imageError, setImageError] = useState(false);

  // Fallback architectural image
  const fallbackImage = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';

  return (
    <div className="group relative flex flex-col rounded-2xl bg-midnight-900/90 border border-stone-800/80 hover:border-gold-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-gold-400/10 overflow-hidden">
      {/* Property Visual / Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-midnight-950">
        <img
          src={imageError ? fallbackImage : (property.images[0] || fallbackImage)}
          alt={property.title}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-midnight-950/20 to-transparent opacity-80" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-midnight-950/80 backdrop-blur-md text-gold-300 border border-gold-400/30">
            {property.propertyType}
          </span>
          {property.has3DTour && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold flex items-center gap-1 bg-emerald-950/85 backdrop-blur-md text-emerald-300 border border-emerald-500/30">
              <Box className="w-3 h-3 text-emerald-400 animate-pulse" />
              3D Tour Available
            </span>
          )}
        </div>

        {/* Save Favorite Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(property.id);
          }}
          className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all duration-200 z-10 ${
            isFavorite
              ? 'bg-rose-500/90 text-white shadow-lg shadow-rose-500/30 scale-105'
              : 'bg-midnight-950/70 text-stone-300 hover:text-rose-400 hover:bg-midnight-900 border border-stone-700/50'
          }`}
          title={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
          aria-label="Toggle favorite"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Price Tag pinned to bottom left of image */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">
            {property.listingStatus}
          </span>
          <span className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight drop-shadow-md">
            {formatINR(property.price)}
          </span>
        </div>
      </div>

      {/* Property Details Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-serif text-base sm:text-lg font-bold text-stone-100 group-hover:text-gold-300 transition-colors line-clamp-1">
            {property.title}
          </h3>
          <p className="text-xs text-stone-400 mt-1 flex items-center gap-1">
            {property.locality}, {property.city}
          </p>

          <p className="text-xs text-stone-300/80 mt-2 line-clamp-2 leading-relaxed">
            {property.tagline}
          </p>

          {/* Key Specifications (Beds, Baths, Sqft) */}
          <div className="grid grid-cols-3 gap-2 py-3 my-3 border-y border-stone-800/80 text-center">
            <div className="flex flex-col items-center">
              <span className="flex items-center gap-1 text-xs text-stone-300 font-semibold">
                <Bed className="w-3.5 h-3.5 text-gold-400" />
                {property.bedrooms} BHK
              </span>
              <span className="text-[10px] text-stone-500">Bedrooms</span>
            </div>
            <div className="flex flex-col items-center border-x border-stone-800/60">
              <span className="flex items-center gap-1 text-xs text-stone-300 font-semibold">
                <Bath className="w-3.5 h-3.5 text-gold-400" />
                {property.bathrooms}
              </span>
              <span className="text-[10px] text-stone-500">Bathrooms</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="flex items-center gap-1 text-xs text-stone-300 font-semibold">
                <Move className="w-3.5 h-3.5 text-gold-400" />
                {property.areaSqft.toLocaleString()}
              </span>
              <span className="text-[10px] text-stone-500">sq. ft.</span>
            </div>
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="flex items-center gap-2 pt-1">
          {/* Compare Selector */}
          {onToggleCompare && (
            <button
              type="button"
              disabled={!isComparing && !canCompare}
              onClick={() => onToggleCompare(property)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition ${
                isComparing
                  ? 'bg-gold-400/20 border-gold-400 text-gold-300'
                  : 'border-stone-800 text-stone-400 hover:text-stone-200 hover:border-stone-700'
              } ${!isComparing && !canCompare ? 'opacity-40 cursor-not-allowed' : ''}`}
              title="Compare side by side"
            >
              {isComparing && <Check className="w-3 h-3 text-gold-400" />}
              {isComparing ? 'Comparing' : 'Compare'}
            </button>
          )}

          {/* View Details Primary Action */}
          <button
            type="button"
            onClick={() => onViewDetails(property)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-midnight-950 hover:bg-gold-400 text-stone-200 hover:text-midnight-950 text-xs font-bold border border-gold-400/30 hover:border-gold-400 transition-all shadow-md group-hover:border-gold-400"
          >
            <Eye className="w-3.5 h-3.5" />
            View Details
            <ArrowUpRight className="w-3.5 h-3.5 ml-auto" />
          </button>
        </div>
      </div>
    </div>
  );
};
