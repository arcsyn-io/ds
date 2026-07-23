# ArcSyn Design System

Design System CSS-first para a ArcSyn. Os tokens são independentes de framework;
React é o primeiro adaptador de componentes.

## Pacotes

- `@arcsyn/tokens`: fonte DTCG e artefatos CSS, JavaScript e Tailwind.
- `@arcsyn/styles`: reset, temas e contratos CSS dos componentes.
- `@arcsyn/react`: API React, acessibilidade e catálogo em `@arcsyn/react/icons`.
- `@arcsyn/react-native`: componentes nativos, temas e catálogo em `@arcsyn/react-native/icons`.
- `@arcsyn/docs`: catálogo e playground de documentação.

## Desenvolvimento

```bash
pnpm install
pnpm build
pnpm dev:docs
```

## Direção de dependências

```text
tokens → styles → react
       └────────→ react-native
                  docs (consome APIs públicas)
```

## Temas

Web aceita `light`, `dark` e `deep-dark` pelo atributo `data-arcsyn-theme`.
O tema `deep-dark` parte de `#000000` e preserva o primary ciano e o foreground
azure claro. No React Native, use os mesmos nomes na propriedade `theme` de
`ArcSynProvider`.

## React Native

O app consumidor deve instalar `react-native-svg`, peer dependency necessária
para o catálogo de ícones. O pacote `@arcsyn/tokens/react-native` gera cores resolvidas e medidas em pixels,
sem CSS variables ou `rem`. O adaptador `@arcsyn/react-native` usa esses tokens em
componentes nativos.

```tsx
import { ArcSynProvider, Button, Field, Input } from "@arcsyn/react-native";

export function App() {
  return (
    <ArcSynProvider theme="dark">
      <Field.Root>
        <Field.Label>Nome do projeto</Field.Label>
        <Input placeholder="ArcSyn DS" />
      </Field.Root>

      <Button>Salvar</Button>
    </ArcSynProvider>
  );
}
```

Para usar IBM Plex no app nativo, adicione os arquivos de fonte ao projeto e
registre os nomes esperados pelo token: `IBMPlexSans-Regular`,
`IBMPlexSans-Medium`, `IBMPlexSans-SemiBold`, `IBMPlexMono-Regular` e
`IBMPlexMono-Medium`.
