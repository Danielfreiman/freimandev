import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { BudgetEditor } from "@/components/admin/BudgetEditor";
import { PaymentList } from "@/components/admin/PaymentList";
import { ProjectControls } from "@/components/admin/ProjectControls";
import styles from "./page.module.css";

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

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("projects").select("name").eq("id", id).single();
  return { title: data?.name ?? "Projeto" };
}

export default async function ProjetoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: project } = await supabase
    .from("projects")
    .select("*, clients(name, company, logo_url)")
    .eq("id", id)
    .single();

  if (!project) notFound();

  const [budgetRes, paymentsRes, contractRes, deliverablesRes] = await Promise.all([
    supabase
      .from("budget_items")
      .select("*")
      .eq("project_id", id)
      .order("sort_order"),
    supabase
      .from("payments")
      .select("*")
      .eq("project_id", id)
      .order("created_at"),
    supabase
      .from("contracts")
      .select("*")
      .eq("project_id", id)
      .order("created_at", { ascending: false })
      .limit(1),
    supabase
      .from("deliverables")
      .select("*")
      .eq("project_id", id)
      .order("created_at", { ascending: false }),
  ]);

  const client =
    project.clients && !Array.isArray(project.clients)
      ? (project.clients as { name: string; company: string | null; logo_url: string | null })
      : null;
  const clientName = client?.name ?? "—";

  const remaining = Number(project.total_value) - Number(project.paid_value);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <Link href="/admin/projetos" className={styles.back}>
            ← Projetos
          </Link>
          <h1 className={styles.title}>{project.name}</h1>
          <p className={styles.client}>
            Cliente:{" "}
            <Link href={`/admin/clientes/${project.client_id}`}>
              {clientName}
            </Link>
          </p>
        </div>
        <span className={styles.badge}>
          {statusLabel[project.status] ?? project.status}
        </span>
      </div>

      <div className={styles.summary}>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Valor total</span>
          <span className={styles.statValue}>
            {currency(Number(project.total_value))}
          </span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Pago</span>
          <span className={styles.statValue}>
            {currency(Number(project.paid_value))}
          </span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>A receber</span>
          <span
            className={`${styles.statValue} ${remaining > 0 ? styles.pending : ""}`}
          >
            {currency(remaining)}
          </span>
        </div>
      </div>

      <ProjectControls
        projectId={id}
        initialStatus={project.status}
        initialStartDate={project.start_date}
        initialDueDate={project.due_date}
      />

      <section className={styles.section} id="orcamento">
        <h2 className={styles.subtitle}>Orçamento</h2>
        <BudgetEditor
          projectId={id}
          items={budgetRes.data ?? []}
          totalValue={Number(project.total_value)}
          projectName={project.name}
          clientId={project.client_id}
          clientName={clientName}
          clientCompany={client?.company}
          clientLogoPath={client?.logo_url}
        />
      </section>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>Pagamentos</h2>
        <PaymentList
          projectId={id}
          payments={paymentsRes.data ?? []}
        />
      </section>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>Contrato</h2>
        {contractRes.data && contractRes.data.length > 0 ? (
          <div className={styles.contractCard}>
            <span>
              Status: {contractRes.data[0].status} | Entrada:{" "}
              {contractRes.data[0].upfront_percent}%
            </span>
            <Link
              href={`/admin/projetos/${id}/contrato`}
              className={styles.viewLink}
            >
              Ver / Editar
            </Link>
          </div>
        ) : (
          <Link
            href={`/admin/projetos/${id}/contrato`}
            className={styles.addBtn}
          >
            + Gerar contrato
          </Link>
        )}
      </section>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>Entregáveis</h2>
        {deliverablesRes.data && deliverablesRes.data.length > 0 ? (
          <ul className={styles.deliverableList}>
            {deliverablesRes.data.map((d) => (
              <li key={d.id} className={styles.deliverableItem}>
                <span className={styles.deliverableTitle}>{d.title}</span>
                <Link
                  href={`/admin/projetos/${id}/entregavel/${d.id}`}
                  className={styles.viewLink}
                >
                  Ver
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.empty}>Nenhum entregável criado.</p>
        )}
        <Link
          href={`/admin/projetos/${id}/entregavel/novo`}
          className={styles.addBtn}
        >
          + Novo entregável
        </Link>
      </section>
    </div>
  );
}
