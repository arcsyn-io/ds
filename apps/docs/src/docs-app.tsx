import { createContext, useContext, useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { Accordion, Alert, AspectRatio, Attachment, AttachmentAction, AttachmentActions, AttachmentContent, AttachmentDescription, AttachmentGroup, AttachmentMedia, AttachmentTitle, AttachmentTrigger, Avatar, Badge, Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, Button, Card, Carousel, Checkbox, Collapsible, ContextMenu, DataTable, Dialog, Drawer, DropdownMenu, Empty, EmptyContent, EmptyDescription, EmptyFooter, EmptyHeader, EmptyMedia, EmptyTitle, Field, Input, InputGroup, Kbd, Menubar, NativeSelect, NativeSelectOptGroup, NativeSelectOption, Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, Popover, RadioGroup, ScrollArea, Select, SelectSearch, Separator, Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuAction, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarMenuSkeleton, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarProvider, SidebarRail, SidebarTrigger, Skeleton, Spinner, Switch, Tabs, Textarea, ThemeSwitcher, Toaster, Tooltip, toast, useSidebar, type DataTableColumn, type SidebarCollapsible, type SidebarSide, type SidebarVariant, type ThemeSwitcherTheme, type ToasterEffect } from "@arcsyn/react";
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, CircleIcon, EllipsisIcon, MinusIcon, PlusIcon, SettingsIcon, XIcon } from "@arcsyn/react/icons";

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

function ControlledPaginationDemo() {
  const [page, setPage] = useState(3);
  return <div className="docs-demo-stack"><Pagination><PaginationContent><PaginationItem><PaginationPrevious href="#pagination-demo" aria-disabled={page === 1} onClick={(event) => { event.preventDefault(); setPage((current) => Math.max(1, current - 1)); }} /></PaginationItem>{[1, 2, 3, 4, 5].map((item) => <PaginationItem key={item}><PaginationLink href="#pagination-demo" active={page === item} onClick={(event) => { event.preventDefault(); setPage(item); }}>{item}</PaginationLink></PaginationItem>)}<PaginationItem><PaginationNext href="#pagination-demo" aria-disabled={page === 5} onClick={(event) => { event.preventDefault(); setPage((current) => Math.min(5, current + 1)); }} /></PaginationItem></PaginationContent></Pagination><span className="docs-muted-copy">Página selecionada: {page}</span></div>;
}

function ControlledTabsDemo() {
  const [value, setValue] = useState("activity");

  return (
    <div className="docs-demo-stack">
      <div className="docs-demo-row">
        <Button size="sm" variant="ghost" onClick={() => setValue("activity")}>Atividade</Button>
        <Button size="sm" variant="ghost" onClick={() => setValue("permissions")}>Permissões</Button>
        <Badge variant="accent">Ativa: {value === "activity" ? "Atividade" : "Permissões"}</Badge>
      </div>
      <Tabs.Root value={value} onValueChange={(nextValue) => setValue(String(nextValue))}>
        <Tabs.List>
          <Tabs.Tab value="activity">Atividade</Tabs.Tab>
          <Tabs.Tab value="permissions">Permissões</Tabs.Tab>
          <Tabs.Indicator />
        </Tabs.List>
        <Tabs.Panels>
          <Tabs.Panel value="activity">Eventos e alterações recentes do workspace.</Tabs.Panel>
          <Tabs.Panel value="permissions">Papéis, grupos e políticas de acesso.</Tabs.Panel>
        </Tabs.Panels>
      </Tabs.Root>
    </div>
  );
}

const sidebarDemoStyle = {
  "--arcsyn-sidebar-width": "13.5rem",
  "--arcsyn-sidebar-width-icon": "3.25rem",
} as CSSProperties;

function SidebarDemoNavigation() {
  return (
    <>
      <SidebarHeader>
        <strong className="docs-sidebar-demo-brand"><CircleIcon aria-hidden size={16} /><span>ArcSyn Ops</span></strong>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Operação</SidebarGroupLabel>
          <SidebarGroupAction aria-label="Adicionar ambiente"><PlusIcon aria-hidden size={15} /></SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem><SidebarMenuButton asChild isActive tooltip="Visão geral"><a href="#sidebar-demo"><CircleIcon aria-hidden size={16} /><span>Visão geral</span></a></SidebarMenuButton></SidebarMenuItem>
              <SidebarMenuItem><SidebarMenuButton asChild tooltip="Ambientes"><a href="#sidebar-demo"><CheckIcon aria-hidden size={16} /><span>Ambientes</span></a></SidebarMenuButton><SidebarMenuBadge>8</SidebarMenuBadge></SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Projetos"><PlusIcon aria-hidden size={16} /><span>Projetos</span></SidebarMenuButton>
                <SidebarMenuAction aria-label="Opções de projetos" showOnHover><EllipsisIcon aria-hidden size={15} /></SidebarMenuAction>
                <SidebarMenuSub>
                  <SidebarMenuSubItem><SidebarMenuSubButton asChild><a href="#sidebar-demo"><span>Plataforma</span></a></SidebarMenuSubButton></SidebarMenuSubItem>
                  <SidebarMenuSubItem><SidebarMenuSubButton asChild><a href="#sidebar-demo"><span>Observabilidade</span></a></SidebarMenuSubButton></SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Carregando</SidebarGroupLabel>
          <SidebarMenu><SidebarMenuItem><SidebarMenuSkeleton showIcon /></SidebarMenuItem></SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu><SidebarMenuItem><SidebarMenuButton tooltip="Conta"><CircleIcon aria-hidden size={16} /><span>lcosta@arcsyn.io</span></SidebarMenuButton></SidebarMenuItem></SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </>
  );
}

function SidebarDemo({ collapsible = "icon", variant = "sidebar", side = "left", keyboardShortcut = false }: { collapsible?: SidebarCollapsible; variant?: SidebarVariant; side?: SidebarSide; keyboardShortcut?: string | false }) {
  return (
    <SidebarProvider className="docs-sidebar-demo" keyboardShortcut={keyboardShortcut} style={sidebarDemoStyle}>
      <Sidebar side={side} variant={variant} collapsible={collapsible}><SidebarDemoNavigation /></Sidebar>
      <SidebarInset className="docs-sidebar-demo-inset">
        <header><SidebarTrigger /><span>Painel operacional</span></header>
        <div><p>Conteúdo principal</p><span>Use o trigger, o rail ou {keyboardShortcut ? "Ctrl/Cmd+B" : "o controle"} para alternar.</span></div>
      </SidebarInset>
    </SidebarProvider>
  );
}

function ControlledSidebarDemo() {
  const [open, setOpen] = useState(true);
  return (
    <div className="docs-demo-stack">
      <span className="docs-muted-copy">Estado controlado: {open ? "expandido" : "recolhido"}</span>
      <SidebarProvider className="docs-sidebar-demo" keyboardShortcut={false} open={open} onOpenChange={setOpen} style={sidebarDemoStyle}>
        <Sidebar collapsible="offcanvas"><SidebarDemoNavigation /></Sidebar>
        <SidebarInset className="docs-sidebar-demo-inset"><header><SidebarTrigger /><span>Workspace</span></header><div><Button size="sm" variant="secondary" onClick={() => setOpen((current) => !current)}>Alternar externamente</Button></div></SidebarInset>
      </SidebarProvider>
    </div>
  );
}

const toasterEffects: Array<{ label: string; value: ToasterEffect }> = [
  { label: "Deslizar", value: "slide" },
  { label: "Dissolver", value: "fade" },
  { label: "Escala", value: "scale" },
  { label: "Mola", value: "spring" },
  { label: "Desfoque", value: "blur" },
  { label: "Sem animação", value: "none" },
];

function ToasterEffectsDemo() {
  return <><div className="docs-demo-row">{toasterEffects.map(({ label, value }) => <Button key={value} variant="secondary" onClick={() => toast.success(`Efeito: ${label}`, { description: "A mesma notificação com outra transição.", duration: 2400, toasterId: `docs-effect-${value}` })}>{label}</Button>)}</div>{toasterEffects.map(({ label, value }) => <Toaster key={value} id={`docs-effect-${value}`} effect={value} position="bottom-right" containerAriaLabel={`Demonstração do efeito ${label}`} />)}</>;
}

const docsThemeStorageKey = "arcsyn-docs-theme";
const docsThemes: readonly ThemeSwitcherTheme[] = ["light", "dark", "deep-dark", "corporate-dark", "catppuccin-mocha", "catppuccin-latte"];
const docsThemeOptions = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "deep-dark", label: "Deep Dark" },
  { value: "corporate-dark", label: "Corporate Dark" },
  { value: "catppuccin-mocha", label: "Catppuccin Mocha" },
  { value: "catppuccin-latte", label: "Catppuccin Latte" },
] as const;
const docsFontStorageKey = "arcsyn-docs-font";
const docsFonts = [
  { id: "alexandria", label: "Alexandria", family: "'Alexandria', ui-sans-serif, system-ui, sans-serif" },
  { id: "ibm-plex-sans", label: "IBM Plex Sans", family: "'IBM Plex Sans', ui-sans-serif, system-ui, sans-serif" },
  { id: "readex-pro", label: "Readex Pro", family: "'Readex Pro', ui-sans-serif, system-ui, sans-serif" },
] as const;
const docsMonoFontStorageKey = "arcsyn-docs-mono-font";
const docsMonoFonts = [
  { id: "ibm-plex-mono", label: "IBM Plex Mono", family: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace" },
  { id: "jetbrains-mono", label: "JetBrains Mono", family: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace" },
  { id: "geist-mono", label: "Geist Mono", family: "'Geist Mono', ui-monospace, SFMono-Regular, Menlo, monospace" },
] as const;

type DocsFont = (typeof docsFonts)[number]["id"];
type DocsMonoFont = (typeof docsMonoFonts)[number]["id"];

function isDocsTheme(value: string | null): value is ThemeSwitcherTheme {
  return docsThemes.some((theme) => theme === value);
}

function currentDocsTheme(): ThemeSwitcherTheme {
  try {
    const storedTheme = window.localStorage.getItem(docsThemeStorageKey);
    if (isDocsTheme(storedTheme)) return storedTheme;
  } catch {
    // Storage may be unavailable in privacy-restricted browser contexts.
  }

  const documentTheme = document.documentElement.dataset.arcsynTheme ?? null;
  return isDocsTheme(documentTheme) ? documentTheme : "dark";
}

function isDocsFont(value: string | null): value is DocsFont {
  return docsFonts.some((font) => font.id === value);
}

function currentDocsFont(): DocsFont {
  try {
    const storedFont = window.localStorage.getItem(docsFontStorageKey);
    if (isDocsFont(storedFont)) return storedFont;
  } catch {
    // Storage may be unavailable in privacy-restricted browser contexts.
  }

  return "alexandria";
}

function isDocsMonoFont(value: string | null): value is DocsMonoFont {
  return docsMonoFonts.some((font) => font.id === value);
}

function currentDocsMonoFont(): DocsMonoFont {
  try {
    const storedFont = window.localStorage.getItem(docsMonoFontStorageKey);
    if (isDocsMonoFont(storedFont)) return storedFont;
  } catch {
    // Storage may be unavailable in privacy-restricted browser contexts.
  }

  return "ibm-plex-mono";
}

type DocsThemeContextValue = {
  theme: ThemeSwitcherTheme;
  setTheme: (theme: ThemeSwitcherTheme) => void;
  font: DocsFont;
  setFont: (font: DocsFont) => void;
  monoFont: DocsMonoFont;
  setMonoFont: (font: DocsMonoFont) => void;
};

const DocsThemeContext = createContext<DocsThemeContextValue>({
  theme: "dark",
  setTheme: () => undefined,
  font: "alexandria",
  setFont: () => undefined,
  monoFont: "ibm-plex-mono",
  setMonoFont: () => undefined,
});

function DocsThemeSwitcher() {
  const { theme, setTheme } = useContext(DocsThemeContext);
  return <ThemeSwitcher value={theme} options={docsThemeOptions} onValueChange={setTheme} label="Tema da documentação" />;
}

function DocsFontSwitcher() {
  const { font, setFont } = useContext(DocsThemeContext);
  return (
    <NativeSelect
      aria-label="Fonte da documentação"
      size="sm"
      value={font}
      onChange={(event) => setFont(event.currentTarget.value as DocsFont)}
    >
      {docsFonts.map((option) => <NativeSelectOption key={option.id} value={option.id}>{option.label}</NativeSelectOption>)}
    </NativeSelect>
  );
}

function DocsMonoFontSwitcher() {
  const { monoFont, setMonoFont } = useContext(DocsThemeContext);
  return (
    <NativeSelect
      aria-label="Fonte monoespaçada da documentação"
      size="sm"
      value={monoFont}
      onChange={(event) => setMonoFont(event.currentTarget.value as DocsMonoFont)}
    >
      {docsMonoFonts.map((option) => <NativeSelectOption key={option.id} value={option.id}>{option.label}</NativeSelectOption>)}
    </NativeSelect>
  );
}

function DocsPreferencesDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="docs-settings-trigger" variant="ghost" size="sm">
        <SettingsIcon aria-hidden size={16} />
        <span>Configurações</span>
      </Dialog.Trigger>
      <Dialog.Content className="docs-settings-dialog">
        <Dialog.Header>
          <Dialog.Title>Configurações de aparência</Dialog.Title>
          <Dialog.Description>Personalize o tema e a tipografia usada nesta documentação.</Dialog.Description>
        </Dialog.Header>
        <div className="docs-settings-fields">
          <div className="docs-settings-field">
            <span>Tema</span>
            <DocsThemeSwitcher />
          </div>
          <div className="docs-settings-field">
            <span>Fonte da interface</span>
            <DocsFontSwitcher />
          </div>
          <div className="docs-settings-field">
            <span>Fonte monoespaçada</span>
            <DocsMonoFontSwitcher />
          </div>
        </div>
        <div className="docs-settings-preview" aria-label="Prévia tipográfica">
          <span>Interface · ArcSyn Design System</span>
          <code>const theme = "arcsyn";</code>
        </div>
        <Dialog.Footer>
          <Dialog.Close variant="primary">Concluir</Dialog.Close>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  );
}

function DocsSidebarLink({ active, children, href, icon }: { active: boolean; children: ReactNode; href: string; icon?: ReactNode }) {
  const { isMobile, setOpenMobile } = useSidebar();
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={active}>
        <a href={href} onClick={() => { if (isMobile) setOpenMobile(false); }}>
          {icon}
          <span>{children}</span>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

type ProjectRow = {
  id: string;
  name: string;
  status: "Operacional" | "Atenção" | "Pausado";
  owner: string;
  environment: string;
  monthlyCost: number;
};

const projectRows: ProjectRow[] = [
  { id: "ARC-1042", name: "Gateway de pagamentos", status: "Operacional", owner: "Ana Costa", environment: "Produção", monthlyCost: 18420 },
  { id: "ARC-1038", name: "Observabilidade central", status: "Atenção", owner: "Bruno Lima", environment: "Produção", monthlyCost: 12780 },
  { id: "ARC-1029", name: "Portal de parceiros", status: "Operacional", owner: "Camila Nunes", environment: "Homologação", monthlyCost: 6340 },
  { id: "ARC-1017", name: "Pipeline de dados", status: "Pausado", owner: "Diego Martins", environment: "Desenvolvimento", monthlyCost: 4210 },
  { id: "ARC-1008", name: "Gestão de identidades", status: "Operacional", owner: "Elisa Rocha", environment: "Produção", monthlyCost: 15900 },
  { id: "ARC-0996", name: "Catálogo interno", status: "Atenção", owner: "Felipe Alves", environment: "Homologação", monthlyCost: 7850 },
  { id: "ARC-0984", name: "Motor antifraude", status: "Operacional", owner: "Giovana Reis", environment: "Produção", monthlyCost: 22160 },
  { id: "ARC-0971", name: "Console de suporte", status: "Pausado", owner: "Hugo Melo", environment: "Desenvolvimento", monthlyCost: 2980 },
];

const projectColumns: DataTableColumn<ProjectRow>[] = [
  {
    accessorKey: "name",
    header: "Projeto",
    sortable: true,
    hideable: false,
    width: "32%",
    cell: ({ row }) => <span className="docs-data-table-project"><strong>{row.name}</strong><code>{row.id}</code></span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    sortable: true,
    cell: ({ row }) => <Badge variant={row.status === "Operacional" ? "success" : row.status === "Atenção" ? "warning" : "neutral"}>{row.status}</Badge>,
  },
  { accessorKey: "owner", header: "Responsável", sortable: true },
  { accessorKey: "environment", header: "Ambiente", sortable: true },
  {
    accessorKey: "monthlyCost",
    header: "Custo mensal",
    sortable: true,
    align: "end",
    cell: ({ row }) => <span className="docs-data-table-currency">{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(row.monthlyCost)}</span>,
  },
];

function DataTableDemo() {
  return (
    <DataTable
      caption="Projetos da operação"
      columns={projectColumns}
      data={projectRows}
      getRowId={(row) => row.id}
      initialPageSize={5}
      pageSizeOptions={[5, 10, 20]}
      initialSort={{ columnId: "name", direction: "asc" }}
      filterPlaceholder="Filtrar projetos..."
      rowActions={(row) => (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger className="docs-data-table-action" variant="ghost" size="sm" aria-label={`Ações de ${row.name}`}>
            <EllipsisIcon aria-hidden size={16} />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content align="end">
            <DropdownMenu.Item>Ver detalhes</DropdownMenu.Item>
            <DropdownMenu.Item>Duplicar projeto</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item variant="danger">Arquivar</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )}
    />
  );
}

const componentPages: ComponentPage[] = [
  {
    id: "data-table",
    title: "Data Table",
    summary: "Organiza conjuntos de dados com formatação de células, ações, ordenação, filtros e controles de visualização.",
    importCode: 'import { DataTable, type DataTableColumn } from "@arcsyn/react";',
    status: "React estável · Web",
    anatomy: ["Toolbar com filtro e visibilidade", "Cabeçalho ordenável", "Linhas e células formatáveis", "Seleção por linha e página", "Ações por linha", "Status e paginação"],
    accessibility: "DataTable usa table, caption, thead, tbody e cabeçalhos de coluna nativos. Ordenação é comunicada por aria-sort; seleção e paginação têm nomes acessíveis, e a contagem usa aria-live. Forneça caption descritivo e aria-label em ações somente com ícone. Em telas estreitas, a tabela preserva sua estrutura semântica e permite rolagem horizontal, enquanto os controles mantêm alvos de 44px. Não há equivalente React Native: para grandes conjuntos de dados, use FlatList com filtros e ordenação fornecidos pela aplicação.",
    properties: [
      { name: "data / columns", type: "readonly T[] / DataTableColumn<T>[]", defaultValue: "—", description: "Define as linhas e o contrato de acesso, apresentação e comportamento de cada coluna." },
      { name: "column.cell", type: "(context) => ReactNode", defaultValue: "valor bruto", description: "Formata a célula com acesso ao valor, à linha e ao índice." },
      { name: "column.sortable / sort", type: "boolean / (a, b) => number", defaultValue: "false / automático", description: "Ativa ordenação em três estados e permite um comparador customizado." },
      { name: "column.filterable / filter", type: "boolean / function", defaultValue: "true / textual", description: "Inclui a coluna no filtro global ou substitui a comparação padrão." },
      { name: "column.hideable", type: "boolean", defaultValue: "true", description: "Permite ocultar e restaurar a coluna pelo menu de visibilidade." },
      { name: "rowActions", type: "(row, rowIndex) => ReactNode", defaultValue: "—", description: "Renderiza ações contextuais no fim de cada linha." },
      { name: "enableRowSelection", type: "boolean", defaultValue: "true", description: "Exibe seleção individual e seleção de todas as linhas da página atual." },
      { name: "selectedRowIds / onRowSelectionChange", type: "readonly string[] / (ids) => void", defaultValue: "não controlado", description: "Controla externamente a seleção; defaultSelectedRowIds define o estado inicial." },
      { name: "initialSort / initialPageSize", type: "DataTableSort / number", defaultValue: "— / 10", description: "Configura a ordenação e o tamanho inicial da página." },
      { name: "initialColumnVisibility", type: "Record<string, boolean>", defaultValue: "{}", description: "Define quais colunas começam ocultas." },
      { name: "caption / getRowId", type: "ReactNode / (row, index) => string", defaultValue: '"Tabela de dados" / índice', description: "Fornece nome acessível e identidade estável para seleção e renderização." },
    ],
    examples: [
      {
        title: "Operação de projetos",
        description: "Use cell para formatar identidade, status e moeda; rowActions recebe a linha original. Experimente filtrar, ordenar, ocultar colunas, selecionar linhas e trocar de página.",
        preview: <DataTableDemo />,
        code: `const columns: DataTableColumn<Project>[] = [
  {
    accessorKey: "name",
    header: "Projeto",
    sortable: true,
    hideable: false,
    cell: ({ row }) => (
      <div>
        <strong>{row.name}</strong>
        <code>{row.id}</code>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    sortable: true,
    cell: ({ row }) => <Badge variant="success">{row.status}</Badge>,
  },
];

<DataTable
  caption="Projetos da operação"
  columns={columns}
  data={projects}
  getRowId={(row) => row.id}
  initialPageSize={5}
  rowActions={(row) => <ProjectActions project={row} />}
/>`,
      },
    ],
  },
  {
    id: "sidebar",
    title: "Sidebar",
    summary: "Estrutura navegação lateral responsiva, recolhível e composta para aplicações densas.",
    importCode: 'import {\n  Sidebar, SidebarContent, SidebarGroup, SidebarInset,\n  SidebarMenu, SidebarMenuButton, SidebarMenuItem,\n  SidebarProvider, SidebarTrigger, useSidebar,\n} from "@arcsyn/react";',
    status: "React estável · Base UI · Web",
    anatomy: ["SidebarProvider e contexto", "Sidebar com Header, Content e Footer", "Group com Label, Action e Content", "Menu, Item, Button, Action e Badge", "Submenu", "Rail, Trigger e Inset", "Drawer móvel em portal"],
    accessibility: "Sidebar usa aside nomeado no desktop e um Dialog Base UI no mobile, com foco contido, portal, Escape e backdrop. SidebarTrigger comunica aria-expanded; itens ativos usam aria-current=page. Ícones decorativos devem usar aria-hidden, ações só com ícone precisam de aria-label e tooltip não substitui um nome acessível. Em telas móveis, controles e itens preservam alvo mínimo de 44px. Não há equivalente React Native: use o padrão de navegação fornecido pela aplicação nativa e documente essa divergência.",
    properties: [
      { name: "SidebarProvider.defaultOpen", type: "boolean", defaultValue: "true", description: "Estado inicial da sidebar desktop no modo não controlado." },
      { name: "SidebarProvider.open / onOpenChange", type: "boolean / (open) => void", defaultValue: "—", description: "Controla externamente a abertura no desktop." },
      { name: "SidebarProvider.keyboardShortcut", type: "string | false", defaultValue: '"b"', description: "Tecla usada com Ctrl ou Cmd; false desativa o atalho." },
      { name: "SidebarProvider.mobileBreakpoint", type: "number", defaultValue: "768", description: "Breakpoint em pixels que troca a sidebar pelo drawer móvel." },
      { name: "Sidebar.side", type: '"left" | "right"', defaultValue: '"left"', description: "Posiciona o painel no início ou no fim do layout." },
      { name: "Sidebar.variant", type: '"sidebar" | "floating" | "inset"', defaultValue: '"sidebar"', description: "Escolhe o tratamento visual do painel." },
      { name: "Sidebar.collapsible", type: '"offcanvas" | "icon" | "none"', defaultValue: '"offcanvas"', description: "Desloca, reduz a ícones ou mantém a sidebar fixa." },
      { name: "Sidebar.label", type: "string", defaultValue: '"Navegação principal"', description: "Nome acessível do landmark ou dialog." },
      { name: "SidebarMenuButton", type: "asChild, isActive, size, tooltip, disabled", defaultValue: "—", description: "Renderiza botão ou link, comunica página ativa e oferece rótulo no modo ícone." },
      { name: "useSidebar()", type: "SidebarContextValue", defaultValue: "—", description: "Expõe state, open, setOpen, openMobile, setOpenMobile, isMobile e toggleSidebar." },
      { name: "Variáveis CSS", type: "--arcsyn-sidebar-width / -mobile / -icon", defaultValue: "16rem / 18rem / 3.25rem", description: "Ajustam larguras por instância através de style." },
    ],
    examples: [
      { title: "Recolhimento para ícones", description: "O provider compartilha estado com trigger e rail; tooltip identifica links quando os rótulos ficam ocultos.", preview: <SidebarDemo />, code: '<SidebarProvider>\n  <Sidebar collapsible="icon">\n    <SidebarHeader />\n    <SidebarContent>\n      <SidebarGroup>\n        <SidebarGroupLabel>Operação</SidebarGroupLabel>\n        <SidebarGroupContent>\n          <SidebarMenu>\n            <SidebarMenuItem>\n              <SidebarMenuButton asChild isActive tooltip="Visão geral">\n                <a href="/"><HomeIcon /><span>Visão geral</span></a>\n              </SidebarMenuButton>\n            </SidebarMenuItem>\n          </SidebarMenu>\n        </SidebarGroupContent>\n      </SidebarGroup>\n    </SidebarContent>\n    <SidebarRail />\n  </Sidebar>\n  <SidebarInset><SidebarTrigger />{children}</SidebarInset>\n</SidebarProvider>' },
      { title: "Flutuante à direita", description: "side e variant são independentes; collapsible=none mantém a navegação sempre visível no desktop.", preview: <SidebarDemo side="right" variant="floating" collapsible="none" />, code: '<SidebarProvider>\n  <Sidebar side="right" variant="floating" collapsible="none">…</Sidebar>\n  <SidebarInset>…</SidebarInset>\n</SidebarProvider>' },
      { title: "Estado controlado e offcanvas", description: "open e onOpenChange sincronizam trigger, rail e controles externos. Em viewport móvel, o mesmo trigger abre um drawer modal.", preview: <ControlledSidebarDemo />, code: 'const [open, setOpen] = useState(true);\n\n<SidebarProvider open={open} onOpenChange={setOpen}>\n  <Sidebar collapsible="offcanvas">…</Sidebar>\n  <SidebarInset>\n    <SidebarTrigger />\n    <button onClick={() => setOpen((value) => !value)}>Alternar</button>\n  </SidebarInset>\n</SidebarProvider>' },
    ],
  },
  {
    id: "theme-switcher",
    title: "Theme Switcher",
    summary: "Alterna entre temas disponíveis com uma seleção compacta e acessível.",
    importCode: 'import { ThemeSwitcher } from "@arcsyn/react";',
    status: "React estável · Web",
    anatomy: ["Wrapper", "Select nativo", "Opções de tema", "Callback de mudança"],
    accessibility: "O componente usa um select nativo nomeado pelo label, preservando teclado, foco e anúncio da opção selecionada pelo navegador. Forneça um label que descreva o escopo afetado. Não há equivalente React Native: no mobile, controle a prop theme de ArcSynProvider com componentes nativos da aplicação.",
    properties: [
      { name: "value", type: '"light" | "dark" | "deep-dark" | "corporate-dark" | "catppuccin-mocha" | "catppuccin-latte"', defaultValue: "—", description: "Tema selecionado no modo controlado." },
      { name: "defaultValue", type: '"light" | "dark" | "deep-dark" | "corporate-dark" | "catppuccin-mocha" | "catppuccin-latte"', defaultValue: '"dark"', description: "Tema inicial no modo não controlado." },
      { name: "onValueChange", type: "(theme) => void", defaultValue: "—", description: "Recebe o tema escolhido pelo usuário." },
      { name: "options", type: "readonly ThemeSwitcherOption[]", defaultValue: "6 temas ArcSyn", description: "Personaliza temas disponíveis e seus rótulos." },
      { name: "label", type: "string", defaultValue: '"Tema"', description: "Nome acessível do grupo." },
      { name: "disabled", type: "boolean", defaultValue: "false", description: "Desabilita todas as opções." },
    ],
    examples: [
      {
        title: "Temas da documentação",
        description: "O select abre as opções nativas; a aplicação controla o valor, atualiza data-arcsyn-theme e decide como persistir a escolha.",
        preview: <DocsThemeSwitcher />,
        code: 'const [theme, setTheme] = useState("dark");\n\n<ThemeSwitcher\n  value={theme}\n  onValueChange={(nextTheme) => {\n    document.documentElement.dataset.arcsynTheme = nextTheme;\n    setTheme(nextTheme);\n  }}\n/>',
      },
      {
        title: "Seleção não controlada",
        description: "Use defaultValue quando a aplicação só precisar reagir à escolha.",
        preview: <ThemeSwitcher defaultValue="deep-dark" onValueChange={() => undefined} label="Tema da prévia" />,
        code: '<ThemeSwitcher\n  defaultValue="deep-dark"\n  onValueChange={savePreference}\n  label="Tema da aplicação"\n/>',
      },
    ],
  },
  {
    id: "icons",
    title: "Icons",
    summary: "Catálogo curado de ícones Lucide com os mesmos nomes nos adaptadores React e React Native.",
    importCode: 'import { CheckIcon, PlusIcon } from "@arcsyn/react/icons";\nimport { CheckIcon, PlusIcon } from "@arcsyn/react-native/icons";',
    status: "React estável · React Native",
    anatomy: ["SVG vetorial", "ViewBox 24 × 24", "Traço herdado da cor do contexto", "Tamanho explícito"],
    accessibility: "Ícones decorativos devem usar aria-hidden no web e accessible={false} no React Native. Quando um ícone for o único conteúdo interativo, forneça aria-label ou accessibilityLabel no controle; o desenho não substitui um nome acessível.",
    properties: [
      { name: "size", type: "number | string", defaultValue: "24", description: "Define largura e altura. Componentes ArcSyn usam normalmente 16px." },
      { name: "color", type: "string", defaultValue: '"currentColor"', description: "Herda a cor no web; no React Native, informe a cor do tema." },
      { name: "strokeWidth", type: "number", defaultValue: "2", description: "Espessura padrão da família Lucide." },
      { name: "...svgProps", type: "SVGProps | SvgProps", defaultValue: "—", description: "Aceita as propriedades da plataforma correspondente." },
    ],
    examples: [
      {
        title: "Catálogo curado",
        description: "Use os exports ArcSyn para manter os mesmos nomes nas duas plataformas.",
        preview: <div className="docs-icon-grid"><span><ArrowLeftIcon aria-hidden size={20} />ArrowLeftIcon</span><span><ArrowRightIcon aria-hidden size={20} />ArrowRightIcon</span><span><CheckIcon aria-hidden size={20} />CheckIcon</span><span><ChevronDownIcon aria-hidden size={20} />ChevronDownIcon</span><span><ChevronLeftIcon aria-hidden size={20} />ChevronLeftIcon</span><span><ChevronRightIcon aria-hidden size={20} />ChevronRightIcon</span><span><CircleIcon aria-hidden size={20} />CircleIcon</span><span><EllipsisIcon aria-hidden size={20} />EllipsisIcon</span><span><MinusIcon aria-hidden size={20} />MinusIcon</span><span><PlusIcon aria-hidden size={20} />PlusIcon</span><span><SettingsIcon aria-hidden size={20} />SettingsIcon</span><span><XIcon aria-hidden size={20} />XIcon</span></div>,
        code: 'import { CheckIcon, PlusIcon } from "@arcsyn/react/icons";\n\n<CheckIcon aria-hidden size={16} />\n<PlusIcon aria-hidden size={16} />',
      },
      {
        title: "Com Button",
        description: "As props de Button continuam aceitando ReactNode, permitindo ícones ArcSyn ou conteúdo customizado.",
        preview: <div className="docs-demo-row"><Button leadingIcon={<PlusIcon aria-hidden size={16} />}>Adicionar</Button><Button variant="secondary" trailingIcon={<ArrowRightIcon aria-hidden size={16} />}>Continuar</Button><Button variant="ghost" aria-label="Fechar"><XIcon aria-hidden size={16} /></Button></div>,
        code: '<Button leadingIcon={<PlusIcon aria-hidden size={16} />}>Adicionar</Button>\n<Button aria-label="Fechar" variant="ghost"><XIcon aria-hidden size={16} /></Button>',
      },
    ],
  },
  {
    id: "menubar", title: "Menu Bar", summary: "Organiza comandos persistentes de aplicações desktop em menus coordenados.", importCode: 'import { Menubar } from "@arcsyn/react";', status: "React estável · Base UI · Web",
    anatomy: ["Root com role=menubar", "Menu lógico", "Trigger", "Content em portal", "Group e Label", "Item, CheckboxItem ou RadioItem"],
    accessibility: "Base UI fornece roving focus, Home, End, setas e Escape. Use Menu Bar para comandos de aplicação, não para navegação primária de sites. Label precisa estar dentro de Group ou RadioGroup. Não há equivalente React Native: em telas móveis, prefira ações visíveis, Dropdown Menu ou navegação nativa.",
    properties: [
      { name: "Menubar.Root.orientation", type: '"horizontal" | "vertical"', defaultValue: '"horizontal"', description: "Define o eixo de navegação por setas." },
      { name: "Menubar.Root.loopFocus", type: "boolean", defaultValue: "true", description: "Retorna ao primeiro trigger ao passar do último." },
      { name: "Menubar.Root.modal", type: "boolean", defaultValue: "true", description: "Limita interação ao menu enquanto algum Content estiver aberto." },
      { name: "Menubar.Root.disabled", type: "boolean", defaultValue: "false", description: "Desabilita toda a barra." },
      { name: "Menubar.Menu.open", type: "boolean", defaultValue: "—", description: "Controla um menu individual." },
      { name: "Menubar.Item.variant", type: '"default" | "danger" | "destructive"', defaultValue: '"default"', description: "Destaca comandos destrutivos." },
      { name: "Menubar.CheckboxItem.checked", type: "boolean", defaultValue: "—", description: "Representa uma configuração independente." },
    ],
    examples: [
      { title: "Comandos de arquivo e edição", description: "Agrupe comandos estáveis e mostre atalhos apenas como apoio visual.", preview: <Menubar.Root><Menubar.Menu><Menubar.Trigger>Arquivo</Menubar.Trigger><Menubar.Content><Menubar.Group><Menubar.Label>Documento</Menubar.Label><Menubar.Item>Novo <Menubar.Shortcut>Ctrl N</Menubar.Shortcut></Menubar.Item><Menubar.Item>Abrir <Menubar.Shortcut>Ctrl O</Menubar.Shortcut></Menubar.Item><Menubar.Item>Salvar <Menubar.Shortcut>Ctrl S</Menubar.Shortcut></Menubar.Item></Menubar.Group><Menubar.Separator /><Menubar.Item variant="danger">Excluir rascunho</Menubar.Item></Menubar.Content></Menubar.Menu><Menubar.Menu><Menubar.Trigger>Editar</Menubar.Trigger><Menubar.Content><Menubar.Item>Desfazer <Menubar.Shortcut>Ctrl Z</Menubar.Shortcut></Menubar.Item><Menubar.Item>Refazer <Menubar.Shortcut>Ctrl Y</Menubar.Shortcut></Menubar.Item></Menubar.Content></Menubar.Menu></Menubar.Root>, code: '<Menubar.Root>\n  <Menubar.Menu>\n    <Menubar.Trigger>Arquivo</Menubar.Trigger>\n    <Menubar.Content>\n      <Menubar.Group>\n        <Menubar.Label>Documento</Menubar.Label>\n        <Menubar.Item>Novo</Menubar.Item>\n      </Menubar.Group>\n    </Menubar.Content>\n  </Menubar.Menu>\n</Menubar.Root>' },
      { title: "Preferências", description: "CheckboxItem mantém opções independentes; RadioGroup representa uma escolha exclusiva.", preview: <Menubar.Root><Menubar.Menu><Menubar.Trigger>Visualizar</Menubar.Trigger><Menubar.Content><Menubar.Group><Menubar.Label>Painéis</Menubar.Label><Menubar.CheckboxItem defaultChecked>Barra lateral</Menubar.CheckboxItem><Menubar.CheckboxItem>Console</Menubar.CheckboxItem></Menubar.Group><Menubar.Separator /><Menubar.RadioGroup defaultValue="compact"><Menubar.Label>Densidade</Menubar.Label><Menubar.RadioItem value="compact">Compacta</Menubar.RadioItem><Menubar.RadioItem value="comfortable">Confortável</Menubar.RadioItem></Menubar.RadioGroup></Menubar.Content></Menubar.Menu></Menubar.Root>, code: '<Menubar.CheckboxItem defaultChecked>Barra lateral</Menubar.CheckboxItem>\n<Menubar.RadioGroup defaultValue="compact">\n  <Menubar.Label>Densidade</Menubar.Label>\n  <Menubar.RadioItem value="compact">Compacta</Menubar.RadioItem>\n</Menubar.RadioGroup>' },
      { title: "Barra desabilitada", description: "Use disabled quando todos os comandos dependem de um contexto ainda indisponível.", preview: <Menubar.Root disabled><Menubar.Menu><Menubar.Trigger>Arquivo</Menubar.Trigger><Menubar.Content><Menubar.Item>Salvar</Menubar.Item></Menubar.Content></Menubar.Menu><Menubar.Menu><Menubar.Trigger>Editar</Menubar.Trigger><Menubar.Content><Menubar.Item>Desfazer</Menubar.Item></Menubar.Content></Menubar.Menu></Menubar.Root>, code: '<Menubar.Root disabled>…</Menubar.Root>' },
    ],
  },
  {
    id: "native-select", title: "Native Select", summary: "Usa o controle select do navegador para escolhas simples e familiares.", importCode: 'import { NativeSelect, NativeSelectOption, NativeSelectOptGroup } from "@arcsyn/react";', status: "React estável · HTML nativo · Web",
    anatomy: ["Wrapper visual", "Elemento select nativo", "Option ou OptGroup", "Indicador decorativo"],
    accessibility: "Associe sempre um label ao select e use a primeira option vazia como placeholder quando necessário. O menu de opções, teclado e leitores de tela são administrados pelo navegador. React Native não oferece select em seu núcleo; use Select, que abre uma seleção modal acessível.",
    properties: [
      { name: "size", type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: "Define a altura visual do controle." },
      { name: "invalid", type: "boolean", defaultValue: "false", description: "Aplica estado de erro e aria-invalid." },
      { name: "disabled", type: "boolean", defaultValue: "false", description: "Desabilita o controle nativo." },
      { name: "value / defaultValue", type: "string | string[]", defaultValue: "—", description: "Controla ou inicializa a opção selecionada." },
      { name: "onChange", type: "ChangeEventHandler<HTMLSelectElement>", defaultValue: "—", description: "Recebe a mudança nativa." },
      { name: "wrapperClassName", type: "string", defaultValue: "—", description: "Complementa o wrapper que posiciona o indicador." },
    ],
    examples: [
      { title: "Seleção simples", description: "O navegador fornece o popup de opções e o comportamento adequado para cada plataforma.", preview: <label className="docs-field" htmlFor="native-environment">Ambiente<NativeSelect id="native-environment" defaultValue=""><NativeSelectOption value="" disabled>Selecione um ambiente</NativeSelectOption><NativeSelectOption value="dev">Desenvolvimento</NativeSelectOption><NativeSelectOption value="stg">Homologação</NativeSelectOption><NativeSelectOption value="prd">Produção</NativeSelectOption></NativeSelect></label>, code: '<label htmlFor="environment">Ambiente</label>\n<NativeSelect id="environment" defaultValue="">\n  <NativeSelectOption value="" disabled>Selecione</NativeSelectOption>\n  <NativeSelectOption value="prd">Produção</NativeSelectOption>\n</NativeSelect>' },
      { title: "Grupos de opções", description: "OptGroup dá contexto a listas maiores sem substituir um rótulo visível do campo.", preview: <label className="docs-field" htmlFor="native-region">Região<NativeSelect id="native-region" defaultValue="gru"><NativeSelectOptGroup label="América do Sul"><NativeSelectOption value="gru">São Paulo</NativeSelectOption><NativeSelectOption value="scl">Santiago</NativeSelectOption></NativeSelectOptGroup><NativeSelectOptGroup label="América do Norte"><NativeSelectOption value="iad">Virgínia</NativeSelectOption><NativeSelectOption value="pdx">Oregon</NativeSelectOption></NativeSelectOptGroup></NativeSelect></label>, code: '<NativeSelectOptGroup label="América do Sul">\n  <NativeSelectOption value="gru">São Paulo</NativeSelectOption>\n</NativeSelectOptGroup>' },
      { title: "Tamanhos e estados", description: "Os três tamanhos preservam o comportamento nativo; invalid e disabled comunicam estados funcionais.", preview: <div className="docs-demo-row"><NativeSelect size="sm" aria-label="Tamanho pequeno" defaultValue="one"><NativeSelectOption value="one">Pequeno</NativeSelectOption></NativeSelect><NativeSelect aria-label="Com erro" invalid defaultValue="invalid"><NativeSelectOption value="invalid">Valor inválido</NativeSelectOption></NativeSelect><NativeSelect size="lg" aria-label="Desabilitado" disabled><NativeSelectOption>Desabilitado</NativeSelectOption></NativeSelect></div>, code: '<NativeSelect size="sm">…</NativeSelect>\n<NativeSelect invalid>…</NativeSelect>\n<NativeSelect size="lg" disabled>…</NativeSelect>' },
    ],
  },
  {
    id: "pagination", title: "Pagination", summary: "Permite navegar entre páginas discretas de uma coleção extensa.", importCode: 'import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@arcsyn/react";', status: "React estável · React Native",
    anatomy: ["Nav nomeado", "Content em lista", "Item", "Previous e Next", "Link de página", "Ellipsis opcional"],
    accessibility: "O componente usa nav e lista; marque a página atual com active para gerar aria-current=page. Links indisponíveis precisam de aria-disabled e não devem navegar. No React Native, page é controlado e cada botão recebe nome e estado selecionado.",
    properties: [
      { name: "PaginationLink.active", type: "boolean", defaultValue: "false", description: "Marca a página atual visual e semanticamente." },
      { name: "PaginationLink.href", type: "string", defaultValue: "—", description: "Destino real da página para navegação progressiva." },
      { name: "PaginationPrevious / Next", type: "AnchorHTMLAttributes", defaultValue: "—", description: "Controles com nomes acessíveis predefinidos." },
      { name: "PaginationEllipsis", type: "HTMLAttributes<HTMLSpanElement>", defaultValue: "—", description: "Representa páginas omitidas sem entrar na ordem de foco." },
      { name: "RN page / totalPages", type: "number", defaultValue: "obrigatório", description: "Define a página atual e o total no adaptador nativo." },
      { name: "RN onPageChange", type: "(page: number) => void", defaultValue: "—", description: "Recebe a página solicitada no mobile." },
    ],
    examples: [
      { title: "Faixa curta", description: "Exiba todas as páginas quando a quantidade permanecer fácil de percorrer.", preview: <Pagination><PaginationContent><PaginationItem><PaginationPrevious href="#/components/pagination" aria-disabled="true" /></PaginationItem>{[1, 2, 3, 4].map((page) => <PaginationItem key={page}><PaginationLink href={`#/components/pagination?page=${page}`} active={page === 1}>{page}</PaginationLink></PaginationItem>)}<PaginationItem><PaginationNext href="#/components/pagination?page=2" /></PaginationItem></PaginationContent></Pagination>, code: '<Pagination>\n  <PaginationContent>\n    <PaginationItem><PaginationPrevious aria-disabled="true" /></PaginationItem>\n    <PaginationItem><PaginationLink active>1</PaginationLink></PaginationItem>\n    <PaginationItem><PaginationLink>2</PaginationLink></PaginationItem>\n    <PaginationItem><PaginationNext /></PaginationItem>\n  </PaginationContent>\n</Pagination>' },
      { title: "Muitas páginas", description: "Use Ellipsis para omitir intervalos e mantenha sempre visíveis a página atual e os limites relevantes.", preview: <Pagination><PaginationContent><PaginationItem><PaginationPrevious href="#pagination-many" /></PaginationItem><PaginationItem><PaginationLink href="#pagination-many">1</PaginationLink></PaginationItem><PaginationItem><PaginationEllipsis /></PaginationItem><PaginationItem><PaginationLink href="#pagination-many">7</PaginationLink></PaginationItem><PaginationItem><PaginationLink href="#pagination-many" active>8</PaginationLink></PaginationItem><PaginationItem><PaginationLink href="#pagination-many">9</PaginationLink></PaginationItem><PaginationItem><PaginationEllipsis /></PaginationItem><PaginationItem><PaginationLink href="#pagination-many">24</PaginationLink></PaginationItem><PaginationItem><PaginationNext href="#pagination-many" /></PaginationItem></PaginationContent></Pagination>, code: '<PaginationLink>1</PaginationLink>\n<PaginationEllipsis />\n<PaginationLink active>8</PaginationLink>\n<PaginationEllipsis />\n<PaginationLink>24</PaginationLink>' },
      { title: "Estado controlado", description: "Intercepte a navegação quando a coleção é carregada no cliente e mantenha active sincronizado.", preview: <ControlledPaginationDemo />, code: 'const [page, setPage] = useState(3);\n<PaginationLink active={page === item} onClick={() => setPage(item)}>{item}</PaginationLink>' },
    ],
  },
  {
    id: "empty", title: "Empty", summary: "Explica a ausência de conteúdo e oferece uma próxima ação relevante.", importCode: 'import { Empty, EmptyContent, EmptyDescription, EmptyFooter, EmptyHeader, EmptyMedia, EmptyTitle } from "@arcsyn/react";', status: "React estável · React Native",
    anatomy: ["Container", "Media opcional", "Header", "Title", "Description", "Content ou Footer com ações"],
    accessibility: "O título deve explicar o estado, e a descrição deve indicar por que ocorreu ou como resolvê-lo. Media é decorativa por padrão. Não use role=alert para estados vazios estáticos; preserve foco e anuncie mudanças dinâmicas na região que controla os resultados.",
    properties: [
      { name: "Empty", type: "HTMLAttributes<HTMLDivElement>", defaultValue: "—", description: "Container flexível do estado vazio." },
      { name: "EmptyMedia", type: "HTMLAttributes<HTMLDivElement>", defaultValue: "—", description: "Área decorativa para ícone ou abreviação." },
      { name: "EmptyTitle", type: "HTMLAttributes<HTMLHeadingElement>", defaultValue: "—", description: "Resumo objetivo do estado." },
      { name: "EmptyDescription", type: "HTMLAttributes<HTMLParagraphElement>", defaultValue: "—", description: "Contexto e orientação complementar." },
      { name: "EmptyContent / Footer", type: "HTMLAttributes<HTMLDivElement>", defaultValue: "—", description: "Agrupa ações ou conteúdo auxiliar." },
    ],
    examples: [
      { title: "Sem registros", description: "Uma ação primária ajuda a iniciar a coleção pela primeira vez.", preview: <Empty><EmptyMedia>DOC</EmptyMedia><EmptyHeader><EmptyTitle>Nenhum documento</EmptyTitle><EmptyDescription>Crie o primeiro documento deste projeto para compartilhar decisões com a equipe.</EmptyDescription></EmptyHeader><EmptyContent><Button>Criar documento</Button><Button variant="ghost">Importar arquivo</Button></EmptyContent></Empty>, code: '<Empty>\n  <EmptyMedia>DOC</EmptyMedia>\n  <EmptyHeader>\n    <EmptyTitle>Nenhum documento</EmptyTitle>\n    <EmptyDescription>Crie o primeiro documento deste projeto.</EmptyDescription>\n  </EmptyHeader>\n  <EmptyContent><Button>Criar documento</Button></EmptyContent>\n</Empty>' },
      { title: "Nenhum resultado", description: "Quando filtros causam o estado vazio, priorize limpar ou ajustar os critérios.", preview: <Empty><EmptyMedia>0</EmptyMedia><EmptyHeader><EmptyTitle>Nenhum resultado encontrado</EmptyTitle><EmptyDescription>Não encontramos ambientes com status “erro” na região selecionada.</EmptyDescription></EmptyHeader><EmptyFooter><Button variant="secondary">Limpar filtros</Button></EmptyFooter></Empty>, code: '<EmptyTitle>Nenhum resultado encontrado</EmptyTitle>\n<EmptyDescription>Revise ou limpe os filtros aplicados.</EmptyDescription>\n<EmptyFooter><Button variant="secondary">Limpar filtros</Button></EmptyFooter>' },
      { title: "Somente orientação", description: "Não force uma ação quando o estado é informativo e depende de outro processo.", preview: <Empty><EmptyHeader><EmptyTitle>Aguardando sincronização</EmptyTitle><EmptyDescription>Os dados aparecerão aqui após a primeira execução concluída.</EmptyDescription></EmptyHeader></Empty>, code: '<Empty>\n  <EmptyHeader>\n    <EmptyTitle>Aguardando sincronização</EmptyTitle>\n    <EmptyDescription>Os dados aparecerão após a primeira execução.</EmptyDescription>\n  </EmptyHeader>\n</Empty>' },
    ],
  },
  {
    id: "skeleton", title: "Skeleton", summary: "Reserva a geometria do conteúdo enquanto os dados estão carregando.", importCode: 'import { Skeleton } from "@arcsyn/react";', status: "React estável · React Native",
    anatomy: ["Bloco visual", "Forma", "Dimensões", "Animação opcional"],
    accessibility: "Skeleton é decorativo e fica oculto de tecnologias assistivas. Marque a região real como aria-busy enquanto carrega e forneça um nome de status quando a espera precisar ser anunciada. Animações são removidas com prefers-reduced-motion; no mobile use animated=false quando necessário.",
    properties: [
      { name: "variant", type: '"text" | "rectangular" | "circular"', defaultValue: '"rectangular"', description: "Define a geometria base." },
      { name: "animation", type: '"pulse" | "wave" | "none"', defaultValue: '"pulse"', description: "Escolhe o feedback visual no web." },
      { name: "width / height", type: "CSSProperties dimension", defaultValue: "—", description: "Reserva as dimensões finais do conteúdo." },
      { name: "RN animated", type: "boolean", defaultValue: "true", description: "Ativa ou desativa o pulso no React Native." },
      { name: "className / style", type: "string / CSSProperties", defaultValue: "—", description: "Complementa a composição do placeholder." },
    ],
    examples: [
      { title: "Formas", description: "Escolha uma forma próxima ao conteúdo final para reduzir mudanças de layout.", preview: <div className="docs-demo-row"><Skeleton variant="circular" width={44} height={44} /><Skeleton variant="text" width="12rem" /><Skeleton width="10rem" height="4rem" /></div>, code: '<Skeleton variant="circular" width={44} height={44} />\n<Skeleton variant="text" width="12rem" />\n<Skeleton width="10rem" height="4rem" />' },
      { title: "Cartão em carregamento", description: "Combine blocos simples seguindo a hierarquia do conteúdo que será renderizado.", preview: <div className="docs-skeleton-card" aria-busy="true" aria-label="Carregando resumo do ambiente"><Skeleton height="7rem" animation="wave" /><Skeleton variant="text" width="45%" /><Skeleton variant="text" /><Skeleton variant="text" width="72%" /></div>, code: '<div aria-busy="true" aria-label="Carregando resumo">\n  <Skeleton height="7rem" animation="wave" />\n  <Skeleton variant="text" width="45%" />\n  <Skeleton variant="text" />\n</div>' },
      { title: "Animações", description: "Pulse é o padrão; wave reforça movimento em áreas maiores; none oferece uma reserva totalmente estática.", preview: <div className="docs-demo-stack"><Skeleton height="2rem" animation="pulse" /><Skeleton height="2rem" animation="wave" /><Skeleton height="2rem" animation="none" /></div>, code: '<Skeleton animation="pulse" />\n<Skeleton animation="wave" />\n<Skeleton animation="none" />' },
    ],
  },
  {
    id: "sonner", title: "Toaster / Sonner", summary: "Exibe notificações temporárias globais com estados, ações e feedback assíncrono.", importCode: 'import { Toaster, toast } from "@arcsyn/react";', status: "React estável · Sonner · Web",
    anatomy: ["Toaster global", "Toast imperativo", "Título e descrição", "Ícone de estado", "Action ou Cancel opcionais", "Close opcional"],
    accessibility: "Monte um único Toaster próximo à raiz da aplicação. Sonner administra a região de notificações e a ordem dos avisos; mantenha títulos curtos, não coloque informação essencial apenas no toast e ofereça ação persistente para erros que exigem correção. Use success, warning e error pelo significado, não como decoração. React Native não possui paridade nesta implementação.",
    properties: [
      { name: "Toaster.position", type: '"top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"', defaultValue: '"bottom-right"', description: "Define a posição padrão das notificações." },
      { name: "Toaster.effect", type: '"slide" | "fade" | "scale" | "spring" | "blur" | "none"', defaultValue: '"spring"', description: "Escolhe a transição de entrada e saída. Respeita prefers-reduced-motion." },
      { name: "Toaster.closeButton", type: "boolean", defaultValue: "true", description: "Mostra fechamento explícito em cada toast." },
      { name: "Toaster.richColors", type: "boolean", defaultValue: "true", description: "Usa cores semânticas ArcSyn para estados." },
      { name: "Toaster.duration", type: "number", defaultValue: "4000", description: "Duração padrão em milissegundos." },
      { name: "Toaster.visibleToasts", type: "number", defaultValue: "3", description: "Limita notificações simultaneamente visíveis." },
      { name: "toast(message, options)", type: "(ReactNode, ExternalToast?) => string | number", defaultValue: "—", description: "Cria uma notificação e retorna seu ID." },
      { name: "toast.success / info / warning / error", type: "function", defaultValue: "—", description: "Cria notificações com significado semântico." },
      { name: "toast.promise", type: "(Promise, PromiseData) => ToastId", defaultValue: "—", description: "Atualiza o mesmo toast durante uma operação assíncrona." },
      { name: "toast.dismiss", type: "(id?) => void", defaultValue: "—", description: "Fecha um toast específico ou todos." },
    ],
    examples: [
      { title: "Tipos semânticos", description: "Escolha o tipo conforme o resultado comunicado; o estilo não substitui uma mensagem clara.", preview: <div className="docs-demo-row"><Button variant="secondary" onClick={() => toast("Alterações salvas como rascunho.")}>Padrão</Button><Button variant="secondary" onClick={() => toast.success("Publicação concluída.")}>Sucesso</Button><Button variant="secondary" onClick={() => toast.info("Uma nova versão está disponível.")}>Informação</Button><Button variant="secondary" onClick={() => toast.warning("A sessão expira em cinco minutos.")}>Atenção</Button><Button variant="secondary" onClick={() => toast.error("Não foi possível salvar.")}>Erro</Button></div>, code: 'toast("Alterações salvas como rascunho.")\ntoast.success("Publicação concluída.")\ntoast.info("Uma nova versão está disponível.")\ntoast.warning("A sessão expira em cinco minutos.")\ntoast.error("Não foi possível salvar.")' },
      { title: "Descrição e ação", description: "Use description para contexto curto e action para uma resposta imediata e reversível.", preview: <Button variant="outline" onClick={() => toast("Projeto arquivado", { description: "O projeto saiu da lista de ativos.", action: { label: "Desfazer", onClick: () => toast.success("Projeto restaurado.") } })}>Arquivar projeto</Button>, code: 'toast("Projeto arquivado", {\n  description: "O projeto saiu da lista de ativos.",\n  action: {\n    label: "Desfazer",\n    onClick: () => restoreProject(),\n  },\n})' },
      { title: "Operação assíncrona", description: "toast.promise mantém uma única notificação e troca loading pelo resultado da Promise.", preview: <Button onClick={() => toast.promise(new Promise<string>((resolve) => window.setTimeout(() => resolve("run_8F2A"), 900)), { loading: "Iniciando execução…", success: (id) => `Execução ${id} iniciada.`, error: "Falha ao iniciar a execução." })}>Executar processo</Button>, code: 'toast.promise(startRun(), {\n  loading: "Iniciando execução…",\n  success: (id) => `Execução ${id} iniciada.`,\n  error: "Falha ao iniciar a execução.",\n})' },
      { title: "Todos os efeitos", description: "O efeito é configurado no Toaster. Spring é o padrão; none remove a transição e todos respeitam a preferência de movimento reduzido.", preview: <ToasterEffectsDemo />, code: '<Toaster effect="slide" />\n<Toaster effect="fade" />\n<Toaster effect="scale" />\n<Toaster effect="spring" />\n<Toaster effect="blur" />\n<Toaster effect="none" />' },
      { title: "Todas as posições", description: "Uma chamada pode substituir a posição padrão sem exigir outro Toaster. As seis posições mantêm offsets seguros no desktop e no mobile.", preview: <div className="docs-demo-row"><Button variant="ghost" onClick={() => toast("Topo esquerdo", { position: "top-left" })}>Topo esquerdo</Button><Button variant="ghost" onClick={() => toast("Topo central", { position: "top-center" })}>Topo central</Button><Button variant="ghost" onClick={() => toast("Topo direito", { position: "top-right" })}>Topo direito</Button><Button variant="ghost" onClick={() => toast("Inferior esquerdo", { position: "bottom-left" })}>Inferior esquerdo</Button><Button variant="ghost" onClick={() => toast("Inferior central", { position: "bottom-center" })}>Inferior central</Button><Button variant="ghost" onClick={() => toast("Inferior direito", { position: "bottom-right" })}>Inferior direito</Button><Button variant="ghost" onClick={() => toast.dismiss()}>Fechar todas</Button></div>, code: 'toast("Topo esquerdo", { position: "top-left" })\ntoast("Topo central", { position: "top-center" })\ntoast("Topo direito", { position: "top-right" })\ntoast("Inferior esquerdo", { position: "bottom-left" })\ntoast("Inferior central", { position: "bottom-center" })\ntoast("Inferior direito", { position: "bottom-right" })' },
    ],
  },
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
    id: "drawer",
    title: "Drawer",
    summary: "Abre um painel modal a partir de uma borda para tarefas contextuais sem perder o contexto da página.",
    importCode: 'import { Drawer } from "@arcsyn/react";',
    status: "React estável · Base UI · React Native",
    anatomy: ["Root e Trigger", "Portal, Backdrop e Viewport", "Content", "Header: Title e Description", "Body rolável", "Footer e Close", "Handle opcional para top e bottom"],
    accessibility: "No web, Base UI move e restringe o foco, bloqueia o scroll da página, fecha com Escape ou gesto e devolve o foco ao trigger. Inclua sempre Title, Description e uma ação Close visível. No React Native, Drawer usa Modal, fecha pelo botão voltar no Android e oferece Close explícito; os quatro lados são suportados, mas gestos de arrastar e snap points estão disponíveis apenas no web.",
    properties: [
      { name: "Drawer.Root.side", type: '"top" | "right" | "bottom" | "left"', defaultValue: '"right"', description: "Define a borda de origem e a direção do gesto de fechamento." },
      { name: "Drawer.Root.open", type: "boolean", defaultValue: "—", description: "Controla a visibilidade do painel." },
      { name: "Drawer.Root.defaultOpen", type: "boolean", defaultValue: "false", description: "Define o estado inicial não controlado." },
      { name: "Drawer.Root.onOpenChange", type: "(open: boolean) => void", defaultValue: "—", description: "Recebe mudanças causadas pelo trigger, Escape, backdrop, gesto ou Close." },
      { name: "Drawer.Root.modal", type: "boolean | 'trap-focus'", defaultValue: "true", description: "Controla bloqueio do fundo, scroll e contenção de foco no web." },
      { name: "Drawer.Root.snapPoints", type: "Array<number | string>", defaultValue: "—", description: "Define posições intermediárias para drawers web verticais." },
      { name: "Drawer.Trigger.variant", type: "ButtonVariant", defaultValue: '"secondary"', description: "Aplica uma variante oficial de Button ao trigger." },
      { name: "Drawer.Content.className", type: "string", defaultValue: "—", description: "Complementa dimensões e layout do painel web." },
      { name: "Drawer.Close.variant", type: "ButtonVariant", defaultValue: '"secondary"', description: "Define o tratamento visual da ação de fechamento." },
    ],
    examples: [
      {
        title: "Edição contextual",
        description: "Use o lado direito para editar uma entidade sem retirar a pessoa da listagem ou painel de origem.",
        preview: (
          <Drawer.Root>
            <Drawer.Trigger>Editar ambiente</Drawer.Trigger>
            <Drawer.Content>
              <Drawer.Header>
                <Drawer.Title>Editar ambiente</Drawer.Title>
                <Drawer.Description>Atualize os dados de Produção Brasil.</Drawer.Description>
              </Drawer.Header>
              <Drawer.Body>
                <div className="docs-demo-stack">
                  <Field.Root>
                    <Field.Label htmlFor="drawer-environment-name">Nome</Field.Label>
                    <Input id="drawer-environment-name" defaultValue="Produção Brasil" />
                    <Field.Description>Visível para todos os integrantes do workspace.</Field.Description>
                  </Field.Root>
                  <Field.Root>
                    <Field.Label htmlFor="drawer-environment-owner">Responsável</Field.Label>
                    <Input id="drawer-environment-owner" type="email" defaultValue="operacoes@arcsyn.io" />
                  </Field.Root>
                  <div className="docs-theme-options"><label><Switch defaultChecked />Sincronização automática</label></div>
                </div>
              </Drawer.Body>
              <Drawer.Footer>
                <Drawer.Close>Cancelar</Drawer.Close>
                <Drawer.Close variant="primary">Salvar alterações</Drawer.Close>
              </Drawer.Footer>
            </Drawer.Content>
          </Drawer.Root>
        ),
        code: '<Drawer.Root side="right">\n  <Drawer.Trigger>Editar ambiente</Drawer.Trigger>\n  <Drawer.Content>\n    <Drawer.Header>\n      <Drawer.Title>Editar ambiente</Drawer.Title>\n      <Drawer.Description>Atualize os dados do ambiente.</Drawer.Description>\n    </Drawer.Header>\n    <Drawer.Body>{/* Campos */}</Drawer.Body>\n    <Drawer.Footer>\n      <Drawer.Close>Cancelar</Drawer.Close>\n      <Drawer.Close variant="primary">Salvar alterações</Drawer.Close>\n    </Drawer.Footer>\n  </Drawer.Content>\n</Drawer.Root>',
      },
      {
        title: "Filtros em painel inferior",
        description: "Em telas estreitas, o lado inferior mantém controles próximos da área de alcance e oferece um handle visual para o gesto.",
        preview: (
          <Drawer.Root side="bottom">
            <Drawer.Trigger variant="outline">Filtrar projetos</Drawer.Trigger>
            <Drawer.Content>
              <Drawer.Handle />
              <Drawer.Header>
                <Drawer.Title>Filtrar projetos</Drawer.Title>
                <Drawer.Description>Refine a lista por ambiente e condição operacional.</Drawer.Description>
              </Drawer.Header>
              <Drawer.Body>
                <div className="docs-demo-stack">
                  <strong>Ambiente</strong>
                  <label><Checkbox defaultChecked /> Produção</label>
                  <label><Checkbox /> Homologação</label>
                  <label><Checkbox /> Desenvolvimento</label>
                </div>
              </Drawer.Body>
              <Drawer.Footer>
                <Drawer.Close>Limpar</Drawer.Close>
                <Drawer.Close variant="primary">Aplicar filtros</Drawer.Close>
              </Drawer.Footer>
            </Drawer.Content>
          </Drawer.Root>
        ),
        code: '<Drawer.Root side="bottom">\n  <Drawer.Trigger variant="outline">Filtrar projetos</Drawer.Trigger>\n  <Drawer.Content>\n    <Drawer.Handle />\n    <Drawer.Header>\n      <Drawer.Title>Filtrar projetos</Drawer.Title>\n      <Drawer.Description>Refine a lista atual.</Drawer.Description>\n    </Drawer.Header>\n    <Drawer.Body>{/* Filtros */}</Drawer.Body>\n    <Drawer.Footer>\n      <Drawer.Close variant="primary">Aplicar filtros</Drawer.Close>\n    </Drawer.Footer>\n  </Drawer.Content>\n</Drawer.Root>',
      },
    ],
  },
  {
    id: "tabs",
    title: "Tabs",
    summary: "Alterna entre painéis relacionados dentro do mesmo contexto, preservando uma hierarquia compacta.",
    importCode: 'import { Tabs } from "@arcsyn/react";',
    status: "React estável · Base UI · React Native",
    anatomy: ["Root", "List com semântica tablist", "Tab com value único", "Indicator visual no web", "Panels", "Panel associado pelo mesmo value"],
    accessibility: "Base UI associa tabs e painéis, aplica os papéis ARIA, gerencia roving focus e oferece navegação por setas, Home e End. Por padrão, foco e ativação são separados; use activateOnFocus apenas quando o conteúdo trocar sem custo perceptível. No React Native, List e Tab expõem papéis e estado selected, cada alvo tem no mínimo 44px e a tab ativa recebe o indicador diretamente; a peça Indicator separada é exclusiva do web.",
    properties: [
      { name: "Tabs.Root.value", type: "string | number", defaultValue: "—", description: "Controla a tab ativa." },
      { name: "Tabs.Root.defaultValue", type: "string | number", defaultValue: "0", description: "Define a tab inicial no modo não controlado." },
      { name: "Tabs.Root.onValueChange", type: "(value) => void", defaultValue: "—", description: "Recebe alterações de seleção." },
      { name: "Tabs.Root.orientation", type: '"horizontal" | "vertical"', defaultValue: '"horizontal"', description: "Alinha a lista e define as teclas de direção usadas na navegação." },
      { name: "Tabs.List.activateOnFocus", type: "boolean", defaultValue: "false", description: "Ativa a tab ao receber foco pelas setas no web." },
      { name: "Tabs.List.loopFocus", type: "boolean", defaultValue: "true", description: "Retorna ao início quando a navegação alcança o fim da lista." },
      { name: "Tabs.Tab.value", type: "string | number", defaultValue: "obrigatório", description: "Identifica a tab e seu painel correspondente." },
      { name: "Tabs.Tab.disabled", type: "boolean", defaultValue: "false", description: "Mantém a tab visível, mas indisponível para seleção." },
      { name: "Tabs.Panel.value", type: "string | number", defaultValue: "obrigatório", description: "Associa o painel a uma Tab." },
      { name: "Tabs.Panel.keepMounted", type: "boolean", defaultValue: "false", description: "Preserva o painel inativo no DOM ou na árvore nativa." },
    ],
    examples: [
      {
        title: "Visão de um workspace",
        description: "Use tabs para alternar categorias equivalentes, mantendo rótulos curtos e uma seleção inicial explícita.",
        preview: (
          <Tabs.Root className="docs-tabs-demo" defaultValue="overview">
            <Tabs.List>
              <Tabs.Tab value="overview">Visão geral</Tabs.Tab>
              <Tabs.Tab value="activity">Atividade</Tabs.Tab>
              <Tabs.Tab value="settings">Configurações</Tabs.Tab>
              <Tabs.Tab value="billing" disabled>Faturamento</Tabs.Tab>
              <Tabs.Indicator />
            </Tabs.List>
            <Tabs.Panels>
              <Tabs.Panel value="overview"><div className="docs-tabs-panel"><strong>Workspace operacional</strong><p>12 projetos ativos, 3 ambientes e nenhuma interrupção crítica.</p></div></Tabs.Panel>
              <Tabs.Panel value="activity"><div className="docs-tabs-panel"><strong>Atividade recente</strong><p>Quatro configurações foram publicadas nas últimas 24 horas.</p></div></Tabs.Panel>
              <Tabs.Panel value="settings"><div className="docs-tabs-panel"><strong>Configurações</strong><p>Preferências de acesso, alertas e integrações do workspace.</p></div></Tabs.Panel>
              <Tabs.Panel value="billing"><div className="docs-tabs-panel"><strong>Faturamento</strong><p>Área temporariamente indisponível.</p></div></Tabs.Panel>
            </Tabs.Panels>
          </Tabs.Root>
        ),
        code: '<Tabs.Root defaultValue="overview">\n  <Tabs.List>\n    <Tabs.Tab value="overview">Visão geral</Tabs.Tab>\n    <Tabs.Tab value="activity">Atividade</Tabs.Tab>\n    <Tabs.Tab value="settings">Configurações</Tabs.Tab>\n    <Tabs.Indicator />\n  </Tabs.List>\n  <Tabs.Panels>\n    <Tabs.Panel value="overview">…</Tabs.Panel>\n    <Tabs.Panel value="activity">…</Tabs.Panel>\n    <Tabs.Panel value="settings">…</Tabs.Panel>\n  </Tabs.Panels>\n</Tabs.Root>',
      },
      {
        title: "Estado controlado",
        description: "Controle value quando outra parte da interface também precisar alterar ou refletir a tab ativa.",
        preview: <ControlledTabsDemo />,
        code: 'const [value, setValue] = useState("activity");\n\n<Tabs.Root value={value} onValueChange={setValue}>\n  <Tabs.List>…</Tabs.List>\n  <Tabs.Panels>…</Tabs.Panels>\n</Tabs.Root>',
      },
      {
        title: "Orientação vertical",
        description: "Use a orientação vertical quando os rótulos forem numerosos ou precisarem de mais espaço horizontal.",
        preview: (
          <Tabs.Root className="docs-tabs-demo" defaultValue="general" orientation="vertical">
            <Tabs.List>
              <Tabs.Tab value="general">Geral</Tabs.Tab>
              <Tabs.Tab value="members">Integrantes</Tabs.Tab>
              <Tabs.Tab value="security">Segurança</Tabs.Tab>
              <Tabs.Indicator />
            </Tabs.List>
            <Tabs.Panels>
              <Tabs.Panel value="general"><div className="docs-tabs-panel"><strong>Geral</strong><p>Nome, região e preferências principais.</p></div></Tabs.Panel>
              <Tabs.Panel value="members"><div className="docs-tabs-panel"><strong>Integrantes</strong><p>Gerencie convites, papéis e grupos.</p></div></Tabs.Panel>
              <Tabs.Panel value="security"><div className="docs-tabs-panel"><strong>Segurança</strong><p>Políticas de sessão e autenticação.</p></div></Tabs.Panel>
            </Tabs.Panels>
          </Tabs.Root>
        ),
        code: '<Tabs.Root defaultValue="general" orientation="vertical">\n  <Tabs.List>\n    <Tabs.Tab value="general">Geral</Tabs.Tab>\n    <Tabs.Tab value="members">Integrantes</Tabs.Tab>\n    <Tabs.Tab value="security">Segurança</Tabs.Tab>\n    <Tabs.Indicator />\n  </Tabs.List>\n  <Tabs.Panels>…</Tabs.Panels>\n</Tabs.Root>',
      },
    ],
  },
  {
    id: "tooltip",
    title: "Tooltip",
    summary: "Exibe uma dica curta e complementar quando um controle recebe hover, foco ou toque longo.",
    importCode: 'import { Tooltip } from "@arcsyn/react";',
    status: "React estável · Base UI · React Native",
    anatomy: ["Provider opcional para atrasos compartilhados", "Root", "Trigger", "Portal e Positioner internos", "Content", "Arrow opcional no web"],
    accessibility: "Tooltips complementam, mas não substituem, o nome acessível ou o rótulo visível do trigger. Mantenha o conteúdo curto, sem controles interativos e disponível por foco de teclado; Base UI abre por hover ou foco e fecha com Escape. No React Native, o trigger abre a dica por toque longo e o conteúdo aparece em uma camada dispensável por toque ou pelo botão voltar. Hover e Arrow são exclusivos do web.",
    properties: [
      { name: "Tooltip.Provider.delay", type: "number", defaultValue: "500", description: "Define em milissegundos o atraso compartilhado antes da abertura." },
      { name: "Tooltip.Provider.closeDelay", type: "number", defaultValue: "100", description: "Define o atraso compartilhado antes do fechamento no web." },
      { name: "Tooltip.Root.open", type: "boolean", defaultValue: "—", description: "Controla a visibilidade da dica." },
      { name: "Tooltip.Root.defaultOpen", type: "boolean", defaultValue: "false", description: "Define o estado inicial não controlado." },
      { name: "Tooltip.Root.onOpenChange", type: "(open: boolean) => void", defaultValue: "—", description: "Recebe mudanças causadas por hover, foco, toque, Escape ou fechamento externo." },
      { name: "Tooltip.Root.disabled", type: "boolean", defaultValue: "false", description: "Impede a abertura sem remover o trigger." },
      { name: "Tooltip.Trigger.delay", type: "number", defaultValue: "600 / Provider", description: "Sobrescreve o atraso de abertura deste trigger no web." },
      { name: "Tooltip.Trigger.closeOnClick", type: "boolean", defaultValue: "true", description: "Fecha a dica quando o trigger é acionado no web." },
      { name: "Tooltip.Content.side", type: '"top" | "right" | "bottom" | "left"', defaultValue: '"top"', description: "Define o lado preferencial, com inversão automática quando não houver espaço." },
      { name: "Tooltip.Content.align", type: '"start" | "center" | "end"', defaultValue: '"center"', description: "Alinha a dica ao trigger." },
      { name: "Tooltip.Content.sideOffset", type: "number", defaultValue: "8", description: "Define a distância entre trigger e dica no web; use offset no React Native." },
    ],
    examples: [
      {
        title: "Ação somente com ícone",
        description: "Use Tooltip para esclarecer um ícone, mantendo o próprio botão com um nome acessível independente.",
        preview: (
          <Tooltip.Root>
            <Tooltip.Trigger render={<Button aria-label="Configurações" size="sm" variant="ghost" />}>
              <SettingsIcon aria-hidden size={16} />
            </Tooltip.Trigger>
            <Tooltip.Content>
              <Tooltip.Arrow />
              Configurações
            </Tooltip.Content>
          </Tooltip.Root>
        ),
        code: '<Tooltip.Root>\n  <Tooltip.Trigger\n    render={<Button aria-label="Configurações" size="sm" variant="ghost" />}\n  >\n    <SettingsIcon aria-hidden />\n  </Tooltip.Trigger>\n  <Tooltip.Content>\n    <Tooltip.Arrow />\n    Configurações\n  </Tooltip.Content>\n</Tooltip.Root>',
      },
      {
        title: "Grupo com atraso compartilhado",
        description: "Provider coordena uma sequência de dicas: após a primeira abrir, controles vizinhos respondem sem repetir todo o atraso.",
        preview: (
          <Tooltip.Provider delay={300}>
            <div className="docs-demo-row">
              <Tooltip.Root>
                <Tooltip.Trigger render={<Button variant="outline" size="sm" />}>Anterior</Tooltip.Trigger>
                <Tooltip.Content side="bottom"><Tooltip.Arrow />Voltar para o registro anterior</Tooltip.Content>
              </Tooltip.Root>
              <Tooltip.Root>
                <Tooltip.Trigger render={<Button variant="outline" size="sm" />}>Próximo</Tooltip.Trigger>
                <Tooltip.Content side="bottom"><Tooltip.Arrow />Avançar para o próximo registro</Tooltip.Content>
              </Tooltip.Root>
              <Tooltip.Root>
                <Tooltip.Trigger render={<Button variant="ghost" size="sm" />}>Fechar</Tooltip.Trigger>
                <Tooltip.Content side="bottom"><Tooltip.Arrow />Fechar esta visualização</Tooltip.Content>
              </Tooltip.Root>
            </div>
          </Tooltip.Provider>
        ),
        code: '<Tooltip.Provider delay={300}>\n  <Tooltip.Root>\n    <Tooltip.Trigger render={<Button>Anterior</Button>} />\n    <Tooltip.Content side="bottom">\n      <Tooltip.Arrow />\n      Voltar para o registro anterior\n    </Tooltip.Content>\n  </Tooltip.Root>\n  {/* Outros tooltips relacionados */}\n</Tooltip.Provider>',
      },
      {
        title: "Posicionamento",
        description: "Escolha o lado que preserva a relação espacial com o controle. O posicionador evita colisões com as bordas da viewport.",
        preview: (
          <div className="docs-demo-row">
            {(["top", "right", "bottom", "left"] as const).map((side) => (
              <Tooltip.Root key={side}>
                <Tooltip.Trigger render={<Button variant="secondary" size="sm" />}>{side}</Tooltip.Trigger>
                <Tooltip.Content side={side}><Tooltip.Arrow />Dica em {side}</Tooltip.Content>
              </Tooltip.Root>
            ))}
          </div>
        ),
        code: '<Tooltip.Content side="right" align="center">\n  <Tooltip.Arrow />\n  Dica contextual\n</Tooltip.Content>',
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

const semanticColorUsage = [
  { key: "background", label: "Background", usage: "Plano de fundo principal da aplicação." },
  { key: "foreground", label: "Foreground", usage: "Texto e ícones de maior ênfase." },
  { key: "surface", label: "Surface", usage: "Cards, painéis e regiões agrupadas." },
  { key: "surfaceRaised", label: "Surface raised", usage: "Menus, popovers e superfícies elevadas." },
  { key: "surfaceSunken", label: "Surface sunken", usage: "Áreas rebaixadas, trilhas e poços de conteúdo." },
  { key: "muted", label: "Muted", usage: "Fundos discretos, estados inativos e preenchimentos secundários." },
  { key: "mutedForeground", label: "Muted foreground", usage: "Descrições, metadados e texto de menor ênfase." },
  { key: "primary", label: "Primary", usage: "Ações principais, seleção e destaque da marca." },
  { key: "primaryForeground", label: "Primary foreground", usage: "Conteúdo aplicado sobre o fundo primary." },
  { key: "primaryHover", label: "Primary hover", usage: "Estado hover de ações primary." },
  { key: "accent", label: "Accent", usage: "Destaques secundários, badges e seleção suave." },
  { key: "accentForeground", label: "Accent foreground", usage: "Conteúdo aplicado sobre o fundo accent." },
  { key: "accentBorder", label: "Accent border", usage: "Contorno de destaques e superfícies accent." },
  { key: "accentSolid", label: "Accent solid", usage: "Indicadores compactos e ênfase sólida do accent." },
  { key: "border", label: "Border", usage: "Divisórias e contornos sutis padrão." },
  { key: "borderStrong", label: "Border strong", usage: "Contornos que precisam de maior definição." },
  { key: "focusRing", label: "Focus ring", usage: "Indicador de foco visível para navegação por teclado." },
  { key: "success", label: "Success", usage: "Confirmações e estados concluídos com sucesso." },
  { key: "successBackground", label: "Success background", usage: "Fundo suave para alertas e badges de sucesso." },
  { key: "successForeground", label: "Success foreground", usage: "Texto e ícones sobre fundos de sucesso." },
  { key: "successBorder", label: "Success border", usage: "Contorno para superfícies de sucesso." },
  { key: "warning", label: "Warning", usage: "Avisos, atenção e estados que exigem cautela." },
  { key: "warningBackground", label: "Warning background", usage: "Fundo suave para alertas e badges de atenção." },
  { key: "warningForeground", label: "Warning foreground", usage: "Texto e ícones sobre fundos de atenção." },
  { key: "warningBorder", label: "Warning border", usage: "Contorno para superfícies de atenção." },
  { key: "danger", label: "Danger", usage: "Erros, falhas e ações destrutivas." },
  { key: "dangerBackground", label: "Danger background", usage: "Fundo suave para alertas e badges de erro." },
  { key: "dangerForeground", label: "Danger foreground", usage: "Texto e ícones sobre fundos de erro." },
  { key: "dangerBorder", label: "Danger border", usage: "Contorno para superfícies de erro." },
] as const;

type SemanticColorKey = (typeof semanticColorUsage)[number]["key"];

type ThemeComparison = {
  id: string;
  name: string;
  description: string;
  theme: ThemeSwitcherTheme;
  colors: Record<SemanticColorKey, string>;
};

const themeComparisons: readonly ThemeComparison[] = [
  {
    id: "dark",
    name: "Dark atual",
    description: "Azul acinzentado com ciano pastel.",
    theme: "dark",
    colors: {
      background: "#161e28", foreground: "#eff4f5", surface: "#1d2936",
      surfaceRaised: "#263545", surfaceSunken: "#161e28", muted: "#263545",
      mutedForeground: "#91a7b8", primary: "#90dddf", primaryForeground: "#161e28",
      primaryHover: "#a8e7e9", accent: "#263545", accentForeground: "#d8e2e7",
      accentBorder: "#4e6d87", accentSolid: "#6f879b",
      border: "#2c3d4f", borderStrong: "#34495e", focusRing: "#90dddf",
      success: "#8eaa76", successBackground: "#223128", successForeground: "#d5e3ca", successBorder: "#58704b",
      warning: "#d5aa52", warningBackground: "#3a301d", warningForeground: "#f3d89f", warningBorder: "#806632",
      danger: "#c56f78", dangerBackground: "#3a2428", dangerForeground: "#edc3c7", dangerBorder: "#81444b",
    },
  },
  {
    id: "light",
    name: "Light atual",
    description: "Tema claro de contraste corporativo.",
    theme: "light",
    colors: {
      background: "#ffffff", foreground: "#161e28", surface: "#f5f6f7",
      surfaceRaised: "#ffffff", surfaceSunken: "#e7e8eb", muted: "#e7e8eb",
      mutedForeground: "#4d5562", primary: "#161e28", primaryForeground: "#ffffff",
      primaryHover: "#263545", accent: "#e8eef3", accentForeground: "#263545",
      accentBorder: "#b9c8d2", accentSolid: "#4e6d87",
      border: "#d0d3d8", borderStrong: "#abb0b9", focusRing: "#34495e",
      success: "#6f8d59", successBackground: "#edf3e8", successForeground: "#405234", successBorder: "#b8c9a8",
      warning: "#a87414", warningBackground: "#fff4dc", warningForeground: "#6b4c13", warningBorder: "#e5c778",
      danger: "#a9434d", dangerBackground: "#f9e9eb", dangerForeground: "#742f36", dangerBorder: "#dba5ab",
    },
  },
  {
    id: "deep-dark",
    name: "Deep Dark",
    description: "Preto absoluto com profundidade azul discreta.",
    theme: "deep-dark",
    colors: {
      background: "#000000", foreground: "#eff4f5", surface: "#080d12",
      surfaceRaised: "#101820", surfaceSunken: "#000000", muted: "#101820",
      mutedForeground: "#91a7b8", primary: "#90dddf", primaryForeground: "#000000",
      primaryHover: "#a8e7e9", accent: "#101820", accentForeground: "#d8e2e7",
      accentBorder: "#30465a", accentSolid: "#6f879b",
      border: "#182532", borderStrong: "#223344", focusRing: "#90dddf",
      success: "#7e9e68", successBackground: "#101b14", successForeground: "#d5e3ca", successBorder: "#3e5a45",
      warning: "#c99a3d", warningBackground: "#211b0d", warningForeground: "#f3d89f", warningBorder: "#6b5424",
      danger: "#b95b65", dangerBackground: "#211114", dangerForeground: "#edc3c7", dangerBorder: "#70353c",
    },
  },
  {
    id: "corporate-dark",
    name: "Corporate Dark",
    description: "Ardósia violeta profunda, hierarquia precisa e ciano institucional.",
    theme: "corporate-dark",
    colors: {
      background: "#111018", foreground: "#f1eef5", surface: "#181720",
      surfaceRaised: "#22212d", surfaceSunken: "#0c0b11", muted: "#2a2836",
      mutedForeground: "#aaa5b6", primary: "#90dddf", primaryForeground: "#071315",
      primaryHover: "#a8e7e9", accent: "#162a30", accentForeground: "#cceff0",
      accentBorder: "#37636b", accentSolid: "#5f9fa6",
      border: "#343141", borderStrong: "#4b465a", focusRing: "#90dddf",
      success: "#63c692", successBackground: "#10291f", successForeground: "#bcebd3", successBorder: "#2f6b50",
      warning: "#e0b85c", warningBackground: "#2b2413", warningForeground: "#f4dda5", warningBorder: "#735e2d",
      danger: "#e17b84", dangerBackground: "#2c171b", dangerForeground: "#f6c7cb", dangerBorder: "#7b3f46",
    },
  },
  {
    id: "catppuccin-mocha",
    name: "Catppuccin Mocha",
    description: "Aconchego escuro do Mocha com Mauve aplicado à marca ArcSyn.",
    theme: "catppuccin-mocha",
    colors: {
      background: "#1e1e2e", foreground: "#cdd6f4", surface: "#181825",
      surfaceRaised: "#313244", surfaceSunken: "#11111b", muted: "#313244",
      mutedForeground: "#a6adc8", primary: "#cba6f7", primaryForeground: "#11111b",
      primaryHover: "#b4befe", accent: "#313244", accentForeground: "#cdd6f4",
      accentBorder: "#585b70", accentSolid: "#b4befe",
      border: "#313244", borderStrong: "#45475a", focusRing: "#cba6f7",
      success: "#a6e3a1", successBackground: "#24332a", successForeground: "#d1f3ce", successBorder: "#4f7251",
      warning: "#f9e2af", warningBackground: "#352f24", warningForeground: "#f9e2af", warningBorder: "#776a4c",
      danger: "#f38ba8", dangerBackground: "#39232d", dangerForeground: "#f5c2e7", dangerBorder: "#7e4054",
    },
  },
  {
    id: "catppuccin-latte",
    name: "Catppuccin Latte",
    description: "Clareza suave do Latte com Mauve aplicado à marca ArcSyn.",
    theme: "catppuccin-latte",
    colors: {
      background: "#eff1f5", foreground: "#4c4f69", surface: "#e6e9ef",
      surfaceRaised: "#ffffff", surfaceSunken: "#dce0e8", muted: "#ccd0da",
      mutedForeground: "#5c5f77", primary: "#8839ef", primaryForeground: "#ffffff",
      primaryHover: "#7028d8", accent: "#e6e9ef", accentForeground: "#4c4f69",
      accentBorder: "#acb0be", accentSolid: "#7287fd",
      border: "#ccd0da", borderStrong: "#bcc0cc", focusRing: "#8839ef",
      success: "#40a02b", successBackground: "#e3f1df", successForeground: "#2d7020", successBorder: "#9bc693",
      warning: "#df8e1d", warningBackground: "#f9edcf", warningForeground: "#6f470e", warningBorder: "#d7b260",
      danger: "#d20f39", dangerBackground: "#f4dce2", dangerForeground: "#8d0b27", dangerBorder: "#d899a8",
    },
  },
];

const previewColorKeys = ["background", "surface", "border", "primary", "foreground"] as const;

function semanticColorCssName(key: SemanticColorKey) {
  return `--arcsyn-color-${key.replace(/[A-Z]/g, (character) => `-${character.toLowerCase()}`)}`;
}

function ThemePreview({ theme, onSelect }: { theme: ThemeComparison; onSelect: () => void }) {
  return (
    <section className="docs-theme-preview" data-arcsyn-theme={theme.theme} aria-labelledby={`theme-${theme.id}`}>
      <header className="docs-theme-preview-header">
        <button className="docs-theme-choice" type="button" onClick={onSelect}>
          <span><strong id={`theme-${theme.id}`}>{theme.name}</strong><small>{theme.description}</small></span>
          <span className="docs-theme-choice-action">Abrir tema →</span>
        </button>
        {theme.id === "dark" ? <Badge variant="accent">Padrão</Badge> : theme.id === "catppuccin-latte" ? <Badge variant="accent">Novo</Badge> : null}
      </header>

      <div className="docs-theme-swatches" aria-label={`Tokens principais do tema ${theme.name}`}>
        {previewColorKeys.map((key) => (
          <div className="docs-theme-swatch" key={key}>
            <span style={{ backgroundColor: theme.colors[key] }} aria-hidden="true" />
            <strong>{semanticColorUsage.find((color) => color.key === key)?.label}</strong>
            <code>{theme.colors[key]}</code>
          </div>
        ))}
      </div>

      <Card className="docs-theme-sample">
        <div className="docs-theme-sample-heading">
          <div><span className="docs-card-eyebrow">Workspace</span><strong>Operações ArcSyn</strong></div>
          <Badge variant="success">Ativo</Badge>
        </div>
        <p className="docs-card-copy">Configure o ambiente e as notificações antes de publicar.</p>
        <label className="docs-theme-field" htmlFor={`theme-environment-${theme.id}`}>
          Ambiente
          <Input id={`theme-environment-${theme.id}`} defaultValue="Produção" />
        </label>
        <div className="docs-theme-options">
          <label><Checkbox defaultChecked />Alertas críticos</label>
          <label><Switch defaultChecked />Sincronização</label>
        </div>
        <div className="docs-demo-row">
          <Button size="sm">Publicar</Button>
          <Button size="sm" variant="outline">Revisar</Button>
        </div>
      </Card>
    </section>
  );
}

function ThemeColorDetails({ theme }: { theme: ThemeComparison }) {
  return (
    <section className="docs-theme-details" data-arcsyn-theme={theme.theme} aria-labelledby="theme-color-details-title">
      <header className="docs-theme-details-header">
        <div>
          <p className="docs-eyebrow">Inventário semântico</p>
          <h2 id="theme-color-details-title">Cores e usos · {theme.name}</h2>
          <p>Use os tokens semânticos em vez dos valores hexadecimais para preservar a troca de tema.</p>
        </div>
        <Badge variant="accent">{semanticColorUsage.length} cores</Badge>
      </header>
      <div className="docs-theme-token-list">
        {semanticColorUsage.map(({ key, label, usage }) => (
          <article className="docs-theme-token" key={key}>
            <span className="docs-theme-token-swatch" style={{ backgroundColor: theme.colors[key] }} aria-hidden="true" />
            <div className="docs-theme-token-content">
              <strong>{label}</strong>
              <code>{semanticColorCssName(key)}</code>
              <p>{usage}</p>
            </div>
            <code className="docs-theme-token-value">{theme.colors[key]}</code>
          </article>
        ))}
      </div>
    </section>
  );
}

function ThemingPage() {
  return (
    <article className="docs-page docs-theming-page">
      <header className="docs-page-header">
        <p className="docs-eyebrow">Fundação</p>
        <h1>Theming</h1>
        <p>Compare os temas e selecione um deles para explorar a paleta completa, tipografia e componentes em contexto.</p>
      </header>

      <div className="docs-theme-comparison">
        {themeComparisons.map((theme) => <ThemePreview key={theme.id} theme={theme} onSelect={() => { window.location.hash = `/theming/${theme.id}`; }} />)}
      </div>
    </article>
  );
}

function ThemeComponentShowcase({ theme }: { theme: ThemeComparison }) {
  const fieldId = `theme-showcase-${theme.id}`;

  return (
    <section className="docs-theme-showcase" data-arcsyn-theme={theme.theme} aria-labelledby="theme-components-title">
      <div className="docs-section-heading">
        <p className="docs-eyebrow">Design system em contexto</p>
        <h2 id="theme-components-title">Componentes e estados</h2>
        <p>Exemplos funcionais renderizados com os tokens de {theme.name}.</p>
      </div>

      <div className="docs-theme-showcase-grid">
        <Card className="docs-theme-showcase-card">
          <span className="docs-card-eyebrow">Tipografia</span>
          <div className="docs-theme-type-scale">
            <h1>Título principal</h1>
            <h2>Seção de conteúdo</h2>
            <h3>Subseção operacional</h3>
            <p>Texto padrão para instruções, descrições e conteúdo contínuo da interface.</p>
            <p className="docs-muted-copy">Texto secundário para contexto, ajuda e metadados.</p>
            <code>workspace_arc_0192</code>
            <a href="#/theming">Link de navegação</a>
          </div>
        </Card>

        <Card className="docs-theme-showcase-card">
          <span className="docs-card-eyebrow">Ações e status</span>
          <div className="docs-demo-row">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
          </div>
          <div className="docs-demo-row">
            <Badge>Default</Badge>
            <Badge variant="accent">Accent</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
          </div>
          <Alert variant="success" title="Ambiente publicado" description="A configuração está disponível para toda a organização." />
          <Alert variant="warning" title="Revisão necessária" description="Há permissões que expiram nos próximos sete dias." />
        </Card>

        <Card className="docs-theme-showcase-card docs-theme-form-card">
          <div>
            <span className="docs-card-eyebrow">Formulário</span>
            <h3>Criar ambiente</h3>
            <p className="docs-muted-copy">Configure a identificação e o comportamento inicial.</p>
          </div>
          <Field.Root>
            <Field.Label htmlFor={`${fieldId}-name`}>Nome do ambiente</Field.Label>
            <Input id={`${fieldId}-name`} defaultValue="Produção Brasil" />
            <Field.Description>Visível para todos os integrantes do workspace.</Field.Description>
          </Field.Root>
          <Field.Root>
            <Field.Label htmlFor={`${fieldId}-owner`}>Responsável</Field.Label>
            <Input id={`${fieldId}-owner`} type="email" placeholder="nome@empresa.com" />
          </Field.Root>
          <Field.Root>
            <Field.Label htmlFor={`${fieldId}-notes`}>Observações</Field.Label>
            <Textarea id={`${fieldId}-notes`} rows={3} placeholder="Contexto adicional para a equipe" />
          </Field.Root>
          <div className="docs-theme-options">
            <label><Checkbox defaultChecked />Habilitar alertas críticos</label>
            <label><Switch defaultChecked />Sincronização automática</label>
          </div>
          <div className="docs-demo-row">
            <Button>Criar ambiente</Button>
            <Button variant="ghost">Cancelar</Button>
          </div>
        </Card>

        <Card className="docs-theme-showcase-card">
          <span className="docs-card-eyebrow">Superfície elevada</span>
          <h3>Confirmação em modal</h3>
          <p className="docs-muted-copy">Abra o diálogo para avaliar backdrop, superfície, hierarquia de texto, foco e ações.</p>
          <Dialog.Root>
            <Dialog.Trigger>Revisar publicação</Dialog.Trigger>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Publicar ambiente?</Dialog.Title>
                <Dialog.Description>As novas configurações serão aplicadas imediatamente para 24 integrantes.</Dialog.Description>
              </Dialog.Header>
              <Alert variant="warning" title="Alteração imediata" description="As sessões ativas podem precisar ser atualizadas." />
              <Dialog.Footer>
                <Dialog.Close>Cancelar</Dialog.Close>
                <Dialog.Close variant="primary">Publicar agora</Dialog.Close>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Root>
        </Card>
      </div>
    </section>
  );
}

function ThemeDetailPage({ theme }: { theme: ThemeComparison }) {
  const { setTheme } = useContext(DocsThemeContext);

  useEffect(() => {
    setTheme(theme.theme);
  }, [setTheme, theme.theme]);

  return (
    <article className="docs-page docs-theming-page">
      <header className="docs-page-header docs-theme-detail-hero" data-arcsyn-theme={theme.theme}>
        <a className="docs-theme-back-link" href="#/theming">← Todos os temas</a>
        <p className="docs-eyebrow">Tema ArcSyn</p>
        <div className="docs-page-title-row">
          <div><h1>{theme.name}</h1><p>{theme.description}</p></div>
          {theme.id === "dark" ? <Badge variant="accent">Padrão</Badge> : theme.id === "catppuccin-latte" ? <Badge variant="accent">Novo</Badge> : null}
        </div>
        <div className="docs-theme-hero-swatches" aria-label={`Resumo da paleta ${theme.name}`}>
          {previewColorKeys.map((key) => <span key={key} style={{ backgroundColor: theme.colors[key] }} title={`${key}: ${theme.colors[key]}`} />)}
        </div>
      </header>

      <ThemeColorDetails theme={theme} />
      <ThemeComponentShowcase theme={theme} />
    </article>
  );
}

const typographyScale = [
  { token: "2xl", size: "1.5rem · 24px", use: "Título de página", sample: "Visão geral da operação" },
  { token: "xl", size: "1.25rem · 20px", use: "Título de seção", sample: "Ambientes monitorados" },
  { token: "lg", size: "1.125rem · 18px", use: "Título de componente", sample: "Detalhes da publicação" },
  { token: "md", size: "1rem · 16px", use: "Texto de leitura", sample: "Acompanhe alterações e eventos recentes." },
  { token: "sm", size: "0.875rem · 14px", use: "Interface e controles", sample: "Sincronização automática ativada" },
  { token: "xs", size: "0.75rem · 12px", use: "Metadados e ajuda", sample: "Atualizado há 4 minutos" },
] as const;

const typographyWeights = [
  { weight: "400", name: "Regular", use: "Textos, descrições e conteúdo contínuo." },
  { weight: "500", name: "Medium", use: "Rótulos, estados e ênfase discreta." },
  { weight: "600", name: "Semibold", use: "Títulos, botões e ações prioritárias." },
] as const;

function TypographyPage() {
  return (
    <article className="docs-page docs-typography-page">
      <header className="docs-page-header">
        <p className="docs-eyebrow">Fundação</p>
        <h1>Tipografia</h1>
        <p>A tipografia da ArcSyn prioriza leitura rápida, hierarquia clara e precisão em interfaces operacionais densas.</p>
      </header>

      <section className="docs-section" aria-labelledby="typography-families">
        <div className="docs-section-heading">
          <p className="docs-eyebrow">Famílias</p>
          <h2 id="typography-families">Uma voz para interface, outra para dados</h2>
        </div>
        <div className="docs-type-families">
          <article className="docs-type-family docs-type-family--sans">
            <div className="docs-type-family-heading">
              <div><span>Interface</span><h3>IBM Plex Sans</h3></div>
              <code>--arcsyn-font-sans</code>
            </div>
            <p className="docs-type-alphabet">Aa Bb Cc Dd Ee Ff Gg</p>
            <p>Use em navegação, títulos, controles e conteúdo. A família foi escolhida por sua leitura neutra e técnica em tamanhos compactos.</p>
          </article>
          <article className="docs-type-family docs-type-family--mono">
            <div className="docs-type-family-heading">
              <div><span>Dados técnicos</span><h3>IBM Plex Mono</h3></div>
              <code>--arcsyn-font-mono</code>
            </div>
            <p className="docs-type-alphabet">ARC-0192 · 23:48:07</p>
            <p>Reserve para código, IDs, horários, valores tabulares e metadados cuja forma precisa ser comparada rapidamente.</p>
          </article>
        </div>
        <p className="docs-type-note">As preferências desta documentação permitem comparar famílias sem alterar o contrato público dos tokens.</p>
      </section>

      <section className="docs-section" aria-labelledby="typography-scale">
        <div className="docs-section-heading">
          <p className="docs-eyebrow">Escala</p>
          <h2 id="typography-scale">Tamanhos e papéis semânticos</h2>
        </div>
        <div className="docs-type-scale" role="list">
          {typographyScale.map(({ token, size, use, sample }) => (
            <article className="docs-type-scale-row" role="listitem" key={token}>
              <div className="docs-type-token">
                <code>{`font-size-${token}`}</code>
                <span>{size}</span>
              </div>
              <p style={{ fontSize: `var(--arcsyn-font-size-${token})` }}>{sample}</p>
              <span>{use}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="docs-section" aria-labelledby="typography-weight">
        <div className="docs-section-heading">
          <p className="docs-eyebrow">Ênfase</p>
          <h2 id="typography-weight">Pesos e contraste</h2>
        </div>
        <div className="docs-type-weights">
          {typographyWeights.map(({ weight, name, use }) => (
            <article key={weight}>
              <span style={{ fontWeight: Number(weight) }}>{`${weight} · ${name}`}</span>
              <p>{use}</p>
            </article>
          ))}
        </div>
        <div className="docs-type-guidance">
          <Card><strong>Hierarquia antes de tamanho</strong><p>Combine posição, espaçamento e contraste antes de aumentar o texto. Em telas densas, poucos níveis tornam a leitura previsível.</p></Card>
          <Card><strong>Mono com intenção</strong><p>Não use monoespaçada em parágrafos ou botões. Ela sinaliza conteúdo técnico e perde essa função quando aparece em excesso.</p></Card>
          <Card><strong>Alinhamento de números</strong><p>Em tabelas, alinhe valores numéricos à direita e use algarismos tabulares quando a comparação vertical for importante.</p></Card>
        </div>
      </section>

      <section className="docs-section" aria-labelledby="typography-implementation">
        <div className="docs-section-heading">
          <p className="docs-eyebrow">Implementação</p>
          <h2 id="typography-implementation">Use tokens, não valores isolados</h2>
        </div>
        <div className="docs-overview-grid">
          <pre className="docs-code"><code>{`.page-title {
  font-family: var(--arcsyn-font-sans);
  font-size: var(--arcsyn-font-size-2xl);
  font-weight: 600;
  line-height: 1.2;
}

.resource-id {
  font-family: var(--arcsyn-font-mono);
  font-size: var(--arcsyn-font-size-xs);
}`}</code></pre>
          <div className="docs-type-implementation-preview">
            <span>Workspace de produção</span>
            <strong>Observabilidade central</strong>
            <p>Monitore disponibilidade, custos e alterações críticas do ambiente.</p>
            <code>workspace_arc_0192</code>
          </div>
        </div>
      </section>

      <section className="docs-section docs-accessibility" aria-labelledby="typography-accessibility">
        <p className="docs-eyebrow">Acessibilidade</p>
        <h2 id="typography-accessibility">Leitura confortável em diferentes contextos</h2>
        <p>Mantenha texto de leitura em pelo menos 16px, não dependa apenas de peso ou cor para comunicar hierarquia, preserve zoom do navegador e limite linhas longas a aproximadamente 75 caracteres. Em mobile, o tamanho visual do texto não substitui o alvo de toque mínimo de 44px.</p>
      </section>
    </article>
  );
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
        <p className="docs-home-summary">Uma base compacta e corporativa, construída sobre tokens agnósticos, CSS compartilhado e adaptadores de framework.</p>
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
  const [theme, setTheme] = useState<ThemeSwitcherTheme>(currentDocsTheme);
  const [font, setFont] = useState<DocsFont>(currentDocsFont);
  const [monoFont, setMonoFont] = useState<DocsMonoFont>(currentDocsMonoFont);
  const route = useRoute();
  const page = componentPages.find((item) => route === `/components/${item.id}`);
  const isTheming = route === "/theming" || route.startsWith("/theming/");
  const isTypography = route === "/typography";
  const themePage = themeComparisons.find((item) => route === `/theming/${item.id}`);
  const currentPageTitle = themePage?.name ?? (isTheming ? "Theming" : isTypography ? "Tipografia" : page?.title ?? "Visão geral");

  useEffect(() => {
    document.documentElement.dataset.arcsynTheme = theme;
    try {
      window.localStorage.setItem(docsThemeStorageKey, theme);
    } catch {
      // The selected theme still applies for the current session.
    }
  }, [theme]);

  useEffect(() => {
    const selectedFont = docsFonts.find((option) => option.id === font) ?? docsFonts[0];
    document.documentElement.dataset.arcsynFont = selectedFont.id;
    document.documentElement.style.setProperty("--arcsyn-font-sans", selectedFont.family);
    try {
      window.localStorage.setItem(docsFontStorageKey, selectedFont.id);
    } catch {
      // The selected font still applies for the current session.
    }
  }, [font]);

  useEffect(() => {
    const selectedFont = docsMonoFonts.find((option) => option.id === monoFont) ?? docsMonoFonts[0];
    document.documentElement.dataset.arcsynMonoFont = selectedFont.id;
    document.documentElement.style.setProperty("--arcsyn-font-mono", selectedFont.family);
    try {
      window.localStorage.setItem(docsMonoFontStorageKey, selectedFont.id);
    } catch {
      // The selected font still applies for the current session.
    }
  }, [monoFont]);

  useEffect(() => {
    document.title = themePage ? `${themePage.name} · ArcSyn DS` : isTheming ? "Theming · ArcSyn DS" : isTypography ? "Tipografia · ArcSyn DS" : page ? `${page.title} · ArcSyn DS` : "ArcSyn Design System";
  }, [isTheming, isTypography, page, themePage]);

  return (
    <DocsThemeContext.Provider value={{ theme, setTheme, font, setFont, monoFont, setMonoFont }}>
      <>
        <SidebarProvider className="docs-shell" style={{ "--arcsyn-sidebar-width": "16rem", "--arcsyn-sidebar-width-mobile": "18rem" }}>
          <Sidebar className="docs-app-sidebar" collapsible="offcanvas">
            <SidebarHeader>
            <a className="docs-brand" href="#/" aria-label="ArcSyn Design System">
              <img src="/arcsyn-logo.svg" alt="" />
            </a>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Fundação</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <DocsSidebarLink active={route === "/"} href="#/" icon={<CircleIcon aria-hidden size={15} />}>Visão geral</DocsSidebarLink>
                    <DocsSidebarLink active={isTheming} href="#/theming" icon={<CheckIcon aria-hidden size={15} />}>Theming</DocsSidebarLink>
                    <DocsSidebarLink active={isTypography} href="#/typography">Tipografia</DocsSidebarLink>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
              <SidebarGroup>
                <SidebarGroupLabel>Componentes</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {componentPages.map((item) => <DocsSidebarLink active={page?.id === item.id} href={`#/components/${item.id}`} key={item.id}>{item.title}</DocsSidebarLink>)}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
              <DocsPreferencesDialog />
              <div className="docs-sidebar-footer"><span>v0.1.0</span><span>React</span></div>
            </SidebarFooter>
            <SidebarRail />
          </Sidebar>
          <SidebarInset className="docs-app-inset">
            <header className="docs-topbar">
              <SidebarTrigger />
              <span className="docs-topbar-title">{currentPageTitle}</span>
              <Kbd className="docs-sidebar-shortcut">Ctrl B</Kbd>
            </header>
            <div className="docs-main">{themePage ? <ThemeDetailPage theme={themePage} /> : isTheming ? <ThemingPage /> : isTypography ? <TypographyPage /> : page ? <ComponentDocumentation page={page} /> : <HomePage />}</div>
          </SidebarInset>
        </SidebarProvider>
        <Toaster />
      </>
    </DocsThemeContext.Provider>
  );
}
