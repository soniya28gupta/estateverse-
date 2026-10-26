import React, { useState, useMemo } from 'react';
import { Sparkles, SlidersHorizontal, Check, ArrowRight, Bed, Bath, Move, Building2, MapPin } from 'lucide-react';
import { SAMPLE_PROPERTIES, INDIAN_CITIES } from '../../data/properties';
import { Property } from '../../types/property';
import { formatINR } from '../../utils/formatters';

interface SmartPropertyMatchingProps {
  onSelectProperty: (property: Property) => void;
}

export const SmartPropertyMatching: React.FC<SmartPropertyMatchingProps> = ({
  onSelectProperty
}) => {
  const [budgetTier, setBudgetTier] = useState<string>('any');
  const [city, setCity] = useState<string>('All Cities');
  const [propertyType, setPropertyType] = useState<string>('all');
  const [priorityAmenities, setPriorityAmenities] = useState<string[]>([
    'Private Swimming Pool',
    'Smart Home Automation'
  ]);

  const amenityOptions = [
    'Private Swimming Pool',
    'Smart Home Automation',
    'Landscaped Courtyard',
    'Solar Rooftop Grid',
    'High Ceilings (12 ft)',
    'Acoustic Double Glazing',
    'Clubhouse & Gym Access',
    'EV Supercharger Station'
  ];

  const toggleAmenity = (amenity: string) => {
    setPriorityAmenities(prev =>
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    );
  };

  // Rule-based matching score computation
  const matchedProperties = useMemo(() => {
    return SAMPLE_PROPERTIES.map(property => {
      let score = 50; // base score

      // City matching
      if (city === 'All Cities') {
        score += 10;
      } else if (property.city === city) {
        score += 20;
      } else {
        score -= 20;
      }

      // Property type matching
      if (propertyType === 'all') {
        score += 10;
      } else if (property.propertyType === propertyType) {
        score += 20;
      } else {
        score -= 15;
      }

      // Budget tier
      if (budgetTier === 'under-75l' && property.price <= 7500000) score += 20;
      else if (budgetTier === '75l-1.5cr' && property.price >= 7500000 && property.price <= 15000000) score += 20;
      else if (budgetTier === '1.5cr-3cr' && property.price >= 15000000 && property.price <= 30000000) score += 20;
      else if (budgetTier === 'above-3cr' && property.price >= 30000000) score += 20;
      else if (budgetTier === 'any') score += 10;
      else score -= 15;

      // Amenities matching
      let amenityMatches = 0;
      priorityAmenities.forEach(req => {
        if (property.amenities.some(a => a.toLowerCase().includes(req.toLowerCase()))) {
          amenityMatches++;
        }
      });
      score += Math.min(25, amenityMatches * 10);

      const normalizedScore = Math.max(45, Math.min(99, score));

      return {
        property,
        score: normalizedScore,
        amenityMatches
      };
    })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }, [budgetTier, city, propertyType, priorityAmenities]);

  return (
    <section id="smart-matching" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="p-8 sm:p-12 lg:p-14 rounded-3xl bg-white border border-[#E7E9ED] shadow-soft-xl">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 pb-8 border-b border-[#E7E9ED]">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF6EE] border border-[#E9DCBC] text-[#B89558] text-xs font-bold tracking-wider uppercase mb-3 shadow-soft-sm">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#B89558]" />
              INTELLIGENT PREFERENCE FORM
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#17191C] tracking-tight">
              Smart Property Matching
            </h2>
            <p className="text-[#6B7280] text-sm mt-2 max-w-xl font-normal leading-relaxed">
              Transparent, rule-based algorithmic matching based on your lifestyle priorities, budget constraints, and verified spatial parameters.
            </p>
          </div>

          <div className="text-xs text-[#6B7280] bg-[#F7F8FA] p-3 rounded-2xl border border-[#E7E9ED]">
            <span className="font-bold text-[#17191C] block">Deterministic Matching:</span>
            Zero speculative bias • Ranked purely by spec alignment
          </div>
        </div>

        {/* Filters and Inputs Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {/* City */}
          <div>
            <label className="block text-xs font-bold text-[#17191C] uppercase tracking-wider mb-2">
              Preferred City
            </label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-[#F7F8FA] text-[#17191C] text-xs sm:text-sm font-medium border border-[#E7E9ED] focus:border-[#B89558] focus:bg-white focus:outline-none transition cursor-pointer"
            >
              {INDIAN_CITIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Property Type */}
          <div>
            <label className="block text-xs font-bold text-[#17191C] uppercase tracking-wider mb-2">
              Property Type
            </label>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-[#F7F8FA] text-[#17191C] text-xs sm:text-sm font-medium border border-[#E7E9ED] focus:border-[#B89558] focus:bg-white focus:outline-none transition cursor-pointer"
            >
              <option value="all">Any Architectural Typology</option>
              <option value="villa">Modern Villas</option>
              <option value="apartment">Luxury Apartments & Penthouses</option>
              <option value="house">Country & Waterfront Houses</option>
            </select>
          </div>

          {/* Budget Range */}
          <div>
            <label className="block text-xs font-bold text-[#17191C] uppercase tracking-wider mb-2">
              Budget Range
            </label>
            <select
              value={budgetTier}
              onChange={(e) => setBudgetTier(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-[#F7F8FA] text-[#17191C] text-xs sm:text-sm font-medium border border-[#E7E9ED] focus:border-[#B89558] focus:bg-white focus:outline-none transition cursor-pointer"
            >
              <option value="any">Flexible / Any Budget</option>
              <option value="under-75l">Under ₹75 Lakh</option>
              <option value="75l-1.5cr">₹75 Lakh – ₹1.5 Cr</option>
              <option value="1.5cr-3cr">₹1.5 Cr – ₹3.0 Cr</option>
              <option value="above-3cr">Above ₹3.0 Cr</option>
            </select>
          </div>
        </div>

        {/* Priority Amenities Multi-Select Pills */}
        <div className="mb-10">
          <label className="block text-xs font-bold text-[#17191C] uppercase tracking-wider mb-3">
            Priority Lifestyle Features & Amenities
          </label>
          <div className="flex flex-wrap gap-2.5">
            {amenityOptions.map(amenity => {
              const active = priorityAmenities.includes(amenity);
              return (
                <button
                  key={amenity}
                  type="button"
                  onClick={() => toggleAmenity(amenity)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition border flex items-center gap-1.5 ${
                    active
                      ? 'bg-[#17191C] text-white border-[#17191C] shadow-soft-sm'
                      : 'bg-[#F7F8FA] text-[#6B7280] hover:text-[#17191C] border-[#E7E9ED] hover:bg-neutral-100'
                  }`}
                >
                  {active && <Check className="w-3.5 h-3.5 text-[#B89558]" />}
                  {amenity}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results: Top Matched Properties Cards */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#17191C]">
              Top Ranked Matches for Your Profile
            </span>
            <span className="text-xs text-[#6B7280]">
              Showing top 3 recommendations
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {matchedProperties.map(({ property, score }) => (
              <div
                key={property.id}
                onClick={() => onSelectProperty(property)}
                className="group cursor-pointer rounded-2xl bg-[#F7F8FA] hover:bg-white border border-[#E7E9ED] hover:border-[#B89558] transition-all duration-300 p-4 shadow-soft-sm hover:shadow-soft-xl flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-3.5 bg-neutral-200">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#17191C] text-[11px] font-bold border border-[#E7E9ED] shadow-soft-sm">
                      <span className="text-[#B89558]">{score}%</span> Match
                    </div>
                  </div>

                  <h4 className="font-serif text-base font-bold text-[#17191C] group-hover:text-[#B89558] transition-colors line-clamp-1">
                    {property.title}
                  </h4>
                  <p className="text-xs text-[#6B7280] mt-0.5">{property.locality}, {property.city}</p>

                  <div className="flex items-center gap-3 my-3 text-xs text-[#6B7280] border-y border-[#E7E9ED] py-2">
                    <span>{property.bedrooms} Beds</span>
                    <span>•</span>
                    <span>{property.bathrooms} Baths</span>
                    <span>•</span>
                    <span>{property.areaSqft.toLocaleString()} sq.ft</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="font-serif text-base font-bold text-[#17191C]">
                    {formatINR(property.price)}
                  </span>
                  <span className="text-xs font-semibold text-[#B89558] group-hover:underline flex items-center gap-1">
                    View Match <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
