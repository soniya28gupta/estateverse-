import React, { useState } from 'react';
import {
  X,
  Box,
  Heart,
  Share2,
  MapPin,
  Bed,
  Bath,
  Move,
  Calendar,
  Send,
  CheckCircle2,
  Sparkles,
  Phone,
  Mail,
  User,
  ShieldCheck,
  TrendingUp,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Property, InquiryFormData } from '../../types/property';
import { formatINR, calculateMortgage } from '../../utils/formatters';
import { VillaScene } from '../../three/VillaScene';
import confetti from 'canvas-confetti';

interface PropertyModalProps {
  property: Property | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export const PropertyModal: React.FC<PropertyModalProps> = ({
  property,
  onClose,
  isFavorite,
  onToggleFavorite
}) => {
  if (!property) return null;

  const [activeTab, setActiveTab] = useState<'overview' | '3d' | 'gallery'>('overview');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Inquiry form state
  const [formData, setFormData] = useState<InquiryFormData>({
    propertyId: property.id,
    propertyTitle: property.title,
    name: '',
    email: '',
    phone: '',
    date: '',
    timeSlot: 'Morning (10 AM - 1 PM)',
    type: 'visit',
    message: `I am interested in scheduling a private architectural tour of ${property.title} in ${property.locality}.`
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const emiEstimate = calculateMortgage({
    propertyPrice: property.price,
    downPaymentPercent: 20,
    annualInterestRate: 8.5,
    tenureYears: 20,
    additionalExpensesPercent: 6
  }).monthlyEMI;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setFormError('Please fill in your name, email, and contact phone number.');
      return;
    }

    setFormError('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // graceful
      }
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-white border border-[#E7E9ED] rounded-3xl shadow-soft-xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Bar */}
        <div className="px-6 py-4 bg-white border-b border-[#E7E9ED] flex items-center justify-between z-10 shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#FAF6EE] text-[#B89558] border border-[#E9DCBC]">
              {property.propertyType}
            </span>
            <span className="text-xs text-[#6B7280] font-medium hidden sm:inline-block">
              {property.locality}, {property.city}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onToggleFavorite(property.id)}
              className={`p-2 rounded-2xl border transition ${
                isFavorite
                  ? 'bg-rose-500 text-white border-rose-500'
                  : 'bg-[#F7F8FA] text-[#17191C] hover:text-rose-500 border-[#E7E9ED]'
              }`}
              title="Save property"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-2xl bg-[#F7F8FA] text-[#6B7280] hover:text-[#17191C] border border-[#E7E9ED] transition"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* View Tabs */}
        <div className="px-6 py-3 bg-[#F7F8FA] border-b border-[#E7E9ED] flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
              activeTab === 'overview'
                ? 'bg-white text-[#17191C] shadow-soft-sm'
                : 'text-[#6B7280] hover:text-[#17191C]'
            }`}
          >
            Overview & Specifications
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('3d')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
              activeTab === '3d'
                ? 'bg-[#17191C] text-white shadow-soft-sm'
                : 'text-[#6B7280] hover:text-[#17191C]'
            }`}
          >
            <Box className="w-3.5 h-3.5 text-[#B89558]" />
            Experience in 3D
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('gallery')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
              activeTab === 'gallery'
                ? 'bg-white text-[#17191C] shadow-soft-sm'
                : 'text-[#6B7280] hover:text-[#17191C]'
            }`}
          >
            Visual Gallery ({property.images.length})
          </button>
        </div>

        {/* Scrollable Content Container */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          {activeTab === '3d' ? (
            /* 3D Tab */
            <div className="h-[520px] w-full rounded-2xl overflow-hidden border border-[#E7E9ED]">
              <VillaScene property={property} showPropertyOverlay={false} />
            </div>
          ) : activeTab === 'gallery' ? (
            /* Gallery Tab */
            <div className="space-y-4">
              <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl bg-[#F7F8FA] border border-[#E7E9ED]">
                <img
                  src={property.images[activeImageIndex] || property.images[0]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-5 gap-3">
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`aspect-[16/10] rounded-xl overflow-hidden border-2 transition ${
                      activeImageIndex === idx ? 'border-[#B89558] scale-95 shadow-md' : 'border-[#E7E9ED] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Overview Tab */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Details & Photos */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#17191C] mb-1">
                    {property.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#6B7280] font-medium flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#B89558]" />
                    {property.locality}, {property.city}
                  </p>
                </div>

                {/* Main Hero Photo */}
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-[#F7F8FA] border border-[#E7E9ED]">
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-[#E7E9ED] shadow-soft">
                    <span className="font-serif text-xl font-bold text-[#17191C]">
                      {formatINR(property.price)}
                    </span>
                    <span className="text-[10px] text-[#6B7280] block font-medium">
                      ~{formatINR(emiEstimate)}/mo estimated EMI
                    </span>
                  </div>
                </div>

                {/* Specs Pill Matrix */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-2xl bg-[#F7F8FA] border border-[#E7E9ED] text-center">
                    <span className="text-xs text-[#6B7280] block font-medium">Bedrooms</span>
                    <span className="font-serif text-base font-bold text-[#17191C]">{property.bedrooms} BHK</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#F7F8FA] border border-[#E7E9ED] text-center">
                    <span className="text-xs text-[#6B7280] block font-medium">Bathrooms</span>
                    <span className="font-serif text-base font-bold text-[#17191C]">{property.bathrooms} Baths</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#F7F8FA] border border-[#E7E9ED] text-center">
                    <span className="text-xs text-[#6B7280] block font-medium">Area</span>
                    <span className="font-serif text-base font-bold text-[#17191C]">{property.areaSqft.toLocaleString()} sq.ft</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#F7F8FA] border border-[#E7E9ED] text-center">
                    <span className="text-xs text-[#6B7280] block font-medium">Rate / sq.ft</span>
                    <span className="font-serif text-base font-bold text-[#B89558]">{formatINR(property.pricePerSqft, false)}</span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="font-serif text-base font-bold text-[#17191C] mb-2">Architectural Narrative</h4>
                  <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed font-normal">
                    {property.description}
                  </p>
                </div>

                {/* Amenities List */}
                <div>
                  <h4 className="font-serif text-base font-bold text-[#17191C] mb-3">Curated Amenities</h4>
                  <div className="grid grid-cols-2 gap-2.5">
                    {property.amenities.map((amenity, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-2xl bg-[#FAF6EE] border border-[#E9DCBC] text-xs font-medium text-[#17191C] flex items-center gap-2"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#B89558] shrink-0" />
                        {amenity}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Schedule Private Visit / Inquiry Form */}
              <div className="lg:col-span-5 bg-[#F7F8FA] border border-[#E7E9ED] rounded-3xl p-6 sm:p-7 shadow-soft-xl">
                <div className="mb-5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#B89558] block mb-1">
                    Direct Private Concierge
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#17191C]">
                    Request a Private Visit
                  </h3>
                  <p className="text-xs text-[#6B7280] mt-1 font-normal">
                    Schedule a private architectural walkthrough or inquire about purchase arrangements.
                  </p>
                </div>

                {isSubmitted ? (
                  <div className="p-6 rounded-2xl bg-white border border-[#E7E9ED] text-center space-y-3 animate-in zoom-in-95 duration-200 shadow-soft">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="font-serif text-lg font-bold text-[#17191C]">Inquiry Registered</h4>
                    <p className="text-xs text-[#6B7280] leading-relaxed">
                      Thank you, <span className="font-bold text-[#17191C]">{formData.name}</span>. Your request for <span className="font-bold text-[#B89558]">{property.title}</span> has been documented in your session.
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsSubmitted(false)}
                      className="px-4 py-2 rounded-xl bg-[#17191C] text-white text-xs font-semibold"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {formError && (
                      <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-600 font-medium">
                        {formError}
                      </div>
                    )}

                    <div>
                      <label className="block text-[11px] font-bold text-[#17191C] uppercase tracking-wider mb-1.5">Your Full Name</label>
                      <div className="relative flex items-center">
                        <User className="absolute left-3.5 w-4 h-4 text-[#9CA3AF]" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. Rahul Sharma"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full pl-10 pr-3 py-2.5 rounded-2xl bg-white text-[#17191C] text-xs font-medium border border-[#E7E9ED] focus:border-[#B89558] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-[#17191C] uppercase tracking-wider mb-1.5">Email Address</label>
                        <div className="relative flex items-center">
                          <Mail className="absolute left-3.5 w-4 h-4 text-[#9CA3AF]" />
                          <input
                            type="email"
                            required
                            placeholder="you@domain.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full pl-10 pr-3 py-2.5 rounded-2xl bg-white text-[#17191C] text-xs font-medium border border-[#E7E9ED] focus:border-[#B89558] focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-[#17191C] uppercase tracking-wider mb-1.5">Phone Number</label>
                        <div className="relative flex items-center">
                          <Phone className="absolute left-3.5 w-4 h-4 text-[#9CA3AF]" />
                          <input
                            type="tel"
                            required
                            placeholder="+91 98765 43210"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full pl-10 pr-3 py-2.5 rounded-2xl bg-white text-[#17191C] text-xs font-medium border border-[#E7E9ED] focus:border-[#B89558] focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#17191C] uppercase tracking-wider mb-1.5">Preferred Date</label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-2xl bg-white text-[#17191C] text-xs font-medium border border-[#E7E9ED] focus:border-[#B89558] focus:outline-none cursor-pointer"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#17191C] uppercase tracking-wider mb-1.5">Notes / Special Requests</label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full p-3 rounded-2xl bg-white text-[#17191C] text-xs font-medium border border-[#E7E9ED] focus:border-[#B89558] focus:outline-none resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-2xl bg-[#17191C] hover:bg-[#B89558] text-white font-semibold text-xs tracking-wide shadow-soft transition duration-200 flex items-center justify-center gap-2 active:scale-95"
                    >
                      <Send className="w-3.5 h-3.5" />
                      {isSubmitting ? 'Transmitting Request...' : 'Confirm Visit Request'}
                    </button>

                    <p className="text-[10px] text-[#9CA3AF] text-center pt-2 font-normal">
                      * Inquiries are handled by EstateVerse private concierge desk. Zero spam guarantee.
                    </p>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
