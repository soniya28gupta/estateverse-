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
      <section id="property-comparison" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-8 sm:p-12 rounded-2xl bg-midnight-900/60 border border-stone-800 text-center">
          <div className="w-12 h-12 rounded-2xl bg-gold-400/10 border border-gold-400/30 text-gold-400 flex items-center justify-center mx-auto mb-4">
            <Scale className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-white mb-2">Compare Properties Side by Side</h3>
          <p className="text-sm text-stone-400 max-w-md mx-auto mb-6">
            Select up to 3 properties using the "Compare" button on any listing card to evaluate price per sq.ft., EMI, room layouts, and amenities.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {allProperties.slice(0, 3).map(p => (
              <button
                key={p.id}
                onClick={() => onAddProperty(p)}
                className="px-3.5 py-2 rounded-xl bg-midnight-950 text-xs font-semibold text-stone-300 hover:text-gold-300 border border-stone-800 hover:border-gold-400/50 transition flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5 text-gold-400" />
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
    <section id="property-comparison" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-300 text-xs font-semibold tracking-wider uppercase mb-2">
            <Scale className="w-3.5 h-3.5 text-gold-400" />
            Direct Feature Comparison
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            Compare What Matters
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 mt-1">
            Comparing {selectedProperties.length} of max 3 properties. Highlighting value based on transparent metrics.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onClearAll}
            className="px-3.5 py-1.5 rounded-xl bg-midnight-950 text-xs font-semibold text-stone-400 hover:text-white border border-stone-800 transition"
          >
            Clear Comparison
          </button>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto rounded-2xl border border-stone-800 bg-midnight-900/90 shadow-2xl backdrop-blur-xl">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-stone-800">
              <th className="p-4 sm:p-5 w-48 text-stone-400 font-semibold uppercase tracking-wider text-[11px] bg-midnight-950/60">
                Property
              </th>
              {selectedProperties.map(property => (
                <th key={property.id} className="p-4 sm:p-5 min-w-[240px] align-top bg-midnight-900/50">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase text-gold-400">
                      {property.city}
                    </span>
                    <button
                      onClick={() => onRemoveProperty(property.id)}
                      className="p-1 rounded-lg text-stone-400 hover:text-rose-400 hover:bg-stone-800"
                      title="Remove from comparison"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-28 object-cover rounded-xl mb-2.5"
                  />
                  <h4 className="font-serif text-sm font-bold text-white line-clamp-1">{property.title}</h4>
                  <p className="text-[11px] text-stone-400">{property.locality}</p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-800/80 text-stone-300">
            {/* Price */}
            <tr>
              <td className="p-4 font-semibold text-stone-400 bg-midnight-950/40">Total Price</td>
              {selectedProperties.map(p => (
                <td key={p.id} className="p-4 font-serif text-base font-bold text-white">
                  {formatINR(p.price)}
                </td>
              ))}
            </tr>

            {/* Price per sq ft */}
            <tr>
              <td className="p-4 font-semibold text-stone-400 bg-midnight-950/40">Price / sq. ft.</td>
              {selectedProperties.map(p => {
                const isBest = p.pricePerSqft === lowestRate && selectedProperties.length > 1;
                return (
                  <td key={p.id} className="p-4">
                    <span className={`font-semibold ${isBest ? 'text-emerald-400 font-bold' : 'text-stone-200'}`}>
                      {formatINR(p.pricePerSqft, false)}/sq.ft
                    </span>
                    {isBest && (
                      <span className="ml-2 px-1.5 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                        Lowest Rate
                      </span>
                    )}
                  </td>
                );
              })}
            </tr>

            {/* Area */}
            <tr>
              <td className="p-4 font-semibold text-stone-400 bg-midnight-950/40">Built-up Area</td>
              {selectedProperties.map(p => (
                <td key={p.id} className="p-4 font-medium text-stone-200">
                  {p.areaSqft.toLocaleString()} sq. ft.
                </td>
              ))}
            </tr>

            {/* Bedrooms & Bathrooms */}
            <tr>
              <td className="p-4 font-semibold text-stone-400 bg-midnight-950/40">Configuration</td>
              {selectedProperties.map(p => (
                <td key={p.id} className="p-4">
                  {p.bedrooms} BHK • {p.bathrooms} Baths
                </td>
              ))}
            </tr>

            {/* Estimated Monthly EMI */}
            <tr>
              <td className="p-4 font-semibold text-stone-400 bg-midnight-950/40">Estimated EMI (20 Yrs)</td>
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
                  <td key={p.id} className="p-4 font-semibold text-gold-300">
                    ~{formatINR(emi)}/mo
                    {isLowest && (
                      <span className="ml-2 px-1.5 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                        Most Affordable EMI
                      </span>
                    )}
                  </td>
                );
              })}
            </tr>

            {/* 3D Interactive Tour */}
            <tr>
              <td className="p-4 font-semibold text-stone-400 bg-midnight-950/40">3D Interactive Tour</td>
              {selectedProperties.map(p => (
                <td key={p.id} className="p-4">
                  {p.has3DTour ? (
                    <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                      <Box className="w-3.5 h-3.5 text-emerald-400" /> Available
                    </span>
                  ) : (
                    <span className="text-stone-500 text-xs">Standard Gallery</span>
                  )}
                </td>
              ))}
            </tr>

            {/* Top Amenities */}
            <tr>
              <td className="p-4 font-semibold text-stone-400 bg-midnight-950/40">Key Amenities</td>
              {selectedProperties.map(p => (
                <td key={p.id} className="p-4">
                  <ul className="space-y-1">
                    {p.amenities.slice(0, 4).map((a, i) => (
                      <li key={i} className="text-[11px] text-stone-300 flex items-center gap-1">
                        <Check className="w-3 h-3 text-gold-400 shrink-0" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>

            {/* Actions */}
            <tr>
              <td className="p-4 bg-midnight-950/40"></td>
              {selectedProperties.map(p => (
                <td key={p.id} className="p-4">
                  <button
                    onClick={() => onViewDetails(p)}
                    className="w-full py-2 px-3 rounded-xl bg-gold-400 hover:bg-gold-300 text-midnight-950 font-bold text-xs transition flex items-center justify-center gap-1"
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

      <p className="text-[11px] text-stone-400 text-center mt-3">
        * "Best value" highlights are calculated objectively from price per sq. ft. and estimated EMI. True value always depends on your personal lifestyle, location priorities, and commute requirements.
      </p>
    </section>
  );
};
