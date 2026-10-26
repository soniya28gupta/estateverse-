import React from 'react';
import { Property } from '../../types/property';
import { formatINR, calculateMortgage } from '../../utils/formatters';
import { Check, X, Sparkles, Scale, Box, ArrowUpRight, Plus } from 'lucide-react';

interface PropertyComparisonProps {
  selectedProperties: Property[];
  onRemoveProperty: (propertyId: string) => void;
  onClearAll: () => void;
  onViewDetails: (property: Property) => void;
  allProperties: Property[];
  onAddProperty: (property: Property) => void;
}

export const PropertyComparison: React.FC<PropertyComparisonProps> = ({
  selectedProperties,
  onRemoveProperty,
  onClearAll,
  onViewDetails,
  allProperties,
  onAddProperty
}) => {
  if (selectedProperties.length === 0) {
    return (
      <section id="property-comparison" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#F7F8FA] border border-[#E7E9ED] text-center shadow-soft-sm">
          <div className="w-12 h-12 rounded-2xl bg-[#FAF6EE] border border-[#E9DCBC] text-[#B89558] flex items-center justify-center mx-auto mb-4 shadow-soft-sm">
            <Scale className="w-6 h-6 stroke-[1.8]" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#17191C] mb-2">Compare Properties Side by Side</h3>
          <p className="text-sm text-[#6B7280] max-w-md mx-auto mb-6 font-normal">
            Select up to 3 properties using the "Compare" button on any listing card to evaluate price per sq.ft., EMI, room layouts, and amenities.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {allProperties.slice(0, 3).map(p => (
              <button
                key={p.id}
                type="button"
                onClick={() => onAddProperty(p)}
                className="px-4 py-2.5 rounded-2xl bg-white text-xs font-semibold text-[#17191C] hover:text-[#B89558] border border-[#E7E9ED] hover:border-[#B89558] transition flex items-center gap-2 shadow-soft-sm"
              >
                <Plus className="w-3.5 h-3.5 text-[#B89558]" />
                Add {p.title}
              </button>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Calculate lowest price per sq ft among compared
  const lowestRate = Math.min(...selectedProperties.map(p => p.pricePerSqft));
  const lowestEMI = Math.min(...selectedProperties.map(p => {
    return calculateMortgage({
      propertyPrice: p.price,
      downPaymentPercent: 20,
      annualInterestRate: 8.5,
      tenureYears: 20,
      additionalExpensesPercent: 6
    }).monthlyEMI;
  }));

  return (
    <section id="property-comparison" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF6EE] border border-[#E9DCBC] text-[#B89558] text-xs font-bold tracking-wider uppercase mb-2 shadow-soft-sm">
            <Scale className="w-3.5 h-3.5 text-[#B89558]" />
            DIRECT FEATURE COMPARISON
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#17191C]">
            Compare What Matters
          </h2>
          <p className="text-xs sm:text-sm text-[#6B7280] mt-1 font-normal">
            Comparing {selectedProperties.length} of max 3 properties. Highlighting value based on transparent metrics.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onClearAll}
            className="px-4 py-2 rounded-2xl bg-[#F7F8FA] text-xs font-semibold text-[#6B7280] hover:text-[#17191C] border border-[#E7E9ED] transition"
          >
            Clear Comparison
          </button>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto rounded-3xl border border-[#E7E9ED] bg-white shadow-soft-xl">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-[#E7E9ED]">
              <th className="p-5 w-48 text-[#6B7280] font-bold uppercase tracking-wider text-[11px] bg-[#F7F8FA]">
                Property Specification
              </th>
              {selectedProperties.map(property => (
                <th key={property.id} className="p-5 min-w-[260px] align-top bg-white border-l border-[#E7E9ED]">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase text-[#B89558]">
                      {property.city}
                    </span>
                    <button
                      type="button"
                      onClick={() => onRemoveProperty(property.id)}
                      className="p-1 rounded-lg text-[#9CA3AF] hover:text-rose-500 hover:bg-neutral-100 transition"
                      title="Remove from comparison"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-32 object-cover rounded-2xl mb-3"
                  />
                  <h4 className="font-serif text-base font-bold text-[#17191C] line-clamp-1">{property.title}</h4>
                  <p className="text-[11px] text-[#6B7280] font-medium">{property.locality}</p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E7E9ED] text-[#17191C]">
            {/* Price */}
            <tr>
              <td className="p-4 font-bold text-[#6B7280] bg-[#F7F8FA] text-xs uppercase">Total Price</td>
              {selectedProperties.map(p => (
                <td key={p.id} className="p-4 font-serif text-base font-bold text-[#17191C] border-l border-[#E7E9ED]">
                  {formatINR(p.price)}
                </td>
              ))}
            </tr>

            {/* Price per sq ft */}
            <tr>
              <td className="p-4 font-bold text-[#6B7280] bg-[#F7F8FA] text-xs uppercase">Price / sq. ft.</td>
              {selectedProperties.map(p => {
                const isBest = p.pricePerSqft === lowestRate && selectedProperties.length > 1;
                return (
                  <td key={p.id} className="p-4 border-l border-[#E7E9ED]">
                    <span className={`font-semibold ${isBest ? 'text-emerald-600 font-bold' : 'text-[#17191C]'}`}>
                      {formatINR(p.pricePerSqft, false)}/sq.ft
                    </span>
                    {isBest && (
                      <span className="ml-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Lowest Rate
                      </span>
                    )}
                  </td>
                );
              })}
            </tr>

            {/* Area */}
            <tr>
              <td className="p-4 font-bold text-[#6B7280] bg-[#F7F8FA] text-xs uppercase">Built-up Area</td>
              {selectedProperties.map(p => (
                <td key={p.id} className="p-4 font-medium text-[#17191C] border-l border-[#E7E9ED]">
                  {p.areaSqft.toLocaleString()} sq. ft.
                </td>
              ))}
            </tr>

            {/* Bedrooms & Bathrooms */}
            <tr>
              <td className="p-4 font-bold text-[#6B7280] bg-[#F7F8FA] text-xs uppercase">Configuration</td>
              {selectedProperties.map(p => (
                <td key={p.id} className="p-4 font-medium text-[#17191C] border-l border-[#E7E9ED]">
                  {p.bedrooms} BHK • {p.bathrooms} Baths
                </td>
              ))}
            </tr>

            {/* Estimated Monthly EMI */}
            <tr>
              <td className="p-4 font-bold text-[#6B7280] bg-[#F7F8FA] text-xs uppercase">Estimated EMI (20 Yrs)</td>
              {selectedProperties.map(p => {
                const emi = calculateMortgage({
                  propertyPrice: p.price,
                  downPaymentPercent: 20,
                  annualInterestRate: 8.5,
                  tenureYears: 20,
                  additionalExpensesPercent: 6
                }).monthlyEMI;
                const isLowest = emi === lowestEMI && selectedProperties.length > 1;
                return (
                  <td key={p.id} className="p-4 font-bold text-[#B89558] border-l border-[#E7E9ED]">
                    ~{formatINR(emi)}/mo
                    {isLowest && (
                      <span className="ml-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Most Affordable EMI
                      </span>
                    )}
                  </td>
                );
              })}
            </tr>

            {/* 3D Interactive Tour */}
            <tr>
              <td className="p-4 font-bold text-[#6B7280] bg-[#F7F8FA] text-xs uppercase">3D Interactive Tour</td>
              {selectedProperties.map(p => (
                <td key={p.id} className="p-4 border-l border-[#E7E9ED]">
                  {p.has3DTour ? (
                    <span className="inline-flex items-center gap-1.5 text-xs text-[#B89558] font-bold">
                      <Box className="w-3.5 h-3.5 text-[#B89558]" /> Available in 3D
                    </span>
                  ) : (
                    <span className="text-[#9CA3AF] text-xs">Standard Gallery</span>
                  )}
                </td>
              ))}
            </tr>

            {/* Top Amenities */}
            <tr>
              <td className="p-4 font-bold text-[#6B7280] bg-[#F7F8FA] text-xs uppercase">Key Amenities</td>
              {selectedProperties.map(p => (
                <td key={p.id} className="p-4 border-l border-[#E7E9ED]">
                  <ul className="space-y-1.5">
                    {p.amenities.slice(0, 4).map((a, i) => (
                      <li key={i} className="text-xs text-[#6B7280] flex items-center gap-1.5">
                        <Check className="w-3 h-3 text-[#B89558] shrink-0" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>

            {/* Actions */}
            <tr>
              <td className="p-4 bg-[#F7F8FA]"></td>
              {selectedProperties.map(p => (
                <td key={p.id} className="p-4 border-l border-[#E7E9ED]">
                  <button
                    type="button"
                    onClick={() => onViewDetails(p)}
                    className="w-full py-2.5 px-3 rounded-2xl bg-[#17191C] hover:bg-[#B89558] text-white font-semibold text-xs transition duration-200 flex items-center justify-center gap-1 shadow-soft"
                  >
                    View Details
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};
