"use client";

import { useEffect, useState } from "react";
import { CAPABILITIES } from "@/data/capabilities";
import { useScene } from "@/components/scene/BuildArc";
import { TypeIn } from "@/components/ui/TypeIn";
import styles from "./Capabilities.module.css";

export function Capabilities() {
  const [activeId, setActiveId] = useState(CAPABILITIES[0]?.id ?? "");
  const { focus } = useScene();
  const active =
    CAPABILITIES.find((item) => item.id === activeId) ?? CAPABILITIES[0];

  useEffect(() => {
    focus(active ?? null);
  }, [active, focus]);

  return (
    <section id="servicos" className={styles.section}>
      <div className={`shell ${styles.inner}`}>
        <header className={styles.head}>
          <p className="eyebrow">
            <TypeIn text="O que entra em execução" />
          </p>
          <h2 className={styles.title}>O que precisa sair do papel?</h2>
        </header>

        <div className={styles.body}>
          <ul className={styles.list}>
            {CAPABILITIES.map((item) => {
              const isActive = item.id === active?.id;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    className={`${styles.item} ${isActive ? styles.itemOn : ""}`}
                    aria-pressed={isActive}
                    aria-describedby="capability-detail"
                    onClick={() => setActiveId(item.id)}
                    onFocus={() => setActiveId(item.id)}
                    onMouseEnter={() => setActiveId(item.id)}
                  >
                    <span className={styles.rule} aria-hidden="true" />
                    <span className={styles.itemLabel}>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <p id="capability-detail" className={styles.detail} aria-live="polite">
            {active?.description}
          </p>
        </div>

      </div>
    </section>
  );
}
