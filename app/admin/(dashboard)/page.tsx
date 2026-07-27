import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import styles from "./page.module.css";

async function getStats() {
  const supabase = await createClient();

  const [clients, projects, pendingPayments, overduePayments] =
    await Promise.all([
      supabase.from("clients").select("id", { count: "exact", head: true }),
      supabase.from("projects").select("id", { count: "exact", head: true }),
      supabase
        .from("payments")
        .select("amount")
        .eq("status", "pendente"),
      supabase
        .from("payments")
        .select("amount")
        .eq("status", "atrasado"),
    ]);

  const pendingTotal = (pendingPayments.data ?? []).reduce(
    (sum, p) => sum + Number(p.amount),
    0,
  );
  const overdueTotal = (overduePayments.data ?? []).reduce(
    (sum, p) => sum + Number(p.amount),
    0,
  );

  return {
    clientCount: clients.count ?? 0,
    projectCount: projects.count ?? 0,
    pendingTotal,
    overdueTotal,
  };
}

function currency(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default async function DashboardPage() {
  const stats = await getStats();

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Painel</h1>

      <div className={styles.cards}>
        <div className={styles.card}>
          <span className={styles.cardLabel}>Clientes</span>
          <span className={styles.cardValue}>{stats.clientCount}</span>
        </div>
        <div className={styles.card}>
          <span className={styles.cardLabel}>Projetos</span>
          <span className={styles.cardValue}>{stats.projectCount}</span>
        </div>
        <div className={styles.card}>
          <span className={styles.cardLabel}>A receber</span>
          <span className={styles.cardValue}>
            {currency(stats.pendingTotal)}
          </span>
        </div>
        <div className={`${styles.card} ${stats.overdueTotal > 0 ? styles.cardAlert : ""}`}>
          <span className={styles.cardLabel}>Atrasado</span>
          <span className={styles.cardValue}>
            {currency(stats.overdueTotal)}
          </span>
        </div>
      </div>

      <div className={styles.shortcuts}>
        <h2 className={styles.subtitle}>Acesso rápido</h2>
        <div className={styles.actions}>
          <Link href="/admin/clientes/novo" className={styles.action}>
            + Novo cliente
          </Link>
          <Link href="/admin/projetos/novo" className={styles.action}>
            + Novo projeto
          </Link>
        </div>
      </div>
    </div>
  );
}
