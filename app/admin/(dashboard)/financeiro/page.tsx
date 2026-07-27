import { createClient } from "@/lib/supabase/server";
import styles from "./page.module.css";

export const metadata = { title: "Financeiro" };

function currency(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default async function FinanceiroPage() {
  const supabase = await createClient();

  const [projectsRes, paymentsRes] = await Promise.all([
    supabase
      .from("projects")
      .select("id, name, total_value, paid_value, status, clients(name)")
      .in("status", ["contracted", "in_progress", "delivered"])
      .order("created_at", { ascending: false }),
    supabase
      .from("payments")
      .select("amount, status, type, due_date, paid_at, project_id, projects(name, clients(name))")
      .order("due_date", { ascending: true }),
  ]);

  const projects = projectsRes.data ?? [];
  const payments = paymentsRes.data ?? [];

  const totalRevenue = projects.reduce(
    (s, p) => s + Number(p.total_value),
    0,
  );
  const today = new Date().toISOString().slice(0, 10);
  const isOverdue = (payment: (typeof payments)[number]) =>
    payment.status === "atrasado" ||
    (payment.status === "pendente" && Boolean(payment.due_date) && payment.due_date! < today);
  const totalPaid = payments
    .filter((p) => p.status === "pago")
    .reduce((s, p) => s + Number(p.amount), 0);
  const totalPending = payments
    .filter((p) => p.status === "pendente" || p.status === "atrasado")
    .reduce((s, p) => s + Number(p.amount), 0);
  const totalOverdue = payments
    .filter(isOverdue)
    .reduce((s, p) => s + Number(p.amount), 0);

  const pendingPayments = payments.filter(
    (p) => p.status === "pendente" || p.status === "atrasado",
  );

  const monthFormatter = new Intl.DateTimeFormat("pt-BR", {
    month: "long",
    year: "numeric",
  });
  const monthlyReport = Array.from({ length: 6 }, (_, index) => {
    const date = new Date();
    date.setDate(1);
    date.setMonth(date.getMonth() - (5 - index));
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    const received = payments
      .filter((payment) => payment.status === "pago" && payment.paid_at?.startsWith(key))
      .reduce((sum, payment) => sum + Number(payment.amount), 0);
    return { key, label: monthFormatter.format(date), received };
  });

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Financeiro</h1>

      <div className={styles.cards}>
        <div className={styles.card}>
          <span className={styles.cardLabel}>Faturamento total</span>
          <span className={styles.cardValue}>{currency(totalRevenue)}</span>
        </div>
        <div className={styles.card}>
          <span className={styles.cardLabel}>Recebido</span>
          <span className={`${styles.cardValue} ${styles.green}`}>
            {currency(totalPaid)}
          </span>
        </div>
        <div className={styles.card}>
          <span className={styles.cardLabel}>A receber</span>
          <span className={`${styles.cardValue} ${styles.yellow}`}>
            {currency(totalPending)}
          </span>
        </div>
        <div className={styles.card}>
          <span className={styles.cardLabel}>Atrasado</span>
          <span className={`${styles.cardValue} ${totalOverdue > 0 ? styles.red : ""}`}>
            {currency(totalOverdue)}
          </span>
        </div>
      </div>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>Pagamentos pendentes</h2>
        {pendingPayments.length > 0 ? (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Projeto</th>
                  <th>Tipo</th>
                  <th>Valor</th>
                  <th>Status</th>
                  <th>Vencimento</th>
                </tr>
              </thead>
              <tbody>
                {pendingPayments.map((p, i) => {
                  const projName =
                    p.projects && !Array.isArray(p.projects)
                      ? (p.projects as { name: string }).name
                      : "—";
                  const overdue = isOverdue(p);
                  return (
                    <tr key={i}>
                      <td className={styles.name}>{projName}</td>
                      <td>{p.type}</td>
                      <td className={styles.amount}>
                        {currency(Number(p.amount))}
                      </td>
                      <td>
                        <span
                          className={`${styles.status} ${overdue ? styles.statusRed : styles.statusYellow}`}
                        >
                          {overdue ? "atrasado" : p.status}
                        </span>
                      </td>
                      <td>
                        {p.due_date
                          ? new Date(p.due_date).toLocaleDateString("pt-BR")
                          : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className={styles.empty}>Nenhum pagamento pendente.</p>
        )}
      </section>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>Recebimentos nos últimos 6 meses</h2>
        <div className={styles.reportGrid}>
          {monthlyReport.map((month) => (
            <div className={styles.reportRow} key={month.key}>
              <span className={styles.reportLabel}>{month.label}</span>
              <span className={styles.reportValue}>{currency(month.received)}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>Resumo por projeto</h2>
        {projects.length > 0 ? (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Projeto</th>
                  <th>Cliente</th>
                  <th>Valor</th>
                  <th>Pago</th>
                  <th>Restante</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => {
                  const clientName =
                    p.clients && !Array.isArray(p.clients)
                      ? (p.clients as { name: string }).name
                      : "—";
                  const remaining =
                    Number(p.total_value) - Number(p.paid_value);
                  return (
                    <tr key={p.id}>
                      <td className={styles.name}>{p.name}</td>
                      <td>{clientName}</td>
                      <td>{currency(Number(p.total_value))}</td>
                      <td>{currency(Number(p.paid_value))}</td>
                      <td className={remaining > 0 ? styles.yellow : ""}>
                        {currency(remaining)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className={styles.empty}>Nenhum projeto contratado.</p>
        )}
      </section>
    </div>
  );
}
