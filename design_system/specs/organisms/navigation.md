---
name: Navigation (Header)
category: organism
status: ready
source: design_system/showcase.html#top
---

# Navigation - Site Header

## Overview

Fixed top header per the wireframe: logo, 6 nav links (Início, Elevo, Executivos, Solução, Na mídia, Blog), one primary CTA ("Orçamento" → WhatsApp). Below 768px, collapses to logo + WhatsApp icon + hamburger menu.

## Anatomy

- Logo (elevo lowercase wordmark, SVG from `my_brand_assets/elevo-logo/`)
- Nav links (in-page smooth-scroll anchors, active-section highlight)
- Primary CTA button
- Mobile: hamburger toggles a full-screen or slide-down nav panel

## Tokens Used

- `--surface-primary` with glass/blur backdrop when scrolled
- `--color-primary` (active link underline/color)
- `--space-4` (link gaps)
- `atoms/button.md` (CTA)

## States

- default (top of page)
- scrolled (adds `--shadow-card` and glass backdrop for legibility over hero content)
- active link (current section highlighted via IntersectionObserver, same technique as this showcase's own sidebar nav)
- mobile-open (hamburger toggled)

## Do Not

- Do not use more than one primary-styled CTA in the header.
- Do not let the header shrink below 44px tap-target height on mobile.
- Do not apply the cut-corner shape to the header bar itself - it is a persistent chrome element, not a content module.

## Cross-References

- Uses: `atoms/button.md`, `foundations/breakpoints.md`
- Used by: `patterns/content-flow.md`
