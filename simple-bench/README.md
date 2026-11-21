# Simple bench

Measures the client JavaScript a component library forces on an identical,
mostly-static page. This is the evidence base for the server-first work
(astralis-ui 0.7.2): "static parts ship zero JavaScript".

## The page

One shared composition, rebuilt per library from the same spec
(`pages/<lib>.tsx` is the source of truth for each flavor):

- hero: heading, supporting copy, two buttons
- stats band: four stat blocks
- cards grid: six cards (header / body / footer)
- table: eight rows, striped, with status badges
- footer: links + badge
- exactly ONE interactive island: an actions Menu

Everything except the Menu is static — no state, no handlers. A library with
real server-component boundaries should ship (close to) only the Menu's JS.

## Layout

- `pages/` — committed page sources, one per library flavor.
- `measure.mjs` — runs `next build` in each app under `apps/` and computes
  First Load JS from the prerendered page.
- `run.mjs` — installs any app that has no dependencies yet (`npm ci`), runs
  `measure.mjs` and saves the table to `results/simple-bench.md`.
- `apps/<lib>/` — one Next app per library. Their sources and lockfiles are
  committed; `node_modules` and `.next` are not.
  Each app's `src/app/page.tsx` is a copy of `pages/<lib>.tsx`.
- `apps/baseline/` — a bare Next app with no component library: the framework
  floor. `apps/astralis` also carries an `/empty` route (layout + provider,
  zero components) that isolates what the layout import alone costs.

## Running

```
pnpm bench:simple                 # from the repo root: every app
pnpm bench:simple astralis mui    # some apps
```

Results are saved to [results/simple-bench.md](../results/simple-bench.md).

## Fairness rules

- Same Next + React versions in every app (pinned in each package.json).
- Production `next build`, default config, no experimental flags.
- The number reported is the route's **First Load JS** from the build output —
  what a first visit downloads for that page (shared chunks + route chunk).
- One theming provider per library where the library requires one (Astralis
  `AstralisProvider`, Chakra `ChakraProvider`, MUI theme) — providers are part
  of the library's real cost.
- CSS is not counted (different delivery models; the story here is JS).
