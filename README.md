# Portfolio 2023

The original portfolio migrated to a static Astro site. Text, images, styling,
classic JavaScript, and the existing `.html` URLs are preserved.

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

- `src/pages/`: the home, about, and six project pages. Project descriptions remain HTML here.
- `src/layouts/BaseLayout.astro`: shared document metadata, navigation, footer, and scripts.
- `src/layouts/ProjectLayout.astro`: shared project page structure.
- `src/components/`: header, footer, social links, and project lists.
- `src/data/projects.json`: project metadata, images, and related project lists.
- `src/data/home-projects.json`: home page project labels, ordering, and preview images.
- `src/data/social-links.json`: shared social links and icons.
- `public/`: the original assets, CSS, and JavaScript, copied without changes.

## Preservation notes

The original GSAP CDN script and classic `main.js` load in the same order.
Inline hover handlers, list markup, external link destinations, image alt text,
and the copyright year are intentionally unchanged in this structural migration.
Known issues in the original content and interactions are left for a separate change.

The Projects navigation always points to the home page project section.
Run `npm run check:links` after building to verify every internal link and anchor.
