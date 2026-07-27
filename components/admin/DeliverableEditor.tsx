"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { archivePdf, createAdminPdf, safeFileName } from "@/lib/adminPdf";
import styles from "./DocumentEditor.module.css";

type Deliverable = {
  id: string;
  title: string;
  description: string | null;
  items: unknown;
} | null;

export function DeliverableEditor({
  projectId,
  projectName,
  clientName,
  existing,
}: {
  projectId: string;
  projectName: string;
  clientName: string;
  existing: Deliverable;
}) {
  const initialItems =
    Array.isArray(existing?.items) && existing.items.every((item) => typeof item === "string")
      ? (existing.items as string[])
      : [""];
  const [title, setTitle] = useState(existing?.title ?? `Entrega — ${projectName}`);
  const [description, setDescription] = useState(existing?.description ?? "");
  const [items, setItems] = useState(initialItems);
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function saveDeliverable() {
    if (!title.trim()) {
      setMessage("Informe um título.");
      return null;
    }
    setSaving(true);
    setMessage("");
    const supabase = createClient();
    const payload = {
      project_id: projectId,
      title: title.trim(),
      description: description.trim() || null,
      items: items.filter((item) => item.trim()),
    };
    const result = existing
      ? await supabase.from("deliverables").update(payload).eq("id", existing.id).select("id").single()
      : await supabase.from("deliverables").insert(payload).select("id").single();
    setSaving(false);
    if (result.error || !result.data) {
      setMessage("Não foi possível salvar o entregável.");
      return null;
    }
    setMessage("Entregável salvo.");
    if (!existing) router.replace(`/admin/projetos/${projectId}/entregavel/${result.data.id}`);
    router.refresh();
    return result.data.id;
  }

  async function generateDeliverable() {
    setGenerating(true);
    const id = await saveDeliverable();
    if (!id) {
      setGenerating(false);
      return;
    }

    const blob = createAdminPdf(
      title,
      `${projectName} · ${clientName}`,
      [
        { heading: "Resumo da entrega", lines: [description || "Entrega concluída conforme o escopo aprovado."] },
        {
          heading: "O que foi entregue",
          lines: items.filter((item) => item.trim()).map((item, index) => `${index + 1}. ${item}`),
        },
        {
          heading: "Confirmação",
          lines: [
            "Este documento registra os itens disponibilizados ao cliente na conclusão desta etapa.",
            `Data da geração: ${new Date().toLocaleDateString("pt-BR")}.`,
          ],
        },
      ],
    );

    try {
      await archivePdf(
        createClient(),
        projectId,
        "entregavel",
        `entregavel-${safeFileName(title)}`,
        blob,
      );
      setMessage("Entregável gerado e arquivado.");
    } catch {
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `entregavel-${safeFileName(title)}.pdf`;
      anchor.click();
      URL.revokeObjectURL(url);
      setMessage("PDF baixado. Não foi possível arquivá-lo no Supabase.");
    }
    setGenerating(false);
  }

  return (
    <div className={styles.editor}>
      <label className={styles.field}>
        <span className={styles.label}>Título</span>
        <input className={styles.input} value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label className={styles.field}>
        <span className={styles.label}>Resumo do trabalho realizado</span>
        <textarea className={styles.textarea} value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>

      <span className={styles.label}>Itens entregues</span>
      {items.map((item, index) => (
        <div className={styles.clause} key={index}>
          <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
          <textarea
            className={styles.textarea}
            value={item}
            placeholder="Ex.: Site publicado, acesso ao painel e arquivos-fonte"
            onChange={(e) =>
              setItems(items.map((value, itemIndex) => (itemIndex === index ? e.target.value : value)))
            }
          />
          <button
            type="button"
            className={styles.remove}
            aria-label={`Remover item ${index + 1}`}
            onClick={() => setItems(items.filter((_, itemIndex) => itemIndex !== index))}
          >
            ×
          </button>
        </div>
      ))}
      <button type="button" className={styles.add} onClick={() => setItems([...items, ""])}>
        + Adicionar item
      </button>

      <div className={styles.actions}>
        <button type="button" className={styles.primary} disabled={saving || generating} onClick={saveDeliverable}>
          {saving ? "Salvando..." : "Salvar entregável"}
        </button>
        <button type="button" className={styles.secondary} disabled={saving || generating} onClick={generateDeliverable}>
          {generating ? "Gerando..." : "Gerar PDF e arquivar"}
        </button>
        {message && <p className={styles.message} aria-live="polite">{message}</p>}
      </div>
    </div>
  );
}
