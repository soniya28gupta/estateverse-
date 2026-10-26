# EstateVerse 3D — Next-Generation Architectural Discovery Platform

> **"Find a Place. Imagine Your Future."**  
> An immersive, 3D-powered real estate exploration platform engineered with React, Three.js, React Three Fiber, TypeScript, and Tailwind CSS.

---

## 🌟 Key Features

1. **Full-Screen Interactive 3D Hero Experience**
   - Procedural contemporary luxury villa with cantilevered architecture, floor-to-ceiling glass, pool, sun deck, and landscaping.
   - 360° mouse/touch orbit controls, smooth zooming, and camera damping.
   - Interactive 3D room hotspots (*Living Room*, *Master Suite*, *Swimming Pool*, *Garden Courtyard*, *Sky Terrace*).
   - High-performance fallback mode with React Error Boundary for low-power or WebGL-restricted environments.

2. **Intelligent Property Discovery & Search**
   - Search across top Indian cities: **Indore**, **Bhopal**, **Bengaluru**, **Delhi NCR**, and **Mumbai**.
   - Filters: Buy vs. Rent, Property Type (Villas, Penthouses, Houses), Indian Rupee budget brackets, BHK, and keyword queries.

3. **Real-World Problem Solver: Affordability & EMI Calculator**
   - Standard reducing-balance EMI formula calculation.
   - Visual breakdown of Loan Principal, Total Interest, Stamp Duty, and Upfront Cash using **Recharts**.
   - Dynamic *"Find Homes Within My Monthly Budget"* filter.

4. **Side-by-Side Property Comparison**
   - Compare up to 3 properties across rate/sq.ft, built-up area, BHK, estimated EMI, and 3D tour status.
   - Transparent value highlights calculated from objective metrics.

5. **Neighborhood Intelligence & Commute Simulator**
   - Interactive point-of-interest radar mapping distances to Metro/Transit, Schools, Hospitals, Malls, and Parks.
   - Live commute time estimator for Airport, Tech SEZ, and City Center.

6. **EstateMate AI Recommendation Advisor**
   - Conversational discovery assistant matching budget, bedroom count, and lifestyle requirements with instant preview cards.

7. **Dedicated Property Modal & Visit Concierge**
   - Deep-dive into room dimensions, visual gallery, architectural narratives, and schedule private tours with instant feedback.

---

## 🛠️ Technology Stack

- **Frontend:** React 18, Vite, TypeScript, Tailwind CSS, Framer Motion
- **3D Engine:** Three.js, `@react-three/fiber`, `@react-three/drei`
- **Charts:** Recharts
- **Icons:** Lucide React
- **Routing:** React Router v6
- **Backend & Database:** Node.js, Express REST API, Supabase (PostgreSQL with Row Level Security)

---

## 🚀 Quick Start Guide

### 1. Run the Development Server
```powershell
npm run dev
```
Open your browser at `http://localhost:5173` (or the port displayed in your terminal, e.g. `http://localhost:5174`).

### 2. Build for Production
```powershell
npm run build
```

---

## 🗄️ Database Setup (Optional Supabase Configuration)

EstateVerse 3D operates seamlessly out of the box in **demo mode** with realistic curated listings.

To connect your own live Supabase instance:
1. Create a project at [supabase.com](https://supabase.com).
2. Execute the SQL statements in `backend/schema.sql` in the Supabase SQL Editor.
3. Create a `.env` file in the project root:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
