import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "node",
    // Legacy-redirect tests exercise the full site; the home-only lock has its own test.
    env: { NEXT_PUBLIC_HOME_ONLY: "false" },
  },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
});
