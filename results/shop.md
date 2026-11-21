# Shop bench: the same landing page in each library

Measured 2026-11-21. Production `next build` + `next start`, Playwright, 5 cold loads per app after one warm-up, medians.
Method and caveats: [ecommerce/README.md](../ecommerce/README.md).

### Desktop 1440px

| App | JS kB | CSS kB | HTML kB | Script ms | Main thread ms | Blocking ms | First paint ms | Hero requested ms | Largest paint ms | Images kB |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| astralis | 183 | 61 | 34 | 87 | 367 | 0 | 136 | 263 | 388 | 2174 |
| chakra | 272 | 1 | 56 | 264 | 615 | 50 | 192 | 16 | 360 | 2174 |

### Phone 390px, CPU 4x, slow 4G

| App | JS kB | CSS kB | HTML kB | Script ms | Main thread ms | Blocking ms | First paint ms | Hero requested ms | Largest paint ms | Images kB |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| astralis | 183 | 61 | 34 | 375 | 2266 | 176 | 1464 | 2902 | 7988 | 1095 |
| chakra | 272 | 1 | 56 | 1204 | 4044 | 349 | 876 | 192 | 5444 | 2174 |
