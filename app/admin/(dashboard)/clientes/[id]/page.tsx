import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DeleteClient } from "./DeleteClient";
import { DocumentLink } from "@/components/admin/DocumentLink";
import styles from "./page.module.css";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("clients").select("name").eq("id", id).single();
  return { title: data?.name ?? "Cliente" };
}

export default async function ClienteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: client } = await supabase
    .from("clients")
    .select("*")
    .eq("id", id)
    .single();

  if (!client) notFound();

  const { data: projects } = await supabase
    .from("projects")
    .select("id, name, status, total_value, paid_value")
    .eq("client_id", id)
    .order("created_at", { ascending: false });

  const { data: documents } = await supabase
    .from("documents")
    .select("id, type, file_name, file_url, created_at, project_id")
    .in(
      "project_id",
      (projects ?? []).map((p) => p.id),
    )
    .order("created_at", { ascending: false });

  function currency(v: number) {
    return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  const statusLabel: Record<string, string> = {
    lead: "Lead",
    proposal_sent: "Proposta enviada",
    contracted: "Contratado",
    in_progress: "Em execução",
    delivered: "Entregue",
    cancelled: "Cancelado",
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <Link href="/admin/clientes" className={styles.back}>
            ← Clientes
          </Link>
          <h1 className={styles.title}>{client.name}</h1>
          {client.company && (
            <p className={styles.company}>{client.company}</p>
          )}
        </div>
        <div className={styles.headerActions}>
          <Link
            href={`/admin/clientes/${id}/editar`}
            className={styles.editBtn}
          >
            Editar
          </Link>
          <DeleteClient id={id} />
        </div>
      </div>

      <div className={styles.info}>
        {client.email && (
          <span className={styles.infoItem}>
            <span className={styles.infoLabel}>Email</span>
            {client.email}
          </span>
        )}
        {client.phone && (
          <span className={styles.infoItem}>
            <span className={styles.infoLabel}>Telefone</span>
            {client.phone}
          </span>
        )}
      </div>

      {client.notes && <p className={styles.notes}>{client.notes}</p>}

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={styles.subtitle}>Projetos</h2>
          <Link
            href={`/admin/projetos/novo?cliente=${id}`}
            className={styles.addBtn}
          >
            + Novo projeto
          </Link>
        </div>

        {projects && projects.length > 0 ? (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Projeto</th>
                  <th>Status</th>
                  <th>Valor</th>
                  <th>Pago</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => (
                  <tr key={p.id}>
                    <td className={styles.name}>{p.name}</td>
                    <td>
                      <span className={`${styles.badge} ${styles[`badge_${p.status}`] ?? ""}`}>
                        {statusLabel[p.status] ?? p.status}
                      </span>
                    </td>
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
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className={styles.empty}>Nenhum projeto vinculado.</p>
        )}
      </section>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>Documentos</h2>
        {documents && documents.length > 0 ? (
          <ul className={styles.docList}>
            {documents.map((doc) => (
              <li key={doc.id} className={styles.docItem}>
                <span className={styles.docType}>{doc.type}</span>
                <DocumentLink path={doc.file_url} className={styles.docLink}>
                  {doc.file_name ?? "Abrir documento"}
                </DocumentLink>
                <span className={styles.docDate}>
                  {new Date(doc.created_at).toLocaleDateString("pt-BR")}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.empty}>Nenhum documento gerado.</p>
        )}
      </section>
    </div>
  );
}
