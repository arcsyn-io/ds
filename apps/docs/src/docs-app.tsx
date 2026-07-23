import { useEffect, useState, type ReactNode } from "react";
import { Accordion, Alert, AspectRatio, Attachment, AttachmentAction, AttachmentActions, AttachmentContent, AttachmentDescription, AttachmentGroup, AttachmentMedia, AttachmentTitle, AttachmentTrigger, Avatar, Badge, Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, Button, Card, Carousel, Checkbox, Collapsible, ContextMenu, Dialog, DropdownMenu, Field, Input, InputGroup, Kbd, Popover, RadioGroup, ScrollArea, Select, SelectSearch, Separator, Spinner, Switch, Textarea } from "@arcsyn/react";

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

function ControlledCarouselDemo() {
  const [index, setIndex] = useState(0);
  return <div className="docs-demo-stack"><Carousel index={index} onIndexChange={setIndex} label="Etapas do processo" items={[<div className="docs-carousel-slide"><strong>1. Solicitação</strong><span>Dados enviados para análise.</span></div>, <div className="docs-carousel-slide"><strong>2. Aprovação</strong><span>Revisão do responsável pela área.</span></div>, <div className="docs-carousel-slide"><strong>3. Execução</strong><span>Iniciada após a aprovação.</span></div>]} /><span className="docs-muted-copy">Índice controlado: {index}</span></div>;
}

function ControlledCollapsibleDemo() {
  const [open, setOpen] = useState(false);
  return <div className="docs-demo-stack"><Button variant="ghost" size="sm" onClick={() => setOpen((current) => !current)}>{open ? "Fechar externamente" : "Abrir externamente"}</Button><Collapsible.Root open={open} onOpenChange={setOpen}><Collapsible.Trigger>Detalhes controlados</Collapsible.Trigger><Collapsible.Panel>O estado também pode ser alterado pelo botão externo.</Collapsible.Panel></Collapsible.Root></div>;
}

const componentPages: ComponentPage[] = [
  {
    id: "accordion", title: "Accordion", summary: "Organiza blocos relacionados de conteúdo em seções expansíveis.", importCode: 'import { Accordion } from "@arcsyn/react";', status: "React estável · Base UI · React Native",
    anatomy: ["Root", "Item identificado por value", "Header e Trigger", "Panel expansível"],
    accessibility: "Base UI associa cada trigger ao painel, comunica o estado expandido e mantém botões nativos no fluxo de foco. Os títulos devem descrever o conteúdo oculto; não coloque ações independentes dentro do Trigger.",
    properties: [
      { name: "Accordion.Root.value", type: "string[]", defaultValue: "—", description: "Controla os itens abertos." },
      { name: "Accordion.Root.defaultValue", type: "string[]", defaultValue: "[]", description: "Define os itens inicialmente abertos." },
      { name: "Accordion.Root.multiple", type: "boolean", defaultValue: "false", description: "Permite manter mais de uma seção aberta." },
      { name: "Accordion.Root.disabled", type: "boolean", defaultValue: "false", description: "Desabilita todos os itens do conjunto." },
      { name: "Accordion.Root.keepMounted", type: "boolean", defaultValue: "false", description: "Mantém painéis fechados no DOM quando seu estado interno precisa ser preservado." },
      { name: "Accordion.Root.hiddenUntilFound", type: "boolean", defaultValue: "false", description: "Permite que a busca nativa da página encontre e revele conteúdo fechado." },
      { name: "Accordion.Root.onValueChange", type: "(value: string[]) => void", defaultValue: "—", description: "Recebe a lista atualizada de itens abertos." },
      { name: "Accordion.Item.value", type: "string", defaultValue: "—", description: "Identifica a seção para controle de estado." },
      { name: "Accordion.Item.disabled", type: "boolean", defaultValue: "false", description: "Impede a expansão de uma seção." },
    ],
    examples: [
      { title: "Seleção única", description: "No comportamento padrão, abrir uma seção fecha a anterior. O primeiro item pode começar expandido com defaultValue.", preview: <Accordion.Root defaultValue={["access"]}><Accordion.Item value="access"><Accordion.Header><Accordion.Trigger>Como solicitar acesso?</Accordion.Trigger></Accordion.Header><Accordion.Panel>Abra uma solicitação com o sistema e o perfil necessários. A aprovação segue para o responsável da área.</Accordion.Panel></Accordion.Item><Accordion.Item value="sla"><Accordion.Header><Accordion.Trigger>Qual é o prazo de atendimento?</Accordion.Trigger></Accordion.Header><Accordion.Panel>Solicitações padrão são analisadas em até dois dias úteis.</Accordion.Panel></Accordion.Item></Accordion.Root>, code: '<Accordion.Root defaultValue={["access"]}>\n  <Accordion.Item value="access">…</Accordion.Item>\n  <Accordion.Item value="sla">…</Accordion.Item>\n</Accordion.Root>' },
      { title: "Múltiplas seções", description: "Use multiple quando a pessoa precisar comparar informações entre seções abertas.", preview: <Accordion.Root multiple defaultValue={["scope", "billing"]}><Accordion.Item value="scope"><Accordion.Header><Accordion.Trigger>Escopo contratado</Accordion.Trigger></Accordion.Header><Accordion.Panel>Ambientes de produção e homologação, com retenção de 90 dias.</Accordion.Panel></Accordion.Item><Accordion.Item value="billing"><Accordion.Header><Accordion.Trigger>Faturamento</Accordion.Trigger></Accordion.Header><Accordion.Panel>Cobrança mensal vinculada ao centro de custo CC-1042.</Accordion.Panel></Accordion.Item><Accordion.Item value="support"><Accordion.Header><Accordion.Trigger>Suporte</Accordion.Trigger></Accordion.Header><Accordion.Panel>Atendimento em horário comercial com SLA de quatro horas.</Accordion.Panel></Accordion.Item></Accordion.Root>, code: '<Accordion.Root multiple defaultValue={["scope", "billing"]}>\n  <Accordion.Item value="scope">…</Accordion.Item>\n  <Accordion.Item value="billing">…</Accordion.Item>\n</Accordion.Root>' },
      { title: "Item e conjunto desabilitados", description: "Desabilite um Item para uma exceção pontual ou o Root quando todo o conteúdo estiver temporariamente indisponível.", preview: <div className="docs-demo-stack"><Accordion.Root><Accordion.Item value="active"><Accordion.Header><Accordion.Trigger>Política atual</Accordion.Trigger></Accordion.Header><Accordion.Panel>Versão aprovada em julho.</Accordion.Panel></Accordion.Item><Accordion.Item value="future" disabled><Accordion.Header><Accordion.Trigger>Política futura — indisponível</Accordion.Trigger></Accordion.Header><Accordion.Panel>Em revisão.</Accordion.Panel></Accordion.Item></Accordion.Root><Accordion.Root disabled><Accordion.Item value="locked"><Accordion.Header><Accordion.Trigger>Configuração bloqueada</Accordion.Trigger></Accordion.Header><Accordion.Panel>Sem permissão.</Accordion.Panel></Accordion.Item></Accordion.Root></div>, code: '<Accordion.Item value="future" disabled>…</Accordion.Item>\n\n<Accordion.Root disabled>…</Accordion.Root>' },
    ],
  },
  {
    id: "carousel", title: "Carousel", summary: "Apresenta uma sequência curta de conteúdos, um item por vez, com controles explícitos.", importCode: 'import { Carousel } from "@arcsyn/react";', status: "React estável · React Native",
    anatomy: ["Região nomeada", "Viewport", "Slide ativo", "Controles anterior e próximo", "Indicador de posição"],
    accessibility: "Informe label, mantenha os controles visíveis e não avance automaticamente. O componente anuncia a posição, aceita setas, Home e End no web e desabilita controles nos limites quando loop é false.",
    properties: [
      { name: "items", type: "ReactNode[]", defaultValue: "—", description: "Conteúdo ordenado dos slides." },
      { name: "label", type: "string", defaultValue: "—", description: "Nome acessível da região do carrossel." },
      { name: "index / initialIndex", type: "number", defaultValue: "0", description: "Controla ou inicializa o slide ativo." },
      { name: "onIndexChange", type: "(index: number) => void", defaultValue: "—", description: "Recebe mudanças de slide." },
      { name: "loop", type: "boolean", defaultValue: "false", description: "Conecta o último slide ao primeiro." },
      { name: "className", type: "string", defaultValue: "—", description: "Permite complementar dimensões e layout do carrossel." },
    ],
    examples: [
      { title: "Sequência com limites", description: "Por padrão, os controles são desabilitados no primeiro e no último slide. Cada slide deve funcionar como uma unidade autônoma.", preview: <Carousel label="Indicadores do trimestre" items={[<div className="docs-carousel-slide"><Badge variant="success">Operacional</Badge><strong>Disponibilidade</strong><span>99,98% nos últimos 30 dias</span></div>, <div className="docs-carousel-slide"><Badge variant="warning">Atenção</Badge><strong>Fila de eventos</strong><span>12 itens aguardando revisão</span></div>, <div className="docs-carousel-slide"><Badge>Planejado</Badge><strong>Próxima manutenção</strong><span>28 de julho, às 22:00</span></div>]} />, code: '<Carousel\n  label="Indicadores do trimestre"\n  items={[<StatusCard />, <QueueCard />, <MaintenanceCard />]}\n/>' },
      { title: "Navegação circular", description: "loop mantém os dois controles ativos e conecta o último slide ao primeiro. initialIndex escolhe o ponto inicial.", preview: <Carousel loop initialIndex={1} label="Ambientes disponíveis" items={[<div className="docs-carousel-slide"><Badge>Desenvolvimento</Badge><strong>dev-br-01</strong><span>Dados sintéticos · acesso amplo</span></div>, <div className="docs-carousel-slide"><Badge variant="warning">Homologação</Badge><strong>stg-br-01</strong><span>Dados mascarados · acesso restrito</span></div>, <div className="docs-carousel-slide"><Badge variant="success">Produção</Badge><strong>prd-br-01</strong><span>Operacional · acesso auditado</span></div>]} />, code: '<Carousel loop initialIndex={1} label="Ambientes disponíveis" items={environments} />' },
      { title: "Estado vazio", description: "Uma lista vazia mantém a região e apresenta 0 de 0 com ambos os controles indisponíveis. Prefira complementar o contexto com uma mensagem adjacente.", preview: <div className="docs-demo-stack"><Carousel label="Anexos recentes" items={[]} /><span className="docs-muted-copy">Nenhum anexo disponível para este registro.</span></div>, code: '<Carousel label="Anexos recentes" items={[]} />' },
      { title: "Uso controlado", description: "Use index e onIndexChange quando outra parte da interface precisar conhecer ou alterar o slide ativo.", preview: <ControlledCarouselDemo />, code: 'const [index, setIndex] = useState(0);\n\n<Carousel index={index} onIndexChange={setIndex} label="Etapas" items={steps} />' },
    ],
  },
  {
    id: "collapsible", title: "Collapsible", summary: "Revela conteúdo complementar sob demanda sem criar um conjunto de seções.", importCode: 'import { Collapsible } from "@arcsyn/react";', status: "React estável · Base UI · React Native",
    anatomy: ["Root", "Trigger", "Panel"],
    accessibility: "O Trigger é um botão associado ao Panel e comunica aria-expanded. Use Collapsible para um único bloco; quando houver várias seções relacionadas, prefira Accordion.",
    properties: [
      { name: "Collapsible.Root.open", type: "boolean", defaultValue: "—", description: "Controla a visibilidade do painel." },
      { name: "Collapsible.Root.defaultOpen", type: "boolean", defaultValue: "false", description: "Define o estado inicial não controlado." },
      { name: "Collapsible.Root.onOpenChange", type: "(open: boolean) => void", defaultValue: "—", description: "Recebe mudanças de abertura." },
      { name: "Collapsible.Root.disabled", type: "boolean", defaultValue: "false", description: "Desabilita a expansão." },
      { name: "Collapsible.Panel.keepMounted", type: "boolean", defaultValue: "false", description: "Mantém o conteúdo no DOM enquanto fechado para preservar estado interno." },
      { name: "Collapsible.Trigger.children", type: "ReactNode", defaultValue: "—", description: "Rótulo que descreve o conteúdo revelado." },
    ],
    examples: [
      { title: "Fechado por padrão", description: "Use para informação secundária que deve permanecer disponível sem ocupar espaço inicialmente.", preview: <Collapsible.Root><Collapsible.Trigger>Metadados da execução</Collapsible.Trigger><Collapsible.Panel>ID: run_8F2A · Região: sa-east-1 · Duração: 4m 12s</Collapsible.Panel></Collapsible.Root>, code: '<Collapsible.Root>\n  <Collapsible.Trigger>Metadados da execução</Collapsible.Trigger>\n  <Collapsible.Panel>ID: run_8F2A · Região: sa-east-1</Collapsible.Panel>\n</Collapsible.Root>' },
      { title: "Aberto inicialmente", description: "defaultOpen revela o conteúdo na primeira renderização e continua permitindo controle pelo próprio trigger.", preview: <Collapsible.Root defaultOpen><Collapsible.Trigger>Critérios aplicados</Collapsible.Trigger><Collapsible.Panel>Região: Brasil · Status: operacional · Período: últimos 30 dias.</Collapsible.Panel></Collapsible.Root>, code: '<Collapsible.Root defaultOpen>\n  <Collapsible.Trigger>Critérios aplicados</Collapsible.Trigger>\n  <Collapsible.Panel>…</Collapsible.Panel>\n</Collapsible.Root>' },
      { title: "Estado controlado", description: "open e onOpenChange permitem sincronizar a expansão com controles externos ou com o estado da página.", preview: <ControlledCollapsibleDemo />, code: 'const [open, setOpen] = useState(false);\n\n<Collapsible.Root open={open} onOpenChange={setOpen}>…</Collapsible.Root>' },
      { title: "Desabilitado", description: "O conteúdo permanece recolhido e o trigger comunica que a expansão não está disponível.", preview: <Collapsible.Root disabled><Collapsible.Trigger>Logs restritos</Collapsible.Trigger><Collapsible.Panel>Conteúdo protegido.</Collapsible.Panel></Collapsible.Root>, code: '<Collapsible.Root disabled>\n  <Collapsible.Trigger>Logs restritos</Collapsible.Trigger>\n  <Collapsible.Panel>…</Collapsible.Panel>\n</Collapsible.Root>' },
    ],
  },
  {
    id: "popover", title: "Popover", summary: "Exibe contexto ou controles leves ancorados a um trigger, sem interromper toda a página.", importCode: 'import { Popover } from "@arcsyn/react";', status: "React estável · Base UI · React Native",
    anatomy: ["Root e Trigger", "Portal e Positioner", "Content", "Title e Description", "Close e Footer opcionais"],
    accessibility: "Inclua Title e Description quando o conteúdo exigir contexto. Base UI gerencia foco, Escape e clique externo; em modo modal, inclua sempre Close. No React Native, o conteúdo abre em Modal centralizado.",
    properties: [
      { name: "Popover.Root.open", type: "boolean", defaultValue: "—", description: "Controla a abertura." },
      { name: "Popover.Root.defaultOpen", type: "boolean", defaultValue: "false", description: "Define o estado inicial não controlado." },
      { name: "Popover.Root.onOpenChange", type: "(open: boolean) => void", defaultValue: "—", description: "Recebe abertura e fechamento por trigger, Escape, Close ou interação externa." },
      { name: "Popover.Root.modal", type: "boolean | 'trap-focus'", defaultValue: "false", description: "Define o bloqueio e contenção de foco." },
      { name: "Popover.Trigger.variant", type: "ButtonVariant", defaultValue: '"secondary"', description: "Aplica uma variante oficial de Button." },
      { name: "Popover.Trigger.size", type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: "Aplica um tamanho oficial de Button ao trigger." },
      { name: "Popover.Trigger.openOnHover", type: "boolean", defaultValue: "false", description: "Também abre ao passar o ponteiro ou focar; preserve suporte por clique." },
      { name: "Popover.Content.initialFocus", type: "boolean | RefObject | function", defaultValue: "—", description: "Configura o foco ao abrir." },
    ],
    examples: [
      { title: "Informativo não modal", description: "O comportamento padrão permite continuar interagindo com a página e fecha por Escape ou clique externo.", preview: <Popover.Root><Popover.Trigger>Última sincronização</Popover.Trigger><Popover.Content><Popover.Title>Sincronização concluída</Popover.Title><Popover.Description>Os dados foram atualizados hoje às 14:32, sem divergências.</Popover.Description><Popover.Footer><Popover.Close>Fechar</Popover.Close></Popover.Footer></Popover.Content></Popover.Root>, code: '<Popover.Root>\n  <Popover.Trigger>Última sincronização</Popover.Trigger>\n  <Popover.Content>\n    <Popover.Title>Sincronização concluída</Popover.Title>\n    <Popover.Description>Dados atualizados às 14:32.</Popover.Description>\n    <Popover.Close>Fechar</Popover.Close>\n  </Popover.Content>\n</Popover.Root>' },
      { title: "Triggers e tamanhos", description: "O trigger aceita todas as variantes e tamanhos de Button. Escolha a intensidade conforme a importância da abertura.", preview: <div className="docs-demo-row"><Popover.Root><Popover.Trigger size="sm" variant="ghost">Ajuda</Popover.Trigger><Popover.Content><Popover.Title>Ajuda contextual</Popover.Title><Popover.Description>Orientação curta para este campo.</Popover.Description></Popover.Content></Popover.Root><Popover.Root><Popover.Trigger variant="outline">Detalhes</Popover.Trigger><Popover.Content><Popover.Title>Detalhes</Popover.Title><Popover.Description>Informações complementares do registro.</Popover.Description></Popover.Content></Popover.Root><Popover.Root><Popover.Trigger size="lg" variant="primary">Configurar</Popover.Trigger><Popover.Content><Popover.Title>Configuração</Popover.Title><Popover.Description>Ajuste os parâmetros antes de continuar.</Popover.Description></Popover.Content></Popover.Root></div>, code: '<Popover.Trigger size="sm" variant="ghost">Ajuda</Popover.Trigger>\n<Popover.Trigger variant="outline">Detalhes</Popover.Trigger>\n<Popover.Trigger size="lg" variant="primary">Configurar</Popover.Trigger>' },
      { title: "Conteúdo interativo e modal", description: "Use modal quando a pequena tarefa exigir foco contido. Inclua sempre um Close para permitir saída explícita, inclusive em leitores de tela por toque.", preview: <Popover.Root modal><Popover.Trigger variant="outline">Renomear ambiente</Popover.Trigger><Popover.Content><Popover.Title>Renomear ambiente</Popover.Title><Popover.Description>O novo nome será exibido para toda a equipe.</Popover.Description><Field.Root><Field.Label htmlFor="popover-name">Nome</Field.Label><Input id="popover-name" defaultValue="Produção Brasil" /></Field.Root><Popover.Footer><Popover.Close>Cancelar</Popover.Close></Popover.Footer></Popover.Content></Popover.Root>, code: '<Popover.Root modal>\n  <Popover.Trigger>Renomear</Popover.Trigger>\n  <Popover.Content>\n    <Popover.Title>Renomear ambiente</Popover.Title>\n    <Input aria-label="Nome" />\n    <Popover.Close>Cancelar</Popover.Close>\n  </Popover.Content>\n</Popover.Root>' },
      { title: "Abertura por hover e foco", description: "openOnHover é útil para ajuda contextual, mas o trigger continua aceitando clique e teclado. Evite conteúdo essencial que desapareça ao mover o ponteiro.", preview: <Popover.Root><Popover.Trigger openOnHover delay={200} variant="ghost">O que é SLA?</Popover.Trigger><Popover.Content><Popover.Title>SLA</Popover.Title><Popover.Description>Prazo acordado para início e conclusão do atendimento.</Popover.Description></Popover.Content></Popover.Root>, code: '<Popover.Trigger openOnHover delay={200}>O que é SLA?</Popover.Trigger>' },
    ],
  },
  {
    id: "context-menu", title: "Context Menu", summary: "Disponibiliza ações diretamente relacionadas a uma área ou item por clique secundário ou toque prolongado.", importCode: 'import { ContextMenu } from "@arcsyn/react";', status: "React estável · Base UI · React Native",
    anatomy: ["Root", "Trigger de área", "Content posicionado", "Item, CheckboxItem ou RadioItem", "Label e Separator opcionais"],
    accessibility: "Base UI oferece teclado, foco e abertura por clique secundário ou toque prolongado. A página permanece visualmente disponível ao fundo; toda ação importante também deve existir por um caminho visível.",
    properties: [
      { name: "ContextMenu.Root.open", type: "boolean", defaultValue: "—", description: "Controla a abertura do menu." },
      { name: "ContextMenu.Root.defaultOpen", type: "boolean", defaultValue: "false", description: "Define o estado inicial não controlado." },
      { name: "ContextMenu.Root.onOpenChange", type: "(open: boolean) => void", defaultValue: "—", description: "Recebe mudanças causadas por clique secundário, toque prolongado, Escape ou seleção." },
      { name: "ContextMenu.Item.variant", type: '"default" | "danger"', defaultValue: '"default"', description: "Sinaliza uma ação destrutiva." },
      { name: "ContextMenu.Item.disabled", type: "boolean", defaultValue: "false", description: "Mantém uma ação visível, mas indisponível." },
      { name: "ContextMenu.CheckboxItem.checked", type: "boolean", defaultValue: "—", description: "Controla uma preferência independente." },
      { name: "ContextMenu.CheckboxItem.closeOnClick", type: "boolean", defaultValue: "false", description: "Define se o menu fecha após alternar a preferência." },
      { name: "ContextMenu.RadioGroup.value", type: "unknown", defaultValue: "—", description: "Controla a opção exclusiva selecionada." },
      { name: "ContextMenu.RadioItem.value", type: "unknown", defaultValue: "—", description: "Valor atribuído ao item dentro do RadioGroup." },
    ],
    examples: [
      { title: "Ações sobre um registro", description: "Clique com o botão direito ou mantenha pressionada a área para abrir ações comuns e uma ação destrutiva separada.", preview: <ContextMenu.Root><ContextMenu.Trigger className="docs-context-area" tabIndex={0}>Relatório financeiro · julho.pdf<br /><span>PDF · 1,8 MB</span></ContextMenu.Trigger><ContextMenu.Content><ContextMenu.Group><ContextMenu.Label>Arquivo</ContextMenu.Label><ContextMenu.Item>Abrir</ContextMenu.Item><ContextMenu.Item>Baixar <ContextMenu.Shortcut>⌘ S</ContextMenu.Shortcut></ContextMenu.Item><ContextMenu.Item disabled>Compartilhar — sem permissão</ContextMenu.Item></ContextMenu.Group><ContextMenu.Separator /><ContextMenu.Item variant="danger">Excluir</ContextMenu.Item></ContextMenu.Content></ContextMenu.Root>, code: '<ContextMenu.Content>\n  <ContextMenu.Group>\n    <ContextMenu.Label>Arquivo</ContextMenu.Label>\n    <ContextMenu.Item>Abrir</ContextMenu.Item>\n    <ContextMenu.Item disabled>Compartilhar</ContextMenu.Item>\n  </ContextMenu.Group>\n  <ContextMenu.Separator />\n  <ContextMenu.Item variant="danger">Excluir</ContextMenu.Item>\n</ContextMenu.Content>' },
      { title: "Preferências com checkbox", description: "CheckboxItem mantém opções independentes e, por padrão, não fecha o menu depois da alteração.", preview: <ContextMenu.Root><ContextMenu.Trigger className="docs-context-area" tabIndex={0}>Tabela de resultados<br /><span>Clique com o botão direito para configurar</span></ContextMenu.Trigger><ContextMenu.Content><ContextMenu.Group><ContextMenu.Label>Colunas visíveis</ContextMenu.Label><ContextMenu.CheckboxItem defaultChecked>Responsável</ContextMenu.CheckboxItem><ContextMenu.CheckboxItem defaultChecked>Status</ContextMenu.CheckboxItem><ContextMenu.CheckboxItem>Última atualização</ContextMenu.CheckboxItem></ContextMenu.Group></ContextMenu.Content></ContextMenu.Root>, code: '<ContextMenu.Group>\n  <ContextMenu.Label>Colunas visíveis</ContextMenu.Label>\n  <ContextMenu.CheckboxItem defaultChecked>Responsável</ContextMenu.CheckboxItem>\n  <ContextMenu.CheckboxItem>Status</ContextMenu.CheckboxItem>\n</ContextMenu.Group>' },
      { title: "Escolha exclusiva com radio", description: "RadioGroup organiza alternativas mutuamente exclusivas e mantém o indicador alinhado aos itens de checkbox.", preview: <ContextMenu.Root><ContextMenu.Trigger className="docs-context-area" tabIndex={0}>Ordenação atual: mais recentes<br /><span>Clique com o botão direito para alterar</span></ContextMenu.Trigger><ContextMenu.Content><ContextMenu.RadioGroup defaultValue="recent"><ContextMenu.Label>Ordenar por</ContextMenu.Label><ContextMenu.RadioItem value="recent">Mais recentes</ContextMenu.RadioItem><ContextMenu.RadioItem value="oldest">Mais antigos</ContextMenu.RadioItem><ContextMenu.RadioItem value="name">Nome</ContextMenu.RadioItem></ContextMenu.RadioGroup></ContextMenu.Content></ContextMenu.Root>, code: '<ContextMenu.RadioGroup defaultValue="recent">\n  <ContextMenu.Label>Ordenar por</ContextMenu.Label>\n  <ContextMenu.RadioItem value="recent">Mais recentes</ContextMenu.RadioItem>\n  <ContextMenu.RadioItem value="oldest">Mais antigos</ContextMenu.RadioItem>\n</ContextMenu.RadioGroup>' },
      { title: "Grupos e atalhos", description: "Labels e separadores criam hierarquia; Shortcut comunica uma tecla conhecida sem substituir o nome textual da ação.", preview: <ContextMenu.Root><ContextMenu.Trigger className="docs-context-area" tabIndex={0}>Editor de consulta<br /><span>Clique com o botão direito dentro da área</span></ContextMenu.Trigger><ContextMenu.Content><ContextMenu.Group><ContextMenu.Label>Edição</ContextMenu.Label><ContextMenu.Item>Copiar <ContextMenu.Shortcut>⌘ C</ContextMenu.Shortcut></ContextMenu.Item><ContextMenu.Item>Colar <ContextMenu.Shortcut>⌘ V</ContextMenu.Shortcut></ContextMenu.Item></ContextMenu.Group><ContextMenu.Separator /><ContextMenu.Group><ContextMenu.Label>Consulta</ContextMenu.Label><ContextMenu.Item>Executar <ContextMenu.Shortcut>⌘ Enter</ContextMenu.Shortcut></ContextMenu.Item></ContextMenu.Group></ContextMenu.Content></ContextMenu.Root>, code: '<ContextMenu.Group>\n  <ContextMenu.Label>Edição</ContextMenu.Label>\n  <ContextMenu.Item>Copiar <ContextMenu.Shortcut>⌘ C</ContextMenu.Shortcut></ContextMenu.Item>\n</ContextMenu.Group>' },
    ],
  },
  {
    id: "kbd", title: "Kbd", summary: "Representa uma tecla ou sequência curta de entrada do teclado.", importCode: 'import { Kbd } from "@arcsyn/react";', status: "React estável · React Native",
    anatomy: ["Elemento kbd", "Rótulo da tecla"],
    accessibility: "Use o nome que aparece no teclado da plataforma e escreva conectores como texto comum. Kbd comunica somente a tecla; não substitui instruções claras nem cria comportamento de atalho.",
    properties: [
      { name: "children", type: "ReactNode", defaultValue: "—", description: "Nome curto da tecla." },
      { name: "className", type: "string", defaultValue: "—", description: "Acrescenta classes sem remover o contrato visual." },
      { name: "...kbdProps", type: "HTMLAttributes<HTMLElement>", defaultValue: "—", description: "Inclui title, aria-* e demais atributos nativos." },
    ],
    examples: [
      { title: "Teclas únicas", description: "Use rótulos reconhecíveis para ações diretas e mantenha a instrução em texto comum.", preview: <div className="docs-demo-row"><span><Kbd>Esc</Kbd> para fechar</span><span><Kbd>Enter</Kbd> para confirmar</span><span><Kbd>Space</Kbd> para selecionar</span><span><Kbd>Tab</Kbd> para avançar</span></div>, code: '<Kbd>Esc</Kbd> para fechar\n<Kbd>Enter</Kbd> para confirmar' },
      { title: "Modificadores", description: "Separe cada tecla em seu próprio Kbd. O sinal de adição é texto, não parte da tecla.", preview: <div className="docs-demo-row"><span><Kbd>⌘</Kbd> + <Kbd>K</Kbd> para buscar</span><span><Kbd>Ctrl</Kbd> + <Kbd>S</Kbd> para salvar</span><span><Kbd>Shift</Kbd> + <Kbd>Enter</Kbd> para executar</span></div>, code: '<Kbd>⌘</Kbd> + <Kbd>K</Kbd> para buscar\n<Kbd>Ctrl</Kbd> + <Kbd>S</Kbd> para salvar' },
      { title: "Navegação", description: "Setas podem ser apresentadas com símbolos quando correspondem diretamente às teclas físicas.", preview: <div className="docs-demo-row"><span><Kbd>←</Kbd> anterior</span><span><Kbd>→</Kbd> próximo</span><span><Kbd>↑</Kbd> acima</span><span><Kbd>↓</Kbd> abaixo</span><span><Kbd>Home</Kbd> início</span><span><Kbd>End</Kbd> fim</span></div>, code: '<Kbd>←</Kbd> anterior\n<Kbd>→</Kbd> próximo\n<Kbd>Home</Kbd> início' },
      { title: "Dentro de ações", description: "Em botões e menus, o atalho é informação complementar. O rótulo textual continua sendo a fonte principal do significado.", preview: <div className="docs-demo-row"><Button variant="secondary">Abrir busca <Kbd>⌘ K</Kbd></Button><Button variant="ghost">Salvar <Kbd>Ctrl S</Kbd></Button></div>, code: '<Button variant="secondary">Abrir busca <Kbd>⌘ K</Kbd></Button>' },
    ],
  },
  {
    id: "attachment",
    title: "Attachment",
    summary: "Exibe arquivos ou imagens com mídia, metadados, estado de upload e ações independentes.",
    importCode: 'import { Attachment, AttachmentAction, AttachmentActions, AttachmentContent, AttachmentDescription, AttachmentGroup, AttachmentMedia, AttachmentTitle, AttachmentTrigger } from "@arcsyn/react";',
    status: "React estável",
    anatomy: ["Media", "Content: título e descrição", "Actions opcionais", "Trigger opcional", "Grupo rolável opcional"],
    accessibility: "Forneça aria-label para ações e triggers sem texto. Mantenha progresso e falhas na descrição. A versão React Native ainda não está disponível; use Card e Pressable no aplicativo nativo.",
    properties: [
      { name: "state", type: '"idle" | "uploading" | "processing" | "error" | "done"', defaultValue: '"done"', description: "Controla o feedback visual do ciclo de upload." },
      { name: "size", type: '"default" | "sm" | "xs"', defaultValue: '"default"', description: "Controla a densidade do anexo." },
      { name: "orientation", type: '"horizontal" | "vertical"', defaultValue: '"horizontal"', description: "Posiciona a mídia ao lado ou acima do conteúdo." },
      { name: "AttachmentMedia.variant", type: '"icon" | "image"', defaultValue: '"icon"', description: "Trata a mídia como ícone de arquivo ou prévia de imagem." },
    ],
    examples: [
      { title: "Estados de upload", description: "Cada estado mantém uma descrição textual; uploading e processing também sinalizam atividade no título.", preview: <div className="docs-demo-stack"><Attachment state="idle" size="sm"><AttachmentMedia>PDF</AttachmentMedia><AttachmentContent><AttachmentTitle>contrato.pdf</AttachmentTitle><AttachmentDescription>Pronto para enviar</AttachmentDescription></AttachmentContent></Attachment><Attachment state="uploading" size="sm"><AttachmentMedia>ZIP</AttachmentMedia><AttachmentContent><AttachmentTitle>evidências.zip</AttachmentTitle><AttachmentDescription>Enviando · 64%</AttachmentDescription></AttachmentContent></Attachment><Attachment state="processing" size="sm"><AttachmentMedia>DOC</AttachmentMedia><AttachmentContent><AttachmentTitle>relatório.docx</AttachmentTitle><AttachmentDescription>Processando documento</AttachmentDescription></AttachmentContent></Attachment><Attachment state="error" size="sm"><AttachmentMedia>CSV</AttachmentMedia><AttachmentContent><AttachmentTitle>clientes.csv</AttachmentTitle><AttachmentDescription>Falha no envio. Tente novamente.</AttachmentDescription></AttachmentContent></Attachment><Attachment state="done" size="sm"><AttachmentMedia>XLS</AttachmentMedia><AttachmentContent><AttachmentTitle>financeiro.xlsx</AttachmentTitle><AttachmentDescription>Enviado · 1,8 MB</AttachmentDescription></AttachmentContent></Attachment></div>, code: '<Attachment state="idle">…</Attachment>\n<Attachment state="uploading">…</Attachment>\n<Attachment state="processing">…</Attachment>\n<Attachment state="error">…</Attachment>\n<Attachment state="done">…</Attachment>' },
      { title: "Image preview", description: "Use variant=image para arquivos visuais e orientação vertical quando a prévia deve dominar o card.", preview: <Attachment orientation="vertical" className="docs-attachment-image"><AttachmentMedia variant="image"><img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=640&q=80" alt="Escritório com mesas e luminárias" /></AttachmentMedia><AttachmentContent><AttachmentTitle>workspace.jpg</AttachmentTitle><AttachmentDescription>JPG · 940 KB</AttachmentDescription></AttachmentContent></Attachment>, code: '<Attachment orientation="vertical">\n  <AttachmentMedia variant="image">\n    <img src={imageUrl} alt="Prévia do escritório" />\n  </AttachmentMedia>\n  <AttachmentContent>…</AttachmentContent>\n</Attachment>' },
      { title: "Grupo rolável", description: "AttachmentGroup organiza múltiplos arquivos em uma linha com snap de rolagem.", preview: <AttachmentGroup tabIndex={0} role="group" aria-label="Arquivos anexados">{["briefing.pdf", "workspace.png", "customers.csv", "renderer.tsx"].map((file, index) => <Attachment size="sm" key={file}><AttachmentMedia>{["PDF", "PNG", "CSV", "TSX"][index]}</AttachmentMedia><AttachmentContent><AttachmentTitle>{file}</AttachmentTitle><AttachmentDescription>{["1,4 MB", "820 KB", "18 KB", "12 KB"][index]}</AttachmentDescription></AttachmentContent></Attachment>)}</AttachmentGroup>, code: '<AttachmentGroup tabIndex={0} role="group" aria-label="Arquivos anexados">\n  <Attachment>…</Attachment>\n  <Attachment>…</Attachment>\n</AttachmentGroup>' },
      { title: "Trigger e ação independente", description: "O trigger cobre o card, enquanto a ação permanece acima dele e recebe foco separadamente.", preview: <Attachment><AttachmentMedia>PDF</AttachmentMedia><AttachmentContent><AttachmentTitle>pesquisa.pdf</AttachmentTitle><AttachmentDescription>Abrir prévia</AttachmentDescription></AttachmentContent><AttachmentTrigger aria-label="Abrir prévia de pesquisa.pdf" /><AttachmentActions><AttachmentAction aria-label="Remover pesquisa.pdf">×</AttachmentAction></AttachmentActions></Attachment>, code: '<Attachment>\n  <AttachmentMedia>PDF</AttachmentMedia>\n  <AttachmentContent>…</AttachmentContent>\n  <AttachmentTrigger aria-label="Abrir prévia de pesquisa.pdf" />\n  <AttachmentActions>\n    <AttachmentAction aria-label="Remover pesquisa.pdf">×</AttachmentAction>\n  </AttachmentActions>\n</Attachment>' },
    ],
  },
  {
    id: "breadcrumb", title: "Breadcrumb", summary: "Expõe a hierarquia de navegação até a página atual.", importCode: 'import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@arcsyn/react";', status: "React estável", anatomy: ["Nav", "Lista ordenada", "Links ancestrais", "Página atual"], accessibility: "Usa nav, lista ordenada e aria-current=page. No React Native não há equivalente: prefira um botão de voltar ou navegação de pilha.", properties: [{ name: "BreadcrumbLink", type: "AnchorHTMLAttributes<HTMLAnchorElement>", defaultValue: "—", description: "Link de uma página ancestral." }, { name: "BreadcrumbPage", type: "HTMLAttributes<HTMLSpanElement>", defaultValue: "—", description: "Página atual, marcada com aria-current=page." }], examples: [{ title: "Hierarquia de projeto", description: "Mostre o caminho apenas quando ele realmente ajudar a voltar a um nível conhecido.", preview: <Breadcrumb><BreadcrumbList><BreadcrumbItem><BreadcrumbLink href="#/">Início</BreadcrumbLink><BreadcrumbSeparator /></BreadcrumbItem><BreadcrumbItem><BreadcrumbLink href="#/components">Componentes</BreadcrumbLink><BreadcrumbSeparator /></BreadcrumbItem><BreadcrumbItem><BreadcrumbPage>Breadcrumb</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb>, code: '<Breadcrumb>\n  <BreadcrumbList>\n    <BreadcrumbItem><BreadcrumbLink href="/">Início</BreadcrumbLink><BreadcrumbSeparator /></BreadcrumbItem>\n    <BreadcrumbItem><BreadcrumbPage>Projetos</BreadcrumbPage></BreadcrumbItem>\n  </BreadcrumbList>\n</Breadcrumb>' }] },
  {
    id: "scroll-area", title: "Scroll Area", summary: "Exibe conteúdo rolável com barras discretas e preserva o espaço disponível do layout.", importCode: 'import { ScrollArea } from "@arcsyn/react";', status: "React estável · Base UI", anatomy: ["Root", "Viewport rolável", "Content", "Scrollbar opcional"], accessibility: "Mantenha conteúdo rolável acessível por teclado e não esconda informação essencial apenas na rolagem. No React Native, ScrollArea usa ScrollView nativo.", properties: [{ name: "ScrollArea.Scrollbar.orientation", type: '"vertical" | "horizontal"', defaultValue: '"vertical"', description: "Define o eixo controlado pela barra." }, { name: "ScrollArea.Root.style", type: "CSSProperties", defaultValue: "—", description: "Defina uma altura ou largura para criar uma região rolável." }], examples: [{ title: "Histórico de eventos", description: "Defina a altura do Root; o Viewport ocupa o espaço e permite a rolagem.", preview: <ScrollArea.Root className="docs-scroll-area"><ScrollArea.Viewport><ScrollArea.Content>{Array.from({ length: 9 }, (_, index) => <p className="docs-scroll-area-item" key={index}>Evento operacional #{String(index + 1).padStart(2, "0")}</p>)}</ScrollArea.Content></ScrollArea.Viewport><ScrollArea.Scrollbar /></ScrollArea.Root>, code: '<ScrollArea.Root style={{ height: "12rem" }}>\n  <ScrollArea.Viewport>\n    <ScrollArea.Content>…</ScrollArea.Content>\n  </ScrollArea.Viewport>\n  <ScrollArea.Scrollbar />\n</ScrollArea.Root>' }] },
  {
    id: "separator", title: "Separator", summary: "Separa visualmente grupos relacionados sem criar uma superfície adicional.", importCode: 'import { Separator } from "@arcsyn/react";', status: "React estável · Base UI", anatomy: ["Linha horizontal ou vertical", "Semântica de separador"], accessibility: "O componente expõe role=separator. Use para agrupamentos visuais; não o use como substituto de títulos ou estrutura semântica.", properties: [{ name: "orientation", type: '"horizontal" | "vertical"', defaultValue: '"horizontal"', description: "Define a direção da linha." }], examples: [{ title: "Divisão de metadados", description: "Use uma linha sutil para separar blocos de informação próximos.", preview: <div className="docs-separator-example"><strong>Detalhes da integração</strong><Separator /><span>Última sincronização: há 4 minutos</span></div>, code: '<strong>Detalhes da integração</strong>\n<Separator />\n<span>Última sincronização: há 4 minutos</span>' }, { title: "Separador vertical", description: "Em linhas compactas, a orientação vertical divide ações ou metadados adjacentes.", preview: <div className="docs-separator-row"><span>Produção</span><Separator orientation="vertical" /><span>Operacional</span></div>, code: '<div style={{ display: "flex", height: "1rem" }}>\n  <span>Produção</span>\n  <Separator orientation="vertical" />\n  <span>Operacional</span>\n</div>' }] },
  {
    id: "aspect-ratio",
    title: "Aspect Ratio",
    summary: "Exibe conteúdo dentro de uma proporção desejada sem depender de uma altura fixa.",
    importCode: 'import { AspectRatio } from "@arcsyn/react";',
    status: "React estável",
    anatomy: ["Container com largura fluida", "Proporção configurável", "Conteúdo interno preenchendo a área"],
    accessibility: "AspectRatio é apenas um container visual. Forneça texto alternativo para imagens e semântica apropriada para o conteúdo interno.",
    properties: [
      { name: "ratio", type: "number", defaultValue: "16 / 9", description: "Relação entre largura e altura. Use 1 para quadrado, 4 / 3 para mídia clássica ou 16 / 9 para vídeo." },
      { name: "children", type: "ReactNode", defaultValue: "—", description: "Conteúdo mantido dentro da proporção definida." },
      { name: "...divProps", type: "HTMLAttributes<HTMLDivElement>", defaultValue: "—", description: "Inclui className, aria-* e demais atributos do container." },
    ],
    examples: [{ title: "Prévia de mídia", description: "O container cresce com a largura disponível e preserva 16:9 para imagens, vídeos e prévias.", preview: <AspectRatio className="docs-aspect-ratio-example"><div>16:9</div></AspectRatio>, code: '<AspectRatio ratio={16 / 9}>\n  <img src="/preview.png" alt="Prévia da integração" />\n</AspectRatio>' }, { title: "Área quadrada", description: "Use ratio={1} para miniaturas, avatares compostos ou espaços de prévia quadrados.", preview: <AspectRatio ratio={1} className="docs-aspect-ratio-example docs-aspect-ratio-example--square"><div>1:1</div></AspectRatio>, code: '<AspectRatio ratio={1}>\n  <img src="/thumbnail.png" alt="Miniatura do projeto" />\n</AspectRatio>' }],
  },
  {
    id: "avatar",
    title: "Avatar",
    summary: "Representa uma pessoa ou entidade com imagem opcional e fallback determinístico de cor e iniciais.",
    importCode: 'import { Avatar } from "@arcsyn/react";',
    status: "React estável",
    anatomy: ["Imagem opcional", "Fallback de cor derivado do id", "Iniciais derivadas do nome"],
    accessibility: "Quando não há imagem, o fallback recebe role=img e um nome acessível. Quando houver imagem, informe name para produzir um texto alternativo útil.",
    properties: [
      { name: "id", type: "string", defaultValue: "—", description: "Identificador usado para gerar uma cor estável para o fallback." },
      { name: "name", type: "string", defaultValue: "—", description: "Nome usado nas iniciais e no texto alternativo da imagem." },
      { name: "image", type: "string", defaultValue: "—", description: "URL da imagem. Em caso de erro de carregamento, exibe o fallback automaticamente." },
      { name: "size", type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: "Define o diâmetro: 1.5rem, 2rem ou 2.5rem." },
    ],
    examples: [{ title: "Imagem e fallback", description: "A mesma pessoa recebe sempre a mesma cor quando a imagem não está disponível.", preview: <div className="docs-demo-row"><Avatar id="usr_ana_32" name="Ana Beatriz" /><Avatar id="usr_bruno_18" name="Bruno Costa" size="lg" /><Avatar id="usr_camila_09" name="Camila Nunes" image="https://i.pravatar.cc/80?img=47" size="lg" /><Avatar id="usr_unknown" /></div>, code: '<Avatar id="usr_ana_32" name="Ana Beatriz" />\n<Avatar id="usr_camila_09" name="Camila Nunes" image="https://exemplo.com/camila.jpg" size="lg" />' }],
  },
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
    id: "radio-group",
    title: "Radio Group",
    summary: "Permite escolher uma única opção de um conjunto pequeno e mutuamente exclusivo.",
    importCode: 'import { Field, RadioGroup } from "@arcsyn/react";',
    status: "React estável · Base UI",
    anatomy: ["Root com role radiogroup", "Item selecionável", "Indicador de seleção", "Rótulo clicável"],
    accessibility: "Base UI implementa a semântica de radio group e a navegação por setas. Use Field.Label para nomear o grupo e mantenha os rótulos das opções claros.",
    properties: [
      { name: "RadioGroup.Root.value", type: "string", defaultValue: "—", description: "Valor controlado da opção selecionada." },
      { name: "RadioGroup.Root.defaultValue", type: "string", defaultValue: "—", description: "Opção selecionada inicialmente no modo não controlado." },
      { name: "RadioGroup.Root.onValueChange", type: "(value) => void", defaultValue: "—", description: "Recebe o valor quando a opção muda." },
      { name: "RadioGroup.Root.orientation", type: '"vertical" | "horizontal"', defaultValue: '"vertical"', description: "Organiza as opções na vertical ou horizontal." },
      { name: "RadioGroup.Root.invalid", type: "boolean", defaultValue: "false", description: "Aplica aria-invalid e o tratamento visual de erro a todas as opções." },
      { name: "RadioGroup.Root.disabled", type: "boolean", defaultValue: "false", description: "Desabilita todas as opções do grupo." },
      { name: "RadioGroup.Item.variant", type: '"default" | "card"', defaultValue: '"default"', description: "Apresenta a opção como controle simples ou como choice card." },
      { name: "RadioGroup.Item.disabled", type: "boolean", defaultValue: "false", description: "Torna uma opção indisponível para seleção." },
    ],
    examples: [
      { title: "Campo com opção indisponível", description: "Use Field.Label para nomear o conjunto. Uma opção disabled continua legível, mas não pode receber seleção.", preview: <Field.Root><Field.Label id="priority-label">Prioridade</Field.Label><RadioGroup.Root aria-labelledby="priority-label" defaultValue="normal"><RadioGroup.Item value="low">Baixa</RadioGroup.Item><RadioGroup.Item value="normal">Normal</RadioGroup.Item><RadioGroup.Item value="high">Alta</RadioGroup.Item><RadioGroup.Item value="urgent" disabled>Urgente — requer aprovação</RadioGroup.Item></RadioGroup.Root><Field.Description>O SLA será calculado a partir desta escolha.</Field.Description></Field.Root>, code: '<Field.Root>\n  <Field.Label id="priority-label">Prioridade</Field.Label>\n  <RadioGroup.Root aria-labelledby="priority-label" defaultValue="normal">\n    <RadioGroup.Item value="low">Baixa</RadioGroup.Item>\n    <RadioGroup.Item value="normal">Normal</RadioGroup.Item>\n    <RadioGroup.Item value="urgent" disabled>Urgente — requer aprovação</RadioGroup.Item>\n  </RadioGroup.Root>\n</Field.Root>' },
      { title: "Choice cards", description: "Use cards quando cada escolha precisa de contexto adicional, mantendo uma única decisão possível.", preview: <Field.Root><Field.Label id="plan-label">Plano de implantação</Field.Label><RadioGroup.Root aria-labelledby="plan-label" defaultValue="managed"><RadioGroup.Item value="managed" variant="card"><strong>Gerenciado</strong><span className="docs-muted-copy">Atualizações automáticas e suporte prioritário.</span></RadioGroup.Item><RadioGroup.Item value="self-hosted" variant="card"><strong>Autogerenciado</strong><span className="docs-muted-copy">Sua equipe controla a infraestrutura.</span></RadioGroup.Item></RadioGroup.Root></Field.Root>, code: '<Field.Root>\n  <Field.Label id="plan-label">Plano de implantação</Field.Label>\n  <RadioGroup.Root aria-labelledby="plan-label" defaultValue="managed">\n    <RadioGroup.Item value="managed" variant="card">\n      <strong>Gerenciado</strong>\n      <span>Atualizações automáticas e suporte prioritário.</span>\n    </RadioGroup.Item>\n  </RadioGroup.Root>\n</Field.Root>' },
      { title: "Inválido e grupo desabilitado", description: "Use invalid junto de uma mensagem de erro. disabled no Root bloqueia o conjunto inteiro quando a escolha não está disponível.", preview: <div className="docs-demo-stack"><Field.Root><Field.Label id="region-label">Região de processamento</Field.Label><RadioGroup.Root aria-labelledby="region-label" invalid><RadioGroup.Item value="br">Brasil</RadioGroup.Item><RadioGroup.Item value="us">Estados Unidos</RadioGroup.Item></RadioGroup.Root><Field.Error>Selecione uma região para continuar.</Field.Error></Field.Root><Field.Root><Field.Label id="locked-priority-label">Prioridade bloqueada</Field.Label><RadioGroup.Root aria-labelledby="locked-priority-label" defaultValue="normal" disabled><RadioGroup.Item value="low">Baixa</RadioGroup.Item><RadioGroup.Item value="normal">Normal</RadioGroup.Item></RadioGroup.Root></Field.Root></div>, code: '<RadioGroup.Root invalid aria-labelledby="region-label">\n  <RadioGroup.Item value="br">Brasil</RadioGroup.Item>\n</RadioGroup.Root>\n<Field.Error>Selecione uma região para continuar.</Field.Error>\n\n<RadioGroup.Root defaultValue="normal" disabled>\n  <RadioGroup.Item value="normal">Normal</RadioGroup.Item>\n</RadioGroup.Root>' },
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
    examples: [{ title: "Opções agrupadas", description: "Agrupe alternativas relacionadas. Para listas extensas, use SelectSearch.", preview: <Field.Root><Field.Label htmlFor="environment">Ambiente</Field.Label><Select.Root id="environment" defaultValue="production"><Select.Trigger><Select.Value placeholder="Selecione um ambiente" /></Select.Trigger><Select.Content><Select.Group><Select.GroupLabel>Ambientes ativos</Select.GroupLabel><Select.Item value="production">Produção</Select.Item><Select.Item value="staging">Homologação</Select.Item></Select.Group><Select.Group><Select.GroupLabel>Indisponível</Select.GroupLabel><Select.Item value="legacy" disabled>Legado</Select.Item></Select.Group></Select.Content></Select.Root></Field.Root>, code: '<Select.Root defaultValue="production">\n  <Select.Trigger><Select.Value placeholder="Selecionar" /></Select.Trigger>\n  <Select.Content>\n    <Select.Group>\n      <Select.GroupLabel>Ambientes ativos</Select.GroupLabel>\n      <Select.Item value="production">Produção</Select.Item>\n    </Select.Group>\n  </Select.Content>\n</Select.Root>' }],
  },
  {
    id: "select-search",
    title: "Select Search",
    summary: "Seleciona uma opção em listas extensas usando busca local, teclado e feedback de lista vazia.",
    importCode: 'import { Field, SelectSearch } from "@arcsyn/react";',
    status: "React estável · Base UI",
    anatomy: ["Campo de busca", "Botão para abrir a lista", "Lista filtrada", "Opção selecionável", "Mensagem de lista vazia"],
    accessibility: "O campo usa a semântica de combobox da Base UI e permite navegar pelas opções com teclado. Associe um Field.Label usando htmlFor e não use o placeholder como único rótulo.",
    properties: [
      { name: "options", type: "SelectSearchOption[]", defaultValue: "—", description: "Lista de opções com label, value e disabled opcional." },
      { name: "value / defaultValue", type: "string | null", defaultValue: "—", description: "Controla ou define a opção inicialmente selecionada." },
      { name: "onValueChange", type: "(value: string | null) => void", defaultValue: "—", description: "Recebe a opção selecionada ou null ao limpar o campo." },
      { name: "searchPlaceholder", type: "string", defaultValue: '"Buscar opção"', description: "Texto de apoio exibido quando não há busca ou seleção." },
      { name: "emptyMessage", type: "string", defaultValue: '"Nenhuma opção encontrada."', description: "Mensagem exibida quando a busca não retorna opções." },
    ],
    examples: [{ title: "Busca de responsável", description: "Use em catálogos extensos quando a pessoa já conhece parte do nome que procura.", preview: <Field.Root><Field.Label htmlFor="owner">Responsável</Field.Label><SelectSearch id="owner" options={[{ label: "Ana Beatriz", value: "ana" }, { label: "Bruno Costa", value: "bruno" }, { label: "Camila Nunes", value: "camila" }, { label: "Diego Martins", value: "diego", disabled: true }]} /></Field.Root>, code: 'const owners = [\n  { label: "Ana Beatriz", value: "ana" },\n  { label: "Bruno Costa", value: "bruno" },\n];\n\n<Field.Root>\n  <Field.Label htmlFor="owner">Responsável</Field.Label>\n  <SelectSearch id="owner" options={owners} />\n</Field.Root>' }],
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
    id: "dropdown-menu",
    title: "Dropdown Menu",
    summary: "Organiza ações contextuais e configurações compactas a partir de um botão.",
    importCode: 'import { DropdownMenu } from "@arcsyn/react";',
    status: "React estável · Base UI · React Native",
    anatomy: ["Root e Trigger", "Portal, Positioner e Content", "Label e Group opcionais", "Item, CheckboxItem ou RadioItem", "Sub, SubTrigger e SubContent", "Separator e Shortcut opcionais"],
    accessibility: "Base UI fornece semântica de menu, navegação por setas, busca por digitação, gerenciamento de foco e fechamento por Escape. O trigger precisa de nome acessível; não use o menu como navegação principal. No React Native, o equivalente abre um Modal nativo com alvos de toque de 44px; submenus e atalhos visuais não estão disponíveis.",
    properties: [
      { name: "DropdownMenu.Root.open", type: "boolean", defaultValue: "—", description: "Controla a abertura do menu." },
      { name: "DropdownMenu.Root.onOpenChange", type: "(open: boolean) => void", defaultValue: "—", description: "Recebe mudanças de abertura causadas pelo trigger, Escape ou seleção." },
      { name: "DropdownMenu.Root.modal", type: "boolean", defaultValue: "true", description: "Segue o comportamento modal padrão do Base UI. Use false apenas quando a página ao fundo precisar continuar interativa." },
      { name: "DropdownMenu.Trigger.variant", type: "ButtonVariant", defaultValue: '"secondary"', description: "Aplica uma variante oficial de Button ao trigger." },
      { name: "DropdownMenu.Content.side / align", type: '"top" | "right" | "bottom" | "left" / "start" | "center" | "end"', defaultValue: '"bottom" / "start"', description: "Posiciona o menu em relação ao trigger." },
      { name: "DropdownMenu.Item.variant", type: '"default" | "danger" | "destructive"', defaultValue: '"default"', description: "Reserva danger ou destructive para ações destrutivas." },
      { name: "DropdownMenu.Item.disabled", type: "boolean", defaultValue: "false", description: "Mantém a ação visível, mas indisponível para interação." },
      { name: "DropdownMenu.CheckboxItem.checked", type: "boolean", defaultValue: "—", description: "Controla uma preferência independente sem fechar o menu por padrão." },
      { name: "DropdownMenu.RadioGroup.value", type: "unknown", defaultValue: "—", description: "Controla uma escolha exclusiva entre RadioItems." },
    ],
    examples: [
      {
        title: "Ações contextuais",
        description: "Agrupe ações relacionadas e separe a ação destrutiva. Atalhos são apenas apoio visual e ficam ocultos de leitores de tela.",
        preview: <DropdownMenu.Root><DropdownMenu.Trigger>Ações <span aria-hidden>⌄</span></DropdownMenu.Trigger><DropdownMenu.Content><DropdownMenu.Group><DropdownMenu.Label>Projeto</DropdownMenu.Label><DropdownMenu.Item>Renomear <DropdownMenu.Shortcut>⌘ R</DropdownMenu.Shortcut></DropdownMenu.Item><DropdownMenu.Item>Duplicar <DropdownMenu.Shortcut>⌘ D</DropdownMenu.Shortcut></DropdownMenu.Item><DropdownMenu.Item disabled>Arquivar</DropdownMenu.Item></DropdownMenu.Group><DropdownMenu.Separator /><DropdownMenu.Item variant="danger">Excluir projeto</DropdownMenu.Item></DropdownMenu.Content></DropdownMenu.Root>,
        code: '<DropdownMenu.Root>\n  <DropdownMenu.Trigger>Ações</DropdownMenu.Trigger>\n  <DropdownMenu.Content>\n    <DropdownMenu.Group>\n      <DropdownMenu.Label>Projeto</DropdownMenu.Label>\n      <DropdownMenu.Item>Renomear</DropdownMenu.Item>\n      <DropdownMenu.Item disabled>Arquivar</DropdownMenu.Item>\n    </DropdownMenu.Group>\n    <DropdownMenu.Separator />\n    <DropdownMenu.Item variant="danger">Excluir projeto</DropdownMenu.Item>\n  </DropdownMenu.Content>\n</DropdownMenu.Root>',
      },
      {
        title: "Preferências e escolha exclusiva",
        description: "CheckboxItem mantém preferências independentes; RadioGroup comunica opções mutuamente exclusivas.",
        preview: <DropdownMenu.Root><DropdownMenu.Trigger variant="outline">Visualização <span aria-hidden>⌄</span></DropdownMenu.Trigger><DropdownMenu.Content><DropdownMenu.Group><DropdownMenu.Label>Exibir</DropdownMenu.Label><DropdownMenu.CheckboxItem defaultChecked>Barra lateral</DropdownMenu.CheckboxItem><DropdownMenu.CheckboxItem>Itens arquivados</DropdownMenu.CheckboxItem></DropdownMenu.Group><DropdownMenu.Separator /><DropdownMenu.RadioGroup defaultValue="compact"><DropdownMenu.Label>Densidade</DropdownMenu.Label><DropdownMenu.RadioItem value="compact">Compacta</DropdownMenu.RadioItem><DropdownMenu.RadioItem value="comfortable">Confortável</DropdownMenu.RadioItem></DropdownMenu.RadioGroup></DropdownMenu.Content></DropdownMenu.Root>,
        code: '<DropdownMenu.Group>\n  <DropdownMenu.Label>Exibir</DropdownMenu.Label>\n  <DropdownMenu.CheckboxItem defaultChecked>Barra lateral</DropdownMenu.CheckboxItem>\n</DropdownMenu.Group>\n<DropdownMenu.RadioGroup defaultValue="compact">\n  <DropdownMenu.Label>Densidade</DropdownMenu.Label>\n  <DropdownMenu.RadioItem value="compact">Compacta</DropdownMenu.RadioItem>\n  <DropdownMenu.RadioItem value="comfortable">Confortável</DropdownMenu.RadioItem>\n</DropdownMenu.RadioGroup>',
      },
      {
        title: "Submenu",
        description: "Use submenus com moderação para agrupar uma segunda camada curta de ações relacionadas.",
        preview: <DropdownMenu.Root><DropdownMenu.Trigger variant="outline">Compartilhar <span aria-hidden>⌄</span></DropdownMenu.Trigger><DropdownMenu.Content><DropdownMenu.Item>Copiar link</DropdownMenu.Item><DropdownMenu.Sub><DropdownMenu.SubTrigger>Enviar para</DropdownMenu.SubTrigger><DropdownMenu.SubContent><DropdownMenu.Item>Equipe de produto</DropdownMenu.Item><DropdownMenu.Item>Equipe comercial</DropdownMenu.Item></DropdownMenu.SubContent></DropdownMenu.Sub></DropdownMenu.Content></DropdownMenu.Root>,
        code: '<DropdownMenu.Sub>\n  <DropdownMenu.SubTrigger>Enviar para</DropdownMenu.SubTrigger>\n  <DropdownMenu.SubContent>\n    <DropdownMenu.Item>Equipe de produto</DropdownMenu.Item>\n    <DropdownMenu.Item>Equipe comercial</DropdownMenu.Item>\n  </DropdownMenu.SubContent>\n</DropdownMenu.Sub>',
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
