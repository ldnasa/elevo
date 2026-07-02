---
name: Empty State
category: molecule
status: ready
source: design_system/showcase.html#components
---

# Empty State

## Overview

Used wherever content is genuinely incomplete right now - most concretely, "Depoimento 4" in `assets/depoimentos/PRINCIPAIS DEPOIMENTOS_.docx` is marked "ainda não tenho." Rather than showing a broken card or a silent gap, an empty state explains what's missing and what happens next.

## Anatomy

- `.cut-card` container (state-card treatment)
- Icon (Lucide, neutral tone - not an error color)
- Title (what's missing)
- Description (why, and what happens when it arrives)

## Tokens Used

- `--surface-elevated`, `--border-subtle`
- `--color-text-secondary`
- `foundations/shape.md` cut-card treatment

## States

This component IS a state representation. It has no further sub-states beyond appearing or not appearing (content present → render the real card instead).

## Code Example

```html
<article class="state-card cut-card">
  <svg><use href="#i-image"/></svg>
  <strong>Depoimento a caminho</strong>
  <p>Este espaço está reservado para o quarto depoimento, ainda não recebido do cliente.</p>
</article>
```

## Do Not

- Do not leave a silent gap in a grid (e.g. 3 testimonial cards rendering where 4 were planned) - render an explicit empty state instead.
- Do not use `--color-error` styling for a "not yet provided" gap - that's a neutral/informational state, not a failure.

## Cross-References

- Uses: `foundations/shape.md`, `tokens/token-reference.md`
- Used by: `patterns/content-flow.md` (Seção 4 - Empresas que elevaram o nível)
