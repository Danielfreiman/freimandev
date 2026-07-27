"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import styles from "./AdminShell.module.css";

const NAV = [
  { label: "Painel", href: "/admin" },
  { label: "Clientes", href: "/admin/clientes" },
  { label: "Projetos", href: "/admin/projetos" },
  { label: "Financeiro", href: "/admin/financeiro" },
] as const;

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <Link href="/admin" className={styles.brand}>
          <svg viewBox="0 0 64 64" className={styles.logo}>
            <path d="M12 8 H32 A24 24 0 0 1 32 56 H12 Z" fill="var(--signal)" />
            <rect x="12" y="8" width="7" height="48" fill="var(--deep-black)" />
            <rect x="12" y="8" width="22" height="7" fill="var(--deep-black)" />
            <rect x="12" y="27" width="16" height="7" fill="var(--deep-black)" />
          </svg>
          <span className={styles.brandName}>Freiman Admin</span>
        </Link>

        <nav className={styles.nav}>
          {NAV.map((item) => {
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navLink} ${active ? styles.navActive : ""}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button type="button" className={styles.logout} onClick={handleLogout}>
          Sair
        </button>
      </aside>

      <main className={styles.main}>{children}</main>
    </div>
  );
}
