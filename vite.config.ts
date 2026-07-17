import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/',
  define: {
    __BASE_PATH__: JSON.stringify('/'),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'pako/lib/zlib/zstream.js': 'pako',
    },
  },
  build: {
    target: 'es2020',
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        format: 'iife',
        entryFileNames: 'assets/app.js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name || ''
          if (info.endsWith('.css')) return 'assets/app.css'
          return 'assets/[name][extname]'
        },
        inlineDynamicImports: true,
      }
    },
    modulePreload: {
      polyfill: false
    },
  },
  optimizeDeps: {
    force: true,
    include: ['react', 'react-dom', 'pako'],
  },
})