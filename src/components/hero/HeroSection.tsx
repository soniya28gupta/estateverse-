import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Box, Sun, Moon, Sunrise, Layers, Eye, RotateCcw, Sparkles } from 'lucide-react';
import { FilterState } from '../search/PropertySearch';
import { InteractiveHeroCanvas, LightingMode } from '../../three/InteractiveHeroCanvas';
import { useWebGLSupport } from '../../hooks/useWebGLSupport';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import gsap from 'gsap';

interface HeroSectionProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onResetFilters: () => void;
  resultCount: number;
  onExploreClick: () => void;
  onEnter3DWorld: () => void;
}

const HERO_HOTSPOTS = [
  { id: 'hs-pool', label: 'Reflection Pool' },
  { id: 'hs-living', label: 'Glass Pavilion' },
  { id: 'hs-master', label: 'Master Cantilever' },
  { id: 'hs-lounge', label: 'Sunken Lounge' },
  { id: 'hs-garden', label: 'Zen Courtyard' },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onEnter3DWorld,
}) => {
  const isWebGL = useWebGLSupport();
  const reducedMotion = useReducedMotion();

  // 3D Scene Controls State
  const [lightingMode, setLightingMode] = useState<LightingMode>('golden');
  const [isExploded, setIsExploded] = useState<boolean>(false);
  const [isWireframe, setIsWireframe] = useState<boolean>(false);
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);

  // Animation refs
  const heroRootRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);

  // GSAP Intro Reveal
  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1.1 } });

      tl.from(badgeRef.current, {
        y: -18,
        opacity: 0,
        duration: 0.8,
      })
      .from(headlineRef.current, {
        y: 32,
        opacity: 0,
        duration: 1.2,
      }, '-=0.5')
      .from(descRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.9,
      }, '-=0.7')
      .from(ctaRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.9,
      }, '-=0.6')
      .from(hudRef.current, {
        opacity: 0,
        y: 15,
        duration: 0.8,
      }, '-=0.4');
    }, heroRootRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={heroRootRef}
      className="relative w-full min-h-[92vh] lg:min-h-[96vh] flex flex-col justify-between bg-white overflow-hidden select-none"
      aria-label="EstateVerse 3D Architectural Experience"
    >
      {/* Background Architectural Subtle Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(#171717 1px, transparent 1px), linear-gradient(90deg, #171717 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
        aria-hidden="true"
      />

      {/* Warm ambient vignette */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(ellipse_at_top,_rgba(183,154,104,0.08)_0%,_transparent_75%)] pointer-events-none" />

      {/* ── TOP EDITORIAL CONTENT (Floating gracefully above 3D building) ── */}
      <div className="relative z-10 pt-10 sm:pt-14 pb-4 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        {/* Eyebrow Badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF6EE] border border-[#E9DCBC] text-[#8C734B] text-[10px] sm:text-xs font-semibold tracking-[0.22em] uppercase shadow-xs mb-4"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#B79A68] animate-pulse" />
          <span>SIGNATURE ARCHITECTURE · REAL-TIME 3D</span>
        </div>

        {/* Editorial Headline */}
        <h1
          ref={headlineRef}
          className="font-serif text-[#171717] tracking-tight leading-[1.08] max-w-4xl mx-auto mb-4"
          style={{ fontSize: 'clamp(2.4rem, 5.2vw, 4.6rem)' }}
        >
          Discover Spaces{' '}
          <span className="font-serif italic font-normal text-[#B79A68]">
            Beyond Ordinary.
          </span>
        </h1>

        {/* Subtitle */}
        <p
          ref={descRef}
          className="text-[#555555] text-sm sm:text-base md:text-lg font-normal max-w-2xl mx-auto mb-6 leading-relaxed"
        >
          Explore exceptional properties through an immersive real estate experience powered by real-time 3D spatial models and architectural precision.
        </p>

        {/* Primary CTAs */}
        <div
          ref={ctaRef}
          className="flex flex-wrap items-center justify-center gap-3.5 max-w-md mx-auto"
        >
          <button
            type="button"
            onClick={onExploreClick}
            className="h-12 px-8 rounded-2xl bg-[#171717] hover:bg-[#B79A68] text-white font-semibold text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2.5 shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] group"
          >
            <span>EXPLORE PROPERTIES</span>
            <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            type="button"
            onClick={onEnter3DWorld}
            className="h-12 px-7 rounded-2xl bg-[#FAF6EE] hover:bg-[#EAE4D2] text-[#8C734B] font-semibold text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 border border-[#E9DCBC] shadow-xs hover:scale-[1.02] active:scale-[0.98]"
          >
            <Box className="w-4 h-4 text-[#B79A68]" />
            <span>FULLSCREEN 3D TOUR</span>
          </button>
        </div>
      </div>

      {/* ── 3D ARCHITECTURAL CANVAS INTEGRATED SEAMLESSLY ── */}
      <div className="relative w-full flex-1 min-h-[440px] sm:min-h-[500px] lg:min-h-[560px] flex items-center justify-center">
        {isWebGL ? (
          <InteractiveHeroCanvas
            lightingMode={lightingMode}
            isExploded={isExploded}
            isWireframe={isWireframe}
            activeHotspotId={activeHotspotId}
            onHotspotSelect={(id) => setActiveHotspotId(prev => prev === id ? null : id)}
            className="w-full h-full"
          />
        ) : (
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80"
              alt="Luxury Architectural Pavilion"
              className="w-full h-full object-cover max-h-[500px] rounded-3xl opacity-90 shadow-2xl"
            />
          </div>
        )}

        {/* ── INTERACTIVE 3D HUD CONTROLS (Floating minimal toolbar) ── */}
        <div
          ref={hudRef}
          className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 w-[94%] max-w-4xl flex flex-wrap items-center justify-between gap-3 p-2.5 sm:p-3 rounded-2xl bg-white/90 backdrop-blur-md border border-[#E7E9ED] shadow-xl"
        >
          {/* Lighting Mode Selector */}
          <div className="flex items-center gap-1 bg-[#F7F8FA] p-1 rounded-xl border border-[#E7E9ED]">
            <button
              type="button"
              onClick={() => setLightingMode('golden')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                lightingMode === 'golden'
                  ? 'bg-white text-[#8C734B] shadow-xs'
                  : 'text-[#6B7280] hover:text-[#171717]'
              }`}
              title="Golden Hour Lighting"
            >
              <Sunrise className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden sm:inline">Golden</span>
            </button>
            <button
              type="button"
              onClick={() => setLightingMode('noon')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                lightingMode === 'noon'
                  ? 'bg-white text-[#171717] shadow-xs'
                  : 'text-[#6B7280] hover:text-[#171717]'
              }`}
              title="Daylight Noon Sun"
            >
              <Sun className="w-3.5 h-3.5 text-sky-500" />
              <span className="hidden sm:inline">Daylight</span>
            </button>
            <button
              type="button"
              onClick={() => setLightingMode('twilight')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                lightingMode === 'twilight'
                  ? 'bg-white text-indigo-900 shadow-xs'
                  : 'text-[#6B7280] hover:text-[#171717]'
              }`}
              title="Twilight Dusk Lighting"
            >
              <Moon className="w-3.5 h-3.5 text-indigo-500" />
              <span className="hidden sm:inline">Twilight</span>
            </button>
          </div>

          {/* Hotspot Inspection Focus Pills */}
          <div className="hidden md:flex items-center gap-1.5 overflow-x-auto">
            {HERO_HOTSPOTS.map((hs) => (
              <button
                key={hs.id}
                type="button"
                onClick={() => setActiveHotspotId(prev => prev === hs.id ? null : hs.id)}
                className={`px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all ${
                  activeHotspotId === hs.id
                    ? 'bg-[#171717] text-white shadow-xs'
                    : 'bg-[#F7F8FA] text-[#555555] hover:text-[#171717] border border-transparent hover:border-[#E7E9ED]'
                }`}
              >
                {hs.label}
              </button>
            ))}
          </div>

          {/* Action Buttons: Exploded View & Reset */}
          <div className="flex items-center gap-1.5 ml-auto sm:ml-0">
            <button
              type="button"
              onClick={() => setIsExploded(prev => !prev)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                isExploded
                  ? 'bg-[#B79A68] text-white shadow-md'
                  : 'bg-[#FAF6EE] text-[#8C734B] border border-[#E9DCBC] hover:bg-[#EAE4D2]'
              }`}
              title="Toggle Architectural Exploded View"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{isExploded ? 'Exploded Active' : 'Exploded View'}</span>
            </button>

            {activeHotspotId && (
              <button
                type="button"
                onClick={() => setActiveHotspotId(null)}
                className="p-1.5 rounded-xl bg-[#F7F8FA] hover:bg-[#E7E9ED] text-[#6B7280] transition-colors"
                title="Reset Camera View"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
