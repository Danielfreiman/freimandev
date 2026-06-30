import React from 'react';

const Features: React.FC = () => {
  return (
    <section className="py-24 px-6 max-w-[1200px] mx-auto" id="diferenciais">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Por que Escolher a Freiman Dev?</h2>
        <div className="w-20 h-1 bg-accent mx-auto"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <FeatureItem 
            icon="brush"
            title="Custom Design"
            description="Interfaces exclusivas desenhadas do zero para a sua marca."
        />
        <FeatureItem 
            icon="search_check"
            title="SEO"
            description="Otimização técnica para garantir as melhores posições no Google."
        />
        <FeatureItem 
            icon="support_agent"
            title="Support"
            description="Acompanhamento contínuo e suporte técnico especializado."
        />
        <FeatureItem 
            icon="terminal"
            title="Tech"
            description="Uso das tecnologias mais modernas para sites ultra velozes."
        />
      </div>
    </section>
  );
};

interface FeatureItemProps {
    icon: string;
    title: string;
    description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, title, description }) => (
    <div className="flex flex-col items-center text-center p-6 space-y-4">
      <div className="size-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
        <span className="material-symbols-outlined text-3xl">{icon}</span>
      </div>
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-slate-400 text-sm">{description}</p>
    </div>
);

export default Features;