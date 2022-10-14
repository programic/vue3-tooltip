import { defineConfig } from 'vitest/config';
import path from 'path';
import Vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    Vue(),
  ],
  test: {
    globals: true,
    environment: 'happy-dom',
    transformMode: {
      web: [/.[jt]sx$/],
    },
    coverage: {
      include: ["src"],
      exclude: [
        "src/tests",
        "src/types",
        "src/datasources/cosmos/defaults.ts",
        "**/*/types.ts",
        "**/*/operations.ts",
        "**/*/*.graphql.ts",
        "**/*/*.test.ts",
        "**/*/__test__",
      ],
      reportsDirectory: process.env.CI ? "coverage" : undefined,
      reporter: process.env.CI ? "cobertura" : undefined,
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
