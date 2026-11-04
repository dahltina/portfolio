import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  // Keep the existing .html URLs and relative asset paths.
  build: { format: 'file' },
  // Preserve whitespace between inline elements in the original design.
  compressHTML: false,
});
