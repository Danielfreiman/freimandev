import Icon from "./Icon";

const whatsapp = "https://wa.me/5522998183416?text=Olá%2C%20gostaria%20de%20solicitar%20um%20orçamento.";

export default function Hero() {
  return (
    <section className="aurora grid-pattern relative overflow-hidden px-5 pb-20 pt-36 sm:px-6 lg:pb-28 lg:pt-44">
      <div className="pointer-events-none absolute left-1/2 top-20 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
      <div className="relative mx-auto grid max-w-[1180px] items-center gap-14 lg:grid-cols-[1.05fr_.95fr]">
        <div>
          <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">
            <span className="flex size-5 items-center justify-center rounded-full bg-accent/15"><span className="size-1.5 rounded-full bg-accent shadow-[0_0_10px_#b6f36b]" /></span>
            Design, código e estratégia
          </div>
          <h1 className="text-balance text-5xl font-semibold leading-[.98] tracking-[-0.065em] text-white sm:text-6xl lg:text-[76px]">
            Sites digitais feitos para <span className="bg-gradient-to-r from-accent via-white to-primary bg-clip-text text-transparent">mover negócios.</span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-slate-400 sm:text-lg">
            Criamos experiências web únicas, rápidas e preparadas para transformar atenção em resultado.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="shine inline-flex items-center justify-center gap-3 rounded-2xl bg-accent px-7 py-4 text-sm font-bold text-background-dark transition-transform hover:-translate-y-1">
              Quero tirar meu projeto do papel <span aria-hidden="true">↗</span>
            </a>
            <a href="#portfolio" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-7 py-4 text-sm font-semibold text-white transition hover:bg-white/[0.08]">
              Ver projetos <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-6 text-xs text-slate-500">
            <span className="flex items-center gap-2"><Icon name="check_circle" className="size-4 text-accent" />Design sob medida</span>
            <span className="flex items-center gap-2"><Icon name="check_circle" className="size-4 text-accent" />SEO técnico</span>
            <span className="flex items-center gap-2"><Icon name="check_circle" className="size-4 text-accent" />Alta performance</span>
          </div>
        </div>

        <div className="animate-float relative mx-auto w-full max-w-[540px]">
          <div className="absolute -inset-8 rounded-full bg-primary/10 blur-3xl" />
          <div className="glass relative overflow-hidden rounded-[28px] p-2 shadow-[0_40px_100px_rgba(0,0,0,.5)]">
            <div className="overflow-hidden rounded-[22px] border border-white/5 bg-[#0b0e15]">
              <div className="flex h-11 items-center gap-2 border-b border-white/[0.07] px-4">
                <span className="size-2.5 rounded-full bg-[#ff6b6b]" /><span className="size-2.5 rounded-full bg-[#ffd166]" /><span className="size-2.5 rounded-full bg-accent" />
                <div className="mx-auto flex h-6 w-1/2 items-center justify-center rounded-md bg-white/[0.04] text-[8px] text-slate-600">freiman.dev</div>
              </div>
              <div className="relative min-h-[390px] overflow-hidden p-6 sm:p-8">
                <div className="absolute right-[-70px] top-[-50px] size-64 rounded-full bg-primary/20 blur-3xl" />
                <div className="relative">
                  <p className="text-[10px] font-semibold uppercase tracking-[.22em] text-accent">Digital studio — 2026</p>
                  <p className="mt-5 max-w-[360px] text-4xl font-semibold leading-[.95] tracking-[-.06em] text-white sm:text-5xl">Ideias fortes merecem presença forte.</p>
                  <div className="mt-8 grid grid-cols-3 gap-2">
                    {[["01", "Estratégia"], ["02", "Design"], ["03", "Código"]].map(([number, label]) => (
                      <div key={number} className="rounded-xl border border-white/[0.07] bg-white/[0.035] p-3">
                        <span className="text-[9px] text-slate-600">{number}</span><p className="mt-4 text-[10px] font-medium text-slate-300">{label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center justify-between rounded-xl bg-accent p-4 text-background-dark">
                    <span className="text-xs font-bold">Seu próximo projeto começa aqui</span><span className="text-lg">↗</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="glass absolute -bottom-6 -left-4 rounded-2xl px-4 py-3 sm:-left-10"><p className="text-[9px] uppercase tracking-widest text-slate-500">Core Web Vitals</p><p className="mt-1 text-sm font-semibold text-white">Prioridade <span className="text-accent">●</span></p></div>
        </div>
      </div>
    </section>
  );
}
