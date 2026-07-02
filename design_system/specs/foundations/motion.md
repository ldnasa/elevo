# Motion

## Principle

The brand's own name is a verb of ascent - elevar, avançar de nível. Motion in this system carries that meaning: it reveals hierarchy and confirms progress, it never decorates for its own sake. A scroll reveal should feel like content arriving into place, not a generic fade.

## Token Families

- `--duration-fast` (150ms): hover, focus micro-feedback
- `--duration-base` (200ms): buttons, swatches, small UI changes
- `--duration-medium` (400ms): scroll reveals, modal open
- `--duration-slow` (600ms): hero, page-level transitions
- `--ease-out`, `--ease-in`, `--ease-in-out`: standard easing curves

## Usage Rules

- Scroll reveal: `opacity 0 → 1` + `translateY(18px → 0)`, 80-120ms stagger between siblings, `--duration-medium`.
- Hero H1 only: word-by-word fade-up, once per page load, never repeated on scroll-back.
- Buttons/interactive elements: `transform: translateY(-2px)` on hover plus a shadow shift, `--duration-base`.
- Always respect `prefers-reduced-motion: reduce` - disable autoplay, shrink all durations to near-zero, keep final states visible.

## Do Not

- Do not use `transition: all`. Animate only `transform`, `opacity`, and `box-shadow`.
- Do not animate `width`, `height`, `top`, or `left` - it causes layout thrashing.
- Do not run any animation as an infinite loop without a pause/visibility check.
- Do not add parallax scrolling - it reads as "trying too hard" for this audience (founders, CEOs evaluating a strategy partner, not a consumer product).
- Do not enable the WebGL hero shader unless explicitly requested; it is off by default in this project.

## Cross-References

- Uses: `tokens/motion-tokens.md`
- Used by: `organisms/hero.md`, `patterns/content-flow.md`
