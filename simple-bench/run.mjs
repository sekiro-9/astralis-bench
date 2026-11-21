#!/usr/bin/env node
/**
 * Installs any bench app that has no dependencies yet, then runs measure.mjs
 * and saves its table to results/simple-bench.md. Usage:
 *
 *   pnpm bench:simple              # every app under simple-bench/apps/
 *   pnpm bench:simple astralis mui # some apps
 */
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { run } from "../lib/process.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const appsDir = join(here, "apps");
const resultsDir = join(here, "..", "results");

const requested = process.argv.slice(2);
const apps = (requested.length ? requested : readdirSync(appsDir)).filter((name) =>
  existsSync(join(appsDir, name, "package.json")),
);

for (const app of apps) {
  const cwd = join(appsDir, app);
  if (!existsSync(join(cwd, "node_modules", "next"))) {
    console.log(`[${app}] installing dependencies …`);
    run("npm", ["ci", "--no-audit", "--no-fund"], cwd);
  }
}

const measure = spawnSync(process.execPath, [join(here, "measure.mjs"), ...apps], {
  stdio: ["ignore", "pipe", "inherit"],
  encoding: "utf8",
});
process.stdout.write(measure.stdout);

if (measure.status === 0 && measure.stdout.includes("|")) {
  mkdirSync(resultsDir, { recursive: true });
  const file = join(resultsDir, "simple-bench.md");
  writeFileSync(
    file,
    `# Simple bench: First Load JS of one mostly-static page\n\nPage and method: [simple-bench/README.md](../simple-bench/README.md).\n${measure.stdout}`,
  );
  console.log(`\nSaved ${file}`);
}
process.exitCode = measure.status ?? 1;
