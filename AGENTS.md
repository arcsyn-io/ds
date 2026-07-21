# ArcSyn Design System — Guia para agentes

## Arquitetura

- Este é um monorepo `pnpm` com TypeScript.
- `packages/tokens` é a fonte de verdade das decisões visuais. Edite os JSONs em `src/`; nunca edite `dist/` manualmente.
- `packages/styles` contém o contrato CSS agnóstico de framework. Componentes web usam classes `arcsyn-*` e estados em atributos `data-*`.
- `packages/react` é o adaptador React web. Componentes simples devem continuar leves; componentes comportamentais complexos podem encapsular `@base-ui/react`.
- `packages/react-native` é o adaptador nativo. Ele consome somente `@arcsyn/tokens/react-native`; não importa CSS, Tailwind ou `@fontsource`.
- `apps/docs` deve consumir apenas APIs públicas dos pacotes, nunca arquivos internos de `src/`.

## Tokens e temas

- Camadas: primitivos → semânticos → componentes, quando realmente necessário.
- Preserve a semântica de `background`, `surface`, `foreground`, `primary`, `border`, `muted`, `success`, `warning` e `danger`.
- Web: tokens semânticos são CSS variables. React Native: o gerador resolve referências e converte `rem` para pixels.
- Tema padrão é `dark`; `light` continua obrigatório e deve manter contraste suficiente.
- IBM Plex Sans é a fonte de interface; IBM Plex Mono é exclusivamente para código, IDs e metadados.

## Linguagem visual

- A ArcSyn é compacta, séria e corporativa: contraste, bordas e espaçamento constroem hierarquia; sombras são discretas.
- Web desktop usa controles compactos. Mobile deve usar alvos de toque de no mínimo 44px no tamanho padrão.
- Evite superfícies excessivamente arredondadas, gradientes decorativos, sombras pesadas, visual neon e estilos genéricos de startup.
- Não use cores de estado apenas como decoração: sucesso, atenção e erro devem comunicar significado.

## Componentes

- Mantenha nomes de variantes entre plataformas: `primary`, `secondary`, `outline`, `ghost` e `danger` quando aplicável.
- Ao criar ou alterar um componente web, atualize: estilos em `packages/styles`, API em `packages/react`, documentação e exemplos.
- Quando o componente tiver equivalente mobile, mantenha a mesma intenção, nomes de props e estados em `packages/react-native`. Se não houver paridade, documente explicitamente a limitação.
- Componentes de formulário devem fornecer rótulo, descrição e erro acessíveis. No web, associe `label` e `input`; no mobile, use `nativeID` e `accessibilityLabel`/`accessibilityHint` quando necessário.
- Dialog web deve usar Base UI para foco, portal e teclado. Dialog mobile deve usar `Modal` nativo e oferecer fechamento explícito.

## Documentação e verificação

- Cada componente público precisa de uma página em `apps/docs/src/docs-app.tsx` com: importação, anatomia, API, exemplos e orientação de acessibilidade.
- Atualize a documentação antes de considerar um componente concluído.
- Execute `pnpm build` ao final de qualquer alteração. Ele gera tokens, compila ambos os adaptadores e constrói a documentação.
- Para desenvolvimento da documentação: `pnpm dev:docs`.

## Dependências

- Prefira dependências pequenas e explícitas.
- Não introduza uma dependência de framework em `tokens` ou `styles`.
- Fontes web são auto-hospedadas via `@fontsource`. Em React Native, fontes devem ser vinculadas pelo aplicativo consumidor; não presuma Expo.
