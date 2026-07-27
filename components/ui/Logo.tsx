"use client";

import { useEffect, useState } from "react";
import { BRAND } from "@/data/brand";
import styles from "./Logo.module.css";

const INITIAL_WORDMARK = "FD";
const FINAL_WORDMARK = BRAND.name;
const TYPE_START_MS = 980;
const KEYSTROKE_MS = 82;

/**
 * The prompt glyph remains fixed while the wordmark performs one restrained
 * terminal sequence on page load: FD → F → Freiman Dev.
 */
export function Logo({ label = "Freiman Dev — início" }: { label?: string }) {
  const [wordmark, setWordmark] = useState(INITIAL_WORDMARK);
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const timers: number[] = [];
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      timers.push(
        window.setTimeout(() => {
          setWordmark(FINAL_WORDMARK);
          setTyping(false);
        }, 0),
      );
      return () => timers.forEach(window.clearTimeout);
    }

    timers.push(
      window.setTimeout(() => setWordmark("F"), 720),
    );

    const remainder = FINAL_WORDMARK.slice(1);
    remainder.split("").forEach((_, index) => {
      timers.push(
        window.setTimeout(() => {
          setWordmark(`F${remainder.slice(0, index + 1)}`);
        }, TYPE_START_MS + index * KEYSTROKE_MS),
      );
    });

    timers.push(
      window.setTimeout(
        () => setTyping(false),
        TYPE_START_MS + remainder.length * KEYSTROKE_MS + 320,
      ),
    );

    return () => timers.forEach(window.clearTimeout);
  }, []);

  return (
    <span className={styles.logo}>
      <span className={styles.glyph} aria-hidden="true">
        <svg viewBox="0 0 64 64" fill="currentColor" focusable="false">
          <path d="M15 19l18 13-18 13v-9l6-4-6-4v-9zm21 20h14v7H36v-7z" />
        </svg>
      </span>
      <span className={styles.wordmark} aria-hidden="true">
        <span>{wordmark}</span>
        <span
          className={`${styles.cursor} ${typing ? "" : styles.cursorDone}`}
        />
      </span>
      <span className={styles.srOnly}>{label}</span>
    </span>
  );
}
