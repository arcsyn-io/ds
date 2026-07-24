import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const repositoryRoot = path.dirname(fileURLToPath(import.meta.url));
const toolingRequire = createRequire(path.join(repositoryRoot, "packages", "tooling", "package.json"));
const eslint = toolingRequire("@eslint/js");
const tseslint = toolingRequire("@typescript-eslint/eslint-plugin");
const tsParser = toolingRequire("@typescript-eslint/parser");
const reactHooks = toolingRequire("eslint-plugin-react-hooks");
const globals = toolingRequire("globals");

export default [
  {
    ignores: ["**/dist/**", "**/node_modules/**", "**/coverage/**", "**/playwright-report/**", "**/test-results/**", "**/.vite/**", "**/.codex-tmp/**"],
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    ...eslint.configs.recommended,
    languageOptions: {
      ...eslint.configs.recommended.languageOptions,
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        ...globals.browser,
        ...globals.es2022,
        ...globals.node,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      "react-hooks": reactHooks,
    },
    rules: {
      ...eslint.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...reactHooks.configs.flat["recommended-latest"].rules,
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          fixStyle: "inline-type-imports",
        },
      ],
      "no-undef": "off",
      "react-hooks/refs": "off",
      "react-hooks/set-state-in-effect": "off",
    },
  },
  {
    files: ["packages/tokens/scripts/*.mjs"],
    rules: {
      "no-useless-escape": "off",
    },
  },
  {
    files: ["**/*.d.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
];
