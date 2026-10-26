export type PropertyType = 'villa' | 'apartment' | 'house' | 'plot' | 'commercial';
export type ListingStatus = 'For Sale' | 'For Rent';

export interface PropertyHotspot {
  id: string;
  name: string;
  position: [number, number, number];
  roomType: string;
  dimensions: string;
  features: string[];
  description: string;
}

export interface NearbyFacility {
  type: 'school' | 'hospital' | 'metro' | 'mall' | 'park';
  name: string;
  distance: string;
}

export interface PriceHistoryPoint {
  year: string;
  pricePerSqft: number;
}

export interface Property {
  id: string;
  title: string;
  tagline: string;
  description: string;
  city: string;
  locality: string;
  price: number;
  pricePerSqft: number;
  areaSqft: number;
  bedrooms: number;
  bathrooms: number;
  propertyType: PropertyType;
  listingStatus: ListingStatus;
  images: string[];
  isSample: boolean;
  has3DTour: boolean;
  furnishing: 'Furnished' | 'Semi-Furnished' | 'Unfurnished';
  parkingSpaces: number;
  ageYears: number;
  floor?: string;
  amenities: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  hotspots?: PropertyHotspot[];
  nearbyFacilities: NearbyFacility[];
  priceHistory: PriceHistoryPoint[];
  verificationLabel: string;
  featured?: boolean;
}

export interface MortgageInputs {
  propertyPrice: number;
  downPaymentPercent: number;
  annualInterestRate: number;
  tenureYears: number;
  additionalExpensesPercent: number;
}

export interface MortgageResults {
  downPaymentAmount: number;
  loanPrincipal: number;
  monthlyEMI: number;
  totalInterest: number;
  totalRepayment: number;
  additionalExpensesAmount: number;
  initialCashRequirement: number;
}

export interface InquiryFormData {
  propertyId: string;
  propertyTitle: string;
  name: string;
  email: string;
  phone: string;
  date?: string;
  timeSlot?: string;
  type: 'visit' | 'inquiry' | 'callback';
  message: string;
}

export interface AIMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  recommendedPropertyIds?: string[];
}
