import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    // Use Node environment for API route testing (no DOM needed)
    environment: 'node',
    globals: true,
    // Test file pattern
    include: ['tests/**/*.test.ts', 'tests/**/*.test.tsx'],
    // Coverage settings
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['app/api/**/*.ts', 'lib/**/*.ts'],
      exclude: ['lib/seed.ts', 'lib/firebase.ts'],
      thresholds: {
        lines: 70,
        functions: 70,
        branches: 60,
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '.'),
    },
  },
});
