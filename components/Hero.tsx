import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-20 grid-pattern">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background-dark/50 to-background-dark pointer-events-none"></div>
      <div className="relative z-10 max-w-[960px] text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Soluções Web Sob Medida
        </div>
        <h1 className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tight">
          Freiman Dev: <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
            Presença Digital que Converte e Impressiona
          </span>
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
          Desenvolvemos soluções web personalizadas com foco em alta performance, design disruptivo e resultados estratégicos para o seu negócio.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            className="w-full sm:w-auto px-10 py-4 bg-accent text-background-dark font-bold rounded-lg text-lg hover:scale-105 transition-transform shadow-xl shadow-accent/20 flex items-center justify-center gap-2" 
            href="https://wa.me/5522998183416"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="material-symbols-outlined">chat</span>
            Fale Conosco e Peça seu Orçamento
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;