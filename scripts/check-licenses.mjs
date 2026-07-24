import { execFileSync } from "node:child_process";

const deniedLicensePattern = /(?:^|[^A-Z])(A?GPL|LGPL|SSPL)-/i;
const pnpmCli = process.env.npm_execpath;

if (!pnpmCli) throw new Error("Execute a verificação por meio de `pnpm licenses:check`.");

const report = JSON.parse(
  execFileSync(process.execPath, [pnpmCli, "licenses", "list", "--prod", "--json"], {
    encoding: "utf8",
  }),
);

const denied = Object.keys(report).filter((license) => deniedLicensePattern.test(license));

if (denied.length > 0) {
  console.error(`Licenças não permitidas encontradas: ${denied.join(", ")}`);
  process.exitCode = 1;
} else {
  console.log(`Licenças verificadas: ${Object.keys(report).sort().join(", ")}`);
}
