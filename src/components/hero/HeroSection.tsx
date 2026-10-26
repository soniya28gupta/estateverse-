import React, { useState } from 'react';
import { ArrowRight, Box, Sparkles, Film, CheckCircle2, ChevronDown } from 'lucide-react';
import { VillaScene } from '../../three/VillaScene';
import { CinematicPropertyVideo } from './CinematicPropertyVideo';
import { SAMPLE_PROPERTIES } from '../../data/properties';
import { PropertySearch, FilterState } from '../search/PropertySearch';

interface HeroSectionProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onResetFilters: () => void;
  resultCount: number;
  onExploreClick: () => void;
}

const FEATURES = [
  { label: 'Immersive 3D Experiences', desc: 'Walk through every room before you visit' },
  { label: 'Verified Property Data', desc: 'Real dimensions, real specs, zero guesswork' },
  { label: 'Smarter Discovery', desc: 'AI-powered matching to your lifestyle' },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  resultCount,
  onExploreClick,
}) => {
  const [heroMode, setHeroMode] = useState<'3d' | 'video'>('3d');
  const flagshipProperty = SAMPLE_PROPERTIES[0];

  const scrollToProperties = () => {
    const el = document.getElementById('featured-properties');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollTo3D = () => {
    const el = document.getElementById('experience-3d');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    else setHeroMode('3d');
  };

  return (
    <section
      className="relative bg-white overflow-hidden"
      style={{ paddingTop: 'var(--nav-height)' }}
      aria-label="Hero — property discovery showcase"
    >
      {/* Ambient background blobs */}
      <div className="hero-ambient-1" aria-hidden="true" />
      <div className="hero-ambient-2" aria-hidden="true" />

      <div className="section-container relative z-10">
        {/* ── MAIN GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-14 items-center py-12 lg:py-16 xl:py-20">

          {/* LEFT: Copy */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            {/* Eyebrow */}
            <div className="section-eyebrow animate-fade-in-up mb-5">
              <Sparkles className="w-3 h-3 text-[#B89558]" aria-hidden="true" />
              Discover Spaces That Feel Like Home
            </div>

            {/* Headline */}
            <h1 className="heading-display heading-xl mb-4 animate-fade-in-up delay-100">
              Find a Place.<br />
              <span className="gold-gradient-text">Imagine Your Future.</span>
            </h1>

            {/* Subtext */}
            <p className="text-[#6B7280] text-base sm:text-lg leading-relaxed max-w-lg mb-8 font-normal animate-fade-in-up delay-200">
              Explore extraordinary properties, experience architecture in 3D, and discover your next home with complete confidence.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 mb-10 w-full animate-fade-in-up delay-300">
              <button
                type="button"
                onClick={scrollToProperties}
                className="btn btn-primary btn-lg"
              >
                <span>Explore Properties</span>
                <ArrowRight className="w-4.5 h-4.5 stroke-[2]" style={{ width: '18px', height: '18px' }} aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={scrollTo3D}
                className="btn btn-secondary btn-lg"
              >
                <Box className="w-4 h-4 text-[#B89558]" aria-hidden="true" />
                Experience 3D Living
              </button>
            </div>

            {/* Feature Trust Indicators */}
            <div className="w-full space-y-3 animate-fade-in-up delay-400">
              {FEATURES.map((feat) => (
                <div key={feat.label} className="flex items-center gap-3">
                  <CheckCircle2 className="w-4.5 h-4.5 text-[#B89558] shrink-0" style={{ width: '18px', height: '18px' }} aria-hidden="true" />
                  <div>
                    <span className="text-sm font-semibold text-[#17191C]">{feat.label}</span>
                    <span className="text-xs text-[#9CA3AF] ml-2 hidden sm:inline">{feat.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: 3D / Video showcase */}
          <div id="hero-spatial-viewport" className="lg:col-span-7 flex flex-col gap-3 animate-fade-in delay-200">
            {/* Mode Switcher */}
            <div className="self-end flex items-center bg-[#F7F8FA] p-1 rounded-2xl border border-[#E7E9ED] shadow-sm">
              <button
                type="button"
                onClick={() => setHeroMode('3d')}
                aria-pressed={heroMode === '3d'}
                className={`btn btn-sm gap-1.5 ${
                  heroMode === '3d'
                    ? 'bg-white text-[#17191C] shadow-sm border border-[#E7E9ED]'
                    : 'text-[#9CA3AF] hover:text-[#6B7280] border-transparent bg-transparent'
                }`}
              >
                <Box className="w-3.5 h-3.5 text-[#B89558]" aria-hidden="true" />
                Interactive 3D Villa
              </button>
              <button
                type="button"
                onClick={() => setHeroMode('video')}
                aria-pressed={heroMode === 'video'}
                className={`btn btn-sm gap-1.5 ${
                  heroMode === 'video'
                    ? 'bg-white text-[#17191C] shadow-sm border border-[#E7E9ED]'
                    : 'text-[#9CA3AF] hover:text-[#6B7280] border-transparent bg-transparent'
                }`}
              >
                <Film className="w-3.5 h-3.5 text-[#B89558]" aria-hidden="true" />
                Cinematic Walkthrough
              </button>
            </div>

            {/* Viewport */}
            <div className="w-full rounded-3xl overflow-hidden border border-[#E7E9ED] shadow-soft-xl"
                 style={{ height: 'clamp(400px, 50vw, 580px)' }}>
              {heroMode === '3d' ? (
                <VillaScene property={flagshipProperty} showPropertyOverlay={true} />
              ) : (
                <CinematicPropertyVideo
                  title={flagshipProperty.title}
                  locality={`${flagshipProperty.locality}, ${flagshipProperty.city}`}
                  posterUrl={flagshipProperty.images[0]}
                />
              )}
            </div>
          </div>
        </div>

        {/* ── SEARCH BAR ── */}
        <div className="pb-12 lg:pb-16">
          <PropertySearch
            filters={filters}
            onFilterChange={onFilterChange}
            onResetFilters={onResetFilters}
            resultCount={resultCount}
          />
        </div>

        {/* Scroll indicator */}
        <div className="hidden lg:flex justify-center pb-8 -mt-4">
          <button
            type="button"
            onClick={scrollToProperties}
            className="flex flex-col items-center gap-1.5 text-[#9CA3AF] hover:text-[#B89558] transition-colors group"
            aria-label="Scroll to properties"
          >
            <span className="text-[10px] font-medium tracking-widest uppercase">Discover</span>
            <ChevronDown className="w-4 h-4 animate-bounce" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
};
