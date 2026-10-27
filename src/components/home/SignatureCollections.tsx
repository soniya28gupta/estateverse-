import React from 'react';
import { ArrowUpRight, Sparkles, Building2, Trees, Waves, Crown, Landmark } from 'lucide-react';

interface SignatureCollectionsProps {
  onSelectCollection: (propertyType: string, keyword?: string) => void;
}

export const SignatureCollections: React.FC<SignatureCollectionsProps> = ({ onSelectCollection }) => {
  const collections = [
    {
      id: 'modern-villas',
      title: 'Modern Villas',
      category: 'villa',
      keyword: 'villa',
      tagline: 'Private infinity pools, sunken travertine decks & seamless indoor-outdoor floor-to-ceiling glass.',
      count: '14 Residences',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      icon: Trees,
      span: 'lg:col-span-2',
      featured: true,
    },
    {
      id: 'contemporary-mansions',
      title: 'Contemporary Mansions',
      category: 'villa',
      keyword: 'mansion',
      tagline: 'Expansive private compounds with cantilevered concrete architecture and staff wings.',
      count: '8 Estates',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      icon: Landmark,
      span: 'lg:col-span-1',
    },
    {
      id: 'waterfront-estates',
      title: 'Waterfront Estates',
      category: 'house',
      keyword: 'waterfront',
      tagline: 'Panoramic lakeside and coastal sanctuaries designed around natural light horizons.',
      count: '9 Estates',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      icon: Waves,
      span: 'lg:col-span-1',
    },
    {
      id: 'architectural-masterpieces',
      title: 'Architectural Masterpieces',
      category: 'all',
      keyword: 'architectural',
      tagline: 'Award-winning structural forms featuring bespoke bronze pergolas and Japanese zen courtyards.',
      count: '11 Works',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      icon: Crown,
      span: 'lg:col-span-1',
    },
    {
      id: 'luxury-penthouses',
      title: 'Luxury Penthouses',
      category: 'apartment',
      keyword: 'penthouse',
      tagline: 'Double-volume ceiling heights, private elevator vestibules & 270° wraparound terraces.',
      count: '7 Sky Mansions',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      icon: Building2,
      span: 'lg:col-span-1',
    },
  ];

  return (
    <section id="signature-collections" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative">
      <div id="curated-collections" className="absolute -top-24 left-0" aria-hidden="true" />
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF6EE] border border-[#E9DCBC] text-[#967541] text-xs font-bold tracking-wider uppercase mb-3 shadow-soft-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#B89558]" />
            CURATED ARCHITECTURAL PORTFOLIO
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#17191C] tracking-tight">
            Signature Collections
          </h2>
          <p className="text-[#6B7280] text-sm sm:text-base mt-3 max-w-xl font-normal leading-relaxed">
            Distinguished architectural archetypes, each vetted for spatial volume, natural illumination, and premium material integrity.
          </p>
        </div>

        <span className="text-xs font-semibold text-[#9CA3AF] tracking-wide">
          Updated weekly with verified private listings
        </span>
      </div>

      {/* Asymmetric Editorial Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
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
              className={`group cursor-pointer rounded-3xl bg-white border border-[#E7E9ED] overflow-hidden shadow-soft hover:shadow-soft-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between ${col.span || ''}`}
            >
              {/* Image Frame */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#F7F8FA]">
                <img
                  src={col.image}
                  alt={col.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />

                {/* Count Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-white/95 backdrop-blur-md text-[#17191C] border border-[#E7E9ED] shadow-soft-sm">
                    {col.count}
                  </span>
                </div>

                {/* Floating Icon */}
                <div className="absolute bottom-4 right-4 w-11 h-11 rounded-2xl bg-white/95 backdrop-blur-md border border-[#E7E9ED] flex items-center justify-center text-[#B89558] shadow-soft-sm group-hover:bg-[#17191C] group-hover:text-white transition-colors duration-300">
                  <Icon className="w-5 h-5 stroke-[1.8]" />
                </div>

                <div className="absolute bottom-4 left-4 z-10 pr-16">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#FAF6EE] block opacity-80 mb-0.5">
                    COLLECTION ARCHETYPE
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white leading-tight">
                    {col.title}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between bg-white">
                <p className="text-xs text-[#6B7280] leading-relaxed font-normal">
                  {col.tagline}
                </p>

                <div className="mt-5 pt-4 border-t border-[#E7E9ED] flex items-center justify-between text-xs font-semibold text-[#17191C] group-hover:text-[#B89558] transition-colors">
                  <span>Explore Collection</span>
                  <span className="text-[11px] text-[#B89558] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    View Residences <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
