import React from 'react';
import { ArrowDown, Box, Sparkles, ShieldCheck, Compass, ArrowRight } from 'lucide-react';
import { VillaScene } from '../../three/VillaScene';
import { SAMPLE_PROPERTIES } from '../../data/properties';
import { PropertySearch, FilterState } from '../search/PropertySearch';

interface HeroSectionProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onResetFilters: () => void;
  resultCount: number;
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  resultCount,
  onExploreClick
}) => {
  // Flagship property for 3D Hero
  const flagshipProperty = SAMPLE_PROPERTIES[0];

  const handleExperience3D = () => {
    const el = document.getElementById('interactive-hero-3d');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-between overflow-hidden bg-radial-gradient">
      {/* Background ambient architectural glows */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-gold-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-sage-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center">
        {/* Main Grid: Left copy, Right 3D Scene */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center mb-10">
          {/* Left Text Column */}
          <div className="lg:col-span-5 flex flex-col items-start text-left z-10">
            {/* Category / Sub-badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-300 text-xs font-semibold tracking-wider uppercase mb-5 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              Discover spaces that feel like home
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12] mb-5">
              Find a Place. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-gold-200">
                Imagine Your Future.
              </span>
            </h1>

            {/* Subtitle Description */}
            <p className="text-base sm:text-lg text-stone-300/90 leading-relaxed max-w-xl mb-8">
              Discover extraordinary properties, explore spaces in 3D, and make confident real estate decisions with intelligent property discovery.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto mb-8">
              <button
                type="button"
                onClick={onExploreClick}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-gold-400 via-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 text-midnight-950 font-bold text-sm tracking-wide shadow-xl shadow-gold-400/20 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                Explore Properties
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
              <button
                type="button"
                onClick={handleExperience3D}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-midnight-900/90 hover:bg-midnight-800 text-stone-200 hover:text-gold-300 font-semibold text-sm border border-stone-700/80 hover:border-gold-400/50 backdrop-blur-md transition flex items-center justify-center gap-2"
              >
                <Box className="w-4 h-4 text-gold-400" />
                Experience 3D Living
              </button>
            </div>

            {/* Value Highlights Pill Row */}
            <div className="grid grid-cols-3 gap-3 w-full max-w-lg pt-4 border-t border-stone-800/80">
              <div>
                <p className="font-serif text-xl sm:text-2xl font-bold text-gold-300">100%</p>
                <p className="text-[11px] text-stone-400 leading-tight">Interactive 3D Environments</p>
              </div>
              <div className="border-x border-stone-800/60 px-2">
                <p className="font-serif text-xl sm:text-2xl font-bold text-white">0 Blind</p>
                <p className="text-[11px] text-stone-400 leading-tight">Uncertain Site Visits</p>
              </div>
              <div>
                <p className="font-serif text-xl sm:text-2xl font-bold text-gold-300">₹0 Hidden</p>
                <p className="text-[11px] text-stone-400 leading-tight">Cost Transparency</p>
              </div>
            </div>
          </div>

          {/* Right 3D Hero Scene */}
          <div id="interactive-hero-3d" className="lg:col-span-7 h-[460px] sm:h-[540px] lg:h-[620px] w-full relative z-10">
            <VillaScene property={flagshipProperty} showPropertyOverlay={true} />
          </div>
        </div>

        {/* Floating Property Search Section */}
        <div className="w-full mt-4 z-20">
          <PropertySearch
            filters={filters}
            onFilterChange={onFilterChange}
            onResetFilters={onResetFilters}
            resultCount={resultCount}
          />
        </div>
      </div>
    </section>
  );
};
