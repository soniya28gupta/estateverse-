import React, { useState, useMemo } from 'react';
import { Property } from '../../types/property';
import { formatINR } from '../../utils/formatters';
import {
  MapPin,
  Navigation,
  Compass,
  Box,
  Bed,
  Bath,
  Move,
  ArrowUpRight,
  Sparkles,
  Layers,
  ZoomIn,
  ZoomOut,
  Maximize2
} from 'lucide-react';

interface InteractivePropertyMapProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  onExplore3D?: (property: Property) => void;
}

// Center anchors for each supported metropolitan region
const CITY_CENTERS: Record<string, { lat: number; lng: number; zoomName: string }> = {
  'All Cities': { lat: 21.0, lng: 77.0, zoomName: 'National Overview' },
  'Indore': { lat: 22.75, lng: 75.87, zoomName: 'Madhya Pradesh Tech & Metro Hub' },
  'Bhopal': { lat: 23.23, lng: 77.42, zoomName: 'Upper Lake & Arera Enclave' },
  'Bengaluru': { lat: 12.98, lng: 77.65, zoomName: 'Silicon Plateau & Whitefield' },
  'Mumbai': { lat: 19.07, lng: 72.87, zoomName: 'Coastal Gateway & BKC' },
  'Delhi NCR': { lat: 28.52, lng: 77.15, zoomName: 'Golf Course Extension & Capital Corridor' },
};

export const InteractivePropertyMap: React.FC<InteractivePropertyMapProps> = ({
  properties,
  onSelectProperty,
  onExplore3D,
}) => {
  const [selectedCity, setSelectedCity] = useState<string>('All Cities');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [activePropertyId, setActivePropertyId] = useState<string>(properties[0]?.id || '');
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Filter properties according to city and type
  const visibleProperties = useMemo(() => {
    return properties.filter((p) => {
      if (selectedCity !== 'All Cities' && p.city !== selectedCity) return false;
      if (selectedType !== 'all' && p.propertyType !== selectedType) return false;
      return true;
    });
  }, [properties, selectedCity, selectedType]);

  const activeProperty = useMemo(() => {
    return properties.find((p) => p.id === activePropertyId) || visibleProperties[0] || properties[0];
  }, [properties, activePropertyId, visibleProperties]);

  // Compute normalized bounding coordinates for accurate visual positioning
  const { minLat, maxLat, minLng, maxLng } = useMemo(() => {
    if (visibleProperties.length === 0) {
      return { minLat: 12, maxLat: 29, minLng: 72, maxLng: 79 };
    }
    const lats = visibleProperties.map((p) => p.coordinates.lat);
    const lngs = visibleProperties.map((p) => p.coordinates.lng);
    return {
      minLat: Math.min(...lats) - 0.05,
      maxLat: Math.max(...lats) + 0.05,
      minLng: Math.min(...lngs) - 0.05,
      maxLng: Math.max(...lngs) + 0.05,
    };
  }, [visibleProperties]);

  const getPosition = (lat: number, lng: number) => {
    const latSpan = maxLat - minLat || 0.1;
    const lngSpan = maxLng - minLng || 0.1;
    // Invert lat for CSS top
    const topPct = 85 - ((lat - minLat) / latSpan) * 70;
    const leftPct = 12 + ((lng - minLng) / lngSpan) * 76;
    return {
      top: `${Math.max(12, Math.min(88, topPct))}%`,
      left: `${Math.max(10, Math.min(90, leftPct))}%`,
    };
  };

  return (
    <section id="interactive-map" className="py-20 lg:py-24 bg-white border-b border-[#E7E9ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF6EE] border border-[#E9DCBC] text-[#8C734B] text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase mb-3 shadow-xs">
              <Compass className="w-3.5 h-3.5 text-[#B79A68]" />
              <span>SPATIAL LOCATION DISCOVERY</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#171717] tracking-tight">
              Interactive Architectural Map
            </h2>
            <p className="text-[#666666] text-sm sm:text-base mt-2 max-w-2xl font-normal leading-relaxed">
              Explore property locations across premier metropolitan corridors with verified coordinates, proximity markers, and direct 3D spatial previews.
            </p>
          </div>

          {/* City Selector Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {Object.keys(CITY_CENTERS).map((city) => (
              <button
                key={city}
                type="button"
                onClick={() => setSelectedCity(city)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                  selectedCity === city
                    ? 'bg-[#171717] text-white border-[#171717] shadow-sm'
                    : 'bg-[#F7F8FA] text-[#6B7280] hover:text-[#171717] border-[#E7E9ED]'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Map Container & Preview Card Layout */}
        <div className="relative w-full h-[580px] sm:h-[640px] rounded-3xl overflow-hidden border border-[#EAE7E0] bg-[#F7F8FA] shadow-soft-xl">
          {/* Architectural Cartography Grid Pattern */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              backgroundImage: `radial-gradient(#CBD5E1 1px, transparent 1px), linear-gradient(to right, #F1F5F9 1px, transparent 1px), linear-gradient(to bottom, #F1F5F9 1px, transparent 1px)`,
              backgroundSize: '40px 40px, 120px 120px, 120px 120px',
            }}
          />

          {/* Simulated Cartographic Contour & Road Arteries */}
          <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <path d="M 0,180 Q 300,120 600,280 T 1200,320" fill="none" stroke="#94A3B8" strokeWidth="2.5" strokeDasharray="6 4" />
            <path d="M 200,0 Q 400,350 700,450 T 1300,600" fill="none" stroke="#94A3B8" strokeWidth="3" />
            <path d="M 100,500 Q 550,420 900,150 T 1400,80" fill="none" stroke="#CBD5E1" strokeWidth="2" />
            <circle cx="450" cy="280" r="160" fill="none" stroke="#E2E8F0" strokeWidth="1.5" />
            <circle cx="850" cy="360" r="220" fill="none" stroke="#E2E8F0" strokeWidth="1.5" />
          </svg>

          {/* Top Left Status & Map Controls */}
          <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2">
            <div className="px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-[#EAE7E0] text-xs font-semibold text-[#171717] shadow-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{visibleProperties.length} Properties Displayed</span>
            </div>

            {/* Type Filter */}
            <div className="bg-white/95 backdrop-blur-md rounded-xl border border-[#EAE7E0] px-2.5 py-1 text-xs font-semibold shadow-xs flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#8C734B]" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="bg-transparent text-xs font-medium text-[#171717] focus:outline-none cursor-pointer"
                aria-label="Filter by property type"
              >
                <option value="all">All Types</option>
                <option value="villa">Villas</option>
                <option value="apartment">Apartments</option>
                <option value="house">Houses</option>
              </select>
            </div>
          </div>

          {/* Top Right Zoom HUD */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-white/95 backdrop-blur-md p-1 rounded-xl border border-[#EAE7E0] shadow-xs">
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.min(2, z + 0.2))}
              className="p-1.5 rounded-lg hover:bg-[#F7F8FA] text-[#6B7280] hover:text-[#171717] transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.2))}
              className="p-1.5 rounded-lg hover:bg-[#F7F8FA] text-[#6B7280] hover:text-[#171717] transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
          </div>

          {/* Interactive Property Markers */}
          <div
            className="absolute inset-0 transition-transform duration-500 ease-out"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            {visibleProperties.map((prop) => {
              const pos = getPosition(prop.coordinates.lat, prop.coordinates.lng);
              const isActive = prop.id === activeProperty?.id;

              return (
                <div
                  key={prop.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-300"
                  style={{ top: pos.top, left: pos.left }}
                >
                  <button
                    type="button"
                    onClick={() => setActivePropertyId(prop.id)}
                    className={`group relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-full transition-all duration-300 ${
                      isActive
                        ? 'bg-[#171717] text-white shadow-xl scale-110 z-30 ring-4 ring-[#B79A68]/30'
                        : 'bg-white text-[#171717] shadow-md hover:shadow-lg hover:scale-105 border border-[#EAE7E0]'
                    }`}
                    data-cursor="Inspect Property"
                    aria-label={`View ${prop.title}`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isActive ? 'bg-[#B79A68] animate-ping' : 'bg-emerald-500'
                      }`}
                    />
                    <span className="text-[11px] font-bold tracking-tight">
                      {formatINR(prop.price)}
                    </span>
                    {prop.has3DTour && (
                      <Box className={`w-3 h-3 ${isActive ? 'text-[#B79A68]' : 'text-[#8C734B]'}`} />
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Bottom Floating Property Preview Panel */}
          {activeProperty && (
            <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-30 p-4 sm:p-5 rounded-2xl bg-white/98 backdrop-blur-md border border-[#EAE7E0] shadow-2xl transition-all duration-300">
              <div className="flex gap-4 items-center">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-stone-100 shrink-0 relative">
                  <img
                    src={activeProperty.images[0]}
                    alt={activeProperty.title}
                    className="w-full h-full object-cover"
                  />
                  {activeProperty.has3DTour && (
                    <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded-md bg-[#171717]/90 text-white text-[9px] font-bold flex items-center gap-1 backdrop-blur-xs">
                      <Box className="w-2.5 h-2.5 text-[#B79A68]" />
                      3D
                    </span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-[#8C734B] truncate">
                      {activeProperty.locality}, {activeProperty.city}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 shrink-0">
                      {activeProperty.listingStatus}
                    </span>
                  </div>

                  <h4 className="font-serif text-base sm:text-lg font-bold text-[#171717] truncate leading-tight">
                    {activeProperty.title}
                  </h4>

                  <div className="font-serif text-lg font-bold text-[#171717] mt-0.5 mb-2">
                    {formatINR(activeProperty.price)}
                  </div>

                  <div className="flex items-center gap-3 text-[11px] text-[#666666]">
                    <span className="flex items-center gap-1">
                      <Bed className="w-3.5 h-3.5 text-[#9CA3AF]" />
                      {activeProperty.bedrooms} Beds
                    </span>
                    <span className="flex items-center gap-1">
                      <Bath className="w-3.5 h-3.5 text-[#9CA3AF]" />
                      {activeProperty.bathrooms} Baths
                    </span>
                    <span className="flex items-center gap-1">
                      <Move className="w-3.5 h-3.5 text-[#9CA3AF]" />
                      {activeProperty.areaSqft} sqft
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[#F0EFEA]">
                <button
                  type="button"
                  onClick={() => onSelectProperty(activeProperty)}
                  className="flex-1 h-9 rounded-xl bg-[#171717] hover:bg-[#B79A68] text-white text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <span>VIEW FULL DETAILS</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                </button>

                {activeProperty.has3DTour && onExplore3D && (
                  <button
                    type="button"
                    onClick={() => onExplore3D(activeProperty)}
                    className="h-9 px-4 rounded-xl bg-[#FAF6EE] hover:bg-[#EAE4D2] text-[#8C734B] text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 border border-[#E9DCBC]"
                  >
                    <Box className="w-3.5 h-3.5 text-[#B79A68]" />
                    <span>3D TOUR</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
