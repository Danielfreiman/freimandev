import Image from "next/image";

type Project = {
  title: string;
  category: string;
  description?: string;
  src: string;
  width: number;
  height: number;
  href?: string;
  featured?: boolean;
  tags?: string[];
};

const projects: Project[] = [
  {
    title: "The Blog — Eudoxia",
    category: "Design editorial & desenvolvimento WordPress",
    description:
      "Repaginação completa do blog, com nova experiência editorial, páginas de tags, templates para os posts e uma tipografia autoral criada especialmente para o projeto.",
    src: "/assets/projects/capa-eudoxia.png",
    width: 2538,
    height: 1268,
    href: "https://eudoxia.rocks/theblog/",
    featured: true,
    tags: ["Blog", "UX/UI", "Tags", "Tipografia autoral"],
  },
  {
    title: "ADVBNDES",
    category: "Site institucional & associação",
    description:
      "Criação de uma presença digital clara e confiável para a Associação dos Advogados do BNDES, organizando conteúdo institucional, notícias, serviços e acesso dos associados.",
    src: "/assets/projects/capa-bndes.png",
    width: 2538,
    height: 1265,
    href: "https://advbndes.org.br/",
    tags: ["Institucional", "UX/UI", "WordPress", "Responsivo"],
  },
  {
    title: "Sítio Flor das Águas",
    category: "Turismo & hospedagem",
    src: "/assets/projects/sitio-home.png",
    width: 1887,
    height: 938,
  },
  {
    title: "Maya Ethnobotanicals",
    category: "E-commerce global",
    src: "/assets/projects/maya-home.png",
    width: 1898,
    height: 936,
  },
  {
    title: "Medicina Sagrada",
    category: "E-commerce de nicho",
    src: "/assets/projects/medicina-home.png",
    width: 1905,
    height: 937,
  },
  {
    title: "YAGE Exploration",
    category: "Conteúdo & editorial",
    src: "/assets/projects/yage-home.png",
    width: 1892,
    height: 945,
  },
  {
    title: "Sacred Connection",
    category: "E-commerce internacional",
    src: "/assets/projects/sacred-home.png",
    width: 1901,
    height: 941,
  },
];

export default function Portfolio() {
  return (
    <section
      className="border-y border-white/10 bg-[#0d0f13] px-4 py-16 sm:px-6 sm:py-20 lg:py-24"
      id="portfolio"
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.2em] text-accent">
              Projetos selecionados
            </p>
            <h2 className="mt-4 text-4xl font-medium tracking-[-.05em] text-white sm:text-5xl">
              Trabalho que fala por si.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-slate-500">
            Uma seleção de experiências digitais criadas para marcas com
            diferentes desafios.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((project, index) => {
            const image = (
              <div
                className={`relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-surface-dark sm:rounded-[28px] ${
                  project.featured
                    ? "aspect-[4/3] min-h-[260px] sm:aspect-[16/8] sm:min-h-[360px]"
                    : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={project.src}
                  alt={`Projeto ${project.title} desenvolvido pela Freiman Dev`}
                  width={project.width}
                  height={project.height}
                  sizes={
                    project.featured
                      ? "(min-width: 768px) 1180px, 100vw"
                      : "(min-width: 768px) 580px, 100vw"
                  }
                  className="size-full object-cover object-center transition duration-700 group-hover:scale-[1.035]"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
                {project.href && (
                  <span className="absolute right-5 top-5 flex size-11 translate-y-2 items-center justify-center rounded-full border border-white/15 bg-black/70 text-lg text-white opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                    ↗
                  </span>
                )}
              </div>
            );

            return (
              <article
                key={project.title}
                className={`group ${project.featured ? "md:col-span-2" : ""}`}
              >
                {project.href ? (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Visitar ${project.title}`}
                    className="block rounded-[28px]"
                  >
                    {image}
                  </a>
                ) : (
                  image
                )}

                <div
                  className={`flex items-start justify-between gap-6 px-1 pb-6 pt-5 ${
                    project.featured ? "flex-col sm:flex-row" : ""
                  }`}
                >
                  <div className={project.featured ? "max-w-3xl" : ""}>
                    <h3 className="text-xl font-medium tracking-[-.03em] text-white">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      {project.category}
                    </p>
                    {project.description && (
                      <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-400">
                        {project.description}
                      </p>
                    )}
                    {project.tags && (
                      <ul
                        aria-label="Entregas do projeto"
                        className="mt-5 flex flex-wrap gap-2"
                      >
                        {project.tags.map((tag) => (
                          <li
                            key={tag}
                            className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-[10px] uppercase tracking-[.12em] text-slate-400"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
