"use client";

import { useState } from "react";
import Icon from "./Icon";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <nav aria-label="Navegação principal" className="fixed top-0 z-50 w-full border-b border-border-dark/30 bg-background-dark/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-[1200px] items-center justify-between px-6">
        <a href="#" aria-label="Freiman Dev — início" className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-lg bg-primary shadow-[0_0_20px_rgba(59,130,246,0.3)]">
            <Icon name="terminal" className="size-6 text-background-dark" />
          </span>
          <span className="text-xl font-bold uppercase tracking-tighter">Freiman<span className="text-primary">.Dev</span></span>
        </a>
        <div className="hidden items-center gap-10 text-sm font-medium md:flex">
          <a className="transition-colors hover:text-primary" href="#sobre">Sobre</a>
          <a className="transition-colors hover:text-primary" href="#servicos">Serviços</a>
          <a className="transition-colors hover:text-primary" href="#portfolio">Portfólio</a>
          <a className="transition-colors hover:text-primary" href="#contato">Contato</a>
        </div>
        <a className="hidden items-center gap-2 rounded-lg bg-accent px-6 py-2.5 text-sm font-bold text-background-dark transition-all hover:brightness-110 md:flex" href="https://wa.me/5522998183416?text=Olá%2C%20gostaria%20de%20solicitar%20um%20orçamento." target="_blank" rel="noopener noreferrer">
          <Icon name="chat" className="size-5" /> Fale Conosco
        </a>
        <button className="rounded p-2 text-slate-100 md:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="menu-mobile" aria-label={open ? "Fechar menu" : "Abrir menu"}>
          <Icon name={open ? "close" : "menu"} className="size-8" />
        </button>
      </div>
      {open && (
        <div id="menu-mobile" className="flex flex-col gap-4 border-b border-border-dark/30 bg-background-dark px-6 py-4 md:hidden">
          <a href="#sobre" onClick={close}>Sobre</a><a href="#servicos" onClick={close}>Serviços</a><a href="#portfolio" onClick={close}>Portfólio</a><a href="#contato" onClick={close}>Contato</a>
          <a className="flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-2.5 text-sm font-bold text-background-dark" href="https://wa.me/5522998183416?text=Olá%2C%20gostaria%20de%20solicitar%20um%20orçamento." target="_blank" rel="noopener noreferrer"><Icon name="chat" className="size-5" /> Fale Conosco</a>
        </div>
      )}
    </nav>
  );
}
