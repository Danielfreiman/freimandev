"use client";

import { useEffect, useState } from "react";
import { NAV_LINKS, whatsappUrl } from "@/data/brand";
import { Logo } from "@/components/ui/Logo";
import styles from "./Header.module.css";

export function Header() {
  const [condensed, setCondensed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      setCondensed(window.scrollY > 24);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(read);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    read();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header
      className={`${styles.header} ${condensed ? styles.condensed : ""}`}
    >
      <div className={`shell ${styles.inner}`}>
        <a href="#topo" className={styles.brand}>
          <Logo />
        </a>

        <nav className={styles.nav} aria-label="Navegação principal">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </a>
          ))}
        </nav>

        <a
          className={styles.cta}
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
        >
          Enviar demanda
          <span aria-hidden="true">↗</span>
        </a>

        <button
          type="button"
          className={styles.toggle}
          aria-expanded={menuOpen}
          aria-controls="menu-mobile"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "Fechar" : "Menu"}
        </button>
      </div>

      <div
        id="menu-mobile"
        className={`${styles.panel} ${menuOpen ? styles.panelOpen : ""}`}
        hidden={!menuOpen}
      >
        <nav className={styles.panelNav} aria-label="Navegação mobile">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={styles.panelLink}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            className={styles.panelLink}
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
          >
            Enviar demanda ↗
          </a>
        </nav>
      </div>
    </header>
  );
}
