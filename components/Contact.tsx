import Icon from "./Icon";

const whatsapp = "https://wa.me/5522998183416?text=Olá%2C%20gostaria%20de%20solicitar%20um%20orçamento.";

export default function Contact() {
  return (
    <section className="border-t border-border-dark/30 bg-surface-dark/20 px-6 py-24" id="contato">
      <div className="mx-auto grid max-w-[1000px] grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <div className="space-y-6">
          <h2 className="text-4xl font-black leading-tight tracking-tight md:text-5xl">Pronto para Levar Seu Negócio ao Próximo Nível?</h2>
          <p className="text-lg text-slate-400">Entre em contato hoje mesmo. Estamos prontos para entender seu projeto e oferecer a melhor solução digital.</p>
          <ul className="flex flex-col gap-4 text-sm text-slate-300"><li className="flex items-center gap-3"><Icon name="check_circle" className="size-5 text-primary" />Consultoria estratégica gratuita</li><li className="flex items-center gap-3"><Icon name="check_circle" className="size-5 text-primary" />Orçamento detalhado em 24h</li></ul>
          <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-bold text-accent hover:underline"><Icon name="chat" className="size-5" />Chamar no WhatsApp Agora</a>
        </div>
        <div className="rounded-2xl border border-border-dark bg-surface-dark p-8 text-center shadow-2xl"><h3 className="mb-2 text-2xl font-bold">Vamos conversar?</h3><p className="mb-6 text-slate-400">Fale diretamente conosco pelo WhatsApp.</p><a href={whatsapp} target="_blank" rel="noopener noreferrer" className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent py-4 text-lg font-bold text-background-dark transition-all hover:brightness-110"><Icon name="chat" />Conversar no WhatsApp</a></div>
      </div>
    </section>
  );
}
