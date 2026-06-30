import React from 'react';

const About: React.FC = () => {
  return (
    <section className="py-24 px-6 border-y border-border-dark/50" id="sobre">
      <div className="max-w-[1200px] mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-8">Sua Visão, Nossa Expertise em Desenvolvimento Web</h2>
        <p className="text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed">
          Na Freiman Dev, transformamos objetivos de negócio em experiências digitais impecáveis. Unimos tecnologia de ponta e design focado no usuário para criar sites que não são apenas bonitos, mas máquinas de conversão eficientes e escaláveis.
        </p>
      </div>
    </section>
  );
};

export default About;