import Icon from "./Icon";

const whatsapp = "https://wa.me/5522998183416?text=Olá%2C%20gostaria%20de%20solicitar%20um%20orçamento.";

export default function Contact() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20 lg:py-24" id="contato">
      <div className="mx-auto max-w-[1180px] rounded-[32px] border border-white/10 bg-[linear-gradient(135deg,rgba(182,243,107,0.1),rgba(255,255,255,0.03))] p-8 sm:p-10 lg:p-12">
        <div className="grid items-end gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">Vamos trabalhar juntos</p>
            <h2 className="mt-5 max-w-4xl text-balance text-4xl font-medium leading-[1.02] tracking-[-0.055em] text-white sm:text-6xl">
              Comece com o objetivo. A gente transforma em experiência digital.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-400">
              Diga qual resultado você precisa e vamos responder com um plano claro para seu projeto.
            </p>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-background-dark/70 p-6 lg:text-right">
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-accent px-5 py-4 text-sm font-bold text-background-dark transition-colors hover:bg-white sm:w-auto sm:px-7">
              <Icon name="chat" className="size-5" /> Agendar briefing <span aria-hidden="true">↗</span>
            </a>
            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-slate-500">Resposta em até 24 horas úteis.</p>
          </div>
        </div>
      </div>
    </section>
  );
}