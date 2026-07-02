# Typography

## Principle

One family, Hanken Grotesk, covers both display and UI roles. Hierarchy is built by percentage of the title size (brand rule, Manual de Identidade Visual p.33): title = 100%, subtitle = 40%, body = 30%, detail = 20%. Titles use sentence case (capital first letter, rest lowercase) - never all-caps, never title case. There is no display/UI font pairing to choose between; the discipline is in weight and the percentage scale, not in mixing families.

JetBrains Mono exists only inside this design system's own workbench (showcase eyebrows, meta labels, spec files). It is a documentation convention, not a brand rule, and must never appear on the live ELEVO site.

## Token Families

- `--font-display`, `--font-ui`: both resolve to Hanken Grotesk
- `--font-mono`: JetBrains Mono, workbench-only
- `--text-hero` (100%), `--text-h2` (40%), `--text-h3`, `--text-body` (30%), `--text-small` (20%), `--text-meta`
- Weights loaded: 400, 500, 600, 700, 800

## Usage Rules

- Titles (h1/h2/h3) use sentence case (capital first letter, rest lowercase), authored directly in the markup - not forced via `text-transform`. Never all-caps, never title case.
- Use weight 800 for hero/section titles, 700 for card-level h3, 500 for UI/body emphasis, 400 for long-form body copy.
- Body copy targets 17px / 1.62 line-height minimum for readability at arm's length (this is a strategy-consulting audience, not a dense dashboard).
- Never load a font weight that isn't used somewhere in the implementation.

## Do Not

- Do not introduce a second typeface family "for contrast." Hanken Grotesk carries the full range via weight.
- Do not set a title in uppercase or title case under any circumstance.
- Do not use `--font-mono` in any component that ships to the live site - it is a workbench-only convention.
- Do not hardcode font sizes; always resolve through the percentage-scale tokens.

## Cross-References

- Uses: `tokens/typography-tokens.md`
- Used by: `organisms/hero.md`, `patterns/content-flow.md`
