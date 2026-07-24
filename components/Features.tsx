import Icon from "./Icon";

const features = [
  { icon: "brush", title: "Design com identidade", text: "Nada de aparência genérica. Cada interface é construída a partir da essência e dos objetivos da sua marca." },
  { icon: "search_check", title: "SEO desde o início", text: "Estrutura semântica, velocidade e conteúdo preparados para ajudar o Google a encontrar você." },
  { icon: "terminal", title: "Tecnologia que dura", text: "Código limpo, seguro e fácil de evoluir conforme seu negócio cresce." },
  { icon: "support_agent", title: "Parceria de verdade", text: "Comunicação clara durante o projeto e suporte especializado depois da entrega." },
];

export default function Features() {
  return (
    <section className="border-y border-white/10 px-4 py-16 sm:px-6 sm:py-20 lg:py-24" id="diferenciais">
      <div className="mx-auto max-w-[1180px]">
        <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.2em] text-accent">Nosso jeito de fazer</p>
            <h2 className="mt-4 text-balance text-4xl font-medium tracking-[-.05em] text-white sm:text-5xl">Bonito na tela. Sólido por trás.</h2>
            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-400">Design e tecnologia trabalhando juntos, sem excessos e sem decisões decorativas vazias.</p>
          </div>

          <div className="grid border-t border-white/10 sm:grid-cols-2">
            {features.map((feature) => (
              <article key={feature.title} className="border-b border-white/10 py-7 sm:px-7 sm:odd:border-r sm:first:pt-0 sm:[&:nth-child(2)]:pt-0">
                <span className="flex size-10 items-center justify-center rounded-lg border border-white/15 text-accent">
                  <Icon name={feature.icon} className="size-5" />
                </span>
                <h3 className="mt-7 text-xl font-medium tracking-[-.03em] text-white">{feature.title}</h3>
                <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">{feature.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}