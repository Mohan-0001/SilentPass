import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { crx } from '@crxjs/vite-plugin';
import manifest from './manifest.json';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    crx({
      manifest,
      hmr: false
    }),
  ],
  define: {
    'import.meta.hot': 'false', // Disable HMR entirely
  },
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        content: 'src/content.js',
        background: 'background.js',
        // Add other entry points like popup/options if needed
      },

      
      output: {
        // ✅ Clean, readable names (no hash)
        entryFileNames: '[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
  },
  server: {
    hmr: false, // ✅ disable HMR (especially if you’re building extension-only)
  }
});
