"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { PROJECTS } from "@/data/projects";
import {
  useReducedMotion,
  usePointerTilt,
} from "@/components/scene/useSceneMotion";
import styles from "./SelectedWork.module.css";

/** Real hostname of the delivered site, shown in the window's address bar. */
function hostOf(href: string): string {
  return href.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export function SelectedWork() {
  const [activeSlug, setActiveSlug] = useState(PROJECTS[0]?.slug ?? "");
  const layoutRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const handleTilt = useCallback((x: number, y: number) => {
    const layout = layoutRef.current;
    if (!layout) return;
    layout.style.setProperty("--mx", x.toFixed(3));
    layout.style.setProperty("--my", y.toFixed(3));
  }, []);

  usePointerTilt(handleTilt, reduced);

  return (
    <section id="projetos" className={styles.section}>
      <div className={`shell ${styles.head}`}>
        <p className="eyebrow">Projetos entregues</p>
        <h2 className={styles.title}>Sites que já estão no ar.</h2>
      </div>

      <div ref={layoutRef} className={`shell ${styles.layout}`}>
        <ol className={styles.list}>
          {PROJECTS.map((project) => {
            const isActive = project.slug === activeSlug;
            const select = () => setActiveSlug(project.slug);

            return (
              <li
                key={project.slug}
                className={`${styles.item} ${isActive ? styles.itemOn : ""}`}
              >
                <a
                  className={styles.trigger}
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={select}
                  onFocus={select}
                >
                  <span className={styles.index}>{project.index}</span>
                  <span className={styles.name}>{project.name}</span>
                  <span className={styles.category}>{project.category}</span>
                  <span className={styles.arrow} aria-hidden="true">
                    ↗
                  </span>
                </a>

                {/* One set of images: framed on the right at desktop widths,
                    inline under each project on small screens. */}
                <figure
                  className={`${styles.preview} ${
                    isActive ? styles.previewOn : ""
                  }`}
                >
                  <span className={styles.plate} aria-hidden="true" />
                  <span className={styles.plate} aria-hidden="true" />

                  <div className={styles.window}>
                    <div className={styles.bar}>
                      <span className={styles.dots} aria-hidden="true">
                        <span />
                        <span />
                        <span />
                      </span>
                      <span className={styles.url}>
                        {hostOf(project.href)}
                      </span>
                      <span className={styles.live}>
                        <span className={styles.dot} aria-hidden="true" />
                        no ar
                      </span>
                    </div>

                    <div className={styles.screen}>
                      <Image
                        src={project.cover}
                        alt={`Página inicial do projeto ${project.name}`}
                        width={project.width}
                        height={project.height}
                        sizes="(max-width: 900px) 92vw, 52vw"
                        className={styles.cover}
                      />
                    </div>
                  </div>
                </figure>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
