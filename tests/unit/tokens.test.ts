import { describe, expect, it } from "vitest";
import { tokens as nativeTokens } from "../../packages/tokens/dist/react-native/index.js";
import { tokens } from "../../packages/tokens/dist/js/index.js";

describe("artefatos gerados de tokens", () => {
  it("preserva todos os temas no contrato web e nativo", () => {
    expect(Object.keys(tokens.themes)).toEqual(["light", "dark", "deep-dark", "corporate-dark", "catppuccin-mocha", "catppuccin-latte"]);
    expect(Object.keys(nativeTokens.themes)).toEqual(Object.keys(tokens.themes));
  });

  it("resolve referências e converte rem para pixels no React Native", () => {
    expect(nativeTokens.spacing[4]).toBe(16);
    expect(nativeTokens.fontSize.md).toBe(16);
    expect(nativeTokens.themes.dark.color.primary).toMatch(/^#[\da-f]{6}$/i);
    expect(nativeTokens.themes.dark.color.primary).not.toContain("{");
  });
});
