// @ts-check
// Production config for nationalninesgolf.co.uk (Cloudflare Pages)
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://nationalninesgolf.co.uk',
  // No base path for production domain
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});
