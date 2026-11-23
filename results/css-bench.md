# CSS bench: the stylesheets of libraries that ship precompiled CSS

Measured 2026-11-23. The libraries are those grouped as "precompiled CSS" in the literature review, plus Astralis.
Method: [css-bench/README.md](../css-bench/README.md).

## The whole published stylesheet

| Library      | Version | As published, kB | Minified, kB | gzip, kB | brotli, kB |
| ------------ | ------- | ---------------: | -----------: | -------: | ---------: |
| Mantine      | 9.8.2   |            293.4 |    **246.5** | **35.4** |       29.1 |
| Astralis     | 0.11.0  |            503.5 |        502.2 |     44.4 |   **24.3** |
| Astryx       | 0.7.17  |            336.8 |        310.3 |     47.6 |       38.7 |
| Radix Themes | 3.3.0   |            793.6 |        666.0 |     78.5 |       48.0 |
| Carbon       | 1.120.0 |           1355.1 |       1183.8 |    108.2 |       75.4 |

## CSS one page loads (simple bench)

| Library      | CSS files | Linked CSS, kB | Linked CSS gzip, kB | CSS inside the HTML, kB |
| ------------ | --------: | -------------: | ------------------: | ----------------------: |
| Astralis     |         1 |          503.1 |                44.4 |                     0.0 |
| shadcn/ui    |         1 |           15.9 |                 3.9 |                     0.0 |
| Radix Themes |         1 |          668.9 |                78.6 |                     0.2 |
| MUI          |         0 |            0.0 |                 0.0 |                    33.7 |
| Chakra UI    |         0 |            0.0 |                 0.0 |                    73.7 |
| Bare Next.js |         0 |            0.0 |                 0.0 |                     0.0 |

## What each column means

- **As published**: The full stylesheet file(s) as the package ships them. Some ship minified, some do not.
- **Minified**: The same CSS minified with one tool (lightningcss), so every library is compared on equal terms.
- **gzip, brotli**: The minified CSS compressed the way servers send it (gzip level 9, brotli quality 11).
- **Linked CSS**: The stylesheets the simple bench's page links to, as the browser downloads them before first paint.
- **CSS inside the HTML**: Styles written straight into the page, which is how runtime CSS-in-JS libraries (MUI, Chakra UI) deliver theirs.
- **kB**: Kilobytes. Lower is better; the best value in each column is highlighted.
