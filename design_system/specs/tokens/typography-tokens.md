# Typography Tokens

```css
--font-display: "Hanken Grotesk", -apple-system, BlinkMacSystemFont, sans-serif;
--font-ui: "Hanken Grotesk", -apple-system, BlinkMacSystemFont, sans-serif;
--font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace; /* workbench-only */

--text-hero: clamp(56px, 8vw, 120px);  /* title tier, 100% */
--text-h2: clamp(34px, 4.4vw, 58px);   /* subtitle tier, ~40% */
--text-h3: 22px;
--text-body: 17px;                      /* body tier, ~30% */
--text-small: 14px;                     /* detail tier, ~20% */
--text-meta: 11px;
```

Weights loaded: 400, 500, 600, 700, 800. Titles (`h1`/`h2`/`h3`) use sentence case (capital first letter), authored directly in the markup - never all-caps, never title case.

See `foundations/typography.md` for usage rules and `token-reference.md` for the full cross-family map.
