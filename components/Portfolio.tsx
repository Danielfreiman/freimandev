import React from 'react';

const Portfolio: React.FC = () => {
  const projects = [
    {
      title: "YAGE - Ethnobotanical Exploration",
      category: "Conteúdo / Blog",
      imageUrl: "/assets/projects/yage-home.png",
      colSpan: "md:col-span-1"
    },
    {
      title: "Maya Ethnobotanicals",
      category: "E-commerce Global",
      imageUrl: "/assets/projects/maya-home.png",
      colSpan: "md:col-span-1"
    },
    {
      title: "Medicina Sagrada",
      category: "E-commerce de Nicho",
      imageUrl: "/assets/projects/medicina-home.png",
      colSpan: "md:col-span-1"
    },
    {
      title: "Sacred Connection",
      category: "E-commerce Internacional",
      imageUrl: "/assets/projects/sacred-home.png",
      colSpan: "md:col-span-1"
    },
    {
      title: "Sítio Flor das Águas",
      category: "Turismo & Hospedagem",
      imageUrl: "/assets/projects/sitio-home.png",
      colSpan: "md:col-span-2"
    }
  ];

  return (
    <section className="py-24 px-6 bg-surface-dark/10" id="portfolio">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4">Projetos que Geram Resultados</h2>
          <p className="text-slate-400">Excelência técnica e visual aplicada em cada entrega.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              imageUrl={project.imageUrl}
              category={project.category}
              title={project.title}
              className={project.colSpan}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface ProjectCardProps {
  imageUrl: string;
  category: string;
  title: string;
  className?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ imageUrl, category, title, className }) => (
  <div className={`group relative overflow-hidden rounded-2xl bg-surface-dark border border-border-dark aspect-video ${className || ''}`}>
    <div
      className="absolute inset-0 bg-cover bg-top transition-transform duration-700 group-hover:scale-105"
      style={{ backgroundImage: `url('${imageUrl}')` }}
    ></div>
    <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-8">
      <span className="text-accent text-xs font-bold uppercase mb-2 tracking-widest">{category}</span>
      <h4 className="text-2xl font-bold">{title}</h4>
    </div>
  </div>
);

export default Portfolio;