import React from 'react';
import { Eye, ShieldCheck, Scale, Sparkles, Check, HelpCircle } from 'lucide-react';

export const TrustTransparency: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section 7: Visual Storytelling */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-24">
        <div className="lg:col-span-6 relative">
          <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-gold-400/30 shadow-2xl relative">
            <img
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
              alt="Architectural space"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-midnight-950/80 backdrop-blur-md border border-gold-400/20">
              <span className="text-xs text-gold-400 font-bold uppercase tracking-wider block">
                Spatial Certainty
              </span>
              <p className="text-xs text-stone-300 mt-1">
                "Experience sunlight orientation, ceiling volumes, and material textures digitally before driving across the city."
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-6">
          <span className="text-xs font-bold uppercase tracking-wider text-gold-400">
            A New Standard in Discovery
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            More Than a Property. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-400">
              A Place to Belong.
            </span>
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            EstateVerse 3D was conceived to dismantle traditional real estate friction. We replace static floorplans with navigable 3D environments, opaque loan terms with transparent EMI calculations, and ambiguous neighborhoods with verified point-of-interest analysis.
          </p>

          <div className="space-y-3.5 pt-2">
            <div className="flex items-start gap-3">
              <div className="p-1.5 rounded-lg bg-gold-400/20 text-gold-400 mt-0.5">
                <Eye className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-white text-sm">Visualize Before You Visit</h4>
                <p className="text-xs text-stone-400">Inspect room scales, sightlines, and natural light digitally.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-1.5 rounded-lg bg-gold-400/20 text-gold-400 mt-0.5">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-white text-sm">Understand Your Budget</h4>
                <p className="text-xs text-stone-400">No hidden surprises. Calculate down payments, EMIs, and stamp duty upfront.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-1.5 rounded-lg bg-gold-400/20 text-gold-400 mt-0.5">
                <Scale className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-white text-sm">Find the Right Neighborhood</h4>
                <p className="text-xs text-stone-400">Evaluate transit lines, schools, and hospitals with direct route markers.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 8: How It Works */}
      <div className="mb-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-gold-400 block mb-2">
            Streamlined Journey
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-3">
            How EstateVerse 3D Works
          </h2>
          <p className="text-xs sm:text-sm text-stone-400">
            Three simple steps to transition from inspiration to confident ownership.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-midnight-900/80 border border-stone-800 hover:border-gold-400/40 transition">
            <span className="font-serif text-3xl font-bold text-gold-400/50 block mb-3">01</span>
            <h4 className="font-serif text-lg font-bold text-white mb-2">Discover</h4>
            <p className="text-xs text-stone-300 leading-relaxed">
              Filter by Indian city, property typology, budget brackets, and bedrooms or ask EstateMate AI for curated suggestions.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-midnight-900/80 border border-stone-800 hover:border-gold-400/40 transition">
            <span className="font-serif text-3xl font-bold text-gold-400/50 block mb-3">02</span>
            <h4 className="font-serif text-lg font-bold text-white mb-2">Explore</h4>
            <p className="text-xs text-stone-300 leading-relaxed">
              Orbit the property in real 3D, inspect double-height salons, suites, and swimming pools, and review neighborhood transit.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-midnight-900/80 border border-stone-800 hover:border-gold-400/40 transition">
            <span className="font-serif text-3xl font-bold text-gold-400/50 block mb-3">03</span>
            <h4 className="font-serif text-lg font-bold text-white mb-2">Decide</h4>
            <p className="text-xs text-stone-300 leading-relaxed">
              Compare properties side-by-side, calculate exact loan EMIs, and submit a confidential private visit inquiry.
            </p>
          </div>
        </div>
      </div>

      {/* Section 14: Trust & Transparency Disclosure Panel */}
      <div className="p-6 sm:p-8 rounded-2xl bg-midnight-900/60 border border-gold-400/25">
        <div className="flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-gold-400/10 text-gold-400 shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h4 className="font-serif text-lg font-bold text-white">
              Data Integrity & Educational Transparency Policy
            </h4>
            <p className="text-xs text-stone-300 leading-relaxed">
              To preserve authentic consumer trust, EstateVerse 3D strictly adheres to complete transparency:
            </p>
            <ul className="text-xs text-stone-400 space-y-1.5 list-disc pl-4 pt-1">
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
