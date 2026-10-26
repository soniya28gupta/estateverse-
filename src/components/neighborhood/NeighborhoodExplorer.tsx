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
      case 'metro': return <Train className="w-4 h-4 text-sky-400" />;
      case 'school': return <School className="w-4 h-4 text-amber-400" />;
      case 'hospital': return <HeartPulse className="w-4 h-4 text-rose-400" />;
      case 'mall': return <ShoppingBag className="w-4 h-4 text-purple-400" />;
      case 'park': return <Trees className="w-4 h-4 text-emerald-400" />;
      default: return <MapPin className="w-4 h-4 text-gold-400" />;
    }
  };

  const commuteTimes: Record<string, { label: string; time: string; distance: string }> = {
    airport: { label: 'Indore Devi Ahilya Bai Holkar Airport', time: '14 mins', distance: '8.4 km' },
    tech: { label: 'TCS / Infosys IT Special Economic Zone', time: '6 mins', distance: '2.8 km' },
    city: { label: 'Central Commercial Center & Palasia', time: '18 mins', distance: '12.0 km' },
  };

  return (
    <section id="neighborhoods" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-300 text-xs font-semibold tracking-wider uppercase mb-3">
          <Compass className="w-3.5 h-3.5 text-gold-400" />
          Neighborhood Intelligence
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
          Explore the Surrounding Life
        </h2>
        <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
          Evaluate transit corridors, premier educational institutions, healthcare centers, and commute convenience before scheduling physical visits.
        </p>
      </div>

      {/* Property Selector Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6">
        {SAMPLE_PROPERTIES.map(p => (
          <button
            key={p.id}
            onClick={() => setSelectedPropertyId(p.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition border ${
              selectedPropertyId === p.id
                ? 'bg-gold-400 text-midnight-950 border-gold-300 shadow-md shadow-gold-400/20'
                : 'bg-midnight-900/80 text-stone-300 hover:text-white border-stone-800'
            }`}
          >
            {p.locality}, {p.city}
          </button>
        ))}
      </div>

      {/* Main Grid: Interactive Map Visual + Locality Facilities */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Architectural Map Canvas Visualization */}
        <div className="lg:col-span-7 rounded-2xl overflow-hidden bg-midnight-900/90 border border-gold-400/20 shadow-2xl relative min-h-[420px] flex flex-col justify-between p-6">
          {/* Simulated Dark Mode Map Grid with Radar & Pins */}
          <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#C6A76B_1px,transparent_1px)] [background-size:24px_24px]" />

          {/* Central Property Radar Pin */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="bg-midnight-950/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-gold-400/30 text-xs">
              <span className="text-gold-400 font-bold block">{property.title}</span>
              <span className="text-stone-400 text-[11px]">{property.locality}, {property.city}</span>
            </div>
            <div className="bg-midnight-950/80 px-3 py-1.5 rounded-lg border border-stone-800 text-[11px] text-stone-400">
              GPS: {property.coordinates.lat.toFixed(4)}°N, {property.coordinates.lng.toFixed(4)}°E
            </div>
          </div>

          {/* Graphical Map Representation */}
          <div className="my-auto relative flex items-center justify-center py-10">
            {/* Concentric distance rings */}
            <div className="w-72 h-72 rounded-full border border-gold-400/15 flex items-center justify-center animate-pulse-subtle">
              <div className="w-48 h-48 rounded-full border border-stone-700/40 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full border border-gold-400/30 flex items-center justify-center bg-gold-400/5">
                  <div className="w-8 h-8 rounded-full bg-gold-400 text-midnight-950 font-bold flex items-center justify-center shadow-lg shadow-gold-400/40 animate-bounce">
                    <MapPin className="w-4 h-4 fill-current" />
                  </div>
                </div>
              </div>
            </div>

            {/* Simulated Satellite Facility Markers positioned around */}
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
                  className="absolute p-2 rounded-xl bg-midnight-950/90 border border-stone-700/60 shadow-lg backdrop-blur-md flex items-center gap-2 text-[10px] text-white hover:border-gold-400 hover:scale-105 transition cursor-pointer"
                  title={`${fac.name} (${fac.distance})`}
                >
                  {getIcon(fac.type)}
                  <span className="font-semibold max-w-[100px] truncate">{fac.name}</span>
                  <span className="text-gold-300 text-[9px] font-bold">{fac.distance}</span>
                </div>
              );
            })}
          </div>

          {/* Commute Simulator Widget */}
          <div className="relative z-10 bg-midnight-950/90 backdrop-blur-md p-4 rounded-xl border border-stone-800">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-semibold text-stone-300 flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-gold-400" />
                Live Commute Estimator
              </span>
              <div className="flex gap-1.5">
                {(['airport', 'tech', 'city'] as const).map(dest => (
                  <button
                    key={dest}
                    onClick={() => setCommuteDestination(dest)}
                    className={`px-2 py-0.5 rounded text-[10px] font-medium transition ${
                      commuteDestination === dest
                        ? 'bg-gold-400 text-midnight-950 font-bold'
                        : 'bg-stone-800 text-stone-300'
                    }`}
                  >
                    {dest.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-stone-300 pt-1 border-t border-stone-800/80">
              <span className="truncate max-w-[260px] text-stone-400">
                To {commuteTimes[commuteDestination].label}
              </span>
              <span className="font-bold text-gold-300">
                {commuteTimes[commuteDestination].time} ({commuteTimes[commuteDestination].distance})
              </span>
            </div>
          </div>
        </div>

        {/* Right: Key Facilities List & Points of Interest */}
        <div className="lg:col-span-5 p-6 sm:p-7 rounded-2xl bg-midnight-900/90 border border-stone-800 backdrop-blur-xl">
          <h3 className="font-serif text-xl font-bold text-white mb-2">
            Points of Interest in {property.locality}
          </h3>
          <p className="text-xs text-stone-400 mb-5">
            Curated infrastructure data surrounding this property.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {[
              { id: 'all', label: 'All' },
              { id: 'metro', label: 'Transit' },
              { id: 'school', label: 'Schools' },
              { id: 'hospital', label: 'Healthcare' },
              { id: 'mall', label: 'Retail' },
              { id: 'park', label: 'Parks' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setFacilityFilter(f.id)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                  facilityFilter === f.id
                    ? 'bg-gold-400 text-midnight-950 font-bold'
                    : 'bg-midnight-950 text-stone-400 hover:text-white border border-stone-800'
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
                className="p-3.5 rounded-xl bg-midnight-950/70 border border-stone-800/80 hover:border-gold-400/40 transition flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-midnight-900 border border-stone-800">
                    {getIcon(fac.type)}
                  </div>
                  <div>
                    <h5 className="font-semibold text-xs text-white">{fac.name}</h5>
                    <span className="text-[10px] text-stone-400 capitalize">{fac.type}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-xs text-gold-300 block">{fac.distance}</span>
                  <span className="text-[9px] text-emerald-400">Direct Route</span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[10px] text-stone-400 mt-5 pt-3 border-t border-stone-800">
            * Labeled demo neighborhood data. Real-time driving times may vary depending on peak traffic conditions.
          </p>
        </div>
      </div>
    </section>
  );
};
