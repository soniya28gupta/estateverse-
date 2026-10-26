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
          className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
            filters.status === 'For Sale'
              ? 'bg-[#17191C] text-white shadow-soft'
              : 'bg-white text-[#6B7280] hover:text-[#17191C] border border-[#E7E9ED]'
          }`}
        >
          Buy Properties
        </button>
        <button
          type="button"
          onClick={() => onFilterChange({ ...filters, status: 'For Rent' })}
          className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
            filters.status === 'For Rent'
              ? 'bg-[#17191C] text-white shadow-soft'
              : 'bg-white text-[#6B7280] hover:text-[#17191C] border border-[#E7E9ED]'
          }`}
        >
          Rent Properties
        </button>

        <span className="ml-auto text-xs text-[#6B7280] hidden sm:inline-block font-medium">
          Showing <span className="font-bold text-[#B89558]">{resultCount}</span> spaces matching your criteria
        </span>
      </div>

      {/* Main White Luxury Search Bar Card */}
      <div className="p-4 sm:p-6 rounded-3xl bg-white border border-[#E7E9ED] shadow-soft-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 items-center">
          {/* Location / City Input */}
          <div className="relative">
            <label className="block text-[11px] font-bold text-[#6B7280] uppercase tracking-wider mb-1.5">
              City / Metro
            </label>
            <div className="relative flex items-center">
              <MapPin className="absolute left-3.5 w-4 h-4 text-[#B89558] pointer-events-none" />
              <select
                value={filters.city}
                onChange={(e) => onFilterChange({ ...filters, city: e.target.value })}
                className="w-full pl-9 pr-3 py-2.5 rounded-2xl bg-[#F7F8FA] text-[#17191C] text-xs sm:text-sm font-medium border border-[#E7E9ED] focus:border-[#B89558] focus:bg-white focus:outline-none transition appearance-none cursor-pointer"
              >
                {INDIAN_CITIES.map((city) => (
                  <option key={city} value={city} className="bg-white text-[#17191C]">
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Property Type */}
          <div className="relative">
            <label className="block text-[11px] font-bold text-[#6B7280] uppercase tracking-wider mb-1.5">
              Property Type
            </label>
            <div className="relative flex items-center">
              <Building2 className="absolute left-3.5 w-4 h-4 text-[#B89558] pointer-events-none" />
              <select
                value={filters.propertyType}
                onChange={(e) => onFilterChange({ ...filters, propertyType: e.target.value })}
                className="w-full pl-9 pr-3 py-2.5 rounded-2xl bg-[#F7F8FA] text-[#17191C] text-xs sm:text-sm font-medium border border-[#E7E9ED] focus:border-[#B89558] focus:bg-white focus:outline-none transition appearance-none cursor-pointer"
              >
                {PROPERTY_TYPES.map((t) => (
                  <option key={t.value} value={t.value} className="bg-white text-[#17191C]">
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Budget Range */}
          <div className="relative">
            <label className="block text-[11px] font-bold text-[#6B7280] uppercase tracking-wider mb-1.5">
              Budget Range
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-[#B89558] text-xs font-bold pointer-events-none">₹</span>
              <select
                value={filters.priceRange}
                onChange={(e) => onFilterChange({ ...filters, priceRange: e.target.value })}
                className="w-full pl-8 pr-3 py-2.5 rounded-2xl bg-[#F7F8FA] text-[#17191C] text-xs sm:text-sm font-medium border border-[#E7E9ED] focus:border-[#B89558] focus:bg-white focus:outline-none transition appearance-none cursor-pointer"
              >
                {priceRanges.map((p) => (
                  <option key={p.value} value={p.value} className="bg-white text-[#17191C]">
                    {p.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Bedrooms */}
          <div className="relative">
            <label className="block text-[11px] font-bold text-[#6B7280] uppercase tracking-wider mb-1.5">
              Bedrooms
            </label>
            <div className="relative flex items-center">
              <BedDouble className="absolute left-3.5 w-4 h-4 text-[#B89558] pointer-events-none" />
              <select
                value={filters.bedrooms}
                onChange={(e) => onFilterChange({ ...filters, bedrooms: e.target.value })}
                className="w-full pl-9 pr-3 py-2.5 rounded-2xl bg-[#F7F8FA] text-[#17191C] text-xs sm:text-sm font-medium border border-[#E7E9ED] focus:border-[#B89558] focus:bg-white focus:outline-none transition appearance-none cursor-pointer"
              >
                {bedroomOptions.map((b) => (
                  <option key={b.value} value={b.value} className="bg-white text-[#17191C]">
                    {b.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-4 sm:pt-4">
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('featured-properties');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-[#17191C] hover:bg-[#B89558] text-white font-semibold text-xs sm:text-sm transition-all shadow-soft active:scale-95"
            >
              <Search className="w-4 h-4 stroke-[2.2]" />
              Find Spaces
            </button>
            <button
              type="button"
              onClick={onResetFilters}
              title="Reset All Filters"
              className="p-3 rounded-2xl bg-[#F7F8FA] hover:bg-[#FAF6EE] text-[#6B7280] hover:text-[#B89558] border border-[#E7E9ED] transition"
              aria-label="Reset Filters"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Free text search input row */}
        <div className="mt-4 pt-3.5 border-t border-[#E7E9ED] flex items-center gap-2.5">
          <Search className="w-4 h-4 text-[#9CA3AF]" />
          <input
            type="text"
            placeholder="Search by keywords, amenities or localities (e.g., 'infinity pool', 'Super Corridor', 'penthouse', 'private garden')..."
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ ...filters, searchQuery: e.target.value })}
            className="w-full bg-transparent text-xs sm:text-sm text-[#17191C] placeholder-[#9CA3AF] focus:outline-none font-medium"
          />
        </div>
      </div>
    </div>
  );
};
