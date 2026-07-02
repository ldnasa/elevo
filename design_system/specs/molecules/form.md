---
name: Form (Agendamento)
category: molecule
status: ready
source: design_system/showcase.html#components
---

# Form - Agendamento

## Overview

The Seção 9 lead form (nome, telefone, e-mail) is the primary conversion point of the whole page (CLAUDE.md Peak-End principle: hero + this form are the two peak moments). It sits inside a `.cut-card` panel next to the "Agendar pelo Google Agenda" alternate-path panel.

## Anatomy

- `.cut-card` container
- Heading + one-line supporting copy ("Retornamos para marcar a conversa.")
- 3 fields: nome (text), telefone (tel), e-mail (email)
- Primary button: "Enviar contato"
- Success state: checkmark + confirmation copy, replaces the form panel in place (no page navigation)

## Tokens Used

- `--shape-cut`, `--radius-lg` (panel shape)
- `--space-4` (field gaps), `--space-6` (panel padding)
- `--color-error` (validation)
- `atoms/input.md`, `atoms/button.md` tokens

## States

- default (empty form)
- filled (no visual change beyond browser default)
- error: per-field, see `atoms/input.md`
- loading: primary button shows a brief disabled+label-change state while submitting, no full-page spinner
- success: form panel content swaps to a checkmark + "Contato enviado" message, per the wireframe's `#formDone` pattern

## Code Example

```html
<div class="form-panel cut-card">
  <h3>Deixe seu contato</h3>
  <p>Retornamos para marcar a conversa.</p>
  <form>
    <label><span>Nome</span><input required /></label>
    <label><span>Telefone / WhatsApp</span><input type="tel" required /></label>
    <label><span>E-mail</span><input type="email" required /></label>
    <button class="btn primary" type="submit">Enviar contato</button>
  </form>
</div>
```

## Do Not

- Do not navigate away on submit - swap the panel content in place, matching the wireframe's simulated flow.
- Do not validate only on submit; validate on blur so errors surface before the user reaches the end.
- Do not omit the alternate path (WhatsApp / Google Agenda direct link) next to this form - it is a documented fallback, not optional.

## Cross-References

- Uses: `atoms/input.md`, `atoms/button.md`, `foundations/shape.md`
- Used by: `patterns/content-flow.md` (Seção 9)
