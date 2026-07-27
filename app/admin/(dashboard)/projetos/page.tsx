import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import styles from "../clientes/page.module.css";

export const metadata = { title: "Projetos" };

const statusLabel: Record<string, string> = {
  lead: "Lead",
  proposal_sent: "Proposta enviada",
  contracted: "Contratado",
  in_progress: "Em execução",
  delivered: "Entregue",
  cancelled: "Cancelado",
};

function currency(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default async function ProjetosPage() {
  const supabase = await createClient();

  const { data: projects } = await supabase
    .from("projects")
    .select("id, name, status, total_value, paid_value, client_id, clients(name)")
    .order("created_at", { ascending: false });

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Projetos</h1>
        <Link href="/admin/projetos/novo" className={styles.newBtn}>
          + Novo projeto
        </Link>
      </div>

      {projects && projects.length > 0 ? (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Projeto</th>
                <th>Cliente</th>
                <th>Status</th>
                <th>Valor</th>
                <th>Pago</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => {
                const clientName =
                  p.clients && !Array.isArray(p.clients)
                    ? (p.clients as { name: string }).name
                    : "—";
                return (
                  <tr key={p.id}>
                    <td className={styles.name}>{p.name}</td>
                    <td>{clientName}</td>
                    <td>{statusLabel[p.status] ?? p.status}</td>
                    <td>{currency(Number(p.total_value))}</td>
                    <td>{currency(Number(p.paid_value))}</td>
                    <td>
                      <Link
                        href={`/admin/projetos/${p.id}`}
                        className={styles.viewLink}
                      >
                        Ver
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className={styles.empty}>Nenhum projeto cadastrado.</p>
      )}
    </div>
  );
}
