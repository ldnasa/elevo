# DESIGN.md - ELEVO

**Version:** v1 - Estrutura em Movimento
**Generated:** 2026-07-01
**Source:** `design_system/showcase.html`
**Machine index:** `design_system/llms.txt`

This file is auto-exported from the approved design system. Never edit by hand.
To update, edit the showcase/spec layer and re-run the export.

Companion files:
- `design_system/showcase.html` - visual source of truth
- `design_system/tokens.css` - importable CSS custom properties
- `design_system/tokens.json` - Figma Variables import
- `design_system/tokens.dtcg.json` - vendor-neutral token export
- `design_system/llms.txt` - agent navigation index
- `design_system/specs/` - LLM-readable foundations, tokens, components, and patterns
- `design_system/scripts/token-audit.js` - drift enforcement

---

## 1. Foundation Principles

1. **Malva e roxo trocam de papel** - Malva acende sobre fundo escuro (Roxo); Roxo assenta sobre fundo claro (Cinza). Nunca os dois competindo como CTA na mesma composição.
2. **Corte assimétrico é a forma da marca** - O módulo de composição da Elevo corta um canto na diagonal enquanto os outros três seguem suaves (`my_brand_assets/formas-exemplo-elevo/`). Substitui o card retangular genérico em qualquer peça-chave.
3. **Preto e branco primeiro, cor depois** - Fotografia é sempre P&B. A cor mora na UI ao redor, nunca na foto em si.
4. **Títulos em sentence case** - Maiúscula inicial, resto minúsculo (nunca all-caps, nunca title case). Hierarquia por porcentagem do título: 100% título, 40% subtítulo, 30% corpo, 20% detalhe.
5. **Três cores por composição, no máximo** - A dupla malva/roxo mais no máximo uma cor secundária (cinza ou laranja).
6. **Movimento tem propósito narrativo** - Elevo significa avançar de nível; motion revela hierarquia e confirma interação, nunca decoração solta.

## 2. System Modules

- **Palette**: Malva/Roxo com troca de papel dark/light, Cinza, Laranja restrito, Grafite
- **Typography**: Hanken Grotesk único, títulos em sentence case, hierarquia 100/40/30/20%
- **Spacing**: grid modular = lado maior ÷ 16, sistema de 8px para componentes
- **Components**: botões pill simples, cards com corte assimétrico, estados completos
- **Elevation**: corte diagonal como assinatura, sombra roxa translúcida
- **Narrative**: Explorador + Criador - provocar e depois estruturar o caminho

## 3. Color Palette

| Name | Hex | CSS Var |
|---|---|---|
| Malva | `#b882e8` | `--primitive-malva` |
| Roxo | `#2f1533` | `--primitive-roxo` |
| Cinza | `#edeae5` | `--primitive-cinza` |
| Laranja | `#ff4817` | `--primitive-laranja` |
| Grafite | `#0f0f0f` | `--primitive-grafite` |
| Neutro morno | `#8b8175` | `--primitive-neutral-500` |
| Sucesso | `#5b9e73` | `--primitive-success` |
| Alerta | `#d9a544` | `--primitive-warning` |
| Erro | `#d64545` | `--primitive-error` |
| Roxo elevado | `#3d1c44` | `--surface-elevated` (dark theme) |

## 4. Color Heuristics

- **Malva** → CTA e destaque em fundo escuro (roxo); símbolo/logo em versão escura sobre malva
- **Roxo** → CTA e texto em fundo claro (cinza); fundo cheio em seções de prova/contraste
- **Cinza** → Fundo padrão da maioria das seções claras. Nunca como texto de leitura.
- **Laranja** → Só um destaque por composição - chip, ícone ou sublinhado. Nunca fundo grande.
- **Grafite** → Texto de altíssimo contraste e rodapés. Substitui preto puro (#000).
- **Estados** → Sucesso/Alerta/Erro só em formulário e feedback, nunca decoração.
- **Neutro** → Maior parte da UI operacional: bordas, ícones secundários, placeholders.

## 5. Typography Roles

- **Display · Hanken Grotesk 800** - títulos e afirmações de seção, sentence case
- **UI · Hanken Grotesk 500** - corpo de texto, labels, botões
- **Mono · JetBrains Mono** - uso interno deste workbench (specs, meta labels) apenas; nunca no site final

## 6. Type Scale

| Tier | % | Spec |
|---|---:|---|
| Título | 100% | `clamp(56px, 8vw, 120px)` |
| Subtítulo | 40% | `clamp(26px, 3.2vw, 44px)` |
| Corpo | 30% | 17px / 1.6 line-height |
| Detalhe | 20% | 13px, tracking .08em, caixa alta |

Regra fixa: títulos em sentence case (maiúscula inicial, resto minúsculo). Nunca all-caps, nunca title case.

## 7. Components

See `design_system/specs/atoms/`, `molecules/`, `organisms/` for full specs.

- **Button**: pill-radius always, never the cut-corner shape. Primary (Malva/Roxo role-swap fill), secondary (glass/outline), tertiary (text-only). One primary CTA per section (Hick's Law).
- **Input**: soft-rounded, error state pairs border tint with explicit helper text, never color alone.
- **Form (Agendamento)**: the Seção 9 lead form - the page's second Peak-End moment, paired with a Google Agenda / WhatsApp fallback panel.
- **Section Card**: the recurring cut-corner content unit for frentes, process steps, testimonials, media mentions. Alternates cut-corner position between neighbors.
- **Hero**: asymmetric two-column split, problem+solution stated within 4 seconds, one word-fade animation on H1 only.
- **Navigation**: fixed header, 6 links + 1 primary CTA, collapses to hamburger below 768px.
- **Empty State**: used for genuinely missing content (e.g. depoimento 4, "ainda não tenho").

## 8. Motion System

- Micro-interaction: `translateY(-2px)` + shadow shift on hover, `--duration-base` (200ms)
- Scroll reveal: opacity + `translateY(18px → 0)`, 80-120ms stagger, `--duration-medium` (400ms)
- Hero text: word-by-word fade-up, H1 only, once per page load
- WebGL hero shader: available but off by default in this project

## 9. Motion Anti-Patterns

- Nunca `transition-all`
- Nunca animar width ou height
- Nunca parallax pesado
- Nunca loop infinito sem pausa
- Nunca WebGL fora do hero

## 10. Icon System

Lucide, stroke 1.75px, single library. Project additions beyond the default set: `message-circle` (WhatsApp CTA), `calendar` (Google Agenda CTA), `map-pin` (Londrina/PR proximity). No icon-in-colored-circle badges.

## 11. Asset Direction

- **Fotografia**: retrato editorial em P&B, executivos/fundadores reais, luz natural, postura confiante não posada.
- **Ilustração**: uso raro, esquemática (traço único roxo sobre cinza), sem mascotes.
- **Imagem gerada por IA**: só para fundos/texturas abstratas (hero, CTA final), nunca substitui fotografia de pessoas.
- **Padrão/textura**: os dois estilos de degradê do manual (liso + granulado), malva/roxo/laranja.

## 12. Placeholder Image Categories

- **Hero / retrato do fundador** - `brazilian founder portrait black and white, confident business owner, natural light editorial` - rejeitar fundo branco de estúdio, aperto de mão.
- **Workshop / estratégia em ação** - `business strategy workshop, sticky notes whiteboard, team working session candid` - sem atores.
- **Retratos de depoimento** - `brazilian executive headshot black and white, confident close up` - já parcialmente coberto por `assets/depoimentos/` (texto sem foto ainda).

## 13. Quality Standards

| Dimension | Rules | Specs |
|---|---|---|
| Acessibilidade | Contraste AA, foco visível, navegação por teclado, reduced motion | Texto 4.5:1 · UI 3:1 · toque 44px |
| Responsivo | Mobile-first (375px) → 2 colunas → desktop | 375 · 768 · 1024 · 1280 |
| Microcopy | Ações específicas, erros úteis, sem promessa genérica | Proibidas: inovador, disruptivo, soluções, bem-vindo, "estou pronto", "perfeito"; sem travessão |
| Estados | Loading, empty, error, success, disabled | Skeleton no lugar de spinner |
| Performance | Landing de conversão, uma página, leve | 1.2MB página · 180KB hero · 90KB JS |
| SEO | Schema local, OG completo, sitemap | Schema LocalBusiness · OG 1200x630 · 150-160 chars |

## 14. AI Image Prompts

### Global direction
Fotografia é sempre preto e branco, luz natural, pessoas reais e não modelos de stock. Fundos/texturas gerados por IA usam só malva, roxo e um toque de laranja. Nenhuma imagem mostra texto de UI falso ou logotipos de terceiros.

### Hero (index.html)
```text
Um empresário brasileiro de 40 a 55 anos, fundador ou CEO, em ambiente de escritório real e discreto, olhando levemente para fora do quadro com expressão confiante e serena, sem sorriso posado. Luz natural lateral entrando por uma janela, sombras suaves. Fotografado em preto e branco, grão sutil de filme, profundidade de campo rasa, lente 85mm. Composição assimétrica, espaço negativo à esquerda do quadro para o título. Sem terno de banco de imagens, sem fundo branco de estúdio, sem aperto de mão, sem sorriso de stock corporativo. Clima de determinação calma e progresso real.
```
Ferramentas: Midjourney v7 ou Flux Pro 1.1.

### Fundo abstrato (hero e Seção 9)
```text
Um fundo abstrato fluido em gradiente, transições suaves entre roxo escuro profundo, malva claro e um toque de vermelho-laranja vibrante, lembrando tinta se movendo em câmera lenta ou fumaça colorida. Grão de filme sutil sobreposto para textura orgânica, sem elementos figurativos, sem texto, sem logotipo. Composição assimétrica com um núcleo de luz deslocado do centro. Paleta especificamente malva #b882e8, roxo #2f1533 e laranja #ff4817, nunca azul ou ciano.
```
Ferramentas: Recraft ou Midjourney; gpt-image para grão mais controlável.

## 15. Brand Narrative Applied

- **Explorador** → Provocação primeiro: chips de dor clicáveis na Seção 1 desafiam o status quo antes de qualquer solução aparecer.
- **Criador** → Estrutura logo depois: Seção 2 organiza a provocação em três frentes claras.
- **Movimento** → Motion de scroll e o corte diagonal comunicam avanço.
- **Estrutura** → Grid modular (lado maior ÷ 16) rege espaçamento.
- **Protagonismo** → CTAs em segunda pessoa ("você"), nunca a marca como herói.
- **Proximidade regional** → Londrina/PR concreta (WhatsApp local, depoimentos reais), não terceiriza confiança para selos genéricos.

## 16. Heuristics of Use

- **Malva vs Roxo como cor de ação?** Malva em fundo escuro, roxo em fundo claro. Nunca os dois como CTAs concorrentes na mesma seção.
- **Corte assimétrico vs canto redondo simples?** Corte em cards/módulos de mídia/prova social. Redondo simples em botões, inputs, pills, badges.
- **Faixa escura vs faixa clara?** Escura nos momentos de pico (hero, seção de agendamento). Clara para conteúdo informativo corrido.
- **Quando laranja?** Um destaque por composição - nunca fundo de seção inteira.
- **Foto colorida vs P&B?** Nunca colorida. A cor vem do layout ao redor, nunca da foto.
- **Quantos CTAs primários por seção?** Um (Lei de Hick).

## 17. Anti-Generic Guardrails

- **Cores**: nunca a paleta padrão do Tailwind como cor de marca; nunca as cinco cores da paleta juntas (máximo três).
- **Tipografia**: nunca misturar outra família com Hanken Grotesk; nunca título em caixa alta ou title case.
- **Forma**: nunca substituir o corte assimétrico por card genérico em peças-chave; nunca cortar botão, input ou pill.
- **Sombra**: nunca `shadow-md`/`shadow-lg` cru do Tailwind; sombra sempre tingida de roxo.
- **Fundo**: nunca glow roxo genérico de landing de IA - o degradê é o do manual (malva/roxo/laranja com grão).
- **Fotografia**: nunca stock colorido, sorriso de stock, aperto de mão corporativo.
- **Ícones**: nunca ícone dentro de círculo colorido; stroke 1.75px solo.
- **Motion**: nunca `transition-all`; sempre respeitar `prefers-reduced-motion`.
- **Layout**: nunca centralizar tudo - composição assimétrica em hero e seções de prova.
- **Copy**: nunca as palavras proibidas do CLAUDE.md nem travessão (-).
- **Estados**: todo elemento clicável precisa de hover, focus-visible e active.

## 18. System Context

- **BRAND.md** - Ainda não formalizado; vive hoje em `my_brand_assets/Manual de Identidade Visual - Elevo_Baixa.pdf` e `[2026] PLANEJAMENTO - 2026-06-20.docx`.
- **DESIGN.md** - Este arquivo. Tokens, UI, motion, responsivo e regras de implementação.
- **Asset index** - `assets/clientes/`, `assets/midia/`, `assets/depoimentos/`, `my_brand_assets/`.
- **BrandOS** - `design_system/showcase.html`, navegável hoje como workbench.

---

## Appendix - Token Usage

All visual values resolve to CSS custom properties in `design_system/tokens.css`.
Use `var(--token-name)` in component code. Never hardcode values.
For the complete map, read `design_system/specs/tokens/token-reference.md`.

### Required before UI work
1. Read `design_system/llms.txt`
2. Read `design_system/specs/tokens/token-reference.md`
3. Read relevant component and pattern specs
4. Run or simulate `design_system/scripts/token-audit.js`

### Core token families
- Colors: `design_system/specs/tokens/color-tokens.md`
- Spacing: `design_system/specs/tokens/spacing-tokens.md`
- Typography: `design_system/specs/tokens/typography-tokens.md`
- Motion: `design_system/specs/tokens/motion-tokens.md`
- Shape (cut-corner system): `design_system/specs/foundations/shape.md`
