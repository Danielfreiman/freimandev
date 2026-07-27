import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DeliverableEditor } from "@/components/admin/DeliverableEditor";
import styles from "../../page.module.css";

export const metadata = { title: "Entregável" };

export default async function EntregavelPage({
  params,
}: {
  params: Promise<{ id: string; deliverableId: string }>;
}) {
  const { id, deliverableId } = await params;
  const supabase = await createClient();
  const [{ data: project }, { data: deliverable }] = await Promise.all([
    supabase.from("projects").select("name, client_id, clients(name, logo_url)").eq("id", id).single(),
    supabase.from("deliverables").select("*").eq("id", deliverableId).eq("project_id", id).single(),
  ]);
  if (!project || !deliverable) notFound();
  const client =
    project.clients && !Array.isArray(project.clients)
      ? (project.clients as { name: string; logo_url: string | null })
      : { name: "Cliente", logo_url: null };

  return (
    <div className={styles.page}>
      <Link href={`/admin/projetos/${id}`} className={styles.back}>← Voltar ao projeto</Link>
      <h1 className={styles.title}>Entregável</h1>
      <p className={styles.client}>{project.name} · {client.name}</p>
      <section className={styles.section}>
        <DeliverableEditor
          projectId={id}
          projectName={project.name}
          clientId={project.client_id}
          clientName={client.name}
          clientLogoPath={client.logo_url}
          existing={deliverable}
        />
      </section>
    </div>
  );
}
