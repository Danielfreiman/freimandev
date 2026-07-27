import type { LayerId } from "./scene";

/**
 * A block in the schematic drawn inside the browser frame. Coordinates are
 * percentages of the frame's content area, so the preview scales with the
 * scene.
 *
 * Blocks are named after what a visitor would recognise on a page — menu,
 * produto, carrinho, botão — rather than left as abstract rectangles. The
 * point is that someone who is not a developer can look at the frame and see
 * what they would be getting.
 */
export type PreviewBlock = {
  x: number;
  y: number;
  w: number;
  h: number;
  tone?: "line" | "fill" | "solid";
  label?: string;
};

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
    // One page, one message, one action.
    preview: [
      { x: 6, y: 6, w: 88, h: 9, tone: "line", label: "Menu" },
      { x: 6, y: 22, w: 52, h: 13, tone: "solid", label: "Título" },
      { x: 6, y: 40, w: 66, h: 5, tone: "fill" },
      { x: 6, y: 48, w: 52, h: 5, tone: "fill" },
      { x: 6, y: 60, w: 26, h: 12, tone: "solid", label: "Botão" },
      { x: 38, y: 60, w: 56, h: 33, tone: "line", label: "Imagem" },
    ],
  },
  {
    id: "site-institucional",
    label: "Site institucional",
    description:
      "A estrutura, o conteúdo e as páginas que sustentam a presença da empresa e facilitam o contato.",
    emphasis: ["estrutura", "interface", "conteudo"],
    preview: [
      { x: 6, y: 6, w: 88, h: 9, tone: "line", label: "Início · Sobre · Contato" },
      { x: 6, y: 22, w: 48, h: 12, tone: "solid", label: "Sua empresa" },
      { x: 6, y: 39, w: 62, h: 5, tone: "fill" },
      { x: 6, y: 53, w: 27, h: 38, tone: "line", label: "Serviços" },
      { x: 36.5, y: 53, w: 27, h: 38, tone: "line", label: "Equipe" },
      { x: 67, y: 53, w: 27, h: 38, tone: "line", label: "Contato" },
    ],
  },
  {
    id: "ecommerce",
    label: "E-commerce",
    description:
      "Experiência de compra, organização de catálogo, integrações e performance trabalhando no mesmo fluxo.",
    emphasis: ["interface", "integracao", "performance"],
    // Catalogue plus a checkout rail that never leaves the screen.
    preview: [
      { x: 6, y: 6, w: 88, h: 9, tone: "line", label: "Loja · Carrinho" },
      { x: 6, y: 21, w: 20, h: 32, tone: "line", label: "Produto" },
      { x: 28, y: 21, w: 20, h: 32, tone: "line", label: "Produto" },
      { x: 50, y: 21, w: 20, h: 32, tone: "line", label: "Produto" },
      { x: 6, y: 57, w: 20, h: 32, tone: "line", label: "Produto" },
      { x: 28, y: 57, w: 20, h: 32, tone: "line", label: "Produto" },
      { x: 50, y: 57, w: 20, h: 32, tone: "line", label: "Produto" },
      { x: 74, y: 21, w: 20, h: 45, tone: "fill", label: "Carrinho" },
      { x: 74, y: 70, w: 20, h: 12, tone: "solid", label: "Finalizar" },
    ],
  },
  {
    id: "interface",
    label: "Interface",
    description:
      "Telas, componentes e estados desenhados e implementados para funcionar em uso real, não só na apresentação.",
    emphasis: ["interface", "codigo"],
    preview: [
      { x: 6, y: 7, w: 42, h: 24, tone: "fill", label: "Componente" },
      { x: 52, y: 7, w: 42, h: 24, tone: "line", label: "Estado" },
      { x: 6, y: 37, w: 88, h: 11, tone: "solid", label: "Formulário" },
      { x: 6, y: 54, w: 27, h: 24, tone: "line", label: "Card" },
      { x: 36.5, y: 54, w: 27, h: 24, tone: "line", label: "Card" },
      { x: 67, y: 54, w: 27, h: 24, tone: "line", label: "Card" },
      { x: 6, y: 83, w: 30, h: 11, tone: "line", label: "Botão" },
    ],
  },
  {
    id: "integracao",
    label: "Integração",
    description:
      "Pagamento, CRM, estoque, formulário ou API: sistemas que passam a conversar dentro do site.",
    emphasis: ["codigo", "integracao"],
    // Two systems, and the lines that finally connect them.
    preview: [
      { x: 5, y: 22, w: 26, h: 46, tone: "line", label: "Seu site" },
      { x: 69, y: 22, w: 26, h: 46, tone: "line", label: "Sistema" },
      { x: 33, y: 32, w: 34, h: 10, tone: "solid", label: "Pagamento" },
      { x: 33, y: 48, w: 34, h: 10, tone: "fill", label: "Estoque" },
      { x: 5, y: 78, w: 90, h: 11, tone: "fill", label: "Pedido confirmado" },
    ],
  },
  {
    id: "correcao",
    label: "Correção",
    description:
      "O que está quebrado, lento ou fora do lugar é diagnosticado e resolvido direto no código.",
    emphasis: ["codigo", "publicacao"],
    preview: [
      { x: 6, y: 6, w: 88, h: 9, tone: "line", label: "Menu" },
      { x: 6, y: 23, w: 44, h: 7, tone: "fill" },
      { x: 6, y: 34, w: 64, h: 5, tone: "fill" },
      { x: 6, y: 46, w: 40, h: 28, tone: "solid", label: "Resolvido" },
      { x: 50, y: 46, w: 44, h: 28, tone: "line" },
      { x: 6, y: 80, w: 70, h: 8, tone: "fill" },
    ],
  },
  {
    id: "otimizacao",
    label: "Otimização",
    description:
      "Velocidade, Core Web Vitals e SEO técnico revisados até o site carregar e ranquear melhor.",
    emphasis: ["performance", "conteudo"],
    // Measurements, longest first.
    preview: [
      { x: 6, y: 12, w: 88, h: 13, tone: "solid", label: "Velocidade" },
      { x: 6, y: 31, w: 72, h: 13, tone: "fill", label: "Google" },
      { x: 6, y: 50, w: 56, h: 13, tone: "fill", label: "Imagens" },
      { x: 6, y: 69, w: 40, h: 13, tone: "line", label: "Código" },
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
      { x: 6, y: 6, w: 88, h: 9, tone: "line", label: "Menu" },
      { x: 6, y: 21, w: 54, h: 30, tone: "line", label: "Site atual" },
      { x: 64, y: 21, w: 30, h: 30, tone: "solid", label: "Novo recurso" },
      { x: 6, y: 57, w: 88, h: 7, tone: "fill" },
      { x: 6, y: 69, w: 42, h: 24, tone: "line" },
      { x: 52, y: 69, w: 42, h: 24, tone: "line" },
    ],
  },
  {
    id: "evolucao",
    label: "Evolução de projeto",
    description:
      "Correções, novas páginas, funcionalidades e melhorias sem precisar recomeçar do zero.",
    emphasis: ["estrutura", "codigo", "publicacao"],
    preview: [
      { x: 6, y: 6, w: 88, h: 9, tone: "line", label: "Menu" },
      { x: 6, y: 20, w: 42, h: 20, tone: "line", label: "Página atual" },
      { x: 52, y: 20, w: 42, h: 20, tone: "line", label: "Página atual" },
      { x: 6, y: 46, w: 88, h: 11, tone: "solid", label: "Nova seção" },
      { x: 6, y: 63, w: 27, h: 22, tone: "line" },
      { x: 36.5, y: 63, w: 27, h: 22, tone: "line" },
      { x: 67, y: 63, w: 27, h: 22, tone: "fill", label: "Nova página" },
    ],
  },
  {
    id: "suporte",
    label: "Suporte recorrente",
    description:
      "Uma fila contínua de ajustes e entregas, com prioridade definida a cada ciclo.",
    emphasis: ["codigo", "performance", "publicacao"],
    // A queue: what shipped, what is moving, what is waiting.
    preview: [
      { x: 6, y: 8, w: 88, h: 13, tone: "solid", label: "Entregue" },
      { x: 6, y: 26, w: 88, h: 13, tone: "fill", label: "Em execução" },
      { x: 6, y: 44, w: 88, h: 13, tone: "line", label: "Na fila" },
      { x: 6, y: 62, w: 88, h: 13, tone: "line", label: "Na fila" },
      { x: 6, y: 80, w: 62, h: 13, tone: "line", label: "Na fila" },
    ],
  },
];
