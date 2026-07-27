import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ContractEditor } from "@/components/admin/ContractEditor";
import styles from "../page.module.css";

export const metadata = { title: "Contrato" };

export default async function ContratoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const [{ data: project }, { data: contracts }] = await Promise.all([
    supabase.from("projects").select("name, total_value, clients(name, company)").eq("id", id).single(),
    supabase.from("contracts").select("*").eq("project_id", id).order("created_at", { ascending: false }).limit(1),
  ]);
  if (!project) notFound();

  const client =
    project.clients && !Array.isArray(project.clients)
      ? (project.clients as { name: string; company: string | null })
      : { name: "Cliente", company: null };

  return (
    <div className={styles.page}>
      <Link href={`/admin/projetos/${id}`} className={styles.back}>← Voltar ao projeto</Link>
      <h1 className={styles.title}>Contrato</h1>
      <p className={styles.client}>{project.name} · {client.name}</p>
      <section className={styles.section}>
        <ContractEditor
          projectId={id}
          projectName={project.name}
          clientName={client.name}
          company={client.company}
          totalValue={Number(project.total_value)}
          existing={contracts?.[0] ?? null}
        />
      </section>
    </div>
  );
}
