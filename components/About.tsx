const stats = [
  ["100%", "sob medida"],
  ["24h", "para o orçamento"],
  ["SEO", "desde a estrutura"],
];

export default function About() {
  return (
    <section className="border-y border-white/[0.07] px-4 py-16 sm:px-6 sm:py-20 lg:py-24" id="sobre">
      <div className="mx-auto grid max-w-[1180px] gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-12">
        <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">Sobre a Freiman Dev</p>
          <p className="mt-4 text-sm leading-7 text-slate-400">
            Um estúdio digital que une estratégia, experiência e engenharia para dar aos projetos uma voz própria.
          </p>
        </div>

        <div className="rounded-[32px] border border-white/10 bg-[#0d1117]/80 p-8 sm:p-10">
          <h2 className="text-balance text-3xl font-medium leading-tight tracking-[-0.045em] text-white sm:text-5xl">
            Não entregamos páginas. Entregamos uma presença que parece <span className="text-slate-400">feita para ser lembrada.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-400">
            Cada projeto nasce de um objetivo real e cresce com uma identidade visual clara, uma estrutura bem pensada e um código preparado para durar.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {stats.map(([value, label]) => (
              <div key={value} className="rounded-2xl border border-white/10 bg-background-dark/70 px-4 py-4">
                <dt className="text-2xl font-semibold text-white sm:text-3xl">{value}</dt>
                <dd className="mt-1 text-[10px] uppercase tracking-[0.2em] text-slate-500 sm:text-xs">{label}</dd>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
