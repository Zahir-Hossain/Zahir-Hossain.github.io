# Zahir-Hossain.github.io

Academic portfolio and research website for A. S. M. Jahir Hossain, built for
Master's / PhD graduate applications.

## Structure

The site is a static, multi-page build (no framework, no build step — just
open the files or serve them as-is on GitHub Pages):

- `index.html` — Home: introduction, graduate study interests, a summary
  card for each other page ("Explore the Site"), research highlights, and
  graduate direction.
- `research.html` — Full list of research and projects.
- `publications.html` — Peer-reviewed publication, with an abstract,
  keyword tags, and a copyable BibTeX citation.
- `background.html` — Experience and technical background.
- `assets/` — Every image, icon, and script the site uses (favicon, social
  preview image, thesis thumbnail, stylesheet, script). Nothing image-like
  lives outside this folder.

## Notes

- Light/dark theme preference now respects the visitor's system setting on
  first visit, then persists across page navigation once they toggle it.
  The theme is decided before first paint (a blocking script in `<head>`),
  so there's no flash of the wrong theme.
- Motion is intentionally restrained: a slow orbiting mark in the nav, a
  breathing "photon" in the hero (a small nod to the breathing-soliton
  research described on the Research page), and a single fade-in on each
  page's header. All motion respects `prefers-reduced-motion`.
- Accessibility: skip-to-content link, visible keyboard focus, `aria-current`
  on the active nav link, `aria-hidden` on decorative SVGs, and a print
  stylesheet so the Background page prints as a clean CV.
- SEO: per-page canonical/Open Graph/Twitter tags, a generated social
  preview image (`assets/og-image.png`), a theme-aware favicon, JSON-LD
  (Person, ScholarlyArticle, BreadcrumbList), `sitemap.xml`, and
  `robots.txt`.
- Publications includes a copy-to-clipboard BibTeX citation, and links back
  to the matching entry on the Research page.
- Every page (Home, Research, Publications, Background) has fixed prev/next
  arrows at the vertical middle of the left/right edges, cycling through
  the four pages in order, plus a scroll-to-top button that fades in once
  you've scrolled down.
