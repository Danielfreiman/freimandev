import Icon from "./Icon";

const services = [
  { icon: "ads_click", title: "Landing pages", description: "Páginas rápidas e persuasivas, desenhadas para campanhas, lançamentos e geração de oportunidades.", tags: ["Conversão", "Campanhas"] },
  { icon: "shopping_bag", title: "E-commerce", description: "Lojas digitais intuitivas, seguras e prontas para acompanhar o crescimento das suas vendas.", tags: ["Vendas", "Escala"] },
  { icon: "business", title: "Sites institucionais", description: "Presença profissional que traduz sua proposta de valor e fortalece sua autoridade no mercado.", tags: ["Marca", "Autoridade"] },
  { icon: "newspaper", title: "Blogs & conteúdo", description: "Estruturas editoriais fáceis de gerenciar e preparadas para conquistar tráfego orgânico.", tags: ["Conteúdo", "SEO"] },
];

export default function Services() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20 lg:py-24" id="servicos">
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-10 grid gap-5 border-b border-white/10 pb-10 md:grid-cols-2 md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.2em] text-accent">O que fazemos</p>
            <h2 className="mt-4 max-w-2xl text-4xl font-medium tracking-[-.05em] text-white sm:text-5xl">Do primeiro clique à conversão.</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-slate-400 md:justify-self-end">Soluções digitais completas para diferentes momentos e objetivos do seu negócio.</p>
        </div>

        <div className="divide-y divide-white/10 border-b border-white/10">
          {services.map((service) => (
            <article key={service.title} className="group grid gap-5 py-7 sm:grid-cols-[64px_1fr_auto] sm:items-center sm:py-8">
              <span className="flex size-11 items-center justify-center rounded-lg border border-white/15 text-accent transition-colors group-hover:border-accent">
                <Icon name={service.icon} className="size-5" />
              </span>
              <div>
                <h3 className="text-xl font-medium tracking-[-.03em] text-white sm:text-2xl">{service.title}</h3>
                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">{service.description}</p>
              </div>
              <div className="flex gap-2 sm:justify-end">
                {service.tags.map((tag) => <span key={tag} className="text-[10px] uppercase tracking-[.14em] text-slate-500">{tag}</span>)}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}