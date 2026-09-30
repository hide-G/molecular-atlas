import { defineConfig } from 'vite';

export default defineConfig({
  // Relative asset URLs work for both user/organization and project GitHub Pages.
  base: './',
  build: {
    target: 'es2022',
    chunkSizeWarningLimit: 900,
  },
});
