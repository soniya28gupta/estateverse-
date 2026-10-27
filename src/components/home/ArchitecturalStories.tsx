import React, { useState } from 'react';
import { Sparkles, ArrowRight, Layers, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface MaterialStory {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  specs: string[];
  image: string;
}

const STORIES: MaterialStory[] = [
  {
    id: 'travertine',
    tag: 'MATERIALITY 01',
    title: 'Monolithic Italian Travertine',
    subtitle: 'Thermal Mass & Sculptural Plinths',
    description: 'Quarried from Tuscan stone beds and brushed to preserve tactile geological pores. Used across foundation slabs and garden planter plinths to ground floating steel cantilevers in timeless organic earth.',
    specs: ['Honon-Brushed Finish', 'Zero VOC Sealant', 'Integrated Step Inset Lighting', 'Efflorescence Proof'],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'acoustic-glass',
    tag: 'MATERIALITY 02',
    title: 'Low-Iron Acoustic Glazing',
    subtitle: '14-Foot Frameless Transparency',
    description: 'Triple-laminated acoustic glass with microscopic solar reflective coatings. Allows 94% visual light transmission while attenuating external city frequencies and blocking 99.2% of solar thermal infrared.',
    specs: ['94% VLT Clarity', '42 dB Acoustic Isolation', 'Frameless Structural Silicone Joint', 'Argon Filled Cavity'],
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'infinity-pool',
    tag: 'LANDSCAPE 03',
    title: 'Zero-Edge Basalt Pools',
    subtitle: 'Hydraulic Reflection & Underwater Lighting',
    description: 'Precision-cut matte black basalt tiles engineered to create mirrors of sky and architecture. Heated with geothermal loop exchangers and finished with sunken teak wood sun lounging islands.',
    specs: ['Deep Basalt Volcanic Tile', 'Geothermal Heating', 'Concealed Perimeter Spillway', 'Marine Teak Decking'],
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'pergola-timber',
    tag: 'LIGHTING 04',
    title: 'Bronze Pergolas & Teak Louvers',
    subtitle: 'Kinetic Solar Shading',
    description: 'Architectural bronze fins angled to cast dynamic linear shadow patterns throughout the diurnal cycle. Protects master suite interiors during peak summer heat while inviting low golden-hour winter light.',
    specs: ['Anodized Bronze Slat System', 'Thermal Indonesian Teak', 'Passive Solar Calculation', 'Concealed Rain Channels'],
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
  },
];

export const ArchitecturalStories: React.FC = () => {
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const activeStory = STORIES[activeStoryIndex];

  return (
    <section id="architectural-stories" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF6EE] border border-[#E9DCBC] text-[#967541] text-xs font-bold tracking-wider uppercase mb-3 shadow-soft-sm">
            <Layers className="w-3.5 h-3.5 text-[#B89558]" />
            MATERIAL INTEGRITY & CRAFTSMANSHIP
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#17191C] tracking-tight">
            Architectural Stories
          </h2>
          <p className="text-[#6B7280] text-sm sm:text-base mt-3 max-w-xl font-normal leading-relaxed">
            An exploration of tactile surfaces, natural stone, acoustic engineering, and landscape choreography that defines extraordinary residences.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          {STORIES.map((story, idx) => (
            <button
              key={story.id}
              type="button"
              onClick={() => setActiveStoryIndex(idx)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                activeStoryIndex === idx
                  ? 'bg-[#17191C] text-white border-[#17191C] shadow-soft'
                  : 'bg-white text-[#6B7280] hover:text-[#17191C] border-[#E7E9ED]'
              }`}
            >
              0{idx + 1} {story.title.split(' ')[1] || story.title.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Editorial Feature Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#FAF9F6] p-6 sm:p-10 lg:p-12 rounded-3xl border border-[#E7E9ED] shadow-soft-xl">
        {/* Left: Big Imagery Frame */}
        <div className="lg:col-span-7 relative aspect-[16/11] rounded-2xl overflow-hidden shadow-2xl bg-[#0c0d10]">
          <img
            src={activeStory.image}
            alt={activeStory.title}
            className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-white z-10">
            <span className="text-[11px] font-mono tracking-widest uppercase text-[#FAF6EE]">
              {activeStory.tag}
            </span>
            <span className="text-xs font-semibold text-white/80">
              {activeStory.subtitle}
            </span>
          </div>
        </div>

        {/* Right: Editorial Narrative */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div>
            <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#B89558] block mb-1.5">
              {activeStory.tag}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#17191C] leading-snug">
              {activeStory.title}
            </h3>
            <p className="text-sm font-semibold text-[#B89558] mt-1">
              {activeStory.subtitle}
            </p>
            <p className="text-xs sm:text-sm text-[#6B7280] mt-4 leading-relaxed font-normal">
              {activeStory.description}
            </p>
          </div>

          {/* Technical Specifications Matrix */}
          <div className="p-5 rounded-2xl bg-white border border-[#E7E9ED] shadow-soft-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#17191C] block mb-3">
              Performance & Specifications
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {activeStory.specs.map((spec, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-[#17191C]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#B89558] shrink-0" />
                  <span className="font-medium text-[11px]">{spec}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              {STORIES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveStoryIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    activeStoryIndex === i ? 'w-8 bg-[#B89558]' : 'w-2 bg-[#D3D6DC]'
                  }`}
                  aria-label={`Go to story ${i + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => setActiveStoryIndex((activeStoryIndex + 1) % STORIES.length)}
              className="text-xs font-bold text-[#17191C] hover:text-[#B89558] flex items-center gap-1.5 transition-colors"
            >
              <span>Next Material</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
