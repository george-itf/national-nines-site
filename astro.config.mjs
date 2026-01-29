// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE || 'https://nationalninesgolf.co.uk',
  // base only needed for GitHub Pages subdirectory hosting
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});