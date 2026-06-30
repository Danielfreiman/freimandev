import Image from "next/image";

const projects = [
  ["YAGE — Ethnobotanical Exploration", "Conteúdo / Blog", "/assets/projects/yage-home.png", 1892, 945, ""],
  ["Maya Ethnobotanicals", "E-commerce Global", "/assets/projects/maya-home.png", 1898, 936, ""],
  ["Medicina Sagrada", "E-commerce de Nicho", "/assets/projects/medicina-home.png", 1905, 937, ""],
  ["Sacred Connection", "E-commerce Internacional", "/assets/projects/sacred-home.png", 1901, 941, ""],
  ["Sítio Flor das Águas", "Turismo e Hospedagem", "/assets/projects/sitio-home.png", 1887, 938, "md:col-span-2"],
] as const;

export default function Portfolio() {
  return (
    <section className="bg-surface-dark/10 px-6 py-24" id="portfolio">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-16"><h2 className="mb-4 text-4xl font-bold tracking-tight">Projetos que Geram Resultados</h2><p className="text-slate-400">Excelência técnica e visual aplicada em cada entrega.</p></div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {projects.map(([title, category, src, width, height, span]) => (
            <article key={title} className={`group relative aspect-video overflow-hidden rounded-2xl border border-border-dark bg-surface-dark ${span}`}>
              <Image src={src} alt={`Projeto ${title} desenvolvido pela Freiman Dev`} width={width} height={height} sizes={span ? "(min-width: 768px) 1200px, 100vw" : "(min-width: 768px) 584px, 100vw"} className="size-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-background-dark via-background-dark/50 to-transparent p-8 opacity-100 transition-all md:opacity-0 md:group-hover:opacity-100"><span className="mb-2 text-xs font-bold uppercase tracking-widest text-accent">{category}</span><h3 className="text-2xl font-bold">{title}</h3></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
