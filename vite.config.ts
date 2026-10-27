import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Raise warning threshold while we implement proper splitting
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // ── Three.js / R3F ecosystem ── (~700 kB) → own chunk
          if (
            id.includes('three') ||
            id.includes('@react-three') ||
            id.includes('troika') ||
            id.includes('meshline')
          ) {
            return 'three-bundle';
          }

          // ── Charts ── recharts + deps
          if (id.includes('recharts') || id.includes('d3-')) {
            return 'charts';
          }

          // ── Framer Motion ──
          if (id.includes('framer-motion')) {
            return 'motion';
          }

          // ── React core ──
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'react-core';
          }

          // ── React Router ──
          if (id.includes('react-router')) {
            return 'router';
          }

          // ── Supabase ──
          if (id.includes('@supabase')) {
            return 'supabase';
          }

          // ── Other vendor libs ──
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
})
