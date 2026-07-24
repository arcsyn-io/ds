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

Web aceita `light`, `dark`, `deep-dark`, `corporate-dark`,
`catppuccin-mocha` e `catppuccin-latte` pelo atributo `data-arcsyn-theme`.
O tema `deep-dark` parte de `#000000` e preserva o primary ciano e o foreground
azure claro. O tema isolado `corporate-dark` usa uma base ardósia violeta moderna
e mantém o ciano da marca (`#90dddf`) em `primary`. No React Native, use os mesmos
nomes na propriedade `theme` de `ArcSynProvider`.

O tema `catppuccin-mocha` adapta a paleta Mocha e usa o Mauve oficial
(`#cba6f7`) como `primary`; na documentação, o detalhe ciano da logo também
assume Mauve enquanto esse tema estiver ativo.

O tema `catppuccin-latte` usa Base, Mantle e Crust da variante clara e aplica o
Mauve Latte (`#8839ef`) em `primary` e na adaptação temática da logo.

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
