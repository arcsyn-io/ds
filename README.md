# ArcSyn Design System

Design System CSS-first para a ArcSyn. Os tokens são independentes de framework;
React é o primeiro adaptador de componentes.

## Pacotes

- `@arcsyn/tokens`: fonte DTCG e artefatos CSS, JavaScript e Tailwind.
- `@arcsyn/styles`: reset, temas e contratos CSS dos componentes.
- `@arcsyn/icons`: SVGs sem dependência de framework.
- `@arcsyn/react`: API React e acessibilidade dos componentes.
- `@arcsyn/react-native`: adaptador React Native com componentes nativos e temas.
- `@arcsyn/docs`: catálogo e playground de documentação.

## Desenvolvimento

```bash
pnpm install
pnpm build
pnpm dev:docs
```

## Direção de dependências

```text
tokens → styles / icons → react
                      └→ docs (consome APIs públicas)
```

## React Native

O pacote `@arcsyn/tokens/react-native` gera cores resolvidas e medidas em pixels,
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
