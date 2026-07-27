/**
 * Real Freiman Dev portfolio, in the same order as the live site.
 *
 * - `name` and `cover` come from freimandev.com.br (covers re-hosted locally
 *   as optimised webp).
 * - `href` for every project was supplied by the studio and then checked to be
 *   live and to match the project name. yage.net is stored as https because
 *   http://yage.net redirects there.
 * - `category` describes what the delivered site actually is, read off its own
 *   cover screenshot (navigation + content), not invented positioning.
 */

export type Project = {
  slug: string;
  index: string;
  name: string;
  category: string;
  cover: string;
  width: number;
  height: number;
  /** Every project in the portfolio has a verified live URL. */
  href: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "eudoxia",
    index: "01",
    name: "The Blog — Eudoxia",
    category: "Conteúdo editorial",
    cover: "/projects/capa-eudoxia.webp",
    width: 1600,
    height: 799,
    href: "https://eudoxia.rocks/theblog/",
  },
  {
    slug: "advbndes",
    index: "02",
    name: "ADVBNDES",
    category: "Site institucional",
    cover: "/projects/capa-bndes.webp",
    width: 1600,
    height: 797,
    href: "https://advbndes.org.br/",
  },
  {
    slug: "flor-das-aguas",
    index: "03",
    name: "Sítio Flor das Águas",
    category: "Hospedagem e reservas",
    cover: "/projects/sitio-home.webp",
    width: 1600,
    height: 795,
    href: "https://sitioflordasaguas.com.br/",
  },
  {
    slug: "maya",
    index: "04",
    name: "Maya Ethnobotanicals",
    category: "E-commerce",
    cover: "/projects/maya-home.webp",
    width: 1600,
    height: 789,
    href: "https://mayaherbs.com/",
  },
  {
    slug: "medicina-sagrada",
    index: "05",
    name: "Medicina Sagrada",
    category: "E-commerce",
    cover: "/projects/medicina-home.webp",
    width: 1600,
    height: 787,
    href: "https://medicinasagrada.com.br/",
  },
  {
    slug: "yage",
    index: "06",
    name: "YAGE Exploration",
    category: "Conteúdo editorial",
    cover: "/projects/yage-home.webp",
    width: 1600,
    height: 799,
    href: "https://yage.net/",
  },
  {
    slug: "sacred-connection",
    index: "07",
    name: "Sacred Connection",
    category: "E-commerce",
    cover: "/projects/sacred-home.webp",
    width: 1600,
    height: 792,
    href: "https://sacred-snuff.com/",
  },
];
