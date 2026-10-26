-- ESTATEVERSE 3D — DATABASE SCHEMA (PostgreSQL / Supabase)

-- 1. Create tables
CREATE TABLE IF NOT EXISTS properties (
  id TEXT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  tagline TEXT,
  description TEXT,
  city VARCHAR(100) NOT NULL,
  locality VARCHAR(150) NOT NULL,
  price BIGINT NOT NULL,
  price_per_sqft INT NOT NULL,
  area_sqft INT NOT NULL,
  bedrooms INT NOT NULL,
  bathrooms INT NOT NULL,
  property_type VARCHAR(50) NOT NULL,
  listing_status VARCHAR(50) DEFAULT 'For Sale',
  featured BOOLEAN DEFAULT false,
  is_sample BOOLEAN DEFAULT true,
  has_3d_tour BOOLEAN DEFAULT false,
  furnishing VARCHAR(50) DEFAULT 'Semi-Furnished',
  parking_spaces INT DEFAULT 1,
  age_years INT DEFAULT 1,
  images TEXT[] NOT NULL,
  amenities TEXT[] DEFAULT '{}',
  coordinates JSONB,
  hotspots JSONB,
  nearby_facilities JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  display_name TEXT,
  email TEXT UNIQUE,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS favorites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  property_id TEXT REFERENCES properties(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, property_id)
);

CREATE TABLE IF NOT EXISTS inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id TEXT REFERENCES properties(id) ON DELETE SET NULL,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  date DATE,
  time_slot VARCHAR(50),
  message TEXT,
  status VARCHAR(50) DEFAULT 'Pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS saved_searches (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  search_filters JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_searches ENABLE ROW LEVEL SECURITY;

-- 3. RLS Policies
-- Anyone can view properties
CREATE POLICY "Public properties are viewable by everyone" 
  ON properties FOR SELECT USING (true);

-- Anyone can submit an inquiry
CREATE POLICY "Public can submit visit inquiries" 
  ON inquiries FOR INSERT WITH CHECK (true);

-- Users can read their own favorites
CREATE POLICY "Users can manage their own favorites" 
  ON favorites FOR ALL USING (auth.uid() = user_id);

-- Users can manage their own saved searches
CREATE POLICY "Users can manage their saved searches" 
  ON saved_searches FOR ALL USING (auth.uid() = user_id);

-- 4. Seed Initial Flagship Listing
INSERT INTO properties (
  id, title, tagline, description, city, locality, price, price_per_sqft, area_sqft, bedrooms, bathrooms, property_type, listing_status, featured, is_sample, has_3d_tour, images, amenities
) VALUES (
  'indore-villa-01',
  'The Obsidian Pavilion Villa',
  'Sculptural architectural masterpiece with floating glass pavilions and private reflection pool',
  'An architectural tour-de-force situated along Indore’s prestigious Super Corridor. Featuring cantilevered concrete overhangs, floor-to-ceiling acoustic glass, an illuminated swimming pool, double-height living spaces, and an internal Japanese zen courtyard.',
  'Indore',
  'Super Corridor',
  18500000,
  5781,
  3200,
  4,
  4,
  'villa',
  'For Sale',
  true,
  true,
  true,
  ARRAY[
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80'
  ],
  ARRAY['Private Swimming Pool', 'Smart Home Automation', 'Landscaped Courtyard', 'Solar Rooftop Grid', 'High Ceilings (12 ft)']
) ON CONFLICT (id) DO NOTHING;
