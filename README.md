# ArcSyn Design System

Design System CSS-first para a ArcSyn. Os tokens são independentes de framework;
React é o primeiro adaptador de componentes.

## Pacotes

- `@arcsyn-io/tokens`: fonte DTCG e artefatos CSS, JavaScript e Tailwind.
- `@arcsyn-io/presentations`: linguagem editorial, layouts, brief e template para propostas geradas por IA.
- `@arcsyn-io/styles`: reset, temas e contratos CSS dos componentes.
- `@arcsyn-io/react`: API React, acessibilidade e catálogo em `@arcsyn-io/react/icons`.
- `@arcsyn-io/react-native`: componentes nativos, temas e catálogo em `@arcsyn-io/react-native/icons`.
- `@arcsyn-io/docs`: catálogo e playground de documentação.

## Desenvolvimento

```bash
pnpm install
pnpm build
pnpm dev:docs
```

## Instalação em outros projetos

Os pacotes são publicados no GitHub Packages sob o scope `@arcsyn-io`. No
projeto consumidor, adicione um `.npmrc`:

```ini
@arcsyn-io:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

Nunca grave o token no arquivo. Para desenvolvimento local, defina
`NODE_AUTH_TOKEN` com um personal access token classic que tenha, no mínimo,
`read:packages`.

No PowerShell:

```powershell
$env:NODE_AUTH_TOKEN = "seu-token"
pnpm add @arcsyn-io/react
```

Importe o CSS global uma vez no ponto de entrada do aplicativo web:

```tsx
import "@arcsyn-io/react/styles.css";
import { Button } from "@arcsyn-io/react";

export function App() {
  return <Button variant="primary">Salvar</Button>;
}
```

Para React Native:

```bash
pnpm add @arcsyn-io/react-native react-native-svg
```

Em GitHub Actions, use `actions/setup-node` com
`registry-url: https://npm.pkg.github.com` e exponha o token como
`NODE_AUTH_TOKEN`. Para consumir com `GITHUB_TOKEN`, o repositório do aplicativo
precisa receber acesso ao pacote nas configurações do GitHub Packages.

## Releases

Toda alteração publicável deve incluir um changeset:

```bash
pnpm changeset
```

O arquivo criado em `.changeset/` deve ser commitado junto com a alteração. Ao
chegar à `main`, o workflow `Release packages` cria ou atualiza um pull request
de versão. Ao fazer merge desse pull request, o mesmo workflow publica os
pacotes e cria as releases e tags no GitHub.

Para a primeira publicação, como as versões `0.1.0` ainda não existem no
registry, o workflow publica os pacotes diretamente após esta configuração
chegar à `main`.

Comandos de manutenção:

```bash
pnpm version-packages
pnpm release
```

`pnpm release` exige autenticação com permissão `write:packages`; normalmente
ele deve ser executado somente pelo workflow.

## Qualidade e segurança

O gate local completo é:

```bash
pnpm validate
pnpm security:audit
pnpm test:e2e
```

`pnpm validate` executa lint de TypeScript/React/CSS, verificação de formatação, schema e contraste dos tokens, TypeScript em modo estrito, testes unitários com cobertura, build, validação dos pacotes publicados e política de licenças.

Comandos úteis durante o desenvolvimento:

```bash
pnpm lint
pnpm format
pnpm tokens:validate
pnpm test:unit
pnpm packages:check
pnpm licenses:check
```

O build usa TypeScript 7. Como `typescript-eslint` ainda depende da API do TypeScript 6, o pacote privado `@arcsyn-io/tooling` mantém uma instalação isolada do TypeScript 6 exclusivamente para parsing do lint. A validação de tipos continua sendo feita pelo TypeScript 7 configurado na raiz.

No GitHub, os workflows executam o gate completo, acessibilidade WCAG em Chromium, CodeQL com regras estendidas e revisão de novas dependências. Consulte [SECURITY.md](./SECURITY.md) para o processo de relato e os controles que devem permanecer habilitados no repositório.

## Direção de dependências

```text
tokens → styles → react
       └────────→ react-native
       └────────→ presentations
                  docs (consome APIs públicas)
```

## Apresentações e propostas

`@arcsyn-io/presentations` leva a linguagem do produto para apresentações sem reproduzir a densidade da interface. O pacote expõe tema derivado dos tokens, layouts editoriais, padrões narrativos para arquitetura, produto e ideias, um schema de brief, um prompt canônico para IA e um template PowerPoint editável.

```ts
import { createPresentationBrief, narrativePatterns } from "@arcsyn-io/presentations";

const brief = createPresentationBrief({
  title: "Evolução da plataforma",
  audience: "Comitê de arquitetura",
  outcome: "Aprovar a descoberta",
  proposalType: "architecture",
});

const sequence = narrativePatterns[brief.proposalType];
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
para o catálogo de ícones. O pacote `@arcsyn-io/tokens/react-native` gera cores resolvidas e medidas em pixels,
sem CSS variables ou `rem`. O adaptador `@arcsyn-io/react-native` usa esses tokens em
componentes nativos.

```tsx
import { ArcSynProvider, Button, Field, Input } from "@arcsyn-io/react-native";

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
