import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "react-native": "react-native-web",
      "@arcsyn-io/tokens/react-native": path.resolve(root, "packages/tokens/dist/react-native/index.js"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
    include: ["tests/unit/**/*.test.{ts,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      include: [
        "packages/react/src/components/button/button.tsx",
        "packages/react/src/components/field/field.tsx",
        "packages/react/src/components/input/input.tsx",
        "packages/react/src/utilities/cx.ts",
        "packages/react-native/src/components/button.tsx",
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        statements: 80,
        branches: 70,
      },
    },
  },
});
