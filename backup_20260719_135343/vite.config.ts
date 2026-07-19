import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") }
  },
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // 1. Vendor par lib
          if (id.includes('node_modules')) {
            if (id.includes('recharts')) return 'vendor-charts'
            if (id.includes('lodash')) return 'vendor-lodash'
            if (id.includes('framer-motion')) return 'vendor-motion'
            if (id.includes('@radix-ui')) return 'vendor-radix'
            if (id.includes('react-router')) return 'vendor-router'
            if (id.includes('@tanstack/react-query')) return 'vendor-query'
            if (id.includes('react-icons')) return 'vendor-icons'
            if (id.includes('react')) return 'vendor-react'
            return 'vendor-misc'
          }
          // 2. Split mocks par fichier
          if (id.includes('src/mocks/kos-blog')) return 'mocks-kos-blog'
          if (id.includes('src/mocks/kos-graph')) return 'mocks-kos-graph'
          if (id.includes('src/mocks/kos')) return 'mocks-kos-other'
          if (id.includes('src/mocks/observatoires')) return 'mocks-observatoires'
          // 3. Split pages lourdes
          if (id.includes('src/pages/observatoires-sectoriels')) return 'page-observatoires'
          if (id.includes('src/pages/kos-transformation-office')) return 'page-kos-office'
          if (id.includes('src/pages/blog')) return 'page-blog'
        }
      }
    }
  }
});
