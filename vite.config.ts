import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * The config runs in Node, but the project deliberately ships no @types/node —
 * it is a browser app, and those types would leak `process` into src/. This
 * reads the one variable the config needs without them.
 */
const nodeEnv =
  (globalThis as { process?: { env: Record<string, string | undefined> } }).process?.env ?? {};

export default defineConfig({
  // GitHub Pages serves a project site from /<repo>/, a custom domain from /.
  // The deploy workflow sets VITE_BASE; local dev and custom domains use the root.
  base: nodeEnv.VITE_BASE ?? '/',
  plugins: [react()],
  // Resolves the "@/…" alias from tsconfig.json.
  resolve: { tsconfigPaths: true },
  css: { devSourcemap: true },
  build: {
    target: 'es2022',
    cssCodeSplit: true,
  },
});
