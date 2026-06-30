import Icon from "./Icon";

const whatsapp = "https://wa.me/5522998183416?text=Olá%2C%20gostaria%20de%20solicitar%20um%20orçamento.";

export default function Contact() {
  return (
    <section className="px-3 pb-8 pt-12 sm:px-6 lg:pt-20" id="contato">
      <div className="aurora relative mx-auto max-w-[1180px] overflow-hidden rounded-[26px] border border-white/10 bg-surface-dark px-5 py-12 sm:rounded-[32px] sm:px-12 sm:py-14 lg:px-16 lg:py-20">
        <div className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full border border-accent/10" />
        <div className="pointer-events-none absolute -right-10 -top-10 size-52 rounded-full border border-primary/20" />
        <div className="relative grid items-end gap-12 lg:grid-cols-[1.2fr_.8fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.2em] text-accent">Vamos trabalhar juntos</p>
            <h2 className="mt-5 max-w-3xl text-balance text-3xl font-medium leading-[1.03] tracking-[-.05em] text-white min-[360px]:text-4xl sm:text-6xl">Sua próxima grande ideia merece sair do papel.</h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-400">Conte um pouco sobre o que você precisa. Em até 24 horas, retornamos com os próximos passos para transformar a ideia em resultado.</p>
          </div>
          <div className="lg:text-right">
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="shine inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-accent px-4 py-5 text-center text-sm font-bold text-background-dark transition-transform hover:-translate-y-1 sm:w-auto sm:gap-3 sm:px-7">
              <Icon name="chat" className="size-5" /> Conversar no WhatsApp <span aria-hidden="true">↗</span>
            </a>
            <div className="mt-5 flex items-center justify-center gap-2 text-[10px] uppercase tracking-wider text-slate-500 lg:justify-end"><span className="size-1.5 rounded-full bg-accent" />Resposta em até 24 horas</div>
          </div>
        </div>
      </div>
    </section>
  );
}
