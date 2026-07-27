"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./TypeIn.module.css";

type TypeInProps = {
  text: string;
  delay?: number;
  speed?: number;
};

/**
 * A short, non-blocking terminal cue for secondary labels. The final text
 * always reserves its complete width, so typing never shifts nearby content.
 */
export function TypeIn({ text, delay = 100, speed = 44 }: TypeInProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const [visibleText, setVisibleText] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const timers: number[] = [];
    const characters = Array.from(text);
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const finishImmediately = () => {
      timers.push(
        window.setTimeout(() => {
          setVisibleText(text);
          setDone(true);
        }, 0),
      );
    };

    if (reducedMotion) {
      finishImmediately();
      return () => timers.forEach(window.clearTimeout);
    }

    const start = () => {
      characters.forEach((_, index) => {
        timers.push(
          window.setTimeout(() => {
            setVisibleText(characters.slice(0, index + 1).join(""));
          }, delay + index * speed),
        );
      });
      timers.push(
        window.setTimeout(
          () => setDone(true),
          delay + characters.length * speed + 220,
        ),
      );
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        observer.disconnect();
        start();
      },
      { threshold: 0.65 },
    );

    observer.observe(root);
    return () => {
      observer.disconnect();
      timers.forEach(window.clearTimeout);
    };
  }, [delay, speed, text]);

  return (
    <span ref={rootRef} className={styles.root}>
      <span className={styles.measure} aria-hidden="true">
        {text}
      </span>
      <span className={styles.typed} aria-hidden="true">
        {visibleText}
        <span className={`${styles.cursor} ${done ? styles.cursorDone : ""}`} />
      </span>
      <span className={styles.srOnly}>{text}</span>
    </span>
  );
}
