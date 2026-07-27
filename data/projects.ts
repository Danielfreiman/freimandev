/**
 * Real Freiman Dev portfolio.
 *
 * - `href` for every project was supplied by the studio and then checked to be
 *   live and to match the project name. yage.net is stored as https because
 *   http://yage.net redirects there.
 * - `category` and `summary` describe what the delivered site actually is,
 *   read off the site itself (navigation, cart/checkout markers, content).
 * - `services` ties a project back to the "O que precisa sair do papel?"
 *   section: every entry must match a `label` in data/capabilities.ts, so the
 *   two sections always speak the same vocabulary.
 * - `cover` is a homepage screenshot re-hosted locally as optimised webp.
 *   A project with `cover: null` stays off the site until its screenshot
 *   exists — see "Adding a project" below.
 *
 * Adding a project
 * ----------------
 * 1. Drop the homepage PNG in a folder and run:
 *      npm run optimize:images ./that-folder
 *    It writes public/projects/<name>.webp and prints the dimensions.
 * 2. Set `cover`, `width` and `height` here. The project appears automatically;
 *    the 01/02/03 index is derived from the order of this list, so nothing
 *    needs renumbering.
 */

export type Project = {
  slug: string;
  name: string;
  category: string;
  /** One line on what the delivered site does. */
  summary: string;
  /** Must match labels in data/capabilities.ts. */
  services: string[];
  /** null until a homepage screenshot has been captured. */
  cover: string | null;
  width: number;
  height: number;
  /** Every project in the portfolio has a verified live URL. */
  href: string;
  /**
   * Shown on the homepage. The selection is one project per kind of work —
   * five of these sites are e-commerces and showing all of them made the list
   * long and repetitive. Everything else lives on /projetos.
   */
  featured?: boolean;
};

export const PROJECTS: Project[] = [
  {
    slug: "eudoxia",
    featured: true,
    name: "The Blog — Eudoxia",
    category: "Conteúdo editorial",
    summary:
      "Área editorial dentro do site da artista: posts, newsletter e player convivendo na mesma navegação.",
    services: ["Interface", "Nova funcionalidade", "Otimização"],
    cover: "/projects/capa-eudoxia.webp",
    width: 1600,
    height: 799,
    href: "https://eudoxia.rocks/theblog/",
  },
  {
    slug: "advbndes",
    featured: true,
    name: "ADVBNDES",
    category: "Site institucional",
    summary:
      "Site da associação com notícias, jurisprudência, área de associados e canais de contato.",
    services: ["Site institucional", "Evolução de projeto"],
    cover: "/projects/capa-bndes.webp",
    width: 1600,
    height: 797,
    href: "https://advbndes.org.br/",
  },
  {
    slug: "flor-das-aguas",
    featured: true,
    name: "Sítio Flor das Águas",
    category: "Hospedagem e reservas",
    summary:
      "Hospedagem, restaurante e ecoparque em um só site, com reserva e área do cliente.",
    services: ["Site institucional", "Integração", "Nova funcionalidade"],
    cover: "/projects/sitio-home.webp",
    width: 1600,
    height: 795,
    href: "https://sitioflordasaguas.com.br/",
  },
  {
    slug: "maya",
    name: "Maya Ethnobotanicals",
    category: "E-commerce",
    summary:
      "Loja multilíngue de etnobotânicos, com catálogo extenso e variações por peso.",
    services: ["E-commerce", "Integração", "Suporte recorrente"],
    cover: "/projects/maya-home.webp",
    width: 1600,
    height: 789,
    href: "https://mayaherbs.com/",
  },
  {
    slug: "medicina-sagrada",
    name: "Medicina Sagrada",
    category: "E-commerce",
    summary:
      "Loja com catálogo organizado por tribo e categoria, do rapé aos acessórios.",
    services: ["E-commerce", "Evolução de projeto", "Suporte recorrente"],
    cover: "/projects/medicina-home.webp",
    width: 1600,
    height: 787,
    href: "https://medicinasagrada.com.br/",
  },
  {
    slug: "yage",
    name: "YAGE Exploration",
    category: "Conteúdo editorial",
    summary:
      "Publicação editorial sobre plantas e tradições, construída em torno da leitura.",
    services: ["Interface", "Otimização"],
    cover: "/projects/yage-home.webp",
    width: 1600,
    height: 799,
    href: "https://yage.net/",
  },
  {
    slug: "sacred-connection",
    name: "Sacred Connection",
    category: "E-commerce",
    summary:
      "Loja internacional de rapé, com catálogo por tribo e envio para fora do Brasil.",
    services: ["E-commerce", "Otimização", "Suporte recorrente"],
    cover: "/projects/sacred-home.webp",
    width: 1600,
    height: 792,
    href: "https://sacred-snuff.com/",
  },
  {
    slug: "conexao-ancestral",
    featured: true,
    name: "Conexão Ancestral",
    category: "Institucional e doações",
    summary:
      "Site da organização com apresentação dos projetos, seleção de idioma e caminho direto para doação.",
    services: ["Site institucional", "Interface", "Integração"],
    cover: "/projects/capa-conexao.webp",
    width: 1600,
    height: 764,
    href: "https://www.conexaoancestral.org/",
  },
  {
    slug: "kratomic",
    featured: true,
    name: "Kratomic",
    category: "E-commerce",
    summary:
      "Loja internacional com catálogo por tipo de produto, carrinho e checkout em euro.",
    services: ["E-commerce", "Integração", "Suporte recorrente"],
    cover: "/projects/capa-kratomic.webp",
    width: 1600,
    height: 765,
    href: "https://kratomicshop.com/",
  },
  {
    slug: "cafe-montserrat",
    featured: true,
    name: "Café Montserrat",
    category: "E-commerce",
    summary:
      "Loja de cafés especiais com catálogo, conteúdo editorial e um guia para escolher o café.",
    services: ["E-commerce", "Landing page", "Otimização"],
    cover: "/projects/capa-montserrat.webp",
    width: 1600,
    height: 767,
    href: "https://cafemontserrat.com.br/",
  },
  {
    slug: "alafiya",
    name: "Alafiya Enterprises",
    category: "Site institucional",
    summary:
      "Site institucional internacional apresentando a operação, os produtos e a rede de parceiros.",
    services: ["Site institucional", "Landing page"],
    cover: "/projects/capa-alafiya.webp",
    width: 1600,
    height: 776,
    href: "https://alafiyaenterprises.com/",
  },
];

/** Projects ready to be shown — everything that has a screenshot. */
export const PUBLISHED_PROJECTS = PROJECTS.filter(
  (project): project is Project & { cover: string } => project.cover !== null,
);

/** The homepage cut: one project per kind of work. */
export const FEATURED_PROJECTS = PUBLISHED_PROJECTS.filter(
  (project) => project.featured,
);

/** Bare hostname of a project URL, for the window's address bar. */
export function hostOf(href: string): string {
  return href.replace(/^https?:\/\//, "").replace(/\/$/, "");
}
