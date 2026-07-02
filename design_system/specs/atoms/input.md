---
name: Input
category: atom
status: ready
source: design_system/showcase.html#components
---

# Input

## Overview

Text input and select used in the Seção 9 scheduling form (nome, telefone, e-mail). Soft-rounded, never cut. Contrast and error legibility matter more than decoration here - this is the conversion moment of the page.

## Anatomy

- Label (14px, `--color-text-secondary`)
- Field (input or select)
- Optional helper/error text below the field

## Tokens Used

- `--surface-glass`, `--border-default`
- `--radius-md`
- `--color-error` (error state border/text)
- `--space-3` (label-to-field gap)

## States

- default
- focus-visible: 2px outline `--color-primary`, 3px offset
- filled (no special styling beyond default - do not add a "filled" background shift that competes with focus)
- error: border tinted `--color-error`, helper text switches to `--color-error`, explains what to fix (e.g. "Informe um e-mail completo")
- disabled: opacity .5, `cursor: not-allowed`

## Code Example

```html
<label>
  <span>Telefone / WhatsApp</span>
  <input type="tel" placeholder="(43) 99999-9999" />
</label>
<label class="has-error">
  <span>E-mail</span>
  <input type="email" value="jessica@" />
  <small>Informe um e-mail completo para retornarmos o contato.</small>
</label>
```

## Do Not

- Do not use color alone for the error state - always pair with visible helper text.
- Do not apply the cut-corner shape to any input or select.
- Do not style placeholder text with insufficient contrast (minimum 3:1 against the field background).

## Cross-References

- Uses: `tokens/token-reference.md`, `foundations/accessibility.md`
- Used by: `molecules/form.md`
