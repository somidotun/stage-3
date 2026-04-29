import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-oxc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    globals: true,
    include: ["tests/**/*.{test,spec}.{ts,tsx}"],
    exclude: ["tests/e2e/**", "node_modules/**"],
    coverage: {
      provider: "v8",
      include: ["src/lib/**"],
      exclude: ["node_modules/**", "src/lib/storage.ts"],
      thresholds: {
        lines: 80,
      },
      reporter: ["text", "html", "lcov"],
    },
  },
  resolve: {
    alias: {
      "@/src": path.resolve(__dirname, "./src"),
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
