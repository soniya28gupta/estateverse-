import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box, MapPin, Mail, Phone, ArrowUp, Shield, FileText,
  ExternalLink, ChevronRight
} from 'lucide-react';

/* ── helper: scroll to section (cross-route aware) ─────────────────── */
function useSectionNav() {
  const navigate = useNavigate();
  return (sectionId: string) => {
    if (window.location.pathname === '/') {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      sessionStorage.setItem('pendingScrollSection', sectionId);
      navigate('/');
    }
  };
}

const CITIES = ['Indore', 'Bhopal', 'Bengaluru', 'Delhi NCR', 'Mumbai'];

export const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const goToSection = useSectionNav();

  /* Entrance animation via IntersectionObserver */
  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer
      ref={footerRef}
      className={`bg-[#FAFAF9] border-t border-[#E7E9ED] transition-opacity duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}
      aria-label="Site footer"
    >
      {/* ── GOLDEN TOP ACCENT LINE ── */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#B89558]/40 to-transparent" aria-hidden="true" />

      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">

        {/* ── MAIN GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 py-14 lg:py-16">

          {/* ── BRAND COLUMN (4/12) ── */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            <Link to="/" className="inline-flex items-center gap-3 group w-fit" aria-label="EstateVerse 3D — Home">
              <div className="w-10 h-10 rounded-xl bg-[#17191C] group-hover:bg-[#B89558] flex items-center justify-center transition-colors duration-300 shadow-sm">
                <Box style={{ width: '20px', height: '20px' }} className="text-white stroke-[2]" />
              </div>
              <div>
                <div className="font-display text-base font-bold tracking-widest text-[#17191C] flex items-center gap-2">
                  ESTATEVERSE
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#FAF6EE] text-[#B89558] border border-[#E9DCBC] font-sans font-bold leading-none tracking-wide">
                    3D
                  </span>
                </div>
                <p className="text-[10px] tracking-widest uppercase text-[#9CA3AF] font-medium mt-0.5">
                  Luxury Architectural Living
                </p>
              </div>
            </Link>

            <p className="text-[13px] text-[#6B7280] leading-relaxed max-w-xs font-normal">
              Discover exceptional properties through immersive 3D experiences, verified property insights, and intelligent real estate discovery.
            </p>

            {/* City presence */}
            <div className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#B89558] shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-[11px] font-semibold text-[#17191C] leading-relaxed">
                {CITIES.join(' • ')}
              </p>
            </div>

            {/* Compliance badges */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-[#E7E9ED] text-[10px] font-semibold text-[#6B7280]">
                <Shield className="w-3 h-3 text-[#B89558]" aria-hidden="true" />
                RERA Registered
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-[#E7E9ED] text-[10px] font-semibold text-[#6B7280]">
                <FileText className="w-3 h-3 text-[#B89558]" aria-hidden="true" />
                ISO 9001:2015
              </span>
            </div>
          </div>

          {/* ── DISCOVER COLUMN (2.5/12) ── */}
          <div className="lg:col-span-3">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#17191C] mb-5">
              Discover
            </h3>
            <ul className="space-y-3" role="list">
              {[
                { label: 'Featured Properties', section: 'featured-properties' },
                { label: '3D Living Showroom',  section: 'experience-3d' },
                { label: 'Curated Collections', section: 'curated-collections' },
                { label: 'Neighborhoods',       section: 'neighborhoods' },
                { label: 'Mortgage Calculator', section: 'affordability-calculator' },
              ].map(({ label, section }) => (
                <li key={label}>
                  <button
                    type="button"
                    onClick={() => goToSection(section)}
                    className="footer-link"
                  >
                    <ChevronRight className="w-3 h-3 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity -ml-1" aria-hidden="true" />
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* ── COLLECTIONS COLUMN (2.5/12) ── */}
          <div className="lg:col-span-3">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#17191C] mb-5">
              Collections
            </h3>
            <ul className="space-y-3" role="list">
              {[
                'Modern Villas',
                'Luxury Apartments',
                'Waterfront Homes',
                'Penthouse Living',
                'About EstateVerse',
              ].map((label) => (
                <li key={label}>
                  {label === 'About EstateVerse' ? (
                    <Link to="/about" className="footer-link group">
                      <ChevronRight className="w-3 h-3 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity -ml-1" aria-hidden="true" />
                      {label}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => goToSection('curated-collections')}
                      className="footer-link group"
                    >
                      <ChevronRight className="w-3 h-3 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity -ml-1" aria-hidden="true" />
                      {label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* ── CONTACT COLUMN (2/12) ── */}
          <div className="lg:col-span-2">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#17191C] mb-5">
              Concierge
            </h3>

            <div className="space-y-3.5">
              {/* Email */}
              <a
                href="mailto:concierge@estateverse.in"
                className="flex items-start gap-2.5 group"
                aria-label="Email us"
              >
                <span className="w-6 h-6 rounded-lg bg-[#FAF6EE] border border-[#E9DCBC] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#B89558] transition-colors">
                  <Mail className="w-3 h-3 text-[#B89558] group-hover:text-white transition-colors" aria-hidden="true" />
                </span>
                <span className="text-[12px] text-[#6B7280] group-hover:text-[#B89558] transition-colors break-all leading-relaxed">
                  concierge@estateverse.in
                </span>
              </a>

              {/* Phone */}
              <a
                href="tel:+917314987200"
                className="flex items-start gap-2.5 group"
                aria-label="Call us"
              >
                <span className="w-6 h-6 rounded-lg bg-[#FAF6EE] border border-[#E9DCBC] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#B89558] transition-colors">
                  <Phone className="w-3 h-3 text-[#B89558] group-hover:text-white transition-colors" aria-hidden="true" />
                </span>
                <span className="text-[12px] text-[#6B7280] group-hover:text-[#B89558] transition-colors leading-relaxed">
                  +91 (0) 731 498 7200
                </span>
              </a>

              {/* Location */}
              <div className="flex items-start gap-2.5">
                <span className="w-6 h-6 rounded-lg bg-[#F7F8FA] border border-[#E7E9ED] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-3 h-3 text-[#9CA3AF]" aria-hidden="true" />
                </span>
                <span className="text-[11px] text-[#9CA3AF] leading-relaxed">
                  Pan-India presence across 5 cities
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="border-t border-[#E7E9ED] py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-[11px] text-[#9CA3AF] font-normal text-center sm:text-left">
            © {new Date().getFullYear()} EstateVerse 3D Technologies. All rights reserved.
            <span className="hidden sm:inline"> Built for architectural discovery.</span>
          </p>

          {/* Legal links + back-to-top */}
          <div className="flex items-center gap-1 flex-wrap justify-center">
            {['Privacy Policy', 'Terms of Service', 'RERA Disclosures'].map((label, i) => (
              <React.Fragment key={label}>
                {i > 0 && <span className="text-[#E7E9ED] select-none">·</span>}
                <button
                  type="button"
                  className="text-[11px] text-[#9CA3AF] hover:text-[#B89558] transition-colors px-1.5 py-0.5 rounded"
                >
                  {label}
                </button>
              </React.Fragment>
            ))}

            <span className="text-[#E7E9ED] select-none ml-1">·</span>

            {/* Back to top */}
            <button
              type="button"
              onClick={scrollToTop}
              className="ml-1 w-8 h-8 rounded-xl bg-white border border-[#E7E9ED] hover:border-[#B89558] hover:bg-[#FAF6EE] text-[#9CA3AF] hover:text-[#B89558] flex items-center justify-center transition-all shadow-sm hover:shadow-md"
              aria-label="Scroll back to top"
              title="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
