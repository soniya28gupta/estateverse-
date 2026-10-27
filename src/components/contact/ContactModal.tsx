import React, { useState } from 'react';
import { X, Sparkles, Send, CheckCircle2, Phone, Mail, MapPin, Calendar, Clock, Building } from 'lucide-react';
import { SAMPLE_PROPERTIES } from '../../data/properties';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPropertyTitle?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  initialPropertyTitle = ''
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [inquiryType, setInquiryType] = useState<'3d-tour' | 'physical-visit' | 'pricing'>('3d-tour');
  const [property, setProperty] = useState(initialPropertyTitle || SAMPLE_PROPERTIES[0].title);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate luxury concierge dispatch
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleResetAndClose();
      }}
    >
      <div className="relative w-full max-w-xl bg-white rounded-3xl border border-[#E7E9ED] shadow-2xl overflow-hidden animate-scale-in">
        {/* Top Header */}
        <div className="p-6 sm:p-8 bg-[#FAF6EE] border-b border-[#E9DCBC] relative">
          <button
            type="button"
            onClick={handleResetAndClose}
            className="absolute top-5 right-5 p-2 rounded-xl text-[#6B7280] hover:text-[#17191C] hover:bg-black/5 transition"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E9DCBC] text-[#B89558] text-[10px] font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3 h-3 text-[#B89558]" />
            Private Concierge Desk
          </div>
          <h2 id="contact-modal-title" className="font-serif text-2xl sm:text-3xl font-bold text-[#17191C]">
            Schedule a Private Consultation
          </h2>
          <p className="text-xs sm:text-sm text-[#6B7280] mt-1 leading-relaxed">
            Connect directly with an EstateVerse architectural advisor for interactive 3D walkthroughs or bespoke property acquisitions.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-soft">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#17191C]">
                Request Confirmed
              </h3>
              <p className="text-sm text-[#6B7280] max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-[#17191C]">{name}</strong>. Our senior architectural concierge will contact you at <strong className="text-[#17191C]">{email || phone}</strong> within 2 hours to confirm your private session.
              </p>
              <div className="p-4 rounded-2xl bg-[#F7F8FA] border border-[#E7E9ED] text-xs text-[#6B7280] max-w-sm mx-auto text-left space-y-1.5 mt-4">
                <div className="flex justify-between">
                  <span>Selected Property:</span>
                  <strong className="text-[#17191C]">{property}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Inquiry Type:</span>
                  <strong className="text-[#17191C] capitalize">{inquiryType.replace('-', ' ')}</strong>
                </div>
              </div>
              <button
                type="button"
                onClick={handleResetAndClose}
                className="btn btn-primary px-8 mt-4"
              >
                Return to Portfolio
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Inquiry Type Radio / Pill */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#17191C] block mb-1.5">
                  Type of Inquiry
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: '3d-tour', label: '3D Walkthrough' },
                    { id: 'physical-visit', label: 'Physical Visit' },
                    { id: 'pricing', label: 'Portfolio Guide' }
                  ].map(t => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setInquiryType(t.id as any)}
                      className={`py-2 px-2.5 rounded-xl text-xs font-semibold border transition text-center ${
                        inquiryType === t.id
                          ? 'bg-[#17191C] text-white border-[#17191C] shadow-sm'
                          : 'bg-[#F7F8FA] text-[#6B7280] border-[#E7E9ED] hover:bg-neutral-100'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label htmlFor="contact-name" className="text-xs font-semibold text-[#17191C] block mb-1">
                    Full Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Elena Rostova"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F8FA] border border-[#E7E9ED] text-xs text-[#17191C] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#B89558] focus:bg-white transition"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="text-xs font-semibold text-[#17191C] block mb-1">
                    Email Address *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. elena@architecture.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F8FA] border border-[#E7E9ED] text-xs text-[#17191C] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#B89558] focus:bg-white transition"
                  />
                </div>
              </div>

              {/* Phone & Property Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label htmlFor="contact-phone" className="text-xs font-semibold text-[#17191C] block mb-1">
                    Phone Number
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F8FA] border border-[#E7E9ED] text-xs text-[#17191C] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#B89558] focus:bg-white transition"
                  />
                </div>
                <div>
                  <label htmlFor="contact-property" className="text-xs font-semibold text-[#17191C] block mb-1">
                    Interested Estate
                  </label>
                  <select
                    id="contact-property"
                    value={property}
                    onChange={(e) => setProperty(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#F7F8FA] border border-[#E7E9ED] text-xs text-[#17191C] focus:outline-none focus:border-[#B89558] focus:bg-white cursor-pointer transition"
                  >
                    {SAMPLE_PROPERTIES.map(p => (
                      <option key={p.id} value={p.title}>
                        {p.title} ({p.locality})
                      </option>
                    ))}
                    <option value="General Portfolio Inquiry">General Luxury Portfolio</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="contact-message" className="text-xs font-semibold text-[#17191C] block mb-1">
                  Private Notes or Specific Requirements
                </label>
                <textarea
                  id="contact-message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share details regarding timeline, spatial preferences, or specific architectural requirements..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F8FA] border border-[#E7E9ED] text-xs text-[#17191C] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#B89558] focus:bg-white transition resize-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn btn-primary btn-lg justify-center shadow-soft hover:shadow-soft-xl"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Connecting with Concierge...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-4 h-4 text-[#B89558]" />
                      <span>Request Private Consultation</span>
                    </span>
                  )}
                </button>
              </div>

              <p className="text-[10px] text-[#9CA3AF] text-center">
                Discreet and confidential. EstateVerse 3D never distributes private investor contact details.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
