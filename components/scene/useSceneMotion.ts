"use client";

import { type RefObject, useEffect, useState } from "react";

/** True when the user asked the OS to reduce motion. Reacts to live changes. */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return reduced;
}

type ProgressOptions = {
  /** Skip all work and report the finished state. */
  disabled?: boolean;
};

/**
 * Scroll progress (0 → 1) of an element travelling through the viewport.
 *
 * Writes the value straight onto a CSS custom property instead of re-rendering,
 * so scrolling never re-runs React. Work is rAF-throttled and completely
 * suspended while the element is off-screen.
 */
export function useScrollProgress<T extends HTMLElement>(
  ref: RefObject<T | null>,
  onProgress: (progress: number) => void,
  { disabled = false }: ProgressOptions = {},
): void {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (disabled) {
      onProgress(1);
      return;
    }

    let frame = 0;
    let visible = false;

    const measure = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      const raw = travel > 0 ? -rect.top / travel : 0;
      onProgress(Math.min(1, Math.max(0, raw)));
    };

    const schedule = () => {
      if (frame || !visible) return;
      frame = window.requestAnimationFrame(measure);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        visible = entry.isIntersecting;
        if (visible) schedule();
      },
      { rootMargin: "10% 0px" },
    );

    observer.observe(el);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    measure();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [ref, onProgress, disabled]);
}

/**
 * Normalised pointer position (-1 → 1 on both axes) for the parallax tilt.
 * Ignored on coarse pointers and when motion is reduced.
 */
export function usePointerTilt(
  onTilt: (x: number, y: number) => void,
  disabled = false,
): void {
  useEffect(() => {
    if (disabled) {
      onTilt(0, 0);
      return;
    }
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    let frame = 0;
    let nextX = 0;
    let nextY = 0;

    const apply = () => {
      frame = 0;
      onTilt(nextX, nextY);
    };

    const handleMove = (event: PointerEvent) => {
      nextX = (event.clientX / window.innerWidth) * 2 - 1;
      nextY = (event.clientY / window.innerHeight) * 2 - 1;
      if (!frame) frame = window.requestAnimationFrame(apply);
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handleMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [onTilt, disabled]);
}
