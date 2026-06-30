import React from 'react';

const Services: React.FC = () => {
  return (
    <section className="py-24 px-6 max-w-[1200px] mx-auto" id="servicos">
      <div className="text-center mb-16">
        <h2 className="text-primary font-bold tracking-widest text-sm uppercase mb-4">O que entregamos</h2>
        <h3 className="text-4xl md:text-5xl font-bold tracking-tight">Nossos Pilares de Solução</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ServiceCard 
            icon="ads_click" 
            title="Landing Pages" 
            description="Focadas em converter visitantes em clientes com layouts de alta performance." 
        />
        <ServiceCard 
            icon="shopping_bag" 
            title="E-commerce" 
            description="Plataformas de vendas robustas e seguras para escalar o seu faturamento online." 
        />
        <ServiceCard 
            icon="business" 
            title="Institutional" 
            description="Sua autoridade digital refletida em um site profissional e institucional moderno." 
        />
        <ServiceCard 
            icon="newspaper" 
            title="Blogs" 
            description="Gestão de conteúdo com tecnologia otimizada para SEO e leitura fluida." 
        />
      </div>
    </section>
  );
};

interface ServiceCardProps {
    icon: string;
    title: string;
    description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description }) => (
    <div className="group p-8 rounded-xl border border-border-dark bg-surface-dark/30 hover:bg-surface-dark/80 hover:border-primary/50 transition-all duration-300">
      <span className="material-symbols-outlined text-4xl text-primary mb-6 group-hover:scale-110 transition-transform inline-block">{icon}</span>
      <h4 className="text-xl font-bold mb-3">{title}</h4>
      <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
    </div>
);

export default Services;