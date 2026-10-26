import React from 'react';
import { Box, Heart, MapPin, Mail, Phone, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-midnight-950 border-t border-stone-800 text-stone-400 text-xs pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gold-400 text-midnight-950 flex items-center justify-center font-bold">
                <Box className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="font-display text-lg font-bold tracking-wider text-white">
                ESTATEVERSE <span className="text-gold-400 text-xs font-sans">3D</span>
              </div>
            </Link>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Next-generation 3D architectural property discovery platform. Bringing spatial certainty, financial clarity, and neighborhood intelligence to Indian real estate.
            </p>
            <div className="pt-2 text-[11px] text-stone-500">
              Indore • Bhopal • Bengaluru • Delhi NCR • Mumbai
            </div>
          </div>

          {/* Discovery Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Discovery
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#featured-properties" className="hover:text-gold-300 transition">
                  Featured Spaces
                </a>
              </li>
              <li>
                <a href="#interactive-hero-3d" className="hover:text-gold-300 transition">
                  3D Architectural Tours
                </a>
              </li>
              <li>
                <a href="#neighborhoods" className="hover:text-gold-300 transition">
                  Neighborhood Transit
                </a>
              </li>
              <li>
                <a href="#affordability-calculator" className="hover:text-gold-300 transition">
                  EMI & Affordability
                </a>
              </li>
              <li>
                <a href="#property-comparison" className="hover:text-gold-300 transition">
                  Property Comparison
                </a>
              </li>
            </ul>
          </div>

          {/* Solutions */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Platform
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:text-gold-300 transition">
                  About EstateVerse
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="hover:text-gold-300 transition">
                  Saved Favorites
                </Link>
              </li>
              <li>
                <span className="text-stone-500 cursor-not-allowed">
                  Developer Portal (SDK)
                </span>
              </li>
              <li>
                <span className="text-stone-500 cursor-not-allowed">
                  Architect Submissions
                </span>
              </li>
            </ul>
          </div>

          {/* Contact & Legal */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Legal & Support
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <span className="hover:text-stone-300 cursor-pointer">Privacy Framework</span>
              </li>
              <li>
                <span className="hover:text-stone-300 cursor-pointer">Terms of Exploration</span>
              </li>
              <li>
                <span className="hover:text-stone-300 cursor-pointer">Model Disclaimer</span>
              </li>
              <li>
                <span className="hover:text-stone-300 cursor-pointer">Fair Housing Standards</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <p>© {new Date().getFullYear()} EstateVerse 3D. Crafted for next-generation architectural real estate discovery.</p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-stone-400 hover:text-gold-300 transition"
          >
            Back to Top
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
