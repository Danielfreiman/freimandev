import type { LayerId } from "./scene";

/**
 * A block in the schematic shown inside the browser frame. Coordinates are
 * percentages of the frame's content area, so the preview scales with the
 * scene. These are wireframes, never fake screenshots — they show the shape of
 * the deliverable without inventing a client project.
 */
export type PreviewBlock = {
  x: number;
  y: number;
  w: number;
  h: number;
  tone?: "line" | "fill" | "solid";
};

/**
 * What can enter execution. Hovering or selecting one re-composes the
 * Signature Scene: `emphasis` lights the layers involved and `preview`
 * redraws the page inside the frame.
 */
export type Capability = {
  id: string;
  label: string;
  description: string;
  emphasis: LayerId[];
  preview: PreviewBlock[];
};

export const CAPABILITIES: Capability[] = [
  {
    id: "landing-page",
    label: "Landing page",
    description:
      "Uma página clara, rápida e construída em torno da ação que o visitante precisa realizar.",
    emphasis: ["estrutura", "conteudo", "performance"],
    // One column, one message, one action.
    preview: [
      { x: 8, y: 12, w: 54, h: 10, tone: "solid" },
      { x: 8, y: 27, w: 72, h: 4, tone: "fill" },
      { x: 8, y: 34, w: 58, h: 4, tone: "fill" },
      { x: 8, y: 45, w: 22, h: 9, tone: "solid" },
      { x: 8, y: 62, w: 84, h: 28, tone: "line" },
    ],
  },
  {
    id: "site-institucional",
    label: "Site institucional",
    description:
      "A estrutura, o conteúdo e as páginas que sustentam a presença da empresa e facilitam o contato.",
    emphasis: ["estrutura", "interface", "conteudo"],
    preview: [
      { x: 8, y: 8, w: 84, h: 5, tone: "line" },
      { x: 8, y: 20, w: 40, h: 8, tone: "solid" },
      { x: 8, y: 33, w: 54, h: 4, tone: "fill" },
      { x: 8, y: 48, w: 25, h: 28, tone: "line" },
      { x: 37, y: 48, w: 25, h: 28, tone: "line" },
      { x: 66, y: 48, w: 26, h: 28, tone: "line" },
    ],
  },
  {
    id: "ecommerce",
    label: "E-commerce",
    description:
      "Experiência de compra, organização de catálogo, integrações e performance trabalhando no mesmo fluxo.",
    emphasis: ["interface", "integracao", "performance"],
    // Catalogue grid plus a persistent checkout rail.
    preview: [
      { x: 8, y: 8, w: 84, h: 5, tone: "line" },
      { x: 8, y: 18, w: 18, h: 26, tone: "line" },
      { x: 29, y: 18, w: 18, h: 26, tone: "line" },
      { x: 50, y: 18, w: 18, h: 26, tone: "line" },
      { x: 8, y: 48, w: 18, h: 26, tone: "line" },
      { x: 29, y: 48, w: 18, h: 26, tone: "line" },
      { x: 50, y: 48, w: 18, h: 26, tone: "line" },
      { x: 72, y: 18, w: 20, h: 40, tone: "fill" },
      { x: 72, y: 62, w: 20, h: 8, tone: "solid" },
    ],
  },
  {
    id: "interface",
    label: "Interface",
    description:
      "Telas, componentes e estados desenhados e implementados para funcionar em uso real, não só na apresentação.",
    emphasis: ["interface", "codigo"],
    preview: [
      { x: 8, y: 10, w: 38, h: 16, tone: "fill" },
      { x: 52, y: 10, w: 40, h: 16, tone: "line" },
      { x: 8, y: 32, w: 84, h: 6, tone: "solid" },
      { x: 8, y: 44, w: 26, h: 22, tone: "line" },
      { x: 38, y: 44, w: 26, h: 22, tone: "fill" },
      { x: 68, y: 44, w: 24, h: 22, tone: "line" },
      { x: 8, y: 72, w: 40, h: 8, tone: "line" },
    ],
  },
  {
    id: "integracao",
    label: "Integração",
    description:
      "Pagamento, CRM, estoque, formulário ou API: sistemas que passam a conversar dentro do site.",
    emphasis: ["codigo", "integracao"],
    // Two systems, and the line that finally connects them.
    preview: [
      { x: 6, y: 20, w: 26, h: 38, tone: "line" },
      { x: 68, y: 20, w: 26, h: 38, tone: "line" },
      { x: 34, y: 33, w: 32, h: 3, tone: "solid" },
      { x: 34, y: 43, w: 32, h: 3, tone: "fill" },
      { x: 6, y: 68, w: 88, h: 6, tone: "fill" },
    ],
  },
  {
    id: "correcao",
    label: "Correção",
    description:
      "O que está quebrado, lento ou fora do lugar é diagnosticado e resolvido direto no código.",
    emphasis: ["codigo", "publicacao"],
    preview: [
      { x: 8, y: 10, w: 84, h: 5, tone: "line" },
      { x: 8, y: 22, w: 40, h: 5, tone: "fill" },
      { x: 8, y: 32, w: 62, h: 5, tone: "fill" },
      { x: 8, y: 45, w: 36, h: 20, tone: "solid" },
      { x: 48, y: 45, w: 44, h: 20, tone: "line" },
      { x: 8, y: 72, w: 70, h: 5, tone: "fill" },
    ],
  },
  {
    id: "otimizacao",
    label: "Otimização",
    description:
      "Velocidade, Core Web Vitals e SEO técnico revisados até o site carregar e ranquear melhor.",
    emphasis: ["performance", "conteudo"],
    // Measurements getting longer as the work lands.
    preview: [
      { x: 8, y: 14, w: 30, h: 6, tone: "fill" },
      { x: 8, y: 27, w: 78, h: 9, tone: "solid" },
      { x: 8, y: 42, w: 56, h: 9, tone: "fill" },
      { x: 8, y: 57, w: 84, h: 9, tone: "fill" },
      { x: 8, y: 72, w: 42, h: 9, tone: "line" },
    ],
  },
  {
    id: "nova-funcionalidade",
    label: "Nova funcionalidade",
    description:
      "Um recurso específico projetado, construído e publicado dentro do site que já existe.",
    emphasis: ["interface", "codigo", "publicacao"],
    // The site as it is, plus the one new piece.
    preview: [
      { x: 8, y: 10, w: 84, h: 5, tone: "line" },
      { x: 8, y: 22, w: 52, h: 22, tone: "line" },
      { x: 64, y: 22, w: 28, h: 22, tone: "solid" },
      { x: 8, y: 50, w: 84, h: 5, tone: "fill" },
      { x: 8, y: 60, w: 40, h: 18, tone: "line" },
      { x: 52, y: 60, w: 40, h: 18, tone: "line" },
    ],
  },
  {
    id: "evolucao",
    label: "Evolução de projeto",
    description:
      "Correções, novas páginas, funcionalidades e melhorias sem precisar recomeçar do zero.",
    emphasis: ["estrutura", "codigo", "publicacao"],
    preview: [
      { x: 8, y: 8, w: 84, h: 5, tone: "line" },
      { x: 8, y: 18, w: 38, h: 14, tone: "line" },
      { x: 50, y: 18, w: 42, h: 14, tone: "line" },
      { x: 8, y: 36, w: 84, h: 6, tone: "solid" },
      { x: 8, y: 46, w: 26, h: 15, tone: "line" },
      { x: 37, y: 46, w: 26, h: 15, tone: "line" },
      { x: 66, y: 46, w: 26, h: 15, tone: "fill" },
      { x: 8, y: 65, w: 84, h: 14, tone: "line" },
    ],
  },
  {
    id: "suporte",
    label: "Suporte recorrente",
    description:
      "Uma fila contínua de ajustes e entregas, com prioridade definida a cada ciclo.",
    emphasis: ["codigo", "performance", "publicacao"],
    // A queue: what is shipping, what is next, what is waiting.
    preview: [
      { x: 8, y: 12, w: 84, h: 9, tone: "solid" },
      { x: 8, y: 25, w: 84, h: 9, tone: "fill" },
      { x: 8, y: 38, w: 84, h: 9, tone: "fill" },
      { x: 8, y: 51, w: 84, h: 9, tone: "line" },
      { x: 8, y: 64, w: 84, h: 9, tone: "line" },
      { x: 8, y: 77, w: 56, h: 9, tone: "line" },
    ],
  },
];
