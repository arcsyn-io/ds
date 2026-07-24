import path from "node:path";
import { fileURLToPath } from "node:url";
import { ESLint } from "eslint";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const eslint = new ESLint({
  cwd: repositoryRoot,
  overrideConfigFile: path.join(repositoryRoot, "eslint.config.mjs"),
});
const results = await eslint.lintFiles(["."]);
const formatter = await eslint.loadFormatter("stylish");
const output = formatter.format(results);

if (output) process.stdout.write(output);

const hasErrors = results.some((result) => result.errorCount > 0 || result.warningCount > 0);
if (hasErrors) process.exitCode = 1;
