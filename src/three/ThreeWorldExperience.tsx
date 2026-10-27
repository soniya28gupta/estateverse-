import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import {
  X, Compass, Sun, Moon, Sparkles, Layers, Maximize2, Minimize2,
  Volume2, VolumeX, Eye, ArrowRight, RotateCcw, Box, Check, HelpCircle
} from 'lucide-react';
import { LuxuryVillaModel } from './LuxuryVillaModel';
import { Property, PropertyHotspot } from '../types/property';
import { SAMPLE_PROPERTIES } from '../data/properties';
import { formatINR } from '../utils/formatters';

interface ThreeWorldExperienceProps {
  property?: Property;
  onExit: () => void;
  onOpenContact?: (propertyTitle: string) => void;
}

type LightingPreset = 'golden' | 'daylight' | 'twilight';

interface CameraViewpoint {
  id: string;
  name: string;
  subtitle: string;
  caption: string;
  position: [number, number, number];
  target: [number, number, number];
  hotspotId?: string;
}

const VIEWPOINTS: CameraViewpoint[] = [
  {
    id: 'exterior',
    name: 'Exterior Architecture',
    subtitle: 'Full Facade & Cantilevers',
    caption: 'SHOT 01 // MODERN VILLA EXTERIOR — Cantilevered concrete pavilions, floating glass walls & landscaped grounds',
    position: [7.5, 3.6, 10.5],
    target: [0, 1.2, 0],
  },
  {
    id: 'pool',
    name: 'Infinity Reflection Pool',
    subtitle: 'Sunken Deck & Basalt Basin',
    caption: 'SHOT 02 // INFINITY LAP POOL — 38 ft basalt-tiled reflection pool, integrated underwater illumination & teak deck',
    position: [4.6, 1.3, 3.8],
    target: [2.8, 0.2, 1.8],
    hotspotId: 'hs-pool',
  },
  {
    id: 'living',
    name: 'Grand Living Salon',
    subtitle: 'Double-Height Glazing',
    caption: 'SHOT 03 // LIVING SALON — Double-volume 14 ft ceiling height with frameless acoustic glazing and marble plinths',
    position: [1.8, 1.6, 2.9],
    target: [0.2, 1.0, 0.8],
    hotspotId: 'hs-living',
  },
  {
    id: 'master',
    name: 'Master Sanctuary',
    subtitle: 'Cantilevered Upper Pavilion',
    caption: 'SHOT 04 // MASTER SUITE — Upper-level cantilevered glass sanctuary with timber louver shading and private terrace',
    position: [0.8, 3.4, 4.4],
    target: [-0.4, 2.7, 0.3],
    hotspotId: 'hs-master',
  },
  {
    id: 'terrace',
    name: 'Sky Lounge Terrace',
    subtitle: 'Bronze Pergola & Vistas',
    caption: 'SHOT 05 // ROOFTOP SKY LOUNGE — Bronze solar pergola with 360° horizon views and evening lantern accents',
    position: [2.2, 5.0, 1.8],
    target: [0.2, 3.8, -0.2],
    hotspotId: 'hs-terrace',
  },
  {
    id: 'garden',
    name: 'Japanese Courtyard',
    subtitle: 'Specimen Pine & Travertine',
    caption: 'SHOT 06 // COURTYARD GARDEN — Specimen pine centerpiece rooted in Italian travertine planter plinths',
    position: [-4.6, 1.5, 3.8],
    target: [-3.2, 1.2, 2.0],
    hotspotId: 'hs-garden',
  },
  {
    id: 'aerial',
    name: 'Birds-Eye Masterplan',
    subtitle: '3D Spatial Geometry',
    caption: 'SHOT 07 // AERIAL MASTERPLAN — Complete structural overview demonstrating daylight orientation and property boundaries',
    position: [12.5, 11.5, 14.5],
    target: [0, 1.0, 0],
  },
];

// Interactive Camera Director
const WorldCameraDirector: React.FC<{
  currentView: CameraViewpoint;
  autoRotate: boolean;
}> = ({ currentView, autoRotate }) => {
  const controlsRef = useRef<any>(null);
  const { camera } = useThree();

  const targetCamPos = useRef(new THREE.Vector3(...currentView.position));
  const targetCamLook = useRef(new THREE.Vector3(...currentView.target));

  useEffect(() => {
    targetCamPos.current.set(...currentView.position);
    targetCamLook.current.set(...currentView.target);
  }, [currentView]);

  useFrame(() => {
    if (controlsRef.current) {
      camera.position.lerp(targetCamPos.current, 0.045);
      controlsRef.current.target.lerp(targetCamLook.current, 0.045);
      controlsRef.current.update();
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.07}
      minDistance={3.5}
      maxDistance={24}
      maxPolarAngle={Math.PI / 2 - 0.04}
      minPolarAngle={Math.PI / 7}
      autoRotate={autoRotate}
      autoRotateSpeed={0.5}
      makeDefault
    />
  );
};

// Atmospheric Lighting & Environment Rig
const WorldAtmosphere: React.FC<{ preset: LightingPreset }> = ({ preset }) => {
  return (
    <>
      {preset === 'golden' && (
        <>
          <color attach="background" args={['#1c1611']} />
          <fog attach="fog" args={['#241a12', 15, 35]} />
          <ambientLight intensity={0.7} color="#fed7aa" />
          <directionalLight
            position={[12, 10, 8]}
            intensity={2.2}
            color="#fbbf24"
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-camera-near={0.5}
            shadow-camera-far={40}
            shadow-camera-left={-12}
            shadow-camera-right={12}
            shadow-camera-top={12}
            shadow-camera-bottom={-12}
            shadow-bias={-0.0001}
          />
          <directionalLight position={[-10, 6, -8]} intensity={0.4} color="#93c5fd" />
          <hemisphereLight groundColor="#451a03" color="#fef08a" intensity={0.5} />
        </>
      )}

      {preset === 'daylight' && (
        <>
          <color attach="background" args={['#0f172a']} />
          <fog attach="fog" args={['#1e293b', 18, 38]} />
          <ambientLight intensity={0.9} color="#f8fafc" />
          <directionalLight
            position={[8, 14, 10]}
            intensity={2.4}
            color="#ffffff"
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-bias={-0.0001}
          />
          <directionalLight position={[-8, 8, -6]} intensity={0.6} color="#bae6fd" />
          <hemisphereLight groundColor="#334155" color="#e0f2fe" intensity={0.6} />
        </>
      )}

      {preset === 'twilight' && (
        <>
          <color attach="background" args={['#080b12']} />
          <fog attach="fog" args={['#090d16', 12, 30]} />
          <ambientLight intensity={0.35} color="#60a5fa" />
          <directionalLight position={[10, 7, -6]} intensity={0.7} color="#f59e0b" castShadow />
          <directionalLight position={[-8, 9, 8]} intensity={0.5} color="#818cf8" />
          <hemisphereLight groundColor="#0f172a" color="#38bdf8" intensity={0.3} />
        </>
      )}

      {/* Floating dust motes / spatial particles */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh position={[0, 3, 0]}>
          <boxGeometry args={[0.01, 0.01, 0.01]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
      </Float>
    </>
  );
};

export const ThreeWorldExperience: React.FC<ThreeWorldExperienceProps> = ({
  property = SAMPLE_PROPERTIES[0],
  onExit,
  onOpenContact,
}) => {
  const [activeView, setActiveView] = useState<CameraViewpoint>(VIEWPOINTS[0]);
  const [lighting, setLighting] = useState<LightingPreset>('golden');
  const [autoRotate, setAutoRotate] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedHotspot, setSelectedHotspot] = useState<PropertyHotspot | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(18);
  const [showControlsHint, setShowControlsHint] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);

  // Cinematic opening sequence inspired by reference website
  useEffect(() => {
    const timer1 = setTimeout(() => setLoadProgress(65), 350);
    const timer2 = setTimeout(() => setLoadProgress(100), 750);
    const timer3 = setTimeout(() => setIsLoaded(true), 1100);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  // Keyboard navigation & ESC handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onExit();
      }
      if (e.key === '1') setActiveView(VIEWPOINTS[0]);
      if (e.key === '2') setActiveView(VIEWPOINTS[1]);
      if (e.key === '3') setActiveView(VIEWPOINTS[2]);
      if (e.key === '4') setActiveView(VIEWPOINTS[3]);
      if (e.key === '5') setActiveView(VIEWPOINTS[4]);
      if (e.key === '6') setActiveView(VIEWPOINTS[5]);
      if (e.key === '7') setActiveView(VIEWPOINTS[6]);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onExit]);

  // Lock body scroll while in 3D world
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleHotspotSelect = (hotspotId: string) => {
    const match = property.hotspots?.find(h => h.id === hotspotId);
    if (match) {
      setSelectedHotspot(match);
      // Also sync viewpoint if exists
      const vpMatch = VIEWPOINTS.find(v => v.hotspotId === hotspotId);
      if (vpMatch) setActiveView(vpMatch);
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-[#0c0d10] text-white flex flex-col select-none overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-label="EstateVerse 3D Interactive World"
    >
      {/* ── CINEMATIC WORLD OPENING SHUTTER (Reference Inspiration) ── */}
      {!isLoaded && (
        <div className="absolute inset-0 z-50 flex flex-col justify-between p-8 sm:p-12 bg-[#090b0e] text-white transition-opacity duration-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#B89558] text-white flex items-center justify-center font-bold">
                <Box className="w-4 h-4" />
              </div>
              <span className="font-display tracking-widest text-sm font-bold text-white">
                ESTATEVERSE <span className="text-[#B89558]">3D</span>
              </span>
            </div>
            <span className="text-[11px] font-mono tracking-widest uppercase text-[#B89558]">
              SPATIAL ARCHITECTURE ENGINE
            </span>
          </div>

          <div className="max-w-xl mx-auto text-center space-y-4 my-auto">
            <span className="text-xs font-mono tracking-widest text-[#B79A68] uppercase">
              ESTATEVERSE 3D
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Preparing Your Architectural Experience
            </h1>
            <p className="text-xs sm:text-sm text-[#9CA3AF] max-w-md mx-auto leading-relaxed">
              Rendering precision BIM coordinates, acoustic glazing shaders, reflection pool hydraulics, and golden-hour sun geometry.
            </p>

            {/* Loading progress bar */}
            <div className="w-64 max-w-full mx-auto h-1.5 bg-white/10 rounded-full overflow-hidden mt-6">
              <div
                className="h-full bg-gradient-to-r from-[#B79A68] to-[#E9DCBC] transition-all duration-300 ease-out"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
            <span className="text-[11px] font-mono text-[#B79A68] tracking-widest block font-semibold">
              {loadProgress}% INITIALIZING SCENE
            </span>
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#6B7280]">
            <span>Interactive WebGL 2.0 Architectural Environment</span>
            <span>Press ESC anytime to return</span>
          </div>
        </div>
      )}

      {/* ── TOP LUXURY NAVIGATION / WORLD CONTROLS ── */}
      <header className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between p-4 sm:p-6 pointer-events-none">
        {/* Left: Brand & Return */}
        <div className="flex items-center gap-3 pointer-events-auto">
          <button
            type="button"
            onClick={onExit}
            className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#17191C]/80 hover:bg-[#B89558] backdrop-blur-md border border-white/15 text-xs font-semibold text-white transition-all shadow-lg group"
            title="Return to website (Esc)"
          >
            <X className="w-4 h-4 text-[#B89558] group-hover:text-white transition-colors" />
            <span className="hidden sm:inline">Return to Website</span>
            <kbd className="hidden md:inline px-1.5 py-0.5 rounded bg-white/10 text-[10px] font-mono text-white/70">
              Esc
            </kbd>
          </button>

          <div className="hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-black/75 backdrop-blur-md border border-white/20 text-xs shadow-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold text-white" style={{ color: '#ffffff' }}>{property.title}</span>
            <span className="text-[#FAF6EE] font-medium" style={{ color: '#FAF6EE' }}>({formatINR(property.price)})</span>
          </div>
        </div>

        {/* Center: Lighting Preset Switcher */}
        <div className="pointer-events-auto flex items-center bg-black/70 backdrop-blur-md p-1 rounded-2xl border border-white/15 shadow-xl">
          <button
            type="button"
            onClick={() => setLighting('golden')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
              lighting === 'golden'
                ? 'bg-[#B89558] text-white shadow-sm'
                : 'text-white/70 hover:text-white'
            }`}
            title="Golden Hour / Sunset Lighting"
          >
            <Sun className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">Golden Hour</span>
          </button>
          <button
            type="button"
            onClick={() => setLighting('daylight')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
              lighting === 'daylight'
                ? 'bg-[#B89558] text-white shadow-sm'
                : 'text-white/70 hover:text-white'
            }`}
            title="Daylight Sun"
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-300" />
            <span className="hidden sm:inline">Daylight</span>
          </button>
          <button
            type="button"
            onClick={() => setLighting('twilight')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
              lighting === 'twilight'
                ? 'bg-[#B89558] text-white shadow-sm'
                : 'text-white/70 hover:text-white'
            }`}
            title="Twilight Atmosphere with glowing lights"
          >
            <Moon className="w-3.5 h-3.5 text-indigo-300" />
            <span className="hidden sm:inline">Twilight</span>
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            type="button"
            onClick={() => setAutoRotate(!autoRotate)}
            className={`p-2.5 rounded-2xl backdrop-blur-md border transition text-xs font-semibold flex items-center gap-1.5 ${
              autoRotate
                ? 'bg-[#B89558] text-white border-[#B89558]'
                : 'bg-black/60 text-white/80 hover:text-white border-white/15'
            }`}
            title="Toggle Automatic Orbit Rotation"
            aria-label="Auto-orbit"
          >
            <RotateCcw className={`w-4 h-4 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }} />
            <span className="hidden xl:inline">{autoRotate ? 'Orbiting' : 'Auto Orbit'}</span>
          </button>

          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-2.5 rounded-2xl bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/15 text-white/80 hover:text-white transition"
            title="Toggle Fullscreen"
            aria-label="Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {onOpenContact && (
            <button
              type="button"
              onClick={() => onOpenContact(property.title)}
              className="btn btn-gold btn-sm hidden md:inline-flex"
            >
              <span>Schedule Tour</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </header>

      {/* ── MAIN THREE.JS CANVAS VIEWPORT ── */}
      <div className="flex-1 w-full h-full relative cursor-grab active:cursor-grabbing">
        <Canvas
          shadows
          camera={{ position: activeView.position, fov: 42, near: 0.1, far: 100 }}
          gl={{
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: lighting === 'twilight' ? 1.4 : 1.15,
            powerPreference: 'high-performance'
          }}
        >
          <WorldAtmosphere preset={lighting} />

          <WorldCameraDirector
            currentView={activeView}
            autoRotate={autoRotate}
          />

          <Suspense fallback={null}>
            <LuxuryVillaModel
              activeHotspotId={selectedHotspot?.id}
              onHotspotClick={handleHotspotSelect}
            />

            {/* Room Hotspots In-Scene */}
            {property.hotspots?.map((hs) => {
              const isSelected = selectedHotspot?.id === hs.id;
              return (
                <group key={hs.id} position={hs.position}>
                  <Html center distanceFactor={11} zIndexRange={[50, 0]}>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleHotspotSelect(hs.id);
                      }}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all shadow-xl backdrop-blur-md flex items-center gap-1.5 border ${
                        isSelected
                          ? 'bg-[#B89558] text-white border-white scale-110'
                          : 'bg-black/80 text-white/90 hover:text-[#B89558] border-white/20 hover:scale-105'
                      }`}
                      title={`Inspect ${hs.name}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white animate-ping' : 'bg-[#B89558]'}`} />
                      {hs.name}
                    </button>
                  </Html>
                </group>
              );
            })}

            <ContactShadows
              position={[0, -0.65, 0]}
              opacity={0.65}
              scale={26}
              blur={2.4}
              far={8}
            />
          </Suspense>
        </Canvas>

        {/* ── FILM LETTERBOX CAPTION (Inspired by Reference) ── */}
        <div className="absolute top-20 sm:top-24 left-4 right-4 sm:left-8 pointer-events-none z-20">
          <div className="max-w-xl bg-black/75 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-white/20 text-white shadow-2xl animate-fade-in pointer-events-auto">
            <span className="text-[10px] font-mono tracking-widest text-[#E9DCBC] uppercase block mb-1 font-semibold" style={{ color: '#E9DCBC' }}>
              {activeView.subtitle}
            </span>
            <p className="font-serif text-sm sm:text-base font-bold text-white leading-snug" style={{ color: '#ffffff' }}>
              {activeView.caption}
            </p>
          </div>
        </div>

        {/* ── ACTIVE HOTSPOT SPECS POPUP ── */}
        {selectedHotspot && (
          <div className="absolute right-4 sm:right-6 bottom-28 sm:bottom-32 z-30 max-w-sm w-full bg-[#17191C]/95 backdrop-blur-xl border border-white/20 p-5 rounded-3xl shadow-2xl animate-scale-in text-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#E9DCBC]" style={{ color: '#E9DCBC' }}>
                {selectedHotspot.roomType}
              </span>
              <button
                type="button"
                onClick={() => setSelectedHotspot(null)}
                className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition"
                aria-label="Close hotspot specs"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
            <h3 className="font-serif text-xl font-bold text-white mb-1" style={{ color: '#ffffff' }}>
              {selectedHotspot.name}
            </h3>
            <p className="text-xs text-[#E5E7EB] mb-3 leading-relaxed" style={{ color: '#E5E7EB' }}>
              {selectedHotspot.description}
            </p>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 mb-3">
              <span className="text-[10px] text-white/50 block">Spatial Dimensions</span>
              <strong className="text-xs font-mono text-[#FAF6EE]">{selectedHotspot.dimensions}</strong>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {selectedHotspot.features.map((feat, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-lg bg-white/10 text-[10px] text-white/90 border border-white/10"
                >
                  {feat}
                </span>
              ))}
            </div>
            {onOpenContact && (
              <button
                type="button"
                onClick={() => onOpenContact(`${property.title} - ${selectedHotspot.name}`)}
                className="w-full btn btn-gold btn-sm justify-center"
              >
                Inquire About This Space
              </button>
            )}
          </div>
        )}
      </div>

      {/* ── BOTTOM TRAVEL BAR & CONTROL GUIDE (Inspired by Reference) ── */}
      <footer className="relative z-30 bg-black/85 backdrop-blur-xl border-t border-white/15 p-3 sm:p-4">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-3">
          {/* Viewpoints Travel Bar */}
          <nav className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto py-1 scrollbar-none" aria-label="Travel viewpoints">
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#B89558] mr-2 shrink-0 hidden sm:inline">
              TRAVEL TO:
            </span>
            {VIEWPOINTS.map((vp, index) => {
              const isActive = activeView.id === vp.id;
              return (
                <button
                  key={vp.id}
                  type="button"
                  onClick={() => {
                    setActiveView(vp);
                    if (vp.hotspotId) {
                      const h = property.hotspots?.find(item => item.id === vp.hotspotId);
                      if (h) setSelectedHotspot(h);
                    } else {
                      setSelectedHotspot(null);
                    }
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all shrink-0 flex items-center gap-1.5 border ${
                    isActive
                      ? 'bg-[#B89558] text-white border-[#B89558] shadow-md font-semibold'
                      : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border-white/10'
                  }`}
                  aria-pressed={isActive}
                >
                  <span className="text-[10px] font-mono opacity-60">0{index + 1}</span>
                  <span>{vp.name}</span>
                </button>
              );
            })}
          </nav>

          {/* Minimal Controls Hint */}
          <div className="flex items-center gap-3 text-[11px] text-white/60 shrink-0">
            <span className="hidden sm:inline">Drag to orbit</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">Scroll to zoom</span>
            <span className="hidden sm:inline">·</span>
            <span>Tap hotspots to inspect</span>
            <span>·</span>
            <button
              type="button"
              onClick={onExit}
              className="text-[#B89558] hover:text-white font-semibold underline underline-offset-2 transition-colors"
            >
              Exit 3D World (Esc)
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ThreeWorldExperience;
