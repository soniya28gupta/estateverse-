import React from 'react';
import { Sparkles, Shield, Compass, Box, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutSection: React.FC = () => {
  return (
    <section id="about-estateverse" className="py-24 bg-white border-t border-[#E7E9ED] relative">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Vision Statement (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF6EE] border border-[#E9DCBC] text-[#967541] text-xs font-bold tracking-wider uppercase shadow-soft-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#B89558]" />
              OUR ARCHITECTURAL PHILOSOPHY
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#17191C] leading-tight tracking-tight">
              A New Dimension in Luxury Property Discovery
            </h2>

            <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed font-normal">
              EstateVerse 3D was conceived to dismantle the profound ambiguity of traditional 2D real estate listings. We bridge the distance between visionary architectural design and discerning buyers worldwide through interactive, millimeter-precise spatial technology.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
              <div className="p-5 rounded-2xl bg-[#F7F8FA] border border-[#E7E9ED]">
                <Box className="w-6 h-6 text-[#B89558] mb-3" />
                <h3 className="font-serif text-base font-bold text-[#17191C]">Spatial Precision</h3>
                <p className="text-xs text-[#6B7280] mt-1.5 leading-relaxed">
                  Real room volumes, accurate light orientation, and true window glazing before physical site visits.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#F7F8FA] border border-[#E7E9ED]">
                <Shield className="w-6 h-6 text-[#B89558] mb-3" />
                <h3 className="font-serif text-base font-bold text-[#17191C]">Verified Blueprints</h3>
                <p className="text-xs text-[#6B7280] mt-1.5 leading-relaxed">
                  Every listed estate is cross-referenced with civil approvals, RERA certificates, and CAD drawings.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#F7F8FA] border border-[#E7E9ED]">
                <Compass className="w-6 h-6 text-[#B89558] mb-3" />
                <h3 className="font-serif text-base font-bold text-[#17191C]">Private Concierge</h3>
                <p className="text-xs text-[#6B7280] mt-1.5 leading-relaxed">
                  Discreet advisory with direct developer channels and zero unsolicited commercial brokerage.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link to="/about" className="btn btn-outline inline-flex items-center gap-2">
                <span>Read Our Complete Architectural Manifesto</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Architectural Photography Frame (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-[#0c0d10] border border-[#E7E9ED]">
              <img
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
                alt="EstateVerse 3D Architectural Detail"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 text-white">
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#FAF6EE] block mb-1">
                  ESTATEVERSE SIGNATURE ARCHIVES
                </span>
                <h4 className="font-serif text-2xl font-bold">The Obsidian Pavilion</h4>
                <p className="text-xs text-white/80 mt-1 leading-relaxed">
                  Super Corridor, Indore · 3,200 sq. ft. Cantilevered Concrete Residence with Private Reflection Pool
                </p>
              </div>
            </div>

            {/* Floating verification seal */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl border border-[#E7E9ED] shadow-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FAF6EE] text-[#B89558] border border-[#E9DCBC] flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#17191C] block">100% Verified Geometry</span>
                <span className="text-[10px] text-[#6B7280]">Spatial RERA Certification</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
