export default function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pt-28 pb-24 sm:px-6 sm:pt-32 sm:pb-32 lg:pb-36">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[30rem] bg-[radial-gradient(circle_at_top_left,rgba(139,214,255,0.2),transparent_26%)]" />
      <div className="pointer-events-none absolute -right-32 top-20 hidden h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(250,127,114,0.16),transparent_56%)] blur-3xl lg:block" />
      <div className="mx-auto max-w-[1180px]">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div className="rounded-[34px] border border-white/10 bg-[#06070f]/95 p-8 shadow-[0_50px_120px_rgba(0,0,0,0.22)] sm:p-10 lg:p-12">
            <div className="inline-flex rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-primary">
              Sites, e-commerce e produtos digitais
            </div>
            <h1 className="mt-8 max-w-3xl text-[3.2rem] font-semibold leading-[0.98] tracking-[-0.05em] text-white sm:text-[4rem] lg:text-[5rem]">
              Criamos experiências digitais que vendem, ativam e posicionam sua marca.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-400 sm:text-xl">
              Entregamos design autoral, arquitetura de conversão e execução técnica para transformar cada projeto em resultado real.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-4">
              <a
                href="#portfolio"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm font-semibold text-white transition hover:border-primary hover:text-primary"
              >
                Ver nossos projetos
              </a>
              <a
                href="https://wa.me/5522998183416?text=Ol%C3%A1%2C%20gostaria%20de%20falar%20sobre%20um%20site."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-black transition hover:bg-white"
              >
                Brief imediato <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <div className="grid gap-6">
            <article className="rounded-[34px] border border-white/10 bg-[#0b111f]/95 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.18)]">
              <p className="text-[10px] uppercase tracking-[0.24em] text-accent">Forma</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white">Arquitetura modular com postura editorial.</h2>
              <p className="mt-4 text-sm leading-7 text-slate-400">
                Espaços amplos, blocos que respiram e contrastes que cruzam o olhar sem perder a calma.
              </p>
            </article>
            <article className="rounded-[34px] border border-white/10 bg-[#101424]/95 p-8">
              <p className="text-[10px] uppercase tracking-[0.24em] text-accent">Tom</p>
              <ul className="mt-6 space-y-3 text-sm text-slate-400">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-accent" />
                  Um tom mais seco, porém elegante.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-accent" />
                  Tipografia com impacto e leitura confortável.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-accent" />
                  Um visual que se sente planejado e próprio.
                </li>
              </ul>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
