const stats = [
  ["100%", "sob medida"],
  ["24h", "para o orçamento"],
  ["SEO", "desde a estrutura"],
];

export default function About() {
  return (
    <section className="border-y border-white/[0.07] px-5 py-20 sm:px-6 lg:py-28" id="sobre">
      <div className="mx-auto grid max-w-[1180px] gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-20">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.2em] text-accent">Sobre a Freiman Dev</p>
          <p className="mt-4 max-w-xs text-sm leading-6 text-slate-500">Um estúdio digital que aproxima estratégia, experiência e engenharia.</p>
        </div>
        <div>
          <h2 className="text-balance text-3xl font-medium leading-tight tracking-[-.045em] text-white sm:text-5xl">
            Não entregamos apenas páginas. Construímos a <span className="text-slate-500">presença digital que sua marca precisa para crescer.</span>
          </h2>
          <p className="mt-7 max-w-2xl text-base leading-7 text-slate-400">Cada projeto nasce de objetivos reais de negócio e ganha forma em uma experiência clara, bonita e funcional — sem templates genéricos ou decisões sem propósito.</p>
          <dl className="mt-10 grid grid-cols-3 gap-3 border-t border-white/10 pt-8">
            {stats.map(([value, label]) => <div key={value}><dt className="text-xl font-semibold text-white sm:text-3xl">{value}</dt><dd className="mt-1 text-[10px] uppercase tracking-wider text-slate-500 sm:text-xs">{label}</dd></div>)}
          </dl>
        </div>
      </div>
    </section>
  );
}
