import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Navbar } from './components/navigation/Navbar';
import { HeroSection } from './components/hero/HeroSection';
import { SignatureCollections } from './components/home/SignatureCollections';
import { Discover3DSection } from './components/home/Discover3DSection';
import { ArchitecturalStories } from './components/home/ArchitecturalStories';
import { VirtualPropertyTours } from './components/home/VirtualPropertyTours';
import { AboutSection } from './components/home/AboutSection';
import { PropertyCard } from './components/property/PropertyCard';
import { PropertySearch, FilterState } from './components/search/PropertySearch';
import { EstateVerseExperience } from './components/home/EstateVerseExperience';
import { SmartPropertyMatching } from './components/home/SmartPropertyMatching';
import { AffordabilityCalculator } from './components/calculator/AffordabilityCalculator';
import { PropertyComparison } from './components/comparison/PropertyComparison';
import { NeighborhoodExplorer } from './components/neighborhood/NeighborhoodExplorer';
import { EstateMateAI } from './components/assistant/EstateMateAI';
import { PropertyModal } from './components/property/PropertyModal';
import { ContactModal } from './components/contact/ContactModal';
import { TrustTransparency } from './components/ui/TrustTransparency';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { CustomCursor } from './components/ui/CustomCursor';
import { ScrollStorytelling } from './components/home/ScrollStorytelling';
import { InteractivePropertyMap } from './components/map/InteractivePropertyMap';
import { Footer } from './components/layout/Footer';
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
  ArrowUpDown,
  PhoneCall
} from 'lucide-react';
import confetti from 'canvas-confetti';

// Code split heavy 3D world component for performance
const ThreeWorldExperience = React.lazy(() => import('./three/ThreeWorldExperience'));

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

  // Sorting
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'area'>('featured');

  // Favorites state persisted in localStorage
  const [favorites, setFavorites] = useState<string[]>(() => getStoredFavorites());

  // Comparison selection (up to 3)
  const [comparedProperties, setComparedProperties] = useState<Property[]>([]);

  // Active property for detail modal
  const [activeProperty, setActiveProperty] = useState<Property | null>(null);

  // Fullscreen 3D World state
  const [is3DWorldOpen, setIs3DWorldOpen] = useState(false);
  const [active3DProperty, setActive3DProperty] = useState<Property>(SAMPLE_PROPERTIES[0]);

  // Luxury Concierge Contact Modal
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactPropertyContext, setContactPropertyContext] = useState<string>('');

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

  const handleOpen3DWorld = (property?: Property) => {
    if (property) setActive3DProperty(property);
    setIs3DWorldOpen(true);
  };

  const handleOpenContact = (propertyTitle?: string) => {
    setContactPropertyContext(propertyTitle || '');
    setIsContactOpen(true);
  };

  // Filtered and sorted properties
  const filteredProperties = useMemo(() => {
    const list = SAMPLE_PROPERTIES.filter(property => {
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

    if (sortBy === 'price-asc') {
      return [...list].sort((a, b) => a.price - b.price);
    }
    if (sortBy === 'price-desc') {
      return [...list].sort((a, b) => b.price - a.price);
    }
    if (sortBy === 'area') {
      return [...list].sort((a, b) => b.areaSqft - a.areaSqft);
    }

    return list;
  }, [filters, sortBy]);

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

  const handleSelectCollection = (propertyType: string, keyword?: string) => {
    setFilters(prev => ({
      ...prev,
      propertyType: propertyType,
      searchQuery: keyword || ''
    }));
  };

  return (
    <div className="min-h-screen bg-white text-[#17191C] flex flex-col font-sans" style={{ colorScheme: 'light' }}>
      {/* Luxury Magnetic Custom Cursor for Desktop */}
      <CustomCursor />

      {/* Top Luxury Navigation */}
      <Navbar
        onOpenAssistant={() => setIsAIOpen(true)}
        onOpen3DWorld={() => handleOpen3DWorld()}
        onOpenContact={() => handleOpenContact()}
        favoritesCount={favorites.length}
      />

      <Routes>
        {/* HOMEPAGE ROUTE */}
        <Route
          path="/"
          element={
            <main className="flex-1 bg-white">
              {/* 1. SIGNATURE 3D HERO — REAL-TIME THREE.JS ARCHITECTURAL BUILDING */}
              <HeroSection
                filters={filters}
                onFilterChange={setFilters}
                onResetFilters={handleResetFilters}
                resultCount={filteredProperties.length}
                onExploreClick={() => {
                  const el = document.getElementById('featured-properties');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                onEnter3DWorld={() => handleOpen3DWorld(SAMPLE_PROPERTIES[0])}
              />

              {/* 2. SCROLL-DRIVEN 3D STORYTELLING WITH GSAP SCROLLTRIGGER */}
              <ScrollStorytelling
                onExploreClick={() => {
                  const el = document.getElementById('featured-properties');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              />

              {/* 3. INTEGRATED PROPERTY SEARCH FILTER BAR */}
              <div className="bg-white border-b border-[#E7E9ED] py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                  <PropertySearch
                    filters={filters}
                    onFilterChange={setFilters}
                    onResetFilters={handleResetFilters}
                    resultCount={filteredProperties.length}
                  />
                </div>
              </div>

              {/* SECTION A: FEATURED ESTATES GRID */}
              <section id="featured-properties" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                  <div>
                    <div className="section-eyebrow">
                      <Sparkles className="w-3 h-3 text-[#B89558]" aria-hidden="true" />
                      SPACES WORTH DISCOVERING
                    </div>
                    <h2 className="heading-display heading-lg">
                      Featured Estates,<br className="hidden sm:block" /> Thoughtfully Curated
                    </h2>
                    <p className="text-[#6B7280] text-sm sm:text-base mt-3 max-w-xl font-normal leading-relaxed">
                      Explore residences with verified room dimensions, spatial 3D architectural models, and neighborhood metrics.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                    <div className="flex items-center gap-2 bg-[#F7F8FA] px-3.5 h-11 rounded-xl border border-[#E7E9ED]">
                      <ArrowUpDown className="w-3.5 h-3.5 text-[#9CA3AF]" aria-hidden="true" />
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="bg-transparent text-xs font-semibold text-[#17191C] focus:outline-none cursor-pointer"
                        aria-label="Sort properties"
                      >
                        <option value="featured">Featured First</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="area">Area: Largest First</option>
                      </select>
                    </div>
                    <button
                      type="button"
                      onClick={handleResetFilters}
                      className="btn btn-sm btn-outline h-11"
                    >
                      Clear Filters
                    </button>
                  </div>
                </div>

                {filteredProperties.length === 0 ? (
                  <div className="py-24 text-center rounded-3xl bg-[#F7F8FA] border border-[#E7E9ED]">
                    <SlidersHorizontal className="w-10 h-10 text-[#D3D6DC] mx-auto mb-4" aria-hidden="true" />
                    <p className="text-[#6B7280] text-sm mb-6 font-medium">No properties match your current search criteria.</p>
                    <button
                      type="button"
                      onClick={handleResetFilters}
                      className="btn btn-primary"
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
                        onExplore3D={() => handleOpen3DWorld(property)}
                        isComparing={comparedProperties.some(p => p.id === property.id)}
                        onToggleCompare={handleToggleCompare}
                        canCompare={comparedProperties.length < 3}
                      />
                    ))}
                  </div>
                )}
              </section>

              {/* SECTION B: SPATIAL LOCATION DISCOVERY & INTERACTIVE MAP */}
              <InteractivePropertyMap
                properties={SAMPLE_PROPERTIES}
                onSelectProperty={setActiveProperty}
                onExplore3D={handleOpen3DWorld}
              />

              {/* SECTION C: DISCOVER IN 3D INTERACTIVE SHOWROOM */}
              <Discover3DSection
                onEnter3DWorld={() => handleOpen3DWorld(SAMPLE_PROPERTIES[0])}
                onSelectProperty={setActiveProperty}
              />

              {/* SECTION C: SIGNATURE COLLECTIONS */}
              <SignatureCollections onSelectCollection={handleSelectCollection} />

              {/* SECTION D: ARCHITECTURAL STORIES (MATERIALS, GLASS, STONE, LANDSCAPE) */}
              <ArchitecturalStories />

              {/* SECTION E: VIRTUAL PROPERTY TOURS (3D ARCHIVES) */}
              <VirtualPropertyTours
                onOpen3DWorld={handleOpen3DWorld}
                onViewDetails={setActiveProperty}
              />

              {/* SECTION F: CURATED NEIGHBORHOODS & TRANSIT */}
              <NeighborhoodExplorer />

              {/* SECTION F: SMART PROPERTY MATCHING */}
              <SmartPropertyMatching onSelectProperty={setActiveProperty} />

              {/* SECTION G: MORTGAGE & AFFORDABILITY CALCULATOR */}
              <AffordabilityCalculator onSelectProperty={setActiveProperty} />

              {/* SECTION H: ABOUT ESTATEVERSE ARCHITECTURAL VISION */}
              <AboutSection />

              {/* PROPERTY COMPARISON TOOL (WHEN SELECTED) */}
              <PropertyComparison
                selectedProperties={comparedProperties}
                onRemoveProperty={(id) => setComparedProperties(prev => prev.filter(p => p.id !== id))}
                onClearAll={() => setComparedProperties([])}
                onViewDetails={setActiveProperty}
                allProperties={SAMPLE_PROPERTIES}
                onAddProperty={handleToggleCompare}
              />

              {/* TRUST, HOW IT WORKS & RERA TRANSPARENCY */}
              <TrustTransparency />

              {/* SECTION I: FINAL CALL TO ACTION */}
              <section className="py-20 sm:py-24 bg-[#FCFBF8] text-[#17191C] border-t border-[#EAE7E0] relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(183,154,104,0.06)_0%,_transparent_70%)] pointer-events-none" />
                <div className="section-container relative z-10 text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF6EE] border border-[#E9DCBC] text-[#555555] text-[11px] font-semibold tracking-widest uppercase mb-6 shadow-xs">
                    <Sparkles className="w-3.5 h-3.5 text-[#B89558]" />
                    <span>YOUR ARCHITECTURAL HORIZON</span>
                  </div>

                  <h2
                    className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#171717] max-w-3xl mx-auto leading-tight mb-6"
                    style={{ color: '#171717' }}
                  >
                    Your Next Extraordinary Address Awaits.
                  </h2>

                  <p
                    className="text-[#555555] text-sm sm:text-base max-w-xl mx-auto mb-10 leading-relaxed font-normal"
                    style={{ color: '#555555' }}
                  >
                    Step inside 3D architectural spaces, calculate bespoke mortgage terms, and schedule private walkthroughs with complete confidence.
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        const el = document.getElementById('featured-properties');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="h-12 px-8 rounded-2xl bg-[#171717] hover:bg-[#B79A68] text-white font-semibold text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2.5 shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] border border-[#171717] group"
                    >
                      <span>EXPLORE PROPERTIES</span>
                      <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleOpenContact()}
                      className="h-12 px-8 rounded-2xl bg-[#B79A68] hover:bg-[#9B7E4E] text-white font-semibold text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2.5 shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] border border-[#E9DCBC] group"
                    >
                      <PhoneCall className="w-4 h-4 text-white" />
                      <span>CONTACT US</span>
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
            <main className="flex-1 page-content bg-white">
              <div className="section-container py-12 pb-20">
                <div className="mb-10">
                  <span className="section-eyebrow">Complete Architectural Catalog</span>
                  <h1 className="heading-display heading-lg">Explore Available Spaces</h1>
                  <p className="text-[#6B7280] text-sm mt-2 max-w-xl">
                    Every listed residence features verified room dimensions, architectural blueprints, and interactive 3D spatial models.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
                  {SAMPLE_PROPERTIES.map(p => (
                    <PropertyCard
                      key={p.id}
                      property={p}
                      isFavorite={favorites.includes(p.id)}
                      onToggleFavorite={handleToggleFavorite}
                      onViewDetails={setActiveProperty}
                      onExplore3D={() => handleOpen3DWorld(p)}
                      isComparing={comparedProperties.some(c => c.id === p.id)}
                      onToggleCompare={handleToggleCompare}
                      canCompare={comparedProperties.length < 3}
                    />
                  ))}
                </div>
              </div>
            </main>
          }
        />

        {/* FAVORITES PAGE ROUTE */}
        <Route
          path="/favorites"
          element={
            <main className="flex-1 page-content bg-white">
              <div className="section-container py-12 pb-20">
                <div className="flex items-center justify-between mb-10">
                  <div>
                    <span className="section-eyebrow">Your Saved Portfolio</span>
                    <h1 className="heading-display heading-lg mt-1">Saved Properties</h1>
                  </div>
                  {favorites.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setFavorites([])}
                      className="btn btn-sm btn-outline text-rose-500 hover:text-rose-600 hover:border-rose-200"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Clear All
                    </button>
                  )}
                </div>
                {favorites.length === 0 ? (
                  <div className="py-24 text-center rounded-3xl bg-[#F7F8FA] border border-[#E7E9ED]">
                    <Heart className="w-12 h-12 text-[#D3D6DC] mx-auto mb-4" />
                    <h3 className="font-serif text-2xl font-bold text-[#17191C] mb-2">No Saved Properties Yet</h3>
                    <p className="text-sm text-[#6B7280] mb-8 max-w-sm mx-auto">
                      Tap the heart icon on any property card to save homes to your private collection.
                    </p>
                    <Link to="/" className="btn btn-primary">
                      Discover Properties
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
                    {SAMPLE_PROPERTIES.filter(p => favorites.includes(p.id)).map(p => (
                      <PropertyCard
                        key={p.id}
                        property={p}
                        isFavorite={true}
                        onToggleFavorite={handleToggleFavorite}
                        onViewDetails={setActiveProperty}
                        onExplore3D={() => handleOpen3DWorld(p)}
                        isComparing={comparedProperties.some(c => c.id === p.id)}
                        onToggleCompare={handleToggleCompare}
                        canCompare={comparedProperties.length < 3}
                      />
                    ))}
                  </div>
                )}
              </div>
            </main>
          }
        />

        {/* MORTGAGE CALCULATOR ROUTE */}
        <Route
          path="/calculator"
          element={
            <main className="flex-1 page-content bg-white">
              <AffordabilityCalculator onSelectProperty={setActiveProperty} />
            </main>
          }
        />

        {/* NEIGHBORHOODS ROUTE */}
        <Route
          path="/neighborhoods"
          element={
            <main className="flex-1 page-content bg-white">
              <NeighborhoodExplorer />
            </main>
          }
        />

        {/* ABOUT PAGE ROUTE */}
        <Route
          path="/about"
          element={
            <main className="flex-1 page-content bg-white">
              <div className="section-container py-12 pb-20 max-w-4xl">
                <div className="space-y-8">
                  <span className="section-eyebrow">Our Architectural Vision</span>
                  <h1 className="heading-display heading-xl">
                    About EstateVerse 3D
                  </h1>
                  <p className="text-base text-[#6B7280] leading-relaxed font-normal max-w-2xl">
                    EstateVerse 3D was engineered to bridge the profound gap between standard 2D listing photographs and the physical reality of modern architecture.
                  </p>
                  <div className="p-8 sm:p-10 rounded-3xl bg-[#F7F8FA] border border-[#E7E9ED] space-y-6">
                    <h3 className="font-serif text-2xl font-bold text-[#17191C]">Our Core Principles</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-2">
                      <div>
                        <h4 className="font-bold text-[#17191C] text-sm">1. Spatial Precision</h4>
                        <p className="text-xs text-[#6B7280] mt-1.5 leading-relaxed font-normal">
                          Realistic 3D environments with true light exposure, window glazing, and ceiling volumes.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-bold text-[#17191C] text-sm">2. Transparent Pricing</h4>
                        <p className="text-xs text-[#6B7280] mt-1.5 leading-relaxed font-normal">
                          Accurate down payment, EMI, and stamp duty disclosures with zero surprise brokerage fees.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-bold text-[#17191C] text-sm">3. Verified Context</h4>
                        <p className="text-xs text-[#6B7280] mt-1.5 leading-relaxed font-normal">
                          Direct-distance mapping to metro stations, hospitals, and premier schools.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          }
        />
      </Routes>

      {/* SECTION J: FOOTER */}
      <Footer />

      {/* FLOATING AI ASSISTANT LAUNCHER BUTTON */}
      <button
        type="button"
        onClick={() => setIsAIOpen(true)}
        className="btn btn-primary fixed bottom-6 right-6 z-30 shadow-2xl hover:shadow-gold-glow flex items-center gap-2"
        aria-label="Open EstateMate AI Advisor"
      >
        <Sparkles className="w-4 h-4 text-[#B89558]" aria-hidden="true" />
        <span className="hidden sm:inline">EstateMate AI</span>
      </button>

      {/* FULLSCREEN 3D WORLD EXPERIENCE (SUSPENSE LAZY LOADED) */}
      {is3DWorldOpen && (
        <Suspense
          fallback={
            <div className="fixed inset-0 z-[100] bg-[#0c0d10] flex flex-col items-center justify-center text-white">
              <div className="w-12 h-12 rounded-2xl bg-[#B89558] flex items-center justify-center animate-pulse mb-4">
                <Box className="w-6 h-6 text-white" />
              </div>
              <p className="font-serif text-xl font-bold">Entering 3D World...</p>
              <p className="text-xs text-white/60 mt-1">Initializing WebGL Engine</p>
            </div>
          }
        >
          <ThreeWorldExperience
            property={active3DProperty}
            onExit={() => setIs3DWorldOpen(false)}
            onOpenContact={handleOpenContact}
          />
        </Suspense>
      )}

      {/* PRIVATE CONCIERGE CONTACT MODAL */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        initialPropertyTitle={contactPropertyContext}
      />

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
