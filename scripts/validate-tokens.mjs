import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Ajv from "ajv";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const tokenRoot = path.join(repositoryRoot, "packages", "tokens");
const sourceRoot = path.join(tokenRoot, "src");
const schema = JSON.parse(await readFile(path.join(tokenRoot, "tokens.schema.json"), "utf8"));
const validateSchema = new Ajv({ allErrors: true, allowUnionTypes: true }).compile(schema);

function flatten(value, prefix = [], result = new Map()) {
  for (const [key, child] of Object.entries(value)) {
    if (key.startsWith("$")) continue;
    const tokenPath = [...prefix, key];
    if (child && typeof child === "object" && "$value" in child) {
      result.set(tokenPath.join("."), child);
    } else if (child && typeof child === "object") {
      flatten(child, tokenPath, result);
    }
  }
  return result;
}

function resolve(value, primitives, seen = new Set()) {
  if (typeof value !== "string" || !/^\{[^{}]+\}$/.test(value)) return value;
  const reference = value.slice(1, -1);
  if (seen.has(reference)) throw new Error(`Referência circular: ${[...seen, reference].join(" -> ")}`);
  const token = primitives.get(reference);
  if (!token) throw new Error(`Referência desconhecida: ${reference}`);
  return resolve(token.$value, primitives, new Set([...seen, reference]));
}

function luminance(hex) {
  const channels = hex
    .slice(1)
    .match(/.{2}/g)
    .map((channel) => Number.parseInt(channel, 16) / 255)
    .map((channel) => (channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4));
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrast(first, second) {
  const [lighter, darker] = [luminance(first), luminance(second)].sort((a, b) => b - a);
  return (lighter + 0.05) / (darker + 0.05);
}

async function loadDirectory(directory) {
  const files = (await readdir(directory)).filter((file) => file.endsWith(".json")).sort();
  return Promise.all(
    files.map(async (file) => {
      const document = JSON.parse(await readFile(path.join(directory, file), "utf8"));
      if (!validateSchema(document)) {
        const details = validateSchema.errors?.map((error) => `${error.instancePath || "/"} ${error.message}`).join("\n");
        throw new Error(`${file} não corresponde ao schema DTCG:\n${details}`);
      }
      return [file.replace(/\.json$/, ""), flatten(document)];
    }),
  );
}

const primitiveDocuments = await loadDirectory(path.join(sourceRoot, "primitive"));
const themeDocuments = await loadDirectory(path.join(sourceRoot, "semantic"));
const primitives = new Map(primitiveDocuments.flatMap(([, tokens]) => [...tokens]));
const themes = new Map(themeDocuments);
const requiredSemanticTokens = [
  "color.background",
  "color.surface",
  "color.foreground",
  "color.primary",
  "color.primaryForeground",
  "color.border",
  "color.muted",
  "color.success",
  "color.warning",
  "color.danger",
];
const contrastPairs = [
  ["color.background", "color.foreground"],
  ["color.primary", "color.primaryForeground"],
  ["color.successBackground", "color.successForeground"],
  ["color.warningBackground", "color.warningForeground"],
  ["color.dangerBackground", "color.dangerForeground"],
];

const canonicalThemeKeys = [...themes.get("dark").keys()].sort();

for (const [themeName, tokens] of themes) {
  const missing = requiredSemanticTokens.filter((token) => !tokens.has(token));
  if (missing.length > 0) throw new Error(`${themeName}: tokens semânticos obrigatórios ausentes: ${missing.join(", ")}`);

  const keys = [...tokens.keys()].sort();
  if (JSON.stringify(keys) !== JSON.stringify(canonicalThemeKeys)) {
    throw new Error(`${themeName}: o contrato semântico difere do tema dark`);
  }

  for (const [tokenName, token] of tokens) {
    try {
      resolve(token.$value, primitives);
    } catch (error) {
      throw new Error(`${themeName}.${tokenName}: ${error.message}`, { cause: error });
    }
  }

  for (const [backgroundName, foregroundName] of contrastPairs) {
    const background = resolve(tokens.get(backgroundName).$value, primitives);
    const foreground = resolve(tokens.get(foregroundName).$value, primitives);
    if (!/^#[\da-f]{6}$/i.test(background) || !/^#[\da-f]{6}$/i.test(foreground)) {
      throw new Error(`${themeName}: contraste não pôde ser calculado para ${backgroundName}/${foregroundName}`);
    }
    const ratio = contrast(background, foreground);
    if (ratio < 4.5) {
      throw new Error(`${themeName}: contraste ${backgroundName}/${foregroundName} é ${ratio.toFixed(2)}:1; mínimo 4.5:1`);
    }
  }
}

console.log(`${primitives.size} tokens primitivos e ${themes.size} temas validados.`);
