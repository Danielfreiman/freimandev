import { BRAND, NAV_LINKS, WHATSAPP_DISPLAY, whatsappUrl } from "@/data/brand";
import { Logo } from "@/components/ui/Logo";
import styles from "./Footer.module.css";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`shell ${styles.inner}`}>
        <div className={styles.brand}>
          <a href="#topo" className={styles.brandLink}>
            <Logo label="Freiman Dev — voltar ao topo" />
          </a>
          <p className={styles.tagline}>{BRAND.tagline}</p>
        </div>

        <nav className={styles.nav} aria-label="Navegação do rodapé">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className={styles.contact}>
          <a className={styles.budget} href="#orcamento">
            Montar orçamento
            <span aria-hidden="true">→</span>
          </a>
          <a
            className={styles.whatsapp}
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
          >
            {WHATSAPP_DISPLAY}
            <span aria-hidden="true">↗</span>
          </a>
          <p className={styles.note}>{BRAND.responseTime}</p>
        </div>
      </div>

      <div className={`shell ${styles.base}`}>
        <p>
          © {year} {BRAND.name}
        </p>
      </div>
    </footer>
  );
}
