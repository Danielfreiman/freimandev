import Icon from "./Icon";

const services = [
  ["ads_click", "Landing Pages", "Focadas em converter visitantes em clientes com layouts de alta performance."],
  ["shopping_bag", "E-commerce", "Plataformas de vendas robustas e seguras para escalar o seu faturamento online."],
  ["business", "Sites Institucionais", "Sua autoridade digital refletida em um site profissional e moderno."],
  ["newspaper", "Blogs", "Gestão de conteúdo com tecnologia otimizada para SEO e leitura fluida."],
];

export default function Services() {
  return <section className="mx-auto max-w-[1200px] px-6 py-24" id="servicos"><div className="mb-16 text-center"><p className="mb-4 text-sm font-bold uppercase tracking-widest text-primary">O que entregamos</p><h2 className="text-4xl font-bold tracking-tight md:text-5xl">Nossos Pilares de Solução</h2></div><div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">{services.map(([icon,title,description]) => <article key={title} className="group rounded-xl border border-border-dark bg-surface-dark/30 p-8 transition-all hover:border-primary/50 hover:bg-surface-dark/80"><Icon name={icon} className="mb-6 size-10 text-primary transition-transform group-hover:scale-110" /><h3 className="mb-3 text-xl font-bold">{title}</h3><p className="text-sm leading-relaxed text-slate-400">{description}</p></article>)}</div></section>;
}
