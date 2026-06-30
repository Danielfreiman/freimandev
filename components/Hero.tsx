import Icon from "./Icon";

export default function Hero() {
  return (
    <section className="grid-pattern relative flex min-h-screen flex-col items-center justify-center px-6 pt-20">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-background-dark/50 to-background-dark" />
      <div className="relative z-10 max-w-[960px] space-y-8 text-center">
        <p className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary"><span className="size-2 animate-pulse rounded-full bg-primary" />Soluções Web Sob Medida</p>
        <h1 className="text-5xl font-black leading-[1.1] tracking-tight md:text-7xl">Freiman Dev:<br /><span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">Presença Digital que Converte e Impressiona</span></h1>
        <p className="mx-auto max-w-2xl text-lg font-light leading-relaxed text-slate-400 md:text-xl">Desenvolvemos soluções web personalizadas com foco em alta performance, design estratégico e resultados para o seu negócio.</p>
        <a className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-10 py-4 text-lg font-bold text-background-dark shadow-xl shadow-accent/20 transition-transform hover:scale-105 sm:w-auto" href="https://wa.me/5522998183416?text=Olá%2C%20gostaria%20de%20solicitar%20um%20orçamento." target="_blank" rel="noopener noreferrer"><Icon name="chat" />Fale Conosco e Peça seu Orçamento</a>
      </div>
    </section>
  );
}
