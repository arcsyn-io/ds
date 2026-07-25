# Gerador de apresentações ArcSyn

Crie uma apresentação ou proposta técnica editável a partir do brief fornecido. Trate `@arcsyn/presentations` como contrato visual e narrativo: use `createPresentationTheme()` para cores, tipografia e geometria; `narrativePatterns` para a sequência inicial; `presentationLayouts` para escolher a composição; e `@arcsyn/presentations/logo.png` como a única marca oficial. Use `template.pptx` para PowerPoint, `template.html` para slides no navegador e `technical-proposal.html` para uma documentação técnica contínua ou PDF.

Quando a saída for `technical-proposal.html`, organize o raciocínio para leitura contínua. Inclua resumo executivo, contexto e escopo, arquitetura proposta, exatamente três atributos de qualidade prioritários, trade-offs, riscos e mitigações, custos, plano de execução, decisão solicitada e referências. Diferencie fatos, estimativas, hipóteses e decisões.

## Trabalho de comunicação

Antes de criar slides, complete mentalmente esta frase:

> Ao final, **[audiência]** deve **[resultado]** porque **[tese central]**.

Cada slide deve ter uma única função narrativa e um título que expresse sua conclusão. A sequência precisa construir o raciocínio; uma agenda não substitui uma narrativa.

## Regras visuais

- Use canvas 16:9 de 1280 × 720 e a grade exposta pelo tema.
- O tema padrão é `dark`; use `light` quando o brief solicitar.
- Use IBM Plex Sans para conteúdo e IBM Plex Mono apenas para código, IDs e metadados.
- Use a logo principal na capa e no fechamento, uma assinatura discreta nos slides de conteúdo e presença reforçada nos divisores de seção.
- Não redesenhe, recolora, distorça ou substitua a logo por texto.
- Preserve contraste, bordas e espaçamento como principais recursos de hierarquia.
- Não copie a densidade de uma interface: apresentações exigem texto maior e menos elementos.
- Não use gradientes decorativos, neon, sombras pesadas, excesso de cantos arredondados, cards repetitivos ou controles que pareçam interativos.
- Use cores de sucesso, atenção e erro somente quando comunicarem esses estados.
- Respeite os tamanhos mínimos do tema. Encurte o texto antes de reduzir a fonte.

## Conteúdo e evidência

- Nunca invente fatos, métricas, citações, usuários ou resultados.
- Registre a fonte de toda afirmação externa não trivial e de todo recurso externo nas notas do slide.
- Explique o significado dos dados, não apenas os exiba.
- Use diagramas apenas quando reduzirem a carga de entendimento.
- Faça a recomendação e a decisão solicitada aparecerem de forma explícita.

## Saída

1. Valide o brief com `presentation-brief.schema.json`.
2. Escolha o padrão narrativo correspondente a `proposalType`.
3. Remova, repita ou reordene layouts quando o raciocínio exigir.
4. Gere um `.pptx` editável, um deck HTML navegável ou uma proposta técnica HTML contínua conforme a saída solicitada; não transforme o conteúdo em imagem.
5. Renderize e inspecione todos os slides.
6. Corrija sobreposição, corte, quebra inesperada, inconsistência de rodapé, aplicação da marca e contraste antes de entregar.

## Brief

```json
{
  "title": "Título da proposta",
  "audience": "Quem decide ou precisa compreender",
  "outcome": "O que essa audiência deve decidir, aprovar ou entender",
  "proposalType": "architecture",
  "context": "Situação atual e motivação",
  "recommendation": "Direção proposta",
  "constraints": [],
  "evidence": [],
  "requestedDecision": "Decisão ou próximo passo esperado",
  "theme": "dark",
  "language": "pt-BR"
}
```
