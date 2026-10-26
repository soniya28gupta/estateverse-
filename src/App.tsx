import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Navbar } from './components/navigation/Navbar';
import { HeroSection } from './components/hero/HeroSection';
import { PropertyCard } from './components/property/PropertyCard';
import { AffordabilityCalculator } from './components/calculator/AffordabilityCalculator';
import { PropertyComparison } from './components/comparison/PropertyComparison';
import { NeighborhoodExplorer } from './components/neighborhood/NeighborhoodExplorer';
import { EstateMateAI } from './components/assistant/EstateMateAI';
import { PropertyModal } from './components/property/PropertyModal';
import { TrustTransparency } from './components/ui/TrustTransparency';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { Footer } from './components/layout/Footer';
import { FilterState } from './components/search/PropertySearch';
import { SAMPLE_PROPERTIES } from './data/properties';
import { Property } from './types/property';
import {
  getStoredFavorites,
  saveStoredFavorites,
  formatINR
} from './utils/formatters';
import {
  Sparkles,
  ArrowRight,
  Heart,
  SlidersHorizontal,
  Box,
  Compass,
  Building,
  CheckCircle2,
  Trash2,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export function MainApp() {
  // Search & Filter State
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    status: 'For Sale',
    city: 'All Cities',
    propertyType: 'all',
    priceRange: 'all',
    bedrooms: 'all'
  });

  // Favorites state persisted in localStorage
  const [favorites, setFavorites] = useState<string[]>(() => getStoredFavorites());

  // Comparison selection (up to 3)
  const [comparedProperties, setComparedProperties] = useState<Property[]>([]);

  // Active property for detail modal
  const [activeProperty, setActiveProperty] = useState<Property | null>(null);

  // AI Assistant modal toggle
  const [isAIOpen, setIsAIOpen] = useState(false);

  // Sync favorites
  useEffect(() => {
    saveStoredFavorites(favorites);
  }, [favorites]);

  const handleToggleFavorite = (id: string) => {
    setFavorites(prev => {
      const exists = prev.includes(id);
      if (!exists) {
        try {
          confetti({ particleCount: 35, spread: 45, origin: { y: 0.8 } });
        } catch {}
        return [...prev, id];
      }
      return prev.filter(item => item !== id);
    });
  };

  const handleToggleCompare = (property: Property) => {
    setComparedProperties(prev => {
      const exists = prev.some(p => p.id === property.id);
      if (exists) {
        return prev.filter(p => p.id !== property.id);
      }
      if (prev.length >= 3) {
        alert('You can compare a maximum of 3 properties at a time.');
        return prev;
      }
      return [...prev, property];
    });
  };

  // Filtered properties
  const filteredProperties = useMemo(() => {
    return SAMPLE_PROPERTIES.filter(property => {
      // Status
      if (filters.status && property.listingStatus !== filters.status) return false;

      // City
      if (filters.city !== 'All Cities' && property.city !== filters.city) return false;

      // Property Type
      if (filters.propertyType !== 'all' && property.propertyType !== filters.propertyType) return false;

      // Bedrooms
      if (filters.bedrooms !== 'all') {
        const minBeds = parseInt(filters.bedrooms, 10);
        if (property.bedrooms < minBeds) return false;
      }

      // Budget Range
      if (filters.priceRange === 'under-75l' && property.price > 7500000) return false;
      if (filters.priceRange === '75l-1.5cr' && (property.price < 7500000 || property.price > 15000000)) return false;
      if (filters.priceRange === '1.5cr-3cr' && (property.price < 15000000 || property.price > 30000000)) return false;
      if (filters.priceRange === 'above-3cr' && property.price < 30000000) return false;

      // Free text query
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const matchesTitle = property.title.toLowerCase().includes(q);
        const matchesLocality = property.locality.toLowerCase().includes(q);
        const matchesCity = property.city.toLowerCase().includes(q);
        const matchesDesc = property.description.toLowerCase().includes(q);
        const matchesAmenity = property.amenities.some(a => a.toLowerCase().includes(q));
        if (!matchesTitle && !matchesLocality && !matchesCity && !matchesDesc && !matchesAmenity) {
          return false;
        }
      }

      return true;
    });
  }, [filters]);

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      status: 'For Sale',
      city: 'All Cities',
      propertyType: 'all',
      priceRange: 'all',
      bedrooms: 'all'
    });
  };

  return (
    <div className="min-h-screen bg-midnight-950 text-stone-200 flex flex-col font-sans selection:bg-gold-400 selection:text-midnight-950">
      {/* Top Luxury Navigation */}
      <Navbar
        onOpenAssistant={() => setIsAIOpen(true)}
        favoritesCount={favorites.length}
      />

      <Routes>
        {/* HOMEPAGE ROUTE */}
        <Route
          path="/"
          element={
            <main className="flex-1">
              {/* SECTION 4: 3D HERO EXPERIENCE */}
              <HeroSection
                filters={filters}
                onFilterChange={setFilters}
                onResetFilters={handleResetFilters}
                resultCount={filteredProperties.length}
                onExploreClick={() => {
                  const el = document.getElementById('featured-properties');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              />

              {/* SECTION 5 & 7: FEATURED PROPERTIES GRID */}
              <section id="featured-properties" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-300 text-xs font-semibold tracking-wider uppercase mb-2">
                      <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                      Spaces Worth Discovering
                    </div>
                    <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                      Exceptional Homes, Thoughtfully Selected
                    </h2>
                    <p className="text-stone-300 text-sm mt-2 max-w-xl">
                      Explore homes selected for the way you want to live. Complete with room dimensions, 3D tours, and verified amenities.
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-stone-400">
                      Showing <strong className="text-gold-300">{filteredProperties.length}</strong> of {SAMPLE_PROPERTIES.length} listings
                    </span>
                    <button
                      onClick={handleResetFilters}
                      className="px-3.5 py-1.5 rounded-xl bg-midnight-900 text-xs font-semibold text-stone-300 hover:text-white border border-stone-800 transition"
                    >
                      Clear Filters
                    </button>
                  </div>
                </div>

                {filteredProperties.length === 0 ? (
                  <div className="p-12 text-center rounded-2xl bg-midnight-900/60 border border-stone-800">
                    <p className="text-stone-400 text-sm mb-4">No properties match your current search filters.</p>
                    <button
                      onClick={handleResetFilters}
                      className="px-5 py-2.5 rounded-xl bg-gold-400 text-midnight-950 font-bold text-xs"
                    >
                      Reset All Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {filteredProperties.map(property => (
                      <PropertyCard
                        key={property.id}
                        property={property}
                        isFavorite={favorites.includes(property.id)}
                        onToggleFavorite={handleToggleFavorite}
                        onViewDetails={setActiveProperty}
                        isComparing={comparedProperties.some(p => p.id === property.id)}
                        onToggleCompare={handleToggleCompare}
                        canCompare={comparedProperties.length < 3}
                      />
                    ))}
                  </div>
                )}
              </section>

              {/* SECTION 9: AFFORDABILITY CALCULATOR */}
              <AffordabilityCalculator onSelectProperty={setActiveProperty} />

              {/* SECTION 10: PROPERTY COMPARISON TOOL */}
              <PropertyComparison
                selectedProperties={comparedProperties}
                onRemoveProperty={(id) => setComparedProperties(prev => prev.filter(p => p.id !== id))}
                onClearAll={() => setComparedProperties([])}
                onViewDetails={setActiveProperty}
                allProperties={SAMPLE_PROPERTIES}
                onAddProperty={handleToggleCompare}
              />

              {/* SECTION 11: NEIGHBORHOOD EXPLORER */}
              <NeighborhoodExplorer />

              {/* SECTION 7, 8, 14: TRUST, HOW IT WORKS & STORYTELLING */}
              <TrustTransparency />

              {/* SECTION 9 & 15: FINAL CTA */}
              <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-r from-midnight-900 via-midnight-800 to-midnight-900 border border-gold-400/30 text-center relative overflow-hidden shadow-2xl">
                  <div className="absolute -top-24 -left-24 w-64 h-64 bg-gold-400/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-sage-400/10 rounded-full blur-3xl pointer-events-none" />

                  <span className="text-xs font-bold uppercase tracking-wider text-gold-400 block mb-3">
                    Start Your Exploration Today
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 max-w-2xl mx-auto leading-tight">
                    Your Next Home Is Waiting to Be Discovered.
                  </h2>
                  <p className="text-stone-300 text-sm sm:text-base max-w-xl mx-auto mb-8">
                    Step inside 3D architectural spaces, calculate genuine mortgage terms, and schedule private tours with complete confidence.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-8 py-3.5 rounded-xl bg-gold-400 hover:bg-gold-300 text-midnight-950 font-bold text-sm tracking-wide shadow-xl shadow-gold-400/20 transition active:scale-95 flex items-center gap-2"
                    >
                      Find Your Property
                      <ArrowRight className="w-4 h-4 stroke-[2.4]" />
                    </button>
                    <button
                      onClick={() => setIsAIOpen(true)}
                      className="px-6 py-3.5 rounded-xl bg-midnight-950 text-gold-300 font-semibold text-sm border border-gold-400/40 hover:bg-midnight-900 transition flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4 text-gold-400" />
                      Chat with EstateMate AI
                    </button>
                  </div>
                </div>
              </section>
            </main>
          }
        />

        {/* EXPLORE PAGE ROUTE */}
        <Route
          path="/explore"
          element={
            <main className="flex-1 pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
              <div className="mb-8">
                <span className="text-xs font-bold uppercase text-gold-400">Complete Architectural Catalog</span>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-1">Explore Available Spaces</h1>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {SAMPLE_PROPERTIES.map(p => (
                  <PropertyCard
                    key={p.id}
                    property={p}
                    isFavorite={favorites.includes(p.id)}
                    onToggleFavorite={handleToggleFavorite}
                    onViewDetails={setActiveProperty}
                    isComparing={comparedProperties.some(c => c.id === p.id)}
                    onToggleCompare={handleToggleCompare}
                    canCompare={comparedProperties.length < 3}
                  />
                ))}
              </div>
            </main>
          }
        />

        {/* FAVORITES PAGE ROUTE */}
        <Route
          path="/favorites"
          element={
            <main className="flex-1 pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-xs font-bold uppercase text-gold-400">Your Saved Collection</span>
                  <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-1">Saved Properties</h1>
                </div>
                {favorites.length > 0 && (
                  <button
                    onClick={() => setFavorites([])}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-midnight-900 text-stone-400 hover:text-rose-400 border border-stone-800 text-xs font-semibold transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Clear All Favorites
                  </button>
                )}
              </div>

              {favorites.length === 0 ? (
                <div className="p-16 text-center rounded-2xl bg-midnight-900/50 border border-stone-800">
                  <Heart className="w-10 h-10 text-stone-600 mx-auto mb-3" />
                  <h3 className="font-serif text-xl font-bold text-white mb-1">No Saved Properties Yet</h3>
                  <p className="text-xs text-stone-400 mb-6">
                    Tap the heart icon on any property card to save homes to your private portfolio.
                  </p>
                  <Link
                    to="/"
                    className="px-6 py-2.5 rounded-xl bg-gold-400 text-midnight-950 text-xs font-bold"
                  >
                    Discover Properties
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {SAMPLE_PROPERTIES.filter(p => favorites.includes(p.id)).map(p => (
                    <PropertyCard
                      key={p.id}
                      property={p}
                      isFavorite={true}
                      onToggleFavorite={handleToggleFavorite}
                      onViewDetails={setActiveProperty}
                      isComparing={comparedProperties.some(c => c.id === p.id)}
                      onToggleCompare={handleToggleCompare}
                      canCompare={comparedProperties.length < 3}
                    />
                  ))}
                </div>
              )}
            </main>
          }
        />

        {/* MORTGAGE CALCULATOR ROUTE */}
        <Route
          path="/calculator"
          element={
            <main className="flex-1 pt-24 pb-20">
              <AffordabilityCalculator onSelectProperty={setActiveProperty} />
            </main>
          }
        />

        {/* NEIGHBORHOODS ROUTE */}
        <Route
          path="/neighborhoods"
          element={
            <main className="flex-1 pt-24 pb-20">
              <NeighborhoodExplorer />
            </main>
          }
        />

        {/* ABOUT PAGE ROUTE */}
        <Route
          path="/about"
          element={
            <main className="flex-1 pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
              <div className="space-y-6">
                <span className="text-xs font-bold uppercase tracking-wider text-gold-400">Our Architectural Vision</span>
                <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white">
                  About EstateVerse 3D
                </h1>
                <p className="text-base text-stone-300 leading-relaxed">
                  EstateVerse 3D was engineered to bridge the profound gap between standard 2D listing photographs and the physical reality of modern architecture.
                </p>
                <div className="p-6 rounded-2xl bg-midnight-900 border border-stone-800 space-y-4">
                  <h3 className="font-serif text-xl font-bold text-gold-300">Our Core Principles</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    <div>
                      <h4 className="font-bold text-white text-sm">1. Spatial Precision</h4>
                      <p className="text-xs text-stone-400 mt-1">Realistic 3D environments with true light exposure and ceiling volumes.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">2. Transparent Pricing</h4>
                      <p className="text-xs text-stone-400 mt-1">Accurate down payment, EMI, and stamp duty disclosures with zero surprise fees.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">3. Verified Context</h4>
                      <p className="text-xs text-stone-400 mt-1">Direct-distance mapping to metro stations, hospitals, and top schools.</p>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          }
        />
      </Routes>

      {/* FOOTER */}
      <Footer />

      {/* FLOATING AI ASSISTANT LAUNCHER BUTTON */}
      <button
        onClick={() => setIsAIOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-3.5 sm:px-4 sm:py-3 rounded-full sm:rounded-2xl bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 text-midnight-950 font-bold text-xs sm:text-sm shadow-2xl shadow-gold-400/30 flex items-center gap-2 group transition active:scale-95"
        title="Open EstateMate AI Advisor"
      >
        <Sparkles className="w-5 h-5 text-midnight-950 animate-pulse" />
        <span className="hidden sm:inline">EstateMate AI</span>
      </button>

      {/* AI ASSISTANT MODAL */}
      <EstateMateAI
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        onSelectProperty={setActiveProperty}
      />

      {/* PROPERTY DETAILS MODAL */}
      <PropertyModal
        property={activeProperty}
        onClose={() => setActiveProperty(null)}
        isFavorite={activeProperty ? favorites.includes(activeProperty.id) : false}
        onToggleFavorite={handleToggleFavorite}
      />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary name="EstateVerseRoot">
      <BrowserRouter>
        <MainApp />
      </BrowserRouter>
    </ErrorBoundary>
  );
}
