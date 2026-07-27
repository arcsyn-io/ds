import { spawn } from "node:child_process";

const pnpm = process.platform === "win32" ? "pnpm.cmd" : "pnpm";
const processes = [
  ["docs", ["--filter", "@arcsyn-io/docs", "dev", "--", "--host", "127.0.0.1"]],
  ["storybook", ["--filter", "@arcsyn-io/docs", "storybook", "--", "--host", "127.0.0.1"]],
].map(([name, args]) => {
  const child = spawn(pnpm, args, { stdio: "inherit" });
  child.on("exit", (code, signal) => {
    if (signal) console.log(`[${name}] encerrado por ${signal}`);
    else if (code !== 0) console.error(`[${name}] encerrado com código ${code}`);
  });
  return child;
});

const stop = () => {
  for (const child of processes) {
    if (!child.killed) child.kill();
  }
};

process.on("SIGINT", stop);
process.on("SIGTERM", stop);
