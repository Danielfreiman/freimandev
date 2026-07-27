/**
 * The seven layers of the Signature Scene ("The Build Stack").
 *
 * Each layer is a real stage of shipping a web project. They start dispersed
 * in depth, converge into a browser frame, and the last one — Publicação — is
 * the only layer allowed to carry the signal colour, because it means "no ar".
 */

export type LayerId =
  | "estrutura"
  | "interface"
  | "codigo"
  | "conteudo"
  | "integracao"
  | "performance"
  | "publicacao";

export type SceneLayer = {
  id: LayerId;
  label: string;
  /** Monospace annotation shown next to the plane. */
  note: string;
};

export const SCENE_LAYERS: SceneLayer[] = [
  { id: "estrutura", label: "Estrutura", note: "layout / grid" },
  { id: "interface", label: "Interface", note: "componentes" },
  { id: "codigo", label: "Código", note: "next / ts" },
  { id: "conteudo", label: "Conteúdo", note: "texto / mídia" },
  { id: "integracao", label: "Integração", note: "api / checkout" },
  { id: "performance", label: "Performance", note: "core web vitals" },
  { id: "publicacao", label: "Publicação", note: "deploy" },
];
