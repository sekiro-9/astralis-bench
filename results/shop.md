# Shop bench: the same landing page in each library

Measured 2026-11-22 on astralis-ui 0.11.0, @chakra-ui/react 3.38.0, @mui/material 7.3.11.
Production `next build` + `next start`, Playwright, 5 cold loads per app after one warm-up, medians.
Method and caveats: [ecommerce/README.md](../ecommerce/README.md).

## Desktop 1440px

| Metric                  | Astralis | Chakra UI |      MUI |
| ----------------------- | -------: | --------: | -------: |
| JS, kB                  |  **176** |       272 |      220 |
| CSS, kB                 |       47 |     **1** |    **1** |
| HTML, kB                |   **36** |        56 |       51 |
| Images, kB              | **2165** |      2174 | **2165** |
| Script time, ms         |   **54** |       235 |       91 |
| Main thread, ms         |  **253** |       505 |      299 |
| Blocking time (TBT), ms |    **0** |        11 |        1 |
| First paint (FCP), ms   |  **136** |       176 |      172 |
| Hero requested, ms      |   **19** |    **19** |       20 |
| Largest paint (LCP), ms |      204 |       248 |  **172** |
| Layout shift (CLS)      |    **0** |     **0** |    **0** |

## Phone 390px, CPU 4x, slow 4G

| Metric                  | Astralis | Chakra UI |      MUI |
| ----------------------- | -------: | --------: | -------: |
| JS, kB                  |  **176** |       272 |      220 |
| CSS, kB                 |       47 |     **1** |    **1** |
| HTML, kB                |   **36** |        56 |       51 |
| Images, kB              | **1210** |      2174 | **1210** |
| Script time, ms         |  **383** |      1409 |      685 |
| Main thread, ms         | **2007** |      4066 |     2586 |
| Blocking time (TBT), ms |  **260** |       478 |      484 |
| First paint (FCP), ms   |     1496 |   **872** |     1300 |
| Hero requested, ms      |  **193** |       194 |      195 |
| Largest paint (LCP), ms |     5164 |      5388 | **4448** |
| Layout shift (CLS)      |    **0** |     **0** |    **0** |

## What each row means

- **JS**: JavaScript downloaded, compressed as sent. The browser then has to parse and run all of it.
- **CSS**: Stylesheets downloaded. Astralis ships one precompiled stylesheet; Chakra and MUI write their styles from JavaScript into the HTML.
- **HTML**: The page document itself, including any styles written into it.
- **Images**: Photos and icons downloaded. Not the library's doing; it shows each app loads the same page.
- **Script time**: Time the browser spent running JavaScript during the load.
- **Main thread**: All work on the browser's main thread: script, styles, layout and painting. While it is busy, taps and clicks wait.
- **Blocking time (TBT)**: Total Blocking Time: the part of each long task beyond 50 ms, so the time the page ignored input while loading.
- **First paint (FCP)**: First Contentful Paint: when the first text or image appears on screen.
- **Hero requested**: When the browser started fetching the hero photo; earlier means the page pointed to it sooner.
- **Largest paint (LCP)**: Largest Contentful Paint: when the biggest element (the hero photo) appears. Google counts under 2.5 s as good.
- **Layout shift (CLS)**: Cumulative Layout Shift: how much content jumps around while loading. Under 0.1 is good.
- **kB, ms**: Kilobytes and milliseconds. Lower is better on every row; the best value in each row is highlighted.
