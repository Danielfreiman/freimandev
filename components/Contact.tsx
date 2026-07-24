import Icon from "./Icon";

const whatsapp = "https://wa.me/5522998183416?text=Olá%2C%20gostaria%20de%20solicitar%20um%20orçamento.";

export default function Contact() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20 lg:py-24" id="contato">
      <div className="mx-auto max-w-[1180px] border-y border-white/15 py-10 sm:py-14 lg:py-16">
        <div className="grid items-end gap-10 lg:grid-cols-[1.25fr_.75fr] lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.2em] text-accent">Vamos trabalhar juntos</p>
            <h2 className="mt-5 max-w-4xl text-balance text-4xl font-medium leading-[1.02] tracking-[-.055em] text-white sm:text-6xl">Sua próxima ideia merece uma presença à altura.</h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-400">Conte o que você precisa. Em até 24 horas, retornamos com os próximos passos para transformar a ideia em resultado.</p>
          </div>
          <div className="lg:text-right">
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex w-full items-center justify-center gap-3 rounded-lg bg-accent px-5 py-4 text-sm font-bold text-background-dark transition-colors hover:bg-white sm:w-auto sm:px-7">
              <Icon name="chat" className="size-5" /> Conversar no WhatsApp <span aria-hidden="true">↗</span>
            </a>
            <p className="mt-4 text-xs text-slate-500">Resposta em até 24 horas úteis.</p>
          </div>
        </div>
      </div>
    </section>
  );
}