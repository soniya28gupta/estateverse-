import React, { useState } from 'react';
import { MapPin, Navigation, School, HeartPulse, ShoppingBag, Trees, Train, Compass, CheckCircle2 } from 'lucide-react';
import { SAMPLE_PROPERTIES } from '../../data/properties';
import { Property, NearbyFacility } from '../../types/property';

export const NeighborhoodExplorer: React.FC = () => {
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>(SAMPLE_PROPERTIES[0].id);
  const [facilityFilter, setFacilityFilter] = useState<string>('all');
  const [commuteDestination, setCommuteDestination] = useState<string>('airport');

  const property = SAMPLE_PROPERTIES.find(p => p.id === selectedPropertyId) || SAMPLE_PROPERTIES[0];

  const filteredFacilities = property.nearbyFacilities.filter(f => {
    if (facilityFilter === 'all') return true;
    return f.type === facilityFilter;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'metro': return <Train className="w-4 h-4 text-sky-600" />;
      case 'school': return <School className="w-4 h-4 text-amber-600" />;
      case 'hospital': return <HeartPulse className="w-4 h-4 text-rose-600" />;
      case 'mall': return <ShoppingBag className="w-4 h-4 text-purple-600" />;
      case 'park': return <Trees className="w-4 h-4 text-emerald-600" />;
      default: return <MapPin className="w-4 h-4 text-[#B89558]" />;
    }
  };

  const commuteTimes: Record<string, { label: string; time: string; distance: string }> = {
    airport: { label: 'Indore Devi Ahilya Bai Holkar International Airport', time: '14 mins', distance: '8.4 km' },
    tech: { label: 'TCS / Infosys IT Special Economic Zone Corridor', time: '6 mins', distance: '2.8 km' },
    city: { label: 'Central Financial Hub & Palasia District', time: '18 mins', distance: '12.0 km' },
  };

  return (
    <section id="neighborhoods" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF6EE] border border-[#E9DCBC] text-[#B89558] text-xs font-bold tracking-wider uppercase mb-3 shadow-soft-sm">
          <Compass className="w-3.5 h-3.5 text-[#B89558]" />
          CURATED NEIGHBORHOODS & LIFESTYLE
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#17191C] tracking-tight mb-3">
          Explore the Surrounding Life
        </h2>
        <p className="text-[#6B7280] text-sm sm:text-base leading-relaxed font-normal">
          Evaluate transit corridors, premier educational institutions, healthcare centers, and commute convenience before scheduling physical visits.
        </p>
      </div>

      {/* Property Selector Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
        {SAMPLE_PROPERTIES.map(p => (
          <button
            key={p.id}
            type="button"
            onClick={() => setSelectedPropertyId(p.id)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition border ${
              selectedPropertyId === p.id
                ? 'bg-[#17191C] text-white border-[#17191C] shadow-soft'
                : 'bg-white text-[#6B7280] hover:text-[#17191C] border-[#E7E9ED]'
            }`}
          >
            {p.locality}, {p.city}
          </button>
        ))}
      </div>

      {/* Main Grid: Interactive Map Visual + Locality Facilities */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Architectural Map Canvas Visualization */}
        <div className="lg:col-span-7 rounded-3xl overflow-hidden bg-[#F7F8FA] border border-[#E7E9ED] shadow-soft-xl relative min-h-[460px] flex flex-col justify-between p-6 sm:p-7">
          {/* Simulated Subtle Grid with Radar & Pins */}
          <div className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:24px_24px]" />

          {/* Central Property Radar Pin */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-[#E7E9ED] text-xs shadow-soft-sm">
              <span className="text-[#17191C] font-bold block">{property.title}</span>
              <span className="text-[#6B7280] text-[11px]">{property.locality}, {property.city}</span>
            </div>
            <div className="bg-white/90 px-3 py-1.5 rounded-xl border border-[#E7E9ED] text-[11px] text-[#6B7280] shadow-soft-sm">
              GPS: {property.coordinates.lat.toFixed(4)}°N, {property.coordinates.lng.toFixed(4)}°E
            </div>
          </div>

          {/* Graphical Map Representation */}
          <div className="my-auto relative flex items-center justify-center py-12">
            {/* Concentric distance rings */}
            <div className="w-72 h-72 rounded-full border border-[#D3D6DC] flex items-center justify-center animate-pulse-subtle">
              <div className="w-48 h-48 rounded-full border border-[#E2E8F0] flex items-center justify-center">
                <div className="w-24 h-24 rounded-full border border-[#B89558]/40 flex items-center justify-center bg-[#FAF6EE]">
                  <div className="w-8 h-8 rounded-full bg-[#17191C] text-[#B89558] font-bold flex items-center justify-center shadow-lg animate-bounce">
                    <MapPin className="w-4 h-4 fill-current" />
                  </div>
                </div>
              </div>
            </div>

            {/* Simulated Satellite Facility Markers */}
            {property.nearbyFacilities.map((fac, idx) => {
              const angles = [45, 130, 210, 290, 340];
              const angle = angles[idx % angles.length];
              const rad = (angle * Math.PI) / 180;
              const radius = 95 + (idx % 2) * 28;
              const x = Math.cos(rad) * radius;
              const y = Math.sin(rad) * radius;

              return (
                <div
                  key={idx}
                  style={{ transform: `translate(${x}px, ${y}px)` }}
                  className="absolute p-2.5 rounded-2xl bg-white border border-[#E7E9ED] shadow-soft-sm backdrop-blur-md flex items-center gap-2 text-[10px] text-[#17191C] hover:border-[#B89558] hover:scale-105 transition cursor-pointer"
                  title={`${fac.name} (${fac.distance})`}
                >
                  {getIcon(fac.type)}
                  <span className="font-semibold max-w-[100px] truncate">{fac.name}</span>
                  <span className="text-[#B89558] text-[9px] font-bold">{fac.distance}</span>
                </div>
              );
            })}
          </div>

          {/* Commute Simulator Widget */}
          <div className="relative z-10 bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-[#E7E9ED] shadow-soft-sm">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-bold text-[#17191C] flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-[#B89558]" />
                Commute Time Estimator
              </span>
              <div className="flex gap-1.5">
                {(['airport', 'tech', 'city'] as const).map(dest => (
                  <button
                    key={dest}
                    type="button"
                    onClick={() => setCommuteDestination(dest)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition ${
                      commuteDestination === dest
                        ? 'bg-[#17191C] text-white'
                        : 'bg-[#F7F8FA] text-[#6B7280] hover:text-[#17191C]'
                    }`}
                  >
                    {dest.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-[#17191C] pt-2 border-t border-[#E7E9ED]">
              <span className="truncate max-w-[280px] text-[#6B7280]">
                To {commuteTimes[commuteDestination].label}
              </span>
              <span className="font-bold text-[#B89558]">
                {commuteTimes[commuteDestination].time} ({commuteTimes[commuteDestination].distance})
              </span>
            </div>
          </div>
        </div>

        {/* Right: Key Facilities List & Points of Interest */}
        <div className="lg:col-span-5 p-6 sm:p-7 rounded-3xl bg-white border border-[#E7E9ED] shadow-soft-xl">
          <h3 className="font-serif text-2xl font-bold text-[#17191C] mb-2">
            Points of Interest in {property.locality}
          </h3>
          <p className="text-xs text-[#6B7280] mb-6">
            Curated infrastructure and transit nodes surrounding this property.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {[
              { id: 'all', label: 'All Places' },
              { id: 'metro', label: 'Transit' },
              { id: 'school', label: 'Schools' },
              { id: 'hospital', label: 'Healthcare' },
              { id: 'mall', label: 'Retail' },
              { id: 'park', label: 'Parks' }
            ].map(f => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFacilityFilter(f.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  facilityFilter === f.id
                    ? 'bg-[#17191C] text-white'
                    : 'bg-[#F7F8FA] text-[#6B7280] hover:text-[#17191C] border border-[#E7E9ED]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Facilities List */}
          <div className="space-y-3">
            {filteredFacilities.map((fac, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-[#F7F8FA] border border-[#E7E9ED] hover:border-[#B89558] hover:bg-white transition flex items-center justify-between gap-3 shadow-soft-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-white border border-[#E7E9ED]">
                    {getIcon(fac.type)}
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-[#17191C]">{fac.name}</h5>
                    <span className="text-[10px] text-[#6B7280] capitalize">{fac.type}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-xs text-[#17191C] block">{fac.distance}</span>
                  <span className="text-[9px] text-emerald-600 font-semibold">Direct Route</span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[10px] text-[#9CA3AF] mt-6 pt-3.5 border-t border-[#E7E9ED]">
            * Verified neighborhood dataset. Real-time travel times may vary based on peak traffic conditions.
          </p>
        </div>
      </div>
    </section>
  );
};
