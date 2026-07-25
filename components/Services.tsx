import Icon from "./Icon";

const services = [
  { icon: "ads_click", title: "Landing pages", description: "Páginas criadas para gerar leads e apoio a campanhas com linguagem direta e foco em conversão.", tags: ["Conversão", "Campanhas"] },
  { icon: "shopping_bag", title: "E-commerce", description: "Lojas digitais pensadas para vender com segurança, velocidade e um fluxo de compra claro.", tags: ["Vendas", "Escala"] },
  { icon: "business", title: "Sites institucionais", description: "Presenças digitais que fortalecem a reputação da marca e facilitam o contato com clientes e parceiros.", tags: ["Marca", "Autoridade"] },
  { icon: "newspaper", title: "Blogs & conteúdo", description: "Soluções editoriais para posicionar sua empresa no Google e construir confiança com usuários.", tags: ["Conteúdo", "SEO"] },
];

export default function Services() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20 lg:py-24" id="servicos">
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-10 grid gap-5 border-b border-white/10 pb-10 md:grid-cols-[1fr_0.7fr] md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">O que entregamos</p>
            <h2 className="mt-4 max-w-2xl text-4xl font-medium tracking-[-0.05em] text-white sm:text-5xl">Soluções digitais que funcionam para seu negócio.</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-slate-400 md:justify-self-end">
            Sites, e-commerces e plataformas com foco em resultado: conversão, autoridade e experiência consistente.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {services.map((service) => (
            <article key={service.title} className="group rounded-[28px] border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-accent/30 hover:bg-accent/[0.06]">
              <span className="flex size-11 items-center justify-center rounded-2xl border border-white/15 bg-background-dark/70 text-accent transition-colors group-hover:border-accent/40">
                <Icon name={service.icon} className="size-5" />
              </span>
              <div className="mt-5">
                <h3 className="text-xl font-medium tracking-[-0.03em] text-white sm:text-2xl">{service.title}</h3>
                <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">{service.description}</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 bg-background-dark/60 px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-slate-500">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}