# CLAUDE.md - ELEVO (Estúdio de Inovação Estratégica)

## DO THIS FIRST

When opening this folder in Claude Code, invoke the `web-build` skill
(type `/web-build` or "iniciar build"). It will:
1. Validate this handoff manifest
2. Polish the copy (see Copy Source) using `scribe`
3. Build the design system using `design-system-builder`
4. Generate `DESIGN.md` (motion, a11y, microcopy, states, perf, SEO)
5. Implement the site (creative freedom - wireframe is structural only)
6. Cleanup (image compression, dead code, project README)

Never start coding without invoking `web-build` first.

## Project Overview

Conversion-focused landing page for ELEVO, a strategic innovation studio
(rebrand of "Forward / FWD Estratégias Ágeis", 12+ years, Londrina/PR).
It serves validated companies (R$ 1M to R$ 50M, 10 to 200 staff) that hit
a growth ceiling and need to structure, evolve or scale.
Audience: founders, CEOs, managing partners.
Primary goal: generate contacts and booked conversations (via WhatsApp,
possibly in-site scheduling - see Observações Especiais).
Key differentiator: applied innovation that leaves the deck and turns into
execution and real results, with regional proximity. Positioned against
traditional consultancies ("não entregamos projetos para ficar na gaveta").
Brand tone: clear, strategic, constructive. Explorer + Creator archetype.

## Tech Stack

- HTML5 semantic markup
- Tailwind CSS (CDN in dev, optionally built CSS for production)
- Vanilla JavaScript
- Google Fonts (Hanken Grotesk)

House stack. No frameworks, CSS-in-JS, jQuery or Bootstrap without
explicit approval from Caio.

## Brand (official manual in my_brand_assets/)

- Primary: Malva #b882e8, Roxo #2f1533
- Secondary: Cinza #edeae5, Laranja #ff4817, Grafite #0f0f0f
- Type: Hanken Grotesk (titles sentence case - capital first letter, never all-caps; hierarchy by % of title)
- Logo "elevo" lowercase + tagline "Estúdio de Inovação Estratégica"
- Cut/asymmetric shapes, purple/pink/red gradients, B&W photos. Max 3
  colors per composition.

## Handoff Manifest

- `01-debriefing.md` - Context, audience, market, pains, open questions
- `wireframe.html` - Structural wireframe (client structure + copy)
- `CLAUDE.md` - This file
- `my_brand_assets/` - Brand manual, logo, palette, Hanken Grotesk
- `assets/` - Client-provided: client logos, testimonial photos + quotes,
  media mentions (logos + article links)
- `refs/` - Visual references (collect via the descriptive prompt in
  Stitch/MJ/Flux + template galleries) BEFORE building

Copy Source: structure and copy came from the client verbatim (their
site-structure doc), consolidated inside `wireframe.html`. No separate
02-estrutura / 03-copy this round. Treat wireframe copy as a raw draft and
run it through `scribe` before build.

## Wireframe Notice

Information architecture only. Use it to confirm sections and copy
placement. Do NOT copy its layout or visual rhythm (intentionally low-fi
and gray). Build a unique layout on the ELEVO brand system.

## UX Principles (non-negotiable)

- **Two-Step Conversion**: Hero states problem + solution in 4s. Rest of
  page removes specific doubts.
- **Hick**: One primary CTA per section
- **Miller**: Max 5-7 items in lists
- **Von Restorff**: Primary CTA visually distinct
- **Peak-End**: Hero + final scheduling CTA are peak moments

## Copy Rules

Forbidden words (any new copy - alt text, errors, microcopy): inovador,
disruptivo, soluções, empoderador, bem-vindo, estou pronto, claro,
perfeito (as filler). The brand manual also forbids generic promises.
Forbidden punctuation: em-dash. Use "-" or rewrite.

## Coding Conventions

- Semantic HTML5 (header, nav, main, section, footer), one H1 per page
- Mobile-first responsive (375px base)
- Custom CSS references design tokens via var(--...), no magic numbers
- loading="lazy" below-fold; rel="noopener noreferrer" external; comments only when non-obvious

## Observações Especiais

Confirmado:
- Seção 9 (agendamento) NÃO usa calendário embutido. Usa formulário de
  lead (nome, telefone, e-mail) + botão para link do Google Agenda da
  ELEVO. WhatsApp (43) 99158-8212 como canal alternativo. Definir destino
  do lead (e-mail, WhatsApp ou planilha) e a URL do Google Agenda.
- CTA de WhatsApp em pontos-chave da página.
- Logos, depoimentos (nome + foto + texto) e menções de mídia: fornecidos
  pelo cliente em `assets/`. Usar os reais, não placeholders.

Em aberto (placeholder até confirmação):
- Números da Seção 7 ("3x", "abrangência nacional"): confirmar se são
  defensáveis (Forward usa 270+ empresas e 12 anos)
- Mapeamento dor para frente na Seção 1
- Conteúdo do detalhe das frentes (modal Negócio/Mercado/Pessoas): definir
  sub-serviços, entregáveis, ferramentas, duração ou mini-case
- Blog: menu existe, mas índice e página de post NÃO estão no wireframe.
  Sem CMS no stack: definir se posts serão páginas estáticas ou via
  JSON/markdown. Fora do escopo até aprovar a estrutura principal

## Credits

Strategic phase: Claude Web (web-design agent).
Build phase: Claude Code + `web-build` skill.
Designer: Caio Augusto Liutti - Londrina S/A.
