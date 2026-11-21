# Shop bench: the same landing page in each library

Measured 2026-11-21. Production `next build` + `next start`, Playwright, 5 cold loads per app after one warm-up, medians.
Method and caveats: [ecommerce/README.md](../ecommerce/README.md).

### Desktop 1440px

| App | JS kB | CSS kB | HTML kB | Script ms | Main thread ms | Blocking ms | First paint ms | Hero requested ms | Largest paint ms | Images kB |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| astralis | 183 | 47 | 36 | 71 | 477 | 0 | 188 | 20 | 256 | 1210 |
| chakra | 272 | 1 | 56 | 241 | 561 | 28 | 184 | 18 | 268 | 2174 |

### Phone 390px, CPU 4x, slow 4G

| App | JS kB | CSS kB | HTML kB | Script ms | Main thread ms | Blocking ms | First paint ms | Hero requested ms | Largest paint ms | Images kB |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| astralis | 183 | 47 | 36 | 267 | 3822 | 116 | 1628 | 194 | 4580 | 1210 |
| chakra | 272 | 1 | 56 | 1043 | 3390 | 301 | 832 | 196 | 5428 | 2174 |
