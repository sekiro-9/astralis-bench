#!/usr/bin/env node
/**
 * The CSS bench: the stylesheets of the libraries that ship precompiled CSS.
 *
 *   pnpm bench:css     # from the repo root; installs this folder if needed, prints and saves results/css-bench.md
 *
 * Two measures:
 *  1. The whole published stylesheet of each library (what an app gets if it imports the library's full CSS),
 *     every file minified with the same tool (lightningcss) before compressing, because only some ship minified.
 *  2. The CSS a real page loads: the stylesheets the simple bench's prerendered "/" page links to
 *     (needs `pnpm bench:simple` to have built the apps).
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { brotliCompressSync, constants, gzipSync } from "node:zlib";
import { run } from "../lib/process.mjs";
import { markdownGlossary, markdownTable, terminalGlossary, terminalTable } from "../lib/table.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const resultsDir = join(here, "..", "results");
const simpleApps = join(here, "..", "simple-bench", "apps");

if (!existsSync(join(here, "node_modules", "lightningcss"))) {
  console.log("[css-bench] installing …");
  run("npm", ["install", "--no-audit", "--no-fund", "--legacy-peer-deps"], here);
}
const require = createRequire(join(here, "package.json"));
const { transform } = require("lightningcss");

// The full stylesheet each library publishes. Astryx needs a theme file next to its component CSS.
const LIBRARIES = [
  { label: "Astralis", pkg: "astralis-ui", files: ["dist/styles.css"] },
  { label: "Mantine", pkg: "@mantine/core", files: ["styles.css"] },
  { label: "Astryx", pkg: "@astryxdesign/core", files: ["dist/astryx.css", "@astryxdesign/theme-neutral/dist/theme.css"] },
  { label: "Radix Themes", pkg: "@radix-ui/themes", files: ["styles.css"] },
  { label: "Carbon", pkg: "@carbon/styles", files: ["css/styles.css"] },
];

const pkgDir = (name) => join(here, "node_modules", ...name.split("/"));
const version = (name) => JSON.parse(readFileSync(join(pkgDir(name), "package.json"), "utf8")).version;
const kb = (bytes) => (bytes / 1024).toFixed(1);
const gzip = (buf) => gzipSync(buf, { level: 9 }).length;
const brotli = (buf) => brotliCompressSync(buf, { params: { [constants.BROTLI_PARAM_QUALITY]: 11 } }).length;

function readFile(lib, file) {
  // A file path may name another package ("@scope/pkg/path") or a path inside the library's own package.
  const scoped = file.startsWith("@") ? file.split("/").slice(0, 2).join("/") : null;
  const path = scoped ? join(pkgDir(scoped), file.slice(scoped.length + 1)) : join(pkgDir(lib.pkg), file);
  return readFileSync(path);
}

const published = LIBRARIES.map((lib) => {
  const raw = Buffer.concat(lib.files.map((f) => readFile(lib, f)));
  const { code } = transform({ filename: "styles.css", code: raw, minify: true, errorRecovery: true });
  return {
    ...lib,
    version: version(lib.pkg),
    raw: raw.length,
    min: code.length,
    gzip: gzip(code),
    brotli: brotli(code),
  };
}).sort((a, b) => a.gzip - b.gzip);

// CSS the simple bench's "/" page actually links to.
const PAGES = [
  { label: "Astralis", app: "astralis" },
  { label: "shadcn/ui", app: "shadcn" },
  { label: "Radix Themes", app: "radix" },
  { label: "MUI", app: "mui" },
  { label: "Chakra UI", app: "chakra" },
  { label: "Bare Next.js", app: "baseline" },
];
const perPage = PAGES.map((p) => {
  const dir = join(simpleApps, p.app, ".next");
  const html = join(dir, "server", "app", "index.html");
  if (!existsSync(html)) return null;
  const doc = readFileSync(html, "utf8");
  const files = [...new Set([...doc.matchAll(/\/_next\/(static\/[^"'\\ ]+?\.css)/g)].map((m) => m[1]))];
  const css = Buffer.concat(files.map((f) => readFileSync(join(dir, f))));
  const inline = [...doc.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]).join("");
  return { ...p, files: files.length, linked: css.length, linkedGzip: css.length ? gzip(css) : 0, inline: Buffer.byteLength(inline) };
}).filter(Boolean);

const publishedColumns = [
  { title: "Library", get: (r) => r.label, align: "left" },
  { title: "Version", get: (r) => r.version, align: "left" },
  { title: "As published, kB", get: (r) => kb(r.raw) },
  { title: "Minified, kB", get: (r) => kb(r.min), best: (r) => r.min },
  { title: "gzip, kB", get: (r) => kb(r.gzip), best: (r) => r.gzip },
  { title: "brotli, kB", get: (r) => kb(r.brotli), best: (r) => r.brotli },
];
const pageColumns = [
  { title: "Library", get: (r) => r.label, align: "left" },
  { title: "CSS files", get: (r) => r.files },
  { title: "Linked CSS, kB", get: (r) => kb(r.linked) },
  { title: "Linked CSS gzip, kB", get: (r) => kb(r.linkedGzip) },
  { title: "CSS inside the HTML, kB", get: (r) => kb(r.inline) },
];

const GLOSSARY = [
  ["As published", "The full stylesheet file(s) as the package ships them. Some ship minified, some do not."],
  ["Minified", "The same CSS minified with one tool (lightningcss), so every library is compared on equal terms."],
  ["gzip, brotli", "The minified CSS compressed the way servers send it (gzip level 9, brotli quality 11)."],
  ["Linked CSS", "The stylesheets the simple bench's page links to, as the browser downloads them before first paint."],
  ["CSS inside the HTML", "Styles written straight into the page, which is how runtime CSS-in-JS libraries (MUI, Chakra UI) deliver theirs."],
  ["kB", "Kilobytes. Lower is better; the best value in each column is highlighted."],
];

const date = new Date().toISOString().slice(0, 10);
console.log(`\nThe whole published stylesheet\n${terminalTable(publishedColumns, published)}`);
if (perPage.length) console.log(`\nCSS one page loads (simple bench)\n${terminalTable(pageColumns, perPage)}`);
console.log(`\nWhat each column means:\n${terminalGlossary(GLOSSARY)}`);

const markdown = [
  "# CSS bench: the stylesheets of libraries that ship precompiled CSS",
  "",
  `Measured ${date}. The libraries are those grouped as "precompiled CSS" in the literature review, plus Astralis.`,
  "Method: [css-bench/README.md](../css-bench/README.md).",
  "",
  "## The whole published stylesheet",
  "",
  markdownTable(publishedColumns, published),
  "",
  ...(perPage.length
    ? ["## CSS one page loads (simple bench)", "", markdownTable(pageColumns, perPage), ""]
    : []),
  "## What each column means",
  "",
  markdownGlossary(GLOSSARY),
  "",
].join("\n");
mkdirSync(resultsDir, { recursive: true });
writeFileSync(join(resultsDir, "css-bench.md"), markdown);
console.log("\nSaved results/css-bench.md");
