import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: [
      "src/sections/components/**/*.{ts,tsx}",
      "src/components/editor/**/*.{ts,tsx}",
    ],
    rules: {
      // Builder content accepts arbitrary merchant-hosted URLs. Raw images are
      // intentional here because Next Image cannot know their hosts up front.
      "@next/next/no-img-element": "off",
    },
  },
  {
    files: ["src/app/edit/*/preview/layout.tsx"],
    rules: {
      // The isolated preview loads the font selected by the current template.
      "@next/next/no-page-custom-font": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
