# Simple bench: the JavaScript one mostly-static page costs

Measured 2026-11-22. Production `next build`, default config; every /_next/static JS file the prerendered page references, polyfills excluded.
The page and the method: [simple-bench/README.md](../simple-bench/README.md). Run `pnpm simple` to open each app.

## The page

| Library      | Version   | JS files | First Load JS raw, kB | First Load JS gzip, kB | Added by the library, kB | vs Astralis |
| ------------ | --------- | -------: | --------------------: | ---------------------: | -----------------------: | ----------: |
| Bare Next.js | 16.3.0    |        5 |                 441.0 |                  129.8 |                        - |           - |
| Astralis     | 0.11.0    |        6 |                 469.0 |                  140.1 |                 **10.3** |        1.0x |
| shadcn/ui    | copied in |        6 |                 549.2 |                  165.8 |                     36.0 |        3.5x |
| Radix Themes | 3.3.0     |        7 |                 571.5 |                  171.2 |                     41.4 |        4.0x |
| MUI          | 7.3.11    |        7 |                 625.7 |                  187.8 |                     58.0 |        5.7x |
| Chakra UI    | 3.36.1    |        7 |                 787.1 |                  224.3 |                     94.5 |        9.2x |

## Layout only (provider, no components)

| Library      | First Load JS gzip, kB | Added by the library, kB |
| ------------ | ---------------------: | -----------------------: |
| Astralis     |                  131.0 |                  **1.2** |
| Radix Themes |                  149.9 |                     20.1 |

## What each column means

- **First Load JS**: All the JavaScript a first visit to the page downloads: Next.js and React, the library, and the page's own code.
- **raw, gzip**: Size on disk, and compressed the way a server sends it. gzip is what crosses the network.
- **Added by the library**: First Load JS (gzip) minus the bare Next.js app's: what the library itself costs on this page. The headline number.
- **vs Astralis**: How many times more JavaScript the library adds than Astralis does.
- **JS files**: How many JavaScript files the page loads.
- **Bare Next.js**: The same page in plain HTML with no library: the floor no library can go under.
- **Layout only**: An /empty route with the library's provider and layout but no components: the cost of setting the library up at all.
- **kB**: Kilobytes. Lower is better in every column; the best value is highlighted.
