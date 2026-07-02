---
name: Section Card (Frente / Depoimento / Módulo)
category: organism
status: ready
source: design_system/showcase.html#components
---

# Section Card

## Overview

The recurring content unit across most of the page: the three "frentes" cards (Negócio/Mercado/Pessoas, Seção 2), the process-step cards (Seção 6), the testimonial cards (Seção 4), and the media-mention cards (Seção 10). All share the same underlying shape and rhythm - the signature cut-corner card - with different internal content.

## Anatomy

- `.cut-card` container, cut corner alternating between neighbors in a grid
- Eyebrow/label (small, e.g. "Negócio", "Etapa 01 | Pensar")
- Title (h3, sentence case)
- Body copy (max 50% of card area when paired with an image)
- Optional CTA ("Descobrir +") that opens a modal (see wireframe's frente-detail modal) or anchors elsewhere

## Tokens Used

- `--shape-cut`, `--radius-lg`
- `--space-5` (internal padding)
- `--color-primary` (eyebrow/label tint, role-swapped per theme)

## States

- default
- hover (only if the card is itself clickable, e.g. opens a modal): subtle lift, `--duration-base`
- empty: see `molecules/empty-state.md` (used for the 4th testimonial slot)

## Code Example

```html
<article class="cut-card">
  <span class="eyebrow">Negócio</span>
  <h3>transformar potencial em resultado</h3>
  <p>Quando o modelo atual deixa de sustentar o próximo nível, é hora de repensar como sua empresa gera valor, cresce e se diferencia.</p>
  <button class="btn tertiary">Descobrir +</button>
</article>
```

## Do Not

- Do not let every card in a grid cut the same corner - alternate for the interlocking rhythm the brand's own layouts show.
- Do not let body copy exceed roughly half the card's area when an image or icon shares the space.
- Do not stack more than one primary-styled action inside a single card.

## Cross-References

- Uses: `foundations/shape.md`, `foundations/spacing.md`, `molecules/empty-state.md`
- Used by: `patterns/content-flow.md` (Seções 2, 4, 6, 10)
