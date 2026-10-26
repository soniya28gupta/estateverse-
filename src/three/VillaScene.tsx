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

  // High quality architectural fallback viewer if WebGL is unavailable or encountered an issue
  const renderFallback = () => (
    <div className={`relative w-full h-full min-h-[420px] lg:min-h-[580px] bg-gradient-to-b from-midnight-900 to-midnight-950 rounded-2xl flex flex-col justify-between p-6 overflow-hidden border border-gold-400/20 shadow-2xl ${className}`}>
      <img
        src={property.images[0]}
        alt={property.title}
        className="absolute inset-0 w-full h-full object-cover opacity-35"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-midnight-950/40 to-transparent" />

      {/* Top Tag */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-midnight-900/80 backdrop-blur-md border border-gold-400/30 text-xs font-semibold text-gold-300">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          Architectural Spatial Showcase
        </div>
        <button
          onClick={() => {
            setSceneError(false);
            setWebGlSupported(true);
          }}
          className="p-2 rounded-xl bg-midnight-900/80 text-stone-300 hover:text-white border border-stone-700 text-xs flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Retry 3D Engine
        </button>
      </div>

      {/* Interactive Hotspot Room Selector Buttons */}
      <div className="relative z-10 max-w-lg my-auto py-6">
        <h3 className="font-serif text-2xl font-bold text-white mb-2">{property.title}</h3>
        <p className="text-xs text-stone-300 mb-4 leading-relaxed">{property.description}</p>
        <div className="flex flex-wrap gap-2">
          {hotspots.map(h => (
            <button
              key={h.id}
              onClick={() => setActiveHotspot(activeHotspot?.id === h.id ? null : h)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition border ${
                activeHotspot?.id === h.id
                  ? 'bg-gold-400 text-midnight-950 border-gold-300 shadow-md'
                  : 'bg-midnight-900/80 text-stone-300 hover:text-gold-300 border-stone-800'
              }`}
            >
              {h.name}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Floating Info */}
      {activeHotspot ? (
        <div className="relative z-10 p-4 rounded-xl bg-midnight-950/90 border border-gold-400/40 text-xs">
          <div className="flex justify-between items-center mb-1">
            <span className="font-serif text-sm font-bold text-white">{activeHotspot.name}</span>
            <span className="text-[10px] text-gold-400 uppercase font-semibold">{activeHotspot.roomType}</span>
          </div>
          <p className="text-stone-300 text-[11px] mb-2">{activeHotspot.description}</p>
          <div className="text-stone-400 text-[10px]">Dimensions: <strong className="text-stone-200">{activeHotspot.dimensions}</strong></div>
        </div>
      ) : (
        <div className="relative z-10 text-xs text-stone-400">
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
            ? 'fixed inset-0 z-50 bg-midnight-950'
            : `rounded-2xl border border-gold-400/20 bg-gradient-to-b from-midnight-900 to-midnight-950 shadow-2xl ${className}`
        }`}
      >
        {/* 3D Scene Canvas */}
        <div className="w-full h-full min-h-[420px] lg:min-h-[580px]">
          <Canvas
            shadows
            camera={{ position: [7.5, 4.8, 8.5], fov: 42, near: 0.1, far: 100 }}
            gl={{
              antialias: true,
              powerPreference: 'high-performance',
              preserveDrawingBuffer: false
            }}
            onCreated={({ gl }) => {
              gl.toneMappingExposure = 1.1;
            }}
            onError={() => setSceneError(true)}
          >
            <color attach="background" args={['#0e151c']} />
            <fog attach="fog" args={['#0e151c', 14, 30]} />

            <Suspense fallback={null}>
              {/* Ambient and Sky Fill */}
              <ambientLight intensity={0.4} color="#bed6ee" />
              <hemisphereLight args={['#d6e6f7', '#1a2318', 0.5]} />

              {/* Main Sun (Golden Hour warm sunlight) */}
              <directionalLight
                position={[8, 12, 6]}
                intensity={2.2}
                color="#fff4e0"
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

              {/* Subtle Blue Rim Fill for Architecture */}
              <directionalLight position={[-8, 6, -6]} intensity={0.8} color="#7ba5d1" />

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

              {/* Soft Architectural Contact Shadow */}
              <ContactShadows
                position={[0, -0.65, 0]}
                opacity={0.75}
                scale={18}
                blur={1.8}
                far={6}
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
            className="p-2.5 rounded-xl bg-midnight-900/85 hover:bg-midnight-800 text-stone-300 hover:text-gold-300 border border-stone-700/60 backdrop-blur-md transition shadow-lg"
            title="Reset Camera View"
            aria-label="Reset Camera"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2.5 rounded-xl bg-midnight-900/85 hover:bg-midnight-800 text-stone-300 hover:text-gold-300 border border-stone-700/60 backdrop-blur-md transition shadow-lg"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen 3D Exploration'}
            aria-label="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>

        {/* 3D Status Indicator & Helper Badge */}
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-1.5 pointer-events-none">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-midnight-900/85 backdrop-blur-md border border-gold-400/30 text-xs font-medium text-gold-300 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Interactive 3D Architectural Scene
          </div>
          <p className="text-[11px] text-stone-400 pl-1 hidden sm:block">
            Drag to orbit • Scroll to zoom • Click glowing nodes to inspect rooms
          </p>
        </div>

        {/* Hotspot Room Detail Info Panel */}
        {activeHotspot && (
          <div className="absolute bottom-4 left-4 right-4 md:right-auto md:max-w-md z-20 animate-in fade-in slide-in-from-bottom-3 duration-300">
            <div className="p-4 rounded-xl bg-midnight-950/90 backdrop-blur-lg border border-gold-400/40 shadow-2xl text-stone-200">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <span className="text-[11px] font-semibold tracking-wider uppercase text-gold-400">
                    {activeHotspot.roomType}
                  </span>
                  <h4 className="font-serif text-lg text-white font-semibold">{activeHotspot.name}</h4>
                </div>
                <button
                  onClick={() => setActiveHotspot(null)}
                  className="text-stone-400 hover:text-white text-xs px-2 py-1 rounded bg-stone-800/60"
                >
                  Close
                </button>
              </div>
              <p className="text-xs text-stone-300 mb-2 leading-relaxed">{activeHotspot.description}</p>
              <div className="flex items-center gap-2 text-xs text-stone-400 border-t border-stone-800 pt-2 mb-2">
                <span className="font-medium text-stone-300">Dimensions:</span>
                <span>{activeHotspot.dimensions}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {activeHotspot.features.map((feat, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded text-[10px] bg-stone-800/80 text-gold-200 border border-stone-700"
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
            <div className="p-4 rounded-xl bg-midnight-950/85 backdrop-blur-md border border-gold-400/25 shadow-2xl transition hover:border-gold-400/50">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-gold-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-gold-400" />
                  Modern Villa
                </span>
                <span className="text-xs text-emerald-400 font-medium">Ready to Experience</span>
              </div>
              <h4 className="font-serif text-base text-white font-bold">{property.title}</h4>
              <p className="text-xs text-stone-400 mb-2">{property.locality}, {property.city}</p>
              <div className="flex items-baseline justify-between mb-3 border-y border-stone-800/80 py-2">
                <span className="font-serif text-lg font-bold text-gold-300">
                  {formatINR(property.price)}
                </span>
                <span className="text-xs text-stone-300">
                  {property.bedrooms} Beds • {property.bathrooms} Baths • {property.areaSqft.toLocaleString()} sq. ft.
                </span>
              </div>
              <Link
                to={`/property/${property.id}`}
                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-gold-400 hover:bg-gold-300 text-midnight-950 text-xs font-semibold transition"
              >
                Explore This Property
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};
