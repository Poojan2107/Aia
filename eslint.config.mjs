import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Self-hosted third-party bundles (model-viewer, meshopt decoder) — minified, not ours.
    "public/vendor/**",
    // Vendored Framer export (MeridianGlobe) — compiled code, not hand-written.
    "src/components/ui/AtomicGlobe.jsx",
    "src/components/ui/AtomicGlobe.d.ts",
    "aia-ballmill-showcase/**",
  ]),
  {
    rules: {
      "react-hooks/set-state-in-effect": "off",
    },
  },
]);

export default eslintConfig;
