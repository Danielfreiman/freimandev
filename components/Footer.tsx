import Icon from "./Icon";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-[1180px]">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <a href="#" aria-label="Freiman Dev — início" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent">
              <Icon name="terminal" className="size-5" />
            </span>
            <span className="text-base font-semibold tracking-[0.02em] text-white">
              FREIMAN<span className="text-accent">/DEV</span>
            </span>
          </a>
          <a
            href="https://wa.me/5522998183416?text=Ol%C3%A1%2C%20gostaria%20de%20falar%20sobre%20um%20site."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-white/10 bg-[#111620] px-5 py-3 text-sm font-semibold text-white transition hover:border-accent hover:text-accent"
          >
            Brief rápido
          </a>
        </div>
        <div className="mt-8 flex flex-col gap-2 text-xs uppercase tracking-[0.16em] text-slate-500 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Freiman Dev</p>
          <p>Web design · Portfólio · Identidade digital</p>
        </div>
      </div>
    </footer>
  );
}
