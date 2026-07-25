# @arcsyn/presentations

Sistema de comunicação do ArcSyn para propostas de arquitetura, produto e ideias. O pacote transforma os tokens públicos do design system em um contrato editorial que pode ser consumido por código ou por uma IA.

## Uso

```ts
import {
  createPresentationBrief,
  createPresentationTheme,
  narrativePatterns,
  presentationLayouts,
} from "@arcsyn/presentations";

const brief = createPresentationBrief({
  title: "Evolução da plataforma de integrações",
  audience: "Comitê de arquitetura",
  outcome: "Aprovar a migração incremental",
  proposalType: "architecture",
  requestedDecision: "Autorizar a fase de descoberta",
});

const theme = createPresentationTheme(brief.theme);
const sequence = narrativePatterns[brief.proposalType];
```

Para geração por IA, forneça ao agente:

1. o brief validado pelo export `@arcsyn/presentations/brief.schema.json`;
2. o prompt em `@arcsyn/presentations/prompt`;
3. o template editável em `@arcsyn/presentations/template.pptx`;
4. o template navegável em `@arcsyn/presentations/template.html`, quando a saída for web ou PDF;
5. o documento técnico contínuo em `@arcsyn/presentations/technical-proposal.html`, para análises detalhadas;
6. a marca oficial em `@arcsyn/presentations/logo.png`;
7. as fontes e evidências que podem ser utilizadas.

O template é uma biblioteca visual, não uma sequência obrigatória. A IA deve selecionar apenas os layouts que sustentam o raciocínio da proposta.

## Template HTML

O arquivo HTML não depende de framework ou servidor. Ele oferece navegação por teclado e toque, URL por slide, indicador de progresso e estilos de impressão para exportação em PDF.

```text
← / PageUp     slide anterior
→ / PageDown   próximo slide
Home / End     início ou fim
Espaço         avançar
```

## Template de proposta técnica

O arquivo `technical-proposal.html` é uma documentação contínua e responsiva, pensada para ocupar a largura disponível no navegador. Ele inclui sumário lateral, progresso de leitura, temas dark e light e estilos A4 para exportação em PDF.

Sua estrutura cobre resumo executivo, contexto, arquitetura, três atributos de qualidade prioritários, trade-offs, matriz de riscos, custos, execução, decisão solicitada e apêndice de evidências.
