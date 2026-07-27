"use client";

import { useEffect, useState } from "react";
import styles from "./SceneBoot.module.css";

const SESSION_KEY = "fd:booted";
/** Hard cap — the intro never outlives the assets it is waiting on. */
const MAX_MS = 1400;

/**
 * Short entry state. It waits on real work (fonts + window load), skips itself
 * on repeat visits and when motion is reduced, and can never block the page:
 * the content is already in the DOM behind it and this overlay only fades.
 */
export function SceneBoot() {
  const [done, setDone] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem(SESSION_KEY) === "1";
    if (reduced || seen) return;

    setDone(false);
    let timer = 0;

    const finish = () => {
      window.clearTimeout(timer);
      sessionStorage.setItem(SESSION_KEY, "1");
      setDone(true);
    };

    timer = window.setTimeout(finish, MAX_MS);

    const ready =
      "fonts" in document
        ? document.fonts.ready
        : Promise.resolve<unknown>(null);

    // Resolve as soon as the real work is done, and never fail closed.
    ready.then(finish).catch(finish);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div
      className={`${styles.boot} ${done ? styles.done : ""}`}
      aria-hidden="true"
      // Purely presentational; screen readers get the page itself immediately.
      inert={done ? true : undefined}
    >
      <p className={styles.label}>Preparando o ambiente</p>
      <span className={styles.track}>
        <span className={styles.bar} />
      </span>
    </div>
  );
}
