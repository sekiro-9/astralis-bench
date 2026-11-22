/**
 * Builds a bench app and reads its First Load JS for "/" (and "/empty" when
 * the app has one) from the production build. Used by run.mjs.
 */
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { gzipSync } from "node:zlib";

/**
 * First Load JS for one route, computed from the build output (Next 16's
 * Turbopack build no longer prints the size table). Matches Next's historical
 * definition: the route's client chunks plus the chunks shared by every page,
 * polyfills excluded. Reported raw and gzipped.
 */
function measureRoute(cwd, document) {
  const nextDir = join(cwd, ".next");
  // Next 16 no longer writes app-build-manifest.json, so the prerendered
  // document is the ground truth: every /_next/static/*.js it references
  // (script tags and flight-preloaded chunks) is JS a first visit downloads.
  const html = readFileSync(join(nextDir, "server", "app", document), "utf8");
  const files = new Set([...html.matchAll(/\/_next\/(static\/[^"'\\ ]+?\.js)/g)].map((m) => m[1]));
  const buildManifest = JSON.parse(readFileSync(join(nextDir, "build-manifest.json"), "utf8"));
  for (const f of [...(buildManifest.polyfillFiles ?? []), ...(buildManifest.lowPriorityFiles ?? [])]) {
    files.delete(f);
  }

  let raw = 0;
  let gzip = 0;
  for (const file of files) {
    const path = join(nextDir, file);
    raw += statSync(path).size;
    gzip += gzipSync(readFileSync(path)).length;
  }
  return { files: files.size, raw, gzip };
}

export const nextBin = (cwd) => join(cwd, "node_modules", "next", "dist", "bin", "next");

/** Runs `next build` in the app; throws with the build's tail on failure. */
export function build(name, cwd) {
  console.error(`[${name}] next build …`);
  const result = spawnSync(process.execPath, [nextBin(cwd), "build"], {
    cwd,
    encoding: "utf8",
    env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" },
    maxBuffer: 32 * 1024 * 1024,
  });
  if (result.status !== 0) {
    throw new Error(`[${name}] build failed (exit ${result.status}):\n${`${result.stdout}\n${result.stderr}`.slice(-3000)}`);
  }
}

/** { page, empty? }: First Load JS of "/" and, when the app has it, of "/empty". */
export function measureApp(cwd) {
  const page = measureRoute(cwd, "index.html");
  const empty = existsSync(join(cwd, ".next", "server", "app", "empty.html")) ? measureRoute(cwd, "empty.html") : undefined;
  return { page, empty };
}
