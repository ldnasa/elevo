# Content Flow - Section Rhythm

## Principle

The 11-section wireframe (Head + Seções 1-11) alternates surface brightness to create rhythm and to mark the two Peak-End moments (CLAUDE.md UX principle): Hero and Seção 9 (agendamento) get the dark Roxo treatment with the brand's textured gradient; most informational sections stay on the light Cinza surface.

## Section-by-Section Surface Map

| Section | Surface | Why |
|---|---|---|
| Head (hero) | Dark (Roxo) + gradient | Peak moment #1 - problem/solution statement |
| 1. Travando | Light | Informational, chip-based dor→frente navigation |
| 2. Solução | Light | Three `section-card` frentes |
| 3. Como atuamos | Light | Simple 4-tile list + one CTA |
| 4. Empresas / logos | Light | Logo carousel + testimonial cards |
| 5. Resultados | Light | Short bullet grid |
| 6. Como um projeto acontece | Light | 4-step process cards |
| 7. Sobre a Elevo | Light or dark-adjacent | Stats block, can take a subtle elevated surface for contrast |
| 8. Executivos | Light | Portrait cards |
| 9. Próximo passo (agendamento) | Dark (Roxo) + gradient | Peak moment #2 - conversion form |
| 10. Na mídia | Light | Mention cards, real clipping data from `assets/midia/` |
| 11. Conteúdos (blog) | Light | Simple 3-card grid |

## Rules

- Never stack two dark sections back to back - dark is reserved for the two peak moments plus, optionally, one contrast band elsewhere (Seção 7 stats).
- Every section keeps one primary CTA maximum (Hick's Law, CLAUDE.md).
- Section titles use sentence case (capital first letter); eyebrow labels are uppercase mono/UI, small.

## Do Not

- Do not turn every section dark "for drama" - it dilutes the Peak-End effect the hero and the scheduling section are built to carry.
- Do not skip the empty-state treatment for Seção 4's 4th testimonial slot - render `molecules/empty-state.md` instead of a gap or a duplicate card.

## Cross-References

- Uses: `foundations/color.md`, `organisms/hero.md`, `organisms/section-card.md`, `molecules/form.md`, `molecules/empty-state.md`
