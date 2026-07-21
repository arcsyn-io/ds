import { useEffect, useState, type ReactNode } from "react";
import { Alert, Badge, Button, Card, Checkbox, Dialog, Field, Input, InputGroup, Select, Spinner, Switch, Textarea } from "@arcsyn/react";

type Property = {
  name: string;
  type: string;
  defaultValue: string;
  description: string;
};

type Example = {
  title: string;
  description: string;
  preview: ReactNode;
  code: string;
};

type ComponentPage = {
  id: string;
  title: string;
  summary: string;
  importCode: string;
  status: string;
  anatomy: string[];
  accessibility: string;
  properties: Property[];
  examples: Example[];
};

const componentPages: ComponentPage[] = [
  {
    id: "button",
    title: "Button",
    summary: "Dispara uma ação ou inicia um fluxo. Use uma única ação primária por contexto.",
    importCode: 'import { Button } from "@arcsyn/react";',
    status: "React estável",
    anatomy: ["Elemento button", "Ícone inicial opcional", "Rótulo", "Ícone final opcional"],
    accessibility: "Renderiza um button nativo. Use type=\"submit\" apenas em formulários e informe um rótulo textual ou aria-label em botões somente com ícone.",
    properties: [
      { name: "variant", type: '"primary" | "secondary" | "outline" | "ghost" | "danger"', defaultValue: '"primary"', description: "Define a importância visual da ação." },
      { name: "size", type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: "Controla a proporção horizontal e a altura do botão." },
      { name: "leadingIcon", type: "ReactNode", defaultValue: "—", description: "Ícone exibido antes do rótulo." },
      { name: "trailingIcon", type: "ReactNode", defaultValue: "—", description: "Ícone exibido após o rótulo." },
      { name: "loading", type: "boolean", defaultValue: "false", description: "Desabilita o botão, expõe aria-busy e substitui o ícone inicial pelo Spinner." },
      { name: "disabled", type: "boolean", defaultValue: "false", description: "Desabilita a interação." },
      { name: "...buttonProps", type: "ButtonHTMLAttributes<HTMLButtonElement>", defaultValue: "—", description: "Inclui type, onClick, name, value e demais atributos nativos." },
    ],
    examples: [
      {
        title: "Variantes",
        description: "Use primary para a ação principal; secondary, outline e ghost para ações de apoio; danger para ações destrutivas.",
        preview: <div className="docs-demo-row"><Button>Continuar</Button><Button variant="secondary">Cancelar</Button><Button variant="outline">Editar</Button><Button variant="ghost">Ver detalhes</Button><Button variant="danger">Excluir</Button></div>,
        code: '<Button>Continuar</Button>\n<Button variant="secondary">Cancelar</Button>\n<Button variant="outline">Editar</Button>\n<Button variant="ghost">Ver detalhes</Button>\n<Button variant="danger">Excluir</Button>',
      },
      {
        title: "Tamanhos e estados",
        description: "A escala mantém controles compactos sem comprometer a proporção horizontal.",
        preview: <div className="docs-demo-row"><Button size="sm">Salvar</Button><Button>Salvar</Button><Button size="lg">Salvar</Button><Button loading>Enviando</Button><Button disabled>Indisponível</Button></div>,
        code: '<Button size="sm">Salvar</Button>\n<Button>Salvar</Button>\n<Button size="lg">Salvar</Button>\n<Button loading>Enviando</Button>\n<Button disabled>Indisponível</Button>',
      },
    ],
  },
  {
    id: "input",
    title: "Input",
    summary: "Campo de texto para entrada de valores simples em formulários e filtros.",
    importCode: 'import { Field, Input } from "@arcsyn/react";',
    status: "React estável",
    anatomy: ["Field opcional: Label, Description e Error", "Elemento input", "Valor ou placeholder", "Estado inválido opcional"],
    accessibility: "Sempre associe o campo a um label visível. Quando o texto não estiver visível, use aria-label. O estado invalid também comunica aria-invalid.",
    properties: [
      { name: "invalid", type: "boolean", defaultValue: "false", description: "Aplica o estado de validação inválida e aria-invalid." },
      { name: "size", type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: "Controla a altura e a densidade do controle." },
      { name: "className", type: "string", defaultValue: "—", description: "Acrescenta classes sem remover o contrato visual base." },
      { name: "...inputProps", type: "InputHTMLAttributes<HTMLInputElement>", defaultValue: "—", description: "Inclui type, value, defaultValue, placeholder, disabled, onChange e atributos nativos." },
    ],
    examples: [
      {
        title: "Field completo",
        description: "Field organiza rótulo, instrução e feedback de validação em um contrato semântico consistente.",
        preview: <div className="docs-demo-stack"><Field.Root><Field.Label htmlFor="email">E-mail corporativo</Field.Label><Input id="email" type="email" placeholder="nome@empresa.com" aria-describedby="email-help" /><Field.Description id="email-help">Usaremos este endereço para atualizações de acesso.</Field.Description></Field.Root><Field.Root><Field.Label htmlFor="cost-center">Centro de custo</Field.Label><Input id="cost-center" invalid defaultValue="Código inválido" aria-describedby="cost-center-error" /><Field.Error id="cost-center-error">Informe um centro de custo válido.</Field.Error></Field.Root><Field.Root><Field.Label htmlFor="locked">Campo bloqueado</Field.Label><Input id="locked" disabled defaultValue="Sem permissão" /></Field.Root></div>,
        code: '<Field.Root>\n  <Field.Label htmlFor="email">E-mail corporativo</Field.Label>\n  <Input id="email" type="email" aria-describedby="email-help" />\n  <Field.Description id="email-help">Usaremos este endereço para atualizações.</Field.Description>\n</Field.Root>',
      },
    ],
  },
  {
    id: "input-group",
    title: "Input Group",
    summary: "Compõe um Input com prefixos ou sufixos sem perder o foco, validação e alinhamento visual.",
    importCode: 'import { Input, InputGroup } from "@arcsyn/react";',
    status: "React estável",
    anatomy: ["Root", "Addon inicial opcional", "Input", "Addon final opcional"],
    accessibility: "Addons devem complementar o campo, não substituir o label. Para ícones decorativos, use aria-hidden. Mantenha o label associado ao Input real usando htmlFor.",
    properties: [
      { name: "InputGroup.Root.size", type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: "Aplica a mesma altura ao Input e aos addons." },
      { name: "InputGroup.Root.invalid", type: "boolean", defaultValue: "false", description: "Aplica o estado de erro a toda a composição." },
      { name: "InputGroup.Root.children", type: "ReactNode", defaultValue: "—", description: "Recebe Input e Addon em qualquer uma das extremidades." },
      { name: "InputGroup.Addon.position", type: '"start" | "end"', defaultValue: '"start"', description: "Descreve a posição semântica do complemento." },
      { name: "InputGroup.Addon.children", type: "ReactNode", defaultValue: "—", description: "Texto, ícone decorativo ou unidade exibida junto ao campo." },
    ],
    examples: [
      {
        title: "URL da integração",
        description: "Prefixos e sufixos deixam partes fixas do valor visíveis, sem torná-las editáveis.",
        preview: <div className="docs-demo-stack"><Field.Root><Field.Label htmlFor="integration-url">URL da integração</Field.Label><InputGroup.Root><InputGroup.Addon>https://</InputGroup.Addon><Input id="integration-url" defaultValue="financeiro" /><InputGroup.Addon position="end">.arcsyn.com</InputGroup.Addon></InputGroup.Root><Field.Description>O subdomínio é configurado pela equipe responsável.</Field.Description></Field.Root></div>,
        code: '<InputGroup.Root>\n  <InputGroup.Addon>https://</InputGroup.Addon>\n  <Input defaultValue="financeiro" />\n  <InputGroup.Addon position="end">.arcsyn.com</InputGroup.Addon>\n</InputGroup.Root>',
      },
      {
        title: "Valor monetário fluido",
        description: "Prefixo e valor compartilham a mesma superfície, sem um separador visual entre eles.",
        preview: <div className="docs-demo-stack"><Field.Root><Field.Label htmlFor="budget">Orçamento mensal</Field.Label><InputGroup.Root><InputGroup.Addon>R$</InputGroup.Addon><Input id="budget" defaultValue="99,00" /></InputGroup.Root><Field.Description>Use uma única borda para comunicar que prefixo e valor fazem parte do mesmo campo.</Field.Description></Field.Root></div>,
        code: '<InputGroup.Root>\n  <InputGroup.Addon>R$</InputGroup.Addon>\n  <Input defaultValue="99,00" />\n</InputGroup.Root>',
      },
    ],
  },
  {
    id: "select",
    title: "Select",
    summary: "Escolha uma opção em uma lista compacta, acessível por teclado e adequada para valores enumerados.",
    importCode: 'import { Field, Select } from "@arcsyn/react";',
    status: "React estável",
    anatomy: ["Root", "Trigger", "Value ou placeholder", "Content", "Item ou Group"],
    accessibility: "Base UI fornece foco, teclado e semântica de listbox. Use Field.Label associado ao id do Root; itens desabilitados não podem receber seleção.",
    properties: [
      { name: "Select.Root.value", type: "string | null", defaultValue: "—", description: "Valor controlado selecionado." },
      { name: "Select.Root.defaultValue", type: "string | null", defaultValue: "null", description: "Valor inicial não controlado." },
      { name: "Select.Root.onValueChange", type: "(value) => void", defaultValue: "—", description: "É chamado quando a escolha muda." },
      { name: "Select.Root.disabled", type: "boolean", defaultValue: "false", description: "Bloqueia a interação com o seletor." },
      { name: "Select.Item.disabled", type: "boolean", defaultValue: "false", description: "Exibe uma opção indisponível sem permitir seleção." },
    ],
    examples: [{ title: "Opções agrupadas", description: "Agrupe alternativas relacionadas; busca e múltipla seleção ficam para uma evolução posterior.", preview: <Field.Root><Field.Label htmlFor="environment">Ambiente</Field.Label><Select.Root id="environment" defaultValue="production"><Select.Trigger><Select.Value placeholder="Selecione um ambiente" /></Select.Trigger><Select.Content><Select.Group><Select.GroupLabel>Ambientes ativos</Select.GroupLabel><Select.Item value="production">Produção</Select.Item><Select.Item value="staging">Homologação</Select.Item></Select.Group><Select.Group><Select.GroupLabel>Indisponível</Select.GroupLabel><Select.Item value="legacy" disabled>Legado</Select.Item></Select.Group></Select.Content></Select.Root></Field.Root>, code: '<Select.Root defaultValue="production">\n  <Select.Trigger><Select.Value placeholder="Selecione" /></Select.Trigger>\n  <Select.Content>\n    <Select.Group>\n      <Select.GroupLabel>Ambientes ativos</Select.GroupLabel>\n      <Select.Item value="production">Produção</Select.Item>\n    </Select.Group>\n  </Select.Content>\n</Select.Root>' }],
  },
  {
    id: "textarea",
    title: "Textarea",
    summary: "Campo multilinha para observações, justificativas e mensagens que exigem mais contexto.",
    importCode: 'import { Field, Textarea } from "@arcsyn/react";',
    status: "React estável",
    anatomy: ["Field opcional", "Textarea", "Placeholder ou valor", "Feedback de validação"],
    accessibility: "Associe sempre um label. O estado invalid comunica aria-invalid e o erro deve ser referenciado com aria-describedby.",
    properties: [
      { name: "invalid", type: "boolean", defaultValue: "false", description: "Aplica aria-invalid e a borda de erro." },
      { name: "rows", type: "number", defaultValue: "—", description: "Define a altura inicial em linhas." },
      { name: "disabled", type: "boolean", defaultValue: "false", description: "Desabilita edição." },
      { name: "...textareaProps", type: "TextareaHTMLAttributes<HTMLTextAreaElement>", defaultValue: "—", description: "Inclui value, onChange, maxLength e atributos nativos." },
    ],
    examples: [{ title: "Justificativa", description: "Use para conteúdo textual que não cabe em uma linha.", preview: <Field.Root><Field.Label htmlFor="reason">Justificativa</Field.Label><Textarea id="reason" rows={4} placeholder="Descreva a solicitação" /><Field.Description>Não inclua dados pessoais ou credenciais.</Field.Description></Field.Root>, code: '<Field.Root>\n  <Field.Label htmlFor="reason">Justificativa</Field.Label>\n  <Textarea id="reason" rows={4} />\n</Field.Root>' }],
  },
  {
    id: "checkbox",
    title: "Checkbox",
    summary: "Controle uma escolha independente, confirmação ou aceite explícito.",
    importCode: 'import { Checkbox, Field } from "@arcsyn/react";',
    status: "React estável",
    anatomy: ["Input checkbox nativo", "Indicador de seleção", "Label associado opcional"],
    accessibility: "É um checkbox nativo. Use um label associado por htmlFor; nunca dependa somente do símbolo de seleção.",
    properties: [
      { name: "checked / defaultChecked", type: "boolean", defaultValue: "false", description: "Controla ou define o estado inicial." },
      { name: "invalid", type: "boolean", defaultValue: "false", description: "Aplica aria-invalid e o estado visual de erro." },
      { name: "disabled", type: "boolean", defaultValue: "false", description: "Bloqueia interação." },
    ],
    examples: [{ title: "Confirmação", description: "Use quando a pessoa pode aceitar ou recusar uma condição independente.", preview: <div className="docs-demo-row"><Checkbox id="terms" defaultChecked /><Field.Label htmlFor="terms">Confirmo a revisão dos dados</Field.Label><Checkbox id="locked-option" disabled /><Field.Label htmlFor="locked-option">Opção indisponível</Field.Label></div>, code: '<Checkbox id="terms" defaultChecked />\n<Field.Label htmlFor="terms">Confirmo a revisão dos dados</Field.Label>' }],
  },
  {
    id: "switch",
    title: "Switch",
    summary: "Alterna imediatamente uma configuração entre ligada e desligada.",
    importCode: 'import { Field, Switch } from "@arcsyn/react";',
    status: "React estável",
    anatomy: ["Input com role switch", "Indicador móvel", "Label associado opcional"],
    accessibility: "Use Switch apenas para mudanças instantâneas. Ele expõe role=switch; associe um label e deixe o estado claro no contexto.",
    properties: [
      { name: "checked / defaultChecked", type: "boolean", defaultValue: "false", description: "Controla ou define o estado inicial." },
      { name: "disabled", type: "boolean", defaultValue: "false", description: "Bloqueia interação." },
      { name: "...inputProps", type: "InputHTMLAttributes<HTMLInputElement>", defaultValue: "—", description: "Inclui onChange, name e atributos nativos." },
    ],
    examples: [{ title: "Preferência imediata", description: "A mudança é aplicada assim que o controle é alternado.", preview: <div className="docs-demo-row"><Switch id="notifications" defaultChecked /><Field.Label htmlFor="notifications">Receber alertas operacionais</Field.Label><Switch id="locked-switch" disabled /><Field.Label htmlFor="locked-switch">Bloqueado</Field.Label></div>, code: '<Switch id="notifications" defaultChecked />\n<Field.Label htmlFor="notifications">Receber alertas operacionais</Field.Label>' }],
  },
  {
    id: "card",
    title: "Card",
    summary: "Agrupa informações relacionadas em uma superfície elevada, com hierarquia definida por bordas e contraste.",
    importCode: 'import { Card } from "@arcsyn/react";',
    status: "React estável",
    anatomy: ["Container", "Conteúdo livre", "Ações opcionais"],
    accessibility: "Card é um container sem semântica própria. Escolha section, article ou outro elemento semântico usando as propriedades HTML apropriadas quando o conteúdo exigir.",
    properties: [
      { name: "children", type: "ReactNode", defaultValue: "—", description: "Conteúdo exibido dentro do container." },
      { name: "className", type: "string", defaultValue: "—", description: "Complementa o layout do conteúdo interno." },
      { name: "...divProps", type: "HTMLAttributes<HTMLDivElement>", defaultValue: "—", description: "Inclui id, role, aria-* e demais atributos nativos de div." },
    ],
    examples: [
      {
        title: "Resumo operacional",
        description: "Use spacing interno controlado por layout, sem adicionar sombras pesadas.",
        preview: <Card className="docs-card-example"><div><p className="docs-card-eyebrow">Ambiente</p><strong>Produção</strong></div><Badge variant="success">Operacional</Badge><p className="docs-card-copy">Todos os serviços respondem dentro do SLA acordado.</p></Card>,
        code: '<Card>\n  <Badge variant="success">Operacional</Badge>\n  <strong>Produção</strong>\n  <p>Todos os serviços respondem dentro do SLA.</p>\n</Card>',
      },
    ],
  },
  {
    id: "badge",
    title: "Badge",
    summary: "Rótulo curto para status, classificação ou metadado. Não use como ação clicável.",
    importCode: 'import { Badge } from "@arcsyn/react";',
    status: "React estável",
    anatomy: ["Elemento span", "Rótulo curto"],
    accessibility: "O conteúdo deve fazer sentido sem depender apenas da cor. Prefira textos como Operacional, Atenção ou Bloqueado.",
    properties: [
      { name: "variant", type: '"neutral" | "accent" | "success" | "warning" | "danger"', defaultValue: '"neutral"', description: "Aplica uma cor de significado ao rótulo." },
      { name: "children", type: "ReactNode", defaultValue: "—", description: "Texto ou conteúdo curto do badge." },
      { name: "...spanProps", type: "HTMLAttributes<HTMLSpanElement>", defaultValue: "—", description: "Inclui id, aria-* e demais atributos nativos de span." },
    ],
    examples: [
      {
        title: "Estados de operação",
        description: "As cores servem de reforço semântico, não como única forma de comunicação.",
        preview: <div className="docs-demo-row"><Badge>Rascunho</Badge><Badge variant="accent">Em revisão</Badge><Badge variant="success">Operacional</Badge><Badge variant="warning">Atenção</Badge><Badge variant="danger">Bloqueado</Badge></div>,
        code: '<Badge>Rascunho</Badge>\n<Badge variant="accent">Em revisão</Badge>\n<Badge variant="success">Operacional</Badge>\n<Badge variant="warning">Atenção</Badge>\n<Badge variant="danger">Bloqueado</Badge>',
      },
    ],
  },
  {
    id: "dialog",
    title: "Dialog",
    summary: "Foca uma tarefa ou decisão sem levar a pessoa para outra página.",
    importCode: 'import { Dialog } from "@arcsyn/react";',
    status: "React estável · Base UI",
    anatomy: ["Root e Trigger", "Backdrop e camada de foco", "Content", "Header: Title e Description", "Footer e Close"],
    accessibility: "A primitive Base UI move e restringe o foco dentro do diálogo, bloqueia a página ao fundo e suporta fechamento por Escape. Sempre inclua Title, Description e uma ação de fechamento dentro do conteúdo.",
    properties: [
      { name: "Dialog.Root.open", type: "boolean", defaultValue: "—", description: "Controla a visibilidade do diálogo." },
      { name: "Dialog.Root.defaultOpen", type: "boolean", defaultValue: "false", description: "Define o estado inicial não controlado." },
      { name: "Dialog.Root.onOpenChange", type: "(open: boolean) => void", defaultValue: "—", description: "Recebe mudanças causadas pelo trigger, Escape, backdrop ou Close." },
      { name: "Dialog.Root.modal", type: "boolean | 'trap-focus'", defaultValue: "true", description: "Controla bloqueio do fundo, scroll e contenção de foco." },
      { name: "Dialog.Trigger.variant", type: "ButtonVariant", defaultValue: '"primary"', description: "Aplica uma variante oficial de Button ao trigger." },
      { name: "Dialog.Trigger.size", type: "ButtonSize", defaultValue: '"md"', description: "Aplica um tamanho oficial de Button ao trigger." },
      { name: "Dialog.Content.className", type: "string", defaultValue: "—", description: "Complementa o layout interno sem remover a estrutura acessível." },
      { name: "Dialog.Close.variant", type: "ButtonVariant", defaultValue: '"secondary"', description: "Define o tratamento visual da ação de fechamento." },
    ],
    examples: [
      {
        title: "Decisão com confirmação",
        description: "Mantenha o título específico, a consequência clara e as ações no rodapé.",
        preview: <Dialog.Root><Dialog.Trigger variant="danger">Excluir projeto</Dialog.Trigger><Dialog.Content><Dialog.Header><Dialog.Title>Excluir projeto?</Dialog.Title><Dialog.Description>Esta ação remove o projeto e não pode ser desfeita.</Dialog.Description></Dialog.Header><Dialog.Footer><Dialog.Close>Cancelar</Dialog.Close><Dialog.Close variant="danger">Excluir</Dialog.Close></Dialog.Footer></Dialog.Content></Dialog.Root>,
        code: '<Dialog.Root>\n  <Dialog.Trigger variant="danger">Excluir projeto</Dialog.Trigger>\n  <Dialog.Content>\n    <Dialog.Header>\n      <Dialog.Title>Excluir projeto?</Dialog.Title>\n      <Dialog.Description>Esta ação não pode ser desfeita.</Dialog.Description>\n    </Dialog.Header>\n    <Dialog.Footer>\n      <Dialog.Close>Cancelar</Dialog.Close>\n      <Dialog.Close variant="danger">Excluir</Dialog.Close>\n    </Dialog.Footer>\n  </Dialog.Content>\n</Dialog.Root>',
      },
      {
        title: "Trigger de apoio",
        description: "Use outline quando a abertura do diálogo for uma ação secundária no contexto.",
        preview: <Dialog.Root><Dialog.Trigger variant="outline">Ver detalhes</Dialog.Trigger><Dialog.Content><Dialog.Header><Dialog.Title>Detalhes da integração</Dialog.Title><Dialog.Description>A sincronização ocorre diariamente às 09:00 e mantém os últimos 30 dias de histórico.</Dialog.Description></Dialog.Header><Dialog.Footer><Dialog.Close>Fechar</Dialog.Close></Dialog.Footer></Dialog.Content></Dialog.Root>,
        code: '<Dialog.Root>\n  <Dialog.Trigger variant="outline">Ver detalhes</Dialog.Trigger>\n  <Dialog.Content>…</Dialog.Content>\n</Dialog.Root>',
      },
    ],
  },
  {
    id: "spinner",
    title: "Spinner",
    summary: "Indicador visual de processamento para ações ou áreas que estão carregando.",
    importCode: 'import { Spinner } from "@arcsyn/react";',
    status: "React estável",
    anatomy: ["Elemento span", "Anel animado", "Rótulo acessível opcional"],
    accessibility: "Por padrão, o Spinner é ocultado de tecnologias assistivas. Use label quando ele for a única indicação de carregamento; dentro do Button, o rótulo do próprio botão já comunica o contexto.",
    properties: [
      { name: "size", type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: "Controla o diâmetro do indicador." },
      { name: "label", type: "string", defaultValue: "—", description: "Fornece um nome acessível e ativa role=status." },
      { name: "className", type: "string", defaultValue: "—", description: "Acrescenta classes sem remover a animação e a geometria base." },
      { name: "...spanProps", type: "HTMLAttributes<HTMLSpanElement>", defaultValue: "—", description: "Inclui id, aria-* e demais atributos nativos de span." },
    ],
    examples: [
      {
        title: "Tamanhos",
        description: "Use o tamanho pequeno para controles compactos. O tamanho médio é adequado para superfícies de conteúdo.",
        preview: <div className="docs-demo-row"><Spinner size="sm" label="Carregando" /><Spinner label="Carregando" /><Spinner size="lg" label="Carregando" /></div>,
        code: '<Spinner size="sm" label="Carregando" />\n<Spinner label="Carregando" />\n<Spinner size="lg" label="Carregando" />',
      },
      {
        title: "Em ações",
        description: "O Button adiciona o Spinner automaticamente ao receber loading.",
        preview: <div className="docs-demo-row"><Button loading>Salvando</Button><Button loading variant="outline">Sincronizando</Button></div>,
        code: '<Button loading>Salvando</Button>\n<Button loading variant="outline">Sincronizando</Button>',
      },
    ],
  },
  {
    id: "alert",
    title: "Alert",
    summary: "Comunica uma informação contextual, uma confirmação ou uma condição que precisa de atenção.",
    importCode: 'import { Alert } from "@arcsyn/react";',
    status: "React estável",
    anatomy: ["Container com role status", "Título obrigatório", "Descrição opcional", "Conteúdo adicional opcional"],
    accessibility: "O componente comunica atualizações com role=status. Para erros críticos que exigem atenção imediata, avalie um padrão específico com role=alert.",
    properties: [
      { name: "variant", type: '"info" | "success" | "warning" | "danger"', defaultValue: '"info"', description: "Define o significado visual da mensagem." },
      { name: "title", type: "ReactNode", defaultValue: "obrigatório", description: "Resumo conciso da mensagem." },
      { name: "description", type: "ReactNode", defaultValue: "—", description: "Detalhamento opcional da condição e da próxima ação." },
      { name: "children", type: "ReactNode", defaultValue: "—", description: "Conteúdo adicional após a descrição." },
      { name: "...divProps", type: "HTMLAttributes<HTMLDivElement>", defaultValue: "—", description: "Inclui id, aria-* e demais atributos nativos de div." },
    ],
    examples: [
      {
        title: "Mensagens de contexto",
        description: "Use título direto e descrição acionável. Evite empilhar muitos alertas na mesma tela.",
        preview: <div className="docs-demo-stack"><Alert title="Alterações salvas" description="A versão atual já está disponível para a equipe." variant="success" /><Alert title="Aprovação pendente" description="Revise os itens marcados antes de publicar." variant="warning" /><Alert title="Integração indisponível" description="Tente novamente ou acione o time responsável." variant="danger" /></div>,
        code: '<Alert\n  variant="success"\n  title="Alterações salvas"\n  description="A versão atual já está disponível para a equipe."\n/>',
      },
    ],
  },
];

function currentRoute() {
  return window.location.hash.replace(/^#/, "") || "/";
}

function useRoute() {
  const [route, setRoute] = useState(currentRoute);

  useEffect(() => {
    const updateRoute = () => setRoute(currentRoute());
    window.addEventListener("hashchange", updateRoute);
    return () => window.removeEventListener("hashchange", updateRoute);
  }, []);

  return route;
}

function ComponentDocumentation({ page }: { page: ComponentPage }) {
  return (
    <article className="docs-page">
      <header className="docs-page-header">
        <p className="docs-eyebrow">Componente</p>
        <div className="docs-page-title-row">
          <div><h1>{page.title}</h1><p>{page.summary}</p></div>
          <span className="docs-status">{page.status}</span>
        </div>
      </header>

      <section className="docs-section" aria-labelledby={`${page.id}-usage`}>
        <div className="docs-section-heading"><p className="docs-eyebrow">Uso</p><h2 id={`${page.id}-usage`}>Importação e anatomia</h2></div>
        <div className="docs-overview-grid">
          <pre className="docs-code"><code>{page.importCode}</code></pre>
          <ol className="docs-anatomy">{page.anatomy.map((item, index) => <li key={item}><span>{index + 1}</span>{item}</li>)}</ol>
        </div>
      </section>

      <section className="docs-section" aria-labelledby={`${page.id}-props`}>
        <div className="docs-section-heading"><p className="docs-eyebrow">API</p><h2 id={`${page.id}-props`}>Propriedades</h2></div>
        <div className="docs-table-wrap"><table><thead><tr><th>Propriedade</th><th>Tipo</th><th>Padrão</th><th>Descrição</th></tr></thead><tbody>{page.properties.map((property) => <tr key={property.name}><td><code>{property.name}</code></td><td><code>{property.type}</code></td><td>{property.defaultValue}</td><td>{property.description}</td></tr>)}</tbody></table></div>
      </section>

      <section className="docs-section" aria-labelledby={`${page.id}-examples`}>
        <div className="docs-section-heading"><p className="docs-eyebrow">Referência</p><h2 id={`${page.id}-examples`}>Exemplos</h2></div>
        <div className="docs-example-list">{page.examples.map((example) => <section className="docs-example" key={example.title}><div className="docs-example-copy"><h3>{example.title}</h3><p>{example.description}</p></div><div className="docs-preview">{example.preview}</div><pre className="docs-code"><code>{example.code}</code></pre></section>)}</div>
      </section>

      <section className="docs-section docs-accessibility" aria-labelledby={`${page.id}-accessibility`}>
        <p className="docs-eyebrow">Acessibilidade</p><h2 id={`${page.id}-accessibility`}>Orientação</h2><p>{page.accessibility}</p>
      </section>
    </article>
  );
}

function HomePage() {
  return (
    <article className="docs-page">
      <header className="docs-page-header">
        <p className="docs-eyebrow">ArcSyn Design System</p>
        <h1>Documentação de componentes</h1>
        <p>Uma base compacta e corporativa, construída sobre tokens agnósticos, CSS compartilhado e adaptadores de framework.</p>
      </header>
      <section className="docs-section" aria-labelledby="foundations-title">
        <div className="docs-section-heading"><p className="docs-eyebrow">Fundação</p><h2 id="foundations-title">Princípios de implementação</h2></div>
        <div className="docs-principles"><Card><strong>Tokens primeiro</strong><p>Valores de cor, espaço, radius e sombra são a fonte comum para todos os frameworks.</p></Card><Card><strong>CSS como contrato</strong><p>Estados e variantes usam atributos data-*, mantendo a linguagem visual consistente.</p></Card><Card><strong>Adaptadores idiomáticos</strong><p>React entrega comportamento e acessibilidade sem duplicar decisões de aparência.</p></Card><Card><strong>Mobile nativo</strong><p>React Native recebe tokens em pixels e componentes que respeitam toque, teclado e APIs de acessibilidade nativas.</p></Card></div>
      </section>
      <section className="docs-section" aria-labelledby="catalog-title">
        <div className="docs-section-heading"><p className="docs-eyebrow">Catálogo</p><h2 id="catalog-title">Componentes disponíveis</h2></div>
        <div className="docs-catalog">{componentPages.map((page) => <a className="docs-catalog-card" href={`#/components/${page.id}`} key={page.id}><span className="docs-status">{page.status}</span><h3>{page.title}</h3><p>{page.summary}</p><span className="docs-link">Ver documentação →</span></a>)}</div>
      </section>
    </article>
  );
}

export function DocsApp() {
  const route = useRoute();
  const page = componentPages.find((item) => route === `/components/${item.id}`);

  useEffect(() => {
    document.title = page ? `${page.title} · ArcSyn DS` : "ArcSyn Design System";
  }, [page]);

  return (
    <div className="docs-shell">
      <div className="docs-layout">
        <aside className="docs-sidebar">
          <a className="docs-brand" href="#/">Arc<span>Syn</span><small>Design System</small></a>
          <nav className="docs-nav" aria-label="Documentação"><a className={route === "/" ? "is-active" : ""} href="#/">Visão geral</a><p>Componentes</p>{componentPages.map((item) => <a className={page?.id === item.id ? "is-active" : ""} href={`#/components/${item.id}`} key={item.id}>{item.title}</a>)}</nav>
          <div className="docs-sidebar-footer"><span>v0.1.0</span><span>React</span></div>
        </aside>
        <main className="docs-main">{page ? <ComponentDocumentation page={page} /> : <HomePage />}</main>
      </div>
    </div>
  );
}
