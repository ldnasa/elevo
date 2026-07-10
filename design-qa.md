# Design QA - seção Blog do index4

## Alvos da comparação

- Fonte visual: `C:\Users\Caio\AppData\Local\Temp\codex-clipboard-c8fc12c4-aec9-4068-b7ee-873a3c0511d8.png`
- Implementação: `index4.html`, seção `#blog`
- Evidência desktop isolada: `qa/blog-component-1280x720.png`
- Evidência mobile: `qa/blog-mobile-390x844.png`
- Comparação lado a lado normalizada: `qa/blog-comparison-1341x729.jpg`
- Estado: padrão, sem hover, três cartões visíveis no desktop
- Viewport de referência: 1341 × 729
- Viewport efetivo da captura desktop: 1280 × 720, normalizado para a comparação
- Viewport mobile: 390 × 844

## Findings

- Nenhuma diferença acionável P0, P1 ou P2.
- Tipografia: Hanken Grotesk, pesos, hierarquia e quebras preservam o caráter da referência. Título, categorias e títulos dos artigos mantêm leitura equivalente.
- Espaçamento e ritmo: cabeçalho, CTA, grade de três colunas, gaps e proporção vertical dos cartões acompanham a composição original. A seção final mede aproximadamente uma tela no desktop.
- Cores e tokens: canvas, roxo, laranja e grafite usam os tokens existentes da ELEVO. A composição permanece dentro do limite cromático da marca.
- Imagens: os blocos cinza da referência foram substituídos por fotografias locais em preto e branco, conforme autorizado no pedido. Os três arquivos têm carregamento lazy, dimensões declaradas e recorte com `object-fit: cover`.
- Forma: os recortes superiores para as categorias e inferiores para as setas usam a receita côncava documentada no projeto. As curvas permanecem proporcionais nos três cartões e no mobile.
- Copy: categorias e os dois primeiros títulos seguem a referência. O terceiro título é conteúdo provisório e evita repetir o primeiro artigo.
- Responsividade: em 390 × 844 não há overflow na página (`docWidth = clientWidth = 390`). A grade vira trilho horizontal com prévia do próximo cartão; o scroll interno foi testado de `0` para `336px`.
- Console: nenhum erro registrado nas capturas desktop e mobile.

## Comparação visual

- Full-view: `qa/blog-comparison-1341x729.jpg` coloca referência e implementação na mesma imagem. A hierarquia, as três colunas e os recortes coincidem sem divergência relevante.
- Focused region: não foi necessária uma segunda captura porque os dois notches de cada cartão aparecem grandes e legíveis na comparação full-view.

## Histórico de iteração

1. Primeira captura: a seção media cerca de 823px de altura e deixava respiro vertical maior que a referência.
2. Correção: padding desktop ajustado para `48px 0 56px`; padding mobile ajustado para `56px 0 72px`.
3. Pós-correção: seção desktop ficou equivalente à altura da referência; cartões mantiveram cerca de 351 × 421px no viewport amplo. Evidência em `qa/blog-component-1280x720.png` e `qa/blog-comparison-1341x729.jpg`.

## Follow-up polish

- P3: substituir as três fotos e os links provisórios quando os posts reais forem definidos.
- P3: capturar o hover em revisão futura caso exista um mock específico desse estado. O código já inclui zoom suave da foto e deslocamento da seta.

## Implementation checklist

- [x] Seção inserida logo após “na mídia”.
- [x] Link “blog” adicionado às navegações desktop e mobile.
- [x] Três cartões com imagens locais e texto provisório.
- [x] Notch côncavo superior-esquerdo e inferior-direito.
- [x] CTA “Ver tudo”.
- [x] Layout desktop e trilho mobile responsivo.
- [x] Motion com reveal escalonado, hover e redução de movimento.
- [x] JavaScript validado com `node --check`.
- [x] Sem erros de console na verificação.

## Footer - validação contra o Figma

### Alvos

- Fonte visual: `qa/footer-figma-reference.png`, frame Figma `33:93`, 1920 × 1046.
- Implementação desktop: `qa/footer-component-1920x1046.png`, 1920 × 1046.
- Comparação lado a lado: `qa/footer-comparison-1920x1046.jpg`.
- Evidência mobile: `qa/footer-mobile-top-390x844.png` e `qa/footer-mobile-bottom-390x844.png`.
- Estado desktop: formulário vazio, sem hover, footer isolado.

### Findings

- Nenhuma diferença acionável P0, P1 ou P2.
- Tipografia: Hanken Grotesk, headline de 72px, peso 500, line-height `.9` e tracking negativo acompanham o frame.
- Layout: frame com 1046px de altura, intro em `x=290`, formulário em `x=960`, régua legal em `y=626` e botão de retorno em `x=1601 / y=805`.
- Cores: fundo `#261129`, texto `#edeae5`, CTA `#ff4817`, linhas com 24% de opacidade e glows discretos preservam a composição do Figma.
- Assets: wordmark vetorial baixado do frame e logo da agência carregado de `assets/logos/logo-agency.svg`, com ajuste de contraste sobre fundo escuro.
- Formulário: nome, empresa/função e telefone são campos reais e obrigatórios. A máscara foi testada com `43991588212`, resultando em `(43) 99158-8212`.
- Responsividade: em 390 × 844 não há overflow horizontal (`docWidth = clientWidth = 375` após a barra nativa). Intro, formulário, legal e wordmark empilham sem corte.
- Console: nenhum erro registrado no desktop ou mobile.

### Comparação visual

- Full-view: `qa/footer-comparison-1920x1046.jpg` mostra a referência e a implementação na mesma escala. Headline, formulário, CTA, faixa legal, wordmark e botão de topo permanecem alinhados.
- Focused region: não foi necessária captura adicional; os campos, a assinatura da agência e os detalhes da faixa legal estão legíveis no comparativo em resolução integral.

### Histórico de iteração

1. Primeira captura: a intro estava cerca de 32px acima do frame e a régua legal cerca de 4px abaixo.
2. Correção: alinhamento vertical do grid alterado para central, deslocamento desktop de 15px aplicado aos grupos e margem da régua ajustada de 112px para 108px.
3. Pós-correção: posições-chave coincidem com o frame 33:93; evidência em `qa/footer-component-1920x1046.png`.

### Footer follow-up polish

- P3: substituir os três links legais provisórios quando as URLs finais forem definidas.
- P3: validar a mensagem final no WhatsApp real durante a homologação; a navegação externa não foi disparada durante o QA.

final result: passed
