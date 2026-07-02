---
name: Hero
category: organism
status: ready
source: design_system/showcase.html#top
---

# Hero (Head)

## Overview

The wireframe's "Head" section: problem + solution stated within 4 seconds (CLAUDE.md Two-Step Conversion principle), the first Peak-End moment. Asymmetric two-column composition - never centered.

## Anatomy

- Eyebrow (optional, small mono/UI label)
- H1 (sentence case, `--text-hero`, states the problem: "O crescimento da sua empresa exige mais do que esforço")
- Lead paragraph (states the solution in one sentence)
- Two CTAs: primary ("Conversar → WhatsApp"), secondary ("Conhecer projeto ↓", anchors to Seção 2)
- Visual-key: B&W executive/founder portrait or the brand's textured malva/laranja gradient, on the opposite side of the split

## Tokens Used

- `--text-hero`, `--font-display` (sentence case, authored)
- `--color-primary`, `--color-text-on-primary` (primary CTA)
- `--space-section-y`/`x`
- `foundations/motion.md` word-fade-up (hero H1 only, once)

## States

- default (as above)
- reduced-motion: word-fade-up skipped, H1 renders fully visible immediately

## Code Example

```html
<section class="hero">
  <div class="hero-content">
    <h1 class="js-hero-title">o crescimento da sua empresa exige mais do que esforço</h1>
    <p class="lead">A ELEVO desenvolve projetos estratégicos para estruturar o crescimento da sua empresa, explorar novas oportunidades e escalar o seu modelo de negócio.</p>
    <div class="hero-actions">
      <a class="btn primary" href="#">Conversar → WhatsApp</a>
      <a class="btn secondary" href="#solucao">Conhecer projeto ↓</a>
    </div>
  </div>
  <div class="hero-visual"><!-- B&W portrait or brand gradient, cut-card treatment --></div>
</section>
```

## Do Not

- Do not use all-caps or title case for the headline - sentence case only (capital first letter, rest lowercase).
- Do not center the hero content - the brand's compositions are always asymmetric (see `my_brand_assets/formas-exemplo-elevo`).
- Do not add a second competing CTA at primary emphasis.
- Do not use a colorized photo in the visual-key slot.

## Cross-References

- Uses: `atoms/button.md`, `foundations/typography.md`, `foundations/motion.md`, `foundations/shape.md`
- Used by: `patterns/content-flow.md`
