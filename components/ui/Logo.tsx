import { BRAND } from "@/data/brand";
import styles from "./Logo.module.css";

/**
 * The real Freiman Dev mark: the prompt glyph from the live icon.svg, plus the
 * two-part wordmark. Proportions and geometry are untouched.
 */
export function Logo({ label = "Freiman Dev — início" }: { label?: string }) {
  return (
    <span className={styles.logo}>
      <span className={styles.glyph} aria-hidden="true">
        <svg viewBox="0 0 64 64" fill="currentColor" focusable="false">
          <path d="M15 19l18 13-18 13v-9l6-4-6-4v-9zm21 20h14v7H36v-7z" />
        </svg>
      </span>
      <span className={styles.wordmark}>
        {BRAND.wordmark.head}
        <span className={styles.tail}>{BRAND.wordmark.tail}</span>
      </span>
      <span className={styles.srOnly}>{label}</span>
    </span>
  );
}
