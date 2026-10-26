import React from 'react';
import { Box, Heart, MapPin, Mail, Phone, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#F7F8FA] border-t border-[#E7E9ED] text-[#6B7280] text-xs pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#17191C] text-white flex items-center justify-center font-bold shadow-soft">
                <Box className="w-5 h-5 stroke-[2]" />
              </div>
              <div className="font-display text-xl font-bold tracking-wider text-[#17191C]">
                ESTATEVERSE <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-[#FAF6EE] text-[#B89558] border border-[#E9DCBC] font-sans font-bold">3D</span>
              </div>
            </Link>
            <p className="text-xs text-[#6B7280] leading-relaxed max-w-sm font-normal">
              Next-generation 3D architectural property discovery showroom. Bringing spatial certainty, financial clarity, and verified neighborhood intelligence to extraordinary living spaces.
            </p>
            <div className="pt-2 text-[11px] font-semibold text-[#17191C]">
              Indore • Bhopal • Bengaluru • Delhi NCR • Mumbai
            </div>
          </div>

          {/* Discovery Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#17191C] uppercase tracking-wider">
              Discovery
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#featured-properties" className="hover:text-[#B89558] transition">
                  Featured Properties
                </a>
              </li>
              <li>
                <a href="#experience-3d" className="hover:text-[#B89558] transition">
                  3D Living Showroom
                </a>
              </li>
              <li>
                <a href="#curated-collections" className="hover:text-[#B89558] transition">
                  Curated Collections
                </a>
              </li>
              <li>
                <a href="#neighborhoods" className="hover:text-[#B89558] transition">
                  Neighborhood Transit
                </a>
              </li>
              <li>
                <a href="#affordability-calculator" className="hover:text-[#B89558] transition">
                  Mortgage Calculator
                </a>
              </li>
            </ul>
          </div>

          {/* Solutions */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#17191C] uppercase tracking-wider">
              Curated Collections
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#curated-collections" className="hover:text-[#B89558] transition">
                  Modern Villas
                </a>
              </li>
              <li>
                <a href="#curated-collections" className="hover:text-[#B89558] transition">
                  Luxury Apartments
                </a>
              </li>
              <li>
                <a href="#curated-collections" className="hover:text-[#B89558] transition">
                  Waterfront Homes
                </a>
              </li>
              <li>
                <a href="#curated-collections" className="hover:text-[#B89558] transition">
                  Penthouse Living
                </a>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#B89558] transition">
                  About EstateVerse
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Legal */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#17191C] uppercase tracking-wider">
              Concierge & Legal
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li className="flex items-center gap-1.5 text-[#17191C]">
                <Mail className="w-3.5 h-3.5 text-[#B89558]" />
                concierge@estateverse.in
              </li>
              <li className="flex items-center gap-1.5 text-[#17191C]">
                <Phone className="w-3.5 h-3.5 text-[#B89558]" />
                +91 (0) 731 498 7200
              </li>
              <li className="pt-2 text-[#9CA3AF]">
                RERA Registered Showcase Platform
              </li>
              <li className="text-[#9CA3AF]">
                Spatial Accuracy ISO 9001:2015
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#E7E9ED] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div>
            © {new Date().getFullYear()} EstateVerse 3D Technologies. All rights reserved. Built for architectural discovery.
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-[#17191C] cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[#17191C] cursor-pointer">Terms of Service</span>
            <span className="hover:text-[#17191C] cursor-pointer">RERA Disclosures</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-white border border-[#E7E9ED] text-[#17191C] hover:text-[#B89558] hover:border-[#B89558] transition shadow-soft-sm flex items-center gap-1"
              title="Return to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
