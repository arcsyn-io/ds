# Política de segurança

## Versões suportadas

Enquanto o design system estiver na série `0.x`, somente a versão mais recente recebe correções de segurança.

## Relato de vulnerabilidades

Não abra uma issue pública com detalhes exploráveis. Use o recurso **Report a vulnerability** na aba **Security** do repositório ou contate os mantenedores da organização ArcSyn por um canal privado.

Inclua, quando possível:

- pacote, versão e componente afetado;
- cenário de exploração e impacto;
- passos mínimos para reprodução;
- sugestão de correção ou mitigação.

Os mantenedores devem confirmar o recebimento, avaliar severidade e impacto, preparar a correção em privado e publicar uma atualização acompanhada de orientação de migração.

## Controles automatizados

Pull requests executam lint, validação de tipos, schema e contraste dos tokens, testes unitários e de acessibilidade, build, validação dos pacotes, política de licenças, auditoria de dependências, Dependency Review e CodeQL.

No GitHub, mantenha habilitados:

- dependency graph, Dependabot alerts e Dependabot security updates;
- code scanning com CodeQL;
- secret scanning e push protection;
- proteção da branch `main`, exigindo os checks `Lint, test and build`, `Browser accessibility`, `Analyze JavaScript and TypeScript` e `Review dependency changes`.
