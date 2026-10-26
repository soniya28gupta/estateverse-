import React from 'react';
import { ArrowUpRight, Sparkles, Building2, Trees, Waves, Crown } from 'lucide-react';

interface CuratedCollectionsProps {
  onSelectCollection: (propertyType: string, keyword?: string) => void;
}

export const CuratedCollections: React.FC<CuratedCollectionsProps> = ({ onSelectCollection }) => {
  const collections = [
    {
      id: 'modern-villas',
      title: 'Modern Villas',
      category: 'villa',
      keyword: 'villa',
      tagline: 'Private swimming pools, expansive sun decks & seamless indoor-outdoor architecture.',
      count: '14 Residences',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      icon: Trees,
    },
    {
      id: 'luxury-apartments',
      title: 'Luxury Apartments',
      category: 'apartment',
      keyword: 'apartment',
      tagline: 'High-rise sanctuaries with dedicated concierge, sky lounges & panoramic city views.',
      count: '22 Residences',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      icon: Building2,
    },
    {
      id: 'waterfront-homes',
      title: 'Waterfront Homes',
      category: 'house',
      keyword: 'lake',
      tagline: 'Captivating coastal and lakefront retreats designed to celebrate natural horizons.',
      count: '9 Estates',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      icon: Waves,
    },
    {
      id: 'penthouse-living',
      title: 'Penthouse Living',
      category: 'apartment',
      keyword: 'penthouse',
      tagline: 'Double-volume ceiling heights, private elevator vestibules & 270° wraparound terraces.',
      count: '7 Sky Mansions',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      icon: Crown,
    },
  ];

  return (
    <section id="curated-collections" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF6EE] border border-[#E9DCBC] text-[#B89558] text-xs font-bold tracking-wider uppercase mb-3 shadow-soft-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#B89558]" />
            CURATED ARCHITECTURAL PORTFOLIO
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#17191C] tracking-tight">
            Curated Collections
          </h2>
          <p className="text-[#6B7280] text-sm sm:text-base mt-2 max-w-xl font-normal leading-relaxed">
            Distinguished architectural archetypes, each chosen for spatial integrity, materials, and living quality.
          </p>
        </div>

        <span className="text-xs font-medium text-[#6B7280]">
          Updated weekly with verified private listings
        </span>
      </div>

      {/* Grid of 4 Curated Collection Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
        {collections.map((col) => {
          const Icon = col.icon;
          return (
            <div
              key={col.id}
              onClick={() => {
                onSelectCollection(col.category, col.keyword);
                const el = document.getElementById('featured-properties');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group cursor-pointer rounded-3xl bg-white border border-[#E7E9ED] overflow-hidden shadow-soft hover:shadow-soft-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#F7F8FA]">
                <img
                  src={col.image}
                  alt={col.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

                {/* Count Badge */}
                <div className="absolute top-3.5 left-3.5 z-10">
                  <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-white/95 backdrop-blur-md text-[#17191C] border border-[#E7E9ED] shadow-soft-sm">
                    {col.count}
                  </span>
                </div>

                {/* Floating Icon */}
                <div className="absolute bottom-3.5 right-3.5 w-10 h-10 rounded-2xl bg-white/95 backdrop-blur-md border border-[#E7E9ED] flex items-center justify-center text-[#B89558] shadow-soft-sm group-hover:bg-[#17191C] group-hover:text-white transition-colors duration-300">
                  <Icon className="w-5 h-5 stroke-[1.8]" />
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#17191C] group-hover:text-[#B89558] transition-colors flex items-center justify-between">
                    <span>{col.title}</span>
                    <ArrowUpRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#B89558] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </h3>
                  <p className="text-xs text-[#6B7280] mt-2.5 leading-relaxed font-normal">
                    {col.tagline}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#E7E9ED] flex items-center justify-between text-xs font-semibold text-[#17191C] group-hover:text-[#B89558] transition-colors">
                  <span>Explore Collection</span>
                  <span className="text-[11px] text-[#B89558] font-bold">View Spaces →</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
