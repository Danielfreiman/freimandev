import React from 'react';

const Contact: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-surface-dark/20 border-t border-border-dark/30" id="contato">
      <div className="max-w-[1000px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">Pronto para Levar Seu Negócio ao Próximo Nível?</h2>
          <p className="text-slate-400 text-lg">
            Entre em contato conosco hoje mesmo. Estamos prontos para entender seu projeto e oferecer a melhor solução digital.
          </p>
          <div className="flex flex-col gap-4 text-sm text-slate-300">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">check_circle</span>
              Consultoria estratégica gratuita
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">check_circle</span>
              Orçamento detalhado em 24h
            </div>
          </div>

          {/* Direct WhatsApp Action for Left Side */}
          <div className="pt-4">
            <a
              href="https://wa.me/5522998183416"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-accent font-bold hover:underline underline-offset-4"
            >
              <span className="material-symbols-outlined">chat</span>
              Chamar no WhatsApp Agora
            </a>
          </div>
        </div>

        <div className="bg-surface-dark border border-border-dark p-8 rounded-2xl shadow-2xl">
          <div className="space-y-6 text-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">Vamos conversar?</h3>
              <p className="text-slate-400">Fale diretamente conosco pelo WhatsApp.</p>
            </div>

            <a
              href="https://wa.me/5522998183416"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-accent text-background-dark font-bold py-4 rounded-lg hover:brightness-110 transition-all text-lg shadow-lg shadow-accent/20 flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">chat</span>
              Conversar no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;