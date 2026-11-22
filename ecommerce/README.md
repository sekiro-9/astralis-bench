# Shop bench

The same landing page (SHOP.CO, from a free Figma e-commerce template) built
once per library, each the way that library's documentation recommends:

| App | Library | Port (`pnpm shop`) |
|---|---|---|
| [astralis](astralis) | Astralis UI 0.9.0 | 3301 |
| [chakra](chakra) | Chakra UI 3.38.0 + Emotion | 3401 |
| [mui](mui) | MUI (Material UI) 7.3.11 + Emotion | 3501 |

All apps run Next.js 16.4.6 and React 19.3, use the same data, images, icons
and fonts (Satoshi and Unbounded), the same breakpoints (40/48/64/80rem) and
the same folder layout, and have the same motion: a staggered hero entrance,
scroll reveals, hover lifts, all off under reduced motion. They look the same
at 1440, 1280, 1024, 768 and 390px.

[notes/chakra-api.md](notes/chakra-api.md) and [notes/mui-api.md](notes/mui-api.md)
explain how Chakra UI and MUI work next to Astralis, read from each
library's documentation.

## Method

`run.mjs bench` rebuilds every app (`next build`), serves it with `next start`
and loads it in Playwright (Edge on Windows): one warm-up load, then 5 cold
loads with the cache disabled; medians are reported. Two profiles:

- **Desktop:** 1440x900, no throttling.
- **Phone:** 390x844, CPU slowed 4x, network 1.6 Mbps down and 150 ms latency.

Columns: bytes downloaded per type, script and main-thread time (Chrome
DevTools Protocol), total blocking time (long tasks), first and largest
contentful paint, and when the hero photo, the page's largest paint, was
requested.

## Reading the numbers

- The run waits for the hero photo before reading the largest paint. A fixed
  wait reported a paragraph as the largest paint on the phone for any app
  whose photo loads late, which looks fast and is the opposite.
- CSS can arrive inside the HTML: Chakra and MUI inject their styles into the
  page (Emotion), so their CSS column is near zero and their HTML is larger.
- Astralis images load lazily by default and Chakra's do not; MUI has no
  image component, so its app marks the product, style and payment images
  `loading="lazy"` itself. Image bytes on the phone differ for that reason.
- One page, local servers, one browser engine: compare apps with each other,
  not with numbers from other machines.
