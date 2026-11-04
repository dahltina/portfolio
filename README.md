# Tina Dahl portfolio

A static Astro portfolio. Existing `.html` routes are retained, including the
unfeatured Rainy Days and BT Pomaire pages.

## Development

Use Node.js 22.23.4+ (Node.js 24 LTS recommended).

```sh
npm install
npm run dev
```

When you want to validate or publish:

```sh
npm run build
npm run check:links
npm run preview
```

Deploy `dist/` to static hosting. No application server is required.

## Where to make changes

- `src/data/projects.json`: the single source of project content, links, galleries,
  preview images and featured status. Array order controls the homepage order.
- `src/data/projects.ts`: lookup and list helpers, derived from that content.
- `src/types/projects.ts`: shared content types.
- `src/pages/`: route files selecting a project, plus the home and About content.
- `src/layouts/ProjectLayout.astro`: the shared layout for every project.
- `src/layouts/BaseLayout.astro`: shared document, header, footer and scripts.
- `src/components/`: shared project facts, media, galleries, logo grids, palettes,
  slideshows, navigation and project lists.
- `src/styles/`: all stylesheet rules. There are no Astro `<style>` blocks.
- `public/assets/`: images, videos, icons and fonts.
- `public/js/main.js`: the cursor, hover previews and homepage animation.

## Styles

`BaseLayout` imports `src/styles/main.css` once. That file imports:

- `base.css`: design variables, font, reset, type scale and utilities.
- `layout.css`: navigation, header, footer and social links.
- `components/cursor.css`: custom cursor.
- `components/project-list.css`: project lists and responsive hover previews.
- `components/gallery.css`: galleries, logo panels, colour palettes and slideshows.
- `pages/home.css`, `pages/about.css`, `pages/project.css`: page layout rules.

Change `--media-radius` or `--grid-gap` in `base.css` to update shared 12px corners
and grid spacing. Full-bleed project heroes intentionally have square corners.
Hover previews preserve their aspect ratio within 420px width and half the viewport height.

## Gallery variants

Each project section declares its layout instead of overriding component CSS by slug:

- `grid`: regular responsive gallery.
- `three`: three columns on desktop.
- `staggered`: offset two-column layout used by Holidaze and Nomadlife.
- `stacked`: two images beside one tall image, used for ROM print and signage.
- `square`: uniform 1:1 tiles, used by NTR•BTY.
- `portrait`: full-content-width 2:3 tiles, used by Tina Dahl.
- `specimen`: uniform 4:5 tiles, used by BT Bjørvika.
- `logos`: four logo/button panels on desktop.
- `palette`: colour swatches with names only.

Gallery videos have `autoplay: true`, are muted, loop, and use first-frame posters.
The BT Bjørvika slideshows contain four frames shown for one second each; the final
two-image animation repeats its pair. Reduced-motion preferences show the first frame.

Use `featured: false` for accessible project URLs omitted from the homepage and
the default related-project list. `relatedSlugs` can select a custom related list.
Inline background colours are content data; all styling rules live in `src/styles/`.
