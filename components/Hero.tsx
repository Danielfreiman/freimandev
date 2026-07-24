import Icon from "./Icon";

const whatsapp = "https://wa.me/5522998183416?text=Olá%2C%20gostaria%20de%20solicitar%20um%20orçamento.";

const capabilities = ["Design sob medida", "SEO técnico", "Alta performance"];

export default function Hero() {
  return (
    <section className="border-b border-white/10 px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-36 lg:pb-24 lg:pt-44">
      <div className="mx-auto max-w-[1180px]">
        <div className="grid items-end gap-10 lg:grid-cols-[1.35fr_.65fr] lg:gap-16">
          <div>
            <p className="mb-6 text-xs font-semibold uppercase tracking-[.2em] text-accent">
              Estúdio digital independente
            </p>
            <h1 className="max-w-5xl text-balance text-[44px] font-medium leading-[.96] tracking-[-.065em] text-white min-[380px]:text-5xl sm:text-7xl lg:text-[88px]">
              Sites com identidade, feitos para mover negócios.
            </h1>
          </div>

          <div className="border-l border-white/15 pl-5 sm:pl-7">
            <p className="max-w-md text-base leading-7 text-slate-400">
              Estratégia, design e desenvolvimento reunidos em experiências digitais rápidas, claras e feitas para durar.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-lg bg-accent px-5 py-4 text-sm font-bold text-background-dark transition-colors hover:bg-white"
              >
                Iniciar um projeto <span aria-hidden="true">↗</span>
              </a>
              <a
                href="#portfolio"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 px-5 py-4 text-sm font-semibold text-white transition-colors hover:border-white/35 hover:bg-white/[0.04]"
              >
                Ver trabalhos <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
        </div>

        <ul className="mt-14 grid border-y border-white/10 sm:grid-cols-3 lg:mt-20">
          {capabilities.map((capability) => (
            <li
              key={capability}
              className="flex items-center gap-3 border-b border-white/10 py-4 text-xs uppercase tracking-[.13em] text-slate-400 last:border-b-0 sm:border-b-0 sm:border-r sm:px-5 sm:first:pl-0 sm:last:border-r-0"
            >
              <Icon name="check_circle" className="size-4 text-accent" />
              {capability}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}