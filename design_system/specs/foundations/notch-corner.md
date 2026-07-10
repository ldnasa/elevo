# Notch corner (canto invertido suave) - receita que funciona

Técnica usada em `css/main3.css` (classes `.notch`, `.notch-tr`, `.notch-bl`) para
o corte de canto com curvas côncavas estilo Framer/Nabulé/Atacama. Registrada
porque tentativas anteriores (SVG `clipPath` com `objectBoundingBox`) falhavam:
a curva distorce quando o card muda de aspect ratio, e cada breakpoint exigia
um path novo.

## A ideia

Não corte o card. Sobreponha uma "aba" na COR DO FUNDO DA PÁGINA no canto do
card e arredonde só o canto interno da aba. As duas quinas onde a aba encontra
as bordas do card recebem filetes côncavos feitos com `radial-gradient` em
pseudo-elementos. Resultado idêntico a uma máscara, mas 100% CSS, aspect-safe
e responsivo sem ajuste.

São 3 peças por notch:
1. **A aba** (`.notch`): `position: absolute` no canto, `background` = cor do
   canvas da página, `border-radius` apenas no canto interno (ex.: aba no
   topo-direito → `border-bottom-left-radius`). O conteúdo (botão, label) vai dentro.
2. **Filete 1** (`::before`): quadrado de `R × R` encostado na aba ao longo de
   uma borda do card.
3. **Filete 2** (`::after`): idem na outra borda.

Cada filete é `background: radial-gradient(circle at <canto>, transparent
calc(R - .5px), <canvas> R)` - transparente dentro do círculo (o card aparece),
cor do canvas fora (forma a curva côncava). O `-.5px` evita serrilhado.

## Código (aba no topo-direito)

```css
.card-notch { position: relative; border-radius: var(--r-card); }

.notch {
  position: absolute; z-index: 2;
  background: var(--canvas);           /* MESMA cor do fundo atrás do card */
}
.notch::before, .notch::after {
  content: ""; position: absolute;
  width: var(--notch-r); height: var(--notch-r);
  pointer-events: none;
}

.notch-tr {
  top: 0; right: 0;
  border-bottom-left-radius: var(--notch-r);
  padding: 0 0 10px 10px;              /* respiro entre conteúdo e curva */
}
/* filete na borda superior, à esquerda da aba */
.notch-tr::before {
  top: 0; right: 100%;
  background: radial-gradient(circle at 0 100%,
    transparent calc(var(--notch-r) - .5px), var(--canvas) var(--notch-r));
}
/* filete na borda direita, abaixo da aba */
.notch-tr::after {
  top: 100%; right: 0;
  background: radial-gradient(circle at 0 100%,
    transparent calc(var(--notch-r) - .5px), var(--canvas) var(--notch-r));
}
```

Para a aba no canto inferior-esquerdo (`.notch-bl`), espelhe tudo:
`border-top-right-radius`, `::before` em `bottom: 100%; left: 0` e `::after`
em `bottom: 0; left: 100%`, ambos com `circle at 100% 0`.

## Regra para saber o centro do círculo

O centro do gradiente fica sempre no canto do quadradinho que TOCA O CARD
(o canto oposto ao encontro aba/borda). Aba topo-direita → os dois filetes usam
`circle at 0 100%` (canto inferior-esquerdo). Aba baixo-esquerda →
`circle at 100% 0`. Se errar, a curva vira "dente" convexo: inverta o canto.

## Limitações e gotchas

- Só funciona sobre fundo LISO: a aba e os filetes pintam a cor do canvas por
  cima do card. Sobre foto/gradiente de fundo, aí sim use SVG mask.
- Se o canvas mudar por seção, sobrescreva `--canvas` no escopo da seção.
- Overflow: o card NÃO pode ter `overflow: hidden` no mesmo elemento dos
  pseudo-filetes se eles vazarem para fora da aba - aqui ficam dentro do card,
  então `overflow: hidden` no card de foto convive bem (a aba fica fora do
  elemento com overflow, direto no `.card-notch`).
- Anti-aliasing: manter o degrau de `.5px` entre transparent e cor.

## Por que não os outros caminhos

- `clip-path` com `objectBoundingBox`: curvas distorcem com o aspect ratio.
- `clip-path: path()` em px: não responde a resize sem JS.
- `mask` + SVG externo: request extra, e mesmo problema de escala.
- CSS `corner-shape` / Houdini: suporte insuficiente em 2026.
