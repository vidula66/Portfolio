import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Portfolio/',
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          // React core — tiny, loaded immediately
          'vendor-react': ['react', 'react-dom'],
          // Framer Motion — medium, needed for Hero animations
          'vendor-framer': ['framer-motion'],
          // Three.js core — large, only needed on desktop
          'vendor-three': ['three'],
          // R3F + Drei + Postprocessing — large, desktop only
          'vendor-r3f': [
            '@react-three/fiber',
            '@react-three/drei',
            '@react-three/postprocessing',
          ],
          // Everything else (lenis, emailjs, typewriter, etc.)
          'vendor-misc': [
            'lenis',
            'react-simple-typewriter',
            '@emailjs/browser',
            'react-intersection-observer',
          ],
        },
      },
    },
  },
})