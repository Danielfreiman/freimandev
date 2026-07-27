import type { AnchorHTMLAttributes } from "react";
import styles from "./Action.module.css";

type ActionProps = {
  href: string;
  variant?: "solid" | "line";
  /** Marks an off-site destination so it opens safely and is announced. */
  external?: boolean;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

export function Action({
  href,
  variant = "solid",
  external = false,
  children,
  className,
  ...rest
}: ActionProps) {
  const externalProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <a
      href={href}
      className={`${styles.action} ${styles[variant]} ${className ?? ""}`}
      {...externalProps}
      {...rest}
    >
      <span className={styles.label}>{children}</span>
      {external ? (
        <span className={styles.arrow} aria-hidden="true">
          ↗
        </span>
      ) : null}
    </a>
  );
}
