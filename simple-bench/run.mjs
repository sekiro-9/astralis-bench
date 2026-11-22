#!/usr/bin/env node
/**
 * The simple bench: one mostly-static page built with each library.
 *
 *   pnpm simple                    # build if needed, serve every app, print the links
 *   pnpm bench:simple              # fresh build, measure, print and save results/simple-bench.md
 *   pnpm bench:simple astralis mui # some apps (the bare Next.js app is always included)
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { run, start, stop, waitForServer } from "../lib/process.mjs";
import { markdownGlossary, markdownTable, terminalGlossary, terminalTable } from "../lib/table.mjs";
import { build, measureApp, nextBin } from "./measure.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const appsDir = join(here, "apps");
const resultsDir = join(here, "..", "results");

const LIBRARIES = [
  { name: "baseline", label: "Bare Next.js", pkg: "next", port: 3100 },
  { name: "astralis", label: "Astralis", pkg: "astralis-ui", port: 3101 },
  { name: "shadcn", label: "shadcn/ui", pkg: null, port: 3102 },
  { name: "radix", label: "Radix Themes", pkg: "@radix-ui/themes", port: 3103 },
  { name: "mui", label: "MUI", pkg: "@mui/material", port: 3104 },
  { name: "chakra", label: "Chakra UI", pkg: "@chakra-ui/react", port: 3105 },
];

const args = process.argv.slice(2);
const mode = args[0] === "serve" ? "serve" : "bench";
const requested = args.filter((arg) => arg !== "serve" && arg !== "bench");
const apps = LIBRARIES.filter((lib) => !requested.length || lib.name === "baseline" || requested.includes(lib.name))
  .map((lib) => ({ ...lib, dir: join(appsDir, lib.name), url: `http://localhost:${lib.port}/` }))
  .filter((app) => existsSync(join(app.dir, "package.json")));

function version(app) {
  if (!app.pkg) return "copied in";
  try {
    return JSON.parse(readFileSync(join(app.dir, "node_modules", app.pkg, "package.json"), "utf8")).version;
  } catch {
    return "?";
  }
}

function install(app) {
  if (!existsSync(nextBin(app.dir))) {
    console.log(`[${app.name}] installing dependencies …`);
    run("npm", ["ci", "--no-audit", "--no-fund"], app.dir);
  }
}

const kb = (bytes) => (bytes / 1024).toFixed(1);

const GLOSSARY = [
  ["First Load JS", "All the JavaScript a first visit to the page downloads: Next.js and React, the library, and the page's own code."],
  ["raw, gzip", "Size on disk, and compressed the way a server sends it. gzip is what crosses the network."],
  ["Added by the library", "First Load JS (gzip) minus the bare Next.js app's: what the library itself costs on this page. The headline number."],
  ["vs Astralis", "How many times more JavaScript the library adds than Astralis does."],
  ["JS files", "How many JavaScript files the page loads."],
  ["Bare Next.js", "The same page in plain HTML with no library: the floor no library can go under."],
  ["Layout only", "An /empty route with the library's provider and layout but no components: the cost of setting the library up at all."],
  ["kB", "Kilobytes. Lower is better in every column; the best value is highlighted."],
];

async function serve() {
  for (const app of apps) {
    install(app);
    if (!existsSync(join(app.dir, ".next", "BUILD_ID"))) build(app.name, app.dir);
  }
  const servers = apps.map((app) => start("npx", ["next", "start", "--port", String(app.port)], app.dir));
  const shutdown = () => servers.forEach(stop);
  process.on("SIGINT", () => {
    shutdown();
    process.exit(130);
  });
  try {
    await Promise.all(apps.map((app) => waitForServer(app.url)));
  } catch (error) {
    shutdown();
    throw error;
  }
  console.log("\nServing production builds:");
  for (const app of apps) console.log(`  ${app.label.padEnd(13)} ${app.url}`);
  console.log("\nPress Ctrl+C to stop.");
  await new Promise(() => {});
}

function bench() {
  const results = [];
  for (const app of apps) {
    install(app);
    build(app.name, app.dir);
    results.push({ ...app, version: version(app), ...measureApp(app.dir) });
  }
  const floor = results.find((r) => r.name === "baseline");
  const astralis = results.find((r) => r.name === "astralis");
  const added = (r) => (floor ? r.page.gzip - floor.page.gzip : Number.NaN);
  const library = (r) => r.name !== "baseline";
  const rows = [...results].sort((a, b) => (library(a) ? added(a) : -1) - (library(b) ? added(b) : -1));

  const columns = [
    { title: "Library", get: (r) => r.label, align: "left" },
    { title: "Version", get: (r) => r.version, align: "left" },
    { title: "JS files", get: (r) => r.page.files },
    { title: "First Load JS raw, kB", get: (r) => kb(r.page.raw) },
    { title: "First Load JS gzip, kB", get: (r) => kb(r.page.gzip) },
    { title: "Added by the library, kB", get: (r) => (library(r) ? kb(added(r)) : "-"), best: (r) => (library(r) ? added(r) : Number.NaN) },
    {
      title: "vs Astralis",
      get: (r) => (library(r) && astralis ? `${(added(r) / added(astralis)).toFixed(1)}x` : "-"),
    },
  ];
  const layoutRows = results.filter((r) => r.empty);
  const layoutColumns = [
    { title: "Library", get: (r) => r.label, align: "left" },
    { title: "First Load JS gzip, kB", get: (r) => kb(r.empty.gzip) },
    { title: "Added by the library, kB", get: (r) => kb(r.empty.gzip - (floor?.page.gzip ?? 0)), best: (r) => r.empty.gzip },
  ];

  const date = new Date().toISOString().slice(0, 10);
  console.log(`\nThe page\n${terminalTable(columns, rows)}`);
  if (layoutRows.length) console.log(`\nLayout only (provider, no components)\n${terminalTable(layoutColumns, layoutRows)}`);
  console.log(`\nWhat each column means:\n${terminalGlossary(GLOSSARY)}`);

  const markdown = [
    "# Simple bench: the JavaScript one mostly-static page costs",
    "",
    `Measured ${date}. Production \`next build\`, default config; every /_next/static JS file the prerendered page references, polyfills excluded.`,
    "The page and the method: [simple-bench/README.md](../simple-bench/README.md). Run `pnpm simple` to open each app.",
    "",
    "## The page",
    "",
    markdownTable(columns, rows),
    ...(layoutRows.length ? ["", "## Layout only (provider, no components)", "", markdownTable(layoutColumns, layoutRows)] : []),
    "",
    "## What each column means",
    "",
    markdownGlossary(GLOSSARY),
    "",
  ].join("\n");
  mkdirSync(resultsDir, { recursive: true });
  writeFileSync(join(resultsDir, "simple-bench.md"), markdown);
  console.log("\nSaved results/simple-bench.md");
}

if (mode === "serve") await serve();
else bench();
