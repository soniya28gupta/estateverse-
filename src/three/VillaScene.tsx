import React, { useState, Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import { LuxuryVillaModel } from './LuxuryVillaModel';
import { PropertyHotspots } from './PropertyHotspots';
import { CameraRig } from './CameraRig';
import { Property, PropertyHotspot } from '../types/property';
import {
  Maximize2, Minimize2, RotateCcw, Sparkles, ZoomIn, ZoomOut,
  X, Compass, Eye, RefreshCw
} from 'lucide-react';
import { formatINR } from '../utils/formatters';
import { ErrorBoundary } from '../components/ui/ErrorBoundary';

interface VillaSceneProps {
  property: Property;
  className?: string;
  showPropertyOverlay?: boolean;
}

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
  showPropertyOverlay = false
}) => {
  const [activeHotspot, setActiveHotspot] = useState<PropertyHotspot | null>(null);
  const [resetCount, setResetCount] = useState(0);
  const [zoomInCount, setZoomInCount] = useState(0);
  const [zoomOutCount, setZoomOutCount] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [webGlSupported, setWebGlSupported] = useState<boolean>(true);
  const [sceneError, setSceneError] = useState<boolean>(false);

  useEffect(() => {
    setWebGlSupported(isWebGLAvailable());
  }, []);

  // Escape key closes fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isFullscreen) setIsFullscreen(false);
        else if (activeHotspot) setActiveHotspot(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, activeHotspot]);

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

  const handleZoomIn = () => {
    setZoomInCount(c => c + 1);
  };

  const handleZoomOut = () => {
    setZoomOutCount(c => c + 1);
  };

  // High quality architectural fallback viewer if WebGL is unavailable
  const renderFallback = () => (
    <div className={`relative w-full h-full min-h-[460px] bg-[#F8F7F4] rounded-3xl flex flex-col justify-between p-6 overflow-hidden border border-[#E7E9ED] shadow-soft-xl ${className}`}>
      <img
        src={property.images[0]}
        alt={property.title}
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />

      {/* Top Tag */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#E7E9ED] text-xs font-semibold text-[#17191C] shadow-soft">
          <Sparkles className="w-3.5 h-3.5 text-[#B79A68]" />
          Architectural Spatial Showcase
        </div>
        <button
          onClick={() => {
            setSceneError(false);
            setWebGlSupported(true);
          }}
          className="p-2 rounded-xl bg-white/95 text-[#17191C] hover:text-[#B79A68] border border-[#E7E9ED] text-xs font-medium flex items-center gap-1.5 shadow-soft transition"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Retry 3D Engine
        </button>
      </div>

      <div className="relative z-10 max-w-lg my-auto py-6">
        <h3 className="font-serif text-2xl font-bold text-[#17191C] mb-2">{property.title}</h3>
        <p className="text-xs text-[#777777] mb-4 leading-relaxed">{property.description}</p>
        <div className="flex flex-wrap gap-2">
          {hotspots.map(h => (
            <button
              key={h.id}
              onClick={() => setActiveHotspot(activeHotspot?.id === h.id ? null : h)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition border ${
                activeHotspot?.id === h.id
                  ? 'bg-[#B79A68] text-white border-[#B79A68] shadow-md'
                  : 'bg-white text-[#17191C] hover:text-[#B79A68] border-[#E7E9ED]'
              }`}
            >
              {h.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  if (!webGlSupported || sceneError) {
    return renderFallback();
  }

  return (
    <ErrorBoundary name="VillaScene" fallback={renderFallback()}>
      <div
        className={`relative w-full h-full overflow-hidden select-none ${
          isFullscreen
            ? 'fixed inset-0 z-50 bg-[#0c0d10] w-screen h-screen'
            : `rounded-3xl border border-[#E7E9ED] bg-[#dbe6f0] shadow-soft-xl ${className}`
        }`}
      >
        {/* ── 3D SCENE CANVAS (Fills 100% of container height & width) ── */}
        <div className="w-full h-full relative">
          <Canvas
            shadows
            camera={{ position: [7.2, 3.2, 9.6], fov: 38, near: 0.1, far: 120 }}
            gl={{
              antialias: true,
              powerPreference: 'high-performance',
              preserveDrawingBuffer: false,
            }}
            onCreated={({ gl }) => {
              gl.toneMappingExposure = 1.1;
            }}
            onError={() => setSceneError(true)}
          >
            {/* Luminous Natural Sky Atmosphere with Soft Horizon Fog */}
            <color attach="background" args={['#dbe7f2']} />
            <fog attach="fog" args={['#d6e3ee', 24, 70]} />

            <Suspense fallback={null}>
              {/* Natural Daylight Ambient & Sky Fill */}
              <ambientLight intensity={0.7} color="#ffffff" />
              <hemisphereLight args={['#f8fafc', '#94a3b8', 0.6]} />

              {/* Natural Golden Sunlight with Crisp Architectural Shadows */}
              <directionalLight
                position={[10, 14, 7]}
                intensity={2.3}
                color="#fff8ed"
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-camera-near={0.5}
                shadow-camera-far={42}
                shadow-camera-left={-12}
                shadow-camera-right={12}
                shadow-camera-top={12}
                shadow-camera-bottom={-12}
                shadow-bias={-0.0003}
              />

              {/* Gentle Cool Blue Rim Fill */}
              <directionalLight position={[-10, 8, -8]} intensity={0.65} color="#bae6fd" />

              {/* Contemporary Luxury Villa Geometry with Expansive Grounds */}
              <LuxuryVillaModel
                onHotspotClick={handleHotspotClick}
                activeHotspotId={activeHotspot?.id || null}
              />

              {/* Sleek, Non-Obtrusive 3D Hotspot Pins */}
              <PropertyHotspots
                hotspots={hotspots}
                activeHotspotId={activeHotspot?.id || null}
                onSelectHotspot={(hotspot) => {
                  setActiveHotspot(prev => (prev?.id === hotspot.id ? null : hotspot));
                }}
              />

              {/* Soft Ground Contact Shadow */}
              <ContactShadows
                position={[0, -0.65, 0]}
                opacity={0.4}
                scale={36}
                blur={2.0}
                far={8}
                color="#0f172a"
              />

              {/* Camera Controller with Proper Framing and Zoom Controls */}
              <CameraRig
                activeHotspot={activeHotspot}
                resetSignal={resetCount}
                zoomInSignal={zoomInCount}
                zoomOutSignal={zoomOutCount}
              />
            </Suspense>
          </Canvas>
        </div>

        {/* ── TOP-LEFT: STATUS BADGE ── */}
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-20 flex items-center gap-2 pointer-events-none">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#E7E9ED] text-[11px] sm:text-xs font-semibold text-[#17191C] shadow-soft">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="hidden sm:inline">Interactive 3D Architectural Scene</span>
            <span className="sm:hidden">3D Interactive</span>
          </div>
        </div>

        {/* ── TOP-RIGHT: VIEWER TOOLBAR (RESET, ZOOM IN, ZOOM OUT, FULLSCREEN) ── */}
        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20 flex items-center gap-1 sm:gap-1.5 bg-white/95 backdrop-blur-md p-1 rounded-2xl border border-[#E7E9ED] shadow-soft">
          <button
            type="button"
            onClick={handleReset}
            className="p-1.5 sm:p-2 rounded-xl text-[#17191C] hover:text-[#B79A68] hover:bg-[#F8F7F4] transition"
            title="Reset Camera View"
            aria-label="Reset Camera View"
          >
            <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          <button
            type="button"
            onClick={handleZoomIn}
            className="p-1.5 sm:p-2 rounded-xl text-[#17191C] hover:text-[#B79A68] hover:bg-[#F8F7F4] transition"
            title="Zoom In"
            aria-label="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          <button
            type="button"
            onClick={handleZoomOut}
            className="p-1.5 sm:p-2 rounded-xl text-[#17191C] hover:text-[#B79A68] hover:bg-[#F8F7F4] transition"
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 sm:p-2 rounded-xl text-[#17191C] hover:text-[#B79A68] hover:bg-[#F8F7F4] transition"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
          </button>

          {isFullscreen && (
            <button
              type="button"
              onClick={() => setIsFullscreen(false)}
              className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-[#17191C] text-white hover:bg-[#B79A68] text-xs font-semibold flex items-center gap-1.5 transition ml-0.5"
            >
              <X className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Exit (Esc)</span>
            </button>
          )}
        </div>

        {/* ── BOTTOM-CENTER: CONCISE INSTRUCTIONS ── */}
        <div className="absolute bottom-3 sm:bottom-4 left-0 right-0 z-10 flex justify-center pointer-events-none px-3">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:py-1.5 rounded-full bg-black/65 backdrop-blur-md border border-white/15 text-white/90 text-[10px] sm:text-[11px] font-medium shadow-soft">
            <span className="hidden sm:inline">Drag to rotate · Scroll to zoom · Select hotspots to explore</span>
            <span className="sm:hidden">Drag to orbit · Tap pins for details</span>
          </div>
        </div>

        {/* ── BOTTOM-LEFT: REFINED FLOATING FEATURE PANEL (Only when hotspot active) ── */}
        {activeHotspot && (
          <div className="absolute bottom-12 sm:bottom-14 left-3 right-3 sm:left-4 sm:right-auto sm:max-w-sm z-20 animate-fade-in pointer-events-auto">
            <div className="p-4 sm:p-5 rounded-2xl bg-white/95 backdrop-blur-xl border border-[#B79A68]/40 shadow-2xl text-[#17191C]">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-[#B79A68] block">
                    {activeHotspot.roomType}
                  </span>
                  <h4 className="font-serif text-base sm:text-lg font-bold text-[#17191C] leading-snug">
                    {activeHotspot.name}
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveHotspot(null)}
                  className="p-1.5 rounded-lg text-[#777777] hover:text-[#17191C] hover:bg-neutral-100 transition"
                  aria-label="Close feature details"
                  title="Close feature details"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-[#777777] mb-3 leading-relaxed font-normal">
                {activeHotspot.description}
              </p>

              <div className="p-2 sm:p-2.5 rounded-xl bg-[#F8F7F4] border border-[#E7E9ED] text-xs flex justify-between items-center mb-3">
                <span className="text-[11px] text-[#777777]">Dimensions:</span>
                <strong className="text-xs font-semibold text-[#17191C]">{activeHotspot.dimensions}</strong>
              </div>

              <div className="flex flex-wrap gap-1 sm:gap-1.5">
                {activeHotspot.features.map((feat, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-lg bg-white border border-[#E7E9ED] text-[10px] font-medium text-[#17191C]"
                  >
                    {feat}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};
