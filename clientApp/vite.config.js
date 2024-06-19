import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    base: './'
  },
  server: {
    proxy: {
      '/erase': 'http://localhost:3000',
    }
  }
});
