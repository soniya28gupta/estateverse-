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
  TrendingUp
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
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // graceful
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-midnight-950/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-midnight-900 border border-gold-400/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Bar */}
        <div className="px-5 py-3.5 bg-midnight-950/90 border-b border-stone-800 flex items-center justify-between z-10 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gold-400/20 text-gold-300 border border-gold-400/30">
              {property.propertyType}
            </span>
            <span className="text-xs text-stone-400 hidden sm:inline-block">
              {property.locality}, {property.city}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleFavorite(property.id)}
              className={`p-2 rounded-xl border transition ${
                isFavorite
                  ? 'bg-rose-500 text-white border-rose-400'
                  : 'bg-midnight-900 text-stone-300 hover:text-rose-400 border-stone-800'
              }`}
              title="Save property"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-midnight-900 text-stone-400 hover:text-white border border-stone-800 transition"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* View Tabs */}
        <div className="px-5 py-2.5 bg-midnight-950/60 border-b border-stone-800/80 flex items-center gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'overview'
                ? 'bg-gold-400 text-midnight-950 shadow-md'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            Overview & Specs
          </button>
          <button
            onClick={() => setActiveTab('3d')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              activeTab === '3d'
                ? 'bg-gold-400 text-midnight-950 shadow-md'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            Interactive 3D Model
          </button>
          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'gallery'
                ? 'bg-gold-400 text-midnight-950 shadow-md'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            Visual Gallery ({property.images.length})
          </button>
        </div>

        {/* Scrollable Content Container */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7">
          {activeTab === '3d' ? (
            /* 3D Tab */
            <div className="h-[520px] w-full rounded-2xl overflow-hidden border border-gold-400/30">
              <VillaScene property={property} showPropertyOverlay={false} />
            </div>
          ) : activeTab === 'gallery' ? (
            /* Gallery Tab */
            <div className="space-y-4">
              <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl bg-midnight-950 border border-stone-800">
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
                    onClick={() => setActiveImageIndex(idx)}
                    className={`aspect-[16/10] rounded-xl overflow-hidden border-2 transition ${
                      activeImageIndex === idx ? 'border-gold-400 scale-95 shadow-lg' : 'border-stone-800 opacity-60 hover:opacity-100'
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
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-1">
                    {property.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-400 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-gold-400" />
                    {property.locality}, {property.city}
                  </p>
                </div>

                {/* Main Hero Photo */}
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-midnight-950 border border-stone-800">
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-3 left-3 bg-midnight-950/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-gold-400/30">
                    <span className="font-serif text-xl font-bold text-gold-300">
                      {formatINR(property.price)}
                    </span>
                    <span className="text-[10px] text-stone-400 block">
                      ~{formatINR(emiEstimate)}/mo estimated EMI
                    </span>
                  </div>
                </div>

                {/* Specs Pill Matrix */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-xl bg-midnight-950 border border-stone-800 text-center">
                    <span className="text-xs text-stone-400 block">Bedrooms</span>
                    <span className="font-serif text-base font-bold text-white">{property.bedrooms} BHK</span>
                  </div>
                  <div className="p-3 rounded-xl bg-midnight-950 border border-stone-800 text-center">
                    <span className="text-xs text-stone-400 block">Bathrooms</span>
                    <span className="font-serif text-base font-bold text-white">{property.bathrooms} Baths</span>
                  </div>
                  <div className="p-3 rounded-xl bg-midnight-950 border border-stone-800 text-center">
                    <span className="text-xs text-stone-400 block">Area</span>
                    <span className="font-serif text-base font-bold text-white">{property.areaSqft.toLocaleString()} sq.ft</span>
                  </div>
                  <div className="p-3 rounded-xl bg-midnight-950 border border-stone-800 text-center">
                    <span className="text-xs text-stone-400 block">Rate / sq.ft</span>
                    <span className="font-serif text-base font-bold text-gold-300">{formatINR(property.pricePerSqft, false)}</span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="font-serif text-base font-bold text-white mb-2">Architectural Narrative</h4>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                    {property.description}
                  </p>
                </div>

                {/* Amenities List */}
                <div>
                  <h4 className="font-serif text-base font-bold text-white mb-3">Curated Amenities</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {property.amenities.map((amenity, i) => (
                      <div
                        key={i}
                        className="p-2.5 rounded-xl bg-midnight-950/80 border border-stone-800/80 text-xs text-stone-300 flex items-center gap-2"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                        {amenity}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Schedule Private Visit / Inquiry Form */}
              <div className="lg:col-span-5 bg-midnight-950/90 border border-gold-400/30 rounded-2xl p-5 sm:p-6 shadow-2xl">
                <div className="mb-4">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-gold-400 block mb-1">
                    Direct Concierge
                  </span>
                  <h3 className="font-serif text-xl font-bold text-white">
                    Request a Private Visit
                  </h3>
                  <p className="text-xs text-stone-400">
                    Schedule a private architectural walkthrough or inquire about purchase arrangements.
                  </p>
                </div>

                {isSubmitted ? (
                  <div className="p-6 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-center space-y-3 animate-in zoom-in-95 duration-200">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="font-serif text-lg font-bold text-white">Inquiry Registered</h4>
                    <p className="text-xs text-stone-300 leading-relaxed">
                      Thank you, <span className="font-bold text-white">{formData.name}</span>. Your request for <span className="font-bold text-gold-300">{property.title}</span> has been documented in your demo session.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-4 py-1.5 rounded-lg bg-midnight-900 border border-stone-700 text-xs text-stone-300 hover:text-white"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3.5">
                    {formError && (
                      <div className="p-2.5 rounded-lg bg-rose-950/60 border border-rose-500/40 text-xs text-rose-300">
                        {formError}
                      </div>
                    )}

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-400 mb-1">Your Full Name</label>
                      <div className="relative flex items-center">
                        <User className="absolute left-3 w-4 h-4 text-stone-500" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. Rahul Sharma"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full pl-9 pr-3 py-2 rounded-xl bg-midnight-900 text-white text-xs border border-stone-800 focus:border-gold-400 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-400 mb-1">Email Address</label>
                        <div className="relative flex items-center">
                          <Mail className="absolute left-3 w-4 h-4 text-stone-500" />
                          <input
                            type="email"
                            required
                            placeholder="you@domain.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full pl-9 pr-3 py-2 rounded-xl bg-midnight-900 text-white text-xs border border-stone-800 focus:border-gold-400 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-stone-400 mb-1">Phone Number</label>
                        <div className="relative flex items-center">
                          <Phone className="absolute left-3 w-4 h-4 text-stone-500" />
                          <input
                            type="tel"
                            required
                            placeholder="+91 98765 43210"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full pl-9 pr-3 py-2 rounded-xl bg-midnight-900 text-white text-xs border border-stone-800 focus:border-gold-400 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-400 mb-1">Preferred Date</label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-midnight-900 text-white text-xs border border-stone-800 focus:border-gold-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-400 mb-1">Notes / Inquiry</label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-midnight-900 text-white text-xs border border-stone-800 focus:border-gold-400 focus:outline-none resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 rounded-xl bg-gold-400 hover:bg-gold-300 text-midnight-950 font-bold text-xs tracking-wide shadow-lg shadow-gold-400/20 transition flex items-center justify-center gap-2 active:scale-95"
                    >
                      <Send className="w-3.5 h-3.5 stroke-[2.4]" />
                      {isSubmitting ? 'Transmitting Request...' : 'Confirm Visit Request'}
                    </button>

                    <p className="text-[10px] text-stone-400 text-center pt-2">
                      * Demo action: Inquiries are captured locally in the active session without delivering spam to real agents.
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
