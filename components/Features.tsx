import Icon from "./Icon";

const features = [
  { icon: "brush", title: "Direção criativa clara", text: "Não fazemos design por moda: criamos interfaces alinhadas ao objetivo do seu negócio." },
  { icon: "search_check", title: "Resultado em busca", text: "Sites construídos para performance, com SEO técnico que nasce na estrutura e no conteúdo." },
  { icon: "terminal", title: "Execução confiável", text: "Código sólido e escalável que permite evoluir o projeto com segurança e velocidade." },
  { icon: "support_agent", title: "Entrega com apoio", text: "Acompanhamento próximo desde o briefing até a entrega e além, para que o projeto se mantenha forte." },
];

export default function Features() {
  return (
    <section className="border-y border-white/10 px-4 py-16 sm:px-6 sm:py-20 lg:py-24" id="diferenciais">
      <div className="mx-auto max-w-[1180px]">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">Como entregamos</p>
            <h2 className="mt-4 text-balance text-4xl font-medium tracking-[-0.05em] text-white sm:text-5xl">Estrutura pensada para negócio.</h2>
            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-400">Design e tecnologia juntos para gerar presença, clareza e conversão sem exageros.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((feature) => (
              <article key={feature.title} className="rounded-[24px] border border-white/10 bg-[#0d1117]/70 p-6">
                <span className="flex size-10 items-center justify-center rounded-2xl border border-white/15 bg-background-dark/70 text-accent">
                  <Icon name={feature.icon} className="size-5" />
                </span>
                <h3 className="mt-6 text-xl font-medium tracking-[-0.03em] text-white">{feature.title}</h3>
                <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">{feature.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}