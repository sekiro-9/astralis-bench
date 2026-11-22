# MUI (Material UI v7): how it works, next to Astralis

Read from MUI's v7 documentation (v7.mui.com, every page reports 7.3.11,
22 Nov 2026) and checked while building the shop with `@mui/material` 7.3.11,
`@mui/material-nextjs` 7.3.10 and Emotion 11.14. MUI's latest is 9.5; v7 is
used here because the simple bench measures v7 too. Pages are named so each
claim can be checked.

## 1. Architecture

| | MUI v7 | Astralis 0.10 |
|---|---|---|
| How CSS is made | **CSS-in-JS at runtime** (Emotion). `sx` and `styled()` styles are serialised into classes during render, on the server and again in the browser | **Precompiled stylesheet**; props pick classes or set a CSS variable |
| Server Components | Every component file starts with `'use client'` (checked in `node_modules/@mui/material/*/*.js`). They can be placed in a Server Component, but all of them hydrate. The Pigment CSS page says Emotion "does not fully support React Server Components" | 37 of 85 components send no JavaScript |
| Next.js App Router | `AppRouterCacheProvider` from `@mui/material-nextjs/v16-appRouter` around the app; it flushes Emotion's styles into the streamed HTML (Next.js integration page) | Import `styles.css` once |
| Theme | `createTheme()` in a `'use client'` file, passed to `ThemeProvider` (Next.js integration page) | `AstralisProvider` with a token seed |
| CSS variables | Opt in with `cssVariables: true`; then `theme.vars.*` holds `var(--mui-…)` references (CSS theme variables overview) | Always CSS variables |
| Zero-runtime option | Pigment CSS, early alpha, webpack only: "Turbopack is not supported yet" (Pigment CSS page). Next 16 builds with Turbopack | The default |
| Reset | `CssBaseline`, opt in | Scoped to the `.astralis` root |

## 2. Styling API

- **`sx` on every component**: responsive objects (`{ xs, md }`) and arrays,
  pseudo selectors (`"&:hover"`), any `@media` key, nested selectors, theme
  paths as strings (`bgcolor: "surface.hero"`, `color: "text.secondary"`)
  (The sx prop page).
- **The unit trap**: numbers in `sx` are scaled by the theme. Spacing keys
  multiply by `theme.spacing` (8 px), and `borderRadius` multiplies by
  `shape.borderRadius` (8 px). `borderRadius: 6` is 48 px, not 24 px. Found by
  comparing screenshots; the product images, tiles, cards and newsletter band
  were all twice as round.
- **Theme callbacks** (`sx={(theme) => …}`) are functions, so they cannot be
  passed from a Server Component. Everything the shop styles from a Server
  Component is a plain object; motion presets live in `src/theme/motion.ts` as
  objects and the keyframes in `CssBaseline` so they are referenced by name.
- **Merging `sx`**: the documented pattern is an array,
  `sx={[base, ...(Array.isArray(sx) ? sx : [sx])]}` (used in `PageContainer`).
- **Theme customisation is per component**: `components.MuiButton.defaultProps`,
  `styleOverrides` and `variants` (Themed components page). The shop uses it for
  pill buttons, a `soft` Chip variant, the Rating star icon and colours, and
  the small IconButton padding.
- **Custom palette keys and typography variants** need TypeScript module
  augmentation (`declare module "@mui/material/styles"`), one interface per key
  (Palette and Typography pages). The shop adds `palette.surface`,
  `text.subtle` and a `logo` typography variant.
- **Responsive type** is written in the theme with `breakpoints.up()`, which
  needs a first theme to exist, so the theme is built in two passes
  (Typography page, "Responsive font sizes").
- **Breakpoints** are set in px (`breakpoints.values`, unit `px` by default):
  sm 640, md 768, lg 1024, xl 1280, equal to Astralis's 40/48/64/80 rem at the
  default font size. All five must be given (Breakpoints page).
- **Grid v2 is now `Grid`**: `<Grid container columns spacing>` and
  `<Grid size={{ xs, lg }}>`; the old one is `GridLegacy` (Grid and v7 upgrade
  pages). Responsive `columns` and `size` handled the 5-column dress-style grid
  and the 2-to-5-column footer directly.
- **`Stack` spacing is margins** on the children unless `useFlexGap` is set. A
  child hidden with `display: none` that comes first still makes the next
  child a non-first child, so the logo got a stray 16 px margin on desktop
  until `useFlexGap` was added.
- **IconButton keeps its padding** when you size it with `sx`: a 28 px button
  with the default 8 px padding squeezes a 16 px icon to 10 px. `p: 0` fixes it.

## 3. Motion

- No ready-made entrance or scroll-reveal animations. `theme.transitions`
  covers durations and easings for MUI's own transitions (Transitions page).
- Keyframes: `keyframes` from Emotion works inside client code, but
  `@mui/material/styles` cannot be called from a Server Component, so the
  shop declares `@keyframes` once in `MuiCssBaseline.styleOverrides` and names
  them in plain `sx` objects. Scroll reveals are hand-written
  `animationTimeline: "view()"` rules, as in the Chakra app.
- **Reduced motion is not handled**: no docs page read mentions
  `prefers-reduced-motion`, and the ripple, Menu grow and Drawer slide run
  regardless. The shop adds one global rule in `CssBaseline` that shortens all
  animations and transitions under `reduce`, and wraps its own animations in
  `@media (prefers-reduced-motion: no-preference)`. Astralis declares every
  animation inside that query and a build gate checks it.
- Hover lifts are ordinary `sx` (`"&:hover": { transform }`); Astralis has
  `hoverable` on Card.

## 4. Components that mattered for the shop

| Need | MUI | Astralis |
|---|---|---|
| Carousel | **None.** Built with a CSS scroll-snap list and two IconButtons (about 40 lines); wraps at the ends instead of looping seamlessly | `Carousel` with responsive `slidesPerView`, `loop` |
| Next.js links | Once, in the theme: `MuiButtonBase.defaultProps.LinkComponent` and `MuiLink.defaultProps.component` set to `next/link`; then `href` on any Button, IconButton or Link routes client-side | `as={NextLink}` on each one (13 in the shop; logged in `reports/astralis-api-updates.md`) |
| Image | **None.** `CardMedia component="img"` inside a `Card`, `Box component="img"` elsewhere, or `next/image` | `Image` (placeholder, `as={NextImage}`) |
| Rating | `Rating` with `precision={0.5}`, `readOnly`; default empty star is an outline, so a filled star is set as `icon`/`emptyIcon` in the theme | `Rating`, solid empty stars |
| Stat | None; two Typography elements in a `dl` | `Stat` |
| Menu | `Menu` + `MenuItem` with an `anchorEl` held in state (client component) | `Menu` compound, no state to hold |
| Drawer | `Drawer` with `open` state, no header parts | `Drawer` compound with Header, Title, CloseButton |
| Search input | `InputBase` + `InputAdornment` | `InputGroup` `prefix` |
| Discount pill | `Chip`, with a theme variant for the soft colour | `Badge variant="subtle"` |
| Scroll row | `Stack` with `overflowX` and hidden-scrollbar rules | `ScrollArea hideScrollbar` |

## 5. Where MUI was easier or harder than Astralis

Easier:
- Setting the link component once in the theme.
- Any CSS at all through `sx` (`scrollSnapType`, `animationTimeline`, nested
  selectors) without leaving the component.
- Theme-level default props and named variants (`soft` Chip, `logo` text).

Harder:
- No Carousel, Image, Stat or scroll area: four pieces hand-built or composed.
- Menu and Drawer need state, so `main-nav` and `mobile-nav` are client
  components; in Astralis only the compound parts that need it hydrate.
- Every MUI component hydrates, plus Emotion's runtime and the theme.
- Numeric `sx` units differ per property (spacing x8, radius x8, font size px).
- Reduced motion has to be added by hand.
- MUI's defaults (8 px spacing, 14 px base, Roboto, uppercase buttons,
  elevation, ripple) are Material Design; matching another design means
  overriding them in the theme.

Size of the code (non-empty lines in `src`, without data, icons and fonts):
Astralis 870, Chakra 1,098, MUI 1,252. Files with `'use client'`: Astralis 4,
Chakra 8, MUI 6 (but every MUI component is a client component inside).

## 6. Measured

`pnpm bench:shop` measures all three apps. First run, 22 Nov 2026, Astralis
on the published 0.10.0 (not kept in `results/`; re-measure after the next
publish):

| Desktop 1440 | JS kB | Script ms | Main thread ms | Blocking ms | First paint ms | Largest paint ms |
|---|---|---|---|---|---|---|
| Astralis | 183 | 73 | 451 | 5 | 144 | 244 |
| Chakra | 272 | 276 | 683 | 69 | 228 | 412 |
| MUI | 220 | 122 | 447 | 38 | 192 | 192 |

| Phone 390, CPU 4x, slow 4G | JS kB | Script ms | Main thread ms | Blocking ms | First paint ms | Largest paint ms |
|---|---|---|---|---|---|---|
| Astralis | 183 | 315 | 4591 | 143 | 1652 | 4568 |
| Chakra | 272 | 1361 | 3965 | 507 | 868 | 5456 |
| MUI | 220 | 626 | 2642 | 635 | 1440 | 4996 |

MUI sends 37 kB more JavaScript than Astralis and twice the script time, with
the most blocking time on the phone; its CSS column is near zero because
Emotion puts the styles in the HTML. Astralis's phone first paint and
main-thread time are items 1 to 3 in `reports/astralis-api-updates.md`
(2 and 3 are fixed on astralis-ui `main`, unpublished).
