# Spacing

## Principle

Two systems coexist on purpose: an 8px scale for component internals (buttons, form fields, card padding), and the brand's own modular grid for section/page composition (longest side of the composition divided by 16 - Manual de Identidade Visual p.36-37). Component spacing should feel tight and consistent; section composition should feel like the brand's real layouts, not a generic 12-column grid.

## Token Families

- `--space-1` (4px) through `--space-7` (48px): component-level 8px scale
- `--space-section-y` / `--space-section-x`: fluid section padding, `clamp()`-based
- Brand grid module = longest side of the artboard / 16 (documented for reference, not a CSS token - apply via section max-width and column math when implementing page layout)

## Usage Rules

- Use `--space-5`/`--space-6` between a card's internal elements (icon to title, title to body).
- Use `--space-section-y` between major page sections (hero, seção 1, seção 2, etc.) - never a bare pixel value.
- When laying out a full page section, derive margins from the brand grid formula (side ÷ 16) rather than picking an arbitrary gutter.
- Text blocks inside a card should use 20-50% of the card's area (brand rule for module composition, Manual p.38) - don't let copy overrun a card's cut-corner shape.

## Do Not

- Do not use raw `12px`, `18px`, `40px` etc. in implementation CSS. Use the token or add one if a real gap exists.
- Do not default to a generic 12-column CSS grid for section layout without checking the brand's ÷16 module math first.
- Do not let text fill more than half a card's area when it's paired with a photo or shape - the brand's own compositions never do this.

## Cross-References

- Uses: `tokens/spacing-tokens.md`
- Used by: `patterns/responsive-grid.md`, `patterns/content-flow.md`
