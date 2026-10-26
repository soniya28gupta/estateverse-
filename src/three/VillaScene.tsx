import React, { useState, Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import { LuxuryVillaModel } from './LuxuryVillaModel';
import { PropertyHotspots } from './PropertyHotspots';
import { CameraRig } from './CameraRig';
import { Property, PropertyHotspot } from '../types/property';
import { Maximize2, Minimize2, RotateCcw, Sparkles, Layers, Info, ArrowUpRight, AlertCircle, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatINR } from '../utils/formatters';
import { ErrorBoundary } from '../components/ui/ErrorBoundary';

interface VillaSceneProps {
  property: Property;
  className?: string;
  showPropertyOverlay?: boolean;
}

// Function to safely detect WebGL support
function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

export const VillaScene: React.FC<VillaSceneProps> = ({
  property,
  className = '',
  showPropertyOverlay = true
}) => {
  const [activeHotspot, setActiveHotspot] = useState<PropertyHotspot | null>(null);
  const [resetCount, setResetCount] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [webGlSupported, setWebGlSupported] = useState<boolean>(true);
  const [sceneError, setSceneError] = useState<boolean>(false);

  useEffect(() => {
    setWebGlSupported(isWebGLAvailable());
  }, []);

  const hotspots = property.hotspots || [];

  const handleHotspotClick = (hotspotId: string) => {
    const found = hotspots.find(h => h.id === hotspotId);
    if (found) {
      setActiveHotspot(prev => (prev?.id === hotspotId ? null : found));
    }
  };

  const handleReset = () => {
    setActiveHotspot(null);
    setResetCount(c => c + 1);
  };

  // High quality architectural fallback viewer if WebGL is unavailable
  const renderFallback = () => (
    <div className={`relative w-full h-full min-h-[440px] lg:min-h-[580px] bg-[#F7F8FA] rounded-3xl flex flex-col justify-between p-6 overflow-hidden border border-[#E7E9ED] shadow-soft-xl ${className}`}>
      <img
        src={property.images[0]}
        alt={property.title}
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />

      {/* Top Tag */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#E7E9ED] text-xs font-semibold text-[#17191C] shadow-soft">
          <Sparkles className="w-3.5 h-3.5 text-[#B89558]" />
          Architectural Spatial Showcase
        </div>
        <button
          onClick={() => {
            setSceneError(false);
            setWebGlSupported(true);
          }}
          className="p-2 rounded-xl bg-white/90 text-[#17191C] hover:text-[#B89558] border border-[#E7E9ED] text-xs font-medium flex items-center gap-1.5 shadow-soft transition"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Retry 3D Engine
        </button>
      </div>

      {/* Interactive Hotspot Room Selector Buttons */}
      <div className="relative z-10 max-w-lg my-auto py-6">
        <h3 className="font-serif text-2xl font-bold text-[#17191C] mb-2">{property.title}</h3>
        <p className="text-xs text-[#6B7280] mb-4 leading-relaxed">{property.description}</p>
        <div className="flex flex-wrap gap-2">
          {hotspots.map(h => (
            <button
              key={h.id}
              onClick={() => setActiveHotspot(activeHotspot?.id === h.id ? null : h)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition border ${
                activeHotspot?.id === h.id
                  ? 'bg-[#B89558] text-white border-[#B89558] shadow-md'
                  : 'bg-white text-[#17191C] hover:text-[#B89558] border-[#E7E9ED]'
              }`}
            >
              {h.name}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Floating Info */}
      {activeHotspot ? (
        <div className="relative z-10 p-4 rounded-2xl bg-white border border-[#E7E9ED] text-xs shadow-soft-xl">
          <div className="flex justify-between items-center mb-1">
            <span className="font-serif text-sm font-bold text-[#17191C]">{activeHotspot.name}</span>
            <span className="text-[10px] text-[#B89558] uppercase font-semibold">{activeHotspot.roomType}</span>
          </div>
          <p className="text-[#6B7280] text-[11px] mb-2">{activeHotspot.description}</p>
          <div className="text-[#6B7280] text-[10px]">Dimensions: <strong className="text-[#17191C]">{activeHotspot.dimensions}</strong></div>
        </div>
      ) : (
        <div className="relative z-10 text-xs text-[#6B7280]">
          Showing 3D architectural gallery view. All specs, room configurations & pricing are fully interactive.
        </div>
      )}
    </div>
  );

  if (!webGlSupported || sceneError) {
    return renderFallback();
  }

  return (
    <ErrorBoundary
      name="VillaScene"
      fallback={renderFallback()}
    >
      <div
        className={`relative w-full overflow-hidden select-none ${
          isFullscreen
            ? 'fixed inset-0 z-50 bg-[#F7F8FA]'
            : `rounded-3xl border border-[#E7E9ED] bg-[#F7F8FA] shadow-soft-xl ${className}`
        }`}
      >
        {/* 3D Scene Canvas */}
        <div className="w-full h-full min-h-[440px] lg:min-h-[580px]">
          <Canvas
            shadows
            camera={{ position: [6, 2.8, 9], fov: 40, near: 0.1, far: 100 }}
            gl={{
              antialias: true,
              powerPreference: 'high-performance',
              preserveDrawingBuffer: false
            }}
            onCreated={({ gl }) => {
              gl.toneMappingExposure = 1.05;
            }}
            onError={() => setSceneError(true)}
          >
            {/* Luminous Daylight Architectural Sky */}
            <color attach="background" args={['#edf3f8']} />
            <fog attach="fog" args={['#edf3f8', 18, 38]} />

            <Suspense fallback={null}>
              {/* Natural Daylight Ambient and Sky Fill */}
              <ambientLight intensity={0.65} color="#ffffff" />
              <hemisphereLight args={['#f8fafc', '#e2e8f0', 0.55]} />

              {/* Natural Golden Sunlight */}
              <directionalLight
                position={[8, 12, 6]}
                intensity={2.2}
                color="#fff8ed"
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-camera-near={0.5}
                shadow-camera-far={32}
                shadow-camera-left={-7}
                shadow-camera-right={7}
                shadow-camera-top={7}
                shadow-camera-bottom={-7}
                shadow-bias={-0.0005}
              />

              {/* Subtle Blue Sky Rim Fill */}
              <directionalLight position={[-8, 6, -6]} intensity={0.6} color="#cce3f5" />

              {/* Contemporary Villa Geometry */}
              <LuxuryVillaModel
                onHotspotClick={handleHotspotClick}
                activeHotspotId={activeHotspot?.id || null}
              />

              {/* 3D Hotspot Pins */}
              <PropertyHotspots
                hotspots={hotspots}
                activeHotspotId={activeHotspot?.id || null}
                onSelectHotspot={(hotspot) => {
                  setActiveHotspot(prev => (prev?.id === hotspot.id ? null : hotspot));
                }}
              />

              {/* Soft Architectural Contact Shadow on Ground */}
              <ContactShadows
                position={[0, -0.65, 0]}
                opacity={0.35}
                scale={20}
                blur={1.8}
                far={6}
                color="#1e293b"
              />

              {/* Camera Controller */}
              <CameraRig activeHotspot={activeHotspot} resetSignal={resetCount} />
            </Suspense>
          </Canvas>
        </div>

        {/* Floating 3D Controls Toolbar */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <button
            onClick={handleReset}
            className="p-2.5 rounded-2xl bg-white/95 hover:bg-white text-[#17191C] hover:text-[#B89558] border border-[#E7E9ED] backdrop-blur-md transition shadow-soft hover:shadow-md"
            title="Reset Camera View"
            aria-label="Reset Camera"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2.5 rounded-2xl bg-white/95 hover:bg-white text-[#17191C] hover:text-[#B89558] border border-[#E7E9ED] backdrop-blur-md transition shadow-soft hover:shadow-md"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen 3D Exploration'}
            aria-label="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>

        {/* 3D Status Indicator & Helper Badge */}
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-1.5 pointer-events-none">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#E7E9ED] text-xs font-semibold text-[#17191C] shadow-soft">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Interactive 3D Architectural Scene
          </div>
          <p className="text-[11px] text-[#6B7280] font-medium pl-1 hidden sm:block drop-shadow-sm">
            Drag to orbit • Scroll to zoom • Click glowing nodes to inspect rooms
          </p>
        </div>

        {/* Hotspot Room Detail Info Panel */}
        {activeHotspot && (
          <div className="absolute bottom-4 left-4 right-4 md:right-auto md:max-w-md z-20 animate-in fade-in slide-in-from-bottom-3 duration-300">
            <div className="p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-[#E7E9ED] shadow-soft-xl text-[#17191C]">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <span className="text-[11px] font-semibold tracking-wider uppercase text-[#B89558]">
                    {activeHotspot.roomType}
                  </span>
                  <h4 className="font-serif text-lg text-[#17191C] font-semibold">{activeHotspot.name}</h4>
                </div>
                <button
                  onClick={() => setActiveHotspot(null)}
                  className="text-[#6B7280] hover:text-[#17191C] text-xs px-2 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 transition"
                >
                  Close
                </button>
              </div>
              <p className="text-xs text-[#6B7280] mb-2 leading-relaxed">{activeHotspot.description}</p>
              <div className="flex items-center gap-2 text-xs text-[#6B7280] border-t border-[#E7E9ED] pt-2 mb-2">
                <span className="font-medium text-[#17191C]">Dimensions:</span>
                <span>{activeHotspot.dimensions}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {activeHotspot.features.map((feat, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-[#F7F8FA] text-[#17191C] border border-[#E7E9ED]"
                  >
                    {feat}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Floating Property Summary Card */}
        {showPropertyOverlay && !activeHotspot && (
          <div className="absolute bottom-4 right-4 max-w-sm hidden md:block z-20">
            <div className="p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-[#E7E9ED] shadow-soft-xl transition hover:border-[#D3D6DC]">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#B89558] flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#B89558]" />
                  Signature Contemporary Villa
                </span>
                <span className="text-xs text-emerald-600 font-medium">Ready to Experience</span>
              </div>
              <h4 className="font-serif text-base text-[#17191C] font-bold">{property.title}</h4>
              <p className="text-xs text-[#6B7280] mb-2">{property.locality}, {property.city}</p>
              <div className="flex items-baseline justify-between mb-3 border-y border-[#E7E9ED] py-2">
                <span className="font-serif text-lg font-bold text-[#B89558]">
                  {formatINR(property.price)}
                </span>
                <span className="text-xs text-[#6B7280]">
                  {property.bedrooms} Beds • {property.bathrooms} Baths • {property.areaSqft.toLocaleString()} sq. ft.
                </span>
              </div>
              <Link
                to={`/property/${property.id}`}
                className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#17191C] hover:bg-[#B89558] text-white text-xs font-semibold transition duration-200 shadow-sm"
              >
                Explore Specifications
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};
