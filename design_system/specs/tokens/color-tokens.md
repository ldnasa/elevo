# Color Tokens

Full resolved values. See `token-reference.md` for usage rules and `foundations/color.md` for the reasoning.

## Primitives (Layer 1 - exact brand hex, never edited)

```css
--primitive-malva: #b882e8;
--primitive-roxo: #2f1533;
--primitive-cinza: #edeae5;
--primitive-laranja: #ff4817;
--primitive-grafite: #0f0f0f;

--primitive-neutral-50: #f7f5f2;
--primitive-neutral-100: #edeae5;
--primitive-neutral-200: #ddd8d0;
--primitive-neutral-300: #c3bcb0;
--primitive-neutral-400: #a89f91;
--primitive-neutral-500: #8b8175;
--primitive-neutral-600: #6f665c;
--primitive-neutral-700: #4a4340;
--primitive-neutral-800: #2b2724;
--primitive-neutral-900: #0f0f0f;

--primitive-success: #5b9e73;
--primitive-warning: #d9a544;
--primitive-error: #d64545;
```

## Semantic Aliases (Layer 2 - what components use)

Dark theme (default):
```css
--color-primary: var(--primitive-malva);
--color-secondary: var(--primitive-laranja);
--color-text: #edeae5;
--color-text-on-primary: var(--primitive-roxo);
--surface-primary: #2f1533;
--surface-elevated: #3d1c44;
```

Light theme (`[data-theme="light"]` override):
```css
--color-primary: var(--primitive-roxo);
--color-text: #2f1533;
--color-text-on-primary: var(--primitive-cinza);
--surface-primary: #edeae5;
--surface-elevated: #ffffff;
```

## Cross-References

- Used by: `token-reference.md`, `foundations/color.md`
