import Icon from "./Icon";

const services = [
  { number: "01", icon: "ads_click", title: "Landing pages", description: "Páginas rápidas e persuasivas, desenhadas para campanhas, lançamentos e geração de oportunidades.", tags: ["Conversão", "Campanhas"] },
  { number: "02", icon: "shopping_bag", title: "E-commerce", description: "Lojas digitais intuitivas, seguras e prontas para acompanhar o crescimento das suas vendas.", tags: ["Vendas", "Escala"] },
  { number: "03", icon: "business", title: "Sites institucionais", description: "Presença profissional que traduz sua proposta de valor e fortalece sua autoridade no mercado.", tags: ["Marca", "Autoridade"] },
  { number: "04", icon: "newspaper", title: "Blogs & conteúdo", description: "Estruturas editoriais fáceis de gerenciar e preparadas para conquistar tráfego orgânico.", tags: ["Conteúdo", "SEO"] },
];

export default function Services() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:py-28" id="servicos">
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div><p className="text-xs font-semibold uppercase tracking-[.2em] text-primary">O que fazemos</p><h2 className="mt-4 max-w-2xl text-4xl font-medium tracking-[-.05em] text-white sm:text-5xl">Do primeiro clique à conversão.</h2></div>
          <p className="max-w-sm text-sm leading-6 text-slate-500">Soluções digitais completas para diferentes momentos e objetivos do seu negócio.</p>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {services.map((service) => (
            <article key={service.number} className="group relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-surface-dark p-6 transition duration-500 hover:-translate-y-1 hover:border-primary/40 sm:rounded-[28px] sm:p-9">
              <div className="absolute right-0 top-0 size-40 translate-x-1/3 -translate-y-1/3 rounded-full bg-primary/0 blur-3xl transition group-hover:bg-primary/15" />
              <div className="relative flex items-start justify-between"><span className="text-[10px] tracking-[.2em] text-slate-600">{service.number}</span><span className="flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-primary"><Icon name={service.icon} className="size-6" /></span></div>
              <h3 className="relative mt-10 text-2xl font-medium tracking-[-.035em] text-white">{service.title}</h3>
              <p className="relative mt-3 max-w-md text-sm leading-6 text-slate-400">{service.description}</p>
              <div className="relative mt-7 flex gap-2">{service.tags.map(tag => <span key={tag} className="rounded-full border border-white/[0.08] px-3 py-1.5 text-[9px] uppercase tracking-wider text-slate-500">{tag}</span>)}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
