import Icon from "./Icon";

const features = [
  { icon: "brush", title: "Design com identidade", text: "Nada de aparência genérica. Cada interface é construída a partir da essência e dos objetivos da sua marca.", className: "md:col-span-2" },
  { icon: "search_check", title: "SEO desde o início", text: "Estrutura semântica, velocidade e conteúdo preparados para ajudar o Google a encontrar você.", className: "" },
  { icon: "terminal", title: "Tecnologia que dura", text: "Código limpo, seguro e fácil de evoluir conforme seu negócio cresce.", className: "" },
  { icon: "support_agent", title: "Parceria de verdade", text: "Comunicação clara durante o projeto e suporte especializado depois da entrega.", className: "md:col-span-2" },
];

export default function Features() {
  return (
    <section className="px-5 py-20 sm:px-6 lg:py-28" id="diferenciais">
      <div className="mx-auto max-w-[1180px]">
        <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-[.2em] text-primary">Nosso jeito de fazer</p>
            <h2 className="mt-4 text-balance text-4xl font-medium tracking-[-.05em] text-white sm:text-5xl">Bonito na tela. Sólido por trás.</h2>
            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-500">Decisões de design e tecnologia que trabalham juntas para gerar uma experiência superior.</p>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {features.map((feature, index) => (
              <article key={feature.title} className={`glass rounded-[26px] p-7 ${feature.className}`}>
                <div className="flex items-start justify-between"><span className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary"><Icon name={feature.icon} className="size-5" /></span><span className="text-[9px] tracking-widest text-slate-600">0{index + 1}</span></div>
                <h3 className="mt-10 text-xl font-medium tracking-[-.03em] text-white">{feature.title}</h3>
                <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">{feature.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
