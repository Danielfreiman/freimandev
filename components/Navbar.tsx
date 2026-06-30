"use client";

import { useState } from "react";
import Icon from "./Icon";

const links = [
  ["Sobre", "#sobre"],
  ["Serviços", "#servicos"],
  ["Projetos", "#portfolio"],
  ["Diferenciais", "#diferenciais"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav aria-label="Navegação principal" className="glass mx-auto max-w-[1180px] rounded-2xl">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          <a href="#" aria-label="Freiman Dev — início" className="group flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-xl bg-accent text-background-dark transition-transform group-hover:rotate-6">
              <Icon name="terminal" className="size-5" />
            </span>
            <span className="text-base font-bold tracking-[-0.04em]">FREIMAN<span className="text-accent">/DEV</span></span>
          </a>

          <div className="hidden items-center gap-1 rounded-xl border border-white/5 bg-black/20 p-1 md:flex">
            {links.map(([label, href]) => (
              <a key={href} href={href} className="rounded-lg px-4 py-2 text-xs font-medium text-slate-400 transition-colors hover:bg-white/5 hover:text-white">
                {label}
              </a>
            ))}
          </div>

          <a className="hidden items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs font-bold text-background-dark transition hover:bg-accent md:flex" href="https://wa.me/5522998183416?text=Olá%2C%20gostaria%20de%20solicitar%20um%20orçamento." target="_blank" rel="noopener noreferrer">
            Iniciar projeto <span aria-hidden="true">↗</span>
          </a>

          <button className="rounded-xl border border-white/10 p-2 text-white md:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="menu-mobile" aria-label={open ? "Fechar menu" : "Abrir menu"}>
            <Icon name={open ? "close" : "menu"} className="size-6" />
          </button>
        </div>

        {open && (
          <div id="menu-mobile" className="border-t border-white/10 p-4 md:hidden">
            <div className="flex flex-col gap-1">
              {links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-sm text-slate-300 hover:bg-white/5">{label}</a>)}
              <a href="#contato" onClick={() => setOpen(false)} className="mt-2 rounded-xl bg-accent px-4 py-3 text-center text-sm font-bold text-background-dark">Iniciar projeto</a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
