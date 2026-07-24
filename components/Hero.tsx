import Icon from "./Icon";

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-36 lg:pb-24 lg:pt-44">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(182,243,107,0.16),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(109,141,255,0.14),transparent_26%)]" />
      <div className="mx-auto max-w-[1180px]">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div className="rounded-[32px] border border-white/10 bg-white/[0.05] p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-xl sm:p-10 lg:p-12">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.28em] text-accent">
              Portfólio repaginado
            </p>
            <h1 className="max-w-4xl text-balance text-[42px] font-semibold leading-[0.98] tracking-[-0.06em] text-white sm:text-6xl lg:text-[78px]">
              Projetos com presença própria, e-commerce com voz e páginas que não parecem templates.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
              Uma seleção de trabalhos onde cada detalhe aponta para a marca — tipografia autoral, hierarquia clara e interações discretas que sustentam a experiência.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <a
                href="#portfolio"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-white/15 bg-white/5 px-5 py-3.5 text-sm font-semibold text-white transition-all hover:border-accent hover:text-accent"
              >
                Ver o portfolio <span aria-hidden="true">↓</span>
              </a>
              <a
                href="https://wa.me/5522998183416?text=Olá%2C%20gostaria%20de%20solicitar%20um%20orçamento."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-accent px-5 py-3.5 text-sm font-bold text-background-dark transition-colors hover:bg-white"
              >
                Fazer orçamento <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <div className="grid gap-4">
            <article className="rounded-[32px] border border-white/10 bg-[#0d1117]/85 p-7 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
              <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">Destaque</p>
              <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">
                O foco está em projetos que conversam com marca e conversão.
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-400">
                Reescrevemos a experiência de sites institucionais, e-commerces e landing pages para funcionar como uma estrutura editorial e visual única.
              </p>
            </article>
            <article className="rounded-[32px] border border-white/10 bg-background-dark/80 p-7">
              <p className="text-[10px] uppercase tracking-[0.24em] text-accent">Seleção recente</p>
              <div className="mt-6 space-y-4">
                <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Eudoxia</p>
                  <p className="mt-2 font-semibold text-white">Blog editorial com tipografia autoral</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">ADVBNDES</p>
                  <p className="mt-2 font-semibold text-white">Institucional com navegação clara para associados</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Maya Ethnobotanicals</p>
                  <p className="mt-2 font-semibold text-white">E-commerce global com visual autêntico</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}