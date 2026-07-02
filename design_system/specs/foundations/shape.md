# Shape

## Principle

ELEVO has one signature shape: a rectangle with three soft-rounded corners and one corner cut off by a sharp diagonal. It comes directly from the brand's own applied system (`my_brand_assets/formas-exemplo-elevo/`), where two modules interlock along that diagonal seam. This shape is reserved for cards and media modules - cards, testimonial blocks, media slots, state cards. Buttons, pills, inputs and badges use plain soft rounding and never get cut.

## Token Families

- `--radius-sm` (6px), `--radius-md` (10px), `--radius-lg` (20px), `--radius-xl` (28px): soft-rounding scale for controls and the 3 uncut corners of a card
- `--radius-pill` (999px): buttons, badges, chips, inputs
- `--shape-cut` (26px): the signature diagonal cut size for standard cards
- `--shape-cut-lg` (56px): larger cut for hero-scale media modules

## Implementation

A `.cut-card` utility applies `border-radius: var(--radius-lg)` plus a `clip-path` that removes one corner with a straight diagonal line, sized by `--shape-cut`. Because the clip-path's untouched corners sit exactly on the box's mathematical corners (outside the rounded curve), the other three corners stay visibly rounded - only the specified corner gets the sharp cut. A `--tl`/default modifier flips which corner is cut, so adjacent modules can alternate and interlock the way the brand's own compositions do.

## Usage Rules

- Apply `.cut-card` to: rule tiles, swatches, state cards, media slots, testimonial cards, client-logo tiles, BrandOS/dashboard-preview panels.
- Never apply the cut shape to: buttons, pills, inputs, selects, badges, chips, nav items.
- Alternate the cut corner (default vs `--tl`) between neighboring cards in a grid to create the interlocking rhythm shown in the brand manual - don't cut every card in the same corner.
- Use `--shape-cut-lg` only for large hero-scale or dashboard-preview panels, not for small grid cards.

## Do Not

- Do not use a plain `border-radius` rounded rectangle for a hero card, testimonial card, or media module - that's the generic pattern this brand explicitly avoids.
- Do not cut a button, pill, or input corner - the brand's own applications (business cards, stationery, tote bag) always keep controls soft-rounded.
- Do not add drop shadows, bevels or glow effects to the cut edge itself; the shadow tokens apply to the whole shape, not the seam.

## Cross-References

- Uses: `tokens/token-reference.md`
- Used by: `atoms/button.md` (what NOT to do), `organisms/hero.md`, `patterns/content-flow.md`
