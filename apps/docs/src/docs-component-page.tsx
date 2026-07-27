import type { ComponentPage } from "./docs-types";

export function ComponentDocumentation({ page }: { page: ComponentPage }) {
  return (
    <article className="docs-page">
      <header className="docs-page-header"><p className="docs-eyebrow">Componente</p><div className="docs-page-title-row"><div><h1>{page.title}</h1><p>{page.summary}</p></div><span className="docs-status">{page.status}</span></div></header>
      <section className="docs-section" aria-labelledby={`${page.id}-usage`}><div className="docs-section-heading"><p className="docs-eyebrow">Uso</p><h2 id={`${page.id}-usage`}>Importação e anatomia</h2></div><div className="docs-overview-grid"><pre className="docs-code"><code>{page.importCode}</code></pre><ol className="docs-anatomy">{page.anatomy.map((item, index) => <li key={item}><span>{index + 1}</span>{item}</li>)}</ol></div></section>
      <section className="docs-section" aria-labelledby={`${page.id}-props`}><div className="docs-section-heading"><p className="docs-eyebrow">API</p><h2 id={`${page.id}-props`}>Propriedades</h2></div><div className="docs-table-wrap"><table><thead><tr><th>Propriedade</th><th>Tipo</th><th>Padrão</th><th>Descrição</th></tr></thead><tbody>{page.properties.map((property) => <tr key={property.name}><td><code>{property.name}</code></td><td><code>{property.type}</code></td><td>{property.defaultValue}</td><td>{property.description}</td></tr>)}</tbody></table></div></section>
      <section className="docs-section" aria-labelledby={`${page.id}-examples`}><div className="docs-section-heading"><p className="docs-eyebrow">Referência</p><h2 id={`${page.id}-examples`}>Exemplos</h2></div><div className="docs-example-list">{page.examples.map((example) => <section className="docs-example" key={example.title}><div className="docs-example-copy"><h3>{example.title}</h3><p>{example.description}</p></div><div className="docs-preview">{example.preview}</div><pre className="docs-code"><code>{example.code}</code></pre></section>)}</div></section>
      <section className="docs-section docs-accessibility" aria-labelledby={`${page.id}-accessibility`}><p className="docs-eyebrow">Acessibilidade</p><h2 id={`${page.id}-accessibility`}>Orientação</h2><p>{page.accessibility}</p></section>
    </article>
  );
}
