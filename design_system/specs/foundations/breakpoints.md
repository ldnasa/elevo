# Breakpoints

## Principle

Mobile-first, 375px base (per CLAUDE.md). This is a conversion landing page - most traffic arrives from a WhatsApp link or social share on a phone, so the mobile layout is the primary design target, not an afterthought stack of the desktop version.

## Values

| Breakpoint | Width | Layout |
|---|---:|---|
| Base | 375px | Single column, stacked sections |
| Small tablet | 768px | 2-column grids begin (e.g. frentes de solução, cards) |
| Desktop | 1024px | Full multi-column layouts, sticky header nav visible |
| Wide | 1280px | Max content width applied, extra breathing room |

## Usage Rules

- Build and test the mobile (375px) layout first for every section before expanding to desktop.
- No horizontal scroll at any breakpoint.
- The cut-corner card shape must remain legible at 375px width - reduce `--shape-cut` proportionally on small screens rather than keeping a fixed pixel cut that looks oversized.
- Sticky header collapses to a simpler bar (logo + WhatsApp CTA + menu icon) below 768px.

## Do Not

- Do not design desktop-first and "compress" down to mobile - author mobile layout first.
- Do not use a fixed pixel breakpoint outside this table without documenting why.

## Cross-References

- Uses: `foundations/spacing.md`
- Used by: `patterns/responsive-grid.md`
