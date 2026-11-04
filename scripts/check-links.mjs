import assert from 'node:assert/strict';
import { readdir, readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// Validate the built site's real destinations, including cross-page fragments.
const output = fileURLToPath(new URL('../dist/', import.meta.url));
const pages = (await readdir(output)).filter((name) => name.endsWith('.html'));
assert(pages.length > 0, 'Run npm run build before checking links.');
let checked = 0;
for (const page of pages) {
  const html = await readFile(path.join(output, page), 'utf8');
  const base = new URL(page, 'https://portfolio.invalid/');
  for (const [, href] of html.matchAll(/<a\b[^>]*\bhref="([^"]*)"/g)) {
    const destination = new URL(href.replaceAll('&amp;', '&'), base);
    if (destination.origin !== base.origin) continue;
    let filename = decodeURIComponent(destination.pathname).replace(/^\//, '');
    if (!filename || filename.endsWith('/')) filename += 'index.html';
    const target = path.join(output, filename);
    assert((await stat(target)).isFile(), `${page}: missing link destination ${href}`);
    if (destination.hash) {
      const targetHtml = await readFile(target, 'utf8');
      const fragment = decodeURIComponent(destination.hash.slice(1));
      const ids = [...targetHtml.matchAll(/\bid="([^"]*)"/g)].map((match) => match[1]);
      assert(ids.includes(fragment), `${page}: missing anchor ${href}`);
    }
    checked++;
  }
}
console.log(`Checked ${checked} internal links and anchors across ${pages.length} pages.`);
