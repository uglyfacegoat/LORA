import js from "@eslint/js";
import tseslint from "typescript-eslint";

const browserGlobals = {
  document: "readonly",
  window: "readonly",
  navigator: "readonly",
  HTMLElement: "readonly",
  HTMLAnchorElement: "readonly",
  HTMLFormElement: "readonly",
  HTMLInputElement: "readonly",
  HTMLLinkElement: "readonly",
  HTMLMetaElement: "readonly",
  HTMLTextAreaElement: "readonly",
  Element: "readonly",
  MouseEvent: "readonly",
  PopStateEvent: "readonly",
  requestAnimationFrame: "readonly",
  setTimeout: "readonly",
  clearTimeout: "readonly",
  fetch: "readonly",
};

const nodeGlobals = {
  Buffer: "readonly",
  console: "readonly",
  process: "readonly",
  URL: "readonly",
  URLSearchParams: "readonly",
  setTimeout: "readonly",
  clearTimeout: "readonly",
};

export default [
  {
    ignores: ["dist/**", "node_modules/**", "coverage/**", "public/sitemap.xml", "package-lock.json"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx,js,mjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...browserGlobals,
        ...nodeGlobals,
      },
    },
    rules: {
      "no-empty": ["error", { allowEmptyCatch: true }],
      "no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },
];
