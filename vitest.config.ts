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
        "tests",
        "src/types",
        "**/*/types.ts",
        "**/*/*.spec.ts",
        "**/*/__test__",
      ],
      reportsDirectory: 'coverage',
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
