#!/usr/bin/env node
/**
 * The shop bench: the same landing page built with each library.
 *
 *   pnpm shop                    # build if needed, serve every app, print the links
 *   pnpm bench:shop              # fresh build, serve, measure, save results/shop.md
 *   pnpm bench:shop -- --phone   # one profile only (--desktop or --phone)
 *   pnpm bench:shop -- --runs 3  # fewer loads per app (default 5)
 */
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { run, start, stop, waitForServer } from "../lib/process.mjs";
import { measure, profiles } from "./measure.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const resultsDir = join(here, "..", "results");

const LIBRARIES = [
  { name: "astralis", port: 3301 },
  { name: "chakra", port: 3401 },
  { name: "mui", port: 3501 },
];

const args = process.argv.slice(2);
const mode = args[0] ?? "serve";
const only = args.includes("--phone") ? "phone" : args.includes("--desktop") ? "desktop" : undefined;
const runsIndex = args.indexOf("--runs");
const runs = runsIndex > -1 ? Number(args[runsIndex + 1]) : 5;

const apps = LIBRARIES.filter((lib) => existsSync(join(here, lib.name, "package.json"))).map((lib) => ({
  ...lib,
  dir: join(here, lib.name),
  url: `http://localhost:${lib.port}/`,
}));

function prepare(app, { rebuild }) {
  if (!existsSync(join(app.dir, "node_modules", "next"))) {
    console.log(`[${app.name}] installing dependencies …`);
    run("pnpm", ["install", "--frozen-lockfile"], app.dir);
  }
  if (rebuild || !existsSync(join(app.dir, ".next", "BUILD_ID"))) {
    console.log(`[${app.name}] next build …`);
    run("pnpm", ["exec", "next", "build"], app.dir);
  }
}

function table(rows) {
  const columns = [
    ["App", (r) => r.app],
    ["JS kB", (r) => r.jsKB],
    ["CSS kB", (r) => r.cssKB],
    ["HTML kB", (r) => r.htmlKB],
    ["Script ms", (r) => r.scriptMs],
    ["Main thread ms", (r) => r.mainThreadMs],
    ["Blocking ms", (r) => r.tbtMs],
    ["First paint ms", (r) => r.fcpMs],
    ["Hero requested ms", (r) => r.heroRequestedMs],
    ["Largest paint ms", (r) => r.lcpMs],
    ["Images kB", (r) => r.imageKB],
  ];
  const lines = [];
  for (const key of Object.keys(profiles)) {
    const group = rows.filter((r) => r.profile === key);
    if (!group.length) continue;
    lines.push(`\n### ${profiles[key].label}\n`);
    lines.push(`| ${columns.map(([title]) => title).join(" | ")} |`);
    lines.push(`|${columns.map(() => " --- ").join("|")}|`);
    for (const row of group) lines.push(`| ${columns.map(([, get]) => get(row)).join(" | ")} |`);
  }
  return lines.join("\n");
}

const servers = [];
const shutdown = () => {
  for (const server of servers) stop(server);
};
process.on("SIGINT", () => {
  shutdown();
  process.exit(130);
});

try {
  for (const app of apps) prepare(app, { rebuild: mode === "bench" });

  for (const app of apps) {
    servers.push(start("pnpm", ["exec", "next", "start", "--port", String(app.port)], app.dir));
  }
  await Promise.all(apps.map((app) => waitForServer(app.url)));

  console.log("\nServing production builds:");
  for (const app of apps) console.log(`  ${app.name.padEnd(9)} ${app.url}`);

  if (mode === "serve") {
    console.log("\nPress Ctrl+C to stop.");
    await new Promise(() => {});
  }

  console.log(`\nMeasuring (${runs} cold loads per app and profile, medians) …`);
  const rows = await measure(apps, { runs, only });
  const date = new Date().toISOString().slice(0, 10);
  const markdown = [
    "# Shop bench: the same landing page in each library",
    "",
    `Measured ${date}. Production \`next build\` + \`next start\`, Playwright, ${runs} cold loads per app after one warm-up, medians.`,
    "Method and caveats: [ecommerce/README.md](../ecommerce/README.md).",
    table(rows),
    "",
  ].join("\n");
  console.log(table(rows));

  mkdirSync(resultsDir, { recursive: true });
  writeFileSync(join(resultsDir, "shop.md"), markdown);
  writeFileSync(join(resultsDir, `shop-${date}.json`), JSON.stringify(rows, null, 2));
  console.log(`\nSaved results/shop.md and results/shop-${date}.json`);
} finally {
  shutdown();
}
