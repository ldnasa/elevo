# Accessibility

## Principle

The audience is founders and CEOs, often reading on a phone between meetings. Contrast and touch-target size are non-negotiable; nothing about the cut-corner shape system or the gradient backgrounds may compromise legibility.

## Rules

- Text contrast: minimum 4.5:1. UI elements (borders, icons): minimum 3:1.
- Touch targets: minimum 44x44px on mobile (buttons, nav links, form fields already meet this via `--space` tokens).
- Every interactive element is keyboard-reachable with a visible focus ring (`outline: 2px solid var(--color-primary)`, 2-3px offset).
- Heading hierarchy is semantic: exactly one `<h1>` per page, no skipped levels.
- Alt text on every informative image (executive portraits, client logos); empty `alt=""` on purely decorative gradient backgrounds.
- `prefers-reduced-motion: reduce` disables scroll-reveal animation and the hero word-fade, showing final states immediately.
- Icon-only buttons (WhatsApp, calendar CTA icons) always carry an `aria-label`.

## Do Not

- Do not rely on color alone to communicate state (e.g., error fields need an icon/text, not just a red border).
- Do not place body text directly on a gradient or textured background without a solid-color card behind it.
- Do not use Malva text on Cinza background or Roxo text on Roxo-adjacent tones - both fail contrast per the brand manual's own "usos indevidos" examples (p.30).

## Cross-References

- Uses: `foundations/color.md`, `foundations/motion.md`
- Used by: `atoms/button.md`, `molecules/form.md`
