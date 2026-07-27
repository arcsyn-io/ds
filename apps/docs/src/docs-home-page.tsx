import { Card } from "@arcsyn-io/react";
import type { ComponentPage } from "./docs-types";

export function HomePage({ componentPages }: { componentPages: readonly ComponentPage[] }) {
  return (
    <article className="docs-page">
      <header className="docs-page-header"><p className="docs-eyebrow">ArcSyn Design System</p><h1>Documentação de componentes</h1><p className="docs-home-summary">Uma base compacta e corporativa, construída sobre tokens agnósticos, CSS compartilhado e adaptadores de framework.</p></header>
      <section className="docs-section" aria-labelledby="foundations-title"><div className="docs-section-heading"><p className="docs-eyebrow">Fundação</p><h2 id="foundations-title">Princípios de implementação</h2></div><div className="docs-principles"><Card><strong>Tokens primeiro</strong><p>Valores de cor, espaço, radius e sombra são a fonte comum para todos os frameworks.</p></Card><Card><strong>CSS como contrato</strong><p>Estados e variantes usam atributos data-*, mantendo a linguagem visual consistente.</p></Card><Card><strong>Adaptadores idiomáticos</strong><p>React entrega comportamento e acessibilidade sem duplicar decisões de aparência.</p></Card><Card><strong>Mobile nativo</strong><p>React Native recebe tokens em pixels e componentes que respeitam toque, teclado e APIs de acessibilidade nativas.</p></Card></div></section>
      <section className="docs-section" aria-labelledby="catalog-title"><div className="docs-section-heading"><p className="docs-eyebrow">Catálogo</p><h2 id="catalog-title">Componentes disponíveis</h2></div><div className="docs-catalog">{componentPages.map((page) => <a className="docs-catalog-card" href={`#/components/${page.id}`} key={page.id}><span className="docs-status">{page.status}</span><h3>{page.title}</h3><p>{page.summary}</p><span className="docs-link">Ver documentação →</span></a>)}</div></section>
    </article>
  );
}
