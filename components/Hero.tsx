export default function Hero() {
  return (
    <section className="px-4 pt-28 pb-20 sm:px-6 sm:pt-32 sm:pb-28 lg:pb-32">
      <div className="mx-auto max-w-[1180px]">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div className="rounded-[28px] border border-white/10 bg-[#07080f] p-8 sm:p-10 lg:p-12">
            <p className="text-xs uppercase tracking-[0.24em] text-accent/80">Estúdio digital</p>
            <h1 className="mt-6 text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl lg:text-[4.5rem]">
              Fazemos sites, e-commerces e experiências digitais com clareza e propósito.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400 sm:text-xl">
              Sem brilhos artificiais. Sem degradês exagerados. Apenas projetos sólidos, direto ao ponto e prontos para funcionar.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[22px] border border-white/10 bg-[#0d1117] p-5">
                <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">O que fazemos</p>
                <p className="mt-3 text-base font-semibold text-white">Sites institucionais e de marca</p>
              </div>
              <div className="rounded-[22px] border border-white/10 bg-[#0d1117] p-5">
                <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">O que entregamos</p>
                <p className="mt-3 text-base font-semibold text-white">Landing pages diretas e conversivas</p>
              </div>
              <div className="rounded-[22px] border border-white/10 bg-[#0d1117] p-5">
                <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">O que pensamos</p>
                <p className="mt-3 text-base font-semibold text-white">Experiência que conecta marca e venda</p>
              </div>
              <div className="rounded-[22px] border border-white/10 bg-[#0d1117] p-5">
                <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">O que construímos</p>
                <p className="mt-3 text-base font-semibold text-white">Produtos digitais escaláveis</p>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-4">
              <a
                href="#portfolio"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm font-semibold text-white transition hover:border-accent hover:text-accent"
              >
                Ver trabalhos
              </a>
              <a
                href="https://wa.me/5522998183416?text=Ol%C3%A1%2C%20gostaria%20de%20falar%20sobre%20um%20site."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-semibold text-black transition hover:bg-white"
              >
                Pedir proposta <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[28px] border border-white/10 bg-[#0d1117] p-6">
              <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">Exemplo</p>
              <h2 className="mt-4 text-2xl font-semibold text-white">E-commerce de produtos autorais</h2>
              <p className="mt-3 text-sm leading-7 text-slate-400">
                Layout limpo, navegação clara e checkout direto para aceleração de vendas.
              </p>
            </div>
            <div className="rounded-[28px] border border-white/10 bg-[#0d1117] p-6">
              <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">Exemplo</p>
              <h2 className="mt-4 text-2xl font-semibold text-white">Landing page de lançamento</h2>
              <p className="mt-3 text-sm leading-7 text-slate-400">
                Conversão focada, copy enxuta e foco no passo seguinte do usuário.
              </p>
            </div>
            <div className="rounded-[28px] border border-white/10 bg-[#0d1117] p-6">
              <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">Exemplo</p>
              <h2 className="mt-4 text-2xl font-semibold text-white">Site institucional</h2>
              <p className="mt-3 text-sm leading-7 text-slate-400">
                Uma presença digital com postura corporativa e ritmo visual consistente.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
