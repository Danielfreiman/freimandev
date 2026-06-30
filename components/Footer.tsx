import Icon from "./Icon";

export default function Footer() {
  return (
    <footer className="border-t border-border-dark bg-background-dark px-6 pb-8 pt-16">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-12 flex items-center justify-center"><a href="#" aria-label="Freiman Dev — início" className="flex items-center gap-3"><span className="flex size-8 items-center justify-center rounded-lg bg-primary"><Icon name="terminal" className="size-5 text-background-dark" /></span><span className="text-xl font-bold uppercase tracking-tighter">Freiman<span className="text-primary">.Dev</span></span></a></div>
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border-dark/30 pt-8 text-[10px] font-medium uppercase tracking-widest text-slate-500 md:flex-row"><p>© {new Date().getFullYear()} Freiman Dev. Excelência em Desenvolvimento Web.</p></div>
      </div>
    </footer>
  );
}
