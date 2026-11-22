#!/usr/bin/env node
/**
 * The shop bench: the same landing page built with each library.
 *
 *   pnpm shop                    # build if needed, serve every app, print the links
 *   pnpm bench:shop              # fresh build, serve, measure, save results/shop.md
 *   pnpm bench:shop -- --phone   # one profile only (--desktop or --phone)
 *   pnpm bench:shop -- --runs 3  # fewer loads per app (default 5)
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { run, start, stop, waitForServer } from "../lib/process.mjs";
import { markdownGlossary, markdownTable, terminalGlossary, terminalTable } from "../lib/table.mjs";
import { measure, profiles } from "./measure.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const resultsDir = join(here, "..", "results");

const LIBRARIES = [
  { name: "astralis", label: "Astralis", pkg: "astralis-ui", port: 3301 },
  { name: "chakra", label: "Chakra UI", pkg: "@chakra-ui/react", port: 3401 },
  { name: "mui", label: "MUI", pkg: "@mui/material", port: 3501 },
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

/** The installed version of the app's component library, for the results header. */
function libraryVersion(app) {
  try {
    return JSON.parse(readFileSync(join(app.dir, "node_modules", app.pkg, "package.json"), "utf8")).version;
  } catch {
    return "?";
  }
}

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

// [row name, unit, value, what it means]
const METRICS = [
  ["JS", "kB", (r) => r.jsKB, "JavaScript downloaded, compressed as sent. The browser then has to parse and run all of it."],
  ["CSS", "kB", (r) => r.cssKB, "Stylesheets downloaded. Astralis ships one precompiled stylesheet; Chakra and MUI write their styles from JavaScript into the HTML."],
  ["HTML", "kB", (r) => r.htmlKB, "The page document itself, including any styles written into it."],
  ["Images", "kB", (r) => r.imageKB, "Photos and icons downloaded. Not the library's doing; it shows each app loads the same page."],
  ["Script time", "ms", (r) => r.scriptMs, "Time the browser spent running JavaScript during the load."],
  ["Main thread", "ms", (r) => r.mainThreadMs, "All work on the browser's main thread: script, styles, layout and painting. While it is busy, taps and clicks wait."],
  ["Blocking time (TBT)", "ms", (r) => r.tbtMs, "Total Blocking Time: the part of each long task beyond 50 ms, so the time the page ignored input while loading."],
  ["First paint (FCP)", "ms", (r) => r.fcpMs, "First Contentful Paint: when the first text or image appears on screen."],
  ["Hero requested", "ms", (r) => r.heroRequestedMs, "When the browser started fetching the hero photo; earlier means the page pointed to it sooner."],
  ["Largest paint (LCP)", "ms", (r) => r.lcpMs, "Largest Contentful Paint: when the biggest element (the hero photo) appears. Google counts under 2.5 s as good."],
  ["Layout shift (CLS)", "", (r) => r.cls, "Cumulative Layout Shift: how much content jumps around while loading. Under 0.1 is good."],
];

const GLOSSARY = [
  ...METRICS.map(([name, , , meaning]) => [name, meaning]),
  ["kB, ms", "Kilobytes and milliseconds. Lower is better on every row; the best value in each row is highlighted."],
];

/** One table per profile: a row per metric, a column per library. */
function tables(rows) {
  const columns = [
    { title: "Metric", get: (m) => m.label, align: "left" },
    ...apps.map((app) => ({ title: app.label, get: (m) => m.values[app.name] ?? "", compare: true })),
  ];
  return Object.keys(profiles)
    .map((key) => {
      const group = rows.filter((r) => r.profile === key);
      if (!group.length) return null;
      const metricRows = METRICS.map(([name, unit, get]) => ({
        label: unit ? `${name}, ${unit}` : name,
        lowerIsBetter: true,
        values: Object.fromEntries(group.map((r) => [r.app, get(r)])),
      }));
      return { label: profiles[key].label, columns, rows: metricRows };
    })
    .filter(Boolean);
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
  for (const app of apps) console.log(`  ${app.label.padEnd(10)} ${app.url}`);

  if (mode === "serve") {
    console.log("\nPress Ctrl+C to stop.");
    await new Promise(() => {});
  }

  console.log(`\nMeasuring (${runs} cold loads per app and profile, medians) …`);
  const rows = await measure(apps, { runs, only });
  const date = new Date().toISOString().slice(0, 10);
  const versions = apps.map((app) => `${app.pkg} ${libraryVersion(app)}`).join(", ");
  const groups = tables(rows);

  for (const group of groups) console.log(`\n${group.label}\n${terminalTable(group.columns, group.rows)}`);
  console.log(`\nWhat each row means:\n${terminalGlossary(GLOSSARY)}`);

  const markdown = [
    "# Shop bench: the same landing page in each library",
    "",
    `Measured ${date} on ${versions}.`,
    `Production \`next build\` + \`next start\`, Playwright, ${runs} cold loads per app after one warm-up, medians.`,
    "Method and caveats: [ecommerce/README.md](../ecommerce/README.md).",
    ...groups.flatMap((group) => ["", `## ${group.label}`, "", markdownTable(group.columns, group.rows)]),
    "",
    "## What each row means",
    "",
    markdownGlossary(GLOSSARY),
    "",
  ].join("\n");

  mkdirSync(resultsDir, { recursive: true });
  writeFileSync(join(resultsDir, "shop.md"), markdown);
  writeFileSync(join(resultsDir, `shop-${date}.json`), JSON.stringify(rows, null, 2));
  console.log(`\nSaved results/shop.md and results/shop-${date}.json`);
} finally {
  shutdown();
}
