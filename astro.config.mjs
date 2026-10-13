// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Update to the real production domain after the first Vercel deploy (used for canonical/OG URLs).
  site: 'https://alex-architecture-portfolio.vercel.app',
  output: 'static',
  prefetch: { prefetchAll: true },
});
