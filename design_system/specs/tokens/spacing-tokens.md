# Spacing Tokens

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 24px;
--space-6: 32px;
--space-7: 48px;

--space-section-y: clamp(84px, 8vw, 132px);
--space-section-x: clamp(32px, 5.8vw, 92px);
```

Component internals use `--space-1` through `--space-7`. Section rhythm uses `--space-section-y`/`x` exclusively - never a raw pixel value between major page sections.

Brand grid module (page/composition layout, not a CSS token): longest side of the artboard ÷ 16. See `foundations/spacing.md`.
