# Responsive Grid

## Principle

Mobile-first (375px base). Grids collapse to a single column below tablet width and expand progressively - never the reverse (never author desktop-first and compress).

## Breakpoints

See `foundations/breakpoints.md`: 375 / 768 / 1024 / 1280.

## Rules

- 3-column card grids (frentes, process steps) → 1 column at 375px → 2 columns at 768px → 3 columns at 1024px+.
- Client-logo carousel: horizontal scroll or auto-playing marquee on mobile, static grid on desktop.
- The hero's two-column split (copy + visual) stacks to a single column below 980px, copy first.
- Section max-width follows `--content-max`-equivalent (align with the brand's ÷16 grid module, see `foundations/spacing.md`), not an arbitrary container width.

## Do Not

- Do not use a generic 12-column CSS grid without checking the brand's own ÷16 module math for margins first.
- Do not let a 3-column grid jump straight from 1 to 3 columns - always pass through 2 at tablet width.

## Cross-References

- Uses: `foundations/breakpoints.md`, `foundations/spacing.md`
- Used by: `organisms/section-card.md`
