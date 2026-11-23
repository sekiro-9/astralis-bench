# CSS bench

Measures the stylesheets of the React libraries that ship **precompiled CSS**,
the group the literature review compares Astralis with: Mantine, Astryx, Radix
Themes and Carbon. The JavaScript benches show what each library sends as
script; this one shows what the precompiled libraries send as CSS.

## The two measures

1. **The whole published stylesheet.** Each library's full CSS as the package
   ships it (Astryx with its neutral theme, which it needs to render). Only some
   libraries ship it minified, so every file is minified with the same tool
   (lightningcss) and then compressed with gzip (level 9) and brotli
   (quality 11), the way servers send it.
2. **The CSS one page loads.** The stylesheets the simple bench's prerendered
   page links to, plus any CSS written inside the HTML. This is where runtime
   CSS-in-JS libraries (MUI, Chakra UI) show up: they ship no stylesheet and
   write their styles into the page from JavaScript instead. It needs the simple
   bench apps to be built (`pnpm bench:simple`).

## Running

```
pnpm bench:css     # from the repo root
```

The folder installs its own pinned packages (see `package.json`) the first
time. Results are saved to [results/css-bench.md](../results/css-bench.md).

## Reading it fairly

- A full stylesheet is not what every app loads: Mantine, for example, can be
  imported per component. The whole-file figure is the upper bound an app pays
  for the whole library.
- Astralis's stylesheet supports open style values at every breakpoint (any
  colour or size through one class and a CSS variable), while Radix Themes and
  Carbon have closed vocabularies. A bigger file can therefore still be the
  more flexible one.
