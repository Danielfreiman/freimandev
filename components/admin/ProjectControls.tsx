"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import styles from "./ProjectControls.module.css";

const OPTIONS = [
  ["lead", "Lead"],
  ["proposal_sent", "Proposta enviada"],
  ["contracted", "Contratado"],
  ["in_progress", "Em execução"],
  ["delivered", "Entregue"],
  ["cancelled", "Cancelado"],
] as const;

export function ProjectControls({
  projectId,
  initialStatus,
  initialStartDate,
  initialDueDate,
}: {
  projectId: string;
  initialStatus: string;
  initialStartDate: string | null;
  initialDueDate: string | null;
}) {
  const [status, setStatus] = useState(initialStatus);
  const [startDate, setStartDate] = useState(initialStartDate ?? "");
  const [dueDate, setDueDate] = useState(initialDueDate ?? "");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function save() {
    setSaving(true);
    setMessage("");
    const { error } = await createClient()
      .from("projects")
      .update({
        status,
        start_date: startDate || null,
        due_date: dueDate || null,
        delivered_at: status === "delivered" ? new Date().toISOString().slice(0, 10) : null,
      })
      .eq("id", projectId);
    setSaving(false);
    setMessage(error ? "Não foi possível atualizar o projeto." : "Projeto atualizado.");
    if (!error) router.refresh();
  }

  return (
    <div className={styles.controls}>
      <label>
        <span>Status</span>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          {OPTIONS.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
        </select>
      </label>
      <label>
        <span>Início</span>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      </label>
      <label>
        <span>Prazo</span>
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      </label>
      <button type="button" onClick={save} disabled={saving}>
        {saving ? "Salvando..." : "Atualizar"}
      </button>
      {message && <span className={styles.message} aria-live="polite">{message}</span>}
    </div>
  );
}
