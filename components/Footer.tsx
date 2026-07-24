import Icon from "./Icon";

const links = [["Sobre", "#sobre"], ["Serviços", "#servicos"], ["Projetos", "#portfolio"], ["Contato", "#contato"]];

export default function Footer() {
  return (
    <footer className="px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-[1180px]">
        <div className="flex flex-col justify-between gap-8 border-b border-white/[0.07] pb-10 md:flex-row md:items-center">
          <a href="#" aria-label="Freiman Dev — início" className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent">
              <Icon name="terminal" className="size-5" />
            </span>
            <span className="text-base font-bold tracking-[-0.04em] text-white">
              FREIMAN<span className="text-accent">/DEV</span>
            </span>
          </a>
          <nav aria-label="Navegação do rodapé" className="flex flex-wrap gap-x-6 gap-y-3">
            {links.map(([label, href]) => (
              <a key={href} href={href} className="text-xs uppercase tracking-[0.2em] text-slate-500 transition hover:text-white">
                {label}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex flex-col justify-between gap-3 pt-6 text-[10px] uppercase tracking-[0.14em] text-slate-600 sm:flex-row">
          <p>© {new Date().getFullYear()} Freiman Dev</p>
          <p>Design · Código · Estratégia</p>
        </div>
      </div>
    </footer>
  );
}
