# Token Reference

Master map of every public token in `tokens.css`. An agent implementing UI should look up the token here before writing any hardcoded value.

## Color

| Token | Value (dark) | Value (light) | Layer | Use for | Do not use for |
|---|---|---|---|---|---|
| `--color-primary` | `#b882e8` (Malva) | `#2f1533` (Roxo) | alias | Primary CTA, active nav state, key highlight | Body text, large filled backgrounds |
| `--color-secondary` | `#ff4817` (Laranja) | `#ff4817` | alias | One accent per composition: chip, underline, icon | Section backgrounds, more than one use per composition |
| `--color-text` | `#edeae5` | `#2f1533` | alias | Body copy, headings | Buttons (use `--color-text-on-primary`) |
| `--color-text-on-primary` | `#2f1533` | `#edeae5` | alias | Text/icon on top of `--color-primary` fills | Anywhere else |
| `--surface-primary` | `#2f1533` | `#edeae5` | alias | Page/section background | Card foreground content |
| `--surface-elevated` | `#3d1c44` | `#ffffff` | alias | Cards, panels, modals | Full-page background |
| `--color-neutral-100`...`900` | see `color-tokens.md` | same | primitive | Borders, placeholders, secondary icons | Brand-identity elements (use primary/secondary) |
| `--color-success` / `--color-warning` / `--color-error` | see `color-tokens.md` | same | alias | Form validation, system feedback only | Any decorative or brand use |

## Typography

| Token | Value | Use for | Do not use for |
|---|---|---|---|
| `--font-display` / `--font-ui` | Hanken Grotesk | All headings and body text | - |
| `--font-mono` | JetBrains Mono | This workbench's own meta labels only | Anything shipped to the live site |
| `--text-hero` | clamp(56px, 8vw, 120px) | Page/section h1 (title tier, 100%) | Subheads |
| `--text-h2` | clamp(34px, 4.4vw, 58px) | Section h2 (subtitle tier, ~40%) | Body |
| `--text-body` | 17px | Paragraphs (body tier, ~30%) | Headings |
| `--text-small` | 14px | Captions, helper text (detail tier, ~20%) | Body copy |

## Spacing

| Token | Value | Use for |
|---|---:|---|
| `--space-1`...`--space-4` | 4-16px | Icon-to-label gaps, tight internal padding |
| `--space-5`/`--space-6` | 24/32px | Card internal padding, control gaps |
| `--space-7` | 48px | Large internal rhythm inside a section |
| `--space-section-y`/`x` | fluid clamp | Between/around major page sections only |

## Shape

| Token | Value | Use for | Do not use for |
|---|---:|---|---|
| `--radius-sm`...`--radius-xl` | 6-28px | Soft corners on the 3 uncut sides of a card, on small UI elements | The cut corner itself (that's `--shape-cut`) |
| `--radius-pill` | 999px | Buttons, badges, chips, inputs | Cards, media modules |
| `--shape-cut` | 26px | Signature diagonal card corner cut | Buttons, inputs, pills |
| `--shape-cut-lg` | 56px | Hero-scale media modules, dashboard-preview panels | Small grid cards |

## Motion

| Token | Value | Use for |
|---|---:|---|
| `--duration-fast` | 150ms | Hover/focus micro-feedback |
| `--duration-base` | 200ms | Buttons, small UI transitions |
| `--duration-medium` | 400ms | Scroll reveal, modal open |
| `--duration-slow` | 600ms | Hero-level transitions |
| `--ease-out` | cubic-bezier(.2,.8,.2,1) | Default easing for all of the above |

## Replacement Guidance for Common Hardcoded Values

| If you're about to write | Use instead |
|---|---|
| `border-radius: 12px` (on a card) | `.cut-card` + `var(--radius-lg)` (do not skip the cut shape for key cards) |
| `color: #b882e8` | `var(--color-primary)` (and confirm you're in the correct theme context) |
| `padding: 20px` | `var(--space-5)` |
| `transition: all .2s` | `transition: transform var(--duration-base) var(--ease-out)` |
| `box-shadow: 0 4px 12px rgba(0,0,0,.2)` | `var(--shadow-card)` |

## Cross-References

- Uses: `tokens.css`, `tokens.dtcg.json`
- Used by: every spec in `atoms/`, `molecules/`, `organisms/`, `patterns/`
