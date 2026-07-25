import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const html = await readFile(join(root, "templates", "arcsyn-presentation-template.html"), "utf8");
const technicalDocument = await readFile(join(root, "templates", "arcsyn-technical-proposal-template.html"), "utf8");

const checks = [
  ['lang="pt-BR"', "language"],
  ['class="arcsyn-deck"', "deck root"],
  ['data-layout="cover"', "cover layout"],
  ['data-layout="architecture"', "architecture layout"],
  ['data-layout="decision"', "decision layout"],
  ['data-layout="closing"', "closing layout"],
  ["../assets/arcsyn-logo.png", "official logo"],
  ["@media print", "print styles"],
  ['aria-live="polite"', "announced slide state"],
  ["ArrowRight", "keyboard navigation"],
  ["touchstart", "touch navigation"],
];

for (const [needle, label] of checks) {
  if (!html.includes(needle)) throw new Error(`HTML presentation template is missing ${label}`);
}

const slideCount = (html.match(/<section class="arcsyn-slide(?:\s|")/g) ?? []).length;
if (slideCount !== 12) {
  throw new Error(`HTML presentation template must expose 12 layouts; found ${slideCount}`);
}

console.log("Validated ArcSyn HTML presentation template");

const documentChecks = [
  ['lang="pt-BR"', "language"],
  ['class="technical-document"', "document root"],
  ['class="document-nav"', "table of contents"],
  ['id="arquitetura"', "architecture section"],
  ['id="qualidades"', "quality attributes section"],
  ['id="trade-offs"', "trade-offs section"],
  ['id="riscos"', "risks section"],
  ['id="custos"', "costs section"],
  ["../assets/arcsyn-logo.png", "official logo"],
  ["@media print", "print styles"],
  ['id="theme-toggle"', "theme control"],
  ["window.print()", "PDF export"],
];

for (const [needle, label] of documentChecks) {
  if (!technicalDocument.includes(needle)) {
    throw new Error(`HTML technical proposal template is missing ${label}`);
  }
}

const qualityCount = (technicalDocument.match(/class="quality-card"/g) ?? []).length;
if (qualityCount !== 3) {
  throw new Error(`HTML technical proposal template must prioritize 3 quality attributes; found ${qualityCount}`);
}

console.log("Validated ArcSyn HTML technical proposal template");
