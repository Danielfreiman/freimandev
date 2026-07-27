/**
 * Four stages, in order. The numbering is real sequence information — the
 * scene advances one state per stage — so the indices carry meaning rather
 * than decoration.
 */
export type ProcessStage = {
  index: string;
  title: string;
  description: string;
  /** Status chip mirrored in the scene's browser frame. */
  status: string;
};

export const PROCESS: ProcessStage[] = [
  {
    index: "01",
    title: "Contexto",
    description:
      "Você apresenta a demanda, o projeto atual e o que precisa ser resolvido.",
    status: "recebido",
  },
  {
    index: "02",
    title: "Direção",
    description:
      "A necessidade é transformada em escopo, prioridades e uma forma objetiva de execução.",
    status: "escopo",
  },
  {
    index: "03",
    title: "Construção",
    description:
      "Design, desenvolvimento, integração e validação acontecem de acordo com o projeto.",
    status: "build",
  },
  {
    index: "04",
    title: "Publicação",
    description:
      "A solução é revisada, colocada no ar e preparada para continuar evoluindo.",
    status: "live",
  },
];

/** Contract formats — no invented pricing, no fake subscription tiers. */
export const ENGAGEMENTS = [
  {
    id: "projeto-completo",
    label: "Projeto completo",
    description:
      "Para uma nova landing page, site, loja ou experiência digital.",
  },
  {
    id: "demanda-pontual",
    label: "Demanda pontual",
    description:
      "Para páginas, correções, integrações e funcionalidades específicas.",
  },
  {
    id: "execucao-recorrente",
    label: "Execução recorrente",
    description:
      "Para empresas e parceiros com uma fila contínua de melhorias e entregas.",
  },
] as const;
