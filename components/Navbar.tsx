"use client";

import { useState } from "react";
import Icon from "./Icon";

const links = [
  ["Projetos", "#portfolio"],
  ["Sobre", "#sobre"],
  ["Serviços", "#servicos"],
  ["Contato", "#contato"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#070b13]/92 backdrop-blur-xl">
      <nav aria-label="Navegação principal" className="mx-auto max-w-[1180px] px-4 sm:px-6">
        <div className="flex h-16 min-w-0 items-center justify-between gap-3">
          <a href="#" aria-label="Freiman Dev — início" className="group flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/35 bg-primary/10 text-primary">
              <Icon name="terminal" className="size-4" />
            </span>
            <span className="text-sm font-bold tracking-[-0.04em] text-white">
              FREIMAN<span className="ml-1 text-accent">/DEV</span>
            </span>
          </a>

          <div className="hidden items-center gap-6 md:flex">
            {links.map(([label, href]) => (
              <a key={href} href={href} className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400 transition-colors hover:text-white">
                {label}
              </a>
            ))}
          </div>

          <a
            className="hidden items-center gap-2 rounded-full border border-white/15 bg-[#111620] px-4 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-white transition-colors hover:border-accent hover:text-accent md:flex"
            href="https://wa.me/5522998183416?text=Ol%C3%A1%2C%20gostaria%20de%20falar%20sobre%20um%20site."
            target="_blank"
            rel="noopener noreferrer"
          >
            Brief <span aria-hidden="true">↗</span>
          </a>

          <button
            className="shrink-0 rounded-full border border-white/15 p-2 text-white md:hidden"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
          >
            <Icon name={open ? "close" : "menu"} className="size-5" />
          </button>
        </div>

        {open && (
          <div id="menu-mobile" className="border-t border-white/10 py-3 md:hidden">
            <div className="flex flex-col">
              {links.map(([label, href]) => (
                <a key={href} href={href} onClick={() => setOpen(false)} className="border-b border-white/[0.06] px-1 py-3 text-sm text-slate-300">
                  {label}
                </a>
              ))}
              <a
                href="https://wa.me/5522998183416?text=Ol%C3%A1%2C%20gostaria%20de%20falar%20sobre%20um%20site."
                className="mt-3 rounded-full bg-accent px-4 py-3 text-center text-sm font-bold text-black"
              >
                Brief
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
