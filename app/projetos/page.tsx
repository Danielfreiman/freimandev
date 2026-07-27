import type { Metadata } from "next";
import Image from "next/image";
import { PUBLISHED_PROJECTS, hostOf } from "@/data/projects";
import { whatsappUrl } from "@/data/brand";
import { Action } from "@/components/ui/Action";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Todos os projetos",
  description:
    "Sites, e-commerces, páginas institucionais e plataformas de conteúdo entregues pela Freiman Dev — todos no ar.",
  alternates: { canonical: "/projetos" },
  openGraph: {
    title: "Todos os projetos | Freiman Dev",
    description:
      "Sites, e-commerces, páginas institucionais e plataformas de conteúdo entregues pela Freiman Dev — todos no ar.",
    url: "/projetos",
  },
};

export default function ProjetosPage() {
  return (
    <div className={styles.page}>
      <header className={`shell ${styles.head}`}>
        <p className="eyebrow">Portfólio completo</p>
        <h1 className={styles.title}>Todos os projetos.</h1>
        <p className={styles.lead}>
          {PUBLISHED_PROJECTS.length} sites entregues e no ar. Cada um abre no
          endereço real.
        </p>
      </header>

      <ol className={`shell ${styles.grid}`}>
        {PUBLISHED_PROJECTS.map((project, i) => (
          <li key={project.slug} className={styles.item}>
            <a
              className={styles.card}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={styles.window}>
                <span className={styles.bar}>
                  <span className={styles.dots} aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </span>
                  <span className={styles.url}>{hostOf(project.href)}</span>
                  <span className={styles.live}>
                    <span className={styles.dot} aria-hidden="true" />
                    no ar
                  </span>
                </span>
                <span className={styles.screen}>
                  <Image
                    src={project.cover}
                    alt={`Página inicial do projeto ${project.name}`}
                    width={project.width}
                    height={project.height}
                    sizes="(max-width: 900px) 92vw, 46vw"
                    className={styles.cover}
                    loading={i < 2 ? "eager" : "lazy"}
                  />
                </span>
              </span>

              <span className={styles.meta}>
                <span className={styles.index} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={styles.name}>{project.name}</span>
                <span className={styles.category}>{project.category}</span>
                <span className={styles.arrow} aria-hidden="true">
                  ↗
                </span>
              </span>

              <span className={styles.summary}>{project.summary}</span>

              {/* Same vocabulary as the services section on the homepage. */}
              <span className={styles.tags}>
                {project.services.map((service) => (
                  <span key={service} className={styles.tag}>
                    {service}
                  </span>
                ))}
              </span>
            </a>
          </li>
        ))}
      </ol>

      <section className={`shell ${styles.cta}`}>
        <h2 className={styles.ctaTitle}>
          O próximo pode ser o seu.
        </h2>
        <Action href={whatsappUrl()} external>
          Enviar uma demanda
        </Action>
      </section>
    </div>
  );
}
