# Chakra UI v3: how it works, next to Astralis

Read from Chakra's own full documentation (`chakra-ui.com/llms-full.txt`,
83,263 lines, fetched 21 Nov 2026) for `@chakra-ui/react` 3.38.0. Every claim
below comes from that text; the section is named so it can be checked.

## 1. Architecture

| | Chakra v3 | Astralis 0.9 |
|---|---|---|
| How CSS is made | **CSS-in-JS at runtime** (Emotion). Style props become atomic classes generated in the browser and on the server per render ("Recipes": "CSS-in-JS with better performance") | **Precompiled stylesheet** (`styles.css`, Tailwind as a build-time compiler). Props pick existing classes or set a CSS variable |
| Server Components | "Chakra UI components are **client components** because they rely on `useState`, `useRef` and `useContext`" (Server Components guide). They render on the server but every one hydrates | 37 of 85 components send **no** JavaScript; `"use client"` only where a component is interactive |
| Recipes / `chakra()` factory | Need `"use client"` ("RSC Tip" in Recipes; Server Components guide) | CVA recipes are plain functions; no client boundary needed |
| Design system engine | Panda CSS's API: `defineConfig` → `createSystem(defaultConfig, config)` → `<ChakraProvider value={system}>` (Theming overview) | `AstralisProvider` with a `tokens` seed; token CSS generated from `token-spec.ts` |
| Cascade layers | `@layer reset, base, tokens, recipes` (Cascade Layers) | `@layer theme, base, components, utilities, channels` |
| Reset | Global preflight, on by default, can be turned off (`preflight: false`) | Scoped to the `.astralis` wrapper; never touches the host page |
| Dark mode | Through the `next-themes` library, added by the CLI snippet (Dark Mode) | Built in: provider toggles `.astralis-dark`; `ThemeScript` prevents the flash |

## 2. Styling API

- **Style props on everything**, including the full CSS set: `bg`, `p`, `transform`,
  `transition`, `animation`, `backdropFilter`... (Style props section lists
  Background, Border, Effects, Filters, Transforms, Transitions...).
  Astralis allows a curated set, and recipe components take placement only.
- **Conditions as props**: `_hover`, `_focus`, `_active`, `_disabled`, `_first`,
  `_before`, `_placeholder`, `_dark`, `_motionReduce`, `_motionSafe`, `_open`,
  `_closed`, `_groupHover` (needs a `group` class on the parent), `_peerHover`,
  `_expanded` and more; nestable (Conditional Styles). Astralis has `hover`,
  `focusVisible`, `active` on the Box family only.
- **`css` prop** for anything else, arbitrary selectors and at-rules
  (`@container`, `@supports`).
- **Responsive**: object `{ base, md }` **and** array syntax; ranges `mdToXl`,
  `lgOnly`, `smDown`; `hideFrom` / `hideBelow` (Responsive Design). Default
  breakpoints sm 30rem, md 48, lg 62, xl 80, 2xl 96 (Astralis: 40/48/64/80, no 2xl).
- **Raw values** are allowed everywhere; tokens are optional.
- **Colour opacity modifier**: `bg="red.300/40"` via `color-mix`.
- **Virtual colour**: `colorPalette="blue"` + `bg="colorPalette.500"`. The same
  idea as Astralis's accent channel (`colorScheme`), but open to any style prop.
- **Compositions** defined in the theme: `textStyles`, `layerStyles`,
  `animationStyles`, used as `textStyle="..."` etc. Needs the CLI `typegen` step
  for types. Astralis has no named text/layer styles.
- **Focus ring props**: `focusRing`, `focusVisibleRing`, `focusRingColor`,
  `focusRingWidth`, `focusRingStyle`.
- **Polymorphism**: `as` (types not inferred: Composition warns) and `asChild`
  (Radix-style slot). Astralis: `as` with inferred props, no `asChild`.

## 3. Motion

- Keyframes built in: `fade-in/out`, `slide-from-*`, `slide-to-*`,
  `scale-in/out`, `spin`, `pulse`, `ping`, `bounce`, `expand-/collapse-height`,
  marquee... used as `animation="fade-in 1s"` (Animations tokens).
- Duration tokens 50ms to 500ms (`fastest`..`slowest`); Astralis 200/400/700.
- `animationStyle` presets (`slide-fade-in`, ...), definable with
  `defineAnimationStyles`, and they include **animation range and timeline**
  properties (Animation Styles), so scroll-driven animation is expressible,
  but there is **no ready-made scroll reveal**. Astralis has `reveal`.
- **Reduced motion is not automatic**: "The built-in component animations play
  regardless of the user's `prefers-reduced-motion` setting"; the docs give a
  `globalCss` rule to add yourself (Animation guide). Astralis declares every
  animation inside `prefers-reduced-motion: no-preference` and a build gate
  enforces it.
- Hover lifts, scale and transitions are plain style props
  (`_hover={{ transform: "translateY(-4px)" }}`, `transition`). Astralis cannot
  change `transform` on hover (logged).

## 4. Components that matter for the shop

| Need | Chakra | Astralis |
|---|---|---|
| Carousel | `Carousel.Root` with `slidesPerPage`, `slidesPerMove`, `spacing`, `loop`, `autoplay`, mouse drag, thumbnails (Carousel). `slidesPerPage` is a single number | `Carousel` with `slidesPerView`, `slideGap`; also a single number |
| Responsive value in JS | `useBreakpointValue` (client hook) | none exported (logged) |
| Next.js image | `<Image asChild><NextImage … /></Image>` (Image → "Next.js Image") | no `as`/`asChild`; and it server-renders its placeholder (bug 2c) |
| Scroll container | `ScrollArea` with variants, sizes, scroll shadow, thumb styling, virtualisation | `ScrollArea`, zero JS, `hideScrollbar` |
| Rating | `RatingGroup` with half stars, sizes, colour palettes | `Rating`, read-only halves |
| Input adornments | `InputGroup` with `startElement`/`endElement`, addons; inputs take `rounded` | `InputGroup` `prefix`/`suffix`; no `rounded` (logged) |
| Loading | `Skeleton` (`pulse`/`shine`, `asChild`, `loading`) | `Skeleton`; `Image` has its own placeholder |
| Whole-card link | `LinkOverlay` (works with `next/link` via `asChild`) | a `Box as={NextLink}` around the card |

## 5. Tooling

- CLI: `snippet add` (copies component wrappers into your project, such as
  `provider`, `color-mode`, `toaster`), `typegen` (types for your theme
  tokens), `eject` (copy tokens and recipes into the project).
- An MCP server and AI skills exist (MCP Server, AI Skills sections), plus the
  llms.txt files. Astralis: MCP server, CLI `validate` against a machine spec,
  DevTools overlay.
- No equivalent of Astralis's validator: Chakra's props are type-checked, but
  a token that does not exist or a style prop a component ignores is not
  reported.

## 6. What to measure when the page is built

1. JavaScript sent per page and hydration cost (Chakra: every component is a
   client component plus Emotion's runtime; Astralis: precompiled CSS, many
   server components).
2. Time to first paint and largest paint (Astralis's `Image` bug 2c will hurt
   until fixed; measure after the fix too).
3. Reduced motion handled by default or not.
4. How much code each needed for the same page, and how many workarounds.
5. Styling freedom: hover transforms, pill inputs, responsive values in JS.
