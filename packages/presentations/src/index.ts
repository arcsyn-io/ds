import { primitives, themes } from "@arcsyn/tokens";

export type PresentationThemeName = "dark" | "light";

export type PresentationLayoutId =
  "cover" | "section" | "statement" | "problem" | "architecture" | "flow" | "comparison" | "evidence" | "roadmap" | "decision" | "appendix" | "closing";

export type PresentationBrief = {
  title: string;
  audience: string;
  outcome: string;
  proposalType: "architecture" | "product" | "idea";
  context?: string;
  recommendation?: string;
  constraints?: string[];
  evidence?: Array<{ claim: string; source?: string }>;
  requestedDecision?: string;
  theme?: PresentationThemeName;
  language?: string;
};

type LayoutDefinition = {
  id: PresentationLayoutId;
  name: string;
  purpose: string;
  requiredSlots: string[];
  optionalSlots: string[];
  composition: string;
  constraints: string[];
};

const referencePattern = /^\{(.+)\}$/;

function resolveToken(value: string, seen = new Set<string>()): string {
  const match = value.match(referencePattern);
  if (!match) return value;

  const tokenName = match[1];
  if (seen.has(tokenName)) throw new Error(`Circular token reference: ${tokenName}`);
  const next = primitives[tokenName];
  if (!next) throw new Error(`Unknown ArcSyn token reference: ${tokenName}`);

  return resolveToken(next, new Set([...seen, tokenName]));
}

function semanticColor(theme: PresentationThemeName, name: string): string {
  const value = themes[theme][`color.${name}`];
  if (!value) throw new Error(`Unknown ArcSyn semantic color: ${name}`);
  return resolveToken(value);
}

export function createPresentationTheme(name: PresentationThemeName = "dark") {
  return {
    name,
    canvas: {
      width: 1280,
      height: 720,
      marginX: 72,
      marginY: 56,
      columns: 12,
      gutter: 24,
    },
    color: {
      background: semanticColor(name, "background"),
      foreground: semanticColor(name, "foreground"),
      surface: semanticColor(name, "surface"),
      surfaceRaised: semanticColor(name, "surfaceRaised"),
      muted: semanticColor(name, "muted"),
      mutedForeground: semanticColor(name, "mutedForeground"),
      primary: semanticColor(name, "primary"),
      primaryForeground: semanticColor(name, "primaryForeground"),
      border: semanticColor(name, "border"),
      borderStrong: semanticColor(name, "borderStrong"),
      success: semanticColor(name, "success"),
      warning: semanticColor(name, "warning"),
      danger: semanticColor(name, "danger"),
    },
    typography: {
      sans: "IBM Plex Sans",
      mono: "IBM Plex Mono",
      deckTitle: 64,
      slideTitle: 42,
      sectionTitle: 50,
      subheading: 28,
      body: 20,
      caption: 14,
      metadata: 12,
    },
    shape: {
      radius: 6,
      borderWidth: 1,
      ruleWidth: 2,
      shadow: "subtle" as const,
    },
  };
}

export const presentationLayouts: readonly LayoutDefinition[] = [
  {
    id: "cover",
    name: "Capa",
    purpose: "Nomear a proposta, estabelecer contexto e identificar autoria.",
    requiredSlots: ["title"],
    optionalSlots: ["subtitle", "author", "date", "confidentiality"],
    composition: "Título em até três linhas, metadados na base e um único gesto gráfico.",
    constraints: ["Sem agenda", "Sem parágrafo", "Título com no máximo 12 palavras"],
  },
  {
    id: "section",
    name: "Divisor de seção",
    purpose: "Marcar uma mudança real de raciocínio.",
    requiredSlots: ["sectionNumber", "title"],
    optionalSlots: ["transition"],
    composition: "Número ou rótulo pequeno, título amplo e bastante respiro.",
    constraints: ["Usar apenas entre blocos narrativos", "Não repetir a agenda"],
  },
  {
    id: "statement",
    name: "Tese",
    purpose: "Fixar uma conclusão ou princípio central.",
    requiredSlots: ["statement"],
    optionalSlots: ["supportingSentence", "source"],
    composition: "Uma frase dominante, apoiada por uma linha curta.",
    constraints: ["Uma única ideia", "Sem listas", "Até 24 palavras na tese"],
  },
  {
    id: "problem",
    name: "Problema e impacto",
    purpose: "Conectar a situação atual às consequências relevantes.",
    requiredSlots: ["problem", "impact"],
    optionalSlots: ["signals", "scope"],
    composition: "Relação causal clara entre problema, evidência e impacto.",
    constraints: ["Não inventar métricas", "Distinguir sintoma de causa"],
  },
  {
    id: "architecture",
    name: "Arquitetura",
    purpose: "Explicar limites, responsabilidades e relações de um sistema.",
    requiredSlots: ["system", "components", "relationships"],
    optionalSlots: ["externalSystems", "trustBoundaries", "legend"],
    composition: "Diagrama central simples com leitura da esquerda para a direita.",
    constraints: ["Até 7 nós principais", "Rótulos curtos", "Conectores atrás dos nós"],
  },
  {
    id: "flow",
    name: "Fluxo",
    purpose: "Mostrar uma sequência operacional, de dados ou de decisão.",
    requiredSlots: ["steps"],
    optionalSlots: ["actors", "exceptions", "result"],
    composition: "Sequência numerada ou swimlane quando a troca de responsabilidade importar.",
    constraints: ["Até 6 etapas no fluxo principal", "Exceções ficam em apoio"],
  },
  {
    id: "comparison",
    name: "Comparação",
    purpose: "Tornar trade-offs explícitos e orientar uma escolha.",
    requiredSlots: ["options", "criteria"],
    optionalSlots: ["recommendation", "weights"],
    composition: "Tabela editorial ou eixos comparativos, com recomendação visível.",
    constraints: ["Critérios equivalentes", "Até 4 opções", "Sem falso rigor numérico"],
  },
  {
    id: "evidence",
    name: "Evidência",
    purpose: "Sustentar uma afirmação com dado, observação ou prova.",
    requiredSlots: ["claim", "evidence"],
    optionalSlots: ["chart", "source", "implication"],
    composition: "O dado ocupa a área principal; o significado aparece ao lado.",
    constraints: ["Fonte obrigatória para dados externos", "Título comunica a conclusão"],
  },
  {
    id: "roadmap",
    name: "Roadmap",
    purpose: "Organizar entregas por resultado, dependência e horizonte.",
    requiredSlots: ["phases"],
    optionalSlots: ["milestones", "dependencies", "owners"],
    composition: "Horizonte temporal horizontal com poucos marcos verificáveis.",
    constraints: ["Não usar precisão falsa", "Separar entrega de resultado"],
  },
  {
    id: "decision",
    name: "Decisão",
    purpose: "Encerrar o raciocínio com uma recomendação acionável.",
    requiredSlots: ["recommendation", "decision"],
    optionalSlots: ["rationale", "risks", "nextSteps"],
    composition: "Recomendação dominante, decisão solicitada e próximos passos curtos.",
    constraints: ["Pedido explícito", "Responsável ou fórum identificável"],
  },
  {
    id: "appendix",
    name: "Apêndice",
    purpose: "Guardar detalhe útil sem interromper a narrativa principal.",
    requiredSlots: ["title", "content"],
    optionalSlots: ["source"],
    composition: "Estrutura técnica mais densa, ainda legível sem narração.",
    constraints: ["Não esconder premissas decisivas", "Manter títulos conclusivos"],
  },
  {
    id: "closing",
    name: "Fechamento",
    purpose: "Reforçar a consequência da proposta e o próximo movimento.",
    requiredSlots: ["takeaway"],
    optionalSlots: ["action", "contact"],
    composition: "Síntese curta que resolve a abertura.",
    constraints: ["Não usar apenas “Obrigado”", "Sem introduzir argumento novo"],
  },
] as const;

export const narrativePatterns = {
  architecture: ["cover", "problem", "statement", "architecture", "flow", "comparison", "roadmap", "decision"],
  product: ["cover", "problem", "evidence", "statement", "flow", "roadmap", "decision"],
  idea: ["cover", "problem", "statement", "comparison", "roadmap", "decision"],
} as const satisfies Record<PresentationBrief["proposalType"], readonly PresentationLayoutId[]>;

export function createPresentationBrief(input: PresentationBrief): PresentationBrief {
  for (const field of ["title", "audience", "outcome"] as const) {
    if (!input[field]?.trim()) throw new Error(`Presentation brief requires ${field}`);
  }

  return {
    language: "pt-BR",
    theme: "dark",
    ...input,
    title: input.title.trim(),
    audience: input.audience.trim(),
    outcome: input.outcome.trim(),
  };
}
