---
name: Button
category: atom
status: ready
source: design_system/showcase.html#components
---

# Button

## Overview

The single clickable-action shape in the system. Always pill-radius, never the signature cut-corner shape (see `foundations/shape.md`) - buttons stay soft-rounded so the cut corner remains a distinct, recognizable signal reserved for cards and media.

## Anatomy

- Root (pill container)
- Label (Hanken Grotesk, weight 700 for primary/secondary, 500 for tertiary)
- Optional leading or trailing icon (Lucide, 1.75px stroke)

## Tokens Used

- `--color-primary`, `--color-text-on-primary` (primary variant fill/text)
- `--surface-glass` (secondary variant fill)
- `--radius-pill`
- `--space-2` (icon gap), `--space-5` (horizontal padding)
- `--duration-base`, `--ease-out`

## Variants

- **Primary**: filled `--color-primary`, text `--color-text-on-primary`. One per section (Hick's Law - CLAUDE.md UX principle). Used for "Conversar → WhatsApp", "Agendar conversa".
- **Secondary**: glass/outline fill, used for the alternate action ("Ver serviços", "Agendar pelo Google Agenda").
- **Tertiary**: text-only, no border, lowest emphasis ("Ver mais", in-page anchors).

## States

- default
- hover: `translateY(-2px)` + shadow lift, `--duration-base`
- active: `translateY(-1px) scale(.99)`
- focus-visible: 2px outline in `--color-primary`, 3px offset
- disabled: opacity .5, `cursor: not-allowed`, no hover transform

## Code Example

```html
<button class="btn primary">Conversar <svg><use href="#i-message-circle"/></svg></button>
<button class="btn secondary">Agendar <svg><use href="#i-calendar"/></svg></button>
<button class="btn tertiary">Ver serviços</button>
```

## Do Not

- Do not apply `.cut-card` or any clip-path to a button.
- Do not use both primary and secondary as competing CTAs in the same section - pick one primary action.
- Do not use raw hex fills; always resolve through `--color-primary`/`--color-text-on-primary`.

## Cross-References

- Uses: `tokens/token-reference.md`, `foundations/shape.md`, `foundations/motion.md`
- Used by: `organisms/hero.md`, `molecules/form.md`, `patterns/content-flow.md`
