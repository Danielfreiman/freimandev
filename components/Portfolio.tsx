import Image from "next/image";

const projects = [
  { title: "Sítio Flor das Águas", category: "Turismo & hospedagem", src: "/assets/projects/sitio-home.png", width: 1887, height: 938, featured: true },
  { title: "Maya Ethnobotanicals", category: "E-commerce global", src: "/assets/projects/maya-home.png", width: 1898, height: 936 },
  { title: "Medicina Sagrada", category: "E-commerce de nicho", src: "/assets/projects/medicina-home.png", width: 1905, height: 937 },
  { title: "YAGE Exploration", category: "Conteúdo & editorial", src: "/assets/projects/yage-home.png", width: 1892, height: 945 },
  { title: "Sacred Connection", category: "E-commerce internacional", src: "/assets/projects/sacred-home.png", width: 1901, height: 941 },
];

export default function Portfolio() {
  return (
    <section className="border-y border-white/[0.07] bg-[#0b0d13] px-4 py-20 sm:px-6 lg:py-28" id="portfolio">
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div><p className="text-xs font-semibold uppercase tracking-[.2em] text-accent">Projetos selecionados</p><h2 className="mt-4 text-4xl font-medium tracking-[-.05em] text-white sm:text-5xl">Trabalho que fala por si.</h2></div>
          <p className="max-w-sm text-sm leading-6 text-slate-500">Uma seleção de experiências digitais criadas para marcas com diferentes desafios.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((project, index) => (
            <article key={project.title} className={`group ${project.featured ? "md:col-span-2" : ""}`}>
              <div className={`relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-surface-dark sm:rounded-[28px] ${project.featured ? "aspect-[4/3] min-h-[240px] sm:aspect-[16/8] sm:min-h-[300px]" : "aspect-[4/3]"}`}>
                <Image src={project.src} alt={`Projeto ${project.title} desenvolvido pela Freiman Dev`} width={project.width} height={project.height} sizes={project.featured ? "(min-width: 768px) 1180px, 100vw" : "(min-width: 768px) 580px, 100vw"} className="size-full object-cover object-top transition duration-700 group-hover:scale-[1.035]" priority={index === 0} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-60 transition group-hover:opacity-80" />
                <span className="absolute right-5 top-5 flex size-11 translate-y-2 items-center justify-center rounded-full border border-white/15 bg-black/30 text-lg text-white opacity-0 backdrop-blur-md transition group-hover:translate-y-0 group-hover:opacity-100">↗</span>
              </div>
              <div className="flex items-start justify-between gap-4 px-1 pb-4 pt-5">
                <div><h3 className="text-xl font-medium tracking-[-.03em] text-white">{project.title}</h3><p className="mt-1 text-xs text-slate-500">{project.category}</p></div>
                <span className="pt-1 text-[10px] tracking-[.18em] text-slate-600">0{index + 1}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
