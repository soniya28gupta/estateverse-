import React from 'react';
import { Search, MapPin, Home, SlidersHorizontal, RotateCcw, Building2, BedDouble } from 'lucide-react';
import { INDIAN_CITIES, PROPERTY_TYPES } from '../../data/properties';
import { PropertyType, ListingStatus } from '../../types/property';

export interface FilterState {
  searchQuery: string;
  status: ListingStatus;
  city: string;
  propertyType: string;
  priceRange: string;
  bedrooms: string;
}

interface PropertySearchProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onResetFilters: () => void;
  resultCount: number;
  className?: string;
}

export const PropertySearch: React.FC<PropertySearchProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  resultCount,
  className = ''
}) => {
  const priceRanges = [
    { value: 'all', label: 'Any Budget' },
    { value: 'under-75l', label: 'Under ₹75 Lakh' },
    { value: '75l-1.5cr', label: '₹75 Lakh – ₹1.5 Cr' },
    { value: '1.5cr-3cr', label: '₹1.5 Cr – ₹3.0 Cr' },
    { value: 'above-3cr', label: '₹3.0 Cr & Above' }
  ];

  const bedroomOptions = [
    { value: 'all', label: 'Any Beds' },
    { value: '2', label: '2+ BHK' },
    { value: '3', label: '3+ BHK' },
    { value: '4', label: '4+ BHK' },
    { value: '5', label: '5+ BHK' }
  ];

  return (
    <div className={`w-full max-w-6xl mx-auto ${className}`}>
      {/* Buy / Rent Pill Tabs */}
      <div className="flex items-center gap-2 mb-3">
        <button
          type="button"
          onClick={() => onFilterChange({ ...filters, status: 'For Sale' })}
          className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            filters.status === 'For Sale'
              ? 'bg-gold-400 text-midnight-950 shadow-lg shadow-gold-400/25 ring-2 ring-gold-300/40'
              : 'bg-midnight-900/80 text-stone-300 hover:text-white border border-stone-800'
          }`}
        >
          Buy Properties
        </button>
        <button
          type="button"
          onClick={() => onFilterChange({ ...filters, status: 'For Rent' })}
          className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            filters.status === 'For Rent'
              ? 'bg-gold-400 text-midnight-950 shadow-lg shadow-gold-400/25 ring-2 ring-gold-300/40'
              : 'bg-midnight-900/80 text-stone-300 hover:text-white border border-stone-800'
          }`}
        >
          Rent Properties
        </button>

        <span className="ml-auto text-xs text-stone-400 hidden sm:inline-block">
          <span className="font-semibold text-gold-300">{resultCount}</span> spaces available
        </span>
      </div>

      {/* Main Glass Search Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-midnight-900/90 backdrop-blur-xl border border-gold-400/25 shadow-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 items-center">
          {/* Location / Locality Input */}
          <div className="relative">
            <label className="block text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-1">
              Location
            </label>
            <div className="relative flex items-center">
              <MapPin className="absolute left-3 w-4 h-4 text-gold-400 pointer-events-none" />
              <select
                value={filters.city}
                onChange={(e) => onFilterChange({ ...filters, city: e.target.value })}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-midnight-950/80 text-white text-xs sm:text-sm border border-stone-800 focus:border-gold-400 focus:outline-none transition appearance-none cursor-pointer"
              >
                {INDIAN_CITIES.map((city) => (
                  <option key={city} value={city} className="bg-midnight-950 text-white">
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Property Type */}
          <div className="relative">
            <label className="block text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-1">
              Property Type
            </label>
            <div className="relative flex items-center">
              <Building2 className="absolute left-3 w-4 h-4 text-gold-400 pointer-events-none" />
              <select
                value={filters.propertyType}
                onChange={(e) => onFilterChange({ ...filters, propertyType: e.target.value })}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-midnight-950/80 text-white text-xs sm:text-sm border border-stone-800 focus:border-gold-400 focus:outline-none transition appearance-none cursor-pointer"
              >
                {PROPERTY_TYPES.map((t) => (
                  <option key={t.value} value={t.value} className="bg-midnight-950 text-white">
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Price Range */}
          <div className="relative">
            <label className="block text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-1">
              Budget Range
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-gold-400 text-xs font-bold pointer-events-none">₹</span>
              <select
                value={filters.priceRange}
                onChange={(e) => onFilterChange({ ...filters, priceRange: e.target.value })}
                className="w-full pl-8 pr-3 py-2.5 rounded-xl bg-midnight-950/80 text-white text-xs sm:text-sm border border-stone-800 focus:border-gold-400 focus:outline-none transition appearance-none cursor-pointer"
              >
                {priceRanges.map((p) => (
                  <option key={p.value} value={p.value} className="bg-midnight-950 text-white">
                    {p.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Bedrooms */}
          <div className="relative">
            <label className="block text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-1">
              Bedrooms
            </label>
            <div className="relative flex items-center">
              <BedDouble className="absolute left-3 w-4 h-4 text-gold-400 pointer-events-none" />
              <select
                value={filters.bedrooms}
                onChange={(e) => onFilterChange({ ...filters, bedrooms: e.target.value })}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-midnight-950/80 text-white text-xs sm:text-sm border border-stone-800 focus:border-gold-400 focus:outline-none transition appearance-none cursor-pointer"
              >
                {bedroomOptions.map((b) => (
                  <option key={b.value} value={b.value} className="bg-midnight-950 text-white">
                    {b.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-4 sm:pt-0">
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('featured-properties');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 text-midnight-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-gold-400/20 active:scale-95"
            >
              <Search className="w-4 h-4 stroke-[2.5]" />
              Find Homes
            </button>
            <button
              type="button"
              onClick={onResetFilters}
              title="Reset Search Filters"
              className="p-3 rounded-xl bg-midnight-950/80 hover:bg-stone-800 text-stone-400 hover:text-white border border-stone-800 transition"
              aria-label="Reset Filters"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Free text search input row */}
        <div className="mt-3 pt-3 border-t border-stone-800/80 flex items-center gap-2">
          <Search className="w-4 h-4 text-stone-500" />
          <input
            type="text"
            placeholder="Search by keywords (e.g., 'swimming pool', 'Super Corridor', 'penthouse', 'garden')..."
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ ...filters, searchQuery: e.target.value })}
            className="w-full bg-transparent text-xs text-stone-200 placeholder-stone-500 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};
