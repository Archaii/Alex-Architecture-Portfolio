// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Production domain, used for canonical and Open Graph URLs.
  site: 'https://alexarchitectureportfolio.vercel.app',
  output: 'static',
  prefetch: { prefetchAll: true },
});
