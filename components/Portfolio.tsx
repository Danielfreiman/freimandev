import Image from "next/image";

type Project = {
  title: string;
  src: string;
  width: number;
  height: number;
  href?: string;
};

const projects: Project[] = [
  {
    title: "The Blog — Eudoxia",
    src: "/assets/projects/capa-eudoxia.png",
    width: 2538,
    height: 1268,
    href: "https://eudoxia.rocks/theblog/",
  },
  {
    title: "ADVBNDES",
    src: "/assets/projects/capa-bndes.png",
    width: 2538,
    height: 1265,
    href: "https://advbndes.org.br/",
  },
  {
    title: "Sítio Flor das Águas",
    src: "/assets/projects/sitio-home.png",
    width: 1887,
    height: 938,
  },
  {
    title: "Maya Ethnobotanicals",
    src: "/assets/projects/maya-home.png",
    width: 1898,
    height: 936,
  },
  {
    title: "Medicina Sagrada",
    src: "/assets/projects/medicina-home.png",
    width: 1905,
    height: 937,
  },
  {
    title: "YAGE Exploration",
    src: "/assets/projects/yage-home.png",
    width: 1892,
    height: 945,
  },
  {
    title: "Sacred Connection",
    src: "/assets/projects/sacred-home.png",
    width: 1901,
    height: 941,
  },
];

export default function Portfolio() {
  const [heroProject, ...gallery] = projects;

  return (
    <section className="bg-[#04060b] px-4 py-16 sm:px-6 sm:py-24 lg:py-28" id="portfolio">
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-14 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-accent/80">Projetos</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
              Projetos que mostram o que entregamos e como entregamos.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-slate-500">
            Cada caso destaca imagem e título porque a mensagem principal é: resultados visuais alinhados a objetivos reais.
          </p>
        </div>

        <div className="grid gap-6">
          <article className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-[#0f1625]/95 shadow-[0_30px_90px_rgba(0,0,0,0.2)]">
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src={heroProject.src}
                alt={`Projeto ${heroProject.title}`}
                width={heroProject.width}
                height={heroProject.height}
                sizes="(min-width: 1024px) 1180px, 100vw"
                className="h-full w-full object-cover object-center transition duration-700 group-hover:scale-[1.03]"
                priority
              />
              {heroProject.href && (
                <a
                  href={heroProject.href}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/75 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-accent hover:text-black"
                >
                  Ver projeto ↗
                </a>
              )}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#04060b]/95 to-transparent p-6">
                <h3 className="text-3xl font-semibold tracking-[-0.04em] text-white">{heroProject.title}</h3>
              </div>
            </div>
          </article>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {gallery.map((project) => (
              <article
                key={project.title}
                className="group overflow-hidden rounded-[28px] border border-white/10 bg-[#0c111e]/95 transition hover:border-accent/40"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.src}
                    alt={`Projeto ${project.title}`}
                    width={project.width}
                    height={project.height}
                    sizes="(min-width: 1280px) 420px, (min-width: 768px) 440px, 100vw"
                    className="h-full w-full object-cover object-center transition duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-4">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">{project.title}</h3>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
