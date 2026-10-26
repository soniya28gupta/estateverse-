import React from 'react';
import { Eye, ShieldCheck, Scale, Sparkles, Check, HelpCircle } from 'lucide-react';

export const TrustTransparency: React.FC = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Section 7: Visual Storytelling */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
        <div className="lg:col-span-6 relative">
          <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-[#E7E9ED] shadow-soft-xl relative">
            <img
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
              alt="Architectural space"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-[#E7E9ED] shadow-soft">
              <span className="text-xs text-[#B89558] font-bold uppercase tracking-wider block">
                Spatial Certainty
              </span>
              <p className="text-xs text-[#17191C] mt-1 font-medium leading-relaxed">
                "Experience sunlight orientation, ceiling volumes, and material textures digitally before driving across the city."
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF6EE] border border-[#E9DCBC] text-[#B89558] text-xs font-bold tracking-wider uppercase shadow-soft-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#B89558]" />
            A NEW STANDARD IN DISCOVERY
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#17191C] leading-tight">
            More Than a Property. <br />
            <span className="text-[#B89558]">
              A Place to Belong.
            </span>
          </h2>
          <p className="text-[#6B7280] text-sm sm:text-base leading-relaxed font-normal">
            EstateVerse 3D was conceived to dismantle traditional real estate friction. We replace static floorplans with navigable 3D environments, opaque loan terms with transparent EMI calculations, and ambiguous neighborhoods with verified point-of-interest analysis.
          </p>

          <div className="space-y-4 pt-2">
            <div className="flex items-start gap-3.5">
              <div className="p-2 rounded-xl bg-[#FAF6EE] text-[#B89558] border border-[#E9DCBC] mt-0.5">
                <Eye className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-[#17191C] text-base">Visualize Before You Visit</h4>
                <p className="text-xs text-[#6B7280] mt-0.5 font-normal">Inspect room scales, sightlines, and natural light digitally.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2 rounded-xl bg-[#FAF6EE] text-[#B89558] border border-[#E9DCBC] mt-0.5">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-[#17191C] text-base">Understand Your Budget</h4>
                <p className="text-xs text-[#6B7280] mt-0.5 font-normal">No hidden surprises. Calculate down payments, EMIs, and stamp duty upfront.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2 rounded-xl bg-[#FAF6EE] text-[#B89558] border border-[#E9DCBC] mt-0.5">
                <Scale className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-[#17191C] text-base">Find the Right Neighborhood</h4>
                <p className="text-xs text-[#6B7280] mt-0.5 font-normal">Evaluate transit lines, schools, and hospitals with direct route markers.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 8: How It Works */}
      <div className="mb-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#B89558] block mb-2">
            STREAMLINED JOURNEY
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#17191C] mb-3">
            How EstateVerse 3D Works
          </h2>
          <p className="text-xs sm:text-sm text-[#6B7280] font-normal">
            Three simple steps to transition from inspiration to confident ownership.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="p-7 sm:p-8 rounded-3xl bg-white border border-[#E7E9ED] shadow-soft hover:shadow-soft-xl transition-all duration-300">
            <span className="font-serif text-3xl font-bold text-[#B89558] block mb-3">01</span>
            <h4 className="font-serif text-xl font-bold text-[#17191C] mb-2">Discover</h4>
            <p className="text-xs text-[#6B7280] leading-relaxed font-normal">
              Filter by Indian city, property typology, budget brackets, and bedrooms or ask EstateMate AI for curated suggestions.
            </p>
          </div>

          <div className="p-7 sm:p-8 rounded-3xl bg-white border border-[#E7E9ED] shadow-soft hover:shadow-soft-xl transition-all duration-300">
            <span className="font-serif text-3xl font-bold text-[#B89558] block mb-3">02</span>
            <h4 className="font-serif text-xl font-bold text-[#17191C] mb-2">Explore</h4>
            <p className="text-xs text-[#6B7280] leading-relaxed font-normal">
              Orbit the property in real 3D, inspect double-height salons, suites, and swimming pools, and review neighborhood transit.
            </p>
          </div>

          <div className="p-7 sm:p-8 rounded-3xl bg-white border border-[#E7E9ED] shadow-soft hover:shadow-soft-xl transition-all duration-300">
            <span className="font-serif text-3xl font-bold text-[#B89558] block mb-3">03</span>
            <h4 className="font-serif text-xl font-bold text-[#17191C] mb-2">Decide</h4>
            <p className="text-xs text-[#6B7280] leading-relaxed font-normal">
              Compare properties side-by-side, calculate exact loan EMIs, and submit a confidential private visit inquiry.
            </p>
          </div>
        </div>
      </div>

      {/* Trust & Transparency Disclosure Panel */}
      <div className="p-7 sm:p-9 rounded-3xl bg-[#F7F8FA] border border-[#E7E9ED]">
        <div className="flex items-start gap-4">
          <div className="p-2.5 rounded-2xl bg-[#FAF6EE] text-[#B89558] border border-[#E9DCBC] shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h4 className="font-serif text-xl font-bold text-[#17191C]">
              Data Integrity & Educational Transparency Policy
            </h4>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              To preserve authentic consumer trust, EstateVerse 3D strictly adheres to complete transparency:
            </p>
            <ul className="text-xs text-[#6B7280] space-y-1.5 list-disc pl-4 pt-1 font-normal">
              <li>All property listings in this showcase represent realistic curated architectural specimens designed for demonstration and planning.</li>
              <li>Price approximations, EMI outputs, and stamp duties are calculated using standard Indian banking formulas and do not constitute loan approvals or legal underwriting.</li>
              <li>3D environments depict true procedural architectural layouts optimized for spatial discovery.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
