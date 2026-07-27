import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import styles from "./page.module.css";

export const metadata = { title: "Clientes" };

export default async function ClientesPage() {
  const supabase = await createClient();

  const { data: clients } = await supabase
    .from("clients")
    .select("id, name, company, email, phone, created_at")
    .order("created_at", { ascending: false });

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Clientes</h1>
        <Link href="/admin/clientes/novo" className={styles.newBtn}>
          + Novo cliente
        </Link>
      </div>

      {clients && clients.length > 0 ? (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Empresa</th>
                <th>Email</th>
                <th>Telefone</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id}>
                  <td className={styles.name}>{client.name}</td>
                  <td>{client.company ?? "—"}</td>
                  <td>{client.email ?? "—"}</td>
                  <td>{client.phone ?? "—"}</td>
                  <td>
                    <Link
                      href={`/admin/clientes/${client.id}`}
                      className={styles.viewLink}
                    >
                      Ver
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className={styles.empty}>Nenhum cliente cadastrado.</p>
      )}
    </div>
  );
}
