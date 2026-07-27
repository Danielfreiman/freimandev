"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import formStyles from "../../clientes/novo/page.module.css";

const STATUS_OPTIONS = [
  { value: "lead", label: "Lead" },
  { value: "proposal_sent", label: "Proposta enviada" },
  { value: "contracted", label: "Contratado" },
  { value: "in_progress", label: "Em execução" },
  { value: "delivered", label: "Entregue" },
];

export default function NovoProjetoPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedClient = searchParams.get("cliente") ?? "";

  const [clients, setClients] = useState<{ id: string; name: string }[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("clients")
      .select("id, name")
      .order("name")
      .then(({ data }) => setClients(data ?? []));
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get("name") as string,
      client_id: form.get("client_id") as string,
      status: form.get("status") as string,
      total_value: Number(form.get("total_value")) || 0,
      start_date: (form.get("start_date") as string) || null,
      due_date: (form.get("due_date") as string) || null,
      notes: (form.get("notes") as string) || null,
    };

    const supabase = createClient();
    const { data, error: dbError } = await supabase
      .from("projects")
      .insert(payload)
      .select("id")
      .single();

    if (dbError || !data) {
      setError("Erro ao salvar.");
      setSaving(false);
      return;
    }

    router.push(`/admin/projetos/${data.id}`);
    router.refresh();
  }

  return (
    <div className={formStyles.page}>
      <h1 className={formStyles.title}>Novo projeto</h1>

      <form className={formStyles.form} onSubmit={handleSubmit}>
        {error && <p className={formStyles.error}>{error}</p>}

        <label className={formStyles.field}>
          <span className={formStyles.label}>Nome do projeto *</span>
          <input name="name" required className={formStyles.input} />
        </label>

        <label className={formStyles.field}>
          <span className={formStyles.label}>Cliente *</span>
          <select
            name="client_id"
            required
            className={formStyles.input}
            defaultValue={preselectedClient}
          >
            <option value="">Selecionar</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>

        <div className={formStyles.row}>
          <label className={formStyles.field}>
            <span className={formStyles.label}>Status</span>
            <select name="status" className={formStyles.input} defaultValue="lead">
              {STATUS_OPTIONS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
          <label className={formStyles.field}>
            <span className={formStyles.label}>Valor total (R$)</span>
            <input
              name="total_value"
              type="number"
              step="0.01"
              min="0"
              className={formStyles.input}
            />
          </label>
        </div>

        <div className={formStyles.row}>
          <label className={formStyles.field}>
            <span className={formStyles.label}>Data início</span>
            <input name="start_date" type="date" className={formStyles.input} />
          </label>
          <label className={formStyles.field}>
            <span className={formStyles.label}>Prazo</span>
            <input name="due_date" type="date" className={formStyles.input} />
          </label>
        </div>

        <label className={formStyles.field}>
          <span className={formStyles.label}>Notas</span>
          <textarea name="notes" rows={3} className={formStyles.textarea} />
        </label>

        <div className={formStyles.actions}>
          <button type="submit" className={formStyles.save} disabled={saving}>
            {saving ? "Salvando..." : "Criar projeto"}
          </button>
          <button
            type="button"
            className={formStyles.cancel}
            onClick={() => router.back()}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
