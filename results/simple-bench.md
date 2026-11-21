# Simple bench: First Load JS of one mostly-static page

Page and method: [simple-bench/README.md](../simple-bench/README.md).

| App | JS files (/) | First Load JS raw | First Load JS gzip |
| --- | --- | --- | --- |
| astralis | 6 | 505.8 kB | 151.1 kB |
| astralis (empty route floor) | 5 | 453.0 kB | 134.8 kB |
| baseline | 5 | 441.0 kB | 129.8 kB |
| chakra | 7 | 787.1 kB | 224.3 kB |
| mui | 7 | 625.7 kB | 187.8 kB |
| radix | 7 | 571.5 kB | 171.2 kB |
| radix (empty route floor) | 6 | 498.4 kB | 149.9 kB |
| shadcn | 6 | 549.2 kB | 165.8 kB |

Measured 2026-11-21 — production `next build`, default config;
all /_next/static JS referenced by the prerendered "/" document, polyfills excluded.
