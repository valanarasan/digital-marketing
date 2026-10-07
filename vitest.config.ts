import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

/**
 * Coverage is enforced at 100% across everything a test can meaningfully
 * exercise. Each exclusion below has a reason; adding a file to `exclude` is a
 * decision, not a shortcut.
 */
export default defineConfig({
  plugins: [react()],
  resolve: { tsconfigPaths: true },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test/setup.ts'],
    css: false,
    restoreMocks: true,
    clearMocks: true,
    include: ['src/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      reportsDirectory: 'coverage',
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        // Test scaffolding itself.
        'src/test/**',
        'src/**/*.test.{ts,tsx}',
        // Type-only modules: erased at compile time, nothing to execute.
        'src/types/**',
        'src/vite-env.d.ts',
        // Data, not behaviour. The components that render it verify it.
        'src/content/**',
        // Barrel files: re-exports with no logic of their own.
        'src/**/index.ts',
        // GSAP timelines. Under jsdom there is no layout, so ScrollTrigger has
        // nothing to measure and the assertions would only restate the code.
        // Scenes are verified in a headless browser instead; the hook that runs
        // them (useMotion) is unit-tested.
        'src/motion/scenes/**',
        'src/motion/gsap.ts',
        // Composition roots: page entries and the shared mount, wiring with no
        // branches worth asserting. The pages they mount are tested.
        'src/main.tsx',
        'src/mount.tsx',
        'src/entries/**',
      ],
      thresholds: {
        lines: 100,
        functions: 100,
        branches: 100,
        statements: 100,
      },
    },
  },
});
