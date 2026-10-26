import { Property } from '../types/property';

export const SAMPLE_PROPERTIES: Property[] = [
  {
    id: 'indore-villa-01',
    title: 'The Obsidian Pavilion Villa',
    tagline: 'Sculptural architectural masterpiece with floating glass pavilions and private reflection pool',
    description: 'An architectural tour-de-force situated along Indore’s prestigious Super Corridor. Featuring cantilevered concrete overhangs, floor-to-ceiling acoustic glass, an illuminated swimming pool, double-height living spaces, and an internal Japanese zen courtyard. Designed for discerning buyers who appreciate the dialogue between natural stone, warm teak, and bold minimalism.',
    city: 'Indore',
    locality: 'Super Corridor',
    price: 18500000, // ₹1.85 Cr
    pricePerSqft: 5781,
    areaSqft: 3200,
    bedrooms: 4,
    bathrooms: 4,
    propertyType: 'villa',
    listingStatus: 'For Sale',
    featured: true,
    isSample: true,
    has3DTour: true,
    furnishing: 'Furnished',
    parkingSpaces: 3,
    ageYears: 1,
    floor: 'G + 1 Independent',
    verificationLabel: 'Curated Architectural Model — Interactive 3D Available',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80'
    ],
    amenities: [
      'Private Swimming Pool',
      'Smart Home Automation',
      'Landscaped Courtyard',
      'Solar Rooftop Grid',
      'High Ceilings (12 ft)',
      'Acoustic Double Glazing',
      'Staff Quarters',
      'Covered EV Charging'
    ],
    coordinates: {
      lat: 22.7562,
      lng: 75.8281
    },
    hotspots: [
      {
        id: 'hs-living',
        name: 'Grand Living Salon',
        position: [0.5, 1.2, 1.2],
        roomType: 'Ground Floor Lounge',
        dimensions: '26 ft × 20 ft (Double Height)',
        features: ['Italian Statuario Marble', 'Frameless Glass Glazing', 'Linear Architectural Fireplace'],
        description: 'Commanding double-height entertaining space opening seamlessly onto the sunken pool deck.'
      },
      {
        id: 'hs-master',
        name: 'Master Sanctuary Suite',
        position: [-1.8, 3.2, 0.4],
        roomType: 'First Floor Master Suite',
        dimensions: '22 ft × 18 ft + Walk-in Dressing',
        features: ['Smoked Oak Parquet', 'Private Cantilevered Balcony', 'Spa Bath with Skylight'],
        description: 'Private upper-level retreat oriented towards panoramic sunrise vistas.'
      },
      {
        id: 'hs-pool',
        name: 'Infinity Reflection Pool',
        position: [2.5, 0.3, 2.2],
        roomType: 'Outdoor Leisure',
        dimensions: '38 ft × 14 ft (Heated)',
        features: ['Black Basalt Tile Finish', 'Integrated Underwater LED Ribbon', 'Teak Wood Sundeck'],
        description: 'Architectural pool mirroring the clean geometric lines of the modern facade.'
      },
      {
        id: 'hs-terrace',
        name: 'Sky Lounge Terrace',
        position: [1.2, 3.4, -0.8],
        roomType: 'Rooftop Entertaining',
        dimensions: '32 ft × 16 ft',
        features: ['Pergola Shading', 'Integrated Barbecue Counter', 'Sunset Cityscape Views'],
        description: 'Generous entertaining terrace with weather-treated timber decking and perimeter planters.'
      },
      {
        id: 'hs-garden',
        name: 'Zen Landscape Courtyard',
        position: [-2.2, 0.2, 1.8],
        roomType: 'Landscape',
        dimensions: '400 sq. ft.',
        features: ['Specimen Frangipani Tree', 'Drip-irrigated Native Flora', 'Granite Stepping Stones'],
        description: 'A tranquil green lung buffering the residence from external urban movement.'
      }
    ],
    nearbyFacilities: [
      { type: 'metro', name: 'Super Corridor Metro Station', distance: '1.2 km' },
      { type: 'school', name: 'The Emerald Heights International School', distance: '4.5 km' },
      { type: 'hospital', name: 'Aurobindo Medical Hospital', distance: '3.8 km' },
      { type: 'mall', name: 'Phoenix Citadel Mall', distance: '9.2 km' },
      { type: 'park', name: 'TCS IT Green Park', distance: '2.1 km' }
    ],
    priceHistory: [
      { year: '2022', pricePerSqft: 4200 },
      { year: '2023', pricePerSqft: 4750 },
      { year: '2024', pricePerSqft: 5200 },
      { year: '2025', pricePerSqft: 5500 },
      { year: '2026', pricePerSqft: 5781 }
    ]
  },
  {
    id: 'indore-apt-02',
    title: 'The Celeste Sky Penthouse',
    tagline: 'High-altitude duplex residence with 270-degree wraparound skyline panorama',
    description: 'Perched on the 18th and 19th floors in prime Vijay Nagar, this bespoke penthouse offers an unrepeatable urban vantage. Features include a double-volume foyer, private elevator access directly into the vestibule, custom champagne-gold metallic accents, and a climate-controlled wine cellar.',
    city: 'Indore',
    locality: 'Vijay Nagar',
    price: 9500000, // ₹95 Lakh
    pricePerSqft: 4871,
    areaSqft: 1950,
    bedrooms: 3,
    bathrooms: 3,
    propertyType: 'apartment',
    listingStatus: 'For Sale',
    featured: true,
    isSample: true,
    has3DTour: true,
    furnishing: 'Semi-Furnished',
    parkingSpaces: 2,
    ageYears: 2,
    floor: '18th of 20 Floors',
    verificationLabel: 'Verified Layout Specimen — Sample Listing',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80'
    ],
    amenities: [
      'Private High-Speed Elevator',
      'Wraparound Sky Balcony',
      'Clubhouse & Gym Access',
      '24/7 Multi-Tier Security',
      'Reserved Basement Parking',
      'Full Power Backup'
    ],
    coordinates: {
      lat: 22.7533,
      lng: 75.8937
    },
    nearbyFacilities: [
      { type: 'metro', name: 'Vijay Nagar Square Station', distance: '0.6 km' },
      { type: 'mall', name: 'C21 & Malhar Mega Malls', distance: '0.9 km' },
      { type: 'hospital', name: 'Medanta Super Specialty Hospital', distance: '2.4 km' },
      { type: 'school', name: 'Delhi Public School (Nipania)', distance: '3.6 km' }
    ],
    priceHistory: [
      { year: '2022', pricePerSqft: 3900 },
      { year: '2023', pricePerSqft: 4250 },
      { year: '2024', pricePerSqft: 4500 },
      { year: '2025', pricePerSqft: 4700 },
      { year: '2026', pricePerSqft: 4871 }
    ]
  },
  {
    id: 'indore-villa-03',
    title: 'Amaya Sanctuary Estate',
    tagline: 'Expansive private country estate surrounded by organic fruit groves',
    description: 'Located in the verdant outskirts along Indore Bypass, Amaya Estate pairs modern rammed-earth architectural aesthetics with world-class resort amenities. Ideal for multi-generational families wanting complete privacy and clean air without losing connectivity to the central business hub.',
    city: 'Indore',
    locality: 'Bypass Road',
    price: 24000000, // ₹2.40 Cr
    pricePerSqft: 5853,
    areaSqft: 4100,
    bedrooms: 5,
    bathrooms: 6,
    propertyType: 'villa',
    listingStatus: 'For Sale',
    featured: false,
    isSample: true,
    has3DTour: true,
    furnishing: 'Furnished',
    parkingSpaces: 4,
    ageYears: 1,
    floor: 'G + 2 Independent Villa',
    verificationLabel: 'Architectural Specimen — Sample Listing',
    images: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80'
    ],
    amenities: [
      'Private Heated Lap Pool',
      'Home Theatre Salon (7.2.4 Dolby)',
      'Organic Orchard & Herb Garden',
      'Solar Battery Storage (15kW)',
      'Chef Kitchen with Walk-in Pantry',
      'Caretaker Annex'
    ],
    coordinates: {
      lat: 22.7196,
      lng: 75.9255
    },
    nearbyFacilities: [
      { type: 'school', name: 'Indus International School Link', distance: '5.1 km' },
      { type: 'hospital', name: 'Bombay Hospital Indore', distance: '4.8 km' },
      { type: 'mall', name: 'Phoenix Citadel', distance: '3.2 km' },
      { type: 'park', name: 'Ralamandal Wildlife Sanctuary', distance: '6.5 km' }
    ],
    priceHistory: [
      { year: '2022', pricePerSqft: 4400 },
      { year: '2023', pricePerSqft: 4900 },
      { year: '2024', pricePerSqft: 5350 },
      { year: '2025', pricePerSqft: 5600 },
      { year: '2026', pricePerSqft: 5853 }
    ]
  },
  {
    id: 'bhopal-villa-04',
    title: 'Lakecrest Heritage Manor',
    tagline: 'Modernist lake-view manor blending sandstone colonnades with minimalist glass',
    description: 'Set in Bhopal’s most exclusive residential enclave, Arera Colony, Lakecrest Manor captures cooling breezes from the Upper Lake. The layout celebrates shaded verandas, sandstone jali privacy screens that cast poetic afternoon shadows, and an internal courtyard with cascading water features.',
    city: 'Bhopal',
    locality: 'Arera Colony',
    price: 13500000, // ₹1.35 Cr
    pricePerSqft: 4821,
    areaSqft: 2800,
    bedrooms: 4,
    bathrooms: 4,
    propertyType: 'house',
    listingStatus: 'For Sale',
    featured: true,
    isSample: true,
    has3DTour: true,
    furnishing: 'Semi-Furnished',
    parkingSpaces: 2,
    ageYears: 3,
    floor: 'G + 1 Independent House',
    verificationLabel: 'Sample Listing — Educational Showcase',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80'
    ],
    amenities: [
      'Lake View Rooftop Deck',
      'Courtyard Water Fountain',
      'Traditional Sandstone Jali Elements',
      'Dual Car Garage',
      'Rainwater Harvesting Wells',
      'Security Surveillance System'
    ],
    coordinates: {
      lat: 23.2156,
      lng: 77.4332
    },
    nearbyFacilities: [
      { type: 'park', name: 'Upper Lake Promenade & Boat Club', distance: '1.8 km' },
      { type: 'hospital', name: 'Bansal Hospital', distance: '1.2 km' },
      { type: 'school', name: 'Campion School Bhopal', distance: '0.8 km' },
      { type: 'mall', name: 'DB City Mall', distance: '3.5 km' }
    ],
    priceHistory: [
      { year: '2022', pricePerSqft: 3800 },
      { year: '2023', pricePerSqft: 4100 },
      { year: '2024', pricePerSqft: 4400 },
      { year: '2025', pricePerSqft: 4650 },
      { year: '2026', pricePerSqft: 4821 }
    ]
  },
  {
    id: 'bengaluru-villa-05',
    title: 'The Biophilic Zen Villa',
    tagline: 'Carbon-neutral smart villa embedded in private bamboo grove and micro-climate gardens',
    description: 'Conceived for tech visionaries in Whitefield Bengaluru, this villa produces more energy than it consumes. Integrated smart climate management, automated louvered facades that adjust according to solar angles, greywater bio-filtration, and a high-spec home office studio with acoustic isolation.',
    city: 'Bengaluru',
    locality: 'Whitefield',
    price: 38000000, // ₹3.80 Cr
    pricePerSqft: 10555,
    areaSqft: 3600,
    bedrooms: 4,
    bathrooms: 5,
    propertyType: 'villa',
    listingStatus: 'For Sale',
    featured: true,
    isSample: true,
    has3DTour: true,
    furnishing: 'Furnished',
    parkingSpaces: 3,
    ageYears: 1,
    floor: 'G + 2 Eco Villa',
    verificationLabel: 'Smart Architecture Demo — Sample Listing',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80'
    ],
    amenities: [
      'Net-Zero Solar + Tesla Powerwall',
      'Automated Bio-Climatic Louvers',
      'Soundproof Executive Pod',
      'Private Zen Rock Garden',
      'Underground Rain Cistern',
      'EV Supercharger Station'
    ],
    coordinates: {
      lat: 12.9698,
      lng: 77.7500
    },
    nearbyFacilities: [
      { type: 'metro', name: 'Kadugodi Whitefield Metro', distance: '1.5 km' },
      { type: 'school', name: 'The International School Bangalore (TISB)', distance: '6.2 km' },
      { type: 'hospital', name: 'Manipal Hospital Whitefield', distance: '2.1 km' },
      { type: 'mall', name: 'Nexus Shantiniketan Mall', distance: '2.8 km' }
    ],
    priceHistory: [
      { year: '2022', pricePerSqft: 7900 },
      { year: '2023', pricePerSqft: 8800 },
      { year: '2024', pricePerSqft: 9400 },
      { year: '2025', pricePerSqft: 10000 },
      { year: '2026', pricePerSqft: 10555 }
    ]
  },
  {
    id: 'delhi-mansion-06',
    title: 'Aura Grand Golf Residence',
    tagline: 'Breathtaking 4,800 sq.ft golf-course facing residence with temperature-regulated cigar room',
    description: 'An elite address along DLF Golf Course Road, Gurgaon. Soaring 14-foot ceiling heights, imported Greek Thassos white marble throughout, customized Boffi Italian kitchen, and triple-glazed acoustic curtain walling overlooking championship fairways.',
    city: 'Delhi NCR',
    locality: 'Golf Course Road, Gurgaon',
    price: 65000000, // ₹6.50 Cr
    pricePerSqft: 13541,
    areaSqft: 4800,
    bedrooms: 4,
    bathrooms: 5,
    propertyType: 'apartment',
    listingStatus: 'For Sale',
    featured: true,
    isSample: true,
    has3DTour: true,
    furnishing: 'Furnished',
    parkingSpaces: 4,
    ageYears: 2,
    floor: '22nd of 28 Floors',
    verificationLabel: 'Luxury Architectural Specimen — Sample Listing',
    images: [
      'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=80'
    ],
    amenities: [
      'Golf Course Frontage',
      'Private Heated Jacuzzi on Deck',
      'Concierge & Valet Butler Service',
      'Olympics-standard Lap Pool in Tower',
      'Wine Cellar & Tasting Lounge',
      'Bullet-resistant Primary Suite Door'
    ],
    coordinates: {
      lat: 28.4595,
      lng: 77.0266
    },
    nearbyFacilities: [
      { type: 'metro', name: 'Sector 53-54 Rapid Metro', distance: '0.4 km' },
      { type: 'hospital', name: 'Fortis Memorial Research Institute', distance: '3.1 km' },
      { type: 'school', name: 'The Shri Ram School Aravali', distance: '2.5 km' },
      { type: 'mall', name: 'One Horizon Center High Street', distance: '0.8 km' }
    ],
    priceHistory: [
      { year: '2022', pricePerSqft: 10500 },
      { year: '2023', pricePerSqft: 11600 },
      { year: '2024', pricePerSqft: 12400 },
      { year: '2025', pricePerSqft: 13000 },
      { year: '2026', pricePerSqft: 13541 }
    ]
  },
  {
    id: 'mumbai-residence-07',
    title: 'The Bay Horizon Residence',
    tagline: 'Sea-facing contemporary haven capturing unobstructed Arabian Sea sunsets',
    description: 'Located in prime Worli Sea Face, this ultra-exclusive apartment captures panoramic Arabian Sea views. Designed with minimal mullions, sound-dampened flooring, and private lobby access, offering an oasis of calm right in the center of the financial capital.',
    city: 'Mumbai',
    locality: 'Worli',
    price: 52000000, // ₹5.20 Cr
    pricePerSqft: 24761,
    areaSqft: 2100,
    bedrooms: 3,
    bathrooms: 3,
    propertyType: 'apartment',
    listingStatus: 'For Sale',
    featured: false,
    isSample: true,
    has3DTour: true,
    furnishing: 'Furnished',
    parkingSpaces: 2,
    ageYears: 3,
    floor: '28th of 45 Floors',
    verificationLabel: 'Sample Listing — Demo Data',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80'
    ],
    amenities: [
      'Panoramic Ocean Views',
      'Infinity Sky Pool on 45th Floor',
      'Private Helipad Access',
      'Bespoke Automation',
      '24/7 White Glove Concierge'
    ],
    coordinates: {
      lat: 19.0178,
      lng: 72.8173
    },
    nearbyFacilities: [
      { type: 'metro', name: 'Worli Sea Link Entrance', distance: '1.1 km' },
      { type: 'hospital', name: 'Hinduja Hospital', distance: '4.2 km' },
      { type: 'mall', name: 'Palladium Mall Lower Parel', distance: '2.5 km' },
      { type: 'park', name: 'Worli Promenade', distance: '0.2 km' }
    ],
    priceHistory: [
      { year: '2022', pricePerSqft: 21000 },
      { year: '2023', pricePerSqft: 22400 },
      { year: '2024', pricePerSqft: 23500 },
      { year: '2025', pricePerSqft: 24200 },
      { year: '2026', pricePerSqft: 24761 }
    ]
  },
  {
    id: 'bhopal-apt-08',
    title: 'Green Valley Serenade',
    tagline: 'Quiet, community-focused garden residence near Kolar forest greenbelt',
    description: 'An affordable, premium 3 BHK apartment in peaceful Kolar Road, surrounded by rolling greenery. Features wide ventilation corridors, dedicated children’s nature play park, jogging tracks, and clubhouse amenities at an accessible price point.',
    city: 'Bhopal',
    locality: 'Kolar Road',
    price: 5800000, // ₹58 Lakh
    pricePerSqft: 3866,
    areaSqft: 1500,
    bedrooms: 3,
    bathrooms: 2,
    propertyType: 'apartment',
    listingStatus: 'For Sale',
    featured: false,
    isSample: true,
    has3DTour: false,
    furnishing: 'Unfurnished',
    parkingSpaces: 1,
    ageYears: 2,
    floor: '4th of 8 Floors',
    verificationLabel: 'Sample Listing — Educational Demo',
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80'
    ],
    amenities: [
      'Children Play Area',
      'Landscaped Walking Trail',
      'Community Clubhouse',
      'Gated Security',
      'Rainwater Harvesting'
    ],
    coordinates: {
      lat: 23.1678,
      lng: 77.4190
    },
    nearbyFacilities: [
      { type: 'hospital', name: 'JK Hospital Kolar', distance: '1.4 km' },
      { type: 'school', name: 'St. Joseph’s Co-Ed School', distance: '1.9 km' },
      { type: 'park', name: 'Kolar Forest Green Belt', distance: '0.8 km' },
      { type: 'mall', name: 'Aashima Anupama Mall', distance: '4.8 km' }
    ],
    priceHistory: [
      { year: '2022', pricePerSqft: 3100 },
      { year: '2023', pricePerSqft: 3350 },
      { year: '2024', pricePerSqft: 3550 },
      { year: '2025', pricePerSqft: 3700 },
      { year: '2026', pricePerSqft: 3866 }
    ]
  }
];

export const INDIAN_CITIES = ['All Cities', 'Indore', 'Bhopal', 'Bengaluru', 'Delhi NCR', 'Mumbai'];

export const PROPERTY_TYPES = [
  { value: 'all', label: 'All Property Types' },
  { value: 'villa', label: 'Luxury Villas' },
  { value: 'apartment', label: 'Apartments & Penthouses' },
  { value: 'house', label: 'Independent Houses' },
  { value: 'plot', label: 'Residential Plots' },
  { value: 'commercial', label: 'Commercial Spaces' },
];

export const AMENITIES_LIST = [
  'Private Swimming Pool',
  'Smart Home Automation',
  'Solar Rooftop Grid',
  'Landscaped Courtyard',
  'High Ceilings (12 ft)',
  'Clubhouse & Gym Access',
  'Wraparound Sky Balcony',
  'Covered EV Charging',
  'Staff Quarters',
  'Home Theatre Salon (7.2.4 Dolby)',
  'Golf Course Frontage',
  'Lake View Rooftop Deck'
];
