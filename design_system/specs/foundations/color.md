# Color

## Principle

ELEVO's two brand primaries, Malva `#b882e8` and Roxo `#2f1533`, swap roles depending on surface brightness instead of one fixed "primary" hex. Malva pops on dark (Roxo) surfaces; Roxo reads on light (Cinza) surfaces. This is documented brand behavior (Manual de Identidade Visual, p.29-30 shows both pairings as the only approved high-contrast combos) - not a design system invention.

Laranja `#ff4817` is a restrained secondary accent: one highlight per composition, never a full-section background. Cinza `#edeae5` and Grafite `#0f0f0f` round out the palette as light/dark neutrals. Success/warning/error are auxiliary tokens the brand manual does not define - they exist only for form and feedback states, never for decoration.

## Token Families

- `--color-primary`: role-swap accent (Malva on dark, Roxo on light) - see `tokens/color-tokens.md`
- `--color-secondary`: Laranja, always
- `--color-neutral-50` through `--color-neutral-900`: warm gray ramp anchored by Cinza (100) and Grafite (900)
- `--color-success` / `--color-warning` / `--color-error`: auxiliary, form/feedback only
- `--surface-primary` / `--surface-elevated`: background layering, theme-dependent

## Usage Rules

- Never use Malva and Roxo as competing CTAs in the same section. Pick the one that matches the section's surface brightness.
- Laranja never fills a card or section background - chip, underline, or icon only.
- Photography is always black and white. Color lives in the surrounding UI, never applied to the photo itself.
- Max 3 colors per composition (brand rule): the primary/secondary pair plus at most one more (a neutral or Laranja accent).
- Success/warning/error appear only inside form validation and system feedback - never as brand decoration.

## Do Not

- Do not use raw hex values in component code. Every color resolves to a `var(--color-*)` token.
- Do not invert dark theme to build light theme. Light theme redefines `--color-primary` and `--color-text` explicitly (see `tokens.css` `[data-theme="light"]`).
- Do not introduce a new accent color without updating this file and `tokens/color-tokens.md` first.
- Do not use Laranja for anything resembling "danger" - that's `--color-error`, a distinct red.

## Cross-References

- Uses: `tokens/color-tokens.md`
- Used by: `atoms/button.md`, `molecules/form.md`, `organisms/hero.md`, `patterns/content-flow.md`
