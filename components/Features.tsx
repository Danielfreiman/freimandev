import Icon from "./Icon";

const features = [
  ["brush", "Design Personalizado", "Interfaces exclusivas desenhadas para a identidade da sua marca."],
  ["search_check", "SEO", "Otimização técnica para facilitar o rastreamento e melhorar sua visibilidade no Google."],
  ["support_agent", "Suporte", "Acompanhamento contínuo e suporte técnico especializado."],
  ["terminal", "Tecnologia", "Tecnologias modernas para criar sites rápidos, seguros e escaláveis."],
];

export default function Features() {
  return <section className="mx-auto max-w-[1200px] px-6 py-24" id="diferenciais"><div className="mb-16 text-center"><h2 className="mb-4 text-3xl font-bold md:text-4xl">Por que Escolher a Freiman Dev?</h2><div className="mx-auto h-1 w-20 bg-accent" /></div><div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">{features.map(([icon,title,description]) => <article key={title} className="flex flex-col items-center space-y-4 p-6 text-center"><div className="flex size-16 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary"><Icon name={icon} className="size-8" /></div><h3 className="text-lg font-bold">{title}</h3><p className="text-sm text-slate-400">{description}</p></article>)}</div></section>;
}
