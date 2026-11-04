# Portfolio 2023

A static Astro portfolio with expanded case studies. The original visual style,
classic JavaScript, and existing `.html` URLs are preserved.

## Development

Use Node.js 22.23.4+ (Node.js 24 LTS recommended).

```sh
npm install
npm run dev
```

```sh
npm run build
npm run check:links
npm run preview
```

Deploy the generated `dist/` folder to static hosting. No application server is needed.

## Structure

- `src/pages/`: homepage, about page, seven featured case studies, and legacy project URLs.
- `src/layouts/BaseLayout.astro`: shared metadata, navigation, footer, and scripts.
- `src/layouts/CaseStudyLayout.astro`: responsive case study layout with project facts, galleries, videos, logo panels, and colour palettes.
- `src/data/case-studies.json`: featured project content, image dimensions, website URLs, and GitHub links. Each section can contain `images` or `colors`; use `layout: "logos"` for padded logo panels. Videos use `type: "video"` and a `poster`.
- `src/data/home-projects.json`: homepage project order, labels, and hover previews.
- `src/layouts/ProjectLayout.astro` and `src/data/projects.json`: retained for the legacy Rainy Days and BT Pomaire pages.
- `src/components/`: header, footer, social links, and project lists.
- `src/data/social-links.json`: shared social links and icons.
- `public/assets/images/projects/`: assets copied from the local `naiv-agency` project. No runtime dependency on that checkout.
- `public/css/style.css`: original global styles plus spacing for the longer homepage list. Case study layout rules are scoped to `CaseStudyLayout.astro`.

## Project content

The featured lineup is ROM Eiendomsmegling, Tina Dahl, BT Bjørvika, Holidaze,
NTR•BTY, and Nomadlife. Original website project URLs
are retained. Rainy Days and BT Pomaire remain accessible through their existing
URLs but are no longer featured. Case study copy is in English, adapted from Naiv.

Videos have native playback controls and load on demand. Image dimensions reserve
space while lazy-loaded galleries arrive. Type specimen variations are displayed
as still images so every variation is accessible without automatic animation.

The Projects navigation always points to the home page project section.
Run `npm run check:links` after building to verify every internal link and anchor.
