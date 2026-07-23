import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = join(root, "src");
const output = join(root, "dist");

async function readJson(path) {
  return JSON.parse(await readFile(path, "utf8"));
}

function flatten(value, path = [], result = {}) {
  for (const [key, current] of Object.entries(value)) {
    if (key.startsWith("$")) continue;
    const nextPath = [...path, key];
    if (current && typeof current === "object" && "$value" in current) {
      result[nextPath.join(".")] = current.$value;
    } else if (current && typeof current === "object") {
      flatten(current, nextPath, result);
    }
  }
  return result;
}

function toKebabCase(path) {
  return path
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replaceAll(".", "-")
    .toLowerCase();
}

function reference(value, tokens) {
  return typeof value === "string" && /^\{.+\}$/.test(value)
    ? `var(--arcsyn-${toKebabCase(value.slice(1, -1))})`
    : value;
}

function declarations(tokens) {
  return Object.entries(tokens)
    .map(([name, value]) => `  --arcsyn-${toKebabCase(name)}: ${reference(value, tokens)};`)
    .join("\n");
}

function tailwindDeclarations(tokens) {
  return Object.entries(tokens)
    .filter(([name]) => name.startsWith("color.") || name.startsWith("spacing.") || name.startsWith("radius.") || name.startsWith("font."))
    .map(([name, value]) => {
      const namespace = name.startsWith("color.") ? "color" : name.startsWith("spacing.") ? "spacing" : name.startsWith("radius.") ? "radius" : "font";
      const rawName = name.replace(/^(color|spacing|radius|font)\./, "");
      const suffix = rawName.startsWith("arcsyn.")
        ? toKebabCase(rawName.slice("arcsyn.".length))
        : toKebabCase(rawName);
      return `  --${namespace}-arcsyn-${suffix}: ${reference(value, tokens)};`;
    })
    .join("\n");
}

function resolveReference(value, tokens, seen = new Set()) {
  if (typeof value !== "string" || !/^\{.+\}$/.test(value)) return value;
  const tokenName = value.slice(1, -1);
  if (seen.has(tokenName)) throw new Error(`Circular token reference: ${tokenName}`);
  const referencedValue = tokens[tokenName];
  if (referencedValue === undefined) throw new Error(`Unknown token reference: ${tokenName}`);
  return resolveReference(referencedValue, tokens, new Set([...seen, tokenName]));
}

function toReactNativeValue(value) {
  if (typeof value !== "string") return value;
  if (value.endsWith("rem")) return Number.parseFloat(value) * 16;
  if (value.endsWith("px")) return Number.parseFloat(value);
  if (value.endsWith("ms")) return Number.parseFloat(value);
  return value;
}

function nest(entries) {
  const result = {};
  for (const [path, value] of entries) {
    const keys = path.split(".");
    let current = result;
    for (const key of keys.slice(0, -1)) {
      current[key] ??= {};
      current = current[key];
    }
    current[keys.at(-1)] = value;
  }
  return result;
}

function tokensWithPrefix(tokens, prefix, transform = toReactNativeValue) {
  return nest(
    Object.entries(tokens)
      .filter(([name]) => name.startsWith(prefix))
      .map(([name, value]) => [name.slice(prefix.length), transform(value)]),
  );
}

const [colors, foundation, light, dark, deepDark] = await Promise.all([
  readJson(join(source, "primitive", "colors.json")),
  readJson(join(source, "primitive", "foundation.json")),
  readJson(join(source, "semantic", "light.json")),
  readJson(join(source, "semantic", "dark.json")),
  readJson(join(source, "semantic", "deep-dark.json")),
]);

const primitives = { ...flatten(colors), ...flatten(foundation) };
const lightTokens = flatten(light);
const darkTokens = flatten(dark);
const deepDarkTokens = flatten(deepDark);

await rm(output, { recursive: true, force: true });
await Promise.all(["css", "js", "json", "react-native"].map((folder) => mkdir(join(output, folder), { recursive: true })));

const banner = "/* Generated from DTCG-compatible ArcSyn token sources. */\n";
await writeFile(join(output, "css", "tokens.css"), `${banner}:root {\n${declarations(primitives)}\n}\n`);
await writeFile(join(output, "css", "theme-light.css"), `${banner}:root, [data-arcsyn-theme=\"light\"] {\n  color-scheme: light;\n${declarations(lightTokens)}\n}\n`);
await writeFile(join(output, "css", "theme-dark.css"), `${banner}[data-arcsyn-theme=\"dark\"] {\n  color-scheme: dark;\n${declarations(darkTokens)}\n}\n`);
await writeFile(join(output, "css", "theme-deep-dark.css"), `${banner}[data-arcsyn-theme=\"deep-dark\"] {\n  color-scheme: dark;\n${declarations(deepDarkTokens)}\n}\n`);
await writeFile(join(output, "css", "tailwind.css"), `${banner}@theme {\n${tailwindDeclarations(primitives)}\n}\n`);

const payload = { primitives, themes: { light: lightTokens, dark: darkTokens, "deep-dark": deepDarkTokens } };
const resolvedThemes = Object.fromEntries(
  Object.entries(payload.themes).map(([theme, themeTokens]) => [
    theme,
    Object.fromEntries(Object.entries(themeTokens).map(([name, value]) => [name, resolveReference(value, primitives)])),
  ]),
);
const reactNativePayload = {
  color: tokensWithPrefix(primitives, "color."),
  spacing: tokensWithPrefix(primitives, "spacing."),
  radius: tokensWithPrefix(primitives, "radius."),
  fontSize: tokensWithPrefix(primitives, "fontSize."),
  duration: tokensWithPrefix(primitives, "duration."),
  fontFamily: {
    sans: "IBMPlexSans-Regular",
    sansMedium: "IBMPlexSans-Medium",
    sansSemibold: "IBMPlexSans-SemiBold",
    mono: "IBMPlexMono-Regular",
    monoMedium: "IBMPlexMono-Medium",
  },
  themes: Object.fromEntries(
    Object.entries(resolvedThemes).map(([theme, themeTokens]) => [theme, { color: tokensWithPrefix(themeTokens, "color.") }]),
  ),
};
await writeFile(join(output, "json", "tokens.json"), `${JSON.stringify(payload, null, 2)}\n`);
await writeFile(join(output, "js", "index.js"), `export const tokens = ${JSON.stringify(payload, null, 2)};\nexport const { primitives, themes } = tokens;\n`);
await writeFile(join(output, "js", "index.d.ts"), "export declare const tokens: Record<string, unknown>;\nexport declare const primitives: Record<string, string>;\nexport declare const themes: { light: Record<string, string>; dark: Record<string, string>; \"deep-dark\": Record<string, string> };\n");
await writeFile(join(output, "react-native", "index.js"), `export const tokens = ${JSON.stringify(reactNativePayload, null, 2)};\nexport const { color, spacing, radius, fontSize, duration, fontFamily, themes } = tokens;\nexport default tokens;\n`);
await writeFile(join(output, "react-native", "index.d.ts"), "export interface ArcSynReactNativeTokens {\n  color: Record<string, unknown>;\n  spacing: Record<string, number>;\n  radius: Record<string, number>;\n  fontSize: Record<string, number>;\n  duration: Record<string, number>;\n  fontFamily: Record<string, string>;\n  themes: { light: { color: Record<string, string> }; dark: { color: Record<string, string> }; \"deep-dark\": { color: Record<string, string> } };\n}\nexport declare const tokens: ArcSynReactNativeTokens;\nexport declare const color: ArcSynReactNativeTokens['color'];\nexport declare const spacing: ArcSynReactNativeTokens['spacing'];\nexport declare const radius: ArcSynReactNativeTokens['radius'];\nexport declare const fontSize: ArcSynReactNativeTokens['fontSize'];\nexport declare const duration: ArcSynReactNativeTokens['duration'];\nexport declare const fontFamily: ArcSynReactNativeTokens['fontFamily'];\nexport declare const themes: ArcSynReactNativeTokens['themes'];\nexport default tokens;\n");

console.log("Built @arcsyn/tokens");
