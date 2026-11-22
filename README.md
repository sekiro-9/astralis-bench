# astralis-bench

Benchmarks comparing [Astralis UI](https://github.com/sekiro-9/astralis-ui) with
other React component libraries, on production builds. Two benches:

| Bench | What it builds | What it measures | Results |
|---|---|---|---|
| [simple-bench](simple-bench/README.md) | One mostly-static page (hero, stats, cards, table, footer, one menu) in Astralis, Chakra UI, MUI, Radix and shadcn/ui, plus a bare Next.js app | First Load JS: the JavaScript a first visit downloads | [results/simple-bench.md](results/simple-bench.md) |
| [ecommerce](ecommerce/README.md) | A full shop landing page from one Figma design, in Astralis, Chakra UI and MUI | What a visitor experiences: JS, CSS and HTML size, script and main-thread time, blocking time, first and largest paint, on a desktop and a throttled phone | [results/shop.md](results/shop.md) |

## Run it

Needs Node 20+, pnpm 10 and npm. On Windows the measurement uses Microsoft
Edge; elsewhere run `pnpm exec playwright install chromium` once.

```
pnpm install
pnpm simple                # serve every simple-bench app (production builds), print the links
pnpm bench:simple          # build the simple-bench apps, measure, print and save the tables
pnpm shop                  # serve every shop app (production builds), print the links
pnpm bench:shop            # rebuild, serve, measure desktop and phone, save the results
```

`pnpm simple` serves the bare Next.js app on http://localhost:3100 and
Astralis, shadcn/ui, Radix Themes, MUI and Chakra UI on ports 3101 to 3105.
`pnpm shop` serves Astralis on http://localhost:3301, Chakra UI on
http://localhost:3401 and MUI on http://localhost:3501, to compare by eye.

Each app keeps its own lockfile and installs on its own, as a real project
would; nothing is shared between apps except the measuring scripts.

Each results file explains every column under its tables, and the best value
in each column or row is shown in bold (green in the terminal).
